# Working notes (Base44 sandbox)

Non-obvious facts about running this repo here. The app itself lives in `nilesh-portfolio/`.

## Running

- `docker compose -f docker-compose.base44.yml up -d` → Next.js dev server on host port 3000, MongoDB on the internal `mongo` service.
- Source is bind-mounted, so edits hot-reload. `WATCHPACK_POLLING=true` is set because bind mounts need polling.
- Dependencies install at container start into the `web-node-modules` volume.

## Package manager: use pnpm

- `nilesh-portfolio/pnpm-lock.yaml` is the current lockfile (next 15.2.8, react 19.2.4).
- `nilesh-portfolio/package-lock.json` is **stale** (pins next 15.2.4), so `npm ci` fails with EUSAGE.
- With npm you would also need `--legacy-peer-deps` (vaul's peer range stops at React 18).
- The compose command starts with `pnpm install --frozen-lockfile`; keep it that way.

## Environment

- Placeholders live in `.env.base44-defaults` (Mongo URI, DB name, admin login). It is listed before `/run/base44/app.env` so dashboard secrets override it.
- Admin dashboard login: `admin` / `admin123` (from the repo's own QUICK_START.md).
- No external services are required; MongoDB runs as a compose service.

## Benign warnings in `web` logs

- `Failed to load the ES module: tailwind.config.ts` — Tailwind still loads the config (generated CSS contains `accordion-down`, `--radius`, Orbitron utilities). Ignore.
- `Route "/api/contact/[id]" used params.id ... should be awaited` (Next 15 sync params) — pre-existing app code; the route still returns 200.

## Verifying

- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/`
- `curl -s http://localhost:3000/api/projects` → `[]` when MongoDB is reachable (falls back to `[]` on error too, so check `web` logs for `[MongoDB] Connection error`).
- `curl -s -X POST http://localhost:3000/api/auth/login -H 'Content-Type: application/json' -d '{"username":"admin","password":"admin123"}'` → `{"user":{...}}`.
- `/admin/login` and `/admin/dashboard` have no in-app links from the home page; open them by URL.
