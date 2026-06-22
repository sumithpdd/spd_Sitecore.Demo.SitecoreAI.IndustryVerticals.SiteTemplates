# Marley

## Overview

Dedicated rendering host for **[Marley](https://www.marley.co.uk/)** — pitched roof systems, roof tiles, solar, accessories, blog, and technical content. Built with the **website-to-sitecore** workflow (capture → component review → YAML + Next.js).

| | Value |
|---|--------|
| **Rendering host key** | `marley` (`xmcloud.build.json`) |
| **Site name** | `marley` (`NEXT_PUBLIC_DEFAULT_SITE_NAME`) |
| **Serialization module** | `authoring/items/marley` |
| **Content root** | `/sitecore/content/marley/marley` |
| **Full setup guide** | [docs/MARLEY.md](../../docs/MARLEY.md) |
| **Cursor agents** | [`.cursor/AGENTS.md`](../../.cursor/AGENTS.md) — rules and skills reference |
| **XM Cloud project** | SitecoreSilver → **SitecoreSilverProd** |
| **Editing host** | `marley` (registered; ID `4hpZwGNI9QyMAQGNhdwCoi`) |
| **Site Grouping RenderingHost** | `marley` (pulled from CM) |
| **CM environment** | `SitecoreSilverProd` |

**Evidence and component map:** `design-screenshots/marley-co-uk/component-review.json`

## Pages (mirrors marley.co.uk)

| URL path | Sitecore item | Main components |
|----------|---------------|-----------------|
| `/` | Home | HeroBanner, Promo ×4, Features ×2 |
| `/products` | Home/Products | PageHeader, ProductListing, RichText |
| `/roof-tiles` | Home/Roof-Tiles | PageHeader, ProductListing, RichText |
| `/roof-tiles/clay-roof-tiles/acme-single-camber-plain-tile` | Home/Roof-Tiles/Clay-Roof-Tiles/Acme-Single-Camber-Plain-Tile | ProductDetails, Features, Promo |
| `/blog` | Home/Blog | PageHeader, ArticleListing |
| `/blog/warm-homes-plan-government-funding-for-homeowners` | Home/Blog/Warm-Homes-Plan-Government-Funding-For-Social-Housing | HeroBanner, PageContent, LinkList, Promo |

All pages include **Header** (Image, Navigation, NavigationIcons) and **Footer** (Marley + LinkList ×3) via the Default page design. Full matrix: [docs/MARLEY.md](../../docs/MARLEY.md#page-map).

## Local development

```powershell
cd industry-verticals/marley
cp .env.remote.example .env.local
# SitecoreSilverProd edge context (NOT Lyvera/starter sandbox), NEXT_PUBLIC_DEFAULT_SITE_NAME=marley
npm install
npm run dev
# Confirm __NEXT_DATA__ shows "siteName":"marley" — see docs/MARLEY.md Step 6
```

After component changes:

```powershell
npm run sitecore-tools:generate-map
npx tsc --noEmit
```

## Components

Cloned from **luxury-retail** plus article components from **retail**:

Header, Navigation, NavigationIcons, Footer, HeroBanner, Promo, Features, PageHeader, ProductListing, ProductDetails, RichText, PageContent, LinkList, **ArticleListing**, **ArticleDetails**, Pagination, SocialShare.

**IGQL field handling:** datasource fields from XM Cloud GraphQL must be normalized before render. See `src/helpers/field-utils.ts` and [docs/MARLEY.md](../../docs/MARLEY.md#page-map). Components updated for delivery-safe rendering: HeroBanner, Promo, Features, Footer (Marley), LinkList, PageHeader, RichText, PageContent, Image.

Theme: `src/assets/base/variables.css`, `src/assets/marley/marley.css` (Marley red `#c83232`, charcoal `#4d4d4c`).

## Serialization

Regenerate page layout and datasources:

```powershell
node authoring/items/marley/scripts/generate-marley-site.mjs
dotnet sitecore serialization validate --fix -i marley
dotnet sitecore serialization push -n SitecoreSilverProd -i marley
```

**Pull** after CM author changes (RenderingHost, thumbnail, content edits):

```powershell
dotnet sitecore serialization pull -n SitecoreSilverProd -i marley
dotnet sitecore serialization validate --fix -i marley
```

Commit pulled YAML under `authoring/items/marley/` before the next push.

## Content tree (after push)

After a successful push, Content Editor shows the **marley** collection and site at `/sitecore/content/marley/marley`:

![Marley content tree after serialization push](../../docs/images/marley/02-content-tree-after-push.png)

Expand **Home** to verify all demo pages:

![Marley Home page tree expanded after push](../../docs/images/marley/03-content-tree-home-pages-expanded.png)

| Path | Description |
|------|-------------|
| `/sitecore/content/marley` | Site collection (tenant folder) |
| `/sitecore/content/marley/marley` | Site root — Home, Media, Data, Dictionary, Presentation, Settings |
| `.../Settings/Site Grouping/marley` | Site definition — **RenderingHost** must be `marley` |

Expand **Home** for the six demo pages (Products, Roof-Tiles, Blog, etc.). See [docs/MARLEY.md](../../docs/MARLEY.md) for the full page map.

| Sitecore item | URL |
|---------------|-----|
| `Home/Products` | `/products` |
| `Home/Roof-Tiles/Clay-Roof-Tiles/Acme-Single-Camber-Plain-Tile` | `/roof-tiles/clay-roof-tiles/acme-single-camber-plain-tile` |
| `Home/Blog` | `/blog` |
| `Home/Blog/Warm-Homes-Plan-Government-Funding-For-Homeowners` | `/blog/warm-homes-plan-government-funding-for-homeowners` |

## Editing host

The **`marley`** editing host is registered in XM Cloud Deploy on the **SitecoreSilver** project, linked to **SitecoreSilverProd** (Production), branch **`main`**, with **auto deploy based on commits**.

| Setting | Value |
|---------|--------|
| **Editing host name** | `marley` (must match `xmcloud.build.json`) |
| **XM Cloud project** | SitecoreSilver |
| **Authoring environment** | SitecoreSilverProd |
| **Host ID** | `4hpZwGNI9QyMAQGNhdwCoi` |
| **Site Grouping RenderingHost** | `marley` (serialized in repo after CM pull) |

![Marley editing host in XM Cloud Deploy portal](../../docs/images/marley/01-editing-hosts-portal.png)

**Site thumbnail** is set on the site root (`__Thumbnail` → media item under `Project/marley/marley/System/`). Pulled via serialization pull.

After the host is added, run **Build and deploy** from the host **Options** menu and confirm deploy succeeds.

Full checklist: [docs/MARLEY.md](../../docs/MARLEY.md).
