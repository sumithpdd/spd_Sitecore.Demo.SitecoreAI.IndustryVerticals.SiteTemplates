# Bristan demo site

UK taps and showers demo inspired by [bristan.com](https://www.bristan.com/), built on the shared **industry-verticals** rendering set (same components as Forma Lux / retail). No custom rendering IDs — avoids the Edge `[object Object]` issues seen with Marley.

| | Value |
|---|--------|
| **Reference site** | [bristan.com](https://www.bristan.com/) |
| **Rendering host** | `industry-verticals/bristan` |
| **Build key** | `bristan` in `xmcloud.build.json` |
| **Site name** | `bristan` |
| **Content path** | `/sitecore/content/industry-verticals/bristan` |
| **Design captures** | `design-screenshots/bristan-com/` |
| **Component manifest** | `design-screenshots/bristan-com/component-review.json` |

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

## Shared components used (no custom renderings)

All pages use **industry-verticals** renderings only:

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

## Authoring

```bash
node authoring/items/bristan/scripts/generate-bristan-site.mjs
dotnet sitecore serialization push -n Project.IndustryVerticals
dotnet sitecore serialization push -n bristan
```

Modules: `Project.IndustryVerticals` (site shell) + `bristan` (content).

## App README

[industry-verticals/bristan/README.md](../industry-verticals/bristan/README.md)
