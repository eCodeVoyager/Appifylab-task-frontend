import Cookies from "js-cookie";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000'}/api`;
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    let token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    
    const isAuthEndpoint = originalRequest.url?.includes('/auth/login') || 
                          originalRequest.url?.includes('/auth/register');
    
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      
      const refreshToken = Cookies.get("refreshToken");
      
      if (refreshToken) {
        try {
          const response = await instance.post("/auth/refresh", { refreshToken });
          
          if (response.data?.success && response.data?.data) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
            
            if (accessToken) {
              Cookies.set("accessToken", accessToken, { expires: 7 });
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            
            if (newRefreshToken) {
              Cookies.set("refreshToken", newRefreshToken, { expires: 30 });
            }
            
            return instance(originalRequest);
          }
        } catch (refreshError) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
      
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url, params, headers) => {
    const config = { params, headers };
    return instance.get(url, config).then(responseBody);
  },

  post: (url, body, headers) => {
    const config = { headers };
    return instance.post(url, body, config).then(responseBody);
  },

  put: (url, body, headers) => {
    const config = { headers };
    return instance.put(url, body, config).then(responseBody);
  },

  patch: (url, body, headers) => {
    const config = { headers };
    return instance.patch(url, body, config).then(responseBody);
  },

  delete: (url, data, headers) => {
    const config = { headers, data };
    return instance.delete(url, config).then(responseBody);
  },
};

export default requests;
