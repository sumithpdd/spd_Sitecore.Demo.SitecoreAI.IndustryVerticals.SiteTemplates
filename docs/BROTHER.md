# Brother UK (labelling & printing vertical)

SitecoreAI demo host for **Brother UK** — [brother.co.uk](https://www.brother.co.uk/) labelling / VC-500W story. Collection and site system name: `brother`.

| | Value |
|--|--|
| **Reference design** | [brother.co.uk](https://www.brother.co.uk/) |
| **Rendering host** | `brother` → `industry-verticals/brother` |
| **Build key** | `brother` in `xmcloud.build.json` |
| **Site name** | `brother` |
| **Collection path** | `/sitecore/content/brother` |
| **Site content path** | `/sitecore/content/brother/brother` |
| **Module** | `authoring/items/brother/brother.module.json` (`brother-scs`) |
| **Design captures** | `design-screenshots/brother-co-uk/` |
| **Component review** | `design-screenshots/brother-co-uk/component-review.json` |
| **GUID prefix** | `b40e` (renderings / story pages) |

### Isolation layout

| Sitecore area | Path |
|---------------|------|
| Collection | `/sitecore/content/brother` |
| Site | `/sitecore/content/brother/brother` |
| Templates | `/sitecore/templates/Project/brother` |
| Renderings | `/sitecore/layout/Renderings/Project/brother` |
| Media | `/sitecore/media library/Project/brother` |

---

## Story & catalogue pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero + promo + featured product grid |
| `/?utm_campaign=label-printer` | Home hero promotes **VC-500W** |
| `/search` | Site search (demo index; scopes: everything / products / articles) |
| `/labelling-and-receipts` | Labelling category listing |
| `/labelling-and-receipts/vc-500w` | VC-500W overview |
| `/labelling-and-receipts/vc-500w/vc-500w-vertical-applications` | Applications feature grid |
| `/printers` · `/scanners` · `/devices` · `/supplies` | Category / all-devices listings |
| `/business-solutions` · `/support` | Hub pages (links into catalogue) |
| `/brother-for-home/blog/.../5-great-ideas-for-organising-your-desk-and-home-office` | Desk / home-office article |
| Product PDPs under `/devices/...` | See catalogue below |

### Product catalogue (search + listings)

| Model | Path | Category |
|-------|------|----------|
| VC-500W | `/devices/label-printer/vc/vc500w` | Labelling |
| QL-800 | `/devices/label-printer/ql/ql-800` | Labelling |
| QL-820NWB | `/devices/label-printer/ql/ql-820nwb` | Labelling |
| PT-P750W | `/devices/label-printer/pt/pt-p750w` | Labelling |
| TD-4550DNWB | `/devices/label-printer/td/td-4550dnwb` | Labelling |
| DCP-L3520CDW | `/devices/printers/dcp/dcp-l3520cdw` | Printers |
| MFC-L8390CDW | `/devices/printers/mfc/mfc-l8390cdw` | Printers |
| HL-L2460DN | `/devices/printers/hl/hl-l2460dn` | Printers |
| ADS-1800W | `/devices/scanners/ads/ads-1800w` | Scanners |
| ADS-4900W | `/devices/scanners/ads/ads-4900w` | Scanners |

Source of truth for FE fallbacks: `industry-verticals/brother/src/lib/products-catalog.ts` + `search-index.ts`.

### Demo search (Sitecore Search stand-in)

Until `NEXT_PUBLIC_SITECORE_SEARCH_INDEX_ID` is wired to `@sitecore-content-sdk/nextjs/search`, `/search` and the header typeahead use a **local demo index** of the same products/pages you would crawl after push/publish.

Try: `label printer`, `VC-500W`, `scanner`, `laser`, `desk`, `wifi`.

| Params | Effect |
|--------|--------|
| `utm_campaign=label-printer` (also `vc-500w`, `labelling`) | Home `HeroBanner` → VC-500W |
| `/search?q=…&scope=products` | Filter results to products |

---

## Local setup

```bash
cd industry-verticals/brother
cp .env.remote.example .env.local   # if present; else create from Deploy portal
# SITECORE_EDGE_CONTEXT_ID, SITECORE_EDITING_SECRET, NEXT_PUBLIC_DEFAULT_SITE_NAME=brother
npm install
npm run dev
```

### Authoring / media

```bash
node authoring/items/brother/scripts/generate-brother-site.mjs
powershell -File authoring/items/brother/scripts/Download-BrotherMedia.ps1
dotnet sitecore serialization validate --fix -i brother-scs
dotnet sitecore cloud login
dotnet sitecore serialization push -n sitecoreSilverProd -i brother-scs
```

**Media (mandatory):** story images are downloaded from Brother Content Hub into `media-library` YAML and copied to `public/images/` for live fallbacks. Do not hotlink brother.co.uk CDNs in datasources. Mimic is not complete until `media-library` is **pushed**.

After push/publish, the same catalogue URLs are what Sitecore Search would crawl; until a Search index ID is set, the FE uses the local demo index on `/search`.

Note: Playwright captures against brother.co.uk may be WAF-blocked (“request is blocked”). Use browser User-Agent HTML under `design-screenshots/brother-co-uk/fetched-html/` plus `Download-BrotherMedia.ps1`.

---

## Components

| Component | Role |
|-----------|------|
| `Header` / `HeaderSearch` | Nav + typeahead → `/search` |
| `Footer` | Explore links across catalogue |
| `HeroBanner` | Home hero; UTM label-printer → VC-500W |
| `PromoStrip` | Labelling CTA band |
| `ProductListing` | Category / all-devices grids |
| `ProductDetail` | PDP from catalogue (path match) + related |
| `SiteSearch` | Full search UI on `/search` |
| `FeatureGrid` | Vertical applications cards |
| `ArticleBody` | Desk organisation article |
| `PartialDesignDynamicPlaceholder` | Partial designs |

Layout falls back to Header/Footer when page-design chrome placeholders are empty.

---

## Legal / demo note

SitecoreAI industry demo patterned after public Brother UK marketing pages. Brand assets are for local/demo authoring only.
