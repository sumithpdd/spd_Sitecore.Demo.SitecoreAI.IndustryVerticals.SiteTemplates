---
name: brother-commerce
description: Brother UK demo cart, Add to cart on PDPs and product cards, OrderCloud checkout fallback, and CtaBanner return-visit discount. Use when editing Brother ProductDetail, ProductListing, SelectedProducts, RelatedProducts, Header cart, checkout, CtaBanner, or product cards.
---

# Brother commerce (demo cart + CtaBanner)

Full notes: [`docs/BROTHER.md`](../../../docs/BROTHER.md#demo-cart-add-to-cart). Host: `industry-verticals/brother`.

## Demo cart

Local `localStorage` (`brother-demo-cart`) — not a live OrderCloud API.

| File | Role |
|------|------|
| `src/lib/demo-cart.ts` | add / read / subscribe |
| `src/lib/AddToCartButton.tsx` | PDP (primary) and cards (compact) |
| `src/lib/ProductCard.tsx` | Image + title link + Add to cart |
| `src/lib/CartLink.tsx` | Header Cart + count |
| `src/components/ordercloud-checkout/OrderCloudCheckout.tsx` | Cart lines, or TN-243BK + DK-22205 if empty |

SKU / GBP come from `src/lib/products-catalog.ts` via page URL.

**Keep helpers in `src/lib/`.** `sitecore-tools` registers every folder under `src/components/` as a Sitecore component.

## Product cards

Use `ProductCard`. Do not wrap the whole card in `<a className="brother-card">` — the button cannot live inside the product link.

Surfaces: `ProductListing`, `SelectedProducts`, `RelatedProducts`. PDP: `ProductDetail` (Add to cart first; CMS CTAs stay outline).

## CtaBanner

Magenta bar — Title, DiscountCode, CtaLink. Rendering `{B40E0001-1111-4000-8000-000000000016}`. Datasource `Data/Cta Banners/PDP Return Discount` (`EVENT15`). Toolbox only; personalize in Pages. Do not add it to the ProductContent partial unless asked.

`headless-main` and `main` Allowed Controls (site `Presentation/Placeholder Settings` + project `layout/Placeholder Settings/Project/brother`) must include CtaBanner and the other page components, or Pages shows **No allowed components**. Same list on `Partial Design/ProductContent` (`sxa-productcontent`).

Generator field spec: `authoring/items/brother/scripts/fields/CtaBanner.json`.
