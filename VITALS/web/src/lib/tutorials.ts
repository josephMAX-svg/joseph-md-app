/**
 * Tutoriales de técnica por ejercicio — v2.1 "tareas cortas".
 *
 * Cada ejercicio tiene DOS niveles (filosofía: nadie ve 20 minutos antes de una serie):
 *  - EXPRESS (por defecto): demostración/técnica en 0:10–3:00, de los referentes TOP
 *    mundiales del ámbito (Renaissance Periodization · Dr. Mike Israetel PhD,
 *    Squat University · Dr. Aaron Horschig DPT, Jeff Nippard).
 *  - A FONDO (opcional): el desarrollo completo — prioriza a Andrés Vázquez (el referente
 *    en español que Joseph sigue) y deep-dives de RP cuando son el match exacto.
 *
 * TODOS los IDs verificados vía oEmbed el 10-jun-2026 (HTTP 200 = existe y es embebible,
 * author_name confirmado). NO añadir IDs sin verificar:
 *   https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json
 *
 * ToS de YouTube: no cobrar por verlos, no gatearlos, no cachearlos, no superponer nada.
 */
export interface Clip {
  yt: string; // ID verificado
  creator: string; // crédito visible
  dur: string; // duración real ("0:53") — para el chip de la UI
}

export interface Tutorial {
  yt?: string; // compat: ID por defecto (= express si existe)
  express?: Clip; // técnica corta (por defecto)
  fondo?: Clip; // desarrollo completo (opcional)
  start?: number;
  end?: number;
  playlist?: string[]; // sesión continua (baile)
  creator: string;
  q: string; // búsqueda de respaldo (nunca un enlace muerto)
  cues?: string[]; // claves de técnica en la tarjeta
}

// Referentes basados en evidencia: los que Joseph sigue + los top mundiales del ámbito.
export const REFERENTES = [
  { nombre: "Renaissance Periodization", credencial: "Dr. Mike Israetel · PhD Fisiología del ejercicio", canal: "https://www.youtube.com/@RenaissancePeriodization", tema: "Técnica por ejercicio (demos cortas) + volumen/periodización" },
  { nombre: "Squat University", credencial: "Dr. Aaron Horschig · DPT", canal: "https://www.youtube.com/@SquatUniversity", tema: "Técnica y prevención de lesiones" },
  { nombre: "Jeff Nippard", credencial: "BSc Bioquímica · culturista natural pro", canal: "https://www.youtube.com/@JeffNippard", tema: "Técnica e hipertrofia basada en evidencia" },
  { nombre: "Andrés Vázquez Personal Trainer", credencial: "Entrenador · divulgación con ciencia en español (TRENA)", canal: "https://www.youtube.com/@AndresVazquezPersonalTrainer", tema: "Desarrollos completos en español" },
  { nombre: "Dr. Antelm Pujol", credencial: "Médico · hormonas, metabolismo y deporte", canal: "https://www.youtube.com/@thefitmedstudent", tema: "Evidencia médica del ejercicio" },
  { nombre: "FitDance", credencial: "Coreografías oficiales", canal: "https://www.youtube.com/@FitDanceTV", tema: "Baile / cardio con adherencia" },
  { nombre: "Mayo Clinic", credencial: "Estándar institucional de salud", canal: "https://www.youtube.com/@MayoClinic", tema: "Educación en salud" },
];

/** Sesión de baile (miércoles): coreografías oficiales FitDance ~4 min c/u — cada pista es
 *  una subtarea corta; la IFrame API encadena (onStateChange === ENDED). 12 ≈ 45 min. */
export const BAILE_TRACKS: { id: string; titulo: string }[] = [
  { id: "9dQC2eIzBsg", titulo: "Envolver — Anitta" },
  { id: "CzjW6-eyTnc", titulo: "DAI DAI — Shakira, Burna Boy" },
  { id: "0RHwzHsBC_c", titulo: "Miénteme — TINI, Maria Becerra" },
  { id: "NajagelVQD4", titulo: "Criminal — Natti Natasha ft. Ozuna" },
  { id: "0JDvuXw9bY4", titulo: "Shivers — Ed Sheeran" },
  { id: "T21pB3bJwA0", titulo: "Love Nwantiti — CKay" },
  { id: "CgFbOBOHLdA", titulo: "Problema — Daddy Yankee" },
  { id: "G1YTdryyIfY", titulo: "Olha a Explosão — MC Kevinho" },
  { id: "0C43eJSA7a4", titulo: "Desesperados — Rauw Alejandro" },
  { id: "kcwKYp4OswY", titulo: "Motinha 2.0 — Dennis e Luísa Sonza" },
  { id: "5MnffgSj1Ag", titulo: "Despacito — Luis Fonsi ft. Daddy Yankee" },
  { id: "iHuNeZHe_hQ", titulo: "Poblado (Remix) — J Balvin, Karol G" },
];
export const BAILE_PLAYLIST: string[] = BAILE_TRACKS.map((t) => t.id);

const RP = "Renaissance Periodization";
const SU = "Squat University";
const JN = "Jeff Nippard";
const AV = "Andrés Vázquez Personal Trainer";

// Mapa: palabra clave (en el nombre del ejercicio) → tutorial. El orden importa:
// las claves más específicas van primero (p. ej. "rumano" antes que "peso muerto").
const MAP: { keys: string[]; t: Tutorial }[] = [
  // ── Día 0 · Torso empuje ──
  { keys: ["press de pecho", "banca", "bench"], t: { yt: "YQ2s_Y7g5Qk", express: { yt: "YQ2s_Y7g5Qk", creator: RP, dur: "0:11" }, fondo: { yt: "kTeNAW1bPiE", creator: AV, dur: "2:16" }, creator: RP, q: "dumbbell bench press technique", cues: ["Escápulas retraídas y pies firmes", "Baja controlado hasta sentir estiramiento en el pecho", "Codos a ~45° del torso, no pegados ni en cruz"] } },
  { keys: ["press militar", "press de hombro", "overhead", "militar"], t: { yt: "HzIiNhHhhtA", express: { yt: "HzIiNhHhhtA", creator: RP, dur: "0:13" }, fondo: { yt: "GBU_vQXv2IY", creator: AV, dur: "0:52" }, creator: RP, q: "shoulder press technique", cues: ["Glúteos y abdomen firmes: no arquees la lumbar", "Recorrido completo por encima de la cabeza", "Baja hasta la altura de la barbilla, controlando"] } },
  { keys: ["aperturas", "fly", "flye", "pec deck", "contractora", "cruce de polea"], t: { yt: "4mfLHnFL0Uw", express: { yt: "4mfLHnFL0Uw", creator: RP, dur: "0:12" }, fondo: { yt: "0ouCLm08EXg", creator: AV, dur: "0:44" }, creator: RP, q: "cable flye technique", cues: ["Codos semiflexionados fijos durante todo el arco", "Abre hasta estirar el pecho sin dolor de hombro", "Junta al frente apretando el pectoral 1 segundo"] } },
  { keys: ["tríceps", "triceps", "pushdown"], t: { yt: "6Fzep104f0s", express: { yt: "6Fzep104f0s", creator: RP, dur: "0:13" }, fondo: { yt: "-mGuck0kfPE", creator: AV, dur: "0:59" }, creator: RP, q: "triceps pushdown technique", cues: ["Codos pegados al torso: solo se mueve el antebrazo", "Extiende del todo y aprieta el tríceps abajo", "Sube controlado sin que el peso tire de ti"] } },
  // ── Día 1 · Pierna posterior ──
  { keys: ["peso muerto rumano", "rumano", "rdl"], t: { yt: "eHLuROg0FSI", express: { yt: "eHLuROg0FSI", creator: SU, dur: "0:53" }, fondo: { yt: "F7mMz5R_Aq4", creator: AV, dur: "0:37" }, creator: SU, q: "romanian deadlift technique", cues: ["Cadera atrás, rodillas semiflexionadas fijas", "Espalda neutra: el torso baja como tabla", "Baja hasta estirar femorales y sube con la cadera"] } },
  { keys: ["peso muerto", "deadlift"], t: { yt: "eHLuROg0FSI", express: { yt: "eHLuROg0FSI", creator: SU, dur: "0:53" }, creator: SU, q: "deadlift technique" } },
  { keys: ["curl femoral", "femoral", "leg curl", "isquio"], t: { yt: "XIsfDHGwAW0", express: { yt: "XIsfDHGwAW0", creator: RP, dur: "0:22" }, fondo: { yt: "jobEeklwrrs", creator: RP, dur: "12:22" }, creator: RP, q: "leg curl technique", cues: ["Cadera pegada al banco: no la despegues al subir", "Flexiona hasta arriba y controla 2-3 s la bajada", "El femoral trabaja más en la fase excéntrica"] } },
  { keys: ["hip thrust", "empuje de cadera"], t: { yt: "kqi4_EPpwCk", express: { yt: "kqi4_EPpwCk", creator: RP, dur: "2:55" }, fondo: { yt: "6AJUYdmfGUo", creator: AV, dur: "1:45" }, creator: RP, q: "hip thrust technique", cues: ["Barbilla al pecho, mirada al frente (no al techo)", "Extiende la cadera hasta la línea y aprieta glúteo 1 s", "Tibias verticales arriba: ajusta la distancia de los pies"] } },
  { keys: ["talones", "gemelo", "calf", "pantorrilla"], t: { yt: "baEXLy09Ncc", express: { yt: "baEXLy09Ncc", creator: JN, dur: "0:57" }, fondo: { yt: "5BzJRxVgjGc", creator: AV, dur: "1:34" }, creator: JN, q: "calf raise technique", cues: ["Estira completo abajo (talón por debajo del escalón)", "Sube hasta la punta y aguanta 1 s arriba", "Sin rebotes: el gemelo responde al rango completo"] } },
  // ── Día 3 · Torso jalón ──
  { keys: ["jalón", "jalon", "pulldown", "dorsal"], t: { yt: "jhnxJEzX8rY", express: { yt: "jhnxJEzX8rY", creator: RP, dur: "0:48" }, fondo: { yt: "x2Y6Mb41zjY", creator: AV, dur: "3:48" }, creator: RP, q: "lat pulldown technique", cues: ["Pecho arriba: lleva la barra hacia la clavícula", "Codos hacia abajo y atrás, como escondiéndolos", "No te balancees: jala el dorsal, no la inercia"] } },
  { keys: ["remo", "row"], t: { yt: "q0zngW0oiT0", express: { yt: "q0zngW0oiT0", creator: RP, dur: "0:57" }, fondo: { yt: "BcbmsDQM_aI", creator: AV, dur: "2:41" }, creator: RP, q: "dumbbell row technique", cues: ["Espalda neutra apoyado en el banco", "Jala la mancuerna hacia la cadera, no hacia el hombro", "Aprieta la escápula al final de cada repetición"] } },
  { keys: ["face pull", "facepull"], t: { yt: "-MODnZdnmAQ", express: { yt: "-MODnZdnmAQ", creator: RP, dur: "0:12" }, fondo: { yt: "vuYiCQxA0y8", creator: AV, dur: "0:35" }, creator: RP, q: "face pull technique", cues: ["Jala la cuerda hacia la cara con codos altos", "Termina con las manos a los lados de las orejas", "Peso moderado: aprieta el deltoides posterior"] } },
  { keys: ["curl de bíceps", "bíceps", "biceps", "curl"], t: { yt: "YLQLudsCx0o", express: { yt: "YLQLudsCx0o", creator: RP, dur: "0:56" }, fondo: { yt: "Ac7gMEQgia4", creator: AV, dur: "0:46" }, creator: RP, q: "bicep curl technique", cues: ["Codos fijos a los costados: no los adelantes", "Sube sin balancear el torso", "Baja controlado 2-3 s: ahí crece el bíceps"] } },
  // ── Día 4 · Pierna anterior ──
  { keys: ["sentadilla", "squat"], t: { yt: "AIZ8q1qruKw", express: { yt: "AIZ8q1qruKw", creator: SU, dur: "1:00" }, fondo: { yt: "KLyarAU2iHE", creator: AV, dur: "4:40" }, creator: SU, q: "how to squat technique", cues: ["Pies al ancho de hombros, puntas algo abiertas", "Las rodillas siguen la dirección de las puntas", "Baja hasta donde la espalda se mantenga neutra"] } },
  { keys: ["prensa", "leg press"], t: { yt: "nDh_BlnLCGc", express: { yt: "nDh_BlnLCGc", creator: JN, dur: "0:59" }, fondo: { yt: "xvCynwyNoP4", creator: AV, dur: "3:34" }, creator: JN, q: "leg press technique", cues: ["Lumbar y cadera pegadas al respaldo siempre", "Baja hasta donde no se despegue la cadera", "Empuja con toda la planta, sin bloquear rodillas de golpe"] } },
  { keys: ["extensión de cuád", "extension de cuad", "cuádriceps", "cuadriceps", "leg extension"], t: { yt: "m0FOpMEgero", express: { yt: "m0FOpMEgero", creator: RP, dur: "0:11" }, fondo: { yt: "5diZqGS-5Sg", creator: AV, dur: "0:49" }, creator: RP, q: "leg extension technique", cues: ["Ajusta el eje de la máquina a la altura de tu rodilla", "Extiende completo y aprieta el cuádriceps 1 s arriba", "Baja controlado, sin dejar caer la placa"] } },
  { keys: ["zancada", "lunge", "desplante", "estocada", "búlgara", "bulgara"], t: { yt: "eFWCn5iEbTU", express: { yt: "eFWCn5iEbTU", creator: RP, dur: "0:10" }, fondo: { yt: "Z6R8A5tcrTc", creator: RP, dur: "8:53" }, creator: RP, q: "walking lunge technique", cues: ["Paso largo: la rodilla de adelante sigue a la punta del pie", "Torso ligeramente inclinado adelante para glúteo", "Empuja con el talón de la pierna adelantada"] } },
  // ── Día 2 · Baile (sesión continua FitDance) + cardio/caminata ──
  { keys: ["baile", "danza", "fitdance"], t: { playlist: BAILE_PLAYLIST, creator: "FitDance", q: "FitDance coreografias", cues: ["Cada coreografía es una subtarea de ~4 min — se encadenan solas", "Mantén el cuerpo en movimiento entre canciones", "Intensidad conversacional (zona 2): debes poder hablar"] } },
  { keys: ["zona 2", "cardio", "caminata", "caminar"], t: { yt: "7dPor-O50C4", express: { yt: "7dPor-O50C4", creator: "Mayo Clinic", dur: "1:00" }, creator: "Mayo Clinic", q: "zona 2 cardio caminar beneficios evidencia", cues: ["Ritmo al que aún puedes conversar (zona 2)", "Suma minutos: 20-40 min ya cuentan", "La constancia importa más que la intensidad"] } },
];

/** Píldoras de evidencia (Dr. Antelm Pujol — médico, hormonas × deporte). */
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
