import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import AuthService from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const { user, loading, fetchUser } = useUser();

  useEffect(() => {
    if (AuthService.isAuthenticated() && !user && !loading) {
      fetchUser();
    }
  }, [user, loading, fetchUser]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!AuthService.isAuthenticated() || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
