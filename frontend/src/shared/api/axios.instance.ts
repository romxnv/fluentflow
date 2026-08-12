import axios from "axios";

const commonConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosInstance = axios.create(commonConfig);
