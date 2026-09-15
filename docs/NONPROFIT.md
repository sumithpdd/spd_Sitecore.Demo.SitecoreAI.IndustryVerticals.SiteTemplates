# NonProfit — Openhand

SitecoreAI demo host for **Openhand**, a fictional UK charity. Structure follows [redcross.org.uk](https://www.redcross.org.uk) (crisis support + international emergency appeals in one IA) with section patterns from Macmillan, Tearfund, Shelter and Age UK. **Do not copy reference-site assets** — photography is CC0/Pexels, stored under `industry-verticals/nonprofit/public/openhand/`.

| | Value |
|--|--|
| **Brand** | Openhand |
| **Rendering host** | `nonprofit` → `industry-verticals/nonprofit` |
| **Editing host** | `nonprofit` (must match Site Grouping **RenderingHost**) |
| **Build key** | `nonprofit` in `xmcloud.build.json` (`enabled: true`) |
| **Site name** | `nonprofit` |
| **Collection path** | `/sitecore/content/nonprofit` |
| **Site content path** | `/sitecore/content/nonprofit/nonprofit` |
| **Module** | `authoring/items/nonprofit/nonprofit.module.json` (`nonprofit-scs`) |
| **GUID prefix** | `0e0a` — never reuse `a1e9` / `b40e` / `b803` |
| **Push env** | confirm with the user (`sitecoreSilverProd` or `production`) |

### Isolation layout

| Sitecore area | Path |
|---------------|------|
| Collection | `/sitecore/content/nonprofit` |
| Site | `/sitecore/content/nonprofit/nonprofit` |
| Templates | `/sitecore/templates/Project/nonprofit` |
| Renderings | `/sitecore/layout/Renderings/Project/nonprofit` |
| Placeholders | `/sitecore/layout/Placeholder Settings/Project/nonprofit` |
| Media | Catalog fallbacks in `/openhand/*.jpg` until Content Hub DAM is patched |

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — audience-switching (`?audience=help\|give`) |
| `/get-help` | Advice landing (no photography) |
| `/get-help/help-with-energy-bills` | AEO advice article |
| `/get-help/what-to-do-if-you-cannot-pay-your-rent` | Advice article |
| `/get-help/emergency-help-with-food` | Advice article |
| `/get-help/a-z` | A–Z index |
| `/get-help/near-you` | Local partner finder |
| `/partners/northgate-community-hub` | Named partner (Dawn Allen equivalent) — Jordan Hale |
| `/partners/st-marks-crisis-centre` | Partner |
| `/partners/riverside-advice-service` | Partner |
| `/appeals/winter` | Seasonal appeal — countdown, total, match |
| `/appeals/emergency` | Emergency appeal + site takeover |
| `/donate` | Gift-value selector |
| `/fundraise` | Event grid — A/B `?promo=left\|right` |
| `/campaigns/fair-energy` | Campaign action |
| `/stories` | Lived-experience listing |
| `/stories/maria-winter-bills` (and jamal, aisha, elaine) | Story pages |
| `/search` | ChatGPT / Google toggle |
| `/cms` | Mini CMS |
| `/scrunch` | Monitor + AXP (`?axp=1`) |
| `/email` | Supporter email preview |
| `/storyboard` | Demo narrative |

### Demo params

`?audience=help|give` · `?utm_source=chatgpt|linkedin|email` · `?appeal=winter|emergency|off` · `?promo=left|right` · `?axp=1`

`utm_source=chatgpt` opens the demo chat. `appeal=winter|emergency` turns on the header takeover.

## Brand

Navy `#16324F`, teal `#1A6B5C`, amber donate `#E07A3D`, cream `#F6F1E8`. Advice pages have **no photography**. Appeal, partner and story pages do.

## Authoring

```powershell
cd authoring/items/nonprofit
node scripts/generate-nonprofit-site.mjs
dotnet sitecore serialization validate --fix -i nonprofit-scs
dotnet sitecore serialization push -n <env> -i nonprofit-scs
```

Pages add-component needs **both** `headless-main` Allowed Controls trees (project + site Presentation). Catalogs in `src/lib/openhand-catalog.ts` cover Edge lag.

## Front-end

```powershell
cd industry-verticals/nonprofit
copy .env.remote.example .env.local
# paste Edge Context ID + SITECORE_EDITING_SECRET from Deploy Developer settings
npm install
npm run sitecore-tools:generate-map
npm run dev
```

After new component folders: `npm run sitecore-tools:generate-map`.

Playbook: `.cursor/skills/sitecore-serialization-skills/isolated-collection-site/`. Site skill: `.cursor/skills/nonprofit-openhand/SKILL.md`.
