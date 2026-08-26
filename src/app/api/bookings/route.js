import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Postgres error code for an exclusion constraint violation — this
// fires when the physical room we just tried already has an
// overlapping booking. See supabase/schema.sql -> no_overlapping_bookings.
const EXCLUSION_VIOLATION = '23P01';

function generateBookingCode() {
    const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // booking code - no 0/O/1/I
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
    return `HTL-${code}`;
}

export async function POST(req) {
    const body = await req.json();
    const { slug, check_in, check_out, guest_name, guest_email, guest_phone } = body;

    if (!slug || !check_in || !check_out || !guest_email || !guest_phone) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (new Date(check_out) <= new Date(check_in)) {
        return NextResponse.json({ error: 'Check-out must be after check-in' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // 1. Find the room type by slug
    const { data: roomType, error: typeError } = await supabase
        .from('room_types')
        .select('id, price_per_night, is_active')
        .eq('slug', slug)
        .single();

    if (typeError || !roomType || !roomType.is_active) {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // 2. Get every physical unit that belongs to this room type
    const { data: units, error: unitsError } = await supabase
        .from('rooms')
        .select('id')
        .eq('room_type_id', roomType.id)
        .eq('is_active', true);

    if (unitsError || !units || units.length === 0) {
        return NextResponse.json({ error: 'No rooms available for this type' }, { status: 404 });
    }

    const nights = Math.round(
        (new Date(check_out).getTime() - new Date(check_in).getTime()) / (1000 * 60 * 60 * 24)
    );
    const total_price = Number(roomType.price_per_night) * nights;

    /*
    3.  Try each physical unit in turn. The exclusion constraint in the database is what actually decides if a unit is free for these dates — we don't check availability ourselves first, since that would just recreate the same race condition the constraint exists to prevent. If a unit is taken, Postgres rejects the insert and we move on to the next unit.
    */
    for (const unit of units) {
        const booking_code = generateBookingCode();

        const { data, error } = await supabase
        .from('bookings')
        .insert({
            booking_code,
            room_id: unit.id,
            guest_name: guest_name ?? null,
            guest_email,
            guest_phone,
            check_in,
            check_out,
            total_price,
            status: 'pending',
        })
        .select('id, booking_code, total_price')
        .single();

        if (!error) {
        // Success — this unit was free, booking created.
        return NextResponse.json({ booking: data }, { status: 201 });
        }

        if (error.code === EXCLUSION_VIOLATION) {
        // This particular unit is taken for these dates - try the next one.
        continue;
        }

        if (error.code === '23505' && error.message.includes('booking_code')) {
        // Extremely rare booking_code collision — try the same unit
        // again with a fresh code by simply continuing the loop from
        // here isn't quite right, so just fall through to try the
        // next unit instead; the retry-with-new-code case is rare
        // enough not to need special-casing further.
        continue;
        }

        // Any other error is unexpected - stop and report it.
        return NextResponse.json({ error: 'Could not create booking' }, { status: 500 });
    }

    // Every physical unit was taken for these dates.
    return NextResponse.json(
        { error: 'This room is fully booked for those dates' },
        { status: 409 }
    );
}