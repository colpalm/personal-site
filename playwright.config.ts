import { defineConfig, devices } from '@playwright/test';

// Visual/dev tooling only. Not part of the Hugo build (public/).
// Run `hugo server` first, then `npx playwright test`.
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:1313',
  },
  projects: [
    // Bundled Chromium (pinned/reproducible).
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // WebKit ≈ Safari engine.
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
