import About from "../../Components/About";
import Packages from "../../Components/Packages";
import TestimonialsSection from "../../Components/Testimonials";
import FAQSection from "../../Components/FAQSection";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import useAOS from "../../hooks/useAOS";
import Features from "../../Components/Features";
import CallToAction from "../../Components/CallToAction";
import HowItWorks from "../../Components/HowItWorks";
import HeroSlider from "../../Components/HeroSlider";

const Home = () => {
  const { user } = useAuth();
  const { role } = useRole();

  // Initialize AOS for this page
  useAOS();

  // Show packages only for HR users who are logged in
  const ShowPackages = user && role === "hr";

  return (
    <div className="bg-base-200">
      <section data-aos="fade-in" data-aos-duration="1000">
        <HeroSlider />
      </section>

      <section data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
        <Features />
      </section>

      <section data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
        <HowItWorks />
      </section>

      <section data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
        <About />
      </section>

      {ShowPackages && (
        <section
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          <Packages />
        </section>
      )}
      <section data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
        <TestimonialsSection />
      </section>
      <section data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
        <FAQSection />
      </section>
      <section data-aos="zoom-in" data-aos-duration="800" data-aos-delay="700">
        <CallToAction />
      </section>
    </div>
  );
};

export default Home;
