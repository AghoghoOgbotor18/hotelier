import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { confirmBookingPayment } from '@/lib/bookings';

export async function POST(req) {
    // MUST read as raw text, not req.json() — Paystack signs the exact
    // bytes it sent. Parsing to an object and re-stringifying it later
    // can produce different bytes (key order, spacing), which would
    // make even a genuinely valid webhook fail signature verification.
    const rawBody = await req.text();

    const signature = req.headers.get('x-paystack-signature');
    if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const expectedSignature = crypto
        .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
        .update(rawBody)
        .digest('hex');

    // Constant-time comparison — a plain `===` on secrets/signatures
    // leaks timing information an attacker could theoretically use to
    // guess the correct value one byte at a time. timingSafeEqual takes
    // the same amount of time regardless of where the strings first
    // differ, closing that side channel. Both buffers must be the same
    // length for this to work, so we check that first.
    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    const isValid =
        sigBuffer.length === expectedBuffer.length &&
        crypto.timingSafeEqual(sigBuffer, expectedBuffer);

    if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // We only act on successful charges. Paystack sends other event
    // types too (e.g. charge.failed) — for now we just acknowledge
    // those with 200 and do nothing, rather than treat them as errors.
    if (event.event === 'charge.success') {
        const { reference, amount } = event.data;

        const outcome = await confirmBookingPayment({
        reference,
        amountPaidKobo: amount,
        });

        if (outcome.result === 'amount_mismatch') {
        // Don't confirm the booking, but still return 200 — this isn't
        // Paystack's fault, and returning an error would just cause
        // Paystack to retry the same mismatched webhook repeatedly.
        // This gets logged for manual follow-up instead.
        console.error('Paystack webhook amount mismatch', { reference, amount });
        }
    }

    // Always return 200 for anything we successfully processed (or
    // deliberately ignored, like an event type we don't act on) — a
    // non-200 response tells Paystack to retry, and retrying something
    // that isn't actually broken just creates repeated, unnecessary
    // webhook traffic.
    return NextResponse.json({ received: true });
}