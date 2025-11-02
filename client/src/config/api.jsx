import axios from "axios";
import Cookies from "js-cookie";

// Prefer Vite env variable, fallback to the current render URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
console.log("Using Backend URL:", BACKEND_URL);
console.log("Using Cookies:", Cookies.get("BhojanLoginKey"));


const api = axios.create(
  { baseURL: `${BACKEND_URL}`, withCredentials: true },
  {
    headers: {
      Authorization: `Bearer ${Cookies.get("BhojanLoginKey") || ""}`,
    },
  }
);

export default api;
