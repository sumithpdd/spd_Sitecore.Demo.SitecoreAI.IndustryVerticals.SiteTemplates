# Sitecore MCP Product Import Guide

## Importing Brother Desktop Label Printers

This guide documents how to use the Sitecore Marketer MCP to import product data from the CSV file.

---

## Product Folder Structure

All product-related files are stored in `docs/product/`:

```
docs/product/
├── brother-desktop-label-printers.csv     # Product data (16 printers)
├── VC-500WCR-Page-Screenshot.png          # Design screenshot from Figma
├── VC-500WCR-Page-Screenshot.pdf          # Design PDF export
├── VC-500WCR-Product-Page.html            # VC-500WCR full specification
├── VC-500WCR-Product-Page.pdf             # VC-500WCR spec as PDF
└── produtpagetemplate.html                # Page template reference
```

---

## Product Data Source

**File**: `docs/product/brother-desktop-label-printers.csv`

### CSV Columns Mapping

| CSV Column | Sitecore Field | Type |
|------------|----------------|------|
| Name | Title | Single-line text |
| SKU | SKU | Single-line text |
| Description | ShortDescription | Multi-line text |
| Price (Inc VAT) | Price | Number |
| Price (Ex VAT) | SalePrice | Number |
| Print Width | PrintWidth | Single-line text |
| Print Resolution | PrintResolution | Single-line text |
| Connectivity | Connectivity | Single-line text |
| Print Speed | PrintSpeed | Single-line text |
| Features | Features | Single-line text |

---

## Sitecore Site Configuration

### Brother Site Details

```json
{
  "siteId": "e9437212-845d-4ec5-9b58-c08bfad0714e",
  "siteName": "brother",
  "rootPath": "/sitecore/content/industry-verticals/brother",
  "homePageId": "c64fba9d-e285-46ef-b788-d13872c06498"
}
```

### Target Location

Create products under:
- **Path**: `/Products/Labelling-and-Receipts/Desktop-Label-Printers`
- **Parent ID**: `281f37ed-e425-4126-837a-27518ef83ceb` (Labelling-and-Receipts)

### Template Configuration

```json
{
  "ProductPage": {
    "templateId": "f6e44a9e-074a-4865-987e-0c2dc00b7af5",
    "fields": [
      "Title",
      "SKU", 
      "ShortDescription",
      "LongDescription",
      "Price",
      "SalePrice",
      "Image1",
      "Image2",
      "Image3",
      "Image4", 
      "Image5",
      "Category",
      "Tags",
      "PrintWidth",
      "PrintResolution",
      "Connectivity",
      "PrintSpeed",
      "Features",
      "ProductDetails",
      "ProductOverview"
    ]
  },
  "ProductCategoryPage": {
    "templateId": "4d2b49e6-1130-444a-b22c-5c7e25d01b56"
  }
}
```

---

## MCP Commands Reference

### Step 1: List Sites

```
Prompt: "Use Sitecore MCP list_sites to show all available sites"
```

**Tool Call**:
```json
{
  "tool": "list_sites"
}
```

### Step 2: Get Site Information

```
Prompt: "Get detailed information about the Brother site including templates"
```

**Tool Call**:
```json
{
  "tool": "get_site_information",
  "parameters": {
    "siteId": "e9437212-845d-4ec5-9b58-c08bfad0714e"
  }
}
```

### Step 3: Create Category Page (if needed)

```
Prompt: "Create a new ProductCategoryPage called 'Desktop Label Printers' 
         under the Labelling-and-Receipts section"
```

**Tool Call**:
```json
{
  "tool": "create_page",
  "parameters": {
    "siteName": "brother",
    "parentPageId": "281f37ed-e425-4126-837a-27518ef83ceb",
    "templateId": "4d2b49e6-1130-444a-b22c-5c7e25d01b56",
    "pageName": "Desktop-Label-Printers",
    "language": "en",
    "fields": {
      "Title": "Desktop Label Printers",
      "NavigationTitle": "Desktop Label Printers"
    }
  }
}
```

### Step 4: Create Product Pages

For each product in the CSV, create a ProductPage:

**Example: QL-810W Wireless Label Printer**

```json
{
  "tool": "create_page",
  "parameters": {
    "siteName": "brother",
    "parentPageId": "[Desktop-Label-Printers-Page-ID]",
    "templateId": "f6e44a9e-074a-4865-987e-0c2dc00b7af5",
    "pageName": "QL-810W-Wireless-Label-Printer",
    "language": "en",
    "fields": {
      "Title": "QL-810W Wireless Label Printer",
      "SKU": "QL-810W",
      "ShortDescription": "Versatile and easy to use, print labels with black and red text",
      "PrintWidth": "Up to 62mm",
      "PrintResolution": "Up to 300dpi",
      "Connectivity": "USB and Wi-Fi connectivity with AirPrint support",
      "Features": "Print on pre sized labels (for your address or shipping labels), Built-in label editing software, Print in black and red without needing ink or toner, Integrated cutter"
    }
  }
}
```

---

## Products to Import (from CSV)

### 1. QL-810W Wireless Label Printer
```json
{
  "Title": "QL-810W Wireless Label Printer",
  "SKU": "QL-810W",
  "ShortDescription": "Versatile and easy to use, print labels with black and red text",
  "PrintWidth": "Up to 62mm",
  "PrintResolution": "Up to 300dpi",
  "Connectivity": "USB and Wi-Fi connectivity with AirPrint support",
  "Features": "Print on pre sized labels (for your address or shipping labels), Built-in label editing software, Print in black and red without needing ink or toner, Integrated cutter"
}
```

### 2. TD-2120N Industrial Label Printer + Network
```json
{
  "Title": "TD-2120N Industrial Label Printer + Network",
  "SKU": "TD-2120N",
  "ShortDescription": "The versatile professional desktop labeller",
  "Price": 294.80,
  "SalePrice": 353.76,
  "PrintWidth": "Up to 118mm",
  "PrintResolution": "203dpi",
  "Connectivity": "Network capability + optional accessories (touch panel display, label peeler, rechargeable battery, wireless LAN & Bluetooth), USB and serial connectivity",
  "PrintSpeed": "Up to 6 inches per second",
  "Features": "32MB RAM, 16MB Flash, ZPL II printer language"
}
```

### 3. QL-1100c PC connectable label printer
```json
{
  "Title": "QL-1100c PC connectable label printer",
  "SKU": "QL-1100c",
  "ShortDescription": "High-speed shipping label printer, ideal for printing barcodes and large shipping labels in warehouses and mail rooms",
  "Price": 229.00,
  "SalePrice": 274.80,
  "PrintWidth": "Up to 103.6mm",
  "PrintResolution": "Up to 300dpi",
  "Connectivity": "USB connectivity for PC and Mac",
  "PrintSpeed": "Up to 110mm/second",
  "Features": "Store up to 99 label templates in printer's memory, Supports FBA (Fulfilled By Amazon) labels through PDF crop print function, Built-in cutter, Windows SDK available"
}
```

### 4. QL-1110NWBc wireless shipping and barcode label printer
```json
{
  "Title": "QL-1110NWBc wireless shipping and barcode label printer",
  "SKU": "QL-1110NWBc",
  "ShortDescription": "Fully featured warehouse and mail room label printer for labelling boxes and parcels",
  "Price": 319.00,
  "SalePrice": 382.80,
  "PrintWidth": "Up to 103.6mm",
  "PrintResolution": "Up to 300dpi",
  "Connectivity": "USB, Ethernet, Wi-Fi and Bluetooth connectivity with support for MFi and AirPrint",
  "PrintSpeed": "Up to 110mm/second",
  "Features": "Store up to 99 label templates in printer's memory, Supports FBA labels through PDF crop print function, Built-in cutter, Various SDKs available for Windows, iOS and Android"
}
```

### 5. QL-700 Address Label Printer
```json
{
  "Title": "QL-700 Address Label Printer",
  "SKU": "QL-700",
  "ShortDescription": "Plug and play labelling for the busy office",
  "Price": 94.99,
  "SalePrice": 113.99,
  "PrintWidth": "Up to 62mm (DK labels)",
  "PrintResolution": "Up to 300dpi",
  "Connectivity": "USB connectivity",
  "PrintSpeed": "Up to 93 standard address labels per min / 150mm per second",
  "Features": "Print die-cut labels and signage via PC, Up to 59mm print height, Easy to install label rolls, Built-in automatic tape cutter"
}
```

### 6. QL-810Wc wireless label printer
```json
{
  "Title": "QL-810Wc wireless label printer",
  "SKU": "QL-810Wc",
  "ShortDescription": "Label printer with USB, Wi-Fi and AirPrint. Prints both black and red text",
  "Price": 160.00,
  "SalePrice": 192.00,
  "PrintWidth": "Up to 62mm",
  "PrintResolution": "Up to 300dpi",
  "Connectivity": "USB and Wi-Fi connectivity with AirPrint support",
  "Features": "Built-in label editing software doesn't need installing, Print in black and red without needing ink or toner, Integrated cutter, Optional rechargeable Li-ion battery base for mobile labelling"
}
```

### 7. QL-820NWBc network label printer
```json
{
  "Title": "QL-820NWBc network label printer",
  "SKU": "QL-820NWBc",
  "ShortDescription": "Label printer with a wide range of integrated connectivity options, including Wi-Fi, wired Ethernet, Bluetooth and AirPrint",
  "Price": 195.00,
  "SalePrice": 234.00,
  "PrintWidth": "Up to 62mm",
  "PrintResolution": "Up to 300dpi",
  "Connectivity": "USB, Ethernet, Wi-Fi and Bluetooth connectivity with support for MFi and AirPrint",
  "Features": "Large back lit LCD display for easy set-up and operation, Print in black and red without needing ink or toner, Built-in cutter, Optional rechargeable Li-ion battery base, Print labels stored in memory using integrated control panel"
}
```

### 8. TD-4550DNWB Professional Bluetooth Wireless Desktop Label Printer
```json
{
  "Title": "TD-4550DNWB Professional Bluetooth Wireless Desktop Label Printer",
  "SKU": "TD-4550DNWB",
  "ShortDescription": "Print high quality, continuous labels using media up to 118mm/4.65 inch wide",
  "Price": 476.95,
  "SalePrice": 572.34,
  "PrintWidth": "Up to 118mm/4.65 inch",
  "PrintResolution": "Up to 300dpi",
  "Connectivity": "Network, wireless and bluetooth connectivity",
  "PrintSpeed": "Up to 6 images per second",
  "Features": "User-friendly backlit LCD screen, Professional quality print resolution, Ready to integrate with iOS and Android apps"
}
```

---

## Bulk Import Prompt

Use this prompt in Cursor when the Sitecore MCP is connected:

```
Using the Sitecore MCP, import all 16 desktop label printers from 
docs/product/brother-desktop-label-printers.csv into the Brother site.

Steps:
1. First create a category page called "Desktop-Label-Printers" under 
   Labelling-and-Receipts (parent ID: 281f37ed-e425-4126-837a-27518ef83ceb)
   using ProductCategoryPage template (4d2b49e6-1130-444a-b22c-5c7e25d01b56)

2. For each row in the CSV, create a ProductPage using template 
   f6e44a9e-074a-4865-987e-0c2dc00b7af5 with these field mappings:
   - Name → Title
   - SKU → SKU
   - Description → ShortDescription
   - Price (Ex VAT) → Price (remove £ symbol, convert to number)
   - Price (Inc VAT) → SalePrice (remove £ symbol, convert to number)
   - Print Width → PrintWidth
   - Print Resolution → PrintResolution
   - Connectivity → Connectivity
   - Print Speed → PrintSpeed
   - Features → Features

3. Generate the page name from the product name (slugified)

4. Report which products were created successfully
```

---

## Verification

After import, verify in Sitecore:

1. **Content Tree**: Products appear under `/Products/Labelling-and-Receipts/Desktop-Label-Printers`
2. **Experience Editor**: Open a product page and verify fields are populated
3. **Preview**: Check the frontend rendering

---

## Automated Import with Cloud Agents

### Why Use Cloud Agents?

Instead of manually running prompts, [Cursor Cloud Agents](https://cursor.com/docs/cloud-agent) can automatically:
- Monitor `docs/product/brother-desktop-label-printers.csv` for changes
- Detect new products or updates
- Create/update Sitecore items automatically
- Open GitHub PRs for review

### Cloud Agent Setup

1. **Connect GitHub**: 
   - Go to [cursor.com/agents](https://cursor.com/agents)
   - Grant read-write access to the repo

2. **Configure Environment**:
   - Run `Cmd+Shift+P` → `Cursor: Start Cloud Agent Setup`
   - Create `.cursor/environment.json`:
   
```json
{
  "snapshot": "POPULATED_FROM_SETTINGS",
  "install": "npm install",
  "terminals": []
}
```

3. **Add Secrets** (Cursor Settings → Cloud Agents → Secrets):
   - `GITHUB_PERSONAL_ACCESS_TOKEN`
   - Any Sitecore API credentials needed

### Cloud Agent Prompt for Auto-Sync

```
You are monitoring docs/product/brother-desktop-label-printers.csv

WHEN THE FILE CHANGES:

1. Parse the CSV and identify:
   - NEW products (SKU not in Sitecore)
   - UPDATED products (data changed)

2. For NEW products, use Sitecore MCP create_page:
   - Site: brother
   - Parent: Labelling-and-Receipts category
   - Template: ProductPage (f6e44a9e-074a-4865-987e-0c2dc00b7af5)
   - Map fields from CSV columns

3. For UPDATED products, use Sitecore MCP update_page:
   - Find existing item by SKU
   - Update changed fields only

4. Create GitHub PR:
   - Branch: feature/product-sync-[date]
   - Title: "🤖 Auto-sync: [N] products updated from CSV"
   - Body: List of changes made
   - Labels: ai-generated, sitecore-sync

5. Comment on PR with Sitecore item IDs created/updated
```

### Design Change Detection

When new design screenshots are added to `docs/product/`:

```
You are monitoring docs/product/ for new design files (*.png, *.pdf)

WHEN A NEW DESIGN FILE IS ADDED:

1. If it's a product page design:
   - Analyze the layout structure
   - Compare with current ProductDetails.tsx
   - Update component code if layout differs

2. If it's for a specific product (e.g., VC-500WCR):
   - Extract product information from the design
   - Update Sitecore item with new details
   - Update product images if provided

3. Create GitHub PR with:
   - Component changes (if any)
   - Sitecore sync summary
   - Tag: ai-generated, design-sync
```

---

## Alternative: Sitecore Authoring API

For **bulk imports**, **template management**, and **CI/CD integration**, use the Sitecore Authoring API instead of or alongside the MCP.

📖 **Full documentation**: [SITECORE-AUTHORING-API.md](./SITECORE-AUTHORING-API.md)

### When to Use Authoring API vs MCP

| Scenario | Recommended |
|----------|-------------|
| Interactive content editing | MCP |
| Creating a few pages | MCP |
| **Importing 16+ products** | Authoring API |
| **Checking template fields** | Authoring API |
| **Adding new template fields** | Authoring API |
| **CI/CD pipeline automation** | Authoring API |

### Quick Example: Bulk Import with Authoring API

```bash
# 1. Authenticate
TOKEN=$(curl -s -X POST "https://auth.sitecorecloud.io/oauth/token" \
  -d "grant_type=client_credentials" \
  -d "client_id=$SITECORE_CLIENT_ID" \
  -d "client_secret=$SITECORE_CLIENT_SECRET" \
  -d "audience=https://api.sitecorecloud.io" | jq -r '.access_token')

# 2. Verify template has required fields
curl -X GET "https://{cm-host}/sitecore/api/authoring/template/f6e44a9e-074a-4865-987e-0c2dc00b7af5/fields" \
  -H "Authorization: Bearer $TOKEN"

# 3. Create product items (loop through CSV)
for product in $(cat products.json); do
  curl -X POST "https://{cm-host}/sitecore/api/authoring/item" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$product"
  sleep 0.6  # Rate limit: max 100 req/min
done
```

### Template Verification Before Import

**Important**: Before importing products, verify the ProductPage template has the printer-specific fields:

```bash
# Check current template fields
curl -X GET "https://{cm-host}/sitecore/api/authoring/template/f6e44a9e-074a-4865-987e-0c2dc00b7af5/fields" \
  -H "Authorization: Bearer $TOKEN"

# If fields are missing, add them:
curl -X PUT "https://{cm-host}/sitecore/api/authoring/template/f6e44a9e-074a-4865-987e-0c2dc00b7af5" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "add": [
        { "name": "PrintWidth", "type": "Single-Line Text", "section": "Specifications" },
        { "name": "PrintResolution", "type": "Single-Line Text", "section": "Specifications" },
        { "name": "Connectivity", "type": "Multi-Line Text", "section": "Specifications" },
        { "name": "PrintSpeed", "type": "Single-Line Text", "section": "Specifications" },
        { "name": "Features", "type": "Multi-Line Text", "section": "Specifications" }
      ]
    }
  }'
```

### Reference Links

- [Sitecore Authoring API Walkthrough](https://doc.sitecore.com/sai/en/developers/sitecoreai/walkthrough--enabling-and-authorizing-requests-to-the-authoring-and-management-api.html)
- [Comprehensive Guide to Sitecore Authoring API](https://medium.com/@praveensharma6019/comprehensive-guide-to-sitecore-authoring-api-for-item-management-sitecoreai-sitecore-xmc-166616f2a358)

---

## File Reference

| File | Purpose |
|------|---------|
| `docs/product/brother-desktop-label-printers.csv` | Product catalog data |
| `docs/product/VC-500WCR-Page-Screenshot.png` | Product page design |
| `docs/product/VC-500WCR-Product-Page.html` | Full product specification |
| `docs/product/VC-500WCR-Product-Page.pdf` | Product spec (PDF format) |
| `docs/SITECORE-AUTHORING-API.md` | Authoring API documentation |

---

*Document created: January 30, 2026*

