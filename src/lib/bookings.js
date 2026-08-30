import { createAdminClient } from './supabase/admin';

// Confirms a booking after a successful payment. Safe to call more
// than once with the same reference — the WHERE status = 'pending'
// clause means a second call (e.g. a retried webhook, or the guest's
// redirect landing after the webhook already ran) simply updates
// zero rows instead of erroring or double-confirming.
//
// Returns one of:
//   'confirmed'      — this call actually confirmed the booking
//   'already_done'   — booking was already confirmed (idempotent no-op)
//   'not_found'      — no booking with this reference exists
//   'amount_mismatch'— paid amount doesn't match what we expected
export async function confirmBookingPayment({ reference, amountPaidKobo }) {
    const supabase = createAdminClient();

    const { data: booking, error: findError } = await supabase
        .from('bookings')
        .select('id, booking_code, total_price, status')
        .eq('booking_code', reference)
        .single();

    if (findError || !booking) {
        return { result: 'not_found' };
    }

    // Sanity-check the amount actually paid against what we expected.
    // The webhook's signature already proves the request genuinely
    // came from Paystack, but this catches a mismatched/stale
    // reference being replayed against the wrong booking.
    const expectedKobo = Math.round(Number(booking.total_price) * 100);
    if (amountPaidKobo !== expectedKobo) {
        return { result: 'amount_mismatch', booking };
    }

    if (booking.status !== 'pending') {
        // Already confirmed (or cancelled/expired) — nothing to do.
        // If it's 'expired', the guest paid too late and the hold on
        // the room may have already gone to someone else; that case
        // needs a manual refund/follow-up, which isn't automated here.
        return { result: booking.status === 'confirmed' ? 'already_done' : booking.status, booking };
    }

    const { data: updated, error: updateError } = await supabase
        .from('bookings')
        .update({
        status: 'confirmed',
        payment_reference: reference,
        paid_at: new Date().toISOString(),
        })
        .eq('id', booking.id)
        .eq('status', 'pending') // the atomic idempotency guard
        .select('id')
        .single();

    if (updateError || !updated) {
        // Someone else's request won the race between our read above and
        // this write (e.g. webhook and redirect-page both landed at the
        // same moment) — that's fine, it just means it's already confirmed.
        return { result: 'already_done', booking };
    }

    return { result: 'confirmed', booking };
}