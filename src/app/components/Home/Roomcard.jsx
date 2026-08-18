'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaUsers } from 'react-icons/fa';

const statusConfig = {
    available: { label: 'Available', dot: 'bg-avail', text: 'text-avail' },
    low: { label: '1 Room Left', dot: 'bg-brass', text: 'text-brass' },
    booked: { label: 'Fully Booked', dot: 'bg-booked', text: 'text-booked' },
};

export default function RoomCard({ room }) {
    const router = useRouter();
    const s = statusConfig[room.status];
    const bookable = room.status !== 'booked';
    const detailsHref = `/rooms/${room.slug}`;

    function goToDetails() {
        router.push(detailsHref);
    }

    function onCardKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goToDetails();
        }
    }

    return (
        <div
            role="link"
            tabIndex={0}
            onClick={goToDetails}
            onKeyDown={onCardKeyDown}
            className="flex cursor-pointer flex-col overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
        >
            <div className="relative h-56 w-full overflow-hidden">
                <img src={room.image} alt={room.name} className="h-full w-full object-cover hover:scale-110 duration-700" />
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 backdrop-blur-sm">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    <span className={`font-mono text-[10px] uppercase tracking-wide ${s.text}`}>{s.label}</span>
                </div>
                <div className='absolute right-3 bottom-3 bg-ink/60 text-white p-1 rounded-md text-xs '>
                    <span className='flex items-center jusitfy-center gap-1.5'><FaUsers />{room.guests} guests</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-medium text-ink">{room.name}</h3>
                <p className="mt-1 font-sans text-sm text-stone">{room.description}</p>

                <div className="mt-4 border-t border-ink/10 pt-4">
                    <div>
                        <span className="font-sans text-base font-semibold text-ink">
                        &#8358;{room.price.toLocaleString()}
                        </span>
                        <span className="font-sans text-xs text-stone"> / night</span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                        {bookable ? (
                            <Link
                            href={`${detailsHref}#book`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 rounded-sm bg-ink px-3 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide text-ivory transition hover:bg-brass hover:text-ink"
                            >
                            Book Now
                            </Link>
                        ) : (
                            <span
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 cursor-not-allowed rounded-sm border border-ink/15 px-3 py-2.5 text-center font-sans text-xs uppercase tracking-wide text-stone/60"
                            >
                            Unavailable
                            </span>
                        )}
                        <Link
                        href={detailsHref}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center gap-1.5 rounded-sm border border-ink/15 px-3 py-2.5 text-center font-sans text-xs uppercase tracking-wide text-ink transition hover:border-brass hover:text-brass group justify-center"
                        >
                            Details
                            <FaArrowRight className='group-hover:translate-x-1' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}