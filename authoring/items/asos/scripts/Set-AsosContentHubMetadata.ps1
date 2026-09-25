<#
  Stamp Content Hub Brand id 108526 (Asos) on uploaded assets.
  Requires CONTENTHUB_* env. Never commit secrets.
#>
[CmdletBinding()]
param(
  [string]$MediaRoot = '',
  [long]$BrandId = 108526,
  [string]$BrandName = 'Asos'
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
if (-not $MediaRoot) { $MediaRoot = Join-Path $here 'media-staging' }
$uri = ($env:CONTENTHUB_URI -replace '/$', '')
if (-not $uri) { throw 'Set CONTENTHUB_URI (load local set-ch-env.ps1 first)' }

function Get-ContentHubToken {
  $clientId = $env:CONTENTHUB_CLIENT_ID
  $clientSecret = $env:CONTENTHUB_CLIENT_SECRET
  $user = $env:CONTENTHUB_USERNAME
  $pass = $env:CONTENTHUB_PASSWORD
  $apiKey = $env:CONTENTHUB_API_KEY
  if ($clientId -and $clientSecret) {
    try {
      $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
        grant_type    = 'client_credentials'
        client_id     = $clientId
        client_secret = $clientSecret
      } -ContentType 'application/x-www-form-urlencoded'
      return @{ Authorization = "Bearer $($tokenResponse.access_token)" }
    } catch { Write-Warning "client_credentials failed: $($_.Exception.Message)" }
    if ($user -and $pass) {
      $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
        grant_type    = 'password'
        client_id     = $clientId
        client_secret = $clientSecret
        username      = $user
        password      = $pass
      } -ContentType 'application/x-www-form-urlencoded'
      return @{ Authorization = "Bearer $($tokenResponse.access_token)" }
    }
  }
  if ($apiKey) { return @{ 'X-Auth-Token' = $apiKey } }
  throw 'Provide CONTENTHUB_CLIENT_ID/SECRET or CONTENTHUB_API_KEY'
}

$headers = Get-ContentHubToken
$brand = Invoke-RestMethod -Method Get -Uri "$uri/api/entities/$BrandId" -Headers $headers
Write-Host "Brand $($brand.properties.BrandName) id=$BrandId"

$csv = Join-Path $here 'media-maps\content-hub-asset-registry.csv'
if (-not (Test-Path $csv)) { throw "Missing $csv - run Upload-AsosContentHub.ps1 first" }
$rows = Import-Csv $csv
foreach ($row in $rows) {
  $assetId = $row.AssetId
  if (-not $assetId) { continue }
  Write-Host "PCMBrandToAsset $assetId -> $BrandId"
  $body = @{ parents = @(@{ href = "$uri/api/entities/$BrandId" }) } | ConvertTo-Json -Compress
  try {
    Invoke-RestMethod -Method Put -Uri "$uri/api/entities/$assetId/relations/PCMBrandToAsset" -Headers $headers -ContentType 'application/json' -Body $body | Out-Null
  } catch {
    Write-Warning "Brand stamp failed for ${assetId}: $($_.Exception.Message)"
  }
}
Write-Host "Asos brand metadata complete."

