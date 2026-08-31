import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { initializeTransaction } from '@/lib/paystack';

export async function POST(req) {
    const { booking_code } = await req.json();

    if (!booking_code) {
        return NextResponse.json({ error: 'Missing booking_code' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: booking, error } = await supabase
        .from('bookings')
        .select('booking_code, guest_email, total_price, status')
        .eq('booking_code', booking_code)
        .single();

    if (error || !booking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Only a still-pending booking should ever reach payment. If it's
    // already confirmed, expired, or cancelled, there's nothing valid
    // to pay for — this stops someone re-triggering payment on a stale
    // or already-paid booking_code.
    if (booking.status !== 'pending') {
        return NextResponse.json(
        { error: `This booking is ${booking.status}, not payable` },
        { status: 409 }
        );
    }

    try {
        const origin = req.headers.get('origin') || new URL(req.url).origin;

        const transaction = await initializeTransaction({
            email: booking.guest_email,
            amountNaira: Number(booking.total_price),
            reference: booking.booking_code, // our code IS the Paystack reference
            // No query string here on purpose — Paystack appends its own
            // ?reference=...&trxref=... to whatever URL we give it, so
            // adding our own ?reference=... too creates a DUPLICATE
            // reference param, which breaks reading it back correctly.
            callbackUrl: `${origin}/confirmBooking`,
        });

        return NextResponse.json({ authorization_url: transaction.authorization_url });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 502 });
    }
}