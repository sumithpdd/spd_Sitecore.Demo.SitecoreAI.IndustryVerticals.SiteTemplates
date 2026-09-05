<#
.SYNOPSIS
  Rebuild brother-sitecore-image-field-map.csv + sitecore-cms-image-map.csv from
  registry, device plan, and serialized YAML scan (repo media-maps).
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$RepoMapDir = Join-Path $PSScriptRoot 'media-maps'
$SerializedRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\serialized-content'))
$uploadDir = Join-Path $env:USERPROFILE 'OneDrive - Sitecore\Work\Brother\_content-ready\ch-upload'

$reg = Import-Csv (Join-Path $RepoMapDir 'content-hub-asset-registry.csv')
$byFile = @{}
foreach ($r in $reg) { if ($r.LocalFile) { $byFile[$r.LocalFile] = $r } }

function Get-Xml([string]$file) {
  $r = $byFile[$file]
  if (-not $r) { return '' }
  $alt = [IO.Path]::GetFileNameWithoutExtension($file)
  "<Image src=`"$($r.PublicUrl)`" dam-id=`"$($r.DamId)`" alt=`"$alt`" dam-content-type=`"Image`" />"
}

function Get-YamlPath([string]$Text) {
  if ($Text -match '(?m)^Path:\s*(.+)$') {
    return $Matches[1].Trim().Trim('"').Trim("'")
  }
  return ''
}

# Scan YAML Image fields
$scan = @()
Get-ChildItem -Path $SerializedRoot -Recurse -Filter '*.yml' -File | ForEach-Object {
  $text = Get-Content $_.FullName -Raw
  $itemPath = Get-YamlPath $text
  if (-not $itemPath) { return }
  $matches = [regex]::Matches($text, '(?ms)^\s*- ID: "[^"]+"\s*\r?\n\s*Hint: (?<hint>\w+)\s*\r?\n\s*Value: \|\s*\r?\n\s*(?<xml><Image\b[^>]*/?>)')
  foreach ($m in $matches) {
    $hint = $m.Groups['hint'].Value
    $xml = $m.Groups['xml'].Value
    if ($hint -notmatch 'Image|Logo|Promo') { continue }
    $dam = if ($xml -match 'dam-id="([^"]+)"') { $Matches[1] } else { '' }
    $src = if ($xml -match 'src="([^"]+)"') { $Matches[1] } else { '' }
    if (-not $dam) { continue }
    $r = @($reg | Where-Object { $_.DamId -eq $dam } | Select-Object -First 1)[0]
    $scan += [pscustomobject]@{
      DataItemPath = $itemPath
      FieldName    = $hint
      DamId        = $dam
      Src          = $src
      LocalFile    = if ($r) { $r.LocalFile } else { '' }
      AssetId      = if ($r) { $r.ContentHubAssetId } else { '' }
      PublicUrl    = if ($r) { $r.PublicUrl } else { $src }
      File         = $_.FullName.Substring($SerializedRoot.Length).TrimStart('\')
    }
  }
}
$scan | Export-Csv (Join-Path $RepoMapDir 'serialized-image-scan.csv') -NoTypeInformation -Encoding UTF8

$planned = @{}
function Add-Plan($path, $field, $file, $purpose) {
  if (-not $file -or -not $byFile.ContainsKey($file)) { return }
  $r = $byFile[$file]
  $key = "$path|$field"
  $planned[$key] = [pscustomobject]@{
    DataItemPath        = $path
    FieldName           = $field
    Purpose             = $purpose
    LocalFile           = $file
    ContentHubAssetId   = $r.ContentHubAssetId
    DamId               = $r.DamId
    PublicUrl           = $r.PublicUrl
    ImageFieldXml       = Get-Xml $file
  }
}

$devicePlan = Join-Path $RepoMapDir 'device-image-field-plan.csv'
if (Test-Path $devicePlan) {
  foreach ($row in Import-Csv $devicePlan) {
    Add-Plan $row.DataItemPath $row.FieldName $row.LocalFile $row.Purpose
  }
}

foreach ($s in $scan) {
  $file = $s.LocalFile
  if (-not $file) { continue }
  Add-Plan $s.DataItemPath $s.FieldName $file 'Scanned from YAML'
}

# Preserve prior map rows for non-device items still planned
$prior = Join-Path $RepoMapDir 'brother-sitecore-image-field-map.csv'
if (-not (Test-Path $prior) -and (Test-Path (Join-Path $uploadDir 'brother-sitecore-image-field-map.csv'))) {
  $prior = Join-Path $uploadDir 'brother-sitecore-image-field-map.csv'
}
if (Test-Path $prior) {
  foreach ($row in Import-Csv $prior) {
    $key = "$($row.DataItemPath)|$($row.FieldName)"
    if (-not $planned.ContainsKey($key) -and $row.LocalFile) {
      Add-Plan $row.DataItemPath $row.FieldName $row.LocalFile $(if ($row.Purpose) { $row.Purpose } else { 'Prior map' })
    }
  }
}

$planRows = $planned.Values | Sort-Object DataItemPath, FieldName
$planRows | Export-Csv (Join-Path $RepoMapDir 'brother-sitecore-image-field-map.csv') -NoTypeInformation -Encoding UTF8

$cmsMap = foreach ($p in $planRows) {
  $ser = @($scan) | Where-Object { $_.DataItemPath -eq $p.DataItemPath -and $_.FieldName -eq $p.FieldName } | Select-Object -First 1
  $status = if (-not $ser) { 'MissingSerialization' }
    elseif ($ser.DamId -eq $p.DamId) { 'InSync' }
    else { 'StaleDamId' }
  [pscustomobject]@{
    DataItemPath         = $p.DataItemPath
    FieldName            = $p.FieldName
    Purpose              = $p.Purpose
    LocalFile            = $p.LocalFile
    ContentHubAssetId    = $p.ContentHubAssetId
    DamId                = $p.DamId
    PublicUrl            = $p.PublicUrl
    ImageFieldXml        = $p.ImageFieldXml
    SerializationStatus  = $status
    CurrentSrc           = if ($ser) { $ser.Src } else { '' }
    CurrentDamId         = if ($ser) { $ser.DamId } else { '' }
    SerializedFile       = if ($ser) { $ser.File } else { '' }
  }
}

$cmsMap | Export-Csv (Join-Path $RepoMapDir 'sitecore-cms-image-map.csv') -NoTypeInformation -Encoding UTF8
if (Test-Path $uploadDir) {
  $cmsMap | Export-Csv (Join-Path $uploadDir 'sitecore-cms-image-map.csv') -NoTypeInformation -Encoding UTF8
  $planRows | Export-Csv (Join-Path $uploadDir 'brother-sitecore-image-field-map.csv') -NoTypeInformation -Encoding UTF8
  $scan | Export-Csv (Join-Path $uploadDir 'serialized-image-scan.csv') -NoTypeInformation -Encoding UTF8
}

$byStatus = $cmsMap | Group-Object SerializationStatus | ForEach-Object { "$($_.Name)=$($_.Count)" }
Write-Host "Scan=$($scan.Count) Plan=$($planRows.Count) CMS=$($cmsMap.Count) ($($byStatus -join ', '))"
$cmsMap | Where-Object { $_.SerializationStatus -ne 'InSync' } | Select-Object DataItemPath, FieldName, SerializationStatus, LocalFile | Format-Table -AutoSize
