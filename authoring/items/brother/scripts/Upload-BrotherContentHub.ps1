<#
.SYNOPSIS
  Upload Brother content-ready images to Sitecore Content Hub, create public links,
  and emit a CSV mapping Sitecore data items / Image fields for serialization.

.DESCRIPTION
  Reads CH credentials from environment variables (never commit secrets):

    CONTENTHUB_URI          e.g. https://starter-verticals-2.sitecoresandbox.cloud
    CONTENTHUB_CLIENT_ID    e.g. LogicApp
    CONTENTHUB_CLIENT_SECRET
    CONTENTHUB_USERNAME     e.g. Sitecore
    CONTENTHUB_PASSWORD

  Optional:
    CONTENTHUB_API_KEY      legacy X-Auth-Token (fallback if OAuth fails)
    BROTHER_MEDIA_ROOT      default: OneDrive ...\Brother\_content-ready

.EXAMPLE
  # Load secrets from a local file outside git, then run:
  . 'C:\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready\set-ch-env.ps1'
  .\Upload-BrotherContentHub.ps1
#>
[CmdletBinding()]
param(
  [string]$MediaRoot = $env:BROTHER_MEDIA_ROOT,
  [string]$OutDir = '',
  [string]$UploadConfigurationName = 'AssetUploadConfiguration',
  [switch]$SkipUpload,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

if (-not $MediaRoot) {
  $MediaRoot = 'C:\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready'
}
if (-not $OutDir) {
  $OutDir = Join-Path $MediaRoot 'ch-upload'
}
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$uri = ($env:CONTENTHUB_URI -replace '/$', '')
if (-not $uri) { throw 'Set CONTENTHUB_URI (e.g. https://starter-verticals-2.sitecoresandbox.cloud)' }

function Get-ContentHubToken {
  $clientId = $env:CONTENTHUB_CLIENT_ID
  $clientSecret = $env:CONTENTHUB_CLIENT_SECRET
  $user = $env:CONTENTHUB_USERNAME
  $pass = $env:CONTENTHUB_PASSWORD
  $apiKey = $env:CONTENTHUB_API_KEY

  if ($clientId -and $clientSecret) {
    # Prefer client_credentials when the OAuth client has an assigned user (SPDUploadAPI).
    try {
      Write-Host "Authenticating via OAuth client_credentials (client_id=$clientId)..."
      $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
        grant_type    = 'client_credentials'
        client_id     = $clientId
        client_secret = $clientSecret
      } -ContentType 'application/x-www-form-urlencoded'
      return @{
        Headers = @{ Authorization = "Bearer $($tokenResponse.access_token)" }
        Mode    = 'oauth-client_credentials'
      }
    } catch {
      Write-Warning "client_credentials failed: $($_.Exception.Message)"
    }

    if ($user -and $pass) {
      Write-Host "Authenticating via OAuth password grant (client_id=$clientId)..."
      $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
        grant_type    = 'password'
        client_id     = $clientId
        client_secret = $clientSecret
        username      = $user
        password      = $pass
      } -ContentType 'application/x-www-form-urlencoded'
      return @{
        Headers = @{ Authorization = "Bearer $($tokenResponse.access_token)" }
        Mode    = 'oauth-password'
      }
    }
  }

  if ($apiKey) {
    Write-Host 'Using CONTENTHUB_API_KEY as X-Auth-Token...'
    return @{
      Headers = @{ 'X-Auth-Token' = $apiKey }
      Mode    = 'api-key'
    }
  }

  throw 'Provide CONTENTHUB_CLIENT_ID/SECRET (client_credentials or password), or CONTENTHUB_API_KEY'
}

function Invoke-ChJson {
  param(
    [string]$Method,
    [string]$Path,
    [hashtable]$Headers,
    $Body = $null
  )
  $params = @{
    Method  = $Method
    Uri     = if ($Path -and $Path.StartsWith('http')) { $Path } else { "$uri$Path" }
    Headers = $Headers
  }
  if ($null -ne $Body) {
    $params.ContentType = 'application/json'
    $params.Body = if ($Body -is [string]) { $Body } else { ($Body | ConvertTo-Json -Depth 20 -Compress) }
  }
  return Invoke-RestMethod @params
}

# Deduped file list (prefer canonical product-* / persona-* names; skip alias duplicates)
$preferred = @(
  'brother-logo.png',
  'product-vc-500w.jpg',
  'product-vc-500w-with-laptop.jpg',
  'product-vc-500w-colour-labels.jpg',
  'product-vc-500w-five-widths.jpg',
  'product-vc-500w-auto-cutter.jpg',
  'lifestyle-home-office-desk.jpg',
  'campaign-at-your-side.jpg',
  'category-managed-print-service.jpg',
  'category-office-labelling.jpg',
  'persona-izzy-marketing-office.jpg',
  'persona-jack-cafe-laptop.jpg',
  'persona-jack-cafe-laptop-alt.jpg',
  'persona-business-commuter-city.jpg',
  'mps-visitor-badge-city-journey.jpg',
  'mps-time-efficiency-hero.jpg',
  'mps-peace-of-mind-celebration.jpg',
  'business-solutions-tech-abstract.jpg',
  'office-visitor-badge-maria-thomas.jpg',
  'promo-at-your-side-human-robot-heart.jpg',
  'promo-innovation-waveform.jpg',
  'promo-sitecore-ai-brain-circuit.jpg',
  'promo-abstract-blue-blocks.jpg',
  'promo-hero-wide-deck-photo.jpg'
)

# Include curated web-product downloads (Import-BrotherWebProductImages.ps1)
Get-ChildItem -Path $MediaRoot -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like 'web-*' -and $_.Extension -match '\.(jpg|jpeg|png|webp)$' } |
  ForEach-Object { if ($preferred -notcontains $_.Name) { $preferred += $_.Name } }

$files = @()
foreach ($name in $preferred) {
  $hit = Get-ChildItem -Path $MediaRoot -Recurse -File -Filter $name -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($hit) { $files += $hit }
}
Write-Host "Files queued: $($files.Count)"

# Sitecore field wiring plan (data item path -> Image field -> local file)
$fieldPlan = @(
  @{ DataItem = '/sitecore/content/brother/brother/Data/Headers/Site Header'; Field = 'Logo'; File = 'brother-logo.png'; Use = 'Header logo' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Hero Banners/Home Banner'; Field = 'Image'; File = 'product-vc-500w-with-laptop.jpg'; Use = 'Home hero' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Hero Banners/Home Banner'; Field = 'PromoImage'; File = 'product-vc-500w.jpg'; Use = 'Home hero promo image' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid'; Field = 'CardOneImage'; File = 'category-office-labelling.jpg'; Use = 'Promo card 1' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid'; Field = 'CardTwoImage'; File = 'category-managed-print-service.jpg'; Use = 'Promo card 2' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid'; Field = 'CardThreeImage'; File = 'mps-peace-of-mind-celebration.jpg'; Use = 'Promo card 3' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid - Jack'; Field = 'CardOneImage'; File = 'persona-jack-cafe-laptop.jpg'; Use = 'Jack promo 1' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid - Jack'; Field = 'CardTwoImage'; File = 'product-vc-500w-colour-labels.jpg'; Use = 'Jack promo 2' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid - Jack'; Field = 'CardThreeImage'; File = 'product-vc-500w.jpg'; Use = 'Jack promo 3' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid - Izzy'; Field = 'CardOneImage'; File = 'campaign-at-your-side.jpg'; Use = 'Izzy promo 1' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid - Izzy'; Field = 'CardTwoImage'; File = 'product-vc-500w-colour-labels.jpg'; Use = 'Izzy promo 2' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid - Izzy'; Field = 'CardThreeImage'; File = 'lifestyle-home-office-desk.jpg'; Use = 'Izzy promo 3' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid - Rick'; Field = 'CardOneImage'; File = 'mps-visitor-badge-city-journey.jpg'; Use = 'Rick promo 1' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid - Rick'; Field = 'CardTwoImage'; File = 'product-vc-500w-with-laptop.jpg'; Use = 'Rick promo 2' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Grids/Home Promo Grid - Rick'; Field = 'CardThreeImage'; File = 'product-vc-500w-colour-labels.jpg'; Use = 'Rick promo 3' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w'; Field = 'Image'; File = 'product-vc-500w.jpg'; Use = 'VC-500W PDP' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w'; Field = 'Image2'; File = 'product-vc-500w-with-laptop.jpg'; Use = 'VC-500W PDP gallery' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w'; Field = 'Image3'; File = 'product-vc-500w-colour-labels.jpg'; Use = 'VC-500W PDP gallery' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500wcr'; Field = 'Image'; File = 'product-vc-500w.jpg'; Use = 'VC-500WCR PDP' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-800'; Field = 'Image'; File = 'category-office-labelling.jpg'; Use = 'QL-800 PDP' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/supplies/label-printers/labels/cz/cz1003'; Field = 'Image'; File = 'product-vc-500w-colour-labels.jpg'; Use = 'CZ-1003 supplies' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/labelling-and-receipts/vc-500w'; Field = 'Image'; File = 'product-vc-500w.jpg'; Use = 'VC-500W overview' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/business-solutions/managed-print-service'; Field = 'Image'; File = 'mps-visitor-badge-city-journey.jpg'; Use = 'MPS hub hero' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/business-solutions/managed-print-service/mps-essential'; Field = 'Image'; File = 'mps-time-efficiency-hero.jpg'; Use = 'MPS Essential' }
  @{ DataItem = '/sitecore/content/brother/brother/Data/Promo Strips/At Your Side'; Field = 'Image'; File = 'promo-at-your-side-human-robot-heart.jpg'; Use = 'Promo strip' }
)

# Merge web-product field plan (overrides same DataItem+Field with store/web imagery)
$webPlanPath = Join-Path $OutDir 'web-product-field-plan.csv'
if (-not (Test-Path $webPlanPath)) {
  $webPlanPath = Join-Path (Join-Path $MediaRoot 'ch-upload') 'web-product-field-plan.csv'
}
if (Test-Path $webPlanPath) {
  $webPlan = Import-Csv $webPlanPath
  foreach ($w in $webPlan) {
    $fieldPlan = @($fieldPlan | Where-Object { -not ($_.DataItem -eq $w.DataItemPath -and $_.Field -eq $w.FieldName) })
    $fieldPlan += @{ DataItem = $w.DataItemPath; Field = $w.FieldName; File = $w.LocalFile; Use = $w.Purpose }
  }
  Write-Host "Merged web-product field plan ($($webPlan.Count) rows)"
}

if ($DryRun) {
  Write-Host 'DryRun: writing field plan only'
  $planRows = foreach ($p in $fieldPlan) {
    [pscustomobject]@{
      DataItemPath = $p.DataItem
      FieldName    = $p.Field
      LocalFile    = $p.File
      Purpose      = $p.Use
    }
  }
  $planRows | Export-Csv (Join-Path $OutDir 'field-plan.csv') -NoTypeInformation -Encoding UTF8
  exit 0
}

$auth = Get-ContentHubToken
$headers = $auth.Headers

# Smoke test
try {
  $null = Invoke-ChJson -Method Get -Path '/api/status' -Headers $headers
  Write-Host "Connected to $uri ($($auth.Mode))"
} catch {
  Write-Warning "api/status failed: $($_.Exception.Message) - continuing"
}

$script:uploadResults = @{}
$manifestPath = Join-Path $OutDir 'upload-manifest.json'
if (Test-Path $manifestPath) {
  $existing = Get-Content $manifestPath -Raw | ConvertFrom-Json
  foreach ($row in @($existing)) {
    if ($row.File -and ($row.PublicUrl -or $row.AssetId)) {
      $script:uploadResults[$row.File] = $row
    }
  }
  Write-Host "Loaded $($script:uploadResults.Count) existing uploads from manifest (dedupe)"
}

Add-Type -AssemblyName System.Net.Http

function Invoke-BrotherHubAssetUpload {
  param([System.IO.FileInfo]$File, [hashtable]$Headers)

  $fileName = $File.Name
  Write-Host "`n=== Upload $fileName ==="

  # 1) Request upload URL
  $reqBody = @{
    file_name               = $fileName
    file_size               = $File.Length
    upload_configuration    = @{ name = $UploadConfigurationName }
    action                  = @{ name = 'NewAsset' }
  }

  $reqHeaders = @{}
  if ($Headers) {
    foreach ($k in $Headers.Keys) { $reqHeaders[$k] = $Headers[$k] }
  }
  $reqHeaders['Accept'] = 'application/json'

  try {
    $req = Invoke-WebRequest -Method Post -Uri "$uri/api/v2.0/upload" `
      -Headers $reqHeaders `
      -ContentType 'application/json' `
      -Body ($reqBody | ConvertTo-Json -Compress) `
      -UseBasicParsing
  } catch {
    # Some tenants expect slightly different payload
    $reqBody2 = @{
      fileName             = $fileName
      fileSize             = $File.Length
      uploadConfiguration  = @{ name = $UploadConfigurationName }
      action               = @{ name = 'Create' }
    }
    $req = Invoke-WebRequest -Method Post -Uri "$uri/api/v2.0/upload" `
      -Headers $reqHeaders `
      -ContentType 'application/json' `
      -Body ($reqBody2 | ConvertTo-Json -Compress) `
      -UseBasicParsing
  }

  $location = $req.Headers['Location']
  if (-not $location) { $location = $req.Headers['location'] }
  if ($location -is [array]) { $location = $location[0] }
  $sessionJson = $req.Content
  Write-Host "Upload location: $location"

  # 2) Upload bytes
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
    if (-not $resp.IsSuccessStatusCode) {
      throw "Upload process failed: $($resp.StatusCode) $respBody"
    }
  } finally {
    $fs.Dispose()
    $multipart.Dispose()
  }

  # 3) Finalize
  $finalize = Invoke-WebRequest -Method Post -Uri "$uri/api/v2.0/upload/finalize" `
    -Headers $reqHeaders `
    -ContentType 'application/json' `
    -Body $sessionJson `
    -UseBasicParsing

  $final = $finalize.Content | ConvertFrom-Json
  # Response shapes vary — try common properties
  $assetId = $final.asset_id
  if (-not $assetId) { $assetId = $final.assetId }
  if (-not $assetId) { $assetId = $final.id }
  if (-not $assetId -and $final.asset) { $assetId = $final.asset.id }

  Write-Host "Finalize OK assetId=$assetId"
  return [pscustomobject]@{
    File          = $fileName
    AssetId       = "$assetId"
    FinalizeRaw   = $finalize.Content
  }
}

function New-BrotherHubPublicLink {
  param(
    [string]$AssetId,
    [hashtable]$Headers,
    [string]$FileName
  )

  $relative = ([guid]::NewGuid().ToString('N'))
  $body = @{
    properties = @{
      RelativeUrl            = $relative
      Resource               = 'downloadOriginal'
      ConversionConfiguration = @{}
    }
    entitydefinition = @{
      href = "$uri/api/entitydefinitions/M.PublicLink"
    }
    relations = @{
      AssetToPublicLink = @{
        parent = @{
          href = "$uri/api/entities/$AssetId"
        }
      }
    }
  }

  # Try parent singular then parents array (API versions differ)
  try {
    $created = Invoke-ChJson -Method Post -Path '/api/entitydefinitions/M.PublicLink/entities' -Headers $Headers -Body $body
  } catch {
    $body.relations.AssetToPublicLink = @{
      parents = @(@{ href = "$uri/api/entities/$AssetId" })
    }
    $created = Invoke-ChJson -Method Post -Path '/api/entitydefinitions/M.PublicLink/entities' -Headers $Headers -Body $body
  }

  $publicLinkId = $created.id
  $identifier = $created.identifier

  # Poll until Completed
  $publicUrl = ''
  $damId = ''
  for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Seconds 2
    $pl = Invoke-ChJson -Method Get -Path "/api/entities/$publicLinkId" -Headers $Headers
    $status = $pl.properties.Status
    if (-not $status) { $status = $pl.properties.status }
    Write-Host "  PublicLink status=$status"
    if ("$status" -match 'Completed|completed') {
      $rel = $pl.properties.RelativeUrl
      if (-not $rel) { $rel = $pl.properties.relativeUrl }
      if (-not $rel) { $rel = $relative }
      $publicUrl = "$uri/api/public/content/$rel"
      $damId = "$identifier"
      if (-not $damId) { $damId = "$($pl.identifier)" }
      break
    }
  }

  if (-not $publicUrl) {
    $publicUrl = "$uri/api/public/content/$relative"
  }

  return [pscustomobject]@{
    File         = $FileName
    AssetId      = $AssetId
    PublicLinkId = "$publicLinkId"
    DamId        = $damId
    PublicUrl    = $publicUrl
    RelativeUrl  = $relative
  }
}

if ($null -eq $script:uploadResults) {
  $script:uploadResults = @{}
}

if (-not $SkipUpload) {
  Write-Host "Starting uploads; tracking $($script:uploadResults.Count) existing result(s)"
  foreach ($f in @($files)) {
    if ($null -eq $f -or -not $f.FullName) {
      Write-Warning 'Skipping null/invalid file entry'
      continue
    }
    $fileName = [string]$f.Name
    $existing = $script:uploadResults[$fileName]
    if ($existing -and $existing.PublicUrl) {
      Write-Host "Skip existing $fileName"
      continue
    }
    try {
      $up = Invoke-BrotherHubAssetUpload -File $f -Headers $headers
      if (-not $up.AssetId -or $up.AssetId -eq '') {
        Write-Warning "No asset id for $fileName; saving finalize raw only"
        $script:uploadResults[$fileName] = $up
        continue
      }
      $link = New-BrotherHubPublicLink -AssetId $up.AssetId -Headers $headers -FileName $fileName
      $script:uploadResults[$fileName] = $link
      # persist incrementally
      @($script:uploadResults.Values) | ConvertTo-Json -Depth 6 | Set-Content $manifestPath -Encoding UTF8
    } catch {
      Write-Warning "FAILED ${fileName}: $($_.Exception.Message)"
      $script:uploadResults[$fileName] = [pscustomobject]@{
        File  = $fileName
        Error = $_.Exception.Message
      }
      @($script:uploadResults.Values) | ConvertTo-Json -Depth 6 | Set-Content $manifestPath -Encoding UTF8
    }
  }
}

# Build tracking CSV for Sitecore serialization
$rows = foreach ($plan in $fieldPlan) {
  $u = $script:uploadResults[$plan.File]
  $src = if ($u -and $u.PublicUrl) { $u.PublicUrl } else { '' }
  $dam = if ($u -and $u.DamId) { $u.DamId } else { '' }
  $asset = if ($u -and $u.AssetId) { $u.AssetId } else { '' }
  $err = if ($u -and $u.Error) { $u.Error } else { '' }

  $imageXml = ''
  if ($src) {
    $alt = [System.IO.Path]::GetFileNameWithoutExtension($plan.File)
    if ($dam) {
      $imageXml = "<Image src=`"$src`" dam-id=`"$dam`" alt=`"$alt`" dam-content-type=`"Image`" />"
    } else {
      $imageXml = "<Image src=`"$src`" alt=`"$alt`" />"
    }
  }

  [pscustomobject]@{
    DataItemPath   = $plan.DataItem
    FieldName      = $plan.Field
    LocalFile      = $plan.File
    Purpose        = $plan.Use
    ContentHubAssetId = $asset
    DamId          = $dam
    PublicUrl      = $src
    ImageFieldXml  = $imageXml
    Error          = $err
  }
}

$csvPath = Join-Path $OutDir 'brother-sitecore-image-field-map.csv'
$rows | Export-Csv $csvPath -NoTypeInformation -Encoding UTF8
@($script:uploadResults.Values) | ConvertTo-Json -Depth 6 | Set-Content $manifestPath -Encoding UTF8

Write-Host "`nWrote:"
Write-Host "  $csvPath"
Write-Host "  $manifestPath"
Write-Host "Next: patch serialized YAML Image fields from ImageFieldXml column, then push brother-scs."
