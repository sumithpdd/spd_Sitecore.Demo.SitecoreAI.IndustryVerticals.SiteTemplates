# ASOS

SitecoreAI demo host mimicking [asos.com](https://www.asos.com/). Isolated collection `/sitecore/content/asos`, site `/sitecore/content/asos/asos`, rendering host `industry-verticals/asos`.

Full notes: **[docs/ASOS.md](../../docs/ASOS.md)**.

Brand: black + promo yellow `#ffd200`. Tokens: `src/assets/base/variables.css`.

## Run locally

```powershell
cd industry-verticals\asos
copy .env.remote.site .env.local
npm install
npm run sitecore-tools:generate-map
npm run dev
```

Open `http://localhost:3000/women` then `/petite-denim/cat/?cid=27108` and `/topshop/topshop-belle-paris-camisole-in-blue/prd/200415553`.
