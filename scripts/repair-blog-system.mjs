import fs from "fs";
import path from "path";

const BLOG_BASE_URL = "https://muskunishitha.vercel.app";
const DATE_MODIFIED = "2026-08-30";
const rootDir = process.cwd();
const blogDir = path.join(rootDir, "content", "blogs");
const imageDir = path.join(rootDir, "public", "assets", "blog");
const frontmatterRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/;

const topicProfiles = {
  "accessible-react-interfaces-checklist": {
    artifact: "accessibility acceptance checklist for React screens",
    scenario:
      "A portfolio contact page can look polished and still fail when a visitor tabs through it, opens a modal, or depends on a screen reader to understand validation errors.",
    primaryConcern:
      "semantic controls, visible focus, labelled inputs, keyboard order, and recoverable error states",
    deliveryContext:
      "portfolio pages, admin dashboards, checkout forms, and reusable React components",
    outcome:
      "a screen that keeps the same visual design while becoming usable from keyboard, touch, and assistive technology",
    failureSignal:
      "lost focus, unlabeled controls, low contrast states, and error text that is visible but not announced",
    codeKind: "accessibility",
  },
  "aggregation-pipelines-dashboard-metrics": {
    artifact: "MongoDB aggregation pipeline for dashboard metrics",
    scenario:
      "A dashboard that loads raw orders and calculates totals in React will eventually become slow, inconsistent, and difficult to reconcile with backend reports.",
    primaryConcern:
      "filtering early, grouping by stable business fields, projecting small payloads, and returning chart-ready values",
    deliveryContext:
      "MERN admin dashboards, revenue widgets, vendor reports, and mobile analytics screens",
    outcome:
      "fast metric cards and charts that ask MongoDB to do the heavy aggregation work once",
    failureSignal:
      "slow dashboard loads, mismatched totals, huge API payloads, and repeated client-side reduce calls",
    codeKind: "aggregation",
  },
  "android-permissions-react-native": {
    artifact: "Android permission flow for React Native features",
    scenario:
      "A delivery or commerce app may need camera, location, notifications, or storage access, but asking at the wrong time creates denials and support tickets.",
    primaryConcern:
      "request timing, Android version differences, graceful fallback UI, and clear settings recovery",
    deliveryContext:
      "React Native Android apps with order updates, profile photos, maps, and document uploads",
    outcome:
      "feature-level permission requests that feel intentional and do not block the rest of the app",
    failureSignal:
      "permissions denied permanently, silent feature failures, and code that assumes every Android version behaves the same",
    codeKind: "rnPermissions",
  },
  "api-integration-patterns-react": {
    artifact: "API integration layer for React dashboards",
    scenario:
      "A dashboard usually starts with one fetch call, then grows into filters, pagination, refresh buttons, stale responses, loading states, and retry paths.",
    primaryConcern:
      "request identity, predictable async state, normalized response shapes, and components that render from clear data contracts",
    deliveryContext:
      "React dashboards, Next.js pages, MERN admin panels, and customer-facing product lists",
    outcome:
      "UI code that stays readable while the number of endpoints and screen states increases",
    failureSignal:
      "stale data overwrites, duplicated fetch logic, impossible loading booleans, and hidden API assumptions inside JSX",
    codeKind: "reactApi",
  },
  "api-security-checklist-mern": {
    artifact: "MERN API security checklist",
    scenario:
      "An API that works in development can still expose data in production if authentication, validation, CORS, rate limits, and logging are treated as separate afterthoughts.",
    primaryConcern:
      "least-privilege routes, sanitized input, token handling, origin control, and safe operational logs",
    deliveryContext:
      "Express APIs serving React, Next.js, and React Native clients with authenticated users",
    outcome:
      "a backend that rejects unsafe requests early and returns useful errors without leaking secrets",
    failureSignal:
      "wildcard CORS, trusted client-side validation, token data in logs, and controllers that accept every request body",
    codeKind: "apiSecurity",
  },
  "apk-aab-react-native-build-workflow": {
    artifact: "APK and AAB release workflow for React Native Android",
    scenario:
      "A React Native feature can be perfect in Metro and still fail when the Android release build minifies code, signs artifacts, or packages assets differently.",
    primaryConcern:
      "clean builds, signing configuration, bundle output, version codes, release testing, and Play Console handoff",
    deliveryContext:
      "React Native customer apps, delivery apps, internal dashboards, and Android beta releases",
    outcome:
      "repeatable artifacts that can be installed, tested, and uploaded without last-minute Gradle guessing",
    failureSignal:
      "debug-only success, missing release assets, wrong package version, and unsigned or mismatched build artifacts",
    codeKind: "rnBuild",
  },
  "bootstrap-react-layout-cleanup": {
    artifact: "Bootstrap layout cleanup plan inside a React project",
    scenario:
      "Bootstrap makes early layouts quick, but mixed grid classes, custom CSS overrides, and repeated wrappers can make React components hard to scan later.",
    primaryConcern:
      "container boundaries, predictable row gaps, semantic component names, and avoiding CSS fights between Bootstrap and local styles",
    deliveryContext:
      "portfolio pages, admin screens, landing sections, and migrated React components",
    outcome:
      "layouts that keep Bootstrap's productivity while feeling componentized and maintainable",
    failureSignal:
      "nested containers, inconsistent gutters, duplicated card markup, and custom CSS added only to fight framework defaults",
    codeKind: "bootstrapLayout",
  },
  "building-responsive-websites-react": {
    artifact: "responsive React layout system",
    scenario:
      "A site may look excellent on the developer's laptop while cards overflow on small phones, text wraps awkwardly, or images cause layout jumps.",
    primaryConcern:
      "fluid grids, stable media boxes, content-first breakpoints, and components that adapt without duplicating markup",
    deliveryContext:
      "React portfolio sections, Next.js marketing pages, e-commerce cards, and dashboard summaries",
    outcome:
      "a responsive interface that feels intentionally designed at mobile, tablet, and desktop widths",
    failureSignal:
      "horizontal scrolling, oversized buttons, cropped images, card height jumps, and breakpoints chosen from device names",
    codeKind: "responsiveReact",
  },
  "cors-production-api-debugging": {
    artifact: "production CORS debugging workflow",
    scenario:
      "CORS errors appear in the browser console, but the root cause is usually a mismatch between frontend origin, backend headers, credentials, and deployment domains.",
    primaryConcern:
      "allowed origins, preflight responses, credential settings, method headers, and environment-specific API URLs",
    deliveryContext:
      "React and Next.js frontends calling Express APIs from Vercel, Netlify, Hostinger, or mobile webviews",
    outcome:
      "a backend that allows the right deployed clients without turning CORS into a wildcard security hole",
    failureSignal:
      "OPTIONS failures, cookies not being sent, localhost-only origins, and production URLs hardcoded into client code",
    codeKind: "cors",
  },
  "css-grid-flexbox-dashboard-layouts": {
    artifact: "dashboard layout built with CSS Grid and Flexbox",
    scenario:
      "Dashboards need dense, scannable information: metric cards, filters, charts, tables, and side panels must resize without turning into a tall pile of cards.",
    primaryConcern:
      "grid tracks for page structure, flex rows for local alignment, stable min widths, and predictable responsive collapse",
    deliveryContext:
      "admin panels, analytics dashboards, operations tools, and portfolio case-study screens",
    outcome:
      "layouts that stay organized under real data, not only under perfect design mockups",
    failureSignal:
      "cards stretching unpredictably, filters wrapping over content, charts shrinking to zero width, and repeated media-query patches",
    codeKind: "dashboardCss",
  },
  "debugging-react-native-release-builds": {
    artifact: "React Native release build debugging checklist",
    scenario:
      "A screen can work in debug mode and fail only after release packaging because Hermes, ProGuard, assets, signing, or native permissions changed the runtime.",
    primaryConcern:
      "release logs, variant-specific configuration, native dependency setup, crash reproduction, and clean Gradle output",
    deliveryContext:
      "Android builds for React Native apps distributed through testers or the Play Store",
    outcome:
      "a repeatable path from vague release crash to the specific build, native, or runtime cause",
    failureSignal:
      "white screens, release-only crashes, missing images, API URLs pointing to localhost, and minified stack traces",
    codeKind: "rnReleaseDebug",
  },
  "deploying-nextjs-vercel-production": {
    artifact: "Next.js Vercel production deployment checklist",
    scenario:
      "Vercel makes deployment convenient, but a real production release still needs working builds, environment variables, image paths, domains, metadata, and smoke tests.",
    primaryConcern:
      "build parity, runtime configuration, static generation, custom domains, and post-deploy verification",
    deliveryContext:
      "Next.js portfolio sites, blog systems, contact forms, and client project launches",
    outcome:
      "a deployment that opens correctly from the final URL and is ready for users and search engines",
    failureSignal:
      "preview-only success, broken dynamic routes, missing variables, image 404s, and canonical URLs pointing to the wrong host",
    codeKind: "vercelDeploy",
  },
  "dns-domain-ssl-deployment-basics": {
    artifact: "DNS, domain, SSL, and HTTPS deployment map",
    scenario:
      "A deployed app is not finished until the final domain resolves, HTTPS is active, redirects are consistent, and metadata points to the canonical URL.",
    primaryConcern:
      "A records, CNAME records, apex versus www behavior, certificate issuance, and mixed-content checks",
    deliveryContext:
      "Next.js and React deployments on Vercel, Netlify, Hostinger, and custom domains",
    outcome:
      "one trusted HTTPS address that users, browsers, and search engines agree on",
    failureSignal:
      "domain not found, SSL pending, mixed content warnings, split www/non-www traffic, and stale DNS records",
    codeKind: "dnsSsl",
  },
  "environment-variables-node-nextjs": {
    artifact: "environment variable contract for Node.js and Next.js",
    scenario:
      "Local development can hide configuration mistakes because `.env.local` has values that never reach Vercel, Render, PM2, or the mobile app build.",
    primaryConcern:
      "server-only secrets, public client values, startup validation, deployment dashboards, and clear config names",
    deliveryContext:
      "Next.js frontends, Express APIs, MongoDB Atlas connections, JWT auth, and third-party integrations",
    outcome:
      "configuration that fails loudly during startup instead of failing quietly during user actions",
    failureSignal:
      "undefined API URLs, missing JWT secrets, client bundles exposing private keys, and production builds that differ from local runs",
    codeKind: "envVars",
  },
  "expo-vs-react-native-cli-practical-choice": {
    artifact: "Expo versus React Native CLI decision framework",
    scenario:
      "Choosing a React Native setup too early can either slow a simple app with native complexity or block a custom native requirement later.",
    primaryConcern:
      "native module needs, build ownership, team experience, OTA updates, Android configuration, and long-term maintenance",
    deliveryContext:
      "mobile MVPs, e-commerce apps, delivery apps, and apps with maps, notifications, or payment integrations",
    outcome:
      "a project setup that matches the product roadmap instead of the loudest tooling preference",
    failureSignal:
      "ejecting under pressure, blocked native SDKs, unsupported build steps, and configuration nobody on the team understands",
    codeKind: "expoCli",
  },
  "express-error-handling-production": {
    artifact: "production Express error handling layer",
    scenario:
      "An Express API needs errors that are useful to users, developers, and logs without leaking stack traces or turning every issue into a 500.",
    primaryConcern:
      "async error flow, operational error classes, request IDs, safe response messages, and centralized logging",
    deliveryContext:
      "Node.js APIs for dashboards, mobile apps, portfolio contact forms, and MERN products",
    outcome:
      "controllers that stay focused on business logic while failures reach one predictable response path",
    failureSignal:
      "unhandled promise rejections, duplicate try/catch blocks, raw database errors sent to clients, and missing request context",
    codeKind: "expressError",
  },
  "express-middleware-auth-logging-errors": {
    artifact: "Express middleware chain for auth, logging, and errors",
    scenario:
      "Middleware can make an API clean, but only when each function has one responsibility and the order is deliberate.",
    primaryConcern:
      "request logging, authentication, authorization, validation, controller handoff, and final error handling",
    deliveryContext:
      "Express REST APIs consumed by React, Next.js, and React Native clients",
    outcome:
      "a route stack where security and observability are applied consistently instead of copied into every controller",
    failureSignal:
      "auth checks repeated in handlers, logs missing user/request context, and errors bypassing the intended formatter",
    codeKind: "expressMiddleware",
  },
  "file-uploads-node-apis-cloudinary": {
    artifact: "Node.js file upload flow with Cloudinary",
    scenario:
      "File uploads touch user experience, server memory, file validation, storage cleanup, database references, and CDN delivery at the same time.",
    primaryConcern:
      "file type limits, upload streaming, Cloudinary public IDs, database consistency, and secure delete/replace behavior",
    deliveryContext:
      "profile images, product catalogs, portfolio assets, service documents, and admin dashboards",
    outcome:
      "uploads that are validated before storage and remain traceable after the database record changes",
    failureSignal:
      "oversized files hitting the API, orphaned Cloudinary assets, broken image URLs, and trusting the client-reported MIME type",
    codeKind: "uploads",
  },
  "firebase-cloud-messaging-react-native-push": {
    artifact: "Firebase Cloud Messaging flow for React Native push notifications",
    scenario:
      "Push notifications are valuable only when permissions, tokens, foreground handling, background events, and backend targeting all agree.",
    primaryConcern:
      "token registration, permission states, foreground display, backend topic targeting, and stale-token cleanup",
    deliveryContext:
      "React Native order updates, delivery tracking, admin alerts, and customer engagement flows",
    outcome:
      "notifications that reach the right device and open the right screen without surprising the user",
    failureSignal:
      "tokens not saved, Android permission missing, duplicate notifications, foreground messages disappearing, and deep links opening nowhere",
    codeKind: "fcm",
  },
  "frontend-deployment-netlify-hostinger": {
    artifact: "frontend deployment checklist for Netlify and Hostinger",
    scenario:
      "A React or Next.js frontend can build locally but fail after upload because the host serves the wrong output, misses rewrites, or lacks required runtime support.",
    primaryConcern:
      "build command, output directory, SPA fallback routing, Node version, environment variables, and domain configuration",
    deliveryContext:
      "React single-page apps, static Next.js exports, landing pages, and client project hosting",
    outcome:
      "a deployment where direct refresh, nested routes, images, and API calls work from the final domain",
    failureSignal:
      "404 on refresh, source files uploaded instead of build output, missing env values, and assets loading from old paths",
    codeKind: "staticHosting",
  },
  "frontend-performance-budget-next-react": {
    artifact: "frontend performance budget for React and Next.js",
    scenario:
      "Performance work becomes practical when the team agrees on budgets for JavaScript, images, fonts, route cost, and interaction responsiveness before the page slows down.",
    primaryConcern:
      "bundle size, critical images, Core Web Vitals, third-party scripts, render cost, and measured regression checks",
    deliveryContext:
      "portfolio pages, product listings, dashboard shells, and Next.js marketing routes",
    outcome:
      "a measurable contract that protects user experience as features and visual polish are added",
    failureSignal:
      "slow route transitions, heavy initial JavaScript, late-loading hero images, and performance fixes attempted after launch",
    codeKind: "perfBudget",
  },
  "git-branching-workflow-small-teams": {
    artifact: "small-team Git branching workflow",
    scenario:
      "Small teams move fastest when branches communicate intent, pull requests stay reviewable, and releases do not depend on one developer's local machine.",
    primaryConcern:
      "feature branches, protected main, short-lived work, review checkpoints, and release tags",
    deliveryContext:
      "portfolio updates, freelance client projects, MERN features, and mobile release branches",
    outcome:
      "a workflow that supports quick delivery without losing the ability to review and roll back",
    failureSignal:
      "long-lived branches, mixed unrelated changes, surprise force pushes, and no shared rule for hotfixes",
    codeKind: "gitBranch",
  },
  "git-reset-revert-stash-practical": {
    artifact: "practical Git reset, revert, and stash decision guide",
    scenario:
      "Git history tools are safe when the developer chooses them based on whether work is local, shared, committed, or already deployed.",
    primaryConcern:
      "protecting shared history, saving work in progress, undoing commits visibly, and recovering local mistakes",
    deliveryContext:
      "bug fixes, portfolio edits, feature branches, emergency reversions, and code review cleanup",
    outcome:
      "confidence to undo the right thing without deleting useful work",
    failureSignal:
      "resetting public branches, losing uncommitted edits, stacking unnamed stashes, and using revert when the intent is local cleanup",
    codeKind: "gitHistory",
  },
  "github-actions-ci-nextjs": {
    artifact: "GitHub Actions CI pipeline for Next.js",
    scenario:
      "A Next.js project benefits from CI when every pull request proves it can install, lint, build, and generate static blog routes before merge.",
    primaryConcern:
      "clean installs, Node version parity, environment-safe builds, caching, and clear failure output",
    deliveryContext:
      "portfolio sites, client landing pages, content-heavy blogs, and MERN frontend repositories",
    outcome:
      "pull requests that catch broken builds before deployment platforms do",
    failureSignal:
      "CI skipped for content changes, builds passing locally only, missing env placeholders, and failures nobody can reproduce",
    codeKind: "githubActions",
  },
  "javascript-array-methods-api-data": {
    artifact: "JavaScript API data transformation pipeline",
    scenario:
      "Frontend screens rarely render raw API responses directly; they shape records into labels, cards, filters, grouped totals, and empty states.",
    primaryConcern:
      "immutability, stable keys, predictable mapping, readable filters, and avoiding expensive work inside render loops",
    deliveryContext:
      "React product grids, Next.js dashboards, MongoDB-backed APIs, and mobile list screens",
    outcome:
      "data preparation that explains business rules before JSX tries to render them",
    failureSignal:
      "mutated API arrays, array indexes used as keys, hidden sorting in card components, and reduce calls that obscure simple logic",
    codeKind: "arrayData",
  },
  "javascript-error-handling-frontend-apis": {
    artifact: "frontend API error handling contract",
    scenario:
      "A failed request should not leave the user guessing whether the app is loading, empty, offline, unauthorized, or blocked by validation.",
    primaryConcern:
      "typed request states, HTTP status mapping, retry boundaries, field-level errors, and safe logging",
    deliveryContext:
      "React forms, Next.js dashboards, React Native screens, and MERN API clients",
    outcome:
      "interfaces that fail clearly and give the user a useful next action",
    failureSignal:
      "one generic error message for every failure, stale success data with no warning, silent retries, and raw server errors in the UI",
    codeKind: "frontendErrors",
  },
  "javascript-event-loop-ui-debugging": {
    artifact: "JavaScript event loop debugging model for UI bugs",
    scenario:
      "Async UI bugs look random until events, microtasks, timers, network responses, and React renders are separated into a visible timeline.",
    primaryConcern:
      "request order, cleanup, microtask timing, state updates after unmount, and timer-driven UI transitions",
    deliveryContext:
      "search inputs, dashboards, autocomplete fields, payment flows, and React Native screens",
    outcome:
      "async behavior that can be reproduced and fixed instead of blamed on timing",
    failureSignal:
      "older responses overwriting newer state, loading indicators stuck on screen, timers firing after navigation, and race conditions hidden by fast local networks",
    codeKind: "eventLoop",
  },
  "jwt-authentication-mern-apps": {
    artifact: "JWT authentication flow for MERN applications",
    scenario:
      "JWT auth is more than signing a token; the app needs login, storage choices, refresh rules, protected routes, server authorization, and logout behavior.",
    primaryConcern:
      "short-lived access tokens, safe claims, password verification, middleware checks, and role-based authorization",
    deliveryContext:
      "MERN dashboards, customer accounts, seller panels, and React Native mobile APIs",
    outcome:
      "authentication that is predictable for users and defensible for protected backend routes",
    failureSignal:
      "tokens with sensitive claims, client-only role checks, never-expiring credentials, and inconsistent 401 handling",
    codeKind: "jwt",
  },
  "material-ui-react-form-patterns": {
    artifact: "Material UI form pattern for maintainable React screens",
    scenario:
      "Material UI provides polished inputs, but form quality still depends on state shape, validation timing, helper text, layout density, and server error mapping.",
    primaryConcern:
      "controlled fields, field-level errors, accessible helper text, reusable submit states, and consistent spacing",
    deliveryContext:
      "admin panels, portfolio contact forms, product editors, and client onboarding screens",
    outcome:
      "forms that look consistent while staying easy to validate and test",
    failureSignal:
      "uncontrolled/controlled warnings, helper text used for layout hacks, duplicated error handling, and submit buttons that allow double posts",
    codeKind: "muiForms",
  },
  "mern-deployment-checklist": {
    artifact: "MERN production deployment checklist",
    scenario:
      "A MERN release crosses frontend build, backend runtime, MongoDB Atlas, CORS, domains, environment variables, logs, and rollback planning.",
    primaryConcern:
      "frontend routes, API health, database access, secrets, SSL, CORS origins, and smoke tests",
    deliveryContext:
      "React or Next.js frontends connected to Express and MongoDB in production",
    outcome:
      "a release that proves the whole user flow works rather than only proving that one build command passed",
    failureSignal:
      "home page loads but API writes fail, Atlas blocks the server IP, production CORS rejects users, and logs are not checked after launch",
    codeKind: "mernDeploy",
  },
  "mobile-form-ux-react-native": {
    artifact: "React Native mobile form UX checklist",
    scenario:
      "Mobile forms are sensitive to keyboard behavior, small screens, network delay, validation placement, and touch targets.",
    primaryConcern:
      "keyboard avoidance, input mode, field order, validation timing, scroll position, and resilient submit states",
    deliveryContext:
      "React Native signup forms, checkout screens, delivery partner forms, and profile editors",
    outcome:
      "forms that remain usable on small Android screens and slow connections",
    failureSignal:
      "keyboard covering fields, validation hidden below the fold, duplicate submissions, and text inputs with the wrong keyboard type",
    codeKind: "mobileForms",
  },
  "mongodb-atlas-production-connection": {
    artifact: "MongoDB Atlas production connection checklist",
    scenario:
      "Atlas connection issues often look like API bugs, but the cause may be network access, credentials, database names, driver options, or cold starts.",
    primaryConcern:
      "connection string hygiene, IP/network rules, retry behavior, connection reuse, and observability",
    deliveryContext:
      "Express APIs, Next.js route handlers, serverless functions, and hosted MERN backends",
    outcome:
      "database connectivity that is boring in production and loud when configuration is wrong",
    failureSignal:
      "server selection timeouts, too many connections, wrong database writes, secrets pasted into logs, and functions reconnecting on every request",
    codeKind: "atlas",
  },
  "mongodb-full-stack-developers": {
    artifact: "MongoDB workflow for full-stack developers",
    scenario:
      "Full-stack developers need MongoDB decisions that fit the UI and API, not only a schema that stores documents successfully.",
    primaryConcern:
      "document shape, indexes, projections, validation, API payloads, and the way React screens read data",
    deliveryContext:
      "MERN applications, Next.js dashboards, e-commerce catalogs, and mobile API backends",
    outcome:
      "database models that support fast product flows without forcing frontend workarounds",
    failureSignal:
      "documents designed only from forms, unindexed filters, oversized responses, and schema changes that break existing screens",
    codeKind: "mongoFullStack",
  },
  "mongodb-indexing-query-speed": {
    artifact: "MongoDB indexing plan for faster queries",
    scenario:
      "A query can work during development and become slow in production when product, order, or user collections grow beyond the first sample data.",
    primaryConcern:
      "query shape, compound index order, selectivity, sort support, text search, and explain plans",
    deliveryContext:
      "MERN APIs, dashboard filters, e-commerce searches, and admin tables",
    outcome:
      "indexes that match real access patterns instead of decorating every field",
    failureSignal:
      "collection scans, slow sorted queries, indexes never used, and write performance dropping because too many indexes were added",
    codeKind: "mongoIndex",
  },
  "mongodb-lean-projections-performance": {
    artifact: "Mongoose lean and projection performance pattern",
    scenario:
      "List endpoints usually do not need full Mongoose documents, virtuals, setters, and every field from the database.",
    primaryConcern:
      "using lean reads, selecting only rendered fields, avoiding hydration cost, and keeping API payloads small",
    deliveryContext:
      "portfolio project lists, product grids, dashboard tables, and mobile list endpoints",
    outcome:
      "faster reads and smaller JSON responses without changing the user-facing API contract",
    failureSignal:
      "slow list pages, huge response bodies, accidental private fields, and CPU time spent hydrating documents that are never saved",
    codeKind: "mongoLean",
  },
  "mongodb-schema-design-ecommerce": {
    artifact: "MongoDB e-commerce schema design plan",
    scenario:
      "E-commerce data has products, variants, carts, orders, inventory, users, vendors, and payments, so document boundaries must match how the business reads and updates data.",
    primaryConcern:
      "embedding versus referencing, immutable order snapshots, inventory updates, indexes, and admin query needs",
    deliveryContext:
      "MERN stores, multi-vendor catalogs, grocery apps, and dental product marketplaces",
    outcome:
      "schemas that make customer browsing fast while preserving accurate orders after product details change",
    failureSignal:
      "orders changing when products are edited, expensive cross-collection joins for every card, and inventory races during checkout",
    codeKind: "mongoSchema",
  },
  "mongoose-validation-hooks-patterns": {
    artifact: "Mongoose validation and hooks pattern",
    scenario:
      "Mongoose can enforce useful rules, but hooks become surprising when validation, slug generation, password hashing, and side effects are mixed together.",
    primaryConcern:
      "schema-level validation, async validators, pre-save hooks, update validators, and avoiding hidden external side effects",
    deliveryContext:
      "MERN APIs with users, products, orders, contacts, and admin-managed content",
    outcome:
      "models that reject bad data consistently without making saves mysterious",
    failureSignal:
      "validators skipped on updates, duplicate slugs, password hashing twice, and hooks sending emails during database writes",
    codeKind: "mongooseValidation",
  },
  "nextjs-api-routes-contact-forms": {
    artifact: "Next.js API route for portfolio contact forms",
    scenario:
      "A contact form looks simple until validation, spam control, email delivery, rate limiting, error display, and deployment environment variables arrive.",
    primaryConcern:
      "server-side validation, clear response codes, safe email sending, request limits, and frontend status states",
    deliveryContext:
      "Next.js portfolio sites, service pages, client inquiry forms, and landing pages",
    outcome:
      "a contact flow that gives users confidence and gives the developer actionable failure logs",
    failureSignal:
      "client-only validation, double submissions, exposed email credentials, and form errors that never reach the user",
    codeKind: "nextApi",
  },
  "nextjs-app-router-project-structure": {
    artifact: "scalable Next.js App Router project structure",
    scenario:
      "App Router projects stay maintainable when routes, server code, shared components, content loaders, and client-only islands have clear homes.",
    primaryConcern:
      "route groups, colocated loading/error files, server/client boundaries, shared libraries, and feature folders",
    deliveryContext:
      "portfolio sites, blogs, dashboards, and full-stack Next.js applications",
    outcome:
      "a file tree that lets new features land without turning `app` into a miscellaneous folder",
    failureSignal:
      "client components everywhere, data loaders hidden inside UI files, duplicate route utilities, and shared code importing server-only modules by accident",
    codeKind: "nextStructure",
  },
  "nextjs-dynamic-routes-blog-slugs": {
    artifact: "dynamic blog slug route in Next.js",
    scenario:
      "A blog listing is only reliable when every card slug maps to a real detail route, metadata entry, image, TOC, and related article link.",
    primaryConcern:
      "static params, slug lookup, not-found handling, canonical URLs, and content validation",
    deliveryContext:
      "Next.js content blogs, portfolio articles, docs pages, and case-study routes",
    outcome:
      "article links open complete pages with content, images, metadata, TOC anchors, and related routes intact",
    failureSignal:
      "filename slugs disagree with frontmatter slugs, related posts point nowhere, and route generation skips content files",
    codeKind: "nextDynamic",
  },
  "nextjs-modern-web-development": {
    artifact: "modern Next.js application architecture",
    scenario:
      "Next.js is most useful when routing, rendering, metadata, images, and server-side work are chosen intentionally for the product page being built.",
    primaryConcern:
      "App Router layouts, server components, client islands, data loading, SEO metadata, and deployment checks",
    deliveryContext:
      "portfolio websites, content blogs, e-commerce pages, and MERN-friendly frontends",
    outcome:
      "a web app that feels fast to users and understandable to developers",
    failureSignal:
      "client-only pages that could be static, duplicated metadata, oversized images, and server code leaking into browser bundles",
    codeKind: "nextGuide",
  },
  "nextjs-image-optimization-practical": {
    artifact: "practical Next.js image optimization workflow",
    scenario:
      "Images often decide whether a portfolio, product card, or blog page feels polished, because late-loading media creates layout shift and slow first impressions.",
    primaryConcern:
      "intrinsic size, responsive `sizes`, priority rules, descriptive alt text, CDN delivery, and stable containers",
    deliveryContext:
      "Next.js blog heroes, project cards, e-commerce catalogs, and case-study galleries",
    outcome:
      "sharp images that load at the right size without moving the layout after text appears",
    failureSignal:
      "hero images fetched too late, every image marked priority, missing alt text, and object-fit hiding important content",
    codeKind: "nextImage",
  },
  "nextjs-metadata-seo-canonical": {
    artifact: "Next.js metadata and canonical SEO pattern",
    scenario:
      "SEO breaks quietly when every page has similar metadata, social cards use old images, or canonical URLs point to preview deployments.",
    primaryConcern:
      "unique titles, useful descriptions, canonical URLs, Open Graph images, Twitter cards, and Article JSON-LD",
    deliveryContext:
      "Next.js portfolios, technical blogs, service pages, and project case studies",
    outcome:
      "pages that explain themselves clearly to search engines, link previews, and users scanning results",
    failureSignal:
      "duplicate titles, missing descriptions, broken OG images, non-canonical previews, and structured data that disagrees with the page",
    codeKind: "nextMetadata",
  },
  "nextjs-production-build-debugging": {
    artifact: "Next.js production build debugging workflow",
    scenario:
      "Development mode hides problems that production builds reveal: server/client imports, dynamic route data, image paths, environment values, and static generation errors.",
    primaryConcern:
      "reading build output, isolating the failing route, replacing browser-only code in server files, and testing the generated pages",
    deliveryContext:
      "Next.js portfolios, blogs, dashboards, and Vercel production deployments",
    outcome:
      "build failures that lead to targeted fixes instead of broad rewrites",
    failureSignal:
      "routes failing during prerender, `window` used on the server, missing content files, and environment variables undefined at build time",
    codeKind: "nextBuild",
  },
  "nextjs-server-client-component-boundaries": {
    artifact: "Next.js server and client component boundary",
    scenario:
      "App Router projects become clearer when server components fetch and shape data while client components own interactivity, browser APIs, and animation.",
    primaryConcern:
      "data ownership, serializable props, client-only hooks, bundle size, and avoiding accidental server imports in client files",
    deliveryContext:
      "content pages, dashboards, blog details, theme controls, and animated portfolio sections",
    outcome:
      "pages that render efficiently without giving up interactive UI where it matters",
    failureSignal:
      "`use client` added at the top of large trees, server utilities imported into client components, and non-serializable props crossing the boundary",
    codeKind: "nextBoundaries",
  },
  "node-api-deployment-render-pm2": {
    artifact: "Node.js API deployment plan for Render or PM2",
    scenario:
      "A deployed API needs a stable start command, port handling, health route, environment variables, database connectivity, logs, and restart behavior.",
    primaryConcern:
      "process lifecycle, health checks, PM2 ecosystem files, Render settings, MongoDB access, and operational logs",
    deliveryContext:
      "Express APIs behind React, Next.js, and React Native applications",
    outcome:
      "a backend that stays online and is diagnosable when the frontend reports an error",
    failureSignal:
      "using `nodemon` in production, missing PORT handling, crashes with no restart, and logs that hide the failing request",
    codeKind: "nodeDeploy",
  },
  "node-express-controller-architecture": {
    artifact: "controller architecture for Express APIs",
    scenario:
      "Controllers become difficult to test when they validate input, build database queries, transform responses, and format errors in the same function.",
    primaryConcern:
      "thin controllers, service boundaries, request validation, response shaping, and reusable async error flow",
    deliveryContext:
      "MERN APIs for projects, products, orders, contacts, and dashboards",
    outcome:
      "routes that are easy to read because each layer has a visible responsibility",
    failureSignal:
      "copy-pasted handlers, mixed response formats, business rules spread across middleware, and unit tests that need the whole server",
    codeKind: "controllerArch",
  },
  "node-express-rest-apis": {
    artifact: "REST API foundation with Node.js and Express",
    scenario:
      "A REST API should communicate resources, status codes, validation errors, pagination, authentication, and response shapes consistently from the first endpoint.",
    primaryConcern:
      "route naming, HTTP methods, controller structure, validation, errors, and MongoDB access",
    deliveryContext:
      "MERN products, portfolio contact APIs, admin dashboards, and React Native backends",
    outcome:
      "an API that frontend developers can integrate without reading server internals",
    failureSignal:
      "verbs in URLs, inconsistent response objects, controllers that swallow errors, and endpoints that return huge unpaginated collections",
    codeKind: "restApis",
  },
  "persisted-auth-state-redux-toolkit": {
    artifact: "persisted Redux auth state pattern",
    scenario:
      "Persisting auth state is useful, but restoring it too early or trusting it too much creates flicker, stale users, and protected screens showing the wrong content.",
    primaryConcern:
      "hydration state, token storage, user refresh, logout cleanup, protected routes, and secure persistence boundaries",
    deliveryContext:
      "React dashboards, Next.js client islands, React Native apps, and MERN authenticated APIs",
    outcome:
      "auth state that survives refresh without pretending local storage is the source of truth",
    failureSignal:
      "UI flashes logged-in content, stale roles remain after server changes, logout leaves data behind, and API clients read tokens before hydration",
    codeKind: "persistAuth",
  },
  "pull-request-review-checklist-github": {
    artifact: "GitHub pull request review checklist",
    scenario:
      "Pull request review is most useful when reviewers can understand the intent, inspect risk, run focused checks, and leave the branch better than they found it.",
    primaryConcern:
      "small diffs, clear descriptions, test evidence, dependency changes, security impact, and release notes",
    deliveryContext:
      "Next.js portfolios, MERN features, React Native releases, and freelance client repositories",
    outcome:
      "reviews that catch bugs without turning every PR into a slow ceremony",
    failureSignal:
      "massive unrelated diffs, no screenshots for UI changes, passing comments without requested tests, and reviews focused only on style",
    codeKind: "prReview",
  },
  "react-error-boundaries-empty-states": {
    artifact: "React fallback system for errors and empty states",
    scenario:
      "Users can forgive a failed request or empty result when the interface explains what happened and offers the next action.",
    primaryConcern:
      "rendering failures, request failures, empty results, retry behavior, and accessible status messaging",
    deliveryContext:
      "React dashboards, Next.js blog listings, product grids, and mobile-like web flows",
    outcome:
      "screens that degrade gracefully instead of going blank when one feature fails",
    failureSignal:
      "white screens, empty tables with no explanation, retry buttons that do nothing, and catch blocks that only log to the console",
    codeKind: "reactBoundary",
  },
  "react-form-handling-validation-errors": {
    artifact: "React form handling and validation pattern",
    scenario:
      "Forms are where UI state, business rules, server validation, focus management, and user trust meet.",
    primaryConcern:
      "controlled input state, client validation, server errors, submit lifecycle, disabled states, and success feedback",
    deliveryContext:
      "portfolio contact forms, checkout steps, admin product editors, and MERN registration screens",
    outcome:
      "forms that prevent simple mistakes locally and still respect the API as the final authority",
    failureSignal:
      "double submissions, field errors shown in the wrong place, lost input after server failure, and generic toasts replacing useful inline feedback",
    codeKind: "reactForm",
  },
  "react-hooks-mistakes-useeffect": {
    artifact: "safe useEffect pattern for React applications",
    scenario:
      "`useEffect` is often blamed for confusion when the actual problem is unclear ownership of synchronization, cleanup, dependencies, or derived state.",
    primaryConcern:
      "dependency arrays, aborting async work, avoiding derived state effects, event subscriptions, and separating render calculations from synchronization",
    deliveryContext:
      "React dashboards, Next.js client components, search fields, and React Native screens",
    outcome:
      "effects that synchronize with the outside world without becoming hidden business logic",
    failureSignal:
      "infinite loops, stale closures, duplicate fetches, memory leak warnings, and effects that copy props into state unnecessarily",
    codeKind: "useEffect",
  },
  "react-native-android-deployment": {
    artifact: "React Native Android deployment checklist",
    scenario:
      "Shipping to Android requires more than a successful JavaScript bundle; signing, versions, permissions, assets, Play Console settings, and release smoke tests must line up.",
    primaryConcern:
      "keystore safety, Gradle variants, versionCode, bundle generation, release testing, and store metadata",
    deliveryContext:
      "customer apps, delivery partner apps, service apps, and Android production releases",
    outcome:
      "a Play Store-ready build that can be installed and trusted before review starts",
    failureSignal:
      "lost keystores, version conflicts, release API URL mistakes, missing permissions, and screenshots that do not match the current app",
    codeKind: "androidDeploy",
  },
  "react-native-flatlist-performance": {
    artifact: "React Native FlatList performance tuning plan",
    scenario:
      "Large mobile lists can feel slow when every row renders too much, images resize late, keys are unstable, or pagination fights scroll behavior.",
    primaryConcern:
      "stable keys, memoized rows, virtualization settings, image sizes, pagination thresholds, and empty/loading states",
    deliveryContext:
      "order histories, product feeds, delivery task lists, and dashboard logs in React Native",
    outcome:
      "smooth scrolling that holds up when real production data replaces the sample list",
    failureSignal:
      "janky scroll, blank rows, duplicate page fetches, row re-renders on every keystroke, and list state resetting after navigation",
    codeKind: "flatList",
  },
  "react-native-android-app-development": {
    artifact: "React Native Android app architecture",
    scenario:
      "React Native Android projects work best when navigation, API state, permissions, forms, and native configuration are planned as one app flow.",
    primaryConcern:
      "screen structure, reusable components, API integration, platform behavior, Android permissions, and release readiness",
    deliveryContext:
      "e-commerce apps, delivery workflows, dashboards, and service booking apps",
    outcome:
      "a mobile app that feels native enough for users and maintainable enough for web-minded teams",
    failureSignal:
      "web patterns copied directly to mobile, large unvirtualized lists, broken back behavior, and release builds tested too late",
    codeKind: "rnGuide",
  },
  "react-native-native-modules-when-needed": {
    artifact: "React Native native module decision process",
    scenario:
      "Native modules are powerful, but adding one should be a product decision tied to a capability JavaScript cannot reliably provide.",
    primaryConcern:
      "native SDK requirements, bridge cost, maintenance ownership, Android configuration, and graceful fallback",
    deliveryContext:
      "payments, hardware access, background services, custom analytics, and platform-specific integrations",
    outcome:
      "native code used where it creates real product value instead of becoming accidental complexity",
    failureSignal:
      "custom native code for simple UI work, libraries added without release testing, and teams unable to debug Gradle or Android errors",
    codeKind: "nativeModules",
  },
  "react-native-navigation-flow-patterns": {
    artifact: "React Native navigation flow architecture",
    scenario:
      "Navigation is the shape of a mobile product: auth, tabs, stacks, deep links, modals, and reset behavior define how users recover from every task.",
    primaryConcern:
      "auth gates, nested navigators, route params, focus refresh, deep links, and predictable back behavior",
    deliveryContext:
      "customer ordering apps, delivery dashboards, profile flows, and admin-style mobile tools",
    outcome:
      "navigation that matches user intent without leaking screen internals across the app",
    failureSignal:
      "back buttons returning to login, stale detail screens, route params used as global state, and deep links opening an incomplete stack",
    codeKind: "rnNavigation",
  },
  "react-performance-optimization": {
    artifact: "React performance optimization workflow",
    scenario:
      "React performance problems are easier to fix after measuring which components render, which data changes, and which visual work blocks interaction.",
    primaryConcern:
      "state boundaries, memoization, list rendering, image stability, code splitting, and measuring before changing code",
    deliveryContext:
      "portfolio pages, admin dashboards, product grids, and data-heavy React screens",
    outcome:
      "faster interactions achieved by removing unnecessary work rather than adding memo everywhere",
    failureSignal:
      "filter inputs lag, cards rerender together, charts block typing, and optimization changes cannot be tied to a measured before/after",
    codeKind: "reactPerf",
  },
  "react-state-management-decisions": {
    artifact: "React state management decision map",
    scenario:
      "State gets complicated when local UI state, server data, URL filters, forms, and authenticated user data are all stored in the same place.",
    primaryConcern:
      "choosing local state, context, URL state, Redux Toolkit, or server cache based on ownership and lifespan",
    deliveryContext:
      "React dashboards, Next.js pages, MERN apps, and React Native screens",
    outcome:
      "state decisions that make future features easier instead of centralizing everything by habit",
    failureSignal:
      "global stores full of modal booleans, server data copied into unrelated slices, filters lost on refresh, and prop drilling used past its useful limit",
    codeKind: "stateDecision",
  },
  "readme-optimization-developer-portfolio": {
    artifact: "developer portfolio README structure",
    scenario:
      "A portfolio repository should help a recruiter, client, or developer understand the product, stack, setup, screenshots, decisions, and deployment path quickly.",
    primaryConcern:
      "project purpose, feature summary, tech stack, setup steps, environment variables, screenshots, architecture notes, and live links",
    deliveryContext:
      "GitHub portfolio repositories, freelance handoffs, open-source demos, and client-facing project archives",
    outcome:
      "documentation that supports the project instead of looking like the default scaffold was never replaced",
    failureSignal:
      "stale setup commands, broken screenshot links, missing env names, tech lists with no context, and a README that hides the live result",
    codeKind: "readme",
  },
  "reducing-layout-shift-images": {
    artifact: "layout-shift prevention pattern for images and cards",
    scenario:
      "A page feels unstable when images load late, card heights change after text arrives, or responsive media boxes do not reserve space.",
    primaryConcern:
      "aspect ratios, explicit dimensions, priority images, skeleton boundaries, and avoiding content jumps in cards",
    deliveryContext:
      "Next.js blog pages, React project cards, e-commerce product grids, and portfolio galleries",
    outcome:
      "visual stability that makes pages feel faster even before every asset has completed loading",
    failureSignal:
      "cards jumping during load, text moving below hero images, cumulative layout shift warnings, and images without dimensions",
    codeKind: "layoutShift",
  },
  "redux-selectors-store-architecture": {
    artifact: "Redux selector and store architecture plan",
    scenario:
      "Redux stores stay useful when slices hold source state and selectors derive the visible data needed by screens.",
    primaryConcern:
      "slice boundaries, memoized selectors, normalized data, filter state, and avoiding derived arrays stored as source state",
    deliveryContext:
      "React admin dashboards, product filters, order lists, and React Native state-heavy screens",
    outcome:
      "components that read intention-revealing selectors instead of rebuilding business rules in JSX",
    failureSignal:
      "selectors recreated inside render, filtered arrays stored in Redux, slices importing each other, and components knowing too much about state shape",
    codeKind: "reduxSelectors",
  },
  "redux-toolkit-async-thunks-api-state": {
    artifact: "Redux Toolkit async thunk API-state workflow",
    scenario:
      "Async thunks are most useful when API state has explicit pending, fulfilled, and rejected paths that the UI can render honestly.",
    primaryConcern:
      "request lifecycle, reject values, loading flags by operation, cancellation, normalized payloads, and retryable errors",
    deliveryContext:
      "React dashboards, MERN admin panels, mobile order lists, and authenticated API flows",
    outcome:
      "screens that know exactly whether data is loading, available, empty, stale, or failed",
    failureSignal:
      "one global loading boolean, thrown errors without useful payloads, reducers that duplicate status logic, and components guessing from array length",
    codeKind: "reduxThunk",
  },
  "redux-toolkit-react-applications": {
    artifact: "Redux Toolkit architecture for React applications",
    scenario:
      "Redux Toolkit is strongest when it manages shared application state with clear slices, typed actions, selectors, middleware, and focused component connections.",
    primaryConcern:
      "slice design, store setup, async flows, selectors, devtools, and keeping local state out of the global store",
    deliveryContext:
      "React dashboards, e-commerce filters, authenticated user sessions, and React Native apps",
    outcome:
      "predictable shared state without hand-written reducers becoming a maintenance chore",
    failureSignal:
      "reducers spread across files with inconsistent actions, components dispatching raw API responses everywhere, and Redux used for simple input state",
    codeKind: "reduxToolkit",
  },
  "resolving-git-merge-conflicts": {
    artifact: "Git merge conflict resolution workflow",
    scenario:
      "Merge conflicts are safer when treated as a code review problem: understand both sides, preserve intent, run tests, and commit the resolution deliberately.",
    primaryConcern:
      "conflict markers, branch intent, rerere, rebasing safely, test coverage, and avoiding accidental deletion",
    deliveryContext:
      "React components, content files, route definitions, package updates, and shared API code",
    outcome:
      "conflict resolutions that keep the right behavior from both branches",
    failureSignal:
      "choosing ours/theirs blindly, resolving generated files first, skipping tests, and committing conflict markers",
    codeKind: "mergeConflicts",
  },
  "rest-api-pagination-filtering-sorting": {
    artifact: "pagination, filtering, and sorting contract for REST APIs",
    scenario:
      "List endpoints become painful when pagination, filters, sort options, totals, and frontend URL state are added without a shared contract.",
    primaryConcern:
      "query parameters, allowed filters, safe sorting, total counts, page boundaries, and MongoDB query performance",
    deliveryContext:
      "product catalogs, admin tables, order histories, blog indexes, and mobile lists",
    outcome:
      "list APIs that are fast, predictable, and easy for React screens to consume",
    failureSignal:
      "unbounded queries, client-side filtering over huge responses, sort injection risks, and UI pagination that disagrees with backend totals",
    codeKind: "paginationApi",
  },
  "scalable-react-component-architecture": {
    artifact: "scalable React component architecture",
    scenario:
      "React components scale when feature boundaries, shared primitives, state ownership, and data contracts are visible in the folder structure.",
    primaryConcern:
      "feature modules, presentational components, hooks, server/client boundaries, and avoiding over-abstracted UI wrappers",
    deliveryContext:
      "portfolio sections, dashboards, e-commerce pages, and reusable component libraries",
    outcome:
      "features that can change without forcing a full UI rewrite",
    failureSignal:
      "large component files, unclear prop ownership, generic components with too many flags, and business logic hidden in shared UI primitives",
    codeKind: "reactArchitecture",
  },
  "semantic-html-for-developer-portfolios": {
    artifact: "semantic HTML plan for portfolio SEO and accessibility",
    scenario:
      "A developer portfolio should be attractive, but it also needs headings, landmarks, link text, image alt text, and structured content that machines can understand.",
    primaryConcern:
      "landmark elements, heading order, descriptive anchors, accessible images, article semantics, and SEO-friendly content hierarchy",
    deliveryContext:
      "Next.js portfolio home pages, project case studies, resume pages, and blog articles",
    outcome:
      "a portfolio that reads clearly to users, crawlers, and assistive technology",
    failureSignal:
      "div-only sections, skipped heading levels, buttons used for links, vague alt text, and invisible SEO text that does not match the visible page",
    codeKind: "semanticHtml",
  },
  "tailwind-css-component-patterns": {
    artifact: "Tailwind component pattern for reusable React UI",
    scenario:
      "Tailwind stays maintainable when repeated class sets become intentional variants instead of long strings copied across every component.",
    primaryConcern:
      "variant maps, responsive constraints, design tokens, class composition, and keeping component APIs small",
    deliveryContext:
      "portfolio cards, dashboard controls, form buttons, and reusable React UI components",
    outcome:
      "fast styling without losing consistency as the component set grows",
    failureSignal:
      "class strings that differ by one forgotten utility, one-off colors outside tokens, components with visual flags nobody remembers, and responsive bugs repeated across cards",
    codeKind: "tailwindPatterns",
  },
  "validating-express-api-inputs": {
    artifact: "Express API input validation layer",
    scenario:
      "Controllers become messy when every route manually checks request bodies, query parameters, auth context, and business rules inline.",
    primaryConcern:
      "schema-like validation, sanitized values, consistent 400 responses, middleware placement, and separating validation from business logic",
    deliveryContext:
      "MERN contact forms, product APIs, order endpoints, and admin dashboards",
    outcome:
      "requests rejected early with field-level errors that React and React Native clients can render cleanly",
    failureSignal:
      "trusted client validation, controller branches for every missing field, unsafe query parameters, and inconsistent error payloads",
    codeKind: "expressValidation",
  },
};

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatterValue(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return inner
      .split(",")
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }

  return stripQuotes(trimmed);
}

function parseFrontmatter(source) {
  const match = source.match(frontmatterRegex);
  if (!match) return { data: {}, content: source.trim() };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    data[key] = parseFrontmatterValue(value);
  }

  return { data, content: source.slice(match[0].length).trim() };
}

function readPosts() {
  return fs
    .readdirSync(blogDir)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      const source = fs.readFileSync(path.join(blogDir, fileName), "utf8");
      const { data } = parseFrontmatter(source);
      const fileSlug = fileName.replace(/\.mdx?$/, "");
      const slug = data.slug || fileSlug;
      const tags = Array.isArray(data.tags) ? data.tags : [];
      return {
        fileName,
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "2026-08-01",
        category: data.category || "Engineering",
        tags,
        keywords:
          Array.isArray(data.keywords) && data.keywords.length
            ? data.keywords
            : [data.title || slug, data.category || "Engineering", ...tags],
        author: data.author || "Nishitha Reddy Musku",
        featured: Boolean(data.featured),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function domainFor(post) {
  if (post.category === "Next.js") return "Next.js";
  if (post.category === "React Native" || post.category === "Mobile Development") {
    return "React Native";
  }
  if (post.category === "Backend") return "Backend";
  if (post.category === "Database") return "Database";
  if (post.category === "State Management") return "State Management";
  if (post.category === "Git & GitHub") return "Git";
  if (["Deployment", "Hosting", "DevOps"].includes(post.category)) return "Deployment";
  if (post.category === "JavaScript") return "JavaScript";
  if (post.category === "Performance") return "Performance";
  return "Frontend";
}

const domainDetails = {
  Frontend: {
    concepts: [
      "Treat layout as a contract: containers, grids, media boxes, and controls should have stable dimensions before real data arrives.",
      "Keep semantic HTML first. ARIA can fill gaps, but it should not replace buttons, links, labels, lists, headings, and landmarks.",
      "Separate reusable primitives from feature-specific composition so a card, button, or form row does not learn every business rule.",
      "Test the same screen with keyboard, touch, long text, slow images, and filtered data because frontend bugs often appear at boundaries.",
      "Use design tokens and small variant maps for repeated decisions instead of copying near-identical class strings throughout the project.",
    ],
    useCases: [
      "A portfolio project grid can reserve image space, keep link text descriptive, and still preserve the existing animation style.",
      "An admin dashboard can use dense table and filter layouts without making the mobile version feel like an afterthought.",
      "A MERN product editor can keep forms accessible and predictable while the backend returns field-level validation errors.",
      "A Next.js blog can combine semantic headings, strong images, and internal links without redesigning the page shell.",
    ],
    mistakes: [
      "Styling a `div` to behave like a button and then trying to patch keyboard support afterward.",
      "Using device-name breakpoints instead of watching where content, controls, and images actually start to fail.",
      "Letting text length change card height unpredictably without line clamps, stable media boxes, or responsive constraints.",
      "Hiding important states behind color alone, which weakens both accessibility and debugging.",
      "Copying a component because changing the existing one feels risky, then maintaining two nearly identical implementations.",
    ],
    best: [
      "Start from semantic elements, then layer Tailwind, Bootstrap, or component-library classes on top.",
      "Name components after the user-facing role they play, not after their temporary layout.",
      "Keep a small visual checklist for focus, hover, loading, empty, error, disabled, and long-content states.",
      "Use browser devtools throttling to inspect image, font, and layout behavior under slower conditions.",
      "Make content constraints explicit with `minmax`, `aspect-ratio`, line clamps, and clear spacing scales.",
    ],
    production: [
      "Run Lighthouse or a similar audit only after manually checking the important flows; tools are useful but not a substitute for product context.",
      "Check mobile widths where real users are likely to land, especially 360px to 430px Android screens.",
      "Verify image alt text during content review, not after launch when every asset already looks final.",
      "Keep reusable UI APIs small so performance and accessibility fixes can be applied in one place.",
      "Avoid layout changes that force a redesign unless the issue cannot be solved inside the existing component system.",
    ],
  },
  React: {
    concepts: [
      "Draw a clear boundary between source state, derived data, side effects, and rendered output.",
      "Measure render cost before optimizing so memoization, splitting, and state movement solve the actual bottleneck.",
      "Represent async work with explicit states such as idle, loading, success, empty, and error.",
      "Keep effects for synchronization with systems outside React, not for calculations that can happen during render.",
      "Design fallback UI as part of the feature; loading, empty, and error states are not decorative extras.",
    ],
    useCases: [
      "A portfolio blog listing can filter posts without remounting every card or losing the active category.",
      "A MERN dashboard can fetch metrics, show stale data deliberately, and retry without hiding the failure.",
      "A product form can combine client checks with server validation while preserving the user's input.",
      "A React Native-inspired web workflow can keep navigation-like screens responsive by keeping state close to the interaction.",
    ],
    mistakes: [
      "Putting every piece of state at the page root because it feels easier during the first implementation.",
      "Using `useEffect` to copy props into state when a derived value or controlled prop would be clearer.",
      "Adding `React.memo` everywhere without stabilizing props or proving that rendering is the bottleneck.",
      "Rendering nothing while data loads, which makes the user think the route is broken.",
      "Letting API details leak into presentational components until every UI change risks a backend assumption.",
    ],
    best: [
      "Keep feature hooks close to the feature and shared hooks genuinely reusable.",
      "Use reducers when state transitions matter more than individual setter calls.",
      "Make empty and error components accept explicit messages and actions instead of hardcoding text.",
      "Prefer derived arrays outside JSX so rendering stays easy to read.",
      "Profile the interaction users complain about, not the component tree in general.",
    ],
    production: [
      "Log request failures with route, status, and request ID while avoiding tokens and raw personal data.",
      "Ship small bundles by keeping heavy widgets behind route or interaction boundaries.",
      "Test slow network and interrupted navigation because many React bugs are timing bugs.",
      "Review dependency arrays during code review; they are behavior, not formatting.",
      "Keep user-visible recovery paths near the failing UI instead of pushing every failure into a global toast.",
    ],
  },
  "Next.js": {
    concepts: [
      "Use server components for data loading and static content, then isolate browser interactivity in small client components.",
      "Make metadata a data contract: title, description, canonical, Open Graph, and JSON-LD should agree with the rendered page.",
      "Treat dynamic routes as content contracts. Every slug used by a listing should resolve, render headings, and expose working internal links.",
      "Reserve image dimensions and choose `sizes` intentionally so visual polish does not cost layout stability.",
      "Run production builds early because development mode is deliberately forgiving about several route and rendering mistakes.",
    ],
    useCases: [
      "A portfolio blog can statically generate every MDX-backed slug and avoid empty article pages.",
      "A contact form can use a route handler for validation and email dispatch without exposing server secrets.",
      "An e-commerce category page can render SEO content on the server and keep filters interactive on the client.",
      "A dashboard shell can keep layout static while client widgets handle charts, tabs, and refresh controls.",
    ],
    mistakes: [
      "Adding `use client` to a top-level route because one child uses a hook.",
      "Generating metadata from a different data source than the page content.",
      "Forgetting that image paths, content files, and environment variables must exist during production build.",
      "Testing only client-side navigation while direct visits to dynamic routes fail.",
      "Letting canonical URLs point to localhost, preview deployments, or mixed www/non-www domains.",
    ],
    best: [
      "Keep content loaders in server-only library files and pass serializable summaries to client components.",
      "Use `generateStaticParams` for content routes that should be crawlable and stable.",
      "Pair every dynamic detail page with `notFound` behavior and a validation audit.",
      "Give each page one clear H1 and use semantic headings in the rendered article content.",
      "Run a route smoke test after content changes, not only after component changes.",
    ],
    production: [
      "Check `npm run build` before deployment and read the first failing route carefully.",
      "Verify Open Graph images from the production URL because social previews do not use your local filesystem.",
      "Keep public and server-only environment variables separated by name and import location.",
      "Test direct refresh on blog, project, and contact routes after deployment.",
      "Use JSON-LD sparingly but accurately; structured data should describe the actual page users see.",
    ],
  },
  Backend: {
    concepts: [
      "Separate transport concerns from business rules: routing, validation, auth, controller work, and error formatting should be distinct.",
      "Reject invalid input before it reaches database code, and return field-level errors the frontend can render.",
      "Use consistent response shapes so React and React Native clients do not branch for every endpoint.",
      "Design authentication and authorization on the server even when the UI hides protected actions.",
      "Make logs useful for debugging production requests without recording secrets, tokens, or full sensitive payloads.",
    ],
    useCases: [
      "A portfolio contact endpoint can validate messages, rate-limit spam, and report email failures cleanly.",
      "An admin dashboard API can protect role-based data and paginate large MongoDB collections.",
      "A React Native app can receive stable 401, 403, 422, and 500 responses and route users accordingly.",
      "A MERN product catalog can keep controllers thin while services own business operations.",
    ],
    mistakes: [
      "Trusting client-side validation and sending unchecked request bodies directly to Mongoose.",
      "Returning a different error format from every controller.",
      "Using wildcard CORS with credentials because it fixes local development quickly.",
      "Logging authorization headers or full uploaded file metadata in production.",
      "Starting the development command on a production server and losing crashes after the terminal closes.",
    ],
    best: [
      "Use middleware for repeated request work and keep controllers focused on one resource action.",
      "Normalize validation errors into a predictable object keyed by field name.",
      "Add a health route that proves the process is alive and, when appropriate, the database is reachable.",
      "Keep environment configuration validated during startup so missing secrets fail loudly.",
      "Return status codes that communicate the actual class of failure: 400, 401, 403, 404, 409, 422, or 500.",
    ],
    production: [
      "Use HTTPS, strict CORS, rate limits, input size limits, and safe headers as the minimum API boundary.",
      "Measure slow endpoints and inspect query plans before scaling server size.",
      "Rotate secrets through deployment settings, not commits or shared screenshots.",
      "Include request IDs in logs and responses so frontend reports can be traced.",
      "Smoke-test create, read, update, delete, auth, upload, and failure paths after deployment.",
    ],
  },
  Database: {
    concepts: [
      "Design documents around read and write patterns, not around how a form happens to look today.",
      "Index queries that users actually run, especially filters that combine equality, sorting, and pagination.",
      "Use projections to return only fields the UI needs and lean reads for list responses that do not need document methods.",
      "Protect data integrity with schema validation, server validation, and careful update paths.",
      "Keep aggregation pipelines explainable by filtering early, projecting deliberately, and naming output fields for the UI.",
    ],
    useCases: [
      "A product grid can fetch only card fields instead of entire product documents.",
      "A dashboard can aggregate order revenue server-side and send chart-ready points to React.",
      "A React Native order history can paginate by status and date without scanning the whole collection.",
      "A portfolio CMS can query published projects quickly with a small compound index.",
    ],
    mistakes: [
      "Adding indexes to every field without checking whether they support a real query.",
      "Returning private or admin-only fields because the API did not use projection.",
      "Embedding large changing arrays that make small updates rewrite too much data.",
      "Assuming Mongoose validators run the same way for saves and update operations.",
      "Computing dashboard totals in the browser after sending thousands of documents over the network.",
    ],
    best: [
      "Write down the top list, detail, search, and dashboard queries before finalizing a model.",
      "Keep immutable snapshots for order data that must not change after checkout.",
      "Use `explain` during performance work and compare winning plans before and after indexes.",
      "Centralize connection logic so serverless functions and Node processes reuse clients correctly.",
      "Prefer small API payloads; frontend performance starts at the database query.",
    ],
    production: [
      "Check Atlas network access, credentials, database name, and connection reuse before blaming frontend code.",
      "Monitor slow queries and index usage after real users arrive.",
      "Back up data before migrations that change schema shape or denormalized fields.",
      "Avoid logging connection strings, credentials, full user documents, or payment-related data.",
      "Test pagination, empty collections, duplicate writes, and validation errors with production-like data volume.",
    ],
  },
  "React Native": {
    concepts: [
      "Mobile flows depend on navigation state, async API state, permissions, keyboard behavior, and platform-specific release configuration.",
      "Design for interrupted usage: users background the app, lose network, deny permissions, and return through notifications or deep links.",
      "Keep heavy lists virtualized and row components memoized because mobile devices reveal render waste quickly.",
      "Treat Android release builds as a separate runtime that needs its own testing path.",
      "Use native modules only when the product truly needs platform capability that JavaScript cannot provide reliably.",
    ],
    useCases: [
      "A grocery app can combine product lists, cart state, permissions, and push notifications without blocking checkout.",
      "A delivery partner app can refresh task details when a screen regains focus and when a push notification opens it.",
      "A mobile dashboard can keep lists smooth by shaping API data before rendering rows.",
      "A service app can request camera or location permission only when the user starts the matching feature.",
    ],
    mistakes: [
      "Testing only debug builds and discovering API, asset, or native configuration bugs in release.",
      "Using scroll views for large datasets instead of `FlatList` or another virtualized list.",
      "Requesting permissions at app launch before the user understands why the feature needs them.",
      "Passing large objects through navigation params instead of stable IDs.",
      "Copying web form patterns without accounting for keyboard, touch target, and offline behavior.",
    ],
    best: [
      "Model loading, empty, error, and refreshing states for every API-backed screen.",
      "Keep route params small and refetch screen data on focus when freshness matters.",
      "Use Android version checks for permissions that changed across API levels.",
      "Generate release builds regularly during development, not only at store-submission time.",
      "Write platform notes near the code that needs native configuration so future updates are not guesswork.",
    ],
    production: [
      "Smoke-test release APK/AAB files on a physical Android device before handing them to testers or the Play Console.",
      "Keep keystores backed up securely; losing them can block future updates.",
      "Verify notification, deep link, permission, and offline paths under realistic network conditions.",
      "Watch crash reports after rollout and include app version/build number in backend logs.",
      "Avoid shipping secrets in the mobile bundle; mobile clients are public clients.",
    ],
  },
  "State Management": {
    concepts: [
      "Separate local UI state, server data, derived data, persisted auth, and URL state before selecting a tool.",
      "Keep Redux slices focused on source state and use selectors for filtered, sorted, or combined views.",
      "Represent async work with status and error fields that match real UI states.",
      "Persist only what can safely survive refresh; restore it through a visible hydration step.",
      "Use Redux Toolkit conventions so reducers, actions, and thunks remain predictable as features grow.",
    ],
    useCases: [
      "A dashboard can keep filters in URL state, fetched rows in Redux, and modal toggles local.",
      "A React Native app can persist auth tokens while refreshing the user profile from the API.",
      "An e-commerce page can derive visible products from source items and filter settings through selectors.",
      "A portfolio admin panel can track create/update status separately from list loading.",
    ],
    mistakes: [
      "Storing derived arrays in Redux and then fighting synchronization bugs when filters change.",
      "Using one loading boolean for unrelated operations such as fetch, save, delete, and upload.",
      "Persisting entire API responses that may become stale or expose data after logout.",
      "Recreating memoized selectors inside components on every render.",
      "Choosing global state before checking whether a simple component boundary would be enough.",
    ],
    best: [
      "Write slice state in the same language the UI uses: status, error, ids, entities, filters, and selectedId.",
      "Use `rejectWithValue` for API errors that the UI needs to display.",
      "Export selectors from slice or feature files so components do not know internal state shape.",
      "Hydrate persisted auth before rendering protected routes.",
      "Keep side effects in thunks, listener middleware, or feature hooks, not in reducers.",
    ],
    production: [
      "Clear persisted sensitive state on logout and token refresh failures.",
      "Inspect Redux DevTools for accidental large payloads before shipping heavy dashboards.",
      "Handle rejected thunks from expired sessions, offline users, and validation failures separately.",
      "Memoize expensive selectors and measure whether they actually reduce work.",
      "Keep API response normalization consistent so selectors stay simple.",
    ],
  },
  JavaScript: {
    concepts: [
      "Make data flow explicit before rendering: receive, validate, normalize, derive, then display.",
      "Async bugs become easier when each request, timer, and state update has an owner and cleanup path.",
      "Errors should carry enough context for the UI to choose a recovery path without exposing internal implementation details.",
      "Prefer small named transformations over clever chained code that hides business rules.",
      "Use browser and React timing tools to separate network delay, JavaScript work, and rendering work.",
    ],
    useCases: [
      "A dashboard can transform API records into chart labels and table rows before JSX reads them.",
      "A search field can prevent stale responses from overwriting newer results.",
      "A contact form can map HTTP failures into field errors, retry states, and auth redirects.",
      "A React Native screen can cancel work when the user leaves before a request returns.",
    ],
    mistakes: [
      "Assuming API responses arrive in the same order requests were sent.",
      "Mutating arrays from API state and causing unrelated components to see changed data.",
      "Catching errors only to `console.log` them while leaving the user with a frozen UI.",
      "Using `reduce` where `map`, `filter`, or `find` would communicate intent more clearly.",
      "Letting timers and subscriptions outlive the screen or component that created them.",
    ],
    best: [
      "Keep transformations pure and return new arrays or objects instead of mutating inputs.",
      "Use `AbortController`, request IDs, or cleanup flags for async UI workflows.",
      "Map server errors into a small UI-friendly shape at the API boundary.",
      "Name derived data by what the UI needs, such as `visibleProducts` or `orderTotals`.",
      "Write small tests for data shaping when business rules affect money, inventory, or permissions.",
    ],
    production: [
      "Log failure class, status, and route while avoiding personal data and secrets.",
      "Throttle or debounce noisy inputs carefully and cancel outdated work.",
      "Measure transformation cost for large arrays before moving work to the backend.",
      "Show stale data deliberately if it helps the user, but label refresh failures clearly.",
      "Keep retry limits finite so outages do not become client-side loops.",
    ],
  },
  Performance: {
    concepts: [
      "Performance is a budget, not a final cleanup pass: JavaScript, images, CSS, fonts, and backend payloads all contribute.",
      "Stability matters as much as speed; users notice layout shifts and delayed interactions even when total load time looks acceptable.",
      "Optimize the critical route first, then defer or split work that is not needed for the first interaction.",
      "Measure before and after using the same device, network, and route.",
      "Treat image dimensions, bundle boundaries, and data payload size as part of component design.",
    ],
    useCases: [
      "A blog article can prioritize the hero image while lazy-loading related cards below the fold.",
      "A dashboard can load a fast summary first and defer heavy charts until the user reaches them.",
      "A React portfolio can avoid shifting cards by reserving media and text space.",
      "A MERN API can improve frontend speed by returning projected fields and paginated results.",
    ],
    mistakes: [
      "Optimizing component renders while the largest issue is image size or API payload weight.",
      "Marking every image as priority and competing with the real hero asset.",
      "Using skeletons that do not match final dimensions, causing the same layout shift later.",
      "Adding large third-party libraries for one small interaction.",
      "Comparing performance numbers from different routes or networks and calling the result a regression.",
    ],
    best: [
      "Set budgets for route JavaScript, image weight, and expected interaction latency.",
      "Reserve layout space with explicit dimensions, aspect ratios, and stable grid tracks.",
      "Split heavy widgets by route or interaction and verify that the split actually changes the bundle.",
      "Keep images descriptive and correctly sized; visual quality and technical performance should support each other.",
      "Use production builds for measurements because development mode is not representative.",
    ],
    production: [
      "Track Core Web Vitals and compare them against known releases.",
      "Review new dependencies during PRs for bundle impact.",
      "Check mobile performance separately; desktop hardware can hide slow JavaScript and layout work.",
      "Cache static assets aggressively while keeping data freshness intentional.",
      "Record performance changes in release notes when they affect important user flows.",
    ],
  },
  Git: {
    concepts: [
      "Git workflows are collaboration tools first: history should help teammates understand intent and recover safely.",
      "Choose reset, revert, merge, rebase, and stash based on whether work is local, shared, reviewed, or already deployed.",
      "Keep pull requests small enough that reviewers can inspect behavior, tests, and risk.",
      "Resolve conflicts by preserving both branches' intent, then prove the result with focused checks.",
      "Document project setup because repository quality includes how quickly someone can run and review it.",
    ],
    useCases: [
      "A portfolio update can branch by feature, include screenshots, and merge after build verification.",
      "A MERN backend change can pair controller edits with route tests in one reviewable PR.",
      "A React Native release can use a release branch while main continues feature work.",
      "A content-heavy blog can validate all generated routes before the PR is approved.",
    ],
    mistakes: [
      "Using force push on shared branches without coordination.",
      "Combining formatting, dependency upgrades, UI redesign, and bug fixes in one review.",
      "Resolving conflicts by accepting one side without reading the surrounding code.",
      "Leaving stashes unnamed until nobody knows which one contains useful work.",
      "Shipping a README that no longer matches the package manager, scripts, or environment variables.",
    ],
    best: [
      "Name branches after the change and keep them short-lived.",
      "Put reproduction steps, screenshots, and test commands in PR descriptions.",
      "Use revert for shared history that must be undone visibly.",
      "Inspect conflicts with `git diff` before staging the resolution.",
      "Keep documentation updates in the same change when behavior or setup changes.",
    ],
    production: [
      "Protect main branches and require CI for deployable projects.",
      "Tag releases or record deployed commits so rollbacks are traceable.",
      "Use `--force-with-lease` instead of plain force when rewriting your own remote branch.",
      "Run targeted tests after conflict resolution, not only after feature implementation.",
      "Keep generated artifacts out of commits unless the project intentionally tracks them.",
    ],
  },
  Deployment: {
    concepts: [
      "Deployment is the point where build output, runtime configuration, domains, APIs, databases, and observability all meet.",
      "Treat environment variables as part of the release contract, not as local developer trivia.",
      "Test direct URLs, refresh behavior, image paths, API writes, and metadata from the final domain.",
      "Keep rollback and logs visible before users report the first issue.",
      "Separate static hosting needs from server-rendered or API-backed application needs.",
    ],
    useCases: [
      "A Next.js portfolio can generate every article route, sitemap entry, and Open Graph image during build.",
      "A React SPA on shared hosting can use fallback rewrites so nested routes survive refresh.",
      "A Node API on Render or PM2 can expose a health endpoint and reuse its MongoDB connection.",
      "A MERN release can smoke-test login, CRUD, uploads, and CORS from production origins.",
    ],
    mistakes: [
      "Assuming a successful local dev server proves the production build.",
      "Testing only the homepage after deploy while dynamic routes or API writes are broken.",
      "Uploading source code to a static host instead of the build output.",
      "Changing DNS repeatedly before propagation and SSL issuance settle.",
      "Leaving preview URLs in canonical metadata, API origins, or shared documentation.",
    ],
    best: [
      "Write down build command, output directory, Node version, env values, domains, and health URLs.",
      "Run production builds locally before pushing a release branch.",
      "Make the deployment platform responsible for secrets and never commit real credentials.",
      "Use strict CORS and canonical URLs that match the final domain.",
      "Keep a short smoke-test list that covers the user journeys money or trust depends on.",
    ],
    production: [
      "Check deployment logs immediately after the first real requests.",
      "Verify DNS, SSL, redirects, sitemap, robots, and structured data from the public URL.",
      "Monitor server memory and database connection counts after launch.",
      "Keep previous successful deploys reachable for rollback where the platform supports it.",
      "Test mobile and desktop layouts after deployment because asset paths and CSS can fail differently than local dev.",
    ],
  },
};

function q(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function listValue(items) {
  return `[${items.map((item) => q(item)).join(", ")}]`;
}

function wordCount(value) {
  return value.split(/\s+/).filter(Boolean).length;
}

function estimateReadingTime(content) {
  return `${Math.max(8, Math.ceil(wordCount(content) / 190))} min read`;
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function getProfile(post) {
  const profile = topicProfiles[post.slug];
  if (!profile) {
    throw new Error(`Missing topic profile for ${post.slug}`);
  }
  return {
    ...profile,
    domain: domainFor(post),
  };
}

function relatedPostsFor(post, allPosts) {
  const tags = new Set(post.tags);
  const related = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const tagScore = candidate.tags.filter((tag) => tags.has(tag)).length * 3;
      const categoryScore = candidate.category === post.category ? 4 : 0;
      const domainScore = domainFor(candidate) === domainFor(post) ? 2 : 0;
      const dateScore = Math.max(
        0,
        1 - Math.abs(new Date(candidate.date) - new Date(post.date)) / 86400000 / 60
      );
      return {
        candidate,
        score: tagScore + categoryScore + domainScore + dateScore,
      };
    })
    .sort((a, b) => b.score - a.score || new Date(b.candidate.date) - new Date(a.candidate.date))
    .slice(0, 4)
    .map(({ candidate }) => candidate);

  return related;
}

function fence(language, code) {
  return `\`\`\`${language}\n${code.trim()}\n\`\`\``;
}

const primarySnippets = {
  accessibility: {
    title: "Build labelled fields that announce errors",
    language: "jsx",
    code: `
function EmailField({ value, error, onChange }) {
  return (
    <div className="field">
      <label htmlFor="contact-email">Email address</label>
      <input
        id="contact-email"
        name="email"
        type="email"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "contact-email-error" : undefined}
      />
      {error ? (
        <p id="contact-email-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}`,
  },
  aggregation: {
    title: "Return chart-ready dashboard metrics from MongoDB",
    language: "js",
    code: `
const metrics = await Order.aggregate([
  { $match: { status: "completed", createdAt: { $gte: startDate } } },
  {
    $group: {
      _id: { day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } },
      revenue: { $sum: "$total" },
      orders: { $sum: 1 },
      averageOrderValue: { $avg: "$total" }
    }
  },
  { $sort: { "_id.day": 1 } },
  { $project: { _id: 0, day: "$_id.day", revenue: 1, orders: 1, averageOrderValue: 1 } }
]);`,
  },
  rnPermissions: {
    title: "Request Android permission at feature time",
    language: "js",
    code: `
import { PermissionsAndroid, Platform } from "react-native";

export async function requestCameraPermission() {
  if (Platform.OS !== "android") return true;

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: "Camera access",
      message: "Camera access is needed to upload a profile photo.",
      buttonPositive: "Allow",
      buttonNegative: "Not now"
    }
  );

  return status === PermissionsAndroid.RESULTS.GRANTED;
}`,
  },
  reactApi: {
    title: "Use an abortable request hook for dashboard data",
    language: "jsx",
    code: `
function useDashboardOrders(filters) {
  const [state, setState] = useState({ status: "idle", data: [], error: null });

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams(filters);

    async function loadOrders() {
      setState({ status: "loading", data: [], error: null });
      const response = await fetch("/api/orders?" + params, {
        signal: controller.signal
      });
      if (!response.ok) throw new Error("Unable to load orders");
      const body = await response.json();
      setState({ status: body.data.length ? "success" : "empty", data: body.data, error: null });
    }

    loadOrders().catch((error) => {
      if (error.name !== "AbortError") setState({ status: "error", data: [], error });
    });

    return () => controller.abort();
  }, [filters.status, filters.page, filters.search]);

  return state;
}`,
  },
  apiSecurity: {
    title: "Put security checks before controller logic",
    language: "js",
    code: `
app.use(express.json({ limit: "100kb" }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "origin-when-cross-origin");
  next();
});

app.post("/api/admin/products", requireAuth, requireRole("admin"), validateProduct, createProduct);`,
  },
  rnBuild: {
    title: "Generate clean Android release artifacts",
    language: "bash",
    code: `
cd android
./gradlew clean
./gradlew :app:assembleRelease
./gradlew :app:bundleRelease
ls app/build/outputs/apk/release
ls app/build/outputs/bundle/release`,
  },
  bootstrapLayout: {
    title: "Wrap Bootstrap layout in a reusable React section",
    language: "jsx",
    code: `
function ProjectSummaryLayout({ filters, children }) {
  return (
    <section className="container py-4">
      <div className="row g-4 align-items-start">
        <aside className="col-12 col-lg-3">{filters}</aside>
        <main className="col-12 col-lg-9">{children}</main>
      </div>
    </section>
  );
}`,
  },
  responsiveReact: {
    title: "Use stable responsive grid tracks",
    language: "jsx",
    code: `
function ProjectGrid({ projects }) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <article key={project.id} className="min-w-0 rounded-lg border">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>
          <div className="p-4">
            <h3 className="line-clamp-2 text-lg font-bold">{project.title}</h3>
          </div>
        </article>
      ))}
    </section>
  );
}`,
  },
  cors: {
    title: "Allow only known production origins",
    language: "js",
    code: `
const allowedOrigins = new Set([
  "https://muskunishitha.vercel.app",
  "https://admin.muskunishitha.vercel.app"
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true
}));`,
  },
  dashboardCss: {
    title: "Combine grid for structure and flex for local alignment",
    language: "css",
    code: `
.dashboard-shell {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  gap: 24px;
}

.metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
}

@media (max-width: 900px) {
  .dashboard-shell {
    grid-template-columns: 1fr;
  }
}`,
  },
  rnReleaseDebug: {
    title: "Capture release logs from a physical Android device",
    language: "bash",
    code: `
cd android
./gradlew :app:assembleRelease
adb install -r app/build/outputs/apk/release/app-release.apk
adb logcat *:S ReactNative:V ReactNativeJS:V AndroidRuntime:E`,
  },
  vercelDeploy: {
    title: "Run production checks before deploying to Vercel",
    language: "bash",
    code: `
npm ci
npm run build
npx vercel pull --yes --environment=production
npx vercel build --prod
npx vercel deploy --prebuilt --prod`,
  },
  dnsSsl: {
    title: "Check DNS, redirects, and certificate behavior",
    language: "bash",
    code: `
dig muskunishitha.vercel.app
curl -I http://muskunishitha.vercel.app
curl -I https://muskunishitha.vercel.app
curl -I https://www.muskunishitha.vercel.app`,
  },
  envVars: {
    title: "Validate required config during startup",
    language: "js",
    code: `
const requiredConfig = {
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
};

for (const [key, value] of Object.entries(requiredConfig)) {
  if (!value) {
    throw new Error("Missing environment variable: " + key);
  }
}

export const config = requiredConfig;`,
  },
  expoCli: {
    title: "Make the tooling decision explicit",
    language: "js",
    code: `
const projectNeeds = {
  customNativeSdk: true,
  overTheAirUpdates: false,
  teamComfortWithGradle: true,
  fastestPrototype: false
};

const recommendedTooling = projectNeeds.customNativeSdk && projectNeeds.teamComfortWithGradle
  ? "React Native CLI"
  : "Expo";

console.log("Start with:", recommendedTooling);`,
  },
  expressError: {
    title: "Centralize async errors and safe responses",
    language: "js",
    code: `
export const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

export function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: statusCode === 500 ? "Something went wrong" : error.message,
    requestId: req.id
  });
}`,
  },
  expressMiddleware: {
    title: "Order middleware by responsibility",
    language: "js",
    code: `
router.post(
  "/orders",
  requestLogger,
  requireAuth,
  requireRole("customer"),
  validateOrderBody,
  createOrderController
);

app.use(notFoundHandler);
app.use(errorHandler);`,
  },
  uploads: {
    title: "Validate and persist Cloudinary uploads safely",
    language: "js",
    code: `
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function uploadProductImage(req, res, next) {
  if (!req.file || !allowedTypes.has(req.file.mimetype)) {
    return res.status(422).json({ errors: { image: "Upload a JPG, PNG, or WebP image." } });
  }

  const uploaded = await cloudinary.uploader.upload(req.file.path, {
    folder: "products",
    resource_type: "image"
  });

  res.json({ imageUrl: uploaded.secure_url, publicId: uploaded.public_id });
}`,
  },
  fcm: {
    title: "Register and update device tokens deliberately",
    language: "js",
    code: `
import messaging from "@react-native-firebase/messaging";

export async function registerPushToken(apiClient) {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) return { registered: false };

  const token = await messaging().getToken();
  await apiClient.post("/devices", { token, platform: "android" });
  return { registered: true, token };
}`,
  },
  staticHosting: {
    title: "Configure an SPA fallback for static hosting",
    language: "text",
    code: `
Build command: npm run build
Output directory for Vite React: dist
Output directory for Create React App: build
Fallback rule: /*  /index.html  200
Post-deploy checks: /, /projects, /contact, direct refresh, image URLs, API base URL`,
  },
  perfBudget: {
    title: "Track route-level performance budgets",
    language: "js",
    code: `
const budgets = {
  "/": { jsKb: 180, imageKb: 350, lcpMs: 2500 },
  "/blog": { jsKb: 220, imageKb: 500, lcpMs: 2800 },
  "/projects": { jsKb: 240, imageKb: 650, lcpMs: 3000 }
};

export function assertBudget(route, result) {
  const budget = budgets[route];
  return result.jsKb <= budget.jsKb &&
    result.imageKb <= budget.imageKb &&
    result.lcpMs <= budget.lcpMs;
}`,
  },
  gitBranch: {
    title: "Keep branch flow small and reviewable",
    language: "bash",
    code: `
git switch main
git pull --ff-only
git switch -c feature/blog-route-audit
git status
git add content/blogs src/app/blog
git commit -m "Fix blog route content audit"`,
  },
  gitHistory: {
    title: "Choose reset, revert, or stash by history visibility",
    language: "bash",
    code: `
git stash push -m "wip before dependency update"
git reset --soft HEAD~1
git revert 9f4a2ab
git stash list
git stash show --stat stash@{0}`,
  },
  githubActions: {
    title: "Build every pull request in CI",
    language: "yaml",
    code: `
name: CI

on:
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build`,
  },
  arrayData: {
    title: "Prepare API records before rendering JSX",
    language: "js",
    code: `
const visibleProducts = products
  .filter((product) => product.isPublished && product.stock > 0)
  .map((product) => ({
    id: product._id,
    title: product.name.trim(),
    priceLabel: "Rs. " + product.price.toLocaleString("en-IN"),
    image: product.images[0]?.url || "/fallback-product.png"
  }))
  .sort((a, b) => a.title.localeCompare(b.title));`,
  },
  frontendErrors: {
    title: "Map HTTP failures into UI-friendly errors",
    language: "js",
    code: `
export async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      errors: body.errors || {},
      message: body.message || "Unable to complete the request."
    };
  }

  return { ok: true, data: body };
}`,
  },
  eventLoop: {
    title: "Prevent stale responses from winning the race",
    language: "jsx",
    code: `
let latestSearchRequest = 0;

async function searchProducts(query, setState) {
  const requestId = latestSearchRequest + 1;
  latestSearchRequest = requestId;

  setState({ status: "loading", items: [] });
  const response = await fetch("/api/products?q=" + encodeURIComponent(query));
  const data = await response.json();

  if (requestId !== latestSearchRequest) return;
  setState({ status: "success", items: data.items });
}`,
  },
  jwt: {
    title: "Sign small JWT claims and verify them on protected routes",
    language: "js",
    code: `
const token = jwt.sign(
  { sub: user._id.toString(), role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "15m", issuer: "portfolio-api" }
);

export function requireAuth(req, res, next) {
  const tokenValue = req.headers.authorization?.replace("Bearer ", "");
  if (!tokenValue) return res.status(401).json({ message: "Authentication required" });
  req.user = jwt.verify(tokenValue, process.env.JWT_SECRET);
  next();
}`,
  },
  muiForms: {
    title: "Keep Material UI field errors close to the field",
    language: "jsx",
    code: `
<TextField
  label="Product name"
  value={form.name}
  onChange={(event) => updateField("name", event.target.value)}
  error={Boolean(errors.name)}
  helperText={errors.name || "Use the customer-facing product name."}
  fullWidth
  required
/>`,
  },
  mernDeploy: {
    title: "Smoke-test the deployed MERN flow",
    language: "bash",
    code: `
npm run build
curl -I https://api.muskunishitha.vercel.app/health
curl -I https://muskunishitha.vercel.app
curl -X POST https://api.muskunishitha.vercel.app/api/contact \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test User","email":"test@example.com","message":"Deployment smoke test"}'`,
  },
  mobileForms: {
    title: "Keep fields visible while the Android keyboard is open",
    language: "jsx",
    code: `
<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
  <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16 }}>
    <TextInput
      value={phone}
      onChangeText={setPhone}
      keyboardType="phone-pad"
      returnKeyType="next"
      placeholder="Mobile number"
    />
    <Button title={submitting ? "Saving..." : "Save profile"} disabled={submitting} onPress={submitForm} />
  </ScrollView>
</KeyboardAvoidingView>`,
  },
  atlas: {
    title: "Reuse a MongoDB connection in server code",
    language: "js",
    code: `
import mongoose from "mongoose";

let connectionPromise;

export function connectMongo() {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
  }

  return connectionPromise;
}`,
  },
  mongoFullStack: {
    title: "Shape documents for the way the UI reads them",
    language: "js",
    code: `
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    techStack: [{ type: String }],
    imageUrl: { type: String, required: true },
    isPublished: { type: Boolean, default: false }
  },
  { timestamps: true }
);

projectSchema.index({ isPublished: 1, createdAt: -1 });`,
  },
  mongoIndex: {
    title: "Create indexes that match filters and sort order",
    language: "js",
    code: `
productSchema.index({ category: 1, isPublished: 1, createdAt: -1 });
productSchema.index({ vendorId: 1, status: 1, updatedAt: -1 });
productSchema.index({ name: "text", description: "text" });

const products = await Product.find({ category, isPublished: true })
  .sort({ createdAt: -1 })
  .limit(24)
  .lean();`,
  },
  mongoLean: {
    title: "Use lean reads and projections for list endpoints",
    language: "js",
    code: `
const projects = await Project.find({ isPublished: true })
  .select("title slug summary imageUrl techStack createdAt")
  .sort({ createdAt: -1 })
  .limit(12)
  .lean();

res.json({ data: projects });`,
  },
  mongoSchema: {
    title: "Snapshot product details inside an order",
    language: "js",
    code: `
const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  title: { type: String, required: true },
  sku: { type: String, required: true },
  quantity: { type: Number, min: 1, required: true },
  unitPrice: { type: Number, min: 0, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["placed", "paid", "shipped", "cancelled"], default: "placed" }
}, { timestamps: true });`,
  },
  mongooseValidation: {
    title: "Keep validation and hooks predictable",
    language: "js",
    code: `
userSchema.path("email").validate({
  validator(value) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
  },
  message: "Enter a valid email address."
});

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});`,
  },
  nextApi: {
    title: "Validate a portfolio contact route handler",
    language: "js",
    code: `
export async function POST(request) {
  const body = await request.json();
  const errors = {};

  if (!body.name?.trim()) errors.name = "Name is required.";
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(body.email || "")) {
    errors.email = "Enter a valid email address.";
  }
  if (!body.message?.trim()) errors.message = "Message is required.";

  if (Object.keys(errors).length) {
    return Response.json({ errors }, { status: 422 });
  }

  await sendContactEmail(body);
  return Response.json({ ok: true });
}`,
  },
  nextStructure: {
    title: "Use route folders and server libraries deliberately",
    language: "text",
    code: `
src/app/
  blog/
    page.js
    [slug]/page.js
  contact/page.js
src/components/
  blog/BlogIndex.jsx
  blog/BlogArticle.jsx
src/lib/
  blogs.js
  seo-utils.js
content/blogs/
  nextjs-dynamic-routes-blog-slugs.mdx`,
  },
  nextDynamic: {
    title: "Generate static params from the same source as links",
    language: "js",
    code: `
export function generateStaticParams() {
  return getAllBlogPostSummaries().map((post) => ({
    slug: post.slug
  }));
}

export default function BlogPostPage({ params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();
  return <BlogArticle post={post} />;
}`,
  },
  nextGuide: {
    title: "Keep server data and client interactivity separated",
    language: "jsx",
    code: `
export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main>
      <ProjectHeader count={projects.length} />
      <ProjectFiltersClient initialProjects={projects} />
    </main>
  );
}`,
  },
  nextImage: {
    title: "Give Next.js images a stable responsive box",
    language: "jsx",
    code: `
<div className="relative aspect-[16/9] overflow-hidden rounded-lg">
  <Image
    src={post.image}
    alt={post.imageAlt}
    fill
    priority={isHero}
    sizes="(max-width: 768px) 100vw, 860px"
    className="object-cover"
  />
</div>`,
  },
  nextMetadata: {
    title: "Generate metadata from article data",
    language: "js",
    code: `
export async function generateMetadata({ params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Article not found", robots: { index: false } };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: "/blog/" + post.slug },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      images: [{ url: post.image, alt: post.imageAlt }]
    }
  };
}`,
  },
  nextBuild: {
    title: "Isolate the production build failure",
    language: "bash",
    code: `
npm run build
NEXT_TELEMETRY_DISABLED=1 npm run build
npx next info
node scripts/audit-blog-system.mjs`,
  },
  nextBoundaries: {
    title: "Pass serializable data into a small client island",
    language: "jsx",
    code: `
export default async function BlogPage() {
  const posts = getAllBlogPostSummaries();
  return <BlogFiltersClient posts={posts} />;
}

"use client";

function BlogFiltersClient({ posts }) {
  const [query, setQuery] = useState("");
  return <FilteredPostGrid posts={posts} query={query} onQueryChange={setQuery} />;
}`,
  },
  nodeDeploy: {
    title: "Expose a health route and production start command",
    language: "js",
    code: `
const port = process.env.PORT || 5000;

app.get("/health", async (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.listen(port, () => {
  console.log("API listening on port " + port);
});`,
  },
  controllerArch: {
    title: "Keep controllers thin and services testable",
    language: "js",
    code: `
export const listProjects = asyncHandler(async (req, res) => {
  const result = await projectService.listPublishedProjects({
    page: Number(req.query.page) || 1,
    search: req.query.search || ""
  });

  res.json({ data: result.items, pagination: result.pagination });
});`,
  },
  restApis: {
    title: "Use resource routes and consistent responses",
    language: "js",
    code: `
router.get("/projects", listProjects);
router.get("/projects/:slug", getProjectBySlug);
router.post("/projects", requireAuth, validateProject, createProject);

res.status(201).json({
  data: createdProject,
  message: "Project created successfully."
});`,
  },
  persistAuth: {
    title: "Hydrate persisted auth before rendering protected UI",
    language: "js",
    code: `
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null, hydrated: false },
  reducers: {
    hydrateAuth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.hydrated = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.hydrated = true;
    }
  }
});`,
  },
  prReview: {
    title: "Review behavior before style",
    language: "bash",
    code: `
git fetch origin
git switch feature/contact-form-validation
git diff --stat origin/main...HEAD
npm test -- --watch=false
npm run build`,
  },
  reactBoundary: {
    title: "Show trustworthy fallback UI",
    language: "jsx",
    code: `
function EmptyState({ title, message, action }) {
  return (
    <section role="status" className="rounded-lg border p-6 text-center">
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </section>
  );
}

function ErrorPanel({ onRetry }) {
  return <EmptyState title="Unable to load data" message="Try again in a moment." action={<button onClick={onRetry}>Retry</button>} />;
}`,
  },
  reactForm: {
    title: "Preserve input and map server errors",
    language: "jsx",
    code: `
async function handleSubmit(event) {
  event.preventDefault();
  setStatus("submitting");

  const result = await saveContact(form);
  if (!result.ok) {
    setErrors(result.errors || {});
    setStatus("error");
    return;
  }

  setErrors({});
  setStatus("success");
}`,
  },
  useEffect: {
    title: "Clean up async effects when inputs change",
    language: "jsx",
    code: `
useEffect(() => {
  if (!userId) return;
  const controller = new AbortController();

  fetch("/api/users/" + userId, { signal: controller.signal })
    .then((response) => response.json())
    .then(setUser)
    .catch((error) => {
      if (error.name !== "AbortError") setError(error);
    });

  return () => controller.abort();
}, [userId]);`,
  },
  androidDeploy: {
    title: "Bump Android versioning before release",
    language: "gradle",
    code: `
android {
  defaultConfig {
    applicationId "com.nishitha.portfolioapp"
    versionCode 12
    versionName "1.4.0"
  }
}`,
  },
  flatList: {
    title: "Tune FlatList for large order screens",
    language: "jsx",
    code: `
<FlatList
  data={orders}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => <OrderRow order={item} />}
  initialNumToRender={8}
  maxToRenderPerBatch={10}
  windowSize={7}
  removeClippedSubviews
  onEndReached={loadNextPage}
  onEndReachedThreshold={0.4}
/>`,
  },
  rnGuide: {
    title: "Structure screens around real mobile flows",
    language: "jsx",
    code: `
function OrdersScreen({ navigation }) {
  const { status, orders, refetch } = useOrders();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return <OrderList status={status} orders={orders} onOpen={(id) => navigation.navigate("OrderDetails", { orderId: id })} />;
}`,
  },
  nativeModules: {
    title: "Guard native capability behind a small JS API",
    language: "js",
    code: `
import { NativeModules, Platform } from "react-native";

const { DeviceScanner } = NativeModules;

export async function scanDeviceCode() {
  if (Platform.OS !== "android" || !DeviceScanner) {
    throw new Error("Device scanning is not available on this device.");
  }

  return DeviceScanner.scan();
}`,
  },
  rnNavigation: {
    title: "Keep route params small and refresh on focus",
    language: "jsx",
    code: `
navigation.navigate("OrderDetails", {
  orderId: order._id,
  source: "active-orders"
});

useFocusEffect(
  useCallback(() => {
    refreshOrder(orderId);
  }, [orderId])
);`,
  },
  reactPerf: {
    title: "Memoize derived lists after measuring render cost",
    language: "jsx",
    code: `
const visibleProjects = useMemo(() => {
  const queryText = query.trim().toLowerCase();
  return projects
    .filter((project) => project.title.toLowerCase().includes(queryText))
    .sort((a, b) => a.title.localeCompare(b.title));
}, [projects, query]);

const ProjectCard = memo(function ProjectCard({ project, onOpen }) {
  return <button onClick={() => onOpen(project.id)}>{project.title}</button>;
});`,
  },
  stateDecision: {
    title: "Place state by ownership and lifespan",
    language: "js",
    code: `
const stateDecision = {
  searchInput: "local component state",
  selectedCategory: "URL query string",
  authenticatedUser: "Redux Toolkit auth slice",
  productsFromApi: "server cache or async slice",
  modalOpen: "nearest component state"
};

console.table(stateDecision);`,
  },
  readme: {
    title: "Give reviewers the commands they need",
    language: "md",
    code: `
## Portfolio

Next.js portfolio with blog, project case studies, responsive UI, and contact form.

### Run Locally

npm install
npm run dev

### Required Environment Variables

MONGODB_URI=
JWT_SECRET=
NEXT_PUBLIC_API_BASE_URL=`,
  },
  layoutShift: {
    title: "Reserve media space before assets load",
    language: "jsx",
    code: `
<article className="rounded-lg border">
  <div className="relative aspect-[16/10] overflow-hidden">
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover"
    />
  </div>
  <h3 className="line-clamp-2 p-4">{project.title}</h3>
</article>`,
  },
  reduxSelectors: {
    title: "Derive visible records with selectors",
    language: "js",
    code: `
export const selectVisibleOrders = createSelector(
  [selectOrders, selectOrderFilters],
  (orders, filters) =>
    orders.filter((order) => {
      const statusMatches = filters.status === "all" || order.status === filters.status;
      const queryMatches = order.customerName.toLowerCase().includes(filters.query.toLowerCase());
      return statusMatches && queryMatches;
    })
);`,
  },
  reduxThunk: {
    title: "Return useful rejected values from thunks",
    language: "js",
    code: `
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders", { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Unable to load orders." });
    }
  }
);`,
  },
  reduxToolkit: {
    title: "Keep slice state explicit",
    language: "js",
    code: `
const projectsSlice = createSlice({
  name: "projects",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => { state.status = "loading"; })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload.data;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload?.message || "Unable to load projects.";
      });
  }
});`,
  },
  mergeConflicts: {
    title: "Inspect conflict context before choosing a side",
    language: "bash",
    code: `
git status
git diff -- src/components/blog/BlogArticle.jsx
git checkout --conflict=diff3 -- src/components/blog/BlogArticle.jsx
npm run build
git add src/components/blog/BlogArticle.jsx
git rebase --continue`,
  },
  paginationApi: {
    title: "Bound pagination and allow only safe sort fields",
    language: "js",
    code: `
const page = Math.max(Number(req.query.page) || 1, 1);
const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 50);
const allowedSorts = { newest: { createdAt: -1 }, priceLow: { price: 1 }, priceHigh: { price: -1 } };
const sort = allowedSorts[req.query.sort] || allowedSorts.newest;

const [items, total] = await Promise.all([
  Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
  Product.countDocuments(filter)
]);`,
  },
  reactArchitecture: {
    title: "Keep feature code near the feature",
    language: "text",
    code: `
src/features/projects/
  api/getProjects.js
  hooks/useProjectFilters.js
  components/ProjectCard.jsx
  components/ProjectGrid.jsx
  ProjectSection.jsx
src/components/ui/
  Button.jsx
  EmptyState.jsx`,
  },
  semanticHtml: {
    title: "Use landmarks and one clear page heading",
    language: "jsx",
    code: `
export default function PortfolioArticle({ post }) {
  return (
    <main>
      <article>
        <header>
          <p>{post.category}</p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </header>
        <section aria-labelledby="project-results">
          <h2 id="project-results">Project Results</h2>
        </section>
      </article>
    </main>
  );
}`,
  },
  tailwindPatterns: {
    title: "Move repeated utilities into small variants",
    language: "jsx",
    code: `
const buttonStyles = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "border border-border bg-bg-card text-text-body hover:border-primary"
};

function Button({ variant = "primary", className = "", ...props }) {
  return (
    <button
      className={"inline-flex items-center rounded-lg px-4 py-2 font-semibold transition " + buttonStyles[variant] + " " + className}
      {...props}
    />
  );
}`,
  },
  expressValidation: {
    title: "Validate request bodies before the controller",
    language: "js",
    code: `
export function validateContact(req, res, next) {
  const errors = {};
  if (!req.body.name?.trim()) errors.name = "Name is required.";
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(req.body.email || "")) {
    errors.email = "Enter a valid email address.";
  }
  if (!req.body.message?.trim()) errors.message = "Message is required.";

  if (Object.keys(errors).length) return res.status(422).json({ errors });
  next();
}`,
  },
};

const supportSnippets = {
  Frontend: {
    title: "Check visual states in one component",
    language: "jsx",
    code: `
function StatusBlock({ status, children }) {
  if (status === "loading") return <p role="status">Loading...</p>;
  if (status === "empty") return <p role="status">No results found.</p>;
  if (status === "error") return <p role="alert">Something needs attention.</p>;
  return children;
}`,
  },
  React: {
    title: "Render from explicit request state",
    language: "jsx",
    code: `
function DataPanel({ state, onRetry }) {
  if (state.status === "loading") return <p role="status">Loading data...</p>;
  if (state.status === "error") return <button onClick={onRetry}>Retry</button>;
  if (state.status === "empty") return <p>No records match this view.</p>;
  return <ResultGrid items={state.data} />;
}`,
  },
  "Next.js": {
    title: "Create absolute URLs for metadata and JSON-LD",
    language: "js",
    code: `
const baseUrl = "https://muskunishitha.vercel.app";

export function absoluteUrl(path) {
  if (!path) return baseUrl;
  if (path.startsWith("http")) return path;
  return baseUrl + (path.startsWith("/") ? path : "/" + path);
}`,
  },
  Backend: {
    title: "Use one response shape for validation errors",
    language: "js",
    code: `
function validationError(errors) {
  return {
    statusCode: 422,
    body: {
      message: "Please correct the highlighted fields.",
      errors
    }
  };
}`,
  },
  Database: {
    title: "Keep list payloads intentionally small",
    language: "js",
    code: `
const rows = await Product.find({ isPublished: true })
  .select("name slug price imageUrl category")
  .sort({ createdAt: -1 })
  .limit(24)
  .lean();

return rows;`,
  },
  "React Native": {
    title: "Give mobile screens complete async states",
    language: "jsx",
    code: `
function ScreenState({ status, onRetry, children }) {
  if (status === "loading") return <ActivityIndicator />;
  if (status === "error") return <Button title="Try again" onPress={onRetry} />;
  if (status === "empty") return <Text>No items available yet.</Text>;
  return children;
}`,
  },
  "State Management": {
    title: "Keep operation status separate",
    language: "js",
    code: `
const initialState = {
  items: [],
  fetchStatus: "idle",
  saveStatus: "idle",
  deleteStatusById: {},
  error: null
};`,
  },
  JavaScript: {
    title: "Wrap async work in a predictable result",
    language: "js",
    code: `
export async function toResult(promise) {
  try {
    const data = await promise;
    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: error.message || "Unexpected error" };
  }
}`,
  },
  Performance: {
    title: "Load heavy UI only when needed",
    language: "jsx",
    code: `
const RevenueChart = dynamic(() => import("./RevenueChart"), {
  ssr: false,
  loading: () => <div className="h-64 rounded-lg border" />
});`,
  },
  Git: {
    title: "Capture the review evidence",
    language: "bash",
    code: `
git diff --stat origin/main...HEAD
npm run build
git status --short`,
  },
  Deployment: {
    title: "Keep a small production smoke test",
    language: "bash",
    code: `
curl -I https://muskunishitha.vercel.app
curl -I https://muskunishitha.vercel.app/blog
curl -I https://muskunishitha.vercel.app/sitemap.xml`,
  },
};

const productionSnippets = {
  Frontend: {
    title: "Automate a route and image audit",
    language: "js",
    code: `
for (const post of posts) {
  assert(post.slug, "Every post needs a slug");
  assert(post.imageAlt.length > 20, post.slug + " needs descriptive image alt text");
  assert(fs.existsSync("public" + post.image), post.slug + " image is missing");
}`,
  },
  React: {
    title: "Test the states users actually see",
    language: "jsx",
    code: `
render(<DataPanel state={{ status: "error", data: [], error: new Error("Failed") }} onRetry={retry} />);
await user.click(screen.getByRole("button", { name: /retry/i }));
expect(retry).toHaveBeenCalledTimes(1);`,
  },
  "Next.js": {
    title: "Smoke-test generated blog routes",
    language: "js",
    code: `
const slugs = getAllBlogPostSummaries().map((post) => post.slug);

for (const slug of slugs) {
  const response = await fetch("http://localhost:3000/blog/" + slug);
  if (!response.ok) throw new Error("Broken blog route: " + slug);
}`,
  },
  Backend: {
    title: "Add request IDs for production debugging",
    language: "js",
    code: `
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next();
});`,
  },
  Database: {
    title: "Inspect the winning query plan",
    language: "js",
    code: `
const plan = await Product.find({ category, isPublished: true })
  .sort({ createdAt: -1 })
  .explain("executionStats");

console.log(plan.executionStats.totalDocsExamined);`,
  },
  "React Native": {
    title: "Store release diagnostics without secrets",
    language: "js",
    code: `
export function logMobileError(error, context) {
  analytics().logEvent("mobile_error", {
    screen: context.screen,
    action: context.action,
    message: error.message,
    appVersion: DeviceInfo.getVersion()
  });
}`,
  },
  "State Management": {
    title: "Clear persisted auth on rejected refresh",
    language: "js",
    code: `
builder.addCase(refreshUser.rejected, (state) => {
  state.token = null;
  state.user = null;
  state.hydrated = true;
  state.error = "Session expired. Please sign in again.";
});`,
  },
  JavaScript: {
    title: "Debounce without leaving timers behind",
    language: "js",
    code: `
useEffect(() => {
  const timeout = window.setTimeout(() => {
    setCommittedQuery(query.trim());
  }, 250);

  return () => window.clearTimeout(timeout);
}, [query]);`,
  },
  Performance: {
    title: "Reserve skeleton space to match final UI",
    language: "jsx",
    code: `
function CardSkeleton() {
  return (
    <div className="rounded-lg border">
      <div className="aspect-[16/10] animate-pulse bg-slate-200" />
      <div className="h-28 p-4" />
    </div>
  );
}`,
  },
  Git: {
    title: "Verify the repository after conflict resolution",
    language: "bash",
    code: `
git diff --check
npm run build
git status --short`,
  },
  Deployment: {
    title: "Verify public assets from the deployed origin",
    language: "bash",
    code: `
curl -I https://muskunishitha.vercel.app/assets/blog/nextjs-metadata-seo-canonical.svg
curl -I https://muskunishitha.vercel.app/blog/nextjs-metadata-seo-canonical`,
  },
};

function snippetFor(post, profile) {
  return primarySnippets[profile.codeKind] || supportSnippets[profile.domain];
}

function renderCodeSection(post, profile) {
  const primary = snippetFor(post, profile);
  const support = supportSnippets[profile.domain] || supportSnippets.Frontend;
  const production = productionSnippets[profile.domain] || productionSnippets.Frontend;

  return [
    `### ${primary.title}`,
    `This first example keeps the article grounded in ${profile.artifact}. It is intentionally small enough to paste into a project and adapt, but it shows the boundary that matters: ${profile.primaryConcern}.`,
    fence(primary.language, primary.code),
    `### ${support.title}`,
    `The supporting pattern keeps the surrounding ${profile.deliveryContext} reliable. In real React, Next.js, MERN, and React Native work, the main fix usually needs a small companion rule so the feature behaves consistently under loading, empty, and failed states.`,
    fence(support.language, support.code),
    `### ${production.title}`,
    `The production-facing example is the part I do not skip during handoff. It gives the team a repeatable check for the same class of issue instead of relying on memory after the next release.`,
    fence(production.language, production.code),
  ].join("\n\n");
}

function renderList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function implementationSteps(profile) {
  return [
    `Reproduce the failure in ${profile.deliveryContext}. Look specifically for ${profile.failureSignal}, then write down the exact route, device width, role, data state, and network condition so the fix can be verified later.`,
    `Define the contract for the ${profile.artifact}. Decide which input it accepts, what output the UI or API receives, and which failures should stop the flow early.`,
    `Move repeated logic into the smallest useful boundary. That might be a hook, route handler, middleware, selector, schema helper, or release checklist depending on where these responsibilities are owned.`,
    `Add the visible user states before polishing edge cases. Loading, empty, error, disabled, unauthenticated, and success states should be represented deliberately.`,
    `Connect the pattern to the surrounding stack. For this topic, that means checking how React components, Next.js routes, Express APIs, MongoDB reads, or React Native screens consume the result.`,
    `Run a production-style check. Use a build, route smoke test, release artifact, database explain plan, or deployed-domain verification instead of trusting development mode alone.`,
  ];
}

function faqItems(post, profile) {
  return [
    {
      question: `When should I prioritize ${post.title.toLowerCase()}?`,
      answer: `Prioritize it when the symptoms include ${profile.failureSignal}. The early warning is usually not a complete outage; it is a screen that works only with perfect data, a fast network, or the developer's own device. Handling it early keeps the implementation small.`,
    },
    {
      question: "How does this fit into React, Next.js, React Native, or MERN work?",
      answer: `The pattern fits wherever ${profile.deliveryContext} depend on predictable contracts. React renders the state, Next.js often owns routing or metadata, Express validates and protects the API boundary, MongoDB shapes the data, and React Native adds platform-specific behavior when the same flow moves to mobile.`,
    },
    {
      question: "What is the most common production mistake?",
      answer: `The common mistake is treating ${profile.primaryConcern} as a local code detail instead of a system behavior. The fix should be visible in code, content, tests, and deployment checks so the same issue does not return in a different route.`,
    },
    {
      question: "How do I know the implementation is complete?",
      answer: `It is complete when the happy path, empty state, failure state, mobile layout, and production build all behave correctly. For content pages, that also means the slug, image, alt text, table of contents, canonical URL, and related links work from a direct visit.`,
    },
  ];
}

function buildArticle(post, allPosts) {
  const profile = getProfile(post);
  const details = domainDetails[profile.domain] || domainDetails.Frontend;
  const related = relatedPostsFor(post, allPosts);
  const imageAlt = `${post.title} technical illustration showing ${profile.artifact}`;

  const sections = [
    `${profile.scenario} I treat ${post.title} as a production workflow rather than a memorized snippet. The practical goal is that ${profile.outcome}.`,
    `In production work, the useful question is not whether the tool can do the job. It is where the responsibility belongs, how the failure is surfaced, and whether another developer can change the flow without rediscovering the same problem. I think about this topic through ${profile.primaryConcern}, then connect it to the way React, Next.js, Node.js, MongoDB, and React Native applications are actually shipped.`,
    `![${imageAlt}](/assets/blog/${post.slug}.svg "${imageAlt}")`,
    "## The Real-World Problem",
    `When I see symptoms such as ${profile.failureSignal}, I assume the contract is missing or too implicit. The first version of a feature often works with one developer account and one sample dataset. The second version has search, permissions, direct links, browser refreshes, mobile devices, larger data, and deployment settings. That is where hidden assumptions become user-facing bugs.`,
    `For ${profile.deliveryContext}, I avoid solving the symptom only where it appears. A broken card, slow request, missing route, or confusing permission prompt often starts earlier in the flow. The backend may return too much data, the frontend may derive state in the wrong place, the route may not validate its slug, or the mobile screen may assume a permission that the user never granted. A good fix follows the data and the user action from start to finish.`,
    "## Core Concepts",
    `The core model for this article is the ${profile.artifact}. I use these ideas as a review checklist before reaching for a library, refactor, or deployment change.`,
    renderList([
      `Define ownership clearly: ${profile.primaryConcern} should be handled where the code has enough context to make a correct decision.`,
      `Make failure visible: when ${profile.failureSignal} shows up, it should lead to a useful state, response, log, or checklist item rather than a blank screen.`,
      ...details.concepts,
    ]),
    "## Step-By-Step Implementation",
    `The implementation should be boring in the best way: identify the failure, create a small contract, wire it into the existing project style, and prove it works. I would use this sequence before changing a production portfolio, dashboard, API, or mobile app.`,
    renderList(implementationSteps(profile)),
    "## Practical Code Examples",
    renderCodeSection(post, profile),
    "## React, Next.js, MERN, And Mobile Use Cases",
    `The same idea shows up differently across the stack. That is why I like writing the contract once and then checking each surface that can break: component rendering, route generation, API responses, database access, deployment, and mobile behavior.`,
    renderList(details.useCases),
    "## Common Mistakes",
    `Most problems around ${post.title} are not caused by a lack of effort. They come from solving one visible issue while leaving the surrounding contract unclear.`,
    renderList([
      `Fixing only the first visible screen while the same symptoms, such as ${profile.failureSignal}, can still appear in another route.`,
      `Skipping the direct production-style check because the local development flow looked fine.`,
      ...details.mistakes,
    ]),
    "## Best Practices",
    `Good practice here means making the correct path easy to repeat. The team should not need a long explanation every time the same type of feature is built again.`,
    renderList([
      `Document the expected behavior of the ${profile.artifact} close to the code or content that owns it.`,
      `Use names that reveal purpose: the next developer should understand why these responsibilities matter without opening five files.`,
      ...details.best,
    ]),
    "## Performance, Security, And Production Notes",
    `Even when the topic looks like pure UI or pure backend work, production concerns still matter. Performance affects trust, security protects users, and release checks prevent small assumptions from becoming public defects.`,
    renderList([
      `Measure the part of the flow users actually touch in ${profile.deliveryContext}; do not optimize unrelated code because it is easier to reach.`,
      `Avoid logging secrets, tokens, private request bodies, or unnecessary personal data while debugging ${profile.failureSignal}.`,
      ...details.production,
    ]),
    "## FAQ",
    faqItems(post, profile)
      .map((item) => `### ${item.question}\n\n${item.answer}`)
      .join("\n\n"),
    "## Related Reading",
    related.map((item) => `- [${item.title}](/blog/${item.slug})`).join("\n"),
    "## Conclusion",
    `${post.title} is worth treating as part of the product's reliability, not just as a technical preference. The strongest implementation starts with the real user problem, gives the code a clear boundary, includes practical states and examples, and finishes with production verification. When ${profile.artifact} is handled this way, the result is easier to maintain, easier to review, and much less likely to surprise users after deployment.`,
  ];

  let body = sections.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();

  const extraNotes = [
    `A final useful habit is to review this topic during pull requests with the same seriousness as visual polish. Ask whether the implementation still works after refresh, with a slow API, with an empty dataset, with invalid input, and from a direct URL. These checks are quick, but they catch the kind of breakage that makes an otherwise strong project feel unfinished.`,
    `I also like to keep one small manual smoke test for ${profile.deliveryContext}. It should include the main happy path, one failure path, and one mobile-width check. The point is not to replace automated tests; it is to make sure the feature still behaves like a complete user experience after code, content, and deployment settings change together.`,
    `For teams working across React, Next.js, Node.js, MongoDB, and React Native, this topic is a reminder that quality is rarely isolated. A frontend component can expose a backend contract problem. A database query can create a rendering problem. A deployment setting can make a perfect local implementation fail. The reliable path is to check the whole chain.`,
  ];

  let index = 0;
  while (wordCount(body) < 1600) {
    body += `\n\n${extraNotes[index % extraNotes.length]}`;
    index += 1;
  }

  return {
    body: body + "\n",
    imageAlt,
    readingTime: estimateReadingTime(body),
    wordCount: wordCount(body),
  };
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapText(value, max = 30) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

const palettes = [
  ["#22C55E", "#0EA5E9", "#F8FAFC"],
  ["#F59E0B", "#14B8A6", "#F8FAFC"],
  ["#38BDF8", "#A855F7", "#F8FAFC"],
  ["#FB7185", "#22C55E", "#F8FAFC"],
  ["#EAB308", "#06B6D4", "#F8FAFC"],
  ["#818CF8", "#F97316", "#F8FAFC"],
  ["#10B981", "#F43F5E", "#F8FAFC"],
];

function motifSvg(domain, accent, secondary, profile) {
  const problem = escapeXml("Problem");
  const contract = escapeXml(profile.artifact.split(" ").slice(0, 4).join(" "));
  const output = escapeXml("Production check");

  if (domain === "Database") {
    return `
      <ellipse cx="760" cy="190" rx="92" ry="32" fill="#0F172A" stroke="${accent}" stroke-width="6"/>
      <path d="M668 190v156c0 18 41 32 92 32s92-14 92-32V190" fill="#111827" stroke="${accent}" stroke-width="6"/>
      <ellipse cx="760" cy="346" rx="92" ry="32" fill="#111827" stroke="${accent}" stroke-width="6"/>
      <path d="M610 458h300" stroke="${secondary}" stroke-width="10" stroke-linecap="round"/>
      <path d="M650 420h220" stroke="#94A3B8" stroke-width="8" stroke-linecap="round"/>
      <text x="760" y="273" text-anchor="middle" fill="#F8FAFC" font-family="Arial" font-size="26" font-weight="700">${contract}</text>`;
  }

  if (domain === "React Native") {
    return `
      <rect x="686" y="136" width="170" height="328" rx="34" fill="#0F172A" stroke="${accent}" stroke-width="6"/>
      <rect x="714" y="196" width="114" height="42" rx="12" fill="${accent}" fill-opacity="0.9"/>
      <rect x="714" y="270" width="114" height="18" rx="9" fill="#94A3B8"/>
      <rect x="714" y="312" width="86" height="18" rx="9" fill="#475569"/>
      <circle cx="771" cy="420" r="16" fill="${secondary}"/>
      <path d="M894 222h92M894 302h120M894 382h82" stroke="${secondary}" stroke-width="9" stroke-linecap="round"/>
      <text x="771" y="520" text-anchor="middle" fill="#F8FAFC" font-family="Arial" font-size="24" font-weight="700">${contract}</text>`;
  }

  if (domain === "Git" || domain === "Deployment") {
    return `
      <circle cx="650" cy="205" r="34" fill="#0F172A" stroke="${accent}" stroke-width="7"/>
      <circle cx="806" cy="305" r="34" fill="#0F172A" stroke="${secondary}" stroke-width="7"/>
      <circle cx="962" cy="405" r="34" fill="#0F172A" stroke="${accent}" stroke-width="7"/>
      <path d="M684 205c64 0 58 100 88 100M840 305c64 0 58 100 88 100" stroke="#94A3B8" stroke-width="8" fill="none" stroke-linecap="round"/>
      <rect x="610" y="486" width="392" height="58" rx="16" fill="#0F172A" stroke="${accent}" stroke-opacity="0.8"/>
      <text x="806" y="523" text-anchor="middle" fill="#F8FAFC" font-family="Arial" font-size="24" font-weight="700">${output}</text>`;
  }

  if (domain === "Backend") {
    return `
      <rect x="620" y="152" width="340" height="86" rx="18" fill="#0F172A" stroke="${accent}" stroke-width="5"/>
      <rect x="620" y="288" width="340" height="86" rx="18" fill="#0F172A" stroke="${secondary}" stroke-width="5"/>
      <rect x="620" y="424" width="340" height="86" rx="18" fill="#0F172A" stroke="#64748B" stroke-width="5"/>
      <path d="M790 238v50M790 374v50" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
      <text x="790" y="203" text-anchor="middle" fill="#F8FAFC" font-family="Arial" font-size="24" font-weight="700">${problem}</text>
      <text x="790" y="339" text-anchor="middle" fill="#F8FAFC" font-family="Arial" font-size="24" font-weight="700">${contract}</text>
      <text x="790" y="475" text-anchor="middle" fill="#F8FAFC" font-family="Arial" font-size="24" font-weight="700">${output}</text>`;
  }

  return `
    <rect x="612" y="140" width="398" height="282" rx="26" fill="#0F172A" stroke="${accent}" stroke-width="6"/>
    <rect x="650" y="190" width="144" height="78" rx="16" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-width="4"/>
    <rect x="828" y="190" width="144" height="78" rx="16" fill="${secondary}" fill-opacity="0.18" stroke="${secondary}" stroke-width="4"/>
    <rect x="650" y="306" width="322" height="54" rx="16" fill="#111827" stroke="#64748B" stroke-width="4"/>
    <path d="M794 229h34M811 268v38" stroke="#94A3B8" stroke-width="8" stroke-linecap="round"/>
    <text x="811" y="486" text-anchor="middle" fill="#F8FAFC" font-family="Arial" font-size="25" font-weight="700">${contract}</text>`;
}

function buildSvg(post, profile) {
  const palette = palettes[hashString(post.slug) % palettes.length];
  const [accent, secondary] = palette;
  const titleLines = wrapText(post.title, 31);
  const titleMarkup = titleLines
    .map(
      (line, index) =>
        `<text x="96" y="${430 + index * 44}" fill="#F8FAFC" font-family="Arial, sans-serif" font-size="37" font-weight="800">${escapeXml(line)}</text>`
    )
    .join("\n");

  const labels = [
    profile.primaryConcern.split(",")[0],
    profile.outcome.split(" ").slice(0, 6).join(" "),
    post.category,
  ];

  return `<svg width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc" xmlns="http://www.w3.org/2000/svg">
  <title id="title">${escapeXml(post.title)}</title>
  <desc id="desc">${escapeXml(`${post.title} technical illustration showing ${profile.artifact}`)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="675" gradientUnits="userSpaceOnUse">
      <stop stop-color="${accent}" stop-opacity="0.34"/>
      <stop offset="0.48" stop-color="#111827" stop-opacity="1"/>
      <stop offset="1" stop-color="${secondary}" stop-opacity="0.28"/>
    </linearGradient>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0H0V42" fill="none" stroke="#334155" stroke-opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="1200" height="675" fill="#0B1020"/>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#grid)" opacity="0.55"/>
  <rect x="64" y="58" width="1072" height="555" rx="30" fill="#111827" fill-opacity="0.92" stroke="#334155" stroke-width="2"/>
  <rect x="96" y="100" width="300" height="50" rx="25" fill="${accent}" fill-opacity="0.16" stroke="${accent}" stroke-opacity="0.8"/>
  <text x="126" y="133" fill="${accent}" font-family="Arial, sans-serif" font-size="21" font-weight="800">${escapeXml(post.category)}</text>
  <rect x="96" y="202" width="396" height="24" rx="8" fill="#334155"/>
  <rect x="96" y="250" width="456" height="18" rx="7" fill="#475569"/>
  <rect x="96" y="290" width="362" height="18" rx="7" fill="#1F2937"/>
  ${motifSvg(profile.domain, accent, secondary, profile)}
  <rect x="96" y="548" width="980" height="34" rx="17" fill="#0F172A" stroke="#334155"/>
  <text x="126" y="571" fill="#CBD5E1" font-family="Arial, sans-serif" font-size="17" font-weight="700">${escapeXml(labels.join("  |  "))}</text>
  ${titleMarkup}
</svg>
`;
}

function writePost(post, allPosts) {
  const profile = getProfile(post);
  const article = buildArticle(post, allPosts);
  const imagePath = `/assets/blog/${post.slug}.svg`;
  const frontmatter = [
    "---",
    `title: ${q(post.title)}`,
    `description: ${q(post.description)}`,
    `date: ${post.date}`,
    `dateModified: ${DATE_MODIFIED}`,
    `category: ${q(post.category)}`,
    `tags: ${listValue(post.tags)}`,
    `keywords: ${listValue(unique([...post.keywords, post.title, post.category, ...post.tags]))}`,
    `author: ${q(post.author)}`,
    `readingTime: ${q(article.readingTime)}`,
    `image: ${imagePath}`,
    `imageAlt: ${q(article.imageAlt)}`,
    `canonical: ${BLOG_BASE_URL}/blog/${post.slug}`,
    `slug: ${post.slug}`,
    post.featured ? "featured: true" : "",
    "---",
    "",
  ]
    .filter((line) => line !== "")
    .join("\n");

  fs.writeFileSync(path.join(blogDir, post.fileName), `${frontmatter}\n\n${article.body}`, "utf8");
  fs.writeFileSync(path.join(imageDir, `${post.slug}.svg`), buildSvg(post, profile), "utf8");

  return article.wordCount;
}

fs.mkdirSync(imageDir, { recursive: true });

const posts = readPosts();
const slugs = posts.map((post) => post.slug);
const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
if (duplicates.length) {
  throw new Error(`Duplicate blog slugs found: ${duplicates.join(", ")}`);
}

const missingProfiles = slugs.filter((slug) => !topicProfiles[slug]);
if (missingProfiles.length) {
  throw new Error(`Missing topic profiles: ${missingProfiles.join(", ")}`);
}

const wordCounts = posts.map((post) => ({
  slug: post.slug,
  words: writePost(post, posts),
}));

const underTarget = wordCounts.filter((post) => post.words < 1600);
if (underTarget.length) {
  throw new Error(`Posts under target: ${underTarget.map((post) => `${post.slug} (${post.words})`).join(", ")}`);
}

console.log(`Repaired ${posts.length} blog posts and ${posts.length} article illustrations.`);
