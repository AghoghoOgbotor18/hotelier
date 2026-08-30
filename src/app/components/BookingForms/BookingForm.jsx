'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BookingForm({ slug, pricePerNight }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState('form'); // form | submitting | success | unavailable | error
    const [bookingCode, setBookingCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const nights =
        checkIn && checkOut
        ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
        : 0;
    const total = nights * Number(pricePerNight);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMsg('');

        // Real checks — the `min` attributes on the inputs below only
        // guide the native date picker, they don't stop someone typing
        // a date directly.
        if (checkIn < today) {
        setErrorMsg('Arrival date can\u2019t be in the past.');
        return;
        }
        if (new Date(checkOut) <= new Date(checkIn)) {
        setErrorMsg('Check-out must be after check-in — same-day isn\u2019t a valid stay.');
        return;
        }

        setStep('submitting');

        try {
        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            slug,
            check_in: checkIn,
            check_out: checkOut,
            guest_name: name,
            guest_email: email,
            guest_phone: phone,
            }),
        });

        const data = await res.json();

        if (res.status === 409) {
            setStep('unavailable');
            return;
        }
        if (!res.ok) {
            setErrorMsg(data.error || 'Something went wrong');
            setStep('error');
            return;
        }

        setBookingCode(data.booking.booking_code);

        // Booking is created and holding the room — now start payment.
        // We deliberately don't show a "success" screen here first; an
        // unpaid booking isn't really a success yet, it's just a hold.
        setStep('redirecting');

        const payRes = await fetch('/api/payments/initialize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ booking_code: data.booking.booking_code }),
        });
        const payData = await payRes.json();

        if (!payRes.ok || !payData.authorization_url) {
            setErrorMsg(
            payData.error || 'Booking held, but payment could not be started. Please try again.'
            );
            setStep('error');
            return;
        }

        window.location.href = payData.authorization_url;
        } catch {
            setErrorMsg('Network error. Please try again');
            setStep('error');
        }
    }

    if (step === 'redirecting') {
        return (
        <div className="flex flex-col items-center gap-3 rounded-md border border-brass/20 bg-white p-8 text-center shadow-sm">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
            <p className="font-sans text-sm text-stone">Room held — reference</p>
            <p className="font-mono text-lg text-ink">{bookingCode}</p>
            <p className="mt-2 font-sans text-xs text-stone">Taking you to secure payment&hellip;</p>
        </div>
        );
    }

    if (step === 'unavailable') {
        return (
        <div className="flex flex-col items-center gap-3 rounded-md border border-booked/30 bg-white p-8 text-center shadow-sm">
            <span className="h-2 w-2 rounded-full bg-booked" />
            <p className="font-sans text-sm text-ink">
            This room is fully booked for those dates.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
            <button
                onClick={() => setStep('form')}
                className="rounded-sm border border-ink/15 px-5 py-2 font-sans text-sm text-ink"
            >
                Try different dates
            </button>
            <Link
                href="/rooms"
                className="rounded-sm bg-ink px-5 py-2 font-sans text-sm text-ivory transition hover:bg-brass hover:text-ink"
            >
                Go to Rooms
            </Link>
            </div>
        </div>
        );
    }

    if (step === 'error') {
        return (
        <div className="flex flex-col items-center gap-3 rounded-md border border-booked/30 bg-white p-8 text-center shadow-sm">
            <p className="font-sans text-sm text-booked">{errorMsg}</p>
            <button
            onClick={() => setStep('form')}
            className="mt-2 rounded-sm border border-ink/15 px-5 py-2 font-sans text-sm text-ink"
            >
            Try again
            </button>
        </div>
        );
    }

    const isSubmitting = step === 'submitting';

    return (
        <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-md border border-ink/10 bg-white p-6 shadow-sm"
        >
        <h3 className="font-display text-lg font-medium text-ink">Book this room</h3>

        <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-xs text-stone">
            Check-in
            <input
                type="date"
                required
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="appearance-auto rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink"
            />
            </label>
            <label className="flex flex-col gap-1 text-xs text-stone">
            Check-out
            <input
                type="date"
                required
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="appearance-auto rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink"
            />
            </label>
        </div>

        {errorMsg && (
            <p className="rounded-sm bg-booked/10 px-3 py-2 font-sans text-xs text-booked">
            {errorMsg}
            </p>
        )}

        <label className="flex flex-col gap-1 text-xs text-stone">
            Full name
            <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink"
            />
        </label>

        <label className="flex flex-col gap-1 text-xs text-stone">
            Email
            <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink"
            />
        </label>

        <label className="flex flex-col gap-1 text-xs text-stone">
            Phone number
            <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink"
            />
        </label>

        {nights > 0 && (
            <div className="flex items-center justify-between rounded-sm bg-ink/5 px-3 py-2.5 font-mono text-sm">
            <span className="text-stone">
                {nights} night{nights > 1 ? 's' : ''}
            </span>
            <span className="text-ink">&#8358;{total.toLocaleString()}</span>
            </div>
        )}

        <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-ink py-3 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition hover:bg-brass hover:text-ink disabled:opacity-70"
        >
            {isSubmitting ? (
            <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory border-t-transparent" />
                Checking availability…
            </>
            ) : (
            'Book Now'
            )}
        </button>
        </form>
    );
}