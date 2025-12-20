import React from "react";
import About from "../../Components/About";
import Packages from "../../Components/Packages";
import TestimonialsSection from "../../Components/Testimonials";
import FAQSection from "../../Components/FAQSection";
import { motion } from "framer-motion";
import Hero from "../../Components/Hero";
import useRole from "../../hooks/useRole";

const Home = () => {
  const { role } = useRole();

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="bg-base-200">
      <div className=" py-10 mx-auto w-11/12  max-w-7xl">
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          roduct
        >
          <Hero />
        </motion.div>
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          roduct
        >
          <About />
        </motion.div>
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          roduct
        >
          {role === "Hr" && <Packages />}
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          roduct
        >
          <TestimonialsSection />
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          roduct
        >
          <FAQSection />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
