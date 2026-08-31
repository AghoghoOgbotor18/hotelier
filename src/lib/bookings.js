import { createAdminClient } from './supabase/admin';
import { sendBookingConfirmationEmail } from './email';
import { sendBookingConfirmationSms } from './sms';

async function getRoomInfo(supabase, roomId) {
    const { data } = await supabase
        .from('rooms')
        .select('room_number, room_types(name)')
        .eq('id', roomId)
        .single();

    return {
        roomName: data?.room_types?.name || 'your room',
        roomNumber: data?.room_number || '—',
    };
}

export async function confirmBookingPayment({ reference, amountPaidKobo }) {
    const supabase = createAdminClient();

    const { data: booking, error: findError } = await supabase
        .from('bookings')
        .select('id, booking_code, total_price, status, room_id, guest_name, guest_email, guest_phone, check_in, check_out')
        .eq('booking_code', reference)
        .single();

    if (findError || !booking) {
        return { result: 'not_found' };
    }

    const expectedKobo = Math.round(Number(booking.total_price) * 100);
    if (amountPaidKobo !== expectedKobo) {
        return { result: 'amount_mismatch', booking };
    }

    if (booking.status !== 'pending') {
        // Already confirmed (most likely by the webhook, which usually
        // wins the race against the guest's browser redirect) — or
        // cancelled/expired. Either way, no notification gets sent from
        // here (that only happens on a genuine first confirmation,
        // below) — but we still fetch room info so the page can show it
        // regardless of which path actually did the confirming.
        const roomInfo = booking.status === 'confirmed'
        ? await getRoomInfo(supabase, booking.room_id)
        : {};
        return { result: booking.status === 'confirmed' ? 'already_done' : booking.status, booking, ...roomInfo };
    }

    const { data: updated, error: updateError } = await supabase
        .from('bookings')
        .update({
        status: 'confirmed',
        payment_reference: reference,
        paid_at: new Date().toISOString(),
        })
        .eq('id', booking.id)
        .eq('status', 'pending')
        .select('id')
        .single();

    if (updateError || !updated) {
        // Lost the race to another simultaneous call.
        const roomInfo = await getRoomInfo(supabase, booking.room_id);
        return { result: 'already_done', booking, ...roomInfo };
    }

    // We won the race — this call is the ONE genuine confirmation.
    const { roomName, roomNumber } = await getRoomInfo(supabase, booking.room_id);

    // Notifications are best-effort: if email or SMS sending fails,
    // the booking is still validly confirmed and paid for. We log the
    // failure rather than let it undo or block the confirmation — a
    // guest whose card was charged should never see "booking failed"
    // just because a text message didn't send.
    const notifyPayload = {
        guestName: booking.guest_name,
        guestEmail: booking.guest_email,
        guestPhone: booking.guest_phone,
        bookingCode: booking.booking_code,
        roomName,
        roomNumber,
        checkIn: booking.check_in,
        checkOut: booking.check_out,
    };

    try {
        await sendBookingConfirmationEmail(notifyPayload);
    } catch (err) {
        console.error('Booking confirmation email failed:', err.message, booking.booking_code);
    }

    try {
        await sendBookingConfirmationSms(notifyPayload);
    } catch (err) {
        console.error('Booking confirmation SMS failed:', err.message, booking.booking_code);
    }

    return { result: 'confirmed', booking, roomName, roomNumber };
}