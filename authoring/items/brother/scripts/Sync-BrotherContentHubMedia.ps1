<#
.SYNOPSIS
  Scan Brother serialized Image fields, build a deduped Content Hub asset registry,
  map Sitecore CMS items -> dam-id / asset id, optionally patch YAML and download media.

.DESCRIPTION
  Sources of truth (no duplicate CH uploads):
    1) upload-manifest.json  - one row per LocalFile (unique AssetId + DamId + PublicUrl)
    2) brother-sitecore-image-field-map.csv - Sitecore path + field -> LocalFile

  Outputs (under MediaRoot\ch-upload and repo media-maps\):
    content-hub-asset-registry.csv   - unique CH assets (deduped)
    sitecore-cms-image-map.csv       - every planned CMS Image field + serialization status
    serialized-image-scan.csv        - what is currently in YAML

.EXAMPLE
  . '..\..\..\..\..\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready\set-ch-env.ps1' # optional
  .\Sync-BrotherContentHubMedia.ps1
  .\Sync-BrotherContentHubMedia.ps1 -ApplyPatch
  .\Sync-BrotherContentHubMedia.ps1 -DownloadLocal
#>
[CmdletBinding()]
param(
  [string]$MediaRoot = $env:BROTHER_MEDIA_ROOT,
  [string]$SerializedRoot = '',
  [string]$RepoMapDir = '',
  [string]$PublicImagesDir = '',
  [switch]$ApplyPatch,
  [switch]$DownloadLocal
)

$ErrorActionPreference = 'Stop'

if (-not $MediaRoot) {
  $MediaRoot = 'C:\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready'
}
$uploadDir = Join-Path $MediaRoot 'ch-upload'
$manifestPath = Join-Path $uploadDir 'upload-manifest.json'
$fieldMapPath = Join-Path $uploadDir 'brother-sitecore-image-field-map.csv'

$repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\..\..'))
if (-not $SerializedRoot) {
  $SerializedRoot = Join-Path $repoRoot 'authoring\items\brother\serialized-content'
}
if (-not $RepoMapDir) {
  $RepoMapDir = Join-Path $PSScriptRoot 'media-maps'
}
if (-not $PublicImagesDir) {
  $PublicImagesDir = Join-Path $repoRoot 'industry-verticals\brother\public\images'
}

New-Item -ItemType Directory -Force -Path $uploadDir, $RepoMapDir | Out-Null

if (-not (Test-Path $manifestPath)) { throw "Missing $manifestPath - run Upload-BrotherContentHub.ps1 first" }
if (-not (Test-Path $fieldMapPath)) { throw "Missing $fieldMapPath - run Upload-BrotherContentHub.ps1 first" }

# Local public/ alias -> canonical content-ready filename (for scan reports)
$localAliasToCanonical = @{
  'brother-logo.png'     = 'brother-logo.png'
  'brother-logo.svg'     = 'brother-logo.png'
  'home-hero.jpg'        = 'product-vc-500w-with-laptop.jpg'
  'home-hero.webp'       = 'product-vc-500w-with-laptop.jpg'
  'vc-500w.jpg'          = 'product-vc-500w.jpg'
  'vc-500w-laptop.jpg'   = 'product-vc-500w-with-laptop.jpg'
  'vc-500w-colour.jpg'   = 'product-vc-500w-colour-labels.jpg'
  'vc-500w-widths.jpg'   = 'product-vc-500w-five-widths.jpg'
  'vc-500w-cutter.jpg'   = 'product-vc-500w-auto-cutter.jpg'
  'supplies-hero.jpg'    = 'category-office-labelling.jpg'
  'supplies-hero.webp'   = 'category-office-labelling.jpg'
  'desk-office.jpg'      = 'lifestyle-home-office-desk.jpg'
  'desk-office.webp'     = 'lifestyle-home-office-desk.jpg'
  'labelling-tile.jpg'   = 'category-office-labelling.jpg'
  'labelling-tile.webp'  = 'category-office-labelling.jpg'
}

function Get-YamlPath {
  param([string]$Text)
  if ($Text -match '(?m)^Path:\s*(.+)$') {
    return ($Matches[1].Trim() -replace '^["'']|["'']$', '')
  }
  return ''
}

function Get-ImageAttrs {
  param([string]$Xml)
  $o = [ordered]@{
    Src           = ''
    DamId         = ''
    MediaId       = ''
    ThumbnailSrc  = ''
    Kind          = 'empty'
  }
  if (-not $Xml) { return [pscustomobject]$o }
  if ($Xml -match 'dam-id="([^"]+)"') { $o.DamId = $Matches[1] }
  if ($Xml -match "dam-id='([^']+)'") { $o.DamId = $Matches[1] }
  if ($Xml -match 'src="([^"]+)"') { $o.Src = $Matches[1] }
  if ($Xml -match "src='([^']+)'") { $o.Src = $Matches[1] }
  if ($Xml -match 'mediaid="([^"]+)"') { $o.MediaId = $Matches[1] }
  if ($Xml -match "mediaid='([^']+)'") { $o.MediaId = $Matches[1] }
  if ($Xml -match 'thumbnailsrc="([^"]+)"') { $o.ThumbnailSrc = $Matches[1] }

  if ($o.DamId) { $o.Kind = 'content-hub' }
  elseif ($o.MediaId) { $o.Kind = 'sitecore-media' }
  elseif ($o.Src -match 'sitecoresandbox\.cloud|/api/public/content/') { $o.Kind = 'content-hub-url' }
  elseif ($o.Src -match '^/images/') { $o.Kind = 'local-public' }
  elseif ($o.Src) { $o.Kind = 'other-url' }
  return [pscustomobject]$o
}

# --- 1) Deduped CH registry from manifest (one LocalFile -> one asset) ---
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
$byFile = @{}
foreach ($row in @($manifest)) {
  if (-not $row.File -or -not $row.PublicUrl) { continue }
  if ($byFile.ContainsKey($row.File)) { continue }
  $byFile[$row.File] = [pscustomobject]@{
    LocalFile         = $row.File
    ContentHubAssetId = "$($row.AssetId)"
    DamId             = "$($row.DamId)"
    PublicLinkId      = "$($row.PublicLinkId)"
    PublicUrl         = "$($row.PublicUrl)"
    RelativeUrl       = "$($row.RelativeUrl)"
    ImageFieldXml     = "<Image src=`"$($row.PublicUrl)`" dam-id=`"$($row.DamId)`" alt=`"$([IO.Path]::GetFileNameWithoutExtension($row.File))`" dam-content-type=`"Image`" />"
  }
}

$registry = @($byFile.Values) | Sort-Object LocalFile

# Preserve brand metadata columns if a previous metadata CSV exists
$metaPath = Join-Path $uploadDir 'content-hub-asset-metadata.csv'
$metaById = @{}
if (Test-Path $metaPath) {
  foreach ($m in Import-Csv $metaPath) {
    if ($m.ContentHubAssetId) { $metaById[$m.ContentHubAssetId] = $m }
  }
}
$registry = foreach ($r in $registry) {
  $m = $metaById[$r.ContentHubAssetId]
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

$registryPath = Join-Path $uploadDir 'content-hub-asset-registry.csv'
$registry | Export-Csv $registryPath -NoTypeInformation -Encoding UTF8
$registry | Export-Csv (Join-Path $RepoMapDir 'content-hub-asset-registry.csv') -NoTypeInformation -Encoding UTF8
Write-Host "Unique CH assets: $($registry.Count) -> $registryPath"

# --- 2) Planned Sitecore field map (from upload CSV) ---
$planned = Import-Csv $fieldMapPath

# --- 3) Scan serialized YAML Image-like fields ---
$imageHints = @(
  'Image', 'Image2', 'Image3', 'Logo', 'PromoImage',
  'CardOneImage', 'CardTwoImage', 'CardThreeImage',
  'BackgroundImage', 'Thumbnail', 'HeroImage'
)

$scan = @()
$yamlFiles = @(Get-ChildItem -Path $SerializedRoot -Recurse -Filter '*.yml' -File |
  Where-Object { $_.FullName -notmatch '\\templates\\|\\renderings\\' })

Write-Host "Scanning $($yamlFiles.Count) YAML files under $SerializedRoot"

foreach ($yf in $yamlFiles) {
  try {
    $text = Get-Content -LiteralPath $yf.FullName -Raw -ErrorAction Stop
    $itemPath = Get-YamlPath $text
    if (-not $itemPath) { continue }

    $hintBlocks = [regex]::Matches($text, '(?m)^    - ID: "[^"]+"\r?\n      Hint: (.+)\r?\n      Value: (?:\|\r?\n((?:        .*\r?\n)*)|(.+)\r?\n)')
    foreach ($m in $hintBlocks) {
      $hint = $m.Groups[1].Value.Trim()
      if ($imageHints -notcontains $hint) { continue }

      $val = if ($m.Groups[2].Value) { $m.Groups[2].Value } else { $m.Groups[3].Value }
      $val = (($val -split "`n") | ForEach-Object { $_ -replace '^        ', '' }) -join "`n"
      $val = $val.Trim()
      if ($val -notmatch '<[Ii]mage\b') { continue }

      $attrs = Get-ImageAttrs $val
      $localName = ''
      if ($attrs.Src -match '/images/([^?"\s]+)') { $localName = $Matches[1] }
      $canonical = ''
      if ($localName -and $localAliasToCanonical.ContainsKey($localName)) {
        $canonical = $localAliasToCanonical[$localName]
      } elseif ($localName) {
        $canonical = $localName
      }

      $ch = $null
      if ($attrs.DamId) {
        $ch = @($registry | Where-Object { $_.DamId -eq $attrs.DamId } | Select-Object -First 1)[0]
      }
      if (-not $ch -and $canonical -and $byFile.ContainsKey($canonical)) {
        $ch = $byFile[$canonical]
      }

      $rel = $yf.FullName
      $rootNorm = [IO.Path]::GetFullPath($SerializedRoot)
      if ($rel.StartsWith($rootNorm, [StringComparison]::OrdinalIgnoreCase)) {
        $rel = $rel.Substring($rootNorm.Length).TrimStart('\')
      }

      $needs = $false
      if ($ch) {
        $needs = ($attrs.DamId -ne $ch.DamId) -or ($attrs.Src -notlike ($ch.PublicUrl + '*'))
      }

      $scan += [pscustomobject]@{
        SerializedFile     = $rel
        DataItemPath       = $itemPath
        FieldName          = $hint
        CurrentKind        = $attrs.Kind
        CurrentSrc         = $attrs.Src
        CurrentDamId       = $attrs.DamId
        CurrentMediaId     = $attrs.MediaId
        LocalPublicFile    = $localName
        CanonicalLocalFile = $canonical
        MappedAssetId      = if ($ch) { $ch.ContentHubAssetId } else { '' }
        MappedDamId        = if ($ch) { $ch.DamId } else { '' }
        MappedPublicUrl    = if ($ch) { $ch.PublicUrl } else { '' }
        NeedsPatch         = $needs
      }
    }
  } catch {
    Write-Warning "Scan failed $($yf.Name): $($_.Exception.Message)"
  }
}

$scanPath = Join-Path $uploadDir 'serialized-image-scan.csv'
@($scan) | Export-Csv $scanPath -NoTypeInformation -Encoding UTF8
@($scan) | Export-Csv (Join-Path $RepoMapDir 'serialized-image-scan.csv') -NoTypeInformation -Encoding UTF8
Write-Host "Serialized Image fields scanned: $($scan.Count)"

# --- 4) CMS map = planned fields + serialization status ---
$cmsMap = foreach ($p in $planned) {
  $asset = $byFile[$p.LocalFile]
  $ser = @($scan) | Where-Object { $_.DataItemPath -eq $p.DataItemPath -and $_.FieldName -eq $p.FieldName } | Select-Object -First 1
  $status = if (-not $ser) { 'MissingSerialization' }
    elseif ($ser.CurrentDamId -eq $p.DamId) { 'InSync' }
    elseif ($ser.CurrentKind -eq 'content-hub' -and $ser.CurrentDamId -and $ser.CurrentDamId -ne $p.DamId) { 'StaleDamId' }
    elseif ($ser.CurrentKind -eq 'local-public') { 'LocalPublicOnly' }
    elseif ($ser.CurrentKind -eq 'sitecore-media') { 'SitecoreMediaLibrary' }
    else { 'NeedsPatch' }

  [pscustomobject]@{
    DataItemPath       = $p.DataItemPath
    FieldName          = $p.FieldName
    Purpose            = $p.Purpose
    LocalFile          = $p.LocalFile
    ContentHubAssetId  = $p.ContentHubAssetId
    DamId              = $p.DamId
    PublicUrl          = $p.PublicUrl
    ImageFieldXml      = $p.ImageFieldXml
    SerializationStatus = $status
    CurrentSrc         = if ($ser) { $ser.CurrentSrc } else { '' }
    CurrentDamId       = if ($ser) { $ser.CurrentDamId } else { '' }
    SerializedFile     = if ($ser) { $ser.SerializedFile } else { '' }
  }
}

$cmsMapPath = Join-Path $uploadDir 'sitecore-cms-image-map.csv'
$cmsMap | Export-Csv $cmsMapPath -NoTypeInformation -Encoding UTF8
$cmsMap | Export-Csv (Join-Path $RepoMapDir 'sitecore-cms-image-map.csv') -NoTypeInformation -Encoding UTF8

$byStatus = $cmsMap | Group-Object SerializationStatus | ForEach-Object { "$($_.Name)=$($_.Count)" }
Write-Host "CMS image map: $($cmsMap.Count) fields ($($byStatus -join ', '))"
Write-Host "  $cmsMapPath"

# --- 5) Optional: patch YAML Value for matching Path + Hint ---
if ($ApplyPatch) {
  $patched = 0
  foreach ($row in $cmsMap) {
    if (-not $row.ImageFieldXml) { continue }
    if ($row.SerializationStatus -eq 'MissingSerialization') {
      Write-Warning "Skip patch (no YAML): $($row.DataItemPath) / $($row.FieldName)"
      continue
    }
    if ($row.SerializationStatus -eq 'InSync') { continue }

    $yf = Get-ChildItem -Path $SerializedRoot -Recurse -Filter '*.yml' -File |
      Where-Object {
        $t = Get-Content $_.FullName -Raw
        (Get-YamlPath $t) -eq $row.DataItemPath
      } | Select-Object -First 1
    if (-not $yf) {
      Write-Warning "YAML not found for $($row.DataItemPath)"
      continue
    }

    $text = Get-Content $yf.FullName -Raw
    $hint = [regex]::Escape($row.FieldName)
    $xml = $row.ImageFieldXml.Trim()
    # Replace only the Image element under this Hint; keep following field indent intact
    $replacePattern = "(?ms)(Hint:\s*$hint\s*\r?\n\s*Value:\s*(?:\|\s*\r?\n\s*)?)(<[Ii]mage\b[^>]*/?>)"
    $replacement = "`${1}$xml"
    $newText = [regex]::Replace($text, $replacePattern, $replacement, 1)
    if ($newText -eq $text) {
      Write-Warning "No Image Value match to patch: $($row.DataItemPath) / $($row.FieldName)"
      continue
    }
    Set-Content -Path $yf.FullName -Value $newText -Encoding UTF8 -NoNewline
    $patched++
    Write-Host "Patched $($row.DataItemPath) :: $($row.FieldName)"
  }
  Write-Host "Patched fields: $patched"
}

# --- 6) Optional: download public URLs into public/images using stable local names ---
if ($DownloadLocal) {
  New-Item -ItemType Directory -Force -Path $PublicImagesDir | Out-Null
  # Prefer canonical LocalFile names; also refresh known aliases
  $downloads = @{}
  foreach ($a in $registry) {
    $downloads[$a.LocalFile] = $a.PublicUrl
  }
  # Alias copies (same bytes under familiar public names)
  $aliasCopy = @{
    'home-hero.jpg'      = 'product-vc-500w-with-laptop.jpg'
    'vc-500w.jpg'        = 'product-vc-500w.jpg'
    'vc-500w-laptop.jpg' = 'product-vc-500w-with-laptop.jpg'
    'vc-500w-colour.jpg' = 'product-vc-500w-colour-labels.jpg'
    'supplies-hero.jpg'  = 'category-office-labelling.jpg'
    'desk-office.jpg'    = 'lifestyle-home-office-desk.jpg'
    'labelling-tile.jpg' = 'category-office-labelling.jpg'
  }

  foreach ($name in $downloads.Keys) {
    $dest = Join-Path $PublicImagesDir $name
    Write-Host "Download $name"
    Invoke-WebRequest -Uri $downloads[$name] -OutFile $dest -UseBasicParsing
  }
  foreach ($alias in $aliasCopy.Keys) {
    $srcName = $aliasCopy[$alias]
    $src = Join-Path $PublicImagesDir $srcName
    $dest = Join-Path $PublicImagesDir $alias
    if (Test-Path $src) {
      Copy-Item $src $dest -Force
      Write-Host "Alias $alias <- $srcName"
    }
  }
  Write-Host "Local images synced -> $PublicImagesDir"
}

Write-Host ""
Write-Host "Dedup note: $($registry.Count) unique LocalFiles / CH assets; CMS fields reuse the same DamId (no re-upload)."
Write-Host "Next: .\Sync-BrotherContentHubMedia.ps1 -ApplyPatch   then push brother-scs"
Write-Host "      .\Sync-BrotherContentHubMedia.ps1 -DownloadLocal  to refresh public/images from CH"
