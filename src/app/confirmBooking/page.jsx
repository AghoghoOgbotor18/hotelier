import Link from 'next/link';
import { verifyTransaction } from '@/lib/paystack';
import { confirmBookingPayment } from '@/lib/bookings';

export default async function BookingConfirmPage({ searchParams }) {
    const params = await searchParams;
    const reference = params?.reference;

    if (!reference) {
        return (
        <Result title="Missing reference" tone="error">
            We couldn&rsquo;t find a payment reference in this link.
        </Result>
        );
    }

    let verification;
    try {
        verification = await verifyTransaction(reference);
    } catch (err) {
        console.error('Paystack verify failed:', err.message);
        return (
        <Result title="Couldn't verify payment" tone="error">
            We had trouble confirming this payment with Paystack. If money left your
            account, it will still be confirmed shortly — this page just couldn&rsquo;t reach
            Paystack right now.
        </Result>
        );
    }

    if (verification.status !== 'success') {
        return (
        <Result title="Payment not completed" tone="error">
            This payment wasn&rsquo;t successful, so the room hasn&rsquo;t been booked. You can go
            back and try again.
        </Result>
        );
    }

    const outcome = await confirmBookingPayment({
        reference,
        amountPaidKobo: verification.amount,
    });

    if (outcome.result === 'not_found') {
        return (
        <Result title="Booking not found" tone="error">
            Your payment succeeded, but we couldn&rsquo;t match it to a booking. Please
            contact the front desk with this reference: <strong className="text-ivory">{reference}</strong>
        </Result>
        );
    }

    if (outcome.result === 'expired' || outcome.result === 'cancelled') {
        return (
        <Result title="Payment received, but the hold expired" tone="error">
            Your payment succeeded, but the 15-minute hold on this room had already
            expired. Please contact the front desk with this reference for a refund or
            rebooking: <strong className="text-ivory">{reference}</strong>
        </Result>
        );
    }

    return (
        <Result title="Booking confirmed" tone="success">
        <p>Your Booking ID is</p>
        <p className="mt-1 font-mono text-2xl text-brass">{reference}</p>
        {outcome.roomNumber && (
            <p className="mt-2 font-sans text-sm text-ivory/60">
                {outcome.roomName} &mdash; Room {outcome.roomNumber}
            </p>
        )}
        <p className="mt-4 font-sans text-xs text-ivory/50">
            A confirmation email and text message have also been sent to you.
        </p>
        <Link
            href="/rooms"
            className="mt-6 inline-block rounded-sm bg-brass px-6 py-3 font-sans text-sm font-semibold text-ink transition hover:opacity-90"
        >
            Browse more rooms
        </Link>
        </Result>
    );
}

function Result({ title, tone, children }) {
    return (
        <section className="flex min-h-[60vh] flex-col items-center justify-center bg-ink px-8 py-20 text-center">
        <span className={`h-2 w-2 rounded-full ${tone === 'success' ? 'bg-avail' : 'bg-booked'}`} />
        <h1 className="mt-4 font-display text-2xl font-medium text-ivory">{title}</h1>
        <div className="mt-3 max-w-md font-sans text-sm leading-relaxed text-ivory/60">{children}</div>
        </section>
    );
}