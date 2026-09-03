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

## Story pages

| Route | Purpose | Reference |
|-------|---------|-----------|
| `/` | Home — default Brother hero + labelling promo strip | https://www.brother.co.uk/ |
| `/?utm_campaign=label-printer` | Home hero promotes **VC-500W** | same + UTM |
| `/labelling-and-receipts/vc-500w` | Product overview (ZINK, Wi‑Fi, five widths) | https://www.brother.co.uk/labelling-and-receipts/vc-500w |
| `/labelling-and-receipts/vc-500w/vc-500w-vertical-applications` | Applications feature grid | vertical applications page |
| `/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office` | Desk / home-office article | Brother blog |
| `/devices/label-printer/vc/vc500w` | Store-style PDP | https://store.brother.co.uk/devices/label-printer/vc/vc500w |

### Demo intent

| Params | Effect |
|--------|--------|
| `utm_campaign=label-printer` (also `vc-500w`, `labelling`) | Home `HeroBanner` swaps to VC-500W promo copy/image |

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
dotnet sitecore login   # if refresh token expired
dotnet sitecore serialization push -n <your-env> -i brother-scs
```

**Media (mandatory):** story images are downloaded from Brother Content Hub into `media-library` YAML and copied to `public/images/` for live fallbacks. Do not hotlink brother.co.uk CDNs in datasources. Mimic is not complete until `media-library` is **pushed**.

Note: Playwright captures against brother.co.uk may be WAF-blocked (“request is blocked”). Use browser User-Agent HTML under `design-screenshots/brother-co-uk/fetched-html/` plus `Download-BrotherMedia.ps1`.

---

## Components

| Component | Role |
|-----------|------|
| `Header` | Brother chrome + story nav |
| `Footer` | Address / explore links |
| `HeroBanner` | Home hero; UTM label-printer → VC-500W |
| `PromoStrip` | Labelling CTA band (home / product) |
| `ProductDetail` | VC-500W overview + store PDP |
| `FeatureGrid` | Vertical applications cards |
| `ArticleBody` | Desk organisation article |
| `PartialDesignDynamicPlaceholder` | Partial designs |

Layout falls back to Header/Footer when page-design chrome placeholders are empty.

---

## Legal / demo note

SitecoreAI industry demo patterned after public Brother UK marketing pages. Brand assets are for local/demo authoring only.
