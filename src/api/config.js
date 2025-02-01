import axios from "axios";
import { store } from "../store/store";

export const API_URL = "https://minglechat-production.up.railway.app/";
export const IMAGE_API_URL = "https://minglechat-production.up.railway.app";
// export const API_URL = "http://localhost:8000/";
// export const IMAGE_API_URL = "http://localhost:8000";

const getToken = () => store.getState().auth?.token || "";

export const axiosSimple = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosMultipart = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const axiosAuth = axios.create({
  baseURL: API_URL,
});

axiosAuth.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const axiosAuthMultipart = axios.create({
  baseURL: API_URL,
});

axiosAuthMultipart.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});
