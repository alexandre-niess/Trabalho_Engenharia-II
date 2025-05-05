import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminPrivateRoute = ({ children }) => {
  const { currentUser, userType } = useAuth();

  // Não logado? Redireciona para login
  if (!currentUser) return <Navigate to="/login" />;

  // Logado, mas não é admin? Redireciona para página inicial
  if (userType !== "admin") return <Navigate to="/" />;

  // Admin autenticado
  return children;
};

export default AdminPrivateRoute;
