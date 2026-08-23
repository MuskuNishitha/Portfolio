# Backend Migration

The original Node.js and Express backend is now integrated into this Next.js application. The original Mongoose models, controllers, and authentication middleware are retained under `src/models`, `src/controllers`, and `src/middlewares`. The API surface is exposed through native App Router handlers.

## Route surface

| Original Express mount | Next.js endpoint | Methods |
|---|---|---|
| `/api/v1/contacts` | `/api/v1/contacts` | `GET`, `POST` |
| `/api/v1/works` | `/api/v1/works`, `/api/v1/works/:id`, `/api/v1/works/category/:category`, `/api/v1/works/search/:query`, `/api/v1/works/categories/all`, `/api/v1/works/tech-stacks/all` | Original methods preserved |
| `/api/v1/skills` | `/api/v1/skills`, `/api/v1/skills/:id`, `/api/v1/skills/category/:categoryName`, `/api/v1/skills/categories/list`, and nested skill endpoints | Original methods preserved |
| `/api/v1/profiles` | `/api/v1/profiles`, `/api/v1/profiles/:id`, `/api/v1/profiles/main`, `/api/v1/profiles/profile`, `/api/v1/profiles/search`, `/api/v1/profiles/stats` | Original methods preserved |
| `/api/v1/experiences` | `/api/v1/experiences`, `/api/v1/experiences/:id`, `/api/v1/experiences/current`, `/api/v1/experiences/type/:type` | Original methods preserved |
| `/api/v1/admin` | `/api/v1/admin`, `/api/v1/admin/:id`, `/api/v1/admin/register`, `/api/v1/admin/login`, `/api/v1/admin/profile`, `/api/v1/admin/change-password` | Original methods and protected profile middleware preserved |
| `/api/v1/optimize` plus its `/optimize` router path | `/api/v1/optimize/optimize` and compatibility alias `/api/v1/optimize` | `POST` |
| Legacy hire-me handler | `/api/hireme` | `POST`; unsupported methods return `405` |

## Environment

Create `.env.local` from `.env.example`. The database helper supports both the original `DB_URI` variable and the more conventional `MONGODB_URI`. Set `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, and `GEMINI_API_KEY` when using their associated functionality. No Cloudinary integration was present in either uploaded project, so no Cloudinary behavior was removed or replaced.

## Verification

The project compiles successfully with `pnpm run build`. The resulting build includes the dynamic `/api/v1/[...path]` handler and `/api/hireme` route alongside the existing portfolio pages.
