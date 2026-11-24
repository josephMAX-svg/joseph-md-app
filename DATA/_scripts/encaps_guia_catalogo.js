/**
 * encaps_guia_catalogo.js — CATÁLOGO verificado que usa gen_encaps_guia.js para escribir la guía «qué · cuánto · cómo» de la hora
 * ENCAPS 16:15-17:15 (mantenimiento F1). Solo datos: nada aquí cambia fechas, D#, códigos ni filas de Supabase.
 * Fuentes (18-oct-2026):
 *   · DRIVE_POR_CODIGO = inventario del Drive «SERUMS 2026 II» hecho el 18-oct en el Chrome de Joseph (solo lectura, sin abrir ficheros;
 *     scratchpad semana1/S2.md §3): fichero exacto + academia + id. Los nombres con «…» están abreviados tal como se leyeron (no se
 *     inventa el resto del título). La carpeta está compartida con OTRA cuenta de Google (Chrome u/4): los enlaces sin /u/4/ redirigen solos.
 *   · AREA = compendio DR LOPEZ por área (los de Investigación y Gestión son nuevos, S2 §5) · videoclases DR LOPEZ por área · proyecto de
 *     Claude del área (enlaces privados de Joseph: solo abren con su sesión) para generar preguntas extra.
 *   · OBSIDIAN = nota «_concepto_madre» del CÓDIGO v3 en el vault (06_ENCAPS/ENCAPS_2026/02_TEMARIO/<área>/<tema>); el generador
 *     comprueba en disco que cada nota existe (si el vault no está montado, solo avisa).
 *   · PREVISTO_SEMANA2 = composición simulada (v6.10j: 18-nov, base cero, copia aislada; 6 bancos sin runner, 25-nov → 3-dic de plan; ver su comentario).
 *     (⏸ 16-nov, copia aislada, v6.09) de los 4 bancos siguientes SIN runner (II-5 · I-4 · IV-1 · II-4 = mar 24,
 *     mié 25, jue 26 y lun 30-nov): en v6.09 los runners de la semana 1 se re-fecharon POR SESIÓN (−1 slot lun-jue: pre-test mar 17 / mié 18, eval +
 *     banco jue 19 V-2, mini-sim vie 20, eval + banco lun 23 III-5) → la semana del 23 ya tiene runners: mar 24 → jue 26 se arman con los comandos del
 *     día (--eval → --banco) y el lun 30 con `--semana 2026-11-30` + `--eval 2026-11-30`. (⏸ v6.08: simulación del 14-nov de `--semana 2026-11-23` +
 *     `--eval 2026-11-23`, con la semana 2 = lun 23 → jue 26-nov; ⏸ v6.07: simulación del 11-nov de
 *     `--semana 2026-11-16` + `--eval 2026-11-16`:)
 *     en v6.07 la semana 1 (lun 9 → vie 13-nov) está ENTERA armada (pre-test lun 9 / mar 10, eval + banco mié 11 V-2 y jue 12 III-5, mini-sim
 *     vie 13) y la semana 2 (lun 16 → jue 19-nov: II-5 · I-4 · IV-1 · II-4) no tiene ningún runner → se genera entera con --semana tras el
 *     mini-sim del vie 13 → RUNBOOK_SEMANA2_2026-10-26.md (nombre histórico). (⏸ v6.06: simulación del 31-oct con la semana 2 = lun 9 → jue
 *     12-nov; la v6.07 no la re-fechó y la guía del 11 y el 12-nov mostraba los avisos de pool del 18 y el 19 → arreglado el 11-nov.)
 *     (v6.05: --semana 2026-11-02 + --eval 2026-11-02, mismas cifras · v6.03: --eval/--banco 2026-10-28 y 2026-10-29, II-5 · I-4, con el lun 26 /
 *     mar 27 ya armados · v6.02: `--semana 2026-10-26 --dry` del 18-oct.)
 * Lista negra: nada del examen ENCAPS 2026-II (reservado como pre-test del vie 8-ene-2027). THEOMED «Banqueo Final.mp4» (11-oct) NO se
 * enlaza: puede contener el 2026-II (S2 §7).
 * v6.02c (18-oct-2026, E4): nuevo. · v6.03 (20-oct-2026): PREVISTO_SEMANA2 re-simulado con la F1 corrida al mié 21-oct. · v6.05 (24-oct-2026):
 *   re-simulado con la F1 corrida al lun 26-oct (semana 2 = lun 2 → jue 5-nov) + PREVISTO_ORIGEN (texto de la guía, antes «--dry del 18-oct»).
 *   · v6.06 (31-oct-2026): re-simulado con la F1 corrida al lun 2-nov (semana 2 = lun 9 → jue 12-nov): mismas cifras que en v6.05 (mismo pool,
 *   sin rondas registradas; solo cambia la fecha).
 */
'use strict';

const F = (id) => `https://drive.google.com/file/d/${id}/view`;
const D = (id) => `https://drive.google.com/drive/folders/${id}`;
const OBS_BASE = '06_ENCAPS/ENCAPS_2026/02_TEMARIO';

/** Proyectos de Claude con los libros de Joseph (privados: abren con su sesión de claude.ai). */
const PROYECTO = {
  I: { t: 'Claude · proyecto ENCAPS SALUD PUBLICA', url: 'https://claude.ai/project/019dfe2a-24d3-750c-9277-12e95b433300' },
  II: { t: 'Claude · proyecto ENCAPS CUIDADO INTEGRAL DE LA SALUD', url: 'https://claude.ai/project/019dfe2b-3eb7-7007-9ec8-3783bc462033' },
  III: { t: 'Claude · proyecto ENCAPS ETICA E INTERCULTURALIDAD', url: 'https://claude.ai/project/019dfe2e-025a-73fa-936a-b0e797b7e7da' },
  IV: { t: 'Claude · proyecto ENCAPS INVESTIGACIÓN', url: 'https://claude.ai/project/019dfe2b-a97b-7434-b176-cda1ff05a5b4' },
  V: { t: 'Claude · proyecto ENCAPS : GESTION', url: 'https://claude.ai/project/019dfe2e-4a9c-75d8-8007-3e9c8aa11c8e' },
  LOPEZ: { t: 'Claude · proyecto ENCAPS TIO LOPEZ', url: 'https://claude.ai/project/019d17f8-2c0a-74ab-b053-b8587782edaa' },
  THEOMED: { t: 'Claude · proyecto ENCAPS THEOMED', url: 'https://claude.ai/project/019dfce2-4926-728f-8304-a218e689df5f' },
};

/** Por área (prefijo romano del código v3). */
const AREA = {
  I: { nombre: 'Salud Pública', carpetaObs: '01_Salud_Publica',
    compendio: { t: 'DR LOPEZ · Compendio Salud Pública (PDF)', url: F('1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT') },
    videoclases: { t: 'DR LOPEZ · 🎬 Videoclases Salud Pública (carpeta, 27)', url: D('1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0') } },
  II: { nombre: 'Cuidado Integral', carpetaObs: '02_Cuidado_Integral',
    compendio: { t: 'DR LOPEZ · Compendio Cuidado Integral (PDF)', url: F('1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl') },
    videoclases: { t: 'DR LOPEZ · 🎬 Videoclases Cuidado Integral (carpeta, 45)', url: D('1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE') } },
  III: { nombre: 'Ética e Interculturalidad', carpetaObs: '03_Etica_Interculturalidad',
    compendio: { t: 'DR LOPEZ · Compendio Ética e Interculturalidad (PDF)', url: F('1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN') },
    videoclases: { t: 'DR LOPEZ · 🎬 Videoclases Ética (carpeta, 12)', url: D('1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu') } },
  IV: { nombre: 'Investigación', carpetaObs: '04_Investigacion',
    compendio: { t: 'DR LOPEZ · «4. COMPENDIO INVESTIGACIÓN 2026-II.pdf»', url: F('1cKx3tSax9yCTehi3_Glmyj54nk2IXGCC') },
    videoclases: { t: 'DR LOPEZ · 🎬 Videoclases Investigación (carpeta, 4)', url: D('1n4TG2W-JKViZHkJaL4oSpqaEa4mFt1Fz') } },
  V: { nombre: 'Gestión de Servicios', carpetaObs: '05_Gestion_Salud',
    compendio: { t: 'DR LOPEZ · «5. GESTION 2026-II.pdf» (compendio)', url: F('1fq7wjtV3hnEbIIWH4u5EE0VlwjdtQeQB') },
    videoclases: { t: 'DR LOPEZ · 🎬 Videoclases Gestión (carpeta, 18)', url: D('1lsp2dpVMtBwRIgkGZZDrX7_LrreMR2zt') } },
};

/** Banco de respaldo (plan B) — los mismos de src/lib/encapsResumenes.ts (ENCAPS_BANCOS). */
const PLAN_B_QX = { t: 'QX · App Banqueo (banco de respaldo)', url: 'https://qxmedic-aulavirtual.com/evaluaciones/banqueapp' };
const POSTEST_DRLOPEZ = { t: 'DR LOPEZ · 🚀 PosTest 2026-I por área (post-tests de clase, no el examen; con claves de academia)', url: D('1HiH_Jtl-1aCxnHlvcE-xhFslHuey-gy-') };

/**
 * Nota Obsidian del CÓDIGO v3 (carpeta del tema en el vault). `sub` = override por sub-eje cuando el sub-eje vive en otra nota.
 * Elegida por el contenido del código (subtema de _encaps_mantenimiento_2027.sql), no por coincidencia de palabras.
 */
const OBSIDIAN = {
  'I-1': '01_Salud_Publica/28_promocion_de_la_salud',
  'I-2': '01_Salud_Publica/01_conceptos_basicos_salud_publica',
  'I-3': { def: '01_Salud_Publica/09_vigilancia_salud_publica_y_epidemiologica', sub: {
    historia_natural: '01_Salud_Publica/05_historia_natural_proceso_salud_enfermedad',
    causalidad_hill: '01_Salud_Publica/03_causalidad_y_riesgo',
    sala_situacional_asis: '01_Salud_Publica/13_analisis_situacional_salud_sala_situacional',
    brote_bloqueo: '01_Salud_Publica/08_brotes_epidemias_epizootias_pandemias_endemias' } },
  'I-4': { def: '02_Cuidado_Integral/28_prevencion_control_enfermedades_metaxenicas_zoonoticas', sub: {
    epp_precauciones: '01_Salud_Publica/11_prevencion_y_control_de_infecciones' } },
  'I-5+I-6': '01_Salud_Publica/04_demografia_en_salud',
  'I-10': '02_Cuidado_Integral/08_atencion_primaria_salud_conceptos_principios',
  'I-11+I-12': '01_Salud_Publica/20_plan_de_salud_local',
  'I-OCC': '01_Salud_Publica/25_salud_ocupacional',
  'II-1': { def: '02_Cuidado_Integral/30_embarazo_parto_puerperio_normal', sub: {
    prenatal_emergencias: '02_Cuidado_Integral/04_emergencias_obstetricas_y_neonatales' } },
  'II-2': '02_Cuidado_Integral/10_paquete_cuidado_integral_nino',
  'II-3': '02_Cuidado_Integral/19_esquema_vacunacion_peru_esavi_cadena_frio',
  'II-4': '02_Cuidado_Integral/20_prevencion_control_anemia_malnutricion',
  'II-5': { def: '02_Cuidado_Integral/11_paquete_cuidado_integral_adolescente', sub: {
    mci_curso_vida: '02_Cuidado_Integral/09_cuidado_integral_curso_vida_persona_familia_comunidad' } },
  'II-6': '02_Cuidado_Integral/18_prevencion_y_control_tuberculosis',
  'II-7': '02_Cuidado_Integral/14_paquete_cuidado_integral_adulto_mayor',
  'II-8': '02_Cuidado_Integral/23_prevencion_control_enfermedades_no_transmisibles',
  'II-9': '01_Salud_Publica/26_modelo_salud_mental_comunitaria',
  'II-10': '02_Cuidado_Integral/16_prevencion_y_control_del_cancer',
  'II-11': { def: '02_Cuidado_Integral/22_transmision_materno_infantil_vih_sifilis_hepatitis_b', sub: {
    sifilis_sindromico: '02_Cuidado_Integral/21_its_vih_hepatitis_b_y_c' } },
  'II-EMG': '02_Cuidado_Integral/03_atencion_medica_urgencias_emergencias_referencia',
  'III-1': '03_Etica_Interculturalidad/02_codigo_etica_y_deontologia_profesional',
  'III-3': '03_Etica_Interculturalidad/03_derechos_y_deberes_usuarios_servicios_salud',
  'III-5': { def: '03_Etica_Interculturalidad/06_atencion_salud_enfoque_intercultural_pertinencia', sub: {
    medicina_tradicional: '03_Etica_Interculturalidad/08_medicina_tradicional_complementaria_alternativa',
    inclusion_migrantes: '03_Etica_Interculturalidad/05_diversidad_cultural_inclusion_y_equidad' } },
  'III-8': { def: '03_Etica_Interculturalidad/01_etica_funcion_publica_trato_digno_confidencialidad', sub: {
    historia_clinica: '05_Gestion_Salud/08_gestion_de_la_historia_clinica' } },
  'III-9': '03_Etica_Interculturalidad/03_derechos_y_deberes_usuarios_servicios_salud',
  'IV-1': { def: '04_Investigacion/01_conceptos_basicos_investigacion', sub: {
    tipos_estudio: '04_Investigacion/03_tipos_investigacion_descriptivo_analitico_experimental',
    muestreo: '04_Investigacion/05_procesamiento_y_analisis_datos' } },
  'IV-2': '04_Investigacion/01_conceptos_basicos_investigacion',
  'IV-6': { def: '04_Investigacion/06_elaboracion_publicacion_resultados_investigacion', sub: {
    etica_publicacion: '04_Investigacion/07_aspectos_eticos_investigacion_salud' } },
  'IV-7': '04_Investigacion/04_instrumentos_recoleccion_datos_validacion',
  'V-1': '05_Gestion_Salud/05_clasificacion_establecimientos_salud_categorias',
  'V-2': { def: '05_Gestion_Salud/03_planeamiento_institucional_pei_poi_seguimiento_evaluacion', sub: {
    clima_calidad: '05_Gestion_Salud/17_clima_organizacional_y_cultura_organizacional',
    residuos_bioseguridad: '01_Salud_Publica/24_gestion_y_manejo_residuos_solidos' } },
  'V-3': '05_Gestion_Salud/09_redes_integradas_de_salud_ris',
  'V-6': '05_Gestion_Salud/10_telesalud',
  'V-7': '05_Gestion_Salud/12_control_inventario_y_stock_medicamentos',
  'V-10': '05_Gestion_Salud/12_control_inventario_y_stock_medicamentos',
};

/** Alias de código del SQL → clave de ENCAPS_FICHAS_POR_TEMA (encapsFuentes.ts). */
const ALIAS_FICHAS = { 'IV-1': 'IV-1+IV-2', 'IV-2': 'IV-1+IV-2', 'IV-6': 'IV-6+IV-7', 'IV-7': 'IV-6+IV-7', 'V-7': 'V-7+V-10', 'V-10': 'V-7+V-10' };

/**
 * Material del Drive por código (S2 §3, «ya digerido»: PDF de sesión o norma primero, vídeo de respaldo después). `sub` limita el
 * fichero a esos sub-ejes (si falta, vale para todos los del código). tipo 'pdf' | 'mp4' | 'carpeta'.
 */
const DRIVE_POR_CODIGO = {
  'II-3': [
    { t: 'Qx MEDIC · Normas Técnicas «Sesión 7 - Inmunizaciones.pdf»', url: F('1IaA84ZewDYypdL9krUtVYIUC2oXfYCR4'), tipo: 'pdf' },
    { t: 'THEOMED · NT Cuidado Integral «2.12 NT VACUNAS 2026.pdf»', url: F('1UwdwsHf8Ni5Hef40za4KIK6O2_DEtrUA'), tipo: 'pdf' },
    { t: 'THEOMED · NT CI «2.11 …esquema regular… ESAVI y cadena de frío»', url: F('1XdVJNq35cGKswNxFU1CZbGEmcWGbxavH'), tipo: 'pdf' },
    { t: 'GALENO · CI «9. Paquete niño - Inmunizaciones - ESAVI.pdf»', url: F('1zzEBrTPkUCe217mhiAACkOJWQu7DQezT'), tipo: 'pdf' },
    { t: 'DR LOPEZ · vídeo CI «13. Atención de la persona con el esquema regular de vacunación.mp4»', url: F('1iaeR_3iBKWaqmLreXT9aK9QKr7qqtASY'), tipo: 'mp4' },
    { t: 'VILLAMEDIC · vídeo «5. Esquema nacional de vacunación parte 1.mp4»', url: F('1ogALlD3Xc6FZPM0VAh045Mstxa7Cxv1n'), tipo: 'mp4' },
  ],
  'II-2': [
    { t: 'THEOMED · NT «2.2 Paquete… niño.pdf»', url: F('1RTblFwjZ1wMlX4QTo5uEJQ5tgdLUn5wf'), tipo: 'pdf' },
    { t: 'VILLAMEDIC · «S26 II - Pediatría.pdf»', url: F('1GAic-Cx293BygXJqbwQ-SW-CWJjsfq1n'), tipo: 'pdf' },
    { t: 'Qx MEDIC · Fase 1 CI Transversales (carpeta: «18. Suplementación con vitamina A» pdf + mp4)', url: D('1iaN3C6LbKe1xHNCavmWESFFmkE9ilrYg'), tipo: 'carpeta' },
  ],
  'I-3': [
    { t: 'THEOMED · Fase 1 «SALUD PÚBLICA 5 - Definiciones de caso.pdf»', url: F('1vREAlKHumZ4P7CeMnsEkWAKjfBwSPRpu'), tipo: 'pdf', sub: ['tipos_vigilancia', 'notificacion'] },
    { t: 'THEOMED · NT SP/13 «Directiva notificación de enfermedades y eventos.pdf»', url: F('1sDCYhYcxT_yhFaDTd5bYq2wbnHSzeOcr'), tipo: 'pdf', sub: ['tipos_vigilancia', 'notificacion', 'brote_bloqueo'] },
    { t: 'Qx MEDIC · Fase 1 «2. Vigilancia en Salud Pública.pdf»', url: F('1N32KJAZmSu5k3Mu2wKfWRygjKWQCW7-f'), tipo: 'pdf', sub: ['tipos_vigilancia', 'notificacion'] },
    { t: 'Qx MEDIC · Fase 1 «3. Vigilancia Epidemiológica.pdf»', url: F('1CWEt3wRRUUu9Ro5XTSz4osYMyBX0gx_r'), tipo: 'pdf', sub: ['tipos_vigilancia', 'notificacion'] },
    { t: 'GALENO · SP «6. Vigilancia…pdf»', url: F('1S0Y-ZstLUIbAPCpL94el1sf-7Qg4eulq'), tipo: 'pdf', sub: ['tipos_vigilancia', 'notificacion'] },
    { t: 'VILLAMEDIC · «SP1.9 Vigilancia Epidemiologica.pdf»', url: F('1JSulRoIAtyElD-Efl81Lguuehha1L_fR'), tipo: 'pdf', sub: ['tipos_vigilancia', 'notificacion'] },
    { t: 'DR LOPEZ · vídeo SP «9. Vigilancia…»', url: F('1Bvmkm05FibIUlMMdh_v9IorJaVfGWW8U'), tipo: 'mp4', sub: ['tipos_vigilancia', 'notificacion'] },
  ],
  'I-10': [
    { t: 'THEOMED · NT CI «1.1 Atención Primaria de salud (conceptos y principios).pdf»', url: F('1CHT_zNXmTxB28nL1B7nJ215Ol8VI0nND'), tipo: 'pdf' },
    { t: 'Qx MEDIC · Fase 1 «9. APS.pdf»', url: F('1cw9onEDanB471vzXBLvjlL93OhoxAYEi'), tipo: 'pdf' },
    { t: 'GALENO · CI «1. APS y Modelo de Cuidado Integral.pdf»', url: F('1F2bNZ63EzKjprTr-w6Pk5gZeESu8aFLY'), tipo: 'pdf' },
    { t: 'DR LOPEZ · vídeo CI «1. APS»', url: F('1i9Pyk9Zi7AEcyqq_ACwt01nVq7IIDdzf'), tipo: 'mp4' },
  ],
  'V-2': [
    { t: 'Qx MEDIC · Normas Técnicas «Sesión 3 - Planeamiento institucional CEPLAN.pdf»', url: F('1FWDrMtueBXgn86G2x4_3sAqs-q-Mt3G4'), tipo: 'pdf', sub: ['planeamiento'] },
    { t: 'THEOMED · NT Gestión «1. Guía planeamiento institucional - CEPLAN.pdf»', url: F('1bxbFoVoxMppHx7qEr_a5c-Pk0JnTEKvY'), tipo: 'pdf', sub: ['planeamiento'] },
    { t: 'Qx MEDIC · Fase 1 «1. Planeamiento… PEI.pdf»', url: F('1b-zR8CaiXWdyhIF0or-ARe7EZzXWDARc'), tipo: 'pdf', sub: ['planeamiento'] },
    { t: 'Qx MEDIC · Fase 1 «3. Análisis estratégico (FODA).pdf»', url: F('1YQ-2Hhykz4rNiTZT2Q-UWCkr_MkUiNt7'), tipo: 'pdf', sub: ['planeamiento'] },
    { t: 'GALENO · Gestión «1. Planeamiento estratégico - Análisis - Planeamiento institucional.pdf»', url: F('1AKu-GQgeDGqkl5bu6zP5RDgLh8iL63Fo'), tipo: 'pdf', sub: ['planeamiento'] },
    { t: 'DR LOPEZ · vídeo Gestión «1. Planeamiento estratégico.mp4»', url: F('1X0rd5ozmZ9pv_b1HUOqIv1rvrB66e8Mc'), tipo: 'mp4', sub: ['planeamiento'] },
    { t: 'DR LOPEZ · vídeo Gestión «3. Planeamiento institucional»', url: F('1l77RLRprzN-kUhzA5gyCS0mX4upHzu1n'), tipo: 'mp4', sub: ['planeamiento'] },
  ],
  'V-6': [
    { t: 'THEOMED · NT Gestión «10. Norma Técnica de Salud en Telesalud.pdf»', url: F('1niMsCwE5Z0gikyKeBjlLnKi73V4wYOcv'), tipo: 'pdf' },
    { t: 'DR LOPEZ · Normativas «DIRECTIVA… TELEORIENTACION Y TELEMONITOREO.pdf»', url: F('1aMMdikhMbUXpQzaVNiU37sYDdsiFulEc'), tipo: 'pdf' },
    { t: 'Qx MEDIC · Fase 1 «8. Telesalud.pdf»', url: F('1b8moc-qTxcW-GJQOwilZ9rR2LqCYgvOL'), tipo: 'pdf' },
    { t: 'DR LOPEZ · vídeo «10. Telesalud.mp4»', url: F('1MDj47EeBq-qip7q9k_23eUCo3Pfwfnkm'), tipo: 'mp4' },
  ],
  'III-5': [
    { t: 'THEOMED · Documentos y NT «5. Adecuación de los servicios… pertinencia cultural en el primer nivel.pdf»', url: F('1IF79AMPk449COmBjB2tGrd-f7ws5vEK-'), tipo: 'pdf', sub: ['pertinencia_barreras'] },
    { t: 'THEOMED · Documentos y NT «4. Diálogo intercultural»', url: F('1j1CooHCYYygiT3IvrKTF4OAU1X-pW1J5'), tipo: 'pdf', sub: ['pertinencia_barreras'] },
    { t: 'GALENO · Ética «2. Comunicación… pertinencia cultural.pdf»', url: F('1uEsdP-eU6ypV8F4uG3e7j1uPTxP5QYVk'), tipo: 'pdf', sub: ['pertinencia_barreras'] },
    { t: 'DR LOPEZ · vídeo Ética «8. …pertinencia cultural»', url: F('1ocMhQ6HQR4wGPb1Os6gB3UM9dagORa5A'), tipo: 'mp4', sub: ['pertinencia_barreras'] },
    { t: 'DR LOPEZ · vídeo SP «22. Accesibilidad…» (barreras)', url: F('1uagUsxSitsqElFSfU5N9FSDYFPjKu1xj'), tipo: 'mp4', sub: ['pertinencia_barreras'] },
  ],
  'II-6': [
    { t: 'Qx MEDIC · Normas Técnicas «Sesión 6 - TBC.pdf»', url: F('17VTgsWu6kurqPtfBDZd1lQBh9BhVOZms'), tipo: 'pdf' },
    { t: 'THEOMED · NT «2.10 …Tuberculosis.pdf»', url: F('1MKBUkRcbAkqpve3cwMI6MQX9k-3vcN_q'), tipo: 'pdf' },
    { t: 'DR LOPEZ · Normativas «Directiva vigilancia TB 079»', url: F('1awUXqNppQ5lUchcMvJynGRHiAjCJ7LUR'), tipo: 'pdf' },
    { t: 'DR LOPEZ · vídeo «12. TB»', url: F('1G0pLtUfiMAbyhiL9KFDgb1Tnjk6dqB8W'), tipo: 'mp4' },
  ],
  'II-5': [
    { t: 'THEOMED · NT «2.3 Paquete… adolescente.pdf»', url: F('1R8PjjAEFysx-7aKd4D0YgDS2-io2Bcly'), tipo: 'pdf', sub: ['nts_adolescente'] },
    { t: 'DR LOPEZ · Normativas «ATENCIÓN INTEGRAL… ETAPA DE VIDA ADOLESCENTE.pdf»', url: F('1wmvYr0a4BI6tgmeCmbFwFDAm0ro8Cqdw'), tipo: 'pdf', sub: ['nts_adolescente'] },
    { t: 'Qx MEDIC · Fase 1 «6. Paquete básico… adolescente.pdf»', url: F('18RQzTqPujRT5nyGO_nVR9jPNb38IS4Tp'), tipo: 'pdf', sub: ['nts_adolescente'] },
    { t: 'Qx MEDIC · Normas Técnicas «Sesión 12 - Atención Integral del Joven.pdf»', url: F('10gCDoV8D0a-PLm5uk33PAZ5wbHzPDFqN'), tipo: 'pdf', sub: ['nts_adolescente'] },
    { t: 'DR LOPEZ · vídeo «5. Paquete… adolescente»', url: F('1FDtHopmVPsnegoDFI6_5gUpvvgYo2f_a'), tipo: 'mp4', sub: ['nts_adolescente'] },
  ],
  'II-10': [
    { t: 'Qx MEDIC · Normas Técnicas «Sesión 9 - Cáncer.pdf»', url: F('1uoTUVh85hHbg9Jdu_qd6dGwuncc3jme4'), tipo: 'pdf' },
    { t: 'DR LOPEZ · Normativas «GPC tamizaje de cáncer de mama en el primer nivel.pdf»', url: F('1v0EEXv4aS-fenrAblDNnzvPwdCxFvQc5'), tipo: 'pdf' },
    { t: 'THEOMED · NT «2.9 Cáncer infantil»', url: F('14QUJOkhr38orcAbN679nEjchOWmieGTb'), tipo: 'pdf' },
    { t: 'DR LOPEZ · vídeo «11. Cáncer infantil»', url: F('1spX_YuENW-hbmtj2Mv3wyKX2xR6kHaPS'), tipo: 'mp4' },
  ],
  'I-4': [
    { t: 'Qx MEDIC · Normas Técnicas «Sesión 8 - Dengue.pdf»', url: F('17EGyJxhr8BOfypkz5j88f82hed9N0li4'), tipo: 'pdf', sub: ['dengue'] },
    { t: 'DR LOPEZ · CI «28. Plan de prevención y control del Dengue 2026 y vacunación.pdf»', url: F('18rb8lRlstW0MgCcryvr7vgBE2HYVbmCB'), tipo: 'pdf', sub: ['dengue'] },
    { t: 'THEOMED · NT «2.22 (GPC Dengue).pdf»', url: F('1iX0epWpxP4fL0pYAwMjD_3BjRqHbiWKj'), tipo: 'pdf', sub: ['dengue'] },
    { t: 'DR LOPEZ · vídeo «27. Metaxénicas - Dengue»', url: F('1X7v5jUxL7SGcpmTFafu2RQ95jcgvDpl9'), tipo: 'mp4', sub: ['dengue'] },
  ],
  'I-5+I-6': [
    { t: 'DR LOPEZ · Normativas «Guía técnica… certificado de defunción.pdf»', url: F('1ir453cghEdvZWQyj8cnkdoX5ZnDfkhnK'), tipo: 'pdf' },
    { t: 'DR LOPEZ · vídeo SP «4. Demografía»', url: F('1gQF7CoIepUnx9qhVNU4SfEF3eIPembFd'), tipo: 'mp4' },
    { t: 'DR LOPEZ · vídeo SP «13. Determinantes»', url: F('1-s1cF9oAIs2wlgL4EM2DSxfDI7DzyNp7'), tipo: 'mp4' },
  ],
  'IV-1': [
    { t: 'DR LOPEZ · «4. COMPENDIO INVESTIGACIÓN 2026-II.pdf»', url: F('1cKx3tSax9yCTehi3_Glmyj54nk2IXGCC'), tipo: 'pdf' },
    { t: 'Qx MEDIC · Fase 1 «1. Conceptos básicos de investigación.pdf»', url: F('1eeM7DQn-URNikYS7VSaXE7XDApSZ1avf'), tipo: 'pdf', sub: ['metodo_cientifico'] },
    { t: 'Qx MEDIC · Mapas «3.- Método científico.mp4»', url: F('1EEJ8pDuJOwKLHXkCvKefIgBsHhAZEK5s'), tipo: 'mp4', sub: ['metodo_cientifico'] },
    { t: 'DR LOPEZ · vídeo Inv «1. Conceptos básicos…»', url: F('1xQT84VnTV6Nj44x9-POTcl2n6lDhCeDj'), tipo: 'mp4', sub: ['metodo_cientifico'] },
  ],
  'II-EMG': [
    { t: 'Qx MEDIC · Fase 1 «7. Atención médica en emergencia, urgencia y referencia.pdf» (⚠ may-jul 2026: cotejar P-I/P-II/P-III con la RM de jul-2026)', url: F('16jUKSWUL2-wY1jYYctHrvcipxipUm39S'), tipo: 'pdf' },
    { t: 'THEOMED · NT «1.3 Atención médica en urgencias…» (⚠ cotejar con la RM de jul-2026)', url: F('17k7QHOdtEuLkbZlViFNlcv17PMXgUpec'), tipo: 'pdf' },
  ],
  'II-4': [
    { t: 'Qx MEDIC · Normas Técnicas «Sesión 10 - Anemia.pdf»', url: F('1z_vDsTkgrQGroge4jT4VqcgsWsjApMK6'), tipo: 'pdf' },
    { t: 'THEOMED · NT «2.13 Anemia…»', url: F('1_R6xXEpibTAb_Xt1thw0_kyxUeu2wN58'), tipo: 'pdf' },
    { t: 'Qx MEDIC · Fase 1 «15. Prevención y control de anemia.pdf»', url: F('19UGdQuogdbEi0w_VRVgBpqk5HRzayfc2'), tipo: 'pdf' },
    { t: 'DR LOPEZ · vídeo «15. Anemia»', url: F('1T0CfDb1TImxcHXgWdpaY0G2nN7u994Jo'), tipo: 'mp4' },
  ],
  'I-OCC': [
    { t: 'Qx MEDIC · Fase 1 «6. Salud ocupacional.pdf»', url: F('1FqA3iaWt-Ms87gbX9GuMsBHN2o9FFjpr'), tipo: 'pdf' },
    { t: 'DR LOPEZ · vídeo SP «20. Salud ocupacional»', url: F('10GprW3qvBxXBpVK-sTvUkfIDnOhXGmg1'), tipo: 'mp4' },
  ],
};

/**
 * Sub-ejes SIN fichero del Drive inventariado → ficha(s) MINSA concreta(s) de ENCAPS_FICHAS_POR_TEMA (encapsFuentes.ts) que tratan ESE sub-eje
 * ([clave de fichas, título exacto]; el generador aborta si el título no existe). Sin entrada aquí → compendio + videoclases del área.
 */
const FICHA_SUBEJE = {
  'I-3:historia_natural': [['I-1', 'Historia natural del proceso salud enfermedad'], ['I-1', 'Etapas y niveles de prevención']],
  'I-3:causalidad_hill': [['I-3', 'Conceptos básicos de epidemiología']],
  'I-3:sala_situacional_asis': [['IV-6+IV-7', 'Análisis situacional de salud - sala situacional de salud']],
  'I-3:brote_bloqueo': [['I-3', 'Endemias, epidemias y brotes']],
  'I-4:rabia': [['I-4', 'Vigilancia y manejo de zoonosis']],
  'I-4:epp_precauciones': [['I-1', 'Prevención y control de infecciones'], ['I-1', 'Bioseguridad']],
  'V-2:residuos_bioseguridad': [['I-1', 'Bioseguridad']],
  'II-1:prenatal_emergencias': [['II-1', 'Atención prenatal'], ['II-1', 'Manejo inicial de emergencias obstétricas']],
  'II-1:parto_lactancia': [['II-1', 'Paquete básico de cuidado del binomio madre niño'], ['II-1', 'Expulsivo']],
  'II-5:mci_curso_vida': [['II-5', 'Mci - definición del modelo'], ['II-5', 'Mci - prestación']],
  'II-11:prep_dual_ptmi': [['II-11', 'Prevención combinada del vih'], ['II-11', 'Prevención de la transmisión materno infantil de vih, sífilis y vhb']],
  'II-11:sifilis_sindromico': [['II-11', 'Atención integral de las its'], ['II-11', 'Prevención de la transmisión materno infantil de vih, sífilis y vhb']],
  'II-8:paquetes_tamizaje': [['II-8', 'Prevención y control de ecnt']],
  'II-8:metas_hta_dm': [['II-8', 'Prevención y control de ecnt']],
  'III-5:medicina_tradicional': [['III-5', 'Medicina tradicional, complementaria y alternativa'], ['III-5', 'Identidad cultural y autopercepción étnica']],
  'III-5:inclusion_migrantes': [['III-5', 'Acceso a la atención en salud de la población migrante'], ['II-11', 'Diversidad cultural, promoción de la inclusión y la equidad']],
  'III-8:ley_27815': [['III-1', 'ética e integridad y ética en la función pública ética y bioética']],
  'IV-6:imryd': [['IV-6+IV-7', 'Características estructurales del informe'], ['IV-6+IV-7', 'Publicación científica']],
  'IV-6:etica_publicacion': [['III-8', 'ética y aspectos éticos de las publicaciones científicas']],
  'V-7:farmacovigilancia_urm': [['II-5', 'Uso racional de medicamentos']],
};

/** Avisos de contenido por código (S2 §3/§7). */
const AVISO_CODIGO = {
  'II-2': 'Ninguna academia trae AIEPI/IRA (bronquiolitis) como tema propio: para esa parte usa la ficha MINSA del paquete del niño.',
  // v6.10p (remate · revisión «verdad» ALTA): sin los valores (el aviso va ENCIMA de los pasos, también en el Home, y el SECUNDARIO de II-EMG son 5Q ciegas que los
  //   preguntan: regla de Joseph, nunca a la vista las cifras que se preguntan antes de responder); los valores, en la ficha y en la RM de jul-2026
  'II-EMG': 'Las fichas de triaje son de may-jul 2026: los tiempos de P-I a P-III se cotejan con la RM de jul-2026 antes de anotarlos.',
};

/**
 * v6.10 (17-nov): los 4 bancos siguientes sin runner son el mié 25 II-5 · jue 26 I-4 · DOM 29 IV-1 (07:15, recupera el mar 17) · lun 30-nov II-4 — las
 *  MISMAS 4 sesiones de la v6.09, re-fechadas POR SESIÓN (la semana 1 armada: pre-test mié 18 y jue 19, mini-sim vie 20, eval + banco lun 23 (V-2; su eval
 *  es la de I-3, sesión del jue 19) y mar 24 (III-5; eval V-2)). Las cifras de la simulación no cambian (mismo pool, mismo orden de generación);
 *  las evals: mié 25 = III-5 (código de ayer) · jue 26 = II-5 · dom 29 = I-4 · lun 30 = regla del lunes (5Q de fallos previos).
 * Los 4 bancos siguientes sin runner (v6.09: mar 24 II-5 · mié 25 I-4 · jue 26 IV-1 · lun 30-nov II-4). La semana 1 sí está armada (re-fechada POR
 * SESIÓN, −1 slot lun-jue): pre-test mar 17 y mié 18, eval + banco jue 19 (V-2), mini-sim vie 20 (sin cambio) y eval + banco lun 23 (III-5; la eval
 * de ese lunes es la de V-2, re-fechada con su sesión). Composición simulada el 16-nov en una copia aislada, en el orden en que la guía lo manda:
 * `--eval 2026-11-24` → `--banco 2026-11-24` → (25) → (26) (la semana del 23 ya tiene runners: --semana los re-sortearía) y `--semana 2026-11-30` +
 * `--eval 2026-11-30` (lunes: la eval de fallos previos va aparte). El pool es el del 31-oct (434 · 249 libres) y el registro no tiene rondas.
 * Es solo un informe: la guía lo usa mientras el runner del día no exista; con runner manda su _meta.
 * P1: 3 ítems de los mini-sims (BP-0022, BP-0010 y BP-0005, de minisim_2026-11-20) reaparecen en las evals re-test de la semana 2 (previsión v6.10c: eval_2026-11-25 / -26 y
 *   eval_2026-12-01, la del IV-1; v6.10: -25 / -26 / -29; v6.09: -24 / -25 / -26). Es el fallback de
 * re-test, que reutiliza a propósito reales ya usados; el mini-sim del 20 va ANTES.
 * v6.09 (16-nov): re-simulado con la F1 corrida al mar 17-nov. Los BANCOS traen las mismas cifras que en la v6.08 (mismo pool, sin rondas; la F1 es
 * rígida por slots: mismos códigos, sub-ejes y secundarios). Cambian las EVAL: con el lun 16 perdido, la del II-5 (mar 24) es la del código de ayer
 * III-5 (5/5 re-test; en la v6.08 el II-5 iba un lunes, con 5Q de fallos previos), la del I-4 (mié 25) la de II-5 y la del IV-1 (jue 26) la de I-4;
 * el II-4 (lun 30) lleva la eval de fallos previos del lunes.
 * v6.08 (14-nov): re-simulado con la F1 corrida al lun 16-nov (runners de la semana 1 re-fechados +7 días): mismas cifras que en la v6.07
 * (mismo pool, sin rondas registradas; la F1 es rígida por slots, así que la semana 2 trae los mismos códigos, sub-ejes y secundarios).
 * v6.07 (fix 11-nov): hasta ese día las claves eran las de la v6.06 (lun 9 → jue 12-nov), que la v6.07 convirtió en pre-test (9 y 10) y en los
 * bancos V-2 y III-5 (11 y 12). Por eso la guía de esos días mostraba los avisos de pool de los bancos que entonces iban del 16 al 19.
 * `codigo`/`secundario` = los del día: gen_encaps_guia.js aborta si no cuadran con la fila (protección ante el próximo re-fechado).
 * Historial de cifras: v6.08 = lun 23 → jue 26-nov, mismos bancos (evals: lun 23 fallos previos · mar 24 II-5 · mié 25 I-4 · jue 26 IV-1) · v6.07 = lun 16 → jue 19-nov, mismas cifras · v6.06 = lun 9 → jue 12-nov, mismas cifras · v6.05 = lun 2 → jue 5-nov,
 * mismas cifras · v6.03 = mié 28 II-5 20 + II-10 2 · jue 29 I-4 16 + I-5+I-6 4, con el lun 26 y el mar 27 ya armados.
 */
// v6.10: sin cambio (las 4 sesiones se re-fecharon por sesión; las cifras son las mismas) · v6.10g (18-nov): sin la etiqueta de versión en el texto
//   visible (antes «simulación del 16-nov, v6.09»: la simulación sigue valiendo con el alias de la v6.10d)
// v6.10j (18-nov-2026, auditoría c14 · dias-clave #0): RE-SIMULADO con la regla de base cero (v6.10e: desde el 18-nov solo ítems de EXAMEN REAL) en una
//   copia aislada de BANCO_PROPIO (gen_encaps_minisim.js --eval/--banco 2026-11-25 y 2026-11-26 → --semana 2026-11-30 + --eval 2026-11-30, el orden de las
//   recetas de la guía): la del 16-nov contaba ítems propios (N-/BP-) que ya no entran → el II-5 del 25 no trae 20 del código sino 8 de II-5 en RE-TEST +
//   8 libres de la cola larga del área II, etc. Las EVAL del 25, 26, 1-dic, 2-dic y 3-dic salen 5/5 en RE-TEST y sus 5 ids están TODOS en el banco de la
//   sesión anterior (comprobado por ids) → eval_retest: 'banco' (gen_encaps_guia.js: «5Q de X de AYER en RE-TEST: las mismas preguntas reales del banco de
//   ayer …»). + 2-dic y 3-dic (la semana del lun 30 se arma entera con --semana). La eval del 30 (día siguiente al mini-sim: fallos previos del registro)
//   depende de las rondas que registres → sin eval_retest.
//   comp = [sin usar del código, del código en RE-TEST, de la cola larga del área] del principal (los mismos números de la nota): la guía los pone en el «qué»
//   del BANCO DEL DÍA (remate v6.10j: el Calendar corta el aviso y la composición solo se veía en la app)
// v6.10l (auditoría c15 · dias-clave #4): el texto visible sin fecha ni procedencia («(previsto: simulación del 18-nov)» se leía como un simulacro el 18-nov,
//   día sin sesión): «(composición prevista)». La simulación sigue siendo la del 18-nov (arriba).
const PREVISTO_ORIGEN = 'composición prevista';
const PREVISTO_SEMANA2 = {
  '2026-11-25': { codigo: 'II-5', secundario: 'II-10', principal: 16, secundario_n: 2, comp: [0, 8, 8], eval_retest: 'banco', nota: 'principal: 0Q de II-5 sin usar en el pool → 8 de II-5 en RE-TEST (las mismas preguntas reales, sin la clave) + 8 libres de la cola larga del área II · secundario II-10: solo 2Q en el pool (receta 4-5)', eval: 'código de ayer III-5: 5Q en RE-TEST (las del banco del mar 24)' },
  '2026-11-26': { codigo: 'I-4', secundario: 'I-5+I-6', principal: 16, secundario_n: 4, comp: [4, 7, 5], eval_retest: 'banco', nota: 'principal: 4Q de I-4 sin usar + 7 de I-4 en RE-TEST (las mismas preguntas reales, sin la clave) + 5 libres de la cola larga del área I · tras este banco quedan 0Q libres de I-4', eval: 'código de ayer II-5: 5Q en RE-TEST (las del banco del mié 25)' },
  '2026-11-30': { codigo: 'IV-1', secundario: 'II-EMG', principal: 16, secundario_n: 2, comp: [10, 6, 0], nota: 'principal: 10Q de IV-1+IV-2 sin usar + 6 en RE-TEST (las mismas preguntas reales, sin la clave) · secundario II-EMG: solo 2Q en el pool (receta 4-5) · la eval de esta sesión (la del día siguiente al mini-sim: 5Q de fallos previos del registro, P2) se genera aparte con --eval 2026-11-30 después de --semana 2026-11-30', eval: 'día siguiente al mini-sim: 5Q REALES de fallos previos del registro (depende de las rondas registradas)' },
  '2026-12-01': { codigo: 'II-4', secundario: 'I-OCC', principal: 16, secundario_n: 2, comp: [0, 6, 10], eval_retest: 'banco', nota: 'principal: 0Q de II-4 sin usar en el pool → 6 de II-4 en RE-TEST (las mismas preguntas reales, sin la clave) + 10 libres de la cola larga del área II · secundario I-OCC: solo 2Q en el pool (receta 4-5)', eval: 'código de ayer IV-1: 5Q en RE-TEST (las del banco del lun 30)' },
  '2026-12-02': { codigo: 'II-1', secundario: 'III-3', principal: 16, secundario_n: 2, comp: [1, 9, 6], eval_retest: 'banco', nota: 'principal: 1Q de II-1 sin usar + 9 de II-1 en RE-TEST (las mismas preguntas reales, sin la clave) + 6 libres de la cola larga del área II · secundario III-3: solo 2Q en el pool (receta 4-5)', eval: 'código de ayer II-4: 5Q en RE-TEST (las del banco del mar 1-dic)' },
  '2026-12-03': { codigo: 'I-3', secundario: 'I-11+I-12', principal: 16, secundario_n: 5, comp: [3, 13, 0], eval_retest: 'banco', nota: 'principal: 3Q de I-3 sin usar + 13 de I-3 en RE-TEST (las mismas preguntas reales, sin la clave)', eval: 'código de ayer II-1: 5Q en RE-TEST (las del banco del mié 2-dic)' },
};

/**
 * v6.03b (20-oct-2026) · TÉCNICA DE SIMULACRO (DATA/ENCAPS/METODO_SIMULACRO_ENCAPS.md): la de RaviMedTest («Cómo hacer un simulacro MIR de
 * manera EFICIENTE» · «EL DÍA DEL EXAMEN MIR: MI EXPERIENCIA» · «Cómo gestionar los percentiles» · «Cómo responde preguntas MIR un opositor del
 * percentil 100»; NotebookLM «MIR · RaviMedTest Engine», 20-oct) adaptada al formato ENCAPS del protocolo (72 s/Q, sin pausa, confianza 1-3,
 * corrección al final). Redacción propia. Se mete DENTRO de los pasos del mini-sim (30′/18′/5′/5′; v6.09b en F1: 30′/20′/4′/4′, ver RECETA_F1) y
 * del pre-test de arranque (24′): no cambia minutos ni franja. `reloj(n, min, formal)` = hitos del reloj del runner (cuenta atrás) cada 10 preguntas
 * dejando `formal` minutos de revisión.
 */
const TECNICA_SIM = {
  doc: 'DATA/ENCAPS/METODO_SIMULACRO_ENCAPS.md',
  /** «Q10 con ≥19:00 restantes · Q20 con ≥8:00 · Q25 con ≥3:00» (pasada a ritmo uniforme en min − formal minutos; redondeo hacia abajo). */
  reloj(n, min, formal) {
    const pasada = min - formal;
    const marcas = [...Array.from({ length: Math.floor(n / 10) }, (_, i) => (i + 1) * 10), ...(n % 10 ? [n] : [])];
    return marcas.map((q, i) => `Q${q} con ≥${Math.floor(min - (pasada * q) / n)}:00${i === 0 ? ' restantes' : ''}`).join(' · ');
  },
  /** Cómo del bloque cronometrado (mini-sim 25Q o pre-test 20Q). */
  como(n, min, formal, seg) {
    return `Técnica de simulacro (${this.doc}; adaptada de RaviMedTest): ① reloj del runner cada 10 preguntas — ${this.reloj(n, min, formal)}; si vas tarde, recupera en las siguientes, no al final · ② en orden, de la 1 a la ${n}; las ${Math.max(3, Math.round(n / 5))} primeras con atención extra (los nervios del arranque dan los fallos tontos) · ③ una sola decisión por pregunta: si una pasa de ${2 * seg} s (el doble de su tiempo), marca la mejor opción con confianza «adivinada» y avanza; ninguna sin responder (el runner la cuenta como fallo) · ④ últimos ${formal}′: revisión FORMAL de la 1 a la ${n} — ¿la letra es la que querías?, ¿leíste bien «NO · EXCEPTO · incorrecta»?, ¿todas con confianza? — y NUNCA cambies una respuesta por dudar del contenido: solo se corrige la forma.`;
  },
  /** Corrección del mini-sim en el orden de Ravi, con la taxonomía del protocolo. */
  CORRECCION: 'Orden (RaviMedTest adaptado): ① fallos que marcaste «segura» (falsa certeza: el error más caro) → ② resto de fallos → ③ aciertos NO ciegos («dudosa» o «adivinada»: un acierto por suerte se corrige como un fallo) → ④ fallos de forma (LECTURA · CAMBIO). Por ítem: área → código → tipo de fallo (knowledge: CONCEPTO · OLVIDO · CRONOLOGIA / transfer: CCSN · CONTEXTO / proceso: CAMBIO · TIEMPO · LECTURA) → la regla correcta en 1 línea + por qué es falso el distractor (suele ser el concepto vecino). Un código con ≥2 fallos queda CALIENTE: entra en el override de la semana siguiente (máx. 2 sustituciones; I-3 y V-2 nunca se ceden).',
  /** Lectura de la nota (Ravi: percentiles y comparaciones solo dentro del mismo instrumento). */
  COMPARA: 'La nota se compara SOLO con tus mini-sims anteriores (misma receta), nunca con notas de QX, Theomed u otro instrumento; una bajada aislada no dice nada: manda la regla de dos mini-sims seguidos.',
  /** Qué genera tarjeta (Ravi: pocas tarjetas, solo fallos «tontos» y detalles discriminativos; nunca la norma entera). */
  TARJETAS: 'Tarjeta solo de fallos «tontos» y de detalles discriminativos, en formato pregunta → respuesta breve (nunca un párrafo de la norma): OLVIDO de cifra/plazo → ENCAPS::Cifras (ANKI_COLA/ENCAPS_Cifras_2027-I.csv) · CONCEPTO/CCSN → el porqué a la nota Obsidian del código · fallos de proceso → regla de examen, sin tarjeta.',
  /** Envío de los APEX (flujo vigente: APEX directo en el chat ENCAPS desde el 16-nov; ronda c40: sin botón ni atajo; ronda c42: en 2.ª persona, como el resto de la guía). */
  ENVIO: 'Díctaselas al chat ENCAPS, que las crea en Anki (APEX::ENCAPS::…) y en Obsidian; Anki abierto en el PC.',
};

/**
 * v6.09b (lote 1-bis G, 17-nov-2026 · «no puede haber poco tiempo con mucho material ni mucho tiempo con poco material»): reparto de los 60′ de la
 * hora 16:15 de F1 medido con las reglas de la auditoría (72 s/Q ENCAPS · 90 s/Q con corrección inmediata · corrección 0,85′/Q · PDF 2′/p; paso OK
 * si necesario/asignado ∈ [0,85; 1,15]). Solo F1 (dia 2-32, desde `desde`): el mar 17-nov (D1) ya estaba en curso y conserva el reparto anterior, y
 * el CARRIL SÁBADO de la intensiva (2027) sigue como en la v6.09 (lote de 2027).
 *   · BANCO: 20Q del principal en 30′ + 5Q del secundario en 8′ (90 s/Q). El runner trae 16-20 + 0-5 (gen_encaps_minisim.js: pool del código);
 *     lo que falte hasta 20 / 5 sale del banco de respaldo (QX · App Banqueo, mismo tema) y el rótulo, el «cómo» y el registro lo dicen con números.
 *     Antes: «2Q en 8′» (0,38) · «16Q en 30′» (0,80) y un «cómo» que mandaba completar hasta 5 sin que el rótulo lo dijera.
 *   · MATERIAL (7′, solo si ≥2 fallos): acotado a ≤3 p a 2′/p.
 *   · PRE-TEST (mié 18-nov): eval 5Q = 6′ + 2′ de solución (8′, antes 10′: 0,80) · corrección 20Q × 0,85′ = 17′ (antes 15′).
 *     v6.11 (lun 23-nov, chat ENCAPS · pendiente 23.2): el día de un test CIEGO (pre-test de arranque o mini-sim) la eval anclada se responde SIN
 *     «Terminar y corregir» y sin leer soluciones; sus 2′ de solución pasan a la corrección, después del test ciego: eval 6′ · corrección 17′ + 2′ = 19′
 *     (mismos 60′).
 *   · MINI-SIM: corrección 25Q × 0,85′ = 21′ → 20′ (antes 18′: 1,18) · registro + cierre semanal 4′ · APEX + 1 cifra por código caliente 4′.
 */
const RECETA_F1 = {
  desde: '2026-11-18',
  banco: { principal: 20, secundario: 5, segQ: 90, material: { min: 7, paginas: 3 } },
  pretest: { eval: 6, correccion: 19 },
  minisim: { correccion: 20, registro: 4, apex: 4 },
};

/**
 * v6.11 (lun 23-nov, chat ENCAPS · pendiente 21.2): CUARENTENA de los exámenes reservados, UNA sola frase para las mañanas (gen_encaps_manana.js, antes su
 * constante RESERVA) y para todo paso de las 16:15 que saque preguntas de QX · App Banqueo · DR LOPEZ · Theomed (gen_encaps_guia.js; los runners de
 * BANCO_PROPIO solo traen examen oficial 2024-2A / 2025-1A / 2025-2). `RESERVA_FECHAS`: el PRE-TEST ciego 2026-II (_fechas_v6.json encaps.pretest) y el
 * ensayo general con el 2026-I (fila dress_rehearsal de _encaps_intensivo_2027.sql); los generadores abortan si dejan de coincidir. Desde el pre-test
 * hasta el ensayo general solo queda la reserva del 2026-I (reservaDe, por el día REAL de la sesión); después, nada.
 */
const RESERVA_FECHAS = { pretest: '2027-01-08', ensayo: '2027-03-11' };
const RESERVA = 'Cuarentena: nada del 2026-II de ninguna carrera antes del vie 8-ene. Reservados: el ENCAPS 2026-II real (pre-test ciego del vie 8-ene) y el 2026-I (ensayo general del jue 11-mar).';
const RESERVA_2026_I = 'Reservado: el ENCAPS 2026-I (ensayo general del jue 11-mar).';
const reservaDe = (realISO) => (realISO < RESERVA_FECHAS.pretest ? RESERVA : realISO < RESERVA_FECHAS.ensayo ? RESERVA_2026_I : '');

/**
 * v6.11 · ronda c40 (ítem 36a, lun 23-nov, chat ENCAPS · PIZARRA FÍSICA = fuga): la pizarra del mes (cifras exactas: plazos, dosis, metas) está a la vista TODO
 * el día, no solo en su paso de las 18:00. Regla común de gen_encaps_guia.js (la hora de las 16:15) y gen_encaps_manana.js (mañanas, 18:00, sábado, domingo,
 * recuperaciones; comprueba también las 16:15 con todos los bloques del día):
 *   · el PRIMER bloque ENCAPS de cada día real con un runner ciego (pre-test · mini-sim · simulacro no sustituido de BANCO_PROPIO) que aún no terminó cuando
 *     empieza ese bloque —ese mismo día o en los 2 días reales siguientes— lleva PIZARRA.tapa(el último de esos runners) (el mismo criterio que el paso
 *     «Pizarra: HOY NO» de las 18:00, ítem 28: PIZARRA.hasta);
 *   · el primer bloque ENCAPS después de un runner, si ya no queda ninguno pendiente, lleva PIZARRA.DESTAPA.
 * El runner se nombra por su FECHA DE PLAN y su hora, como todas las fechas de las guías (la app y el Calendar la pintan con su día real).
 * Ronda c42 (ítem 39, lun 23-nov, chat ENCAPS · los huecos entre runners de F1 dejaban a la vista cifras del siguiente: #150, #127 y #74 del mini-sim 2/5,
 * #122 del 3/5): en F1 la pizarra va tapada SIN VENTANA. Desde el primer día de F1 (su día real: mar 24-nov) y mientras quede pendiente algún runner ciego de
 * F1 (día real antes de la intensiva), el primer bloque ENCAPS de CADA día real lleva la línea con el ÚLTIMO de ellos, y DESTAPA va solo tras ese último: sin
 * destapes intermedios. Un runner de F1 generado más tarde (el mini-sim 4/5 o el 5/5) alarga la regla solo. Los de la intensiva conservan la ventana de 2 días:
 * el pre-test 2026-II del vie 8-ene (con guía local, PIZARRA.cubre) y los de F2, después del pre-test, cuya línea va en el SQL de la intensiva (PIZARRA.faltaSQL:
 * gen_encaps_manana.js sale con código 1 mientras falte). La línea dice el número del runner (PIZARRA.parteDe) y su franja: «Pizarra tapada entera hasta que
 * termine el mini-sim 3/5 del vie 4-dic (16:15-17:15).»
 * Remate de la c42 (revisiones): el pre-test 2026-II cuenta aunque aún no tenga JSON (PIZARRA.conPretest) · la franja de un runner del carril sábado o del
 * carril B sale del SQL (PIZARRA.carrilSQL) · faltaSQL pide en cada fila la línea de la regla común (una sola, la del último runner pendiente) y el destape
 * del pre-test 2026-II.
 * Ronda c44 (ítem 41, lun 23-nov, chat ENCAPS · opción (a)): para la PIZARRA, un mini-sim de F1 PROGRAMADO (fila mini_sim del SQL de mantenimiento) que aún no
 * tiene runner SÍ alarga la regla, igual que el pre-test 2026-II sin JSON (PIZARRA.conProgramados = conPretest + PIZARRA.f1SinRunner, con la franja de
 * PIZARRA.horaDe): tapada sin ventana hasta que termine el último mini-sim de F1 (hoy el 5/5 del vie 18-dic de plan, 16:15-17:15) y un solo «ya puedes
 * destaparla», tras él. Para las CIFRAS no aparta ninguna fila: sin ítems no hay nada que apartar (el filtro de cifras de gen_encaps_manana.js usa solo los
 * runners con JSON); que un mini-sim de F1 generado más tarde no tome un ítem que una fila de CIFRAS_CRITICAS ya enseñó lo hace gen_encaps_minisim.js (FUGA).
 */
const PIZARRA_TIPO = { pretest: 'pre-test', mini_sim: 'mini-sim', simulacro: 'simulacro' };
const pzMin = (h) => { const [a, b] = String(h).split(':').map(Number); return a * 60 + b; };
const pzMas = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const PIZARRA = {
  DESTAPA: 'Pizarra: ya puedes destaparla.',
  nombre: (x) => `${PIZARRA_TIPO[x.tipo] || x.tipo}${x.parte ? ` ${x.parte}` : ''}`,
  /** «que termine el mini-sim 3/5 del vie 4-dic (16:15-17:15)»: lo dicen igual la línea del primer bloque y el paso «Pizarra: HOY NO» de las 18:00 */
  hastaTxt: (x, corta) => `que termine el ${PIZARRA.nombre(x)} del ${corta(x.plan)} (${x.ini}-${x.fin})`,
  tapa: (x, corta) => `Pizarra tapada entera hasta ${PIZARRA.hastaTxt(x, corta)}.`,
  /** número del runner: el de su JSON (_meta.parte/_meta.de: pre-test de arranque 1/2 y 2/2) · el de un mini-sim de F1, su orden entre las filas mini_sim del
   *  SQL de mantenimiento (= «MINI-SIM n/N» de su guía, gen_encaps_guia.js › MS_F1) · null si no tiene */
  parteDe: (j) => {
    if (j._meta && j._meta.parte && j._meta.de) return `${j._meta.parte}/${j._meta.de}`;
    if (j.tipoRonda !== 'mini_sim') return null;
    const fs = require('fs'), path = require('path');
    const ms = fs.readFileSync(path.join(__dirname, '_encaps_mantenimiento_2027.sql'), 'utf8').split(/\r?\n/)
      .map((l) => /^\('ENCAPS',\d+,'(\d{4}-\d\d-\d\d)','[^']*','mini_sim'/.exec(l)).filter(Boolean).map((m) => m[1]).sort();
    const i = ms.indexOf(j.fecha);
    return i >= 0 ? `${i + 1}/${ms.length}` : null;
  },
  /** runner de F1 (día real antes de la intensiva) → día real desde el que su pizarra va tapada sin ventana (el primer día de F1) · si no, null (ventana de 2 días) */
  sinVentanaDe: (real, F6, FR) => (real < F6.encaps.intensiva_desde ? FR.ordenRealDe(F6.f1.inicio, F6, 'encaps') : null),
  /** runners = [{ plan, real, ini, fin, tipo, parte, sinVentana }] → el último que aún no terminó a las `ini` del día real `dia` y que es de ese día, cae en los
   *  2 días reales siguientes o es de F1 y `dia` ya está en F1 (sinVentana) */
  hasta: (runners, dia, ini) => runners.filter((x) => (x.real === dia && pzMin(x.fin) > pzMin(ini)) || (x.real > dia && (x.real <= pzMas(dia, 2) || (!!x.sinVentana && dia >= x.sinVentana))))
    .sort((a, b) => (a.real < b.real ? -1 : a.real > b.real ? 1 : pzMin(a.fin) - pzMin(b.fin))).pop() || null,
  /** bloques = [{ key, real, ini }] (TODOS los bloques ENCAPS de los días que se miran) → Map key → { tipo: 'tapa' | 'destapa', texto } */
  lineas: (runners, bloques, corta) => {
    const bs = [...bloques].sort((a, b) => (a.real < b.real ? -1 : a.real > b.real ? 1 : pzMin(a.ini) - pzMin(b.ini)));
    const out = new Map();
    bs.forEach((b, i) => { const x = i && bs[i - 1].real === b.real ? null : PIZARRA.hasta(runners, b.real, b.ini); if (x) out.set(b.key, { tipo: 'tapa', texto: PIZARRA.tapa(x, corta) }); });
    for (const r of runners) {
      const b = bs.find((y) => y.real > r.real || (y.real === r.real && pzMin(y.ini) >= pzMin(r.fin)));
      if (b && !out.has(b.key) && !PIZARRA.hasta(runners, b.real, b.ini)) out.set(b.key, { tipo: 'destapa', texto: PIZARRA.DESTAPA });
    }
    return out;
  },
  /** días reales que cubre la regla: F1, la transición y la semana 1 de la intensiva hasta el pre-test 2026-II incluido (las mañanas 19-21 del mar 5 al
   *  jue 7-ene tienen guía local); después mandan los bloques del SQL de la intensiva, que no tienen guía local donde poner la línea */
  cubre: (real, F6) => real < F6.encaps.intensiva_desde || real <= F6.encaps.pretest,
  /** hora de un runner de la intensiva (pre-test 2026-II · SIM 100Q): la de su SIM en la fila del SQL (extra.sim.hora + n × seg_por_q) · null si no hay */
  simSQL: (fecha) => {
    const fs = require('fs'), path = require('path');
    const l = fs.readFileSync(path.join(__dirname, '_encaps_intensivo_2027.sql'), 'utf8').split(/\r?\n/).find((x) => x.startsWith("('ENCAPS',") && x.includes(`,'${fecha}',`));
    const m = l && /"sim":(\{[^{}]*\})/.exec(l); if (!m) return null;
    const s = JSON.parse(m[1]); if (!/^\d\d:\d\d$/.test(s.hora || '') || !(s.n > 0) || !(s.seg_por_q > 0)) return null;
    const fin = pzMin(s.hora) + Math.ceil((s.n * s.seg_por_q) / 60);
    return { ini: s.hora, fin: `${String(Math.floor(fin / 60)).padStart(2, '0')}:${String(fin % 60).padStart(2, '0')}` };
  },
  /** franja de un runner de la intensiva sin SIM en su fila: la del CARRIL SÁBADO (extra.carril_sabado.ini/fin de la fila del viernes host, fecha = el sábado:
   *  14:00-15:00) · la del CARRIL B de su fila (extra.carril_b: a las 16:15, 16:15-17:15) · null si no hay */
  carrilSQL: (fecha) => {
    const fs = require('fs'), path = require('path');
    const ls = fs.readFileSync(path.join(__dirname, '_encaps_intensivo_2027.sql'), 'utf8').split(/\r?\n/).filter((x) => x.startsWith("('ENCAPS',"));
    for (const l of ls) {
      const i = l.indexOf('"carril_sabado":{'); if (i < 0) continue;
      const cs = l.slice(i, l.indexOf('{', i + 17) > 0 ? l.indexOf('{', i + 17) : undefined), g = (k) => (new RegExp(`"${k}":"([^"]*)"`).exec(cs) || [])[1];
      if (g('fecha') === fecha && /^\d\d:\d\d$/.test(g('ini') || '') && /^\d\d:\d\d$/.test(g('fin') || '')) return { ini: g('ini'), fin: g('fin') };
    }
    const l = ls.find((x) => x.includes(`,'${fecha}',`));
    return l && l.includes('"carril_b":{') ? { ini: '16:15', fin: '17:15' } : null;
  },
  /** hora real de un runner ciego: la de su bloque movido (corrida_s1.extra) · en la intensiva, la de su SIM en el SQL (el pre-test 2026-II = 07:15-09:15) o la
   *  de su carril (sábado 14:00-15:00 · carril B 16:15-17:15: PIZARRA.carrilSQL) · si no, la hora ENCAPS de F1 (16:15-17:15). fuente 'sin_fuente' = runner de la
   *  intensiva sin SIM ni carril en el SQL (el que llama avisa: la hora es un supuesto) */
  horaDe: (plan, real, F6, FR) => {
    const x = FR.extraListaDe(real, F6).find((y) => y.frente === 'encaps' && y.plan === plan);
    if (x) return { ini: x.ini, fin: x.fin, fuente: 'extra' };
    const s = real >= F6.encaps.intensiva_desde ? PIZARRA.simSQL(plan) || PIZARRA.carrilSQL(plan) : null;
    return s ? { ...s, fuente: 'sql' } : { ini: '16:15', fin: '17:15', fuente: real >= F6.encaps.intensiva_desde ? 'sin_fuente' : 'f1' };
  },
  /** los runners de la pizarra = los de BANCO_PROPIO + el pre-test 2026-II (encaps.pretest) aunque aún no tenga JSON (gen_encaps_minisim.js --pretest lo arma
   *  antes del lun 4-ene): su ventana de 2 días no depende de cuándo se genere. Solo para la pizarra: sin ítems, no aparta filas de cifras */
  conPretest: (runners, F6, FR) => {
    const plan = F6.encaps.pretest;
    if (runners.some((x) => x.tipo === 'pretest' && x.plan === plan)) return runners;
    const real = FR.ordenRealDe(plan, F6, 'encaps'), h = PIZARRA.horaDe(plan, real, F6, FR);
    return [...runners, { f: '(pre-test 2026-II, aún sin runner)', plan, real, ini: h.ini, fin: h.fin, items: new Set(), tipo: 'pretest', parte: null, sinVentana: PIZARRA.sinVentanaDe(real, F6, FR) }];
  },
  /** los runners de la pizarra = conPretest + los mini-sims de F1 programados que aún no tienen runner (PIZARRA.f1SinRunner; ronda c44, ítem 41): cuentan
   *  como pendientes desde ya, con su número (n/N del SQL de mantenimiento) y su franja (PIZARRA.horaDe: la de su bloque movido o 16:15-17:15). Solo para la
   *  pizarra: sin ítems, no apartan filas de cifras. Cuando se genere su JSON, el runner de BANCO_PROPIO ocupa su sitio (mismo plan, número y franja) */
  conProgramados: (runners, F6, FR) => [...PIZARRA.conPretest(runners, F6, FR), ...PIZARRA.f1SinRunner(runners, F6, FR).map((y) => {
    const h = PIZARRA.horaDe(y.plan, y.real, F6, FR);
    return { f: `(mini-sim ${y.parte} de F1, aún sin runner)`, plan: y.plan, real: y.real, ini: h.ini, fin: h.fin, items: new Set(), tipo: 'mini_sim', parte: y.parte, sinVentana: PIZARRA.sinVentanaDe(y.real, F6, FR) };
  })],
  /** mini-sims de F1 programados (filas mini_sim del SQL de mantenimiento, día real antes de la intensiva) que aún no tienen runner → [{ plan, real, parte }]
   *  (ronda c44: la pizarra los cuenta como pendientes, PIZARRA.conProgramados; ya no hay aviso por un «ya puedes destaparla» antes de uno: no puede haberlo) */
  f1SinRunner: (runners, F6, FR) => {
    const fs = require('fs'), path = require('path');
    const ms = fs.readFileSync(path.join(__dirname, '_encaps_mantenimiento_2027.sql'), 'utf8').split(/\r?\n/)
      .map((l) => /^\('ENCAPS',\d+,'(\d{4}-\d\d-\d\d)','[^']*','mini_sim'/.exec(l)).filter(Boolean).map((m) => m[1]).sort();
    return ms.map((plan, i) => ({ plan, real: FR.ordenRealDe(plan, F6, 'encaps'), parte: `${i + 1}/${ms.length}` }))
      .filter((y) => y.real < F6.encaps.intensiva_desde && !runners.some((x) => x.plan === y.plan && x.tipo === 'mini_sim'));
  },
  /** los runners ciegos de BANCO_PROPIO, como RUNNERS_CIEGOS de gen_encaps_manana.js (día real y hora con el alias de ENCAPS: FR = gen_fechas_v6) */
  runners: (dir, F6, FR) => {
    const fs = require('fs'), path = require('path'), out = [];
    for (const f of fs.readdirSync(dir).filter((x) => /\.json$/.test(x) && !x.startsWith('_')).sort()) {
      let j = null;
      try { j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) {
        if (/^(pretest|mini_?sim|sim)/i.test(f)) throw new Error(`PIZARRA.runners: BANCO_PROPIO/${f} es un runner ciego con JSON ilegible (${e.message}): sin él, la pizarra no se taparía antes de su test`);
        continue;
      }
      if (!j || !['pretest', 'mini_sim', 'simulacro'].includes(j.tipoRonda) || (j._meta && j._meta.sustituido_por) || !/^\d{4}-\d\d-\d\d$/.test(j.fecha || '')) continue;
      const real = FR.ordenRealDe(j.fecha, F6, 'encaps'), h = PIZARRA.horaDe(j.fecha, real, F6, FR);
      out.push({ f, plan: j.fecha, real, ini: h.ini, fin: h.fin, tipo: j.tipoRonda, parte: PIZARRA.parteDe(j), sinVentana: PIZARRA.sinVentanaDe(real, F6, FR) });
    }
    return out;
  },
  /** la pizarra de los runners ciegos de la intensiva en el SQL de la intensiva (sin guía local) → [{ x, falta: [días reales sin la línea], destapa: bool, sig,
   *  texto }]. Runners de F2 (día real después del pre-test 2026-II): cada fila del D-2 al D lleva la línea que pide la regla común ese día (PIZARRA.hasta: la
   *  del ÚLTIMO runner pendiente, una sola por fila aunque dos runners caigan juntos); si un runner no tiene ninguna fila en su ventana, falta el propio D.
   *  DESTAPA (también el del pre-test 2026-II: después de él no hay guía local) va en la primera fila desde el día del runner, salvo que siga pendiente otro.
   *  Lo que no está en el SQL tampoco puede estar en study_schedule_reshift25_backup. */
  faltaSQL: (runners, F6, FR, corta) => {
    const fs = require('fs'), path = require('path');
    const filas = fs.readFileSync(path.join(__dirname, '_encaps_intensivo_2027.sql'), 'utf8').split(/\r?\n/).filter((l) => l.startsWith("('ENCAPS',"))
      .map((l) => { const m = /^\('ENCAPS',\d+,'(\d{4}-\d\d-\d\d)'/.exec(l); return m ? { real: FR.ordenRealDe(m[1], F6, 'encaps'), l } : null; }).filter(Boolean)
      .sort((a, b) => (a.real < b.real ? -1 : a.real > b.real ? 1 : 0));
    const f2 = runners.filter((r) => r.real > F6.encaps.pretest), ven = (x) => [pzMas(x.real, -2), pzMas(x.real, -1), x.real];
    const out = new Map(), de = (x) => { if (!out.has(x)) out.set(x, { x, falta: [], destapa: true, sig: null, texto: PIZARRA.tapa(x, corta) }); return out.get(x); };
    for (const y of filas.filter((z) => f2.some((x) => ven(x).includes(z.real)))) {
      const x = PIZARRA.hasta(f2, y.real, '00:00');
      if (x && !y.l.includes(PIZARRA.tapa(x, corta))) de(x).falta.push(y.real);
    }
    for (const x of f2) if (!filas.some((y) => ven(x).includes(y.real))) de(x).falta.push(x.real);
    for (const x of runners.filter((r) => r.real >= F6.encaps.pretest)) {
      const sig = filas.find((y) => y.real >= x.real);
      if (sig && !PIZARRA.hasta(runners.filter((y) => y !== x), sig.real, sig.real === x.real ? x.fin : '00:00') && !sig.l.includes(PIZARRA.DESTAPA)) Object.assign(de(x), { destapa: false, sig: sig.real });
    }
    return [...out.values()].sort((a, b) => (a.x.real < b.x.real ? -1 : a.x.real > b.x.real ? 1 : 0));
  },
};

/**
 * v6.11 · ronda c44 (ítem 41, PROPUESTA del chat ENCAPS): la regla de FUGA a los tests ciegos por id (ítem 23.1) y la lista CONCEPTOS_LIGADOS (ítem 34) viven
 * aquí porque las usan dos generadores: gen_encaps_manana.js (una fila de CIFRAS_CRITICAS citada por un runner ciego aún no hecho no sale en las cifras) y
 * gen_encaps_minisim.js (un mini-sim de F1 que se genera ahora no toma un ítem que una fila de CIFRAS_CRITICAS §3 ya cita: esa fila pudo salir en las cifras
 * antes de que el runner existiera; así el ítem sigue siendo ciego). Ítem real = «AAAA-XX-Qn» (2025-1A-Q35, 2024-2A-Q12…; también tras una coma o un «·»; el
 * cero a la izquierda no cuenta); las filas del 2026-II («pregunta real Qn del 2026-II») no lo citan así y no cuentan.
 */
const RE_ITEM_REAL = /\b(\d{4}-[0-9A-Z]+)-Q0*(\d+)\b/g;
const FUGA = {
  RE_ITEM_REAL,
  itemsRealesDe: (t) => [...String(t || '').matchAll(RE_ITEM_REAL)].map((m) => `${m[1]}-Q${m[2]}`),
  /** fila → ítems de un runner que la fila RESPONDE por su concepto aunque su «Fuente verificada» no los cite (lista MANUAL, fila a fila, la decide el chat
   *  ENCAPS): cada ítem cuenta igual que uno de la fuente. #102 (método científico, enfoque sistemático) responde R-2024-2A-Q46 (mini-sim del vie 4-dic de plan).
   *  La #103 no va aquí (decisión del chat ENCAPS). */
  CONCEPTOS_LIGADOS: { 102: ['2024-2A-Q46'] },
  /** filas de CIFRAS_CRITICAS_2027-I.md §3 → [{ n, cod, items }] (items = los ítems reales de su «Fuente verificada» + los de CONCEPTOS_LIGADOS); lanza un
   *  Error si la tabla no se lee entera o si CONCEPTOS_LIGADOS no cuadra */
  filasCifras: (texto) => {
    const filas = [];
    for (const l of String(texto).split(/\r?\n/)) {
      const m = /^\| (\d+) \| ([^|]+)\|/.exec(l); if (!m) continue;
      const c = l.split('|');
      filas.push({ n: Number(m[1]), cod: m[2].replace(/[*★]/g, '').trim(), items: FUGA.itemsRealesDe(c.slice(5, c.length - 1).join('|')) });
    }
    if (filas.length < 100) throw new Error(`CIFRAS_CRITICAS_2027-I.md §3: solo ${filas.length} filas leídas`);
    for (const [n, ids] of Object.entries(FUGA.CONCEPTOS_LIGADOS)) {
      const r = filas.find((x) => x.n === Number(n));
      if (!r) throw new Error(`CONCEPTOS_LIGADOS: la fila #${n} no está en CIFRAS_CRITICAS_2027-I.md §3`);
      for (const id of ids) {
        const it = FUGA.itemsRealesDe(id);
        if (it.length !== 1) throw new Error(`CONCEPTOS_LIGADOS #${n}: «${id}» no es un ítem real (AAAA-XX-Qn)`);
        if (!r.items.includes(it[0])) r.items.push(it[0]);
      }
    }
    return filas;
  },
  /** ítems reales que cita el CSV del mazo (TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv: la FUENTE ÚNICA de la tabla, §4 de CIFRAS_CRITICAS) en sus
   *  etiquetas «fuente::…» → Set (ronda c44, revisión: una línea añadida al CSV —un OLVIDO de esa tarde, §1.3— antes de regenerar el .md también cuenta para el
   *  filtro del mini-sim; aquí el 2026-II sí sale como «2026-II-Qn»: el que llama lo excluye). Solo lectura */
  idsCSV: (texto) => new Set(String(texto || '').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).flatMap((l) => FUGA.itemsRealesDe((l.match(/fuente::\S+/g) || []).join(' ')))),
};

module.exports = { F, D, OBS_BASE, PROYECTO, AREA, PLAN_B_QX, POSTEST_DRLOPEZ, OBSIDIAN, ALIAS_FICHAS, DRIVE_POR_CODIGO, FICHA_SUBEJE, AVISO_CODIGO, PREVISTO_SEMANA2, PREVISTO_ORIGEN, TECNICA_SIM, RECETA_F1, RESERVA_FECHAS, RESERVA, RESERVA_2026_I, reservaDe, PIZARRA, FUGA };
