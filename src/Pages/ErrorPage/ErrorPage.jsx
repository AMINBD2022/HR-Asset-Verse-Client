import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center p-4">
      <h1 className="text-9xl font-bold text-error">404</h1>
      <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-500 mt-2">
        Oops! The page you are looking for does not exist.
      </p>

      <Link to="/" className="btn btn-secondary mt-6">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
