---
name: asos-fashion
description: >-
  ASOS isolated collection — wide-leg jeans under £50, Berlin October edit,
  Content Hub brand 108526. Use when editing industry-verticals/asos,
  authoring/items/asos, or docs/ASOS.md.
---

# ASOS

Full notes: [`docs/ASOS.md`](../../../docs/ASOS.md). Inventory (page, component, media): [`docs/ASOS-INVENTORY.md`](../../../docs/ASOS-INVENTORY.md). Playbook: [`isolated-collection-site`](../sitecore-serialization-skills/isolated-collection-site/SKILL.md).

| | Value |
|--|--|
| Host | `industry-verticals/asos` (Pages Router) |
| Module | `asos-scs` |
| Paths | `/sitecore/content/asos` → `/sitecore/content/asos/asos` |
| GUID prefix | Journey pages `a50c` |
| CH brand | **108526** Asos on starter-verticals-2 |

## Hard rules

- Do **not** invent extra people profiles. Emma is story-only.
- Never hotlink asos.com. DAM `src` + `dam-id` on Image fields after upload.
- Never commit Content Hub env.
- Keep helpers in `src/lib/`. Every `.tsx` under `src/components/` is registered by `sitecore-tools:generate-map`.
- Pages stay `/women`, `/men`, `/account`, `/my-edit`, `/saved-items`. Products are `/products/{slug}` (one ProductPage under Home/Products). Category and edit pages are the listing item (`/women/denim`, `/edits/{slug}`), not a `/cat` child. Taxonomy lives in Data, not beside Home.
- Do not re-run collection or site generators. The one-shot writers (`generate-asos-pages`, `serialize-asos-ia`, `serialize-asos-denim`, `cleanup-asos-tree`, `flatten-asos-pages`, `write-asos-presentation`) are removed. Serialized YAML is the source of truth.

## Journey

Arrive `/` → `/women` → denim edit (`cid=88011`, wide-leg jeans under £50) → mid-wash PDP `8805001` → Style Feed → My Edit **Berlin, October** (jean, knit, boot).

## Maps

- Component map: `industry-verticals/asos/.sitecore/component-map.ts`. Run `npm run sitecore-tools:generate-map` in `industry-verticals/asos` after adding a component. `SharedBoard` is registered and rendered by the catch-all, not a Pages rendering.
- Page map: `authoring/items/asos/scripts/media-maps/asos-page-map.csv` (`Route`, `SitecorePath`, `Title`, `YamlFile`). Full lookup: `asos-item-index.csv`. Refresh with `node authoring/items/asos/scripts/write-asos-maps.mjs`.
- DAM stills and wordmarks: `content-hub-asset-registry.csv`, `Asos-image-xml.json`, `src/lib/dam-registry.ts` (brand **108526**)
- Content Hub env: copy `authoring/items/brother/scripts/set-ch-env.example.ps1` to OneDrive. Never commit secrets.
- Header wordmark: `DAM['asos-logo-white.png']` (asset 109876). Local fallback `public/asos/logo-white.png`
- Page designs: Default, Product, ProductPage, ProductListing — each chains Header + Footer. Listing pages use template ProductListing; PDP items use ProductPage.
- Category listings expose Title, Intro, CategoryId, and Products (Treelist of ProductPage items under Home/Products). The CategoryListing rendering uses the listing page as its datasource. A filled Products field is the grid; an empty one keeps the category catalogue. Intro replaces the denim and Topshop fallback lines. The denim drop selects the jean `8805001`, knit `8805013`, and boot `8805014`.
- `GlobalBanner` is the first rendering on Home `headless-main` (rendering `…000009`), not the header. `Default` follows visit intent: a return visit shows the welcome-back offer, sale intent shows under £10, home shows the Berlin denim offer, other pages show NEWHERE. CDP affinity (brand, fit, category) changes the WOMEN link when the CMS href is empty. Pin `NewHere`, `Home`, `Product`, `Sale`, or `Returning` in Pages to override the offer. Datasource fields Message, Terms, WomenLabel, MenLabel, WomenHref, MenHref replace the variant copy when filled.
- Home is `GlobalBanner`, then `HomeBanner` (women/men split, `…000015`), `Edit` (`…000016`), and `NewIn` (`…000017`) in `headless-main`.
- `Subscribe` (`…000024`) sits on the Footer partial above the link columns. Datasource `Data/HomeComponents/Subscribe`: Image, Heading, Placeholder, ButtonLabel, PreferenceLabel, Terms, SuccessMessage. The logo is the Content Hub wordmark. Do not hotlink asos.com.
- `StyleFeed` (`…000008`) is the homepage story row. Datasource `Data/HomeComponents/StyleFeed` (heading, intro, read label, four cards). Each card opens an `Article` (`…000025`) under `/style-feed/{slug}`, edited at `Data/Articles`. Copy is original. Images are Content Hub stills.
- PDP rails (`YouMightAlsoLike`, `BuyTheLook`, `PeopleAlsoBought`, `RecentlyViewed`, `YourStyle`) are composed by `ProductPage` and are also renderings. Product page fields PayCopy, PromoCopy, SizeFit, Details, Composition, BrandStory, DeliveryCopy are editable on the product. Rail datasource `ProductRail` has Heading, Intro, Intent (`similar`, `outfit`, `cobought`, `recent`, `style`), and ProductIds. Empty ProductIds means the rail ranks the catalogue from CDP affinity. The CDP panel shows intent plus top brand, category, and fit.
- Search: `HeaderSearch` (`src/lib`) and `SiteSearch` on `/search`. Both autocomplete “wide-leg jeans”. `q=denim` lists denim product cards. Facets use `refine`, `pricerange`, and `iscurated`. `AiChatbot` and `CdpProfileShell` mount from `_app.tsx`.
- Fit: `/account` writes a session profile (`src/lib/asos-profile.ts`). Listings, search, shared boards, and the PDP size use it.
- Women's denim trend: `/women/denim` (CategoryId 17014). Product pages are `Home/Products/{slug}` (GUID prefix `a50c0004`, except Belle Paris `a50c0002-…0024` and Weekday `a50c0002-…0042`). ProductPage fields Title, Brand, Price, Colour, Image, Video, ProductId, Categories, plus PayCopy, PromoCopy, SizeFit, Details, Composition, BrandStory, DeliveryCopy. Image fields use Content Hub `src` + `dam-id` (brand **108526**). Do not point them at `public/asos/products/live/` or `public/asos/editorial/`. One Content Hub photo per product. Story products `8805001`, `8805013`, `8805014`, `200415553`, and `211674477` are ProductPage items. The Product page design includes the ProductContent partial, which places the ProductPage rendering on every product. Item layouts stay empty so the body is not rendered twice.
- Homepage datasources live in `Data/HomeComponents`: GlobalBanner, HomeBanner, Edit, NewIn. Home renderings point at them with `s:ds`. NewIn `ProductIds` is a pipe-separated list of product ids. Filling GlobalBanner Message replaces the variant offer line.
- Data, not a second site tree: `Data/Categories` is the taxonomy. Catalogue, Sites (Topshop), Shared, and Signals sit under Data.
- Long YAML paths live in hash folders. After moving items, run `dotnet sitecore serialization validate --fix -i asos-scs` before push. Do not invent hash names.
