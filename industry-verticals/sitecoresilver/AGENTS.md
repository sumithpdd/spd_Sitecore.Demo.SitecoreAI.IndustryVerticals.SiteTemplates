# SitecoreSilver — AI agent guidance

**Copenhagen Silver Celebration** event microsite ([design reference](https://copenhagen-silver.vercel.app/)). Nine custom `SitecoreSilver*` components; single site `sitecoresilver`.

**Human docs:** [docs/SITECORESILVER.md](../../docs/SITECORESILVER.md) · [docs/COPENHAGEN-SILVER-SITE.md](../../docs/COPENHAGEN-SILVER-SITE.md) · [README.md](./README.md)  
**Cursor rules:** `.cursor/rules/sitecoresilver-site-playbook.mdc`, `sitecoresilver-pixel-perfect-yaml-and-components.mdc`

---

## Identity (use consistently)

| Concept                                   | Value                                        |
| ----------------------------------------- | -------------------------------------------- |
| XM Cloud Deploy environment (`-n` on CLI) | `SitecoreSilverProd` (env ID `5Cph5EjHd57eURM3odbI7c`) |
| Site / Site Grouping name                 | `sitecoresilver`                                    |
| `NEXT_PUBLIC_DEFAULT_SITE_NAME`           | `sitecoresilver`                                    |
| Content root (main site)                  | `/sitecore/content/sitecoresilver/sitecoresilver`          |
| Rendering host key (`xmcloud.build.json`) | `sitecoresilver`                                    |
| Git repo (canonical)                      | `sumithpdd/spd_Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates` |
| Editing host name (Deploy portal)         | `sitecoresilver` (must match build key **exactly**) |
| Next.js app                               | `industry-verticals/sitecoresilver/`                          |
| Serialization module                      | `authoring/items/sitecoresilver.module.json`        |

---

## End-to-end setup (do not skip steps)

Repo scaffolding alone is **not** enough. After `xmcloud.build.json` and the Next.js app exist:

1. Module is auto-discovered via root `sitecore.json` → `authoring/items/**/*.module.json`.
2. **Pull** YAML: `dotnet sitecore serialization pull -n SitecoreSilverProd` → `authoring/items/sitecoresilver/`.
3. **Push** branch; wait for **XM Cloud build** of rendering host `sitecoresilver` to succeed.
4. **XM Cloud Deploy → Project → Editing Hosts** — add host named **`sitecoresilver`** (same as `xmcloud.build.json` key):
   - Link to authoring environment: **SitecoreSilverProd** (same XM Cloud env as serialization `-n`)
   - GitHub: account **connected to this XM Cloud project** (wrong account = deploy fails)
   - Repository / branch: this repo
   - Enable **deploy on repository change** if available
5. Wait for **editing host deployment** to finish.
6. **Content Editor → Site Grouping** → `/sitecore/content/sitecoresilver/sitecoresilver/Settings/Site Grouping/sitecoresilver`:
   - **Predefined application editing host** = `sitecoresilver` — **not** `Default` or `demosite` (dropdown only lists hosts **after** step 4–5 deploy succeeds)
   - Screenshots + troubleshooting: [docs/SITECORESILVER.md § New site setup](../../docs/SITECORESILVER.md#new-site-setup-with-screenshots)
7. **`.env.local`** in `industry-verticals/sitecoresilver/` with Edge context, editing secret, `NEXT_PUBLIC_DEFAULT_SITE_NAME=sitecoresilver`.

See [docs/SITECORESILVER.md § Setup gaps](../../docs/SITECORESILVER.md#setup-gaps-from-versele-working-session--do-not-skip) for what we missed on first deploy.

---

## Build commands (always after component changes)

From `industry-verticals/sitecoresilver/`:

```bash
npm run sitecore-tools:generate-map   # refreshes .sitecore/component-map.ts
npm run sitecore-tools:build        # refreshes import-map + metadata
npm run build                       # full production build (XM Cloud uses this)
```

**Do not** hand-edit `.sitecore/component-map.ts` for normal work — regenerate. Stale maps reference deleted paths and fail TypeScript (e.g. removed `corporate/` components).

`sitecore.config.ts` must **not** be empty `defineConfig({})` — copy from `sitecore.config.ts.example` (Edge + `editingSecret`).

---

## Component development

- **One component per Cursor task** (header, promo, product list, …) with desktop + mobile screenshots from sitecoresilver.com.
- TSX under `src/components/sitecoresilver/` (WHB under `src/components/sitecoresilver/welcome-home-buddy/`); helpers under `src/lib/` only (not under `components/`).
- Placeholder keys: `sitecoresilver-*` prefix (e.g. `sitecoresilver-header-nav-{*}`).
- Map key = Sitecore rendering **`componentName`** (e.g. `SitecoreSilverHeader`).
- After YAML: `validate --fix` → `push -n SitecoreSilverProd` → publish presentation in CM.

### Presentation architecture (partial designs — best practice)

**Reuse site chrome via partial designs + page design.** Do not put `SitecoreSilverHeader` / `SitecoreSilverFooter` on every page.

```text
Layout.tsx: headless-header | headless-main | headless-footer
Partial design "header"  → SitecoreSilverHeader on headless-header (ds: Data/Headers/Default Header)
Partial design "footer"  → SitecoreSilverFooter on headless-footer (ds: Data/Footers/Default Footer)
Page design "DefaultPage" → PartialDesigns = header | footer
Page item                → __Renderings on headless-main only (+ optional nested nav/links)
```

**Serialized reference (SitecoreSilver):**

| Item                  | Path under `authoring/items/sitecoresilver/sitecoresilver-site-root/sitecoresilver/`                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| Partial design header | `Presentation/Partial Designs/header.yml`                                                                 |
| Partial design footer | `Presentation/Partial Designs/footer.yml`                                                                 |
| Page design           | `Presentation/Page Designs/DefaultPage.yml`                                                               |
| Template mapping      | `Presentation/Page Designs.yml` → Headless Page → DefaultPage                                             |
| Partial slots         | `Presentation/Placeholder Settings/Partial Design/header.yml` (`sxa-header`), `footer.yml` (`sxa-footer`) |

Full tables and “what goes where”: **[docs/SITECORESILVER.md § Presentation architecture](../../docs/SITECORESILVER.md#presentation-architecture-partial-designs--page-designs)**.

**When adding site-wide chrome:** wire the component in a **partial design**, add GUID to **DefaultPage** `PartialDesigns`, publish — not on each page.

**When adding page content:** Json rendering on **`headless-main`** only (hero, grids, promos).

### Headless variants (Pages / EE picker)

When a TSX file exports multiple variants (`Default`, `ImageLeft`, `ImageRight`):

1. Content Editor → **Layout / Renderings** → open Json Rendering → copy **Component Name**.
2. Site → **Presentation → Available Renderings → Headless Variants** → insert variant item → paste that name.
3. Add **variant definitions** matching export names (`Default`, `ImageLeft`, …).
4. Authors pick variant in Pages; same component, different layout.

**SitecoreSilverRichText:** pick variant **`GlassPanel`** on Home (`FieldNames=GlassPanel` in rendering parameters).

---

## Component list (Copenhagen Silver)

**Authoritative doc:** [docs/COPENHAGEN-SILVER-SITE.md](../../docs/COPENHAGEN-SILVER-SITE.md) — every `SitecoreSilver*` component with fields, placeholders, variants, fallbacks, and CM behavior.

### Shipped on Home (TSX + serialization)

| Map key | Placeholder | Notes |
|---------|-------------|--------|
| `SitecoreSilverEventHeader` | `headless-header` | Child placeholder `sitecoresilver-header-nav-{*}` → **LinkList** |
| `SitecoreSilverIntroBanner` | `headless-main` | Intro band; defaults in `sitecoresilver-copenhagen-defaults.ts` |
| `SitecoreSilverEventHero` | `headless-main` | Pills + dual CTAs |
| `SitecoreSilverPromoFullWidth` | `headless-main` | Platform band |
| `SitecoreSilverPromoBadgeGrid` | `headless-main` | Parent; `sitecoresilver-promo-badges-{*}` → badges |
| `SitecoreSilverPromoBadge` | nested | Three datasource items on Home |
| `SitecoreSilverRichText` | `headless-main` | Variant **`GlassPanel`** on Home |
| `SitecoreSilverPromoImageCta` | `headless-main` | Tivoli / event CTA |
| `SitecoreSilverFooter` | `headless-footer` | Title, meta, legal |

Regenerate YAML:

```bash
node authoring/items/sitecoresilver/scripts/generate-copenhagen-silver-home.mjs
dotnet sitecore serialization validate --fix
dotnet sitecore serialization push -n SitecoreSilverProd
```

### Shared kit (other pages)

`Container`, `Promo`, `RichText`, `Navigation`, `ProductListing`, etc. — registered in `.sitecore/component-map.ts` but **not** on serialized Home. See “Shared starter components” in [COPENHAGEN-SILVER-SITE.md](../../docs/COPENHAGEN-SILVER-SITE.md).

### Not in this app (SE9 / pet-site only)

Do not assume these exist in `src/components/sitecoresilver/`: `SitecoreSilverHomeHero`, `SitecoreSilverCategoryGrid`, WHB components, `SitecoreSilverProductSearch`, article split renderings. Those belong to the SE9 Versele vertical, not the Copenhagen event site in this repo.

---

## Do not use in SitecoreSilver prompts

- Paths or components from **Bupa**, **PepsiCo**, **Greeneking** (other verticals in this repo).
- `src/components/sitecoresilver/corporate/` — **removed** (single-site scope).
- `BupaNavigation`, `CorporateFooter`, etc. — removed from LinkList/Navigation.

---

## Demo / personalization roadmap (optional)

Storyline: pet owner → campaign landing → product finder → sign-in → CDP profile → personalized content.

| Phase | Work                                                                          |
| ----- | ----------------------------------------------------------------------------- |
| Now   | Homepage + Dogs + Opti Life PLP/PDP + article pages + newsletter + **WHB** e-learning demo   |
| Later | Fake or SDK-based sign-in; CDP profile attributes (dog age, weight)           |
| Later | **Vercel** deploy for live audience / personalization demo in Sitecore portal |

---

## After meetings

When setup or workflow changes, update **`docs/SITECORESILVER.md`** and this file — same pattern as [JUNIOR-DEVELOPER-GUIDE.md](../../docs/JUNIOR-DEVELOPER-GUIDE.md).
