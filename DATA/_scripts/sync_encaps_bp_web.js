#!/usr/bin/env node
/**
 * sync_encaps_bp_web.js — publica los RUNNERS de BANCO_PROPIO como estáticos web para que la app desplegada los abra con un toque
 * (antes solo abrían en el PC de Joseph con file:///D:/joseph-md-app/DATA/ENCAPS/BANCO_PROPIO/…). Copia byte a byte
 *   DATA/ENCAPS/BANCO_PROPIO/{eval,pretest_arranque,banco,minisim}_YYYY-MM-DD.html → public/encaps/bp/<mismo nombre>
 * y `npx expo export --platform web` copia public/ a dist/ (Vercel sirve el fichero antes de la regla SPA de vercel.json):
 *   https://joseph-md-app.vercel.app/encaps/bp/pretest_arranque_2026-10-26.html   (v6.05; v6.03: …_2026-10-21.html · v6.02: …_2026-10-19.html)
 * Los runners son HTML autocontenidos (CSS + JS inline, sin fetch): el progreso vive en el localStorage de ese origen y el botón
 * «Generar JSON» descarga el export para `node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> --append`.
 *
 * LISTA NEGRA (examen ENCAPS 2026-II = pre-test del vie 8-ene-2027): NUNCA se publican pretest_2026-II.* ni sim100_* ni nada que no
 * case con el patrón de arriba; además cada runner se valida contra su .json: aborta si algún ítem tiene `fuente` / `verificado_contra` /
 * `molde` con «2026-2» / «2026-II» (misma regla que gen_encaps_minisim.js) o si `_meta.lista_negra_pretest` no está VIGENTE.
 * v6.02d (18-oct-2026, F1): además aborta si el .json o el .html de un runner NOMBRA el examen reservado como pre-test en cualquier texto
 * (explicaciones, metadatos, fuente_preguntas…: LN_MENCION, la misma regla que gen_encaps_minisim.js --refrescar) — lo publicado no alude
 * a ese examen ni a lo que preguntó su comité. La marca vieja `_meta.lista_negra_2026_II` ya no vale: correr gen_encaps_minisim.js --refrescar.
 * Exposición: estos ficheros ya están en el repo PÚBLICO (josephMAX-svg/joseph-md-app, DATA/ENCAPS/BANCO_PROPIO); publicarlos en el deploy no
 * añade contenido nuevo. public/robots.txt pide a los buscadores no indexar /encaps/.
 *
 * Uso:
 *   node DATA/_scripts/sync_encaps_bp_web.js           → copia los runners nuevos o cambiados y borra de public/ los que ya no existen en el origen
 *   node DATA/_scripts/sync_encaps_bp_web.js --check   → exit 1 si public/encaps/bp no es copia exacta del origen (o si hay algo de la lista negra)
 * Correrlo después de cada `gen_encaps_minisim.js --semana/--banco/--eval/<viernes>` y antes del deploy (y luego gen_encaps_guia.js).
 * v6.02c (18-oct-2026, E4): nuevo.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'DATA', 'ENCAPS', 'BANCO_PROPIO');
const DST = path.join(ROOT, 'public', 'encaps', 'bp');
const CHECK = process.argv.includes('--check');
const PATRON = /^(eval|pretest_arranque|banco|minisim)_(\d{4}-\d{2}-\d{2})\.html$/;
const LN = /2026-?II\b|2026-2(?!\d)/i;
const LN_MENCION = /2026[-_ ]?II(?![A-Za-z])|2026-2(?!\d)|examen de agosto(?: de)?[ -]?2026|comit[eé] (?:del? )?2026/i; // = gen_encaps_minisim.js

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const aborta = (m) => { console.error('✗ ' + m); process.exit(1); };

function validar(f) {
  const json = path.join(SRC, f.replace(/\.html$/, '.json'));
  if (!fs.existsSync(json)) aborta(`${f}: falta su .json (no se publica un runner sin poder validarlo)`);
  const txt = fs.readFileSync(json, 'utf8');
  const j = JSON.parse(txt);
  const ln = String((j._meta || {}).lista_negra_pretest || '');
  if (!/^VIGENTE/.test(ln)) aborta(`${f}: _meta.lista_negra_pretest no está VIGENTE («${ln}»)${(j._meta || {}).lista_negra_2026_II ? ' — marca vieja: correr node DATA/_scripts/gen_encaps_minisim.js --refrescar' : ''}`);
  for (const it of j.items || []) {
    for (const k of ['fuente', 'verificado_contra', 'molde']) {
      if (LN.test(String(it[k] || ''))) aborta(`${f}: el ítem ${it.id} tiene ${k} del examen reservado como pre-test («${it[k]}») — LISTA NEGRA`);
    }
  }
  const men = txt.match(LN_MENCION) || fs.readFileSync(path.join(SRC, f), 'utf8').match(LN_MENCION);
  if (men) aborta(`${f}: nombra el examen reservado como pre-test («${men[0]}») — corregir el texto en su fuente y correr gen_encaps_minisim.js --refrescar`);
  return (j.items || []).length;
}

const fuentes = fs.readdirSync(SRC).filter((f) => PATRON.test(f)).sort();
const enDst = fs.existsSync(DST) ? fs.readdirSync(DST).filter((f) => f.endsWith('.html')).sort() : [];
const prohibidos = enDst.filter((f) => !PATRON.test(f));
if (prohibidos.length) aborta(`public/encaps/bp contiene ficheros fuera del patrón permitido: ${prohibidos.join(', ')}`);

let errores = 0, copiados = 0, iguales = 0, borrados = 0;
if (!CHECK) fs.mkdirSync(DST, { recursive: true });
for (const f of fuentes) {
  const n = validar(f);
  const a = fs.readFileSync(path.join(SRC, f));
  const p = path.join(DST, f);
  const b = fs.existsSync(p) ? fs.readFileSync(p) : null;
  if (b && sha(a) === sha(b)) { iguales++; continue; }
  if (CHECK) { console.error(`✗ ${f}: ${b ? 'difiere del origen' : 'falta en public/encaps/bp'}`); errores++; continue; }
  fs.writeFileSync(p, a); copiados++; console.log(`✓ ${f} (${n} ítems)`);
}
for (const f of enDst) {
  if (fuentes.includes(f)) continue;
  if (CHECK) { console.error(`✗ ${f}: está en public/encaps/bp pero ya no existe en BANCO_PROPIO`); errores++; continue; }
  fs.unlinkSync(path.join(DST, f)); borrados++; console.log(`− ${f} (ya no existe en el origen)`);
}
const robots = path.join(ROOT, 'public', 'robots.txt');
const ROBOTS = 'User-agent: *\nDisallow: /encaps/\n';
if (!fs.existsSync(robots) || fs.readFileSync(robots, 'utf8') !== ROBOTS) {
  if (CHECK) { console.error('✗ public/robots.txt no pide «Disallow: /encaps/»'); errores++; } else { fs.writeFileSync(robots, ROBOTS); console.log('✓ public/robots.txt'); }
}
if (CHECK) {
  if (errores) process.exit(1);
  console.log(`OK — ${iguales} runners publicados = origen (public/encaps/bp)`);
} else {
  console.log(`OK — ${fuentes.length} runners · ${copiados} copiados · ${iguales} sin cambios · ${borrados} borrados → public/encaps/bp`);
}
