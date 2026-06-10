/**
 * Tutoriales de técnica por ejercicio — de los REFERENTES REALES de Joseph (sus suscripciones
 * de YouTube, curadas por criterio de evidencia). Cobertura TOTAL del catálogo que el motor
 * (`SPLIT_JOSEPH` en engine/plan.ts) puede emitir: los 16 ejercicios de fuerza + baile/cardio.
 *
 * TODOS los IDs fueron verificados vía oEmbed el 10-jun-2026 (HTTP 200 = el video existe y su
 * canal permite embedding). NO añadir IDs sin verificar:
 *   https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json
 *
 * ToS de YouTube (líneas rojas): no cobrar por ver estos videos, no gatearlos tras login,
 * no cachearlos/descargarlos, no superponer elementos sobre el player.
 */
export interface Tutorial {
  yt?: string; // ID de video de YouTube (embed verificado)
  start?: number; // segundo de inicio (clip de la demostración técnica)
  end?: number; // segundo de fin
  playlist?: string[]; // sesión continua (baile): la IFrame API avanza al terminar cada video
  creator: string; // referente (crédito visible — atribución natural)
  q: string; // búsqueda de respaldo en YouTube (nunca un enlace muerto)
  cues?: string[]; // claves de técnica que acompañan al video en la tarjeta
}

// Referentes basados en evidencia — las suscripciones REALES de Joseph (DATA/VITALS/referentes.md).
export const REFERENTES = [
  { nombre: "Andrés Vázquez Personal Trainer", credencial: "Entrenador · divulgación basada en ciencia (TRENA)", canal: "https://www.youtube.com/@AndresVazquezPersonalTrainer", tema: "Técnica e hipertrofia explicadas con evidencia" },
  { nombre: "Dr. Antelm Pujol", credencial: "Médico · hormonas, metabolismo y deporte", canal: "https://www.youtube.com/@thefitmedstudent", tema: "Evidencia médica del ejercicio y el metabolismo" },
  { nombre: "FitDance", credencial: "Coreografías oficiales para cardio", canal: "https://www.youtube.com/@FitDanceTV", tema: "Baile / cardio con adherencia" },
  { nombre: "Mayo Clinic", credencial: "Estándar institucional de salud", canal: "https://www.youtube.com/@MayoClinic", tema: "Educación en salud y actividad física" },
];

/** Sesión de baile (miércoles): coreografías oficiales de FitDance, ~4 min c/u.
 *  12 videos ≈ 45 min — la IFrame API encadena automáticamente (onStateChange === ENDED). */
export const BAILE_PLAYLIST: string[] = [
  "9dQC2eIzBsg", // Envolver — Anitta
  "CzjW6-eyTnc", // DAI DAI — Shakira, Burna Boy
  "0RHwzHsBC_c", // Miénteme — TINI, Maria Becerra
  "NajagelVQD4", // Criminal — Natti Natasha ft. Ozuna
  "0JDvuXw9bY4", // Shivers — Ed Sheeran
  "T21pB3bJwA0", // Love Nwantiti — CKay
  "CgFbOBOHLdA", // Problema — Daddy Yankee
  "G1YTdryyIfY", // Olha a Explosão — MC Kevinho
  "0C43eJSA7a4", // Desesperados — Rauw Alejandro
  "kcwKYp4OswY", // Motinha 2.0 — Dennis e Luísa Sonza
  "5MnffgSj1Ag", // Despacito — Luis Fonsi ft. Daddy Yankee
  "iHuNeZHe_hQ", // Poblado (Remix) — J Balvin, Karol G
];

const AV = "Andrés Vázquez Personal Trainer";

// Mapa: palabra clave (en el nombre del ejercicio) → tutorial. El orden importa:
// las claves más específicas van primero (p. ej. "rumano" antes que "peso muerto").
const MAP: { keys: string[]; t: Tutorial }[] = [
  // ── Día 0 · Torso empuje ──
  { keys: ["press de pecho", "banca", "bench"], t: { yt: "kTeNAW1bPiE", creator: AV, q: "Andres Vazquez press pecho mancuernas tecnica", cues: ["Escápulas retraídas y pies firmes", "Baja controlado hasta sentir estiramiento en el pecho", "Codos a ~45° del torso, no pegados ni en cruz"] } },
  { keys: ["press militar", "press de hombro", "overhead", "militar"], t: { yt: "GBU_vQXv2IY", creator: AV, q: "Andres Vazquez press militar tecnica", cues: ["Glúteos y abdomen firmes: no arquees la lumbar", "Recorrido completo por encima de la cabeza", "Baja hasta la altura de la barbilla, controlando"] } },
  { keys: ["aperturas", "fly", "pec deck", "contractora", "cruce de polea"], t: { yt: "0ouCLm08EXg", creator: AV, q: "Andres Vazquez cruce de poleas pecho", cues: ["Codos semiflexionados fijos durante todo el arco", "Abre hasta estirar el pecho sin dolor de hombro", "Junta al frente apretando el pectoral 1 segundo"] } },
  { keys: ["tríceps", "triceps", "pushdown"], t: { yt: "-mGuck0kfPE", creator: AV, q: "Andres Vazquez extensiones triceps polea alta", cues: ["Codos pegados al torso: solo se mueve el antebrazo", "Extiende del todo y aprieta el tríceps abajo", "Sube controlado sin que el peso tire de ti"] } },
  // ── Día 1 · Pierna posterior ──
  { keys: ["peso muerto rumano", "rumano", "rdl"], t: { yt: "F7mMz5R_Aq4", creator: AV, q: "Andres Vazquez peso muerto rumano tecnica", cues: ["Cadera atrás, rodillas semiflexionadas fijas", "Espalda neutra: el torso baja como tabla", "Baja hasta estirar femorales y sube con la cadera"] } },
  { keys: ["peso muerto", "deadlift"], t: { yt: "F7mMz5R_Aq4", creator: AV, q: "Andres Vazquez peso muerto tecnica" } },
  { keys: ["curl femoral", "femoral", "leg curl", "isquio"], t: { yt: "C01ShxMz6HU", creator: AV, q: "curl femoral tumbado tecnica ciencia", cues: ["Cadera pegada al banco: no la despegues al subir", "Flexiona hasta arriba y controla 2-3 s la bajada", "El femoral trabaja más en la fase excéntrica"] } },
  { keys: ["hip thrust", "empuje de cadera"], t: { yt: "6AJUYdmfGUo", creator: AV, q: "Andres Vazquez hip thrust tecnica", cues: ["Barbilla al pecho, mirada al frente (no al techo)", "Extiende la cadera hasta la línea y aprieta glúteo 1 s", "Tibias verticales arriba: ajusta la distancia de los pies"] } },
  { keys: ["talones", "gemelo", "calf", "pantorrilla"], t: { yt: "5BzJRxVgjGc", creator: AV, q: "Andres Vazquez pantorrillas elevacion talones", cues: ["Estira completo abajo (talón por debajo del escalón)", "Sube hasta la punta y aguanta 1 s arriba", "Sin rebotes: el gemelo responde al rango completo"] } },
  // ── Día 3 · Torso jalón ──
  { keys: ["jalón", "jalon", "pulldown", "dorsal"], t: { yt: "x2Y6Mb41zjY", creator: AV, q: "Andres Vazquez jalon al pecho tecnica", cues: ["Pecho arriba: lleva la barra hacia la clavícula", "Codos hacia abajo y atrás, como escondiéndolos", "No te balancees: jala el dorsal, no la inercia"] } },
  { keys: ["remo", "row"], t: { yt: "BcbmsDQM_aI", creator: AV, q: "Andres Vazquez remo mancuerna espalda", cues: ["Espalda neutra apoyado en el banco", "Jala la mancuerna hacia la cadera, no hacia el hombro", "Aprieta la escápula al final de cada repetición"] } },
  { keys: ["face pull", "facepull"], t: { yt: "vuYiCQxA0y8", creator: AV, q: "Andres Vazquez face pull tecnica", cues: ["Jala la cuerda hacia la cara con codos altos", "Termina con las manos a los lados de las orejas", "Peso moderado: aprieta el deltoides posterior"] } },
  { keys: ["curl de bíceps", "bíceps", "biceps", "curl"], t: { yt: "Ac7gMEQgia4", creator: AV, q: "Andres Vazquez curl biceps tecnica", cues: ["Codos fijos a los costados: no los adelantes", "Sube sin balancear el torso", "Baja controlado 2-3 s: ahí crece el bíceps"] } },
  // ── Día 4 · Pierna anterior ──
  { keys: ["sentadilla", "squat"], t: { yt: "KLyarAU2iHE", creator: AV, q: "Andres Vazquez como hacer sentadilla", cues: ["Pies al ancho de hombros, puntas algo abiertas", "Las rodillas siguen la dirección de las puntas", "Baja hasta donde la espalda se mantenga neutra"] } },
  { keys: ["prensa", "leg press"], t: { yt: "xvCynwyNoP4", creator: AV, q: "Andres Vazquez prensa inclinada tecnica", cues: ["Lumbar y cadera pegadas al respaldo siempre", "Baja hasta donde no se despegue la cadera", "Empuja con toda la planta, sin bloquear rodillas de golpe"] } },
  { keys: ["extensión de cuád", "extension de cuad", "cuádriceps", "cuadriceps", "leg extension"], t: { yt: "5diZqGS-5Sg", creator: AV, q: "extensiones de cuadriceps maquina errores", cues: ["Ajusta el eje de la máquina a la altura de tu rodilla", "Extiende completo y aprieta el cuádriceps 1 s arriba", "Baja controlado, sin dejar caer la placa"] } },
  { keys: ["zancada", "lunge", "desplante", "estocada", "búlgara", "bulgara"], t: { yt: "OgPucD5PCoY", creator: AV, q: "Andres Vazquez zancadas tecnica", cues: ["Paso largo: la rodilla de adelante sigue a la punta del pie", "Torso ligeramente inclinado adelante para glúteo", "Empuja con el talón de la pierna adelantada"] } },
  // ── Día 2 · Baile (sesión continua FitDance) + cardio/caminata ──
  { keys: ["baile", "danza", "fitdance"], t: { playlist: BAILE_PLAYLIST, creator: "FitDance", q: "FitDance coreografias", cues: ["Sesión continua: las coreografías se encadenan solas", "Mantén el cuerpo en movimiento entre canciones", "Intensidad conversacional (zona 2): debes poder hablar"] } },
  { keys: ["zona 2", "cardio", "caminata", "caminar"], t: { yt: "7dPor-O50C4", creator: "Mayo Clinic", q: "zona 2 cardio caminar beneficios evidencia", cues: ["Ritmo al que aún puedes conversar (zona 2)", "Suma minutos: 20-40 min ya cuentan", "La constancia importa más que la intensidad"] } },
];

/** Píldoras de evidencia (Dr. Antelm Pujol — médico, hormonas × deporte). Para días de
 *  descanso y la sección de referentes. Verificadas por oEmbed (10-jun-2026). */
export const EVIDENCIA: { yt: string; titulo: string; creator: string }[] = [
  { yt: "mbETCM6vTGc", titulo: "El ejercicio físico es un seguro de vida", creator: "Dr. Antelm Pujol" },
  { yt: "cwql2-VcNVA", titulo: "El ejercicio de fuerza es antidepresivo", creator: "Dr. Antelm Pujol" },
];

const FALLBACK: Tutorial = { creator: "Referentes basados en evidencia", q: "ejercicio técnica correcta science based" };

function norm(s: string): string {
  return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function findTutorial(nombre: string): Tutorial {
  const n = norm(nombre);
  for (const { keys, t } of MAP) {
    if (keys.some((k) => n.includes(norm(k)))) return t;
  }
  return { ...FALLBACK, q: `${nombre} técnica correcta` };
}

export function ytSearchUrl(q: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

export function ytThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
