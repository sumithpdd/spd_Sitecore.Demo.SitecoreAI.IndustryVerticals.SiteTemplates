# Lyvera — setup and components

**Lyvera** is the corporate umbrella site for [Lyvera Group](https://www.lyveragroup.com/) under the `lyveragroup` tenant. It follows the same headless variant patterns as [Versele](../SE9/docs/VERSELE.md) in the SE9 repo.

| | Value |
|---|--------|
| **Rendering host** | `industry-verticals/lyvera` |
| **Module** | `authoring/items/lyveragroup.module.json` |
| **Build key** | `lyvera` in `xmcloud.build.json` |
| **Site** | `/sitecore/content/lyveragroup/lyvera` |
| **Live reference** | https://www.lyveragroup.com/ |

---

## Component map contract

| Rule | Detail |
|------|--------|
| Map key | TSX filename without extension (`LyveraBanner.tsx` → `LyveraBanner`) |
| Sitecore `componentName` | Must match map key exactly |
| Variants | Named exports (`Default`, `BackgroundText`, …) |
| Headless Variants | Item name under `Presentation/Headless Variants/{Component}/` must match export name |
| Styles | `params.styles` — space-separated CSS classes from **Presentation → Styles** |

Regenerate after component changes:

```bash
cd industry-verticals/lyvera
npm run sitecore-tools:generate-map
npm run lint
```

---

## Components and variants

### LyveraBanner (HomePageBanner)

Full-bleed hero / banner sections.

| Headless variant | Export | Layout |
|------------------|--------|--------|
| Default | `Default` | Video/image hero, centred title, coral CTA |
| BackgroundText | `BackgroundText` | Image + teal overlay, centred title and body, tricolor top bar, no CTA |

**Fields:** `Title`, `Description`, `BackgroundImage`, `BackgroundVideo`, `CtaLink`

**Styles:** `lyvera-banner-tricolor` — purple / blue / coral bar on BackgroundText variant

### LyveraPromo

Split and stacked promo blocks.

| Headless variant | Export | Layout |
|------------------|--------|--------|
| Default | `Default` | Text left, image right, white background |
| ImageLeftColor | `ImageLeftColor` | Image left, text right, coral background + accent brackets |
| ImageRightColor | `ImageRightColor` | Text left, image right, teal background |
| Stacked | `Stacked` | Text above full-width image |
| StackedColor | `StackedColor` | Teal quote block with portrait below |

**Fields:** `Title`, `Description`, `Image`, `CtaLink`

**Styles (optional overrides):** `lyvera-bg-teal`, `lyvera-bg-coral`, `lyvera-bg-mint`

### LyveraOurBrands

Brand logo bar inspired by the live site carousel strip.

| Headless variant | Export | Layout |
|------------------|--------|--------|
| Default | `Default` | Horizontal scrolling logo strip on dark teal |
| Grid | `Grid` | Static responsive grid |

**Fields:** `SectionTitle` (optional, screen-reader on Default)

**Child placeholder:** `lyvera-brand-logos-{DynamicPlaceholderId}` → **LyveraBrandLogo**

### LyveraBrandLogo

Child slide for Our Brands.

**Fields:** `Title`, `LogoImage`, `BrandLink`

Mark slide root with `data-lyvera-brand-slide` (handled in component).

### LyveraMultiPromoImageSlider

Portfolio section with image gallery + promo copy (desktop side-by-side, mobile stacked).

| Headless variant | Export | Layout |
|------------------|--------|--------|
| Default | `Default` | Gallery left, copy right (desktop) |
| Stacked | `Stacked` | Copy above gallery (mobile-first emphasis) |

**Fields:** `Title`, `Description`, `CtaLink`

**Child placeholder:** `lyvera-multi-promo-slides-{DynamicPlaceholderId}` → **LyveraMultiPromoSlide**

### LyveraMultiPromoSlide

**Fields:** `Image`, `AltText`

---

## Homepage wiring (generated)

`Home.yml` includes (in order):

1. LyveraBanner — Default (hero)
2. LyveraPromo — ImageRightColor (Who we are)
3. LyveraOurBrands — Default
4. LyveraMultiPromoImageSlider — Default
5. LyveraPromo — ImageLeftColor (What we do)
6. LyveraPromo — Default (How we do it)
7. LyveraBanner — BackgroundText (Why we do it)
8. LyveraPromo — StackedColor (CEO quote)

Header/footer remain on **Partial Designs** (`DefaultPage`).

---

## Serialization

```bash
node authoring/items/lyveragroup/scripts/generate-lyvera-site.mjs
cd authoring
dotnet sitecore serialization validate --fix -i lyveragroup
dotnet sitecore serialization push -n {YourEnv} -i lyveragroup
```

---

## Local development

```bash
cd industry-verticals/lyvera
cp .env.remote.example .env.local
npm install
npm run dev
```

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_DEFAULT_SITE_NAME` | `lyvera` |
| `SITECORE_EDGE_CONTEXT_ID` | From Deploy portal |

---

## Future sibling sites

Under `/sitecore/content/lyveragroup/`:

- `keithprowse`
- `GulliversSportsTravel`
- `events-international`

Each will share tenant renderings/templates and use its own site root + rendering host when added.
