# Site Cloning Guide

This guide outlines the steps to clone an existing site (e.g., Forma Lux) to create a new site like **Visit London**.

---

## Overview

Creating a new site in the Industry Verticals repository involves two main parts:

1. **Sitecore Content Tree Clone** - Clone the site structure, content, and settings in Sitecore
2. **Rendering Host Creation** - Create the Next.js front-end application

---

## Prerequisites

- Access to Sitecore XM Cloud environment
- Sitecore PowerShell Extensions (SPE) access
- Git repository access
- Node.js 22.11.0+

---

## Part 1: Sitecore Content Tree Clone

### Method 1: Using Sitecore AI Clone Site Feature (Recommended)

The easiest way to clone a site is using the built-in Sitecore AI Clone Site feature.

**Reference:** [Sitecore AI - Clone a Site](https://doc.sitecore.com/sai/en/developers/sitecoreai/clone-a-site.html)

#### Steps:

1. **Navigate to Channels** in SitecoreAI
2. Click the **three dots** on the source site (e.g., Forma Lux)
3. Select **Clone Site**
4. Enter the new site details:
   - **Site Name:** `visitlondon` (lowercase, no spaces)
   - **Display Name:** `Visit London`
5. Click **Clone**
6. Wait for the cloning process to complete

This will create:
- Site root item
- Home page structure
- Data folder with datasources
- Dictionary items
- Presentation settings
- Media library folder

### Method 2: Using PowerShell Script

For more control, you can use Sitecore PowerShell Extensions:

1. **Open PowerShell ISE** in Sitecore (Sitecore menu > PowerShell ISE)
2. Run the following script:

```powershell
# Clone Site Script
$sourceSiteName = "forma-lux"
$targetSiteName = "visitlondon"
$targetDisplayName = "Visit London"

# Source paths
$sourceContentPath = "/sitecore/content/industry-verticals/$sourceSiteName"
$sourceMediaPath = "/sitecore/media library/Project/industry-verticals/$sourceSiteName"

# Target paths
$targetContentPath = "/sitecore/content/industry-verticals/$targetSiteName"
$targetMediaPath = "/sitecore/media library/Project/industry-verticals/$targetSiteName"

# Clone content tree
Write-Host "Cloning content tree..."
Copy-Item -Path $sourceContentPath -Destination $targetContentPath -Recurse

# Clone media library
Write-Host "Cloning media library..."
Copy-Item -Path $sourceMediaPath -Destination $targetMediaPath -Recurse

# Update site settings
$settingsItem = Get-Item -Path "$targetContentPath/Settings"
$settingsItem."App Name" = $targetSiteName
$settingsItem | Save-Item

Write-Host "Clone complete: $targetSiteName"
```

---

## Part 2: Configure Site Settings

After cloning, update the site configuration:

### 2.1 Update App Name

1. Navigate to `/sitecore/content/industry-verticals/visitlondon/Settings`
2. Set the **App Name** field to: `visitlondon`
3. Save the item

### 2.2 Update Site Grouping

1. Navigate to `/sitecore/content/industry-verticals/visitlondon/Settings/Site Grouping/visitlondon`
2. Verify/update the **RenderingHost** field to: `visitlondon`
3. Update the **Hostname** field if needed
4. Save the item

### 2.3 Update Site Definition

Verify the site definition has the correct values:

| Field | Value |
|-------|-------|
| Site Name | `visitlondon` |
| App Name | `visitlondon` |
| Rendering Host | `visitlondon` |
| Language | `en` |

---

## Part 3: Create Rendering Host

### 3.1 Clone the Directory

Copy an existing rendering host as a starting point:

```powershell
# From repository root
Copy-Item -Path "industry-verticals/retail" -Destination "industry-verticals/visitlondon" -Recurse
```

Or clone from another vertical that better matches your needs (e.g., `travel` for tourism sites).

### 3.2 Update Package.json

Edit `industry-verticals/visitlondon/package.json`:

```json
{
  "name": "visitlondon",
  "description": "Visit London - London's Official Visitor Guide demo site",
  ...
}
```

### 3.3 Create Environment File

Create `industry-verticals/visitlondon/.env.local`:

```env
NEXT_PUBLIC_DEFAULT_SITE_NAME=visitlondon
SITECORE_EDGE_CONTEXT_ID=your-context-id
NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID=your-context-id
SITECORE_EDITING_SECRET=your-editing-secret
```

### 3.4 Update Styling (Optional)

Customize the brand styling in:
- `src/assets/base/variables.css` - Colors, fonts, spacing
- `src/assets/base/base.css` - Base element styles
- `src/assets/main.css` - Font imports

### 3.5 Update README

Update `industry-verticals/visitlondon/README.md` with site-specific information.

---

## Part 4: Register Rendering Host

### 4.1 Update xmcloud.build.json

Add the new rendering host to `xmcloud.build.json`:

```json
{
  "renderingHosts": {
    "visitlondon": {
      "path": "./industry-verticals/visitlondon",
      "nodeVersion": "22.11.0",
      "jssDeploymentSecret": "YOUR_SECRET_HERE",
      "enabled": true,
      "type": "sxa",
      "buildCommand": "build",
      "runCommand": "next:start"
    }
  }
}
```

### 4.2 Add to Post Actions (Optional)

If you want content serialization, add to the `scsModules` array:

```json
{
  "postActions": {
    "actions": {
      "scsModules": {
        "modules": [
          "Project.VisitLondon-Content",
          "Project.VisitLondon-Media"
        ]
      }
    }
  }
}
```

---

## Part 5: Deploy and Verify

### 5.1 Local Testing

```powershell
cd industry-verticals/visitlondon
npm install
npm run dev
```

Visit http://localhost:3000 to verify the site loads.

### 5.2 Deploy to XM Cloud

1. Commit and push changes to your repository
2. XM Cloud Deploy will automatically build the new rendering host
3. Alternatively, manually trigger a deployment from the Deploy Portal

### 5.3 Assign Editing Host

After deployment:

1. Navigate to **Channels** in SitecoreAI
2. Select the Visit London site
3. Go to **Settings** > **Site hosts**
4. Set the **Editing host** field to: `visitlondon`

> **Important:** The editing host name is case-sensitive!

### 5.4 Verify in Pages Editor

1. Open the Visit London site in SitecoreAI
2. Navigate to a page
3. Click **Edit** to open in Pages
4. Verify components render correctly

---

## Part 6: Content Serialization (Optional)

To serialize content for version control:

### 6.1 Create Module Configuration

Create `authoring/items/industry-verticals/sites/visitlondon/visitlondon-content.module.json`:

```json
{
  "$schema": "../../../.sitecore/schemas/ModuleFile.schema.json",
  "namespace": "Project.VisitLondon-Content",
  "references": ["Project.IndustryVerticles"],
  "items": {
    "includes": [
      {
        "name": "visitlondon-home",
        "path": "/sitecore/content/industry-verticals/visitlondon/home",
        "scope": "DescendantsOnly",
        "allowedPushOperations": "CreateAndUpdate"
      },
      {
        "name": "visitlondon-data",
        "path": "/sitecore/content/industry-verticals/visitlondon/Data",
        "scope": "DescendantsOnly",
        "allowedPushOperations": "CreateAndUpdate"
      },
      {
        "name": "visitlondon-dictionary",
        "path": "/sitecore/content/industry-verticals/visitlondon/Dictionary",
        "scope": "DescendantsOnly",
        "allowedPushOperations": "CreateAndUpdate"
      },
      {
        "name": "visitlondon-presentation",
        "path": "/sitecore/content/industry-verticals/visitlondon/Presentation",
        "scope": "DescendantsOnly",
        "allowedPushOperations": "CreateAndUpdate"
      }
    ]
  }
}
```

### 6.2 Pull Content

```powershell
# Login to XM Cloud
dotnet sitecore cloud login

# Connect to environment
dotnet sitecore cloud environment connect --environment-id <your-env-id> --allow-write true

# Pull content
dotnet sitecore ser pull -i Project.VisitLondon-Content
```

---

## Sitecore Content Structure

After cloning, your site will have this structure:

```
/sitecore/content/industry-verticals/visitlondon/
├── Home                          ← Homepage
│   ├── [Page 1]
│   ├── [Page 2]
│   └── ...
├── Data/                         ← Shared datasources
│   ├── Hero Banners/
│   ├── Link Lists/
│   ├── Footers/
│   └── ...
├── Dictionary/                   ← Translation strings
├── Media/                        ← Content tree media references
├── Presentation/                 ← Page designs, partial designs
│   ├── Headless Variants/
│   ├── Page Designs/
│   ├── Partial Designs/
│   └── Styles/
└── Settings/                     ← Site configuration
    ├── Site Grouping/
    └── [Site Settings]
```

---

## Checklist

### Sitecore Content (Part 1-2)
- [ ] Clone site content tree
- [ ] Clone media library items
- [ ] Update App Name in Settings
- [ ] Verify Site Grouping configuration
- [ ] Test pages load in Content Editor

### Rendering Host (Part 3-4)
- [ ] Clone rendering host directory
- [ ] Update package.json name and description
- [ ] Create .env.local with correct site name
- [ ] Customize branding/styling
- [ ] Update README.md
- [ ] Add to xmcloud.build.json
- [ ] Test locally with `npm run dev`

### Deployment (Part 5)
- [ ] Commit and push changes
- [ ] Deploy to XM Cloud
- [ ] Assign editing host to site
- [ ] Verify in Pages editor
- [ ] Test published site

### Serialization (Part 6 - Optional)
- [ ] Create module configuration
- [ ] Pull content to local
- [ ] Commit serialized items

---

## Troubleshooting

### Site Not Loading

- Verify `NEXT_PUBLIC_DEFAULT_SITE_NAME` matches the Sitecore site name exactly
- Check `SITECORE_EDGE_CONTEXT_ID` is set correctly
- Ensure the site is published in Sitecore

### Editing Host Not Working

- Verify the editing host name is case-sensitive match
- Check the rendering host is enabled in xmcloud.build.json
- Ensure deployment completed successfully

### Components Not Rendering

- Verify component map is generated (`npm run sitecore-tools:generate-map`)
- Check component names match between Sitecore and code
- Ensure datasources are properly configured

### Media Not Loading

- Check media items are published
- Verify remote patterns in next.config.js include the media domain
- Ensure Content Hub connection is configured (if using DAM)

---

## Related Documentation

- [Sitecore AI - Clone a Site](https://doc.sitecore.com/sai/en/developers/sitecoreai/clone-a-site.html)
- [XM Cloud Rendering Hosts](https://doc.sitecore.com/xmc/en/developers/xm-cloud/rendering-hosts.html)
- [Content Serialization](https://doc.sitecore.com/xmc/en/developers/xm-cloud/serialization-in-sitecore.html)
- [Deployment Guide](./DEPLOYMENT-GUIDE.md)
- [Vercel Deployment](./VERCEL-DEPLOYMENT.md)

---

_Document Version: 1.0_  
_Last Updated: February 2026_
