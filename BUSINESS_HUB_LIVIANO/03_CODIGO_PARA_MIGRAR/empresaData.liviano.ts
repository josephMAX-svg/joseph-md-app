/**
 * empresaData.liviano.ts
 * ------------------------------------------------------------------
 * ARCHIVO DE DATOS LISTO PARA PEGAR en `joseph-md-app` (hub Business).
 * Destino sugerido: D:\joseph-md-app\src\lib\empresaData.ts
 *
 * Contiene la REALIDAD de Pulso Health Group + LIVIANO (datos extraídos de
 * LIVIANO_Oferta_Maestra.docx y del inventario de CRM_PULSO_v3.1).
 *
 * Es 100% data local — NO requiere backend. El hub lo consume para renderizar
 * el cockpit, la oferta, el estudio de mercado, los links, etc.
 *
 * NOTA: los valores marcados como (TARGET) o (EST) son objetivos/estimados —
 * Liviano está en pre-lanzamiento. Reemplazar por reales cuando haya ventas.
 * ------------------------------------------------------------------ */

// ===================== TIPOS =====================

export type EstadoEmpresa = 'activa' | 'en_desarrollo' | 'piloto' | 'planeada';
export type Semaforo = 'verde' | 'ambar' | 'rojo' | 'neutro';

export interface KPI {
  key: string;
  label: string;
  valor: string;          // valor formateado para mostrar
  meta?: string;          // objetivo
  semaforo: Semaforo;
  hint?: string;          // fórmula / explicación corta
  grupo: 'ingresos' | 'margen' | 'unit' | 'marketing' | 'retencion' | 'logistica';
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

// ===================== GRUPO MATRIZ =====================

export const PULSO_GROUP = {
  nombre: 'Pulso Health Group',
  founder: 'Dr. Joseph Soto Tocas',
  base: 'Huancayo / Junín, Perú',
  tesis: 'Holding de salud DTC multi-marca. Liviano es el programa ancla; cada línea reutiliza el mismo CRM, plataforma y motor de IA.',
  crmUrl: 'https://pulso-crm.vercel.app',
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
      { id: 'web',        nombre: 'Web & Diseño',          icon: '🌐', status: 'CRM activo',         resumen: 'Mapa de páginas y todos los links (paciente/médico/magic/QR).' },
      { id: 'directrices',nombre: 'Directrices & Tips',    icon: '🧠', status: 'Hormozi + benchmarks',resumen: 'Reglas de oferta, leads y operación. Ver 01_INVESTIGACION.' },
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
  { key: 'flujo_neto', label: 'Flujo neto / mes',    valor: 'S/ 0 (EST)',   meta: '> 0',                     semaforo: 'neutro', grupo: 'margen',   hint: 'Ingresos − gasto neto' },
  { key: 'gasto_bruto',label: 'Gasto bruto / mes',   valor: 'S/ 0 (EST)',   meta: '—',                       semaforo: 'neutro', grupo: 'margen',   hint: 'Producto + ads + plataforma + consulta + envío' },
  { key: 'cogs',       label: 'COGS GLP-1 / mes',    valor: 'PENDIENTE',    meta: 'Cotizar Sterilelabs',     semaforo: 'rojo',   grupo: 'margen',   hint: 'Variable #1 del margen — confirmar costo magistral' },
  // Unit economics
  { key: 'cac',        label: 'CAC',                 valor: 'S/ 0 (EST)',   meta: '< S/ 1,290 (≤1 mes pago)',semaforo: 'neutro', grupo: 'unit',     hint: 'Gasto adquisición / clientes nuevos' },
  { key: 'ltv_cac',    label: 'LTV : CAC',           valor: '— ',           meta: '≥ 3 : 1',                 semaforo: 'neutro', grupo: 'unit',     hint: 'Salud del negocio; objetivo ≥3:1' },
  { key: 'payback',    label: 'CAC payback',         valor: '— ',           meta: '< 1 mes',                 semaforo: 'neutro', grupo: 'unit',     hint: 'Meses para recuperar el CAC' },
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

  // 20+ bonos en 4 categorías (cada uno mata una objeción)
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

// ===================== LINKS (mapa web Pulso/Liviano) =====================
// Para la subsección "Web & Diseño": enlazar a las páginas reales del CRM.

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

// ===================== PENDIENTES CRÍTICOS (riesgos) =====================
export const LIVIANO_PENDIENTES = [
  'Cotización Sterilelabs: confirmar costo magistral mensual (variable #1 del margen).',
  'Legalidad DIGEMID: magistral de molécula comercial — verificar con QF y abogado de salud antes de escalar.',
  'Seguridad: solo farmacia licenciada con certificado de análisis por lote; nunca mercado gris.',
  'Revisión legal de garantías y publicidad (CMP Art. 73; no prometer cifras de pérdida de peso).',
  'Comunidad a escala: activar al sembrar varias cohortes (no funciona con 4 personas).',
];
