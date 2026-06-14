# Lyvera — Premium Sports, Entertainment & Event Experiences
# Based on https://www.lyveragroup.com/

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
| `LyveraHeader` | Utility bar + main nav (Our brands dropdown, Blog, Contact) — web & mobile |
| `LyveraFooter` | Brand block, social, brand links, legal |
| `LyveraTextBand` | Intro / content bands (e.g. brand unification story on Home) |

Header and footer are wired via **Partial Designs** on `DefaultPage`. Home currently includes a **LyveraTextBand** with the Lyvera brand story.

## Serialization

```bash
node authoring/items/lyveragroup/scripts/generate-lyvera-site.mjs
dotnet sitecore serialization push -n {YourEnv} -i lyveragroup
```

## Deploy

- Rendering host key in `xmcloud.build.json`: **`lyvera`**
- Site grouping `RenderingHost`: **`lyvera`**
- `NEXT_PUBLIC_DEFAULT_SITE_NAME=lyvera`

## Future sites (same tenant)

Planned sibling sites under `/sitecore/content/lyveragroup/`:

- `keithprowse`
- `GulliversSportsTravel`
- `events-international`
