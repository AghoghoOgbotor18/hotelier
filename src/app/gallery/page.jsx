import PageHero from '../components/PageHero';
import GalleryGrid from '../components/Gallery/GalleryGrid';
import PageCta from '../components/PageCta';

export default function GalleryPage() {
    return (
        <>
        <PageHero title="Gallery" image="/images/finedining.webp" />
        <GalleryGrid />
        <PageCta
            title="Ready to see it in person?"
            subtitle="Browse available rooms and book your stay."
            buttonText="View Rooms"
            buttonHref="/rooms"
            dark
        />
        </>
    );
}