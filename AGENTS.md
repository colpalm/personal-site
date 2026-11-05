# Agent Instructions

## Dev Tooling

- Browser verification uses the **Playwright MCP** (configured in `.mcp.json`). Drive it with the `browser_*` MCP tools — navigate, click, snapshot, screenshot — no throwaway driver scripts to write or delete.
- Run `hugo server` first, then point the browser at `http://localhost:1313`.
- Screenshots land in the in-repo `./screenshots/` directory (set via the MCP's `--output-dir`). It's gitignored (so screenshots can't be committed) and discoverable in the editor. Wipe with `rm -rf screenshots/*`.
- When calling `browser_take_screenshot`, **omit `filename`** (auto-names into `screenshots/`) or prefix it explicitly, e.g. `screenshots/foo.png`. A bare `filename` resolves to the repo root — not the output dir — and won't be gitignored.
