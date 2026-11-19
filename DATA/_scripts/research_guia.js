/**
 * research_guia.js — construye la GUÍA «qué · cuánto · cómo» de cada átomo de Research (formato común GuiaBloque de src/lib/guia.ts).
 * Lo llama gen_research_plan.js (fuente única del plan) y el resultado se escribe en src/lib/researchGuia.ts (GENERADO).
 *   · 45′ en la franja 13:30–14:15 (bloque R↔D interdiario) · Σ pasos = 45 (aborta si no).
 *   · Átomos con guía PASO A PASO (semanas 1-2 del régimen; v6.06: mar 3 → vie 13-nov, orden M1 · R0 · R1 · C-1 · M2 · v6.05: lun 26-oct → jue 5-nov · v6.03: jue 22-oct → mar 3-nov · v6.02: R0 · R1 · M1 · C-1 · M2): qué cuentas/qué abstract/qué plantilla, cuántos
 *     minutos, cómo y con el enlace exacto (URLs ya verificadas en REC / MENTORES.md / candidatos.md; el abstract de R1 = PMID 19807760,
 *     verificado en PubMed E-utilities el 18-oct-2026).
 *   · El resto: guía estructurada desde las 5 franjas del bloque (eval anclada 5 · pre-test 5 · deep work 25 con el recurso 1 del átomo ·
 *     free recall 5 · APEX 5) con el objetivo, el entregable (= «terminado cuando»), el artefacto y los chips del propio átomo.
 *   · F4 (desde el SERUMS, fecha ≥ serums.inicio): 30′ en tiempo muerto de la posta, sin hora fija → franja NOMINAL 13:30–14:00 con aviso.
 *   · Pausa de átomos (intensiva ENCAPS): GUIA_RESEARCH_MINIMO 30′ (DJ-4).
 * Regla anti-alucinación: nada de páginas ni URLs nuevas sin verificar; lo «A VERIFICAR» se dice.
 * v6.02c (18-oct-2026, E4): nuevo.
 * v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; Research d1 jue 22-oct): la ventana de la consulta Crossref de C-1 deja de estar cableada
 *   (29-ago → 28-oct = los 60 días previos a C-1 en v6.02) y se deriva de la fecha REAL de C-1 (60 días hacia atrás → C-1); los mensajes a
 *   mentores (M1/M2) dicen «con las fechas del plan vigente» en vez de «v6.02». Las fechas de cada paso ya salían de fechaDe() (sin cambio).
 * v6.05 (24-oct-2026 · corrimiento D1 = lun 26-oct; Research d1 lun 26-oct): la versión que citan M1/M2 sale de _fechas_v6.json (antes «v6.03» escrito)
 *   y la sección nueva de candidatos.md de C-1 lleva el mes REAL de C-1 (v6.05: mar 3-nov → «nov-2026»; antes «oct-2026» escrito).
 * v6.06 (31-oct-2026 · corrimiento D1 = lun 2-nov; Research d1 mar 3-nov): M1 pasa a la 1.ª sesión Research (su plazo interno del 31-oct venció sin
 *   día-Research) → la «eval anclada» de cada guía paso a paso sale de evalAnclada(prev), según el átomo ANTERIOR real (antes cada guía asumía el
 *   orden R0 → R1 → M1 → C-1 → M2 y M1 habría leído prev.code de null); M1 sin átomo previo abre con un «arranque». El texto del caso de M1 marca
 *   el 31-oct como VENCIDO (sin plazo nuevo). GUIA_RESEARCH_MINIMO: si el paquete del case report (CR-8) ya no se congela antes de la pausa (v6.06:
 *   nivel 2 de la regla de desplazamiento), el paso 3 repasa el borrador v1 (CR-5) en vez del paquete.
 * v6.06 (fix, 31-oct-2026): al pasar M1 a d1 y R0 a d2 se perdían las 2Q de la eval anclada de M1 (ICMJE · CRediT): R0 abría con un «Arranque» fijo de
 *   2′ y nunca llamaba a evalAnclada(prev). Ahora, si R0 tiene átomo previo, esos mismos 2′ llevan la eval anclada EXPRESS del previo (sus 2Q, tabla
 *   Q2 = fuente única con las evals de 5′) + el arranque; minutos sin cambio (Σ 45). «¿Respondió el Dr. Ciro?» sigue en la eval de R1 (ciroPend).
 *   CONTROL (aborta la generación): toda guía paso a paso con átomo previo abre con su eval anclada y cita sus 2Q · ningún átomo con 2Q queda seguido
 *   de una guía genérica antes del SERUMS · alguna guía tras M1 pregunta por la respuesta del Dr. Ciro.
 * v6.08 (14-nov-2026 · re-fecha D1 = lun 16-nov; pausa desde el jue 21-ene): GUIA_RESEARCH_MINIMO calcula el paso 3 con el ÚLTIMO paso del case report
 *   cerrado antes de la pausa: «relee el borrador v1 (CR-5)» solo si CR-5 va antes de la pausa (desde la v6.07 va tras ella: el texto fijo era falso);
 *   si no, repasa lo cerrado (v6.08: CR-2, consentimiento) y apunta lo que falta para el primer paso tras la pausa (v6.08: CR-3, fotos).
 * v6.10e (18-nov-2026 · BASE CERO + PREGUNTAS REALES, orden de Joseph: «las preguntas tienen que ser REALES · todos partimos de CERO»): Research no tiene
 *   banco de preguntas real propio → las «2Q de auto-test» de las evals ancladas (preguntas escritas por la IA) pasan a RECALL EN BLANCO de los 2 puntos
 *   clave del átomo previo, contrastados con su fuente real (recurso 1 del átomo); el pre-test de M1 es un recall en blanco y su corrección (y la «clave» del
 *   abstract) sale de las fuentes reales (checklists oficiales, el propio abstract), no de un chat. + FASES (base cero): FASES_RESEARCH / faseResearchAviso →
 *   cada guía abre su aviso con la fase, qué se hace y el criterio para pasar a la siguiente. Síntesis con fuentes: DATA/RESEARCH/METODO_BASE_CERO.md.
 * v6.10 · fix 18-nov (revisión de los frentes): (1) el recall en blanco de la eval anclada genérica se corregía contra recs[0] del átomo previo, que a veces es
 *   un portal o una herramienta (Rising Scholars, PubMed, Crossref, Editorial Manager): no hay clave que leer. Ahora fuenteContraste(prev): la fuente propia
 *   del átomo si su método vive en su artefacto (CONTRASTE_DE: M2 → MENTORES.md §3 · C-2 → diana.md + las 5 letters modelo · C-4 → refs_verified.json + la
 *   cabecera de citation_verifier.py · C-5 → Author Guidelines de la revista + cover_letter.md), si no el primer recurso que es DOCUMENTO o GUÍA (REC_DOC) y,
 *   si no hay ninguno, el artefacto y el objetivo del átomo previo. CONTROL: ninguna eval anclada contrasta con un recurso que no esté en REC_DOC.
 *   (2) CONTROL: la UI de Research (src/components/study/Research*.tsx) tampoco puede pedir «2Q de auto-test» (la tarjeta «Eval anclada» las seguía pidiendo).
 * v6.10g (revisión 18-nov · c10/c11, cortes del Calendar: «qué» ≤ 150, «cómo» ≤ 110): (1) la ventana Crossref de C-1 va hasta el día REAL de la sesión
 *   (fechaReal: plan vie 27-nov → lun 30-nov · 1-oct → 30-nov, texto y URLs) · (2) la eval anclada genérica nombra PRIMERO el artefacto a comprobar
 *   («¿existe «…»? + recall en blanco …»; antes quedaba fuera del corte) · (3) Research mínimo (DJ-4): las fechas de CR-3 → CR-8 y del SUBMIT CR-9 al principio
 *   del «qué» y del «cómo» · (4) CONTRASTE_DE['X-5'] = «MENTORES.md §Campaña de cold emails» (la sección ya no lleva «feb-2027»).
 * v6.10i (auditoría del volcado c12/c13, 18-nov): (1) eval anclada (genérica y paso a paso): PRIMERO el recall en blanco contrastado con su fuente real
 *   (ICMJE, AMSTAR-2, Academic Phrasebank, CARE…) y DESPUÉS «¿existe «artefacto»?»; el «cómo» dice «abre esa fuente» (antes «ábrelo», sin referente cuando
 *   el corte del Calendar se comía la fuente) · (2) la guía genérica ya no trunca nada con «…» («Dónde queda» entero; el Calendar corta con su propia
 *   función). Remate (revisión adversarial del 18-nov): (3) el título = código + el objetivo hasta su último límite de cláusula (« — », «: », «; », «? »,
 *   «. », « (» o « + », fuera de paréntesis y comillas) que quepa en 140, nunca a mitad de un dato y sin «…» (el objetivo ENTERO iba en el título y en
 *   el DEEP WORK: 914 caracteres el 20-ene, y en el Calendar de 2027 empujaba la descripción por encima de su límite) · (4) el «cómo» de la eval anclada
 *   vuelve a decir «sin preguntas inventadas» · (5) el día del plan B de inglés, la comprobación del mentor de Rising Scholars va en el aviso (antes
 *   abría el «cómo» y el Calendar se quedaba sin «abre esa fuente y corrige en rojo»).
 * v6.10j (auditoría c14 del Calendar, 18-nov ≈21:45): (1) eval anclada: en el «qué» (≤ 150 en el Calendar) van ENTERAS la fuente de contraste (nombre
 *   corto: REC_CORTO o CONTRASTE_DE) y una comprobación COMPACTA del artefacto (ART_CHECK: el nombre del fichero o el estado, sin comillas que el corte
 *   pueda dejar abiertas: antes «… su artefacto «TESIS_L0/research_letter_final.docx …» y 43 sesiones perdían el «¿existe …?»); el «cómo» cierra su
 *   primera parte en ≤ 109 («… Sin artefacto → deuda en la Mesa editorial.»: antes quedaba «Sin artefacto …» colgando) y el recurso entero va en el enlace
 *   del paso; las 4 evals paso a paso igual (los 2 puntos del recall, en el «cómo») · (2) la fuente según el átomo EVALUADO, real y verificable (antes la
 *   del primer recurso: X-4 congresos ↔ «Writing in the Sciences», X-6/X-7 ↔ COPE/ICMJE, los SUBMIT ↔ ICMJE, las fotos ↔ CARE…): la web oficial de cada
 *   congreso, la Mesa editorial, etica.md §1-§2, protocolo_fotos.md, las guías de autor de la revista, MENTORES.md §3, EQUATOR (R2) · (3) el título cabe
 *   en el resumen del Calendar (≤ 75: «🔬 RESEARCH » + título) y acaba en un límite de cláusula real (antes ≤ 140 y el Calendar lo cortaba a 75 tras
 *   «(», «:» o «,»: «R0 · Infra académica: 7 cuentas hoy (ORCID · Scholar · CTI Vitae · …»); sin incisos entre paréntesis si así cabe entero
 *   («R10 · PROSPERO: rellenar el formulario completo y ENVIAR»).
 */
'use strict';

/** v6.10e: fases del plan Research desde cero (por código de átomo; la última atrapa el resto). Criterios = entregables verificables con su checklist real. */
const FASES_RESEARCH = [
  { n: 1, re: '^(M1|R0|R1)$', nombre: 'Fundamentos e infraestructura', que: 'qué es una revisión sistemática (SR-1 primero), identidad de autor, PICO y diseño de estudio leído desde los Métodos (Greenhalgh)', criterio: '3 PICO completos (P·I·C·O + tipo + diseño ideal) en 01_PICO.md y 1 abstract real clasificado por diseño, comprobado contra el propio abstract; infra ≥ 7/10' },
  { n: 2, re: '^(C-\\d+|M2|T-1|R9)$', nombre: 'Primer producto guiado: carta al editor', que: 'diana → letters modelo → borrador de 3-4 puntos → citas verificadas → formato de la revista → envío (Siau 2020), con ética de la tesis, mentor de inglés y AMSTAR-2 de las SR que solapan', criterio: 'carta ENVIADA con nº de manuscrito, dentro del límite de la revista y con 0 referencias sin DOI/PMID verificado' },
  { n: 3, re: '^(CR-\\d+|T-\\d+|X-7|X-8|M3)$', nombre: 'Case report (CARE) + tesis → research letter', que: 'caso y consentimiento de publicación, fotos, CARE 13/13, borrador y revisión; research letter de la tesis', criterio: 'case report con CARE 13/13 y consentimiento firmado + research letter enviada' },
  { n: 4, re: '^(R2|R3|R6b?|R7|R8b?|R9b|R10|R11|X-[1-6]|X-9|K\\d)$', nombre: 'SR-1: protocolo y registro', que: 'pregunta y equipo de 2 revisores, protocolo a priori (PRISMA-P) y registro PROSPERO antes de ver resultados (Cochrane Handbook cap. 1)', criterio: 'protocolo con los 17 ítems de PRISMA-P y registro PROSPERO enviado' },
  { n: 5, re: '^R(1[2-9]|2\\d|3[0-3])\\b', nombre: 'SR-1: búsqueda → cribado → extracción → sesgo → metaanálisis', que: 'búsqueda reproducible, cribado y extracción por duplicado, riesgo de sesgo por estudio, forest plot y GRADE', criterio: 'cribado dual con kappa, extracción doble, RoB por estudio y diagrama PRISMA 2020' },
  { n: 6, re: '.', nombre: 'Manuscritos, revisión por pares y segunda línea', que: 'manuscrito SR-1 (PRISMA 2020), rebuttal, bibliométrico y case report 2', criterio: 'manuscrito SR-1 con PRISMA 2020 27/27 enviado (fin del plan)' },
];
/** Aviso de fase (texto) de un átomo por su código. */
function faseResearchAviso(code) {
  const f = FASES_RESEARCH.find((x) => new RegExp(x.re).test(code)); const sig = FASES_RESEARCH.find((x) => x.n === f.n + 1);
  return `FASE ${f.n}/${FASES_RESEARCH.length} (base cero) · ${f.nombre}: ${f.que} · ${sig ? `pasa a la fase ${sig.n} cuando: ${f.criterio}` : `cierre: ${f.criterio}`}`;
}

const GH = 'https://github.com/josephMAX-svg/joseph-md-app/blob/master/';
const OBS_VAULT = 'Vault_Medicina MIR_Joseph';
const obsUrl = (file) => 'obsidian://open?vault=' + encodeURIComponent(OBS_VAULT) + '&file=' + encodeURIComponent(file);
/** v6.03: ventana [desde, hasta] = los 60 días previos a C-1 (antes cableada a 2026-08-29 → 2026-10-28, la de v6.02). */
const CROSSREF = (q, desde, hasta) => 'https://api.crossref.org/works?filter=issn:0190-9622,issn:2666-3287,issn:0011-9059,issn:1473-2130,issn:1076-0512,from-pub-date:' + desde + ',until-pub-date:' + hasta + '&query.bibliographic=' + encodeURIComponent(q) + '&rows=30&select=DOI,title,container-title,issued,published-online,type';
const MES_LARGO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmtDM = (iso) => `${Number(iso.slice(8, 10))}-${MES_LARGO[Number(iso.slice(5, 7)) - 1]}`;
/** v6.10 · tanda C: «18 de enero» (para el WhatsApp de M1: las fechas salen del plan) */
const MES_NOMBRE = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fLargo = (iso) => `${Number(iso.slice(8, 10))} de ${MES_NOMBRE[Number(iso.slice(5, 7)) - 1]}`;
/** v6.05: versión del régimen vigente (para «las fechas del plan vigente (vX)» de M1/M2) — fuente única: _fechas_v6.json */
// v6.10g (revisión 18-nov): VERSION ya no se pinta en ningún texto (M2 decía «las fechas del plan vigente (v6.08)»); se quita la constante

/** v6.10 · fix 18-nov: claves de REC que son documento o guía (se puede leer el método en ellas). Las que no están (PM, ZOT, PROS, RAY, OPENALEX, UNPAY,
 *  CROSSREF, METAFOR, EQ, ORCID, SCHOLAR, CTI, NCBIACC, RISING, revistas y Editorial Manager) son portales, registros o herramientas. */
// v6.10j: + EQ (la tabla de guías de reporte por tipo de estudio de EQUATOR es el método de R2: «elegir la guía de reporte ANTES de escribir»)
const REC_DOC = ['GREEN', 'STAT', 'STEPSR', 'CIL1', 'COCHB', 'PRISMA', 'AMSTAR', 'DMAR', 'DELO', 'BBR', 'GTS', 'ICMJE', 'COPE', 'CREDIT', 'SCIWRITE', 'REBUTTAL', 'PHRASE', 'CARE', 'STROBE', 'EQ'];
/** v6.10j: nombre CORTO de cada recurso de REC_DOC para el «qué» de la eval anclada (el Calendar lo corta a 150 y el nombre entero, con su
 *  descripción, dejaba fuera la comprobación del artefacto); el recurso entero, con su URL, va en el enlace del paso. */
const REC_CORTO = {
  GREEN: 'How to Read a Paper (Greenhalgh)', STAT: 'StatQuest', STEPSR: 'Step-by-step SR+MA (Tawfik et al. 2019)', CIL1: 'Cochrane Interactive · Módulo 1',
  COCHB: 'Cochrane Handbook v6.5', PRISMA: 'PRISMA statement', AMSTAR: 'AMSTAR-2', DMAR: 'Doing Meta-Analysis in R', DELO: 'DeLorenzi 2014 (PMID 24692598)',
  BBR: 'Harrell · BBR', GTS: 'gtsummary', ICMJE: 'ICMJE Recommendations', COPE: 'COPE (integridad de publicación)', CREDIT: 'CRediT (NISO)',
  SCIWRITE: 'Writing in the Sciences (Sainani)', REBUTTAL: 'PLOS · Responding to peer review', PHRASE: 'Academic Phrasebank', CARE: 'CARE checklist',
  STROBE: 'STROBE (transversal)', EQ: 'EQUATOR Network',
};
/** v6.10 · fix 18-nov: fuente de contraste propia (el método del átomo está en su artefacto o en un documento que no es de REC).
 *  v6.10j: nombres CORTOS (el «qué» de la eval anclada cabe entero en los 150 del Calendar) y la fuente según el átomo EVALUADO, real y verificable: antes los
 *  SUBMIT (C-6, T-8, CR-9) y los cierres (X-6, X-7) se contrastaban con ICMJE o COPE, los congresos de X-4 con «Writing in the Sciences», las fotos de CR-3 con
 *  CARE, el email de M3 con la Academic Phrasebank. Todas existen: los ficheros del repo (etica.md §1-§2, protocolo_fotos.md, MENTORES.md §3 «Mensaje 3»,
 *  RUTA_PUBLICACION_2027.md §3.1, L4 §6, citation_verifier.py) o los que crea el propio átomo evaluado (diana.md, borrador_v2.md, MENTORES.md §Congresos /
 *  §Campaña de cold emails), la Mesa editorial (RUTA §9) y las guías oficiales que el átomo leyó (Author Guidelines de la revista, web de cada congreso). */
const CONTRASTE_DE = {
  M2: 'MENTORES.md §3 (mensaje 2)',
  'C-2': 'CARTA_1/diana.md y las 5 letters modelo',
  'T-1': 'TESIS_L0/etica.md §1-§2',
  'C-3': 'CARTA_1/diana.md (límites y esqueleto)',
  // v6.10i: las reglas del verificador primero (son el método de C-4) · v6.10j: corto (refs_verified.json va en la comprobación)
  'C-4': 'la cabecera de citation_verifier.py',
  'C-5': 'las Author Guidelines de la revista diana',
  'C-6': 'CARTA_1/diana.md (deadline) y la Mesa editorial',
  'T-7': 'la Guide for Authors de la revista',
  'T-8': 'la Mesa editorial y CTI Vitae',
  'X-7': 'la Mesa editorial (estado y próxima fecha)',
  'CR-3': 'CASE_REPORT_1/protocolo_fotos.md',
  'CR-6': 'los comentarios del senior y del mentor de inglés',
  'CR-7': 'las guías de autor de DOJ',
  'CR-8': 'las guías de autor de DOJ (qué se sube)',
  'CR-9': 'la Mesa editorial',
  M3: 'MENTORES.md §3 (mensaje 3, Prof. Finlay)',
  'X-3': 'la nota de estado del corpus',
  'X-4': 'la web oficial de AAD, CILAD y RADLA',
  // v6.10e (revisión del 18-nov · regresiones-7): el método de X-5 (campaña de cold emails) vive en su artefacto (regla 1), no en la Academic Phrasebank
  //   v6.10g (revisión 18-nov · c11): la sección es «§Campaña de cold emails» (antes «§Campaña feb-2027», un mes que la campaña ya no tiene: va en abr-may 2027)
  'X-5': 'MENTORES.md §Campaña de cold emails',
  'X-6': 'la Mesa editorial y la RUTA §3.1',
  'R9b': 'la decisión de R9 en L4 §6',
  R10: 'el PDF del registro PROSPERO',
  K1: 'MENTORES.md §Campaña de cold emails',
};
/** v6.10j: comprobación COMPACTA del artefacto del átomo evaluado (va en el «qué» tras la fuente, entera en los 150 del Calendar). Cada fichero que nombra
 *  está en el artefacto, el entregable o el objetivo de ese átomo (CONTROL abajo); el que no está aquí sale de artefactoCheck() (el 1.er fichero). */
const ART_CHECK = {
  M2: '¿fila Rising Scholars con fecha de solicitud?',
  'C-2': '¿existe diana.md con su deadline?',
  'T-1': '¿nº de CEI o de cargo en etica.md?',
  R9: '¿decisión (a)/(b)/(c) en L4 §6?',
  'C-3': '¿existe borrador_v1.md?',
  'C-4': '¿refs_verified.json todo verified?',
  'C-5': '¿existe carta_final.docx?',
  'C-6': '¿carta-1 = enviado, con nº?',
  'CR-1': '¿existe caso_candidatos.md?',
  'CR-2': '¿existe consentimiento_firmado.pdf?',
  'T-3': '¿existe research_letter_v1.md?',
  'T-4': '¿existen tabla1.docx y figura1.tiff?',
  'T-2': '¿existe STROBE_checklist.md?',
  'T-5': '¿existe cascada_journals.md?',
  'T-6': '¿existe autoria.md?',
  'T-7': '¿existe research_letter_final.docx?',
  'T-8': '¿tesis-L0 = enviado, con nº?',
  'X-7': '¿checklist de pausa al 100 %?',
  'CR-3': '¿set de fotos anonimizadas?',
  'CR-4': '¿existe CARE_checklist_13.md?',
  'CR-5': '¿existe borrador_v1.md?',
  'CR-6': '¿existe borrador_v2.md?',
  'CR-7': '¿existe case_report_final.docx?',
  'CR-8': '¿_PAQUETE_ENVIO/ completo?',
  'CR-9': '¿case-report-1 = enviado, con nº?',
  'X-8': '¿Mesa editorial al día?',
  M3: '¿fila Finlay con fecha?',
  R6: '¿PICO de SR-1 en L4 §2?',
  R7: '¿tabla PICOS en L4 §3?',
  'X-1': '¿revisor #2 en L4 §9?',
  'X-2': '¿existe rebuttal_plantilla.md?',
  R3: '¿existe ejemplo_metafor.R?',
  R8: '¿existe protocolo_PRISMA-P_v0.md?',
  R2: '¿existe 02_disenos_guias.md?',
  'X-3': '¿existe corpus_2026-06_inventario.csv?',
  'X-4': '¿MENTORES.md §Congresos con fecha?',
  'X-5': '¿20-30 nombres con su oferta?',
  'X-6': '¿3 estados reales + presupuesto?',
  R6b: '¿existe L4 §2-3 v2?',
  R8b: '¿existe protocolo_PRISMA-P_v1.md?',
  'X-9': '¿L4 §9 completo?',
  R9b: '¿decisión final escrita en L4 §6?',
  R10: '¿PROSPERO-SR1 = enviado?',
  K1: '¿10 emails en la tabla de seguimiento?',
};
/** v6.10j: título de la guía genérica escrito a mano cuando el objetivo no tiene un límite de cláusula que quepa en 75 (el corte en la última palabra
 *  dejaba «… PubMed registros y SR»); sale del objetivo, sin datos nuevos. */
const TITULO_DE = {
  R9b: 'Duplicidad final: SR y registros nuevos en PROSPERO + PubMed',
};
/** v6.10j: 1.ª parte del «cómo» de la eval anclada genérica: ≤ 109 caracteres y acabada en «.» (el Calendar corta el «cómo» a 110 en el último espacio). */
const EVAL_COMO = 'A papel, sin preguntas inventadas; corrige en rojo con la fuente. Sin artefacto → deuda en la Mesa editorial.';
/** v6.10j: longitud máxima del título de una guía Research (el resumen del Calendar es «🔬 RESEARCH » + el título cortado a 75). */
const TITULO_MAX = 75;
/** v6.10j: límites del corte del Calendar (lo que se ve de cada paso: «qué» ≤ 150, «cómo» ≤ 110). */
const CAL_QUE = 150, CAL_COMO = 110;

/**
 * Código TS que se emite en src/lib/researchGuia.ts: guía GENÉRICA (5 franjas del bloque) y F4 (30′, franja nominal), construida en tiempo de
 * ejecución desde DIAS + REC (todo el texto ya está en el bundle: no se duplica). Σ pasos = 45 / 30 (fijo).
 */
const TS_BUILDER = `
/** v6.10e (18-nov-2026 · base cero): fases del plan Research (por código de átomo; la última atrapa el resto) — fuente: DATA/_scripts/research_guia.js. */
const FASES_RESEARCH: Array<{ n: number; re: string; nombre: string; que: string; criterio: string }> = ${JSON.stringify(FASES_RESEARCH)};
/** Aviso de fase de un átomo: la fase, qué se hace y el criterio para pasar a la siguiente. */
export function faseResearchAviso(code: string): string {
  const f = FASES_RESEARCH.find((x) => new RegExp(x.re).test(code)) ?? FASES_RESEARCH[FASES_RESEARCH.length - 1]!; const sig = FASES_RESEARCH.find((x) => x.n === f.n + 1);
  return \`FASE \${f.n}/\${FASES_RESEARCH.length} (base cero) · \${f.nombre}: \${f.que} · \${sig ? \`pasa a la fase \${sig.n} cuando: \${f.criterio}\` : \`cierre: \${f.criterio}\`}\`;
}
/** v6.10 · fix 18-nov: recursos de REC que son DOCUMENTO o GUÍA (texto con el método: un recall en blanco se corrige contra ellos); el resto de REC son
 *  portales, registros o herramientas (PubMed, Crossref, Rising Scholars, Editorial Manager, ORCID…) — fuente: DATA/_scripts/research_guia.js. */
export const REC_DOC: ReadonlySet<string> = new Set(${JSON.stringify(REC_DOC)});
/** v6.10j: nombre CORTO de cada recurso de REC_DOC (el «qué» de la eval anclada cabe entero en los 150 del Calendar; el recurso entero va en el enlace del paso). */
export const REC_CORTO: Readonly<Record<string, string>> = ${JSON.stringify(REC_CORTO)};
/** v6.10 · fix 18-nov: fuente de contraste propia del átomo cuyo método está en su artefacto o en un documento que no es de REC.
 *  v6.10j: nombres cortos y la fuente según el átomo EVALUADO (los SUBMIT y los cierres → la Mesa editorial · X-4 → la web oficial de cada congreso…). */
export const CONTRASTE_DE: Readonly<Record<string, string>> = ${JSON.stringify(CONTRASTE_DE)};
/** v6.10j: comprobación COMPACTA del artefacto del átomo evaluado (el nombre del fichero o el estado; cada fichero que nombra está en su artefacto, su
 *  entregable o su objetivo: lo controla DATA/_scripts/research_guia.js). */
export const ART_CHECK: Readonly<Record<string, string>> = ${JSON.stringify(ART_CHECK)};
/** Contra qué se corrige el recall en blanco del átomo previo: su fuente propia · el primer recurso DOCUMENTO o GUÍA (nombre corto) · su objetivo y su artefacto. */
export function fuenteContraste(prev: DiaResearch): string {
  if (CONTRASTE_DE[prev.code]) return CONTRASTE_DE[prev.code]!;
  const k = prev.recs.find((r) => REC_DOC.has(r));
  if (k && REC[k]) return \`«\${REC_CORTO[k] ?? REC[k]!.label}»\`;
  return 'su objetivo y su artefacto';
}
/** v6.10j: el recurso de REC contra el que se corrige (para el enlace del paso: nombre entero + URL); null si la fuente es propia. */
function recContraste(prev: DiaResearch): { t: string; url: string } | null {
  if (CONTRASTE_DE[prev.code]) return null;
  const k = prev.recs.find((r) => REC_DOC.has(r));
  return k && REC[k] ? { t: REC[k]!.label, url: REC[k]!.url } : null;
}
/** v6.10j: la comprobación compacta del artefacto del átomo previo: ART_CHECK o el 1.er fichero de su artefacto («¿existe X?», sin comillas que el corte del
 *  Calendar pueda dejar abiertas: antes iba el artefacto ENTERO entre «»). */
export function artefactoCheck(prev: DiaResearch): string {
  if (ART_CHECK[prev.code]) return ART_CHECK[prev.code]!;
  const m = /[\\w.-]+\\.(?:md|docx|json|csv|xlsx|pdf|R|py|tiff|png)\\b/.exec(prev.artefacto);
  return \`¿existe \${m ? m[0] : prev.artefacto.split(/ \\+ | \\(|: | · /)[0]}?\`;
}
/** v6.10i → v6.10j: «qué» de la eval anclada genérica = el recall en blanco contrastado con su fuente (nombre corto) + la comprobación compacta del artefacto,
 *  los dos ENTEROS en los 150 del Calendar (antes el artefacto entero entre comillas: el corte caía dentro o dejaba fuera el «¿existe …?»). */
function evalAncladaQue(prev: DiaResearch): string {
  return \`Eval anclada de \${prev.code}: recall en blanco de 2 puntos clave, contrastado con \${fuenteContraste(prev)} + \${artefactoCheck(prev)}\`;
}
/** v6.10j: «cómo» de la eval anclada genérica: su 1.ª parte (EVAL_COMO) cierra en ≤ 109 caracteres, porque el Calendar corta el «cómo» a 110 en el último
 *  espacio (antes quedaba «Sin artefacto …» colgando); lo que sigue solo se ve en la app. */
export const EVAL_COMO = ${JSON.stringify(EVAL_COMO)};
/** v6.10j: el título entero de la guía cabe en el resumen del Calendar (\`🔬 RESEARCH \${cortar(titulo, 75)}\`). */
export const TITULO_MAX = ${TITULO_MAX};
/** v6.10j: títulos escritos a mano (objetivo sin límite de cláusula que quepa en TITULO_MAX). */
const TITULO_DE: Readonly<Record<string, string>> = ${JSON.stringify(TITULO_DE)};
/** remate v6.10j (revisión adversarial, verdad #3): la comprobación compacta del «qué» (artefactoCheck) nombra solo una pieza del artefacto → el artefacto
 *  ENTERO va en el «cómo», detrás de EVAL_COMO (fuera del corte del Calendar: en la app), para que ninguna pieza del entregable desaparezca de la guía. */
const evalAncladaComo = (prev: DiaResearch): string => \`\${EVAL_COMO} Artefacto entero: \${prev.artefacto.replace(/\\.\\s*$/, '')}. No se rehace hoy; lo que falló = 1 APEX.\`;
/** v6.10j: límites de cláusula de un texto, FUERA de paréntesis, corchetes y comillas: fuertes (« — », «: », «; », «. », «? »), débiles (« (», « + » salvo
 *  entre dos nombres propios: «PROSPERO + PubMed»), comas y frases (« con », « desde », « para », « sin », « hasta », « tras »). */
function limitesClausula(o: string): { fuerte: number[]; debil: number[]; coma: number[]; frase: number[] } {
  const L = { fuerte: [] as number[], debil: [] as number[], coma: [] as number[], frase: [] as number[] }; let dep = 0, q = 0, dosPuntos = false;
  for (let i = 0; i < o.length; i++) {
    const c = o[i]!;
    if (c === '(' || c === '[') dep++; else if (c === ')' || c === ']') dep = Math.max(0, dep - 1);
    else if (c === '«') q++; else if (c === '»') q = Math.max(0, q - 1); else if (c === '"') q = q ? 0 : 1;
    if (dep || q) continue;
    const r = o.slice(i);
    if (i > 0 && o[i - 1] === ':' && c === ' ') dosPuntos = true;
    if (/^ — /.test(r)) L.fuerte.push(i);
    else if (/^[:;.] /.test(r) && !/\\([a-z]\\)\\s[^:;()]{0,40}$/.test(o.slice(0, i))) L.fuerte.push(i);
    else if (/^\\? /.test(r)) L.fuerte.push(i + 1);
    else if (/^ \\(/.test(r)) L.debil.push(i);
    else if (/^ \\+ /.test(r)) { if (!(/(?:^|\\s)\\p{Lu}\\S*$/u.test(o.slice(0, i)) && /^ \\+ \\p{Lu}/u.test(r))) L.debil.push(i); }
    else if (/^, /.test(r)) { if (!dosPuntos) L.coma.push(i); } // tras «X: a, b, c» la coma parte una lista: no es un límite
    else if (/^ (?:con|desde|para|sin|hasta|tras) /.test(r)) L.frase.push(i);
  }
  return L;
}
/** v6.10i (remate) → v6.10j: el objetivo del título hasta su último límite de cláusula que quepa en \`n\` (el título entero cabe en el resumen del Calendar,
 *  «🔬 RESEARCH » + 75: antes se cortaba ahí tras «(», «:» o «,»). Orden: límite fuerte · el objetivo sin sus incisos entre paréntesis (entero si cabe;
 *  si no, sus límites) · límites débiles, comas y frases · la última palabra entera. Nunca «…»; el objetivo entero sigue en el DEEP WORK. */
function tituloObjetivo(o: string, n: number): string {
  if (o.length <= n) return o;
  const fin = (s: string, z: number) => s.slice(0, z).replace(/[\\s,;:—–+·]+$/u, '');
  const en = (a: number[]) => a.filter((z) => z >= 20 && z <= n);
  const sp = o.replace(/\\s\\([^()]{4,}\\)/g, ''); // sin los incisos entre paréntesis (las opciones «(a)», «(b)» se quedan)
  const mejor = (s: string, ks: Array<'fuerte' | 'debil' | 'coma' | 'frase'>): string => {
    const L = limitesClausula(s); const z = ks.flatMap((k) => en(L[k]));
    return z.length ? fin(s, Math.max(...z)) : '';
  };
  // 1) un límite fuerte que deje al menos medio título (del objetivo entero o del objetivo sin incisos) · 2) el objetivo sin incisos, entero ·
  // 3) el corte más largo entre los fuertes y los débiles, comas y frases (de los dos) · 4) la última palabra entera, sin conector colgando
  const f = [mejor(o, ['fuerte']), sp !== o ? mejor(sp, ['fuerte']) : ''].sort((a, b) => b.length - a.length)[0]!;
  if (f.length >= n / 2) return f;
  if (sp !== o && sp.length <= n) return sp;
  const w = [f, mejor(o, ['debil', 'coma', 'frase']), sp !== o ? mejor(sp, ['debil', 'coma', 'frase']) : ''].sort((a, b) => b.length - a.length)[0]!;
  if (w) return w;
  return o.slice(0, o.lastIndexOf(' ', n)).replace(/(?:[\\s,;:—–+·(]+|\\s(?:de|del|el|la|los|las|a|al|y|e|o|u|en|con|por|para|sin))+$/u, '');
}
function generica(x: DiaResearch, prev: DiaResearch | null): GuiaBloque {
  const recs = x.recs.map((k) => ({ k, ...(REC[k] || { label: k, url: 'https://pubmed.ncbi.nlm.nih.gov/' }) }));
  const obs = researchObsUrlDay(x.d);
  const chips = [...(x.chips || []), ...(x.horas ? [\`carga real ≈ \${x.horas} h por revisor FUERA del bloque (el átomo coordina y cierra)\`] : [])];
  const r0 = recs[0];
  if (x.fecha >= FECHAS_V6.serums.inicio) {
    return {
      franja: '13:30–14:00', plan: 'research-derma', titulo: \`\${x.code} · núcleo del átomo (F4 · 30′)\`, totalMin: 30,
      pasos: [
        { min: 2, que: 'Pre-test 60 s: el objetivo de hoy en 1 frase', como: 'A papel o en el móvil.' },
        { min: 23, que: \`NÚCLEO: \${x.entregable}\`, como: \`Recurso: «\${r0.label}». Produce solo el entregable atómico; lo demás del átomo queda opcional (DJ-4).\`, enlace: { t: \`\${r0.k}\`, url: r0.url } },
        { min: 3, que: 'Free recall + log del gap', como: 'Una línea.' },
        { min: 2, que: 'Guardar el artefacto (≤1 APEX)', como: \`Dónde: \${x.artefacto}\`, ...(obs ? { enlace: { t: '◆ Obsidian', url: obs } } : {}) },
      ],
      recursos: [...recs.map((r) => ({ t: r.label, url: r.url })), ...(obs ? [{ t: '◆ Obsidian · carpeta del entregable', url: obs }] : [])],
      hecho: x.entregable,
      aviso: [faseResearchAviso(x.code), 'F4 (SERUMS): 30′ en tiempo muerto de la posta, SIN hora fija — la franja 13:30–14:00 es nominal', ...chips].join(' · '),
    };
  }
  return {
    // v6.10i: el título = código + el objetivo hasta un límite de cláusula (antes se truncaba a 110 con «…» a mitad de cifra o de nombre: «reproducir 1…»;
    //   después llevaba el objetivo ENTERO, que ya va en el DEEP WORK) · v6.10j: el título entero ≤ 75 (lo que el Calendar deja en el resumen)
    franja: '13:30–14:15', plan: 'research-derma', titulo: \`\${x.code} · \${TITULO_DE[x.code] ?? tituloObjetivo(x.objetivo, TITULO_MAX - x.code.length - 3)}\`, totalMin: 45,
    pasos: [
      // v6.10j: la fuente (nombre corto) y la comprobación compacta del artefacto ENTERAS en el «qué»; el recurso entero, en el enlace del paso
      prev ? { min: 5, que: evalAncladaQue(prev), como: evalAncladaComo(prev), ...(recContraste(prev) ? { enlace: recContraste(prev)! } : {}) }
        : { min: 5, que: 'Arranque: abre la carpeta del entregable y el recurso 1', como: 'Sin átomo previo.' },
      { min: 5, que: 'Pre-test = recall en blanco 60 s (sin preguntas): ¿qué sé ya de este paso? + el objetivo de hoy en 1 frase', como: 'A papel, sin mirar; lo contrastas al final con el recurso del día.' },
      { min: 25, que: \`DEEP WORK: \${x.objetivo}\`, como: \`Trabaja con «\${r0.label}» MIENTRAS produces el artefacto: \${x.artefacto}\${recs.length > 1 ? \` (apoyo: \${recs.slice(1).map((r) => r.label).join(' · ')})\` : ''}.\${x.tool && x.tool !== '—' ? \` Herramienta: \${x.tool}.\` : ''}\`, enlace: { t: \`\${r0.k}\`, url: r0.url } },
      { min: 5, que: 'Free recall a papel + log del gap (método / razonamiento / herramienta)', como: 'Compara con el pre-test del inicio.' },
      { min: 5, que: '≤3 APEX-método (Palmerton) + guardar el artefacto', como: \`Dónde queda: \${x.artefacto}\`, ...(obs ? { enlace: { t: '◆ Obsidian', url: obs } } : {}) },
    ],
    recursos: [...recs.map((r) => ({ t: r.label, url: r.url })), ...(obs ? [{ t: '◆ Obsidian · carpeta del entregable', url: obs }] : [])],
    hecho: x.entregable,
    ...(recs.length > 1 ? { planB: \`Si «\${r0.label}» no abre o no basta: «\${recs[1].label}».\` } : {}),
    // v6.10i (remate): el día del plan B de inglés, la comprobación del mentor va PRIMERO en el aviso (antes abría el «cómo» de la eval anclada)
    aviso: [x.fecha === PLANB_INGLES ? 'Dentro de los 5′ de la eval anclada (≤ 2′): ¿mentor de Rising Scholars asignado (MENTORES.md fila 2)? Si no → plan B (editor profesional, RUTA §3.1): decídelo y anótalo en esa fila.' : '', faseResearchAviso(x.code), rdFinde(x.fecha), ...chips].filter(Boolean).join(' · '),
  };
}
/** v6.10 (17-nov-2026): átomo en un hábil EXTRA de fin de semana (_fechas_v6.json › corrida_s1.extra[fecha]['research-derma']: v6.10c sáb 2-ene 15:30-16:15, el T-3 · v6.10 dom 6-dic 05:00-05:45; el
 *  mar 17-nov fue sin sesión y los átomos de F1 corrieron una ranura) → aviso con la hora real (la franja de la guía es la de PLAN, 13:30-14:15: el Home
 *  la mueve) y qué hacer si el entregable necesita una oficina abierta. '' si no lo es. */
function rdFinde(fecha: string): string {
  const fx = (FECHAS_V6.corrida_s1.extra ?? {})[fecha]?.['research-derma'];
  if (!fx) return '';
  const w = new Date(fecha + 'T12:00:00Z').getUTCDay();
  return 'Hoy ' + (w === 0 ? 'domingo' : 'sábado') + ', a hora fija (' + fx + '): el átomo que toca en orden (el mar 17-nov fue sin sesión). Lo que necesite una oficina abierta (mesa de partes, firma presencial) se deja LISTO hoy y se presenta el siguiente día hábil, antes de su átomo; el nº de cargo se archiva ese día.';
}
`;

function construirGuiasResearch({ TODOS, rec, fechaDe, fmt, addDays, obsDe, SERUMS_INICIO, PAUSA, fechaReal = (iso) => iso }) {
  const R = (k) => { const r = rec(k); if (!r) throw new Error('research_guia: REC ' + k + ' no existe'); return { t: r.label, url: r.url }; };
  const f = (code) => fmt(fechaDe(code));
  const porCode = Object.fromEntries(TODOS.map((x) => [x.code, x]));
  const M2 = porCode.M2;
  // v6.03: ventana Crossref de C-1 = 60 días previos (v6.02: 2026-08-29 → 2026-10-28) · v6.10g (revisión 18-nov · c10): hasta el día REAL de la sesión
  //   (fechaReal = alias de corrida_s1, frente research-derma: C-1 de plan vie 27-nov se hace el lun 30-nov → 1-oct → 30-nov; antes 28-sep → 27-nov dejaba fuera
  //   los artículos del 28 al 30-nov); el texto, las dos URLs y la sección de candidatos.md salen de la misma fecha
  const C1H = fechaReal(fechaDe('C-1')); const C1D = addDays(C1H, -60);
  /** v6.06: eval anclada (5′) según el átomo ANTERIOR real — el orden de las semanas 1-2 puede cambiar con un corrimiento (v6.06: M1 · R0 · R1 · C-1 · M2). */
  let ciroYa = false;
  /** v6.06 (fix): las 2Q de auto-test de cada átomo paso a paso (fuente única: la eval anclada de 5′ y la «express» de 2′ de R0 las citan igual). */
  const Q2 = {
    // v6.10e (base cero · preguntas reales): sin banco real de Research → RECALL EN BLANCO de los 2 puntos clave, contrastados con su fuente
    // v6.10i (auditoría del volcado c12/c13): la FUENTE real va pegada al recall, al principio (antes «(fuente: …)» al final: el corte del Calendar a 150 se
    //   la comía y «compruébalo en la fuente» se quedaba sin referente)
    // v6.10j (auditoría c14): { fuente, check } enteros en el «qué» (≤ 150 en el Calendar: antes la comprobación del artefacto —«¿checklist «Infra académica» en
    //   7/10?», «¿5 candidatos con DOI en candidatos.md?»— quedaba fuera del corte) y los 2 puntos del recall en el «cómo» (≤ 110)
    R0: { fuente: 'el registro de PROSPERO y tu gestor', check: '¿«Infra académica» en 7/10?', puntos: 'el ID de autor que piden PROSPERO y Editorial Manager · dónde se guarda una API key y dónde nunca', resto: 'Corrige en rojo con esas dos fuentes; si alguna cuenta quedó «en trámite», ciérrala ahora.' },
    R1: { fuente: '01_PICO.md y el abstract PMID 19807760', check: '¿3 PICO en 01_PICO.md?', puntos: 'el diseño ideal para una pregunta de terapia · el diseño de Taylor 2009 y quién estaba ciego', resto: 'Corrige en rojo con esas dos fuentes; si falta algo de R1, anótalo como deuda.' },
    // v6.10 · tanda C (decidido con Joseph en el chat Research, 17-nov): M1 = SR-1 primero → su eval anclada (R0, lun 23) = 1Q de PRISMA-P / PRISMA 2020 /
    //   AMSTAR-2 + «¿respondió el asesor?» (antes: 2Q de ICMJE · CRediT)
    // v6.10l (auditoría c15, «dias-clave» BAJA): las 3 checklists por su nombre en el «qué» y DÓNDE comprobarlas dentro de los 110 del «cómo» (antes el
    //   Calendar cortaba en «Compruébalo en 30 s …» y no se veía contra qué ni dónde)
    M1: { fuente: 'PRISMA-P, PRISMA 2020 y AMSTAR-2', check: '¿respondió el asesor?', puntos: 'qué es y cuántos ítems tiene cada una', resto: 'Corrige en rojo con las checklists oficiales; la respuesta del asesor va a MENTORES.md §2.' },
    'C-1': { fuente: 'candidatos.md', check: '¿5 candidatos con DOI?', puntos: 'la regla de la ventana · por qué un dato verificable', resto: 'Corrige en rojo con candidatos.md.' },
  };
  /** v6.10j: la eval anclada paso a paso de un átomo con Q2: «qué» = recall + fuente + comprobación (≤ 150) · «cómo» = los 2 puntos a papel (≤ 110) + el resto (app). */
  const evalQ2 = (code, q, ciroPend = '') => ({ que: `Eval anclada de ${code}: recall en blanco (sin preguntas inventadas), contrastado con ${q.fuente} + ${q.check}${ciroPend}`, como: `A papel: ${q.puntos}. ${q.resto}` });
  const evalAnclada = (prev, x) => {
    if (!prev) return { min: 5, que: 'Arranque (1.ª sesión Research): abre MENTORES.md §3 «Mensaje 1 — Dr. Ciro» y TESIS_L0/etica.md §1', como: '⏸ El plazo interno del 31-oct-2026 (caso + consentimiento + senior author) venció sin día-Research (la semana lun 26 → vie 30-oct no se estudió): este mensaje va PRIMERO; no se inventa un plazo nuevo.' };
    // la pregunta de seguimiento de M1 va SOLO en la primera eval anclada tras M1 (si su átomo previo no es M1, que ya la trae en su tabla)
    const ciroPend = !ciroYa && prev.code !== 'M1' && porCode.M1 && porCode.M1.fecha < x.fecha ? ` · y ¿respondió el Dr. Ciro a M1 (${f('M1')})? (regístralo en MENTORES.md §2)` : '';
    if (prev.code === 'M1' || ciroPend) ciroYa = true;
    // v6.10i: el recall con su fuente PRIMERO; la comprobación del artefacto (checklist, fichero) después · v6.10j: los dos enteros en los 150 del Calendar
    const T = Q2[prev.code] ? evalQ2(prev.code, Q2[prev.code], ciroPend) : { que: `Eval anclada de ${prev.code}: recall en blanco de 2 puntos clave, contrastado con su recurso 1 + ¿existe su artefacto?${ciroPend}`, como: `${EVAL_COMO} No se rehace hoy; lo que falló = 1 APEX.` };
    return { min: 5, que: T.que, como: T.como };
  };
  /** v6.06 (fix): R0 abre con 2′ de arranque (sus 7 cuentas ocupan los otros 43′). Si R0 ya no es la 1.ª sesión (v6.06: M1 · R0 · …), esos 2′ llevan
   *  además la eval anclada EXPRESS del átomo previo = sus 2Q de memoria (antes R0 nunca llamaba a evalAnclada y las 2Q de M1 —ICMJE · CRediT— se
   *  perdían). La pregunta «¿respondió el Dr. Ciro?» NO va aquí: sigue en la próxima eval anclada de 5′ (ciroPend), a los 3-5 días del mensaje. */
  const arranqueR0 = (prev) => {
    const base = 'abre Estudio → Research → Desk → «Infra académica» (checklist 0/10) y tu gestor de contraseñas';
    const cuentas = 'Cada cuenta la creas TÚ (Claude no crea cuentas ni escribe contraseñas). Una contraseña distinta por cuenta, guardada en el gestor.';
    if (!prev) return { min: 2, que: `Arranque: ${base}`, como: cuentas };
    // v6.10 · tanda C: tras M1 (SR-1 + WhatsApp), la express de R0 = 1Q de PRISMA-P / PRISMA 2020 / AMSTAR-2 + ¿respondió el asesor? (regístralo)
    // v6.10e (revisión del 18-nov · dias-1920-5): el recall se COMPRUEBA con las checklists (PRISMA 2020 y AMSTAR-2 en los recursos de hoy, PRISMA-P en GoodNotes)
    // v6.10j (auditoría c14): «¿respondió el asesor?» y el arranque dentro de los 150 del «qué» (antes el corte los dejaba fuera) · los puntos del recall, en el «cómo»
    // v6.10l (auditoría c15): «contra» las 3 checklists por su nombre (el «qué» cabe en 150) y la comprobación —PRISMA-P en GoodNotes, pág. 5; PRISMA 2020 y
    //   AMSTAR-2 en los recursos de hoy— dentro de los 110 del «cómo»
    if (prev.code === 'M1') { ciroYa = true; return { min: 2, que: `Eval anclada express de M1 (recall en blanco contra ${Q2.M1.fuente}) + ${Q2.M1.check} + abre «Infra académica» y tu gestor`,
      // remate v6.10l (revisión adversarial · visibilidad): dónde está CADA checklist, dentro de los 110 (antes «… con PRISMA-P (GoodNotes, pág. 5) y los recursos»)
      como: `A papel: ${Q2.M1.puntos}. PRISMA-P: GoodNotes p. 5; las otras dos: recursos de hoy. Lo que falle va como deuda a la Mesa editorial; si el asesor respondió, regístralo en MENTORES.md §2 (si no, el seguimiento es a los 3-5 días del mensaje). La checklist: ${base.replace(/^abre /, '')}. ${cuentas}` }; }
    return { min: 2, que: `Eval anclada express de ${prev.code} (${Q2[prev.code] ? `recall en blanco contrastado con ${Q2[prev.code].fuente}` : 'recall en blanco de las 2 ideas de método de esa sesión'}) + arranque: ${base}`,
      como: `${Q2[prev.code] ? `A papel: ${Q2[prev.code].puntos}. ` : 'El recall a papel, 1 línea por punto y sin mirar; '}lo que falle va como deuda a la Mesa editorial. ${cuentas}` };
  };

  /** Guías paso a paso (45′). `prev` = átomo anterior (eval anclada). */
  const DET = {
    R0: (x, prev) => ({
      titulo: 'R0 · Infra académica: 7 cuentas hoy (ORCID, Scholar, CTI Vitae y 4 más)', // v6.10j: ≤ 75 (el resumen del Calendar); la lista entera va en el «Hecho»
      pasos: [
        arranqueR0(prev),
        { min: 8, que: '1 · ORCID iD (identidad de autor: la exige Editorial Manager al autor de correspondencia y PROSPERO a todo el equipo)', como: 'orcid.org → Register: el nombre tal como firmarás los artículos, correo personal + institucional, visibilidad pública; verifica el correo y copia el iD (0000-…).', enlace: R('ORCID') },
        { min: 5, que: '2 · Google Scholar · perfil público', como: 'Crea el perfil con el correo institucional y márcalo PÚBLICO; si aún no aparece ningún artículo tuyo, déjalo vacío (la tesis se añade cuando esté en el repositorio UNCP).', enlace: R('SCHOLAR') },
        { min: 8, que: '3 · CTI Vitae / RENACYT (CONCYTEC)', como: 'Registro con tu documento de identidad y vincula el ORCID; la tesis solo suma para RENACYT si está registrada aquí.', enlace: R('CTI') },
        { min: 4, que: '7 · PROSPERO (CRD York) — registro del protocolo de SR-1 en R10', como: 'Crea la cuenta (con el ORCID ya hecho). No registres nada todavía.', enlace: R('PROS') },
        { min: 4, que: '8 · Rayyan — cribado dual en ciego de SR-1', como: 'Cuenta gratuita (≤3 revisiones). El revisor #2 también necesitará la suya (X-1).', enlace: R('RAY') },
        { min: 4, que: '9 · Zotero — biblioteca de PDFs por entregable', como: 'Cuenta + instala el conector del navegador. Hoy no se crea ninguna colección: cada una (carta-1 · tesis-L0 · case-report-1 · SR-1) nace el día de su primer PDF.', enlace: R('ZOT') }, // v6.10g: nada de carpetas vacías por adelantado (regla de Joseph, 17-nov)
        { min: 4, que: '10a · NCBI · API key de E-utilities (10 req/s)', como: 'Inicia sesión → Settings → API Key Management → Create.', enlace: R('NCBIACC') },
        { min: 3, que: '10b · OpenAlex · API key (motor research-discovery)', como: 'Sigue la página de autenticación de OpenAlex y genera la key.', enlace: R('OPENALEX') },
        { min: 3, que: 'Registro: ORCID iD y CTI Vitae en DATA/RESEARCH/MENTORES.md (crea al final «## Identificadores»; son públicos) + marca 7/10 en la checklist', como: 'Las API keys NO van al repo (es PÚBLICO): solo en el gestor de contraseñas / un .env local.', enlace: { t: 'MENTORES.md', url: GH + 'DATA/RESEARCH/MENTORES.md' } },
      ],
      hecho: 'Checklist «Infra académica» 7/10 (ORCID · Scholar · CTI Vitae · PROSPERO · Rayyan · Zotero · keys NCBI + OpenAlex) + ORCID iD y CTI Vitae copiados en MENTORES.md «## Identificadores»; las keys solo en el gestor.',
      planB: 'Si una validación no llega hoy (correo de CTI Vitae u ORCID): márcala «en trámite» y sigue con la siguiente; se cierra en los 5′ de la eval anclada de R1 (' + f('R1') + ').',
      // v6.09b lote 1-quater FX1 (revisión V2): las fechas de destino al principio del aviso (el Calendar lo corta a 240; CR-9 iba en la pos. 335)
      aviso: 'Hoy 7 de las 10 cuentas (10-15′ c/u: las 10 no caben en 45′); las 3 de portal → Editorial Manager / ScholarOne en C-5 (' + f('C-5') + ') y eScholarship (Dermatology Online Journal) en CR-9 (' + f('CR-9') + '). Son POR REVISTA y su URL está «A VERIFICAR»: C-5 = formateo + cuenta activa en el portal del journal elegido.',
      // v6.06 (fix): con M1 justo antes, los recursos para contrastar la eval express · v6.10e (dias-1920-5): PRISMA 2020 y AMSTAR-2 (lo que pregunta la express
      //   de M1 desde la v6.10 · tanda C), no ICMJE y CRediT (las 2Q de M1 hasta la v6.10)
      recursos: [R('ORCID'), R('SCHOLAR'), R('CTI'), R('PROS'), R('RAY'), R('ZOT'), R('NCBIACC'), R('OPENALEX'), ...(prev && prev.code === 'M1' ? [R('PRISMAPDF'), R('PRISMA'), R('AMSTAR')] : [])],
    }),
    R1: (x, prev) => ({
      titulo: 'R1 · 3 PICO (terapia · diagnóstico · pronóstico) + 1 abstract clasificado', // v6.10j: ≤ 75; Greenhalgh y el PMID, en sus pasos
      pasos: [
        evalAnclada(prev, x),
        { min: 5, que: 'Pre-test (free recall 60 s): qué es P · I · C · O y qué diseño responde mejor a terapia, a diagnóstico y a pronóstico', como: 'Escríbelo a papel sin mirar; lo compruebas en el paso 3.' },
        { min: 12, que: '3 PICO escritos en la nota nueva 01_PICO.md (vault: SR-1_complicaciones/01_protocolo_PICO) — una pregunta de cada tipo en el nicho rellenos · fototipos IV-VI', como: 'Plantilla por pregunta: P (pacientes) · I (intervención / exposición / prueba) · C (comparador) · O (desenlace medible) · tipo · diseño ideal (terapia → ECA · diagnóstico → transversal frente al patrón de oro · pronóstico → cohorte). Ejemplos de forma (no de contenido): terapia «relleno de ácido hialurónico en fototipo IV-VI vs otro producto → hiperpigmentación post-inflamatoria»; diagnóstico «ecografía Doppler vs diagnóstico clínico → oclusión vascular»; pronóstico «fototipo IV-VI tratado con relleno → PIH a 6 meses».', enlace: { t: '◆ 01_protocolo_PICO', url: obsUrl('04_INVESTIGACIÓN DERMATOLÓGICA/02_SR_EN_CURSO/SR-1_complicaciones/01_protocolo_PICO/_README') } },
        { min: 15, que: 'Abstract PMID 19807760: Taylor SC, Burgess CM, Callender VD. «Safety of nonanimal stabilized hyaluronic acid dermal fillers in patients with skin of color: a randomized, evaluator-blinded comparative trial». Dermatol Surg 2009;35 Suppl 2:1653-60', como: 'Método Greenhalgh («getting your bearings»): ¿por qué se hizo? · ¿estudio primario o secundario? · ¿diseño (el título dice aleatorizado y con evaluador ciego)? · ¿población? · ¿intervención y comparador? · ¿desenlace principal? → escribe su PICO y su diseño en 01_PICO.md.', enlace: { t: 'PubMed 19807760', url: 'https://pubmed.ncbi.nlm.nih.gov/19807760/' } },
        { min: 3, que: 'Free recall a papel: 3 ideas del abstract + 1 duda de método', como: 'Sin mirar la nota; luego compáralo.' },
        { min: 5, que: '≤3 APEX-método + guardar 01_PICO.md y enlazarla desde SR-1/_hoja_de_ruta', como: 'APEX tipo «tipo de pregunta → diseño ideal» y «ciego del evaluador = ¿qué sesgo controla?».', enlace: { t: '◆ SR-1 · hoja de ruta', url: obsUrl('04_INVESTIGACIÓN DERMATOLÓGICA/02_SR_EN_CURSO/SR-1_complicaciones/_hoja_de_ruta') } },
      ],
      hecho: '01_PICO.md con 3 PICO (terapia · diagnóstico · pronóstico) + el abstract de Taylor 2009 clasificado por diseño + ≤3 APEX-método.',
      planB: 'Si PubMed no abre: el mismo registro en Europe PMC (https://europepmc.org/article/MED/19807760). Abstract de reserva: Grimes PE, Thomas JA, Murphy DK. J Cosmet Dermatol 2009;8(3):162-8 (PMID 19735512).',
      recursos: [R('CIL1'), R('GREEN'), { t: 'PubMed · Taylor 2009 (PMID 19807760)', url: 'https://pubmed.ncbi.nlm.nih.gov/19807760/' }, { t: 'PubMed · Grimes 2009 (reserva, PMID 19735512)', url: 'https://pubmed.ncbi.nlm.nih.gov/19735512/' }, R('DELO')],
    }),
    // v6.10 · tanda C (17-nov-2026 · DECIDIDO CON JOSEPH en el chat Research): Research empieza por SR-1 (protocolo del metaanálisis), no por la tesis; del
    //   M1 original solo queda el WhatsApp con las 3 coautorías (opción (a) del revisor #2 de SR-1). 7 pasos = 45′. Las fechas del WhatsApp son las REALES
    //   (v6.10e, dias-1920-4: fechaReal = fechaRealDe del alias de corrida_s1 sobre la fecha de plan de C-6 · T-8 · CR-1; «21 de diciembre» no lo traduce la
    //   app, que solo traduce «<día> <n>-<mes>», y con el alias el plan no se mueve: antes el mensaje prometía la fecha de PLAN, un día antes de la real).
    //   Repo público: el texto dice «Doctor» / «el asesor» (sin nombres nuevos).
    M1: (x, prev) => ({
      titulo: 'M1 · SR-1 primero + WhatsApp al asesor con las 3 coautorías', // v6.10j: ≤ 75; «(protocolo del metaanálisis)», en el arranque
      pasos: [
        { min: 2, que: 'Arranque (1.ª sesión Research): el evento del Calendar + el chat Research + Anki abierto', como: 'Research empieza por SR-1 (protocolo del metaanálisis), no por la tesis; del M1 original solo queda el WhatsApp al asesor.' },
        // v6.10e (revisión del 18-nov · dias-1920-5): cada punto del pre-test tiene su fuente HOY y un paso con minutos para corregirlo: (1) el PICO del SR/MA
        //   que lees a las 13:50 (el abstract; antes «la pregunta de SR-1», que no se fija hasta R6: no había contra qué corregirla) · (2) las checklists, en el
        //   último paso (PRISMA-P en GoodNotes; PRISMA 2020 y AMSTAR-2 en los recursos). La eval anclada de R0 lo repite de memoria días después.
        { min: 5, que: 'Pre-test = RECALL EN BLANCO, a papel y con confianza (1-3): escribe (1) qué crees que compara un metaanálisis de hialuronidasa en las complicaciones vasculares por ácido hialurónico, en formato PICO · (2) para qué sirven PRISMA-P, PRISMA 2020 y AMSTAR-2 y cuántos ítems crees que tiene cada una', como: `Sin mirar nada, con tu confianza (1-3) en cada punto; lo corriges HOY con las fuentes reales, no con un chat: (1) con el abstract de las 13:50 · (2) en el último paso, con las checklists oficiales (PRISMA-P 2015 en GoodNotes; PRISMA 2020 y AMSTAR-2 en los recursos). Días después, la eval anclada de R0 (la sesión de infraestructura académica, ${f('R0')}) lo repite de memoria.` },
        { min: 8, que: 'WhatsApp al asesor con las 3 coautorías (lo envías tú)', como: `Plan B: el mismo texto por correo o en persona. Texto: «Doctor, buenos días. Le escribo con tres propuestas concretas de coautoría; en las tres yo hago todo el trabajo de redacción, formato y envío: 1) publicar la tesis como research letter (ya tengo el esquema armado con los datos que analizamos), con usted como último autor; envío previsto: ${fLargo(fechaReal(fechaDe('T-8')))}. 2) una carta al editor sobre un artículo reciente de complicaciones de rellenos o láser en fototipos oscuros, con usted como coautor (unos 30 minutos de revisión); envío: ${fLargo(fechaReal(fechaDe('C-6')))}. 3) un reporte de caso de su consulta, con usted como senior author; necesitaríamos elegir el caso antes del ${fLargo(fechaReal(fechaDe('CR-1')))}. ¿Tendría 20 minutos esta semana o la próxima, en persona o por llamada? Le llevo la propuesta en una hoja. Gracias.» (Si prefieres 2 coautorías, borra el punto 2.)`, enlace: { t: 'MENTORES.md §3', url: GH + 'DATA/RESEARCH/MENTORES.md' } },
        { min: 5, que: 'Lista tengo / falta de los 10 documentos de etica.md §1, ANTES de la reunión con el asesor', como: `Para T-1 (ética de la tesis, ${f('T-1')}): marca cuáles tienes en PDF y cuáles hay que pedir; lo que falte se lo preguntas al asesor en la reunión.`, enlace: { t: 'etica.md §1', url: GH + 'DATA/RESEARCH/TESIS_L0/etica.md' } },
        { min: 15, que: 'Abstract de PubMed 41249530 (solo el abstract): «Hyaluronidase Protocol in Management of Hyaluronic Acid Filler-Related Vascular Complications: A Systematic Review and Meta-Analysis» (Aesthetic Plast Surg 2026)', como: 'Extrae a papel: bases de datos · periodo de búsqueda · diseños incluidos · ¿solo ácido hialurónico? · cómo agrupa el tiempo hasta la hialuronidasa · nº de estudios y de pacientes. La clave es el propio abstract: relee y corrige en rojo (lo que el abstract no diga = «no consta», nunca inventado) y corrige también el PICO (1) del pre-test.', enlace: { t: 'PubMed 41249530', url: 'https://pubmed.ncbi.nlm.nih.gov/41249530/' } },
        { min: 5, que: 'PRISMA-P 2015 (GoodNotes › Documentos › RESEARCH › SR-1_complicaciones_rellenos › 01_PRISMA-P_2015_checklist, pág. 5): marca qué ítems ya tiene SR-1', como: 'Solo marcar (✓ / falta) sobre la lista; lo que falte es el trabajo del protocolo de las próximas sesiones.' },
        { min: 5, que: 'Corrección del pre-test (2): para qué sirve cada checklist y cuántos ítems tiene (2′) + free recall (1′) + ≤2 APEX (2′)', como: 'Con las fuentes reales, en rojo sobre tu papel: PRISMA-P 2015 (GoodNotes, pág. 5, ya abierta) · PRISMA 2020 (su checklist en PDF, en los recursos) · AMSTAR-2 (Shea, BMJ 2017, texto completo en PMC: en los recursos). Después el free recall de la sesión y ≤2 APEX de lo que fallaste: el mazo APEX::RESEARCH::01_Protocolo_SR nace hoy, con estas tarjetas (nada de mazos ni carpetas vacíos por adelantado).', enlace: R('PRISMA') },
      ],
      hecho: 'Pre-test + WhatsApp enviado + lista de los 10 documentos + abstract extraído + PRISMA-P marcado + pre-test corregido con el abstract y las 3 checklists + ≤2 APEX.',
      planB: 'Sin WhatsApp: el mismo texto por correo o en persona, el mismo día.',
      // v6.10e (dias-1920-5): + PRISMA (la checklist de PRISMA 2020) y AMSTAR-2, las fuentes de la corrección del pre-test (PRISMA-P está en GoodNotes, paso 6);
      //   no el recurso PRISMAC, cuya etiqueta da el nº de ítems que pregunta el pre-test
      recursos: [{ t: 'PubMed · 41249530 (SR/MA de hialuronidasa en complicaciones vasculares por ácido hialurónico)', url: 'https://pubmed.ncbi.nlm.nih.gov/41249530/' }, R('PRISMAPDF'), R('PRISMA'), R('AMSTAR'), { t: 'MENTORES.md (CRM + mensajes)', url: GH + 'DATA/RESEARCH/MENTORES.md' }, { t: 'TESIS_L0/etica.md', url: GH + 'DATA/RESEARCH/TESIS_L0/etica.md' }, R('ICMJE'), R('CREDIT')],
    }),
    'C-1': (x, prev) => ({
      titulo: 'C-1 · Discovery: 5 candidatos de los últimos 60 días + correo a IJD', // v6.10j: ≤ 75; las 5 revistas, con su nombre, en el «cómo» del paso de Crossref
      pasos: [
        evalAnclada(prev, x),
        { min: 5, que: 'Pre-test: qué hace a un artículo buen «diana» para una carta', como: 'Ventana ≤8 semanas desde la publicación online (regla de candidatos.md mientras la de cada revista esté «A VERIFICAR») + un ángulo con 1 dato verificable peruano/latino.' },
        { min: 15, que: 'Consulta Crossref A (filler · hyaluronic acid · complication) y B (skin of color · Fitzpatrick · laser · cosmetic), ' + fmtDM(C1D) + ' → ' + fmtDM(C1H) + '-' + C1H.slice(0, 4) + ', en las 5 revistas por ISSN', como: 'Las 5 revistas: JAAD · JAAD Intl · IJD · JCD · Dermatol Surg. Abre las dos URLs (mismas consultas que candidatos.md, con fechas nuevas) y anota título · revista · fecha online · DOI de los que encajen con derma estética · fototipos IV-VI · complicaciones de rellenos.', enlace: { t: 'Crossref A', url: CROSSREF('filler hyaluronic acid complication', C1D, C1H) } }, // v6.03 (verificación de contenido, 20-oct): faltaban las fechas → «from-pub-date:undefined» (HTTP 400)
        { min: 10, que: 'Tabla de 5 candidatos en DATA/RESEARCH/CARTA_1/candidatos.md (nueva sección «' + MES_LARGO[Number(C1H.slice(5, 7)) - 1] + '-' + C1H.slice(0, 4) + '»)', como: 'Por fila: journal · fecha online · DOI · ventana (URL de Author Guidelines) · límite de palabras/refs · coste · ángulo. Los candidatos del 5-sep publicados online en jul-ago ya pasan las 8 semanas: solo siguen si la guía de su revista admite una ventana mayor.', enlace: { t: 'candidatos.md', url: GH + 'DATA/RESEARCH/CARTA_1/candidatos.md' } },
        { min: 5, que: 'Correo a la Editorial Office de IJD pidiendo su política de correspondencia (pendiente desde el 27-ago)', como: '5 líneas; lo envías tú. La dirección se toma de la web de la revista (no está verificada en el repo: A VERIFICAR).', enlace: R('IJD') },
        { min: 5, que: 'Free recall + ≤3 APEX-método + guarda candidatos.md', como: 'Cada DOI nuevo se verifica con DATA/RESEARCH/agentic/citation_verifier.py antes de C-2 (' + f('C-2') + ').' },
      ],
      hecho: 'CARTA_1/candidatos.md con 5 candidatos de los últimos 60 días (journal · fecha · DOI · ventana · límites · coste · ángulo) + correo a IJD enviado.',
      planB: 'Si Crossref no responde: PubMed con filtro de fecha (últimos 60 días) y el nombre de cada revista; OpenAlex como tercera vía.',
      recursos: [{ t: 'Crossref · consulta A (rellenos)', url: CROSSREF('filler hyaluronic acid complication', C1D, C1H) }, { t: 'Crossref · consulta B (skin of color)', url: CROSSREF('skin of color Fitzpatrick laser cosmetic', C1D, C1H) }, R('PM'), R('OPENALEX'), R('JAADINT'), R('IJD')],
    }),
    M2: (x, prev) => ({
      titulo: 'M2 · Rising Scholars: cuenta + solicitud de mentor 1-a-1 + plan B de inglés', // v6.10j: ≤ 75
      pasos: [
        evalAnclada(prev, x),
        { min: 5, que: 'Pre-test: qué 3 cosas pides al mentor y en qué meses', como: 'Después compáralo con MENTORES.md §3 «Mensaje 2».' },
        { min: 10, que: 'Registro en Rising Scholars (red gratuita de INASP; la cuenta la creas tú)', como: 'País Perú · institución FMH-UNCP · disciplina dermatología / salud pública · nivel early-career · idiomas ES/EN.', enlace: { t: 'risingscholars.net/accounts/register', url: 'https://risingscholars.net/accounts/register/' } },
        // v6.10g (revisión 18-nov): sin «(v6.08)» (bitácora, y la versión vigente es otra): las fechas que cambiar las da el «cómo»
        { min: 10, que: 'Solicitud de mentor en la sección Mentoring: pega el «Mensaje 2» de MENTORES.md con las fechas del plan vigente', como:`Cambia los meses del mensaje: carta al editor ≈ ${f('C-3')} → ${f('C-6')} · research letter ≈ ${f('T-7')} → ${f('T-8')} · case report: revisión en CR-6 (${f('CR-6')}). La mecánica exacta (buscar mentor vs publicar la solicitud) se confirma dentro de la plataforma (A VERIFICAR, 5-sep).`, enlace: { t: 'Mentoring', url: 'https://risingscholars.net/en/mentoring/' } },
        { min: 5, que: `MENTORES.md fila 2: fecha de solicitud + «decisión del plan B de inglés: ${fmt(M2.fechaPlanB || addDays(M2.fecha, 28))}» + 1 línea en §2`, como: `Si a las 4 semanas no hay mentor asignado → plan B (editor profesional, RUTA §3.1).${M2.fechaPlanB && M2.fechaPlanB !== addDays(M2.fecha, 28) ? ` (4 semanas tras M2 = ${fmt(addDays(M2.fecha, 28))}, día sin sesión: la decisión va al siguiente día-Research.)` : ''}`, enlace: { t: 'MENTORES.md', url: GH + 'DATA/RESEARCH/MENTORES.md' } },
        { min: 5, que: 'Plan B del inglés del primer manuscrito: inscríbete en «Writing in the Sciences» (Coursera; modo auditoría si está disponible)', como: 'Solo la inscripción; el curso se usa cuando toque redactar (C-3).', enlace: R('SCIWRITE') },
        { min: 5, que: 'Free recall + ≤3 APEX-método + sella el artefacto', como: 'APEX tipo «mentor de escritura: qué pedir · cuánto tiempo · con qué fecha».' },
      ],
      hecho: 'Cuenta en Rising Scholars + solicitud de mentor enviada + fila 2 de MENTORES.md con fecha y la fecha de decisión del plan B.',
      planB: 'Si el registro falla o la sección Mentoring no responde: guarda el mensaje y escribe a la red por su formulario de contacto; la fecha de decisión del plan B no se mueve.',
      recursos: [R('RISING'), { t: 'MENTORES.md §3 «Mensaje 2»', url: GH + 'DATA/RESEARCH/MENTORES.md' }, R('SCIWRITE'), R('PHRASE')],
    }),
  };

  const out = {}; const conDetalle = [];
  for (const x of TODOS) {
    const prev = TODOS.find((y) => y.d === x.d - 1) || null;
    const f4 = x.fecha >= SERUMS_INICIO;
    const obs = obsDe(x);
    const recs = x.recs.map(R);
    let g;
    if (DET[x.code] && !f4) {
      const d = DET[x.code](x, prev);
      g = { franja: '13:30–14:15', plan: 'research-derma', titulo: d.titulo, totalMin: 45, pasos: d.pasos, recursos: [...d.recursos, { t: '◆ Obsidian · carpeta del entregable', url: obsUrl(obs) }], hecho: d.hecho, ...(d.planB ? { planB: d.planB } : {}), aviso: [faseResearchAviso(x.code), d.aviso, ...(x.chips || [])].filter(Boolean).join(' · ') }; // v6.10e: + la fase (base cero)
      conDetalle.push(x.code);
    } else {
      continue; // genérica / F4: la construye guiaResearchDe() en src/lib/researchGuia.ts (TS_BUILDER) desde DIAS + REC (no se duplica el texto en el bundle)
    }
    const sum = g.pasos.reduce((a, p) => a + p.min, 0);
    if (sum !== g.totalMin) throw new Error(`research_guia: ${x.code} Σ pasos ${sum} ≠ ${g.totalMin}`);
    g.pasos.forEach((p, i) => { if (!p.que || !p.como || !Number.isInteger(p.min) || p.min < 1) throw new Error(`research_guia: ${x.code} paso ${i + 1} incompleto`); });
    // v6.06 (fix) · CONTROL: con átomo previo, la guía abre con la eval anclada de ESE átomo (5′, o la express de 2′ de R0) y cita sus 2Q propias (Q2)
    if (prev) {
      const p0 = g.pasos[0].que;
      if (!new RegExp(`^Eval anclada (express )?de ${prev.code.replace(/[-]/g, '\\-')}\\b`).test(p0)) throw new Error(`research_guia: ${x.code} (d${x.d}) no abre con la eval anclada de su átomo previo ${prev.code}: «${p0.slice(0, 80)}»`);
      // v6.10j: Q2 = { fuente, check, puntos }: la fuente y la comprobación en el «qué», los 2 puntos del recall en el «cómo»
      const q2 = Q2[prev.code], c0 = g.pasos[0].como;
      if (q2 && !(p0.includes(q2.fuente) && p0.includes(q2.check) && c0.includes(q2.puntos))) throw new Error(`research_guia: ${x.code} (d${x.d}) pierde la fuente, la comprobación o los 2 puntos de ${prev.code} (${q2.fuente} · ${q2.check} · ${q2.puntos})`);
      // v6.10j · CONTROL (corte del Calendar: «qué» ≤ 150 · «cómo» ≤ 110): la fuente y la comprobación ENTERAS en el «qué» (y la fuente antes del «¿…?») y,
      //   en el «cómo», los 2 puntos del recall en una 1.ª frase que cierra antes del 110 (antes se perdían «¿checklist «Infra académica» en 7/10?» y
      //   «¿5 candidatos con DOI en candidatos.md?»)
      if (q2) {
        if (p0.length > CAL_QUE) throw new Error(`research_guia: ${x.code} (d${x.d}) eval anclada de ${prev.code}: el «qué» pasa de ${CAL_QUE} (${p0.length}) y el Calendar cortaría la comprobación`);
        if (p0.indexOf(q2.fuente) > p0.indexOf(q2.check)) throw new Error(`research_guia: ${x.code} (d${x.d}) la comprobación va antes que la fuente`);
        const f1 = c0.indexOf(q2.puntos) + q2.puntos.length + 1; // la 1.ª frase del «cómo» acaba en «.» tras los 2 puntos
        if (f1 > CAL_COMO - 1) throw new Error(`research_guia: ${x.code} (d${x.d}) eval anclada de ${prev.code}: los 2 puntos acaban en ${f1} > ${CAL_COMO - 1} y el Calendar los cortaría`);
      }
    }
    const vistos = new Set();
    g.recursos = g.recursos.filter((r) => !vistos.has(r.url) && vistos.add(r.url));
    out[x.d] = g;
  }
  // v6.06 (fix) · CONTROL: un átomo con 2Q propias seguido (antes del SERUMS) de uno SIN guía paso a paso las perdería (la genérica solo pide «2Q de
  //   auto-test del método») · y la pregunta «¿respondió el Dr. Ciro?» sale en alguna guía tras M1 si M1 tiene sucesor paso a paso.
  for (const x of TODOS) {
    const prev = TODOS.find((y) => y.d === x.d - 1);
    if (prev && Q2[prev.code] && x.fecha < SERUMS_INICIO && !out[x.d]) throw new Error(`research_guia: ${x.code} (d${x.d}) sigue a ${prev.code} sin guía paso a paso → la genérica perdería sus 2Q (${Q2[prev.code]})`);
  }
  // v6.10e (base cero · preguntas reales) · CONTROL: ninguna guía paso a paso pide «2Q de auto-test» ni deja la corrección o la clave a un chat (la da la fuente real)
  for (const g of Object.values(out)) for (const p of g.pasos) if (/2Q de auto-test|(corrección|clave) la da el chat/.test(`${p.que} ${p.como}`)) throw new Error(`research_guia: «${p.que.slice(0, 70)}…» pide preguntas inventadas o deja la clave a un chat`);
  // v6.10 · fix 18-nov · CONTROL: tampoco la UI de Research (la tarjeta «Eval anclada» de ResearchTodayPlan.tsx seguía pidiendo «2Q de auto-test del método»)
  {
    const fs = require('fs'); const path = require('path'); const dir = path.join(__dirname, '..', '..', 'src', 'components', 'study');
    for (const f of fs.readdirSync(dir).filter((n) => /^Research.*\.tsx$/.test(n))) {
      const t = fs.readFileSync(path.join(dir, f), 'utf8');
      if (/2Q de auto-test|auto-test del método/.test(t)) throw new Error(`research_guia: src/components/study/${f} sigue pidiendo «2Q de auto-test» (preguntas escritas por la IA): usa el recall en blanco contrastado con su fuente`);
    }
  }
  // v6.10 · fix 18-nov · CONTROL: el recall en blanco de cada eval anclada genérica se corrige contra un documento o guía (REC_DOC) o una fuente propia
  //   (CONTRASTE_DE), nunca contra un portal o una herramienta (Rising Scholars, PubMed, Crossref, Editorial Manager…)
  for (const k of REC_DOC) if (!rec(k)) throw new Error(`research_guia: REC_DOC ${k} no existe en REC`);
  // v6.10j · CONTROL: cada recurso de REC_DOC tiene su nombre corto, y el nombre corto sale del nombre entero (no se inventa: es el nombre del recurso
  //   o su autor y año) · la 1.ª parte del «cómo» de la eval anclada genérica cierra antes del corte del Calendar
  for (const k of REC_DOC) {
    const c = REC_CORTO[k], l = rec(k).label;
    if (!c) throw new Error(`research_guia: REC_CORTO sin el nombre corto de ${k} («${l}»)`);
    const pal = c.replace(/[()·&]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
    if (pal.some((w) => !l.includes(w))) throw new Error(`research_guia: REC_CORTO ${k} «${c}» no sale del nombre del recurso «${l}»`);
  }
  if (EVAL_COMO.length > CAL_COMO - 1 || !/\.$/.test(EVAL_COMO) || !/sin preguntas inventadas/.test(EVAL_COMO)) throw new Error(`research_guia: EVAL_COMO (${EVAL_COMO.length}) debe caber en ${CAL_COMO - 1}, acabar en «.» y decir «sin preguntas inventadas»`);
  // v6.10j · CONTROL (anti-alucinación): cada fichero, sección o estado que nombra ART_CHECK está en el artefacto, el entregable o el objetivo de ese átomo
  for (const [code, chk] of Object.entries(ART_CHECK)) {
    const x = porCode[code]; if (!x) throw new Error(`research_guia: ART_CHECK ${code} no es un átomo`);
    const fuente = `${x.artefacto} ${x.entregable} ${x.objetivo}`.toLowerCase();
    for (const t of chk.match(/[\w§/.-]*[._§][\w§/.-]*|[\w-]+-(?:L0|SR1|\d)\b|\d+-\d+/gu) || []) if (!fuente.includes(t.toLowerCase())) throw new Error(`research_guia: ART_CHECK ${code} «${chk}» nombra «${t}», que no está en su artefacto, entregable ni objetivo`);
  }
  for (const code of Object.keys(CONTRASTE_DE)) if (!porCode[code]) throw new Error(`research_guia: CONTRASTE_DE ${code} no es un átomo`);
  // v6.10j · CONTROL: un título escrito a mano cabe en TITULO_MAX y sale de su objetivo (cada palabra de más de 3 letras está en él)
  for (const [code, t] of Object.entries(TITULO_DE)) {
    const x = porCode[code]; if (!x) throw new Error(`research_guia: TITULO_DE ${code} no es un átomo`);
    if (`${code} · ${t}`.length > TITULO_MAX) throw new Error(`research_guia: TITULO_DE ${code} pasa de ${TITULO_MAX}`);
    const fuera = t.split(/[^\p{L}\d-]+/u).filter((w) => w.length > 3 && !x.objetivo.toLowerCase().includes(w.toLowerCase()));
    if (fuera.length) throw new Error(`research_guia: TITULO_DE ${code} usa palabras que no están en su objetivo: ${fuera.join(', ')}`);
  }
  for (const [code, d] of Object.entries(DET)) { const t = d(porCode[code] || {}, null).titulo; if (t.length > TITULO_MAX) throw new Error(`research_guia: el título de ${code} pasa de ${TITULO_MAX} (${t.length}): ${t}`); }
  //   (la comprobación sobre el texto ya generado de cada guía genérica la hace gen_research_plan.js tras escribir src/lib/researchGuia.ts)
  const trasM1 = porCode.M1 && TODOS.find((y) => y.d === porCode.M1.d + 1);
  if (trasM1 && out[trasM1.d] && !Object.values(out).some((g) => g.pasos.some((p) => /¿respondió el (Dr\. Ciro|asesor)/.test(p.que)))) throw new Error('research_guia: ninguna eval anclada tras M1 pregunta si respondió el asesor');
  // v6.10 · tanda C: el nº de ítems de PRISMA-P / PRISMA 2020 / AMSTAR-2 solo lo pide el pre-test de M1 (ningún otro paso de ese día lo da)
  if (porCode.M1 && out[porCode.M1.d] && out[porCode.M1.d].pasos.filter((p) => /\b(17|27|16) ítems/.test(`${p.que} ${p.como}`)).length) throw new Error('research_guia: M1 da el número de ítems de una guía de reporte');
  const crAntes = !PAUSA || fechaDe('CR-8') < PAUSA.desde; // v6.06: el paquete del case report se congela antes de la pausa (v6.05) o tras ella (v6.06, nivel 2)
  // v6.08: último paso CR antes de la pausa y primero tras ella (el paso 3 deja de suponer que el borrador v1, CR-5, ya existe)
  const QUE_CR = { 'CR-1': 'caso decidido', 'CR-2': 'consentimiento firmado', 'CR-3': 'fotos y protocolo fotográfico', 'CR-4': 'CARE 13/13 + timeline', 'CR-5': 'borrador v1', 'CR-6': 'revisión del senior + inglés', 'CR-7': 'formateo', 'CR-8': 'paquete' };
  const CRS = Object.keys(QUE_CR);
  const crUlt = PAUSA ? CRS.filter((c) => fechaDe(c) < PAUSA.desde).pop() : 'CR-8';
  const crSig = PAUSA ? (CRS.find((c) => fechaDe(c) >= PAUSA.desde) || 'CR-8') : 'CR-8';
  const crBorrador = !!PAUSA && fechaDe('CR-5') < PAUSA.desde;
  const minimo = {
    franja: '13:30–14:00', plan: 'research-derma', titulo: "RESEARCH · mínimo 30′ (DJ-4) — pausa de átomos (intensiva ENCAPS)", totalMin: 30,
    pasos: [
      { min: 10, que: 'Inbox de revisores y editorial: estado de la carta y de la research letter en los portales', como: 'Responde lo que sea de 1 línea; lo que pida trabajo va a la cola de febrero (X-2 tiene la plantilla de rebuttal).' },
      { min: 15, que: '1 lectura de la cola del ciclo 2 (el recurso 1 del próximo átomo pendiente)', como: 'Lee con free recall al final; no produces artefacto nuevo.' },
      crAntes
        ? { min: 5, que: 'Repaso del paquete congelado del case report (CR-8)', como: 'Solo comprobar que manuscrito + fotos + consentimiento + CARE + cover siguen completos para CR-9.' }
        : crBorrador
          ? { min: 5, que: `Case report: relee el borrador v1 (CR-5) y apunta las dudas para la revisión de ${crSig} (${f(crSig)})`, como: `Solo lectura + lista de dudas para el senior author y el mentor de inglés; el paquete (CR-8) se congela tras la pausa (${f('CR-8')}) y el SUBMIT CR-9 va el ${f('CR-9')}.` }
          // v6.10g (revisión 18-nov · c11): las fechas al principio (el Calendar corta el «qué» a 150 y el «cómo» a 110: «jue …» tapaba el 11-feb, el 25-feb y el 1-mar)
          : { min: 5, que: `Case report: apunta lo que falta para ${crSig} (${f(crSig)}: ${QUE_CR[crSig]}) y repasa lo cerrado antes de la pausa (${crUlt ? `${crUlt} · ${QUE_CR[crUlt]}` : 'nada aún'})`, como: `${crSig} → CR-8: ${f(crSig)} → ${f('CR-8')} · SUBMIT CR-9: ${f('CR-9')}. Solo lista de pendientes para el senior author (fotos, datos, firmas).` },
    ],
    recursos: [{ t: '◆ Obsidian · Dashboard Research', url: obsUrl('04_INVESTIGACIÓN DERMATOLÓGICA/00_DASHBOARD_RESEARCH/Dashboard_Research') }],
    hecho: crAntes ? 'Inbox al día + 1 lectura con free recall + paquete del case report comprobado.' : crBorrador ? `Inbox al día + 1 lectura con free recall + dudas del borrador del case report apuntadas para ${crSig}.` : `Inbox al día + 1 lectura con free recall + pendientes del case report apuntados para ${crSig}.`,
  };
  return { porD: out, minimo, conDetalle };
}

module.exports = { construirGuiasResearch, TS_BUILDER, FASES_RESEARCH, faseResearchAviso, REC_DOC, CONTRASTE_DE, REC_CORTO, ART_CHECK, EVAL_COMO, TITULO_MAX };
