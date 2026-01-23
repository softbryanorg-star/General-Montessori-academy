import axios from "axios";

/**
 * Base Axios instance
 * This is used across the entire app
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Automatically attach admin token to requests
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Global response error handler
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout if token is invalid or expired
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;

//Central Axios Configuration (VERY IMPORTANT FILE)

/*This file:

Sets the backend base URL

Automatically attaches admin JWT token

Prevents code repetition

Handles auth globally*/  


/*
“I centralized API communication using Axios with interceptors to handle authentication, 
token injection, and global error handling.
 I separated admin and public APIs to enforce security boundaries and improve maintainability. 
 This prevents duplicated logic and ensures scalable frontend architecture.”


*/