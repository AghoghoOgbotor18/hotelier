import { createAdminClient } from './supabase/admin';

// Returns every active room type, with a computed status based on how many of its physical units are actually free for the given dates. If no dates are given, every room type is treated as 'available' (we're not checking any specific dates yet).
export async function getRoomsWithAvailability({ checkIn, checkOut, minGuests } = {}) {
    const supabase = createAdminClient();

    const { data: roomTypes, error: typesError } = await supabase
        .from('room_types')
        .select('*')
        .eq('is_active', true)
        .order('price_per_night', { ascending: true });

    if (typesError || !roomTypes) return [];

    const { data: units, error: unitsError } = await supabase
        .from('rooms')
        .select('id, room_type_id')
        .eq('is_active', true);

    if (unitsError || !units) return [];

    // Map room_type_id -> [unit ids], so we know how many physical
    // rooms exist per type and can count how many are actually free.
    const unitsByType = {};
    for (const unit of units) {
        if (!unitsByType[unit.room_type_id]) unitsByType[unit.room_type_id] = [];
        unitsByType[unit.room_type_id].push(unit.id);
    }

    let bookedUnitIds = new Set();

    if (checkIn && checkOut) {
        // Only bookings that are still pending/confirmed AND overlap the
        // requested date range actually block a room — same overlap
        // logic the database's own exclusion constraint uses.
        const { data: bookings } = await supabase
        .from('bookings')
        .select('room_id, check_in, check_out')
        .in('status', ['pending', 'confirmed'])
        .lt('check_in', checkOut)
        .gt('check_out', checkIn);

        bookedUnitIds = new Set((bookings || []).map((b) => b.room_id));
    }

    return roomTypes
        .filter((type) => !minGuests || type.max_guests >= minGuests)
        .map((type) => {
        const unitIds = unitsByType[type.id] || [];
        const totalUnits = unitIds.length;
        const freeUnits = checkIn && checkOut
            ? unitIds.filter((id) => !bookedUnitIds.has(id)).length
            : totalUnits;

        let status = 'available';
        if (freeUnits === 0) status = 'booked';
        else if (freeUnits === 1) status = 'low';

        return {
            slug: type.slug,
            code: type.code,
            name: type.name,
            description: type.description,
            size: type.size,
            guests: type.max_guests,
            price: Number(type.price_per_night),
            image: type.image_url,
            status,
            freeUnits,
            totalUnits,
        };
    });
}