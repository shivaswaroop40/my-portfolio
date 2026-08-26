# shivu.io

Personal site and portfolio of Shiva Swaroop N K, a cloud infrastructure
engineer in Stockholm. Plain HTML and CSS, no build step.

## How it works

- **`public/`** — the whole site: static HTML/CSS/JS, optimized photos, and the
  machine-readable routes (`agent.md`, `llms.txt`, `resume.json`).
- **`worker/index.js`** — a Cloudflare Worker in front of the assets. It handles
  **agent mode** (AI agents, crawlers, and CLI clients get markdown, detected via
  User-Agent, `Accept: text/markdown`, `?format=md`, or Cloudflare's verified-bot
  classification), the `www` → apex and `/blog` → Notion redirects, and
  security/caching headers.
- **`wrangler.jsonc`** — Workers config; `public/` is served as static assets
  with `run_worker_first` so every request passes through the worker.
- **`pictures/`** — original full-resolution photos (source of truth). The web
  versions in `public/photos/` are resized to 1400px:
  `sips -Z 1400 -s format jpeg -s formatOptions 75 pictures/IMG_X.JPG --out public/photos/img_x.jpg`

## Agent mode

```
curl https://shivu.io/              # markdown (curl counts as an agent)
curl https://shivu.io/llms.txt      # llms.txt index
curl https://shivu.io/resume.json   # CV, JSON Resume schema
https://shivu.io/agent              # human-readable explainer
```

Agent responses carry `X-Agent-Mode: active`. `?format=html` forces HTML for
any client; `?format=md` forces markdown.

## Develop & deploy

```bash
npx wrangler dev      # local dev at http://localhost:8787
npx wrangler deploy   # deploy to Cloudflare (shivu.io)
```

CI: pushes to `main` deploy via `.github/workflows/deploy.yml`
(needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` repo secrets).

## 404

The 404 page still has the 2048 game with a local leaderboard. Some things are
load-bearing.
