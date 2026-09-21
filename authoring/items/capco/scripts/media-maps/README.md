# Capco Content Hub media maps

Brand entity **108095** on starter-verticals-2. Image fields use DAM `src` + `dam-id`.

**Do not commit secrets.** Credentials stay in a local `set-ch-env.ps1` (never this folder). Never hotlink `capco.com`.

| File | Purpose |
|------|---------|
| `content-hub-asset-registry.csv` | Uploaded assets + public URLs |
| `capco-image-xml.json` | Local filename → Sitecore Image XML |

```powershell
. '{OneDrive}/Work/Brother/_content-ready/set-ch-env.ps1'
cd authoring/items/capco/scripts
node download-capco-images.mjs
.\Upload-CapcoContentHub.ps1
.\Set-CapcoContentHubMetadata.ps1
node patch-capco-dam-images.mjs
```
