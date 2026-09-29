# Recruitment maps (Content Hub brand 112600)

Brand **Recruitment**, entity **112600**, on [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud/en-us/brands/branddetail/112600). Image fields use DAM `src` + `dam-id`. Never hotlink `weareaspire.com`.

Do not commit Content Hub credentials. Load the local `set-ch-env.ps1` before upload.

| File | Trail |
|------|--------|
| [`recruitment-page-map.csv`](recruitment-page-map.csv) | Route → Sitecore path, template, renderings, image |
| [`recruitment-component-map.csv`](recruitment-component-map.csv) | React file → rendering id → placeholder |
| [`recruitment-sitecore-image-field-map.csv`](recruitment-sitecore-image-field-map.csv) | Sitecore item + field → DAM `src` + `dam-id` |
| [`content-hub-asset-registry.csv`](content-hub-asset-registry.csv) | Uploaded assets on brand 112600 |
| [`recruitment-image-xml.json`](recruitment-image-xml.json) | Filename → Sitecore Image XML |

Host fallbacks live in `industry-verticals/recruitment/src/lib/aspire-dam.ts`. Catalogue cards that are not CMS items yet still use those public URLs. Consultant portraits use one Content Hub file per person (`consultant-{slug}`). The Senior Designer logo is `job-senior-designer-6042762.png`.

```powershell
. '{OneDrive}/Work/Brother/_content-ready/set-ch-env.ps1'
cd authoring/items/Recruitment/scripts
.\Upload-RecruitmentContentHub.ps1
node write-aspire-dam.mjs
node write-recruitment-content.mjs
```
