import axios from "axios";
import { useAuth } from "../AuthContext";

const api = axios.create({
  baseURL: "http://127.0.0.1/api",
});

const useApi = () => {
  const { accessToken } = useAuth();

  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return api;
};

export default useApi;
