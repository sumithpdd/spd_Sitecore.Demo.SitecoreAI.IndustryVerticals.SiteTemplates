# Cursor agent configuration

This folder configures **rules** and **skills** for AI-assisted development in the SitecoreAI Industry Verticals repository.

| | |
|---|---|
| **Full reference** | **[AGENTS.md](./AGENTS.md)** — what every rule and skill does |
| **Skill migration** | [MIGRATION-MAP.md](./MIGRATION-MAP.md) — compact vs detailed skills |
| **Playwright setup** | [RUNTIME-DEPENDENCIES.md](./RUNTIME-DEPENDENCIES.md) |

## Quick structure

```txt
.cursor/
  rules/                 # Project constraints (*.mdc) — see AGENTS.md § Rules
  skills/                # On-demand workflows (*.md) — see AGENTS.md § Skills
  node_modules/          # Playwright runtime (gitignored)
  AGENTS.md              # Rules + skills documentation
```

## One-time Playwright setup

```bash
node .cursor/skills/capture-website/scripts/setup-cursor-runtime.mjs
npm --prefix .cursor install
npm --prefix .cursor run setup:playwright
```

Do **not** run `npm install` inside individual skill folders.

## Default workflow

1. **website-to-sitecore** — orchestrator  
2. **capture-website** — screenshots + HTML  
3. **visual-cms-map** — `component-review.json`  
4. **sitecore-from-capture** — TSX + pages (after approval)  
5. **sitecore-yaml** — serialization  

For a **new site from scratch** (scaffold + collection YAML), use **mimic-website-skills/mimic-url** instead.

Details, tables, and diagrams: **[AGENTS.md](./AGENTS.md)**.
