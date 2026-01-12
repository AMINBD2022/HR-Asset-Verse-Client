import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAOS from "../../hooks/useAOS";

const ErrorPage = () => {
  const [countdown, setCountdown] = useState(20);
  const navigate = useNavigate();

  // Initialize AOS
  useAOS();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div
        className="max-w-4xl mx-auto text-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {/* Animated 404 Text */}
        <div
          className="relative mb-8"
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="text-8xl md:text-9xl font-bold text-primary/20 leading-none select-none animate-pulse">
            404
          </div>
        </div>

        {/* Error Message */}
        <div
          className="mb-8"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-secondary mb-2">
            The page you're looking for seems to have wandered off into the
            digital void.
          </p>
        </div>

        {/* Auto Redirect Notice */}
        <div
          className="bg-base-100 rounded-2xl p-6 mb-8 border border-base-300 shadow-md"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="loading loading-spinner loading-sm text-primary"></div>
            <span className="text-neutral font-medium">
              Redirecting to homepage in {countdown} seconds
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary btn-sm"
            data-aos="zoom-in"
            data-aos-duration="600"
            data-aos-delay="800"
          >
            Go Now
          </button>
        </div>

        {/* Footer */}
        <div
          className="mt-8 text-center"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="1000"
        >
          <p className="text-sm text-secondary">
            Error Code: 404 | AssetVerse HR Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
