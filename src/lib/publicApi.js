import { apiClient, isApiConfigured, unwrapApiData } from "./apiClient";
import {
  fallbackHero,
  fallbackPortfolio,
  fallbackResume,
  fallbackSettings,
} from "./publicContent";

async function safeGet(path, fallbackValue) {
  if (!isApiConfigured()) return fallbackValue;
  try {
    const response = await apiClient.get(path);
    const payload = unwrapApiData(response?.data);
    return payload ?? fallbackValue;
  } catch {
    return fallbackValue;
  }
}

export function fetchHeroContent() {
  return safeGet("/api/v1/public/hero", fallbackHero);
}

export function fetchPortfolioContent() {
  return safeGet("/api/v1/public/portfolio", fallbackPortfolio);
}

export function fetchResumeContent() {
  return safeGet("/api/v1/public/resume", fallbackResume);
}

export function fetchSiteSettings() {
  return safeGet("/api/v1/public/settings", fallbackSettings);
}
