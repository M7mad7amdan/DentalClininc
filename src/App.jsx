
import Navbar from "@/components/Navbar";
import ToothIntro from "@/components/ToothIntro";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Results from "@/components/Results";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F8FAFC] text-[#032654]"
    >
      <ToothIntro />

      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <Results />

        <Services />

        <section id="why-us">
          <WhyChooseUs />
        </section>

        <Testimonials />

        <Booking />
      </main>

      <Footer />
    </div>
  );
}
