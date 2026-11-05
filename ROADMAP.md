# Roadmap

## Now

- **Quick fixes**
  - Add an RSS `<link rel="alternate">` to `partials/head.html` and a `<link rel="canonical">` to `partials/head/meta.html`
  - Add a themed `404.html` (GitHub Pages' default page shows today)
  - Set `[taxonomies]` to tags only in `hugo.toml` to remove the empty `/categories/` page
  - Set `enableRobotsTXT = true` and add a `robots.txt` template with a `Sitemap:` line
  - Bump `HUGO_VERSION` in `.github/workflows/hugo.yaml` to match local (0.168.0)
  - Replace the Font Awesome CDN stylesheet with inline SVGs for its four icons: GitHub, LinkedIn, copy, check (`assets/js/code.js` sets the last two)
  - Fix the `pageREf` typo in `hugo.toml` and remove the unused npm step from the workflow
- **Hugo content checks:** use `warnf` so CI's `--panicOnWarning` fails the deploy, skipping drafts (`partials/check-summary.html` is the first one)
  - Make `render-link.html` warn when an internal link doesn't resolve to a page
  - Add a `render-image.html` hook that warns on missing alt text
- **Image pipeline:** extend `render-image.html` to resize, convert to WebP, lazy-load and set width and height. Apply the same to `featured_image` in `_default/single.html`. `content/posts/day-of-week/cal.png` (2.9 MB) is the first test case
- **Pre-commit hooks:** add `check-added-large-files`, `end-of-file-fixer`, `trailing-whitespace` (with `--markdown-linebreak-ext=md`) and `typos`
- **Markdown linting:** try `rumdl` on `content/`, checking it handles shortcodes first. Keep structural rules only (heading levels, one H1, code fence languages) and turn off line length
- **External link check:** add a weekly `lychee` workflow against the built site that reports but never blocks a deploy. Some sites return false 403s (marginalrevolution.com does)
- **Dependabot:** add `.github/dependabot.yml` for the `github-actions` ecosystem only
- Add links to headers

## Next
- Search functionality

## Later
