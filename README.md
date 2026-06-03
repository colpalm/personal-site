# personal-site
Personal Site

## Deploy Locally
- Run: `hugo serve -D` to deploy locally with drafts
- Access application at `localhost:1313`

### Testing on a real device (e.g. mobile Safari)
Some issues only surface on a physical device — e.g. mobile Safari's address bar
shrinking the viewport (handled via `100dvh` in the CSS), which Chrome dev tools
and Playwright's WebKit don't reproduce. To reach the dev server from a phone on
the same Wi-Fi, bind to all interfaces and set the base URL to your Mac's LAN IP:

```
hugo serve -D --bind 0.0.0.0 --baseURL http://<your-mac-lan-ip>
```

Find your Mac's IP with `ipconfig getifaddr en0`, then browse to
`http://<your-mac-lan-ip>:1313` on the device. The IP is DHCP-assigned and can
change after a reboot/reconnect.

## Dev Tooling (Playwright)
Optional browser tooling for visual/UI work — not part of the Hugo build.

- Start the site (`hugo serve -D`), then run checks: `npx playwright test`

Tests live in `tests/` and use the Chromium + WebKit (Safari engine) projects in `playwright.config.ts`.
