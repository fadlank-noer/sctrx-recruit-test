# Order Toolbar Component

## Overview
The `OrderToolbar` component (`components/dashboard/order-toolbar.tsx`) combines status tabs and search into a single unified toolbar, replacing the previous separate `StatusTabs` + inline search bar setup.

## Architecture
- **Status tabs** with badge counts (All, Pending, Paid, Cancelled) — counts come from `getOrderStats()` passed via `counts` prop
- **Search input** — filters by customer name, order number, order name, and email (defined in `features/orders/queries.ts`)
- Both controls update URL search params (`?status=`, `?search=`) and trigger server-side re-renders via Next.js App Router

## Key Libraries
- `@/components/ui/tabs` — shadcn/ui Tabs/TabsList/TabsTrigger
- `@/components/ui/input` — shadcn/ui Input
- `@/components/ui/badge` — shadcn/ui Badge (secondary variant for count badges)
- `lucide-react` — Search icon

## Data Flow
1. `app/(dashboard)/page.tsx` (server) fetches stats via `getOrderStats()`
2. Stats are passed as `counts` to `OrderToolbar` (client component)
3. Tab changes and search input update URL params
4. Page re-renders server-side with new params, fetching filtered data

## Removed Components
- `components/dashboard/status-tabs.tsx` — replaced by OrderToolbar (file still exists but unused)
