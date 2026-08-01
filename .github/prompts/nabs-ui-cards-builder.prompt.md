---
mode: agent
tools: ["changes", "codebase", "fetch", "githubRepo", "search", "terminal", "usages"]
description: Build a new MVVM page with nabs-ui Cards and wire it into shell navigation.
---

Use the `nabs-ui-cards-builder` skill in this repository.

User input:

- Page name: {{pageName}}
- Topic prompt: {{topicPrompt}}

Requirements:

1. Create a new page folder in `src/Pages/<PageName>` with `<PageName>Page.tsx`.
2. Create a matching ViewModel in `src/viewmodels/pages` using `.view-model.ts` naming.
3. Generate a typed model from `topicPrompt` and render 4 Cards via `Cards` from `@net-advantage/nabs-ui-shell`.
4. Add a new item to navigation in `src/App.tsx` and make it selectable.
5. Keep shell branding/footer/theme toggle behavior unchanged.
6. Run typecheck and fix any errors.

If no topic is provided, default to:
`Different types of electric cars and their specs.`
