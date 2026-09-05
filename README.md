# NABS UI React Template

This repository is a GitHub template for bootstrapping a full-stack .NET 10 + React solution using Aspire orchestration and NABS Launchpad packages.

## Solution structure

- `src/<Prefix>.AppHost` - Aspire orchestrator for local startup
- `src/<Prefix>.Gateway` - gateway host
- `src/<Prefix>.Api` - backend API endpoints
- `src/<Prefix>.Dtos` - shared DTO contracts
- `src/<Prefix>.Frontend` - React + TypeScript + Vite frontend

## Prerequisites

- .NET 10 SDK
- Node.js 20+
- pnpm 10+
- Visual Studio 2026+ (or VS Code)

## Getting started

1. Clone your repository from this template.

```powershell
git clone https://github.com/Net-Advantage/nabs-ui-react-template.git <your-solution-folder>
cd <your-solution-folder>
```

2. Rename placeholders across the solution.

```powershell
.\scripts\rename-solution.ps1 -PrefixReplacement [PrefixName] -BusinessNameReplacement '[Business Name]' -AuthorReplacement '[Your Name]'
```

3. Restore and run.

```powershell
dotnet restore
dotnet run --project .\src\<Prefix>.AppHost\<Prefix>.AppHost.csproj
```

The AppHost starts the API and frontend and opens the Aspire dashboard.

## Frontend scripts

From `src/<Prefix>.Frontend`:

```powershell
pnpm install
pnpm dev
pnpm test
pnpm test:e2e:headless
```

## Notes

- This repository is intended to be used as a starter template.
- After renaming, verify project names, namespaces, package IDs, and branding text before committing.
