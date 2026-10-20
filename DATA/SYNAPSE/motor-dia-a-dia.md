# SYNAPSE — Motor día-a-día (diseño y operación)

> Construido el 10-jun-2026 por el chat SYNAPSE (PROMPT_CHAT_SYNAPSE.md).
> **v6.03 · CORRIMIENTO D1 = MIÉ 21-OCT-2026 (20-oct-2026, vigente)**: lun 19 y mar 20-oct sin estudio → `node DATA/_scripts/gen_synapse_plan.js 2026-10-21`
> (después de `gen_vibecoding_plan.js 2026-10-21`) → **132 días · 19 semanas · mié 21-oct-2026 → lun 1-mar-2027** (FIN_PLAN 2027-03-01; las mismas **110
> A-units**, nada se recorta; START en miércoles → `OFF_WD` Lun = Mar = 1, como v5.20). F0 sem 1-8 (mié 21-oct → dom 13-dic, 46 A) · F1 sem 9-12 (lun 14-dic →
> dom 10-ene, 21 A) · F2 sem 13-19 (lun 11-ene → lun 1-mar, 43 A, 50 días; el lun 1-mar cuenta como sem 19 por SEM_MAX; deload sem 17-19 desde el lun 8-feb).
> Vibecoding mié → mar: **19 PC en 19 sábados** — sáb 24-oct = AVANCE S1 · SHIP S1-S9 sáb 31-oct … 26-dic · S10 sáb 2-ene · S11 sáb 9-ene · **SHIP S12 sáb 16-ene** ·
> taper S13 23-ene · S14 30-ene · S15 6-feb · S16 13-feb (30', último con minutos) · S17 20-feb (0') · S18 27-feb (0'). Ningún PC desplazado (S19/S20 cierran el sáb
> 6-mar, fuera del SYNAPSE: `PC_DESPLAZADOS` ignora los SHIP > FIN_PLAN). **Último sábado con SYNAPSE: sáb 27-feb · último domingo: dom 28-feb**. La última
> A-unit (d132, cierre F2 + CCA-F) cae el **lun 1-mar**.
> ⏸ **v6.02 · CORRIMIENTO D1 = LUN 19-OCT-2026 (17-oct-2026, historial)**: no se estudió lun 12 → vie 16-oct → `node DATA/_scripts/gen_synapse_plan.js 2026-10-19`
> (después de `gen_vibecoding_plan.js 2026-10-19`) → **131 días · 19 semanas · lun 19-oct-2026 → vie 26-feb-2027** (FIN_PLAN 2027-02-26; las mismas **110
> A-units**, nada se recorta; START en lunes → `OFF_WD` = 0). F0 sem 1-8 (lun 19-oct → dom 13-dic, 48 A) · F1 sem 9-12 (lun 14-dic → dom 10-ene, 21 A) · F2 sem
> 13-19 (lun 11-ene → vie 26-feb, 41 A, 47 días; deload sem 17-19 desde el lun 8-feb). Vibecoding lun → vie: **19 PC en 18 sábados** del sáb 24-oct (SHIP S1) al
> sáb 20-feb — SHIP S1-S9 sáb 24-oct … 19-dic · sáb 26-dic = avance S10 · SHIP S10 sáb 2-ene · S11 sáb 9-ene · **SHIP S12 sáb 16-ene** · taper S13 23-ene · S14
> 30-ene · S15 6-feb · **sáb 13-feb = PC propio de S16 (30') + S17 (0')** · S18 20-feb (0'). **Último sábado con SYNAPSE: sáb 20-feb · último domingo: dom
> 21-feb**; último PC con minutos sáb 13-feb. La última A-unit (d131, cierre F2 + CCA-F) cae el **vie 26-feb** (día del SIM 100Q #7 de la intensiva ENCAPS).
> `gen_synapse_plan.js` comprueba que el PC de cada sábado = `pcSab` de `vibecodingPlan.ts`.
>
> ⏸ **v6.01 · CORRIMIENTO D1 = LUN 12-OCT-2026 (10-oct-2026; historial)**: no se estudió mié 7 → vie 9-oct → `node DATA/_scripts/gen_synapse_plan.js 2026-10-12` (después de
> `gen_vibecoding_plan.js 2026-10-12`) → **131 días · 19 semanas · lun 12-oct-2026 → vie 19-feb-2027** (FIN_PLAN 2027-02-19; las mismas **110 A-units**, nada se recorta;
> sem 1 completa lun 12 → dom 18-oct → `OFF_WD` = 0, ninguna serie B/C corre ni manda piezas al último sábado; 185 piezas B/C reales = v6.00). F0 sem 1-8 (lun 12-oct →
> dom 6-dic, 48 A) · F1 sem 9-12 (lun 7-dic → dom 3-ene, 21 A) · F2 sem 13-19 (lun 4-ene → vie 19-feb, 41 A, 47 días). Vibecoding lun → vie: **18 PC** del sáb 17-oct
> (SHIP S1) al sáb 13-feb — SHIP S1-S10 sáb 17-oct … 19-dic · sáb 26-dic = avance S11 · SHIP S11 sáb 2-ene · **SHIP S12 sáb 9-ene** · taper S13 16-ene · S14 23-ene ·
> **S15 + S16 sáb 30-ene** (cierran la misma semana: un PC con los dos) · S17 6-feb · S18 13-feb. **Último sábado con SYNAPSE: sáb 13-feb · último domingo: dom 14-feb**
> (= v6.00). La última A-unit (d131, cierre F2 + CCA-F) cae el **vie 19-feb** (día del SIM #6 de la intensiva ENCAPS).
>
> **v5.20 · CORRIMIENTO RÍGIDO DEFINITIVO (6-oct-2026)**: D1 = **mié 7-oct-2026** (tampoco se estudió el mar 6-oct; decimonoveno corrimiento 31-ago→7-oct, **27 hábiles perdidos**; **no se toca ningún contenido: solo corren los días y el fin se AMPLÍA**) →
> `node DATA/_scripts/gen_synapse_plan.js 2026-10-07` → **132 días · 19 semanas · mié 7-oct-2026 → lun 15-feb-2027** (FIN_PLAN 2027-02-15 = D91 del Step 1; 110 A-units
> intactas; **sem 1 corta = mié 7 → dom 11-oct, 5 días**; sem 2-18 lun-dom; **sem 19 = lun 8 → lun 15-feb, 8 días** —el lun 15-feb cuenta como sem 19—). Contado el 6-oct con node: F0 sem 1-8 (mié 7-oct → dom 29-nov, 46 A) ·
> F1 sem 9-12 (lun 30-nov → dom 27-dic, 23 A) · F2 sem 13-19 (lun 28-dic → lun 15-feb, 41 A, 50 días). Los PC de sábado siguen el `ship` REAL de
> `VIBE_PROYECTOS` (v5.20: los bloques del vibecoding van **mié → mar** —S1 = mié 7 → mar 13-oct … S12 = mié 23 → mié 30-dic por el festivo del vie 25-dic—, así que sigue el sábado de avance al arrancar: el **sáb 10-oct (d4) es "Avance del proyecto S1"**, los SHIP van del sáb 17-oct (d11, S1) al sáb 26-dic (d81, S11) y el **SHIP S12 es el sáb 2-ene (d88)**; **19 PC en total = 12 SHIP + 1 avance + 6 opcionales del taper** (sáb 9-ene d95 · 16-ene d102 · 23-ene d109 · 30-ene d116 · 6-feb d123 · 13-feb d130), el último el sáb 13-feb.)
> La **última A-unit (d132, cierre F2 + CCA-F) cae el LUNES 15-feb = D91 del Step 1** (incorrects 2.ª pasada + débil #3; dos hábiles después del SUBMIT CR-9 de Research) (v5.19: sáb 13-feb, d131, entre D91 y D92; v5.18: vie 12-feb = D92; v5.17: mar 9-feb = D91; v5.16: vie 5-feb = D92; v5.15: lun 1-feb = D91; v5.14: vie 29-ene = D92; v5.13: mar 26-ene = D91; v5.12: lun 25-ene; v5.11: sáb 23-ene; v5.10: vie 22-ene):
> la opción de adelantarla sigue abierta como decisión de Joseph (`PENDIENTES_JOSEPH.md`, fila E). El texto de esa A-unit dice "CIERRE F2 (último día del motor, lun 15-feb en v5.20; sáb 13-feb en v5.19 · v5.18: vie 12-feb)". Contexto: el Step 1 termina el **vie 19-feb** (D95 = último día del plan, D-1 hábil; D94 jue 18-feb = última sesión de banco), el sáb 20/dom 21-feb quedan libres (dom 21 = D-1 real, sin estudio) y su examen pasa al **LUN 22-FEB-2027**; desde el mar 16-feb (D92) solo Step 1 y, desde el mar 23-feb, la FASE INTENSIVA ENCAPS (examen ENCAPS/SERUMS 2027-I mié 10-mar). Con el START en miércoles la sem 1 no tiene lunes ni martes: **regla v5.20** — la pieza del MARTES que se cae (B Latent Space y C Willison) va al último sábado del plan (sáb 13-feb) y el carril del LUNES recupera su pieza en el lun 15-feb (B No Priors · C Pro Git), así las series B/C conservan su multiset (19 No Priors · 19 Pro Git · 19 Lex #452 · 19 Python Tutorial, = v5.19); Python Tutorial y Lex #452 (mié) arrancan completas en la sem 1. Sigue la regla de v5.18: si el JUEVES de una semana es feriado (31-dic), su capítulo de Automate the Boring Stuff se lee el SÁBADO de esa semana (cap. 12 → sáb 2-ene): los caps. 0-18 de Automate siguen todos dentro del plan (19 jueves/sábado, del jue 8-oct al jue 11-feb).
> *(v5.19, 5-oct: `gen_synapse_plan.js 2026-10-06` → 131 días · mar 6-oct → sáb 13-feb · sem 1 corta de 6 días (mar→dom) y sem 19 = lun 8 → sáb 13-feb · F0 47 A · F1 23 A · F2 40 A · vibecoding mar→lun, avance sáb 10-oct (d5), SHIP 17-oct (d12) → 26-dic (d82), SHIP S12 sáb 2-ene (d89), 19 PC (último sáb 13-feb, d131) · la pieza del LUNES que se caía (No Priors / Pro Git) iba al sáb 13-feb · última A-unit sáb 13-feb (d131), entre D91 y D92 · examen vie 19-feb, D95 jue 18-feb = D-1 real; 26 hábiles perdidos.)*
> *(v5.18, 3-oct: `gen_synapse_plan.js 2026-10-05` → 131 días · lun 5-oct → vie 12-feb · sem 1 completa (lun 5 → dom 11-oct) y sem 19 de 5 días · F0 48 A · F1 23 A · F2 39 A · vibecoding lun→vie, sin sábado de avance al arrancar, SHIP 10-oct (d6) → 19-dic (d76), avance S12 sáb 26-dic (d83), SHIP S12 sáb 2-ene (d90), 18 PC (último sáb 6-feb) · `OFF_WD` = 0 · regla Automate jueves feriado → sábado · última A-unit vie 12-feb = D92 · examen jue 18-feb.)*
> *(v5.17, 30-sep: `gen_synapse_plan.js 2026-10-01` → 132 días · jue 1-oct → mar 9-feb · sem 1 corta de 4 días (jue→dom) y sem 19 de 9 · F0 45 A · F1 24 A · F2 41 A · vibecoding en bloques jue→mié, sáb 3-oct (d3) de avance, SHIP 10-oct (d10) → 26-dic (d87), 19 PC · `OFF_WD` corría Pro Git/Dwarkesh/Python Tutorial una semana y el cap. 1 de Lex #452 iba al sáb 3-oct · última A-unit mar 9-feb = D91 · examen mar 16-feb.)*
> *(v5.16, 26-sep: `gen_synapse_plan.js 2026-09-28` → 131 días · lun 28-sep → vie 5-feb · sem 1 completa · F0 48 A · F1 24 A · F2 38 A · vibecoding lun→vie, SHIP 3-oct (d6) → 19-dic (d83), 18 PC · última A-unit vie 5-feb = D92 · examen jue 11-feb.)*
> *(v5.15, 22-sep: `gen_synapse_plan.js 2026-09-23` → 132 días · mié 23-sep → lun 1-feb · sem 1 corta de 5 días y sem 19 de 8 · F0 46 A (mié 23-sep → dom 15-nov) · F1 24 A (lun 16-nov → dom 13-dic) · F2 40 A (lun 14-dic → lun 1-feb) · vibecoding en bloques mié→mar, SHIP 3-oct (d11) → 19-dic (d88), sábado de avance 26-sep (d4), 19 PC · última A-unit lun 1-feb = D91 · examen lun 8-feb. v5.13, 16-sep: `gen_synapse_plan.js 2026-09-17` → 132 días · jue 17-sep → mar 26-ene · sem 1 corta de 4 días y sem 19 de 9 · F0 45 A · F1 24 A · F2 41 A · última A-unit mar 26-ene = D91. v5.12, 15-sep: `gen_synapse_plan.js 2026-09-16` → 132 días · mié 16-sep → lun 25-ene · F0 46 A · F1 24 A · F2 40 A. v5.11, 14-sep: `gen_synapse_plan.js 2026-09-15` → 131 días · mar 15-sep → sáb 23-ene · F0 47 A · F1 24 A · F2 39 A.)*
>
> **v5.10-b · semanas 13-19 (12-sep-2026, vacío 5 de gaps_v3b_synapse.json)**: el plan ya no termina en la sem 12.
> `node DATA/_scripts/gen_synapse_plan.js 2026-09-14` → **131 días · 19 semanas · lun 14-sep-2026 → vie 22-ene-2027**
> (fin del Step 1 menos la semana del examen; re-fechado a v5.11 el 14-sep, a v5.12 el 15-sep, a v5.13 el 16-sep, a v5.14 el 19-sep, a v5.15 el 22-sep, a v5.16 el 26-sep, a v5.17 el 30-sep, a v5.18 el 3-oct, a v5.19 el 5-oct y a v5.20 el 6-oct — 132 días, mié 7-oct → lun 15-feb —, ver arriba). Los **días 1-81 son idénticos** a v5.10 (comprobado bloque a bloque: cabecera +
> A/B/C iguales; solo cambian los textos de los PC/Feynman de sábado/domingo, que vienen del catálogo re-secuenciado del
> vibecoding); se añaden **vie 4-dic, sáb 5-dic (PC = SHIP S12, que antes caía fuera del plan) y dom 6-dic** a la sem 12, y
> **F2 · sem 13-19 (50 días en v5.20; 48 en v5.19; 47 en v5.18; 51 en v5.17) = Anthropic Academy restante + prep CCA-F** a 30': Building with the Claude API (12 módulos) ·
> MCP restante + MCP Advanced Topics · agent skills/subagentes restantes · Claude Code in Action restante · AI Capabilities and
> Limitations · Claude Cowork · los 3 ensayos de context engineering · repaso por los 5 dominios del CCA-F · simulacro · cierre.
> Temarios reales en `curricula/_extracted.json` (3 cursos nuevos extraídos el 12-sep con WebFetch; `check_links.js` 123/123
> OK). Sem 17-19 = `deload:true` (Fases B-C del Step 1: si aprieta, solo A o solo B). Feriados 25-dic/31-dic/1-ene = día
> libre (bloque R, sin A-unit). Cierre del Step 1 (v5.20: mar 16 → vie 19-feb = D92-D95, finde libre y examen lun 22-feb; v5.19: lun 15 → jue 18-feb = D92-D95, examen vie 19-feb; v5.18: lun 15 → mié 17-feb = D93-D95, examen jue 18-feb): sin SYNAPSE. Vibecoding: S13-S20 taper (ver CURSO_IA_04H_31AGO.md).
>
> **v5.10 · corrimiento (12-sep-2026)**: D1 = **lun 14-sep-2026** (el 11-sep tampoco se estudió; noveno
> corrimiento del ciclo 31-ago→14-sep) → el plan se regeneró con
> `node DATA/_scripts/gen_synapse_plan.js 2026-09-14`: **81 días · lun 14-sep → jue 3-dic-2026**,
> 12 semanas (**S1 = 14-20 sep, 7 días · S12 = 30-nov→3-dic, 4 días**), misma franja 12:30-13:00 y mismo
> currículo. No se recortó ninguna misión: el desfase se absorbe alargando el final (el día que "desaparece"
> respecto a los 82 de v5.9 es el sáb 12-sep, un "R" sin SHIP; los 11 sábados PC = 11 SHIP siguen enteros). Cifras leídas con node
> de `synapseDailyPlan.ts`, no estimadas.
>
> **v5.7 · contenido (5-sep-2026)**: F1 (sem 9-12) = stack del vibecoding (Claude Code docs · Academy skills/subagentes/MCP/
> Claude Code in Action · Supabase · n8n) en vez de CS50P; F0 se AUDITA (✓ si ya hecho, no se reinicia);
> sáb PC = SHIP del proyecto de la semana (`src/lib/vibecodingPlan.ts`); dom = Feynman 10' opcional.
> Misiones diarias estilo ENCAPS/Business: lección EXACTA de hoy, progreso real
> manual (empieza 0%), 30 min/día en espacios muertos.

## Qué hay

| Pieza | Archivo | Qué hace |
|---|---|---|
| Datos del plan | `src/lib/synapseDailyPlan.ts` | **GENERADO** — 132 días (19 semanas, **mié 7-oct-2026 → lun 15-feb-2027 · v5.20**; v5.19: 131 días, mar 6-oct → sáb 13-feb; v5.18: lun 5-oct → vie 12-feb; regenerar con `node DATA/_scripts/gen_synapse_plan.js YYYY-MM-DD`), bloques A/B/C/PC/R por día, `deload` en sem 17-19 |
| Vibecoding 04:15 | `src/lib/vibecodingPlan.ts` + `DATA/SYNAPSE/vibecoding_proyectos.json` | **GENERADO** — 12 proyectos S1-S12 (60 días = bloques de 5 hábiles mié→mar: mié 7-oct → mié 30-dic —S12 = mié 23 → mié 30-dic por el festivo del vie 25-dic—, SHIP sábados 17-oct → 26-dic y S12 el sáb 2-ene; el sáb 10-oct es de avance de S1) + taper S13-S20 (35 días en bloques secuenciales, lun 4-ene → vie 19-feb) = 95 días (`node DATA/_scripts/gen_vibecoding_plan.js YYYY-MM-DD`, v5.20: `2026-10-07`; v5.19: `2026-10-06`, bloques mar→lun, taper mié 30-dic → jue 18-feb; v5.18: `2026-10-05`, bloques lun→vie; el tipo del paso va con k, no con el weekday); `verificacion[]` por criterio; `VIBE_SHIP_LOG` horneado desde `_vibecoding_ship.json` |
| Verify / journal | `DATA/_scripts/verify_vibecoding.js` · `DATA/_scripts/journal_hoy.js` | `verify <s>` comprueba los 4 criterios mecánicos y apenda a `DATA/SYNAPSE/_vibecoding_ship.json` (`--sensores` para S13-S16); `journal_hoy.js` crea la entrada de la semana ISO en `D:/synapse-journal/journal/` |
| Generador | `DATA/_scripts/gen_synapse_plan.js` | Lee `curricula/_extracted.json`, valida cada URL contra los sets verificados (cero inventos) y emite el TS + los MDs de curricula |
| Temarios reales | `DATA/SYNAPSE/curricula/*.md` + `_extracted.json` | 15 fuentes extraídas con WebFetch/oEmbed + verificación adversarial (workflow de 30 agentes, 10-jun-2026) |
| UI | `src/components/study/SynapseTodayPlan.tsx` | Pestaña **⚡ Hoy** (primera) de `SynapseHub`: HOY / 7 días / 12 semanas, checkbox real |
| Progreso | `src/lib/studyProgress.ts` (PlanKey `'synapse'`) | localStorage `jmd-study-progress-v1`, manual, empieza 0%; alimenta el RingStat "Completadas" del hub y el panel derecho |
| Panel derecho | `src/layouts/DesktopRightPanel.tsx` → `SynapseRightPanel` | Misión de hoy (bloques con link) + contador de ✓ |

## Estructura del día (instrucción verbatim de Joseph: "30 minutos al día dividido en espacios cortos, en espacios muertos")

- **A (15', pantalla)** — lección EXACTA de la fase actual con link directo. Secuencial.
- **B (10', audio)** — rotación fija por día de semana: Lun No Priors · Mar Dwarkesh (Dario→Demis→Sholto&Trenton→Latent Space) · Mié Lex #452 (capítulo real del outline, 40 entradas con timestamps) · Jue The Batch · Vie canal Anthropic (5 vídeos verificados por oEmbed) · Sáb comodín (retoma lo pendiente).
- **C (5', lectura móvil)** — Lun Pro Git (capítulo real con URL) · Mar serie Prompt injection de Willison · Mié The Python Tutorial (sección real) · Jue Automate the Boring Stuff 3ª ed. (capítulo real) · Vie research de Anthropic (lethal trifecta, many-shot, constitutional classifiers, RSP) · Sáb comodín.
- **PC (sábado 15:00-17:00)** — **SHIP del proyecto de la semana** del vibecoding 04:15 (criterio de aceptación en `DATA/SYNAPSE/vibecoding_proyectos.json`). Desde v5.7 el generador lee el `ship` REAL de `VIBE_PROYECTOS` en vez de asumir "sábado de la semana n". Nada se arrastra a la semana siguiente.
  ✔ **Verificado el 12-sep (v5.10)**: los 11 sábados del plan (19-sep … 28-nov) llevaban `SHIP proyecto Sn` alineado
  con `VIBE_PROYECTOS.ship` (sáb 19-sep = S1 … sáb 28-nov = S11).
  ✔ **v5.10-b**: el desajuste de borde desapareció — el **SHIP S12** ya está dentro del plan.
  ✔ **Re-verificado el 14-sep (v5.11), el 15-sep (v5.12), el 16-sep (v5.13), el 19-sep (v5.14), el 22-sep (v5.15), el 26-sep (v5.16), el 30-sep (v5.17), el 3-oct (v5.18), el 5-oct (v5.19) y el 6-oct (v5.20, PC de `synapseDailyPlan.ts` contra `VIBE_PROYECTOS.ship` con node)**: en v5.20 los bloques del vibecoding van mié→mar, así que sigue el sábado de avance al arrancar:
  sáb 10-oct (d4) = avance S1 · sáb 17-oct (d11) = SHIP S1 … sáb 26-dic (d81) = SHIP S11 · sáb 2-ene (d88) = SHIP S12; 19 PC en total (12 SHIP + 1 avance + 6 opcionales del taper: sáb 9-ene (d95) · 16-ene (d102) · 23-ene (d109) · 30-ene (d116) · 6-feb (d123) · 13-feb (d130); el sáb 13-feb, d130, es el último PC). *(v5.19: mismos sábados con d# +1 —avance d5, SHIP S1 d12 … S11 d82, S12 d89, último PC sáb 13-feb d131—; v5.18: SHIP 10-oct (d6) → 19-dic (d76), avance S12 sáb 26-dic (d83), SHIP S12 sáb 2-ene (d90), 18 PC, el último el sáb 6-feb; v5.17: sáb 3-oct (d3) de avance, SHIP 10-oct (d10) → 26-dic (d87), 19 PC.)* Sábados de sem 14-16 = "PC opcional · taper" (el de la sem 13, sáb 2-ene, es el SHIP S12) (30': `verify_vibecoding.js --sensores` + retro);
  sem 17-19 = PC opcional/no. **Manda `VIBE_PROYECTOS.ship`** en todo caso.
- **Domingo = Feynman del proyecto (10', opcional)** — explicar en voz alta qué construiste y cómo funciona; el domingo sigue libre (v5 sáb/dom libres) y es marcable para conservar la racha.

## Cobertura (12 semanas honestas a 30'/día)

- **F0 · La Escuela de Anthropic = semanas 1-8** (46 bloques A contados el 6-oct · **mié 7-oct → dom 29-nov-2026**, v5.20 — la semana 1 es corta, mié→dom, 5 días; en v5.19 eran 47 (mar 6-oct → dom 29-nov, sem 1 de 6 días), en v5.18 48 (lun 5-oct → dom 29-nov, sem 1 completa), en v5.17 45 (jue 1-oct → dom 22-nov), en v5.16 48 (lun 28-sep → dom 22-nov), en v5.15 46 (mié 23-sep → dom 15-nov), en v5.14 48, en v5.13 45, en v5.12 46 y en v5.11 47): Academy + AI Fluency
  (13 lecciones reales) + Claude 101 / Code 101 / Platform 101 (temarios reales) +
  ensayo Building Effective Agents (16 secciones reales) + Karpathy Intro (3 tramos
  por chapters reales) + Deep Dive (11 tramos por los 24 capítulos reales, con `&t=`)
  + 3Blue1Brown (8 vídeos verificados; el 9º —invitado— va al PC de la sem 8).
- **F1 · stack del vibecoding = semanas 9-12** (23 bloques A · **lun 30-nov → dom 27-dic-2026**, v5.20 = v5.19 = v5.18 — el vie 25-dic, libre, cae en la sem 12; v5.17: 24 A, lun 23-nov → dom 20-dic): sem 9 Claude Code core (memoria · skills · hooks · subagentes; docs + Academy) · sem 10 MCP · headless · Agent SDK · plugins/workflows · sem 11 Supabase (RLS · select · triggers · webhooks · Edge Functions) · sem 12 n8n + Claude Code in Action (la última pieza de F1, Best practices for Claude Code, cae el lun 28-dic, ya en la sem 13, en v5.20). Temarios extraídos con WebFetch el 5-sep-2026 (`curricula/claude-code-docs.md`, `academy-*.md`, `supabase-docs.md`, `n8n-docs.md`; 106/106 URLs OK en check_links). CS50P/Automate quedan como biblioteca de consulta (Python se lee, no se memoriza).
- **F0 no se reinicia**: sus A-units de contenido F0 (las 46 que caen en sem 1-8 en v5.20 —el sáb 28-nov vuelve a ser 3Blue1Brown—; v5.19: 46 de 47, la del sáb 28-nov era Claude Code docs, de F1; v5.18: 46 de 48; 45 en v5.17) llevan `audit:true` (chip "auditar: ✓ si ya hecho") porque F0 y la minifase corrieron jun-ago con progreso solo en localStorage. Día 1 = auditoría de 5' en "My courses" de la Academy.
- Nota: `synapseData.ts` decía "F0 sem 1-4"; a 30 min/día reales F0 ocupa 8 semanas.
  El motor manda sobre la estimación optimista — honestidad antes que calendario bonito.

## Realidad vs "siguiente lección"

Cada bloque lleva `real: true|false`:
- `true` → el título de la lección/capítulo/timestamp fue VISTO en la fuente (chip "temario real").
- `false` → misión honesta tipo "el episodio más reciente / retoma donde quedaste"
  (No Priors semanal, números de The Batch, artículos sueltos de Willison, tramos de podcasts).

- **F2 · Academy restante + prep CCA-F = semanas 13-19** (41 bloques A · **lun 28-dic-2026 → lun 15-feb-2027**, taper del Step 1; v5.20; en v5.19 eran 40 hasta el sáb 13-feb, en v5.18 39 hasta el vie 12-feb, en v5.17 41 hasta el mar 9-feb, en v5.16 38 hasta el vie 5-feb, en v5.15 40 hasta el lun 1-feb, en v5.14 38 hasta el vie 29-ene, en v5.13 41 hasta el mar 26-ene, en v5.12 40 hasta el lun 25-ene y en v5.11 39 hasta el sáb 23-ene):
  (reparto por semana releído con node el 6-oct, v5.20) sem 13 Best practices for Claude Code (lun 28-dic, última pieza de F1) + Claude Code in Action "Verification Skills · Permission Modes" (mar 29-dic) + Hooks reference (mié 30-dic) + API I (intro, sáb 2-ene; 31-dic y 1-ene libres) · sem 14 API II (acceso a la API · prompt
  engineering · evals · tool use I) · sem 15 API III (tool use · RAG · features) · sem 16 MCP intro restante (certificado, mié 20-ene) + MCP Advanced I (jue 21-ene) +
  API IV (Claude Code y computer use · agentes y workflows I) · sem 17 (deload) agentes y workflows II (lun 25-ene) + certificado Building with the Claude API (mar 26-ene) + agent skills + subagentes (certificados, jue 28-ene) + Claude Code in
  Action (GitHub Actions · Verify and Share · Plugins, sáb 30-ene) · sem 18 (deload) MCP Advanced II-III (lun 1 y mar 2-feb) + los 3 ensayos de context engineering (mié 3 → vie 5-feb) + AI Capabilities
  and Limitations I (sáb 6-feb) · sem 19 (deload) AI Capabilities and Limitations II (certificado, lun 8-feb) + Claude Cowork (certificado, mar 9-feb) + repaso por los 5 dominios del CCA-F (mié 10 → vie 12-feb) +
  simulacro (sáb 13-feb, quizzes en modo examen) + cierre F2 (lun 15-feb = D91, decisión de febrero). F1 cierra el sáb 26-dic con Claude Code in Action ("Hooks" · "Automate Repeat Work"; el vie 25-dic es libre) y
  Best practices + "Verification Skills · Permission Modes" + la Hooks reference abren la sem 13 (lun 28 → mié 30-dic, ya contadas en F2). *(v5.19: F1 cerraba el sáb 26-dic con Best practices; sem 13 = Verification Skills (lun 28) + Hooks reference (mar 29) + API I (mié 30-dic); el resto de MCP intro empezaba el sáb 16-ene; MCP Advanced II en la sem 17; AI Capabilities completo en la sem 18; Claude Cowork lun 8-feb; repaso mar 9 → jue 11 · simulacro vie 12 · cierre sáb 13-feb.)* ⚠ La página oficial del CCA-F no aparece enlazada en la
  Academy (12-sep): la última A-unit (lun 15-feb, d132 en v5.20; v5.19: sáb 13-feb, d131; v5.18: vie 12-feb, d131; v5.17: mar 9-feb, d132) lo deja como **A VERIFICAR** (real:false, honesto).

## Cómo regenerar / extender (semanas 20+ · febrero)

1. Si hace falta temario nuevo (p. ej. CS50P Weeks 4-9, Kaggle, etc.): extraerlo igual
   (WebFetch/oEmbed, cero inventos) y añadirlo a `curricula/_extracted.json`.
2. Añadir las A-units de la fase siguiente en `buildAUnits()` de `gen_synapse_plan.js`
   (ajustar la aserción de total, `SEM_MAX`, `FIN_PLAN`, rangos de fase y los mapas B/C/PC si cambia la rotación).
3. `node DATA/_scripts/gen_synapse_plan.js YYYY-MM-DD` (misma fecha que `remap_inicio.js`; también `node DATA/_scripts/gen_vibecoding_plan.js YYYY-MM-DD`)
4. `node DATA/_scripts/check_links.js src/lib/synapseDailyPlan.ts` (debe dar 100%; 12-sep: 123/123 OK).
5. `npx tsc --noEmit` + commit. El progreso ya marcado NO se pierde (los `d` son estables
   mientras no se reordene el pasado — regla: NUNCA renumerar días ya transcurridos).
6. Journal: `node DATA/_scripts/journal_hoy.js --abrir` (D:/synapse-journal); verify del sábado: `node DATA/_scripts/verify_vibecoding.js <s>`.

## Google Calendar (Misión 2) — CREADO con horario confirmado por Joseph (10-jun-2026)

Joseph liberó el hueco 12:30–13:00 él mismo y confirmó en el chat. Eventos recurrentes
creados (color Blueberry, TZ America/Lima, descripción con link a la app; CERO eventos
existentes tocados):

| Evento | Recurrencia | id |
|---|---|---|
| 🧠 SYNAPSE — misión del día (30') | L–V 12:30–13:00, desde 11-jun-2026 | `j99thg3eaqesosmvppj4rfgvh4` |
| 🧠 SYNAPSE — PC sábado (2h) | Sáb 15:00–17:00, desde 13-jun-2026 | `hv2lk04orquvivthtkfhilb1ps` |
| 🧠 SYNAPSE — repaso + PC domingo (2h) | Dom 15:00–17:00, **desde 28-jun-2026** | `s7r8tiu66286t156l0odpv5nvo` |

> ⏸ **Ids del 10-jun (historial): ya no existen.** El 6-oct-2026 (v6.00) las tres series se RECREARON con su DTSTART original y fin en el plan:
> misión 12:30 → **`f1imvu9cnmhrcsi5ag6m3k8jdk`** (→ lun 15-feb-2027) · PC sábado → **`goknd2mvbkpqastc6n3rrhon5g`** (→ sáb 13-feb-2027) · repaso + PC
> domingo → **`frsvkuk585gmcte6bufo6dkfto`** (→ dom 14-feb-2027) *(⏸ ids v6.00, `DATA/_v600/cal/CAL_V6.md` §3 · ⏸ v6.01 (10-oct): misión 12:30 recreada como
> `7nd90n5s3ueinen4q13dohcaq4` → vie 19-feb; PC sáb/dom sin cambio)*. **Ids vigentes v6.02 (17-oct; `DATA/_v600/cal/CAL_V6.md` §11.2):** misión 12:30
> **`e37h4fl8gd0v7eavt1f9fgob0o`** (→ vie 26-feb-2027) · PC sábado **`bbj1ne6ken46pj25i5dt36idng`** (→ sáb 20-feb-2027) · repaso + PC domingo
> **`c010a16rsl6h0lk4krr0a9r3rs`** (→ dom 21-feb-2027).

Los domingos **14 y 21-jun-2026 quedan LIBRES** (otras actividades de Joseph): la serie de
domingos arranca el 28-jun a propósito (exclusión estructural, sin EXDATE). El plan refleja
esos 2 días como "Domingo LIBRE" (`DOMINGOS_LIBRES` en el generador). Instancias verificadas
con `list_events` (11-jun → 5-jul): L-V solo días de semana, sáb 13/20/27-jun + 4-jul,
dom solo 28-jun y 5-jul.
