import axios from "axios";

const api = axios.create({
  baseURL: "https://couplezonebackend-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// 🔐 Ajout automatique du token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
