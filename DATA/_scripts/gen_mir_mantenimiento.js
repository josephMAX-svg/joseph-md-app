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
 *     Uso: node DATA/_scripts/gen_mir_mantenimiento.js 2027-02-02 2027-04-27   (defaults en v6.01).
 *   · v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct): la 1ª vuelta (gen_mir_daily.js 2026-10-19) termina el lun 8-feb → mantenimiento
 *     mar 9-feb → MAR 4-MAY-2027 = las MISMAS 57 filas (47 lun-jue · 10 viernes · 12 Tier C; cuotas y secuencia idénticas), re-fechadas: el 57.º
 *     día de plan cae 2 días DENTRO del SERUMS (lun 3 y mar 4-may, filas lun-jue; ningún sábado de por medio) → decisión forzada por la regla
 *     «57 filas intactas»; extensión mié 5-may → vie 24-sep (tope SIN cambio) = 123 filas (antes 128: 82 lun-jue · 21 viernes · 20 sábados ·
 *     20 Tier C). Uso: node DATA/_scripts/gen_mir_mantenimiento.js 2027-02-09 2027-05-04   (los defaults ya son estos).
 *   · v6.02 (17-oct): bitácora del Tier C — la extensión baja 128 → 123 filas y su última vuelta (vuelta 3 del ciclo de las 12, Tier C
 *     express de los JUEVES) pasa de 9 a 8 entradas: termina jue 23-sep con Urología (num 30) y deja FUERA «Oftalmología · Retina v3»
 *     (precedente v6.01: 10 → 9, quedó fuera «Genética v3»). MIR_MANT_TIER_C 33 → 32 (12 del mantenimiento + 20 de la extensión: vueltas
 *     12 · 12 · 8). Nada se recorta del mantenimiento (57 filas y sus 12 Tier C intactos): es la cola de la extensión, que conserva su
 *     tope (vie 24-sep). Solo comentario: la salida no cambia.
 *   · v6.02c (18-oct-2026 · Joseph: «si faltan temas o se recortó algo, alárgalo»; decisión (i) del bloque v6.02 de PENDIENTES_JOSEPH):
 *     REPOSICIÓN de lo que la extensión perdió con los corrimientos v6.01/v6.02 (188 → 185 → 180 filas). Referencia = la extensión de
 *     v6.00 (tag regimen-v6.00: vie 23-abr → tope = 131 filas: 88 lun-jue · 23 viernes · 20 sábados · 22 Tier C) recalculada con el
 *     MISMO calendario de _fechas_v6.json (REF_V600). Faltan: 'banco' = cuotas por resto mayor sobre 88 slots − cuotas actuales sobre 82
 *     (Cardiología, Gastroenterología, Neurología, Enf. Infecciosas, Endocrinología, Neumología y Reumatología −1 cada una; Medicina Legal
 *     tiene +1 por el redondeo de 82 slots y se CONSERVA: nada se borra) · 2 'viernes' · 0 sábados · 2 Tier C de la vuelta 3
 *     (Oftalmología · Retina v3 y Genética · Enfermedades genéticas v3, en el orden del ciclo). Se re-fechan a los primeros días MIR
 *     válidos DESPUÉS del bloque protegido del examen Step 1 (25-27-sep → desde el mar 28-sep, F5), cada sesión en un día de SU tipo
 *     (banco lun-jue · viernes · sábado; un día cuyo tipo no tiene déficit se salta: sáb 2-oct), Tier C = último lun-jue de cada semana
 *     de la reposición (jue 30-sep y jue 7-oct) → +9 filas d181-d189 (mar 28-sep → vie 8-oct-2027; fase 'extension' + campo
 *     `repuesta`). Las 180 filas existentes NO cambian (byte-idénticas); el handoff pasa a la última sesión del banqueo (vie 8-oct).
 *     Uso: igual que v6.02 (los defaults ya la incluyen) · --sin-reposicion = salida v6.02 original (180 filas).
 *   · v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; Joseph: «simplemente corre, no modifiques ni comprimas temas ni exámenes, alarga las
 *     fechas límite»; no se estudió lun 19 ni mar 20-oct): la 1.ª vuelta (gen_mir_daily.js 2026-10-21) termina el MIÉ 10-FEB (D78; D77 mini-MIR
 *     mar 9-feb) → mantenimiento JUE 11-FEB → JUE 6-MAY-2027 = las MISMAS 57 filas (47 lun-jue · 10 viernes · 12 Tier C; cuotas y secuencia
 *     idénticas), re-fechadas (+2 hábiles): sus 4 últimas filas (lun 3 → jue 6-may, lun-jue; ningún sábado de por medio) caen ya en el SERUMS.
 *     La extensión conserva su tope (vie 24-sep: día de plan anterior al ritual del Step 1) → vie 7-may → vie 24-sep = 121 filas (antes 123:
 *     80 lun-jue · 21 viernes · 20 sábados · 20 Tier C). La REPOSICIÓN v6.02c se recalcula con el mismo criterio y con un PISO por asignatura:
 *     ninguna asignatura foco baja de lo que tenía publicado (PISO = máx(cuotas v6.00 sobre 88 slots, cuotas v6.02 sobre 82 slots): el slot
 *     extra que el redondeo de v6.02 dio a Medicina Legal —conservado en v6.02c— se mantiene aunque las cuotas sobre 80 ya no lo den) →
 *     +11 filas tras el examen Step 1 (mar 28-sep → mar 12-oct-2027, F5; antes 9 hasta el vie 8-oct): 2 sesiones más que en v6.02c, que
 *     alargan el banqueo 2 días de plan; ninguna fila se pierde (189 = 57 + 121 + 11). Campo `repuesta` = 'v6.03' (mismo mecanismo v6.02c,
 *     recalculado). Uso: node DATA/_scripts/gen_mir_mantenimiento.js 2027-02-11 2027-05-06   (los defaults ya son estos).
 *   · v6.04 (21-oct-2026 · examen Step 1 lun 27-sep → LUN 25-OCT-2027, decisión de Joseph «alarga las fechas, en lo que nos falta»): el tope
 *     de la extensión sigue siendo el día de plan anterior al ritual (V6.derivar().ultimoDiaEstudio), que pasa del vie 24-sep al VIE 22-OCT →
 *     extensión vie 7-may → vie 22-oct = 145 filas (antes 121 + 11 repuestas tras el examen): las cuotas lun-jue se reparten sobre los 96
 *     slots nuevos (antes 80) y la REPOSICIÓN v6.02c/v6.03 se recalcula con la referencia v6.00 FIJA (su tope era el vie 24-sep: REF_V600.extHasta;
 *     antes se derivaba del tope vigente) y con el PISO publicado de la v6.03 (80 slots) → ninguna asignatura, viernes, sábado ni Tier C baja de
 *     lo publicado (la extensión más larga cubre por sí sola las 11 sesiones que la v6.03 reponía tras el examen; si algún redondeo quedara por
 *     debajo, la repuesta va tras el examen, mar 26-oct+). Tier C de la extensión: ≥ la referencia v6.00 (vueltas 2-3 completas + lo que dé de
 *     la 4). Handoff = último día con estudio antes del Step 1 (vie 22-oct) si no hay repuestas.
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
const EXT_HASTA = iExt >= 0 ? ARGS[iExt + 1] : V6.derivar(F6).ultimoDiaEstudio; // v6.00: día de plan anterior al ritual (v6.04: vie 22-oct-2027 · v6.00-v6.03: vie 24-sep)
const POS = ARGS.filter((a, i) => !a.startsWith('--') && !(iExt >= 0 && i === iExt + 1));
const INICIO = POS[0] || '2027-02-11'; // v6.03 (20-oct-2026): D1 mié 21-oct → la 1ª vuelta MIR termina el mié 10-feb (D78) → el mantenimiento arranca el jue 11-feb · v6.02 (17-oct-2026): '2027-02-09' · D1 lun 19-oct → la 1ª vuelta MIR termina el lun 8-feb (D78) → el mantenimiento arranca el mar 9-feb · v6.01 (10-oct-2026): '2027-02-02' · D1 lun 12-oct → la 1ª vuelta MIR termina el lun 1-feb (D78) → el mantenimiento arranca el mar 2-feb · v6.00 = v5.20: '2027-01-28' · v5.20: la 1ª vuelta MIR termina el mié 27-ene (D78) → el mantenimiento arranca el jue 28-ene · v5.19: la 1ª vuelta MIR termina el mar 26-ene (D78) → el mantenimiento arranca el mié 27-ene · v5.18: la 1ª vuelta MIR termina el lun 25-ene (D78) → el mantenimiento arranca el mar 26-ene · v5.17: la 1ª vuelta MIR termina el jue 21-ene (D78 = corrección del mini-MIR) → el mantenimiento arranca el vie 22-ene para no solapar (v5.16: 19-ene (v5.15: 14-ene (v5.14: 12-ene · v5.13: 8-ene)
const FIN = POS[1] || '2027-05-06'; // v6.03 (20-oct-2026): mismas 57 filas desde el jue 11-feb → FIN jue 6-may (+2 hábiles; lun 3 → jue 6-may ya en el SERUMS); la EXTENSIÓN sigue terminando el vie 24-sep y absorbe (123 → 121; lo que pierde se repone tras el examen Step 1) · v6.02 (17-oct-2026): '2027-05-04' · mismas 57 filas desde el mar 9-feb → FIN mar 4-may (+5 hábiles; cruza el inicio del SERUMS lun 3-may: lun 3 y mar 4-may son filas lun-jue del mantenimiento); la EXTENSIÓN sigue terminando el vie 24-sep y absorbe (128 → 123) · v6.01 (10-oct-2026): '2027-04-27' — el mantenimiento CONSERVA sus 57 filas (47 lun-jue · 10 viernes · 12 Tier C: mismas cuotas) desde el mar 2-feb → FIN mar 27-abr (+3 hábiles; antes jue 22-abr); la EXTENSIÓN sigue terminando el vie 24-sep (--ext-hasta) y ABSORBE la diferencia (131 → 128 filas) · v6.00: FIN FIJO jue 22-abr (57 filas con los protegidos v6; la extensión va aparte desde el vie 23-abr) · v5.20: jue 22-abr (58 hábiles: se AMPLÍA para conservar los 46 slots lun-jue y las 12 Tier C — al arrancar en jueves se pierde el mié 27-ene y los 3 días protegidos lun 22-feb · mar 9 · mié 10-mar son lun-jue) · v5.19: jue 15-abr (+1 día, mismos 46 slots lun-jue y 12 Tier C) · v5.18: mié 14-abr = 57 días con los MISMOS 46 slots lun-jue y las 12 Tier C (arranque en martes, como v5.16) · v5.17: el fin se ALARGA 4 hábiles (v5.16: 7-abr · v5.15: 2-abr · v5.14: 31-mar) → 58 días: con +3 exactos (12-abr, 57 días) el arranque en viernes dejaba 45 slots lun-jue en vez de 46 y se perdía 1 de Neurología; con 58 quedan las MISMAS 46 cuotas lun-jue que v5.16 (+1 viernes extra de repaso) para conservar los 57 días del mantenimiento — "no perder contenido" (Joseph)
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

// ── v6.02c (18-oct-2026): REPOSICIÓN tras el examen Step 1 de lo que la extensión perdió con los corrimientos v6.01/v6.02 ──
// Referencia = la extensión de v6.00 (tag regimen-v6.00) recalculada con el calendario actual: mismo inicio (vie 23-abr-2027) y mismo tope
// (EXT_HASTA). Con los defaults debe dar EXACTAMENTE lo que tenía v6.00 (REF_V600; el script aborta si no). Déficit = referencia − extensión
// actual, por tipo (banco por asignatura foco con las cuotas de resto mayor · viernes · sábados) y Tier C (continuando el ciclo de las 12).
// Las filas existentes no se tocan: las repuestas se AÑADEN (d, semana y el interleaving `previos` continúan) con fase 'extension' + `repuesta`.
const REPONER = !ARGS.includes('--sin-reposicion');
// v6.04: la referencia lleva su PROPIO tope (el de la v6.00: vie 24-sep-2027, día de plan anterior al ritual del examen 27-sep); antes se
//   recalculaba hasta EXT_HASTA, que ya no es ese día (examen 25-oct → tope vie 22-oct).
const REF_V600 = { extInicio: '2027-04-23', extHasta: '2027-09-24', filas: 131, banco: 88, viernes: 23, sabado: 20, tierC: 22 }; // MIR_MANT_META.ext / MIR_MANT_TIER_C de regimen-v6.00
const REPUESTA = 'v6.04'; // v6.04 (21-oct-2026): mismo mecanismo recalculado con el examen 25-oct (v6.03: 'v6.03', 11 filas · v6.02c: 'v6.02c', 9 filas)
/** v6.03: PISO publicado por asignatura foco — slots lun-jue de la extensión de versiones ya PUBLICADAS cuyo sobrante de redondeo se conservó
 *  (v6.02: 82 slots → Medicina Legal 2 en vez de 1; v6.02c lo conservó). Ninguna asignatura baja de máx(cuota v6.00, cuotas publicadas). */
const PISO_PUBLICADO = [{ version: 'v6.02', slotsExt: 82 }, { version: 'v6.03', slotsExt: 80 }]; // v6.04: + la v6.03 (80 slots + repuestas hasta el piso)
const lunesDe = (s) => { const x = fromISO(s); x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7)); return iso(x); };
const DIAS_REF = [...fechas(REF_V600.extInicio, REF_V600.extHasta)];
const REF = {
  filas: DIAS_REF.length, banco: DIAS_REF.filter(esLunJue).length, viernes: DIAS_REF.filter((x) => x.dow === 5).length,
  sabado: DIAS_REF.filter((x) => x.dow === 6).length, tierC: new Set(DIAS_REF.filter(esLunJue).map((x) => lunesDe(x.fecha))).size,
};
{ // v6.04: siempre (la referencia tiene su propio tope): el calendario 23-abr → 24-sep de _fechas_v6.json debe seguir dando la extensión de la v6.00
  for (const k of Object.keys(REF)) if (REF[k] !== REF_V600[k]) throw new Error(`reposición v6.02c: la referencia recalculada (${k} ${REF[k]}) ≠ v6.00 (${REF_V600[k]}) — ¿cambió el calendario de _fechas_v6.json?`);
}
const { cuotaDe: cuotaRef } = cuotasYSecuencia(REF.banco);
/** v6.03: piso por asignatura = máx(cuota de la referencia v6.00, cuotas de las extensiones publicadas de PISO_PUBLICADO) */
const pisoDe = Object.fromEntries(ASIGS.map((a) => [a.num, Math.max(cuotaRef[a.num], ...PISO_PUBLICADO.map((x) => cuotasYSecuencia(x.slotsExt).cuotaDe[a.num]))]));
const PISO_TOTAL = ASIGS.reduce((x, a) => x + pisoDe[a.num], 0);
const EXT0 = ROWS.filter((r) => r.fase === 'extension');
const DEF = {
  banco: Object.fromEntries(ASIGS.map((a) => [a.num, Math.max(0, pisoDe[a.num] - cuotaDeExt[a.num])])), // v6.03: contra el PISO (≥ referencia v6.00)
  viernes: Math.max(0, REF.viernes - EXT0.filter((r) => r.tipo === 'viernes').length),
  sabado: Math.max(0, REF.sabado - EXT0.filter((r) => r.tipo === 'sabado').length),
  tierC: Math.max(0, REF.tierC - EXT0.filter((r) => r.tierC).length), // v6.04: con la extensión al 22-oct hay MÁS Tier C que la referencia → 0
};
/** asignaturas con MÁS slots que la referencia (redondeo por resto mayor sobre menos slots): se conservan, nada se borra */
const SOBRANTE_BANCO = ASIGS.filter((a) => cuotaDeExt[a.num] > pisoDe[a.num]).map((a) => ({ num: a.num, asignatura: a.asignatura, n: cuotaDeExt[a.num] - pisoDe[a.num] }));
/** v6.03: asignaturas cuyo PISO supera la referencia v6.00 (slot de redondeo publicado y conservado) */
const PISO_EXTRA = ASIGS.filter((a) => pisoDe[a.num] > cuotaRef[a.num]).map((a) => ({ num: a.num, asignatura: a.asignatura, n: pisoDe[a.num] - cuotaRef[a.num] }));
/** orden de los focos repuestos: smooth weighted round-robin sobre los déficits (empate = orden de ASIGS, como cuotasYSecuencia) */
function secuenciaDeficit(cuotas) {
  const n = Object.values(cuotas).reduce((s, x) => s + x, 0);
  const cur = Object.fromEntries(ASIGS.map((a) => [a.num, 0])), usados = Object.fromEntries(ASIGS.map((a) => [a.num, 0]));
  const sec = [];
  for (let k = 0; k < n; k++) {
    let best = null;
    for (const a of ASIGS) {
      if (usados[a.num] >= cuotas[a.num]) continue;
      cur[a.num] += cuotas[a.num];
      if (best === null || cur[a.num] > cur[best]) best = a.num;
    }
    cur[best] -= n; usados[best] += 1; sec.push(best);
  }
  return sec;
}
const REPO_DESDE = addISO(F6.step1.examen, 1); // F5: mar 28-sep-2027 (protegidos 25-27-sep = ritual · viaje · EXAMEN)
const REPO_SALTADOS = []; // días MIR válidos sin fila: su tipo (banco/viernes/sábado) no tiene déficit
if (REPONER) {
  if (REPO_DESDE <= EXT_HASTA) throw new Error(`reposición: ${REPO_DESDE} no es posterior al tope de la extensión ${EXT_HASTA}`);
  const colaB = secuenciaDeficit(DEF.banco);
  let quedanV = DEF.viernes, quedanS = DEF.sabado;
  let lunesPrev = lunesDe(ROWS[ROWS.length - 1].fecha);
  for (const x of fechas(REPO_DESDE, addISO(REPO_DESDE, 400))) {
    if (!colaB.length && !quedanV && !quedanS) break;
    const tipo = esLunJue(x) && colaB.length ? 'banco' : x.dow === 5 && quedanV ? 'viernes' : x.dow === 6 && quedanS ? 'sabado' : null;
    if (!tipo) { REPO_SALTADOS.push(x.fecha); continue; }
    const lu = lunesDe(x.fecha);
    if (lu !== lunesPrev) { semana += 1; focosSemana.length = 0; lunesPrev = lu; }
    d += 1;
    const base = { d, fecha: x.fecha, wd: WD[x.dow], semana, fase: 'extension', modo: 'normal', tipo };
    if (tipo === 'viernes' || tipo === 'sabado') {
      quedanV -= tipo === 'viernes' ? 1 : 0; quedanS -= tipo === 'sabado' ? 1 : 0;
      const fallback = fallbackDe(colaB.length ? colaB : secuenciaExt, 0);
      ROWS.push({
        ...base, num: fallback, asignatura: byNum[fallback].asignatura, num2: null, asignatura2: null, nQ: 30, minQ: Math.round(30 * 77 / 60 * 10) / 10, minCorr: 11,
        tema: tipo === 'viernes'
          ? `VIERNES · 30Q reales de la asignatura PEOR del log (fallback: ${byNum[fallback].asignatura}) · 38,5 min cronometrados · neto semanal al log`
          : `SÁBADO · MINI-SIMULACRO 30Q reales MIR MIXTAS de las 14 asignaturas (77 s/Q · 38,5 min cronometrados · opción en blanco) + corrección −1/3 + neto por asignatura al log (asignatura de registro por defecto: ${byNum[fallback].asignatura})`,
        repuesta: REPUESTA,
      });
      continue;
    }
    const num = colaB.shift();
    focosSemana.push(num);
    const num2 = previos.length ? previos[previos.length - 1] : null;
    ROWS.push({
      ...base, num, asignatura: byNum[num].asignatura, num2, asignatura2: num2 ? byNum[num2].asignatura : null, nQ: 25, minQ: Math.round(25 * 77 / 60 * 10) / 10, minCorr: 13,
      tema: `BANCO · 25Q reales MIR: 15Q ${byNum[num].asignatura} + 10Q interleaving (${num2 ? byNum[num2].asignatura + ' y anteriores' : 'mixtas'}) · 32 min + 13 min corrección`,
      repuesta: REPUESTA,
    });
    previos.push(num);
  }
  if (colaB.length || quedanV || quedanS) throw new Error('reposición: no se pudieron colocar todas las sesiones');
  // Tier C de la reposición: el último lun-jue de cada semana repuesta sigue el ciclo de las 12 donde lo dejó la extensión
  const REPO0 = ROWS.filter((r) => r.repuesta);
  const semanasRepo = [...new Set(REPO0.filter((r) => r.tipo === 'banco').map((r) => r.semana))].sort((x, y) => x - y);
  if (semanasRepo.length < DEF.tierC) throw new Error(`reposición: ${DEF.tierC} Tier C para ${semanasRepo.length} semanas con banco (haría falta otro criterio)`);
  const k0 = EXT0.filter((r) => r.tierC).length;
  for (let j = 0; j < DEF.tierC; j++) {
    const k = k0 + j, t = TIER_C[k % TIER_C.length], vuelta = 2 + Math.floor(k / TIER_C.length);
    const slots = REPO0.filter((r) => r.semana === semanasRepo[j] && r.tipo === 'banco');
    aplicarTierC(slots[slots.length - 1], t, `extensión v6 · vuelta ${vuelta} del ciclo Tier C: SOLO preguntas no usadas (preguntasSinUsar) · repuesta ${REPUESTA} (la perdieron los corrimientos v6.01/v6.02/v6.03)`);
  }
  for (const r of REPO0) r.tema = `REPUESTA ${REPUESTA} (sesión que la extensión perdió con los corrimientos v6.01/v6.02/v6.03, re-fechada tras el examen Step 1) · ${r.tema}`;
}

// ── emitir ──
// v6.00: + campo `fase` ('mantenimiento' | 'extension'), tipo 'sabado', MIR_MANT_META.mant/ext, Tier C de la extensión,
// franja 'sabado' con su rama en mirMantFranjas() y mirFranjaPorTurno() (Turno de fechasV6, módulo hoja).
// v6.02c: + 'repuesta' (solo en las filas repuestas y al final → las filas existentes salen byte-idénticas y el regex de gen_revision_semanal sigue casando)
const KEYS = ['d', 'fecha', 'wd', 'semana', 'fase', 'modo', 'tipo', 'num', 'asignatura', 'num2', 'asignatura2', 'nQ', 'minQ', 'minCorr', 'tema', 'tierC', 'repuesta'];
const OPCIONALES = new Set(['tierC', 'repuesta']);
const rowTS = (r) => '{' + KEYS.filter((k) => !OPCIONALES.has(k) || r[k]).map((k) => k + ':' + JSON.stringify(r[k])).join(',') + '}';
const nRed = ROWS.filter((r) => r.modo === 'reducido').length;
const MANT = ROWS.filter((r) => r.fase === 'mantenimiento');
const EXT = ROWS.filter((r) => r.fase === 'extension');
const EXT_BASE = EXT.filter((r) => !r.repuesta); // v6.02c: la extensión hasta su tope (EXT_HASTA)
const REPO = ROWS.filter((r) => r.repuesta);     // v6.02c: sesiones repuestas tras el examen Step 1 (fase 'extension' + campo repuesta)
const cuenta = (arr, f) => arr.filter(f).length;
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmtLargo = (s) => `${WD[fromISO(s).getUTCDay()].toLowerCase()} ${+s.slice(8)}-${MESES[+s.slice(5, 7) - 1]}-${s.slice(0, 4)}`;
const TIERC_ROWS = ROWS.filter((r) => r.tierC);
const nTierCMant = cuenta(MANT, (r) => r.tierC);
const nTierCExt = cuenta(EXT, (r) => r.tierC);
const vueltaDe = (r) => (r.fase === 'mantenimiento' ? 1 : +((r.tierC.nota || '').match(/vuelta (\d+)/) || [0, 0])[1]);
// v6.02c: con reposición, el handoff es la última sesión del banqueo (la última repuesta, ya en F5) y no el último día antes del Step 1
const HANDOFF = `${fmtLargo(ROWS[ROWS.length - 1].fecha)} (${REPO.length ? `última sesión del banqueo; cierra las ${REPO.length} sesiones repuestas tras el examen Step 1 · ${REPUESTA}` : 'último día con estudio antes del Step 1'}) → fase principal MIR desde oct-2027: export JSON del log (mirEvalLog) + tabla de neto por asignatura + stats FSRS del deck APEX::MIR (retention 0,85 → 0,90)`;
const fmtCorto = (s) => `${WD[fromISO(s).getUTCDay()].toLowerCase()} ${+s.slice(8)}-${MESES[+s.slice(5, 7) - 1]}`;
const TXT_REPO = REPO.length
  ? `REPOSICIÓN de lo que la extensión perdió con los corrimientos v6.01/v6.02/v6.03 (v6.00 = ${MANT.length + REF.filas} filas: ${MANT.length} + ${REF.filas}; mecanismo v6.02c, recalculado en ${REPUESTA}):\n` +
    ` * +${REPO.length} filas d${REPO[0].d}-d${REPO[REPO.length - 1].d} (${fmtCorto(REPO[0].fecha)} → ${fmtLargo(REPO[REPO.length - 1].fecha)}, tras los protegidos del examen Step 1 · F5) = ` +
    `${cuenta(REPO, (r) => r.tipo === 'banco')} banco (${REPO.filter((r) => r.tipo === 'banco').map((r) => r.asignatura).join(' · ')}) · ${cuenta(REPO, (r) => r.tipo === 'viernes')} viernes ·\n` +
    ` * ${cuenta(REPO, (r) => r.tipo === 'sabado')} sábados · Tier C ${REPO.filter((r) => r.tierC).map((r) => `${r.tierC.asignatura} · ${r.tierC.capitulo} v${vueltaDe(r)} (${fmtCorto(r.fecha)})`).join(' + ') || '—'}. Cada sesión va en un día de SU tipo\n` +
    ` * (${REPO_SALTADOS.length ? 'sin fila: ' + REPO_SALTADOS.map(fmtCorto).join(' · ') : 'sin huecos'}); las ${MANT.length + EXT_BASE.length} filas anteriores no cambian; PISO por asignatura = máx(v6.00, extensiones publicadas ${PISO_PUBLICADO.map((x) => x.version + ' sobre ' + x.slotsExt + ' slots').join(' · ')}) → se conserva el slot extra de redondeo de ${PISO_EXTRA.concat(SOBRANTE_BANCO).map((x) => x.asignatura + ' (+' + x.n + ')').join(' · ') || '—'} (nada se borra).`
  : REPONER
    ? `REPOSICIÓN ${REPUESTA}: nada que reponer — la extensión hasta su tope (${fmtLargo(EXT_HASTA)}, día de plan anterior al ritual del examen Step 1 ${fmtLargo(F6.step1.examen)})\n` +
      ` * ya cubre la referencia v6.00 (${REF.filas} filas: ${REF.banco} lun-jue · ${REF.viernes} viernes · ${REF.sabado} sábados · ${REF.tierC} Tier C) y el PISO publicado por asignatura (máx(v6.00, ${PISO_PUBLICADO.map((x) => x.version + ' sobre ' + x.slotsExt + ' slots').join(' · ')})):\n` +
      ` * ${cuenta(EXT_BASE, (r) => r.tipo === 'banco')} lun-jue · ${cuenta(EXT_BASE, (r) => r.tipo === 'viernes')} viernes · ${cuenta(EXT_BASE, (r) => r.tipo === 'sabado')} sábados · ${cuenta(EXT_BASE, (r) => r.tierC)} Tier C (las repuestas de la v6.03 —mar 28-sep → mar 12-oct— quedan dentro de la extensión).`
    : 'sin reposición (--sin-reposicion: salida v6.02 original).';
const out = `/**
 * mirMantenimiento.ts — MIR modo BANQUEO PURO (mantenimiento ene→abr 2027 + EXTENSIÓN abr→${MESES[+EXT_HASTA.slice(5, 7) - 1]} 2027) · GENERADO por
 * DATA/_scripts/gen_mir_mantenimiento.js ${INICIO} ${FIN} --ext-hasta ${EXT_HASTA} — NO editar a mano.
 *
 * ${REPUESTA === 'v6.02c' ? 'v6.02c (18-oct-2026 · Joseph: «si se recortó algo, alárgalo»)' : REPUESTA === 'v6.03' ? 'v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; reposición v6.02c recalculada)' : 'v6.04 (21-oct-2026 · examen Step 1 → lun 25-oct; reposición recalculada)'}: ${TXT_REPO}
 * v6.04 (21-oct-2026 · examen Step 1 lun 27-sep → lun 25-oct-2027, decisión de Joseph): el tope de la extensión sigue al día de plan anterior al ritual →
 * vie 24-sep → ${fmtLargo(EXT_HASTA)}: la extensión crece (121 → ${EXT_BASE.length}) y sus cuotas lun-jue se reparten sobre ${nSlotsExt} slots; mantenimiento sin cambio.
 * v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; lun 19 y mar 20-oct sin estudio): la 1.ª vuelta termina el mié 10-feb → el mantenimiento CONSERVA sus 57 filas
 * re-fechadas desde el jue 11-feb (fin jue 6-may: sus 4 últimas filas, lun 3 → jue 6-may, caen ya en el SERUMS); la extensión mantiene su tope (vie 24-sep)
 * y absorbe (123 → 121); lo que pierde se repone tras el examen Step 1 (v6.02c: 9 repuestas hasta el vie 8-oct → v6.03: las de arriba).
 * v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct): la 1.ª vuelta termina el lun 8-feb → el mantenimiento CONSERVA sus 57 filas re-fechadas desde el
 * mar 9-feb (fin mar 4-may: sus 2 últimas filas, lun 3 y mar 4-may, caen ya en el SERUMS); la extensión mantiene su tope (vie 24-sep) y absorbe (128 → 123).
 * v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct): la 1.ª vuelta termina el lun 1-feb → el mantenimiento CONSERVA sus 57 filas (mismas cuotas,
 * misma secuencia y los mismos 12 Tier C) re-fechadas desde el mar 2-feb; la extensión mantiene su tope (vie 24-sep) y absorbe los 3 días (131 → 128).
 * v6.00 (6-oct-2026 · V6_ESPEC §D · DJ-4: MIR 1 h/día en TODAS las fases): ${ROWS.length} días =
 *  · MANTENIMIENTO ${MANT.length} (d${MANT[0].d}-d${MANT[MANT.length - 1].d} · ${MANT[0].fecha} → ${MANT[MANT.length - 1].fecha} · L-V: ${cuenta(MANT, (r) => r.tipo === 'banco')} lun-jue · ${cuenta(MANT, (r) => r.tipo === 'viernes')} viernes)
 *  · EXTENSIÓN ${EXT_BASE.length} (d${EXT_BASE[0].d}-d${EXT_BASE[EXT_BASE.length - 1].d} · ${EXT_BASE[0].fecha} → ${EXT_BASE[EXT_BASE.length - 1].fecha} · L-V hasta el SERUMS y L-S desde el ${SERUMS_INICIO}: ${cuenta(EXT_BASE, (r) => r.tipo === 'banco')} lun-jue · ${cuenta(EXT_BASE, (r) => r.tipo === 'viernes')} viernes · ${cuenta(EXT_BASE, (r) => r.tipo === 'sabado')} sábados; domingo libre)${REPO.length ? `
 *    ${REPO.length ? '+' : '·'} ${REPO.length} REPUESTAS ${REPUESTA} (d${REPO[0].d}-d${REPO[REPO.length - 1].d} · ${REPO[0].fecha} → ${REPO[REPO.length - 1].fecha} · fase 'extension' + campo repuesta: ${cuenta(REPO, (r) => r.tipo === 'banco')} lun-jue · ${cuenta(REPO, (r) => r.tipo === 'viernes')} viernes · ${cuenta(REPO, (r) => r.tipo === 'sabado')} sábados)` : ''}.
 * Salta SKIP (${[...SKIP_FIJOS].join(' · ')}) y los DÍAS PROTEGIDOS v6 (${[...PROTEGIDOS].join(' · ')}) — fuente única:
 * DATA/_scripts/_fechas_v6.json (los protegidos v5.20 22-feb / 9-mar / 10-mar ya no existen). Sin modo reducido (eliminado en v6.00).
 * Franja: 15:15-16:15 hasta el SERUMS; en F4 según el turno del día (mirFranjaPorTurno): M 16:00-17:00 · T 10:35-11:35 ·
 * L 15:15-16:15 · día de hito 04:05-05:05 (plantilla H) · G = 1 h en tiempo muerto de la guardia (lo que no se termine se suma al día de plan siguiente).
 * Sin contenido nuevo: retrieval sobre las 14 asignaturas de la 1ª vuelta (mirDailyPlan D1-D76).
 *  · normal:   15:15-15:30 Anki APEX::MIR · 15:30-16:02 25Q reales MIR (15Q foco + 10Q interleaving · 77 s/Q) · 16:02-16:15 corrección −1/3 + Whole-Page + log
 *  · viernes:  15:15-15:25 Anki · 15:25-16:04 30Q de la asignatura PEOR del log (mirEvalLog) · 16:04-16:15 corrección + neto semanal
 *  · sábado (v6, solo en el SERUMS): 15:15-15:25 Anki · 15:25-16:04 MINI-SIMULACRO 30Q MIXTAS de las 14 asignaturas · 16:04-16:15 corrección + neto por asignatura
 * Rotación lun-jue ponderada por Peso MIR global (ProMIR intro, mirDetalleData.pesoGlobal) → cuotas del mantenimiento: ${ASIGS.map((a) => a.asignatura.split(' ')[0] + ' ' + cuotaDe[a.num]).join(' · ')}
 * · cuotas de la extensión (${nSlotsExt} slots): ${ASIGS.map((a) => a.asignatura.split(' ')[0] + ' ' + cuotaDeExt[a.num]).join(' · ')}${REPO.length ? ` · reposición ${REPUESTA} (${cuenta(REPO, (r) => r.tipo === 'banco')} slots = PISO (cuotas de v6.00 sobre ${REF.banco}, o las publicadas si eran más) − las de arriba): ${ASIGS.filter((a) => DEF.banco[a.num]).map((a) => a.asignatura.split(' ')[0] + ' ' + DEF.banco[a.num]).join(' · ')}` : ''}.
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
  /** v6.02c/v6.03: sesión REPUESTA tras el examen Step 1 (la extensión la perdió con los corrimientos v6.01/v6.02/v6.03; valor = versión que la recalculó); ausente en el resto */
  repuesta?: string;
}
export const MIR_MANT_META = {
  inicio: '${ROWS[0].fecha}', fin: '${ROWS[ROWS.length - 1].fecha}', totalDias: ${ROWS.length}, // = MIR_MANT_DIAS.length (mantenimiento + extensión; lo usa la navegación de MirTodayPlan)
  mant: { inicio: '${MANT[0].fecha}', fin: '${MANT[MANT.length - 1].fecha}', totalDias: ${MANT.length} },
  ext: { inicio: '${EXT[0].fecha}', fin: '${EXT[EXT.length - 1].fecha}', totalDias: ${EXT.length}, serumsDesde: '${SERUMS_INICIO}', sabados: ${cuenta(EXT, (r) => r.tipo === 'sabado')},
    /** v6.02c: último día de la extensión ANTES del Step 1 (EXT_HASTA) y filas hasta ahí; fin/totalDias incluyen las repuestas */
    tope: '${EXT_BASE[EXT_BASE.length - 1].fecha}', totalDiasHastaTope: ${EXT_BASE.length},
    repuestas: ${REPO.length ? `{ desde: '${REPO[0].fecha}', hasta: '${REPO[REPO.length - 1].fecha}', totalDias: ${REPO.length}, banco: ${cuenta(REPO, (r) => r.tipo === 'banco')}, viernes: ${cuenta(REPO, (r) => r.tipo === 'viernes')}, sabados: ${cuenta(REPO, (r) => r.tipo === 'sabado')}, tierC: ${JSON.stringify(REPO.filter((r) => r.tierC).map((r) => `${r.tierC.asignatura} · ${r.tierC.capitulo} v${vueltaDe(r)}`))}, sinFila: ${JSON.stringify(REPO_SALTADOS)}, referencia: 'v6.00 = ${MANT.length + REF.filas} filas (${MANT.length} mant. + ${REF.filas} ext.: ${REF.banco} lun-jue · ${REF.viernes} viernes · ${REF.sabado} sábados · ${REF.tierC} Tier C)', nota: 'sesiones que la extensión perdió con los corrimientos v6.01/v6.02/v6.03 (Joseph 18-oct: «si se recortó algo, alárgalo» · 20-oct: «simplemente corre, alarga las fechas límite»), re-fechadas a los primeros días MIR válidos tras el examen Step 1, cada una en un día de su tipo; Tier C = último lun-jue de cada semana' }` : 'null'} as null | { desde: string; hasta: string; totalDias: number; banco: number; viernes: number; sabados: number; tierC: string[]; sinFila: string[]; referencia: string; nota: string },
  },
  modoReducidoHasta: ${REDUCIDO_HASTA ? `'${REDUCIDO_HASTA}'` : 'null'} as string | null, diasReducidos: ${nRed}, segPorQ: 77,
  bloque: '1 h/día (DJ-4) · 15:15–16:15 hasta el SERUMS; en F4 según el turno (M 16:00 · T 10:35 · L 15:15 · hito 04:05 · G tiempo muerto) · Anki APEX::MIR + 25Q reales MIR mixtas (77 s/Q) + corrección · viernes 30Q de la asignatura peor del log · sábado (SERUMS) 30Q mixtas de las 14 · 1 slot/semana Tier C express (10Q de una asignatura fuera del plan)',
  tierC: { slots: ${nTierCMant}, slotsExt: ${nTierCExt}, regla: 'último slot lun-jue de las semanas 1-12 del mantenimiento (y de cada semana de la extensión, repitiendo el ciclo de las 12 con preguntas no usadas): sus 10Q interleaving pasan a ser 10Q del capítulo top-1 de una asignatura fuera del plan; ningún minuto nuevo; se registran con la asignatura Tier C', cobertura: 'con las 12 asignaturas Tier C + Dermatología (bloque 13:30) el examen medido pasa de ~80 % a ~95 % del peso ProMIR (A VERIFICAR con la tabla de pesos de DATA/MIR/README.md)' },
  handoff: '${HANDOFF}',
};
/** Peso MIR global por asignatura (texto real del capítulo intro de ProMIR · mirDetalleData.pesoGlobal) y cuota de slots lun-jue (mantenimiento · extensión). */
export const MIR_MANT_PESOS: Array<{ num: number; asignatura: string; peso: number; fuente: string; slots: number; slotsExt: number; slotsRepo: number }> = [${ASIGS.map((a) => JSON.stringify({ num: a.num, asignatura: a.asignatura, peso: a.peso, fuente: a.fuente, slots: cuotaDe[a.num], slotsExt: cuotaDeExt[a.num], slotsRepo: cuenta(REPO, (r) => r.tipo === 'banco' && r.num === a.num) })).join(',')}];
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
for (const r of ROWS) if (r.tipo === 'banco' && !r.repuesta) { const u = r.fase === 'mantenimiento' ? usadosMant : usadosExt; u[r.num] = (u[r.num] || 0) + 1; } // v6.02c: las repuestas se verifican aparte
for (const a of ASIGS) {
  if ((usadosMant[a.num] || 0) !== cuotaDe[a.num]) errs.push(`cuota mantenimiento ${a.asignatura}: ${usadosMant[a.num] || 0} ≠ ${cuotaDe[a.num]}`);
  if ((usadosExt[a.num] || 0) !== cuotaDeExt[a.num]) errs.push(`cuota extensión ${a.asignatura}: ${usadosExt[a.num] || 0} ≠ ${cuotaDeExt[a.num]}`);
}
if (EXT_BASE[EXT_BASE.length - 1].fecha !== EXT_HASTA && V6.esDiaPlan(EXT_HASTA, 'mir', F6)) errs.push('la extensión no termina en --ext-hasta ' + EXT_HASTA);
// v6.02c · reposición: (a) las repuestas van DESPUÉS del examen Step 1, en los primeros días MIR válidos de su tipo, y no hay filas entre el tope y ellas;
// (b) total de sesiones y de Q ≥ v6.00 (mant + referencia) y cada tipo = referencia (banco = referencia + el sobrante de redondeo que se conserva);
// (c) cada asignatura foco tiene ≥ los slots lun-jue de v6.00; (d) multiconjunto Tier C (asignatura · capítulo · vuelta) = el de v6.00 (ciclo completo).
if (REPONER) {
  const fueraDeOrden = ROWS.filter((r) => r.fecha > EXT_HASTA && !r.repuesta).concat(REPO.filter((r) => r.fecha <= F6.step1.examen));
  if (fueraDeOrden.length) errs.push('reposición: filas fuera de su tramo ' + fueraDeOrden.map((r) => r.fecha).join(','));
  const validos = [...fechas(REPO_DESDE, REPO.length ? REPO[REPO.length - 1].fecha : REPO_DESDE)].map((x) => x.fecha);
  const huecos = validos.filter((f) => !REPO.some((r) => r.fecha === f));
  if (JSON.stringify(huecos) !== JSON.stringify(REPO_SALTADOS)) errs.push('reposición: huecos no justificados ' + huecos.join(','));
  for (const f of REPO_SALTADOS) { const w = fromISO(f).getUTCDay(); const t = w === 5 ? 'viernes' : w === 6 ? 'sabado' : 'banco'; if (REPO.some((r) => r.tipo === t && r.fecha > f)) errs.push(`reposición: ${f} sin fila pero hay ${t} repuesto después`); }
  const nTipo = (arr, t) => cuenta(arr, (r) => r.tipo === t);
  const sobr = SOBRANTE_BANCO.reduce((x, y) => x + y.n, 0);
  if (nTipo(EXT, 'banco') !== PISO_TOTAL + sobr) errs.push(`reposición: banco ext ${nTipo(EXT, 'banco')} ≠ piso ${PISO_TOTAL} (referencia ${REF.banco} + publicado ${PISO_TOTAL - REF.banco}) + sobrante ${sobr}`);
  if (nTipo(EXT, 'viernes') < REF.viernes || nTipo(EXT, 'sabado') < REF.sabado) errs.push('reposición: viernes/sábados < referencia');
  if (cuenta(EXT, (r) => r.tierC) < REF.tierC) errs.push(`reposición: Tier C ext ${cuenta(EXT, (r) => r.tierC)} < referencia ${REF.tierC}`); // v6.04: ≥ (antes =)
  if (ROWS.length < MANT.length + REF.filas) errs.push(`reposición: ${ROWS.length} sesiones < v6.00 ${MANT.length + REF.filas}`);
  const qRef = MANT.reduce((x, r) => x + r.nQ, 0) + REF.banco * 25 + (REF.viernes + REF.sabado) * 30;
  if (ROWS.reduce((x, r) => x + r.nQ, 0) < qRef) errs.push('reposición: preguntas < v6.00 ' + qRef);
  for (const a of ASIGS) {
    const n = cuenta(EXT, (r) => r.tipo === 'banco' && r.num === a.num);
    if (n < cuotaRef[a.num]) errs.push(`reposición: ${a.asignatura} ${n} slots de extensión < v6.00 ${cuotaRef[a.num]}`);
    if (n < pisoDe[a.num]) errs.push(`reposición: ${a.asignatura} ${n} slots de extensión < piso publicado ${pisoDe[a.num]} (nada se borra)`);
  }
  const clave = (t, v) => `${t.asignatura} · ${t.capitulo} · v${v}`;
  const esperado = TIER_C.map((t) => clave(t, 1)).concat(Array.from({ length: REF.tierC }, (_, k) => clave(TIER_C[k % TIER_C.length], 2 + Math.floor(k / TIER_C.length)))).sort();
  const real = TIERC_ROWS.map((r) => clave(r.tierC, vueltaDe(r))).sort();
  // v6.04: el multiconjunto real CONTIENE el de la v6.00 (cada asignatura · capítulo · vuelta al menos esas veces); con la extensión más larga hay de más
  { const resto = [...real]; const faltanTC = esperado.filter((k) => { const i = resto.indexOf(k); if (i < 0) return true; resto.splice(i, 1); return false; });
    if (faltanTC.length) errs.push('reposición: multiconjunto Tier C sin las entradas de la v6.00 ' + faltanTC.join(' | ')); }
  for (const r of REPO.filter((x) => x.tierC)) { const lj = REPO.filter((x) => x.semana === r.semana && x.tipo === 'banco'); if (lj[lj.length - 1] !== r) errs.push('reposición: Tier C no es el último lun-jue de su semana ' + r.fecha); }
}
if (errs.length) { console.error('ERRORES:', errs); process.exit(1); }
console.log(`Wrote src/lib/mirMantenimiento.ts · ${ROWS.length} días (${ROWS[0].fecha} → ${ROWS[ROWS.length - 1].fecha})`);
console.log(`  mantenimiento ${MANT.length} (${MANT[0].fecha} → ${MANT[MANT.length - 1].fecha}) · lun-jue ${nSlots} · viernes ${cuenta(MANT, (r) => r.tipo === 'viernes')} · reducidos ${nRed} (REDUCIDO_HASTA ${REDUCIDO_HASTA})`);
console.log(`  extensión ${EXT.length} (${EXT[0].fecha} → ${EXT[EXT.length - 1].fecha}) · L-V antes del SERUMS ${cuenta(EXT, (r) => r.fecha < SERUMS_INICIO)} · L-S en el SERUMS ${cuenta(EXT, (r) => r.fecha >= SERUMS_INICIO)} · lun-jue ${cuenta(EXT, (r) => r.tipo === 'banco')} (${nSlotsExt} hasta el tope + ${cuenta(REPO, (r) => r.tipo === 'banco')} repuestos) · viernes ${cuenta(EXT, (r) => r.tipo === 'viernes')} · sábados ${cuenta(EXT, (r) => r.tipo === 'sabado')}`);
console.log('  Tier C mantenimiento: ' + MANT.filter((r) => r.tierC).map((r) => `${r.wd} ${r.fecha}`).join(' · '));
console.log(`  Tier C extensión: ${nTierCExt} (primero ${EXT.find((r) => r.tierC).fecha} · último ${EXT.filter((r) => r.tierC).pop().fecha})`);
console.log('Cuotas lun-jue mantenimiento: ' + ASIGS.map((a) => `${a.asignatura} ${cuotaDe[a.num]}`).join(' · '));
console.log('Cuotas lun-jue extensión: ' + ASIGS.map((a) => `${a.asignatura} ${cuotaDeExt[a.num]}`).join(' · '));
if (REPO.length) {
  console.log(`Reposición ${REPUESTA} (referencia v6.00: ${MANT.length + REF.filas} filas · ext ${REF.filas} = ${REF.banco} lun-jue · ${REF.viernes} viernes · ${REF.sabado} sábados · ${REF.tierC} Tier C): +${REPO.length} filas · sin fila: ${REPO_SALTADOS.join(', ') || '—'} · sobrante conservado: ${SOBRANTE_BANCO.map((x) => x.asignatura + ' +' + x.n).join(', ') || '—'}`);
  for (const r of REPO) console.log(`  d${r.d} ${r.wd} ${r.fecha} S${r.semana} ${r.tipo} ${r.asignatura}${r.asignatura2 ? ' + ' + r.asignatura2 : ''} ${r.nQ}Q${r.tierC ? ' · TIER C ' + r.tierC.asignatura + ' · ' + r.tierC.capitulo + ' v' + vueltaDe(r) : ''}`);
}
