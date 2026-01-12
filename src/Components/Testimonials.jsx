import { Star, Building2, Users, ShieldCheck } from "lucide-react";
import Container from "./Container";
import Title from "../Utilities/Title";
import SubTitle from "../Utilities/SubTitle";
import useAOS from "../hooks/useAOS";
import { pageAnimations } from "../utils/aosAnimations";

const TestimonialsSection = () => {
  // Initialize AOS
  useAOS();

  const states = [
    {
      icon: <Building2 />,
      state: "100+",
      name: "Companies Served",
    },
    {
      icon: <Users />,
      state: "5000+",
      name: "Active Employees",
    },
    {
      icon: <ShieldCheck />,
      state: "99.9%",
      name: "System Uptime",
    },
    {
      icon: <Star />,
      state: "4.9/5",
      name: "Customer Rating",
    },
  ];

  const testimonials = [
    {
      text: "AssetVerse completely transformed how we manage company assets. It's fast, reliable, and extremely easy to use.",
      author: "— Sarah Johnson, HR Manager",
    },
    {
      text: "Tracking assets for 200+ employees used to be a nightmare, but AssetVerse made everything automated and stress-free.",
      author: "— Mark Wilson, Operations Head",
    },
    {
      text: "Excellent support team! Their Premium plan gave us full control and custom branding. Highly recommended!",
      author: "— Daniel Gomez, CEO",
    },
  ];

  return (
    <Container>
      <div className="text-center" {...pageAnimations.testimonials.title}>
        <Title normal={"Trusted by "} color={"Top Companies"} />
        <SubTitle>
          More than 100+ businesses rely on AssetVerse for asset management.
        </SubTitle>
      </div>

      {/*---------- Stats ---------*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-center">
        {states.map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-base-100 rounded-2xl border border-gray-200"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={`${index * 100}`}
          >
            <span
              className="mx-auto text-secondary *:w-10 *:h-10 inline-block"
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-delay={`${200 + index * 100}`}
            >
              {stat.icon}
            </span>
            <h3
              className="text-3xl font-bold text-base-content mt-2"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={`${300 + index * 100}`}
            >
              {stat.state}
            </h3>
            <p
              className="text-base text-gray-500"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={`${400 + index * 100}`}
            >
              {stat.name}
            </p>
          </div>
        ))}
      </div>

      {/* ----------------Testimonials------------------- */}
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-8 bg-base-100 rounded-2xl shadow border border-gray-200 text-gray-500"
            {...pageAnimations.testimonials.card(index)}
          >
            <p
              className="italic"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={`${200 + index * 150}`}
            >
              "{testimonial.text}"
            </p>
            <h4
              className="mt-4 font-semibold"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={`${300 + index * 150}`}
            >
              {testimonial.author}
            </h4>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TestimonialsSection;
