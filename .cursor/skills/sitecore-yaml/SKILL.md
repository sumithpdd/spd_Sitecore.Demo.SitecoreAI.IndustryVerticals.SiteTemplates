---
name: sitecore-yaml
description: Generate and validate Sitecore Content Serialization YAML for collections, sites, renderings, placeholders, datasource items, media, roles, and users. Use after Sitecore TSX/component planning or standalone YAML generation.
paths:
  - "authoring/items/**/*.yml"
  - "**/*.module.json"
  - "**/sitecore.json"
---

# Sitecore YAML

Use this skill for serialization only. Do not design components here.

## Generators

```txt
generators/sitecore-new-collection-yaml/scripts/Generate-SitecoreCollection.mjs
generators/sitecore-new-site-yaml/scripts/Generate-SitecoreSite.mjs
generators/sitecore-new-rendering-yaml/scripts/Generate-SitecoreRendering.mjs
generators/sitecore-media-from-url-yaml/scripts/create-media-from-urls.ps1
```

## Collection

```bash
node .cursor/skills/sitecore-yaml/generators/sitecore-new-collection-yaml/scripts/Generate-SitecoreCollection.mjs "Collection Display Name"
```

## Site

```bash
node .cursor/skills/sitecore-yaml/generators/sitecore-new-site-yaml/scripts/Generate-SitecoreSite.mjs "Site Display Name" --collection "Collection Display Name"
```

## Rendering/component YAML

```bash
node .cursor/skills/sitecore-yaml/generators/sitecore-new-rendering-yaml/scripts/Generate-SitecoreRendering.mjs "ComponentName" --module "Module Name"
```

When the generator requires a fields JSON file, produce one from the approved component fields first.

## Media from URLs

Use the PowerShell script when screenshots/HTML reference assets that must become Sitecore media items:

```powershell
& ".cursor/skills/sitecore-serialization-skills/sitecore-media-from-url-yaml/scripts/create-media-from-urls.ps1" `
  -MediaRoot "authoring/items/{module}/serialized-content/media-library/{project}/{site}" `
  -SiteMediaPath "/sitecore/media library/Project/{project}/{site}" `
  -SiteRootItemId "{GUID}" `
  -Assets $assets `
  -BaseUrl "https://example.com"
```

## Validation

From the module folder:

```bash
dotnet sitecore serialization validate --fix
```

Push only when the user requested it or when the workflow explicitly includes push:

```bash
dotnet sitecore serialization push -n production
```

## Rules

- Generate fresh GUIDs for new items.
- Never duplicate one item path in multiple files.
- Respect `*.module.json` include roots.
- Let `validate --fix` handle long SCS paths; do not guess hash folders.
- **Site shell:** Dictionary, Media, Presentation, Settings each need their own SXA template — not JSS Data on every folder. See [headless-site-shell](../sitecore-serialization-skills/headless-site-shell/SKILL.md) and [docs/SITECORE-SITE-SHELL.md](../../../docs/SITECORE-SITE-SHELL.md).
- For internal links, prefer Sitecore item IDs from `site-content-tree.json`.
- YAML must stay in the current module namespace.
