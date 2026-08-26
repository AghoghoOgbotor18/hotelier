'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROOM_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1); // 1–10
const GUEST_OPTIONS = Array.from({ length: 21 }, (_, i) => i); // 0–20

function FieldLabel({ children }) {
    return (
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brass">
        {children}
        </span>
    );
}

export default function BookingSearchBar() {
    const router = useRouter();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [dateError, setDateError] = useState('');

    // YYYY-MM-DD, matches the format date inputs use — also doubles
    // as the `min` value so the native picker won't even show past
    // dates as an option.
    const today = new Date().toISOString().split('T')[0];

    function handleCheck(e) {
        e.preventDefault();

        // The `min` attributes below only guide the native date picker
        // UI — they don't stop someone from typing a date directly, so
        // these are the real checks.
        if (checkIn && checkIn < today) {
            setDateError('Arrival date can\u2019t be in the past.');
            return;
        }
        if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
            setDateError('Departure date must be after your arrival date.');
            return;
        }
        setDateError('');

        const params = new URLSearchParams({
        checkIn,
        checkOut,
        rooms: String(rooms),
        adults: String(adults),
        children: String(children),
        });
        router.push(`/rooms?${params.toString()}`);
    }

    return (
        <div className="rounded-lg border border-brass/15 bg-ink/95 shadow-2xl backdrop-blur-xl">
        <form
        onSubmit={handleCheck}
        className="grid grid-cols-2 gap-x-6 gap-y-5 p-6 sm:grid-cols-3 lg:flex lg:items-center lg:gap-0 lg:p-3"
        >
        {/* Arrival */}
        <label className="flex flex-col gap-1.5 lg:flex-1 lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2">
            <FieldLabel>Arrival Date</FieldLabel>
            <input
            type="date"
            required
            min={today}
            value={checkIn}
            onChange={(e) => {
                setCheckIn(e.target.value);
                if (dateError) setDateError('');
            }}
            className="appearance-auto bg-transparent font-sans text-sm text-ivory outline-none [color-scheme:dark]"
            />
        </label>

        {/* Departure */}
        <label className="flex flex-col gap-1.5 lg:flex-1 lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2">
            <FieldLabel>Departure Date</FieldLabel>
            <input
            type="date"
            required
            min={checkIn || undefined}
            value={checkOut}
            onChange={(e) => {
                setCheckOut(e.target.value);
                if (dateError) setDateError('');
            }}
            className="appearance-auto bg-transparent font-sans text-sm text-ivory outline-none [color-scheme:dark]"
            />
        </label>

        {/* Rooms */}
        <label className="flex flex-col gap-1.5 lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2">
            <FieldLabel>Rooms</FieldLabel>
            <select
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className="bg-transparent font-sans text-sm text-ivory outline-none"
            >
            {ROOM_OPTIONS.map((n) => (
                <option key={n} value={n} className="bg-ink text-ivory">
                {String(n).padStart(2, '0')}
                </option>
            ))}
            </select>
        </label>

        {/* Adults */}
        <label className="flex flex-col gap-1.5 lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2">
            <FieldLabel>Adults</FieldLabel>
            <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="bg-transparent font-sans text-sm text-ivory outline-none"
            >
            {GUEST_OPTIONS.map((n) => (
                <option key={n} value={n} className="bg-ink text-ivory">
                {String(n).padStart(2, '0')}
                </option>
            ))}
            </select>
        </label>

        {/* Children */}
        <label className="flex flex-col gap-1.5 lg:px-5 lg:py-2">
            <FieldLabel>Children</FieldLabel>
            <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="bg-transparent font-sans text-sm text-ivory outline-none"
            >
            {GUEST_OPTIONS.map((n) => (
                <option key={n} value={n} className="bg-ink text-ivory">
                {String(n).padStart(2, '0')}
                </option>
            ))}
            </select>
        </label>

        {/* Check */}
        <button
            type="submit"
            className="col-span-2 rounded-sm bg-brass py-2.5 font-sans text-xs font-semibold uppercase tracking-widest text-ink transition hover:opacity-90 sm:col-span-3 lg:col-span-1 lg:ml-2 lg:h-full lg:w-32"
        >
            Check
        </button>
        </form>

        {dateError && (
            <p className="border-t border-booked/20 bg-booked/10 px-6 py-2.5 font-sans text-xs text-booked">
                {dateError}
            </p>
        )}
        </div>
    );
}