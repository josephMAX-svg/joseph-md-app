# DATA · BUSINESS (Estudio Pulso + metodología Hormozi)

Data del plan de estudio del fundador (96 días) y la metodología de marketing/contenido.
Fuente: `plan_estudio_pulso_v2_mejorado.xlsx` (copia aquí) + workflow de investigación
(10 agentes, fuentes verificadas).

| Fichero | Qué es |
|---------|--------|
| `plan_estudio_pulso_v2_mejorado.xlsx` | el Excel original (8 hojas: Análisis, Filosofía, Biblioteca 28 libros, Calendario 96 días, Técnicas, Outputs, Recursos, Métricas) |
| `_scrape/plan_pulso_v2.json` | dump completo del Excel (todas las hojas) |
| `_scrape/research_raw.json` | hallazgos crudos del workflow (con fuentes) |
| [`hormozi-method.md`](hormozi-method.md) | **Metodología Hormozi para Pulso**: $100M Offers (Value Equation, Grand Slam, Trim & Stack, MAGIC) + Leads (Core Four, lead magnets 7 pasos, Rule of 100, give:ask ≈3.5:1) + Money Models (CFA: 30 días → 2 clientes) + **playbook de contenido orgánico con días recomendados** (IG mié/jue tarde-noche · TikTok tardes y finde · YT Shorts viernes tarde — Buffer/Sprout/Hootsuite; consistencia ≥1x/sem × 20 sem = +450% engagement) |
| [`libros.md`](libros.md) | **los 28 libros, revisión de élite**: tesis · frameworks con capítulo · frase-ancla fiel · aplicación Pulso · recursos con URL real |
| [`terrenos-leads.md`](terrenos-leads.md) | **Terrenos · Casa Soto Tocas**: bitácora 11-jun (21 leads Marketplace reactivados con cita sáb/dom 4pm) · discrepancias de precio web/catálogo/MP · recomendación NO ads hasta agosto (gate Lean Analytics) · sistema permanente (OMTM, cadencia, 8x8) |
| [`golden-brand.md`](golden-brand.md) | **Mantaro Goldens**: web viva (mantaro-goldens.vercel.app) · modelo de venta verificado (criadores élite EE.UU.) · seña S/500, timeline 8 pasos, precios Perú · pendientes |
| `_scrape/*_raw.md` (6 nuevos 11-jun) | investigación verificada: hormozi_seguimiento · lean_analytics · cro_landing · libros_inmobiliaria · referentes_terrenos_peru · golden_breeders · crm_pulso_eval · pirqa_publicaciones · catalogo_predios_huachac.txt |

## En la app (src/lib + componentes)
- `src/lib/businessStudyPlan.ts` — GENERADO (`DATA/_scripts/gen_business_plan.py`): los 96 días
  (BIZ_DIAS con lectura/acción/min/libro/links), bloque 2h minuto-a-minuto (BIZ_FRANJAS).
- `src/lib/businessBooksExtra.ts` — GENERADO (`DATA/_scripts/extract_pulso_research.js`):
  frase-ancla + recursos reales por libro; `fraseDelDia()` para el Home.
- `src/components/empresa/PulsoTodayPlan.tsx` — motor día-a-día (HOY / Minuto a minuto / 7d /
  Temario con % real desde 0) dentro de Business → Pulso → Estudio → "Día a día".
- `src/components/home/BibliotecaHome.tsx` — biblioteca en Home: % leído por libro/materia
  (manual, localStorage `jmd-books-progress-v1`), frase del día, links reales.

## Pendiente (siguiente fase, cuando se pida)
- Programa de publicación de contenido automatizado (PIRQA-style) usando el playbook:
  cadencia mié→dom, Hook-Retain-Reward, lead magnets de diagnóstico por vertical.
