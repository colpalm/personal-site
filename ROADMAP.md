# Roadmap

## Now

- **Pre-commit hooks:** add `check-added-large-files` (`--maxkb=5000`, an accident guard, since images are allowed in the repo), `end-of-file-fixer`, `trailing-whitespace` (with `--markdown-linebreak-ext=md`) and `typos`
- **Markdown linting:** try `rumdl` on `content/`, checking it handles shortcodes first. Keep structural rules only (heading levels, one H1, code fence languages) and turn off line length
- **External link check:** add a weekly `lychee` workflow against the built site that reports but never blocks a deploy. Some sites return false 403s (marginalrevolution.com does)
- **Dependabot:** add `.github/dependabot.yml` for the `github-actions` ecosystem only
- Add links to headers

## Next
- Search functionality
- Analytics - simple

## Later

- Move images to external storage (R2 or Spaces) if image volume grows significantly; image links are just URLs, so old posts can stay put. Check yearly with `git count-objects -vH` and reconsider when `size-pack` nears 500 MB (14 MB in Nov 2026)
