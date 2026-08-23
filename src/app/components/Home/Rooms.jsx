import RoomCard from './Roomcard';
import Link from 'next/link';
import { rooms } from '../Rooms/RoomsData';

export default function Rooms() {
    return (
        <section id="rooms" className="bg-background px-4 py-28 md:px-16">
        <div className="mx-auto max-w-9xl">
            <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
                <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                Rooms &amp; Suites
                </div>
                <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                Find your room
                </h2>
            </div>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-stone">
                From cozy courtyard rooms to spacious suites — each one designed for a proper
                night&rsquo;s rest.
            </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {rooms.map((room) => (
                <RoomCard key={room.slug} room={room} />
            ))}
            </div>
            <div className="mt-14 flex justify-center">
                <Link
                    href="/rooms"
                    className="rounded-sm bg-ink px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition hover:bg-brass hover:text-ink"
                >
                    View All Rooms
                </Link>
            </div>
        </div>
        </section>
    );
}