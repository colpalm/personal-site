# Roadmap

## Now

## Next
- Search functionality
- Analytics - simple

## Later

- Move images to external storage (R2 or Spaces) if image volume grows significantly; image links are just URLs, so old posts can stay put. Check yearly with `git count-objects -vH` and reconsider when `size-pack` nears 500 MB (14 MB in Nov 2026)
- **Links to headers:** a `render-heading.html` hook adding a `#` link to each heading (on hover on desktop, faint on mobile); headings already get IDs, so `#section` URLs work today. Add a `warnf` for `#` H1s in post bodies at the same time. Revisit when a post is long enough to link to sections, or with search

### Posts
- How I use AI
- Pivot to SWE
- Becoming senior and not even realizing it
