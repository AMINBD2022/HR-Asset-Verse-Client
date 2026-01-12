import { Briefcase, Clock, ShieldCheck, Users } from "lucide-react";
import React from "react";
import Container from "./Container";
import Title from "../Utilities/Title";
import SubTitle from "../Utilities/SubTitle";
import { pageAnimations } from "../utils/aosAnimations";

const About = () => {
  const benefits = [
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Smart Asset Management",
      desc: "Track all company assets in real-time and reduce asset loss.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Secure & Reliable",
      desc: "Your company data is encrypted and safely stored on the cloud.",
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Save Time & Money",
      desc: "Automated workflows that speed up the entire asset management process.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Employee Friendly",
      desc: "Easy request system for employees to ask assets with one click.",
    },
  ];

  return (
    <Container>
      <div className="py-16 rounded-2xl">
        {/* Section Header */}
        <div className="text-center mb-16" {...pageAnimations.about.title}>
          <Title normal={" Why Choose"} color={"AssetVerse ?"} />
          <SubTitle>
            Efficient, secure and modern tools to help you manage your company
          </SubTitle>
        </div>

        {/* Benefits Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-base-100 text-base-content p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-200/30 space-y-6 hover:scale-105"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={`${index * 150}`}
            >
              {/* Icon */}
              <div
                className="flex justify-center text-success transform transition-transform duration-300 hover:scale-110"
                data-aos="zoom-in"
                data-aos-duration="600"
                data-aos-delay={`${200 + index * 150}`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold text-neutral"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={`${300 + index * 150}`}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm text-secondary leading-relaxed"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={`${400 + index * 150}`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="800"
        >
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold text-neutral mb-4">
              Ready to Transform Your Asset Management?
            </h3>
            <p className="text-secondary mb-6 max-w-2xl mx-auto">
              Join thousands of companies who trust AssetVerse to manage their
              assets efficiently and securely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free Trial
              </button>
              <button className="btn btn-outline btn-lg px-8 hover:bg-primary hover:text-primary-content transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
