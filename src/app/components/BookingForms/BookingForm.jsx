'use client';

import { useState } from 'react';

export default function BookingForm({ slug, pricePerNight }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState('form'); // form | submitting | success | unavailable | error
    const [bookingCode, setBookingCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const nights =
        checkIn && checkOut
        ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
        : 0;
    const total = nights * Number(pricePerNight);

    async function handleSubmit(e) {
        e.preventDefault();
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
            setStep('success');
            } catch {
            setErrorMsg('Network error — please try again');
            setStep('error');
            }
    }

    if (step === 'success') {
        return (
            <div className="flex flex-col items-center gap-3 rounded-md border border-brass/20 bg-white p-8 text-center shadow-sm">
                <span className="h-2 w-2 rounded-full bg-avail" />
                <p className="font-sans text-sm text-stone">Room held — your booking reference is</p>
                <p className="font-mono text-2xl text-ink">{bookingCode}</p>
                <p className="mt-2 font-sans text-xs text-stone">
                (Payment isn&rsquo;t wired up yet — this booking is currently pending.)
                </p>
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
                <button
                onClick={() => setStep('form')}
                className="mt-3 rounded-sm border border-ink/15 px-5 py-2 font-sans text-sm text-ink"
                >
                Try different dates or choose a different room.
                </button>
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
                    min={checkIn || undefined}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="appearance-auto rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink"
                />
                </label>
            </div>

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
                disabled={step === 'submitting'}
                className="mt-2 rounded-sm bg-ink py-3 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition hover:bg-brass hover:text-ink disabled:opacity-60"
            >
                {step === 'submitting' ? 'Checking availability…' : 'Book Now'}
            </button>
        </form>
    );
}