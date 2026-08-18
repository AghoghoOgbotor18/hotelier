import RoomCard from './Roomcard';

const rooms = [
    {
        slug: 'courtyard-room',
        code: 'RM-01',
        name: 'The Courtyard Room',
        description: 'Garden-facing with a queen bed and soft morning light.',
        size: '22m²',
        guests: 2,
        price: 45000,
        image: '/images/courtyard.webp',
        status: 'available',
    },
    {
        slug: 'terrace-suite',
        code: 'RM-02',
        name: 'The Terrace Suite',
        description: 'A private balcony over the courtyard, king bed, sitting area.',
        size: '34m²',
        guests: 3,
        price: 78000,
        image: '/images/terrace.jpg',
        status: 'low',
    },
    {
        slug: 'study-room',
        code: 'RM-03',
        name: 'The Study Room',
        description: 'Compact and quiet, with a proper desk for working travelers.',
        size: '18m²',
        guests: 1,
        price: 32000,
        image: '/images/studyroom.webp',
        status: 'booked',
    },
    {
        slug: 'the-loft',
        code: 'RM-04',
        name: 'The Loft',
        description: 'A mezzanine level suite with king bed and skylight.',
        size: '40m²',
        guests: 3,
        price: 95000,
        image: '/images/loftroom.webp',
        status: 'available',
    },
];

    export default function Rooms() {
    return (
        <section id="rooms" className="bg-background px-8 py-28 md:px-16">
        <div className="mx-auto max-w-6xl">
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

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room) => (
                <RoomCard key={room.slug} room={room} />
            ))}
            </div>
        </div>
        </section>
    );
}