# BUSINESS HUB — LIVIANO / PULSO · Plan maestro y entregables

> Paquete de hand-off generado desde `D:\CRM_PULSO_v3.1`.
> Destino de construcción: `D:\joseph-md-app` (app desplegada en https://joseph-md-app.vercel.app, ruta `/estudio`).
> Objetivo: convertir la sección **Business / Empresa** de la app en un **hub multi-empresa** que sea el "centro de control / segundo cerebro" del dueño: Pulso (matriz) → **Liviano** (detallado a fondo) → franquicias futuras (solo nombres por ahora).

---

## 1. Qué pediste (resumen ejecutivo)

1. **Business = hub de todas las empresas Pulso.** La principal Liviano totalmente estructurada; las demás solo con su nombre listo para llenar.
2. **Liviano = centro de control total**, con visión y control sobre:
   - Logística (de dónde se compra el GLP-1, dónde está el proveedor, cadena de suministro, inventario).
   - Página web y diseño (cómo está diseñada la web, cuántos links y cuáles, estructura).
   - Marketing y estudio de mercado (qué afiche funciona / cuál no, por canal/creativo).
   - Ventas y métodos de adquisición de clientes.
   - Finanzas e índices: cap rate, ventas, flujo total, gasto bruto/neto, CAC, LTV, márgenes — todos los KPIs de un vistazo.
   - Directrices y tips (metodología Hormozi + competidores).
3. **Contexto Alex Hormozi** insertado en el repo para que otro chat lo tenga: $100M Offers (Grand Slam Offer, Value Equation, las ~9-10 características de una oferta irresistible) + $100M Leads (Core Four, orgánico primero, lead magnets, las "4h respondiendo mensajes").
4. **Cómo se organiza una empresa de élite** + índices más importantes + logística/abastecimiento GLP-1.
5. **Competidores élite** (Hims & Hers, Eli Lilly/LillyDirect, Ro, etc.): cómo reducen costos, logística, márgenes, diseño de funnel, adquisición.
6. **Código para migrar**: extraer del CRM Pulso todo el código/diseño reutilizable (páginas, links, dashboards) en una carpeta lista para copy-paste, sin borrar nada del CRM.
7. **Prompt final** para que el otro chat (en `D:\joseph-md-app`) construya todo el hub dentro de Business.

---

## 2. Cómo lo estamos haciendo (método)

**Fase 1 — Investigación en paralelo (5 agentes simultáneos):**

| # | Agente | Entrega |
|---|--------|---------|
| 1 | Mapeo de `joseph-md-app` | Arquitectura de la app + plan paso a paso para insertar el hub Business → Pulso → Liviano en el formato existente |
| 2 | Inventario de `CRM_PULSO` | Catálogo completo (páginas, **todos los links**, design system, modelo de datos, integraciones) + qué código migrar |
| 3 | Alex Hormozi exhaustivo | `01_INVESTIGACION/alex-hormozi-metodologia.md` |
| 4 | Organización + KPIs + logística | `01_INVESTIGACION/organizacion-empresa-kpis-logistica.md` |
| 5 | Competidores élite GLP-1 | `01_INVESTIGACION/competidores-elite-telehealth-glp1.md` |

**Fase 2 — Síntesis (este chat):**
- Documentos de arquitectura en `02_ARQUITECTURA_APP/`.
- Código reutilizable extraído en `03_CODIGO_PARA_MIGRAR/`.
- Prompt de construcción final en `04_PROMPT_OTRO_CHAT/`.

---

## 3. Estructura del paquete (esta carpeta)

```
BUSINESS_HUB_LIVIANO/
├── 00_PLAN_Y_ENTREGABLES.md          ← este archivo (índice maestro)
├── 01_INVESTIGACION/
│   ├── alex-hormozi-metodologia.md
│   ├── organizacion-empresa-kpis-logistica.md
│   └── competidores-elite-telehealth-glp1.md
├── 02_ARQUITECTURA_APP/
│   ├── agente-estudio-estructura.md   ← cómo está hecha la app + cómo insertar el hub
│   └── crm-pulso-inventario.md        ← catálogo del CRM + links + qué migrar
├── 03_CODIGO_PARA_MIGRAR/            ← código copy-paste extraído del CRM (no se borra el original)
└── 04_PROMPT_OTRO_CHAT/
    └── PROMPT-CONSTRUCCION-BUSINESS-HUB.md  ← prompt final para el otro chat
```

---

## 4. Hallazgos clave ya confirmados (Fase 0)

### 4.1 La app `joseph-md-app`
- Stack: **Expo + React Native Web** (TypeScript). Se sirve en web vía `vercel.json`; ruta `/estudio`.
- Secciones (sidebar): Home, Study, Derma, **Business (Empresa)**, Research, Vitals.
- La sección Business hoy = `src/screens/EmpresaScreen.tsx` + `src/layouts/desktop/DesktopEmpresaContent.tsx`. Contenido actual: "DTC Dermatología Perú" (nichos de acné) — **se va a reemplazar/expandir** por el hub multi-empresa.
- **Dato crítico:** el dashboard de Business se alimenta de **arrays hardcodeados dentro del componente** (`NICHES`, `BUSINESS_AREAS`, `BENCHMARKS`, `PHASES`, `CHECKLIST`). No hay backend para esta sección → agregar empresas = agregar objetos de datos + un selector. **No requiere base de datos nueva.**
- Design system documentado en `D:\joseph-md-app\DESIGN.md` ("Clinical Precision", dark navy, Manrope+Inter). Color de Business = **Ámbar `#F5A623`**. Componentes reutilizables: `GlassCard`, `AnimatedCounter`, `CircularProgress`, `desktopStyles`.

### 4.2 El CRM `CRM_PULSO_v3.1`
- Carpetas: `00_BRIEF_PRINCIPAL`, `02_DESIGN_SYSTEM`, `03_MODELO_DATOS`, `04_FLUJOS_PRE_ARMADOS`, `05_VARIABLES_ENTORNO`, `06_REPOS_DESTINO` (repos `pulso-crm`, `pulso-intelligence`, `pulso-whatsapp-service`), `pirqa`.
- Líneas de negocio: **PIRQA** (lanzada) y **LIVIANO** (línea peso/GLP-1, São Paulo). Material de Liviano: `LIVIANO_Oferta_Maestra.docx`, `PROMPT_CLAUDE_CODE_LIVIANO_v1.md`.

> El detalle fino de arquitectura, links y modelo de datos lo completan los agentes 1 y 2 (ver `02_ARQUITECTURA_APP/`).

---

## 5. Diseño propuesto del Hub (resumen — el detalle va en el prompt final)

**Business → vista hub:** tarjetas de empresa (Pulso = matriz; Liviano = activa; franquicias = "próximamente"). Al entrar a **Liviano**, sub-navegación con paneles:

1. **Resumen / Cockpit** — KPIs de un vistazo: ventas, flujo total, gasto bruto/neto, cap rate, CAC, LTV, LTV:CAC, margen, semáforos verde/ámbar/rojo.
2. **Oferta (Hormozi)** — Grand Slam Offer de Liviano, value stack, garantías, bonos.
3. **Marketing & Estudio de mercado** — tablero por canal/creativo: qué afiche funciona (CPM, CTR, hook rate, CPL, CAC por creativo), ganadores/perdedores.
4. **Ventas & Adquisición** — Core Four, pipeline, métodos de adquisición.
5. **Logística** — proveedor GLP-1, ubicación, costo por orden, inventario, cadena de suministro.
6. **Web & Diseño** — mapa de la página, todos los links (paciente/cliente/magic/QR), estructura del funnel.
7. **Directrices & Tips** — síntesis Hormozi + competidores.

---

## 6. Estado — COMPLETO ✅

- [x] Fase 0 — Reconocimiento (estructura de ambas apps, sección Business).
- [x] Fase 1 — 5 agentes de investigación paralela (todos terminados).
- [x] Fase 2 — Síntesis: docs de arquitectura, código a migrar, prompt final.

### Entregables finales

| Archivo | Estado |
|---|---|
| `00_PLAN_Y_ENTREGABLES.md` | ✅ |
| `01_INVESTIGACION/alex-hormozi-metodologia.md` (~42 KB) | ✅ |
| `01_INVESTIGACION/organizacion-empresa-kpis-logistica.md` (~29 KB) | ✅ |
| `01_INVESTIGACION/competidores-elite-telehealth-glp1.md` (~30 KB) | ✅ |
| `02_ARQUITECTURA_APP/agente-estudio-estructura.md` | ✅ |
| `02_ARQUITECTURA_APP/crm-pulso-inventario.md` | ✅ |
| `03_CODIGO_PARA_MIGRAR/empresaData.liviano.ts` (datos reales Liviano) | ✅ |
| `03_CODIGO_PARA_MIGRAR/pulso-brand-tokens.md` | ✅ |
| `03_CODIGO_PARA_MIGRAR/README-migracion.md` | ✅ |
| `04_PROMPT_OTRO_CHAT/PROMPT-CONSTRUCCION-BUSINESS-HUB.md` | ✅ |

### Siguiente paso del usuario
Abrir un chat de Claude Code en `D:\joseph-md-app` y pegar el contenido de `04_PROMPT_OTRO_CHAT/PROMPT-CONSTRUCCION-BUSINESS-HUB.md`.

_Paquete completo. Nada del CRM original fue borrado ni modificado: solo se leyó y se extrajeron datos._
