<#
.SYNOPSIS
  Create Brother demo products in Content Hub PCM (M.PCM.Product) and attach
  existing DAM assets. Dedupes by ProductNumber. Writes product inventory CSV.

.DESCRIPTION
  Creates/ensures:
    - M.PCM.ProductFamily: Brother Labelling, Brother Printers, Brother Scanners, Brother Supplies
    - M.PCM.Product per demo SKU (from products-catalog)
    - Relations: BrandToProduct (Brother), PCMProductFamilyToProduct, PCMProductToMasterAsset

  Inventory (no secrets):
    media-maps/content-hub-product-registry.csv
    media-maps/content-hub-product-family-registry.csv
    (+ copies under BROTHER_MEDIA_ROOT\ch-upload)

.EXAMPLE
  . 'C:\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready\set-ch-env.ps1'
  .\New-BrotherContentHubProducts.ps1
  .\New-BrotherContentHubProducts.ps1 -WhatIf
#>
[CmdletBinding()]
param(
  [string]$MediaRoot = $env:BROTHER_MEDIA_ROOT,
  [string]$BrandName = 'Brother',
  [switch]$WhatIf,
  [switch]$SkipAssetAttach
)

$ErrorActionPreference = 'Stop'

if (-not $MediaRoot) {
  $MediaRoot = 'C:\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready'
}
$uploadDir = Join-Path $MediaRoot 'ch-upload'
$repoMaps = Join-Path $PSScriptRoot 'media-maps'
New-Item -ItemType Directory -Force -Path $uploadDir, $repoMaps | Out-Null

$uri = ($env:CONTENTHUB_URI -replace '/$', '')
if (-not $uri) { throw 'Set CONTENTHUB_URI (dot-source set-ch-env.ps1 first)' }

$registryPath = Join-Path $repoMaps 'content-hub-asset-registry.csv'
if (-not (Test-Path $registryPath)) {
  $registryPath = Join-Path $uploadDir 'content-hub-asset-registry.csv'
}
if (-not (Test-Path $registryPath)) { throw "Missing asset registry: $registryPath" }

$assetByFile = @{}
Import-Csv $registryPath | ForEach-Object {
  if ($_.LocalFile -and $_.ContentHubAssetId) { $assetByFile[$_.LocalFile] = $_ }
}

function Get-ContentHubToken {
  $clientId = $env:CONTENTHUB_CLIENT_ID
  $clientSecret = $env:CONTENTHUB_CLIENT_SECRET
  if (-not $clientId -or -not $clientSecret) { throw 'Set CONTENTHUB_CLIENT_ID / CONTENTHUB_CLIENT_SECRET' }
  $tokenResponse = Invoke-RestMethod -Method Post -Uri "$uri/oauth/token" -Body @{
    grant_type    = 'client_credentials'
    client_id     = $clientId
    client_secret = $clientSecret
  } -ContentType 'application/x-www-form-urlencoded'
  return @{
    Authorization = "Bearer $($tokenResponse.access_token)"
    Accept        = 'application/json'
  }
}

function Invoke-ChJson {
  param([string]$Method, [string]$Path, [hashtable]$Headers, $Body = $null)
  $params = @{
    Method  = $Method
    Uri     = if ($Path -match '^http') { $Path } else { "$uri$Path" }
    Headers = $Headers
  }
  if ($null -ne $Body) {
    $params.Headers = $Headers.Clone()
    $params.Headers['Content-Type'] = 'application/json'
    $params.Body = if ($Body -is [string]) { $Body } else { ($Body | ConvertTo-Json -Depth 14 -Compress) }
  }
  return Invoke-RestMethod @params
}

function Find-Entities {
  param([hashtable]$Headers, [string]$Query, [int]$Take = 20)
  $enc = [uri]::EscapeDataString($Query)
  return Invoke-ChJson -Method Get -Path "/api/entities/query?query=$enc&take=$Take" -Headers $Headers
}

function Get-EntityIdFromHref([string]$Href) {
  if ($Href -match '/entities/(\d+)$') { return $Matches[1] }
  return ''
}

function Ensure-ProductFamily {
  param([hashtable]$Headers, [string]$FamilyName)
  $q = "Definition.Name=='M.PCM.ProductFamily' AND String('ProductFamilyName')=='$FamilyName'"
  $existing = Find-Entities -Headers $Headers -Query $q -Take 5
  if ($existing.total_items -gt 0) {
    return [pscustomobject]@{
      Id     = [string]$existing.items[0].id
      Name   = $FamilyName
      Status = 'Existing'
    }
  }
  if ($WhatIf) {
    Write-Host "WhatIf: create family $FamilyName"
    return [pscustomobject]@{ Id = ''; Name = $FamilyName; Status = 'WouldCreate' }
  }
  $body = @{
    properties       = @{ ProductFamilyName = $FamilyName }
    entitydefinition = @{ href = "$uri/api/entitydefinitions/M.PCM.ProductFamily" }
  }
  $created = Invoke-ChJson -Method Post -Path '/api/entitydefinitions/M.PCM.ProductFamily/entities' -Headers $Headers -Body $body
  return [pscustomobject]@{
    Id     = [string]$created.id
    Name   = $FamilyName
    Status = 'Created'
  }
}

function Resolve-AssetIds([string[]]$LocalFiles) {
  $ids = @()
  foreach ($f in $LocalFiles) {
    if (-not $f) { continue }
    $row = $assetByFile[$f]
    if (-not $row) {
      Write-Warning "Asset not in registry (skip): $f"
      continue
    }
    $ids += [string]$row.ContentHubAssetId
  }
  return $ids
}

# Demo products aligned with industry-verticals/brother products-catalog + Sitecore devices
$products = @(
  @{
    Sku = 'VC500WZU1'; Slug = 'vc-500w'; Name = 'VC-500W Full Colour Label Printer'; Family = 'Brother Labelling'
    Slogan = 'ZINK Zero Ink full-colour labels'
    Description = 'Print crisp full colour labels from your PC, Mac, smartphone or tablet. Compact, quiet, and ink-free.'
    Price = 149.99
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w'
    Assets = @('web-vc500w-store-1.jpg', 'web-vc500w-store-2.jpg', 'web-vc500w-photo-printing.jpg')
  }
  @{
    Sku = 'QL800ZU1'; Slug = 'ql-800'; Name = 'QL-800 Label Printer'; Family = 'Brother Labelling'
    Slogan = 'High-speed black & red desktop labels'
    Description = 'Create professional black and red labels in seconds for warehouses, offices and retail.'
    Price = 89.99
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-800'
    Assets = @('web-ql-800-gallery-1.jpg', 'web-ql-800-situ-1.jpg', 'web-ql-800-dk-labels.jpg')
  }
  @{
    Sku = 'QL820NWBZU1'; Slug = 'ql-820nwb'; Name = 'QL-820NWB Network Label Printer'; Family = 'Brother Labelling'
    Slogan = 'Wireless & networked label printing'
    Description = 'Share labelling across your team with Wi-Fi, Bluetooth and wired Ethernet connectivity.'
    Price = 189.99
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-820nwb'
    Assets = @('web-ql-800-gallery-2.jpg', 'web-ql-800-situ-2.jpg', 'web-ql-800-gallery-3.jpg')
  }
  @{
    Sku = 'PTP750WZU1'; Slug = 'pt-p750w'; Name = 'PT-P750W Handheld Labeller'; Family = 'Brother Labelling'
    Slogan = 'Wireless TZe tape labelling on the go'
    Description = 'Create durable laminated labels from a PC, Mac or smartphone with Wi-Fi and NFC.'
    Price = 119.99
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/label-printer/pt/pt-p750w'
    Assets = @('web-office-labelling-1.jpg', 'product-vc-500w-five-widths.jpg', 'web-office-labelling-3.jpg')
  }
  @{
    Sku = 'TD4550DNWBZU1'; Slug = 'td-4550dnwb'; Name = 'TD-4550DNWB Desktop Barcode Printer'; Family = 'Brother Labelling'
    Slogan = '4-inch industrial barcode labels'
    Description = 'Print shipping, inventory and compliance labels with USB, LAN, Wi-Fi and Bluetooth.'
    Price = 429.00
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/label-printer/td/td-4550dnwb'
    Assets = @('web-office-labelling-4.jpg', 'web-ql-800-gallery-4.jpg', 'web-overview-supplies.jpg')
  }
  @{
    Sku = 'DCPL3520CDWZU1'; Slug = 'dcp-l3520cdw'; Name = 'DCP-L3520CDW Colour Laser'; Family = 'Brother Printers'
    Slogan = 'Compact colour laser for home office'
    Description = 'Print, copy and scan in colour with wireless connectivity and automatic duplex.'
    Price = 279.99
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/printers/dcp/dcp-l3520cdw'
    Assets = @('web-mps-essential-purchase.jpg', 'product-vc-500w-with-laptop.jpg', 'lifestyle-home-office-desk.jpg')
  }
  @{
    Sku = 'MFCL8390CDWZU1'; Slug = 'mfc-l8390cdw'; Name = 'MFC-L8390CDW Business Colour Laser'; Family = 'Brother Printers'
    Slogan = 'A4 colour laser MFP for workgroups'
    Description = 'High-volume colour printing with fax, large paper capacity and secure network features.'
    Price = 449.00
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/printers/mfc/mfc-l8390cdw'
    Assets = @('product-vc-500w-with-laptop.jpg', 'web-mps-hero.jpg', 'web-mps-essential-purchase.jpg')
  }
  @{
    Sku = 'HLL2460DNZU1'; Slug = 'hl-l2460dn'; Name = 'HL-L2460DN Mono Laser'; Family = 'Brother Printers'
    Slogan = 'Reliable black & white network printer'
    Description = 'Fast mono laser printing with duplex and wired networking for busy desks.'
    Price = 159.99
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/printers/hl/hl-l2460dn'
    Assets = @('web-mps-hero.jpg', 'web-mps-essential-purchase.jpg', 'product-vc-500w-with-laptop.jpg')
  }
  @{
    Sku = 'ADS1800WZU1'; Slug = 'ads-1800w'; Name = 'ADS-1800W Mobile Scanner'; Family = 'Brother Scanners'
    Slogan = 'Wireless portable document scanner'
    Description = 'Scan receipts, IDs and documents on the move with Wi-Fi and USB-C power.'
    Price = 219.99
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/scanners/ads/ads-1800w'
    Assets = @('web-office-labelling-2.jpg', 'lifestyle-home-office-desk.jpg', 'web-office-labelling-1.jpg')
  }
  @{
    Sku = 'ADS4900WZU1'; Slug = 'ads-4900w'; Name = 'ADS-4900W Workgroup Scanner'; Family = 'Brother Scanners'
    Slogan = 'High-volume desktop document scanning'
    Description = 'Fast duplex scanning for shared offices with network connectivity and advanced image processing.'
    Price = 699.00
    SitecorePath = '/sitecore/content/brother/brother/Home/devices/scanners/ads/ads-4900w'
    Assets = @('web-office-labelling-3.jpg', 'web-office-labelling-4.jpg', 'web-office-labelling-2.jpg')
  }
  @{
    Sku = 'CZ1003ZU1'; Slug = 'cz1003'; Name = 'CZ-1003 Colour Label Roll'; Family = 'Brother Supplies'
    Slogan = 'Genuine colour labels for VC-500W'
    Description = 'Continuous colour label media matched to Brother VC-500W full colour label printers.'
    Price = 24.99
    SitecorePath = '/sitecore/content/brother/brother/Home/supplies/label-printers/labels/cz/cz1003'
    Assets = @('web-cz-1003-main.jpg', 'web-cz-1003-2.jpg', 'web-overview-supplies.jpg')
  }
)

$headers = Get-ContentHubToken
Write-Host "Connected to $uri"

# Brand
$brandQ = "Definition.Name=='M.Brand' AND String('BrandName')=='$BrandName'"
$brandHit = Find-Entities -Headers $headers -Query $brandQ -Take 3
if ($brandHit.total_items -lt 1) { throw "Brand '$BrandName' not found in Content Hub" }
$brandId = [string]$brandHit.items[0].id
Write-Host "Brand $BrandName id=$brandId"

# Families
$familyNames = $products.Family | Select-Object -Unique
$familyMap = @{}
$familyRows = @()
foreach ($fn in $familyNames) {
  $fam = Ensure-ProductFamily -Headers $headers -FamilyName $fn
  $familyMap[$fn] = $fam.Id
  $familyRows += [pscustomobject]@{
    ProductFamilyName = $fn
    ContentHubFamilyId = $fam.Id
    Status = $fam.Status
    Definition = 'M.PCM.ProductFamily'
  }
  Write-Host "Family $($fam.Status): $fn ($($fam.Id))"
}

$productRows = @()
foreach ($p in $products) {
  $sku = $p.Sku
  $existing = Find-Entities -Headers $headers -Query "Definition.Name=='M.PCM.Product' AND String('ProductNumber')=='$sku'" -Take 3
  $productId = ''
  $status = ''
  $identifier = ''

  if ($existing.total_items -gt 0) {
    $productId = [string]$existing.items[0].id
    $identifier = [string]$existing.items[0].identifier
    $status = 'Existing'
    Write-Host "Skip create (exists): $sku -> $productId"
  } elseif ($WhatIf) {
    $status = 'WouldCreate'
    Write-Host "WhatIf: create product $sku ($($p.Name))"
  } else {
    $familyId = $familyMap[$p.Family]
    $assetIds = Resolve-AssetIds $p.Assets
    $relations = @{
      BrandToProduct = @{
        parents = @(@{ href = "$uri/api/entities/$brandId" })
      }
      PCMProductFamilyToProduct = @{
        parents = @(@{ href = "$uri/api/entities/$familyId" })
      }
    }
    if (-not $SkipAssetAttach -and $assetIds.Count -gt 0) {
      $relations.PCMProductToMasterAsset = @{
        children = @($assetIds | ForEach-Object { @{ href = "$uri/api/entities/$_" } })
      }
    }
    $body = @{
      properties = @{
        ProductName             = $p.Name
        ProductNumber           = $sku
        ProductShortDescription = @{ 'en-US' = $p.Slogan }
        ProductLongDescription  = @{ 'en-US' = "<p>$($p.Description)</p>" }
        ProductPrice            = [double]$p.Price
      }
      entitydefinition = @{ href = "$uri/api/entitydefinitions/M.PCM.Product" }
      relations        = $relations
    }
    $created = Invoke-ChJson -Method Post -Path '/api/entitydefinitions/M.PCM.Product/entities' -Headers $headers -Body $body
    $productId = [string]$created.id
    $identifier = [string]$created.identifier
    $status = 'Created'
    Write-Host "Created product $sku -> $productId"
  }

  # Refresh / ensure relations on existing products (brand, family, assets)
  if ($productId -and -not $WhatIf) {
    $familyId = $familyMap[$p.Family]
    if ($familyId) {
      Invoke-ChJson -Method Put -Path "/api/entities/$productId/relations/BrandToProduct" -Headers $headers -Body @{
        parents = @(@{ href = "$uri/api/entities/$brandId" })
      } | Out-Null
      Invoke-ChJson -Method Put -Path "/api/entities/$productId/relations/PCMProductFamilyToProduct" -Headers $headers -Body @{
        parents = @(@{ href = "$uri/api/entities/$familyId" })
      } | Out-Null
    }
    if (-not $SkipAssetAttach) {
      $assetIds = Resolve-AssetIds $p.Assets
      if ($assetIds.Count -gt 0) {
        Invoke-ChJson -Method Put -Path "/api/entities/$productId/relations/PCMProductToMasterAsset" -Headers $headers -Body @{
          children = @($assetIds | ForEach-Object { @{ href = "$uri/api/entities/$_" } })
        } | Out-Null
        if ($status -eq 'Existing') { $status = 'UpdatedRelations' }
      }
    }
  }

  $assetIdsFinal = Resolve-AssetIds $p.Assets
  $assetFiles = ($p.Assets | Where-Object { $assetByFile.ContainsKey($_) }) -join '|'
  $productRows += [pscustomobject]@{
    Sku                  = $sku
    Slug                 = $p.Slug
    ProductName          = $p.Name
    FamilyName           = $p.Family
    FamilyId             = $familyMap[$p.Family]
    BrandName            = $BrandName
    BrandId              = $brandId
    ContentHubProductId  = $productId
    ContentHubIdentifier = $identifier
    Definition           = 'M.PCM.Product'
    SitecorePath         = $p.SitecorePath
    MasterAssetIds       = ($assetIdsFinal -join '|')
    MasterAssetFiles     = $assetFiles
    Status               = $status
    PortalUrl            = if ($productId) { "$uri/en-us/ch-products/ch-productssearch/ch-productdetails/${productId}?tab28428=Details" } else { '' }
  }
}

$familyCsv = Join-Path $repoMaps 'content-hub-product-family-registry.csv'
$productCsv = Join-Path $repoMaps 'content-hub-product-registry.csv'
$familyRows | Export-Csv $familyCsv -NoTypeInformation -Encoding UTF8
$productRows | Export-Csv $productCsv -NoTypeInformation -Encoding UTF8
$familyRows | Export-Csv (Join-Path $uploadDir 'content-hub-product-family-registry.csv') -NoTypeInformation -Encoding UTF8
$productRows | Export-Csv (Join-Path $uploadDir 'content-hub-product-registry.csv') -NoTypeInformation -Encoding UTF8

Write-Host ""
Write-Host "Families: $($familyRows.Count) -> $familyCsv"
Write-Host "Products: $($productRows.Count) -> $productCsv"
$productRows | Group-Object Status | ForEach-Object { Write-Host ("  {0}={1}" -f $_.Name, $_.Count) }
Write-Host "Portal: $uri/en-us/ch-products"
