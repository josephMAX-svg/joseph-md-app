# PROMPT — Construir el Hub de Empresa (Business → Pulso → Liviano → Franquicias)

> **Cómo usar este archivo:** abre un chat de Claude Code **en la carpeta `D:\joseph-md-app`** y pega todo el bloque de abajo (desde "## CONTEXTO" hasta el final). Todos los archivos de contexto referenciados están en `D:\CRM_PULSO_v3.1\BUSINESS_HUB_LIVIANO\` (misma máquina, rutas absolutas).

---

## CONTEXTO

Trabajas en `D:\joseph-md-app`: una app **Expo + React Native Web** (TypeScript) desplegada en `joseph-md-app.vercel.app`. Tiene un sidebar con secciones: Home, Study, **Business (clave interna `Empresa`)**, Derma, Research, Vitals.

Tu tarea: convertir la sección **Business/Empresa** en un **Hub de Empresa** que sea el "centro de control / segundo cerebro" del dueño (Dr. Joseph Soto Tocas) para su holding **Pulso Health Group**. Estructura:

- **Pulso** = grupo matriz.
- **LIVIANO** = línea ancla (programa médico de pérdida de peso GLP-1, Huancayo). **Va detallada a fondo.**
- **PIRQA** = línea gastronómica (ya en producción). Vista resumida.
- **Franquicias futuras** = solo el nombre (placeholder), listas para llenar después.

### Lee primero estos archivos de contexto (en `D:\CRM_PULSO_v3.1\BUSINESS_HUB_LIVIANO\`)

1. `02_ARQUITECTURA_APP/agente-estudio-estructura.md` — **cómo está construida esta misma app** y el plan paso a paso (archivos a crear/editar, componentes reutilizables). **Sigue este plan.**
2. `03_CODIGO_PARA_MIGRAR/empresaData.liviano.ts` — **datos reales** de Pulso/Liviano (empresas, KPIs, oferta, links). **Cópialo como base de `src/lib/empresaData.ts`.**
3. `03_CODIGO_PARA_MIGRAR/pulso-brand-tokens.md` — tokens de marca.
4. `01_INVESTIGACION/alex-hormozi-metodologia.md` — metodología de oferta/leads (para textos de "Directrices & Tips").
5. `01_INVESTIGACION/organizacion-empresa-kpis-logistica.md` — definición de cada KPI y el tablero verde/ámbar/rojo.
6. `01_INVESTIGACION/competidores-elite-telehealth-glp1.md` — benchmarks (Hims & Hers, LillyDirect, etc.).

---

## SOBRE REUTILIZAR CÓDIGO Y DATOS (política de máxima calidad)

Objetivo: la mejor app posible, construida de forma autónoma. Tenés libertad para reutilizar lo que mejore el resultado. Una sola restricción técnica real:

- **UI:** esta app es Expo / React Native Web. Los componentes de UI del CRM `pulso-crm` (Next.js + Tailwind + shadcn/Radix, basados en `<div>`/CSS) **no compilan** en React Native → **no los importes tal cual**; replicá su diseño con primitivas RN (`View`/`Text`/`StyleSheet`) y los componentes propios de esta app (`GlassCard`, etc.). No es límite de alcance, es solo compatibilidad de stack.
- **Lógica y datos: SÍ, reutilizá.** Todo TypeScript agnóstico de plataforma (tipos, cálculos, helpers, queries Supabase, el modelo de datos) del CRM se puede portar/copiar si mejora la app. El CRM está en `D:\CRM_PULSO_v3.1\06_REPOS_DESTINO\pulso-crm` (podés leerlo).
- **Datos en vivo (recomendado si suma):** esta app ya tiene cliente Supabase en `src/lib/supabase.ts` (lo usa la sección Estudio). Si mejora el hub, conectá las métricas a la **misma base Supabase del CRM** para mostrar datos reales (PIRQA ya tiene data; Liviano está pre-lanzamiento). Empezá con los datos estructurados de `empresaData.ts` y, si aporta, agregá un hook `useSupabaseEmpresaData()` para los números en vivo. Vos decidís qué da el mejor resultado.

En resumen: UI nativa, reutilizá toda la lógica/datos que ayude, y priorizá **calidad y autonomía**.

---

## QUÉ CONSTRUIR

### A. Estructura de navegación del hub

La sección Business abre en un **selector de empresas** (tabs o tarjetas): `Pulso` · `LIVIANO` · `PIRQA` · `Franquicias`. Por defecto, abre en **LIVIANO**.

Al entrar a **LIVIANO**, una **sub-navegación** (tabs internos) con 7 paneles, cada uno alimentado por `empresaData.ts`:

| Panel | Qué muestra | Fuente de datos |
|---|---|---|
| **1. Cockpit / KPIs** | Grid de tarjetas-métrica de un vistazo: MRR, ventas/mes, ticket, LTV, márgenes, flujo neto, gasto bruto, COGS, CAC, LTV:CAC, payback, CPL, conversión, ROAS, churn, permanencia, stock, costo/orden. Cada una con su **semáforo** (verde/ámbar/rojo/neutro) y hint (fórmula). | `LIVIANO_KPIS` |
| **2. Oferta (Grand Slam)** | La tesis + ancla bariátrica; la **escalera de precios** (Despegue→Mantenimiento); los **tiers** (Fundador/Estándar/Concierge/Tirzepatida/Prepago); el **value stack** (S/6,360 valor vs S/3,870 precio); los **20+ bonos** en 3 grupos (anunciados/reserva/sorpresa); las **4 garantías**; el **mapa de objeciones**. | `LIVIANO_OFERTA` |
| **3. Marketing & Estudio de mercado** | Tabla "qué afiche funciona": por creativo → impresiones, CTR, hook rate, CPL, CAC, estado (ganador/prueba/matar). Encabezado con regla kill/scale. | `ESTUDIO_MERCADO` |
| **4. Ventas & Adquisición** | Los Core Four (warm/contenido/cold/ads), métodos de adquisición, embudo consulta→programa (conversión objetivo >40%). | `alex-hormozi-metodologia.md` (resumen embebido) + KPIs de marketing |
| **5. Logística & GLP-1** | Modelo de abastecimiento (magistral vs marca), cadena de frío, costo por orden, inventario; y los **pendientes críticos** (cotización Sterilelabs, DIGEMID). | `LIVIANO_PENDIENTES` + `organizacion-...md` Parte 4 |
| **6. Web & Diseño** | Mapa de la web Pulso/Liviano: lista de **todos los links** agrupados (públicas, CRM, Liviano, portal paciente `/p/[token]`, portal médico `/m/[token]`, webhooks). Cada link clickable → abre `https://pulso-crm.vercel.app/...`. | `PULSO_LINKS` |
| **7. Directrices & Tips** | Tarjetas con las reglas accionables de Hormozi + mejores prácticas de competidores (oferta, leads, organización, logística). | `01_INVESTIGACION/*` (resumen embebido) |

**Pulso (matriz):** vista resumen del grupo (tesis, marcas, link al CRM, KPIs consolidados placeholder).
**PIRQA:** vista resumida (reservas, links, estado producción).
**Franquicias:** grid de tarjetas con los nombres placeholder + badge "Próximamente".

### B. Archivos a crear / editar (sigue el plan del doc de arquitectura)

**Crear:**
- `src/lib/empresaData.ts` ← copiar de `empresaData.liviano.ts` (ajustar imports si hace falta).
- `src/screens/EmpresaHubScreen.tsx` ← versión mobile (tabs empresa + sub-tabs Liviano + paneles).
- `src/layouts/desktop/DesktopEmpresaHubContent.tsx` ← versión desktop (2 columnas, GlassCards).

**Editar:**
- `src/navigation/AppNavigator.tsx` → el tab `Empresa` usa `EmpresaHubScreen` (en vez de `EmpresaScreen`).
- `src/layouts/DesktopLayout.tsx` → `case 'Empresa': return <DesktopEmpresaHubContent/>` (+ import).
- `src/layouts/DesktopSidebar.tsx` → sublabel de `Empresa` → `'Pulso · Liviano · Franquicias'`.

> Conserva `EmpresaScreen.tsx` y `DesktopEmpresaContent.tsx` actuales (no los borres; pueden quedar como referencia o archivarse).

---

## REGLAS DE DISEÑO (obligatorias)

Respeta el design system existente (`D:\joseph-md-app\DESIGN.md`, "Clinical Precision"):

1. **Reutiliza componentes existentes**: `GlassCard` (`src/components/GlassCard.tsx`), `AnimatedCounter`, `CircularProgress`. **No reinventes.**
2. **Tokens reales**: usa solo nombres que existan en `src/theme/tokens.ts` y `src/theme/desktopStyles.ts`. **Antes de compilar, abre `tokens.ts` y verifica** (`Colors.amber`, `Colors.onSurface`, `Colors.muted`, `Spacing`, `FontSize`, `BorderRadius`, `DesktopColors.glass`, `desktopStyles.enterprise2Col`, etc.). Si un nombre del data file o de los ejemplos no existe, usa el equivalente real.
3. **Color de la sección = Ámbar `#F5A623`** (es el accent de Business en el sidebar). Semáforos: verde `Colors.green`/`#10B981`, ámbar `#F5A623`, rojo `Colors.coral`/`#F56342`, neutro `Colors.muted`.
4. **Sin drop shadows**: elevación por capas tonales (navy). Sin divisores `1px`; separa con whitespace.
5. **Estilos web-only siempre detrás de `Platform.OS === 'web'`** (transition, cursor, hover, onMouseEnter/Leave) para no romper mobile.
6. **Responsive**: mobile (<768), tablet (768–1024), desktop (>1024). Layout desktop 2 columnas (`enterprise2Col`: izquierda `flex:3`, derecha `flex:2`); mobile en columna.
7. Patrón de tarjeta-métrica "hero": valor grande + label pequeño en mayúsculas (ver `DesktopEmpresaContent.tsx` actual como plantilla exacta).

---

## CRITERIOS DE ACEPTACIÓN

- [ ] La sección Business abre en el selector de empresas; LIVIANO por defecto.
- [ ] LIVIANO muestra los 7 paneles, todos poblados desde `empresaData.ts` (sin texto hardcodeado duplicado).
- [ ] Cockpit: las 18 métricas con su semáforo y hint.
- [ ] Oferta: escalera de precios, tiers, value stack, los 20+ bonos (3 grupos), 4 garantías, objeciones — todo visible.
- [ ] Marketing: tabla de creativos con estados ganador/prueba/matar.
- [ ] Web & Diseño: todos los links de `PULSO_LINKS`, clickables, agrupados.
- [ ] PIRQA y Franquicias renderizan (resumen / placeholders).
- [ ] Compila sin errores TS; funciona en mobile, tablet y desktop.
- [ ] Estética coherente con el resto de la app (navy + ámbar, GlassCards, sin shadows).
- [ ] No se rompió ninguna otra sección (Home/Study/Derma/Research/Vitals intactas).

## VERIFICACIÓN FINAL

Ejecuta la app (`npm run web` o el script del proyecto) y confirma visualmente cada panel. Reporta cualquier token que no existía y tuviste que sustituir. Haz `expo export --platform web` para confirmar que el build de producción pasa.

---

### Resumen de una línea para arrancar
"Lee `D:\CRM_PULSO_v3.1\BUSINESS_HUB_LIVIANO\02_ARQUITECTURA_APP\agente-estudio-estructura.md` y `03_CODIGO_PARA_MIGRAR\empresaData.liviano.ts`, luego construye el Hub de Empresa Business → Pulso/LIVIANO/PIRQA/Franquicias con los 7 paneles de Liviano, siguiendo el design system Clinical Precision (navy + ámbar, GlassCard), sin backend nuevo."
