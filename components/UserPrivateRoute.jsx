import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserPrivateRoute = ({ children }) => {
  const { currentUser, userType } = useAuth();

  // Não logado? Redireciona para login
  if (!currentUser) return <Navigate to="/login" />;

  // Logado, mas é admin? Redireciona para o painel admin
  if (userType === "admin") return <Navigate to="/admin" />;

  // Usuário comum autenticado
  return children;
};

export default UserPrivateRoute;
