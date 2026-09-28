# List public assets on Content Hub brand 112600. Never prints credentials.
$ErrorActionPreference = 'Stop'
. "$env:USERPROFILE\OneDrive - Sitecore\Work\Brother\_content-ready\set-ch-env.ps1"
$uri = ($env:CONTENTHUB_URI -replace '/$', '')
if (-not $uri) { throw 'CONTENTHUB_URI missing' }

$tokenResponse = $null
try {
  $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
    grant_type    = 'client_credentials'
    client_id     = $env:CONTENTHUB_CLIENT_ID
    client_secret = $env:CONTENTHUB_CLIENT_SECRET
  } -ContentType 'application/x-www-form-urlencoded'
  Write-Host 'Auth=client_credentials'
} catch {
  Write-Host 'client_credentials failed, trying password grant'
  $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
    grant_type    = 'password'
    client_id     = $env:CONTENTHUB_CLIENT_ID
    client_secret = $env:CONTENTHUB_CLIENT_SECRET
    username      = $env:CONTENTHUB_USERNAME
    password      = $env:CONTENTHUB_PASSWORD
  } -ContentType 'application/x-www-form-urlencoded'
  Write-Host 'Auth=password'
}
$headers = @{ Authorization = "Bearer $($tokenResponse.access_token)" }

$brand = Invoke-RestMethod -Method Get -Uri "$uri/api/entities/112600" -Headers $headers
$brandName = $brand.properties.BrandName
Write-Host "Brand name=$brandName id=112600"

$query = [uri]::EscapeDataString("Definition.Name=='M.Asset' AND Parent('PCMBrandToAsset').id==112600")
$result = Invoke-RestMethod -Method Get -Uri "$uri/api/entities/query?query=$query&take=100" -Headers $headers
Write-Host "Assets=$($result.total_items)"

$rows = @()
foreach ($item in @($result.items)) {
  $id = $item.id
  $asset = Invoke-RestMethod -Method Get -Uri "$uri/api/entities/$id" -Headers $headers
  $fileName = $asset.properties.FileName
  if (-not $fileName) { $fileName = $asset.properties.Title }
  $links = Invoke-RestMethod -Method Get -Uri "$uri/api/entities/$id/relations/AssetToPublicLink" -Headers $headers
  $children = @()
  if ($links.children) { $children = @($links.children) }
  elseif ($links.parents) { $children = @($links.parents) }
  $publicUrl = ''
  $damId = ''
  $publicLinkId = ''
  foreach ($child in $children) {
    $href = $child.href
    if (-not $href) { continue }
    $pl = Invoke-RestMethod -Method Get -Uri $href -Headers $headers
    $rel = $pl.properties.RelativeUrl
    $status = "$($pl.properties.Status)"
    if ($rel -and $status -match 'Completed|completed') {
      $publicUrl = "$uri/api/public/content/$rel"
      $damId = "$($pl.identifier)"
      $publicLinkId = "$($pl.id)"
      break
    }
  }
  Write-Host ("{0}`t{1}`t{2}" -f $id, $fileName, $publicUrl)
  $rows += [pscustomobject]@{
    File = "$fileName"
    AssetId = "$id"
    PublicLinkId = $publicLinkId
    DamId = $damId
    PublicUrl = $publicUrl
    Title = "$($asset.properties.Title)"
  }
}

$out = Join-Path $PSScriptRoot 'media-maps\content-hub-asset-registry.csv'
New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null
$rows | Export-Csv -Path $out -NoTypeInformation -Encoding utf8
Write-Host "Wrote $($rows.Count) rows"
