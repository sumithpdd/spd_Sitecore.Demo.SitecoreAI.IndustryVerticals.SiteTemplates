# Lyvera — Premium Sports, Entertainment & Event Experiences

Based on [lyveragroup.com](https://www.lyveragroup.com/).

Full documentation: [`docs/LYVERA.md`](../../docs/LYVERA.md) — multi-site architecture, **component inventory & sharing**, brand portfolio, setup.

## Components (authoring palette)

Nine **Lyvera** renderings are shared across all sites (same React code + same Sitecore rendering items). Each site has its own datasources, variants, and Home layout.

| Map key | Purpose |
|---------|---------|
| `LyveraHeader` / `LyveraFooter` | Partial design chrome |
| `LyveraBanner` | Hero / full-bleed banner |
| `LyveraPromo` | Split/stacked promos (5 variants) |
| `LyveraOurBrands` + `LyveraBrandLogo` | Brand logo bar (corporate) |
| `LyveraMultiPromoImageSlider` + `LyveraMultiPromoSlide` | Image gallery + copy |
| `LyveraTextBand` | Simple intro band (optional) |

Starter kit components (`Promo`, `Navigation`, `Container`, …) exist in the repo but are **not** in the Sitecore palette — see [redundancies in docs](../../docs/LYVERA.md#redundancies-and-recommendations).

Header and footer are wired via **Partial Designs** on `DefaultPage`. Home layouts differ by site — see [per-site Home usage](../../docs/LYVERA.md#per-site-home-component-usage-generated).

## Local development

```bash
cd industry-verticals/lyvera
cp .env.remote.example .env.local
# Set SITECORE_EDGE_CONTEXT_ID and SITECORE_EDITING_SECRET
npm install
npm run dev
```

Set `NEXT_PUBLIC_DEFAULT_SITE_NAME` to `lyvera` or `events-international`.

## Sitecore paths

| Item | Path |
|------|------|
| Tenant | `/sitecore/content/lyveragroup` |
| Site | `/sitecore/content/lyveragroup/lyvera` |
| Home | `/sitecore/content/lyveragroup/lyvera/Home` |

## Serialization

```bash
node authoring/items/lyveragroup/scripts/generate-lyvera-site.mjs
dotnet sitecore serialization validate --fix -i lyveragroup
dotnet sitecore serialization push -n {YourEnv} -i lyveragroup
```

## Deploy

- **One rendering host** serves all Lyvera Group sites (`lyvera`, `events-international`, …)
- Site grouping `RenderingHost`: **`lyvera`** on every site
- `NEXT_PUBLIC_DEFAULT_SITE_NAME=lyvera` (or `events-international` for brand dev)

## Multi-site collection

| Site | Sitecore path |
|------|---------------|
| Lyvera (corporate) | `/sitecore/content/lyveragroup/lyvera` |
| Events International | `/sitecore/content/lyveragroup/events-international` |

Brand portfolio, personas, journeys, and adding new sites: [`docs/LYVERA.md`](../../docs/LYVERA.md).
