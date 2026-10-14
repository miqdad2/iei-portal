# IEI Kuwait Community Portal — Rebuild

Design source: `IEI Kuwait Community Portal.html` (24 views, navy/brass drafting-sheet theme).
Function source: `iei-kuwait-web-source_1/iei-kuwait-web` (Java/Tomcat, 7 files, ~50 APIs, 6 EC roles).

## Monorepo

```txt
apps/web        Next.js 15 App Router (public site + EC Desk CMS)
apps/mobile     Expo Router (iOS + Android, same API)
packages/ui         shared tokens + components (web + NativeWind)
packages/api-client shared Supabase client + TanStack Query hooks
packages/validations  Zod schemas shared everywhere
supabase/       Postgres migrations + RLS + seed (parity with 22 JSON groups)
docs/
```

## Stack (all open-source software)

Web: Next.js + Tailwind + shadcn-style components. Mobile: Expo. Backend: Postgres + PostgREST/GoTrue/Realtime (Supabase self-hostable) + NestJS BFF for QR/receipts. DevOps later.

## Commands

```bash
npm run dev:web
npm run build:web
```

## Env

See `.env.example`. Never commit real `.env`. `SUPABASE_SERVICE_ROLE_KEY` server-only.

## Scope parity checklist

- [ ] 24 web routes pixel-match Portal preview
- [ ] apply/track/renew/RSVP/member/jobs/employer/check-in flows from source_1
- [ ] 6 EC roles + CMS content/members/jobs/requests/exports
- [ ] Mobile parity + push-ready + offline card/ticket cache
