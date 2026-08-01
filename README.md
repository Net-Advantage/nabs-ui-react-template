# Nabs UI React Template

Production-ready GitHub template for building React apps with the Nabs UI design system, Vite, and TypeScript.

## Use this template

1. Click Use this template on GitHub.
2. Create your new repository from this template.
3. Clone your new repository locally.

## Prerequisites

1. Node.js 20+
2. pnpm 10+

## Quick start

1. Install dependencies.
2. Start development server.
3. Build production bundle.
4. Preview production build.

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## What this template includes

1. React 19 + TypeScript + Vite
2. Nabs UI Shell layout
3. Nabs UI Branding component in the app header
4. Theme packages for light and dark mode
5. Default startup mode set to dark + compact
6. Logo asset variants for light and dark backgrounds
7. Out-of-the-box test setup for Playwright UI tests, MVVM structure checks, and ViewModel behavior tests

## First things to customize

1. App branding: Update title and byline in [src/App.tsx](src/App.tsx).
2. Logos: Replace files in [src/assets/net-advantage-logo-launch-light.svg](src/assets/net-advantage-logo-launch-light.svg) and [src/assets/net-advantage-logo-launch-dark.svg](src/assets/net-advantage-logo-launch-dark.svg).
3. Navigation: Edit nav items in [src/App.tsx](src/App.tsx) to match your app sections.
4. Footer content: Update organization name and links in [src/App.tsx](src/App.tsx).

## Project scripts

1. pnpm dev: Runs Vite dev server.
2. pnpm build: Runs TypeScript project build (TS7 parallel checkers/builders) and Vite production build.
3. pnpm build:ts: Runs TypeScript project references build with TS7 parallelization (`--checkers 8 --builders 4`).
4. pnpm build:ts:ci: Lower-parallel TS7 build profile for resource-constrained CI (`--checkers 2 --builders 1`).
5. pnpm typecheck: Fast TS7 type-check across project references (`--checkers 8 --builders 4`).
6. pnpm typecheck:watch: TS7 watch mode with parallel checkers/builders (`--checkers 8 --builders 4`).
7. pnpm typecheck:single: TS7 single-threaded mode for deterministic debugging/perf comparison.
8. pnpm preview: Serves the built app locally.
9. pnpm lint: Runs Oxlint.
10. ./update-packages.ps1: Updates workspace dependencies to latest and refreshes lockfile.
11. pnpm test: Runs unit/architecture/behavior tests with Vitest.
12. pnpm test:unit: Runs Vitest once.
13. pnpm test:unit:watch: Runs Vitest in watch mode.
14. pnpm test:coverage: Runs Vitest with coverage.
15. pnpm test:structure: Runs MVVM structure checks only.
16. pnpm test:behavior: Runs ViewModel behavior tests with coverage.
17. pnpm test:e2e: Runs Playwright UI tests.
18. pnpm test:e2e:headless: Runs Playwright tests in headless mode (automation default).
19. pnpm test:e2e:headed: Runs Playwright tests in headed mode for local visual debugging.
20. pnpm test:e2e:visual: Runs visual regression screenshot checks.
21. pnpm test:e2e:visual:update: Updates visual regression baseline screenshots.
22. pnpm test:e2e:ui: Opens Playwright UI mode.
23. pnpm test:install:browsers: Installs Playwright browsers.
24. pnpm test:all: Runs Vitest and headless Playwright test suites.

## Testing out of the box

This template now includes three complementary test layers:

1. UI testing with Playwright to validate user-visible behavior in a real browser.
2. Structural testing to enforce MVVM conventions automatically.
3. Behavioral testing to ensure ViewModel methods are covered and validated.

It also includes visual regression testing with Playwright screenshots.

### Test folders

1. [tests/ui](tests/ui): Playwright end-to-end tests.
2. [tests/architecture](tests/architecture): MVVM structure and convention checks.
3. [tests/behavior](tests/behavior): ViewModel method behavior tests.
4. [tests/setup](tests/setup): Shared Vitest test setup.
5. [src/ShellComponents](src/ShellComponents): Shell-level ViewModel classes used by the app and targeted by behavior coverage.

### Quick testing workflow

```bash
pnpm test
pnpm test:e2e
pnpm test:all
```

### MVVM structure rules enforced by tests

Current structural tests assert that:

1. [src/ShellComponents](src/ShellComponents) exists.
2. ViewModel files use the .view-model.ts suffix.
3. ViewModels do not import React.
4. ViewModel classes are exported with a ViewModel class name suffix.

If your team adds additional architecture requirements (for example, a src/models folder or stricter import boundaries), extend [tests/architecture/mvvm-structure.test.ts](tests/architecture/mvvm-structure.test.ts).

### ViewModel behavioral coverage

Vitest coverage is configured to measure [src/ShellComponents](src/ShellComponents) and page-level `*.view-model.ts` files with thresholds:

1. Statements: 90%
2. Functions: 90%
3. Lines: 90%
4. Branches: 85%

This makes sure template consumers do not skip testing the methods that hold UI behavior logic.

### Playwright setup notes

1. Playwright config is in [playwright.config.ts](playwright.config.ts).
2. The default test project runs Chromium.
3. CI automation runs headless mode using pnpm test:e2e:headless.
4. Local visual debugging is available with pnpm test:e2e:headed and pnpm test:e2e:ui.
5. Visual regression baselines are stored in [tests/ui/__screenshots__](tests/ui/__screenshots__).
6. Generate or refresh visual baselines with pnpm test:e2e:visual:update.
7. Browser binaries are installed with pnpm test:install:browsers.
8. HTML reports are generated under playwright-report.

### Suggested CI order

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e:headless
```

This template includes a ready-to-use GitHub Actions workflow at [.github/workflows/ci-testing.yml](.github/workflows/ci-testing.yml) with two jobs: a fast quality job (lint, typecheck, Vitest) and a separate headless Playwright job.

## TypeScript 7 configuration

1. This template uses TypeScript 7 from your workspace dependencies.
2. VS Code is configured to use the workspace TypeScript SDK in [.vscode/settings.json](.vscode/settings.json).
3. Build scripts use TS7 parallel controls:
   checkers for type-check worker count, builders for project reference parallelism, and singleThreaded for debugging.

## TypeScript config layout

This template uses a small project-reference layout so browser code and Node tooling stay cleanly separated.

1. [tsconfig.base.json](tsconfig.base.json): Shared defaults used by all TypeScript projects in this repo.
2. [tsconfig.app.json](tsconfig.app.json): React/browser app config for files in src.
3. [tsconfig.node.json](tsconfig.node.json): Node/tooling config for files like [vite.config.ts](vite.config.ts).
4. [tsconfig.json](tsconfig.json): Root coordinator that references app and node projects for tsc -b.

Architecture at a glance:

```text
tsconfig.base.json
	├─ tsconfig.app.json   (browser + React code in src)
	├─ tsconfig.node.json  (Node tooling, vite.config.ts)
	└─ tsconfig.json       (root project references coordinator)
```

Maintenance rule of thumb:

1. Put common options in [tsconfig.base.json](tsconfig.base.json).
2. Put environment-specific options only in app/node configs.

## Theme behavior

1. Default theme classes are applied in [src/main.tsx](src/main.tsx).
2. Theme toggle is rendered in the footer in [src/App.tsx](src/App.tsx).
3. Logo variant switches automatically between light and dark assets.

## Supply-chain policy note for pnpm

This repo may enforce pnpm minimum release age checks. If very new package versions fail to install or run, review policy settings in [pnpm-workspace.yaml](pnpm-workspace.yaml).

If you intentionally upgraded to freshly published versions, align your policy before running install or dev.

Common recovery flow:

```bash
pnpm clean --lockfile
pnpm install
```

## Recommended next step after creating a repo from this template

1. Rename the package and app title.
2. Replace logos and branding text.
3. Remove any placeholder content in [src/App.tsx](src/App.tsx).
4. Commit as your project baseline.

## Maintainer notes for template updates

1. Keep dependency versions in [package.json](package.json), [pnpm-lock.yaml](pnpm-lock.yaml), and [pnpm-workspace.yaml](pnpm-workspace.yaml) aligned.
2. If you add new default assets, update references in [src/App.tsx](src/App.tsx) and this README.
3. Run build and lint before publishing template updates.
