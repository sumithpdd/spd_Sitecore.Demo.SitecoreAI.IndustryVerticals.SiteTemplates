# Find or create Content Hub brand "Sheffield Hallam". Prints the brand id only.
$ErrorActionPreference = 'Stop'
. "$env:USERPROFILE\OneDrive - Sitecore\Work\Brother\_content-ready\set-ch-env.ps1"
$uri = ($env:CONTENTHUB_URI -replace '/$', '')
$tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
  grant_type    = 'client_credentials'
  client_id     = $env:CONTENTHUB_CLIENT_ID
  client_secret = $env:CONTENTHUB_CLIENT_SECRET
} -ContentType 'application/x-www-form-urlencoded'
$headers = @{ Authorization = "Bearer $($tokenResponse.access_token)" }
$query = [uri]::EscapeDataString("Definition.Name=='M.Brand' AND String('BrandName')=='Sheffield Hallam'")
$result = Invoke-RestMethod -Method Get -Uri "$uri/api/entities/query?query=$query&take=5" -Headers $headers
if ($result.total_items -ge 1) {
  Write-Output $result.items[0].id
  exit 0
}
$body = @{
  properties       = @{ BrandName = 'Sheffield Hallam' }
  entitydefinition = @{ href = "$uri/api/entitydefinitions/M.Brand" }
} | ConvertTo-Json -Compress
$created = Invoke-RestMethod -Method Post -Uri "$uri/api/entities" -Headers $headers -ContentType 'application/json' -Body $body
Write-Output $created.id
