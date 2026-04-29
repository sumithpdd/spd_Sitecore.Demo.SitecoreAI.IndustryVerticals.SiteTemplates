# Luxury retail (Marley)

## Overview

This app is the **FormaLux / luxury-retail** starter, themed and documented for **[Marley](https://www.marley.co.uk/)** — pitched roof systems, roof tiles, solar, accessories, and technical content for homeowners, merchants, installers, and specifiers. The experience is still a **product-led Sitecore demo** (listing, detail, promos, articles); authors map Marley content into the same component set.

Reference site: [marley.co.uk](https://www.marley.co.uk/).

## Developer expectations

- Tailwind-based styling (Shadcn) with theme tokens in `src/assets/base/variables.css`
- Modular layouts: containers, column/row splitters, section wrapper
- Localization support via Content SDK / Next.js
- Component inventory and authoring names are defined in `.sitecore/component-map.ts` (generated from `src/components`)

## Components available for Marley

These are the **rendering names** registered for XM Cloud. Use them when planning pages that mirror Marley’s IA (products, solar, support, resources).

### Layout and structure

| Component                           | Typical use on Marley                      |
| ----------------------------------- | ------------------------------------------ |
| **Container**                       | Max-width content bands                    |
| **ColumnSplitter**                  | Two- or multi-column layouts               |
| **RowSplitter**                     | Vertical stacking / row bands              |
| **SectionWrapper**                  | Section padding and background variants    |
| **PartialDesignDynamicPlaceholder** | SXA-style partial designs / shared regions |
| **PageContent**                     | Generic page body region                   |

### Chrome and navigation

| Component            | Typical use on Marley                                               |
| -------------------- | ------------------------------------------------------------------- |
| **Header**           | Top bar with logo and utility areas (`headless-header` placeholder) |
| **Navigation**       | Primary nav (products, help, technical services, sustainability)    |
| **NavigationIcons**  | Icon-led links (e.g. search, stockist, samples)                     |
| **Footer**           | Multi-column footer with link lists                                 |
| **LinkList**         | Grouped links (resources, policies, useful links)                   |
| **LanguageSwitcher** | Locale switching                                                    |

### Marketing and content

| Component        | Typical use on Marley                                           |
| ---------------- | --------------------------------------------------------------- |
| **HeroBanner**   | Homepage and campaign heroes (“Peace of mind”, category intros) |
| **Title**        | Section headings                                                |
| **RichText**     | Long-form copy                                                  |
| **ContentBlock** | Flexible text + media blocks                                    |
| **Image**        | Imagery and diagrams                                            |
| **Features**     | Bullet USPs (e.g. comprehensive roof system)                    |
| **Promo**        | Highlight tiles (roof tiles, accessories, solar)                |
| **Offers**       | Promotional callouts                                            |
| **PageHeader**   | In-page title bands                                             |

### Commerce-style / catalogue (demo)

| Component            | Typical use on Marley                        |
| -------------------- | -------------------------------------------- |
| **ProductListing**   | Grid of products (tiles, solar, accessories) |
| **ProductDetails**   | PDP-style detail with gallery and options    |
| **SelectedProducts** | Curated picks (e.g. featured ranges)         |

### Social

| Component        | Typical use on Marley             |
| ---------------- | --------------------------------- |
| **SocialFollow** | Social link icons                 |
| **SocialFeed**   | Embedded or linked social content |

### Sitecore platform

| Component        | Purpose                                      |
| ---------------- | -------------------------------------------- |
| **BYOCWrapper**  | Bring Your Own Component bridge              |
| **FEaaSWrapper** | Sitecore FEaaS composition                   |
| **Form**         | Sitecore forms                               |
| **ThemeEditor**  | Theme controls in authoring (design library) |

### Non-Sitecore UI (used inside composites)

Controls such as **ProductCard**, **MiniCart**, **AddToCartButton**, **ProductGallery**, and related pieces live under `src/components/non-sitecore/` and are composed by **ProductListing** / **ProductDetails** — they are not separate renderings in the map.

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
