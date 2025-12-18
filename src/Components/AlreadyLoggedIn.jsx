import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

const AlreadyLoggedIn = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <img
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/219/219986.png"
            }
            alt={user.displayName}
            className="w-20 h-20 rounded-full border-4 border-indigo-500"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          You are already logged in
        </h2>

        <p className="text-gray-600 mt-2">
          Logged in as <br />
          <span className="font-semibold text-indigo-600">
            {user?.displayName}
          </span>
        </p>

        <p className="text-sm text-gray-500 mt-4">
          You don't need to access this page again.
        </p>

        <Link to="/">
          <button className="btn btn-outline btn-secondary px-6 mt-4">
            🏠 Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AlreadyLoggedIn;
