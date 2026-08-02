# NABS UI React Template

This repository is a **GitHub template** for bootstrapping a full-stack .NET solution with:

- `src/<Prefix>.Frontend` - frontend application
- `src/<Prefix>.Api` - backend API
- `src/<Prefix>.AppHost` - local orchestration host

Use this template when starting a new application so you can standardize naming, structure, and local startup behavior.

## Getting Started

> The steps below assume you are in a folder where you usually clone repositories (for example: `C:\dev\projects`).

### 1) Clone the scaffold repository

You can replace `test-app` with your preferred solution folder name.

```powershell
git clone https://github.com/Net-Advantage/nabs-frontend-scaffold.git test-app
cd test-app
```

### 2) Rename solution placeholders

Run the rename script to replace prefix/business metadata placeholders throughout the solution.
It will rename projects, folders, namespaces, and other matching text that contains the replacement parameters.

```powershell
.\scripts\rename-solution.ps1 -PrefixReplacement [PrefixName] -BusinessNameReplacement '[Business Name]' -AuthorReplacement '[Your Name]'
```

### 3) Open and run

Open the solution in **Visual Studio** or **VS Code**, then run the **AppHost** project.

## Notes

- This repo is intended to be used as a starting point/template for new projects.
- After renaming, verify project names, namespaces, and any branding text before committing.
