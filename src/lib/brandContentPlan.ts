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

export interface RedDia { red: 'TikTok' | 'Instagram' | 'YouTube'; nota: string; fuerte?: boolean }
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
  { marca: 'Pulso / LIVIANO', pct: 70, color: '#D9BE8A', estado: 'activo', desc: 'Contenido orgánico diario + estudio 96 días + funnel' },
  { marca: 'PIRQA', pct: 10, color: '#F08A4B', estado: 'activo', desc: 'Post diario · lanzamiento sáb 12:00 → dom (día de venta)' },
  { marca: 'Terrenos', pct: 10, color: '#8FB6E8', estado: 'próximamente', desc: '13 propiedades — espacio reservado (falta link/estructura)' },
  { marca: 'Golden Retriever', pct: 10, color: '#E8C547', estado: 'próximamente', desc: 'Página de cachorros (~2 meses) — espacio reservado' },
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

/** PULSO / LIVIANO — 1 post orgánico diario por red; rotación editorial por vertical */
export const PULSO_PLAN: BrandPlan = {
  marca: 'Pulso / LIVIANO', accent: '#D9BE8A', tiempoDia: '~25-30 min (dictado 5 + revisión 5 + comentarios 15)',
  semana: [
    { dia: 'Lun', foco: 'PESO / Liviano — mito vs realidad (GLP-1, insulina)', redes: [
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Mar', foco: 'SUEÑO — 1 protocolo accionable (Walker/Panda)', redes: [
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Mié', foco: 'HORMONAL / Curva — caso real anónimo + qué medir', redes: [
      { red: 'Instagram', nota: 'VENTANA FUERTE (mié-jue tarde-noche · Buffer/Sprout)', fuerte: true },
      { red: 'TikTok', nota: 'tarde' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Jue', foco: 'MENTAL / FOCO — herramienta CBT o TDAH en 60s', redes: [
      { red: 'Instagram', nota: 'VENTANA FUERTE', fuerte: true },
      { red: 'TikTok', nota: 'tarde' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Vie', foco: 'LO QUE APRENDÍ ESTA SEMANA (del plan 96 días → aplicado)', redes: [
      { red: 'YouTube', nota: 'VENTANA FUERTE Shorts (viernes tarde · Buffer)', fuerte: true },
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }] },
    { dia: 'Sáb', foco: 'PAREJA / Cerca — pregunta frecuente respondida', redes: [
      { red: 'TikTok', nota: 'FUERTE finde (tardes)', fuerte: true }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Dom', foco: 'HISTORIA DEL FUNDADOR + recap semanal (StoryBrand: tú eres el guía)', redes: [
      { red: 'TikTok', nota: 'FUERTE finde', fuerte: true }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }],
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

export const BRAND_PLANS: Record<string, BrandPlan> = { pulso: PULSO_PLAN, pirqa: PIRQA_PLAN };
