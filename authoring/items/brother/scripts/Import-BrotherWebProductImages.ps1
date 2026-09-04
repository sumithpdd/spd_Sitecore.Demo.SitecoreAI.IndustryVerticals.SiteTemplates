<#
.SYNOPSIS
  Download curated product / store / MPS images from Brother UK pages into _content-ready,
  then ready for Upload-BrotherContentHub.ps1 (dedupe by LocalFile name).

.DESCRIPTION
  Sources are public page URLs (marketing + store). Images come from Brother Sitecore media
  and Brother's production Content Hub public CDN (bie-p-001) — the same assets the live
  sites already reference. No API keys required for download.

.EXAMPLE
  .\Import-BrotherWebProductImages.ps1
  .\Import-BrotherWebProductImages.ps1 -SkipExisting
#>
[CmdletBinding()]
param(
  [string]$MediaRoot = $env:BROTHER_MEDIA_ROOT,
  [switch]$SkipExisting
)

$ErrorActionPreference = 'Stop'
if (-not $MediaRoot) {
  $MediaRoot = 'C:\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready'
}
$dest = Join-Path $MediaRoot 'web-products'
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
$ch = 'https://bie-p-001.sitecorecontenthub.cloud/api/public/content'
$chd = 'https://bie-p-001-delivery.sitecorecontenthub.cloud/api/public/content'
$store = 'https://store.brother.co.uk/-/media'
$www = 'https://www.brother.co.uk/-/media'

# Curated product / related / page hero assets (canonical LocalFile -> source URL + provenance)
$assets = @(
  # --- VC-500W marketing (brother.co.uk/labelling-and-receipts/vc-500w) ---
  @{ File = 'web-vc-500w-hero-crystals.jpg'; Url = "$ch/banners_labelling_vc-500w_vc500wcristals03"; Source = 'https://www.brother.co.uk/labelling-and-receipts/vc-500w'; Role = 'Page hero' }
  @{ File = 'web-vc-500w-colour-printing.jpg'; Url = "$ch/feature-module-images_global-taxonomy_labelling_vc-500w_full_colour_printing"; Source = 'https://www.brother.co.uk/labelling-and-receipts/vc-500w'; Role = 'Feature' }
  @{ File = 'web-vc-500w-five-widths.jpg'; Url = "$ch/feature-module-images_global-taxonomy_labelling_vc-500w_five_widths"; Source = 'https://www.brother.co.uk/labelling-and-receipts/vc-500w'; Role = 'Feature' }
  @{ File = 'web-vc-500w-with-laptop.jpg'; Url = "$ch/feature-module-images_global-taxonomy_labelling_vc-500w-with-laptop"; Source = 'https://www.brother.co.uk/labelling-and-receipts/vc-500w'; Role = 'Feature' }
  @{ File = 'web-vc-500w-auto-cutter.jpg'; Url = "$ch/feature-module-images_global-taxonomy_labelling_vc-500w_auto_cutter"; Source = 'https://www.brother.co.uk/labelling-and-receipts/vc-500w'; Role = 'Feature' }
  @{ File = 'web-vc-500w-wifi-app.jpg'; Url = "$ch/promos_promo-tile-block_vc-500w-vertical-applications_wi-fi-app-printing"; Source = 'https://www.brother.co.uk/labelling-and-receipts/vc-500w'; Role = 'Promo tile' }

  # --- VC-500W / VC-500WCR store gallery (store.brother.co.uk) ---
  @{ File = 'web-vc500w-store-1.jpg'; Url = "$chd/4ec72b6316fe49a2bebab9c9239c6efb"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500w'; Role = 'PDP gallery' }
  @{ File = 'web-vc500w-store-2.jpg'; Url = "$chd/a12f5e667fd74eadbd3a61d78cb7881f"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500w'; Role = 'PDP gallery' }
  @{ File = 'web-vc500w-store-3.jpg'; Url = "$chd/6a927e6480fc43428cb4521424f4706b"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500w'; Role = 'PDP gallery' }
  @{ File = 'web-vc500w-store-4.jpg'; Url = "$chd/f1c61be9506740b28ce19735c58b7873"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500w'; Role = 'PDP gallery' }
  @{ File = 'web-vc500w-length.jpg'; Url = "$chd/vc500w-length-required-542-webp"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500w'; Role = 'Feature' }
  @{ File = 'web-vc500w-photo-printing.jpg'; Url = "$ch/vc500w-photo-printing-543"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500w'; Role = 'Feature' }
  @{ File = 'web-vc500w-design-your-way.jpg'; Url = "$ch/your-design-your-way-413"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500w'; Role = 'Feature' }
  @{ File = 'web-vc500wcr-app.jpg'; Url = "$ch/VC-500WCR_3-app-535"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500wcr'; Role = 'Related / CR app' }
  @{ File = 'web-vc500w-app.jpg'; Url = "$ch/VC-500W_4-App-360"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500w'; Role = 'App' }
  @{ File = 'web-vc500wcr-store-1.jpg'; Url = "$chd/3114f9404f1c4e79afd7f0bda47c7221"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500wcr'; Role = 'PDP gallery' }
  @{ File = 'web-vc500wcr-store-2.jpg'; Url = "$chd/d153b8056b75477b9d25e9438abf9830"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500wcr'; Role = 'PDP gallery' }
  @{ File = 'web-vc500wcr-store-3.jpg'; Url = "$chd/9773da0b900f4c86927b58601ca7f3c6"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500wcr'; Role = 'PDP gallery' }
  @{ File = 'web-vc500wcr-store-4.jpg'; Url = "$chd/e7679b95525c4b3ab87d1f88d55b19a3"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500wcr'; Role = 'PDP gallery' }

  # --- QL-800 store + related supplies imagery ---
  @{ File = 'web-ql-800-situ-1.jpg'; Url = "$store/pdf/ql/1---ql-800-situ_29.jpg"; Source = 'https://store.brother.co.uk/devices/label-printer/ql/ql800'; Role = 'PDP situ' }
  @{ File = 'web-ql-800-situ-2.jpg'; Url = "$store/pdf/ql/2---ql-800-situ_28.jpg"; Source = 'https://store.brother.co.uk/devices/label-printer/ql/ql800'; Role = 'PDP situ' }
  @{ File = 'web-ql-800-situ-3.jpg'; Url = "$store/pdf/ql/5-ql-800-situ_18.jpg"; Source = 'https://store.brother.co.uk/devices/label-printer/ql/ql800'; Role = 'PDP situ' }
  @{ File = 'web-ql-800-dk-labels.jpg'; Url = "$store/pdf/ql/8-dk-labels.jpg"; Source = 'https://store.brother.co.uk/devices/label-printer/ql/ql800'; Role = 'Related supplies' }
  @{ File = 'web-ql-800-gallery-1.jpg'; Url = "$chd/273eabaa53f04bc693387419484bc1d5"; Source = 'https://store.brother.co.uk/devices/label-printer/ql/ql800'; Role = 'PDP gallery' }
  @{ File = 'web-ql-800-gallery-2.jpg'; Url = "$chd/c1d582f4410843668e446d574cdec880"; Source = 'https://store.brother.co.uk/devices/label-printer/ql/ql800'; Role = 'PDP gallery' }
  @{ File = 'web-ql-800-gallery-3.jpg'; Url = "$chd/777eff36284d4efa95cc6e75d4d1a8f6"; Source = 'https://store.brother.co.uk/devices/label-printer/ql/ql800'; Role = 'PDP gallery' }
  @{ File = 'web-ql-800-gallery-4.jpg'; Url = "$chd/82030deb24a74ba4ba0a22818e787933"; Source = 'https://store.brother.co.uk/devices/label-printer/ql/ql800'; Role = 'PDP gallery' }

  # --- CZ-1003 supplies ---
  @{ File = 'web-cz-1003-main.jpg'; Url = "$chd/3114f9404f1c4e79afd7f0bda47c7221"; Source = 'https://store.brother.co.uk/supplies/label-printers/labels/cz/cz1003'; Role = 'Supplies PDP main' }
  @{ File = 'web-cz-1003-2.jpg'; Url = "$chd/367f69d57e8240d6bc8f2d20be6c32cc"; Source = 'https://store.brother.co.uk/supplies/label-printers/labels/cz/cz1003'; Role = 'Supplies gallery' }
  @{ File = 'web-cz-1003-3.jpg'; Url = "$chd/918d634385ea4c8cb43377510e11edcf"; Source = 'https://store.brother.co.uk/supplies/label-printers/labels/cz/cz1003'; Role = 'Supplies gallery' }
  @{ File = 'web-cz-1003-4.jpg'; Url = "$chd/8c2491a8cfd543618273dcfa26ce4e2c"; Source = 'https://store.brother.co.uk/supplies/label-printers/labels/cz/cz1003'; Role = 'Supplies gallery' }
  @{ File = 'web-overview-supplies.jpg'; Url = "$ch/overview-supplies-417"; Source = 'https://store.brother.co.uk/devices/label-printer/vc/vc500w'; Role = 'Related supplies' }

  # --- Office labelling hub ---
  @{ File = 'web-office-labelling-banner.jpg'; Url = "$ch/banners_global-taxonomy_labelling_office-labelling-all-banner"; Source = 'https://www.brother.co.uk/labelling-and-receipts/office-labelling'; Role = 'Category banner' }
  @{ File = 'web-office-labelling-1.jpg'; Url = "$chd/3d78e933b12b47228aa357e44d0bdcf8"; Source = 'https://www.brother.co.uk/labelling-and-receipts/office-labelling'; Role = 'Page content' }
  @{ File = 'web-office-labelling-2.jpg'; Url = "$chd/090b95cbd6d945a1b24104974a94eba6"; Source = 'https://www.brother.co.uk/labelling-and-receipts/office-labelling'; Role = 'Page content' }
  @{ File = 'web-office-labelling-3.jpg'; Url = "$chd/11d5c06b4a874f109975bcb63342f32d"; Source = 'https://www.brother.co.uk/labelling-and-receipts/office-labelling'; Role = 'Page content' }
  @{ File = 'web-office-labelling-4.jpg'; Url = "$chd/2daeac6b82c64347a57d0bbb2123d915"; Source = 'https://www.brother.co.uk/labelling-and-receipts/office-labelling'; Role = 'Page content' }

  # --- MPS hub ---
  @{ File = 'web-mps-hero.jpg'; Url = "$ch/banners_business-solutions---new_managed-print-service_mps-generic2"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service'; Role = 'Page hero' }
  @{ File = 'web-mps-why-brother.jpg'; Url = "$ch/feature-module-images_business-solutions-new_why-choose-brother-mps"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service'; Role = 'Feature' }
  @{ File = 'web-mps-automatic-delivery.jpg'; Url = "$chd/benefit-tiles_mps_automatic-delivery"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service'; Role = 'Benefit tile' }
  @{ File = 'web-mps-support.jpg'; Url = "$chd/benefit-tiles_mps_support-and-maintenance"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service'; Role = 'Benefit tile' }
  @{ File = 'web-mps-recycling.jpg'; Url = "$chd/benefit-tiles_mps_supplies-recycling"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service'; Role = 'Benefit tile' }
  @{ File = 'web-mps-flexibility.jpg'; Url = "$chd/benefit-tiles_mps_flexibility"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service'; Role = 'Benefit tile' }
  @{ File = 'web-mps-essential-signpost.jpg'; Url = "$www/images/brother-uk/modules/info-image-text-tile-images/business-solutions-new/mps-essential-signpost-new.jpeg"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service'; Role = 'Signpost' }
  @{ File = 'web-mps-sustainability.jpg'; Url = "$www/images/brother-uk/modules/feature-module-images/business-solutions-new/mps-sustainability.jpg"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service'; Role = 'Feature' }

  # --- MPS Essential ---
  @{ File = 'web-mps-essential-hero.jpg'; Url = "$ch/banners_business-solutions---new_managed-print-service_ps-essentials-hero"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Page hero' }
  @{ File = 'web-mps-essential-intro.jpg'; Url = "$ch/feature-module-images_business-solutions-new_mps-essential-intro"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Feature' }
  @{ File = 'web-mps-essential-purchase.jpg'; Url = "$ch/benefit-tiles_business-solutions-new_managed-print-services_mps-essential_purchase-printer"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Benefit tile' }
  @{ File = 'web-mps-essential-subscription.jpg'; Url = "$ch/benefit-tiles_business-solutions-new_managed-print-services_mps-essential_choose-subscription"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Benefit tile' }
  @{ File = 'web-mps-essential-setup.jpg'; Url = "$ch/benefit-tiles_business-solutions-new_managed-print-services_mps-essential_set-up"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Benefit tile' }
  @{ File = 'web-mps-essential-cancel.jpg'; Url = "$ch/benefit-tiles_business-solutions-new_managed-print-services_mps-essential_cancel"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Benefit tile' }
  @{ File = 'web-mps-essential-toner.jpg'; Url = "$ch/super-carousel-images_managed-print-service_mps-essential_toner-delivery"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Carousel' }
  @{ File = 'web-mps-essential-save-time.jpg'; Url = "$ch/super-carousel-images_managed-print-service_mps-essential_save-time"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Carousel' }
  @{ File = 'web-mps-essential-recycling.jpg'; Url = "$ch/super-carousel-images_managed-print-service_mps-essential_recycling"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Carousel' }
  @{ File = 'web-mps-essential-security.jpg'; Url = "$ch/super-carousel-images_managed-print-service_mps-essential_security"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Carousel' }
  @{ File = 'web-mps-essential-plans.png'; Url = "$www/images/brother-uk/modules/feature-module-images/business-solutions-new/mps-essential-plans-example.png"; Source = 'https://www.brother.co.uk/business-solutions/managed-print-service/mps-essential'; Role = 'Plans' }
)

# Sitecore CMS field wiring for page Image fields (extend upload map)
$fieldPlanExtra = @(
  @{ DataItem = '/sitecore/content/brother/brother/Home/labelling-and-receipts/office-labelling'; Field = 'Image'; File = 'web-office-labelling-banner.jpg'; Use = 'Office labelling hub' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/labelling-and-receipts/vc-500w'; Field = 'Image'; File = 'web-vc-500w-hero-crystals.jpg'; Use = 'VC-500W overview hero' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/labelling-and-receipts/vc-500w'; Field = 'Image2'; File = 'web-vc-500w-with-laptop.jpg'; Use = 'VC-500W overview gallery' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/labelling-and-receipts/vc-500w'; Field = 'Image3'; File = 'web-vc-500w-colour-printing.jpg'; Use = 'VC-500W overview gallery' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w'; Field = 'Image'; File = 'web-vc500w-store-1.jpg'; Use = 'VC-500W store PDP' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w'; Field = 'Image2'; File = 'web-vc500w-store-2.jpg'; Use = 'VC-500W store gallery' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w'; Field = 'Image3'; File = 'web-vc500w-photo-printing.jpg'; Use = 'VC-500W store gallery' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500wcr'; Field = 'Image'; File = 'web-vc500wcr-store-1.jpg'; Use = 'VC-500WCR store PDP' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500wcr'; Field = 'Image2'; File = 'web-vc500wcr-store-2.jpg'; Use = 'VC-500WCR gallery' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-800'; Field = 'Image'; File = 'web-ql-800-gallery-1.jpg'; Use = 'QL-800 PDP' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-800'; Field = 'Image2'; File = 'web-ql-800-situ-1.jpg'; Use = 'QL-800 situ' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-800'; Field = 'Image3'; File = 'web-ql-800-dk-labels.jpg'; Use = 'QL-800 related supplies' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/supplies/label-printers/labels/cz/cz1003'; Field = 'Image'; File = 'web-cz-1003-main.jpg'; Use = 'CZ-1003 supplies PDP' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/supplies/label-printers/labels/cz/cz1003'; Field = 'Image2'; File = 'web-cz-1003-2.jpg'; Use = 'CZ-1003 gallery' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/business-solutions/managed-print-service'; Field = 'Image'; File = 'web-mps-hero.jpg'; Use = 'MPS hub hero' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/business-solutions/managed-print-service'; Field = 'Image2'; File = 'web-mps-why-brother.jpg'; Use = 'MPS feature' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/business-solutions/managed-print-service/mps-essential'; Field = 'Image'; File = 'web-mps-essential-hero.jpg'; Use = 'MPS Essential hero' }
  @{ DataItem = '/sitecore/content/brother/brother/Home/business-solutions/managed-print-service/mps-essential'; Field = 'Image2'; File = 'web-mps-essential-intro.jpg'; Use = 'MPS Essential intro' }
)

$manifestRows = @()
$ok = 0; $skip = 0; $fail = 0
foreach ($a in $assets) {
  $path = Join-Path $dest $a.File
  # Also place a copy at MediaRoot root so Upload-BrotherContentHub preferred list / recurse finds it
  $rootCopy = Join-Path $MediaRoot $a.File
  if ($SkipExisting -and (Test-Path $path) -and (Get-Item $path).Length -gt 1000) {
    Write-Host "Skip existing $($a.File)"
    $skip++
    $manifestRows += [pscustomobject]@{ LocalFile = $a.File; SourceUrl = $a.Url; PageUrl = $a.Source; Role = $a.Role; Status = 'SkippedExisting'; Bytes = (Get-Item $path).Length }
    if (-not (Test-Path $rootCopy)) { Copy-Item $path $rootCopy -Force }
    continue
  }
  try {
    Invoke-WebRequest -Uri $a.Url -OutFile $path -UserAgent $ua -UseBasicParsing -TimeoutSec 90
    if (-not (Test-Path $path) -or (Get-Item $path).Length -lt 800) {
      throw "Download too small or missing ($((Get-Item $path -ErrorAction SilentlyContinue).Length) bytes)"
    }
    # Detect HTML error pages saved as images
    $bytes = [IO.File]::ReadAllBytes($path)
    $headText = [Text.Encoding]::ASCII.GetString($bytes, 0, [Math]::Min(64, $bytes.Length))
    if ($headText -match '<!DOCTYPE|<html') { throw 'Got HTML instead of image' }
    Copy-Item $path $rootCopy -Force
    $len = (Get-Item $path).Length
    Write-Host "OK $($a.File) ($len bytes)"
    $ok++
    $manifestRows += [pscustomobject]@{ LocalFile = $a.File; SourceUrl = $a.Url; PageUrl = $a.Source; Role = $a.Role; Status = 'Downloaded'; Bytes = $len }
  } catch {
    Write-Warning "FAIL $($a.File): $($_.Exception.Message)"
    $fail++
    $manifestRows += [pscustomobject]@{ LocalFile = $a.File; SourceUrl = $a.Url; PageUrl = $a.Source; Role = $a.Role; Status = "Error: $($_.Exception.Message)"; Bytes = 0 }
  }
}

$planRows = foreach ($p in $fieldPlanExtra) {
  [pscustomobject]@{ DataItemPath = $p.DataItem; FieldName = $p.Field; LocalFile = $p.File; Purpose = $p.Use }
}

$uploadDir = Join-Path $MediaRoot 'ch-upload'
New-Item -ItemType Directory -Force -Path $uploadDir | Out-Null
$manifestRows | Export-Csv (Join-Path $dest 'web-product-download-manifest.csv') -NoTypeInformation -Encoding UTF8
$planRows | Export-Csv (Join-Path $uploadDir 'web-product-field-plan.csv') -NoTypeInformation -Encoding UTF8
$manifestRows | Export-Csv (Join-Path $uploadDir 'web-product-download-manifest.csv') -NoTypeInformation -Encoding UTF8

Write-Host ""
Write-Host "Downloaded OK=$ok Skip=$skip Fail=$fail -> $dest"
Write-Host "Field plan -> $(Join-Path $uploadDir 'web-product-field-plan.csv')"
Write-Host "Next: extend Upload preferred list (web-*. files) then Upload-BrotherContentHub.ps1 + Set-BrotherContentHubMetadata.ps1"
