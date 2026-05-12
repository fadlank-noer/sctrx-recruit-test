# Mini Order App

## ERD / Schema


## Prompt Used
```md
1. Build a modern SaaS order management dashboard using Next.js App Router, TypeScript, TailwindCSS, shadcn/ui, TanStack Table, and Prisma + SQLite with clean minimalist design, responsive sidebar layout, stats cards, order table with pagination/search/filter, status transition business rules (Pending → Paid/Cancelled, immutable terminal states), audit logging, 30-seed dummy data, loading skeletons, and feature-based folder structure.
2. Fix the Pay and Cancel action buttons on pending orders — server action signature was using the `useActionState` two-parameter pattern but was called directly; simplified to a single-argument `FormData` signature so the form actions correctly update the database.
3. Remove unused navigation items from the sidebar, keeping only the Dashboard link.
4. Replace the sidebar logo text with theme-aware PNG images (dark/light variants) that switch based on the active theme.
5. Replace the `next-themes` theme toggle with a Zustand-powered theme store for state management.
```

## Token Used

Total tokens used: **6,889,589** (1,218,992 + 5,670,597)