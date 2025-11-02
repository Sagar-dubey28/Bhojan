import axios from "axios";

// Prefer Vite env variable, fallback to the current render URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://bhojan-r8pl.onrender.com";

const api = axios.create({ baseURL: BACKEND_URL, withCredentials: true });

export default api;
