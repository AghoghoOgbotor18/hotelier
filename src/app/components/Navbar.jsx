'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from "react-icons/fa"

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Rooms', href: '/rooms' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact' },
];


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 40);
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    //active links
    function isActive(href) {
        return href === '/' ? pathname === '/' : pathname.startsWith(href);
    }

    return (
        <nav className={`fixed inset-x-0 top-0 z-30 px-6 py-5 transition-colors duration-300 md:px-10 lg:px-16 ${scrolled ? 'bg-ink/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
            <div className="flex items-center justify-between">
                <Link href="/" className="font-display text-2xl font-medium tracking-tight text-ivory">
                Hotel<span className="text-brass">ier</span>
                </Link>

                <div className="hidden items-center gap-8 font-sans text-sm lg:flex">
                    {navLinks.map((l) => (
                        <Link key={l.label} href={l.href} className={`relative pb-1 transition ${isActive(l.href) ? 'text-brass' : 'text-ivory/85 hover:text-brass'}`}>
                            {l.label}
                            {isActive(l.href) && <span className="absolute inset-x-0 -bottom-0.5 h-0 w-2 bg-brass" />}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                <a href={`tel: +2348168973060`} className="hidden font-mono text-sm text-ivory/85 transition hover:text-brass md:inline">
                    +2348168973060
                </a>
                <Link href="/rooms" className="rounded-sm border border-brass-dim px-5 py-2.5 font-sans text-xs uppercase tracking-widest text-brass transition hover:bg-brass hover:text-ink">
                    Book now
                </Link>
                <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open} className="flex h-9 w-9 items-center justify-center text-ivory lg:hidden">
                    {open ? (
                        <FaTimes />
                    ) : (
                        <FaBars />
                    )}
                </button>
                </div>
            </div>

            {open && (
                <div className="mt-4 flex flex-col gap-1 rounded-md bg-ink/95 p-6 backdrop-blur-sm lg:hidden">
                {navLinks.map((l) => (
                    <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className={`py-2.5 font-sans text-sm transition ${isActive(l.href) ? 'text-brass' : 'text-ivory/90 hover:text-brass'}`}>
                    {l.label}
                    </Link>
                ))}
                <a href={`tel:+2348168973060`} className="mt-2 border-t border-ivory/10 pt-4 font-mono text-xs text-ivory/70 md:hidden">
                    +2348168973060
                </a>
                </div>
            )}
        </nav>
    );
}