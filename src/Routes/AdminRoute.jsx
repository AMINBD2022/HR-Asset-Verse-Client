import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "hr" && role !== "Hr") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
