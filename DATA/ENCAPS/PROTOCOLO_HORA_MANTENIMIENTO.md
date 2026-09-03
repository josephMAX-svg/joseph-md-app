# 🇵🇪 PROTOCOLO DE LA HORA ENCAPS — MANTENIMIENTO 2027-I (16:15–17:15 L-V · D1 vie 4-sep → 29-ene · 103 días)

> La hora tiene UNA sola misión: llegar a febrero con base sólida para que la fase intensiva
> (feb–mar, ENCAPS vuelve a bloque principal) arranque desde ~70% y no desde cero.
> Meta final: **≥17/20 en ENCAPS 2027-I (fines de marzo) · percentil 1% (~2.000 plazas)**.
> La cola vive en la app (Estudio → Perú, Supabase modo MANTENIMIENTO, 103 días · backup `study_schedule_bk_0903`).

## Estructura del día (lun–jue)

| Franja | Qué | Regla |
|---|---|---|
| 16:15–16:30 | **EVAL ANCLADA** — 5Q del tema de AYER, de memoria, sin material | Si fallas ≥2 → el tema vuelve "caliente" y desplaza al del día siguiente |
| 16:30–17:10 | **BANCO DEL DÍA** — 20-25Q CIEGAS del tema de la rotación | Pregunta-por-pregunta con corrección inmediata (método Palmerton). Nivel ≥ examen real, distractor = concepto vecino |
| 17:10–17:15 | **REGISTRO** — cada fallo a `TRACKING_ERRORES/_registro_resoluciones.json` + ≤3 APEX | Solo errores de CONOCIMIENTO generan APEX |

**VIERNES** = 🔥 mini-simulacro **25Q mixtas cronometradas (72s/Q)** con el vector v3:
~8Q área II · 7Q I · 5Q V · 3Q III · 2Q IV → corrección + patrón de fallos (16:45–17:15).

## Rotación de 4 semanas (ciclo sembrado en Supabase, se repite ~5.2 veces = 83 slots lun-jue)

| | Lun | Mar | Mié | Jue | Vie |
|---|---|---|---|---|---|
| **Sem A** | II-3 Inmunizaciones | **I-3 Vigilancia** | **V-2 Gestión/planeamiento** | III-5 Interculturalidad | SIM 25Q |
| **Sem B** | II-5 APS/adolescente | I-4 Brotes/transmisibles | IV-1+IV-2 Investigación | II-4 Anemia/CRED | SIM 25Q |
| **Sem C** | II-1 Gestante | **I-3** (2ª del ciclo) | **V-2** (2ª del ciclo) | III-8 Ética función pública | SIM 25Q |
| **Sem D** | II-11 ITS/VIH | IV-6+IV-7 | V-7+V-10 (V-MED) | II-8 ENT/diabetes | SIM 25Q |

I-3 y V-2 caen **2× por ciclo** (11 sesiones cada uno en los 103 días; 83 sesiones de banco + 20 mini-sims) — son el top-2 del pronóstico v3.
8 críticos v3: I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1/2. ALTA con flag de rebote: II-1 · II-11 · II-8.
⚠ Lección 2026-II: **Investigación saltó 4→12** — por eso IV tiene 2 slots fijos por ciclo (nunca más a piso).

## De dónde salen las preguntas (en orden)

1. **Banco ENCAPS propio** — 18 sets / 2.052 preguntas ya construidos (filtrar por el código del día).
2. **Postests Theomed** del área (links directos en la cola de la app).
3. **Banco QX** por tema.
4. **Sets nuevos generados por Claude** bajo el MOTOR DE PREGUNTAS (4 factores) +
   `PROTOCOLO_GENERACION_PREGUNTAS.md`: cada clave/NTS verificada contra fuente real
   (claves oficiales = resaltados de los PDF de EXAMENES; GUIA_POR_TEMA tiene claves inventadas — NO usar).
   El examen real 2026-II clasificado (`_examen_2026-2_clasificado.json`) es cantera de viñetas espejo.

## Tutoría y medición

- El % de cada eval/banco/sim se registra; **la tutoría sale del patrón de fallos**, no de re-explicar todo.
- Umbral de crucero: ≥75% en bancos del día · ≥18/25 en los sims de viernes hacia diciembre.
- El examen **2026-II completo (100Q + clave oficial)** queda RESERVADO como pre-test diagnóstico
  para el arranque de la fase intensiva (1ª semana de febrero) — no quemarlo antes.
- Si un viernes el sim baja de 15/25 dos semanas seguidas → la rotación de la semana siguiente se
  re-pondera hacia las áreas falladas (avisar a Claude para re-generar la semana).

## Qué NO se hace en esta hora

Videos largos · leer compendios enteros · mapas nuevos · normas completas. Solo PREGUNTAS + corrección
+ registro. El material de referencia (mapas QX, compendio, NTS) está linkeado en la tarjeta de
cobertura de la app SOLO para resolver dudas puntuales post-corrección.
