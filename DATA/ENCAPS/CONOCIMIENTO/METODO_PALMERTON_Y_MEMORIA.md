# 🧠 CONOCIMIENTO — Método Palmerton + Ciencia de la memoria (doctrina de estudio)
> Base de datos de MÉTODOS (no de contenido médico). Rige cómo se procesa cada pregunta y cómo se decide Anki/Obsidian/imagen. Investigado y consolidado; NO re-investigar salvo actualización. Ver perfil de Joseph en `../TRACKING_ERRORES/PERFIL_CONOCIMIENTO.md`.

## 1. Palmerton (Alec Palmerton, Yousmle) — principios
- **Comprensión > memoria.** No memorizar hechos sueltos; entender el mecanismo hasta poder derivar la respuesta. Una tarjeta = **UNA idea**.
- **Regla del 100% / dominio antes de avanzar:** no se pasa de un punto hasta dominarlo en ciego.
- **Medir por % EN CIEGO**, no por páginas leídas ni por relectura (evita la *ilusión de competencia*).
- **Blind-first (pretesting):** intentar la pregunta ANTES de ver la clave/estudiar — aunque falles, prepara el aprendizaje.
- ⚠ El "Again/Good" de las tarjetas es estándar de Anki, NO de Palmerton.

## 2. Matriz confianza × acierto (clave para tracking — el usuario la exige)
Cada respuesta se clasifica en 4, no solo ✓/✗:
| | Correcto | Incorrecto |
|--|--|--|
| **Seguro** | ✅ **Conocimiento real** | ⛔ **Desacierto por CONFUSIÓN** (modelo mental errado — el MÁS peligroso) |
| **Inseguro** | 🎲 **Acierto por SUERTE** (tratar como error: repasar igual) | ❓ **Desacierto por NO SABER** (vacío de contenido) |
→ Por eso un acierto NO garantiza conocimiento. Pedir/estimar **confianza** por pregunta en próximas rondas.

## 2b. ⚠ REFINAMIENTO CRÍTICO (Joseph, 24-jul-2026) — la confianza auto-reportada NO basta
**Problema real:** Joseph arranca de CERO contenido, pero NO de cero conocimiento — trae base de la universidad. Por eso al marcar 🎲 "adiviné" puede estar reportando **conocimiento latente/dormido** (lo sabe en el fondo, no lo puede justificar todavía), no una moneda al aire. Penalizarlo como suerte pura **subestima** su nivel real y ensucia el pronóstico de nota. Al revés también: puede sentirse seguro por un recuerdo superficial de la forma de la pregunta.

**Conclusión: en D1 la confianza auto-reportada es una señal RUIDOSA. El discriminador duro es el RE-TEST REFORMULADO.**

### Protocolo del re-test reformulado (regla dura)
1. **TODA pregunta vuelve**, la falle o la acierte — no solo las falladas. Prioridad por rentabilidad (críticos primero).
2. Vuelve **REFORMULADA, nunca idéntica**: otro escenario/región, otro ángulo del mismo concepto, invertida (preguntar por el distractor), o cambiando el formato (viñeta ↔ directa). Si repito la misma pregunta, mido memoria de la pregunta, no del concepto.
3. **Veredicto por transferencia:**
   | 1ª vez | Re-test reformulado | Lectura | Acción |
   |---|---|---|---|
   | ✅ | ✅ | **Conocimiento REAL** (transfiere) | Consolidado. Espaciar (D+3, D+7). |
   | ✅ | ❌ | **Era superficial / suerte** ← el caso que Joseph describe | **→ Obsidian (concepto) y/o Anki.** Prioridad alta. |
   | ❌ | ✅ | Aprendido en el Deep Prime | Confirmar en D+3 antes de darlo por cerrado. |
   | ❌ | ❌ | **Vacío duro** | **→ Obsidian + Anki + imagen mnemónica** si es CCSN. |
4. **El 🎲 no decide el ruteo por sí solo**: es un *modificador de prioridad*, no un veredicto. Acertar marcando 🎲 → adelanta el re-test (no espera a D+3), pero NO se rutea a Anki hasta que falle el reformulado.
5. Una pregunta se declara **DOMINADA** solo con **2 aciertos seguros en formas distintas**. Ahí recién sale de la cola (regla del 100% de Palmerton aplicada a transferencia).

**Por qué esto es Palmerton puro:** él mide comprensión, no reconocimiento. Si el conocimiento solo aparece con UNA redacción concreta, no es comprensión — es memoria de superficie. La reformulación es la prueba de que el modelo mental existe.

## 3. Taxonomía de error (la del sistema APEX)
- **CONTEXTO** — malinterpretó el escenario clínico de la viñeta.
- **CRONOLOGÍA** — error de secuencia/tiempo/jerarquía (p.ej. poner un paso final como inicial).
- **CCSN** — confundió dos conceptos parecidos ("no confundir con…"). El error más común de Joseph en D1.
- **CONCEPTO** — no dominaba el fundamento.
- **OLVIDO** — lo supo pero lo olvidó.
- (**TERMINOLOGY GAP** — solo USMLE.)

## 4. Oakley (Barbara Oakley / "Learning How to Learn")
- **Modo enfocado vs difuso:** alternar concentración y descanso; el difuso consolida.
- **Chunking:** agrupar en bloques con sentido; primero el patrón, luego el detalle.
- **Ilusión de competencia:** releer/subrayar se siente productivo pero no fija → medir por *recall activo*.
- **Interleaving:** mezclar tipos de problema (aún NO en D1; se activa después).
- **Recall / autoexplicación:** tapar y recitar en una frase propia.

## 5. Ciencia base (evidence-based)
- **Testing effect** (recuperar > releer) · **Spacing** (repaso espaciado, FSRS/Anki) · **Interleaving** · **Desirable difficulty** (dificultad deseable) · **Pretesting** (fallar antes de estudiar mejora la codificación).
- Dunlosky 2013: subrayar/releer = BAJA utilidad; auto-test + práctica distribuida = ALTA.

## 6. Regla de ruteo Anki / Obsidian / Imagen (Palmerton-consistente)
- **OBSIDIAN (nota de concepto/repaso):** por defecto para todo cluster fallado, sobre todo cuando falta COMPRENSIÓN. Es donde se construye el modelo mental.
- **ANKI (tarjeta atómica):** SOLO después de comprender, y solo para **datos de memoria pura, atómicos y de alta trampa** que se fallan repetido (p.ej. "24h", "mediana 5-7 años", fórmula de letalidad). En ronda 1 desde cero → normalmente NADA a Anki.
- **IMAGEN mnemónica (Sketchy/palacio, contexto peruano):** para conceptos **INVERTIDOS o muy confundibles (CCSN)** — lo absurdo-visual rompe la inversión (p.ej. activa vs pasiva, endemia vs epidemia). Se prioriza donde el error es de confusión, no de olvido.
- Escalado por DATA: a más veces fallado un punto → sube de Obsidian → Anki → Anki+Imagen.

## 7. Nivel de las preguntas
Las preguntas generadas deben ser **igual o MÁS difíciles que el examen real** (viñeta clínica aplicada, distractores plausibles, trampas). Nunca por debajo del nivel ENAM/ENCAPS.
