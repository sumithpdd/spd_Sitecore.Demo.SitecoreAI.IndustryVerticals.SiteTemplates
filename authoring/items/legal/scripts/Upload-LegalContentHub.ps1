<#
.SYNOPSIS
  Upload Pinsent Masons images to Sitecore Content Hub and emit a Sitecore Image field map.

  Requires CONTENTHUB_* env (see Brother set-ch-env.ps1). Brand later: PinsentMason.
#>
[CmdletBinding()]
param(
  [string]$MediaRoot = $env:LEGAL_MEDIA_ROOT,
  [string]$OutDir = '',
  [string]$UploadConfigurationName = 'AssetUploadConfiguration',
  [switch]$SkipUpload
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
if (-not $MediaRoot) { $MediaRoot = Join-Path $here 'media-staging' }
if (-not $OutDir) { $OutDir = Join-Path $MediaRoot 'ch-upload' }
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

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

$preferred = @('pm-logo.png', 'pm-hero-slide-1.jpg', 'pm-expertise.png', 'pm-sectors.jpg', 'dawn-allen.png', 'pm-careers.jpg', 'pm-services.jpg', 'pm-locations.jpg', 'pm-newsletter.jpg')
$files = @()
foreach ($name in $preferred) {
  $hit = Get-ChildItem -Path $MediaRoot -Recurse -File -Filter $name -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($hit) { $files += $hit }
}
Write-Host "Files queued: $($files.Count)"

$fieldPlan = @(
  @{ DataItem = '/sitecore/content/legal/legal/Data/Headers/Main Header'; Field = 'Logo'; File = 'pm-logo.png'; Use = 'Header logo' }
  @{ DataItem = '/sitecore/content/legal/legal/Data/Footers/Main Footer'; Field = 'Logo'; File = 'pm-logo.png'; Use = 'Footer logo' }
  @{ DataItem = '/sitecore/content/legal/legal/Data/Hero Banners/Home Hero'; Field = 'Image'; File = 'pm-hero-slide-1.jpg'; Use = 'Home hero' }
  @{ DataItem = '/sitecore/content/legal/legal/Data/Promos/Expertise'; Field = 'PromoImageOne'; File = 'pm-expertise.png'; Use = 'Expertise promo' }
  @{ DataItem = '/sitecore/content/legal/legal/Data/Promos/Thinking'; Field = 'PromoImageOne'; File = 'pm-sectors.jpg'; Use = 'Thinking promo' }
  @{ DataItem = '/sitecore/content/legal/legal/Home/people/dawn-allen'; Field = 'Photo'; File = 'dawn-allen.png'; Use = 'Dawn Allen' }
  @{ DataItem = '/sitecore/content/legal/legal/Data/Promos/Careers'; Field = 'PromoImageOne'; File = 'pm-careers.jpg'; Use = 'Careers background' }
  @{ DataItem = '/sitecore/content/legal/legal/Data/HomeSections/Expertise'; Field = 'SectorsImage'; File = 'pm-sectors.jpg'; Use = 'Expertise sectors tab' }
  @{ DataItem = '/sitecore/content/legal/legal/Data/HomeSections/Expertise'; Field = 'ServicesImage'; File = 'pm-services.jpg'; Use = 'Expertise services tab' }
  @{ DataItem = '/sitecore/content/legal/legal/Data/HomeSections/Expertise'; Field = 'LocationsImage'; File = 'pm-locations.jpg'; Use = 'Expertise locations tab' }
  @{ DataItem = '/sitecore/content/legal/legal/Data/Promos/Newsletter'; Field = 'PromoImageOne'; File = 'pm-newsletter.jpg'; Use = 'Newsletter promo' }
)

$auth = Get-ContentHubToken
$headers = $auth.Headers
Write-Host "Connected to $uri ($($auth.Mode))"

$script:uploadResults = @{}
$manifestPath = Join-Path $OutDir 'upload-manifest.json'
if (Test-Path $manifestPath) {
  $existing = Get-Content $manifestPath -Raw | ConvertFrom-Json
  foreach ($row in @($existing)) {
    if ($row.File -and ($row.PublicUrl -or $row.AssetId)) { $script:uploadResults[$row.File] = $row }
  }
  Write-Host "Loaded $($script:uploadResults.Count) existing uploads"
}

Add-Type -AssemblyName System.Net.Http

function Invoke-LegalHubAssetUpload {
  param([System.IO.FileInfo]$File, [hashtable]$Headers)
  $fileName = $File.Name
  Write-Host "`n=== Upload $fileName ==="
  $reqBody = @{
    file_name            = $fileName
    file_size            = $File.Length
    upload_configuration = @{ name = $UploadConfigurationName }
    action               = @{ name = 'NewAsset' }
  }
  $reqHeaders = @{}
  foreach ($k in $Headers.Keys) { $reqHeaders[$k] = $Headers[$k] }
  $reqHeaders['Accept'] = 'application/json'
  try {
    $req = Invoke-WebRequest -Method Post -Uri "$uri/api/v2.0/upload" -Headers $reqHeaders -ContentType 'application/json' -Body ($reqBody | ConvertTo-Json -Compress) -UseBasicParsing
  } catch {
    $reqBody2 = @{
      fileName             = $fileName
      fileSize             = $File.Length
      uploadConfiguration  = @{ name = $UploadConfigurationName }
      action               = @{ name = 'Create' }
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
  return [pscustomobject]@{ File = $fileName; AssetId = "$assetId" }
}

function New-LegalHubPublicLink {
  param([string]$AssetId, [hashtable]$Headers, [string]$FileName)
  $relative = ([guid]::NewGuid().ToString('N'))
  $body = @{
    properties = @{ RelativeUrl = $relative; Resource = 'downloadOriginal'; ConversionConfiguration = @{} }
    entitydefinition = @{ href = "$uri/api/entitydefinitions/M.PublicLink" }
    relations = @{ AssetToPublicLink = @{ parent = @{ href = "$uri/api/entities/$AssetId" } } }
  }
  try {
    $created = Invoke-ChJson -Method Post -Path '/api/entitydefinitions/M.PublicLink/entities' -Headers $Headers -Body $body
  } catch {
    $body.relations.AssetToPublicLink = @{ parents = @(@{ href = "$uri/api/entities/$AssetId" }) }
    $created = Invoke-ChJson -Method Post -Path '/api/entitydefinitions/M.PublicLink/entities' -Headers $Headers -Body $body
  }
  $publicLinkId = $created.id
  $identifier = $created.identifier
  $publicUrl = ''; $damId = ''
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
  return [pscustomobject]@{ File = $FileName; AssetId = $AssetId; PublicLinkId = "$publicLinkId"; DamId = $damId; PublicUrl = $publicUrl; RelativeUrl = $relative }
}

if (-not $SkipUpload) {
  foreach ($f in @($files)) {
    $fileName = [string]$f.Name
    $existing = $script:uploadResults[$fileName]
    if ($existing -and $existing.PublicUrl) { Write-Host "Skip existing $fileName"; continue }
    try {
      $up = Invoke-LegalHubAssetUpload -File $f -Headers $headers
      $link = New-LegalHubPublicLink -AssetId $up.AssetId -Headers $headers -FileName $fileName
      $script:uploadResults[$fileName] = $link
      @($script:uploadResults.Values) | ConvertTo-Json -Depth 6 | Set-Content $manifestPath -Encoding UTF8
    } catch {
      Write-Warning "FAILED ${fileName}: $($_.Exception.Message)"
      $script:uploadResults[$fileName] = [pscustomobject]@{ File = $fileName; Error = $_.Exception.Message }
    }
  }
}

$rows = foreach ($plan in $fieldPlan) {
  $u = $script:uploadResults[$plan.File]
  $src = if ($u -and $u.PublicUrl) { $u.PublicUrl } else { '' }
  $dam = if ($u -and $u.DamId) { $u.DamId } else { '' }
  $alt = [System.IO.Path]::GetFileNameWithoutExtension($plan.File)
  $imageXml = if ($src -and $dam) { "<Image src=`"$src`" dam-id=`"$dam`" alt=`"$alt`" dam-content-type=`"Image`" />" } elseif ($src) { "<Image src=`"$src`" alt=`"$alt`" />" } else { '' }
  [pscustomobject]@{
    DataItemPath = $plan.DataItem; FieldName = $plan.Field; LocalFile = $plan.File; Purpose = $plan.Use
    DamId = $dam; PublicUrl = $src; ImageFieldXml = $imageXml; Error = $(if ($u) { $u.Error } else { '' })
  }
}
$csvPath = Join-Path $OutDir 'legal-sitecore-image-field-map.csv'
$rows | Export-Csv $csvPath -NoTypeInformation -Encoding UTF8
@($script:uploadResults.Values) | ConvertTo-Json -Depth 6 | Set-Content $manifestPath -Encoding UTF8
$registryRows = foreach ($key in @($script:uploadResults.Keys | Sort-Object)) {
  $u = $script:uploadResults[$key]
  if (-not $u -or -not $u.AssetId -or -not $u.PublicUrl) { continue }
  [pscustomobject]@{
    LocalFile         = $u.File
    ContentHubAssetId = $u.AssetId
    DamId             = $u.DamId
    PublicLinkId      = $u.PublicLinkId
    PublicUrl         = $u.PublicUrl
    RelativeUrl       = $u.RelativeUrl
  }
}
$registryRows | Export-Csv (Join-Path $OutDir 'content-hub-asset-registry.csv') -NoTypeInformation -Encoding UTF8
$repoMaps = Join-Path $here 'media-maps'
New-Item -ItemType Directory -Force -Path $repoMaps | Out-Null
$rows | Export-Csv (Join-Path $repoMaps 'legal-sitecore-image-field-map.csv') -NoTypeInformation -Encoding UTF8
Write-Host "Wrote $csvPath"
Write-Host "Next: .\Set-LegalContentHubMetadata.ps1 then node patch-legal-dam-images.mjs"
