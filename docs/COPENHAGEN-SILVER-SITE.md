# Copenhagen Silver Celebration — SitecoreSilver site

Event microsite styled from [copenhagen-silver.vercel.app](https://copenhagen-silver.vercel.app/) and [Sitecore Silver Celebration (Copenhagen)](https://www.sitecore.com/resources/events-webinars/2026/05/sitecore-silver-celebration-copenhagen).

| Item | Value |
|------|--------|
| Next.js app | `industry-verticals/sitecoresilver/` |
| Site name (`NEXT_PUBLIC_DEFAULT_SITE_NAME`) | `sitecoresilver` |
| Content root | `/sitecore/content/sitecoresilver/sitecoresilver` |
| Serialization module | `authoring/items/sitecoresilver.module.json` |
| Templates folder | `/sitecore/templates/Project/sitecoresilver/SilverCelebration/` |
| Renderings folder | `/sitecore/layout/Renderings/Project/sitecoresilver/SilverCelebration/` |
| Styling | `src/assets/sitecoresilver-copenhagen.css` (imported from `main.css`) |
| Layout wrapper | `sitecoresilver-page` on root div in `Layout.tsx` |

---

## Page layout (Home)

`Layout.tsx` exposes three route placeholders. The serialized **Home** page wires Copenhagen components as follows:

```text
sitecoresilver-page
├── headless-header
│   └── SitecoreSilverEventHeader  (+ optional LinkList children in nav placeholder)
├── headless-main
│   ├── SitecoreSilverIntroBanner
│   ├── SitecoreSilverEventHero
│   ├── SitecoreSilverPromoFullWidth
│   ├── SitecoreSilverPromoBadgeGrid
│   │   ├── SitecoreSilverPromoBadge  (×3)
│   │   └── …
│   ├── SitecoreSilverRichText      (variant: GlassPanel)
│   └── SitecoreSilverPromoImageCta
└── headless-footer
    └── SitecoreSilverFooter
```

**Datasource items** (under `/sitecore/content/sitecoresilver/sitecoresilver/Data/`):

| Content item | Component | Template |
|--------------|-----------|----------|
| Intro Banner | Intro | SitecoreSilverIntroBanner |
| Default Header | Event header | SitecoreSilverEventHeader |
| Event Hero | Hero | SitecoreSilverEventHero |
| Platform Promo | Promo band | SitecoreSilverPromoFullWidth |
| Promo CMS / RAG / Data | Badge cards | SitecoreSilverPromoBadge |
| Quote Panel | Rich text | SitecoreSilverRichText |
| Tivoli Promo | Image CTA | SitecoreSilverPromoImageCta |
| Default Footer | Footer | SitecoreSilverFooter |

Regenerate layout + items: `node authoring/items/sitecoresilver/scripts/generate-copenhagen-silver-home.mjs`

---

## Component inventory (summary)

| Map key | Variant(s) | Placeholder | Has children | Client component |
|---------|------------|-------------|--------------|------------------|
| `SitecoreSilverIntroBanner` | `Default` | `headless-main` | No | No |
| `SitecoreSilverEventHeader` | `Default` | `headless-header` | Yes — `sitecoresilver-header-nav-{*}` | Yes |
| `SitecoreSilverEventHero` | `Default` | `headless-main` | No | No |
| `SitecoreSilverPromoFullWidth` | `Default` | `headless-main` | No | No |
| `SitecoreSilverPromoBadgeGrid` | `Default` | `headless-main` | Yes — `sitecoresilver-promo-badges-{*}` | No |
| `SitecoreSilverPromoBadge` | `Default` | Nested under grid | No | No |
| `SitecoreSilverRichText` | `Default`, **`GlassPanel`** | `headless-main` | No | No |
| `SitecoreSilverPromoImageCta` | `Default` | `headless-main` | No | No |
| `SitecoreSilverFooter` | `Default` | `headless-footer` | No | No |

**Allowed child renderings (placeholder settings):**

| Placeholder key | Allowed control |
|-----------------|-----------------|
| `sitecoresilver-header-nav` | `LinkList` (`4956263D-1195-4D6E-931B-800EA625FF6F`) |
| `sitecoresilver-promo-badges` | `SitecoreSilverPromoBadge` only |

On Home, the grid uses `DynamicPlaceholderId=1` → children render in `/headless-main/sitecoresilver-promo-badges-1`.

---

## SitecoreSilver components (behavior)

All implementations live under `src/components/sitecoresilver/`. Field helpers: `src/lib/sitecoresilver-field-utils.ts`. Demo copy when fields are empty: `src/lib/sitecoresilver-copenhagen-defaults.ts`.

### SitecoreSilverIntroBanner

| | |
|--|--|
| **Purpose** | Top “intro” band: large logo, silver gradient title, event meta line (matches reference `.intro` section). |
| **TSX** | `SitecoreSilverIntroBanner.tsx` — export `Default` only |
| **Visual** | Dark textured background (`.sitecoresilver-texture`), decorative “25” watermark, glow, horizontal rule, `.silver-text` gradient on subtitle/title |
| **Datasource template** | `…/SilverCelebration/SitecoreSilverIntroBanner/SitecoreSilverIntroBanner` |

**Fields**

| Field | Type | Behavior |
|-------|------|----------|
| Logo | Image | Optional; falls back to Sitecore logo CDN URL |
| Watermark | Single-Line Text | Large background number; default `25` |
| Subtitle | Single-Line Text | Silver gradient line above title |
| Title | Single-Line Text | Main H1; default “Silver Celebration” |
| MetaLine1–3 | Single-Line Text | Shown as `line1 · line2 · line3`; each has a default from `INTRO_DEFAULTS` |

**Editing:** Empty text fields show defaults in the browser (not only in Experience Editor). Uses `<Text>` for authored content when present.

---

### SitecoreSilverEventHeader

| | |
|--|--|
| **Purpose** | Sticky site header: logo links to `/`, horizontal nav from placeholder. |
| **TSX** | `SitecoreSilverEventHeader.tsx` — `'use client'`, export `Default` |
| **Placeholder** | `sitecoresilver-header-nav-{DynamicPlaceholderId}` (default `1`) |
| **Visual** | Fixed/sticky `.ss-header`, compact logo, muted nav links with hover brighten |

**Fields**

| Field | Type | Behavior |
|-------|------|----------|
| Logo | Image | Optional; same Sitecore logo fallback as intro |

**Children:** Authors add **LinkList** (or other allowed controls) in the nav placeholder. Typical links: Create Photo, Gallery, Platform, Event details (`NAV_DEFAULTS` in code documents intended labels).

**Editing:** Placeholder renders in Pages/EE; header itself is a single datasource (e.g. `Data/Default Header`).

---

### SitecoreSilverEventHero

| | |
|--|--|
| **Purpose** | Main hero: three pills, large “Silver” title, subtitle, meta, description, primary/secondary CTAs. |
| **TSX** | `SitecoreSilverEventHero.tsx` — export `Default` |
| **Visual** | `.ss-hero` with pill chips, silver title, `.ss-btn-primary` (red) and `.ss-btn-secondary` (outline) |

**Fields**

| Field | Type | Behavior |
|-------|------|----------|
| Pill1–3 | Single-Line Text | Rendered as `.ss-pill` chips; defaults from `HERO_DEFAULTS.pills` |
| Title | Single-Line Text | H2 with silver gradient |
| Subtitle | Single-Line Text | Below title |
| Meta | Single-Line Text | Event location/date line |
| Description | Multi-Line Text | Body paragraph under meta |
| PrimaryCta | General Link | `Link` → `href` + `text`; default “Create Photo” → `#booth` |
| SecondaryCta | General Link | Default “View Gallery” → `#gallery` |

**Behavior:** Missing link href becomes `#`. CTA labels use link text or fallback strings.

---

### SitecoreSilverPromoFullWidth

| | |
|--|--|
| **Purpose** | Full-width “platform” band — eyebrow, headline, rich body (three engines messaging). |
| **TSX** | `SitecoreSilverPromoFullWidth.tsx` — export `Default` |
| **Visual** | `.ss-promo-band` centered typography on textured background |

**Fields**

| Field | Type | Behavior |
|-------|------|----------|
| Eyebrow | Single-Line Text | Small label above title |
| Title | Single-Line Text | H2 |
| Body | Rich Text | HTML via `dangerouslySetInnerHTML`; default includes `<strong>SitecoreAI</strong>` |

---

### SitecoreSilverPromoBadgeGrid

| | |
|--|--|
| **Purpose** | Parent layout for three (or more) promo cards in a responsive grid. |
| **TSX** | `SitecoreSilverPromoBadgeGrid.tsx` — export `Default` only; **no datasource fields** |
| **Placeholder** | `sitecoresilver-promo-badges-{DynamicPlaceholderId}` |
| **Visual** | `.ss-promo-grid` — CSS grid, textured section |

**Behavior:** Does not render its own copy. Authors nest **SitecoreSilverPromoBadge** renderings as children. On Home, three badges share placeholder suffix `-1`.

**CM:** Add grid to page → set `DynamicPlaceholderId` if multiple grids on one page → drop badges inside.

---

### SitecoreSilverPromoBadge

| | |
|--|--|
| **Purpose** | Numbered product/engine promo card (used three times on Home). |
| **TSX** | `SitecoreSilverPromoBadge.tsx` — export `Default` |
| **Visual** | `.ss-promo-card` with circular `.ss-promo-badge` number, title, tagline, body |

**Fields**

| Field | Type | Behavior |
|-------|------|----------|
| BadgeNumber | Single-Line Text | Shown in badge circle; defaults to `1` if empty |
| Title | Single-Line Text | H3 |
| Tagline | Single-Line Text | Short line under title |
| Body | Multi-Line Text | Supporting copy |

**Behavior:** No fallbacks for title/tagline/body in TSX — empty fields render empty unless datasource is populated (serialized Home items include sample copy). Reference defaults exist in `PROMO_BADGES_DEFAULTS` for documentation only.

---

### SitecoreSilverRichText

| | |
|--|--|
| **Purpose** | Rich text block; Copenhagen home uses **GlassPanel** variant for quote panel. |
| **TSX** | `SitecoreSilverRichText.tsx` |
| **Headless variants** | `Default`, **`GlassPanel`** (serialized under `Presentation/Headless Variants/SitecoreSilverRichText/`) |

**Variant: Default**

- Standard Content SDK rich text wrapper (`.rich-text` / `.component-content`).
- Field: `Text` (Rich Text) via `<ContentSdkRichText>`.
- Use on generic pages without Copenhagen glass styling.

**Variant: GlassPanel** (Home)

| Field | Type | Behavior |
|-------|------|----------|
| Eyebrow | Single-Line Text | Small caps line; default “Create · Understand · Decide” |
| Text | Rich Text | Panel body HTML; plain-text fallback string if empty |

**Visual:** `.ss-rich-glass` → frosted `.ss-rich-glass-panel` with texture.

**CM:** On rendering parameters, set `FieldNames=GlassPanel` (serialized on Home) so the correct export is resolved.

---

### SitecoreSilverPromoImageCta

| | |
|--|--|
| **Purpose** | Split card: optional background image + bottom bar with location copy and red CTA (Tivoli / event details). |
| **TSX** | `SitecoreSilverPromoImageCta.tsx` — export `Default` |
| **Visual** | `.ss-promo-cta-card`, image area `.ss-promo-cta-media`, bar with MapPin + Calendar icons |

**Fields**

| Field | Type | Behavior |
|-------|------|----------|
| BackgroundImage | Image | `background-image` on media div; hidden if no src |
| Text | Multi-Line Text | Location/story copy beside pin icon |
| CtaLink | General Link | Red `.ss-btn-cta`, opens in **new tab** (`target="_blank"`) |

**Defaults:** Tivoli celebration copy + “Event details” → Sitecore event URL.

---

### SitecoreSilverFooter

| | |
|--|--|
| **Purpose** | Site footer: celebration title, meta line, legal line with Privacy/Admin links. |
| **TSX** | `SitecoreSilverFooter.tsx` — export `Default` |
| **Visual** | `.ss-footer` centered stack on textured background |

**Fields**

| Field | Type | Behavior |
|-------|------|----------|
| Title | Single-Line Text | Footer heading |
| Meta | Single-Line Text | Event meta line |
| LegalLine | Single-Line Text | If empty, hard-coded fallback: © 2026, Privacy (`/privacy`), Admin (`/admin`) |

---

## Shared starter components (industry vertical kit)

The rendering host still registers **Forma Lux / industry-verticals** components for reuse on other pages or in Experience Editor. They are **not** used on the serialized Copenhagen Home layout. Many of these align with [out-of-the-box XM Cloud Pages components](./COMPONENTS.md#out-of-the-box-components-in-sitecore-ai-pages) (Image, LinkList, Navigation, RichText, Container, and so on).

| Category | Map keys | Typical use |
|----------|----------|-------------|
| Layout | `Container`, `RowSplitter`, `ColumnSplitter`, `SectionWrapper`, `PartialDesignDynamicPlaceholder` | Composing additional pages |
| Navigation / chrome | `Header`, `Footer`, `Navigation`, `LinkList`, `Breadcrumb`, `LanguageSwitcher` | Alternative headers/footers (not Copenhagen variants) |
| Content | `RichText`, `Promo`, `Image`, `ContentBlock`, `Title`, `PageContent`, `Features` | Generic content pages |
| Articles | `ArticleListing`, `ArticleDetails`, `ArticleCarousel` | Editorial |
| Commerce | `ProductListing`, `ProductDetails`, `AllProductsCarousel`, `SelectedProducts`, `Offers` | Retail demos |
| Other | `ContactForm`, `Subscribe`, `Reviews`, `SocialFollow`, `SocialFeed`, `CdpProfilePanel`, `HeroBanner` | Utilities / demos |

Copenhagen-specific work should use **`SitecoreSilver*`** components only so styling stays on the dark silver theme.

---

## Authoring checklist

1. **Push serialization** (renderings + Available Renderings + placeholder settings must be in CM):
   ```powershell
   dotnet sitecore cloud login
   dotnet sitecore cloud environment connect --environment-id 5Cph5EjHd57eURM3odbI7c --allow-write
   dotnet sitecore serialization push -n SitecoreSilverProd -i sitecoresilver
   ```
2. **Publish** — Presentation + Layout + templates under `/sitecore/templates/Project/sitecoresilver` and renderings under `/sitecore/layout/Renderings/Project/sitecoresilver`.
3. **Available Renderings** — Content Editor → `/sitecore/content/sitecoresilver/sitecoresilver/Presentation/Available Renderings/SitecoreSilver` → **Renderings** field must list all nine Json renderings (not empty).
4. **Placeholder settings** — Under `Presentation/Placeholder Settings/`: `headless-main`, `headless-header`, `headless-footer` must include **SitecoreSilver** in Allowed Controls (Pages toolbox).
5. **Header nav** — Open `SitecoreSilverEventHeader` → add **LinkList** under `sitecoresilver-header-nav-1`.
6. **Badge grid** — Add `SitecoreSilverPromoBadgeGrid` with `DynamicPlaceholderId=1` → three `SitecoreSilverPromoBadge` children.
7. **Rich text** — Select **GlassPanel** variant (`FieldNames=GlassPanel`); Headless Variants → `SitecoreSilverRichText`.

### Troubleshooting: components not visible in Pages / EE

| Symptom | Cause | Fix |
|---------|--------|-----|
| Empty **SitecoreSilver** group in Available Renderings | Wrong field ID on push (fixed in repo) | Re-push; verify **Renderings** field on `Available Renderings/SitecoreSilver` |
| Renderings exist in Layout but not in Pages toolbox | Missing placeholder settings for `headless-main` | Push new `Placeholder Settings/headless-main.yml` (includes SitecoreSilver group) |
| Push failed on GUIDs | Invalid `ss` prefixes in YAML | Use `b574dcc` / `b50100` IDs (already fixed) |
| Components in CM Layout tree only | Looking under wrong path | Json renderings: `/sitecore/layout/Renderings/Project/sitecoresilver/SilverCelebration/` |
| Site not using sitecoresilver host | Wrong site / rendering host | Site Grouping → **Predefined application editing host** = `sitecoresilver` (not `Default`) |
| “Editing host is not set properly” | Host not deployed or not mapped | [SITECORESILVER.md § Troubleshooting](./SITECORESILVER.md#troubleshooting-editing-host-is-not-set-properly) |
| Orange blocks: “missing React implementation” | Pages using **Default** / `demosite` host | Map site to `sitecoresilver` host; redeploy editing host after `npm run build` |

Regenerate YAML after script changes: `node authoring/items/sitecoresilver/scripts/generate-copenhagen-silver-home.mjs`

---

## Regenerate serialization

```powershell
node authoring/items/sitecoresilver/scripts/generate-copenhagen-silver-home.mjs
dotnet sitecore cloud login
dotnet sitecore cloud environment connect --environment-id 5Cph5EjHd57eURM3odbI7c --allow-write
dotnet sitecore serialization validate --fix
dotnet sitecore serialization push -n SitecoreSilverProd
```

See [SITECORESILVER.md](./SITECORESILVER.md) for pull, editing host setup (with screenshots), and env configuration.

## Regenerate component map

```powershell
cd industry-verticals/sitecoresilver
npm run sitecore-tools:generate-map
npm run sitecore-tools:build
```

After adding a new export in TSX, add matching **Headless Variant** items in CM and run `generate-map`.
