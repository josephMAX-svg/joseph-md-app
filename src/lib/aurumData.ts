/**
 * aurumData.ts — AURUM v2: el arte de convertir conversaciones en oro (closer de élite).
 * Programa de 6 meses (26 semanas, 130 lecciones L-V) montado dentro de Business → Pulso.
 *
 * v2 — roster AUDITADO + horario recalibrado. Compilado desde
 * DATA/AURUM/curricula/_curriculum_v2.json:
 *  · fases (7): objetivo + entregable + entregable_pitch reales, con libro ancla por fase.
 *  · biblioteca = SOLO recursos GRATIS de referentes con veredicto KEEP/FOUNDATION del
 *    roster, de los descubrimientos (top sellers reales y verificables) y de los libros con
 *    su audiolibro gratis. PROHIBIDO cualquier referente con veredicto DROP del roster v2
 *    + el referente de i11 (excluido por el usuario). Josué Peña entra SOLO con
 *    su canal gratis de YouTube.
 *  · cada recurso conserva su nivel de confianza ('verificado' | 'estable' | 'incierto').
 *
 * Horario v2: ventana fija 14:15-15:15 (Google Calendar). El NÚCLEO diario = ver + practicar
 * (suma 30-60 min). La lectura/audiolibro NO va en esa hora: va en los huecos de viaje/lectura.
 *
 * El motor día-a-día (pestaña ⚡ Hoy) son misiones generadas: src/lib/aurumDailyPlan.ts.
 */

export type AurumTipo = 'canal' | 'video' | 'playlist' | 'podcast' | 'articulo' | 'libro';
export type AurumIdioma = 'en' | 'es';
export type AurumConfianza = 'verificado' | 'estable' | 'incierto';

export type AurumMaterial = {
  nombre: string;
  referente: string;
  tipo: AurumTipo;
  url: string;
  idioma: AurumIdioma;
  confianza: AurumConfianza; // confianza del enlace (no inventado): verificado > estable > incierto
  porQue: string;
};

export type AurumFase = {
  id: string;
  fase: string;
  titulo: string;
  duracion: string;
  estado: 'activa' | 'pendiente' | 'meta';
  objetivo: string;
  entregable: string;
  libroAncla: string;        // libro de la fase (libros_por_fase)
  materiales: AurumMaterial[];
};

// ─── Meta ───
export const AURUM_META = {
  titulo: 'AURUM',
  subtitulo: 'El arte de convertir conversaciones en oro · closer de élite',
  tesis: 'Latín para "oro". Método de los REALES — los que vendieron/construyeron antes de enseñar: Hormozi (Grand Slam Offer, $100M Leads), Cardone (mentalidad 10X del operador), Voss (empatía táctica, "nunca dividas la diferencia"), Cialdini (los 7 principios de persuasión), Rackham/SPIN (preguntas que ganan el deal en ticket alto), Joe Girard (la Ley de los 250 y el seguimiento que genera referidos), Brian Tracy (psicología del vendedor), Jeb Blount (prospección fanática), Aaron Ross (pipeline predecible) + Josué Peña (closing por DM, solo su contenido GRATIS). Los 11 libros core con sus audiolibros gratis. 26 semanas · ventana 14:15-15:15 L-V · 30-60 min/día de núcleo (ver + practicar) + lectura en tus huecos de viaje — todo aplicado a ALLPA (terrenos) y Qori Golden.',
  accent: '#C9A227', // oro AURUM (paleta navy/oro del ecosistema, hermano de Qori Golden)
  nota: 'Motor ACTIVO (pestaña ⚡ Hoy): 26 semanas día a día (130 lecciones, L-V) en la ventana 14:15-15:15. Cada día: el VÍDEO exacto a ver (A) + un drill de práctica deliberada (PRAC) — núcleo de 30-60 min — y un bloque de LECTURA/audiolibro de la fase para tus huecos de viaje. Cada práctica deja un entregable: del manifiesto del closer y el PITCH v1, pasando por descubrimiento SPIN, Grand Slam Offers para ALLPA + Qori Golden, playbook de objeciones, cierre nivel Hormozi, hasta closing por DM y la presentación maestra integrada (PITCH v7). Progreso manual real (empieza 0%). Regenerar/extender: node DATA/_scripts/gen_aurum_plan.js.',
} as const;

// ─── Fases (7) — objetivo + entregable reales del currículo v2, con libro ancla ───
export const AURUM_FASES: AurumFase[] = [
  {
    id: 'f1', fase: 'F1', titulo: 'Mentalidad y juego interno del closer', duracion: 'sem 1-3',
    estado: 'activa',
    objetivo: 'Reencuadrar la venta como acto de servicio y construir el autoconcepto del top 20%: manejar rechazo, actividad medible y disciplina 10X. Entender que vender es mover a otros (Pink) y que la psicologia -no el producto- separa al elite (Tracy). Anclar la identidad de operador-vendedor real (Hormozi/Cardone), no de guru.',
    entregable: 'Manifiesto del closer AURUM (1 pagina): tu "por que" de venta de ALLPA y Qori Golden, tu definicion de exito 10X, tu ritual diario de actividad medida y un registro de objeciones internas + reencuadres. PITCH v1: presentacion de 60 seg ("quien soy y por que confiar en mi") grabada en video, con tonalidad de certeza.',
    libroAncla: 'To Sell Is Human — Daniel H. Pink',
    materiales: [
      { nombre: 'Alex Hormozi — Canal oficial de YouTube (ofertas, ventas, leads, escalado, todo gratis)', referente: 'Alex Hormozi', tipo: 'canal', url: 'https://www.youtube.com/@AlexHormozi', idioma: 'en', confianza: 'verificado', porQue: 'Fuente #1 gratis del operador-vendedor moderno: clips y videos largos sobre mentalidad, ventas y ofertas. Empieza por aqui.' },
      { nombre: 'Grant Cardone — YouTube (canal oficial, ventas, real estate y 10X gratis)', referente: 'Grant Cardone', tipo: 'canal', url: 'https://www.youtube.com/user/grantcardone/videos', idioma: 'en', confianza: 'verificado', porQue: 'La base de la mentalidad de accion masiva (10X) y de cierre. Operador real de bienes raices multifamiliar, no vendedor de cursos.' },
      { nombre: 'The 10X Rule (audiolibro gratis via biblioteca publica con OverDrive/Libby)', referente: 'Grant Cardone', tipo: 'libro', url: 'https://www.overdrive.com/media/5553495/the-10x-rule', idioma: 'en', confianza: 'verificado', porQue: 'El libro 10X en audiolibro legal y gratis con tu biblioteca (OverDrive/Libby). La mentalidad de objetivos y actividad masiva.' },
      { nombre: 'To Sell Is Human — audiolibro (prestamo gratis y legal, Archive.org)', referente: 'Daniel H. Pink', tipo: 'libro', url: 'https://archive.org/details/tosellishumansur0000pink_r0s8', idioma: 'en', confianza: 'verificado', porQue: 'Libro ancla de la fase: "1 de cada 9 vende formalmente, los otros 8 mueven a otros". El nuevo ABC (Attunement, Buoyancy, Clarity).' },
      { nombre: 'Resumen de "The Psychology of Selling" — HubSpot (gratis)', referente: 'Brian Tracy', tipo: 'articulo', url: 'https://blog.hubspot.com/sales/the-psychology-of-selling', idioma: 'en', confianza: 'verificado', porQue: 'Captura la idea de Tracy de que la psicologia del vendedor (autoconcepto, manejo del rechazo) separa al elite del promedio.' },
    ],
  },
  {
    id: 'f2', fase: 'F2', titulo: 'Comunicacion, tonalidad y rapport', duracion: 'sem 4-7',
    estado: 'pendiente',
    objetivo: 'Dominar el COMO se dice: tonalidad de voz, ritmo, empatia tactica y construccion de relacion a escala (la Ley de los 250 de Girard, el sistema de seguimiento que genera referidos). Voz que transmite certeza sin presion; espejo, etiquetado y el "Thats right". Construir la maquina de rapport de un vendedor directo de elite.',
    entregable: 'Sistema de seguimiento y rapport propio: plantilla de notas de cliente (estilo Girard), guion de apertura calida para terrenos y para cachorros Qori Golden, y banco de 10 "labels" (etiquetas de empatia tactica). PITCH v2: apertura de 2 min en video aplicando tonalidad + 1 etiqueta + 1 mirror, sin sonar necesitado.',
    libroAncla: 'The Psychology of Selling — Brian Tracy',
    materiales: [
      { nombre: 'Chris Voss & The Black Swan Group — Canal oficial (negociacion y empatia tactica gratis)', referente: 'Chris Voss / The Black Swan Group', tipo: 'canal', url: 'https://www.youtube.com/channel/UCk7jHqdlFFDBhC1QIFqi54w', idioma: 'en', confianza: 'verificado', porQue: 'Empatia tactica aplicada: mirroring, labeling y el "Thats right". El motor del rapport sin presion.' },
      { nombre: 'Joe Girard — Automotive Hall of Fame (perfil oficial y record verificado)', referente: 'Joe Girard', tipo: 'articulo', url: 'https://automotivehalloffame.org/honoree/joe-girard/', idioma: 'en', confianza: 'verificado', porQue: 'El vendedor #1 del mundo (Guinness): la Ley de los 250 y el seguimiento obsesivo que convierte cada cliente en referidos.' },
      { nombre: 'The Psychology of Selling (audiolibro completo en YouTube)', referente: 'Brian Tracy', tipo: 'libro', url: 'https://www.youtube.com/watch?v=i0B4v-9fLQc', idioma: 'en', confianza: 'estable', porQue: 'Libro ancla de la fase: psicologia del vendedor, ciclo de la venta y como sonar como autoridad de confianza.' },
      { nombre: 'Canal de YouTube de Brian Tracy (videos de ventas gratuitos)', referente: 'Brian Tracy', tipo: 'canal', url: 'https://www.youtube.com/@BrianTracyOfficial', idioma: 'en', confianza: 'estable', porQue: 'Clips cortos sobre comunicacion, cierre y psicologia del vendedor; util para drillear un concepto por sesion.' },
      { nombre: 'Win Workplace Negotiations with Chris Voss | Sessions by MasterClass', referente: 'Chris Voss', tipo: 'video', url: 'https://www.youtube.com/watch?v=2gBboDdtTlc', idioma: 'en', confianza: 'incierto', porQue: 'Sesion concreta de Voss sobre tonalidad y empatia tactica. Si el ID falla, navega su canal oficial del Black Swan Group.' },
    ],
  },
  {
    id: 'f3', fase: 'F3', titulo: 'Descubrimiento y preguntas (venta consultiva)', duracion: 'sem 8-11',
    estado: 'pendiente',
    objetivo: 'Dejar de presentar y empezar a preguntar. Dominar la secuencia SPIN (Situacion-Problema-Implicacion-Necesidad/beneficio) -las preguntas de Implicacion como mayor predictor de cierre en ticket alto- y las preguntas calibradas de Voss. En ticket alto, presionar el cierre destruye la venta: el prospecto se cierra a si mismo respondiendo bien las preguntas.',
    entregable: 'Guion de descubrimiento SPIN completo para venta de terreno ALLPA (4-6 preguntas por cada letra S-P-I-N) + 5 preguntas calibradas ("¿Como se supone que haga eso?"). PITCH v3: simulacro de descubrimiento de 5 min en video donde el prospecto verbaliza el problema y la implicacion -tu hablas <40% del tiempo.',
    libroAncla: 'SPIN Selling — Neil Rackham',
    materiales: [
      { nombre: 'SPIN Selling — audiolibro (prestamo gratis y legal, Archive.org)', referente: 'Neil Rackham', tipo: 'libro', url: 'https://archive.org/details/spinselling0000rack', idioma: 'en', confianza: 'verificado', porQue: 'Libro ancla de la fase: el estudio empirico (35.000 llamadas) detras de las preguntas S-P-I-N para venta consultiva de ticket alto.' },
      { nombre: 'The SPIN Methodology (explicacion oficial del marco S-P-I-N)', referente: 'Neil Rackham / Huthwaite International', tipo: 'articulo', url: 'https://www.huthwaiteinternational.com/spin-methodology', idioma: 'en', confianza: 'estable', porQue: 'Fuente oficial de Huthwaite (la empresa de Rackham): definicion autoritativa de las 4 familias de preguntas. Para tener el esqueleto por escrito.' },
      { nombre: 'How should sellers apply SPIN Selling questions — Neil Rackham', referente: 'Neil Rackham / Huthwaite International', tipo: 'video', url: 'https://www.youtube.com/watch?v=9IXcrP46BDk', idioma: 'en', confianza: 'incierto', porQue: 'El propio Rackham explica como aplicar las preguntas. Si el ID falla, busca el titulo en el canal de Huthwaite International.' },
      { nombre: 'The Architect of SPIN — interview with Neil Rackham', referente: 'Neil Rackham / Huthwaite International', tipo: 'video', url: 'https://www.youtube.com/watch?v=rgp6f04Bw3E', idioma: 'en', confianza: 'incierto', porQue: 'Entrevista al autor sobre el origen del metodo. ID no verificado al 100%; navega el canal de Huthwaite si no carga.' },
      { nombre: 'Chris Voss & The Black Swan Group — preguntas calibradas (canal oficial)', referente: 'Chris Voss', tipo: 'canal', url: 'https://www.youtube.com/channel/UCk7jHqdlFFDBhC1QIFqi54w', idioma: 'en', confianza: 'verificado', porQue: 'Las preguntas calibradas ("¿Como?" / "¿Que?") que hacen que el prospecto resuelva tu problema por ti. Complemento perfecto de SPIN.' },
    ],
  },
  {
    id: 'f4', fase: 'F4', titulo: 'Oferta y valor (Grand Slam Offer)', duracion: 'sem 12-15',
    estado: 'pendiente',
    objetivo: 'Construir ofertas tan buenas que decir no se sienta estupido. Dominar la Ecuacion de Valor de Hormozi (Sueno × Probabilidad / Tiempo × Esfuerzo), value stacking, bonos, garantias, escasez y urgencia -y por que decimos "si" (los 7 principios de Cialdini). Pasar de vender un commodity con precio a una oferta donde el valor percibido aplasta el precio.',
    entregable: 'Grand Slam Offer escrita para ALLPA (terreno Matahuacta) y para un cachorro Qori Golden con pedigree: dream outcome, lista de obstaculos resueltos, stack de bonos, garantia, escasez/urgencia real y anclaje de precio. PITCH v4: presentacion de oferta de 6-8 min en video con stack de valor y al menos 3 principios de Cialdini aplicados.',
    libroAncla: '$100M Offers — Alex Hormozi',
    materiales: [
      { nombre: '$100M Offers + $100M Leads — Audiolibros GRATIS (sitio oficial)', referente: 'Alex Hormozi / Acquisition.com', tipo: 'libro', url: 'https://www.acquisition.com/audiobooks', idioma: 'en', confianza: 'verificado', porQue: 'Libro ancla de la fase: la Ecuacion de Valor, el Grand Slam Offer, bonos, garantias y escasez. Gratis y legal en su sitio oficial.' },
      { nombre: '$100M Offers (audiolibro completo en YouTube, uso educativo)', referente: 'Alex Hormozi', tipo: 'libro', url: 'https://www.youtube.com/watch?v=buKC5g5uK9c', idioma: 'en', confianza: 'estable', porQue: 'El audiolibro entero en YouTube para escuchar en huecos. Si prefieres el oficial, usa acquisition.com/audiobooks.' },
      { nombre: 'Science of Persuasion (animado oficial, narrado por Cialdini y Steve Martin)', referente: 'Robert Cialdini / Influence At Work', tipo: 'video', url: 'https://www.youtube.com/watch?v=cFdCzN7RYbw', idioma: 'en', confianza: 'verificado', porQue: 'Los 7 principios (reciprocidad, compromiso, prueba social, autoridad, simpatia, escasez, unidad) explicados por el propio Cialdini en 11 min.' },
      { nombre: 'Harnessing the Science of Persuasion (Cialdini en Harvard Business Review)', referente: 'Robert Cialdini / HBR', tipo: 'articulo', url: 'https://hbr.org/2001/10/harnessing-the-science-of-persuasion', idioma: 'en', confianza: 'verificado', porQue: 'Articulo fundacional de Cialdini en HBR: como aplicar los principios de influencia de forma etica en negociacion y venta.' },
      { nombre: 'Alex Hormozi — Canal oficial (busca "value equation" y "grand slam offer")', referente: 'Alex Hormozi', tipo: 'canal', url: 'https://www.youtube.com/@AlexHormozi', idioma: 'en', confianza: 'verificado', porQue: 'Cientos de clips donde desglosa la Ecuacion de Valor y como construir ofertas irresistibles paso a paso.' },
    ],
  },
  {
    id: 'f5', fase: 'F5', titulo: 'Manejo de objeciones', duracion: 'sem 16-19',
    estado: 'pendiente',
    objetivo: 'Convertir el "no" en informacion, no en rechazo. Dominar las objeciones de precio, confianza y timing: el "No" calibrado de Voss como apertura, el audit de objeciones de Hormozi, el manejo de prospeccion de Blount y la mecanica de cierre de Tracy/Hopkins. Anticipar y desactivar las objeciones reales del comprador-a-distancia de terrenos ("¿es real?", "¿y los papeles?", "lo voy a pensar").',
    entregable: 'Playbook de objeciones ALLPA + Qori Golden: las 12 objeciones mas frecuentes, con respuesta calibrada (empatia tactica + reencuadre + prueba), guion para "lo voy a pensar" y para "esta caro". PITCH v5: simulacro grabado de 8-10 min donde enfrentas 3 objeciones en vivo y reencuadras sin presionar ni discutir.',
    libroAncla: 'Never Split the Difference — Chris Voss',
    materiales: [
      { nombre: 'Never Split the Difference — audiolibro (Random House, gratis)', referente: 'Chris Voss', tipo: 'libro', url: 'https://soundcloud.com/random-house-audiobooks/never-split-the-difference-by-chris-voss-and-tahl-raz', idioma: 'en', confianza: 'verificado', porQue: 'Libro ancla de la fase: el "No" como apertura, etiquetado de objeciones, preguntas calibradas y el modelo Ackerman. Negociacion del ex-FBI.' },
      { nombre: 'The Black Swan Group — recursos sobre Never Split the Difference', referente: 'Chris Voss', tipo: 'articulo', url: 'https://www.blackswanltd.com/never-split-the-difference', idioma: 'en', confianza: 'verificado', porQue: 'Guias y hojas de trabajo oficiales para aplicar empatia tactica al manejo de objeciones reales (precio, confianza, timing).' },
      { nombre: 'Alex Hormozi — Canal oficial (busca "objections")', referente: 'Alex Hormozi', tipo: 'canal', url: 'https://www.youtube.com/@AlexHormozi', idioma: 'en', confianza: 'verificado', porQue: 'El audit de objeciones de Hormozi: precio, tiempo y "¿funcionara para mi?". Clips directos para drillear una objecion por sesion.' },
      { nombre: 'Sales Gravy Podcast — Jeb Blount (cientos de episodios gratis)', referente: 'Jeb Blount', tipo: 'podcast', url: 'https://podcasts.apple.com/is/podcast/sales-gravy-jeb-blount/id219558725', idioma: 'en', confianza: 'verificado', porQue: 'Prospeccion fanatica y manejo de objeciones en frio. Audio ideal para tus huecos: una tactica accionable por episodio.' },
      { nombre: 'Chris Voss & The Black Swan Group — Canal oficial de YouTube', referente: 'Chris Voss', tipo: 'canal', url: 'https://www.youtube.com/channel/UCk7jHqdlFFDBhC1QIFqi54w', idioma: 'en', confianza: 'verificado', porQue: 'Role-plays y desgloses de objeciones reales sin manipular: que el prospecto se sienta seguro de decir la verdad.' },
    ],
  },
  {
    id: 'f6', fase: 'F6', titulo: 'Cierre high-ticket', duracion: 'sem 20-23',
    estado: 'pendiente',
    objetivo: 'Cerrar deals de alto valor sin presion: tomar control de la conversacion (Challenger: teach-tailor-take control), pitch de status y frame control (Klaff), el modelo Ackerman de negociacion de precio (Voss) y las tecnicas de cierre de Hopkins/Tracy. Cerrar un terreno o un cachorro premium con un si natural -el climax del programa: pitch nivel Hormozi.',
    entregable: 'Guion de cierre maestro high-ticket: 3 tecnicas de cierre + negociacion de precio Ackerman (3 contraofertas calibradas) + "take-away" etico. PITCH v6 (NIVEL HORMOZI): pitch de cierre completo de 10-12 min, de la apertura al si, integrando oferta + objeciones + cierre, grabado y auto-evaluado contra rubrica.',
    libroAncla: 'The Challenger Sale — Dixon & Adamson',
    materiales: [
      { nombre: 'Pitch Anything (audiolibro en YouTube) — frame control y status', referente: 'Oren Klaff', tipo: 'libro', url: 'https://www.youtube.com/watch?v=BJ9ZRwUjAkM', idioma: 'en', confianza: 'incierto', porQue: 'Frame control, status y el metodo STRONG para presentar y ganar el deal. ID en YouTube no verificado al 100%; confirma que carga.' },
      { nombre: 'Chris Voss & The Black Swan Group — modelo Ackerman (canal oficial)', referente: 'Chris Voss', tipo: 'canal', url: 'https://www.youtube.com/channel/UCk7jHqdlFFDBhC1QIFqi54w', idioma: 'en', confianza: 'verificado', porQue: 'La mecanica Ackerman de negociacion de precio (65-85-95-100% + items no monetarios) para cerrar el numero sin regalar valor.' },
      { nombre: 'Alex Hormozi — Canal oficial (busca "closing" y "CLOSER")', referente: 'Alex Hormozi', tipo: 'canal', url: 'https://www.youtube.com/@AlexHormozi', idioma: 'en', confianza: 'verificado', porQue: 'El framework CLOSER y como integrar oferta + objeciones + cierre en una sola llamada. La referencia para tu PITCH v6 nivel Hormozi.' },
      { nombre: 'The Psychology of Selling (audiolibro) — tecnicas de cierre de Tracy', referente: 'Brian Tracy', tipo: 'libro', url: 'https://www.youtube.com/watch?v=i0B4v-9fLQc', idioma: 'en', confianza: 'estable', porQue: 'Las tecnicas de cierre concretas de Tracy/Hopkins (cierre por alternativa, cierre asumido) para tener un arsenal de remates naturales.' },
      { nombre: 'Grant Cardone — YouTube (cierre y seguimiento)', referente: 'Grant Cardone', tipo: 'canal', url: 'https://www.youtube.com/user/grantcardone/videos', idioma: 'en', confianza: 'verificado', porQue: 'Secuencia de cierre y la insistencia respetuosa (sin rendirse al primer "lo pensare"). Util para energia y para guiones de remate.' },
    ],
  },
  {
    id: 'f7', fase: 'F7', titulo: 'Ventas digitales e integracion', duracion: 'sem 24-26',
    estado: 'meta',
    objetivo: 'Llevar el cierre al mundo digital y construir la maquina de pipeline: closing por DM y prospeccion digital (Josue Pena, contenido gratis), generacion de leads (Hormozi $100M Leads: warm/cold outreach, contenido, ads), proceso outbound y especializacion de roles (Aaron Ross / Mark Roberge / Trish Bertuzzi) y prospeccion fanatica (Blount). Integrar las 6 fases en un sistema de venta repetible para ALLPA y Qori Golden.',
    entregable: 'Maquina de ventas AURUM: funnel de adquisicion (CORE4 de Hormozi adaptado a terrenos), guion de closing por DM, calendario de prospeccion semanal y dashboard de actividad/ratios. PITCH v7 (FINAL): pitch de venta digital -mensaje de voz/video de 90 seg para cerrar por DM- + presentacion maestra integrada de 12-15 min ante camara, lista para usar con leads reales.',
    libroAncla: '$100M Leads — Alex Hormozi',
    materiales: [
      { nombre: '$100M Leads — audiolibro completo GRATIS (sitio oficial)', referente: 'Alex Hormozi / Acquisition.com', tipo: 'libro', url: 'https://www.acquisition.com/audiobooks', idioma: 'en', confianza: 'verificado', porQue: 'Libro ancla de la fase: el CORE4 (warm/cold outreach, contenido, ads), lead magnets y la Rule of 100 para llenar tu pipeline.' },
      { nombre: 'Josue Pena (soyjosuepena) — Canal oficial de YouTube (SOLO contenido gratis)', referente: 'Josue Pena', tipo: 'canal', url: 'https://www.youtube.com/@soyjosuepena', idioma: 'es', confianza: 'estable', porQue: 'Closing por DM y prospeccion digital en espanol. Usa SOLO su contenido abierto de YouTube; ignora el upsell a su academia de pago.' },
      { nombre: 'Predictable Revenue — blog y recursos gratuitos (outbound/SDR)', referente: 'Aaron Ross', tipo: 'articulo', url: 'https://predictablerevenue.com/about/', idioma: 'en', confianza: 'verificado', porQue: 'El metodo Cold Calling 2.0 que llevo a Salesforce a 100M+ USD: proceso outbound y especializacion de roles para un pipeline predecible.' },
      { nombre: 'Commoncog — How Mark Roberge Built HubSpot\'s Sales Engine (caso gratuito)', referente: 'Mark Roberge', tipo: 'articulo', url: 'https://www.goodreads.com/book/show/22551047-the-sales-acceleration-formula', idioma: 'en', confianza: 'verificado', porQue: 'Como construir una maquina de ventas medible y escalable (contratacion, metricas, proceso). El playbook del CRO que escalo HubSpot.' },
      { nombre: 'Sales Gravy Podcast — Jeb Blount (prospeccion fanatica)', referente: 'Jeb Blount', tipo: 'podcast', url: 'https://podcasts.apple.com/is/podcast/sales-gravy-jeb-blount/id219558725', idioma: 'en', confianza: 'verificado', porQue: 'La disciplina de prospeccion diaria que alimenta el pipeline. Audio para tus huecos mientras integras el sistema completo.' },
    ],
  },
];

// ─── Biblioteca — SOLO recursos GRATIS de referentes KEEP/FOUNDATION + descubrimientos + 11 libros ───
// Agrupados por tipo. Confianza del enlace (no inventado): verificado > estable > incierto.
export const AURUM_BIBLIOTECA: { categoria: string; icon: string; items: AurumMaterial[] }[] = [
  { categoria: 'Canales de los referentes', icon: '🎬', items: [
    { nombre: 'Alex Hormozi — Canal oficial de YouTube', referente: 'Alex Hormozi', tipo: 'canal', url: 'https://www.youtube.com/@AlexHormozi', idioma: 'en', confianza: 'verificado', porQue: 'Operador real (Gym Launch, Acquisition.com 250M+/ano). Fuente #1 gratis sobre ofertas, ventas, leads y escalado.' },
    { nombre: 'Alex Hormozi en Espanol (contenido doblado/subtitulado)', referente: 'Alex Hormozi', tipo: 'canal', url: 'https://www.youtube.com/channel/UCgorjMy3g2iXL0HYzufMOJQ', idioma: 'es', confianza: 'incierto', porQue: 'Su contenido en castellano para quien prefiere el idioma. Canal de re-subidas: verifica que siga activo.' },
    { nombre: 'Grant Cardone — YouTube (canal oficial)', referente: 'Grant Cardone', tipo: 'canal', url: 'https://www.youtube.com/user/grantcardone/videos', idioma: 'en', confianza: 'verificado', porQue: 'Mentalidad 10X, cierre, seguimiento y real estate. Operador de bienes raices multifamiliar, no vendedor de cursos.' },
    { nombre: 'Chris Voss & The Black Swan Group — Canal oficial', referente: 'Chris Voss / The Black Swan Group', tipo: 'canal', url: 'https://www.youtube.com/channel/UCk7jHqdlFFDBhC1QIFqi54w', idioma: 'en', confianza: 'verificado', porQue: 'Empatia tactica del ex-FBI: mirroring, labeling, preguntas calibradas y el modelo Ackerman. Base del rapport y las objeciones.' },
    { nombre: 'Team Cialdini / Influence At Work — Canal oficial', referente: 'Robert Cialdini', tipo: 'canal', url: 'https://www.youtube.com/influenceatwork', idioma: 'en', confianza: 'verificado', porQue: 'Canal oficial de Cialdini: clips donde el mismo explica los 7 principios de persuasion etica. Fuente primaria, evita resumenes de terceros.' },
    { nombre: 'Canal de YouTube de Brian Tracy', referente: 'Brian Tracy', tipo: 'canal', url: 'https://www.youtube.com/@BrianTracyOfficial', idioma: 'en', confianza: 'estable', porQue: 'Psicologia del vendedor, ciclo de la venta, cierre y manejo del tiempo. Clips cortos perfectos para drillear un concepto.' },
    { nombre: 'Josue Pena (soyjosuepena) — Canal oficial (SOLO contenido gratis)', referente: 'Josue Pena', tipo: 'canal', url: 'https://www.youtube.com/@soyjosuepena', idioma: 'es', confianza: 'estable', porQue: 'Closing por DM y prospeccion digital en espanol. Usa SOLO su contenido abierto; ignora el upsell a su academia de pago.' },
  ] },
  { categoria: 'Vídeos y conferencias', icon: '🎞️', items: [
    { nombre: 'Science of Persuasion (animado oficial, narrado por Cialdini y Steve Martin)', referente: 'Robert Cialdini / Influence At Work', tipo: 'video', url: 'https://www.youtube.com/watch?v=cFdCzN7RYbw', idioma: 'en', confianza: 'verificado', porQue: 'Los 7 principios en 11 min, explicados por el propio Cialdini. El video fundacional para entender por que decimos "si".' },
    { nombre: 'Win Workplace Negotiations with Chris Voss | Sessions by MasterClass', referente: 'Chris Voss', tipo: 'video', url: 'https://www.youtube.com/watch?v=2gBboDdtTlc', idioma: 'en', confianza: 'incierto', porQue: 'Sesion de Voss sobre tonalidad y empatia tactica. Si el ID falla, navega su canal del Black Swan Group.' },
    { nombre: 'The Architect of SPIN — interview with Neil Rackham', referente: 'Neil Rackham / Huthwaite International', tipo: 'video', url: 'https://www.youtube.com/watch?v=rgp6f04Bw3E', idioma: 'en', confianza: 'incierto', porQue: 'El autor de SPIN sobre el origen del metodo. ID no verificado al 100%; navega el canal de Huthwaite si no carga.' },
    { nombre: 'Is SPIN Selling still relevant? Interview with Neil Rackham', referente: 'Neil Rackham / Huthwaite International', tipo: 'video', url: 'https://www.youtube.com/watch?v=1UlDa-OJYxE', idioma: 'en', confianza: 'incierto', porQue: 'Rackham reflexiona sobre la vigencia de SPIN hoy. ID no verificado; busca el titulo en el canal de Huthwaite.' },
    { nombre: 'How should sellers apply SPIN Selling questions — Neil Rackham', referente: 'Neil Rackham / Huthwaite International', tipo: 'video', url: 'https://www.youtube.com/watch?v=9IXcrP46BDk', idioma: 'en', confianza: 'incierto', porQue: 'El autor explica como aplicar las preguntas S-P-I-N en una llamada real. ID no verificado al 100%.' },
  ] },
  { categoria: 'Playlists temáticas', icon: '🎵', items: [
    { nombre: 'Alex Hormozi: Most Popular Videos (recopilatorio de ventas y ofertas)', referente: 'Alex Hormozi', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PLuvjGvhl6aW_9Pf2Q4p04e2vrwEAGMU44', idioma: 'en', confianza: 'incierto', porQue: 'Sus videos mas vistos sobre ventas y ofertas en una sola lista. Playlist agregada: puede reordenarse, verifica antes de usar.' },
    { nombre: "Chris Voss' Favorite Negotiation Hacks (playlist)", referente: 'Chris Voss / The Black Swan Group', tipo: 'playlist', url: 'https://www.youtube.com/playlist?list=PL_3ZK0x5nFYBNLNoUnm0FxZCUyqPmXccf', idioma: 'en', confianza: 'incierto', porQue: 'Trucos de negociacion de Voss agrupados. Util para drills tematicos (una tecnica por dia). Confirma que la playlist siga publica.' },
  ] },
  { categoria: 'Podcasts (para tus huecos)', icon: '🎧', items: [
    { nombre: 'The Game w/ Alex Hormozi — incluye el audiolibro $100M Leads por capitulos', referente: 'Alex Hormozi / Acquisition.com', tipo: 'podcast', url: 'https://www.acquisition.com/podcast', idioma: 'en', confianza: 'verificado', porQue: 'Podcast oficial gratis; el audiolibro completo de $100M Leads esta publicado por episodios. Oro para el pipeline y el follow-up.' },
    { nombre: 'Robert Cialdini: The Principles of Persuasion (The Knowledge Project #122)', referente: 'Robert Cialdini / Farnam Street', tipo: 'podcast', url: 'https://fs.blog/knowledge-project-podcast/robert-cialdini/', idioma: 'en', confianza: 'verificado', porQue: 'Entrevista larga donde Cialdini recorre los 7 principios con ejemplos. Audio ideal para un viaje.' },
    { nombre: 'Sales Gravy Podcast — Jeb Blount (prospeccion fanatica)', referente: 'Jeb Blount', tipo: 'podcast', url: 'https://podcasts.apple.com/is/podcast/sales-gravy-jeb-blount/id219558725', idioma: 'en', confianza: 'verificado', porQue: 'Cientos de episodios gratis sobre prospeccion y objeciones. Una tactica accionable por episodio para tus huecos.' },
    { nombre: 'AFP Conversations — Chris Voss (ex-FBI) sobre negociacion', referente: 'Chris Voss', tipo: 'podcast', url: 'https://www.blackswanltd.com/', idioma: 'en', confianza: 'verificado', porQue: 'Voss explica por que nunca dividir la diferencia y como aplicar empatia tactica fuera del cuarto de rehenes.' },
  ] },
  { categoria: 'Artículos y guías', icon: '📄', items: [
    { nombre: 'The SPIN Methodology (explicacion oficial S-P-I-N)', referente: 'Neil Rackham / Huthwaite International', tipo: 'articulo', url: 'https://www.huthwaiteinternational.com/spin-methodology', idioma: 'en', confianza: 'estable', porQue: 'Fuente oficial de la empresa de Rackham: definicion autoritativa de las 4 familias de preguntas.' },
    { nombre: 'Harnessing the Science of Persuasion (Cialdini en HBR)', referente: 'Robert Cialdini / Harvard Business Review', tipo: 'articulo', url: 'https://hbr.org/2001/10/harnessing-the-science-of-persuasion', idioma: 'en', confianza: 'verificado', porQue: 'Articulo fundacional de Cialdini en HBR: aplicar los principios de influencia de forma etica en negociacion y venta.' },
    { nombre: 'Resumen de "The Psychology of Selling" — HubSpot', referente: 'Brian Tracy', tipo: 'articulo', url: 'https://blog.hubspot.com/sales/the-psychology-of-selling', idioma: 'en', confianza: 'verificado', porQue: 'Resumen claro de las ideas de Tracy sobre autoconcepto, manejo del rechazo y el ciclo de la venta.' },
    { nombre: 'The Black Swan Group — recursos sobre Never Split the Difference', referente: 'Chris Voss', tipo: 'articulo', url: 'https://www.blackswanltd.com/never-split-the-difference', idioma: 'en', confianza: 'verificado', porQue: 'Guias y hojas de trabajo oficiales para aplicar empatia tactica al manejo de objeciones reales.' },
    { nombre: 'Joe Girard — Automotive Hall of Fame (perfil oficial y record verificado)', referente: 'Joe Girard', tipo: 'articulo', url: 'https://automotivehalloffame.org/honoree/joe-girard/', idioma: 'en', confianza: 'verificado', porQue: 'El vendedor #1 del mundo (Guinness, 13.001 autos): la Ley de los 250 y el seguimiento que genera referidos.' },
    { nombre: 'Commoncog — How Mark Roberge Built HubSpot\'s Sales Engine', referente: 'Mark Roberge', tipo: 'articulo', url: 'https://www.goodreads.com/book/show/22551047-the-sales-acceleration-formula', idioma: 'en', confianza: 'verificado', porQue: 'Caso detallado de como construir una maquina de ventas medible: contratacion, metricas y proceso.' },
    { nombre: 'Predictable Revenue — blog y recursos (outbound/SDR)', referente: 'Aaron Ross', tipo: 'articulo', url: 'https://predictablerevenue.com/about/', idioma: 'en', confianza: 'verificado', porQue: 'El metodo Cold Calling 2.0 que escalo Salesforce: proceso outbound y especializacion de roles para un pipeline predecible.' },
    { nombre: 'How Mary Kay Built a Billion-Dollar Empire — Texas Monthly', referente: 'Mary Kay Ash', tipo: 'articulo', url: 'https://www.texasmonthly.com/culture/selling-opportunity-book-mary-kay-empire/', idioma: 'en', confianza: 'verificado', porQue: 'La "Reina de las Ventas": modelo de venta directa, reconocimiento y construccion de una fuerza de ventas leal.' },
    { nombre: 'The story of Zig Ziglar, the quintessential American salesman — The Quota', referente: 'Zig Ziglar', tipo: 'articulo', url: 'https://www.thequota.co/articles/the-story-of-zig-ziglar-the-quintessential-american-salesman', idioma: 'en', confianza: 'estable', porQue: 'Del puerta-a-puerta al #1 nacional: actitud, servicio y la idea de que ayudas a otros a conseguir lo que quieren.' },
  ] },
  { categoria: 'Libros (audiolibro gratis)', icon: '📚', items: [
    { nombre: '$100M Offers — Alex Hormozi (audiolibro gratis, sitio oficial)', referente: 'Alex Hormozi', tipo: 'libro', url: 'https://www.acquisition.com/audiobooks', idioma: 'en', confianza: 'verificado', porQue: 'F4 · Ecuacion de Valor, Grand Slam Offer, bonos, garantias, escasez. El manual definitivo de construccion de ofertas, gratis y legal.' },
    { nombre: '$100M Leads — Alex Hormozi (audiolibro gratis, sitio oficial)', referente: 'Alex Hormozi', tipo: 'libro', url: 'https://www.acquisition.com/audiobooks', idioma: 'en', confianza: 'verificado', porQue: 'F7 · CORE4 (outreach, contenido, ads), lead magnets y la Rule of 100. La biblia para llenar tu pipeline.' },
    { nombre: 'Never Split the Difference — Chris Voss (audiolibro Random House, gratis)', referente: 'Chris Voss', tipo: 'libro', url: 'https://soundcloud.com/random-house-audiobooks/never-split-the-difference-by-chris-voss-and-tahl-raz', idioma: 'en', confianza: 'verificado', porQue: 'F5 · El "No" como apertura, etiquetado, preguntas calibradas y el modelo Ackerman. Negociacion del ex-FBI.' },
    { nombre: 'Influence: The Psychology of Persuasion — Robert Cialdini (audiolibro, Archive.org)', referente: 'Robert Cialdini', tipo: 'libro', url: 'https://archive.org/details/BobSommersRobertCialdini-Influence_thePsychologyofPersuasion', idioma: 'en', confianza: 'verificado', porQue: 'F4 · Los 7 principios de persuasion etica (reciprocidad, prueba social, autoridad, escasez, unidad...). Lectura legal y gratis.' },
    { nombre: 'Pre-Suasion — Robert Cialdini (audiolibro, Archive.org)', referente: 'Robert Cialdini', tipo: 'libro', url: 'https://archive.org/details/presuasionrevolu0000cial', idioma: 'en', confianza: 'verificado', porQue: 'El momento PREVIO a la persuasion: como el encuadre y el timing cambian la respuesta antes de pedir nada.' },
    { nombre: 'SPIN Selling — Neil Rackham (audiolibro, Archive.org)', referente: 'Neil Rackham', tipo: 'libro', url: 'https://archive.org/details/spinselling0000rack', idioma: 'en', confianza: 'verificado', porQue: 'F3 · El estudio empirico (35.000 llamadas) detras de las preguntas S-P-I-N para venta consultiva de ticket alto.' },
    { nombre: 'To Sell Is Human — Daniel H. Pink (audiolibro, Archive.org)', referente: 'Daniel H. Pink', tipo: 'libro', url: 'https://archive.org/details/tosellishumansur0000pink_r0s8', idioma: 'en', confianza: 'verificado', porQue: 'F1 · "Todos estamos en ventas": el nuevo ABC (Attunement, Buoyancy, Clarity) y la mentalidad de mover a otros.' },
    { nombre: 'The Psychology of Selling — Brian Tracy (audiolibro en YouTube)', referente: 'Brian Tracy', tipo: 'libro', url: 'https://www.youtube.com/watch?v=i0B4v-9fLQc', idioma: 'en', confianza: 'estable', porQue: 'F2 · Psicologia del vendedor: autoconcepto, manejo del rechazo, ciclo de la venta y tecnicas de cierre.' },
    { nombre: 'Pitch Anything — Oren Klaff (audiolibro en YouTube)', referente: 'Oren Klaff', tipo: 'libro', url: 'https://www.youtube.com/watch?v=BJ9ZRwUjAkM', idioma: 'en', confianza: 'incierto', porQue: 'F6 · Frame control, status y el metodo STRONG para presentar y ganar el deal. ID en YouTube no verificado al 100%.' },
    { nombre: 'The Challenger Sale — Dixon & Adamson (audiolibro, Everand)', referente: 'Matthew Dixon y Brent Adamson', tipo: 'libro', url: 'https://www.everand.com/audiobook/769309848/The-Challenger-Sale-Taking-Control-of-the-Customer-Conversation', idioma: 'en', confianza: 'incierto', porQue: 'F6 · Teach-Tailor-Take Control: por que los Challengers ganan en venta B2B compleja. Everand puede requerir prueba/login: verifica.' },
    { nombre: 'Way of the Wolf — Jordan Belfort (audiolibro/resumen en YouTube)', referente: 'Jordan Belfort', tipo: 'libro', url: 'https://www.youtube.com/results?search_query=way+of+the+wolf+jordan+belfort+audiobook', idioma: 'en', confianza: 'incierto', porQue: 'F2 · Sistema de TONALIDAD (los 3 dieces) y lenguaje no verbal — oro para la comunicacion. ⚠ Belfort vendio a escala REAL pero via FRAUDE (Stratton Oakmont): toma el METODO de tonalidad, NUNCA la etica. El hilo de AURUM es vender sirviendo.' },
  ] },
  // ── Canon académico de negociación (el pedigree Harvard/Stanford que ordena lo táctico) ──
  { categoria: 'Negociación académica (Harvard PON · Stanford GSB)', icon: '🎓', items: [
    { nombre: 'Think Fast, Talk Smart — Stanford GSB (Matt Abrahams)', referente: 'Stanford Graduate School of Business', tipo: 'podcast', url: 'https://www.gsb.stanford.edu/insights/think-fast-talk-smart-podcast', idioma: 'en', confianza: 'verificado', porQue: 'El estándar de comunicación que SE ENSEÑA en Stanford GSB: estructura espontánea, objeciones en vivo y ansiedad de cámara. Rúbrica para tus PITCH v1→v7.' },
    { nombre: 'William Ury — The walk from "no" to "yes" (TED)', referente: 'William Ury · Harvard PON (autor de Getting to Yes)', tipo: 'video', url: 'https://www.ted.com/talks/william_ury_the_walk_from_no_to_yes', idioma: 'en', confianza: 'verificado', porQue: 'La fuente ORIGINAL de Harvard detrás de Voss/Hormozi: mover del "no" al "sí" creando valor, no presionando. Base teórica de las preguntas calibradas.' },
    { nombre: 'Getting to Yes — Fisher & Ury (Harvard PON, préstamo Archive.org)', referente: 'Roger Fisher & William Ury', tipo: 'libro', url: 'https://archive.org/details/gettingtoyesnego0000fish', idioma: 'en', confianza: 'estable', porQue: 'El sistema operativo de la negociación de Harvard: BATNA, intereses vs posiciones, separar persona del problema, criterios objetivos. Ordena todo lo táctico que ya tienes.' },
  ] },
  // ── Marketing & growth de élite (la capa GTM que faltaba: positioning, loops, métricas) ──
  { categoria: 'Marketing & growth — GTM de élite (Reforge/a16z)', icon: '📈', items: [
    { nombre: 'April Dunford — An Introduction to Positioning', referente: 'April Dunford · Obviously Awesome', tipo: 'articulo', url: 'https://www.aprildunford.com/post/an-introduction-to-positioning', idioma: 'en', confianza: 'verificado', porQue: 'La referencia mundial de positioning: los 5 componentes y por qué una oferta mal posicionada parece cara. Directo para ALLPA/Qori Golden.' },
    { nombre: 'Brian Balfour — The Four Fits ($100M+ Growth Framework)', referente: 'Brian Balfour · fundador Reforge', tipo: 'articulo', url: 'https://brianbalfour.com/four-fits-growth-framework', idioma: 'en', confianza: 'verificado', porQue: 'Market-Product / Product-Channel / Channel-Model / Model-Market: la lógica para decidir QUÉ canal priorizar en vez de copiar tácticas sueltas.' },
    { nombre: 'Brian Balfour — Essays (serie completa de growth)', referente: 'Brian Balfour · Reforge', tipo: 'articulo', url: 'https://brianbalfour.com/essays', idioma: 'en', confianza: 'verificado', porQue: 'El sistema que usó como VP Growth de HubSpot: growth loops, North Star, canales, retención. Estándar Reforge en abierto.' },
    { nombre: 'Andrew Chen — List of Essays (network effects, loops, retención)', referente: 'Andrew Chen · GP a16z (ex-Uber)', tipo: 'articulo', url: 'https://andrewchen.com/list-of-essays/', idioma: 'en', confianza: 'verificado', porQue: 'La referencia de network effects y viral loops (autor de The Cold Start Problem). El growth que leen los de frontier, no el infomarketing.' },
    { nombre: 'Demand Curve — Growth Guide', referente: 'Demand Curve (YC)', tipo: 'articulo', url: 'https://www.demandcurve.com/growth/intro', idioma: 'en', confianza: 'verificado', porQue: 'Growth práctico (no teoría): landing pages, paid ads Meta/TikTok, orgánico, onboarding/retención, A/B testing. El reemplazo de élite a los canales genéricos.' },
    { nombre: 'Sean Ellis — Finding Your North Star Metric', referente: 'Sean Ellis (acuñó "growth hacking")', tipo: 'articulo', url: 'https://medium.com/growthhackers/finding-your-north-star-metric-fc1c1f71cbcb', idioma: 'en', confianza: 'verificado', porQue: 'El método para elegir la métrica que captura el valor real entregado. Cierra el gap de "qué optimizar".' },
    { nombre: 'Lean Analytics — sitio oficial + ebook gratis (OMTM)', referente: 'Croll & Yoskovitz', tipo: 'libro', url: 'https://leananalyticsbook.com/', idioma: 'en', confianza: 'verificado', porQue: 'El estándar de analítica para startups: la One Metric That Matters por tipo de negocio y etapa. Medición disciplinada para no decidir a ciegas.' },
    { nombre: 'Las 5 Etapas de Awareness (Eugene Schwartz) — guía aplicada', referente: 'Eugene Schwartz · Breakthrough Advertising', tipo: 'articulo', url: 'https://www.duostrategyla.com/ideas/how-to-write-high-converting-ad-copy-the-complete-5-stage-framework-with-examples', idioma: 'en', confianza: 'verificado', porQue: 'Unaware → Problem → Solution → Product → Most Aware: la base del copy de adquisición de élite, con ejemplos por etapa.' },
    { nombre: "Lenny's Newsletter — archivo de Growth", referente: 'Lenny Rachitsky · ex-Airbnb', tipo: 'articulo', url: 'https://www.lennysnewsletter.com/t/growth?sort=top', idioma: 'en', confianza: 'verificado', porQue: 'Donde se actualiza el estado del arte de GTM/growth (Dunford, casos de Duolingo/Stripe/Notion). El "qué usan los TOP" frente a listas genéricas.' },
  ] },
  // ── Publicidad pagada hands-on (Meta/Google/TikTok) — roadmap multi-año en DATA/AURUM/ROADMAP_VENTAS_MULTIANIO.md ──
  { categoria: 'Publicidad pagada (Meta · Google · TikTok ads)', icon: '📣', items: [
    { nombre: 'Meta Blueprint — cursos gratis de Facebook e Instagram (en español)', referente: 'Meta', tipo: 'articulo', url: 'https://www.facebook.com/business/learn/courses', idioma: 'es', confianza: 'verificado', porQue: 'PRIMER paso de ads: crear anuncios, públicos, píxel y medición — gratis y en español. Aplica cada módulo a un borrador real de ALLPA/Qori antes de tocar la tarjeta.' },
    { nombre: 'Meta Certified Digital Marketing Associate — examen oficial (100-101)', referente: 'Meta', tipo: 'articulo', url: 'https://www.facebook.com/business/learn/certification/exams/100-101-exam', idioma: 'en', confianza: 'verificado', porQue: 'La certificación de entrada de Meta (60 preg, 90 min). Demuestra que dominas la mecánica de la plataforma. Meta de cierre del Año 1.' },
    { nombre: 'Google Skillshop — Google Ads (Search/Display/Video) gratis', referente: 'Google', tipo: 'articulo', url: 'https://skillshop.withgoogle.com/googleads/', idioma: 'en', confianza: 'verificado', porQue: 'Formación + certificaciones oficiales. Para ALLPA empieza por SEARCH: captura a quien YA busca "comprar terreno en [zona]" — la intención más caliente.' },
    { nombre: 'TikTok Academy — cursos oficiales de TikTok Ads (en español)', referente: 'TikTok for Business', tipo: 'articulo', url: 'https://ads.tiktok.com/business/academy', idioma: 'es', confianza: 'verificado', porQue: 'Para Qori Golden (producto visual) TikTok es el canal más barato para arrancar. Aprende la mecánica del Ads Manager antes de gastar.' },
    { nombre: 'TikTok Creative Center — Top Ads (anuncios ganadores)', referente: 'TikTok for Business', tipo: 'articulo', url: 'https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en', idioma: 'en', confianza: 'verificado', porQue: 'Los anuncios que MÁS convierten ahora, filtrables por región/objetivo/CTR. Inteligencia creativa gratis: clona estructuras de hook ganadoras.' },
    { nombre: 'Demand Curve — Running Ads (estructura, públicos, presupuesto, escalado)', referente: 'Demand Curve', tipo: 'articulo', url: 'https://www.demandcurve.com/growth/run-ads', idioma: 'en', confianza: 'verificado', porQue: 'La guía operativa de quienes movieron $1.000M en ads: jerarquía campaña→adset→ad, presupuesto mínimo por anuncio, retargeting y fatiga.' },
    { nombre: 'Demand Curve — Making Ads (copy + creatividad que convierte)', referente: 'Demand Curve', tipo: 'articulo', url: 'https://www.demandcurve.com/growth/make-ads', idioma: 'en', confianza: 'verificado', porQue: 'Frameworks de copy (problema-solución-beneficio + escalera de awareness de Schwartz) para Meta/IG. El puente entre tu copy de closer y el anuncio.' },
    { nombre: 'Ben Heath — Facebook & Instagram Ads (YouTube, gratis)', referente: 'Ben Heath', tipo: 'canal', url: 'https://www.youtube.com/channel/UC5Dv8i_vH5M9rB3HOZDCkng', idioma: 'en', confianza: 'verificado', porQue: 'El tutor más sistemático de Meta Ads gratis: setup clic a clic, ABO vs CBO, lookalikes, lectura de métricas y diagnóstico. Tu manual práctico diario.' },
    { nombre: 'Savannah Sanchez (The Social Savannah) — paid social (YouTube)', referente: 'Savannah Sanchez', tipo: 'canal', url: 'https://www.youtube.com/savannahsanchez', idioma: 'en', confianza: 'verificado', porQue: 'Media buyer top (Meta+TikTok). "No hagas anuncios, haz TikToks": cómo producir UGC/Reels que convierten — oro para Qori Golden.' },
    { nombre: 'Surfside PPC — Google & Meta Ads (YouTube, gratis)', referente: 'Surfside PPC', tipo: 'canal', url: 'https://www.youtube.com/surfsideppc', idioma: 'en', confianza: 'verificado', porQue: '15+ años de tutoriales pacientes de Google Ads: setup, puja y optimización explicando el PORQUÉ. Complemento práctico de Skillshop.' },
  ] },
  // ── Funnels, landing pages y la web que vende (cómo se CREA) ──
  { categoria: 'Funnels, landing & web de conversión', icon: '🧲', items: [
    { nombre: 'Julian Shapiro — Landing Page Guide', referente: 'Julian Shapiro', tipo: 'articulo', url: 'https://www.julian.com/guide/growth/landing-pages', idioma: 'en', confianza: 'verificado', porQue: 'PUNTO DE PARTIDA: anatomía de una landing (hero, prueba social, CTA) + la fórmula Desire − (Labor + Confusion). Tu plantilla mental para toda página.' },
    { nombre: 'Julian Shapiro — Growth/Startup Handbook', referente: 'Julian Shapiro', tipo: 'articulo', url: 'https://www.julian.com/guide/growth/intro', idioma: 'en', confianza: 'verificado', porQue: 'Dónde encaja la landing dentro de adquirir y retener clientes. "Cero fluff", el handbook que recomiendan en Silicon Valley.' },
    { nombre: 'Russell Brunson — DotCom Secrets (arquitectura de funnels)', referente: 'Russell Brunson', tipo: 'libro', url: 'https://dotcomsecrets.com/', idioma: 'en', confianza: 'verificado', porQue: 'Value ladder y tipos de embudo (lead→webinar→high-ticket). La propia página es un funnel real que puedes diseccionar como caso de estudio.' },
    { nombre: 'Marketing Examples — Landing Pages (teardowns reales)', referente: 'Harry Dry', tipo: 'articulo', url: 'https://marketingexamples.com/landing-page', idioma: 'en', confianza: 'verificado', porQue: 'Desglose de landings reales (CTA, pricing, formularios, prueba social). Una técnica accionable por sesión de 30-60 min.' },
    { nombre: 'Marketing Examples — Copywriting (ejemplos reales)', referente: 'Harry Dry', tipo: 'articulo', url: 'https://marketingexamples.com/copywriting', idioma: 'en', confianza: 'verificado', porQue: 'Copy "que funciona ahora": conversacional, sin adjetivos vacíos, con casos de marcas top. El texto que hace clicar.' },
    { nombre: 'Copyhackers — tutoriales de conversion copywriting (gratis)', referente: 'Joanna Wiebe', tipo: 'articulo', url: 'https://copyhackers.com/copywriting-tutorials/', idioma: 'en', confianza: 'verificado', porQue: 'Quien acuñó "conversion copywriting": voice-of-customer, fórmula PAS, headlines, cómo cerrar la venta EN la página.' },
    { nombre: 'CXL — Blog de CRO (testing, copy, UX, psicología)', referente: 'Peep Laja / CXL Institute', tipo: 'articulo', url: 'https://cxl.com/blog/', idioma: 'en', confianza: 'verificado', porQue: 'El estándar de CRO basado en evidencia: optimizar con datos, no opiniones. De "me gusta cómo quedó" a "convierte X% mejor".' },
    { nombre: 'Unbounce — Landing Page Best Practices', referente: 'Unbounce', tipo: 'articulo', url: 'https://unbounce.com/landing-page-articles/landing-page-best-practices/', idioma: 'en', confianza: 'verificado', porQue: 'Checklist accionable del líder de landing builders: message match, above-the-fold, social proof, velocidad, móvil, A/B test. Tu lista al publicar.' },
    { nombre: 'Webflow University — construir webs visualmente (oficial, gratis)', referente: 'Webflow', tipo: 'articulo', url: 'https://university.webflow.com/', idioma: 'en', confianza: 'verificado', porQue: 'Expone box model/flex/grid reales: aprender a construir Y puente directo al frontend de Synapse (lo que ves aquí lo entiendes luego en código).' },
    { nombre: 'Framer Academy — de cero a sitio (no-code, gratis)', referente: 'Framer', tipo: 'articulo', url: 'https://www.framer.com/academy/', idioma: 'en', confianza: 'verificado', porQue: 'La vía más rápida a la PRIMERA página publicada de ALLPA/Qori. "Fundamentals" (4h) en sábados; resultado tangible en semanas.' },
    { nombre: 'Carrd — landing de una página (gratis)', referente: 'Carrd', tipo: 'articulo', url: 'https://carrd.co/', idioma: 'en', confianza: 'verificado', porQue: 'Para lanzar HOY una landing de captura de leads de un terreno o camada. Gratis hasta 3 sitios; valida copy y oferta sin fricción.' },
    { nombre: 'Nielsen Norman Group — usabilidad/UX (10 heurísticas)', referente: 'Jakob Nielsen & Don Norman', tipo: 'articulo', url: 'https://www.nngroup.com/articles/', idioma: 'en', confianza: 'verificado', porQue: 'El rigor detrás del "Confusion = 0": por qué una página se entiende sola y no frustra. Autoridad mundial en usabilidad.' },
    { nombre: 'Growth.Design — case studies (teardowns visuales de funnels)', referente: 'Dan Benoni & Louis-Xavier Lavallée', tipo: 'articulo', url: 'https://growth.design/case-studies', idioma: 'en', confianza: 'verificado', porQue: 'Disecciona los funnels de Spotify/Duolingo/Amazon con la psicología detrás. Entrena el OJO para ver conversión en producto.' },
  ] },
  // ── Marketing CON IA — AI-first 2026 (generar copy/imagen/video/landing dirigiendo a la IA) ──
  { categoria: '🤖 Marketing con IA (AI-first · generar copy/imagen/video/landing)', icon: '🤖', items: [
    { nombre: 'Anthropic — Prompt Engineering Overview', referente: 'Anthropic', tipo: 'articulo', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', idioma: 'en', confianza: 'verificado', porQue: 'El skill NÚCLEO de la era IA: cómo DIRIGIR a la IA (claro, contexto, ejemplos, rol, XML). Tu copy/imagen/landing valen lo que vale tu prompt.' },
    { nombre: 'Anthropic — Tutorial interactivo de Prompt Engineering (GitHub)', referente: 'Anthropic', tipo: 'articulo', url: 'https://github.com/anthropics/prompt-eng-interactive-tutorial', idioma: 'en', confianza: 'verificado', porQue: '9 capítulos con ejercicios: práctica deliberada de prompting. Cada lección deja un prompt mejorado medible — drill diario.' },
    { nombre: 'Learn Prompting — curso gratis y open-source', referente: 'Learn Prompting', tipo: 'articulo', url: 'https://learnprompting.org/docs/introduction', idioma: 'en', confianza: 'verificado', porQue: 'El curso abierto más completo de prompting (sin hype), aplicable directo a generar copy de marketing.' },
    { nombre: 'Prompting Guide (promptingguide.ai) + prompt library', referente: 'DAIR.AI', tipo: 'articulo', url: 'https://www.promptingguide.ai/', idioma: 'en', confianza: 'verificado', porQue: 'Técnicas (zero/few-shot, CoT) + librería de prompts reutilizables: roba estructuras probadas ("genera 10 ángulos de anuncio por etapa de awareness").' },
    { nombre: 'v0 by Vercel — generar y PUBLICAR landings con IA', referente: 'Vercel', tipo: 'articulo', url: 'https://v0.app/', idioma: 'en', confianza: 'verificado', porQue: 'El reemplazo AI-first de maquetar a mano: describes la landing y la IA genera el sitio funcional y publicable. Tu landing de ALLPA/Qori sale de aquí.' },
    { nombre: 'Claude Artifacts — apps/páginas desde la conversación', referente: 'Anthropic', tipo: 'articulo', url: 'https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them', idioma: 'en', confianza: 'verificado', porQue: 'Genera landings, calculadora de cuota de terreno o mini-apps de captura de leads conversando con Claude. Prototipa rápido antes de v0/Framer.' },
    { nombre: 'Google Gemini — Image Generation (nano banana): posters con IA', referente: 'Google', tipo: 'articulo', url: 'https://gemini.google/overview/image-generation/', idioma: 'en', confianza: 'verificado', porQue: 'Genera/edita imágenes desde texto, transfiere estilo y AÑADE TEXTO en la imagen (anuncios con copy embebido). Oro para Qori Golden (visual) y terrenos ALLPA.' },
    { nombre: 'Google AI Studio — playground gratis (texto + imagen)', referente: 'Google', tipo: 'articulo', url: 'https://aistudio.google.com/', idioma: 'en', confianza: 'verificado', porQue: 'Banco de pruebas para iterar prompts de copy e imagen sin límite. El laboratorio del loop generar→evaluar→re-prompt antes de llevar el ganador a la campaña.' },
    { nombre: 'Arcads — UGC video ads con actores IA (Meta/TikTok)', referente: 'Arcads', tipo: 'articulo', url: 'https://www.arcads.ai/', idioma: 'en', confianza: 'verificado', porQue: '1.000+ actores IA leen tu script con presets de FB/TikTok. El "no hagas anuncios, haz TikToks" producido con IA: 5 hooks de video en una tarde.' },
    { nombre: 'CapCut — AI Video Generator (texto → video para ads)', referente: 'CapCut', tipo: 'articulo', url: 'https://www.capcut.com/tools/ai-video-generator', idioma: 'en', confianza: 'verificado', porQue: 'Text-to-video, plantillas de ads, voiceover y avatares IA. Variaciones de Reel/TikTok de cachorros Qori o recorridos de terreno, rápido y barato.' },
    { nombre: 'Lummi — cómo escribir mejores prompts de imagen IA', referente: 'Lummi', tipo: 'articulo', url: 'https://www.lummi.ai/blog', idioma: 'en', confianza: 'verificado', porQue: 'El prompting ESPECÍFICO de imagen (sujeto+estilo+luz+encuadre). Sube tus creatividades de "IA genérica" a "diseñado".' },
    { nombre: 'Julian Shapiro — Writing Guide (criterio humano sobre el copy IA)', referente: 'Julian Shapiro', tipo: 'articulo', url: 'https://www.julian.com/guide/write/intro', idioma: 'en', confianza: 'verificado', porQue: 'La era IA premia el JUICIO: claridad, detectar lógica rota, reescribir. La rúbrica con la que conviertes 10 variantes de copy IA en el ángulo correcto.' },
  ] },
];

// ─── KPIs ───
const ALL_BIB = AURUM_BIBLIOTECA.reduce((n, c) => n + c.items.length, 0);
export const AURUM_KPIS = {
  fases: AURUM_FASES.length,
  materialesVerificados: ALL_BIB, // recursos gratis (KEEP/FOUNDATION + descubrimientos + libros)
  fasesCompletadas: 0, // progreso REAL — empieza en 0
  metaFinal: 'Closer de ventas de élite (PITCH v7 + máquina de ventas)',
} as const;

// ─── Protocolo v2 — la ventana fija 14:15-15:15 (núcleo) + la lectura en huecos ───
export const AURUM_PROTOCOLO: { min: string; bloque: string; que: string; formato: string }[] = [
  { min: '14:15', bloque: 'A · el VÍDEO del día (núcleo · pantalla)', que: 'La lección de vídeo exacta del referente real (Hormozi, Cardone, Voss, Cialdini, Rackham…): míralo entero y roba 1 frase/técnica. Va dentro de la ventana 14:15-15:15.', formato: 'pantalla' },
  { min: '–15:15', bloque: 'PRAC · el drill del día (núcleo · práctica deliberada)', que: 'El ejercicio aplicado a tu negocio real (ALLPA/Qori Golden): graba, escribe, role-play, avanza tu PITCH de la fase. La "caja negra" del closer: grabar y revisar. A + PRAC suman 30-60 min.', formato: 'práctica' },
  { min: 'viaje', bloque: 'L · lectura/audiolibro (en tus huecos)', que: 'El libro/audiolibro ancla de la fase (Pink, Tracy, SPIN, $100M Offers, Voss, Challenger, $100M Leads): audiolibro en el coche o lectura en el móvil. NO ocupa la hora del núcleo — es para viajes y huecos.', formato: 'audio' },
  { min: 'finde', bloque: 'Sábado y domingo LIBRES', que: 'El plan es L-V. Usa el finde para los entregables grandes de fase (manifiesto, Grand Slam Offers, playbook de objeciones, PITCH grabado) si quieres adelantar.', formato: 'repaso' },
];

// ─── El nivel meta — los entregables/PITCH por fase (lo que demuestra que eres closer) ───
export const AURUM_NIVEL_META: { skill: string; fuente: string }[] = [
  { skill: 'Mentalidad de operador-vendedor + PITCH v1', fuente: 'F1 — manifiesto del closer AURUM + ritual de actividad medida + PITCH v1 (presentación de 60 seg con certeza)' },
  { skill: 'Tonalidad, empatía táctica y rapport + PITCH v2', fuente: 'F2 — sistema de seguimiento estilo Girard + banco de 10 labels (Voss) + PITCH v2 (apertura de 2 min con tonalidad + mirror)' },
  { skill: 'Descubrimiento que gana el deal + PITCH v3', fuente: 'F3 — guion SPIN completo para ALLPA + 5 preguntas calibradas + PITCH v3 (descubrimiento de 5 min hablando <40%)' },
  { skill: 'Oferta irresistible (Grand Slam) + PITCH v4', fuente: 'F4 — 2 Grand Slam Offers (Ecuación de Valor de Hormozi) + PITCH v4 (oferta de 6-8 min con 3 principios de Cialdini)' },
  { skill: 'Objeciones sin presión + PITCH v5', fuente: 'F5 — playbook de las 12 objeciones reales (empatía táctica + reencuadre, Voss) + PITCH v5 (simulacro de 3 objeciones en vivo)' },
  { skill: 'Cierre high-ticket + PITCH v6 (nivel Hormozi)', fuente: 'F6 — guion de cierre maestro + negociación Ackerman + PITCH v6 (cierre completo de 10-12 min, apertura → sí)' },
  { skill: 'Ventas digitales, pipeline e integración + PITCH v7', fuente: 'F7 — máquina de ventas (CORE4 de Hormozi) + closing por DM + PITCH v7 FINAL (DM de 90 seg + presentación maestra de 12-15 min)' },
];

// ─── Honestidad (no inventado) ───
export const AURUM_ADVERTENCIAS: string[] = [
  'Roster AUDITADO (v2): SOLO referentes con track record REAL y verificable — los que vendieron/construyeron antes de enseñar (Hormozi, Cardone, Voss, Cialdini, Rackham, Joe Girard, Brian Tracy, Jeb Blount, Aaron Ross, Mark Roberge…). Quedan FUERA los descartados por evidencia débil o ética dudosa (neuroventas, NEPQ, línea recta, high-ticket de coaching, ventas de autos, etc.) y el referente de i11 (excluido por decisión tuya). Josué Peña entra SOLO con su contenido GRATIS de YouTube.',
  'Todo el material es GRATIS: nada de cursos pagos. El contenido abierto de YouTube/web + los audiolibros gratis (Archive.org, sitios oficiales, biblioteca pública) son suficientes para dominar el método.',
  'Horario v2: ventana fija 14:15-15:15 (Google Calendar) para el NÚCLEO (ver + practicar = 30-60 min). La LECTURA/audiolibro de la fase NO ocupa esa hora: va en tus huecos de viaje/lectura. Sábado y domingo libres.',
  'Confianza de los enlaces: "verificado" = comprobado / dominio oficial · "estable" = canal/sitio oficial que no debería romperse · "incierto" = video-ID o recurso que NO se pudo verificar al 100%. Si un link "incierto" falla, busca el título exacto en el canal/sitio oficial del referente. Lo mismo aplica a los bloques marcados "verifica el link" en el plan día a día.',
  'Vender ≠ manipular. El hilo de todo el programa (Voss, Cialdini, Rackham, Pink) es vender sirviendo: bajar la presión, diagnosticar como un médico y dejar que el prospecto se persuada solo. Para ALLPA (terrenos) y Qori Golden (cachorros) la confianza ES el activo.',
  'La maestría es repetición bajo presión, no consumo de contenido. Sin el bloque PRAC (grabar, role-play, revisar tu "caja negra" y avanzar tu PITCH de la fase) el plan no funciona: 30-60 min/día de núcleo en 14:15-15:15 durante 26 semanas, L-V.',
  'Carriles añadidos 18-jun (+23 recursos verificados): "Publicidad pagada (Meta/Google/TikTok)" y "Funnels, landing & web de conversión" — el CÓMO se crea y se anuncia, no solo el cierre 1-a-1. Roadmap 1/2/3 años (cierre + ads + funnels + web) en DATA/AURUM/ROADMAP_VENTAS_MULTIANIO.md. Meta Blueprint y TikTok Academy ya están en español; el resto se traduce (clic derecho → Traducir / subtítulos YouTube).',
  'FILOSOFÍA AI-FIRST (18-jun): el humano dirige (oferta, ángulo/awareness, gusto de diseño, lectura de métricas, decisión de iterar); la IA PRODUCE (copy, imágenes, video, landing). Ver pestaña 🚀 Agosto: mini-fase de 10 semanas para dejar 3 activos vivos (landing publicada + creatividades IA + 1 mini-campaña medida). Meta Blueprint/Ben Heath/Carrd/Copyhackers se degradan a referencia: enseñan a operar a mano lo que la IA ya asiste.',
];

// ─── Mini-Fase AGOSTO (AI-first) + Práctica deliberada (Peak/Ericsson) ───
// Bases ejecutables/medibles de marketing+ventas CON IA. Doc: DATA/AURUM/MINIFASE_AGOSTO_AIFIRST.md
export type AurumMiniSemana = { rango: string; foco: string; entregable: string; recurso?: string };
export interface AurumMiniFase {
  titulo: string; etiqueta: string; objetivo: string; entregableFinal: string;
  kpis: string[]; semanas: AurumMiniSemana[];
}
export const AURUM_MINIFASE: AurumMiniFase = {
  titulo: 'Bases AI-first · marketing+ventas DIRIGIENDO a la IA',
  etiqueta: '10 semanas · 19-jun → 31-ago · ventana 14:15-15:15',
  objetivo: 'Dominar las bases de marketing+ventas EJECUTABLES CON IA y dejar 3 activos reales corriendo para ALLPA y Qori Golden: una LANDING publicada (generada con IA), un SET de creatividades (imagen + video corto IA) y UNA mini-campaña de ads corriendo y MEDIDA (CTR/CPL). El humano dirige; la IA produce. Cada sesión deja un entregable generado-con-IA, registrable y calificado.',
  entregableFinal: 'Al cerrar agosto: (1) generar en una sesión 8+ ángulos de copy mapeados a awareness y elegir el correcto con criterio; (2) un set de creatividades IA (imagen con texto + video/UGC); (3) una LANDING publicada y viva que capta leads; (4) una mini-campaña corriendo y MEDIDA con ≥2-3 ciclos del loop generar→medir→re-prompt→regenerar; (5) un playbook AI-first repetible. La prueba es operativa: activos vivos + dashboard con números reales, no apuntes.',
  kpis: [
    'Prompts iterados/semana en tu "banco de prompts" (≥2 iteraciones doc.): meta ≥10/sem, calificados 1-5 (rol-contexto-ejemplos-XML)',
    'Variantes de copy generadas y elegidas: generar ≥8 ángulos por awareness, quedarte con 2-3 (criterio)',
    'Creatividades IA producidas: ≥12 imágenes (Gemini) + ≥6 videos cortos (Arcads/CapCut), score de hook 1-5',
    'Landing: 1 publicada con URL viva + tasa de envío de formulario (leads ÷ visitas) registrada',
    'Campaña medible: CTR, CPM, CPL, nº de leads + ≥1 iteración decidida POR los datos',
    'Loop agéntico cerrado: ciclos generar→medir→re-prompt→regenerar (meta ≥3 en las últimas 3 semanas)',
    'Adherencia: % de días L-V con entregable registrado (meta ≥85%) — práctica, no consumo',
  ],
  semanas: [
    { rango: 'S1 · 19-27 jun', foco: 'Prompting como skill núcleo + montar el "banco de prompts" (cómo se DIRIGE a la IA)', entregable: 'Banco de prompts v1 (10 prompts propios de marketing, ≥2 iteraciones, auto-cal 1-5)', recurso: 'Anthropic Prompt Overview + Tutorial interactivo' },
    { rango: 'S2 · 30 jun-4 jul', foco: 'Copy de anuncios con IA según awareness de Schwartz (Unaware→Most Aware)', entregable: '8 ángulos generados (ALLPA + Qori) mapeados a las 5 etapas; elegir 2-3 con tu criterio (descartes anotados)', recurso: 'Prompting Guide + Julian Shapiro Writing' },
    { rango: 'S3 · 7-11 jul', foco: 'Creatividades de imagen con IA (poster con copy embebido). Prompting de imagen', entregable: '≥6 imágenes/posters (3 ALLPA, 3 Qori) con texto, score de hook 1-5 + qué prompt lo produjo', recurso: 'Gemini Image (nano banana) + Lummi + AI Studio' },
    { rango: 'S4 · 14-18 jul', foco: 'Video corto / UGC con IA. Hooks de 3 segundos ("haz TikToks, no ads")', entregable: '≥4 videos IA (2 ALLPA, 2 Qori) con hook distinto; elegir los 2 mejores para la campaña', recurso: 'Arcads (actores IA) + CapCut AI' },
    { rango: 'S5 · 21-25 jul', foco: 'Construir la landing CON IA (no a mano): hero, prueba social, oferta, CTA, formulario', entregable: 'Prototipo de landing funcional por prompt (Claude Artifacts) revisado vs Desire − (Labor + Confusion)', recurso: 'Claude Artifacts' },
    { rango: 'S6 · 28 jul-1 ago', foco: 'Llevar la landing a producción y PUBLICARLA (dominio/URL viva)', entregable: '1 LANDING PUBLICADA (v0/Framer-AI) con formulario que captura leads. Velocidad anotada', recurso: 'v0 by Vercel + Framer (AI/Agents)' },
    { rango: 'S7 · 4-8 ago', foco: 'Fundamentos de ads para LANZAR (campaña→adset→ad, públicos, presupuesto, píxel)', entregable: 'Plan de mini-campaña escrito (objetivo, público, presupuesto/día, 2 creatividades+2 copies, evento) + 3 hooks clonados', recurso: 'Demand Curve Running Ads + TikTok Creative Center' },
    { rango: 'S8 · 11-15 ago', foco: 'LANZAR la mini-campaña (presupuesto mínimo) + dashboard de métricas', entregable: '1 mini-campaña CORRIENDO (≥2 ads → landing) + dashboard CTR/CPM/CPL/leads. Baseline registrado', recurso: 'Demand Curve + Ads Manager' },
    { rango: 'S9 · 18-22 ago', foco: 'El LOOP agéntico: leer datos → re-prompt → regenerar el activo perdedor → relanzar', entregable: '≥2 ciclos generar→medir→re-prompt→regenerar + tabla antes/después de CTR y CPL', recurso: 'AI Studio + Gemini/Arcads + dashboard' },
    { rango: 'S10 · 25-29 ago', foco: 'Consolidar el SISTEMA en un playbook AI-first repetible para ALLPA y Qori', entregable: 'Playbook v1 (funnel anuncio→landing→lead + banco de prompts + rúbrica + KPIs) + demo de 5 min de los 3 activos vivos', recurso: 'Todo + CORE4 de $100M Leads' },
  ],
};

export interface AurumPractica { resumen: string; principios: string[]; sistemaMedible: string[]; compresion: string }
export const AURUM_PRACTICA: AurumPractica = {
  resumen: 'Práctica deliberada (Ericsson, "Peak") en la era IA: en el bloque PRAC (14:15-15:15) SIEMPRE produces un activo generado-con-IA (un prompt iterado, una creatividad, un trozo de landing, un anuncio) y lo CALIFICAS el mismo día contra rúbrica. Ver el recurso sin parir y medir no cuenta. El humano entrena el CRITERIO que la IA no tiene; la IA es el aprendiz que produce.',
  principios: [
    'Cada sesión produce un activo generado-con-IA, registrable y calificable — no consumo.',
    'Zona de incomodidad + feedback inmediato: la IA misma evalúa ("evalúa este copy contra estos criterios") y acelera el bucle.',
    'Representación del experto: qué etapa de awareness ataca el copy, qué hook frena el scroll, qué métrica importa (CPL > likes), cuándo iterar. Tú apruebas/rechazas.',
    'Repetición bajo restricción real: siempre sobre ALLPA y Qori (no ejemplos genéricos) y con presupuesto/tiempo reales.',
    'Aísla el sub-skill y sube dificultad: prompting → copy → imagen → video → landing → ads → loop; domina cada uno antes de integrar (S10).',
    'El loop agéntico (generar→medir→re-prompt→regenerar) es la unidad de práctica: se cuenta por ciclos cerrados y por delta de CTR/CPL.',
  ],
  sistemaMedible: [
    'Log diario (1 fila/sesión): fecha, sub-skill, recurso, entregable producido, link al activo, auto-cal 1-5, "pista de mejora" para mañana. Tu caja negra.',
    'Rúbrica de prompt (1-5): ¿rol? ¿contexto/motivo? ¿1-3 ejemplos? ¿estructura XML? ¿pide auto-verificación? Un prompt <4 se reescribe.',
    'Rúbrica de creatividad (1-5): claridad del hook en 3s, una sola idea, contraste/legibilidad del texto, ajuste a la etapa de awareness, fit con el negocio. Sólo ≥4 entra a la campaña.',
    'Métricas de campaña como verdad última: CTR (creativo), CPM (alcance), CPL (eficiencia), leads. La iteración la dictan los números, no el gusto.',
    'Conteo de loops cerrados y su delta de CTR/CPL: el aprendizaje se demuestra si el delta mejora a lo largo de agosto.',
    'Revisión semanal (sábado, 15 min): leer el log, marcar mejor/peor entregable, fijar el foco de la semana siguiente.',
  ],
  compresion: 'Sin IA, llegar a top-10% en marketing de respuesta directa es 12-24 meses (copy + diseño + video + maquetar landings + operar ads, cada uno una disciplina). La IA NO comprime el camino al top por sí sola: comprime la PRODUCCIÓN (copy/imagen/video/landing pasan de días a minutos), pero el cuello de botella se mueve al CRITERIO — qué pedir, reconocer lo bueno, leer métricas, decidir la iteración. Por eso agosto entrena justo eso. Realista: las BASES ejecutables (lanzar y medir una campaña con activos decentes) son alcanzables en ~10 semanas a 60 min/día — lo que pre-IA pedía ~6-12 meses. Top-5% (creatividades/copy que baten el CPL consistentemente) ≈ 6-12 meses encadenando campañas reales (los 3 negocios de Joseph lo permiten). El top-1% (intuición de oferta+ángulo+canal que pocos replican) sigue siendo plurianual: la IA amplifica el juicio pero no lo sustituye. Resumen: la IA convierte "aprender a hacerlo" (años) en "aprender a dirigirlo y medirlo" (semanas para las bases); el techo lo pone el juicio humano entrenado con repeticiones reales.',
};
