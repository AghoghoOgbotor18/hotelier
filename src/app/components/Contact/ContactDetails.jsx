import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const items = [
    {
        icon: <FaMapMarkerAlt />,
        label: 'Address',
        value: '14 Aba Road, GRA Phase 2, Port Harcourt, Rivers State.',
    },
    {
        icon: <FaPhoneAlt />,
        label: 'Phone',
        value: '+234 805 086 9190',
        href: 'tel:+2348050869190',
    },
    {
        icon: <FaEnvelope />,
        label: 'Email',
        value: 'reservations@hotelier.com',
        href: 'mailto:reservations@hotelier.com',
    },
    {
        icon: <FaClock />,
        label: 'Front Desk',
        value: 'Open 24 hours, every day',
    },
];

export default function ContactDetails() {
    return (
        <div className="flex flex-col gap-8 rounded-md bg-ink p-8 md:p-10">
        {items.map((item) => (
            <div key={item.label} className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/40 text-brass">
                {item.icon}
            </span>
            <div>
                <div className="font-mono text-xs uppercase tracking-wide text-brass">
                {item.label}
                </div>
                {item.href ? (
                <a href={item.href} className="mt-1 block font-sans text-sm text-ivory transition hover:text-brass">
                    {item.value}
                </a>
                ) : (
                <p className="mt-1 font-sans text-sm text-ivory">{item.value}</p>
                )}
            </div>
            </div>
        ))}
        </div>
    );
}