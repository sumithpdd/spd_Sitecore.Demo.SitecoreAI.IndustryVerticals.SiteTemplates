# Brother UK - Demo Site (Next.js)

## Overview

Brother UK is a demo website showcasing Sitecore XM Cloud capabilities for a **business technology and consumer products** company. This site was cloned from the Forma Lux (Retail) vertical using [Sitecore AI Clone a Site](https://doc.sitecore.com/sai/en/developers/sitecoreai/clone-a-site.html).

**Target Industry:** Printers, Scanners, Labelling, Business Solutions

**Live Reference:** https://www.brother.co.uk/

---

## Developer Expectations

- Tailwind-based styling (Shadcn UI)
- Modular components for reuse (54 components)
- Sitecore Content SDK integration
- Product catalog focus (printers, scanners, supplies)
- Localization support for English (en)

---

## Quick Start

### Prerequisites

1. Node.js 22.11.0+
2. XM Cloud environment deployed ([Deploy Guide](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html))
3. Environment variables configured

### Run Locally

```powershell
# Navigate to Brother site
cd industry-verticals\brother

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: http://localhost:3000

---

## Environment Configuration

Create `.env.local` from `.env.remote.example`:

```env
NEXT_PUBLIC_DEFAULT_SITE_NAME=brother
SITECORE_EDGE_CONTEXT_ID=<your-context-id>
NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID=<your-context-id>
SITECORE_EDITING_SECRET=<your-secret>
```

**Get Environment Variables:** [XM Cloud Environment Variables Guide](https://doc.sitecore.com/xmc/en/developers/xm-cloud/get-the-environment-variables-for-a-site.html)

---

## Project Structure

```
industry-verticals/brother/
├── public/                    # Static assets
├── src/
│   ├── assets/               # CSS and styling
│   │   ├── base/             # Base styles, variables
│   │   ├── components/       # Component-specific CSS
│   │   └── icons/            # Icon components
│   ├── components/           # Sitecore components (54 total)
│   │   ├── header/
│   │   ├── footer/
│   │   ├── hero-banner/
│   │   ├── product-listing/
│   │   ├── product-details/
│   │   └── ...
│   ├── pages/                # Next.js pages
│   ├── lib/                  # Utilities and services
│   ├── hooks/                # React hooks
│   ├── types/                # TypeScript types
│   └── stories/              # Storybook stories
├── .env.local                # Environment variables
├── package.json
├── sitecore.config.ts        # Sitecore configuration
└── next.config.js
```

---

## Available Components

### 🆕 Brother UK Variants (Added to Existing Components)

Existing components have been extended with Brother-specific variants:

| Component | Variants | Description |
|-----------|----------|-------------|
| `Header` | **Default**, **Brother**, **Compact** | Brother variant has mega menu, search bar, EcoPro banner |
| `Footer` | **Default**, **Brother**, **Minimal** | Brother variant has dark theme, social links, 5-column layout |
| `HeroBanner` | **Default**, TopContent, **Brother**, **Compact**, **Split** | Brother variant has "More time for life" style with overlay |

### 🆕 New Brother Components

| Component | Description | Variants |
|-----------|-------------|----------|
| `CategoryListing` | Product category grid (printers, scanners, etc.) | Default, WithFilters, Featured |
| `SearchBar` | Search with recent/trending suggestions | Default, Inline, Hero |
| `SearchResults` | Search results with filters, grid/list view | Default |

### Layout & Structure
| Component | Description |
|-----------|-------------|
| `Container` | Content wrapper with styling options |
| `ColumnSplitter` | Multi-column layout |
| `RowSplitter` | Row-based layout |
| `SectionWrapper` | Section with background options |
| `PageContent` | Main content area |

### Navigation
| Component | Variants | Description |
|-----------|----------|-------------|
| `Header` | Default, **Brother**, Compact | Site header - use **Brother** variant for Brother UK |
| `Footer` | Default, **Brother**, Minimal | Site footer - use **Brother** variant for dark theme |
| `Navigation` | Default | Main menu |
| `NavigationIcons` | Default | Icon-based navigation |
| `Breadcrumb` | Default | Page breadcrumb trail |
| `LanguageSwitcher` | Default | Language selection |

### Content
| Component | Variants | Description |
|-----------|----------|-------------|
| `HeroBanner` | Default, TopContent, **Brother**, **Compact**, **Split** | Hero section - use **Brother** for dark overlay style |
| `ContentBlock` | Default | Rich content block |
| `RichText` | Default | Rich text display |
| `Title` | Default | Heading component |
| `Image` | Default | Image display |
| `Promo` | Default | Promotional content |
| `Features` | Default | Feature highlights |

### Products (Ideal for Brother Catalog)
| Component | Description |
|-----------|-------------|
| `ProductListing` | Product grid/list |
| `ProductDetails` | Product detail page |
| `SelectedProducts` | Curated product selection |
| `AllProductsCarousel` | Product carousel |
| `CategoryListing` | **NEW** Category cards with filters |

### Search
| Component | Description |
|-----------|-------------|
| `SearchBar` | Search input with suggestions |
| `SearchResults` | Results page with filtering & pagination |

### Articles & Content
| Component | Description |
|-----------|-------------|
| `ArticleListing` | Article grid/list |
| `ArticleDetails` | Article detail page |
| `ArticleCarousel` | Article carousel |

### Engagement
| Component | Description |
|-----------|-------------|
| `ContactForm` | Contact/inquiry form |
| `Subscribe` | Newsletter subscription |
| `Reviews` | Customer reviews |
| `SocialFeed` | Social media feed |
| `SocialFollow` | Social media links |
| `Offers` | Special offers display |

---

## Editing Host Configuration

The Brother site is configured in `xmcloud.build.json`:

```json
"brother": {
  "path": "./industry-verticals/brother",
  "nodeVersion": "22.11.0",
  "enabled": true,
  "type": "sxa",
  "buildCommand": "build",
  "runCommand": "next:start"
}
```

### Adding Editing Host to XM Cloud

If split deployment is enabled:

1. Go to [Sitecore Cloud Portal](https://portal.sitecorecloud.io)
2. Open XM Cloud Deploy → Select Project
3. Go to **Editing Hosts** tab
4. Click **Add editing host**
5. Set name: `brother`
6. Configure repository and branch settings
7. Enable **Auto deploy** (recommended)
8. Click **Save**
9. Click **...** → **Build and deploy**

---

## Sitecore Content Structure

The Brother site content is located at:

```
/sitecore/content/industry-verticals/brother/
├── Home
├── Media
├── Data
├── Dictionary
├── Presentation
└── Settings
    └── App Name: "brother"
```

**Item ID:** `{49598DFE-6F68-4B55-A50D-7EC1303F507D}`

---

## Serialization Structure

### Serialization & Deployment Strategy

| Category | Description |
|----------|-------------|
| **IAR** (Item-As-Resources) | Items packaged with rendering host build |
| **SCS** (Sitecore Content Serialization) | Items pushed via post-actions |

### Serialized Item Summary

| Category | Path | Deployment |
|----------|------|------------|
| Project Settings | `/sitecore/system/Settings/Project/industry-verticals` | IAR |
| Templates | `/sitecore/templates/Project/industry-verticals` | IAR |
| Layouts/Renderings | `/sitecore/layout/.../Project/industry-verticals` | IAR |
| Site Root | `/sitecore/content/industry-verticals/brother` | SCS |
| Home, Data, Dictionary | `/sitecore/content/industry-verticals/brother/...` | SCS |
| Media Library | `/sitecore/media library/Project/industry-verticals/brother` | SCS |

### CLI Commands

```bash
# Connect to XM Cloud environment
dotnet sitecore cloud environment connect --environment-id <envId> --allow-write true

# Pull items from Sitecore
dotnet sitecore ser pull

# Push items to Sitecore
dotnet sitecore ser push
```

---

## Customization Roadmap

### Branding
- [ ] Update color scheme to Brother blue (#0066B3)
- [ ] Add Brother logo and favicon
- [ ] Configure typography (Helvetica Neue / Arial)

### Components to Create
- [ ] `EcoProBanner` - Subscription service promotion
- [ ] `ProductComparison` - Compare printers/scanners
- [ ] `SuppliesFinder` - Find compatible ink/toner
- [ ] `IndustrySolutions` - Industry-specific solution cards
- [ ] `SupportWidget` - Quick access to drivers/downloads

### Content Structure
- [ ] Products (Printers, Scanners, Labelling, Supplies)
- [ ] Business Solutions (by industry)
- [ ] Support (Downloads, FAQs, Warranty)
- [ ] EcoPro Subscription service

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run storybook` | Start Storybook |

---

## Documentation

- [Sitecore Content SDK](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)
- [XM Cloud Documentation](https://doc.sitecore.com/xmc/en/developers/xm-cloud/)
- [Serialization Guide](https://doc.sitecore.com/xmc/en/developers/xm-cloud/serialization-in-sitecore.html)
- [Clone a Site (Sitecore AI)](https://doc.sitecore.com/sai/en/developers/sitecoreai/clone-a-site.html)
- [Project Documentation](../../docs/README.md)

---

## Origin

This site was cloned from **Forma Lux (Retail)** using Sitecore PowerShell Extensions.

**Clone Date:** December 2025
**Base Vertical:** Retail
**Components Inherited:** 54
