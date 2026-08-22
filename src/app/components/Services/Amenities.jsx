const amenities = [
  '24 hours front desk service with fast check-in and check-out service',
  'Safe available at the Front desk and in all rooms',
  'Spacious rooms equipped with reading tables, mini fridge, dressing mirrors, electronic safe, and en-suite bathrooms',
  'Daily housekeeping service',
  'Integrated open pool bar giving an amazing natural ambience',
  'Water treatment plant',
  'Continental restaurant offering some of the best meals in Port Harcourt',
  'A cozy, secured indoor bar',
  'Discernible interest in security and privacy considerations',
  '24 hours power supply backed up by generators',
  '24 hours DSTV with 14 different channels in all rooms',
  'Free Wi-Fi available in all public areas and rooms',
  'Lift installed',
  'CCTV surveillance',
  'Corporate security guards and mobile police protection for additional cover',
  'Integrated 32" LED television set in all rooms',
  '150-seat conference hall with projector screen (on demand)',
  'Ample parking space within the facility',
  'Free airport shuttle, local transportation, and car hire on demand',
  'Private cocktail lounge',
];

import { FaCheck } from 'react-icons/fa';

export default function Amenities() {
    return (
        <section className="bg-ink px-8 py-24 md:px-16">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                        Facilities
                    </div>
                    <h2 className="font-display text-4xl font-medium text-ivory md:text-5xl">
                        Amenities at a Glance
                    </h2>
                    <p className="mt-5 font-sans text-sm leading-relaxed text-ivory/60">
                        Hotelier is built around the details — the current ambience surpasses most,
                        if not all, hotels available in Port Harcourt today. Every stay comes with
                        the following amenities and features:
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                    {amenities.map((item) => (
                        <div key={item} className="flex items-start gap-3 border-b border-ivory/10 py-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brass/50 text-[10px] text-brass">
                            <FaCheck />
                        </span>
                        <p className="font-sans text-sm leading-relaxed text-ivory/75">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}