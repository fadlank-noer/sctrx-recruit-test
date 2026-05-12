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
