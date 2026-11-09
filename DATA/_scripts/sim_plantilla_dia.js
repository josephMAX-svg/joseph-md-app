// sim_plantilla_dia.js — v6.07 (dom 8-nov-2026): SIMULA el Home de uno o varios días: plantillasV6.plantillaDelDia + las guías «qué · cuánto ·
// cómo» que TodayMission.contenidoBloque pinta debajo de cada bloque (réplica de sus consultas, sin React) y comprueba que cada guía cae dentro de
// su bloque (los bloques FLEXIBLES sin hora fija no se comprueban: su franja es solo un ejemplo). Patrón: DATA/_v600/cal/cal_bk/v606e/cal_v606e_blocks.js.
//   node DATA/_scripts/sim_plantilla_dia.js 2026-11-09 2026-11-10 2026-11-11            # días sueltos
//   node DATA/_scripts/sim_plantilla_dia.js --rango 2026-11-09 2026-12-30                 # todos los días del rango (resumen + errores)
//   node DATA/_scripts/sim_plantilla_dia.js --compacto 2026-11-09 2026-11-14               # una línea por bloque
// Solo lectura: no escribe nada. Sale con código 1 si alguna guía cae fuera de su bloque o un bloque de plan queda sin contenido.
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
    case 'synapse': { const g = RT.guiaSynapseDe(iso); return g ? [g] : null; }
    case 'business': { const g = RT.guiaBusinessDe(iso); return g ? [g] : null; }
    case 'aurum': { const g = AU.aurumDiaDe(iso) ? RT.guiaAurumDe(iso, F6.faseV6(iso) === 'F4' ? b.ini : undefined) : null; return g ? [g] : null; }
    case 'liviano': { const g = LV.livDiaDe(iso) ? RT.guiaLivianoDe(iso) : null; return g ? [g] : null; }
    case 'revision': { const g = RT.guiaRevisionDe(iso); return g ? [g] : null; }
    case 'mir': { if (!MD.mirSesionDe(iso)) return null; const g = MG.mirGuiaDe(iso, b.ini); return g ? [g] : []; }
    case 'encaps': {
      if (b.id === 'encaps-am') { const gs = EM.guiaEncapsMananaDe(iso); return gs.length ? gs : null; }
      if (b.id === 'encaps-pm') { const g = EM.guiaEncapsTardeDe(iso); return g ? [g] : null; }
      if (b.id === 'theomed-prep') { const g = EM.guiaTheomedPrepDe(iso); return g ? [g] : null; }
      if (b.id === 'theomed-vivo') { const g = EM.guiaTheomedVivoDe(iso); return g ? [g] : null; }
      if (b.id === 'encaps-dom') { const g = EM.guiaEncapsDomingoDe(iso); return g ? [g] : null; }
      if (b.id === 'encaps-sab') { const g = EG.guiaEncapsSabadoDe(iso), sab = EG.encapsSabadoDe(iso); return g && sab ? [G.moverGuia(g, b.ini ? hm(b.ini) - hm(sab.ini) : 0)] : null; } // como TodayMission (desplazada si Business la empuja)
      if (b.ini === '16:15' && F6.faseV6(iso) === 'F1') { const g = EG.sesionEncapsDe(iso) ? EG.guiaEncapsDe(iso) : null; return g ? [g] : null; }
      return []; // F2: loop / carril B / eval → su contenido está en ENCAPS → Plan (Supabase)
    }
    case 'usmle': {
      if (b.frente === 'usmle-anki') {
        const gs = U.guiaUsmleEnRango(iso, b.ini || '05:00', b.fin || '05:45');
        // v6.07: los 15′ de repasos ENCAPS (05:30-05:45) van en el bloque Anki si la guía USMLE no ocupa ya esa franja
        const gA = EM.guiaEncapsAnkiDe(iso);
        const ocupa = gs.some((g) => { const q = G.partesFranja(g.franja); return q && hm(q.fin) > hm('05:30'); });
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
let errores = 0;
const resumen = [];
for (const iso of dias) {
  const p = P.plantillaDelDia(iso);
  if (!rango) console.log(`\n══ ${WD[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${iso} · ${p.plantilla} · ${p.titulo}${p.usmle ? ` · Step D${p.usmle.d}` : ''}`);
  if (!rango) for (const n of p.notas) console.log(`   • ${n}`);
  for (const b of p.bloques) {
    let gs; try { gs = guiasDe(b, p, iso); } catch (e) { gs = null; console.log(`   ✗ ${b.id}: ${e.message}`); }
    const flexible = !b.ini;
    const fuera = (gs || []).filter((g) => { const q = G.partesFranja(g.franja); return !flexible && (!q || hm(q.ini) < hm(b.ini) || hm(q.fin) > hm(b.fin) + (b.frente === 'usmle-principal' ? 60 : 0)); });
    const sinContenido = gs === null;
    if (fuera.length || sinContenido) { errores++; resumen.push(`${iso} ${b.hora} ${b.id}: ${sinContenido ? 'SIN contenido' : 'guía fuera del bloque ' + fuera.map((g) => g.franja).join(',')}`); }
    if (rango) continue;
    if (compacto) { console.log(`   ${b.hora.padEnd(15)} ${b.id.padEnd(12)} ${b.nombre.slice(0, 70)}${(gs || []).length ? ` → guía ${(gs || []).length > 2 ? `${gs.length} franjas ${G.partesFranja(gs[0].franja)?.ini}…${G.partesFranja(gs[gs.length - 1].franja)?.fin}` : gs.map((g) => (flexible ? `ej. ${g.franja}` : g.franja)).join(' + ')}` : ''}${fuera.length ? ' ⚠ FUERA' : ''}`); continue; }
    console.log(`   ${b.hora.padEnd(16)} ${b.id.padEnd(13)} ${b.nombre.slice(0, 92)}`);
    for (const g of gs || []) console.log(`   ${''.padEnd(16)} ${''.padEnd(13)}   ↳ ${flexible ? `(ejemplo ${g.franja})` : g.franja} ${g.titulo.slice(0, 96)}${fuera.includes(g) ? '  ⚠ FUERA DEL BLOQUE' : ''}`);
  }
}
if (resumen.length) console.log(`\n✗ ${errores} problema(s):\n  ` + resumen.join('\n  '));
console.log(`\n${errores ? '✗' : '✓'} ${dias.length} día(s) simulados · guías fuera de su bloque o bloques sin contenido: ${errores}`);
process.exit(errores ? 1 : 0);
