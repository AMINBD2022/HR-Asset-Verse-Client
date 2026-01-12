import { BsTwitterX } from "react-icons/bs";
import {
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
} from "react-icons/fa";
import { IoArrowUpOutline } from "react-icons/io5";
import Logo from "./Logo";
import { Link } from "react-router";
import useAOS from "../hooks/useAOS";

const Footer = () => {
  // Initialize AOS
  useAOS();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-base-300 text-base-content border-t-2 border-gray-200/30">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Company Info */}
            <div
              className="lg:col-span-1"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="0"
            >
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-base-content mb-6 leading-relaxed">
                AssetVerse is a comprehensive HR asset management platform
              </p>
            </div>

            {/* Solutions */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <h3 className="text-lg font-bold text-base-content mb-6">
                Solutions
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/blogs"
                    className="text-base hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <span className="text-base hover:text-primary transition-colors duration-200 cursor-pointer">
                    Employee Management
                  </span>
                </li>
                <li>
                  <span className="text-base hover:text-primary transition-colors duration-200 cursor-pointer">
                    Inventory Control
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <h3 className="text-lg font-bold text-base-content mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-primary w-5 h-5 mt-1 shrink-0" />
                  <p className="text-base leading-relaxed">Mymensingh, 2003</p>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone className="text-primary w-4 h-4" />
                  <a
                    href="tel:+8801912874218"
                    className="text-base hover:text-primary transition-colors duration-200"
                  >
                    01912874218
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary w-4 h-4" />
                  <a
                    href="mailto:aminulxrp@gmail.com"
                    className="text-base hover:text-primary transition-colors duration-200"
                  >
                    aminulxrp@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-neutral-focus border-t border-neutral-content/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-base-content text-sm">
                &copy; {new Date().getFullYear()} AssetVerse Technologies Inc.
                All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="text-base hidden sm:block">Follow us:</span>
              <div className="flex gap-4">
                <a
                  href="https://x.com/ambonihaja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base hover:text-primary transition-colors duration-200"
                  aria-label="Follow us on Twitter"
                >
                  <BsTwitterX className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aminul-islam36"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base hover:text-primary transition-colors duration-200"
                  aria-label="Follow us on LinkedIn"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/aminul-islam36"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base hover:text-primary transition-colors duration-200"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="fixed bottom-17 right-11 btn btn-circle btn-primary btn-sm shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Back to top"
            >
              <IoArrowUpOutline className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
