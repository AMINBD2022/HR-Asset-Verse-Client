import React from "react";
import { Outlet } from "react-router";
import Header from "../Components/Header";

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
