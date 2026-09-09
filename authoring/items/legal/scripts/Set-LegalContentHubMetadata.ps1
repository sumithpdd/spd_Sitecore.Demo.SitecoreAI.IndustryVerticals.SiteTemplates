<#
  Stamp Content Hub Brand PinsentMason on uploaded legal assets.
  Reuses Brother metadata script with a different brand + media root.
#>
[CmdletBinding()]
param(
  [string]$MediaRoot = $env:LEGAL_MEDIA_ROOT,
  [string]$BrandName = 'PinsentMason'
)

$ErrorActionPreference = 'Stop'
if (-not $MediaRoot) { $MediaRoot = Join-Path $PSScriptRoot 'media-staging' }
$brother = Join-Path (Split-Path $PSScriptRoot -Parent) '..\brother\scripts\Set-BrotherContentHubMetadata.ps1'
$brother = [IO.Path]::GetFullPath($brother)
if (-not (Test-Path $brother)) { throw "Brother metadata script not found: $brother" }
& $brother -MediaRoot $MediaRoot -BrandName $BrandName
