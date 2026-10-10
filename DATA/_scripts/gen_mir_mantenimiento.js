/**
 * gen_mir_mantenimiento.js — genera src/lib/mirMantenimiento.ts (MIR modo BANQUEO PURO ene-abr 2027).
 *
 *   Uso:  node DATA/_scripts/gen_mir_mantenimiento.js [YYYY-MM-DD inicio] [YYYY-MM-DD fin]
 *         (default 2027-01-28 → 2027-04-22 = v5.20; v5.19: 2027-01-27 → 2027-04-15; v5.18: 2027-01-26 → 2027-04-14; v5.17: 2027-01-22 → 2027-04-13; L-V; salta sáb/dom, SKIP_FIJOS: 25-dic/31-dic/1-ene
 *          y los DÍAS PROTEGIDOS v5.20: lun 22-feb examen Step 1 · mar 9-mar D-1 ENCAPS · mié 10-mar examen ENCAPS)
 *
 * Contexto (v6.01: 57 días mar 2-feb → mar 27-abr-2027 + extensión mié 28-abr → vie 24-sep (128) · v6.00: 57 días jue 28-ene → jue 22-abr + extensión 131 · v5.20: 58 días jue 28-ene → jue 22-abr-2027, sin sesión los 3 días protegidos · v5.19: mié 27-ene → jue 15-abr; v5.18: mar 26-ene → mié 14-abr; v5.17: vie 22-ene → mar 13-abr; v5.16: lun 18-ene / mar 19-ene → mié 7-abr; en v5.6 era 23-dic → 4-ene/31-mar): el plan MIR de 78 días termina el mié 27-ene-2027 (v5.20); del jue 28-ene al jue 22-abr-2027 el
 * bloque 15:15-16:15 sigue en el Calendar pero MIR_DIAS no tiene contenido (ROADMAP mantiene
 * "MIR 1h" en fase 1 y 2). Este fichero llena ese hueco SIN contenido nuevo: solo retrieval.
 *
 *  · 15:15-15:30 Anki APEX::MIR (FSRS · Good/Again) + 15:30-16:02 25Q reales MIR mixtas
 *    cronometradas (77 s/Q = 32 min; 15Q asignatura foco + 10Q interleaving) + 16:02-16:15
 *    corrección −1/3 + Whole-Page de los fallos + log (13 min).
 *  · Rotación lun-jue PONDERADA POR PESO MIR de cada asignatura (Peso global real del capítulo
 *    de introducción de ProMIR, mirDetalleData.pesoGlobal; smooth weighted round-robin +
 *    reparto por resto mayor = cuotas exactas). Viernes = 30Q de la asignatura PEOR DEL LOG
 *    (mirEvalLog.mirPeorAsignatura(); fallback = la de mayor peso vista esa semana).
 *  · modo 'reducido' jue 28-ene → vie 19-feb (17 días · Fase B/C del Step 1, v5.20: el sprint acaba el vie 19-feb = D95; el examen del lun 22-feb es DÍA
 *    PROTEGIDO, sin sesión MIR; normal desde el mar 23-feb · v5.19: 27-ene → 19-feb, el sprint acababa el jue 18-feb = D95 y el examen vie 19-feb iba incluido en el modo reducido; v5.18: 26-ene → 18-feb; v5.17: 22-ene → 16-feb; v5.16: 19-ene → 11-feb): solo Anki + 10Q (flag modoReducido).
 *  · TIER C EXPRESS (v3b, gaps_v3b_mir.json punto 4, 13-sep-2026): 1 de los 4 slots semanales lun-jue (el ÚLTIMO
 *    lun-jue de cada semana, 12 semanas → 12 asignaturas FUERA del plan) cambia sus '10Q interleaving' (o sus 10Q
 *    mixtas en modo reducido) por 10Q del capítulo TOP-1 de una asignatura pequeña, con capId REAL de
 *    mirTemarioData.ts y peso del capítulo leído de mirDetalleData.ts. Ningún minuto nuevo: solo cambia qué
 *    10Q ocupan ese slot. Se loguea con SU asignatura (campo tierC del día; la UI debe usar tierC.asignatura
 *    en el registro de esas 10Q, no la asignatura foco).
 *  · Handoff jue 22-abr (= último día del mantenimiento; v5.20; v5.19: 15-abr; v5.18: 14-abr; v5.17: 13-abr; v5.16: 7-abr): export JSON del log + tabla de neto por asignatura + stats FSRS → entrada
 *    de la fase principal (abr-2027).
 *
 * Fuentes: pesos = mirDetalleData.ts (pesoGlobal por asignatura, texto real de ProMIR);
 * asignaturas = las 14 del plan (gen_mir_daily.js BLOQUES). No se inventan preguntas: el pool
 * oficial es src/lib/mirPreguntasOficiales.ts (1.050 Q MIR 2022-2026 clasificadas, DATA/MIR/pool/)
 * → preguntasSinUsarDeAsignatura(num, usadas) / preguntasSinUsar(capId, usadas); fallback = test
 * por asignatura de ProMIR. Cómo consume cada segmento el pool: DATA/MIR/POOL_USO.md.
 *
 * v6.00 (6-oct-2026 · V6_ESPEC §D; DJ-4: MIR 1 h/día en TODAS las fases):
 *   Uso:  node DATA/_scripts/gen_mir_mantenimiento.js [inicio] [fin] [--ext-hasta YYYY-MM-DD]
 *   · skip, protegidos e inicio del SERUMS se leen de DATA/_scripts/_fechas_v6.json (vía gen_fechas_v6.js; se quitan las
 *     constantes locales SKIP_FIJOS/PROTEGIDOS). Protegidos v5.20 (22-feb, 9-mar, 10-mar) ELIMINADOS → v6: vie 12-mar
 *     (D-1 hábil ENCAPS), lun 15-mar (lunes libre) + Semana Santa (jue 25 / vie 26-mar, SKIP) → mantenimiento 28-ene → jue 22-abr
 *     (FIN fijo) = 57 filas (47 lun-jue · 10 viernes; Tier C 28-ene · 4-feb · 11-feb · 18-feb · 25-feb · 4-mar · 18-mar ·
 *     mié 24-mar · 1-abr · 8-abr · 15-abr · 22-abr).
 *   · Modo REDUCIDO ELIMINADO (REDUCIDO_HASTA = null): su motivo era el sprint del Step 1 de febrero, que ya no existe;
 *     las 17 filas 28-ene → 19-feb pasan de 10Q a 25Q/30Q (más contenido, nada se quita). Reversible (§I): REDUCIDO_HASTA = '2027-02-19'.
 *   · fechas(): L-V y, desde serums.inicio (lun 3-may [S]), también SÁBADO (DJ-3: domingo libre).
 *   · EXTENSIÓN (fase 'extension', d 58…): vie 23-abr → --ext-hasta (default = último día de plan anterior al ritual, derivado
 *     del JSON = vie 24-sep; adelanto 27-ago = 107 filas · plan B 22-oct = 155) = 131 filas (6 L-V hasta el 30-abr + 125 L-S en el
 *     SERUMS: 88 lun-jue · 23 viernes · 20 sábados). lun-jue = misma rotación ponderada (cuotas por resto mayor sobre los slots de
 *     la extensión) · viernes = 30Q de la asignatura peor del log · SÁBADO (tipo 'sabado', nuevo) = mini-simulacro 30Q MIXTAS de las
 *     14 asignaturas (77 s/Q) + corrección · Tier C express = último lun-jue de cada semana repitiendo el ciclo de las 12 con
 *     preguntas no usadas (preguntasSinUsar). `semana` continua. FSRS 0,85 hasta el Step 1 → 0,90 en la fase principal (oct-2027).
 *   · v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct): la 1ª vuelta (gen_mir_daily.js 2026-10-12) termina el lun 1-feb → mantenimiento
 *     mar 2-feb → mar 27-abr = las MISMAS 57 filas (47 lun-jue · 10 viernes · 12 Tier C; cuotas idénticas), re-fechadas; extensión
 *     mié 28-abr → vie 24-sep (tope SIN cambio: día de plan anterior al ritual) = 128 filas (antes 131): la extensión absorbe los 3 días.
 *     Uso: node DATA/_scripts/gen_mir_mantenimiento.js 2027-02-02 2027-04-27   (los defaults ya son estos).
 *   · Franja por turno en F4 (mirFranjaPorTurno): M 16:00-17:00 · T 10:35-11:35 · L 15:15-16:15 · día de hito 04:05-05:05
 *     (plantilla H) · G 1 h en tiempo muerto de la guardia (lo que no se termine se suma al día de plan siguiente).
 */
const fs = require('fs');
const path = require('path');
const V6 = require('./gen_fechas_v6'); // v6.00: fuente única de fechas (aborta si _fechas_v6.json no cuadra con sus derivaciones)
const F6 = V6.cargarFechasV6();
const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(ROOT, 'src/lib/mirMantenimiento.ts');
// v6.00: posicionales [inicio] [fin] + opción --ext-hasta <fecha> (el valor de la opción no cuenta como posicional)
const ARGS = process.argv.slice(2);
const iExt = ARGS.indexOf('--ext-hasta');
const EXT_HASTA = iExt >= 0 ? ARGS[iExt + 1] : V6.derivar(F6).ultimoDiaEstudio; // v6.00: día de plan anterior al ritual (vie 24-sep-2027)
const POS = ARGS.filter((a, i) => !a.startsWith('--') && !(iExt >= 0 && i === iExt + 1));
const INICIO = POS[0] || '2027-02-02'; // v6.01 (10-oct-2026): D1 lun 12-oct → la 1ª vuelta MIR termina el lun 1-feb (D78) → el mantenimiento arranca el mar 2-feb · v6.00 = v5.20: '2027-01-28' · v5.20: la 1ª vuelta MIR termina el mié 27-ene (D78) → el mantenimiento arranca el jue 28-ene · v5.19: la 1ª vuelta MIR termina el mar 26-ene (D78) → el mantenimiento arranca el mié 27-ene · v5.18: la 1ª vuelta MIR termina el lun 25-ene (D78) → el mantenimiento arranca el mar 26-ene · v5.17: la 1ª vuelta MIR termina el jue 21-ene (D78 = corrección del mini-MIR) → el mantenimiento arranca el vie 22-ene para no solapar (v5.16: 19-ene (v5.15: 14-ene (v5.14: 12-ene · v5.13: 8-ene)
const FIN = POS[1] || '2027-04-27'; // v6.01 (10-oct-2026): el mantenimiento CONSERVA sus 57 filas (47 lun-jue · 10 viernes · 12 Tier C: mismas cuotas) desde el mar 2-feb → FIN mar 27-abr (+3 hábiles; antes jue 22-abr); la EXTENSIÓN sigue terminando el vie 24-sep (--ext-hasta) y ABSORBE la diferencia (131 → 128 filas) · v6.00: FIN FIJO jue 22-abr (57 filas con los protegidos v6; la extensión va aparte desde el vie 23-abr) · v5.20: jue 22-abr (58 hábiles: se AMPLÍA para conservar los 46 slots lun-jue y las 12 Tier C — al arrancar en jueves se pierde el mié 27-ene y los 3 días protegidos lun 22-feb · mar 9 · mié 10-mar son lun-jue) · v5.19: jue 15-abr (+1 día, mismos 46 slots lun-jue y 12 Tier C) · v5.18: mié 14-abr = 57 días con los MISMOS 46 slots lun-jue y las 12 Tier C (arranque en martes, como v5.16) · v5.17: el fin se ALARGA 4 hábiles (v5.16: 7-abr · v5.15: 2-abr · v5.14: 31-mar) → 58 días: con +3 exactos (12-abr, 57 días) el arranque en viernes dejaba 45 slots lun-jue en vez de 46 y se perdía 1 de Neurología; con 58 quedan las MISMAS 46 cuotas lun-jue que v5.16 (+1 viernes extra de repaso) para conservar los 57 días del mantenimiento — "no perder contenido" (Joseph)
for (const s of [INICIO, FIN, EXT_HASTA]) if (!/^20\d\d-\d\d-\d\d$/.test(s)) throw new Error('fecha inválida: ' + s);
if (EXT_HASTA <= FIN) throw new Error(`--ext-hasta (${EXT_HASTA}) debe ser posterior al fin del mantenimiento (${FIN})`);
/** hasta esta fecha (incl.) el bloque va en modo reducido (Fase B/C Step 1 hasta el D95 vie 19-feb-2027; examen lun 22-feb = día protegido, sin sesión · v5.20; v5.19: examen vie 19-feb; v5.18: jue 18-feb; v5.17: mar 16-feb) */
const REDUCIDO_HASTA = null; // v6.00 (6-oct-2026): modo reducido ELIMINADO (DJ-4: MIR 1 h en todas las fases; el sprint Step 1 de feb ya no existe) — reversible con '2027-02-19' (§I) · v5.20 era '2027-02-19': D95 vie 19-feb (el examen Step 1 del lun 22-feb es DÍA PROTEGIDO: sin sesión MIR) · v5.19: examen vie 19-feb (D95 jue 18-feb) · v5.18: examen jue 18-feb (D95 mié 17-feb) · v5.17: el Step 1 termina D95 = lun 15-feb y el examen es el mar 16-feb (incluido: ese día el MIR va reducido) (v5.16: jue 11-feb · v5.15: lun 8-feb · v5.14: mié 3-feb)

// ── calendario (v6.00: skip/protegidos/SERUMS de _fechas_v6.json; misma regla que gen_fechas_v6.esDiaPlan) ──
// v6.00 (6-oct-2026): se quitan las constantes locales. SKIP = 25-dic · 31-dic · 1-ene · jue 25 / vie 26-mar-2027 (Semana Santa);
// PROTEGIDOS = los de A3 (vie 12-mar D-1 hábil ENCAPS · sáb 13 · dom 14-mar ENCAPS · lun 15-mar lunes libre · sáb 25-sep ritual ·
// dom 26-sep viaje · lun 27-sep EXAMEN Step 1); los v5.20 (lun 22-feb · mar 9-mar · mié 10-mar) vuelven a ser días de plan.
// MISMA fuente en gen_research_plan · gen_derma_ciclo2 · remap_inicio (Derma) · gen_aurum_plan · gen_mir_mantenimiento.
// (v5.20: SKIP_FIJOS = 25-dic/31-dic/1-ene · PROTEGIDOS = lun 22-feb / mar 9-mar / mié 10-mar.)
const SKIP_FIJOS = new Set(F6.skip);
const PROTEGIDOS = new Set(F6.protegidos.map((p) => p.fecha));
const SERUMS_INICIO = F6.serums.inicio; // v6.00: desde aquí el SÁBADO es día de plan (DJ-3; domingo libre)
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
/** Días de plan MIR: L-V (L-S desde el inicio del SERUMS), sin SKIP ni protegidos (= gen_fechas_v6.esDiaPlan(f, 'mir')). */
function* fechas(desde, hasta) {
  const d = fromISO(desde), end = fromISO(hasta);
  while (d <= end) {
    const dow = d.getUTCDay(), f = iso(d);
    const habil = (dow >= 1 && dow <= 5) || (dow === 6 && f >= SERUMS_INICIO);
    if (habil && !SKIP_FIJOS.has(f) && !PROTEGIDOS.has(f)) {
      if (!V6.esDiaPlan(f, 'mir', F6)) throw new Error('fechas(): ' + f + ' no es día de plan según gen_fechas_v6.esDiaPlan');
      yield { fecha: f, dow };
    }
    d.setUTCDate(d.getUTCDate() + 1);
  }
}

// ── Peso MIR global por asignatura (mirDetalleData.ts · pesoGlobal, capítulo intro real de ProMIR) ──
// Se toma el valor central del texto: "8-10%"→9 · "~10% histórico; ~9% últimos 5"→9 · "4-5%"→4,5.
const ASIGS = [
  { num: 3, asignatura: 'Cardiología', peso: 9, fuente: '8-10% (~10% últimos 5 años)' },
  { num: 11, asignatura: 'Gastroenterología', peso: 9, fuente: '~10% histórico; ~9% últimos 5 años' },
  { num: 20, asignatura: 'Neurología', peso: 8, fuente: '~8% últimos 5 años (~15/año)' },
  { num: 7, asignatura: 'Enfermedades Infecciosas', peso: 8, fuente: '~8% (10-15 preguntas/año)' },
  { num: 6, asignatura: 'Endocrinología y Nutrición', peso: 7, fuente: '7% del MIR' },
  { num: 19, asignatura: 'Neumología', peso: 6, fuente: '~6% (10-13 preguntas/año)' },
  { num: 28, asignatura: 'Reumatología', peso: 6, fuente: '6% (~12-15 preguntas/año)' },
  { num: 8, asignatura: 'Epidemiología', peso: 5, fuente: '~5% del examen (reducido a la mitad en las últimas convocatorias)' },
  { num: 18, asignatura: 'Nefrología', peso: 5, fuente: '~5% del MIR' },
  { num: 15, asignatura: 'Hematología', peso: 5, fuente: 'Media (~5%)' },
  { num: 26, asignatura: 'Psiquiatría', peso: 4.5, fuente: '4-5%' },
  { num: 24, asignatura: 'Pediatría', peso: 4, fuente: '~4% (~8 preguntas/año)' },
  { num: 14, asignatura: 'Ginecología y Obstetricia', peso: 3, fuente: '~3% (10-14 preguntas/año)' },
  { num: 17, asignatura: 'Medicina Legal y Bioética', peso: 1.2, fuente: '~1,2% (11 preguntas en 5 años)' },
];
const byNum = Object.fromEntries(ASIGS.map((a) => [a.num, a]));

// ── verificación: los pesos deben poder rastrearse al texto de mirDetalleData.ts ──
const detSrc = fs.readFileSync(path.join(ROOT, 'src/lib/mirDetalleData.ts'), 'utf8');
for (const a of ASIGS) {
  const i = detSrc.indexOf('\n  ' + a.num + ': {'); if (i < 0) throw new Error('mirDetalleData sin num ' + a.num);
  const pg = (detSrc.slice(i, detSrc.indexOf('\n  },', i)).match(/pesoGlobal: '((?:[^'\\]|\\.)*)'/) || [])[1] || '';
  const nums = [...pg.matchAll(/(\d+(?:[.,]\d+)?)\s*%/g)].map((m) => +m[1].replace(',', '.'));
  const rangos = [...pg.matchAll(/(\d+)-(\d+)%/g)].map((m) => [+m[1], +m[2]]);
  const ok = nums.some((n) => Math.abs(n - a.peso) <= 1.5) || rangos.some(([x, y]) => a.peso >= x && a.peso <= y);
  if (!ok) throw new Error(`peso ${a.peso} de ${a.asignatura} no se rastrea en pesoGlobal: "${pg}"`);
}

// ── TIER C EXPRESS: 12 asignaturas FUERA del plan × su capítulo top-1 (mirDetalleData.temas[0]) ──
// Orden = el del punto 4 de gaps_v3b_mir.json (Trauma MI, Trauma MS, Rx-Urgencias, Onco urgencias, Geriatría, ORL,
// Paliativos, Uro, Oftalmo, Genética, Inmuno, Estadística/Gestión). Para 'Estadística/Gestión' se toma Gestión
// (Estadística no ha tenido preguntas en las últimas 5 convocatorias según su pesoGlobal en mirDetalleData.ts).
// capId y peso NO se escriben a mano: se resuelven contra mirTemarioData.ts y mirDetalleData.ts y el script falla si no cuadran.
const TIER_C = [
  { semana: 1, num: 29, asignatura: 'Traumatología', capN: 5, capitulo: 'Patología del miembro inferior' },
  { semana: 2, num: 29, asignatura: 'Traumatología', capN: 4, capitulo: 'Patología del miembro superior', top: 2, nota: 'top-2 de Traumatología (el gap pide Trauma MI y Trauma MS: 31,9 + 24,0 % = 56 % de la asignatura)' },
  { semana: 3, num: 27, asignatura: 'Radiología-Urgencias', capN: 6, capitulo: 'Síndromes torácicos' },
  { semana: 4, num: 22, asignatura: 'Oncología Médica', capN: 5, capitulo: 'Urgencias oncológicas' },
  { semana: 5, num: 13, asignatura: 'Geriatría', capN: 2, capitulo: 'La enfermedad en las personas mayores' },
  { semana: 6, num: 23, asignatura: 'ORL', capN: 1, capitulo: 'Oído' },
  { semana: 7, num: 4, asignatura: 'Cuidados Paliativos', capN: 3, capitulo: 'Control de síntomas' },
  { semana: 8, num: 30, asignatura: 'Urología', capN: 2, capitulo: 'Próstata: hiperplasia benigna y cáncer de próstata' },
  { semana: 9, num: 21, asignatura: 'Oftalmología', capN: 5, capitulo: 'Retina' },
  { semana: 10, num: 12, asignatura: 'Genética', capN: 1, capitulo: 'Enfermedades genéticas' },
  { semana: 11, num: 16, asignatura: 'Inmunología', capN: 1, capitulo: 'Inmunología básica' },
  { semana: 12, num: 25, asignatura: 'Planificación y Gestión Sanitaria', capN: 3, capitulo: 'Economía de la salud', nota: 'slot "Estadística/Gestión" del gap: Estadística (num 9) sin preguntas en las últimas 5 convocatorias' },
];
{
  const temSrc = fs.readFileSync(path.join(ROOT, 'src/lib/mirTemarioData.ts'), 'utf8');
  for (const t of TIER_C) {
    if (byNum[t.num]) throw new Error(`Tier C: ${t.asignatura} está en las 14 del plan (no es Tier C)`);
    const i = temSrc.indexOf(`{ num: ${t.num}, name: '${t.asignatura}'`); if (i < 0) throw new Error(`mirTemarioData sin num ${t.num} ${t.asignatura}`);
    const j = temSrc.indexOf('] },', i);
    const m = temSrc.slice(i, j).match(new RegExp(`\\{ n: ${t.capN}, titulo: '((?:[^'\\\\]|\\\\.)*)', capId: '([0-9a-f]+)' \\}`));
    if (!m) throw new Error(`mirTemarioData: capítulo ${t.capN} no encontrado en ${t.asignatura}`);
    const titulo = m[1].replace(/\\'/g, "'");
    if (titulo !== t.capitulo) throw new Error(`Tier C ${t.asignatura} cap ${t.capN}: título '${titulo}' ≠ '${t.capitulo}'`);
    t.capId = m[2];
    // peso del capítulo (mirDetalleData.temas) — debe ser el top-1 de su asignatura
    const k = detSrc.indexOf('\n  ' + t.num + ': {'); if (k < 0) throw new Error('mirDetalleData sin num ' + t.num);
    const temas = [...detSrc.slice(k, detSrc.indexOf('\n  },', k)).matchAll(/\{ nombre: '((?:[^'\\]|\\.)*)', pesoPct: ([\d.]+)/g)].map((x) => ({ nombre: x[1].replace(/\\'/g, "'"), pct: +x[2] }));
    const norm = (s) => s.toLowerCase().replace(/[^a-záéíóúñ]/g, '');
    const prefijoComun = (a, b) => { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; };
    // 1) título idéntico · 2) uno contiene al otro · 3) prefijo común ≥ 22 caracteres y candidato ÚNICO
    //    (p. ej. "Próstata: hiperplasia benigna y cáncer…" vs "…benigna de próstata y cáncer…"; MI/MS solo comparten 19 → no se confunden)
    const objetivo = norm(t.capitulo);
    let tema = temas.find((x) => norm(x.nombre) === objetivo) || temas.find((x) => norm(x.nombre).startsWith(objetivo) || objetivo.startsWith(norm(x.nombre)));
    if (!tema) { const cand = temas.filter((x) => prefijoComun(norm(x.nombre), objetivo) >= 22); if (cand.length === 1) tema = cand[0]; }
    if (!tema) throw new Error(`mirDetalleData: peso no encontrado para ${t.asignatura} · ${t.capitulo}`);
    const orden = temas.slice().sort((a, b) => b.pct - a.pct);
    const rango = t.top || 1;
    if (Math.abs(tema.pct - orden[rango - 1].pct) > 0.01) throw new Error(`Tier C ${t.asignatura}: '${t.capitulo}' (${tema.pct}%) no es el top-${rango} (${orden[rango - 1].nombre} ${orden[rango - 1].pct}%)`);
    t.pesoCap = tema.pct;
  }
}

// ── días ──
// v6.00 (6-oct-2026): dos tramos con CUOTAS PROPIAS y `semana`/`d` continuos: mantenimiento (INICIO → FIN, L-V) y extensión
// (FIN+1 → EXT_HASTA; L-S desde el inicio del SERUMS). El tramo de mantenimiento es el del generador v5.20 con las constantes v6
// (verificado contra la ejecución en seco crit_num/gmm.js → mirMant_v6_dry.ts: mismas filas d1-d57, + campo `fase`).
const addISO = (s, n) => { const x = fromISO(s); x.setUTCDate(x.getUTCDate() + n); return iso(x); };
const DIAS_CAL = [...fechas(INICIO, FIN)];
const DIAS_EXT = [...fechas(addISO(FIN, 1), EXT_HASTA)];
const esLunJue = (x) => x.dow >= 1 && x.dow <= 4;
const nSlots = DIAS_CAL.filter(esLunJue).length;
const nSlotsExt = DIAS_EXT.filter(esLunJue).length;

/** Cuotas exactas por resto mayor sobre n slots lun-jue + smooth weighted round-robin (pesos = cuotas → secuencia bien repartida). */
function cuotasYSecuencia(n) {
  const totalPeso = ASIGS.reduce((a, x) => a + x.peso, 0);
  const cuotas = ASIGS.map((a) => ({ num: a.num, q: (a.peso / totalPeso) * n }));
  const asignados = cuotas.map((c) => ({ num: c.num, n: Math.floor(c.q), resto: c.q - Math.floor(c.q) }));
  const faltan = n - asignados.reduce((s, x) => s + x.n, 0);
  asignados.slice().sort((x, y) => y.resto - x.resto).slice(0, faltan).forEach((x) => { asignados.find((y) => y.num === x.num).n += 1; });
  const cuotaDe = Object.fromEntries(asignados.map((x) => [x.num, x.n]));
  const cur = Object.fromEntries(ASIGS.map((a) => [a.num, 0]));
  const usados = Object.fromEntries(ASIGS.map((a) => [a.num, 0]));
  const secuencia = [];
  for (let k = 0; k < n; k++) {
    let best = null;
    for (const a of ASIGS) {
      if (usados[a.num] >= cuotaDe[a.num]) continue;
      cur[a.num] += cuotaDe[a.num];
      if (!best || cur[a.num] > cur[best]) best = a.num;
    }
    cur[best] -= n;
    usados[best] += 1;
    secuencia.push(best);
  }
  for (const a of ASIGS) if (usados[a.num] !== cuotaDe[a.num]) throw new Error('cuota no cumplida ' + a.asignatura);
  return { cuotaDe, secuencia };
}
const { cuotaDe, secuencia } = cuotasYSecuencia(nSlots);
const { cuotaDe: cuotaDeExt, secuencia: secuenciaExt } = cuotasYSecuencia(nSlotsExt);

// filas
const ROWS = []; let d = 0, semana = 0; const focosSemana = [];
const previos = [];
/** Fallback de registro de viernes/sábado: la asignatura de mayor peso vista esa semana (o la siguiente de la rotación). */
const fallbackDe = (sec, si) => focosSemana.slice().sort((a, b) => byNum[b].peso - byNum[a].peso)[0] || sec[si % sec.length];
function filas(dias, fase, sec) {
  let si = 0;
  for (const x of dias) {
    if (x.dow === 1 || d === 0) { semana += 1; focosSemana.length = 0; }
    d += 1;
    const modo = REDUCIDO_HASTA && x.fecha <= REDUCIDO_HASTA ? 'reducido' : 'normal';
    if (x.dow === 5) {
      const fallback = fallbackDe(sec, si);
      const nQ = modo === 'reducido' ? 10 : 30;
      ROWS.push({
        d, fecha: x.fecha, wd: WD[x.dow], semana, fase, modo, tipo: 'viernes',
        num: fallback, asignatura: byNum[fallback].asignatura, num2: null, asignatura2: null,
        nQ, minQ: Math.round(nQ * 77 / 60 * 10) / 10, minCorr: modo === 'reducido' ? 7 : 11,
        tema: modo === 'reducido'
          ? `VIERNES reducido · Anki + 10Q de la asignatura PEOR del log (fallback: ${byNum[fallback].asignatura}) · corrección corta`
          : `VIERNES · 30Q reales de la asignatura PEOR del log (fallback: ${byNum[fallback].asignatura}) · 38,5 min cronometrados · neto semanal al log`,
      });
      continue;
    }
    if (x.dow === 6) {
      // v6.00 · SÁBADO (solo en el SERUMS, DJ-3): mini-simulacro de 30Q MIXTAS de las 14 asignaturas del plan (MIR_MANT_PESOS)
      const fallback = fallbackDe(sec, si);
      const nQ = 30;
      ROWS.push({
        d, fecha: x.fecha, wd: WD[x.dow], semana, fase, modo, tipo: 'sabado',
        num: fallback, asignatura: byNum[fallback].asignatura, num2: null, asignatura2: null,
        nQ, minQ: Math.round(nQ * 77 / 60 * 10) / 10, minCorr: 11,
        tema: `SÁBADO · MINI-SIMULACRO 30Q reales MIR MIXTAS de las 14 asignaturas (77 s/Q · 38,5 min cronometrados · opción en blanco) + corrección −1/3 + neto por asignatura al log (asignatura de registro por defecto: ${byNum[fallback].asignatura})`,
      });
      continue;
    }
    const num = sec[si++];
    focosSemana.push(num);
    const num2 = previos.length ? previos[previos.length - 1] : null;
    const nQ = modo === 'reducido' ? 10 : 25;
    ROWS.push({
      d, fecha: x.fecha, wd: WD[x.dow], semana, fase, modo, tipo: 'banco',
      num, asignatura: byNum[num].asignatura, num2, asignatura2: num2 ? byNum[num2].asignatura : null,
      nQ, minQ: Math.round(nQ * 77 / 60 * 10) / 10, minCorr: modo === 'reducido' ? 7 : 13,
      tema: modo === 'reducido'
        ? `REDUCIDO (Fase B/C Step 1) · Anki APEX::MIR + 10Q mixtas (${byNum[num].asignatura}${num2 ? ' + ' + byNum[num2].asignatura : ''}) · 13 min`
        : `BANCO · 25Q reales MIR: 15Q ${byNum[num].asignatura} + 10Q interleaving (${num2 ? byNum[num2].asignatura + ' y anteriores' : 'mixtas'}) · 32 min + 13 min corrección`,
    });
    previos.push(num);
  }
  if (si !== sec.length) throw new Error(`${fase}: se usaron ${si} slots lun-jue de ${sec.length}`);
}
filas(DIAS_CAL, 'mantenimiento', secuencia);
filas(DIAS_EXT, 'extension', secuenciaExt);

// ── Tier C express: el ÚLTIMO slot lun-jue ('banco') de cada semana cambia sus 10Q interleaving/mixtas ──
// v5.13 (16-sep-2026): si el INICIO cae en viernes, la semana 1 no tiene slots lun-jue → la semana N del catálogo se mapea a la
// N-ésima semana del plan CON slots de banco (así el mantenimiento puede arrancar cualquier día hábil sin perder ningún Tier C).
// v6.00: en el mantenimiento, las semanas 1-12 del catálogo (12 Tier C, como siempre); en la EXTENSIÓN, cada semana con banco
// repite el ciclo de las 12 (vuelta 2, 3…) con preguntas NO usadas (preguntasSinUsar(capId, usadas)).
function aplicarTierC(r, t, notaExtra) {
  const nota = [t.nota, notaExtra].filter(Boolean).join(' · ');
  r.tierC = { num: t.num, asignatura: t.asignatura, capId: t.capId, capitulo: t.capitulo, pesoCap: t.pesoCap, nQ: 10, ...(nota ? { nota } : {}) };
  r.num2 = t.num; r.asignatura2 = t.asignatura; // el "interleaving" de ese día ES el Tier C (la UI ya muestra asignatura2)
  r.tema = r.modo === 'reducido'
    ? `REDUCIDO (Fase B/C Step 1) · Anki APEX::MIR + 10Q TIER C EXPRESS · ${t.asignatura} — ${t.capitulo} (${t.pesoCap} % de la asignatura) · 13 min · registrar con asignatura '${t.asignatura}'`
    : `BANCO · 25Q reales MIR: 15Q ${byNum[r.num].asignatura} + 10Q TIER C EXPRESS · ${t.asignatura} — ${t.capitulo} (${t.pesoCap} % de la asignatura) · 32 min + 13 min corrección · las 10Q Tier C se registran con asignatura '${t.asignatura}'`;
}
const bancoDe = (fase, sem) => ROWS.filter((r) => r.fase === fase && r.semana === sem && r.tipo === 'banco');
const semanasConBanco = [...new Set(ROWS.filter((r) => r.fase === 'mantenimiento' && r.tipo === 'banco').map((r) => r.semana))].sort((x, y) => x - y);
for (const t of TIER_C) {
  const semanaReal = semanasConBanco[t.semana - 1];
  const slots = bancoDe('mantenimiento', semanaReal);
  if (!slots.length) throw new Error('Tier C: semana sin slots lun-jue ' + t.semana + ' (real ' + semanaReal + ')');
  aplicarTierC(slots[slots.length - 1], t);
}
const semanasConTierC = new Set(ROWS.filter((r) => r.tierC).map((r) => r.semana));
const semanasExt = [...new Set(ROWS.filter((r) => r.fase === 'extension' && r.tipo === 'banco').map((r) => r.semana))]
  .filter((s) => !semanasConTierC.has(s)).sort((x, y) => x - y);
semanasExt.forEach((sem, k) => {
  const t = TIER_C[k % TIER_C.length];
  const vuelta = 2 + Math.floor(k / TIER_C.length);
  const slots = bancoDe('extension', sem);
  aplicarTierC(slots[slots.length - 1], t, `extensión v6 · vuelta ${vuelta} del ciclo Tier C: SOLO preguntas no usadas (preguntasSinUsar)`);
});

// ── emitir ──
// v6.00: + campo `fase` ('mantenimiento' | 'extension'), tipo 'sabado', MIR_MANT_META.mant/ext, Tier C de la extensión,
// franja 'sabado' con su rama en mirMantFranjas() y mirFranjaPorTurno() (Turno de fechasV6, módulo hoja).
const KEYS = ['d', 'fecha', 'wd', 'semana', 'fase', 'modo', 'tipo', 'num', 'asignatura', 'num2', 'asignatura2', 'nQ', 'minQ', 'minCorr', 'tema', 'tierC'];
const rowTS = (r) => '{' + KEYS.filter((k) => k !== 'tierC' || r.tierC).map((k) => k + ':' + JSON.stringify(r[k])).join(',') + '}';
const nRed = ROWS.filter((r) => r.modo === 'reducido').length;
const MANT = ROWS.filter((r) => r.fase === 'mantenimiento');
const EXT = ROWS.filter((r) => r.fase === 'extension');
const cuenta = (arr, f) => arr.filter(f).length;
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmtLargo = (s) => `${WD[fromISO(s).getUTCDay()].toLowerCase()} ${+s.slice(8)}-${MESES[+s.slice(5, 7) - 1]}-${s.slice(0, 4)}`;
const TIERC_ROWS = ROWS.filter((r) => r.tierC);
const nTierCMant = cuenta(MANT, (r) => r.tierC);
const nTierCExt = cuenta(EXT, (r) => r.tierC);
const vueltaDe = (r) => (r.fase === 'mantenimiento' ? 1 : +((r.tierC.nota || '').match(/vuelta (\d+)/) || [0, 0])[1]);
const HANDOFF = `${fmtLargo(ROWS[ROWS.length - 1].fecha)} (último día con estudio antes del Step 1) → fase principal MIR desde oct-2027: export JSON del log (mirEvalLog) + tabla de neto por asignatura + stats FSRS del deck APEX::MIR (retention 0,85 → 0,90)`;
const out = `/**
 * mirMantenimiento.ts — MIR modo BANQUEO PURO (mantenimiento ene→abr 2027 + EXTENSIÓN abr→sep 2027) · GENERADO por
 * DATA/_scripts/gen_mir_mantenimiento.js ${INICIO} ${FIN} --ext-hasta ${EXT_HASTA} — NO editar a mano.
 *
 * v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct): la 1.ª vuelta termina el lun 1-feb → el mantenimiento CONSERVA sus 57 filas (mismas cuotas,
 * misma secuencia y los mismos 12 Tier C) re-fechadas desde el mar 2-feb; la extensión mantiene su tope (vie 24-sep) y absorbe los 3 días (131 → 128).
 * v6.00 (6-oct-2026 · V6_ESPEC §D · DJ-4: MIR 1 h/día en TODAS las fases): ${ROWS.length} días =
 *  · MANTENIMIENTO ${MANT.length} (d${MANT[0].d}-d${MANT[MANT.length - 1].d} · ${MANT[0].fecha} → ${MANT[MANT.length - 1].fecha} · L-V: ${cuenta(MANT, (r) => r.tipo === 'banco')} lun-jue · ${cuenta(MANT, (r) => r.tipo === 'viernes')} viernes)
 *  · EXTENSIÓN ${EXT.length} (d${EXT[0].d}-d${EXT[EXT.length - 1].d} · ${EXT[0].fecha} → ${EXT[EXT.length - 1].fecha} · L-V hasta el SERUMS y L-S desde el ${SERUMS_INICIO}: ${cuenta(EXT, (r) => r.tipo === 'banco')} lun-jue · ${cuenta(EXT, (r) => r.tipo === 'viernes')} viernes · ${cuenta(EXT, (r) => r.tipo === 'sabado')} sábados; domingo libre).
 * Salta SKIP (${[...SKIP_FIJOS].join(' · ')}) y los DÍAS PROTEGIDOS v6 (${[...PROTEGIDOS].join(' · ')}) — fuente única:
 * DATA/_scripts/_fechas_v6.json (los protegidos v5.20 22-feb / 9-mar / 10-mar ya no existen). Sin modo reducido (eliminado en v6.00).
 * Franja: 15:15-16:15 hasta el SERUMS; en F4 según el turno del día (mirFranjaPorTurno): M 16:00-17:00 · T 10:35-11:35 ·
 * L 15:15-16:15 · día de hito 04:05-05:05 (plantilla H) · G = 1 h en tiempo muerto de la guardia (lo que no se termine se suma al día de plan siguiente).
 * Sin contenido nuevo: retrieval sobre las 14 asignaturas de la 1ª vuelta (mirDailyPlan D1-D76).
 *  · normal:   15:15-15:30 Anki APEX::MIR · 15:30-16:02 25Q reales MIR (15Q foco + 10Q interleaving · 77 s/Q) · 16:02-16:15 corrección −1/3 + Whole-Page + log
 *  · viernes:  15:15-15:25 Anki · 15:25-16:04 30Q de la asignatura PEOR del log (mirEvalLog) · 16:04-16:15 corrección + neto semanal
 *  · sábado (v6, solo en el SERUMS): 15:15-15:25 Anki · 15:25-16:04 MINI-SIMULACRO 30Q MIXTAS de las 14 asignaturas · 16:04-16:15 corrección + neto por asignatura
 * Rotación lun-jue ponderada por Peso MIR global (ProMIR intro, mirDetalleData.pesoGlobal) → cuotas del mantenimiento: ${ASIGS.map((a) => a.asignatura.split(' ')[0] + ' ' + cuotaDe[a.num]).join(' · ')}
 * · cuotas de la extensión (${nSlotsExt} slots): ${ASIGS.map((a) => a.asignatura.split(' ')[0] + ' ' + cuotaDeExt[a.num]).join(' · ')}.
 * TIER C EXPRESS (v3b, gap 4): el último slot lun-jue de las semanas 1-12 del mantenimiento cambia sus 10Q interleaving
 * por 10Q del capítulo TOP-1 de una asignatura FUERA del plan (campo tierC · capId real de mirTemarioData
 * · peso de mirDetalleData): ${TIER_C.map((t) => `s${t.semana} ${t.asignatura}`).join(' · ')}. En la EXTENSIÓN el último lun-jue de
 * cada semana repite el ciclo de las 12 (${nTierCExt} slots: vuelta 2${nTierCExt > TIER_C.length ? '-' + (1 + Math.ceil(nTierCExt / TIER_C.length)) : ''}) SOLO con preguntas no usadas. Ningún minuto nuevo. Esas 10Q
 * se registran en mirEvalLog con asignatura = tierC.asignatura (no con la foco). Pool: mirPreguntasOficiales.preguntasSinUsar(tierC.capId, usadas).
 * Handoff ${HANDOFF.split(':')[0]}. (v5.20: 58 filas 28-ene → 22-abr con modo reducido hasta el vie 19-feb; handoff jue 22-abr.)
 */
import type { Turno } from './fechasV6';

export interface MirMantTierC {
  /** asignatura FUERA del plan (num real de mirTemarioData) y su capítulo top-1 (capId real) */
  num: number; asignatura: string; capId: string; capitulo: string;
  /** % de la asignatura que concentra ese capítulo (mirDetalleData.temas) */
  pesoCap: number;
  nQ: number;
  nota?: string;
}
export interface DiaMIRMant {
  d: number; fecha: string; wd: string; semana: number;
  /** v6.00: 'mantenimiento' (d1-d${MANT.length}, ${MANT[0].fecha} → ${MANT[MANT.length - 1].fecha}) · 'extension' (d${EXT[0].d}-d${EXT[EXT.length - 1].d}, ${EXT[0].fecha} → ${EXT[EXT.length - 1].fecha}; L-S en el SERUMS) */
  fase: 'mantenimiento' | 'extension';
  /** 'normal' = Anki + 25Q/30Q · 'reducido' = solo Anki + 10Q (v5.20: 28-ene → 19-feb; ELIMINADO en v6.00 → 0 filas, se conserva el tipo por si se reactiva, §I) */
  modo: 'normal' | 'reducido';
  /** 'banco' lun-jue (rotación ponderada) · 'viernes' (asignatura peor del log) · 'sabado' (v6, SERUMS: mini-simulacro 30Q mixtas de las 14) */
  tipo: 'banco' | 'viernes' | 'sabado';
  /** asignatura foco del día (viernes: fallback si el log está vacío · sábado: asignatura de registro por defecto; las 30Q son mixtas) */
  num: number; asignatura: string;
  /** asignatura secundaria para el interleaving (la del slot anterior; en los días Tier C = la asignatura Tier C) */
  num2: number | null; asignatura2: string | null;
  /** nº de preguntas, minutos cronometrados (77 s/Q) y minutos de corrección */
  nQ: number; minQ: number; minCorr: number;
  tema: string;
  /** TIER C EXPRESS: las 10Q interleaving/mixtas de este día son de este capítulo (se loguean con SU asignatura) */
  tierC?: MirMantTierC;
}
export const MIR_MANT_META = {
  inicio: '${ROWS[0].fecha}', fin: '${ROWS[ROWS.length - 1].fecha}', totalDias: ${ROWS.length}, // = MIR_MANT_DIAS.length (mantenimiento + extensión; lo usa la navegación de MirTodayPlan)
  mant: { inicio: '${MANT[0].fecha}', fin: '${MANT[MANT.length - 1].fecha}', totalDias: ${MANT.length} },
  ext: { inicio: '${EXT[0].fecha}', fin: '${EXT[EXT.length - 1].fecha}', totalDias: ${EXT.length}, serumsDesde: '${SERUMS_INICIO}', sabados: ${cuenta(EXT, (r) => r.tipo === 'sabado')} },
  modoReducidoHasta: ${REDUCIDO_HASTA ? `'${REDUCIDO_HASTA}'` : 'null'} as string | null, diasReducidos: ${nRed}, segPorQ: 77,
  bloque: '1 h/día (DJ-4) · 15:15–16:15 hasta el SERUMS; en F4 según el turno (M 16:00 · T 10:35 · L 15:15 · hito 04:05 · G tiempo muerto) · Anki APEX::MIR + 25Q reales MIR mixtas (77 s/Q) + corrección · viernes 30Q de la asignatura peor del log · sábado (SERUMS) 30Q mixtas de las 14 · 1 slot/semana Tier C express (10Q de una asignatura fuera del plan)',
  tierC: { slots: ${nTierCMant}, slotsExt: ${nTierCExt}, regla: 'último slot lun-jue de las semanas 1-12 del mantenimiento (y de cada semana de la extensión, repitiendo el ciclo de las 12 con preguntas no usadas): sus 10Q interleaving pasan a ser 10Q del capítulo top-1 de una asignatura fuera del plan; ningún minuto nuevo; se registran con la asignatura Tier C', cobertura: 'con las 12 asignaturas Tier C + Dermatología (bloque 13:30) el examen medido pasa de ~80 % a ~95 % del peso ProMIR (A VERIFICAR con la tabla de pesos de DATA/MIR/README.md)' },
  handoff: '${HANDOFF}',
};
/** Peso MIR global por asignatura (texto real del capítulo intro de ProMIR · mirDetalleData.pesoGlobal) y cuota de slots lun-jue (mantenimiento · extensión). */
export const MIR_MANT_PESOS: Array<{ num: number; asignatura: string; peso: number; fuente: string; slots: number; slotsExt: number }> = [${ASIGS.map((a) => JSON.stringify({ num: a.num, asignatura: a.asignatura, peso: a.peso, fuente: a.fuente, slots: cuotaDe[a.num], slotsExt: cuotaDeExt[a.num] })).join(',')}];
/** TIER C EXPRESS: mantenimiento = 12 semanas → 12 asignaturas fuera del plan × capítulo top-1 (vuelta 1) · extensión = el ciclo de las 12 repetido (vuelta 2…), preguntas no usadas. */
export const MIR_MANT_TIER_C: Array<MirMantTierC & { semana: number; fecha: string; d: number; fase: DiaMIRMant['fase']; vuelta: number }> = [${TIERC_ROWS.map((r) => JSON.stringify({ semana: r.semana, fecha: r.fecha, d: r.d, fase: r.fase, vuelta: vueltaDe(r), ...r.tierC })).join(',')}];
export const MIR_MANT_DIAS: DiaMIRMant[] = [${ROWS.map(rowTS).join(',')}];

export const MIR_MANT_FRANJAS: Record<DiaMIRMant['modo'] | 'viernes' | 'sabado', Array<{ hora: string; fase: string; tipo: string }>> = {
  normal: [
    { hora: '15:15–15:30', fase: 'Anki APEX::MIR (FSRS · Good/Again · retention 0,85 hasta el Step 1 → 0,90 en la fase principal, oct-2027)', tipo: 'anki' },
    { hora: '15:30–16:02', fase: '25Q reales MIR cronometradas (15Q asignatura foco + 10Q interleaving · 77 s/Q · opción en blanco)', tipo: 'quiz' },
    { hora: '16:02–16:15', fase: 'Corrección −1/3 (neto = A − F/3) · Whole-Page Rule de cada fallo · log (knowledge/transfer/proceso · 🇪🇸 delta)', tipo: 'log' },
  ],
  viernes: [
    { hora: '15:15–15:25', fase: 'Anki APEX::MIR (pasada corta)', tipo: 'anki' },
    { hora: '15:25–16:04', fase: '30Q reales de la asignatura PEOR del log (38,5 min · 77 s/Q · opción en blanco)', tipo: 'quiz' },
    { hora: '16:04–16:15', fase: 'Corrección + neto semanal por asignatura al log (mirEvalLog kind mantenimiento)', tipo: 'log' },
  ],
  sabado: [
    { hora: '15:15–15:25', fase: 'Anki APEX::MIR (pasada corta)', tipo: 'anki' },
    { hora: '15:25–16:04', fase: 'MINI-SIMULACRO: 30Q reales MIR MIXTAS de las 14 asignaturas (38,5 min · 77 s/Q · opción en blanco)', tipo: 'quiz' },
    { hora: '16:04–16:15', fase: 'Corrección −1/3 + neto por asignatura al log (mirEvalLog kind mantenimiento)', tipo: 'log' },
  ],
  reducido: [
    { hora: '15:15–15:35', fase: 'Anki APEX::MIR (solo mantener la deuda a cero · Fase B/C Step 1)', tipo: 'anki' },
    { hora: '15:35–15:48', fase: '10Q reales MIR mixtas (13 min · 77 s/Q)', tipo: 'quiz' },
    { hora: '15:48–15:55', fase: 'Corrección rápida + log', tipo: 'log' },
    { hora: '15:55–16:15', fase: 'Devuelto al Step 1 (banco intensivo / sprint final)', tipo: 'libre' },
  ],
};

export function mirMantDiaDe(fechaISO: string): DiaMIRMant | undefined { return MIR_MANT_DIAS.find((x) => x.fecha === fechaISO); }
/** Sub-franjas del día (v6.00: rama 'sabado'; antes el sábado caía en la franja normal). Horas base 15:15-16:15. */
export function mirMantFranjas(dia: DiaMIRMant) {
  if (dia.tipo === 'sabado') return MIR_MANT_FRANJAS.sabado;
  return dia.tipo === 'viernes' && dia.modo === 'normal' ? MIR_MANT_FRANJAS.viernes : MIR_MANT_FRANJAS[dia.modo];
}
/** v6.00 (§B4.1): inicio de la hora de MIR por turno en F4 — M 16:00 · T 10:35 · L 15:15 · G = sin hora (tiempo muerto de la guardia). */
export const MIR_INICIO_POR_TURNO: Record<Turno, string | null> = { M: '16:00', T: '10:35', L: '15:15', G: null };
/** v6.00: día de hito en F4 (plantillas H / H-sáb): MIR 04:05-05:05. */
export const MIR_INICIO_HITO = '04:05';
const _minDe = (hhmm: string): number => { const [h, m] = hhmm.split(':'); return Number(h) * 60 + Number(m); };
const _hhmm = (min: number): string => String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0');
const _rango = (hora: string): [number, number] => { const [a, b] = hora.split('–'); return [_minDe(a ?? '00:00'), _minDe(b ?? '00:00')]; };
/**
 * v6.00: las sub-franjas del día desplazadas al inicio de la franja del TURNO (M 16:00 · T 10:35 · L 15:15) o a 'inicio'
 * (p. ej. MIR_INICIO_HITO en día de hito, o la variante de hora del turno). Guardia (G): 1 h en tiempo muerto, sin hora fija;
 * lo que no se termine se suma al día de plan siguiente (DJ-4).
 */
export function mirFranjaPorTurno(dia: DiaMIRMant, turno: Turno, inicio?: string): Array<{ hora: string; fase: string; tipo: string }> {
  const base = mirMantFranjas(dia);
  const ini = inicio ?? MIR_INICIO_POR_TURNO[turno];
  if (ini == null) {
    return base.map((f, i) => {
      const [a, b] = _rango(f.hora);
      const ultima = i === base.length - 1;
      return { ...f, hora: \`guardia · \${b - a} min\`, fase: ultima ? f.fase + ' · en tiempo muerto de la guardia (Anki MIR + preguntas en el móvil); lo que no se termine se suma al día de plan siguiente' : f.fase };
    });
  }
  const primera = base[0];
  const off = _minDe(ini) - (primera ? _rango(primera.hora)[0] : _minDe(ini));
  return base.map((f) => { const [a, b] = _rango(f.hora); return { ...f, hora: _hhmm(a + off) + '–' + _hhmm(b + off) }; });
}
/** Foco real del día: los viernes manda la asignatura peor del log (si hay); el resto sigue la rotación. */
export function mirMantFoco(dia: DiaMIRMant, peorAsignaturaLog?: string | null): { asignatura: string; num: number | null; nQ: number; origen: 'log' | 'rotacion' } {
  if (dia.tipo === 'viernes' && peorAsignaturaLog) {
    const p = MIR_MANT_PESOS.find((x) => x.asignatura === peorAsignaturaLog);
    return { asignatura: peorAsignaturaLog, num: p ? p.num : null, nQ: dia.nQ, origen: 'log' };
  }
  return { asignatura: dia.asignatura, num: dia.num, nQ: dia.nQ, origen: 'rotacion' };
}
export function mirMant7d(fromD: number): DiaMIRMant[] { return MIR_MANT_DIAS.filter((x) => x.d >= fromD && x.d < fromD + 7); }
export function mirMantHandoff(): string { return MIR_MANT_META.handoff; }
/** Tier C express del día (si lo hay): las 10Q interleaving/mixtas son de tierC.capId y se registran con tierC.asignatura. */
export function mirMantTierC(dia: DiaMIRMant): MirMantTierC | undefined { return dia.tierC; }
/** Próximo Tier C a partir de un D# (chip "próximo Tier C: …"; v6.00 incluye los de la extensión). */
export function mirMantProximoTierC(fromD: number) { return MIR_MANT_TIER_C.find((t) => t.d >= fromD); }
`;
fs.writeFileSync(OUT, out, 'utf8');

// ── verificación (v6.00 · V6_ESPEC §D.6 y V3) ──
const errs = [];
if (ROWS[0].fecha !== [...fechas(INICIO, FIN)][0].fecha) errs.push('inicio');
for (const r of ROWS) {
  const w = fromISO(r.fecha).getUTCDay();
  if (w === 0) errs.push('domingo ' + r.fecha);
  if (w === 6 && r.fecha < SERUMS_INICIO) errs.push('sábado antes del SERUMS ' + r.fecha);
  if (SKIP_FIJOS.has(r.fecha)) errs.push('SKIP ' + r.fecha);
  if (PROTEGIDOS.has(r.fecha)) errs.push('protegido ' + r.fecha);
  if (!V6.esDiaPlan(r.fecha, 'mir', F6)) errs.push('no es día de plan (gen_fechas_v6) ' + r.fecha);
  if (r.tipo === 'viernes' && w !== 5) errs.push('viernes mal ' + r.fecha);
  if (r.tipo === 'sabado' && w !== 6) errs.push('sábado mal ' + r.fecha);
  if (r.tipo === 'banco' && (w === 5 || w === 6)) errs.push('banco en viernes/sábado ' + r.fecha);
  if (r.modo === 'reducido' && !REDUCIDO_HASTA) errs.push('fila reducida sin REDUCIDO_HASTA ' + r.fecha);
}
const seen = new Set(); for (const r of ROWS) { if (seen.has(r.fecha)) errs.push('dup ' + r.fecha); seen.add(r.fecha); }
ROWS.forEach((r, i) => { if (r.d !== i + 1) errs.push('d no contiguo ' + r.d); if (i && r.semana < ROWS[i - 1].semana) errs.push('semana decreciente ' + r.fecha); });
if (nTierCMant !== TIER_C.length) errs.push(`Tier C del mantenimiento: ${nTierCMant} ≠ ${TIER_C.length}`);
const usadosMant = {}, usadosExt = {};
for (const r of ROWS) if (r.tipo === 'banco') { const u = r.fase === 'mantenimiento' ? usadosMant : usadosExt; u[r.num] = (u[r.num] || 0) + 1; }
for (const a of ASIGS) {
  if ((usadosMant[a.num] || 0) !== cuotaDe[a.num]) errs.push(`cuota mantenimiento ${a.asignatura}: ${usadosMant[a.num] || 0} ≠ ${cuotaDe[a.num]}`);
  if ((usadosExt[a.num] || 0) !== cuotaDeExt[a.num]) errs.push(`cuota extensión ${a.asignatura}: ${usadosExt[a.num] || 0} ≠ ${cuotaDeExt[a.num]}`);
}
if (EXT[EXT.length - 1].fecha !== EXT_HASTA && V6.esDiaPlan(EXT_HASTA, 'mir', F6)) errs.push('la extensión no termina en --ext-hasta ' + EXT_HASTA);
if (errs.length) { console.error('ERRORES:', errs); process.exit(1); }
console.log(`Wrote src/lib/mirMantenimiento.ts · ${ROWS.length} días (${ROWS[0].fecha} → ${ROWS[ROWS.length - 1].fecha})`);
console.log(`  mantenimiento ${MANT.length} (${MANT[0].fecha} → ${MANT[MANT.length - 1].fecha}) · lun-jue ${nSlots} · viernes ${cuenta(MANT, (r) => r.tipo === 'viernes')} · reducidos ${nRed} (REDUCIDO_HASTA ${REDUCIDO_HASTA})`);
console.log(`  extensión ${EXT.length} (${EXT[0].fecha} → ${EXT[EXT.length - 1].fecha}) · L-V antes del SERUMS ${cuenta(EXT, (r) => r.fecha < SERUMS_INICIO)} · L-S en el SERUMS ${cuenta(EXT, (r) => r.fecha >= SERUMS_INICIO)} · lun-jue ${nSlotsExt} · viernes ${cuenta(EXT, (r) => r.tipo === 'viernes')} · sábados ${cuenta(EXT, (r) => r.tipo === 'sabado')}`);
console.log('  Tier C mantenimiento: ' + MANT.filter((r) => r.tierC).map((r) => `${r.wd} ${r.fecha}`).join(' · '));
console.log(`  Tier C extensión: ${nTierCExt} (primero ${EXT.find((r) => r.tierC).fecha} · último ${EXT.filter((r) => r.tierC).pop().fecha})`);
console.log('Cuotas lun-jue mantenimiento: ' + ASIGS.map((a) => `${a.asignatura} ${cuotaDe[a.num]}`).join(' · '));
console.log('Cuotas lun-jue extensión: ' + ASIGS.map((a) => `${a.asignatura} ${cuotaDeExt[a.num]}`).join(' · '));
