import React from "react";
import Logo from "../../Components/Logo";
import { Outlet } from "react-router";
import Header from "../../Components/Header/Header";

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
