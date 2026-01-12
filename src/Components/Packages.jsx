import { useQuery } from "@tanstack/react-query";
import Container from "./Container";
import PackageCard from "./PackageCard";
import useaxiosPublic from "../hooks/useAxiosPublic";
import useAOS from "../hooks/useAOS";

const Packages = () => {
  // Initialize AOS
  useAOS();

  const axiosURL = useaxiosPublic();

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosURL.get("/packages");
      return res.data;
    },
  });

  return (
    <Container>
      <div className="grid md:grid-cols-3 gap-6 py-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={`${index * 150}`}
          >
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Packages;
