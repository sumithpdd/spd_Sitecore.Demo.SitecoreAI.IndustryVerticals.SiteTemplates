# Bristan demo site

UK taps and showers demo inspired by [bristan.com](https://www.bristan.com/). Uses **full site isolation**: own Sitecore collection, templates, renderings, and media — while reusing **industry-verticals** datasource templates and the same React component names as Forma Lux / retail.

|                        | Value                                                  |
| ---------------------- | ------------------------------------------------------ |
| **Reference site**     | [bristan.com](https://www.bristan.com/)                |
| **Rendering host**     | `bristan` → `industry-verticals/bristan`               |
| **Build key**          | `bristan` in `xmcloud.build.json`                      |
| **Site name**          | `bristan`                                              |
| **Heritage site**      | `heritage` at `/sitecore/content/bristan/heritage` (shares `bristan` rendering host) |
| **Collection path**    | `/sitecore/content/bristan`                            |
| **Site content path**  | `/sitecore/content/bristan/bristan`                    |
| **Module**             | `authoring/items/bristan/bristan.module.json`          |
| **Design captures**    | `design-screenshots/bristan-com/`                      |
| **Component manifest** | `design-screenshots/bristan-com/component-review.json` |

### Isolation layout

| Sitecore area        | Path                                                    |
| -------------------- | ------------------------------------------------------- |
| Collection           | `/sitecore/content/bristan`                             |
| Site                 | `/sitecore/content/bristan/bristan`                     |
| Templates            | `/sitecore/templates/Project/bristan`                   |
| Branches             | `/sitecore/templates/Branches/Project/bristan`          |
| Renderings           | `/sitecore/layout/Renderings/Project/bristan`           |
| Placeholder settings | `/sitecore/layout/Placeholder Settings/Project/bristan` |
| Project settings     | `/sitecore/system/Settings/Project/bristan`             |
| Media library        | `/sitecore/media library/Project/bristan`               |

Datasource templates still reference **Project/industry-verticals** (Hero, Promo, Footer, etc.). Renderings under **Project/bristan** use unique IDs (`b8030070-*`) but the same `componentName` values as the shared verticals set.

---

## Design reference (captured from bristan.com)

Desktop screenshots below were captured with Playwright (`url-screenshots` skill). Full set (desktop / tablet / mobile, clean + overlay) lives under `design-screenshots/bristan-com/`.

### Home

![Bristan.com home — desktop reference](./images/bristan/home-desktop.png)

_Route: `/` — audience gateway, lifetime guarantee promo, hero carousel_

### Homeowners

![Bristan homeowners landing](./images/bristan/homeowners-home-desktop.png)

_Route: `/homeowners-home` — inspiration carousel, lifetime guarantee, stockist CTA_

### Showers

![Bristan showers category](./images/bristan/showers-desktop.png)

_Route: `/showers` — shower packs, mini valve, bar showers, recessed ranges_

### Bathroom taps

![Bristan bathroom taps category](./images/bristan/bathroom-taps-desktop.png)

_Route: `/bathroom-taps` — one-hole / two-hole / wall-mounted, finishes, Eco Start_

### Installers

![Bristan installers landing](./images/bristan/installers-home-desktop.png)

_Route: `/installers-home` — On Tap community, lifetime guarantee, essentials range_

### Product listing

![Bristan bathroom taps product filters](./images/bristan/products-bathroom-taps-desktop.png)

_Route: `/products/bathroom-taps` — filter sidebar + product grid_

### Merchants

![Bristan merchants landing](./images/bristan/merchants-home-desktop.png)

_Route: `/merchants-home` — merchant portal, brochures, stockist network_

### Specifiers

![Bristan specifiers landing](./images/bristan/specifiers-home-desktop.png)

_Route: `/specifiers-home` — sector tiles (healthcare, new build, affordable housing, care homes)_

### Brochures

![Bristan order a brochure](./images/bristan/order-a-brochure-desktop.png)

_Route: `/order-a-brochure` — downloadable brochure list_

### Design tokens (from capture)

| Token                 | Value                           |
| --------------------- | ------------------------------- |
| Primary navy          | `#003058`                       |
| Secondary             | `#17243d`                       |
| Accent / gradient end | `#7aa7be`                       |
| Typography            | Gotham Book / Medium / Bold     |
| Neutrals              | `#ffffff`, `#898989`, `#000000` |

Re-capture:

```bash
node .cursor/skills/mimic-website-skills/url-screenshots/scripts/capture.mjs \
  --file design-screenshots/bristan-com/capture-urls.txt \
  --out design-screenshots/bristan-com --manifest
```

---

## Site connection

| Setting        | Value                                         |
| -------------- | --------------------------------------------- |
| Site name      | `bristan`                                     |
| Rendering host | `bristan` → `industry-verticals/bristan`      |
| Start item     | Home (`b8030000-0001-4000-8000-000000000002`) |

In **Settings → Site Grouping → bristan**, set **Predefined application editing host** to `bristan` (same pattern as [Forma Lux site grouping](../assets/sitecore-predefined-application-editing-host.png)).

Do the same for **heritage** — both sites use the **`bristan`** rendering host (`industry-verticals/bristan`). Other tenant sites (Lyvera, Forma Lux, Keith Prowse, etc.) have their **own** rendering hosts and are **not** built by the bristan Next.js app.

## Rendering host scope and static build

The **bristan** editing host (`npm run build` in `industry-verticals/bristan`) only pre-renders pages for sites it serves:

| Site       | Built by bristan host? | Notes                                      |
| ---------- | ---------------------- | ------------------------------------------ |
| `bristan`  | Yes                    | Primary demo site                          |
| `heritage` | Yes                    | Same React app, `heritage-site` body class |
| `lyvera`   | **No**                 | Use `industry-verticals/lyvera` host     |
| `forma-lux`| **No**                 | Use `industry-verticals/retail` host       |
| Others     | **No**                 | Each has its own rendering host in repo    |

### Why this matters

XM Cloud generates `.sitecore/sites.json` with **every site in the tenant** (for multisite middleware). Without filtering, `getStaticPaths` would try to pre-render hundreds of routes such as `/en/_site_lyvera/brands/gullivers-sports-travel` during the **bristan** build. Those pages use different React components and layout data, which causes build failures (`Cannot read properties of undefined (reading 'route')`) and spurious placeholder warnings.

### Implementation

`src/lib/rendering-host-sites.ts` filters SSG path discovery to **`bristan`** and **`heritage`** by default. `src/pages/[[...path]].tsx` uses `getStaticBuildSiteNames(sites)` instead of all entries in `sites.json`.

Optional override (editing host env or `.env.local`):

```bash
SITECORE_STATIC_BUILD_SITES=bristan,heritage
```

Runtime multisite routing (middleware, sitemap, robots) still reads the full `sites.json` so `_site_*` URL resolution works when multiple hosts share a deployment URL.

### Header promo placeholder (`headless-header-promo`)

The lifetime-guarantee notification bar sits **above** the main header (bristan.com pattern):

- **Layout:** `src/Layout.tsx` renders `headless-header-promo` only when that placeholder exists in layout data (other tenant sites do not define it).
- **Authoring:** **Header Promo** partial design on all page designs; Promo **TopBanner** variant on `headless-header-promo`.
- **Placeholder settings:** `Presentation/Placeholder Settings/headless-header-promo` and `Partial Design/Header Promo` (`sxa-header-promo`).

After serialization changes, push and publish so Edge returns the merged partial design.

## Pages and routes

Content root: `/sitecore/content/bristan/bristan/Home` (start item `b8030000-0001-4000-8000-000000000002`). Routes are standard Sitecore paths (no `_site_` prefix when `bristan` is the default site).

### Marketing and audience landings

| Route | Content item | Page design | Key components |
| ----- | ------------ | ----------- | -------------- |
| `/` | Home | Default | HeroBanner `Default`, Features `AudienceTiles`, InspirationCarousel, TrustpilotWidget, Promo `CenteredCta`, Features `BrowseRanges`, RichText |
| `/homeowners-home` | homeowners-home | Default | HeroBanner, Promo `Lifetime`, InspirationCarousel, Features `HelpCards`, RichText |
| `/showers` | showers | Default | HeroBanner `TopContent`, Promo, RichText |
| `/bathroom-taps` | bathroom-taps | Default | HeroBanner `TopContent`, Promo, RichText |
| `/installers-home` | installers-home | Default | HeroBanner, Promo, RichText |
| `/merchants-home` | merchants-home | Default | HeroBanner, Promo, RichText |
| `/specifiers-home` | specifiers-home | Default | HeroBanner, Promo, RichText |
| `/specifiers-home/sectors/affordable-housing` | affordable-housing | Default | HeroBanner, RichText |
| `/essentials` | essentials | Default | HeroBanner, Promo, RichText |
| `/find-a-retailer` | find-a-retailer | Default | HeroBanner, Promo, RichText |
| `/order-a-brochure` | order-a-brochure | Default | HeroBanner, Promo `RequestBrochure`, RichText |

Reference screenshots: [docs/images/bristan/](./images/bristan/).

### Products

| Route | Content item | Page design | Key components |
| ----- | ------------ | ----------- | -------------- |
| `/products` | products | Default | PageHeader, RichText |
| `/products/bathroom-taps` | products/bathroom-taps | ProductCategoryPage | PageHeader, ProductListing, Promo |
| `/products/bathroom-taps/{product}` | ~36 product items | ProductPage | ProductDetails, SpareParts, Promo `RequestBrochure` |

Example PDP: `/products/bathroom-taps/1901-basin-mixer-with-pop-up-waste` (slug from item name).

Product partial design **ProductContent** supplies `ProductDetails` on `headless-main`. **SpareParts** and **RequestBrochure** are on each product page `__Renderings` (not only in the partial design) so placeholders resolve correctly in headless layout.

### Blog and inspiration

| Route | Content item | Page design | Key components |
| ----- | ------------ | ----------- | -------------- |
| `/homeowners-home/inspiration-gallery` | inspiration-gallery | Default | HeroBanner, InspirationCarousel, RichText |
| `/homeowners-home/homeowners-inspiration/blogs` | blogs | Default | ArticleListing `BristanBlog`, Features `HelpCards` (footer band) |
| `/homeowners-home/homeowners-inspiration/blogs/{slug}` | article items | ArticlePage | **ArticleDetails `BristanBlog`** on page `__Renderings` + Features `HelpCards` |

Sample articles (serialized):

- `best-bath-fillers-to-make-your-bathroom-brilliant`
- `create-a-glowing-new-interior-with-bristan-gold-bathroom-taps`
- `choosing-the-right-kitchen-tap-for-your-home`

**Important:** Article body fields (`Title`, `Content`, `ShortDescription`) live on the **article page item**. `ArticleDetails` uses the context-item contents resolver — but the rendering must be on the page `__Renderings` (partial design alone is not enough in headless layout, same as product PDP). After CM edits, re-run `node authoring/items/bristan/scripts/patch-blog-renderings.mjs` if `ArticleDetails` was replaced by `Features` only.

Live [bristan.com](https://www.bristan.com/homeowners-home/homeowners-inspiration/blogs) may use a shorter article URL without `/blogs/` in the path; our Sitecore tree keeps articles under the `blogs` folder so routes include `/blogs/{slug}`.

### Utility

| Route | Content item | Key components |
| ----- | ------------ | -------------- |
| `/search` | search | SearchResults (+ Sitecore Search widgets) |

### Heritage site (`heritage`)

Separate site root: `/sitecore/content/bristan/heritage/Home`. Same rendering host and React components; `Layout` adds `heritage-site` body class. Examples:

| Route | Content item |
| ----- | ------------ |
| `/` (heritage site context) | Home |
| `/about-us` | about-us |
| `/collections`, `/collections/caversham`, … | collection pages |
| `/products`, `/products/basins`, … | heritage product categories |
| `/brochure`, `/contact-us`, `/customer-care`, `/showrooms`, `/inspiration` | utility / content |

Set **Predefined application editing host** to `bristan` on heritage Site Grouping as well.

### Page designs and partial designs

**Template → page design** (`Presentation/Page Designs` → `TemplatesMapping`):

| Template | Page design |
| -------- | ----------- |
| Page | Default |
| ProductPage | ProductPage |
| ProductCategoryPage | ProductCategoryPage |
| ArticlePage (industry-verticals) | ArticlePage |

**Partial designs** (merged on every page design):

| Partial design | Placeholder | Contents |
| -------------- | ----------- | -------- |
| Header Promo | `headless-header-promo` | Promo `TopBanner` (lifetime guarantee bar) |
| Header | `headless-header` | Header, logo, Navigation `BristanMegaMenu`, NavigationIcons `BristanUtility` |
| Footer | `headless-footer` | Footer, LinkList columns |
| ProductContent | `headless-main` | ProductDetails (PDP shell) |
| ProductCategoryContent | `headless-main` | ProductListing shell |
| ArticleContent | `headless-main` | ArticleDetails `BristanBlog` shell |

Page-level components in `headless-main` are authored on each page item or nested under ProductDetails placeholders.

---

## Components

All renderings live under `/sitecore/layout/Renderings/Project/bristan`. React `componentName` values match industry-verticals; rendering IDs are Bristan-specific (`b8030070-*`).

### Layout (`src/Layout.tsx`)

| Placeholder | Source | Notes |
| ----------- | ------ | ----- |
| `headless-header-promo` | Header Promo partial | Rendered only when present in layout JSON |
| `headless-header` | Header partial | Audience bar + mega menu |
| `headless-main` | Page / partial design | Page body |
| `headless-footer` | Footer partial | Link columns + legal |

### Chrome

| Sitecore rendering | React path | Headless variants | Role |
| ------------------ | ---------- | ----------------- | ---- |
| Header | `header/Header.tsx` | Default | Placeholders: `header-left-*`, `header-nav-*`, `header-right-*`; includes `AudienceBar`, `HeaderSearch` |
| Navigation | `navigation/Navigation.tsx` | Default, **BristanMegaMenu** | Products / Help / Inspiration mega-nav |
| Navigation Icons | `navigation-icons/NavigationIcons.tsx` | Default, **BristanUtility** | Wishlist, spares, sign-in, search trigger |
| Image | `image/Image.tsx` | Default | Logo in header-left |
| Footer | `footer/Footer.tsx` | Default | “Here to Help”, link columns, social |
| Link List | `link-list/LinkList.tsx` | Default | Footer columns |
| Breadcrumb | `breadcrumb/Breadcrumb.tsx` | Default | Optional on inner pages |

### Home and landing content

| Sitecore rendering | React path | Headless variants | Typical use |
| ------------------ | ---------- | ----------------- | ----------- |
| Hero Banner | `hero-banner/HeroBanner.tsx` | **Default**, **TopContent** | Home band + image; category title-over-image |
| Promo | `promo/Promo.tsx` | Default, WithFullImage, **TopBanner**, **CategoryTile**, **CenteredCta**, **RequestBrochure**, **Lifetime**, WithQuote | Header bar, CTAs, brochure blocks, tiles |
| Features | `features/Features.tsx` | Default, ImageGrid, **AudienceTiles**, **HelpCards**, **BrowseRanges**, FourColGrid, … | Audience gateway, help cards, range grid |
| Inspiration Carousel | `inspiration-carousel/InspirationCarousel.tsx` | Default | Home / homeowners inspiration strip |
| Trustpilot Widget | `trustpilot-widget/TrustpilotWidget.tsx` | Default | Embedded Trustpilot carousel (home) |
| Rich Text | `rich-text/RichText.tsx` | Default | Body copy bands |
| Reviews | `reviews/Reviews.tsx` | Default | Review quotes (where used) |
| Selected Products | `selected-products/SelectedProducts.tsx` | Default | Curated product row |
| All Products Carousel | `all-products-carousel/AllProductsCarousel.tsx` | Default | Product carousel |

### Products and articles

| Sitecore rendering | React path | Headless variants | Typical use |
| ------------------ | ---------- | ----------------- | ----------- |
| Page Header | `page-header/PageHeader.tsx` | Default | Listing / category title band |
| Product Listing | `product-listing/ProductListing.tsx` | Default | Filters + grid (`/products/bathroom-taps`) |
| Product Details | `product-details/ProductDetails.tsx` | Default | PDP: gallery, tabs, GBP pricing, related placeholder |
| SpareParts | `spare-parts/SpareParts.tsx` | Default | Spares list on PDP |
| Article Listing | `article-listing/ArticleListing.tsx` | Default, **BristanBlog** | Blog index with load more |
| Article Details | `article-details/ArticleDetails.tsx` | Default, **BristanBlog** | Blog article body |
| Search Results | `search-results/SearchResults.tsx` | Default | `/search` results host |

### Search widgets (component map)

Registered from `non-sitecore/search/` (shared Forma Lux rfkIds in `src/constants/search.ts`):

| Map name | File | Role |
| -------- | ---- | ---- |
| PreviewSearch | `PreviewSearch.tsx` | Header typeahead |
| SearchResultsComponent | `SearchResultsComponent.tsx` | Results layout |
| HomeHighlighted | `HomeHighlighted.tsx` | Highlighted articles on search/home |

### Bristan-specific styling

Component CSS under `src/assets/components/` — notably `hero-banner.css`, `promo.css`, `features.css`, `product-details.css`, `blog.css`, `header.css`, `footer.css`.

### Not in component map

| Area | Path | Wired in |
| ---- | ---- | -------- |
| Demo auth | `demo/*` | `_app.tsx` (`DemoAuthShell`) |
| CDP panel | `cdp-profile-panel/*` | `_app.tsx` |
| Product UI helpers | `non-sitecore/*` | Imported by ProductDetails, Header, etc. |

See `design-screenshots/bristan-com/component-review.json` for the original bristan.com page-to-component mapping (reference capture; does not include blog or newer home sections).

### React component map

Registered SXA components live in `.sitecore/component-map.ts` (generated baseline via CLI, with search widgets merged manually like retail).

```bash
cd industry-verticals/bristan
npm run sitecore-tools:generate-map
```

**Regenerate notes:**

- `sitecore.cli.config.ts` scans `src/components` but **excludes** `content-sdk`, `non-sitecore`, `demo`, and `cdp-profile-panel` folders.
- After generate, re-add **search widget** entries (`PreviewSearch`, `SearchResultsComponent`, etc.) if the CLI removed them — they are imported from `non-sitecore/search/*` but registered for Sitecore Search placeholders.
- **Do not** register app-shell modules in the map: `DemoAuthShell`, `DemoLoginModal`, `CdpProfileShell`, etc. Those are wired in `src/pages/_app.tsx` only.

**Hero Banner variants** (`src/components/hero-banner/HeroBanner.tsx`):

| Headless variant | React export | Use                                                 |
| ---------------- | ------------ | --------------------------------------------------- |
| Default          | `Default`    | Home welcome band + banner below (bristan.com home) |
| TopContent       | `TopContent` | Category pages — title over image                   |

**Promo variants** (`src/components/promo/Promo.tsx`):

| Headless variant | React export | Use |
| ---------------- | ------------ | --- |
| Default | `Default` | Split image + text promos |
| WithFullImage | `WithFullImage` | Full-bleed image promo |
| TopBanner | `TopBanner` | Lifetime guarantee header bar (Header Promo partial) |
| CategoryTile | `CategoryTile` | Single range tile with CTA |
| CenteredCta | `CenteredCta` | Find a stockist band (home) |
| RequestBrochure | `RequestBrochure` | Brochure CTA on PDP / brochure page |
| Lifetime | `Lifetime` | Lifetime guarantee content block |
| WithQuote | `WithQuote` | Quote-style promo |

**Features variants** (highlights): `AudienceTiles` (home gateway), `BrowseRanges` (home range grid), `HelpCards` (homeowners help), `HelpCards` / `Default` / `ImageGrid` for other landings.

**Blog variants:** `ArticleListing` / `ArticleDetails` → **BristanBlog** (single column, load more, no hero).

Styling follows Essential Living / Forma Lux patterns (direct SDK `<Text>`, `<RichText>`, `<Link>` fields). Bristan-specific layout is in `src/assets/components/`.

### Hero Banner datasource checklist

Avoid **`[object Object]`** and empty hero content — see [SITECORE-DATASOURCE-FIELDS.md](./SITECORE-DATASOURCE-FIELDS.md).

| Field | Rule |
| ----- | ---- |
| **CtaLink** (Hero) | Full internal link XML with target item **`id`**. |
| **PromoMoreInfo** (Promo) | Same as CtaLink — full internal link XML with target item **`id`**. |
| **Image** | Use **Content Hub DAM** in CM (pull YAML with `dam-id` + public `src`). Do not serialize hotlinked reference-site URLs (e.g. `banner-1.ashx`). |
| **Publish** | Push serialization **and** publish datasource + page to Edge. |
| **React** | Flat `fields` like retail; Bristan uses `pickField()` + `getValidCtaLink()` for EE / broken links. |

**Verified Home Hero (CH DAM):**  
`authoring/items/bristan/serialized-content/bristan/bristan/Data/Hero Banners/Home Hero.yml`

**Generator:** `generate-bristan-site.mjs` — `ctaLinkXml(text, url, targetPageId)`; assign hero images in CM via DAM after generate (do not rely on external bristan.com URLs).

**Edge check:**

```graphql
item(path: "/sitecore/content/bristan/bristan/Data/Hero Banners/Home Hero", language: "en") {
  field(name: "CtaLink") { jsonValue }
  field(name: "Image") { jsonValue }
}
```

Both must return populated `jsonValue` (not `null` / `{}`) before blaming the React component.

**Search widgets** (`src/constants/search.ts`): shared retail source rfkIds — `formalux_preview_search`, `formalux_search_results`, `formalux_search_home_highlight_articles`.

## Local development

```bash
cd industry-verticals/bristan
cp .env.remote.example .env.local
# Set SITECORE_EDGE_CONTEXT_ID, SITECORE_EDITING_SECRET from Deploy portal
npm install
npm run dev
```

### Search environment variables

Bristan uses the shared Forma Lux search source. Set the search variables listed in [Deployment Guide — Bristan](./DEPLOYMENT-GUIDE.md#bristan) on the **`bristan`** editing host in XM Cloud Deploy and in `.env.local` for local development. Copy **customer key**, **API key**, and **source id** from the [CEC portal](https://sitecore.atlassian.net/wiki/x/ZwAengE) or your team's Deploy portal configuration — do not commit those values to the repo.

To **list or update** deployed values via CLI, see [Deployment Guide — Check and update environment variables (Deploy CLI)](./DEPLOYMENT-GUIDE.md#7-check-and-update-environment-variables-deploy-cli). Resolve the editing host **environment id** from `dotnet sitecore cloud environment list` by matching the host name `bristan`.

## Authoring

Regenerate page content and presentation:

```bash
node authoring/items/bristan/scripts/generate-bristan-site.mjs
```

Deploy to CM (use your **environment nickname** for `-n`, module name for `-i`):

```bash
# One-time: connect CM (use the CM environment id from Deploy portal or `dotnet sitecore cloud environment list`)
dotnet sitecore cloud environment connect --environment-id <cm-environment-id> --allow-write true

# Push only the bristan module
dotnet sitecore serialization push -n SitecoreSilverProd -i bristan
```

`-n` is the nickname from `dotnet sitecore cloud environment connect` (stored in `.sitecore/user.json`), **not** `bristan`. The module namespace is `-i bristan`.

XM Cloud build deploys `Project.IndustryVerticals` and `bristan` together (`xmcloud.build.json`). The bristan module is fully isolated — no overlap with `/sitecore/content/industry-verticals/bristan`.

If the old industry-verticals path exists in CM from a prior deploy, remove or migrate it manually after pushing the new module.

---

## Page Designs and template-to-design mapping

The **Template to design mapping** field on **Presentation → Page Designs** is populated by a Sitecore field-source query (defined on the SXA **Page Designs** template). Forma Lux shows the expected rows (`Page` → `Default`, `ProductPage` → `ProductPage`, etc.). If Bristan shows unrelated system entries (Folder, PowerShell Rule, Script Library, …) or an empty list, the query tokens are not resolving in site context — usually because site shell items still have the wrong template in CM or **Settings** path fields are missing.

> **Canonical reference:** [SITECORE-SITE-SHELL.md](./SITECORE-SITE-SHELL.md) — template map, generator rules, and verification checklist for all isolated sites.

### Field source query

```
query:$templates||query:$pageDesigns//*[@@templatename='Page Design']
```

| Part                              | Meaning                                                                                                                     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `query:`                          | Run a Sitecore query (not a fixed path)                                                                                     |
| `\|\|`                            | **OR** — merge both result sets into one picker list                                                                        |
| `$templates`                      | Resolves to the site **Settings → Templates** path (for Bristan: `/sitecore/templates/Project/bristan`)                     |
| `$pageDesigns`                    | Resolves to the site **Presentation → Page Designs** folder (`/sitecore/content/bristan/bristan/Presentation/Page Designs`) |
| `//`                              | All descendants                                                                                                             |
| `*[@@templatename='Page Design']` | Only items based on the **Page Design** template (Default, ProductPage, ProductCategoryPage, …)                             |

**Left side of `\|\|`** — page templates under the project templates folder (`Page`, `ProductPage`, `ProductCategoryPage`, …).

**Right side** — page design items under the site’s Page Designs folder.

The mapping UI uses the left column for templates and the right column for designs. Both sides depend on site tokens resolving correctly.

### How tokens resolve for Bristan

| Token          | Must point to                                                 | Serialized in repo                                                                                                                  |
| -------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `$templates`   | `/sitecore/templates/Project/bristan`                         | **Settings → Templates** on `/sitecore/content/bristan/bristan/Settings`                                                            |
| `$pageDesigns` | `/sitecore/content/bristan/bristan/Presentation/Page Designs` | **Presentation** folder uses SXA Presentation template; **Page Designs** child uses **Page Designs** branch template (not JSS Data) |

Compare with Forma Lux: **Settings** uses JSS App Settings, **Presentation** uses Presentation Folder, **Page Designs** uses `/sitecore/templates/Project/industry-verticals/Page Designs`.

### Why the dropdown shows the wrong items

Yes — this is directly related to the template inheritance issues on the Bristan site shell.

If **Settings** was still on **JSS Data** (`a29d272e…`) in CM:

- The **Templates**, **RenderingsPath**, **DictionaryPath**, etc. fields do not exist or are empty.
- `$templates` fails to resolve to `/sitecore/templates/Project/bristan` and the query falls back to a very broad templates tree — you see system templates (PowerShell, Folder, Alias, …) instead of **Page**, **ProductPage**, etc.

If **Presentation** or **Page Designs** were on **JSS Data**:

- `$pageDesigns` does not resolve.
- The **Designing** section may not appear correctly; stored mapping GUIDs show **Value not in the selection list**.

Other common causes:

- Serialization fixes not pushed to CM yet (`dotnet sitecore serialization push … -i bristan`).
- Editing the item outside Bristan site context (tokens resolve against the wrong site).
- **TemplatesMapping** value uses wrong template GUIDs or `%26` vs raw `&` encoding (see below).

### Expected mapping after fix

After a successful push, **Presentation → Page Designs → Designing** should allow:

| Page template       | Page design         |
| ------------------- | ------------------- |
| Page                | Default             |
| ProductPage         | ProductPage         |
| ProductCategoryPage | ProductCategoryPage |

Serialized value lives on the Page Designs folder item (`TemplatesMapping` field). Mappings use URL-encoded `{templateGuid}={designGuid}` pairs joined with `%26` (encoded `&`), matching the Forma Lux pattern.

### Verify in Content Editor

1. **Settings** (`/sitecore/content/bristan/bristan/Settings`)
   - Template: **JSS App** (not JSS Data)
   - **Templates** → `/sitecore/templates/Project/bristan`
   - **RenderingsPath** → `/sitecore/layout/Renderings/Project/bristan`
2. **Presentation** — template: **Presentation Folder** (not JSS Data)
3. **Page Designs** — template: **Page Designs** under Project/bristan (not JSS Data)
4. Open **Page Designs** → **Designing** → template dropdown should list **Page**, **ProductPage**, **ProductCategoryPage**; design dropdown should list **Default**, **ProductPage**, **ProductCategoryPage**.

If templates are still wrong in CM after push, confirm `bristan.module.json` allows `CreateUpdateAndDelete` on `/Presentation`, `/Settings`, `/Dictionary`, and `/Media`, then push again.

### Regenerate and push

```bash
node authoring/items/bristan/scripts/generate-bristan-site.mjs
dotnet sitecore serialization validate -i bristan
dotnet sitecore serialization push -n <cm-nickname> -i bristan
```

If push fails with duplicate item on disk, run `dotnet sitecore serialization validate -i bristan -f` (see hash-path note for `ProductCategoryContent` placeholder in the generator script).

## Build troubleshooting

| Symptom | Cause | Fix |
| ------- | ----- | --- |
| Build fails on `/en/_site_lyvera/...` or other non-Bristan paths | Bristan host was pre-rendering all tenant sites from `sites.json` | Ensure `getStaticBuildSiteNames()` is used (see [Rendering host scope](#rendering-host-scope-and-static-build)). Default: `bristan`, `heritage` only. |
| `Placeholder 'headless-header-promo' was not found` (many times) | Layout renders a Bristan-only placeholder on sites without Header Promo partial | Fixed in `Layout.tsx` — placeholder renders only when present in route data. Push Header Promo partial design for bristan/heritage content. |
| `Cannot read properties of undefined (reading 'route')` during SSG | Page returned from Edge without `layout.sitecore.route` (wrong site/components for this host) | Site filter above + `hasRenderableLayout()` returns 404 for invalid layout. |
| Blog article shows only “Here to Help”, no body | `ArticleDetails` missing from page `__Renderings` after CM pull | Run `node authoring/items/bristan/scripts/patch-blog-renderings.mjs`, push, publish. |
| `client_id is required` during `sitecore-tools:build` | Missing OAuth vars for Design Library code extraction on deploy | Set `SITECORE_AUTH_CLIENT_ID` and `SITECORE_AUTH_CLIENT_SECRET` on the **bristan** editing host. See [Deployment Guide — Bristan](./DEPLOYMENT-GUIDE.md#bristan). |
| `Warning: data for page ... exceeds 128 kB` | Large layout JSON in `getStaticProps` props | Informational; build still succeeds. Reduce page complexity or use ISR for heavy routes if needed. |

Local verify:

```bash
cd industry-verticals/bristan
npm run build
# Expect ~98 static pages (bristan + heritage), not 400+ tenant-wide paths
```

---

## App README

[industry-verticals/bristan/README.md](../industry-verticals/bristan/README.md)
