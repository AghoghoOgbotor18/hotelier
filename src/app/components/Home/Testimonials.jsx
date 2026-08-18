'use client';

import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
    {
        quote:
        "Booked a room the night before with no hassle at all, and the room itself was even better than the photos. The courtyard in the morning is worth the stay on its own.",
        name: 'Amara Okafor',
        location: 'Lagos, Nigeria',
        rating: 5,
    },
    {
        quote:
        "Quiet, clean, and the staff actually remembered my name by the second day. It felt less like a hotel and more like somewhere I'd choose to come back to on purpose.",
        name: 'David Eze',
        location: 'Abuja, Nigeria',
        rating: 5,
    },
    {
        quote:
        "Stayed for a work trip and ended up extending two extra nights. The Terrace Suite has the best light in the late afternoon — hard to leave that balcony.",
        name: 'Chioma Nwosu',
        location: 'Port Harcourt, Nigeria',
        rating: 4,
    },
];

export default function Testimonials() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const current = testimonials[active];

    return (
        <section className="bg-ink px-8 py-28 md:px-16">
            <div className="mx-auto max-w-3xl text-center">
                <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                Guest Stories
                </div>
                <h2 className="font-display text-4xl font-medium text-ivory md:text-5xl">
                What guests are saying
                </h2>

                <div className="relative mt-14">
                {/* large decorative quotation mark */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-display text-8xl text-brass/15"
                >
                    &ldquo;
                </span>

                <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                        key={i}
                        className={`text-sm ${i < current.rating ? 'text-brass' : 'text-ivory/15'}`}
                    />
                    ))}
                </div>

                <p
                    className="relative mt-6 font-display text-2xl font-light leading-relaxed text-ivory md:text-3xl"
                    style={{ fontStyle: 'italic' }}
                >
                    {current.quote}
                </p>

                <div className="mt-8 font-sans text-sm text-ivory/60">
                    <span className="text-ivory">{current.name}</span>
                    <span className="mx-2 text-brass">&middot;</span>
                    {current.location}
                </div>
                </div>

                {/* dot indicators */}
                <div className="mt-10 flex justify-center gap-2">
                {testimonials.map((t, index) => (
                    <button
                    key={t.name}
                    onClick={() => setActive(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === active ? 'w-6 bg-brass' : 'w-1.5 bg-ivory/25'
                    }`}
                    />
                ))}
                </div>
            </div>
        </section>
    );
}