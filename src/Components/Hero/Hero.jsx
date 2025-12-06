import React from "react";
import HeroImage from "../../assets/bussniess.webp";

const Hero = () => {
  return (
    <div>
      <img
        src={HeroImage}
        alt="business-team"
        className="w-full h-180 object-top rounded-2xl"
      />
    </div>
  );
};

export default Hero;
