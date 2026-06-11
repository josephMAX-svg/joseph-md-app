/**
 * terrenosData.ts — Data REAL de Casa Soto Tocas · Patrimonios del Mantaro.
 * Fuente de verdad: D:\casa-soto-tocas\INVENTARIO.md (fichas .docx) + web viva
 * casasototocas.vercel.app + listados de Marketplace verificados el 11-jun-2026.
 * ⚠ Discrepancias precio web vs catálogo docx (mayo-2026): ver `precioCatalogo`.
 * Los LEADS_SEED son los 21 leads reales de Marketplace gestionados el 11-jun-2026
 * (cuenta Flor Elenesi Tocas Vilchez) — semilla del tracker, progreso luego manual.
 */

export const TERRENOS_BRAND = {
  nombre: 'Casa Soto Tocas',
  tagline: 'Patrimonios del Mantaro',
  web: 'https://casasototocas.vercel.app',
  whatsapp: '934 173 914',
  llamadas: '984 147 953',
  visitas: 'Sábados y domingos desde las 4:00 p.m. (hasta agosto 2026)',
};

export const TERRENOS_LINKS: { label: string; url: string }[] = [
  { label: '🌐 Web — casasototocas.vercel.app', url: 'https://casasototocas.vercel.app' },
  { label: '📥 Bandeja Marketplace (cuenta Flor)', url: 'https://www.facebook.com/marketplace/inbox/' },
  { label: '🏷️ MP · Pachac-Pampa 352 m²', url: 'https://www.facebook.com/marketplace/item/866834109088124/' },
  { label: '🏷️ MP · Pulpialle 400 m² (SUNARP)', url: 'https://www.facebook.com/marketplace/item/974932988601028/' },
  { label: '🏷️ MP · Toco Machay 1,279 m²', url: 'https://www.facebook.com/marketplace/item/2116764279056893/' },
  { label: '🏷️ MP · Matahuacta III 2,193 m²', url: 'https://www.facebook.com/marketplace/item/1661897158386400/' },
  { label: '🏷️ MP · Manuchap 441 m²', url: 'https://www.facebook.com/marketplace/item/839446595392590/' },
  { label: '👥 Grupo FB · Terrenos Huancayo-Chupaca', url: 'https://www.facebook.com/groups/3763516290632831' },
];

export interface Predio {
  id: number;
  nombre: string;
  area: number;            // m²
  precioWeb: number;       // S/ — el publicado en casasototocas.vercel.app (fuente: INVENTARIO.md)
  precioCatalogo?: number; // S/ — si el catálogo docx (may-2026) difiere ⚠
  legal: string;
  destacado?: string;
}

export const PREDIOS: Predio[] = [
  { id: 1,  nombre: 'Matahuacta I',        area: 2973, precioWeb: 178400, legal: 'Juzgado de Paz · Ley 31145', destacado: 'la chacra más grande' },
  { id: 2,  nombre: 'Matahuacta III',      area: 2193, precioWeb: 114000, precioCatalogo: 120640, legal: 'Juzgado de Paz · apto SUNARP', destacado: 'canal cruza el predio · alfalfa activa' },
  { id: 3,  nombre: 'Toco Machay',         area: 1279, precioWeb: 61400,  legal: 'Juzgado de Paz Ley 29824 (2017)', destacado: 'compuerta propia del comité' },
  { id: 4,  nombre: 'Santa Rosa II',       area: 1543, precioWeb: 86400,  legal: 'Esc. imperfecta 2011 · Ley 31145', destacado: 'cerca Observatorio IGP' },
  { id: 5,  nombre: 'Panteón',             area: 1100, precioWeb: 137500, precioCatalogo: 192500, legal: '🟢 SUNARP Partida 11061120 · PETT 2000', destacado: 'apto crédito hipotecario' },
  { id: 6,  nombre: 'Vilchispa-Aysha',     area: 756,  precioWeb: 241900, legal: 'Juzgado de Paz 2014 · cadena 1970', destacado: 'único caminable a Plaza' },
  { id: 7,  nombre: 'Manuchap',            area: 441,  precioWeb: 62000,  legal: 'Esc. imperfecta 2015 · cadena 1970', destacado: '42 m de frente · subdividible' },
  { id: 8,  nombre: 'Jatun Chacra Norte',  area: 1404, precioWeb: 175000, legal: 'Juzgado de Paz Ley 29824' },
  { id: 9,  nombre: 'Jatun Chacra Sur',    area: 1039, precioWeb: 130000, legal: 'Juzgado de Paz · cadena 1957' },
  { id: 10, nombre: 'Pulpialle',           area: 400,  precioWeb: 66000,  legal: '🟢 SUNARP Ficha 0960-PR · PETT 2000', destacado: 'apto crédito hipotecario' },
  { id: 11, nombre: 'Matahuacta Notarial', area: 1281, precioWeb: 96000,  legal: '🟡 Escritura Pública Notarial 2008' },
  { id: 12, nombre: 'Pachac-Pampa',        area: 352,  precioWeb: 51000,  legal: '🟡 Escritura Pública Notarial · 1965', destacado: 'el más accesible · 44×8 m comercial' },
  { id: 13, nombre: 'Tocaspa',             area: 486,  precioWeb: 58300,  legal: 'Escritura transferencia 2015' },
];

/** PACK #8+#9: 2,443 m² consolidados — web S/ 280,000 · catálogo may-2026 S/ 350,000 ⚠ */
export const PACK_JATUN = { area: 2443, precioWeb: 280000, precioCatalogo: 350000 };

// ── Pipeline de leads ─────────────────────────────────────────────
export type LeadEtapa = 'nuevo' | 'respondido' | 'cita_propuesta' | 'cita_confirmada' | 'visita_hecha' | 'sena' | 'cerrado' | 'perdido';
export type LeadTemp = 'caliente' | 'tibio' | 'frio';

export const ETAPAS: { id: LeadEtapa; label: string; emoji: string }[] = [
  { id: 'nuevo',           label: 'Nuevo',      emoji: '📩' },
  { id: 'respondido',      label: 'Respondido', emoji: '💬' },
  { id: 'cita_propuesta',  label: 'Cita propuesta', emoji: '📅' },
  { id: 'cita_confirmada', label: 'Cita CONFIRMADA', emoji: '✅' },
  { id: 'visita_hecha',    label: 'Visita hecha', emoji: '🚶' },
  { id: 'sena',            label: 'Seña', emoji: '💵' },
  { id: 'cerrado',         label: 'Cerrado', emoji: '🏆' },
  { id: 'perdido',         label: 'Perdido', emoji: '🗑️' },
];

export interface Lead {
  id: string;
  nombre: string;
  predioId: number;
  etapa: LeadEtapa;
  temp: LeadTemp;
  nota?: string;
  ultimoToque: string; // YYYY-MM-DD
}

/** Los 21 leads reales de Marketplace — todos reactivados el 11-jun-2026 con cita sáb 13/dom 14 desde 4 p.m. */
export const LEADS_SEED: Lead[] = [
  { id: 'cyntia-2',   nombre: 'Cyntia',         predioId: 2,  etapa: 'cita_propuesta', temp: 'caliente', nota: 'PIDIÓ visita explícita (29-may); quedó en llamar. Quiere para cultivo.', ultimoToque: '2026-06-11' },
  { id: 'cyntia-3',   nombre: 'Cyntia',         predioId: 3,  etapa: 'cita_propuesta', temp: 'caliente', nota: 'Misma persona — ver ambos predios en una visita.', ultimoToque: '2026-06-11' },
  { id: 'bryan-3',    nombre: 'Bryan',          predioId: 3,  etapa: 'cita_propuesta', temp: 'caliente', nota: 'Preguntó partida registral/planos → respondido con honestidad legal + alternativa SUNARP.', ultimoToque: '2026-06-11' },
  { id: 'cristian-12',nombre: 'Cristian',       predioId: 12, etapa: 'cita_propuesta', temp: 'caliente', nota: 'Consultó 2 lotes (352 y 400 m²) — comparando. Ofrecida visita doble.', ultimoToque: '2026-06-11' },
  { id: 'cristian-10',nombre: 'Cristian',       predioId: 10, etapa: 'cita_propuesta', temp: 'caliente', nota: 'Segundo hilo del mismo comprador.', ultimoToque: '2026-06-11' },
  { id: 'anderson-2', nombre: 'Anderson',       predioId: 2,  etapa: 'cita_propuesta', temp: 'caliente', nota: 'Busca siembra con acceso; pidió precio y celular.', ultimoToque: '2026-06-11' },
  { id: 'juancarlos-7',nombre: 'Juan Carlos',   predioId: 7,  etapa: 'cita_propuesta', temp: 'caliente', nota: 'Pidió "último precio" y cuándo ver → respondido con contado preferencial.', ultimoToque: '2026-06-11' },
  { id: 'norma-3',    nombre: 'Norma Patricia', predioId: 3,  etapa: 'cita_propuesta', temp: 'tibio',    nota: 'Preguntó precio; vio respuesta y calló → reactivada con total + cita.', ultimoToque: '2026-06-11' },
  { id: 'gianina-10', nombre: 'Gianina',        predioId: 10, etapa: 'cita_propuesta', temp: 'tibio',    nota: 'Preguntó precio (66k) → reactivada con SUNARP + cita.', ultimoToque: '2026-06-11' },
  { id: 'laura-3',    nombre: 'A Laura',        predioId: 3,  etapa: 'cita_propuesta', temp: 'tibio',    nota: 'Preguntó documentación y costo → ampliado Juzgado de Paz + cita.', ultimoToque: '2026-06-11' },
  { id: 'julio-3',    nombre: 'Julio C',        predioId: 3,  etapa: 'cita_propuesta', temp: 'tibio',    ultimoToque: '2026-06-11' },
  { id: 'edwincito-7',nombre: 'Edwincito',      predioId: 7,  etapa: 'cita_propuesta', temp: 'tibio',    ultimoToque: '2026-06-11' },
  { id: 'michael-10', nombre: 'Michael',        predioId: 10, etapa: 'cita_propuesta', temp: 'tibio',    nota: 'Le habían dicho 3 p.m. → corregido a 4 p.m.', ultimoToque: '2026-06-11' },
  { id: 'lucia-7',    nombre: 'Lucia',          predioId: 7,  etapa: 'cita_propuesta', temp: 'tibio',    nota: 'Preguntó servicios básicos → respondida zona en consolidación + verificación en sitio.', ultimoToque: '2026-06-11' },
  { id: 'roderik-7',  nombre: 'Roderik',        predioId: 7,  etapa: 'cita_propuesta', temp: 'frio',     ultimoToque: '2026-06-11' },
  { id: 'luis-4',     nombre: 'Luis Jesus',     predioId: 4,  etapa: 'cita_propuesta', temp: 'frio',     ultimoToque: '2026-06-11' },
  { id: 'tania-2',    nombre: 'Tania',          predioId: 2,  etapa: 'cita_propuesta', temp: 'frio',     ultimoToque: '2026-06-11' },
  { id: 'roy-7',      nombre: 'Roy',            predioId: 7,  etapa: 'cita_propuesta', temp: 'frio',     ultimoToque: '2026-06-11' },
  { id: 'avencio-7',  nombre: 'Avencio',        predioId: 7,  etapa: 'cita_propuesta', temp: 'frio',     ultimoToque: '2026-06-11' },
  { id: 'efrain-3',   nombre: 'Efrain Alfonso', predioId: 3,  etapa: 'cita_propuesta', temp: 'frio',     ultimoToque: '2026-06-11' },
  { id: 'silvia-12',  nombre: 'Sïlvïä',         predioId: 12, etapa: 'cita_propuesta', temp: 'frio',     ultimoToque: '2026-06-11' },
  { id: 'leslye-10',  nombre: 'Leslye',         predioId: 10, etapa: 'cita_propuesta', temp: 'frio',     ultimoToque: '2026-06-11' },
  { id: 'rafael-10',  nombre: 'Rafael',         predioId: 10, etapa: 'cita_propuesta', temp: 'frio',     ultimoToque: '2026-06-11' },
];

/** Scripts listos (Hormozi A-C-A · Phil Jones · Dean Jackson) — copiar y personalizar [nombre]/[predio]. */
export const SCRIPTS: { label: string; texto: string }[] = [
  {
    label: '⚡ Respuesta a lead NUEVO (<5 min, termina en pregunta)',
    texto: 'Hola [nombre], le saluda la familia propietaria (venta directa, sin inmobiliaria). Sí, sigue disponible: [predio], S/ [precio]. Solo por curiosidad, ¿lo busca para construir, sembrar o como inversión? Así le oriento mejor.',
  },
  {
    label: '📅 Proponer cita (miércoles — armo lista del finde)',
    texto: 'Hola [nombre], estoy armando la lista de visitas guiadas de este fin de semana (sábados y domingos desde las 4:00 p.m., gratis y sin compromiso: recorre el terreno y revisa los papeles con el propietario). ¿Le queda mejor sábado o domingo?',
  },
  {
    label: '❄ Reactivar frío (9 palabras de Dean Jackson)',
    texto: '[nombre], ¿sigue buscando terreno en Huáchac?',
  },
  {
    label: '✅ Confirmación (jueves) + pin (viernes)',
    texto: 'Hola [nombre], le confirmo su visita del [día] a las [hora]. El punto de encuentro es la Plaza Principal de Huáchac — le paso el pin de ubicación. Cualquier cambio me avisa por aquí. ¡Le esperamos!',
  },
  {
    label: '🏠 Emigrado / fuera de Huancayo (tour por videollamada)',
    texto: 'Hola [nombre], si está fuera de la región también hacemos recorrido por videollamada de WhatsApp cualquier día y le mostramos los papeles en cámara. Muchos compatriotas que trabajan fuera compran así para asegurar su retorno. ¿Le agendo una videollamada?',
  },
];

/** Cadencia semanal (síntesis verificada: Hormozi + Keller 8x8 + Blount + referentes Perú) */
export const CADENCIA_SEMANA: { dia: string; accion: string }[] = [
  { dia: 'Lun', accion: 'Renovar listados Marketplace (cada ~5 días suben en el feed) + responder TODO lo del finde' },
  { dia: 'Mar', accion: 'Toque de valor: video-ficha de UN predio (formato @yovanahualpa14: papeles→m²→precio→celular)' },
  { dia: 'Mié', accion: 'TOQUE 3: "estoy armando la lista de visitas del sábado, ¿le aparto cupo?" a todos los tibios/calientes' },
  { dia: 'Jue', accion: 'Confirmar citas + publicar 1 predio en grupo FB Huancayo-Chupaca' },
  { dia: 'Vie', accion: 'Enviar pin GPS de la Plaza a confirmados + último recordatorio' },
  { dia: 'Sáb', accion: 'AM: reconfirmar. 4:00 p.m.: visitas escalonadas (4:00/4:45/5:30 — que los interesados se crucen)' },
  { dia: 'Dom', accion: 'Visitas + cierre semanal: actualizar etapas del pipeline, medir visitas/no-shows (la OMTM)' },
];
