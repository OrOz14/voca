# Voca — Agent Context

## Stack

- React 19.2 + Vite PWA + TailwindCSS
- Supabase (Auth + PostgreSQL + Storage + Edge Functions)
- Claude API claude-sonnet-4-6 | Whisper API
- TypeScript strict mode throughout

## Project Structure

src/
components/{feature}/ # React components
hooks/use{Feature}.ts # Custom hooks
lib/api.ts # All API calls
types/supabase.ts # Auto-generated types
supabase/
functions/{name}/ # Edge Functions
migrations/ # SQL migrations

## Non-negotiables

- RTL everywhere: dir="rtl" on html element
- Mobile-first: design for 375px first
- No localStorage: IndexedDB only (recordings)
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
