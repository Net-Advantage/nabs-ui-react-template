param(
	[Parameter(Mandatory = $false)]
	[string]$PrefixReplacement,

	[Parameter(Mandatory = $false)]
	[string]$BusinessNameReplacement,

	[Parameter(Mandatory = $false)]
	[string]$AuthorReplacement,

	[Parameter(Mandatory = $false)]
	[string]$SolutionRoot,

	[switch]$IncludeHidden,
	[switch]$WhatIf,
	[switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($SolutionRoot)) {
	$SolutionRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

if (-not (Test-Path -LiteralPath $SolutionRoot -PathType Container)) {
	throw "Solution root not found: $SolutionRoot"
}

$replacements = @()
if (-not [string]::IsNullOrWhiteSpace($PrefixReplacement)) {
	$replacements += @{ Old = "NabsPrefix"; New = $PrefixReplacement }
}
if (-not [string]::IsNullOrWhiteSpace($BusinessNameReplacement)) {
	$replacements += @{ Old = "Net Advantage Business Solutions"; New = $BusinessNameReplacement }
}
if (-not [string]::IsNullOrWhiteSpace($AuthorReplacement)) {
	$replacements += @{ Old = "Darrel Schreyer"; New = $AuthorReplacement }
}

if ($replacements.Count -eq 0) {
	Write-Host "No replacements provided. Pass one or more replacement values." -ForegroundColor Yellow
	Write-Host "Example: ./scripts/rename-solution.ps1 -PrefixReplacement MyApp -BusinessNameReplacement 'My Business' -AuthorReplacement 'Your Name'"
	exit 1
}

$excludeDirectoryNames = @(
	".git",
	".vs",
	".vscode",
	"node_modules",
	"bin",
	"obj",
	"dist",
	"coverage",
	"playwright-report",
	"test-results"
)

$binaryExtensions = @(
	".7z", ".bmp", ".class", ".dll", ".dylib", ".eot", ".exe", ".gif", ".gz", ".ico", ".jar", ".jpeg", ".jpg", ".lockb", ".mov", ".mp3", ".mp4", ".nupkg", ".otf", ".pdf", ".png", ".so", ".svgz", ".tar", ".tif", ".tiff", ".ttf", ".wav", ".webm", ".webp", ".woff", ".woff2", ".zip"
)

function Should-ExcludePath {
	param([string]$Path)

	foreach ($segment in ($Path -split "[\\/]")) {
		if ($excludeDirectoryNames -contains $segment) {
			return $true
		}
	}

	return $false
}

function Is-BinaryFile {
	param([string]$Path)

	$ext = [System.IO.Path]::GetExtension($Path)
	if ([string]::IsNullOrWhiteSpace($ext)) {
		return $false
	}

	return $binaryExtensions -contains $ext.ToLowerInvariant()
}

function Replace-Content {
	param(
		[string]$Path,
		[hashtable[]]$Pairs,
		[switch]$WhatIfMode
	)

	if (Is-BinaryFile -Path $Path) {
		return $false
	}

	try {
		$content = [System.IO.File]::ReadAllText($Path)
	}
	catch {
		return $false
	}

	$originalContent = $content
	foreach ($pair in $Pairs) {
		$content = $content.Replace([string]$pair.Old, [string]$pair.New)
	}

	if ($content -ne $originalContent) {
		if ($WhatIfMode) {
			Write-Host "[WhatIf] Content updated: $Path" -ForegroundColor Cyan
		}
		else {
			[System.IO.File]::WriteAllText($Path, $content)
			Write-Host "Content updated: $Path" -ForegroundColor Green
		}

		return $true
	}

	return $false
}

function Get-ReplacementCount {
	param(
		[string]$InputText,
		[string]$FindText
	)

	if ([string]::IsNullOrEmpty($InputText) -or [string]::IsNullOrEmpty($FindText)) {
		return 0
	}

	$count = 0
	$startIndex = 0
	while ($true) {
		$idx = $InputText.IndexOf($FindText, $startIndex, [System.StringComparison]::Ordinal)
		if ($idx -lt 0) {
			break
		}

		$count++
		$startIndex = $idx + $FindText.Length
	}

	return $count
}

function Get-FileType {
	param([string]$Path)

	$ext = [System.IO.Path]::GetExtension($Path)
	if ([string]::IsNullOrWhiteSpace($ext)) {
		return "[no-ext]"
	}

	return $ext.ToLowerInvariant()
}

function Find-ContentReplacements {
	param(
		[System.IO.FileInfo[]]$Files,
		[hashtable[]]$Pairs
	)

	$details = @()
	foreach ($file in $Files) {
		if (Is-BinaryFile -Path $file.FullName) {
			continue
		}

		try {
			$content = [System.IO.File]::ReadAllText($file.FullName)
		}
		catch {
			continue
		}

		$matchCount = 0
		foreach ($pair in $Pairs) {
			$matchCount += Get-ReplacementCount -InputText $content -FindText ([string]$pair.Old)
		}

		if ($matchCount -gt 0) {
			$details += [pscustomobject]@{
				Path = $file.FullName
				FileType = Get-FileType -Path $file.FullName
				ReplacementCount = $matchCount
			}
		}
	}

	return ,$details
}

function Find-PathRenames {
	param(
		[System.IO.FileSystemInfo[]]$Items,
		[hashtable[]]$Pairs
	)

	$details = @()
	foreach ($item in $Items) {
		$itemName = [System.IO.Path]::GetFileName($item.FullName)
		$newName = $itemName

		foreach ($pair in $Pairs) {
			$newName = $newName.Replace([string]$pair.Old, [string]$pair.New)
		}

		if ($newName -ne $itemName) {
			$fileType = if ($item.PSIsContainer) { "[directory]" } else { Get-FileType -Path $item.FullName }
			$details += [pscustomobject]@{
				Path = $item.FullName
				ItemType = if ($item.PSIsContainer) { "Directory" } else { "File" }
				FileType = $fileType
				OldName = $itemName
				NewName = $newName
			}
		}
	}

	return ,$details
}

function Show-GroupedSummary {
	param(
		[string]$Title,
		[object[]]$Rows,
		[string]$CountPropertyName
	)

	Write-Host ""
	Write-Host $Title -ForegroundColor Cyan

	if ($Rows.Count -eq 0) {
		Write-Host "  None"
		return
	}

	$grouped = $Rows |
		Group-Object -Property FileType |
		ForEach-Object {
			$uniquePaths = @($_.Group | Select-Object -ExpandProperty Path -Unique)
			$sum = ($_.Group | Measure-Object -Property $CountPropertyName -Sum).Sum
			if ($null -eq $sum) {
				$sum = 0
			}

			[pscustomobject]@{
				FileType = $_.Name
				Files = $uniquePaths.Count
				Replacements = $sum
			}
		} |
		Sort-Object -Property FileType

	$grouped | Format-Table -AutoSize | Out-Host
}

function Rename-ItemPath {
	param(
		[string]$Path,
		[hashtable[]]$Pairs,
		[switch]$WhatIfMode
	)

	$itemName = [System.IO.Path]::GetFileName($Path)
	$newName = $itemName

	foreach ($pair in $Pairs) {
		$newName = $newName.Replace([string]$pair.Old, [string]$pair.New)
	}

	if ($newName -eq $itemName) {
		return $false
	}

	if ($WhatIfMode) {
		Write-Host "[WhatIf] Rename: $itemName -> $newName" -ForegroundColor Cyan
	}
	else {
		Rename-Item -LiteralPath $Path -NewName $newName
		Write-Host "Renamed: $itemName -> $newName" -ForegroundColor Green
	}

	return $true
}

Write-Host "Solution root: $SolutionRoot"
Write-Host "Running preflight scan..."

$allFiles = Get-ChildItem -LiteralPath $SolutionRoot -File -Recurse -Force:$IncludeHidden |
	Where-Object { -not (Should-ExcludePath -Path $_.FullName) }

$allItems = Get-ChildItem -LiteralPath $SolutionRoot -Recurse -Force:$IncludeHidden |
	Where-Object { -not (Should-ExcludePath -Path $_.FullName) }

$contentScan = Find-ContentReplacements -Files $allFiles -Pairs $replacements
$renameScan = Find-PathRenames -Items $allItems -Pairs $replacements

$contentFileCount = ($contentScan | Select-Object -ExpandProperty Path -Unique).Count
$contentReplacementCount = ($contentScan | Measure-Object -Property ReplacementCount -Sum).Sum
$renameCount = $renameScan.Count

Write-Host ""
Write-Host "Scan summary:" -ForegroundColor Green
Write-Host "  Content replacements: $contentReplacementCount occurrence(s) in $contentFileCount file(s)"
Write-Host "  Path renames: $renameCount item(s)"

Show-GroupedSummary -Title "Content replacements by file type" -Rows $contentScan -CountPropertyName "ReplacementCount"

if ($renameCount -gt 0) {
	$renameRows = $renameScan | ForEach-Object {
		[pscustomobject]@{
			Path = $_.Path
			FileType = $_.FileType
			RenameCount = 1
		}
	}
	Show-GroupedSummary -Title "Path renames by file type" -Rows $renameRows -CountPropertyName "RenameCount"
}

if (($contentReplacementCount -eq 0) -and ($renameCount -eq 0)) {
	Write-Host "No changes detected. Exiting." -ForegroundColor Yellow
	exit 0
}

if ($WhatIf) {
	Write-Host ""
	Write-Host "WhatIf mode enabled. No files will be modified." -ForegroundColor Yellow
	Write-Host "Showing planned actions..." -ForegroundColor Yellow
}
elseif (-not $Force) {
	Write-Host ""
	$confirmation = Read-Host "Apply these changes? Type 'yes' to continue"
	if ($confirmation -ne "yes") {
		Write-Host "Canceled. No files were modified." -ForegroundColor Yellow
		exit 0
	}
}

Write-Host ""
Write-Host "Running replacement pass..."

$contentUpdatedCount = 0
foreach ($file in $allFiles) {
	if (Replace-Content -Path $file.FullName -Pairs $replacements -WhatIfMode:$WhatIf) {
		$contentUpdatedCount++
	}
}

Write-Host "Running file and folder rename pass..."

$sortedItems = $allItems | Sort-Object { $_.FullName.Length } -Descending

$renamedCount = 0
foreach ($item in $sortedItems) {
	if (Rename-ItemPath -Path $item.FullName -Pairs $replacements -WhatIfMode:$WhatIf) {
		$renamedCount++
	}
}

Write-Host "Finished." -ForegroundColor Green
Write-Host "Content files updated: $contentUpdatedCount"
Write-Host "Files/folders renamed: $renamedCount"

if ($WhatIf) {
	Write-Host "WhatIf mode was enabled. No files were modified." -ForegroundColor Yellow
}

