# Download key Brother story images into public/ and Sitecore media YAML.
$ErrorActionPreference = 'Stop'
$repo = Split-Path (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent) -Parent
# When run from authoring/items/brother/scripts, go up to repo root
$here = $PSScriptRoot
$repoRoot = (Resolve-Path (Join-Path $here '..\..\..\..')).Path
Set-Location $repoRoot

$publicImg = Join-Path $repoRoot 'industry-verticals\brother\public\images'
New-Item -ItemType Directory -Force -Path $publicImg | Out-Null

$assets = @(
  @{ Url = 'https://bie-p-001.sitecorecontenthub.cloud/api/public/content/feature-module-images_labelling_vc-500w'; File = 'vc-500w.jpg'; Alt = 'Brother VC-500W' }
  @{ Url = 'https://bie-p-001.sitecorecontenthub.cloud/api/public/content/feature-module-images_global-taxonomy_labelling_vc-500w-with-laptop'; File = 'vc-500w-laptop.jpg'; Alt = 'VC-500W with laptop' }
  @{ Url = 'https://bie-p-001.sitecorecontenthub.cloud/api/public/content/feature-module-images_global-taxonomy_labelling_vc-500w_full_colour_printing'; File = 'vc-500w-colour.jpg'; Alt = 'Full colour printing' }
  @{ Url = 'https://bie-p-001.sitecorecontenthub.cloud/api/public/content/feature-module-images_global-taxonomy_labelling_vc-500w_five_widths'; File = 'vc-500w-widths.jpg'; Alt = 'Five label widths' }
  @{ Url = 'https://bie-p-001.sitecorecontenthub.cloud/api/public/content/feature-module-images_global-taxonomy_labelling_vc-500w_auto_cutter'; File = 'vc-500w-cutter.jpg'; Alt = 'Auto cutter' }
  @{ Url = 'https://bie-p-001.sitecorecontenthub.cloud/api/public/content/features-carousel-images_new_home-product-carousel-labelling'; File = 'labelling-tile.jpg'; Alt = 'Labelling' }
  @{ Url = 'https://bie-p-001.sitecorecontenthub.cloud/api/public/content/features-carousel-images_new_home-product-carousel-labelling'; File = 'home-hero.jpg'; Alt = 'Brother home hero' }
  @{ Url = 'https://bie-p-001.sitecorecontenthub.cloud/api/public/content/mega-navigation_brother-for-home_blog-webp'; File = 'desk-office.jpg'; Alt = 'Home office blog' }
)

$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
$mediaAssets = @()

foreach ($a in $assets) {
  $dest = Join-Path $publicImg $a.File
  try {
    Invoke-WebRequest -Uri $a.Url -OutFile $dest -UserAgent $ua -UseBasicParsing -TimeoutSec 60
    Write-Host "OK public $($a.File) ($((Get-Item $dest).Length) bytes)"
    $mediaAssets += @{ Url = $a.Url; Alt = $a.Alt }
  } catch {
    Write-Host "FAIL $($a.Url) :: $($_.Exception.Message)"
  }
}

$script = Join-Path $repoRoot '.cursor\skills\sitecore-serialization-skills\sitecore-media-from-url-yaml\scripts\create-media-from-urls.ps1'
& $script `
  -MediaRoot (Join-Path $repoRoot 'authoring\items\brother\serialized-content\media-library') `
  -SiteMediaPath '/sitecore/media library/Project/brother/brother' `
  -SiteRootItemId '7cf41102-a1ea-47a2-895a-5287102e5294' `
  -Assets $mediaAssets `
  -BaseUrl 'https://www.brother.co.uk'

Write-Host 'Media download complete.'
