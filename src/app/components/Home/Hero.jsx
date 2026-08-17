// src/components/Hero.jsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import BookingSearchBar from './BookingSearchBar';
import Link from 'next/link';

const images = [
  '/images/hero1.webp',
  '/images/hero2.webp',
  '/images/hero3.webp',
  '/images/hero4.webp',
];

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden flex justify-center items-center pb-20">
        {images.map((src, index) => (
            <div key={src} className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                    src={src}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className={`object-cover transition-transform duration-[6000ms] ease-out ${index === currentImage ? 'scale-110' : 'scale-100'}`}
                />
                </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink/80" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <h1 className="font-display text-5xl font-medium leading-[1.05] text-ivory md:text-7xl">
                Welcome to Hotel<span className="text-brass">ier</span>
                </h1>
                <p className="mt-4 font-display text-2xl font-light text-brass md:text-3xl" style={{ fontStyle: 'italic' }}>
                Experience luxury like never before.
                </p>
                <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-ivory/75 md:text-lg">
                Discover exceptional comfort, elegant rooms, and unforgettable experiences at Hotelier.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link href="/rooms" className="rounded-sm bg-brass px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-ink transition hover:opacity-90">
                    Book Your Stay
                </Link>
                <Link href="/rooms" className="rounded-sm border border-ivory/30 px-7 py-3.5 font-sans text-sm text-ivory transition hover:border-ivory/70">
                    View Rooms
                </Link>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {images.map((src, index) => (
                <button key={src} onClick={() => setCurrentImage(index)} aria-label={`Show slide ${index + 1}`} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentImage ? 'w-6 bg-brass' : 'w-1.5 bg-ivory/40'}`} />
                ))}
            </div>

            <div className="absolute inset-x-0 bottom-15 z-20 flex translate-y-1/2 justify-center px-4">
                <div className="w-full max-w-5xl">
                    <BookingSearchBar />
                </div>
            </div>
        </section>
    );
}