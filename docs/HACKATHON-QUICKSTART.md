# Hackathon Quick Start Guide

## 🚀 Figma → GitHub → Sitecore in 15 Minutes

This is the hands-on guide for demonstrating the end-to-end workflow.

---

## Prerequisites Checklist

Before the demo, ensure:

- [ ] Figma Desktop app open with product design selected
- [ ] Figma MCP server enabled (Preferences → Enable Dev Mode MCP Server)
- [ ] Cursor IDE with MCP servers configured
- [ ] GitHub PAT configured
- [ ] Sitecore XM Cloud accessible

---

## Understanding What Makes This Work

### Why Figma MCP is Different from Screenshots

When an AI looks at a screenshot, it's guessing. When it connects via MCP, it *knows*.

| Screenshot-Based | Figma MCP |
|------------------|-----------|
| "This looks like a blue button" | "This is Button/Primary variant with fill #0066CC" |
| "The text appears to be around 16px" | "Text layer uses Inter/Semibold/16 with line-height 24" |
| "There's some spacing here" | "Auto-layout with gap: 16px, padding: 24px" |
| "I think these are related" | "These layers are children of Frame 'ProductCard'" |

The Figma MCP server sends structured JSON that includes:
- **Node tree**: Complete layer hierarchy
- **Variant info**: Component states and properties
- **Layout constraints**: Auto-layout, spacing, alignment rules
- **Design tokens**: Colors, fonts, effects
- **Asset references**: Image URLs and export settings

This means the AI generates code that actually uses your design system—not approximations.

---

## Pre-Demo Setup (Do This Before Presenting)

### Step 1: Open Figma Desktop & Enable MCP

1. Launch **Figma Desktop** (not web—MCP only works locally)
2. Open your design file (e.g., Brother product page)
3. Go to **Figma Menu → Preferences**
4. Check **"Enable Dev Mode MCP Server"**
5. Server starts at `http://127.0.0.1:3845/sse`

### Step 2: Connect Cursor to Figma

1. Open Cursor Settings → MCP Tools
2. Find Figma → Click "Add to Cursor"
3. Install when prompted
4. Verify: Look for **green dot** and "4 tools enabled"

### Step 3: Select Your Design Layer

In Figma, **select the frame you want to convert**. The MCP can only see what's selected!

> 💡 **Pro tip**: Select the outermost frame of your component. The AI will receive the full hierarchy of everything inside it.

---

## Demo Script

### Part 1: Design Extraction (Figma MCP) - 3 min

**Setup**: Open Figma Desktop and select the product page design frame.

> 🎯 **Key Point for Audience**: "Notice that I'm selecting a specific frame in Figma. The MCP server can only see what I have selected—this gives us precise control over what we're extracting."

**In Cursor, use this prompt:**

```
Using the Figma MCP, analyze the currently selected product page design.

1. Describe the layout structure (hero, product info, tabs, etc.)
2. Identify the key components and their hierarchy
3. Extract the color palette and typography being used
4. List any images or assets that need to be exported

Present this as a structured analysis I can use to generate code.
```

**What the AI Receives (explain to audience):**

The Figma MCP doesn't send a screenshot—it sends structured data like this:

```json
{
  "type": "FRAME",
  "name": "ProductPage",
  "children": [
    {
      "type": "FRAME", 
      "name": "ProductGallery",
      "layoutMode": "HORIZONTAL",
      "itemSpacing": 16
    },
    {
      "type": "FRAME",
      "name": "ProductInfo", 
      "children": [
        { "type": "TEXT", "name": "Title", "style": "Heading/H1" },
        { "type": "TEXT", "name": "Price", "style": "Price/Large" }
      ]
    }
  ],
  "fills": [{ "type": "SOLID", "color": { "r": 1, "g": 1, "b": 1 } }]
}
```

**Expected Output:**
- Layer hierarchy breakdown
- Component identification  
- Design token extraction (actual hex codes, font specs)
- Asset list with URLs

---

### ⚠️ Important: Linting Before Commit

All generated code MUST pass linting. Add this to your prompts:

```
BEFORE COMMITTING ANY CODE:
1. Ensure no unused imports or variables
2. Follow Prettier formatting (no trailing newlines)
3. Use correct Tailwind class order (e.g., text-left sm:px-8)
4. Run: npm run lint in industry-verticals/brother
```

**Common issues to avoid:**
- Unused imports: `import { X } from '...'` where X is never used
- Extra blank lines at end of files
- Wrong Tailwind order: `sm:px-8 text-left` → `text-left sm:px-8`

---

### Part 2: Code Generation - 5 min

**Generate/update components based on the design:**

```
Based on the Figma design analysis, update the Brother product page components:

1. Review the existing ProductDetails.tsx component
2. Compare it with the Figma design structure
3. Generate any new sub-components needed
4. Update the ProductTabs to match the design's tab structure
5. Ensure all styling uses our Tailwind design tokens

Use the existing codebase patterns and component library.
Target directory: industry-verticals/brother/src/components/
```

**Key files that may be updated:**
- `ProductDetails.tsx`
- `ProductGallery.tsx`
- `ProductSpecifications.tsx`
- `ProductTabs.tsx`

---

### Part 3: GitHub Integration - 3 min

> 🔧 **Setup Note**: GitHub MCP requires a Personal Access Token. Use the **npx method** (not Docker) for easiest setup. See `docs/FIGMA-TO-SITECORE-WORKFLOW.md` for full setup instructions.

**Verify GitHub MCP is connected** (green dot in Cursor Settings → MCP Tools)

**Create branch and PR for review:**

```
Using the GitHub MCP:

1. Create a new branch called 'feature/hackathon-product-page-update'
2. Stage all the component changes we just made
3. Create a commit with message: "🤖 AI: Update product page from Figma design"
4. Open a Pull Request with:
   - Title: "🤖 AI Generated: Product Page Update from Figma"
   - Description explaining the changes
   - Label: "ai-generated", "needs-review"

Repository: spd-Sitecore.Demo.XMCloud.IndustryVerticals
```

**MCP Config (npx method - no Docker required):**
```json
{
  "mcpServers": {
    "GitHub": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

**PR will include:**
- Automated diff of changes
- AI-generated description
- Review request

---

### Part 4: Sitecore Deployment - 4 min

**Create products in Sitecore from CSV data:**

```
Using the Sitecore MCP and the data from docs/product/brother-desktop-label-printers.csv:

1. First, get the Brother site information to find the correct parent page
2. Get the ProductPage template (f6e44a9e-074a-4865-987e-0c2dc00b7af5) fields
3. Create a new category page "Desktop Label Printers" under Labelling-and-Receipts
4. Create the first 3 products from the CSV as ProductPages:
   - QL-810W Wireless Label Printer
   - TD-2120N Industrial Label Printer
   - QL-1100c PC connectable label printer

Map CSV columns to Sitecore fields:
- Name → Title
- SKU → SKU
- Description → ShortDescription
- Price (Ex VAT) → Price (convert to number, remove £)
- Features → Features
- Print Width → PrintWidth
- Print Resolution → PrintResolution
- Connectivity → Connectivity
- Print Speed → PrintSpeed
```

---

## Sample Prompts Library

### Quick Reference Prompts

#### Get Figma Design Data
```
Use the Figma MCP to get the selected layer. Show me the component 
structure and any design tokens (colors, spacing, typography).
```

#### Generate Component from Design
```
Based on the Figma design, create a new React component called 
[ComponentName] that matches the layout. Use TypeScript and 
Tailwind CSS. Follow the existing patterns in the codebase.
```

#### Create GitHub PR
```
Create a GitHub PR for the current changes with title 
"🤖 [Description]". Mark it as AI-generated and request review.
```

#### List Sitecore Sites
```
Use Sitecore MCP to list all available sites and show me 
the Brother site structure.
```

#### Create Sitecore Product
```
Using Sitecore MCP, create a new ProductPage with:
- Title: [Product Name]
- SKU: [SKU]
- Price: [Price]
- ShortDescription: [Description]

Create it under /Products/[Category]/
```

#### Bulk Product Import
```
Parse the CSV file at [path] and create ProductPages in Sitecore 
for each row. Use the Brother site and ProductPage template.
```

---

## Troubleshooting Quick Fixes

### Figma MCP Not Connecting
```bash
# Check if server is running
curl http://127.0.0.1:3845/sse

# If not, restart Figma Desktop and re-enable MCP in Preferences
```

### GitHub Authentication Failed
```bash
# Test your PAT
curl -H "Authorization: token YOUR_PAT" https://api.github.com/user
```

### Sitecore MCP Error
```
# Verify site access
"Use Sitecore MCP to list all sites and verify the Brother site is accessible"
```

---

## Demo Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  LIVE DEMO FLOW (15 minutes)                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐                                               │
│  │ 1. FIGMA     │  "Analyze the selected product page design"  │
│  │    (3 min)   │  → Shows design structure & tokens           │
│  └──────┬───────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────┐                                               │
│  │ 2. CODE GEN  │  "Generate React components from design"     │
│  │    (5 min)   │  → Creates/updates ProductDetails.tsx        │
│  └──────┬───────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────┐                                               │
│  │ 3. GITHUB    │  "Create PR for review"                      │
│  │    (3 min)   │  → Opens PR with AI-generated label          │
│  └──────┬───────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────┐                                               │
│  │ 4. SITECORE  │  "Create products from CSV"                  │
│  │    (4 min)   │  → Products appear in XM Cloud               │
│  └──────────────┘                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Talking Points

### For Customer Demo

1. **Speed**: "What used to take days now takes minutes"
2. **Quality**: "AI uses your existing design system and components"
3. **Control**: "Human-in-the-loop ensures nothing goes live without review"
4. **Traceability**: "Full audit trail through GitHub PRs"

### For Technical Audience

1. **MCP Protocol**: "Open standard - works with any AI that supports MCP"
2. **No Lock-in**: "Use Cursor, Claude, Copilot - your choice"
3. **Real Data**: "Figma MCP provides structured data, not screenshots"
4. **Existing Stack**: "Works with your current components and types"

---

## The "Before & After" Slide

### ❌ The Old Way (Manual Handoff)

```
Designer                    Developer                    Marketer
   │                            │                            │
   ├── Creates design ──────────┤                            │
   │   in Figma                 │                            │
   │                            ├── Opens Figma              │
   │                            ├── Inspects every layer     │
   │                            ├── Manually writes CSS      │
   │                            ├── Guesses at spacing       │
   │                            ├── Commits code             │
   │                            │                            │
   ├── "That's not right" ──────┤                            │
   │                            ├── Fixes, commits again     │
   │                            │                            │
   ├── "Closer, but..." ────────┤                            │
   │                            ├── More fixes...            │
   │                            ├── Finally merges           │
   │                            │                            │
   │                            │                            ├── Manually enters
   │                            │                            │   content in CMS
   │                            │                            ├── Uploads images
   │                            │                            ├── Hits publish
   │                            │                            │
   └── 3-5 days later... ───────┴────────────────────────────┘
```

### ✅ The New Way (MCP Integration)

```
Designer                    AI Agent                     Sitecore
   │                            │                            │
   ├── Creates design ──────────┤                            │
   │   in Figma                 │                            │
   │                            │                            │
   ├── Selects frame ───────────┤                            │
   │                            │                            │
   │    ┌───────────────────────┤                            │
   │    │ Figma MCP extracts:   │                            │
   │    │ • Node tree           │                            │
   │    │ • Design tokens       │                            │
   │    │ • Layout rules        │                            │
   │    │ • Asset references    │                            │
   │    └───────────────────────┤                            │
   │                            │                            │
   │                            ├── Generates code           │
   │                            ├── Opens GitHub PR          │
   │                            │   "🤖 Please review"       │
   │                            │                            │
   │     Developer reviews PR   │                            │
   │     (Human-in-the-loop)    │                            │
   │                            │                            │
   │                            ├── Creates content ─────────┤
   │                            │   via Sitecore MCP         │
   │                            │                            │
   └── Same day ────────────────┴────────────────────────────┘
```

### The Key Difference

> "The Figma MCP doesn't send a screenshot to guess at—it sends the same structured data a developer would manually extract. The AI knows your button uses `var(--color-primary)`, not 'some shade of blue'."

---

## Success Criteria

At the end of the demo, you should have:

- [ ] Design analyzed from Figma with structure breakdown
- [ ] Component code generated/updated in the repo
- [ ] Pull Request open in GitHub with AI label
- [ ] 3+ products created in Sitecore XM Cloud
- [ ] Visible in Sitecore Experience Editor

---

## Part 5: Cloud Agent Automation (Bonus Demo) - 3 min

### What are Cloud Agents?

[Cursor Cloud Agents](https://cursor.com/docs/cloud-agent) run autonomously in the cloud, monitoring your repo for changes and taking action automatically.

### Demo: Automated Product Sync

**Show the audience:**

1. **The `docs/product/` folder structure:**
```
docs/product/
├── brother-desktop-label-printers.csv     ← Product data
├── VC-500WCR-Page-Screenshot.png          ← Design screenshot
├── VC-500WCR-Product-Page.html            ← Product spec
└── VC-500WCR-Product-Page.pdf             ← Product PDF
```

2. **Start a Cloud Agent with this prompt:**

```
Monitor the docs/product/ folder for changes:

1. When brother-desktop-label-printers.csv is updated:
   - Parse the CSV for new/changed products
   - Create ProductPages in Sitecore via MCP
   - Open a GitHub PR with the sync summary

2. When a new design screenshot (*.png) is added:
   - Analyze the design
   - Update React components if layout changed
   - Create PR for review

Repository: spd-Sitecore.Demo.XMCloud.IndustryVerticals
Branch from: main
```

3. **Simulate a change:**
   - Add a new row to the CSV
   - Watch the Cloud Agent create the Sitecore product
   - Show the auto-generated PR

### Cloud Agent Setup (Pre-Demo)

1. **Connect GitHub**: Cloud agents need repo access
   - Go to [cursor.com/agents](https://cursor.com/agents)
   - Connect GitHub with read-write access
   
2. **Configure environment**: 
   - Run `Cmd+Shift+P` → `Cursor: Start Cloud Agent Setup`
   - Or use deeplink: `cursor://anysphere.cursor-deeplink/background-agent/setup`

3. **Add secrets** (Cursor Settings → Cloud Agents → Secrets):
   - `GITHUB_PERSONAL_ACCESS_TOKEN`
   - `SITECORE_API_KEY` (if needed)

---

## Backup Plans

### If Figma MCP fails:
- Use the screenshot at `docs/product/VC-500WCR-Page-Screenshot.png`
- Prompt: "Analyze this product page screenshot and describe the layout"

### If GitHub MCP fails:

**Common issue: Docker error on Windows**
```
docker: error during connect: ... open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
```

**Fix**: Use npx instead of Docker in your config:
```json
{
  "GitHub": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token"
    }
  }
}
```

**Other fixes:**
- Ensure token has `repo` scope
- Restart Cursor after config changes
- Show the code changes locally as backup
- Explain the PR process conceptually

### If Sitecore MCP fails:
- Show existing products in Experience Editor
- Walk through the create_page payload structure
- **Use Authoring API as backup** (see below)

---

## Part 6: Advanced - Sitecore Authoring API (Bonus) - 2 min

### Why Authoring API?

The Marketer MCP is great for interactive editing, but for **bulk operations** and **template management**, use the Authoring API directly.

| Capability | MCP | Authoring API |
|------------|-----|---------------|
| Interactive edits | ✅ Best | ⚠️ Manual |
| **Template field check** | ❌ | ✅ |
| **Add template fields** | ❌ | ✅ |
| **Bulk import** | ⚠️ Slow | ✅ Fast |

### Demo: Check Template Fields

**Before importing products, verify the template has required fields:**

```bash
# 1. Get OAuth token
curl -X POST "https://auth.sitecorecloud.io/oauth/token" \
  -d "grant_type=client_credentials" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "audience=https://api.sitecorecloud.io"

# 2. Check ProductPage template fields
curl -X GET "https://{cm-host}/sitecore/api/authoring/template/f6e44a9e-074a-4865-987e-0c2dc00b7af5/fields" \
  -H "Authorization: Bearer $TOKEN"
```

**If fields are missing:**

```bash
# Add printer-specific fields to ProductPage template
curl -X PUT "https://{cm-host}/sitecore/api/authoring/template/f6e44a9e-074a-4865-987e-0c2dc00b7af5" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "add": [
        { "name": "PrintWidth", "type": "Single-Line Text" },
        { "name": "PrintResolution", "type": "Single-Line Text" },
        { "name": "Connectivity", "type": "Multi-Line Text" },
        { "name": "Features", "type": "Multi-Line Text" }
      ]
    }
  }'
```

### Demo: Bulk Create Products

**Create multiple products in one script:**

```bash
# Create product via Authoring API
curl -X POST "https://{cm-host}/sitecore/api/authoring/item" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "QL-810W-Wireless-Label-Printer",
    "templateId": "f6e44a9e-074a-4865-987e-0c2dc00b7af5",
    "parentId": "281f37ed-e425-4126-837a-27518ef83ceb",
    "language": "en",
    "fields": {
      "Title": "QL-810W Wireless Label Printer",
      "SKU": "QL-810W",
      "ShortDescription": "Print labels with black and red text",
      "PrintWidth": "Up to 62mm",
      "PrintResolution": "Up to 300dpi",
      "Connectivity": "USB, Wi-Fi, AirPrint"
    }
  }'
```

### Key Talking Point

> "The Authoring API gives us **programmatic control** over Sitecore templates and content. This means we can validate our TypeScript types match our Sitecore templates, add missing fields automatically, and do bulk imports—all from a CI/CD pipeline or Cloud Agent."

📖 **Full documentation**: [SITECORE-AUTHORING-API.md](./SITECORE-AUTHORING-API.md)

**Reference Links:**
- [Sitecore Authoring API Walkthrough](https://doc.sitecore.com/sai/en/developers/sitecoreai/walkthrough--enabling-and-authorizing-requests-to-the-authoring-and-management-api.html)
- [Comprehensive Guide](https://medium.com/@praveensharma6019/comprehensive-guide-to-sitecore-authoring-api-for-item-management-sitecoreai-sitecore-xmc-166616f2a358)

---

*Hackathon Demo Script v1.1 - January 30, 2026*

