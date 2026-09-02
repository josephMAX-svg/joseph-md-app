# SYNAPSE — Motor día-a-día (diseño y operación)

> Construido el 10-jun-2026 por el chat SYNAPSE (PROMPT_CHAT_SYNAPSE.md).
> Misiones diarias estilo ENCAPS/Business: lección EXACTA de hoy, progreso real
> manual (empieza 0%), 30 min/día en espacios muertos.

## Qué hay

| Pieza | Archivo | Qué hace |
|---|---|---|
| Datos del plan | `src/lib/synapseDailyPlan.ts` | **GENERADO** — 82 días (12 semanas, jue 3-sep → lun 23-nov-2026 · v5.4; regenerar con `node DATA/_scripts/gen_synapse_plan.js YYYY-MM-DD`), bloques A/B/C/PC/R por día |
| Generador | `DATA/_scripts/gen_synapse_plan.js` | Lee `curricula/_extracted.json`, valida cada URL contra los sets verificados (cero inventos) y emite el TS + los MDs de curricula |
| Temarios reales | `DATA/SYNAPSE/curricula/*.md` + `_extracted.json` | 15 fuentes extraídas con WebFetch/oEmbed + verificación adversarial (workflow de 30 agentes, 10-jun-2026) |
| UI | `src/components/study/SynapseTodayPlan.tsx` | Pestaña **⚡ Hoy** (primera) de `SynapseHub`: HOY / 7 días / 12 semanas, checkbox real |
| Progreso | `src/lib/studyProgress.ts` (PlanKey `'synapse'`) | localStorage `jmd-study-progress-v1`, manual, empieza 0%; alimenta el RingStat "Completadas" del hub y el panel derecho |
| Panel derecho | `src/layouts/DesktopRightPanel.tsx` → `SynapseRightPanel` | Misión de hoy (bloques con link) + contador de ✓ |

## Estructura del día (instrucción verbatim de Joseph: "30 minutos al día dividido en espacios cortos, en espacios muertos")

- **A (15', pantalla)** — lección EXACTA de la fase actual con link directo. Secuencial.
- **B (10', audio)** — rotación fija por día de semana: Lun No Priors · Mar Dwarkesh (Dario→Demis→Sholto&Trenton→Latent Space) · Mié Lex #452 (capítulo real del outline, 40 entradas con timestamps) · Jue The Batch · Vie canal Anthropic (5 vídeos verificados por oEmbed) · Sáb comodín (retoma lo pendiente).
- **C (5', lectura móvil)** — Lun Pro Git (capítulo real con URL) · Mar serie Prompt injection de Willison · Mié The Python Tutorial (sección real) · Jue Automate the Boring Stuff 3ª ed. (capítulo real) · Vie research de Anthropic (lethal trifecta, many-shot, constitutional classifiers, RSP) · Sáb comodín.
- **PC (sábado, 60-90', OPCIONAL)** — teclado: setup → certificados → repo público `synapse-journal` → Deep Dive largo → Prompt Eng Tutorial → Problem Sets de CS50P.
- **Domingo = repaso** (nada nuevo; Feynman en voz alta). El domingo también es misión marcable.

## Cobertura (12 semanas honestas a 30'/día)

- **F0 · La Escuela de Anthropic = semanas 1-8** (46 misiones A): Academy + AI Fluency
  (13 lecciones reales) + Claude 101 / Code 101 / Platform 101 (temarios reales) +
  ensayo Building Effective Agents (16 secciones reales) + Karpathy Intro (3 tramos
  por chapters reales) + Deep Dive (11 tramos por los 24 capítulos reales, con `&t=`)
  + 3Blue1Brown (8 vídeos verificados; el 9º —invitado— va al PC de la sem 8).
- **F1 · arranque = semanas 9-12**: CS50P Weeks 0-3 (títulos reales) a 6 misiones/semana
  + Problem Set en el PC del sábado.
- Nota: `synapseData.ts` decía "F0 sem 1-4"; a 30 min/día reales F0 ocupa 8 semanas.
  El motor manda sobre la estimación optimista — honestidad antes que calendario bonito.

## Realidad vs "siguiente lección"

Cada bloque lleva `real: true|false`:
- `true` → el título de la lección/capítulo/timestamp fue VISTO en la fuente (chip "temario real").
- `false` → misión honesta tipo "el episodio más reciente / retoma donde quedaste"
  (No Priors semanal, números de The Batch, artículos sueltos de Willison, tramos de podcasts).

## Cómo regenerar / extender (semanas 13+)

1. Si hace falta temario nuevo (p. ej. CS50P Weeks 4-9, Kaggle, etc.): extraerlo igual
   (WebFetch/oEmbed, cero inventos) y añadirlo a `curricula/_extracted.json`.
2. Añadir las A-units de la fase siguiente en `buildAUnits()` de `gen_synapse_plan.js`
   (y ajustar `TOTAL`, rangos de fase y los mapas B/C/PC si cambia la rotación).
3. `node DATA/_scripts/gen_synapse_plan.js`
4. `node DATA/_scripts/check_links.js src/lib/synapseDailyPlan.ts` (debe dar 100%).
5. `npx tsc --noEmit` + commit. El progreso ya marcado NO se pierde (los `d` son estables
   mientras no se reordene el pasado — regla: NUNCA renumerar días ya transcurridos).

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
