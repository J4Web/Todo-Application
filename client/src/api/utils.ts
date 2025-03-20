import Cookies from "js-cookie";
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8080/api", // Use Vite env
});

API.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
