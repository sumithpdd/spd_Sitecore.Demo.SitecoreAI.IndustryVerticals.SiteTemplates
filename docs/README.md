# Documentation

Welcome to the Sitecore XM Cloud Industry Verticals documentation.

---

## Quick Links

| Document                                                    | Description                                                                    |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [📦 Components Reference](./COMPONENTS.md)                  | Complete list of all components across all verticals; includes OOTB Pages components |
| [🏗️ Project Structure](./PROJECT-STRUCTURE.md)              | Repository layout and architecture overview                                    |
| [🚀 Deployment Guide](./DEPLOYMENT-GUIDE.md)                | Step-by-step guide for XM Cloud deployment setup                               |
| [▲ Vercel Deployment](./VERCEL-DEPLOYMENT.md)               | Deploy industry verticals to Vercel                                            |
| [🔄 Site Cloning Guide](./SITE-CLONING-GUIDE.md)            | Clone existing sites to create new verticals (e.g., Visit London)              |
| [⚖️ Clyde & Co In Focus Guide](./CLYDEANDCO-IN-FOCUS-GUIDE.md) | In Focus 2.0 implementation: secure client portal replacing HighQ Publisher |
| [🧠 Sitecore Technologies](./SITECORE-TECHNOLOGIES.md)      | XM Cloud, Content SDK, Headless JSS, Sitecore AI, SXA reference                |
| [🤖 Sitecore AI MCP Setup](./SITECORE-AI-MCP-SETUP.md)      | Connect Cursor to XM Cloud via Marketer MCP for AI-assisted development        |
| [📋 Requirements Spec](./requirements/)                     | CMS requirements by functionality (12 documents)                               |
| [🎓 Junior Developer Guide](./JUNIOR-DEVELOPER-GUIDE.md)    | Sitecore concepts, templates, components explained for beginners               |
| [🥈 SitecoreSilver setup](./SITECORESILVER.md)              | Copenhagen Silver site — editing host, serialization, troubleshooting          |
| [🥈 Copenhagen Silver components](./COPENHAGEN-SILVER-SITE.md) | Full `SitecoreSilver*` component inventory and layout                       |
| [🚿 Bristan setup](./BRISTAN.md)                              | bristan.com clone — website-to-sitecore workflow, serialization, deploy        |
| [🏎️ Aston Martin](./ASTONMARTIN.md)                           | Automobile vertical — components, CDP affinities, Owner login, serialization   |
| [🎓 University](./UNIVERSITY.md)                              | University of Essex — Clearing Fast Track / We Are Essex; [component list](./COMPONENTS.md#university-university-of-essex) |
| [🖨️ Brother](./BROTHER.md)                                    | Brother UK — VC-500W labelling story; [component list](./COMPONENTS.md#brother-uk) |
| [🤖 Cursor agents](../.cursor/AGENTS.md)                    | Rules and skills for AI-assisted capture → Sitecore TSX/YAML workflows     |

---

## Industry Verticals Summary

| Vertical             | Site             | Components | Target Industry           | Status     |
| -------------------- | ---------------- | ---------- | ------------------------- | ---------- |
| 🏥 **Healthcare**    | Nova Medical     | 29         | Medical/Healthcare        | Base Site  |
| 🛋️ **Luxury Retail** | Essential Living | 41         | High-end Home Goods       | Base Site  |
| 🛒 **Retail**        | Forma Lux        | 54         | General Retail/E-commerce | Base Site  |
| ✈️ **Travel**        | SkyWings         | -          | Travel/Tourism            | Base Site  |
| ⚡ **Energy**        | GridWell         | -          | Energy/Utilities          | Base Site  |
| 🇬🇧 **Tourism**      | Visit London     | -          | Destination Marketing     | Base Site  |
| ⚖️ **Legal**         | Clyde & Co       | 54+        | Legal Knowledge Portal    | In Progress|
| 🥈 **SitecoreSilver** | Sitecore Silver Celebration | 12 | Event / marketing microsite | ✅ Active |
| 🚿 **Bristan** | Bristan (bristan.com) | 45+ | Taps & showers / bathroom | ✅ Active |
| 🏎️ **Aston Martin** | Aston Martin | 12+ | Automobile / luxury sports cars | ✅ Active |
| 🎓 **University** | University of Essex | 16+ | Higher education / Clearing Fast Track | ✅ Active |
| 🖨️ **Brother** | Brother UK | 10+ | Labelling / printing + search demo catalogue | ✅ Active |

---

## Getting Started

### Prerequisites

- Node.js 22.11.0+
- Docker Desktop (for local containers)
- Sitecore CLI
- XM Cloud environment (for full functionality)

### Local Development

```powershell
# Run Forma Lux (Retail) site locally
cd industry-verticals/retail
npm install
npm run dev

# Or run SkyWings (Travel) site
cd industry-verticals/travel
npm install
npm run dev

# Or choose another vertical: `healthcare`, `luxury-retail`, `bristan`, `astonmartin`, `university`, `brother`, `energy`
```

Visit http://localhost:3000

---

## New Content SDK app (search)

To start a **new** head with the current Content SDK (includes Sitecore Search — `useSearch` / `useInfiniteSearch`):

```bash
npx create-content-sdk-app nextjs
```

Sitecore also documents pinning the initializer:

```bash
npx create-content-sdk-app@latest nextjs
```

That scaffolds a Next.js Content SDK app (`nextjs` template). Add it to this repo (or keep it in its own repo), then wire `xmcloud.build.json` rendering hosts. Search APIs live in `@sitecore-content-sdk/nextjs/search`. Existing industry verticals in this repo still use older search patterns (for example university’s dummy index).

Official guides:

- [Create a Content SDK app locally](https://doc.sitecore.com/sai/en/developers/content-sdk/20/en/create-a-content-sdk-app-locally.html)
- [Search hooks for React and Next.js](https://doc.sitecore.com/sai/en/developers/content-sdk/20/search-hooks-for-react-and-next-js.html)

---

## New Project Setup

For setting up a new project with Industry Verticals:

1. [Deployment Guide](./DEPLOYMENT-GUIDE.md) - Complete XM Cloud setup with editing hosts
2. [Vercel Deployment](./VERCEL-DEPLOYMENT.md) - Deploy to Vercel for production

The general process:

1. Fork this repository
2. Create new project in XM Cloud Deploy Portal
3. Configure environment variables
4. Set up editing hosts for each site
5. Assign editing hosts to sites in SitecoreAI
6. Deploy to Vercel (optional)

---

## Additional Resources

### Official Documentation

- [Sitecore XM Cloud](https://doc.sitecore.com/xmc/en/developers/xm-cloud/)
- [Sitecore Content SDK](https://doc.sitecore.com/xmc/en/developers/content-sdk/)
- [Create a Content SDK app](https://doc.sitecore.com/sai/en/developers/content-sdk/20/en/create-a-content-sdk-app-locally.html) — `npx create-content-sdk-app nextjs` (includes search)
- [Sitecore AI](https://doc.sitecore.com/sai/en/developers/sitecoreai/)
- [Headless JSS](https://doc.sitecore.com/xmc/en/developers/jss/latest/jss-xmc/)
- [Serialization](https://doc.sitecore.com/xmc/en/developers/xm-cloud/serialization-in-sitecore.html)

### Key Concepts

- [Clone a Site (Sitecore AI)](https://doc.sitecore.com/sai/en/developers/sitecoreai/clone-a-site.html)
- [Component Development](https://doc.sitecore.com/xmc/en/developers/content-sdk/component-development.html)
- [SXA Headless Variants](https://doc.sitecore.com/xmc/en/developers/xm-cloud/headless-variants.html)
