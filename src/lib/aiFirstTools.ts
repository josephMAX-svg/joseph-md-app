/**
 * aiFirstTools.ts — Estudiar/operar CON IA en cada segmento (AI-first 2026).
 * Herramientas verificadas (panel de agentes 19-jun, WebFetch). El humano aporta el CRITERIO;
 * la IA acelera (explicar, interrogar, generar casos/preguntas, repetición espaciada, verificar).
 * ⚠ La IA es APOYO de estudio, NUNCA fuente clínica primaria: verificar todo dato duro contra la guía oficial.
 */
export type AIHerramienta = { nombre: string; url: string; idioma: string; porQue: string; comoUsar: string };
export type AIFirstSegmento = {
  key: string;
  titulo: string;
  principio: string;
  herramientas: AIHerramienta[];
  integracion: string[];   // cómo meterlo en el día a día, medible
  advertencias: string[];  // límites (alucinación clínica, verificar)
};

export const AI_FIRST_SEGMENTOS: Record<string, AIFirstSegmento> = {
  medico: {
    key: 'medico',
    titulo: 'Estudiar para el examen CON IA (USMLE · MIR · ENCAPS)',
    principio: 'El examen mide tu CRITERIO clínico bajo presión, no tu capacidad de almacenar datos que la IA recita en segundos. AI-first = la IA es tu tutor socrático infinito (te explica, te interroga, te genera casos/simulacros ilimitados, te corrige al explicar); tú aportas el juicio diagnóstico, la priorización y la verificación contra la guía oficial. Estudias razonando en voz alta CON la máquina, no subrayando PDFs solo.',
    herramientas: [
      { nombre: 'NotebookLM (Google)', url: 'https://notebooklm.google', idioma: 'es/en', porQue: 'Subes las guías MINSA / temarios (ProMIR, Qbankly) y la IA responde SOLO con base en ESAS fuentes, citando la línea — neutraliza la alucinación clínica. Audio-resumen tipo podcast + flashcards. Gratis.', comoUsar: 'Un notebook por bloque ("ENCAPS-Cardio MINSA"). Pide "10 preguntas tipo examen con respuesta razonada y cita". Genera Audio Overview para los traslados. Si no cita la guía, no lo des por válido.' },
      { nombre: 'Anki (repetición espaciada + IA)', url: 'https://apps.ankiweb.net', idioma: 'es/en', porQue: 'Lo único que vence la curva del olvido en exámenes de volumen. El cambio AI-first: ya no creas tarjetas a mano, las genera la IA; Anki solo programa el repaso. Gratis, open-source.', comoUsar: 'Pide a la IA "convierte este capítulo en 20 tarjetas cloze, una idea por tarjeta, CSV" → import a Anki. 20-30 min/día. Verifica dosis/guidelines antes de fijarlas.' },
      { nombre: 'Claude — tutor socrático y casos clínicos', url: 'https://claude.ai', idioma: 'es/en', porQue: 'Tutor de RAZONAMIENTO: te interroga, simula casos paso a paso y te obliga a justificar cada decisión. Maneja PDFs y temarios enteros (ventana grande).', comoUsar: 'Prompt: "Eres mi tutor de ENCAPS. NO me des la respuesta: hazme preguntas socráticas sobre [tema] hasta que yo razone el diagnóstico, y corrígeme". Feynman: "te explico [tema]; detecta mis errores".' },
      { nombre: 'Google Gemini (multimodal)', url: 'https://gemini.google.com', idioma: 'es/en', porQue: 'Acertó ~99% del MIR 2026 → sparring de alto nivel. Sube fotos de tu cuaderno/ECG, planifica semanas, genera tests. Integra con tu Drive/Calendar.', comoUsar: 'Sube un ECG/esquema: "explícalo nivel examen y hazme 3 preguntas trampa". Que acierte el 99% es el argumento para NO memorizar lo que él recita: entrena el criterio que él no replica.' },
      { nombre: 'AMBOSS + AMBOSS GPT', url: 'https://www.amboss.com/us/usmle', idioma: 'en', porQue: 'Qbank Step (5.800+ preguntas) con IA curada (no web abierta) → menos alucinación que un LLM suelto. Extensión Chrome que define cualquier término al clic.', comoUsar: 'Bloques cronometrados como simulacro; al fallar, AMBOSS GPT explica el PORQUÉ. Mide % por sistema y ataca los percentiles bajos.' },
      { nombre: 'ProMIR + asistente MIRI', url: 'https://blog.promir.es/recta-final-mir-2026/', idioma: 'es', porQue: 'La que YA usas: 36.000+ preguntas, calendario adaptativo que prioriza tus débiles, y MIRI (IA 24/7). AI-first nativo en español.', comoUsar: 'Deja que la IA calibre y siga el calendario adaptativo en vez de estudiar "en orden de libro". MIRI para dudas 24/7. Vuelca tus % a Joseph MD.' },
      { nombre: 'OpenEvidence — verificación clínica', url: 'https://www.openevidence.com', idioma: 'en', porQue: 'Resuelve la alucinación #1: responde SOLO citando literatura revisada (NEJM/JAMA/Cochrane). Gratis para clínicos verificados. Tu ÁRBITRO clínico.', comoUsar: 'Cuando un LLM te dé una dosis/manejo/cifra para memorizar, pásala por OpenEvidence ANTES de fijarla en Anki.' },
    ],
    integracion: [
      'Loop diario medido: cada bloque termina con la IA generándote 10 preguntas del tema; registras aciertos/total. Si no hay número, no hubo aprendizaje.',
      'Drill socrático de 25 min en cada hueco (12:30-13:00): la IA en modo "NO me des la respuesta, interrógame" hasta que razones el diagnóstico.',
      'Feynman invertido 2×/semana: le explicas un tema a la IA y le pides que marque tus errores conceptuales.',
      'Pipeline de flashcards: al cerrar un capítulo, la IA lo vuelve 15-20 cloze CSV → Anki. Mide retention rate.',
      'Verificación obligatoria: ningún dato clínico duro entra a Anki sin pasar por OpenEvidence o la guía MINSA.',
    ],
    advertencias: [
      'ALUCINACIÓN CLÍNICA es el riesgo #1: los LLM inventan dosis, criterios y cifras. La IA es apoyo de estudio, NUNCA fuente clínica primaria.',
      'ENCAPS/MINSA es contexto PERUANO: las IAs están sesgadas a USMLE (EE.UU.)/MIR (España). Epidemiología y protocolos peruanos: verifica contra la guía MINSA.',
      'La IA es para ESTUDIAR, jamás durante el examen. No subas datos de pacientes reales identificables.',
    ],
  },
  derma: {
    key: 'derma',
    titulo: 'Estudiar dermatología CON IA',
    principio: 'En derma el juicio es VISUAL: tú aportas el ojo clínico y el criterio (qué es relevante, contra qué guía verificar); la IA acelera el resto — te interroga por morfología, genera diferenciales, arma casos y te impone repetición espaciada del patrón. La IA NUNCA diagnostica al paciente real: es banco de entrenamiento del patrón, no fuente clínica.',
    herramientas: [
      { nombre: 'Claude (Projects + visión)', url: 'https://claude.ai', idioma: 'es/en', porQue: 'Examinador visual: le pasas una imagen de ATLAS (estudio) y te interroga por morfología/diferencial sin darte el diagnóstico.', comoUsar: 'Project "Derma Drills". Prompt: "Eres examinador de derma. Imagen de atlas con fines de ESTUDIO. NO me des el diagnóstico: interrógame por lesión primaria, color, bordes, distribución, y pídeme 3 diferenciales".' },
      { nombre: 'NotebookLM (tus atlas/guías)', url: 'https://notebooklm.google', idioma: 'es/en', porQue: 'Carga tus guías/atlas reales y pregunta algoritmos diagnósticos exigiendo cita de página — anclado a fuente, menos alucinación.', comoUsar: 'Notebook "Derma": sube guías/atlas. Pregunta "algoritmo diagnóstico de un nódulo solitario rosado" y exige la cita.' },
      { nombre: 'Google Gemini (segunda opinión)', url: 'https://gemini.google.com', idioma: 'es/en', porQue: 'Pásale la MISMA imagen/caso que a Claude y compara diferenciales. Toda discrepancia → tarjeta de estudio y verificación.', comoUsar: 'Doble-modelo anti-alucinación: discrepancia Claude↔Gemini se verifica en DermNet/Dermoscopedia.' },
      { nombre: 'DermNet (atlas + quizzes)', url: 'https://dermnetnz.org', idioma: 'en', porQue: 'La fuente para CONFIRMAR cada diferencial/algoritmo que te dé la IA. Imágenes para los drills + quizzes.', comoUsar: 'Cada diferencial de la IA, ábrelo en DermNet y confirma. Saca imágenes de aquí para los drills de descripción.' },
      { nombre: 'Dermoscopedia', url: 'https://dermoscopedia.org', idioma: 'en', porQue: 'Estándar de dermoscopia (Sociedad Internacional). Estudia un patrón y luego deja que la IA te tome examen oral sobre él.', comoUsar: 'Bloque semanal: 1 patrón aquí → examen oral con Claude sobre imágenes ISIC de ese patrón → verifica.' },
      { nombre: 'ISIC Archive (imágenes open)', url: 'https://www.isic-archive.com', idioma: 'en', porQue: 'Imágenes dermoscópicas open-access para drills (con metadato/diagnóstico para autoevaluar).', comoUsar: 'Filtra por lesión, describe TÚ primero, deja que la IA te interrogue, compara con el metadato.' },
      { nombre: 'VisualDx (fototipos)', url: 'https://www.visualdx.com', idioma: 'en', porQue: 'Referencia validada para armar diferenciales por hallazgos y estudiar presentaciones en PIEL OSCURA (donde la IA generativa falla más).', comoUsar: '1 sesión/semana enfocada en piel oscura, contrastando lo que la IA asume.' },
    ],
    integracion: [
      'Loop diario de descripción morfológica (15 min): 5 imágenes de DermNet/ISIC, descríbelas TÚ primero (lesión primaria, color, bordes…), luego la IA te interroga.',
      'Drill de diferencial cronometrado (10 min): la IA te lanza 10 viñetas; respondes 3 diferenciales en <60s. Mide aciertos.',
      'Doble-modelo anti-alucinación: misma imagen a Claude y Gemini; discrepancia → verificar en DermNet/Dermoscopedia.',
      'Cierre con Anki: la IA convierte tus errores del día en tarjetas con imagen; tú filtras cuáles valen.',
    ],
    advertencias: [
      'LÍMITE INNEGOCIABLE: la IA es banco de entrenamiento del patrón, NO herramienta diagnóstica. NUNCA para pacientes reales.',
      'Alucinación VISUAL alta: los modelos "ven" estructuras que no existen. Si IA y fuente discrepan, gana la fuente (DermNet/Dermoscopedia/VisualDx).',
      'Sesgo de fototipo: los atlas están sesgados a piel clara; compénsalo con VisualDx en piel oscura. Usa solo imágenes de datasets abiertos, jamás fotos identificables.',
    ],
  },
  research: {
    key: 'research',
    titulo: 'Investigación y revisiones sistemáticas CON IA',
    principio: 'El investigador AI-first no hace screening a mano: orquesta un pipeline donde la IA descubre, criba, extrae y redacta a escala — mientras el humano aporta lo que la IA no puede dar con seguridad: la pregunta PICO, los criterios de inclusión, el juicio de riesgo de sesgo (RoB) y la verificación de CADA dato contra la fuente primaria. La IA acelera 35-80% una SR; el criterio metodológico sigue 100% del médico.',
    herramientas: [
      { nombre: 'Elicit — motor de systematic reviews', url: 'https://elicit.com', idioma: 'en', porQue: 'Corre la búsqueda y extrae datos a tabla desde tu pregunta PICO sobre 125M+ papers. El arranque del pipeline de una SR.', comoUsar: 'Crea un "systematic review", pega tu PICO, deja que busque y exporta el set (RIS) para el screening en Rayyan.' },
      { nombre: 'Rayyan — screening doble-ciego con IA', url: 'https://www.rayyan.ai', idioma: 'en', porQue: 'Cribado de títulos/abstracts a doble ciego con priorización IA. El estándar para el screening reproducible.', comoUsar: 'Importa el RIS, define labels inclusión/exclusión, cribas tú y el co-autor en ciego. Mide el % de acuerdo IA-vs-tú.' },
      { nombre: 'ResearchRabbit', url: 'https://www.researchrabbit.ai', idioma: 'en', porQue: 'Descubrimiento/snowballing desde un paper semilla (similar/earlier/later work). No se te escapa literatura clave.', comoUsar: 'Arranca con tu paper ancla; añade "similar/earlier/later work" y "these authors". Colecciones por SR.' },
      { nombre: 'Connected Papers', url: 'https://www.connectedpapers.com', idioma: 'en', porQue: 'Grafo de un campo en una mirada: los nodos centrales son lecturas obligadas.', comoUsar: 'Pega el DOI de un paper central; lee el grafo para mapear el campo y no perder seminales.' },
      { nombre: 'NotebookLM (tu corpus)', url: 'https://notebooklm.google.com', idioma: 'es/en', porQue: 'Sube los PDFs INCLUIDOS y pregúntale con cita (grounded) — extrae datos sin inventar.', comoUsar: 'Un notebook por SR con los estudios incluidos. "¿Qué tiempo-a-tratamiento reportan los casos con X?" — exige la cita.' },
      { nombre: 'Claude — PICO/PRISMA, crítica y redacción', url: 'https://claude.ai', idioma: 'es/en', porQue: 'Convierte la pregunta clínica en PICO + criterios + MeSH; critica tu estrategia de búsqueda; redacta y hace de "revisor 2" adversario.', comoUsar: 'Prompts reutilizables: "esta pregunta → PICO + inclusión/exclusión + MeSH"; "actúa como revisor 2 de JAAD: encuentra sesgos".' },
      { nombre: 'Covidence (SR de extremo a extremo)', url: 'https://www.covidence.org', idioma: 'en', porQue: 'Gestión Cochrane-friendly para una SR con intención de publicar en alto impacto.', comoUsar: 'Importa el set descubierto y gestiona screening→extracción→RoB en un solo lugar.' },
      { nombre: 'PRISMA 2020 + PubMed + Cochrane', url: 'https://www.prisma-statement.org', idioma: 'en', porQue: 'El ancla de verificación HUMANA. El checklist y el flow diagram NO se delegan a la IA: son tu responsabilidad metodológica.', comoUsar: 'Completa el checklist y el flow diagram a mano por cada SR. Cada cifra del paper final, verificada contra la fuente primaria.' },
    ],
    integracion: [
      'Pipeline fijo de 7 pasos por SR (medible): PICO (Claude) → búsqueda (Elicit+PubMed) → snowballing (ResearchRabbit+Connected Papers) → screening (Rayyan) → extracción (NotebookLM/Covidence) → síntesis → redacción+crítica (Claude).',
      'Drill diario de 30 min: 1 sub-tarea del pipeline de la SR activa, completada con su herramienta.',
      'Métrica de acuerdo IA-vs-humano en cada tanda de screening; si baja, revisa tus criterios.',
      'Regla anti-alucinación: ningún dato extraído por IA entra a la tabla sin chequeo celda-por-celda contra el PDF. Verifica CADA cita (existen "citas fantasma").',
    ],
    advertencias: [
      'Citas fantasma: Elicit/Consensus/Claude pueden inventar referencias o atribuir hallazgos al paper equivocado. Reverifica cada DOI.',
      'Responsabilidad metodológica intransferible: PRISMA, criterios de inclusión, RoB y la decisión final son del médico, no de la IA.',
      'No subas datos de pacientes identificables ni resultados no publicados a la nube sin verificar privacidad.',
    ],
  },
  vitals: {
    key: 'vitals',
    titulo: 'Salud y cuerpo CON IA (VITALS)',
    principio: 'Tú defines el objetivo y el criterio (qué entrenar, qué riesgo aceptar); la IA convierte datos crudos en acción: lee tus wearables y te dice por qué estás cansado, ajusta macros solos, cruza variables. No memorizas tablas de calorías: orquestas y conservas el juicio final.',
    herramientas: [
      { nombre: 'WHOOP Coach (IA con OpenAI)', url: 'https://www.whoop.com', idioma: '50+ idiomas', porQue: 'Coach que lee tu Recovery/Strain/Sleep y te dice qué intensidad entrenar y por qué, en lenguaje natural.', comoUsar: 'Cada mañana: "con mi Recovery de hoy, ¿qué intensidad entreno y por qué?". Antes de una guardia larga, pídele estrategia de sueño/recuperación.' },
      { nombre: 'Oura Advisor (IA en el anillo)', url: 'https://ouraring.com/blog/oura-advisor/', idioma: 'en (responde a prompts en es)', porQue: 'Asesor de sueño/recuperación dentro de Oura, con memoria de tus metas.', comoUsar: 'Modo directo (orientado a meta). Loop semanal: "¿qué tendencia de sueño cambió y qué ajusto?".' },
      { nombre: 'MacroFactor', url: 'https://macrofactor.com/', idioma: 'en', porQue: 'Algoritmo que recalibra tus macros solo según tu adherencia y peso real — sin perseguir el número diario.', comoUsar: 'Define meta (recomp/mantenimiento), loguea por foto en 5s post-comida, revisa la tendencia semanal.' },
      { nombre: 'MyFitnessPal (voice log)', url: 'https://www.myfitnesspal.com', idioma: 'es/en', porQue: 'Registro de comidas hablando (sin escribir) + sincroniza con el wearable.', comoUsar: 'Voice log de desayuno+almuerzo+cena. Hábito mínimo medible: loguear los 3.' },
    ],
    integracion: [
      'Loop matutino (5 min, medible): el coach-IA del wearable te dice qué entrenar HOY según tus datos.',
      'Nutrición sin fricción: loguea por foto/voz en <10s por comida; acepta el ajuste semanal del algoritmo, no el número diario.',
      'Revisión semanal con IA: exporta wearable+nutrición y pide a Claude que cruce variables (ej. noches <6h sueño vs rendimiento).',
    ],
    advertencias: [
      'WHOOP/Oura y cualquier LLM son APOYO de estilo de vida, NO fuente clínica ni diagnóstica.',
      'Datos de salud son sensibles: revisa la privacidad de cada wearable.',
    ],
  },
  ops: {
    key: 'ops',
    titulo: 'Operación del negocio CON IA (Pulso · ops)',
    principio: 'El humano decide; la IA ejecuta lo repetitivo: transcribe y resume reuniones, atiende leads con tu propia data, automatiza tareas y analiza tus números. No copias contratos ni respondes lo mismo 50 veces: orquestas agentes y conservas el criterio final. (El marketing/ventas vive en AURUM.)',
    herramientas: [
      { nombre: 'Fathom (notetaker IA)', url: 'https://fathom.video/', idioma: 'es/en', porQue: 'Transcribe y resume cada reunión (proveedores, leads, socios) con action items — multi-idioma.', comoUsar: 'Actívalo en toda llamada de negocio; tras colgar, revisa resumen+acciones en 2 min y delega el follow-up.' },
      { nombre: 'HubSpot Breeze (CRM con agentes)', url: 'https://www.hubspot.com/products/artificial-intelligence', idioma: 'es/en', porQue: 'Agentes de IA para FAQs de leads y prospección + copiloto que prioriza quién tiene mayor probabilidad de cierre.', comoUsar: 'Activa el Customer Agent para FAQs repetitivas; pregunta al copiloto cada lunes qué leads priorizar. Mantén supervisión humana.' },
      { nombre: 'n8n (automatización con IA)', url: 'https://n8n.io', idioma: 'en', porQue: 'Automatiza flujos con IA, self-hostable (clave si manejas data sensible).', comoUsar: 'Empieza con 1 flujo: nuevo lead → IA clasifica/prioriza → tarjeta en CRM → aviso WhatsApp.' },
      { nombre: 'Make.com (no-code visual)', url: 'https://www.make.com', idioma: 'es/en', porQue: 'Automatización visual sin código para tareas repetitivas.', comoUsar: 'Factura nueva → IA extrae datos → Sheets → aviso. O: mensaje de cliente → IA redacta borrador → tú apruebas.' },
      { nombre: 'Claude (Projects, docs y datos)', url: 'https://claude.ai', idioma: 'es/en', porQue: 'Analiza tu Excel de ventas (patrones+gráficos), redacta borradores de contrato y documentos con tus plantillas.', comoUsar: 'Project "Ops Pulso" con tus plantillas/políticas. Sube el Excel y pide patrones. Contratos: borrador + SIEMPRE revisión legal.' },
      { nombre: 'NotebookLM (base de conocimiento)', url: 'https://notebooklm.google', idioma: 'es/en', porQue: 'Sube tus SOPs/manuales/contratos y consulta con cita a la fuente (no inventa).', comoUsar: 'Pregunta a tus propios documentos en vez de reescribir de memoria; genera audio overview para onboarding.' },
    ],
    integracion: [
      'Cada reunión deja artefacto: Fathom activo → resumen+acciones en 2 min → delega el follow-up.',
      '1 automatización nueva/semana (n8n self-host si hay data sensible, o Make) que elimine una tarea manual repetitiva.',
      'Evaluación mensual: un dashboard simple (Sheets) con KPIs; pide a Claude que lo analice y proponga 3 ajustes — el criterio de qué cambiar es tuyo.',
    ],
    advertencias: [
      'Contratos/documentos legales: la IA redacta borradores, NO sustituye revisión legal.',
      'Agentes de CRM actuando solos pueden responder mal a un cliente: mantén supervisión humana (human-in-the-loop).',
    ],
  },
};
