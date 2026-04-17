# Anglia Ruskin University (ARU)–inspired brand tokens (University vertical)

The **University** rendering host is styled to feel aligned with public higher-education sites such as [Anglia Ruskin University](https://www.aru.ac.uk/) and peers like [Liverpool John Moores University](https://www.ljmu.ac.uk/): confident purple typography, magenta accents, and generous white space.

This is a **demo approximation** for local and XM Cloud previews—it is not an official ARU asset pack. Tweak `src/assets/base/variables.css` when official guidelines are available.

## Typography

- **Source Sans 3** is loaded in `src/assets/main.css` (Google Fonts).
- Mapped to `--font-heading` and `--font-body` in `variables.css`.

## Colour palette (CSS variables)

| Token                                    | Approx. role                  |
| ---------------------------------------- | ----------------------------- |
| `--color-foreground`                     | Body text on light surfaces   |
| `--color-accent` / `--color-accent-dark` | Links, CTAs, focus rings      |
| `--color-surface-dark`                   | Footer / dark promo panels    |
| `--color-background-accent`              | Soft lavender-tint page bands |
| `--color-accent-light`                   | Highlights on dark surfaces   |

## Layout utilities

- `src/assets/components/header-footer-university.css` — header, footer, promo card, and stacked promo patterns (same structure as the Legal vertical; class names unchanged for compatibility).

## Maintenance

- Prefer editing theme tokens in `variables.css` before overriding in components.
- After token changes, run `npm run format` and `npm run lint` from `industry-verticals/university`.
