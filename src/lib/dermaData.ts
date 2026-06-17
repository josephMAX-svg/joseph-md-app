/**
 * dermaData.ts — Sección Derma (referente clínico → camino a Mayo).
 * Data destilada de STUDY_HUB/02_DERMA_curriculo.md. Estructura ENCAPS:
 * bloques → subtemas con prioridad → vueltas → recursos con links → protocolo 12 sem.
 * Reutiliza la alternancia/prioridades de researchData.
 */
import { Prioridad, PRIORIDAD_COLOR } from './researchData';
export { PRIORIDAD_COLOR };
export type { Prioridad };

export const DERMA_META = {
  titulo: 'Derma',
  subtitulo: 'Referente clínico — el camino a Mayo Clinic',
  accent: '#8B5CF6', // purple
  tesis: 'Dominar primero el "alfabeto" (lesiones + semiología), luego el 80/20 de la consulta, luego lo que no puedes errar (oncología + dermatoscopia), y sembrar dermatopatología y cirugía. La correlación clínica–dermatoscópica–histológica del mismo tema es lo que distingue al élite.',
  estrategiaMayo: 'Dermatoscopia y derm-surgery donde Perú tiene casuística (leishmaniasis, piel de color) = tu ángulo de research diferenciado para Mayo.',
};

export interface SubtemaDerma { code: string; nombre: string; prioridad: Prioridad }
export interface BloqueDerma {
  id: string; titulo: string; emoji: string; nivel: '🔴' | '🟠' | '🟡';
  nota: string; subtemas: SubtemaDerma[];
}

export const DERMA_BLOQUES: BloqueDerma[] = [
  { id: 'A', titulo: 'Fundamentos / Lenguaje dermatológico', emoji: '🔤', nivel: '🔴',
    nota: 'Primeras 2 semanas. Sin esto nada compone.',
    subtemas: [
      { code: 'A-1', nombre: 'Lesiones elementales primarias', prioridad: 'CRITICA' },
      { code: 'A-2', nombre: 'Lesiones secundarias', prioridad: 'CRITICA' },
      { code: 'A-3', nombre: 'Descripción semiológica (cómo dictar una lesión)', prioridad: 'CRITICA' },
      { code: 'A-4', nombre: 'Estructura y función de la piel', prioridad: 'ALTA' },
      { code: 'A-5', nombre: 'Inmunología cutánea + hipersensibilidad', prioridad: 'ALTA' },
      { code: 'A-6', nombre: 'Fitzpatrick + dermatología en piel de color', prioridad: 'CRITICA' },
      { code: 'A-7', nombre: 'Terapéutica tópica (corticoides por potencia, FTU)', prioridad: 'ALTA' },
    ] },
  { id: 'B', titulo: 'Dermatología médica general', emoji: '🩺', nivel: '🔴',
    nota: 'El 80% de tu consulta. Núcleo del cronograma.',
    subtemas: [
      { code: 'B-1', nombre: 'Acné y rosácea (isotretinoína)', prioridad: 'CRITICA' },
      { code: 'B-2', nombre: 'Dermatitis atópica / eczemas', prioridad: 'CRITICA' },
      { code: 'B-3', nombre: 'Psoriasis (formas, biológicos)', prioridad: 'CRITICA' },
      { code: 'B-4', nombre: 'Urticaria y angioedema', prioridad: 'CRITICA' },
      { code: 'B-5', nombre: 'Emergencias por fármacos: SJS/TEN, DRESS, AGEP', prioridad: 'CRITICA' },
      { code: 'B-6', nombre: 'Infecciones bacterianas', prioridad: 'CRITICA' },
      { code: 'B-7', nombre: 'Micosis superficiales (KOH)', prioridad: 'CRITICA' },
      { code: 'B-8', nombre: 'Virales (HSV, VZV, VPH, molusco)', prioridad: 'ALTA' },
      { code: 'B-9', nombre: 'Infestaciones (escabiosis) — prevalencia Perú', prioridad: 'CRITICA' },
      { code: 'B-10', nombre: 'ITS con manifestación cutánea', prioridad: 'ALTA' },
      { code: 'B-11', nombre: 'Ampollares autoinmunes (pénfigo/penfigoide)', prioridad: 'ALTA' },
      { code: 'B-12', nombre: 'Pigmentación (vitíligo, melasma)', prioridad: 'ALTA' },
      { code: 'B-13', nombre: 'Manifestaciones de enfermedad sistémica', prioridad: 'ALTA' },
      { code: 'B-17', nombre: 'Tropical/regional (leishmaniasis, lepra) — clave Perú', prioridad: 'ALTA' },
    ] },
  { id: 'C', titulo: 'Oncología cutánea + Dermatoscopia', emoji: '🔍', nivel: '🔴',
    nota: 'Lo que no puedes errar. Dermatoscopia = mayor ROI diagnóstico.',
    subtemas: [
      { code: 'C-1', nombre: 'Queratosis actínica + campo de cancerización', prioridad: 'CRITICA' },
      { code: 'C-2', nombre: 'Carcinoma basocelular', prioridad: 'CRITICA' },
      { code: 'C-3', nombre: 'Carcinoma espinocelular + Bowen', prioridad: 'CRITICA' },
      { code: 'C-4', nombre: 'Melanoma: ABCDE, Breslow, ganglio centinela', prioridad: 'CRITICA' },
      { code: 'C-5', nombre: 'Nevus: benignos vs displásicos vs alarma', prioridad: 'CRITICA' },
      { code: 'C-6', nombre: 'Dermatoscopia I: lesiones melanocíticas', prioridad: 'CRITICA' },
      { code: 'C-7', nombre: 'Dermatoscopia II: no melanocíticas', prioridad: 'ALTA' },
      { code: 'C-8', nombre: 'Dermatoscopia III: 2-step, chaos&clues, acral', prioridad: 'ALTA' },
    ] },
  { id: 'D', titulo: 'Dermatopatología', emoji: '🔬', nivel: '🟠',
    nota: 'Empieza pronto, dosis pequeñas sostenidas. Diferenciador Mayo.',
    subtemas: [
      { code: 'D-1', nombre: 'Cómo se lee una biopsia (H&E, PAS, IHQ)', prioridad: 'ALTA' },
      { code: 'D-2', nombre: 'Patrones de reacción inflamatoria', prioridad: 'ALTA' },
      { code: 'D-3', nombre: 'Correlación clínico-patológica (Bloque B)', prioridad: 'ALTA' },
      { code: 'D-4', nombre: 'Histología de tumores melanocíticos', prioridad: 'ALTA' },
      { code: 'D-5', nombre: 'Histología de tumores epiteliales + márgenes', prioridad: 'ALTA' },
    ] },
  { id: 'E', titulo: 'Cirugía dermatológica y Mohs', emoji: '🔪', nivel: '🟠',
    nota: 'Teoría ya; práctica con residencia. Incluye instrumental (pinzas) y suturas.',
    subtemas: [
      { code: 'E-1', nombre: 'Anatomía quirúrgica facial: zonas de peligro, RSTL', prioridad: 'CRITICA' },
      { code: 'E-2', nombre: 'Instrumental: pinzas Adson, tijeras Iris, bisturí 15', prioridad: 'ALTA' },
      { code: 'E-3', nombre: 'Anestesia local: dosis máx, bloqueos faciales', prioridad: 'CRITICA' },
      { code: 'E-4', nombre: 'Material de sutura + campo estéril', prioridad: 'ALTA' },
      { code: 'E-5', nombre: 'Técnicas de sutura (simple, colchonero, enterrado)', prioridad: 'ALTA' },
      { code: 'E-6', nombre: 'Cierre primario, elipse, dog-ear, regla 3:1', prioridad: 'ALTA' },
      { code: 'E-7', nombre: 'Biopsias: punch, shave, incisional/excisional', prioridad: 'CRITICA' },
      { code: 'E-9', nombre: 'Mohs: principios, mapeo, lectura de márgenes', prioridad: 'ALTA' },
    ] },
  { id: 'F', titulo: 'Estética / Cosmética', emoji: '✨', nivel: '🟡',
    nota: 'Mayor ROI económico futuro; hoy = teoría + anatomía. No inyectes sin base de E-1.',
    subtemas: [
      { code: 'F-1', nombre: 'Anatomía facial para inyectables (arterias peligrosas)', prioridad: 'ALTA' },
      { code: 'F-2', nombre: 'Toxina botulínica I: tercio superior', prioridad: 'MEDIA' },
      { code: 'F-3', nombre: 'Toxina botulínica II: tercio inferior + complicaciones', prioridad: 'MEDIA' },
      { code: 'F-4', nombre: 'Rellenos I: tipos, planos, reología', prioridad: 'MEDIA' },
      { code: 'F-5', nombre: 'Rellenos II: oclusión vascular, hialuronidasa', prioridad: 'ALTA' },
      { code: 'F-6', nombre: 'Peelings químicos por fototipo', prioridad: 'MEDIA' },
      { code: 'F-7', nombre: 'Láseres I: fototermólisis selectiva', prioridad: 'MEDIA' },
      { code: 'F-8', nombre: 'Láseres II: aplicaciones y seguridad por fototipo', prioridad: 'MEDIA' },
    ] },
  { id: 'G', titulo: 'Sub-especialidades de alto valor', emoji: '💠', nivel: '🟡',
    nota: 'Tricología, uñas, pediátrica, piel de color.',
    subtemas: [
      { code: 'G-1', nombre: 'Tricología: alopecias, tricoscopia', prioridad: 'MEDIA' },
      { code: 'G-2', nombre: 'Patología ungueal: melanoniquia vs melanoma', prioridad: 'MEDIA' },
      { code: 'G-3', nombre: 'Dermatología pediátrica', prioridad: 'MEDIA' },
      { code: 'G-5', nombre: 'Piel de color: queloides, PIH — alto ROI Perú', prioridad: 'ALTA' },
    ] },
];

export interface RecursoDerma { categoria: string; items: { label: string; url: string; nota?: string; gated?: boolean }[] }
export const DERMA_RECURSOS: RecursoDerma[] = [
  { categoria: '★ TOP 2026 (verificado)', items: [
    { label: 'DermNet — Image Library (23–25k img, filtra por tono de piel)', url: 'https://dermnetnz.org/image-library', nota: 'El mayor atlas gratis del mundo, vivo "© 2026". CC BY-NC-ND: citar/enlazar, NO entrenar IA ni quitar marca. Ideal spot-diagnosis MIR.' },
    { label: 'Dermoscopedia — wiki oficial de la IDS', url: 'https://dermoscopedia.org/', nota: 'Estándar de oro GRATIS de dermatoscopia (CC, act. mar-2026): two-step, pattern analysis, ABCD, Menzies, 7-point/3-point, CASH. Clave melanoma/nevus.' },
    { label: 'DermNet — Dermoscopy CME course (18 módulos) + quizzes', url: 'https://dermnetnz.org/cme/dermoscopy-course', nota: 'Curso modular: de 3-point a melanocíticas/no melanocíticas, ungueal y correlación dermatoscopia↔histología. Spot-diagnosis tipo MIR.' },
    { label: 'StatPearls — Dermatología (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK430685/', nota: 'Texto de referencia 100% gratis (CC, NLM/NIH). La mejor alternativa libre a Bolognia/Fitzpatrick para fisiopatología y manejo.' },
    { label: 'Dermatopathology Interactive Atlas (Boston University)', url: 'https://www.dermpathatlas.com/', nota: '5.000+ img, 44 caps, quizzes de certificación. Cierra el gap de dermatopatología digital/avanzada (correlación clínico-histológica).' },
    { label: 'Dermatology Times — 2025 Year in Review: Drug Approvals', url: 'https://www.dermatologytimes.com/view/dermatology-times-2025-year-in-review-drug-approvals', nota: 'Terapéutica 2025: JAK tópicos/sistémicos + biológicos (ruxolitinib pediátrico, delgocitinib, roflumilast, dupilumab/lebrikizumab) con sus black box warnings.' },
  ] },
  { categoria: 'Piel de color / Skin of color', items: [
    { label: 'Mind the Gap — signos en piel negra y morena (PDF)', url: 'https://www.blackandbrownskin.co.uk/mindthegap', nota: 'Manual gratis (CC BY-SA): cómo cambian signos y descriptores en fototipos oscuros. Cierra el gap estructural de Fitzpatrick clásico.' },
    { label: 'Full Spectrum / Inclusive Atlas (DREAM·JDD)', url: 'https://jddonline.com/project-atlas/', nota: '1.000+ img reales en 110+ condiciones, side-by-side por fototipo. El mejor atlas para fototipos IV–VI subrepresentados.' },
  ] },
  { categoria: 'Atlas e imágenes (gratis)', items: [
    { label: 'DermNet NZ — 23,000+ imágenes (tu atlas de cabecera)', url: 'https://dermnetnz.org/' },
    { label: 'DermNet · catálogo de imágenes', url: 'https://dermnetnz.org/image-catalogue' },
    { label: 'Atlas Dermatológico — Freire da Silva (12,889 img)', url: 'https://atlasdermatologico.com.br/', nota: 'Gratis uso no comercial (citar la web). Fuerte en casos tropicales/infecciosos — banco visual complementario a DermNet.' },
    { label: 'DermWeb photo atlas', url: 'http://www.dermweb.com/photo_atlas/' },
  ] },
  { categoria: 'En español (gratis)', items: [
    { label: 'Dermapixel — Dra. Rosa Taberner (casos semanales)', url: 'https://www.dermapixel.com/', nota: 'El recurso libre más completo en español para residentes/MIR: 7.000+ img, pares clínico-dermatoscópicos, 1 caso real/sábado. Activo ene-2026.' },
    { label: 'Dermatoweb.net — atlas docente (Hospital Arnau de Vilanova)', url: 'https://www.dermatoweb.net/', nota: '6.800+ img por dx/localización, ~200 casos problema, protocolos y 100 vídeos quirúrgicos. Verificar HTTPS al integrar.' },
  ] },
  { categoria: 'Vídeo (gratis)', items: [
    { label: 'Doctorly — Dr. Muneeb Shah + Dr. Luke Maxfield', url: 'https://www.youtube.com/doctorly', nota: 'Dos dermatólogos doble-board: clínica seria + explainers nivel USMLE/COMLEX. Complemento perfecto a ProMIR/AccessDerma.' },
    { label: 'Lecturio — Dermatology USMLE Prep (playlist)', url: 'https://www.youtube.com/playlist?list=PLVnjTkEwv-uNH9kXERRNJBT1V-TbMAHqV', nota: 'Vídeos cortos nivel USMLE (acné, rosácea, psoriasis, dermatitis) — repaso rápido en huecos.' },
    { label: 'Dermoscopy Made Simple — Ian McColl (~7 min/vídeo)', url: 'https://dermatoscopymadesimple.blogspot.com/p/youtube-videos.html', nota: 'Serie muy didáctica (terminología kittleriana, estructuras, vasos). Vídeos de ~7 min ideales para huecos de 30 min.' },
  ] },
  { categoria: 'Currículos estructurados (gratis)', items: [
    { label: 'AAD Basic Dermatology Curriculum (empieza aquí)', url: 'https://www.aad.org/education/basic-derm-curriculum' },
    { label: 'Next Steps in Dermatology', url: 'https://nextstepsinderm.com/' },
  ] },
  { categoria: 'Preguntas e imágenes clínicas', items: [
    { label: 'Derm In-Review — 3,100+ preguntas board (gratis, registro)', url: 'https://dermatologyinreview.com/' },
    { label: 'Krazy Kodachromes (GW · Friedman)', url: 'https://dermatologyinreview.com/krazy_kodachromes/' },
  ] },
  { categoria: 'Dermatopatología (gratis fuerte)', items: [
    { label: 'Jerad Gardner — Dermpath MEGA Index (nivel fellowship)', url: 'https://kikoxp.com/posts/5084/public', nota: 'Curso gratis nivel fellowship: TODAS sus video-lecciones + board review + láminas digitales + reportes modelo. Si da 403, abrir en navegador real (su canal YouTube es complemento).' },
    { label: 'PathElective — Dermatopathology', url: 'https://www.pathelective.com/derm-path-home' },
    { label: 'PathPresenter — Dermpath 100', url: 'https://www.pathpresenter.com/dermpath100/' },
  ] },
  { categoria: 'IA en dermatología (frontera · puente Synapse)', items: [
    { label: 'SkinGPT-4 / LLM multimodales en derma (Nature Comms 2024)', url: 'https://www.nature.com/articles/s41467-024-50043-3', nota: 'Paper open-access (52.929 img): cómo funcionan, valen y FALLAN estos sistemas. Base para auditar outputs de CNN/LLM multimodales y su sesgo por subrepresentación de tonos oscuros. Caso real para el objetivo AI engineer de Synapse.' },
  ] },
  { categoria: 'Cirugía / Mohs / sutura', items: [
    { label: 'ACMS Webinars (anatomía, Mohs)', url: 'https://www.mohscollege.org/for-physicians/education/webinars', gated: true },
    { label: 'ASDS Learn (catálogo quirúrgico)', url: 'https://asds.pathlms.com/courses', gated: true },
  ] },
  { categoria: 'Referencia (suscripción)', items: [
    { label: 'AccessDermatology / AccessMedicine (Fitzpatrick)', url: 'https://accessmedicine.mhmedical.com/', gated: true },
    { label: 'Mayo Dermatology library guide', url: 'https://libraryguides.mayo.edu/derm' },
  ] },
];

export const DERMA_FASES = [
  { fase: 'Fase 1 · Cimientos', semanas: 'Sem 1–3', deadline: 'fin Sem 3', bloques: 'A (+B inicio)',
    foco: 'Lesiones + semiología + Fitzpatrick. No avances sin dominar el "alfabeto".', criticas: 'A-1,2,3,6' },
  { fase: 'Fase 2 · 80/20 clínica', semanas: 'Sem 4–7', deadline: 'fin Sem 7', bloques: 'B (+D goteo)',
    foco: 'El núcleo de la consulta. Empieza el goteo de dermpath (Gardner 15 min).', criticas: 'B-1..B-9, B-17' },
  { fase: 'Fase 3 · Oncología + Dermatoscopia', semanas: 'Sem 8–10', deadline: 'fin Sem 10', bloques: 'C (+D corr.)',
    foco: 'Lo que no puedes errar. Melanoma clínico + dermatoscópico + histológico el mismo tema.', criticas: 'C-1..C-6' },
  { fase: 'Fase 4 · Manos + estética', semanas: 'Sem 11–12', deadline: 'fin Sem 12', bloques: 'E (+F-1)',
    foco: 'Anatomía quirúrgica, anestesia, biopsias, suturas, Mohs. Puente a estética.', criticas: 'E-1, E-3, E-7' },
];

export const DERMA_HORARIO = [
  { franja: '0:00–0:05', min: 5, act: 'Cola de repaso de HOY (recall activo de los codes que vencen)' },
  { franja: '0:05–0:45', min: 40, act: 'Material nuevo (video/atlas/texto) + nota 3 viñetas + 1 imagen al banco' },
  { franja: '0:45–0:55', min: 10, act: '10–15 preguntas Derm In-Review del tema' },
  { franja: '0:55–1:00', min: 5, act: 'Marcar code visto (siembra repasos) + "por qué importa clínicamente"' },
];

export const DERMA_NOTAS = [
  'Lo inyectable (toxina/rellenos/láser) se aprende SUPERVISADO. Gratis y confiable hoy: anatomía facial + papers de complicaciones vasculares. No inventes seguridad.',
  '🔒 De pago/login: AccessMedicine/Fitzpatrick/Bolognia/Robinson (verifica acceso institucional); IMCAS, ASDS Learn (estética/cirugía). VisualDx suele estar gratis vía biblioteca médica.',
  'Gratis y verificado fuerte: DermNet, AAD Basic Curriculum, Derm In-Review, Krazy Kodachromes, Gardner Dermpath, PathElective, PathPresenter.',
];
