/**
 * _encaps_ciclo_v3.js — DATOS COMPARTIDOS del régimen ENCAPS MANTENIMIENTO 2027-I (pronóstico v3).
 *
 * Lo usan gen_encaps_mantenimiento_2027.js (siembra Supabase) y gen_encaps_semana.js (cierre semanal
 * + override del ciclo). Fuente única: DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2027-1_v3.md (§2 vector,
 * §3 ranking/núcleos, §6 fase A) + PROTOCOLO_HORA_MANTENIMIENTO.md.
 *
 * NO toca fechas del régimen ni Supabase: es solo configuración.
 */

// ── Vector v3 de áreas (% del examen) con bandas honestas ──
const VECTOR_V3 = {
  II: { pct: 30, lo: 27, hi: 34, label: 'Cuidado Integral' },
  I:  { pct: 27, lo: 24, hi: 29, label: 'Salud Pública' },
  V:  { pct: 21, lo: 18, hi: 25, label: 'Gestión' },
  III:{ pct: 13, lo: 11, hi: 15, label: 'Ética / Interculturalidad' },
  IV: { pct: 9,  lo: 5,  hi: 14, label: 'Investigación' },
};

// 8 críticos v3 (dominar al 100%) + 3 ALTA con flag de rebote (anti-persistentes, no enterrar).
const CRITICOS_V3 = ['I-3', 'V-2', 'II-3', 'III-5', 'I-4', 'II-5', 'II-4', 'IV-1+IV-2'];
const REBOTE_V3 = ['II-1', 'II-11', 'II-8'];

// ── Rotación de 4 semanas (lun-jue). [codigo, prioridad_v3, temas_secundarios_paraguas?] ──
// I-3 y V-2 caen 2× por ciclo (top-2 del v3). IV tiene 2 slots fijos por ciclo (lección 2026-II: 4→12).
const CICLO = [
  // Semana A
  ['II-3', 'CRITICA', null], ['I-3', 'CRITICA', null], ['V-2', 'CRITICA', null], ['III-5', 'CRITICA', null],
  // Semana B
  ['II-5', 'CRITICA', null], ['I-4', 'CRITICA', null], ['IV-1', 'CRITICA', ['IV-2']], ['II-4', 'CRITICA', null],
  // Semana C
  ['II-1', 'ALTA', null], ['I-3', 'CRITICA', null], ['V-2', 'CRITICA', null], ['III-8', 'MEDIA', null],
  // Semana D
  ['II-11', 'ALTA', null], ['IV-6', 'MEDIA', ['IV-7']], ['V-7', 'ALTA', ['V-10']], ['II-8', 'ALTA', null],
];

// ── Sub-ejes por código: cada INSTANCIA del código en los 102 días toma el siguiente sub-eje
//    (rotación circular). La columna `subtema` de Supabase = `${tema} · ${label}`. ──
// V-2: 11 sesiones → rotación P/C/R da 4 planeamiento · 4 clima+calidad · 3 residuos (§3 fila 2 del v3).
// I-3: 11 sesiones → los 8 sub-ejes del núcleo v3 (§3 fila 1) y vuelve a empezar (1-8, 1-3).
// IV-1(+IV-2): 5 sesiones → 4 sub-ejes (§3 fila 3). II-3: 6 sesiones → 4 sub-ejes (§3 fila 5).
// El resto (I-4, II-5, II-4, III-5, II-1, II-11, II-8, III-8, IV-6, V-7) también rota su núcleo v3.
const SUB_EJES = {
  'V-2': { tema: 'Gestión/planeamiento', ejes: [
    { key: 'planeamiento',        label: 'Planeamiento estratégico: PEI/POI/FODA, objetivos estratégicos, ciclo CEPLAN' },
    { key: 'clima_calidad',       label: 'Clima organizacional (definición SERVIR, dimensiones, gestión en 3 fases) + gestión de la calidad' },
    { key: 'residuos_bioseguridad', label: 'Residuos sólidos hospitalarios y bioseguridad: colores de bolsa, punzocortantes (llenado 3/4), etapas del manejo' },
  ] },
  'I-3': { tema: 'Vigilancia epidemiológica', ejes: [
    { key: 'tipos_vigilancia',    label: 'Tipos de vigilancia (activa / pasiva / centinela / sindrómica / comunitaria) y definiciones de caso' },
    { key: 'notificacion',        label: 'Notificación inmediata vs semanal, ficha clínico-epidemiológica, flujo RENACE (Dir. 341-2023)' },
    { key: 'historia_natural',    label: 'Historia natural de la enfermedad (periodo subclínico, niveles de prevención)' },
    { key: 'causalidad_hill',     label: 'Causalidad: causa necesaria/suficiente/componente, criterios de Bradford Hill, riesgo (RR/OR/RA)' },
    { key: 'sala_situacional_asis', label: 'Sala situacional, ASIS y evaluación de indicadores en SP' },
    { key: 'brote_bloqueo',       label: 'Investigación y control de brote: pasos, tasa de ataque, curva epidémica, canal endémico, bloqueo vacunal' },
    { key: 'tlp',                 label: 'Variables tiempo-lugar-persona y mediciones (razón/proporción/tasa, incidencia/prevalencia, letalidad)' },
    { key: 'desastres',           label: 'Gestión del riesgo en emergencias y desastres (EDAN, vigilancia post-desastre)' },
  ] },
  'IV-1': { tema: 'Investigación (IV-1+IV-2)', ejes: [
    { key: 'metodo_cientifico',   label: 'Método científico: definiciones textuales (problema, hipótesis, variables, objetivos)' },
    { key: 'tipos_estudio',       label: 'Tipos de estudio: descriptivo vs analítico, observacional vs experimental, cohorte / casos-controles / transversal' },
    { key: 'muestreo',            label: 'Muestreo probabilístico vs no probabilístico (bola de nieve, cuotas, conveniencia) y tamaño muestral' },
    { key: 'instrumentos',        label: 'Instrumentos de recolección (encuesta, entrevista, observación), validez y confiabilidad' },
  ] },
  'II-3': { tema: 'Inmunizaciones', ejes: [
    { key: 'esquema_intervalos',  label: 'Esquema nacional: vacunas por edad, dosis, vías e intervalos mínimos' },
    { key: 'novedades_gestante',  label: 'Novedades del esquema: gestante (VRS 32-36 sem, Tdap, influenza) e incorporaciones PNI recientes' },
    { key: 'esavi_kit',           label: 'ESAVI: clasificación, notificación y kit de emergencia (epinefrina 0.01 mg/kg IM)' },
    { key: 'cadena_frio',         label: 'Cadena de frío: rangos 2-8 °C, termos/data-loggers, ruptura de cadena y conducta' },
  ] },
  'I-4': { tema: 'Transmisibles/brotes', ejes: [
    { key: 'dengue',              label: 'Dengue completo: escenarios I/II/III, índice aédico, control larvario y adulticida, necropsia 24 h' },
    { key: 'rabia',               label: 'Rabia: clasificación de la exposición y profilaxis post-exposición' },
    { key: 'epp_precauciones',    label: 'Precauciones y EPP por patógeno (estándar, contacto, gotas, aéreas)' },
    { key: 'malaria_zoonosis',    label: 'Malaria y zoonosis (leptospirosis, peste, Chagas, Carrión): vigilancia y control' },
  ] },
  'II-5': { tema: 'APS/adolescente (MCI)', ejes: [
    { key: 'nts_adolescente',     label: 'NTS cuidado integral del adolescente: áreas de riesgo, factores protectores, consejería, continuidad IE→EESS' },
    { key: 'mci_curso_vida',      label: 'Modelo de Cuidado Integral por curso de vida: objetivo, indicadores, paquetes de atención' },
  ] },
  'II-4': { tema: 'Anemia/CRED', ejes: [
    { key: 'suplementacion_cifras', label: 'Suplementación por grupo con CIFRAS: MEF 60 mg + 400 µg 2×/sem × 3 m, escolar 60 mg diario × 3 m, lactante' },
    { key: 'anemia_dx_tto',       label: 'Anemia: diagnóstico (puntos de corte de Hb y ajuste por altitud) y tratamiento' },
    { key: 'plan_multisectorial', label: 'Plan multisectorial de anemia (intersectorial) + consejería nutricional OMS + CRED' },
  ] },
  'III-5': { tema: 'Interculturalidad', ejes: [
    { key: 'pertinencia_barreras', label: 'Pertinencia cultural y barreras culturales en la atención' },
    { key: 'medicina_tradicional', label: 'Medicina tradicional/complementaria y pertenencia étnica (autoidentificación)' },
    { key: 'inclusion_migrantes', label: 'Inclusión social, migrantes y adecuación cultural de servicios' },
  ] },
  'II-1': { tema: 'Gestante', ejes: [
    { key: 'prenatal_emergencias', label: 'Control prenatal + emergencias obstétricas (claves roja/azul/amarilla)' },
    { key: 'parto_lactancia',     label: 'Parto, puerperio y lactancia materna (ojo: la gestante ahora cae vía vacunas/ITS)' },
  ] },
  'II-11': { tema: 'ITS/VIH', ejes: [
    { key: 'prep_dual_ptmi',      label: 'PrEP, prueba dual VIH-sífilis y PTMI' },
    { key: 'sifilis_sindromico',  label: 'Sífilis gestacional (PGB 2.4 M UI) y manejo sindrómico de ITS' },
  ] },
  'II-8': { tema: 'ENT/diabetes', ejes: [
    { key: 'paquetes_tamizaje',   label: 'Paquete básico/completo ENT y tamizaje (HEARTS)' },
    { key: 'metas_hta_dm',        label: 'HTA/DM2: metas (HbA1c), 150 min/sem OMS, referencia' },
  ] },
  'III-8': { tema: 'Ética en función pública', ejes: [
    { key: 'ley_27815',           label: 'Ley 27815: deberes vs prohibiciones vs principios (distinguirlos TEXTUALMENTE)' },
    { key: 'historia_clinica',    label: 'Historia clínica: archivo activo 5 años, acceso, custodia; función pública' },
  ] },
  'IV-6': { tema: 'Publicación/estadística (IV-6+IV-7)', ejes: [
    { key: 'imryd',               label: 'Estructura IMRyD: resumen, marco teórico, discusión' },
    { key: 'etica_publicacion',   label: 'Ética de publicación: fraude, autoría, plagio' },
    { key: 'estadistica_descriptiva', label: 'Estadística descriptiva básica: moda / mediana / media, dispersión' },
  ] },
  'V-7': { tema: 'Gestión de medicamentos (V-MED)', ejes: [
    { key: 'farmacovigilancia_urm', label: 'Farmacovigilancia (notificación espontánea) y uso racional de medicamentos' },
    { key: 'esenciales_sismed',   label: 'Medicamentos esenciales (PNUME), SISMED y control de stock' },
    { key: 'contrataciones_digemid', label: 'Contrataciones (área usuaria) y rol de DIGEMID' },
  ] },
};

// ── COLA LARGA: 17 códigos fuera de la rotación principal (≈30-35 pp del vector v3, §3 filas 12-30). ──
// Rotan como `temas_secundarios` (4-5Q de las 20-25Q del banco lun-jue) y 2 por mini-sim de viernes.
// Los paraguas (I-5/6, I-11/12, III-1/2, I-1/2) llevan su etiqueta combinada.
const COLA_LARGA = [
  { codigo: 'II-2',      label: 'AIEPI/IRA (bronquiolitis, referencia) + clínica de inmunoprevenibles (sarampión: vitamina A, PEES)' },
  { codigo: 'I-10',      label: 'APS: definición y ATRIBUTOS (primer contacto, accesibilidad, continuidad, integralidad, coordinación)' },
  { codigo: 'V-6',       label: 'Ley 30421 telesalud: teleconsulta / teleinterconsulta / telemonitoreo / teleorientación (definiciones textuales)' },
  { codigo: 'II-6',      label: 'TB: definiciones de caso y derechos laborales (licencia con goce)' },
  { codigo: 'II-10',     label: 'Cáncer: tamizaje de mama (mamografía por edad, rol del I-2) y signos de alarma de cáncer infantil' },
  { codigo: 'I-5+I-6',   label: 'Determinantes, demografía/fuentes de datos (hechos vitales), transición epidemiológica, bioestadística mínima' },
  { codigo: 'II-EMG',    label: 'Emergencia/triaje: prioridades de atención P-I inmediato · P-II ≤10 min · P-III ≤30 min (RM jul-2026)' },
  { codigo: 'I-OCC',     label: 'Salud ocupacional: riesgo profesional (vínculo laboral), factores físico / biológico / ergonómico / psicosocial' },
  { codigo: 'III-3',     label: 'Consentimiento: retiro voluntario (contenido del formato) y negativa/rechazo en emergencia → ministerio público' },
  { codigo: 'I-11+I-12', label: 'Plan local de salud (autoridad local), alianzas estratégicas e intersectorialidad' },
  { codigo: 'V-1',       label: 'Categorías de EESS y RRHH por categoría (I-3 = odontología + laboratorio), UPSS' },
  { codigo: 'V-3',       label: 'RIS: 4 dimensiones (prestación = puerta de entrada) y gestión de RRHH' },
  { codigo: 'III-1',     label: 'Ética en salud pública (justicia/racionamiento) + deontología CMP (III-2: relaciones entre colegas)' },
  { codigo: 'III-9',     label: 'Ley 29414 por CATEGORÍAS de derecho (segunda opinión = acceso a servicios)' },
  { codigo: 'II-9',      label: 'Salud mental comunitaria: modelo, CSMC, continuidad de cuidados' },
  { codigo: 'II-7',      label: 'VACAM (dónde: I-2/I-3/I-4) y las 4 valoraciones del adulto mayor' },
  { codigo: 'I-1',       label: 'Promoción de la salud / entornos saludables + FESP (I-2, solo repaso)' },
];

// ── Receta fija del mini-simulacro de viernes (25Q · 72 s/Q · vector v3) ──
const RECETA_MINISIM = {
  receta: { II: 8, I: 7, V: 5, III: 3, IV: 2 }, // suma 25
  vineta_pct: 50,           // 50/50 viñeta-directa (formato 2027-I: 45-70% viñeta)
  criticos_min: 10,         // ≥10Q de los 8 críticos v3
  fallos_previos_min: 5,    // ≥5Q rehechas con OTRO enfoque desde _registro_resoluciones.json
  cola_larga_q: '5-6',      // 5-6Q reservadas a los 2 códigos de cola larga del viernes
  seg_por_q: 72,
  umbral_25: 18,            // meta hacia diciembre: ≥18/25
  alerta_25: 15,            // <15/25 dos viernes seguidos → re-ponderar la semana siguiente (gen_encaps_semana.js)
};

// ── Calendario L-V con feriados fijos (régimen v5.6: sábado y domingo LIBRES) ──
const SKIP = new Set(['2026-12-25', '2026-12-31', '2027-01-01']);
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
function* fechas(desde, hasta) {
  const d = new Date(desde + 'T12:00:00Z'), end = new Date(hasta + 'T12:00:00Z');
  while (d <= end) {
    const dow = d.getUTCDay(), iso = d.toISOString().slice(0, 10);
    if (dow >= 1 && dow <= 5 && !SKIP.has(iso)) yield { fecha: iso, dow };
    d.setUTCDate(d.getUTCDate() + 1);
  }
}
// Lunes ISO de la semana de una fecha (clave de los overrides semanales).
function lunesDe(iso) {
  const d = new Date(iso + 'T12:00:00Z');
  const dow = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - (dow - 1));
  return d.toISOString().slice(0, 10);
}
const areaDe = (code) => ((code || '').match(/^[IVX]+/) || [''])[0];

module.exports = { VECTOR_V3, CRITICOS_V3, REBOTE_V3, CICLO, SUB_EJES, COLA_LARGA, RECETA_MINISIM, SKIP, WD, fechas, lunesDe, areaDe };
