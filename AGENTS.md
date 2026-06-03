# Agent Instructions

## Dev Tooling

- Save verification/Playwright screenshots to the in-repo `./screenshots/` directory, **not** `/tmp`. It's gitignored (so screenshots can't be committed) and discoverable in the editor. Wipe with `rm -rf screenshots/*`.
- Delete temporary Playwright driver scripts after use rather than leaving them in the repo root.
- Playwright (`@playwright/test`, chromium) is a dev dependency only — not part of the Hugo build. Run `hugo server` first, then drive the browser against `http://localhost:1313`.
