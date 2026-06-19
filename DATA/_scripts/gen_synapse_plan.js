// gen_synapse_plan.js — GENERA src/lib/synapseDailyPlan.ts (motor día-a-día SYNAPSE)
// y DATA/SYNAPSE/curricula/<id>.md (temarios reales extraídos).
//
// Fuente: DATA/SYNAPSE/curricula/_extracted.json — temarios REALES extraídos y
// verificados adversarialmente (workflow 30 agentes, 10-jun-2026, WebFetch/oEmbed).
// Regla: CERO URLs inventadas — toda URL emitida debe estar en _extracted.json o en
// la allowlist EXTRA_VERIFIED (URLs ya verificadas en src/lib/synapseData.ts el 10-jun).
//
// Regenerar/extender: node DATA/_scripts/gen_synapse_plan.js
// (al avanzar de fase: añadir A-units de la fase siguiente en buildAUnits y re-ejecutar).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const EX = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/SYNAPSE/curricula/_extracted.json'), 'utf8'));
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
// URLs verificadas FUERA de _extracted.json (vienen de synapseData.ts, 10-jun-2026)
const EXTRA_VERIFIED = [
  U.academy, U.dwDario, U.dwDemis, U.dwSholto, U.latent, U.noPriors, U.theBatch,
  U.antYt, U.willison, U.trifecta, U.manyShot, U.constClass, U.rsp, U.promptTut,
];

// allowlist total: target urls + urlFinal + urls por lección del JSON + extra
const ALLOWED = new Set(EXTRA_VERIFIED);
for (const t of EX) {
  if (t.url) ALLOWED.add(t.url);
  if (t.urlFinal) ALLOWED.add(t.urlFinal);
  for (const l of t.lecciones || []) if (l.url) ALLOWED.add(l.url);
}
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

// ─── Bloque A (15', pantalla): 46 unidades F0 + 24 unidades F1 (secuencial) ───
function buildAUnits() {
  const A = [];
  const push = (material, leccion, url, opts = {}) => A.push({ material, leccion, url: url ? assertUrl(url) : undefined, dur: opts.dur, real: opts.real !== false });

  // F0 · La Escuela de Anthropic (semanas 1-8 · 46 días Lun-Sáb)
  push('Anthropic Academy', 'Crea tu cuenta en la Academy y regístrate en "AI Fluency: Framework & Foundations" (Register · FREE). Hoy solo eso: deja la cuenta lista.', U.academy);
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

  // F1 · arranque (semanas 9-12 · 24 días Lun-Sáb): CS50P Weeks 0-3
  for (let w = 0; w <= 3; w++) {
    const week = cs50w(w);
    const name = `CS50P — Week ${w}: ${week.titulo}`;
    for (let t = 1; t <= 5; t++) {
      push(name, t === 1
        ? `Lecture — tramo 1/5 (15'): empieza desde el minuto 0`
        : `Lecture — tramo ${t}/5 (15'): retoma EXACTAMENTE donde quedaste`, week.url);
    }
    push(name, `Shorts de la Week ${w} + cierra apuntes. El Problem Set va al bloque PC del sábado.`, week.url);
  }
  if (A.length !== 70) throw new Error('Total A-units debe ser 70, hay ' + A.length);
  return A;
}

// ─── Bloque B (10', audio) por día de semana ───
function bloqueB(wd, semana) {
  const B = (material, leccion, url, opts = {}) => ({ tag: 'B', min: 10, formato: 'audio', material, leccion, url: url ? assertUrl(url) : undefined, dur: opts.dur, real: opts.real !== false });
  if (wd === 'Lun') return B('No Priors (Sarah Guo + Elad Gil)', 'Episodio de esta semana — el más reciente o el siguiente de tu cola (22-56 min: te da para 2-3 huecos)', U.noPriors, { real: false });
  if (wd === 'Mar') {
    if (semana <= 3) return B('Dwarkesh — Dario Amodei', `Tramo ${semana}/3 (10'): continúa donde quedaste del episodio (1h58)`, U.dwDario, { real: false });
    if (semana === 4) return B('Dwarkesh — Demis Hassabis', 'Episodio de 1h (Nobel 2024 por AlphaFold): IA × ciencia — directo a tu perfil médico', U.dwDemis, { real: false });
    if (semana <= 8) return B('Dwarkesh — Sholto & Trenton: How LLMs actually think', `Tramo ${semana - 4}/4 (10'): denso — interpretabilidad desde dentro de los labs`, U.dwSholto, { real: false });
    return B('Latent Space — The AI Engineer Podcast', 'Episodio reciente a elección (el podcast del rol al que apuntas)', U.latent, { real: false });
  }
  if (wd === 'Mié') {
    // v2 (arranque jueves): la semana 1 no tiene miércoles → los caps se corren una
    // semana (sem 2..12 = caps 1..11); el cap 12 se recupera en el último día del plan.
    const n = semana - 1;
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
  if (wd === 'Sáb') return B('Comodín de audio', 'Retoma el audio que quedó a medias esta semana (Lex, Dwarkesh o No Priors). Nada nuevo.', undefined, { real: false });
  return null; // Dom: repaso
}

// ─── Bloque C (5', lectura móvil) por día de semana ───
function bloqueC(wd, semana) {
  const C = (material, leccion, url, opts = {}) => ({ tag: 'C', min: 5, formato: 'lectura', material, leccion, url: url ? assertUrl(url) : undefined, real: opts.real !== false });
  if (wd === 'Lun') {
    const MAP = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 6, 8: 6, 9: 7, 10: 7, 11: 5, 12: 5 };
    const cap = progitCap(MAP[semana]);
    return C('Pro Git (Scott Chacon)', `5' del cap. ${MAP[semana]}: "${cap.titulo}" — sigue donde quedaste`, cap.url);
  }
  if (wd === 'Mar') return C('Simon Willison — serie Prompt injection', 'El siguiente artículo de la serie que no hayas leído (10-20 min: empiézalo, termínalo en otro hueco)', U.willison, { real: false });
  if (wd === 'Mié') {
    // v2: igual que el Lex — secciones corridas una semana (sem 2..12 = §1..11; §12 va al último día)
    const n = semana - 1;
    const s = pyTutSec(n);
    return C('The Python Tutorial (docs oficiales)', `Sección ${n}: "${s.titulo}" — prepara el terreno para CS50P`, s.url);
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
  if (wd === 'Sáb') return C('Comodín de lectura', 'Termina la lectura que quedó a medias esta semana. Nada nuevo.', undefined, { real: false });
  return null;
}

// ─── Bloque PC (sábado, 60-90', OPCIONAL) ───
function bloquePC(semana) {
  const v9 = yt3b1b(9);
  const MAP = {
    1: ['Setup del entorno', 'Instala Python 3 + VS Code + Git. Deja la máquina lista para F1 — hoy solo instalar y verificar que corre.', U.pyTutorial],
    2: ['AI Fluency', 'Ponte al día con las lecciones pendientes y deja el certificado descargado.', U.aif],
    3: ['Claude Code en vivo', 'Instala Claude Code y lanza tu primer prompt en una carpeta real (lo de Code 101, practicado).', U.cc101],
    4: ['Proyecto público #1', 'Crea tu repo público "synapse-journal" en GitHub y sube tus notas Feynman de F0 (Pro Git cap. 6 te guía). El auditor fue claro: los proyectos públicos consiguen la entrevista.', progitCap(6).url],
    5: ['Karpathy — Deep Dive', 'Sesión larga: adelanta 2-3 tramos del Deep Dive con notas en el repo.', U.kDeep],
    6: ['Git real', 'Pasa tus notas de 3B1B al repo synapse-journal: add → commit → push de verdad (Pro Git cap. 2).', progitCap(2).url],
    7: ['Prompt Engineering Interactive Tutorial', 'Lee los caps. 1-3 del tutorial oficial en GitHub (36k★). Solo lectura: ejecutar notebooks vendrá en F4.', U.promptTut],
    8: ['CIERRE F0', `Certificados al repo + README "los 5 patrones de agentes en mis palabras". Bonus: "${v9.titulo}" (${v9.dur}).`, v9.url],
    9: ['CS50P — Problem Set 0', 'Resuelve el Problem Set de la Week 0 en el editor web de CS50.', cs50w(0).url],
    10: ['CS50P — Problem Set 1', 'Problem Set de la Week 1 (Conditionals) completo.', cs50w(1).url],
    11: ['CS50P — Problem Set 2', 'Problem Set de la Week 2 (Loops) completo.', cs50w(2).url],
    12: ['CS50P — Problem Set 3', 'Problem Set de la Week 3 (Exceptions) completo.', cs50w(3).url],
  };
  const [material, leccion, url] = MAP[semana];
  return { tag: 'PC', min: 75, formato: 'pc', material, leccion, url: url ? assertUrl(url) : undefined, real: true };
}

// ─── Calendario v4 (18-jun): d1 = vie 19-jun-2026 (todo el sistema arranca 19-jun) ·
// semana 1 corta (vie→dom = 3 días) · semanas 2-12 alineadas Lun-Dom · 70 A-units intactas.
// La 1ª semana ya NO tiene jueves → la 1ª lección de Automate (cap 0 "Introduction") se
// recupera en el último día (igual que Lex cap 12 y PyTut §12). 12 sem · 82 días · 12 domingos.
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const START = new Date('2026-06-20T12:00:00'); // v5: arranque sáb 20-jun (problema el 19; todo corre +1)
const TOTAL = 82; // sem 1 corta (sáb→dom = 2 días) + 11*7 + 3 → d82 recoge la 70ª A-unit + Lex cap 12 + PyTut §12 + Automate cap 0

const aUnits = buildAUnits();
let aIdx = 0;
const dias = [];
for (let d = 1; d <= TOTAL; d++) {
  const date = new Date(START.getTime() + (d - 1) * 86400000);
  const fecha = date.toISOString().slice(0, 10);
  const wd = WD[date.getDay()];
  const semana = d <= 2 ? 1 : Math.min(2 + Math.floor((d - 3) / 7), 12); // v5: sem 1 = sáb→dom (2 días); sem 2+ = lun→dom. 11 miércoles regulares → Lex caps 1-11; cap 12 al último día
  const faseId = semana <= 8 ? 'f0' : 'f1';
  const fase = faseId === 'f0' ? 'F0 · La Escuela de Anthropic' : 'F1 · Código: Python + terminal + Git';
  const bloques = [];
  if (wd === 'Dom') {
    // v3 (13-jun): TODOS los domingos LIBRES (pedido por Joseph) — sin misión, sin repaso.
    bloques.push({
      tag: 'R', min: 0, formato: 'repaso', material: 'Domingo LIBRE',
      leccion: 'Domingo LIBRE (v3: todos los domingos sin actividad). Sin misión SYNAPSE hoy; si quieres conservar la racha, márcalo ✓ y listo.',
      real: true,
    });
  } else if (d === TOTAL) {
    // v4: último día: 70ª A-unit + lo que el calendario corrido dejó sin colocar.
    // Con arranque viernes la sem 1 no tiene jueves → recuperamos también Automate cap 0.
    const a = aUnits[aIdx++];
    bloques.push({ tag: 'A', min: 15, formato: 'pantalla', ...a });
    const c12 = lexCap(12);
    bloques.push({ tag: 'B', min: 10, formato: 'audio', material: 'Lex #452 — Dario Amodei (CEO Anthropic)', leccion: `Outline cap. 12: "${c12.titulo}" (desde ${c12.dur}) — cierre del episodio`, url: assertUrl(U.lex452), dur: 'desde ' + c12.dur, real: true });
    const s12 = pyTutSec(12);
    bloques.push({ tag: 'C', min: 5, formato: 'lectura', material: 'The Python Tutorial (docs oficiales)', leccion: `Sección 12: "${s12.titulo}" — prepara el terreno para CS50P`, url: assertUrl(s12.url), real: true });
    const a0 = autoCap(0);
    bloques.push({ tag: 'C', min: 5, formato: 'lectura', material: 'Automate the Boring Stuff (3ª ed.)', leccion: `5' del cap. 0: "${a0.titulo}" — la introducción del libro (recuperada: la sem 1 viernes→dom no tuvo jueves)`, url: assertUrl(a0.url), real: true });
  } else {
    const a = aUnits[aIdx++];
    bloques.push({ tag: 'A', min: 15, formato: 'pantalla', ...a });
    const b = bloqueB(wd, semana); if (b) bloques.push(b);
    const c = bloqueC(wd, semana); if (c) bloques.push(c);
    if (wd === 'Sáb') bloques.push(bloquePC(semana));
  }
  dias.push({ d, fecha, wd, semana, faseId, fase, bloques });
}
if (aIdx !== aUnits.length) throw new Error(`A-units sin asignar: usadas ${aIdx}/${aUnits.length}`);

// ─── Emitir TypeScript ───
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const blkTs = (b) => {
  let o = `{tag:"${b.tag}",min:${b.min},formato:"${b.formato}",material:"${esc(b.material)}",leccion:"${esc(b.leccion)}"`;
  if (b.url) o += `,url:"${esc(b.url)}"`;
  if (b.dur) o += `,dur:"${esc(b.dur)}"`;
  o += `,real:${b.real !== false}}`;
  return o;
};
const diaTs = (x) => `{d:${x.d},fecha:"${x.fecha}",wd:"${x.wd}",semana:${x.semana},faseId:"${x.faseId}",fase:"${esc(x.fase)}",bloques:[${x.bloques.map(blkTs).join(',')}]}`;

const ts = `/**
 * synapseDailyPlan.ts — Motor día-a-día SYNAPSE (12 semanas · ${TOTAL} días · ${dias[0].fecha} → ${dias[TOTAL - 1].fecha}).
 * v4 (18-jun): arranque vie 19-jun-2026 (todo el sistema inicia 19-jun) · sem 1 corta vie→dom · TODOS los domingos LIBRES (sin misión).
 * GENERADO por DATA/_scripts/gen_synapse_plan.js desde DATA/SYNAPSE/curricula/_extracted.json
 * (temarios REALES extraídos con WebFetch/oEmbed + verificación adversarial, 10-jun-2026).
 * NO editar a mano — regenerar: node DATA/_scripts/gen_synapse_plan.js
 *
 * Estructura del día (30 min en espacios muertos, instrucción verbatim de Joseph):
 *  A (15', pantalla)  lección EXACTA de la fase actual con link directo
 *  B (10', audio)     rotación: No Priors → Dwarkesh → Lex #452 (outline real) → The Batch (jue) → canal Anthropic (vie)
 *  C (5', lectura)    píldora móvil: Pro Git / Willison / Python Tutorial / Automate / research de Anthropic
 *  PC (sáb, 60-90', OPCIONAL) teclado: setup, repo público, problem sets CS50P
 *  Dom = repaso (nada nuevo). Progreso REAL manual (PlanKey 'synapse', empieza 0%).
 * real:true = lección/temario verificado; real:false = "siguiente episodio/tramo" (honesto, sin inventar).
 * Cobertura: F0 completa (sem 1-8) + arranque F1 (sem 9-12, CS50P Weeks 0-3). Las semanas 13+
 * se generan al avanzar de fase añadiendo A-units en el script y re-ejecutándolo.
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
}
export interface DiaSynapse {
  d: number; fecha: string; wd: string; semana: number;
  faseId: 'f0' | 'f1'; fase: string; bloques: SynBloque[];
}

export const SYN_PLAN_META = {
  inicio: '${dias[0].fecha}', fin: '${dias[TOTAL - 1].fecha}', totalDias: ${TOTAL}, semanas: 12,
  bloque: "A 15' pantalla · B 10' audio · C 5' lectura · sáb PC 60-90' opcional · dom repaso",
  fases: { f0: 'F0 · La Escuela de Anthropic (sem 1-8)', f1: 'F1 · Código: Python (arranque, sem 9-12)' },
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
  A: "A · 15' lección", B: "B · 10' audio", C: "C · 5' lectura", PC: "PC · 60-90' (opcional)", R: "Repaso · 30'",
};
`;

fs.writeFileSync(path.join(ROOT, 'src/lib/synapseDailyPlan.ts'), ts, 'utf8');
console.log('OK src/lib/synapseDailyPlan.ts ·', TOTAL, 'días ·', aUnits.length, 'A-units · F0 sem 1-8 · F1 sem 9-12');

// ─── Emitir curricula/<id>.md (temarios reales para futuras vueltas) ───
const curDir = path.join(ROOT, 'DATA/SYNAPSE/curricula');
for (const t of EX) {
  if (!t.accesible || !(t.lecciones || []).length) continue;
  const md = [
    `# ${t.nombre}`,
    '',
    `> URL: ${t.urlFinal || t.url}`,
    `> Extraído y verificado adversarialmente el 10-jun-2026 (WebFetch/oEmbed, workflow 30 agentes).`,
    t.verificado ? `> Verificación: CONFIRMADA.` : `> Verificación: con observaciones (ver _extracted.json · problemas).`,
    '',
    ...t.lecciones.map((l, i) => `${i + 1}. ${l.modulo ? `**[${l.modulo}]** ` : ''}${l.titulo}${l.dur ? ` _(${l.dur})_` : ''}${l.url ? ` — ${l.url}` : ''}`),
    '',
    t.notas ? `**Notas de extracción:** ${t.notas}` : '',
  ].join('\n');
  fs.writeFileSync(path.join(curDir, t.id + '.md'), md, 'utf8');
}
console.log('OK curricula/*.md emitidos');
