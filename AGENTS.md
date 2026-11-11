<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hireloop

Full-stack recruitment and job portal application consisting of two independent npm and Git repositories. There is no root manifest or workspace — install, run, and manage each app from its own directory with npm (both contain `package-lock.json`).

- `hireloop-frontend/` — Next.js 16.4.5 App Router (`src/app`), React 19, Tailwind CSS v4, shadcn/ui, TypeScript, better-auth. Connected to GitHub & GitLab remotes.
- `hireloop-backend/` — Express 5 API with MongoDB native driver connection and ES modules (`"type": "module"`). Connected to GitHub & GitLab remotes.

---

## Critical Agent Rules

1. **NEVER read files inside `node_modules/` in both frontend and backend (`hireloop-frontend/node_modules/` and `hireloop-backend/node_modules/`).** Under no circumstances should any tool read, list, or inspect files within `node_modules`.
2. **Mandatory Responsive Design:** All UI designs and components MUST be fully responsive (mobile, tablet, desktop) without needing explicit reminders from the user. Use fluid layouts, flexible grids, collapsible sidebars/filters, and card fallbacks for tables on smaller screens.
3. **Next.js 16 Suspense Boundaries:** In Next.js 16 with `cacheComponents` and `partialPrefetching`, any component accessing runtime URL or client navigation state (`usePathname()`, `useSearchParams()`, dynamic route `params` via `React.use(params)`) MUST be wrapped in a `<Suspense>` boundary to prevent prerender build errors.
4. **No `export const dynamic = "force-dynamic"`:** In Next.js 16 with `cacheComponents`, route segment config `"dynamic"` is incompatible. Use `{ cache: "no-store" }` directly inside `fetch` requests instead.
5. **React 19 State In Effect:** Do not call `setState` synchronously within `useEffect` when data can be derived during render (violates `react-hooks/set-state-in-effect`).
6. **Git Push Remote Configuration:** Both `hireloop-frontend` and `hireloop-backend` have multiple push URLs on `origin` (GitHub and GitLab). Pushing requires network access (`BypassSandbox: true` if sandboxed push fails).

---

## Project Architecture & Recent Implementations

### Backend (`hireloop-backend/`)
- **Technology:** Node.js, Express 5, MongoDB native driver, dotenv, cors, ES modules (`"type": "module"`).
- **Database:** MongoDB connected via `MONGODB_URI` (`hireloop` database). Collections: `jobs`, `users`, `applications`.
- **API Endpoints:**
  - `GET /` — Service health check.
  - `GET /jobs` — Returns jobs with support for search query `q` (regex text search on title, company, location, category, responsibilities, qualifications), single-select `type`, `category`, `salaryRange` / `minSalary` / `maxSalary`, `sort` ("Highest Salary", "Full-time First", "Most Recent"), and pagination (`page`, `limit`). Enriches response with `total`, `typeCounts`, and `categoryCounts` via MongoDB `$group` aggregation, while maintaining backward-compatible plain array response when no query parameters are provided.
  - `GET /jobs/:id` — Fetches a single job post by MongoDB `ObjectId`.
  - `POST /new` — Creates a new job posting with recruiter validation.
  - `PUT /jobs/:id` — Updates existing job details (`title`, `companyName`, `category`, `jobType`, `isRemote`, `location`, `deadline`, `minSalary`, `maxSalary`, `frequency`, `responsibilities`, `qualifications`, `updatedAt`).
  - `DELETE /jobs/:id` — Deletes a job document by `ObjectId`.
  - `POST /applications` — Inserts job applications into MongoDB `applications` collection with validation.
  - `GET /applications` — Fetches applications with optional filtering by `email` (case-insensitive regex) and `jobId`, sorted by `appliedAt: -1, _id: -1`.
  - `POST /users` — Inserts or updates user records in MongoDB.
  - `GET /users` — Retrieves user lists.

### Frontend (`hireloop-frontend/`)
- **Technology:** Next.js 16.4.5 (App Router), React 19, Tailwind CSS v4 (`@theme inline` in `src/app/globals.css`), shadcn/ui (`base-nova` style, Lucide icons), better-auth.
- **Path Alias:** `@/*` maps to `src/*`.
- **Centralized TypeScript Types (`src/types/`):**
  - `src/types/job.ts`: Job postings, responses, categories, filter payloads, and view models (`JobDocument`, `JobPost`, `JobItem`, `JobDetails`, `BrowseJobsResponse`).
  - `src/types/auth.ts`: Authentication, user roles (`UserRole`, `DashboardRole`, `DashboardMenuItem`).
  - `src/types/application.ts`: Seeker application models (`ApplicationStatus`, `ApplicationIconType`, `JobApplicationPayload`, `JobApplicationResponse`, `JobApplicationDocument`, `ApplicationItem`, `ApplicationMetrics`).
  - `src/types/index.ts`: Central barrel export for all types across the application.
- **Authentication:**
  - Config: Server at `src/lib/auth.ts`, client at `src/lib/auth-client.ts`, handler at `src/app/api/auth/[...all]/route.ts`.
  - `/sign-in` (`src/app/(public)/(auth)/sign-in/page.tsx`): Clean sign-in page without redundant top toggle or role selector. Authenticates directly via email/password or Google OAuth.
  - `/sign-up` (`src/app/(public)/(auth)/sign-up/page.tsx`): Clean registration page without redundant top toggle; includes role selection (Job Seeker, Recruiter, Admin) during account creation.
  - Layout & Shell: `<AuthShell>` provides frosted-glass container with ambient background glow.
- **Recruiter Job Management:**
  - `/dashboard/recruiter/jobs`: Full-featured recruiter management dashboard. Responsive table for desktop and responsive cards for mobile. Shows status, candidate count, compensation, deadline, and action buttons.
  - **View Action:** Navigates directly to the public job details page (`/browse-jobs/[id]`).
  - **Edit Action:** Navigates to `/dashboard/recruiter/jobs/edit?id=[id]`.
  - **Delete Action:** `DeleteJobDialog` component with optimistic state removal, backend `DELETE /jobs/:id` execution, toast feedback, and server refresh.
- **Job Edit Workflow:**
  - `/dashboard/recruiter/jobs/edit`: Dedicated edit page with pre-populated input fields, full responsiveness, validation, and save/cancel actions. Wrapped in `<Suspense>`.
  - `/dashboard/recruiter/jobs/edit/[id]`: Dynamic route wrapper for path-based edit URLs.
  - Actions & API: `src/lib/actions/jobs.ts` (`updateJob`), `src/lib/api/jobs.ts` (`getJobById`, `JobDocument` type definitions).
- **Public Job Browsing & Details:**
  - `/browse-jobs` (`src/app/(public)/browse-jobs/page.tsx`): Responsive browse jobs page synchronized with URL search params (`useSearchParams`, `useRouter`, `usePathname`). Features ~300ms debounced search (`?q=...`), single-select radio button filters for Job Type (`?type=...`), Industry / Category (`?category=...`), and Salary Range (`?salary=...`), dynamic total found job count and filter category/type counts fetched from backend, sorting dropdown (`?sort=...`), and URL-synced pagination (`?page=...`). Wrapped in `<Suspense>`.
  - `/browse-jobs/[id]` (`src/app/(public)/browse-jobs/[id]/page.tsx`): Job details page cloned from design specifications. Modularized using reusable components in `src/components/jobs/details/` (`JobHeader`, `JobQuickInfo`, `JobCompanyOverview`, `JobApplyModal`, `JobDetailsSkeleton`, `JobNotFound`, `constants`). Includes role header, verified badge, stats grid, responsibilities list, requirements badge cluster, benefits grid, and company card with application modal. Wrapped in `<Suspense>`.
  - Next.js permanent redirects configured in `next.config.ts` from legacy `/jobs` and `/jobs/:id` to `/browse-jobs` and `/browse-jobs/:id`.
- **Seeker Application Management:**
  - `/dashboard/seeker/applications` (`src/app/(dashboard)/dashboard/seeker/applications/page.tsx`): Full-featured Seeker Application Management dashboard cloned from design specs and connected to real backend applications (`GET /applications`). Modularized using reusable components in `src/components/seeker/applications/`:
    - `JobRoleIcon.tsx` — Role category icon renderer (`code`, `design`, `data`, `cloud`, `ai`, `general`).
    - `StatusBadge.tsx` — Status pills (`Applied`, `Review`, `Shortlisted`, `Rejected`, `Offered`).
    - `ApplicationStatCards.tsx` — Dynamic metrics computed from real database data (`Total Applied`, `Shortlisted`, `Interviews`, `Success Rate`).
    - `ApplicationToolbar.tsx` — Live search input, Active/Archived segmented pill toggle, and Export PDF button.
    - `ApplicationTable.tsx` — Desktop table and mobile responsive card views with empty states and loading skeletons.
    - `ApplicationPagination.tsx` — Accessible page navigation.
    - `ApplicationDetailModal.tsx` — Modal popup showing complete submission details and job link.
- **Shared Layouts & Navigation:**
  - Public Navbar (`src/components/shared/Navbar.tsx`) and Dashboard Sidebar (`src/components/shared/DashboardSidebar.tsx`) wrapped in `<Suspense>` to eliminate Next.js 16 runtime prerender errors.

---

## Commands Reference

### Frontend Commands (run in `hireloop-frontend/`)
- `npm run dev` — Next.js dev server on port 3000
- `npm run build` — Production build
- `npm run lint` — Flat config ESLint (`eslint.config.mjs`)
- `npx tsc --noEmit` — TypeScript compiler verification
- `git add <files>` & `git commit -m "..."` — Commit frontend changes
- `git push origin master` — Push to both GitHub & GitLab (requires network access)

### Backend Commands (run in `hireloop-backend/`)
- `node index.js` or `npx nodemon index.js` — Run Express server
- `node --check index.js` — Syntax validation check
- `git add <files>` & `git commit -m "..."` — Commit backend changes
- `git push origin master` — Push to both GitHub & GitLab (requires network access)

---

## Gotchas & Notes
- `next dev` auto-writes the Next.js notice block into `hireloop-frontend/AGENTS.md`. Keep the block intact in both locations; repo root `AGENTS.md` is the canonical instruction file.
- Verify frontend changes with `npm run lint` and `npx tsc --noEmit` before committing.
- Verify backend syntax with `node --check index.js` before committing.
