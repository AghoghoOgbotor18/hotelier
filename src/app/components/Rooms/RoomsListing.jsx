import RoomCard from "../Home/Roomcard";

export default function RoomsListing({ rooms, checkIn, checkOut }) {
    return (
        <section className="bg-background px-8 py-24 md:px-16">
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                    All Rooms &amp; Suites
                    </div>
                    <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                    {rooms.length} room{rooms.length !== 1 ? 's' : ''} available
                    </h2>
                </div>

                {checkIn && checkOut ? (
                    <p className="max-w-sm font-sans text-sm leading-relaxed text-stone">
                    Showing availability for{' '}
                    <span className="font-semibold text-ink">
                        {new Date(checkIn).toLocaleDateString()} &ndash;{' '}
                        {new Date(checkOut).toLocaleDateString()}
                    </span>
                    .
                    </p>
                ) : (
                    <p className="max-w-sm font-sans text-sm leading-relaxed text-stone">
                    Every room type we offer. Search dates on the homepage to check real
                    availability.
                    </p>
                )}
                </div>

                {rooms.length === 0 ? (
                <p className="font-sans text-sm text-stone">
                    No rooms match your search — try different dates or fewer guests.
                </p>
                ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {rooms.map((room) => (
                    <RoomCard key={room.slug} room={room} />
                    ))}
                </div>
                )}
            </div>
        </section>
    );
}