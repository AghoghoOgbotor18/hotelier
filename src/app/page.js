import About from "./components/Home/About";
import Bookings from "./components/Home/Bookings";
import BookingSearchBar from "./components/Home/BookingSearchBar";
import Hero from "./components/Home/Hero";

export default function Home(){

  return (
    <>
      <Hero />
      <BookingSearchBar />
      <About />
      <Bookings />
    </>
  )

}