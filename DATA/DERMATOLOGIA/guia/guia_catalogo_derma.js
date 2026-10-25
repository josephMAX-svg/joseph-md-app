/**
 * guia_catalogo_derma.js — catálogo CURADO de la guía Derma «qué · cuánto · cómo» (lo lee gen_derma_guia.js → src/lib/dermaGuiaDatos.ts).
 * Aquí solo hay decisiones (qué recurso y en qué orden); los NÚMEROS salen de las fuentes vía el contexto `C` del generador:
 *   · casos: DATA/DERMATOLOGIA/_scrape/accessderma_cases1546.json (listado real 18-oct: Dermatopathology 1-30 · Medical 31-140 ·
 *     Pediatric 141-170 · Surgical 171-200 → C.caso(pos) da «<Área> Dermatology. Case NN» + URL directa CaseContent.aspx)
 *   · libros: accessderma_clinica_tocs.json + accessderma_estructura.json (índices leídos el 18-oct / 10-jun) → C.cap(bookid, sid)
 *   · B&B: DATA/USMLE/qbankly_bb_step1_videos.tsv → C.bb(id) (duración real) · C.bbMin(id, fecha) (velocidad de la semana, regla E1)
 *   · uWorld Step 1: qbankly_uworld_step1_filtros.tsv → C.uw(id) (nº real de preguntas del System)
 *   · ProMIR Dermatología cap. 1: medición E2 (DATA/MIR/guia_lectura_semana1-2.json → derma[]) → C.pmd1Lectura(d) · C.pmd1Test(d)
 *   · DermNet: palabras por apartado medidas el 18-oct (curl + recuento) → minutos a 120 palabras/min (inglés, «desde cero»)
 * Pictorial Review 4e (qa.aspx?resourceid=3626) · «Create Custom Quiz»: 34 temas, 381 preguntas (leído el 18-oct). La asignación por
 * sesión NO repite preguntas (el generador aborta si un tema se pasa de sus preguntas): solo las sesiones NO-ProMIR con banco Pictorial
 * consumen tema; en las sesiones ProMIR (d ≡ 0 mod 3) el slot es el test del capítulo.
 * v6.02c (18-oct-2026, E3): nuevo — d1-d5 (v6.05: mar 27 · jue 29-oct · lun 2 · mié 4 · vie 6-nov; v6.03: mié 21 · vie 23 · mar 27 · jue 29-oct · lun 2-nov; v6.02: lun 19 · mié 21 · vie 23 · mar 27 · jue 29-oct) curadas con plan A (AccessDerma) y plan B
 *   (acceso remoto caducado); el resto de sesiones por regla en src/lib/dermaGuia.ts.
 * v6.02c F2 (18-oct-2026, hallazgos E6): CME_DESPLAZADO (d12 → lectura del átomo, módulo 4 al d42) · respaldo DermNet «Dermoscopy» en las
 *   imágenes de Dermoscopedia (d2 · d4) · el test del d3 ya no cita «el caso de 13:36» (lo corrige gen_guia_lectura.js).
 */
'use strict';

/** Temas del «Create Custom Quiz» del Pictorial Review 4e (nombre exacto · nº disponible), leídos el 18-oct-2026. */
const PICTORIAL_TEMAS = [
  ['Hair Findings', 9], ['Eye Findings', 10], ['Nail Findings', 8], ['Oral Pathology', 10], ['Genital Dermatology', 6],
  ['Contact Dermatitis', 10], ['Autoimmune Bullous Diseases', 15], ['Disorders of Cornification, Infiltration, and Inflammation', 8],
  ['Pigmentary Disorders', 10], ['Disorders of Fat', 20], ['Cutaneous Tumors', 10], ['Melanoma and Non-Melanoma Skin Cancer', 10],
  ['Vascular Tumors and Malformations', 10], ['Genodermatoses', 10], ['Pediatric Dermatology', 10], ['Cutaneous Infestations', 10],
  ['Viral Diseases', 10], ['Bacterial Diseases', 9], ['Fungal Disease', 15], ['Nutrition-Related Diseases', 10],
  ['Cutaneous Findings Related to Pregnancy', 9], ['Rheumatologic Diseases', 10], ['Metabolic Diseases', 9], ['Dermatologic Medications', 7],
  ['Surgery and Anatomy', 13], ['Cosmetic Dermatology', 10], ['Immunology Review', 4], ['Basic Sciences', 20],
  ['Statistics and Epidemiology', 10], ['Histologic Stains and Special Studies', 15],
  ['Reflectance Confocal Microscopy: The Era of Noninvasive Imaging', 5], ['Radiologic Findings', 10], ['Electron Microscopy', 17],
  ['High-Yield Facts for the Dermatology Boards', 32],
].map(([t, n]) => ({ t, n }));

/**
 * Tema(s) del Pictorial por sesión (ciclo 1, solo sesiones con banco Pictorial 4e y SIN test ProMIR). Afinidad con el átomo del día;
 * un tema grande se reparte entre sesiones (el quiz custom elige al azar dentro del tema: pide solo las que te tocan y apunta cuáles
 * salieron; la siguiente sesión del mismo tema, «Start Custom Quiz» con el resto → si repite alguna, sáltala).
 */
const PICTORIAL_ASIGNACION = {
  1: [['Cutaneous Infestations', 10]],                   // lesiones 1ª/2ª en una misma imagen: surco · pápula · nódulo · excoriación · costra
  2: [['Vascular Tumors and Malformations', 10]],        // color (rojo/violáceo/azul) + distribución segmentaria / configuración
  4: [['Pigmentary Disorders', 10]],                     // fototipos: hiper/hipo, epidérmico vs dérmico
  5: [['Surgery and Anatomy', 10]],                      // anatomía facial y zonas de riesgo (las 3 restantes → d40)
  7: [['Disorders of Cornification, Infiltration, and Inflammation', 8], ['Nail Findings', 2]], // psoriasis/papuloescamosas + uña psoriásica
  8: [['Contact Dermatitis', 10]],
  10: [['Autoimmune Bullous Diseases', 10]],
  11: [['Immunology Review', 4], ['Dermatologic Medications', 6]], // urticaria: mecanismo + antihistamínicos
  14: [['Bacterial Diseases', 9]],
  16: [['Viral Diseases', 10]],
  17: [['Fungal Disease', 10]],
  19: [['Cosmetic Dermatology', 10]],
  22: [['Cutaneous Tumors', 10]],
  23: [['Melanoma and Non-Melanoma Skin Cancer', 10]],
  25: [['Reflectance Confocal Microscopy: The Era of Noninvasive Imaging', 5], ['Nail Findings', 5]], // melanocíticas: confocal + melanoma ungueal
  26: [['High-Yield Facts for the Dermatology Boards', 10]],
  34: [['Pediatric Dermatology', 10]],
  35: [['Oral Pathology', 10]],                          // enantemas (Koplik, lengua aframbuesada de Kawasaki)
  37: [['Genodermatoses', 10]],
  40: [['Surgery and Anatomy', 3], ['Histologic Stains and Special Studies', 7]], // biopsias → tinciones
  41: [['Basic Sciences', 10]],                          // cicatrización / colágeno
  53: [['Disorders of Fat', 10]],                        // compartimentos grasos faciales
  56: [['High-Yield Facts for the Dermatology Boards', 10]],
  59: [['Eye Findings', 10]],                            // ptosis y complicaciones perioculares de la toxina
  62: [['Disorders of Fat', 10]],
  64: [['High-Yield Facts for the Dermatology Boards', 10]],
};

/**
 * v6.02c F2 (E6): sesiones (pares d6-d40) cuya lectura de 10′ del plan A es la del ÁTOMO (la `extra` de la fila del plan, capítulo verificado
 * en el índice del Color Atlas 9e) y no el módulo del micro-track de dermatoscopia, que no tiene relación con el átomo. El módulo pasa a la
 * sesión `destino` (repaso del micro-track): nada se recorta. El generador comprueba fila, índice y destino.
 */
const CME_DESPLAZADO = {
  12: {
    destino: 42,
    foco: 'SJS/TEN (% de superficie, SCORTEN, fármacos culpables), DRESS (latencia 2-8 semanas, eosinofilia, órgano afectado) y AGEP (pústulas no foliculares, latencia corta) → tabla de 3 columnas',
    motivo: 'Farmacodermias graves = átomo «no errar»: el módulo 4 del micro-track (lesiones melanocíticas benignas) no tiene relación con el átomo → pasa al d42 (repaso del micro-track).',
  },
};

const AESTHETIC = 'https://claude.ai/project/019d135e-b442-71fc-bd3c-e2b6ea78796f';
const QBANKS = 'https://qbankly.app/qbanks';
const VIDEOS = 'https://qbankly.app/videos';
const DERMNET = 'https://dermnetnz.org';
const DSC = 'https://dermoscopedia.org';
/** v6.02c F2 (E6): Dermoscopedia falla por HTTPS desde algunas redes → respaldo DermNet «Dermoscopy (Dermatoscopy)» (curl 200 el 18-oct-2026). */
const DERMNET_DERMOSCOPY = 'https://dermnetnz.org/topics/dermoscopy';
const DSC_RESPALDO = ' · si Dermoscopedia no carga: DermNet «Dermoscopy (Dermatoscopy)» (en los recursos), mismas estructuras con imágenes.';
const R_DSC = { t: 'DermNet · Dermoscopy (respaldo de Dermoscopedia)', url: DERMNET_DERMOSCOPY };
const PASSMED = (doc) => `https://qbankly.app/library?e=3&doc=${doc}`;
/** DermNet: palabras de los apartados usados (recuento del 18-oct-2026, sin menús ni referencias) → min a 120 palabras/min. */
const DN_MIN = (palabras, figuras = 0) => Math.max(1, Math.round(palabras / 120 + figuras * 0.25));

/** Pasos comunes. */
const anki = (C, d) => (d === 1
  ? { min: 3, que: `Anki · crear el mazo ${C.deck('A')} (preset FSRS) — 1.ª sesión: aún no hay repasos`, como: 'Preset FSRS (retention 0,90) · tag step1 en las tarjetas de los átomos que cuentan doble para el Step 1 · las tarjetas de hoy se crean al cerrar cada caso.' }
  : { min: 3, que: `Anki ${C.deck('A')} · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger`, como: 'Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior.' });
const caso = (C, pos, k, n, min, foco) => {
  const c = C.caso(pos);
  return {
    min, que: `CASO CIEGO ${k}/${n} · ${c.titulo} (#${pos} de la permutación) — Dermatology Cases for Board Review`,
    como: `① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #${pos}» (módulo CORE: ${c.area}).${foco ? ' ' + foco : ''}`,
    enlace: { t: `Caso #${pos} · ${c.titulo}`, url: c.url },
  };
};
const cierre = (min = 2, extra = '') => ({ min, que: 'CIERRE · free recall en voz alta + tarjetas de MECANISMO', como: `Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»).${extra ? ' ' + extra : ''}` });
const pictorial = (C, d, como) => {
  const asig = C.pictorialDe(d);
  const txt = asig.map(([t, n]) => `«${t}» = ${n} (de ${C.temaN(t)})`).join(' + ');
  return {
    min: 10, que: `PICTORIAL REVIEW 4e · Create Custom Quiz › ${txt}`,
    como: `En la página del banco deja vacío «Create Random Quiz»; en «Create Custom Quiz» escribe ${asig.map(([t, n]) => `${n} en ${t}`).join(' y ')} → «Start Custom Quiz» · ~60 s/Q · ${como} · el quiz no se puede guardar a medias: termínalo · cada fallo → botón «fallo →» del banco (nº = posición en el quiz).`,
    enlace: { t: 'Pictorial Review 4e · Create Custom Quiz', url: C.url.pictorial },
  };
};
const uworld = (C, sysId, nQ, min, como) => {
  const s = C.uw(sysId);
  return {
    min, que: `uWorld Step 1 · System «${s.nombre}» · Unused · ${nQ}Q · Tutor (${s.q} preguntas en el System)`,
    como: `Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: marca SOLO ese System → Status Unused → ${nQ} preguntas → Tutor → BEGIN TEST · ${como} · cuentan doble para el Step 1 (no se repiten después).`,
    enlace: { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS },
  };
};
const bbVideo = (C, id, fecha, que) => {
  const v = C.bb(id); const m = C.bbMin(id, fecha);
  return {
    min: m.min, que: `B&B Step 1 › Dermatology › «${v.nombre}» (${v.dur})${que ? ' — ' + que : ''}`,
    como: `Qbankly › Video Library › B&B Step 1 › Dermatology › General Topics › ${v.nombre} · ${m.txt} · ${m.min}′ con pausas (regla de velocidad del Step 1) · al terminar, free recall de 60 s en el cuaderno.`,
    enlace: { t: `B&B · ${v.nombre}`, url: VIDEOS },
  };
};
const proyecto = (min, que, como) => ({ min, que: `Proyecto Claude «AESTHETIC DERMATOLOGY» (tus libros) · ${que}`, como, enlace: { t: 'Proyecto AESTHETIC DERMATOLOGY', url: AESTHETIC } });

const AVISO_B = 'AccessDerma: renueva el acceso remoto desde la red de tu institución (campus/VPN, o Sign in via OpenAthens/Shibboleth). Hasta entonces manda el PLAN B (sin casos ni Pictorial ni libros AccessDerma).';
const pendientes = (C, ids) => `Casos ${ids.map((p) => `#${p} (${C.caso(p).titulo})`).join(' y ')}, la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.`;

/** Sesiones curadas (d1-d5). Devuelve { d: { planA, planB } } con GuiaBloque completos (franja 13:30–14:15, 45′). */
function curadas(C) {
  const F = '13:30–14:15';
  const B = (d, titulo, pasos, recursos, hecho, planB, aviso) => ({ franja: F, plan: 'research-derma', titulo, totalMin: 45, pasos, recursos, hecho, planB, ...(aviso ? { aviso } : {}) });
  const dia = (d) => C.dia(d);
  const out = {};

  // ── d1 · mar 27-oct (v6.05; v6.03: mié 21-oct; v6.02: lun 19-oct) · Lesiones elementales 1ª/2ª ──────────────────────────────────────────────────────────────────────────────
  {
    const x = dia(1); const [c1, c2] = x.casoIds;
    const ch2 = C.cap(2960, '248574793'), ch3 = C.cap(2960, '248574973'), dsa1 = C.cap(2929, '245859873');
    const pmd = C.pmd1Lectura(1);
    out[1] = {
      planA: B(1, `DERMA d1 · ${x.sub.split(':')[0]} — plan A (AccessDerma)`, [
        anki(C, 1),
        caso(C, c1, 1, 2, 9), caso(C, c2, 2, 2, 9),
        { min: 2, que: `IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopy: An Illustrated Self-Assessment Guide 2e › ${dsa1.t} → la 1.ª imagen`, como: 'Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b · la próxima sesión impar sigue con la imagen siguiente.', enlace: { t: dsa1.t, url: dsa1.url } },
        pictorial(C, 1, 'antes de mirar las opciones nombra la lesión primaria y la secundaria de la imagen (surco, pápula, nódulo, excoriación, costra)'),
        { min: 10, que: `LECTURA · Guidebook to Dermatologic Diagnosis › ${ch2.t}`, como: `Por encabezados + figuras con su pie (Whole Page Rule por apartado); si acabas antes, ${ch3.t}. Sustituye al «approach» del Color Atlas 9e de la fila del plan: la 9e no tiene capítulo de enfoque (índice verificado el 18-oct: solo «How to Use this Book»). Longitud del capítulo no medida (acceso caducado).`, enlace: { t: ch2.t, url: ch2.url } },
        cierre(2, `≤3 tarjetas de MECANISMO en ${C.deck('A')}.`),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'Pictorial Review 4e', url: C.url.pictorial, cantidad: '10Q' },
        { t: ch2.t, url: ch2.url }, { t: ch3.t, url: ch3.url },
        { t: 'DermNet · Terminology (atlas)', url: `${DERMNET}/topics/terminology` },
      ], `2 casos registrados en el ledger (✓/✗) + 1 imagen dermatoscópica registrada + quiz de 10 terminado con sus fallos registrados + ${ch2.t.split(':')[0]} leído + ≤3 tarjetas de MECANISMO.`,
      'Sin acceso a AccessDerma → PLAN B de esta sesión (toca «AccessDerma caducado»).'),
      planB: B(1, `DERMA d1 · ${x.sub.split(':')[0]} — PLAN B (AccessDerma caducado)`, [
        anki(C, 1),
        uworld(C, 1028, 4, 12, 'en cada imagen, ANTES de las opciones: lesión 1ª + 2ª + color + distribución (8 ejes del dictado) y diferencial de 3 · ~3′/Q en inglés, sin prisa'),
        { min: 9, que: `LECTURA (español) · ProMIR Dermatología › cap. 1 «Introducción. Conceptos generales» › ${pmd.secciones} (${pmd.min}′ medidos · ${pmd.palabras} palabras · ${pmd.figs} figuras)`, como: 'Tapa el texto de cada figura y nombra la lesión ANTES de leer · Whole Page Rule (apartado entero) · al Shopping List: los términos que fallaste en el pre-test.', enlace: { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1 } },
        { min: DN_MIN(119 + 419 + 224), que: 'DermNet › «Terminology» › Describing skin conditions + Morphology + Secondary changes (762 palabras)', como: 'Solo esos 3 apartados, a ~120 palabras/min · cada término en inglés que no sepas → glosario EN-ES del cuaderno (papule = pápula, wheal = habón, crust = costra…).', enlace: { t: 'DermNet · Terminology', url: `${DERMNET}/topics/terminology` } },
        proyecto(0, 'DICTADO INVERSO de morfología', 'Pídele: «Dame 6 descripciones morfológicas de lesiones de mis libros SIN diagnóstico; yo nombro la lesión primaria y la secundaria; corrígeme citando libro y página». 6 rondas de ~2′ · cada fallo → tarjeta.'),
        cierre(2, `≤3 tarjetas de MECANISMO en ${C.deck('A')}.`),
      ], [
        { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS, cantidad: '4Q' },
        { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1, min: pmd.min },
        { t: 'DermNet · Terminology', url: `${DERMNET}/topics/terminology` },
        { t: 'Proyecto Claude · AESTHETIC DERMATOLOGY', url: AESTHETIC },
      ], '4Q de uWorld respondidas describiendo la imagen antes de las opciones + §2.1-2.2 de ProMIR leídas + 3 apartados de DermNet + 6 rondas de dictado inverso + ≤3 tarjetas.',
      pendientes(C, x.casoIds), AVISO_B),
    };
  }

  // ── d2 · jue 29-oct (v6.05; v6.03: vie 23-oct; v6.02: mié 21-oct) · Color, distribución y configuración ─────────────────────────────────────────────────────────────────────
  {
    const x = dia(2); const [c1, c2] = x.casoIds;
    const ch11 = C.cap(2960, '248575828'), ch4 = C.cap(2960, '248575068'), ch12 = C.cap(2960, '248575965');
    const pmd = C.pmd1Lectura(2);
    out[2] = {
      planA: B(2, `DERMA d2 · Color, distribución y configuración — plan A (AccessDerma)`, [
        anki(C, 2),
        caso(C, c1, 1, 2, 9), caso(C, c2, 2, 2, 9),
        { min: 2, que: 'IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Pigment network»', como: 'Tapa el título y los pies: describe la red (regular/atípica, fina/gruesa) antes de leer · registra ✓/✗ en ①b.' + DSC_RESPALDO, enlace: { t: 'Dermoscopedia · Pigment network', url: `${DSC}/Pigment_network` } },
        pictorial(C, 2, 'antes de las opciones: color (rojo/violáceo/azul), configuración y distribución (segmentaria, dermatomal) — el tema de hoy'),
        { min: 10, que: `LECTURA · Guidebook to Dermatologic Diagnosis › ${ch11.t}`, como: `Tabla en el cuaderno: configuración (anular · herpetiforme · lineal · Blaschko · dermatomal) → 2 ejemplos de cada una; si acabas: ${ch4.t}. ${ch12.t} queda como consulta. Longitud no medida (acceso caducado).`, enlace: { t: ch11.t, url: ch11.url } },
        cierre(2, `≤3 tarjetas en ${C.deck('A')}.`),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'Pictorial Review 4e', url: C.url.pictorial, cantidad: '10Q' },
        { t: ch11.t, url: ch11.url }, { t: ch4.t, url: ch4.url }, { t: ch12.t, url: ch12.url },
        { t: 'Dermoscopedia · Pigment network', url: `${DSC}/Pigment_network` }, R_DSC,
      ], `2 casos registrados + 1 imagen registrada + quiz de 10 terminado + tabla de configuraciones hecha + ≤3 tarjetas.`,
      'Sin acceso a AccessDerma → PLAN B de esta sesión.'),
      planB: B(2, `DERMA d2 · Color, distribución y configuración — PLAN B (AccessDerma caducado)`, [
        anki(C, 2),
        uworld(C, 1031, 3, 9, 'antes de las opciones nombra la configuración (anular = tiña, herpetiforme = HSV, dermatomal = zóster) y el color'),
        { min: 6, que: `LECTURA (español) · ProMIR Dermatología › cap. 1 › ${pmd.secciones} (${pmd.min}′ medidos · ${pmd.palabras} palabras · ${pmd.figs} figuras · tabla 1-1 de signos)`, como: 'Whole Page Rule; los signos de la tabla 1-1 (Darier, Nikolsky, Koebner…) → 1 tarjeta cada uno que no supieras.', enlace: { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1 } },
        { min: DN_MIN(381 + 97 + 193), que: 'DermNet › «Terminology» › Distribution + Configuration of lesions + Colour (671 palabras)', como: '~120 palabras/min · completa tu tabla de configuraciones con los términos en inglés.', enlace: { t: 'DermNet · Terminology', url: `${DERMNET}/topics/terminology` } },
        bbVideo(C, 74, x.fecha, 'color y distribución de las lesiones vasculares (por título; contenido no verificado)'),
        { min: 0, que: 'DermNet › «Blaschko lines» (≈250 palabras + 2 tablas + figuras)', como: 'Mira las figuras de tronco y extremidad y dibuja el patrón en V/S sobre una silueta.', enlace: { t: 'DermNet · Blaschko lines', url: `${DERMNET}/topics/blaschko-lines` } },
        { min: 2, que: 'IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Pigment network» (pública)', como: 'Tapa el título y los pies: describe la red antes de leer · registra ✓/✗ en ①b.' + DSC_RESPALDO, enlace: { t: 'Dermoscopedia · Pigment network', url: `${DSC}/Pigment_network` } },
        cierre(3, `≤3 tarjetas en ${C.deck('A')}.`),
      ], [
        { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS, cantidad: '3Q' },
        { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1, min: pmd.min },
        { t: `B&B · ${C.bb(74).nombre}`, url: VIDEOS, min: C.bbMin(74, x.fecha).min },
        { t: 'DermNet · Terminology', url: `${DERMNET}/topics/terminology` }, { t: 'DermNet · Blaschko lines', url: `${DERMNET}/topics/blaschko-lines` }, R_DSC,
      ], '3Q de uWorld + §2.3 de ProMIR + 3 apartados de DermNet + vídeo B&B visto con su free recall + dibujo de Blaschko + 1 imagen dermatoscópica + ≤3 tarjetas.',
      pendientes(C, x.casoIds), AVISO_B),
    };
  }

  // ── d3 · lun 2-nov (v6.05; v6.03: mar 27-oct; v6.02: vie 23-oct) · Estructura de la piel (día ProMIR: TEST cap. 1) ─────────────────────────────────────────────────────────
  {
    const x = dia(3); const [c1, c2] = x.casoIds;
    const ch15 = C.cap(2570, '210416355'), ch5 = C.cap(2570, '210415435'), dsa1 = C.cap(2929, '245859873');
    const pmd = C.pmd1Lectura(3); const t = C.pmd1Test(3);
    const test = {
      min: 11, que: `ProMIR Dermatología › cap. 1 · TEST ${t.nQ}Q (preguntas MIR citadas en el capítulo: ${t.ids.slice(0, t.nQ).join(' · ')})`,
      como: `${t.como} · si te sobra tiempo: ${t.ids.slice(t.nQ, t.nQ + 2).join(' · ')}. La lista «Pool oficial» de la app trae preguntas de OTROS capítulos de Dermatología (el cap. 1 no tiene en el pool): déjalas para el banqueo y registra el neto con «Registrar 10Q MIR-Derma» (total ${t.nQ}).`,
      enlace: { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1 },
    };
    out[3] = {
      planA: B(3, `DERMA d3 · Estructura de la piel + TEST ProMIR cap. 1 — plan A (AccessDerma)`, [
        anki(C, 3),
        caso(C, c1, 1, 2, 9, 'Es un caso de DERMATOPATOLOGÍA: en ① describe la capa afectada (epidermis · unión · dermis · hipodermis) y el patrón.'), caso(C, c2, 2, 2, 8),
        { min: 2, que: `IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopy Self-Assessment 2e › ${dsa1.t} → la imagen siguiente`, como: 'Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b.', enlace: { t: dsa1.t, url: dsa1.url } },
        test,
        { min: 10, que: `LECTURA · Fitzpatrick's Dermatology 9e › Part 2 › ${ch15.t}`, como: `Solo las figuras de la unión dermoepidérmica y sus pies (hemidesmosoma → lámina lúcida → lámina densa → fibrillas de anclaje): es el mapa de las ampollosas del d10. ${ch5.t} = consulta si fallaste el caso #${c1}. Longitud no medida (acceso caducado).`, enlace: { t: ch15.t, url: ch15.url } },
        cierre(2),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1, cantidad: `${t.nQ}Q (${t.citadas} citadas en el capítulo)` },
        { t: ch15.t, url: ch15.url }, { t: ch5.t, url: ch5.url },
        { t: 'dermpathatlas (histología)', url: 'https://www.dermpathatlas.com/' },
        { t: 'DermNet · The structure of normal skin', url: `${DERMNET}/topics/the-structure-of-normal-skin` },
      ], `2 casos registrados + 1 imagen + ${t.nQ}Q ProMIR registradas (kind derma10Q) + figuras de la UDE dibujadas + ≤3 tarjetas.`,
      'Sin acceso a AccessDerma → PLAN B (el test ProMIR no depende de AccessDerma).'),
      planB: B(3, `DERMA d3 · Estructura de la piel + TEST ProMIR cap. 1 — PLAN B (AccessDerma caducado)`, [
        anki(C, 3),
        { ...test, que: `PRIMERO, ciego · ${test.que}` },
        { min: 8, que: `LECTURA (español) · ProMIR Dermatología › cap. 1 › ${pmd.secciones} (${pmd.min}′ medidos · ${pmd.palabras} palabras · ${pmd.figs} figuras)`, como: 'Primero el apartado de cada pregunta que fallaste (2020-004 → §3 · 2011-225 → §1.2) · Whole Page Rule.', enlace: { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1 } },
        bbVideo(C, 69, x.fecha, 'capas de la piel (por título)'),
        { min: 0, que: 'PassMedicine (Library de Qbankly) › «Epidermis» — artículo corto (sin medir)', como: 'Léelo y escribe de memoria las 5 capas de la epidermis con 1 dato de cada una.', enlace: { t: 'PassMedicine · Epidermis', url: PASSMED(493) } },
        cierre(2, 'Dibuja la piel en capas (epidermis → UDE → dermis → hipodermis) de memoria.'),
      ], [
        { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1, min: pmd.min },
        { t: `B&B · ${C.bb(69).nombre}`, url: VIDEOS, min: C.bbMin(69, x.fecha).min },
        { t: 'PassMedicine · Epidermis', url: PASSMED(493) },
        { t: 'DermNet · The structure of normal skin (consulta)', url: `${DERMNET}/topics/the-structure-of-normal-skin` },
      ], `${t.nQ}Q ProMIR registradas + §1 y §3 leídas + vídeo B&B con free recall + dibujo de capas de memoria + ≤3 tarjetas.`,
      pendientes(C, x.casoIds), AVISO_B),
    };
  }

  // ── d4 · mié 4-nov (v6.05; v6.03: jue 29-oct; v6.02: mar 27-oct) · Fototipos I-VI + piel de color ──────────────────────────────────────────────────────────────────────────
  {
    const x = dia(4); const [c1, c2] = x.casoIds;
    const tk1 = C.cap(3609, '301535746');
    out[4] = {
      planA: B(4, `DERMA d4 · Fototipos I-VI + piel de color — plan A (AccessDerma)`, [
        anki(C, 4),
        caso(C, c1, 1, 2, 9, 'Caso de DERMATOPATOLOGÍA: capa afectada + patrón en ①.'), caso(C, c2, 2, 2, 9),
        { min: 2, que: 'IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Globules»', como: 'Tapa el título: describe los glóbulos (tamaño, color, distribución) antes de leer · registra ✓/✗ en ①b.' + DSC_RESPALDO, enlace: { t: 'Dermoscopedia · Globules', url: `${DSC}/Globules` } },
        pictorial(C, 4, 'antes de las opciones: ¿hiper o hipopigmentación?, ¿epidérmica (marrón) o dérmica (gris-azul)?, fototipo probable'),
        { min: 10, que: `LECTURA · Taylor and Kelly's Dermatology for Skin of Color 3e › Section 1 › ${tk1.t}`, como: 'Por encabezados: qué es «piel de color», cómo cambian el eritema y la pigmentación postinflamatoria en IV-VI · 3 ideas al cuaderno para SR-2 (L5, fototipos IV-VI). Longitud no medida (acceso caducado).', enlace: { t: tk1.t, url: tk1.url } },
        cierre(2),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'Pictorial Review 4e', url: C.url.pictorial, cantidad: '10Q' },
        { t: tk1.t, url: tk1.url },
        { t: 'DermNet · Skin phototype', url: `${DERMNET}/topics/skin-phototype` }, R_DSC,
      ], '2 casos registrados + 1 imagen + quiz de 10 terminado + 3 ideas para SR-2 + ≤3 tarjetas.',
      'Sin acceso a AccessDerma → PLAN B.'),
      planB: B(4, `DERMA d4 · Fototipos I-VI + piel de color — PLAN B (AccessDerma caducado)`, [
        anki(C, 4),
        bbVideo(C, 73, x.fecha),
        { min: DN_MIN(227, 6) + DN_MIN(438, 8), que: 'DermNet › «Skin phototype» (clasificación de Fitzpatrick, ≈230 palabras + 6 figuras) + «Postinflammatory hyperpigmentation» (≈440 palabras + 8 figuras)', como: 'Tabla fototipo I-VI → quema/broncea → cómo se ve el eritema y la PIH en cada uno.', enlace: { t: 'DermNet · Skin phototype', url: `${DERMNET}/topics/skin-phototype` } },
        { min: 5, que: 'Diferencial de hipopigmentación · DermNet «Pityriasis alba» (clinical features, 155 palabras + 4 figuras) + PassMedicine «Vitiligo» (Library de Qbankly, sin medir)', como: 'Tabla de 3 columnas: pitiriasis alba vs vitíligo vs pitiriasis versicolor (borde, escama, Wood).', enlace: { t: 'DermNet · Pityriasis alba', url: `${DERMNET}/topics/pityriasis-alba` } },
        { min: 2, que: 'IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Globules» (pública)', como: 'Describe antes de leer · registra ✓/✗ en ①b.' + DSC_RESPALDO, enlace: { t: 'Dermoscopedia · Globules', url: `${DSC}/Globules` } },
        proyecto(0, 'viñetas en fototipo IV-VI', 'Pídele 5 viñetas de tus libros en piel oscura SIN diagnóstico (eritema, PIH, melasma, queloide…); tú describes y diferencias (PIH vs melasma vs liquen plano pigmentoso · queloide vs cicatriz hipertrófica); que corrija citando libro y página. Puente con SR-2 (L5).'),
        cierre(2),
      ], [
        { t: `B&B · ${C.bb(73).nombre}`, url: VIDEOS, min: C.bbMin(73, x.fecha).min },
        { t: 'DermNet · Skin phototype', url: `${DERMNET}/topics/skin-phototype` },
        { t: 'DermNet · Postinflammatory hyperpigmentation', url: `${DERMNET}/topics/postinflammatory-hyperpigmentation` },
        { t: 'DermNet · Pityriasis alba', url: `${DERMNET}/topics/pityriasis-alba` },
        { t: 'PassMedicine · Vitiligo', url: PASSMED(1413) }, R_DSC,
        { t: 'Proyecto Claude · AESTHETIC DERMATOLOGY', url: AESTHETIC },
      ], 'Vídeo B&B con free recall + tabla de fototipos + tabla de hipopigmentaciones + 5 viñetas corregidas + ≤3 tarjetas.',
      pendientes(C, x.casoIds), AVISO_B),
    };
  }

  // ── d5 · vie 6-nov (v6.05; v6.03: lun 2-nov; v6.02: jue 29-oct) · Anatomía facial + DANGER ZONES ─────────────────────────────────────────────────────────────────────────
  {
    const x = dia(5); const [c1, c2] = x.casoIds;
    const ds1 = C.cap(2811, '245216992'), dsa2 = C.cap(2929, '245860434');
    out[5] = {
      planA: B(5, `DERMA d5 · Anatomía facial + DANGER ZONES — plan A (AccessDerma)`, [
        anki(C, 5),
        caso(C, c1, 1, 2, 9), caso(C, c2, 2, 2, 9),
        { min: 2, que: `IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopy Self-Assessment 2e › ${dsa2.t} → la 1.ª imagen`, como: 'Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b.', enlace: { t: dsa2.t, url: dsa2.url } },
        pictorial(C, 5, 'antes de las opciones: nombra la estructura/arteria o la subunidad estética de la imagen'),
        { min: 10, que: `LECTURA · Dermatologic Surgery › ${ds1.t}`, como: 'Solo los apartados de arterias faciales y zonas de riesgo · dibuja el mapa (a. facial → angular; supratroclear/supraorbitaria → oftálmica; dorsal nasal; rama frontal de la temporal superficial). Longitud no medida (acceso caducado).', enlace: { t: ds1.t, url: ds1.url } },
        cierre(2, 'Recita las 2 zonas de máximo riesgo (glabela, nariz) y por qué (ceguera por la a. oftálmica).'),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'Pictorial Review 4e', url: C.url.pictorial, cantidad: '10Q' },
        { t: ds1.t, url: ds1.url },
      ], '2 casos registrados + 1 imagen + quiz de 10 terminado + mapa arterial dibujado + ≤3 tarjetas.',
      'Sin acceso a AccessDerma → PLAN B.'),
      planB: B(5, `DERMA d5 · Anatomía facial + DANGER ZONES — PLAN B (AccessDerma caducado)`, [
        anki(C, 5),
        proyecto(20, 'tabla de arterias de riesgo', 'Pídele la tabla de arterias de riesgo (facial, angular, supratroclear, supraorbitaria, dorsal nasal, rama frontal de la temporal superficial): trayecto, plano/profundidad y qué produce su oclusión, con libro y página; después 8 preguntas de verificación que respondes sin mirar.'),
        { min: 5, que: 'PubMed · Cotofana S et al. «Vascular Safe Zones for Facial Soft Tissue Filler Injections» (Plast Aesthet Nurs 2022) — resumen', como: 'Lee el resumen y apunta qué zonas llama «seguras» y en qué plano.', enlace: { t: 'PubMed 36469395', url: 'https://pubmed.ncbi.nlm.nih.gov/36469395/' } },
        { min: DN_MIN(789, 1) + DN_MIN(343, 2) - 1, que: 'PMC (acceso abierto) · «A Consensus on Minimizing the Risk of Hyaluronic Acid Embolic Visual Loss…» (ASJ 2020) › «Question 3: Are There Areas of Increased Risk…» (789 palabras) + pies de las Figuras 1-2', como: 'Solo la Pregunta 3 y las figuras: qué zonas son de alto riesgo y por qué (anastomosis con la a. oftálmica) · es la lectura del d20, aquí solo la anatomía.', enlace: { t: 'PMC7427155', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/' } },
        { min: 0, que: 'MAPA DE MEMORIA', como: 'Dibuja la cara con las 6 arterias y las 2 zonas de máximo riesgo sin mirar; compáralo con la tabla del proyecto y corrige en rojo.' },
        cierre(2),
      ], [
        { t: 'Proyecto Claude · AESTHETIC DERMATOLOGY', url: AESTHETIC },
        { t: 'PubMed · Vascular Safe Zones (Cotofana 2022)', url: 'https://pubmed.ncbi.nlm.nih.gov/36469395/' },
        { t: 'PMC · Consenso de pérdida visual embólica (2020)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/' },
      ], 'Tabla de arterias corregida + 8 preguntas respondidas + mapa de memoria corregido + ≤3 tarjetas.',
      pendientes(C, x.casoIds), AVISO_B),
    };
  }
  return out;
}

module.exports = { PICTORIAL_TEMAS, PICTORIAL_ASIGNACION, curadas, AESTHETIC, QBANKS, VIDEOS, DERMNET, CME_DESPLAZADO, DERMNET_DERMOSCOPY };
