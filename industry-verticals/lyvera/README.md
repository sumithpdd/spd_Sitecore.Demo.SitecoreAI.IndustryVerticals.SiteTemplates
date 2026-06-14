# Lyvera — Premium Sports, Entertainment & Event Experiences

Based on [lyveragroup.com](https://www.lyveragroup.com/).

Full component and variant documentation: [`docs/LYVERA.md`](../../docs/LYVERA.md)

## Local development

```bash
cd industry-verticals/lyvera
cp .env.remote.example .env.local
# Set SITECORE_EDGE_CONTEXT_ID and SITECORE_EDITING_SECRET
npm install
npm run dev
```

## Sitecore paths

| Item | Path |
|------|------|
| Tenant | `/sitecore/content/lyveragroup` |
| Site | `/sitecore/content/lyveragroup/lyvera` |
| Home | `/sitecore/content/lyveragroup/lyvera/Home` |

## Components

| Map key | Role |
|---------|------|
| `LyveraHeader` | Utility bar + main nav (Our brands dropdown, Blog, Contact) |
| `LyveraFooter` | Brand block, social, brand links, legal |
| `LyveraTextBand` | Intro / content bands |
| `LyveraBanner` | Hero and full-bleed banners (`Default`, `BackgroundText`) |
| `LyveraPromo` | Split/stacked promos (`Default`, `ImageLeftColor`, `ImageRightColor`, `Stacked`, `StackedColor`) |
| `LyveraOurBrands` | Brand logo carousel/grid (`Default`, `Grid`) |
| `LyveraBrandLogo` | Child brand logo slide |
| `LyveraMultiPromoImageSlider` | Portfolio image slider + copy (`Default`, `Stacked`) |
| `LyveraMultiPromoSlide` | Child gallery slide |

Header and footer are wired via **Partial Designs** on `DefaultPage`. Home includes banner, promos, brand bar, and portfolio slider — see `docs/LYVERA.md` for the full page map.

## Serialization

```bash
node authoring/items/lyveragroup/scripts/generate-lyvera-site.mjs
dotnet sitecore serialization push -n {YourEnv} -i lyveragroup
```

## Deploy

- Rendering host key in `xmcloud.build.json`: **`lyvera`**
- Site grouping `RenderingHost`: **`lyvera`**
- `NEXT_PUBLIC_DEFAULT_SITE_NAME=lyvera`
