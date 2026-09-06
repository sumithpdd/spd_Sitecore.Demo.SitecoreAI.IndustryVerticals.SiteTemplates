<#
.SYNOPSIS
  Seed Product Listing + Related Products datasources, wire layouts, and patch
  Content Hub DAM images onto every item under Home/devices.
#>
[CmdletBinding()]
param(
  [string]$SerializedRoot = '',
  [string]$RegistryCsv = ''
)

$ErrorActionPreference = 'Stop'
$repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\..\..'))
if (-not $SerializedRoot) {
  $SerializedRoot = Join-Path $repoRoot 'authoring\items\brother\serialized-content'
}
$contentRoot = Join-Path $SerializedRoot 'brother\brother'
if (-not $RegistryCsv) {
  $RegistryCsv = Join-Path $PSScriptRoot 'media-maps\content-hub-asset-registry.csv'
}

$reg = @{}
Import-Csv $RegistryCsv | ForEach-Object {
  if ($_.LocalFile -and $_.PublicUrl -and $_.DamId) {
    $reg[$_.LocalFile] = $_
  }
}

function Get-DamXml([string]$LocalFile) {
  $r = $reg[$LocalFile]
  if (-not $r) { throw "Registry missing LocalFile: $LocalFile" }
  $alt = [IO.Path]::GetFileNameWithoutExtension($LocalFile)
  return "<Image src=`"$($r.PublicUrl)`" dam-id=`"$($r.DamId)`" alt=`"$alt`" dam-content-type=`"Image`" />"
}

function Set-YamlField([string]$Yaml, [string]$FieldId, [string]$Hint, [string]$Value, [switch]$Multiline) {
  # Only remove this field block — do not greedily consume following fields
  $remove = "(?ms)^\s*- ID: `"$FieldId`"\r?\n\s*Hint: $([regex]::Escape($Hint))\r?\n\s*Value: (?:\|\r?\n\s{8}<[^>\r\n]+>\r?\n|\S[^\r\n]*\r?\n)"
  $Yaml = [regex]::Replace($Yaml, $remove, '')
  if ($Multiline) {
    $block = @"
    - ID: "$FieldId"
      Hint: $Hint
      Value: |
        $Value
"@
  } else {
    $escaped = $Value -replace '"', '\"'
    $block = @"
    - ID: "$FieldId"
      Hint: $Hint
      Value: "$escaped"
"@
  }
  if ($Yaml -match '(?ms)(Hint: Title\r?\n\s*Value: [^\r\n]+\r?\n)') {
    return [regex]::Replace($Yaml, '(?ms)(Hint: Title\r?\n\s*Value: [^\r\n]+\r?\n)', "`$1$block`r`n", 1)
  }
  if ($Yaml -match '(?ms)(Versions:\r?\n\s*- Version: 1\r?\n\s*Fields:\r?\n)') {
    return $Yaml -replace '(?ms)(Versions:\r?\n\s*- Version: 1\r?\n\s*Fields:\r?\n)', "`$1$block`r`n"
  }
  throw "No insert point in YAML"
}

function Write-Utf8([string]$Path, [string]$Content) {
  $dir = Split-Path $Path -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  [IO.File]::WriteAllText($Path, $Content.TrimEnd() + "`n")
}

# --- IDs ---
$tplProductListing = '805a3737-055e-40ae-96a8-c5391bfc0ba3'
$tplRelatedProducts = '4237fa0f-dbee-429e-829b-7ff874fc8bca'
$tplProductCategory = 'b40e0006-6666-4000-8000-000000000002'
$fldPlTitle = 'a24fb0b1-4189-4982-bc00-decc93e0b66a'
$fldPlCategory = '6b348e4c-098f-4674-b2bd-3900f8efa60b'
$fldPlIntro = 'cf18e7a6-95d7-487f-9929-df44004d3b40'
$fldPlImage = 'b40e0006-6666-4000-8000-000000000060'
$fldPlProducts = 'b40e0006-6666-4000-8000-000000000061'
$fldRpTitle = '469a7172-f77a-4890-891e-02c28d37fcc8'
$fldRpList = '38003a0a-21c7-4b79-a458-24563237d6d3'
$fldRpLink = '1288cdff-efc8-4df3-889d-52c4192c1031'
$fldImg = 'b40e0006-6666-4000-8000-000000000034'
$fldImg2 = 'b40e0006-6666-4000-8000-000000000035'
$fldImg3 = 'b40e0006-6666-4000-8000-000000000036'
$fldCatImg = 'b40e0006-6666-4000-8000-000000000050'
$fldCatImg2 = 'b40e0006-6666-4000-8000-000000000051'
$fldPageRelated = 'b40e0006-6666-4000-8000-00000000003f'

$productIds = @{
  'vc500w'       = 'b40e0002-2222-4000-8000-000000000023'
  'vc500wcr'     = 'b40e0002-2222-4000-8000-000000000063'
  'ql-800'       = 'b40e0002-2222-4000-8000-000000000025'
  'ql-820nwb'    = 'b40e0002-2222-4000-8000-000000000026'
  'pt-p750w'     = 'b40e0002-2222-4000-8000-000000000028'
  'td-4550dnwb'  = 'b40e0002-2222-4000-8000-00000000002a'
  'dcp-l3520cdw' = 'b40e0002-2222-4000-8000-000000000033'
  'mfc-l8390cdw' = 'b40e0002-2222-4000-8000-000000000035'
  'hl-l2460dn'   = 'b40e0002-2222-4000-8000-000000000037'
  'ads-1800w'    = 'b40e0002-2222-4000-8000-000000000043'
  'ads-4900w'    = 'b40e0002-2222-4000-8000-000000000044'
}

function Format-Treelist([string[]]$Keys) {
  ($Keys | ForEach-Object { '{' + $productIds[$_].ToUpper() + '}' }) -join '|'
}

# Product Listing Image field on template
$plImageTpl = Join-Path $SerializedRoot 'templates\brother\ProductListing Templates\ProductListing\Data\Image.yml'
Write-Utf8 $plImageTpl @"
---
ID: "$fldPlImage"
Parent: "615c0d52-cad6-48fb-87dd-cbe0ccc53144"
Template: "455a3e98-a627-4b40-8035-e683a0331ac7"
Path: "/sitecore/templates/Project/brother/ProductListing Templates/ProductListing/Data/Image"
SharedFields:
- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"
  Hint: Type
  Value: "Image"
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: 400
Languages:
- Language: en
  Fields:
  - ID: "19a69332-a23e-4e70-8d16-b2640cb24cc8"
    Hint: Title
    Value: Image
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
"@

# RelatedProducts ProductsList Source
$plListTpl = Join-Path $SerializedRoot 'templates\brother\RelatedProducts Templates\RelatedProducts\Data\ProductsList.yml'
$plListYaml = Get-Content $plListTpl -Raw
if ($plListYaml -notmatch 'Hint: Source') {
  $plListYaml = $plListYaml -replace '(Hint: Type\r?\n\s*Value: "Treelist"\r?\n)', "`$1- ID: `"1eb8ae32-e190-44a6-968d-ed904c794ebf`"`r`n  Hint: Source`r`n  Value: `"query:./ancestor-or-self::*[@@templatename='Headless Site']//*[@@templatename='ProductPage']`"`r`n"
  Write-Utf8 $plListTpl $plListYaml
}

# --- Datasources ---
$dsPlAll = 'b40e00b1-2222-4000-8000-000000000030'
$dsPlLabelling = 'b40e00b1-2222-4000-8000-000000000031'
$dsPlPrinters = 'b40e00b1-2222-4000-8000-000000000032'
$dsPlScanners = 'b40e00b1-2222-4000-8000-000000000033'
$dsRpPdp = 'b40e00b1-2222-4000-8000-000000000040'
$dsRpBlog = 'b40e00b1-2222-4000-8000-000000000041'
$folderPl = 'b40e00a1-1111-4000-8000-000000000003'
$folderRp = 'b40e00a1-1111-4000-8000-000000000007'
$devicesId = 'b40e0002-2222-4000-8000-000000000020'

$listings = @(
  @{
    Id = $dsPlAll; Name = 'All Devices Listing'; Title = 'All Brother devices'; Category = ''; Intro = 'Browse labelling, printers, scanners and more.'; File = 'web-office-labelling-banner.jpg'
    Products = @('vc500w', 'ql-800', 'ql-820nwb', 'pt-p750w', 'td-4550dnwb', 'dcp-l3520cdw', 'mfc-l8390cdw', 'hl-l2460dn', 'ads-1800w', 'ads-4900w')
  }
  @{
    Id = $dsPlLabelling; Name = 'Labelling Listing'; Title = 'Labelling products'; Category = 'Labelling'; Intro = 'Colour and mono label printers for office and warehouse.'; File = 'category-office-labelling.jpg'
    Products = @('vc500w', 'ql-800', 'ql-820nwb', 'pt-p750w', 'td-4550dnwb', 'vc500wcr')
  }
  @{
    Id = $dsPlPrinters; Name = 'Printers Listing'; Title = 'Printers'; Category = 'Printers'; Intro = 'Colour and mono lasers for home and workgroups.'; File = 'web-mps-essential-purchase.jpg'
    Products = @('dcp-l3520cdw', 'mfc-l8390cdw', 'hl-l2460dn')
  }
  @{
    Id = $dsPlScanners; Name = 'Scanners Listing'; Title = 'Scanners'; Category = 'Scanners'; Intro = 'Desktop and workgroup document scanners.'; File = 'web-office-labelling-2.jpg'
    Products = @('ads-1800w', 'ads-4900w')
  }
)

# ProductListing ProductsList field on template (idempotent)
$plProductsTpl = Join-Path $SerializedRoot 'templates\brother\ProductListing Templates\ProductListing\Data\ProductsList.yml'
Write-Utf8 $plProductsTpl @"
---
ID: "$fldPlProducts"
Parent: "615c0d52-cad6-48fb-87dd-cbe0ccc53144"
Template: "455a3e98-a627-4b40-8035-e683a0331ac7"
Path: "/sitecore/templates/Project/brother/ProductListing Templates/ProductListing/Data/ProductsList"
SharedFields:
- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"
  Hint: Type
  Value: "Treelist"
- ID: "1eb8ae32-e190-44a6-968d-ed904c794ebf"
  Hint: Source
  Value: "query:./ancestor-or-self::*[@@templatename='Headless Site']//*[@@templatename='ProductPage']"
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: 350
Languages:
- Language: en
  Fields:
  - ID: "19a69332-a23e-4e70-8d16-b2640cb24cc8"
    Hint: Title
    Value: Products
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260905T120000Z
"@

foreach ($l in $listings) {
  $path = Join-Path $contentRoot ("Data\Product Listings\$($l.Name).yml")
  $xml = Get-DamXml $l.File
  $productsList = Format-Treelist $l.Products
  Write-Utf8 $path @"
---
ID: "$($l.Id)"
Parent: "$folderPl"
Template: "$tplProductListing"
Path: /sitecore/content/brother/brother/Data/Product Listings/$($l.Name)
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
    - ID: "$fldPlTitle"
      Hint: Title
      Value: "$($l.Title)"
    - ID: "$fldPlCategory"
      Hint: Category
      Value: "$($l.Category)"
    - ID: "$fldPlIntro"
      Hint: Intro
      Value: "$($l.Intro)"
    - ID: "$fldPlProducts"
      Hint: ProductsList
      Value: "$productsList"
    - ID: "$fldPlImage"
      Hint: Image
      Value: |
        $xml
"@
  Write-Host "Wrote Product Listing: $($l.Name) ($($l.Products.Count) products)"
}

$rpPdpList = Format-Treelist @('ql-800', 'vc500w', 'pt-p750w')
$rpBlogList = Format-Treelist @('ql-800', 'vc500w', 'hl-l2460dn', 'ads-1800w')
$linkDevices = "<link text=`"View all devices`" anchor=`"`" linktype=`"internal`" class=`"`" title=`"`" target=`"`" querystring=`"`" id=`"{$($devicesId.ToUpper())}`" />"

Write-Utf8 (Join-Path $contentRoot 'Data\Related Products\PDP Related Products.yml') @"
---
ID: "$dsRpPdp"
Parent: "$folderRp"
Template: "$tplRelatedProducts"
Path: /sitecore/content/brother/brother/Data/Related Products/PDP Related Products
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
    - ID: "$fldRpTitle"
      Hint: Title
      Value: "Related products"
    - ID: "$fldRpList"
      Hint: ProductsList
      Value: "$rpPdpList"
    - ID: "$fldRpLink"
      Hint: ProductsLink
      Value: |
        $linkDevices
"@

Write-Utf8 (Join-Path $contentRoot 'Data\Related Products\Blog Related Products.yml') @"
---
ID: "$dsRpBlog"
Parent: "$folderRp"
Template: "$tplRelatedProducts"
Path: /sitecore/content/brother/brother/Data/Related Products/Blog Related Products
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
    - ID: "$fldRpTitle"
      Hint: Title
      Value: "Products for your home office"
    - ID: "$fldRpList"
      Hint: ProductsList
      Value: "$rpBlogList"
    - ID: "$fldRpLink"
      Hint: ProductsLink
      Value: |
        $linkDevices
"@
Write-Host 'Wrote Related Products datasources'

# --- Device ProductPage images (reuse CH registry assets) ---
$deviceImages = @{
  'label-printer\ql\ql-820nwb.yml' = @{ Image = 'web-ql-800-gallery-2.jpg'; Image2 = 'web-ql-800-situ-2.jpg'; Image3 = 'web-ql-800-gallery-3.jpg'; Related = @('ql-800', 'td-4550dnwb', 'vc500w') }
  'label-printer\pt\pt-p750w.yml' = @{ Image = 'web-office-labelling-1.jpg'; Image2 = 'product-vc-500w-five-widths.jpg'; Image3 = 'web-office-labelling-3.jpg'; Related = @('vc500w', 'ql-800') }
  'label-printer\td\td-4550dnwb.yml' = @{ Image = 'web-office-labelling-4.jpg'; Image2 = 'web-ql-800-gallery-4.jpg'; Image3 = 'web-overview-supplies.jpg'; Related = @('ql-820nwb', 'ql-800') }
  'printers\dcp\dcp-l3520cdw.yml' = @{ Image = 'web-mps-essential-purchase.jpg'; Image2 = 'product-vc-500w-with-laptop.jpg'; Image3 = 'lifestyle-home-office-desk.jpg'; Related = @('hl-l2460dn', 'mfc-l8390cdw') }
  'printers\hl\hl-l2460dn.yml' = @{ Image = 'web-mps-hero.jpg'; Image2 = 'web-mps-essential-purchase.jpg'; Image3 = 'product-vc-500w-with-laptop.jpg'; Related = @('dcp-l3520cdw', 'ads-1800w') }
  'printers\mfc\mfc-l8390cdw.yml' = @{ Image = 'product-vc-500w-with-laptop.jpg'; Image2 = 'web-mps-hero.jpg'; Image3 = 'web-mps-essential-purchase.jpg'; Related = @('dcp-l3520cdw', 'ads-4900w') }
  'scanners\ads\ads-1800w.yml' = @{ Image = 'web-office-labelling-2.jpg'; Image2 = 'lifestyle-home-office-desk.jpg'; Image3 = 'web-office-labelling-1.jpg'; Related = @('hl-l2460dn', 'ads-4900w') }
  'scanners\ads\ads-4900w.yml' = @{ Image = 'web-office-labelling-3.jpg'; Image2 = 'web-office-labelling-4.jpg'; Image3 = 'web-office-labelling-2.jpg'; Related = @('ads-1800w', 'mfc-l8390cdw') }
  'label-printer\vc\vc500wcr.yml' = @{ Image3 = 'web-vc500wcr-store-3.jpg'; Related = @('vc500w', 'ql-800') }
}

$devicesDir = Join-Path $contentRoot 'Home\devices'
foreach ($rel in $deviceImages.Keys) {
  $file = Join-Path $devicesDir $rel
  $map = $deviceImages[$rel]
  $yaml = Get-Content $file -Raw
  if ($map.Image) { $yaml = Set-YamlField $yaml $fldImg 'Image' (Get-DamXml $map.Image) -Multiline }
  if ($map.Image2) { $yaml = Set-YamlField $yaml $fldImg2 'Image2' (Get-DamXml $map.Image2) -Multiline }
  if ($map.Image3) { $yaml = Set-YamlField $yaml $fldImg3 'Image3' (Get-DamXml $map.Image3) -Multiline }
  if ($map.Related) {
    $yaml = Set-YamlField $yaml $fldPageRelated 'RelatedProducts' (Format-Treelist $map.Related)
  }
  Write-Utf8 $file $yaml
  Write-Host "Patched device PDP: $rel"
}

# Also set RelatedProducts on existing imaged PDPs
$extraRelated = @{
  'label-printer\vc\vc500w.yml' = @('ql-800', 'pt-p750w', 'vc500wcr')
  'label-printer\ql\ql-800.yml' = @('ql-820nwb', 'vc500w', 'pt-p750w')
}
foreach ($rel in $extraRelated.Keys) {
  $file = Join-Path $devicesDir $rel
  $yaml = Set-YamlField (Get-Content $file -Raw) $fldPageRelated 'RelatedProducts' (Format-Treelist $extraRelated[$rel])
  Write-Utf8 $file $yaml
}

# Category / series pages → ProductCategoryPage + Image
$categoryImages = @{
  'devices.yml' = @{ File = 'devices.yml'; Rel = '..\devices.yml'; Img = 'web-office-labelling-banner.jpg'; Img2 = 'category-office-labelling.jpg' }
}
# Fix: devices.yml is parent of devices folder
$hub = Join-Path $contentRoot 'Home\devices.yml'
$hubYaml = Get-Content $hub -Raw
$hubYaml = $hubYaml -replace 'Template: "f352f7cd-0a08-419a-9670-e7ef478cd2a2"', "Template: `"$tplProductCategory`""
# devices already ProductCategoryPage
$hubYaml = Set-YamlField $hubYaml $fldCatImg 'Image' (Get-DamXml 'web-office-labelling-banner.jpg') -Multiline
$hubYaml = Set-YamlField $hubYaml $fldCatImg2 'Image2' (Get-DamXml 'category-office-labelling.jpg') -Multiline
Write-Utf8 $hub $hubYaml
Write-Host 'Patched devices hub'

$series = @(
  @{ Rel = 'label-printer.yml'; Img = 'category-office-labelling.jpg'; Img2 = 'web-office-labelling-1.jpg' }
  @{ Rel = 'printers.yml'; Img = 'web-mps-essential-purchase.jpg'; Img2 = 'web-mps-hero.jpg' }
  @{ Rel = 'scanners.yml'; Img = 'web-office-labelling-2.jpg'; Img2 = 'web-office-labelling-3.jpg' }
  @{ Rel = 'label-printer\ql.yml'; Img = 'web-ql-800-gallery-2.jpg'; Img2 = 'web-ql-800-situ-2.jpg' }
  @{ Rel = 'label-printer\vc.yml'; Img = 'product-vc-500w-with-laptop.jpg'; Img2 = 'product-vc-500w-five-widths.jpg' }
  @{ Rel = 'label-printer\pt.yml'; Img = 'web-office-labelling-1.jpg'; Img2 = 'product-vc-500w-auto-cutter.jpg' }
  @{ Rel = 'label-printer\td.yml'; Img = 'web-office-labelling-4.jpg'; Img2 = 'web-overview-supplies.jpg' }
  @{ Rel = 'printers\dcp.yml'; Img = 'web-mps-essential-purchase.jpg'; Img2 = 'lifestyle-home-office-desk.jpg' }
  @{ Rel = 'printers\hl.yml'; Img = 'web-mps-hero.jpg'; Img2 = 'product-vc-500w-with-laptop.jpg' }
  @{ Rel = 'printers\mfc.yml'; Img = 'product-vc-500w-with-laptop.jpg'; Img2 = 'web-mps-essential-purchase.jpg' }
  @{ Rel = 'scanners\ads.yml'; Img = 'web-office-labelling-2.jpg'; Img2 = 'web-office-labelling-4.jpg' }
)

foreach ($s in $series) {
  $file = Join-Path $devicesDir $s.Rel
  $yaml = Get-Content $file -Raw
  $yaml = $yaml -replace 'Template: "f352f7cd-0a08-419a-9670-e7ef478cd2a2"', "Template: `"$tplProductCategory`""
  $yaml = Set-YamlField $yaml $fldCatImg 'Image' (Get-DamXml $s.Img) -Multiline
  $yaml = Set-YamlField $yaml $fldCatImg2 'Image2' (Get-DamXml $s.Img2) -Multiline
  Write-Utf8 $file $yaml
  Write-Host "Patched series: $($s.Rel)"
}

# --- Wire layouts ---
function Set-RenderingDs([string]$Yaml, [string]$RenderingId, [string]$DsId) {
  $rid = $RenderingId.ToUpper()
  $ds = $DsId.ToUpper()
  if ($Yaml -match "s:id=`"\{$rid\}`"[^\r\n]*s:ds=") { return $Yaml }
  if ($Yaml -match "s:ds=`"\{[^}]+\}`"\r?\n\s*s:id=`"\{$rid\}`"") { return $Yaml }
  return $Yaml -replace "s:id=`"\{$rid\}`"", "s:ds=`"{$ds}`"`r`n          s:id=`"{$rid}`""
}

$pdCat = Join-Path $contentRoot 'Presentation\Partial Designs\ProductCategoryContent.yml'
$pdCatYaml = Set-RenderingDs (Get-Content $pdCat -Raw) 'B40E0001-1111-4000-8000-000000000008' $dsPlAll
Write-Utf8 $pdCat $pdCatYaml

$homeYml = Join-Path $contentRoot 'Home.yml'
$homeYaml = Set-RenderingDs (Get-Content $homeYml -Raw) 'B40E0001-1111-4000-8000-000000000008' $dsPlAll
Write-Utf8 $homeYml $homeYaml

$lab = Join-Path $contentRoot 'Home\labelling-and-receipts.yml'
if (Test-Path $lab) {
  $labYaml = Set-RenderingDs (Get-Content $lab -Raw) 'B40E0001-1111-4000-8000-000000000008' $dsPlLabelling
  Write-Utf8 $lab $labYaml
}

# RelatedProducts lives on ProductPage __Standard Values / each PDP (page-level), not ProductContent.
# CtaBanner is also page-level so Pages can personalize it. Do not add either to the partial.

# Blog page
$blog = Join-Path $contentRoot 'Home\brother-for-home\blog\your-home-office\2024\5-great-ideas-for-organising-your-desk-and-home-office.yml'
# hash folder copy may exist - find by Path
$blogFiles = Get-ChildItem -Path (Join-Path $SerializedRoot 'brother') -Recurse -Filter '*5-great-ideas*'
foreach ($bf in $blogFiles) {
  $by = Get-Content $bf.FullName -Raw
  if ($by -notmatch 'F36E05EB-5636-49BB-BBC7-5A9BF2B77210') {
    $insert = @"
        <r
          uid="{B40E1000-0004-4000-8000-000000000002}"
          p:after="r[@uid='{B40E1000-0004-4000-8000-000000000001}']"
          s:ds="{$($dsRpBlog.ToUpper())}"
          s:id="{F36E05EB-5636-49BB-BBC7-5A9BF2B77210}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=2"
          s:ph="headless-main" />
"@
    $by = $by -replace '(</d>\r?\n\s*</r>)', "$insert`r`n      `$1"
    Write-Utf8 $bf.FullName $by
    Write-Host "Wired RelatedProducts on blog: $($bf.Name)"
  }
}

# Available Renderings
$ar = Join-Path $contentRoot 'Presentation\Available Renderings\Brother.yml'
$arYaml = Get-Content $ar -Raw
if ($arYaml -notmatch 'F36E05EB-5636-49BB-BBC7-5A9BF2B77210') {
  $arYaml = $arYaml -replace '(\{B40E0001-1111-4000-8000-00000000000B\})', "`$1`r`n    {F36E05EB-5636-49BB-BBC7-5A9BF2B77210}"
  Write-Utf8 $ar $arYaml
  Write-Host 'Added RelatedProducts to Available Renderings'
}

# Export extended field plan for inventory
$planPath = Join-Path $PSScriptRoot 'media-maps\device-image-field-plan.csv'
$planRows = [System.Collections.Generic.List[object]]::new()
foreach ($l in $listings) {
  $planRows.Add([pscustomobject]@{ DataItemPath = "/sitecore/content/brother/brother/Data/Product Listings/$($l.Name)"; FieldName = 'Image'; LocalFile = $l.File; Purpose = "Product listing $($l.Name)" })
}
foreach ($rel in $deviceImages.Keys) {
  $map = $deviceImages[$rel]
  $sitecorePath = '/sitecore/content/brother/brother/Home/devices/' + ($rel -replace '\\', '/' -replace '\.yml$', '')
  foreach ($fn in @('Image', 'Image2', 'Image3')) {
    if ($map.$fn) {
      $planRows.Add([pscustomobject]@{ DataItemPath = $sitecorePath; FieldName = $fn; LocalFile = $map.$fn; Purpose = "Device $fn" })
    }
  }
}
$planRows.Add([pscustomobject]@{ DataItemPath = '/sitecore/content/brother/brother/Home/devices'; FieldName = 'Image'; LocalFile = 'web-office-labelling-banner.jpg'; Purpose = 'Devices hub' })
$planRows.Add([pscustomobject]@{ DataItemPath = '/sitecore/content/brother/brother/Home/devices'; FieldName = 'Image2'; LocalFile = 'category-office-labelling.jpg'; Purpose = 'Devices hub' })
$planRows | Export-Csv $planPath -NoTypeInformation -Encoding UTF8
Write-Host "Field plan: $planPath ($($planRows.Count) rows)"
Write-Host 'Done.'
