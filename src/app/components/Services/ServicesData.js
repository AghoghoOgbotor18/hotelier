import { FaSpa, FaUtensils, FaShuttleVan, FaTshirt, FaConciergeBell, FaUsers } from 'react-icons/fa';

export const services = [
    {
        id: 1,
        icon: <FaSpa />,
        title: 'Spa & Wellness',
        desc: 'A quiet space for massage, facials, and treatments designed to slow you down.',
        image: '/images/spa.webp',
    },
    {
        id: 2,
        icon: <FaUtensils />,
        title: 'Fine Dining',
        desc: 'A seasonal menu served in the main restaurant, from breakfast through late supper.',
        image: '/images/finedining.webp',
    },
    {
        id: 3,
        icon: <FaShuttleVan />,
        title: 'Airport Transfer',
        desc: 'Arranged on request once your booking is confirmed, at a fixed, upfront rate.',
        image: '/images/airport.webp',
    },
    {
        id: 4,
        icon: <FaTshirt />,
        title: 'Laundry & Dry Cleaning',
        desc: 'Same-day service for guests staying more than one night.',
        image: '/images/laundry.webp',
    },
    {
        id: 5,
        icon: <FaConciergeBell />,
        title: '24/7 Concierge',
        desc: 'A front desk that never closes, for anything from restaurant bookings to local tips.',
        image: '/images/consierge.webp',
    },
    {
        id: 6,
        icon: <FaUsers />,
        title: 'Events & Meetings',
        desc: 'Flexible spaces for small gatherings, meetings, and private celebrations.',
        image: '/images/events.webp',
    },
];