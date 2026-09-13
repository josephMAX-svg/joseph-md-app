# SYNAPSE — Motor día-a-día (diseño y operación)

> Construido el 10-jun-2026 por el chat SYNAPSE (PROMPT_CHAT_SYNAPSE.md).
> **v5.10-b · semanas 13-19 (12-sep-2026, vacío 5 de gaps_v3b_synapse.json)**: el plan ya no termina en la sem 12.
> `node DATA/_scripts/gen_synapse_plan.js 2026-09-14` → **131 días · 19 semanas · lun 14-sep-2026 → vie 22-ene-2027**
> (fin del Step 1 menos la semana del examen). Los **días 1-81 son idénticos** a v5.10 (comprobado bloque a bloque: cabecera +
> A/B/C iguales; solo cambian los textos de los PC/Feynman de sábado/domingo, que vienen del catálogo re-secuenciado del
> vibecoding); se añaden **vie 4-dic, sáb 5-dic (PC = SHIP S12, que antes caía fuera del plan) y dom 6-dic** a la sem 12, y
> **F2 · sem 13-19 (47 días) = Anthropic Academy restante + prep CCA-F** a 30': Building with the Claude API (12 módulos) ·
> MCP restante + MCP Advanced Topics · agent skills/subagentes restantes · Claude Code in Action restante · AI Capabilities and
> Limitations · Claude Cowork · los 3 ensayos de context engineering · repaso por los 5 dominios del CCA-F · simulacro · cierre.
> Temarios reales en `curricula/_extracted.json` (3 cursos nuevos extraídos el 12-sep con WebFetch; `check_links.js` 123/123
> OK). Sem 17-19 = `deload:true` (Fases B-C del Step 1: si aprieta, solo A o solo B). Feriados 25-dic/31-dic/1-ene = día
> libre (bloque R, sin A-unit). Semana del examen (25-29 ene): sin SYNAPSE. Vibecoding: S13-S20 taper (ver CURSO_IA_04H_31AGO.md).
>
> **v5.10 · corrimiento (12-sep-2026)**: D1 = **lun 14-sep-2026** (el 11-sep tampoco se estudió; noveno
> corrimiento del ciclo 31-ago→14-sep) → el plan se regeneró con
> `node DATA/_scripts/gen_synapse_plan.js 2026-09-14`: **81 días · lun 14-sep → jue 3-dic-2026**,
> 12 semanas (**S1 = 14-20 sep, 7 días · S12 = 30-nov→3-dic, 4 días**), misma franja 12:30-13:00 y mismo
> currículo. No se recortó ninguna misión: el desfase se absorbe alargando el final (el día que "desaparece"
> respecto a los 82 de v5.9 es el sáb 12-sep, un "R" sin SHIP; los 11 sábados PC = 11 SHIP siguen enteros). Cifras leídas con node
> de `synapseDailyPlan.ts`, no estimadas.
>
> **v5.7 · contenido (5-sep-2026)**: F1 (sem 9-12) = stack del vibecoding (Claude Code docs · Academy skills/subagentes/MCP/
> Claude Code in Action · Supabase · n8n) en vez de CS50P; F0 se AUDITA (✓ si ya hecho, no se reinicia);
> sáb PC = SHIP del proyecto de la semana (`src/lib/vibecodingPlan.ts`); dom = Feynman 10' opcional.
> Misiones diarias estilo ENCAPS/Business: lección EXACTA de hoy, progreso real
> manual (empieza 0%), 30 min/día en espacios muertos.

## Qué hay

| Pieza | Archivo | Qué hace |
|---|---|---|
| Datos del plan | `src/lib/synapseDailyPlan.ts` | **GENERADO** — 131 días (19 semanas, **lun 14-sep-2026 → vie 22-ene-2027 · v5.10-b**; regenerar con `node DATA/_scripts/gen_synapse_plan.js YYYY-MM-DD`), bloques A/B/C/PC/R por día, `deload` en sem 17-19 |
| Vibecoding 04:15 | `src/lib/vibecodingPlan.ts` + `DATA/SYNAPSE/vibecoding_proyectos.json` | **GENERADO** — 12 proyectos S1-S12 (60 días) + taper S13-S20 (35 días) = 95 días (`node DATA/_scripts/gen_vibecoding_plan.js YYYY-MM-DD`); `verificacion[]` por criterio; `VIBE_SHIP_LOG` horneado desde `_vibecoding_ship.json` |
| Verify / journal | `DATA/_scripts/verify_vibecoding.js` · `DATA/_scripts/journal_hoy.js` | `verify <s>` comprueba los 4 criterios mecánicos y apenda a `DATA/SYNAPSE/_vibecoding_ship.json` (`--sensores` para S13-S16); `journal_hoy.js` crea la entrada de la semana ISO en `D:/synapse-journal/journal/` |
| Generador | `DATA/_scripts/gen_synapse_plan.js` | Lee `curricula/_extracted.json`, valida cada URL contra los sets verificados (cero inventos) y emite el TS + los MDs de curricula |
| Temarios reales | `DATA/SYNAPSE/curricula/*.md` + `_extracted.json` | 15 fuentes extraídas con WebFetch/oEmbed + verificación adversarial (workflow de 30 agentes, 10-jun-2026) |
| UI | `src/components/study/SynapseTodayPlan.tsx` | Pestaña **⚡ Hoy** (primera) de `SynapseHub`: HOY / 7 días / 12 semanas, checkbox real |
| Progreso | `src/lib/studyProgress.ts` (PlanKey `'synapse'`) | localStorage `jmd-study-progress-v1`, manual, empieza 0%; alimenta el RingStat "Completadas" del hub y el panel derecho |
| Panel derecho | `src/layouts/DesktopRightPanel.tsx` → `SynapseRightPanel` | Misión de hoy (bloques con link) + contador de ✓ |

## Estructura del día (instrucción verbatim de Joseph: "30 minutos al día dividido en espacios cortos, en espacios muertos")

- **A (15', pantalla)** — lección EXACTA de la fase actual con link directo. Secuencial.
- **B (10', audio)** — rotación fija por día de semana: Lun No Priors · Mar Dwarkesh (Dario→Demis→Sholto&Trenton→Latent Space) · Mié Lex #452 (capítulo real del outline, 40 entradas con timestamps) · Jue The Batch · Vie canal Anthropic (5 vídeos verificados por oEmbed) · Sáb comodín (retoma lo pendiente).
- **C (5', lectura móvil)** — Lun Pro Git (capítulo real con URL) · Mar serie Prompt injection de Willison · Mié The Python Tutorial (sección real) · Jue Automate the Boring Stuff 3ª ed. (capítulo real) · Vie research de Anthropic (lethal trifecta, many-shot, constitutional classifiers, RSP) · Sáb comodín.
- **PC (sábado 15:00-17:00)** — **SHIP del proyecto de la semana** del vibecoding 04:15 (criterio de aceptación en `DATA/SYNAPSE/vibecoding_proyectos.json`). Desde v5.7 el generador lee el `ship` REAL de `VIBE_PROYECTOS` en vez de asumir "sábado de la semana n". Nada se arrastra a la semana siguiente.
  ✔ **Verificado el 12-sep (v5.10)**: los 11 sábados del plan (19-sep … 28-nov) llevan `SHIP proyecto Sn` alineado
  con `VIBE_PROYECTOS.ship` (sáb 19-sep = S1 … sáb 28-nov = S11); el sáb 12-sep ya no pertenece al plan.
  ✔ **v5.10-b**: el desajuste de borde desapareció — el **SHIP S12 = sáb 5-dic-2026** ya está dentro del plan (d83, PC
  "SHIP proyecto S12"). Sábados de sem 13-16 = "PC opcional · taper" (30': `verify_vibecoding.js --sensores` + retro);
  sem 17-19 = PC opcional/no. **Manda `VIBE_PROYECTOS.ship`** en todo caso.
- **Domingo = Feynman del proyecto (10', opcional)** — explicar en voz alta qué construiste y cómo funciona; el domingo sigue libre (v5 sáb/dom libres) y es marcable para conservar la racha.

## Cobertura (12 semanas honestas a 30'/día)

- **F0 · La Escuela de Anthropic = semanas 1-8** (45 misiones A · **lun 14-sep → dom 8-nov-2026**): Academy + AI Fluency
  (13 lecciones reales) + Claude 101 / Code 101 / Platform 101 (temarios reales) +
  ensayo Building Effective Agents (16 secciones reales) + Karpathy Intro (3 tramos
  por chapters reales) + Deep Dive (11 tramos por los 24 capítulos reales, con `&t=`)
  + 3Blue1Brown (8 vídeos verificados; el 9º —invitado— va al PC de la sem 8).
- **F1 · stack del vibecoding = semanas 9-12** (25 misiones A · **lun 9-nov → jue 3-dic-2026**): sem 9 Claude Code core (memoria · skills · hooks · subagentes; docs + Academy) · sem 10 MCP · headless · Agent SDK · plugins/workflows · sem 11 Supabase (RLS · select · triggers · webhooks · Edge Functions) · sem 12 n8n + Claude Code in Action + best practices. Temarios extraídos con WebFetch el 5-sep-2026 (`curricula/claude-code-docs.md`, `academy-*.md`, `supabase-docs.md`, `n8n-docs.md`; 106/106 URLs OK en check_links). CS50P/Automate quedan como biblioteca de consulta (Python se lee, no se memoriza).
- **F0 no se reinicia**: sus 45 A-units llevan `audit:true` (chip "auditar: ✓ si ya hecho") porque F0 y la minifase corrieron jun-ago con progreso solo en localStorage. Día 1 = auditoría de 5' en "My courses" de la Academy.
- Nota: `synapseData.ts` decía "F0 sem 1-4"; a 30 min/día reales F0 ocupa 8 semanas.
  El motor manda sobre la estimación optimista — honestidad antes que calendario bonito.

## Realidad vs "siguiente lección"

Cada bloque lleva `real: true|false`:
- `true` → el título de la lección/capítulo/timestamp fue VISTO en la fuente (chip "temario real").
- `false` → misión honesta tipo "el episodio más reciente / retoma donde quedaste"
  (No Priors semanal, números de The Batch, artículos sueltos de Willison, tramos de podcasts).

- **F2 · Academy restante + prep CCA-F = semanas 13-19** (38 misiones A · **lun 7-dic-2026 → vie 22-ene-2027**, taper del Step 1):
  sem 13 API I (modelos · acceso · prompt engineering · evals) · sem 14 API II (tool use · RAG · features) · sem 15 API III +
  MCP restante (certificado) + MCP Advanced I (Navidad: 25-dic libre) · sem 16 API IV (agentes y workflows → certificado
  Building with the Claude API; 31-dic y 1-ene libres) · sem 17 (deload) agent skills 3-6 + subagentes 4 + Claude Code in
  Action 10-13 + MCP Advanced II-III (certificado) · sem 18 (deload) los 3 ensayos de context engineering + AI Capabilities
  and Limitations (certificado) + Claude Cowork (certificado) · sem 19 (deload) repaso por los 5 dominios del CCA-F +
  simulacro (quizzes en modo examen) + cierre F2 (decisión de febrero). Las 2 A-units de vie 4/sáb 5-dic cierran F1
  (Verification Skills · Permission Modes · Hooks reference). ⚠ La página oficial del CCA-F no aparece enlazada en la
  Academy (12-sep): la A-unit del 21-ene lo deja como **A VERIFICAR** (real:false, honesto).

## Cómo regenerar / extender (semanas 20+ · febrero)

1. Si hace falta temario nuevo (p. ej. CS50P Weeks 4-9, Kaggle, etc.): extraerlo igual
   (WebFetch/oEmbed, cero inventos) y añadirlo a `curricula/_extracted.json`.
2. Añadir las A-units de la fase siguiente en `buildAUnits()` de `gen_synapse_plan.js`
   (ajustar la aserción de total, `SEM_MAX`, `FIN_PLAN`, rangos de fase y los mapas B/C/PC si cambia la rotación).
3. `node DATA/_scripts/gen_synapse_plan.js YYYY-MM-DD` (misma fecha que `remap_inicio.js`; también `node DATA/_scripts/gen_vibecoding_plan.js YYYY-MM-DD`)
4. `node DATA/_scripts/check_links.js src/lib/synapseDailyPlan.ts` (debe dar 100%; 12-sep: 123/123 OK).
5. `npx tsc --noEmit` + commit. El progreso ya marcado NO se pierde (los `d` son estables
   mientras no se reordene el pasado — regla: NUNCA renumerar días ya transcurridos).
6. Journal: `node DATA/_scripts/journal_hoy.js --abrir` (D:/synapse-journal); verify del sábado: `node DATA/_scripts/verify_vibecoding.js <s>`.

## Google Calendar (Misión 2) — CREADO con horario confirmado por Joseph (10-jun-2026)

Joseph liberó el hueco 12:30–13:00 él mismo y confirmó en el chat. Eventos recurrentes
creados (color Blueberry, TZ America/Lima, descripción con link a la app; CERO eventos
existentes tocados):

| Evento | Recurrencia | id |
|---|---|---|
| 🧠 SYNAPSE — misión del día (30') | L–V 12:30–13:00, desde 11-jun-2026 | `j99thg3eaqesosmvppj4rfgvh4` |
| 🧠 SYNAPSE — PC sábado (2h) | Sáb 15:00–17:00, desde 13-jun-2026 | `hv2lk04orquvivthtkfhilb1ps` |
| 🧠 SYNAPSE — repaso + PC domingo (2h) | Dom 15:00–17:00, **desde 28-jun-2026** | `s7r8tiu66286t156l0odpv5nvo` |

Los domingos **14 y 21-jun-2026 quedan LIBRES** (otras actividades de Joseph): la serie de
domingos arranca el 28-jun a propósito (exclusión estructural, sin EXDATE). El plan refleja
esos 2 días como "Domingo LIBRE" (`DOMINGOS_LIBRES` en el generador). Instancias verificadas
con `list_events` (11-jun → 5-jul): L-V solo días de semana, sáb 13/20/27-jun + 4-jul,
dom solo 28-jun y 5-jul.
