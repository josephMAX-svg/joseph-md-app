// gen_synapse_plan.js — GENERA src/lib/synapseDailyPlan.ts (motor día-a-día SYNAPSE)
// y DATA/SYNAPSE/curricula/<id>.md (temarios reales extraídos).
//
// Fuente: DATA/SYNAPSE/curricula/_extracted.json — temarios REALES extraídos y
// verificados adversarialmente (workflow 30 agentes, 10-jun-2026, WebFetch/oEmbed).
// Regla: CERO URLs inventadas — toda URL emitida debe estar en _extracted.json o en
// la allowlist EXTRA_VERIFIED (URLs ya verificadas en src/lib/synapseData.ts el 10-jun).
//
// Regenerar/extender: node DATA/_scripts/gen_synapse_plan.js YYYY-MM-DD
// (al avanzar de fase: añadir A-units de la fase siguiente en buildAUnits y re-ejecutar).
//
// v5.7 (5-sep-2026, vacíos Palmerton v3): F1 (sem 9-12) deja de ser CS50P Weeks 0-3 (sintaxis que la IA
// escribe) y pasa a ser el STACK DEL VIBECODING (Claude Code docs: memoria/skills/hooks/MCP/subagentes/
// Agent SDK/headless/plugins/workflows · Academy: skills/subagentes/MCP/Claude Code in Action/Claude API ·
// Supabase: RLS/select/triggers/webhooks/Edge Functions · n8n: first workflow/Webhook/AI Agent), extraído a
// curricula/_extracted.json el 5-sep-2026. PC sábado = "SHIP proyecto N" (DATA/SYNAPSE/vibecoding_proyectos.json)
// y domingo = Feynman del proyecto (10', opcional). F0 NO se reinicia: sus A-units llevan audit:true
// ("auditar con Joseph: ✓ si ya hecho") porque F0 y la minifase corrieron jun-ago (progreso solo en localStorage).
//
// v5.10-b (12-sep-2026, vacío 5 de gaps_v3b_synapse.json — "semanas 13-20 sin misión"): el plan deja de terminar en
// la sem 12 y cubre hasta el VIE 22-ENE-2027 (v6.00, 6-oct-2026: las FECHAS no cambian —fin lun 15-feb-2027— pero el Step 1 ya NO es en
// febrero: examen objetivo lun 27-sep-2027, pausa del 31-dic al 15-mar por la intensiva ENCAPS → F2 = «taper por el ENCAPS» (solo texto);
// hasta v5.20: fin del Step 1 menos el taper de la semana del examen; v5.20: hasta el lun 15-feb-2027 = D91 (+1 día hábil; con D1 en miércoles las 110 A-units Lun-Sáb terminan aquí) · v5.19: hasta el sáb 13-feb-2027 = +1 día, el último hábil con SYNAPSE es el vie 12-feb = D91; v5.18: hasta el vie 12-feb-2027 = D92; v5.17: mar 9-feb-2027 = D91; v5.16: vie 5-feb-2027 = D92):
//   · sem 12 gana vie 4-dic, sáb 5-dic (PC = SHIP S12, antes fuera del plan) y dom 6-dic (2 A-units de cierre F1; v5.20: mar 29 y mié 30-dic —ambas ya
//     en la sem 13 por fecha; SHIP S12 = sáb 2-ene, sin cambio—; v5.19: lun 28 y mar 29-dic —ambas ya en la sem 13 por fecha; SHIP S12 = sáb 2-ene—; v5.18: sáb 26-dic y lun 28-dic —la 2.ª ya cae en la sem 13 por fecha; SHIP S12 = sáb 2-ene—; v5.17: mar 22 y mié 23-dic, SHIP S12 sáb 26-dic; v5.16: vie 18, sáb 19 y dom 20-dic);
//   · F2 · sem 13-19 (lun 28-dic → lun 15-feb, v5.20 — el lun 15-feb cuenta como sem 19 (SEM_MAX); v5.19: → sáb 13-feb; v5.18: → vie 12-feb; v5.17: lun 21-dic → mar 9-feb; v5.16: → vie 5-feb) = ANTHROPIC ACADEMY RESTANTE + prep CCA-F a 30': Building with the
//     Claude API (12 módulos) · MCP restante + MCP Advanced Topics · agent skills/subagentes restantes · Claude Code in
//     Action restante · AI Capabilities and Limitations · Claude Cowork · los 3 ensayos de context engineering · repaso
//     por los 5 dominios del CCA-F · simulacro (quizzes) · cierre. Temarios en curricula/_extracted.json (5-sep + 12-sep).
//   · sem 17-19 (v6.00: núcleo de la intensiva ENCAPS; hasta v5.20: Fases B-C del Step 1) llevan `deload:true` (si la intensiva aprieta: solo A o solo B, PROTOCOLO_MODO_MINIMO);
//   · feriados 25-dic / 31-dic / 1-ene = día libre (bloque R, sin A-unit), como los domingos;
//   · sáb de sem 13-16 = PC opcional 30' (sensores: verify_vibecoding.js --sensores + retro); sem 17-19 = PC opcional/no.
//   Los días 1-81 son IDÉNTICOS a v5.10 (0 lecciones perdidas; nunca se renumera el pasado).
// v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct; no se estudió mié 7 → sáb 10-oct): node DATA/_scripts/gen_synapse_plan.js 2026-10-12 (DESPUÉS de
//   gen_vibecoding_plan.js 2026-10-12: lee sus SHIP) → lun 12-oct → VIE 19-FEB-2027 (131 días, las mismas 110 A-units Lun-Sáb; FIN_PLAN +4 días de plan).
//   Con START en lunes la sem 1 es completa (lun 12 → dom 18-oct) → OFF_WD = 0: ninguna serie B/C corre una semana y ningún sábado recibe la
//   pieza que se caía (ULT_SAB / FIN_PLAN-sábado sin uso; las 185 piezas B/C reales se conservan). Sem 9-12 (F1) = lun 7-dic → dom 3-ene ·
//   sem 13-19 (F2) = lun 4-ene → vie 19-feb (sin clamp de SEM_MAX). PC sábado: SHIP S1 sáb 17-oct … S10 sáb 19-dic · sáb 26-dic = avance de
//   S11 · S11 sáb 2-ene · S12 sáb 9-ene · taper S13 16-ene · S14 23-ene · S15 30-ene · S16 6-feb (cierra la misma semana que S15 → su PC
//   PROPIO va el sábado siguiente, en un bloque aparte del PC 0' de S17; nada se fusiona: PC_DESPLAZADOS) · S17 6-feb · S18 13-feb = último
//   sábado con SYNAPSE; último domingo con SYNAPSE: dom 14-feb (igual que v6.00). 19 bloques PC (= v6.00: 19); 18 sábados con PC (v6.00: 19).
// v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct; no se estudió lun 12 → sáb 17-oct: 6 días Lun-Sáb perdidos): node DATA/_scripts/gen_synapse_plan.js
//   2026-10-19 (DESPUÉS de gen_vibecoding_plan.js 2026-10-19) → lun 19-oct → VIE 26-FEB-2027 (FIN_PLAN +6 días de plan; las mismas 110 A-units
//   Lun-Sáb y las mismas piezas B/C: con START en lunes OFF_WD = 0, igual que v6.01). Sem 1 = lun 19 → dom 25-oct · sem 9-12 (F1) = lun 14-dic →
//   dom 10-ene · sem 13-19 (F2) = lun 11-ene → vie 26-feb (sin clamp de SEM_MAX). Las 2 A-units de cierre de la sem 12 caen mar 12 + mié 13-ene
//   (SHIP S12 = sáb 16-ene). PC sábado: SHIP S1 sáb 24-oct … S9 sáb 19-dic · sáb 26-dic = avance de S10 (S10 cruza el feriado del 25-dic) ·
//   S10 sáb 2-ene · S11 sáb 9-ene · S12 sáb 16-ene · taper S13 23-ene · S14 30-ene · S15 6-feb · S16 13-feb (S15 jue 28-ene → mar 2-feb y
//   S16 mié 3 → vie 5-feb cierran la misma semana → su PC PROPIO va el sábado siguiente, aparte del PC 0' de S17: PC_DESPLAZADOS) · S17 13-feb ·
//   S18 20-feb = último sábado con SYNAPSE; último domingo con SYNAPSE: dom 21-feb. 19 bloques PC (= v6.01) en 18 sábados (= v6.01).
// v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; lun 19 y mar 20-oct sin estudio: 2 días Lun-Sáb perdidos; orden de Joseph «simplemente
//   corre, no comprimas»): node DATA/_scripts/gen_synapse_plan.js 2026-10-21 (DESPUÉS de gen_vibecoding_plan.js 2026-10-21) → mié 21-oct → LUN
//   1-MAR-2027 (FIN_PLAN +2 días de plan; las mismas 110 A-units Lun-Sáb y las mismas piezas B/C). START en miércoles → OFF_WD.Lun = OFF_WD.Mar = 1
//   (como v5.20): Pro Git (C lun) y Dwarkesh (B mar) corren una semana; la pieza del martes que se cae (B Latent Space + C Willison) va al
//   último sábado (ULT_SAB = sáb 27-feb) y el carril del lunes recupera la suya en el lun 1-mar (FIN_PLAN; cuenta como sem 19 por SEM_MAX).
//   Las semanas por fecha son IDÉNTICAS a v6.02 (sem 1 = mié 21 → dom 25-oct · sem 9-12 = lun 14-dic → dom 10-ene · sem 13-19 = lun 11-ene →
//   lun 1-mar): solo la A-unit de cada día corre 2 ranuras. Las 2 A-units de cierre de la sem 12 caen jue 14 + vie 15-ene (SHIP S12 = sáb 16-ene).
//   PC sábado: sáb 24-oct = AVANCE de S1 (S1 mié 21 → mar 27-oct no se comprime: SHIP el sáb 31-oct) · SHIP S1 sáb 31-oct … S9 sáb 26-dic ·
//   S10 sáb 2-ene · S11 sáb 9-ene · S12 sáb 16-ene · taper S13 23-ene · S14 30-ene · S15 6-feb · S16 13-feb · S17 20-feb · S18 27-feb = último
//   sábado con SYNAPSE (S15 y S16 ya no cierran la misma semana: nada se desplaza) · S19 y S20 cierran el sáb 6-mar, después del FIN_PLAN →
//   «PC = no», sin desplazar (v6.03: PC_DESPLAZADOS ignora los SHIP > FIN_PLAN; antes abortaba al ver el 13-mar, que además es PROTEGIDO).
//   19 bloques PC (= v6.02) en 19 sábados (v6.02: 18). Último domingo con SYNAPSE: dom 28-feb.
// v6.05 (24-oct-2026 · corrimiento D1 = lun 26-oct; no se estudió del lun 19 al dom 25-oct —la semana corrida por alias v6.04a queda sin efecto—;
//   orden de Joseph «todo inicia el lunes 26 … no quites temas, solamente corre lo que está faltando»): node DATA/_scripts/gen_synapse_plan.js
//   2026-10-26 (DESPUÉS de gen_vibecoding_plan.js 2026-10-26) → lun 26-oct → VIE 5-MAR-2027 (131 días; FIN_PLAN +4 días de plan sobre v6.03 —se
//   pierden mié 21 → sáb 24-oct— = +6 sobre v6.02, una semana exacta; las mismas 110 A-units Lun-Sáb y las mismas piezas B/C). START en lunes →
//   OFF_WD = 0 (como v6.01-v6.02): ninguna serie B/C corre una semana y ULT_SAB queda sin uso. Sem 1 = lun 26-oct → dom 1-nov · sem 9-12 (F1) =
//   lun 21-dic → dom 17-ene · sem 13-19 (F2) = lun 18-ene → vie 5-mar (sin clamp de SEM_MAX; deload sem 17-19 desde el lun 15-feb). Las 2 A-units
//   de cierre de la sem 12 caen mar 19 + mié 20-ene (SHIP S12 = sáb 23-ene). PC sábado: SHIP S1 sáb 31-oct … S8 sáb 19-dic · sáb 26-dic = AVANCE de
//   S9 (S9 cruza el feriado del 25-dic) · S9 sáb 2-ene · S10 sáb 9-ene · S11 sáb 16-ene · S12 sáb 23-ene · taper S13 30-ene · S14 6-feb · S15 13-feb ·
//   S16 20-feb (S15 jue 4 → mar 9-feb y S16 mié 10 → vie 12-feb cierran la misma semana → su PC PROPIO va el sábado siguiente, aparte del PC 0' de
//   S17: PC_DESPLAZADOS, como v6.02) · S17 20-feb · S18 27-feb = último sábado con SYNAPSE; S19 (SHIP sáb 6-mar) y S20 (sáb 13-mar, PROTEGIDO) caen
//   después del FIN_PLAN → «PC = no». 19 bloques PC (= v6.02-v6.03) en 18 sábados (= v6.02). Último domingo con SYNAPSE: dom 28-feb.
// v6.05 (fix 24-oct): vibecodingPlan.ts alinea ship = pcSab en las entradas desplazadas (S16 → sáb 20-feb) y pone pcSab '' (SIN PC) en las que caen
//   en un sábado protegido (S20 → 13-mar); aquí el sábado nominal sale del `fin` (sabTras) → mismo plan, misma regla de desplazamiento, y la guarda
//   también exige 0 PC con pcSab '' y ship = pcSab. synapseDailyPlan.ts no cambia.
// v6.06 (31-oct-2026 · corrimiento D1 = lun 2-nov; la semana del lun 26-oct tampoco se estudió; orden de Joseph «reestructura todo a partir del 2
//   de noviembre … corre nada más, corre también las fechas límite … para no perder materias, tan solamente corre»): node DATA/_scripts/
//   gen_synapse_plan.js 2026-11-02 (DESPUÉS de gen_vibecoding_plan.js 2026-11-02) → lun 2-nov → MAR 16-MAR-2027 (FIN_PLAN). Las mismas 110
//   A-units Lun-Sáb (+6 días de plan sobre v6.05: se pierden lun 26 → sáb 31-oct), pero el plan ya CHOCA con el ENCAPS → REGLA NUEVA: los días
//   PROTEGIDOS de _fechas_v6.json (vie 12, sáb 13, dom 14 y lun 15-mar) son como un SKIP (bloque R «🛡 Día protegido», 0′, sin A-unit): lo que no
//   cabe antes va DESPUÉS, al mar 16-mar (F3, reinicio del Step 1; plantillasV6 pinta el SYNAPSE 12:30 en F3 mientras dure el plan), nunca
//   comprimido. La pieza B/C de L-V del día protegido que aún es de la sem 19 (vie 12-mar: canal Anthropic + Willison, «siguiente…») pasa a ese
//   primer día tras los protegidos (mar 16-mar, que por fecha sería la sem 20 y SEM_MAX clampa a la 19: sin esto repetiría la pieza del martes):
//   cada carril conserva sus piezas, como en v6.05. START en lunes → OFF_WD = 0 (ULT_SAB sin uso). Sem 1 = lun 2-nov → dom 8-nov · sem 9-12 (F1)
//   = lun 28-dic → dom 24-ene · sem 13-19 (F2) = lun 25-ene → dom 14-mar (+ mar 16-mar clampado a la 19; deload sem 17-19 desde el lun 22-feb).
//   PC sábado: SHIP S1 sáb 7-nov … S7 sáb 19-dic · sáb 26-dic = AVANCE de S8 (S8 cruza el feriado del 25-dic) · S8 sáb 2-ene · S9 9-ene · S10
//   16-ene · S11 23-ene · S12 30-ene · taper S13 6-feb · S14 13-feb · S15 20-feb · sáb 27-feb = PC propio de S16 (30′) + PC 0′ de S17 (S15 jue
//   11 → mar 16-feb y S16 mié 17 → vie 19-feb cierran la misma semana: PC_DESPLAZADOS, como v6.02/v6.05) · S18 sáb 6-mar = último sábado con
//   SYNAPSE (sáb 13-mar PROTEGIDO). S19 (SHIP sáb 20-mar) y S20 (sáb 27-mar) caen después del FIN_PLAN → «PC = no». 19 bloques PC (= v6.05)
//   en 18 sábados (= v6.05). Último domingo con Feynman: dom 7-mar (dom 14-mar = ENCAPS, protegido).
//   La guarda «pcSab = PC de este plan» se aplica solo a las entradas cuyo sábado nominal cae DENTRO del plan (S20: nominal sáb 20-mar,
//   pcSab sáb 27-mar —desplazada fuera del SYNAPSE, PC = no—).
// v6.07 (8-nov-2026 · corrimiento D1 = lun 9-nov; la semana del lun 2-nov no se estudió; orden de Joseph del dom 8-nov: «empezamos mañana 9 …
//   sábados 14-17 para el en vivo de Theomed; domingos flexibles»): node DATA/_scripts/gen_synapse_plan.js 2026-11-09 (DESPUÉS de
//   gen_vibecoding_plan.js 2026-11-09). DOS cambios: (1) +6 días de plan sobre v6.06 (se pierden lun 2 → sáb 7-nov): las mismas 110 A-units Lun-Sáb
//   (los PROTEGIDOS vie 12 → lun 15-mar siguen siendo como un SKIP) terminan el FIN_PLAN de abajo, ya en F3; START en lunes → OFF_WD = 0. (2) REGLA
//   NUEVA: el bloque PC (SHIP del vibecoding · avance · PC opcional del taper) pasa del SÁBADO 15:00-17:00 al DOMINGO, flexible (sin hora fija, 2 h),
//   porque el sábado 15:00-17:00 es la clase EN VIVO de Theomed. El sábado conserva su A/B/C (30′ en tiempo muerto); el domingo lleva Feynman + PC.
//   DIA_PC = 'Dom' (legado 'Sáb' para reproducir v6.00-v6.06 con un vibecodingPlan.ts de esas versiones). La regla de desplazamiento del taper
//   (PC_DESPLAZADOS: +7 días) y la guarda pcSab = PC de este plan no cambian: el pcSab de vibecodingPlan.ts ya es el domingo.
// v6.08 (14-nov-2026 · corrimiento D1 = lun 16-nov; la semana del lun 9-nov no se estudió; Joseph: «todo inicia el lunes 16 … alarga las fechas
//   límite»): node DATA/_scripts/gen_synapse_plan.js 2026-11-16 (DESPUÉS de gen_vibecoding_plan.js 2026-11-16). +6 días de plan sobre v6.07: las
//   mismas 110 A-units Lun-Sáb terminan el FIN_PLAN jue 1-abr (F3; los PROTEGIDOS vie 12 → lun 15-mar y la Semana Santa jue 25 / vie 26-mar no son
//   de plan). REGLA NUEVA (PC_DESPLAZADOS): S15 (jue 25-feb → mar 2-mar) y S16 (mié 3 → vie 5-mar) del taper cierran el mismo domingo (7-mar) y el +7
//   cae en el dom 14-mar, PROTEGIDO (examen ENCAPS) → el PC de S16 va al PRIMER domingo no protegido, dom 21-mar (aparte del PC 0' de S17, que
//   cierra ese domingo); sin tocar contenido. Antes se perdía (abortaba: «PC de S16: 0 bloque(s)»). Con un +7 no protegido, idéntico a la v6.07.
// v6.09 (16-nov-2026 · 1.ª sesión mar 17-nov; Joseph: «hoy no avancé, todo empieza mañana; el sábado 21 y el domingo 22 viajo, déjalos libres»):
//   node DATA/_scripts/gen_synapse_plan.js 2026-11-16 (DESPUÉS de gen_vibecoding_plan.js 2026-11-17). El START sigue siendo el LUN 16-NOV (como la
//   v6.08), pero el lun 16 es SIN SESIÓN: así el campo `d` (día natural desde el START) es IDÉNTICO a la v6.08 en todas las fechas —el constructor del
//   Calendar de 2027 pone «d<n>» en los títulos de SYNAPSE— y OFF_WD es el natural de un START en lunes (0 en los tres carriles). Frente a la v6.08 el
//   SYNAPSE pierde 2 días Lun-Sáb (lun 16 y sáb 21, viaje) y gana el jue 31-dic (ya no es SKIP) → falta 1. Dos reglas, para que desde el lun 4-ene
//   TODO caiga igual que en la v6.08 (mismas A-units, mismas piezas B/C, mismo `d`, mismo FIN_PLAN jue 1-abr): (1) los días SIN SESIÓN de
//   _fechas_v6.json › corrida_s1 dentro del plan son como un SKIP (bloque R de 0′, sin A-unit); (2) DOM_RECUPERA: el dom 29-nov (fin de semana
//   siguiente al viaje, junto al SHIP S1) lleva una A-unit + las piezas B/C del lunes de la sem 1 (No Priors + Pro Git, las del lun 16). La regla va
//   atada a FECHAS (RECUPERA_V609: se aplica si corrida_s1.sin_sesion contiene el lun 16 y el sáb 21-nov y son los únicos días sin sesión dentro del
//   plan), no a la versión del JSON: si corrida_s1 cambia y la regla deja de cuadrar, el generador ABORTA. Dentro de F1 las A-units corren un día de
//   plan (la del lun 16 el mar 17…) y el jue 31-dic recupera el último.
// v6.10 (mar 17-nov-2026 · 1.ª sesión mié 18-nov; Joseph: «todo inicia mañana, el 18 es el primer día; corre nomás un día»): node
//   DATA/_scripts/gen_synapse_plan.js 2026-11-16 (DESPUÉS de gen_vibecoding_plan.js 2026-11-18). START sigue en el LUN 16 (el `d` de cada fecha y 2027
//   iguales); el mar 17 pasa a SIN SESIÓN (R de 0′). «A DIRECTA»: la A-unit del mar 17 (auditoría F0 «My courses») se guarda aparte y sale en la
//   SESIÓN DE RECUPERACIÓN del SÁB 28-NOV 07:15-07:45 (REC_V610 = _fechas_v6.json › corrida_s1.extra['2026-11-28'].synapse; se exporta en SYN_REC_F1, como
//   SYN_COLA_F1); las A-units del mié 18 → sáb 28 21:00 NO se mueven y el dom 22 (llegada) queda intacto. Carril del martes: B/C INTERCAMBIADOS — el
//   mar 24 lleva las piezas de la sem 1 (las del antiguo mar 17: Dwarkesh × Dario tramo 1/3 + Willison) y la sesión del sáb 28 07:15 las de la sem 2
//   (las del antiguo mar 24), así cada serie avanza en orden de fecha (synapse_f1_tramos.js: piezas fijas del primer martes de F1 = mar 24). Balance:
//   −lun 16 −mar 17 −sáb 21 +jue 31 +dom 22 +sáb 28 07:15 = 0 → FIN_PLAN y 2027 idénticos; desde el sáb 28 21:00 todo igual que la v6.09 (salvo la frase
//   «retoma donde paraste el …» del mar 1, que ahora es el sáb 28). Si corrida_s1 deja de cuadrar con la regla, ABORTA.
// v6.10c (mar 17-nov-2026 · decisión de Joseph de las 17:20: el día que sobra se recupera ENTERO al final de F1, corrimiento literal; sáb 28-nov, dom 29-nov
//   y dom 6-dic sin bloques de recuperación): la SESIÓN DE RECUPERACIÓN del mar 17 pasa al DOM 3-ENE 05:00-05:30 (REC_V610; el sáb 2-ene recibe la última
//   sesión de F1 de los demás frentes y no le quedan 30′) y el CARRIL DEL MARTES corre una semana (REC_V610.cadena: mar 24 ← sem 1 … mar 29-dic ← sem 6,
//   la sesión del dom 3-ene ← sem 7). A-units, `d`, FIN_PLAN y las A-units de 2027 iguales; cambian (declarado) el B del vie 8-ene-2027 («termina los
//   tramos pendientes») y el orden de la cola post-Step 1 (lun 13-dic-2027 → mié 2-feb-2028), porque los comodines del sábado de F1 consumen la cola en
//   otro orden. + enlaces de la Academy: todos los cursos a academy.claude.com/courses/<slug> (Skilljar cierra en diciembre; ver SLUG_ACADEMY_V610C).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const EX = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/SYNAPSE/curricula/_extracted.json'), 'utf8'));
// v6.10c (17-nov-2026 · CORRECCIÓN DE HECHO del chat SYNAPSE, verificada leyendo academy.claude.com ≈18:05): anthropic.skilljar.com cierra «in early
//   December» y lo que quede a medias allí no pasa a la Academy → TODOS los cursos de la Academy (también los de 2027 y la cola de F5) enlazan a
//   https://academy.claude.com/courses/<slug> (200 en la Academy: mismo slug salvo «claude-with-the-anthropic-api» → 404, el curso es
//   «building-with-the-claude-api»). El rótulo «(Anthropic Skilljar)» pasa a «(Anthropic Academy)». Lecciones que la Academy ya no lista con ese nombre
//   (revisar antes de su fecha): claude-code-in-action «Routines and Headless» · introduction-to-agent-skills «Using subagents effectively» ·
//   introduction-to-model-context-protocol «Welcome to the course» y «Project setup» · model-context-protocol-advanced-topics «Introduction», «Let's get
//   started!» y «Wrapping up» · building-with-the-claude-api «Introduction», «Wrapping up!» y «Course Quiz» (pendientes en el informe de la tanda 2).
const SLUG_ACADEMY_V610C = { 'claude-with-the-anthropic-api': 'building-with-the-claude-api' };
const academyDe = (u) => { const m = /^https:\/\/anthropic\.skilljar\.com\/([a-z0-9-]+)\/?$/.exec(u || ''); return m ? `https://academy.claude.com/courses/${SLUG_ACADEMY_V610C[m[1]] || m[1]}` : u; };
for (const t of EX) if (/^academy-/.test(t.id)) { t.url = academyDe(t.url); if (t.urlFinal) t.urlFinal = academyDe(t.urlFinal); t.nombre = String(t.nombre).replace(' (Anthropic Skilljar)', ' (Anthropic Academy)'); }
const VCAT = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/SYNAPSE/vibecoding_proyectos.json'), 'utf8'));
const VIBE = VCAT.proyectos;
const TAPER = VCAT.taper || []; // S13-S20 (v5.10-b): mantenimiento/deload; el PC del sábado los referencia
if (VIBE.length !== 12) throw new Error('vibecoding_proyectos.json debe tener 12 proyectos');
const FIN_PLAN = '2027-04-01'; // v6.08 (14-nov-2026): D1 = lun 16-nov (la semana del lun 9-nov no se estudió: frente a v6.07 se pierden lun 9 → sáb 14-nov = 6 días Lun-Sáb) → las 110 A-units Lun-Sáb, sin los PROTEGIDOS vie 12 → lun 15-mar ni la Semana Santa (jue 25 / vie 26-mar, SKIP), terminan el JUE 1-ABR-2027 (F3); nada se recorta ni se comprime · v6.07 (8-nov-2026): '2027-03-23' · D1 = lun 9-nov (la semana del lun 2-nov no se estudió: frente a v6.06 se pierden lun 2 → sáb 7-nov = 6 días Lun-Sáb) → las 110 A-units Lun-Sáb, sin los PROTEGIDOS vie 12 → lun 15-mar, terminan el MAR 23-MAR-2027 (F3); nada se recorta ni se comprime · v6.06 (31-oct-2026): '2027-03-16' · D1 = lun 2-nov (la semana del lun 26-oct tampoco se estudió: frente a v6.05 se pierden lun 26 → sáb 31-oct = 6 días Lun-Sáb) → las 110 A-units Lun-Sáb terminan el vie 12-mar, día PROTEGIDO (D-1 hábil del ENCAPS) → con la regla nueva (los PROTEGIDOS vie 12 → lun 15-mar no son días de plan, como un SKIP) la última A-unit va al MAR 16-MAR-2027 (F3, reinicio del Step 1); nada se recorta ni se comprime; START en lunes → OFF_WD = 0 · v6.05 (24-oct-2026): vie 5-mar-2027 — D1 = lun 26-oct (no se estudió del lun 19 al sáb 24-oct: frente a v6.03 se pierden mié 21 → sáb 24-oct = 4 días Lun-Sáb) → las 110 A-units Lun-Sáb terminan el VIE 5-MAR-2027 (+4 días de plan sobre v6.03 = +6 sobre v6.02, una semana exacta; nada se recorta; START en lunes → OFF_WD = 0, como v6.01-v6.02: ninguna serie corre una semana y ULT_SAB queda sin uso) · v6.03 (20-oct-2026): lun 1-mar-2027 — D1 = mié 21-oct (lun 19 y mar 20-oct sin estudio: 2 días Lun-Sáb perdidos) → las 110 A-units Lun-Sáb terminan el LUN 1-MAR-2027 (+2 días de plan; nada se recorta; START en miércoles → OFF_WD.Lun = OFF_WD.Mar = 1, como v5.20: el lun 1-mar cuenta como sem 19 por SEM_MAX y devuelve la pieza del carril del lunes) · v6.02 (17-oct-2026): vie 26-feb-2027 — D1 = lun 19-oct (no se estudió lun 12 → sáb 17-oct: 6 días Lun-Sáb perdidos) → las 110 A-units Lun-Sáb terminan el VIE 26-FEB-2027 (+6 días de plan; nada se recorta; START en lunes → OFF_WD = 0, como en v6.01) · v6.01 (10-oct-2026): vie 19-feb-2027 — D1 = lun 12-oct (no se estudió mié 7 → sáb 10-oct: 4 días Lun-Sáb perdidos) → las 110 A-units Lun-Sáb terminan el VIE 19-FEB-2027 (+4 días de plan; nada se recorta). Con START en lunes OFF_WD = 0 en lun/mar/mié: ninguna serie corre una semana y ya no hay pieza del lunes/martes que vaya al último sábado (ULT_SAB sin uso) · v6.00 (6-oct-2026): sin cambio de fecha (lun 15-feb-2027, dentro de la intensiva ENCAPS) · v5.20 (6-oct-2026, DEFINITIVA): lun 15-feb-2027 (= D91 del Step 1; con D1 mié 7-oct las 110 A-units Lun-Sáb terminan aquí) · v5.19 (5-oct-2026): sáb 13-feb-2027 (+1 día: con D1 mar 6-oct las 110 A-units Lun-Sáb terminan aquí) · v5.18 (3-oct-2026): vie 12-feb-2027 (= D92 del Step 1; con D1 lun 5-oct las 110 A-units Lun-Sáb terminan aquí) · v5.17 (30-sep-2026): mar 9-feb · mar 9-feb-2027 (= D91 del Step 1; con D1 en jueves las 110 A-units — que también usan los sábados — terminan un hábil antes que el +3 exacto: nada se recorta). v5.16: vie 5-feb. Con D1 = lun 28-sep las 110 A-units corren +3 hábiles más (nada se fusiona; el domingo no cuenta): 30' de lectura, sin PC. v5.15: lun 1-feb. v5.14: vie 29-ene · v5.13: mar 26-ene · v5.12: lun 25-ene. Se comprueba al final.
const SKIP_FIJOS = new Set(require('./gen_fechas_v6').cargarFechasV6().skip);
// v6.06 (31-oct-2026): días PROTEGIDOS de _fechas_v6.json (fecha → motivo) = como un SKIP para el SYNAPSE (bloque R de 0′, sin A-unit). Con
//   START ≤ 26-oct el plan terminaba antes del vie 12-mar, así que las fechas de v6.00-v6.05 se reproducen igual.
const PROTEGIDOS_SYN = new Map(require('./gen_fechas_v6').cargarFechasV6().protegidos.map((x) => [x.fecha, x.motivo])); // v6.00: SKIP de _fechas_v6.json (feriados libres; jue 25 / vie 26-mar quedan fuera del rango) · v5.20: 25-dic/31-dic/1-ene
// v6.09 (16-nov-2026): días SIN SESIÓN de corrida_s1 dentro del plan (lun 16-nov: no se estudió · sáb 21-nov: viaje; el dom 22 ya es domingo) = como
//   un SKIP (bloque R de 0′, sin A-unit). Los de antes del START (19-oct → 15-nov) no entran en el plan.
// v6.10d (18-nov-2026): sin los días cuyo plan hace otro día real por ALIAS de corrida_s1 (mié 18-nov → jue 19): no son días perdidos del PLAN
//   (fechas de plan intactas; la app pinta cada sesión en su día real) → gen_fechas_v6.sinSesionPlan
const SIN_SESION_SYN = new Set(require('./gen_fechas_v6').sinSesionPlan(require('./gen_fechas_v6').cargarFechasV6()));
// v6.09: DOMINGO DE RECUPERACIÓN — regla CON FECHA (datos 5 de la revisión: antes iba atada al literal de versión 'v6.09' y con un _fechas_v6.json v6.10
//   se habría perdido en silencio). Se aplica si y solo si los días Lun-Sáb sin sesión de corrida_s1 dentro del plan son EXACTAMENTE `pierde` (el lun 16
//   y el sáb 21-nov); entonces el dom 29-nov lleva una A-unit + las piezas B/C del carril del lunes de la sem 1 (las del lun 16). Sin días sin sesión
//   dentro del plan (START ≥ lun 23-nov, o un _fechas_v6.json anterior a la v6.09): no se aplica y el plan sale como siempre. Cualquier otro caso (otros
//   días sin sesión, solo uno de los dos, el dom 29 sin sesión o fuera del plan) ABORTA más abajo: la regla ya no cuadra y hay que decidir de nuevo.
//   El balance (−lun 16 −sáb 21 +jue 31-dic, que dejó de ser SKIP, +dom 29) lo vigila la guarda de FIN_PLAN del final.
// v6.09b (mar 17-nov · auditoría tiempo ↔ material, hallazgo a2-14): el domingo de recuperación pasa del dom 29 al DOM 22-NOV, DOMINGO DE LLEGADA (sigue en
//   corrida_s1.sin_sesion: solo lleva la recuperación, sin Feynman ni PC; `llegada: true`), a las 16:30-17:00, tras la recuperación ENCAPS del viaje
//   (rutinaGuia.guiaSynapseDe). El PC del dom 29 (SHIP S1) vuelve a 2 h. Las A-units del dom 22 → sáb 28 corren un día; desde el lun 30-nov, el `d` y
//   2027 quedan idénticos.
// v6.09b · S1 (mar 17-nov · a2-4 / a2-5 / a2-6): F1 (mié 18-nov → dom 3-ene) TROCEADO POR FECHA con material MEDIDO — DATA/SYNAPSE/medidas_f1.json
//   (medir_synapse_f1.js) + synapse_f1_tramos.js: cada A/B/C lleva su tramo real (vídeo entero a 1,0/1,25/1,5×; audio por minutos a 1,5×, el deep dive a
//   1,0×; lectura en ventanas de ≈500 palabras con localizador sección + párrafo) y lo que no cabe va con FECHA (comodines del sábado, hueco de Lex, lun 4 /
//   mar 5 / vie 8-ene ya previstos, y la COLA POST-STEP 1: 30′/día L-V desde el lun 13-dic-2027 → SYN_COLA_POST_STEP1). `--check` compara sin escribir.
// v6.09b · lote 1-ter S3 (mar 17-nov · revisión R del lote 1-bis, hallazgos 1, 5 y 9): (1) la COLA POST-STEP 1 tiene FRANJA REAL — cada día lleva ini/fin
//   (04:15-04:45 L-V, F5) y sus PASOS con minutos enteros (Σ = 30′; ratio de cada paso ∈ [0,85; 1,15]) → plantillasV6 › bloqueSynCola + rutinaGuia ›
//   guiaSynapseColaDe; los feriados de _fechas_v6.json también quedan fuera; (1, mínimo) SYN_COLA_F1 = huecos reales de F1 con hora: sáb 26-dic 07:15-07:42
//   con los 26:42 finales del deep dive (antes, a 2027-2028); el vie 8-ene «termina los tramos pendientes» toma lo siguiente del canal a la velocidad de su
//   serie; (9) el sábado, A medido con sus minutos y el C del comodín compensa (A + B + C = 30′, el bloque termina a las 21:30, antes del Anki); (5) toda fecha
//   de destino va al principio del «cómo» (≤ 100 caracteres) y el generador aborta si alguna queda después del corte del Calendar.
// v6.09b · lote 1-quater QS (mar 17-nov · revisión R2 del lote 1-ter, hallazgos a / d / e): (a) el B del vie 8-ene-2027 dice las 2 piezas que recibe de F1
//   («Tips…» 15:00-18:19 + «Building…» 30:00-41:00 a 1,5× = 9,5′), de dónde retoma cada una y adónde va lo que queda — único bloque de 2027 que reescribe el
//   troceado (synapse_f1_tramos.EXTRA_2027; aborta con cualquier otra fecha) · (d) entre semana, el A medido de 16-17′ (14, 17 y 31-dic) lleva sus minutos y
//   el C baja lo mismo (A + B + C = 30′) → la cola post-Step 1 recibe ≈400 palabras más: 38 días (lun 13-dic-2027 → mié 2-feb-2028, el último de 21′) ·
//   (e) el C del sábado con menos minutos remite a las fechas de «Lo que queda» (antes «sigue en la cola de lectura», sin fecha).
// v6.10 (17-nov-2026): la regla pasa a v6.10 (sigue CON FECHA): días Lun-Sáb sin sesión dentro del plan = EXACTAMENTE `pierde` (lun 16, mar 17 y sáb
//   21-nov); el dom 22 (llegada) recupera el lun 16 + el sáb 21 con las piezas del lunes de la sem 1 (igual que la v6.09b; su texto no cambia) y el mar
//   17 se recupera en REC_V610 (sáb 28-nov 07:15-07:45). Con cualquier otra lista, ABORTA.
const RECUPERA_V609 = { dom: '2026-11-22', llegada: true, pierde: ['2026-11-16', '2026-11-17', '2026-11-21'], recuperaDom: ['2026-11-16', '2026-11-21'], wd: 'Lun', semana: 1, motivo: 'lun 16-nov (no se estudió) + sáb 21-nov (viaje)', version: 'v6.10' };
/** v6.10: SESIÓN DE RECUPERACIÓN del mar 17-nov a hora fija (sáb 28-nov 07:15-07:45, hueco real del sábado de F1 tras el viaje): la A-unit del mar 17
 *  («A directa») + las piezas B/C del carril del martes de la sem 2 (las del mar 24 de la v6.09; el mar 24 lleva las de la sem 1 = `intercambia`). */
// v6.10c (17-nov-2026, decisión de Joseph de las 17:20: corrimiento LITERAL; los sábados y domingos 28-nov / 29-nov / 6-dic no se cargan): la sesión de
//   recuperación pasa al DOM 3-ENE 05:00-05:30 (el sáb 2-ene, que recibe la última sesión de F1 de los demás frentes, no tiene 30′ libres más: hueco real del
//   domingo antes de la rutina 05:45) y el CARRIL DEL MARTES CORRE UNA SEMANA (CADENA): cada martes de F1 desde el `intercambia` (mar 24-nov) lleva las piezas
//   B/C de la semana anterior (mar 24 ← sem 1 … mar 29-dic ← sem 6) y la sesión de recuperación, las del último martes de F1 (sem 7) → cada serie avanza
//   en orden de fecha y en F1 se consumen las mismas piezas que en la v6.09 (cola post-Step 1 y 2027 iguales). Su A sigue siendo 15′ de F0.
// v6.10w (dom 22-nov): pasa a las 11:30-12:00 del dom 3-ene; a las 05:00 va la sesión del sáb 2-ene (CADENAS_V610W, transición), cuyo comodín de audio abre
//   el vídeo que esta A continúa («Interpretability…» min 15:00-37:30): así el vídeo va en orden. corrida_s1.extra[dom 3].synapse = la franja de las 05:00.
const REC_V610 = { fecha: '2027-01-03', ini: '11:30', fin: '12:00', pierde: '2026-11-17', wd: 'Mar', semana: 1, intercambia: '2026-11-24', cadena: true, motivo: 'mar 17-nov (no se estudió)' };
{ // la franja debe ser la de _fechas_v6.json › corrida_s1.extra (fuente única de fechas)
  const ex = ((require('./gen_fechas_v6').cargarFechasV6().corrida_s1 || {}).extra || {})[REC_V610.fecha];
  // v6.10w: el día debe traer SYNAPSE en corrida_s1.extra (sin él la plantilla no pinta las sesiones a hora fija); la de las 05:00 es la de la cadena
  if (!ex || !ex.synapse) throw new Error(`v6.10 · REC_V610: corrida_s1.extra[${REC_V610.fecha}] no trae synapse`);
}
/** v6.10 · tanda C (17-nov-2026 · DECIDIDO CON JOSEPH en el chat SYNAPSE, ≈06:12: «Sí, añádela»): la AUDITORÍA F0 (la A-unit del mar 17, sin sesión) ya no
 *  va a la sesión de recuperación del sáb 28 07:15: ABRE LA PRIMERA SESIÓN (mié 18, 12:30) con 3′ que salen de la A (la A del día queda en 12′ y para a
 *  las 12:45). `como` = el texto exacto que Joseph aprobó. La A de la sesión del sáb 28 07:15 pasa a material real: 15′ de la siguiente lección de F0 sin
 *  ✓ (caja de la Academy, que no publica duración; si esa sesión sigue o no, lo decide la tanda 2). La A-unit sigue consumiéndose el mar 17 (TOTAL,
 *  FIN_PLAN y 2027 iguales). */
const AUDIT_F0_V610 = {
  fecha: '2026-11-18', ini: '12:30', min: 3, pendiente: '2026-11-17',
  que: 'AUDITORÍA F0 (pendiente del mar 17)',
  como: '1) SIN abrir nada, escribe en el journal qué certificados crees tener (AI Fluency · Claude 101 · Claude Code 101 · Platform 101). 2) Abre https://academy.claude.com → Sign in (cuenta Claude con el mismo correo que usaste en Skilljar) → «Your learning»; si sale «Import your Skilljar progress», púlsalo (sin eso no salen tus certificados viejos; si alguno aún no aparece, míralo en https://anthropic.skilljar.com, que cierra a principios de diciembre). 3) Marca cada curso ✓ o pendiente. A las 12:33 pasa a la A aunque no hayas terminado.',
};
let DOM_RECUPERA = new Map(); // se fija tras leer el START (abajo)
let REC = null; // v6.10: REC_V610 si la regla aplica (abajo)
let A_REC = null; // v6.10: la A-unit del mar 17 («A directa»), guardada aparte para la sesión del sáb 28 07:15
// v5.20: último SÁBADO del plan (≤ FIN_PLAN). Si la sem 1 no tiene martes (START en miércoles o después), la pieza del carril del
// martes que se cae (B Latent Space · C Willison) va a ese sábado; así el carril del martes conserva sus 19 piezas.
// v6.07 (8-nov-2026): día del bloque PC (SHIP del vibecoding): 'Dom' desde la v6.07 (flexible; el sábado 15:00-17:00 es la clase EN VIVO de Theomed) ·
//   hasta v6.06: 'Sáb' (15:00-17:00). Debe coincidir con VIBE_META.diaShip de vibecodingPlan.ts (0 = domingo · 6 = sábado).
const DIA_PC = 'Dom';
const ULT_SAB = (() => { const d = new Date(FIN_PLAN + 'T12:00:00Z'); while (d.getUTCDay() !== 6) d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); })();
// v5.7: fechas REALES de cada proyecto del vibecoding (ini/fin/ship) leídas de src/lib/vibecodingPlan.ts,
// que las calcula sobre días hábiles desde D1. Sin esto, el PC del sábado anunciaba el SHIP de un proyecto
// que aún no había terminado (D1 en miércoles ⇒ las semanas del vibecoding no coinciden con las de SYNAPSE).
let VIBE_FECHAS = [];
try {
  const vp = fs.readFileSync(path.join(ROOT, 'src/lib/vibecodingPlan.ts'), 'utf8');
  // v6.01 (10-oct-2026): + pcSab (sábado del PC que la card del vibecoding pinta vía vibePCSabado); se comprueba contra este plan más abajo.
  // v6.05 (fix 24-oct): pcSab puede ser '' (= SIN PC: S20, su sábado 13-mar es PROTEGIDO) y el ship de una entrada desplazada ya es su pcSab
  //   (S16: ship = pcSab = sáb 20-feb) → la regla de desplazamiento de abajo trabaja con el sábado NOMINAL (el siguiente a su último día, `fin`),
  //   que es el que tenía `ship` antes del fix: el plan del SYNAPSE no cambia y la guarda compara contra pcSab.
  // v6.07: el día nominal del SHIP es el DOMINGO tras su último día (DIA_PC); el nombre sabTras es histórico (hasta v6.06, el sábado).
  const sabTras = (f) => { const d = new Date(f + 'T12:00:00Z'); while (d.getUTCDay() !== (DIA_PC === 'Dom' ? 0 : 6)) d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10); };
  // v6.07: guarda — el día del PC de vibecodingPlan.ts (VIBE_META.diaShip) debe ser el de este plan
  const diaShip = (vp.match(/diaShip: (\d)/) || [])[1];
  if ((diaShip === undefined ? 6 : Number(diaShip)) !== (DIA_PC === 'Dom' ? 0 : 6)) throw new Error(`vibecodingPlan.ts pone el SHIP el día ${diaShip === undefined ? '6 (sábado, legado)' : diaShip} y este plan el ${DIA_PC}: regenerar gen_vibecoding_plan.js con el mismo START`);
  VIBE_FECHAS = [...vp.matchAll(/\{s:(\d+),id:"[^"]*",nombre:"[^"]*"[\s\S]*?ini:"(20\d\d-\d\d-\d\d)",fin:"(20\d\d-\d\d-\d\d)",ship:"(20\d\d-\d\d-\d\d)"(?:,pcSab:"((?:20\d\d-\d\d-\d\d)?)")?/g)]
    .map((m) => ({ s: +m[1], ini: m[2], fin: m[3], ship: sabTras(m[3]), shipTs: m[4], pcSab: m[5] === undefined ? null : m[5] }));
} catch { /* aún no generado: se cae al comportamiento por semana */ }
// v6.10q · v6.10y (lun 23-nov-2026): los pasos (semana, k) de cada fecha de PLAN del vibecoding, para el SHIP que ABSORBE un paso de su proyecto
//   (_fechas_v6.json › corrida_s1.alias_frente.vibecoding.en_ship: dom 29-nov = el paso 5/5 de S1, que va PRIMERO dentro del SHIP) → bloquePC
let VIBE_PASOS = [];
try {
  VIBE_PASOS = [...fs.readFileSync(path.join(ROOT, 'src/lib/vibecodingPlan.ts'), 'utf8').matchAll(/\{d:\d+,fecha:"(20\d\d-\d\d-\d\d)",wd:"[^"]*",semana:(\d+),proyecto:"[^"]*",k:(\d+),tipo:"([^"]+)"/g)]
    .map((m) => ({ fecha: m[1], semana: +m[2], k: +m[3], tipo: m[4] }));
} catch { /* aún no generado */ }
const vibeDe = (fecha) => VIBE_FECHAS.find((x) => x.ship === fecha) || null;
const vibeEnCurso = (fecha) => VIBE_FECHAS.find((x) => x.ini <= fecha && fecha <= x.ship) || null;
const cur = (id) => {
  const t = EX.find((x) => x.id === id);
  if (!t || !t.accesible) throw new Error('curriculum no accesible: ' + id);
  return t;
};
const lec = (id, n) => {
  const l = cur(id).lecciones.find((x) => x.n === n);
  if (!l) throw new Error('leccion no encontrada: ' + id + ' #' + n);
  return l;
};

// ─── URLs canónicas (todas verificadas: _extracted.json o synapseData 10-jun) ───
const U = {
  academy: 'https://www.anthropic.com/learn',
  // v6.10 · tanda C (17-nov-2026 · corrección de hecho del chat SYNAPSE, FAQ oficial academy.claude.com/help/faq): anthropic.skilljar.com cierra «in
  //   early December» y lo que quede a medias allí no pasa a la Academy → los 4 cursos de F0 enlazan a academy.claude.com/courses/<slug>, VERIFICADOS con
  //   WebFetch el 17-nov-2026 (página del curso con las mismas lecciones que las A-units de abajo). Los cursos de 2027 (Building with the Claude API, MCP,
  //   Claude Code in Action, agent skills…) siguen en Skilljar: pendiente de re-curar (ver el informe de la tanda C).
  aif: 'https://academy.claude.com/courses/ai-fluency-framework-foundations',
  c101: 'https://academy.claude.com/courses/claude-101',
  cc101: 'https://academy.claude.com/courses/claude-code-101',
  cp101: 'https://academy.claude.com/courses/claude-platform-101',
  academyClaude: 'https://academy.claude.com',
  ensayo: 'https://www.anthropic.com/engineering/building-effective-agents',
  kIntro: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
  kDeep: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
  cs50p: 'https://cs50.harvard.edu/python/',
  lex452: 'https://lexfridman.com/dario-amodei',
  dwDario: 'https://www.dwarkesh.com/p/dario-amodei',
  dwDemis: 'https://www.dwarkesh.com/p/demis-hassabis',
  dwSholto: 'https://www.dwarkesh.com/p/sholto-douglas-trenton-bricken',
  latent: 'https://www.latent.space/',
  noPriors: 'https://podcasts.apple.com/us/podcast/no-priors-artificial-intelligence-technology-startups/id1668002688',
  theBatch: 'https://www.deeplearning.ai/the-batch/',
  antYt: 'https://www.youtube.com/@anthropic-ai',
  willison: 'https://simonwillison.net/series/prompt-injection/',
  trifecta: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/',
  manyShot: 'https://www.anthropic.com/research/many-shot-jailbreaking',
  constClass: 'https://www.anthropic.com/research/constitutional-classifiers',
  rsp: 'https://www.anthropic.com/news/anthropics-responsible-scaling-policy',
  promptTut: 'https://github.com/anthropics/prompt-eng-interactive-tutorial',
  pyTutorial: 'https://docs.python.org/3/tutorial/',
};
// v5.10-b: los 3 ensayos de context engineering (synapseData.ts M.contextEng / M.harnesses / M.agentSkillsEssay;
// CALIDAD/Synapse.md los identifica como dominio #5 del CCA-F). check_links.js los verifica sobre el TS generado.
U.contextEng = 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents';
U.harnesses = 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents';
U.agentSkillsEssay = 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills';
// URLs verificadas FUERA de _extracted.json (vienen de synapseData.ts, 10-jun-2026)
const EXTRA_VERIFIED = [
  U.aif, U.c101, U.cc101, U.cp101, U.academyClaude, // v6.10 · tanda C: Academy nueva (WebFetch 17-nov-2026)
  U.academy, U.dwDario, U.dwDemis, U.dwSholto, U.latent, U.noPriors, U.theBatch,
  U.antYt, U.willison, U.trifecta, U.manyShot, U.constClass, U.rsp, U.promptTut,
  U.contextEng, U.harnesses, U.agentSkillsEssay,
];

// allowlist total: target urls + urlFinal + urls por lección del JSON + extra
const ALLOWED = new Set(EXTRA_VERIFIED);
for (const t of EX) {
  if (t.url) ALLOWED.add(t.url);
  if (t.urlFinal) ALLOWED.add(t.urlFinal);
  for (const l of t.lecciones || []) if (l.url) ALLOWED.add(l.url);
}
// docs de los 12 proyectos del vibecoding (verificadas 200 el 5-sep-2026, ver _meta del JSON)
for (const p of VIBE) for (const dd of p.docs || []) ALLOWED.add(dd.url);
const assertUrl = (u) => {
  if (!u) return u;
  const base = u.split('&t=')[0].split('#')[0];
  if (!ALLOWED.has(u) && !ALLOWED.has(base)) throw new Error('URL fuera de allowlist (posible invento): ' + u);
  return u;
};
const yt3b1b = (n) => lec('3b1b-nn', n); // título+url+dur reales (oEmbed)
const ytAnt = (n) => lec('anthropic-yt', n);
const lexCap = (n) => lec('lex-452', n);
const cs50w = (n) => cur('cs50p').lecciones.find((x) => x.n === n);
const progitCap = (n) => lec('progit', n);
const pyTutSec = (n) => lec('python-tutorial', n);
const autoCap = (n) => cur('automate').lecciones.find((x) => x.n === n);

// timestamp "HH:MM:SS"/"MM:SS" → segundos (para &t=)
const sec = (ts) => ts.split(':').reduce((a, x) => a * 60 + Number(x), 0);
const tUrl = (base, ts) => base + '&t=' + sec(ts) + 's';

// ─── Bloque A (15', pantalla): 46 unidades F0 (audit) + 24 unidades F1 stack vibecoding (secuencial) ───
const ccDoc = (n) => lec('claude-code-docs', n);   // páginas reales de code.claude.com/docs (5-sep-2026)
const sbDoc = (n) => lec('supabase-docs', n);
const n8nDoc = (n) => lec('n8n-docs', n);
const acad = (id, n) => lec(id, n);
function buildAUnits() {
  const A = [];
  const push = (material, leccion, url, opts = {}) => A.push({ material, leccion, url: url ? assertUrl(url) : undefined, dur: opts.dur, real: opts.real !== false, audit: opts.audit === true });

  // F0 · La Escuela de Anthropic (semanas 1-8 · 46 días Lun-Sáb) — NO se reinicia desde cero: F0 y la
  // minifase AI-first corrieron jun-ago (progreso solo en localStorage). Cada unidad lleva audit:true →
  // "auditar con Joseph: ✓ si ya hecho" (marcar ✓ y pasar a la primera lección realmente pendiente).
  push('Anthropic Academy', 'AUDITORÍA F0 (5\'): abre "My courses" en la Academy y anota qué certificados ya tienes (AI Fluency · Claude 101 · Code 101 · Platform 101). Marca ✓ hoy y en cada A-unit de F0 ya cursada; la primera pendiente es tu lección real de mañana.', U.academy);
  push('AI Fluency: Framework & Foundations', 'Lecciones "Introduction to AI Fluency" + "Why do we need AI Fluency?"', U.aif);
  push('AI Fluency: Framework & Foundations', 'Lección "The 4D Framework": Delegation · Description · Discernment · Diligence — el vocabulario interno de Anthropic', U.aif);
  push('AI Fluency: Framework & Foundations', 'Deep Dive 1: "Generative AI fundamentals" + "Capabilities & limitations"', U.aif);
  push('AI Fluency: Framework & Foundations', '"A closer look at Delegation" + "Project planning and Delegation"', U.aif);
  push('AI Fluency: Framework & Foundations', '"A closer look at Description" + Deep Dive 2: "Effective prompting techniques"', U.aif);
  push('AI Fluency: Framework & Foundations', '"A closer look at Discernment" + "The Description-Discernment loop"', U.aif);
  push('AI Fluency: Framework & Foundations', '"A closer look at Diligence" — la D que separa uso casual de uso profesional', U.aif);
  // v6.10 · BASE CERO (18-nov-2026, orden de Joseph: «todos partimos de cero»; DATA/SYNAPSE/METODO_BASE_CERO.md): los 4 cursos de F0 cierran con su
  //   «Course quiz» OFICIAL de la Academy (preguntas reales; verificado en academy.claude.com el 18-nov) = GATE de su fase; la Academy da una «completion
  //   badge» (insignia), no un certificado. v6.10 · fix 18-nov: 2027 igual — verificado con WebFetch en academy.claude.com el 18-nov-2026: Claude Code in Action,
  //   Introduction to MCP, Building with the Claude API, MCP Advanced Topics, AI Capabilities and Limitations y Claude Cowork dan «Completion badge» (insignia)
  //   con su quiz final; Introduction to Agent Skills e Introduction to Subagents dicen «No completion badge» y no traen quiz (antes, «CERTIFICADO» en 2027). Sin quiz oficial (Building Effective Agents, Karpathy, 3Blue1Brown) no se inventan preguntas: recall en blanco
  //   y Feynman (SYN_FASES_BC). Mismos minutos y fechas.
  push('AI Fluency: Framework & Foundations', '"Conclusion" + «Course quiz» oficial de la Academy (preguntas reales) → insignia = GATE de la fase 1 (1.er entregable de F0)', U.aif);
  push('Claude 101', 'Módulo "Meet Claude": What is Claude? · Your first conversation · Getting better results · Desktop app (Chat, Cowork, Code)', U.c101);
  push('Claude 101', 'Módulo "Organizing your work and knowledge": projects · artifacts · skills', U.c101);
  push('Claude 101', 'Módulo "Expanding Claude\'s reach": connecting your tools · enterprise search · research mode', U.c101);
  push('Claude 101', '"Putting it all together" (use-cases by role · other ways to work) + "What\'s next?" + «Course quiz» oficial → insignia Claude 101 (1.er gate de la fase 2)', U.c101);
  push('Claude Code 101', '"What is Claude Code?" + "How Claude Code works" — el agente con el que ya trabajas, por dentro', U.cc101);
  push('Claude Code 101', '"Installing Claude Code" + "Your first prompt"', U.cc101);
  push('Claude Code 101', 'Módulo "Daily workflows": the explore → plan → code → commit workflow · Context management · Code review', U.cc101);
  push('Claude Code 101', 'Módulo "Customizing": CLAUDE.md · Subagents · Skills · MCP · Hooks + «Course quiz» oficial → insignia = GATE de la fase 2', U.cc101);
  // v6.10c (17-nov-2026 · verificado en academy.claude.com): la lección se llama ahora «What is the Claude Platform?» y la Academy añade «Building with
  //   Claude Code» antes del quiz → va en la 3.ª A-unit de Platform 101 (su fecha; la plataforma guarda el progreso), sin añadir A-units (2027 igual)
  push('Claude Platform 101', '"What is the Claude Platform?" + "Your first API call" + "Choosing the right model"', U.cp101);
  push('Claude Platform 101', 'Módulo "Teaching your Agent": The agent loop explained · What is tool use? · What is thinking?', U.cp101);
  push('Claude Platform 101', '"Extending your Agent" (built-in tools · skills · MCP · context) + "Managed Agents" + "Building with Claude Code" (lección nueva de la Academy) + «Claude Platform 101 quiz» oficial = GATE de la fase 3 → serie 101 COMPLETA', U.cp101);
  push('Building Effective AI Agents (ensayo)', 'Parte I: "What are agents?" · "When (and when not) to use agents" · "When and how to use frameworks" · "The augmented LLM"', U.ensayo);
  // v6.10u (auditoría c19 · vetadas #16 y diffs #19): sin enumerar los 5 workflows (son la respuesta del recall en blanco de la 2.ª parte del GATE 3/6, que
  //   va en este mismo evento) y con sus minutos: 11′ de lectura + 4′ de recall al cerrar el A (antes «Parte II: los 5 workflows — Prompt chaining · …»)
  push('Building Effective AI Agents (ensayo)', 'Parte II: los 5 workflows (nombre y cuándo usar cada uno) + "Agents" + "Summary" (11′). Al cerrar, 4′: los 5 de memoria en el journal (recall en blanco, sin mirar el ensayo; no trae quiz) y después corrígelo contra él.', U.ensayo);
  push('Karpathy — [1hr Talk] Intro to LLMs', 'Part 1: LLMs (00:00 → 25:43): inference · training · LLM dreams · finetuning into an Assistant', tUrl(U.kIntro, '00:00:00'), { dur: '~26 min (2 huecos)' });
  push('Karpathy — [1hr Talk] Intro to LLMs', 'Part 2: Future of LLMs (25:43 → 45:43): scaling laws · tool use · multimodality · System 1/2 · LLM OS', tUrl(U.kIntro, '00:25:43'), { dur: '~20 min' });
  push('Karpathy — [1hr Talk] Intro to LLMs', 'Part 3: LLM Security (45:43 → fin): jailbreaks · prompt injection · data poisoning', tUrl(U.kIntro, '00:45:43'), { dur: '~14 min' });
  // Deep Dive — 11 tramos con capítulos REALES de la descripción del vídeo
  const DD = [
    ['caps 1-3: introduction · pretraining data (internet) · tokenization', '00:00:00', '~14 min'],
    ['caps 4-6: neural network I/O · internals · inference', '00:14:27', '~17 min'],
    ['cap 7: GPT-2 — training and inference', '00:31:09', '~12 min'],
    ['cap 8: Llama 3.1 base model inference', '00:42:52', '~17 min'],
    ['caps 9-10: pretraining → post-training · conversations', '00:59:23', '~21 min'],
    ['cap 11: hallucinations · tool use · knowledge/working memory', '01:20:32', '~21 min'],
    ['caps 12-14: knowledge of self · models need tokens to think · spelling', '01:41:46', '~23 min'],
    ['caps 15-17: jagged intelligence · supervised finetuning → reinforcement learning', '02:04:53', '~23 min'],
    ['caps 18-19: DeepSeek-R1 · AlphaGo', '02:27:47', '~21 min'],
    ['cap 20: reinforcement learning from human feedback (RLHF)', '02:48:26', '~21 min'],
    ['caps 21-24: preview of things to come · keeping track · where to find LLMs · grand summary', '03:09:39', '~21 min'],
  ];
  DD.forEach(([t, ts, dur], i) => push('Karpathy — Deep Dive into LLMs', `Tramo ${i + 1}/11 · ${t}`, tUrl(U.kDeep, ts), { dur }));
  // 3Blue1Brown — vídeos reales (oEmbed) — el invitado nº9 va al bloque PC de la sem 8
  const tb = (n, extra) => { const v = yt3b1b(n); push('3Blue1Brown — Neural networks', `${v.titulo}${extra || ''}`, v.url, { dur: v.dur + ' (duración según la playlist)' }); };
  tb(1); tb(2); tb(3); tb(4);
  tb(5, ' — repasa la serie hasta aquí en tus palabras');
  const v6 = yt3b1b(6), v7 = yt3b1b(7);
  push('3Blue1Brown — Neural networks', `${v6.titulo} — 1ª mitad (para en ~min 14)`, v6.url, { dur: v6.dur });
  push('3Blue1Brown — Neural networks', `${v6.titulo} — 2ª mitad (termina el vídeo)`, v6.url, { dur: v6.dur });
  push('3Blue1Brown — Neural networks', `${v7.titulo} — 1ª mitad`, v7.url, { dur: v7.dur });
  push('3Blue1Brown — Neural networks', `${v7.titulo} — 2ª mitad`, v7.url, { dur: v7.dur });
  const v8 = yt3b1b(8);
  push('3Blue1Brown — Neural networks', `${v8.titulo} → CIERRE F0: ya puedes explicar un LLM por dentro`, v8.url, { dur: v8.dur });

  if (A.length !== 46) throw new Error('F0 debe tener 46 A-units, hay ' + A.length);
  for (const a of A) a.audit = true; // F0 completa = auditar con Joseph (✓ si ya hecho)

  // F1 · STACK DEL VIBECODING (semanas 9-12 · 24 días Lun-Sáb) — la teoría de las 12:30 alimenta
  // los proyectos de las 04:15 (S9-S12) y consolida S1-S8. Temarios reales: curricula/_extracted.json.
  // Sem 9 · Claude Code core (memoria · skills · hooks · subagentes)
  push('Claude Code docs — ' + ccDoc(1).modulo, 'CLAUDE.md vs auto memory · Set up a project CLAUDE.md · Write effective instructions · Organize rules with .claude/rules/. Aplícalo: revisa el CLAUDE.md de joseph-md-app con esos criterios.', ccDoc(1).url);
  push('Academy — ' + cur('academy-agent-skills').nombre, `"${acad('academy-agent-skills', 1).titulo}" + "${acad('academy-agent-skills', 2).titulo}" (2 lecciones cortas)`, cur('academy-agent-skills').url);
  push('Claude Code docs — ' + ccDoc(2).modulo, 'Getting started: Create your first skill · Where skills live · Frontmatter reference · Pass arguments to skills · Inject dynamic context. Cierra con la skill /remap (S5) o /pregunta-encaps (S8) en mente.', ccDoc(2).url);
  push('Claude Code docs — ' + ccDoc(3).modulo, 'Set up your first hook · What you can automate (Auto-format · Block edits to protected files · Auto-approve specific permission prompts) · How hooks work (matchers, input/output). Eventos: PreToolUse · PostToolUse · Stop · SessionStart · SessionEnd.', ccDoc(3).url);
  push('Academy — ' + cur('academy-subagents').nombre, `"${acad('academy-subagents', 1).titulo}" + "${acad('academy-subagents', 2).titulo}" + "${acad('academy-subagents', 3).titulo}"`, cur('academy-subagents').url);
  push('Claude Code docs — ' + ccDoc(7).modulo, 'Quickstart: create your first subagent · Write subagent files (frontmatter, tools, model) · Common patterns: Isolate high-volume operations · Run parallel research · Chain subagents.', ccDoc(7).url);
  // Sem 10 · MCP · headless · Agent SDK · plugins/workflows
  push('Academy — ' + cur('academy-mcp').nombre, `Módulo Introduction: "${acad('academy-mcp', 1).titulo}" · "${acad('academy-mcp', 2).titulo}" · "${acad('academy-mcp', 3).titulo}"`, cur('academy-mcp').url);
  push('Claude Code docs — ' + ccDoc(5).modulo, 'Add and verify a server (claude mcp add · claude mcp list) · Where servers are saved (local/project/user) · Edit .mcp.json directly · Troubleshooting. Aplícalo a los MCP que ya usas (Supabase, Google Calendar).', ccDoc(5).url);
  push('Academy — ' + cur('academy-mcp').nombre, `Módulo Hands-on: "${acad('academy-mcp', 4).titulo}" · "${acad('academy-mcp', 5).titulo}" · "${acad('academy-mcp', 6).titulo}"`, cur('academy-mcp').url);
  push('Claude Code docs — ' + ccDoc(8).modulo, 'Basic usage (claude -p · --bare) · Get structured output (--output-format json · --json-schema) · Auto-approve tools (--allowedTools) · Continue conversations. Base del generador de contenido (S11) y de los scripts nocturnos.', ccDoc(8).url);
  push('Claude Code docs — ' + ccDoc(9).modulo + ' + quickstart', 'Overview: Compare the Agent SDK to other Claude tools · Capabilities (hooks, subagents, MCP, permissions, sessions). Quickstart: Setup · Build an agent that finds and fixes bugs · Key concepts (tools · permission modes).', ccDoc(10).url);
  push('Claude Code docs — ' + ccDoc(11).modulo + ' + ' + ccDoc(12).modulo, 'Plugins: When to use plugins vs standalone · Quickstart (manifest · skill · --plugin-dir). Workflows: When to use a workflow · Have Claude write a workflow · Save the workflow for reuse. Decide qué de YoCPMD merece ser plugin.', ccDoc(11).url);
  // Sem 11 · Supabase (RLS · select · triggers · webhooks · Edge Functions)
  push('Supabase docs — ' + sbDoc(1).modulo, 'Understand Row Level Security: What a policy does · Grants and policies · Authenticated and unauthenticated roles. Lo que S6 (datos_tesis) necesita entender antes de tocar producción.', sbDoc(1).url);
  push('Supabase docs — ' + sbDoc(1).modulo + ' (II)', 'Secure a table with RLS: Enable RLS and set the grants · Write a policy for each operation (SELECT/INSERT/UPDATE/DELETE) · Policy tests · RLS reference: auth.uid() · Use security definer functions · Bypassing RLS.', sbDoc(1).url);
  push('Supabase docs — ' + sbDoc(2).modulo, 'Getting your data · Handling errors · Selecting specific columns · Query referenced tables · Querying with count option · Querying JSON data. Es lo que usa gen_revision_semanal.js.', sbDoc(2).url);
  push('Supabase docs — ' + sbDoc(3).modulo, 'Creating a trigger · Trigger functions (variables) · Types of triggers (before/after) · Execution frequency · Dropping a trigger. Idea: trigger que marque study_progress al insertar scores.', sbDoc(3).url);
  push('Supabase docs — ' + sbDoc(4).modulo + ' + ' + sbDoc(5).modulo, 'Webhooks vs triggers · Creating a webhook · Payload · Monitoring · Local development + Data REST API (la API generada del esquema). Base del puente Supabase → n8n (S10).', sbDoc(4).url);
  push('Supabase docs — ' + sbDoc(6).modulo + ' + ' + sbDoc(7).modulo, 'Edge Functions: How it works · When to use Edge Functions · Quickstart Steps 1-7 (create · test locally · deploy to production · test your live function).', sbDoc(7).url);
  // Sem 12 · n8n + Claude Code in Action + cierre F1
  push('n8n docs — ' + n8nDoc(1).modulo, 'Step one: Create a new workflow → Step six: Test the workflow (trigger · nodo con credenciales · If · salida). Hazlo en tu instancia, no solo leerlo.', n8nDoc(1).url);
  push('n8n docs — ' + n8nDoc(2).modulo, 'Node parameters: Webhook URLs · HTTP Method · Path · Supported authentication methods · Respond · Response Code · Response Data · Common issues. Es la puerta del bot WhatsApp (S10).', n8nDoc(2).url);
  push('n8n docs — ' + n8nDoc(3).modulo, 'AI Agent node: parámetros del nodo en la página + Templates and examples + Common issues. Compara con los 5 patrones de "Building Effective Agents" (F0).', n8nDoc(3).url);
  push('Academy — ' + cur('academy-cc-in-action').nombre, `"${acad('academy-cc-in-action', 1).titulo}" · "${acad('academy-cc-in-action', 2).titulo}" · "${acad('academy-cc-in-action', 3).titulo}" · "${acad('academy-cc-in-action', 4).titulo}"`, cur('academy-cc-in-action').url);
  push('Academy — ' + cur('academy-cc-in-action').nombre, `"${acad('academy-cc-in-action', 7).titulo}" · "${acad('academy-cc-in-action', 8).titulo}" · "${acad('academy-cc-in-action', 9).titulo}" · "${acad('academy-cc-in-action', 12).titulo}" → quiz final: «Course quiz» oficial (insignia de finalización)`, cur('academy-cc-in-action').url);
  push('Claude Code docs — ' + ccDoc(13).modulo, 'Give Claude a way to verify its work · Explore first, then plan, then code · Add an adversarial review step · Avoid common failure patterns → CIERRE F1: relee tu synapse-journal de 12 semanas y anota los 3 hábitos que faltan.', ccDoc(13).url);
  if (A.length !== 70) throw new Error('Total A-units F0+F1 debe ser 70, hay ' + A.length);

  // v5.10-b · cierre de la sem 12 (v6.07: lun 1 → mié 3-feb, ya en la sem 13 por fecha; SHIP S12 = dom 7-feb · v6.06: mar 26 + mié 27-ene, ya en la sem 13 por fecha; SHIP S12 = sáb 30-ene · v6.05: mar 19 + mié 20-ene, ya en la sem 13 por fecha; SHIP S12 = sáb 23-ene · v6.03: jue 14 + vie 15-ene, ya en la sem 13 por fecha; SHIP S12 = sáb 16-ene · v6.02: mar 12 + mié 13-ene, ya en la sem 13 por fecha; SHIP S12 = sáb 16-ene · v6.01: mar 5 + mié 6-ene, ya en la sem 13 por fecha; SHIP S12 = sáb 9-ene · v5.20: mar 29 + mié 30-dic, ambas ya en la sem 13 por fecha; v5.19: lun 28 + mar 29-dic, ambas ya en la sem 13 por fecha; v5.18: sáb 26-dic + lun 28-dic, la 2.ª ya en la sem 13 por fecha; v5.17: mar 22 + mié 23-dic; v5.16: vie 18-dic + sáb 19-dic; en v5.10-b vie 4 + sáb 5-dic, antes fuera del plan): 2 A-units F1 con lecciones reales aún no usadas
  push('Academy — ' + cur('academy-cc-in-action').nombre, `"${acad('academy-cc-in-action', 5).titulo}" · "${acad('academy-cc-in-action', 6).titulo}" — cierra S12: el capstone se VERIFICA (verify_vibecoding.js), no se recuerda.`, cur('academy-cc-in-action').url);
  push('Claude Code docs — ' + ccDoc(4).modulo, ccDoc(4).titulo + '. Repaso antes del taper: qué hook automatiza cada sensor (SessionEnd → telemetría Anki; PostToolUse → verificar_planes). SHIP S12 en el PC del domingo 14-feb.', ccDoc(4).url);
  if (A.length !== 72) throw new Error('Total A-units F0+F1 (+cierre sem 12) debe ser 72, hay ' + A.length);

  // F2 · ANTHROPIC ACADEMY RESTANTE + PREP CCA-F (sem 13-19 · v6.00 = v5.20 en fechas, taper por el ENCAPS · v5.20: lun 28-dic → lun 15-feb; v5.19: lun 28-dic → sáb 13-feb; v5.18: lun 28-dic → vie 12-feb; v5.17: lun 21-dic → mar 9-feb; v5.16: → vie 5-feb · 38 A-units · 30'/día · taper del Step 1)
  // Temarios reales: academy-claude-api (12 módulos, 5-sep) · academy-mcp 7-13 · academy-mcp-advanced (12-sep) ·
  // academy-agent-skills 3-6 · academy-subagents 4 · academy-cc-in-action 10-13 · academy-ai-capabilities (12-sep) ·
  // academy-cowork (12-sep) · 3 ensayos de Anthropic Engineering · repaso por dominio del CCA-F (pesos según CALIDAD/Synapse.md:
  // Agentic Architecture 27% · Claude Code 20% · Tool Design & MCP 18% · Prompt Engineering 20% · Context Management 15%).
  const api = (n) => lec('academy-claude-api', n);
  const apiN = 'Academy — ' + cur('academy-claude-api').nombre;
  const apiU = cur('academy-claude-api').url;
  const mcpA = (n) => lec('academy-mcp-advanced', n);
  const mcpAN = 'Academy — ' + cur('academy-mcp-advanced').nombre;
  const mcpAU = cur('academy-mcp-advanced').url;
  const cap = (n) => lec('academy-ai-capabilities', n);
  const cow = (n) => lec('academy-cowork', n);
  const t = (l) => `"${l.titulo}"`;
  // sem 13 (6) · API I: modelos · acceso · prompt engineering · evals
  push(apiN, `Módulo 1 "${api(1).modulo}": ${api(1).titulo}. Arranca el curso que falta (insignia de finalización al aprobar su «Final Assessment»; prep directa del CCA-F).`, apiU);
  push(apiN, `Módulo 2 "${api(2).modulo}" (I): Accessing the API · Getting an API key · Making a request · Multi-Turn conversations · System prompts`, apiU);
  push(apiN, `Módulo 2 "${api(2).modulo}" (II): Temperature · Response streaming · Structured data · Quiz. Es lo que usa gen_contenido.js (S11).`, apiU);
  push(apiN, `Módulo 4 "${api(4).modulo}": ${api(4).titulo} — dominio Prompt Engineering (20%) del CCA-F.`, apiU);
  push(apiN, `Módulo 3 "${api(3).modulo}" (I): Prompt evaluation · A typical eval workflow · Generating test datasets`, apiU);
  push(apiN, `Módulo 3 "${api(3).modulo}" (II): Running the eval · Model based grading · Code based grading · Exercise · Quiz. Evals = el tema más subestimado (CALIDAD/Synapse.md).`, apiU);
  // sem 14 (6) · API II: tool use · RAG · features
  push(apiN, `Módulo 5 "${api(5).modulo}" (I): Introducing tool use · Tool functions · Tool schemas · Handling message blocks`, apiU);
  push(apiN, `Módulo 5 "${api(5).modulo}" (II): Sending tool results · Multi-turn conversations with tools · Using multiple tools`, apiU);
  push(apiN, `Módulo 5 "${api(5).modulo}" (III): Fine grained tool calling · The text edit tool · The web search tool · Quiz — dominio Tool Design & MCP (18%).`, apiU);
  push(apiN, `Módulo 6 "${api(6).modulo}" (I): Introducing RAG · Text chunking strategies · Text embeddings · The full RAG flow`, apiU);
  push(apiN, `Módulo 6 "${api(6).modulo}" (II): Implementing the RAG flow · BM25 lexical search · A Multi-Index RAG pipeline`, apiU);
  push(apiN, `Módulo 7 "${api(7).modulo}" (I): Extended thinking · Image support · PDF support · Citations`, apiU);
  // sem 15 (5; v5.18-v5.20: el 25-dic cae en la sem 12, no aquí) · API III + MCP restante + MCP Advanced I
  push(apiN, `Módulo 7 "${api(7).modulo}" (II): Prompt caching · Rules of prompt caching · Code execution and the Files API · Quiz — dominio Context Management (15%).`, apiU);
  push('Academy — ' + cur('academy-mcp').nombre, `Módulo Connecting with MCP clients: ${t(acad('academy-mcp', 7))} · ${t(acad('academy-mcp', 8))} · ${t(acad('academy-mcp', 9))}`, cur('academy-mcp').url);
  push('Academy — ' + cur('academy-mcp').nombre, `${t(acad('academy-mcp', 10))} · ${t(acad('academy-mcp', 11))}`, cur('academy-mcp').url);
  push('Academy — ' + cur('academy-mcp').nombre, `${t(acad('academy-mcp', 12))} · ${t(acad('academy-mcp', 13))} → INSIGNIA Introduction to MCP («Final assessment on MCP»)`, cur('academy-mcp').url);
  push(mcpAN, `${t(mcpA(1))} · ${t(mcpA(2))} · ${t(mcpA(3))} · ${t(mcpA(4))} · ${t(mcpA(5))} (sampling: el servidor pide al cliente que llame al modelo)`, mcpAU);
  // sem 16 (4; v5.18-v5.20: el 31-dic y el 1-ene caen en la sem 13, no aquí) · API IV: apps · agentes y workflows · certificado
  push(apiN, `Módulo 9 "${api(9).modulo}": ${api(9).titulo}`, apiU);
  push(apiN, `Módulo 10 "${api(10).modulo}" (I): Agents and workflows · Parallelization workflows · Chaining workflows · Routing workflows`, apiU);
  push(apiN, `Módulo 10 "${api(10).modulo}" (II): Agents and tools · Environment inspection · Workflows vs agents · Quiz — dominio Agentic Architecture (27%), el de mayor peso.`, apiU);
  push(apiN, `Módulos 11-12: "${api(11).modulo}" + "${api(12).modulo}" → INSIGNIA Building with the Claude API («Final Assessment»; cierre de año).`, apiU);
  // sem 17 (6 · Fase B · deload) · Academy restante: skills · subagentes · Claude Code in Action · MCP Advanced II-III
  push('Academy — ' + cur('academy-agent-skills').nombre, `${t(acad('academy-agent-skills', 3))} · ${t(acad('academy-agent-skills', 4))}`, cur('academy-agent-skills').url);
  push('Academy — ' + cur('academy-agent-skills').nombre + ' + ' + cur('academy-subagents').nombre, `${t(acad('academy-agent-skills', 5))} · ${t(acad('academy-agent-skills', 6))} + ${t(acad('academy-subagents', 4))} → fin de Agent Skills + Subagents (estos 2 cursos no dan insignia ni traen quiz: recall en blanco de lo visto)`, cur('academy-agent-skills').url);
  push('Academy — ' + cur('academy-cc-in-action').nombre, `${t(acad('academy-cc-in-action', 10))} · ${t(acad('academy-cc-in-action', 11))}`, cur('academy-cc-in-action').url);
  push('Academy — ' + cur('academy-cc-in-action').nombre + ' + Claude Code docs — ' + ccDoc(11).modulo, `${t(acad('academy-cc-in-action', 13))} + repaso de la doc de plugins (dominio Claude Code, 20%): ¿qué de YoCPMD ya es plugin?`, cur('academy-cc-in-action').url);
  push(mcpAN, `${t(mcpA(6))} · ${t(mcpA(7))} · ${t(mcpA(8))} · ${t(mcpA(9))} · ${t(mcpA(11))} · ${t(mcpA(12))}`, mcpAU);
  push(mcpAN, `${t(mcpA(13))} · ${t(mcpA(14))} · ${t(mcpA(15))} · ${t(mcpA(16))} · ${t(mcpA(17))} · ${t(mcpA(18))} · ${t(mcpA(19))} → INSIGNIA MCP Advanced Topics («Assessment on MCP concepts»)`, mcpAU);
  // sem 18 (6 · Fase B · deload) · los 3 ensayos + Academy nueva (AI Capabilities · Cowork)
  push('Anthropic Engineering — ensayo', 'Effective context engineering for AI agents: context rot · compaction · structured note-taking · just-in-time retrieval — dominio Context Management (15%) del CCA-F.', U.contextEng);
  push('Anthropic Engineering — ensayo', 'Effective harnesses for long-running agents: cómo se mantiene un agente horas sin perder el hilo (compáralo con tus workflows de agentes).', U.harnesses);
  push('Anthropic Engineering — ensayo', 'Equipping agents for the real world with Agent Skills: por qué las skills son ficheros y no prompts (tus .claude/skills a la luz del ensayo).', U.agentSkillsEssay);
  push('Academy — ' + cur('academy-ai-capabilities').nombre, `${t(cap(3))} · ${t(cap(4))} · ${t(cap(5))} · ${t(cap(7))} · ${t(cap(9))} (con los "Try it out")`, cur('academy-ai-capabilities').url);
  push('Academy — ' + cur('academy-ai-capabilities').nombre, `${t(cap(11))} · ${t(cap(13))} · ${t(cap(14))} · ${t(cap(15))} → INSIGNIA AI Capabilities and Limitations («Course Quiz»)`, cur('academy-ai-capabilities').url);
  push('Academy — ' + cur('academy-cowork').nombre, `${t(cow(1))} · ${t(cow(4))} · ${t(cow(6))} · ${t(cow(7))} · ${t(cow(9))} · ${t(cow(11))} · ${t(cow(15))} → INSIGNIA Introduction to Claude Cowork`, cur('academy-cowork').url);
  // sem 19 (5 · Fase C · deload · última semana con SYNAPSE) · repaso por dominio del CCA-F · simulacro · cierre
  push('Prep CCA-F · dominios 1-2 (repaso)', 'Agentic Architecture (27%) = relee "Building Effective Agents" (5 workflows, cuándo NO usar agentes) · Claude Code (20%) = relee "Best practices". Sin apuntes: recall en blanco por dominio (los 5 workflows con su cuándo-usar · 5 best practices) y compáralo con los textos; preguntas, solo reales: las del simulacro de esta semana (quizzes oficiales de la Academy).', U.ensayo); // v6.10 · base cero: antes «10 preguntas propias por dominio» (inventadas → fuera)
  push('Prep CCA-F · dominios 3-4 (repaso)', 'Tool Design & MCP (18%) = quickstart MCP + tu servidor de S9 · Prompt Engineering (20%) = Prompt Engineering Interactive Tutorial (caps 1-3, repaso rápido).', U.promptTut);
  push('Prep CCA-F · dominio 5 (repaso) + Claude Code docs — ' + ccDoc(14).modulo, `Context Management (15%) = memoria (CLAUDE.md, /compact) + el ensayo de context engineering · ${ccDoc(14).modulo} + ${ccDoc(15).modulo} (páginas reales, contenido por leer).`, ccDoc(14).url);
  push('Prep CCA-F · simulacro', `Repite en modo examen (sin apuntes) el "${api(11).modulo}" de Building with the Claude API y el "${acad('academy-cc-in-action', 14).titulo}" de Claude Code in Action; anota % por dominio en el journal.`, apiU);
  push('Prep CCA-F · cierre F2', 'Página oficial de la certificación CCA-F: A VERIFICAR → buscarla en la Academy, anotar formato/precio/fecha y decidir fecha post-Step 1 (dic-2027: el Step 1 es el lun 6-dic-2027). CIERRE F2 (último día del motor: jue 1-abr —F3, tras el ENCAPS y la Semana Santa—): relee el journal S13-S19 y escribe 3 líneas para la fase post-ENCAPS. Desde mañana la franja 12:30 queda libre.', U.academy, { real: false });
  if (A.length !== 110) throw new Error('Total A-units (F0 46 + F1 26 + F2 38) debe ser 110, hay ' + A.length);
  return A;
}

// ─── Bloque B (10', audio) por día de semana ───
function bloqueB(wd, semana, fecha) {
  const B = (material, leccion, url, opts = {}) => ({ tag: 'B', min: 10, formato: 'audio', material, leccion, url: url ? assertUrl(url) : undefined, dur: opts.dur, real: opts.real !== false });
  if (wd === 'Lun') return B('No Priors (Sarah Guo + Elad Gil)', 'Episodio de esta semana — el más reciente o el siguiente de tu cola (22-56 min: te da para 2-3 huecos)', U.noPriors, { real: false });
  if (wd === 'Mar') {
    semana -= OFF_WD.Mar; // v5.17: si la sem 1 no tiene martes, la serie CORRE una semana (no se salta el tramo 1/3)
    if (semana <= 3) return B('Dwarkesh — Dario Amodei', `Tramo ${semana}/3 (10'): continúa donde quedaste del episodio (1h58)`, U.dwDario, { real: false });
    if (semana === 4) return B('Dwarkesh — Demis Hassabis', 'Episodio de 1h (Nobel 2024 por AlphaFold): IA × ciencia — directo a tu perfil médico', U.dwDemis, { real: false });
    if (semana <= 8) return B('Dwarkesh — Sholto & Trenton: How LLMs actually think', `Tramo ${semana - 4}/4 (10'): denso — interpretabilidad desde dentro de los labs`, U.dwSholto, { real: false });
    return B('Latent Space — The AI Engineer Podcast', 'Episodio reciente a elección (el podcast del rol al que apuntas)', U.latent, { real: false });
  }
  if (wd === 'Mié') {
    // v7 (arranque miércoles 24-jun): la sem 1 SÍ tiene miércoles (es el día de arranque) → cap = semana (sem 1..12 = caps 1..12).
    // v5.17: Lex tiene 19 caps para 19 miércoles; si el START cae después del miércoles, el cap. 1 va al SÁBADO de la sem 1
    // (su hueco de comodín: esa semana no tuvo audios a medias) y los miércoles siguen con cap = semana → no se pierde ninguno.
    const n = semana;
    const c = lexCap(n);
    return B('Lex #452 — Dario Amodei (CEO Anthropic)', `Outline cap. ${n}: "${c.titulo}" (desde ${c.dur})`, U.lex452, { dur: 'desde ' + c.dur });
  }
  if (wd === 'Jue') return B('The Batch (Andrew Ng)', 'El número de esta semana (sale los jueves): la carta de Ng + 2 noticias — 10 min y fuera', U.theBatch, { real: false });
  if (wd === 'Vie') {
    const MAP = {
      1: [1, 'tramo 1'], 2: [1, 'tramo 2 (termínalo)'], 3: [3, 'completo'], 4: [2, 'tramo 1'],
      5: [2, 'tramo 2 (termínalo)'], 6: [4, 'tramo 1'], 7: [5, 'tramo 1'], 8: [null, 'termina los tramos pendientes de las semanas previas'],
    };
    const m = MAP[semana];
    if (m && m[0]) { const v = ytAnt(m[0]); return B('Canal Anthropic (YouTube)', `"${v.titulo}" — ${m[1]}`, v.url); }
    if (m) return B('Canal Anthropic (YouTube)', m[1], U.antYt, { real: false });
    return B('Canal Anthropic (YouTube)', 'Siguiente vídeo del canal que no hayas visto (elige uno de 10-20 min)', U.antYt, { real: false });
  }
  if (wd === 'Sáb' && semana === 1 && OFF_WD['Mié']) { const c = lexCap(1); return B('Lex #452 — Dario Amodei (CEO Anthropic)', `Outline cap. 1: "${c.titulo}" (desde ${c.dur})`, U.lex452, { dur: 'desde ' + c.dur }); }
  // v5.19 (5-oct): con START en martes la sem 1 no tiene lunes y se cae un episodio de No Priors → va al último sábado del plan
  // (FIN_PLAN = el día que se ALARGA el plan), así el carril del lunes conserva sus 19 piezas.
  if (wd === 'Sáb' && fecha === FIN_PLAN && OFF_WD.Lun) return bloqueB('Lun', semana, fecha);
  // v5.20 (6-oct): con START en miércoles la sem 1 tampoco tiene martes → la pieza del martes que se cae (Latent Space) va al último sábado.
  if (wd === 'Sáb' && fecha === ULT_SAB && OFF_WD.Mar && !(fecha === FIN_PLAN && OFF_WD.Lun)) return bloqueB('Mar', 19 + OFF_WD.Mar, fecha);
  // v6.06 (31-oct-2026): ídem que el jueves de Automate (v5.18) para el VIERNES del canal Anthropic: si el viernes de esta semana es feriado y su
  //   pieza es propia (MAP de la sem 1-8), se oye el SÁBADO en lugar del comodín → no se pierde. Con D1 lun 2-nov el vie 25-dic es de la sem 8
  //   («termina los tramos pendientes de las semanas previas») → sáb 26-dic; con START ≤ 26-oct el 25-dic caía en la sem ≥ 9 (sin pieza propia): nada cambia.
  if (wd === 'Sáb' && fecha && semana <= 8) { const vie = new Date(new Date(fecha + 'T12:00:00Z').getTime() - 864e5).toISOString().slice(0, 10); if (SKIP_FIJOS.has(vie)) return bloqueB('Vie', semana, vie); }
  if (wd === 'Sáb') return B('Comodín de audio', 'Retoma el audio que quedó a medias esta semana (Lex, Dwarkesh o No Priors). Nada nuevo.', undefined, { real: false });
  return null; // Dom: repaso
}

// ─── Bloque C (5', lectura móvil) por día de semana ───
function bloqueC(wd, semana, fecha) {
  const C = (material, leccion, url, opts = {}) => ({ tag: 'C', min: 5, formato: 'lectura', material, leccion, url: url ? assertUrl(url) : undefined, real: opts.real !== false });
  if (wd === 'Lun') {
    // v5.10-b: sem 13-19 siguen con los capítulos reales restantes (8 Customizing · 10 Internals · Apéndice C Comandos)
    const MAP = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 6, 8: 6, 9: 7, 10: 7, 11: 5, 12: 5, 13: 8, 14: 8, 15: 10, 16: 10, 17: 13, 18: 13, 19: 13 };
    const k = semana - OFF_WD.Lun; // v5.17: si la sem 1 no tiene lunes, la serie CORRE una semana
    const cap = progitCap(MAP[k]);
    return C('Pro Git (Scott Chacon)', `5' del cap. ${MAP[k]}: "${cap.titulo}" — sigue donde quedaste`, cap.url);
  }
  if (wd === 'Mar') return C('Simon Willison — serie Prompt injection', 'El siguiente artículo de la serie que no hayas leído (10-20 min: empiézalo, termínalo en otro hueco)', U.willison, { real: false });
  if (wd === 'Mié') {
    // v6: la sem 1 SÍ tiene miércoles → §n = semana (sem 1..12 = §1..12). v5.10-b: el tutorial tiene 16 secciones →
    // sem 17-19 (deload) = repaso de la sección que peor recuerdes (honesto: real:false).
    // v5.17: si el START cae después del miércoles, la serie CORRE una semana (§1 en el 1er miércoles real; no se pierde).
    const n = semana - OFF_WD['Mié'];
    if (n > 16) return C('The Python Tutorial (docs oficiales)', 'Deload: relee 5\' la sección que peor recuerdes (las 16 ya están vistas). Nada nuevo.', U.pyTutorial, { real: false });
    const s = pyTutSec(n);
    return C('The Python Tutorial (docs oficiales)', `Sección ${n}: "${s.titulo}" — para LEER el Python que la IA escribe (no memorizar sintaxis)`, s.url);
  }
  if (wd === 'Jue') {
    const cap = autoCap(semana - 1);
    return C('Automate the Boring Stuff (3ª ed.)', `5' del cap. ${cap.n}: "${cap.titulo}"`, cap.url);
  }
  if (wd === 'Vie') {
    const MAP = {
      1: ['Simon Willison', 'The lethal trifecta for AI agents — EL artículo de seguridad de agentes', U.trifecta],
      2: ['Anthropic Research', 'Many-shot jailbreaking — cómo se rompe un LLM con contexto largo', U.manyShot],
      3: ['Anthropic Research', 'Constitutional Classifiers — el estado del arte en DEFENSA', U.constClass],
      4: ['Anthropic', 'Responsible Scaling Policy — los niveles ASL, lenguaje obligatorio del sector', U.rsp],
    };
    const m = MAP[semana];
    if (m) return C(m[0], m[1], m[2]);
    return C('Simon Willison — serie Prompt injection', 'Siguiente artículo de la serie (o un número atrasado de The Batch)', U.willison, { real: false });
  }
  // v5.18 (3-oct): si el JUEVES de esta semana es feriado (31-dic), su capítulo de Automate se lee el SÁBADO (hueco de comodín)
  // en vez de perderse (v5.16/v5.17 perdían el cap. 13; con D1 en lunes se habría perdido el 12) → los 19 capítulos quedan en el plan.
  if (wd === 'Sáb' && fecha) {
    const jue = new Date(new Date(fecha + 'T12:00:00Z').getTime() - 2 * 864e5).toISOString().slice(0, 10);
    if (SKIP_FIJOS.has(jue)) { const cap = autoCap(semana - 1); if (cap) return C('Automate the Boring Stuff (3ª ed.)', `5' del cap. ${cap.n}: "${cap.titulo}"`, cap.url); }
  }
  // v5.19 (5-oct): ídem para Pro Git (lunes): la pieza que se cae al correr la serie una semana (MAP[19]) va al último sábado del plan.
  if (wd === 'Sáb' && fecha === FIN_PLAN && OFF_WD.Lun) return bloqueC('Lun', 19 + OFF_WD.Lun, fecha);
  // v5.20: ídem para el martes (Simon Willison): la lectura que se cae va al último sábado del plan.
  if (wd === 'Sáb' && fecha === ULT_SAB && OFF_WD.Mar && !(fecha === FIN_PLAN && OFF_WD.Lun)) return bloqueC('Mar', 19, fecha);
  if (wd === 'Sáb') return C('Comodín de lectura', 'Termina la lectura que quedó a medias esta semana. Nada nuevo.', undefined, { real: false });
  return null;
}

// ─── Bloque PC (DOMINGO flexible desde la v6.07; hasta v6.06 sábado 15:00-17:00) = SHIP del proyecto de la semana (vibecoding S1-S12) ───
// v5.7: el PC ya no es "setup / Problem Set CS50P" — es cerrar y publicar el proyecto de 04:15 de esa semana
// (commit / URL viva / test verde según su criterio de aceptación en vibecoding_proyectos.json).
// PC opcional de una semana del taper (S13-S20): 30' si es mantenimiento, 0' si es deload total. Un bloque por entrada del taper.
function bloquePCTaper(tp) {
  return {
    tag: 'PC', min: tp.tipo === 'mantenimiento' ? 30 : 0, formato: 'pc',
    material: `PC opcional · taper S${tp.s} · ${tp.nombre}`,
    leccion: `${tp.ship} Sensores: ${(tp.sensores || []).join(' · ') || 'ninguno (deload total)'}. Sin proyecto nuevo.`,
    url: assertUrl(ccDoc(13).url), real: true,
  };
}
// v6.01 (10-oct-2026): un PC PROPIO por proyecto/taper y NADA se fusiona. Si dos entradas cierran la misma semana (v6.01: S15 jue 21 →
// mar 26-ene y S16 mié 27 → vie 29-ene, ambas con SHIP sáb 30-ene), el sábado de SHIP lleva el PC de la primera (vibeDe) y la segunda
// lleva el suyo el SÁBADO SIGUIENTE, en un bloque aparte (S16 → sáb 6-feb, antes del PC 0' de S17). Antes (borrador v6.01) los dos se
// fusionaban en un solo bloque el sáb 30-ene y el plan quedaba en 18 PC; v6.00 tenía 19 (avance S1 + SHIP S1-S12 + taper S13-S18) y
// v6.01 vuelve a 19 (SHIP S1-S10 + avance S11 + SHIP S11-S12 + taper S13-S18). v6.02 (17-oct): S15 jue 28-ene → mar 2-feb y S16 mié 3 → vie 5-feb
// (SHIP sáb 6-feb) → el PC de S16 va el sáb 13-feb, junto al PC 0' de S17; 19 bloques = SHIP S1-S9 + avance S10 + SHIP S10-S12 + taper S13-S18.
// v6.05 (24-oct): vuelve el desplazamiento de v6.02, una semana después: S15 jue 4 → mar 9-feb y S16 mié 10 → vie 12-feb (SHIP sáb 13-feb) → el PC
// de S16 va el sáb 20-feb, junto al PC 0' de S17; 19 bloques = SHIP S1-S8 + avance S9 + SHIP S9-S12 + taper S13-S18. S19 (sáb 6-mar) y S20 (sáb
// 13-mar, PROTEGIDO) cierran después del FIN_PLAN (vie 5-mar): sin PC aquí.
// v6.03 (20-oct): ningún desplazamiento dentro del plan (S15 jue 4-feb → sáb 6-feb · S16 mar 9-feb → sáb 13-feb); 19 bloques = avance S1 + SHIP S1-S12
// + taper S13-S18. S19 y S20 comparten el sáb 6-mar, que ya es posterior al FIN_PLAN (lun 1-mar): una entrada cuyo SHIP cae fuera del SYNAPSE no
// tiene PC aquí («PC = no» en el catálogo) → no hay nada que desplazar ni que perder (antes se abortaba: el sábado siguiente, 13-mar, es PROTEGIDO).
// Mapa sábado → [entradas del taper desplazadas].
const PC_DESPLAZADOS = (() => {
  const m = new Map();
  for (const x of VIBE_FECHAS) {
    const primero = vibeDe(x.ship);
    if (!primero || primero.s === x.s) continue;            // es la entrada que el sábado de SHIP ya atiende
    if (x.ship > FIN_PLAN) continue;                          // v6.03: SHIP después del SYNAPSE → sin PC aquí (v6.03: S19/S20, sáb 6-mar · v6.05: S19 sáb 6-mar y S20 sáb 13-mar): nada que desplazar
    const tp = TAPER.find((t) => t.s === x.s);
    if (!tp) throw new Error(`El proyecto S${x.s} comparte sábado de SHIP (${x.ship}) con S${primero.s}: resolverlo en el catálogo (solo el taper se desplaza)`);
    const d = new Date(x.ship + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 7);
    // v6.08 (14-nov-2026): el día del PC desplazado nunca es PROTEGIDO → el primer domingo no protegido (S15 y S16 cierran el dom 7-mar; el dom
    //   14-mar es el ENCAPS → el PC de S16 va el dom 21-mar, junto al de S17, que cierra ese domingo). Misma regla en gen_vibecoding_plan.js (pcSab).
    for (let i = 0; i < 4 && PROTEGIDOS_SYN.has(d.toISOString().slice(0, 10)); i++) d.setUTCDate(d.getUTCDate() + 7);
    const sab = d.toISOString().slice(0, 10);
    if (sab > FIN_PLAN) throw new Error(`PC de S${x.s} desplazado al ${sab}, fuera del SYNAPSE (FIN_PLAN ${FIN_PLAN}): se perdería`);
    if (!m.has(sab)) m.set(sab, []);
    m.get(sab).push(tp);
  }
  return m;
})();
const pcDesplazadosDe = (fecha) => (PC_DESPLAZADOS.get(fecha) || []).map(bloquePCTaper);
function bloquePC(semana, fecha) {
  // v5.7: el sábado cierra el proyecto cuyo SHIP cae ESE día (fechas de vibecodingPlan.ts). Si ese sábado
  // no cierra ninguno, el PC es avance del proyecto en curso y se dice cuándo es su SHIP real.
  const f = fecha || null;
  const vs = f ? vibeDe(f) : null;
  const vc = f && !vs ? vibeEnCurso(f) : null;
  const n = (vs || vc || {}).s || semana;
  // v5.10-b · S13+ = taper del vibecoding: el PC del sábado es OPCIONAL (30'): sensores verdes + retro (sem 13-16) o nada (17-19)
  const tp = TAPER.find((x) => x.s === n);
  if (tp) return bloquePCTaper(tp);
  const p = VIBE.find((x) => x.s === n) || VIBE.find((x) => x.s === semana);
  if (!p) throw new Error('sin proyecto vibecoding para la semana ' + semana);
  const dl = p.deload ? ' (semana DELOAD: alcance mínimo)' : '';
  const material = vs || !vc
    ? `SHIP proyecto S${p.s} · ${p.nombre}${dl}`
    : `Avance del proyecto S${p.s} · ${p.nombre}${dl} — SHIP el ${vc.ship}`;
  // v6.10q · v6.10y: el SHIP que absorbe un paso de su proyecto (en_ship) lo dice delante (la guía del SHIP, rutinaGuia.guiaShipDe, lo detalla)
  const enS = vs ? require('./gen_fechas_v6').enShipDe(f, require('./gen_fechas_v6').cargarFechasV6()) : null;
  const dS = enS ? VIBE_PASOS.find((x) => x.fecha === enS && x.semana === p.s) : null;
  const pre = dS ? `Primero el paso ${dS.k}/${VIBE_PASOS.filter((x) => x.semana === p.s).length} de S${p.s} (commit [S${p.s}] + verify ${p.s}); después, ` : '';
  const leccion = `${pre}${p.ship} Criterio de aceptación: ${p.aceptacion.join(' · ')}. Entregable: ${p.entregable}`;
  return { tag: 'PC', min: 120, formato: 'pc', material, leccion, url: assertUrl(p.docs[0].url), real: true };
}
// ─── Domingo = Feynman del proyecto (10', opcional; no rompe la racha si se salta) ───
// v6.07 (fix lote 1b del Calendar, 8-nov-2026): el Feynman explica el proyecto del PC de ESE domingo —el que hace SHIP o, si ninguno cierra, el
//   que está en curso: la MISMA regla que bloquePC (vibeDe / vibeEnCurso sobre las fechas de vibecodingPlan.ts)—, no el de la semana del SYNAPSE.
//   Con el SKIP del vie 25-dic las semanas del vibecoding se desfasan de las del SYNAPSE: dom 3-ene = SHIP S7 (sem 8; antes «Feynman · proyecto
//   S8», que aún no termina) · dom 10-ene → 31-ene = SHIP S8 → S11 (antes S9 → S12) · dom 7-feb = SHIP S12 (sem 13; antes «Domingo libre · taper
//   S13», sin Feynman). En el taper, el rótulo del domingo libre es el de la entrada del PC de ese domingo (el mismo que pinta bloquePC).
function bloqueDom(semana, fecha) {
  const vs = fecha ? vibeDe(fecha) : null;
  const vc = fecha && !vs ? vibeEnCurso(fecha) : null;
  const n = (vs || vc || {}).s || semana;
  const tp = TAPER.find((x) => x.s === n);
  if (tp) {
    // ronda c38 (revisión del ítem 33): la retro con journal_hoy solo el domingo que tiene PC de mantenimiento (30′: el de su taper o uno desplazado, dom 21-mar);
    //   un domingo solo de deload total (PC de 0′, dom 28-mar) no tiene bloque de vibecoding y journal_hoy no escribe nada ese día
    const conPC = [tp, ...(PC_DESPLAZADOS.get(fecha) || [])].some((t) => t.tipo === 'mantenimiento');
    return {
      tag: 'R', min: 5, formato: 'repaso',
      material: `Domingo libre · taper S${tp.s}`,
      leccion: `Sin Feynman de proyecto (no hay proyecto nuevo). Si quieres, ${conPC ? `5' de retro en el journal (node DATA/_scripts/journal_hoy.js) + ` : ''}20' de revisión semanal (DATA/REVISION_SEMANAL.md). Marca ✓ igual: el domingo es libre.`,
      url: assertUrl(ccDoc(13).url), real: true,
    };
  }
  const p = VIBE.find((x) => x.s === Math.min(n, 12));
  const queTxt = vs ? `qué construiste en S${p.s} (el proyecto que hace SHIP hoy)` : vc ? `lo que llevas construido de S${p.s} (su SHIP es el ${vc.ship})` : 'qué construiste esta semana';
  return {
    tag: 'R', min: 10, formato: 'repaso',
    material: `Feynman · proyecto S${p.s}: ${p.nombre}`,
    leccion: `Explica en voz alta, 5', ${queTxt} y CÓMO funciona (sin mirar el código); 5' más: la línea "qué falta" en synapse-journal. Opcional: si descansas, márcalo ✓ igual.`,
    url: assertUrl(p.docs[0].url), real: true,
  };
}

// ─── Calendario: d1 = START (parámetro argv[2], YYYY-MM-DD; v5.4 = jue 2026-09-03) ·
// semana 1 corta (START→dom) · semanas 2-12 alineadas Lun-Dom · 70 A-units intactas (Lun-Sáb) ·
// TODOS los domingos LIBRES. TOTAL = nº de días hasta colocar las 70 A-units (el último día
// puede caer en Lun de una "semana 13" que se etiqueta como sem 12).
// v5.17 (30-sep-2026): si START cae después del lun/mar/mié, la sem 1 no tiene ese día → las series indexadas por
//   semana de ese día (Pro Git lun · Dwarkesh mar · PyTut mié) CORREN una semana (OFF_WD) en vez de saltarse la 1ª pieza;
//   Lex #452 (19 caps = 19 miércoles) no puede correr sin perder el cap. 19 → su cap. 1 va al sábado de la sem 1
//   (antes: «Lex cap 1 y PyTut §1 no se programan… Aceptado»; regla de Joseph: solo corren los días, nada se recorta).
// v5.18 (3-oct-2026): START = lun 5-oct → OFF_WD = 0 en los tres días: todas las series arrancan completas en la sem 1.
// v5.19 (5-oct-2026): START = mar 6-oct → OFF_WD.Lun = 1 (la sem 1 no tiene lunes; mar/mié = 0): No Priors (B) y Pro Git (C)
//   corren una semana y la pieza que se cae va al último sábado del plan (sáb 13-feb = FIN_PLAN, el día que se ALARGA).
// v5.20 (6-oct-2026): START = mié 7-oct → OFF_WD.Lun = 1 y OFF_WD.Mar = 1 (mié = 0). El plan se ALARGA al lun 15-feb (FIN_PLAN), así
//   el carril del lunes recupera su pieza en ese lunes (19 lunes); la pieza del martes que se cae va al último sábado (ULT_SAB = sáb 13-feb).
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
// v6.09b (S1, 17-nov-2026): `--check` = genera en memoria (START del régimen vigente, lun 16-nov) y compara con src/lib/synapseDailyPlan.ts sin escribir
//   (la batería lo llama así; antes `--check` abortaba como START inválido)
const CHECK = process.argv.includes('--check');
const START_ISO = process.argv.slice(2).find((a) => !a.startsWith('--')) || '2026-11-16'; // v6.09 (16-nov-2026): default = lun 16-nov, como la v6.08, pero SIN SESIÓN (corrida_s1; 1.ª sesión mar 17): así el `d` de todas las fechas = v6.08 · v6.08 (14-nov-2026): default = D1 v6.08 lun 16-nov · v6.07 (8-nov-2026): default = D1 v6.07 lun 9-nov · v6.06 (31-oct-2026): default = D1 v6.06 lun 2-nov · v6.05 (24-oct-2026): default = D1 v6.05 lun 26-oct (antes '2026-09-03', el D1 v5.4, sin actualizar desde entonces: sin argumento abortaba en la guarda de los PC); el pipeline pasa siempre la fecha
if(!/^20\d\d-\d\d-\d\d$/.test(START_ISO)) throw new Error('START inválido: '+START_ISO);
const START = new Date(START_ISO + 'T12:00:00'); // START parametrizado: node <script> YYYY-MM-DD
const SDOW = START.getDay();                    // día de la semana del START (0=Dom … 6=Sáb)
const FIRST_WEEK_LEN = (7 - SDOW) % 7 + 1;      // START→dom (genérico por weekday)
// 1 si la sem 1 NO contiene ese día (START cae después de él, o en domingo): la serie de ese día corre una semana
// v6.09: START = lun 16-nov (sin sesión) → OFF_WD = 0 en los tres carriles, el natural de un START en lunes (la pieza del lun 16 va al dom 29: DOM_RECUPERA)
const OFF_WD = { Lun: SDOW === 0 || SDOW > 1 ? 1 : 0, Mar: SDOW === 0 || SDOW > 2 ? 1 : 0, 'Mié': SDOW === 0 || SDOW > 3 ? 1 : 0 };
// v6.09: DOM_RECUPERA (ver RECUPERA_V609 arriba): días Lun-Sáb sin sesión dentro del plan → o son exactamente los de la regla, o ninguno; si no, ABORTA
{
  const ssPlan = [...SIN_SESION_SYN].filter((f) => f >= START_ISO && f <= FIN_PLAN && new Date(f + 'T12:00:00Z').getUTCDay() !== 0 && !SKIP_FIJOS.has(f)).sort();
  if (ssPlan.length) {
    if (JSON.stringify(ssPlan) !== JSON.stringify(RECUPERA_V609.pierde) || (SIN_SESION_SYN.has(RECUPERA_V609.dom) && !RECUPERA_V609.llegada) || RECUPERA_V609.dom < START_ISO) {
      throw new Error(`v6.10 · DOM_RECUPERA: los días Lun-Sáb sin sesión de corrida_s1 dentro del plan (${ssPlan.join(', ')}) ya no son los de la regla (${RECUPERA_V609.pierde.join(', ')} → dom ${RECUPERA_V609.dom}): decidir dónde se recuperan antes de regenerar (si no, 2027 correría y el d dejaría de cuadrar)`);
    }
    DOM_RECUPERA = new Map([[RECUPERA_V609.dom, { wd: RECUPERA_V609.wd, semana: RECUPERA_V609.semana, motivo: RECUPERA_V609.motivo }]]);
    // v6.10: el mar 17 se recupera en la sesión del sáb 28 07:15 (debe ser posterior al día del intercambio y estar dentro del plan)
    if (!(REC_V610.pierde > START_ISO && REC_V610.intercambia > REC_V610.pierde && REC_V610.fecha > REC_V610.intercambia && RECUPERA_V609.pierde.includes(REC_V610.pierde)
      && new Date(REC_V610.intercambia + 'T12:00:00Z').getUTCDay() === new Date(REC_V610.pierde + 'T12:00:00Z').getUTCDay() && !SIN_SESION_SYN.has(REC_V610.fecha))) {
      throw new Error('v6.10 · REC_V610 incoherente (pierde < intercambia < fecha, mismo día de la semana, sesión fuera de los días sin sesión)');
    }
    REC = REC_V610;
  }
}

const aUnits = buildAUnits();
// v6: TOTAL = nº de días para colocar exactamente aUnits.length A-units (= días no-domingo y no-feriado); el último día cae en no-domingo.
let TOTAL = 0; { let ns = 0, dd = 0; while (ns < aUnits.length) { dd++; const dt = new Date(START.getTime() + (dd - 1) * 86400000); const f = dt.toISOString().slice(0, 10); if ((dt.getDay() !== 0 || DOM_RECUPERA.has(f)) && !SKIP_FIJOS.has(f) && !PROTEGIDOS_SYN.has(f) && (!SIN_SESION_SYN.has(f) || DOM_RECUPERA.has(f) || (REC && f === REC.pierde))) ns++; } TOTAL = dd; } // v6.10: + el mar 17 (su A-unit sale en la sesión del sáb 28 07:15) // v6.06: + PROTEGIDOS · v6.09: + SIN SESIÓN (corrida_s1) y DOMINGO DE RECUPERACIÓN (v6.09b: el dom 22 de llegada, aunque esté sin sesión)
let aIdx = 0;
// v6.10 · BASE CERO: fecha de cada A-unit (para las fechas de las fases de SYN_FASES_BC; la del mar 17 sale el mié 18 con la auditoría)
const aDia = [];
const tomarA = (f) => { aDia[aIdx] = f; return aUnits[aIdx++]; };
let pc12Emitido = false; // evita duplicar el PC de la sem 12 cuando esa semana SÍ tiene sábado
const SEM_MAX = 19; // v5.10-b: sem 13-19 = F2 (v5.20: la última A-unit cae el lun 15-feb-2027, que sería la sem 20 y se CLAMPA a la 19 (deload; el carril del lunes repite el cap. 13 de Pro Git = MAP[19]) · v5.19: la última A-unit cae el sáb 13-feb-2027, día 131, dentro de la sem 19 = lun 8 → sáb 13-feb, sin clamp · v5.18: la última A-unit cae el vie 12-feb-2027, día 131, dentro de la sem 19 = lun 8 → vie 12-feb, sin clamp · v5.17: mar 9-feb-2027, día 132; lun 8 y mar 9-feb serían la sem 20 del calendario y el clamp de SEM_MAX los deja en la sem 19. v5.16: vie 5-feb-2027, día 131, dentro de la sem 19)
const dias = [];
const protPend = []; // v6.06: piezas B/C de L-V de días PROTEGIDOS de la sem ≤ SEM_MAX → al primer día de plan tras los protegidos con sem > SEM_MAX (clampada)
for (let d = 1; d <= TOTAL; d++) {
  const date = new Date(START.getTime() + (d - 1) * 86400000);
  const fecha = date.toISOString().slice(0, 10);
  const wd = WD[date.getDay()];
  const semana = d <= FIRST_WEEK_LEN ? 1 : Math.min(2 + Math.floor((d - FIRST_WEEK_LEN - 1) / 7), SEM_MAX); // v6: sem 1 = mar→dom; sem 2+ = lun→dom. 12 miércoles → Lex caps 1-12 (sin offset)
  const faseId = semana <= 8 ? 'f0' : semana <= 12 ? 'f1' : 'f2';
  // v6.10 · BASE CERO (18-nov-2026): F0 ya no se «audita» (✓ si ya hecho → adelantar): se cursa entera desde cero; el detalle por fase, en SYN_FASES_BC
  const fase = faseId === 'f0' ? 'F0 · Fundamentos desde cero (base cero: se cursa entera)' : faseId === 'f1' ? 'F1 · Stack del vibecoding: Claude Code · Supabase · n8n' : 'F2 · Academy restante + prep CCA-F (taper por el ENCAPS)'; // v6.00: antes «(taper del Step 1)»
  const deload = semana >= 17; // v6.00: núcleo de la intensiva ENCAPS (hasta v5.20: Fases B-C del Step 1): si aprieta, solo A o solo B (PROTOCOLO_MODO_MINIMO)
  const bloques = [];
  const semNat = d <= FIRST_WEEK_LEN ? 1 : 2 + Math.floor((d - FIRST_WEEK_LEN - 1) / 7); // v6.06: semana sin clamp
  if (PROTEGIDOS_SYN.has(fecha) && !SKIP_FIJOS.has(fecha)) {
    // v6.06 (31-oct-2026): día PROTEGIDO (vie 12 → lun 15-mar = semana del ENCAPS): sin A/B/C ni PC, no consume A-unit (como el feriado)
    bloques.push({ tag: 'R', min: 0, formato: 'repaso', material: `🛡 Día protegido · ${PROTEGIDOS_SYN.get(fecha)}`, leccion: 'Sin SYNAPSE hoy (día protegido de _fechas_v6.json): la A-unit sigue en el próximo día de plan. Nada que marcar.', real: true });
    if (wd !== 'Dom' && wd !== 'Sáb' && semNat <= SEM_MAX) protPend.push({ wd, semana: semNat, fecha });
  } else if (DOM_RECUPERA.has(fecha) && SIN_SESION_SYN.has(fecha)) {
    // v6.09b: DOMINGO DE LLEGADA (dom 22-nov, sin sesión en corrida_s1): SOLO la recuperación → 1 A-unit + las piezas B/C del carril perdido (lun 16 = sem 1
    //   del lunes); sin Feynman ni PC (el SHIP S1 es el dom 29). Va a las 16:30-17:00, tras la recuperación ENCAPS (rutinaGuia.guiaSynapseDe).
    const rc = DOM_RECUPERA.get(fecha);
    const a = tomarA(fecha);
    bloques.push({ tag: 'A', min: 15, formato: 'pantalla', ...a });
    const nota = (x) => (x ? { ...x, leccion: `${x.leccion} · recupera el ${rc.motivo}` } : x);
    const b = nota(bloqueB(rc.wd, rc.semana, fecha)); if (b) bloques.push(b);
    const c = nota(bloqueC(rc.wd, rc.semana, fecha)); if (c) bloques.push(c);
  } else if (REC && fecha === REC.pierde && SIN_SESION_SYN.has(fecha) && !SKIP_FIJOS.has(fecha)) {
    // v6.10 (17-nov-2026): el mar 17 SIN SESIÓN consume su A-unit APARTE («A directa»): sale en la sesión de recuperación del sáb 28 07:15 (SYN_REC_F1).
    //   El `d` de este día se conserva (= v6.09) y las A-units del mié 18 en adelante no se mueven.
    A_REC = tomarA(fecha);
    bloques.push({ tag: 'R', min: 0, formato: 'repaso', material: `⏸ Sin sesión · ${fecha.slice(8, 10)}-${fecha.slice(5, 7)}`, leccion: `Sin SYNAPSE hoy (día sin sesión de _fechas_v6.json › corrida_s1): la auditoría F0 abre la sesión del mié ${Number(AUDIT_F0_V610.fecha.slice(8, 10))}-nov a las ${AUDIT_F0_V610.ini} (${AUDIT_F0_V610.min}′) y ${REC.cadena ? 'el carril del martes corre una semana (sus piezas de hoy, el mar 24-nov); la última pieza va' : 'las piezas del martes van'} el ${['dom','lun','mar','mié','jue','vie','sáb'][new Date(REC.fecha + 'T12:00:00Z').getUTCDay()]} ${Number(REC.fecha.slice(8, 10))}-${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][Number(REC.fecha.slice(5, 7)) - 1]} a las ${REC.ini}, a hora fija. Nada que marcar.`, real: true });
  } else if (SIN_SESION_SYN.has(fecha) && !SKIP_FIJOS.has(fecha)) {
    // v6.09 (16-nov-2026): día SIN SESIÓN de corrida_s1 (lun 16-nov: no se estudió · sáb 21-nov: viaje) = como un feriado: sin A/B/C, no consume
    //   A-unit; la A-unit sigue el próximo día de plan y el dom 29-nov (DOM_RECUPERA) recupera el día. El `d` de ese día se conserva (= v6.08).
    bloques.push({ tag: 'R', min: 0, formato: 'repaso', material: `${/viaje/i.test(((require('./gen_fechas_v6').cargarFechasV6().corrida_s1.notas || {})[fecha] || []).join(' ')) ? '✈ Día libre (viaje)' : '⏸ Sin sesión'} · ${fecha.slice(8, 10)}-${fecha.slice(5, 7)}`, leccion: `Sin SYNAPSE hoy (día sin sesión de _fechas_v6.json › corrida_s1${DOM_RECUPERA.has(RECUPERA_V609.dom) && (RECUPERA_V609.recuperaDom || RECUPERA_V609.pierde).includes(fecha) ? `; se recupera el dom ${Number(RECUPERA_V609.dom.slice(8, 10))}-${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][Number(RECUPERA_V609.dom.slice(5, 7)) - 1]}` : ''}): la A-unit sigue en el próximo día de plan. Nada que marcar.`, real: true });
  } else if (SKIP_FIJOS.has(fecha)) {
    // v5.10-b: feriado libre (25-dic · 31-dic · 1-ene), como el domingo: sin A/B/C, no consume A-unit
    bloques.push({ tag: 'R', min: 0, formato: 'repaso', material: `🎄 Feriado libre · ${fecha.slice(8, 10)}-${fecha.slice(5, 7)}`, leccion: 'Sin misión. Marca ✓ para conservar la racha; el Anki sigue (due × 20 s).', real: true });
  } else if (wd === 'Dom') {
    // v5.7: domingo = Feynman del proyecto de la semana (10', opcional). Sigue siendo día libre: sin A/B/C.
    bloques.push(bloqueDom(semana, fecha));
    // v6.07 (8-nov-2026): el PC (SHIP del vibecoding, 2 h, flexible) va el DOMINGO; el sábado 15:00-17:00 es la clase EN VIVO de Theomed
    if (DIA_PC === 'Dom') {
      for (const x of pcDesplazadosDe(fecha)) bloques.push(x); // v6.01: PC propio de una entrada del taper que cerró la semana anterior junto con otra
      bloques.push(bloquePC(semana, fecha)); if (semana === 12) pc12Emitido = true;
    }
    // v6.09: DOMINGO DE RECUPERACIÓN (dom 29-nov) → + 1 A-unit + las piezas B/C del carril que se perdió (lun 16 = sem 1 del lunes)
    const rc = DOM_RECUPERA.get(fecha);
    if (rc) {
      const a = tomarA(fecha);
      bloques.push({ tag: 'A', min: 15, formato: 'pantalla', ...a });
      const nota = (x) => (x ? { ...x, leccion: `${x.leccion} · recupera el ${rc.motivo}` } : x);
      const b = nota(bloqueB(rc.wd, rc.semana, fecha)); if (b) bloques.push(b);
      const c = nota(bloqueC(rc.wd, rc.semana, fecha)); if (c) bloques.push(c);
    }
  } else {
    const a = tomarA(fecha);
    bloques.push({ tag: 'A', min: 15, formato: 'pantalla', ...a });
    // v6.06: tras los protegidos, el día de L-V con semana clampada (sem > SEM_MAX) lleva las piezas B/C del día protegido de la sem ≤ 19
    const q = wd !== 'Sáb' && semNat > SEM_MAX && protPend.length ? protPend.shift() : null;
    const nota = (x) => (x && q ? { ...x, leccion: `${x.leccion} · pieza del ${q.wd.toLowerCase()} ${Number(q.fecha.slice(8, 10))}-${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][Number(q.fecha.slice(5, 7)) - 1]} (día protegido)` } : x);
    // v6.10: el día del INTERCAMBIO (mar 24-nov) lleva las piezas B/C de la sem del día perdido (sem 1, las del antiguo mar 17) y la sesión de
    //   recuperación del sáb 28 07:15 las de este día (sem 2): cada serie del carril avanza en orden de fecha
    // v6.10c (CADENA): todos los martes de F1 desde el intercambio hasta la sesión de recuperación llevan las piezas de la semana anterior
    const semBC = REC && (REC.cadena ? wd === REC.wd && fecha >= REC.intercambia && fecha < REC.fecha : fecha === REC.intercambia) ? (REC.cadena ? semana - 1 : REC.semana) : semana;
    const b = nota(q ? bloqueB(q.wd, q.semana, fecha) : bloqueB(wd, semBC, fecha)); if (b) bloques.push(b);
    const c = nota(q ? bloqueC(q.wd, q.semana, fecha) : bloqueC(wd, semBC, fecha)); if (c) bloques.push(c);
    if (wd === 'Sáb' && DIA_PC === 'Sáb') { // hasta v6.06: el PC iba el sábado 15:00-17:00
      for (const x of pcDesplazadosDe(fecha)) bloques.push(x); // v6.01: PC propio de una entrada del taper que cerró la semana anterior junto con otra (S16 → sáb 6-feb)
      bloques.push(bloquePC(semana, fecha)); if (semana === 12) pc12Emitido = true;
    }
    // si la sem 12 no llega a tener su día de PC, su Proyecto-PC (CS50P PS3) se coloca en el último día (sin duplicarlo)
    if (d === TOTAL && wd !== DIA_PC && !pc12Emitido) { bloques.push(bloquePC(12, fecha)); pc12Emitido = true; }
  }
  dias.push({ d, fecha, wd, semana, faseId, fase, deload, bloques });
}
if (aIdx !== aUnits.length) throw new Error(`A-units sin asignar: usadas ${aIdx}/${aUnits.length}`);
// v6.10 · BASE CERO (mié 18-nov-2026): las A-units de F1 van en el ORDEN REAL en que Joseph las ve. Con el alias de corrida_s1 (jue 19-nov → vie 1-ene,
//   cada hábil hace el plan del hábil anterior) el viernes de plan se hace el LUNES siguiente y el sábado / domingo de plan no se mueve: sin esto, cada
//   semana la A del sábado (unidad k+1) se veía ANTES que la del viernes (unidad k) —Claude 101 módulo 2 antes que el 1 (sáb 28 / lun 30-nov), «Customizing
//   + quiz» de Claude Code 101 antes que «Daily workflows» (sáb 5 / lun 7-dic), Karpathy tramo 4/11 antes que el 3/11 (sáb 19 / lun 21-dic)…—. Se
//   reparten las MISMAS A-units de F1 por fecha REAL (alias inverso; sin alias, la del plan): mismas fechas, horas y bloques, solo cambia qué lección cae en
//   cada uno; B y C no se tocan (sus carriles y comodines ya van por fecha). Fuera de F1 nada cambia (2027 idéntico).
// v6.11 fase 2 (lun 23-nov): el alias del SYNAPSE = el global salvo donde manda su alias propio (corrida_s1.alias_frente.synapse: desde el lun 7-dic, el de la v6.10w)
const ALIAS_INV = (() => {
  const c = require('./gen_fechas_v6').cargarFechasV6().corrida_s1 || {};
  const al = { ...(c.alias || {}), ...(((c.alias_frente || {}).synapse || {}).alias || {}) };
  return new Map(Object.entries(al).map(([real, plan]) => [plan, real]));
})();
// v6.10w (dom 22-nov-2026 · «todo inicia el 23»): CADENAS = sesiones que corren UNA sesión, en orden real: el contenido de cada fila pasa a la siguiente y el de la
//   última, a una sesión a hora fija (SYN_REC_F1, bloque syn-rec); la primera queda sin sesión. (1) semana 1: el dom 22 (antes domingo de llegada, sin sesión) →
//   lun 23 (fila del mié 18) → … → sáb 28 21:00 → dom 29 05:00-05:30 (corrida_s1.extra › synapse). (2) transición: el plan del jue 31-dic no tiene día real
//   (el jue 31 y el vie 1 hacen los del mar 29 y el mié 30) → su sesión va el sáb 2-ene 21:00 y la del sáb 2-ene, el dom 3-ene 11:30-12:00 (tras Derma; el
//   dom 3 05:00 sigue siendo la recuperación del mar 17). Las filas, en orden de día REAL; se comprueba contra corrida_s1.
// v6.11 (lun 23-nov-2026 · «a partir del día 24 iniciamos todo»): el lun 23 también fue sin sesión y el alias global corre un hábil → la fila del mar 24 de plan
//   se hace el lun 30 (después del dom 29) y sale de la cadena de la semana 1: mar 24 (fila del mié 18) → … → vie 27 (fila del lun 23) → sáb 28 21:00 → dom 29
//   05:00-05:30; la fila del mar 24 vuelve a llevar su propio contenido el lun 30.
const CADENAS_V610W = [
  { id: 'semana 1', motivo: 'el dom 22-nov fue sin sesión', filas: ['2026-11-22', '2026-11-18', '2026-11-19', '2026-11-20', '2026-11-23', '2026-11-28'], rec: { fecha: '2026-11-29', ini: '05:00', fin: '05:30' } },
  // v6.11 fase 2: semana 2 — el SYNAPSE recupera el hábil que perdió con el lun 23: la fila del mar 1-dic (sin día real: el alias propio del SYNAPSE es el de la
  //   v6.10w desde el lun 7-dic) la hace el sáb 5-dic a las 21:00 y la del sáb 5, el dom 6-dic 05:00-05:30 (como la cadena del dom 29). El SYNAPSE no hace dos
  //   sesiones el mismo día.
  { id: 'semana 2', motivo: 'el lun 23-nov fue sin sesión', filas: ['2026-12-01', '2026-12-05'], rec: { fecha: '2026-12-06', ini: '05:00', fin: '05:30' } },
  { id: 'transición', motivo: 'el plan del jue 31-dic no tiene día propio', filas: ['2026-12-31', '2027-01-02'], rec: { fecha: '2027-01-03', ini: '05:00', fin: '05:30' } },
];
// v6.11 fase 2: las filas de L-V que abren una cadena (sin día real) son las que gen_fechas_v6.js declara en FILAS_FUERA_CORRIDA.synapse (cada fecha de plan, una
//   vez por frente): se comprueba en los dos sentidos
{
  const FF = require('./gen_fechas_v6').FILAS_FUERA_CORRIDA.synapse || {};
  const ab = CADENAS_V610W.filter((c) => { const w = new Date(c.filas[0] + 'T12:00:00Z').getUTCDay(); return w >= 1 && w <= 5; });
  for (const c of ab) if (!FF[c.filas[0]] || FF[c.filas[0]].real !== c.filas[1]) throw new Error(`v6.11 · cadena ${c.id}: la fila ${c.filas[0]} no está en gen_fechas_v6.FILAS_FUERA_CORRIDA.synapse con real = ${c.filas[1]}`);
  for (const p of Object.keys(FF)) if (!ab.some((c) => c.filas[0] === p)) throw new Error(`v6.11 · FILAS_FUERA_CORRIDA.synapse ${p}: no abre ninguna cadena`);
}
// día REAL de cada fila de una cadena (para el orden de las A-units): la fila k la hace el día real de la fila k+1 (la última, la sesión a hora fija)
const REAL_CADENA = new Map(CADENAS_V610W.flatMap((c) => c.filas.map((f, k) => [f, (k + 1 < c.filas.length ? (ALIAS_INV.get(c.filas[k + 1]) || c.filas[k + 1]) : c.rec.fecha) + (k + 1 < c.filas.length ? '' : 'T' + c.rec.ini)])));
// v6.11: una fila cuyo plan se quedó SIN DÍA real (gen_fechas_v6.planesSinDia: el mié 30-dic) va, para el orden, tras el último día del alias (sin hueco en la
//   progresión de los días que sí tienen día real; su A-unit es la siguiente y la coloca otra ronda)
const SIN_DIA_SYN = new Set(require('./gen_fechas_v6').planesSinDia());
const realDe = (f) => REAL_CADENA.get(f) || ALIAS_INV.get(f) || (SIN_DIA_SYN.has(f) ? require('./gen_fechas_v6').ordenRealDe(f) : f); // v6.10 · base cero: día REAL de una fecha de plan (alias inverso de corrida_s1; sin alias, la misma) · v6.10w: + cadenas
{
  const F1_HASTA = '2027-01-03';
  const conA = dias.filter((x) => x.fecha >= START_ISO && x.fecha <= F1_HASTA && x.bloques.filter((b) => b.tag === 'A').length === 1);
  const porPlan = conA.map((x) => x.bloques.find((b) => b.tag === 'A'));
  const ordenReal = [...conA].sort((x, y) => (realDe(x.fecha) < realDe(y.fecha) ? -1 : realDe(x.fecha) > realDe(y.fecha) ? 1 : x.fecha < y.fecha ? -1 : 1));
  const CAMPOS = ['material', 'leccion', 'url', 'dur', 'real', 'audit'];
  const contenido = porPlan.map((b) => Object.fromEntries(CAMPOS.map((k) => [k, b[k]])));
  const idxA = conA.map((x) => aDia.indexOf(x.fecha)); // índice de A-unit de cada día (en orden de plan)
  if (idxA.some((i) => i < 0)) throw new Error('v6.10 · base cero: un día de F1 con A no tiene su A-unit en aDia');
  ordenReal.forEach((x, k) => {
    const b = x.bloques.find((y) => y.tag === 'A');
    for (const c of CAMPOS) { if (contenido[k][c] === undefined) delete b[c]; else b[c] = contenido[k][c]; }
    aDia[idxA[k]] = x.fecha; // la A-unit k (orden de plan) cae ahora en el k-ésimo día REAL
  });
  const nInv = conA.filter((x, k) => ordenReal[k] !== x).length;
  if (!CHECK && nInv) console.log(`v6.10 · base cero: ${nInv} día(s) de F1 cambian de A-unit para que el orden REAL (alias) siga la progresión`);
}
// v6.10 · tanda C (AUDIT_F0_V610): la auditoría F0 (A-unit del mar 17) abre la 1.ª sesión con sus 3′ y la A de ese día queda en 12′ (para a las 12:45)
const aHHg = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const aMing = (h) => { const [x, y] = h.split(':').map(Number); return x * 60 + y; };
if (REC) {
  if (!A_REC || !A_REC.audit || !/^AUDITORÍA F0/.test(A_REC.leccion) || AUDIT_F0_V610.pendiente !== REC.pierde) throw new Error('v6.10 · tanda C: la A-unit del día sin sesión no es la auditoría F0');
  const dA = dias.find((x) => x.fecha === AUDIT_F0_V610.fecha);
  const iA = dA ? dA.bloques.findIndex((b) => b.tag === 'A') : -1;
  if (iA < 0 || dA.bloques[iA].min !== 15 || dias.some((x) => x.fecha > REC.pierde && x.fecha < AUDIT_F0_V610.fecha && x.bloques.some((b) => b.tag === 'A'))) throw new Error('v6.10 · tanda C: el ' + AUDIT_F0_V610.fecha + ' no es la 1.ª sesión con A de 15′ tras el ' + REC.pierde);
  const pasa = aHHg(aMing(AUDIT_F0_V610.ini) + AUDIT_F0_V610.min), finA = aHHg(aMing(AUDIT_F0_V610.ini) + 15);
  if (!AUDIT_F0_V610.como.includes(`A las ${pasa} pasa a la A`)) throw new Error('v6.10 · tanda C: el texto de la auditoría no dice la hora real del paso a la A (' + pasa + ')');
  const A0 = dA.bloques[iA];
  dA.bloques[iA] = { ...A0, min: 15 - AUDIT_F0_V610.min, med: 15 - AUDIT_F0_V610.min,
    guia: { que: `${A0.material} › ${A0.leccion} (${15 - AUDIT_F0_V610.min}′, de ${pasa} a ${finA})`, como: `En el PC, 1,0× con subtítulos en inglés, al terminar la auditoría (${pasa}). Para a las ${finA} aunque la lección siga (la plataforma guarda el progreso); si la lección acaba antes, empieza la siguiente pendiente del curso y para a las ${finA}. Cierre: recall en blanco en el journal (sin mirar, lo que recuerdes). Base cero: aunque en la auditoría la marques ✓, se cursa entera.`, url: A0.url, t: 'A ↗' } };
  dA.bloques.splice(iA, 0, { tag: 'A', min: AUDIT_F0_V610.min, med: AUDIT_F0_V610.min, formato: 'pantalla', material: 'Anthropic Academy', leccion: `${AUDIT_F0_V610.que}: certificados de F0 en «Your learning» (academy.claude.com)`, url: U.academyClaude, real: true, audit: true,
    guia: { que: AUDIT_F0_V610.que, como: AUDIT_F0_V610.como, url: U.academyClaude, t: 'Academy' } });
}
// v6.10: SESIÓN DE RECUPERACIÓN del mar 17 (sáb 28-nov 07:15-07:45) = la A-unit guardada + las piezas B/C del carril del martes de la sem del intercambio
let REC_SES = [];
if (REC) {
  if (!A_REC) throw new Error('v6.10 · REC_V610: el mar 17 no guardó su A-unit');
  // v6.10c (CADENA): la sesión de recuperación lleva las piezas del ÚLTIMO martes de F1 anterior a ella (mar 29-dic, sem 7); sin cadena, las del intercambio
  const di = REC.cadena ? [...dias].reverse().find((x) => x.wd === REC.wd && x.fecha >= REC.intercambia && x.fecha < REC.fecha) : dias.find((x) => x.fecha === REC.intercambia);
  if (REC.cadena && di && dias.some((x) => x.wd === REC.wd && x.fecha >= REC.intercambia && x.fecha <= di.fecha && x.semana - 1 < REC.semana)) throw new Error('v6.10c · REC_V610: la cadena del carril del martes no empieza en la sem ' + REC.semana);
  const dr = dias.find((x) => x.fecha === REC.fecha);
  if (!di || !dr || di.wd !== REC.wd) throw new Error('v6.10 · REC_V610: el día del intercambio o el de la sesión no está en el plan');
  const nota = (x) => (x ? { ...x, leccion: `${x.leccion} · recupera el ${REC.motivo}` } : x);
  // v6.10 · tanda C: la auditoría F0 ya se hizo el mié 18 (AUDIT_F0_V610) → la A de esta sesión = 15′ de material real: la siguiente lección de F0 sin ✓
  const bl = [{ tag: 'A', min: 15, formato: 'pantalla', material: 'Anthropic Academy', leccion: `F0 · la siguiente lección sin ✓ de tu auditoría del ${AUDIT_F0_V610.fecha.slice(8, 10)}-${AUDIT_F0_V610.fecha.slice(5, 7)} (caja de 15′: la Academy no publica duración)`, url: U.academyClaude, real: true, audit: true }];
  const b = nota(bloqueB(REC.wd, di.semana, REC.intercambia)); if (b) bl.push(b);
  const c = nota(bloqueC(REC.wd, di.semana, REC.intercambia)); if (c) bl.push(c);
  const minT = bl.reduce((x, y) => x + y.min, 0);
  const aM = (h) => { const [x, y] = h.split(':').map(Number); return x * 60 + y; };
  if (minT !== 30 || aM(REC.fin) - aM(REC.ini) !== minT) throw new Error(`v6.10 (26i): la sesión de recuperación del ${REC.fecha} suma ${minT}′ y su franja ${REC.ini}-${REC.fin} (A+B+C debe ser 30′)`);
  REC_SES = [{ fecha: REC.fecha, ini: REC.ini, fin: REC.fin, plan: REC.pierde, semana: di.semana, bloques: bl }];
}
if (protPend.length) throw new Error(`v6.06: piezas B/C de días protegidos sin colocar: ${protPend.map((x) => x.fecha).join(', ')}`);
if (dias.some((x) => PROTEGIDOS_SYN.has(x.fecha) && x.bloques.some((b) => b.tag !== 'R'))) throw new Error('v6.06: hay A/B/C/PC en un día PROTEGIDO');
if (dias.some((x) => SIN_SESION_SYN.has(x.fecha) && !DOM_RECUPERA.has(x.fecha) && x.bloques.some((b) => b.tag !== 'R'))) throw new Error('v6.09: hay A/B/C/PC en un día SIN SESIÓN (corrida_s1)');
if (dias.some((x) => DOM_RECUPERA.has(x.fecha) && SIN_SESION_SYN.has(x.fecha) && x.bloques.some((b) => b.tag === 'PC' || b.tag === 'R'))) throw new Error('v6.09b: el domingo de llegada solo lleva la recuperación A/B/C (sin Feynman ni PC)');
for (const f of DOM_RECUPERA.keys()) if (f >= START_ISO && f <= FIN_PLAN && !dias.some((x) => x.fecha === f && x.bloques.some((b) => b.tag === 'A'))) throw new Error('v6.09: el domingo de recuperación ' + f + ' no lleva su A-unit');
// v6.01: cada proyecto S1-S12 tiene UN PC de SHIP y cada entrada del taper cuyo sábado cae dentro del plan, UN PC opcional propio
// (nada se fusiona ni se pierde; S19/S20 cierran después del FIN_PLAN = «PC = no» en el catálogo).
if (VIBE_FECHAS.length) {
  const pcs = dias.flatMap((x) => x.bloques.filter((b) => b.tag === 'PC').map((b) => b.material));
  const cuenta = (pre) => pcs.filter((m) => m.startsWith(pre)).length;
  for (const x of VIBE_FECHAS) {
    const tp = TAPER.find((t) => t.s === x.s);
    const desplazado = [...PC_DESPLAZADOS.values()].some((xs) => xs.some((t) => t.s === x.s));
    const esperado = !tp ? 1 : (x.ship <= FIN_PLAN || desplazado ? 1 : 0);
    const n = tp ? cuenta(`PC opcional · taper S${x.s} · `) : cuenta(`SHIP proyecto S${x.s} · `);
    if (n !== esperado) throw new Error(`PC de S${x.s}: ${n} bloque(s), se esperaba ${esperado}`);
    // v6.01 (10-oct-2026): el sábado del PC de este plan = pcSab de vibecodingPlan.ts (lo que pinta la card del vibecoding vía vibePCSabado).
    const sabPC = ([...PC_DESPLAZADOS].find(([, xs]) => xs.some((t) => t.s === x.s)) || [x.ship])[0];
    if (x.pcSab && x.ship <= FIN_PLAN && x.pcSab !== sabPC) throw new Error(`PC de S${x.s}: el SYNAPSE lo pone el ${sabPC} y vibecodingPlan.ts (pcSab) dice ${x.pcSab}: regenerar gen_vibecoding_plan.js con el mismo START`);
    // v6.05 (fix): pcSab '' = SIN PC (sábado protegido) → este plan no puede tener ningún PC de esa entrada; y el ship del .ts = pcSab (alineados)
    if (x.pcSab === '' && n !== 0) throw new Error(`PC de S${x.s}: vibecodingPlan.ts dice SIN PC (pcSab '') y el SYNAPSE trae ${n}`);
    if (x.pcSab && x.shipTs !== x.pcSab) throw new Error(`S${x.s}: vibecodingPlan.ts trae ship ${x.shipTs} ≠ pcSab ${x.pcSab} (desalineados): regenerar gen_vibecoding_plan.js`);
  }
}
if (dias[TOTAL - 1].fecha !== FIN_PLAN) throw new Error(`El plan debe terminar el ${FIN_PLAN} (v6.08: jue 1-abr · v6.07: mar 23-mar · v6.06: mar 16-mar · v6.05: vie 5-mar · v6.03: lun 1-mar · v6.02: vie 26-feb · v6.01: vie 19-feb · lun 15-feb en v6.00 = v5.20; v5.19: sáb 13-feb); termina el ${dias[TOTAL - 1].fecha}: ajusta las A-units de F2`);

// ─── v6.09b (S1 · mar 17-nov-2026 · auditoría tiempo ↔ material, a2-4 / a2-5 / a2-6): F1 TROCEADO POR FECHA con material MEDIDO ───
// Del mié 18-nov-2026 al dom 3-ene-2027 (el mar 17 está en curso) cada A/B/C con material medible lleva su tamaño real (DATA/SYNAPSE/medidas_f1.json,
//   medir_synapse_f1.js): `leccion` dice el tramo de verdad («tramo 2/3 del plan · min 10:00-25:00 de 1:58:43 a 1,5×», «≈500 palabras: desde «4.1…» hasta
//   el final de «4.3…»») y `guia` es el paso de la guía (rutinaGuia.pasoSyn lo usa antes que la curaduría). Lo que no cabe NO se quita: cola de F1
//   (comodines del sábado, hueco de Lex, 4/5/8-ene ya previstos) y COLA POST-STEP 1 (30′/día L-V desde el lun 13-dic-2027), y cada sesión dice adónde va.
//   Las A-units, el `d`, las piezas por carril y TODO 2027 quedan idénticos (synapse_f1_tramos.js solo reescribe bloques de F1). Solo con el START del
//   régimen v6.09 (lun 16-nov): con otro START (reproducir versiones viejas) no se aplica.
let COLA_POST = [];
let COLA_F1 = []; // v6.09b lote 1-ter: huecos reales de F1 con hora (sáb 26-dic 07:15: el final del deep dive)
{
  const MED_F1 = path.join(ROOT, 'DATA/SYNAPSE/medidas_f1.json');
  if (START_ISO === '2026-11-16' && fs.existsSync(MED_F1)) {
    const hhmm = (s) => String(s).split(':').reduce((a, x) => a * 60 + Number(x), 0);
    const lexCaps = cur('lex-452').lecciones.map((l) => ({ n: l.n, titulo: l.titulo, ini: hhmm(l.dur) }));
    const MED = JSON.parse(fs.readFileSync(MED_F1, 'utf8'));
    // URLs medidas (curl 200 el 17-nov-2026, medir_synapse_f1.js) → allowlist (regla «cero URLs inventadas»)
    for (const L of Object.values(MED.lectura)) { ALLOWED.add(L.url); for (const sx of L.secciones) if (sx.url) ALLOWED.add(sx.url); }
    for (const A of Object.values(MED.audio)) ALLOWED.add(A.url);
    const T = require('./synapse_f1_tramos').crear(MED, { dias, rec: REC_SES, lexCaps, skip: SKIP_FIJOS, protegidos: new Set(PROTEGIDOS_SYN.keys()), feriados: new Set(require('./gen_fechas_v6').cargarFechasV6().feriados), realDe }); // v6.09b lote 1-ter: + feriados (fuera de la cola) · v6.11 (revisión c32): + realDe (la cola se consume en orden de día REAL)
    let n = 0;
    for (const x of dias) for (const b of x.bloques) {
      const o = T.sesiones.get(`${x.fecha}|${b.tag}`);
      if (!o || !['A', 'B', 'C'].includes(b.tag)) continue;
      if (x.fecha > require('./synapse_f1_tramos').HASTA || x.fecha < require('./synapse_f1_tramos').DESDE) throw new Error('v6.09b: tramo F1 fuera de F1 en ' + x.fecha);
      b.leccion = o.leccion; if (o.dur) b.dur = o.dur; b.guia = o.guia; b.med = Math.round(o.med * 100) / 100; if (o.min) b.min = o.min; n++; // v6.09b lote 1-ter: el sábado A/C con sus minutos reales (A + B + C = 30)
      if (o.guia && o.guia.url) assertUrl(o.guia.url);
    }
    // v6.09b lote 1-quater (QS · hallazgo a de R2): el ÚNICO bloque de 2027 que reescribe el troceado de F1 = el B del vie 8-ene («termina los tramos
    //   pendientes»: recibe 2 restos de F1 y su paso dice cuáles, a qué minutos y a qué velocidad). Cualquier otra fecha fuera de F1 aborta.
    const TR = require('./synapse_f1_tramos');
    for (const [k, o] of T.extra2027 || []) {
      const [f, tag] = k.split('|');
      if (!TR.EXTRA_2027.includes(f)) throw new Error('v6.09b lote 1-quater: bloque de 2027 no autorizado ' + k);
      const b = (dias.find((x) => x.fecha === f) || { bloques: [] }).bloques.find((y) => y.tag === tag);
      if (!b || !/termina los tramos pendientes/.test(b.leccion)) throw new Error('v6.09b lote 1-quater: ' + k + ' ya no es el B «termina los tramos pendientes»');
      b.leccion = o.leccion; b.guia = o.guia; b.med = Math.round(o.med * 100) / 100; n++;
      if (o.guia && o.guia.url) assertUrl(o.guia.url);
    }
    // v6.10: la sesión de recuperación del sáb 28 07:15 (clave «fecha@hora|tag»): B y C con su tramo; el A (auditoría F0, Academy sin duración
    //   publicada) lleva su paso aquí: 5′ de auditoría + 10′ de la primera lección de F0 sin ✓ (la plataforma guarda el progreso) = 15′
    for (const r of REC_SES) for (const b of r.bloques) {
      const o = T.sesiones.get(`${r.fecha}@${r.ini}|${b.tag}`);
      // v6.10c · FIX r1 (hallazgo 1): la A de la sesión de recuperación trae su propio material (el vídeo que el comodín de ayer dejó a medias, medido):
      //   material, url y sin la marca de auditoría de F0 (no es una A-unit de F0)
      if (o) { b.leccion = o.leccion; if (o.dur) b.dur = o.dur; b.guia = o.guia; b.med = Math.round(o.med * 100) / 100; if (o.min) b.min = o.min; if (o.material) b.material = o.material; if (o.url) { assertUrl(o.url); b.url = o.url; } if (o.audit === false) delete b.audit; n++; if (o.guia && o.guia.url) assertUrl(o.guia.url); continue; }
      // v6.10c · FIX r1 (hallazgo 1): ya no hay caja «la siguiente lección de F0 sin ✓» (el 3-ene no queda ninguna lección de F0 en la Academy, así que
      //   el plan no «llega» a ninguna): la A de la recuperación la pone synapse_f1_tramos.js con material medido; si no llega, ABORTA (nunca una caja vacía).
      throw new Error(`v6.10: la sesión de recuperación ${r.fecha} ${r.ini} trae un bloque ${b.tag} sin tramo medido`);
    }
    // v6.10c · FIX r1 (hallazgos 3 y 6): minutos de una caja de la Academy (A sin tramo medido) que compensa un B de Lex que bajó de 10′ (mié 2-dic: A 16′ + B 9′)
    for (const [k, m] of T.ajusteMin || []) {
      const [f, tag] = k.split('|');
      const b = (dias.find((x) => x.fecha === f) || { bloques: [] }).bloques.find((y) => y.tag === tag);
      if (!b || b.guia || b.material === undefined || !/academy\.claude\.com/.test(b.url || '')) throw new Error('v6.10c · FIX r1: ajuste de minutos ' + k + ' sobre un bloque que no es una caja de la Academy');
      b.min = m; n++;
    }
    for (const x of dias) { const s = x.bloques.filter((b) => ['A', 'B', 'C'].includes(b.tag)).reduce((a, b) => a + b.min, 0); if (x.fecha >= require('./synapse_f1_tramos').DESDE && x.fecha <= require('./synapse_f1_tramos').HASTA && s && s !== 30) throw new Error(`v6.10c · FIX r1: el SYNAPSE del ${x.fecha} suma ${s}′ (A + B + C debe ser 30′)`); }
    COLA_POST = T.cola;
    COLA_F1 = T.colaF1;
    if (!CHECK) console.log(`v6.09b · F1 troceado con material medido: ${n} bloques A/B/C reescritos · cola post-Step 1: ${COLA_POST.length} días (${COLA_POST[0] ? COLA_POST[0].fecha : '—'} → ${COLA_POST.length ? COLA_POST[COLA_POST.length - 1].fecha : '—'})`);
  }
}
// v6.10w · CADENAS_V610W (arriba): el contenido A/B/C de cada fila pasa a la siguiente; el de la última, a la sesión a hora fija. Se comprueba: filas en orden de día
//   REAL (alias de corrida_s1), sesión a hora fija dentro de las ventanas del domingo y, la de la semana 1, = corrida_s1.extra › synapse.
{
  const F6c = require('./gen_fechas_v6').cargarFechasV6();
  const VF = require('./gen_fechas_v6').VENTANAS_FINDE;
  const aMc = (h) => { const [x, y] = h.split(':').map(Number); return x * 60 + y; };
  // v6.11 fase 2 (remate, revisión «textos» MEDIA): el «Sin sesión» de la fila que abre cada cadena cita su motivo («el lun 23-nov fue sin sesión»); la pasada que
  //   traduce las fechas de las filas de las cadenas lo convertía en «el sáb 28-nov fue sin sesión» (y «el mié 18-nov…», «el plan del sáb 2-ene…»): se repone
  const SIN_SES_CAD = new Map();
  for (const c of CADENAS_V610W) {
    const reales = c.filas.map((f) => ALIAS_INV.get(f) || f);
    for (let k = 1; k < c.filas.length; k++) if (!(reales[k] > reales[k - 1]) && !(k === 1 && c.filas[0] === '2026-12-31')) throw new Error(`v6.10w · cadena ${c.id}: las filas no van en orden de día real (${c.filas.join(' → ')})`);
    if (!(c.rec.fecha > reales[reales.length - 1])) throw new Error(`v6.10w · cadena ${c.id}: la sesión a hora fija (${c.rec.fecha}) no es posterior a la última fila`);
    const w = new Date(c.rec.fecha + 'T12:00:00Z').getUTCDay();
    if (!(VF[w] || []).some(([a, z]) => aMc(c.rec.ini) >= aMc(a) && aMc(c.rec.fin) <= aMc(z)) || aMc(c.rec.fin) - aMc(c.rec.ini) !== 30) throw new Error(`v6.10w · cadena ${c.id}: ${c.rec.fecha} ${c.rec.ini}-${c.rec.fin} fuera de las ventanas del fin de semana o ≠ 30′`);
    const ex = (((F6c.corrida_s1 || {}).extra || {})[c.rec.fecha] || {}).synapse;
    if (!ex) throw new Error(`v6.10w · cadena ${c.id}: corrida_s1.extra[${c.rec.fecha}] no trae synapse (sin él la plantilla no pinta la sesión)`);
    const filas = c.filas.map((f) => dias.find((x) => x.fecha === f));
    if (filas.some((x) => !x)) throw new Error(`v6.10w · cadena ${c.id}: una fila no está en el plan`);
    const abc = (x) => x.bloques.filter((b) => ['A', 'B', 'C'].includes(b.tag));
    if (filas.some((x) => x.bloques.some((b) => !['A', 'B', 'C'].includes(b.tag)))) throw new Error(`v6.10w · cadena ${c.id}: una fila trae bloques que no son A/B/C`);
    // el «recupera el lun 16-nov …» que el domingo de llegada añadía a sus piezas ya no vale (esa sesión va el lun 23)
    const limpia = (b) => (typeof b.leccion === 'string' ? { ...b, leccion: b.leccion.replace(/ · recupera el lun 16-nov[^·]*$/, '') } : { ...b });
    const contenido = filas.map((x) => abc(x).map(limpia));
    // A-units: su fecha pasa a la de la fila siguiente (la última, a la sesión a hora fija)
    for (let k = c.filas.length - 1; k >= 0; k--) { const dest = k + 1 < c.filas.length ? c.filas[k + 1] : c.rec.fecha; for (let i = 0; i < aDia.length; i++) if (aDia[i] === c.filas[k]) aDia[i] = dest; }
    for (let k = c.filas.length - 1; k >= 1; k--) filas[k].bloques = contenido[k - 1];
    const f0 = c.filas[0];
    filas[0].bloques = [{ tag: 'R', min: 0, formato: 'repaso', material: `⏸ Sin sesión · ${f0.slice(8, 10)}-${f0.slice(5, 7)}`, leccion: `Sin SYNAPSE en este día de plan (${c.motivo}): su sesión la hace el ${['dom','lun','mar','mié','jue','vie','sáb'][new Date(reales[1] + 'T12:00:00Z').getUTCDay()]} ${Number(reales[1].slice(8, 10))}-${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][Number(reales[1].slice(5, 7)) - 1]} y cada sesión corre una, hasta la de ${['dom','lun','mar','mié','jue','vie','sáb'][w]} ${Number(c.rec.fecha.slice(8, 10))}-${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][Number(c.rec.fecha.slice(5, 7)) - 1]} a las ${c.rec.ini}. Nada que marcar.`, real: true }];
    SIN_SES_CAD.set(f0, filas[0].bloques[0].leccion); // v6.11 fase 2 (remate): su motivo no pasa por el remap de fechas de abajo
    const ult = contenido[contenido.length - 1];
    const minT = ult.reduce((a, b) => a + b.min, 0);
    if (minT !== 30) throw new Error(`v6.10w · cadena ${c.id}: la sesión que va a hora fija suma ${minT}′ (A + B + C debe ser 30′)`);
    REC_SES.push({ fecha: c.rec.fecha, ini: c.rec.ini, fin: c.rec.fin, plan: c.filas[c.filas.length - 1], semana: filas[filas.length - 1].semana, bloques: ult, cadena: c.motivo });
  }
  REC_SES.sort((a, b) => (a.fecha + a.ini < b.fecha + b.ini ? -1 : 1));
  // v6.10w: las FECHAS que los textos del SYNAPSE citan de las filas de una cadena («retoma donde paraste el vie 20-nov», «Lo que queda → sáb 28-nov 21:00»)
  //   pasan a la fila que ahora lleva ese contenido (la última, a la sesión a hora fija, con su hora). Una sola pasada sobre todos los textos de F1.
  {
    const MESr = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'], DOWr = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    const fCr = (iso) => `${DOWr[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${Number(iso.slice(8))}-${MESr[Number(iso.slice(5, 7)) - 1]}`;
    const MAPA = new Map();
    for (const c of CADENAS_V610W) c.filas.forEach((f, k) => MAPA.set(f, k + 1 < c.filas.length ? { a: c.filas[k + 1] } : { a: c.rec.fecha, h: c.rec.ini }));
    // remate v6.10w (revisión textos): + la hora entre paréntesis («del sáb 2-ene (21:00)»): con la fila movida a una sesión a hora fija, la hora vieja se va
    //   con la fecha (antes quedaba «del dom 3-ene 05:00 (21:00)»)
    const RXr = /\b(lun|mar|mié|jue|vie|sáb|dom) (\d{1,2})-(nov|dic|ene)( \d{2}:\d{2}| \(\d{2}:\d{2}\))?/g;
    const remap = (t) => (typeof t !== 'string' ? t : t.replace(RXr, (m, dw, dd, mes, hh) => {
      const iso = `${mes === 'ene' ? 2027 : 2026}-${String(MESr.indexOf(mes) + 1).padStart(2, '0')}-${String(Number(dd)).padStart(2, '0')}`;
      const x = MAPA.get(iso);
      if (!x || DOWr[new Date(iso + 'T12:00:00Z').getUTCDay()] !== dw) return m;
      return `${fCr(x.a)}${x.h ? (hh ? ` ${x.h}` : ` ${x.h}`) : hh || ''}`;
    }));
    const tocar = (b) => { for (const k of ['leccion']) if (b[k]) b[k] = remap(b[k]); if (b.guia) for (const k of ['que', 'como']) if (b.guia[k]) b.guia[k] = remap(b.guia[k]); };
    const hasta = '2027-01-03';
    for (const x of dias) if (x.fecha <= hasta) for (const b of x.bloques) tocar(b);
    for (const r of REC_SES) for (const b of r.bloques) tocar(b);
    for (const c of [...COLA_F1, ...COLA_POST]) for (const k of Object.keys(c)) if (typeof c[k] === 'string') c[k] = remap(c[k]); else if (Array.isArray(c[k])) c[k].forEach((y) => y && typeof y === 'object' && tocar(y));
    // v6.11 (revisión c32): el «Retoma donde quedaste el …» de la cola (pieza.retoma, ISO de la fila de PLAN que leyó esa pieza por última vez) también pasa a la
    //   fila que ahora lleva ese contenido: con la cadena de la semana 1, «Whetting Your Appetite» (fila del mié 18) se lee el mié 25 real y la cola decía «mar 24»
    for (const c of [...COLA_F1, ...COLA_POST]) for (const p of c.pasos || []) for (const z of p.piezas || []) if (z.retoma && MAPA.has(z.retoma)) z.retoma = MAPA.get(z.retoma).a;
    for (const [f0, t] of SIN_SES_CAD) { const x = dias.find((y) => y.fecha === f0); if (!x || !x.bloques[0] || x.bloques[0].tag !== 'R') throw new Error(`v6.11 · cadena: la fila ${f0} ya no es «Sin sesión»`); x.bloques[0].leccion = t; }
  }
  // la A de la recuperación del mar 17 (dom 3 11:30) sigue el vídeo que el comodín de la sesión de las 05:00 deja a medias (antes, el del sáb 2-ene a las 21:00)
  for (const r of REC_SES) if (!r.cadena) for (const b of r.bloques) for (const k of ['leccion']) if (typeof b[k] === 'string') b[k] = b[k].replace(/sigue al comodín del sáb 2-ene/, 'sigue a la sesión de las 05:00 de hoy');
  for (const r of REC_SES) if (!r.cadena) for (const b of r.bloques) if (b.guia) for (const k of ['que', 'como']) if (typeof b.guia[k] === 'string') b.guia[k] = b.guia[k].replace(/del comodín del sáb 2-ene|el comodín del sáb 2-ene/g, 'la sesión de las 05:00 de hoy');
  if (!CHECK) console.log(`v6.10w · cadenas: ${CADENAS_V610W.map((c) => `${c.id} (${c.filas.length} filas → ${c.rec.fecha} ${c.rec.ini})`).join(' · ')}`);
}

// ─── v6.10 · BASE CERO (mié 18-nov-2026 · orden de Joseph: «todos estamos partiendo de cero … estructura planes bien estructurados, verifica todo»):
//   FASES EXPLÍCITAS del SYNAPSE (DATA/SYNAPSE/METODO_BASE_CERO.md, con fuentes y la síntesis «NLM» del cuaderno «IA · desde cero»). F0 se parte en 4
//   fases de dificultad creciente (fluidez → usar Claude/Claude Code → plataforma y agentes → el LLM por dentro) y F1/F2 del motor son las fases 5 y 6.
//   Cada fase dice qué se hace, su GATE (preguntas SOLO reales: el «Course quiz» oficial de la Academy; donde no hay quiz oficial, recall en blanco /
//   Feynman, nunca preguntas inventadas) y el criterio de avance. Las fechas salen del recorrido (aDia: fecha de cada A-unit); nada de horas ni minutos.
// v6.10p (rev. c18, diffs #17/#18): un GATE con 2 fechas lleva `gate1` = lo que se aprueba en la 1.ª (hoy · si es un quiz oficial · lo que falta, que va
//   a la 2.ª fecha): el jue 10-dic pedía «los 5 workflows de memoria» antes del ensayo que los enseña (vie 11 y sáb 12-dic) y el 1-dic, el quiz de Claude
//   Code 101 antes de su curso. En la 2.ª fecha, el gate completo (`gate`). Fase 3: «(recall en blanco)» dentro del 2.º requisito, delante de «en el journal»
//   (el aviso lo dejaba fuera para no pasar de 240 y ningún evento del Calendar decía ya cómo se hace)
const FASES_BC_DEF = [
  { id: '1', corto: 'Fluidez con la IA (AI Fluency · marco 4D)', a: [0, 8], gates: [8], gateCorto: '«Course quiz» oficial de AI Fluency',
    que: 'AI Fluency (Dakan · Feller · Anthropic): qué es la IA generativa, qué puede y qué no, y las 4D (Delegation · Description · Discernment · Diligence).',
    gate: '«Course quiz» oficial de AI Fluency (preguntas reales de la Academy) aprobado → insignia.' },
  { id: '2', corto: 'Usar Claude y Claude Code (sin programar aún)', a: [9, 16], gates: [12, 16], gateCorto: '«Course quiz» oficial de Claude 101 y de Claude Code 101',
    que: 'Claude 101 (proyectos, artefactos, skills, conectores) y Claude Code 101 (instalar, primer prompt, explorar → planificar → codificar → commit, CLAUDE.md).',
    gate: '«Course quiz» oficial de Claude 101 (1.er gate) y de Claude Code 101 (2.º gate) aprobados → 2 insignias.',
    gate1: { hoy: '«Course quiz» oficial de Claude 101 aprobado → insignia', quiz: true, resto: 'el de Claude Code 101' } },
  { id: '3', corto: 'La API y los agentes (concepto)', a: [17, 21], gates: [19, 21], gateCorto: '«Claude Platform 101 quiz» oficial + los 5 workflows de memoria',
    que: 'Claude Platform 101 (primera llamada a la API, modelos, bucle del agente, tool use) y «Building Effective Agents» (5 workflows y cuándo NO usar agentes).',
    gate: '«Claude Platform 101 quiz» oficial aprobado + los 5 workflows de memoria (recall en blanco) en el journal (el ensayo no trae quiz).',
    gate1: { hoy: '«Claude Platform 101 quiz» oficial aprobado', quiz: true, resto: 'los 5 workflows de memoria (recall en blanco)' },
    // v6.10u (auditoría c19 · diffs #19): la 2.ª fecha pide SOLO lo que falta, con sus minutos (antes el gate entero: volvía a pedir el quiz)
    gate2: { hoy: 'los 5 workflows de memoria en el journal (recall en blanco: 4′ al cerrar el A, sin mirarlo)', previo: 'el «Claude Platform 101 quiz»' } },
  { id: '4', corto: 'Cómo funciona un LLM por dentro', a: [22, 45], gates: [35, 45], gateCorto: 'recall en blanco del pipeline del LLM vs el «grand summary» de Karpathy (sin quiz oficial)',
    que: 'Karpathy (Intro to LLMs + Deep Dive: datos → tokens → preentrenamiento → SFT → RL/RLHF → alucinaciones y herramientas) y 3Blue1Brown (redes, gradiente, transformers, atención).',
    gate: 'Sin quiz oficial (nada inventado): recall en blanco del pipeline del LLM contrastado con el «grand summary» de Karpathy (tramo 11/11) y, al cierre de F0, explicarlo en voz alta.',
    gate1: { hoy: 'recall en blanco del pipeline del LLM vs el «grand summary» de Karpathy (tramo 11/11; sin quiz oficial)', quiz: false, resto: 'explicarlo en voz alta (cierre de F0)' } },
];
const SYN_FASES_BC = FASES_BC_DEF.map((f) => {
  const fechaA = (i) => (i === 0 && REC ? AUDIT_F0_V610.fecha : aDia[i]);
  if (!fechaA(f.a[0]) || !fechaA(f.a[1]) || f.gates.some((g) => !fechaA(g))) throw new Error(`v6.10 · base cero: la fase ${f.id} tiene A-units sin fecha`);
  // fechas de PLAN de sus sesiones, en orden REAL (alias): desde = la 1.ª que Joseph ve · hasta = la última (las A-units de F1 ya van en orden real)
  const fechas = [];
  for (let i = f.a[0]; i <= f.a[1]; i++) if (!fechas.includes(fechaA(i))) fechas.push(fechaA(i));
  fechas.sort((x, y) => (realDe(x) < realDe(y) ? -1 : realDe(x) > realDe(y) ? 1 : 0));
  if (f.gate1 && f.gates.length !== 2) throw new Error(`v6.10p: la fase ${f.id} trae gate1 sin 2 fechas de gate`);
  if (f.gate2 && !f.gate1) throw new Error(`v6.10u: la fase ${f.id} trae gate2 sin gate1`);
  return { id: f.id, corto: f.corto, desde: fechas[0], hasta: fechas[fechas.length - 1], fechas, gateFechas: f.gates.map(fechaA), que: f.que, gate: f.gate, gateCorto: f.gateCorto, ...(f.gate1 ? { gate1: f.gate1 } : {}), ...(f.gate2 ? { gate2: f.gate2 } : {}) };
});
{
  // fases 5 y 6 = F1 y F2 del motor (2027): fechas = primer / último día con A; gate = el día con el quiz final / el simulacro de la Academy
  // (la última A-unit de F0 —3Blue1Brown cap. 7, «CIERRE F0»— cae el lun 11-ene, ya en la sem 9: la fase 5 empieza al día siguiente)
  const finF0 = SYN_FASES_BC[SYN_FASES_BC.length - 1].fechas.reduce((m, x) => (x > m ? x : m), '');
  const conA = (id) => dias.filter((x) => x.faseId === id && x.fecha > finF0 && x.bloques.some((b) => b.tag === 'A'));
  const f1 = conA('f1'), f2 = conA('f2');
  const gateF1 = f1.filter((x) => x.bloques.some((b) => b.tag === 'A' && /quiz final/.test(b.leccion))).map((x) => x.fecha);
  const gateF2 = f2.filter((x) => x.bloques.some((b) => b.tag === 'A' && /^Prep CCA-F · simulacro/.test(b.material))).map((x) => x.fecha);
  if (!f1.length || !f2.length || !gateF1.length || !gateF2.length) throw new Error('v6.10 · base cero: no encuentro el gate de F1 (quiz final) o de F2 (simulacro)');
  SYN_FASES_BC.push(
    { id: '5', corto: 'El stack del vibecoding (Claude Code · Supabase · n8n)', desde: f1[0].fecha, hasta: f1[f1.length - 1].fecha, fechas: [], gateFechas: gateF1, gateCorto: '«Course quiz» final de Claude Code in Action',
      que: 'Docs oficiales de Claude Code (memoria, skills, hooks, subagentes, MCP, headless), Supabase (RLS, select, triggers, webhooks, Edge Functions) y n8n, aplicados a los proyectos S9-S12.',
      gate: '«Course quiz» final oficial de Claude Code in Action aprobado + el SHIP de S9-S11 con verify 4/4.' },
    { id: '6', corto: 'Academy restante + preparación CCA-F', desde: f2[0].fecha, hasta: f2[f2.length - 1].fecha, fechas: [], gateFechas: gateF2, gateCorto: 'simulacro con los quizzes oficiales de la Academy',
      que: 'Building with the Claude API, MCP (intro y avanzado), agent skills, subagentes, AI Capabilities and Limitations, Cowork y 3 ensayos de ingeniería de contexto.',
      gate: 'Simulacro con los quizzes oficiales de la Academy (Final assessment de Building with the Claude API + Course Quiz de Claude Code in Action) en modo examen, % por dominio.' });
}
for (let i = 1; i < SYN_FASES_BC.length; i++) if (realDe(SYN_FASES_BC[i].desde) <= realDe(SYN_FASES_BC[i - 1].hasta)) throw new Error(`v6.10 · base cero: la fase ${SYN_FASES_BC[i].id} empieza antes de que acabe la ${SYN_FASES_BC[i - 1].id}`);

// ─── Emitir TypeScript ───
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const blkTs = (b) => {
  let o = `{tag:"${b.tag}",min:${b.min},formato:"${b.formato}",material:"${esc(b.material)}",leccion:"${esc(b.leccion)}"`;
  if (b.url) o += `,url:"${esc(b.url)}"`;
  if (b.dur) o += `,dur:"${esc(b.dur)}"`;
  o += `,real:${b.real !== false}`;
  if (b.audit) o += `,audit:true`;
  if (b.guia) o += `,med:${b.med},guia:{que:"${esc(b.guia.que)}",como:"${esc(b.guia.como)}"${b.guia.url ? `,url:"${esc(b.guia.url)}"` : ''}${b.guia.t ? `,t:"${esc(b.guia.t)}"` : ''}}`; // v6.09b: F1 medido
  o += `}`;
  return o;
};
const diaTs = (x) => `{d:${x.d},fecha:"${x.fecha}",wd:"${x.wd}",semana:${x.semana},faseId:"${x.faseId}",fase:"${esc(x.fase)}",${x.deload ? 'deload:true,' : ''}bloques:[${x.bloques.map(blkTs).join(',')}]}`;

const nF2 = dias.filter((x) => x.faseId === 'f2').length;
const ts = `/**
 * synapseDailyPlan.ts — Motor día-a-día SYNAPSE (${SEM_MAX} semanas · ${TOTAL} días · ${dias[0].fecha} → ${dias[TOTAL - 1].fecha}).
 * Arranque ${dias[0].wd} ${dias[0].fecha} (START parametrizado) · sem 1 = ${dias[0].wd}→dom · domingos = Feynman del proyecto (10', opcional) ${DIA_PC === 'Dom' ? '+ PC = SHIP del vibecoding (2 h, flexible; v6.07)' : '(día libre)'} ·
 * sáb = A/B/C${DIA_PC === 'Sáb' ? ' + PC (bloque personal, sí va en finde)' : ' (el PC pasó al domingo en la v6.07: el sábado 15:00-17:00 es la clase EN VIVO de Theomed)'} · feriados y SKIP dentro del plan (${[...SKIP_FIJOS].filter((f) => f >= dias[0].fecha && f <= FIN_PLAN).sort().join(' · ')}) = libres (bloque R; v6.09: el 31-dic-2026 ya es día de plan).
 * v5.10-b (12-sep-2026): + F2 · sem 13-19 (${nF2} días, ${dias.find(x => x.semana === 13).wd.toLowerCase()} ${dias.find(x => x.semana === 13).fecha} → ${FIN_PLAN}) = Anthropic Academy restante + prep CCA-F
 * (v6.00: taper por el ENCAPS —hasta v5.20, taper del Step 1—; sem 17-19 con deload:true). Los días 1-81 son idénticos a v5.10.
${DOM_RECUPERA.size ? ` * v6.09: días SIN SESIÓN (corrida_s1) ${[...SIN_SESION_SYN].filter((f) => f >= START_ISO && f <= FIN_PLAN && !DOM_RECUPERA.has(f)).join(' · ')} = bloque R de 0′; el ${[...DOM_RECUPERA.keys()].join(' · ')} (domingo${RECUPERA_V609.llegada ? ' de llegada, v6.09b: 16:30-17:00, sin Feynman ni PC' : ''}) recupera
 * una A-unit + las piezas B/C del ${[...DOM_RECUPERA.values()].map((r) => r.wd.toLowerCase() + ' de la sem ' + r.semana).join(' · ')}. El \`d\` de cada fecha no cambia (START = lunes, como la v6.08).
` : ''}${REC_SES.length ? ` * v6.10: el ${REC.pierde} (sin sesión): su A-unit (auditoría F0) abre la sesión del ${AUDIT_F0_V610.fecha} con ${AUDIT_F0_V610.min}′ (tanda C, decidido con Joseph) y sus piezas B/C
 * ${REC.cadena ? `del carril del martes CORREN UNA SEMANA (v6.10c, cadena): cada martes de F1 desde el ${REC.intercambia} lleva las de la semana anterior y las de la sem ${REC_SES[0].semana} (último martes de F1) van` : `del carril del martes de la sem ${REC_SES[0].semana} van`} a la sesión de recuperación del ${REC_SES.map((r) => r.fecha + ' ' + r.ini + '-' + r.fin).join(' · ')} (SYN_REC_F1; su A = 15′ medidos del vídeo que el comodín de la víspera dejó a medias —v6.10c FIX r1—)${REC.cadena ? '' : `; el ${REC.intercambia} lleva las de la sem ${REC.semana}`}. Desde el lun 4-ene, como la v6.09.
` : ''} * GENERADO por DATA/_scripts/gen_synapse_plan.js desde DATA/SYNAPSE/curricula/_extracted.json
 * (temarios REALES extraídos con WebFetch/oEmbed + verificación adversarial, 10-jun-2026).
 * NO editar a mano — regenerar: node DATA/_scripts/gen_synapse_plan.js YYYY-MM-DD
 *
 * Estructura del día (30 min en espacios muertos, instrucción verbatim de Joseph):
 *  A (15', pantalla)  lección EXACTA de la fase actual con link directo
 *  B (10', audio)     rotación: No Priors → Dwarkesh → Lex #452 (outline real) → The Batch (jue) → canal Anthropic (vie)
 *  C (5', lectura)    píldora móvil: Pro Git / Willison / Python Tutorial / Automate / research de Anthropic
 *  PC (DOMINGO, flexible, 2 h; v6.07 —hasta v6.06 el sábado 15:00-17:00, hoy clase EN VIVO de Theomed—) = SHIP del proyecto de la semana del
 *  VIBECODING 04:15 (src/lib/vibecodingPlan.ts) · Dom = Feynman del proyecto (10', opcional) + ese PC. Progreso REAL manual (PlanKey 'synapse', empieza 0%).
 * real:true = lección/temario verificado; real:false = "siguiente episodio/tramo" (honesto, sin inventar).
 * audit:true = A-unit de F0 (cursada en jun-ago; progreso solo en localStorage). v6.10 · BASE CERO (18-nov-2026): ya no se salta lo «ya hecho»: se cursa entera (SYN_FASES_BC).
 * Cobertura v5.7: F0 (sem 1-8, auditar) + F1 = STACK DEL VIBECODING (sem 9-12: Claude Code docs · Academy
 * skills/subagentes/MCP/Claude Code in Action · Supabase RLS/select/triggers/webhooks/Edge Functions · n8n)
 * + F2 (sem 13-19): Building with the Claude API · MCP restante + MCP Advanced Topics · agent skills/subagentes ·
 * Claude Code in Action restante · AI Capabilities and Limitations · Claude Cowork · 3 ensayos de context engineering ·
 * repaso por los 5 dominios del CCA-F · simulacro · cierre (curricula/_extracted.json, extraído 5-sep y 12-sep-2026).
 * Después del ${FIN_PLAN} (v6.08: jue 1-abr-2027, en F3 · v6.07: mar 23-mar-2027, en F3 · v6.06: mar 16-mar-2027, ya en F3 tras el ENCAPS; los PROTEGIDOS vie 12 → lun 15-mar = bloque R de 0′ · v6.05: vie 5-mar-2027 · v6.03: lun 1-mar · v6.02: vie 26-feb · v6.01: vie 19-feb · v6.00 = v5.20: lun 15-feb; v5.19: sáb 13-feb · v5.18: vie 12-feb · v5.17: mar 9-feb) no hay SYNAPSE. v6.00 (6-oct-2026): sigue la intensiva
 * ENCAPS (examen dom 14-mar-2027 PROVISIONAL) y el Step 1 vuelve el mar 16-mar (tramo 2; examen lun 6-dic-2027 desde v6.07 · lun 25-oct-2027 en v6.04-v6.06 —v6.00-v6.03: lun 27-sep—).
 */
export type SynFormato = 'pantalla' | 'audio' | 'lectura' | 'pc' | 'repaso';
export interface SynBloque {
  tag: 'A' | 'B' | 'C' | 'PC' | 'R';
  min: number;
  formato: SynFormato;
  material: string;
  leccion: string;
  url?: string;
  dur?: string;
  real: boolean;
  audit?: boolean; // F0 (cursada en jun-ago) · v6.10 base cero: se cursa entera igual (antes «auditar: ✓ si ya hecho»)
  /** v6.09b (F1 medido, 18-nov-2026 → 3-ene-2027): minutos que pide el material (duración ÷ velocidad · palabras ÷ 100) */
  med?: number;
  /** v6.09b: paso de la guía con el tramo exacto y adónde va el resto (rutinaGuia.pasoSyn lo usa antes que la curaduría) */
  guia?: { que: string; como: string; url?: string; t?: string };
}
export interface DiaSynapse {
  d: number; fecha: string; wd: string; semana: number;
  faseId: 'f0' | 'f1' | 'f2'; fase: string;
  deload?: boolean; // sem 17-19 (v6.00: núcleo de la intensiva ENCAPS): si aprieta, solo A o solo B (PROTOCOLO_MODO_MINIMO)
  bloques: SynBloque[];
}

export const SYN_PLAN_META = {
  inicio: '${dias[0].fecha}', fin: '${dias[TOTAL - 1].fecha}', totalDias: ${TOTAL}, semanas: ${SEM_MAX},
  bloque: "A 15' pantalla · B 10' audio · C 5' lectura · DOMINGO PC 2h flexible = SHIP del proyecto (S13-S16: PC opcional 30') + Feynman 10' opcional",
  /** v6.07: día del bloque PC (SHIP del vibecoding): 'Dom' (hasta v6.06 'Sáb' 15:00-17:00). */
  diaPC: '${DIA_PC}',
  fases: { f0: 'F0 · Fundamentos desde cero (sem 1-8; base cero: se cursa entera)', f1: 'F1 · Stack del vibecoding: Claude Code · Supabase · n8n (sem 9-12)', f2: 'F2 · Academy restante + prep CCA-F (sem 13-19, taper por el ENCAPS; 17-19 deload)' },
  deloadDesde: 17,
} as const;

export const SYN_DIAS: DiaSynapse[] = [
${dias.map(diaTs).join(',\n')}
];

export function synDiaDe(fechaISO: string): DiaSynapse | undefined { return SYN_DIAS.find(x => x.fecha === fechaISO); }

/** v6.09b (S1, 17-nov-2026): COLA POST-STEP 1 del SYNAPSE de F1 — lo que no cupo en su sesión de F1 (ni en los comodines del sábado, el hueco de Lex o
 *  las sesiones de 2027 que ya lo prevén), con fecha: 30′/día L-V desde el lun 13-dic-2027 (tras el examen del lun 6-dic). Audio a la velocidad de su
 *  serie; lectura a 100 palabras/min. Cada sesión de F1 que deja un resto dice aquí qué días le tocan.
 *  v6.09b lote 1-ter (S3 · hallazgo 1 de la revisión R): con FRANJA REAL — bloque SYNAPSE 04:15-04:45 L-V en F5 (plantillasV6 › bloqueSynCola ·
 *  rutinaGuia › guiaSynapseColaDe): cada día, sus PASOS con minutos enteros que suman la franja (campo min; campo med = lo que pide el material, ratio en
 *  [0,85; 1,15]). SYN_COLA_F1 = huecos reales de F1 con hora para lo que no cupo en los comodines del sábado (sáb 26-dic 07:15: el final del deep dive). */
export interface SynColaPieza { tipo: 'audio' | 'lectura'; id: string; titulo: string; url: string; desde: string; hasta?: string; palabras?: number; vel?: number; med: number; retoma: string }
export interface SynColaPaso { min: number; med: number; piezas: SynColaPieza[] }
export interface SynColaDia { fecha: string; ini: string; fin: string; min: number; med: number; pasos: SynColaPaso[] }
export const SYN_COLA_POST_STEP1: SynColaDia[] = ${JSON.stringify(COLA_POST)};
export const SYN_COLA_F1: SynColaDia[] = ${JSON.stringify(COLA_F1)};
/** v6.09b lote 1-ter: día de cola (hueco de F1 con hora o post-Step 1) de una fecha · undefined si no hay */
export function synColaDe(fechaISO: string): SynColaDia | undefined { return SYN_COLA_F1.find((x) => x.fecha === fechaISO) ?? SYN_COLA_POST_STEP1.find((x) => x.fecha === fechaISO); }
/** v6.10 (17-nov-2026): SESIONES DE RECUPERACIÓN a hora fija (gen_synapse_plan.js › REC_V610 = _fechas_v6.json › corrida_s1.extra[fecha].synapse): el v6.10c
 *  dom 3-ene 05:00-05:30 (v6.10: sáb 28-nov 07:15-07:45) recupera el mar 17 (sin sesión): A = 15′ medidos del vídeo que el comodín del sáb 2-ene dejó a medias («Interpretability…» min 15:00-37:30 a 1,5×; v6.10c FIX r1: antes «la siguiente lección de F0 sin ✓», que el 3-ene ya no existe) + las piezas B/C del carril del martes de
 *  la sem ${REC_SES.length ? REC_SES[0].semana : '—'} (el mar 24 lleva las de la sem 1). \`plan\` = el día que recupera. Bloque «syn-rec» de plantillasV6 · rutinaGuia › guiaSynapseRecDe. */
export interface SynRecSesion { fecha: string; ini: string; fin: string; plan: string; semana: number; bloques: SynBloque[];
  /** v6.10w: sesión de una CADENA (las sesiones corren una): el motivo; \`plan\` = la fila cuyo contenido trae */
  cadena?: string }
export const SYN_REC_F1: SynRecSesion[] = [${REC_SES.map((r) => `{fecha:"${r.fecha}",ini:"${r.ini}",fin:"${r.fin}",plan:"${r.plan}",semana:${r.semana},bloques:[${r.bloques.map(blkTs).join(',')}]${r.cadena ? `,cadena:${JSON.stringify(r.cadena)}` : ''}}`).join(',' + String.fromCharCode(10))}];
/** v6.10: sesión de recuperación del SYNAPSE de una fecha (v6.10c: dom 3-ene 05:00 · v6.10: sáb 28-nov 07:15) · undefined si no hay */
export function synRecDe(fechaISO: string, ini?: string | null): SynRecSesion | undefined { return SYN_REC_F1.find((x) => x.fecha === fechaISO && (!ini || x.ini === ini)) ?? (ini ? undefined : undefined); }
/** v6.10w: todas las sesiones a hora fija de una fecha, por hora (dom 3-ene: 05:00 recuperación del mar 17 + 11:30 la del sáb 2-ene) */
export function synRecsDe(fechaISO: string): SynRecSesion[] { return SYN_REC_F1.filter((x) => x.fecha === fechaISO); }
/** v6.10w: CADENAS (gen_synapse_plan.js › CADENAS_V610W): filas de PLAN en orden real cuyo contenido corrió una sesión (la de filas[k] está ahora en filas[k+1];
 *  la de la última, en la sesión a hora fija \`rec\`). rutinaGuia la usa para la curaduría por fecha (SYN_SERIES), que se calcula con la disposición original. */
export const SYN_CADENAS: { filas: string[]; rec: { fecha: string; ini: string; fin: string } }[] = ${JSON.stringify(CADENAS_V610W.map((c) => ({ filas: c.filas, rec: c.rec })))};
/** v6.10 · BASE CERO (18-nov-2026): fases explícitas del SYNAPSE (1-4 = F0 partida por dificultad · 5 = F1 · 6 = F2). Cada fase: qué se hace, su GATE
 *  (preguntas solo REALES: «Course quiz» oficial de la Academy; sin quiz oficial, recall en blanco / Feynman) y sus fechas de plan. Criterio de avance:
 *  SYN_AVANCE_BC. Método y fuentes: DATA/SYNAPSE/METODO_BASE_CERO.md. rutinaGuia › guiaSynapseDe lo pone en el aviso de cada sesión. */
export interface SynFaseBC { id: string; corto: string; desde: string; hasta: string; fechas: string[]; gateFechas: string[]; que: string; gate: string; gateCorto: string;
  /** v6.10p: gate con 2 fechas → lo que se aprueba en la 1.ª (\`hoy\`; \`quiz\` = es un quiz oficial) y lo que queda para la 2.ª (\`resto\`); en la 2.ª, \`gate\` entero */
  gate1?: { hoy: string; quiz: boolean; resto: string };
  /** v6.10u: si está, la 2.ª fecha pide solo esto (\`hoy\`) y recuerda cuándo fue la 1.ª parte (\`previo\`), en vez del \`gate\` entero */
  gate2?: { hoy: string; previo: string } }
export const SYN_FASES_BC: SynFaseBC[] = ${JSON.stringify(SYN_FASES_BC)};
/** v6.10 · base cero: criterio de avance común a todas las fases (las fechas no se mueven) */
export const SYN_AVANCE_BC = 'Las fechas no se mueven: la fase siguiente empieza en su fecha. Un quiz oficial no aprobado se repite en el PC del domingo siguiente (SHIP, flexible) hasta aprobarlo, solo con las lecciones falladas.';
/** v6.10 · base cero: fase del SYNAPSE de una fecha de PLAN. Fases 1-4 (F1, con alias): por sus \`fechas\` (desde / hasta = 1.ª y última sesión en orden REAL;
 *  un día sin A —domingo, feriado— toma la fase de la última fecha de plan anterior que sí la tiene). Fases 5-6 (2027): por rango. */
export function synFaseBCDe(fechaISO: string): SynFaseBC | undefined {
  const exacta = SYN_FASES_BC.find((f) => f.fechas.includes(fechaISO));
  if (exacta) return exacta;
  const r = SYN_FASES_BC.find((f) => !f.fechas.length && f.desde <= fechaISO && fechaISO <= f.hasta);
  if (r) return r;
  let mejor: { f: SynFaseBC; x: string } | undefined;
  for (const f of SYN_FASES_BC) for (const x of f.fechas.length ? f.fechas : [f.desde]) if (x <= fechaISO && (!mejor || x > mejor.x)) mejor = { f, x };
  return mejor?.f;
}
export function syn7d(fromD: number): DiaSynapse[] { return SYN_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }

export const SYN_FORMATO_ICON: Record<SynFormato, string> = {
  pantalla: '📱', audio: '🎧', lectura: '📖', pc: '⌨️', repaso: '🌿',
};
export const SYN_TAG_LABEL: Record<SynBloque['tag'], string> = {
  A: "A · 15' lección", B: "B · 10' audio", C: "C · 5' lectura", PC: "PC · dom 2h · SHIP", R: "Feynman · 10' (opcional)",
};
`;

if (CHECK) {
  // v6.09b: --check = mismo contenido que el .ts en disco (sin escribir nada; CRLF/LF indiferente)
  if (process.env.SYN_DUMP) fs.writeFileSync(process.env.SYN_DUMP, ts, "utf8"); // depuración: volcar lo generado
  const nl = (x) => x.split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
  const disco = nl(fs.readFileSync(path.join(ROOT, 'src/lib/synapseDailyPlan.ts'), 'utf8'));
  if (disco !== nl(ts)) { console.error('✗ src/lib/synapseDailyPlan.ts NO está al día: node DATA/_scripts/gen_synapse_plan.js ' + START_ISO); process.exit(1); }
  console.log(`✓ synapseDailyPlan.ts al día · ${TOTAL} días · ${aUnits.length} A-units · fin ${dias[TOTAL - 1].fecha} · F1 medido: ${dias.reduce((a, x) => a + x.bloques.filter((b) => b.guia).length, 0)} bloques · cola post-Step 1: ${COLA_POST.length} días (${COLA_POST.reduce((x, d) => x + d.min, 0)}′, ${COLA_POST[0] ? COLA_POST[0].ini : '—'}) · huecos de F1 con hora: ${COLA_F1.map((d) => `${d.fecha} ${d.ini}-${d.fin}`).join(' · ') || '—'}`);
  process.exit(0);
}
fs.writeFileSync(path.join(ROOT, 'src/lib/synapseDailyPlan.ts'), ts, 'utf8');
console.log('OK src/lib/synapseDailyPlan.ts ·', TOTAL, 'días ·', aUnits.length, 'A-units · F0 sem 1-8 (audit) · F1 sem 9-12 = stack vibecoding · F2 sem 13-19 = Academy restante + CCA-F (' + nF2 + ' días) · PC = SHIP S1-S12 · fin', dias[TOTAL - 1].fecha);

// ─── Emitir curricula/<id>.md (temarios reales para futuras vueltas) ───
const curDir = path.join(ROOT, 'DATA/SYNAPSE/curricula');
for (const t of EX) {
  if (!t.accesible || !(t.lecciones || []).length) continue;
  const md = [
    `# ${t.nombre}`,
    '',
    `> URL: ${t.urlFinal || t.url}`,
    /^(academy-mcp-advanced|academy-cowork|academy-ai-capabilities)$/.test(t.id)
      ? `> Extraído con WebFetch el 12-sep-2026 (F2 · Academy restante + prep CCA-F, v5.10-b) · URL verificada 200 con check_links.js.`
      : /^academy-/.test(t.id)
      ? `> Extraído con WebFetch el 5-sep-2026 (stack del vibecoding, v5.7) · v6.10c (17-nov-2026): enlace a academy.claude.com (Skilljar cierra en diciembre; slug verificado en la Academy).`
      : /^(claude-code-docs|academy-|supabase-docs|n8n-docs)/.test(t.id)
      ? `> Extraído con WebFetch el 5-sep-2026 (stack del vibecoding, v5.7) · URL verificada 200 con check_links.js.`
      : `> Extraído y verificado adversarialmente el 10-jun-2026 (WebFetch/oEmbed, workflow 30 agentes).`,
    t.verificado ? `> Verificación: CONFIRMADA.` : `> Verificación: con observaciones (ver _extracted.json · problemas).`,
    '',
    ...t.lecciones.map((l, i) => `${i + 1}. ${l.modulo ? `**[${l.modulo}]** ` : ''}${l.titulo}${l.dur ? ` _(${l.dur})_` : ''}${l.url ? ` — ${l.url}` : ''}`),
    '',
    t.notas ? `**Notas de extracción:** ${t.notas}` : '',
  ].join('\n');
  fs.writeFileSync(path.join(curDir, t.id + '.md'), md, 'utf8');
}
console.log('OK curricula/*.md emitidos');
