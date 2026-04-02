# Joseph MD — Design System: Clinical Precision & Tonal Depth

> Extracted from **Stitch MCP Project** `14804308748765322223`
> Design System: **Clinical Precision** (`assets/5d883d3d628b42178d535b93eb8a3a27`)
> Device: Mobile · Color Mode: Dark · Font Strategy: Manrope + Inter

---

## 1. Creative North Star — "The Sovereign Surgeon"

In a clinical environment, interface clutter is cognitive load. This system moves away from the "generic medical app" look — harsh white cards, thin blue borders — toward a **sophisticated, high-end editorial experience**.

Core principles:
- **Atmospheric Authority** — deep monochromatic foundation lets critical data glow
- **Tonal Layering** — elevation via background shifts, not drop shadows
- **Intentional Asymmetry** — vital metrics are hierarchically dominant
- **No-Line Philosophy** — borders are replaced by tonal transitions

---

## 2. Color Palette

### Surface Hierarchy (Dark Navy Bedrock)

| Token                       | Hex       | Usage                                |
|-----------------------------|-----------|--------------------------------------|
| `surface`                   | `#081325` | App background, base layer           |
| `surface-dim`               | `#081325` | Dimmed areas, recessive backgrounds  |
| `surface-container-lowest`  | `#040E20` | Deepest nesting level                |
| `surface-container-low`     | `#111C2E` | Main body, card backgrounds          |
| `surface-container`         | `#152032` | Interactive zones, content blocks    |
| `surface-container-high`    | `#202A3D` | Elevated cards, hover states         |
| `surface-container-highest` | `#2B3548` | Active states, floating modals       |
| `surface-bright`            | `#2F394D` | Maximum surface brightness           |

### Primary & Text Colors

| Token                 | Hex       | Usage                              |
|-----------------------|-----------|------------------------------------|
| `primary`             | `#BCC7DF` | Primary text, links                |
| `primary-container`   | `#0B1628` | Primary backgrounds                |
| `on-surface`          | `#D8E3FC` | Body text (AAA on surface-dim)     |
| `on-surface-variant`  | `#C5C6CD` | Muted labels, secondary text       |
| `on-primary`          | `#263144` | Text on primary elements           |
| `outline`             | `#8F9097` | Ghost borders (use at 30% opacity) |
| `outline-variant`     | `#45474C` | Ghost borders (use at 20% opacity) |

### Accent Colors (Functional Signals)

| Role          | Token          | Hex       | Usage                          |
|---------------|----------------|-----------|--------------------------------|
| **Teal**      | `secondary`    | `#52DAD7` | Stable metrics, success states |
| **Teal Dark** | `secondary-container` | `#00B0AE` | Progress bar tracks  |
| **Coral**     | `tertiary`     | `#FFB3B0` | Critical alerts, urgent items  |
| **Coral Dark**| `tertiary-container` | `#360004`| Alert backgrounds          |
| **Error**     | `error`        | `#FFB4AB` | Form errors                    |

### App-Specific Accent Mapping

| Color     | Hex       | Screen/Usage                         |
|-----------|-----------|--------------------------------------|
| Blue      | `#2E7CF6` | Primary actions, MIR domination      |
| Teal      | `#0FD4A0` | Study metrics, APEX                  |
| Amber     | `#F5A623` | Business (Empresa), deep work timer  |
| Coral     | `#F56342` | Alerts, errors, emergency protocols  |
| Purple    | `#8B5CF6` | Derma fellowship, professional       |
| Green     | `#10B981` | Publication counters                 |

---

## 3. Typography

### Font Strategy (Dual-Font)

| Role               | Font      | Usage                                    |
|--------------------|-----------|------------------------------------------|
| Display & Headlines| **Manrope** | Patient names, diagnostic summaries, hero metrics |
| Body & Labels      | **Inter**   | Clinical notes, descriptions, metadata   |

### Type Scale

| Token          | Size    | Usage                                     |
|----------------|---------|-------------------------------------------|
| `display-sm`   | 2.25rem | Hero metric values (Heart Rate, countdown)|
| `headline-lg`  | 2rem    | Patient names, primary summaries          |
| `headline-sm`  | 1.5rem  | In-card primary metrics                   |
| `body-md`      | 0.875rem| Clinical notes, descriptions              |
| `label-md`     | 0.75rem | Action chips, button labels               |
| `label-sm`     | 0.6875rem| Unit descriptors (ALL-CAPS), muted labels|

### The Power of Scale Rule
Create drama by pairing `display-sm` (2.25rem) metric directly next to `label-sm` (0.6875rem) unit descriptor in all-caps. High-contrast scale eliminates the need for bold colors.

---

## 4. Elevation & Depth

### Rules (NO DROP SHADOWS)
1. **Tonal Layering** — Elevate by shifting background token, not adding shadow
2. **Ghost Glow** — For FABs/modals: `backdrop-blur: 12-20px` + `outline-variant` at 10% opacity
3. **Ghost Border** — If boundary strictly required: `outline-variant` at **20% opacity only**

### Layer Map
```
[Base]     surface (#081325)
  └─ [Mid]   surface-container (#152032)
       └─ [Top]  surface-container-highest (#2B3548)
```

---

## 5. Shape & Spacing

| Property     | Value                 |
|--------------|-----------------------|
| Roundness    | `ROUND_FOUR` (0.375rem / 6px) |
| Spacing Scale| 1x (default)          |
| Card Gap     | `spacing-6` (1.3rem)  |

### The No-Line Rule
- **NEVER** use `1px solid` borders for sectioning
- Define boundaries via background shifts or tonal transitions
- Cards separated by whitespace, never by dividers

---

## 6. Component Patterns

### Buttons
| Type      | Background                | Text Color       | Border                      |
|-----------|---------------------------|------------------|-----------------------------|
| Primary   | `secondary` (#52DAD7)     | `on-secondary` (#003736) | None                 |
| Secondary | Transparent               | White            | `outline` at 30% opacity    |
| Chip      | `surface-container-highest`| `on-surface`    | None                        |

### Progress Bars
- Height: 4px flat
- Track: `secondary-container` (#00B0AE)
- Value: `secondary` (#52DAD7)

### Cards
- No divider lines between items
- Separate with `spacing-6` vertical whitespace
- Metric "Hero" pattern: large value + small all-caps label

### Input Fields
- Minimalist, no box container
- Fill: `surface-container-low`
- Bottom border: `outline-variant` 2px → animates to `primary` on focus

---

## 7. Stitch Screen References

| Screen                            | Screen ID                                  |
|-----------------------------------|--------------------------------------------|
| Home Dashboard - Mayo Clinic Status | `cef4ba5b897c4f98846e90d0924e41db`       |
| Estudio - Phase 0 Status         | `a562068cfbc24873a776afe8b06553a5`         |
| Derma Fellowship Tracker (EN)    | `d75e66373d76413faac12db943b49a58`         |
| Empresa - Pre-Launch Dashboard   | `fbe8d5e4d1d441cd81a5e836393722ef`         |
| Investigación - Research Pipeline| `3ccf8cc0f5614faea25b7fddeecf63d5`         |

---

## 8. Do's and Don'ts

### ✅ Do
- Use whitespace as a structural element
- Use `secondary` (Teal) for positive outcomes, `tertiary` (Coral) for action required
- Ensure all text on `surface-dim` meets AAA contrast (use `on-surface` #D8E3FC)
- Use tinted neutrals, never pure black/white

### ❌ Don't
- Use pure `#000000` or `#FFFFFF`
- Use `1px` dividers between list items
- Use standard Material drop shadows
- Use decorative borders — only Ghost Borders at 20% opacity when accessible
