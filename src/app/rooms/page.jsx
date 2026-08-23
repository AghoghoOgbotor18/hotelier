import Bookings from '../components/Home/Bookings';
import PageHero from '../components/PageHero';
import RoomsListing from '../components/Rooms/RoomsListing';

export default function RoomsPage() {
    return (
        <>
            <PageHero title="Rooms & Suites" image="/images/hero3.webp" />
            <RoomsListing />
            <Bookings />
        </>
    );
}