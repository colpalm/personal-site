# Roadmap

## Now

- **Markdown linting:** try `rumdl` on `content/`, checking it handles shortcodes first. Keep structural rules only (heading levels, one H1, code fence languages) and turn off line length
- **Dependabot:** add `.github/dependabot.yml` for the `github-actions` ecosystem only
- Add links to headers

## Next
- Search functionality
- Analytics - simple

## Later

- Move images to external storage (R2 or Spaces) if image volume grows significantly; image links are just URLs, so old posts can stay put. Check yearly with `git count-objects -vH` and reconsider when `size-pack` nears 500 MB (14 MB in Nov 2026)
