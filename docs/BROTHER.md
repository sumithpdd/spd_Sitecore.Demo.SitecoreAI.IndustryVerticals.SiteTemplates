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

## Storyboard — talk-track open links

Personas switcher in the header: **Jack** · **Izzy** · **Rick**.

| Beat | Open this |
|------|-----------|
| Home (default) | `/` |
| Izzy — At your side campaign | `/campaigns/at-your-side?utm_campaign=at-your-side&persona=izzy` |
| Izzy — labelling UTM | `/?utm_campaign=label-printer&persona=izzy` |
| Jack — SERP → printers | `/printers?utm_campaign=home-printer&utm_source=google&persona=jack` |
| Jack — return visit | `/?utm_campaign=return-visit&persona=jack` |
| Jack — search | `/search?q=home+laser+printer` |
| Rick — supplies / OrderCloud | `/supplies?utm_campaign=ordercloud-supplies&persona=rick` |
| Rick — checkout demo | `/checkout/supplies?utm_campaign=ordercloud-checkout&persona=rick` |
| Rick — business / CRO | `/business-solutions?persona=rick` |
| Content Hub–style product PDP | `/devices/label-printer/vc/vc500w` or `/devices/printers/hl/hl-l2460dn` |

### Intent query params (`HeroBanner` + listing banners)

| Intent | Triggers |
|--------|----------|
| `label-printer` | `utm_campaign` / content contains label-printer, vc-500w, labelling, izzy |
| `home-printer` | home-printer, jack, google+printer |
| `at-your-side` | at-your-side, atyourside |
| `return-visit` | return, consumers, product-interest, welcome-back |
| `supplies` | supplies, toner, ink, reorder, ordercloud |

## Story & catalogue pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero + promo + featured product grid |
| `/campaigns/at-your-side` | Izzy multi-channel campaign landing |
| `/checkout/supplies` | OrderCloud cart / checkout demo |
| `/search` | Site search (demo index) |
| `/labelling-and-receipts` | Labelling category listing |
| `/labelling-and-receipts/vc-500w` | VC-500W overview (+ promo) |
| `/printers` · `/scanners` · `/devices` · `/supplies` | Category listings |
| `/supplies/toner/tn-243bk` · `/supplies/labels/dk-22205` | Supplies SKUs |
| `/business-solutions` · `/support` | Hub pages |
| Product PDPs under `/devices/...` | Catalogue below |

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
| TN-243BK | `/supplies/toner/tn-243bk` | Supplies |
| DK-22205 | `/supplies/labels/dk-22205` | Supplies |

Source of truth for FE fallbacks: `industry-verticals/brother/src/lib/products-catalog.ts` + `search-index.ts`.

### Demo search (Sitecore Search stand-in)

Until `NEXT_PUBLIC_SITECORE_SEARCH_INDEX_ID` is wired to `@sitecore-content-sdk/nextjs/search`, `/search` and the header typeahead use a **local demo index**.

Try: `label printer`, `VC-500W`, `scanner`, `laser`, `toner`, `desk`.

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

## Page Designs (Forma Lux pattern)

| Page Design | Partial Designs | Template mapping |
|-------------|-----------------|------------------|
| **Default** | Header + Footer | `Page` |
| **ProductCategoryPage** | Header + ProductCategoryContent + Footer | `ProductCategoryPage` (listings) |
| **ProductPage** | Header + ProductContent + Footer | `ProductPage` (PDPs) |

Partial Designs live under `Presentation/Partial Designs/` (`Signature` = `header` / `footer` / `productcontent` / `productcategorycontent`). Listing hubs (`/printers`, `/devices`, …) and device PDPs assign the matching **Page Design**; chrome comes from partials, not Layout fallbacks (Layout still falls back if placeholders are empty).

## Components

| Component | Role |
|-----------|------|
| `Header` / `HeaderSearch` | Partial Design `Header` + persona bar + typeahead |
| `Footer` | Partial Design `Footer` |
| `HeroBanner` | UTM / persona intents (Jack, Izzy, Rick, return, supplies) |
| `CampaignLanding` | `/campaigns/at-your-side` multi-channel pack |
| `OrderCloudCheckout` | `/checkout/supplies` commerce demo |
| `PromoStrip` | Labelling CTA band |
| `ProductListing` | ProductCategoryContent partial / category grids |
| `ProductDetail` | ProductContent partial + OrderCloud CTA |
| `SiteSearch` | Full search UI on `/search` |
| `FeatureGrid` | Vertical applications cards |
| `ArticleBody` | Desk organisation article |
| `PartialDesignDynamicPlaceholder` | Resolves page-design partials |

Layout falls back to Header/Footer when page-design chrome placeholders are empty.

---

## Legal / demo note

SitecoreAI industry demo patterned after public Brother UK marketing pages. Brand assets are for local/demo authoring only.
