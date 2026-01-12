import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PageLoader from "../Components/PageLoader";
import RouteLoader from "../Components/RouteLoader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RootLayout = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const { loading, user } = useAuth();
  const { roleLoading } = useRole();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Define public routes that don't need role loading
  const publicRoutes = ["/", "/home", "/blog", "/login", "/register"];
  const isPublicRoute =
    publicRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/blog/");

  // For public routes, only wait for auth loading
  // For protected routes, wait for both auth and role loading
  const shouldShowLoader = loading || (!isPublicRoute && user && roleLoading);

  if (shouldShowLoader) {
    return <PageLoader />;
  }

  const ThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <RouteLoader />
      <Header />
      <Outlet />
      <Footer />
      <button
        onClick={ThemeToggle}
        className="fixed bottom-6 right-6 btn btn-accent rounded-full text-white z-10"
      >
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
};

export default RootLayout;
