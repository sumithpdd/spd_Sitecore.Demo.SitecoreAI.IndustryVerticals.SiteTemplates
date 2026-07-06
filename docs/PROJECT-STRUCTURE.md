# Project Structure Overview

This document provides an overview of the Sitecore XM Cloud Industry Verticals project structure.

---

## Repository Layout

```
spd-Sitecore.Demo.XMCloud.IndustryVerticals/
├── authoring/                    # Sitecore authoring/CM layer
│   ├── items/                    # Serialized Sitecore items
│   │   ├── industry-verticals/
│   │   │   ├── common/           # Shared items across sites
│   │   │   └── sites/            # Site-specific items
│   │   │       ├── essential-living/
│   │   │       ├── forma-lux/
│   │   │       └── nova-medical/
│   │   └── nextjs-starter/
│   ├── platform/                 # Platform project (.csproj)
│   └── spe-scripts/              # Sitecore PowerShell scripts
│
├── docs/                         # Project documentation
│   ├── COMPONENTS.md             # Component reference
│   ├── BROTHER-SITE-CLONING-GUIDE.md
│   └── PROJECT-STRUCTURE.md
│
├── industry-verticals/           # Next.js rendering hosts
│   ├── healthcare/               # Nova Medical site
│   ├── luxury-retail/            # Essential Living site
│   ├── bristan/                  # Bristan (bristan.com) site
│   ├── retail/                   # Forma Lux site
│   └── starter/                  # Starter template
│
├── local-containers/             # Docker development environment
│   ├── docker/
│   │   ├── build/                # Docker build files
│   │   ├── data/                 # Persistent data (CM, Solr, SQL)
│   │   ├── deploy/
│   │   └── traefik/              # Reverse proxy config
│   ├── scripts/                  # PowerShell scripts
│   │   ├── init.ps1              # Initialize environment
│   │   ├── up.ps1                # Start containers
│   │   └── down.ps1              # Stop containers
│   ├── docker-compose.yml
│   └── docker-compose.override.yml
│
├── xmcloud.build.json            # XM Cloud build configuration
├── sitecore.json                 # Sitecore CLI configuration
└── README.md
```

---

## Industry Verticals

### Site to Rendering Host Mapping

| Site | Vertical | Rendering Host | Directory |
|------|----------|----------------|-----------|
| **Nova Medical** | Healthcare | `healthcare` | `industry-verticals/healthcare/` |
| **Essential Living** | Luxury Retail | `luxury-retail` | `industry-verticals/luxury-retail/` |
| **Bristan** | Taps & showers (bristan.com) | `bristan` | `industry-verticals/bristan/` |
| **Heritage** | Bristan sub-brand | `bristan` (shared host) | same app as Bristan |
| **Forma Lux** | Retail | `nextjsstarter` | `industry-verticals/retail/` |

---

## Rendering Host Structure

Each rendering host follows this structure:

```
industry-verticals/{site}/
├── public/                       # Static assets
├── src/
│   ├── assets/                   # CSS and styling
│   │   ├── base/                 # Base styles
│   │   ├── components/           # Component-specific styles
│   │   └── main.css              # Main stylesheet
│   ├── byoc/                     # Bring Your Own Components
│   ├── components/               # React components
│   │   ├── {component-name}/
│   │   │   └── ComponentName.tsx
│   │   ├── content-sdk/          # Sitecore Content SDK components
│   │   └── non-sitecore/         # Non-Sitecore helper components
│   ├── constants/                # Constants and config
│   ├── helpers/                  # Utility functions
│   ├── hooks/                    # React hooks
│   ├── lib/                      # Library utilities
│   ├── pages/                    # Next.js pages
│   ├── shadcn/                   # Shadcn UI components
│   ├── stories/                  # Storybook stories
│   ├── types/                    # TypeScript types
│   ├── Bootstrap.tsx
│   ├── Layout.tsx
│   ├── NotFound.tsx
│   └── middleware.ts
├── components.json               # Shadcn configuration
├── next.config.js
├── package.json
├── sitecore.config.ts            # Sitecore configuration
├── tailwind.config.js
└── tsconfig.json
```

---

## Sitecore Item Serialization

### Module Structure

```
authoring/items/industry-verticals/
├── common/
│   ├── common.module.json        # Module definition
│   └── items/
│       ├── module/               # Shared module items
│       ├── sites-essential-living/
│       ├── sites-forma-lux/
│       └── sites-nova-medical/
└── sites/
    ├── essential-living/
    │   └── essential-living.module.json
    ├── forma-lux/
    │   └── forma-lux.module.json
    └── nova-medical/
        └── nova-medical.module.json
```

**Standalone modules** (separate from `Project.IndustryVerticals`):

| Module | Path | Site |
|--------|------|------|
| `bristan` | `authoring/items/bristan/` | `/sitecore/content/bristan/bristan` |
| `sitecoresilver` | `authoring/items/sitecoresilver/` | `/sitecore/content/sitecoresilver/sitecoresilver` |
| `lyveragroup` | `authoring/items/lyveragroup/` | `/sitecore/content/lyveragroup/*` |

See [BRISTAN.md](./BRISTAN.md), [SITECORESILVER.md](./SITECORESILVER.md), [LYVERA.md](./LYVERA.md).

### Deployment Strategy

| Type | Description | Deployment |
|------|-------------|------------|
| **IAR** | Item-As-Resources | Deployed with build |
| **SCS** | Sitecore Content Serialization | Post-action deployment |

**IAR Items:**
- Project Settings
- Templates
- Branch Templates
- Layouts/Renderings
- Placeholder Settings

**SCS Items:**
- Site Content
- Home/Data/Dictionary
- Media Assets

---

## Configuration Files

### xmcloud.build.json

Defines rendering hosts and deployment configuration:

```json
{
  "renderingHosts": {
    "nextjsstarter": {
      "path": "./industry-verticals/retail",
      "nodeVersion": "22.11.0",
      "type": "sxa",
      "enabled": true
    }
    // ... other hosts
  },
  "postActions": {
    "actions": {
      "scsModules": {
        "modules": ["Project.Retail-Content", ...]
      }
    }
  }
}
```

### sitecore.json

Sitecore CLI configuration for serialization.

### Multi-site static builds

`.sitecore/sites.json` (generated at build time) lists **all** XM Cloud sites in the tenant for `MultisiteMiddleware`. Each rendering host should only **pre-render** sites it owns:

| Host | Typical SSG sites | Filter location |
| ---- | ----------------- | --------------- |
| `bristan` | `bristan`, `heritage` | `industry-verticals/bristan/src/lib/rendering-host-sites.ts` |
| `lyvera` | `lyvera`, `keithprowse`, `gulliverstravel`, … | `lyvera` host (all lyveragroup sites) |
| `nextjsstarter` | `forma-lux` | retail host default site |

See [BRISTAN.md — Rendering host scope](./BRISTAN.md#rendering-host-scope-and-static-build) for the bristan case study (build errors on `_site_lyvera` paths).

---

## Local Development

### Docker Containers

The `local-containers/` directory provides a full local development environment:

- **CM (Content Management)** - Sitecore authoring instance
- **SQL** - Database
- **Solr** - Search
- **Traefik** - Reverse proxy with SSL

### Scripts

| Script | Purpose |
|--------|---------|
| `init.ps1` | Initialize environment, generate certificates |
| `up.ps1` | Start Docker containers |
| `down.ps1` | Stop Docker containers |

### Quick Start

```powershell
# Initialize (first time)
cd local-containers/scripts
.\init.ps1

# Start containers
.\up.ps1

# Start rendering host
cd ../../industry-verticals/retail
npm install
npm run dev
```

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | Latest | React framework |
| **Node.js** | 22.11.0 | JavaScript runtime |
| **Tailwind CSS** | Latest | Utility-first CSS |
| **Shadcn UI** | Latest | UI component library |
| **TypeScript** | Latest | Type safety |
| **Sitecore XM Cloud** | Latest | Headless CMS |
| **Content SDK** | Latest | Sitecore integration |

---

## Key Concepts

### SXA (Sitecore Experience Accelerator)

All rendering hosts use SXA type, providing:
- Pre-built components
- Flexible page layouts
- Partial designs
- Theme management

### Content SDK

The Sitecore Content SDK provides:
- GraphQL-based data fetching
- Layout service integration
- Editing support
- Personalization

### Headless Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   XM Cloud      │────▶│   Edge API      │────▶│   Next.js       │
│   (Authoring)   │     │   (Delivery)    │     │   (Rendering)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

