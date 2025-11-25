import { createContext, useState, useContext, useCallback } from "react";
import AuthService from "../services/authService";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await AuthService.getCurrentUser();
      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
  }, []);

  const updateUserData = useCallback((data) => {
    setUser((prev) => ({ ...prev, ...data }));
  }, []);

  const value = {
    user,
    loading,
    fetchUser,
    clearUser,
    updateUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
