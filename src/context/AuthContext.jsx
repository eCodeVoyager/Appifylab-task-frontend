import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (Auth.isAuthenticated()) {
        try {
          const userData = await Auth.getCurrentUser();
          if (userData) {
            setUser(userData);
          }
        } catch {
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await Auth.login(email, password);
      setUser(userData);
      navigate("/feed");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const user = await Auth.register(userData);
      setUser(user);
      navigate("/feed");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
