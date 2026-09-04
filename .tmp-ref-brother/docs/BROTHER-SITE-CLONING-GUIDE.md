# Brother UK Site - Cloning Guide

This guide outlines the steps to clone the **Forma Lux** (Retail) vertical to create a new site for **Brother UK** (https://www.brother.co.uk/).

---

## ✅ Completed Steps

### 1. Sitecore Content Tree Clone (COMPLETED)

The Sitecore content tree has been successfully cloned from **Forma Lux** to **Brother** using the Sitecore PowerShell Extensions (SPE) script.

**Method Used:** [Sitecore AI - Clone a Site](https://doc.sitecore.com/sai/en/developers/sitecoreai/clone-a-site.html)

**Sitecore Content Structure Created:**

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

**Item Details:**
- **Item ID:** `{49598DFE-6F68-4B55-A50D-7EC1303F507D}`
- **Item Path:** `/sitecore/content/industry-verticals/brother/Settings`
- **Template:** `/sitecore/templates/Project/industry-verticals/JSS Settings`
- **Created from:** `Headless Site, en, 1 - {45CF9F42-B3AC-4412-AAB9-F8441C7E448E}`

---

### 2. Rendering Host Created (COMPLETED)

The Next.js rendering host has been created at:

```
industry-verticals/brother/
```

**Cloned from:** `industry-verticals/retail/` (Forma Lux)

**Structure includes:**
- 54 Sitecore components
- All assets, helpers, hooks, and types
- Storybook stories for component development
- Shadcn UI components

---

### 3. Environment Configuration (COMPLETED)

Environment file created at `industry-verticals/brother/.env.local`:

```env
NEXT_PUBLIC_DEFAULT_SITE_NAME=brother
# ... other environment variables configured
```

---

### 4. XM Cloud Build Configuration (COMPLETED)

Updated `xmcloud.build.json` with Brother rendering host:

```json
"brother": {
  "path": "./industry-verticals/brother",
  "nodeVersion": "22.11.0",
  "jssDeploymentSecret": "***",
  "enabled": true,
  "type": "sxa",
  "buildCommand": "build",
  "runCommand": "next:start"
}
```

**Note:** Brother is the only enabled rendering host (other verticals disabled for focused development).

---

## About Brother UK

Brother UK is a leading manufacturer of business and consumer products including:
- **Printers** (Laser, Inkjet, Portable, All-in-one)
- **Scanners** (Portable, Desktop)
- **Labelling & Receipt Solutions**
- **Managed Print Services**
- **Business Solutions** by industry (Healthcare, Retail, Manufacturing, etc.)

**Brand Identity:**
- Established technology company (since 1908)
- Focus on reliability, quality, and sustainability
- "More time for life" tagline
- 12-time winner of PC Pro "Best Printer Manufacturer"

---

## Clone Strategy

We used **Forma Lux (Retail)** as the base because:
1. It has the most comprehensive component set (54 components)
2. Strong e-commerce/product focus aligns with Brother's product catalog
3. Includes article/content management for Brother's news and resources
4. Has product listing, details, and carousel components

---

## Remaining Steps

### Step 1: Serialize the Cloned Content Items

Pull the Sitecore items to your local project:

```powershell
# Navigate to authoring folder
cd authoring

# Connect to your XM Cloud environment
dotnet sitecore cloud environment connect --environment-id <your-env-id> --allow-write true

# Pull the new Brother site items
dotnet sitecore ser pull
```

This will create the serialized YML files for the Brother site.

---

### Step 2: Update Site Grouping Configuration

Ensure the Site Grouping item points to the `brother` rendering host.

In Sitecore Content Editor, navigate to:
```
/sitecore/content/industry-verticals/brother/Settings/Site Grouping/brother
```

Verify/update the **RenderingHost** field to: `brother`

---

### Step 3: Customize Branding & Styling

#### 3.1 Color Palette

Update `industry-verticals/brother/src/assets/base/variables.css`:

```css
/* Brother Brand Colors */
:root {
  --brother-blue: #0066B3;        /* Primary Blue */
  --brother-dark-blue: #003366;   /* Dark Blue */
  --brother-light-blue: #E6F2FF;  /* Light Blue Background */
  --brother-orange: #FF6600;      /* Accent Orange */
  --brother-green: #00A651;       /* Sustainability Green */
  --brother-gray: #666666;        /* Text Gray */
  --brother-white: #FFFFFF;
  --brother-black: #000000;
}
```

#### 3.2 Typography

Brother uses clean, professional fonts:

```css
/* Recommended fonts */
font-family: 'Helvetica Neue', 'Arial', sans-serif;
```

---

### Step 4: Content Structure for Brother

#### Recommended Page Structure

```
/brother (Home)
├── /products
│   ├── /printers
│   │   ├── /laser-printers
│   │   ├── /inkjet-printers
│   │   ├── /all-in-one-printers
│   │   └── /portable-printers
│   ├── /scanners
│   │   ├── /desktop-scanners
│   │   └── /portable-scanners
│   ├── /labelling
│   └── /supplies
├── /business-solutions
│   ├── /managed-print-services
│   ├── /by-industry
│   │   ├── /healthcare
│   │   ├── /retail
│   │   ├── /manufacturing
│   │   └── /education
│   └── /cloud-solutions
├── /support
│   ├── /downloads-drivers
│   ├── /faqs
│   ├── /warranty
│   └── /contact
├── /about
│   ├── /sustainability
│   ├── /news
│   └── /careers
└── /ecopro (Subscription Service)
```

---

### Step 5: Key Components to Customize

#### High Priority Components

| Component | Customization Needed |
|-----------|---------------------|
| `Header` | Brother logo, mega-menu for product categories |
| `Footer` | Brother links, social media, recycling info |
| `HeroBanner` | "More time for life" messaging, product imagery |
| `ProductListing` | Printer/scanner categorization |
| `ProductDetails` | Specs, downloads, supplies compatibility |
| `Navigation` | Mega-menu with industry solutions |

#### Brother-Specific Components to Create

| Component | Purpose |
|-----------|---------|
| `EcoProBanner` | Subscription service promotion |
| `ProductComparison` | Compare printers/scanners |
| `SuppliesFinder` | Find compatible ink/toner |
| `IndustrySolutions` | Industry-specific solution cards |
| `SupportWidget` | Quick access to drivers/downloads |
| `SubscriptionPlans` | EcoPro pricing tiers |

---

### Step 6: Local Development

#### Install & Run

```powershell
cd industry-verticals\brother
npm install
npm run dev
```

Visit: http://localhost:3000

---

## Deployment Checklist

### Sitecore Content (✅ Completed)
- [x] Clone site content tree from Forma Lux
- [x] Clone media library items
- [x] Clone site settings and configuration
- [x] App Name set to "brother"

### Front-End Rendering Host (✅ Completed)
- [x] Clone retail directory to `brother`
- [x] Create `.env.local` with `NEXT_PUBLIC_DEFAULT_SITE_NAME=brother`
- [x] Add rendering host to `xmcloud.build.json`
- [x] Enable Brother rendering host

### Serialization (Remaining)
- [ ] Run `sitecore ser pull` to serialize cloned items
- [ ] Update Site Grouping to use `brother` rendering host
- [ ] Commit serialized items to source control

### Customization (Remaining)
- [ ] Customize CSS/branding with Brother colors
- [ ] Add Brother logo and media assets
- [ ] Create EcoPro subscription components
- [ ] Set up product categories (printers, scanners, labelling)
- [ ] Create industry solutions pages
- [ ] Configure support/downloads section
- [ ] Test all components locally

### Deployment (Remaining)
- [ ] Deploy to XM Cloud
- [ ] Verify editing host in XM Cloud Deploy
- [ ] Test editing experience in Pages

---

## Available Components (Inherited from Forma Lux)

The Brother site includes all 54 components from the Retail vertical:

| Category | Components |
|----------|------------|
| **Layout** | Container, ColumnSplitter, RowSplitter, SectionWrapper, PageContent |
| **Navigation** | Header, Footer, Navigation, NavigationIcons, Breadcrumb, LanguageSwitcher |
| **Content** | HeroBanner, ContentBlock, RichText, Title, Image, Promo, Features |
| **Products** | ProductListing, ProductDetails, SelectedProducts, AllProductsCarousel |
| **Articles** | ArticleListing, ArticleDetails, ArticleCarousel |
| **Engagement** | ContactForm, Subscribe, Reviews, SocialFeed, SocialFollow, Offers |

---

## Reference Links

- **Brother UK Website:** https://www.brother.co.uk/
- **Sitecore Clone Site Guide:** https://doc.sitecore.com/sai/en/developers/sitecoreai/clone-a-site.html
- **XM Cloud Documentation:** https://doc.sitecore.com/xmc/en/developers/xm-cloud/
- **Content SDK:** https://doc.sitecore.com/xmc/en/developers/content-sdk/
- **Serialization Guide:** https://doc.sitecore.com/xmc/en/developers/xm-cloud/serialization-in-sitecore.html

---

## Notes

- Brother UK has a strong focus on **sustainability** (Brother Earth initiative)
- **EcoPro subscription** is a key differentiator - subscription-based printing
- Site should support multiple **industry verticals** within Business Solutions
- Consider **accessibility** requirements for enterprise customers
- The cloned site inherits all Forma Lux components and templates - customize as needed

---

## Screenshot Reference

![Brother Site Clone in Sitecore](./brother_clone_site.png)

*Sitecore Content Editor showing the cloned Brother site structure*
