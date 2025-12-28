import axios from "axios";

const API_URL = "https://couplezonebackend-production.up.railway.app/api";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const register = (data: RegisterPayload) => {
  return axios.post(`${API_URL}/register`, data);
};

export const login = (data: LoginPayload) => {
  return axios.post(`${API_URL}/login`, data);
};
