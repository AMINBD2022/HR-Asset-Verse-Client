import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  if (roleLoading) return <p>Checking permission...</p>;

  if (role !== "Hr") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
