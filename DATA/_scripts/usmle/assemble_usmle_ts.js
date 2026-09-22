// Ensambla src/lib/usmleStep1Daily.ts v5 a partir de usmle_dias_v5.txt
const fs = require('fs');
const dias = fs.readFileSync(__dirname + '/usmle_dias_v5.txt', 'utf8').trim();

const header = `/**
 * usmleStep1Daily.ts — Plan DÍA A DÍA USMLE Step 1 · v5 MAESTRO (reestructuración 27-ago-2026).
 * D1 = MIÉ 2026-09-23 → D95 = VIE 2027-02-05 (v5.15: 31-ago→22-sep no estudiados = 17 hábiles perdidos).
 * EXAMEN: target LUN 8-FEB-2027 (fuera de la ventana original 25-29 ene desde la v5.12). D94 jue 4-feb = última sesión
 * de banco; D95 vie 5-feb = D-1 DENTRO del plan (sesión mínima AM + ritual); el finde 6-7 feb queda libre entre el D95 y el examen. Joseph debe agendar/reprogramar el Prometric y
 * confirmar el eligibility period; desde aquí cada día no estudiado mueve el examen un hábil más (o exige recortar).
 * v5.15 (22-sep-2026) · CORRIMIENTO RÍGIDO, pedido por Joseph: el plan ENTERO (contenido + los 12 hitos) se desplaza en
 * bloque +2 días hábiles, así que **cada NBME/UWSA conserva su D# y sus días de contenido por delante** (antes los 11
 * hitos estaban anclados por fecha y cada corrimiento les robaba preparación: "aumenta los días, no pierdas NBME").
 * El UWSA1 sigue siendo el D1 (vie 11 → lun 14 → mar 15 → mié 16 → jue 17 → lun 21 → mié 23-sep). El contenido arranca
 * el jue 24-sep (D2). NADA se fusionó ni se recortó: el temario sale 1:1 y el desfase se absorbe por la cola.
 * ⚠ Efecto visible: los hitos dejan de caer en viernes (NBME 25-29, NBME 30, UWSA2 y NBME 31 pasan a MARTES; NBME 32 mié,
 * NBME 33 vie, Free 120 mar). A cambio, los viernes quedan libres para bloques de nivel 3/4 (5 viernes N3 + 2 N4).
 * Step 1 es AHORA el bloque PRINCIPAL: 6h15/día L-V (05:00 Anki AM + mañana 07:15-12:00 + eval 18:00).
 * Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
 *
 * FASES (v5.15, recalculadas sobre las fechas reales): A · Contenido por sistemas D1-D81 (23-sep→lun 18-ene, ~40Q
 *            uWorld/día = 1ª vuelta del banco completo; el temario sale 1:1, NADA se fusionó ni se recortó en este
 *            corrimiento — los 2 días dobles de Bioquímica vienen de la v5.7 y siguen conservando todos sus temas)
 *            corrimiento; el UWSA2 mar 12-ene = D77 cae DENTRO de la Fase A y el cierre de Bioquímica pasa al lun 18-ene = D81)
 *        B · Banco intensivo D82-D86 (19-ene→25-ene: el NBME 31 GO/NO-GO abre la fase el día siguiente al cierre de contenido,
 *            random timed 2×40Q + sistema débil D84 jue 21 y D86 lun 25-ene, NBME 32 mié 20 y NBME 33 vie 22-ene dentro)
 *        C · Sprint final D87-D95 (26-ene→5-feb, Free 120 + banco + taper; D88 27-ene y D89 28-ene random timed, D90 29-ene y D91 1-feb
 *            incorrects 2ª pasada, D92 mar 2-feb y D93 mié 3-feb AMBOSS 200 mitades 1 y 2 — alojados dentro del sprint; D94-D95 taper)
 * HITOS (v5.15: todos corren con el plan y conservan su D#): UWSA1 mié 23-sep (baseline, D1) · NBME 25 mar 6-oct · 26 mar 27-oct ·
 *        27 mar 17-nov · 28 mar 8-dic · 29 mar 22-dic · NBME 30 mar 5-ene · UWSA2 mar 12-ene · NBME 31 mar 19-ene (GO/NO-GO) ·
 *        NBME 32 mié 20 / NBME 33 vie 22 / Free 120 mar 26-ene.
 * GO/NO-GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar fecha.
 * Jerarquía de material: Path→Pathoma · Micro/Pharm→Sketchy · Physio/Biochem/Anat→AMBOSS+B&B · Behav/Biostats→First Aid.
 * Método Palmerton: comprensión fisiológica > memorización · tarjetas Anki de MECANISMO (FSRS) ·
 * pre-test ciego → active reading → free recall → preguntas → log de errores.
 * v5.10-Palmerton (12-sep-2026, vigente en v5.15): cada día lleva nivelUW (1-5 = los 5 niveles de maestría UWorld) y qDia (Q objetivo);
 * el gate de progresión (80% en 10Q) vive en USMLE_GATE y se mide en usmleScores.ts (localStorage + Supabase usmle_daily_scores).
 * Fase A = niveles 1→3 (+ dosis de 4 en la eval 18:00) · Fase B = 4→5 · Fase C = 5 + NBME/Free 120.
 * 12-sep-2026 (tarde) · divergencias Palmerton implementadas SIN tocar horario, temario ni fechas:
 *  · VIERNES DE NIVEL 4 (#6): desde S11 los viernes sin hito de Fase A que serían nivel 3 pasan a nivel 4 (v5.15: D53 vie 4-dic, Heme;
 *    y D63 vie 18-dic, Micro — con los hitos fuera de los viernes hay dos, no uno)
 *    (20-30Q timed mixtos de sistemas dominados + 10Q tutor); flag VIERNES_N4_DESDE_SEMANA en gen_usmle_v5.js. El texto vive
 *    en DIAS[].franjaNota; el subtema no cambia.
 *  · TAPER (#22): D94 (jue 4-feb, D-2 = última sesión de banco) y D95 (vie 5-feb, D-1 dentro del plan) = 20Q flagged + Anki maduro, cero contenido nuevo (franjaNota);
 *    v5.15: D95 = sesión mínima AM + ritual de test-day → USMLE_TAPER; el finde 6-7 feb queda libre entre el D95 y el examen (solo Anki vencido y repetir el ritual el domingo);
 *    examen target LUN 8-FEB-2027 (fuera de la ventana 25-29 ene desde la v5.12).
 *  · BURNOUT (#29): regla en usmleScores.gateHito → 'ALERTA BURNOUT' cuando 2 hitos consecutivos quedan bajo su mínimo.
 */
export const QBV = 'https://qbankly.app/videos';
export const QBQ = 'https://qbankly.app/qbanks';
export const QBF = 'https://qbankly.app/flashcards';
export const QBL = 'https://qbankly.app/library';
export const yt = (id: string) => 'https://www.youtube.com/watch?v=' + id;

export const DAILY_META = {
  step: 1, inicio: '2026-09-23', fin: '2027-02-05', totalDias: 95, // v5.15 (22-sep): corrimiento RÍGIDO (los hitos también corren) · D95 = vie 5-feb = D-1 dentro del plan · examen target lun 8-feb-2027
  bloque: '05:00 ANKI AM · 07:15 repaso anclado · 08:15 PRE-TEST 10Q · 09:00 DEEP PRIME 2h · 11:00 30Q consolidación · 18:00 eval modo examen (6h15/día)',
  /** Ventana original (25-29 ene), superada desde la v5.12; v5.15: el plan termina el vie 5-feb. */
  examenVentana: '2027-01-25 → 2027-01-29 (superada desde v5.12; v5.15: D95 = vie 5-feb)',
  /** Target de examen v5.15 (22-sep): lun 8-feb-2027, primer hábil tras el D95 (el finde 6-7 feb queda libre). Agendar/reprogramar Prometric y confirmar eligibility period (decisión de Joseph: o esto, o recortar). */
  examenTarget: '2027-02-08',
  /** D-1 = vie 5-feb = D95, DENTRO del plan (sesión mínima AM + ritual de test-day; USMLE_TAPER.dMenos1). Sáb 6 y dom 7-feb libres: repetir el ritual el domingo. */
  descansoD1: '2027-02-05',
  /** Viernes de nivel 4 desde esta semana del plan (S1 = semana del D1) — flag VIERNES_N4_DESDE_SEMANA de gen_usmle_v5.js. 0 = desactivado. */
  viernesN4DesdeSemana: 11,
  // Palmerton v3 (5-sep-2026): la regla que gobierna el volumen. Nivel del día = DIAS[].nivelUW; gate = USMLE_GATE.
  metodo: 'Palmerton · 5 niveles UWorld: NO se sube de nivel sin ≥80% en 10Q consecutivas del nivel actual (validación ≤24-48 h). Nivel 1-2 = subtema (5Q tutor → 5Q timed) · nivel 3 = sistema completo timed (viernes sin hito hasta S10) · nivel 4 = mixto de sistemas dominados (eval 18:00 diaria + viernes sin hito desde S11 + Fase B) · nivel 5 = 40Q random timed (Fases B-C + hitos). Si <80%: repetir bloques de 5Q del subtema fallado y auditar recursos/comprensión/aplicación/memoria; nunca avanzar de tema. Taper D94 jue 4-feb (última sesión de banco) + D95 vie 5-feb (D-1 dentro del plan: sesión mínima + ritual) · finde 6-7 feb libre · examen lun 8-feb (v5.15).',
};

/** Gate de progresión Palmerton (UWorld Complete Guide · 80% Mastery Method). */
export const USMLE_GATE = {
  pct: 80, nQ: 10, ventanaHoras: 48,
  regla: 'No subir de nivel sin ≥80% en 10Q consecutivas del nivel actual, validadas ≤24-48 h después de estudiar el subtema.',
  siFalla: 'Si <80%: NO avanzar de tema. Repetir bloques de 5Q del subtema fallado y auditar en orden: (1) recursos, (2) comprensión (¿memoricé?), (3) aplicación a caso nuevo, (4) memoria/Anki. Si en 1-2 días no llega al 80%, el método está roto: ajustar YA.',
  medida: 'Gate del día en la app = % de la consolidación de las 11:00 (Fase A) o del bloque timed del día (Fases B-C). El % de UWorld es gate de proceso, no predicción: solo el NBME predice.',
};

export type NivelUW = 1 | 2 | 3 | 4 | 5;
export interface NivelUWInfo { nivel: NivelUW; nombre: string; formato: string; qDia: string; umbral: string; dondeVive: string; fase: string; color: string }
/** Los 5 niveles de maestría UWorld (Palmerton, "UWorld Complete Guide: The Five Levels of Mastery to 260+") mapeados a las fases A/B/C del plan v5.15. */
export const USMLE_NIVELES: NivelUWInfo[] = [
  { nivel: 1, nombre: 'Subtema · tutor sin tiempo', fase: 'A', formato: 'Bloques de 5Q de UN solo subtema · modo tutor · sin reloj (aprender a leer: CCSN + SAQ + cover-the-options)', qDia: 'Palmerton 20-30Q/día → plan: 30Q (10 pre-test + 20 consolidación)', umbral: '80% en 10Q consecutivas del subtema, ≤24-48 h tras estudiarlo', dondeVive: '08:15 PRE-TEST del tema nuevo (siempre) · 11:00 los 2 primeros días de cada sistema', color: '#7C8496' },
  { nivel: 2, nombre: 'Subtema · timed', fase: 'A', formato: 'Bloques de 5Q del subtema · cronometrado (90 s/Q · tope 2 min: adivinar, marcar, avanzar)', qDia: 'Volumen creciente → plan: 40Q (10 + 30)', umbral: '80% en ≥3 subtemas distintos, ≥1 validado en <48 h', dondeVive: '11:00 CONSOLIDACIÓN desde el 3er día de cada sistema (subtemas ya validados) · 07:15: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q)', color: '#4F7DD6' },
  { nivel: 3, nombre: 'Sistema completo · timed', fase: 'A', formato: 'Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema)', qDia: 'Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor)', umbral: '80% en 20Q timed consecutivas del sistema', dondeVive: 'VIERNES sin NBME/UWSA a las 11:00 hasta S10 (v5.15: D8 y D13 Cardio · D28 Renal · D33 GI · D48 Neuro; los viernes que abren sistema —D3 Fundamentos, D18 Resp, D23 Renal, D38 Endo, D43 Neuro, D58 Micro, D68 Repro, D80 Bioquímica— quedan en nivel 1): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4', color: '#6BB8B0' },
  { nivel: 4, nombre: 'Sistemas mixtos · timed', fase: 'A (dosis diaria + viernes desde S11) → B', formato: 'Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión)', qDia: 'Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q)', umbral: '80% en bloques mixtos de 20Q timed de ≥3 sistemas', dondeVive: '18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · VIERNES sin hito desde S11 (v5.15: D53 vie 4-dic Heme y D63 vie 18-dic Micro — con los hitos fuera de los viernes hay dos) = 20-30Q mixtos timed a las 11:00 en vez de sistema único (DIAS[].franjaNota) · Fase B D84 y D86 + Fase C D88 y D89 (random timed 2×40Q + sistema débil)', color: '#C8A96A' },
  { nivel: 5, nombre: 'Mixto completo 40Q · timed', fase: 'B → C (+ todos los hitos)', formato: 'Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen', qDia: 'Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120', umbral: '80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%)', dondeVive: '05:00 STRESS SET 10Q/12min (Fases B-C) · NBME 31 D82 (GO/NO-GO, el día siguiente al cierre de contenido) · D90 y D91 (incorrects 2ª pasada + sistema débil #3), D92 y D93 (AMBOSS 200 mitades 1-2, banco dentro del sprint; v5.15: mar 2 y mié 3-feb) · Fase C (NBME 32/33 + Free 120 + taper D94-D95) · hitos = formato nivel 5 como MEDICIÓN, no como progresión', color: '#C56A5A' },
];

/** Franjas horarias fijas del bloque USMLE (Google Calendar v5.2 · L-V) · nivel UWorld y gate por franja (Palmerton v3). Las HORAS no cambian. */
export const FRANJAS = [
  { hora: '05:00–05:45', fase: 'ANKI AM (madrugada fresca · pasada principal FSRS · Good ≈90% / Again solo olvido real · ≤50 nuevas/día) · Fases B-C: + STRESS SET 10Q/12min (primer instinto, sin cambiar respuestas)', tipo: 'anki', nivel: 'B-C: 5', gate: '—' },
  { hora: '07:15–08:15', fase: 'Repaso anclado multi-temporal D-1/D-3/D-7 + free recall (Anki restante) · VALIDACIÓN 24-48 h: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q)', tipo: 'anki', nivel: '2', gate: 'subtema de ayer ≥80% en las 10Q (5 aquí + 5 en la consolidación) → validado · <80% → 5Q más del subtema antes de pasar a otro' },
  { hora: '08:15–09:00', fase: 'PRE-TEST: 10Q uWorld ciegas del tema NUEVO (tutor · SIN tiempo) + free recall 90s = UWorld primero para DIAGNOSTICAR, First Aid después para tratar', tipo: 'pretest', nivel: '1', gate: 'sin gate: es diagnóstico (40-60% es normal) · cada duda, incluso en aciertos, va a la shopping list' },
  { hora: '09:00–11:00', fase: 'DEEP PRIME: vídeo B&B/Pathoma/Sketchy + First Aid active reading (Whole Page Rule: la página completa, no el dato fallado) + tarjetas Anki de MECANISMO (≤10, patogenia→presentación, en voz alta antes de escribir)', tipo: 'read', nivel: '—', gate: '—' },
  { hora: '11:00–12:00', fase: 'CONSOLIDACIÓN por nivel del día (DIAS[].nivelUW): nivel 1 = 20Q en bloques 5Q tutor del subtema (días 1-2 del sistema) · nivel 2 = 30Q en bloques 5Q timed de subtemas validados (incluye 5Q del subtema de ayer = 2ª mitad del gate) · nivel 3 (viernes sin hito hasta S10) = 20Q sistema completo timed + 10Q tutor · nivel 4 (viernes sin hito desde S11) = 20-30Q timed MIXTOS de sistemas dominados + 10Q tutor del subtema · taper D94-D95 = 20Q flagged, nada nuevo · revisión = Educational Objective + shopping list + log de errores (knowledge / transfer / proceso)', tipo: 'eval', nivel: '1→4 (nivelUW del día)', gate: '≥80% → mañana sube de nivel · <80% → repetir 5Q del subtema fallado, NO avanzar (registrar en 📏 Medición)' },
  { hora: '18:00–18:45', fase: 'EVALUACIÓN ACUMULATIVA modo examen: 10Q mixta timed (90 s/Q · tope 2 min · cover-the-options · juez, no abogado) + corrección + APEX · Fase A = dosis diaria de nivel 4 · día de hito: registrar aquí el % del NBME/UWSA/Free 120', tipo: 'exam', nivel: '4 (Fase A) · 5 (B-C)', gate: '≥80% sostenido = listo para mezclar sistemas · hitos: comparar con el mínimo on-track del viernes (usmleScores.HITOS_ONTRACK)' },
];

export interface DiaUSMLE {
  d: number; fecha: string; system: string; tier: 'CORE'|'HIGH'|'MED';
  sub: string; bbCh: string; bbVid: string; uw: string; mat: string; matType: string;
  palm: { id: string; t: string } | null;
  /** Nivel de maestría UWorld del día (1-5, Palmerton) — ver USMLE_NIVELES · generado por gen_usmle_v5.js */
  nivelUW: NivelUW;
  /** Q uWorld objetivo del día (pre-test + consolidación; hitos = Q del simulacro; Fases B-C = bloques timed) */
  qDia: number;
  /** Texto extra de la franja 11:00 (viernes de nivel 4 desde S11 · taper D94-D95). NO es contenido: el subtema es \`sub\`. */
  franjaNota?: string;
}
`;

const footer = `

export function diaDe(fechaISO: string): DiaUSMLE | undefined { return DIAS.find(x => x.fecha === fechaISO); }
/** Día anterior LITERAL del plan (D-1, puede ser un hito 🎯). Para el repaso anclado usar diaPrevio / ultimoDiaContenido. */
export function diaAnterior(d: DiaUSMLE): DiaUSMLE | undefined { return DIAS.find(x => x.d === d.d - 1); }
/**
 * Día previo de CONTENIDO: salta los hitos 🎯 (fix #6 de la 2.ª capa, 19-sep-2026). En v5.15 (mismos D# que v5.14: corrimiento rígido) los días post-hito son
 * D2, D11, D26, D41, D56, D66, D73, D78, D83, D84, D86 y D88: la tarjeta 07:15 valida el último SUBTEMA, no el NBME.
 * D2 (tras el UWSA1) no tiene día previo de contenido → undefined.
 */
export function diaPrevio(d: DiaUSMLE): DiaUSMLE | undefined {
  for (let k = d.d - 1; k >= 1; k--) { const x = DIAS.find(y => y.d === k); if (x && !esHito(x)) return x; }
  return undefined;
}
/** Alias con el nombre que propuso el crítico de completitud (#6). */
export const ultimoDiaContenido = diaPrevio;
export function ventana7d(fromD: number): DiaUSMLE[] { return DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }
export const TIER_INFO: Record<string,{c:string;t:string}> = { CORE:{c:'#E5484D',t:'Core'}, HIGH:{c:'#F5A623',t:'Alto'}, MED:{c:'#3FB984',t:'Medio'} };
/** Fase del plan por número de día (v5.15, mismos D# que v5.14: el corrimiento fue rígido): A contenido D1-81 (23-sep→18-ene; UWSA2 D77 dentro) · B banco D82-86 (19→25-ene: NBME 31 abre, random timed D84/D86, NBME 32/33 dentro) · C sprint D87-95 (26-ene→5-feb). */
export function faseDe(d: number): 'A' | 'B' | 'C' { return d <= 81 ? 'A' : d <= 86 ? 'B' : 'C'; }
/** Ficha del nivel UWorld (1-5); fuera de rango → nivel 1. */
export function nivelInfo(n: number): NivelUWInfo { return USMLE_NIVELES[Math.min(5, Math.max(1, Math.round(n || 1))) - 1]; }
/** Día de hito (UWSA / NBME / Free 120): el subtema empieza con 🎯. */
export function esHito(x: DiaUSMLE): boolean { return /🎯/.test(x.sub); }
/** Días de hito del plan en orden. */
export function hitosDelPlan(): DiaUSMLE[] { return DIAS.filter(esHito); }
/** Semana del plan (S1 = semana L-V del D1; v5.15: D1 = mié 23-sep-2026, S1 = 21-25 sep). Fuera de rango → 0. */
export function semanaDe(fechaISO: string): number {
  try { const d = new Date(fechaISO + 'T12:00:00Z'); const s1 = new Date(DAILY_META.inicio + 'T12:00:00Z'); const n = Math.floor((d.getTime() - s1.getTime()) / (7 * 864e5)) + 1; return n > 0 ? n : 0; } catch { return 0; }
}
/** Viernes de nivel 4 (Fase A, desde S11): el bloque de las 11:00 es mixto de sistemas dominados, no de sistema único. */
export function esViernesNivel4(x: DiaUSMLE): boolean { return x.nivelUW === 4 && faseDe(x.d) === 'A' && !esHito(x); }
/** Día de taper (D94-D95): 20Q flagged + Anki maduro, cero contenido nuevo (franjaNota empieza por TAPER). */
export function esDiaTaper(x: DiaUSMLE): boolean { return !!x.franjaNota && /^TAPER/.test(x.franjaNota); }
/** El día de "dermato Step 1" (B&B Dermatology, dentro de MSK): cuenta doble con los átomos Derma ya estudiados (puente Derma ↔ Step 1). */
export function esDiaDermaStep1(x: DiaUSMLE): boolean { return /dermato Step 1/i.test(x.sub) || /Dermatology/i.test(x.bbVid); }
/**
 * TAPER y D-1 (Palmerton §8.3 · DIVERGENCIAS §E-5, implementada 12-sep-2026 · v5.15 22-sep: D94 jue 4-feb = última sesión de banco,
 * D95 vie 5-feb = D-1 DENTRO del plan (sesión mínima + ritual); examen target LUN 8-FEB-2027; el finde 6-7 feb queda libre entre el D95 y el examen).
 * Cada día más sin estudiar mueve el examen un hábil (o exige recortar temario: decisión de Joseph).
 * Todo lo de aquí sale de PALMERTON_METODO_COMPLETO.md §8.3-§8.4 (nada estimado): las cifras marcadas A VERIFICAR siguen así.
 */
export const USMLE_TAPER = {
  fuente: 'DATA/USMLE/PALMERTON_METODO_COMPLETO.md §8.3 (cierre D-14→D-1) y §8.4 (test day) · PALMERTON_DIVERGENCIAS_PLAN.md #22/§E-5',
  cierre: 'Desde NBME 31 (D82, mar 19-ene): cero preguntas nuevas y cero tarjetas nuevas (Palmerton: cesar 1-2 semanas antes); solo incorrects/flagged + AMBOSS 200 como repaso de conceptos ya vistos · no repetir NBME ya hechos.',
  d94: { d: 94, fecha: '2027-02-04', rol: 'D-2 · última sesión de banco (jue 4-feb)', resumen: 'Solo Anki MADURO + 20Q flagged/incorrects ya vistos · repaso First Aid de esquemas (sistemas 6-10) · dormir ≥7 h' },
  d95: { d: 95, fecha: '2027-02-05', rol: 'D-1 · vie 5-feb (dentro del plan · v5.15; el finde 6-7 feb queda libre antes del examen del lun 8)', resumen: 'Sesión MÍNIMA solo por la mañana (≤2 h): Anki maduro/vencido + 20Q flagged con los mejores esquemas e imágenes · rapid review FA · tarde: permiso impreso + digital, 2 ID con el nombre EXACTO del permiso, bolsas Ziploc numeradas, ruta al Prometric · nada después de las 17:00' },
  dMenos1: {
    fecha: '2027-02-05', rol: 'D-1 · vie 5-feb · = D95 (dentro del plan · v5.15; sáb 6 y dom 7-feb libres: solo Anki vencido y repetir el ritual el domingo por la tarde)',
    pasos: [
      '05:00 (o cuando despiertes, sin alarma agresiva): Anki vencido/maduro + 20Q flagged con los mejores esquemas (≤2 h en total) — idealmente ya adelantado; cero tarjetas nuevas, cero preguntas nuevas',
      'PROHIBIDO: bloques de preguntas, temas densos, abrir First Aid "para ver cuánto sé" (anécdota de Alec: cerró el libro — "the knowledge that I have is the knowledge that I have")',
      'Nada de estudio después de las 17:00: journaling, ejercicio suave, visualización/meditación, cena con proteína',
      'Empacar: permiso impreso + digital · 2 identificaciones con foto que coincidan EXACTAMENTE con el permiso · snacks en bolsas Ziploc etiquetadas Break #1-#4 (proteína > carbohidratos simples) · granos de espresso con chocolate si los usaste en los simulacros',
      'Somnífero: NUNCA por primera vez esta noche (si se usa, ya probado semanas antes en una noche de simulacro)',
      'Dormir temprano (≥7-8 h); alarma y ruta al Prometric comprobadas la noche anterior',
    ],
  },
  examen: {
    fecha: '2027-02-08', rol: 'EXAMEN · lun 8-feb-2027 (target v5.15: fuera de la ventana 25-29 ene → agendar/reprogramar Prometric y confirmar eligibility period)',
    pasos: [
      'Desayuno alto en proteína y grasa (huevos, aguacate, nueces), sin carbohidratos simples; el café de siempre (no cambiar hábitos hoy)',
      'Tutorial: comprobar auriculares en la pestaña media y terminar → los 15 min pasan al descanso (60 min en vez de 45)',
      'Plan de bloques de Alec: 1-2 seguidos (sit-in 2-3 min si hace falta) → 10 min fuera · 3-4 seguidos → 10 min · 5 → almuerzo 20-30 min · 6 → 10 min · 7 → fin',
      'Entre bloques: al pulsar "finalizar", esas 40Q dejan de existir; NUNCA revisar preguntas ni abrir First Aid en el casillero',
      'Nunca salir a mitad de bloque (el reloj sigue y puede reportarse como irregularidad) · si se agota el descanso, el bloque siguiente arranca solo',
      'Post-test: premiarte para cerrar el ciclo',
    ],
  },
  /** Regla escrita (DIVERGENCIAS #29 → REGLA §E-7): la señal la da usmleScores.gateHito ('ALERTA BURNOUT'). */
  burnout: 'Si 2 hitos consecutivos quedan bajo su mínimo on-track Y hay síntomas (releer sin comprender, irritabilidad, indiferencia, descansos de 5 min que se vuelven de 1 h): 3-5 días con SOLO Anki AM (30-45 min de tarjetas viejas) + sueño; frenar QBank y contenido nuevo; el corrimiento determinista (+1 día hábil por día no estudiado) absorbe la pausa; se reanuda por el gate del 80%, no por la fecha.',
};

/**
 * KIT ANTI-PÁNICO del bloque (2.ª capa #26, 19-sep-2026). Se pinta en la Cola de hoy los días de hito (UWSA/NBME/Free 120)
 * y vale para cualquier bloque timed. Texto de PALMERTON_METODO_COMPLETO.md §7.1 · §5.5 · §5.6 · §7.4 · §7.6 · §8.4; nada estimado.
 */
export const PROTOCOLO_BLOQUE = {
  titulo: 'Kit anti-pánico del bloque (Palmerton §7.6 Panic Trap · §7.1 · §5.5 · §7.4)',
  pasos: [
    'AVP en 10 s DENTRO del bloque (Acknowledge · Validate · Permit): "siento mucha ansiedad ahora" → "claro que sí: es importante para mi carrera, llevo meses y hay una sola oportunidad" → "está bien sentirlo; me concentro en la pregunta y la miro como un puzzle, no como un juez de mi carácter"',
    'Tope de 2 min por pregunta (90 s + 30 %): si se cumple → adivinar, marcar (flag) y avanzar; nunca 4-5 min en una (las preguntas de >2 min salen ~50 % vs 80 % del bloque)',
    'Juez, no abogado: SAQ (pregunta autónoma) antes de mirar las opciones · CCSN (contexto · cronología · severidad · ruido) · rule-in antes de rule-out cuando quedan 2',
    'Flag y sigue: la pregunta marcada deja de existir hasta el final del bloque; volver a las marcadas solo si sobra tiempo en la primera pasada',
    'NO cambiar respuestas salvo error de lectura innegable (unidad, edad, signo vital omitido); nunca por sensación de duda (60-70 % de los cambios van de correcta a incorrecta)',
    'Pregunta difícil = "game on": es difícil para todos y vale un punto; desconfiar y acertar es lo peor (matriz de confianza 2×2)',
    'Entre bloques (sit-in break): "Oh F#@& to OK" en 10-15 s (nombrar la emoción · soltar con respiraciones nasales · recentrar · validar · reengancharse); al pulsar finalizar, esas 40Q dejan de existir',
  ],
  worstCase: 'Worst-Case Scenario Planning (§7.6-1): ANTES del primer bloque del primer hito, escribir en detalle el peor escenario y exactamente qué harías (plan B de fecha feb-mar 2027 dentro del eligibility period, sin recortar temario; "would it be the end of the world? No"). Vive en Readiness → "Plan B / peor escenario" (localStorage jmd-usmle-worstcase).',
  fuente: 'DATA/USMLE/PALMERTON_METODO_COMPLETO.md §7.1 (2 min) · §5.5 (juez vs abogado) · §5.6 (rule-in) · §7.4 (cambiar respuestas) · §7.6 (Panic Trap: worst-case, drill, AVP) · §8.4 (test day)',
};

/**
 * DAY-AFTER PROTOCOL (2.ª capa #5 + §12.6-9, 19-sep-2026): ~4 h el día siguiente a cada hito, alojadas en el deep prime
 * (09:00-11:00 + resto de la mañana). El subtema de ese día NO cambia (regla de no fusionar): se anota en la app, no en DIAS.
 * Texto de PALMERTON_METODO_COMPLETO.md §9.1-§9.2 y §12.5; nada estimado.
 */
export const DAY_AFTER = {
  titulo: 'Day-After Protocol (Palmerton §9.2 · ~4 h · el día siguiente al hito)',
  cuando: 'El hito se rinde por la mañana; la auditoría cabe en el deep prime del día siguiente (09:00-11:00 + resto de la mañana). El subtema de ese día sigue en pie (regla de no fusionar).',
  pasos: [
    'Trayectoria (15 min): curva del % frente a los hitos previos; ¿subieron los sistemas estudiados en las últimas 2 semanas?',
    'Auditoría de honestidad (15 min, POR ESCRITO): "si sigo haciendo lo mismo que las últimas 2 semanas durante 6 meses, ¿qué resultado tendría?"',
    'Triaje de errores (1 h): knowledge gap vs QI errors (interpretación / toma de examen), típicamente 50/50; ¿abogado o juez?',
    'Drill de cronología fisiopatológica (2,5 h): 10 preguntas falladas (las más largas y con más labs) reescritas A MANO en orden cronológico estricto y en presente = 10 PC cards',
    'Reporte POR SISTEMA (§9.1): leer el hito sistema a sistema, exigiendo ≥80 % en lo ya estudiado ("si estudio algo, ¿sube y se mantiene cuando estudio lo siguiente?"); cautela: pocos ítems por materia → intervalos de confianza enormes',
    'Ítems experimentales / gráficos (knockouts, curvas) separados en la revisión → 2-3 tarjetas de "diseño del experimento" (§12.6-9: UWorld es débil en ese formato)',
  ],
  reglaDeOro: 'No dedicar el 70 % de la semana a repasar cada explicación del NBME (escribe los mejores enunciados y las peores explicaciones): usarlo como mapa de diagnóstico y rellenar con UWorld/Anki. Sin explicaciones (Free 120): PC manuscrita + Pathoma.',
  fuente: 'DATA/USMLE/PALMERTON_METODO_COMPLETO.md §9.1 (lectura por sistema) · §9.2 (Day-After) · §12.5 · §12.6-9',
};

/**
 * Reglas Palmerton por franja (2.ª capa #16 backlog · #17 regla del frente · #10 temporizador · #11 cambiadas/relecturas, 19-sep-2026).
 * Clave = índice de FRANJAS (0 = 05:00 Anki · 3 = 09:00 deep prime · 4 = 11:00 · 5 = 18:00). NO cambian horas ni contenido; HorarioView las pinta.
 */
export const FRANJAS_REGLAS: Record<number, string[]> = {
  0: [
    'BACKLOG (§4.10): reviews first, nuevas después; si falta tiempo, nuevas = 0. Vencidas acumuladas → nuevas = 0 y cap de reviews 200 (número psicológico; 300 si sobra energía y volver a 200 antes de dormir) hasta la pantalla verde; NUNCA "Forget" en bloque ni resetear el mazo.',
    'FRENO POR HITO (§4.10): % del banco / NBME estancado o en declive → nuevas = 0 y días dedicados a limpiar el backlog con honestidad; desde el NBME 31 (D82, vie 15-ene) nuevas = 0.',
    'Pharm = mazo aparte (§4.2): 20 nuevas/día dentro del cap de 50; máximo 3 mazos.',
  ],
  3: [
    'REGLA DEL FRENTE (§4.12): el anverso lo redactas TÚ (sujeto primero, amplio, sin pistas, sin cloze); APEX/Claude solo el reverso o compare & contrast una vez entendido. Anverso con la respuesta dentro = information leakage.',
  ],
  4: ['TEMPORIZADOR (§7.1): 2:00 por pregunta, reiniciado en cada una (si suena → adivinar, flag, avanzar); cuenta atrás en 📏 Medición o temporizador del teléfono.'],
  5: [
    'TEMPORIZADOR (§7.1 · §7.5): 2:00 por pregunta · 12:00 el stress set de 10Q (Fases B-C) · 60:00 el bloque de 40Q.',
    'MÉTRICAS DEL BLOQUE (§7.3-§7.4): contar respuestas CAMBIADAS (≥2 = abogado; solo se cambia por error de lectura innegable) y RELECTURAS de una misma pregunta (3-4 = lectura circular); se registran en 📏 Medición.',
  ],
};
`;

fs.writeFileSync('D:/joseph-md-app/src/lib/usmleStep1Daily.ts', header + dias + footer, 'utf8');
console.log('OK — escrito src/lib/usmleStep1Daily.ts ·', (header + dias + footer).length, 'chars');
