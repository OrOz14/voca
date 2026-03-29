# Voca — Agent Context

## Stack

React 19.2 + Vite PWA + TailwindCSS + TypeScript + Supabase + pnpm

---

## 🔁 Workflow — Required for Every Task

**Every time I give you a task, follow these steps in order:**

### 1. Identify the GitHub Issue

If I gave you an Issue number (e.g. `#12`) — read it:

```bash
gh issue view 12
```

If not — search by title:

```bash
gh issue list --search "task title"
```

### 2. Open a new branch

```bash
git checkout main && git pull
git checkout -b task/issue-{NUMBER}-{short-slug}
# e.g. task/issue-12-pdf-analysis
```

### 3. Complete the task

- Write code
- Meet every Acceptance Criterion defined in the Issue
- Do not do more than what is scoped in the Issue

### 4. Open a PR linked to the Issue

```bash
gh pr create \
  --title "task(#NUMBER): short description" \
  --body "Closes #NUMBER

## What was done
[short description]

## Acceptance Criteria
- [ ] ...copy from Issue...

## Notes
[any relevant notes]" \
  --label "ready-for-review"
```

### 5. Update the Issue

```bash
gh issue comment NUMBER --body "PR opened: #PR_NUMBER"
```

---

## 📋 Rules

- **Branch naming:** `task/issue-{number}-{slug}` — always
- **Commit messages:** `feat(#12): description` / `fix(#12): description` / `chore(#12): description`
- **Do not merge PRs** — I handle that manually after review
- **One PR per Issue** — never mix multiple Issues in one PR
- **pnpm only** — not npm, not yarn
- **Do not create files outside the scope of the Issue**

---

## 🗂 Folder Structure

```
src/
  components/     # React components
  pages/          # Route pages
  store/          # Zustand stores
  lib/            # Supabase client, Claude client, utils
  hooks/          # Custom React hooks
  types/          # TypeScript types
supabase/
  migrations/     # SQL migrations
  functions/      # Edge functions
```

---

## 🔑 Environment Variables

Defined in `.env.local` (not committed):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CLAUDE_API_KEY`
- `VITE_WHISPER_API_KEY`
- `VITE_STRIPE_PUBLIC_KEY`

---

## 📌 PRD

The full product spec is at `docs/PRD_v7.md` — read it before any task involving product decisions.

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
