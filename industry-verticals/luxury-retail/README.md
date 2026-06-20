# Luxury retail (Essential Living)

## Overview

**Essential Living** is a demo website for high-end home goods — intuitive navigation, product catalogue patterns, and engaging content presentation. It showcases how a luxury retail brand can deliver a seamless experience with Sitecore XM Cloud and the Content SDK.

For the **Marley** ([marley.co.uk](https://www.marley.co.uk/)) roof-systems demo, use the dedicated site instead: [industry-verticals/marley](../marley/README.md) and [docs/MARLEY.md](../../docs/MARLEY.md).

## Developer expectations

- Tailwind-based styling (Shadcn) with theme tokens in `src/assets/base/variables.css`
- Modular layouts: containers, column/row splitters, section wrapper
- Localization support via Content SDK / Next.js
- Component inventory in `.sitecore/component-map.ts` (generated from `src/components`)

## Components

Layout (**Container**, **ColumnSplitter**, **RowSplitter**, **SectionWrapper**, **PartialDesignDynamicPlaceholder**, **PageContent**), chrome (**Header**, **Navigation**, **NavigationIcons**, **Footer**, **LinkList**, **LanguageSwitcher**), marketing (**HeroBanner**, **Title**, **RichText**, **ContentBlock**, **Image**, **Features**, **Promo**, **Offers**, **PageHeader**), catalogue (**ProductListing**, **ProductDetails**, **SelectedProducts**), social (**SocialFollow**, **SocialFeed**), platform (**BYOCWrapper**, **FEaaSWrapper**, **Form**, **ThemeEditor**).

See [docs/COMPONENTS.md](../../docs/COMPONENTS.md) for the full Luxury Retail inventory.

## Preconditions

1. You have deployed your XM Cloud environment already. If not follow this link: [Deploy a Project and Environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html)

## Run site locally

1. Clone the repository (if not yet done)  
   `git clone https://github.com/Sitecore/Sitecore.Demo.XMCloud.IndustryVerticals.SiteTemplates`
2. Starting from the root of the repository navigate to site app folder  
   `cd industry-verticals/luxury-retail`
3. Copy the environment file `.env.remote.example`
4. Rename the copied file to `.env.local`
5. Edit `.env.local` and provide a value for
   - `SITECORE_EDGE_CONTEXT_ID`
   - `NEXT_PUBLIC_DEFAULT_SITE_NAME`
   - `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`
   - `SITECORE_EDITING_SECRET`
6. Install dependencies: from `industry-verticals/luxury-retail` run `npm install`
7. Run the site locally: `npm run dev`
8. Access the site: visit http://localhost:3000 in your browser.

## Add editing host to XM Cloud

If you have not enabled the split deployment feature your editing hosts are automatically created based on the `xmcloud.build.json` if `enabled` is set to `true`. The following steps are not required. Only if you have enabled the split deployment feature, continue with the next steps.

1. Go to Sitecore Cloud Portal https://portal.sitecorecloud.io
2. Open XM Cloud Deploy
3. Select Project that has been deployed
4. Switch to tab "Editing Hosts"
5. Click "Add editing host"
6. Provide Editing host name `luxury-retail` as per `xmcloud.build.json`
7. Include search related environment variables
8. Check if the link to authoring environment is set correctly (should be by default)
9. Check if the source code provider is set correctly (should be by default)
10. Check if the GitHub Account is set correctly (should be by default)
11. Check if repository is set correctly (should be by default)
12. Check if Branch is set correctly (should be by default)
13. Set the Auto deploy option (recommended)
14. Click "Save"
15. On the new editing host click the ... and hit "Build and deploy"

Additional Info: You do not have to create rendering host items in XM Cloud as those are created automatically for you when creating a rendering host. Mapping of sites using site templates to editing hosts is also done automatically.

[Content SDK documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)
