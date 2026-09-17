<#
.SYNOPSIS
  Upload Openhand images to Sitecore Content Hub and emit Image field XML.

  Requires CONTENTHUB_* env (Brother set-ch-env.ps1). Never commit secrets.
#>
[CmdletBinding()]
param(
  [string]$MediaRoot = '',
  [string]$UploadConfigurationName = 'AssetUploadConfiguration'
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
if (-not $MediaRoot) { $MediaRoot = Join-Path $here 'media-staging' }
$outDir = Join-Path $MediaRoot 'ch-upload'
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$repoMaps = Join-Path $here 'media-maps'
New-Item -ItemType Directory -Force -Path $repoMaps | Out-Null

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
      Write-Host "Authenticating via OAuth client_credentials (client_id=$clientId)..."
      $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
        grant_type    = 'client_credentials'
        client_id     = $clientId
        client_secret = $clientSecret
      } -ContentType 'application/x-www-form-urlencoded'
      return @{ Headers = @{ Authorization = "Bearer $($tokenResponse.access_token)" }; Mode = 'oauth-client_credentials' }
    } catch { Write-Warning "client_credentials failed: $($_.Exception.Message)" }
    if ($user -and $pass) {
      $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
        grant_type    = 'password'
        client_id     = $clientId
        client_secret = $clientSecret
        username      = $user
        password      = $pass
      } -ContentType 'application/x-www-form-urlencoded'
      return @{ Headers = @{ Authorization = "Bearer $($tokenResponse.access_token)" }; Mode = 'oauth-password' }
    }
  }
  if ($apiKey) { return @{ Headers = @{ 'X-Auth-Token' = $apiKey }; Mode = 'api-key' } }
  throw 'Provide CONTENTHUB_CLIENT_ID/SECRET or CONTENTHUB_API_KEY'
}

function Invoke-ChJson {
  param([string]$Method, [string]$Path, [hashtable]$Headers, $Body = $null)
  $params = @{ Method = $Method; Uri = if ($Path -match '^http') { $Path } else { "$uri$Path" }; Headers = $Headers }
  if ($null -ne $Body) {
    $params.ContentType = 'application/json'
    $params.Body = if ($Body -is [string]) { $Body } else { ($Body | ConvertTo-Json -Depth 20 -Compress) }
  }
  return Invoke-RestMethod @params
}

function Invoke-HubAssetUpload {
  param([System.IO.FileInfo]$File, [hashtable]$Headers)
  $fileName = $File.Name
  Write-Host "`n=== Upload $fileName ==="
  $reqHeaders = @{}
  foreach ($k in $Headers.Keys) { $reqHeaders[$k] = $Headers[$k] }
  $reqHeaders['Accept'] = 'application/json'
  $reqBody = @{
    file_name            = $fileName
    file_size            = $File.Length
    upload_configuration = @{ name = $UploadConfigurationName }
    action               = @{ name = 'NewAsset' }
  }
  try {
    $req = Invoke-WebRequest -Method Post -Uri "$uri/api/v2.0/upload" -Headers $reqHeaders -ContentType 'application/json' -Body ($reqBody | ConvertTo-Json -Compress) -UseBasicParsing
  } catch {
    $reqBody2 = @{
      fileName            = $fileName
      fileSize            = $File.Length
      uploadConfiguration = @{ name = $UploadConfigurationName }
      action              = @{ name = 'Create' }
    }
    $req = Invoke-WebRequest -Method Post -Uri "$uri/api/v2.0/upload" -Headers $reqHeaders -ContentType 'application/json' -Body ($reqBody2 | ConvertTo-Json -Compress) -UseBasicParsing
  }
  $location = $req.Headers['Location']
  if (-not $location) { $location = $req.Headers['location'] }
  if ($location -is [array]) { $location = $location[0] }
  $sessionJson = $req.Content
  $uploadUri = if ("$location" -match '^http') { "$location" } else { "$uri$location" }
  $multipart = [System.Net.Http.MultipartFormDataContent]::new()
  $fs = [System.IO.File]::OpenRead($File.FullName)
  try {
    $streamContent = [System.Net.Http.StreamContent]::new($fs)
    $streamContent.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::Parse('application/octet-stream')
    $multipart.Add($streamContent, 'file', $fileName)
    $http = [System.Net.Http.HttpClient]::new()
    foreach ($k in $Headers.Keys) { $http.DefaultRequestHeaders.TryAddWithoutValidation($k, [string]$Headers[$k]) | Out-Null }
    $resp = $http.PostAsync($uploadUri, $multipart).Result
    $respBody = $resp.Content.ReadAsStringAsync().Result
    if (-not $resp.IsSuccessStatusCode) { throw "Upload process failed: $($resp.StatusCode) $respBody" }
  } finally { $fs.Dispose(); $multipart.Dispose() }
  $finalize = Invoke-WebRequest -Method Post -Uri "$uri/api/v2.0/upload/finalize" -Headers $reqHeaders -ContentType 'application/json' -Body $sessionJson -UseBasicParsing
  $final = $finalize.Content | ConvertFrom-Json
  $assetId = $final.asset_id; if (-not $assetId) { $assetId = $final.assetId }; if (-not $assetId) { $assetId = $final.id }
  Write-Host "Finalize OK assetId=$assetId"
  return "$assetId"
}

function New-HubPublicLink {
  param([string]$AssetId, [hashtable]$Headers, [string]$FileName)
  $relative = ([guid]::NewGuid().ToString('N'))
  $body = @{
    properties       = @{ RelativeUrl = $relative; Resource = 'downloadOriginal'; ConversionConfiguration = @{} }
    entitydefinition = @{ href = "$uri/api/entitydefinitions/M.PublicLink" }
    relations        = @{ AssetToPublicLink = @{ parent = @{ href = "$uri/api/entities/$AssetId" } } }
  }
  try {
    $created = Invoke-ChJson -Method Post -Path '/api/entitydefinitions/M.PublicLink/entities' -Headers $Headers -Body $body
  } catch {
    $body.relations.AssetToPublicLink = @{ parents = @(@{ href = "$uri/api/entities/$AssetId" }) }
    $created = Invoke-ChJson -Method Post -Path '/api/entitydefinitions/M.PublicLink/entities' -Headers $Headers -Body $body
  }
  $publicLinkId = $created.id
  $identifier = $created.identifier
  $publicUrl = ''
  $damId = ''
  for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Seconds 2
    $pl = Invoke-ChJson -Method Get -Path "/api/entities/$publicLinkId" -Headers $Headers
    $status = $pl.properties.Status; if (-not $status) { $status = $pl.properties.status }
    Write-Host "  PublicLink status=$status"
    if ("$status" -match 'Completed|completed') {
      $rel = $pl.properties.RelativeUrl; if (-not $rel) { $rel = $relative }
      $publicUrl = "$uri/api/public/content/$rel"
      $damId = "$identifier"; if (-not $damId) { $damId = "$($pl.identifier)" }
      break
    }
  }
  if (-not $publicUrl) { $publicUrl = "$uri/api/public/content/$relative" }
  $alt = [System.IO.Path]::GetFileNameWithoutExtension($FileName)
  $imageXml = "<Image src=`"$publicUrl`" dam-id=`"$damId`" alt=`"$alt`" dam-content-type=`"Image`" />"
  return [pscustomobject]@{
    File          = $FileName
    AssetId       = $AssetId
    PublicLinkId  = "$publicLinkId"
    DamId         = $damId
    PublicUrl     = $publicUrl
    RelativeUrl   = $relative
    ImageFieldXml = $imageXml
  }
}

$auth = Get-ContentHubToken
$headers = $auth.Headers
Write-Host "Connected to $uri ($($auth.Mode))"

Add-Type -AssemblyName System.Net.Http

$manifestPath = Join-Path $outDir 'upload-manifest.json'
$script:uploadResults = @{}
if (Test-Path $manifestPath) {
  $existing = Get-Content $manifestPath -Raw | ConvertFrom-Json
  foreach ($row in @($existing)) {
    if ($row.File -and $row.PublicUrl) { $script:uploadResults[$row.File] = $row }
  }
  Write-Host "Loaded $($script:uploadResults.Count) existing uploads"
}

$files = @()
$logo = Get-Item -Path (Join-Path $MediaRoot 'openhand-logo.png') -ErrorAction SilentlyContinue
if ($logo) { $files += $logo }
$files += @(Get-ChildItem -Path (Join-Path $MediaRoot 'photos') -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' })
if (-not $files.Count) {
  $files += @(Get-ChildItem -Path $MediaRoot -Recurse -File -Include *.jpg,*.jpeg,*.png | Where-Object { $_.Directory.Name -ne 'ch-upload' })
}
Write-Host "Files queued: $($files.Count)"

foreach ($f in @($files)) {
  $fileName = [string]$f.Name
  if ($script:uploadResults[$fileName] -and $script:uploadResults[$fileName].PublicUrl) {
    Write-Host "Skip existing $fileName"
    continue
  }
  try {
    $assetId = Invoke-HubAssetUpload -File $f -Headers $headers
    $link = New-HubPublicLink -AssetId $assetId -Headers $headers -FileName $fileName
    $script:uploadResults[$fileName] = $link
    @($script:uploadResults.Values) | ConvertTo-Json -Depth 6 | Set-Content $manifestPath -Encoding UTF8
  } catch {
    Write-Warning "FAILED ${fileName}: $($_.Exception.Message)"
  }
}

$rows = @($script:uploadResults.Values) | Where-Object { $_.PublicUrl }
$csvPath = Join-Path $outDir 'nonprofit-sitecore-image-field-map.csv'
$rows | Export-Csv $csvPath -NoTypeInformation -Encoding UTF8
$rows | Export-Csv (Join-Path $repoMaps 'nonprofit-sitecore-image-field-map.csv') -NoTypeInformation -Encoding UTF8
@($rows) | ConvertTo-Json -Depth 6 | Set-Content $manifestPath -Encoding UTF8
$map = @{}
foreach ($row in $rows) { $map[$row.File] = $row.ImageFieldXml }
$map | ConvertTo-Json | Set-Content (Join-Path $repoMaps 'nonprofit-image-xml.json') -Encoding UTF8
Write-Host "Wrote $csvPath"
