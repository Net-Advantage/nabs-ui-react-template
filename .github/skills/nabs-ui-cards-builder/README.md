# nabs-ui-cards-builder

Quick guide for the card-page scaffold skill.

This skill scaffolds a new MVVM page with Nabs Cards, registers it in app navigation, and adds required unit and Playwright UI tests.

## Use this when

1. You want a new page under `src/Pages`.
2. You want cards generated from a topic prompt.
3. You want page wiring plus required tests added together.

## Inputs

1. `pageName`
2. `topicPrompt`
3. `cardCount` (optional, default `4`)

## Source of truth

All detailed rules, naming conventions, wiring templates, and completion checks are maintained in:

1. `SKILL.md`
2. `../../prompts/nabs-ui-cards-builder.prompt.md`

Keep this README concise and update only those files for behavior changes.
