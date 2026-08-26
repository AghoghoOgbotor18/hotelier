import Link from "next/link";
import BookingForm from "../BookingForms/BookingForm";
import { FaChevronLeft } from "react-icons/fa";

export default function RoomDetails({ room, totalUnits }) {
    return (
        <>
            {/* Photo header */}
            <header className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden">
                <img
                src={room.image_url || '/images/hero1.webp'}
                alt={room.name}
                className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/10" />

                {/* both the back link and the heading now share one
                    padded, z-10 wrapper so they line up with each
                    other and sit visibly above the image/overlay */}
                <div className="relative z-10 flex w-full flex-col gap-3 px-8 pb-10 md:px-16">
                    <Link
                        href="/rooms"
                        className="flex w-fit items-center gap-1.5 font-sans text-sm text-ivory/80 transition hover:text-brass"
                    >
                        <FaChevronLeft className="text-xs" />
                        Back to rooms
                    </Link>

                    <div>
                        <div className="mb-3 font-mono text-xs uppercase tracking-wide text-brass">
                            {room.code}
                        </div>
                        <h1 className="font-display text-4xl font-medium text-ivory md:text-5xl">
                            {room.name}
                        </h1>
                    </div>
                </div>
            </header>

            {/* Details + booking form */}
            <section className="bg-background px-8 py-16 md:px-16">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
                    <div>
                        <p className="font-sans text-base leading-relaxed text-stone">
                        {room.description}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-ink/10 py-6 font-mono text-sm text-stone">
                            <span>{room.size}</span>
                            <span className="h-1 w-1 rounded-full bg-stone/40" />
                            <span>Up to {room.max_guests} guests</span>
                            <span className="h-1 w-1 rounded-full bg-stone/40" />
                            <span>
                                {totalUnits} room{totalUnits !== 1 ? 's' : ''} of this type
                            </span>
                        </div>

                        <div className="mt-8">
                            <span className="font-sans text-2xl font-semibold text-ink">
                                &#8358;{Number(room.price_per_night).toLocaleString()}
                            </span>
                            <span className="font-sans text-sm text-stone"> / night</span>
                        </div>
                    </div>

                    <div id="book" className="scroll-mt-24">
                        <BookingForm slug={room.slug} pricePerNight={room.price_per_night} />
                    </div>
                </div>
            </section>
        </>
    );
}