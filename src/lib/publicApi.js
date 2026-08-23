import { apiClient, isApiConfigured, unwrapApiData } from "./apiClient";
import {
  fallbackAbout,
  fallbackHero,
  fallbackPortfolio,
  fallbackResume,
  fallbackServices,
  fallbackSettings,
} from "./publicContent";
import { fetchExperiences, fetchMainProfile, fetchSkills, fetchWorks } from "./portfolioApi";
import {
  mapAboutContent,
  mapHeroContent,
  mapPortfolioContent,
  mapResumeContent,
  mapServicesContent,
} from "./contentAdapters";

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
  return fetchMainProfile().then((profile) => mapHeroContent(profile || fallbackHero));
}

export async function fetchPortfolioContent() {
  const works = await fetchWorks();
  return mapPortfolioContent(works || fallbackPortfolio.projects);
}

export async function fetchResumeContent() {
  const [profile, experiences] = await Promise.all([
    fetchMainProfile(),
    fetchExperiences(),
  ]);

  return mapResumeContent(experiences, profile) || fallbackResume;
}

export async function fetchServicesContent() {
  const [profile, works, skills] = await Promise.all([
    fetchMainProfile(),
    fetchWorks(),
    fetchSkills(),
  ]);

  return mapServicesContent(profile, works, skills) || fallbackServices;
}

export async function fetchAboutContent() {
  const [profile, experiences, skills] = await Promise.all([
    fetchMainProfile(),
    fetchExperiences(),
    fetchSkills(),
  ]);

  return mapAboutContent(profile, experiences, skills) || fallbackAbout;
}

export function fetchSiteSettings() {
  return Promise.resolve(fallbackSettings);
}
