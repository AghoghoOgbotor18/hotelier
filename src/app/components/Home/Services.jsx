import Link from 'next/link';
import { FaSpa, FaUtensils, FaShuttleVan, FaTshirt, FaConciergeBell, FaUsers } from 'react-icons/fa';

const services = [
    {
        icon: <FaSpa />,
        title: 'Spa & Wellness',
        desc: 'A quiet space for massage, facials, and treatments designed to slow you down.',
    },
    {
        icon: <FaUtensils />,
        title: 'Fine Dining',
        desc: 'A seasonal menu served in the main restaurant, from breakfast through late supper.',
    },
    {
        icon: <FaShuttleVan />,
        title: 'Airport Transfer',
        desc: 'Arranged on request once your booking is confirmed, at a fixed, upfront rate.',
    },
    {
        icon: <FaTshirt />,
        title: 'Laundry & Dry Cleaning',
        desc: 'Same-day service for guests staying more than one night.',
    },
    {
        icon: <FaConciergeBell />,
        title: '24/7 Concierge',
        desc: 'A front desk that never closes, for anything from restaurant bookings to local tips.',
    },
    {
        icon: <FaUsers />,
        title: 'Events & Meetings',
        desc: 'Flexible spaces for small gatherings, meetings, and private celebrations.',
    },
    ];

export default function Services() {
    return (
        <section id="services" className="bg-background px-8 py-28 md:px-16">
        <div className="mx-auto max-w-8xl">
            <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
                <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                What We Offer
                </div>
                <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                Services
                </h2>
            </div>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-stone">
                Everything a stay needs, handled quietly and well — a closer look at each is
                just a click away.
            </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
                <Link
                key={s.title}
                href="/services"
                className="group flex flex-col rounded-md border border-ink/10 bg-white p-7 transition hover:border-brass/40 hover:shadow-md"
                >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/40 text-lg text-brass">
                    {s.icon}
                </span>
                <h3 className="mt-5 font-display text-lg font-medium text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-stone">{s.desc}</p>
                <span className="mt-4 font-mono text-[11px] uppercase tracking-wide text-brass opacity-0 transition group-hover:opacity-100">
                    Learn more &rarr;
                </span>
                </Link>
            ))}
            </div>

            <div className="mt-14 flex justify-center">
            <Link
                href="/services"
                className="rounded-sm bg-ink px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition hover:bg-brass hover:text-ink"
            >
                View All Services
            </Link>
            </div>
        </div>
        </section>
    );
}