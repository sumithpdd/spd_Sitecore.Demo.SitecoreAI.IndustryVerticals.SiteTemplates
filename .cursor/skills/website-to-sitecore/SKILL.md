---
name: website-to-sitecore
description: Compact end-to-end workflow for reference URL or screenshots → captured design evidence → CMS component manifest → Sitecore Content SDK TSX → Sitecore YAML including downloaded media library items pushed to CM. Use only as the orchestrator; delegate capture, visual analysis, TSX, YAML, and media import to the focused skills.
paths:
  - "**/design-screenshots/**/page-manifest.json"
  - "**/design-screenshots/**/sections/manifest.json"
---

# Website to Sitecore

Use this skill when the user wants to mimic a website/page and produce Sitecore Content SDK components plus serialization YAML.

## Outcome

Produce:

```txt
design-screenshots/{project}/...
src/components/{namespace}/{Component}.tsx
.sitecore/component-map*.ts
authoring/items/{module}/...   (including media-library YAML, then push to CM)
```

## Workflow

1. **Capture** — run `capture-website` for URL inputs. Skip capture when screenshots already exist.
2. **Analyze visually** — run `visual-cms-map` on full-page screenshots + section crops.
3. **Create review manifest** — list components with action: `create`, `reuse`, `skip`, or `unclear`.
4. **Stop for user approval** before writing TSX/YAML, unless the user explicitly asked for a no-review batch.
5. **Build approved items** — run `sitecore-from-capture`.
6. **Generate serialization** — run `sitecore-yaml` (templates, renderings, datasources, page wiring).
7. **Media (mandatory)** — harvest image URLs from `section.html` / `page.html`, download via [`sitecore-media-from-url-yaml`](../sitecore-serialization-skills/sitecore-media-from-url-yaml/SKILL.md), set `mediaid` on Image fields. See [media-from-mimic.md](../sitecore-yaml/references/media-from-mimic.md). **Do not skip.**
8. **Validate and push** — `npm run build`, then `dotnet sitecore serialization validate --fix` and **push** (includes `media-library`) so media exists in Sitecore CM.

## Non-negotiable rules

- Do not build components from URL memory. Use screenshots/HTML/manifests as evidence.
- Do not create one component per `div`; create CMS-authorable renderings.
- Do not duplicate components already marked `reuse` in `new-sections-manifest.json`.
- Do not copy GUIDs from another project.
- Do not hardcode marketing content in TSX; make content editable fields.
- **Download component/content images** into Sitecore media YAML and **push** them. Do not hotlink the reference site. See [media-from-mimic.md](../sitecore-yaml/references/media-from-mimic.md).
- Keep all generated files inside the current rendering host and current serialization module.

## Review manifest shape

```json
{
  "project": "example-com",
  "pages": ["home"],
  "components": [
    {
      "id": "S1",
      "cmsName": "HeroBanner",
      "scope": "page",
      "action": "create",
      "evidence": ["design-screenshots/example-com/sections/hero-banner/hero-banner-desktop.png"],
      "fields": ["title", "body", "primaryLink", "image"],
      "placeholders": []
    }
  ]
}
```

Write this manifest to:

```txt
design-screenshots/{project}/component-review.json
```

## Reference implementation: Bristan (+ Brother)

The **Bristan** site ([bristan.com](https://www.bristan.com/)) is the canonical full-site example. **Brother** ([brother.co.uk](https://www.brother.co.uk/)) is a second story-scoped example with mandatory media download — see [docs/BROTHER.md](../../../docs/BROTHER.md).

| Artifact | Path |
|----------|------|
| Captures | `design-screenshots/bristan-com/` |
| Review manifest | `design-screenshots/bristan-com/component-review.json` |
| Rendering host | `industry-verticals/bristan/` |
| Serialization module | `authoring/items/bristan/` |
| Content generator | `authoring/items/bristan/scripts/generate-bristan-site.mjs` |
| Human guide | `docs/BRISTAN.md` |

**Brother (labelling story):**

| Artifact | Path |
|----------|------|
| Captures / HTML | `design-screenshots/brother-co-uk/` |
| Review manifest | `design-screenshots/brother-co-uk/component-review.json` |
| Rendering host | `industry-verticals/brother/` |
| Module | `authoring/items/brother/` (`brother-scs`) |
| Media download | `authoring/items/brother/scripts/Download-BrotherMedia.ps1` |
| Guide | `docs/BROTHER.md` |

Bristan uses a **dedicated rendering host** (not an existing vertical). Most components were **`reuse`** from retail; theme tokens in `src/assets/`. Item GUIDs use prefix **`b803`** — never copy from other modules.

**Datasource pitfalls (learned from Bristan Home Hero):** see [datasource-field-values.md](../sitecore-serialization-skills/sitecore-new-rendering-yaml/references/datasource-field-values.md) and [docs/SITECORE-DATASOURCE-FIELDS.md](../../../docs/SITECORE-DATASOURCE-FIELDS.md):

- **General Link** — full internal link XML with target item `id`; minimal XML → Edge `jsonValue: null` → `[object Object]` in `<Link>`
- **Images** — download from capture HTML into tenant **media library YAML** (`sitecore-media-from-url-yaml`) and **push** so items exist in CM. Never hotlink the reference-site CDN (`.ashx`) in serialized YAML. CH DAM is optional later, not a substitute for download.
- **Publish** — push + publish datasource and page to Edge before debugging React

When cloning this pattern for a new reference site:

1. Change collection/site/module names consistently (`{project}.module.json`, `xmcloud.build.json` key).
2. Scaffold host: clone nearest vertical, add missing components, apply captured design tokens.
3. Run `sitecore-yaml` generators + a page-wiring script (like `generate-bristan-site.mjs`).
4. Register in `xmcloud.build.json` (`renderingHosts` + `deployItems.modules`).
5. Document in `docs/{SITE}.md` following `docs/BRISTAN.md` structure.
