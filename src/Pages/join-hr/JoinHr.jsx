import React from "react";
import HrAdminRegisterForm from "../../Components/HrAdminRegisterForm";
import useAuth from "../../hooks/useAuth";
import AlreadyLoggedIn from "../../Components/AlreadyLoggedIn";

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
        </div>
      </div>
      <div className="hero-content w-full flex-col"></div>
    </div>
  );
};

export default JoinHr;
