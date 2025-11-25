import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import AuthService from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const { user, loading, fetchUser } = useUser();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (AuthService.isAuthenticated() && !user && !loading) {
        try {
          await fetchUser();
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [user, loading, fetchUser]);

  if (loading || isChecking) {
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
