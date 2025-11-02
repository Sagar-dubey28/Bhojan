import axios from "axios";
import Cookies from "js-cookie";

// Prefer Vite env variable, fallback to the current render URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const api = axios.create(
  { baseURL: `${BACKEND_URL}`, withCredentials: true },
  {
    headers: {
      Authorization: `Bearer ${Cookies.get("BhojanLoginKey") || ""}`,
    },
  }
);

export default api;
