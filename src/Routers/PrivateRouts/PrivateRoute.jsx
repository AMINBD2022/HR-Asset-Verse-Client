import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (!user)
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  if (isLoading) {
    return <Loading />;
  }
  return children;
};

export default PrivateRoute;
