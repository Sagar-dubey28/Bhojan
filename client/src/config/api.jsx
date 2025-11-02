import axios from "axios";

const BACKEND_URL = "https://bhojan-r8pl.onrender.com";

const api = axios.create({ baseURL: `${BACKEND_URL}`, withCredentials: true });

export default api;
