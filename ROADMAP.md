# Roadmap

## Now

- **Image pipeline:** add a `render-image.html` hook to resize, convert to WebP, lazy-load and set width and height, and `warnf` on missing alt text like `render-link.html` does for broken links. Apply the same to `featured_image` in `_default/single.html`. `content/posts/day-of-week/cal.png` (2.9 MB) is the first test case
- **Pre-commit hooks:** add `check-added-large-files`, `end-of-file-fixer`, `trailing-whitespace` (with `--markdown-linebreak-ext=md`) and `typos`
- **Markdown linting:** try `rumdl` on `content/`, checking it handles shortcodes first. Keep structural rules only (heading levels, one H1, code fence languages) and turn off line length
- **External link check:** add a weekly `lychee` workflow against the built site that reports but never blocks a deploy. Some sites return false 403s (marginalrevolution.com does)
- **Dependabot:** add `.github/dependabot.yml` for the `github-actions` ecosystem only
- Add links to headers

## Next
- Search functionality
- Analytics - simple

## Later
