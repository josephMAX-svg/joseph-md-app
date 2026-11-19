/**
 * encapsCiego.ts — rótulo SIN las cifras-respuesta de un sub-eje / subtema ENCAPS (v6.10p, 19-nov-2026 · auditoría del volcado c18, vetadas-cortes #11
 * y diffs #20). Regla de Joseph: nunca a la vista las respuestas (ni las cifras/datos que se preguntan) de un pre-test, banco o eval CIEGOS antes de
 * responderlos. Las etiquetas del temario (DATA/_scripts/_encaps_ciclo_v3.js → SQL → Supabase extra.sub_eje_label / subtema; temario de
 * encapsCobertura.ts) llevan algunas de esas cifras («MEF 60 mg + 400 µg 2×/sem × 3 m», «necropsia 24 h», «VRS 32-36 sem»…) y salían en el título, en
 * el PRE-TEST 10Q CIEGAS, en el BANCO DEL DÍA y en el SECUNDARIO de cola larga. La fila (SQL / Supabase) no cambia: la app pinta este rótulo, que dice
 * QUÉ se pregunta sin dar el valor. Los valores siguen en el material del día (norma / NTS, CIFRAS_CRITICAS_2027-I.md, mazo ENCAPS::Cifras) y se ven
 * DESPUÉS de responder (corrección, explicación del runner, flashcards).
 * Lo usan gen_encaps_guia.js (guía de la hora 16:15 de F1 y del carril SÁBADO), encapsPlan.ts (ítems del LOOP, del banco y del carril B; subtemaCompleto,
 * que también da el título del LOOP en el Calendar) y EncapsPlanView.tsx (cabeceras de la vista). Módulo hoja: sin imports.
 */

/** [fragmento con la respuesta, rótulo sin el valor]. Se sustituye el FRAGMENTO dondequiera que aparezca (etiqueta sola o subtema «Tema · etiqueta»). */
export const ENCAPS_SUBEJE_CIEGO: ReadonlyArray<readonly [string, string]> = [
  // II-4 · Anemia/CRED
  ['Suplementación por grupo con CIFRAS: MEF 60 mg + 400 µg 2×/sem × 3 m, escolar 60 mg diario × 3 m, lactante', 'Suplementación por grupo (cifras: dosis, frecuencia y duración) en MEF, escolar y lactante'],
  // II-3 · Inmunizaciones (el temario del calentamiento: entero y cortado a 70 por el SQL de la intensiva)
  ['Esquema nacional: 18 vacunas / 28 enfermedades; 15 vacunas hasta los 5 años', 'Esquema nacional (cifras: n.º de vacunas y de enfermedades que cubre; n.º de vacunas hasta los 5 años)'],
  ['Esquema nacional: 18 vacunas / 28 enfermedades; 15 vacunas hasta lo…', 'Esquema nacional (cifras: n.º de vacunas y de enfermedades que cubre; n.º de vacunas hasta los 5 años)'],
  ['Novedades del esquema: gestante (VRS 32-36 sem, Tdap, influenza)', 'Novedades del esquema: vacunas de la gestante (cuáles y en qué semanas)'],
  ['kit de emergencia (epinefrina 0.01 mg/kg IM)', 'kit de emergencia (dosis de epinefrina)'],
  ['Cadena de frío: rangos 2-8 °C', 'Cadena de frío: rango de temperatura'],
  // I-4 · Transmisibles/brotes
  ['control larvario y adulticida, necropsia 24 h', 'control larvario y adulticida, plazo de la necropsia'],
  // V-2 · Gestión/planeamiento
  ['gestión en 3 fases', 'fases de la gestión'],
  ['punzocortantes (llenado 3/4)', 'llenado de los punzocortantes'],
  // III-8 · Ética en función pública
  ['Historia clínica: archivo activo 5 años', 'Historia clínica: años en archivo activo'],
  // II-11 · ITS/VIH
  ['Sífilis gestacional (PGB 2.4 M UI)', 'Sífilis gestacional (dosis de PGB)'],
  // II-8 · ENT/diabetes
  ['150 min/sem OMS', 'actividad física de la OMS (min/sem)'],
  // cola larga (SECUNDARIO de los bancos)
  ['prioridades de atención P-I inmediato · P-II ≤10 min · P-III ≤30 min', 'prioridades de atención P-I a P-III y su tiempo máximo'],
  ['RIS: 4 dimensiones (prestación = puerta de entrada)', 'RIS: sus dimensiones (cuál es la puerta de entrada)'],
  ['SERVIR rige el SAGRH; 7 SUBSISTEMAS y 23 procesos', 'quién rige el SAGRH, n.º de subsistemas y de procesos'],
  ['VACAM (dónde: I-2/I-3/I-4) y las 4 valoraciones del adulto mayor', 'VACAM (en qué categorías de EESS) y las valoraciones del adulto mayor (cuántas)'],
  ['RRHH por categoría (I-3 = odontología + laboratorio)', 'RRHH por categoría (qué suma la I-3)'],
  ['(segunda opinión = acceso a servicios)', '(en cuál va la segunda opinión)'],
  // remate v6.10p (revisión «verdad» MEDIA): cola larga con la respuesta SIN cifras (la lista que se pregunta, a quién se comunica, qué licencia, qué se da)
  ['definición y ATRIBUTOS (primer contacto, accesibilidad, continuidad, integralidad, coordinación)', 'definición y ATRIBUTOS (cuáles son)'],
  ['negativa/rechazo en emergencia → ministerio público', 'negativa/rechazo en emergencia (a quién se comunica)'],
  ['derechos laborales (licencia con goce)', 'derechos laborales (qué licencia)'],
  ['(sarampión: vitamina A, PEES)', '(sarampión: suplemento y estrategia)'],
];

/** El texto con cada fragmento-respuesta de ENCAPS_SUBEJE_CIEGO sustituido por su rótulo sin valor (idempotente; sin coincidencias, el texto tal cual). */
export function subtemaCiego(s: string | null | undefined): string {
  let x = String(s ?? '');
  for (const [a, b] of ENCAPS_SUBEJE_CIEGO) if (x.includes(a)) x = x.split(a).join(b);
  return x;
}
