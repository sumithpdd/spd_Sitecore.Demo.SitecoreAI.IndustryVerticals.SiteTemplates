---
name: asos-fashion
description: >-
  ASOS isolated collection — petite denim, Topshop Belle Paris, My Edit,
  curation insight, Content Hub brand 108526. Use when editing
  industry-verticals/asos, authoring/items/asos, or docs/ASOS.md.
---

# ASOS

Full notes: [`docs/ASOS.md`](../../../docs/ASOS.md). Playbook: [`isolated-collection-site`](../sitecore-serialization-skills/isolated-collection-site/SKILL.md).

| | Value |
|--|--|
| Host | `industry-verticals/asos` (Pages Router) |
| Module | `asos-scs` |
| Paths | `/sitecore/content/asos` → `/sitecore/content/asos/asos` |
| GUID prefix | Journey pages `a50c` |
| CH brand | **108526** Asos on starter-verticals-2 |

## Hard rules

- Do **not** invent extra people profiles. Maya is story-only.
- Never hotlink asos.com. DAM `src` + `dam-id` on Image fields after upload.
- Never commit Content Hub env.
- Keep helpers in `src/lib/`. Every `.tsx` under `src/components/` is registered by `sitecore-tools:generate-map`.
- URL shapes stay `/women`, `/{edit}/cat/?cid=`, `/{brand}/{slug}/prd/{id}`.
- Do not re-run collection/site generators after journey pages exist.

## Journey

Arrive `/` → `/women` → `/women/new-in/cat/?cid=27108` → petite denim → Belle Paris or Weekday PDP → Topshop → Style Feed → My Edit → Curation insight.
