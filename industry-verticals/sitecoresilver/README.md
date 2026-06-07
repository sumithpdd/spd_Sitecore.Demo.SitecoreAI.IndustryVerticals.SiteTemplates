# Sitecore Silver — Copenhagen Celebration (Next.js)

Event microsite for the Copenhagen Silver Celebration, built with Sitecore Content SDK and Next.js.

**Repository:** `spd_Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates` (canonical). XM Cloud editing host **`sitecoresilver`** must build from this repo’s `main` branch.

**Design reference:** [copenhagen-silver.vercel.app](https://copenhagen-silver.vercel.app/)

**Docs:** [docs/COPENHAGEN-SILVER-SITE.md](../../docs/COPENHAGEN-SILVER-SITE.md) (site purpose, sitemap, Capabilities + Promo demos), [docs/SITECORESILVER.md](../../docs/SITECORESILVER.md)

## Quick start

```powershell
cd industry-verticals\sitecoresilver
npm install --legacy-peer-deps
npm run dev
```

Set in `.env.local`:

```
NEXT_PUBLIC_DEFAULT_SITE_NAME=sitecoresilver
```

## SitecoreSilver components

Nine Copenhagen event components under `src/components/sitecoresilver/`. **Full inventory** (fields, placeholders, behavior, Home layout): [docs/COPENHAGEN-SILVER-SITE.md](../../docs/COPENHAGEN-SILVER-SITE.md).

Regenerate the component map after adding components:

```powershell
npm run sitecore-tools:generate-map
```

## Authoring

Serialized items: `authoring/items/sitecoresilver/`. Home page generator:

```powershell
node authoring/items/sitecoresilver/scripts/generate-copenhagen-silver-home.mjs
```
