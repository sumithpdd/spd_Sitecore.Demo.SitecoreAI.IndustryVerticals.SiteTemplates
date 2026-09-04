# Brother media IDs

Prefer **Content Hub** (`dam-id` + public URL) for rendering-host Image fields.

- Deduped CH registry + Sitecore field map + web import runbook: [`media-maps/`](./media-maps/README.md)
- Site overview: [`docs/BROTHER.md`](../../../../docs/BROTHER.md) (Content Hub media section)

## Scripts

| Script | Purpose |
|--------|---------|
| `Import-BrotherWebProductImages.ps1` | Curated images from brother.co.uk + store |
| `Upload-BrotherContentHub.ps1` | Upload + public links (dedupe by LocalFile) |
| `Set-BrotherContentHubMetadata.ps1` | Brand=Brother, Type=Social Media Asset, Tag=Used in CMS |
| `Sync-BrotherContentHubMedia.ps1` | Maps / YAML patch / local `public/images` refresh |

## Legacy Sitecore media library IDs (optional)

Wire as `<image mediaid="{…}" />` only if not using DAM:

| Asset | MediaId |
|-------|---------|
| VC-500W product | `{05AB7E75-4824-46F2-AC25-CE5033C2AAE2}` |
| VC-500W with laptop | `{EBF419E5-05B6-4B8D-9925-6200D29D8519}` |
| Full colour printing | `{56E8D596-881C-459E-8C1B-9E23564FC196}` |
| Five widths | `{E4F5A26D-FA02-4901-89AE-7E01ACD741A0}` |
| Auto cutter | `{17D15911-DFA3-4B02-91B8-D6C912E001AF}` |
| Labelling carousel / home | `{A244AAD9-6E01-4722-90D7-20323C4CFDEC}` |
| Blog / desk | `{38636D43-B8D0-455D-95D9-0597371DEC62}` |

Live host also falls back to `public/images/*`.
