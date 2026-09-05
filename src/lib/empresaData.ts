/**
 * empresaData.ts
 * ------------------------------------------------------------------
 * Fuente de datos del HUB DE EMPRESA (sección Business) de joseph-md-app.
 * Centro de control de Pulso Health Group + sus líneas (LIVIANO, PIRQA, franquicias).
 *
 * 100% data local — sin backend. El hub consume estos objetos para renderizar
 * el cockpit, la oferta Grand Slam, el estudio de mercado, ventas, logística,
 * los links y las directrices.
 *
 * Origen de los datos: BUSINESS_HUB_LIVIANO/ (oferta maestra Liviano, inventario
 * CRM Pulso, investigación Hormozi / KPIs / competidores).
 *
 * NOTA: los valores marcados (TARGET) o (EST) son objetivos/estimados — LIVIANO
 * está en pre-lanzamiento. Se reemplazan por reales cuando haya ventas.
 *
 * Nota de datos en vivo: el CRM Pulso vive en otra base Supabase
 * (lhpkwfhbqxylkazfrkfb, São Paulo) con RLS por tenant; su anon key pública no
 * devuelve filas y la service_role no puede embeberse en un bundle web público.
 * Por eso el hub se alimenta de esta data estructurada. Un proxy serverless
 * (Expo API route / Vercel function) sería la vía segura para números en vivo.
 * ------------------------------------------------------------------ */

// ===================== TIPOS =====================

export type EstadoEmpresa = 'activa' | 'en_desarrollo' | 'piloto' | 'planeada';
export type Semaforo = 'verde' | 'ambar' | 'rojo' | 'neutro';
export type GrupoKPI = 'ingresos' | 'margen' | 'unit' | 'marketing' | 'retencion' | 'logistica';

export interface KPI {
  key: string;
  label: string;
  valor: string;          // valor formateado para mostrar
  meta?: string;          // objetivo
  semaforo: Semaforo;
  hint?: string;          // fórmula / explicación corta
  grupo: GrupoKPI;
}

export interface SubseccionEmpresa {
  id: string;
  nombre: string;
  icon: string;
  status: string;
  resumen?: string;
}

export interface Empresa {
  id: string;
  nombre: string;
  marca: string;
  icon: string;
  estado: EstadoEmpresa;
  descCorta: string;
  ubicacion: string;
  subsecciones: SubseccionEmpresa[];
}

// ===================== IDENTIDAD DE MARCA (chips/acentos) =====================
// El hub manda en estética (navy + ámbar). Estos colores son metadatos de marca
// usados solo como acento/punto de identidad por empresa (no reskin).

export interface BrandIdentity {
  color: string;   // color de marca original
  bright: string;  // versión aclarada para contraste sobre navy
  emoji: string;
}

export const BRANDS: Record<string, BrandIdentity> = {
  pulso:   { color: '#C6A56B', bright: '#D9BE8A', emoji: '💓' }, // oro latón
  liviano: { color: '#56624B', bright: '#9DB07F', emoji: '⚡' }, // salvia
  pirqa:   { color: '#C45C3F', bright: '#E0856B', emoji: '🍲' }, // terracota
  franquicias: { color: '#8F9097', bright: '#B7B8BD', emoji: '🏷️' },
  terrenos: { color: '#5E7A99', bright: '#8FB6E8', emoji: '🏞️' },
  golden: { color: '#B8923F', bright: '#E8C547', emoji: '🐕' },
};

// ===================== WATCHLIST DEL HOLDING (terminal financiero) =====================
// Cada marca del grupo cotiza como un "ticker" con su madurez (%) y tendencia. Es
// metadato de presentación para el raíl de estado (BrandWatchlist), 100% derivado de
// datos ya existentes. Preserva la jerarquía 70/10/10/10 vía el orden de la lista.
export type TickerTrend = 'up' | 'down' | 'flat';
export interface HoldingTicker {
  id: string;          // id de marca / línea (coincide con el switch de EmpresaHub)
  ticker: string;      // símbolo corto tipo bolsa
  nombre: string;
  emoji: string;
  color: string;       // acento-ticker (bright)
  madurez: number;     // 0-100 → "cotización" de madurez de la línea
  trend: TickerTrend;  // ▲ acelera · ▼ estancada · ● estable
  estado: string;      // etiqueta corta de estado
  spark: number[];     // micro-sparkline de madurez (ilustrativo)
}

// Orden = jerarquía de importancia (Pulso índice primero, luego 70/10/10/10).
export const HOLDING_WATCHLIST: HoldingTicker[] = [
  { id: 'pulso',    ticker: 'PLS',  nombre: 'Pulso Health Group', emoji: '💓', color: '#D9BE8A', madurez: 18, trend: 'up',   estado: 'ÍNDICE',        spark: [10, 12, 13, 15, 16, 17, 18] },
  { id: 'liviano',  ticker: 'LVN',  nombre: 'LIVIANO',            emoji: '⚡', color: '#9DB07F', madurez: 65, trend: 'up',   estado: 'PRE-LANZA',     spark: [40, 46, 52, 55, 59, 62, 65] },
  { id: 'aurum',    ticker: 'AUR',  nombre: 'AURUM · Closer',     emoji: '🪙', color: '#E6C868', madurez: 4,  trend: 'up',   estado: 'CLOSER DESK',   spark: [0, 0, 1, 2, 2, 3, 4] },
  { id: 'pirqa',    ticker: 'PRQ',  nombre: 'PIRQA',              emoji: '🍲', color: '#E0856B', madurez: 100,trend: 'flat', estado: 'EN PRODUCCIÓN', spark: [96, 97, 98, 99, 100, 100, 100] },
  { id: 'terrenos', ticker: 'TERR', nombre: 'Casa Soto Tocas',   emoji: '🏞️', color: '#8FB6E8', madurez: 48, trend: 'up',   estado: 'VENTA ACTIVA',  spark: [30, 34, 38, 41, 44, 46, 48] },
  { id: 'golden',   ticker: 'GLD',  nombre: 'Qori Golden',        emoji: '🐕', color: '#E8C547', madurez: 22, trend: 'up',   estado: 'PRE-LANZA',     spark: [8, 10, 13, 16, 18, 20, 22] },
];

// ===================== GRUPO MATRIZ =====================

export const PULSO_GROUP = {
  nombre: 'Pulso Health Group',
  founder: 'Dr. Joseph Soto Tocas',
  base: 'Huancayo / Junín, Perú',
  tesis: 'Holding de salud DTC multi-marca. Liviano es el programa ancla; cada línea reutiliza el mismo CRM, plataforma y motor de IA.',
  crmUrl: 'https://pulso-crm.vercel.app',
} as const;

export const PULSO_MATRIZ = {
  ...PULSO_GROUP,
  marcas: [
    { id: 'liviano', nombre: 'LIVIANO', desc: 'Programa médico GLP-1 (ancla)', estado: 'en_desarrollo' as EstadoEmpresa },
    { id: 'pirqa',   nombre: 'PIRQA',   desc: 'Gastronomía andina (en producción)', estado: 'activa' as EstadoEmpresa },
    { id: 'franquicias', nombre: 'Franquicias', desc: 'Líneas futuras (reservadas)', estado: 'planeada' as EstadoEmpresa },
  ],
  kpisConsolidados: [
    { label: 'Marcas activas', valor: '1' },
    { label: 'En desarrollo', valor: '1' },
    { label: 'Plataforma', valor: 'CRM único' },
    { label: 'Motor', valor: 'IA + Supabase' },
  ],
  pilares: [
    { titulo: 'Plataforma compartida', desc: 'Un solo CRM multi-tenant (WhatsApp → OCR → pago → ficha) sirve a todas las líneas.' },
    { titulo: 'Motor de IA', desc: 'Gemini clasifica intención, extrae datos de reserva y lee comprobantes Yape/Plin.' },
    { titulo: 'Liviano como ancla', desc: 'El programa GLP-1 financia la expansión; las demás líneas reutilizan su infraestructura.' },
  ],
} as const;

// ===================== EMPRESAS / LÍNEAS =====================
// Liviano = detallada. PIRQA = real (gastronomía). Franquicias = solo nombre (placeholder).

export const EMPRESAS: Empresa[] = [
  {
    id: 'liviano',
    nombre: 'LIVIANO',
    marca: 'Liviano · Pulso Health',
    icon: '⚡',
    estado: 'en_desarrollo',
    descCorta: 'Programa médico de control de peso (GLP-1) por suscripción. Categoría de uno en Huancayo.',
    ubicacion: 'Huancayo, Perú → expansión LATAM',
    subsecciones: [
      { id: 'cockpit',    nombre: 'Cockpit / KPIs',        icon: '📊', status: 'Pre-lanzamiento', resumen: 'Ventas, flujo, gasto bruto/neto, CAC, LTV, márgenes de un vistazo.' },
      { id: 'oferta',     nombre: 'Oferta (Grand Slam)',   icon: '🎯', status: 'Definida v1.0',    resumen: 'Value stack S/6,360 vs precio S/3,870 (3m). 20+ bonos, 4 garantías.' },
      { id: 'marketing',  nombre: 'Marketing & Estudio',   icon: '📣', status: 'Orgánico fase 0',   resumen: 'Qué afiche funciona: CPM, CTR, hook rate, CPL, CAC por creativo.' },
      { id: 'ventas',     nombre: 'Ventas & Adquisición',  icon: '💰', status: 'Core Four',         resumen: 'Pipeline, métodos de adquisición, conversión consulta→programa.' },
      { id: 'logistica',  nombre: 'Logística & GLP-1',     icon: '📦', status: 'Cotización pend.',   resumen: 'Abastecimiento semaglutida/tirzepatida, cadena de frío, costo/orden.' },
      { id: 'web',        nombre: 'Web & Links',           icon: '🌐', status: 'CRM activo',         resumen: 'Mapa de páginas y todos los links (paciente/médico/magic/QR).' },
      { id: 'directrices',nombre: 'Directrices & Tips',    icon: '🧠', status: 'Hormozi + benchmarks',resumen: 'Reglas de oferta, leads y operación. Investigación destilada.' },
    ],
  },
  {
    id: 'pirqa',
    nombre: 'PIRQA',
    marca: 'PIRQA · Pachamanca',
    icon: '🍲',
    estado: 'activa',
    descCorta: 'Experiencia gastronómica andina (pachamanca). Primer tenant en producción: WhatsApp→OCR→comprobante.',
    ubicacion: 'Huáchac, Junín',
    subsecciones: [
      { id: 'cockpit',   nombre: 'Cockpit / KPIs',  icon: '📊', status: 'En producción', resumen: 'Reservas, ocupación de turnos, ticket, adelantos Yape/Plin.' },
      { id: 'ventas',    nombre: 'Reservas',        icon: '📅', status: 'Activo',         resumen: '5 turnos × 8 cupos, sáb/dom 11–16h.' },
      { id: 'web',       nombre: 'Web & Links',     icon: '🌐', status: 'Vercel',         resumen: 'wa.me + portal de reserva + comprobante PNG.' },
    ],
  },
  // ── Franquicias / líneas futuras: SOLO NOMBRE (rellenar cuando se definan) ──
  { id: 'franq_1', nombre: '[FRANQUICIA 2]', marca: '[definir]', icon: '🏷️', estado: 'planeada', descCorta: 'Nombre reservado — estructurar más adelante.', ubicacion: '[definir]', subsecciones: [] },
  { id: 'franq_2', nombre: '[FRANQUICIA 3]', marca: '[definir]', icon: '🏷️', estado: 'planeada', descCorta: 'Nombre reservado — estructurar más adelante.', ubicacion: '[definir]', subsecciones: [] },
  { id: 'franq_3', nombre: '[FRANQUICIA 4]', marca: '[definir]', icon: '🏷️', estado: 'planeada', descCorta: 'Nombre reservado — estructurar más adelante.', ubicacion: '[definir]', subsecciones: [] },
];

// ===================== COCKPIT KPIs (LIVIANO) =====================
// Semáforo: verde=meta, ambar=atención, rojo=crítico, neutro=sin dato aún.

export const LIVIANO_KPIS: KPI[] = [
  // Ingresos
  { key: 'mrr',        label: 'MRR',                 valor: 'S/ 0 (EST)',   meta: 'S/ 5,160 (4 fundadores)', semaforo: 'neutro', grupo: 'ingresos', hint: 'Ingreso recurrente mensual = Σ suscripciones activas' },
  { key: 'ventas_mes', label: 'Ventas / mes',        valor: 'S/ 0',         meta: '4 altas/mes',             semaforo: 'neutro', grupo: 'ingresos', hint: 'Nuevas suscripciones del mes' },
  { key: 'ticket',     label: 'Ticket (Despegue)',   valor: 'S/ 1,290',     meta: 'S/ 1,290',                semaforo: 'verde',  grupo: 'ingresos', hint: 'Precio fase 1 (Fundador S/ 1,190)' },
  { key: 'ltv',        label: 'LTV',                 valor: 'S/ 18,700+',   meta: '≥ S/ 18,000',             semaforo: 'verde',  grupo: 'ingresos', hint: '1290×3 + 1090×3 + 890×6 + 790… (~18m)' },
  // Margen / caja
  { key: 'margen_desp',label: 'Margen Despegue',     valor: '~57%',         meta: '> 55%',                   semaforo: 'verde',  grupo: 'margen',   hint: 'Margen fase 1; depende del costo magistral' },
  { key: 'flujo_neto', label: 'Flujo neto / mes',    valor: 'S/ 0 (EST)',   meta: '> 0',                     semaforo: 'neutro', grupo: 'margen',   hint: 'Ingresos − gasto neto (net burn invertido)' },
  { key: 'gasto_bruto',label: 'Gasto bruto / mes',   valor: 'S/ 0 (EST)',   meta: '—',                       semaforo: 'neutro', grupo: 'margen',   hint: 'Producto + ads + plataforma + consulta + envío' },
  { key: 'cogs',       label: 'COGS GLP-1 / mes',    valor: 'PENDIENTE',    meta: 'Cotizar Sterilelabs',     semaforo: 'rojo',   grupo: 'margen',   hint: 'Variable #1 del margen — confirmar costo magistral' },
  // Unit economics
  { key: 'cac',        label: 'CAC',                 valor: 'S/ 0 (EST)',   meta: '< S/ 1,290 (≤1 mes pago)',semaforo: 'neutro', grupo: 'unit',     hint: 'Gasto adquisición / clientes nuevos' },
  { key: 'ltv_cac',    label: 'LTV : CAC',           valor: '—',            meta: '≥ 3 : 1 (6:1 ideal)',     semaforo: 'neutro', grupo: 'unit',     hint: 'Salud del negocio; toque clínico apunta a 6:1' },
  { key: 'payback',    label: 'CAC payback',         valor: '—',            meta: '< 1 mes',                 semaforo: 'neutro', grupo: 'unit',     hint: 'Meses para recuperar el CAC' },
  // Marketing
  { key: 'cpl',        label: 'CPL',                 valor: 'S/ 0',         meta: '< S/ 30',                 semaforo: 'neutro', grupo: 'marketing',hint: 'Costo por lead' },
  { key: 'conv_eval',  label: 'Conv. consulta→prog.',valor: '0%',          meta: '> 40%',                   semaforo: 'neutro', grupo: 'marketing',hint: 'El motor: optimizar esta conversión, no el precio de consulta' },
  { key: 'roas',       label: 'ROAS',                valor: '—',            meta: '> 3x',                    semaforo: 'neutro', grupo: 'marketing',hint: 'Ingresos / gasto en ads' },
  // Retención
  { key: 'churn',      label: 'Churn mensual',       valor: '—',            meta: '< 8%',                    semaforo: 'neutro', grupo: 'retencion',hint: 'Cancelaciones / activos; prepago anual lo reduce' },
  { key: 'permanencia',label: 'Permanencia media',   valor: '—',            meta: '≥ 12 meses',             semaforo: 'neutro', grupo: 'retencion',hint: 'GLP-1 es tratamiento de largo plazo' },
  // Logística
  { key: 'stock',      label: 'Stock GLP-1',         valor: '—',            meta: 'sin quiebres',           semaforo: 'neutro', grupo: 'logistica',hint: 'Inventario magistral; cadena de frío' },
  { key: 'costo_orden',label: 'Costo por orden',     valor: '—',            meta: '—',                       semaforo: 'neutro', grupo: 'logistica',hint: 'Producto + dispensación + envío' },
];

export const KPI_GRUPOS: { id: GrupoKPI; label: string }[] = [
  { id: 'ingresos',  label: 'Ingresos' },
  { id: 'margen',    label: 'Margen & Caja' },
  { id: 'unit',      label: 'Unit Economics' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'retencion', label: 'Retención' },
  { id: 'logistica', label: 'Logística' },
];

// ===================== OFERTA GRAND SLAM (LIVIANO) =====================

export const LIVIANO_OFERTA = {
  tesis: 'Por una fracción del costo de una cirugía bariátrica, sin bisturí, sin hospitalización y de forma reversible: transformación médica guiada con GLP-1.',
  ancla: { nombre: 'Cirugía bariátrica (Perú)', costo: 'S/ 15,000 – 45,000', vs: 'LIVIANO: ~S/ 3,870 los 3 meses' },

  escaleraPrecios: [
    { fase: 'Despegue',       meses: '1–3',  precioMes: 'S/ 1,290', acompanamiento: '4 sesiones/mes', margen: '~57%' },
    { fase: 'Progreso',       meses: '4–6',  precioMes: 'S/ 1,090', acompanamiento: '2 sesiones/mes', margen: '~50%' },
    { fase: 'Consolidación',  meses: '7–12', precioMes: 'S/ 890',   acompanamiento: '1 sesión/mes',   margen: '~40%' },
    { fase: 'Mantenimiento',  meses: '12+',  precioMes: 'S/ 790',   acompanamiento: 'Control trim.',  margen: '~50%' },
    { fase: 'Plataforma/Alumni', meses: 'opc', precioMes: 'S/ 99',  acompanamiento: 'Si deja fármaco',margen: '~95%' },
  ],

  tiers: [
    { nombre: 'Fundador (primeros 4)', precio: 'S/ 1,190/mes', nota: 'A cambio de testimonios y antes/después' },
    { nombre: 'Estándar',              precio: 'S/ 1,290/mes', nota: 'Oferta base' },
    { nombre: 'Concierge (top)',       precio: 'S/ 1,590/mes', nota: 'Toque ampliado + NÍTIDA; margen ~68%' },
    { nombre: 'Tirzepatida',           precio: 'S/ 1,690/mes', nota: 'Resultado más marcado' },
    { nombre: 'Prepago anual',         precio: 'bloquea tarifa + bono', nota: 'Money model: caja por adelantado, elimina churn' },
  ],

  valueStack: {
    bonosRecurrentes3m: 'S/ 1,890',
    bonosInicio: 'S/ 870',
    subtotalBonos: 'S/ 2,760',
    medicamento3m: 'S/ 3,600',
    valorTotalPercibido: 'S/ 6,360',
    precio3m: 'S/ 3,870',
    cierre: 'El fármaco solo cuesta ~S/ 3,600 en farmacia. Pagas S/ 3,870 y recibes ~S/ 6,360 (fármaco + S/ 2,760 en bonos).',
  },

  // 20+ bonos en 3 grupos (cada uno mata una objeción)
  bonos: {
    anunciados: [
      { nombre: 'Cocina Liviana Andina', mata: 'No sé qué comer', valor: 'S/ 600' },
      { nombre: 'Recetario 30 Comidas Huanca', mata: 'Variedad', valor: 'S/ 200' },
      { nombre: 'Lista de Compras Automática', mata: 'No tengo tiempo', valor: 'S/ 150' },
      { nombre: 'Movimiento 15 (15 min en casa)', mata: 'No tengo gym', valor: 'S/ 400' },
      { nombre: 'Preserva tu Músculo', mata: 'Resultado/salud', valor: 'S/ 200' },
      { nombre: 'Escudo Anti-Náuseas', mata: 'Miedo al GLP-1', valor: 'S/ 250' },
      { nombre: 'Klotho 24/7 (coach IA)', mata: 'Miedo/tiempo', valor: 'S/ 400' },
      { nombre: 'Tablero de Progreso Pulso', mata: '¿Funcionará?', valor: 'S/ 200' },
      { nombre: 'Seguimiento / check-in', mata: 'Accountability', valor: 'S/ 300' },
    ],
    reserva: [
      { nombre: 'InBody de partida + foto clínica', mata: 'Demuéstrame', valor: 'S/ 120' },
      { nombre: 'Kit de Bienvenida + báscula', mata: 'Reciprocidad', valor: 'S/ 150' },
      { nombre: 'Círculo Liviano (comunidad)', mata: 'Soledad', valor: 'S/ 300' },
      { nombre: 'Sesión para la pareja/familia', mata: 'Consultarlo', valor: 'S/ 200' },
      { nombre: 'Comer en pollada/fiestas sin culpa', mata: 'Como fuera', valor: 'S/ 100' },
      { nombre: 'Guía de restaurantes Huancayo', mata: 'Salgo seguido', valor: 'S/ 100' },
      { nombre: 'Titulación inteligente supervisada', mata: 'Seguridad', valor: 'S/ 300' },
    ],
    sorpresa: [
      { nombre: 'Primeras 48h sin hambre', mata: 'Victoria rápida', valor: 'S/ 150' },
      { nombre: 'Labs de control trimestrales', mata: 'Confianza médica', valor: 'S/ 200' },
      { nombre: 'Caminatas Huancayo 3,200 msnm', mata: 'Adherencia', valor: 'S/ 80' },
      { nombre: 'Reto mensual con premios', mata: 'Retención', valor: 'S/ 100' },
      { nombre: 'Blindaje Anti-Rebote', mata: '¿Y si lo recupero?', valor: 'S/ 500' },
      { nombre: 'Plan de salida gradual', mata: 'Miedo largo plazo', valor: 'S/ 250' },
      { nombre: 'Bono NÍTIDA (piel)', mata: 'LTV / cross-sell', valor: 'S/ 150' },
      { nombre: 'Bono DENSA (capilar)', mata: 'LTV / cross-sell', valor: 'S/ 150' },
    ],
  },

  garantias: [
    { nombre: 'Experiencia',    tipo: 'Incondicional (sobre el honorario)', promesa: 'Si tu Evaluación Integral no es la mejor evaluación médica que has tenido, te devolvemos la consulta.' },
    { nombre: 'Acompañamiento', tipo: 'Condicional + desempeño',            promesa: 'Si cumples el protocolo y a los 90 días tu InBody no muestra cambio, te acompañamos sin costo de honorarios hasta lograrlo.' },
    { nombre: 'Anti-Susto',     tipo: 'De servicio',                        promesa: 'Empezamos con dosis baja y titulamos. Si el medicamento no te cae bien, ajustamos sin costo extra.' },
    { nombre: 'Límite honesto', tipo: 'Anti-garantía',                      promesa: 'No devolvemos el medicamento (fármaco real dispensado). Garantizamos servicio y compromiso.' },
  ],

  objeciones: [
    { dice: 'Está caro', desactiva: 'Anclar al fármaco solo y a la cirugía; plan de pago mensual' },
    { dice: 'No tengo tiempo', desactiva: 'Plan en piloto automático + 15 min en casa' },
    { dice: 'Ya intenté de todo', desactiva: 'Antes/después de cohorte + el fármaco que sí mueve la aguja + garantía' },
    { dice: '¿Y los efectos?', desactiva: 'Titulación médica + protocolo anti-náuseas + Garantía Anti-Susto' },
    { dice: 'Lo consulto con mi pareja', desactiva: 'Sesión para la pareja; convertirla en aliada' },
    { dice: 'Lo pienso', desactiva: 'Escasez real (4 cupos) + tarifa Fundador con fecha límite' },
  ],
};

// ===================== ESTUDIO DE MERCADO (creativos) =====================
// Estructura para "qué afiche funciona". Filas = placeholder hasta tener ads vivos.

export interface Creativo {
  nombre: string; canal: string; impresiones: number; ctr: string;
  hookRate: string; cpl: string; cac: string; estado: 'ganador' | 'prueba' | 'matar';
}
export const ESTUDIO_MERCADO: Creativo[] = [
  { nombre: '[Afiche A — Ancla bariátrica]', canal: 'Meta', impresiones: 0, ctr: '—', hookRate: '—', cpl: '—', cac: '—', estado: 'prueba' },
  { nombre: '[Afiche B — Antes/después]',    canal: 'Meta', impresiones: 0, ctr: '—', hookRate: '—', cpl: '—', cac: '—', estado: 'prueba' },
  { nombre: '[Reel — Testimonio fundador]',  canal: 'TikTok', impresiones: 0, ctr: '—', hookRate: '—', cpl: '—', cac: '—', estado: 'prueba' },
];

// Reglas kill / scale y cascada de evaluación del creativo.
export const MARKETING_REGLAS = {
  kill:  'CTR < 0.8% en feed (tras volumen mínimo) → matar, sin importar el CPL.',
  scale: 'CPL/CAC bajo objetivo y estable → ganador → escalar +20–30% cada 48–72 h.',
  prueba: 'CTR > 1.5% pero CPL alto → probar otra landing/oferta antes de descartar.',
  minimo: '~500 impresiones por creativo y ~7 días antes de juzgar.',
  cascada: [
    { paso: 'CPM', meta: 'distribución barata' },
    { paso: 'Hook rate', meta: '> 30%' },
    { paso: 'Hold rate', meta: 'retiene' },
    { paso: 'CTR (frío)', meta: '> 1.5%' },
    { paso: 'CPL', meta: 'lead barato' },
    { paso: 'CAC por creativo', meta: 'el juez final' },
  ],
};

// Benchmarks de competidores de élite (telesalud GLP-1).
export const COMPETIDORES = [
  { nombre: 'Hims & Hers', emoji: '👑', precio: 'desde ~$199/mes (all-in)', modelo: 'Suscripción multi-categoría', dif: 'Máquina de marketing + cross-sell + farmacia 503B propia', escala: '$1.48B (2024) · MB ~73%' },
  { nombre: 'LillyDirect', emoji: '🏭', precio: '$299–449/mes', modelo: 'Fabricante DTC self-pay', dif: 'Precio de marca imbatible (es el fabricante)', escala: 'Walmart pickup' },
  { nombre: 'NovoCare',    emoji: '🏭', precio: '$199 intro → $349', modelo: 'Fabricante DTC self-pay', dif: 'Oferta introductoria + Wegovy oral', escala: 'Marca dominante' },
  { nombre: 'Ro Body',     emoji: '⚡', precio: '$39 1er mes (membresía)', modelo: 'Membresía separada del fármaco', dif: 'Evaluación asíncrona <10 min, elegible en ~2 días', escala: 'Duopolio c/ Hims' },
  { nombre: 'Mochi Health',emoji: '🍡', precio: '$99 sema / $199 tirze', modelo: 'Compounding tarifa plana', dif: 'Precio plano sin importar la dosis', escala: 'Anti-ansiedad de dosis' },
  { nombre: 'Calibrate',   emoji: '⚖️', precio: '$199/mes (anual)', modelo: 'Programa metabólico premium', dif: 'Garantía de pérdida del 10% (devolución)', escala: 'Compromiso anual' },
];

// ===================== VENTAS & ADQUISICIÓN (LIVIANO) =====================

export const LIVIANO_VENTAS = {
  motor: 'La palanca no es bajar el precio de la consulta: es optimizar la conversión consulta→programa (>40%) y subir el LTGP para poder gastar más en CAC y ganar la subasta.',
  rule100: 'Rule of 100 — 100 acciones primarias/día durante 100 días. Orgánico (Core 1 + 2) ANTES de pagar (Core 4). El orgánico es tu laboratorio.',

  coreFour: [
    { n: 1, nombre: 'Warm Outreach', tipo: '1-a-1 · Caliente', regla: '100 contactos/día', orden: 'arranque',
      detalle: 'Tu red: contactos, ex-pacientes, WhatsApp. Guion ACA (Acknowledge, Compliment, Ask). Da valor primero. Empieza AQUÍ.' },
    { n: 2, nombre: 'Post Free Content', tipo: '1-a-muchos · Caliente', regla: '100 min/día', orden: 'arranque',
      detalle: 'Educa, entretiene, inspira. El hook es lo más importante. La AUDIENCIA es el activo que compone.' },
    { n: 3, nombre: 'Cold Outreach', tipo: '1-a-1 · Frío', regla: '100 mensajes/día', orden: 'despues',
      detalle: 'Personaliza el primer mensaje + ofrece el lead magnet (quiz), no la venta directa.' },
    { n: 4, nombre: 'Paid Ads', tipo: '1-a-muchos · Frío', regla: '$100/día', orden: 'despues',
      detalle: 'El acelerador. Solo con oferta validada + prueba social. Gancho → retención → CTA al quiz.' },
  ],

  leadMagnets: [
    { nombre: 'Quiz "¿Eres candidato para GLP-1?"', rol: 'Cualifica clínicamente + captura el lead + da el primer paso', estrella: true },
    { nombre: 'Consulta de elegibilidad gratuita',  rol: 'Alta probabilidad percibida + bajo esfuerzo', estrella: true },
    { nombre: 'Guía "7 errores al perder peso después de los 35"', rol: 'Revela el problema que LIVIANO resuelve', estrella: false },
    { nombre: 'Calculadora de peso objetivo y tiempo', rol: 'Muestra el dream outcome cuantificado', estrella: false },
  ],

  embudo: [
    { etapa: 'Lead', desc: 'Clic / quiz iniciado', meta: 'volumen' },
    { etapa: 'Engaged lead', desc: 'Deja contacto (WhatsApp/email)', meta: 'capturar' },
    { etapa: 'Consulta / evaluación', desc: 'Agenda la Evaluación Integral', meta: 'agendar' },
    { etapa: 'Programa (alta)', desc: 'Inicia fase Despegue', meta: '> 40%' },
  ],

  moneyModel: [
    { etapa: 'Atracción', oferta: '1er mes Fundador + consulta gratis', objetivo: 'Bajar la barrera de entrada' },
    { etapa: 'Upsell', oferta: 'Concierge / Tirzepatida / paquete trimestral', objetivo: 'Más caja, más rápido (financia el CAC)' },
    { etapa: 'Downsell', oferta: 'Plan de pagos / solo seguimiento', objetivo: 'Recuperar la venta perdida' },
    { etapa: 'Continuidad', oferta: 'Suscripción + mantenimiento + Alumni S/ 99', objetivo: 'Maximizar el LTV' },
  ],
};

// ===================== LOGÍSTICA & GLP-1 (LIVIANO) =====================

export const LIVIANO_LOGISTICA = {
  modelos: [
    { nombre: 'Marca (branded)',          costo: 'Alto', margen: 'Fino',   riesgo: 'Bajo',
      nota: 'Semaglutida/tirzepatida original vía distribuidor autorizado. El camino de cumplimiento más limpio.' },
    { nombre: 'Magistral (compounding)',  costo: 'Accesible', margen: 'Amplio', riesgo: 'Alto (regulatorio)',
      nota: 'Farmacia licenciada con certificado de análisis por lote. NUNCA mercado gris. Ventaja temporal, no cimiento.' },
  ],
  cadenaFrio: [
    'Refrigeración 2–8 °C extremo a extremo (empaque térmico + geles refrigerantes).',
    'Temperature logging y validación de excursiones de temperatura.',
    'FEFO (first-expired-first-out): trazabilidad por lote y vencimiento.',
    'Forecast de inventario atado al pipeline de ads: si Growth escala, Supply debe tener stock.',
  ],
  estructuraCostos: [
    { componente: 'Producto (fármaco)',       pct: '25–45%', nota: 'La palanca #1 del margen (marca ≫ magistral)' },
    { componente: 'Dispensación / farmacia',  pct: '5–15%',  nota: 'Formulación, vial, etiquetado' },
    { componente: 'Consulta médica',          pct: '5–15%',  nota: 'Asíncrona < síncrona en costo' },
    { componente: 'Envío + cadena de frío',   pct: '5–15%',  nota: 'Refrigerado encarece' },
    { componente: 'Plataforma / pagos',       pct: '2–8%',   nota: 'CRM, e-prescribing, pasarela' },
  ],
  cogsTotal: '~45–70% del precio',
  margenBruto: '~30–55% (antes de marketing)',
  filosofia: 'Un margen grande no es para ganar más por venta: es munición para hacer ofertas que el competidor no puede igualar. Cada sol que baja el COGS se reinvierte en oferta y adquisición.',
};

// ===================== PENDIENTES CRÍTICOS (riesgos) =====================
// v2 (sep-2026): los 2 pendientes ROJOS (abiertos desde jun-2026 sin dueño) pasan a TAREAS con
// dueño, día del plan LIVIANO Academia (Módulo 7 · Acceso en Perú) y salida verificable
// (fila en LIVIANO_ACCESO_PERU). Las fechas son las del plan v5.6 (D1 = lun 7-sep-2026): si el
// plan se corre con remap_inicio.js, manda `planDia` (la fecha se resuelve contra LIV_DIAS).
export interface PendienteLiviano {
  titulo: string; detalle: string; nivel: Semaforo;
  dueno?: string;      // quién cierra la tarea
  planDia?: number;    // día del plan LIVIANO Academia en que se ejecuta
  fecha?: string;      // fecha límite (plan v5.6) — se recalcula si el plan se corre
  salida?: string;     // entregable verificable que cierra el pendiente
}
export const LIVIANO_PENDIENTES: PendienteLiviano[] = [
  { titulo: 'Cotización Sterilelabs', detalle: 'Confirmar costo magistral mensual (variable #1 del margen) con certificado de análisis por lote.', nivel: 'rojo',
    dueno: 'Joseph', planDia: 43, fecha: 'mié 4-nov-2026 (D43 · Módulo 7 día 4)',
    salida: 'Cotización escrita y fechada → columna "costo LIVIANO" de la fila magistral en LIVIANO_ACCESO_PERU + KPI COGS del Cockpit' },
  { titulo: 'Legalidad DIGEMID', detalle: 'Registro sanitario de semaglutida/tirzepatida + legalidad del magistral de molécula comercial — verificar con QF y abogado de salud antes de escalar.', nivel: 'rojo',
    dueno: 'Joseph + QF y abogado de salud (nombres A VERIFICAR)', planDia: 39, fecha: 'jue 29-oct → mié 4-nov-2026 (D39-D43)',
    salida: 'Columnas "registro" y "condición" de LIVIANO_ACCESO_PERU con captura fechada del portal DIGEMID; dictamen escrito sobre el magistral' },
  { titulo: 'Seguridad del producto', detalle: 'Solo farmacia licenciada con certificado de análisis por lote; nunca mercado gris.', nivel: 'ambar',
    dueno: 'Joseph', planDia: 43, fecha: 'mié 4-nov-2026 (D43)', salida: 'Regla escrita en LIVIANO_PROTOCOLO_CLINICO_v1 · anexo Acceso' },
  { titulo: 'Revisión legal de publicidad', detalle: 'Garantías y claims (CMP Art. 73; no prometer cifras de pérdida de peso).', nivel: 'ambar',
    dueno: 'Joseph + abogado (A VERIFICAR)', salida: 'Checklist de claims aprobados antes del primer anuncio pagado' },
  { titulo: 'Comunidad a escala', detalle: 'Activar al sembrar varias cohortes (no funciona con 4 personas).', nivel: 'neutro' },
];

// ===================== ACCESO EN PERÚ (Módulo 7 de LIVIANO Academia) =====================
// Tabla de VERIFICACIÓN con regla anti-alucinación: ninguna celda se rellena sin fuente primaria
// (captura fechada del portal público de DIGEMID, cotización escrita de farmacia, dictamen de QF /
// abogado). Hasta entonces cada celda dice "PENDIENTE DE VERIFICACIÓN". Se produce en los días
// D39-D44 del plan (29-oct → 5-nov-2026, v5.6) y se re-verifica en cada REVISIÓN TRIMESTRAL.
export type EstadoVerificacion = 'PENDIENTE DE VERIFICACIÓN' | 'VERIFICADO' | 'SIN REGISTRO HALLADO';
export interface AccesoPeruFila {
  molecula: string;          // molécula + marca de referencia (la marca en Perú se confirma en el registro)
  presentacion: string;      // pluma / tableta / vial — según registro
  registro: string;          // nº de registro sanitario DIGEMID + titular + vigencia, o PENDIENTE DE VERIFICACIÓN
  condicion: string;         // condición de venta según el registro (con receta / receta retenida) — A VERIFICAR
  precioFarmacia: string;    // S/ por presentación — 2 cotizaciones fechadas (cadena + independiente)
  costoLiviano: string;      // costo por paciente-mes para LIVIANO (marca o magistral)
  fechaVerificacion: string; // última verificación (dd-mmm-aaaa) o '—'
  estado: EstadoVerificacion;
  semaforo: Semaforo;
  fuente: string;            // dónde se verifica
  nota?: string;
}
const PEND = 'PENDIENTE DE VERIFICACIÓN';
export const LIVIANO_ACCESO_PERU: AccesoPeruFila[] = [
  { molecula: 'Semaglutida 2,4 mg (marca de referencia: Wegovy)', presentacion: 'Pluma SC semanal (A VERIFICAR)', registro: PEND, condicion: PEND, precioFarmacia: PEND, costoLiviano: PEND, fechaVerificacion: '—', estado: 'PENDIENTE DE VERIFICACIÓN', semaforo: 'rojo',
    fuente: 'Portal público de registros sanitarios DIGEMID (URL A VERIFICAR) · 2 cotizaciones de farmacia fechadas', nota: 'Cifra ancla STEP 1 −14,9 %. Base del tier Estándar (S/ 1,290/mes).' },
  { molecula: 'Semaglutida oral (marca de referencia: Wegovy tabletas, FDA dic-2025)', presentacion: 'Tableta (A VERIFICAR)', registro: PEND, condicion: PEND, precioFarmacia: PEND, costoLiviano: PEND, fechaVerificacion: '—', estado: 'PENDIENTE DE VERIFICACIÓN', semaforo: 'rojo',
    fuente: 'Portal DIGEMID (URL A VERIFICAR) · cotizaciones', nota: 'Puede no existir aún registro en Perú: si no aparece se escribe "SIN REGISTRO HALLADO (fecha)".' },
  { molecula: 'Tirzepatida (marca de referencia: Mounjaro / Zepbound)', presentacion: 'Pluma SC semanal (A VERIFICAR)', registro: PEND, condicion: PEND, precioFarmacia: PEND, costoLiviano: PEND, fechaVerificacion: '—', estado: 'PENDIENTE DE VERIFICACIÓN', semaforo: 'rojo',
    fuente: 'Portal DIGEMID (URL A VERIFICAR) · cotizaciones', nota: 'Base del tier Tirzepatida (S/ 1,690/mes). SURMOUNT-1 −20,9 %.' },
  { molecula: 'Semaglutida MAGISTRAL (Sterilelabs)', presentacion: 'Vial (A VERIFICAR)', registro: 'No aplica registro de producto: legalidad del preparado magistral de molécula comercial — dictamen QF + abogado (A VERIFICAR)', condicion: PEND, precioFarmacia: 'n/a', costoLiviano: PEND, fechaVerificacion: '—', estado: 'PENDIENTE DE VERIFICACIÓN', semaforo: 'rojo',
    fuente: 'Cotización escrita Sterilelabs + certificado de análisis por lote · dictamen legal', nota: 'Variable #1 del margen (~57 % Despegue). Ventaja temporal, no cimiento: exige plan B de marca.' },
  { molecula: 'Naltrexona/bupropión (no-GLP1)', presentacion: 'Tableta (A VERIFICAR)', registro: PEND, condicion: PEND, precioFarmacia: PEND, costoLiviano: PEND, fechaVerificacion: '—', estado: 'PENDIENTE DE VERIFICACIÓN', semaforo: 'ambar',
    fuente: 'Portal DIGEMID (URL A VERIFICAR)', nota: 'Opción para craving emocional cuando el GLP-1 no es accesible (caso 14). Solo si hay registro.' },
  { molecula: 'Fentermina/topiramato (no-GLP1)', presentacion: 'Cápsula (A VERIFICAR)', registro: PEND, condicion: PEND, precioFarmacia: PEND, costoLiviano: PEND, fechaVerificacion: '—', estado: 'PENDIENTE DE VERIFICACIÓN', semaforo: 'ambar',
    fuente: 'Portal DIGEMID (URL A VERIFICAR)', nota: 'Disponibilidad en Perú desconocida: no prescribir sin registro verificado.' },
];
export const LIVIANO_ACCESO_PERU_REGLAS = {
  titulo: 'Protocolo de verificación (Módulo 7 · Acceso en Perú)',
  dueno: 'Joseph (+ QF y abogado de salud — A VERIFICAR nombres)',
  planDias: [39, 41, 42, 43, 44],
  ventana: 'D39-D44 · jue 29-oct → jue 5-nov-2026 (v5.6) · re-verificación en cada revisión trimestral (D46, D90)',
  pasos: [
    'D39 · Registro: consultar el portal público de DIGEMID (URL A VERIFICAR), capturar pantalla con fecha por molécula; si no aparece → "SIN REGISTRO HALLADO (fecha)".',
    'D41 · Condición de venta: leerla en el registro (con receta / receta retenida) y mapear el flujo receta → farmacia → paciente en el CRM.',
    'D42 · Precio: 2 cotizaciones escritas y fechadas (cadena + independiente) por presentación/dosis; recalcular el "medicamento 3 m = S/ 3,600" del value stack.',
    'D43 · Magistral: dictamen de legalidad (QF + abogado) + 1 cotización Sterilelabs con certificado de análisis por lote → columna "costo LIVIANO" y KPI COGS.',
    'D44 · Cadena de frío doméstica 2–8 °C: guion de 8 líneas para el kit de bienvenida (tiempo fuera de frío según ficha técnica — A VERIFICAR).',
  ],
  regla: 'Regla anti-alucinación: ninguna celda se rellena sin fuente primaria fechada. Ningún precio se publica sin cotización. Nunca mercado gris.',
};

// ===================== REVISIÓN TRIMESTRAL DE FARMACOTERAPIA (regla 3 del programa) =====================
export const LIVIANO_REVISION_TRIMESTRAL = {
  regla: 'Aprobaciones y precios se mueven rápido (Wegovy oral dic-2025 · orforglipron abr-2026 · genéricos de semaglutida en Brasil/India mar-2026). Dos filas FIJAS en el plan LIVIANO Academia; después, cada trimestre.',
  dueno: 'Joseph',
  filas: [
    { n: 1, planDia: 46, fechaPlan: '2026-11-09', titulo: 'REVISIÓN TRIMESTRAL I (tras el Módulo 7 · Acceso en Perú)' },
    { n: 2, planDia: 90, fechaPlan: '2027-01-13', titulo: 'REVISIÓN TRIMESTRAL II + cierre de la Academia' },
  ],
  checklist: [
    'Aprobaciones nuevas (FDA / EMA / DIGEMID) desde la última revisión — con fuente y fecha.',
    'Alertas de seguridad / cambios de ficha técnica (contraindicaciones, EA).',
    'Recotizar: 2 farmacias + 1 magistral → actualizar LIVIANO_ACCESO_PERU (fecha de verificación).',
    'Genéricos en LATAM: ¿ya llegó alguno a Perú? ¿cambia el COGS y el value stack?',
    'Actualizar value stack / escalera de precios si el COGS se movió (KPI margen).',
    '3 tarjetas Anki nuevas (deck APEX::LIVIANO::glp1) con lo que cambió.',
  ],
};

// ===================== PROTOCOLO CLÍNICO LIVIANO (capstone de la Academia) =====================
// Esqueleto: cada "Síntesis de módulo" del plan produce UNA sección; D89 (capstone) las ensambla en
// DATA/BUSINESS/LIVIANO_PROTOCOLO_CLINICO_v1.md. Sin inventar dosis: cita fuente o "A VERIFICAR".
export interface ProtocoloSeccion {
  id: string; titulo: string;
  produceEn: string;        // qué día(s) del plan la redactan
  planDias: number[];
  estado: 'borrador' | 'pendiente';
  contenido: string[];      // lo que YA se puede afirmar desde el currículo (con fuente)
  pendientes: string[];     // lo que falta verificar (ficha técnica, guía, QF)
}
export const LIVIANO_PROTOCOLO = {
  version: 'v1 · esqueleto (sep-2026) → v1 completa el D89 (12-ene-2027, v5.6)',
  doc: 'DATA/BUSINESS/LIVIANO_PROTOCOLO_CLINICO_v1.md',
  criterioExito: 'El caso integral del viernes 16 (D87) se resuelve SOLO con el protocolo. Lo que falte es una sección que falta.',
  secciones: [
    { id: 'fundamento', titulo: '§1 Fundamento: por qué tratamiento crónico', produceEn: 'Síntesis módulo 1', planDias: [19], estado: 'borrador',
      contenido: ['Obesidad = disfunción del sistema de homeostasis energética (Schwartz 2017); set point elevado; adaptación metabólica persiste años → tratamiento crónico como la hipertensión.', 'Metáforas oficiales: termostato · timbre · acelerador/freno.'],
      pendientes: [] },
    { id: 'elegibilidad', titulo: '§2 Elegibilidad + titulación (M1-2)', produceEn: 'Síntesis módulo 2', planDias: [38], estado: 'borrador',
      contenido: ['Candidato: IMC/comorbilidad según Obesity Algorithm 2026 (criterio numérico A VERIFICAR); screening de contraindicaciones: MEN2/carcinoma medular de tiroides (dura), pancreatitis previa, embarazo/lactancia o búsqueda de embarazo, enfermedad biliar sintomática.', 'Consentimiento hablado: beneficio esperado con cifras (STEP 1 −14,9 % · SURMOUNT-1 hasta −20,9 % · 67 % de recuperación si se suspende), EA GI dominantes, eventos raros.', 'Titulación: escalada LENTA; no escalar mientras haya EA GI; check-in semanal de EA durante la titulación.', 'Suspensión/derivación: pancreatitis sospechada, embarazo, EA intolerables, falla a farmacoterapia.'],
      pendientes: ['Esquema de dosis e intervalos por molécula — SOLO desde ficha técnica (A VERIFICAR).', 'Panel de labs basales y cadencia — A VERIFICAR (guía OMA/Obesity Canada).', 'Periodo de lavado ante embarazo — A VERIFICAR (ficha técnica).'] },
    { id: 'proteina_fuerza', titulo: '§3-4 Estándar proteína/fuerza + qué medir (M3-4)', produceEn: 'Síntesis módulos 3 y 4', planDias: [58, 68], estado: 'borrador',
      contenido: ['Innegociable junto a todo GLP-1: proteína 1,2-1,6 g/kg/día + fuerza 2x/semana.', 'Política nutricional: adherencia primero (DIETFITS; AI = restricción continua), método del plato local, proteína primero cuando el fármaco quita el hambre.', 'Actividad para mantenimiento: ~1 h/día (NWCR); guías 200-300 min/sem.', 'Métricas: peso + cintura + fuerza (semanal/quincenal), fotos (mensual), composición si hay bioimpedancia; la meta se define en composición, no solo en kg.'],
      pendientes: ['Ingesta de líquidos objetivo y señales de deshidratación — A VERIFICAR.', 'Cadencia exacta de labs de control (bono "labs trimestrales") — A VERIFICAR.'] },
    { id: 'conducta', titulo: '§5 5As · automonitoreo · cadencia de check-in (M5)', produceEn: 'Síntesis módulo 5', planDias: [86], estado: 'borrador',
      contenido: ['Guion de consulta 5As (Obesity Canada): pedir permiso → evaluar sin juicio → informar → pactar UNA meta elegida por el paciente → asistir.', 'Automonitoreo = predictor #1: qué registra el paciente (comida, peso, pasos) y dónde.', 'Cadencia de acompañamiento por fase (oferta): Despegue 4 sesiones/mes · Progreso 2 · Consolidación 1 · Mantenimiento control trimestral; check-in de EA semanal durante la titulación.', 'Lenguaje people-first y protocolo sin estigma (balanza privada, mobiliario, guion). El estigma es ítem evaluable de cada caso.'],
      pendientes: ['Contenido exacto de cada una de las 4 sesiones/mes del Despegue — se redacta en D86.'] },
    { id: 'derivacion', titulo: '§6 Derivación y límites de competencia (M6)', produceEn: 'Síntesis módulo 6', planDias: [77], estado: 'borrador',
      contenido: ['Gatillos de derivación a cirugía: ASMBS/IFSO 2022 (IMC ≥ 35 sin exigir comorbilidades; 30-34,9 con enfermedad metabólica refractaria; asiáticos ≥ 27,5 — juicio clínico en población peruana) + falla a farmacoterapia.', 'Qué logra la cirugía: pérdida sostenida 25-30 % y remisión de diabetes; rol LIVIANO pre y post.', 'Otros límites: paciente cardiológico (coordinar con cardiología), tratamiento psiquiátrico (interconsulta antes de no-GLP1), red flags (pancreatitis, embarazo) → emergencia/obstetricia.', 'No-GLP1 (fentermina/topiramato, naltrexona/bupropión, orlistat, metformina off-label): papel real modesto; solo con registro verificado.'],
      pendientes: ['GLP-1 post-bariátrica: esquema — A VERIFICAR.', 'Setmelanotida: criterios de estudio genético — A VERIFICAR.'] },
    { id: 'acceso', titulo: 'Anexo A · Acceso en Perú (M7)', produceEn: 'Módulo 7 (D39-D44) + revisiones trimestrales', planDias: [39, 41, 42, 43, 44, 46, 90], estado: 'pendiente',
      contenido: ['Tabla LIVIANO_ACCESO_PERU (molécula · registro · condición · precio farmacia · costo LIVIANO · fecha verificación).', 'Cadena de frío doméstica 2–8 °C: guion del kit de bienvenida.', 'Regla: nunca mercado gris; solo farmacia licenciada con certificado de análisis por lote.'],
      pendientes: ['Todas las celdas de la tabla (registro DIGEMID, condición de venta, 2 cotizaciones, magistral) — A VERIFICAR en D39-D44.'] },
    { id: 'capstone', titulo: 'Capstone · ensamblaje v1', produceEn: 'D89 (tras el caso integral D87)', planDias: [89], estado: 'pendiente',
      contenido: ['Unir §1-§6 + Anexo A, marcar toda dosis sin ficha técnica como "A VERIFICAR", añadir lo que faltó en el caso integral.'],
      pendientes: ['Revisión por par (médico con experiencia en obesidad — A VERIFICAR) antes de usarlo con pacientes reales.'] },
  ] as ProtocoloSeccion[],
};

// ===================== KPI LOG SEMANAL (puente honesto hasta un endpoint read-only del CRM) =====================
// El Cockpit muestra 18 KPIs constantes; este log de entrada MANUAL por semana ISO (leads · consultas ·
// altas · MRR · churn · COGS) es la única fuente de números reales hasta que el CRM exponga un endpoint.
// Persistencia: localStorage 'jmd-liviano-kpi' (panels.tsx) + export JSON a DATA/BUSINESS/_kpi/.
export type KpiSemanalKey = 'leads' | 'consultas' | 'altas' | 'mrr' | 'churn' | 'cogs';
export interface KpiSemanalDef {
  key: KpiSemanalKey; label: string; unidad: string;
  meta: number;                 // objetivo semanal (o mensual acumulado, ver hint)
  direccion: 'mayor' | 'menor'; // mayor = más es mejor · menor = menos es mejor
  hint: string; origenMeta: string;
}
export const LIVIANO_KPI_SEMANAL: KpiSemanalDef[] = [
  { key: 'leads',     label: 'Leads',            unidad: '#',  meta: 10,   direccion: 'mayor', hint: 'Leads nuevos de la semana (quiz / WhatsApp / consulta gratuita)', origenMeta: 'Provisional: ≥150 leads pre-launch (tracker Metricas_v2) ÷ ~15 semanas' },
  { key: 'consultas', label: 'Consultas',        unidad: '#',  meta: 5,    direccion: 'mayor', hint: 'Evaluaciones Integrales / conversaciones reales de la semana', origenMeta: 'Tracker Metricas_v2: ≥5 conversaciones reales/sem' },
  { key: 'altas',     label: 'Altas',            unidad: '#',  meta: 1,    direccion: 'mayor', hint: 'Nuevas suscripciones (Despegue) de la semana', origenMeta: 'KPI ventas_mes: 4 altas/mes → 1/sem' },
  { key: 'mrr',       label: 'MRR',              unidad: 'S/', meta: 5160, direccion: 'mayor', hint: 'Ingreso recurrente mensual vigente al cierre de la semana', origenMeta: 'KPI mrr: S/ 5,160 (4 fundadores)' },
  { key: 'churn',     label: 'Churn',            unidad: '%',  meta: 8,    direccion: 'menor', hint: 'Cancelaciones / activos (mensual, anotar en la última semana del mes)', origenMeta: 'KPI churn: < 8 %' },
  { key: 'cogs',      label: 'COGS / pac-mes',   unidad: 'S/', meta: 555,  direccion: 'menor', hint: 'Costo del fármaco + dispensación por paciente-mes', origenMeta: 'Derivado: ticket S/ 1,290 × (1 − margen ~57 %) ≈ S/ 555 — se fija con la cotización real (D43)' },
];
export const LIVIANO_KPI_REGLA = {
  umbralPct: 80, semanas: 2,
  texto: 'Regla del tracker: si un KPI queda < 80 % de su meta DOS semanas seguidas → ajustar (oferta, canal o proceso), no esperar.',
};
/** Semáforo de un KPI semanal contra su meta (verde ≥ 100 % · ámbar ≥ 80 % · rojo < 80 % · neutro sin dato). */
export function kpiSemanalSemaforo(def: KpiSemanalDef, valor: number | undefined | null): Semaforo {
  if (valor === undefined || valor === null || Number.isNaN(valor)) return 'neutro';
  const ratio = def.direccion === 'mayor'
    ? (def.meta === 0 ? 1 : valor / def.meta)
    : (valor === 0 ? 1 : def.meta / valor);
  if (ratio >= 1) return 'verde';
  if (ratio >= LIVIANO_KPI_REGLA.umbralPct / 100) return 'ambar';
  return 'rojo';
}
/** KPIs en ROJO en las últimas N semanas registradas (regla "<80 % dos semanas"). */
export function kpiSemanalAlertas(semanas: { key: string; valores: Partial<Record<KpiSemanalKey, number>> }[]): KpiSemanalKey[] {
  const ult = semanas.slice(-LIVIANO_KPI_REGLA.semanas);
  if (ult.length < LIVIANO_KPI_REGLA.semanas) return [];
  return LIVIANO_KPI_SEMANAL.filter(def => ult.every(s => kpiSemanalSemaforo(def, s.valores[def.key]) === 'rojo')).map(d => d.key);
}

// ===================== DIRECTRICES & TIPS (Hormozi + benchmarks) =====================

export interface DirectrizGrupo {
  grupo: string;
  icon: string;
  accent: 'amber' | 'blue' | 'green' | 'purple' | 'coral' | 'teal';
  tips: { t: string; d: string }[];
}

export const LIVIANO_DIRECTRICES: DirectrizGrupo[] = [
  { grupo: 'Oferta (Grand Slam)', icon: '🎯', accent: 'amber', tips: [
    { t: 'Ecuación de Valor', d: 'Valor = (Dream Outcome × Prob. percibida) ÷ (Demora × Esfuerzo). Sube los de arriba, baja los de abajo.' },
    { t: 'Vende la transformación', d: 'No vendes semaglutida; vendes "volver a sentirte tú". Todo el copy parte del dream outcome.' },
    { t: 'Stackea bonos, no descuentos', d: 'Cada bono con su valor en S/ y resolviendo una objeción. La suma supera el precio.' },
    { t: 'Garantía de SERVICIO', d: 'Nunca prometas resultado clínico (riesgo CMP Art. 73). Garantiza experiencia y compromiso.' },
    { t: 'Nombre MAGIC', d: 'Magnet + Avatar + Goal + Interval + Container. "Baja 10 kg en 90 días con médicos, sin pasar hambre".' },
    { t: 'Ancla el precio alto', d: 'Primero el valor apilado y la cirugía bariátrica; luego revela el precio: parecerá una ganga.' },
  ]},
  { grupo: 'Leads & Adquisición', icon: '📣', accent: 'blue', tips: [
    { t: 'Orgánico antes que pago', d: 'Meses de contenido + responder cada mensaje ~4 h/día antes de encender ads. El orgánico es tu laboratorio.' },
    { t: 'Rule of 100', d: '100 acciones primarias/día durante 100 días. La disciplina diaria vence al talento.' },
    { t: 'Lead magnet = quiz de elegibilidad', d: '"¿Eres candidato para GLP-1?" cualifica, captura y da el primer paso de la solución.' },
    { t: 'Más, Mejor, Nuevo', d: 'Exprime More y Better en el canal que ya dominas antes de abrir uno New.' },
  ]},
  { grupo: 'Money Model & Finanzas', icon: '💰', accent: 'green', tips: [
    { t: 'Client-Financed Acquisition', d: 'Que un cliente financie 1–2 más en <30 días: margen bruto 30d > 2×CAC + COGS.' },
    { t: 'LTGP : CAC ≥ 3:1', d: 'Apunta a 6:1 por el toque clínico. CAC payback < 6 meses; nunca > 12.' },
    { t: 'Sube el LTGP, no bajes el CAC', d: 'Continuidad + upsells te dejan pujar más alto en Meta/Google y ganar la subasta.' },
    { t: 'Runway 18–24 meses', d: 'Nunca bajes de 9. Distingue gasto bruto de net burn y cash flow de EBITDA. Cobra por adelantado.' },
  ]},
  { grupo: 'Organización', icon: '🏛️', accent: 'purple', tips: [
    { t: 'Dos fábricas', d: 'Fábrica de Demanda (Growth) y Fábrica de Entrega (Clínica + Supply). Un responsable por cada una.' },
    { t: 'Contrata en orden', d: 'Director Médico → Media buyer → Coord. Ops/CX → Editor de creativos. Sin médico no hay negocio legal.' },
    { t: 'Métrica-puente', d: 'Margen de contribución por cliente. Si es positivo y crece, ambas fábricas están sanas.' },
    { t: 'RACI', d: 'Seguridad/legalidad la aprueba el médico; precio/proveedor/presupuesto los apruebas tú.' },
  ]},
  { grupo: 'Creativos (kill / scale)', icon: '🎬', accent: 'amber', tips: [
    { t: 'El creativo es la palanca #1 de CAC', d: '3–5 conceptos nuevos/semana. Aísla una variable por test. Pipeline siempre lleno.' },
    { t: 'Mata sin sentimentalismo', d: 'CTR < 0.8% en feed → matar. Hook rate < 20% → débil. ~500 impresiones antes de juzgar.' },
    { t: 'Escala con cuidado', d: 'Sube presupuesto +20–30% cada 48–72 h. Subidas bruscas reinician el learning y disparan el CPM.' },
    { t: 'Mide CAC real', d: 'Por creativo y con post-purchase survey + MER, no por el ROAS optimista de la plataforma.' },
  ]},
  { grupo: 'Logística & Riesgo', icon: '📦', accent: 'coral', tips: [
    { t: 'No construyas sobre el compounding barato', d: 'Es ventaja temporal y expuesta. Ten plan B de marca y un abogado farmacéutico de cabecera.' },
    { t: 'Protege la cadena de frío', d: 'Logging de temperatura, FEFO, forecast atado al plan de ads. Una ruptura = producto perdido + riesgo.' },
    { t: 'Coordinación demanda↔supply', d: 'Si Growth va a escalar, Supply debe tener stock y la operación capacidad. Crecer o colapsar.' },
  ]},
  { grupo: 'Aprende de los gigantes', icon: '🔭', accent: 'teal', tips: [
    { t: 'Precio-gancho + mantenimiento', d: 'Estilo NovoCare/Eden: 1er mes barato (tarifa Fundador), precio recurrente normal desde el 2º.' },
    { t: 'Tarifa plana por dosis', d: 'Estilo Mochi: mismo precio aunque suba la dosis. Elimina la ansiedad → mejora retención.' },
    { t: 'Personalización = retención', d: 'Hims subió retención ~20 pts con ofertas personalizadas. Es además la vía legal del "compounding".' },
    { t: 'Cross-sell multi-categoría', d: 'La joya de Hims: NÍTIDA (piel), DENSA (capilar). Sube el LTV sin subir el CAC.' },
  ]},
];

// ===================== LINKS (mapa web Pulso/Liviano) =====================
// Para la subsección "Web & Links": enlazar a las páginas reales del CRM.

export const PULSO_LINKS = {
  base: 'https://pulso-crm.vercel.app',
  publicas: ['/inicio', '/programa', '/precios', '/clinicas', '/evaluacion', '/reservar', '/mapa', '/gratis', '/gratis/plan-semana', '/gratis/proteina', '/gratis/no-shows'],
  crm: ['/hoy', '/agenda', '/pacientes', '/mensajes', '/flujos', '/inventario', '/facturacion', '/pipeline', '/campanas', '/marketing', '/resenas', '/referidos', '/configuracion'],
  liviano: ['/liviano', '/liviano/paciente/[id]', '/liviano/agente', '/liviano/bandeja', '/liviano/bonos', '/liviano/catalogo', '/liviano/conocimiento'],
  portalPaciente: ['/p/[token]', '/p/[token]/ejercicio', '/p/[token]/comida', '/p/[token]/bioimpedancia', '/p/[token]/chat', '/p/[token]/perfil'],
  portalMedico: ['/m/[token]', '/m/[token]/pacientes', '/m/[token]/pacientes/nuevo', '/m/[token]/agente', '/m/[token]/campanas', '/m/[token]/contenido', '/m/[token]/conversaciones', '/m/[token]/creditos', '/m/[token]/negocio'],
  webhooks: ['/api/webhook/whatsapp', '/api/webhook/whatsapp-cloud', '/api/webhook/pago', '/api/webhook/meta-lead', '/api/ocr', '/api/comprobante/[id]', '/api/meta/sync-spend'],
  whatsappPirqa: 'https://wa.me/51934173914',
};

// Grupos de links con metadatos para renderizar la subsección Web & Links.
export interface LinkGrupo {
  id: string; titulo: string; icon: string; desc: string; rutas: string[];
}
export const PULSO_LINK_GRUPOS: LinkGrupo[] = [
  { id: 'publicas', titulo: 'Páginas públicas', icon: '🌐', desc: 'Landing, programa, precios, evaluación, reservas.', rutas: PULSO_LINKS.publicas },
  { id: 'crm', titulo: 'CRM (admin)', icon: '🗂️', desc: 'Hoy, agenda, pacientes, mensajes, flujos, inventario, facturación.', rutas: PULSO_LINKS.crm },
  { id: 'liviano', titulo: 'Liviano', icon: '⚡', desc: 'Panel de la línea: agente, bandeja, bonos, catálogo, conocimiento.', rutas: PULSO_LINKS.liviano },
  { id: 'portalPaciente', titulo: 'Portal paciente · /p/[token]', icon: '🧑‍⚕️', desc: 'Ejercicio, comida, bioimpedancia, chat, perfil.', rutas: PULSO_LINKS.portalPaciente },
  { id: 'portalMedico', titulo: 'Portal médico · /m/[token]', icon: '👨‍⚕️', desc: 'Pacientes, agente, campañas, contenido, conversaciones, créditos.', rutas: PULSO_LINKS.portalMedico },
  { id: 'webhooks', titulo: 'Webhooks & API', icon: '🔌', desc: 'WhatsApp, pago, Meta lead, OCR, comprobante, sync-spend.', rutas: PULSO_LINKS.webhooks },
];

// ===================== PIRQA (línea gastronómica, en producción) =====================

export const PIRQA_DATA = {
  resumen: 'Experiencia gastronómica andina (pachamanca). Primer tenant en producción del CRM Pulso: WhatsApp → OCR (Gemini) → comprobante Yape/Plin → reserva.',
  estado: 'En producción',
  reservas: { turnos: '5 turnos × 8 cupos', dias: 'Sáb y Dom · 11:00–16:00', capacidad: '40 cupos/día' },
  kpis: [
    { label: 'Modelo', valor: 'WhatsApp-first' },
    { label: 'Pago', valor: 'Yape / Plin + OCR' },
    { label: 'Turnos', valor: '5 × 8 cupos' },
    { label: 'Stack', valor: 'CRM Pulso · Vercel' },
  ],
  links: [
    { label: 'WhatsApp reservas', url: 'https://wa.me/51934173914' },
    { label: 'Portal de reserva', url: 'https://pulso-crm.vercel.app/reservar' },
    { label: 'CRM · Hoy', url: 'https://pulso-crm.vercel.app/hoy' },
  ],
};

// ===================== CARTERA DE MARCAS PULSO =====================
// Pulso = conglomerado de salud DTC. Cada "línea" es un tenant del CRM.
// Catálogo real del CRM (src/lib/lines): LIVIANO (activa) + Nítida, Densa, Curva,
// Calma, Foco, Cerca (planeadas). PIRQA es no-clínico (gastronomía) y va aparte.
// Las categorías de las líneas planeadas son inferidas del nombre (aún sin definir).

export interface MarcaPulso {
  id: string;
  nombre: string;
  categoria: string;
  estado: EstadoEmpresa;
  accent: string;          // color de marca (aclarado para navy)
  emoji: string;
  tagline: string;
  progreso: number;        // 0-100, madurez de lanzamiento
  metricaClave?: { label: string; valor: string };
  ancla?: boolean;
}

export const CARTERA_PULSO: MarcaPulso[] = [
  { id: 'liviano', nombre: 'LIVIANO', categoria: 'Peso · GLP-1', estado: 'en_desarrollo', accent: '#9DB07F', emoji: '⚡', tagline: 'Programa médico de control de peso. El ancla del grupo.', progreso: 65, ancla: true, metricaClave: { label: 'Ticket', valor: 'S/ 1,290' } },
  { id: 'nitida',  nombre: 'Nítida',  categoria: 'Piel · dermatología', estado: 'planeada', accent: '#6EC1E4', emoji: '✨', tagline: 'Dermatología médica por suscripción.', progreso: 8 },
  { id: 'densa',   nombre: 'Densa',   categoria: 'Salud capilar', estado: 'planeada', accent: '#B98AE0', emoji: '🧬', tagline: 'Tratamiento capilar guiado.', progreso: 5 },
  { id: 'curva',   nombre: 'Curva',   categoria: 'Estética & figura', estado: 'planeada', accent: '#E08FB0', emoji: '🌸', tagline: 'Estética corporal médica.', progreso: 4 },
  { id: 'calma',   nombre: 'Calma',   categoria: 'Salud mental & sueño', estado: 'planeada', accent: '#7FA3D9', emoji: '🌙', tagline: 'Bienestar mental y descanso.', progreso: 4 },
  { id: 'foco',    nombre: 'Foco',    categoria: 'Energía & enfoque', estado: 'planeada', accent: '#E0B45A', emoji: '🎯', tagline: 'Energía, foco y longevidad.', progreso: 3 },
  { id: 'cerca',   nombre: 'Cerca',   categoria: 'Cuidado cercano', estado: 'planeada', accent: '#67C7A0', emoji: '🤝', tagline: 'Cuidado primario de cercanía.', progreso: 3 },
];

// Métricas consolidadas del grupo (estructurales — pre-lanzamiento).
export const PULSO_CONSOLIDADO = {
  lineasSalud: 7,
  lineasActivas: 1,
  tenantsProduccion: 1,          // PIRQA
  readinessGrupo: 18,            // % madurez promedio de la cartera (ring)
  consolidado: [
    { label: 'Líneas de salud', valor: 7, suffix: '', hint: '1 activa · 6 en desarrollo' },
    { label: 'En producción', valor: 1, suffix: '', hint: 'PIRQA (no clínico)' },
    { label: 'Plataforma', valorTxt: 'CRM único', hint: 'Multi-tenant' },
    { label: 'Motor', valorTxt: 'IA Gemini', hint: 'OCR + agente' },
  ],
  ticker: [
    'Holding de salud DTC multi-marca',
    'LIVIANO = programa ancla GLP-1',
    'CRM multi-tenant compartido',
    'WhatsApp → OCR → pago → ficha',
    'Motor de IA Gemini',
    'Categoría de uno en Huancayo',
    '7 líneas de salud en cartera',
    'Base: Junín, Perú → LATAM',
  ],
  // Roadmap de lanzamientos (proyección estructural, no ventas).
  roadmap: [
    { t: '2026 T2', activas: 1, label: 'LIVIANO pre-lanzamiento' },
    { t: '2026 T3', activas: 1, label: 'LIVIANO lanza' },
    { t: '2026 T4', activas: 2, label: '+ Nítida' },
    { t: '2027 T1', activas: 3, label: '+ Densa' },
    { t: '2027 T2', activas: 4, label: '+ Curva' },
    { t: '2027 T3', activas: 5, label: '+ Calma' },
    { t: '2027 T4', activas: 7, label: '+ Foco, Cerca' },
  ],
};
