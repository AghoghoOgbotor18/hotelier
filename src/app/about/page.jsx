import Image from 'next/image';
import Link from 'next/link';
import PageHero from "../components/PageHero"
import PageCta from '../components/PageCta';

const values = [
    {
        title: 'Genuine Hospitality',
        desc: 'Service that comes from actually caring how your stay goes, not a script.',
    },
    {
        title: 'Thoughtful Design',
        desc: 'Every room considered down to the light, the linens, and the little details.',
    },
    {
        title: 'Quiet Reliability',
        desc: "What we promise at booking is exactly what's waiting for you at check-in.",
    },
    ];

    export default function AboutPage() {
    return (
        <>
            <PageHero title="About" />

            {/* Story */}
            <section className="bg-background px-8 py-24 md:px-16">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md shadow-xl">
                    <Image
                        src="/images/hero2.webp"
                        alt="Inside Hotelier"
                        fill
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="object-cover"
                    />
                    </div>
                </div>

                <div>
                    <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                    Our Story
                    </div>
                    <h2 className="font-display text-4xl font-medium leading-[1.1] text-ink md:text-5xl">
                    A hotel built around the details.
                    </h2>
                    <p className="mt-6 font-sans text-[15px] leading-relaxed text-stone">
                    Hotelier opened with a simple idea: a stay in Port Harcourt should feel
                    considered, not just convenient. From the courtyard garden to the quiet of
                    each room, everything here was chosen deliberately — the kind of place
                    travelers notice the details in, and remember for it.
                    </p>
                    <p className="mt-4 font-sans text-[15px] leading-relaxed text-stone">
                    Whether you're passing through for a night or settling in for a longer stay,
                    our team treats every booking the same way: like you're a guest in a home,
                    not a number on a checklist.
                    </p>
                </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-ink px-8 py-24 md:px-16">
                <div className="mx-auto max-w-6xl">
                <div className="mb-14 max-w-lg text-center mx-auto">
                    <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                    What We Stand For
                    </div>
                    <h2 className="font-display text-4xl font-medium text-ivory md:text-5xl">
                    Our Values
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    {values.map((v, i) => (
                    <div key={v.title} className="rounded-md border border-brass/15 bg-panel p-7">
                        <span className="font-mono text-xs text-brass">0{i + 1}</span>
                        <h3 className="mt-4 font-display text-lg font-medium text-ivory">{v.title}</h3>
                        <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/60">{v.desc}</p>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            {/* Closing CTA */}
            <PageCta
                title="See it for yourself."
                subtitle="Browse our rooms and find the one that fits your stay."
                buttonText="View Rooms"
                buttonHref="/rooms"
            />
        </>
    );
}