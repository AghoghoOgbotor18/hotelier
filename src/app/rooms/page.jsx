import PageHero from "../components/PageHero";
import RoomsListing from '../components/Rooms/RoomsListing';
import { getRoomsWithAvailability } from '@/lib/availability';

export default async function RoomsPage({ searchParams }) {
    const params = await searchParams;
    const checkIn = params?.checkIn || null;
    const checkOut = params?.checkOut || null;
    const adults = Number(params?.adults) || 0;
    const children = Number(params?.children) || 0;
    const minGuests = adults + children > 0 ? adults + children : null;

    const rooms = await getRoomsWithAvailability({ checkIn, checkOut, minGuests });

    return (
        <>
            <PageHero title="Rooms & Suites" />
            <RoomsListing rooms={rooms} checkIn={checkIn} checkOut={checkOut} />
        </>
    );
    }