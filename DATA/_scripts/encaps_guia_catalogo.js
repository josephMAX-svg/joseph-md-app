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
 *   · PREVISTO_SEMANA2 = composición simulada (20-oct, copia aislada, v6.03) de `--eval/--banco 2026-10-28` y `--eval/--banco 2026-10-29`
 *     (solo informe): en v6.03 los runners del lun 26 (banco V-2 + eval I-3) y del mar 27 (banco III-5 + eval V-2) YA EXISTEN (re-fechados
 *     desde el mié 21 / jue 22 de la v6.02); faltan los del mié 28 (II-5) y jue 29 (I-4) → RUNBOOK_SEMANA2_2026-10-26.md.
 *     (v6.02: era el `--semana 2026-10-26 --dry` del 18-oct, con II-5 · I-4 · IV-1 · II-4 del lun 26 al jue 29.)
 * Lista negra: nada del examen ENCAPS 2026-II (reservado como pre-test del vie 8-ene-2027). THEOMED «Banqueo Final.mp4» (11-oct) NO se
 * enlaza: puede contener el 2026-II (S2 §7).
 * v6.02c (18-oct-2026, E4): nuevo. · v6.03 (20-oct-2026): PREVISTO_SEMANA2 re-simulado con la F1 corrida al mié 21-oct.
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
const POSTEST_DRLOPEZ = { t: 'DR LOPEZ · 🚀 PosTest 2026-I por área (con claves de academia)', url: D('1HiH_Jtl-1aCxnHlvcE-xhFslHuey-gy-') };

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
  'II-EMG': 'Las fichas de triaje son de may-jul 2026: las cifras P-I inmediato · P-II ≤10 min · P-III ≤30 min se cotejan con la RM de jul-2026 antes de anotarlas.',
};

/**
 * Semana 2 (lun 26 → jue 29-oct, v6.03): lun 26 (D4) banco V-2 planeamiento + eval I-3 y mar 27 (D5) banco III-5 + eval V-2 YA ARMADOS (re-fechados
 * desde la v6.02). Faltan mié 28 (D6, II-5) y jue 29 (D7, I-4): composición simulada el 20-oct en copia aislada con
 * `--eval 2026-10-28` → `--banco 2026-10-28` → `--eval 2026-10-29` → `--banco 2026-10-29` (mismo orden que --semana; sin --semana, que
 * re-sortearía los bancos ya armados del lun 26 y mar 27). Solo informe: la guía lo usa mientras el runner no exista.
 */
const PREVISTO_SEMANA2 = {
  '2026-10-28': { principal: 20, secundario: 2, nota: 'secundario II-10: solo 2Q en el pool (receta 4-5) · tras este banco quedan 0Q libres de II-5 · la eval (III-5, código de ayer) sale 5/5 re-test: el pool libre de III-5 ya está a 0', eval: 'código de ayer III-5: 3 cifras + 2 viñetas (5Q re-test)' },
  '2026-10-29': { principal: 16, secundario: 4, nota: 'tras este banco quedan 0Q libres de I-4 · la eval (II-5, código de ayer) sale 5/5 re-test: el banco del mié 28 consume todo el pool libre de II-5', eval: 'código de ayer II-5: 3 cifras + 2 viñetas (5Q re-test)' },
};

/**
 * v6.03b (20-oct-2026) · TÉCNICA DE SIMULACRO (DATA/ENCAPS/METODO_SIMULACRO_ENCAPS.md): la de RaviMedTest («Cómo hacer un simulacro MIR de
 * manera EFICIENTE» · «EL DÍA DEL EXAMEN MIR: MI EXPERIENCIA» · «Cómo gestionar los percentiles» · «Cómo responde preguntas MIR un opositor del
 * percentil 100»; NotebookLM «MIR · RaviMedTest Engine», 20-oct) adaptada al formato ENCAPS del protocolo (72 s/Q, sin pausa, confianza 1-3,
 * corrección al final). Redacción propia. Se mete DENTRO de los pasos del mini-sim (30′/18′/5′/5′) y del pre-test de arranque (24′): no cambia
 * minutos ni franja. `reloj(n, min, formal)` = hitos del reloj del runner (cuenta atrás) cada 10 preguntas dejando `formal` minutos de revisión.
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
  COMPARA: 'La nota se compara SOLO con tus mini-sims anteriores (misma receta), nunca con notas de QX, Theomed u otro instrumento; una bajada aislada no dice nada: manda la regla de dos viernes seguidos.',
  /** Qué genera tarjeta (Ravi: pocas tarjetas, solo fallos «tontos» y detalles discriminativos; nunca la norma entera). */
  TARJETAS: 'Tarjeta solo de fallos «tontos» y de detalles discriminativos, en formato pregunta → respuesta breve (nunca un párrafo de la norma): OLVIDO de cifra/plazo → ENCAPS::Cifras (ANKI_COLA/ENCAPS_Cifras_2027-I.csv) · CONCEPTO/CCSN → el porqué a la nota Obsidian del código · fallos de proceso → regla de examen, sin tarjeta.',
  /** Envío de los APEX (flujo vigente). */
  ENVIO: 'Envío: ⚡ APEX 1-TAP (Ctrl+Shift+A) → n8n → Anki APEX::ENCAPS (subdeck del código) + nota del código en el vault; si el redeploy de n8n aún no está verificado, directo en Anki.',
};

module.exports = { F, D, OBS_BASE, PROYECTO, AREA, PLAN_B_QX, POSTEST_DRLOPEZ, OBSIDIAN, ALIAS_FICHAS, DRIVE_POR_CODIGO, FICHA_SUBEJE, AVISO_CODIGO, PREVISTO_SEMANA2, TECNICA_SIM };
