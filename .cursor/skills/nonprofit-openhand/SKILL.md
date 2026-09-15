---
name: nonprofit-openhand
description: >-
  Openhand isolated collection (nonprofit) — UK crisis support + emergency
  appeals, advice AEO pages, partner finder, winter/emergency appeals, donate,
  fundraise A/B, storyboard, Scrunch, Mini CMS. Use when editing
  industry-verticals/nonprofit, authoring/items/nonprofit, docs/NONPROFIT.md,
  Advice*, Partner*, Appeal*, FundraiseGrid, or nonprofit-scs YAML.
---

# NonProfit — Openhand

Full notes: [`docs/NONPROFIT.md`](../../../docs/NONPROFIT.md). Playbook: [`isolated-collection-site`](../sitecore-serialization-skills/isolated-collection-site/SKILL.md).

| | Value |
|--|--|
| Host | `industry-verticals/nonprofit` (Pages Router) |
| Module | `authoring/items/nonprofit/nonprofit.module.json` (`nonprofit-scs`) |
| Paths | `/sitecore/content/nonprofit` → `/sitecore/content/nonprofit/nonprofit` |
| GUID prefix | `0e0a` — never copy Legal `a1e9` / Brother `b40e` / Bristan `b803` |
| Editing host | `nonprofit` |
| Brand | Openhand |

## Hard rules

- Structure only from Red Cross / Macmillan / Tearfund / Shelter / Age UK — **never hotlink those CDNs**.
- Advice pages (`AdviceArticle`, A–Z, Get help landing) get **no photography**.
- Northgate Community Hub / Jordan Hale is the named partner (Dawn equivalent). Do not invent extra hub managers on partner pages.
- Keep search overlay in `src/lib/HeaderSearch.tsx` (not under `src/components/`).
- Demo params live in `src/lib/demo-params.ts`. Chat opens on `?utm_source=chatgpt`.
- Catalog fallbacks: `src/lib/openhand-catalog.ts`.

## Page designs vs page layout

Header/Footer on **partials**. Page `__Renderings` on `headless-main` for HomeHero, advice, partners, appeals, demo surfaces.

Authors cannot add components unless **both** placeholder trees have `headless-main` Allowed Controls:

1. Site: `Presentation/Placeholder Settings/headless-main`
2. Project: `/sitecore/layout/Placeholder Settings/Project/nonprofit/headless-main`

## After adding a React component

1. Folder under `src/components/{kebab}/`.
2. `npm run sitecore-tools:generate-map`.
3. Rendering YAML + Openhand Available Renderings + `headless-main` Allowed Controls.
4. Update `docs/NONPROFIT.md` + `docs/COMPONENTS.md`.

```powershell
cd industry-verticals/nonprofit
npm run sitecore-tools:generate-map
npx prettier --write "src/path/to/file.tsx"

cd authoring/items/nonprofit
node scripts/generate-nonprofit-site.mjs
dotnet sitecore serialization validate --fix -i nonprofit-scs
dotnet sitecore serialization push -n sitecoreSilverProd -i nonprofit-scs
```
