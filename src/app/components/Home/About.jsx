import Image from 'next/image';
import Link from 'next/link';

const highlights = [
  { label: 'Prime Location', desc: "Set in the heart of Port Harcourt, close to business, dining, and the city's best spots." },
  { label: 'Elegant Rooms & Suites', desc: 'Thoughtfully designed spaces that feel more like a residence than a hotel room.' },
  { label: 'Warm, Attentive Service', desc: 'A team that knows the difference between good service and being remembered.' },
];

export default function About() {
    return (
        <section className="bg-background px-8 py-28 md:px-16">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md shadow-xl">
                        <Image src="/images/hero1.webp" alt="Inside Hotelier" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                    </div>
                    <div className="absolute -bottom-8 right-6 rounded-md bg-ink px-7 py-5 shadow-xl sm:right-10">
                        <div className="font-display text-3xl font-medium text-brass">10+</div>
                        <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ivory/70">Years of hospitality</div>
                    </div>
                    </div>

                    <div>
                    <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brass">About Hotelier</div>
                    <h2 className="font-display text-4xl font-medium leading-[1.1] text-ink md:text-5xl">
                        Where comfort meets <span style={{ fontStyle: 'italic' }} className="font-light text-brass">elegance.</span>
                    </h2>
                    <p className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-stone">
                        Hotelier is Port Harcourt's home for travelers who notice the details — the quiet of a well-designed room, a garden that catches the morning light, a staff that remembers your name by the second visit. Every space here was built around the idea that a hotel should feel less like a stopover and more like somewhere you actually want to be.
                    </p>

                    <div className="mt-10 flex flex-col gap-6">
                        {highlights.map((h, i) => (
                        <div key={h.label} className="flex gap-4">
                            <span className="mt-0.5 font-mono text-xs text-brass">0{i + 1}</span>
                            <div>
                            <div className="font-sans text-sm font-semibold text-ink">{h.label}</div>
                            <p className="mt-1 font-sans text-sm leading-relaxed text-stone">{h.desc}</p>
                            </div>
                        </div>
                        ))}
                    </div>

                    <Link href="/rooms" className="mt-10 inline-block rounded-sm border px-7 py-3.5 font-sans text-sm text-ink transition border-brass hover:text-brass">
                        Explore Rooms
                    </Link>
                </div>
            </div>
        </section>
    );
}