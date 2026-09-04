<#
.SYNOPSIS
  Apply Brother brand metadata on Content Hub assets from the upload registry.

.DESCRIPTION
  Sets on each unique uploaded asset:
    - Brand: Brother (PCMBrandToAsset -> M.Brand Brother)
    - Type: Social Media Asset (AssetTypeToAsset)
    - Tag: Used in CMS (TagToAsset; creates tag if missing)

  Also writes Description hint when allowed.

  Requires CONTENTHUB_* env (see set-ch-env.ps1). Reads:
    MediaRoot\ch-upload\content-hub-asset-registry.csv
    (or upload-manifest.json)

.EXAMPLE
  . 'C:\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready\set-ch-env.ps1'
  .\Set-BrotherContentHubMetadata.ps1
#>
[CmdletBinding()]
param(
  [string]$MediaRoot = $env:BROTHER_MEDIA_ROOT,
  [string]$BrandName = 'Brother',
  [string]$AssetTypeIdentifier = 'M.AssetType.SocialMediaAsset',
  [string]$UsageTagName = 'Used in CMS',
  [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'

if (-not $MediaRoot) {
  $MediaRoot = 'C:\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready'
}
$uploadDir = Join-Path $MediaRoot 'ch-upload'
$registryPath = Join-Path $uploadDir 'content-hub-asset-registry.csv'
$manifestPath = Join-Path $uploadDir 'upload-manifest.json'

$uri = ($env:CONTENTHUB_URI -replace '/$', '')
if (-not $uri) { throw 'Set CONTENTHUB_URI' }

function Get-ContentHubToken {
  $clientId = $env:CONTENTHUB_CLIENT_ID
  $clientSecret = $env:CONTENTHUB_CLIENT_SECRET
  if (-not $clientId -or -not $clientSecret) { throw 'Set CONTENTHUB_CLIENT_ID / CONTENTHUB_CLIENT_SECRET' }
  $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
    grant_type    = 'client_credentials'
    client_id     = $clientId
    client_secret = $clientSecret
  } -ContentType 'application/x-www-form-urlencoded'
  return @{ Authorization = "Bearer $($tokenResponse.access_token)"; Accept = 'application/json' }
}

function Invoke-ChJson {
  param([string]$Method, [string]$Path, [hashtable]$Headers, $Body = $null)
  $params = @{
    Method  = $Method
    Uri     = if ($Path -match '^http') { $Path } else { "$uri$Path" }
    Headers = $Headers
  }
  if ($null -ne $Body) {
    $params.ContentType = 'application/json'
    $params.Body = if ($Body -is [string]) { $Body } else { ($Body | ConvertTo-Json -Depth 12 -Compress) }
  }
  return Invoke-RestMethod @params
}

function Find-EntityByQuery {
  param([hashtable]$Headers, [string]$Query, [int]$Take = 20)
  $enc = [uri]::EscapeDataString($Query)
  return Invoke-ChJson -Method Get -Path "/api/entities/query?query=$enc&take=$Take" -Headers $Headers
}

function Set-AssetRelation {
  param(
    [hashtable]$Headers,
    [string]$AssetId,
    [string]$Relation,
    [string[]]$ParentIds,
    [ValidateSet('parent', 'parents')]$Role = 'parents'
  )
  if ($Role -eq 'parent') {
    $body = @{ parent = @{ href = "$uri/api/entities/$($ParentIds[0])" } }
  } else {
    $body = @{
      parents = @($ParentIds | ForEach-Object { @{ href = "$uri/api/entities/$_" } })
    }
  }
  if ($WhatIf) {
    Write-Host "WhatIf: PUT entities/$AssetId/relations/$Relation -> $($ParentIds -join ',')"
    return
  }
  Invoke-ChJson -Method Put -Path "/api/entities/$AssetId/relations/$Relation" -Headers $Headers -Body $body | Out-Null
}

$headers = Get-ContentHubToken
Write-Host "Connected to $uri"

# Resolve Brand (Brother)
$brandQuery = "Definition.Name=='M.Brand' AND String('BrandName')=='$BrandName'"
$brandResult = Find-EntityByQuery -Headers $headers -Query $brandQuery
if (-not $brandResult.total_items) {
  throw "Brand '$BrandName' not found in M.Brand. Create it in Content Hub first."
}
$brandId = [string]$brandResult.items[0].id
Write-Host "Brand '$BrandName' id=$brandId ident=$($brandResult.items[0].identifier)"

# Resolve AssetType (Social Media Asset)
$typeQuery = "Definition.Name=='M.AssetType' AND Identifier=='$AssetTypeIdentifier'"
$typeResult = Find-EntityByQuery -Headers $headers -Query $typeQuery
if (-not $typeResult.total_items) {
  # fallback: load by known identifier path
  try {
    $byIdent = Invoke-ChJson -Method Get -Path "/api/entities/identifier/$AssetTypeIdentifier" -Headers $headers
    $typeId = [string]$byIdent.id
    Write-Host "AssetType via identifier id=$typeId"
  } catch {
    throw "AssetType '$AssetTypeIdentifier' not found."
  }
} else {
  $typeId = [string]$typeResult.items[0].id
  Write-Host "AssetType '$AssetTypeIdentifier' id=$typeId"
}

# Resolve / create Tag (Used in CMS)
$tagQuery = "Definition.Name=='M.Tag' AND String('TagName')=='$UsageTagName'"
$tagResult = Find-EntityByQuery -Headers $headers -Query $tagQuery
if ($tagResult.total_items -gt 0) {
  $tagId = [string]$tagResult.items[0].id
  Write-Host "Tag '$UsageTagName' id=$tagId"
} else {
  if ($WhatIf) {
    Write-Host "WhatIf: would create M.Tag '$UsageTagName'"
    $tagId = 'NEW'
  } else {
    $created = Invoke-ChJson -Method Post -Path '/api/entities' -Headers $headers -Body @{
      properties = @{
        TagName  = $UsageTagName
        TagLabel = @{ 'en-US' = $UsageTagName }
      }
      entitydefinition = @{ href = "$uri/api/entitydefinitions/M.Tag" }
    }
    $tagId = [string]$created.id
    Write-Host "Created tag '$UsageTagName' id=$tagId"
  }
}

# Load unique asset ids
$assets = @()
if (Test-Path $registryPath) {
  $assets = Import-Csv $registryPath | Where-Object { $_.ContentHubAssetId }
} elseif (Test-Path $manifestPath) {
  $assets = @(Get-Content $manifestPath -Raw | ConvertFrom-Json) |
    Where-Object { $_.AssetId -and $_.PublicUrl } |
    ForEach-Object {
      [pscustomobject]@{
        LocalFile         = $_.File
        ContentHubAssetId = $_.AssetId
        DamId             = $_.DamId
        PublicUrl         = $_.PublicUrl
      }
    }
} else {
  throw "Missing registry/manifest under $uploadDir"
}

$assets = $assets | Sort-Object ContentHubAssetId -Unique
Write-Host "Applying metadata to $($assets.Count) assets..."

$ok = 0
$fail = 0
$metaRows = @()
foreach ($a in $assets) {
  $id = [string]$a.ContentHubAssetId
  try {
    Set-AssetRelation -Headers $headers -AssetId $id -Relation 'PCMBrandToAsset' -ParentIds @($brandId) -Role parents
    Set-AssetRelation -Headers $headers -AssetId $id -Relation 'AssetTypeToAsset' -ParentIds @($typeId) -Role parent
    if ($tagId -and $tagId -ne 'NEW') {
      Set-AssetRelation -Headers $headers -AssetId $id -Relation 'TagToAsset' -ParentIds @($tagId) -Role parents
    }
    Write-Host "OK $id $($a.LocalFile)"
    $ok++
    $metaRows += [pscustomobject]@{
      LocalFile         = $a.LocalFile
      ContentHubAssetId = $id
      DamId             = $a.DamId
      PublicUrl         = $a.PublicUrl
      Brand             = $BrandName
      BrandEntityId     = $brandId
      AssetType         = 'Social Media Asset'
      AssetTypeId       = $typeId
      UsageTag          = $UsageTagName
      UsageTagId        = $tagId
      MetadataStatus    = 'Applied'
    }
  } catch {
    Write-Warning "FAIL $id $($a.LocalFile): $($_.Exception.Message)"
    $fail++
    $metaRows += [pscustomobject]@{
      LocalFile         = $a.LocalFile
      ContentHubAssetId = $id
      DamId             = $a.DamId
      PublicUrl         = $a.PublicUrl
      Brand             = $BrandName
      BrandEntityId     = $brandId
      AssetType         = 'Social Media Asset'
      AssetTypeId       = $typeId
      UsageTag          = $UsageTagName
      UsageTagId        = $tagId
      MetadataStatus    = "Error: $($_.Exception.Message)"
    }
  }
}

$outCsv = Join-Path $uploadDir 'content-hub-asset-metadata.csv'
$repoMaps = Join-Path $PSScriptRoot 'media-maps'
New-Item -ItemType Directory -Force -Path $repoMaps | Out-Null
$metaRows | Export-Csv $outCsv -NoTypeInformation -Encoding UTF8
$metaRows | Export-Csv (Join-Path $repoMaps 'content-hub-asset-metadata.csv') -NoTypeInformation -Encoding UTF8

# Enrich registry with metadata columns when present
if (Test-Path $registryPath) {
  $reg = Import-Csv $registryPath
  $enriched = foreach ($r in $reg) {
    $m = $metaRows | Where-Object { $_.ContentHubAssetId -eq $r.ContentHubAssetId } | Select-Object -First 1
    [pscustomobject]@{
      LocalFile         = $r.LocalFile
      ContentHubAssetId = $r.ContentHubAssetId
      DamId             = $r.DamId
      PublicLinkId      = $r.PublicLinkId
      PublicUrl         = $r.PublicUrl
      RelativeUrl       = $r.RelativeUrl
      ImageFieldXml     = $r.ImageFieldXml
      Brand             = if ($m) { $m.Brand } else { '' }
      AssetType         = if ($m) { $m.AssetType } else { '' }
      UsageTag          = if ($m) { $m.UsageTag } else { '' }
      MetadataStatus    = if ($m) { $m.MetadataStatus } else { '' }
    }
  }
  $enriched | Export-Csv $registryPath -NoTypeInformation -Encoding UTF8
  $enriched | Export-Csv (Join-Path $repoMaps 'content-hub-asset-registry.csv') -NoTypeInformation -Encoding UTF8
}

Write-Host ""
Write-Host "Done. OK=$ok FAIL=$fail"
Write-Host "  $outCsv"
Write-Host "In Content Hub UI: Brand=Brother, Type=Social Media Asset, Tag=Used in CMS"
