---
mode: agent
tools: ["changes", "codebase", "fetch", "githubRepo", "search", "terminal", "usages"]
description: Build a new ASP.NET Core endpoint using Nabs.Launchpad.Core.Apis and wire endpoint discovery.
---

Use the `nabs-api-builder` skill in this repository.

All behavioral and architectural rules are defined in `.github/skills/nabs-api-builder/SKILL.md` and must be followed exactly.

User input:

- Domain: {{domain}}
- Endpoint name (optional): {{endpointName}}
- HTTP method: {{httpMethod}}
- Route template: {{routeTemplate}}
- Request shape (optional): {{requestShape}}
- Response shape (optional): {{responseShape}}

Preflight checklist:

1. Validate inputs are complete (including required `domain`).
2. Apply all constraints from `SKILL.md`.

Requirements:

1. Execute generation strictly according to `SKILL.md`.
2. Build after changes and fix compile errors.

Completion checklist:

1. Endpoint class compiles under `<ApiProject>/Endpoints/<Domain>Endpoints`.
2. `Program.cs` maps discovered Nabs endpoints.
3. `dotnet build` succeeds.
4. Endpoint metadata is present for OpenAPI.
