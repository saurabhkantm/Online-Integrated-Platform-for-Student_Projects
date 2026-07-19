<<<<<<< HEAD
# CampusRepo — Student & Faculty Project Repository Dashboard

A responsive React.js + Tailwind CSS dashboard for an online student project
repository platform, with separate Student and Faculty experiences, built
entirely on mock data (no backend required).

## Tech stack

- React 18 (functional components + hooks only)
- React Router v6 (nested routes + a shared dashboard layout)
- Tailwind CSS v3 (custom "ledger" navy + gold design system)
- Recharts (analytics charts on the faculty dashboard)
- lucide-react (icons)
- Vite (build tooling)

## Getting started

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

There is no backend — all data lives in `src/data/mockData.js` and is held in
React Context (`src/context/AppContext.jsx`) for the session, so submitting a
project or reviewing one updates the UI immediately.

Use the **Student / Faculty** switch in the top navbar to flip between the two
dashboards without logging in separately — this is a demo convenience so both
experiences are reachable from one running app.

## Folder structure

```
src/
├── main.jsx                     # App entry, wraps App in BrowserRouter
├── App.jsx                      # Route definitions (student/faculty)
├── index.css                    # Tailwind directives + base styles
├── context/
│   └── AppContext.jsx           # Role state, mock project/notification CRUD
├── data/
│   └── mockData.js              # All mock projects, users, charts, lookups
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.jsx  # Sidebar + Navbar + routed <Outlet/>
│   │   ├── Sidebar.jsx          # Responsive role-aware navigation
│   │   └── Navbar.jsx           # Topbar: menu toggle, role switch, profile
│   └── common/
│       ├── StatCard.jsx         # Reusable dashboard stat tile
│       ├── StatusBadge.jsx      # Approved / Pending / Rejected / Changes pill
│       ├── SearchFilterBar.jsx  # Search input + dropdown filters
│       ├── ProjectDetailModal.jsx
│       ├── SimilarityGauge.jsx  # Circular plagiarism-score gauge (signature UI)
│       ├── Modal.jsx            # Base modal/dialog primitive
│       └── EmptyState.jsx       # Empty-list placeholder
└── pages/
    ├── student/
    │   ├── StudentDashboard.jsx # Stats + quick actions + recent submissions
    │   ├── SubmitProject.jsx    # Full submission form incl. PDF upload
    │   ├── MyProjects.jsx       # Status table with view/feedback action
    │   ├── BrowseProjects.jsx   # Repository search with 4 filters
    │   └── Notifications.jsx    # Notification inbox
    └── faculty/
        ├── FacultyDashboard.jsx # Stats + 3 charts (bar, pie, horizontal bar)
        ├── ReviewProjects.jsx   # Approve / Reject / Request changes + remarks
        └── Plagiarism.jsx       # Similarity gauges + flagged projects + matches
```

## Routes

| Path                       | Page                                |
| --------------------------- | ------------------------------------ |
| `/student/dashboard`        | Student stats & quick actions        |
| `/student/submit`           | Submit Project form                  |
| `/student/my-projects`      | My Projects table                    |
| `/student/browse`           | Browse / Search Projects             |
| `/student/notifications`    | Notifications                        |
| `/faculty/dashboard`        | Faculty analytics & charts           |
| `/faculty/review`           | Review submitted projects            |
| `/faculty/plagiarism`       | Plagiarism detection report          |

## Notes

- All data is mock data defined in `src/data/mockData.js`; submitting a
  project or reviewing one only updates in-memory state and resets on reload.
- The PDF "upload" reads the selected file's name only — no file is stored or
  parsed, since this is a frontend-only demo.
- Fully responsive: the sidebar collapses into a slide-in drawer below the
  `lg` breakpoint, and all tables/grids reflow for mobile.
=======
# Campus-Repo
>>>>>>> fcd0ee3af6d655c49ea953ee3176ea0dda0ea226
