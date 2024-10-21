// UnAuthorized.js
import { Navigate } from "react-router-dom";

const UnAuthorized = ({ children }) => {
  const token = localStorage.getItem("token-sena");
  return token ? children : <Navigate to="/login" />;
};

export default UnAuthorized; // Exportación por defecto
