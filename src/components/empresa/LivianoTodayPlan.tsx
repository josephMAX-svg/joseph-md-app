import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from './primitives';
import { FadeUp } from './visuals';
import { LIV_META, LIV_FRANJAS, LIV_DIAS, DiaLiviano, livDiaDe, livProximos, livColor } from '../../lib/livianoStudyPlan';
import {
  LIV_RUBRICA, LIV_META_RUBRICA, LIV_META_CIEGO_PCT, LivAnkiCard, LivCaso, LivDrill,
  livCasoDe, livDrillDe, livCardsDeDia, livPretest, livAnkiDeck,
} from '../../lib/livianoCasos';
import { planHoyD, loadDone, saveDone } from '../../lib/studyProgress';

/**
 * LivianoTodayPlan — "LIVIANO Academia" día a día (90 días L-V · medicina de la obesidad).
 * v2 (Palmerton v3): el ✓ binario pasa a SCORE medido:
 *   · LUNES  → pre-test ciego 5Q sobre la semana D-7 (tarjetas de mecanismo) → % ciego
 *   · DRILL  → cifras ancla en ciego (D37 · D58 · D77 · D88) → % ciego
 *   · VIERNES→ caso del banco LIV_CASOS con rúbrica 0-2 × 4 → rúbrica media
 * Persistencia: localStorage 'jmd-liviano-score' (este dispositivo). El ✓ de studyProgress
 * ('liviano') se sigue escribiendo para el progreso global, pero lo que se muestra es el % real.
 * Generado desde DATA/BUSINESS/liviano_curriculum.json (gen_liviano_plan.js).
 */
const SALVIA = '#9DB07F';
const VIOLET = '#A78BFA';
const SCORE_KEY = 'jmd-liviano-score';
const isWeb = Platform.OS === 'web' && typeof window !== 'undefined';

interface ScoreEntry { ok: number; total: number; fecha: string }
interface RubricaEntry { items: number[]; fecha: string }
interface ScoreStore {
  v: 1;
  pretests: Record<string, ScoreEntry>;
  drills: Record<string, ScoreEntry>;
  rubricas: Record<string, RubricaEntry>;
}
const EMPTY: ScoreStore = { v: 1, pretests: {}, drills: {}, rubricas: {} };

function loadScore(): ScoreStore {
  if (!isWeb) return EMPTY;
  try {
    const raw = window.localStorage.getItem(SCORE_KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw);
    return { v: 1, pretests: p.pretests || {}, drills: p.drills || {}, rubricas: p.rubricas || {} };
  } catch { return EMPTY; }
}
function saveScore(s: ScoreStore) {
  if (!isWeb) return;
  try { window.localStorage.setItem(SCORE_KEY, JSON.stringify(s)); } catch {}
}

function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return LIV_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}
const pct = (ok: number, total: number) => (total > 0 ? Math.round((ok / total) * 100) : 0);

/** Resumen del score (lo que se muestra como "% real"). */
function resumenScore(s: ScoreStore) {
  const ciego = [...Object.values(s.pretests), ...Object.values(s.drills)];
  const ok = ciego.reduce((a, e) => a + e.ok, 0);
  const total = ciego.reduce((a, e) => a + e.total, 0);
  const rub = Object.values(s.rubricas);
  const rubPts = rub.reduce((a, e) => a + e.items.reduce((x, y) => x + y, 0), 0);
  const rubMax = rub.length * LIV_META_RUBRICA.max;
  const ciegoPct = pct(ok, total);
  const rubPct = pct(rubPts, rubMax);
  const partes = [total > 0 ? ciegoPct : null, rubMax > 0 ? rubPct : null].filter((x): x is number => x !== null);
  const global = partes.length ? Math.round(partes.reduce((a, b) => a + b, 0) / partes.length) : null;
  return { ok, total, ciegoPct, rubN: rub.length, rubPts, rubMax, rubPct, rubMedia: rub.length ? rubPts / rub.length : 0, global };
}
const colorPct = (p: number, meta: number) => (p >= meta ? Colors.green : p >= meta * 0.8 ? Colors.brass : Colors.coral);

function ColaItem({ icon, lbl, val, sub, color }: { icon: string; lbl: string; val: string; sub: string; color: string }) {
  return (
    <View style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
      </View>
    </View>
  );
}

/** Tarjeta pregunta → revelar → ✓/✗ (pre-test y drill comparten el motor). */
function QuizBlock({ titulo, sub, color, qs, guardado, onSave }: {
  titulo: string; sub: string; color: string; qs: { q: string; a: string }[];
  guardado?: ScoreEntry; onSave: (ok: number, total: number) => void;
}) {
  const [reveal, setReveal] = useState<Record<number, boolean>>({});
  const [resp, setResp] = useState<Record<number, boolean>>({});
  const [editando, setEditando] = useState(!guardado);
  const contestadas = Object.keys(resp).length;
  const ok = Object.values(resp).filter(Boolean).length;
  if (!qs.length) return null;
  return (
    <View style={[st.quiz, { borderColor: color + '66' }]}>
      <View style={st.quizHead}>
        <Text style={[st.quizTitle, { color }]}>{titulo}</Text>
        <Chip label={`${qs.length} Q · ciego`} color={color} small />
      </View>
      <Text style={st.quizSub}>{sub}</Text>
      {guardado && !editando ? (
        <View style={st.quizSaved}>
          <Text style={[st.quizSavedPct, { color: colorPct(pct(guardado.ok, guardado.total), LIV_META_CIEGO_PCT) }]}>{pct(guardado.ok, guardado.total)} %</Text>
          <Text style={st.quizSavedTxt}>{guardado.ok}/{guardado.total} correctas · guardado {guardado.fecha}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => { setReveal({}); setResp({}); setEditando(true); }} style={st.linkBtn}>
            <Text style={[st.linkBtnTxt, { color }]}>↻ repetir</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {qs.map((x, i) => (
            <View key={i} style={st.qRow}>
              <Text style={st.qNum}>{i + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.qTxt}>{x.q}</Text>
                {reveal[i] ? <Text style={[st.aTxt, { color }]}>{x.a}</Text> : null}
                <View style={st.qBtns}>
                  {!reveal[i] ? (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setReveal(r => ({ ...r, [i]: true }))} style={[st.miniBtn, { borderColor: color + '66' }]}>
                      <Text style={[st.miniBtnTxt, { color }]}>ver respuesta</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => setResp(r => ({ ...r, [i]: true }))} style={[st.miniBtn, resp[i] === true ? { backgroundColor: Colors.green, borderColor: Colors.green } : { borderColor: Colors.green + '88' }]}>
                        <Text style={[st.miniBtnTxt, { color: resp[i] === true ? '#0B1628' : Colors.green }]}>✓ la sabía</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => setResp(r => ({ ...r, [i]: false }))} style={[st.miniBtn, resp[i] === false ? { backgroundColor: Colors.coral, borderColor: Colors.coral } : { borderColor: Colors.coral + '88' }]}>
                        <Text style={[st.miniBtnTxt, { color: resp[i] === false ? '#0B1628' : Colors.coral }]}>✗ fallé</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity
            activeOpacity={0.85} disabled={contestadas < qs.length}
            onPress={() => { onSave(ok, qs.length); setEditando(false); }}
            style={[st.saveBtn, contestadas < qs.length ? { opacity: 0.4, borderColor: color + '44' } : { backgroundColor: color, borderColor: color }]}
          >
            <Text style={[st.saveBtnTxt, { color: contestadas < qs.length ? color : '#0B1628' }]}>
              {contestadas < qs.length ? `responde las ${qs.length} (${contestadas}/${qs.length})` : `guardar: ${ok}/${qs.length} = ${pct(ok, qs.length)} % ciego`}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

/** Caso del viernes + rúbrica 0-2 × 4. */
function CasoBlock({ caso, color, guardado, onSave }: { caso: LivCaso; color: string; guardado?: RubricaEntry; onSave: (items: number[]) => void }) {
  const [verDec, setVerDec] = useState(false);
  const [items, setItems] = useState<number[]>(() => guardado?.items || [-1, -1, -1, -1]);
  const completo = items.every(x => x >= 0);
  const total = items.filter(x => x >= 0).reduce((a, b) => a + b, 0);
  return (
    <View style={[st.caso, { borderColor: color + '66' }]}>
      <View style={st.quizHead}>
        <Text style={[st.quizTitle, { color }]}>🩺 Caso {caso.id}/16 · semana {caso.semana} · {caso.bloque}</Text>
      </View>
      <Text style={st.casoTitulo}>{caso.titulo}</Text>
      <Text style={st.casoLbl}>PACIENTE</Text>
      <Text style={st.casoTxt}>{caso.paciente}</Text>
      <Text style={st.casoLbl}>DATOS</Text>
      {caso.datos.map((x, i) => <Text key={i} style={st.casoBullet}>· {x}</Text>)}
      <Text style={[st.casoLbl, { color: Colors.coral }]}>RED FLAGS</Text>
      {caso.redFlags.map((x, i) => <Text key={i} style={[st.casoBullet, { color: Colors.tertiary }]}>⚠ {x}</Text>)}
      <Text style={st.casoLbl}>CONSIGNA (20 min, en voz alta)</Text>
      <Text style={[st.casoTxt, { fontWeight: '700' }]}>{caso.consigna}</Text>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setVerDec(v => !v)} style={[st.miniBtn, { borderColor: color + '66', alignSelf: 'flex-start', marginTop: 8 }]}>
        <Text style={[st.miniBtnTxt, { color }]}>{verDec ? 'ocultar' : 'revelar'} las 3 decisiones esperadas + cierre (después del role-play)</Text>
      </TouchableOpacity>
      {verDec ? (
        <View style={st.decBox}>
          {caso.decisiones.map((x, i) => <Text key={i} style={st.casoBullet}>{i + 1}. {x}</Text>)}
          <Text style={[st.casoLbl, { marginTop: 8 }]}>FRASE DE CIERRE</Text>
          <Text style={[st.casoTxt, { fontStyle: 'italic' }]}>"{caso.cierre}"</Text>
          <Text style={[st.casoLbl, { marginTop: 8 }]}>FUENTE</Text>
          <Text style={st.casoSub}>{caso.fuente}</Text>
        </View>
      ) : null}

      <Text style={[st.casoLbl, { marginTop: 12 }]}>RÚBRICA 0-2 × 4 · meta ≥ {LIV_META_RUBRICA.porCaso}/{LIV_META_RUBRICA.max}</Text>
      {LIV_RUBRICA.map((r, i) => (
        <View key={r.id} style={st.rubRow}>
          <View style={{ flex: 1 }}>
            <Text style={st.rubItem}>{r.item}</Text>
            <Text style={st.rubDesc}>{r.desc}</Text>
            {caso.pistas[r.id] ? <Text style={[st.rubDesc, { color }]}>pista: {caso.pistas[r.id]}</Text> : null}
          </View>
          <View style={st.rubBtns}>
            {[0, 1, 2].map(n => (
              <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => setItems(prev => prev.map((v, j) => (j === i ? n : v)))}
                style={[st.rubBtn, items[i] === n ? { backgroundColor: color, borderColor: color } : { borderColor: color + '55' }]}>
                <Text style={[st.rubBtnTxt, { color: items[i] === n ? '#0B1628' : color }]}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      <Text style={st.rubLeyenda}>0 = {LIV_RUBRICA[0].n0} · 1 = {LIV_RUBRICA[0].n1} · 2 = {LIV_RUBRICA[0].n2}</Text>
      <TouchableOpacity activeOpacity={0.85} disabled={!completo} onPress={() => onSave(items)}
        style={[st.saveBtn, !completo ? { opacity: 0.4, borderColor: color + '44' } : { backgroundColor: color, borderColor: color }]}>
        <Text style={[st.saveBtnTxt, { color: completo ? '#0B1628' : color }]}>
          {completo ? `guardar rúbrica: ${total}/${LIV_META_RUBRICA.max} (${pct(total, LIV_META_RUBRICA.max)} %)` : 'puntúa los 4 ítems'}
        </Text>
      </TouchableOpacity>
      {guardado ? <Text style={st.quizSavedTxt}>guardado {guardado.fecha}: {guardado.items.reduce((a, b) => a + b, 0)}/{LIV_META_RUBRICA.max}</Text> : null}
    </View>
  );
}

function AnkiBlock({ cards, modulo, color }: { cards: LivAnkiCard[]; modulo: string; color: string }) {
  const [open, setOpen] = useState(false);
  const [reveal, setReveal] = useState<Record<number, boolean>>({});
  return (
    <View style={[st.anki, { borderLeftColor: VIOLET }]}>
      <View style={st.quizHead}>
        <Text style={st.ankiTitle}>🧠 Anki · {livAnkiDeck(modulo)}</Text>
        <Chip label={`${cards.length} tarjetas de hoy`} color={VIOLET} small />
      </View>
      <Text style={st.quizSub}>Tarjetas de MECANISMO generadas del "estudio" de hoy. CSV importable: DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv (deck en columna 3). Sin tarjetas nuevas hoy si es caso de viernes.</Text>
      {cards.length ? (
        <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(o => !o)} style={[st.miniBtn, { borderColor: VIOLET + '66', alignSelf: 'flex-start' }]}>
          <Text style={[st.miniBtnTxt, { color: VIOLET }]}>{open ? 'ocultar' : 'ver'} tarjetas</Text>
        </TouchableOpacity>
      ) : null}
      {open ? cards.map((c, i) => (
        <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => setReveal(r => ({ ...r, [i]: !r[i] }))} style={st.ankiCard}>
          <Text style={st.qTxt}>{c.q}</Text>
          {reveal[i] ? <Text style={[st.aTxt, { color }]}>{c.a}</Text> : <Text style={st.casoSub}>toca para ver la respuesta</Text>}
        </TouchableOpacity>
      )) : null}
    </View>
  );
}

export default function LivianoTodayPlan() {
  const iso = todayISO();
  const hoyD = planHoyD(LIV_DIAS, iso);
  const todayDia = livDiaDe(iso) || LIV_DIAS.find((x) => x.d === hoyD) || LIV_DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('liviano')));
  const [score, setScore] = useState<ScoreStore>(loadScore);
  const dia: DiaLiviano = LIV_DIAS.find((x) => x.d === sel) || LIV_DIAS[0];
  const esHoy = dia.d === todayDia.d;
  const c = livColor(dia.modulo);
  const hecho = done.has(dia.d);
  const res = useMemo(() => resumenScore(score), [score]);

  const marcarHecho = (d: number, valor?: boolean) => setDone((prev) => {
    const n = new Set(prev);
    const v = valor === undefined ? !n.has(d) : valor;
    if (v) n.add(d); else n.delete(d);
    saveDone('liviano', Array.from(n));
    return n;
  });
  const persist = (next: ScoreStore) => { setScore(next); saveScore(next); };
  const stamp = () => todayISO();

  const caso: LivCaso | undefined = dia.casoId ? livCasoDe(dia.casoId) : undefined;
  const drill: LivDrill | undefined = dia.drill ? livDrillDe(dia.d) : undefined;
  const pretestQs = dia.pretest ? livPretest(dia.d) : [];
  const cards = livCardsDeDia(dia.d);
  const proximos = livProximos(dia.d, 5);

  return (
    <View>
      {/* Cabecera */}
      <View style={st.head}>
        <Text style={st.headTitle}>⚖️ LIVIANO ACADEMIA · Día {dia.d}/{LIV_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
        <Text style={st.headSub}>{fmtFecha(dia.fecha)} · {dia.fecha} · {LIV_META.franja}</Text>
        {/* SCORE real (sustituye al ✓ binario) */}
        <View style={st.scoreRow}>
          <View style={st.scoreCell}>
            <Text style={[st.scoreNum, { color: res.total ? colorPct(res.ciegoPct, LIV_META_CIEGO_PCT) : Colors.muted }]}>{res.total ? `${res.ciegoPct} %` : '—'}</Text>
            <Text style={st.scoreLbl}>% CIEGO REAL</Text>
            <Text style={st.scoreSub}>{res.total ? `${res.ok}/${res.total} Q · pre-tests + drills` : 'sin pre-test aún'}</Text>
          </View>
          <View style={st.scoreCell}>
            <Text style={[st.scoreNum, { color: res.rubN ? colorPct(res.rubPct, LIV_META_RUBRICA.mediaPct) : Colors.muted }]}>{res.rubN ? `${res.rubMedia.toFixed(1)}/8` : '—'}</Text>
            <Text style={st.scoreLbl}>RÚBRICA MEDIA</Text>
            <Text style={st.scoreSub}>{res.rubN ? `${res.rubN} caso${res.rubN > 1 ? 's' : ''} · ${res.rubPct} %` : 'sin caso evaluado'}</Text>
          </View>
          <View style={st.scoreCell}>
            <Text style={[st.scoreNum, { color: res.global !== null ? colorPct(res.global, LIV_META_CIEGO_PCT) : Colors.muted }]}>{res.global !== null ? `${res.global} %` : '—'}</Text>
            <Text style={st.scoreLbl}>SCORE · META {LIV_META_CIEGO_PCT} %</Text>
            <Text style={st.scoreSub}>Palmerton: medir por % ciego</Text>
          </View>
        </View>
      </View>
      {!esHoy && (
        <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}>
          <Text style={st.hoyBtnTxt}>↩ volver a HOY</Text>
        </TouchableOpacity>
      )}

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {/* Tema del día */}
        <FadeUp>
          <View style={[st.temaCard, { borderColor: c + '55' }]}>
            <View style={st.temaTop}>
              <View style={[st.modBadge, { backgroundColor: c + '1F', borderColor: c + '66' }]}>
                <Text style={[st.modBadgeTxt, { color: c }]}>{dia.modulo}</Text>
              </View>
              <Chip label={`${dia.min} min`} color={c} small />
              {dia.casoId ? <Chip label={`🩺 caso ${dia.casoId}/16 · rúbrica`} color={SALVIA} small /> : null}
              {dia.pretest ? <Chip label="📝 pre-test 5Q (D-7)" color={Colors.blue} small /> : null}
              {dia.drill ? <Chip label="🎯 drill cifras ancla" color={Colors.coral} small /> : null}
              {hecho ? <Chip label="✓ hecho" color={SALVIA} small solid /> : null}
            </View>
            <Text style={st.temaTitle}>{dia.tema}</Text>
            <Text style={st.temaSub}>25' mecanismo (Palmerton) + 20' explicárselo al paciente{dia.pretest ? ' · los primeros 5-7 min: pre-test ciego' : ''}</Text>
            {!dia.casoId && !dia.pretest && !dia.drill ? (
              <TouchableOpacity activeOpacity={0.85} onPress={() => marcarHecho(dia.d)}
                style={[st.doneBtn, hecho ? { backgroundColor: SALVIA, borderColor: SALVIA } : { backgroundColor: SALVIA + '14', borderColor: SALVIA + '66' }]}>
                <Text style={[st.doneBtnTxt, { color: hecho ? '#141A0F' : SALVIA }]}>{hecho ? '✓ Hecho (día de contenido)' : '○ Marcar hecho — el score se mide en lunes/viernes/drills'}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </FadeUp>

        {/* Pre-test del lunes */}
        {dia.pretest ? (
          <FadeUp delay={30}>
            <QuizBlock
              titulo="📝 Pre-test ciego · semana anterior (D-7)"
              sub={`5 tarjetas de mecanismo de los días D${dia.d - 5}-D${dia.d - 1}. Responde en voz alta ANTES de ver la respuesta; luego marca honesto. Meta ≥ ${LIV_META_CIEGO_PCT} %.`}
              color={Colors.blue} qs={pretestQs} guardado={score.pretests[String(dia.d)]}
              onSave={(ok, total) => { persist({ ...score, pretests: { ...score.pretests, [String(dia.d)]: { ok, total, fecha: stamp() } } }); marcarHecho(dia.d, true); }}
            />
          </FadeUp>
        ) : null}

        {/* Drill de cifras ancla */}
        {drill ? (
          <FadeUp delay={40}>
            <QuizBlock
              titulo="🎯 Drill de cifras ancla (ciego)"
              sub={`${drill.titulo}. Una cifra por pregunta, sin notas. Lo fallado va a Anki hoy mismo.`}
              color={Colors.coral} qs={drill.qs} guardado={score.drills[String(dia.d)]}
              onSave={(ok, total) => { persist({ ...score, drills: { ...score.drills, [String(dia.d)]: { ok, total, fecha: stamp() } } }); marcarHecho(dia.d, true); }}
            />
          </FadeUp>
        ) : null}

        {/* Caso del viernes */}
        {caso ? (
          <FadeUp delay={40}>
            <CasoBlock caso={caso} color={SALVIA} guardado={score.rubricas[String(caso.id)]}
              onSave={(items) => { persist({ ...score, rubricas: { ...score.rubricas, [String(caso.id)]: { items, fecha: stamp() } } }); marcarHecho(dia.d, true); }} />
          </FadeUp>
        ) : null}

        {/* Bloque de hoy */}
        <Text style={st.secLbl}>📋 Bloque de hoy · 45 min (en orden)</Text>
        <FadeUp delay={40}><ColaItem icon="📖" lbl={`ESTUDIO · ${LIV_FRANJAS[0].hora} (25 min)`} val={dia.estudio} sub="tarjetas de MECANISMO — ¿por qué?, no datos sueltos" color={c} /></FadeUp>
        <FadeUp delay={70}><ColaItem icon="🗣️" lbl={`APLICACIÓN · ${LIV_FRANJAS[1].hora} (20 min)`} val={dia.aplicacion} sub="en voz alta, como si el paciente estuviera al frente" color={SALVIA} /></FadeUp>
        <FadeUp delay={100}><ColaItem icon="📚" lbl="FUENTE (verificar antes de publicar)" val={dia.fuente} sub="regla anti-alucinación: todo dato clínico contra fuente primaria" color={VIOLET} /></FadeUp>

        {/* Anki del día */}
        <FadeUp delay={120}><AnkiBlock cards={cards} modulo={dia.modulo} color={c} /></FadeUp>

        {/* Próximos 5 días */}
        <Text style={st.secLbl}>📆 Próximos 5 días</Text>
        {proximos.map((x, i) => {
          const xc = livColor(x.modulo);
          return (
            <FadeUp key={x.d} delay={i * 30}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(x.d)} style={[st.d5, { borderLeftColor: xc }]}>
                <Text style={[st.d5day, { color: xc }]}>D{x.d}</Text>
                <Text style={st.d5fecha}>{fmtFecha(x.fecha)}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={st.d5sub} numberOfLines={1}>{x.tema}</Text>
                  <Text style={st.d5mod}>{x.modulo} · {x.min} min{x.casoId ? ' · 🩺 caso' : ''}{x.pretest ? ' · 📝 pre-test' : ''}{x.drill ? ' · 🎯 drill' : ''}</Text>
                </View>
                <Text style={[st.d5go, { color: xc }]}>→</Text>
              </TouchableOpacity>
            </FadeUp>
          );
        })}
        <Text style={st.note}>
          {LIV_META.totalDias} días L-V ({LIV_META.inicio} → {LIV_META.fin}) · 7 módulos + síntesis (liviano_curriculum.json) · {LIV_META.casos} casos en viernes
          · {LIV_META.pretests} pre-tests · {LIV_META.drills} drills. Score en este dispositivo ('{SCORE_KEY}').
        </Text>
      </GlassPanel>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, ...Elevation.sm };
const st = StyleSheet.create({
  head: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.xs, alignItems: 'center' },
  headTitle: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2, textAlign: 'center' },
  headSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3, textAlign: 'center' },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm, paddingVertical: 3, paddingHorizontal: 8 },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: SALVIA, fontWeight: '700', letterSpacing: 0.2 },

  scoreRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.md, alignSelf: 'stretch' },
  scoreCell: { flex: 1, minWidth: 120, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 6, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.soft, backgroundColor: 'rgba(255,255,255,0.03)' },
  scoreNum: { fontSize: FontSize.titleLg, lineHeight: LineHeight.titleLg, fontWeight: '800', letterSpacing: -0.4 },
  scoreLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.8, marginTop: 2 },
  scoreSub: { fontSize: 9, color: Colors.muted, marginTop: 2, textAlign: 'center' },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.lg, marginBottom: Spacing.sm },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  modBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 11 },
  modBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },
  temaTitle: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 9, letterSpacing: -0.2 },
  temaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelSm + 1 },
  doneBtn: { marginTop: 12, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.8, marginBottom: 8, marginTop: Spacing.md, textTransform: 'uppercase' },
  cola: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 7 },
  colaIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  colaLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4 },
  colaVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', marginTop: 3, lineHeight: LineHeight.labelMd },
  colaSub: { fontSize: 9, color: Colors.muted, marginTop: 3 },

  // quiz (pre-test / drill)
  quiz: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  quizHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' },
  quizTitle: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 0.2, flexShrink: 1 },
  quizSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, marginBottom: 6, lineHeight: LineHeight.labelSm + 1 },
  quizSaved: { alignItems: 'center', paddingVertical: 8 },
  quizSavedPct: { fontSize: FontSize.headlineSm, lineHeight: LineHeight.headlineSm, fontWeight: '800' },
  quizSavedTxt: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4 },
  linkBtn: { paddingVertical: 4, paddingHorizontal: 8, marginTop: 4 },
  linkBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '700' },
  qRow: { flexDirection: 'row', gap: 8, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  qNum: { width: 18, fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.smallLabel, marginTop: 1 },
  qTxt: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', lineHeight: LineHeight.labelMd + 2 },
  aTxt: { fontSize: FontSize.labelMd, marginTop: 4, lineHeight: LineHeight.labelMd + 2 },
  qBtns: { flexDirection: 'row', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  miniBtn: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 10 },
  miniBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '700' },
  saveBtn: { marginTop: 10, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  saveBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },

  // caso
  caso: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  casoTitulo: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 6 },
  casoLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.8, marginTop: 10, marginBottom: 3 },
  casoTxt: { fontSize: FontSize.labelMd, color: Colors.onSurface, lineHeight: LineHeight.labelMd + 3 },
  casoBullet: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelMd + 3, marginLeft: 4 },
  casoSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  decBox: { marginTop: 8, padding: Spacing.md, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: Hairline.soft },
  rubRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  rubItem: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface },
  rubDesc: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, lineHeight: LineHeight.labelSm + 1 },
  rubBtns: { flexDirection: 'row', gap: 4 },
  rubBtn: { width: 30, height: 30, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  rubBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800' },
  rubLeyenda: { fontSize: 9, color: Colors.muted, marginTop: 6 },

  // anki
  anki: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md, marginBottom: 7 },
  ankiTitle: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, flexShrink: 1 },
  ankiCard: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },

  d5: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  d5day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36, letterSpacing: 0.2 },
  d5fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d5sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d5mod: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  d5go: { fontSize: 16, fontWeight: '800', width: 18, textAlign: 'center' },

  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },
});
