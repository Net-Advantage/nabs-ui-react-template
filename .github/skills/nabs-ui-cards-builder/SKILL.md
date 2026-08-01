---
name: nabs-ui-cards-builder
description: Scaffold a new MVVM page in src/Pages, register it in Shell navigation, and render 4 Cards generated from a user topic prompt.
---

# nabs-ui-cards-builder

Use this skill when the user asks to create a new page backed by `Cards` and add it to the app navigation.

## Inputs

1. `pageName`: Human-friendly page name (for example, `Electric Cars`).
2. `topicPrompt`: A short prompt describing the content domain.
3. `cardCount` (optional): default `4`.

## Rules

1. Use components from `@net-advantage/nabs-ui-shell` only.
2. Keep MVVM boundaries:
   - View in `src/Pages/<PageName>/<PageName>Page.tsx`
   - ViewModel in `src/Pages/<PageName>/<page-name>.view-model.ts`
3. ViewModels must not import React.
4. Add the page to `Navigation` items in `src/App.tsx` and render it in the shell content region.
5. Keep each page in its own folder under `src/Pages`.
6. Create or update a behavior unit test file under `tests/behavior` for the new page ViewModel.

## Generation workflow

1. Normalize names:
   - `pageId`: kebab-case from page name.
   - `componentName`: PascalCase + `Page`.
   - `viewModelName`: PascalCase + `PageViewModel`.
2. Create a typed domain model in the ViewModel from `topicPrompt` with at least:
   - `id`
   - `title`
   - 3-5 spec fields
   - `summary`
3. Use the LLM to draft realistic values for 4 cards.
4. In the page component, map the typed model to `Cards` items (`header`, `content`, `actions`).
5. Register the page in `src/App.tsx` navigation and page switch logic.
6. Preserve existing shell header/footer/theme behavior.
7. Add behavior tests for the new ViewModel in `tests/behavior/<page-name>-page-view-model.test.ts`.

## Output expectations

1. New page folder in `src/Pages`.
2. New ViewModel colocated in the page folder under `src/Pages/<PageName>`.
3. Updated navigation in `src/App.tsx`.
4. Type-safe `Cards` rendering with exactly 4 cards by default.
5. New or updated behavior unit tests for the page ViewModel in `tests/behavior`.

## Unit test expectations

1. Include at least 3 tests for the page ViewModel.
2. Validate the default topic prompt content.
3. Validate that model generation returns the expected card count.
4. Validate key fields in each generated model item.
5. Run `pnpm test:unit` and fix failures.

## Example topic for smoke testing

`Different types of electric cars and their specs.`
