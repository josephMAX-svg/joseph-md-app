/**
 * rutinaGuia.ts — QUÉ · CUÁNTO · CÓMO del RESTO del día (formato común `GuiaBloque` de src/lib/guia.ts) · v6.02c (dom 18-oct-2026, E5).
 *
 * Pedido de Joseph (18-oct): «para TODOS los casos debemos tener establecido QUÉ leer, CUÁNTO leer, CÓMO leer — no puede estar al azar —
 * … qué ver (vídeos y demás) … y para todo lo que hay que hacer durante el día» + «vamos a partir desde cero con el inglés: despacio».
 * Este módulo cubre las franjas que no son USMLE (E1) · MIR/Derma (E3) · ENCAPS/Research (E4):
 *   04:15 VIBECODING (L-V)            guiaVibeDe          · 45′ (15′ / 5′ en deload y taper) · comandos exactos + journal
 *   12:30 SYNAPSE (L-V)               guiaSynapseDe       · 30′ = A 15′ pantalla · B 10′ audio · C 5′ lectura
 *   13:00 BUSINESS (L-V, NUEVA)       guiaBusinessDe      · 25′ (L) · OUTPUT viernes 25′ + sábado 15′ (ver «Business» abajo)
 *   14:15 AURUM (L-V)                 guiaAurumDe         · 60′ en F1 (30′ desde el 4-ene, DJ-4) · vídeo CONCRETO + drill + lectura
 *   17:15 LIVIANO (L-V)               guiaLivianoDe       · 45′ = 25′ estudio (sección + palabras) + 20′ aplicación · viernes = caso
 *   sáb 07:15 REVISIÓN SEMANAL        guiaRevisionDe      · 30′ con el fichero S<NN>_<sábado>.md
 *   sáb 15:00 SHIP + SYNAPSE (PC)     guiaShipDe          · 120′ = SHIP del proyecto 90′ + SYNAPSE A/B/C 30′ (taper: PC 30′/0′ + A/B/C)
 *   dom 15:00 FEYNMAN (opcional)      guiaFeynmanDe       · 10′
 * Hecho A MANO (no es un .ts generado): REGLAS para todos los días de cada plan (lee las filas de los .ts generados, que NO cambian) +
 * CURADURÍA de la semana 1 (v6.02: lun 19 → dom 25-oct-2026; v6.03: la curaduría va por PASO / PIEZA / FILA del plan y no por fecha, así
 * sigue al plan cuando corre — ver vibeS1(k), SYN_CUR_PIEZAS, BIZ_TRAMO y LIV_LECT) y de los recursos con URL verificada el dom 18-oct-2026 (YouTube: título, canal y
 * duración leídos de la página del vídeo · PubMed/PMC por E-utilities · secciones y nº de palabras de Schwartz 2017 leídos de PMC ·
 * Apple Podcasts lookup). Lo que no se pudo verificar se dice («sin medir», «A VERIFICAR»); no hay páginas inventadas.
 * Verificación: node DATA/_scripts/check_rutina_guia.js (Σ pasos = franja en TODOS los días de los 7 planes · URLs con esquema válido).
 *
 * Decisiones de carga (v6.02c, E5 — escritas también en los avisos de cada bloque):
 *  · BUSINESS no tenía franja ni aparecía en el Home: va a 13:00-13:25 (L-V), la franja «LECTURA DE LIBRO 13:00-13:15» del Calendar (cuya
 *    descripción ya dice «el libro del nivel en curso — Biblioteca del Fundador», que es justo lo que lee Business) + 10′ del hueco 13:15-13:30
 *    (la siesta opcional ≤20′ sigue siendo la válvula ÁMBAR: en ÁMBAR Business baja a 13:00-13:15). El OUTPUT del viernes (40′) = 25′ el
 *    viernes + 15′ el sábado 07:45-08:00, tras la revisión semanal (el tracker semanal de sueño/ejercicio/comida se llena mejor con la semana
 *    cerrada). Días de hito USMLE: UWSA1 (v6.03: mié 21-oct · v6.02: lun 19-oct; almuerzo 13:00-13:30) = solo audio durante el almuerzo · NBME (almuerzo 12:30-13:00,
 *    SYNAPSE 13:00) = audio 12:30-12:55 y, si es viernes de OUTPUT, el OUTPUT entero pasa al sábado 07:45-08:25 (v6.03: los NBME de F1 caen en martes y miércoles: ningún viernes de OUTPUT coincide). (Calendar ya alineado el 18-oct, CAL_V6 §12) El Calendar seguía con
 *    «LECTURA DE LIBRO 13:00-13:15»: que lo amplíe a 13:25 lo decide el orquestador / Joseph.
 *  · SYNAPSE en días de hito: el día del UWSA1 (v6.03: mié 21-oct · v6.02: lun 19-oct) 07:25-07:55, entre las 2 partes de la preparación del hito (USMLE 07:15-07:25 y 07:55-08:50;
 *    v6.02c F2: una sola vez, en su tarjeta propia — la guía USMLE ya no lo repite) · NBME 13:00-13:30.
 *  · AURUM (60′ en F1): 1′ arranque + vídeo A + drill + la LECTURA L en los minutos que sobran de la hora (el plan la ponía «en huecos de
 *    viaje», que en la práctica no existen) + 2′ cierre; lo que de L no cabe queda como lectura de huecos (no es núcleo). Si sobra tiempo tras
 *    L: 2.ª toma del drill. Desde el 4-ene (min30, DJ-4): 30′ = arranque + vídeo (≤8′) + drill (el resto); lo demás es opcional.
 *  · Ritmo «desde cero con el inglés»: lectura en inglés a 100 palabras/min · vídeos a 1,0× con subtítulos en inglés (CC); en AURUM y Business
 *    (que no son inglés-objetivo) se permite la auto-traducción al español si se pierde el hilo.
 */
import type { GuiaBloque, GuiaPaso, GuiaRecurso } from './guia';
import { minutosFranja } from './guia';
import {
  VIBE_META, VIBE_DIAS, vibeDiaDe, vibeProyectoDe, vibeTaperDe, vibePCSabado, vibeJournalPath, vibeJournalUrl, vibeSemanaISO, VIBE_TIPO_LABEL,
} from './vibecodingPlan';
import type { DiaVibe, VibeProyecto } from './vibecodingPlan';
import { SYN_DIAS, synDiaDe } from './synapseDailyPlan';
import type { SynBloque } from './synapseDailyPlan';
import { aurumDiaDe, aurumObsUrl } from './aurumDailyPlan';
import type { DiaAurum } from './aurumDailyPlan';
import { LIV_DIAS, livDiaDe } from './livianoStudyPlan';
import type { DiaLiviano } from './livianoStudyPlan';
import { livCasoDeDia, livCardsDeDia, livCardsSemanaPrevia, livDrillDe, livAnkiDeck } from './livianoCasos';
import { BIZ_DIAS, bizDiaDe, bizModo } from './businessStudyPlan';
import type { DiaBiz } from './businessStudyPlan';
import { DIAS as USMLE_DIAS, esHito } from './usmleStep1Daily';
import { FECHAS_V6, faseV6 } from './fechasV6';

// ─────────────────────────────────────────── utilidades ───────────────────────────────────────────
const PPM_EN = 100;                       // palabras/min leyendo en inglés (nivel de arranque)
const aMin = (h: string): number => { const [a, b] = h.split(':'); return Number(a) * 60 + Number(b); };
const aHHMM = (m: number): string => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const franjaDesde = (ini: string, min: number): string => `${ini}–${aHHMM(aMin(ini) + min)}`;
const dow = (iso: string): number => new Date(iso + 'T12:00:00Z').getUTCDay();
const addDias = (iso: string, n: number): string => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const WD_C = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES_C = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
/** «mié 21-oct» (v6.03: los textos de la semana 1 citan días calculados del plan, no fijos). */
const fCorta = (iso: string): string => `${WD_C[dow(iso)]} ${Number(iso.slice(8, 10))}-${MES_C[Number(iso.slice(5, 7)) - 1]}`;
const yt = (id: string, seg?: number): string => `https://www.youtube.com/watch?v=${id}${seg ? `&t=${seg}s` : ''}`;
const mmss = (s: number): string => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const minDe = (seg: number): number => Math.ceil(seg / 60);
const sumMin = (ps: GuiaPaso[]): number => ps.reduce((a, p) => a + p.min, 0);
const VAULT = 'Vault_Medicina MIR_Joseph';
const obs = (file: string): string => 'obsidian://open?vault=' + encodeURIComponent(VAULT) + '&file=' + encodeURIComponent(file);
const REPO = 'D:/joseph-md-app';
const vsc = (ruta: string): string => 'vscode://file/' + ruta;
const P = (min: number, que: string, como: string, enlace?: { t: string; url: string }): GuiaPaso => ({ min, que, como, ...(enlace ? { enlace } : {}) });
const R = (t: string, url: string, extra: { min?: number; cantidad?: string } = {}): GuiaRecurso => ({ t, url, ...extra });
/** Bloque con totalMin = minutos de la franja; si Σ pasos no cuadra, ajusta el paso `flex` (el «colchón» del bloque). */
function bloque(franja: string, plan: string, titulo: string, pasos: GuiaPaso[], recursos: GuiaRecurso[], hecho: string,
  extra: { planB?: string; aviso?: string; flex?: number } = {}): GuiaBloque {
  const total = minutosFranja(franja);
  const dif = total - sumMin(pasos);
  if (dif !== 0 && pasos.length) {
    const i = extra.flex ?? pasos.length - 1;
    const p = pasos[i];
    if (p && p.min + dif >= 1) pasos[i] = { ...p, min: p.min + dif };
  }
  return { franja, plan, titulo, totalMin: total, pasos, recursos, hecho, ...(extra.planB ? { planB: extra.planB } : {}), ...(extra.aviso ? { aviso: extra.aviso } : {}) };
}
/** Hito del Step 1 de una fecha (F1): UWSA1 o NBME. */
function hitoDe(iso: string): { nbme: boolean; uwsa: boolean } | null {
  const h = USMLE_DIAS.find((x) => x.fecha === iso && esHito(x));
  if (!h) return null;
  const uwsa = /Self-Assessment 1|UWSA1/.test(h.uw);
  return { uwsa, nbme: !uwsa && /NBME/.test(h.uw) };
}

// ════════════════════════════════════════ 04:15 · VIBECODING ════════════════════════════════════════
const DOC_N8N_CODE = 'https://docs.n8n.io/build/code-in-n8n/using-the-code-node';
const DOC_BEST = 'https://code.claude.com/docs/en/best-practices';
const JOURNAL_CMD = 'node DATA/_scripts/journal_hoy.js --abrir';
/** Semana 1 (S1 · APEX end-to-end): los 35′ de «construir» de cada PASO k (1-5) de S1, partidos en sub-pasos con comandos exactos (ficheros
 *  comprobados en disco el 18-oct). v6.03 (20-oct-2026): la clave es el PASO del proyecto, no la fecha (antes '2026-10-19' … '2026-10-23'): con el
 *  D1 en el mié 21-oct S1 va del mié 21 al mar 27-oct y hace SHIP el sáb 31-oct (el sáb 24 es AVANCE); los días que citan los textos («el día del
 *  paso 1», el del SHIP) salen de VIBE_DIAS / VIBE_PROYECTOS, así siguen al plan si vuelve a correr. Mismo contenido, mismos minutos. */
function vibeS1(k: number): GuiaPaso[] | undefined {
  const dia = (kk: number): string => { const x = VIBE_DIAS.find((y) => y.semana === 1 && y.k === kk); return x ? fCorta(x.fecha) : `paso ${kk}`; };
  const p1 = vibeProyectoDe(1);
  const ship = p1 ? `el SHIP del sáb ${fCorta(p1.ship).replace(/^sáb /, '')}` : 'el SHIP del sábado';
  switch (k) {
    case 1: return [
      P(10, 'Test del parser: `node scripts\\test_parser_multilinea.js` en D:\\agente_estudio', 'Terminal: `cd /d D:\\agente_estudio` → `node scripts\\test_parser_multilinea.js` → debe terminar en «0 failed» (13/13). Si algo falla, NO lo arregles hoy: copia el nombre del test al journal.'),
      P(15, 'Ubicar el nodo Code del parser: n8n_flow_4_destinos.json (12,7 KB) + n8n_nodos_nuevos.md (3,3 KB) en D:\\agente_estudio\\scripts', 'Abre Claude Code en D:\\agente_estudio y pídele: «en scripts/n8n_flow_4_destinos.json, ¿qué nodo Code ejecuta el parser y cuál de scripts/*.js es su código?». Anota en el journal: nombre del nodo + fichero (esperado: n8n_parser_v2_3.js). Nada de reescribir el parser.', { t: 'Claude Code · best practices', url: DOC_BEST }),
      P(10, 'Hash de referencia del parser', `\`certutil -hashfile D:\\agente_estudio\\scripts\\n8n_parser_v2_3.js SHA256\` → copia el hash al journal (el ${dia(4)}, paso 4, lo comparas con el del nodo de n8n).`),
    ];
    case 2: return [
      P(5, `Abrir el workflow del parser en tu n8n → nodo Code anotado el ${dia(1)}`, 'n8n › Workflows › el flujo del parser › doble clic en el nodo Code. No toques otros nodos.', { t: 'n8n · Code node', url: DOC_N8N_CODE }),
      P(15, 'Redeploy: pegar n8n_parser_v2_3.js ÍNTEGRO en el nodo Code', 'VS Code: abre D:\\agente_estudio\\scripts\\n8n_parser_v2_3.js → Ctrl+A, Ctrl+C → en n8n selecciona TODO el código del nodo y pega encima (no edites a mano en la UI) → Save → Activate.'),
      P(10, '1 APEX de prueba de USMLE (is_test=true) y ejecución en verde', 'Atajo Ctrl+Shift+A con un APEX multilínea de USMLE marcado is_test=true → n8n › Executions: la última ejecución debe salir verde.'),
      P(5, 'Si la ejecución sale roja: capturar el error (no arreglarlo hoy)', `Abre la ejecución → el nodo en rojo → copia el mensaje al journal; el ${dia(3)} (paso 3) es día de ruteo y se corrige primero.`),
    ];
    case 3: return [
      P(10, 'Anki: ¿la tarjeta de prueba cayó en APEX::USMLE::<sistema>?', `Anki › Browse → busca \`deck:APEX::USMLE*\` y ordena por «Created»: la tarjeta de prueba del ${dia(2)} debe estar en un SUBDECK del sistema, no en el mazo raíz.`),
      P(10, 'Vault: ¿la nota cayó en la carpeta correcta de 01_USMLE?', 'Obsidian › 01_USMLE: localiza la nota del APEX de prueba; si está en 99_INBOX, el ruteo falló.', { t: '◆ Obsidian · 01_USMLE', url: obs('01_USMLE') }),
      P(15, 'Si cayó mal: corregir _mapping_slim.json (3,7 KB) y reenviar 1 APEX · si cayó bien: leer ensure_anki_subdecks.py (7,4 KB)', 'Claude Code en D:\\agente_estudio: «¿qué clave de _mapping_slim.json manda el subtema X al subdeck Y?» → corrige → reenvía 1 APEX y repite las 2 comprobaciones. Si el ruteo ya está bien, entiende cómo ensure_anki_subdecks.py crea los subdecks (anota 3 líneas).'),
    ];
    case 4: return [
      P(10, 'Anki: REVERSO, CASO_CLINICO y FISIO_EXPANDIDA completos en la tarjeta de prueba', 'Abre la tarjeta (Browse → Preview) → captura de pantalla → pégala en el journal (criterio 4 del SHIP).'),
      P(5, 'Vault: secciones renderizadas en la nota', 'Abre la nota de 01_USMLE en modo lectura → captura.'),
      P(5, 'Hash del parser = el que corre el nodo Code', 'Copia el código del nodo Code de n8n a un fichero temporal y pídele a Claude Code que lo compare con scripts/n8n_parser_v2_3.js ignorando saltos de línea; anota «idéntico» o la diferencia.'),
      P(15, 'Escribir DATA/USMLE/_apex_e2e_prueba.json (evidencia)', `Claude Code en D:\\joseph-md-app: crea el JSON con noteId (Anki › Browse › Card Info), subdeck, ruta de la nota en 01_USMLE, hash del parser (SHA256 del ${dia(1)}) y fecha. Debe contener la clave "noteId" (la comprueba verify_vibecoding.js).`),
    ];
    case 5: return [
      P(10, 'Commit [S1] en joseph-md-app', '`cd /d D:\\joseph-md-app` → `git add DATA/USMLE/_apex_e2e_prueba.json` (+ la nota del redeploy si la escribiste) → `git commit -m "[S1] APEX end-to-end: redeploy parser v2.3 + evidencia"`. D:\\agente_estudio NO es repo git (init local = decisión tuya).'),
      P(10, 'node DATA/_scripts/verify_vibecoding.js 1', `Desde D:\\joseph-md-app. Esperado hoy: 3/4 (el 4.º es MANUAL: se acepta en ${ship} con --ok-manual 4 tras mirarlo). Anota en el journal qué criterio falla.`),
      P(15, 'Cerrar lo que el verify marque en rojo (no manual)', `Test rojo → mira el nombre del caso; sin commit → repite el commit con [S1]; sin fichero → paso 4 (${dia(4)}). Lo que no cierre hoy va a ${ship} 15:00; nunca a S2.`),
    ];
    default: return undefined;
  }
}
const VIBE_COMO_TIPO: Record<string, string> = {
  definir: 'SPEC del día: abre Claude Code en el repo del proyecto y pídele que lea los ficheros citados y te devuelva QUÉ fichero tocar, QUÉ test/comando lo demuestra y el criterio de «hecho». Hoy no se escribe código salvo ese test.',
  construir: 'Construye con Claude Code: pega el paso como objetivo, pídele primero un plan de 3 pasos y un test que él pueda correr (best practices) y ejecútalo. A las 04:55 paras aunque falte.',
  verificar: 'Verifica EN VIVO (test, URL o dato real) y guarda la evidencia (salida del comando o captura) en el journal.',
  'ship-prep': 'Commit [S<n>] en el repo declarado + node DATA/_scripts/verify_vibecoding.js <n> (+ --ok-manual <i> si ya viste el criterio manual) + journal. Lo que falle va al SHIP del sábado.',
  sensores: 'node DATA/_scripts/verify_vibecoding.js --sensores → todo verde o anota el rojo; nada más de teclado.',
  mejora: '1 mejora pequeña al sensor que dio rojo (o ninguna si todo está verde).',
  lectura: 'Journal + lectura de la doc del proyecto (sin construir).',
  retro: 'Retro de la semana en el journal: qué funcionó, qué no, qué se queda.',
  journal: 'Deload total: journal 5′ y, si quieres, audio del SYNAPSE.',
};
export function guiaVibeDe(iso: string): GuiaBloque | null {
  const dia: DiaVibe | undefined = vibeDiaDe(iso);
  if (!dia) return null;
  const p: VibeProyecto | undefined = dia.semana <= 12 ? vibeProyectoDe(dia.semana) : undefined;
  const t = dia.semana > 12 ? vibeTaperDe(dia.semana) : undefined;
  const nombre = p ? `S${p.s} · ${p.nombre}` : t ? `S${t.s} · ${t.nombre}` : `S${dia.semana}`;
  const franja = franjaDesde('04:15', dia.min);
  const sem = vibeSemanaISO(iso);
  const journal = { t: `📓 journal ${sem}`, url: vibeJournalUrl(iso) };
  const docs = p?.docs?.[0];
  const recursos: GuiaRecurso[] = [R(`journal ${sem}.md (D:/synapse-journal)`, vibeJournalUrl(iso)), ...(p ? p.docs.map((d) => R(d.label, d.url)) : [])];
  const objetivo = P(dia.min >= 45 ? 5 : dia.min >= 15 ? 2 : 1, `OBJETIVO del día (${VIBE_TIPO_LABEL[dia.tipo]})`,
    `\`${JOURNAL_CMD}\` (crea ${vibeJournalPath(iso)} con la sección de hoy si no existe y la abre) → escribe en 1 línea el objetivo = el paso de hoy.`, journal);
  let pasos: GuiaPaso[];
  if (dia.min >= 45) {
    const cur = dia.semana === 1 ? vibeS1(dia.k) : undefined; // v6.03: por PASO de S1, no por fecha
    const construir = cur ? cur.map((x) => ({ ...x })) : [P(35, `CONSTRUIR · ${dia.paso}`, `${VIBE_COMO_TIPO[dia.tipo] ?? VIBE_COMO_TIPO.construir}${p ? ` Repo: ${p.repoGit}.` : ''}`, docs ? { t: 'docs ↗', url: docs.url } : undefined)];
    pasos = [objetivo, ...construir, P(5, 'CIERRE · 04:55 commit-or-stash + journal',
      `A las 04:55: \`git commit\` (con [S${p ? p.s : dia.semana}] en el mensaje) o \`git stash\` — nunca se deja a medias. Journal: qué construí · commit/URL · qué aprendí · % del código que entiendo · bloqueo. 05:00 = Anki sin excepción.`, journal)];
  } else if (dia.min >= 15) {
    pasos = [objetivo, P(dia.min - 5, `${VIBE_TIPO_LABEL[dia.tipo]} · ${dia.paso}`, VIBE_COMO_TIPO[dia.tipo] ?? VIBE_COMO_TIPO.construir), P(3, 'CIERRE · journal (3 líneas)', 'Qué hice · qué quedó · semáforo de sensores. El resto de la franja (hasta las 05:00) queda libre: no se rellena.', journal)];
  } else {
    pasos = [P(dia.min, `JOURNAL 5′ · ${dia.paso}`, 'Solo journal (3 líneas) y, si quieres, el audio B del SYNAPSE. Semana de deload total: no se construye nada.', journal)];
  }
  return bloque(franja, 'vibecoding', `${nombre} — ${VIBE_TIPO_LABEL[dia.tipo]}`, pasos, recursos,
    dia.min >= 45 ? 'paso del día hecho + commit [S…] o stash a las 04:55 + entrada del journal con los 6 campos' : 'entrada del journal del día',
    {
      flex: Math.max(0, pasos.length - 2),
      planB: 'Si el día se recorta: pierde el proyecto, nunca el Anki de las 05:00. Sin PC: journal en el móvil (3 líneas) y el paso pasa al sábado PC.',
      aviso: [
        dia.deload ? 'Semana DELOAD del vibecoding: carga al 50 % (2 días de 45′ + 3 de 15′).' : '',
        iso === VIBE_META.inicio ? `Primer día: el journal de esta semana (${sem}.md) todavía no existe; lo crea el comando del paso 1.` : '',
      ].filter(Boolean).join(' ') || undefined,
    });
}

// ════════════════════════════════════════ 12:30 · SYNAPSE (L-V) ════════════════════════════════════════
const ACADEMY = 'https://academy.claude.com/';
/** Semana 1: concreción de los bloques «continúa / el más reciente» (real:false) y del CUÁNTO de las lecturas C (palabras medidas el 18-oct).
 *  v6.03 (20-oct-2026): la clave es la PIEZA del plan (carril + nº de aparición), no la fecha (antes '2026-10-19' … '2026-10-24'). Con el D1 en
 *  el mié 21-oct los carriles del lunes (No Priors · Pro Git) y del martes (Dwarkesh · Willison) arrancan en la semana 2 (lun 26 / mar 27-oct:
 *  gen_synapse_plan.js corre esas series una semana, OFF_WD) y la curaduría va con su pieza: mié 21 = auditoría F0 + Lex cap. 1 + Python §1 ·
 *  jue 22 = The Batch + ATBS cap. 0 · vie 23 = deep dive + trifecta · sáb 24 = comodines (retoman lo que quedó a medias de ESA semana: el deep
 *  dive y la trifecta) · lun 26 = No Priors + Pro Git · mar 27 = Dwarkesh + Willison · sáb 31 = comodines de la curaduría original (No Priors
 *  10:00-20:00 y el resto de «Prompt injection…»). Mismos recursos, minutos y palabras medidos el 18-oct; nada se recorta. */
type SynCur = { que: string; como: string; url: string; t: string };
const NO_PRIORS_BROCKMAN = 'https://podcasts.apple.com/us/podcast/the-changing-physics-of-cybersecurity-and/id1668002688?i=1000796472163';
const SYN_CUR_PIEZAS: Array<{ tag: 'A' | 'B' | 'C'; es: (b: SynBloque) => boolean; n?: number; cur: SynCur }> = [
  { tag: 'A', es: (b) => b.material === 'Anthropic Academy' && /^AUDITORÍA F0/.test(b.leccion),
    cur: { que: 'Anthropic Academy › «My courses»: auditoría F0 — anota qué certificados ya tienes (AI Fluency · Claude 101 · Claude Code 101 · Platform 101)', como: 'academy.claude.com (inicias sesión tú). Lista ✓/pendiente en el journal; la 1.ª pendiente es la lección A de mañana. Hoy no empiezas ninguna lección.', url: ACADEMY, t: 'Academy' } },
  { tag: 'B', es: (b) => /^No Priors/.test(b.material),
    cur: { que: 'No Priors · «The Changing Physics of Cybersecurity and Drug Development with OpenAI President Greg Brockman» (15-oct-2026 · 39 min) → minutos 0:00-10:00', como: 'Auriculares, 1,0×. Para a los 10:00 y anota el minuto; los 29′ restantes van a los B comodín del sábado.', url: NO_PRIORS_BROCKMAN, t: 'Episodio (Apple Podcasts)' } },
  { tag: 'C', es: (b) => /^Pro Git/.test(b.material),
    cur: { que: 'Pro Git › 1.1 «About Version Control» (≈800 palabras) → las primeras ≈500', como: '5′ a 100 palabras/min. Marca dónde quedas: lo sigues en el próximo C libre.', url: 'https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control', t: 'Pro Git 1.1' } },
  { tag: 'B', es: (b) => /^Dwarkesh — Dario Amodei/.test(b.material) && /Tramo 1\/3/.test(b.leccion),
    cur: { que: 'Dwarkesh · Dario Amodei (episodio de 1:58:43) → tramo 1/3 = minutos 0:00-10:00', como: 'Auriculares, 1,0×. Anota el minuto donde paras (el siguiente tramo de Dwarkesh empieza ahí).', url: 'https://www.dwarkesh.com/p/dario-amodei', t: 'Dwarkesh × Dario' } },
  { tag: 'C', es: (b) => /^Simon Willison — serie Prompt injection/.test(b.material),
    cur: { que: 'Simon Willison · «Prompt injection attacks against GPT-3» (12-sep-2022 · 1.457 palabras, 1.er artículo de la serie) → las primeras ≈500', como: '5′. El resto, en el C comodín del sábado.', url: 'https://simonwillison.net/2022/Sep/12/prompt-injection/', t: 'Willison · prompt injection' } },
  { tag: 'C', es: (b) => /^The Python Tutorial/.test(b.material) && /Sección 1:/.test(b.leccion),
    cur: { que: 'The Python Tutorial › 1 «Whetting Your Appetite» (≈730 palabras) → las primeras ≈500', como: '5′. Objetivo: LEER el Python que escribe la IA, no memorizar sintaxis.', url: 'https://docs.python.org/3/tutorial/appetite.html', t: 'Python tutorial §1' } },
  { tag: 'B', es: (b) => /^The Batch/.test(b.material),
    cur: { que: 'The Batch (Andrew Ng) · el número de esta semana (si aún no salió hoy, el más reciente): la carta de Ng + 2 noticias', como: '10′ y fuera; no abras enlaces internos.', url: 'https://www.deeplearning.ai/the-batch/', t: 'The Batch' } },
  { tag: 'C', es: (b) => /^Automate the Boring Stuff/.test(b.material) && /cap\. 0:/.test(b.leccion),
    cur: { que: 'Automate the Boring Stuff 3e › cap. 0 «Introduction» (≈4.900 palabras) → las primeras ≈500', como: '5′. Marca dónde quedas (el capítulo da para ~10 C).', url: 'https://automatetheboringstuff.com/3e/chapter0.html', t: 'ATBS cap. 0' } },
  { tag: 'B', es: (b) => /^Canal Anthropic/.test(b.material) && /AI prompt engineering: A deep dive.*tramo 1\b/.test(b.leccion),
    cur: { que: 'Canal Anthropic · «AI prompt engineering: A deep dive» (1:16:42) → minutos 0:00-10:00', como: '1,0× con subtítulos en inglés; para a los 10:00 (tramo 1).', url: yt('T9aRN5JkmL8'), t: 'Prompt engineering deep dive' } },
  { tag: 'C', es: (b) => b.material === 'Simon Willison' && /lethal trifecta/i.test(b.leccion),
    cur: { que: 'Simon Willison · «The lethal trifecta for AI agents» (16-jun-2025 · ≈1.240 palabras) → las primeras ≈500', como: '5′. Es EL artículo de seguridad de agentes: termínalo en otro hueco.', url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/', t: 'Lethal trifecta' } },
  // 1.er sábado (v6.03: sáb 24-oct): retoma lo que quedó a medias de la semana del D1 (deep dive 10:00 de 1:16:42 · trifecta ≈500 de ≈1.240)
  { tag: 'B', es: (b) => /^Comodín de audio/.test(b.material), n: 1,
    cur: { que: 'Comodín de audio · «AI prompt engineering: A deep dive» (canal Anthropic) → minutos 10:00-20:00', como: 'Retoma donde paraste el viernes, 1,0× con subtítulos en inglés. Nada nuevo (el viernes siguiente lo terminas: «tramo 2»).', url: yt('T9aRN5JkmL8', 600), t: 'Prompt engineering deep dive' } },
  { tag: 'C', es: (b) => /^Comodín de lectura/.test(b.material), n: 1,
    cur: { que: 'Comodín de lectura · sigue «The lethal trifecta for AI agents» (≈740 palabras que quedan → los próximos ≈500)', como: '5′. Nada nuevo.', url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/', t: 'Lethal trifecta' } },
  // 2.º sábado (v6.03: sáb 31-oct): los comodines de la curaduría original (No Priors del lunes · «Prompt injection…» del martes)
  { tag: 'B', es: (b) => /^Comodín de audio/.test(b.material), n: 2,
    cur: { que: 'Comodín de audio · No Priors (Greg Brockman) → minutos 10:00-20:00', como: 'Retoma donde paraste el lunes. Nada nuevo.', url: NO_PRIORS_BROCKMAN, t: 'Episodio (Apple Podcasts)' } },
  { tag: 'C', es: (b) => /^Comodín de lectura/.test(b.material), n: 2,
    cur: { que: 'Comodín de lectura · termina «Prompt injection attacks against GPT-3» (≈950 palabras que quedan → los próximos ≈500)', como: '5′. Nada nuevo.', url: 'https://simonwillison.net/2022/Sep/12/prompt-injection/', t: 'Willison · prompt injection' } },
];
let SYN_CUR_IDX: Map<string, SynCur> | null = null;
/** Curaduría de un bloque A/B/C de una fecha: la n-ésima aparición de su pieza en SYN_DIAS (n = 1 si no se indica). */
function synCurDe(iso: string, tag: string): SynCur | undefined {
  if (!SYN_CUR_IDX) {
    SYN_CUR_IDX = new Map();
    const vistos = SYN_CUR_PIEZAS.map(() => 0);
    for (const d of SYN_DIAS) for (const b of d.bloques) {
      SYN_CUR_PIEZAS.forEach((p, i) => {
        if (p.tag !== b.tag || !p.es(b)) return;
        vistos[i] += 1;
        if (vistos[i] === (p.n ?? 1) && !SYN_CUR_IDX!.has(`${d.fecha}|${b.tag}`)) SYN_CUR_IDX!.set(`${d.fecha}|${b.tag}`, p.cur);
      });
    }
  }
  return SYN_CUR_IDX.get(`${iso}|${tag}`);
}
function pasoSyn(b: SynBloque, iso: string): GuiaPaso {
  const cur = synCurDe(iso, b.tag);
  if (cur) return P(b.min, `${b.tag} · ${cur.que}`, cur.como, { t: cur.t, url: cur.url });
  const enl = b.url ? { t: `${b.tag} ↗`, url: b.url } : undefined;
  if (b.tag === 'A') return P(b.min, `A (pantalla) · ${b.material} › ${b.leccion}`,
    `En el PC, 1,0× con subtítulos en inglés. Para en el minuto ${b.min} aunque la lección siga (la plataforma guarda el progreso) y anota 1 idea en el journal.${b.audit ? ' F0 = auditoría: si ya la cursaste, márcala ✓ y adelanta la siguiente pendiente.' : ''}`, enl);
  if (b.tag === 'B') return P(b.min, `B (audio) · ${b.material} — ${b.leccion}`,
    `Auriculares, 1,0×. Exactamente ${b.min}′ ${b.dur ? `(${b.dur})` : 'desde donde quedaste'}; anota el minuto donde paras.`, enl);
  return P(b.min, `C (lectura) · ${b.material} — ${b.leccion}`,
    `≈${b.min * PPM_EN} palabras (${b.min}′ a ${PPM_EN} palabras/min en inglés). Marca dónde quedas; el resto en el próximo C o en el comodín del sábado.`, enl);
}
/** Franja del SYNAPSE de L-V: 12:30 · UWSA1 07:25 (entre las 2 partes de la preparación del hito, guía de E1) · NBME 13:00 (almuerzo 12:30). */
export function synFranjaDe(iso: string, min = 30): { franja: string; aviso?: string } {
  const h = hitoDe(iso);
  if (h?.uwsa) return { franja: franjaDesde('07:25', min), aviso: 'Hoy UWSA1 (08:50-13:00): el SYNAPSE se hace a las 07:25, entre las 2 partes de la preparación del hito (USMLE 07:15-07:25 y 07:55-08:50; esta es la única tarjeta SYNAPSE de hoy); a las 12:30 no hay SYNAPSE. El Calendar ya está en 07:25.' };
  if (h?.nbme) return { franja: franjaDesde('13:00', min), aviso: 'Día de NBME (07:00-12:30): almuerzo 12:30-13:00 y SYNAPSE 13:00-13:30 (guía USMLE del hito).' };
  return { franja: franjaDesde('12:30', min) };
}
export function guiaSynapseDe(iso: string): GuiaBloque | null {
  const s = synDiaDe(iso);
  const w = dow(iso);
  if (!s || w === 0 || w === 6) return null; // sábado → guiaShipDe · domingo → guiaFeynmanDe
  const abc = s.bloques.filter((b) => b.tag === 'A' || b.tag === 'B' || b.tag === 'C');
  if (!abc.length) return null;
  const min = abc.reduce((a, b) => a + b.min, 0);
  const { franja, aviso } = synFranjaDe(iso, min);
  const pasos = abc.map((b) => pasoSyn(b, iso));
  const recursos = abc.filter((b) => b.url).map((b) => R(`${b.tag} · ${b.material}`, b.url as string, { min: b.min }));
  return bloque(franja, 'synapse', `SYNAPSE S${s.semana} · ${s.fase.split('·')[0].trim()} — A pantalla · B audio · C lectura`, pasos, recursos,
    'A, B y C hechos con su minuto/punto de parada anotado en el journal + ✓ del día en Estudio › SYNAPSE',
    { aviso: [aviso, s.deload ? 'Semana DELOAD: si aprieta, solo A o solo B (PROTOCOLO_MODO_MINIMO).' : ''].filter(Boolean).join(' ') || undefined,
      planB: 'Sin PC: B y C en el móvil y A pasa al sábado (bloque PC). Academy/Skilljar caído: adelanta B + C y deja A para mañana.' });
}

// ═══════════════════════════════ sábado 15:00 · SHIP + SYNAPSE · domingo · FEYNMAN ═══════════════════════════════
export function guiaShipDe(iso: string): GuiaBloque | null {
  if (dow(iso) !== 6) return null;
  const pcs = vibePCSabado(iso);
  const s = synDiaDe(iso);
  const abc = (s?.bloques ?? []).filter((b) => b.tag === 'A' || b.tag === 'B' || b.tag === 'C');
  const pcMin = (s?.bloques ?? []).filter((b) => b.tag === 'PC').reduce((a, b) => a + b.min, 0);
  if (!pcs.length && !abc.length) return null;
  const abcMin = abc.reduce((a, b) => a + b.min, 0);
  const main = pcs[pcs.length - 1];
  const pasos: GuiaPaso[] = [];
  const recursos: GuiaRecurso[] = [R(`journal ${vibeSemanaISO(iso)}.md`, vibeJournalUrl(iso))];
  let titulo = 'SYNAPSE del sábado';
  let hecho = 'A/B/C del SYNAPSE hechos';
  let aviso: string | undefined;
  const journal = { t: '📓 journal', url: vibeJournalUrl(iso) };
  if (main && (main.tipo === 'ship' || main.tipo === 'avance') && main.proyecto) {
    const p = main.proyecto;
    const shipMin = (pcMin >= 120 ? 120 : pcMin || 120) - abcMin;
    const manual = p.verificacion.map((v, i) => (v.tipo === 'manual' ? i + 1 : 0)).filter(Boolean);
    titulo = main.tipo === 'ship' ? `SHIP S${p.s} · ${p.nombre} + SYNAPSE A/B/C` : `AVANCE S${p.s} (aún no termina) + SYNAPSE A/B/C`;
    p.docs.forEach((d) => recursos.push(R(d.label, d.url)));
    if (main.tipo === 'ship') {
      pasos.push(
        P(5, 'ABRIR el journal de la semana + leer los criterios de aceptación', `\`${JOURNAL_CMD}\` → cabecera «Criterios de aceptación» (${p.aceptacion.length}).`, journal),
        P(10, `VERIFY en seco: node DATA/_scripts/verify_vibecoding.js ${p.s} --dry`, 'Desde D:\\joseph-md-app. Lista los criterios ✓/✗ sin escribir nada.'),
        P(shipMin - 40, 'CERRAR lo que el verify marque en rojo', `En el orden de los criterios: ${p.aceptacion.map((a, i) => `(${i + 1}) ${a.split('→')[0].slice(0, 70).trim()}`).join(' · ')}. Si todo está verde, el tiempo que sobra es libre (o adelantas el Feynman del domingo).`),
        P(10, manual.length ? `VERIFY definitivo con el criterio manual ${manual.join(',')} visto` : `VERIFY definitivo: node DATA/_scripts/verify_vibecoding.js ${p.s}`,
          manual.length ? `${p.verificacion[manual[0] - 1]?.resumen ?? 'comprobación manual'} → si lo viste: \`node DATA/_scripts/verify_vibecoding.js ${p.s} --ok-manual ${manual.join(',')}\` → SHIPPED ${p.verificacion.length}/${p.verificacion.length}. Pega en la consola de la app el one-liner que imprime (guarda 'jmd-vibe-ship').`
            : 'Escribe el resultado en DATA/SYNAPSE/_vibecoding_ship.json; pega en la consola de la app el one-liner que imprime.'),
        P(15, 'JOURNAL · «Cierre de semana»', `shipped sí/no · criterios x/${p.verificacion.length} · evidencia (commit/URL/test) · lección de la semana (1 línea). Lo que no cerró NO pasa a S${p.s + 1}.`, journal),
      );
      hecho = `verify_vibecoding.js ${p.s} con SHIPPED ${p.verificacion.length}/${p.verificacion.length} (o el fallo escrito en el journal) + SYNAPSE A/B/C`;
    } else {
      pasos.push(
        P(5, 'ABRIR el journal y ver qué paso del proyecto falta', `\`${JOURNAL_CMD}\`; el proyecto termina el ${p.fin} y su SHIP es el ${p.ship}.`, journal),
        P(shipMin - 15, `AVANZAR S${p.s}: los pasos que faltan`, `${VIBE_COMO_TIPO.construir} Hoy no hay verify (aún no termina).`),
        P(10, 'JOURNAL · qué avanzó + qué falta', '3 líneas.', journal),
      );
      hecho = 'avance del proyecto escrito en el journal + SYNAPSE A/B/C';
    }
    if (pcMin && pcMin + abcMin > 120) aviso = `El plan suma ${pcMin + abcMin}′ (PC ${pcMin}′ + A/B/C ${abcMin}′) y el Calendar reserva 120′ (15:00-17:00): ${main.tipo === 'ship' ? 'SHIP' : 'avance'} ${shipMin}′ + SYNAPSE ${abcMin}′. Si el verify da verde antes, el resto es libre.`;
  } else if (pcs.length) {
    // taper: PC opcional (30′ mantenimiento · 0′ deload) — pueden ser 2 (S16 desplazado + S17)
    for (const x of pcs) {
      const t = x.taper;
      if (!t) continue;
      const m = t.tipo === 'mantenimiento' ? 30 : 0;
      if (m) pasos.push(P(m, `PC opcional · taper S${t.s} · ${t.nombre}`, `node DATA/_scripts/verify_vibecoding.js --sensores → todo verde o 1 mejora pequeña al rojo; journal. ${t.shipTxt}`, journal));
    }
    const hayPC = pasos.length > 0;
    titulo = hayPC ? 'PC opcional del taper + SYNAPSE A/B/C' : 'SYNAPSE A/B/C del sábado (taper: PC de 0′)';
    hecho = hayPC ? 'sensores en verde (o el rojo anotado) + SYNAPSE A/B/C' : 'SYNAPSE A/B/C del sábado';
  }
  abc.forEach((b) => pasos.push(pasoSyn(b, iso)));
  abc.filter((b) => b.url).forEach((b) => recursos.push(R(`${b.tag} · ${b.material}`, b.url as string, { min: b.min })));
  const total = sumMin(pasos);
  if (!total) return null;
  return bloque(franjaDesde('15:00', total), 'vibecoding', titulo, pasos, recursos, hecho, { aviso, flex: 2,
    planB: 'Sin PC el sábado: el SHIP se hace el domingo 15:00 (franja «repaso + PC domingo» del Calendar); nunca se arrastra al proyecto siguiente.' });
}
export function guiaFeynmanDe(iso: string): GuiaBloque | null {
  if (dow(iso) !== 0) return null;
  const s = synDiaDe(iso);
  const r = s?.bloques.find((b) => b.tag === 'R' && b.min >= 10 && /^Feynman/.test(b.material));
  if (!s || !r) return null;
  const journal = { t: '📓 journal', url: vibeJournalUrl(iso) };
  return bloque(franjaDesde('15:00', r.min), 'vibecoding', `FEYNMAN (opcional) · ${r.material.replace(/^Feynman · /, '')}`, [
    P(Math.ceil(r.min / 2), 'Explica en voz alta qué construiste esta semana y CÓMO funciona (sin mirar el código)', 'Grábate 1 toma en el móvil (≤5 min). Si te trabas en un punto, ese es el hueco real.'),
    P(r.min - Math.ceil(r.min / 2), 'Journal: línea «qué falta» + 3 líneas de Feynman', 'Sección «Cierre de semana» del journal.', journal),
  ], [R(`journal ${vibeSemanaISO(iso)}.md`, vibeJournalUrl(iso))], 'la grabación hecha y la línea «qué falta» escrita (opcional: si descansas, márcalo ✓ igual)', {
    aviso: 'Domingo LIBRE: esto es opcional. El Calendar reserva 15:00-17:00 («repaso + PC domingo») pero el plan solo pide 10′; el resto no se rellena.',
  });
}

// ════════════════════════════════════════ 14:15 · AURUM ════════════════════════════════════════
interface Vid { id: string; t: string; canal: string; s: number }
/** Semanas 1-2 (D1-D10): vídeos CONCRETOS (el plan enlaza el CANAL en 98 de sus 130 bloques A). Título, canal y duración leídos de YouTube el
 *  18-oct-2026. D11-D130 sin curar: la guía da una regla fija de elección y lo avisa (ampliar esta tabla = misma verificación). Clave = D del
 *  plan AURUM (no la fecha): v6.03 D1-D5 = mié 21 → mar 27-oct · D6-D10 = mié 28-oct → mar 3-nov. */
const AURUM_VID: Record<number, { vids: Vid[]; nota: string }> = {
  1: { vids: [{ id: 'PtPo5V-aBKI', t: 'Everything is Sales - Grant Cardone', canal: 'Grant Cardone', s: 129 }, { id: 'H7eevPm8WJo', t: 'Advice for Sales People - Grant Cardone', canal: 'Grant Cardone', s: 575 }], nota: 'Anota 3 frases textuales que le dirías a un lead de ALLPA/Qori.' },
  2: { vids: [{ id: 'urZVPdf3brs', t: 'I Trained Sales 2 Hours a Day for 5 Years', canal: 'Grant Cardone', s: 491 }, { id: 'NY9_i7TzXLQ', t: '3 Rules to Master Sales - Grant Cardone', canal: 'Grant Cardone', s: 120 }], nota: 'Anota la regla de actividad diaria que te llevas (1 línea).' },
  3: { vids: [{ id: 'YqT2Kb3jUIQ', t: "Believe In What You're Selling", canal: 'Grant Cardone', s: 115 }, { id: '-8W_BQai2aw', t: 'Sales - Best Sales Book Ever Sell or Be Sold', canal: 'Grant Cardone', s: 185 }, { id: 'NmGRMGDIOIU', t: 'The Two Things You Must Believe --Playbook to Millions', canal: 'Grant Cardone', s: 88 }, { id: 'Wxfq71FIrTQ', t: 'Why Product Knowledge is Important - Whatever it Takes Sneak Preview', canal: 'Grant Cardone', s: 115 }], nota: 'Los 3′ que sobran: escribe las 2 frases de Cardone sobre convicción que usarás en el drill.' },
  4: { vids: [{ id: '7NMH1oAkgLY', t: 'Giving Away Free Stuff Will Make You Rich', canal: 'Alex Hormozi', s: 741 }, { id: 'JfbtySq6_B4', t: 'Sell Anything To Anyone With This Unusual Method', canal: 'Alex Hormozi', s: 434 }], nota: 'Anota qué «regala» un operador en tu negocio (1 línea): es la base del PITCH v1.' },
  5: { vids: [{ id: '9hdptAKBUoI', t: 'THE 10X RULE (by Grant Cardone) Top 7 Lessons | Book Summary', canal: 'TopSevenLessons', s: 312 }, { id: 'u9OhOsyHYVI', t: 'How to 10X Your Life - Grant Cardone', canal: 'Grant Cardone', s: 146 }], nota: 'Los 4′ que sobran: las 7 lecciones, 1 línea cada una (sin mirar).' },
  // semana 2 del plan (D6-D10; v6.03: mié 28-oct → mar 3-nov · v6.02: lun 26 → vie 30-oct), mismo criterio
  6: { vids: [{ id: 'JwdQw6jCJ0I', t: 'How to Handle Rejection - Grant Cardone', canal: 'Grant Cardone', s: 109 }, { id: 'jHa7B_Gc1p0', t: 'The Secret of How to Get Over Rejection - Grant Rant #182', canal: 'Grant Cardone', s: 140 }, { id: 'GpvI8Cnzzws', t: 'How to Handle Rejection in Sell or Be Sold Audio', canal: 'Grant Cardone', s: 72 }, { id: 'sBy4KCBpBkQ', t: 'How to Always Get a Yes - Grant Cardone', canal: 'Grant Cardone', s: 140 }], nota: 'Los 4′ que sobran: escribe tu frase para el próximo «no» de un lead (sin discutir).' },
  7: { vids: [{ id: 'NCH-iDdD9MU', t: 'How to Pitch Your Products with Enthusiasm', canal: 'Grant Cardone', s: 285 }, { id: 'iUEzMXQeT0k', t: 'How to Win in Anything--Grant Cardone', canal: 'Grant Cardone', s: 133 }, { id: 'cqwyIVmSM5A', t: 'What it Takes to be Successful', canal: 'Grant Cardone', s: 154 }], nota: 'Anota 1 gesto de energía GENUINA que copiarás en la toma de hoy.' },
  8: { vids: [{ id: 'SBF0nZ_Kfag', t: '5 Tips to Become the BEST Salesperson - Grant Cardone', canal: 'Grant Cardone', s: 855 }], nota: 'Anota los 5 tips en 5 líneas; marca el que más te cuesta.' },
  9: { vids: [{ id: 'ThSFgC_4NVA', t: 'How to sell a product - The most PURSUASIVE tactic you can use...', canal: 'Alex Hormozi', s: 575 }, { id: 'bx48qPlaGvE', t: 'My Best Sales Tactic (to Make a TON of Money)', canal: 'Alex Hormozi', s: 491 }], nota: 'Anota el RESULTADO que venderás en el PITCH (no el producto), en 1 línea.' },
  10: { vids: [{ id: 'VO9BkqF2ta8', t: 'Your Numbers Matter - Grant Cardone Coaching', canal: 'Grant Cardone', s: 822 }], nota: 'Anota los 3 números que medirá tu tablero.' },
};
/** Lectura L de la semana 1: plan B verificado (Archive.org pide cuenta gratuita y préstamo de 1 h; OverDrive/Libby pide carné de biblioteca). */
const AURUM_L_PLANB: Record<number, string> = {
  1: 'Sin préstamo de Archive.org: «TO SELL IS HUMAN by Daniel Pink» (Productivity Game, 7:20) + «Daniel Pink & Adam Grant Interview on Why To Sell is Human» (Knowledge at Wharton, 20:28) — youtube.com/watch?v=D5lq6qctevQ · youtube.com/watch?v=J6EjBwrdHgE.',
  2: 'Sin préstamo: Wharton (20:28) desde donde lo dejaste — youtube.com/watch?v=J6EjBwrdHgE.',
  4: 'Sin préstamo: Wharton (20:28) desde donde lo dejaste — youtube.com/watch?v=J6EjBwrdHgE.',
  5: 'Sin carné de biblioteca (OverDrive/Libby): «THE 10X RULE SUMMARY» (The Swedish Investor, 12:26) — youtube.com/watch?v=vlF0CucyBv8.',
  6: 'Sin préstamo de Archive.org: Wharton (20:28) desde donde lo dejaste — youtube.com/watch?v=J6EjBwrdHgE.',
  9: 'Sin préstamo de Archive.org: Wharton (20:28) desde donde lo dejaste — youtube.com/watch?v=J6EjBwrdHgE.',
};
function kwDe(leccion: string): string {
  return leccion.replace(/^.*?canal oficial:\s*/i, '').replace(/^(ver\s+)?(1\s+)?clip (corto\s+)?(sobre|de)\s+/i, '').replace(/\(.*?\)/g, '').trim().slice(0, 70);
}
export function guiaAurumDe(iso: string): GuiaBloque | null {
  const a: DiaAurum | undefined = aurumDiaDe(iso);
  if (!a) return null;
  const A = a.bloques.find((b) => b.tag === 'A');
  const PR = a.bloques.find((b) => b.tag === 'PRAC');
  const L = a.bloques.find((b) => b.tag === 'L');
  const obsUrl = aurumObsUrl(a.obs);
  const recursos: GuiaRecurso[] = [];
  const avisos: string[] = [];
  const cur = AURUM_VID[a.d];
  // ── A: vídeo concreto ──
  let pasoA: GuiaPaso | null = null;
  const segCur = cur ? cur.vids.reduce((s, v) => s + v.s, 0) : 0;
  const aMinPlan = A ? Math.max(A.min, segCur ? minDe(segCur) : 0) : 0; // si el vídeo concreto dura más que el estimado del plan, manda el real
  if (A) {
    if (cur) {
      const seg = segCur;
      if (aMinPlan > A.min) avisos.push(`El vídeo elegido dura ${mmss(seg)}: el bloque A pasa de ${A.min}′ a ${aMinPlan}′ (sale de la lectura L de hoy).`);
      pasoA = P(aMinPlan, `VER (${mmss(seg)} de vídeo): ${cur.vids.map((v, i) => `${i + 1}) «${v.t}» · ${v.canal} · ${mmss(v.s)}`).join(' → ')}`,
        `1,0× con subtítulos en inglés (auto-traducción al español solo si pierdes el hilo). ${cur.nota}`, { t: '▶ vídeo 1', url: yt(cur.vids[0].id) });
      cur.vids.forEach((v) => recursos.push(R(`${v.t} (${v.canal})`, yt(v.id), { min: minDe(v.s) })));
    } else if (A.url && /watch\?v=|youtu\.be\//.test(A.url)) {
      pasoA = P(aMinPlan, `VER · ${A.leccion}${A.dur ? ` (${A.dur})` : ''}`, '1,0× con subtítulos en inglés; anota 3 frases que usarías con un lead.', { t: '▶ vídeo', url: A.url });
      recursos.push(R(A.material, A.url, { min: A.min }));
    } else {
      pasoA = P(aMinPlan, `VER · ${A.material}: «${kwDe(A.leccion)}» (≤ ${A.min} min)`,
        `Regla fija (el plan enlaza el CANAL, no un vídeo): canal › 🔍 buscador del canal con 2-3 palabras EN INGLÉS del tema («${kwDe(A.leccion)}») → el resultado más visto de ≤ ${A.min} min (si no hay, 2 clips cortos que sumen ${A.min}′). Anota cuál viste en la nota ◆ del día. 1,0× con subtítulos.`, A.url ? { t: 'canal ↗', url: A.url } : undefined);
      if (A.url) recursos.push(R(`${A.material} (canal)`, A.url));
      avisos.push('Vídeo A sin fijar en el plan (enlace al canal): se elige con la regla del paso.');
    }
  }
  const pitchTxt = a.pitch ? ` CIERRE DE FASE → PITCH v${a.pitch}: grábalo y puntúalo con la rúbrica (6 ítems × 0-2 = /12) en Empresa › AURUM › HOY; vale el score, no «grabé».` : '';
  const pasoPR = PR ? P(PR.min, `DRILL · ${PR.leccion}`, `Práctica deliberada: 1 corrección por toma; guarda el resultado (texto o audio) en la nota ◆ del día.${pitchTxt}`, obsUrl ? { t: '◆ nota del día', url: obsUrl } : undefined) : null;
  const pasoLV = a.liviano ? P(a.liviano.min, `VARIANTE LIVIANO · ${a.liviano.texto.slice(0, 220)}${a.liviano.texto.length > 220 ? '…' : ''}`, `Mismo paciente que el caso de la Academia (Empresa › AURUM › HOY › tarjeta LIVIANO). Venta ética: sin promesa clínica.${a.liviano.pitch ? ` ${a.liviano.pitch}` : ''}`) : null;
  const lUrl = L?.url;
  if (L && lUrl) recursos.push(R(`L · ${L.material}`, lUrl, { min: L.min }));
  const pasos: GuiaPaso[] = [];
  let franja: string;
  if (!a.min30) {
    const W = 60;
    let fijo = aMinPlan + (PR ? PR.min : 0) + (pasoLV ? pasoLV.min : 0);
    let lvFuera = false;
    if (fijo > W && pasoLV) { lvFuera = true; fijo -= pasoLV.min; }
    const margen = fijo + 3 <= W;
    if (margen) pasos.push(P(1, 'ARRANQUE · abre la nota ◆ del día y lee el drill', 'Así el vídeo se ve con el drill en la cabeza.', obsUrl ? { t: '◆ Obsidian', url: obsUrl } : undefined));
    if (pasoA) pasos.push(pasoA);
    if (pasoPR) pasos.push(fijo > W ? { ...pasoPR, min: Math.max(1, W - aMinPlan) } : pasoPR);
    if (pasoLV && !lvFuera) pasos.push(pasoLV);
    let libre = W - sumMin(pasos) - (margen ? 2 : 0);
    if (L && libre >= 5) {
      const lin = Math.min(L.min, libre);
      const pb = AURUM_L_PLANB[a.d];
      pasos.push(P(lin, `LECTURA L · ${L.leccion}${lin < L.min ? ` — los primeros ${lin}′ de ${L.min}′` : ''}`,
        `${L.formato === 'audio' ? 'Audio/lectura' : 'Lectura'} activa: marca dónde quedas.${lin < L.min ? ` Los ${L.min - lin}′ restantes son lectura de huecos (no es núcleo).` : ''}${pb ? ` Plan B: ${pb}` : ''}`, lUrl ? { t: 'L ↗', url: lUrl } : undefined));
      libre -= lin;
      if (lin < L.min) avisos.push(`L: ${L.min - lin}′ no caben en la hora → lectura de huecos.`);
    } else if (L) avisos.push(`L (${L.min}′) no cabe hoy en la hora → lectura de huecos.`);
    if (libre > 0) pasos.push(margen
      ? P(libre, 'SEGUNDA TOMA del drill', 'Repite el drill en voz alta o reescríbelo corrigiendo UNA cosa de la primera toma.')
      : P(libre, 'CIERRE · nota ◆ del día + ✓ en Empresa › AURUM', 'Lo que no cupo queda escrito como pendiente en la nota.', obsUrl ? { t: '◆ Obsidian', url: obsUrl } : undefined));
    if (margen) pasos.push(P(2, 'CIERRE · ≤3 tarjetas de MECANISMO (¿por qué funciona?) en la nota ◆ + ✓ en Empresa › AURUM', 'Nada de datos sueltos.', obsUrl ? { t: '◆ Obsidian', url: obsUrl } : undefined));
    if (lvFuera && pasoLV) avisos.push(`Núcleo + variante LIVIANO = ${aMinPlan + (PR ? PR.min : 0) + pasoLV.min}′ > 60′: la variante LIVIANO (${pasoLV.min}′) no cabe hoy → ⚠ decisión de Joseph (propuesta: el sábado tras la revisión).`);
    franja = '14:15–15:15';
  } else {
    // DJ-4 (desde el lun 4-ene-2027): 30′ = 1′ arranque + vídeo (≤8′) + drill (el resto) + 1′ cierre; lo demás opcional
    const W = 30;
    let aE = pasoA ? Math.min(aMinPlan, 8) : 0;
    let prE = PR ? Math.min(PR.min, W - 2 - aE) : 0;
    let resto = W - 2 - aE - prE;
    if (resto > 0 && pasoA) { const extra = Math.min(aMinPlan - aE, resto); aE += extra; resto -= extra; }
    pasos.push(P(1, 'ARRANQUE · nota ◆ del día', 'Lee el drill antes del vídeo.', obsUrl ? { t: '◆ Obsidian', url: obsUrl } : undefined));
    if (pasoA && aE > 0) pasos.push({ ...pasoA, min: aE, que: aE < aMinPlan ? `${pasoA.que} — los primeros ${aE}′` : pasoA.que });
    if (pasoPR && prE > 0) pasos.push({ ...pasoPR, min: prE });
    if (resto > 0) pasos.push(P(resto, 'SEGUNDA TOMA del drill', 'Corrige UNA cosa.'));
    pasos.push(P(1, 'CIERRE · ✓ en Empresa › AURUM', 'Anota en la nota ◆ lo que quedó opcional.'));
    const fuera = [aMinPlan - aE > 0 ? `vídeo ${aMinPlan - aE}′` : '', PR && PR.min - prE > 0 ? `drill ${PR.min - prE}′` : '', pasoLV ? `variante LIVIANO ${pasoLV.min}′` : '', L ? `L ${L.min}′` : ''].filter(Boolean);
    if (fuera.length) avisos.push(`AURUM a 30′ (DJ-4): opcional fuera de la franja → ${fuera.join(' · ')}.`);
    franja = '14:15–14:45';
  }
  return bloque(franja, 'aurum', `AURUM D${a.d} · ${a.titulo}`, pasos, recursos,
    a.pitch ? `PITCH v${a.pitch} grabado y puntuado con la rúbrica (/12) + nota ◆ del día` : 'vídeo visto con sus notas + drill hecho y guardado en la nota ◆ del día + ✓',
    { aviso: avisos.join(' ') || undefined, planB: 'YouTube caído o sin datos: haz el drill primero (es el núcleo) y el vídeo en el próximo hueco. Si no hay tiempo: el drill nunca se salta; el vídeo sí.' });
}

// ════════════════════════════════════════ 17:15 · LIVIANO ════════════════════════════════════════
const SCHWARTZ = 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5546881/';
/** Módulo FISIOLOGÍA (D1-D20): secciones de Schwartz MW et al. «Obesity Pathogenesis: An Endocrine Society Scientific Statement»,
 *  Endocr Rev 2017;38(4):267-296 (PMID 28898979 · PMC5546881, acceso libre), con el nº de palabras de cada sección leído de PMC el 18-oct. */
const LIV_LECT: Record<string, Array<[string, number]>> = {
  c1: [['Abstract', 278], ['Essential Points', 341], ['Essential Points › Definition', 258], ['Essential Points › Rationale for a scientific statement on obesity pathogenesis', 354]],
  c2: [['Energy Homeostasis… › General principles › Background', 698], ['Mechanisms of Obesity Pathogenesis › Other factors › Mechanisms for biological defense of elevated body-fat mass', 849]],
  c3: [['Neurobiology of energy homeostasis › Background', 217], ['General principles › Leptin and energy homeostasis', 438], ['Concluding Remarks › Lessons learned from the weight-reduced state', 242]],
  c4: [['General principles › Leptin and energy homeostasis (2.ª pasada: los párrafos de «leptin resistance» y del umbral)', 438], ['Concluding Remarks › The two distinct components of obesity pathogenesis', 213]],
  caso1: [['Concluding Remarks › Lessons learned from the weight-reduced state (relectura para el caso)', 242]],
  c5: [['Neurobiology › Hypothalamic neurons controlling energy balance', 849]],
  c6: [['Neurobiology › Hypothalamic neurons controlling energy balance (2.ª pasada: POMC/α-MSH)', 849]],
  c7: [['Integrative physiology › Determinants of feeding behavior', 659], ['GI factors › Insights from bariatric surgery', 471]],
  c8: [['Neurobiology › Hindbrain circuits and the parabrachial nucleus', 510], ['Concluding Remarks › The gut–brain axis', 110]],
  caso2: [['Integrative physiology › Determinants of feeding behavior (relectura para el caso)', 659]],
  c9: [['Concluding Remarks › The gut–brain axis', 110], ['Concluding Remarks › The two distinct components of obesity pathogenesis', 213]],
  c10: [['Integrative physiology › Determinants of energy expenditure', 514], ['Concluding Remarks › Lessons learned from the weight-reduced state', 242]],
  c11: [['Other factors › Mechanisms for biological defense of elevated body-fat mass (2.ª pasada)', 849]],
  c12: [['Concluding Remarks › The two distinct components', 213], ['› Developmental determinants of the biologically defended level of body-fat mass', 134], ['› Lessons learned from the weight-reduced state', 242], ['› Translating basic science into more effective pharmacotherapy', 97]],
  caso3: [['Concluding Remarks › Lessons learned from the weight-reduced state (relectura para el caso)', 242]],
};
/** v6.03 (20-oct-2026): LIV_LECT va por FILA del currículo — `c<n>` = n-ésimo tema de contenido · `caso<n>` = caso n —, no por D del plan
 *  (antes 1-15 = D1-D15 de v6.02, con los casos en D5/D10/D15). Con el D1 en miércoles los casos caen D3/D8/D13 y el D# de cada tema cambia;
 *  la lectura medida sigue a su tema. Ojo: con los casos antes, la «relectura para el caso» 1 llega antes de la 1.ª lectura de esa sección (c3). */
function livLectDe(l: DiaLiviano): Array<[string, number]> | undefined {
  if (l.casoId == null) return LIV_LECT[`c${LIV_DIAS.filter((x) => x.casoId == null && x.d <= l.d).length}`];
  const xs = LIV_LECT[`caso${l.casoId}`];
  if (!xs) return undefined;
  // «relectura» solo si esa sección ya se leyó antes en el plan; si no (v6.03: casos 1 y 2), se dice que es la 1.ª lectura (mismo texto y palabras)
  const base = (s: string): string => s.replace(/ \([^()]*\)$/, '');
  const previas = new Set(LIV_DIAS.filter((x) => x.casoId == null && x.d < l.d).flatMap((x) => (livLectDe(x) ?? []).map(([s]) => base(s))));
  return xs.map(([s, n]): [string, number] => [previas.has(base(s)) ? s : s.replace('(relectura para el caso)', '(para el caso: 1.ª lectura, en el plan va después)'), n]);
}
/** Fuentes del plan → URL verificada (18-oct-2026). `pago`/`verificar` = aviso visible. */
const LIV_FUENTES: Array<{ re: RegExp; t: string; url: string; nota?: string }> = [
  { re: /Schwartz 2017/, t: 'Schwartz 2017 · Endocrine Society Statement (PMC, libre)', url: SCHWARTZ },
  { re: /Obesity Algorithm/, t: 'OMA · Obesity Algorithm 2026 (índice público)', url: 'https://obesitymedicine.org/resources/obesity-algorithm/', nota: 'El Obesity Algorithm 2026 de la OMA es DE PAGO (e-book o impreso; la web solo muestra el índice) → mientras Joseph no lo compre, el respaldo libre es la guía de Obesity Canada.' },
  { re: /Obesity Canada/, t: 'Obesity Canada · guía clínica de adultos', url: 'https://obesitycanada.ca/healthcare-professionals/adult-clinical-practice-guideline/' },
  { re: /5As/, t: 'Obesity Canada · 5As Framework (PDF, 2026)', url: 'https://obesitycanada.ca/wp-content/uploads/2026/03/5As-Framework-for-Obesity-Management-in-Adults.pdf' },
  { re: /STEP 1/, t: 'STEP 1 · Wilding 2021 NEJM (PubMed 33567185)', url: 'https://pubmed.ncbi.nlm.nih.gov/33567185/' },
  { re: /SELECT/, t: 'SELECT · Lincoff 2023 NEJM (PubMed 37952131)', url: 'https://pubmed.ncbi.nlm.nih.gov/37952131/' },
  { re: /SURMOUNT-1|SURMOUNT\b/, t: 'SURMOUNT-1 · Jastreboff 2022 NEJM (PubMed 35658024)', url: 'https://pubmed.ncbi.nlm.nih.gov/35658024/' },
  { re: /SURMOUNT-5/, t: 'SURMOUNT-5 · Aronne 2025 NEJM (PubMed 40353578)', url: 'https://pubmed.ncbi.nlm.nih.gov/40353578/' },
  { re: /PMC10098946/, t: 'Meta-análisis ADF / 5:2 / TRE · Obesity 2023 (PMC10098946)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10098946/' },
  { re: /DIETFITS/, t: 'DIETFITS · Gardner 2018 JAMA (PMC5839290)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5839290/' },
  { re: /National Weight Control Registry|NWCR/, t: 'NWCR · Thomas 2014 Am J Prev Med (PubMed 24355667)', url: 'https://pubmed.ncbi.nlm.nih.gov/24355667/' },
  { re: /ASMBS\/IFSO|PMC9834364/, t: 'ASMBS/IFSO 2022 · indicaciones de cirugía (PMC9834364)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9834364/' },
  { re: /\bDPP\b/, t: 'DPP · Knowler 2002 NEJM (PMC1370926)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1370926/' },
  { re: /DIGEMID/, t: 'DIGEMID (portal; la consulta de registro sanitario: A VERIFICAR)', url: 'https://www.digemid.minsa.gob.pe/webDigemid/', nota: 'La URL exacta de la consulta de registros sanitarios de DIGEMID sigue A VERIFICAR (el plan lo marca así).' },
];
const LIV_OBS = obs('02_EMPRESA FINANZAS/02_LIVIANO/_concepto_madre');
export function livFuentesDe(fuente: string): { recursos: GuiaRecurso[]; notas: string[] } {
  const recursos: GuiaRecurso[] = []; const notas: string[] = [];
  for (const f of LIV_FUENTES) if (f.re.test(fuente)) { recursos.push(R(f.t, f.url)); if (f.nota) notas.push(f.nota); }
  return { recursos, notas };
}
export function guiaLivianoDe(iso: string): GuiaBloque | null {
  const l: DiaLiviano | undefined = livDiaDe(iso);
  if (!l) return null;
  const { recursos, notas } = livFuentesDe(l.fuente);
  const deck = livAnkiDeck(l.modulo);
  const cards = livCardsDeDia(l.d);
  const lect = livLectDe(l); // v6.03: por tema / caso, no por D
  const palabras = lect ? lect.reduce((a, x) => a + x[1], 0) : 0;
  const caso = l.casoId != null ? livCasoDeDia(l.d) : undefined;
  const drill = l.drill ? livDrillDe(l.d) : undefined;
  const pasos: GuiaPaso[] = [];
  const avisos: string[] = [...notas];
  const pre = l.pretest ? 6 : 0;
  const dr = drill ? 6 : 0;
  if (pre) pasos.push(P(6, 'PRE-TEST ciego 5Q de la semana anterior', 'Empresa › LIVIANO › Academia › HOY › pre-test: responde SIN mirar tarjetas; registra x/5 (meta ≥ 4/5 = 80 %). Lo fallado → tarjeta de hoy.'));
  if (drill) pasos.push(P(6, `DRILL de cifras ancla en ciego (${drill.qs.length} preguntas)`, 'Empresa › LIVIANO › HOY › drill: sin mirar; registra el %.'));
  const sinLectura = /Palmerton: 10 tarjetas|Repaso del eje|Biblioteca de metáforas|Síntesis módulo|REVISIÓN TRIMESTRAL/i.test(l.tema);
  if (caso) {
    const prev = livCardsSemanaPrevia(l.d);
    const lmin = lect ? Math.ceil(palabras / PPM_EN) : 0;
    pasos.push(P(6, `REPASO Anki de la semana (${prev.length} tarjetas de ${deck})`, 'Anki › el mazo del módulo: revisiones primero; las falladas se dicen en voz alta.'));
    if (lect && lmin) pasos.push(P(lmin, `LECTURA · Schwartz 2017 › ${lect.map((x) => `${x[0]} (${x[1]} palabras)`).join(' + ')}`, `${lmin}′ a ${PPM_EN} palabras/min: busca el MECANISMO que le explicarás a la paciente.`, { t: 'Schwartz 2017 (PMC)', url: SCHWARTZ }));
    pasos.push(P(Math.max(3, 25 - 6 - lmin - pre - dr), `MONTAR EL CASO ${caso.id}/16 · ${caso.titulo}`, `Empresa › LIVIANO › Academia › HOY › Caso: lee paciente, datos y red flags; escribe en 3 líneas: mecanismo · metáfora · plan (1 métrica + fecha de control). Consigna: ${caso.consigna.slice(0, 160)}${caso.consigna.length > 160 ? '…' : ''}`));
    pasos.push(P(15, 'ROLE-PLAY grabado (2 tomas de ≤5 min)', `${l.aplicacion.replace(/ → puntúa.*$/, '')} Toma 2 = corrige 1 cosa de la toma 1. Lenguaje people-first, sin culpa.`));
    pasos.push(P(5, 'RÚBRICA 0-2 × 4 (mecanismo · metáfora · people-first · plan) → guarda el puntaje', 'En la tarjeta del caso (meta ≥ 6/8 por caso; ≥ 80 % de media del bloque). Lo que saque 0 → tarjeta nueva.'));
  } else {
    let lmin = 0;
    if (lect) lmin = Math.ceil(palabras / PPM_EN);
    else if (!sinLectura) lmin = 12;
    const tarjetasMin = () => 25 - pre - dr - lmin - 3;
    if (tarjetasMin() < 3) { const sobra = 3 - tarjetasMin(); lmin -= sobra; avisos.push(`Lectura limitada a ${lmin}′ hoy: lo que no leas abre la lectura de mañana.`); }
    if (lect) pasos.push(P(lmin, `LECTURA · Schwartz 2017 › ${lect.map((x) => `${x[0]} (${x[1]} palabras)`).join(' + ')} = ${palabras} palabras`,
      `${lmin}′ a ${PPM_EN} palabras/min (inglés de arranque): 1 pasada activa subrayando causa → efecto; no traduzcas palabra por palabra (DeepL/Google solo para 1-2 frases). Estudio de hoy: ${l.estudio}`, { t: 'Schwartz 2017 (PMC)', url: SCHWARTZ }));
    else if (lmin) pasos.push(P(lmin, `LECTURA · ${l.estudio} — fuente: ${l.fuente} (sección del tema, sin medir)`, `${lmin}′: busca en la fuente la sección del tema de hoy y léela activamente (causa → efecto). Si la fuente es de pago o no carga: la siguiente fuente libre de la lista.`, recursos[0] ? { t: 'fuente ↗', url: recursos[0].url } : undefined));
    pasos.push(P(tarjetasMin(), sinLectura ? `ESTUDIO · ${l.estudio}` : `TARJETAS de MECANISMO de hoy (${cards.length} en ${deck})`,
      sinLectura ? `Hoy no hay lectura nueva: ${l.estudio}. Tarjetas en ${deck}.` : `Empresa › LIVIANO › Academia › HOY › «Anki de hoy» (o CSV DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv) → impórtalas a ${deck} + 1 propia si falta un «¿por qué?». Regla del frente: tu anverso, sin cloze.`));
    pasos.push(P(3, 'FREE RECALL a papel (sin mirar)', 'La cadena causal de hoy en 5 líneas; compara y corrige en rojo.'));
    pasos.push(P(20, `APLICACIÓN · ${l.aplicacion}`, 'En voz alta y grabado (nota de voz ≤60 s): toma 1 tal cual · toma 2 más simple · toma 3 con la metáfora; escucha la 3.ª y corrige 1 cosa. People-first (persona con obesidad), sin culpa.'));
  }
  if (!lect && !caso && !sinLectura && !recursos.length) avisos.push('Sin fuente con URL para hoy: usa los apuntes del módulo (Empresa › LIVIANO).');
  recursos.push(R('◆ LIVIANO · concepto madre (Obsidian)', LIV_OBS));
  return bloque('17:15–18:00', 'liviano', `LIVIANO D${l.d} · ${l.modulo} — ${l.tema}`, pasos, recursos,
    caso ? `role-play grabado + rúbrica /8 guardada en el caso ${caso.id}` : `lectura hecha + ${cards.length || 'las'} tarjetas en ${deck} + 3 tomas de la aplicación grabadas${pre ? ' + pre-test x/5 registrado' : ''}`,
    { aviso: avisos.join(' ') || undefined, flex: Math.max(0, pasos.length - 3),
      planB: 'Fuente caída o sin tiempo: 25′ de tarjetas del módulo (Empresa › LIVIANO › Anki) + la aplicación de 20′ completa; la lectura pasa a mañana.' });
}

// ════════════════════════════════════════ 13:00 · BUSINESS (Estudio Pulso) ════════════════════════════════════════
const PULSO_OBS = obs('02_EMPRESA FINANZAS/01_PULSO/_concepto_madre');
/** Semana 1: tramos EXACTOS de charlas oficiales de los autores (capítulos de YouTube leídos el 18-oct). Sustituyen la búsqueda (Spark) y el
 *  audiolibro caído (In Defense of Food, nHR8B8V2v9s → «Video no disponible»): mismo libro, mismo autor, mismo contenido del plan.
 *  v6.03 (20-oct-2026): la clave es la FILA del plan — libro (libroN) + nº de lectura de ese libro —, no la fecha (antes '2026-10-19' …
 *  '2026-10-22'): con el D1 en el mié 21-oct Spark cae mié 21 / jue 22 y Pollan lun 26 / mar 27-oct (el OUTPUT S1 del vie 23 va en medio). */
const BIZ_TRAMO: Record<string, { id: string; ini: number; fin: number; t: string; caps: string }> = {
  '143#1': { id: 'Bmc0ERKfjP0', ini: 0, fin: 1262, t: 'Talks at Google · «In Spark | Dr. John Ratey» (49:12)', caps: 'Introduction → Evolutionary perspective → Brain function and schools (Naperville) → Exercise and productivity → Mental health benefits → Neurobiology of learning (BDNF) → Studies on fitness and IQ' },
  '143#2': { id: 'Bmc0ERKfjP0', ini: 1262, fin: 2148, t: 'Talks at Google · «In Spark | Dr. John Ratey» (49:12)', caps: 'Mechanisms of neuroplasticity → Body-brain communication → Clinical evidence in adults (estrés/ansiedad/ánimo) → Behavioral improvements (atención) → Cerebellum and balance' },
  '4#1': { id: 'I-t-7lTw6mA', ini: 82, fin: 1297, t: 'Talks at Google · «In Defense of Food | Michael Pollan» (59:13)', caps: 'The omnivore\'s dilemma → Defining nutritionism → Problems with nutritionism → Food for health vs. pleasure → Limitations of food science → The low-fat campaign failure (= partes 1-2 del libro)' },
  '4#2': { id: 'I-t-7lTw6mA', ini: 1297, fin: 2231, t: 'Talks at Google · «In Defense of Food | Michael Pollan» (59:13)', caps: 'Cultural wisdom and food → Rules for eating real food → Manners and eating habits → Taking back control of food (= parte 3: las reglas)' },
};
/** Clave de BIZ_TRAMO de una fila: «libroN#k» = k-ésima lectura (L/CRITICA) de ese libro en el plan. */
function bizTramoDe(r: DiaBiz) {
  if (r.libroN == null) return undefined;
  const k = BIZ_DIAS.filter((x) => x.libroN === r.libroN && x.d <= r.d && (bizModo(x) === 'L' || bizModo(x) === 'CRITICA')).length;
  return BIZ_TRAMO[`${r.libroN}#${k}`];
}
/** Enlaces del plan Business comprobados el 18-oct-2026 que NO sirven (caídos / no reproducibles / subidas de 2 min) y su sustituto
 *  (el generador gen_business_plan.py ya los reemplaza en businessStudyPlan.ts; esta tabla solo explica el aviso si una fila vieja los trae). */
const BIZ_CAIDOS = new Set(['nHR8B8V2v9s', 'RzeLu23_XjE', 'UbQvc8QrnJw', '5Bgufm9VwfU', 'hiDeEu9a_UA', 'hd2oXclE15U', 'dhrQqaH_M6Q', 'JM3yjVTmUoY', '3s65q2rTFRk']);
/** ¿Dónde va Business hoy? null = sin Business (fin de semana, feriado, fuera de plan). Ver decisiones en la cabecera. */
/** OUTPUTs de la semana L-V que cierra el sábado `iso` (normalmente el del viernes; al final del plan hay OUTPUT en lun/mar). */
function bizOutputsDeSemana(sabado: string): Array<{ r: DiaBiz; entero: boolean }> {
  const out: Array<{ r: DiaBiz; entero: boolean }> = [];
  for (let k = 5; k >= 1; k--) {
    const f = addDias(sabado, -k);
    const r = bizDiaDe(f);
    if (r && bizModo(r) === 'OUTPUT') out.push({ r, entero: !!hitoDe(f)?.nbme });
  }
  return out;
}
export function bizFranjaDe(iso: string): { ini: string; fin: string; sabado?: boolean } | null {
  const w = dow(iso);
  if (w === 6) {
    const outs = bizOutputsDeSemana(iso);
    if (!outs.length) return null;
    const ini = faseV6(iso) === 'F2' ? '09:15' : '07:45';
    return { ini, fin: aHHMM(aMin(ini) + outs.reduce((a, o) => a + (o.entero ? 40 : 15), 0)), sabado: true };
  }
  const r = bizDiaDe(iso);
  if (!r || bizModo(r) === 'DESCANSO' || w === 0) return null;
  const h = hitoDe(iso);
  if (h?.nbme) return bizModo(r) === 'OUTPUT' ? null : { ini: '12:30', fin: '12:55' };
  return { ini: '13:00', fin: '13:25' };
}
export function guiaBusinessDe(iso: string): GuiaBloque | null {
  const f = bizFranjaDe(iso);
  if (!f) return null;
  const franja = `${f.ini}–${f.fin}`;
  if (f.sabado) {
    const pasos: GuiaPaso[] = [];
    for (const { r, entero } of bizOutputsDeSemana(iso)) {
      const nom = r.lectura.split(':')[0];
      if (entero) pasos.push(
        P(1, `${/^OUTPUT/.test(nom) ? nom : `OUTPUT · ${nom}`} (${r.wd} ${r.fecha.slice(8)})`, `El ${r.wd.toLowerCase()} fue día de NBME: el OUTPUT entero se hace hoy.`),
        P(25, `Escribir el entregable: ${r.lectura}`, `1 página en Obsidian (01_PULSO): ${r.accion}. Con tus horarios reales (Calendar: dormir 21:00 → 04:00).`, { t: '◆ 01_PULSO', url: PULSO_OBS }),
        P(10, 'TRACKER semanal (1 fila): sueño 7-8 h ≥ 6/7 · ejercicio ≥ 5/7 · comida real ≥ 6/7 · lecturas L 4/4 · output 1', 'Con los datos de la semana que acaba de cerrar (los mismos de la revisión semanal de las 07:15).'),
        P(4, 'Cerrar: releer y marcar ✓', 'Empresa › Business (Estudio Pulso) › HOY.'),
      );
      else pasos.push(
        P(10, `TRACKER semanal (1 fila) del ${nom}: sueño 7-8 h ≥ 6/7 · ejercicio ≥ 5/7 · comida real ≥ 6/7 · score ≥ 85 % · lecturas L 4/4 · output 1`, `Del OUTPUT del ${r.wd.toLowerCase()} ${r.fecha.slice(8)}: la fila se llena con la semana cerrada (mismos datos de la revisión de las 07:15).`, { t: '◆ 01_PULSO', url: PULSO_OBS }),
        P(5, `Releer la página del ${nom} y cerrarla`, 'Corrige 1 cosa; ✓ en Empresa › Business › HOY.'),
      );
    }
    return bloque(franja, 'business', `BUSINESS · cierre del OUTPUT de la semana (tracker semanal)`, pasos, [R('◆ Pulso · concepto madre', PULSO_OBS)],
      'fila del tracker semanal escrita + página del OUTPUT cerrada', { aviso: 'El OUTPUT (40′) no cabe en 13:00-13:25: 25′ el día del OUTPUT + 15′ el sábado tras la revisión semanal (o entero el sábado si ese día fue NBME).' });
  }
  const r = bizDiaDe(iso) as DiaBiz;
  const modo = bizModo(r);
  const h = hitoDe(iso);
  const recursos: GuiaRecurso[] = [R('◆ Pulso · concepto madre', PULSO_OBS)];
  const avisos: string[] = [];
  if (h?.uwsa) avisos.push('Hoy UWSA1: Business se ESCUCHA durante el almuerzo (13:00-13:30); la nota, al terminar.');
  if (h?.nbme) avisos.push('Hoy NBME: almuerzo 12:30-13:00 → Business se escucha durante el almuerzo; SYNAPSE 13:00.');
  if (modo === 'OUTPUT') {
    const pasos = [
      P(1, `${/^OUTPUT/.test(r.lectura) ? r.lectura.split(':')[0] : `OUTPUT · ${r.lectura.split(':')[0]}`}`, 'Lee el entregable y la acción.'),
      P(22, `Escribir: ${r.lectura}`, `Página nueva en Obsidian › 02_EMPRESA FINANZAS › 01_PULSO. ${r.accion}. Con tus horarios reales (Calendar: dormir 21:00 → 04:00). Terminado > perfecto.`, { t: '◆ 01_PULSO', url: PULSO_OBS }),
      P(2, 'Guardar', `El sábado ${faseV6(iso) === 'F2' ? '09:15' : '07:45'} (tras la revisión semanal): tracker semanal + cierre (15′).`),
    ];
    return bloque(franja, 'business', `BUSINESS D${r.d} · ${r.lectura.split(':')[0]} (1/2)`, pasos, recursos, 'página del OUTPUT escrita en 01_PULSO (borrador completo)',
      { aviso: [...avisos, `OUTPUT = 40′: 25′ hoy + 15′ el sábado ${faseV6(iso) === 'F2' ? '09:15' : '07:45'} (tracker + cierre).`].join(' ') });
  }
  const tramo = bizTramoDe(r); // v6.03: por fila del plan (libro + nº de lectura), no por fecha
  const pasos: GuiaPaso[] = [P(1, `OBJETIVO · ${r.materia}${modo === 'CRITICA' ? ' (lectura CRÍTICA)' : ''}`, `Lee la lectura y la acción de hoy: ${r.accion}`)];
  if (tramo) {
    const m = minDe(tramo.fin - tramo.ini);
    pasos.push(P(m, `ESCUCHAR/VER · ${tramo.t} → ${mmss(tramo.ini)}-${mmss(tramo.fin)} (${m}′) = ${r.lectura}`, `Capítulos: ${tramo.caps}. 1,0× con subtítulos en inglés (auto-traducción al español si pierdes el hilo). Es la charla del propio autor.`, { t: `▶ desde ${mmss(tramo.ini)}`, url: yt(tramo.id, tramo.ini) }));
    recursos.push(R(tramo.t, yt(tramo.id, tramo.ini), { min: m }));
  } else {
    const id = (/watch\?v=([\w-]{11})/.exec(r.yt ?? '') || [])[1];
    const caido = !!id && BIZ_CAIDOS.has(id);
    const busqueda = !!r.yt && /results\?search_query=/.test(r.yt);
    pasos.push(P(20, `ESCUCHAR/LEER 20′ · ${r.lectura}`,
      caido ? 'El enlace del plan está CAÍDO (comprobado el 18-oct): lee 20′ del capítulo indicado en tu libro (Biblioteca del Fundador) y marca la página.'
        : busqueda ? 'El plan enlaza una BÚSQUEDA: elige el primer resultado de ≤ 25 min del propio autor (charla/entrevista) o, si tienes el libro, lee 20′ del capítulo indicado. Anota cuál fue.'
          : '20′ desde donde quedaste (1 solo tramo); marca el minuto/página. 1,0×.', r.yt && !caido ? { t: busqueda ? '🔍 búsqueda' : '▶ audio/vídeo', url: r.yt } : undefined));
    if (r.yt && !caido) recursos.push(R(busqueda ? 'búsqueda en YouTube' : 'audio/vídeo del plan', r.yt));
    if (caido) avisos.push('Enlace del plan caído: regenera businessStudyPlan.ts con gen_business_plan.py (ya trae el sustituto verificado).');
  }
  pasos.push(P(25 - sumMin(pasos), `ACCIÓN + NOTA · ${r.accion}`, 'Nota de 3 líneas en Obsidian (01_PULSO) o 1 tarjeta de mecanismo (¿por qué?), no datos sueltos.', { t: '◆ 01_PULSO', url: PULSO_OBS }));
  return bloque(franja, 'business', `BUSINESS D${r.d} · ${r.materia} — ${r.lectura.split(':')[0]}`, pasos, recursos, `tramo escuchado/leído + «${r.accion.slice(0, 80)}» hecho`,
    { aviso: [...avisos, minutosFranja(franja) === 25 && !h ? 'Business ocupa 13:00-13:25 = «LECTURA DE LIBRO» del Calendar (13:00-13:15) + 10′ del hueco 13:15-13:30; en ÁMBAR baja a 13:00-13:15 y la siesta manda.' : ''].filter(Boolean).join(' ') || undefined,
      planB: 'Sin datos/YouTube: el libro en papel o PDF, 20′ del capítulo indicado. Sin tiempo hoy: el tramo pasa al de mañana (Business es 1 tramo por día, en orden).' });
}

// ════════════════════════════════════════ sábado 07:15 · REVISIÓN SEMANAL ════════════════════════════════════════
const GH = 'https://github.com/josephMAX-svg/joseph-md-app/blob/master/';
/** Nombre del fichero de la revisión: S<NN>_<sábado>.md, NN = semanas de calendario desde la del D1 (= gen_revision_semanal.js). */
export function revisionFicheroDe(sabado: string): string {
  const d1 = FECHAS_V6.f1.inicio;
  const lunesD1 = addDias(d1, dow(d1) === 0 ? -6 : 1 - dow(d1));
  const lunes = addDias(sabado, -5);
  const n = Math.floor((new Date(lunes + 'T12:00:00Z').getTime() - new Date(lunesD1 + 'T12:00:00Z').getTime()) / 86400000 / 7) + 1;
  return `S${String(Math.max(0, n)).padStart(2, '0')}_${sabado}.md`;
}
export function guiaRevisionDe(iso: string): GuiaBloque | null {
  if (dow(iso) !== 6 || iso < FECHAS_V6.f1.inicio) return null;
  const fichero = revisionFicheroDe(iso);
  const ruta = `${REPO}/DATA/USMLE/REVISIONES/${fichero}`;
  const d1 = FECHAS_V6.f1.inicio;
  const primera = iso === addDias(d1, (6 - dow(d1) + 7) % 7); // v6.03: 1.er sábado desde el D1 (mié 21 → sáb 24-oct; antes D1 + 5, que solo valía con D1 en lunes)
  const prep = primera
    ? 'Semana 2: AccessDerma renovado (si no, Derma sigue en PLAN B: selector en Derma › HOY) · runners ENCAPS del lun 26 al jue 29 generados (eval + banco; E4) · velocidad de vídeo USMLE de la S2 = 1,25× solo si tu free recall recogió ≥ 3 ideas · el journal 2026-W44 lo crea el lunes journal_hoy.js.'
    : 'Lo que la semana que entra necesita listo: accesos (Qbankly, ProMIR, AccessDerma), runners ENCAPS de la semana, hito USMLE si lo hay (ver la línea «hito» del fichero).';
  return bloque('07:15–07:45', 'revision', `REVISIÓN SEMANAL · ${fichero.replace('.md', '')}`, [
    P(3, `GENERAR y abrir ${fichero}`, `Home › PROGRESO → «Sincronizar ahora» (plan_checks) · luego en D:\\joseph-md-app: \`node DATA/_scripts/gen_revision_semanal.js\` → crea DATA/USMLE/REVISIONES/${fichero} y actualiza _semanas.json.`, { t: `abrir ${fichero}`, url: vsc(ruta) }),
    P(8, 'RELLENAR a mano las métricas «sin dato»', `1 USMLE (pre-test /10 · consolidación % · eval) · 2 uWorld % vs mínimo del próximo hito${primera ? ' (UWSA1 = baseline, sin juicio)' : ''} · 4 ENCAPS mini-sim /25 del viernes · 5 MIR eval D-1 · 8 sueño. Nunca se inventa: lo que no tengas queda «sin dato».`),
    P(5, 'CHECKLIST G + burnout §6', 'Marca G1-G10 y las 5 casillas de burnout. UNA alarma = corrección esta semana; 2+ = semana ÁMBAR.'),
    P(6, 'DECIDIR (4 líneas en el fichero)', 'Nivel de la semana que entra (VERDE / ÁMBAR / DELOAD) · 1 corrección concreta (qué, cuándo, cómo se mide el sábado que viene) · 1 cosa que se deja · Anki sáb/dom = vencidas × 20 s.'),
    P(5, 'PREPARAR la semana siguiente', prep),
    P(3, 'GUARDAR + ✓', 'Guarda el .md (sin commit: lo hace el flujo de siempre).'),
  ], [R(fichero, vsc(ruta)), R('Método: DATA/REVISION_SEMANAL.md (GitHub)', GH + 'DATA/REVISION_SEMANAL.md')],
  `${fichero} con las 10 métricas rellenas (o «sin dato») + las 4 decisiones escritas`,
  { planB: 'Si el script falla (sin red / Supabase caído): copia la plantilla de DATA/REVISION_SEMANAL.md y rellénala a mano en los mismos 30′.',
    aviso: primera ? 'Primera revisión con plan (S01). El fichero no existe hasta que corres el comando del paso 1.' : undefined });
}
