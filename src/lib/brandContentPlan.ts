/**
 * brandContentPlan.ts — Horario semanal de CONTENIDO ORGÁNICO por marca.
 * El usuario solo DICTA la idea; Claude Code (desde la carpeta nativa de cada marca)
 * ejecuta: guion → video (web) → publicación. Aquí vive el recordatorio diario:
 * qué publicar, estándar Hormozi, qué dictar, cuánto toma, qué medir.
 *
 * Base verificada: DATA/BUSINESS/hormozi-method.md (Core Four, Hook-Retain-Reward,
 * give:ask ≈3.5:1, Rule of 100) + ventanas por red (Buffer 9.6M posts / Sprout ~2B
 * engagements / Hootsuite): IG mié-jue tarde-noche · TikTok tardes y finde · YT
 * Shorts viernes tarde. La rotación editorial por vertical es PROPUESTA (ajustable).
 */

export interface RedDia { red: 'TikTok' | 'Instagram' | 'YouTube' | 'Facebook' | 'Marketplace' | 'WhatsApp'; nota: string; fuerte?: boolean }
export interface DiaContenido {
  dia: string;             // Lun..Dom
  foco: string;            // ángulo editorial del día
  redes: RedDia[];
  extra?: string;          // tarea especial del día
}
export interface BrandPlan {
  marca: string; accent: string;
  tiempoDia: string;       // cuánto toma el dictado+revisión
  semana: DiaContenido[];
}

/** Reparto semanal del tiempo de business (regla del fundador) */
export const TIME_SPLIT = [
  { marca: 'Pulso / LIVIANO', pct: 70, color: '#D9BE8A', estado: 'activo', desc: 'Lectura plan 96 días + aplicación directa: contenido orgánico diario + funnel' },
  { marca: 'PIRQA', pct: 10, color: '#F08A4B', estado: 'activo', desc: 'Post diario · lanzamiento sáb 12:00 → dom (día de venta)' },
  { marca: 'Terrenos', pct: 10, color: '#8FB6E8', estado: 'activo', desc: '13 propiedades · web + Marketplace ya publicados — venta activa' },
  { marca: 'Golden Retriever', pct: 10, color: '#E8C547', estado: 'pre-lanzamiento', desc: 'Camada en ~2 meses — crear página + documentar desde ya' },
];

/** Estándares de CADA publicación (Hormozi, verificado) */
export const ESTANDARES = [
  { k: 'Hook (0-3 s)', v: 'El gancho decide todo: pregunta/afirmación que detiene el scroll. Ligado a lo RELEVANTE del país/mundo hoy (trend-jacking).' },
  { k: 'Retain', v: 'Lista o historia que sostiene la atención (puntos numerados, antes/después, caso real anónimo).' },
  { k: 'Reward', v: 'Cumple la promesa del hook: 1 idea accionable que el espectador pueda usar HOY.' },
  { k: 'give:ask ≈ 3.5:1', v: 'De cada 4-5 posts, solo 1 con CTA de venta; el resto da valor puro ("give until they ask").' },
  { k: 'Comentarios (outreach)', v: '10-15 min/día respondiendo TODO + comentar en 5 cuentas grandes del nicho (warm/cold outreach de Hormozi).' },
  { k: 'Innovar al copiarte', v: 'Si un formato se satura o te copian → cambia el mecanismo, no el mensaje (Schwartz: sofisticación de mercado).' },
];

/** Flujo de dictado (el humano dicta, Claude Code ejecuta desde la carpeta nativa) */
export const FLUJO_DICTADO = [
  { paso: '1 · DICTAR (3-5 min)', det: 'Dicta: gancho + 3 puntos + CTA + a qué tendencia/noticia del día se engancha.' },
  { paso: '2 · CLAUDE CODE EJECUTA', det: 'Guion → video con herramientas web (Veo en Gemini / CapCut Web / Canva) vía Chrome DevTools o Claude-in-Chrome.' },
  { paso: '3 · REVISAR (1-2 min)', det: 'Apruebas o corriges en una línea. Nada sale sin tu OK.' },
  { paso: '4 · PUBLICAR + RESPONDER', det: 'TikTok web · Meta Business Suite (IG) · YouTube Studio. Luego 10-15 min de comentarios.' },
];

/** Qué medir (checklist de métricas — revisar domingo) */
export const METRICAS = [
  'Views por red y por post (¿qué hook ganó?)',
  'Retención % (TikTok/Shorts analytics) — meta: >50% a mitad del video',
  'Saves + shares (señal de valor real, pesa más que likes)',
  'Comentarios y respuestas (engagement de ida y vuelta)',
  'Clics al link de WhatsApp / bio (engaged leads, lo único que cuenta para Hormozi)',
  'Seguidores netos por red (si una red queda en 0 tracción sostenida → evaluar eliminarla)',
];

/**
 * PULSO / LIVIANO — el 70%: lectura del plan 96 días + APLICACIÓN DIRECTA (1 post
 * orgánico diario por red). Solo cosas de LIVIANO aquí (PIRQA/Terrenos/Golden tienen
 * su propio horario con su 10%). Facebook = cross-post desde Meta Business Suite.
 */
const FB: RedDia = { red: 'Facebook', nota: 'cross-post Meta Business Suite' };
export const PULSO_PLAN: BrandPlan = {
  marca: 'Pulso / LIVIANO', accent: '#D9BE8A', tiempoDia: '~25-30 min (dictado 5 + revisión 5 + comentarios 15) + lectura 2h del plan 96 días',
  semana: [
    { dia: 'Lun', foco: 'PESO / Liviano — mito vs realidad (GLP-1, insulina)', redes: [
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }, FB] },
    { dia: 'Mar', foco: 'SUEÑO — 1 protocolo accionable (Walker/Panda)', redes: [
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }, FB] },
    { dia: 'Mié', foco: 'HORMONAL / Curva — caso real anónimo + qué medir', redes: [
      { red: 'Instagram', nota: 'VENTANA FUERTE (mié-jue tarde-noche · Buffer/Sprout)', fuerte: true },
      { red: 'TikTok', nota: 'tarde' }, { red: 'YouTube', nota: 'Short' }, FB] },
    { dia: 'Jue', foco: 'MENTAL / FOCO — herramienta CBT o TDAH en 60s', redes: [
      { red: 'Instagram', nota: 'VENTANA FUERTE', fuerte: true },
      { red: 'TikTok', nota: 'tarde' }, { red: 'YouTube', nota: 'Short' }, FB] },
    { dia: 'Vie', foco: 'LO QUE APRENDÍ ESTA SEMANA (del plan 96 días → aplicado)', redes: [
      { red: 'YouTube', nota: 'VENTANA FUERTE Shorts (viernes tarde · Buffer)', fuerte: true },
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }, FB] },
    { dia: 'Sáb', foco: 'PAREJA / Cerca — pregunta frecuente respondida', redes: [
      { red: 'TikTok', nota: 'FUERTE finde (tardes)', fuerte: true }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }, FB] },
    { dia: 'Dom', foco: 'HISTORIA DEL FUNDADOR + recap semanal (StoryBrand: tú eres el guía)', redes: [
      { red: 'TikTok', nota: 'FUERTE finde', fuerte: true }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }, FB],
      extra: '📊 Revisar MÉTRICAS de la semana (checklist) + decidir qué formato repetir/innovar' },
  ],
};

/** PIRQA — post diario + ciclo de venta del finde (sistema actual del fundador) */
export const PIRQA_PLAN: BrandPlan = {
  marca: 'PIRQA · Pachamanca', accent: '#F08A4B', tiempoDia: '~10 min (dictado 3 + revisión 2 + comentarios 5)',
  semana: [
    { dia: 'Lun', foco: 'Detrás de cámaras: la tierra, las piedras, el fuego', redes: [
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Mar', foco: 'Ingrediente andino del día (historia + sabor)', redes: [
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Mié', foco: 'Reacciones de clientes / mesa servida (prueba social)', redes: [
      { red: 'Instagram', nota: 'VENTANA FUERTE', fuerte: true }, { red: 'TikTok', nota: 'tarde' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Jue', foco: 'Anticipación del finde: "este sábado abrimos cupos"', redes: [
      { red: 'Instagram', nota: 'VENTANA FUERTE', fuerte: true }, { red: 'TikTok', nota: 'tarde' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Vie', foco: 'Último empuje pre-lanzamiento (escasez real: 5×8 cupos)', redes: [
      { red: 'YouTube', nota: 'FUERTE Shorts', fuerte: true }, { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }] },
    { dia: 'Sáb', foco: '🚀 12:00 LANZAMIENTO de cupos (app/WhatsApp) + cobertura en vivo', redes: [
      { red: 'TikTok', nota: 'FUERTE finde — en vivo del servicio', fuerte: true }, { red: 'Instagram', nota: 'Stories + Reel' }, { red: 'YouTube', nota: 'Short' }],
      extra: '🚀 Lanzamiento sáb 12:00 → dom · turnos 11:00-16:00' },
    { dia: 'Dom', foco: '💰 DÍA DE VENTA: servicio 11-16 + contenido del servicio en vivo', redes: [
      { red: 'TikTok', nota: 'FUERTE finde', fuerte: true }, { red: 'Instagram', nota: 'Stories' }, { red: 'YouTube', nota: 'Short' }],
      extra: '💰 Venta + última llamada de cupos · al cierre: clip resumen del día' },
  ],
};

/**
 * TERRENOS — 10% del tiempo. Estado real: web YA publicada + publicación en Marketplace
 * (con otra cuenta). Estrategia de venta inmobiliaria (PROPUESTA inicial — ajustable):
 * renovar listados, video-ficha por propiedad, grupos locales, seguimiento WhatsApp,
 * visitas el finde. 13 propiedades.
 */
export const TERRENOS_PLAN: BrandPlan = {
  marca: 'Terrenos', accent: '#8FB6E8', tiempoDia: '~10-15 min (renovar/responder) · visitas el finde',
  semana: [
    { dia: 'Lun', foco: 'Renovar/republicar listados en Marketplace (suben en el feed) + responder TODOS los leads del finde', redes: [
      { red: 'Marketplace', nota: 'renovar 13 propiedades', fuerte: true }, { red: 'WhatsApp', nota: 'responder leads' }] },
    { dia: 'Mar', foco: 'VIDEO-FICHA de UNA propiedad: ubicación, medidas, precio, papeles (rotar las 13)', redes: [
      { red: 'TikTok', nota: 'video-ficha 60s' }, { red: 'Facebook', nota: 'post + Marketplace' }] },
    { dia: 'Mié', foco: 'Seguimiento WhatsApp a interesados (lista viva: nombre, propiedad, etapa)', redes: [
      { red: 'WhatsApp', nota: 'pipeline de venta', fuerte: true }] },
    { dia: 'Jue', foco: 'Publicar en grupos locales de compra-venta (Huancayo/Junín) — 1 propiedad distinta', redes: [
      { red: 'Facebook', nota: 'grupos locales', fuerte: true }] },
    { dia: 'Vie', foco: 'Contenido de confianza: papeles en regla / acceso / servicios de la zona', redes: [
      { red: 'TikTok', nota: 'clip corto' }, { red: 'Facebook', nota: 'post' }] },
    { dia: 'Sáb', foco: '📍 VISITAS presenciales programadas en la semana', redes: [
      { red: 'WhatsApp', nota: 'confirmar visitas', fuerte: true }],
      extra: '📍 Día de visitas — grabar material en el terreno para la semana' },
    { dia: 'Dom', foco: 'Pipeline review: leads → visitas → señas. ¿Qué propiedad empujar la próxima semana?', redes: [
      { red: 'WhatsApp', nota: 'cierre semanal' }],
      extra: '📊 Métricas: leads/propiedad · visitas · ofertas' },
  ],
};

/**
 * GOLDEN RETRIEVER — 10% del tiempo. FASE PRE-LANZAMIENTO (camada en ~2 meses):
 * crear página + documentar a la perrita DESDE YA (la audiencia se construye antes
 * de la venta). Formatos de los referentes verificados (Soul Desire: temas de camada;
 * My Golden Retriever Puppies: video-ficha por cachorro + CTA WhatsApp).
 */
export const GOLDEN_PLAN: BrandPlan = {
  marca: 'Golden Retriever', accent: '#E8C547', tiempoDia: '~10 min (1 clip de la perrita + avance de página)',
  semana: [
    { dia: 'Lun', foco: 'Clip de la perrita: rutina/cuidados (construir audiencia ANTES de la camada)', redes: [
      { red: 'TikTok', nota: 'clip 15-30s' }, { red: 'Instagram', nota: 'Reel' }] },
    { dia: 'Mar', foco: '🛠 AVANCE DE PÁGINA: crear/completar perfil (FB + IG), bio, foto, WhatsApp de contacto', redes: [
      { red: 'Facebook', nota: 'crear página', fuerte: true }, { red: 'Instagram', nota: 'perfil' }] },
    { dia: 'Mié', foco: 'Confianza de comprador: salud, vacunas, pedigrí/padres de la perrita', redes: [
      { red: 'TikTok', nota: 'clip' }, { red: 'Instagram', nota: 'Reel/carrusel' }] },
    { dia: 'Jue', foco: 'Engagement barato: pregunta a la audiencia (¿nombres para la camada?)', redes: [
      { red: 'TikTok', nota: 'pregunta', fuerte: true }, { red: 'Instagram', nota: 'stories' }] },
    { dia: 'Vie', foco: 'Momento tierno del día (formato Tucker/A Guy and A Golden: cotidiano > producido)', redes: [
      { red: 'TikTok', nota: 'FUERTE finde' }, { red: 'Instagram', nota: 'Reel' }] },
    { dia: 'Sáb', foco: 'Clip del finde con la perrita + responder comentarios/DMs', redes: [
      { red: 'TikTok', nota: 'FUERTE finde', fuerte: true }, { red: 'Instagram', nota: 'Reel' }] },
    { dia: 'Dom', foco: 'Lista de espera WhatsApp (interesados pre-camada) + métricas de la semana', redes: [
      { red: 'WhatsApp', nota: 'lista de espera', fuerte: true }],
      extra: '🐾 Al nacer la camada: updates semana a semana → pick day → video-ficha por cachorro + CTA WhatsApp' },
  ],
};

export const BRAND_PLANS: Record<string, BrandPlan> = {
  pulso: PULSO_PLAN, pirqa: PIRQA_PLAN, terrenos: TERRENOS_PLAN, golden: GOLDEN_PLAN,
};
