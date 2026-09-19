# Optional Cloudflare Worker (`@bunny-rabbit/edge`)

**Not part of the default Studex deploy** for Bunny Rabbit travel.

The Next.js app on Vercel serves the UI and `GET /api/health`. Per Claudiou fleet rules:

- Do **not** dual-host the Next UI on Cloudflare Pages.
- Use Cloudflare for **DNS/CDN** in front of a Vercel custom domain when approved.
- Use this Worker **only** if you add a small edge API **outside** Next (proxy, webhooks, rate limits).

## If you enable it later

```bash
cd workers/edge
npm install
npx wrangler login
# wrangler secret put VERCEL_ORIGIN_URL  # only if proxying to Vercel origin
npm run deploy
```

This package is excluded from root `npm run build`. Use `npm run build:edge` from the repo root when maintaining it.
