import Link from 'next/link';

export default function ContactCta() {
    return (
        <section className="border-t border-ivory/10 bg-black px-8 py-16 md:px-16">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
                <div>
                    <h3 className="font-display text-2xl font-medium text-ivory">
                        Still have questions?
                    </h3>
                    <p className="mt-1 font-sans text-sm text-ivory/60">
                        Our front desk is happy to help with anything not covered above.
                    </p>
                </div>
                <Link
                href="/contact"
                className="shrink-0 rounded-sm bg-brass px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-ink transition hover:opacity-90"
                >
                    Get in Touch
                </Link>
            </div>
        </section>
    );
}