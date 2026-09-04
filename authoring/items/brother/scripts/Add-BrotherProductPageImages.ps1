<#
.SYNOPSIS
  Add Content Hub Image / Image2 / Image3 (and Home Banner PromoImage) values into
  Brother serialized YAML for ProductPage items still MissingSerialization.
#>
[CmdletBinding()]
param(
  [string]$CsvPath = '',
  [string]$SerializedRoot = ''
)

$ErrorActionPreference = 'Stop'
$repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\..\..'))
if (-not $SerializedRoot) {
  $SerializedRoot = Join-Path $repoRoot 'authoring\items\brother\serialized-content'
}
if (-not $CsvPath) {
  $CsvPath = Join-Path $env:USERPROFILE 'OneDrive - Sitecore\Work\Brother\_content-ready\ch-upload\brother-sitecore-image-field-map.csv'
  if (-not (Test-Path $CsvPath)) {
    $CsvPath = Join-Path $PSScriptRoot 'media-maps\sitecore-cms-image-map.csv'
  }
}

# ProductPage template field IDs
$fieldIds = @{
  Image      = 'b40e0006-6666-4000-8000-000000000034'
  Image2     = 'b40e0006-6666-4000-8000-000000000035'
  Image3     = 'b40e0006-6666-4000-8000-000000000036'
  PromoImage = '1b9b1f4c-7f6d-4eda-b5d8-214177f3f304'
}

# Paths that use ProductPage (or HeroBanner for PromoImage)
$productPaths = @(
  '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w',
  '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500wcr',
  '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-800',
  '/sitecore/content/brother/brother/Home/supplies/label-printers/labels/cz/cz1003',
  '/sitecore/content/brother/brother/Home/labelling-and-receipts/vc-500w'
)

$rows = Import-Csv $CsvPath
# Prefer brother-sitecore-image-field-map (has ImageFieldXml); fall back to cms map + registry
$hasXml = $rows[0].PSObject.Properties.Name -contains 'ImageFieldXml'

function Get-YamlPath([string]$Text) {
  if ($Text -match '(?m)^Path:\s*(.+)$') {
    return ($Matches[1].Trim() -replace '^["'']|["'']$', '')
  }
  return ''
}

function Add-OrReplaceImageField {
  param(
    [string]$Yaml,
    [string]$FieldId,
    [string]$Hint,
    [string]$ImageXml
  )
  $xmlBlock = @"
    - ID: "$FieldId"
      Hint: $Hint
      Value: |
        $ImageXml
"@
  # Remove existing field block if present
  $remove = "(?ms)^\s*- ID: `"$FieldId`"\r?\n\s*Hint: $Hint\r?\n\s*Value: (?:\|\r?\n(?:\s{8}.*\r?\n)+|\S.*\r?\n)"
  $Yaml = [regex]::Replace($Yaml, $remove, '')

  # Insert before __Revision if present, else before end of Fields list (before trailing Languages sibling ends)
  if ($Yaml -match '(?m)^(\s*- ID: "8cdc337e-a112-42fb-bbb4-4143751e123f")') {
    return $Yaml -replace '(?m)^(\s*- ID: "8cdc337e-a112-42fb-bbb4-4143751e123f")', ($xmlBlock.TrimEnd() + "`r`n" + '$1')
  }
  # Insert after Title field block inside version Fields
  if ($Yaml -match '(?ms)(Hint: Title\r?\n\s*Value: [^\r\n]+\r?\n)') {
    return [regex]::Replace($Yaml, '(?ms)(Hint: Title\r?\n\s*Value: [^\r\n]+\r?\n)', "`$1$xmlBlock`r`n", 1)
  }
  # Fallback: append before end of first version Fields by matching "Versions:" section end
  if ($Yaml -match '(?ms)(Versions:\r?\n\s*- Version: 1\r?\n\s*Fields:\r?\n)') {
    return $Yaml -replace '(?ms)(Versions:\r?\n\s*- Version: 1\r?\n\s*Fields:\r?\n)', "`$1$xmlBlock`r`n"
  }
  throw "Could not find insertion point for $Hint"
}

$yamlFiles = Get-ChildItem -Path (Join-Path $SerializedRoot 'brother\brother') -Recurse -Filter '*.yml' -File
$pathToFile = @{}
foreach ($yf in $yamlFiles) {
  $t = Get-Content -LiteralPath $yf.FullName -Raw
  $p = Get-YamlPath $t
  if ($p) { $pathToFile[$p] = $yf.FullName }
}

$patched = 0
$skipped = 0

# Product page images
foreach ($itemPath in $productPaths) {
  if (-not $pathToFile.ContainsKey($itemPath)) {
    Write-Warning "YAML missing for $itemPath"
    $skipped++
    continue
  }
  $file = $pathToFile[$itemPath]
  $yaml = Get-Content -LiteralPath $file -Raw
  $itemRows = $rows | Where-Object {
    ($_.DataItemPath -eq $itemPath) -and ($_.FieldName -match '^Image\d*$') -and ($_.PublicUrl -or $_.ImageFieldXml)
  }
  if (-not $itemRows) {
    Write-Warning "No CSV rows for $itemPath"
    $skipped++
    continue
  }
  foreach ($r in $itemRows) {
    $fid = $fieldIds[$r.FieldName]
    if (-not $fid) { Write-Warning "No field id for $($r.FieldName)"; continue }
    $xml = if ($r.ImageFieldXml) { $r.ImageFieldXml.Trim() } else {
      $alt = [IO.Path]::GetFileNameWithoutExtension($r.LocalFile)
      "<Image src=`"$($r.PublicUrl)`" dam-id=`"$($r.DamId)`" alt=`"$alt`" dam-content-type=`"Image`" />"
    }
    $yaml = Add-OrReplaceImageField -Yaml $yaml -FieldId $fid -Hint $r.FieldName -ImageXml $xml
    Write-Host "Set $($r.FieldName) on $itemPath"
    $patched++
  }
  Set-Content -LiteralPath $file -Value $yaml -Encoding UTF8 -NoNewline
}

# Home Banner PromoImage
$bannerPath = '/sitecore/content/brother/brother/Data/Hero Banners/Home Banner'
$promo = $rows | Where-Object { $_.DataItemPath -eq $bannerPath -and $_.FieldName -eq 'PromoImage' } | Select-Object -First 1
if ($promo -and $pathToFile.ContainsKey($bannerPath)) {
  $file = $pathToFile[$bannerPath]
  $yaml = Get-Content -LiteralPath $file -Raw
  $xml = if ($promo.ImageFieldXml) { $promo.ImageFieldXml.Trim() } else {
    "<Image src=`"$($promo.PublicUrl)`" dam-id=`"$($promo.DamId)`" alt=`"product-vc-500w`" dam-content-type=`"Image`" />"
  }
  $yaml = Add-OrReplaceImageField -Yaml $yaml -FieldId $fieldIds.PromoImage -Hint 'PromoImage' -ImageXml $xml
  Set-Content -LiteralPath $file -Value $yaml -Encoding UTF8 -NoNewline
  Write-Host "Set PromoImage on Home Banner"
  $patched++
} else {
  Write-Warning 'Skip PromoImage (missing CSV or YAML)'
}

Write-Host ""
Write-Host "Patched field values: $patched (skipped items: $skipped)"
Write-Host "ProductPage Image/Image2/Image3 + Home Banner PromoImage patched. Header / PromoStrip / category pages are separate datasources."
