# personal-site
Personal Site

## Deploy Locally
- Run: `hugo serve -D` to deploy locally with drafts
- Access application at `localhost:1313`

## Dev Tooling (Playwright)
Optional browser tooling for visual/UI work — not part of the Hugo build.

- Start the site (`hugo serve -D`), then run checks: `npx playwright test`

Tests live in `tests/` and use the Chromium + WebKit (Safari engine) projects in `playwright.config.ts`.
