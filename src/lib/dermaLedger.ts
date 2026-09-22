/**
 * dermaLedger.ts — LEDGER por caso/pregunta del bloque Derma (PLAN ÉLITE v2.1 · 5-sep-2026 · v3 12-sep-2026).
 *
 * Palmerton: "medir por % ciego" + "etiquetar cada fallo con su módulo CORE". Hasta ahora Derma solo
 * persistía el día hecho (studyProgress 'derma'); aquí se registra CADA caso ciego (2/sesión · 1 en el taper
 * d44-d49 · 3 desde d50, ids fijos de DERMA_CASO_ORDEN), cada ~10Q de review, la imagen dermatoscópica ciega y el drill HDPH, con:
 *  · v3: CURSOR por banco (dermaBancoCursor = max(id)+1 → "retoma en Q#", porque cada link qa.aspx abre el banco
 *    desde el principio) · CURA PENDIENTE (dermaCuraPendiente: un fallo CCSN en la última sesión devuelve el
 *    Differential Diagnosis Challenge, cases 1616, como cura OBLIGATORIA de la siguiente sesión) · sesiones del
 *    ciclo 2 (d74-d103, dermaCiclo2.ts) resueltas por dermaDiaPorD.
 *  · acierto (paso ③, antes de la discusión) · evalAcierto = matriz confianza×acierto
 *    (conocimiento | suerte | confusion | no-sabia) · tipoError (CCSN | CONCEPTO | MORFOLOGIA | DDX)
 *  · moduloCORE (Med/Path/Peds/Surg — los casos lo traen por id) · descripcion8ejes 0-8 (paso ①).
 *
 * Persistencia (web): localStorage 'jmd-derma-casos' = TODAS las entradas (append-only) y
 * 'jmd-derma-fallos' = espejo con el MISMO esquema, solo fallos + aciertos por suerte (la lista de la
 * 2ª pasada FSRS: parciales d47-d49 del taper y REPASO 1 d72). Sin storage (SSR/nativo) todo es no-op seguro y devuelve [].
 * Esquema idéntico al de DATA/DERMATOLOGIA/TRACKING/_registro_derma.json (esquema_item / esquema_ronda):
 * dermaLedgerExportJSON() produce el bloque que se pega en rondas[] (d73 · cierre 14:13).
 *
 * Consumidores (componentes): DermaClinicalPlate (botón acierto/fallo + chips), DermaMorphologyDictation (descripcion8ejes),
 * DermaHub "Debilidades por módulo CORE", checkpoints d51/d52/d72/d73 (DERMA_CHECKPOINTS de dermaDailyPlan.ts).
 */
import { dermaCasoArea, cases, DERMA_BANCOS, dermaBancoDeUrl, type DermaAreaCORE, type DermaBloqueKey, type DermaBancoKey, type MatLink, type DiaDerma } from './dermaDailyPlan';
import { dermaDiaPorD } from './dermaCiclo2';

export const DERMA_LEDGER_KEY = 'jmd-derma-casos';
export const DERMA_FALLOS_KEY = 'jmd-derma-fallos';
export const DERMA_LEDGER_VERSION = 1;

/** Fuente de una entrada: caso ciego · banco de review (clave = DermaBancoKey de dermaDailyPlan) · imagen dermatoscópica · drill. */
export type DermaFuente = 'caso' | DermaBancoKey | 'dermatoscopia' | 'drill';
export type DermaEvalAcierto = 'conocimiento' | 'suerte' | 'confusion' | 'no-sabia';
export type DermaTipoError = 'CCSN' | 'CONCEPTO' | 'MORFOLOGIA' | 'DDX';

export const DERMA_FUENTES: Array<{ k: DermaFuente; label: string }> = [
  { k: 'caso', label: 'Caso ciego (Board Review 200)' },
  { k: 'pictorial', label: 'Pictorial Review 4e' },
  { k: 'pictorial3', label: 'Pictorial Review 3e (relevo desde d67)' },
  { k: 'core', label: 'CORE Exam Bank' },
  { k: 'barnhill', label: "Barnhill's Challenge (dermpath)" },
  { k: 'qotw', label: 'Question of the Week' },
  { k: 'lange', label: 'LANGE Clinical Dermatology Cases (48Q)' },
  { k: 'dermatoscopia', label: 'Imagen dermatoscópica ciega' },
  { k: 'drill', label: 'Drill oclusión vascular 90 s' },
];
/** Fuentes que son bancos de preguntas (las que llevan cursor "retoma en Q#"). */
export const DERMA_FUENTES_BANCO: DermaBancoKey[] = DERMA_BANCOS.map((b) => b.fuente);
/** Fuentes que cuentan para el % ciego y el mapa de fallos (casos + bancos; NO drill ni dermatoscopia). */
export const DERMA_FUENTES_MEDIBLES: DermaFuente[] = ['caso', ...DERMA_FUENTES_BANCO];
/** Matriz Palmerton confianza × acierto (chips del cierre). Solo 'conocimiento' cuenta para el % ciego. */
export const DERMA_EVAL_ACIERTO: Array<{ k: DermaEvalAcierto; label: string; acierto: boolean; desc: string }> = [
  { k: 'conocimiento', label: 'Lo sabía', acierto: true, desc: 'acierto seguro → cuenta para el % ciego' },
  { k: 'suerte', label: 'Acerté por suerte', acierto: true, desc: 'acierto adivinado → NO cuenta; va a la 2ª pasada' },
  { k: 'confusion', label: 'Confundí', acierto: false, desc: 'sabía ambas entidades y no discriminé (CCSN / DDX)' },
  { k: 'no-sabia', label: 'No lo sabía', acierto: false, desc: 'vacío de concepto o de morfología' },
];
export const DERMA_TIPO_ERROR: Array<{ k: DermaTipoError; label: string; cura: string }> = [
  { k: 'CCSN', label: 'CCSN', cura: 'tabla comparativa + oclusión del rasgo discriminador' },
  { k: 'CONCEPTO', label: 'Concepto', cura: 'tarjeta de MECANISMO + 10′ de Fitzpatrick + ficha del cerebro clínico' },
  { k: 'MORFOLOGIA', label: 'Morfología', cura: 're-describir con los 8 ejes + DermNet terminology' },
  { k: 'DDX', label: 'Diferencial', cura: 'pares del DD Challenge del bloque + "¿qué 3 entidades dan esta morfología aquí?"' },
];
/** Rúbrica de 8 ejes del paso ① (describir ANTES de diagnosticar) — gate del módulo A. */
export const DERMA_EJES_MORFOLOGIA: Array<{ n: number; eje: string; ejemplos: string }> = [
  { n: 1, eje: 'Lesión primaria', ejemplos: 'mácula · pápula · placa · nódulo · vesícula · ampolla · pústula · habón · tumor' },
  { n: 2, eje: 'Lesión secundaria', ejemplos: 'escama · costra · erosión · úlcera · fisura · atrofia · cicatriz · liquenificación · excoriación' },
  { n: 3, eje: 'Color', ejemplos: 'eritematosa · violácea · hiperpigmentada · hipopigmentada · amarilla · perlada (en piel de color: gris/violáceo, no rojo)' },
  { n: 4, eje: 'Forma / borde', ejemplos: 'redonda · oval · poligonal · umbilicada · borde definido / difuso / sobreelevado / activo' },
  { n: 5, eje: 'Superficie / palpación', ejemplos: 'lisa · rugosa · verrucosa · escamosa · brillante · indurada · fluctuante · blanda' },
  { n: 6, eje: 'Configuración', ejemplos: 'anular · arciforme · lineal / Blaschko · agrupada (herpetiforme) · en diana · serpiginosa · reticulada' },
  { n: 7, eje: 'Distribución', ejemplos: 'localizada · generalizada · simétrica · fotoexpuesta · flexural / extensora · acral · dermatomal · folicular' },
  { n: 8, eje: 'Tamaño / número', ejemplos: 'mm/cm · única · múltiple · confluente · monomorfa / polimorfa' },
];
export const DERMA_GATE_MODULO_A = { descripciones: 10, minimo: 6 } as const;

/** Módulo CORE por defecto de un bloque del plan (para preguntas de banco sin área explícita). */
export const DERMA_MODULO_POR_BLOQUE: Record<DermaBloqueKey, DermaAreaCORE> = {
  A: 'Med', B: 'Med', C: 'Med', D: 'Med', E: 'Path', F: 'Peds', G: 'Surg', H: 'Med', Z: 'Med', X: 'Surg',
};
export const DERMA_AREAS: DermaAreaCORE[] = ['Med', 'Path', 'Peds', 'Surg'];
export const DERMA_BLOQUES: DermaBloqueKey[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Z', 'X'];

export interface DermaLedgerEntry {
  /** uid único (ts base36 + aleatorio) · ts = ISO de creación · append-only: nunca se edita ni borra */
  uid: string; ts: string;
  /** id del caso (1-200) · nº de pregunta del banco · 0 para el drill / imagen dermatoscópica sin id */
  id: number;
  fecha: string;                 // YYYY-MM-DD de la sesión
  d?: number;                    // sesión del plan (1-73 ciclo 1 · 74-103 ciclo 2)
  bKey?: DermaBloqueKey;         // bloque del plan (A..X)
  fuente: DermaFuente;
  acierto: boolean;              // diagnóstico correcto en el paso ③ (antes de la discusión)
  moduloCORE: DermaAreaCORE;
  evalAcierto: DermaEvalAcierto; // matriz Palmerton confianza × acierto
  tipoError: DermaTipoError | null;
  descripcion8ejes?: number;     // 0-8 (paso ①, solo casos / imágenes)
  nota?: string;
}
export type DermaLedgerInput = Omit<DermaLedgerEntry, 'uid' | 'ts' | 'moduloCORE' | 'evalAcierto' | 'tipoError' | 'bKey'> & {
  moduloCORE?: DermaAreaCORE; evalAcierto?: DermaEvalAcierto; tipoError?: DermaTipoError | null; bKey?: DermaBloqueKey;
};

// ── storage (localStorage web; no-op seguro sin storage; claves con prefijo jmd-) ──
function leer(key: string): DermaLedgerEntry[] {
  try {
    const ls = (globalThis as any).localStorage;
    if (!ls) return [];
    const raw = ls.getItem(key);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => x && typeof x.uid === 'string' && typeof x.fecha === 'string' && typeof x.id === 'number') : [];
  } catch { return []; }
}
function escribir(key: string, list: DermaLedgerEntry[]): boolean {
  try { const ls = (globalThis as any).localStorage; if (!ls) return false; ls.setItem(key, JSON.stringify(list)); return true; }
  catch { return false; }
}
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(Number(n) || 0)));
/** Un fallo "Palmerton" = fallo real o acierto por suerte (las adivinadas no cuentan). */
export const esFalloPalmerton = (e: Pick<DermaLedgerEntry, 'acierto' | 'evalAcierto'>) => !e.acierto || e.evalAcierto === 'suerte';

/** Todas las entradas (orden de inserción). */
export function dermaLedgerLoad(): DermaLedgerEntry[] { return leer(DERMA_LEDGER_KEY); }
/** Espejo de fallos ('jmd-derma-fallos', mismo esquema). */
export function dermaFallosLoad(): DermaLedgerEntry[] { return leer(DERMA_FALLOS_KEY); }

/**
 * Añade una entrada (append-only) al ledger y, si es fallo Palmerton, también al espejo de fallos.
 * moduloCORE: los casos lo derivan del id (dermaCasoArea); el resto usa el dado o el del bloque.
 * evalAcierto por defecto: acierto → 'conocimiento' · fallo → 'no-sabia'.
 */
export function dermaLedgerAppend(e: DermaLedgerInput): { entry: DermaLedgerEntry; guardado: boolean } {
  const dia = e.d ? dermaDiaPorD(e.d) : undefined;
  const bKey = e.bKey || dia?.bKey;
  const id = clamp(e.id, 0, 100000);
  const moduloCORE: DermaAreaCORE = e.fuente === 'caso' && id >= 1 && id <= 200 ? dermaCasoArea(id)
    : e.moduloCORE || (bKey ? DERMA_MODULO_POR_BLOQUE[bKey] : 'Med');
  const evalAcierto: DermaEvalAcierto = e.evalAcierto || (e.acierto ? 'conocimiento' : 'no-sabia');
  const acierto = !!e.acierto && (evalAcierto === 'conocimiento' || evalAcierto === 'suerte');
  const entry: DermaLedgerEntry = {
    ...e,
    uid: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    ts: new Date().toISOString(),
    id, bKey, moduloCORE, evalAcierto, acierto,
    tipoError: acierto ? null : (e.tipoError || (evalAcierto === 'confusion' ? 'CCSN' : 'CONCEPTO')),
    descripcion8ejes: e.descripcion8ejes == null ? undefined : clamp(e.descripcion8ejes, 0, 8),
  };
  const list = dermaLedgerLoad(); list.push(entry);
  const guardado = escribir(DERMA_LEDGER_KEY, list);
  if (esFalloPalmerton(entry)) { const f = dermaFallosLoad(); f.push(entry); escribir(DERMA_FALLOS_KEY, f); }
  return { entry, guardado };
}

/** Entradas de una sesión del plan (por d) o de una fecha. */
export function dermaLedgerDeSesion(d: number, entries: DermaLedgerEntry[] = dermaLedgerLoad()): DermaLedgerEntry[] { return entries.filter((e) => e.d === d); }
export function dermaLedgerDeFecha(fecha: string, entries: DermaLedgerEntry[] = dermaLedgerLoad()): DermaLedgerEntry[] { return entries.filter((e) => e.fecha === fecha); }
/** Última entrada de un caso (fuente 'caso') — para pintar ✓/✗ en la lámina y no duplicar. */
export function dermaCasoEstado(casoId: number, entries: DermaLedgerEntry[] = dermaLedgerLoad()): DermaLedgerEntry | undefined {
  return entries.filter((e) => e.fuente === 'caso' && e.id === casoId).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''))[0];
}
/** ¿Los 2 casos de la sesión ya tienen entrada? (para el botón "marcar día" del cierre). */
export function dermaSesionCasosRegistrados(casoIds: readonly number[], entries: DermaLedgerEntry[] = dermaLedgerLoad()): boolean {
  return casoIds.every((id) => !!dermaCasoEstado(id, entries));
}

// ── estadísticas: % fallo por módulo CORE y por bloque A-X (Checkpoint d45) ──
export interface DermaStat { clave: string; n: number; seguras: number; suerte: number; fallos: number; pctFallo: number; pctCiego: number; tipos: Record<DermaTipoError, number>; ultimo: string }
const statVacio = (clave: string): DermaStat => ({ clave, n: 0, seguras: 0, suerte: 0, fallos: 0, pctFallo: 0, pctCiego: 0, tipos: { CCSN: 0, CONCEPTO: 0, MORFOLOGIA: 0, DDX: 0 }, ultimo: '' });
function acumular(s: DermaStat, e: DermaLedgerEntry) {
  s.n++;
  if (e.acierto && e.evalAcierto === 'conocimiento') s.seguras++;
  else if (e.acierto) s.suerte++;
  else { s.fallos++; if (e.tipoError) s.tipos[e.tipoError]++; }
  if (e.fecha > s.ultimo) s.ultimo = e.fecha;
}
function cerrar(s: DermaStat): DermaStat {
  const pctFallo = s.n ? Math.round(((s.fallos + s.suerte) / s.n) * 1000) / 10 : 0; // fallo Palmerton (suerte cuenta como fallo)
  const pctCiego = s.n ? Math.round((s.seguras / s.n) * 1000) / 10 : 0;
  return { ...s, pctFallo, pctCiego };
}
function statsPor(entries: DermaLedgerEntry[], claves: string[], claveDe: (e: DermaLedgerEntry) => string | undefined, fuentes?: DermaFuente[]): DermaStat[] {
  const m = new Map<string, DermaStat>(claves.map((k) => [k, statVacio(k)]));
  for (const e of entries) {
    if (fuentes && !fuentes.includes(e.fuente)) continue;
    const k = claveDe(e); if (!k) continue;
    const s = m.get(k) || statVacio(k); acumular(s, e); m.set(k, s);
  }
  return Array.from(m.values()).map(cerrar);
}
/** % fallo por módulo CORE (Med/Path/Peds/Surg), ordenado de peor a mejor. Por defecto excluye drill/dermatoscopia. */
export function dermaPctFalloPorModulo(entries: DermaLedgerEntry[] = dermaLedgerLoad(), fuentes: DermaFuente[] = DERMA_FUENTES_MEDIBLES): DermaStat[] {
  return statsPor(entries, DERMA_AREAS, (e) => e.moduloCORE, fuentes).sort((a, b) => b.pctFallo - a.pctFallo || b.n - a.n);
}
/** % fallo por bloque del plan (A..X), ordenado de peor a mejor (bloque por bKey o por d). */
export function dermaPctFalloPorBloque(entries: DermaLedgerEntry[] = dermaLedgerLoad(), fuentes?: DermaFuente[]): DermaStat[] {
  return statsPor(entries, DERMA_BLOQUES, (e) => e.bKey || (e.d ? dermaDiaPorD(e.d)?.bKey : undefined), fuentes).sort((a, b) => b.pctFallo - a.pctFallo || b.n - a.n);
}
/** % ciego global = aciertos seguros / n (dudosas y adivinadas NO cuentan). */
export function dermaPctCiego(entries: DermaLedgerEntry[] = dermaLedgerLoad(), fuentes: DermaFuente[] = DERMA_FUENTES_MEDIBLES) {
  const s = cerrar(entries.filter((e) => fuentes.includes(e.fuente)).reduce((acc, e) => { acumular(acc, e); return acc; }, statVacio('total')));
  return { n: s.n, seguras: s.seguras, suerte: s.suerte, fallos: s.fallos, pctCiego: s.pctCiego, pctFallo: s.pctFallo };
}
/** Distribución de tipos de error (para "tipo dominante" del d45). */
export function dermaTiposError(entries: DermaLedgerEntry[] = dermaLedgerLoad()): { tipos: Record<DermaTipoError, number>; dominante: DermaTipoError | null } {
  const tipos: Record<DermaTipoError, number> = { CCSN: 0, CONCEPTO: 0, MORFOLOGIA: 0, DDX: 0 };
  for (const e of entries) if (!e.acierto && e.tipoError) tipos[e.tipoError]++;
  const dominante = (Object.keys(tipos) as DermaTipoError[]).sort((a, b) => tipos[b] - tipos[a])[0];
  return { tipos, dominante: dominante && tipos[dominante] > 0 ? dominante : null };
}
/** Las 2 áreas CORE con mayor % fallo (mín. `minN` ítems) → re-drill del d46. */
export function dermaAreasFlojas(entries: DermaLedgerEntry[] = dermaLedgerLoad(), minN = 4, top = 2): DermaAreaCORE[] {
  return dermaPctFalloPorModulo(entries).filter((s) => s.n >= minN).slice(0, top).map((s) => s.clave as DermaAreaCORE);
}

// ── gate del módulo A: descripción morfológica en 8 ejes ──
export function dermaGateModuloA(entries: DermaLedgerEntry[] = dermaLedgerLoad()) {
  const puntuadas = entries.filter((e) => typeof e.descripcion8ejes === 'number').map((e) => e.descripcion8ejes as number);
  const n = puntuadas.length;
  const media = n ? Math.round((puntuadas.reduce((a, b) => a + b, 0) / n) * 10) / 10 : 0;
  const buenas = puntuadas.filter((p) => p >= DERMA_GATE_MODULO_A.minimo).length;
  return { n, media, buenas, superado: buenas >= DERMA_GATE_MODULO_A.descripciones, faltan: Math.max(0, DERMA_GATE_MODULO_A.descripciones - buenas) };
}

// ── 2ª pasada FSRS (v3: parciales d47-d49 del taper 25-ene → 8-feb-2027 + REPASO 1 d72 mar 13-abr-2027; en la v2.1 era d69): SOLO fallos del ledger, por módulo más flojo ──
export interface DermaCasoRepaso { id: number; area: DermaAreaCORE; veces: number; ultimaFecha: string; tipoError: DermaTipoError | null; d?: number }
/** Casos (fuente 'caso') fallados o acertados por suerte, sin duplicar, ordenados por el módulo con mayor % fallo y luego por nº de fallos. */
export function dermaCasosParaSegundaPasada(entries: DermaLedgerEntry[] = dermaLedgerLoad()): DermaCasoRepaso[] {
  const orden = dermaPctFalloPorModulo(entries).map((s) => s.clave);
  const m = new Map<number, DermaCasoRepaso>();
  for (const e of entries) {
    if (e.fuente !== 'caso' || !esFalloPalmerton(e)) continue;
    const r = m.get(e.id) || { id: e.id, area: e.moduloCORE, veces: 0, ultimaFecha: '', tipoError: null, d: e.d };
    r.veces++; if (e.fecha > r.ultimaFecha) { r.ultimaFecha = e.fecha; r.tipoError = e.tipoError; }
    m.set(e.id, r);
  }
  // un caso vuelto a resolver con 'conocimiento' después de su último fallo sale de la lista
  const out = Array.from(m.values()).filter((r) => { const u = dermaCasoEstado(r.id, entries); return !u || esFalloPalmerton(u); });
  return out.sort((a, b) => orden.indexOf(a.area) - orden.indexOf(b.area) || b.veces - a.veces || a.ultimaFecha.localeCompare(b.ultimaFecha));
}
/** Preguntas de banco falladas (para el re-drill del checkpoint 2 por fuente). */
export function dermaPreguntasFalladas(entries: DermaLedgerEntry[] = dermaLedgerLoad(), fuente?: DermaFuente): DermaLedgerEntry[] {
  return entries.filter((e) => e.fuente !== 'caso' && esFalloPalmerton(e) && (!fuente || e.fuente === fuente));
}

// ── v3 · CURSOR por banco ("retoma en Q#") ──
/**
 * Próxima pregunta del banco = max(id) + 1 de las entradas de esa fuente (id ≥ 1). Sin entradas → 1.
 * Cada link qa.aspx abre el banco desde el principio; el ColaItem de review muestra "retoma en Q#".
 * Con `url` (el link de review de la fila) se resuelve la fuente por resourceid (dermaBancoDeUrl).
 */
export function dermaBancoCursor(fuente: DermaBancoKey, entries: DermaLedgerEntry[] = dermaLedgerLoad()): number {
  let max = 0;
  for (const e of entries) if (e.fuente === fuente && e.id >= 1 && e.id > max) max = e.id;
  return max + 1;
}
export function dermaBancoCursorDeUrl(url: string | undefined | null, entries: DermaLedgerEntry[] = dermaLedgerLoad()): { fuente: DermaBancoKey; cursor: number; totalQ: number; agotado: boolean } | undefined {
  const fuente = dermaBancoDeUrl(url); if (!fuente) return undefined;
  const banco = DERMA_BANCOS.find((b) => b.fuente === fuente)!;
  const cursor = dermaBancoCursor(fuente, entries);
  return { fuente, cursor, totalQ: banco.totalQ, agotado: cursor > banco.totalQ };
}
/** Cursores de todos los bancos (widget de Debilidades / presupuesto). */
export function dermaBancoCursores(entries: DermaLedgerEntry[] = dermaLedgerLoad()): Array<{ fuente: DermaBancoKey; t: string; cursor: number; totalQ: number; hechas: number; restantes: number }> {
  return DERMA_BANCOS.map((b) => { const cursor = dermaBancoCursor(b.fuente, entries); return { fuente: b.fuente, t: b.t, cursor, totalQ: b.totalQ, hechas: Math.min(cursor - 1, b.totalQ), restantes: Math.max(0, b.totalQ - (cursor - 1)) }; });
}

// ── v3 · CURA PENDIENTE (tipoError CCSN → DD Challenge obligatorio en la siguiente sesión) ──
/** Link de cura por tipo de error (DERMA_TIPO_ERROR.cura hecho accionable). CCSN y DDX → Differential Diagnosis Challenge (cases 1616). */
export const DERMA_CURA_LINK: Record<DermaTipoError, MatLink> = {
  CCSN: { t: 'CURA CCSN · Differential Diagnosis Challenge: 3 pares del bloque del fallo + tabla comparativa + oclusión del rasgo discriminador', url: cases(1616) },
  DDX: { t: 'CURA DDX · Differential Diagnosis Challenge: "¿qué 3 entidades dan esta morfología aquí?"', url: cases(1616) },
  MORFOLOGIA: { t: 'CURA MORFOLOGÍA · re-describir con los 8 ejes (DermNet terminology)', url: 'https://dermnetnz.org/topics/terminology' },
  CONCEPTO: { t: 'CURA CONCEPTO · tarjeta de MECANISMO + 10′ de Fitzpatrick del diagnóstico fallado', url: 'https://dermatology.mhmedical.com/book.aspx?bookid=2570' },
};
export interface DermaCuraPendiente {
  /** Sesión (fecha/d) cuyos fallos originan la cura; se cumple en la SIGUIENTE sesión. */
  desdeFecha: string; desdeD?: number;
  tipo: DermaTipoError; obligatoria: boolean; n: number;
  /** ids de los casos (fuente 'caso') y preguntas (fuente+id) fallados con ese tipo. */
  casos: number[]; preguntas: Array<{ fuente: DermaFuente; id: number }>;
  link: MatLink; cura: string;
}
/**
 * Cura pendiente para la próxima sesión: mira la ÚLTIMA sesión registrada (mayor fecha) y, si tiene fallos con
 * tipoError CCSN, devuelve el DD Challenge como cura OBLIGATORIA (regla v3, gaps_v3b_derma nº5). Si no hay CCSN pero sí
 * otro tipo dominante, devuelve su cura como recomendada (obligatoria: false). `hoy` (ISO) opcional: si la última sesión
 * registrada ES hoy, la cura sigue siendo "para la siguiente" (se devuelve igual, con desdeFecha = hoy). null = nada pendiente.
 */
export function dermaCuraPendiente(entries: DermaLedgerEntry[] = dermaLedgerLoad()): DermaCuraPendiente | null {
  const medibles = entries.filter((e) => DERMA_FUENTES_MEDIBLES.includes(e.fuente) && e.fecha);
  if (!medibles.length) return null;
  const ultima = medibles.reduce((m, e) => (e.fecha > m ? e.fecha : m), '');
  const fallos = medibles.filter((e) => e.fecha === ultima && !e.acierto && e.tipoError);
  if (!fallos.length) return null;
  const porTipo = (t: DermaTipoError) => fallos.filter((e) => e.tipoError === t);
  const ccsn = porTipo('CCSN');
  let tipo: DermaTipoError; let obligatoria: boolean;
  if (ccsn.length) { tipo = 'CCSN'; obligatoria = true; }
  else {
    tipo = (['DDX', 'MORFOLOGIA', 'CONCEPTO'] as DermaTipoError[]).sort((a, b) => porTipo(b).length - porTipo(a).length)[0];
    obligatoria = false;
  }
  const sel = porTipo(tipo);
  const cura = DERMA_TIPO_ERROR.find((x) => x.k === tipo)?.cura || '';
  return {
    desdeFecha: ultima, desdeD: sel.find((e) => e.d)?.d, tipo, obligatoria, n: sel.length,
    casos: Array.from(new Set(sel.filter((e) => e.fuente === 'caso').map((e) => e.id))),
    preguntas: sel.filter((e) => e.fuente !== 'caso').map((e) => ({ fuente: e.fuente, id: e.id })),
    link: DERMA_CURA_LINK[tipo], cura,
  };
}
/** ¿La cura pendiente aplica a esta sesión? (la sesión es posterior a la que originó el fallo). */
export function dermaCuraAplicaA(dia: Pick<DiaDerma, 'fecha'>, cura: DermaCuraPendiente | null = dermaCuraPendiente()): boolean {
  return !!cura && dia.fecha > cura.desdeFecha;
}

// ── export / import (esquema de _registro_derma.json) ──
export interface DermaRonda { fecha: string; d?: number; bKey?: DermaBloqueKey; fuente: DermaFuente; n: number; correctas_seguras: number; correctas_dudosas: number; fallos_por_tipo: Record<DermaTipoError, number>; pct_ciego: number; items: Array<{ id: number; fecha: string; d?: number; fuente: DermaFuente; moduloCORE: DermaAreaCORE; acierto: boolean; eval_acierto: DermaEvalAcierto; error_tipo: DermaTipoError | null; descripcion8ejes?: number; nota?: string }> }
/** Agrupa las entradas en rondas (fecha + fuente) con el esquema_ronda del registro. */
export function dermaRondasDesdeLedger(entries: DermaLedgerEntry[] = dermaLedgerLoad()): DermaRonda[] {
  const m = new Map<string, DermaRonda>();
  for (const e of entries) {
    const k = `${e.fecha}|${e.fuente}`;
    const r = m.get(k) || { fecha: e.fecha, d: e.d, bKey: e.bKey, fuente: e.fuente, n: 0, correctas_seguras: 0, correctas_dudosas: 0, fallos_por_tipo: { CCSN: 0, CONCEPTO: 0, MORFOLOGIA: 0, DDX: 0 }, pct_ciego: 0, items: [] };
    r.n++;
    if (e.acierto && e.evalAcierto === 'conocimiento') r.correctas_seguras++;
    else if (e.acierto) r.correctas_dudosas++;
    else if (e.tipoError) r.fallos_por_tipo[e.tipoError]++;
    r.items.push({ id: e.id, fecha: e.fecha, d: e.d, fuente: e.fuente, moduloCORE: e.moduloCORE, acierto: e.acierto, eval_acierto: e.evalAcierto, error_tipo: e.tipoError, descripcion8ejes: e.descripcion8ejes, nota: e.nota });
    m.set(k, r);
  }
  return Array.from(m.values()).map((r) => ({ ...r, pct_ciego: r.n ? Math.round((r.correctas_seguras / r.n) * 1000) / 10 : 0 })).sort((a, b) => a.fecha.localeCompare(b.fecha));
}
/** Export JSON (pegar en DATA/DERMATOLOGIA/TRACKING/_registro_derma.json → rondas[]; d70 / handoff). */
export function dermaLedgerExportJSON(): string {
  const entradas = dermaLedgerLoad();
  return JSON.stringify({ version: DERMA_LEDGER_VERSION, plan: 'DERMA', exportado: new Date().toISOString(), resumen: dermaPctCiego(entradas), por_modulo: dermaPctFalloPorModulo(entradas), por_bloque: dermaPctFalloPorBloque(entradas), rondas: dermaRondasDesdeLedger(entradas), entradas }, null, 2);
}
/** Import/merge por uid (otro dispositivo o el JSON del registro). Devuelve nº de entradas añadidas. */
export function dermaLedgerImportJSON(json: string): number {
  try {
    const obj = JSON.parse(json);
    const src: DermaLedgerEntry[] = Array.isArray(obj) ? obj : Array.isArray(obj?.entradas) ? obj.entradas : [];
    const list = dermaLedgerLoad(); const ids = new Set(list.map((x) => x.uid)); let n = 0;
    for (const e of src) if (e && e.uid && !ids.has(e.uid) && typeof e.id === 'number' && typeof e.fecha === 'string') { list.push(e); ids.add(e.uid); n++; }
    if (n) {
      list.sort((a, b) => (a.ts || '').localeCompare(b.ts || ''));
      escribir(DERMA_LEDGER_KEY, list);
      escribir(DERMA_FALLOS_KEY, list.filter(esFalloPalmerton));
    }
    return n;
  } catch { return 0; }
}
/** Reconstruye 'jmd-derma-fallos' desde el ledger principal (si se desincronizan). */
export function dermaFallosRebuild(): number {
  const f = dermaLedgerLoad().filter(esFalloPalmerton);
  escribir(DERMA_FALLOS_KEY, f);
  return f.length;
}
