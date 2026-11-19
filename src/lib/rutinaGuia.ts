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
 *   sáb 14:00 REVISIÓN SEMANAL        guiaRevisionDe      · 30′ con el fichero S<NN>_<sábado>.md (v6.07: 14:00 en F1 y la transición; 07:15 en el resto)
 *   sáb 13:30 SYNAPSE A/B/C           guiaSynapseDe       · 30′ (v6.07; en F2/F3 a las 15:00) — hasta v6.06 iba dentro del PC del sábado 15:00
 *   dom SHIP del vibecoding (PC)      guiaShipDe          · 120′ flexible, sin hora fija (v6.07; hasta v6.06 sáb 15:00 con el SYNAPSE A/B/C)
 *   dom FEYNMAN (opcional)            guiaFeynmanDe       · 10′ flexible
 * Hecho A MANO (no es un .ts generado): REGLAS para todos los días de cada plan (lee las filas de los .ts generados, que NO cambian) +
 * CURADURÍA de la semana 1 (v6.02: lun 19 → dom 25-oct-2026; v6.05: lun 26-oct → dom 1-nov; v6.06: lun 2 → dom 8-nov; desde v6.03 la curaduría va por PASO / PIEZA / FILA del plan y no por fecha, así
 * sigue al plan cuando corre — ver vibeS1(k), SYN_CUR_PIEZAS, BIZ_TRAMO y LIV_LECT) y de los recursos con URL verificada el dom 18-oct-2026 (YouTube: título, canal y
 * duración leídos de la página del vídeo · PubMed/PMC por E-utilities · secciones y nº de palabras de Schwartz 2017 leídos de PMC ·
 * Apple Podcasts lookup). Lo que no se pudo verificar se dice («sin medir», «A VERIFICAR»); no hay páginas inventadas.
 * Verificación: node DATA/_scripts/check_rutina_guia.js (Σ pasos = franja en TODOS los días de los 7 planes · URLs con esquema válido).
 * v6.05 (fix 24-oct, verificación adversarial): synFranjaDe → 13:00 los días con el ENCAPS 11:00-13:00 de F2 (SIM_F2_11 · D2_ENCAPS, exportados
 * para plantillasV6) · guiaAurumDe(iso, ini?) en F4 = 30′ en el tiempo muerto del turno tras el R↔D (ventanaAurumF4; antes 14:15 fijo) ·
 * guiaShipDe nombra TODAS las piezas PC del sábado (sáb 20-feb: S16 30′ + S17 0′) · comodines curados del SYNAPSE: si su 1.er sábado está
 * ocupado, el siguiente libre (deep dive + trifecta → sáb 7-nov, retomando donde quedó cada pieza).
 * v6.06 (31-oct-2026 · D1 = lun 2-nov): sin fechas nuevas en el código — todo sigue saliendo de los planes regenerados (+5 hábiles). Cambia: (1)
 * bizFranjaDe trata el SIM 100Q de las 11:00 de F2 (SIM_F2_11) como un NBME de F1 para el OUTPUT del viernes: con el D1 en el lun 2-nov Business
 * llega al mar 2-mar y el SIM #7 (vie 26-feb, 11:00-13:00 → SYNAPSE 13:00-13:30) cae en viernes de OUTPUT → el OUTPUT entero va al sábado
 * 09:15-09:55 (F2; antes de la v6.06 Business terminaba antes del 1.er SIM de las 11:00); (2) UWSA1 lun 2-nov 07:25 · NBME vie 13-nov · vie 4-dic
 * · vie 18-dic · mié 30-dic a las 13:00 · comodines: sáb 7-nov = No Priors + Willison, sáb 14-nov = deep dive + trifecta · AURUM D124-D130 (lun 3 →
 * mar 11-may-2027) en el tiempo muerto del SERUMS · SYNAPSE (mar 16-mar) y vibecoding (mar 16 → vie 19-mar) siguen en F3 tras el ENCAPS.
 * v6.06 (fix 31-oct-2026): guiaAurumDe avisa (1.er aviso) cuando AURUM cae en un día de HITO USMLE de F1/F3 (hitoUsmleDe: nombre y franja del `sub`
 * de la fila 🎯): el hito es por la mañana y AURUM va a su hora, tras el hito — sin mover la fecha. Caso que lo motivó: D35 = PITCH v2 el vie 18-dic,
 * día del NBME 27 (07:00-12:30) y del CHECKPOINT DEL AÑO de ENCAPS (16:15, encapsGuia), los tres nombrados. Control en check_rutina_guia.js.
 * v6.07 (dom 8-nov-2026 · D1 = lun 9-nov · orden de Joseph: «sábados 14-17 libres para el en vivo de Theomed; domingos flexibles»): el SÁBADO de F1 y
 * de la transición (sabadoTheomed) = 13:30 SYNAPSE A/B/C (guiaSynapseDe, ya no dentro del PC) · 14:00 REVISIÓN SEMANAL (guiaRevisionDe; antes 07:15) ·
 * 14:30 cierre Business (bizFranjaDe; antes 07:45; un OUTPUT entero de 40′ va a las 17:15, tras la clase) · 14:45-15:00 preparar la clase y 15:00-17:00
 * THEOMED EN VIVO (encapsManana) · 19:00 Anki. El PC (SHIP del vibecoding · avance · PC del taper) pasa al DOMINGO, flexible y sin hora fija
 * (guiaShipDe lee vibePCDomingo; su franja es solo un ejemplo: v6.08 14:45-16:45, o 07:25 si el ENCAPS del domingo ocupa la tarde —shipEjemploIni—;
 * hasta v6.07 15:00-17:00), con el Feynman (guiaFeynmanDe, ejemplo 10′ antes del SHIP; hasta v6.07 14:50-15:00). En F2 el sábado
 * conserva la revisión 07:15 y el Business 09:15 (decisión abierta de Joseph para los sábados de 2027) y su SYNAPSE A/B/C va a las 15:00 (donde
 * estaba dentro del PC).
 * v6.07 (fix 8-nov-2026 · QUINCENA FINAL del ENCAPS, lun 1 → vie 5-mar-2027): SIM_F2_11 = los 2 últimos SIM del núcleo (nucleo_hasta − 7 · nucleo_hasta)
 * + los 3 SIM de la quincena (SIM_QUINCENA_F2), = las filas sim100 con extra.sim.hora '11:00' del SQL de la intensiva; se exporta también
 * REPASO_QUINCENA_F2 para plantillasV6. La quincena sale de quincenaF2De = la REGLA del generador copiada tal cual (gen_encaps_intensivo_2027.js
 * QUINCENA / QUINCENA_SIMS: L-V fuera de SKIP con f > nucleo_hasta, f ≥ examen − 13 y f < D-5; SIM = lun · mié · vie + último hábil de cada
 * semana; repaso = el resto), no de nucleo_hasta + 3/5/7 (eso solo valía con el examen del 14-mar y el núcleo hasta el 26-feb). Con ello synFranjaDe
 * pone el SYNAPSE a 13:00-13:30 esos 5 días (antes 12:30 en lun 1 · mié 3 · vie 5-mar, solapado con el SIM real de las 11:00) y bizFranjaDe saca a
 * Business de 13:00: en un día con el ENCAPS 11:00-13:00 que no es viernes de OUTPUT (lun 1 · mié 3-mar = lectura L) va a 14:45-15:10
 * (BIZ_ENCAPS_11: la media hora que AURUM deja libre en F2 antes del MIR 15:15); el OUTPUT del viernes con el SIM 11:00 (vie 19 · 26-feb · 5-mar) va
 * entero al sábado (outputEnteroAlSabado: NBME o viernes con el SIM 11:00) y, si ese sábado tiene el CARRIL SÁBADO ENCAPS (09:30-10:30, la hora del
 * SQL: manda el SQL), va al terminar el carril: 10:30-11:10 (sáb 20 · 27-feb · 6-mar). CIERRE de la semana (bizCierreDe): si el sábado es PROTEGIDO
 * o SKIP (sáb 13-mar = D-1 ENCAPS, OUTPUT D120 lun 8 · D121 mar 9-mar) va al primer día hábil tras el último OUTPUT con hueco a las 13:00 antes del
 * protegido (mié 10-mar 13:00-13:30) y guiaBusinessDe(protegido) = null. Control: check_rutina_guia.js (SQL ↔ SIM_F2_11 · quincena · 0 solapes
 * Business ⟂ SYNAPSE · Business ⟂ carril SÁBADO · ningún Business en un día protegido).
 *
 * Decisiones de carga (v6.02c, E5 — escritas también en los avisos de cada bloque):
 *  · BUSINESS no tenía franja ni aparecía en el Home: va a 13:00-13:25 (L-V), la franja «LECTURA DE LIBRO 13:00-13:15» del Calendar (cuya
 *    descripción ya dice «el libro del nivel en curso — Biblioteca del Fundador», que es justo lo que lee Business) + 10′ del hueco 13:15-13:30
 *    (la siesta opcional ≤20′ sigue siendo la válvula ÁMBAR: en ÁMBAR Business baja a 13:00-13:15). El OUTPUT del viernes (40′) = 25′ el
 *    viernes + 15′ el sábado 07:45-08:00, tras la revisión semanal (el tracker semanal de sueño/ejercicio/comida se llena mejor con la semana
 *    cerrada). Días de hito USMLE: UWSA1 (v6.06: lun 2-nov · v6.05: lun 26-oct · v6.03: mié 21-oct · v6.02: lun 19-oct; almuerzo 13:00-13:30) = solo audio durante el almuerzo · NBME (almuerzo 12:30-13:00,
 *    SYNAPSE 13:00) = audio 12:30-12:55 y, si es viernes de OUTPUT, el OUTPUT entero pasa al sábado 07:45-08:25 (v6.06: NBME 25-27 en VIERNES de OUTPUT —vie 13-nov · vie 4-dic · vie 18-dic— → esos 3 OUTPUT van enteros al sábado 07:45-08:25, y en F2 el del SIM #7 de las 11:00 —vie 26-feb— al sábado 09:15-09:55 · v6.05: los NBME 25-27 caen en VIERNES de OUTPUT —vie 6-nov · vie 27-nov · vie 18-dic— → esos 3 OUTPUT van enteros al sábado 07:45-08:25; v6.03: los NBME de F1 caían en martes y miércoles: ningún viernes de OUTPUT coincidía). (Calendar ya alineado el 18-oct, CAL_V6 §12) El Calendar seguía con
 *    «LECTURA DE LIBRO 13:00-13:15»: que lo amplíe a 13:25 lo decide el orquestador / Joseph.
 *  · SYNAPSE en días de hito: el día del UWSA1 (v6.06: lun 2-nov · v6.05: lun 26-oct · v6.03: mié 21-oct · v6.02: lun 19-oct) 07:25-07:55, entre las 2 partes de la preparación del hito (USMLE 07:15-07:25 y 07:55-08:50;
 *    v6.02c F2: una sola vez, en su tarjeta propia — la guía USMLE ya no lo repite) · NBME 13:00-13:30.
 *  · AURUM (60′ en F1): 1′ arranque + vídeo A + drill + la LECTURA L en los minutos que sobran de la hora (el plan la ponía «en huecos de
 *    viaje», que en la práctica no existen) + 2′ cierre; lo que de L no cabe queda como lectura de huecos (no es núcleo). Si sobra tiempo tras
 *    L: 2.ª toma del drill. Desde el 4-ene (min30, DJ-4): 30′ = arranque + vídeo (≤8′) + drill (el resto); lo demás es opcional.
 *  · Ritmo «desde cero con el inglés»: lectura en inglés a 100 palabras/min · vídeos a 1,0× con subtítulos en inglés (CC); en AURUM y Business
 *    (que no son inglés-objetivo) se permite la auto-traducción al español si se pierde el hilo.
 * v6.08 (sáb 14-nov-2026 · D1 = lun 16-nov · lote B2): sin fechas nuevas en el código salvo las reglas de abajo; todo sale de los planes regenerados
 *  (+5 hábiles: Business → vie 19-mar sin los PROTEGIDOS ni el D-2 · LIVIANO → vie 2-abr, alargado al 16.º viernes · vibecoding → mar 6-abr · SYNAPSE
 *  → jue 1-abr · AURUM → mar 25-may). (1) SÁBADOS DE F2 con el horario real (gimnasio 08:30-14:00 · Theomed en vivo 15:00-17:00 · baile 17:00-20:00):
 *  cierre Business 07:45 tras la revisión de las 07:15 (bizSabIni; antes 09:15) y SYNAPSE A/B/C 21:00 (synFranjaDe; antes 15:00); el STEP 1 VIVO pasa a
 *  04:15-05:45 en plantillasV6. Un cierre de sábado que no termine a las 08:25 va a las 14:00 (bizCierreDe; v6.08: sáb 20-mar, F3). (2) AURUM en un día
 *  de HITO de F4 (D129 lun 24-may = NBME 30, hitoUsmleF4De): con el bloque sin hora (plantilla H, turno T o sin marcar) la guía va TRAS el hito, en el
 *  tiempo muerto de la posta después del R↔D (14:00-14:30; antes 07:30, dentro del hito) y lleva el aviso del hito, como en F1/F3; no alarga el plan.
 * v6.09 (lun 16-nov-2026 · D1 = mar 17-nov · Joseph: «hoy no avancé, todo empieza mañana; el sábado 21 y el domingo 22 viajo, déjalos libres»): los
 *  planes ya vienen re-fechados (cada frente corre un hábil dentro de F1 y el jue 31-dic recupera el día; desde el lun 4-ene todo igual que la v6.08).
 *  Aquí, el FIN DE SEMANA DE VIAJE (sábado sin sesión de corrida_s1 dentro del plan: sabadoLibre): (1) sin revisión semanal ese sábado → la S01 va
 *  JUNTO con la S02 el sáb 28-nov, en los mismos 30′ (guiaRevisionDe: revisionesJuntasDe); (2) sin cierre de Business ese sábado → la fila del tracker
 *  de esa semana (sin OUTPUT: el OUTPUT S1 va el lun 23, tras su última lectura del vie 20) se llena el sáb 28 con el cierre del OUTPUT S1 (bizCierreDe ·
 *  soloTracker: 10′ + 15′ = 25′ con la clase en vivo → 07:45-08:10, antes del gimnasio: la regla de un cierre > 15′ con clase pasa de 17:15 —dentro del
 *  baile 17:00-20:00— a 07:45, y nunca a las 14:00); (3) el SHIP S1 es el dom 29 (vibecodingPlan) y ese domingo el SYNAPSE recupera una A-unit + las
 *  piezas del lunes de la sem 1 (gen_synapse_plan.js › DOM_RECUPERA): guiaShipDe las suma al PC, SIN restarle minutos al SHIP (el domingo es flexible).
 *  Nada el sáb 21 ni el dom 22.
 *  v6.09b (mar 17-nov · auditoría tiempo ↔ material, a2-12/a2-14 · el dom 22 es DOMINGO DE LLEGADA: «el 22 a partir de las 2 de la tarde se puede hacer»):
 *  (1) la revisión S01 del sáb 21 va el dom 22 14:30-15:00, SOLA y en sus 30′ (revisionDomingoDe / revisionSabadoDe; guiaRevisionDe la pinta ese domingo
 *  con --forzar) y el sáb 28 vuelve a ser solo la S02 (revisionesJuntasDe = []; nombra la S01 del domingo y su comando por si no se hizo); (2) el A/B/C
 *  del SYNAPSE que recupera el lun 16 y el sáb 21 pasa del PC del dom 29 al dom 22 16:30-17:00, a hora fija (guiaSynapseDe; guiaShipDe = null ese día) y
 *  el PC del dom 29 vuelve a 2 h (SHIP de ejemplo 14:45-16:45).
 *  v6.09 (rev. adversarial, 16-nov): (a) SYNAPSE: los recursos curados repartidos en varias sesiones avanzan por FECHA (SYN_SERIES, ver su comentario);
 *  (b) Business y LIVIANO: en F1 el OUTPUT / el CASO va el lunes tras su última lectura / lección (los generadores) y los dos días lo avisan; (c) AURUM y
 *  vibecoding: el ciclo de F1 cierra en lunes (se acepta el desfase) y la guía lo dice (cierre de semana de AURUM en lunes · SHIP tras el cierre del
 *  lunes, con plan B que no pisa el cierre del proyecto siguiente); (d) el 1.er día con sesión (mar 17) avisa de que sale como D2 / «día 2».
 * v6.10 (mar 17-nov-2026 · D1 = mié 18-nov; el mar 17 tampoco se estudió): los planes secundarios corren un día y recuperan el mar 17 a HORA FIJA en un
 *  hueco de fin de semana (_fechas_v6.json › corrida_s1.extra: sáb 28-nov vibecoding 05:00 y SYNAPSE 07:15 · dom 29-nov Business 05:00 y MIR 08:15 ·
 *  dom 6-dic Research 05:00, AURUM 07:15 y LIVIANO 08:15). Las guías de esos días se piden en su fecha y a la hora L-V del frente (plantillasV6 ›
 *  bloqueCorrido + moverGuia las llevan a la real) y su aviso nombra la hora real (franjaExtraDe); la sesión de recuperación del SYNAPSE trae su franja
 *  (guiaSynapseRecDe, SYN_REC_F1). SYNAPSE: el aviso «Primera sesión» (mié 18 = día 3) nombra los 2 días sin sesión y la auditoría F0 del sáb 28 ·
 *  Business: BIZ_TRAMO_F1 re-fechado (Why We Sleep: TED vie 27 · clip del apetito dom 29), viernes de F1 sin OUTPUT lo avisan, bizFranjaDe del dom 29 ·
 *  vibecoding/SHIP: S1 cierra el mar 24 (plan B del SHIP S1 al mar 1-dic, como en la v6.09) · AURUM: el destino de la L dentro de los 230 primeros
 *  caracteres del aviso · LIVIANO: casos 1 y 2 en MARTES (los viernes lo avisan).
 * v6.10 · tanda C (mar 17-nov-2026 · contenidos decididos con Joseph en los chats de dominio): SYNAPSE — la auditoría F0 abre la 1.ª sesión (mié 18,
 *  12:30, 3′ con su texto exacto; la A queda en 12′) y sale del sáb 28 07:15 (su A = 15′ de la siguiente lección de F0 sin ✓; v6.10c FIX r1: la sesión
 *  va el dom 3-ene 05:00 y su A = 15′ medidos de «Interpretability…», min 15:00-37:30 a 1,5×: el 3-ene ya no queda lección de F0); regla de cualquier día
 *  SYNAPSE en el «hecho» (SYN_REGLA_NOTAS: Anki · Obsidian · GoodNotes nada fijo) · AURUM — «To Sell Is Human» no se presta en Archive.org (solo a
 *  lectores con discapacidad visual; API de préstamos, 17-nov): las L de Pink de F1 van EN VÍDEO con tramos medidos (AURUM_F1_LVID; D1 con el texto que
 *  Joseph recibió en el chat AURUM).
 * v6.10c (mar 17-nov-2026 · tanda 2, decisión de Joseph de las 17:20: el día que sobra se recupera ENTERO el sáb 2-ene; corrimiento literal, sin recuperación
 *  por partes): cada frente corre un hábil hasta el jue 31-dic y su última sesión de F1 va el sáb 2-ene a hora fija (vibecoding 04:15 · MIR 07:15 · AURUM
 *  14:30 · Research 15:30 · LIVIANO 16:15 · Business 21:30); la sesión de recuperación del SYNAPSE, el dom 3-ene 05:00 (cadena del carril del martes) ·
 *  bizFranjaDe también en sábado con Business a hora fija · aurumF1 no usa el sábado que recupera como sábado de «L» (lo del 28-dic → 2-ene, adelantado al
 *  sáb 26) · avisos «a hora fija» con la hora real (AURUM: horaTrasMover, porque el 14:30 cae dentro de su franja de plan) · BIZ_TRAMO_F1 re-fechado.
 */
import type { GuiaBloque, GuiaPaso, GuiaRecurso } from './guia';
import { minutosFranja } from './guia';
import {
  VIBE_META, VIBE_DIAS, vibeDiaDe, vibeProyectoDe, vibeTaperDe, vibePCDomingo, vibeJournalPath, vibeJournalUrl, vibeSemanaISO, VIBE_TIPO_LABEL,
  VIBE_FASES_BC, vibeFaseBCDe, // v6.10 · base cero: fases PRIMM del vibecoding
} from './vibecodingPlan';
import type { DiaVibe, VibeProyecto } from './vibecodingPlan';
import { SYN_DIAS, SYN_PLAN_META, synDiaDe, synColaDe, SYN_COLA_POST_STEP1, synRecDe, SYN_REC_F1, SYN_FASES_BC, synFaseBCDe } from './synapseDailyPlan'; // v6.09b lote 1-ter: + la cola del SYNAPSE de F1 con franja real · v6.10: + la sesión de recuperación (sáb 28-nov 07:15)
import type { SynBloque } from './synapseDailyPlan';
import { AURUM_DIAS, aurumDiaDe, aurumObsUrl } from './aurumDailyPlan';
import type { DiaAurum, AurumBloque } from './aurumDailyPlan';
import { LIV_DIAS, livDiaDe } from './livianoStudyPlan';
import type { DiaLiviano } from './livianoStudyPlan';
import { livCasoDeDia, livCardsDeDia, livCardsSemanaPrevia, livDrillDe, livAnkiDeck } from './livianoCasos';
import { BIZ_DIAS, bizDiaDe, bizModo } from './businessStudyPlan';
import type { DiaBiz } from './businessStudyPlan';
import { DIAS as USMLE_DIAS, DIAS_T2 as USMLE_DIAS_T2, esHito, FRANJAS_F4 } from './usmleStep1Daily';
import { guiaUsmleDe } from './usmleGuia'; // remate v6.10j: la eval 10Q del DAY-AFTER 6/6 en la métrica 1 de la revisión
import { theomedSabadoDe, guiaEncapsDomingoDe, encapsRecuperaDe, encapsMananaDe, encapsDomingoDe } from './encapsManana'; // v6.08 (rev. dia5/dia7): clase en vivo del sábado (aviso del SYNAPSE) · franja de ejemplo del ENCAPS del domingo (ejemplo del SHIP)
import { guiaEncapsDe, encapsSabadoDe, sesionEncapsDe, encapsF2De, ENCAPS_F2_FECHAS } from './encapsGuia'; // v6.10: + sesionEncapsDe (runners ENCAPS por generar de la semana 2, en la revisión S01) // v6.06 (fix): AURUM en día de hito USMLE avisa del CHECKPOINT ENCAPS de esa tarde · v6.07 (fix): el cierre Business del sábado F2 va tras el CARRIL SÁBADO ENCAPS (09:30-10:30, hora del SQL)
import { FECHAS_V6, DERIVADOS_V6, SKIP_V6, faseV6, ultimoHabilAntes, fechaRealDe, motivoProtegido, corridaS1De, extraCorridaDe } from './fechasV6'; // v6.10: + extraCorridaDe (bloques de fin de semana que recuperan el mar 17)

// ─────────────────────────────────────────── utilidades ───────────────────────────────────────────
const PPM_EN = 100;                       // palabras/min leyendo en inglés (nivel de arranque)
const aMin = (h: string): number => { const [a, b] = h.split(':'); return Number(a) * 60 + Number(b); };
const aHHMM = (m: number): string => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const franjaDesde = (ini: string, min: number): string => `${ini}–${aHHMM(aMin(ini) + min)}`;
const dow = (iso: string): number => new Date(iso + 'T12:00:00Z').getUTCDay();
/** v6.10d (fix revisión 18-nov): nombre del día REAL en que se hace la fecha de PLAN `iso` del frente (alias de corrida_s1: el plan del vie 20-nov se hace el
 *  lun 23) — los «Hoy <día>» de los avisos nombran el día real, no el de la semana del plan. Sin alias = el día de `iso`. */
const DIA_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const diaRealNom = (iso: string, frente: string): string => DIA_LARGO[dow(fechaRealDe(iso, frente))] as string;
const addDias = (iso: string, n: number): string => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const WD_C = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES_C = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
/** «mié 21-oct» (v6.03: los textos de la semana 1 citan días calculados del plan, no fijos). */
const fCorta = (iso: string): string => `${WD_C[dow(iso)]} ${Number(iso.slice(8, 10))}-${MES_C[Number(iso.slice(5, 7)) - 1]}`;
/** Siguiente día de la semana `wd` (0 = dom … 6 = sáb) estrictamente posterior a `iso`. */
const siguienteDow = (iso: string, wd: number): string => addDias(iso, ((wd - dow(iso) + 6) % 7) + 1);
/** v6.07: sábado de F1 o de la transición = sábado con la clase EN VIVO de Theomed 15:00-17:00 (14:00 revisión · 14:30 Business · 13:30 SYNAPSE).
 *  En F2+ el sábado sigue como estaba (07:15 revisión · F2 09:15 Business) hasta que Joseph decida los sábados de 2027. */
export const sabadoTheomed = (iso: string): boolean => dow(iso) === 6 && iso >= FECHAS_V6.f1.inicio && iso <= FECHAS_V6.transicion.hasta;
/** v6.07: hora de inicio de la REVISIÓN SEMANAL del sábado `iso` (14:00 con la clase en vivo · 07:15 en el resto). */
export const revisionIniDe = (iso: string): string => (sabadoTheomed(iso) ? '14:00' : '07:15');
/** v6.09 (16-nov-2026): SÁBADO SIN SESIÓN dentro del plan (corrida_s1.sin_sesion ≥ D1: sáb 21-nov, viaje) → sin revisión ni cierre de Business ese día;
 *  lo suyo va al sábado siguiente con sesión (revisionesJuntasDe · bizOutputsDeSemana). Los sábados sin sesión ANTERIORES al D1 no cuentan. */
export const sabadoLibre = (iso: string): boolean => dow(iso) === 6 && iso > FECHAS_V6.f1.inicio && corridaS1De(iso)?.tipo === 'sin_sesion';
/** v6.10d (18-nov-2026): fecha de PLAN cuyo plan se PERDIÓ (sin sesión y sin alias que la haga otro día real). Con la v6.10d el mié 18-nov es sin sesión
 *  para el día real pero su plan se hace el jue 19 (alias): no es un día perdido del plan (los avisos «Primera sesión / Primera lectura» no lo cuentan). */
const _ALIAS_PLAN = new Set<string>(Object.values(FECHAS_V6.corrida_s1.alias));
const perdidoDelPlan = (f: string): boolean => corridaS1De(f)?.tipo === 'sin_sesion' && !_ALIAS_PLAN.has(f);
/** v6.10j (rev. c14, 18-nov-2026 noche): fecha REAL de la revisión del sábado `sab` (su domingo de llegada si el sábado fue sin sesión: dom 22-nov) y si
 *  la hubo (no en un sábado PROTEGIDO —sáb 13-mar, D-1 ENCAPS: la plantilla no la pinta— ni en uno sin sesión y sin domingo de llegada, que va junto con
 *  el siguiente). */
const revisionRealDe = (sab: string): string => (sabadoLibre(sab) ? (revisionDomingoDe(sab)?.domingo ?? sab) : sab);
const huboRevisionEl = (sab: string): boolean => sab > FECHAS_V6.f1.inicio && !motivoProtegido(sab) && (!sabadoLibre(sab) || !!revisionDomingoDe(sab));
/** v6.10j: ventana REAL [desde, hasta) que mide la revisión del sábado `sab`: desde la revisión anterior que SÍ se hizo (lo de ese día va después de ella: el
 *  carril ENCAPS del sábado de F2 a las 14:00, la clase en vivo de Theomed) hasta la de hoy, sin incluirla. Con el alias de corrida_s1 lo de un viernes de
 *  PLAN se hace el lunes real siguiente: cuenta donde cae el día real. La del sáb 20-mar recoge también la semana del sáb 13-mar (sin revisión: D-1). */
function ventanaRevision(sab: string): [string, string] {
  let x = addDias(sab, -7);
  for (let i = 0; i < 8 && x > FECHAS_V6.f1.inicio && !huboRevisionEl(x); i++) x = addDias(x, -7);
  return [x > FECHAS_V6.f1.inicio ? revisionRealDe(x) : FECHAS_V6.f1.inicio, revisionRealDe(sab)];
}
/** v6.10j: SIM 100Q de la intensiva por orden (#1 = el primero tras el pre-test; = sim.num de _encaps_intensivo_2027.sql, check_rutina_guia lo compara). */
const SIM100_F2: string[] = ENCAPS_F2_FECHAS.filter((f) => encapsF2De(f)?.tipo === 'sim100').sort();
/** v6.10j (rev. c14: la S07 decía «sin mini-sim ni SIM» con el simulacro de cierre del jue 31-dic; la S16 contaba 1 SIM de 3 y 1 mini-sim de 2; la S05 no
 *  nombraba el simulacro con RANKING del dom 13-dic): TODO lo que la métrica 4 ENCAPS mide en la ventana de la revisión, con su día (fechas de PLAN: la guía las
 *  pinta con su día real) — F1: pre-tests de arranque y mini-sims /25 de las 16:15, el SIMULACRO DE CIERRE DE AÑO (mañana fase «cierre») y los simulacros del
 *  domingo (con o sin RANKING; los opcionales, «si lo hiciste») · F2: el PRE-TEST 100Q, los SIM 100Q #n, el DRESS REHEARSAL, los mini-sims /25 del carril B
 *  (reposición F1) y del carril del sábado · el EXAMEN. `proxima` = mini-sims de la semana de plan que se hacen DESPUÉS de la revisión (alias). */
export function encapsRevDe(sab: string): { items: string[]; proxima: string[]; fechas: string[] } {
  const [a, b] = ventanaRevision(sab);
  const ev: [string, string][] = [], proxima: string[] = [];
  const enV = (real: string): boolean => real >= a && real < b;
  const pre: { p: string; parte: number; de: number; n: number }[] = [];
  for (let p = addDias(a, -10); p < addDias(b, 4); p = addDias(p, 1)) { // F1: fechas de PLAN (el alias las lleva a su día real)
    const real = fechaRealDe(p), s = sesionEncapsDe(p), m = encapsMananaDe(p);
    if (!enV(real)) { if (s?.tipo === 'minisim' && p < sab && p > addDias(sab, -7) && real >= b) proxima.push(`el mini-sim del ${fCorta(p)}`); continue; }
    if (s?.tipo === 'pretest' && s.pretest) pre.push({ p, parte: s.pretest.parte, de: s.pretest.de, n: s.pretest.n });
    if (s?.tipo === 'minisim') ev.push([real, `mini-sim /25 del ${fCorta(p)} (${ordenMiniSimF1(p)}${s.dia === 23 ? ', CHECKPOINT' : ''})`]);
    if (m?.fase === 'cierre') { const src = /\(([^()]+)\)/.exec(m.banqueo.area)?.[1]; ev.push([real, `SIMULACRO DE CIERRE DE AÑO 100Q del ${fCorta(p)} (${src ? `${src}, ` : ''}nota = aciertos × 0,2)`]); }
  }
  if (pre.length) ev.push([fechaRealDe(pre[0]!.p), `pre-test de arranque ${pre.map((x) => `${x.parte}/${x.de}`).join(' y ')} (${pre[0]!.n}Q${pre.length > 1 ? ' c/u' : ''}) del ${pre.map((x) => fCorta(x.p)).join(' y ')}`]);
  for (let x = a; x < b; x = addDias(x, 1)) { // domingos, F2 y el examen: fecha real = fecha de plan
    const d = encapsDomingoDe(x), f2 = encapsF2De(x), sb = encapsSabadoDe(x);
    if (d && /simulacro/.test(d.modo)) { const opc = d.modo === 'simulacro'; ev.push([x, `simulacro 100Q${opc ? ' opcional' : ''}${d.ranking ? ' con RANKING' : ''} del ${fCorta(x)} (${opc ? 'si lo hiciste, ' : ''}nota = aciertos × 0,2)`]); }
    if (f2?.tipo === 'pretest') ev.push([x, `PRE-TEST 100Q del ${fCorta(x)} (examen 2026-II, /100)`]);
    if (f2?.tipo === 'sim100') ev.push([x, `SIM #${SIM100_F2.indexOf(x) + 1} 100Q del ${fCorta(x)} (/100)`]);
    // remate v6.10j (revisión adversarial, verdad #4b): el examen ENCAPS (y su DRESS en D-2) sigue con fecha PROVISIONAL hasta la convocatoria → se dice
    const prov = FECHAS_V6.encaps.provisional ? ', fecha provisional' : '';
    if (f2?.tipo === 'dress_rehearsal') ev.push([x, `DRESS REHEARSAL 100Q del ${fCorta(x)} (/100${prov})`]);
    if (f2?.carrilB?.pendiente === 'mini_sim') ev.push([x, `mini-sim /25 del ${fCorta(x)} (carril B, reposición F1)`]);
    if (sb?.tipo === 'mini_sim') ev.push([x, `mini-sim /25 del ${fCorta(x)} (carril del sábado)`]);
    if (x === FECHAS_V6.encaps.examen) ev.push([x, `EXAMEN ENCAPS del ${fCorta(x)} (${prov ? 'fecha provisional: la de la convocatoria; ' : ''}nota y puesto cuando salgan)`]);
  }
  ev.sort((u, v) => (u[0] < v[0] ? -1 : u[0] > v[0] ? 1 : 0));
  // fechas REALES de cada cosa medida (los pre-tests de arranque, una a una): check_rutina_guia comprueba que cada una entra en UNA sola revisión
  return { items: ev.map((e) => e[1]), proxima, fechas: [...ev.filter((e) => !/^pre-test de arranque/.test(e[1])).map((e) => e[0]), ...pre.map((x) => fechaRealDe(x.p))].sort() };
}
/** v6.10j: lo que la métrica 1 USMLE mide en la ventana de la revisión, según el plan de esa semana (no la plantilla genérica del tramo 2): F1 en nivel 0-1
 *  (bloques de 5Q en Tutor + gate de 10 consecutivas; sin pre-test /10 ni eval) · F2 con el Step 1 en PAUSA (el STEP 1 VIVO de ese sábado, 04:15) · F3+
 *  (pre-test /10 · consolidación · eval) · el hito (NBME / UWSA) que cae en la ventana, delante. */
function usmleRevDe(sab: string): string {
  const [a, b] = ventanaRevision(sab);
  const enV = (f: string): boolean => fechaRealDe(f) >= a && fechaRealDe(f) < b;
  // el hito primero: el Calendar corta el «cómo» al final de la cláusula de su fecha (≤ 450) y así se ve
  const out: string[] = [...USMLE_DIAS, ...USMLE_DIAS_T2].filter((x) => esHito(x) && enV(x.fecha)).map((h) => `${hitoDeFila(h)?.nombre ?? 'hito'} del ${fCorta(h.fecha)} (% total y por bloque)`);
  // remate v6.10j (revisión adversarial, verdad #4a): en F1 no hay eval CRONOMETRADA, pero la eval 10Q en Tutor del DAY-AFTER 6/6 (18:00) de un NBME sí da un %
  //   → se nombra con su día (antes «sin pre-test /10 ni eval» dejaba fuera la del lun 28-dic de la S07)
  if (USMLE_DIAS.some((x) => !esHito(x) && enV(x.fecha))) {
    const da = USMLE_DIAS.filter((x) => enV(x.fecha) && guiaUsmleDe(x.fecha).some((g) => /^DAY-AFTER .*6\/6.*eval 10Q/.test(g.titulo))).map((x) => fCorta(x.fecha));
    out.push(`% de lo hecho en Tutor (preguntas a fondo o bloques de 5Q · validación · revalidación) y el gate de 10 consecutivas (nivel 0-1: sin pre-test /10 ni eval cronometrada)${da.length ? ` + eval 10Q Tutor del Day-After del ${da.join(' y ')} (% de las 10 nuevas)` : ''}`);
  }
  if (faseV6(sab) === 'F2') out.push('STEP 1 VIVO de hoy (20Q timed mezcladas, %: el Step 1 está en pausa)');
  if (USMLE_DIAS_T2.some((x) => !esHito(x) && enV(x.fecha))) out.push('pre-test /10, consolidación % y eval');
  return out.join(' + ') || 'sin sesión de Step 1 esta semana (pausa: solo Anki)';
}
/** v6.10i: ¿el ENCAPS de la fecha de PLAN `f` es un mini-sim de F1? · su orden en F1 («3/5»), como lo titula la guía de las 16:15. */
const esMiniSimF1 = (f: string): boolean => sesionEncapsDe(f)?.tipo === 'minisim';
const ordenMiniSimF1 = (f: string): string => {
  const ms: string[] = []; for (let x = FECHAS_V6.f1.inicio; x <= FECHAS_V6.f1.fin; x = addDias(x, 1)) if (esMiniSimF1(x)) ms.push(x);
  return `${ms.indexOf(f) + 1}/${ms.length}`;
};
/** v6.09: siguiente sábado CON sesión estrictamente posterior a `sab`. */
const sabadoConSesionTras = (sab: string): string => { let x = addDias(sab, 7); for (let i = 0; i < 8 && sabadoLibre(x); i++) x = addDias(x, 7); return x; };
/** v6.07: inicio del cierre de Business del sábado `sab` (tras la revisión): 14:30 con la clase en vivo · resto 07:45 (tras la revisión de las 07:15).
 *  v6.08 (14-nov-2026): en F2 también 07:45 (antes 09:15, tras el STEP 1 VIVO 07:45-09:15: los dos caían dentro del gimnasio 08:30-14:00; el STEP 1
 *  VIVO pasa a 04:15-05:45 en plantillasV6). Un cierre que no termine a las 08:25 va a las 14:00, tras el gimnasio (bizCierreDe). */
const bizSabIni = (sab: string): string => (sabadoTheomed(sab) ? '14:30' : '07:45');
/** v6.08 (14-nov-2026): fin de la ventana de estudio de la mañana del SÁBADO real de Joseph (gimnasio 08:30-14:00) y vuelta del gimnasio. */
const SAB_MANANA_FIN = '08:25';
const SAB_TARDE_INI = '14:00';
/** v6.06e: cuándo se cierra el OUTPUT: el sábado de plan, o su domingo real si ese sábado se corrió (la fecha de plan la traduce fechasRealesEnTexto).
 *  v6.07: la hora del sábado sale de bizSabIni (14:30 en F1). */
/*  v6.07 (fix H5): si el sábado es PROTEGIDO o SKIP, el cierre va al día hábil que da bizCierreDe («el mié 10-mar 13:00»); la hora del sábado sale
 *  de bizCierreDe (tras el carril SÁBADO ENCAPS si no cabe antes). */
const cierreOutput = (iso: string): string => {
  const sab = addDias(iso, 6 - dow(iso));
  if (sabadoLibre(sab)) { const s2 = sabadoConSesionTras(sab), c2 = bizCierreDe(s2); return `el ${fCorta(s2)} ${c2 ? c2.ini : bizSabIni(s2)} (el ${fCorta(sab)} no hay sesión: se cierra con el OUTPUT de la semana siguiente)`; } // v6.09
  const c = bizCierreDe(sab);
  if (c && c.fecha !== sab) return `el ${fCorta(c.fecha)} ${c.ini}`;
  return fechaRealDe(sab, 'business') === sab ? `el sábado ${c ? c.ini : bizSabIni(sab)}` : `en el cierre del ${fCorta(sab)}`;
};
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
/** Hito del Step 1 de una fecha (F1): UWSA1 o NBME. v6.08 (rev. est5): también los hitos del tramo 2 en F3 (DIAS_T2; v6.08: NBME 29 mié 17-mar ·
 *  NBME 26 mar 6-abr · NBME 27 mar 27-abr) con la MISMA regla que F1 — SYNAPSE 13:00 tras el almuerzo de 12:30 y el OUTPUT de Business del día ENTERO al
 *  sábado (v6.08: OUTPUT S15 del mié 17-mar → sáb 20-mar con el cierre). Antes solo miraba F1 y el 17-mar salía SYNAPSE 12:30 + OUTPUT 13:00, sin
 *  almuerzo tras 5,5 h de examen. En F4 no: el hito se mueve por turno (hitoUsmleF4De). */
function hitoDe(iso: string): { nbme: boolean; uwsa: boolean } | null {
  const h = USMLE_DIAS.find((x) => x.fecha === iso && esHito(x)) ?? (faseV6(iso) === 'F3' ? USMLE_DIAS_T2.find((x) => x.fecha === iso && esHito(x)) : undefined);
  if (!h) return null;
  const uwsa = /Self-Assessment 1|UWSA1/.test(h.uw);
  return { uwsa, nbme: !uwsa && /NBME/.test(h.uw) };
}
/** v6.06 (fix 31-oct-2026): hito USMLE del día en F1 o F3 (filas 🎯 de DIAS + DIAS_T2) con su nombre y su franja, leídos del `sub` de la fila
 *  («🎯 NBME 27 (07:00-12:30) …» → NBME 27 · 07:00-12:30). En F4 el hito se reordena por turno (serumsTurnos): no se usa ahí. Lo usa guiaAurumDe. */
export function hitoUsmleDe(iso: string): { nombre: string; franja: string | null } | null {
  if (faseV6(iso) === 'F4') return null;
  return hitoDeFila([...USMLE_DIAS, ...USMLE_DIAS_T2].find((x) => x.fecha === iso && esHito(x)));
}
/** v6.08 (14-nov-2026): hito NOMINAL del Step 1 en F4 (fila 🎯 de DIAS_T2 en su fecha de plan; el motor de turnos —serumsTurnos.ordenSemanaDe— puede
 *  moverlo a otro día T/L de su ventana si el turno marcado no lo deja). Con el D1 en el lun 16-nov AURUM llega al mar 25-may-2027 y su D129 cae el
 *  lun 24-may, día preferente del NBME 30 (07:00-12:15): lo usa guiaAurumDe para poner la sesión TRAS el hito ese mismo día. */
export function hitoUsmleF4De(iso: string): { nombre: string; franja: string | null; fin: string | null } | null {
  if (faseV6(iso) !== 'F4') return null;
  const h = hitoDeFila(USMLE_DIAS_T2.find((x) => x.fecha === iso && esHito(x)));
  return h ? { ...h, fin: h.franja ? (h.franja.split('-')[1] ?? null) : null } : null;
}
function hitoDeFila(h: { uw: string; sub: string } | undefined): { nombre: string; franja: string | null } | null {
  if (!h) return null;
  const m = /🎯\s*([^(—+]+?)\s*(?:—[^(]*)?\((?:[^)]*?)(\d{2}:\d{2})-(\d{2}:\d{2})\)/.exec(h.sub);
  // El `sub` del UWSA1 conserva el «09:00-13:00» de v5.20, pero la guía lo empieza a las 08:50 (4 × 40Q × 90 s + pausa no caben antes de las 13:00;
  // gen_usmle_guia.js): el aviso usa la hora de la guía.
  const franja = m ? (/UWSA1|Self-Assessment 1/.test(h.uw + h.sub) && m[2] === '09:00' ? `08:50-${m[3]}` : `${m[2]}-${m[3]}`) : null;
  return { nombre: m ? (m[1] as string).trim() : h.uw, franja };
}

// ════════════════════════════════════════ 04:15 · VIBECODING ════════════════════════════════════════
const DOC_N8N_CODE = 'https://docs.n8n.io/build/code-in-n8n/using-the-code-node';
const DOC_N8N_PUBLISH = 'https://docs.n8n.io/build/understand-workflows/save-and-publish-workflows'; // v6.10 (chat Vibe Coding, 17-nov): n8n 2.x, guardar ≠ publicar
const DOC_BEST = 'https://code.claude.com/docs/en/best-practices';
const JOURNAL_CMD = 'node DATA/_scripts/journal_hoy.js --abrir';
/** Semana 1 (S1 · APEX end-to-end): los 35′ de «construir» de cada PASO k (1-5) de S1, partidos en sub-pasos con comandos exactos (ficheros
 *  comprobados en disco el 18-oct). v6.03 (20-oct-2026): la clave es el PASO del proyecto, no la fecha (antes '2026-10-19' … '2026-10-23'): con el
 *  D1 en el mié 21-oct S1 va del mié 21 al mar 27-oct y hace SHIP el sáb 31-oct (el sáb 24 es AVANCE); los días que citan los textos («el día del
 *  paso 1», el del SHIP) salen de VIBE_DIAS / VIBE_PROYECTOS, así siguen al plan si vuelve a correr. Mismo contenido, mismos minutos.
 *  v6.05 (24-oct-2026): D1 = lun 26-oct → S1 = lun 26 → vie 30-oct entera en la semana del D1 y SHIP el sáb 31-oct (sin sábado de avance).
 *  v6.06 (31-oct-2026): D1 = lun 2-nov → S1 = lun 2 → vie 6-nov y SHIP el sáb 7-nov (igual que v6.05, una semana después). */
function vibeS1(k: number): GuiaPaso[] | undefined {
  const dia = (kk: number): string => { const x = VIBE_DIAS.find((y) => y.semana === 1 && y.k === kk); return x ? fCorta(x.fecha) : `paso ${kk}`; };
  const p1 = vibeProyectoDe(1);
  const ship = p1 ? `el SHIP del ${fCorta(p1.ship)}` : 'el SHIP del domingo'; // v6.07a: el SHIP es el domingo desde la v6.07 (antes «del sáb dom 15-nov»)
  switch (k) {
    case 1: return [
      // v6.10e (revisión del 18-nov · dias-1920-13): ruta absoluta (`cd /d` falla en PowerShell), como el kit v3 de S1
      P(10, 'Test del parser (predice antes qué protege): `node D:\\agente_estudio\\scripts\\test_parser_multilinea.js`', 'Antes de correrlo escribe: ¿qué protege y por qué en verde NO prueba que n8n funcione? → `node D:\\agente_estudio\\scripts\\test_parser_multilinea.js` (vale en PowerShell y en cmd) → «0 failed» (13/13). Si falla, anota el nombre del caso; hoy no se arregla.'),
      P(15, 'Ubicar los 2 nodos ★ en el n8n VIVO («Anki + Obsidian» NO se toca) + backup: el JSON lleva la clave de Supabase → solo a backups\\, nunca a un repo', 'localhost:5678/workflow/APEX-MOTOR-FLOW-V2 → Version History: anota fecha e ID de la versión publicada (la usa el rollback de la próxima sesión) → menú ⋯ › Download → mueve el JSON a D:\\agente_estudio\\backups\\ · es el workflow «Motor APEX — Tarjetas Anki + Obsidian» (8 nodos), no el export viejo n8n_flow_4_destinos.json; el otro workflow, «Anki + Obsidian», NO se toca → copia el código de cada ★ a backups\\live_parsear_tarjeta.js y live_crear_nota.js. Ctrl+F «v2.5.1» en los nodos vivos: NO aparece (= corre el código viejo).', { t: 'n8n · Code node', url: DOC_N8N_CODE }),
      P(10, 'Qué se pega en el paso 2: node_parsear_tarjeta_v2_3.js + node_crear_nota_v2_3.js (NO n8n_parser_v2_3.js: usa require(\'fs\'))', `Hoy: \`certutil -hashfile\` de los 2 ficheros → journal (el ${dia(4)}, paso 4, comparas lo PUBLICADO con ellos) · Claude Code: «compara backups\\live_parsear_tarjeta.js con scripts\\node_parsear_tarjeta_v2_3.js ignorando finales de línea: ¿qué cambia?» → 3 líneas al journal.`),
    ];
    case 2: return [
      P(10, 'Redeploy: node_parsear_tarjeta_v2_3.js → ★ Parsear Tarjeta · node_crear_nota_v2_3.js → ★ Crear Nota Obsidian (NO n8n_parser_v2_3.js)', 'VS Code: Ctrl+A, Ctrl+C del fichero → n8n: doble clic en el nodo → clic en el código → Ctrl+A, Ctrl+V. No toques «Anki + Obsidian» ni los modos (All Items / Each Item). Ctrl+F «v2.5.1» en cada nodo: tiene que aparecer.', { t: 'n8n · Code node', url: DOC_N8N_CODE }),
      P(2, 'PUBLISH → Publish: en n8n 2.x guardar no basta (el atajo usa la versión publicada)', 'Botón Publish (arriba a la derecha) → en la ventana «Publish workflow», Publish otra vez → el botón queda en «Published» (gris). No sale ningún aviso.', { t: 'n8n · Save and publish', url: DOC_N8N_PUBLISH }),
      // v6.10i (auditoría del volcado c12): el Calendar corta el «qué» a 150 y el «cómo» a 110 → el «qué» lleva las marcas de éxito (Parsear acaba en «murmur
      //   LOUDER.)» · anki-ok + ankiNoteId · success + filepath) y el «cómo» EMPIEZA por la carpeta del .txt y la cadena de teclas (en la v6.10h la ruta iba al final
      //   y el corte la quitaba; antes de la v6.10h, la ruta completa con el nombre del fichero llenaba los 110). El nombre del .txt y el PDF de GoodNotes, detrás
      //   (solo en la app) · la [TEST S1] es la 1.ª tarjeta de APEX::USMLE: crea el mazo raíz y ::Cardiology (suspendida); el preset va al cerrar el bloque Step de
      //   las 07:15 (usmleGuia) · v6.10j (rev. c14, vetadas #5): el corte del «cómo» dejaba «… → Ctrl+Shift+A → n8n › …» y se perdía QUÉ ejecución se mira →
      //   «(Ctrl+Shift+A) → n8n › Executions → la 1.ª» va en el «qué» (≤ 150, entero) y el «cómo» empieza por «El verde solo NO basta» (antes al final del «qué»)
      P(13, 'APEX [TEST S1] (Ctrl+Shift+A) → n8n › Executions → la 1.ª: éxito = Parsear acaba en «murmur LOUDER.)» · anki-ok + ankiNoteId · success + filepath', 'El verde NO basta. Copia D:\\JOSEPH\\SYNAPSE_iPad\\2026-11-18_S1_redeploy_n8n\\S1_bloque_APEX_prueba_USMLE.txt (Ctrl+A, Ctrl+C) → Ctrl+Shift+A → n8n › Executions → la 1.ª (hora de ahora): item 1 de Parsear acaba en «murmur LOUDER.)» (= código nuevo) · Anki + Obsidian item 1 = anki-ok + ankiNoteId · Crear Nota item 2 = success + filepath. Anota la ejecución, el ankiNoteId y el filepath. El mismo texto está en el PDF de GoodNotes › S01_APEX. Con Anki cerrado también sale verde: mandan los items, no el color.'), // v6.10l (rev. c15, vetadas #32): el nombre del .txt dentro de la ruta (el corte del «cómo» a 110 dejaba la carpeta sin el fichero)
      P(10, 'Suspender la [TEST S1] (Browse: "TEST S1" -is:suspended → Ctrl+J) · si sale ROJO: capturar y volver a la versión anterior', `Si sale rojo, el ${dia(3)} (paso 3) se corrige primero. Bien → suspende (así el Anki USMLE de las 05:00 sigue con 0 nuevas; APEX::USMLE y ::Cardiology quedan creados y el preset se les pone al cerrar el bloque Step de las 07:15). anki-error → abre Anki y reenvía SOLO el bloque ::ANKI. Rojo (Error en Executions) → nodo + mensaje al journal → Version History → la versión anotada el ${dia(1)} → Actions › Publish version → Publish (la poda de n8n puede borrarla en minutos; si ya no está, pega backups\\live_*.js y publica).`),
    ];
    case 3: return [
      P(10, 'Anki: ¿la [TEST S1] cayó en APEX::USMLE::Cardiology (subdeck, no el mazo raíz)?', `Anki › Browse → \`deck:APEX::USMLE*\` → ordena por «Created»: la [TEST S1] del ${dia(2)} (amarilla = suspendida). Si el ${dia(2)} salió rojo, hoy va primero ese arreglo (fichero → test «0 failed» → repega + Publish → reenvía → suspende).`),
      P(10, 'Vault: ¿la nota cayó en 01_USMLE\\UWorld\\Cardiology\\APEX_creados? (búscala por «TEST S1»)', 'El fichero se llama FECHA_HHMM_03_Valvular_Heart_Disease.md; el «[TEST S1]» va en su título. Compara su carpeta con el filepath de la ejecución.', { t: '◆ Obsidian · 01_USMLE', url: obs('01_USMLE') }),
      P(15, 'Si cayó mal: MAPPING embebido (l. 5) de node_parsear_tarjeta_v2_3.js, no _mapping_slim.json · si cayó bien: leer l. 321/364/417-419', 'Claude Code en D:\\agente_estudio: «¿qué entrada del MAPPING y qué líneas deciden mazo y carpeta para Cardiology + UWorld?» → corrige el fichero (nunca en la UI) → test «0 failed» → repega + Publish → reenvía 1 APEX → suspende la nueva. Si cayó bien: lee las l. 321 (validación), 364 (mazo) y 417-419 (carpeta) y anota 3 líneas.'),
    ];
    case 4: return [
      P(10, 'Anki: Preview de la [TEST S1]: REVERSO completo (3 líneas) + CCSN (la tarjeta no lleva caso ni fisio)', 'Browse → "TEST S1" → Preview (funciona aunque esté suspendida) → captura al journal (criterio 4 del SHIP).'),
      P(5, 'Vault: «Source clinical case» (5 líneas) y «Expanded pathophysiology» (4) completos', 'Abre la nota [TEST S1] en modo lectura → captura.'),
      P(10, 'Lo PUBLICADO = node_parsear_tarjeta_v2_3.js y node_crear_nota_v2_3.js (no n8n_parser_v2_3.js)', 'El botón debe decir «Published» (si dice «Publish», hay cambios sin publicar). Copia el código de cada ★ a un .js temporal fuera del repo → Claude Code: compáralo con su fichero ignorando finales de línea → «idéntico» o la diferencia, al journal.'),
      P(10, 'Escribir DATA/USMLE/_apex_e2e_prueba.json (evidencia; debe contener "noteId")', `Claude Code en D:\\joseph-md-app: noteId (el ankiNoteId de la ejecución buena o Browse › Card Info), subdeck, ruta RELATIVA de la nota (desde 01_USMLE), SHA256 de los 2 ficheros (certutil), "is_test": true y fecha. Nada personal ni rutas absolutas: el repo es público. La [TEST S1] entró en Supabase (apex_blocks / apex_reports) sin is_test y cuenta como APEX real: anótalo en el journal (se marca en el SHIP, con OK).`),
    ];
    case 5: return [
      P(10, 'Commit [S1] en joseph-md-app', '`cd /d D:\\joseph-md-app` → `git add DATA/USMLE/_apex_e2e_prueba.json` (+ la nota del redeploy si la escribiste) → `git commit -m "[S1] APEX end-to-end: redeploy de 2 nodos + evidencia"`. D:\\agente_estudio NO es repo git (init local = decisión tuya).'),
      P(10, 'node DATA/_scripts/verify_vibecoding.js 1', `Desde D:\\joseph-md-app. Esperado hoy: 3/4 (el 4.º es MANUAL: se acepta en ${ship} con --ok-manual 4 tras mirarlo). Anota en el journal qué criterio falla.`),
      P(15, 'Cerrar lo que el verify marque en rojo (no manual)', `Lo que no cierre → ${ship.replace(/^el /, '')} (flexible; nunca a S2) · Test rojo → mira el nombre del caso; sin commit → repite el commit con [S1]; sin fichero → paso 4 (${dia(4)}).`), // v6.09b lote 1-quater (QS · c de R2): el destino, al principio del «cómo» (antes en el carácter 148: el Calendar lo cortaba)
    ];
    default: return undefined;
  }
}
/** v6.10 · BASE CERO (mié 18-nov-2026 · orden de Joseph «todos partimos de cero»; DATA/SYNAPSE/METODO_BASE_CERO.md): S2 y S3 son la FASE 1 del
 *  vibecoding («guiado»), con PRIMM (Sentance, Waite y Kallia 2019: predecir → correr → investigar → modificar → crear) en sus 3 primeros verbos: lo que
 *  estos proyectos piden YA está construido (anki_telemetria.js v2, el KPI de la 1.ª review en CockpitStatusBar, plan_checks APLICADA el 12-sep-2026,
 *  studyProgressSync.ts y el panel «Exportar / Importar progreso»), así que cada paso de 35′ se parte en PREDICE (lo escribes antes) · CORRE (comando
 *  exacto) · INVESTIGA (Claude Code te explica la línea; no se hace commit de lo que no sabes explicar —Willison—). Mismos 35′ por paso y mismas fechas;
 *  el paso 4 termina con un sub-paso de 10′ que se salta si el plan B del SHIP del domingo manda aquí el verify (CONSTRUIR = 25′). */
function vibeDiaTxt(s: number, kk: number): string { const x = VIBE_DIAS.find((y) => y.semana === s && y.k === kk); return x ? fCorta(x.fecha) : `paso ${kk}`; }
/** v6.10 · BASE CERO: línea de FASE del vibecoding (vibecodingPlan › VIBE_FASES_BC) al final del aviso, solo en F1 (hasta el 3-ene; 2027 conserva su texto
 *  y la fase vive en VIBE_FASES_BC): el 1.er día de la fase dice qué cambia; los demás, la fase y su gate (el SHIP del último proyecto con verify 4/4). */
function vibeFaseAvisoDe(iso: string): string {
  if (!textosQSDe(iso)) return '';
  const f = vibeFaseBCDe(iso);
  if (!f) return '';
  const n = VIBE_FASES_BC.length, ult = f.proyectos[f.proyectos.length - 1]!;
  const d = vibeDiaDe(iso);
  return d && d.k === 1 && d.semana === f.proyectos[0]
    ? `Base cero · empieza la fase ${f.id}/${n} del vibecoding: ${f.nombre}. Gate: el SHIP de S${ult} con verify ${ult} → 4/4.`
    : `Base cero · fase ${f.id}/${n} (${f.nombre}) · gate: el SHIP de S${ult} con verify ${ult} → 4/4.`; // sin fechas futuras (control 26j: va al final del aviso)
}
function vibeS2(k: number): GuiaPaso[] | undefined {
  const p = vibeProyectoDe(2);
  const ship = p ? `SHIP S2 del ${fCorta(p.ship)}` : 'SHIP S2 del domingo';
  switch (k) {
    case 1: return [
      P(10, 'PREDICE: due · backlog · revisadas hoy · hora de la 1.ª review de APEX::USMLE (antes de correr nada)', 'Anki → Stats del mazo APEX::USMLE → escribe tus 4 números previstos en el journal. VS Code: lee solo la cabecera de DATA\\_scripts\\anki_telemetria.js (l. 1-35: qué mide, uso, requisitos). AnkiConnect = el add-on 2055492159 que deja a un programa hablar con Anki (localhost:8765).'),
      P(10, 'CORRE: `node DATA/_scripts/anki_telemetria.js` con Anki abierto', 'Terminal → `cd /d D:\\joseph-md-app` → el comando. Copia al journal los 4 números de la salida. «Anki cerrado» = abre Anki y repite (sin Anki no escribe nada).'),
      P(15, 'INVESTIGA: predicción ↔ salida ↔ Stats de Anki (±5 %)', 'Por cada número que no cuadre, Claude Code: «¿de qué línea de anki_telemetria.js sale <número> y qué consulta de AnkiConnect usa?» → línea + consulta al journal (deck:APEX::USMLE* vs AnKing). Hoy no se cambia código.'),
    ];
    case 2: return [
      P(10, 'PREDICE: preset, nuevas/día y Desired retention del mazo APEX::USMLE', 'Anki → engranaje de APEX::USMLE → Options: anota nombre del preset, nuevas/día y Desired retention. Escribe qué esperas que diga el script (preset «APEX USMLE», 20 nuevas/día, 0,90).'),
      P(10, 'CORRE: `node DATA/_scripts/anki_telemetria.js --json` → busca configDeck, desiredRetention y retencion30', 'Compara los 3 valores con tu predicción y con Anki. retencion30 = 1 − Again/revisiones de 30 días (cabecera del script).'),
      P(15, 'INVESTIGA y corrige EN ANKI (no en el script): ningún submazo APEX::USMLE::… en «Default»', 'Options de cada submazo: si alguno usa Default, pásalo a «APEX USMLE» ahí. Claude Code: «explícame en 3 líneas qué es la retención review-level (getReviewsOfCards)» → journal.'),
    ];
    case 3: return [
      P(10, 'PREDICE: qué entrada dejará la tarea de las 21:05 en _anki_telemetria.json con Anki abierto y con Anki cerrado', 'Lee en la cabecera del script qué hace --registrar-cerrado y escribe las 2 entradas que esperas (estado ok · estado anki_cerrado).'),
      P(15, 'CORRE: crea la tarea programada y lánzala a mano', 'Terminal (tu usuario, sin admin): `schtasks /create /tn "JMD Anki telemetria" /tr "node D:\\joseph-md-app\\DATA\\_scripts\\anki_telemetria.js --registrar-cerrado" /sc daily /st 21:05` → `schtasks /run /tn "JMD Anki telemetria"` → abre DATA\\USMLE\\_anki_telemetria.json: ¿está la entrada de hoy?'),
      P(10, 'INVESTIGA: `schtasks /query /tn "JMD Anki telemetria" /v /fo list` → «Last Result» y próxima ejecución', 'Last Result 0 = OK. Otro valor: pégaselo a Claude Code y pide la causa antes de tocar nada. Alternativa documentada: hook SessionEnd de Claude Code (doc de hooks).', { t: 'Claude Code · hooks', url: 'https://code.claude.com/docs/en/hooks-guide' }),
    ];
    case 4: return [
      P(10, 'PREDICE: color del KPI ANKI de hoy (verde ≤ 05:10 · ámbar > 05:10 · rojo sin review)', 'Anki → Browse → «rated:1» → la hora de tu 1.ª review de hoy → escribe el color que debe salir en el Home.'),
      P(15, 'CORRE: el one-liner del script en la consola de la app → instrumento ANKI del Home', 'Corre el script → copia el one-liner que imprime (localStorage «jmd-anki-telemetria») → la app en el navegador → F12 → Console → pega + Enter → recarga el Home y mira el instrumento ANKI (CockpitStatusBar).'),
      P(10, 'INVESTIGA: primeraReviewDe en CockpitStatusBar.tsx (l. ≈96-110) con Claude Code', `Si el color no coincide → ${ship} (captura + salida al journal). Pide la función en 5 líneas y anota el umbral exacto (05:10).`),
    ];
    case 5: return [
      P(10, 'Commit [S2]: predice qué saldrá en `git status` y añade SOLO lo de S2', '`cd /d D:\\joseph-md-app` → `git status` (¿coincide con tu predicción?) → `git add DATA/USMLE/_anki_telemetria.json` (+ lo que tocaste de S2; nunca `git add .`: el repo es público) → `git commit -m "[S2] telemetría Anki v2 + KPI 1.ª review"`.'),
      P(10, '`node DATA/_scripts/verify_vibecoding.js 2` → x/4', `${ship}: ahí se acepta el 3.º, que es MANUAL (ver el instrumento ANKI con la hora), con --ok-manual 3. Desde D:\\joseph-md-app; anota qué criterio falla.`),
      P(15, 'Cerrar lo rojo + enlazar la regla «Anki finde = due × 20 s» (DATA/SYNC_ANKI_OBSIDIAN_APP.md)', `Lo que no cierre → ${ship} (flexible; nunca a S3) · <5 entradas en el JSON → la tarea las irá sumando cada noche (es normal) · sin tarea → paso 3 (${vibeDiaTxt(2, 3)}).`),
    ];
    default: return undefined;
  }
}
function vibeS3(k: number): GuiaPaso[] | undefined {
  const p = vibeProyectoDe(3);
  const ship = p ? `SHIP S3 del ${fCorta(p.ship)}` : 'SHIP S3 del domingo';
  switch (k) {
    case 1: return [
      P(10, 'LEE sin tocar DATA/_scripts/_migrations/plan_checks.sql y PREDICE cuántas filas tiene hoy plan_checks', 'Cabecera: un ✓ de la app = una fila (plan_key, dia); la migración YA está aplicada (12-sep-2026): hoy no se aplica nada. Escribe en el journal tu predicción (filas y de qué planes).'),
      P(15, 'CORRE (solo lectura) con Claude Code + el MCP de Supabase: filas por plan y policy de plan_checks', 'Pídele: `select plan_key, count(*) from plan_checks group by 1` y `select policyname, cmd from pg_policies where tablename = \'plan_checks\'`. Compara con tu predicción. Nada de apply_migration hoy.'),
      P(10, 'INVESTIGA studyProgressSync.ts: syncSaveDone (l. ≈132) y pullAll (l. ≈141)', 'Claude Code: «explícame en 5 líneas qué hace syncSaveDone y cuándo se llama» → journal + 1 cosa que no entiendas (mañana la ves en vivo).'),
    ];
    case 2: return [
      P(10, 'PREDICE: marcas 1 día del SYNAPSE en la app → qué fila (plan_key, dia) aparece', 'Escríbelo antes de marcar. Usa días que de verdad hiciste (es tu progreso real).'),
      P(15, 'CORRE: marca 2 días y desmarca 1 → `select * from plan_checks order by checked_at desc limit 5`', 'Con Claude Code + MCP de Supabase (solo lectura). ¿Están las 2 altas y se fue la baja? Captura al journal; al final deja los ✓ como estaban de verdad.'),
      P(10, 'INVESTIGA: F12 → Console mientras marcas: ¿algún error en rojo?', 'Si hay error, pégaselo a Claude Code y pide la causa en 3 líneas (el sync nunca debe romper la app). Hoy no se cambia código.'),
    ];
    case 3: return [
      P(10, 'PREDICE: en un 2.º navegador (o el móvil), ¿la app verá los ✓ de ayer?', 'Escribe sí/no y por qué (pull de plan_checks + migración única).'),
      P(15, 'CORRE: abre la app en el 2.º navegador y compara el % de 3 planes con el 1.º', 'F12 → Application → Local Storage: busca «jmd-study-progress-migrated-v1» (fecha de la migración única) y anótala.'),
      P(10, 'INVESTIGA: si no cuadra, Claude Code lee pullAll y te dice por qué', 'Solo se corrige lo que ya sabes explicar (no se hace commit de código que no entiendes). Lo que quede, al journal.'),
    ];
    case 4: return [
      P(10, 'PREDICE + localiza el panel «Exportar / Importar progreso» del Home (CockpitStatusBar)', 'Ya existe (exportProgresoJSON). Escribe qué crees que copiará al portapapeles (los ✓ de los 10 planes + jmd-modo-log).'),
      P(15, 'CORRE: Exportar en el navegador 1 → Importar en el 2 → mismos % en 1 plan', 'Pega el JSON en el campo del panel si el navegador no deja leer el portapapeles. Anota los 2 % en el journal.'),
      P(10, 'CORRE: `node DATA/_scripts/gen_revision_semanal.js --dry-run` → métricas 6, 7 y 9', `Lo que salga «sin dato» → ${ship} (flexible). ¿Leen de plan_checks? Anota cuáles sí y cuáles no.`),
    ];
    case 5: return [
      P(10, 'Commit [S3]: predice `git status` y añade SOLO lo de S3', '`cd /d D:\\joseph-md-app` → `git status` → `git add` de lo que tocaste en S3 (nunca `git add .`) → `git commit -m "[S3] espejo plan_checks verificado + export/import"`. Si no tocaste código, el commit lleva la nota de la verificación (DATA/SYNAPSE).'),
      P(10, '`node DATA/_scripts/verify_vibecoding.js 3` → x/4', `${ship}: ahí se aceptan el 2.º y el 3.º, MANUALES (los viste el ${vibeDiaTxt(3, 2)} y el ${vibeDiaTxt(3, 4)}), con --ok-manual 2,3. Desde D:\\joseph-md-app.`),
      P(15, 'Cerrar lo rojo (no manual)', `Lo que no cierre → ${ship} (flexible; nunca a S4) · <5 filas en plan_checks → marca en la app los días que hiciste · sin commit → repite con [S3].`),
    ];
    default: return undefined;
  }
}
const VIBE_COMO_TIPO: Record<string, string> = {
  definir: 'SPEC del día: abre Claude Code en el repo del proyecto y pídele que lea los ficheros citados y te devuelva QUÉ fichero tocar, QUÉ test/comando lo demuestra y el criterio de «hecho». Hoy no se escribe código salvo ese test.',
  construir: 'Construye con Claude Code: pega el paso como objetivo, pídele primero un plan de 3 pasos y un test que él pueda correr (best practices) y ejecútalo. A las 04:55 paras aunque falte.',
  verificar: 'Verifica EN VIVO (test, URL o dato real) y guarda la evidencia (salida del comando o captura) en el journal.',
  'ship-prep': 'Commit [S<n>] en el repo declarado + node DATA/_scripts/verify_vibecoding.js <n> (+ --ok-manual <i> si ya viste el criterio manual) + journal. Lo que falle va al SHIP del domingo.',
  sensores: 'node DATA/_scripts/verify_vibecoding.js --sensores → todo verde o anota el rojo; nada más de teclado.',
  mejora: '1 mejora pequeña al sensor que dio rojo (o ninguna si todo está verde).',
  lectura: 'Journal + lectura de la doc del proyecto (sin construir).',
  retro: 'Retro de la semana en el journal: qué funcionó, qué no, qué se queda.',
  journal: 'Deload total: journal 5′ y, si quieres, audio del SYNAPSE.',
};
/** v6.10 (17-nov-2026): franja REAL de un bloque de fin de semana que recupera el mar 17 a hora fija (_fechas_v6.json › corrida_s1.extra[iso][frente]);
 *  null si ese día no lo trae. Las guías de esos bloques se piden en su fecha de plan (= ese mismo día) y a la hora L-V del frente; plantillasV6 ›
 *  bloqueCorrido + guia.moverGuia las llevan a esta franja (v6.02d). Los textos que nombran la hora real la escriben aquí (fuera de la franja L-V). */
export const franjaExtraDe = (iso: string, frente: string): { ini: string; fin: string } | null => extraCorridaDe(iso).find((x) => x.frente === frente) ?? null;
/** v6.09b lote 1-quater (QS): días cuyos textos de SYNAPSE / vibecoding / SHIP reescribe este lote = F1 desde MAÑANA (mié 18-nov → dom 3-ene): el mar
 *  17-nov (D1) estaba en curso y no se toca; 2027, idéntico. */
const textosQSDe = (iso: string): boolean => iso >= '2026-11-18' && iso <= FECHAS_V6.transicion.hasta;
/** v6.09b lote 1-quater (QS · hallazgo e de R2): el «cómo» genérico de un día de vibecoding. En F1 (hasta el 3-ene) el día «doc + commit + preparar SHIP»
 *  dice ADÓNDE va lo que falle, con fecha y al principio («Lo que falle → SHIP S2 del dom 6-dic (flexible)»; antes «va al SHIP del domingo», sin fecha y
 *  en el carácter ≈150, que el Calendar corta) y pone el número del proyecto en el commit y el verify; fuera de F1, sin cambio (2027 idéntico). */
function vibeComoTipoDe(dia: DiaVibe, p: VibeProyecto | undefined, iso: string): string {
  const base = VIBE_COMO_TIPO[dia.tipo] ?? VIBE_COMO_TIPO.construir;
  if (dia.tipo !== 'ship-prep' || !p || !textosQSDe(iso)) return base;
  return `Lo que falle → SHIP S${p.s} del ${fCorta(p.ship)} (flexible). ${base.replace(' Lo que falle va al SHIP del domingo.', '').replace(/<n>/g, String(p.s))}`;
}
/** v6.10l (rev. c15, cambios #14): el aviso de una semana con flag deload sale de los minutos REALES de sus días (VIBE_DIAS): S7 = «carga al 50 % (2 días
 *  de 45′ + 3 de 15′)» · S13-S16 (taper, todos de 15′) = «Mantenimiento: 15′/día» · S17-S20 (todos de 5′) = «Deload total: journal 5′». Antes el texto de
 *  la S7 iba fijo en cualquier semana deload (falso en las 30 mañanas del taper). */
function vibeDeloadTxt(semana: number): string {
  const mins = VIBE_DIAS.filter((y) => y.semana === semana).map((y) => y.min);
  if (!mins.length) return '';
  if (mins.every((m) => m <= 5)) return `Deload total: journal ${Math.max(...mins)}′.`;
  if (mins.every((m) => m === mins[0])) return `Mantenimiento: ${mins[0]}′/día.`;
  const n = new Map<number, number>(); for (const m of mins) n.set(m, (n.get(m) ?? 0) + 1);
  return `Semana DELOAD del vibecoding: carga al 50 % (${[...n].sort((a, b) => b[0] - a[0]).map(([m, k], i) => `${k}${i ? '' : ` día${k > 1 ? 's' : ''}`} de ${m}′`).join(' + ')}).`;
}
export function guiaVibeDe(iso: string): GuiaBloque | null {
  const dia: DiaVibe | undefined = vibeDiaDe(iso);
  if (!dia) return null;
  const p: VibeProyecto | undefined = dia.semana <= 12 ? vibeProyectoDe(dia.semana) : undefined;
  const t = dia.semana > 12 ? vibeTaperDe(dia.semana) : undefined;
  const nombre = p ? `S${p.s} · ${p.nombre}` : t ? `S${t.s} · ${t.nombre}` : `S${dia.semana}`;
  const franja = franjaDesde('04:15', dia.min);
  // v6.10 (17-nov-2026): hábil EXTRA de fin de semana (corrida_s1.extra › vibecoding: sáb 28-nov 05:00-05:45, recupera el mar 17). La guía sigue en la
  //   franja de PLAN (04:15-05:00): plantillasV6 › bloqueCorrido + moverGuia la llevan a su hora real; los textos con hora dentro de esa franja se mueven
  //   con ella (04:55 → 05:40, 05:00 → 05:45) y los demás nombran la rutina y el Anki del sábado (21:30), que no se mueven.
  const fxV = dow(iso) === 0 || dow(iso) === 6 ? franjaExtraDe(iso, 'vibecoding') : null;
  const sem = vibeSemanaISO(iso);
  const journal = { t: `📓 journal ${sem}`, url: vibeJournalUrl(iso) };
  const docs = p?.docs?.[0];
  const recursos: GuiaRecurso[] = [R(`journal ${sem}.md (D:/synapse-journal)`, vibeJournalUrl(iso)), ...(p ? p.docs.map((d) => R(d.label, d.url)) : [])];
  const objetivo = P(dia.min >= 45 ? 5 : dia.min >= 15 ? 2 : 1, `OBJETIVO del día (${VIBE_TIPO_LABEL[dia.tipo]})`,
    `\`${JOURNAL_CMD}\` (crea ${vibeJournalPath(iso)} con la sección de hoy si no existe y la abre) → escribe en 1 línea el objetivo = el paso de hoy.`, journal);
  let pasos: GuiaPaso[];
  if (dia.min >= 45) {
    // v6.03: por PASO de S1, no por fecha · v6.10 · BASE CERO: + S2 y S3 (fase 1 «guiado», PRIMM predice → corre → investiga), solo en F1
    const cur = dia.semana === 1 ? vibeS1(dia.k) : dia.semana === 2 && textosQSDe(iso) ? vibeS2(dia.k) : dia.semana === 3 && textosQSDe(iso) ? vibeS3(dia.k) : undefined;
    // v6.09b lote 1-quater FX1: si el plan B del SHIP del domingo anterior manda aquí el verify y lo rojo, este paso lo dice con sus minutos (CONSTRUIR baja a 25′)
    const domPB = textosQSDe(iso) ? [addDias(iso, -1), addDias(iso, -2)].find((x) => shipPBDestDe(x) === iso) : undefined;
    const pPB = domPB ? (vibePCDomingo(domPB).at(-1)?.proyecto ?? null) : null;
    const pbTxt = domPB && pPB ? `Si el ${fCorta(domPB)} no hubo PC: primero el verify (10′) y lo rojo de S${pPB.s} (node DATA/_scripts/verify_vibecoding.js ${pPB.s}); hoy CONSTRUIR = 25′. ` : '';
    // v6.10 · base cero: con sub-pasos (S2/S3) y plan B del domingo, el verify va delante (en el «cómo» del 1.º) y el último sub-paso (10′) se salta
    const construir = cur ? cur.map((x, i, xs) => (pbTxt && dia.semana > 1 ? (i === 0 ? { ...x, como: `${pbTxt}${x.como}` } : i === xs.length - 1 ? { ...x, que: `${x.que} (se salta si hoy hiciste ese verify)` } : { ...x }) : { ...x })) : [P(35, `CONSTRUIR · ${dia.paso}`, `${pbTxt}${vibeComoTipoDe(dia, p, iso)}${p ? ` Repo: ${p.repoGit}.` : ''}`, docs ? { t: 'docs ↗', url: docs.url } : undefined)];
    // v6.10e (revisión del 18-nov · dias-1920-13): en S1 no hay nada que commitear ni guardar con stash (el trabajo es en n8n; D:\\agente_estudio no es repo
    //   git y un `git stash` en joseph-md-app se llevaría los cambios de otros chats): como el kit v3, nota de estado en el journal; el commit [S1] es el del paso 5
    const s1SinGit = dia.semana === 1 && dia.k < 5;
    pasos = [objetivo, ...construir, P(5, s1SinGit ? 'CIERRE · 04:55 nota de estado + journal (S1: sin commit ni stash)' : 'CIERRE · 04:55 commit-or-stash + journal',
      s1SinGit
        ? `A las 04:55 paras: SIN \`git commit\` ni \`git stash\` (D:\\agente_estudio no es repo git y en joseph-md-app hay cambios de otros chats; el commit [S1] es el del paso 5): deja en el journal dónde quedaste (paso, nodo, ejecución). Journal: qué construí · qué aprendí · % del código que entiendo · bloqueo. ${fxV ? 'El bloque termina a las 05:00, con la rutina (hoy el Anki es a las 21:30).' : '05:00 = Anki sin excepción.'}`
        : `A las 04:55: \`git commit\` (con [S${p ? p.s : dia.semana}] en el mensaje) o \`git stash\` — nunca se deja a medias. Journal: qué construí · commit/URL · qué aprendí · % del código que entiendo · bloqueo. ${fxV ? 'El bloque termina a las 05:00, con la rutina (hoy el Anki es a las 21:30).' : '05:00 = Anki sin excepción.'}`, journal)];
  } else if (dia.min >= 15) {
    // v6.09b lote 1-quater FX1 (revisión V2/V3): en F1 la hora de parada es la de ESTE paso (jue 31-dic: 04:27; antes «A las 04:55», fuera de su franja de 15′) y la
    //   franja es la del bloque (04:15-04:30): lo que queda hasta las 05:00 no es un bloque de estudio
    const finPaso = `04:${String(15 + (dia.min >= 15 ? 2 : 1) + dia.min - 5).padStart(2, '0')}`;
    pasos = textosQSDe(iso)
      ? [objetivo, P(dia.min - 5, `${VIBE_TIPO_LABEL[dia.tipo]} · ${dia.paso}`, (VIBE_COMO_TIPO[dia.tipo] ?? VIBE_COMO_TIPO.construir).replace('A las 04:55 paras aunque falte.', `A las ${finPaso} paras aunque falte.`)), P(3, 'CIERRE · journal (3 líneas)', `Qué hice · qué quedó · semáforo de sensores. El bloque termina a las ${franja.split('–')[1]}; ${fxV ? 'a esa hora sigue el siguiente bloque fijo de hoy (sábado que recupera, sin Anki).' : 'hasta las 05:00 (Anki), libre: no es estudio.'}`, journal)]
      : [objetivo, P(dia.min - 5, `${VIBE_TIPO_LABEL[dia.tipo]} · ${dia.paso}`, VIBE_COMO_TIPO[dia.tipo] ?? VIBE_COMO_TIPO.construir), P(3, 'CIERRE · journal (3 líneas)', 'Qué hice · qué quedó · semáforo de sensores. El resto de la franja (hasta las 05:00) queda libre: no se rellena.', journal)];
  } else {
    pasos = [P(dia.min, `JOURNAL 5′ · ${dia.paso}`, 'Solo journal (3 líneas) y, si quieres, el audio B del SYNAPSE. Semana de deload total: no se construye nada.', journal)];
  }
  return bloque(franja, 'vibecoding', `${nombre} — ${VIBE_TIPO_LABEL[dia.tipo]}`, pasos, recursos,
    dia.min >= 45 ? (dia.semana === 1 && dia.k < 5 ? 'paso del día hecho + nota de estado a las 04:55 (S1: sin commit ni stash) + entrada del journal' : 'paso del día hecho + commit [S…] o stash a las 04:55 + entrada del journal con los 6 campos') : 'entrada del journal del día',
    {
      flex: Math.max(0, pasos.length - 2),
      // v6.09b lote 1-quater (QS · e): en F1 el plan B dice a qué SHIP va el paso (el del proyecto en curso, con fecha); fuera de F1, sin cambio
      planB: `Si el día se recorta: pierde el proyecto${fxV && faseV6(iso) === 'TRANSICION' ? '' : `, nunca el Anki${fxV ? ' (hoy, a las 21:30)' : ' de las 05:00'}`}. Sin PC: journal en el móvil (3 líneas) y el paso pasa al ${p && textosQSDe(iso) ? `SHIP S${p.s} del ${fCorta(p.ship)} (flexible)` : 'bloque PC de la semana'}.`,
      aviso: [
        dia.deload ? vibeDeloadTxt(dia.semana) : '',
        iso === VIBE_META.inicio ? `Primer día: el journal de esta semana (${sem}.md) todavía no existe; lo crea el comando del paso 1.` : '',
        // v6.10c: la hora real del día extra (sáb 2-ene 04:15-04:30; v6.10: sáb 28-nov 05:00-05:45, «justo antes de la rutina»)
        fxV ? `Hoy ${dow(iso) === 0 ? 'domingo' : 'sábado'}, a hora fija (${fxV.ini}-${fxV.fin}${fxV.fin === '05:45' ? ', justo antes de la rutina de las 05:45' : ''}): el paso que toca en orden (el mar 17-nov fue sin sesión y cada paso de F1 corrió un día${faseV6(iso) === 'TRANSICION' ? ' hasta fin de año: hoy, el último de F1' : ''}; desde el lunes, las fechas de siempre).` : '',
        vibeFaseAvisoDe(iso), // v6.10 · BASE CERO: fase PRIMM (1 guiado · 2 modificar · 3 crear), al final (el Calendar corta el aviso en 240)
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
 *  10:00-20:00 y el resto de «Prompt injection…»). Mismos recursos, minutos y palabras medidos el 18-oct; nada se recorta.
 *  v6.05 (24-oct-2026): D1 = lun 26-oct → OFF_WD = 0 (como v6.02): lun 26 = auditoría F0 + No Priors + Pro Git · mar 27 = Dwarkesh + Willison ·
 *  mié 28 = Lex cap. 1 + Python §1 · jue 29 = The Batch + ATBS cap. 0 · vie 30 = deep dive + trifecta. Los COMODINES del sábado ya no van por
 *  nº de aparición sino por la regla «el comodín del 1.er sábado tras la pieza retoma lo que quedó a medias», con prioridad para la curaduría
 *  original (No Priors del lunes · «Prompt injection…» del martes): sáb 31-oct = No Priors 10:00-20:00 + resto de «Prompt injection…» (como
 *  v6.02 el sáb 24); el deep dive y la trifecta del vie 30 siguen por su carril (tramo 2 el vie 6-nov · «termínalo en otro hueco»). Con D1 en
 *  miércoles (v6.03) la misma regla da sáb 24 = deep dive + trifecta y sáb 31 = No Priors + Willison.
 *  v6.05 (fix 24-oct): el comodín cuyo 1.er sábado ya está ocupado pasa al SIGUIENTE sábado libre (≤ 3 semanas) en vez de quedarse sin curar:
 *  sáb 7-nov = deep dive (minutos 20:00-30:00, tras el tramo 2 del vie 6-nov) + trifecta (≈740 palabras que quedan → los próximos ≈500).
 *  v6.06 (31-oct-2026): D1 = lun 2-nov → la misma regla una semana después: lun 2 = auditoría F0 + No Priors + Pro Git · … · vie 6-nov = deep dive
 *  + trifecta · sáb 7-nov = No Priors + «Prompt injection…» · sáb 14-nov = deep dive (tras el tramo 2 del vie 13-nov) + trifecta.
 *  v6.09 (16-nov-2026 · hallazgo joseph 11 de la revisión): con el sáb 21-nov SIN SESIÓN (viaje) los comodines corrían una semana y los carriles L-V solo
 *  un día, y la retoma apuntaba a sesiones equivocadas (el C del mar 24 pedía «el siguiente artículo» con el 1.º a medias; el dom 29 y el lun 30, «el
 *  episodio de esta semana» con el de Brockman a medias; el comodín del sáb 5-dic, «donde paraste el viernes» con el vie 4-dic en otro vídeo). REGLA
 *  NUEVA (SYN_SERIES): los 4 recursos curados que se reparten en varias sesiones —No Priors · Brockman (39′) · «Prompt injection…» (1.457 palabras) ·
 *  deep dive (1:16:42) · trifecta (≈1.240 palabras)— se asignan por FECHA de su sesión real: la 1.ª aparición, el comodín del sábado que le toca (la
 *  regla de siempre: 1.er sábado con su comodín LIBRE tras la pieza, ≤ 3 semanas, prioridad para la curaduría original) y las apariciones siguientes de
 *  SU carril mientras quede recurso, en orden de fecha; cada sesión dice minutos / palabras, DÓNDE paraste (la fecha de la sesión anterior del recurso)
 *  y dónde sigue. Las demás piezas (SYN_CUR_PIEZAS) no cambian. */
type SynCur = { que: string; como: string; url: string; t: string };
const ES_NO_PRIORS = (b: SynBloque): boolean => b.tag === 'B' && /^No Priors/.test(b.material);
const ES_WILLISON_PI = (b: SynBloque): boolean => b.tag === 'C' && /^Simon Willison — serie Prompt injection/.test(b.material);
const ES_DEEP_DIVE_1 = (b: SynBloque): boolean => b.tag === 'B' && /^Canal Anthropic/.test(b.material) && /AI prompt engineering: A deep dive.*tramo 1\b/.test(b.leccion);
const ES_DEEP_DIVE = (b: SynBloque): boolean => b.tag === 'B' && /^Canal Anthropic/.test(b.material) && /AI prompt engineering: A deep dive/.test(b.leccion);
const ES_TRIFECTA = (b: SynBloque): boolean => b.tag === 'C' && b.material === 'Simon Willison' && /lethal trifecta/i.test(b.leccion);
const NO_PRIORS_BROCKMAN = 'https://podcasts.apple.com/us/podcast/the-changing-physics-of-cybersecurity-and/id1668002688?i=1000796472163';
const SYN_CUR_PIEZAS: Array<{ tag: 'A' | 'B' | 'C'; es: (b: SynBloque) => boolean; n?: number; cur: SynCur }> = [
  { tag: 'A', es: (b) => b.material === 'Anthropic Academy' && /^AUDITORÍA F0/.test(b.leccion),
    // v6.10 · tanda C (corrección de hecho, FAQ de academy.claude.com): la página es «Your learning» (no «My courses») y los certificados viejos solo salen tras «Import your Skilljar progress»
    cur: { que: 'Anthropic Academy › «Your learning»: auditoría F0 — anota qué certificados ya tienes (AI Fluency · Claude 101 · Claude Code 101 · Platform 101)', como: 'academy.claude.com (inicias sesión tú) → «Your learning»; si sale «Import your Skilljar progress», púlsalo (sin eso no salen tus certificados viejos). Lista ✓/pendiente en el journal; la 1.ª pendiente es la lección A de mañana.', url: ACADEMY, t: 'Academy' } },
  { tag: 'C', es: (b) => /^Pro Git/.test(b.material),
    cur: { que: 'Pro Git › 1.1 «About Version Control» (≈800 palabras) → las primeras ≈500', como: '5′ a 100 palabras/min. Marca dónde quedas: lo sigues en el próximo C libre.', url: 'https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control', t: 'Pro Git 1.1' } },
  { tag: 'B', es: (b) => /^Dwarkesh — Dario Amodei/.test(b.material) && /Tramo 1\/3/.test(b.leccion),
    cur: { que: 'Dwarkesh · Dario Amodei (episodio de 1:58:43) → tramo 1/3 = minutos 0:00-10:00', como: 'Auriculares, 1,0×. Anota el minuto donde paras (el siguiente tramo de Dwarkesh empieza ahí).', url: 'https://www.dwarkesh.com/p/dario-amodei', t: 'Dwarkesh × Dario' } },
  { tag: 'C', es: (b) => /^The Python Tutorial/.test(b.material) && /Sección 1:/.test(b.leccion),
    cur: { que: 'The Python Tutorial › 1 «Whetting Your Appetite» (≈730 palabras) → las primeras ≈500', como: '5′. Objetivo: LEER el Python que escribe la IA, no memorizar sintaxis.', url: 'https://docs.python.org/3/tutorial/appetite.html', t: 'Python tutorial §1' } },
  { tag: 'B', es: (b) => /^The Batch/.test(b.material),
    cur: { que: 'The Batch (Andrew Ng) · el número de esta semana (si aún no salió hoy, el más reciente): la carta de Ng + 2 noticias', como: '10′ y fuera; no abras enlaces internos.', url: 'https://www.deeplearning.ai/the-batch/', t: 'The Batch' } },
  { tag: 'C', es: (b) => /^Automate the Boring Stuff/.test(b.material) && /cap\. 0:/.test(b.leccion),
    cur: { que: 'Automate the Boring Stuff 3e › cap. 0 «Introduction» (≈4.900 palabras) → las primeras ≈500', como: '5′. Marca dónde quedas (el capítulo da para ~10 C).', url: 'https://automatetheboringstuff.com/3e/chapter0.html', t: 'ATBS cap. 0' } },
];
/** v6.09: sesión de un recurso repartido (SYN_SERIES): la 1.ª aparición, una aparición posterior de su carril o el comodín del sábado que le tocó. */
interface SynSesion { fecha: string; tipo: 'primera' | 'carril' | 'comodin' }
interface SynSerieCtx { desde: number; hasta: number; total: number; ses: SynSesion; prev?: SynSesion; sig: SynSesion[] }
const sesTxt = (x: SynSesion): string => `${x.tipo === 'comodin' ? 'comodín del ' : ''}${fCorta(x.fecha)}`;
const sigTxt = (xs: SynSesion[]): string => xs.map(sesTxt).join(' · ');
/** v6.09: «donde paraste el …» = la sesión anterior del recurso (si fue el comodín, «sáb 28-nov (comodín)»). */
const prevTxt = (x: SynSesion | undefined, defecto: string): string => (x ? `${fCorta(x.fecha)}${x.tipo === 'comodin' ? ' (comodín)' : ''}` : defecto);
const r50 = (n: number): number => Math.round(n / 50) * 50; // palabras redondeadas a 50 (1.457 − 500 = ≈950)
const mmTxt = (m: number): string => `${m}:00`;
/** v6.09: recursos curados que se reparten en varias sesiones, en el orden de prioridad de sus comodines (primero la curaduría original: No Priors del
 *  lunes y «Prompt injection…» del martes; después el deep dive y la trifecta del viernes). `primera` = su 1.ª aparición · `carril` = las apariciones
 *  siguientes que lo continúan mientras quede · `comodin` = el bloque comodín del sábado (Comodín de audio / de lectura) · `total` / `paso0` / `paso` en
 *  la unidad del recurso (minutos o palabras). */
const SYN_SERIES: Array<{ tag: 'B' | 'C'; primera: (b: SynBloque) => boolean; carril: (b: SynBloque) => boolean; comodin: (b: SynBloque) => boolean; total: number; paso0: number; paso: number; txt: (c: SynSerieCtx) => SynCur }> = [
  { tag: 'B', primera: ES_NO_PRIORS, carril: ES_NO_PRIORS, comodin: (b) => /^Comodín de audio/.test(b.material), total: 39, paso0: 10, paso: 10,
    txt: ({ desde, hasta, total, ses, prev, sig }) => {
      const fin = hasta >= total, resto = total - hasta;
      // v6.09b lote 1-ter (revisión R, hallazgo 5): adónde va lo que queda, AL PRINCIPIO del «cómo» (el volcado del Calendar corta el «cómo» en 110)
      const pre = fin ? '' : `Los ${resto}′ restantes → ${sig.length ? sigTxt(sig) : 'el comodín de audio del sábado'}. `;
      const tras = fin ? ' Con esto terminas el episodio.' : '';
      if (ses.tipo === 'primera') return { que: 'No Priors · «The Changing Physics of Cybersecurity and Drug Development with OpenAI President Greg Brockman» (15-oct-2026 · 39 min) → minutos 0:00-10:00', como: `${pre}Auriculares, 1,0×. Para a los 10:00 y anota el minuto.`, url: NO_PRIORS_BROCKMAN, t: 'Episodio (Apple Podcasts)' };
      if (ses.tipo === 'comodin') return { que: `Comodín de audio · No Priors (Greg Brockman) → minutos ${mmTxt(desde)}-${mmTxt(hasta)}`, como: `${pre}Retoma donde paraste el ${prevTxt(prev, 'lunes')}. Nada nuevo.${tras}`, url: NO_PRIORS_BROCKMAN, t: 'Episodio (Apple Podcasts)' };
      return { que: `No Priors · sigue el episodio de Greg Brockman → minutos ${mmTxt(desde)}-${mmTxt(hasta)}${fin ? ' (final)' : ''}`, como: fin ? `Auriculares, 1,0×. Retoma donde paraste el ${prevTxt(prev, 'lunes')} y termina el episodio.` : `${pre}Auriculares, 1,0×. Retoma donde paraste el ${prevTxt(prev, 'lunes')}. Hasta acabarlo, ningún episodio nuevo («episodio de esta semana»).`, url: NO_PRIORS_BROCKMAN, t: 'Episodio (Apple Podcasts)' }; // v6.10l (rev. c15, cambios #18): el dato delante (el corte del «cómo» a 110 dejaba «… del plan es …»)
    } },
  { tag: 'C', primera: ES_WILLISON_PI, carril: ES_WILLISON_PI, comodin: (b) => /^Comodín de lectura/.test(b.material), total: 1457, paso0: 500, paso: 500,
    txt: ({ desde, hasta, total, ses, prev, sig }) => {
      const fin = hasta >= total, quedan = r50(total - desde), url = 'https://simonwillison.net/2022/Sep/12/prompt-injection/', t = 'Willison · prompt injection';
      const tras = fin ? ' Con esto lo terminas: el siguiente artículo de la serie, en el próximo C de los martes.' : ` El resto, ${sig.length ? sigTxt(sig) : 'en el próximo C de la serie'}.`;
      if (ses.tipo === 'primera') return { que: 'Simon Willison · «Prompt injection attacks against GPT-3» (12-sep-2022 · 1.457 palabras, 1.er artículo de la serie) → las primeras ≈500', como: sig.length ? `5′. El resto (≈${r50(total - hasta)} palabras): ${sigTxt(sig)}.` : '5′. El resto, en el C comodín del sábado.', url, t };
      const verbo = fin ? 'termina' : 'sigue', cuanto = fin ? `≈${quedan} palabras que quedan` : `≈${quedan} palabras que quedan → las próximas ≈500`;
      if (ses.tipo === 'comodin') return { que: `Comodín de lectura · ${verbo} «Prompt injection attacks against GPT-3» (${cuanto})`, como: `5′. Nada nuevo: retoma donde quedaste el ${prevTxt(prev, 'martes')}.${fin ? '' : tras}`, url, t };
      return { que: `Simon Willison · ${verbo} «Prompt injection attacks against GPT-3» (${cuanto})`, como: `5′. Retoma donde quedaste el ${prevTxt(prev, 'martes')}: «el siguiente artículo de la serie» espera a que termines este.${tras}`, url, t };
    } },
  { tag: 'B', primera: ES_DEEP_DIVE_1, carril: ES_DEEP_DIVE, comodin: (b) => /^Comodín de audio/.test(b.material), total: 77, paso0: 10, paso: 10,
    txt: ({ desde, hasta, total, ses, prev, sig }) => {
      const quedan = Math.max(0, total - hasta), url = yt('T9aRN5JkmL8', desde * 60), t = 'Prompt engineering deep dive';
      if (ses.tipo === 'primera') return { que: 'Canal Anthropic · «AI prompt engineering: A deep dive» (1:16:42) → minutos 0:00-10:00', como: '1,0× con subtítulos en inglés; para a los 10:00 (tramo 1).', url: yt('T9aRN5JkmL8'), t };
      const nTramos = desde / 10;
      const cola = quedan ? (sig.length ? ` Sigue: ${sigTxt(sig)}.` : ` Quedan ≈${quedan}′ del vídeo: van a los próximos comodines de audio (marca el minuto).`) : ' Con esto terminas el vídeo.';
      if (ses.tipo === 'comodin') return { que: `Comodín de audio · «AI prompt engineering: A deep dive» (canal Anthropic) → minutos ${mmTxt(desde)}-${mmTxt(hasta)}`, como: `Retoma donde paraste el ${prevTxt(prev, 'viernes')} (${nTramos > 1 ? `${nTramos} tramos de 10′ ya vistos` : 'tramo 1'}), 1,0× con subtítulos en inglés. Nada nuevo.${cola}`, url, t };
      return { que: `Canal Anthropic · «AI prompt engineering: A deep dive» → minutos ${mmTxt(desde)}-${mmTxt(hasta)} (tramo ${nTramos + 1})`, como: `1,0× con subtítulos en inglés; retoma donde paraste el ${prevTxt(prev, 'viernes')}. El vídeo dura 1:16:42: hoy no se termina.${cola}`, url, t };
    } },
  { tag: 'C', primera: ES_TRIFECTA, carril: () => false, comodin: (b) => /^Comodín de lectura/.test(b.material), total: 1240, paso0: 500, paso: 500,
    txt: ({ desde, total, ses, prev, sig }) => {
      const url = 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/', t = 'Lethal trifecta';
      if (ses.tipo === 'primera') return { que: 'Simon Willison · «The lethal trifecta for AI agents» (16-jun-2025 · ≈1.240 palabras) → las primeras ≈500', como: `5′. Es EL artículo de seguridad de agentes: termínalo en otro hueco${sig.length ? ` (sigue: ${sigTxt(sig)})` : ''}.`, url, t };
      const quedan = Math.max(0, total - desde);
      return { que: `Comodín de lectura · sigue «The lethal trifecta for AI agents» (≈${quedan} palabras que quedan → los próximos ≈${Math.min(500, quedan)})`, como: `5′. Nada nuevo: retoma donde quedaste el ${prevTxt(prev, 'viernes')}.`, url, t };
    } },
];
let SYN_CUR_IDX: Map<string, SynCur> | null = null;
/** Curaduría de un bloque A/B/C de una fecha: la n-ésima aparición de su pieza en SYN_DIAS (n = 1 si no se indica) · v6.09: los recursos repartidos
 *  (SYN_SERIES) por fecha de sesión: su comodín va al 1.er sábado posterior a la 1.ª aparición con su comodín LIBRE (≤ 3 semanas; v6.05 fix: si ese
 *  sábado ya está curado, el siguiente sábado libre), en el orden de la tabla, y las apariciones siguientes de su carril lo continúan mientras quede. */
function synCurDe(iso: string, tag: string): SynCur | undefined {
  if (!SYN_CUR_IDX) {
    const idx = new Map<string, SynCur>();
    const vistos = SYN_CUR_PIEZAS.map(() => 0);
    for (const d of SYN_DIAS) for (const b of d.bloques) {
      SYN_CUR_PIEZAS.forEach((p, i) => {
        if (p.tag !== b.tag || !p.es(b)) return;
        vistos[i] += 1;
        if (vistos[i] === (p.n ?? 1) && !idx.has(`${d.fecha}|${b.tag}`)) idx.set(`${d.fecha}|${b.tag}`, p.cur);
      });
    }
    const ultimo = SYN_DIAS.length ? SYN_DIAS[SYN_DIAS.length - 1]!.fecha : '';
    for (const s of SYN_SERIES) {
      const d0 = SYN_DIAS.find((d) => d.bloques.some((b) => b.tag === s.tag && s.primera(b)));
      if (!d0) continue;
      // el comodín del sábado: 1.er sábado posterior a la pieza con su comodín presente y LIBRE (≤ 3 semanas)
      let sabC: string | undefined;
      for (let sab = siguienteDow(d0.fecha, 6); sab <= ultimo && sab <= addDias(d0.fecha, 21); sab = addDias(sab, 7)) {
        const ds = SYN_DIAS.find((d) => d.fecha === sab);
        if (!ds || !ds.bloques.some((b) => b.tag === s.tag && s.comodin(b)) || idx.has(`${sab}|${s.tag}`)) continue;
        sabC = sab; break;
      }
      // sesiones por FECHA: la 1.ª, el comodín y las apariciones siguientes de su carril, hasta agotar el recurso
      const ses: SynSesion[] = [{ fecha: d0.fecha, tipo: 'primera' }];
      for (const d of SYN_DIAS) {
        if (d.fecha <= d0.fecha) continue;
        if (s.paso0 + (ses.length - 1) * s.paso >= s.total && (!sabC || d.fecha > sabC)) break;
        if (d.fecha === sabC) ses.push({ fecha: d.fecha, tipo: 'comodin' });
        else if (d.bloques.some((b) => b.tag === s.tag && s.carril(b)) && !idx.has(`${d.fecha}|${s.tag}`)) ses.push({ fecha: d.fecha, tipo: 'carril' });
      }
      const usadas: Array<{ ses: SynSesion; desde: number; hasta: number }> = [];
      let hecho = 0;
      for (const x of ses) { if (hecho >= s.total) break; const n = usadas.length ? s.paso : s.paso0; usadas.push({ ses: x, desde: hecho, hasta: Math.min(s.total, hecho + n) }); hecho = Math.min(s.total, hecho + n); }
      usadas.forEach((u, k) => idx.set(`${u.ses.fecha}|${s.tag}`, s.txt({ desde: u.desde, hasta: u.hasta, total: s.total, ses: u.ses, prev: usadas[k - 1]?.ses, sig: usadas.slice(k + 1).map((x) => x.ses) })));
    }
    SYN_CUR_IDX = idx;
  }
  return SYN_CUR_IDX.get(`${iso}|${tag}`);
}
/** v6.10 · tanda C (17-nov-2026 · DECIDIDO CON JOSEPH en el chat SYNAPSE, para CUALQUIER día SYNAPSE): nada fijo en Anki, Obsidian ni GoodNotes; lo que
 *  salga se decide al terminar, en el chat SYNAPSE y con su OK (regla «mazos y notas se crean el día que aprendes algo que va ahí»). Va en el «hecho» de
 *  toda sesión A/B/C, de recuperación y de la cola (≤ 180 caracteres con el criterio: el volcado del Calendar corta la línea «Hecho» en 180). */
const SYN_REGLA_NOTAS = 'Anki · Obsidian · GoodNotes: hoy nada fijo; lo que salga se decide al terminar, en el chat SYNAPSE y con tu OK.';
const SYN_HECHO = `A, B y C con su parada anotada + ✓ en Estudio › SYNAPSE. ${SYN_REGLA_NOTAS}`;
function pasoSyn(b: SynBloque, iso: string): GuiaPaso {
  const cur = synCurDe(iso, b.tag);
  // v6.09: la pieza que recupera un día sin sesión (dom 29-nov, DOM_RECUPERA) conserva su «· recupera el …» aunque lleve curaduría
  const rec = (/ · recupera el .+$/.exec(b.leccion) || [''])[0];
  // v6.09b (S1 · a2-4/5/6): F1 troceado con material MEDIDO (gen_synapse_plan.js › synapse_f1_tramos.js): el paso del generador manda sobre la
  //   curaduría (tramo exacto, velocidad, palabras y adónde va el resto, con fecha); fuera de F1 los bloques no traen `guia` y todo sigue igual
  // v6.10 · tanda C (decidido con Joseph en el chat SYNAPSE): la AUDITORÍA F0 (3′ al abrir la 1.ª sesión) se pinta con su texto exacto, sin «A · »
  if (b.guia && b.audit && /^AUDITORÍA F0/.test(b.guia.que)) return P(b.min, b.guia.que, b.guia.como, b.guia.url ? { t: b.guia.t ?? 'Academy', url: b.guia.url } : undefined);
  if (b.guia) return P(b.min, `${b.tag} · ${b.guia.que}${rec}`, b.guia.como, b.guia.url ? { t: b.guia.t ?? `${b.tag} ↗`, url: b.guia.url } : b.url ? { t: `${b.tag} ↗`, url: b.url } : undefined);
  if (cur) return P(b.min, `${b.tag} · ${cur.que}${rec}`, cur.como, { t: cur.t, url: cur.url });
  const enl = b.url ? { t: `${b.tag} ↗`, url: b.url } : undefined;
  if (b.tag === 'A') return P(b.min, `A (pantalla) · ${b.material} › ${b.leccion}`,
    `En el PC, 1,0× con subtítulos en inglés. Para en el minuto ${b.min} aunque la lección siga (la plataforma guarda el progreso)${iso <= FECHAS_V6.transicion.hasta ? `; si la lección acaba antes del minuto ${b.min}, empieza la siguiente pendiente del curso y para en el ${b.min}` : ''}${iso <= FECHAS_V6.transicion.hasta ? '. Cierre: recall en blanco en el journal (sin mirar, lo que recuerdes).' : ' y anota 1 idea en el journal.'}${b.audit ? ' Base cero: aunque ya la cursaras en jun-ago, se cursa entera (el ✓ es de hoy).' : ''}`, enl); // v6.10 · BASE CERO (18-nov-2026): antes «F0 = auditoría: si ya la cursaste, márcala ✓ y adelanta la siguiente pendiente» (también en 2027: F0 llega al lun 11-ene) · en F1 el cierre es recall en blanco (práctica de recuperación), no «anota 1 idea»
  if (b.tag === 'B') return P(b.min, `B (audio) · ${b.material} — ${b.leccion}`,
    `Auriculares, 1,0×. Exactamente ${b.min}′ ${b.dur ? `(${b.dur})` : 'desde donde quedaste'}; anota el minuto donde paras.`, enl);
  return P(b.min, `C (lectura) · ${b.material} — ${b.leccion}`,
    `≈${b.min * PPM_EN} palabras (${b.min}′ a ${PPM_EN} palabras/min en inglés). Marca dónde quedas; el resto en el próximo C o en el comodín de la semana.`, enl);
}
/** Domingo de Pascua (Meeus/Jones/Butcher), como pascua() de gen_encaps_intensivo_2027.js. */
function pascuaDe(y: number): string {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25),
    g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4,
    l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31),
    da = ((h + l - 7 * m + 114) % 31) + 1;
  return `${y}-${String(mo).padStart(2, '0')}-${String(da).padStart(2, '0')}`;
}
const lunesDeIso = (f: string): string => addDias(f, dow(f) === 0 ? -6 : 1 - dow(f));
/** v6.07 (fix H1): QUINCENA FINAL de la intensiva ENCAPS = la REGLA de gen_encaps_intensivo_2027.js copiada tal cual (QUINCENA / QUINCENA_SIMS, ~l. 391-420):
 *  · calendario = L-V fuera de SKIP (el generador usa SKIP_V6 + Jueves y Viernes Santo del año del examen: aquí igual);
 *  · COLA = los 5 últimos hábiles antes del examen: D-1 = último hábil antes del examen (DERIVADOS_V6.d1HabilEncaps con el examen vigente) y D-5 =
 *    ultimoHabilAntes × 4 sobre el D-1;
 *  · quincena = los hábiles con f > nucleo_hasta, f ≥ examen − 13 y f < D-5 (los de antes son MÓDULOS DE EXTENSIÓN);
 *  · SIM 100Q 11:00-13:00 = lun · mié · vie + el último hábil de cada semana de la quincena · REPASO (tipo repaso_final, extra.cola 'quincena') = el resto.
 *  v6.07 (examen dom 14-mar, núcleo hasta el vie 26-feb): SIM lun 1 · mié 3 · vie 5-mar y REPASO mar 2 · jue 4-mar. Parametrizada (examen,
 *  nucleo_hasta, skip) para compararla con el generador en los 6 escenarios de §A5; check_rutina_guia.js la compara con _encaps_intensivo_2027.sql. */
export function quincenaF2De(examen: string = FECHAS_V6.encaps.examen, nucleoHasta: string = FECHAS_V6.encaps.nucleo_hasta, skip: Set<string> = SKIP_V6): { dias: string[]; sims: string[]; repasos: string[]; cola: string[] } {
  const p = pascuaDe(Number(examen.slice(0, 4)));
  const sk = new Set<string>([...skip, addDias(p, -3), addDias(p, -2)]);
  const d1 = examen === FECHAS_V6.encaps.examen && skip === SKIP_V6 && sk.size === skip.size ? DERIVADOS_V6.d1HabilEncaps : ultimoHabilAntes(examen, sk);
  const cola = [d1];
  for (let k = 0; k < 4; k++) cola.unshift(ultimoHabilAntes(cola[0] as string, sk));
  const d5 = cola[0] as string, desde = addDias(examen, -13);
  const dias: string[] = [];
  for (let f = addDias(nucleoHasta, 1); f < d5; f = addDias(f, 1)) if (dow(f) >= 1 && dow(f) <= 5 && !sk.has(f) && f >= desde) dias.push(f);
  const ultimoDeSemana = (f: string): string | undefined => dias.filter((x) => lunesDeIso(x) === lunesDeIso(f)).pop();
  const sims = dias.filter((f) => [1, 3, 5].includes(dow(f)) || f === ultimoDeSemana(f));
  return { dias, sims, repasos: dias.filter((f) => !sims.includes(f)), cola };
}
const QUINCENA_F2 = quincenaF2De();
/** v6.07 (fix): SIM 100Q 11:00-13:00 de la quincena final (lun 1 · mié 3 · vie 5-mar-2027 en v6.07). */
export const SIM_QUINCENA_F2: string[] = QUINCENA_F2.sims;
/** v6.07 (fix): días de REPASO de la quincena final, 07:15-12:00 sin material nuevo (mar 2 · jue 4-mar-2027 en v6.07). */
export const REPASO_QUINCENA_F2 = new Set<string>(QUINCENA_F2.repasos);
/** v6.07 (fix): COLA anclada del ENCAPS = los 5 últimos hábiles antes del examen [D-5 … D-1] (v6.07: lun 8 → vie 12-mar-2027): D-5 pasada profunda
 *  (loop) · D-4 / D-3 repaso final (sin loop) · D-2 dress rehearsal · D-1 medio día (protegido). plantillasV6 la usa si el índice F2 no trae la fila. */
export const COLA_F2: string[] = QUINCENA_F2.cola;
/** v6.05 (fix 24-oct): días de F2 con el ENCAPS a la hora real del examen, 11:00-13:00 — los SIM 100Q #7 y #8 (los 2 últimos viernes del
 *  núcleo: v6.05 = v6.06 vie 26-feb y vie 5-mar-2027) y el D-2 dress rehearsal (jue antes del D-1 hábil). FUENTE ÚNICA: plantillasV6 la importa para
 *  pintar el SIM a las 11:00 y para mover el SYNAPSE (antes cada fichero calculaba su SIM_11 y el SYNAPSE 12:30-13:00 se solapaba con el SIM).
 *  v6.07 (fix): = los 2 últimos SIM del núcleo (nucleo_hasta − 7 y nucleo_hasta: #6 vie 19 y #7 vie 26-feb) + los 3 de la quincena final
 *  (SIM_QUINCENA_F2: #8 lun 1 · #9 mié 3 · #10 vie 5-mar), = SIM_11 del generador (extra.sim.hora '11:00'). Antes solo los 2 del núcleo: los 3 de la
 *  quincena se pintaban como LOOP 07:15 (lun / mié) o SIM 07:15 (vie) y el SYNAPSE quedaba a las 12:30, solapado con el SIM real de las 11:00. */
export const SIM_F2_11 = new Set<string>([addDias(FECHAS_V6.encaps.nucleo_hasta, -7), FECHAS_V6.encaps.nucleo_hasta, ...SIM_QUINCENA_F2]);
/** D-2 del ENCAPS (jue antes del D-1 hábil): dress rehearsal 11:00-13:00 (§C3). */
export const D2_ENCAPS = ultimoHabilAntes(DERIVADOS_V6.d1HabilEncaps);
/** ¿Hoy el ENCAPS ocupa 11:00-13:00 (SIM 100Q de las 11:00 —v6.07: #6-#10— o dress rehearsal)? → SYNAPSE 13:00-13:30, como en los NBME. */
export const encapsOnceATrece = (iso: string): boolean => SIM_F2_11.has(iso) || iso === D2_ENCAPS;
/** v6.07 (fix): franja de Business en un día con el ENCAPS 11:00-13:00 que no manda el OUTPUT entero al sábado (SIM de lunes / miércoles de la
 *  quincena, D-2, o un viernes de lectura): 14:45-15:10 = la media hora que AURUM deja libre en F2 (14:15-14:45, 30′ desde el 4-ene; en F1 iba
 *  hasta las 15:15) antes del MIR 15:15 — el único hueco de 25′ que existe en TODA plantilla L-V de F2 entre el SYNAPSE 13:00-13:30 (empujado por el
 *  SIM), el R↔D 13:30-14:15, AURUM, MIR 15:15, el carril B 16:15 y LIVIANO 17:15 (07:15-11:00 queda libre a propósito: mañana de examen). */
export const BIZ_ENCAPS_11 = { ini: '14:45', fin: '15:10' } as const;
// v6.07 (fix rev. e5fd4bd): la franja de la CORRECCIÓN + CIERRE de los simulacros de F2 (antes franjaCorrSim11De, solo los de las 11:00) y la del
//   CIERRE SEMANAL viven en encapsFranjasF2.ts (franjaCorrSimDe / franjaCierreSemanalDe), fuente única del Home, del Horario y de los ítems.
/** v6.07 (fix): ¿el OUTPUT de Business de `f` va ENTERO al sábado? → día de NBME de F1 o VIERNES con el ENCAPS 11:00-13:00 (SIM #6/#7/#10);
 *  un OUTPUT de lunes-jueves con el SIM 11:00 va a 14:45 (BIZ_ENCAPS_11) y se cierra el sábado como cualquier otro (25′ + 15′). */
const outputEnteroAlSabado = (f: string): boolean => !!hitoDe(f)?.nbme || (encapsOnceATrece(f) && dow(f) === 5);
/** v6.08 (rev. est5): SYNAPSE A/B/C del sábado fuera de F1/transición/F2 (F3: sáb 20 y 27-mar) = 15:00, o al TERMINAR el cierre de Business de ese
 *  sábado si se le cruza (v6.08: sáb 20-mar 14:00-15:10, con el OUTPUT S15 del NBME 29 entero → SYNAPSE 15:10-15:40, dentro de 14:00-17:00). */
function synSabadoResto(iso: string, min: number): { franja: string; aviso: string } {
  const c = bizCierreDe(iso);
  const tras = !!c && c.fecha === iso && aMin(c.ini) < aMin('15:00') + min && aMin(c.fin) > aMin('15:00');
  const ini = tras && c ? c.fin : '15:00';
  return { franja: franjaDesde(ini, min), aviso: tras && c ? `Sábado: A/B/C a las ${ini}, al terminar el cierre de Business (${c.ini}-${c.fin}), o en cualquier tiempo muerto.${pcDomingoTxt(iso)}` : `Sábado: A/B/C a las 15:00 (o en cualquier tiempo muerto).${pcDomingoTxt(iso)}` };
}
/** v6.10 (c12, 18-nov): lo que el aviso del SYNAPSE de un sábado dice del PC del DOMINGO siguiente, según lo que ese domingo trae de verdad
 *  (vibePCDomingo): SHIP · avance · PC opcional del taper; '' si ese domingo no tiene PC (antes, «El SHIP del vibecoding es el domingo» fijo, también
 *  los sábados 20-feb, 27-feb, 6-mar y 20-mar de 2027, cuyo domingo solo trae el PC opcional del taper, y el 27-mar, sin PC). */
function pcDomingoTxt(sab: string): string {
  const pcs = vibePCDomingo(addDias(sab, 1)), main = pcs[pcs.length - 1];
  if (!main) return '';
  if (main.tipo === 'ship') return ' El SHIP del vibecoding es el domingo.';
  if (main.tipo === 'avance') return ' El avance del vibecoding es el domingo.';
  return pcs.some((x) => x.taper?.tipo === 'mantenimiento') ? ' El PC opcional del taper es el domingo.' : '';
}
/** v6.10 (c12, 18-nov): la tarde de un sábado de F2 en el aviso del SYNAPSE — el CARRIL SÁBADO ENCAPS solo si ese sábado lo tiene (encapsSabadoDe, el
 *  mismo dato con el que plantillasV6 pinta el bloque) y, sin carril, «preparar la clase» 14:45 si hay clase en vivo (sáb 6-mar-2027); antes, «14:00
 *  carril SÁBADO ENCAPS» fijo. */
function tardeSabadoF2Txt(sab: string, vivo: boolean): string {
  const cs = encapsSabadoDe(sab);
  return cs ? ` · ${cs.ini} carril SÁBADO ENCAPS` : vivo ? ' · 14:45 preparar la clase' : '';
}
/** Franja del SYNAPSE de L-V: 12:30 · UWSA1 07:25 (entre las 2 partes de la preparación del hito, guía de E1) · NBME 13:00 (almuerzo 12:30) ·
 *  v6.05 (fix): ENCAPS 11:00-13:00 de F2 (SIM #7/#8 · D-2) → 13:00 (antes 12:30, solapado 30′ con el SIM). */
export function synFranjaDe(iso: string, min = 30): { franja: string; aviso?: string } {
  // v6.07: el SÁBADO el SYNAPSE A/B/C ya no va dentro del PC (el PC pasó al domingo): 13:30-14:00 los sábados con la clase en vivo (antes de la
  //   revisión de las 14:00) · 15:00 en el resto (F2/F3: donde estaba dentro del PC)
  // v6.08 (rev. dia5): el aviso nombra «15:00-17:00 Theomed en vivo» solo si ese sábado HAY clase (theomedSabadoDe.vivo = el bloque theomed-vivo de
  //   plantillasV6; sáb 26-dic y 2-ene: sin clase) y «el Anki de las 21:30» solo si existe el bloque anki-sab (sábados de F1: plantillasV6 › extrasSabado(iso,
  //   true); el sáb 2-ene es TRANSICIÓN, sin Anki). En F2, mientras encapsManana no tenga datos de ese sábado (null), vale el calendario del campus: clase en
  //   vivo hasta el sáb 13-mar.
  const sabTh = dow(iso) === 6 ? theomedSabadoDe(iso) : null;
  const vivoTxt = (sabTh ? !!sabTh.vivo : faseV6(iso) === 'F2') ? ' · 15:00-17:00 Theomed en vivo' : '';
  if (dow(iso) === 6) return sabadoTheomed(iso)
    // v6.07b (mar 10-nov): sábado real de Joseph = gimnasio 08:30-14:00 · 14:00 revisión · 15:00-17:00 en vivo · baile 17:00-20:00 → A/B/C a las 21:00, al volver
    ? { franja: franjaDesde('21:00', min), aviso: `Sábado: A/B/C a las 21:00, al volver del baile (gimnasio 08:30-14:00 · 14:00 revisión${vivoTxt} · baile 17:00-20:00)${faseV6(iso) === 'F1' || ((FECHAS_V6.step1 as { f1_extra?: string[] }).f1_extra ?? []).includes(iso) /* v6.10: el sáb 2-ene (D13 del Step) también lleva el Anki de las 21:30 · tanda C: decisión 4 (el Step ya no usa el sáb 2-ene) quita step1.f1_extra → sin él, solo F1 (como la v6.09) */ ? '; después, el Anki de las 21:30' : ''}.${pcDomingoTxt(iso)}` }
    // v6.08 (14-nov-2026): F2 (ene-mar) — 15:00-17:00 es la clase EN VIVO de Theomed (repasos) y 14:00-15:00 el carril SÁBADO ENCAPS → A/B/C a las 21:00
    : faseV6(iso) === 'F2'
      ? { franja: franjaDesde('21:00', min), aviso: `Sábado de la intensiva: A/B/C a las 21:00, al volver del baile (04:15 STEP 1 VIVO · 07:15 revisión · gimnasio 08:30-14:00${tardeSabadoF2Txt(iso, !!vivoTxt)}${vivoTxt} · baile 17:00-20:00).${pcDomingoTxt(iso)}` }
      : synSabadoResto(iso, min);
  const h = hitoDe(iso);
  if (h?.uwsa) return { franja: franjaDesde('07:25', min), aviso: 'Hoy UWSA1 (08:50-13:00): el SYNAPSE se hace a las 07:25, entre las 2 partes de la preparación del hito (USMLE 07:15-07:25 y 07:55-08:50; esta es la única tarjeta SYNAPSE de hoy); a las 12:30 no hay SYNAPSE. El Calendar ya está en 07:25.' };
  if (h?.nbme) return { franja: franjaDesde('13:00', min), aviso: 'Día de NBME (07:00-12:30): almuerzo 12:30-13:00 y SYNAPSE 13:00-13:30 (guía USMLE del hito).' };
  if (encapsOnceATrece(iso)) return { franja: franjaDesde('13:00', min), aviso: `Hoy el ENCAPS va a la hora real del examen (${iso === D2_ENCAPS ? 'D-2 · DRESS REHEARSAL' : 'SIM 100Q'} 11:00-13:00): SYNAPSE 13:00-13:30, al terminar (como en los días de NBME); a las 12:30 no hay SYNAPSE.` };
  return { franja: franjaDesde('12:30', min) };
}
export function guiaSynapseDe(iso: string): GuiaBloque | null {
  const s = synDiaDe(iso);
  const w = dow(iso);
  // v6.09b (17-nov · a2-14): el DOMINGO DE LLEGADA (dom 22-nov) sí sale de aquí: el A/B/C que recupera el lun 16 y el sáb 21 (gen_synapse_plan.js ›
  //   RECUPERA_V609; antes en el PC del dom 29) va a HORA FIJA, al terminar la recuperación ENCAPS del viaje (16:30-17:00; nada desde las 17:00)
  const lleg = w === 0 ? domingoLlegadaDe(iso) : null;
  if (!s || (w === 0 && !lleg)) return null; // domingo → guiaShipDe (PC) + guiaFeynmanDe · v6.07: el sábado (A/B/C sin PC) sí sale de aquí
  const abc = s.bloques.filter((b) => b.tag === 'A' || b.tag === 'B' || b.tag === 'C');
  if (!abc.length) return null;
  const min = abc.reduce((a, b) => a + b.min, 0);
  const rcTxt = (() => { const m = abc.map((b) => / · recupera el (.+)$/.exec(b.leccion)).find(Boolean); return m ? m[1] : null; })();
  const { franja, aviso } = lleg
    // v6.10l (rev. c15, cambios #18): el dato delante y más corto (el Calendar corta el aviso en 240 y dejaba «El SHIP S1 del vibecoding es …»)
    ? { franja: franjaDesde(lleg.fin, min), aviso: `Domingo de llegada: este A/B/C recupera el ${rcTxt ?? 'día sin sesión'} a hora fija, tras la recuperación ENCAPS del viaje (${lleg.ini}-${lleg.fin}); nada de estudio desde las 17:00. ${(() => { const p1 = vibeProyectoDe(1); return p1 ? `SHIP S1 del vibecoding: ${fCorta(p1.ship)}.` : 'El SHIP S1 del vibecoding, el domingo que viene.'; })()}` }
    : synFranjaDe(iso, min);
  const pasos = abc.map((b) => pasoSyn(b, iso));
  const recursos = abc.filter((b) => b.url).map((b) => R(`${b.tag} · ${b.material}`, b.url as string, { min: b.min }));
  // v6.09 (joseph 9): 1.ª sesión del plan con días SIN SESIÓN antes (lun 16-nov) → sale como «día 2» en el hub (Misión del día N): se explica
  // v6.10 (17-nov-2026): con el lun 16 y el mar 17 sin sesión la 1.ª sesión es el mié 18 = «día 3»; el aviso nombra los días sin sesión y adónde va la
  //   sesión del mar 17 (SYN_REC_F1: la auditoría F0, sáb 28-nov 07:15)
  const previos = SYN_DIAS.filter((x) => x.d < s.d);
  const recPrev = SYN_REC_F1.find((r) => previos.some((x) => x.fecha === r.plan));
  // v6.10 · tanda C (decidido con Joseph en el chat SYNAPSE): la auditoría F0 del día sin sesión ABRE esta sesión (3′; la A queda en 12′)
  const auditHoy = s.bloques.find((b) => b.tag === 'A' && b.audit && /^AUDITORÍA F0/.test(b.leccion));
  const d2 = s.d > 1 && previos.every((x) => perdidoDelPlan(x.fecha)) // v6.10d: perdidoDelPlan (el mié 18 con alias no cuenta)
    ? (previos.length > 1
      ? `Primera sesión. Sale como día ${s.d} porque el día 1 era el ${fCorta(SYN_PLAN_META.inicio)}: ${previos.map((x) => fCorta(x.fecha)).join(' y ')} fueron sin sesión${auditHoy ? `${recPrev ? (recPrev.semana > 2 ? ` (el carril del martes corre una semana: sus piezas, el ${fCorta(addDias(recPrev.plan, 7))})` : ` (sus piezas del martes van el ${fCorta(recPrev.fecha)} a las ${recPrev.ini})`) : ''} y la auditoría F0 pendiente del ${fCorta(previos[previos.length - 1]!.fecha)} abre esta sesión (${auditHoy.min}′; la A queda en ${15 - auditHoy.min}′)` : recPrev ? ` y la auditoría F0 del ${fCorta(recPrev.plan)} va el ${fCorta(recPrev.fecha)} a las ${recPrev.ini}` : ''}; así la numeración de 2027 no cambia.${auditHoy ? ' Skilljar cierra a principios de diciembre: guarda antes los PDF de tus certificados viejos.' : ''}`
      : `Primera sesión. Sale como día ${s.d} porque el día 1 era el ${fCorta(SYN_PLAN_META.inicio)} (sin sesión, v6.09); así la numeración de 2027 no cambia.`) : '';
  return bloque(franja, 'synapse', `SYNAPSE S${s.semana} · ${s.fase.split('·')[0].trim()} — A pantalla · B audio · C lectura`, pasos, recursos,
    SYN_HECHO,
    { aviso: [d2, aviso, s.deload ? 'Semana DELOAD: si aprieta, solo A o solo B (PROTOCOLO_MODO_MINIMO).' : '', synFaseAvisoDe(iso)].filter(Boolean).join(' ') || undefined,
      planB: synPlanBDe(iso) });
}
/** v6.10 (17-nov-2026): SESIÓN DE RECUPERACIÓN del SYNAPSE a hora fija (synapseDailyPlan.SYN_REC_F1, gen_synapse_plan.js › REC_V610 = _fechas_v6.json ›
 *  corrida_s1.extra[fecha].synapse): v6.10c: dom 3-ene 05:00-05:30 (cadena del carril del martes: sus piezas son las del último martes de F1; FIX r1: su A =
 *  15′ medidos del vídeo que el comodín del sáb 2-ene dejó a medias, «Interpretability…» min 15:00-37:30 a 1,5×) · v6.10: sáb 28-nov 07:15-07:45 = la sesión del mar 17 (sin sesión) — tanda C: su A = 15′ de la siguiente lección de F0 sin ✓ (la auditoría abrió el mié 18) + la primera
 *  lección de F0 sin ✓) y las piezas B/C del carril del martes de la sem 2 (Dwarkesh × Dario 10:00-25:00 a 1,5× · Willison ≈530 palabras); cada paso
 *  trae su tramo medido (b.guia). Bloque «syn-rec» de plantillasV6 (lo pinta NÚCLEO); la sesión de las 21:00 de ese día es la suya (guiaSynapseDe). */
export function guiaSynapseRecDe(iso: string): GuiaBloque | null {
  const r = synRecDe(iso);
  if (!r) return null;
  const abc = r.bloques.filter((b) => b.tag === 'A' || b.tag === 'B' || b.tag === 'C');
  if (!abc.length) return null;
  const pasos = abc.map((b) => pasoSyn(b, iso));
  const recursos = abc.filter((b) => b.url).map((b) => R(`${b.tag} · ${b.material}`, b.url as string, { min: b.min }));
  // v6.10c · FIX r1 (hallazgo 1 de la revisión): la A de la sesión ya no es «la siguiente lección de F0 sin ✓» (el 3-ene no queda ninguna en la Academy):
  //   el aviso nombra el material real de la A (el vídeo que el comodín de ayer dejó a medias, medido por el generador)
  const aR = abc.find((b) => b.tag === 'A');
  const aTxt = aR && !aR.audit ? `${aR.min}′ en pantalla de ${aR.material.replace(/^Canal Anthropic · /, '')}, donde lo dejó el comodín de ayer a las 21:00` : '15′ de la siguiente lección de F0 sin ✓; la auditoría F0 abrió la sesión del mié 18-nov';
  const pc = vibePCDomingo(addDias(iso, dow(iso) === 0 ? 7 : 7 - dow(iso))).length ? addDias(iso, dow(iso) === 0 ? 7 : 7 - dow(iso)) : null;
  return bloque(`${r.ini}–${r.fin}`, 'synapse', `SYNAPSE · recuperación del ${fCorta(r.plan)} — A pantalla · B audio · C lectura`, pasos, recursos,
    SYN_HECHO,
    // v6.10c (cadena del carril del martes, decisión de Joseph del 17-nov 17:20): la sesión va el dom 3-ene 05:00 con las piezas del ÚLTIMO martes de F1
    //   (semana > 2; antes, sáb 28-nov 07:15 con las de la sem 2) → el aviso dice de qué martes son y cuándo es (antes de la rutina, el domingo)
    { aviso: r.semana > 2
      ? `Hoy, a hora fija (${r.ini}-${r.fin}), la sesión del SYNAPSE que el ${fCorta(r.plan)} no tuvo (fue sin sesión): su A (${aTxt}) y las piezas del carril del martes de la semana del ${fCorta(addDias(r.plan, 7 * (r.semana - 1)))}: el carril corrió una semana y esta es su última pieza de F1. Antes de la rutina de la mañana (05:45-07:15).`
      : `Hoy, a hora fija (${r.ini}-${r.fin}), la sesión del SYNAPSE del ${fCorta(r.plan)}, que fue sin sesión: su A (${aTxt}) y las piezas del martes que siguen a las del ${fCorta(addDias(r.plan, 7))}. Es aparte de la sesión de hoy a las 21:00. Tras la rutina de la mañana (05:45-07:15) y antes del gimnasio (08:30).`,
      planB: dow(iso) === 0 && vibePCDomingo(iso).length
        ? `Si a las ${r.ini} no puedes: B y C en el móvil en cualquier tiempo muerto de hoy (antes de las 17:00) y el A al PC de hoy (SHIP del vibecoding, flexible).`
        : `Si a las ${r.ini} no puedes: B y C en el móvil en cualquier tiempo muerto de hoy (antes de las 21:00) y el A ${pc ? `al PC del ${fCorta(pc)} (SHIP del vibecoding, flexible)` : 'al bloque PC de la semana'}.` });
}
/** v6.09b lote 1-quater (QS · hallazgo e de R2): plan B del SYNAPSE. En F1 (hasta el 3-ene) dice a qué PC va el A con fecha: el del PRIMER domingo
 *  posterior con PC (SHIP / avance del vibecoding, 2 h flexibles, que ya absorbe A/B/C de recuperación sin restarle minutos: dom 29-nov); antes «el bloque
 *  PC de la semana» y «deja A para mañana» (sin fecha y con el A de mañana ya lleno). Fuera de F1, el texto de siempre (2027 idéntico). */
/** v6.10 · BASE CERO (mié 18-nov-2026 · orden de Joseph «todos partimos de cero»): línea de FASE del SYNAPSE al FINAL del aviso (synapseDailyPlan ›
 *  SYN_FASES_BC; método y fuentes en DATA/SYNAPSE/METODO_BASE_CERO.md): en qué fase estás, cuándo es su gate y, el día del gate, qué se aprueba (preguntas
 *  solo REALES: «Course quiz» oficial de la Academy; sin quiz oficial, recall en blanco / Feynman) y adónde va si no sale. Solo F1 (hasta el 3-ene): las
 *  fases de 2027 viven en SYN_FASES_BC (la app las muestra) y su texto del Calendar no cambia. Fechas de PLAN (corridaTexto las pasa al día real). */
function synFaseAvisoDe(iso: string): string {
  if (!textosQSDe(iso)) return '';
  const f = synFaseBCDe(iso);
  if (!f) return '';
  const n = SYN_FASES_BC.length;
  if (f.gateFechas.includes(iso)) {
    // sin fechas futuras: va al final del aviso y el Calendar lo corta en 240 (control 26j); «el PC del domingo» = el siguiente (SHIP, flexible)
    // v6.10l (rev. c15, cambios #18): «Suspendido → PC del domingo» delante y corto (el corte en 240 dejaba «Si no lo apruebas: se repite en el PC …»)
    return `Base cero · hoy, GATE de la fase ${f.id}/${n} · ${f.corto}: ${f.gate}${/^«/.test(f.gate) ? ' Suspendido: al PC del domingo, solo lo fallado (la fase siguiente empieza en su fecha).' : ''}`;
  }
  return `Base cero · fase ${f.id}/${n}${f.desde === iso ? ' (empieza hoy)' : ''} · ${f.corto} · gate: ${f.gateCorto}.`;
}
function synPlanBDe(iso: string): string {
  let pc: string | undefined;
  // v6.10d (18-nov-2026): el domingo siguiente al día REAL (con el alias, la sesión del vie 27-nov se hace el lun 30: su PC es el del dom 6-dic, no el del 29)
  if (textosQSDe(iso)) for (let d = siguienteDow(fechaRealDe(iso, 'synapse'), 0), i = 0; i < 3 && !pc; d = addDias(d, 7), i++) if (vibePCDomingo(d).length) pc = d;
  return pc ? `Sin PC: B y C en el móvil y el A pasa al PC del ${fCorta(pc)} (SHIP del vibecoding, flexible). Academy/Skilljar caído: adelanta B + C y el A va también a ese PC del ${fCorta(pc)}.`
    : 'Sin PC: B y C en el móvil y A pasa al bloque PC de la semana. Academy/Skilljar caído: adelanta B + C y deja A para mañana.';
}
/** v6.09b lote 1-ter (S3 · hallazgo 1 de la revisión R): COLA del SYNAPSE de F1 con FRANJA REAL (synapseDailyPlan.synColaDe, generada por
 *  gen_synapse_plan.js › synapse_f1_tramos.js) — (a) SYN_COLA_F1: hueco de F1 con hora (sáb 26-dic 07:15-07:42: los 26:42 finales del deep dive, que no
 *  caben en los comodines de las 21:00) · (b) SYN_COLA_POST_STEP1: 04:15-04:45 L-V del lun 13-dic-2027 al mié 2-feb-2028 (v6.09b lote 1-quater: 38 días; desde el FIX r1 de la v6.10c el último es de 8′; en F5 el bloque A 04:05 del Step 1
 *  ya no existe y a esa hora no hay turno del SERUMS). Cada paso = sus piezas con el tramo exacto (minuto o párrafo) y sus minutos enteros; el generador
 *  garantiza Σ pasos = franja y necesario/asignado ∈ [0,85; 1,15]. Bloque «syn-cola» de plantillasV6 (bloqueSynCola). */
export function guiaSynapseColaDe(iso: string): GuiaBloque | null {
  const c = synColaDe(iso);
  if (!c) return null;
  const fL = (f: string): string => `${fCorta(f)}${f.slice(0, 4) !== iso.slice(0, 4) ? `-${f.slice(0, 4)}` : ''}`;
  const v = (x: number): string => (x === 1 ? '1,0' : String(x).replace('.', ','));
  const m1 = (x: number): string => x.toFixed(1).replace('.', ',');
  const post = SYN_COLA_POST_STEP1.findIndex((x) => x.fecha === iso);
  const pasos = c.pasos.map((p) => {
    const tipos = [...new Set(p.piezas.map((z) => z.tipo))];
    const que = `${tipos.map((t) => (t === 'audio' ? 'Audio' : 'Lectura')).join(' + ')} · ${p.piezas.map((z) => (z.tipo === 'audio' ? `${z.titulo} → min ${z.desde}-${z.hasta} a ${v(z.vel ?? 1)}×` : `${z.titulo} → ${z.desde} (≈${Math.round((z.palabras ?? 0) / 10) * 10} palabras)`)).join(' + ')}`;
    const como = p.piezas.map((z) => (z.tipo === 'audio'
      ? `${p.piezas.length > 1 ? `${z.titulo.replace(/^.*· /, '')}: ` : 'Auriculares, '}${v(z.vel ?? 1)}×${z.vel === 1 ? ' con subtítulos en inglés' : ''}, ${m1(z.med)}′ de reloj. Retoma donde paraste el ${fL(z.retoma)}.`
      : `${p.piezas.length > 1 ? `${z.titulo.replace(/^.*«|».*$/g, '')}: ` : ''}${z.palabras} palabras a 100/min ≈ ${m1(z.med)}′. Retoma donde quedaste el ${fL(z.retoma)}.`)).join(' ') + ' Anota dónde paras.';
    const z0 = p.piezas[0]!;
    return P(p.min, que, como, { t: z0.tipo === 'audio' ? `▶ desde ${z0.desde}` : '📄 abrir', url: z0.url });
  });
  const recursos = c.pasos.flatMap((p) => p.piezas.map((z) => R(z.titulo, z.url, { min: z.med })));
  const franja = `${c.ini}–${c.fin}`;
  if (post < 0) {
    return bloque(franja, 'synapse', 'SYNAPSE · audio que no cupo en los comodines del sábado (cola de F1)', pasos, recursos,
      `tramo escuchado entero, con el minuto anotado en el journal + ✓ en Estudio › SYNAPSE. ${SYN_REGLA_NOTAS}`,
      { aviso: `Sábado ${c.ini}-${c.fin}: tras la rutina de la mañana (05:45-07:15) y antes del gimnasio (08:30). Nada nuevo: es el final de una pieza de F1 que no cabe en los comodines de las 21:00.`,
        planB: (() => { // el hueco de la tarde del sábado (14:00-17:00) tras la revisión y el cierre de Business, si ese sábado no hay clase en vivo
          const bz = bizCierreDe(iso), tras = bz && bz.fecha === iso ? bz.fin : '14:30';
          // (synapse_f1_tramos.F1_EXTRA solo usa sábados SIN clase en vivo: sáb 26-dic)
          return `Si a las ${c.ini} no puedes: ${theomedSabadoDe(iso)?.vivo ? 'hoy hay clase en vivo y la tarde no tiene 27′ libres: 05:15, al terminar la L de AURUM' : `hoy no hay clase en vivo, así que va a las ${tras}, al terminar ${bz && bz.fecha === iso ? 'el cierre de Business' : 'la revisión semanal'}`}.`;
        })() });
  }
  const n = SYN_COLA_POST_STEP1.length;
  return bloque(franja, 'synapse', `SYNAPSE · cola post-Step 1 (día ${post + 1}/${n}) — lo que no cupo en su día (nov-2026 → ene-2027)`, pasos, recursos,
    `cada pieza con su parada anotada + ✓ en Estudio › SYNAPSE. ${SYN_REGLA_NOTAS}`,
    { aviso: `Nada nuevo: lo que no cupo en las sesiones del SYNAPSE de F1 (18-nov-2026 → 3-ene-2027), en orden y con su tramo exacto. ${c.ini}-${c.fin}: en F5 el bloque A del Step 1 (04:05) ya no existe y a esa hora no hay turno del SERUMS.${post === n - 1 ? ' Último día de la cola: con esto el SYNAPSE de F1 queda completo.' : ''}`,
      // v6.09b lote 1-quater FX1 (revisión V2): «en el tiempo muerto de la guardia» no era un destino (sin franja) → la cola SE CORRE un día por cada día de guardia,
      //   como la semana corrida (cada día conserva sus 30′ y su orden), y el último pasa al siguiente día libre tras su fin, a la misma hora (sin turno a las 04:15 en F5)
      planB: (() => { const fin = SYN_COLA_POST_STEP1[n - 1]!.fecha, dCom = addDias(fin, dow(fin) === 5 ? 3 : 1); return `Día de guardia (o turno que empieza antes de las 05:00): la cola se corre un día → estos pasos van mañana a las ${c.ini} y cada día siguiente lleva los del anterior; el último (día ${n}/${n}, ${fL(fin)}) pasa al ${fL(dCom)} ${c.ini}-${c.fin} (en F5 a esa hora no hay bloque ni turno).`; })() });
}

// ═══════════════════════ domingo (flexible) · SHIP del vibecoding (PC) + FEYNMAN — v6.07; hasta v6.06, sábado 15:00 ═══════════════════════
/** v6.08 (rev. dia7): inicio de la franja de EJEMPLO del SHIP del domingo (el bloque es flexible, sin hora). 14:45 → el SHIP de 2 h termina a las
 *  16:45, antes del Anki del domingo (16:45-17:00, F1; el ejemplo 15:00-17:00 de la v6.07 lo pisaba), con el Feynman 10′ antes (14:35). Si el ENCAPS
 *  opcional de ese domingo trae una franja de ejemplo que se cruza con 14:35-16:45 (v6.08: dom 6 y 13-dic, 14:45-16:45 · dom 20-dic, 12:15-16:20), el
 *  ejemplo va por la mañana: Feynman 07:15 y SHIP 07:25 (la revisión proponía Feynman 07:05, pero antes de las 07:15 está la rutina de caminata, ducha y
 *  desayuno). Lo usan guiaShipDe y guiaFeynmanDe. */
const SHIP_EJ = { tarde: '14:45', manana: '07:25', min: 120, feynmanMin: 10 } as const;
/** v6.08 (Calendar, rev. wf_2e9b037f-57c · 14-nov-2026): desde el dom 6-dic hay un compromiso fijo los domingos hasta las 14:45 → con el
 *  ejemplo de TARDE el Feynman ya no va 10′ antes del SHIP (14:35, lo pisaba) sino en sus 10′ iniciales (14:45-14:55, «al empezar el SHIP»).
 *  El ejemplo de mañana (07:15 Feynman + 07:25 SHIP) no cambia. Lo usan guiaFeynmanDe y check_rutina_guia.js (16). */
export const FEYNMAN_AL_EMPEZAR_DESDE = '2026-12-06';
/** v6.09b lote 1-quater FX1 (revisión V3): domingos de F1 sin compromiso que pise 14:35-14:45 (dom 27-dic: a las 12:00) → el Feynman
 *  vuelve justo ANTES del SHIP (14:35-14:45), como el 29-nov; antes iba en sus 10′ iniciales (14:45-14:55) y su hora de ejemplo se solapaba con la del SHIP.
 *  v6.10 (c12, 18-nov): sin el dom 3-ene — el Calendar tiene ese día un compromiso personal hasta las 14:45 y puso el Feynman 14:45-14:55, al empezar el
 *  SHIP (como los domingos de 2027): la app dice lo mismo (antes 14:35-14:45 «justo antes del SHIP», contra el Calendar). */
const FEYNMAN_ANTES_SHIP_F1 = new Set(['2026-12-27']);
export function feynmanAlEmpezarShip(iso: string): boolean {
  return iso >= FEYNMAN_AL_EMPEZAR_DESDE && shipEjemploIni(iso) === SHIP_EJ.tarde && !FEYNMAN_ANTES_SHIP_F1.has(iso);
}
export function shipEjemploIni(iso: string): string {
  // v6.09 (16-nov-2026): si ese domingo el SYNAPSE trae A/B/C (dom 29-nov, domingo de recuperación), el ejemplo de tarde empieza esos minutos antes
  //   (14:15 con 30′) para que el bloque —SHIP 2 h + A/B/C— siga terminando a las 16:45, antes del Anki del domingo
  const extra = (synDiaDe(iso)?.bloques ?? []).filter((b) => b.tag === 'A' || b.tag === 'B' || b.tag === 'C').reduce((x, b) => x + b.min, 0);
  const tarde = aHHMM(aMin(SHIP_EJ.tarde) - extra);
  const m = /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec(guiaEncapsDomingoDe(iso)?.franja ?? '');
  if (!m) return tarde;
  const a = aMin(tarde) - SHIP_EJ.feynmanMin, b = aMin(tarde) + SHIP_EJ.min + extra;
  if (!(aMin(m[1] as string) < b && aMin(m[2] as string) > a)) return tarde;
  // v6.10 (17-nov-2026): un domingo con bloques FIJOS de recuperación (corrida_s1.extra: dom 6-dic Research 05:00 · AURUM 07:15 · LIVIANO 08:15-09:00) →
  //   el ejemplo de mañana empieza al terminar el último (Feynman 10′ + SHIP 2 h: 09:00 · 09:10-11:10), sin pisarlos; sin ellos, 07:25 como siempre
  const finX = extraCorridaDe(iso).reduce((x, y) => Math.max(x, aMin(y.fin)), 0);
  return finX && finX + SHIP_EJ.feynmanMin > aMin(SHIP_EJ.manana) ? aHHMM(finX + SHIP_EJ.feynmanMin) : SHIP_EJ.manana;
}
/** v6.09b lote 1-quater FX1 (revisión V2 · planes B a franja llena): día de F1 al que el plan B del SHIP del domingo `dom` («sin PC el domingo») manda el verify
 *  (10′) y lo rojo: el lunes siguiente o, si ese lunes es el cierre de OTRO proyecto (doc + commit + preparar SHIP), el martes. Su vibecoding lo dice con los
 *  minutos (CONSTRUIR baja a 25′); si cae en 2027 (dom 3-ene → lun 4-ene, ya fuera de F1), el plan B del domingo se ACOTA («no shipped») y no lo manda. */
function shipPBDestDe(dom: string): string | null {
  if (dow(dom) !== 0) return null;
  const pcs = vibePCDomingo(dom); const main = pcs[pcs.length - 1];
  if (!main || main.tipo !== 'ship' || !main.proyecto) return null;
  const p = main.proyecto, lunSig = addDias(dom, 1), dSig = vibeDiaDe(lunSig);
  // v6.10 (17-nov-2026): −5 (antes −6): con el D1 en miércoles S1 cierra el MARTES 24 (dom − 5) y el lun 30 es el ship-prep de S2 → el verify de S1 va
  //   el mar 1-dic, como en la v6.09 (sin esto caía en el ship-prep del lun 30 y su «cómo» corría la fecha del SHIP S2 más allá del carácter 100)
  return dom <= FECHAS_V6.transicion.hasta && p.fin <= addDias(dom, -5) && dSig && dSig.tipo === 'ship-prep' && dSig.semana !== p.s ? addDias(dom, 2) : lunSig;
}
/** v6.10l (rev. c15, cambios #13 · vetadas #23): un criterio de aceptación en la lista del paso «CERRAR» del SHIP = lo que se comprueba (hasta la «→») y,
 *  si pasa de CRIT_MAX caracteres, cortado en el último fin de cláusula (o, si no hay, de palabra) con « …», sin conector colgando ni paréntesis / comillas
 *  abiertos (antes .slice(0, 70) partía la palabra: «PRONOSTICO_WALKFO», «asignatu», «imprime l»). El criterio entero sigue en el journal y en Estudio. */
const CRIT_MAX = 100;
const COLG_CRIT = /\s(?:a|al|de|del|en|con|por|para|y|o|e|u|el|la|los|las|lo|que|se|sin|su|sus|un|una|ni|no|cada|como|si|ya|desde|tras|hasta|más|\+|·|—|=|→|›)$/u;
const abiertoEn = (s: string, a: string, b: string): number => { const st: number[] = []; for (let i = 0; i < s.length; i++) { if (s[i] === a) st.push(i); else if (s[i] === b && st.length) st.pop(); } return st.length ? (st[0] as number) : -1; };
function colaCriterio(x: string): string {
  let r = x;
  for (let k = 0; k < 8; k++) {
    const y = r;
    const p = abiertoEn(r, '(', ')'); if (p >= 0) r = r.slice(0, p).trimEnd();
    const q = abiertoEn(r, '«', '»'); if (q >= 0) r = r.slice(0, q).trimEnd();
    const sq = /(?:^|[\s(])'(?=[\p{L}\d][^']*$)/u.exec(r); if (sq) r = r.slice(0, sq.index).trimEnd(); // 'texto' abierto (no «5'» de minutos)
    if ((r.match(/"/g) || []).length % 2) r = r.slice(0, r.lastIndexOf('"')).trimEnd();
    r = r.replace(/[\s,;:·+(—=→›]+$/u, '');
    const m = COLG_CRIT.exec(r); if (m) r = r.slice(0, m.index).trimEnd();
    if (r === y) break;
  }
  return r;
}
function critCorto(a: string): string {
  const x = (a.split('→')[0] ?? a).trim();
  if (x.length <= CRIT_MAX) return x;
  const c = x.slice(0, CRIT_MAX + 1);
  const z = Math.max(c.lastIndexOf(', '), c.lastIndexOf('; '), c.lastIndexOf(' · '), c.lastIndexOf(' ('), c.lastIndexOf(' + '), c.lastIndexOf(': '));
  let r = z >= CRIT_MAX * 0.5 ? colaCriterio(x.slice(0, z)) : '';
  if (r.length < CRIT_MAX * 0.5) r = colaCriterio(x.slice(0, c.lastIndexOf(' ')));
  return `${r} …`;
}
/** v6.07: PC del DOMINGO (SHIP · avance · PC opcional del taper; vibePCDomingo), flexible y sin hora fija: la franja de la guía es solo un ejemplo
 *  (shipEjemploIni; el bloque de plantillasV6 no tiene hora). Si ese día el SYNAPSE trajera A/B/C, van detrás (hoy el domingo solo trae R + PC). */
export function guiaShipDe(iso: string): GuiaBloque | null {
  if (dow(iso) !== 0) return null;
  if (domingoLlegadaDe(iso)) return null; // v6.09b: domingo de llegada (dom 22-nov): sin PC; su A/B/C de recuperación, a hora fija en guiaSynapseDe
  const pcs = vibePCDomingo(iso);
  const s = synDiaDe(iso);
  const abc = (s?.bloques ?? []).filter((b) => b.tag === 'A' || b.tag === 'B' || b.tag === 'C');
  const pcMin = (s?.bloques ?? []).filter((b) => b.tag === 'PC').reduce((a, b) => a + b.min, 0);
  if (!pcs.length && !abc.length) return null;
  const abcMin = abc.reduce((a, b) => a + b.min, 0);
  const main = pcs[pcs.length - 1];
  const pasos: GuiaPaso[] = [];
  const recursos: GuiaRecurso[] = [R(`journal ${vibeSemanaISO(iso)}.md`, vibeJournalUrl(iso))];
  const masABC = abc.length ? ' + SYNAPSE A/B/C' : '';
  let titulo = 'SYNAPSE del domingo';
  let hecho = 'A/B/C del SYNAPSE hechos';
  let aviso: string | undefined;
  let avisoF1 = ''; // v6.09 (rev. joseph 10)
  // v6.09b lote 1-quater (QS · e): en F1 el lunes del plan B va con fecha (dom 3-ene → «el lun 4-ene a las 04:15»); fuera de F1, el texto de siempre
  let planB = textosQSDe(iso) && addDias(iso, 1) > FECHAS_V6.transicion.hasta
    ? 'Sin PC el domingo: el proyecto queda escrito como no shipped en el journal, con lo que falte (el lun 4-ene ya es el vibecoding del proyecto siguiente y no se toca). Nunca se arrastra al proyecto siguiente.'
    : `Sin PC el domingo: ${textosQSDe(iso) ? `el ${fCorta(addDias(iso, 1))} a las 04:15` : 'el lunes 04:15'} empieza con el verify (10′) y cierra lo rojo; lo que no cierre queda escrito como no shipped. Nunca se arrastra al proyecto siguiente.`;
  const journal = { t: '📓 journal', url: vibeJournalUrl(iso) };
  // v6.10 · fix 18-nov (revisión de los frentes): el aviso del GATE del SYNAPSE (synFaseAvisoDe) manda el quiz oficial suspendido «al PC del domingo»; en F1
  //   este SHIP lo recoge: el domingo siguiente al día REAL de un gate con quiz oficial, el paso de cerrar/avanzar empieza por repetirlo (solo lo fallado), a
  //   cuenta de sus minutos (flexibles). Fechas de PLAN en el texto (corridaTexto las pasa al día real).
  const gatesQuiz = textosQSDe(iso)
    ? SYN_FASES_BC.flatMap((f) => (/^«/.test(f.gate) ? f.gateFechas.map((g) => ({ f, g, real: fechaRealDe(g, 'synapse') })) : []))
      .filter((x) => x.real < iso && x.real >= addDias(iso, -6) && (synDiaDe(x.g)?.bloques ?? []).some((b) => /quiz/i.test(b.leccion ?? '') && !/no trae quiz/i.test(b.leccion ?? ''))) // solo los gates cuyo día trae el quiz
    : [];
  // v6.10e (revisión del 18-nov · regresiones-5): «fase n/6 del SYNAPSE» (en una guía de vibecoding, «fase 2» chocaba con sus fases PRIMM «fase 2/3»)
  const gateTxt = (min: number): string => (gatesQuiz.length
    ? `0) SI el quiz oficial del GATE ${gatesQuiz.map((x) => `de la fase ${x.f.id}/${SYN_FASES_BC.length} del SYNAPSE (${fCorta(x.g)})`).join(' o el ')} quedó suspendido: repítelo solo con las lecciones falladas (≈ 5-10′${gatesQuiz.length > 1 ? ' cada uno' : ''}, a cuenta de estos ${min}′; la fase siguiente ya empezó en su fecha). `
    : '');
  if (main && (main.tipo === 'ship' || main.tipo === 'avance') && main.proyecto) {
    const p = main.proyecto;
    // v6.09: el domingo es flexible → el A/B/C del SYNAPSE (dom 29-nov, domingo de recuperación) va APARTE, sin restarle minutos al SHIP (hasta la v6.06 el
    //   PC y el A/B/C compartían la franja fija del sábado 15:00-17:00; desde la v6.07 ningún domingo traía A/B/C)
    const shipMin = pcMin >= 120 ? 120 : pcMin || 120;
    const manual = p.verificacion.map((v, i) => (v.tipo === 'manual' ? i + 1 : 0)).filter(Boolean);
    titulo = `${main.tipo === 'ship' ? `SHIP S${p.s} · ${p.nombre}` : `AVANCE S${p.s} (aún no termina)`}${masABC} · domingo, sin hora fija`;
    p.docs.forEach((d) => recursos.push(R(d.label, d.url)));
    if (main.tipo === 'ship') {
      pasos.push(
        P(5, 'ABRIR el journal de la semana + leer los criterios de aceptación', `\`${JOURNAL_CMD}\` → cabecera «Criterios de aceptación» (${p.aceptacion.length}).`, journal),
        P(10, `VERIFY en seco: node DATA/_scripts/verify_vibecoding.js ${p.s} --dry`, 'Desde D:\\joseph-md-app. Lista los criterios ✓/✗ sin escribir nada.'),
        // v6.10l (rev. c15, cambios #17 · diffs #37): en F1 la prioridad del plan B va delante en una cláusula corta y su detalle (minutos de cada pendiente)
        //   detrás de los criterios, para que el Calendar (corte del «cómo» a 110) enseñe el criterio (1) y no «… a cuenta de estos 80′: los A …»
        P(shipMin - 40, 'CERRAR lo que el verify marque en rojo', `${gateTxt(shipMin - 40)}${textosQSDe(iso) ? 'Si hubo días sin PC, su plan B va primero. Luego, en orden' : 'En el orden de los criterios'}: ${((l) => (/…$/.test(l) ? l : `${l}.`))(p.aceptacion.map((a, i) => `(${i + 1}) ${critCorto(a)}`).join(' · '))}${textosQSDe(iso) ? ` El plan B sale de estos ${shipMin - 40}′: cada A del SYNAPSE, 15′; cada paso de vibecoding, 35′.` : ''} Si todo está verde, el tiempo que sobra es libre (o haces el Feynman).`),
        P(10, manual.length ? `VERIFY definitivo con el criterio manual ${manual.join(',')} visto` : `VERIFY definitivo: node DATA/_scripts/verify_vibecoding.js ${p.s}`,
          manual.length ? `${p.verificacion[manual[0] - 1]?.resumen ?? 'comprobación manual'} → si lo viste: \`node DATA/_scripts/verify_vibecoding.js ${p.s} --ok-manual ${manual.join(',')}\` → SHIPPED ${p.verificacion.length}/${p.verificacion.length}. Pega en la consola de la app el one-liner que imprime (guarda 'jmd-vibe-ship').`
            : 'Escribe el resultado en DATA/SYNAPSE/_vibecoding_ship.json; pega en la consola de la app el one-liner que imprime.'),
        P(15, 'JOURNAL · «Cierre de semana»', `shipped sí/no · criterios x/${p.verificacion.length} · evidencia (commit/URL/test) · lección de la semana (1 línea). Lo que no cerró NO pasa a S${p.s + 1}.`, journal),
      );
      hecho = `verify_vibecoding.js ${p.s} con SHIPPED ${p.verificacion.length}/${p.verificacion.length} (o el fallo escrito en el journal)${masABC}`;
      // v6.09 (rev. joseph 10): en F1 cada proyecto cerró un hábil más tarde (D1 mar 17-nov) → su último día («doc + commit + preparar SHIP») es el LUNES y el
      //   SHIP sigue siendo el domingo siguiente, con el proyecto siguiente ya en curso. Se acepta el desfase y el texto lo dice; el plan B no pisa el lunes
      //   de cierre del proyecto siguiente.
      // v6.10 (17-nov-2026): también un cierre en MARTES (dom − 5) cuando el lunes siguiente es el ship-prep de otro proyecto (S1 cierra el mar 24-nov con
      //   el D1 en mié 18; el lun 30 es el cierre de S2), como shipPBDestDe; el dom 3-ene (S6 cierra el mar 29-dic, lun 4 no es ship-prep) sigue igual
      if (iso <= FECHAS_V6.transicion.hasta && (p.fin <= addDias(iso, -6) || (p.fin <= addDias(iso, -5) && vibeDiaDe(addDias(iso, 1))?.tipo === 'ship-prep' && vibeDiaDe(addDias(iso, 1))?.semana !== p.s))) {
        const sig = vibeProyectoDe(p.s + 1);
        avisoF1 = `SHIP S${p.s} hoy, tras su cierre del ${fCorta(p.fin)} (doc + commit + preparar SHIP): en F1 ${dow(p.fin) === 1 ? 'cada proyecto cierra en lunes (todo corrió un hábil en la v6.09)' : `S${p.s} cierra en ${['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][dow(p.fin)]} (el D1 fue el ${fCorta(VIBE_META.inicio)})`} y su SHIP va el domingo siguiente${sig ? `, con S${sig.s} ya en curso` : ''}. Hoy solo se cierra S${p.s}.`; // FX1: sin «(cierra el …)», que caía en la pos. ≈320 del aviso (el Calendar lo corta a 240)
        const lunSig = addDias(iso, 1), dSig = vibeDiaDe(lunSig);
        if (dSig && dSig.tipo === 'ship-prep' && dSig.semana !== p.s) planB = `Sin PC el domingo: el verify (10′) y lo rojo de S${p.s} van el ${fCorta(addDias(iso, 2))} a las 04:15 (el ${fCorta(lunSig)} es el cierre de S${dSig.semana} —doc + commit + preparar SHIP— y no se toca); lo que no cierre queda escrito como no shipped. Nunca se arrastra al proyecto siguiente.`;
        else planB = `Sin PC el domingo: el ${fCorta(lunSig)} a las 04:15 empieza con el verify (10′) de S${p.s} y cierra lo rojo; lo que no cierre queda escrito como no shipped. Nunca se arrastra al proyecto siguiente.`; // v6.09b lote 1-quater (QS · e): con fecha (antes «el lunes 04:15»: dom 27-dic y 3-ene)
      }
    } else {
      pasos.push(
        P(5, 'ABRIR el journal y ver qué paso del proyecto falta', `\`${JOURNAL_CMD}\`; el proyecto termina el ${p.fin} y su SHIP es el ${p.ship}.`, journal),
        P(shipMin - 15, `AVANZAR S${p.s}: los pasos que faltan`, `${gateTxt(shipMin - 15)}${VIBE_COMO_TIPO.construir} Hoy no hay verify (aún no termina).`),
        P(10, 'JOURNAL · qué avanzó + qué falta', '3 líneas.', journal),
      );
      hecho = `avance del proyecto escrito en el journal${masABC}`;
    }
    if (abcMin) aviso = `Hoy, además del ${main.tipo === 'ship' ? 'SHIP' : 'avance'} (${shipMin}′), el SYNAPSE trae ${abcMin}′ de A/B/C${(() => { const m = abc.map((b) => /· recupera el (.+)$/.exec(b.leccion)).find(Boolean); return m ? ` (recupera el ${m[1]})` : ''; })()}: van al final y por separado (el domingo es flexible). Si el verify da verde antes, el resto es libre.`;
  } else if (pcs.length) {
    // taper: PC opcional (30′ mantenimiento · 0′ deload) — pueden ser 2 (S16 desplazado + S17).
    // v6.05 (fix 24-oct): la guía nombra TODAS las piezas PC del sábado (sáb 20-feb-2027: S16 30′ + S17 0′); antes la de 0′ no aparecía en
    //   ningún sitio (sin paso, sin título, sin aviso). Las de 0′ van en el título y en el aviso (un paso no puede durar 0′).
    //   v6.07: lo mismo el DOMINGO (dom 7-mar-2027: S16 30′ + S17 0′). Un domingo con SOLO piezas de 0′ y sin A/B/C no tiene guía (Σ = 0′):
    //   plantillasV6 lo dice en las notas del día.
    const piezas: string[] = []; const ceros: string[] = [];
    for (const x of pcs) {
      const t = x.taper;
      if (!t) continue;
      const m = t.tipo === 'mantenimiento' ? 30 : 0;
      piezas.push(`S${t.s} ${m}′`);
      if (m) pasos.push(P(m, `PC opcional · taper S${t.s} · ${t.nombre}`, `node DATA/_scripts/verify_vibecoding.js --sensores → todo verde o 1 mejora pequeña al rojo; journal. ${t.shipTxt}`, journal));
      else ceros.push(`S${t.s} · ${t.nombre} (deload total): PC de 0′ — ${t.shipTxt}`);
    }
    const hayPC = pasos.length > 0;
    const lista = piezas.length > 1 ? ` (${piezas.join(' · ')})` : '';
    titulo = hayPC ? `PC opcional del taper${lista}${masABC} · domingo, sin hora fija` : `SYNAPSE A/B/C (taper: PC de 0′${lista})`;
    hecho = hayPC ? `sensores en verde (o el rojo anotado)${masABC}` : 'SYNAPSE A/B/C';
    if (ceros.length) aviso = `Además hoy: ${ceros.join(' · ')}`;
  }
  abc.forEach((b) => pasos.push(pasoSyn(b, iso)));
  abc.filter((b) => b.url).forEach((b) => recursos.push(R(`${b.tag} · ${b.material}`, b.url as string, { min: b.min })));
  const total = sumMin(pasos);
  if (!total) return null;
  const ej = shipEjemploIni(iso); // v6.08 (rev. dia7): 14:45 (antes 15:00, encima del Anki del domingo 16:45-17:00) o 07:25 si el ENCAPS ocupa la tarde
  const flexTxt = `Domingo flexible: sin hora fija, a la hora que puedas (la franja ${franjaDesde(ej, total).replace('–', '-')} es solo un ejemplo).`;
  return bloque(franjaDesde(ej, total), 'vibecoding', titulo, pasos, recursos, hecho, { aviso: [flexTxt, avisoF1, aviso].filter(Boolean).join(' '), flex: 2, planB });
}
export function guiaFeynmanDe(iso: string): GuiaBloque | null {
  if (dow(iso) !== 0) return null;
  const s = synDiaDe(iso);
  const r = s?.bloques.find((b) => b.tag === 'R' && b.min >= 10 && /^Feynman/.test(b.material));
  if (!s || !r) return null;
  const journal = { t: '📓 journal', url: vibeJournalUrl(iso) };
  // v6.07 (fix lote 1b del Calendar): el Feynman es del proyecto del PC de ESE domingo (gen_synapse_plan.js › bloqueDom, misma regla que el PC:
  //   el que hace SHIP o, si ninguno cierra, el que está en curso) y el «qué» lo nombra — antes «qué construiste esta semana», y el dom 3-ene el
  //   SHIP es de S7 (terminó el lun 28-dic) mientras S8 ya está en curso. check_rutina_guia.js comprueba que Feynman y PC hablan del mismo S.
  const pcs = vibePCDomingo(iso); const main = pcs[pcs.length - 1];
  const sFey = Number((/proyecto S(\d+)/.exec(r.material) ?? [])[1]);
  const quePy = main?.proyecto && main.s === sFey
    ? (main.tipo === 'ship' ? `qué construiste en S${sFey} (el proyecto que hace SHIP hoy)` : `lo que llevas construido de S${sFey} (su SHIP es el ${fCorta(main.proyecto.ship)})`)
    : 'qué construiste esta semana';
  // v6.07: el domingo es flexible (sin hora fija): la franja es solo un ejemplo, justo antes del SHIP (lo que no sabes explicar = lo que falta)
  // v6.08 (rev. dia7): 10′ antes del ejemplo del SHIP (shipEjemploIni): 14:35 (antes 14:50) o 07:15 los domingos con el ENCAPS de tarde
  // v6.08 (Calendar): desde el dom 6-dic, con el ejemplo de tarde, en los 10′ iniciales del SHIP (14:45-14:55) — feynmanAlEmpezarShip
  const alEmpezar = feynmanAlEmpezarShip(iso);
  const feyIni = alEmpezar ? shipEjemploIni(iso) : aHHMM(aMin(shipEjemploIni(iso)) - r.min);
  return bloque(franjaDesde(feyIni, r.min), 'vibecoding', `FEYNMAN (opcional) · ${r.material.replace(/^Feynman · /, '')}`, [
    P(Math.ceil(r.min / 2), `Explica en voz alta ${quePy} y CÓMO funciona (sin mirar el código)`, 'Grábate 1 toma en el móvil (≤5 min). Si te trabas en un punto, ese es el hueco real.'),
    P(r.min - Math.ceil(r.min / 2), 'Journal: línea «qué falta» + 3 líneas de Feynman', 'Sección «Cierre de semana» del journal.', journal),
  ], [R(`journal ${vibeSemanaISO(iso)}.md`, vibeJournalUrl(iso))], 'la grabación hecha y la línea «qué falta» escrita (opcional: si descansas, márcalo ✓ igual)', {
    aviso: `Opcional y sin hora fija (${franjaDesde(feyIni, r.min).replace('–', '-')} es solo un ejemplo): ${alEmpezar ? 'mejor al empezar el SHIP' : 'mejor justo antes del SHIP'} del vibecoding, porque lo que no sabes explicar es lo que falta.`,
  });
}

// ════════════════════════════════════════ 14:15 · AURUM ════════════════════════════════════════
interface Vid { id: string; t: string; canal: string; s: number }
/** Semanas 1-2 (D1-D10): vídeos CONCRETOS (el plan enlaza el CANAL en 98 de sus 130 bloques A). Título, canal y duración leídos de YouTube el
 *  18-oct-2026. D11-D130 sin curar: la guía da una regla fija de elección y lo avisa (ampliar esta tabla = misma verificación). Clave = D del
 *  plan AURUM (no la fecha): v6.06 D1-D5 = lun 2 → vie 6-nov · D6-D10 = lun 9 → vie 13-nov (v6.05: lun 26 → vie 30-oct · lun 2 → vie 6-nov · v6.03: mié 21 → mar 27-oct · mié 28-oct → mar 3-nov). */
const AURUM_VID: Record<number, { vids: Vid[]; nota: string }> = {
  1: { vids: [{ id: 'PtPo5V-aBKI', t: 'Everything is Sales - Grant Cardone', canal: 'Grant Cardone', s: 129 }, { id: 'H7eevPm8WJo', t: 'Advice for Sales People - Grant Cardone', canal: 'Grant Cardone', s: 575 }], nota: 'Anota 3 frases textuales que le dirías a un lead de ALLPA/Qori.' },
  2: { vids: [{ id: 'urZVPdf3brs', t: 'I Trained Sales 2 Hours a Day for 5 Years', canal: 'Grant Cardone', s: 491 }, { id: 'NY9_i7TzXLQ', t: '3 Rules to Master Sales - Grant Cardone', canal: 'Grant Cardone', s: 120 }], nota: 'Anota la regla de actividad diaria que te llevas (1 línea).' },
  3: { vids: [{ id: 'YqT2Kb3jUIQ', t: "Believe In What You're Selling", canal: 'Grant Cardone', s: 115 }, { id: '-8W_BQai2aw', t: 'Sales - Best Sales Book Ever Sell or Be Sold', canal: 'Grant Cardone', s: 185 }, { id: 'NmGRMGDIOIU', t: 'The Two Things You Must Believe --Playbook to Millions', canal: 'Grant Cardone', s: 88 }, { id: 'Wxfq71FIrTQ', t: 'Why Product Knowledge is Important - Whatever it Takes Sneak Preview', canal: 'Grant Cardone', s: 115 }], nota: 'Los 3′ que sobran: escribe las 2 frases de Cardone sobre convicción que usarás en el drill.' },
  4: { vids: [{ id: '7NMH1oAkgLY', t: 'Giving Away Free Stuff Will Make You Rich', canal: 'Alex Hormozi', s: 741 }, { id: 'JfbtySq6_B4', t: 'Sell Anything To Anyone With This Unusual Method', canal: 'Alex Hormozi', s: 434 }], nota: 'Anota qué «regala» un operador en tu negocio (1 línea): es la base del PITCH v1.' },
  5: { vids: [{ id: '9hdptAKBUoI', t: 'THE 10X RULE (by Grant Cardone) Top 7 Lessons | Book Summary', canal: 'TopSevenLessons', s: 312 }, { id: 'u9OhOsyHYVI', t: 'How to 10X Your Life - Grant Cardone', canal: 'Grant Cardone', s: 146 }], nota: 'Los 4′ que sobran: las 7 lecciones, 1 línea cada una (sin mirar).' },
  // semana 2 del plan (D6-D10; v6.06: lun 9 → vie 13-nov · v6.05: lun 2 → vie 6-nov · v6.03: mié 28-oct → mar 3-nov · v6.02: lun 26 → vie 30-oct), mismo criterio
  6: { vids: [{ id: 'JwdQw6jCJ0I', t: 'How to Handle Rejection - Grant Cardone', canal: 'Grant Cardone', s: 109 }, { id: 'jHa7B_Gc1p0', t: 'The Secret of How to Get Over Rejection - Grant Rant #182', canal: 'Grant Cardone', s: 140 }, { id: 'GpvI8Cnzzws', t: 'How to Handle Rejection in Sell or Be Sold Audio', canal: 'Grant Cardone', s: 72 }, { id: 'sBy4KCBpBkQ', t: 'How to Always Get a Yes - Grant Cardone', canal: 'Grant Cardone', s: 140 }], nota: 'Los 4′ que sobran: escribe tu frase para el próximo «no» de un lead (sin discutir).' },
  7: { vids: [{ id: 'NCH-iDdD9MU', t: 'How to Pitch Your Products with Enthusiasm', canal: 'Grant Cardone', s: 285 }, { id: 'iUEzMXQeT0k', t: 'How to Win in Anything--Grant Cardone', canal: 'Grant Cardone', s: 133 }, { id: 'cqwyIVmSM5A', t: 'What it Takes to be Successful', canal: 'Grant Cardone', s: 154 }], nota: 'Anota 1 gesto de energía GENUINA que copiarás en la toma de hoy.' },
  8: { vids: [{ id: 'SBF0nZ_Kfag', t: '5 Tips to Become the BEST Salesperson - Grant Cardone', canal: 'Grant Cardone', s: 855 }], nota: 'Anota los 5 tips en 5 líneas; marca el que más te cuesta.' },
  9: { vids: [{ id: 'ThSFgC_4NVA', t: 'How to sell a product - The most PURSUASIVE tactic you can use...', canal: 'Alex Hormozi', s: 575 }, { id: 'bx48qPlaGvE', t: 'My Best Sales Tactic (to Make a TON of Money)', canal: 'Alex Hormozi', s: 491 }], nota: 'Anota el RESULTADO que venderás en el PITCH (no el producto), en 1 línea.' },
  10: { vids: [{ id: 'VO9BkqF2ta8', t: 'Your Numbers Matter - Grant Cardone Coaching', canal: 'Grant Cardone', s: 822 }], nota: 'Anota los 3 números que medirá tu tablero.' },
};
/** Lectura L de la semana 1: plan B verificado (OverDrive/Libby pide carné de biblioteca). v6.10 · tanda C: las L de Pink (D1 · D2 · D4 · D6 · D9) ya no
 *  tienen plan B «Wharton desde donde lo dejaste» (tras la D1 solo quedaban 2:48): van EN VÍDEO como plan principal (AURUM_F1_LVID). */
const AURUM_L_PLANB: Record<number, string> = {
  5: 'Sin carné de biblioteca (OverDrive/Libby): «THE 10X RULE SUMMARY» (The Swedish Investor, 12:26) — youtube.com/watch?v=vlF0CucyBv8.',
};
/** v6.10 · tanda C (17-nov-2026 · HECHO VERIFICADO por el chat AURUM con la API de préstamos de Archive.org: «To Sell Is Human» NO se presta —
 *  tosellishumansur0000pink_r0s8 y _t9g0: is_lendable false, is_printdisabled true, max_lendable_copies 0: solo lectores con discapacidad visual—): las L de
 *  Pink de F1 van EN VÍDEO con tramos MEDIDOS (lengthSeconds y capítulos publicados de YouTube, curl del 17-nov-2026, sin sesión), 25′ exactos a 1,0× por L
 *  (los minutos del plan): lo que cabe a las 14:15 y lo que va al sábado 04:15 se cortan por minuto, en orden. D1 = el texto que el chat AURUM le dio a
 *  Joseph. Por tema: D2 (cap. 2-3: todos vendemos, «seller beware») · D4 (cap. 4: Attunement) · D6 (cap. 5: Buoyancy) · D9 (cap. 6: Clarity). Las L de
 *  los cap. 7-9 (D11 · D12 · D13 · D15) y la D40 (2027) NO tienen vídeo público por capítulo: ⚠ decisión de Joseph (comprar el libro o más material
 *  público medido) — lo avisan (AURUM_PINK_SIN_VIDEO). */
interface AurumLSeg { id: string; t: string; canal: string; a: number; b: number; caps: string }
const PINK_VID = {
  pg: { id: 'D5lq6qctevQ', t: 'TO SELL IS HUMAN by Daniel Pink', canal: 'Productivity Game' }, // 7:20
  wh: { id: 'J6EjBwrdHgE', t: 'Daniel Pink & Adam Grant Interview', canal: 'Knowledge at Wharton' }, // 20:28
  bb: { id: 'nKrBitIQrgo', t: "Daniel Pink: Why You're in Sales Even If You're Not", canal: 'Behind the Brand' }, // 1:18:32 (keynote de Pink, 2013; capítulos publicados)
  sm: { id: '-GWatCOVDCk', t: 'The New ABCs of Selling - Dan Pink To Sell is Human', canal: 'SalesMasteryMag' }, // 43:30 (entrevista a Pink; capítulos publicados)
  vv: { id: 'fduhoQwkoys', t: 'To Sell Is Human by Daniel Pink - A Visual Summary', canal: 'Verbal to Visual' }, // 15:55 (resumen; capítulos publicados)
};
const pinkSeg = (v: { id: string; t: string; canal: string }, a: number, b: number, caps: string): AurumLSeg => ({ ...v, a, b, caps });
const AURUM_F1_LVID: Record<number, { cap: string; segs: AurumLSeg[]; textoD1?: { que: string; como: string } }> = {
  1: { cap: 'cap. 1', segs: [pinkSeg(PINK_VID.pg, 0, 440, 'resumen del libro'), pinkSeg(PINK_VID.wh, 0, 1060, 'por qué todos vendemos')],
    // el texto exacto que el chat AURUM le dio a Joseph para la L del D1 (mié 18-nov, 14:48, 25′)
    textoD1: { que: 'LECTURA L — Pink, «To Sell Is Human», cap. 1 (en vídeo)',
      como: 'Archive.org no presta este libro (solo a lectores con discapacidad visual), así que va en vídeo: «TO SELL IS HUMAN by Daniel Pink» (Productivity Game, 7:20, youtube.com/watch?v=D5lq6qctevQ) → «Daniel Pink & Adam Grant Interview» (Knowledge at Wharton, youtube.com/watch?v=J6EjBwrdHgE) de 0:00 a 17:40 = 25′. La cifra «1 de cada 9» compruébala en la transcripción gratuita de Knowledge@Wharton (https://knowledge.wharton.upenn.edu/article/daniel-pink-on-why-to-sell-is-human/) y apunta el párrafo o el minuto.' } },
  2: { cap: 'cap. 2-3', segs: [pinkSeg(PINK_VID.wh, 1060, 1228, 'final de la entrevista'), pinkSeg(PINK_VID.bb, 197, 1529, '«Introduction to sales» → «Seller beware» + el arranque de «The new ABCs»')] },
  4: { cap: 'cap. 4: Attunement', segs: [pinkSeg(PINK_VID.bb, 1529, 3029, '«The new ABCs» · «Attunement study» · «Attunement techniques»')] },
  6: { cap: 'cap. 5: Buoyancy', segs: [pinkSeg(PINK_VID.sm, 358, 1528, '«The new ABCs» · «Attunement and empathy» · «Building buoyancy»'), pinkSeg(PINK_VID.vv, 183, 513, '«Attunement» · «Buoyancy» · «Optimistic explanatory style» · arranque de «Clarity»')] },
  9: { cap: 'cap. 6: Clarity', segs: [pinkSeg(PINK_VID.sm, 1528, 2610, '«Clarity in communication» · «Improv and interaction» · «The ethics of service» · «Sales as a profession»'), pinkSeg(PINK_VID.vv, 513, 931, '«Clarity: Defining problems» · «Pitching your ideas» · «Types of pitches» · «Improvising and serving» · «Conclusion»')] },
};
/** v6.10 · tanda C: L de Pink sin vídeo público por capítulo (el libro no se presta): avisan de la decisión pendiente de Joseph. */
const AURUM_PINK_ARCHIVE = 'tosellishumansur0000pink';
const AURUM_PINK_SIN_VIDEO = '⚠ L pendiente de decisión de Joseph: Archive.org no presta «To Sell Is Human» (solo a lectores con discapacidad visual) y estos capítulos no tienen vídeo público medido (comprar el libro o material público).';
const mmssL = (x: number): string => `${Math.floor(x / 60)}:${String(Math.round(x) % 60).padStart(2, '0')}`;
/** Tramos [desde, hasta) segundos de la secuencia de vídeos de una L (en orden). */
function pinkTramo(segs: AurumLSeg[], desde: number, hasta: number): AurumLSeg[] {
  const out: AurumLSeg[] = []; let t = 0;
  for (const g of segs) {
    const d = g.b - g.a, a = Math.max(desde, t), b = Math.min(hasta, t + d);
    if (b > a) out.push({ ...g, a: g.a + (a - t), b: g.a + (b - t) });
    t += d;
  }
  return out;
}
const pinkTxt = (xs: AurumLSeg[]): string => xs.map((g) => `«${g.t}» (${g.canal}) de ${mmssL(g.a)} a ${mmssL(g.b)}`).join(' → ');
const pinkMin = (segs: AurumLSeg[]): number => Math.round(segs.reduce((a, g) => a + g.b - g.a, 0) / 60);
// ── v6.09b (lote 1-bis · S2, 17-nov-2026): AURUM en F1 = TIEMPO ↔ MATERIAL ─────────────────────────────────────────────────────────────────
//   Joseph: «no puede haber poco tiempo con mucho material ni mucho tiempo con poco material». En F1 (D1-D32, 60′ a las 14:15) la lectura L que no
//   cabía quedaba como «lectura de huecos (no es núcleo)», sin fecha (272′ en 27 sesiones, a2-1). Ahora: (1) lo que no cabe va al SÁBADO de esa
//   semana 04:15 (bloque «AURUM · L de la semana», antes de la rutina 05:45-07:15 y del gimnasio; el sáb 21-nov es viaje → la semana del 17 va al
//   28-nov); (2) el audiolibro de Tracy (D16-D32) va como UN hilo con hora exacta a 1,25×; (3) el A que el plan enlazaba a páginas sin medir o
//   a un tráiler va con material concreto medido (AURUM_F1_A); (4) el resumen de HubSpot, por capítulos medidos. Desde el 4-ene (min30) nada cambia.
/** Audiolibro «The Psychology of Selling» (Brian Tracy) que el plan reparte en F1 (A de D16 · D29 · D31 y la L de D16-D32): un solo vídeo de
 *  8:51:07 (31.867 s, lengthSeconds leído de YouTube el 17-nov-2026), sin capítulos → tramos con hora exacta a 1,25× (1′ de franja = 75 s de
 *  audio). Lo que el plan le da en F1 (A 64′ + L 364′ = 428′) ≈ el libro entero a 1,25× (425′): termina el jue 31-dic. */
const TRACY = { id: 'i0B4v-9fLQc', s: 31867, vel: 1.25, t: '«The Psychology Of Selling» (Brian Tracy, audiolibro completo, 8:51:07)' };
const esTracy = (b?: AurumBloque): boolean => !!b && (b.url ?? '').includes(TRACY.id);
const hms = (s: number): string => `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(Math.round(s) % 60).padStart(2, '0')}`;
/** A medido en F1 donde el plan enlazaba páginas sin medir (Wikipedia de Joe Girard = 458 palabras, sin la Ley de los 250 ni las tarjetas «I like
 *  you»; la página del Automotive Hall of Fame carga por JavaScript y no se puede medir) o un vídeo mucho más corto que su bloque (D20: el «Session»
 *  de MasterClass es un tráiler de 1:54 para 22′). Medido el 17-nov-2026: lengthSeconds de YouTube y palabras de la API de Wikipedia. Minutos del
 *  bloque A = vídeos a 1,0× + palabras / 100 (redondeo hacia arriba); lo que sobra o falta frente al plan sale de / va a la lectura L del día. */
interface AurumAMed { t: string; canal: string; url: string; s?: number; palabras?: number }
const AURUM_F1_A: Record<number, { items: AurumAMed[]; nota: string; min?: number }> = {
  20: { items: [{ t: 'Win Workplace Negotiations with Chris Voss | Sessions by MasterClass', canal: 'MasterClass', url: yt('2gBboDdtTlc'), s: 114 }, { t: 'Make Them Listen: How To Use Your Tone To Control Their Reactions', canal: 'Chris Voss & The Black Swan Group', url: yt('_eZlQCDNx30'), s: 804 }], nota: 'El primero es solo el tráiler (1:54): el tono aplicado está en el segundo. Anota 3 frases donde el tono baja al final.' },
  26: { items: [{ t: 'Joe Girard — Wikipedia (EN: intro · Early life · Career · Awards)', canal: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Joe_Girard', palabras: 458 }, { t: "The World's Greatest Salesperson - Joe Girard", canal: 'Selling Today', url: yt('n66XgJ80yuM'), s: 203 }], nota: 'Es el «perfil de Girard» del drill: anota los 13.001 autos y en qué estaba su ventaja.' },
  27: { items: [{ t: "The Rule of 250: How the World's Greatest Salesman Never Lost a Lead", canal: 'Wealth Wisdom Books', url: yt('8hvN_u5savs'), s: 603 }, { t: 'The Law of 250 - Success in Selling', canal: 'Michael Dill', url: yt('xe3c9nUyypc'), s: 337 }], nota: 'La Ley de los 250 no está en la página de Wikipedia del plan: va con estos 2 vídeos.' },
  28: { items: [{ t: "How to Get More Repeat Sales (Joe Girard's 13,000 Cards a Month)", canal: 'Simple-Growth', url: yt('dHVHGX2jEP8'), s: 169 }, { t: 'Lessons from the Best Salesman in the World', canal: 'goalrichdad', url: yt('wUVP7rQ0WZU'), s: 301 }], nota: 'Las tarjetas mensuales «I like you» no están en la página de Wikipedia del plan: el 1.er vídeo es ese sistema.' },
  30: { items: [{ t: "13 Sales Tips from Joe Girard: World's Greatest Salesman", canal: 'The Business Guy', url: yt('_vOdePXsFVY'), s: 727 }], nota: 'Repaso del sistema: marca los tips que ya aplica tu máquina de rapport.' },
  // v6.09b lote 1-ter (S3 · residuo de la revisión R): D18 · D22 · D25 (jue 10 · mié 16 · lun 21-dic) enlazaban la MISMA playlist «Chris Voss' Favorite
  //   Negotiation Hacks» con una búsqueda «≤ 20 min» → salía el mismo vídeo tres veces. Ahora, vídeos DISTINTOS y medidos (lengthSeconds y capítulos
  //   publicados de YouTube, curl 17-nov-2026, sin sesión), uno por tema del día; `min` = los minutos del plan (lo que sobra es para anotar, ratio 0,95-0,98).
  18: { items: [{ t: 'How to Succeed at Hard Conversations | Chris Voss — caps. «Negotiation Mindset, Playfulness» + «Calm Voice, Emotional Shift, Music» (min 4:59 → 18:59)', canal: 'Huberman Lab', url: yt('q8CHXefn7B4', 299), s: 840 }, { t: 'Importance Of TONE In Negotiations | Derek Gaunt', canal: 'Chris Voss & The Black Swan Group', url: yt('RJjnkxvbxaI'), s: 236 }, { t: 'Chris Voss Technique: The Late Night Radio DJ Tone', canal: 'Michael Foster', url: yt('QqVu9AfyZuY'), s: 60 }], min: 20, nota: 'Las 3 voces del propio Voss: la juguetona/positiva (cap. «Playfulness»), la de DJ de madrugada (cap. «Calm Voice») y la asertiva (el tono, con Derek Gaunt); el último, 1 minuto de ejemplos de inflexión. Anota 1 frase de apertura en cada voz.' },
  22: { items: [{ t: 'Chris Voss Teaches The Stealth Power of "Mirrors" in Negotiation', canal: 'Chris Voss & The Black Swan Group', url: yt('wIBc2T2RKSA'), s: 267 }, { t: 'How to Succeed at Hard Conversations | Chris Voss — cap. «Tool: Mirroring Technique» (min 2:15:27 → 2:22:20)', canal: 'Huberman Lab', url: yt('q8CHXefn7B4', 8127), s: 413 }, { t: 'The Mirroring Technique | Chris Voss - The Black Swan Group - Part 2', canal: "The Entrepreneur's Studio", url: yt('SJ2az4HxlTs'), s: 120 }, { t: 'The Basics of Mirroring (Derek Gaunt - Negotiations Trainer, Black Swan Group)', canal: 'Evolved Broker Podcast', url: yt('TvCFc3oo84A'), s: 119 }, { t: 'Mastering the Art of Black Swan Mirroring', canal: 'Press 1 For Nick', url: yt('c10wgAZaPI4'), s: 242 }], min: 20, nota: 'Solo mirroring, en 5 voces distintas (Voss, Gaunt y un practicante): anota las 1-3 últimas palabras que repetirías a 3 frases típicas de tus leads.' },
  25: { items: [{ t: 'How to Succeed at Hard Conversations | Chris Voss — cap. «Readiness & “Small Space Practice”, Labeling» (min 1:37:35 → 1:45:17)', canal: 'Huberman Lab', url: yt('q8CHXefn7B4', 5855), s: 462 }, { t: 'Using Labels To Find Out The Why Behind Their Behavior | Troy Smith', canal: 'Chris Voss & The Black Swan Group', url: yt('qdIA-QxCX_4'), s: 536 }, { t: 'Camille Vasquez Explains How to Deal with Someone Who Uses Mirror to Confuse You!', canal: 'Chris Voss & The Black Swan Group', url: yt('W54KA8Seeyk'), s: 249 }, { t: 'Chris Voss Demonstrates Mirrors and Labels on Swarfcast Podcast', canal: 'Swarfcast', url: yt('vKWN9_M2FoM'), s: 42 }], min: 22, nota: 'Repaso integrado para el role-play: labeling (Voss y Troy Smith), el mirror cuando te lo hacen a ti, y 42 s del propio Voss encadenando mirror + label. Anota la secuencia que usarás: mirror → silencio → label → silencio.' },
};
/** L medida en F1: el resumen de HubSpot «A 10-Minute Summary of The Psychology of Selling» (2.322 palabras, contadas por capítulo el 17-nov-2026). */
const AURUM_F1_L: Record<number, { que: string; palabras: number }> = {
  3: { que: 'HubSpot · «A 10-Minute Summary of The Psychology of Selling» › intro (107 palabras) + Chapter 1 Inner Game (346) + 2 Goals (285) + 3 Why People Buy (361) + 4 Creative Selling (266) = 1.365 palabras', palabras: 1365 },
  8: { que: 'HubSpot · mismo resumen › Chapter 5 Appointments (226 palabras) + 6 Suggestion (123) + 7 Making the Sale (464) + 8 Ten Keys (126) + 2.ª pasada del Chapter 1 Inner Game: autoconcepto y miedo al rechazo (346) = 1.285 palabras', palabras: 1285 },
};
/** Minutos del bloque A de una sesión (los mismos que pinta guiaAurumDe). */
function aurumAMin(x: DiaAurum): number {
  const A = x.bloques.find((b) => b.tag === 'A');
  if (!A) return 0;
  const med = !x.min30 ? AURUM_F1_A[x.d] : undefined;
  if (med) return med.min ?? Math.ceil(med.items.reduce((s, i) => s + (i.s ?? 0) / 60 + (i.palabras ?? 0) / PPM_EN, 0)); // v6.09b lote 1-ter: + min fijo (D18 · D22 · D25)
  const cur = AURUM_VID[x.d];
  const seg = cur ? cur.vids.reduce((s, v) => s + v.s, 0) : 0;
  // v6.09b (lote 1-bis S2): en F1 el vídeo curado manda también si dura MENOS que el estimado del plan (lo que sobra va a la L), salvo que su nota
  //   ya reparta esos minutos («Los 3′ que sobran: …» → paso ANOTAR aparte); desde el 4-ene, igual
  return seg && !x.min30 && !/^Los \d+′ que sobran:/.test(cur ? cur.nota : '') ? minDe(seg) : Math.max(A.min, seg ? minDe(seg) : 0);
}
interface AurumF1Dia { d: number; fecha: string; aMin: number; lin: number; fuera: number; sab: string | null; adelantado: boolean; tracyA?: [number, number]; tracyL?: [number, number] }
interface AurumLSab { sab: string; ini: string; fin: string; min: number; items: Array<{ x: DiaAurum; min: number }>; tracy: { min: number; seg: [number, number]; dias: number[]; adelantados: number[] } | null }
let AURUM_F1_CACHE: { dias: Map<string, AurumF1Dia>; sabs: Map<string, AurumLSab> } | null = null;
/** Reparto de F1 (memo): por sesión, minutos de A y de L que caben en los 60′ (misma cuenta que guiaAurumDe) y lo que no cabe → sábado 04:15 de su
 *  semana; el hilo de Tracy (A de D16/D29/D31 + L de D16-D32 + sábados) con sus tramos. El último sábado con Tracy (26-dic) lleva lo que falte para
 *  terminar el libro (incluida, adelantada, la parte que no cabe del 28 al 31-dic: no hay sábado de F1 después). */
function aurumF1(): { dias: Map<string, AurumF1Dia>; sabs: Map<string, AurumLSab> } {
  if (AURUM_F1_CACHE) return AURUM_F1_CACHE;
  const W = 60, INI_SAB = '04:15';
  const xs = AURUM_DIAS.filter((x) => !x.min30 && x.fecha <= FECHAS_V6.transicion.hasta);
  const dias = new Map<string, AurumF1Dia>();
  const sabs = new Map<string, AurumLSab>();
  if (!xs.length) return (AURUM_F1_CACHE = { dias, sabs });
  const listaSab: string[] = [];
  // v6.10c (decisión de Joseph del 17-nov 17:20): el SÁBADO QUE RECUPERA a hora fija (corrida_s1.extra; sáb 2-ene = la última sesión de F1 de cada frente,
  //   AURUM D32 a las 14:30) no es sábado de «L de la semana»: su 04:15 es del vibecoding y no le quedan minutos → lo que no cabe del 28-dic al 2-ene va
  //   ADELANTADO al último sábado de F1 con L (sáb 26-dic, hilo de Tracy), como ya pasaba con el 28-31-dic
  for (let s = siguienteDow(addDias((xs[0] as DiaAurum).fecha, -1), 6); s <= (xs[xs.length - 1] as DiaAurum).fecha; s = addDias(s, 7)) if (!sabadoLibre(s) && !SKIP_V6.has(s) && !motivoProtegido(s) && !extraCorridaDe(s).length) listaSab.push(s);
  for (const s of listaSab) sabs.set(s, { sab: s, ini: INI_SAB, fin: INI_SAB, min: 0, items: [], tracy: null });
  for (const x of xs) {
    const L = x.bloques.find((b) => b.tag === 'L');
    const PR = x.bloques.find((b) => b.tag === 'PRAC');
    const aMin = aurumAMin(x);
    let fijo = aMin + (PR ? PR.min : 0) + (x.liviano ? x.liviano.min : 0);
    if (fijo > W && x.liviano) fijo -= x.liviano.min; // como guiaAurumDe (lvFuera)
    const margen = fijo + 3 <= W;
    const libre = fijo >= W ? 0 : W - fijo - (margen ? 3 : 0);
    const tr = esTracy(L);
    const lPlan = L ? (AURUM_F1_L[x.d] ? Math.ceil((AURUM_F1_L[x.d] as { palabras: number }).palabras / PPM_EN) : L.min) : 0;
    const lin = !L ? 0 : tr ? (libre >= 3 ? libre : 0) : (libre >= 5 ? Math.min(lPlan, libre) : 0);
    const fuera = Math.max(0, lPlan - lin);
    // v6.10d (18-nov-2026): el sábado SIGUIENTE AL DÍA REAL (con el alias, la sesión del vie 4-dic se hace el lun 7: lo que no cabe va al sáb 12, no al 5)
    let sab = listaSab.find((s) => s > fechaRealDe(x.fecha, 'aurum')) ?? null;
    let adelantado = false;
    if (!sab && tr && fuera > 0) { sab = listaSab[listaSab.length - 1] ?? null; adelantado = true; }
    dias.set(x.fecha, { d: x.d, fecha: x.fecha, aMin, lin, fuera, sab: fuera > 0 ? sab : null, adelantado });
    const S = fuera > 0 && sab ? sabs.get(sab) : undefined;
    if (S && tr) { S.tracy = S.tracy ?? { min: 0, seg: [0, 0], dias: [], adelantados: [] }; S.tracy.min += fuera; (adelantado ? S.tracy.adelantados : S.tracy.dias).push(x.d); }
    else if (S) S.items.push({ x, min: fuera });
  }
  // hilo de Tracy: total del libro a 1,25× − lo que va en las 14:15 − los sábados anteriores = el último sábado con Tracy
  const TOT = Math.ceil(TRACY.s / 60 / TRACY.vel);
  const ev: Array<{ fecha: string; orden: number; min: number; set: (t: [number, number]) => void }> = [];
  let enFranja = 0;
  for (const x of xs) {
    const r = dias.get(x.fecha) as AurumF1Dia;
    if (esTracy(x.bloques.find((b) => b.tag === 'A'))) { enFranja += r.aMin; ev.push({ fecha: x.fecha, orden: 0, min: r.aMin, set: (t) => { r.tracyA = t; } }); }
    if (esTracy(x.bloques.find((b) => b.tag === 'L')) && r.lin > 0) { enFranja += r.lin; ev.push({ fecha: x.fecha, orden: 1, min: r.lin, set: (t) => { r.tracyL = t; } }); }
  }
  const conT = listaSab.filter((s) => (sabs.get(s) as AurumLSab).tracy);
  const ultT = conT[conT.length - 1];
  if (ultT) (sabs.get(ultT) as AurumLSab).tracy!.min = Math.max(0, TOT - enFranja - conT.slice(0, -1).reduce((a, s) => a + (sabs.get(s) as AurumLSab).tracy!.min, 0));
  for (const s of conT) { const T = (sabs.get(s) as AurumLSab).tracy!; if (T.min > 0) ev.push({ fecha: s, orden: 0, min: T.min, set: (t) => { T.seg = t; } }); }
  // v6.10d: el hilo se reparte en orden de día REAL (alias: el jue 24-dic de plan se hace el lun 28, después del sábado 26)
  const rfT = (f: string): string => fechaRealDe(f, 'aurum');
  ev.sort((a, b) => (rfT(a.fecha) < rfT(b.fecha) ? -1 : rfT(a.fecha) > rfT(b.fecha) ? 1 : a.orden - b.orden));
  let cur = 0;
  ev.forEach((e, i) => { const fin = i === ev.length - 1 ? TRACY.s : Math.min(TRACY.s, cur + e.min * 60 * TRACY.vel); e.set([cur, fin]); cur = fin; });
  for (const S of sabs.values()) {
    if (S.tracy && S.tracy.min <= 0) S.tracy = null;
    S.min = S.items.reduce((a, it) => a + it.min, 0) + (S.tracy ? S.tracy.min : 0);
    S.fin = aHHMM(aMin(S.ini) + S.min);
  }
  return (AURUM_F1_CACHE = { dias, sabs });
}
/** v6.09b (lote 1-bis S2): bloque del SÁBADO de F1 con la lectura L de AURUM que no cupo a las 14:15 de su semana (04:15, antes de la rutina 05:45).
 *  null si ese sábado no tiene nada pendiente. Lo pinta plantillasV6 (bloque 'aurum-l') y lo guía guiaAurumSabadoDe. */
export function aurumLSabadoDe(iso: string): { ini: string; fin: string; min: number } | null {
  const S = aurumF1().sabs.get(iso);
  return S && S.min > 0 ? { ini: S.ini, fin: S.fin, min: S.min } : null;
}
/** Destino legible de lo que no cabe hoy («sáb 28-nov 04:15-05:05»). */
function aurumDestinoDe(r: AurumF1Dia | undefined): string {
  const S = r?.sab ? aurumF1().sabs.get(r.sab) : undefined;
  return S ? `${fCorta(S.sab)} ${S.ini}-${S.fin} (AURUM · L de la semana)` : 'el próximo sábado 04:15 (AURUM · L de la semana)';
}
export function guiaAurumSabadoDe(iso: string): GuiaBloque | null {
  const S = aurumF1().sabs.get(iso);
  if (!S || S.min <= 0) return null;
  const pasos: GuiaPaso[] = [];
  const recursos: GuiaRecurso[] = [];
  for (const it of S.items) {
    const L = it.x.bloques.find((b) => b.tag === 'L') as AurumBloque;
    const pb = AURUM_L_PLANB[it.x.d];
    const med = AURUM_F1_L[it.x.d];
    const nada = !(aurumF1().dias.get(it.x.fecha)?.lin);
    const lv = AURUM_F1_LVID[it.x.d]; // v6.10 · tanda C: L de Pink en vídeo → el tramo exacto que no cupo a las 14:15
    if (lv) {
      const lin = aurumF1().dias.get(it.x.fecha)?.lin ?? 0, tot = lv.segs.reduce((a, g) => a + g.b - g.a, 0);
      const resto = pinkTramo(lv.segs, lin * 60, tot);
      pasos.push(P(it.min, `L · Pink, «To Sell Is Human», ${lv.cap} (en vídeo) — los ${it.min}′ que no cupieron el ${fCorta(it.x.fecha)} (D${it.x.d})`,
        `${pinkTxt(resto)}, a 1,0× con subtítulos en inglés: ${nada ? 'empieza por el principio' : 'sigue desde donde paraste'} y anota el minuto. Archive.org no presta este libro (solo a lectores con discapacidad visual).`, { t: '▶ tramo', url: yt(resto[0]!.id, resto[0]!.a) }));
      for (const g of resto) if (!recursos.some((r) => r.url === yt(g.id))) recursos.push(R(`${g.t} (${g.canal})`, yt(g.id)));
      continue;
    }
    pasos.push(P(it.min, `L · ${med ? med.que.split(' › ')[0] : L.leccion} — ${nada ? `los ${it.min}′ del ${fCorta(it.x.fecha)} (D${it.x.d}: a las 14:15 no cupo nada), desde el inicio` : `los ${it.min}′ que no cupieron el ${fCorta(it.x.fecha)} (D${it.x.d}), desde donde marcaste`}`,
      `${(L.url ?? '').includes(AURUM_PINK_ARCHIVE) ? '⚠ Pendiente de una decisión de Joseph: Archive.org no presta este libro (solo a lectores con discapacidad visual) y estos capítulos no tienen vídeo público medido. ' : ''}${L.formato === 'audio' ? 'Audio/lectura' : 'Lectura'} activa: ${nada ? 'empieza por el principio' : 'sigue desde la marca de ese día'} y marca dónde terminas.${pb ? ` Plan B: ${pb}` : ''}`, L.url ? { t: 'L ↗', url: L.url } : undefined));
    if (L.url && !recursos.some((r) => r.url === L.url)) recursos.push(R((L.url ?? '').includes(AURUM_PINK_ARCHIVE) ? 'L · Archive.org (NO se presta: solo lectores con discapacidad visual)' : `L · ${L.material}`, L.url)); // v6.10 · tanda C
  }
  if (S.tracy) {
    const T = S.tracy;
    const ds = T.dias.map((d) => `D${d}`).join(' · ');
    const ad = T.adelantados.length ? AURUM_DIAS.filter((x) => T.adelantados.includes(x.d)) : [];
    // v6.10 (c12, 18-nov): la sesión siguiente del hilo se busca en orden de día REAL (alias corrida_s1: el lunes real hace el plan del viernes; en orden
    //   de plan el sábado saltaba ese lunes: «Sigue → mar 15-dic» en vez del lun 14-dic). El texto lleva su FECHA DE PLAN (la app la pinta con su día real).
    const rf = (f: string): string => fechaRealDe(f, 'aurum');
    const sig = [...aurumF1().dias.values()].filter((r) => rf(r.fecha) > iso && (r.tracyA || r.tracyL)).sort((a, b) => (rf(a.fecha) < rf(b.fecha) ? -1 : rf(a.fecha) > rf(b.fecha) ? 1 : 0))[0];
    // el tramo ADELANTADO se nombra por días REALES y sin día de la semana («del 28-dic al 2-ene»: así la app no lo vuelve a traducir)
    const fR = (real: string): string => fCorta(real).replace(/^\S+ /, '');
    const adR = ad.map((x) => rf(x.fecha)).sort();
    pasos.push(P(T.min, `ESCUCHAR · ${TRACY.t} — tramo ${hms(T.seg[0])}–${hms(T.seg[1])} (${T.min}′ a 1,25×)`,
      // v6.09b lote 1-ter (revisión R, hallazgo 5): las fechas (adónde sigue el hilo y qué días se adelantan), al principio del «cómo»
      `${sig ? `Sigue → ${fCorta(sig.fecha)}, desde ${hms((sig.tracyA ?? sig.tracyL as [number, number])[0])}. ` : 'Con este tramo terminas el libro. '}${ad.length ? `Incluye, ADELANTADO, lo de las sesiones ${adR.length > 1 ? `del ${fR(adR[0]!)} al ${fR(adR[adR.length - 1]!)}` : `del ${fR(adR[0]!)}`} (${ad.some((x) => extraCorridaDe(dow(x.fecha) === 6 ? x.fecha : siguienteDow(x.fecha, 6)).length) ? 'el sábado siguiente es el que recupera, sin sitio para la L' : 'no hay sábado de F1 después'}). ` : ''}${ds ? `Es lo que el plan daba a la L de ${ds} y no cupo a las 14:15.` : 'Hilo del libro.'} Audio activo: 1 frase por idea que usarías con un lead.`,
      { t: '▶ tramo', url: yt(TRACY.id, T.seg[0]) }));
    recursos.push(R(TRACY.t, yt(TRACY.id), { min: T.min }));
  }
  return bloque(`${S.ini}–${S.fin}`, 'aurum', `AURUM · L de la semana (${S.min}′: lo que no cupo a las 14:15)`, pasos, recursos,
    'cada tramo leído o escuchado, con su marca (página o minuto) en la nota ◆ del día',
    { aviso: `Sábado ${S.ini}, antes de la rutina (05:45-07:15) y del gimnasio (08:30): la lectura L de AURUM que no cupo en las 14:15 de esta semana${sabadoLibre(addDias(iso, -7)) ? ` y de la anterior (el ${fCorta(addDias(iso, -7))} no hubo sesión: viaje)` : ''}. Ya no queda nada como «lectura de huecos» sin fecha.` });
}
/** v6.05 (fix 24-oct-2026): AURUM en F4 (SERUMS) = 30′ en el TIEMPO MUERTO del turno, justo DESPUÉS de los 30′ de R↔D (DJ-4), y no a la franja
 *  nominal 14:15–14:45 de F2/F3 (en el turno M chocaba con el almuerzo 13:40-14:30 y con el bloque B del Step 1 14:30-16:00). `rd` = bloque R↔D
 *  del día (plantillasV6): R↔D de tiempo muerto «07:00–13:00» (M) → ventana de AURUM 07:30–13:00 (guía 07:30–08:00) · T 13:00–19:00 → 13:30 ·
 *  T 12:00 → 12:30 · T 14:00 → 14:00 · L (R↔D fijo 16:20–16:50) → 16:50–17:20 · G (guardia, sin hora) → null (tiempo muerto sin hora). */
export function ventanaAurumF4(rd: { ini: string | null; fin: string | null; hora: string } | null | undefined): { ini: string; fin: string; tm: boolean } | null {
  if (!rd || !rd.ini || !rd.fin) return null;
  if (/tiempo muerto/i.test(rd.hora)) return { ini: aHHMM(aMin(rd.ini) + 30), fin: rd.fin, tm: true };
  return { ini: rd.fin, fin: aHHMM(aMin(rd.fin) + 30), tm: false };
}
/** Inicio por defecto de la guía de AURUM en F4 (sin bloque: turno M sin marcar = PISO) — sale de FRANJAS_F4.M, no de una hora fija. */
const AURUM_F4_INI = (() => {
  const rd = (FRANJAS_F4.M ?? []).find((f) => f.frente === 'research-derma');
  const m = rd ? /(\d{2}:\d{2})\s*[–-]\s*(\d{2}:\d{2})/.exec(rd.hora) : null;
  return ventanaAurumF4(m ? { ini: m[1] as string, fin: m[2] as string, hora: rd!.hora } : null)?.ini ?? '07:30';
})();
/** v6.08 (14-nov-2026): inicio de la guía de AURUM en un día de HITO de F4 con el bloque sin hora (plantilla H, turno T o sin marcar): tras la guía
 *  nominal del R↔D de F4 (13:30–14:00, researchGuia / dermaGuia), en el tiempo muerto de la posta 13:00-19:00 → 14:00. */
const AURUM_F4_HITO_INI = '14:00';
function kwDe(leccion: string): string {
  return leccion.replace(/^.*?canal oficial:\s*/i, '').replace(/^(ver\s+)?(1\s+)?clip (corto\s+)?(sobre|de)\s+/i, '').replace(/\(.*?\)/g, '').trim().slice(0, 70);
}
/** v6.10e (18-nov-2026 · BASE CERO, orden de Joseph «todos partimos de cero»): AURUM por ETAPAS de un closer que empieza —A escucha y preguntas (F1-F3)
 *  → B oferta y objeciones (F4-F5) → C cierre (F6-F7)— con un criterio OBSERVABLE de paso de fase sobre los ítems de AURUM_RUBRICA_PITCH del PITCH de
 *  cierre (los ítems de etapas posteriores salen 0 por diseño: el total /12 solo manda desde el PITCH v6). Cuaderno NotebookLM «AURUM · ventas desde cero»
 *  (18-nov: Rackham/Huthwaite · Voss · Hormozi CLOSER · Gong · Tracy). Síntesis y fuentes: DATA/AURUM/METODO_BASE_CERO.md. En la guía: aviso de F1 + PITCH. */
const AURUM_BASE_CERO: Record<string, { etapa: string; que: string; pasa: string; items: string }> = {
  // v6.10 · fix 18-nov (revisión de los frentes): las etapas se nombran «fase AURUM n/7» (antes «F1/F2/F3», las siglas de las fases del RÉGIMEN: F2 = intensiva
  //   ENCAPS) y el criterio de la fase 1 es uno solo (items = pasa; antes el drill pedía además «tono que baja al final», la voz de DJ que se enseña en la fase 2)
  f1: { etapa: 'A1 · juego interno', que: 'aún no se cierra nada: tolerar el «no», contar contactos y transferir certeza (Tracy, Pink, Bettger)', pasa: 'a la fase AURUM 2 con el Manifiesto escrito, el PITCH v1 grabado con 3 mejoras anotadas frente a tu 1.ª toma y ≥ 5 días reales en el tablero de actividad', items: 'Manifiesto escrito + PITCH v1 grabado con 3 mejoras anotadas frente a tu 1.ª toma + ≥ 5 días reales en el tablero de actividad; los 6 ítems de la rúbrica son de etapas siguientes y salen 0 por diseño' },
  f2: { etapa: 'A2 · escucha', que: 'escuchar antes de hablar: tono de DJ, mirror, label y resumen hasta el «así es» (Voss)', pasa: 'a la fase AURUM 3 cuando el PITCH v2 saca 2 en «Empatía táctica» y ≥ 1 en «Hablaste < 40 %»', items: '«Empatía táctica» = 2 y «Hablaste < 40 %» ≥ 1; el resto de ítems aún no cuenta' },
  f3: { etapa: 'A3 · preguntas', que: 'SPIN y preguntas calibradas: que el prospecto diga su problema y su implicación antes de oír tu solución (Rackham, Hormozi)', pasa: 'a la fase AURUM 4 con 2 en «Hablaste < 40 %» y 2 en «SPIN en orden» en el PITCH v3', items: '«Hablaste < 40 %» = 2 y «SPIN en orden» = 2' },
  f4: { etapa: 'B1 · oferta', que: 'ecuación de valor, stack, garantía y ancla (Hormozi, Cialdini)', pasa: 'a la fase AURUM 5 con 2 en «Oferta» en el PITCH v4', items: '«Oferta» = 2 sin bajar de 1 en los ítems de la etapa A' },
  f5: { etapa: 'B2 · objeciones', que: 'label + prueba + pregunta calibrada, nunca discutir (Voss, Hormozi)', pasa: 'a la fase AURUM 6 con 2 en «Objeciones sin discutir» en el PITCH v5', items: '«Objeciones sin discutir» = 2' },
  f6: { etapa: 'C1 · cierre', que: 'pedir un compromiso concreto con fecha y callar (Hormozi, Huthwaite)', pasa: 'a la fase AURUM 7 con 2 en «Cierre / compromiso» y ≥ 10/12 en el PITCH v6', items: '«Cierre / compromiso» = 2 y total ≥ 10/12' },
  f7: { etapa: 'C2 · integración', que: 'cierre por DM y presentación maestra', pasa: 'al final del programa con el PITCH v7 ≥ 10/12', items: 'total ≥ 10/12' },
};
/** `ini` (solo F4): inicio de la ventana de AURUM del bloque del día (plantillasV6 · ventanaAurumF4); sin él, el del turno M (PISO). */
export function guiaAurumDe(iso: string, ini?: string | null): GuiaBloque | null {
  const a: DiaAurum | undefined = aurumDiaDe(iso);
  if (!a) return null;
  const A = a.bloques.find((b) => b.tag === 'A');
  const PR = a.bloques.find((b) => b.tag === 'PRAC');
  const L = a.bloques.find((b) => b.tag === 'L');
  const obsUrl = aurumObsUrl(a.obs);
  const recursos: GuiaRecurso[] = [];
  const avisos: string[] = [];
  const cur = AURUM_VID[a.d];
  // v6.09b (lote 1-bis S2): en F1 (60′) el reparto medido de la sesión (A · L en la franja · lo que va al sábado · hilo de Tracy)
  const f1 = !a.min30 ? aurumF1().dias.get(iso) : undefined;
  const medA = !a.min30 ? AURUM_F1_A[a.d] : undefined;
  // ── A: vídeo concreto ──
  let pasoA: GuiaPaso | null = null;
  let pasoAnota: GuiaPaso | null = null; // v6.09b (lote 1-bis S2): minutos de nota que el vídeo curado deja libres (solo F1)
  const segCur = cur ? cur.vids.reduce((s, v) => s + v.s, 0) : 0;
  const aMinPlan = f1 ? f1.aMin : A ? Math.max(A.min, segCur ? minDe(segCur) : 0) : 0; // si el vídeo concreto dura más que el estimado del plan, manda el real
  if (A) {
    if (f1?.tracyA) {
      // v6.09b (lote 1-bis S2): el A de D16 · D29 · D31 es el mismo audiolibro de Tracy que la L → tramo exacto del hilo a 1,25×
      pasoA = P(aMinPlan, `ESCUCHAR · ${TRACY.t} — tramo ${hms(f1.tracyA[0])}–${hms(f1.tracyA[1])} (${aMinPlan}′ a 1,25×)`,
        `Tema del plan: ${A.leccion.replace(/^The Psychology of Selling — /, '')}. El audiolibro no tiene capítulos: va como un solo hilo con hora exacta (A y L de D16-D32 + los sábados 04:15), a 1,25× y sin pantalla. Anota 1 frase por idea que usarías con un lead.`,
        { t: '▶ tramo', url: yt(TRACY.id, f1.tracyA[0]) });
      recursos.push(R(TRACY.t, yt(TRACY.id), { min: aMinPlan }));
    } else if (medA) {
      // v6.09b (lote 1-bis S2): material concreto medido en lugar de una página sin medir o de un tráiler (AURUM_F1_A)
      const segs = medA.items.reduce((s, i) => s + (i.s ?? 0), 0), pal = medA.items.reduce((s, i) => s + (i.palabras ?? 0), 0);
      const cuanto = [segs ? `${mmss(segs)} de vídeo` : '', pal ? `${pal} palabras` : ''].filter(Boolean).join(' + ');
      if (aMinPlan !== A.min) avisos.push(`Bloque A medido (${cuanto}): ${A.min}′ del plan → ${aMinPlan}′; ${aMinPlan < A.min ? 'lo que sobra va a la lectura L de hoy' : 'lo que falta sale de la lectura L de hoy'}.`);
      pasoA = P(aMinPlan, `VER/LEER (${cuanto}): ${medA.items.map((v, i) => `${i + 1}) «${v.t}» · ${v.canal} · ${v.s ? mmss(v.s) : `${v.palabras} palabras ≈ ${Math.ceil((v.palabras ?? 0) / PPM_EN)}′ a 100/min`}`).join(' → ')}`,
        `Vídeo a 1,0× con subtítulos en inglés${pal ? '; la página, a 100 palabras/min' : ''}. ${medA.nota}`, { t: '▶ 1', url: (medA.items[0] as AurumAMed).url });
      medA.items.forEach((v) => recursos.push(R(`${v.t} (${v.canal})`, v.url, { min: v.s ? minDe(v.s) : Math.ceil((v.palabras ?? 0) / PPM_EN) })));
      if (A.url && !medA.items.some((v) => v.url === A.url)) recursos.push(R(`${A.material} (enlace del plan${/automotivehalloffame/.test(A.url) ? '; carga por JavaScript, sin medir: opcional' : ''})`, A.url));
    } else if (!a.min30 && A.url && !/youtube\.com|youtu\.be/.test(A.url)) {
      // v6.09b (lote 1-bis S2): el plan enlaza una PÁGINA de artículos (no un canal de vídeo) → regla de lectura con su tamaño (min × 100 palabras)
      pasoA = P(aMinPlan, `LEER · ${A.material}: «${kwDe(A.leccion)}» (${aMinPlan}′ ≈ ${aMinPlan * PPM_EN} palabras a 100/min)`,
        `Regla fija (el plan enlaza la página de recursos, no un artículo): abre la página → el artículo o la guía más reciente sobre el tema de hoy; lee ${aMinPlan}′ y, si se acaba antes, sigue con el siguiente de la misma sección. Anota el título en la nota ◆ del día.`, { t: 'página ↗', url: A.url });
      recursos.push(R(A.material, A.url));
      avisos.push('Lectura A sin fijar en el plan (enlace a una página de recursos): se elige con la regla del paso.');
    } else if (cur) {
      const seg = segCur;
      if (aMinPlan > A.min) avisos.push(`El vídeo elegido dura ${mmss(seg)}: el bloque A pasa de ${A.min}′ a ${aMinPlan}′ (sale de la lectura L de hoy).`);
      else if (aMinPlan < A.min) avisos.push(`El vídeo elegido dura ${mmss(seg)}: el bloque A baja de ${A.min}′ a ${aMinPlan}′ (lo que sobra va a la lectura L de hoy).`);
      // v6.09b (lote 1-bis S2): en F1, si la nota ya reparte los minutos que sobran del vídeo («Los 3′ que sobran: …»), va como paso ANOTAR aparte
      const sobra = !a.min30 ? /^Los (\d+)′ que sobran: (.*)$/.exec(cur.nota) : null;
      const vMin = sobra ? minDe(seg) : aMinPlan;
      pasoA = P(vMin, `VER (${mmss(seg)} de vídeo): ${cur.vids.map((v, i) => `${i + 1}) «${v.t}» · ${v.canal} · ${mmss(v.s)}`).join(' → ')}`,
        `1,0× con subtítulos en inglés (auto-traducción al español solo si pierdes el hilo).${sobra ? '' : ` ${cur.nota}`}`, { t: '▶ vídeo 1', url: yt(cur.vids[0].id) });
      if (sobra && aMinPlan - vMin > 0) pasoAnota = P(aMinPlan - vMin, `ANOTAR · ${(sobra[2] as string).charAt(0).toUpperCase()}${(sobra[2] as string).slice(1)}`, 'En la nota ◆ del día, sin volver al vídeo.');
      cur.vids.forEach((v) => recursos.push(R(`${v.t} (${v.canal})`, yt(v.id), { min: minDe(v.s) })));
    } else if (A.url && /watch\?v=|youtu\.be\//.test(A.url)) {
      pasoA = P(aMinPlan, `VER · ${A.leccion}${A.dur ? ` (${A.dur})` : ''}`, '1,0× con subtítulos en inglés; anota 3 frases que usarías con un lead.', { t: '▶ vídeo', url: A.url });
      recursos.push(R(A.material, A.url, { min: A.min }));
    } else {
      pasoA = P(aMinPlan, `VER · ${A.material}: «${kwDe(A.leccion)}» (≤ ${A.min} min)`,
        // v6.09b lote 1-quater FX1 (revisión V1): en F1 la caja de tiempo se llena también por abajo (antes solo «≤ N min»: un clip de 6′ dejaba 12′ sin material)
        `Regla fija (el plan enlaza el CANAL, no un vídeo): canal › 🔍 buscador del canal con 2-3 palabras EN INGLÉS del tema («${kwDe(A.leccion)}») → el resultado más visto de ≤ ${A.min} min (si no hay, 2 clips cortos que sumen ${A.min}′).${iso <= FECHAS_V6.transicion.hasta ? ` Si dura menos de ${A.min}′, sigue con el siguiente resultado del mismo buscador hasta el minuto ${A.min}.` : ''} Anota cuál viste en la nota ◆ del día. 1,0× con subtítulos.`, A.url ? { t: 'canal ↗', url: A.url } : undefined);
      if (A.url) recursos.push(R(`${A.material} (canal)`, A.url));
      avisos.push('Vídeo A sin fijar en el plan (enlace al canal): se elige con la regla del paso.');
    }
  }
  // v6.10e (BASE CERO): el paso de fase lo deciden los ítems de la etapa (AURUM_BASE_CERO), no el total /12 (antes, el semáforo verde ≥ 10/12 en el v1)
  const pitchTxt = a.pitch ? ` CIERRE DE FASE → PITCH v${a.pitch}: grábalo y puntúalo con la rúbrica (6 ítems × 0-2 = /12) en Empresa › AURUM › HOY; vale el score, no «grabé».${AURUM_BASE_CERO[a.faseId] ? ` Paso de fase (base cero): ${AURUM_BASE_CERO[a.faseId]!.items}.` : ''}` : '';
  const pasoPR = PR ? P(PR.min, `DRILL · ${PR.leccion}`, `Práctica deliberada: 1 corrección por toma; guarda el resultado (texto o audio) en la nota ◆ del día.${pitchTxt}`, obsUrl ? { t: '◆ nota del día', url: obsUrl } : undefined) : null;
  const pasoLV = a.liviano ? P(a.liviano.min, `VARIANTE LIVIANO · ${a.liviano.texto.slice(0, 220)}${a.liviano.texto.length > 220 ? '…' : ''}`, `Mismo paciente que el caso de la Academia (Empresa › AURUM › HOY › tarjeta LIVIANO). Venta ética: sin promesa clínica.${a.liviano.pitch ? ` ${a.liviano.pitch}` : ''}`) : null;
  const lUrl = L?.url;
  // v6.10 · tanda C: «To Sell Is Human» no se presta en Archive.org → las L de Pink en vídeo (AURUM_F1_LVID) enlazan sus vídeos (más abajo); las demás lo dicen
  const pinkArchive = !!lUrl && lUrl.includes(AURUM_PINK_ARCHIVE);
  const pinkVideo = pinkArchive && !a.min30 && !!AURUM_F1_LVID[a.d];
  if (L && lUrl && !pinkVideo) recursos.push(R(pinkArchive ? 'L · Archive.org (NO se presta: solo lectores con discapacidad visual)' : `L · ${L.material}`, lUrl, { min: L.min }));
  // v6.10 (c12, 18-nov): desde el 4-ene (min30) el aviso de la decisión pendiente va DETRÁS del plan opcional y de la franja (el Calendar corta el aviso
  //   a 240 y dejaba fuera los minutos de lo opcional, 13-ene); en F1 sigue delante (allí ya sube el destino de la L si queda lejos)
  if (pinkArchive && !pinkVideo && !a.min30) avisos.push(AURUM_PINK_SIN_VIDEO);
  const pasos: GuiaPaso[] = [];
  let franja: string;
  let hitoF4: ReturnType<typeof hitoUsmleF4De> = null; // v6.08: hito nominal de F4 con el bloque de AURUM sin hora (ver abajo)
  if (!a.min30) {
    const W = 60;
    let fijo = aMinPlan + (PR ? PR.min : 0) + (pasoLV ? pasoLV.min : 0);
    let lvFuera = false;
    if (fijo > W && pasoLV) { lvFuera = true; fijo -= pasoLV.min; }
    const margen = fijo + 3 <= W;
    if (margen) pasos.push(P(1, 'ARRANQUE · abre la nota ◆ del día y lee el drill', 'Así el vídeo se ve con el drill en la cabeza.', obsUrl ? { t: '◆ Obsidian', url: obsUrl } : undefined));
    if (pasoA) pasos.push(pasoA);
    if (pasoAnota) pasos.push(pasoAnota);
    if (pasoPR) pasos.push(fijo > W ? { ...pasoPR, min: Math.max(1, W - aMinPlan) } : pasoPR);
    if (pasoLV && !lvFuera) pasos.push(pasoLV);
    let libre = W - sumMin(pasos) - (margen ? 2 : 0);
    // v6.09b (lote 1-bis S2): lo que no cabe ya no es «lectura de huecos» sin fecha → sábado 04:15 de su semana (aurumF1); Tracy = tramo del hilo
    const dest = aurumDestinoDe(f1);
    const medL = f1 ? AURUM_F1_L[a.d] : undefined;
    if (L && f1?.tracyL) {
      const lin = f1.lin;
      pasos.push(P(lin, `ESCUCHAR L · ${TRACY.t} — tramo ${hms(f1.tracyL[0])}–${hms(f1.tracyL[1])} (${lin}′ a 1,25×)`,
        // v6.09b lote 1-ter (revisión R, hallazgo 5): el destino de lo que no cabe, al principio del «cómo»
        `${f1.fuera > 0 ? `Los ${f1.fuera}′ que no caben hoy (el plan daba ${L.min}′) → ${f1.adelantado ? 'ya ADELANTADOS en el tramo del ' : ''}${dest}. ` : ''}Tema del plan: ${L.leccion.replace(/^The Psychology of Selling — Brian Tracy /, '')}. Audio activo: 1 frase por idea que usarías con un lead.`,
        { t: '▶ tramo', url: yt(TRACY.id, f1.tracyL[0]) }));
      libre -= lin;
      if (f1.fuera > 0) avisos.push(`L: ${f1.fuera}′ no caben en la hora → ${f1.adelantado ? 'ya van ADELANTADOS en el tramo del ' : ''}${dest} (el audiolibro va como un solo hilo con hora exacta).`);
    } else if (L && libre >= 5 && f1 && AURUM_F1_LVID[a.d]) {
      // v6.10 · tanda C: L de Pink EN VÍDEO (el libro no se presta), 25′ exactos a 1,0×; lo que no cabe va al sábado por minuto
      const lv = AURUM_F1_LVID[a.d]!;
      const tot = lv.segs.reduce((x, g) => x + g.b - g.a, 0), lPlan = pinkMin(lv.segs);
      const lin = Math.min(lPlan, libre);
      const hoy = pinkTramo(lv.segs, 0, lin * 60), resto = pinkTramo(lv.segs, lin * 60, tot);
      if (lv.textoD1 && lin === lPlan) pasos.push(P(lin, lv.textoD1.que, lv.textoD1.como, { t: '▶ vídeo 1', url: yt(lv.segs[0]!.id) }));
      else pasos.push(P(lin, `LECTURA L — Pink, «To Sell Is Human», ${lv.cap} (en vídeo${lin < lPlan ? `, los primeros ${lin}′ de ${lPlan}′` : ''})`,
        `${lin < lPlan ? `Los ${lPlan - lin}′ restantes → ${dest}: ${pinkTxt(resto)}. ` : ''}Archive.org no presta este libro (solo a lectores con discapacidad visual), así que va en vídeo, a 1,0× con subtítulos en inglés: ${pinkTxt(hoy)} = ${lin}′ (${lv.segs.map((g) => g.caps).join(' · ')}). Anota el minuto donde paras.`, { t: '▶ tramo', url: yt(hoy[0]!.id, hoy[0]!.a) }));
      for (const g of lv.segs) if (!recursos.some((r) => r.url === yt(g.id))) recursos.push(R(`${g.t} (${g.canal})`, yt(g.id)));
      libre -= lin;
      if (lin < lPlan) avisos.push(`L: ${lPlan - lin}′ no caben en la hora → ${dest}.`);
    } else if (L && libre >= 5) {
      const lPlan = medL ? Math.ceil(medL.palabras / PPM_EN) : L.min;
      const lin = Math.min(lPlan, libre);
      const pb = AURUM_L_PLANB[a.d];
      pasos.push(P(lin, medL ? `LECTURA L · ${medL.que} (${lPlan}′ a 100 palabras/min)` : `LECTURA L · ${L.leccion}${lin < L.min ? ` — los primeros ${lin}′ de ${L.min}′` : ''}`,
        `${L.formato === 'audio' ? 'Audio/lectura' : 'Lectura'} activa: marca dónde quedas.${lin < lPlan ? (f1 ? ` Los ${lPlan - lin}′ restantes → ${dest}, desde donde marques hoy.` : ` Los ${L.min - lin}′ restantes son lectura de huecos (no es núcleo).`) : ''}${pb ? ` Plan B: ${pb}` : ''}`, lUrl ? { t: 'L ↗', url: lUrl } : undefined));
      libre -= lin;
      if (lin < lPlan) avisos.push(`L: ${lPlan - lin}′ no caben en la hora → ${f1 ? dest : 'lectura de huecos'}.`);
    } else if (L) avisos.push(`L (${L.min}′) no cabe hoy en la hora → ${f1 ? (f1.adelantado ? `ya va ADELANTADA en el tramo del ${dest}` : dest) : 'lectura de huecos'}.`);
    if (libre > 0) pasos.push(margen
      ? P(libre, 'SEGUNDA TOMA del drill', 'Repite el drill en voz alta o reescríbelo corrigiendo UNA cosa de la primera toma.')
      : P(libre, 'CIERRE · nota ◆ del día + ✓ en Empresa › AURUM', 'Lo que no cupo queda escrito como pendiente en la nota.', obsUrl ? { t: '◆ Obsidian', url: obsUrl } : undefined));
    if (margen) pasos.push(P(2, 'CIERRE · ≤3 tarjetas de MECANISMO (¿por qué funciona?) en la nota ◆ + ✓ en Empresa › AURUM', 'Nada de datos sueltos.', obsUrl ? { t: '◆ Obsidian', url: obsUrl } : undefined));
    if (lvFuera && pasoLV) avisos.push(`Núcleo + variante LIVIANO = ${aMinPlan + (PR ? PR.min : 0) + pasoLV.min}′ > 60′: la variante LIVIANO (${pasoLV.min}′) no cabe hoy → ⚠ decisión de Joseph (propuesta: el sábado tras la revisión).`);
    // v6.10 (17-nov-2026): domingo de recuperación a hora fija (corrida_s1.extra › aurum: dom 6-dic 07:15-08:15) — la franja sigue siendo la de PLAN
    //   (14:15-15:15); plantillasV6 › bloqueCorrido + moverGuia la llevan a su hora real. El aviso nombra la hora real (fuera de la franja que se mueve).
    const fxA = dow(iso) === 0 || dow(iso) === 6 ? franjaExtraDe(iso, 'aurum') : null;
    // v6.10c: el sáb 2-ene la hora real (14:30-15:30) cae DENTRO de la franja de plan (14:15-15:15), así que moverGuia la movería (+15′ → «14:45»): se
    //   escribe la hora que, tras moverGuia, se lee como la real (horaTrasMover); con la hora real fuera de la franja (dom 6-dic 07:15), igual que antes
    const horaTrasMover = (h: string): string => { const d = aMin(fxA!.ini) - aMin('14:15'), w = aMin(h) - d; return w >= aMin('14:15') && w <= aMin('15:15') ? aHHMM(w) : h; };
    if (fxA) avisos.unshift(`Hoy ${dow(iso) === 0 ? 'domingo' : 'sábado'}, a hora fija (${horaTrasMover(fxA.ini)}-${horaTrasMover(fxA.fin)}): la lección que toca en orden (el mar 17-nov fue sin sesión y cada lección de F1 corrió un día${faseV6(iso) === 'TRANSICION' ? ' hasta fin de año: hoy, la última de F1' : ''}; desde el D${a.d + 1}, las fechas de siempre). Misma hora y mismo reparto que entre semana.`);
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
    // v6.05 (24-oct-2026): las 2 últimas sesiones (lun 3 / mar 4-may-2027) caen ya en el SERUMS → 30′ en tiempo muerto de la posta.
    // v6.06 (31-oct-2026): con el D1 en el lun 2-nov son las 7 últimas (D124-D130 = lun 3 → mar 11-may-2027, PITCH v7 incluido): misma regla.
    // v6.05 (fix): en F4 la franja ya NO es la nominal 14:15–14:45 (chocaba con el almuerzo y el bloque B del turno M): sigue al bloque de tiempo
    //   muerto del turno, tras los 30′ de R↔D (ventanaAurumF4; `ini` lo pasa el Home con el bloque del día), como la guía de Research en F4.
    if (faseV6(iso) === 'F4') {
      // v6.08 (14-nov-2026): día de HITO del Step 1 en F4 (D129 lun 24-may = NBME 30, 07:00-12:15) con el bloque sin hora (plantilla H con turno T o
      //   sin marcar: el R↔D va en el tiempo muerto de la posta 13:00-19:00, guía nominal 13:30-14:00) → la sesión va TRAS el hito ese mismo día, en
      //   el tiempo muerto de la posta justo después del R↔D (AURUM_F4_HITO_INI); antes caía a las 07:30 (la del turno M), dentro del hito. Se elige
      //   esto y no el siguiente día hábil porque no alarga el plan (AURUM sigue cerrando el mar 25-may con el PITCH v7).
      hitoF4 = ini ? null : hitoUsmleF4De(iso);
      const i0 = ini ?? (hitoF4 ? AURUM_F4_HITO_INI : AURUM_F4_INI);
      franja = franjaDesde(i0, W);
      avisos.push(`SERUMS (F4): 30′ en TIEMPO MUERTO de la posta, justo después de los 30′ de R↔D — hoy ${franja}${ini || hitoF4 ? '' : ' (turno M sin marcar = PISO; con otro turno la franja sigue a su bloque de tiempo muerto: T 13:30 · T 12:00 → 12:30 · T 14:00 → 14:00 · L 16:50 tras el R↔D · guardia sin hora)'}. Si la posta no deja hueco, al volver (antes de la cena); el drill nunca se salta.`);
    } else franja = '14:15–14:45';
    if (pinkArchive && !pinkVideo) avisos.push(AURUM_PINK_SIN_VIDEO); // v6.10 (c12): al final (ver arriba)
  }
  // v6.06 (fix 31-oct-2026): AURUM en un día de HITO USMLE (F1/F3) — v6.06: D35 = PITCH v2 el vie 18-dic, día del NBME 27 (07:00-12:30) y del
  //   CHECKPOINT DEL AÑO de ENCAPS (16:15) — la guía lo avisa (primer aviso): el hito es por la mañana y AURUM va a su hora, tras el hito; la fecha no se
  //   mueve (nada se corre). Control: check_rutina_guia.js (todo día de AURUM con hito USMLE lleva este aviso; con PITCH y CHECKPOINT, nombrados).
  // v6.08 (14-nov-2026): la misma regla en F4 con el hito NOMINAL del día (hitoUsmleF4De) cuando la sesión va tras el hito: bloque sin hora
  //   (plantilla H, turno T o sin marcar → AURUM_F4_HITO_INI) o ventana del turno ya posterior al fin del hito (L: R↔D tras el hito). Con el turno
  //   M o la guardia el motor de turnos mueve el hito a otro día T/L de su ventana: ahí no se avisa. Control: check_rutina_guia.js (F1/F3/F4).
  const hF4 = faseV6(iso) === 'F4' ? hitoUsmleF4De(iso) : null;
  const hu = hitoUsmleDe(iso) ?? (hF4 && (hitoF4 || (ini && hF4.fin && aMin(ini) >= aMin(hF4.fin))) ? hF4 : null);
  if (hu) {
    const enc = guiaEncapsDe(iso);
    const chk = enc && /CHECKPOINT/.test(enc.titulo) ? enc : null;
    avisos.unshift([
      hF4 && hu === hF4
        ? `Hoy ${hu.nombre}${hu.franja ? ` (${hu.franja})` : ''} por la mañana (día preferente del hito en el SERUMS): AURUM va tras el hito, en el tiempo muerto de la posta justo después del R↔D (${franja}); la fecha no se corre y el plan no se alarga.`
        : `Hoy ${hu.nombre}${hu.franja ? ` (${hu.franja})` : ''} por la mañana: AURUM no se mueve, va a su hora (${franja}), tras el hito y el almuerzo.`,
      a.pitch ? `Es el cierre de fase: PITCH v${a.pitch} HOY, con el hito ya terminado (la fecha no se corre; si llegas cansado, graba igual: vale el score de la rúbrica).` : '',
      chk ? `A las ${chk.franja.split('–')[0]} sigue el CHECKPOINT DEL AÑO de ENCAPS (${chk.franja}): día de 3 evaluaciones (${hu.nombre} · ${a.pitch ? `PITCH v${a.pitch}` : 'AURUM'} · checkpoint); ninguna se mueve ni se recorta.` : '',
    ].filter(Boolean).join(' '));
  }
  // v6.09 (rev. joseph 10): en F1 cada sesión corrió un hábil (D1 mar 17-nov) y el ciclo de 5 sesiones de cada semana del plan CIERRA EN LUNES (síntesis /
  //   cierre de semana / PITCH v1): se acepta el desfase, pero el texto dice qué es «la semana» de ese cierre
  if (iso <= FECHAS_V6.transicion.hasta && dow(iso) === 1) {
    const sem = AURUM_DIAS.filter((x) => x.semana === a.semana);
    const ult = sem[sem.length - 1], pri = sem[0];
    // v6.09b lote 1-quater FX1 (revisión V2): en F1 el «cierre de la semana en lunes» va DETRÁS del destino de la L (antes delante: «→ sáb 28-nov» quedaba en la pos. 236-330)
    if (ult && pri && ult.d === a.d && pri.fecha < lunesDeIso(iso)) avisos[iso <= FECHAS_V6.transicion.hasta ? 'push' : 'unshift'](`Cierre de la semana ${a.semana} del plan en LUNES: sus ${sem.length} sesiones van del ${fCorta(pri.fecha)} (D${pri.d}) a hoy (D${a.d}) porque en la v6.09 todo F1 corrió un hábil; «la semana» del drill = esas ${sem.length} sesiones, no la de calendario.`);
  }
  // v6.10 (17-nov-2026): en F1, si el destino de la L («L: N′ no caben en la hora → sáb …») queda más allá del carácter 230 del aviso (el Calendar lo corta
  //   en 240: jue 19 UWSA1 · dom 6-dic · mar 15-dic NBME 25), sube justo detrás del aviso del hito (o al principio); si ya cabe, el orden no cambia
  if (iso <= FECHAS_V6.transicion.hasta) {
    const iL = avisos.findIndex((x) => /^L(: | \(\d+′\) no cabe)/.test(x) && /→/.test(x) && !/ADELANTAD/.test(x)); // (un tramo ADELANTADO apunta a un sábado ya pasado: no hace falta)
    if (iL > 0 && avisos.slice(0, iL + 1).join(' ').length > 230) { const [x] = avisos.splice(iL, 1); avisos.splice(hu ? 1 : 0, 0, x as string); }
  }
  // v6.10e (18-nov-2026 · BASE CERO): en F1 la etapa del closer que empieza y el criterio de paso de fase, AL FINAL del aviso (no mueve las fechas de destino)
  const f1Bc = iso <= FECHAS_V6.transicion.hasta;
  if (f1Bc) {
    const bc = AURUM_BASE_CERO[a.faseId], fx = AURUM_DIAS.filter((x) => x.faseId === a.faseId);
    // v6.10 · fix 18-nov: «fase AURUM n/7 (An)» (antes «(F2, D16-D35)»: se confundía con la F2 del régimen) + qué pasa si no se llega al criterio
    // v6.10e (revisión del 18-nov · regresiones-3, menor): el criterio de paso antes del orden de las etapas (el Calendar corta el aviso a 240: «Manifiesto» quedaba fuera)
    if (bc && fx.length) avisos.push(`BASE CERO · fase AURUM ${a.faseId.slice(1)}/${Object.keys(AURUM_BASE_CERO).length} (${bc.etapa}, D${fx[0]!.d}-D${fx[fx.length - 1]!.d}): ${bc.que}. Pasas ${bc.pasa}. Orden de las etapas: escucha y preguntas → objeciones → cierre. Si no llegas, las fechas no se mueven: lo que falte es la corrección única de tus próximos DRILL y se vuelve a puntuar en el PITCH siguiente; anota el gap en la nota ◆.`);
  }
  return bloque(franja, 'aurum', `AURUM D${a.d} · ${a.titulo}`, pasos, recursos,
    a.pitch ? `PITCH v${a.pitch} grabado y puntuado con la rúbrica (/12) + nota ◆ del día` : 'vídeo visto con sus notas + drill hecho y guardado en la nota ◆ del día + ✓',
    { aviso: avisos.join(' ') || undefined, planB: `YouTube caído o sin datos: haz el drill primero (es el núcleo) y el vídeo en el próximo hueco. Si no hay tiempo: el drill nunca se salta; el vídeo sí.${f1Bc ? ' Sin un lead real hoy: el «lead» del role-play dice una frase REAL —de tus chats guardados o literal del vídeo de hoy—; nunca un cliente inventado.' : ''}` });
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
  caso1: [['Concluding Remarks › Lessons learned from the weight-reduced state (relectura para el caso)', 242], ['Concluding Remarks › Translating basic science into more effective pharmacotherapy (el párrafo que sigue: para el plan del caso)', 97]], // v6.09b lote 1-ter: 242 palabras no cuadran con ningún minuto entero (2′ = 1,21 · 3′ = 0,81) → + el apartado siguiente (97) = 339 en 3′ (1,13)
  c5: [['Neurobiology › Hypothalamic neurons controlling energy balance', 849]],
  c6: [['Neurobiology › Hypothalamic neurons controlling energy balance (2.ª pasada: POMC/α-MSH)', 849]],
  c7: [['Integrative physiology › Determinants of feeding behavior', 659], ['GI factors › Insights from bariatric surgery', 471]],
  c8: [['Neurobiology › Hindbrain circuits and the parabrachial nucleus', 510], ['Concluding Remarks › The gut–brain axis', 110]],
  caso2: [['Integrative physiology › Determinants of feeding behavior (relectura para el caso)', 659]],
  // v6.09b (lote 1-bis S2): el D11 (integración del mapa) se quedaba en 323 palabras (4′) y 18′ de «tarjetas» → + la sección que une intestino y cerebro
  c9: [['Concluding Remarks › The gut–brain axis', 110], ['Concluding Remarks › The two distinct components of obesity pathogenesis', 213], ['Integrative physiology › Determinants of feeding behavior (2.ª pasada para el mapa: intestino → tronco → hipotálamo)', 659]],
  c10: [['Integrative physiology › Determinants of energy expenditure', 514], ['Concluding Remarks › Lessons learned from the weight-reduced state', 242]],
  c11: [['Other factors › Mechanisms for biological defense of elevated body-fat mass (2.ª pasada)', 849]],
  c12: [['Concluding Remarks › The two distinct components', 213], ['› Developmental determinants of the biologically defended level of body-fat mass', 134], ['› Lessons learned from the weight-reduced state', 242], ['› Translating basic science into more effective pharmacotherapy', 97]],
  caso3: [['Concluding Remarks › Lessons learned from the weight-reduced state (relectura para el caso)', 242], ['Concluding Remarks › Translating basic science into more effective pharmacotherapy (el párrafo que sigue: para el plan del caso)', 97]], // v6.09b lote 1-ter: ídem (339 palabras en 3′)
};
/** v6.09b (lote 1-bis S2, a2-10): módulo GLP-1 de F1 (c17-c27 = D21-D32, 15 → 31-dic) con FUENTE LIBRE MEDIDA en lugar de «sección del tema, sin
 *  medir» (el Obesity Algorithm 2026 es de pago y los ensayos del NEJM no están en PMC → su resumen de PubMed + la ficha técnica de la FDA en DailyMed
 *  o un artículo de acceso libre de PMC). Palabras contadas el 17-nov-2026 (PubMed efetch · Europe PMC fullTextXML · DailyMed SPL; sin tablas, figuras
 *  ni referencias); minutos = palabras / 100 (inglés). Ficha de WEGOVY = DailyMed setid ee06186f… (versión 30-jun-2026, inyección + comprimidos):
 *  «Study 2» = STEP 1, «Study 7» = OASIS 4 (comprimido 25 mg) · ficha de ZEPBOUND = setid 487cd7e7… (2-sep-2026): «Study 1» = SURMOUNT-1. */
const PUBMED = (id: number): string => `https://pubmed.ncbi.nlm.nih.gov/${id}/`;
const PMC = (id: string): string => `https://pmc.ncbi.nlm.nih.gov/articles/${id}/`;
const WEGOVY_SPL = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee06186f-2aa3-4990-a760-757579d8f77b';
const ZEPBOUND_SPL = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=487cd7e7-434c-4925-99fa-aa80b1cc776b';
const LIV_LECT_F1: Record<string, Array<[string, number, string]>> = {
  c17: [['Müller 2019 (Mol Metab, PMC6812410) › Abstract', 184, PMC('PMC6812410')], ['› Molecular mechanisms underlying GLP-1-induced insulin secretion', 126, PMC('PMC6812410')], ['› GLP-1 effects on gastric emptying', 382, PMC('PMC6812410')], ['› Effect of central administration of GLP-1R analogs on food intake', 408, PMC('PMC6812410')]],
  c18: [['STEP 1 · Wilding 2021 NEJM › resumen (PubMed 33567185)', 389, PUBMED(33567185)], ['STEP 1 extensión (PMC9542252) › Trial design and participants', 483, PMC('PMC9542252')], ['Ficha WEGOVY (FDA) › 14.2 «Study 2» (= STEP 1: diseño) + «After 68 weeks…» (resultado)', 161, WEGOVY_SPL]],
  c19: [['STEP 1 extensión · Wilding 2022 (Diabetes Obes Metab, PMC9542252) › Abstract', 279, PMC('PMC9542252')], ['› Introduction', 399, PMC('PMC9542252')], ['› Results › Change in body weight and BMI', 249, PMC('PMC9542252')], ['› Results › Change in cardiometabolic risk factors', 286, PMC('PMC9542252')]],
  c20: [['SELECT · Lincoff 2023 NEJM › resumen (PubMed 37952131)', 304, PUBMED(37952131)], ['Ficha WEGOVY (FDA) › 14.1 Cardiovascular Outcomes Trial (= SELECT)', 891, WEGOVY_SPL]],
  c21: [['SURMOUNT-1 · Jastreboff 2022 NEJM › resumen (PubMed 35658024)', 420, PUBMED(35658024)], ['Ficha ZEPBOUND (FDA) › 14.1 «Study 1» (= SURMOUNT-1): overview + diseño + abandonos + resultados a 72 semanas', 495, ZEPBOUND_SPL]],
  c22: [['SURMOUNT-1 a 3 años · Jastreboff 2025 NEJM › resumen (PubMed 39536238)', 390, PUBMED(39536238)], ['Standards of care 2026 (BMJ Open Diabetes Res Care, PMC12815056) › Pre-diabetes', 221, PMC('PMC12815056')]],
  c23: [['SURMOUNT-5 · Aronne 2025 NEJM › resumen (PubMed 40353578)', 283, PUBMED(40353578)], ['SURMOUNT-5 post hoc (Eur Heart J Open 2025, PMC12448458) › Abstract', 260, PMC('PMC12448458')], ['› Introduction', 396, PMC('PMC12448458')], ['› Study design and population', 161, PMC('PMC12448458')]],
  c24: [['Ficha WEGOVY (FDA) › 2.2 Recommended Dosage (escalada de dosis)', 353, WEGOVY_SPL], ['› 6.1 Gastrointestinal Adverse Reactions (adultos)', 169, WEGOVY_SPL], ['Wharton 2022 (Postgrad Med) › resumen (PubMed 34775881)', 85, PUBMED(34775881)]],
  c25: [['Ficha WEGOVY (FDA) › Boxed Warning (tumores de células C)', 237, WEGOVY_SPL], ['› 4 Contraindications', 90, WEGOVY_SPL], ['› 5.1 Thyroid C-Cell Tumors', 251, WEGOVY_SPL], ['› 5.2 Acute Pancreatitis', 75, WEGOVY_SPL], ['› 5.3 Acute Gallbladder Disease', 183, WEGOVY_SPL], ['› 5.6 Severe GI Adverse Reactions (gastroparesia)', 89, WEGOVY_SPL], ['› 5.10 Pulmonary Aspiration', 106, WEGOVY_SPL]],
  c26: [['«Strategies for minimizing muscle loss during use of incretin-mimetic drugs» (Obes Rev 2025, PMC11611443) › Abstract', 248, PMC('PMC11611443')], ['› Nutrition', 642, PMC('PMC11611443')], ['› Physical activity', 608, PMC('PMC11611443')]],
  c27: [['Ficha WEGOVY (FDA) › 2.1 Monitoring and Administration (cómo se toma el comprimido)', 309, WEGOVY_SPL], ['› 2.3 Dosage of WEGOVY Tablets', 120, WEGOVY_SPL], ['› 2.5 Switching injection ↔ tablets', 147, WEGOVY_SPL], ['› 14.2 «Study 7» (= OASIS 4) + resultado a 64 semanas', 162, WEGOVY_SPL], ['OASIS 4 · Wharton 2025 NEJM › resumen (PubMed 40934115)', 328, PUBMED(40934115)]],
};
/** v6.09b: lectura medida del módulo GLP-1 de F1 (por fila de contenido, como LIV_LECT). */
function livLectF1De(l: DiaLiviano): Array<[string, number, string]> | undefined {
  return l.casoId == null ? LIV_LECT_F1[`c${LIV_DIAS.filter((x) => x.casoId == null && x.d <= l.d).length}`] : undefined;
}
/** v6.03 (20-oct-2026): LIV_LECT va por FILA del currículo — `c<n>` = n-ésimo tema de contenido · `caso<n>` = caso n —, no por D del plan
 *  (antes 1-15 = D1-D15 de v6.02, con los casos en D5/D10/D15). Con el D1 en miércoles los casos caen D3/D8/D13 y el D# de cada tema cambia;
 *  la lectura medida sigue a su tema. Ojo: con los casos antes, la «relectura para el caso» 1 llega antes de la 1.ª lectura de esa sección (c3).
 *  v6.05 (24-oct-2026): D1 = lun 26-oct → los casos vuelven a caer D5/D10/D15 (como v6.02), DESPUÉS de su sección: todas las relecturas valen.
 *  v6.06 (31-oct-2026): D1 = lun 2-nov → igual (casos 1-3 = D5/D10/D15 = vie 6 · 13 · 20-nov). */
function livLectDe(l: DiaLiviano): Array<[string, number]> | undefined {
  if (l.casoId == null) return LIV_LECT[`c${LIV_DIAS.filter((x) => x.casoId == null && x.d <= l.d).length}`];
  const xs = LIV_LECT[`caso${l.casoId}`];
  if (!xs) return undefined;
  // «relectura» solo si esa sección ya se leyó antes en el plan; si no (v6.03: casos 1 y 2 · v6.05: ninguno), se dice que es la 1.ª lectura (mismo texto y palabras)
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
/** Días de LIVIANO sin lectura nueva (Palmerton de tarjetas, repasos, metáforas, síntesis, revisión trimestral). */
const LIV_SIN_LECTURA = /Palmerton: 10 tarjetas|Repaso del eje|Biblioteca de metáforas|Síntesis módulo|REVISIÓN TRIMESTRAL/i;
/** v6.10e (revisión del 18-nov · regresiones-4): lo que se LEYÓ de verdad en una lección (la fuente LIBRE de su paso LECTURA, en corto), para corregir
 *  contra ello el recall del lunes. Antes el paso decía «Schwartz 2017, PMC/PubMed del tema» todos los lunes (también los de GLP-1, Acceso o Nutrición) y
 *  LIV_RECALL nombraba la fuente del plan aunque fuera el Obesity Algorithm de la OMA, de pago y que no se lee. null = día sin lectura (o caso sin lectura). */
export function livFuenteLeidaDe(l: DiaLiviano): string | null {
  if (livLectDe(l)) return 'Schwartz 2017 (PMC5546881)';
  if (l.casoId != null || LIV_SIN_LECTURA.test(l.tema)) return null;
  const f1 = l.fecha <= FECHAS_V6.transicion.hasta ? livLectF1De(l) : undefined;
  const corta = (u: string): string => (u.includes('dailymed') ? `ficha FDA de ${u.includes('ee06186f') ? 'WEGOVY' : 'ZEPBOUND'} (DailyMed)` : u.includes('pubmed') ? `PubMed ${u.replace(/\D/g, '')}` : (/PMC\d+/.exec(u) ?? [u])[0] as string);
  if (f1) return [...new Set(f1.map((x) => corta(x[2])))].join(' + ');
  const libres = livFuentesDe(l.fuente).recursos.filter((r) => !/Obesity Algorithm/.test(r.t));
  return libres.length ? libres.map((r) => r.t).join(' + ') : null;
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
  // v6.09b lote 1-ter (S3 · residuo de la revisión R): en F1 el pre-test y el role-play dicen su cuenta de tiempo (5Q × 72 s = 6′ · 3 × 5′ = 15′);
  //   desde el 4-ene el texto sigue igual que antes (mismos minutos)
  const f1Liv = iso <= FECHAS_V6.transicion.hasta;
  // v6.10e (18-nov-2026 · PREGUNTAS REALES, orden de Joseph): el «pre-test ciego 5Q» eran 5 tarjetas escritas por Claude → RECALL EN BLANCO de la semana
  //   anterior (1 línea por lección con solo su título a la vista; se corrige contra la tarjeta y la fuente: livianoCasos.LIV_RECALL). LIVIANO no tiene banco
  //   real propio: el pool MIR oficial 2022-2026 no trae leptina / grelina / arcuato y sus preguntas de fármacos y cirugía de la obesidad son del plan MIR
  //   (anti-repetición); los bancos de obesidad (OMA, StatPearls, Rosh Review) son de pago → decisión de Joseph. Mismos 6′. El drill de cifras ancla pasa a
  //   TABLA EN BLANCO con la fuente de cada cifra en su respuesta (no son preguntas inventadas: son cifras de ensayos reales).
  const semRec = pre ? LIV_DIAS.filter((x) => x.d >= l.d - 5 && x.d < l.d) : [];
  const nRec = semRec.length;
  // v6.10e (revisión del 18-nov · regresiones-4): contra qué se corrige = lo que se leyó en CADA lección repasada (no «Schwartz 2017» fijo)
  const leidoRec = [...new Set(semRec.flatMap((x) => (x.casoId == null ? (livFuenteLeidaDe(x) ?? '').split(' + ') : [])).filter((x) => !!x))];
  const casosRec = semRec.filter((x) => x.casoId != null).map((x) => `D${x.d}`), sinLecRec = semRec.filter((x) => x.casoId == null && !livFuenteLeidaDe(x)).map((x) => `D${x.d}`);
  const contraTxt = [leidoRec.length ? leidoRec.join(' · ') : '', casosRec.length ? `${casosRec.join(', ')}: el caso y su fuente` : '', sinLecRec.length ? `${sinLecRec.join(', ')}: sin lectura, con su tarjeta` : ''].filter(Boolean).join('; ');
  if (pre) pasos.push(P(6, `RECALL EN BLANCO de la semana anterior (1 línea por lección, ${nRec} × ${Math.round(360 / Math.max(1, nRec))} s = 6′; sustituye al «pre-test 5Q»)`, `Empresa › LIVIANO › Academia › HOY › recall: con solo el TÍTULO de cada lección de D${Math.max(1, l.d - 5)}-D${l.d - 1} a la vista, escribe sin mirar el mecanismo en 1 línea (causa → efecto); después corrige PRIMERO contra lo que leíste en cada lección (${contraTxt}; cada ítem del recall trae la suya) y usa la tarjeta solo como resumen (la escribió el generador del plan); registra x/${nRec} (meta ≥ 80 %). Lo fallado → tarjeta de hoy. No es un test: LIVIANO no tiene banco real de preguntas propio (las del MIR oficial son del plan MIR y los bancos de obesidad son de pago).`));
  if (drill) pasos.push(P(6, `TABLA EN BLANCO de cifras ancla (${drill.qs.length} cifras de ensayos y guías reales)`, 'Empresa › LIVIANO › HOY › drill: escribe cada cifra sin mirar y corrige contra la fuente que trae su respuesta (PubMed / PMC / ficha FDA); registra el %. Una cifra marcada «A VERIFICAR» se comprueba en su fuente antes de darla por buena.'));
  const sinLectura = LIV_SIN_LECTURA.test(l.tema);
  if (caso) {
    const prev = livCardsSemanaPrevia(l.d);
    // v6.09b lote 1-ter: en F1, los minutos enteros más cercanos a palabras/100 (339 palabras → 3′, ratio 1,13; con ⌈⌉ eran 4′ = 0,85); desde el 4-ene, ⌈⌉ como antes
    const lmin = lect ? (f1Liv ? Math.max(1, Math.round(palabras / PPM_EN)) : Math.ceil(palabras / PPM_EN)) : 0;
    pasos.push(P(6, `REPASO Anki de la semana (${prev.length} tarjetas de ${deck})`, 'Anki › el mazo del módulo: revisiones primero; las falladas se dicen en voz alta.'));
    if (lect && lmin) pasos.push(P(lmin, `LECTURA · Schwartz 2017 › ${lect.map((x) => `${x[0]} (${x[1]} palabras)`).join(' + ')}`, `${lmin}′ a ${PPM_EN} palabras/min: busca el MECANISMO que le explicarás a la paciente.`, { t: 'Schwartz 2017 (PMC)', url: SCHWARTZ }));
    pasos.push(P(Math.max(3, 25 - 6 - lmin - pre - dr), `MONTAR EL CASO ${caso.id}/16 · ${caso.titulo}`, `Empresa › LIVIANO › Academia › HOY › Caso: lee paciente, datos y red flags; escribe en 3 líneas: mecanismo · metáfora · plan (1 métrica + fecha de control). Consigna: ${caso.consigna.slice(0, 160)}${caso.consigna.length > 160 ? '…' : ''}`));
    pasos.push(P(15, f1Liv ? 'ROLE-PLAY grabado: toma 1 (≤5′) → escúchala y anota 1 cosa (≤5′) → toma 2 corrigiéndola (≤5′) = 15′' : 'ROLE-PLAY grabado (2 tomas de ≤5 min)', `${l.aplicacion.replace(/ → puntúa.*$/, '')} Toma 2 = corrige 1 cosa de la toma 1. Lenguaje people-first, sin culpa.`));
    pasos.push(P(5, 'RÚBRICA 0-2 × 4 (mecanismo · metáfora · people-first · plan) → guarda el puntaje', 'En la tarjeta del caso (meta ≥ 6/8 por caso; ≥ 80 % de media del bloque). Lo que saque 0 → tarjeta nueva.'));
  } else {
    // v6.09b (lote 1-bis S2, a2-10): en F1 (≤ 3-ene) el módulo GLP-1 lee una FUENTE LIBRE MEDIDA (LIV_LECT_F1; antes «sección del tema, sin medir» con
    //   12′ fijos) y lo que sobra tras las tarjetas (2′ por tarjeta + 3′ la propia) va a una 2.ª PASADA de la lectura de ≤ sus minutos, no a «importar
    //   tarjetas» (antes 4-18′ para 2-4 tarjetas: 18′ el 1-dic). Desde el 4-ene, igual que antes (lo mide otro lote: pendientes).
    const enF1 = iso <= FECHAS_V6.transicion.hasta;
    const lectF1 = enF1 && !lect ? livLectF1De(l) : undefined;
    if (lectF1) { const i = avisos.findIndex((a) => /Obesity Algorithm 2026 de la OMA es DE PAGO/.test(a)); if (i >= 0) avisos[i] = 'El Obesity Algorithm 2026 de la OMA es de pago: la lectura de hoy usa en su lugar una fuente libre y medida (resumen de PubMed, ficha técnica de la FDA o artículo de PMC).'; }
    const palF1 = lectF1 ? lectF1.reduce((a, x) => a + x[1], 0) : 0;
    let lmin = 0;
    if (lect) lmin = Math.ceil(palabras / PPM_EN);
    else if (lectF1) lmin = Math.ceil(palF1 / PPM_EN);
    else if (!sinLectura) lmin = 12;
    const tarjetasMin = () => 25 - pre - dr - lmin - 3;
    if (tarjetasMin() < 3) { const sobra = 3 - tarjetasMin(); lmin -= sobra; avisos.push(`Lectura limitada a ${lmin}′ hoy: lo que no leas abre la lectura de mañana.`); }
    let tarj = tarjetasMin(), segunda = 0, extraProp = 0, aplic = 20;
    if (enF1 && (lect || lectF1) && !sinLectura) {
      const need = cards.length ? 2 * cards.length + 3 : 3;
      // v6.09b lote 1-quater FX1 (revisión V1 · 2.ª pasada): la 2.ª pasada de lo subrayado es ≤ media lectura + 1′ (2× + recall, la regla de Derma; antes hasta los
      //   minutos de la lectura ENTERA: 7′ para releer «solo lo subrayado» de 611 palabras); lo que sobra va a tarjetas PROPIAS del subrayado (2′ c/u, la misma
      //   regla que las de mecanismo) y el texto lo dice
      const capS = Math.max(2, Math.round((lect ? palabras : palF1) / PPM_EN / 2 + 1)); // media lectura MEDIDA (palabras/100) + 1′
      if (tarj > need) { const r = tarj - need; segunda = r >= 2 ? Math.min(r, capS) : 0; extraProp = Math.floor((r - segunda) / 2); tarj = need + (r - segunda); }
      // v6.10c · FIX r1 (hallazgo 2 de la revisión): un día de F1 CON PRE-TEST y lectura larga (D24 lun 21-dic: 12′ · D28 lun 28-dic: 11′; el corrimiento de
      //   un hábil los llevó a lunes) dejaba las tarjetas de mecanismo en 4-5′, bajo la regla del frente (2′ por tarjeta + 3′ la propia = 9′). Las tarjetas
      //   suben a su mínimo y la diferencia sale de la APLICACIÓN (20′ para 3 tomas de ≤ 60 s + escuchar la 3.ª: queda en 15-16′). Solo con pre-test: los
      //   días sin pre-test (D2 jue 19-nov, ya volcado) no cambian.
      else if (pre && tarj < need) { aplic -= need - tarj; tarj = need; }
    }
    if (lect) pasos.push(P(lmin, `LECTURA · Schwartz 2017 › ${lect.map((x) => `${x[0]} (${x[1]} palabras)`).join(' + ')} = ${palabras} palabras`,
      `${lmin}′ a ${PPM_EN} palabras/min (inglés de arranque): 1 pasada activa subrayando causa → efecto; no traduzcas palabra por palabra (DeepL/Google solo para 1-2 frases). Estudio de hoy: ${l.estudio}`, { t: 'Schwartz 2017 (PMC)', url: SCHWARTZ }));
    else if (lectF1) {
      pasos.push(P(lmin, `LECTURA · ${lectF1.map((x) => `${x[0]} (${x[1]} palabras)`).join(' + ')} = ${palF1} palabras`,
        `${lmin}′ a ${PPM_EN} palabras/min: 1 pasada activa subrayando las cifras (con su IC) y el mecanismo; no traduzcas palabra por palabra. Fuente libre medida el 17-nov (el Obesity Algorithm 2026 es de pago; de los ensayos del NEJM solo es libre su resumen en PubMed). Estudio de hoy: ${l.estudio}`, { t: 'fuente ↗', url: (lectF1[0] as [string, number, string])[2] }));
      const urls = [...new Set(lectF1.map((x) => x[2]))];
      recursos.unshift(...urls.map((u) => R(u.includes('dailymed') ? `Ficha técnica FDA (DailyMed) · ${u.includes('ee06186f') ? 'WEGOVY' : 'ZEPBOUND'}` : u.includes('pubmed') ? `PubMed ${u.replace(/\D/g, '')} (resumen)` : `PMC ${(/PMC\d+/.exec(u) || [''])[0]} (texto libre)`, u)));
    }
    else if (lmin) pasos.push(P(lmin, `LECTURA · ${l.estudio} — fuente: ${l.fuente} (sección del tema, sin medir)`, `${lmin}′: busca en la fuente la sección del tema de hoy y léela activamente (causa → efecto). Si la fuente es de pago o no carga: la siguiente fuente libre de la lista.`, recursos[0] ? { t: 'fuente ↗', url: recursos[0].url } : undefined));
    if (segunda) pasos.push(P(segunda, `2.ª PASADA (${segunda}′) · solo lo subrayado de la lectura de hoy, a 2× (≤ media lectura + 1′${segunda < Math.round((lect ? palabras : palF1) / PPM_EN / 2 + 1) ? `; acotada a ${segunda}′: lo más subrayado primero` : ''})`, 'Relee únicamente los párrafos que subrayaste (cifras y mecanismo) y con ellos escribe la tarjeta propia del «¿por qué?». Si no subrayaste nada, relee el apartado de resultados.'));
    pasos.push(P(tarj, sinLectura ? `ESTUDIO · ${l.estudio}` : `TARJETAS de MECANISMO de hoy (${cards.length} en ${deck})${extraProp ? ` + ${extraProp} propia${extraProp > 1 ? 's' : ''} más del subrayado (2′ c/u)` : ''}`,
      sinLectura ? `Hoy no hay lectura nueva: ${l.estudio}. Tarjetas en ${deck}.` : `Empresa › LIVIANO › Academia › HOY › «Anki de hoy» (o CSV DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv) → impórtalas a ${deck} + 1 propia si falta un «¿por qué?». Regla del frente: tu anverso, sin cloze.`));
    pasos.push(P(3, 'FREE RECALL a papel (sin mirar)', 'La cadena causal de hoy en 5 líneas; compara y corrige en rojo.'));
    pasos.push(P(aplic, `APLICACIÓN · ${l.aplicacion}`, `En voz alta y grabado (nota de voz ≤60 s): toma 1 tal cual · toma 2 más simple · toma 3 con la metáfora; escucha la 3.ª y corrige 1 cosa. People-first (persona con obesidad), sin culpa.${aplic < 20 ? ` Hoy ${aplic}′ (el recall del lunes y la lectura larga piden ${20 - aplic}′ más de tarjetas): las 3 tomas y la escucha caben igual.` : ''}`));
  }
  if (!lect && !caso && !sinLectura && !recursos.length) avisos.push('Sin fuente con URL para hoy: usa los apuntes del módulo (Empresa › LIVIANO).');
  // v6.09 (rev. joseph 10): en F1 el caso nunca va antes de la lección que lo prepara (gen_liviano_plan.js): si su viernes llegó corto, ese viernes lleva
  //   la lección y el caso va el lunes siguiente → los dos días lo dicen
  if (iso <= FECHAS_V6.transicion.hasta) {
    if (caso && l.wd !== 'Vie') {
      const prevL = LIV_DIAS.filter((x) => x.d < l.d && x.casoId == null).pop();
      avisos.unshift(`El CASO ${caso.id}/16 va hoy ${diaRealNom(iso, 'liviano')} y no el viernes: el ${prevL ? `${fCorta(prevL.fecha)} tocó la lección que lo prepara (${prevL.tema.split(':')[0]})` : 'viernes tocó la lección que lo prepara'}; las lecciones de F1 corrieron por los días sin sesión de noviembre. ${l.pretest ? 'Primero el recall en blanco del lunes; después, el caso.' : ''}`.trim());
    } else if (!caso && l.wd === 'Vie') {
      const sigC = LIV_DIAS.find((x) => x.d > l.d);
      if (sigC?.casoId != null) avisos.unshift(`Hoy ${diaRealNom(iso, 'liviano')} no hay caso: toca la lección que lo prepara (las lecciones de F1 corrieron por los días sin sesión de noviembre); el CASO ${sigC.casoId}/16 va el ${fCorta(sigC.fecha)}.`);
      // v6.10: con el D1 en miércoles el viernes de F1 llega con 3 de sus 4 lecciones: el caso va tras la 4.ª (martes siguiente) → el viernes lo dice
      else { const cS = LIV_DIAS.find((x) => x.d > l.d && x.casoId != null); if (cS && cS.wd !== 'Vie' && cS.fecha <= addDias(iso, 7)) avisos.unshift(`Hoy ${diaRealNom(iso, 'liviano')} no hay caso: faltan lecciones que lo preparan (el D1 fue el ${fCorta(LIV_DIAS[0]!.fecha)}); el CASO ${cS.casoId}/16 va el ${fCorta(cS.fecha)}, tras su última lección.`); }
    }
  }
  // v6.10 (17-nov-2026): domingo de recuperación a hora fija (corrida_s1.extra › liviano: dom 6-dic 08:15-09:00) — la franja sigue siendo la de PLAN
  //   (17:15-18:00); plantillasV6 › bloqueCorrido + moverGuia la llevan a su hora real. El aviso nombra la hora real.
  const fxL = dow(iso) === 0 || dow(iso) === 6 ? franjaExtraDe(iso, 'liviano') : null;
  if (fxL) avisos.unshift(`Hoy ${dow(iso) === 0 ? 'domingo' : 'sábado'}, a hora fija (${fxL.ini}-${fxL.fin}): la lección que toca en orden (el mar 17-nov fue sin sesión y cada lección de F1 corrió un día; desde el D${l.d + 1}, las fechas de siempre). Mismo paso a paso que entre semana.`);
  // v6.10e (18-nov-2026 · BASE CERO): en F1 la fase de LIVIANO (fisiología → farmacología → casos integrados) y el criterio de paso, AL FINAL del aviso
  if (iso <= FECHAS_V6.transicion.hasta) {
    const cont = (m: string): DiaLiviano[] => LIV_DIAS.filter((x) => x.modulo === m && x.casoId == null);
    const fis = cont('FISIOLOGÍA'), glp = cont('GLP-1'), drG = glp.find((x) => x.drill), c5 = LIV_DIAS.find((x) => x.modulo === 'GLP-1' && x.casoId != null);
    const casosFis = LIV_DIAS.filter((x) => x.modulo === 'FISIOLOGÍA' && x.casoId != null).map((x) => x.casoId);
    const fisT = LIV_DIAS.filter((x) => x.modulo === 'FISIOLOGÍA'); // con sus casos (el caso 4 cierra la fase)
    if (l.modulo === 'FISIOLOGÍA' && fis.length && glp.length) avisos.push(`BASE CERO · fase 1/3 FISIOLOGÍA (D${fisT[0]!.d}-D${fisT[fisT.length - 1]!.d}): primero el porqué del peso (homeostasis, leptina, arcuato, adaptación), sin fármacos. Pasas a la fase 2 (GLP-1, D${glp[0]!.d}) con el recall de los lunes ≥ 80 % y los casos ${casosFis.join('-').replace(/^(\d+)-.*-(\d+)$/, '$1-$2')} con ≥ 6/8 en la rúbrica (≥ 1 en «mecanismo»). Si no llegas, las fechas no se mueven: lo fallado del recall entra como tarjeta del día, el ítem más flojo de la rúbrica es el foco de la 1.ª toma del caso siguiente y el gap va a la nota ◆.`);
    else if (l.modulo === 'GLP-1' && glp.length) avisos.push(`BASE CERO · fase 2/3 FARMACOLOGÍA GLP-1 (D${glp[0]!.d}-D${glp[glp.length - 1]!.d}): qué hace cada fármaco y con qué cifra de ensayo real. Pasas a la fase 3 (acceso, nutrición, ejercicio, conducta y casos integrados) con la tabla de cifras${drG ? ` del D${drG.d}` : ''} ≥ 80 %${c5 ? ` y el caso ${c5.casoId} ≥ 6/8` : ''}. Si no llegas, las fechas no se mueven: la cifra o el ítem fallado entra como tarjeta del día y es el foco de la 1.ª toma del caso siguiente; el gap va a la nota ◆.`);
  }
  recursos.push(R('◆ LIVIANO · concepto madre (Obsidian)', LIV_OBS));
  // v6.10 · fix 18-nov (revisión de los frentes): en F1 el caso diferido no lleva el día de la semana de PLAN en el título («MARTES CASO 1/16»): con el alias de
  //   corrida_s1 se hace el miércoles real y el aviso dice «va hoy miércoles» (el tema de LIV_DIAS no cambia: check_rutina_guia lo busca por ese nombre)
  const temaTit = f1Liv ? l.tema.replace(/^(LUNES|MARTES|MIÉRCOLES|JUEVES) (CASO \d+\/\d+)/, '$2') : l.tema;
  return bloque('17:15–18:00', 'liviano', `LIVIANO D${l.d} · ${l.modulo} — ${temaTit}`, pasos, recursos,
    // v6.10i (auditoría del volcado c12 · D19 mar 15-dic): un día SIN lectura nueva no tiene paso de lectura ni de tarjetas de mecanismo → su «Hecho» dice lo
    //   que deja su ESTUDIO (livianoStudyPlan › hechoEstudio, del curriculum) + la tabla de cifras si la hay; antes pedía «lectura hecha + 3 tarjetas en …»
    caso ? `role-play grabado + rúbrica /8 guardada en el caso ${caso.id}`
      : sinLectura ? `${l.hechoEstudio ?? 'ESTUDIO del día hecho (sin lectura nueva)'} + 3 tomas de la aplicación grabadas${pre ? ` + recall en blanco x/${nRec} registrado` : ''}${drill ? ` + tabla de cifras x/${drill.qs.length} registrada` : ''}`
      : `lectura hecha + ${cards.length || 'las'} tarjetas en ${deck} + 3 tomas de la aplicación grabadas${pre ? ` + recall en blanco x/${nRec} registrado` : ''}`,
    { aviso: avisos.join(' ') || undefined, flex: Math.max(0, pasos.length - 3),
      planB: 'Fuente caída o sin tiempo: 25′ de tarjetas del módulo (Empresa › LIVIANO › Anki) + la aplicación de 20′ completa; la lectura pasa a la próxima sesión de LIVIANO.' }); // v6.10g: no «mañana» (vie → lun, sáb 2-ene, jue 24-dic → lun 28)
}

// ════════════════════════════════════════ 13:00 · BUSINESS (Estudio Pulso) ════════════════════════════════════════
const PULSO_OBS = obs('02_EMPRESA FINANZAS/01_PULSO/_concepto_madre');
/** Semana 1: tramos EXACTOS de charlas oficiales de los autores (capítulos de YouTube leídos el 18-oct). Sustituyen la búsqueda (Spark) y el
 *  audiolibro caído (In Defense of Food, nHR8B8V2v9s → «Video no disponible»): mismo libro, mismo autor, mismo contenido del plan.
 *  v6.03 (20-oct-2026): la clave es la FILA del plan — libro (libroN) + nº de lectura de ese libro —, no la fecha (antes '2026-10-19' …
 *  '2026-10-22'): con el D1 en el mié 21-oct Spark cae mié 21 / jue 22 y Pollan lun 26 / mar 27-oct (el OUTPUT S1 del vie 23 va en medio).
 *  v6.05 (24-oct-2026): D1 = lun 26-oct → Spark lun 26 / mar 27 · Pollan mié 28 / jue 29-oct · OUTPUT S1 vie 30-oct (como v6.02, una semana después).
 *  v6.06 (31-oct-2026): D1 = lun 2-nov → Spark lun 2 / mar 3 · Pollan mié 4 / jue 5-nov · OUTPUT S1 vie 6-nov. */
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
/** v6.09b (S1 · mar 17-nov-2026 · auditoría tiempo ↔ material, a2-2): PIEZA FIJA de cada lectura de Business de F1 (24-nov → 31-dic). Antes cada libro
 *  enlazaba un solo recurso y todas sus sesiones decían «20′ desde donde quedaste»: el recurso se acababa en la 1.ª sesión (TEDx de 18′ para 3 × 20′,
 *  avance de audiolibro de 5′ para 3 sesiones…) o era un show de Spotify / una búsqueda. Ahora cada fila (libro + nº de lectura, como BIZ_TRAMO) lleva
 *  su pieza con minuto de inicio y fin, medida el 17-nov-2026 (lengthSeconds de YouTube; palabras de los artículos a 100/min en inglés y 150/min en
 *  español): una charla, entrevista o episodio del PROPIO autor (o de su editorial) sobre el tema de esa fila. No es el libro: el rótulo dice el tema de
 *  hoy y la pieza que lo cubre; lo que el vídeo tenga después del tramo no es tarea del plan. Las filas de 2027 (p. ej. ADHD 2.0 crítica del lun 4-ene)
 *  no tienen entrada aquí y no cambian. */
type BizPiezaF1 = { t: string; url: string; seg?: [number, number]; palabras?: number; ppm?: number; donde?: string };
const ytF1 = (id: string, t: string, a: number, b: number): BizPiezaF1 => ({ t, url: yt(id, a || undefined), seg: [a, b] });
// tema: lo que el «qué» dice como «tema de hoy» cuando parte del tema de la fila va en otra fecha (v6.09b lote 1-quater FX1: el 24-nov, «para qué dormimos» → jue 26-nov)
// v6.10 (17-nov-2026): las 4 lecturas de Why We Sleep corren un hábil (8#1 mié 25 · 8#2 jue 26 · 8#3 vie 27 · 8#4 DOM 29-NOV 05:00, día extra de Business):
//   las notas que citan otra fecha de ese libro se re-fechan (TED → vie 27 · clip del apetito → dom 29 · «para qué dormimos» → desde el mié 25); las piezas
//   y los minutos no cambian. v6.10c (decisión de Joseph del 17-nov 17:20, corrimiento literal): cada lectura corre un hábil hasta fin de año (8#4 lun 30-nov ·
//   9#1 mié 2 → 9#4 lun 7-dic · 12#3 lun 21-dic · 14#1 lun 28 · 14#2 mar 29-dic · 14#3 SÁB 2-ENE 21:30) → clip del apetito → lun 30-nov 13:00 · Panda tramo 2
//   «ayer» · Barrett tramo 2 «el vie 18-dic» · Hallowell tramo 2 «ayer» y tramo 3 «el mar 29-dic». Piezas y minutos, sin cambio.
const BIZ_TRAMO_F1: Record<string, { piezas: BizPiezaF1[]; nota: string; min?: number; tema?: string }> = { // min: minutos del paso fijados (v6.09b lote 1-ter; si no, ⌈material⌉)
  // v6.09b lote 1-quater (QS · hallazgo b de R2, 17-nov): el EXTRACTO del audiolibro de Penguin (82:00, 4r5zlZxpTkY) deja de ser material del plan: no
  //   publica capítulos ni transcripción, así que no se podía comprobar que su min 0-20 cubriera el tema del 24-nov (circadiano, adenosina y cafeína) y su
  //   min 20-82 quedaba «fuera del plan» sin fecha. Cada tema de los 4 días del libro va ahora con piezas PÚBLICAS y MEDIDAS del propio Walker
  //   (lengthSeconds de la página de YouTube, curl 17-nov): 24-nov = episodios 02 «Sleep Pressure» (525 s: adenosina, cómo la cafeína la silencia y por qué
  //   dormir entero la limpia) + 03 «Circadian Rhythms» (669 s: el reloj de 24 h y la bajada de la tarde) de su podcast = 19,9′ → paso 20′ + acción 4′; el
  //   «para qué dormimos» entero (memoria, inmunidad, corazón) es la TED del jue 26-nov, que ya está en el plan. 25-nov = episodio 01 (788 s) + clip de
  //   FoundMyFitness (294 s) + «Hacking your memory — with sleep» de Sleeping with Science, TED (283 s: qué consolida el sueño y cuándo, que es la tarjeta de
  //   la acción) = 22,8′ → paso 21′ (1,08) + acción 3′. Ningún tema de esos días queda sin pieza y el extracto ya no es lo único que cubre ninguno.
  '8#1': { tema: 'ritmo circadiano, adenosina y cafeína (el «para qué dormimos» va en su TED: la fecha, al principio del «cómo»)', piezas: [ytF1('G1HTPzc_6QM', 'Sleep Diplomat (Matt Walker) · «Episode 02: Sleep Pressure» (8:45)', 0, 525), ytF1('BdqLGk_Pl0E', 'Sleep Diplomat (Matt Walker) · «#03: Circadian Rhythms» (11:09)', 0, 669)], nota: '«Para qué dormimos» entero (memoria, inmunidad, corazón) → TED del vie 27-nov, ya en el plan. Hoy, contados por el propio Walker, los 2 procesos que deciden cuándo duermes: la presión de sueño —la adenosina, cómo la cafeína la silencia y por qué dormir entero la limpia— (episodio 02 de su podcast) y el ritmo circadiano —el reloj de 24 h y la bajada de la tarde— (episodio 03). El extracto del audiolibro de Penguin ya no es material del plan: no publica capítulos ni transcripción y no se puede comprobar qué cubre; el libro va con piezas medidas del propio Walker.' },
  // v6.09b lote 1-ter (S3 · revisión R, hallazgo 7): 25-nov — el extracto de Penguin no publica marcas de capítulo y su transcripción no es pública
  //   (timedtext / get_transcript piden sesión o token, 17-nov): no se puede comprobar que sus min 20-40 lleguen al cap. 3 (NREM/REM). El tema de hoy va
  //   con piezas MEDIDAS que lo cubren según su descripción publicada (lengthSeconds 788 y 294, curl 17-nov): el episodio 01 del podcast del propio Walker
  //   (NREM en 4 fases, REM, ciclos de 90 min, husos) + el clip de FoundMyFitness sobre qué aporta el sueño profundo y el REM = 18,0′ → paso 18′ + acción 6′.
  //   26-nov: solo la TED (19,3′ → 20′) y la acción vuelve a 4′; el clip del apetito (1:53) pasa al 27-nov: 1,9′ + 18,4′ = 20,3′ en 20′ (min fijo).
  '8#2': { piezas: [ytF1('y9F47gANUEw', 'Sleep Diplomat (Matt Walker) · «Episode 01: What is Sleep? (What’s going to happen when you fall asleep tonight)» (13:08)', 0, 788), ytF1('x3a0O8F6ZuQ', 'FoundMyFitness Clips · «REM sleep vs. deep sleep and their importance for cardiovascular and emotional health | Matt Walker» (4:54)', 0, 294), ytF1('6TyIY6u31gk', 'TED · «Hacking your memory — with sleep | Sleeping with Science» (4:43)', 0, 283)], min: 21, nota: 'La arquitectura del sueño y lo que hace cada fase, contadas por el propio Walker: las 2 clases de sueño (NREM en 4 fases y REM), el ciclo de 90 minutos y los husos (episodio 01 de su podcast) · qué aporta el sueño profundo y el REM al corazón y a las emociones (clip de FoundMyFitness) · cómo guarda la memoria el sueño antes y después de aprender (Sleeping with Science, TED): es la tarjeta de la acción.' },
  '8#3': { piezas: [ytF1('5MuIMqhT8DM', 'TED · «Sleep Is Your Superpower | Matt Walker» (19:18)', 0, 1158)], nota: 'El clip del apetito (1:53, grelina/leptina) → lun 30-nov 13:00, al empezar su sesión (hoy no cabe con la acción de 4′). La privación de sueño (memoria, testosterona, inmunidad, riesgo cardiovascular) contada por el propio Walker: es también el «para qué dormimos» que el mié 25-nov deja para hoy.' },
  '8#4': { piezas: [ytF1('r6pItuOoGxc', 'TED · «How sleep affects what — and how much — you eat» (1:53)', 0, 113), ytF1('lRp5AC9W_F8', 'Penguin Books UK · «How To Improve Your Sleep | Matthew Walker» (8:24)', 0, 504), ytF1('nJHzLUZXiDQ', 'Penguin Books UK · «Is Alcohol A Good Sleep Aid?» (1:18)', 0, 78), ytF1('MZLo5N3vco8', 'Penguin Books UK · «Is Melatonin A Good Sleep Aid?» (2:09)', 0, 129), ytF1('_lSNEjA-Drk', 'London Real · «What you need to know about sleeping pills — Matthew Walker» (6:32)', 0, 392)], min: 20, nota: 'Primero el clip del apetito de la serie Sleeping with Science (grelina/leptina), que en la sesión anterior no cupo junto a la TED: completa la nota sueño↔peso de esa sesión. Después, los consejos de higiene del sueño, el alcohol, la melatonina y las pastillas, en boca del propio Walker (4 vídeos cortos, en este orden).' },
  '9#1': { piezas: [ytF1('LJ9Ae_j_kjI', 'Salk Institute · «Satchin Panda – Circadian Theory of Health» (55:08)', 0, 1103)], nota: 'La charla de Panda (Salk, 2018) en 3 tramos iguales, en orden (sin marcas de capítulo): hoy el 1/3.' },
  '9#2': { piezas: [ytF1('LJ9Ae_j_kjI', 'Salk Institute · «Satchin Panda – Circadian Theory of Health» (55:08)', 1103, 2206)], nota: 'Tramo 2/3 de la charla de Panda: sigue donde paraste ayer (min 18:23).' },
  '9#3': { piezas: [ytF1('LJ9Ae_j_kjI', 'Salk Institute · «Satchin Panda – Circadian Theory of Health» (55:08)', 2206, 3308)], nota: 'Tramo 3/3 de la charla de Panda: hasta el final.' },
  '9#4': { piezas: [
    { t: 'LIVIANO ACADEMIA › Módulo 3 «Nutrición» (lo que dice la Academia del ayuno intermitente: 24 RCT, 0,26 kg NS)', url: 'https://github.com/josephMAX-svg/joseph-md-app/blob/master/DATA/BUSINESS/LIVIANO_ACADEMIA.md', palabras: 170, ppm: 150, donde: '≈170 palabras' },
    { t: 'NEJM 2022 · «Calorie Restriction with or without Time-Restricted Eating in Weight Loss» (resumen)', url: 'https://pubmed.ncbi.nlm.nih.gov/35443107/', palabras: 282, ppm: 100, donde: 'resumen, 282 palabras' },
    { t: 'JAMA Intern Med 2020 · ensayo TREAT «Effects of Time-Restricted Eating on Weight Loss…» (acceso abierto)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7522780/', palabras: 1404, ppm: 100, donde: 'resumen (333) + Discussion entera (960) + 1.er párrafo de Conclusions (111) = 1.404 palabras' },
  ], nota: 'Lectura crítica con fuentes concretas: la Academia (meta-análisis) y los 2 ensayos que prueban la «ventana» de Panda contra la misma restricción calórica sin ventana. Con eso rellenas la tabla de la acción.' },
  '10#1': { piezas: [ytF1('H1T5uMeYv9Q', 'TEDxReno · «Feeling good | David Burns» (17:57)', 0, 1077)], nota: 'La charla del propio Burns, entera.' },
  '10#2': { piezas: [ytF1('-Id7lQkfuqo', 'Feeling Good Podcast (Burns) · «507: Mastering the Daily Mood Log» (1:02:09)', 0, 1200)], nota: 'El podcast del propio Burns sobre el registro diario de pensamientos (Daily Mood Log: la triple columna está dentro): sus primeros 20 minutos, sin marcas de capítulo.' },
  '10#3': { piezas: [ytF1('bBO0Rs1iUBE', 'Feeling Good Podcast (Burns) · «461: Ask David: Perfectionism, Procrastination, and More!» (1:05:17)', 0, 1200)], nota: 'Burns responde sobre perfeccionismo y procrastinación: los primeros 20 minutos del episodio, sin marcas de capítulo.' },
  '11#1': { piezas: [ytF1('MB5IX-np5fE', 'TED · «This could be why you’re depressed or anxious | Johann Hari» (20:32)', 0, 1232)], nota: 'La charla TED del propio Hari, entera.' }, // v6.10g: sin la bitácora visible (antes «20′ desde donde quedaste»: la 2.ª lectura se quedaba con 0,5′)
  '11#2': { piezas: [ytF1('647AxVPpIGU', 'Politics and Prose · «Johann Hari, “Lost Connections” (w/ Andrew Sullivan)» (1:08:11)', 0, 1200)], nota: 'La presentación del libro por el propio Hari, con Andrew Sullivan: sus primeros 20 minutos (sin marcas de capítulo). Escucha con la pregunta de la acción: dónde exagera.' },
  '12#1': { piezas: [ytF1('0gks6ceq4eQ', 'TED · «You aren’t at the mercy of your emotions — your brain creates them | Lisa Feldman Barrett» (18:29)', 0, 1109)], nota: 'La charla TED de la propia Barrett, entera.' },
  '12#2': { piezas: [ytF1('KliAI9umFyY', 'University of Waikato · «How Emotions Are Made: The Secret Life of the Brain — Dr Lisa Feldman Barrett» (1:13:54)', 0, 1200)], nota: 'La conferencia del libro, por la propia Barrett: tramo 1 (min 0:00-20:00), sin marcas de capítulo.' },
  '12#3': { piezas: [ytF1('KliAI9umFyY', 'University of Waikato · «How Emotions Are Made: The Secret Life of the Brain — Dr Lisa Feldman Barrett» (1:13:54)', 1200, 2400)], nota: 'Tramo 2 de la conferencia: sigue donde paraste el vie 18-dic (min 20:00). Del 40:00 al final (preguntas del público) no es tarea.' },
  '13#1': { piezas: [ytF1('r7_R7EXTYNA', 'Parents League of New York · «ADHD 2.0: A Conversation with Author Ned Hallowell» (1:04:38)', 0, 1200)], nota: 'Conversación con el propio Hallowell sobre ADHD 2.0: tramo 1 (min 0:00-20:00), sin marcas de capítulo.' },
  '13#2': { piezas: [ytF1('r7_R7EXTYNA', 'Parents League of New York · «ADHD 2.0: A Conversation with Author Ned Hallowell» (1:04:38)', 1200, 2400)], nota: 'Tramo 2: sigue donde paraste ayer (min 20:00). Del 40:00 al final no es tarea.' },
  '14#1': { piezas: [ytF1('zxd-_xRB00I', 'GPS Parent Series · «Driven to Distraction: ADHD — Shift from Deficits to Strengths with Dr. Ed Hallowell» (58:40)', 0, 1174)], nota: 'La charla del propio Hallowell en 3 tramos iguales, en orden (sin marcas de capítulo): hoy el 1/3.' },
  '14#2': { piezas: [ytF1('zxd-_xRB00I', 'GPS Parent Series · «Driven to Distraction: ADHD — Shift from Deficits to Strengths with Dr. Ed Hallowell» (58:40)', 1174, 2347)], nota: 'Tramo 2/3: sigue donde paraste ayer (min 19:34).' },
  '14#3': { piezas: [ytF1('zxd-_xRB00I', 'GPS Parent Series · «Driven to Distraction: ADHD — Shift from Deficits to Strengths with Dr. Ed Hallowell» (58:40)', 2347, 3520)], nota: 'Tramo 3/3: sigue donde paraste el mar 29-dic (min 39:07) hasta el final.' },
  '15#1': { piezas: [ytF1('k7-hoohObr4', 'ADDitude · «Managing Executive Function & Working Memory Challenges in Adults with ADHD (with Peg Dawson, Ed.D.)» (1:00:44)', 300, 1380)], nota: 'La propia Dawson (adultos): capítulos «what are executive skills?» → «how to build habits» (min 5:00-23:00; los 5 primeros minutos son la presentación del webinar).' },
  '15#2': { piezas: [ytF1('k7-hoohObr4', 'ADDitude · «Managing Executive Function & Working Memory Challenges in Adults with ADHD (with Peg Dawson, Ed.D.)» (1:00:44)', 1380, 2640)], nota: 'Capítulos «66 days: two case studies» → «what environment is best for people with ADHD?» (min 23:00-44:00). Del 44:00 al final (preguntas) no es tarea.' },
};
/** v6.10e (18-nov-2026 · BASE CERO): en F1, Business se presenta como el ciclo que se repite en cada bloque de OUTPUT —escuchar al propio autor → nota de
 *  3 líneas o 1 tarjeta de mecanismo → OUTPUT de 1 página (Palmerton: entender el porqué antes de producir; tracker Metricas_v2 como criterio)—: el aviso
 *  va en la 1.ª lectura de cada bloque y en su OUTPUT, AL FINAL (no mueve fechas de destino). null en el resto y desde el 4-ene. DATA/BUSINESS/METODO_BASE_CERO.md. */
function bizBaseCeroDe(r: DiaBiz): string | null {
  if (r.fecha > FECHAS_V6.transicion.hasta) return null;
  const work = BIZ_DIAS.filter((x) => bizModo(x) !== 'DESCANSO');
  const i = work.findIndex((x) => x.d === r.d);
  if (i < 0) return null;
  const k = work.slice(0, i).filter((x) => bizModo(x) === 'OUTPUT').length + 1;
  if (bizModo(r) === 'OUTPUT') return `BASE CERO · este OUTPUT S${k} cierra su bloque: pasas al siguiente con la página terminada y sus lecturas marcadas en el tracker (regla Metricas_v2: < 80 % dos semanas seguidas → se ajusta el plan).`;
  const prev = work[i - 1];
  if (prev && bizModo(prev) !== 'OUTPUT') return null;
  return `BASE CERO · empieza el bloque del OUTPUT S${k} (${r.materia}): Business es un ciclo que se repite —escuchar al propio autor → nota de 3 líneas o 1 tarjeta de mecanismo → OUTPUT de 1 página—; ${k === 1 ? 'hoy es el primero: no hace falta saber nada del tema' : 'mismo ciclo que el bloque anterior'}.`;
}
function bizTramoF1De(r: DiaBiz) {
  if (r.libroN == null || r.fecha > FECHAS_V6.transicion.hasta) return undefined;
  const k = BIZ_DIAS.filter((x) => x.libroN === r.libroN && x.d <= r.d && (bizModo(x) === 'L' || bizModo(x) === 'CRITICA')).length;
  return BIZ_TRAMO_F1[`${r.libroN}#${k}`];
}
const minPiezaF1 = (p: BizPiezaF1): number => (p.seg ? (p.seg[1] - p.seg[0]) / 60 : (p.palabras ?? 0) / (p.ppm ?? 100));
/** Enlaces del plan Business comprobados el 18-oct-2026 que NO sirven (caídos / no reproducibles / subidas de 2 min) y su sustituto
 *  (el generador gen_business_plan.py ya los reemplaza en businessStudyPlan.ts; esta tabla solo explica el aviso si una fila vieja los trae). */
const BIZ_CAIDOS = new Set(['nHR8B8V2v9s', 'RzeLu23_XjE', 'UbQvc8QrnJw', '5Bgufm9VwfU', 'hiDeEu9a_UA', 'hd2oXclE15U', 'dhrQqaH_M6Q', 'JM3yjVTmUoY', '3s65q2rTFRk']);
/** ¿Dónde va Business hoy? null = sin Business (fin de semana, feriado, fuera de plan). Ver decisiones en la cabecera. */
/** OUTPUTs de la semana L-V que cierra el sábado `iso` (normalmente el del viernes; al final del plan hay OUTPUT en lun/mar). */
function bizOutputsDeSemana(sabado: string): Array<{ r: DiaBiz; entero: boolean }> {
  const out: Array<{ r: DiaBiz; entero: boolean }> = [];
  // v6.09: si el sábado ANTERIOR fue sin sesión (sáb 21-nov, viaje), sus OUTPUT se cierran hoy, antes que los de esta semana (regla general; con la
  //   v6.09 esa semana ya no tiene OUTPUT —va el lun 23— y lo que se arrastra es solo su fila del tracker: bizTrackerSoloDe)
  const prev = addDias(sabado, -7);
  if (sabadoLibre(prev)) out.push(...bizOutputsDeSemana(prev));
  for (let k = 5; k >= 1; k--) {
    const f = addDias(sabado, -k);
    const r = bizDiaDe(f);
    if (r && bizModo(r) === 'OUTPUT') out.push({ r, entero: outputEnteroAlSabado(f) }); // v6.06: + SIM 100Q 11:00 de F2 · v6.07 (fix): solo en viernes
  }
  return out;
}
/** v6.09 (16-nov-2026): sábados SIN SESIÓN inmediatamente anteriores a `sab` cuya semana tuvo lecturas de Business y NINGÚN OUTPUT (sáb 21-nov: el
 *  OUTPUT S1 corrió al lun 23, tras su última lectura del vie 20) → su fila del tracker semanal se llena el sábado `sab` (bizCierreDe · soloTracker). */
function bizTrackerSoloDe(sab: string): string[] {
  const out: string[] = [];
  for (let x = addDias(sab, -7), i = 0; i < 8 && sabadoLibre(x); i++, x = addDias(x, -7)) {
    const lecturas = [1, 2, 3, 4, 5].some((k) => { const r = bizDiaDe(addDias(x, -k)); return !!r && bizModo(r) !== 'DESCANSO' && bizModo(r) !== 'OUTPUT'; });
    if (lecturas && !bizOutputsDeSemana(x).length) out.unshift(x);
  }
  return out;
}
/** v6.07 (fix H5/H6): CIERRE de los OUTPUT de la semana que acaba el sábado `sab` (tracker + cierre: 15′ por OUTPUT; 40′ si va entero).
 *  · Sábado de plan → ese sábado, tras la revisión (bizSabIni: 14:30 F1 · 07:45 resto —v6.08: también F2, antes 09:15—; con la clase en vivo y > 15′ →
 *    07:45 desde la v6.09 —hasta la v6.08, 17:15, dentro del baile—; sin ella, si no termina a las 08:25 —gimnasio 08:30-14:00— → 14:00). En F2, si el
 *    CARRIL SÁBADO ENCAPS (encapsGuia.encapsSabadoDe = extra.carril_sabado del SQL, 09:30-10:30) no le deja sitio antes, va al TERMINAR el carril: manda
 *    el SQL y el carril no se mueve (v6.07: el OUTPUT entero de los viernes de SIM 11:00 → sáb 20 · 27-feb · 6-mar 10:30-11:10).
 *  · Sábado PROTEGIDO o SKIP (v6.07: sáb 13-mar = D-1 ENCAPS, con los OUTPUT D120 lun 8 y D121 mar 9-mar) → el PRIMER día hábil tras el último OUTPUT
 *    de la semana y antes de ese sábado con hueco a las 13:00: ni protegido ni SKIP, sin fila de Business propia, sin el ENCAPS 11:00-13:00 (SYNAPSE a
 *    las 13:00) ni NBME, y que termine antes del R↔D de las 13:30 (v6.07: mié 10-mar 13:00-13:30; el jue 11 es el D-2 y el vie 12 el D-1 hábil).
 *    Sin hueco → null (check_rutina_guia lo marca como OUTPUT sin cierre).
 *  null también si la semana no tiene OUTPUT. `motivo` = por qué no va el sábado (null si va el sábado).
 *  v6.09 (16-nov-2026): `soloTracker` = sábados SIN SESIÓN inmediatamente anteriores (sáb 21-nov, viaje) cuya semana tuvo lecturas pero NINGÚN OUTPUT
 *  (el OUTPUT S1 corrió al lun 23, tras su última lectura): su fila del tracker (10′) se llena hoy, con la revisión de esa semana, que también se hace
 *  hoy (revisionesJuntasDe) → sáb 28-nov: tracker de la semana del lun 16 (10′) + OUTPUT S1 (15′) = 25′ → 07:45-08:10, antes del gimnasio.
 *  v6.09 (rev. datos 7): con la clase en vivo (sabadoTheomed) el cierre NUNCA va a las 14:00 (revisión 14:00-14:30 + preparar la clase 14:45): ≤ 15′ →
 *  14:30 · 16-40′ → 07:45 (antes del gimnasio) · > 40′ → no cabe en ningún hueco del sábado: se deja en 07:45 con `excede: true` y check_rutina_guia.js
 *  ABORTA con un error explícito (hay que partirlo a mano). */
export function bizCierreDe(sab: string): { fecha: string; ini: string; fin: string; outs: Array<{ r: DiaBiz; entero: boolean }>; motivo: string | null; soloTracker: string[]; excede?: true } | null {
  if (sabadoLibre(sab)) return null; // v6.09: sábado sin sesión (viaje) → su cierre va con el del sábado siguiente (bizOutputsDeSemana)
  const outs = bizOutputsDeSemana(sab);
  const soloTracker = bizTrackerSoloDe(sab); // v6.09
  if (!outs.length && !soloTracker.length) return null;
  const total = outs.reduce((a, o) => a + (o.entero ? 40 : 15), 0) + 10 * soloTracker.length;
  const motivo = motivoProtegido(sab) ?? (SKIP_V6.has(sab) ? 'día sin sesión (SKIP)' : null);
  if (!motivo) {
    // v6.07: con la clase en vivo (F1 y transición) el cierre va a las 14:30, tras la revisión de las 14:00 y antes de preparar la clase (14:45);
    //   si no cabe en esos 15′ (OUTPUT entero de 40′), iba a las 17:15, después de la clase
    // v6.09 (16-nov-2026): > 15′ con la clase en vivo (sáb 28-nov: tracker de la semana del lun 16 + OUTPUT S1 = 25′) → 07:45, ANTES del gimnasio (08:30) y
    //   de la revisión de las 14:00; hasta la v6.08 iba a las 17:15, tras la clase, pero de 17:00 a 20:00 es el baile (horario fijo del sábado) y nunca se
    //   había usado en F1. Nunca a las 14:00 (datos 7): > 40′ → excede (check_rutina_guia aborta)
    // v6.09 (rev. datos 7): con la clase en vivo, nunca a las 14:00 (revisión + preparar la clase): > 40′ no cabe → 07:45 con excede (check_rutina_guia aborta)
    const excede = sabadoTheomed(sab) && aMin('07:45') + total > aMin(SAB_MANANA_FIN);
    let ini = sabadoTheomed(sab) && total > 15 ? '07:45' : bizSabIni(sab);
    // v6.08 (14-nov-2026): sin la clase en vivo, el cierre va a las 07:45 si termina antes del gimnasio (08:25); si no (v6.08: sáb 20-mar, F3, con los
    //   3 OUTPUT del final del plan = 70′ —el S15 del NBME 29 entero (40′) + 15′ + 15′; rev. est5—), a las 14:00, al volver del gimnasio (SYNAPSE detrás:
    //   synSabadoResto)
    if (!sabadoTheomed(sab) && aMin(ini) + total > aMin(SAB_MANANA_FIN)) ini = SAB_TARDE_INI;
    const cs = faseV6(sab) === 'F2' ? encapsSabadoDe(sab) : null;
    if (cs && aMin(ini) < aMin(cs.fin) && aMin(ini) + total > aMin(cs.ini)) ini = cs.fin;
    return { fecha: sab, ini, fin: aHHMM(aMin(ini) + total), outs, motivo: null, soloTracker, ...(excede ? { excede: true as const } : {}) };
  }
  const ultimo = (outs.map((o) => o.r.fecha).sort().pop() as string | undefined) ?? addDias(sab, -6);
  for (let d = addDias(ultimo, 1); d < sab; d = addDias(d, 1)) {
    const w = dow(d), r = bizDiaDe(d);
    if (w < 1 || w > 5 || SKIP_V6.has(d) || motivoProtegido(d)) continue;
    if ((r && bizModo(r) !== 'DESCANSO') || encapsOnceATrece(d) || hitoDe(d)?.nbme || aMin('13:00') + total > aMin('13:30')) continue;
    return { fecha: d, ini: '13:00', fin: aHHMM(aMin('13:00') + total), outs, motivo, soloTracker };
  }
  return null;
}
/** v6.07 (fix H6): aviso del VIERNES (o día de NBME) cuyo OUTPUT va ENTERO al cierre de la semana: dónde y a qué hora (sábado tras la revisión o,
 *  en F2 con el carril SÁBADO ENCAPS, al terminar el carril). null si hoy no hay OUTPUT entero. Lo pinta plantillasV6 en las notas del día. */
export function bizAvisoOutputEnteroDe(iso: string): string | null {
  const r = bizDiaDe(iso);
  if (!r || bizModo(r) !== 'OUTPUT' || !outputEnteroAlSabado(iso)) return null;
  const sab = addDias(iso, 6 - dow(iso));
  const c = bizCierreDe(sab);
  if (!c) return null;
  const cs = c.fecha === sab && faseV6(sab) === 'F2' ? encapsSabadoDe(sab) : null;
  const tras = cs && c.ini === cs.fin ? `, al terminar el carril SÁBADO ENCAPS (${cs.ini}-${cs.fin}, la hora del SQL)` : '';
  return `Business: el OUTPUT de hoy (D${r.d} · ${((/^OUTPUT[^·:—]*/.exec(r.lectura) || [r.lectura.split(':')[0]])[0] as string).trim()}) no cabe hoy (${hitoDe(iso)?.nbme ? 'NBME' : 'ENCAPS 11:00-13:00 → SYNAPSE 13:00-13:30'}): va ENTERO (40′) el ${fCorta(c.fecha)} ${c.ini}-${c.fin}${tras}.`;
}
export function bizFranjaDe(iso: string): { ini: string; fin: string; sabado?: boolean; cierre?: boolean } | null {
  const w = dow(iso);
  if (w === 6) {
    const c = bizCierreDe(iso); // v6.07 (fix H5): un sábado PROTEGIDO / SKIP no lleva el cierre (va al día que da bizCierreDe)
    if (c && c.fecha === iso) return { ini: c.ini, fin: c.fin, sabado: true, cierre: true };
    // v6.10c: sábado con Business a hora fija (corrida_s1.extra › business: sáb 2-ene 21:30-21:55, la última lectura de F1) → su fila es de TRABAJO y
    //   sigue abajo (franja L-V de plan, 13:00-13:25: plantillasV6 › bloqueCorrido la lleva a su hora real). Ese sábado no tiene cierre (lo vigila check_rutina_guia)
    if (!franjaExtraDe(iso, 'business')) return null;
  }
  const r = bizDiaDe(iso);
  // v6.10: domingo con Business a hora fija (corrida_s1.extra › business: dom 29-nov 05:00-05:25, recupera el mar 17) → su fila es de TRABAJO
  //   v6.10c: también el sábado (sáb 2-ene 21:30)
  const extraBiz = (w === 0 || w === 6) && !!franjaExtraDe(iso, 'business');
  if (!r || bizModo(r) === 'DESCANSO' || (w === 0 && !extraBiz)) {
    // v6.07 (fix H5): día hábil sin fila de Business que recibe el CIERRE de la semana porque su sábado es protegido / SKIP (mié 10-mar 13:00)
    if (w >= 1 && w <= 5) { const c = bizCierreDe(addDias(iso, 6 - w)); if (c && c.fecha === iso) return { ini: c.ini, fin: c.fin, cierre: true }; }
    return null;
  }
  const h = hitoDe(iso);
  if (h?.nbme) return bizModo(r) === 'OUTPUT' ? null : { ini: '12:30', fin: '12:55' };
  // v6.06 (31-oct-2026): el SIM 100Q de las 11:00 de F2 (SIM_F2_11) empuja el SYNAPSE a 13:00-13:30 → un OUTPUT ese viernes va ENTERO al
  //   sábado (09:15 en F2), como el de un viernes de NBME (v6.06: vie 26-feb, SIM #7; antes Business terminaba antes del 1.er SIM de las 11:00).
  // v6.07 (fix): con los SIM de la quincena final (lun 1 · mié 3 · vie 5-mar) en SIM_F2_11, el resto de días con el ENCAPS 11:00-13:00 (lectura
  //   L / CRÍTICA, o un OUTPUT que no es de viernes) ya no puede ir a 13:00-13:25 (SYNAPSE 13:00-13:30): pasa a 14:45-15:10 (BIZ_ENCAPS_11).
  if (encapsOnceATrece(iso)) return outputEnteroAlSabado(iso) && bizModo(r) === 'OUTPUT' ? null : { ...BIZ_ENCAPS_11 };
  // v6.10: el día extra devuelve la franja L-V (13:00-13:25, la hora de PLAN): plantillasV6 › bloqueCorrido + moverGuia la llevan a su hora real (05:00)
  return { ini: '13:00', fin: '13:25' };
}
export function guiaBusinessDe(iso: string): GuiaBloque | null {
  const f = bizFranjaDe(iso);
  if (!f) return null;
  const franja = `${f.ini}–${f.fin}`;
  if (f.cierre) {
    // v6.07 (fix H5): el cierre puede ir a un día hábil (sábado PROTEGIDO / SKIP → bizCierreDe); v6.07 (fix H6): en F2, tras el carril SÁBADO ENCAPS
    const sab = f.sabado ? iso : addDias(iso, 6 - dow(iso));
    const c = bizCierreDe(sab);
    const movido = !f.sabado && !!c && !!c.motivo;
    const cs = f.sabado && faseV6(iso) === 'F2' ? encapsSabadoDe(iso) : null;
    const trasCarril = !!cs && f.ini === cs.fin;
    const datos = movido ? `con los datos de la semana hasta hoy: el ${fCorta(sab)} es ${c?.motivo} y no hay revisión semanal` : `los mismos de la revisión semanal de las ${revisionIniDe(iso)}`;
    const pasos: GuiaPaso[] = [];
    // v6.09: OUTPUT arrastrados de la semana de un sábado sin sesión (regla general; en la v6.09 no hay: el OUTPUT S1 va el lun 23, semana del sáb 28)
    const arrastrado = (r: DiaBiz): boolean => r.fecha < addDias(sab, -6);
    // v6.09: semana de un sábado sin sesión SIN OUTPUT (sáb 21-nov: el OUTPUT S1 corrió al lun 23) → solo su fila del tracker (10′), primero
    for (const x of c ? c.soloTracker : []) {
      const nL = [1, 2, 3, 4, 5].filter((k) => { const r0 = bizDiaDe(addDias(x, -k)); return !!r0 && bizModo(r0) !== 'DESCANSO' && bizModo(r0) !== 'OUTPUT'; }).length;
      const sigOut = BIZ_DIAS.find((r0) => r0.fecha > x && bizModo(r0) === 'OUTPUT');
      pasos.push(P(10, `TRACKER semanal (1 fila) — semana del ${fCorta(lunesDeIso(addDias(x, -5)))}: sueño 7-8 h ≥ 6/7 · ejercicio ≥ 5/7 · comida real ≥ 6/7 · score ≥ 85 % · lecturas L ${nL}/${nL} · output 0`,
        `El ${fCorta(x)} no hubo sesión (viaje) y esa semana no tuvo OUTPUT${sigOut ? ` (el ${sigOut.lectura.split(':')[0].split(' · ')[0]} corrió al ${fCorta(sigOut.fecha)}, tras su última lectura)` : ''}: la fila de ESA semana se llena hoy, con los datos de su revisión ${revisionFicheroDe(x).replace('.md', '')}${revisionDomingoDe(x) ? ` (hecha el ${fCorta(revisionDomingoDe(x)!.domingo)} a la vuelta del viaje)` : ', que también se hace hoy'}.`, { t: '◆ 01_PULSO', url: PULSO_OBS }));
    }
    for (const { r, entero } of c ? c.outs : bizOutputsDeSemana(sab)) {
      const nom = r.lectura.split(':')[0];
      if (!entero && arrastrado(r)) { pasos.push(
        P(10, `TRACKER semanal (1 fila) del ${nom} — semana del ${fCorta(lunesDeIso(r.fecha))}: sueño 7-8 h ≥ 6/7 · ejercicio ≥ 5/7 · comida real ≥ 6/7 · score ≥ 85 % · lecturas L 4/4 · output 1`, `Del OUTPUT del ${r.wd.toLowerCase()} ${Number(r.fecha.slice(8))}: el ${fCorta(addDias(r.fecha, 6 - dow(r.fecha)))} no hubo sesión (viaje) → la fila de ESA semana se llena hoy (mismos datos que su revisión ${revisionFicheroDe(addDias(r.fecha, 6 - dow(r.fecha))).replace('.md', '')}${revisionDomingoDe(addDias(r.fecha, 6 - dow(r.fecha))) ? `, hecha el ${fCorta(revisionDomingoDe(addDias(r.fecha, 6 - dow(r.fecha)))!.domingo)} a la vuelta del viaje` : ', que también se hace hoy'}).`, { t: '◆ 01_PULSO', url: PULSO_OBS }),
        P(5, `Releer la página del ${nom} y cerrarla`, 'Corrige 1 cosa; ✓ en Empresa › Business › HOY.'),
      ); continue; } // v6.09
      if (entero) pasos.push(
        P(1, `${/^OUTPUT/.test(nom) ? nom : `OUTPUT · ${nom}`} (${r.wd} ${r.fecha.slice(8)})`, `El ${r.wd.toLowerCase()} fue día de ${hitoDe(r.fecha)?.nbme ? 'NBME' : 'SIM 100Q del ENCAPS a las 11:00 (SYNAPSE a las 13:00)'}: el OUTPUT entero se hace hoy${trasCarril && cs ? `, a las ${f.ini}, al terminar el carril SÁBADO ENCAPS (${cs.ini}-${cs.fin})` : ''}.`),
        P(25, `Escribir el entregable: ${r.lectura}`, `1 página en Obsidian (01_PULSO): ${r.accion}. Con tus horarios reales (Calendar: dormir 21:00 → 04:00).`, { t: '◆ 01_PULSO', url: PULSO_OBS }),
        P(10, 'TRACKER semanal (1 fila): sueño 7-8 h ≥ 6/7 · ejercicio ≥ 5/7 · comida real ≥ 6/7 · lecturas L 4/4 · output 1', `Con los datos de la semana que acaba de cerrar (${datos}).`),
        P(4, 'Cerrar: releer y marcar ✓', 'Empresa › Business (Estudio Pulso) › HOY.'),
      );
      else pasos.push(
        P(10, `TRACKER semanal (1 fila) del ${nom}: sueño 7-8 h ≥ 6/7 · ejercicio ≥ 5/7 · comida real ≥ 6/7 · score ≥ 85 % · lecturas L 4/4 · output 1`, `Del OUTPUT del ${r.wd.toLowerCase()} ${r.fecha.slice(8)}: la fila se llena con la semana cerrada (${movido ? datos : aMin(f.ini) < aMin(revisionIniDe(iso)) ? `los mismos datos que usará la revisión de las ${revisionIniDe(iso)}` : `mismos datos de la revisión de las ${revisionIniDe(iso)}`}).`, { t: '◆ 01_PULSO', url: PULSO_OBS }),
        P(5, `Releer la página del ${nom} y cerrarla`, 'Corrige 1 cosa; ✓ en Empresa › Business › HOY.'),
      );
    }
    const nArr = (c ? c.outs : []).filter((o) => arrastrado(o.r)).length; // v6.09
    const nSolo = c ? c.soloTracker.length : 0; // v6.09
    const aviso = nSolo && c
      ? `Hoy van DOS filas del tracker: la de la semana del ${c.soloTracker.map((x) => fCorta(lunesDeIso(addDias(x, -5)))).join(' y ')} (el ${c.soloTracker.map(fCorta).join(', ')} no hubo sesión: viaje) y la del ${c.outs.map((o) => `${o.r.lectura.split(':')[0].split(' · ')[0]} (D${o.r.d} ${o.r.wd.toLowerCase()} ${Number(o.r.fecha.slice(8))})`).join(' · ') || 'OUTPUT de esta semana'} + el cierre de su página: ${10 * nSolo + c.outs.reduce((a, o) => a + (o.entero ? 40 : 15), 0)}′ = ${f.ini}-${f.fin}${aMin(f.ini) < aMin(revisionIniDe(iso)) ? `, antes del gimnasio (08:30) y de la revisión de las ${revisionIniDe(iso)}` : ''}.`
      : nArr && c
      ? `Hoy se cierran DOS semanas: el ${fCorta(addDias(sab, -7))} no hubo sesión (viaje) y su OUTPUT (${c.outs.filter((o) => arrastrado(o.r)).map((o) => `D${o.r.d} ${o.r.wd.toLowerCase()} ${Number(o.r.fecha.slice(8))}`).join(' · ')}) va con el de esta semana: ${c.outs.length} × 15′ = ${f.ini}-${f.fin}${aMin(f.ini) < aMin(revisionIniDe(iso)) ? `, antes del gimnasio (08:30) y de la revisión de las ${revisionIniDe(iso)}` : ''}.`
      : movido && c
      ? `El ${fCorta(sab)} es PROTEGIDO (${c.motivo}): el cierre de los OUTPUT de esta semana (${c.outs.map((o) => `D${o.r.d} ${o.r.wd.toLowerCase()} ${Number(o.r.fecha.slice(8))}`).join(' · ')}; 15′ cada uno) va hoy ${f.ini}-${f.fin}, el primer día hábil tras el último OUTPUT con hueco a las 13:00 antes del protegido (hoy Business no tiene lectura propia; termina antes del R↔D de las 13:30).`
      : `El OUTPUT (40′) no cabe en 13:00-13:25: 25′ el día del OUTPUT + 15′ tras la revisión semanal (o entero en el cierre de la semana si ese día fue NBME o SIM 100Q de las 11:00).${trasCarril && cs ? ` Hoy va a las ${f.ini}-${f.fin}, al terminar el carril SÁBADO ENCAPS (${cs.ini}-${cs.fin}, la hora del SQL: el carril no se mueve).` : ''}`;
    return bloque(franja, 'business', `BUSINESS · cierre del OUTPUT de la semana (tracker semanal)`, pasos, [R('◆ Pulso · concepto madre', PULSO_OBS)],
      'fila del tracker semanal escrita + página del OUTPUT cerrada', { aviso });
  }
  const r = bizDiaDe(iso) as DiaBiz;
  const modo = bizModo(r);
  const h = hitoDe(iso);
  const recursos: GuiaRecurso[] = [R('◆ Pulso · concepto madre', PULSO_OBS)];
  const avisos: string[] = [];
  if (h?.uwsa) avisos.push('Hoy UWSA1: Business se ESCUCHA durante el almuerzo (13:00-13:30); la nota, al terminar.');
  if (h?.nbme) avisos.push('Hoy NBME: almuerzo 12:30-13:00 → Business se escucha durante el almuerzo; SYNAPSE 13:00.');
  // v6.07 (fix): día con el ENCAPS 11:00-13:00 (SIM 100Q de lunes / miércoles de la quincena final, D-2) → Business a las 14:45 (BIZ_ENCAPS_11)
  const once = f.ini === BIZ_ENCAPS_11.ini;
  if (once) avisos.push(`Hoy el ENCAPS va a la hora del examen (${iso === D2_ENCAPS ? 'D-2 · DRESS REHEARSAL' : 'SIM 100Q'} 11:00-13:00) y el SYNAPSE pasa a 13:00-13:30: Business se hace a las ${BIZ_ENCAPS_11.ini}-${BIZ_ENCAPS_11.fin}, la media hora que AURUM (14:15-14:45) deja libre antes del MIR de las 15:15.`);
  // v6.09 (joseph 9): 1.ª lectura con el D1 sin sesión (lun 16-nov) → sale como D2; se explica para que nadie busque el D1
  // v6.10: con el lun 16 y el mar 17 sin sesión, la 1.ª lectura (mié 18) sale como D3 y el aviso nombra los dos días
  const bizPrev = BIZ_DIAS.filter((x) => x.d < r.d);
  if (r.d > 1 && bizPrev.every((x) => perdidoDelPlan(x.fecha))) avisos.push(bizPrev.length > 1 // v6.10d: perdidoDelPlan (el mié 18 con alias no cuenta)
    ? `Primera lectura. Sale como D${r.d} porque el D1 era el ${fCorta(BIZ_DIAS[0]!.fecha)}: ${bizPrev.map((x) => fCorta(x.fecha)).join(' y ')} fueron sin sesión; así la numeración de 2027 no cambia.`
    : `Primera lectura. Sale como D${r.d} porque el D1 era el ${fCorta(BIZ_DIAS[0]!.fecha)} (sin sesión, v6.09); así la numeración de 2027 no cambia.`);
  // v6.10: domingo de recuperación a hora fija (dom 29-nov 05:00-05:25) — la hora real va escrita (fuera de la franja L-V que moverGuia desplaza)
  // v6.10c: también el sábado (sáb 2-ene 21:30-21:55, la última lectura de F1, tras el SYNAPSE de las 21:00)
  const fx = dow(iso) === 0 || dow(iso) === 6 ? franjaExtraDe(iso, 'business') : null;
  if (fx) avisos.push(dow(iso) === 6
    ? `Hoy sábado, a hora fija (${fx.ini}-${fx.fin}, al terminar el SYNAPSE de las 21:00): la lectura que toca en orden (el mar 17-nov fue sin sesión y cada lectura de F1 corrió un día hasta fin de año: hoy, la última de F1; desde el lunes, las fechas de siempre).`
    : `Hoy domingo, a hora fija (${fx.ini}-${fx.fin}, antes de la rutina de las 05:45): la lectura que toca en orden (el mar 17-nov fue sin sesión y cada lectura de F1 corrió un día; desde el lun 30-nov, las fechas de siempre).`);
  // v6.09 (joseph 5): en F1 / transición el OUTPUT va después de la última lectura de su módulo (gen_business_plan.py): el viernes de esa lectura y el
  //   lunes del OUTPUT lo dicen
  const nomOut = (x: DiaBiz): string => x.lectura.split(':')[0].split(' · ')[0] as string;
  if (iso <= FECHAS_V6.transicion.hasta && modo === 'OUTPUT' && dow(iso) !== 5) {
    const ult = BIZ_DIAS.filter((x) => x.fecha < iso && (bizModo(x) === 'L' || bizModo(x) === 'CRITICA')).pop();
    if (ult) avisos.push(`Hoy ${diaRealNom(iso, 'business')}, ${nomOut(r)} (en F1 no va el viernes): su última lectura (${ult.lectura.split(':')[0]}) fue el ${fCorta(ult.fecha)} y el OUTPUT va siempre DESPUÉS de ella.`); // v6.10g: sin paréntesis (el Calendar corta el aviso a 240: «OUTPUT = 40′: 25′ hoy + 15′ el sábado HH:MM» va detrás)
  }
  if (iso <= FECHAS_V6.transicion.hasta && dow(iso) === 5 && (modo === 'L' || modo === 'CRITICA')) {
    const sig = BIZ_DIAS.find((x) => x.fecha > iso && bizModo(x) !== 'DESCANSO');
    // v6.10: con el D1 en miércoles el viernes de F1 aún no es la última lectura del módulo: el OUTPUT va tras ella (mar 24 · lun 30-nov) → se avisa igual
    const sigO = BIZ_DIAS.find((x) => x.fecha > iso && bizModo(x) === 'OUTPUT');
    const ultL = sigO ? BIZ_DIAS.filter((x) => x.fecha < sigO.fecha && (bizModo(x) === 'L' || bizModo(x) === 'CRITICA')).pop() : undefined;
    if (sig && bizModo(sig) !== 'OUTPUT' && sigO && ultL && ultL.fecha > iso && sigO.fecha <= addDias(iso, 7)) {
      const fx = franjaExtraDe(ultL.fecha, 'business');
      avisos.push(`Hoy ${diaRealNom(iso, 'business')} no va el OUTPUT: faltan lecturas del módulo (la última, ${ultL.lectura.split(':')[0]}, el ${fCorta(ultL.fecha)}${fx ? ` ${fx.ini}` : ''}); el ${nomOut(sigO)} va el ${fCorta(sigO.fecha)}, después de ella (F1 corrió por los días sin sesión).`);
    }
    if (sig && bizModo(sig) === 'OUTPUT') {
      const sabO = addDias(sig.fecha, 6 - dow(sig.fecha)), cO = bizCierreDe(sabO);
      avisos.push(`Hoy ${diaRealNom(iso, 'business')} va la ÚLTIMA lectura del módulo, no el OUTPUT: el ${nomOut(sig)} va el ${fCorta(sig.fecha)}, después de esta lectura (F1 corrió por los días sin sesión)${cO ? `, y su cierre (tracker + releer) el ${fCorta(cO.fecha)} ${cO.ini}` : ''}.`);
    }
  }
  if (modo === 'OUTPUT') {
    const pasos = [
      P(1, `${/^OUTPUT/.test(r.lectura) ? r.lectura.split(':')[0] : `OUTPUT · ${r.lectura.split(':')[0]}`}`, 'Lee el entregable y la acción.'),
      P(22, `Escribir: ${r.lectura}`, `Página nueva en Obsidian › 02_EMPRESA FINANZAS › 01_PULSO. ${r.accion}. Con tus horarios reales (Calendar: dormir 21:00 → 04:00). Terminado > perfecto.`, { t: '◆ 01_PULSO', url: PULSO_OBS }),
      P(2, 'Guardar', (() => { // v6.07 (fix H5): el cierre va donde diga bizCierreDe (sábado tras la revisión, o el día hábil si el sábado es protegido)
        const sabO = addDias(iso, 6 - dow(iso)), cO = bizCierreDe(sabO);
        if (sabadoLibre(sabO)) { const s2 = sabadoConSesionTras(sabO), c2 = bizCierreDe(s2); return `El ${fCorta(sabO)} no hay sesión (viaje): tracker semanal + cierre (15′) de este OUTPUT el ${fCorta(s2)} ${c2 ? c2.ini : bizSabIni(s2)}, junto con el de esa semana.`; } // v6.09
        return cO && cO.motivo ? `El ${fCorta(cO.fecha)} ${cO.ini} (el ${fCorta(sabO)} es ${cO.motivo}: sin revisión semanal): tracker semanal + cierre (15′).`
          : `El sábado ${cO ? cO.ini : bizSabIni(sabO)} (${cO && aMin(cO.ini) < aMin(revisionIniDe(sabO)) ? `antes del gimnasio; la revisión semanal es a las ${revisionIniDe(sabO)}` : 'tras la revisión semanal'}): tracker semanal + cierre (15′).`; // v6.09: el cierre de 2 semanas del sáb 28-nov va a las 07:45
      })()),
    ];
    return bloque(franja, 'business', `BUSINESS D${r.d} · ${r.lectura.split(':')[0]} (1/2)`, pasos, recursos, 'página del OUTPUT escrita en 01_PULSO (borrador completo)',
      { aviso: [...avisos, `OUTPUT = 40′: 25′ hoy + 15′ ${cierreOutput(iso)} (tracker + cierre).`, bizBaseCeroDe(r) ?? ''].filter(Boolean).join(' ') });
  }
  const tramo = bizTramoDe(r); // v6.03: por fila del plan (libro + nº de lectura), no por fecha
  const tramoF1 = tramo ? undefined : bizTramoF1De(r); // v6.09b (a2-2): pieza fija de F1
  const pasos: GuiaPaso[] = [P(1, `OBJETIVO · ${r.materia}${modo === 'CRITICA' ? ' (lectura CRÍTICA)' : ''}`, `Lee la lectura y la acción de hoy: ${r.accion}`)];
  if (tramoF1) {
    const tot = tramoF1.piezas.reduce((a, p) => a + minPiezaF1(p), 0), m = tramoF1.min ?? Math.ceil(tot - 0.05);
    const lee = tramoF1.piezas.every((p) => !p.seg);
    const qp = tramoF1.piezas.map((p) => (p.seg ? `${p.t} → ${mmss(p.seg[0])}-${mmss(p.seg[1])}` : `${p.t} → ${p.donde}`)).join(' + ');
    // v6.09b lote 1-quater FX1 (revisión V1/V2): si el paso tiene minutos fijados distintos del material medido, el «qué» dice los dos (25-nov: «22,8′ de material en 21′»;
    //   antes «(21′ en total)» contra los 22,8′ del «cómo») · el «tema de hoy» es el de las piezas (tramoF1.tema), no el de la fila entera
    const minTxt = Math.abs(tot - m) >= 0.5 ? `${tot.toFixed(1).replace('.', ',')}′ de material en ${m}′` : `${m}′${tramoF1.piezas.length > 1 ? ' en total' : ''}`;
    pasos.push(P(m, `${lee ? 'LEER' : 'ESCUCHAR/VER'} · ${qp} (${minTxt}) · tema de hoy: ${tramoF1.tema ?? r.lectura}`,
      `${tramoF1.nota} ${lee ? `Lectura a ${tramoF1.piezas.map((p) => `${p.ppm ?? 100}`).filter((x, i, a) => a.indexOf(x) === i).join(' / ')} palabras/min = ${tot.toFixed(1).replace('.', ',')}′.` : `1,0× = ${tot.toFixed(1).replace('.', ',')}′ con subtítulos en inglés (auto-traducción al español si pierdes el hilo).`}`, // remate v6.10j (visibilidad #2): la cifra pegada a la velocidad, para que el corte del Calendar la deje entera
      { t: tramoF1.piezas[0]!.seg ? `▶ desde ${mmss(tramoF1.piezas[0]!.seg[0])}` : '📄 abrir', url: tramoF1.piezas[0]!.url }));
    for (const p of tramoF1.piezas) recursos.push(R(p.t, p.url, { min: Math.round(minPiezaF1(p) * 10) / 10 }));
  } else if (tramo) {
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
  return bloque(franja, 'business', `BUSINESS D${r.d} · ${r.materia} — ${r.lectura.split(':')[0]}`, pasos, recursos, `tramo escuchado/leído + «${r.accion.replace(/\.$/, '')}» hecho`, // v6.10e (revisión del 18-nov · dias-1920-17): la acción entera (≤ 113 car.; antes slice(0, 80) la cortaba a media frase)
    { aviso: [...avisos, minutosFranja(franja) === 25 && !h && !once && !fx ? 'Business 13:00-13:25; en ÁMBAR, solo 13:00-13:15.' : '' /* v6.10 (c12, 18-nov): sin nombrar eventos que el Calendar ya no tiene («LECTURA DE LIBRO», siesta) */, bizBaseCeroDe(r) ?? ''].filter(Boolean).join(' ') || undefined,
      planB: 'Sin datos/YouTube: el libro en papel o PDF, 20′ del capítulo indicado. Sin tiempo hoy: el tramo pasa a la próxima sesión de Business (1 tramo por sesión, en orden).' }); // v6.10g: no «mañana» (vie 20-nov → lun 23, sáb 2-ene)
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
/** v6.09 (16-nov-2026): sábados cuya revisión se hace HOY además de la propia = los sábados sin sesión inmediatamente anteriores. Vacío en el resto.
 *  v6.09b (17-nov): salvo los que la hacen en su DOMINGO DE LLEGADA (revisionDomingoDe: sáb 21-nov → dom 22 14:30) → el sáb 28 vuelve a ser solo la S02. */
export function revisionesJuntasDe(sab: string): string[] {
  const out: string[] = [];
  for (let x = addDias(sab, -7), i = 0; i < 8 && sabadoLibre(x) && !revisionDomingoDe(x); i++, x = addDias(x, -7)) out.unshift(x);
  return out;
}
/** v6.09b (17-nov · auditoría a2-12/a2-14): DOMINGO DE LLEGADA (corrida_s1 sin sesión + encapsManana.encapsRecuperaDe(dom).llegada; dom 22-nov) tras un
 *  sábado sin sesión (sabadoLibre: sáb 21-nov, viaje) → la revisión de ese sábado va ESE domingo, sola, en los 30′ antes de la recuperación ENCAPS
 *  (14:30-15:00) · null en el resto. Antes iba junto con la S02 el sáb 28 en los mismos 30′ (38′ de material). */
export function revisionDomingoDe(sab: string): { domingo: string; ini: string } | null {
  if (!sabadoLibre(sab)) return null;
  const dom = addDias(sab, 1), rec = domingoLlegadaDe(dom);
  return rec ? { domingo: dom, ini: aHHMM(aMin(rec.ini) - 30) } : null;
}
/** v6.09b: el domingo de llegada (dom 22-nov: llegada 14:00, recuperación ENCAPS 15:00-16:30) o null. */
function domingoLlegadaDe(iso: string): { llegada: string; ini: string; fin: string } | null {
  if (dow(iso) !== 0 || corridaS1De(iso)?.tipo !== 'sin_sesion') return null;
  const rec = encapsRecuperaDe(iso);
  return rec && rec.llegada ? { llegada: rec.llegada, ini: rec.ini, fin: rec.fin } : null;
}
/** v6.09b: sábado cuya revisión se hace el día `iso` (el propio sábado, o el sábado sin sesión de la víspera si `iso` es su domingo de llegada). */
export function revisionSabadoDe(iso: string): string {
  const sab = addDias(iso, -1);
  return dow(iso) === 0 && revisionDomingoDe(sab)?.domingo === iso ? sab : iso;
}
export function guiaRevisionDe(iso: string): GuiaBloque | null {
  // v6.09b: + el domingo de llegada (dom 22-nov), con la revisión del sábado sin sesión de la víspera (S01_2026-11-21)
  const sab = revisionSabadoDe(iso), enDomingo = sab !== iso;
  if (dow(sab) !== 6 || sab < FECHAS_V6.f1.inicio) return null;
  if (sabadoLibre(sab) && !enDomingo) return null; // v6.09: sábado sin sesión (viaje) → su revisión va su domingo de llegada (v6.09b) o con la del sábado siguiente (revisionesJuntasDe)
  const fichero = revisionFicheroDe(sab);
  const ruta = `${REPO}/DATA/USMLE/REVISIONES/${fichero}`;
  const d1 = FECHAS_V6.f1.inicio;
  const juntas = enDomingo ? [] : revisionesJuntasDe(sab); // v6.09: [sáb 21-nov] el sáb 28-nov · v6.09b: [] (la S01 va el dom 22)
  const ficheros = [...juntas.map(revisionFicheroDe), fichero];
  // v6.09b: la revisión del sábado anterior se hizo en su domingo de llegada (sáb 28-nov: la S01 fue el dom 22)
  const previa = enDomingo ? null : revisionDomingoDe(addDias(sab, -7));
  const sabPrev = previa ? addDias(sab, -7) : null;
  // v6.03: 1.er sábado desde el D1 (mié 21 → sáb 24-oct; antes D1 + 5, que solo valía con D1 en lunes) · v6.05: lun 26 → sáb 31-oct · v6.09: si ese sábado fue
  //   sin sesión (sáb 21-nov), la «primera» es la del sábado siguiente (sáb 28-nov), que se hace junto con ella · v6.09b: la S01 va el dom 22 (es la primera)
  const sab1 = addDias(d1, (6 - dow(d1) + 7) % 7);
  const primera = (juntas[0] ?? sab) === sab1;
  // v6.05: la semana 2 (lunes → jueves de los runners ENCAPS y la semana ISO del journal) sale de la fecha, no de un texto fijo (v6.02c/v6.03: lun 26 → jue 29-oct, 2026-W44)
  const lun2 = addDias(sab, 2);
  // v6.10 (17-nov-2026): los runners ENCAPS de la semana 2 salen de encapsGuia (bancos SIN runner de lun → dom; v6.10: mié 25, jue 26 y dom 29-nov, que
  //   recupera el mar 17; los del lun 23 y mar 24 ya existen). Antes «del lun 23 al jue 26» fijo.
  const sesS2 = Array.from({ length: 7 }, (_, k) => sesionEncapsDe(addDias(lun2, k))).filter((s): s is NonNullable<typeof s> => !!s && s.tipo === 'banco');
  const yTxt = (xs: string[]): string => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} y ${xs[xs.length - 1]}` : xs[0] ?? '');
  const pendS2 = sesS2.filter((s) => !s.principal).map((s) => fCorta(s.fecha)), hechosS2 = sesS2.filter((s) => !!s.principal).map((s) => fCorta(s.fecha));
  const runnersS2 = sesS2.length
    ? pendS2.length ? `runners ENCAPS del ${yTxt(pendS2)} generados (eval + banco; E4${hechosS2.length ? `; los del ${yTxt(hechosS2)} ya existen` : ''})` : `runners ENCAPS de la semana ya generados (${yTxt(hechosS2)})`
    : `runners ENCAPS del ${fCorta(lun2)} al ${fCorta(addDias(lun2, 3))} generados (eval + banco; E4)`;
  // remate v6.10l: «NO gen_encaps_minisim.js --semana …» (el script nombrado, como el «Ojo» de los bancos: gen_encaps_semana.js --semana, el cierre, sí se corre)
  // v6.10j (rev. c14, dias-clave #1 y #8): con runners por generar, el paso 5 EMPIEZA por su receta —«NO --semana» delante (re-sortearía los ya armados) y
  //   la cadena gen_encaps_minisim --eval/--banco por día → sync → guía → deploy, la misma regla que la guía ENCAPS: los genera esta revisión; si no, antes del
  //   primero— y el journal de la semana 2 nace el día REAL en que journal_hoy.js lo crea (el lunes de PLAN: con el alias, el mar 24-nov; antes «el lunes»)
  const pendSes = sesS2.filter((s) => !s.principal);
  const cadenaS2 = pendSes.length ? `\`node DATA/_scripts/gen_encaps_minisim.js --eval ${pendSes[0]!.fecha}\` → \`--banco ${pendSes[0]!.fecha}\`${pendSes.slice(1).map((s) => ` → \`--eval ${s.fecha}\` → \`--banco ${s.fecha}\``).join('')} → \`node DATA/_scripts/sync_encaps_bp_web.js\` → \`node DATA/_scripts/gen_encaps_guia.js\` → deploy` : '';
  const recetaS2 = pendSes.length ? `Runners ENCAPS del ${yTxt(pendS2)} (eval + banco), los genera esta revisión (si no, antes del ${pendS2[0]}): NO gen_encaps_minisim.js --semana ${lun2}${hechosS2.length ? ` (re-sortearía los del ${yTxt(hechosS2)}, ya armados)` : ''} → ${cadenaS2} (--eval y --banco = el mismo gen_encaps_minisim.js). · ` : '';
  const prep = primera
    // remate v6.10j (revisión adversarial, visibilidad #4): la comprobación de AccessDerma va DELANTE de la receta (la cadena de comandos alarga el corte del
    //   Calendar hasta su «deploy» y empujaba fuera «Semana 2: AccessDerma renovado …»)
    ? `¿AccessDerma renovado? (si no, Derma sigue en PLAN B: selector en Derma › HOY) · ${recetaS2}Semana ${Number(fichero.slice(1, 3)) + 1}: ${pendSes.length ? '' : `${runnersS2} · `}velocidad de vídeo USMLE de la S${Number(fichero.slice(1, 3)) + 1} = 1,25× solo si tu free recall recogió ≥ 3 ideas · el journal ${vibeSemanaISO(lun2)} lo crea journal_hoy.js el ${fCorta(lun2)}.`
    : 'Lo que la semana que entra necesita listo: accesos (Qbankly, ProMIR, AccessDerma), runners ENCAPS de la semana, hito USMLE si lo hay (ver la línea «hito» del fichero).';
  // v6.10j (rev. c14, diffs #0 y #7 · cambios-v610i #0, #2, #3 y #4): el «cómo» de RELLENAR empieza por los RÓTULOS de todas las métricas (el Calendar corta
  //   a 110 y antes solo dejaba ver «4 ENCAPS …») y después el detalle de cada una, sacado del plan de ESA semana (encapsRevDe · usmleRevDe). ENCAPS va
  //   primero hasta su examen; después, último y solo si su ventana trae algo (la S18 recoge el mini-sim, el dress rehearsal y el examen de la semana sin revisión)
  const encR = encapsRevDe(sab), encActivo = ventanaRevision(sab)[1] <= FECHAS_V6.encaps.examen;
  const rot = [...(encActivo ? ['4 ENCAPS'] : []), '1 USMLE', '2 uWorld', '5 MIR', '8 sueño', ...(!encActivo && encR.items.length ? ['4 ENCAPS'] : [])];
  const detRev: Record<string, string> = {
    '4 ENCAPS': `4 ENCAPS: ${encR.items.join(' + ') || 'sin mini-sim ni SIM esta semana'}${encR.proxima.length ? ` (${encR.proxima.join(' y ')}: en la próxima)` : ''}${sabadoTheomed(sab) ? ' + post-tests de Theomed (nota), banqueo de las mañanas (n y % ciego), errores nuevos y repetidos (misma regla)' : ''}`,
    '1 USMLE': `1 USMLE: ${usmleRevDe(sab)}`,
    '2 uWorld': `2 uWorld: % vs mínimo del próximo hito${primera ? ' (aún sin hito, sin juicio: la línea base es el NBME 25; el UWSA1 va en el tramo 2)' : ''}`,
    '5 MIR': '5 MIR: eval D-1',
    '8 sueño': '8 sueño (VITALS)',
  };
  const rellenar = `${rot.join(' · ')}; nunca se inventa: lo que no tengas queda «sin dato» → ${rot.map((k) => detRev[k]).join(' · ')}.`;
  const ini = enDomingo ? (revisionDomingoDe(sab)?.ini ?? revisionIniDe(sab)) : revisionIniDe(sab); // v6.07: 14:00 los sábados con la clase en vivo de Theomed (F1 y transición) · 07:15 en el resto · v6.09b: el domingo de llegada, 30′ antes de la recuperación ENCAPS
  const nomJ = ficheros.map((x) => x.replace('.md', '')).join(' + ');
  const forzar = (s: string): string => (sabadoLibre(s) ? ' --forzar' : '');
  const cmdJ = juntas.map((s) => `\`node DATA/_scripts/gen_revision_semanal.js ${s} --forzar\` y `).join('');
  const cmdPrev = sabPrev ? ` (la ${revisionFicheroDe(sabPrev).replace('.md', '')} se generó el ${fCorta(addDias(sabPrev, 1))} con \`node DATA/_scripts/gen_revision_semanal.js ${sabPrev} --forzar\`; si no llegaste a hacerla, córrelo ahora y deja sus métricas «sin dato»: las 4 decisiones van solo aquí)` : '';
  return bloque(franjaDesde(ini, 30), 'revision', `REVISIÓN SEMANAL · ${nomJ}${enDomingo ? ` (la del ${fCorta(sab)}, hoy domingo de llegada)` : sabPrev ? ` (la ${revisionFicheroDe(sabPrev).replace('.md', '')} fue el ${fCorta(addDias(sabPrev, 1))})` : ''}`, [
    P(3, juntas.length ? `GENERAR y abrir ${ficheros.join(' y ')} (el ${juntas.map(fCorta).join(', ')} no hubo sesión: van juntas)` : `GENERAR y abrir ${fichero}`, `Home › PROGRESO → «Sincronizar ahora» (plan_checks) · luego en D:\\joseph-md-app: ${cmdJ}\`node DATA/_scripts/gen_revision_semanal.js ${sab}${forzar(sab)}\` → crea DATA/USMLE/REVISIONES/${ficheros.join(' y ')} y actualiza _semanas.json${cmdPrev}.`, { t: `abrir ${fichero}`, url: vsc(ruta) }),
    P(8, juntas.length ? `RELLENAR a mano las métricas «sin dato» de las ${ficheros.length} semanas (primero ${ficheros[0]?.replace('.md', '')}, la más corta)` : 'RELLENAR a mano las métricas «sin dato»', rellenar),
    P(5, 'CHECKLIST G + burnout §6', 'Marca G1-G10 y las 5 casillas de burnout. UNA alarma = corrección esta semana; 2+ = semana ÁMBAR.'),
    P(6, juntas.length ? `DECIDIR (4 líneas, solo en ${fichero.replace('.md', '')}: la semana que entra)` : 'DECIDIR (4 líneas en el fichero)', 'Nivel de la semana que entra (VERDE / ÁMBAR / DELOAD) · 1 corrección concreta (qué, cuándo, cómo se mide el sábado que viene) · 1 cosa que se deja · Anki sáb/dom = vencidas × 20 s.'),
    P(5, 'PREPARAR la semana siguiente', prep),
    P(3, 'GUARDAR + ✓', 'Guarda el .md (sin commit: lo hace el flujo de siempre).'),
  ], [...juntas.map((s) => R(revisionFicheroDe(s), vsc(`${REPO}/DATA/USMLE/REVISIONES/${revisionFicheroDe(s)}`))), R(fichero, vsc(ruta)), R('Método: DATA/REVISION_SEMANAL.md (GitHub)', GH + 'DATA/REVISION_SEMANAL.md')],
  `${ficheros.join(' y ')} con las 10 métricas rellenas (o «sin dato») + las 4 decisiones escritas`,
  { planB: 'Si el script falla (sin red / Supabase caído): copia la plantilla de DATA/REVISION_SEMANAL.md y rellénala a mano en los mismos 30′.',
    aviso: enDomingo
      ? `${primera ? 'Primera revisión con plan (S01), ' : ''}hoy domingo de llegada, a las ${ini}: es la del ${fCorta(sab)} (sin sesión: viaje), sola y en sus 30′, antes de la recuperación ENCAPS de las ${aHHMM(aMin(ini) + 30)}. El fichero no existe hasta que corres el comando del paso 1 (lleva --forzar porque su sábado fue sin sesión). La S${String(Number(fichero.slice(1, 3)) + 1).padStart(2, '0')} va el sáb ${Number(addDias(sab, 7).slice(8))}, sola.`
      : juntas.length
        ? `${primera ? 'Primera revisión con plan: ' : ''}${ficheros.map((x) => x.replace('.md', '')).join(' + ')} en los mismos 30′ (el ${juntas.map(fCorta).join(', ')} no hubo sesión: viaje). Los ficheros no existen hasta que corres los comandos del paso 1; la S01 necesita --forzar porque su sábado fue sin sesión.`
        : sabPrev
          ? `Primera revisión de sábado con plan: la ${revisionFicheroDe(sabPrev).replace('.md', '')} (semana del ${fCorta(addDias(sabPrev, -5))}) se hizo el ${fCorta(addDias(sabPrev, 1))}, a la vuelta del viaje; hoy, solo la ${fichero.replace('.md', '')}, en sus 30′.`
          : primera ? 'Primera revisión con plan (S01). El fichero no existe hasta que corres el comando del paso 1.' : undefined });
}
