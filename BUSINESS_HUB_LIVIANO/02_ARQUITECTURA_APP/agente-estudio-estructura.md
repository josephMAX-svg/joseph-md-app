# Arquitectura de `joseph-md-app` (Agente Estudio) + Plan para el Hub de Empresa

> Análisis del código real en `D:\joseph-md-app`. Sirve de guía para el otro chat que construirá el hub Business → Pulso → Liviano → franquicias.
> **Importante:** los nombres exactos de tokens (`Colors.*`, `FontSize.*`) deben verificarse contra `src/theme/tokens.ts` antes de usarlos — algunos ejemplos de abajo usan nombres aproximados (`Colors.red`, `FontSize.titleLg`, `FontSize.titleSm`) que pueden no existir literalmente. Usa los que existan.

---

## 1. Stack y arquitectura

- **Framework:** Expo 55 + React Native 0.83 + React 19 (TypeScript).
- **Deploy:** Vercel (`joseph-md-app.vercel.app`). Build: `expo export --platform web` → `/dist`.
- **Routing web:** `vercel.json` reescribe todas las rutas a `/index.html` (SPA). **No hay una ruta `/estudio` separada de verdad** — "Estudio" es simplemente un tab de la navegación; la URL `/estudio` cae en la SPA.
- **Navegación:** `src/navigation/AppNavigator.tsx` — Tab navigator con 6 pantallas: `Home`, `Estudio`, `Derma`, `Empresa`, `Investigación`, `Vitals`.
- **Responsive (`App.tsx`):**
  - Desktop (>1024px) → `DesktopLayout` (3 columnas: sidebar + centro + panel derecho).
  - Tablet (768–1024px) → `TabletLayout`.
  - Mobile (<768px) → `AppNavigator` (bottom tabs).

---

## 2. Sidebar y navegación

Archivo: `src/layouts/DesktopSidebar.tsx`.

```tsx
export type ScreenName = 'Home' | 'Estudio' | 'Derma' | 'Empresa' | 'Investigación' | 'Vitals';

const NAV_ITEMS = [
  { key: 'Home',          label: 'Home',     sublabel: 'Dashboard · 1,367 days', icon: '🏠' },
  { key: 'Estudio',       label: 'Study',    sublabel: 'APEX Engine · CZI --',   icon: '📚' },
  { key: 'Derma',         label: 'Derma',    sublabel: 'Fellowship · 0 papers',  icon: '💎' },
  { key: 'Empresa',       label: 'Business', sublabel: 'DTC Peru · Phase 0',     icon: '💼' }, // ← aquí va el hub
  { key: 'Investigación', label: 'Research', sublabel: 'Pipeline · 0 pub',       icon: '🔬' },
  { key: 'Vitals',        label: 'VITALS',   sublabel: 'Body · AI-measured',     icon: '🫀' },
];
```

Color accent por sección (`tokens.ts` → `SidebarAccents`): **Empresa = Ámbar `#F5A623`**.

**Para agregar/editar una sección:** (1) tipo en `ScreenName`, (2) objeto en `NAV_ITEMS`, (3) `case` en `DesktopLayout.tsx → renderCenterContent()`, (4) crear el archivo de contenido desktop.

---

## 3. Sección Business/Empresa actual

- Mobile: `src/screens/EmpresaScreen.tsx`. Desktop: `src/layouts/desktop/DesktopEmpresaContent.tsx`.
- Contenido hoy: "DTC Dermatología Perú" (nichos de acné/botox).
- **Toda la data es hardcodeada** en arrays dentro del componente: `NICHES`, `BUSINESS_AREAS`, `BENCHMARKS`, `PHASES`, `CHECKLIST`. **No usa Supabase.**
- Layout desktop: 2 columnas (`enterprise2Col`, izquierda `flex:3`, derecha `flex:2`).
- → **Conclusión: agregar empresas = agregar objetos de datos + un selector de tabs. Sin backend.**

---

## 4. Fuente de datos

- `src/lib/dataSource.ts`: patrón dual local (`localhost:3000`) vs Supabase (`src/lib/supabase.ts`).
- **Empresa NO usa dataSource** (todo hardcodeado). Estudio SÍ usa Supabase.
- Para el hub: crear `src/lib/empresaData.ts` con arrays/objetos tipados. Migrar a Supabase es opcional y futuro.

---

## 5. Design system y componentes reutilizables

Tokens (`src/theme/tokens.ts`): `Colors` (surface hierarchy navy + accents teal/amber/blue/coral/purple/green), `Spacing`, `FontSize`, `BorderRadius`.

| Componente | Archivo | Uso |
|---|---|---|
| `GlassCard` | `src/components/GlassCard.tsx` | Cards glassmorphism + border + hover |
| `AnimatedCounter` | `src/components/AnimatedCounter.tsx` | Count-up de métricas (0→N) |
| `CircularProgress` | `src/components/CircularProgress.tsx` | Anillo SVG 0–100% |
| `SkeletonLoader` | `src/components/SkeletonLoader.tsx` | Loading shimmer |

Grids desktop (`desktopStyles.ts`): `autoFitGrid` (`repeat(auto-fit, minmax(280px,1fr))`), `enterprise2Col`, `enterpriseColLeft (flex:3)`, `enterpriseColRight (flex:2)`.

---

## 6. PLAN PASO A PASO para insertar el Hub (archivos a crear/editar)

| Archivo | Acción | Descripción |
|---|---|---|
| `src/lib/empresaData.ts` | **CREAR** | Interfaces + arrays `EMPRESAS`, `FRANQUICIAS`, `ESTUDIO_MERCADO`, métricas por empresa |
| `src/screens/EmpresaHubScreen.tsx` | **CREAR** | Pantalla mobile con tabs (Pulso / Liviano / Franquicias) + subsecciones expandibles |
| `src/layouts/desktop/DesktopEmpresaHubContent.tsx` | **CREAR** | Desktop 2-column con GlassCards, métricas hero, estudio de mercado |
| `src/navigation/AppNavigator.tsx` | **EDITAR** | Cambiar componente de `EmpresaScreen` → `EmpresaHubScreen` |
| `src/layouts/DesktopLayout.tsx` | **EDITAR** | Import + `case 'Empresa': return <DesktopEmpresaHubContent/>` |
| `src/layouts/DesktopSidebar.tsx` | **EDITAR** | Sublabel de Empresa → "Pulso · Liviano · Franquicias" |

### 6.1 Estructura de datos sugerida (`src/lib/empresaData.ts`)

```tsx
export interface SubseccionEmpresa {
  id: string; nombre: string; icon: string; status: string;
  metricas?: Record<string, string | number>;
}
export interface Empresa {
  id: string; nombre: string; icon: string;
  estado: 'activa' | 'en_desarrollo' | 'inactiva';
  descCorta: string;
  metricas: { capRate: number; ventasMesUSD: number; flujoNetoMensual: number; gastoNetoMensual: number; margenGrande: number; };
  subsecciones: SubseccionEmpresa[];
}
export interface Franquicia { id: string; nombre: string; ubicacion: string; activa: boolean; }

// Liviano lleva las subsecciones completas: Logística, Web, Diseño, Marketing, Ventas, Finanzas, Oferta
// Pulso = matriz; franquicias = solo nombre + "próximamente".
```

### 6.2 Patrón de tabs (selector de empresa)

```tsx
const [activeTab, setActiveTab] = useState<'pulso'|'liviano'|'franquicias'>('liviano');
// fila de TouchableOpacity; el activo usa backgroundColor: Colors.surfaceContainerHighest
```

### 6.3 Patrón de métrica hero / GlassCard / grid

Ver `DesktopEmpresaContent.tsx` actual como plantilla exacta (métricas en `autoFitGrid`, GlassCard para bloques, hover web-only con `Platform.OS === 'web'`).

---

## 7. Notas de implementación

1. **Sin backend nuevo**: toda la data del hub vive en `empresaData.ts`. Un futuro `useSupabaseEmpresaData()` puede sincronizar después.
2. **Reutilizar, no reinventar**: `GlassCard`, `AnimatedCounter`, `CircularProgress` ya existen.
3. **Estilos web-only** (transición/hover/cursor) siempre detrás de `Platform.OS === 'web'`.
4. **Color de la sección = Ámbar** `#F5A623` para mantener coherencia con el sidebar.
5. Verificar nombres de tokens reales en `tokens.ts` antes de compilar.
