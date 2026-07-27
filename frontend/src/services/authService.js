import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials, expectedRole) => {
  const response = await api.post("/api/auth/login", {
    ...credentials,
    role: expectedRole,
  });
  localStorage.setItem("token", response.data.token);
  return response.data.user;
};

export const registerUser = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data.user;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const response = await api.get("/api/auth/me");
  console.log("response of current user",response);
  return response.data;
};