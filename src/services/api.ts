import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
