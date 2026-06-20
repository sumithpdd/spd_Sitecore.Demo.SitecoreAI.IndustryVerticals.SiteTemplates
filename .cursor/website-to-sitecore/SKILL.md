---
name: website-to-sitecore
description: Compact end-to-end workflow for reference URL or screenshots → captured design evidence → CMS component manifest → Sitecore Content SDK TSX → Sitecore YAML. Use only as the orchestrator; delegate capture, visual analysis, TSX, and YAML to the focused skills.
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
authoring/items/{module}/...
```

## Workflow

1. **Capture** — run `capture-website` for URL inputs. Skip capture when screenshots already exist.
2. **Analyze visually** — run `visual-cms-map` on full-page screenshots + section crops.
3. **Create review manifest** — list components with action: `create`, `reuse`, `skip`, or `unclear`.
4. **Stop for user approval** before writing TSX/YAML, unless the user explicitly asked for a no-review batch.
5. **Build approved items** — run `sitecore-from-capture`.
6. **Generate serialization** — run `sitecore-yaml`.
7. **Validate** — run `npm run build`, then `dotnet sitecore serialization validate --fix`.

## Non-negotiable rules

- Do not build components from URL memory. Use screenshots/HTML/manifests as evidence.
- Do not create one component per `div`; create CMS-authorable renderings.
- Do not duplicate components already marked `reuse` in `new-sections-manifest.json`.
- Do not copy GUIDs from another project.
- Do not hardcode marketing content in TSX; make content editable fields.
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

## Reference implementation: Marley

The **Marley** site ([marley.co.uk](https://www.marley.co.uk/)) is the canonical example in this repo:

| Artifact | Path |
|----------|------|
| Captures | `design-screenshots/marley-co-uk/` |
| Review manifest | `design-screenshots/marley-co-uk/component-review.json` |
| Rendering host | `industry-verticals/marley/` |
| Serialization module | `authoring/items/marley/` |
| Content generator | `authoring/items/marley/scripts/generate-marley-site.mjs` |
| Human guide | `docs/MARLEY.md` |

Marley uses a **dedicated rendering host** (not an existing vertical). Most components were **`reuse`** from luxury-retail + retail; theme in `src/assets/marley/marley.css`. Item GUIDs use prefix **`b703`** — never copy from other modules.

When cloning this pattern for a new reference site:

1. Change collection/site/module names consistently (`{project}.module.json`, `xmcloud.build.json` key).
2. Scaffold host: clone nearest vertical, add missing components, apply captured design tokens.
3. Run `sitecore-yaml` generators + a page-wiring script (like `generate-marley-site.mjs`).
4. Register in `xmcloud.build.json` (`renderingHosts` + `deployItems.modules`).
5. Document in `docs/{SITE}.md` following `docs/MARLEY.md` structure.
