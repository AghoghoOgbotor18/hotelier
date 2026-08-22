import PageCta from "../components/PageCta"
import PageHero from "../components/PageHero"
import Amenities from "../components/Services/Amenities"
import ServicesSection from "../components/Services/ServicesIntro"

export default function Services(){

    return (
        <>
            <PageHero title="Services" image="/images/hero4.webp" />
            <ServicesSection />
            <Amenities />
            <PageCta title="Have a question about a service?"
                subtitle="Our front desk can help with anything not covered here."
                buttonText="Get in Touch"
                buttonHref="/contact"
                dark
            />
        </>
    )
}