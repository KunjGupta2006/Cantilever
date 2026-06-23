import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  withCredentials: true,          // send cookie on every request
  headers: {
    post: {},
    put: {},
  },
});

export default api;