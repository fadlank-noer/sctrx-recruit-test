# Sidebar — Flush Active State

Custom sidebar with a flush active state pattern where the active menu item's
background sits flush against the sidebar's right border, with an accent line.

## Pattern

The active nav item uses:
- `rounded-l-lg rounded-r-none` — only left corners rounded, right edge flush against sidebar border
- `border-r-2 border-red-600 dark:border-red-500` — red accent line on the right edge
- `bg-red-50 dark:bg-red-950/30` — subtle red background (light/dark)
- `text-red-700 dark:text-red-400 font-semibold` — red text, bold

Inactive items use:
- `text-muted-foreground hover:bg-accent hover:text-accent-foreground`
- `rounded-lg` — fully rounded (default)

## Colors (Sociotrax palette)

The active state reds align with the `#FF0000` primary accent from CLAUDE.md.
Tailwind `red-600` / `red-700` / `red-950` provide accessible contrast.

## Structure

```
aside (border-r border-border bg-sidebar)
├── div (logo header, h-14, border-b)
│   └── Image (theme-aware: light/dark PNG)
└── nav
    └── ul > li > Link (flush active state)
```

## Key files

- `components/layout/sidebar.tsx` — the component
- `.claude/shadcn/sidebar.md` — shadcn/ui reference (full sidebar block with collapsible/mobile)

## Notes

- Currently desktop-only (`hidden lg:flex`)
- Only one menu item (Dashboard) for now
- Menu items are defined in a `menuItems` array for easy extension
- Theme-aware logo via `useThemeStore` (Zustand), not `next-themes`
