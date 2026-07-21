# Design

Captured from the existing Ionic theme (`packages/shared-theme/src/theme/variables.scss`, `global.scss`) — this is the live system, not a proposal.

## Theme

Dark-only. `body[color-theme="dark"]` is the single active theme; there is no light variant anywhere in the app. `.ios` and `.md` platforms each set their own background step:

- Background: `#111010` (iOS) / `#121212` (Android/MD)
- Elevated surface / cards / items: `#141414`
- Toolbar / tab bar: `#1f1f1f`
- Border: `rgba(255,255,255,0.14)` (dark-gray custom var `#1a1a1a` for stronger separators)
- Text: `#ffffff` primary, step-scale grays (`--ion-color-step-*`) for secondary/muted text

## Color

| Role | Hex | Usage |
|---|---|---|
| Primary (brand) | `#fe9000` | CTAs, active states, accents, focus |
| Primary shade | `#e07f00` | hover/pressed |
| Primary tint | `#fe9b1a` | soft accents, icon fills |
| Secondary | `#ffc455` | PRO/premium highlights |
| Success | `#2dd36f` | positive states |
| Warning | `#ffc409` | warnings, maintenance banner |
| Danger | `#eb445a` | destructive actions, errors |

Rule from brand-guidelines.md: max 2-3 active colors per screen. Orange carries conversion/action; everything else is neutral dark + white text.

## Typography

No custom web font loaded for body text — Ionic's default system stack (`-apple-system`, `Roboto`, `Segoe UI`, sans-serif). `Bakbak One` is preconnected in `index.html` but not applied anywhere in current SCSS (legacy/unused import — don't assume it's live). Buttons and emphasis rely on font-weight, not a second family.

## Layout & components

- Border radius: 8-16px for cards/buttons/inputs; up to 22px on full-screen modals (`.app-update-required-modal`, `.maintenance-modal`). Never 24px+ on a card.
- Shadows: soft, used sparingly — `0 4px 20px rgba(0,0,0,0.1)` for lifted cards, `0 20-24px 48-60px rgba(0,0,0,0.4-0.45)` for full-screen modal drama. No stacked border+shadow "ghost card" pattern.
- No nested cards. Prefer clean blocks + spacing over boxing everything.
- Spacing base: 4px unit; 20px mobile side padding; buttons min 48px tall (thumb targets for gym/one-hand use).
- z-index scale already implicit via Ionic layering (toolbar → content → modal → toast) — don't introduce arbitrary values.

## Motion

No animation library in use; existing modals (app-update, maintenance) are plain Ionic modal transitions. Follow impeccable's general motion rules (ease-out, <300ms, respect `prefers-reduced-motion`) for any new interactive elements — this hasn't been formalized in the codebase yet, so new work should set the standard rather than copy an absence.
