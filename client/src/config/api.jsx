import axios from "axios";

// Prefer Vite env variable, fallback to the current render URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://bhojan-r8pl.onrender.com";

const api = axios.create({ baseURL: `${BACKEND_URL}`, withCredentials: true });

// Helper to read a cookie by name in the browser
const getCookie = (name) => {
	if (typeof document === "undefined") return null;
	const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
	return match ? decodeURIComponent(match[2]) : null;
};

// Attach Authorization header with Bearer token from cookie `BhojanLoginKey` if present
api.interceptors.request.use(
	(config) => {
		try {
			const token = getCookie("BhojanLoginKey");
			if (token) {
				config.headers = config.headers || {};
				// If the token already contains "Bearer ", avoid doubling
				config.headers.Authorization = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
			}
		} catch (e) {
			// ignore cookie read errors
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default api;
