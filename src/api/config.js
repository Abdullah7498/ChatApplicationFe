import axios from "axios";
export const API_URL = "https://minglechat-production.up.railway.app/";

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default axiosApi;
