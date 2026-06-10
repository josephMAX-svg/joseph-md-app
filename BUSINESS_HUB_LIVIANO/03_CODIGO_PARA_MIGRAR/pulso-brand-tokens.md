# Design tokens Pulso / Liviano — para el hub

> Tokens de marca de Pulso/Liviano (del CRM) + cómo mapearlos al hub en `joseph-md-app`.
> El hub usa su propio design system "Clinical Precision" (dark navy). La sección Business = acento **Ámbar `#F5A623`**. Estos tokens de Pulso/Liviano se usan como **datos de marca** dentro del hub (chips, badges, referencia visual), no para reskinear toda la app.

## 1. Paleta Pulso Health Group

```css
:root {
  /* Neutros / superficies */
  --crema:           #F4F1EA;  /* fondos cálidos (portal paciente) */
  --crema-claro:     #FBF9F4;
  --navy-oscuro:     #0E0F11;  /* admin dark (Pulso core) */
  --navy-suave:      #16181C;
  --tinta:           #2A2620;  /* texto sobre crema */

  /* Acentos de marca */
  --oro-laton:       #C6A56B;  /* acentos, dividers, tags premium */
  --terracota-pirqa: #C45C3F;  /* marca PIRQA */
  --salvia:          #56624B;  /* marca LIVIANO (verde salvia) */
  --salvia-oscuro:   #3C4636;
}
```

## 2. Tipografías

| Rol | Familia | Uso |
|---|---|---|
| Display / titulares | Fraunces · Newsreader (serif) | Encabezados editoriales |
| Cuerpo / UI | Hanken Grotesk · Inter | Texto, labels |
| Mono / datos | IBM Plex Mono · JetBrains Mono | Números, tablas, KPIs |

## 3. Identidad por marca (para badges/chips en el hub)

| Marca | Color chip | Icono | Tono |
|---|---|---|---|
| Pulso (grupo) | `#0E0F11` / `#C6A56B` | 💓 | Tech, premium, clínico |
| LIVIANO | `#56624B` (salvia) + `#C6A56B` | ⚡ | Cálido premium-clínico |
| PIRQA | `#C45C3F` (terracota) | 🍲 | Andino, festivo |

## 4. Mapeo al hub (`joseph-md-app`)

- **No cambiar** el tema base del hub (navy `#081325`, Manrope+Inter). La sección Business ya usa Ámbar `#F5A623` como accent → mantenerlo para coherencia con el sidebar.
- Usar los colores de marca de arriba **solo** como color de chip/badge por empresa (`borderColor`, `backgroundColor` al 15-20% de opacidad), igual que el patrón existente `Colors.amber + '20'`.
- Ejemplo: chip de LIVIANO con salvia → `{ backgroundColor: '#56624B22', color: '#56624B' }` (pero verificar contraste sobre fondo navy; si no contrasta, usar el ámbar del hub).

> Regla: el hub manda en estética. Los tokens de Pulso son metadatos de marca, no un reskin.
