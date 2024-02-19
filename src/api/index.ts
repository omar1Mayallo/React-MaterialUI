import axios from "axios";
import i18next from "i18next";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    config.headers["Accept-Language"] = i18next.language;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized or forbidden responses
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      Cookies.remove("token");
      enqueueSnackbar("Access Denied", { variant: "error" });
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
