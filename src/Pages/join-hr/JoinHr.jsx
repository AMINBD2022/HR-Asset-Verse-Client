import React from "react";
import HrAdminRegisterForm from "../../Components/HrAdminRegisterForm";
import useAuth from "../../hooks/useAuth";
import AlreadyLoggedIn from "../../Components/AlreadyLoggedIn";
import { Link } from "react-router";

const JoinHr = () => {
  const { user } = useAuth();
  return user ? (
    <AlreadyLoggedIn />
  ) : (
    <div className="hero min-h-screen bg-base-200">
      <div className="card bg-base-100 w-full max-w-lg shadow-xl">
        <div className="card-body">
          <h2 className="text-4xl font-bold text-center">Create Account</h2>
          <p className="text-center">HR Manager</p>
          <HrAdminRegisterForm />
          <p className="mt-4 text-center">
            Already have an account?
            <Link to="/login" className="text-blue-700">
              Click here to sign in.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinHr;
