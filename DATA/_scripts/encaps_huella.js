#!/usr/bin/env node
/**
 * encaps_huella.js — huella de las filas ENCAPS de study_schedule, calculable IGUAL en node (desde los SQL versionados) y en Postgres (Supabase).
 * v6.07 (8-nov-2026): nuevo. La «huella v2» de v6.01-v6.06 no quedó escrita en el repo; esta es la que se usó en la siembra v6.07
 * (vivo antes: 92 · 601f38c44801482f323864bc7d1e9220 = v6.06 · después: 87 · a50afd468b8c30a5f070ce8c5fc03da3 = v6.07).
 *   node DATA/_scripts/encaps_huella.js                → huella de _encaps_mantenimiento_2027.sql + _encaps_intensivo_2027.sql e imprime el SELECT
 *   node DATA/_scripts/encaps_huella.js a.sql b.sql    → huella de esos SQL (mismo formato de VALUES que los generadores)
 * SELECT (Supabase, proyecto qacynpqdrorpuegsmtcy):
 *   SELECT count(*) || ' · ' || md5(string_agg(concat_ws('|', dia, fecha, weekday, tipo, coalesce(codigo,'∅'), subtema, prioridad, modo, coalesce(nts,'∅'),
 *     videos::text, theomed::text, material_comp::text, coalesce(temas_secundarios::text,'∅'), coalesce(extra::text,'∅')), E'\n' ORDER BY dia))
 *   FROM study_schedule WHERE examen = 'ENCAPS';
 * En node el jsonb se serializa como lo hace Postgres (jsonb::text): claves ordenadas por longitud y luego por bytes, separadores «, » y «: ».
 */
'use strict';
const path = require('path');
const fs = require('fs'), crypto = require('crypto');
function pgJsonb(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return '[' + v.map(pgJsonb).join(', ') + ']';
  if (typeof v === 'object') {
    const ks = Object.keys(v).sort((a, b) => { const ba = Buffer.from(a), bb = Buffer.from(b); return ba.length - bb.length || Buffer.compare(ba, bb); });
    return '{' + ks.map((k) => JSON.stringify(k) + ': ' + pgJsonb(v[k])).join(', ') + '}';
  }
  if (typeof v === 'string') return JSON.stringify(v);
  return String(v);
}
function parseTupla(l) {
  // ('ENCAPS',1,'2026-11-09','Lun','banqueo1h','II-3','…','CRITICA','MANTENIMIENTO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'[…]'::jsonb,'{…}'::jsonb)
  let i = l.indexOf('(') + 1; const out = [];
  while (i < l.length) {
    while (l[i] === ' ') i++;
    if (l[i] === "'") {
      let j = i + 1, s = '';
      for (;;) { if (l[j] === "'" && l[j + 1] === "'") { s += "'"; j += 2; } else if (l[j] === "'") break; else s += l[j++]; }
      j++;
      let tipo = 'text'; if (l.startsWith('::jsonb', j)) { tipo = 'jsonb'; j += 7; }
      out.push(tipo === 'jsonb' ? { j: JSON.parse(s) } : s); i = j;
    } else { let j = i; while (l[j] !== ',' && l[j] !== ')') j++; const t = l.slice(i, j).trim(); out.push(t === 'NULL' ? null : Number(t)); i = j; }
    if (l[i] === ',') { i++; continue; } if (l[i] === ')') break;
  }
  return out;
}
const COLS = ['examen', 'dia', 'fecha', 'weekday', 'tipo', 'codigo', 'subtema', 'prioridad', 'modo', 'videos', 'theomed', 'material_comp', 'temas_secundarios', 'extra'];
function filasDe(ficheros) {
  const filas = [];
  for (const f of ficheros) for (const l of fs.readFileSync(f, 'utf8').split('\n')) if (l.startsWith("('ENCAPS',")) {
    const t = parseTupla(l); if (t.length !== COLS.length) throw new Error('tupla con ' + t.length + ' campos: ' + l.slice(0, 80));
    filas.push(Object.fromEntries(COLS.map((c, k) => [c, t[k]])));
  }
  return filas.sort((a, b) => a.dia - b.dia);
}
const js = (x) => (x == null ? '∅' : pgJsonb(x.j));
function huella(filas) {
  const s = filas.map((r) => [r.dia, r.fecha, r.weekday, r.tipo, r.codigo ?? '∅', r.subtema, r.prioridad, r.modo, '∅', pgJsonb(r.videos.j), pgJsonb(r.theomed.j), pgJsonb(r.material_comp.j), js(r.temas_secundarios), js(r.extra)].join('|')).join('\n');
  return { n: filas.length, md5: crypto.createHash('md5').update(s, 'utf8').digest('hex') };
}
module.exports = { pgJsonb, parseTupla, filasDe, huella, COLS };
if (require.main === module) {
  const args = process.argv.slice(2);
  const def = [path.join(__dirname, "_encaps_mantenimiento_2027.sql"), path.join(__dirname, "_encaps_intensivo_2027.sql")];
  const h = huella(filasDe(args.length ? args : def));
  console.log(`${h.n} · ${h.md5}`);
}
