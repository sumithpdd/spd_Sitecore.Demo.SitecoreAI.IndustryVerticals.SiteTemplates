# Permanently removes marley Link List items from the Content recycle bin.
# Serialization indexes recycled items, which causes NonUniquePathException during pull/push.
#
# Prerequisite: dotnet sitecore login -n SitecoreSilverProd --allow-write true
#
# Usage:
#   powershell -File authoring/items/marley/scripts/purge-recycled-link-items.ps1

param(
  [string]$EnvironmentName = 'SitecoreSilverProd',
  [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '../../../../')
$userJsonPath = Join-Path $repoRoot '.sitecore/user.json'

if (-not (Test-Path $userJsonPath)) {
  throw "Missing $userJsonPath - run 'dotnet sitecore login' first."
}

$user = Get-Content $userJsonPath | ConvertFrom-Json
$endpoint = $user.endpoints.$EnvironmentName
$hostUrl = $endpoint.host.TrimEnd('/')
$token = if ($endpoint.ref) { $user.endpoints.$($endpoint.ref).accessToken } else { $endpoint.accessToken }

$orphanIds = @(
  '1b4aa63d-01ac-451e-8eb2-7066fc15b4fb',
  'e0cc6e2e-79ed-4522-9456-5149dc26d717',
  '08c2d1e2-92b0-40d9-bed1-38021b8922c6',
  'e112007d-ca6a-4840-8f7e-59792d6ae138',
  '12a3704f-1936-4e34-9a24-653678752635',
  'd8ec1189-848c-4d84-a2f6-f4c322a76d60',
  'df91ee92-bcf6-428d-a30d-8a39cf7ff049',
  '7fd90937-9d45-4e41-bec0-110a48523c98',
  '12692fd1-a727-45b9-b0ba-45446366342e',
  '9d7ab3e3-cbd4-4166-a841-b895b00344bb',
  '5004f980-452f-4f05-91f5-09ab98d9a69b',
  'f68778af-61fd-4d83-94c0-2f5a902da4c4',
  '3780784a-36cd-47e6-bfa1-3cb8f24131f8',
  '85552927-5f1d-479f-98f3-1b0721c326c2',
  'd2307858-0a11-4f31-b3e6-9e696ff5c492',
  'b87be8fa-bf03-4b9e-a578-c1fcf4605160',
  'dd4f9d70-6e97-463e-80c5-2dbc045a7e9a',
  'c1b4f9da-b014-4154-bde6-1f872b8ea9a6',
  'c74fce7d-ce50-461a-a739-ebaeb51110ad'
) | ForEach-Object { $_ -replace '-', '' }

$orphanSet = [System.Collections.Generic.HashSet[string]]::new([string[]]$orphanIds)

function Invoke-GraphQl($query) {
  $uri = "$hostUrl/sitecore/api/authoring/graphql/v1/"
  $headers = @{
    Authorization = "Bearer $token"
    'Content-Type' = 'application/json'
  }
  $body = @{ query = $query } | ConvertTo-Json -Compress
  return Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body
}

Write-Host "Target CM: $hostUrl"
Write-Host "Looking up archived marley link items..."

$archived = Invoke-GraphQl '{ archivedItems { archivalId itemId item { path name } } }'
if ($archived.errors) {
  $archived = Invoke-GraphQl '{ archivedItems { archivalId itemId } }'
}

$items = @($archived.data.archivedItems)
if (-not $items -or $items.Count -eq 0) {
  Write-Warning 'No archivedItems returned. Try emptying Recycle Bin manually in Content Editor.'
  exit 1
}

$targets = $items | Where-Object { $orphanSet.Contains($_.itemId) }
Write-Host "Found $($targets.Count) recycled orphan link items to purge."

if ($WhatIf) {
  $targets | ForEach-Object { Write-Host "  Would purge archivalId=$($_.archivalId) itemId=$($_.itemId)" }
  exit 0
}

$purged = 0
foreach ($target in $targets) {
  $archivalId = $target.archivalId
  $response = Invoke-GraphQl "mutation { deleteArchivedItem(input: { archivalId: `"$archivalId`" }) { successful } }"
  if ($response.data.deleteArchivedItem.successful) {
    Write-Host "Purged $($target.itemId)"
    $purged++
  }
  else {
    Write-Warning "Failed to purge $($target.itemId)"
  }
}

Write-Host "Purged $purged items. Retry: dotnet sitecore serialization pull -n $EnvironmentName -i marley"
