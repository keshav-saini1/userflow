import axios from "axios";

function removeCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}

const BASE_URL = "http://localhost:3000"

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add headers or modify config here
    // Example: Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // You can handle responses globally here
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized: remove auth_token from cookies and localStorage
    if (error.response && error.response.status === 401) {
      // Remove from cookies
      removeCookie("auth_token");
      // Remove from localStorage
      localStorage.removeItem("auth_token");
    }
    return Promise.reject(error);
  }
);

export default api;
