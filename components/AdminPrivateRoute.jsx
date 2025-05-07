import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminPrivateRoute = ({ children }) => {
  const { currentUser, userType } = useAuth();

  if (!currentUser) return <Navigate to="/login" />;

  if (userType !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminPrivateRoute;
