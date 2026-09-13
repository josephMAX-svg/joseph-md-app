#!/usr/bin/env node
/**
 * gen_mir_pool.js — Pool de preguntas OFICIALES del examen MIR (Ministerio de Sanidad, España).
 *
 * Paso 1 del pipeline "MIR · pool de preguntas oficiales" (gaps_v3b_mir.json, punto 2):
 * descarga los cuadernos de examen (versión 0) y las hojas de respuestas definitivas de las
 * convocatorias MIR 2022-2026 y las parsea a JSON. NO clasifica por asignatura (eso lo hace el
 * paso 2) y NO toca src/lib/mirPreguntasOficiales.ts.
 *
 * Uso (desde D:\joseph-md-app):
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

// ───────────────────────────── main ─────────────────────────────
(async () => {
  try {
    if (flag('--descargar')) await descargar();
    else if (flag('--parse')) parsear();
    else if (flag('--stats')) imprimirStats();
    else { console.log('Uso: node DATA/_scripts/gen_mir_pool.js --descargar [--con-imagenes] [--anios 2022,2026] | --parse [--anios …] | --stats'); process.exit(1); }
  } catch (e) { console.error('✗ ' + (e && e.stack || e)); process.exit(1); }
})();
