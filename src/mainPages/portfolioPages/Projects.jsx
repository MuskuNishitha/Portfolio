"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiStar,
  FiGlobe,
  FiGithub,
  FiSmartphone,
  FiExternalLink,
  FiArrowUpRight,
} from "react-icons/fi";
import { useTheme } from "@/components/ThemeProvider";
import { fallbackPortfolio } from "@/lib/publicContent";

export default function Projects() {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState("all");

  const { categories, projects } = fallbackPortfolio;

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section
      className={`relative min-h-screen overflow-hidden py-20 sm:py-24 px-4 transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* BACKGROUND DECORATION */}
      <div
        className="pointer-events-none absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background: "var(--primary)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          {/* SMALL LABEL */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="h-px w-8"
              style={{
                background: "var(--primary)",
              }}
            />

            <span
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]"
              style={{
                color: "var(--primary)",
              }}
            >
              My Work
            </span>

            <span
              className="h-px w-8"
              style={{
                background: "var(--primary)",
              }}
            />
          </div>

          {/* TITLE */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            My{" "}
            <span
              style={{
                color: "var(--primary)",
              }}
            >
              Projects
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A selection of real-world web, mobile, e-commerce and dashboard
            applications built with modern technologies.
          </p>
        </div>

        {/* ================= FILTER ================= */}
        <div className="flex justify-center flex-wrap gap-2.5 sm:gap-3 mb-12">
          {categories.map((category) => {
            const isActive = filter === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-lg scale-[1.03]"
                    : isDarkMode
                      ? "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
                style={
                  isActive
                    ? {
                        background: "var(--primary)",
                      }
                    : undefined
                }
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* ================= PROJECT GRID ================= */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => {
              const hasLiveLink =
                typeof project.liveLink === "string" &&
                project.liveLink.trim().length > 0;

              const hasGithubLink =
                typeof project.githubLink === "string" &&
                project.githubLink.trim().length > 0;

              const playstoreLinks = Array.isArray(project.playstoreLinks)
                ? project.playstoreLinks.filter(
                    (app) =>
                      app &&
                      typeof app.url === "string" &&
                      app.url.trim().length > 0,
                  )
                : [];

              const hasPlayStoreLinks = playstoreLinks.length > 0;

              return (
                <motion.article
                  key={project.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                  style={{
                    boxShadow: isDarkMode
                      ? "0 20px 50px rgba(0,0,0,0.25)"
                      : "0 20px 50px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* ================= IMAGE ================= */}
                  <div className="relative h-56 sm:h-60 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* IMAGE OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* PROJECT NUMBER */}
                    <div className="absolute top-4 right-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* FEATURED */}
                    {project.id === 1 && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 text-black px-3 py-1.5 text-xs font-semibold shadow-lg">
                          <FiStar size={12} />
                          Featured
                        </span>
                      </div>
                    )}

                    {/* CATEGORY ON IMAGE */}
                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 text-xs">
                        {project.subcategory}
                      </span>
                    </div>
                  </div>

                  {/* ================= CONTENT ================= */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    {/* TITLE */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                          {project.title}
                        </h3>

                        <span
                          className="text-xs whitespace-nowrap opacity-60"
                          title={project.period}
                        >
                          {project.period}
                        </span>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <p
                      className={`text-sm leading-relaxed mb-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* ================= FEATURES ================= */}
                    {project.features?.length > 0 && (
                      <div className="mb-5">
                        <div className="space-y-2">
                          {project.features
                            .slice(0, 3)
                            .map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-start gap-2"
                              >
                                <span
                                  className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                                  style={{
                                    background: "var(--primary)",
                                  }}
                                />

                                <p
                                  className={`text-xs sm:text-sm leading-relaxed ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {feature}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* ================= TECH ================= */}
                    {project.tech?.length > 0 && (
                      <div className="mb-2">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((technology) => (
                            <span
                              key={technology}
                              className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-md border ${
                                isDarkMode ? "bg-white/[0.03]" : "bg-gray-50"
                              }`}
                              style={{
                                borderColor:
                                  "color-mix(in srgb, var(--primary) 35%, transparent)",
                                color: "var(--primary)",
                              }}
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ================= LINKS ================= */}
                    {(hasLiveLink || hasGithubLink || hasPlayStoreLinks) && (
                      <div className="mt-auto pt-5 border-t border-black/10 dark:border-white/10">
                        {/* WEBSITE + GITHUB */}
                        {(hasLiveLink || hasGithubLink) && (
                          <div
                            className={`grid gap-2.5 ${
                              hasLiveLink && hasGithubLink
                                ? "grid-cols-1 sm:grid-cols-2"
                                : "grid-cols-1"
                            }`}
                          >
                            {/* WEBSITE */}
                            {hasLiveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
                                style={{
                                  background: "var(--primary)",
                                }}
                              >
                                <FiGlobe size={16} />

                                <span>Website</span>

                                <FiArrowUpRight
                                  size={14}
                                  className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                />
                              </a>
                            )}

                            {/* GITHUB */}
                            {hasGithubLink && (
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group/link w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold border transition-all duration-300 ${
                                  isDarkMode
                                    ? "border-white/15 bg-white/[0.02] hover:bg-white/10"
                                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                }`}
                              >
                                <FiGithub size={16} />

                                <span>GitHub</span>

                                <FiArrowUpRight
                                  size={14}
                                  className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                />
                              </a>
                            )}
                          </div>
                        )}

                        {/* PLAY STORE LINKS */}
                        {hasPlayStoreLinks && (
                          <div
                            className={`mt-2.5 grid gap-2.5 ${
                              playstoreLinks.length > 1
                                ? "grid-cols-1 sm:grid-cols-2"
                                : "grid-cols-1"
                            }`}
                          >
                            {playstoreLinks.map((app, appIndex) => (
                              <a
                                key={`${app.url}-${appIndex}`}
                                href={app.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group/app w-full min-w-0 flex items-center justify-between gap-3 py-2.5 px-3.5 rounded-lg border transition-all duration-300 ${
                                  isDarkMode
                                    ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.08]"
                                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                }`}
                              >
                                {/* LEFT */}
                                <span className="flex items-center gap-2.5 min-w-0">
                                  {/* ICON */}
                                  <span
                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                      background:
                                        "color-mix(in srgb, var(--primary) 12%, transparent)",
                                      color: "var(--primary)",
                                    }}
                                  >
                                    <FiSmartphone size={15} />
                                  </span>

                                  {/* APP NAME */}
                                  <span className="min-w-0 text-sm font-medium truncate">
                                    {app.name || `App ${appIndex + 1}`}
                                  </span>
                                </span>

                                {/* EXTERNAL ICON */}
                                <FiExternalLink
                                  size={15}
                                  className="flex-shrink-0 opacity-50 transition-all duration-200 group-hover/app:opacity-100 group-hover/app:translate-x-0.5"
                                />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="py-20 text-center">
            <div
              className={`inline-flex flex-col items-center justify-center rounded-2xl px-8 py-10 border ${
                isDarkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <p className="text-lg font-semibold mb-2">No projects found</p>

              <p className="text-sm opacity-60">
                f Try selecting another category.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
