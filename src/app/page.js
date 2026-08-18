import About from "./components/Home/About";
import Bookings from "./components/Home/Bookings";
import BookingSearchBar from "./components/Home/BookingSearchBar";
import ContactCta from "./components/Home/Contactcta";
import Faq from "./components/Home/FAQ";
import Hero from "./components/Home/Hero";
import Rooms from "./components/Home/Rooms";
import Services from "./components/Home/Services";
import Testimonials from "./components/Home/Testimonials";


export default function Home(){

  return (
    <>
      <Hero />

      <div className="relative z-20 px-4 -mt-28 sm:-mt-28 lg:-mt-10 pointer-events-none">
        <div className="mx-auto w-full max-w-5xl pointer-events-auto">
          <BookingSearchBar />
        </div>
      </div>

      <About />
      <Rooms />
      <Bookings />
      <Services />
      <Testimonials />
      <Faq />
      <ContactCta />
    </>
  )

}