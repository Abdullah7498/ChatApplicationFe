import axios from "axios";
export const API_URL = "https://minglechat-production.up.railway.app/";

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;
