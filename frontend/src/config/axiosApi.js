import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_SERVER;

if (!baseURL) {
  throw new Error("Missing VITE_BACKEND_URL");
}

export const axiosApi = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
});
