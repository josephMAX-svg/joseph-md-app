// synapse_f1_tramos.js — v6.09b · S1 (mar 17-nov-2026, auditoría tiempo ↔ material, hallazgos a2-4 / a2-5 / a2-6).
// Lo usa gen_synapse_plan.js: trocea por FECHA el SYNAPSE de F1 (mié 18-nov-2026 → dom 3-ene-2027; el mar 17 está en curso y no se toca) con el
// material MEDIDO de DATA/SYNAPSE/medidas_f1.json (medir_synapse_f1.js). Para cada bloque A/B/C de F1 escribe `leccion` (rótulo que dice la verdad) y
// `guia` {que, como, url, t} (el paso de la guía, que rutinaGuia.pasoSyn usa antes que la curaduría) + `med` (minutos que pide el material).
// REGLAS (las de la auditoría): lectura en inglés 100 palabras/min · audio/vídeo = duración ÷ velocidad (×1,2 si el paso pide pausas) · paso OK si
// necesario/asignado ∈ [0,85; 1,15].
//  · A (pantalla 15′): el vídeo medido (Karpathy, 3Blue1Brown) se ve ENTERO a la velocidad que lo deja en 15′ ± 15 % (1,0× · 1,25× · 1,5×; uno corto, con
//    pausas para anotar). Las lecciones de la Academy no publican duración: siguen como caja de 15′ (la plataforma guarda el progreso).
//  · B (audio 10′): Dwarkesh y canal Anthropic a 1,5× (10′ = 15 min de audio); el deep dive del canal a 1,0× (curaduría del lote 1: tramos de 10′).
//    Rótulo = «tramo k/N del plan · min a-b de <duración>». Lex #452 = su capítulo exacto; si dura < 8,5′, el resto de los 10′ sigue la COLA de audio.
//    No Priors (sin episodio fijo) y The Batch: se ACOTAN a los 10′.
//  · C (lectura 5′): ventanas de ≈500 palabras (425-575) cortadas en el final de una sección o de un párrafo (localizador = sección + n.º de párrafo).
//  · Lo que no cabe en su sesión NO se quita: entra en la COLA (audio · artículos · capítulos) y la consumen, por este orden, los comodines del sábado de
//    F1, el hueco de Lex, las sesiones de 2027 que ya lo prevén (lun 4-ene Pro Git «sigue donde quedaste», mar 5-ene Sholto tramo 4/4, vie 8-ene «termina
//    los tramos pendientes») y, el resto, la COLA POST-STEP 1: 30′/día L-V desde el lun 13-dic-2027 (tras el examen del lun 6-dic). Cada sesión dice adónde
//    va su resto, con fecha.
'use strict';
const fs = require('fs');
const path = require('path');

const DESDE = '2026-11-18', HASTA = '2027-01-03', COLA_DESDE = '2027-12-13', COLA_MIN = 30;
const VEL = 1.5, PPM = 100, OBJ = 500, MIN_W = 425, MAX_W = 575;
// curaduría del lote 1 que sigue mandando (rutinaGuia SYN_SERIES): el episodio de Greg Brockman (No Priors) del dom 22 al lun 30-nov
const RESERVADO_B = new Set(['2026-11-22', '2026-11-23', '2026-11-28', '2026-11-30']);
// ya hecho el mar 17-nov (en curso): Dwarkesh × Dario 0:00-10:00 a 1,0× · «Prompt injection attacks against GPT-3» las primeras ≈500
const HECHO_17 = { dario: 600, pi1: 500 };

const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const dowOf = (f) => new Date(f + 'T12:00:00Z').getUTCDay();
const fC = (f) => `${WD[dowOf(f)]} ${Number(f.slice(8, 10))}-${MES[Number(f.slice(5, 7)) - 1]}${f > '2027-06-30' ? '-' + f.slice(0, 4) : ''}`;
const addD = (f, n) => { const d = new Date(f + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const ts = (s) => { s = Math.round(s); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return h ? `${h}:${String(m).padStart(2, '0')}:${String(x).padStart(2, '0')}` : `${m}:${String(x).padStart(2, '0')}`; };
const r10 = (n) => Math.round(n / 10) * 10;
const fmt1 = (n) => (Math.round(n * 10) / 10).toFixed(1).replace('.', ',');
const velTxt = (v) => (v === 1 ? '1,0' : String(v).replace('.', ','));

function crear(MED, ctx) {
  // ── lecturas aplanadas a párrafos ──
  const LEC = {};
  for (const [id, L] of Object.entries(MED.lectura)) {
    const flat = [];
    L.secciones.forEach((s, si) => s.p.forEach((w, pi) => flat.push({ si, pi, w })));
    LEC[id] = { ...L, id, flat };
  }
  const tSec = (L, si) => L.secciones[si].t;
  const urlSec = (L, si) => L.secciones[si].url || L.url;
  const sumW = (L, a, b) => { let w = 0; for (let i = a; i < b; i++) w += L.flat[i].w; return w; };
  /** ventana de lectura desde el párrafo `a` (≤ `lim`): ≈obj palabras, corte preferente al final de una sección */
  function ventana(L, a, obj = OBJ, lim = L.flat.length) {
    const lo = Math.round(obj * MIN_W / OBJ), hi = Math.round(obj * MAX_W / OBJ);
    let w = 0, best = null, bestSec = null;
    for (let i = a; i < lim; i++) {
      w += L.flat[i].w;
      const fin = i + 1, finSec = fin === L.flat.length || L.flat[fin].pi === 0;
      const d = Math.abs(w - obj);
      if (w >= lo && w <= hi) { if (!best || d < best.d) best = { b: fin, w, d }; if (finSec && (!bestSec || d < bestSec.d)) bestSec = { b: fin, w, d }; }
      if (w > hi) { if (!best) { const wPrev = w - L.flat[i].w; best = i > a && Math.abs(wPrev - obj) < d ? { b: i, w: wPrev } : { b: fin, w }; } break; }
      if (fin === lim && !best) best = { b: fin, w };
    }
    const r = bestSec || best;
    return r ? { a, b: r.b, w: r.w } : { a, b: a, w: 0 };
  }
  /** localizador «desde … hasta …» de los párrafos [a, b) */
  function loc(L, a, b) {
    const ini = L.flat[a];
    const d = ini.pi === 0 ? `desde «${tSec(L, ini.si)}»` : `desde «${tSec(L, ini.si)}», párrafo ${ini.pi + 1}`;
    if (b >= L.flat.length) return `${d} hasta el final`;
    const fin = L.flat[b];
    if (fin.pi === 0) return fin.si - 1 === ini.si && ini.pi === 0 ? `«${tSec(L, ini.si)}» entera` : `${d} hasta el final de «${tSec(L, fin.si - 1)}»`;
    return `${d} hasta el párrafo ${fin.pi} de «${tSec(L, fin.si)}» (incluido)`;
  }

  // ── colas: audio (B) y lectura (C: artículos primero, después capítulos), por fecha de origen ──
  const colaB = [], colaC = [];
  const destinos = new Map(); // clave del resto → [{fecha, txt}]
  const addDest = (k, fecha, txt) => { if (!destinos.has(k)) destinos.set(k, []); destinos.get(k).push({ fecha, txt }); };
  const AUD = MED.audio;
  /** consume `seg` segundos de audio (de reloj, a la velocidad de cada pieza) de la cola B; minutos de audio ENTEROS */
  function tomarB(segReloj, fecha, filtro = () => true) {
    const piezas = [];
    let resto = segReloj;
    while (resto > 30) {
      const it = colaB.find(filtro);
      if (!it) break;
      const cabe = Math.floor((resto * it.vel) / 60) * 60;
      if (cabe <= 0) break;
      const fin = Math.min(it.b, it.a + cabe);
      piezas.push({ it, a: it.a, b: fin });
      addDest(it.k, fecha, `${fC(fecha)} (min ${ts(it.a)}-${ts(fin)})`);
      resto -= (fin - it.a) / it.vel;
      it.a = fin;
      if (it.a >= it.b - 1) colaB.splice(colaB.indexOf(it), 1);
    }
    return { piezas, seg: segReloj - resto };
  }
  function tomarC(obj, fecha) {
    const piezas = [];
    let falta = obj;
    while (falta > 60 && colaC.length) {
      colaC.sort((x, y) => (x.articulo === y.articulo ? (x.origen < y.origen ? -1 : x.origen > y.origen ? 1 : 0) : x.articulo ? -1 : 1));
      const it = colaC[0];
      const quedan = sumW(it.L, it.a, it.b);
      const v = quedan <= falta * 1.15 ? { a: it.a, b: it.b, w: quedan } : ventana(it.L, it.a, falta, it.b);
      if (v.b <= v.a) break;
      piezas.push({ it, a: v.a, b: v.b, w: v.w });
      addDest(it.k, fecha, `${fC(fecha)} (≈${r10(v.w)} palabras)`);
      falta -= v.w;
      it.a = v.b;
      if (it.a >= it.b) colaC.shift();
    }
    return { piezas, w: obj - falta };
  }

  // ── estado de las series ──
  const posA = {}, posL = {};
  const keyRes = (id) => `${id}#resto`;
  const res = { sesiones: new Map() }; // fecha|tag → {leccion, guia, med}
  const out = (fecha, tag, o) => res.sesiones.set(`${fecha}|${tag}`, o);
  const audioIdDeCanal = (lec) => /AI prompt engineering: A deep dive/.test(lec) ? 'deepDivePE' : /Tips for building AI agents/.test(lec) ? 'tips' : /Building Anthropic/.test(lec) ? 'building' : /How difficult is AI alignment/.test(lec) ? 'alignment' : /Interpretability/.test(lec) ? 'interp' : null;
  const prevSes = {}; // id → fecha de la última sesión (para «retoma donde paraste el …»)
  const retoma = (id, defecto) => (prevSes[id] ? `Retoma donde paraste el ${fC(prevSes[id])}.` : defecto || '');

  // pendientes que crean las sesiones de F1 y que solo se resuelven al final (texto con fechas)
  const pendTxt = []; // {fecha, tag, build: () => {leccion, guia}}

  const enF1 = (f) => f >= DESDE && f <= HASTA;
  const dias = ctx.dias;
  const siguienteMismo = (desdeIdx, tag, re) => { for (let i = desdeIdx + 1; i < dias.length; i++) { const b = dias[i].bloques.find((x) => x.tag === tag && re.test(x.material)); if (b) return { dia: dias[i], b }; } return null; };

  // ── A · vídeos medidos ──
  const DD = AUD.kDeep, KI = AUD.kIntro;
  const ddCortes = [0, 867, 1869, 2572, 3563, 4832, 6106, 7493, 8867, 10106, 11379, DD.seg]; // = los 11 tramos de buildAUnits (capítulos reales)
  const kiCortes = [0, 1543, 2743, KI.seg];
  function velDe(seg) {
    const d = seg / 60;
    if (d < 13.5) return { v: 1, pausa: true, min: (d * 1.2) }; // < 0,9 de la franja a 1,0× → con pausas para anotar (×1,2)
    const c = [1, 1.25, 1.5].map((v) => ({ v, r: d / v / 15 })).filter((x) => x.r <= 1.15);
    if (!c.length) return { v: 1.5, pausa: false, min: d / 1.5 };
    let pick = c[0];
    for (const x of c.slice(1)) if (Math.abs(x.r - 1) + 0.05 < Math.abs(pick.r - 1)) pick = x;
    return { v: pick.v, pausa: false, min: d / pick.v };
  }
  function bloqueA(dia, b) {
    let seg = null, a = 0, url = b.url, rango = '';
    if (/^Karpathy — \[1hr Talk\]/.test(b.material)) { const k = Number((/Part (\d)/.exec(b.leccion) || [])[1]); a = kiCortes[k - 1]; seg = kiCortes[k] - a; rango = `${ts(a)} → ${ts(kiCortes[k])}`; }
    else if (/^Karpathy — Deep Dive/.test(b.material)) { const k = Number((/Tramo (\d+)\/11/.exec(b.leccion) || [])[1]); a = ddCortes[k - 1]; seg = ddCortes[k] - a; rango = `${ts(a)} → ${ts(ddCortes[k])}`; }
    else if (/^3Blue1Brown/.test(b.material) && b.dur && !/mitad/.test(b.leccion)) { const m = /^(\d+):(\d+)/.exec(b.dur); if (m) { seg = Number(m[1]) * 60 + Number(m[2]); rango = `0:00 → ${m[1]}:${m[2]}`; } }
    if (seg == null) return;
    const v = velDe(seg);
    const minTxt = Math.round(v.min);
    const auditTxt = b.audit ? ' F0 = auditoría: si ya lo viste, márcalo ✓ y adelanta la siguiente pendiente.' : '';
    const como = v.pausa
      ? `En el PC, 1,0× con subtítulos en inglés y PAUSA para anotar cada idea (×1,2): ${ts(seg)} de vídeo ≈ ${fmt1(v.min)}′, cabe entero en los 15′.${auditTxt}`
      : `En el PC, ${velTxt(v.v)}× con subtítulos en inglés: el tramo entero son ${fmt1(v.min)}′ de reloj (${ts(seg)} ÷ ${velTxt(v.v)})${v.min > 15.5 ? `, ${fmt1(v.min - 15)}′ más que la franja: dentro del margen del plan (±15 %), termínalo` : ', caben en los 15′'}. Anota 1 idea en el journal.${auditTxt}`;
    const que = `${b.material} › ${b.leccion} → ${rango} (${ts(seg)} de vídeo) a ${velTxt(v.v)}×${v.pausa ? ' con pausas' : ''} = ${minTxt}′`;
    out(dia.fecha, 'A', { leccion: `${b.leccion} → ${ts(seg)} de vídeo a ${velTxt(v.v)}×${v.pausa ? ' con pausas' : ''} = ${minTxt}′ (medido el 17-nov)`, dur: `${ts(seg)} (a ${velTxt(v.v)}× = ${minTxt}′)`, guia: { que, como, url: b.url, t: 'A ↗' }, med: v.min });
  }

  // ── B ──
  const audioSesion = (id, vel, segReloj) => { const A = AUD[id]; const a = posA[id] ?? 0; const fin = Math.min(A.seg, a + Math.round(segReloj * vel)); posA[id] = fin; return { a, b: fin }; };
  const capsTxt = (id, a, b) => AUD[id].caps.filter((c, i, arr) => c[0] < b && (arr[i + 1] ? arr[i + 1][0] : AUD[id].seg) > a).map((c) => c[1]).join(' · ');
  function restoAudio(id, fecha, vel, carril) {
    const A = AUD[id], a = posA[id] ?? 0;
    if (a >= A.seg - 1) return null;
    const it = { k: keyRes(id), id, titulo: A.titulo, url: A.url, a, b: A.seg, vel, origen: fecha, carril };
    colaB.push(it);
    return it;
  }
  const lexCaps = ctx.lexCaps; // [{n, titulo, ini}] (seg)
  function bloqueB(idx, dia, b) {
    const f = dia.fecha, m = b.material;
    if (RESERVADO_B.has(f)) return;
    if (/^No Priors/.test(m)) {
      const que = 'No Priors (Sarah Guo + Elad Gil) · el episodio más reciente → min 0:00-15:00 a 1,5× (10′)';
      out(f, 'B', { leccion: 'Episodio más reciente → min 0:00-15:00 a 1,5× (10′). Sin episodio fijo: se acota a los 10′; el resto del episodio no es tarea (cada lunes, el último que haya salido)', guia: { que, como: 'Auriculares, 1,5×. Para a los 15:00 del episodio (10′ de reloj). No Priors es actualidad y no tiene episodio fijo en el plan: lo que quede del episodio NO es tarea (el lunes que viene, el más reciente).', url: b.url, t: 'B ↗' }, med: 10 });
      return;
    }
    if (/^The Batch/.test(m)) {
      if (!prevSes.batch) { prevSes.batch = f; return; } // la 1.ª aparición conserva la curaduría (carta de Ng + 2 noticias)
      out(f, 'B', { leccion: 'El número de esta semana: la carta de Ng y, si sobra, las 2 primeras noticias — se acota a 10′', guia: { que: 'The Batch (Andrew Ng) · el número de esta semana (si aún no salió hoy, el más reciente): la carta de Ng + 2 noticias', como: 'Lectura, 10′ y fuera: la carta entera y, con lo que quede, las 2 primeras noticias; no abras enlaces internos. Lo que no leas no es tarea (sale otro número el jueves).', url: b.url, t: 'B ↗' }, med: 10 });
      return;
    }
    if (/^Lex #452/.test(m)) {
      const n = Number((/cap\. (\d+)/.exec(b.leccion) || [])[1]);
      const c = lexCaps[n - 1], sig = lexCaps[n];
      const segCap = sig.ini - c.ini, minCap = segCap / 60;
      let extra = { piezas: [], seg: 0 };
      if (minCap < 8.5) extra = tomarB((10 - minCap) * 60, f, (it) => it.vel !== 1); // el deep dive (1,0×) sigue en los comodines del sábado
      const partes = [`Lex #452 · cap. ${n} «${c.titulo}» desde ${ts(c.ini)} hasta ${ts(sig.ini)} (${ts(segCap)} a 1,0×)`];
      const comoP = [`Auriculares. Lex a 1,0×: escucha SOLO el cap. ${n} (para a las ${ts(sig.ini)}: el cap. ${n + 1} es la sesión del ${n + 1 <= 7 ? 'miércoles que viene' : 'próximo miércoles'}).`];
      for (const p of extra.piezas) {
        partes.push(`${p.it.id === 'deepDivePE' ? 'minutos' : 'min'} ${ts(p.a)}-${ts(p.b)} de ${p.it.titulo.replace(/^.*· /, '')} (cola de audio, ${velTxt(p.it.vel)}×)`);
        comoP.push(`Con los ${fmt1((10 - minCap))}′ que deja el capítulo, sigue la cola de audio: ${p.it.titulo} a ${velTxt(p.it.vel)}× (${ts(p.b - p.a)} de audio = ${fmt1((p.b - p.a) / p.it.vel / 60)}′); la dejaste el ${fC(prevSes[p.it.id] || p.it.origen)}.`);
        prevSes[p.it.id] = f;
      }
      const med = minCap + extra.seg / 60;
      out(f, 'B', { leccion: `Cap. ${n}: "${c.titulo}" (desde ${ts(c.ini)} hasta ${ts(sig.ini)} = ${ts(segCap)})${extra.piezas.length ? ' + cola de audio' : ''}`, guia: { que: partes.join(' + '), como: comoP.join(' '), url: b.url, t: 'B ↗' }, med });
      return;
    }
    if (/^Comodín de audio/.test(m)) {
      const t = tomarB(600, f);
      if (!t.piezas.length) return;
      const que = 'Comodín de audio · ' + t.piezas.map((p) => `${p.it.titulo} → ${p.it.id === 'deepDivePE' ? 'minutos' : 'min'} ${ts(p.a)}-${ts(p.b)}${p.b >= AUD[p.it.id].seg - 1 ? ' (final)' : ''}`).join(' + ');
      const como = t.piezas.map((p) => { const pv = fC(prevSes[p.it.id] || p.it.origen); const r = `${t.piezas.length > 1 ? `${p.it.titulo.replace(/^.*· /, '')}: ` : 'Auriculares, '}${velTxt(p.it.vel)}×${p.it.vel === 1 ? ' con subtítulos en inglés' : ''}, ${ts(p.b - p.a)} de audio = ${fmt1((p.b - p.a) / p.it.vel / 60)}′${t.piezas.length > 1 ? ` (la dejaste el ${pv}).` : `. Retoma donde paraste el ${pv}.`}`; prevSes[p.it.id] = f; return r; }).join(' ') + ' Nada nuevo: la cola de audio de F1 (lo que no cupo en su día).';
      pendTxt.push({ fecha: f, tag: 'B', piezas: t.piezas.map((p) => ({ k: p.it.k, fin: p.b })), base: { leccion: 'Cola de audio: ' + t.piezas.map((p) => `${p.it.titulo.replace(/^.*· /, '')} min ${ts(p.a)}-${ts(p.b)}`).join(' + '), guia: { que, como, url: t.piezas[0].it.url + (/youtube/.test(t.piezas[0].it.url) ? `&t=${t.piezas[0].a}s` : ''), t: 'B ↗' }, med: t.seg / 60 } });
      return;
    }
    let id = null, vel = VEL, plan = null, carril = 'vie';
    if (/^Dwarkesh — Dario/.test(m)) { id = 'dario'; carril = 'mar'; const k = (/Tramo (\d)\/(\d)/.exec(b.leccion) || []); plan = { k: +k[1], N: +k[2] }; }
    else if (/^Dwarkesh — Demis/.test(m)) { id = 'demis'; carril = 'mar'; plan = { k: 1, N: 1 }; }
    else if (/^Dwarkesh — Sholto/.test(m)) { id = 'sholto'; carril = 'mar'; const k = (/Tramo (\d)\/(\d)/.exec(b.leccion) || []); plan = { k: +k[1], N: +k[2] }; }
    else if (/^Canal Anthropic/.test(m)) { id = audioIdDeCanal(b.leccion); if (id === 'deepDivePE') vel = 1; }
    if (!id) return;
    if (id === 'dario' && posA.dario == null) posA.dario = HECHO_17.dario, prevSes.dario = '2026-11-17';
    const A = AUD[id];
    const { a, b: fin } = audioSesion(id, vel, 600);
    const prev = prevSes[id];
    prevSes[id] = f;
    // ¿sigue la serie en su carril? (siguiente aparición del mismo recurso en F1 o en 2027)
    const sig = siguienteMismo(idx, 'B', new RegExp('^' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    const sigMismo = sig && (id !== 'deepDivePE' ? (audioIdDeCanal(sig.b.leccion) === id || /^Dwarkesh/.test(m)) : audioIdDeCanal(sig.b.leccion) === id);
    let it = null, extra2027 = '';
    const ultimaF1 = !(sigMismo && enF1(sig.dia.fecha));
    if (ultimaF1) {
      if (id === 'sholto' && sig && sig.dia.fecha <= '2027-01-31') {
        // mar 5-ene: «Tramo 4/4 (10')… Exactamente 10′ desde donde quedaste» a 1,0× → 10 min de audio
        const a5 = posA.sholto, b5 = Math.min(A.seg, a5 + 600); posA.sholto = b5; extra2027 = ` El tramo 4/4 es el ${fC(sig.dia.fecha)}: min ${ts(a5)}-${ts(b5)} a 1,0× (10′, «desde donde quedaste»).`;
        addDest(keyRes(id) + '#5ene', sig.dia.fecha, 'x');
      }
      it = restoAudio(id, f, vel, carril);
    }
    const tramoTxt = plan ? `tramo ${plan.k}/${plan.N} del plan` : null;
    const que = `${A.titulo} (${ts(A.seg)}) → ${id === 'deepDivePE' ? 'minutos' : 'min'} ${ts(a)}-${ts(fin)}${tramoTxt ? ` (${tramoTxt})` : ''}${fin >= A.seg - 1 ? ' (final)' : ''}`;
    const comoBase = `Auriculares, ${velTxt(vel)}×${vel === 1 ? ' con subtítulos en inglés' : ''}: ${ts(fin - a)} de audio = ${fmt1((fin - a) / vel / 60)}′${capsTxt(id, a, fin) ? ` (capítulos: ${capsTxt(id, a, fin)})` : ''}. ${prev ? `Retoma donde paraste el ${fC(prev)}.` : 'Empieza en 0:00.'}`;
    const head = /^Canal Anthropic/.test(m) ? `${(/^"[^"]+"/.exec(b.leccion) || [''])[0]} — tramo ${Math.floor(a / (600 * vel)) + 1}` : tramoTxt ? `${tramoTxt[0].toUpperCase()}${tramoTxt.slice(1)}` : '';
    const base = { leccion: `${head ? `${head}: ` : ''}min ${ts(a)}-${ts(fin)} de ${ts(A.seg)} a ${velTxt(vel)}× (10′)`, guia: { que, como: comoBase + extra2027, url: A.url + (/youtube/.test(A.url) && a ? `&t=${a}s` : ''), t: 'B ↗' }, med: (fin - a) / vel / 60 };
    if (it) pendTxt.push({ fecha: f, tag: 'B', resto: it.k, restoTxt: `min ${ts(it.a)}-${ts(it.b)}: ${ts(it.b - it.a)} de audio = ${fmt1((it.b - it.a) / vel / 60)}′ a ${velTxt(vel)}×`, base });
    else if (sigMismo) { base.guia.como += ` Sigue el ${fC(sig.dia.fecha)}.`; out(f, 'B', base); }
    else out(f, 'B', base);
  }

  // ── C ──
  const CAP_DE = (b) => {
    if (/^Pro Git/.test(b.material)) return `progit${(/cap\. (\d+)/.exec(b.leccion) || [])[1]}`;
    if (/^The Python Tutorial/.test(b.material) && /Sección (\d+):/.test(b.leccion)) return `py${/Sección (\d+):/.exec(b.leccion)[1]}`;
    if (/^Automate the Boring Stuff/.test(b.material)) return `atbs${(/cap\. (\d+)/.exec(b.leccion) || [])[1]}`;
    if (/lethal trifecta/i.test(b.leccion)) return 'trifecta';
    if (/Many-shot jailbreaking/.test(b.leccion)) return 'manyshot';
    if (/Constitutional Classifiers/.test(b.leccion)) return 'constclass';
    if (/Responsible Scaling Policy/.test(b.leccion)) return 'rsp';
    return null;
  };
  const SERIE_W = ['pi1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7'];
  let serieW = { i: 0, a: HECHO_17.pi1 === 500 ? null : 0 };
  const recC = (b) => (/ · recupera el .+$/.exec(b.leccion) || [''])[0];
  /** Pro Git: «Pro Git › 2.2 «Recording Changes…» (cap. 2)» — la sección numerada (página del libro) donde empieza la ventana */
  const tituloDe = (L, a) => {
    if (!/^progit/.test(L.id)) return L.titulo;
    for (let si = L.flat[a].si; si >= 0; si--) { const mm = /^(\d+\.\d+) (?:.* - )?(.*)$/.exec(L.secciones[si].t); if (mm) return `Pro Git › ${mm[1]} «${mm[2]}» (${L.titulo.replace(/^Pro Git › /, '')})`; }
    return L.titulo;
  };
  function lecturaTxt(id, v, extraComo = '', prev) {
    const L = LEC[id];
    return {
      que: `${tituloDe(L, v.a)} → ${loc(L, v.a, v.b)} (≈${r10(v.w)} palabras)`,
      como: `5′ a 100 palabras/min (${v.w} palabras ≈ ${fmt1(v.w / PPM)}′).${prev ? ` Retoma donde quedaste el ${fC(prev)}.` : ''}${extraComo}`,
      url: urlSec(L, L.flat[v.a].si),
    };
  }
  function bloqueC(idx, dia, b) {
    const f = dia.fecha, m = b.material;
    if (/^Simon Willison — serie Prompt injection/.test(m)) {
      // serie de Willison en orden (martes y el vie 18-dic): «Prompt injection attacks…» ya va por la palabra ≈500 (mar 17-nov)
      if (serieW.a == null) { serieW = { i: 0, a: LEC.pi1.flat.findIndex((_, k) => sumW(LEC.pi1, 0, k + 1) >= HECHO_17.pi1) + 1 }; prevSes.pi1 = '2026-11-17'; }
      const piezas = []; let falta = OBJ;
      while (falta > 60 && serieW.i < SERIE_W.length) {
        const L = LEC[SERIE_W[serieW.i]];
        const quedan = sumW(L, serieW.a, L.flat.length);
        const v = quedan <= falta * 1.15 ? { a: serieW.a, b: L.flat.length, w: quedan } : ventana(L, serieW.a, falta);
        piezas.push({ id: L.id, v }); falta -= v.w; serieW.a = v.b;
        if (serieW.a >= L.flat.length) { serieW.i++; serieW.a = 0; }
        else {
          // el final de un artículo (≤ 300 palabras) que no cabe hoy: al comodín del sábado (lo prometido el mar 17-nov para «Prompt injection…») y la serie sigue con el siguiente
          const rest = sumW(L, serieW.a, L.flat.length);
          if (rest <= 300 && L.id === 'pi1') { colaC.push({ k: `${L.id}#resto`, id: L.id, L, a: serieW.a, b: L.flat.length, origen: prevSes[L.id] || f, articulo: true, serie: true }); serieW.i++; serieW.a = 0; }
          break;
        }
      }
      const partes = piezas.map((p) => lecturaTxt(p.id, p.v, '', null));
      const w = piezas.reduce((x, p) => x + p.v.w, 0);
      const prev = prevSes[piezas[0].id];
      piezas.forEach((p) => { prevSes[p.id] = f; });
      const sigW = siguienteMismo(idx, 'C', /^Simon Willison — serie Prompt injection/);
      const enCurso = serieW.i < SERIE_W.length && serieW.a > 0 ? LEC[SERIE_W[serieW.i]] : null;
      const tail = colaC.find((x) => x.serie && x.origen && x.id === piezas[piezas.length - 1].id);
      const sigTxt = tail ? ` El ${sigW ? fC(sigW.dia.fecha) : 'próximo martes'} empieza el siguiente artículo de la serie.`
        : enCurso ? ` Sigue el ${sigW ? fC(sigW.dia.fecha) : 'próximo martes'} con el resto de este artículo${sigW && !enF1(sigW.dia.fecha) ? ' (antes de «el siguiente artículo de la serie»)' : ''}.` : sigW ? ` El ${fC(sigW.dia.fecha)}, el siguiente artículo de la serie.` : '';
      const base = { leccion: piezas.map((p) => `${LEC[p.id].titulo.replace(/^Simon Willison · /, '')} ${loc(LEC[p.id], p.v.a, p.v.b)}`).join(' + ') + ` (≈${r10(w)} palabras)${recC(b)}`,
        guia: { que: `Simon Willison · serie Prompt injection: ${partes.map((x) => x.que.replace(/^Simon Willison · /, '')).join(' + ')}`, como: `5′ a 100 palabras/min (${w} palabras ≈ ${fmt1(w / PPM)}′).${prev ? ` Retoma donde quedaste el ${fC(prev)}.` : ''}${sigTxt}`, url: partes[0].url, t: 'C ↗' }, med: w / PPM };
      if (tail) pendTxt.push({ fecha: f, tag: 'C', resto: tail.k, restoTxt: `≈${r10(sumW(tail.L, tail.a, tail.b))} palabras`, base, soloDest: true });
      else out(f, 'C', base);
      return;
    }
    if (/^Comodín de lectura/.test(m)) {
      const t = tomarC(OBJ, f);
      if (!t.piezas.length) return;
      const que = 'Comodín de lectura · ' + t.piezas.map((p) => `${tituloDe(p.it.L, p.a)} → ${loc(p.it.L, p.a, p.b)} (≈${r10(p.w)} palabras)`).join(' + ');
      const como = `5′ a 100 palabras/min (${t.w} palabras ≈ ${fmt1(t.w / PPM)}′). ` + t.piezas.map((p) => { const pv = fC(prevSes[p.it.id] || p.it.origen); const r = t.piezas.length > 1 ? `«${p.it.L.titulo.replace(/^.*«|».*$/g, '')}» (la dejaste el ${pv}).` : `Retoma donde quedaste el ${pv}.`; prevSes[p.it.id] = f; return r; }).join(' ') + ' Nada nuevo: la cola de lectura de F1 (lo que no cupo en su día).';
      pendTxt.push({ fecha: f, tag: 'C', piezas: t.piezas.map((p) => ({ k: p.it.k, fin: p.b })), base: { leccion: 'Cola de lectura: ' + t.piezas.map((p) => `${p.it.L.titulo.replace(/^.*«|».*$/g, '')} (≈${r10(p.w)} palabras)`).join(' + '), guia: { que, como, url: urlSec(t.piezas[0].it.L, t.piezas[0].it.L.flat[t.piezas[0].a].si), t: 'C ↗' }, med: t.w / PPM } });
      return;
    }
    const id = CAP_DE(b);
    if (!id || !LEC[id]) return;
    const L = LEC[id];
    const a = posL[id] ?? 0;
    const v = ventana(L, a);
    posL[id] = v.b;
    const prev = prevSes[id];
    prevSes[id] = f;
    const articulo = !/^(py|atbs|progit)/.test(id);
    // ¿la siguiente sesión de su carril es el MISMO capítulo? (Pro Git: 2 lunes por capítulo; el cap. 6 sigue el lun 4-ene)
    const sig = siguienteMismo(idx, 'C', new RegExp('^' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    const sigMismo = sig && CAP_DE(sig.b) === id;
    let extra2027 = '';
    if (sigMismo && !enF1(sig.dia.fecha)) {
      const v2 = ventana(L, posL[id]); posL[id] = v2.b;
      extra2027 = ` Sigue el ${fC(sig.dia.fecha)} (≈${r10(v2.w)} palabras: ${loc(L, v2.a, v2.b)}).`;
    }
    const t = lecturaTxt(id, v, '', prev);
    const head = (/^Sección \d+: "[^"]+"/.exec(b.leccion) || [])[0] || ((/cap\. \d+: "[^"]+"/.exec(b.leccion) || [])[0]) || b.leccion.split(' — ')[0];
    const base = { leccion: `${head} → ${loc(L, v.a, v.b)} (≈${r10(v.w)} palabras de ${L.total})${recC(b)}`, guia: { ...t, t: 'C ↗' }, med: v.w / PPM };
    if (sigMismo && enF1(sig.dia.fecha)) { base.guia.como += ` Sigue el ${fC(sig.dia.fecha)}.`; out(f, 'C', base); return; }
    base.guia.como += extra2027;
    if (posL[id] < L.flat.length) {
      const it = { k: `${id}#resto`, id, L, a: posL[id], b: L.flat.length, origen: f, articulo };
      colaC.push(it);
      pendTxt.push({ fecha: f, tag: 'C', resto: it.k, restoTxt: `≈${r10(sumW(L, it.a, it.b))} palabras: ${loc(L, it.a, it.b)}`, base });
    } else out(f, 'C', base);
  }

  // ── recorrido de F1 ──
  dias.forEach((dia, idx) => {
    if (!enF1(dia.fecha)) return;
    for (const b of dia.bloques) {
      if (b.tag === 'A') bloqueA(dia, b);
      else if (b.tag === 'B') bloqueB(idx, dia, b);
      else if (b.tag === 'C') bloqueC(idx, dia, b);
    }
  });
  // ── 2027 que ya lo prevé: vie 8-ene «termina los tramos pendientes de las semanas previas» (canal Anthropic, 10′ a 1,0×) ──
  {
    const d8 = dias.find((d) => d.fecha > HASTA && d.bloques.some((b) => b.tag === 'B' && /^Canal Anthropic/.test(b.material) && /termina los tramos pendientes/.test(b.leccion)));
    if (d8) {
      const delCanal = colaB.filter((x) => x.carril === 'vie');
      let resto = 600;
      for (const it of delCanal) {
        if (resto <= 30) break;
        const cabe = Math.floor(resto / 60) * 60, fin = Math.min(it.b, it.a + cabe);
        addDest(it.k, d8.fecha, `${fC(d8.fecha)} (min ${ts(it.a)}-${ts(fin)} a 1,0×, «termina los tramos pendientes»)`);
        resto -= fin - it.a; it.a = fin;
      }
      for (let i = colaB.length - 1; i >= 0; i--) if (colaB[i].a >= colaB[i].b - 1) colaB.splice(i, 1);
    }
  }
  // ── COLA POST-STEP 1: 30′/día L-V desde el lun 13-dic-2027 ──
  const cola = [];
  const todo = [...colaB.map((x) => ({ ...x, tipo: 'audio' })), ...colaC.map((x) => ({ ...x, tipo: 'lectura' }))]
    .sort((x, y) => (x.origen < y.origen ? -1 : x.origen > y.origen ? 1 : x.tipo === y.tipo ? 0 : x.tipo === 'audio' ? -1 : 1));
  let dia = COLA_DESDE;
  const habil = (f) => dowOf(f) >= 1 && dowOf(f) <= 5 && !ctx.skip.has(f) && !ctx.protegidos.has(f);
  while (!habil(dia)) dia = addD(dia, 1);
  let presup = COLA_MIN, hoy = { fecha: dia, piezas: [] };
  const cerrarDia = () => { if (hoy.piezas.length) cola.push(hoy); dia = addD(dia, 1); while (!habil(dia)) dia = addD(dia, 1); hoy = { fecha: dia, piezas: [] }; presup = COLA_MIN; };
  for (const it of todo) {
    while (true) {
      if (it.tipo === 'audio') {
        if (it.a >= it.b - 1) break;
        const necesita = (it.b - it.a) / it.vel / 60;
        if (necesita <= presup * 1.1) { hoy.piezas.push({ titulo: it.titulo, url: it.url, desde: ts(it.a), hasta: ts(it.b), min: Math.round(necesita * 10) / 10, vel: it.vel }); addDest(it.k, hoy.fecha, `${fC(hoy.fecha)} (min ${ts(it.a)}-${ts(it.b)})`); presup -= necesita; it.a = it.b; if (presup < 3) cerrarDia(); break; }
        const cabe = Math.floor(presup * it.vel) * 60;
        if (cabe < 120) { cerrarDia(); continue; }
        const fin = it.a + cabe;
        hoy.piezas.push({ titulo: it.titulo, url: it.url, desde: ts(it.a), hasta: ts(fin), min: Math.round((cabe / it.vel / 60) * 10) / 10, vel: it.vel }); addDest(it.k, hoy.fecha, `${fC(hoy.fecha)} (min ${ts(it.a)}-${ts(fin)})`);
        it.a = fin; cerrarDia();
      } else {
        if (it.a >= it.b) break;
        const quedan = sumW(it.L, it.a, it.b);
        if (quedan / PPM <= presup * 1.1) { hoy.piezas.push({ titulo: it.L.titulo, url: urlSec(it.L, it.L.flat[it.a].si), desde: loc(it.L, it.a, it.b), palabras: quedan, min: Math.round((quedan / PPM) * 10) / 10 }); addDest(it.k, hoy.fecha, `${fC(hoy.fecha)} (≈${r10(quedan)} palabras)`); presup -= quedan / PPM; it.a = it.b; if (presup < 3) cerrarDia(); break; }
        if (presup < 3) { cerrarDia(); continue; }
        const v = ventana(it.L, it.a, presup * PPM, it.b);
        if (v.b <= v.a) { cerrarDia(); continue; }
        hoy.piezas.push({ titulo: it.L.titulo, url: urlSec(it.L, it.L.flat[v.a].si), desde: loc(it.L, v.a, v.b), palabras: v.w, min: Math.round((v.w / PPM) * 10) / 10 }); addDest(it.k, hoy.fecha, `${fC(hoy.fecha)} (≈${r10(v.w)} palabras)`);
        it.a = v.b; cerrarDia();
      }
    }
  }
  if (hoy.piezas.length) cola.push(hoy);
  // nada se quita: todo resto de F1 queda con fecha (si algo quedara sin colocar, ABORTA)
  for (const it of todo) if (it.tipo === 'audio' ? it.a < it.b - 1 : it.a < it.b) throw new Error(`v6.09b: resto sin fecha en la cola post-Step 1: ${it.k}`);

  // ── textos con los destinos (fechas) del resto ──
  const destTxt = (k) => {
    const ds = (destinos.get(k) || []).filter((x) => x.txt !== 'x');
    const f1 = ds.filter((x) => x.fecha < COLA_DESDE), post = ds.filter((x) => x.fecha >= COLA_DESDE);
    const partes = [];
    if (f1.length) partes.push(f1.map((x) => x.txt).join(' · '));
    if (post.length) partes.push(`cola post-Step 1 (30′/día) ${post.length === 1 ? post[0].txt : `${fC(post[0].fecha)} → ${fC(post[post.length - 1].fecha)}`}`);
    return partes.join(' · ');
  };
  for (const p of pendTxt) {
    const o = JSON.parse(JSON.stringify(p.base));
    if (p.resto) o.guia.como += ` El resto (${p.restoTxt}) va a: ${destTxt(p.resto)}.`;
    if (p.piezas) {
      const fins = p.piezas.map((x) => { const ds = (destinos.get(x.k) || []).filter((d) => d.fecha > p.fecha && d.txt !== 'x'); return ds.length ? `lo que queda de ${x.k.replace(/#resto$/, '')}: ${ds.length > 3 ? `${ds[0].txt} … ${ds[ds.length - 1].txt}` : ds.map((d) => d.txt).join(' · ')}` : null; }).filter(Boolean);
      if (fins.length) o.guia.como += ` Sigue: ${fins.join(' · ').replace(/(\w+)#resto/g, '$1')}.`;
    }
    res.sesiones.set(`${p.fecha}|${p.tag}`, o);
  }
  // nombres legibles en «lo que queda de …»
  const NOMBRE = Object.fromEntries([...Object.entries(MED.lectura).map(([k, v]) => [k, v.titulo.replace(/^.*«|».*$/g, '')]), ...Object.entries(MED.audio).map(([k, v]) => [k, v.titulo.replace(/^.*· /, '')])]);
  for (const o of res.sesiones.values()) if (o.guia) o.guia.como = o.guia.como.replace(/lo que queda de ([A-Za-z0-9]+):/g, (_, k) => `lo que queda de ${NOMBRE[k] ? `«${NOMBRE[k].replace(/^«|»$/g, '')}»` : k}:`);
  return { sesiones: res.sesiones, cola };
}

module.exports = { crear, DESDE, HASTA, COLA_DESDE, COLA_MIN };
