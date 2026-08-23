import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function unwrapApiData(payload) {
  if (!payload) return payload;
  if (payload.data != null) return payload.data;
  if (payload.result != null) return payload.result;
  return payload;
}