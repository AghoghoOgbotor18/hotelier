'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const faqs = [
    {
        q: 'Do I need to create an account to book a room?',
        a: 'No. You can search availability and complete a booking with just your name, email, and phone number — no sign-up required.',
    },
    {
        q: 'What time is check-in and check-out?',
        a: 'Check-in is from 2:00pm and check-out is by 12:00pm. Early check-in or late check-out can be arranged with the front desk, subject to availability.',
    },
    {
        q: 'Is breakfast included in the room rate?',
        a: 'Yes, complimentary buffet breakfast is included with every booking and served daily from 7:00am to 9:30am.',
    },
    {
        q: 'Can I cancel or change my reservation?',
        a: "Reservations can be changed or cancelled up to 24 hours before check-in for a full refund. Contact the front desk or reply to your booking confirmation to make changes.",
    },
    {
        q: 'Is airport transfer available?',
        a: 'Yes, airport transfer can be arranged on request once your booking is confirmed, at a fixed rate. Just let the front desk know your flight details in advance.',
    },
    {
        q: 'Do you offer free parking and Wi-Fi?',
        a: 'Both are complimentary for all guests — free Wi-Fi throughout the property and secure on-site parking.',
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    function toggle(index) {
        setOpenIndex((prev) => (prev === index ? -1 : index));
    }

    return (
        <section id="faq" className="bg-background px-8 py-28 md:px-16">
            <div className="mx-auto max-w-3xl">
                <div className="mb-14 text-center">
                    <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                        FAQ
                    </div>
                    <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="flex flex-col">
                {faqs.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                    <div key={item.q} className="border-b border-ink/10">
                        <button
                        onClick={() => toggle(index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                        >
                        <span className="font-sans text-base font-medium text-ink">{item.q}</span>
                        <FaPlus
                            className={`shrink-0 text-brass transition-transform duration-300 ${
                            isOpen ? 'rotate-45' : ''
                            }`}
                        />
                        </button>

                        {/* height-animates via CSS grid rows — no JS measuring needed */}
                        <div
                        className={`grid transition-all duration-300 ease-in-out ${
                            isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                        >
                        <div className="overflow-hidden">
                            <p className="font-sans text-sm leading-relaxed text-stone">{item.a}</p>
                        </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </section>
    );
}