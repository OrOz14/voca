Execute the Voca task workflow for a GitHub Issue.

## Usage
/task #NUMBER
/task "issue title to search"

## Steps

### 1. Identify the Issue

If given a number like `#12` or `12`:
```bash
gh issue view $NUMBER
```

If given a title/description, search for it:
```bash
gh issue list --search "$QUERY"
```

Read the full issue carefully. Note the issue number, title, and all Acceptance Criteria.

### 2. Switch to main and create branch

```bash
git checkout main && git pull
git checkout -b task/issue-{NUMBER}-{short-slug}
```

Branch naming: `task/issue-{NUMBER}-{short-slug}` — always.

### 3. Complete the task

- Write code to meet every Acceptance Criterion in the issue
- Do not do more than what is scoped in the issue
- Run checks before opening PR:
  - `npm run build` (no build errors)
  - `npx tsc --noEmit` (no TS errors)

### 4. Open a PR linked to the issue

```bash
gh pr create \
  --title "task(#NUMBER): short description" \
  --body "Closes #NUMBER

## What was done
[short description]

## Acceptance Criteria
- [ ] ...copied from issue...

## Notes
[any relevant notes]" \
  --label "ready-for-review"
```

### 5. Comment on the issue with the PR link

```bash
gh issue comment NUMBER --body "PR opened: #PR_NUMBER"
```

## Rules
- Commit format: `feat(#N): description` / `fix(#N): description` / `chore(#N): description`
- npm only — never pnpm or yarn
- No files outside the scope of the issue
- Do not merge the PR — user handles that after review
