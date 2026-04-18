# Lewisham Council–inspired brand tokens (DemoSite)

The **DemoSite** rendering host is styled as a **demo approximation** of the public [Lewisham Council](https://lewisham.gov.uk/) site: **dark blue** body and structural surfaces, **turquoise** links and primary actions, **Open Sans** typography, and cool grey borders—aligned with the council’s published brand palette (see [Lewisham Council Brand Guidelines PDF](https://communityfunding.lewisham.gov.uk/sites/default/files/uploads/NCIL%20ward/Grant%20Support%20Hub/Lewisham%20Council%20Brand%20Guidelines.pdf)).

This is **not** an official Lewisham asset pack. Adjust `src/assets/base/variables.css` if you need an exact match to internal brand assets.

## Typography

- **Open Sans** is loaded in `src/assets/main.css` (Google Fonts), matching the council’s web guidance (Open Sans on site; Foundry Form Sans in print).
- Mapped to `--font-heading` and `--font-body` in `variables.css`.

## Colour palette (CSS variables)

| Token | Role |
| ----- | ---- |
| `--color-foreground` / `--color-foreground-light` | Body text (dark / deep blue) |
| `--color-accent` / `--color-accent-dark` | Links, focus rings, primary CTA fill |
| `--color-surface-dark` | Footer, dark promo panels, `.container-dark-background` bands |
| `--color-border` | Cool grey dividers |
| `--color-primary` | Shadcn “primary” surfaces (navy) |

## Layout utilities

- `src/assets/components/header-footer-demosite.css` — header (including thin turquoise top accent), footer, and promo patterns (same structure as the Legal / University verticals for compatibility).

## Maintenance

- Prefer editing theme tokens in `variables.css` before overriding in components.
- After token changes, run `npm run format` and `npm run lint` from `industry-verticals/demosite`.
