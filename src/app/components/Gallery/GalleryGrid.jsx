'use client';

import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { galleryImages } from './GalleryData';

export default function GalleryGrid() {
    const [activeIndex, setActiveIndex] = useState(null);
    const isOpen = activeIndex !== null;

    function openAt(index) {
        setActiveIndex(index);
    }

    function close() {
        setActiveIndex(null);
    }

    function showPrev() {
        setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    }

    function showNext() {
        setActiveIndex((i) => (i + 1) % galleryImages.length);
    }

    useEffect(() => {
        if (!isOpen) return;
        function onKeyDown(e) {
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
        document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <section className="bg-background px-8 py-24 md:px-16">
        <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 max-w-xl text-center">
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                Gallery
            </div>
            <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                A closer look
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-stone">
                Rooms, spaces, and details from around the hotel.
            </p>
            </div>

            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryImages.map((img, index) => (
                <button
                key={img.id}
                onClick={() => openAt(index)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-md"
                >
                <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 transition group-hover:from-ink/90" />

                {/* this card's own caption only — img.alt refers to
                    THIS iteration's image, not the whole array */}
                <span className="absolute inset-x-0 bottom-0 p-4 text-left font-sans text-sm text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {img.alt}
                </span>
                </button>
            ))}
            </div>
        </div>

        {isOpen && (
            <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            onClick={close}
            >
            <button
                onClick={close}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory transition hover:border-brass hover:text-brass"
            >
                <FaTimes />
            </button>

            <button
                onClick={(e) => {
                e.stopPropagation();
                showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 text-ivory transition hover:border-brass hover:text-brass sm:left-6"
            >
                <FaChevronLeft />
            </button>

            <img
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].alt}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-[90vw] rounded-md object-contain shadow-2xl"
            />

            <button
                onClick={(e) => {
                e.stopPropagation();
                showNext();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 text-ivory transition hover:border-brass hover:text-brass sm:right-6"
            >
                <FaChevronRight />
            </button>

            {/* just THIS image's caption + the counter — no map here */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
                <span className="font-sans text-sm text-ivory">
                {galleryImages[activeIndex].alt}
                </span>
                <span className="font-mono text-xs text-ivory/50">
                {activeIndex + 1} / {galleryImages.length}
                </span>
            </div>
            </div>
        )}
        </section>
    );
}