import React from "react";
import { Outlet } from "react-router";
import Header from "../Components/Header";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import PageLoader from "../Components/PageLoader";

const AuthLayout = () => {
  const { isLoading } = useAuth();
  const { roleLoading } = useRole();
  if (isLoading || roleLoading) {
    return <PageLoader />;
  }
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
