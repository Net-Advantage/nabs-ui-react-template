---
name: nabs-ui-cards-builder
description: Scaffold a new MVVM page in src/Pages, register it in Shell navigation, and render 4 Cards generated from a user topic prompt.
---

# nabs-ui-cards-builder

Use this skill when the user asks to create a new page backed by `Cards` and add it to the app navigation.

## Repository conventions (must follow)

1. Folder name: `src/Pages/<PageToken>` where `<PageToken>` is PascalCase with no spaces (example: `ElectricCars`, `HousePlants`).
2. Page component file: `src/Pages/<PageToken>/<PageToken>Page.tsx`.
3. Page ViewModel file: `src/Pages/<PageToken>/<PageToken>Page.view-model.ts`.
4. ViewModel class name: `<PageToken>PageViewModel`.
5. Behavior test file: `tests/behavior/<page-token-kebab>-page-view-model.test.ts`.
6. Playwright UI test updates: `tests/ui/app.spec.ts` (or a dedicated page UI spec).

## Inputs

1. `pageName`: Human-friendly page name (for example, `Electric Cars`).
2. `topicPrompt`: A short prompt describing the content domain.
3. `cardCount` (optional): default `4`.

## Preflight checklist (run before generating files)

1. Confirm `pageName` is present.
2. Compute and record:
   - `pageId` (kebab-case)
   - `pageToken` (PascalCase, no spaces)
3. Confirm target files do not conflict with existing unrelated files:
   - `src/Pages/<PageToken>/<PageToken>Page.tsx`
   - `src/Pages/<PageToken>/<PageToken>Page.view-model.ts`
   - `tests/behavior/<page-token-kebab>-page-view-model.test.ts`
4. If topic prompt is missing, use default:
   - `Different types of electric cars and their specs.`

## Rules

1. Use components from `@net-advantage/nabs-ui-shell` only.
2. Keep MVVM boundaries:
   - View in `src/Pages/<PageToken>/<PageToken>Page.tsx`
   - ViewModel in `src/Pages/<PageToken>/<PageToken>Page.view-model.ts`
3. ViewModels must not import React.
4. Add the page to `Navigation` items in `src/App.tsx` and render it in the shell content region.
5. Keep each page in its own folder under `src/Pages`.
6. Create or update a behavior unit test file under `tests/behavior` for the new page ViewModel.
7. Match the existing wiring style in `src/App.tsx`: `navItems`, `AppPageId`, and `useMemo` switch block.
8. Create or update Playwright UI tests that validate navigation to the new page and rendered card count/content.

## Cards contract

`Cards` items must use this shape:

```ts
type CardsItem = {
  id: string;
  header?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
};
```

Map the ViewModel model to that shape in the page component.

## Generation workflow

1. Normalize names:
    - `pageId`: kebab-case from page name.
    - `pageToken`: PascalCase from page name with spaces removed.
    - `componentName`: `<PageToken>Page`.
    - `viewModelFile`: `<PageToken>Page.view-model.ts`.
    - `viewModelName`: `<PageToken>PageViewModel`.
2. Create a typed domain model in the ViewModel from `topicPrompt` with at least:
   - `id`
   - `title`
   - 3-5 spec fields
   - `summary`
3. Use the LLM to draft realistic values for 4 cards.
4. In the page component, map the typed model to `Cards` items (`header`, `content`, `actions`).
5. Register the page in `src/App.tsx` navigation and page switch logic.
6. Preserve existing shell header/footer/theme behavior.
7. Add behavior tests for the new ViewModel in `tests/behavior/<page-token-kebab>-page-view-model.test.ts`.
8. Add Playwright UI tests in `tests/ui` for the new page route/selection and visible Cards output.

## App.tsx wiring template

Apply this exact pattern when wiring a new page:

```ts
// 1) Add import
import { HousePlantsPage } from "./Pages/HousePlants/HousePlantsPage";

// 2) Add nav item
const navItems = [
   { id: "home", label: "Home" },
   { id: "house-plants", label: "House Plants" },
   { id: "settings", label: "Settings" },
];

// 3) Keep this union pattern
type AppPageId = (typeof navItems)[number]["id"];

// 4) Add branch inside useMemo
const activePage = useMemo(() => {
   if (activePageId === "house-plants") {
      return <HousePlantsPage />;
   }

   if (activePageId === "settings") {
      return <SettingsPage />;
   }

   return <HomePage />;
}, [activePageId]);
```

## Output expectations

1. New page folder in `src/Pages/<PageToken>`.
2. New ViewModel colocated in the page folder under `src/Pages/<PageToken>`.
3. Updated navigation in `src/App.tsx`.
4. Type-safe `Cards` rendering with exactly 4 cards by default.
5. New or updated behavior unit tests for the page ViewModel in `tests/behavior`.
6. New or updated Playwright UI tests in `tests/ui` covering page navigation and card rendering.

## Unit test expectations

1. Include at least 3 tests for the page ViewModel.
2. Validate the default topic prompt content.
3. Validate that model generation returns the expected card count.
4. Validate key fields in each generated model item.
5. Run `pnpm test:unit` and fix failures.

Use this test structure template:

```ts
import { describe, expect, test } from "vitest";
import { HousePlantsPageViewModel } from "../../src/Pages/HousePlants/HousePlantsPage.view-model";

describe("HousePlantsPageViewModel", () => {
   test("provides a default topic prompt", () => {
      const viewModel = new HousePlantsPageViewModel();
      expect(viewModel.topicPrompt.length).toBeGreaterThan(0);
   });

   test("builds a four-card model for a topic", () => {
      const viewModel = new HousePlantsPageViewModel();
      const model = viewModel.buildModelFromTopic("House plants and care specs");

      expect(model).toHaveLength(4);
      for (const item of model) {
         expect(item.id.length).toBeGreaterThan(0);
         expect(item.title.length).toBeGreaterThan(0);
      }
   });

   test("exposes a prebuilt model from the default topic", () => {
      const viewModel = new HousePlantsPageViewModel();
      expect(viewModel.model).toHaveLength(4);
   });
});
```

## Architecture test guidance

1. Current `tests/architecture/mvvm-structure.test.ts` validates `src/ShellComponents` and does not require per-page updates for new Pages.
2. If architecture tests are extended later to enforce page-level rules, update those tests in the same change as page scaffolding.
3. Always run `pnpm test:unit` after scaffolding to catch architecture regressions.

## Playwright UI test expectations

1. Add at least one UI test that opens `/`, selects the page from navigation, and validates the page header.
2. Assert the page-specific prompt/intro text is visible.
3. Assert Cards render with the expected count (default: 4).
4. Assert at least one first-card label and one last-card label are visible.
5. Run `pnpm test:e2e:headless` and fix failures.

## Example topic for smoke testing

`Different types of electric cars and their specs.`

## Completion checklist (must pass before finishing)

1. New/updated files compile with `pnpm typecheck`.
2. Unit tests pass with `pnpm test:unit`.
3. Playwright UI tests pass with `pnpm test:e2e:headless`.
4. App wiring works:
   - new nav item exists
   - `AppPageId` still derives from `navItems`
   - `useMemo` includes the new page branch
5. ViewModel file is colocated and named `<PageToken>Page.view-model.ts`.
6. Behavior tests exist and assert card-count/model-shape behavior.
7. UI tests exist and assert nav + header + card count behavior.
