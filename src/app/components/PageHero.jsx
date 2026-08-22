import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

export default function PageBanner({ title, image = '/images/hero1.webp' }) {
  return (
    <header className="relative flex h-[42vh] min-h-[280px] items-end overflow-hidden">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-transparent" />

      <div className="relative z-10 w-full px-8 pb-10 md:px-16">
        <nav className="mb-3 flex items-center gap-2 font-mono text-xs tracking-wide text-ivory/60">
          <Link href="/" className="transition hover:text-brass">Home</Link>
          <span><FaChevronRight /></span>
          <span className="text-brass">{title}</span>
        </nav>
        <h1 className="font-display text-4xl font-medium text-ivory md:text-5xl mt-4">{title}</h1>
      </div>
    </header>
  );
}