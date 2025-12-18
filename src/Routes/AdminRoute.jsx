import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { role, roleLoading } = useRole();

  if (isLoading || roleLoading) return <p>Loading ...</p>;

  if (!user) return <Navigate to="/login" />;

  if (role !== "Hr") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
