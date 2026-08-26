'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DateField from './SearchFields/DateField';
import CountField from './SearchFields/CountField';

const ROOM_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1); // 1–10
const GUEST_OPTIONS = Array.from({ length: 21 }, (_, i) => i); // 0–20

export default function BookingSearchBar() {
    const router = useRouter();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [dateError, setDateError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    function handleCheckInChange(e) {
        setCheckIn(e.target.value);
        if (dateError) setDateError('');
    }

    function handleCheckOutChange(e) {
        setCheckOut(e.target.value);
        if (dateError) setDateError('');
    }

    function handleCheck(e) {
        e.preventDefault();
        setIsLoading(true);

        if (checkIn && checkIn < today) {
            setDateError('Arrival date can\u2019t be in the past.');
            setIsLoading(false); // stop the spinner — validation failed, nothing is happening
            return;
        }
        if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
            setDateError('Departure date must be after your arrival date.');
            setIsLoading(false); // same here
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
        // isLoading is intentionally left true here — the page is
        // navigating away, so this component is about to unmount
        // along with the old page anyway. No need to reset it.
    }

    return (
        <div className="rounded-lg border border-brass/15 bg-ink/95 shadow-2xl backdrop-blur-xl">
            <form
                onSubmit={handleCheck}
                className="grid grid-cols-2 gap-x-6 gap-y-5 p-6 sm:grid-cols-3 lg:flex lg:items-center lg:gap-0 lg:p-3"
            >
                <DateField
                    label="Arrival Date"
                    value={checkIn}
                    onChange={handleCheckInChange}
                    min={today}
                />
                <DateField
                    label="Departure Date"
                    value={checkOut}
                    onChange={handleCheckOutChange}
                    min={checkIn || today}
                />
                <CountField label="Rooms" value={rooms} onChange={(e) => setRooms(Number(e.target.value))} options={ROOM_OPTIONS} />
                <CountField label="Adults" value={adults} onChange={(e) => setAdults(Number(e.target.value))} options={GUEST_OPTIONS} />
                <CountField label="Children" value={children} onChange={(e) => setChildren(Number(e.target.value))} options={GUEST_OPTIONS} lastField />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="col-span-2 flex items-center justify-center rounded-sm bg-brass py-2.5 font-sans text-xs font-semibold uppercase tracking-widest text-ink transition hover:opacity-90 disabled:opacity-70 sm:col-span-3 lg:col-span-1 lg:ml-2 lg:h-full lg:w-32"
                >
                    {isLoading ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                    ) : (
                        'Check'
                    )}
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