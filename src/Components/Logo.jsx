import React from "react";
import { Link } from "react-router";
import AssetLogo from "../assets/logo.png";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="text-2xl lg:text-4xl font-bold">
        <img src={AssetLogo} alt="AssetLink" className="w-13" />
      </Link>
    </div>
  );
};

export default Logo;
