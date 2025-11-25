import Cookies from "js-cookie";
import requests from "./httpRequest";

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await requests.post("/auth/login", { email, password });
      
      if (response.success && response.data) {
        const { accessToken, refreshToken, user } = response.data;
        
        if (accessToken) {
          Cookies.set("accessToken", accessToken, { 
            expires: 7,
            path: "/",
            sameSite: "Lax"
          });
        }
        
        if (refreshToken) {
          Cookies.set("refreshToken", refreshToken, { 
            expires: 30,
            path: "/",
            sameSite: "Lax"
          });
        }
        
        return user;
      }
      
      throw new Error(response.message || "Login failed");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      throw new Error(errorMessage);
    }
  },

  register: async (body) => {
    try {
      const response = await requests.post("/auth/register", body);
      
      if (response.success && response.data) {
        const { accessToken, refreshToken, user } = response.data;
        
        if (accessToken) {
          Cookies.set("accessToken", accessToken, { 
            expires: 7,
            path: "/",
            sameSite: "Lax"
          });
        }
        
        if (refreshToken) {
          Cookies.set("refreshToken", refreshToken, { 
            expires: 30,
            path: "/",
            sameSite: "Lax"
          });
        }
        
        return user;
      }
      
      throw new Error(response.message || "Registration failed");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Registration failed";
      throw new Error(errorMessage);
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await requests.get("/auth/me");
      
      if (response.success && response.data) {
        return response.data;
      }
      
      return null;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated: () => {
    const accessToken = Cookies.get("accessToken");
    return !!accessToken;
  },

  logout: () => {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
  },

  refreshToken: async () => {
    const refreshToken = Cookies.get("refreshToken");
    
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    
    const response = await requests.post("/auth/refresh", { refreshToken });
    
    if (response.success && response.data) {
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      
      if (accessToken) {
        Cookies.set("accessToken", accessToken, { 
          expires: 7,
          path: "/",
          sameSite: "Lax"
        });
      }
      
      if (newRefreshToken) {
        Cookies.set("refreshToken", newRefreshToken, { 
          expires: 30,
          path: "/",
          sameSite: "Lax"
        });
      }
      
      return true;
    }
    
    throw new Error("Token refresh failed");
  },
};

export default AuthService;

