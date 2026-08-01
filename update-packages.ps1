param(
    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Invoke-Step {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Command
    )

    Write-Host "==> $Command" -ForegroundColor Cyan

    if ($DryRun) {
        return
    }

    Invoke-Expression $Command
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed with exit code ${LASTEXITCODE}: $Command"
    }
}

Push-Location $PSScriptRoot
try {
    if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
        throw "pnpm is not installed or not available in PATH."
    }

    # Update all workspace dependency ranges and lockfile to latest available versions.
    Invoke-Step "pnpm up -r --latest"

    # Ensure lockfile and node_modules are fully synchronized after version bumps.
    Invoke-Step "pnpm install"

    if ($DryRun) {
        Write-Host "Dry run complete. No changes were applied." -ForegroundColor Yellow
    }
    else {
        Write-Host "Package update complete." -ForegroundColor Green
    }
}
finally {
    Pop-Location
}
