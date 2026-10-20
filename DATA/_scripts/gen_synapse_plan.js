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
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const EX = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/SYNAPSE/curricula/_extracted.json'), 'utf8'));
const VCAT = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/SYNAPSE/vibecoding_proyectos.json'), 'utf8'));
const VIBE = VCAT.proyectos;
const TAPER = VCAT.taper || []; // S13-S20 (v5.10-b): mantenimiento/deload; el PC del sábado los referencia
if (VIBE.length !== 12) throw new Error('vibecoding_proyectos.json debe tener 12 proyectos');
const FIN_PLAN = '2027-03-01'; // v6.03 (20-oct-2026): D1 = mié 21-oct (lun 19 y mar 20-oct sin estudio: 2 días Lun-Sáb perdidos) → las 110 A-units Lun-Sáb terminan el LUN 1-MAR-2027 (+2 días de plan; nada se recorta; START en miércoles → OFF_WD.Lun = OFF_WD.Mar = 1, como v5.20: el lun 1-mar cuenta como sem 19 por SEM_MAX y devuelve la pieza del carril del lunes) · v6.02 (17-oct-2026): vie 26-feb-2027 — D1 = lun 19-oct (no se estudió lun 12 → sáb 17-oct: 6 días Lun-Sáb perdidos) → las 110 A-units Lun-Sáb terminan el VIE 26-FEB-2027 (+6 días de plan; nada se recorta; START en lunes → OFF_WD = 0, como en v6.01) · v6.01 (10-oct-2026): vie 19-feb-2027 — D1 = lun 12-oct (no se estudió mié 7 → sáb 10-oct: 4 días Lun-Sáb perdidos) → las 110 A-units Lun-Sáb terminan el VIE 19-FEB-2027 (+4 días de plan; nada se recorta). Con START en lunes OFF_WD = 0 en lun/mar/mié: ninguna serie corre una semana y ya no hay pieza del lunes/martes que vaya al último sábado (ULT_SAB sin uso) · v6.00 (6-oct-2026): sin cambio de fecha (lun 15-feb-2027, dentro de la intensiva ENCAPS) · v5.20 (6-oct-2026, DEFINITIVA): lun 15-feb-2027 (= D91 del Step 1; con D1 mié 7-oct las 110 A-units Lun-Sáb terminan aquí) · v5.19 (5-oct-2026): sáb 13-feb-2027 (+1 día: con D1 mar 6-oct las 110 A-units Lun-Sáb terminan aquí) · v5.18 (3-oct-2026): vie 12-feb-2027 (= D92 del Step 1; con D1 lun 5-oct las 110 A-units Lun-Sáb terminan aquí) · v5.17 (30-sep-2026): mar 9-feb · mar 9-feb-2027 (= D91 del Step 1; con D1 en jueves las 110 A-units — que también usan los sábados — terminan un hábil antes que el +3 exacto: nada se recorta). v5.16: vie 5-feb. Con D1 = lun 28-sep las 110 A-units corren +3 hábiles más (nada se fusiona; el domingo no cuenta): 30' de lectura, sin PC. v5.15: lun 1-feb. v5.14: vie 29-ene · v5.13: mar 26-ene · v5.12: lun 25-ene. Se comprueba al final.
const SKIP_FIJOS = new Set(require('./gen_fechas_v6').cargarFechasV6().skip); // v6.00: SKIP de _fechas_v6.json (feriados libres; jue 25 / vie 26-mar quedan fuera del rango) · v5.20: 25-dic/31-dic/1-ene
// v5.20: último SÁBADO del plan (≤ FIN_PLAN). Si la sem 1 no tiene martes (START en miércoles o después), la pieza del carril del
// martes que se cae (B Latent Space · C Willison) va a ese sábado; así el carril del martes conserva sus 19 piezas.
const ULT_SAB = (() => { const d = new Date(FIN_PLAN + 'T12:00:00Z'); while (d.getUTCDay() !== 6) d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); })();
// v5.7: fechas REALES de cada proyecto del vibecoding (ini/fin/ship) leídas de src/lib/vibecodingPlan.ts,
// que las calcula sobre días hábiles desde D1. Sin esto, el PC del sábado anunciaba el SHIP de un proyecto
// que aún no había terminado (D1 en miércoles ⇒ las semanas del vibecoding no coinciden con las de SYNAPSE).
let VIBE_FECHAS = [];
try {
  const vp = fs.readFileSync(path.join(ROOT, 'src/lib/vibecodingPlan.ts'), 'utf8');
  // v6.01 (10-oct-2026): + pcSab (sábado del PC que la card del vibecoding pinta vía vibePCSabado); se comprueba contra este plan más abajo.
  VIBE_FECHAS = [...vp.matchAll(/\{s:(\d+),id:"[^"]*",nombre:"[^"]*"[\s\S]*?ini:"(20\d\d-\d\d-\d\d)",fin:"(20\d\d-\d\d-\d\d)",ship:"(20\d\d-\d\d-\d\d)"(?:,pcSab:"(20\d\d-\d\d-\d\d)")?/g)]
    .map((m) => ({ s: +m[1], ini: m[2], fin: m[3], ship: m[4], pcSab: m[5] || null }));
} catch { /* aún no generado: se cae al comportamiento por semana */ }
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
  aif: 'https://anthropic.skilljar.com/ai-fluency-framework-foundations',
  c101: 'https://anthropic.skilljar.com/claude-101',
  cc101: 'https://anthropic.skilljar.com/claude-code-101',
  cp101: 'https://anthropic.skilljar.com/claude-platform-101',
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
  push('AI Fluency: Framework & Foundations', '"Conclusion" + evaluación final → descarga tu CERTIFICADO (1º entregable de F0)', U.aif);
  push('Claude 101', 'Módulo "Meet Claude": What is Claude? · Your first conversation · Getting better results · Desktop app (Chat, Cowork, Code)', U.c101);
  push('Claude 101', 'Módulo "Organizing your work and knowledge": projects · artifacts · skills', U.c101);
  push('Claude 101', 'Módulo "Expanding Claude\'s reach": connecting your tools · enterprise search · research mode', U.c101);
  push('Claude 101', '"Putting it all together" (use-cases by role · other ways to work) + "What\'s next?" → CERTIFICADO Claude 101', U.c101);
  push('Claude Code 101', '"What is Claude Code?" + "How Claude Code works" — el agente con el que ya trabajas, por dentro', U.cc101);
  push('Claude Code 101', '"Installing Claude Code" + "Your first prompt"', U.cc101);
  push('Claude Code 101', 'Módulo "Daily workflows": the explore → plan → code → commit workflow · Context management · Code review', U.cc101);
  push('Claude Code 101', 'Módulo "Customizing": CLAUDE.md · Subagents · Skills · MCP · Hooks + quiz final del curso', U.cc101);
  push('Claude Platform 101', '"What is the Claude Developer Platform?" + "Your first API call" + "Choosing the right model"', U.cp101);
  push('Claude Platform 101', 'Módulo "Teaching your Agent": The agent loop explained · What is tool use? · What is thinking?', U.cp101);
  push('Claude Platform 101', '"Extending your Agent" (built-in tools · skills · MCP · context) + "Managed Agents" + quiz → serie 101 COMPLETA', U.cp101);
  push('Building Effective AI Agents (ensayo)', 'Parte I: "What are agents?" · "When (and when not) to use agents" · "When and how to use frameworks" · "The augmented LLM"', U.ensayo);
  push('Building Effective AI Agents (ensayo)', 'Parte II: los 5 workflows — Prompt chaining · Routing · Parallelization · Orchestrator-workers · Evaluator-optimizer — + "Agents" + "Summary". Son pregunta de entrevista: apréndelos con nombre.', U.ensayo);
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
  push('Academy — ' + cur('academy-cc-in-action').nombre, `"${acad('academy-cc-in-action', 7).titulo}" · "${acad('academy-cc-in-action', 8).titulo}" · "${acad('academy-cc-in-action', 9).titulo}" · "${acad('academy-cc-in-action', 12).titulo}" → quiz final (certificado)`, cur('academy-cc-in-action').url);
  push('Claude Code docs — ' + ccDoc(13).modulo, 'Give Claude a way to verify its work · Explore first, then plan, then code · Add an adversarial review step · Avoid common failure patterns → CIERRE F1: relee tu synapse-journal de 12 semanas y anota los 3 hábitos que faltan.', ccDoc(13).url);
  if (A.length !== 70) throw new Error('Total A-units F0+F1 debe ser 70, hay ' + A.length);

  // v5.10-b · cierre de la sem 12 (v6.03: jue 14 + vie 15-ene, ya en la sem 13 por fecha; SHIP S12 = sáb 16-ene · v6.02: mar 12 + mié 13-ene, ya en la sem 13 por fecha; SHIP S12 = sáb 16-ene · v6.01: mar 5 + mié 6-ene, ya en la sem 13 por fecha; SHIP S12 = sáb 9-ene · v5.20: mar 29 + mié 30-dic, ambas ya en la sem 13 por fecha; v5.19: lun 28 + mar 29-dic, ambas ya en la sem 13 por fecha; v5.18: sáb 26-dic + lun 28-dic, la 2.ª ya en la sem 13 por fecha; v5.17: mar 22 + mié 23-dic; v5.16: vie 18-dic + sáb 19-dic; en v5.10-b vie 4 + sáb 5-dic, antes fuera del plan): 2 A-units F1 con lecciones reales aún no usadas
  push('Academy — ' + cur('academy-cc-in-action').nombre, `"${acad('academy-cc-in-action', 5).titulo}" · "${acad('academy-cc-in-action', 6).titulo}" — cierra S12: el capstone se VERIFICA (verify_vibecoding.js), no se recuerda.`, cur('academy-cc-in-action').url);
  push('Claude Code docs — ' + ccDoc(4).modulo, ccDoc(4).titulo + '. Repaso antes del taper: qué hook automatiza cada sensor (SessionEnd → telemetría Anki; PostToolUse → verificar_planes). SHIP S12 en el PC del sábado (v6.03 = v6.02: sáb 16-ene · v6.01: sáb 9-ene · v6.00 = v5.20: sáb 2-ene, igual que v5.18-v5.19 · v5.17: sáb 26-dic).', ccDoc(4).url);
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
  push(apiN, `Módulo 1 "${api(1).modulo}": ${api(1).titulo}. Arranca el certificado que falta (prep directa del CCA-F).`, apiU);
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
  push('Academy — ' + cur('academy-mcp').nombre, `${t(acad('academy-mcp', 12))} · ${t(acad('academy-mcp', 13))} → CERTIFICADO Introduction to MCP`, cur('academy-mcp').url);
  push(mcpAN, `${t(mcpA(1))} · ${t(mcpA(2))} · ${t(mcpA(3))} · ${t(mcpA(4))} · ${t(mcpA(5))} (sampling: el servidor pide al cliente que llame al modelo)`, mcpAU);
  // sem 16 (4; v5.18-v5.20: el 31-dic y el 1-ene caen en la sem 13, no aquí) · API IV: apps · agentes y workflows · certificado
  push(apiN, `Módulo 9 "${api(9).modulo}": ${api(9).titulo}`, apiU);
  push(apiN, `Módulo 10 "${api(10).modulo}" (I): Agents and workflows · Parallelization workflows · Chaining workflows · Routing workflows`, apiU);
  push(apiN, `Módulo 10 "${api(10).modulo}" (II): Agents and tools · Environment inspection · Workflows vs agents · Quiz — dominio Agentic Architecture (27%), el de mayor peso.`, apiU);
  push(apiN, `Módulos 11-12: "${api(11).modulo}" + "${api(12).modulo}" → CERTIFICADO Building with the Claude API (cierre de año).`, apiU);
  // sem 17 (6 · Fase B · deload) · Academy restante: skills · subagentes · Claude Code in Action · MCP Advanced II-III
  push('Academy — ' + cur('academy-agent-skills').nombre, `${t(acad('academy-agent-skills', 3))} · ${t(acad('academy-agent-skills', 4))}`, cur('academy-agent-skills').url);
  push('Academy — ' + cur('academy-agent-skills').nombre + ' + ' + cur('academy-subagents').nombre, `${t(acad('academy-agent-skills', 5))} · ${t(acad('academy-agent-skills', 6))} + ${t(acad('academy-subagents', 4))} → certificados agent skills + subagents`, cur('academy-agent-skills').url);
  push('Academy — ' + cur('academy-cc-in-action').nombre, `${t(acad('academy-cc-in-action', 10))} · ${t(acad('academy-cc-in-action', 11))}`, cur('academy-cc-in-action').url);
  push('Academy — ' + cur('academy-cc-in-action').nombre + ' + Claude Code docs — ' + ccDoc(11).modulo, `${t(acad('academy-cc-in-action', 13))} + repaso de la doc de plugins (dominio Claude Code, 20%): ¿qué de YoCPMD ya es plugin?`, cur('academy-cc-in-action').url);
  push(mcpAN, `${t(mcpA(6))} · ${t(mcpA(7))} · ${t(mcpA(8))} · ${t(mcpA(9))} · ${t(mcpA(11))} · ${t(mcpA(12))}`, mcpAU);
  push(mcpAN, `${t(mcpA(13))} · ${t(mcpA(14))} · ${t(mcpA(15))} · ${t(mcpA(16))} · ${t(mcpA(17))} · ${t(mcpA(18))} · ${t(mcpA(19))} → CERTIFICADO MCP Advanced Topics`, mcpAU);
  // sem 18 (6 · Fase B · deload) · los 3 ensayos + Academy nueva (AI Capabilities · Cowork)
  push('Anthropic Engineering — ensayo', 'Effective context engineering for AI agents: context rot · compaction · structured note-taking · just-in-time retrieval — dominio Context Management (15%) del CCA-F.', U.contextEng);
  push('Anthropic Engineering — ensayo', 'Effective harnesses for long-running agents: cómo se mantiene un agente horas sin perder el hilo (compáralo con tus workflows de agentes).', U.harnesses);
  push('Anthropic Engineering — ensayo', 'Equipping agents for the real world with Agent Skills: por qué las skills son ficheros y no prompts (tus .claude/skills a la luz del ensayo).', U.agentSkillsEssay);
  push('Academy — ' + cur('academy-ai-capabilities').nombre, `${t(cap(3))} · ${t(cap(4))} · ${t(cap(5))} · ${t(cap(7))} · ${t(cap(9))} (con los "Try it out")`, cur('academy-ai-capabilities').url);
  push('Academy — ' + cur('academy-ai-capabilities').nombre, `${t(cap(11))} · ${t(cap(13))} · ${t(cap(14))} · ${t(cap(15))} → CERTIFICADO AI Capabilities and Limitations`, cur('academy-ai-capabilities').url);
  push('Academy — ' + cur('academy-cowork').nombre, `${t(cow(1))} · ${t(cow(4))} · ${t(cow(6))} · ${t(cow(7))} · ${t(cow(9))} · ${t(cow(11))} · ${t(cow(15))} → CERTIFICADO Introduction to Claude Cowork`, cur('academy-cowork').url);
  // sem 19 (5 · Fase C · deload · última semana con SYNAPSE) · repaso por dominio del CCA-F · simulacro · cierre
  push('Prep CCA-F · dominios 1-2 (repaso)', 'Agentic Architecture (27%) = relee "Building Effective Agents" (5 workflows, cuándo NO usar agentes) · Claude Code (20%) = relee "Best practices". 10 preguntas propias por dominio, sin apuntes.', U.ensayo);
  push('Prep CCA-F · dominios 3-4 (repaso)', 'Tool Design & MCP (18%) = quickstart MCP + tu servidor de S9 · Prompt Engineering (20%) = Prompt Engineering Interactive Tutorial (caps 1-3, repaso rápido).', U.promptTut);
  push('Prep CCA-F · dominio 5 (repaso) + Claude Code docs — ' + ccDoc(14).modulo, `Context Management (15%) = memoria (CLAUDE.md, /compact) + el ensayo de context engineering · ${ccDoc(14).modulo} + ${ccDoc(15).modulo} (páginas reales, contenido por leer).`, ccDoc(14).url);
  push('Prep CCA-F · simulacro', `Repite en modo examen (sin apuntes) el "${api(11).modulo}" de Building with the Claude API y el "${acad('academy-cc-in-action', 14).titulo}" de Claude Code in Action; anota % por dominio en el journal.`, apiU);
  push('Prep CCA-F · cierre F2', 'Página oficial de la certificación CCA-F: A VERIFICAR (12-sep-2026 no aparece enlazada en academy.claude.com ni en anthropic.skilljar.com) → buscarla en la Academy, anotar formato/precio/fecha y decidir fecha post-Step 1 (oct-2027 en v6.00; el Step 1 es el lun 27-sep-2027). CIERRE F2 (último día del motor: lun 1-mar en v6.03 · vie 26-feb en v6.02 · vie 19-feb en v6.01 · lun 15-feb en v6.00 = v5.20 · sáb 13-feb en v5.19 · v5.18: vie 12-feb): relee el journal S13-S19 y escribe 3 líneas para la fase post-ENCAPS (qué vuelve a la franja 12:30 tras el ENCAPS). Desde mañana: la franja 12:30 queda para la intensiva ENCAPS.', U.academy, { real: false });
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

// ─── Bloque PC (sábado 15:00-17:00) = SHIP del proyecto de la semana (vibecoding S1-S12) ───
// v5.7: el PC ya no es "setup / Problem Set CS50P" — es cerrar y publicar el proyecto de 04:15 de esa semana
// (commit / URL viva / test verde según su criterio de aceptación en vibecoding_proyectos.json).
// PC opcional de una semana del taper (S13-S20): 30' si es mantenimiento, 0' si es deload total. Un bloque por entrada del taper.
function bloquePCTaper(tp) {
  return {
    tag: 'PC', min: tp.tipo === 'mantenimiento' ? 30 : 0, formato: 'pc',
    material: `PC opcional · taper S${tp.s} · ${tp.nombre}`,
    leccion: `${tp.ship} Sensores: ${(tp.sensores || []).join(' · ') || 'ninguno (deload total)'}. Sin proyecto nuevo: la intensiva ENCAPS manda (v6.00).`,
    url: assertUrl(ccDoc(13).url), real: true,
  };
}
// v6.01 (10-oct-2026): un PC PROPIO por proyecto/taper y NADA se fusiona. Si dos entradas cierran la misma semana (v6.01: S15 jue 21 →
// mar 26-ene y S16 mié 27 → vie 29-ene, ambas con SHIP sáb 30-ene), el sábado de SHIP lleva el PC de la primera (vibeDe) y la segunda
// lleva el suyo el SÁBADO SIGUIENTE, en un bloque aparte (S16 → sáb 6-feb, antes del PC 0' de S17). Antes (borrador v6.01) los dos se
// fusionaban en un solo bloque el sáb 30-ene y el plan quedaba en 18 PC; v6.00 tenía 19 (avance S1 + SHIP S1-S12 + taper S13-S18) y
// v6.01 vuelve a 19 (SHIP S1-S10 + avance S11 + SHIP S11-S12 + taper S13-S18). v6.02 (17-oct): S15 jue 28-ene → mar 2-feb y S16 mié 3 → vie 5-feb
// (SHIP sáb 6-feb) → el PC de S16 va el sáb 13-feb, junto al PC 0' de S17; 19 bloques = SHIP S1-S9 + avance S10 + SHIP S10-S12 + taper S13-S18.
// v6.03 (20-oct): ningún desplazamiento dentro del plan (S15 jue 4-feb → sáb 6-feb · S16 mar 9-feb → sáb 13-feb); 19 bloques = avance S1 + SHIP S1-S12
// + taper S13-S18. S19 y S20 comparten el sáb 6-mar, que ya es posterior al FIN_PLAN (lun 1-mar): una entrada cuyo SHIP cae fuera del SYNAPSE no
// tiene PC aquí («PC = no» en el catálogo) → no hay nada que desplazar ni que perder (antes se abortaba: el sábado siguiente, 13-mar, es PROTEGIDO).
// Mapa sábado → [entradas del taper desplazadas].
const PC_DESPLAZADOS = (() => {
  const m = new Map();
  for (const x of VIBE_FECHAS) {
    const primero = vibeDe(x.ship);
    if (!primero || primero.s === x.s) continue;            // es la entrada que el sábado de SHIP ya atiende
    if (x.ship > FIN_PLAN) continue;                          // v6.03: SHIP después del SYNAPSE → sin PC aquí (S19/S20, sáb 6-mar): nada que desplazar
    const tp = TAPER.find((t) => t.s === x.s);
    if (!tp) throw new Error(`El proyecto S${x.s} comparte sábado de SHIP (${x.ship}) con S${primero.s}: resolverlo en el catálogo (solo el taper se desplaza)`);
    const d = new Date(x.ship + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 7);
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
  const leccion = `${p.ship} Criterio de aceptación: ${p.aceptacion.join(' · ')}. Entregable: ${p.entregable}`;
  return { tag: 'PC', min: 120, formato: 'pc', material, leccion, url: assertUrl(p.docs[0].url), real: true };
}
// ─── Domingo = Feynman del proyecto (10', opcional; no rompe la racha si se salta) ───
function bloqueDom(semana) {
  const tp = TAPER.find((x) => x.s === semana);
  if (tp) {
    return {
      tag: 'R', min: 5, formato: 'repaso',
      material: `Domingo libre · taper S${tp.s}`,
      leccion: `Sin Feynman de proyecto (no hay proyecto nuevo). Si quieres, 5' de retro en el journal (node DATA/_scripts/journal_hoy.js) + 20' de revisión semanal (DATA/REVISION_SEMANAL.md). Marca ✓ igual: el domingo es libre.`,
      url: assertUrl(ccDoc(13).url), real: true,
    };
  }
  const p = VIBE.find((x) => x.s === Math.min(semana, 12));
  return {
    tag: 'R', min: 10, formato: 'repaso',
    material: `Feynman · proyecto S${p.s}: ${p.nombre}`,
    leccion: `Explica en voz alta, 5', qué construiste esta semana y CÓMO funciona (sin mirar el código); 5' más: la línea "qué falta" en synapse-journal. Opcional: si descansas, márcalo ✓ igual — el domingo es libre (v5 sáb/dom libres).`,
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
const START_ISO = process.argv[2] || '2026-09-03'; if(!/^20\d\d-\d\d-\d\d$/.test(START_ISO)) throw new Error('START inválido: '+START_ISO);
const START = new Date(START_ISO + 'T12:00:00'); // START parametrizado: node <script> YYYY-MM-DD
const SDOW = START.getDay();                    // día de la semana del START (0=Dom … 6=Sáb)
const FIRST_WEEK_LEN = (7 - SDOW) % 7 + 1;      // START→dom (genérico por weekday)
// 1 si la sem 1 NO contiene ese día (START cae después de él, o en domingo): la serie de ese día corre una semana
const OFF_WD = { Lun: SDOW === 0 || SDOW > 1 ? 1 : 0, Mar: SDOW === 0 || SDOW > 2 ? 1 : 0, 'Mié': SDOW === 0 || SDOW > 3 ? 1 : 0 };

const aUnits = buildAUnits();
// v6: TOTAL = nº de días para colocar exactamente aUnits.length A-units (= días no-domingo y no-feriado); el último día cae en no-domingo.
let TOTAL = 0; { let ns = 0, dd = 0; while (ns < aUnits.length) { dd++; const dt = new Date(START.getTime() + (dd - 1) * 86400000); const f = dt.toISOString().slice(0, 10); if (dt.getDay() !== 0 && !SKIP_FIJOS.has(f)) ns++; } TOTAL = dd; }
let aIdx = 0;
let pc12Emitido = false; // evita duplicar el PC de la sem 12 cuando esa semana SÍ tiene sábado
const SEM_MAX = 19; // v5.10-b: sem 13-19 = F2 (v5.20: la última A-unit cae el lun 15-feb-2027, que sería la sem 20 y se CLAMPA a la 19 (deload; el carril del lunes repite el cap. 13 de Pro Git = MAP[19]) · v5.19: la última A-unit cae el sáb 13-feb-2027, día 131, dentro de la sem 19 = lun 8 → sáb 13-feb, sin clamp · v5.18: la última A-unit cae el vie 12-feb-2027, día 131, dentro de la sem 19 = lun 8 → vie 12-feb, sin clamp · v5.17: mar 9-feb-2027, día 132; lun 8 y mar 9-feb serían la sem 20 del calendario y el clamp de SEM_MAX los deja en la sem 19. v5.16: vie 5-feb-2027, día 131, dentro de la sem 19)
const dias = [];
for (let d = 1; d <= TOTAL; d++) {
  const date = new Date(START.getTime() + (d - 1) * 86400000);
  const fecha = date.toISOString().slice(0, 10);
  const wd = WD[date.getDay()];
  const semana = d <= FIRST_WEEK_LEN ? 1 : Math.min(2 + Math.floor((d - FIRST_WEEK_LEN - 1) / 7), SEM_MAX); // v6: sem 1 = mar→dom; sem 2+ = lun→dom. 12 miércoles → Lex caps 1-12 (sin offset)
  const faseId = semana <= 8 ? 'f0' : semana <= 12 ? 'f1' : 'f2';
  const fase = faseId === 'f0' ? 'F0 · La Escuela de Anthropic (auditar ✓)' : faseId === 'f1' ? 'F1 · Stack del vibecoding: Claude Code · Supabase · n8n' : 'F2 · Academy restante + prep CCA-F (taper por el ENCAPS)'; // v6.00: antes «(taper del Step 1)»
  const deload = semana >= 17; // v6.00: núcleo de la intensiva ENCAPS (hasta v5.20: Fases B-C del Step 1): si aprieta, solo A o solo B (PROTOCOLO_MODO_MINIMO)
  const bloques = [];
  if (SKIP_FIJOS.has(fecha)) {
    // v5.10-b: feriado libre (25-dic · 31-dic · 1-ene), como el domingo: sin A/B/C, no consume A-unit
    bloques.push({ tag: 'R', min: 0, formato: 'repaso', material: `🎄 Feriado libre · ${fecha.slice(8, 10)}-${fecha.slice(5, 7)}`, leccion: 'Sin misión. Marca ✓ para conservar la racha; el Anki sigue (due × 20 s).', real: true });
  } else if (wd === 'Dom') {
    // v5.7: domingo = Feynman del proyecto de la semana (10', opcional). Sigue siendo día libre: sin A/B/C.
    bloques.push(bloqueDom(semana));
  } else {
    const a = aUnits[aIdx++];
    bloques.push({ tag: 'A', min: 15, formato: 'pantalla', ...a });
    const b = bloqueB(wd, semana, fecha); if (b) bloques.push(b);
    const c = bloqueC(wd, semana, fecha); if (c) bloques.push(c);
    if (wd === 'Sáb') {
      for (const x of pcDesplazadosDe(fecha)) bloques.push(x); // v6.01: PC propio de una entrada del taper que cerró la semana anterior junto con otra (S16 → sáb 6-feb)
      bloques.push(bloquePC(semana, fecha)); if (semana === 12) pc12Emitido = true;
    }
    // si la sem 12 no llega a tener sábado, su Proyecto-PC (CS50P PS3) se coloca en el último día (sin duplicarlo)
    if (d === TOTAL && wd !== 'Sáb' && !pc12Emitido) { bloques.push(bloquePC(12, fecha)); pc12Emitido = true; }
  }
  dias.push({ d, fecha, wd, semana, faseId, fase, deload, bloques });
}
if (aIdx !== aUnits.length) throw new Error(`A-units sin asignar: usadas ${aIdx}/${aUnits.length}`);
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
    if (x.pcSab && x.pcSab !== sabPC) throw new Error(`PC de S${x.s}: el SYNAPSE lo pone el ${sabPC} y vibecodingPlan.ts (pcSab) dice ${x.pcSab}: regenerar gen_vibecoding_plan.js con el mismo START`);
  }
}
if (dias[TOTAL - 1].fecha !== FIN_PLAN) throw new Error(`El plan debe terminar el ${FIN_PLAN} (v6.03: lun 1-mar · v6.02: vie 26-feb · v6.01: vie 19-feb · lun 15-feb en v6.00 = v5.20; v5.19: sáb 13-feb); termina el ${dias[TOTAL - 1].fecha}: ajusta las A-units de F2`);

// ─── Emitir TypeScript ───
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const blkTs = (b) => {
  let o = `{tag:"${b.tag}",min:${b.min},formato:"${b.formato}",material:"${esc(b.material)}",leccion:"${esc(b.leccion)}"`;
  if (b.url) o += `,url:"${esc(b.url)}"`;
  if (b.dur) o += `,dur:"${esc(b.dur)}"`;
  o += `,real:${b.real !== false}`;
  if (b.audit) o += `,audit:true`;
  o += `}`;
  return o;
};
const diaTs = (x) => `{d:${x.d},fecha:"${x.fecha}",wd:"${x.wd}",semana:${x.semana},faseId:"${x.faseId}",fase:"${esc(x.fase)}",${x.deload ? 'deload:true,' : ''}bloques:[${x.bloques.map(blkTs).join(',')}]}`;

const nF2 = dias.filter((x) => x.faseId === 'f2').length;
const ts = `/**
 * synapseDailyPlan.ts — Motor día-a-día SYNAPSE (${SEM_MAX} semanas · ${TOTAL} días · ${dias[0].fecha} → ${dias[TOTAL - 1].fecha}).
 * Arranque ${dias[0].wd} ${dias[0].fecha} (START parametrizado) · sem 1 = ${dias[0].wd}→dom · domingos = Feynman del proyecto (10', opcional; día libre) ·
 * sáb = A/B/C + PC (bloque personal, sí va en finde) · feriados 25-dic/31-dic/1-ene = libres (bloque R).
 * v5.10-b (12-sep-2026): + F2 · sem 13-19 (${nF2} días, ${dias.find(x => x.semana === 13).wd.toLowerCase()} ${dias.find(x => x.semana === 13).fecha} → ${FIN_PLAN}) = Anthropic Academy restante + prep CCA-F
 * (v6.00: taper por el ENCAPS —hasta v5.20, taper del Step 1—; sem 17-19 con deload:true). Los días 1-81 son idénticos a v5.10.
 * GENERADO por DATA/_scripts/gen_synapse_plan.js desde DATA/SYNAPSE/curricula/_extracted.json
 * (temarios REALES extraídos con WebFetch/oEmbed + verificación adversarial, 10-jun-2026).
 * NO editar a mano — regenerar: node DATA/_scripts/gen_synapse_plan.js YYYY-MM-DD
 *
 * Estructura del día (30 min en espacios muertos, instrucción verbatim de Joseph):
 *  A (15', pantalla)  lección EXACTA de la fase actual con link directo
 *  B (10', audio)     rotación: No Priors → Dwarkesh → Lex #452 (outline real) → The Batch (jue) → canal Anthropic (vie)
 *  C (5', lectura)    píldora móvil: Pro Git / Willison / Python Tutorial / Automate / research de Anthropic
 *  PC (sáb 15:00-17:00) = SHIP del proyecto de la semana del VIBECODING 04:15 (src/lib/vibecodingPlan.ts)
 *  Dom = Feynman del proyecto (10', opcional; el domingo sigue libre). Progreso REAL manual (PlanKey 'synapse', empieza 0%).
 * real:true = lección/temario verificado; real:false = "siguiente episodio/tramo" (honesto, sin inventar).
 * audit:true = A-unit de F0 ya cursada en jun-ago (progreso solo en localStorage): "auditar con Joseph: ✓ si ya hecho".
 * Cobertura v5.7: F0 (sem 1-8, auditar) + F1 = STACK DEL VIBECODING (sem 9-12: Claude Code docs · Academy
 * skills/subagentes/MCP/Claude Code in Action · Supabase RLS/select/triggers/webhooks/Edge Functions · n8n)
 * + F2 (sem 13-19): Building with the Claude API · MCP restante + MCP Advanced Topics · agent skills/subagentes ·
 * Claude Code in Action restante · AI Capabilities and Limitations · Claude Cowork · 3 ensayos de context engineering ·
 * repaso por los 5 dominios del CCA-F · simulacro · cierre (curricula/_extracted.json, extraído 5-sep y 12-sep-2026).
 * Después del ${FIN_PLAN} (v6.03: lun 1-mar-2027 · v6.02: vie 26-feb · v6.01: vie 19-feb · v6.00 = v5.20: lun 15-feb; v5.19: sáb 13-feb · v5.18: vie 12-feb · v5.17: mar 9-feb) no hay SYNAPSE. v6.00 (6-oct-2026): sigue la intensiva
 * ENCAPS (examen dom 14-mar-2027 PROVISIONAL) y el Step 1 vuelve el mar 16-mar (tramo 2; examen objetivo lun 27-sep-2027).
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
  audit?: boolean; // F0: "auditar con Joseph: ✓ si ya hecho"
}
export interface DiaSynapse {
  d: number; fecha: string; wd: string; semana: number;
  faseId: 'f0' | 'f1' | 'f2'; fase: string;
  deload?: boolean; // sem 17-19 (v6.00: núcleo de la intensiva ENCAPS): si aprieta, solo A o solo B (PROTOCOLO_MODO_MINIMO)
  bloques: SynBloque[];
}

export const SYN_PLAN_META = {
  inicio: '${dias[0].fecha}', fin: '${dias[TOTAL - 1].fecha}', totalDias: ${TOTAL}, semanas: ${SEM_MAX},
  bloque: "A 15' pantalla · B 10' audio · C 5' lectura · sáb PC 2h = SHIP del proyecto (S13-S16: PC opcional 30') · dom Feynman 10' opcional",
  fases: { f0: 'F0 · La Escuela de Anthropic (sem 1-8, auditar ✓ si ya hecho)', f1: 'F1 · Stack del vibecoding: Claude Code · Supabase · n8n (sem 9-12)', f2: 'F2 · Academy restante + prep CCA-F (sem 13-19, taper por el ENCAPS; 17-19 deload)' },
  deloadDesde: 17,
} as const;

export const SYN_DIAS: DiaSynapse[] = [
${dias.map(diaTs).join(',\n')}
];

export function synDiaDe(fechaISO: string): DiaSynapse | undefined { return SYN_DIAS.find(x => x.fecha === fechaISO); }
export function syn7d(fromD: number): DiaSynapse[] { return SYN_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }

export const SYN_FORMATO_ICON: Record<SynFormato, string> = {
  pantalla: '📱', audio: '🎧', lectura: '📖', pc: '⌨️', repaso: '🌿',
};
export const SYN_TAG_LABEL: Record<SynBloque['tag'], string> = {
  A: "A · 15' lección", B: "B · 10' audio", C: "C · 5' lectura", PC: "PC · sáb 2h · SHIP", R: "Feynman · 10' (opcional)",
};
`;

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
