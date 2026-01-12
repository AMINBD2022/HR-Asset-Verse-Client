import React from "react";
import { Link } from "react-router";
import useAOS from "../hooks/useAOS";

const CallToAction = () => {
  // Initialize AOS
  useAOS();

  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div
        className="max-w-7xl mx-auto px-6 text-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          data-aos="fade-down"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          Ready to Manage Your Company Assets Smarter?
        </h2>

        <p
          className="text-lg text-white/90 max-w-2xl mx-auto mb-8"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          Track assets, manage employees, approve requests, and control usage —
          all from one powerful dashboard.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          data-aos="zoom-in"
          data-aos-duration="600"
          data-aos-delay="600"
        >
          <Link to="/register">
            <button className="btn btn-accent btn-lg">Get Started Free</button>
          </Link>

          <Link to="/packages">
            <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              View Packages
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
