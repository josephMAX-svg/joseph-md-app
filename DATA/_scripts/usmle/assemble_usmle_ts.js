// Ensambla src/lib/usmleStep1Daily.ts v5 a partir de usmle_dias_v5.txt
const fs = require('fs');
const dias = fs.readFileSync(__dirname + '/usmle_dias_v5.txt', 'utf8').trim();

const header = `/**
 * usmleStep1Daily.ts — Plan DÍA A DÍA USMLE Step 1 · v5 MAESTRO (reestructuración 27-ago-2026).
 * D1 = LUN 2026-09-21 → D95 = MIÉ 2027-02-03 (v5.14: 31-ago→18-sep no estudiados = 15 hábiles perdidos).
 * EXAMEN: target JUE 4-FEB-2027 (fuera de la ventana original 25-29 ene desde la v5.12). D94 mar 2-feb = última sesión
 * de banco; D95 mié 3-feb = D-1 DENTRO del plan (sesión mínima AM + ritual); el finde 30-31 ene (libre) cae entre D92 y D93. Joseph debe agendar/reprogramar el Prometric y
 * confirmar el eligibility period; desde aquí cada día no estudiado mueve el examen un hábil más (o exige recortar).
 * v5.10-v5.14: el UWSA1 es el único hito que cambia de fecha en cada corrimiento (vie 11 → lun 14 → mar 15 → mié 16 → jue 17 → lun 21-sep) para
 * seguir siendo el D1 (baseline el primer día, como prescribe Palmerton). Los otros 11 hitos conservan su fecha y solo
 * cambian de D#. El contenido arranca el mar 22-sep (D2). NADA se fusionó ni se recortó: el temario sale 1:1 y el
 * desfase se absorbe por la cola.
 * Step 1 es AHORA el bloque PRINCIPAL: 6h15/día L-V (05:00 Anki AM + mañana 07:15-12:00 + eval 18:00).
 * Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
 *
 * FASES (v5.14, recalculadas sobre las fechas reales): A · Contenido por sistemas D1-D81 (21-sep→jue 14-ene, ~40Q
 *            uWorld/día = 1ª vuelta del banco completo; el temario sale 1:1, NADA se fusionó ni se recortó en este
 *            corrimiento — los 2 días dobles de Bioquímica vienen de la v5.7 y siguen conservando todos sus temas)
 *            corrimiento; el UWSA2 vie 8-ene = D77 cae DENTRO de la Fase A y el cierre de Bioquímica pasa al jue 14-ene = D81)
 *        B · Banco intensivo D82-D86 (15-ene→21-ene: el NBME 31 GO/NO-GO abre la fase el día siguiente al cierre de contenido —
 *            v5.14: ya no quedan días de banco delante del GO/NO-GO —, random timed 2×40Q + sistema débil D84 mar 19 y D86 jue 21-ene,
 *            NBME 32 lun 18 y NBME 33 mié 20-ene dentro)
 *        C · Sprint final D87-D95 (22-ene→3-feb, Free 120 + banco + taper; D88 25-ene y D89 26-ene random timed, D90 27-ene y D91 28-ene
 *            incorrects 2ª pasada, D92 vie 29-ene y D93 lun 1-feb AMBOSS 200 mitades 1 y 2 — alojados dentro del sprint; D94-D95 taper)
 * HITOS: UWSA1 lun 21-sep (baseline, D1) · NBME 25/26/27/28/29 en viernes cada ~3 semanas · NBME 30 mié 30-dic ·
 *        UWSA2 vie 8-ene · NBME 31 vie 15-ene (GO/NO-GO) · NBME 32 lun 18 / NBME 33 mié 20 / Free 120 vie 22-ene.
 * GO/NO-GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar fecha.
 * Jerarquía de material: Path→Pathoma · Micro/Pharm→Sketchy · Physio/Biochem/Anat→AMBOSS+B&B · Behav/Biostats→First Aid.
 * Método Palmerton: comprensión fisiológica > memorización · tarjetas Anki de MECANISMO (FSRS) ·
 * pre-test ciego → active reading → free recall → preguntas → log de errores.
 * v5.10-Palmerton (12-sep-2026, vigente en v5.14): cada día lleva nivelUW (1-5 = los 5 niveles de maestría UWorld) y qDia (Q objetivo);
 * el gate de progresión (80% en 10Q) vive en USMLE_GATE y se mide en usmleScores.ts (localStorage + Supabase usmle_daily_scores).
 * Fase A = niveles 1→3 (+ dosis de 4 en la eval 18:00) · Fase B = 4→5 · Fase C = 5 + NBME/Free 120.
 * 12-sep-2026 (tarde) · divergencias Palmerton implementadas SIN tocar horario, temario ni fechas:
 *  · VIERNES DE NIVEL 4 (#6): desde S11 los viernes sin hito de Fase A que serían nivel 3 pasan a nivel 4 (v5.14: solo D60 vie 11-dic,
 *    Micro; con D1 en lunes S11 = 30-nov→4-dic y su viernes es el NBME 28)
 *    (20-30Q timed mixtos de sistemas dominados + 10Q tutor); flag VIERNES_N4_DESDE_SEMANA en gen_usmle_v5.js. El texto vive
 *    en DIAS[].franjaNota; el subtema no cambia.
 *  · TAPER (#22): D94 (mar 2-feb, D-2 = última sesión de banco) y D95 (mié 3-feb, D-1 dentro del plan) = 20Q flagged + Anki maduro, cero contenido nuevo (franjaNota);
 *    v5.14: D95 = sesión mínima AM + ritual de test-day → USMLE_TAPER; el finde 30-31 ene (libre, solo Anki vencido) queda entre D92 y D93;
 *    examen target JUE 4-FEB-2027 (fuera de la ventana 25-29 ene desde la v5.12).
 *  · BURNOUT (#29): regla en usmleScores.gateHito → 'ALERTA BURNOUT' cuando 2 hitos consecutivos quedan bajo su mínimo.
 */
export const QBV = 'https://qbankly.app/videos';
export const QBQ = 'https://qbankly.app/qbanks';
export const QBF = 'https://qbankly.app/flashcards';
export const QBL = 'https://qbankly.app/library';
export const yt = (id: string) => 'https://www.youtube.com/watch?v=' + id;

export const DAILY_META = {
  step: 1, inicio: '2026-09-21', fin: '2027-02-03', totalDias: 95, // v5.14 (19-sep): Step 1 = bloque principal · D95 = mié 3-feb = D-1 dentro del plan · examen target jue 4-feb-2027
  bloque: '05:00 ANKI AM · 07:15 repaso anclado · 08:15 PRE-TEST 10Q · 09:00 DEEP PRIME 2h · 11:00 30Q consolidación · 18:00 eval modo examen (6h15/día)',
  /** Ventana original (25-29 ene), superada desde la v5.12; v5.14: el plan termina el mié 3-feb. */
  examenVentana: '2027-01-25 → 2027-01-29 (superada desde v5.12; v5.14: D95 = mié 3-feb)',
  /** Target de examen v5.14 (19-sep): jue 4-feb-2027, primer hábil tras el D95. Agendar/reprogramar Prometric y confirmar eligibility period (decisión de Joseph: o esto, o recortar). */
  examenTarget: '2027-02-04',
  /** D-1 = mié 3-feb = D95, DENTRO del plan (sesión mínima AM + ritual de test-day; USMLE_TAPER.dMenos1). */
  descansoD1: '2027-02-03',
  /** Viernes de nivel 4 desde esta semana del plan (S1 = semana del D1) — flag VIERNES_N4_DESDE_SEMANA de gen_usmle_v5.js. 0 = desactivado. */
  viernesN4DesdeSemana: 11,
  // Palmerton v3 (5-sep-2026): la regla que gobierna el volumen. Nivel del día = DIAS[].nivelUW; gate = USMLE_GATE.
  metodo: 'Palmerton · 5 niveles UWorld: NO se sube de nivel sin ≥80% en 10Q consecutivas del nivel actual (validación ≤24-48 h). Nivel 1-2 = subtema (5Q tutor → 5Q timed) · nivel 3 = sistema completo timed (viernes sin hito hasta S10) · nivel 4 = mixto de sistemas dominados (eval 18:00 diaria + viernes sin hito desde S11 + Fase B) · nivel 5 = 40Q random timed (Fases B-C + hitos). Si <80%: repetir bloques de 5Q del subtema fallado y auditar recursos/comprensión/aplicación/memoria; nunca avanzar de tema. Taper D94 mar 2-feb (última sesión de banco) + D95 mié 3-feb (D-1 dentro del plan: sesión mínima + ritual) · examen jue 4-feb (v5.14).',
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
/** Los 5 niveles de maestría UWorld (Palmerton, "UWorld Complete Guide: The Five Levels of Mastery to 260+") mapeados a las fases A/B/C del plan v5.14. */
export const USMLE_NIVELES: NivelUWInfo[] = [
  { nivel: 1, nombre: 'Subtema · tutor sin tiempo', fase: 'A', formato: 'Bloques de 5Q de UN solo subtema · modo tutor · sin reloj (aprender a leer: CCSN + SAQ + cover-the-options)', qDia: 'Palmerton 20-30Q/día → plan: 30Q (10 pre-test + 20 consolidación)', umbral: '80% en 10Q consecutivas del subtema, ≤24-48 h tras estudiarlo', dondeVive: '08:15 PRE-TEST del tema nuevo (siempre) · 11:00 los 2 primeros días de cada sistema', color: '#7C8496' },
  { nivel: 2, nombre: 'Subtema · timed', fase: 'A', formato: 'Bloques de 5Q del subtema · cronometrado (90 s/Q · tope 2 min: adivinar, marcar, avanzar)', qDia: 'Volumen creciente → plan: 40Q (10 + 30)', umbral: '80% en ≥3 subtemas distintos, ≥1 validado en <48 h', dondeVive: '11:00 CONSOLIDACIÓN desde el 3er día de cada sistema (subtemas ya validados) · 07:15: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q)', color: '#4F7DD6' },
  { nivel: 3, nombre: 'Sistema completo · timed', fase: 'A', formato: 'Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema)', qDia: 'Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor)', umbral: '80% en 20Q timed consecutivas del sistema', dondeVive: 'VIERNES sin NBME/UWSA a las 11:00 hasta S10 (v5.14: D15 Cardio · D20 Resp · D35 GI · D45 y D50 Neuro; los viernes D5 Immuno y D30 GI caen en 1º-2º día de sistema y quedan en nivel 1): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4', color: '#6BB8B0' },
  { nivel: 4, nombre: 'Sistemas mixtos · timed', fase: 'A (dosis diaria + viernes desde S11) → B', formato: 'Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión)', qDia: 'Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q)', umbral: '80% en bloques mixtos de 20Q timed de ≥3 sistemas', dondeVive: '18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · VIERNES sin hito desde S11 (v5.14: solo D60 vie 11-dic, Micro; el vie 4-dic de S11 es el NBME 28) = 20-30Q mixtos timed a las 11:00 en vez de sistema único (DIAS[].franjaNota) · Fase B D84 y D86 + Fase C D88 y D89 (random timed 2×40Q + sistema débil)', color: '#C8A96A' },
  { nivel: 5, nombre: 'Mixto completo 40Q · timed', fase: 'B → C (+ todos los hitos)', formato: 'Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen', qDia: 'Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120', umbral: '80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%)', dondeVive: '05:00 STRESS SET 10Q/12min (Fases B-C) · NBME 31 D82 (GO/NO-GO, el día siguiente al cierre de contenido) · D90 y D91 (incorrects 2ª pasada + sistema débil #3), D92 y D93 (AMBOSS 200 mitades 1-2, banco dentro del sprint) · Fase C (NBME 32/33 + Free 120 + taper D94-D95) · hitos = formato nivel 5 como MEDICIÓN, no como progresión', color: '#C56A5A' },
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
export function diaPrevio(d: DiaUSMLE): DiaUSMLE | undefined { return DIAS.find(x => x.d === d.d - 1); }
export function ventana7d(fromD: number): DiaUSMLE[] { return DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }
export const TIER_INFO: Record<string,{c:string;t:string}> = { CORE:{c:'#E5484D',t:'Core'}, HIGH:{c:'#F5A623',t:'Alto'}, MED:{c:'#3FB984',t:'Medio'} };
/** Fase del plan por número de día (v5.14): A contenido D1-81 (21-sep→14-ene; UWSA2 D77 dentro) · B banco D82-86 (15→21-ene: NBME 31 abre, random timed D84/D86, NBME 32/33 dentro) · C sprint D87-95 (22-ene→3-feb). */
export function faseDe(d: number): 'A' | 'B' | 'C' { return d <= 81 ? 'A' : d <= 86 ? 'B' : 'C'; }
/** Ficha del nivel UWorld (1-5); fuera de rango → nivel 1. */
export function nivelInfo(n: number): NivelUWInfo { return USMLE_NIVELES[Math.min(5, Math.max(1, Math.round(n || 1))) - 1]; }
/** Día de hito (UWSA / NBME / Free 120): el subtema empieza con 🎯. */
export function esHito(x: DiaUSMLE): boolean { return /🎯/.test(x.sub); }
/** Días de hito del plan en orden. */
export function hitosDelPlan(): DiaUSMLE[] { return DIAS.filter(esHito); }
/** Semana del plan (S1 = semana L-V del D1; v5.14: D1 = lun 21-sep-2026, S1 = 21-25 sep). Fuera de rango → 0. */
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
 * TAPER y D-1 (Palmerton §8.3 · DIVERGENCIAS §E-5, implementada 12-sep-2026 · v5.14 19-sep: D94 mar 2-feb = última sesión de banco,
 * D95 mié 3-feb = D-1 DENTRO del plan (sesión mínima + ritual); examen target JUE 4-FEB-2027; el finde 30-31 ene libre queda entre D92 y D93).
 * Cada día más sin estudiar mueve el examen un hábil (o exige recortar temario: decisión de Joseph).
 * Todo lo de aquí sale de PALMERTON_METODO_COMPLETO.md §8.3-§8.4 (nada estimado): las cifras marcadas A VERIFICAR siguen así.
 */
export const USMLE_TAPER = {
  fuente: 'DATA/USMLE/PALMERTON_METODO_COMPLETO.md §8.3 (cierre D-14→D-1) y §8.4 (test day) · PALMERTON_DIVERGENCIAS_PLAN.md #22/§E-5',
  cierre: 'Desde NBME 31 (D82, vie 15-ene): cero preguntas nuevas y cero tarjetas nuevas (Palmerton: cesar 1-2 semanas antes); solo incorrects/flagged + AMBOSS 200 como repaso de conceptos ya vistos · no repetir NBME ya hechos.',
  d94: { d: 94, fecha: '2027-02-02', rol: 'D-2 · última sesión de banco (mar 2-feb)', resumen: 'Solo Anki MADURO + 20Q flagged/incorrects ya vistos · repaso First Aid de esquemas (sistemas 6-10) · dormir ≥7 h' },
  d95: { d: 95, fecha: '2027-02-03', rol: 'D-1 · mié 3-feb (dentro del plan · v5.14)', resumen: 'Sesión MÍNIMA solo por la mañana (≤2 h): Anki maduro/vencido + 20Q flagged con los mejores esquemas e imágenes · rapid review FA · tarde: permiso impreso + digital, 2 ID con el nombre EXACTO del permiso, bolsas Ziploc numeradas, ruta al Prometric · nada después de las 17:00' },
  dMenos1: {
    fecha: '2027-02-03', rol: 'D-1 · mié 3-feb · = D95 (dentro del plan · v5.14)',
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
    fecha: '2027-02-04', rol: 'EXAMEN · jue 4-feb-2027 (target v5.14: fuera de la ventana 25-29 ene → agendar/reprogramar Prometric y confirmar eligibility period)',
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
`;

fs.writeFileSync('D:/joseph-md-app/src/lib/usmleStep1Daily.ts', header + dias + footer, 'utf8');
console.log('OK — escrito src/lib/usmleStep1Daily.ts ·', (header + dias + footer).length, 'chars');
