# 🔁 GUÍA OPERATIVA — LOOP DIARIO ENCAPS (chat generador)
> Complementa a `GENERADOR_PREGUNTAS_ENCAPS.md` (spec de cómo se REDACTA cada pregunta).
> Esto es cómo se EJECUTA el día a día: pre-flight → fuente del día → 4 bloques de preguntas (Palmerton ciego) → feedback/monitoreo → recalibración.
> Verificado contra: app Joseph MD `/estudio`, Google Calendar, vault Obsidian `D:\JOSEPH\Vault_Medicina MIR_Joseph\06_ENCAPS\ENCAPS_2026`. · Generado 24-jun-2026.

---

## 0) PRE-FLIGHT — OBLIGATORIO antes de mandar cualquier lote
Joseph NO recibe preguntas hasta que yo verifique y reporte día + hora + bloque vigente.
1. **Fecha/hora reales** → `date` (Bash). Reportar: `"Hoy es <día> <DD-mmm-YYYY>, son las HH:MM (hora Perú, GMT-5)"`.
2. **Joseph MD** (chrome-devtools → page `/estudio`): leer `Día N/49`, tema del día, modo, vueltas, **NTS Tier-1**, y `Hechos hoy N/25`.
3. **Google Calendar**: confirmar qué bloque toca AHORA por la hora (04:45 / 08:15 / 11:00 / 18:00 / 17:15).
4. Anunciar: `"Día N · <tema> · toca el bloque <X> (HH:MM)"` → recién entonces mandar las preguntas.
> Regla: **nunca mandar preguntas fuera del día/bloque** que marca el Calendar. El plan arranca **D1 = jue 25-jun-2026** (hoy 24-jun fue organización). Examen FIJO **jue 20-ago** (día 49).

---

## 1) FUENTE DEL DÍA (de dónde salen las preguntas, en orden)
- **App `/estudio` → "Cola QX de hoy"** = los sub-ángulos examinables del tema del día (títulos de videoclase QX).
  - **D1 (I-3 Vigilancia EPI)** sub-ángulos: Vigilancia en salud pública · Vigilancia epidemiológica · Endemias/epidemias/brotes · Demografía · Historia natural del proceso S-E · ASIS / Sala situacional · Conceptos básicos de epidemiología · Mediciones en epidemiología · Demografía en salud · Brotes/epidemias/pandemias/endemias · Sistema de vigilancia epidemiológica · Gestión del riesgo en emergencias y desastres.
- **NTS Tier-1 del día** (app) = norma obligatoria; toda clave debe poder responderse con ella. **D1 = Directiva 067 RM 506-2020** (notificación de brotes/EVISAP).
- **Orden de bancos** (mayor→menor confianza): 1) **Claves SERUMS** (6 exámenes en `exams_txt/`) → copio estilo/ángulo real · 2) **Theomed** (banco oficial + Manual de Salud Pública, Drive) · 3) **QxMedic** (banco + videoclases + fichas MINSA) · 4) **IA con compendio Dr López/Theomed verificado** — siempre trazable, nunca inventado.
- **Ponderación**: dentro del día rotar sub-ángulos por su frecuencia real en los 6 exámenes; a nivel global priorizar **SP (Área I, 29%) + CI (Área II, 28%)** = lo más rentable y estable.

---

## 2) LOS 4 BLOQUES DE PREGUNTAS (qué genero en cada uno)
| Hora | Bloque | Qué mando | Mix temas | APEX |
|---|---|---|---|---|
| 04:45 | **Warm-up 20Q** | 20 preguntas una-por-una, cierre inmediato | Sem1-2: 70% vistos + 30% críticos no vistos | 0–3 |
| 08:15 | **PRE-TEST 10Q ciegas** ⭐ | 10 del tema del día, ciegas puras + free recall | 100% tema del día | — |
| 11:00 | **Consolidación 30Q** | 30 de temas YA vistos | interleaving acumulado | 0–4 |
| 18:00 | **Evaluación Diaria** | tema de AYER + previos, **modo examen 72 s/Q** | Sem1 100% ayer → Sem4+ 40/60 | 0–3 |
Todas en **Palmerton ciego** (ver §3). Las cards solo de los 🔴 con error de Concepto/CCSN.

---

## 3) MÉTODO PALMERTON (cómo proceso cada pregunta)
1. Presento **viñeta + 4 opciones, SIN clave**.
2. Joseph responde y marca su seguridad: 🟢 (<30 s, sin duda) · 🟡 (con duda) · 🔴 (no sabía).
3. **Recién entonces** revelo: ✅ clave · 🧠 por qué la correcta · ❌ por qué falla cada distractor · 📎 fuente (NTS/ficha/examen/video).
4. Clasifico su error en la **taxonomía Palmerton** (la de su plantilla diaria Obsidian):
   **Contexto · Cronología · CCSN** (confusión con concepto similar) **· Concepto** (error de conocimiento) **· Olvido**.
5. **APEX** solo para 🔴 tipo *Concepto/CCSN* que pasen los 6 filtros → formato `FRENTE / REVERSO / CCSN / FISIO / RELACIONES` + tags `examen::encaps · subtema::<cód> · fuente_NTS::<x>`.

---

## 4) FEEDBACK / MONITOREO (cómo leo su avance)
**A. Reporte diario** que Joseph manda por **Claude-in-Chrome** (lectura, análisis de videos QX/Theomed, errores).
**B. Verificación directa por mí:**
- **App `/estudio`** — paneles: `PALMERTON ERRORS` · `TIME PER QUESTION` · `WEAK TOPICS` · `APEX Queue` · `CZI` · `Streak` · `Hechos hoy N/25`.
- **Obsidian** `06_ENCAPS\ENCAPS_2026\`:
  - `05_DIARIO\` → nota del día: `preguntas_resueltas`, `apex_creados`, tabla **Errores Palmerton** (Contexto/Cronología/CCSN/Concepto/Olvido).
  - `03_APEX_creados\` (tag `#apex-import`) → **# cards por subtema = ranking APEX**.
  - `02_TEMARIO\01_Salud_Publica` + `02_Cuidado_Integral` → cobertura de las áreas más rentables.
  - `06_METRICAS_SEMANA\` → métricas de la semana.
- **Plataformas en vivo** (QX/Theomed, ya logueadas) → % avance de videoclases/lectura.
**Qué hago con eso:** detecto **dónde falla, ponderado a SP(I)+CI(II)**; esos sub-ángulos vuelven "**calientes**" → más preguntas + foco en el deep prime 09:00. Todo se refleja en los paneles del `/estudio` (la app lee/escribe Supabase; yo reporto y estructuro, no escribo datos crudos salvo pipeline definido).

---

## 5) RECALIBRACIÓN (reglas duras)
- **% tema de ayer < 70%** en Evaluación Diaria → tema "caliente" → re-deep work en próximo slot débil.
- **Again Anki > 15%** → cards débiles, marcar para próximo deep prime.
- **"GAP TOTAL" 2 días** seguidos mismo tema → re-deep work.
- Si **domina** (🟢 rápido) → subir dificultad / reducir preguntas de ese ángulo.
- Cada ~5 días → **mini-simulacro** ponderado (SP 29 · CI 28 · Gestión 21 · Ética 16 · Inv 6).
- No repetir: llevo registro de preguntas ya usadas por tema.

---

## 6) MODO DE DISPARO (elegido 24-jun)
- **MANUAL, iniciado por Joseph.** Se despierta **~04:00** y "prende todo el sistema" → me escribe y corremos **TODOS los bloques del día en orden** (04:45 Warm-up 20Q → 08:15 Pre-test 10Q → 11:00 Consolidación 30Q → 18:00 Evaluación). **Sin cron / sin nube** (rechazado: la nube no toca su Chrome/Obsidian local).
- En cada bloque hago el **PRE-FLIGHT (§0)** antes de soltar preguntas: verifico hora+día+bloque vigente y lo anuncio.
- **Complemento en vivo:** Joseph también busca el tema en el banco de **QxMedic/Theomed**; lo que yo doy + esos bancos se suman. Si pide, entro en vivo a QX/Theomed (logueados) a jalar el banco real del tema para nutrir Warm-up 20Q y Consolidación 30Q.

## 7) ESTADO INICIAL (24-jun-2026)
- **D1 = jue 25-jun · I-3 Vigilancia EPI · CRÍTICA · NTS Directiva 067 RM 506-2020.**
- **Pre-test 10Q ciegas de I-3 YA preparado** (claves guardadas, modo Palmerton).
- Chrome de Joseph conectado y logueado (QX, Theomed, Drive, Calendar, app). Vault Obsidian verificado.
- Paneles de monitoreo aún en cero (`Sin datos de errores aún`) — se llenan desde D1.
