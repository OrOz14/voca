# Voca — Agent Context

## Stack

React 19.2 + Vite PWA + TailwindCSS + TypeScript + Supabase + npm + Shadcn

---

## 📋 Rules

- **Branch naming:** `task/issue-{number}-{slug}` — always
- **Commit messages:** `feat(#12): description` / `fix(#12): description` / `chore(#12): description`
- **Do not merge PRs** — I handle that manually after review
- **One PR per Issue** — never mix multiple Issues in one PR
- **npm only**
- **Do not create files outside the scope of the Issue**

---

## 🗂 Folder Structure

```
src/
  components/     # React components
  pages/          # Route pages
  store/          # Zustand stores
  lib/            # Supabase client, Claude client,
  services/       # API clients
  utils/          # Utility functions
  hooks/          # Custom React hooks
  types/          # TypeScript types
supabase/
  migrations/     # SQL migrations
  functions/      # Edge functions
```

---

## 📌 PRD

The full product spec is at `docs/PRD_v7.md` — read it before any task involving product decisions.

## Non-negotiables

- RTL everywhere: dir="rtl" on html element
- Mobile-first: design for 375px first
- RLS on every new Supabase table
- TypeScript: no `any`, strict null checks

## Before every PR

- vitest run (all tests pass)
- tsc --noEmit (no TS errors)
- Mobile viewport tested

## Commit format

feat: description (#issue)
fix: description (#issue)
chore: description

## Documentation

- `React 19.2` -[ www.react.dev](https://react.dev/)
- `Vite PWA` -[ www.vitejs.dev](https://vite-pwa-org.netlify.app/)
- `TailwindCSS` -[ www.tailwindcss.com](https://tailwindcss.com/docs/installation/using-vite)
- `TypeScript` -[ www.typescriptlang.org](https://www.typescriptlang.org/docs/)
- `Supabase` -[ www.supabase.com](https://supabase.com/docs)
- `npm` -[ www.npmjs.com](https://www.npmjs.com/)
- `Shadcn` -[ www.shadcn.com](https://ui.shadcn.com/)