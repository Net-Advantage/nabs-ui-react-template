---
mode: agent
tools: ["changes", "codebase", "fetch", "githubRepo", "search", "terminal", "usages"]
description: Build a new MVVM page with nabs-ui Cards and wire it into shell navigation.
---

Use the `nabs-ui-cards-builder` skill in this repository.

User input:

- Page name: {{pageName}}
- Topic prompt: {{topicPrompt}}

Preflight checklist:

1. Compute `pageId` (kebab-case) and `pageToken` (PascalCase, no spaces).
2. Confirm file targets:
	- `src/Pages/<PageToken>/<PageToken>Page.tsx`
	- `src/Pages/<PageToken>/<PageToken>Page.view-model.ts`
	- `tests/behavior/<page-token-kebab>-page-view-model.test.ts`
3. If topic prompt is empty, use:
	`Different types of electric cars and their specs.`

Requirements:

1. Normalize naming first:
	- `pageId`: kebab-case from page name.
	- `pageToken`: PascalCase from page name with spaces removed.
2. Create a new page folder in `src/Pages/<PageToken>` with `<PageToken>Page.tsx`.
3. Create a matching ViewModel in the same page folder as `<PageToken>Page.view-model.ts`, class `<PageToken>PageViewModel`.
4. In `src/App.tsx`, use the existing nav + `AppPageId` + `useMemo` pattern to register and render the page.
5. Generate a typed model from `topicPrompt` and render 4 Cards via `Cards` from `@net-advantage/nabs-ui-shell`.
6. Map model items into Cards `items` shape with `id`, `header`, `content`, and `actions`.
7. Keep shell branding/footer/theme toggle behavior unchanged.
8. Create or update behavior tests in `tests/behavior/<page-token-kebab>-page-view-model.test.ts` for the new ViewModel, following the existing electric-cars test style.
9. Run typecheck and unit tests, then fix any errors.

Architecture note:

- Do not update `tests/architecture/mvvm-structure.test.ts` unless page-level constraints are introduced there.

Completion checklist:

1. Run `pnpm typecheck` and fix all errors.
2. Run `pnpm test:unit` and fix all failures.
3. Verify `src/App.tsx` wiring is complete: import, nav item, and `useMemo` branch.
4. Verify ViewModel is colocated and named `<PageToken>Page.view-model.ts`.

If no topic is provided, default to:
`Different types of electric cars and their specs.`
