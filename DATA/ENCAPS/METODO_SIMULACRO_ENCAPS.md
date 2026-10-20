# ENCAPS · Técnica de simulacro (RaviMedTest adaptado) — v6.03b · 20-oct-2026

> Pedido de Joseph (20-oct-2026): estructurar el método de cada examen con sus referentes; para el ENCAPS, la técnica de simulacro de
> **RaviMedTest** (la misma fuente que el MIR, `DATA/MIR/METODO_RAVIMEDTEST.md`) adaptada al formato ENCAPS/SERUMS y coherente con
> [`PROTOCOLO_HORA_MANTENIMIENTO.md`](PROTOCOLO_HORA_MANTENIMIENTO.md) (§2 mini-sim, §5 medición) y
> [`FASE_INTENSIVA_2027-I.md`](FASE_INTENSIVA_2027-I.md) (§3 SIM 100Q).
>
> **Qué NO cambia:** franjas, minutos de cada paso (mini-sim 2 · 30 · 18 · 5 · 5; pre-test de arranque 2 · 10 · 24 · 15 · 5 · 4), filas de
> Supabase, recetas, umbrales, overrides, lista negra. La técnica va **dentro** de los pasos.
>
> **Dónde vive:** `DATA/_scripts/encaps_guia_catalogo.js` (`TECNICA_SIM`: reloj, cómo, corrección, comparación, tarjetas, envío) →
> `gen_encaps_guia.js` → `src/lib/encapsGuia.ts` (la guía 🧭 de la hora 16:15 en ENCAPS → Plan → HOY y en el Home).
> `node DATA/_scripts/gen_encaps_guia.js --check` comprueba que el .ts está al día y que cada sesión suma 60′.
>
> ⛔ **Lista negra intacta:** el examen ENCAPS 2026-II no se abre ni se usa; este documento solo describe la técnica con la que se
> rendirá el vie 8-ene-2027 (pre-test), nada de su contenido.

---

## 1. Fuentes

- **RaviMedTest** (NotebookLM «MIR · RaviMedTest Engine», consultas del 20-oct-2026): «Cómo hacer un simulacro #MIR de manera EFICIENTE»
  (V6), «EL DÍA DEL EXAMEN MIR: MI EXPERIENCIA» (V7), «Cómo gestionar los percentiles en la preparación del examen MIR» (V8), «Cómo
  responde preguntas MIR un opositor del percentil 100» (V9), «MIS 3 MAYORES ERRORES EN LA PREPARACIÓN MIR» (V3). Tabla completa y
  enlaces en `DATA/MIR/METODO_RAVIMEDTEST.md` §1.
- **Protocolo propio:** 72 s/Q · sin pausa · sin material · confianza 1-3 obligatoria · % CIEGO = seguras / total · umbral mini-sim
  18/25 · alerta <15/25 dos viernes seguidos · override (máx. 2 sustituciones; I-3 y V-2 nunca se ceden) · taxonomía
  CONCEPTO/OLVIDO/CRONOLOGIA · CCSN/CONTEXTO · CAMBIO/TIEMPO/LECTURA (`PROTOCOLO_HORA_MANTENIMIENTO.md` §2, §5).
- **Runner** (`gen_encaps_minisim.js`): cuenta atrás visible, confianza obligatoria para terminar, una pregunta sin responder cuenta
  como fallo, marca «TIEMPO» si un ítem pasa de 72 s, corrección y revisión ítem a ítem al final, export JSON.
- **Intensiva** (`_encaps_intensivo_2027.sql` v6.03): pre-test 2026-II vie 8-ene 07:15 · 8 SIM 100Q los viernes 07:15 (15, 22 y 29-ene;
  5, 12, 19 y 26-feb; 5-mar) · mini-sims de reposición del carril B 16:15 (lun 22-feb, mar 2-mar) · DRESS REHEARSAL jue 11-mar
  11:00-13:00 · examen dom 14-mar-2027 PROVISIONAL.

## 2. De Ravi (MIR, 210Q en 4 h) al ENCAPS (100Q · 72 s/Q · 120′)

| Regla de Ravi | Por qué (Ravi) | En el ENCAPS |
|---|---|---|
| Reloj cada 20-30 preguntas | detectar el desvío pronto, cuando aún se recupera | **cada 10Q** en los bloques de 20-25Q · **cada 25Q** en los de 100Q; hitos en **tiempo restante** del runner |
| Pasada algo más rápida que la media (50Q ≈ 50-55′) | dejar margen para la revisión final | pasada a ≈66 s/Q en 100Q (110′) · ≈65 s/Q en el mini-sim (27′) · ≈66 s/Q en el pre-test de arranque (22′) |
| Atención extra a las primeras ~40 (nervios) | ahí salen los fallos «tontos» | proporcional: las 5 primeras del mini-sim, 4 del pre-test de arranque, 20 de un SIM 100Q |
| Orden: texto primero, imágenes al final; reservas descendentes; pausa de 10′ tras 100 | particularidades del cuadernillo MIR | **no aplica**: orden 1 → n (el orden real entrena la fatiga, `PRETEST_2026-II.md` §1), sin reservas, **sin pausa** (protocolo) |
| Una decisión en el «momento alfa» | la primera lectura lúcida es la buena | una sola decisión por pregunta; si una pasa de **144 s (el doble)**: mejor opción con confianza «adivinada» y avanzar; ninguna sin responder (el runner la cuenta fallo) |
| **Últimos 10′: revisión FORMAL; nunca cambiar por contenido** | sus errores del día del MIR fueron de forma (marcar la verdadera cuando pedían la falsa) | últimos **3′** del mini-sim, **2′** del pre-test de arranque, **10′** del SIM 100Q: ¿la letra es la que querías? ¿leíste bien «NO · EXCEPTO · incorrecta»? ¿todas con confianza? — si el examen real es en hoja de respuestas (**A VERIFICAR** en la convocatoria), además: ¿pasada bien a la hoja? |
| Con 2 opciones vivas, arriesgar | con −1/3 la lógica gana más de lo que pierde | **regla de puntuación del ENCAPS no documentada en el repo → A VERIFICAR** en las bases de la convocatoria 2027-I (`SENALES_2027-I.md`). Mientras tanto: se responde **todo** (el runner ya cuenta la omitida como fallo) |
| Corrección: falladas → acertadas (¿lógica o suerte?) → dudosas; exprimir cada pregunta | corregir es memorizar | ① fallos marcados «segura» (falsa certeza) → ② resto de fallos → ③ aciertos NO ciegos (dudosa/adivinada = se corrigen como fallo) → ④ fallos de forma · por ítem: código → tipo → regla en 1 línea + por qué es falso el distractor (suele ser el concepto vecino) |
| Pocas tarjetas: fallos «tontos» y detalles discriminativos | cuantas menos, más repeticiones | OLVIDO de cifra/plazo → **ENCAPS::Cifras** · CONCEPTO/CCSN → porqué a la nota Obsidian del código · proceso → regla de examen, sin tarjeta · APEX por ⚡ APEX 1-TAP (Ctrl+Shift+A) → `APEX::ENCAPS` + nota del vault (directo en Anki mientras n8n no esté verificado) |
| Percentil dentro de la misma academia; nunca netas entre academias; un bajón aislado no significa nada | cada academia calibra distinto | la nota /25 o /100 se compara **solo con la misma receta** (mini-sims entre sí; SIM 100Q entre sí); nunca con QX, Theomed u otro instrumento; manda la regla de **dos viernes seguidos** |

## 3. Por formato (hitos del reloj del runner = tiempo **restante** mínimo)

### 3.1 Pre-test de arranque 20Q · 24′ (mié 21 y jue 22-oct-2026, 16:27–16:51)
- Hitos: **Q10 con ≥13:00 · Q20 con ≥2:00** → 2′ de revisión formal.
- Las 4 primeras con atención extra. Confianza real: es la línea base ciega por crítico.
- Corrección 15′ con la taxonomía; registro `--registrar --append` (no el formulario de la app). Sin cambios de minutos.

### 3.2 Mini-sim 25Q · 30′ (viernes de la F1: 23 y 30-oct · 6, 13, 20 y 27-nov · 4, 11 y 18-dic = checkpoint) — 16:17–16:47
- Hitos: **Q10 con ≥19:00 · Q20 con ≥8:00 · Q25 con ≥3:00** → 3′ de revisión formal.
- 16:47–17:05 corrección en el orden de §2 (falsa certeza primero). Código con ≥2 fallos → CALIENTE → override.
- 17:05–17:10 registro (▲ SIM o `--registrar --append`) + cierre semanal + lectura de la nota solo contra mini-sims anteriores.
- 17:10–17:15 1-3 APEX con el criterio de tarjeta de §2.
- Igual en los mini-sims de reposición del carril B (lun 22-feb y mar 2-mar-2027, 16:15).

### 3.3 SIM 100Q · 120′ (pre-test 2026-II vie 8-ene y los 8 viernes de la intensiva, 07:15–09:15)
| Hito | Tiempo restante en el runner | Hora (inicio 07:15) |
|---|---|---|
| Q25 | ≥ 92:00 | ≤ 07:42 |
| Q50 | ≥ 65:00 | ≤ 08:10 |
| Q75 | ≥ 37:00 | ≤ 08:37 |
| Q100 | ≥ 10:00 | ≤ 09:05 |
| Revisión formal 1 → 100 | 10′ | 09:05–09:15 |

- Las 20 primeras con atención extra; sin pausa (protocolo); si el examen real fuera en hoja de respuestas, pásala por bloques de 25
  (Ravi pasaba la plantilla cada 50 preguntas).
- Corrección **45′** (`PRETEST_2026-II.md` §1: 30′ por código + 15′ de registro): orden de §2 · por código v3 y por formato (viñeta / cifra)
  · `--registrar --append` (ronda `simulacro` / `pretest`). Tutoría del lunes (`FASE_INTENSIVA_2027-I.md` §3): CCSN → ficha del par
  confundido; OLVIDO → tarjeta; ≥2 fallos en un código → al barrido de la semana.
- Lectura: % bruto y % CIEGO contra la serie de SIM 100Q (≥85 / ≥75 hacia el D-2; <70 → re-ordenar la semana). El pre-test 2026-II se
  lee contra su propio umbral (≥70 bruto / ≥55 ciego), no contra los SIM.

### 3.4 Dress rehearsal (jue 11-mar-2027, 11:00–13:00) y examen (dom 14-mar-2027 PROVISIONAL)
- Mismos hitos que 3.3 desplazados a la hora de inicio (dress rehearsal: Q25 ≤ 11:27 · Q50 ≤ 11:55 · Q75 ≤ 12:22 · Q100 ≤ 12:50 →
  revisión formal 12:50–13:00).
- El día del examen: el reloj, el orden y la revisión formal son los mismos; nada nuevo. Lo que exija la convocatoria (documento,
  material permitido, hoja) se confirma en las bases (**A VERIFICAR**). Ravi lleva agua y azúcar de absorción rápida y reloj propio:
  aplicar solo lo que la convocatoria permita.

## 4. Los 3 errores de Ravi en clave ENCAPS

| Error | Vigilancia en el plan |
|---|---|
| 1.ª vuelta floja | la F1 es banqueo ciego diario con eval anclada; nada de «toma de contacto» |
| Estudio pasivo | la hora es solo preguntas + corrección + registro (`PROTOCOLO` §6: nada de vídeos largos ni compendios enteros) |
| Repasar solo lo cómodo | mini-sims mixtos por vector v3 · override por los calientes · I-3 y V-2 nunca se ceden |

## 5. Cambios en la guía ENCAPS (antes → después)

| Sesión / paso | Antes | Después |
|---|---|---|
| Mini-sim (9 viernes F1) · 30′ | «72 s/Q = 30′ estrictos, sin pausa y sin material; umbral 18/25» | + técnica: reloj del runner cada 10Q (Q10 ≥19:00 · Q20 ≥8:00 · Q25 ≥3:00), orden 1 → 25 con atención a las 5 primeras, una decisión por pregunta (144 s), ninguna en blanco, **3′ de revisión formal** sin cambiar contenido |
| Mini-sim · corrección 18′ | por ítem: área → código → tipo → regla | **orden de Ravi** (falsa certeza → fallos → aciertos no ciegos → forma) + por qué es falso el distractor |
| Mini-sim · registro 5′ | nota /25 + cierre semanal | + la nota se compara solo con mini-sims anteriores; un bajón aislado no cuenta |
| Mini-sim · APEX 5′ | APEX a la nota del código y a Anki | + criterio de tarjeta (OLVIDO → ENCAPS::Cifras · CONCEPTO/CCSN → Obsidian · proceso → regla) + envío APEX 1-TAP |
| Mini-sim · «hecho» | 25/25 en ≤30′ | 25/25 en ≤30′ **con la revisión formal hecha** |
| Pre-test de arranque (mié 21 y jue 22-oct) · 24′ | modo examen, confianza real | + técnica: Q10 ≥13:00 · Q20 ≥2:00 · 2′ de revisión formal · 4 primeras con atención extra |

## 6. Pendientes

- [ ] Regla de puntuación del ENCAPS 2027-I (¿descuenta el error?) y formato de respuesta (¿hoja?) → bases de la convocatoria.
- [ ] Si el runner del SIM 100Q (`--sim100`) se genera con otra duración o sin cuenta atrás visible, recalcular los hitos de §3.3.
