# Bristan demo site

UK taps and showers demo inspired by [bristan.com](https://www.bristan.com/). Uses **Marley-style full isolation**: own Sitecore collection, templates, renderings, and media — while reusing **industry-verticals** datasource templates and the same React component names as Forma Lux / retail.

| | Value |
|---|--------|
| **Reference site** | [bristan.com](https://www.bristan.com/) |
| **Rendering host** | `bristan` → `industry-verticals/bristan` |
| **Build key** | `bristan` in `xmcloud.build.json` |
| **Site name** | `bristan` |
| **Collection path** | `/sitecore/content/bristan` |
| **Site content path** | `/sitecore/content/bristan/bristan` |
| **Module** | `authoring/items/bristan/bristan.module.json` |
| **Design captures** | `design-screenshots/bristan-com/` |
| **Component manifest** | `design-screenshots/bristan-com/component-review.json` |

### Isolation layout (same pattern as Marley)

| Sitecore area | Path |
|---------------|------|
| Collection | `/sitecore/content/bristan` |
| Site | `/sitecore/content/bristan/bristan` |
| Templates | `/sitecore/templates/Project/bristan` |
| Branches | `/sitecore/templates/Branches/Project/bristan` |
| Renderings | `/sitecore/layout/Renderings/Project/bristan` |
| Placeholder settings | `/sitecore/layout/Placeholder Settings/Project/bristan` |
| Project settings | `/sitecore/system/Settings/Project/bristan` |
| Media library | `/sitecore/media library/Project/bristan` |

Datasource templates still reference **Project/industry-verticals** (Hero, Promo, Footer, etc.). Renderings under **Project/bristan** use unique IDs (`b8030070-*`) but the same `componentName` values as the shared verticals set.

---

## Design reference (captured from bristan.com)

Desktop screenshots below were captured with Playwright (`url-screenshots` skill). Full set (desktop / tablet / mobile, clean + overlay) lives under `design-screenshots/bristan-com/`.

### Home

![Bristan.com home — desktop reference](./images/bristan/home-desktop.png)

*Route: `/` — audience gateway, lifetime guarantee promo, hero carousel*

### Homeowners

![Bristan homeowners landing](./images/bristan/homeowners-home-desktop.png)

*Route: `/homeowners-home` — inspiration carousel, lifetime guarantee, stockist CTA*

### Showers

![Bristan showers category](./images/bristan/showers-desktop.png)

*Route: `/showers` — shower packs, mini valve, bar showers, recessed ranges*

### Bathroom taps

![Bristan bathroom taps category](./images/bristan/bathroom-taps-desktop.png)

*Route: `/bathroom-taps` — one-hole / two-hole / wall-mounted, finishes, Eco Start*

### Installers

![Bristan installers landing](./images/bristan/installers-home-desktop.png)

*Route: `/installers-home` — On Tap community, lifetime guarantee, essentials range*

### Product listing

![Bristan bathroom taps product filters](./images/bristan/products-bathroom-taps-desktop.png)

*Route: `/products/bathroom-taps` — filter sidebar + product grid*

### Merchants

![Bristan merchants landing](./images/bristan/merchants-home-desktop.png)

*Route: `/merchants-home` — merchant portal, brochures, stockist network*

### Specifiers

![Bristan specifiers landing](./images/bristan/specifiers-home-desktop.png)

*Route: `/specifiers-home` — sector tiles (healthcare, new build, affordable housing, care homes)*

### Brochures

![Bristan order a brochure](./images/bristan/order-a-brochure-desktop.png)

*Route: `/order-a-brochure` — downloadable brochure list*

### Design tokens (from capture)

| Token | Value |
|-------|--------|
| Primary navy | `#003058` |
| Secondary | `#17243d` |
| Accent / gradient end | `#7aa7be` |
| Typography | Gotham Book / Medium / Bold |
| Neutrals | `#ffffff`, `#898989`, `#000000` |

Re-capture:

```bash
node .cursor/skills/mimic-website-skills/url-screenshots/scripts/capture.mjs \
  --file design-screenshots/bristan-com/capture-urls.txt \
  --out design-screenshots/bristan-com --manifest
```

---

## Site connection

| Setting | Value |
|--------|--------|
| Site name | `bristan` |
| Rendering host | `bristan` → `industry-verticals/bristan` |
| Start item | Home (`b8030000-0001-4000-8000-000000000002`) |

In **Settings → Site Grouping → bristan**, set **Predefined application editing host** to `bristan` (same pattern as [Forma Lux site grouping](../assets/sitecore-predefined-application-editing-host.png)).

## Pages (Sitecore routes)

| Route | Content item | Reference screenshot |
|-------|----------------|----------------------|
| `/` | Home | [home-desktop.png](./images/bristan/home-desktop.png) |
| `/homeowners-home` | Homeowners | [homeowners-home-desktop.png](./images/bristan/homeowners-home-desktop.png) |
| `/showers` | Showers | [showers-desktop.png](./images/bristan/showers-desktop.png) |
| `/bathroom-taps` | Bathroom Taps | [bathroom-taps-desktop.png](./images/bristan/bathroom-taps-desktop.png) |
| `/installers-home` | Installers | [installers-home-desktop.png](./images/bristan/installers-home-desktop.png) |
| `/merchants-home` | Merchants | [merchants-home-desktop.png](./images/bristan/merchants-home-desktop.png) |
| `/specifiers-home` | Specifiers | [specifiers-home-desktop.png](./images/bristan/specifiers-home-desktop.png) |
| `/products/bathroom-taps` | Product listing | [products-bathroom-taps-desktop.png](./images/bristan/products-bathroom-taps-desktop.png) |
| `/order-a-brochure` | Brochures | [order-a-brochure-desktop.png](./images/bristan/order-a-brochure-desktop.png) |

## Shared components used

Pages use **Project/bristan** renderings (unique IDs, same React components):

- **Chrome:** Header, Navigation, NavigationIcons, Image (logo), Footer, LinkList
- **Home:** HeroBanner, Promo, Features
- **Landing pages:** HeroBanner, RichText, Promo
- **Products:** PageHeader, ProductListing, RichText

See `design-screenshots/bristan-com/component-review.json` for the full mapping.

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

One-time infrastructure migration (copies Marley collection shell, remaps GUIDs):

```bash
node authoring/items/bristan/scripts/migrate-bristan-infrastructure.mjs
```

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

XM Cloud build deploys `Project.IndustryVerticals`, `marley`, and `bristan` together (`xmcloud.build.json`). The bristan module is fully isolated — no overlap with `/sitecore/content/industry-verticals/bristan`.

If the old industry-verticals path exists in CM from a prior deploy, remove or migrate it manually after pushing the new module.

## App README

[industry-verticals/bristan/README.md](../industry-verticals/bristan/README.md)
