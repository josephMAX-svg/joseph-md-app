// gen_encaps_tail_25jul.js — TAIL de la recta final con el POOL DE SIMULACROS **REAL** verificado en vivo
// el 20-jul-2026 (QX Medic + Theomed logueados, barrido parte por parte). Sustituye el pool proyectado
// (que listaba "Simulacro Virtual N°01..09" cuando solo existen 3) por lo que REALMENTE está publicado,
// + lo que va a publicarse con cadencia conocida (marcado `porPublicar`).
//
// Layout D1=25-jul: contenido d1..d11 (25-jul→6-ago) · d12=7-ago DRESS REHEARSAL 1 (mock completo)
// · d13=8-ago MEDIO DÍA (mock 2 por la MAÑANA a hora real del examen + TARDE LIBRE) · d14=9-ago EXAMEN.
// Dos mocks completos = cierra el hallazgo ALTA del verificador (1 solo mock era punto único de falla).
//   node DATA/_scripts/gen_encaps_tail_25jul.js   (emite _encaps_tail_25jul.sql; aplicar por MCP execute_sql)
const fs = require('fs'); const path = require('path');
const j = o => JSON.stringify(o).replace(/'/g, "''");
const S = (fuente, det, real = true) => ({ fuente, duracion: det, real });

// ── POOL REAL (verificado en vivo 20-jul) ────────────────────────────────────────────────────────
const MOCKS_QX = [                      // QX · Simulacros Virtuales — 100Q · 3h40 · cadencia SEMANAL
  S('QX · SIMULACRO VIRTUAL N°03 (19-jul)', '100Q · 3h40 · el más reciente'),
  S('QX · SIMULACRO VIRTUAL N°02 (12-jul)', '100Q · 3h40'),
  S('QX · SIMULACRO VIRTUAL N°01 (14-jun)', '100Q · 3h40'),
  S('QX · SIMULACRO VIRTUAL N°04 (~26-jul)', '100Q · 3h40 · POR PUBLICAR (semanal)', false),
  S('QX · SIMULACRO VIRTUAL N°05 (~2-ago)', '100Q · 3h40 · POR PUBLICAR (semanal)', false),
];
const MOCKS_TH = [                      // Theomed curso 37 · SIMULACROS MEDICINA — cadencia semanal viernes
  S('Theomed · SIMULACRO 17-jul', '100Q · el más reciente'),
  S('Theomed · SIMULACRO 10-jul', '100Q'), S('Theomed · SIMULACRO 03-jul', '100Q'),
  S('Theomed · SIMULACRO 26-jun', '100Q'), S('Theomed · SIMULACRO 12-jun', '100Q'),
  S('Theomed · SIMULACRO 29-may', '100Q'),
  S('Theomed · EXAMEN 2025-II (banco REAL)', 'examen oficial anterior'),
  S('Theomed · EXAMEN TIPO A', 'examen modelo'), S('Theomed · EXAMEN TIPO B', 'examen modelo'),
  S('Theomed · EXAMEN TIPO A (2)', 'examen modelo'), S('Theomed · EXAMEN TIPO B (2)', 'examen modelo'),
  S('Theomed · SIMULACRO 24-jul', '100Q · POR PUBLICAR (viernes)', false),
  S('Theomed · SIMULACRO 31-jul', '100Q · POR PUBLICAR (viernes)', false),
  S('Theomed · SIMULACRO 07-ago', '100Q · POR PUBLICAR (viernes)', false),
];
// QX · Banqueo ENCAPS por área — 18 sets · 2052 preguntas REALES (se publican a diario por área)
const BANQUEO = [
  S('QX Banqueo · CUIDADO INTEGRAL 1-9 (21-24 jul)', '1.109 preguntas · ÁREA REY'),
  S('QX Banqueo · SALUD PÚBLICA 1-5 (8-11 jul)', '688 preguntas'),
  S('QX Banqueo · ÉTICA E INTERCULTURALIDAD 1-4 (14-17 jul)', '255 preguntas'),
  S('QX Banqueo · INVESTIGACIÓN (próximos días)', 'POR PUBLICAR — re-escanear', false),
  S('QX Banqueo · GESTIÓN (próximos días)', 'POR PUBLICAR — re-escanear', false),
  S('QX · Evaluación Virtual Avanzada (12 sets)', 'por área'),
  S('QX · App BanqueApp (banco vivo)', 'filtrar por sub-tema'),
  S('Theomed · KAHOOTS 2026-2 (19 sets)', 'repaso rápido'),
];

const ex = (act, accion, min, sims) => j({ actividad: act, accion, vueltas: 0, minObjetivo: min, sims, tierCobertura: 'BUFFER' });
const ins = (dia, fecha, wd, tipo, subt, e) =>
  `INSERT INTO study_schedule (examen,dia,fecha,weekday,tipo,codigo,subtema,prioridad,modo,videos,theomed,material_comp,extra,temas_secundarios,updated_at) ` +
  `VALUES ('ENCAPS',${dia},'${fecha}','${wd}','${tipo}',NULL,'${subt.replace(/'/g, "''")}','ALTA','A','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'${e}'::jsonb,'[]'::jsonb,now());`;

const L = [
  `-- ENCAPS tail D1=25-jul · contenido cierra 6-ago (d11) · 7-ago MOCK 1 · 8-ago MEDIO DÍA (mock 2 mañana + tarde libre) · 9-ago EXAMEN (d14)`,
  '-- Pool de simulacros REAL verificado en vivo 20-jul: QX 3 sim virtuales (+2 por publicar) · Theomed 11 quizzes (+3 por publicar) · QX Banqueo 18 sets = 2.052 preguntas',
  'BEGIN;',
  `UPDATE study_schedule SET extra = extra - 'sims', subtema = regexp_replace(subtema, ' \\+ sims extra.*$', ''), updated_at=now() WHERE examen='ENCAPS' AND dia=11;`,
  `UPDATE study_schedule SET dia=14, fecha='2026-08-09', weekday='Domingo', subtema='EXAMEN ENCAPS 2026-II · FECHA REAL 9-ago (el contenido cerró el 6-ago)', updated_at=now() WHERE examen='ENCAPS' AND tipo='examen';`,
  ins(12, '2026-08-07', 'Viernes', 'simulacro',
    '🎯 DRESS REHEARSAL 1 · 1 SIMULACRO COMPLETO continuo cronometrado A LA HORA REAL DEL EXAMEN (100Q · 3h40, NO fragmentar) = ensaya estamina y paceo. Después: cosecha de errores. Usa el más reciente disponible',
    ex('Dress rehearsal 1 (mock completo)', 'Mock completo a ritmo real + cosecha de errores', 170, [...MOCKS_QX, ...MOCKS_TH.slice(0, 7)])),
  ins(13, '2026-08-08', 'Sábado', 'simulacro',
    '🌓 MEDIO DÍA · MAÑANA: DRESS REHEARSAL 2 (2º mock completo a hora real del examen) + review rápido de errores + re-test de los críticos tempranos I-3/V-2/II-3/III-5 y III-9. TARDE LIBRE = descanso real, dormir 7h (NO trasnochar antes del examen)',
    ex('Medio día: mock 2 + re-test críticos + tarde libre', 'Mock 2 por la mañana; tarde LIBRE', 200, [...MOCKS_TH.slice(6), ...BANQUEO])),
  'COMMIT;',
];
fs.writeFileSync(path.join(__dirname, '_encaps_tail_25jul.sql'), L.join('\n'), 'utf8');
console.log(`OK tail · mocks QX=${MOCKS_QX.length} (3 reales) · Theomed=${MOCKS_TH.length} (11 reales) · banqueo=${BANQUEO.length} · 2 DRESS REHEARSALS (7 y 8-ago mañana) · EXAMEN 9-ago · STUDY_TOTAL_DAYS=14`);
