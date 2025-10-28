import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
console.log("API Base URL:", baseURL);

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use(async (config) => {
  const JWT = localStorage.getItem("_auth") || sessionStorage.getItem("_auth");
  if (JWT != null) {
    config.headers.Authorization = `Bearer ${JWT}`;
  }

  return config;
});

export default api;
