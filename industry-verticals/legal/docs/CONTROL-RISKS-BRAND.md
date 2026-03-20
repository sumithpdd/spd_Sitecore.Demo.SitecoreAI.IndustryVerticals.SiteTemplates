# Control Risks–inspired brand tokens (Legal vertical)

The Legal rendering host is styled to align with the public [Control Risks](https://www.controlrisks.com/) site: professional risk-consultancy look, Open Sans typography, and a teal / deep-navy palette.

This is a **demo approximation** for local and XM Cloud previews—not an official Control Risks asset pack. Values were derived from the live site’s styles (e.g. `/_styles/styles.css`) and Google Fonts usage.

## Typography

| Item | Value |
|------|--------|
| Family | **Open Sans** (system fallbacks: `ui-sans-serif`, `system-ui`, sans-serif) |
| Weights loaded | 300, 400, 600, 700 (regular + italic) |
| Headings / body | Both use `--font-heading` / `--font-body` → Open Sans (see `src/assets/base/variables.css`) |

Font import: `src/assets/main.css` (Google Fonts).

## Color tokens (`@theme` in `src/assets/base/variables.css`)

| Token | Hex | Role |
|-------|-----|------|
| `--color-foreground` | `#053747` | Primary headings and body emphasis |
| `--color-foreground-light` | `#567481` | Body copy (via `base.css` paragraph styles) |
| `--color-foreground-muted` | `#4d7581` | Muted UI text |
| `--color-foreground-secondary` | `#8fa9b0` | Secondary labels, footer meta |
| `--color-background` | `#ffffff` | Page surface |
| `--color-background-accent` | `#f4f9fb` | Soft tinted panels |
| `--color-background-muted` | `#eef4f6` | Muted blocks, scroll tracks |
| `--color-accent` | `#059dc1` | Primary brand teal, links, primary buttons, promo banner strip |
| `--color-accent-dark` | `#04758f` | Hover / darker teal |
| `--color-accent-coral` | `#e83c4e` | Secondary emphasis (optional; maps to common coral on site) |
| `--color-surface-dark` | `#021217` | Footer and dark promo panels |
| `--color-success` | `#008375` | Success (teal-green) |
| `--color-warning` | `#fecd21` | Warning (aligned with yellow accents on site) |
| `--color-danger` | `#e83c4e` | Error / destructive |
| `--color-border` | `#d9e4e8` | Default borders |
| `--color-accent-light` | `#30a8c7` | Lighter teal (icons, hovers on dark panels) |
| `--color-primary` / `--color-primary-foreground` | `#059dc1` / `#ffffff` | Primary button semantics (alias of accent on white) |
| `--color-muted` / `--color-muted-foreground` | `#eef4f6` / `#4d7581` | Muted surfaces & helper / label text (forms, shadcn) |
| `--color-ring` | `#059dc1` | Focus rings |
| `--color-destructive` / `--color-destructive-foreground` | `#e83c4e` / `#ffffff` | Destructive actions (shadcn) |

Tailwind utilities follow the token names (e.g. `text-accent`, `bg-surface-dark`, `border-border`, `text-muted-foreground`, `text-primary-foreground`).

**Buttons & links:** Shared classes in `src/assets/base/components-common.css` use brand teal for primary actions (`main-btn`, `arrow-btn`), outline/hover teal for `secondary-btn`, `outline-btn`, and `simple-btn`, and `surface-dark` for inverted chips.

## Components that use the dark surface

- **Footer** (`.dwf-footer`): `bg-surface-dark`
- **Promo default** content column (`.dwf-promo-card .promo-content`): `bg-surface-dark`
- **Promo stacked** subtitle banner: `bg-accent` (brand teal)

## Related files

- `src/assets/base/variables.css` — theme tokens
- `src/assets/main.css` — font imports + Tailwind entry
- `src/assets/components/header-footer-legal.css` — header / footer / promo layout classes
- `src/assets/base/base.css` — base element styles (headings, `.eyebrow`, etc.)

## Maintenance

When refreshing tokens from the marketing site, inspect computed styles on key blocks (header, primary CTA, footer) and update `variables.css` plus this document. Prefer small, documented deltas over one-off hex values in components.
