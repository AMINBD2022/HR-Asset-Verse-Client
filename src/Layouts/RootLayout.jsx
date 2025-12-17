import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PageLoader from "../Components/PageLoader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RootLayout = () => {
  const { isLoading } = useAuth();
  const { roleLoading } = useRole();
  if (isLoading || roleLoading) {
    return <PageLoader />;
  }
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <Header />
      <section className="bg-base-200">
        <main className="w-11/12 mx-auto ">
          <Outlet />
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default RootLayout;
