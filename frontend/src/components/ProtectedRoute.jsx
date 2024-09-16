
import { Navigate } from "react-router-dom";
import { hasRole } from "../utils/auth";

function ProtectedRoute({ children, role }) {
  return hasRole(role) ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
