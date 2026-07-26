# PLAN DEFINITIVO ENCAPS 2026-II — D1 = DOMINGO 26-JUL-2026

> **Compilado el 26-jul-2026.** Fuente de verdad operativa: tabla `study_schedule` (examen='ENCAPS')
> en Supabase. Este documento es el resumen humano de lo que está desplegado.
> Meta: **> 17 / 20**. Examen real: **domingo 9-ago-2026**.

---

## 1 · La ventana

| | |
|---|---|
| **D1** | domingo **26-jul** |
| **Contenido cierra** | jueves **6-ago** (d12) |
| **Dress rehearsal 1** | viernes **7-ago** (d13) — mock completo continuo |
| **Medio día** | sábado **8-ago** (d14) — mock 2 por la mañana + **TARDE LIBRE** |
| **EXAMEN** | domingo **9-ago** (d15) |
| **Total** | 15 días · 11 temas con día propio + 6 fusionados + 1 domingo de repaso |

**Los domingos ahora cuentan**: 18:00-22:00 = 4 h reales (Joseph vuelve del negocio ~16-17 h).
Corte a las 22:00 → las 7 h de sueño quedan intactas. Como son horas con fatiga, el domingo
**nunca lleva contenido nuevo pesado**.

---

## 2 · El plan día a día

| Día | Fecha | Tema | Prio | Mapas | Fusionado en ese día |
|----|-------|------|------|-------|----------------------|
| 1 | dom 26-jul *(4 h noche)* | I-5+I-6 Determinantes + Bioestadística | MEDIA | 3 | II-10, II-9, III-4+III-7 |
| 2 | lun 27-jul | **I-3 Vigilancia epidemiológica** | **CRÍTICA** | 4 | III-6+III-10, II-12 |
| 3 | mar 28-jul | **V-2 PEI / POI / FODA** | **CRÍTICA** | 0 | I-7, IV-6+IV-7 |
| 4 | mié 29-jul | **II-1 Salud Materna** *(área REY)* | **CRÍTICA** | 13 | II-7, I-8 |
| 5 | jue 30-jul | **II-3 Vacunación** | **CRÍTICA** | 2 | V-7+V-10, I-9 |
| 6 | vie 31-jul | **III-5 Salud Intercultural** | **CRÍTICA** | 2 | **III-9**, IV-4, II-13 |
| 7 | sáb 1-ago | **II-8 HEARTS / HTA-DM** | **CRÍTICA** | 1 | **V-1**, IV-3+IV-5, II-4 |
| 8 | dom 2-ago *(4 h noche)* | 🌙 **REPASO DE LOS 2 GAPS** | ALTA | — | — |
| 9 | lun 3-ago | **II-11 ITS / VIH** | **CRÍTICA** | 10 | IV-1+IV-2, II-5, I-11+I-12 |
| 10 | mar 4-ago | I-1 Promoción de la salud | ALTA | 4 | I-2, II-2, V-6 |
| 11 | mié 5-ago | V-3 Niveles de atención | ALTA | 0 | III-2, I-10, II-6 |
| 12 | jue 6-ago | I-4 Definiciones de caso | ALTA | 3 | III-8, III-3, III-1 |
| 13 | vie 7-ago | 🎯 **DRESS REHEARSAL 1** | — | — | mock completo a hora real |
| 14 | sáb 8-ago | 🌓 **MEDIO DÍA** (mock 2 + tarde libre) | — | — | — |
| 15 | **dom 9-ago** | 🏁 **EXAMEN** | — | — | — |

**Los 7 críticos reciben día COMPLETO entre semana.** El domingo 26 lleva el tema más liviano
(I-5+I-6: 3 vueltas / 55 min) para no arriesgar un crítico en una franja corta.

### El domingo 2-ago ataca los 2 gaps reales
1. **ÁREA V / GESTIÓN** — 22 % del examen y **cero mapas conceptuales** en QX. Se ataca por banqueo
   dirigido (V-2 PEI/POI/FODA es el tema #1 banqueado del área) + los **REPASOS DE GESTIÓN que
   Theomed acaba de publicar** (sesiones 22/07 y 24/07).
2. **III-9 derechos del paciente / HC / SUSALUD (Ley 29414)** — el mayor *miss* histórico del backtest.

---

## 3 · Cruce con rentabilidad y pronóstico

**Pronóstico walk-forward v2** (vector canónico unificado): **II 33 · I 28 · V 22 · III 13 · IV 4**.
II es el área rey; el formato es **viñeta clínica ~90 %**.

| Área | Peso | Días propios | Coherencia |
|------|------|--------------|-----------|
| **II** Cuidado Integral | 33 % | 4 (II-1, II-3, II-8, II-11) + más mapas (13 y 10) | ✅ |
| **I** Salud Pública | 28 % | 4 (I-5+I-6, I-3, I-1, I-4) | ✅ |
| **V** Gestión | 22 % | 2 (V-2, V-3) + **domingo entero de banqueo** | ✅ |
| **III** Ética | 13 % | 1 (III-5) + III-9/III-8/III-2 fusionados | ✅ |
| **IV** Investigación | 4 % | **0** (todo fusionado BAJA) | ✅ |

**Vueltas por prioridad** (`REPASO_POR_PRIORIDAD`): CRÍTICA = 6 · ALTA = 5 · MEDIA = 4 · BAJA = 3.
Los 7 críticos canónicos (**I-3 · II-1 · II-3 · V-2 · II-11 · III-5 · II-8**) están en `CRÍTICA`;
bioestadística (casi extinta, ~0.5 %) está en el mínimo.

---

## 4 · Inventario vivo (barrido 26-jul, logueado)

### QX Medic
- **Videoclases**: 163 videos · **42 mapas conceptuales** (SP 14 · CI 25 · Ética 3 · Inv 0 · Gestión 0).
- 🔥 **Banqueo ENCAPS por área = 18 sets · 2.052 preguntas REALES**
  - Cuidado Integral 1-9 → **1.109 Q** (área rey)
  - Salud Pública 1-5 → **688 Q**
  - Ética 1-4 → **255 Q**
  - ⏳ Investigación y Gestión **aún no publicados** → re-escanear
- **Simulacros Virtuales**: **3 reales** (N°01 14-jun · N°02 12-jul · N°03 19-jul), 100 Q · 3 h 40,
  cadencia semanal → N°04 ~26-jul.
- Evaluación Virtual Avanzada: 12 sets · Biblioteca: 18 mapas + 121 fichas.

### Theomed
- **Curso 73** — 49 secciones · **575 actividades**. NORMAS TÉCNICAS 59 · SP 65 · CI 53 · Gestión 45 ·
  Ética 24 · Investigación 23 · Material complementario 17 · Actividades finales 5 · Webinars 4.
- ⚡ **FASE 3 en curso** (las secciones REPASOS ya no están vacías):
  - SP → sesiones 09/07 y 16/07
  - CI (en vivo) → 08/07 y 14/07
  - Ética → *REPASO ÉTICA E INTERCULTURALIDAD* (recurso 23869)
  - **Gestión → sesiones 22/07 y 24/07** ← NUEVO, cubre el punto ciego del área V
  - Las secciones **BANQUEOS** por área siguen vacías.
- **Curso 37 SIMULACROS** — 11 quizzes reales: 6 simulacros semanales (29-may → 17-jul, cadencia
  viernes) + EXAMEN TIPO A ×2 + TIPO B ×2 + **EXAMEN 2025-II** (banco oficial anterior).
- **Curso 89 KAHOOTS** — 19 recursos.

> Técnica: el cuerpo del curso 73 **no** se puede escanear por DOM (lazy-load). Hay que leer el
> **course index** de Moodle 4: `.courseindex` → `.courseindex-section` + `.courseindex-cm`,
> con el nombre en `.courseindex-sectiontitle`.

---

## 5 · Método (no cambia)

**BANQUEO + MAPAS.** La cola diaria son **solo mapas conceptuales**; los videos largos salen del plan
diario y quedan de referencia. Orden dentro del día: banner del método → bancos de preguntas →
postests del área → mapas → PDF de mapas → biblioteca QX → manual → resúmenes Fase 2.
Palmerton: **preguntas ciegas primero**, después el mapa y el resumen. Medirse por **% en ciego**.

**Intocables**: 7 h de sueño · gimnasio 19-20 h · corte 22:00 los domingos.

---

## 6 · Puntos de vigilancia

1. **II-8 (HEARTS/HTA-DM)** es el crítico con material más fino (1 recurso, sin mapa propio). El
   compendio de López deja la HTA floja → entrar explícitamente a **Theomed CI §2.17** + guía MINSA
   HEARTS (meta < 140/90, algoritmo escalonado, riesgo CV). No confiar solo en López + banco.
2. **Área V sigue sin mapas conceptuales** en QX. Su material es banco de preguntas → por eso el
   domingo 2-ago es banqueo dirigido, ahora apoyado en los repasos de Gestión de Theomed.
3. **Re-escanear** el banqueo de **Investigación y Gestión** de QX y las secciones **BANQUEOS** de
   Theomed: salen en los próximos días.
4. **V-MED** (farmacovigilancia / URM / RAM) está tier ALTA en la cobertura pero entra solo como
   secundario BAJA → banquearlo aparte si sobra tiempo.

---

## 7 · Reproducibilidad

| Paso | Comando |
|------|---------|
| Reconstruir el plan | `node DATA/_scripts/gen_encaps_26jul.js` → aplicar `_encaps_26jul.sql` por MCP |
| Cola de mapas | `node DATA/_scripts/gen_encaps_cola_live.js --apply --maps-only` |
| Cobertura + vueltas | `node DATA/_scripts/gen_encaps_cobertura.js --apply` |
| Videos por tema | `node DATA/_scripts/gen_videos_por_tema.js` |
| Los otros 7 planes | `node DATA/_scripts/remap_inicio.js 2026-07-26` + `gen_synapse_plan.js` + `gen_aurum_plan.js` |

Backups en Supabase: `study_schedule_bk_0726` (este plan) · `study_schedule_bk_audit` (pre-auditoría).

⚠ `gen_encaps_26jul.js` re-mapea el **estado vivo**; **no** restaura del backup canónico, porque eso
revertiría las correcciones de la auditoría (prioridad `CRÍTICA` en los 7, secundarios normalizados).
