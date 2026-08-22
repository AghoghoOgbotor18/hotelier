import Link from 'next/link';

export default function PageCta({ title, subtitle, buttonText, buttonHref, dark = false }) {
    return (
        <section
        className={`px-8 py-20 text-center md:px-16 ${dark ? 'bg-black' : 'bg-background'}`}
        >
        <h3 className={`font-display text-3xl font-medium md:text-4xl ${dark ? 'text-ivory' : 'text-ink'}`}>
            {title}
        </h3>
        <p className={`mx-auto mt-3 max-w-md font-sans text-sm ${dark ? 'text-ivory/60' : 'text-stone'}`}>
            {subtitle}
        </p>
        <Link
            href={buttonHref}
            className={
            dark
                ? 'mt-8 inline-block rounded-sm bg-brass px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-ink transition hover:opacity-90'
                : 'mt-8 inline-block rounded-sm bg-ink px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition hover:bg-brass hover:text-ink'
            }
        >
            {buttonText}
        </Link>
        </section>
    );
}