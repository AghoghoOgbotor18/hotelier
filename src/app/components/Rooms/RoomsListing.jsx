import RoomCard from "../Home/Roomcard";
import { rooms } from "./RoomsData";

export default function RoomsListing() {
    return (
        <section className="bg-background px-8 py-24 md:px-16">
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 flex flex-col items-center justify-center gap-4 text-center">
                    <div>
                        <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                            All Rooms &amp; Suites
                        </div>
                        <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                            Breathtaking Rooms and Suite
                        </h2>
                        <p className="mt-4 font-sans text-sm leading-relaxed text-stone">
                            We offer the best and most affordable rooms. From cozy courtyard rooms to spacious suites — each one designed for a proper night's rest.
                        </p>  
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {rooms.map((room) => (
                        <RoomCard key={room.slug} room={room} />
                    ))}
                </div>
            </div>
        </section>
    );
}