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

    function handleCheck(e) {
        e.preventDefault();
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
        <form
        onSubmit={handleCheck}
        className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-lg border border-brass/15 bg-ink/95 p-6 shadow-2xl backdrop-blur-xl sm:grid-cols-3 lg:flex lg:items-center lg:gap-0 lg:p-3"
        >
            <label className="flex flex-col gap-1.5 lg:flex-1 lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2">
                <FieldLabel>Arrival Date</FieldLabel>
                <input type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent font-sans text-sm text-ivory outline-none [color-scheme:dark]" />
            </label>

            <label className="flex flex-col gap-1.5 lg:flex-1 lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2">
                <FieldLabel>Departure Date</FieldLabel>
                <input type="date" required min={checkIn || undefined} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent font-sans text-sm text-ivory outline-none [color-scheme:dark]" />
            </label>

            <label className="flex flex-col gap-1.5 lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2">
                <FieldLabel>Rooms</FieldLabel>
                <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className="bg-transparent font-sans text-sm text-ivory outline-none">
                {ROOM_OPTIONS.map((n) => <option key={n} value={n} className="bg-ink text-ivory">{String(n).padStart(2, '0')}</option>)}
                </select>
            </label>

            <label className="flex flex-col gap-1.5 lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2">
                <FieldLabel>Adults</FieldLabel>
                <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="bg-transparent font-sans text-sm text-ivory outline-none">
                {GUEST_OPTIONS.map((n) => <option key={n} value={n} className="bg-ink text-ivory">{String(n).padStart(2, '0')}</option>)}
                </select>
            </label>

            <label className="flex flex-col gap-1.5 lg:px-5 lg:py-2">
                <FieldLabel>Children</FieldLabel>
                <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="bg-transparent font-sans text-sm text-ivory outline-none">
                {GUEST_OPTIONS.map((n) => <option key={n} value={n} className="bg-ink text-ivory">{String(n).padStart(2, '0')}</option>)}
                </select>
            </label>

            <button type="submit" className="col-span-2 rounded-sm bg-brass py-3.5 font-sans text-xs font-semibold uppercase tracking-widest text-ink transition hover:opacity-90 sm:col-span-3 lg:col-span-1 lg:ml-2 lg:h-full lg:w-32 lg:py-2">
                Check
            </button>
        </form>
    );
}