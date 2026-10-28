# Agent Instructions

## Dev Tooling

- Browser verification uses the **Playwright MCP** (configured in `.mcp.json`). Drive it with the `browser_*` MCP tools — navigate, click, snapshot, screenshot — no throwaway driver scripts to write or delete.
- Run `hugo server` first, then point the browser at `http://localhost:1313`.
- Screenshots land in the in-repo `./screenshots/` directory (set via the MCP's `--output-dir`). It's gitignored (so screenshots can't be committed) and discoverable in the editor. Wipe with `rm -rf screenshots/*`.
- When calling `browser_take_screenshot`, **omit `filename`** (auto-names into `screenshots/`) or prefix it explicitly, e.g. `screenshots/foo.png`. A bare `filename` resolves to the repo root — not the output dir — and won't be gitignored.

## Content

- Every post needs a one-line `summary` in its front matter. It becomes the meta description and the link-preview text on LinkedIn, Slack and the like; without one, Hugo falls back to the post's opening text with headings run together. When creating a post, publishing one (`draft = false`) or reviewing content, check for it and remind the user if it's missing.
