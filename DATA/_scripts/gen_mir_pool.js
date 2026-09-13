#!/usr/bin/env node
/**
 * gen_mir_pool.js — Pool de preguntas OFICIALES del examen MIR (Ministerio de Sanidad, España).
 *
 * Pipeline completo "MIR · pool de preguntas oficiales" (gaps_v3b_mir.json, punto 2):
 *   paso 1 (--descargar, --parse): cuadernos versión 0 + hojas de respuestas DEFINITIVAS 2022-2026 → AAAA.json
 *   paso 2 (--clasificar, --verificar): etiquetas del pase LLM (_clasificacion_llm/AAAA.json) × pool → AAAA_clasificado.json
 *          + _clasificacion_stats.json (distribución, contraste con Academia CTO/ConSalud, muestra del 10 % y % de acuerdo)
 *   paso 3 (--emit): src/lib/mirPreguntasOficiales.ts (MIR_PREGUNTAS_OFICIALES + MIR_POOL_META + helpers que consume la UI)
 *
 * Uso (desde D:\joseph-md-app):
 *   node DATA/_scripts/gen_mir_pool.js --clasificar [--anios …]   → DATA/MIR/pool/AAAA_clasificado.json + _clasificacion_stats.json
 *                                                                   (+ _clasificacion_llm/_muestra_2pasada_lectura.txt la 1ª vez)
 *   node DATA/_scripts/gen_mir_pool.js --verificar                → % de acuerdo de _clasificacion_llm/_muestra_2pasada.json
 *   node DATA/_scripts/gen_mir_pool.js --emit                     → src/lib/mirPreguntasOficiales.ts (< 3 MB, tsc limpio)
 *   node DATA/_scripts/gen_mir_pool.js --descargar [--con-imagenes] [--anios 2022,2026]
 *       → DATA/MIR/pool/raw/AAAA_cuadernillo.pdf            (cuaderno versión 0, PDF oficial)
 *         DATA/MIR/pool/raw/AAAA_plantilla_definitiva_v0.json (hoja de respuestas oficial, tal cual la sirve la API)
 *         DATA/MIR/pool/raw/AAAA_imagenes.pdf                (cuaderno de imágenes, SOLO con --con-imagenes: 15-25 MB/año)
 *         DATA/MIR/pool/_fuentes.json                        (URL exacta, parámetros, fecha, sha256, bytes)
 *   node DATA/_scripts/gen_mir_pool.js --parse [--anios 2022,2026]
 *       → DATA/MIR/pool/raw/AAAA_cuadernillo.txt   (pdftotext -enc UTF-8 -raw, trazabilidad)
 *         DATA/MIR/pool/AAAA.json                  ([{id,numero,enunciado,opciones[4],clave,imagen,anulada,...}])
 *         DATA/MIR/pool/_parse_errores.json        (lo que no parseó bien; nunca se inventa)
 *         DATA/MIR/pool/_stats.json                (estadísticas por año, las usa el README)
 *   node DATA/_scripts/gen_mir_pool.js --stats
 *       → imprime la tabla de estadísticas en Markdown
 *
 * Convención de años: AAAA = año en que se CELEBRA el examen ("MIR 2026" = pruebas selectivas 2025,
 * examen 24-ene-2026). El portal FSE del Ministerio indexa por año de las pruebas selectivas
 * (anyo = AAAA - 1). Los ids de pregunta son 'AAAA-NNN' (NNN = número en la versión 0, 001-210).
 *
 * Fuente oficial (verificada 12-sep-2026): portal FSE del Ministerio de Sanidad
 *   https://fse.sanidad.gob.es/fseweb/  →  "Datos, Exámenes anteriores e Impresión Autoinformes"
 *   → "Consulta cuadernos de exámenes anteriores". La SPA (Angular) llama a una API REST con un
 *   token anónimo (client_id 'herapublico', grant_type 'session_id'); este script replica esas
 *   llamadas exactamente como las hace el navegador. Sin registro, sin captcha.
 *   Espejo público sin registro: https://www.examenesmir.com/examenes-mir-pdf (misma PDF, se
 *   comprueba por sha256 en --descargar).
 *
 * Requisitos: Node >= 18 (fetch global) y pdftotext (poppler; viene con Git for Windows en
 *   C:\Program Files\Git\mingw64\bin\pdftotext.exe).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

// ───────────────────────────── rutas ─────────────────────────────
const ROOT = path.resolve(__dirname, '..', '..');
const POOL_DIR = path.join(ROOT, 'DATA', 'MIR', 'pool');
const RAW_DIR = path.join(POOL_DIR, 'raw');
const FUENTES = path.join(POOL_DIR, '_fuentes.json');
const ERRORES = path.join(POOL_DIR, '_parse_errores.json');
const STATS = path.join(POOL_DIR, '_stats.json');

// ───────────────────────────── constantes ─────────────────────────────
/** Años MIR (año del examen) → año de "pruebas selectivas" en el portal FSE. */
const ANIOS_MIR = [2022, 2023, 2024, 2025, 2026];
const TITULACION = 'M'; // MEDICINA en allTitulosMaestra (codtitul 'M', numpregu 210, numversi 4)
const VERSION = 0;      // versión 0 = orden canónico que publica el Ministerio
const N_PREGUNTAS = 210; // 200 + 10 de reserva (201-210)

const FSE_BASE = 'https://fse.sanidad.gob.es';
const FSE_TOKEN = FSE_BASE + '/hera/oauth/api/v1/oidc/token';
const FSE_TITULOS = FSE_BASE + '/hera/api/datos/resumen/allTitulosMaestra';
const FSE_ANYOS = FSE_BASE + '/hera/api/datos/convocatoria/getAnyos';
const FSE_VERSIONES = FSE_BASE + '/hera/api/datos/convocatoria/getVersiones';
const FSE_TIENE_RESP = FSE_BASE + '/hera/api/datos/convocatoria/tieneRespuesta';
const FSE_TIENE_IMG = FSE_BASE + '/hera/api/datos/convocatoria/tieneImagen';
const FSE_HOJA = FSE_BASE + '/hera/api/datos/convocatoria/getHojaRespuestas';
const FSE_DOC = FSE_BASE + '/hera/api/datos/convocatoria/getDatosCuadernosExamen';
const FSE_PORTAL = FSE_BASE + '/fseweb/view/public/datosanteriores/cuadernosExamen/busquedaConvocatoria.xhtml';

/** Espejo público (misma PDF oficial). El endpoint /download/cuadernillo redirige (302) a /media/exams/AAAA/cuadernillo.pdf?v=… */
const EXAMENESMIR_API = 'https://api.examenesmir.com/api/v1/public/convocatorias';
const EXAMENESMIR_CUADERNILLO = (a) => `${EXAMENESMIR_API}/${a}/download/cuadernillo`;

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) joseph-md-app/gen_mir_pool';

/**
 * Contraste externo (anti-alucinación): lo que publicó la prensa al salir cada plantilla DEFINITIVA
 * (versión 0). Si la hoja del Ministerio no coincide, --parse lo escribe en _parse_errores.json y
 * añade `nota` a la pregunta afectada; NUNCA cambia la clave a mano.
 * Fuentes leídas el 12-sep-2026:
 *  2022 Redacción Médica "Publicadas las respuestas definitivas del examen MIR: 3 preguntas anuladas" (120, 126, 189)
 *  2023 ConSalud / iSanidad "Sanidad anula cuatro preguntas del examen MIR…" (15, 40, 128, 138)
 *  2024 Redacción Médica "El examen MIR 2024 'carga' con 5 anulaciones…" (64, 68, 113, 180, 206)
 *  2025 Redacción Médica "Las respuestas definitivas del examen MIR 2025 acarrean seis impugnaciones" e iSanidad
 *       "…con seis preguntas impugnadas" (15, 26, 28, 56, 162, 186; "la pregunta 150 pasa a tener como opción
 *       correcta la 4, en lugar de la 1"; "La pregunta 208, de reserva, tiene como opción correcta la 3 en lugar de la 2")
 *  2026 casimedicos "Respuestas definitivas MIR 2026: 7 preguntas anuladas y reservas" (13, 50, 64, 139, 142, 161, 208)
 */
const CONTRASTES_PRENSA = {
  2022: { anuladas: [120, 126, 189], cambios: {} },
  2023: { anuladas: [15, 40, 128, 138], cambios: {} },
  2024: { anuladas: [64, 68, 113, 180, 206], cambios: {} },
  2025: { anuladas: [15, 26, 28, 56, 162, 186], cambios: { 150: 4, 208: 3 } },
  2026: { anuladas: [13, 50, 64, 139, 142, 161, 208], cambios: {} },
};

// ───────────────────────────── utilidades ─────────────────────────────
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const hoyISO = () => new Date().toISOString();
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const sha256File = (p) => sha256(fs.readFileSync(p));
const leerJSON = (p, def) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : def);
const escribirJSON = (p, obj) => fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
const aniosSeleccionados = () => {
  const a = opt('--anios');
  if (!a) return ANIOS_MIR;
  return a.split(',').map((x) => parseInt(x, 10)).filter((x) => ANIOS_MIR.includes(x));
};

function pdftotextBin() {
  const candidatos = ['pdftotext', 'C:\\Program Files\\Git\\mingw64\\bin\\pdftotext.exe', '/mingw64/bin/pdftotext'];
  for (const c of candidatos) {
    const r = spawnSync(c, ['-v'], { encoding: 'utf8' });
    if (!r.error) return c;
  }
  throw new Error('pdftotext no encontrado (poppler). En Windows viene con Git: C:\\Program Files\\Git\\mingw64\\bin\\pdftotext.exe');
}

// ───────────────────────────── API FSE (Ministerio) ─────────────────────────────
async function fseFetchJSON(url, opts) {
  const r = await fetch(url, opts);
  const txt = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url} :: ${txt.slice(0, 200)}`);
  try { return JSON.parse(txt); } catch (e) { throw new Error(`Respuesta no JSON en ${url}: ${txt.slice(0, 200)}`); }
}

/** Sesión anónima idéntica a la del navegador (AuthService.getToken → grant_type 'session_id'). */
async function fseSesion() {
  const uuid = crypto.randomUUID();
  const cab = {
    'Content-Type': 'application/json',
    'Process-Type': 'MENU',
    'Process-Check': '',
    'X-XSRF-TOKEN': uuid,
    'Proceso-Id': '',
    'User-Agent': UA,
  };
  const tok = await fseFetchJSON(FSE_TOKEN, {
    method: 'POST', headers: cab,
    body: JSON.stringify({ client_id: 'herapublico', state: uuid, grant_type: 'session_id' }),
  });
  if (!tok || !tok.token) throw new Error('El portal FSE no devolvió token anónimo');
  const headers = { ...cab, Authorization: 'Bearer ' + tok.token, 'Proceso-Id': 'ce-01' };
  return { headers, username: tok.username, scope: tok.scope };
}

const q = (base, params) => base + '?' + new URLSearchParams(params).toString();

// ───────────────────────────── --descargar ─────────────────────────────
async function descargar() {
  fs.mkdirSync(RAW_DIR, { recursive: true });
  const fuentes = leerJSON(FUENTES, { generado: null, metodo: null, convocatorias: {} });
  fuentes.metodo = {
    fuente_oficial: FSE_PORTAL,
    como: "API REST del portal FSE (Angular) con token anónimo: POST /hera/oauth/api/v1/oidc/token {client_id:'herapublico', grant_type:'session_id'} → GET getVersiones / tieneRespuesta / getHojaRespuestas / getDatosCuadernosExamen (titulacion=M, anyo=<pruebas selectivas>, version=0). Replicado con gen_mir_pool.js --descargar.",
    espejo: 'https://www.examenesmir.com/examenes-mir-pdf (cuadernillo PDF idéntico byte a byte cuando sha256 coincide; NO publica plantillas: answer_key_url=null en su API)',
    convencion_anios: "AAAA = año del examen (MIR 2026 = pruebas selectivas 2025). 'anyo' en la API FSE = AAAA-1.",
    plantilla: "getHojaRespuestas devuelve la hoja de respuestas de 'Datos, Exámenes anteriores' (la tabla vigente tras la resolución definitiva de la Comisión Calificadora); casilla en blanco = pregunta anulada. Se guarda tal cual (raw/AAAA_plantilla_definitiva_v0.json).",
    uso: 'Uso privado de estudio. El cuaderno lleva la leyenda "PROHIBIDA LA REPRODUCCIÓN TOTAL O PARCIAL": no redistribuir.',
  };

  const ses = await fseSesion();
  console.log(`[FSE] sesión anónima OK (usuario=${ses.username}, scope=${ses.scope})`);

  const titulos = await fseFetchJSON(FSE_TITULOS, { headers: ses.headers });
  const med = (titulos || []).find((t) => t.codtitul === TITULACION);
  if (!med) throw new Error('allTitulosMaestra no contiene MEDICINA (codtitul M)');
  console.log(`[FSE] titulación ${med.codtitul} ${med.destitul} · numpregu=${med.numpregu} · numversi=${med.numversi}`);
  const anyosFSE = await fseFetchJSON(FSE_ANYOS, { headers: ses.headers });
  console.log(`[FSE] años disponibles (pruebas selectivas): ${JSON.stringify(anyosFSE)}`);

  // Metadatos del espejo (fecha de examen) — informativo, se etiqueta como tal.
  let espejo = null;
  try { espejo = await fseFetchJSON(EXAMENESMIR_API, { headers: { 'User-Agent': UA } }); } catch (e) { console.warn('[examenesmir] API no disponible: ' + e.message); }

  const conImagenes = flag('--con-imagenes');
  for (const anio of aniosSeleccionados()) {
    const anyo = anio - 1;
    console.log(`\n═══ MIR ${anio} (pruebas selectivas ${anyo}) ═══`);
    if (!anyosFSE.includes(anyo)) { console.warn(`  ⚠ el portal FSE no lista el año ${anyo}; se omite`); continue; }
    const conv = fuentes.convocatorias[String(anio)] || { pruebas_selectivas: anyo, ficheros: [] };
    conv.pruebas_selectivas = anyo;
    const esp = espejo && espejo.items ? espejo.items.find((it) => it.year === anio) : null;
    if (esp) conv.fecha_examen = { valor: esp.exam_date, fuente: EXAMENESMIR_API + ' (campo exam_date; A VERIFICAR contra la orden de convocatoria en BOE)' };
    const setFichero = (f) => { conv.ficheros = conv.ficheros.filter((x) => x.tipo !== f.tipo); conv.ficheros.push(f); };

    const pv = { titulacion: TITULACION, anyo: String(anyo) };
    const versiones = await fseFetchJSON(q(FSE_VERSIONES, pv), { headers: ses.headers });
    const tieneResp = await fseFetchJSON(q(FSE_TIENE_RESP, pv), { headers: ses.headers });
    const tieneImg = await fseFetchJSON(q(FSE_TIENE_IMG, pv), { headers: ses.headers });
    console.log(`  versiones=${JSON.stringify(versiones)} tieneRespuesta=${tieneResp} tieneImagen=${tieneImg}`);
    if (!Array.isArray(versiones) || !versiones.includes(VERSION)) { console.warn(`  ⚠ no existe la versión ${VERSION}; se omite el año`); continue; }
    conv.versiones_publicadas = versiones;

    // 1) Hoja de respuestas (plantilla definitiva)
    if (tieneResp) {
      const url = q(FSE_HOJA, { ...pv, version: String(VERSION) });
      const hoja = await fseFetchJSON(url, { headers: ses.headers });
      const dest = path.join(RAW_DIR, `${anio}_plantilla_definitiva_v0.json`);
      const buf = Buffer.from(JSON.stringify(hoja, null, 1) + '\n', 'utf8');
      fs.writeFileSync(dest, buf);
      const n = Array.isArray(hoja) ? hoja.length : 0;
      const celdas = Array.isArray(hoja) ? hoja.reduce((acc, row) => acc + Object.keys(row).filter((k) => k.startsWith('V_')).length, 0) : 0;
      console.log(`  plantilla: ${n} filas × columnas → ${celdas} preguntas → ${path.relative(ROOT, dest)}`);
      setFichero({ tipo: 'plantilla_definitiva_v0', fichero: path.relative(ROOT, dest).replace(/\\/g, '/'), url, metodo: 'GET con cabeceras de sesión anónima (ver metodo)', descargado: hoyISO(), sha256: sha256(buf), bytes: buf.length, preguntas: celdas, formato: 'filas {V_k: nº pregunta, RC_k: respuesta correcta (1-4) o " " si anulada} para k=0..4 (5 columnas de 42)' });
    } else {
      console.warn('  ⚠ tieneRespuesta=false: hoja no disponible');
      setFichero({ tipo: 'plantilla_definitiva_v0', fichero: null, url: q(FSE_HOJA, { ...pv, version: String(VERSION) }), descargado: null, nota: 'tieneRespuesta=false en la API el ' + hoyISO() });
    }

    // 2) Cuaderno de examen versión 0 (PDF oficial)
    {
      const url = q(FSE_DOC, { ...pv, version: String(VERSION), opcionSelect: 'C' });
      const doc = await fseFetchJSON(url, { headers: ses.headers });
      if (!doc || !doc.content) throw new Error(`cuaderno ${anio}: la API no devolvió contenido`);
      const buf = Buffer.from(doc.content, 'base64');
      const dest = path.join(RAW_DIR, `${anio}_cuadernillo.pdf`);
      const h = sha256(buf);
      let nota = null;
      if (fs.existsSync(dest)) {
        const hLocal = sha256File(dest);
        if (hLocal === h) nota = 'idéntico (sha256) al fichero ya presente en raw/ (descargado del espejo examenesmir.com)';
        else { const alt = path.join(RAW_DIR, `${anio}_cuadernillo_previo.pdf`); fs.renameSync(dest, alt); nota = `el fichero previo en raw/ difería (sha256 ${hLocal}); renombrado a ${path.basename(alt)}`; fs.writeFileSync(dest, buf); }
      } else fs.writeFileSync(dest, buf);
      console.log(`  cuaderno: ${doc.name} · ${buf.length} bytes · sha256 ${h.slice(0, 12)}… ${nota ? '· ' + nota : ''}`);
      setFichero({ tipo: 'cuadernillo_v0', fichero: path.relative(ROOT, dest).replace(/\\/g, '/'), url, nombre_oficial: doc.name, mimeType: doc.mimeType, idDocumentum: doc.idDocumentum || null, metodo: 'GET (JSON con content en base64) con cabeceras de sesión anónima', descargado: hoyISO(), sha256: h, bytes: buf.length, espejo: { url: EXAMENESMIR_CUADERNILLO(anio), url_final: esp && esp.cuadernillo_url ? esp.cuadernillo_url : null, identico: nota ? nota.startsWith('idéntico') : null }, nota });
    }

    // 3) Cuaderno de imágenes (opcional, --con-imagenes). NO se guarda por defecto: pesa 15-25 MB por año
    //    (demasiado para el repo) y para 2024 la API del Ministerio falla al codificarlo en base64
    //    (HTTP 400 "java.lang.OutOfMemoryError: Java heap space", comprobado 12-sep-2026). Se registra
    //    la URL oficial + la del espejo para descargarlo bajo demanda.
    if (tieneImg) {
      const dest = path.join(RAW_DIR, `${anio}_imagenes.pdf`);
      const url = q(FSE_DOC, { ...pv, version: String(VERSION), opcionSelect: 'I' });
      const espejoImg = esp && esp.images_url ? esp.images_url : `${EXAMENESMIR_API}/${anio}/download/images`;
      const base = { tipo: 'imagenes_v0', url, metodo: 'GET (JSON con content en base64) con cabeceras de sesión anónima · opcional: --con-imagenes', espejo: { url: `${EXAMENESMIR_API}/${anio}/download/images`, url_final: espejoImg } };
      if (!conImagenes) {
        console.log('  imágenes: disponibles (tieneImagen=true); no se descargan sin --con-imagenes');
        setFichero({ ...base, fichero: fs.existsSync(dest) ? path.relative(ROOT, dest).replace(/\\/g, '/') : null, descargado: null, nota: 'no almacenado en el repo (15-25 MB/año); descargar bajo demanda con --con-imagenes o desde el espejo' });
      } else if (fs.existsSync(dest)) {
        console.log('  imágenes: ya existe, se conserva');
        setFichero({ ...base, fichero: path.relative(ROOT, dest).replace(/\\/g, '/'), descargado: hoyISO(), sha256: sha256File(dest), bytes: fs.statSync(dest).size });
      } else {
        try {
          const doc = await fseFetchJSON(url, { headers: ses.headers });
          if (doc && doc.content) {
            const buf = Buffer.from(doc.content, 'base64');
            fs.writeFileSync(dest, buf);
            console.log(`  imágenes: ${doc.name} · ${buf.length} bytes`);
            setFichero({ ...base, fichero: path.relative(ROOT, dest).replace(/\\/g, '/'), nombre_oficial: doc.name, descargado: hoyISO(), sha256: sha256(buf), bytes: buf.length });
          } else { console.warn('  ⚠ imágenes: sin contenido'); setFichero({ ...base, fichero: null, descargado: null, nota: 'la API devolvió sin contenido el ' + hoyISO() }); }
        } catch (e) {
          console.warn('  ⚠ imágenes: la API del Ministerio falló (' + String(e.message).slice(0, 120) + '…); usar el espejo ' + espejoImg);
          setFichero({ ...base, fichero: null, descargado: null, nota: 'fallo de la API oficial el ' + hoyISO() + ': ' + String(e.message).slice(0, 160) + ' · alternativa: espejo' });
        }
      }
    }
    fuentes.convocatorias[String(anio)] = conv;
    fuentes.generado = hoyISO();
    escribirJSON(FUENTES, fuentes);
  }
  console.log(`\n_fuentes.json actualizado → ${path.relative(ROOT, FUENTES)}`);
}

// ───────────────────────────── --parse ─────────────────────────────
/** Deja solo el cuerpo de preguntas: quita instrucciones, paginación y marcas de impresión. */
function limpiarTexto(raw) {
  let lines = raw.replace(/\r/g, '').split('\n');
  // En orden -raw la portada va: ADVERTENCIA … PROHIBIDA … datos de mesa … instrucciones "1. MUY IMPORTANTE" … "8. No se
  // entregarán…" y DESPUÉS la pregunta 1. Se corta en la primera línea "1. " posterior a la instrucción 8;
  // si no aparece, se cae al corte por la línea PROHIBIDA.
  const i8 = lines.findIndex((l) => /^\s*8\.\s+No se entregar/i.test(l));
  let ini = -1;
  if (i8 >= 0) { const q1 = lines.findIndex((l, i) => i > i8 && /^\s*1\.\s/.test(l)); if (q1 > i8) ini = q1 - 1; }
  if (ini < 0) ini = lines.findIndex((l) => /PROHIBIDA LA REPRODUCCI/i.test(l));
  if (ini >= 0) lines = lines.slice(ini + 1);
  const out = [];
  for (let l of lines) {
    l = l.replace(/\f/g, '').replace(/\u00a0/g, ' ').replace(/\u00ad/g, '');
    if (/^\s*-\s*\d+\s*-\s*$/.test(l)) continue;                         // "-12-" (nº de página)
    l = l.replace(/\(--MEDICINA-\d--\d+\/\d+\)/g, '');                    // "(--MEDICINA-0--7/36)" (marca de impresión)
    if (/^\s*MEDICINA\s+20\d\d\s*$/.test(l)) continue;                    // cabecera
    if (/^\s*PROHIBIDA LA REPRODUCCI/i.test(l)) continue;
    if (/^\s*MEDICINA\s*-\s*VERSI[ÓO]N:\s*\d\s*$/i.test(l)) continue;
    out.push(l);
  }
  return out.join('\n')
    // "Pregunta asociada a la imagen 1." (2022-2025): el "1." del marcador colisionaría con la opción 1.
    // Se protege el punto con U+2024 (ONE DOT LEADER) y normalizar() lo restaura.
    .replace(/(a la imagen\s*\d+)\./gi, '$1\u2024');
}

/** Une líneas y deshace la partición silábica ("ate-\nrosclerosis" → "aterosclerosis"). */
function normalizar(s) {
  return s
    .replace(/\u2024/g, '.')                   // restaura el punto protegido en limpiarTexto()
    .replace(/(\p{L})-\n(\p{Ll})/gu, '$1$2')  // guion de partición + minúscula → une sin guion
    .replace(/-\n(?=\S)/g, '-')                // guion real (sigue mayúscula/dígito) → conserva el guion
    .replace(/\s*\n\s*/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

// Marcado de imagen según año: 2022-2023 "Pregunta asociada a la imagen N."; 2024-2026 "(IMAGEN N)" / "(IMÁGENES 5a y 5b)".
const IMG_RE = /(?:pregunta (?:asociada|vinculada) a la imagen\s*(?:n[ºo°.]?\s*)?(\d+[a-z]?)|\bIM[AÁ]GEN(?:ES)?\s+(?:n[ºo°.]?\s*)?(\d+[a-z]?))/iu;
function detectarImagen(enunciado) {
  const m = IMG_RE.exec(enunciado);
  if (!m) return { imagen: false, imagen_num: null };
  return { imagen: true, imagen_num: m[1] || m[2] };
}

/** Busca el token "n." precedido de inicio/espacio y seguido de espacio, a partir de `from`. Devuelve índice del número o -1. */
function buscarToken(texto, n, from) {
  // lookbehind: el espacio previo NO se consume, así una búsqueda que empiece justo en el dígito lo encuentra
  const re = new RegExp('(?<=^|\\s)' + n + '\\.(?=\\s)', 'g');
  re.lastIndex = from;
  const m = re.exec(texto);
  return m ? m.index : -1;
}

function parsearCuaderno(texto, anio) {
  const preguntas = [];
  const errores = [];
  let pos = 0;
  for (let n = 1; n <= N_PREGUNTAS; n++) {
    const qi = buscarToken(texto, n, pos);
    if (qi < 0) { errores.push({ anio, numero: n, motivo: 'no se encontró el inicio de la pregunta (token "' + n + '.")', desde: texto.slice(pos, pos + 160) }); break; }
    const lenQ = String(n).length + 1;
    const o = [];
    let cursor = qi + lenQ;
    let ok = true;
    for (let k = 1; k <= 4; k++) {
      const oi = buscarToken(texto, k, cursor);
      if (oi < 0) { errores.push({ anio, numero: n, motivo: `no se encontró la opción ${k}`, fragmento: texto.slice(qi, qi + 400) }); ok = false; break; }
      o.push(oi); cursor = oi + 2;
    }
    if (!ok) break;
    let fin = n < N_PREGUNTAS ? buscarToken(texto, n + 1, cursor) : texto.length;
    if (fin < 0) { errores.push({ anio, numero: n + 1, motivo: 'no se encontró el inicio de la pregunta siguiente', fragmento: texto.slice(cursor, cursor + 300) }); fin = texto.length; }
    const enunciado = normalizar(texto.slice(qi + lenQ, o[0]));
    const opciones = [
      normalizar(texto.slice(o[0] + 2, o[1])),
      normalizar(texto.slice(o[1] + 2, o[2])),
      normalizar(texto.slice(o[2] + 2, o[3])),
      normalizar(texto.slice(o[3] + 2, fin)),
    ];
    const avisos = [];
    if (enunciado.length < 15) avisos.push('enunciado muy corto');
    if (opciones.some((x) => !x)) avisos.push('opción vacía');
    if (opciones.some((x) => x.length > 500)) avisos.push('opción > 500 caracteres (posible arrastre de texto)');
    if (/(^|\s)[1-4]\.\s+[A-ZÁÉÍÓÚÑ¿]/.test(enunciado.replace(/a la imagen\s*\d+\./i, ''))) avisos.push('el enunciado contiene "k. Xxx" (posible opción absorbida)');
    if (opciones.some((x) => /[¿?]/.test(x) || /:$/.test(x))) avisos.push('una opción contiene "¿?" o termina en ":" (posible corte en el sitio equivocado)');
    if (avisos.length) errores.push({ anio, numero: n, motivo: 'revisar: ' + avisos.join(' · '), enunciado: enunciado.slice(0, 200), opciones });
    const img = detectarImagen(enunciado);
    preguntas.push({
      id: `${anio}-${String(n).padStart(3, '0')}`,
      numero: n,
      enunciado,
      opciones,
      clave: null,
      imagen: img.imagen,
      anulada: false,
      imagen_num: img.imagen_num,
      reserva: n > 200,
    });
    pos = fin;
    if (n === N_PREGUNTAS) {
      const cola = normalizar(texto.slice(fin));
      if (cola.length > 40) errores.push({ anio, numero: null, motivo: 'texto sobrante tras la pregunta 210 (no se usa)', fragmento: cola.slice(0, 200) });
    }
  }
  return { preguntas, errores };
}

/** hoja FSE → Map(numero → clave|null) */
function leerPlantilla(anio) {
  const p = path.join(RAW_DIR, `${anio}_plantilla_definitiva_v0.json`);
  if (!fs.existsSync(p)) return null;
  const hoja = JSON.parse(fs.readFileSync(p, 'utf8'));
  const mapa = new Map();
  for (const row of hoja) {
    for (let k = 0; k < 5; k++) {
      if (!(('V_' + k) in row)) continue;
      const num = parseInt(String(row['V_' + k]).trim(), 10);
      const rc = String(row['RC_' + k] == null ? '' : row['RC_' + k]).trim();
      if (!Number.isFinite(num)) continue;
      mapa.set(num, /^[1-4]$/.test(rc) ? parseInt(rc, 10) : null);
    }
  }
  return mapa;
}

function parsear() {
  const bin = pdftotextBin();
  const erroresTodos = [];
  const stats = leerJSON(STATS, { generado: null, anios: {} });
  for (const anio of aniosSeleccionados()) {
    const pdf = path.join(RAW_DIR, `${anio}_cuadernillo.pdf`);
    if (!fs.existsSync(pdf)) { console.warn(`⚠ ${anio}: falta ${path.relative(ROOT, pdf)} (ejecuta --descargar)`); erroresTodos.push({ anio, numero: null, motivo: 'falta el cuaderno PDF' }); continue; }
    const txt = path.join(RAW_DIR, `${anio}_cuadernillo.txt`);
    // -raw (orden del content stream): en estos cuadernos a dos columnas devuelve columna izquierda y
    // luego derecha, con la secuencia 1→210 monótona (comprobado 2022-2026). El modo por defecto mezcla
    // líneas de ambas columnas ("...clozapina. 96. Sobre los factores...") y rompe el parseo.
    const r = spawnSync(bin, ['-enc', 'UTF-8', '-raw', pdf, txt], { encoding: 'utf8' });
    if (r.status !== 0) { console.error(`✗ ${anio}: pdftotext falló: ${r.stderr}`); erroresTodos.push({ anio, numero: null, motivo: 'pdftotext falló: ' + r.stderr }); continue; }
    const raw = fs.readFileSync(txt, 'utf8');
    const texto = limpiarTexto(raw);
    const { preguntas, errores } = parsearCuaderno(texto, anio);

    const plantilla = leerPlantilla(anio);
    let conClave = 0, anuladas = 0, sinPlantilla = 0;
    if (!plantilla) { errores.push({ anio, numero: null, motivo: 'falta raw/' + anio + '_plantilla_definitiva_v0.json: claves en null (ejecuta --descargar)' }); }
    for (const p of preguntas) {
      if (!plantilla) { sinPlantilla++; continue; }
      if (!plantilla.has(p.numero)) { errores.push({ anio, numero: p.numero, motivo: 'la plantilla no contiene este número' }); sinPlantilla++; continue; }
      const c = plantilla.get(p.numero);
      if (c == null) { p.anulada = true; p.clave = null; anuladas++; } else { p.clave = c; conClave++; }
    }
    if (plantilla) {
      const faltan = [...plantilla.keys()].filter((k) => !preguntas.some((p) => p.numero === k));
      if (faltan.length) errores.push({ anio, numero: null, motivo: 'números presentes en la plantilla pero no parseados del cuaderno', numeros: faltan });
      if (plantilla.size !== N_PREGUNTAS) errores.push({ anio, numero: null, motivo: `la plantilla tiene ${plantilla.size} preguntas (esperadas ${N_PREGUNTAS})` });
    }

    // Contraste con la prensa (definitiva v0): discrepancia → error 'contraste-prensa' + nota en la pregunta
    const cp = CONTRASTES_PRENSA[anio];
    if (cp && plantilla) {
      const anul = preguntas.filter((p) => p.anulada).map((p) => p.numero);
      const a1 = JSON.stringify([...anul].sort((x, y) => x - y)), a2 = JSON.stringify([...cp.anuladas].sort((x, y) => x - y));
      if (a1 !== a2) errores.push({ anio, numero: null, motivo: `contraste-prensa: anuladas según la hoja del Ministerio ${a1} ≠ según la prensa ${a2}` });
      for (const [numStr, claveP] of Object.entries(cp.cambios)) {
        const num = parseInt(numStr, 10);
        const p = preguntas.find((x) => x.numero === num);
        if (!p) continue;
        if (p.clave !== claveP) {
          p.nota = `clave A VERIFICAR (12-sep-2026): la hoja de respuestas del Ministerio (API FSE) da ${p.clave == null ? 'anulada' : p.clave}; la prensa que reseñó la plantilla definitiva dice ${claveP}. Ver CONTRASTES_PRENSA en gen_mir_pool.js.`;
          errores.push({ anio, numero: num, motivo: `contraste-prensa: la hoja del Ministerio da clave ${p.clave == null ? 'anulada' : p.clave}; la prensa (plantilla definitiva) dice ${claveP}`, enunciado: p.enunciado.slice(0, 200), opciones: p.opciones });
        }
      }
    }

    // Validaciones duras
    const nums = new Set(preguntas.map((p) => p.numero));
    if (nums.size !== preguntas.length) errores.push({ anio, numero: null, motivo: 'números de pregunta repetidos' });
    for (const p of preguntas) {
      if (p.opciones.length !== 4) errores.push({ anio, numero: p.numero, motivo: 'no tiene 4 opciones' });
      if (!p.enunciado) errores.push({ anio, numero: p.numero, motivo: 'enunciado vacío' });
      if (p.clave != null && !(p.clave >= 1 && p.clave <= 4)) errores.push({ anio, numero: p.numero, motivo: 'clave fuera de 1-4: ' + p.clave });
    }

    // Salida (solo los campos del contrato + imagen_num/reserva como extra)
    const salida = preguntas.map((p) => ({ id: p.id, numero: p.numero, enunciado: p.enunciado, opciones: p.opciones, clave: p.clave, imagen: p.imagen, anulada: p.anulada, imagen_num: p.imagen_num, reserva: p.reserva, ...(p.nota ? { nota: p.nota } : {}) }));
    escribirJSON(path.join(POOL_DIR, `${anio}.json`), salida);

    const dist = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const p of preguntas) if (p.clave) dist[p.clave]++;
    const st = {
      pruebas_selectivas: anio - 1,
      preguntas_parseadas: preguntas.length,
      esperadas: N_PREGUNTAS,
      con_clave: conClave,
      anuladas,
      anuladas_numeros: preguntas.filter((p) => p.anulada).map((p) => p.numero),
      sin_plantilla: sinPlantilla,
      con_imagen: preguntas.filter((p) => p.imagen).length,
      reserva: preguntas.filter((p) => p.reserva).length,
      distribucion_claves: dist,
      long_media_enunciado: preguntas.length ? Math.round(preguntas.reduce((a, p) => a + p.enunciado.length, 0) / preguntas.length) : 0,
      errores: errores.filter((e) => !/^(revisar|contraste-prensa)/.test(String(e.motivo))).length,
      avisos_revisar: errores.filter((e) => String(e.motivo).startsWith('revisar')).length,
      contrastes_prensa_discrepantes: errores.filter((e) => String(e.motivo).startsWith('contraste-prensa')).length,
      sha256_cuadernillo: sha256File(pdf),
      parseado: hoyISO(),
    };
    stats.anios[String(anio)] = st;
    erroresTodos.push(...errores);
    console.log(`${anio}: ${st.preguntas_parseadas}/${N_PREGUNTAS} preguntas · clave=${st.con_clave} · anuladas=${st.anuladas} ${JSON.stringify(st.anuladas_numeros)} · imagen=${st.con_imagen} · errores=${st.errores} · revisar=${st.avisos_revisar}`);
  }
  stats.generado = hoyISO();
  escribirJSON(STATS, stats);
  escribirJSON(ERRORES, { generado: hoyISO(), nota: 'Lo que el parser no pudo resolver o pide revisión manual. Nunca se rellena a mano en el JSON del año sin contrastar con el PDF oficial.', total: erroresTodos.length, errores: erroresTodos });
  console.log(`\n_stats.json y _parse_errores.json (${erroresTodos.length} entradas) → ${path.relative(ROOT, POOL_DIR)}`);
}

// ───────────────────────────── --stats ─────────────────────────────
function imprimirStats() {
  const stats = leerJSON(STATS, null);
  if (!stats) { console.error('No existe _stats.json (ejecuta --parse)'); process.exit(1); }
  const filas = ['| MIR | Pruebas | Parseadas | Con clave | Anuladas | Imagen | Reserva | Claves 1/2/3/4 | Errores | Revisar |', '|---|---|---|---|---|---|---|---|---|---|'];
  let tot = { p: 0, c: 0, a: 0, i: 0 };
  for (const [anio, s] of Object.entries(stats.anios).sort()) {
    const d = s.distribucion_claves;
    filas.push(`| ${anio} | ${s.pruebas_selectivas} | ${s.preguntas_parseadas}/${s.esperadas} | ${s.con_clave} | ${s.anuladas} (${s.anuladas_numeros.join(', ') || '—'}) | ${s.con_imagen} | ${s.reserva} | ${d[1]}/${d[2]}/${d[3]}/${d[4]} | ${s.errores} | ${s.avisos_revisar} |`);
    tot.p += s.preguntas_parseadas; tot.c += s.con_clave; tot.a += s.anuladas; tot.i += s.con_imagen;
  }
  filas.push(`| **Total** | | **${tot.p}** | **${tot.c}** | **${tot.a}** | **${tot.i}** | | | | |`);
  console.log(filas.join('\n'));
}

// ═════════════════════════════ PASO 2 · clasificación (LLM) ═════════════════════════════
/**
 * Códigos de asignatura de las etiquetas LLM → num real de mirTemarioData.ts (30 asignaturas ProMIR).
 * 'OTR' (num 0) = pregunta sin asignatura ProMIR (fisiología/bioquímica/anatomía básicas, cirugía plástica,
 * rehabilitación…): se conserva en el pool con capId null y fueraDePlan:true; NUNCA se le inventa un capítulo.
 */
const CODIGOS_ASIG = {
  ALE: 1, ANE: 2, CAR: 3, PAL: 4, DER: 5, END: 6, INF: 7, EPI: 8, EST: 9, FAR: 10, GAS: 11, GEN: 12, GER: 13, GIN: 14, HEM: 15,
  INM: 16, LEG: 17, NEF: 18, NEU: 19, NRL: 20, OFT: 21, ONC: 22, ORL: 23, PED: 24, GES: 25, PSQ: 26, RXU: 27, REU: 28, TRA: 29, URO: 30,
  OTR: 0,
};
const ASIG_OTRAS = 'Otras · sin asignatura ProMIR';
const CONFIANZA = { a: 'alta', m: 'media', b: 'baja', p: 'pendiente' };
const CLAS_DIR = path.join(POOL_DIR, '_clasificacion_llm');
const CLAS_STATS = path.join(POOL_DIR, '_clasificacion_stats.json');
const MUESTRA_2P = path.join(CLAS_DIR, '_muestra_2pasada.json');
const TEMARIO_TS = path.join(ROOT, 'src', 'lib', 'mirTemarioData.ts');
const PLAN_TS = path.join(ROOT, 'src', 'lib', 'mirDailyPlan.ts');
const OUT_TS = path.join(ROOT, 'src', 'lib', 'mirPreguntasOficiales.ts');
const FECHA_CLAS = '13-sep-2026';
/**
 * Resultado de la 2ª pasada ANTES de corregir etiquetas (registro histórico, no se recalcula): la comparación original
 * del 13-sep-2026 dio 100 % de acuerdo en asignatura y 99,0 % en capítulo (101/102); el único desacuerdo (2025-103,
 * disección de aorta proximal: 1ª pasada CAR.5 → 2ª pasada CAR.13) se corrigió en _clasificacion_llm/2025.json a favor
 * de la 2ª pasada, por lo que --verificar devuelve 100/100 desde entonces. Poner null si se rehace la muestra.
 */
const VERIF_ORIGINAL = { fecha: '2026-09-13', acuerdoAsignaturaPct: 100, acuerdoCapIdPct: 99.0, capIdEvaluables: 102, corregidas: ['2025-103: CAR.5.m → CAR.13.m'] };

/**
 * Contraste externo (anti-alucinación) para la clasificación: desglose por asignatura que publicó ConSalud
 * citando a Academia CTO (200 preguntas, sin reserva). Leído con WebFetch el 13-sep-2026:
 *  2026 https://www.consalud.es/formacion/mir/desglose-por-asignaturas-del-examen-mir-de-2026-digestivo-y-pediatria-entran-en-el-top.html
 *  2025 https://www.consalud.es/formacion/mir/mir-2025-estas-son-preguntas-han-caido-por-cada-asignatura-en-examen_153897_102.html
 * Las categorías de CTO no son las de ProMIR: se agrupan con CTO_A_PROMIR antes de comparar.
 */
const CONTRASTE_CTO = {
  2026: { Cardiología: 18, Digestivo: 17, Pediatría: 11, Epidemiología: 10, Neurología: 10, Reumatología: 9, Ginecología: 9, Neumología: 9, Bioética: 8, Infecciosas: 8, 'Cirugía General': 7, Endocrino: 7, Hematología: 7, Nefrología: 7, Psiquiatría: 7, Dermatología: 6, Geriatría: 6, Urología: 6, Oncología: 5, Traumatología: 5, Oftalmología: 4, Otorrino: 4, Genética: 3, Urgencias: 3, 'Angiología y Cirugía Vascular': 2, 'Cirugía Plástica': 2, 'Medicina Familiar': 2, Farmacología: 2, Fisiología: 2, Inmunología: 2, Neurocirugía: 2, Anestesia: 2, 'Anatomía Patológica': 1, Anatomía: 1, Bioquímica: 1, 'Cirugía Cardiaca': 1, 'Cirugía Torácica': 1, 'Cirugía Maxilofacial': 1, Rehabilitación: 1, Alergología: 1 },
  2025: { Cardiología: 16, Neurología: 15, 'Cirugía General': 13, Infecciosas: 13, Endocrino: 12, Reumatología: 11, Traumatología: 11, Ginecología: 9, Digestivo: 8, Pediatría: 8, Psiquiatría: 8, Hematología: 7, Nefrología: 7, Neumología: 7, Otorrino: 7, Bioética: 6, Epidemiología: 6, Oncología: 6, Urología: 6, Oftalmología: 5, Urgencias: 5, Dermatología: 4, 'Anatomía Patológica': 3, Anestesia: 3, Geriatría: 3, Inmunología: 3, Alergología: 2, Fisiología: 2, Bioquímica: 1, Farmacología: 1, Genética: 1, 'Medicina Familiar': 1 },
};
/** categoría CTO → grupo comparable (num ProMIR o 'OTR'); las categorías básicas van al grupo OTR/varios. */
const CTO_A_PROMIR = {
  Cardiología: 3, 'Cirugía Cardiaca': 3, 'Angiología y Cirugía Vascular': 3,
  Digestivo: 11, 'Cirugía General': 11,
  Pediatría: 24, Epidemiología: 8, Neurología: 20, Neurocirugía: 20, Reumatología: 28, Ginecología: 14, Neumología: 19, 'Cirugía Torácica': 19,
  Bioética: 17, Infecciosas: 7, Endocrino: 6, Hematología: 15, Nefrología: 18, Psiquiatría: 26, Dermatología: 5, Geriatría: 13, Urología: 30,
  Oncología: 22, Traumatología: 29, Oftalmología: 21, Otorrino: 23, 'Cirugía Maxilofacial': 23, Genética: 12, Urgencias: 27, Farmacología: 10,
  Inmunología: 16, Anestesia: 2, Alergología: 1,
  'Cirugía Plástica': 'OTR', 'Medicina Familiar': 'OTR', Fisiología: 'OTR', 'Anatomía Patológica': 'OTR', Anatomía: 'OTR', Bioquímica: 'OTR', Rehabilitación: 'OTR',
};

/** Lee el temario real desde el .ts (sin compilar): [{num, name, chapters:[{n, titulo, capId}]}]. */
function leerTemario() {
  const src = fs.readFileSync(TEMARIO_TS, 'utf8');
  const out = [];
  const asigRe = /\{ num: (\d+), name: '([^']+)', subjectId: '([0-9a-f]+)', rentColor: '(\w+)'(?:, priorityKey: '(\w+)')?(?:, detalle: '(\w+)')?, chapters: \[([\s\S]*?)\] \},/g;
  let m;
  while ((m = asigRe.exec(src))) {
    const caps = []; const capRe = /\{ n: (\d+), titulo: '((?:[^'\\]|\\.)*)', capId: '([0-9a-f]+)' \}/g; let c;
    while ((c = capRe.exec(m[7]))) caps.push({ n: +c[1], titulo: c[2].replace(/\\'/g, "'"), capId: c[3] });
    out.push({ num: +m[1], name: m[2], chapters: caps });
  }
  if (out.length !== 30) throw new Error('mirTemarioData.ts: esperaba 30 asignaturas, leídas ' + out.length);
  return out;
}
/** Lee del plan (mirDailyPlan.ts) los capIds de los 76 temas y los num de las 14 asignaturas. */
function leerPlan() {
  const src = fs.readFileSync(PLAN_TS, 'utf8');
  const re = /\{d:(\d+),fecha:"([^"]+)",asignatura:"([^"]+)",num:(\d+),rent:"\w+",tema:"(?:[^"\\]|\\.)*",capId:"([0-9a-f]+)"/g;
  const capIds = new Set(); const nums = new Set(); let m;
  while ((m = re.exec(src))) { const d = +m[1], num = +m[4]; if (num > 0) { nums.add(num); if (d <= 76) capIds.add(m[5]); } }
  if (capIds.size !== 76 || nums.size !== 14) throw new Error(`mirDailyPlan.ts: esperaba 76 capIds/14 asignaturas, leídos ${capIds.size}/${nums.size}`);
  return { capIds, nums };
}
function leerEtiquetas(anio) {
  const p = path.join(CLAS_DIR, `${anio}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
/** Resuelve una etiqueta 'ASIG.cap.conf' contra el temario real. Devuelve {num, asignatura, capN, capId, capitulo, confianza} o lanza. */
function resolverEtiqueta(etq, temario) {
  const [cod, capStr, conf] = String(etq).split('.');
  if (!(cod in CODIGOS_ASIG)) throw new Error('código de asignatura desconocido: ' + etq);
  if (!(conf in CONFIANZA)) throw new Error('confianza desconocida: ' + etq);
  const num = CODIGOS_ASIG[cod];
  if (num === 0) return { num: 0, asignatura: ASIG_OTRAS, capN: null, capId: null, capitulo: null, confianza: CONFIANZA[conf] };
  const asig = temario.find((a) => a.num === num);
  if (capStr === 'x') return { num, asignatura: asig.name, capN: null, capId: null, capitulo: null, confianza: CONFIANZA[conf] };
  const capN = parseInt(capStr, 10);
  const cap = asig.chapters.find((c) => c.n === capN);
  if (!cap || capN === 0) throw new Error(`capítulo ${capN} inexistente en ${asig.name} (${etq})`);
  return { num, asignatura: asig.name, capN, capId: cap.capId, capitulo: cap.titulo, confianza: CONFIANZA[conf] };
}
/** Muestra determinista del 10 % (LCG con semilla fija) para la 2ª pasada de verificación. */
function muestraIds(ids, fraccion = 0.10, semilla = 20260913) {
  let s = semilla >>> 0; const rnd = () => { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s / 4294967296; };
  const arr = ids.slice();
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr.slice(0, Math.round(ids.length * fraccion)).sort();
}

// ───────────────────────────── --clasificar ─────────────────────────────
/** Cruza las etiquetas LLM (_clasificacion_llm/AAAA.json) con el pool parseado → AAAA_clasificado.json + _clasificacion_stats.json */
function clasificar() {
  const temario = leerTemario();
  const plan = leerPlan();
  const stats = leerJSON(CLAS_STATS, { generado: null, metodo: null, anios: {}, verificacion: null });
  stats.metodo = `Pase LLM (Claude, ${FECHA_CLAS}) sobre enunciado + 4 opciones de cada pregunta → una asignatura de mirTemarioData.ts (30 de ProMIR; 'OTR' si no hay asignatura ProMIR) y, cuando el enunciado lo permite, el capítulo real (capId). Etiquetas en DATA/MIR/pool/_clasificacion_llm/AAAA.json ('ASIG.cap.confianza'); confianza alta = capítulo evidente · media = asignatura clara, capítulo por mejor ajuste · baja = asignatura discutible · pendiente = sin clasificar. fueraDePlan = la asignatura no está entre las 14 del plan; enPlan = el capId es uno de los 76 del plan.`;
  let totalGlobal = 0; const errores = [];
  for (const anio of aniosSeleccionados()) {
    const pool = leerJSON(path.join(POOL_DIR, `${anio}.json`), null);
    if (!pool) { console.warn(`⚠ ${anio}: falta ${anio}.json (ejecuta --parse)`); continue; }
    const etq = leerEtiquetas(anio) || {};
    const salida = [];
    const porAsig = {}; const porConf = { alta: 0, media: 0, baja: 0, pendiente: 0 };
    let enPlan = 0, fueraDePlan = 0, sinCap = 0;
    for (const q of pool) {
      const e = etq[String(q.numero)];
      let r;
      if (!e) { r = { num: -1, asignatura: 'SIN CLASIFICAR', capN: null, capId: null, capitulo: null, confianza: 'pendiente' }; }
      else { try { r = resolverEtiqueta(e, temario); } catch (err) { errores.push({ anio, numero: q.numero, motivo: err.message }); r = { num: -1, asignatura: 'SIN CLASIFICAR', capN: null, capId: null, capitulo: null, confianza: 'pendiente' }; } }
      const fp = r.num < 0 ? null : !plan.nums.has(r.num);
      const ep = !!(r.capId && plan.capIds.has(r.capId));
      const rec = {
        id: q.id, anio, numero: q.numero, reserva: !!q.reserva,
        enunciado: q.enunciado, opciones: q.opciones, clave: q.clave, anulada: !!q.anulada, imagen: !!q.imagen, imagen_num: q.imagen_num ?? null,
        ...(q.nota ? { nota: q.nota } : {}),
        num: r.num, asignatura: r.asignatura, capN: r.capN, capId: r.capId, capitulo: r.capitulo,
        fueraDePlan: fp, enPlan: ep, confianza: r.confianza, etiqueta: e || null,
      };
      salida.push(rec);
      porAsig[r.asignatura] = (porAsig[r.asignatura] || 0) + 1;
      porConf[r.confianza]++;
      if (ep) enPlan++; if (fp) fueraDePlan++; if (!r.capId) sinCap++;
    }
    escribirJSON(path.join(POOL_DIR, `${anio}_clasificado.json`), salida);
    // contraste con CTO (solo 1-200, sin reserva)
    const cto = CONTRASTE_CTO[anio];
    let contraste = null;
    if (cto) {
      const grupoCTO = {}; for (const [cat, n] of Object.entries(cto)) { const g = CTO_A_PROMIR[cat]; if (g === undefined) throw new Error('categoría CTO sin mapa: ' + cat); grupoCTO[g] = (grupoCTO[g] || 0) + n; }
      const grupoLLM = {}; for (const r of salida) { if (r.reserva) continue; const g = r.num === 0 ? 'OTR' : r.num; grupoLLM[g] = (grupoLLM[g] || 0) + 1; }
      // EPI+EST+GES se comparan juntos con 'Epidemiología'+'Medicina Familiar' de CTO (CTO no separa gestión/estadística)
      const nombre = (g) => (g === 'OTR' ? 'Otras/básicas' : temario.find((a) => a.num === +g).name);
      const filas = [];
      const grupos = new Set([...Object.keys(grupoCTO), ...Object.keys(grupoLLM)]);
      for (const g of grupos) {
        const a = grupoLLM[g] || 0, b = grupoCTO[g] || 0;
        filas.push({ grupo: nombre(g), llm: a, cto: b, delta: a - b });
      }
      filas.sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta));
      contraste = { fuente: 'ConSalud citando Academia CTO (200 Q, sin reserva) · WebFetch 13-sep-2026', desviacionesGrandes: filas.filter((f) => Math.abs(f.delta) >= 3), filas };
    }
    stats.anios[String(anio)] = {
      preguntas: salida.length, sinClasificar: porConf.pendiente, porConfianza: porConf, enPlanCapId: enPlan, fueraDePlanAsignatura: fueraDePlan, sinCapitulo: sinCap,
      porAsignatura: Object.fromEntries(Object.entries(porAsig).sort((x, y) => y[1] - x[1])),
      contrasteCTO: contraste,
      clasificado: hoyISO(),
    };
    totalGlobal += salida.length;
    console.log(`${anio}: ${salida.length} clasificadas · alta ${porConf.alta} · media ${porConf.media} · baja ${porConf.baja} · pendiente ${porConf.pendiente} · enPlan(capId) ${enPlan} · fueraDePlan(asig) ${fueraDePlan} · sin capítulo ${sinCap}`);
    if (contraste) console.log(`   contraste CTO (|Δ|≥3): ${contraste.desviacionesGrandes.map((f) => `${f.grupo} ${f.llm} vs ${f.cto} (${f.delta > 0 ? '+' : ''}${f.delta})`).join(' · ') || 'ninguna'}`);
  }
  // muestra del 10 % para la 2ª pasada (ids deterministas)
  const todos = []; for (const a of ANIOS_MIR) { const c = leerJSON(path.join(POOL_DIR, `${a}_clasificado.json`), []); for (const r of c) todos.push(r.id); }
  const muestra = muestraIds(todos);
  stats.muestra2Pasada = { n: muestra.length, semilla: 20260913, ids: muestra, fichero: path.relative(ROOT, MUESTRA_2P) };
  if (!fs.existsSync(MUESTRA_2P)) {
    // plantilla vacía para la 2ª pasada + fichero de lectura con enunciado ÍNTEGRO (sin la etiqueta de la 1ª pasada)
    const txt = [];
    for (const id of muestra) { const [a] = id.split('-'); const r = leerJSON(path.join(POOL_DIR, `${a}_clasificado.json`), []).find((x) => x.id === id); txt.push(`${id}${r.imagen ? ' #' : ''} | ${r.enunciado} || ${r.opciones.join(' ; ')}`); }
    fs.writeFileSync(path.join(CLAS_DIR, '_muestra_2pasada_lectura.txt'), txt.join('\n'), 'utf8');
    console.log(`\nMuestra 2ª pasada: ${muestra.length} ids → ${path.relative(ROOT, path.join(CLAS_DIR, '_muestra_2pasada_lectura.txt'))} (clasificar a ciegas y guardar en ${path.relative(ROOT, MUESTRA_2P)} como {id: 'ASIG.cap.conf'}; luego --verificar)`);
  }
  stats.total = totalGlobal; stats.generado = hoyISO();
  if (errores.length) { stats.errores = errores; console.error('✗ etiquetas inválidas:', JSON.stringify(errores)); }
  escribirJSON(CLAS_STATS, stats);
  console.log(`\n_clasificacion_stats.json → ${path.relative(ROOT, CLAS_STATS)} · total ${totalGlobal}`);
  if (errores.length) process.exit(1);
}

// ───────────────────────────── --verificar ─────────────────────────────
/** Compara la 2ª pasada (_muestra_2pasada.json) con la clasificación y guarda el % de acuerdo en _clasificacion_stats.json */
function verificar() {
  const temario = leerTemario();
  const stats = leerJSON(CLAS_STATS, null); if (!stats) throw new Error('falta _clasificacion_stats.json (ejecuta --clasificar)');
  const seg = leerJSON(MUESTRA_2P, null); if (!seg) throw new Error('falta ' + MUESTRA_2P);
  const ids = stats.muestra2Pasada.ids;
  let n = 0, okAsig = 0, okCap = 0, okCapEval = 0; const desacuerdos = [];
  for (const id of ids) {
    const [a] = id.split('-');
    const r = leerJSON(path.join(POOL_DIR, `${a}_clasificado.json`), []).find((x) => x.id === id);
    const e2 = seg[id]; if (!r || !e2) { desacuerdos.push({ id, motivo: 'sin 2ª pasada' }); continue; }
    const r2 = resolverEtiqueta(e2, temario); n++;
    const mismaAsig = r2.num === r.num; if (mismaAsig) okAsig++;
    if (r.capId && r2.capId) { okCapEval++; if (r.capId === r2.capId) okCap++; }
    if (!mismaAsig || (r.capId && r2.capId && r.capId !== r2.capId)) desacuerdos.push({ id, primera: `${r.asignatura} · ${r.capitulo || '—'} (${r.etiqueta})`, segunda: `${r2.asignatura} · ${r2.capitulo || '—'} (${e2})` });
  }
  const pctAsig = n ? Math.round((okAsig / n) * 1000) / 10 : 0;
  const pctCap = okCapEval ? Math.round((okCap / okCapEval) * 1000) / 10 : 0;
  stats.verificacion = { fecha: hoyISO(), n, acuerdoAsignaturaPct: pctAsig, acuerdoCapIdPct: pctCap, capIdEvaluables: okCapEval, desacuerdos, nota: '2ª pasada realizada por el mismo LLM en un paso separado y a ciegas (fichero de lectura sin la etiqueta de la 1ª pasada); NO es un evaluador humano independiente.' };
  escribirJSON(CLAS_STATS, stats);
  console.log(`Verificación 2ª pasada: n=${n} · acuerdo asignatura ${pctAsig} % · acuerdo capId ${pctCap} % (sobre ${okCapEval} con capítulo en ambas) · desacuerdos ${desacuerdos.length}`);
  for (const d of desacuerdos) console.log('  ', d.id, '|', d.primera || d.motivo, '→', d.segunda || '');
}

// ───────────────────────────── --emit ─────────────────────────────
/** Genera src/lib/mirPreguntasOficiales.ts desde los AAAA_clasificado.json (interfaz + helpers que la UI ya consume). */
function emitir() {
  const temario = leerTemario();
  const plan = leerPlan();
  const stats = leerJSON(CLAS_STATS, null); if (!stats) throw new Error('falta _clasificacion_stats.json (ejecuta --clasificar)');
  const fuentes = leerJSON(FUENTES, { convocatorias: {} });
  const todas = [];
  for (const anio of ANIOS_MIR) {
    const c = leerJSON(path.join(POOL_DIR, `${anio}_clasificado.json`), null);
    if (!c) throw new Error(`falta ${anio}_clasificado.json (ejecuta --clasificar)`);
    const conv = (fuentes.convocatorias || {})[String(anio)] || {};
    const fich = (conv.ficheros || []).find((f) => f.tipo === 'cuadernillo_v0') || {};
    const url = fich.url || FSE_PORTAL;
    for (const r of c) todas.push({
      id: r.id, anio: r.anio, numero: r.numero, reserva: r.reserva,
      num: r.num, asignatura: r.asignatura, capId: r.capId, capitulo: r.capitulo,
      imagen: r.imagen, imagenNum: r.imagen_num, anulada: r.anulada, fueraDePlan: r.fueraDePlan, enPlan: r.enPlan, confianza: r.confianza,
      enunciado: r.enunciado, opciones: r.opciones, clave: r.clave, ...(r.nota ? { nota: r.nota } : {}),
      fuente: 'Ministerio-FSE', url,
    });
  }
  const tot = todas.length, conClave = todas.filter((q) => q.clave != null).length, anul = todas.filter((q) => q.anulada).length, img = todas.filter((q) => q.imagen).length;
  const porConf = { alta: 0, media: 0, baja: 0, pendiente: 0 }; for (const q of todas) porConf[q.confianza]++;
  const sinClas = porConf.pendiente;
  const v = stats.verificacion;
  const verifTxt = v ? `muestra verificada ${v.acuerdoAsignaturaPct} % asignatura / ${v.acuerdoCapIdPct} % capítulo (n=${v.n}${VERIF_ORIGINAL ? `; ${VERIF_ORIGINAL.acuerdoCapIdPct} % capítulo antes de corregir ${VERIF_ORIGINAL.corregidas.length} etiqueta` : ''})` : 'muestra verificada PENDIENTE';
  const estado = `v1 · ${FECHA_CLAS} · ${tot} preguntas · clasificación LLM con ${verifTxt}`;
  const capIdsPlanConQ = new Set(todas.filter((q) => q.enPlan).map((q) => q.capId));
  const capsPlanSinQ = [...plan.capIds].filter((c) => !capIdsPlanConQ.has(c)).map((c) => { for (const a of temario) { const ch = a.chapters.find((x) => x.capId === c); if (ch) return `${a.name} · ${ch.titulo}`; } return c; });
  const contrastes = Object.fromEntries(Object.entries(stats.anios).filter(([, s]) => s.contrasteCTO).map(([a, s]) => [a, s.contrasteCTO.desviacionesGrandes.map((f) => `${f.grupo} LLM ${f.llm} vs CTO ${f.cto}`)]));
  const rowTS = (q) => JSON.stringify(q);
  const out = `/**
 * mirPreguntasOficiales.ts — POOL OFICIAL de preguntas MIR (Ministerio de Sanidad) clasificadas por asignatura/capítulo ProMIR.
 * GENERADO por DATA/_scripts/gen_mir_pool.js --emit (${FECHA_CLAS}) — NO editar a mano.
 *
 * Pipeline (DATA/MIR/pool/README.md · DATA/MIR/POOL_USO.md):
 *   --descargar → cuadernos v0 + hojas de respuestas DEFINITIVAS del portal FSE (token anónimo) → --parse → AAAA.json
 *   → --clasificar (etiquetas LLM en _clasificacion_llm/AAAA.json, contraste con CTO/ConSalud) → AAAA_clasificado.json
 *   → --verificar (2ª pasada a ciegas sobre el 10 %) → --emit (este fichero).
 * Palmerton "questions as the curriculum": pre-test 5Q, anclas, quiz 8-10Q, cierre 10Q, mini-MIR 40Q y el banqueo ene-mar
 * consumen preguntasSinUsar(capId, mirUsadasIds()) / preguntasSinUsarDeAsignatura(); el log guarda los qIds (anti-repetición).
 *
 * Reglas: texto oficial sin corregir (erratas incluidas) · clave DEFINITIVA (null = anulada; las anuladas NO se sirven por
 * defecto) · la 2025-208 lleva \`nota\` (clave A VERIFICAR) y tampoco se sirve por defecto · 'OTR' (num 0) = sin asignatura
 * ProMIR (fisiología/bioquímica/anatomía/plástica/rehabilitación): capId null · fueraDePlan = asignatura fuera de las 14 del
 * plan (mirDailyPlan) · enPlan = capId ∈ 76 capítulos del plan · confianza = alta/media/baja de la clasificación LLM.
 * Uso privado de estudio (cuaderno: "PROHIBIDA LA REPRODUCCIÓN TOTAL O PARCIAL"). Tamaño ≈ ${Math.round(todas.reduce((s, q) => s + rowTS(q).length, 0) / 1024)} KB.
 */
export type MirFuentePregunta = 'Ministerio-FSE' | 'ProMIR' | 'examenesmir' | 'BOE';
export type MirConfianza = 'alta' | 'media' | 'baja' | 'pendiente';

export interface MirPreguntaOficial {
  /** id canónico "AAAA-NNN" (convocatoria-nº en la versión 0), p. ej. "2025-114" */
  id: string;
  anio: number;
  numero: number;
  /** true si es de reserva (201-210) */
  reserva: boolean;
  /** asignatura ProMIR real (num 1-30 de mirTemarioData; 0 = 'Otras · sin asignatura ProMIR'; -1 = SIN CLASIFICAR) */
  num: number; asignatura: string;
  /** capId REAL de mirTemarioData (null si el enunciado no permite fijar capítulo) y su título */
  capId: string | null; capitulo: string | null;
  /** ligada al cuaderno de imágenes (nº tal como lo cita el cuaderno) → cuota 1/4 de APEX con imagen */
  imagen: boolean; imagenNum: string | null;
  /** anulada en la plantilla definitiva (clave null) */
  anulada: boolean;
  /** la asignatura NO está entre las 14 del plan (Tier C / mini-MIR); null si SIN CLASIFICAR */
  fueraDePlan: boolean | null;
  /** el capId es uno de los 76 capítulos del plan */
  enPlan: boolean;
  confianza: MirConfianza;
  enunciado: string;
  opciones: string[];
  /** 1-4 según la plantilla DEFINITIVA del Ministerio; null si anulada */
  clave: number | null;
  /** solo si hay un contraste abierto (p. ej. 2025-208) */
  nota?: string;
  fuente: MirFuentePregunta;
  /** cuaderno oficial (versión 0) del que procede */
  url: string;
  /** subtema/etiqueta de ProMIR si existe (compat) */
  tema?: string;
}

export const MIR_POOL_META = {
  estado: ${JSON.stringify(estado)},
  generado: ${JSON.stringify(hoyISO())},
  convocatorias: ${JSON.stringify(ANIOS_MIR)},
  total: ${tot}, conClave: ${conClave}, anuladas: ${anul}, conImagen: ${img}, sinClasificar: ${sinClas},
  porConfianza: ${JSON.stringify(porConf)},
  enPlanCapId: ${todas.filter((q) => q.enPlan).length}, fueraDePlanAsignatura: ${todas.filter((q) => q.fueraDePlan).length}, sinCapitulo: ${todas.filter((q) => !q.capId).length},
  /** capítulos del plan (76) sin ninguna pregunta oficial 2022-2026 en el pool */
  capitulosPlanSinPreguntas: ${JSON.stringify(capsPlanSinQ)},
  verificacion: ${JSON.stringify(v ? { n: v.n, acuerdoAsignaturaPct: v.acuerdoAsignaturaPct, acuerdoCapIdPct: v.acuerdoCapIdPct, original: VERIF_ORIGINAL, nota: v.nota } : null)},
  /** desviaciones |Δ| ≥ 3 preguntas frente al desglose de Academia CTO (ConSalud) por año, 1-200 */
  contrasteCTO: ${JSON.stringify(contrastes)},
  fuente: 'Ministerio de Sanidad · portal FSE (cuaderno versión 0 + hoja de respuestas definitiva) · DATA/MIR/pool/_fuentes.json',
  licencia: 'Uso privado de estudio. Cuaderno: "PROHIBIDA LA REPRODUCCIÓN TOTAL O PARCIAL". No redistribuir.',
  convocatoriasObjetivo: '2022–2026 (5 × 210); ampliar con MIR 2027 tras la plantilla definitiva (≈ feb-2027)',
  fuentesLibres: [
    { fuente: 'Ministerio de Sanidad · FSE', url: ${JSON.stringify(FSE_PORTAL)}, nota: 'cuadernos + hojas de respuestas oficiales (API con token anónimo)' },
    { fuente: 'examenesmir.com', url: 'https://www.examenesmir.com/examenes-mir', nota: 'espejo de los cuadernillos (sin plantillas)' },
  ],
};

export const MIR_PREGUNTAS_OFICIALES: MirPreguntaOficial[] = [
${todas.map(rowTS).join(',\n')}
];

export interface MirPoolOpts {
  /** incluir anuladas (clave null) — por defecto NO */
  incluirAnuladas?: boolean;
  /** incluir las que llevan \`nota\` de clave A VERIFICAR — por defecto NO */
  incluirDudosas?: boolean;
  /** solo con imagen (cuota 1/4 APEX con imagen) */
  soloImagen?: boolean;
}
const usable = (q: MirPreguntaOficial, o: MirPoolOpts = {}) =>
  (o.incluirAnuladas || (!q.anulada && q.clave != null)) && (o.incluirDudosas || !q.nota) && (!o.soloImagen || q.imagen);

/** Preguntas oficiales de un capítulo (capId real de mirTemarioData). Por defecto excluye anuladas y dudosas. */
export function preguntasDeCapitulo(capId: string, opts?: MirPoolOpts): MirPreguntaOficial[] {
  return MIR_PREGUNTAS_OFICIALES.filter((q) => q.capId === capId && usable(q, opts));
}
/** Preguntas no usadas todavía (anti-repetición): \`usadas\` = ids ya consumidas (mirEvalLog.mirUsadasIds()). Orden: año desc, nº asc. */
export function preguntasSinUsar(capId: string, usadas: Iterable<string>, opts?: MirPoolOpts): MirPreguntaOficial[] {
  const u = new Set(usadas); return preguntasDeCapitulo(capId, opts).filter((q) => !u.has(q.id)).sort(ordenPool);
}
/** Preguntas de una asignatura (num 1-30 o nombre exacto de mirTemarioData). Por defecto excluye anuladas y dudosas. */
export function preguntasDeAsignatura(asignatura: number | string, opts?: MirPoolOpts): MirPreguntaOficial[] {
  return MIR_PREGUNTAS_OFICIALES.filter((q) => (typeof asignatura === 'number' ? q.num === asignatura : q.asignatura === asignatura) && usable(q, opts));
}
/** Anti-repetición a nivel de asignatura (banqueo ene-mar, Tier C express, viernes 'peor asignatura'). */
export function preguntasSinUsarDeAsignatura(asignatura: number | string, usadas: Iterable<string>, opts?: MirPoolOpts): MirPreguntaOficial[] {
  const u = new Set(usadas); return preguntasDeAsignatura(asignatura, opts).filter((q) => !u.has(q.id)).sort(ordenPool);
}
/** Preguntas ligadas a una imagen (cuota '1 de cada 4 APEX con imagen'); filtro opcional por capId o num. */
export function preguntasConImagen(filtro?: { capId?: string; num?: number }, opts?: MirPoolOpts): MirPreguntaOficial[] {
  return MIR_PREGUNTAS_OFICIALES.filter((q) => q.imagen && usable(q, opts) && (!filtro?.capId || q.capId === filtro.capId) && (filtro?.num == null || q.num === filtro.num));
}
/** Mezcla determinista para el mini-MIR / banqueo (semilla = fecha ISO): mismo día ⇒ mismo set, sin Math.random. */
export function mezclaDeterminista<T>(arr: T[], semilla: string): T[] {
  let s = 0; for (let i = 0; i < semilla.length; i++) s = (s * 31 + semilla.charCodeAt(i)) >>> 0;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { s = (Math.imul(1664525, s) + 1013904223) >>> 0; const j = Math.floor((s / 4294967296) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Set mixto sin usar (mini-MIR D77 40Q · banqueo 25Q): solo asignaturas del plan salvo que se pidan todas. */
export function preguntasMixtasSinUsar(n: number, usadas: Iterable<string>, semilla: string, filtro?: { soloPlan?: boolean; nums?: number[] }, opts?: MirPoolOpts): MirPreguntaOficial[] {
  const u = new Set(usadas);
  const base = MIR_PREGUNTAS_OFICIALES.filter((q) => usable(q, opts) && !u.has(q.id) && (!filtro?.soloPlan || q.fueraDePlan === false) && (!filtro?.nums || filtro.nums.includes(q.num)));
  return mezclaDeterminista(base, semilla).slice(0, n);
}
export function preguntaPorId(id: string): MirPreguntaOficial | undefined { return MIR_PREGUNTAS_OFICIALES.find((q) => q.id === id); }
/** Resumen del pool por asignatura (para la UI: "N Q oficiales mapeadas"). */
export function poolResumen(): Array<{ num: number; asignatura: string; n: number; conImagen: number; conCapitulo: number; enPlan: number; fueraDePlan: boolean | null }> {
  const m = new Map<number, { num: number; asignatura: string; n: number; conImagen: number; conCapitulo: number; enPlan: number; fueraDePlan: boolean | null }>();
  for (const q of MIR_PREGUNTAS_OFICIALES) {
    const s = m.get(q.num) || { num: q.num, asignatura: q.asignatura, n: 0, conImagen: 0, conCapitulo: 0, enPlan: 0, fueraDePlan: q.fueraDePlan };
    s.n++; if (q.imagen) s.conImagen++; if (q.capId) s.conCapitulo++; if (q.enPlan) s.enPlan++; m.set(q.num, s);
  }
  return Array.from(m.values()).sort((a, b) => b.n - a.n);
}
/** Resumen por capítulo dentro de una asignatura (para el Temario: "cap X · N Q"). */
export function poolResumenCapitulos(num: number): Array<{ capId: string; capitulo: string; n: number; conImagen: number; enPlan: boolean }> {
  const m = new Map<string, { capId: string; capitulo: string; n: number; conImagen: number; enPlan: boolean }>();
  for (const q of MIR_PREGUNTAS_OFICIALES) {
    if (q.num !== num || !q.capId) continue;
    const s = m.get(q.capId) || { capId: q.capId, capitulo: q.capitulo || '', n: 0, conImagen: 0, enPlan: q.enPlan };
    s.n++; if (q.imagen) s.conImagen++; m.set(q.capId, s);
  }
  return Array.from(m.values()).sort((a, b) => b.n - a.n);
}
const ordenPool = (a: MirPreguntaOficial, b: MirPreguntaOficial) => (b.anio - a.anio) || (a.numero - b.numero);
export const mirPoolDisponible = (): boolean => MIR_PREGUNTAS_OFICIALES.length > 0;
`;
  // v5.10b (13-sep-2026, integrador): IDEMPOTENTE — si el pool no cambió, NO se reescribe (MIR_POOL_META.generado conserva su timestamp; diff limpio).
  const STAMP_RE = /generado: "[^"]*"/g;
  let sinCambios = false; try { sinCambios = fs.readFileSync(OUT_TS, 'utf8').replace(STAMP_RE, '') === out.replace(STAMP_RE, ''); } catch { /* aún no existe */ }
  if (sinCambios) console.log(`= ${path.relative(ROOT, OUT_TS)} sin cambios de contenido (conserva MIR_POOL_META.generado)`); else fs.writeFileSync(OUT_TS, out, 'utf8');
  const bytes = Buffer.byteLength(out, 'utf8');
  if (bytes > 3 * 1024 * 1024) throw new Error(`mirPreguntasOficiales.ts pesa ${bytes} bytes (> 3 MB): mover enunciados a carga lazy`);
  console.log(`${sinCambios ? "OK (sin reescribir)" : "Wrote"} ${path.relative(ROOT, OUT_TS)} · ${tot} preguntas · ${Math.round(bytes / 1024)} KB · clave ${conClave} · anuladas ${anul} · imagen ${img} · ${verifTxt}`);
  console.log(`capítulos del plan sin preguntas oficiales: ${capsPlanSinQ.length}` + (capsPlanSinQ.length ? ' → ' + capsPlanSinQ.join(' | ') : ''));
}

// ───────────────────────────── main ─────────────────────────────
(async () => {
  try {
    if (flag('--descargar')) await descargar();
    else if (flag('--parse')) parsear();
    else if (flag('--stats')) imprimirStats();
    else if (flag('--clasificar')) clasificar();
    else if (flag('--verificar')) verificar();
    else if (flag('--emit')) emitir();
    else { console.log('Uso: node DATA/_scripts/gen_mir_pool.js --descargar [--con-imagenes] [--anios 2022,2026] | --parse [--anios …] | --stats | --clasificar [--anios …] | --verificar | --emit'); process.exit(1); }
  } catch (e) { console.error('✗ ' + (e && e.stack || e)); process.exit(1); }
})();
