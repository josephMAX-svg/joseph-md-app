// sim_plantilla_dia.js — v6.07 (dom 8-nov-2026): SIMULA el Home de uno o varios días: plantillasV6.plantillaDelDia + las guías «qué · cuánto ·
// cómo» que TodayMission.contenidoBloque pinta debajo de cada bloque (réplica de sus consultas, sin React) y comprueba que cada guía cae dentro de
// su bloque (los bloques FLEXIBLES sin hora fija no se comprueban: su franja es solo un ejemplo). Patrón: DATA/_v600/cal/cal_bk/v606e/cal_v606e_blocks.js.
//   node DATA/_scripts/sim_plantilla_dia.js 2026-11-09 2026-11-10 2026-11-11            # días sueltos
//   node DATA/_scripts/sim_plantilla_dia.js --rango 2026-11-09 2026-12-30                 # todos los días del rango (resumen + errores)
//   node DATA/_scripts/sim_plantilla_dia.js --compacto 2026-11-09 2026-11-14               # una línea por bloque
// Solo lectura: no escribe nada. Sale con código 1 si alguna guía cae fuera de su bloque o un bloque de plan queda sin contenido.
// v6.09 (fix revisión 16-nov): + bloque encaps-rec (recuperación FIJA del domingo: encapsManana.guiaEncapsRecuperaDe) y dos aserciones nuevas:
//   (a) joseph 4 · todo «PPT … el dom X» (o «el domingo X») de las notas y guías de los días simulados tiene, en la guía de ESE domingo, un paso con el PPT
//       de cada clase citada en la frase (y, si la frase dice «a las HH:MM», esa guía empieza a esa hora);
//   (b) joseph 7 · la nota de un día SKIP dice que el 31-dic «es / fue día de plan» solo si ese 31-dic lo es de verdad (plantilla con mañana ENCAPS):
//       25-dic-2026 «sí es día de plan» · 1-ene-2027 «fue día de plan» · Jueves y Viernes Santo de 2027, el texto de la v6.08 (sin la frase).
// v6.09 (fix 2, 16-nov noche): + bloque encaps-am2 (2.º tramo de un domingo de plan en tramos; dom 27-dic) y las franjas de la mañana ENCAPS por bloque
//   (encapsManana.guiaEncapsMananaEnRango) · (c) RUTINA DE LA MAÑANA: ningún bloque con hora pisa 05:45-07:15 (caminata, ducha y desayuno; todos los días).
// v6.09 (mar 17-nov): (d) DOMINGO DE LLEGADA (encapsManana.encapsRecuperaDe(iso).llegada; dom 22-nov, sigue sin sesión en corrida_s1): solo la recuperación
//   fija (encaps-rec) y el Anki opcional (anki-dom), con hora, entre la llegada y las 17:00 (ningún plan secundario ese día; nada desde las 17:00).
// v6.09b (mar 17-nov · auditoría tiempo ↔ material): (d) el domingo de llegada lleva revisión semanal (la del sábado de la víspera) + encaps-rec + SYNAPSE de
//   recuperación, sin solaparse y sin Anki · (e) los repasos ENCAPS del Anki 05:00 van 05:20-05:45 (lun · mié · vie y jue 31-dic) o 05:30-05:45 (mar · jue).
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const ts = require(path.join(ROOT, 'node_modules', 'typescript'));
const stub = () => new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'then' ? undefined : k === '__esModule' ? true : stub()), apply: () => stub(), construct: () => stub() });
const mem = new Map(); global.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) }; global.window = { localStorage: global.localStorage };
const cache = new Map();
function cargar(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const m = { exports: {} }; cache.set(file, m);
  const req = (spec) => { if (!spec.startsWith('.')) return stub(); let d = path.resolve(path.dirname(file), spec); for (const e of ['', '.ts', '.tsx']) if (fs.existsSync(d + e) && fs.statSync(d + e).isFile()) { d += e; break; } return d.endsWith('.json') ? JSON.parse(fs.readFileSync(d, 'utf8')) : cargar(d); };
  new Function('exports', 'module', 'require', ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText)(m.exports, m, req);
  return m.exports;
}
const L = (n) => cargar(path.join(ROOT, 'src', 'lib', n + '.ts'));
const P = L('plantillasV6'), G = L('guia'), U = L('usmleGuia'), MG = L('mirGuia'), MD = L('mirDailyPlan'), EG = L('encapsGuia'), EM = L('encapsManana'),
  RD = L('researchDailyPlan'), RD2 = L('researchDailyPlan2027'), RG = L('researchGuia'), DC = L('dermaCiclo2'), DG = L('dermaGuia'), AU = L('aurumDailyPlan'), LV = L('livianoStudyPlan'),
  SY = L('synapseDailyPlan'), RT = L('rutinaGuia'), VB = L('vibecodingPlan'), F6 = L('fechasV6');
const hm = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
const addDias = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const argv = process.argv.slice(2);
let dias = argv.filter((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
const rango = argv.includes('--rango');
const compacto = argv.includes('--compacto'); // una línea por bloque (guías resumidas)
if (rango) { const [a, b] = dias; dias = []; for (let d = a; d <= b; d = addDias(d, 1)) dias.push(d); }
if (!dias.length) { console.error('uso: node DATA/_scripts/sim_plantilla_dia.js AAAA-MM-DD [...] | --rango AAAA-MM-DD AAAA-MM-DD'); process.exit(2); }

/** Guías del bloque (réplica de TodayMission.contenidoBloquePlan para las consultas) · null = SIN contenido. */
function guiasDe(b, p, iso) {
  switch (b.plan) {
    case 'vibecoding': { const g = b.id === 'pc' ? RT.guiaShipDe(iso) : b.id === 'feynman' ? RT.guiaFeynmanDe(iso) : VB.vibeDiaDe(iso) ? RT.guiaVibeDe(iso) : null; return g ? [g] : null; }
    case 'synapse': { const g = b.id === 'syn-cola' ? RT.guiaSynapseColaDe(iso) /* v6.09b lote 1-ter: cola del SYNAPSE de F1 con franja real */ : RT.guiaSynapseDe(iso); return g ? [g] : null; }
    case 'business': { const g = RT.guiaBusinessDe(iso); return g ? [g] : null; }
    case 'aurum': { const g = b.id === 'aurum-l' ? RT.guiaAurumSabadoDe(iso) /* v6.09b lote 1-bis S2: sábado 04:15 de F1 */ : AU.aurumDiaDe(iso) ? RT.guiaAurumDe(iso, F6.faseV6(iso) === 'F4' ? b.ini : undefined) : null; return g ? [g] : null; }
    case 'liviano': { const g = LV.livDiaDe(iso) ? RT.guiaLivianoDe(iso) : null; return g ? [g] : null; }
    case 'revision': { const g = RT.guiaRevisionDe(iso); return g ? [g] : null; }
    case 'mir': { if (!MD.mirSesionDe(iso)) return null; const g = MG.mirGuiaDe(iso, b.ini); return g ? [g] : []; }
    case 'encaps': {
      if (b.id === 'encaps-am' || b.id === 'encaps-am2') { const gs = EM.guiaEncapsMananaEnRango(iso, b.ini, b.fin); return gs.length ? gs : null; } // v6.09 (fix 2): domingo de plan en tramos = un bloque por tramo (como TodayMission)
      if (b.id === 'encaps-pm') { const g = EM.guiaEncapsTardeDe(iso); return g ? [g] : null; }
      if (b.id === 'theomed-prep') { const g = EM.guiaTheomedPrepDe(iso); return g ? [g] : null; }
      if (b.id === 'theomed-vivo') { const g = EM.guiaTheomedVivoDe(iso); return g ? [g] : null; }
      if (b.id === 'encaps-dom') { const g = EM.guiaEncapsDomingoDe(iso); return g ? [g] : null; }
      if (b.id === 'encaps-rec') { const g = EM.guiaEncapsRecuperaDe(iso); return g ? [g] : null; } // v6.09 (fix): recuperación fija del domingo
      if (b.id === 'encaps-sab') { const g = EG.guiaEncapsSabadoDe(iso), sab = EG.encapsSabadoDe(iso); return g && sab ? [G.moverGuia(g, b.ini ? hm(b.ini) - hm(sab.ini) : 0)] : null; } // como TodayMission (desplazada si Business la empuja)
      // v6.09: + el día de plan de la transición (jue 31-dic, dia 32 del mantenimiento): su 16:15 es una sesión de encapsGuia, como en F1
      if (b.ini === '16:15' && (F6.faseV6(iso) === 'F1' || (F6.faseV6(iso) === 'TRANSICION' && b.id === 'encaps'))) { const g = EG.sesionEncapsDe(iso) ? EG.guiaEncapsDe(iso) : null; return g ? [g] : null; }
      return []; // F2: loop / carril B / eval → su contenido está en ENCAPS → Plan (Supabase)
    }
    case 'usmle': {
      if (b.frente === 'usmle-anki') {
        const gs = U.guiaUsmleEnRango(iso, b.ini || '05:00', b.fin || '05:45');
        // v6.07: los 15′ de repasos ENCAPS (05:30-05:45) van en el bloque Anki si la guía USMLE no ocupa ya esa franja
        // v6.09b (a1-11): su franja depende del día (05:20 lun · mié · vie y jue 31-dic · 05:30 mar · jue) → se compara con su inicio (como TodayMission)
        const gA = EM.guiaEncapsAnkiDe(iso);
        const iniA = gA ? (G.partesFranja(gA.franja) || {}).ini || '05:30' : '05:30';
        const ocupa = gs.some((g) => { const q = G.partesFranja(g.franja); return q && hm(q.fin) > hm(iniA); });
        return gA && !ocupa ? [...gs, gA] : gs;
      }
      if (b.id === 'reentrada') return U.guiaUsmleEnRango(iso, b.ini || '16:15', b.fin || '17:15'); // F3 · 16:15 (como TodayMission)
      if (b.frente === 'usmle-principal') return U.guiaUsmleEnRango(iso, '07:00', b.fin || '12:00');
      return U.guiaUsmleEnRango(iso, b.ini || '18:00', b.fin || '18:45');
    }
    case 'research-derma': {
      // réplica de TodayMission (v6.07 fix, 8-nov): 1) bloque con `detalle` (pausa de átomos) → solo la guía «RESEARCH · mínimo» si cuadra;
      // 2) átomo de Research de los DOS ciclos (antes solo el ciclo 1 → 67 falsos «SIN contenido» abr-dic 2027); en F4 la guía se mueve al
      // inicio del bloque del turno (moverGuia), como TodayMission; 3) Derma con 30′ en F4 y 45′ en el resto.
      if (b.detalle) return /RESEARCH · mínimo/.test(b.nombre) && b.ini && b.fin && hm(b.fin) - hm(b.ini) === RG.GUIA_RESEARCH_MINIMO.totalMin ? [{ ...RG.GUIA_RESEARCH_MINIMO, franja: `${b.ini}–${b.fin}` }] : [];
      const r = [...RD.DIAS, ...RD2.DIAS_2027].find((x) => x.fecha === iso);
      if (r) {
        const g0 = RG.guiaResearchDe(r), pR = G.partesFranja(g0.franja);
        return [F6.faseV6(iso) === 'F4' && b.ini && b.fin && pR && pR.ini !== b.ini ? G.moverGuia(g0, hm(b.ini) - hm(pR.ini)) : g0];
      }
      const dd = DC.dermaDiaDeConCiclo2(iso);
      return dd ? [DG.dermaGuiaPar(dd, { ini: b.ini || '13:30', minutos: F6.faseV6(iso) === 'F4' ? 30 : 45 }).planB] : null;
    }
    default: return [];
  }
}
/** Guías de un bloque del día a la hora REAL (semana corrida: fecha y hora de plan → moverGuia), como TodayMission.contenidoBloque. */
function guiasReales(b, p, iso) {
  // v6.07a (lun 9-nov): semana corrida → como TodayMission.contenidoBloque: el contenido se consulta con la FECHA DE PLAN del bloque
  // (b.fechaPlan) y a la HORA DE PLAN (hora real − b.desfaseMin); después las guías se mueven a la hora real (moverGuia)
  const fP = b.fechaPlan || iso, dP = b.desfaseMin || 0;
  const aHM = (h) => (h && dP ? `${String(Math.floor((hm(h) - dP) / 60)).padStart(2, '0')}:${String((hm(h) - dP) % 60).padStart(2, '0')}` : h);
  const bPlan = dP ? { ...b, ini: aHM(b.ini), fin: aHM(b.fin) } : b;
  let gs = guiasDe(bPlan, p, fP); if (gs && dP) gs = gs.map((g) => G.moverGuia(g, dP));
  return gs;
}
// v6.09 (fix revisión 16-nov, joseph 4): «PPT … el dom X» → paso con el PPT de cada clase citada en la guía de ese domingo
const AREA_COD = { 'Salud Pública': 'SP', 'Cuidado Integral': 'CI', 'Gestión': 'GES', 'Investigación': 'INV', 'Ética e Interculturalidad': 'ET' };
const normClase = (t) => Object.entries(AREA_COD).reduce((a, [n, c]) => a.split(`${n} `).join(`${c} `), t);
const cacheDom = new Map();
function pasosDelDia(iso) {
  if (cacheDom.has(iso)) return cacheDom.get(iso);
  const p = P.plantillaDelDia(iso); const out = [];
  for (const b of p.bloques) { let gs = null; try { gs = guiasReales(b, p, iso); } catch (e) { gs = null; } for (const g of gs || []) out.push(g); }
  cacheDom.set(iso, out); return out;
}
const textosDe = (p, gsDia) => [...p.notas, ...p.bloques.flatMap((b) => [b.nombre, b.detalle || '']), ...gsDia.flatMap((g) => [g.titulo, g.aviso || '', g.planB || '', ...g.pasos.flatMap((x) => [x.que, x.como])])];
function controlPPT(iso, textos) {
  const errs = [];
  for (const t of textos) for (const seg of String(t).split(/(?<=\.)\s+|\s+·\s+/)) {
    const m = /\bPPT\b.*?\bel dom(?:ingo)? (\d{1,2})\b/.exec(seg);
    if (!m) continue;
    const clases = [...new Set((normClase(seg).match(/\b(?:SP|CI|GES|INV|ET) \d+\/\d+/g) || []))];
    const hora = (/\bel dom(?:ingo)? \d{1,2}(?:-[a-z]+)? a las (\d\d:\d\d)/.exec(seg) || [])[1] || null;
    let dom = null; for (let k = 0; k <= 60 && !dom; k++) { const d = addDias(iso, k); if (new Date(d + 'T12:00:00Z').getUTCDay() === 0 && Number(d.slice(8)) === Number(m[1])) dom = d; }
    if (!dom) { errs.push(`«${seg.slice(0, 90)}»: no hay un domingo ${m[1]} en los 60 días siguientes`); continue; }
    if (!clases.length) { errs.push(`«${seg.slice(0, 90)}»: remite un PPT al ${dom} sin nombrar la clase`); continue; }
    const gsDom = pasosDelDia(dom);
    for (const c of clases) {
      const g = gsDom.find((x) => x.pasos.some((y) => /\bPPT\b/.test(y.que) && normClase(y.que).includes(c)));
      if (!g) errs.push(`«${seg.slice(0, 90)}»: el ${dom} no tiene ningún paso con el PPT de ${c}`);
      else if (hora && (G.partesFranja(g.franja) || {}).ini !== hora) errs.push(`«${seg.slice(0, 90)}»: dice «a las ${hora}» y el PPT de ${c} del ${dom} va en ${g.franja}`);
    }
  }
  return errs;
}
// v6.09 (fix 2, 16-nov noche): RUTINA DE LA MAÑANA 05:45-07:15 (caminata, ducha y desayuno; todos los días hasta el SERUMS: F1 · transición · F2 · F3) →
//   ningún bloque con hora la pisa. Excepción conocida y anterior (solape informativo, lo decide Joseph): los HITOS USMLE de las 07:00 (NBME 25-28, «sustituye
//   al bloque de la mañana») pisan 07:00-07:15 del desayuno. En F4 (SERUMS) manda el turno (bloque A 04:05-05:55): no se comprueba.
const RUTINA_AM = ['05:45', '07:15'];
function controlRutina(iso, p) {
  if (!['F1', 'TRANSICION', 'F2', 'LIBRE_POST_ENCAPS', 'F3'].includes(F6.faseV6(iso))) return [];
  return p.bloques.filter((b) => b.ini && b.fin && b.ini !== b.fin && hm(b.ini) < hm(RUTINA_AM[1]) && hm(RUTINA_AM[0]) < hm(b.fin) && !(b.plan === 'usmle' && /HITO/.test(b.nombre) && b.ini === '07:00'))
    .map((b) => `${b.hora} ${b.id} pisa la rutina de la mañana (${RUTINA_AM.join('-')}: caminata, ducha y desayuno; no se toca)`);
}
// v6.09 (17-nov): DOMINGO DE LLEGADA → solo encaps-rec + anki-dom, con hora, entre la llegada y las 17:00
// v6.09b (17-nov · auditoría a2-12/a2-14): revisión semanal (la del sábado sin sesión de la víspera) + encaps-rec + SYNAPSE de recuperación, con hora, entre la
//   llegada y las 17:00, sin solaparse; sin Anki (anki-dom ya no cabe). La revisión es la S del sábado de la víspera y el SYNAPSE trae el A/B/C del día.
function controlLlegada(iso, p) {
  const rec = EM.encapsRecuperaDe(iso);
  if (!rec || !rec.llegada) return [];
  const e = [];
  if (!p.bloques.some((b) => b.id === 'encaps-rec')) e.push(`domingo de llegada sin la recuperación fija (encaps-rec ${rec.ini}-${rec.fin})`);
  const sab = RT.revisionSabadoDe(iso);
  if (sab === iso || !p.bloques.some((b) => b.id === 'revision')) e.push('domingo de llegada sin la revisión semanal del sábado sin sesión de la víspera');
  const syn = SY.synDiaDe(iso);
  if (syn && syn.bloques.some((b) => /^[ABC]$/.test(b.tag)) && !p.bloques.some((b) => b.id === 'syn')) e.push('domingo de llegada con A/B/C del SYNAPSE y sin su bloque');
  const conHora = p.bloques.filter((b) => b.ini && b.fin);
  for (const b of p.bloques) {
    if (!['revision', 'encaps-rec', 'syn'].includes(b.id)) e.push(`domingo de llegada con el bloque ${b.id} (${b.hora}): solo la revisión, la recuperación fija y el SYNAPSE de recuperación`);
    else if (!b.ini || !b.fin || hm(b.ini) < hm(rec.llegada) || hm(b.fin) > hm('17:00')) e.push(`domingo de llegada: ${b.id} ${b.hora} fuera de ${rec.llegada}-17:00`);
  }
  for (let i = 0; i < conHora.length; i++) for (let j = i + 1; j < conHora.length; j++) { const a = conHora[i], b = conHora[j]; if (hm(a.ini) < hm(b.fin) && hm(b.ini) < hm(a.fin)) e.push(`domingo de llegada: ${a.id} ${a.hora} ⟂ ${b.id} ${b.hora}`); }
  return e;
}
// v6.09b (a1-11): el Anki 05:00 de F1 reparte por tamaño de mazo → los repasos ENCAPS (encapsManana.guiaEncapsAnkiDe) empiezan a las 05:20 los lun · mié · vie
//   (y los L-V hábiles de la transición: jue 31-dic) y a las 05:30 los mar · jue (días de Step), y terminan a las 05:45
function controlAnkiEncaps(iso, p) {
  const g = EM.guiaEncapsAnkiDe(iso);
  if (!g) return [];
  const q = G.partesFranja(g.franja) || {};
  const step = F6.faseV6(iso) === 'F1' && F6.esDiaStepF1(iso);
  const ini = step ? '05:30' : '05:20';
  return q.ini === ini && q.fin === '05:45' ? [] : [`Anki 05:00: los repasos ENCAPS van ${g.franja} y tocan ${ini}–05:45 (${step ? 'mar · jue, día de Step' : 'lun · mié · vie o día de plan de la transición'})`];
}
// v6.09 (fix revisión 16-nov, joseph 7): la nota de un día SKIP solo dice que el 31-dic «es / fue día de plan» si lo es de verdad
function controlSkip31(iso, p) {
  if (p.plantilla !== 'SKIP') return [];
  const d31 = iso.slice(5, 7) === '01' ? `${Number(iso.slice(0, 4)) - 1}-12-31` : `${iso.slice(0, 4)}-12-31`;
  const plan31 = P.plantillaDelDia(d31).bloques.some((b) => b.id === 'encaps-am');
  const dice = p.notas.some((n) => /31-dic[^.]*d[ií]a de plan/.test(n));
  if (dice !== plan31) return [`nota SKIP: ${dice ? 'dice' : 'no dice'} que el 31-dic (${d31}) es día de plan y ${plan31 ? 'sí' : 'no'} lo es`];
  if (plan31 && !p.notas.some((n) => (iso < d31 ? /sí es día de plan/ : /fue día de plan/).test(n))) return [`nota SKIP: el 31-dic (${d31}) ${iso < d31 ? 'debe decir «sí es día de plan»' : 'debe decir «fue día de plan»'}`];
  return [];
}
let errores = 0;
const resumen = [];
for (const iso of dias) {
  const p = P.plantillaDelDia(iso);
  if (!rango) console.log(`\n══ ${WD[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${iso} · ${p.plantilla} · ${p.titulo}${p.usmle ? ` · Step D${p.usmle.d}` : ''}`);
  if (!rango) for (const n of p.notas) console.log(`   • ${n}`);
  const gsDia = [];
  for (const b of p.bloques) {
    let gs; try { gs = guiasReales(b, p, iso); } catch (e) { gs = null; console.log(`   ✗ ${b.id}: ${e.message}`); }
    for (const g of gs || []) gsDia.push(g);
    const flexible = !b.ini;
    const fuera = (gs || []).filter((g) => { const q = G.partesFranja(g.franja); return !flexible && (!q || hm(q.ini) < hm(b.ini) || hm(q.fin) > hm(b.fin) + (b.frente === 'usmle-principal' ? 60 : 0)); });
    const sinContenido = gs === null;
    if (fuera.length || sinContenido) { errores++; resumen.push(`${iso} ${b.hora} ${b.id}: ${sinContenido ? 'SIN contenido' : 'guía fuera del bloque ' + fuera.map((g) => g.franja).join(',')}`); }
    if (rango) continue;
    if (compacto) { console.log(`   ${b.hora.padEnd(15)} ${b.id.padEnd(12)} ${b.nombre.slice(0, 70)}${(gs || []).length ? ` → guía ${(gs || []).length > 2 ? `${gs.length} franjas ${G.partesFranja(gs[0].franja)?.ini}…${G.partesFranja(gs[gs.length - 1].franja)?.fin}` : gs.map((g) => (flexible ? `ej. ${g.franja}` : g.franja)).join(' + ')}` : ''}${fuera.length ? ' ⚠ FUERA' : ''}`); continue; }
    console.log(`   ${b.hora.padEnd(16)} ${b.id.padEnd(13)} ${b.nombre.slice(0, 92)}`);
    for (const g of gs || []) console.log(`   ${''.padEnd(16)} ${''.padEnd(13)}   ↳ ${flexible ? `(ejemplo ${g.franja})` : g.franja} ${g.titulo.slice(0, 96)}${fuera.includes(g) ? '  ⚠ FUERA DEL BLOQUE' : ''}`);
  }
  // v6.09 (fix revisión 16-nov): aserciones del día (PPT remitidos a un domingo · nota SKIP del 31-dic), tras recorrer sus bloques
  for (const e of [...controlPPT(iso, textosDe(p, gsDia)), ...controlSkip31(iso, p), ...controlRutina(iso, p), ...controlLlegada(iso, p), ...controlAnkiEncaps(iso, p)]) { errores++; resumen.push(`${iso} ${e}`); }
}
if (resumen.length) console.log(`\n✗ ${errores} problema(s):\n  ` + resumen.join('\n  '));
console.log(`\n${errores ? '✗' : '✓'} ${dias.length} día(s) simulados · guías fuera de su bloque o bloques sin contenido: ${errores}`);
process.exit(errores ? 1 : 0);
