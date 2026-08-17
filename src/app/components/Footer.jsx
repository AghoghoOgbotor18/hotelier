// src/components/Footer.jsx
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLocationArrow, FaMailBulk, FaMailchimp, FaMap, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot, FaLocationPin, FaMessage } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reservations', href: '/rooms' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const socials =  [<FaFacebook />, <FaInstagram />, <FaWhatsapp />, <FaTwitter />];

const phones = '+234 805 086 9190';
const EMAIL = 'reservations@hotelier.com';
const ADDRESS = '14 GRA Phase 2, Port Harcourt, Rivers State.';

function FooterHeading({ children }) {
    return (
        <div className="relative mb-6 inline-block">
            <h3 className="font-display text-base font-medium text-ivory">{children}</h3>
            <span className="absolute -bottom-2 left-0 h-px w-28 bg-gradient-to-r from-brass via-brass/40 to-transparent" />
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="relative overflow-hidden">
            <img src="/images/hero1.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/90" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/60 to-transparent" />

            <div className="relative z-10 mx-auto max-w-6xl px-8 py-20 md:px-16">
                <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
                    <div>
                        <div className="font-display text-2xl font-medium text-ivory">
                        Hotel<span className="text-brass">ier</span>
                        </div>
                        <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-ivory/60">
                        Experience comfort, luxury, and unforgettable stays at Hotelier. Book your perfect room and make every stay feel like home.
                        </p>
                        <div className='flex items-center gap-3 py-4'>
                            {
                               socials.map((social, id) => (
                                <a href="#" key={id} className='border p-3 border-white/50 hover:bg-brass text-white hover:border-brass'>
                                    {social}
                                </a>
                               ))
                            }
                        </div>
                    </div>

                    <div>
                        <FooterHeading>Quick Links</FooterHeading>
                        <ul className="flex flex-col gap-3">
                        {quickLinks.map((l) => (
                            <li key={l.label}>
                            <Link href={l.href} className="font-sans text-sm text-ivory/65 transition hover:text-brass">{l.label}</Link>
                            </li>
                        ))}
                        </ul>
                    </div>

                    <div>
                        <FooterHeading>Contact</FooterHeading>
                        <ul className="flex flex-col gap-3 font-sans text-sm text-ivory/65">
                            <li className="leading-relaxed flex gap-2.5">
                                <FaLocationDot className='text-brass' size={20} />{ADDRESS}
                            </li>
                            <a href={`tel:${phones.replace(/\s/g, '')}`} className="font-mono text-[13px] transition hover:text-brass flex items-center gap-2.5">
                                <FaPhone className='text-brass' />{phones}
                            </a>
                            <li><a href={`mailto:${EMAIL}`} className="transition hover:text-brass flex items-center gap-2.5">
                                <FiMail className='text-brass' />{EMAIL}
                            </a></li>
                        </ul>
                    </div>

                    <div>
                        <FooterHeading>Reservations</FooterHeading>
                        <p className="font-sans text-sm leading-relaxed text-ivory/60">
                        Our front desk is open 24 hours. Reserve online, or call us and our team will take care of the rest.
                        </p>
                        <Link href="/rooms" className="mt-5 inline-block rounded-xs bg-brass px-6 py-4 font-sans text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-brass">
                        Book Your Stay
                        </Link>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-ivory/10 pt-8 font-mono text-xs text-ivory/40 md:flex-row md:items-center">
                    <p>&copy; {new Date().getFullYear()} Hotelier. All rights reserved.</p>
                    <p>Reservations <a href={`tel:${phones[0].replace(/\s/g, '')}`} className="text-brass transition hover:opacity-80">{phones}</a></p>
                </div>
            </div>
        </footer>
    );
}