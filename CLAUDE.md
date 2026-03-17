# Council CMS — Claude Code Context

## Project overview
A CMS dashboard for council websites. Built as a design-to-code exercise from a Figma file.
Currently implementing: CMS Dashboard (overview) and Fees Manager (empty + list state).

## Stack
- **Framework**: React 19.2 + TypeScript 5.9
- **Bundler**: Vite 7.3
- **Styling**: Tailwind CSS v4.2 — see critical notes below
- **Components**: ShadCN/UI v4 (in `src/components/ui/` — do not modify these)
- **State**: Zustand 5.0 (`src/store/store.ts`)
- **Routing**: React Router DOM 7.13, basename `/fees-manager`
- **Dev server**: port 5173

## Critical Tailwind v4 rules
Tailwind v4 cannot infer whether `var()` is a color or a font-size. Always use type hints:
- Font sizes: `text-[length:var(--text-sm)]` ✅ — never `text-[var(--text-sm)]` ❌
- Colors: `text-[color:var(--slate-300)]` ✅ — never `text-[var(--slate-300)]` ❌

## Design tokens (defined in `src/index.css`)

### Colour palette
```
--slate-50:  #f8fafc   (lightest — primary text on dark)
--slate-100: #f1f5f9
--slate-200: #e2e8f0
--slate-300: #cbd5e1   (secondary text)
--slate-400: #94a3b8   (muted / table headers)
--slate-600: #475569
--slate-700: #334155   (raised surfaces)
--slate-800: #1e293b   (card backgrounds)
--slate-900: #0f172a   (page background)
--success:          #007a36
--destructive-figma: #b3001b
```

### Type scale
```
--text-h1:   3rem      (48px — metric values, Switzer)
--text-h4:   1.5rem    (24px — page/section headings, Switzer)
--text-h6:   1.125rem  (18px — card headings, DM Sans)
--text-base: 1rem      (16px — card body, DM Sans)
--text-sm:   0.875rem  (14px — UI / body text, Inter)
--text-xs:   0.75rem   (12px — captions, table headers, Inter)
```

### Font families
```
--font-sans:     "Inter"    — default body/UI font
--font-dm:       "DM Sans"  — card headings, subtitles
--font-switzer:  "Switzer"  — page titles, large metric numbers
```
Apply non-default fonts via inline style: `style={{ fontFamily: 'var(--font-dm)' }}`

### Shadows & elevation
```
--shadow-card-default:  0 1px 4px rgba(0,0,0,0.15)
--shadow-header:        0 4px 24px rgba(0,0,0,0.3)
--shadow-dropdown:      0 8px 20px rgba(0,0,0,0.25)
--shadow-floating:      0 4px 12px rgba(0,0,0,0.3)
```

## Interaction conventions
Every interactive element must have:
1. A hover state
2. `transition-colors duration-150` (or `transition-all duration-150` for brightness changes)

### Hover patterns by element type
| Element | Hover class |
|---|---|
| Ghost/text buttons | `hover:text-[color:var(--slate-50)]` |
| Outline buttons (dark bg) | `hover:bg-[rgba(255,255,255,0.06)]` |
| Icon buttons (rounded) | `hover:bg-[rgba(255,255,255,0.08)]` |
| Light CTA buttons (slate-300 bg) | `hover:brightness-95` |
| Table rows | `hover:bg-[rgba(255,255,255,0.04)]` |
| Cards (subtle) | `hover:brightness-[1.03]` |
| Dark surface buttons | `hover:bg-[var(--slate-600)]` |

## Border conventions
- **Cards and panels**: `border border-[rgba(255,255,255,0.1)]`
- **Table borders and filter buttons**: `border border-[rgba(255,255,255,0.07)]`
- **Legacy hard borders** (`border-[var(--slate-600)]`, `border-[var(--slate-700)]`) — replace these when encountered

## Table header convention
Table `<th>` elements use: `text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[color:var(--slate-400)]`

## Component patterns

### Cards
```tsx
<div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[var(--slate-800)] shadow-[var(--shadow-card-default)] px-6 py-6 flex flex-col gap-6">
```

### Page title (h2)
```tsx
<h2
  className="text-[length:var(--text-h4)] font-normal leading-tight tracking-[0.24px] text-[color:var(--slate-200)]"
  style={{ fontFamily: 'var(--font-switzer)' }}
>
```

### Section/card heading (h3)
```tsx
<h3
  className="text-[length:var(--text-h6)] font-medium leading-snug text-[color:var(--slate-50)]"
  style={{ fontFamily: 'var(--font-dm)' }}
>
```

### Outline button (dark surface)
```tsx
<button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.07)] text-[length:var(--text-sm)] font-medium text-[color:var(--slate-300)] hover:bg-[rgba(255,255,255,0.06)] hover:text-[color:var(--slate-50)] transition-colors duration-150">
```

### Light CTA button
```tsx
<button className="flex items-center gap-2 w-fit px-4 py-2 rounded-md bg-[var(--slate-300)] text-[length:var(--text-sm)] font-medium text-[color:var(--slate-800)] hover:brightness-95 transition-all duration-150">
```

## File structure
```
src/
  components/
    ui/             ← ShadCN — do not touch
    AppLayout.tsx   ← header, nav tabs, help button
    MetricsCard.tsx ← stat cards on dashboard
    TrendChip.tsx   ← up/down percentage badge
    MenuItem.tsx    ← dropdown menu item
    EditFeeDialog.tsx
    DeleteFeeDialog.tsx
  pages/
    Dashboard.tsx   ← Figma node 37:1636
    FeesManager.tsx ← Figma node 60:1485 (empty state)
    FeesList.tsx    ← fees table with edit/delete
    NewUpdate.tsx
    UpdateDetail.tsx
  store/
    store.ts        ← Zustand store for fees + updates
  index.css         ← all design tokens live here
  main.tsx
```

## Figma reference
- File key: `NZKq7OKJFGpDweByzw7VBR`
- Dashboard: node `37:1636`
- Empty Fees Manager: node `60:1485`

## What NOT to do
- Do not modify files in `src/components/ui/`
- Do not add inline `style` for anything other than `fontFamily` — use Tailwind classes
- Do not use hard-coded hex colours — use the CSS variables
- Do not use `text-[var(--text-*)]` without the `length:` type hint
- Do not use `text-[var(--slate-*)]` without the `color:` type hint
- Do not install new dependencies without checking if ShadCN already has the component
