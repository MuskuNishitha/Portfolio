import { apiClient, isApiConfigured, unwrapApiData } from "./apiClient";

async function request(path) {
  if (!isApiConfigured()) return null;

  try {
    const response = await apiClient.get(path);
    return unwrapApiData(response?.data);
  } catch {
    return null;
  }
}

export function fetchMainProfile() {
  return request("/api/v1/profiles/main");
}

export async function fetchWorks() {
  const data = await request("/api/v1/works?limit=50");
  return Array.isArray(data) ? data : [];
}

export async function fetchExperiences() {
  const data = await request("/api/v1/experiences");
  return Array.isArray(data) ? data : [];
}

export async function fetchSkills() {
  const data = await request("/api/v1/skills");
  return Array.isArray(data) ? data : [];
}
