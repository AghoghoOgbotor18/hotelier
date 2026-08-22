import PageHero from '../components/PageHero';
import ContactDetails from '../components/Contact/ContactDetails';
import ContactForm from '../components/Contact/ContactForm';

export default function ContactPage() {
    return (
        <>
            <PageHero title="Contact Us" image="/images/consierge.webp" />

            <section className="bg-background px-4 py-24 md:px-16">
                <div className="mx-auto grid max-w-9xl grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
                    <ContactForm />
                    <ContactDetails />
                </div>
            </section>
        </>
    );
}