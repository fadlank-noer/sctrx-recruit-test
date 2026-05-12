## Rules (Required)
- Always fix the user's comments to proper English when writing code or docs.
- Keep `README.md` up to date — update it whenever a new feature is added.
- When the user adds a feature instruction under a `feature -> <name>` heading in this file, read and implement it directly.
- Follow conventional commit messages (e.g., `feat:`, `fix:`, `refactor:`).
- Always summarize every prompt I give you into the "Prompt Used" section at README.md:6-54 in professional English (e.g., if I say "ubah navbar jadi ini" you write "Restyle the Navbar component to match the provided reference").
- Always check the `.claude` folder for any instructions or documentation the user has placed there before starting work.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Style Guidelines (Sociotrax.com)

### Color Palette
| Color Role | Hex Code | Note |
| :--- | :--- | :--- |
| **Primary Global (Elementor)** | `#6EC1E4` | Light blue, defined as `--e-global-color-primary` |
| **Primary Accent (Buttons)** | `#FF0000` | Bright red, used for CTA backgrounds and secondary button text |
| **Hover Accent** | `#8E0000` | Dark red, used on button hover |
| **Secondary Global (Elementor)** | `#54595F` | Dark grey, defined as `--e-global-color-secondary` |
| **Supportive Accent (BeTheme)** | `#0089F7` | Light blue, used for decorations, icons, and interactive elements |
| **Text** | `#7A7A7A` | Medium grey, defined as `--e-global-color-text` |
| **Background** | `#FFFFFF` | White, used for main page background and header |

### Typography
- **Primary Font**: **Plus Jakarta Sans** (Google Fonts, weights 200–800).
- **Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`.
- **Button Alt Font**: **DM Sans** — used on some CTA button elements.

### Key Element Styles
- **Primary CTA Button**: Red background (`#FF0000`), white text, `border-radius: 39px`, hover to dark red (`#8E0000`).
- **Secondary Button (Outline)**: White background, red text/border (`#FF0000`), hover text/border to dark red (`#8E0000`).

### Iconography
- **Font Awesome** v5 for icons.
- **mfn-icons** (BeTheme custom icon set) may also be used.
