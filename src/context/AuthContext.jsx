import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../services/authService";
import { useUser } from "./UserContext";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { fetchUser, clearUser } = useUser();

  const login = async (email, password) => {
    try {
      await Auth.login(email, password);
      await fetchUser();
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
      await Auth.register(userData);
      await fetchUser();
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
    clearUser();
    navigate("/login");
  };

  const value = {
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
