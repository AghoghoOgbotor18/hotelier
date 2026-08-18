import Link from "next/link";
import { FaArrowRight, FaBolt, FaTags, FaClock, FaWifi, FaCoffee, FaSwimmer } from "react-icons/fa";

const benefits = [
  { id: 1, icon: <FaBolt />, title: "Fast Booking", tag: "100% free", desc: "Reserve your room in minutes online — no forms, no waiting on a call back." },
  { id: 2, icon: <FaTags />, title: "Best Rate Guarantee", tag: "No hidden fees", desc: "Book directly with us and you'll always get the best available rate on the room." },
  { id: 3, icon: <FaClock />, title: "Reservations 24/7", tag: "Always open", desc: "24-hour front desk service, with fast check-in and check-out whenever you arrive." },
  { id: 4, icon: <FaWifi />, title: "High Speed Wi-Fi", tag: "Zero cost", desc: "Free Wi-Fi throughout every room and public area, fast enough to actually work from." },
  { id: 5, icon: <FaCoffee />, title: "Free Breakfast", tag: "Daily, 7–9:30am", desc: "Complimentary buffet breakfast at the main restaurant every morning of your stay." },
  { id: 6, icon: <FaSwimmer />, title: "Pool & Gym Access", tag: "100% free", desc: "Unwind at the pool or keep up your routine at the gym — both open to every guest." },
];

export default function Bookings() {
    return (
        <section className="bg-ink px-8 py-28 md:px-16">
        <div className="mx-auto max-w-9xl">
            <div className="mb-14 text-center">
            <p className="mb-3 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                <span className="h-px w-6 bg-brass" />
                Bookings
                <span className="h-px w-6 bg-brass" />
            </p>
            <h3 className="font-display text-4xl font-medium text-ivory md:text-5xl">Online Booking Benefits</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
                <div key={b.id} className="group flex flex-col justify-between gap-6 rounded-md border border-brass/15 bg-ink bg-panel/40 p-6 transition hover:border-brass/40">
                <div>
                    <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/40 text-lg text-brass">{b.icon}</span>
                    <span className="rounded-full bg-brass/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-brass">{b.tag}</span>
                    </div>
                    <h4 className="mt-5 font-display text-lg font-medium text-ivory">{b.title}</h4>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/60">{b.desc}</p>
                </div>
                <Link href="/rooms" className="flex items-center gap-1.5 font-sans text-sm text-brass">
                    Book Now
                    <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }