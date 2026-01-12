import {
  FaUsers,
  FaBoxOpen,
  FaChartLine,
  FaUserShield,
  FaBell,
  FaCloud,
} from "react-icons/fa";
import Container from "./Container";
import Title from "../Utilities/Title";
import SubTitle from "../Utilities/SubTitle";
import { pageAnimations } from "../utils/aosAnimations";

const Features = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: "Employee Management",
      desc: "Manage employees, roles, and company affiliations from a single dashboard.",
    },
    {
      icon: <FaBoxOpen />,
      title: "Asset Tracking",
      desc: "Track company assets, availability, assignments, and returns in real time.",
    },
    {
      icon: <FaChartLine />,
      title: "Smart Analytics",
      desc: "View usage statistics, asset distribution, and employee insights.",
    },
    {
      icon: <FaUserShield />,
      title: "Role-Based Access",
      desc: "Secure access for Admin, HR, and Employees with permission control.",
    },
    {
      icon: <FaBell />,
      title: "Request & Approval System",
      desc: "Employees request assets, HR approves with package limit validation.",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Based & Secure",
      desc: "Firebase authentication and MongoDB ensure data safety and scalability.",
    },
  ];

  return (
    <Container>
      <div className="py-16">
        {/* Section Header */}
        <div className="text-center mb-16" {...pageAnimations.features.title}>
          <Title normal={"Powerful"} color={"Features"} />
          <SubTitle>
            Everything you need to manage assets, employees, and approvals — all
            in one modern platform.
          </SubTitle>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 hover:shadow-xl border border-gray-200/30 transition-all duration-300 hover:scale-105"
              {...pageAnimations.features.card(index)}
            >
              <div className="card-body items-center text-center p-8">
                {/* Feature Icon */}
                <div
                  className="text-5xl text-primary mb-6 transform transition-transform duration-300 hover:scale-110"
                  {...pageAnimations.features.icon}
                  data-aos-delay={`${200 + index * 100}`}
                >
                  {feature.icon}
                </div>

                {/* Feature Title */}
                <h3
                  className="card-title text-xl font-bold mb-4 text-neutral"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={`${300 + index * 100}`}
                >
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p
                  className="text-secondary leading-relaxed"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={`${400 + index * 100}`}
                >
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-16"
          data-aos="zoom-in"
          data-aos-duration="800"
          data-aos-delay="800"
        >
          <p className="text-secondary mb-6">
            Ready to streamline your asset management?
          </p>
          <button className="btn btn-primary btn-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300">
            Get Started Today
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Features;
