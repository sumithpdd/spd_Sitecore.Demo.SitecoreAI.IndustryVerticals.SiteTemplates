# Design-to-Deployment Automation Workflow

## Figma → GitHub → Sitecore End-to-End Integration

This guide documents the hackathon workflow for automating the journey from marketing designs in Figma through code generation and review in GitHub to product deployment in Sitecore XM Cloud.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Architecture](#architecture)
4. [Step 1: Figma MCP Setup](#step-1-figma-mcp-setup)
5. [Step 2: GitHub MCP Setup](#step-2-github-mcp-setup)
6. [Step 3: Sitecore MCP Setup](#step-3-sitecore-mcp-setup)
7. [Step 4: End-to-End Workflow](#step-4-end-to-end-workflow)
8. [Human-in-the-Loop Review Process](#human-in-the-loop-review-process)
9. [Use Cases](#use-cases)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### The Problem

Traditional design-to-deployment workflows involve multiple manual handoffs:
- Designers create assets in Figma
- Developers manually translate designs to code
- Content is manually entered into the CMS
- Multiple review cycles slow down time-to-market

### The Solution

Using MCP (Model Context Protocol) servers, we can automate this pipeline:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Figma     │────▶│   AI Agent  │────▶│   GitHub    │────▶│  Sitecore   │
│   Design    │     │  (Cursor/   │     │   Review    │     │  XM Cloud   │
│             │     │   Claude)   │     │   (PR)      │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
     │                    │                   │                    │
     │  Figma MCP         │                   │  GitHub MCP        │  Sitecore MCP
     │  (Design Data)     │                   │  (Code Push)       │  (Content Deploy)
     └────────────────────┴───────────────────┴────────────────────┘
```

### Key Benefits

- **Speed**: Reduce design-to-deployment from days to hours
- **Consistency**: AI uses your design system and component library
- **Human Oversight**: "Created by AI, please review" step ensures quality
- **Traceability**: Full audit trail through GitHub PRs

---

## Prerequisites

### Required Tools

| Tool | Purpose | Link |
|------|---------|------|
| Figma Desktop App | Design source (requires Dev Mode) | [figma.com](https://figma.com) |
| Cursor IDE | AI-powered IDE with MCP support | [cursor.com](https://cursor.com) |
| GitHub Account | Code repository and review | [github.com](https://github.com) |
| Sitecore XM Cloud | Content deployment target | [sitecore.com](https://sitecore.com) |

### Required MCP Servers

1. **Figma Dev Mode MCP Server** - Extracts structured design data
2. **GitHub MCP Server** - Manages repositories and pull requests
3. **Sitecore Marketer MCP** - Creates and manages content in XM Cloud

### API Keys & Tokens

- [ ] Figma account with Dev Mode access (paid plan)
- [ ] GitHub Personal Access Token (PAT)
- [ ] Sitecore XM Cloud API credentials

---

## Architecture

### MCP Server Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                        AI Agent (Cursor/Claude)                     │
└────────────────────────────────────────────────────────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Figma MCP     │    │   GitHub MCP    │    │  Sitecore MCP   │
│   Server        │    │   Server        │    │  Server         │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • get_selection │    │ • create_pr     │    │ • list_sites    │
│ • get_styles    │    │ • push_files    │    │ • create_page   │
│ • get_images    │    │ • create_branch │    │ • update_page   │
│ • get_code_     │    │ • get_file      │    │ • get_template  │
│   connect_links │    │ • search_repos  │    │ • search_site   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
          │                        │                        │
          ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Figma       │    │     GitHub      │    │  Sitecore XM    │
│     Cloud       │    │                 │    │     Cloud       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## Step 1: Figma MCP Setup

### Understanding What Figma MCP Actually Sends

When you connect the Figma MCP server to an AI agent like Cursor or Claude, something powerful happens: the AI can now **read the actual structure** of your design, not just look at a flat image.

Here's what the Figma MCP server transmits to your AI:

| Data Type | What It Contains | Why It Matters |
|-----------|------------------|----------------|
| **Node Tree** | Complete hierarchy of frames, groups, and layers | AI understands parent-child relationships |
| **Variant Information** | Component states (hover, active, disabled) | Generates proper interactive states |
| **Layout Constraints** | Auto-layout rules, padding, spacing, alignment | Creates responsive code automatically |
| **Design Tokens** | Colors, typography, shadows, effects | Uses your design system consistently |
| **Asset References** | Image URLs, export settings | Downloads and links assets correctly |

**Why this beats screenshots**: Tools that analyze screenshots are essentially guessing based on pixels. They can't know that your button uses `--color-primary` or that your layout should flex-wrap at mobile breakpoints. The Figma MCP gives the AI the same structured information a developer would extract manually—except instantly.

This structured data supports three key workflows:
1. **Design-to-Code**: Generate production-ready components
2. **Automated Documentation**: Extract specs and style guides
3. **AI-Assisted Development**: Live collaboration between AI and your IDE

---

### 1.1 Grab a Design

Before we start, you'll need a Figma design to work with. You have two options:

**Option A: Use Your Own Design**
If you have existing Figma designs (like the Brother product page), open that file. It's more rewarding to see your actual work come to life.

**Option B: Use a Community Design System**
Visit [Figma's Community](https://www.figma.com/community) and grab a design system like:
- Material 3 Design Kit
- Ant Design System
- Any product page template

For the Brother hackathon, we'll use the product page design at `docs/product/VC-500WCR-Page-Screenshot.png` as our reference.

---

### 1.2 Enable the Dev Mode MCP Server in Figma Desktop

> ⚠️ **Important**: The official Figma MCP server requires a **paid Figma plan with Dev Mode**. If you're on a free plan, community alternatives exist but may have limitations.

**Steps to enable:**

1. **Open Figma Desktop App** (not the web version—the MCP server only runs locally)

2. **Open any design file** in your workspace

3. **Navigate to Preferences**:
   - Mac: `Figma Menu → Preferences`
   - Windows: `File → Preferences`

4. **Enable the MCP Server**:
   - Scroll to find **"Enable Dev Mode MCP Server"**
   - Check the checkbox

5. **Verify it's running**:
   - The server starts at: `http://127.0.0.1:3845/sse`
   - Port may vary based on your OS/firewall settings

```
┌─────────────────────────────────────────────────────────┐
│  Figma Preferences                                      │
├─────────────────────────────────────────────────────────┤
│  ☐ Snap to geometry                                    │
│  ☐ Highlight layers on hover                           │
│  ☑ Enable Dev Mode MCP Server  ← Check this box        │
│  ☐ Show plugin development menu                        │
└─────────────────────────────────────────────────────────┘
```

---

### 1.3 Set Up Your MCP Client (Cursor)

Now we connect Cursor (or your preferred AI IDE) to the Figma MCP server.

**Method 1: Install from Cursor's MCP Directory (Easiest)**

1. Open **Cursor Settings** (`Cmd/Ctrl + ,`)
2. Navigate to **MCP Tools** section
3. You'll see a grid of available integrations (Notion, Figma, Linear, GitHub, etc.)
4. Find **Figma** and click **"Add to Cursor"**
5. An install dialog appears with pre-filled details:
   - Name: `Figma Dev Mode MCP`
   - Type: `sse`
   - URL: `http://127.0.0.1:3845/sse`
6. Click **Install**

**Method 2: Manual Configuration**

Add to your Cursor MCP settings file (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "figma": {
      "url": "http://127.0.0.1:3845/sse"
    }
  }
}
```

---

### 1.4 Verify the Connection

After installation, check your Cursor Settings → MCP Tools:

| Status | Meaning |
|--------|---------|
| 🟢 Green dot + "4 tools enabled" | ✅ Connected successfully |
| 🔴 Red dot | ❌ Connection failed |

**If you see a red dot, try these fixes:**
1. Ensure **Figma Desktop app is open** (not minimized)
2. Verify MCP is enabled in Figma Preferences
3. Toggle the MCP server off and on in Cursor Settings
4. Check if another app is using port 3845
5. Restart both Figma and Cursor

---

### 1.5 Using Figma MCP in Prompts

Once connected, you can invoke Figma MCP in your prompts. The AI will make tool calls automatically:

```
"Use the Figma MCP to analyze the currently selected product page design..."
```

You'll see the AI call tools like:
- `get_selection` → Retrieves the selected layer's structure
- `get_styles` → Extracts design tokens
- `get_images` → Downloads image assets

### 1.6 Available Figma MCP Tools

| Tool | Description |
|------|-------------|
| `get_selection` | Get the currently selected layer's structured data |
| `get_styles` | Extract design tokens, colors, typography |
| `get_images` | Download image assets |
| `get_code_connect_links` | Get component code references |

---

### 1.7 Example: Design-to-Code Flow

Here's what happens when you ask the AI to convert a Figma design:

```
You: "Use the Figma MCP to get the selected product card and generate 
      a React component that matches it."

AI (internal): 
  1. Calls get_selection → Receives JSON structure of the card
  2. Identifies: frame with image, title text, price text, button
  3. Extracts: colors (#0066CC), font (Inter 16px), spacing (16px)
  4. Generates: ProductCard.tsx using your design tokens
  
AI (response):
  "I've analyzed the product card. It contains:
   - Image container (aspect-ratio: 1:1)
   - Product title (Inter Bold, 18px, #1a1a1a)
   - Price (Inter Semibold, 16px, #0066CC)
   - Add to cart button (primary blue, 8px radius)
   
   Here's the React component that matches this design..."
```

The AI isn't guessing from pixels—it's working with the same structured data you see in Figma's Dev Mode panel.

---

## Step 2: GitHub MCP Setup

### 2.1 Create GitHub Personal Access Token

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name like "Cursor MCP"
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:org` (Read org membership)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click **Generate token**
6. **Copy the token** (starts with `ghp_...`)

### 2.2 Configure GitHub MCP Server

> ⚠️ **Important**: Use **npx** method, not Docker. The Docker method requires Docker Desktop to be running.

Add to your Cursor MCP settings (`~/.cursor/mcp.json` on Mac/Linux, `%USERPROFILE%\.cursor\mcp.json` on Windows):

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

**Alternative: Docker Method** (only if Docker Desktop is running)
```json
{
  "mcpServers": {
    "GitHub": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### 2.3 Verify GitHub MCP Connection

After saving the config and restarting Cursor:

1. Open **Cursor Settings → MCP Tools**
2. Look for **GitHub** with a **green dot**
3. Should show tools enabled

**Test the connection:**
```
Use the GitHub MCP to list my repositories
```

### 2.4 Troubleshooting

| Issue | Solution |
|-------|----------|
| Red dot / "No server info" | Restart Cursor after saving config |
| Docker error on Windows | Use npx method instead (recommended) |
| Authentication failed | Regenerate PAT, ensure `repo` scope selected |
| "Command not found" | Ensure Node.js/npm is installed |

### 2.5 Available GitHub MCP Tools

| Tool | Description |
|------|-------------|
| `create_repository` | Create a new repository |
| `create_branch` | Create a feature branch |
| `push_files` | Push files to a branch |
| `create_pull_request` | Create a PR for review |
| `get_file_contents` | Read files from repo |
| `search_repositories` | Search for repos |
| `list_commits` | Get commit history |
| `fork_repository` | Fork a repo to your account |

---

## Step 3: Sitecore Integration Options

Sitecore XM Cloud provides **two methods** for programmatic content management:

### Option A: Sitecore Marketer MCP (Natural Language)

The Marketer MCP uses natural language prompts for interactive editing.

```bash
# Verify MCP connection in Cursor Settings → MCP Tools
# You should see "marketer" with tools enabled
```

**Available MCP Tools:**

| Tool | Description |
|------|-------------|
| `list_sites` | List all sites in XM Cloud |
| `get_site_information` | Get site details and templates |
| `get_all_pages_by_site` | List all pages |
| `create_page` | Create a new page |
| `update_page` | Update page content |
| `get_template` | Get template field definitions |
| `search_site` | Search for content |

### Option B: Sitecore Authoring API (REST/Programmatic)

For bulk operations, CI/CD pipelines, and template management, use the **Authoring API**.

📖 **See**: [SITECORE-AUTHORING-API.md](./SITECORE-AUTHORING-API.md) for complete documentation.

**Key Authoring API Capabilities:**

| Capability | MCP | Authoring API |
|------------|-----|---------------|
| Create pages | ✅ | ✅ |
| Update content | ✅ | ✅ |
| **Check template fields** | ❌ | ✅ |
| **Create/modify templates** | ❌ | ✅ |
| **Bulk import** | ⚠️ Sequential | ✅ Batch |
| **CI/CD integration** | ⚠️ | ✅ |

**When to Use Each:**

| Use Case | Recommended |
|----------|-------------|
| Interactive content edits | Marketer MCP |
| Creating single pages | Marketer MCP |
| Bulk product imports | Authoring API |
| Template field management | Authoring API |
| CI/CD pipelines | Authoring API |
| Design-to-deployment automation | Both |

### 3.1 Authoring API Quick Start

```bash
# 1. Authenticate (get OAuth token)
curl -X POST "https://auth.sitecorecloud.io/oauth/token" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "audience=https://api.sitecorecloud.io"

# 2. Check ProductPage template fields
curl -X GET "https://{cm-host}/sitecore/api/authoring/template/{template-id}/fields" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# 3. Create a product item
curl -X POST "https://{cm-host}/sitecore/api/authoring/item" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "QL-810W",
    "templateId": "f6e44a9e-074a-4865-987e-0c2dc00b7af5",
    "parentId": "281f37ed-e425-4126-837a-27518ef83ceb",
    "fields": { "Title": "QL-810W", "SKU": "QL-810W" }
  }'
```

### 3.2 Template Management with Authoring API

Before creating products, ensure your template has the required fields:

```bash
# Check current ProductPage template fields
GET /api/authoring/template/f6e44a9e-074a-4865-987e-0c2dc00b7af5/fields

# Add missing fields for printer products
PUT /api/authoring/template/f6e44a9e-074a-4865-987e-0c2dc00b7af5
{
  "fields": {
    "add": [
      { "name": "PrintWidth", "type": "Single-Line Text", "section": "Specifications" },
      { "name": "PrintResolution", "type": "Single-Line Text", "section": "Specifications" },
      { "name": "Connectivity", "type": "Multi-Line Text", "section": "Specifications" },
      { "name": "PrintSpeed", "type": "Single-Line Text", "section": "Specifications" },
      { "name": "Features", "type": "Multi-Line Text", "section": "Specifications" }
    ]
  }
}
```

**Reference Links:**
- [Sitecore Authoring API Walkthrough](https://doc.sitecore.com/sai/en/developers/sitecoreai/walkthrough--enabling-and-authorizing-requests-to-the-authoring-and-management-api.html)
- [Comprehensive Guide to Sitecore Authoring API](https://medium.com/@praveensharma6019/comprehensive-guide-to-sitecore-authoring-api-for-item-management-sitecoreai-sitecore-xmc-166616f2a358)

### 3.3 Brother Site Configuration

The Brother site is configured with these key IDs:

| Resource | ID |
|----------|-----|
| Site ID | `e9437212-845d-4ec5-9b58-c08bfad0714e` |
| Home Root | `c64fba9d-e285-46ef-b788-d13872c06498` |
| Products Page | `a8aa99c2-73f0-467e-8f43-bd2e9bbfb8fa` |
| ProductPage Template | `f6e44a9e-074a-4865-987e-0c2dc00b7af5` |

---

## Step 4: End-to-End Workflow

### Workflow Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          DESIGN PHASE                                     │
├──────────────────────────────────────────────────────────────────────────┤
│  1. Designer creates product page design in Figma                        │
│  2. Designer selects the frame/component to export                       │
└──────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                       CODE GENERATION PHASE                               │
├──────────────────────────────────────────────────────────────────────────┤
│  3. AI Agent extracts design via Figma MCP                               │
│  4. AI generates React components matching design system                  │
│  5. AI creates/updates TypeScript types                                   │
└──────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         REVIEW PHASE                                      │
├──────────────────────────────────────────────────────────────────────────┤
│  6. AI creates GitHub branch with changes                                 │
│  7. AI opens Pull Request with "🤖 Created by AI - Please Review" label  │
│  8. Developer reviews, suggests changes, approves                         │
│  9. PR is merged to main branch                                           │
└──────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                       DEPLOYMENT PHASE                                    │
├──────────────────────────────────────────────────────────────────────────┤
│  10. AI creates product pages in Sitecore via MCP                        │
│  11. AI populates content from CSV/design data                           │
│  12. Content editor reviews in Experience Editor                          │
│  13. Content is published                                                 │
└──────────────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Execution

#### Phase 1: Extract Design from Figma

```
Prompt: "Using the Figma MCP, get the currently selected product page design 
         and analyze its structure, components, and styling."
```

The AI will:
1. Call `get_selection` to retrieve the layer structure
2. Identify components: hero, product gallery, specifications, etc.
3. Extract colors, typography, spacing from design tokens

#### Phase 2: Generate Code

```
Prompt: "Based on the Figma design, update the ProductDetails component 
         to match the layout. Use our existing component library and 
         design tokens from the codebase."
```

The AI will:
1. Map Figma layers to existing React components
2. Generate/update component code
3. Ensure TypeScript types match the design
4. Follow existing code conventions

#### Phase 3: Push to GitHub for Review

```
Prompt: "Create a new branch 'feature/product-page-redesign' and open 
         a pull request with the changes. Add 'AI-Generated' label."
```

The AI will:
1. Call `create_branch` to create feature branch
2. Call `push_files` to commit the changes
3. Call `create_pull_request` with descriptive title/body
4. Tag with "🤖 AI Generated - Please Review"

#### Phase 4: Deploy Content to Sitecore

```
Prompt: "Using the Sitecore MCP and the CSV data, create product pages 
         for all desktop label printers under the Labelling category."
```

The AI will:
1. Call `list_sites` to get Brother site info
2. Call `get_site_information` for template details
3. Parse CSV product data
4. Call `create_page` for each product with populated fields

---

## Human-in-the-Loop Review Process

### Why Human Review Matters

> "Created by AI, please review" - The workflow emphasizes human oversight 
> before any content goes live.

### Review Checkpoints

| Checkpoint | Reviewer | What to Check |
|------------|----------|---------------|
| GitHub PR | Developer | Code quality, component reuse, TypeScript |
| Sitecore Preview | Content Editor | Content accuracy, SEO, imagery |
| Staging | QA | Responsive design, accessibility |
| Production | Approver | Final sign-off |

### PR Template for AI-Generated Code

```markdown
## 🤖 AI-Generated Pull Request

### Summary
This PR was generated by AI based on a Figma design.

### Changes
- [ ] New/updated components
- [ ] TypeScript type changes
- [ ] Style updates

### Design Reference
[Link to Figma file]

### Review Checklist
- [ ] Code follows project conventions
- [ ] Components are properly typed
- [ ] Styles use design tokens
- [ ] Accessible (ARIA, keyboard nav)
- [ ] Responsive design works
- [ ] No hardcoded strings (i18n ready)

### ⚠️ AI Disclaimer
This code was generated by AI and requires human review before merging.
```

---

## Use Cases

### Use Case 1: Product Page from Design

**Scenario**: Marketing creates a new product page design in Figma

**Workflow**:
1. Designer creates product page in Figma
2. AI extracts design → generates React components
3. Developer reviews PR → merges
4. AI creates product in Sitecore with content

### Use Case 2: Bulk Product Upload

**Scenario**: Import 16 desktop label printers from CSV

**Workflow**:
1. Product data prepared in CSV format
2. AI parses CSV and maps to Sitecore fields
3. AI creates pages via Sitecore MCP
4. Content editor reviews in Experience Editor

### Use Case 3: Design System Update

**Scenario**: Update component styling based on new brand guidelines

**Workflow**:
1. Designer updates Figma component library
2. AI extracts style changes via Figma MCP
3. AI updates Tailwind/CSS tokens
4. AI opens PR with visual diff

---

## Example Prompts

### Figma to Code

```
"Use the Figma MCP to get the selected product card design. 
Generate a React component that matches this design using our 
existing ProductCard component as a base. Use Tailwind classes 
that match our design system."
```

### Code to GitHub

```
"Create a new branch called 'feature/ai-product-cards', commit 
the ProductCard component changes, and open a pull request 
titled '🤖 AI: Updated ProductCard from Figma design'. 
Add a description explaining the changes."
```

### GitHub to Sitecore

```
"Using the Sitecore MCP, create product pages for all items in 
the brother-desktop-label-printers.csv file. Create them under 
/Products/Labelling-and-Receipts/Desktop-Label-Printers. 
Map the CSV columns to these fields:
- Name → Title
- SKU → SKU  
- Description → ShortDescription
- Price (Ex VAT) → Price
- Features → Features
- Print Width → PrintWidth
- Print Resolution → PrintResolution
- Connectivity → Connectivity
- Print Speed → PrintSpeed"
```

---

## Troubleshooting

### Figma MCP Issues

| Issue | Solution |
|-------|----------|
| Red dot in Cursor | Restart Figma Desktop app, toggle MCP off/on |
| "No selection" error | Select a layer in Figma before prompting |
| Connection refused | Ensure Figma Desktop (not web) is running |

### GitHub MCP Issues

| Issue | Solution |
|-------|----------|
| Authentication failed | Regenerate PAT with correct scopes |
| Permission denied | Ensure PAT has `repo` scope |
| Branch exists | Delete old branch or use different name |

### Sitecore MCP Issues

| Issue | Solution |
|-------|----------|
| Site not found | Verify site name matches exactly |
| Template error | Check template ID and field names |
| Create failed | Ensure parent page allows child template |

---

## Next Steps & Future Extensions

### Current Hackathon Scope
- [x] Figma MCP integration for design extraction
- [x] GitHub MCP for code review workflow
- [x] Sitecore MCP for content deployment
- [x] Human-in-the-loop review process

### Future Extensions (Post-Hackathon)
- [ ] Automated visual regression testing
- [ ] Bi-directional sync (Sitecore → Figma)
- [ ] Webhook-triggered deployments
- [ ] A/B test variant generation
- [ ] Multi-language content generation

---

## Step 5: Cursor Cloud Agents (Automated Workflows)

### What are Cloud Agents?

[Cursor Cloud Agents](https://cursor.com/docs/cloud-agent) (formerly Background Agents) are autonomous AI agents that run in isolated cloud environments. They can:
- Monitor files for changes
- Clone repos from GitHub
- Make code changes and push to branches
- Create pull requests for review

This enables **fully automated design-to-deployment pipelines**.

### 5.1 How Cloud Agents Fit Our Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AUTOMATED WORKFLOW WITH CLOUD AGENTS                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  📁 docs/product/ folder (monitored)                                    │
│  ├── brother-desktop-label-printers.csv    ← Product data               │
│  ├── VC-500WCR-Page-Screenshot.png         ← Design screenshot          │
│  ├── VC-500WCR-Page-Screenshot.pdf         ← Design PDF                 │
│  ├── VC-500WCR-Product-Page.html           ← Product spec               │
│  └── VC-500WCR-Product-Page.pdf            ← Product spec PDF           │
│                                                                         │
│         │                                                               │
│         ▼ Cloud Agent detects changes                                   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ CLOUD AGENT ACTIONS:                                             │   │
│  │ 1. Detects new/updated CSV → Creates Sitecore products          │   │
│  │ 2. Detects new design screenshot → Updates component code        │   │
│  │ 3. Creates GitHub PR with changes                                │   │
│  │ 4. Triggers Sitecore MCP to deploy content                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Setting Up Cloud Agents

#### Prerequisites

1. **GitHub Connection**: Cloud agents need read-write access to your repo
2. **Cursor Account**: Cloud agents require a Cursor subscription
3. **Environment Setup**: Configure your development environment

#### Step 1: Connect GitHub to Cursor Cloud Agents

1. Go to [cursor.com/agents](https://cursor.com/agents) or select **Cloud** in Cursor's agent dropdown
2. Connect your GitHub account with read-write repo access
3. Select the repository: `spd-Sitecore.Demo.XMCloud.IndustryVerticals`

#### Step 2: Configure Environment

Run in Cursor: `Cmd/Ctrl + Shift + P` → `Cursor: Start Cloud Agent Setup`

Or use the deeplink: `cursor://anysphere.cursor-deeplink/background-agent/setup`

Create `.cursor/environment.json`:

```json
{
  "snapshot": "POPULATED_FROM_SETTINGS",
  "install": "cd industry-verticals/brother && npm install",
  "terminals": [
    {
      "name": "Dev Server",
      "command": "cd industry-verticals/brother && npm run dev"
    }
  ]
}
```

#### Step 3: Configure Secrets

Add your secrets in **Cursor Settings → Cloud Agents → Secrets**:

| Secret Name | Description |
|-------------|-------------|
| `GITHUB_PERSONAL_ACCESS_TOKEN` | GitHub PAT for MCP |
| `SITECORE_API_KEY` | Sitecore XM Cloud API key |
| `SITECORE_ENDPOINT` | Sitecore GraphQL endpoint |

### 5.3 Product Folder Structure

All product-related files are stored in `docs/product/`:

```
docs/product/
├── brother-desktop-label-printers.csv     # Product data (16 printers)
├── VC-500WCR-Page-Screenshot.png          # Design screenshot from Figma
├── VC-500WCR-Page-Screenshot.pdf          # Design PDF export
├── VC-500WCR-Product-Page.html            # Product specification HTML
├── VC-500WCR-Product-Page.pdf             # Product specification PDF
└── produtpagetemplate.html                # Page template reference
```

**When designs change:**
1. Export the new design as PNG/PDF from Figma
2. Save to `docs/product/` with descriptive name
3. Cloud Agent detects the change and updates components

### 5.4 Sample Prompts for Cloud Agents

#### Prompt 1: Monitor CSV and Create Sitecore Products

```
You are a Cloud Agent monitoring the docs/product/ folder.

When docs/product/brother-desktop-label-printers.csv is updated:

1. Parse the CSV file and compare with existing Sitecore products
2. For any NEW products (by SKU):
   - Use Sitecore MCP to create ProductPage items
   - Parent: /Products/Labelling-and-Receipts/Desktop-Label-Printers
   - Template: f6e44a9e-074a-4865-987e-0c2dc00b7af5
   - Map fields: Name→Title, SKU→SKU, Description→ShortDescription, etc.

3. For UPDATED products:
   - Use Sitecore MCP to update existing items
   
4. Create a GitHub PR with a summary of changes:
   - Title: "🤖 Auto-sync: Product catalog updated from CSV"
   - List products added/updated
   - Tag with "ai-generated", "sitecore-sync"
```

#### Prompt 2: Design Change Detection

```
You are a Cloud Agent monitoring docs/product/ for design changes.

When a new screenshot (*.png, *.pdf) is added to docs/product/:

1. Analyze the design using the image
2. Compare with current ProductDetails.tsx component
3. If layout differs significantly:
   - Update the React components to match
   - Ensure Tailwind classes align with design tokens
   
4. Create a GitHub PR:
   - Title: "🤖 Design sync: Updated product page from [filename]"
   - Include before/after description
   - Request human review

Files to monitor:
- docs/product/VC-500WCR-Page-Screenshot.png
- docs/product/*.png (any new design screenshots)
```

#### Prompt 3: Full Automation Pipeline

```
You are a Cloud Agent running the full design-to-deployment pipeline.

TRIGGER: When any file in docs/product/ changes

WORKFLOW:

1. IF CSV changed (brother-desktop-label-printers.csv):
   - Parse product data
   - Create/update Sitecore products via MCP
   - Generate summary report

2. IF Design screenshot changed (*.png):
   - Analyze new design
   - Update ProductDetails component if needed
   - Update ProductTabs, ProductSpecifications as required

3. IF Product spec changed (*.html, *.pdf):
   - Extract product details
   - Update Sitecore item fields
   - Sync features and specifications

4. ALWAYS:
   - Create feature branch: feature/auto-sync-[timestamp]
   - Commit all changes
   - Open PR with comprehensive description
   - Tag: "ai-generated", "auto-sync", "needs-review"

5. NOTIFY:
   - Comment on PR with sync summary
   - List all Sitecore items created/updated
```

#### Prompt 4: Template Validation with Authoring API

```
You are a Cloud Agent ensuring Sitecore templates stay in sync with TypeScript types.

TRIGGER: When src/types/products.ts changes OR when CSV contains new columns

WORKFLOW:

1. READ TypeScript Product interface:
   - Parse industry-verticals/brother/src/types/products.ts
   - List all Field<T> properties
   
2. CHECK Sitecore template via Authoring API:
   - Authenticate: POST https://auth.sitecorecloud.io/oauth/token
   - Get template fields: GET /api/authoring/template/{ProductPage-ID}/fields
   - Template ID: f6e44a9e-074a-4865-987e-0c2dc00b7af5

3. COMPARE and identify gaps:
   - Fields in TypeScript but not in Sitecore → ADD to template
   - Fields in Sitecore but not in TypeScript → ADD to interface

4. IF template update needed:
   - PUT /api/authoring/template/{id} with new fields
   - Verify update with GET /api/authoring/template/{id}/fields

5. IF TypeScript update needed:
   - Update src/types/products.ts
   - Update component props where fields are used

6. CREATE PR:
   - Title: "🤖 Sync: Template fields ↔ TypeScript types"
   - List added fields in both systems
   - Tag: "ai-generated", "schema-sync"
```

#### Prompt 5: Bulk Product Import with Authoring API

```
You are a Cloud Agent performing bulk product imports using the Sitecore Authoring API.

TRIGGER: When docs/product/brother-desktop-label-printers.csv is significantly updated (>5 rows changed)

WORKFLOW:

1. AUTHENTICATE with Sitecore:
   - Use OAuth client credentials flow
   - Store access token for subsequent requests
   
2. VERIFY TEMPLATE has all required fields:
   - GET /api/authoring/template/f6e44a9e-074a-4865-987e-0c2dc00b7af5/fields
   - Compare against CSV columns
   - If missing fields, add them via PUT request

3. PARSE CSV and create items:
   - Read docs/product/brother-desktop-label-printers.csv
   - For each row:
     POST /api/authoring/item {
       "itemName": slugify(row.Name),
       "templateId": "f6e44a9e-074a-4865-987e-0c2dc00b7af5",
       "parentId": "281f37ed-e425-4126-837a-27518ef83ceb",
       "fields": {
         "Title": row.Name,
         "SKU": row.SKU,
         "ShortDescription": row.Description,
         "Price": parseFloat(row["Price (Ex VAT)"]),
         "PrintWidth": row["Print Width"],
         "PrintResolution": row["Print Resolution"],
         "Connectivity": row.Connectivity,
         "PrintSpeed": row["Print Speed"],
         "Features": row.Features
       }
     }
   - Add 600ms delay between requests (rate limiting)

4. HANDLE ERRORS:
   - 409 Conflict (item exists) → Use PUT to update instead
   - 400 Bad Request → Log field mapping errors
   - 401/403 → Re-authenticate and retry

5. GENERATE REPORT:
   - List all created items with IDs
   - List any failed items with errors
   - Create summary markdown file

6. CREATE PR:
   - Title: "🤖 Bulk Import: {count} products from CSV"
   - Include import report
   - Tag: "ai-generated", "bulk-import", "sitecore"
```

### 5.5 Cloud Agent Configuration File

Create `.cursor/cloud-agent-config.json` (optional, for documentation):

```json
{
  "name": "Brother Product Sync Agent",
  "description": "Monitors docs/product/ for CSV and design changes",
  "triggers": [
    {
      "type": "file_change",
      "path": "docs/product/brother-desktop-label-printers.csv",
      "action": "sync_products_to_sitecore"
    },
    {
      "type": "file_change", 
      "path": "docs/product/*.png",
      "action": "update_design_components"
    }
  ],
  "github": {
    "auto_pr": true,
    "branch_prefix": "feature/auto-sync",
    "labels": ["ai-generated", "auto-sync"]
  },
  "sitecore": {
    "site": "brother",
    "product_template": "f6e44a9e-074a-4865-987e-0c2dc00b7af5",
    "product_parent": "/Products/Labelling-and-Receipts/Desktop-Label-Printers"
  }
}
```

### 5.6 Testing Cloud Agent Changes

#### Option A: Test in Cloud VM

1. In cloud agent sidebar, click dropdown → **"Open VM"**
2. SSH into the instance
3. Set up port forwarding to test web services
4. Verify changes before merging

#### Option B: Test Locally

```bash
# Checkout the agent's branch
git fetch origin
git checkout feature/auto-sync-[timestamp]

# Install dependencies
cd industry-verticals/brother
npm install

# Run dev server
npm run dev
```

### 5.7 Code Quality: Linting Before Commit

> ⚠️ **Important**: All auto-generated code MUST pass linting before committing.

#### ESLint & Prettier Rules

The Brother project enforces:
- **ESLint**: TypeScript rules, unused imports/variables
- **Prettier**: Code formatting, line endings
- **Tailwind CSS**: Class ordering (e.g., `text-left sm:px-8` not `sm:px-8 text-left`)

#### Running Lints Locally

```bash
cd industry-verticals/brother

# Check for lint errors
npm run lint

# Auto-fix where possible
npm run lint:fix
```

#### Cloud Agent Prompt: Include Linting

When creating Cloud Agent prompts, always include a linting step:

```
BEFORE COMMITTING:
1. Run `npm run lint` in industry-verticals/brother
2. Fix any ESLint errors (unused imports, variables)
3. Fix any Prettier errors (formatting, line endings)
4. Fix any Tailwind class order issues
5. Only commit after all lints pass
```

#### Common Lint Errors to Avoid

| Error Type | Example | Fix |
|------------|---------|-----|
| Unused import | `'ContentSdkText' is defined but never used` | Remove unused import |
| Unused variable | `'product' is defined but never used` | Remove from props or use it |
| Prettier formatting | `Delete ␍⏎` | Run `npm run lint:fix` |
| Tailwind order | `sm:px-8 text-left` | Change to `text-left sm:px-8` |
| Trailing newlines | Extra blank lines at EOF | Remove extra lines |

### 5.8 Auto-Fix CI Failures

Cloud Agents can automatically fix CI failures:

- **Enable**: Default behavior for PRs created by Cloud Agents
- **Disable globally**: Cursor Dashboard → Cloud Agents → My Settings
- **Disable per PR**: Comment `@cursor autofix off` on the PR
- **Re-enable**: Comment `@cursor autofix on`

---

## References

- [Builder.io: Design to Code with Figma MCP Server](https://www.builder.io/blog/figma-mcp-server)
- [Cursor Cloud Agents Documentation](https://cursor.com/docs/cloud-agent)
- [Model Context Protocol (MCP) Specification](https://modelcontextprotocol.io/)
- [Sitecore XM Cloud Documentation](https://doc.sitecore.com/xmc)
- [GitHub MCP Server](https://github.com/modelcontextprotocol/servers)
- [Sitecore Authoring API Walkthrough](https://doc.sitecore.com/sai/en/developers/sitecoreai/walkthrough--enabling-and-authorizing-requests-to-the-authoring-and-management-api.html)
- [Comprehensive Guide to Sitecore Authoring API](https://medium.com/@praveensharma6019/comprehensive-guide-to-sitecore-authoring-api-for-item-management-sitecoreai-sitecore-xmc-166616f2a358)

---

## Team Responsibilities

| Team Member | Responsibility |
|-------------|----------------|
| Sumith | Figma-to-GitHub technical integration |
| Hossam | Presentation structure and demos |
| Morten | Architecture and Sitecore integration |

---

## File Locations

| Resource | Path |
|----------|------|
| Product CSV | `docs/product/brother-desktop-label-printers.csv` |
| Design Screenshot | `docs/product/VC-500WCR-Page-Screenshot.png` |
| Product Spec HTML | `docs/product/VC-500WCR-Product-Page.html` |
| Product Spec PDF | `docs/product/VC-500WCR-Product-Page.pdf` |
| Component Code | `industry-verticals/brother/src/components/` |

---

*Document created for Sitecore Hackathon 2026*
*Last updated: January 30, 2026*

