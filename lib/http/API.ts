import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API = axios.create({
  baseURL: `${BASE_URL}/washtra/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;