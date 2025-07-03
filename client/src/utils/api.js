import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE;

export const api = axios.create({
  baseURL: BASE,
});