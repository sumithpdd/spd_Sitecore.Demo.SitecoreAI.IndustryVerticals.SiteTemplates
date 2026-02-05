# Visit London

## Overview

Visit London is a demo website inspired by [visitlondon.com](https://www.visitlondon.com/) - London's Official Visitor Guide. It showcases a modern tourism experience with intuitive navigation, event listings, attraction information, and engaging content presentation. The site demonstrates how a destination marketing organization can deliver a seamless and personalized experience to visitors.

## Brand Identity

- **Primary Color**: Visit London Red (#E30613)
- **Typography**: Oswald (bold condensed headings) + Source Sans 3 (body)
- **Style**: Clean, bold, photography-focused with uppercase headings
- **Logo Style**: "VISIT LONDON" in bold red uppercase with "OFFICIAL VISITOR GUIDE" subtitle
- **Target Audience**: Tourists, visitors, and anyone exploring London

## Developer Expectations

- Tailwind-based styling (Shadcn)
- Modular components for reuse
- Localization support
- Tourism-focused content structure

## Preconditions

1. You have deployed your XM Cloud environment already. If not follow this link: [Deploy a Project and Environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html)

## Run site locally

1. Clone the repository (if not yet done)
   `git clone https://github.com/Sitecore/Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates`
2. Starting from the root of the repository navigate to site app folder
   `cd industry-verticals\visitlondon`
3. Copy the environment file `.env.remote.example`
4. Rename the copied file to `.env.local`
5. Edit `.env.local` and provide a value for
   - SITECORE_EDGE_CONTEXT_ID
   - NEXT_PUBLIC_DEFAULT_SITE_NAME
   - NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID
   - SITECORE_EDITING_SECRET
   - NEXT_PUBLIC_BASE_URL
6. Install dependencies:
   from `industry-verticals\visitlondon` run `npm install`
7. Run the site locally:
   `npm run dev`
8. Access the site:
   Visit http://localhost:3000 in your browser.

## Add Editing host to XM Cloud

If you have not enabled the split deployment feature your editing hosts are automatically created based on the xmcloud.build.json if enabled is set to true. The following steps are not required. Only if you have enabled the split deployment feature, continue with the next steps.

1. Go to Sitecore Cloud Portal https://portal.sitecorecloud.io
2. Open XM Cloud Deploy
3. Select Project that has been deployed
4. Switch to tab "Editing Hosts"
5. Click "Add editing host"
6. Provide Editing host name `visitlondon` as per xmcloud.build.json
7. Check if the link to authoring environment is set correctly (should be by default)
8. Check if the source code provider is set correctly (should be by default)
9. Check if the GitHub Account is set correctly (should be by default)
10. Check if repository is set correctly (should be by default)
11. Check if Branch is set correctly (should be by default)
12. Set the Auto deploy option (recommended)
13. Click "Save"
14. On the new editing host click the ... and hit "Build and deploy"

Additional Info: You do not have to create rendering host items in XM Cloud as those are created automatically for you when creating a rendering host. Mapping of sites using site templates to editing hosts is also done automatically.

[Documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)

## Content Structure

The Visit London site is designed for tourism content:

```
/visitlondon (Home)
├── /things-to-do
│   ├── /attractions
│   ├── /tours
│   ├── /entertainment
│   └── /events
├── /sightseeing
│   ├── /landmarks
│   ├── /neighbourhoods
│   └── /walking-tours
├── /theatre
│   ├── /west-end-shows
│   ├── /musicals
│   └── /plays
├── /traveller-information
│   ├── /getting-around
│   ├── /maps
│   └── /practical-info
├── /accommodation
│   ├── /hotels
│   ├── /hostels
│   └── /apartments
└── /blog
    ├── /whats-on
    ├── /guides
    └── /news
```

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Visit London Red | `#E30613` | Primary brand color, CTAs, links, logo |
| Dark Red | `#C70511` | Hover states |
| Dark Gray | `#1A1A1A` | Text, headings |
| Light Gray | `#F5F5F5` | Navigation background, sections |
| White | `#FFFFFF` | Main background |

## Typography

| Font | Usage |
|------|-------|
| Oswald | Headings, logo - bold condensed uppercase |
| Source Sans 3 | Body text, navigation, buttons |

## Localization Support

### Supported Languages (Default)
- en (English)

### Add Additional Languages
- Navigate to Channels → Click the three dots on the specific site → Settings → Languages.
- Add the required languages and provide translations for the newly added languages.
- After adding the new languages, update the locales array in the next.config.js file to include the new language codes.
- To display languages in language switcher, go to src/constants/localeOptions.ts and update the localeOptions array with code, label, currency and currencySymbol for specific locale.

## Reference

- **Visit London Website:** https://www.visitlondon.com/
- **XM Cloud Documentation:** https://doc.sitecore.com/xmc/en/developers/xm-cloud/
- **Content SDK:** https://doc.sitecore.com/xmc/en/developers/content-sdk/

## Creating New Sites

This site was created by cloning the Forma Lux (Retail) vertical. For detailed steps on how to clone a site to create new verticals, see:

- **Site Cloning Guide:** [docs/SITE-CLONING-GUIDE.md](../../docs/SITE-CLONING-GUIDE.md)
- **Deployment Guide:** [docs/DEPLOYMENT-GUIDE.md](../../docs/DEPLOYMENT-GUIDE.md)
- **Vercel Deployment:** [docs/VERCEL-DEPLOYMENT.md](../../docs/VERCEL-DEPLOYMENT.md)
