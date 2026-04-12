import axios from "axios";

export const API_BASE_URL = "";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function isApiConfigured() {
  return true;
}

export function unwrapApiData(payload) {
  if (!payload) return payload;
  // Common patterns: { data: ... } or { result: ... }
  if (typeof payload === "object" && payload.data != null) return payload.data;
  if (typeof payload === "object" && payload.result != null) return payload.result;
  return payload;
}
