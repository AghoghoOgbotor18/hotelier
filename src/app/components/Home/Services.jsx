import Link from 'next/link';
import { FaSpa, FaUtensils, FaShuttleVan, FaTshirt, FaConciergeBell, FaUsers } from 'react-icons/fa';
import ServicesCards from '../Services/ServicesCards';

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
        <section className="bg-background px-5 py-28 md:px-10">
            <div className="mx-auto max-w-9xl">
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

                <ServicesCards />
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