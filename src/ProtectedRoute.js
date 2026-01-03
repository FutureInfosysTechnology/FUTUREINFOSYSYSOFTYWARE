import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loginData = localStorage.getItem("Login");

  if (!loginData) {
    return <Navigate to="/dasboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
