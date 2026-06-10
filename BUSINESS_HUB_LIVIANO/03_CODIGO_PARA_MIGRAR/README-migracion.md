# Código para migrar — qué hay aquí y cómo usarlo

> El usuario pidió "todo el código necesario para migrar, listo para copiar y pegar", sin borrar nada del CRM.
> **Hallazgo clave:** el CRM (`pulso-crm`) es **Next.js + Tailwind/shadcn (React DOM)** y el hub destino (`joseph-md-app`) es **Expo / React Native Web**. → Los componentes `.tsx` del CRM **no se pegan tal cual** (RN no tiene `<div>`, Tailwind, shadcn). Por eso lo que migra de verdad al hub es **datos + estructura + tokens**, no JSX de DOM.

## Archivos de este paquete (listos para pegar en el hub)

| Archivo | Pegar en | Qué es |
|---|---|---|
| `empresaData.liviano.ts` | `D:\joseph-md-app\src\lib\empresaData.ts` | **El artefacto principal.** Datos reales de Pulso/Liviano: empresas, KPIs del cockpit, oferta Grand Slam (escalera de precios, 20+ bonos, garantías, objeciones), estudio de mercado, links, pendientes. 100% local, sin backend. |
| `pulso-brand-tokens.md` | (referencia) | Paleta y tipografías de Pulso/Liviano + cómo mapearlas al hub (Ámbar). |
| `README-migracion.md` | (este archivo) | Guía. |

## Cómo lo usa el otro chat

1. Copia `empresaData.liviano.ts` → `src/lib/empresaData.ts` en `joseph-md-app`.
2. Construye los componentes del hub (ver `04_PROMPT_OTRO_CHAT/`) que consumen ese data file.
3. La subsección "Web & Diseño" usa `PULSO_LINKS` para enlazar a las páginas reales del CRM (`https://pulso-crm.vercel.app/...`).
4. Los textos de la oferta salen de `LIVIANO_OFERTA`; los KPIs de `LIVIANO_KPIS`.

## Lo que NO se migra al hub (pero queda documentado como referencia)

Estos módulos del CRM son valiosos pero pertenecen al stack Next.js. Solo se reescribirían si algún día se rehace el CRM en el mismo stack — **no son para el hub**:

- `pulso-crm/src/lib/supabase/*` — clientes + RLS multi-tenant.
- `pulso-crm/src/lib/flows/engine.ts` — motor de flujos JSON (9 tipos de nodo).
- `pulso-crm/src/lib/portal/session.ts` + `doctor-data.ts` — magic-links.
- `pulso-crm/src/lib/whatsapp/*` — abstracción Baileys/Cloud API.
- `pulso-crm/src/lib/ocr/*` — pipeline OCR Yape/Plin.
- `pulso-crm/src/components/*` — Sidebar, Topbar, FlowCanvas, tablas shadcn.

> Todo el CRM sigue intacto en `06_REPOS_DESTINO/pulso-crm`. Aquí no se copió ni se borró código fuente del CRM: solo se **extrajeron datos** a `empresaData.liviano.ts`.

## Si en el futuro quieres datos en vivo

Cuando Liviano tenga ventas reales, dos opciones:
- **Rápida:** editar a mano los valores en `empresaData.ts` (semáforos, MRR, CAC…).
- **Conectada:** crear `useSupabaseEmpresaData()` en el hub que lea de la misma BD Supabase del CRM (tablas `facturas`, `pagos`, `personas`, métricas) y reemplace los valores estáticos. El patrón de `src/lib/supabase.ts` del hub ya existe.
