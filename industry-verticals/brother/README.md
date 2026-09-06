# Brother UK

SitecoreAI vertical for **Brother** labelling / VC-500W story. Site key: `brother`.

See [docs/BROTHER.md](../../docs/BROTHER.md) and [component list](../../docs/COMPONENTS.md#brother-uk).

```bash
npm install
npm run dev
```

Demo: `/?utm_campaign=label-printer` swaps the home hero to the VC-500W.

**Add to cart** is on PDPs and product cards (`lib/ProductCard.tsx`). The header **Cart** count and `/checkout/supplies` read `lib/demo-cart.ts` (localStorage). Empty cart still shows the default toner/DK demo lines.

**CtaBanner** (magenta return-visit / discount-code bar) is in the Brother toolbox — bind `Data/Cta Banners/PDP Return Discount` and personalize in Pages. Not on every PDP by default.

Agent skill: [`.cursor/skills/brother-commerce/SKILL.md`](../../.cursor/skills/brother-commerce/SKILL.md).
