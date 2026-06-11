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
  { marca: 'PIRQA', pct: 10, color: '#F08A4B', estado: 'activo', desc: 'Post diario · lanzamiento sáb 12:00 → dom (día de venta) · serie "El destape del domingo"' },
  { marca: 'Terrenos · Casa Soto Tocas', pct: 10, color: '#8FB6E8', estado: 'activo', desc: '13 predios · casasototocas.vercel.app + Marketplace (21 leads en pipeline) · visitas sáb/dom 4pm' },
  { marca: 'Golden · Mantaro Goldens', pct: 10, color: '#E8C547', estado: 'pre-lanzamiento', desc: 'Camada nace ~ago, entrega ~oct · web + lista de espera con seña S/ 500 DESDE YA' },
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

/**
 * PIRQA — post diario + ciclo de venta del finde. AUDITORÍA REAL 11-jun-2026
 * (TikTok 13 seg/10 videos 2-879 vistas · YT 4 subs · IG 26 posts SIN un solo Reel):
 * los 4 tops (779-879 vistas) son hooks de curiosidad/newsjacking, NO venta → duplicar
 * ese patrón. give:ask en IG estaba ~1:11 (invertido) → corregir a 4 gives : 1 ask.
 * Activos a explotar: el DESTAPE (clímax, como La Casita de Ricardo) y la CARA del
 * dueño ("de lunes a viernes soy médico; los domingos hago pachamanca en mi pueblo").
 * No duplicar el mismo mensaje el mismo día (canibaliza). Pausar videos largos 14 min.
 */
export const PIRQA_PLAN: BrandPlan = {
  marca: 'PIRQA · Pachamanca', accent: '#F08A4B', tiempoDia: '~10 min (dictado 3 + revisión 2 + comentarios 5)',
  semana: [
    { dia: 'Lun', foco: 'Detrás de cámaras: la tierra, las piedras, el fuego (GIVE · hook de curiosidad, no venta)', redes: [
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: '⚠ REEL (no flyer) — reusar el TikTok' }, { red: 'YouTube', nota: 'Short <30s' }] },
    { dia: 'Mar', foco: 'Ingrediente andino del día (historia + sabor) + 1 de cada 3 con audio en tendencia', redes: [
      { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Mié', foco: 'CARA DEL DUEÑO: "de lunes a viernes soy médico; los domingos hago pachamanca" (hook incopiable)', redes: [
      { red: 'Instagram', nota: 'VENTANA FUERTE', fuerte: true }, { red: 'TikTok', nota: 'tarde' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Jue', foco: 'Anticipación del finde: "este sábado abrimos cupos" (primer ASK de la semana)', redes: [
      { red: 'Instagram', nota: 'VENTANA FUERTE', fuerte: true }, { red: 'TikTok', nota: 'tarde' }, { red: 'YouTube', nota: 'Short' }] },
    { dia: 'Vie', foco: 'Último empuje pre-lanzamiento (escasez real: 5×8 cupos) + datazo para foodies de Hyo', redes: [
      { red: 'YouTube', nota: 'FUERTE Shorts', fuerte: true }, { red: 'TikTok', nota: 'tarde' }, { red: 'Instagram', nota: 'Reel' }] },
    { dia: 'Sáb', foco: '🚀 12:00 LANZAMIENTO de cupos (app/WhatsApp) + cobertura en vivo', redes: [
      { red: 'TikTok', nota: 'FUERTE finde — en vivo del servicio', fuerte: true }, { red: 'Instagram', nota: 'Stories + Reel' }, { red: 'YouTube', nota: 'Short' }],
      extra: '🚀 Lanzamiento sáb 12:00 → dom · turnos 11:00-16:00' },
    { dia: 'Dom', foco: '💰 DÍA DE VENTA + serie "EL DESTAPE DEL DOMINGO": live 11:00-11:30 + clip 20-30s + reacción del 1er cliente', redes: [
      { red: 'TikTok', nota: 'FUERTE finde — EL DESTAPE', fuerte: true }, { red: 'Instagram', nota: 'Stories + Reel del destape' }, { red: 'YouTube', nota: 'Short' }],
      extra: '💰 Venta + última llamada · al cierre: clip resumen · el destape es EL activo (3 min de humo que valen el viaje)' },
  ],
};

/**
 * TERRENOS · Casa Soto Tocas — 10% del tiempo. VERIFICADO (11-jun-2026): web viva
 * casasototocas.vercel.app, Marketplace con 21 leads (tracker en EmpresaHub→Terrenos,
 * data: terrenosData.ts). Estrategia con base: Hormozi (<5 min, 3 toques, lead magnet
 * checklist legal), Keller 8x8, Blount (bloque de oro 30-45 min/día), Podolsky (carta
 * al vecino colindante), referentes Perú verificados (@yovanahualpa14 formato ficha;
 * Los Portales/Menorca: vender la SEPARACIÓN S/ 500 por Yape y la cuota, no el total).
 * El papel ES el contenido: publicar n° de partida SUNARP e invitar a verificarlo.
 */
export const TERRENOS_PLAN: BrandPlan = {
  marca: 'Terrenos · Casa Soto Tocas', accent: '#8FB6E8', tiempoDia: 'bloque de oro 30-45 min/día (Blount) · visitas sáb/dom 4pm',
  semana: [
    { dia: 'Lun', foco: 'Renovar listados Marketplace (cada ~5 días suben en el feed) + responder TODOS los leads del finde en <5 min', redes: [
      { red: 'Marketplace', nota: 'renovar 13 predios', fuerte: true }, { red: 'WhatsApp', nota: 'responder + actualizar tracker' }] },
    { dia: 'Mar', foco: 'VIDEO-FICHA de UN predio (formato @yovanahualpa14: "Registrado en RRPP" → m² → precio → agua/luz → celular)', redes: [
      { red: 'TikTok', nota: 'video-ficha 60s con precio en pantalla' }, { red: 'Facebook', nota: 'post + Marketplace' }] },
    { dia: 'Mié', foco: 'TOQUE 3 a tibios/calientes: "armo la lista de visitas del sábado, ¿le aparto cupo?" (presupone el sí)', redes: [
      { red: 'WhatsApp', nota: 'pipeline — tracker en la app', fuerte: true }] },
    { dia: 'Jue', foco: 'Confirmar citas + publicar 1 predio en grupo FB "Terrenos Huancayo-Chupaca" (formato ficha)', redes: [
      { red: 'Facebook', nota: 'grupos locales verificados', fuerte: true }, { red: 'WhatsApp', nota: 'confirmaciones' }] },
    { dia: 'Vie', foco: 'Contenido de CONFIANZA: partida SUNARP en cámara + "verifícalo tú mismo" (antídoto al tráfico de tierras) + pin GPS a confirmados', redes: [
      { red: 'TikTok', nota: 'clip papeles' }, { red: 'WhatsApp', nota: 'pin GPS Plaza Huáchac' }] },
    { dia: 'Sáb', foco: '📍 4:00 p.m. VISITAS ESCALONADAS (4:00/4:45/5:30 — que los interesados se crucen) + grabar material', redes: [
      { red: 'WhatsApp', nota: 'reconfirmar AM', fuerte: true }],
      extra: '📍 Open house Hormozi: ruta por sectores, 3-4 predios por visitante, dossier legal impreso' },
    { dia: 'Dom', foco: 'Visitas + pipeline review: ¿cuántas VISITAS se hicieron? (la OMTM) · ¿qué predio empujar?', redes: [
      { red: 'WhatsApp', nota: 'cierre semanal + pedir referidos (convierten 14-30%)' }],
      extra: '📊 OMTM: visitas/finde · no-shows · conversación→visita ≥10% = gate para pensar en ads' },
  ],
};

/**
 * MANTARO GOLDENS — 10% del tiempo. PRE-LANZAMIENTO: madre inseminada ~8-jun-2026 →
 * camada nace ~ago, entrega ~oct. Estrategia verificada de criadores élite EE.UU.
 * (Liberty/Golden Meadows/Summer Brook/Eagleridge): el pilar de confianza son los
 * PADRES (página de la madre con carnet sanitario/vacunas/veterinario), timeline
 * visual de 8 pasos, lista de espera con seña S/ 500 Yape (S/200 no reemb. + S/300
 * reemb. hasta sem 6; elección por orden de seña, regla pública), pupdates semanales,
 * video-llamada para conocer a la madre. Precio verificado Perú: S/ 2,000-2,800 →
 * objetivo S/ 2,500-3,000 con web élite + contrato. Web: D:\mantaro-goldens.
 */
export const GOLDEN_PLAN: BrandPlan = {
  marca: 'Mantaro Goldens', accent: '#E8C547', tiempoDia: '~10 min (1 clip de la perrita + avance de página)',
  semana: [
    { dia: 'Lun', foco: 'Clip de la MADRE: rutina/cuidados (el pilar de confianza son los padres, no los cachorros)', redes: [
      { red: 'TikTok', nota: 'clip 15-30s' }, { red: 'Instagram', nota: 'Reel' }] },
    { dia: 'Mar', foco: '🛠 AVANCE: web mantaro-goldens + perfiles (FB/IG/TikTok @mantarogoldens), bio, WhatsApp 934 173 914', redes: [
      { red: 'Facebook', nota: 'crear página', fuerte: true }, { red: 'Instagram', nota: 'perfil' }] },
    { dia: 'Mié', foco: 'Confianza: carnet sanitario, vacunas, veterinario de la madre EN CÁMARA (versión Perú de health clearances)', redes: [
      { red: 'TikTok', nota: 'clip' }, { red: 'Instagram', nota: 'Reel/carrusel' }] },
    { dia: 'Jue', foco: 'Timeline de la camada: publicar el paso actual (ecografía cuando toque = prueba pública del embarazo)', redes: [
      { red: 'TikTok', nota: 'pregunta/update', fuerte: true }, { red: 'Instagram', nota: 'stories' }] },
    { dia: 'Vie', foco: 'Momento tierno del día (formato Tucker/A Guy and A Golden: cotidiano > producido)', redes: [
      { red: 'TikTok', nota: 'FUERTE finde' }, { red: 'Instagram', nota: 'Reel' }] },
    { dia: 'Sáb', foco: 'Clip del finde + responder DMs → derivar interesados a la LISTA DE ESPERA (seña S/ 500 Yape)', redes: [
      { red: 'TikTok', nota: 'FUERTE finde', fuerte: true }, { red: 'Instagram', nota: 'Reel' }] },
    { dia: 'Dom', foco: 'Lista de espera WhatsApp: video-llamada con la madre para interesados serios + métricas', redes: [
      { red: 'WhatsApp', nota: 'lista de espera + video-llamadas', fuerte: true }],
      extra: '🐾 Timeline 8 pasos: inseminación ✓ → ecografía → nacimiento (~ago) → pupdates semanales → elección sem 6 (orden de seña) → entrega sem 8+ (~oct) con kit: vacunas, contrato, manta con olor de la madre, guía PDF' },
  ],
};

export const BRAND_PLANS: Record<string, BrandPlan> = {
  pulso: PULSO_PLAN, pirqa: PIRQA_PLAN, terrenos: TERRENOS_PLAN, golden: GOLDEN_PLAN,
};
