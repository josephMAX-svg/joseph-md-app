# Verificación v6.03 · CONTENIDO Y ENLACES (mar 20-oct-2026)

Ámbito: que cada bloque esté en su apartado con sus enlaces y que lo que piden las guías exista en Qbankly, ProMIR y AccessDermatology.
Régimen verificado: v6.03 (D1 = mié 21-oct-2026). Se volcaron **todas** las guías del formato común (`GuiaBloque`) día a día del
19-oct-2026 al 3-oct-2027 (1.520 bloques: USMLE 307 · MIR 260 · Derma 206 = 103 sesiones × plan A/B · ENCAPS 50 · Research 109 + mínimo ·
vibecoding 95 · SYNAPSE 91 · AURUM 130 · LIVIANO 90 · Business 100 · revisión 50 · SHIP 19 · Feynman 12): 0 errores de carga, 0 errores de
`validarGuia` (Σ pasos = franja). Las comprobaciones se hicieron en solo lectura; las peticiones a webs externas, a ≤2/s.

## 1. Comprobaciones

| Qué | Resultado | Evidencia |
|---|---|---|
| USMLE · nombres de catálogo en las guías F1 (70 fechas, 307 bloques) | ✅ 0 nombres inventados | 384 rutas «B&B Step 1 › capítulo › sección › vídeo» = `qbankly_bb_step1_videos.tsv` (incluida la duración escrita) · 605 «System (nº)» = uWorld o Mehlman con el mismo nº · 396 nombres + 175 URL `library?e=&doc=` = índice de la Library (nombre ↔ doc) · 5 hitos = `qbankly_hitos_step1.tsv` · 257 nombres de QBank exactos |
| USMLE · tema del día ↔ recursos (D2-D49, 45 días de contenido) | ✅ 45/45 | Pre-test y consolidación usan los Systems del día (`guia_catalogo_f1.js`); el deep prime abre con los B&B del día; cada vídeo que no cabe aparece después en F1 (cola vacía al cierre) |
| USMLE · hitos | ✅ | D1 UWSA1 = «uWorld - Step 1 Self Assessment Simulation 1» (4×40) · D10/D25/D40/D50 = «Self-Assessment - Form 25/26/27/28» con sus bloques reales (Form 27 = 49/50/50/49) |
| USMLE · catálogo contra Qbankly EN VIVO (claude-in-chrome, solo lectura, sin crear tests) | ✅ idéntico | B&B Step 1: 491 vídeos, mismos id y duraciones; 3 nombres llevan un espacio final en vivo (el TSV los recorta) y los capítulos «(NEW)» se escriben sin el sufijo, como estaba decidido · Test Composer de «uWorld - USMLE Step 1»: 182 filtros (13 Subjects + 169 Systems), mismos nº, 3.659Q |
| USMLE · Palmerton (YouTube) | ✅ tras el arreglo 14 | 14 vídeos vivos (página + oEmbed), duraciones = `PALM`; los 4 «Part 2» tenían el título abreviado |
| USMLE · primeras filas del tramo 2 | ⚠ ver pendiente P2 | T1 reentrada · T2 NBME 29 («Self-Assessment - Form 29», 199Q) ✅ · T3/T4 (v5.20 D50/D51) mapeadas en el catálogo ✅ · T5-T14 solo traen la etiqueta abreviada v5.20 (aún no hay guía de tramo 2) |
| MIR · capítulo medido = tema del plan (D1-D76) | ✅ 76/76 | `medicion_promir_2026-10-18/<capId>.json` existe, su «titulo» = tema del plan (similitud 1,00 en los 76) y su `url` = `capUrl(capId)` |
| MIR · la guía sale de la medición | ✅ | Cada sección de la LECTURA DIRIGIDA existe en la medición; minutos recalculados (180 pal/min · tablas 90 · 0,5′/figura · clips ≤12′) = los de la guía; nº de preguntas citadas = el medido; pre-test/quiz/extra = citadas del capítulo, del pool oficial o (repaso) de capítulos previos; slots de la eval = citadas del capítulo de su día |
| MIR · D77/D78 | ✅ | mini-MIR y corrección: sin lectura de capítulo y sin enlace a capítulo (correcto) |
| MIR · enlaces | ✅ | 98 `/capitulo/<24 hex>` + 1.485 `/pregunta/MIR/AAAA-NNN` bien formados |
| Derma · casos del plan A | ✅ | 200/200 `gbosID` = `accessderma_cases1546.json`; títulos «Área. Case NN» = listado; 400 enlaces de caso en las guías, todos del listado |
| Derma · resto del plan A | ✅ | 178 secciones `content.aspx` en los TOC (`accessderma_clinica_tocs` / `estetica_tocs` / Color Atlas) · 186 libros · 318 q-banks · 266 grupos de casos del índice · B&B derma 13 y uWorld derma 6 = catálogos Qbankly · Pictorial: 34 temas, Σ 381 = total del banco |
| Derma · plan B | ✅ tras arreglos 8-10 | 60 URL públicas vivas (DermNet, Dermoscopedia, PubMed/PMC); ninguna apunta a AccessDerma (acceso remoto caducado) |
| Enlaces · inventario | 2.807 URL únicas | guías volcadas + ficheros de planes/guías + `METODO_ANKI_APEX_USMLE.md`, `METODO_RAVIMEDTEST.md`, `METODO_SIMULACRO_ENCAPS.md` |
| Enlaces con sesión (solo formato) | ✅ 2.089 | ProMIR 1.586 · AccessDerma 271 · Qbankly 176 (171 docs de Library existen en el índice) · Drive 52 · claude.ai 7 |
| Enlaces públicos (HTTP; YouTube vía oEmbed + página) | ✅ 508 OK tras arreglar 7 muertos | 4 vídeos de AURUM dan 401 en oEmbed: no son embebibles pero se reproducen (`playabilityStatus` OK) · 11 webs devuelven 403/429 a un script: en navegador abren BMJ, Europe PMC, Sales Gravy y Rayyan; JAAD International, COPE, DOAJ ×2 y Cochrane CENTRAL muestran un desafío Cloudflare (no se sortea) |
| Runners ENCAPS `https://joseph-md-app.vercel.app/encaps/bp/*.html` | ✅ 11/11 HTTP 200 | pretest_arranque 21/22 · eval 21/22/26/27 · banco 26/27 · minisim 23-oct/30-oct/6-nov; 7 sesiones con runner publicado |
| Obsidian | ✅ tras arreglos 1-3 y 15 | `check_obsidian_links.js`: 512 rutas de la app, 0 rotas (antes 6) · 190 enlaces `obsidian://` de las guías, todos con nota en el vault (antes 10 rotos) |
| Lista negra ENCAPS 2026-II | ✅ | 0 de 11 runners publicados nombra el examen reservado · 1.219 enunciados de BANCO_PROPIO contra los 100 ítems del examen: ninguno derivado de él; 1 parecido conceptual (ver P7) |
| Apartados · semanas 1-2 (19-oct → 8-nov) y 3-4 | ✅ salvo P3 | 196 + 152 guías resueltas como en el Home: cada guía lleva el plan de su bloque y cae dentro de su franja; sin enlaces de otro frente; ninguna se repite. Lun 19 y mar 20 = CORRIDO, sin bloques |
| Generadores `--check` y tipos | ✅ | `gen_usmle_guia --check` · `gen_mir_guia --check` · `gen_guia_lectura --check` · `gen_derma_guia --check` · `gen_encaps_guia --check` · `check_rutina_guia` · `check_obsidian_links` · research/derma ciclo 2/biblioteca idempotentes (`=`) · `tsc --noEmit` sin errores |

## 2. Arreglos (fichero · antes → después)

1. `DATA/_scripts/gen_aurum_plan.js` → `src/lib/aurumDailyPlan.ts` (`aurumObsUrl`): partía la ruta en cada «/» y 4 lecciones con «/» en el título enlazaban a una nota inexistente → carpeta = solo «FaseN» y el resto del título saneado.
2. `DATA/_scripts/gen_aurum_obsidian.js`: nombraba la nota con el trozo tras la última «/» («DJ).md», «30.md», «que (Voss).md», «invitacion).md») → mismo criterio que `aurumObsUrl`.
3. Vault `07_VENTAS_AURUM`: esas 4 notas renombradas a «S04 - Las 3 voces de Voss (asertiva - positiva - DJ)», «S08 - Sintesis- banco S+P + medicion ratio 70-30», «S09 - Preguntas calibradas como-que (Voss)» y «S21 - Tecnicas de cierre I (alternativo-suposicion-invitacion)». El contenido no cambia.
4. `DATA/AURUM/curricula/_curriculum_v2.json` → `aurumDailyPlan.ts`: 2 vídeos retirados («This video is unavailable»). `SlPGorMfSB4` (audiolibro no oficial de Never Split the Difference, 20 usos) → `guZa7mQV1l0` «Never Split the Difference | Chris Voss | Talks at Google» (50:44, oficial). `buKC5g5uK9c` (audiolibro no oficial de $100M Offers) → `https://www.acquisition.com/audiobooks` en la lectura (3 usos) y `https://www.youtube.com/@AlexHormozi/search?query=value%20equation` en el vídeo de D57, el mismo patrón que D58.
5. Vault AURUM: en las 17 notas que los tenían, los dos enlaces retirados se sustituyen por esas mismas URL.
6. `src/lib/aurumData.ts`: el recurso «$100M Offers (audiolibro completo en YouTube)», muerto → vídeos del canal oficial sobre la Value Equation. El audiolibro oficial sigue en la fila anterior.
7. `DATA/BIBLIOTECA/_aurum_biblioteca.json`, `_biblioteca_niveles.json` → `aurumBiblioteca.ts`, `bibliotecaNiveles.ts`, `Marketing.md`: los 3 `audiolibro_youtube` muertos → `no_existe`. Queda el audio de Spotify.
8. `src/lib/dermaDailyPlan.ts`: `Blue-white_veil` → `Blue_white_veil` y `Inflammatory_skin_diseases_(inflammoscopy_or_ID)` → `Inflammoscopy`. Las páginas antiguas no existen en Dermoscopedia; las nuevas sí (comprobado con la API de la wiki y HTTP 200).
9. `DATA/_scripts/gen_derma_ciclo2.js` → `src/lib/dermaCiclo2.ts`: `veil` igual que en el arreglo 8.
10. `src/lib/dermaData.ts`: `veil` igual que en el arreglo 8, y DermNet `topics/oral-mucosal-disorders` (404) → `topics/mouth-problems`, la página índice «Mouth problems» de la mucosa oral.
11. `DATA/_scripts/research_guia.js` → `src/lib/researchGuia.ts`: en C-1, el enlace del paso «Crossref A» llevaba `from-pub-date:undefined,until-pub-date:undefined` (HTTP 400) → 2026-08-31 → 2026-10-30, la misma ventana que los recursos.
12. `DATA/_scripts/gen_research_plan.js` → `researchDailyPlan.ts` y `DATA/RESEARCH/daily-plan.md`:
    - REBUTTAL: PLOS «how-to-write-a-persuasive-response-to-reviewers» (404) → `plos.org/resource/how-to-receive-and-respond-to-peer-review-feedback/` («Responding to peer review»).
    - RAYHC: el artículo de Rayyan redirigía → URL canónica `…/articles/45541788688529-How-to-Create-a-Review-in-Rayyan`.
13. `DATA/RESEARCH/systematic-reviews.md`: el mismo enlace de Rayyan que en el arreglo 12.
14. `DATA/_scripts/usmle/guia_catalogo_f1.js` → `src/lib/usmleGuia.ts`: títulos de los 4 Palmerton «Part 2» abreviados → el título exacto de YouTube (Cardiology, Renal, GI y Neuro).
15. Nuevo `DATA/_scripts/ensure_vault_entregables.js`: idempotente, nunca sobrescribe y no toca `obsidianResearchMap.ts`. Con `--write` creó las 6 notas `_README` de `04_INVESTIGACIÓN DERMATOLÓGICA/03_ENTREGABLES` (TESIS_L0, CARTA_1, CASE_REPORT_1, CASE_REPORT_2, MENTORES, BIBLIOMETRICO_1). Los botones ◆ Obsidian de los átomos las abrían sin que existieran; el primero en usarse es M1, el mié 28-oct.

## 3. Pendientes

- **P1 · Etiquetas v5.20 en la UI del USMLE.** La Cola de `UsmleTodayPlan` y la línea del Home muestran `bbCh → bbVid` y `system → uw` de la fila del plan. Son abreviaturas v5.20, no nombres de Qbankly. Unas no existen como vídeo («Neoplasia 01-04», «Tubular Transport + Diuretics», «Liver: LFTs + Bilirubin + Hepatitis», «Hypothalamus-Pituitary Axes»). Otras no coinciden literalmente con el System: «Principles of pathology», «Normal structure & function» ×10, «Fluid/electrolytes/acid-base» ×3, «Hypothalamus & pituitary», «Disorders of peripheral nerves/muscles», «Neurodegenerative & dementias». La guía 🧭 del mismo día trae el nombre exacto y avisa en 24 días (`GUIA_USMLE_META.diasConAviso`). Propuesta: que la Cola muestre los nombres de la guía. Es un cambio de componente; no se tocan los datos v5.20 porque el multiset V1 de `verificar_v6.js` los protege.
- **P2 · Tramo 2: falta un catálogo y una guía por fila antes del mar 16-mar-2027.** Las etiquetas de T5-T14 no casan con la numeración real de B&B:
    - T6 «coagulación + hemofilias + vWD» = «Hemostasis 01-02», que son Coagulation y Platelet Activation; Coagulopathies es la 04.
    - T7 «plaquetas + hipercoagulabilidad + CID» = «Hemostasis 03-04»; Platelet Disorders es la 05.
    - T5 no incluye 07 Other Anemias (macrocíticas).
    - T8 no incluye 07 Myeloproliferative.
    - T9 no incluye la transfusión (RBC 08 Blood Groups) ni los fármacos (Cancer Drugs 01-06).
    - T11 trata la bacteriología general, que está en «Basics of Microbiology».
    - T12 «Gram+ bacilos + Gram− cocos» = «Bacteria 04-05», que son Gram Negative Rods y Other Gram Negatives.
    - T13 «Gram− bacilos + zoonosis» = «Bacteria 06-08», que son Spirochetes, Zoonotic y Mycobacteria.
    - En uWorld, «Hemostasis & thrombosis» se llama «Hemostasis and thrombosis» y «Biostatistics & epidemiology» es un grupo de 5 Systems.
- **P3 · Hora del bloque principal en los días de NBME** (mar 3-nov, mar 24-nov, mar 15-dic, mié 30-dic). La plantilla dice 07:15–12:00 «BLOQUE PRINCIPAL», pero el hito y su guía van de 07:00 a 12:30. El Home ya pinta la guía, que se busca desde las 07:00. Se corrige en `plantillasV6`, que es del ámbito de fechas.
- **P4 · Webs con antibots.** JAAD International, COPE (redirige a `/guidance?f[0]=type:21`), DOAJ 1087-2108 y 2352-5126, Cochrane CENTRAL y la doc de la API de Semantic Scholar (429) tienen el formato correcto, pero no se pudieron abrir de forma automática. Confírmalas una vez desde tu navegador.
- **P5 · AccessDermatology.** El acceso remoto está caducado: el plan A no se puede abrir; los ids y secciones sí están verificados contra los listados del 18-oct. Los 34 temas del Pictorial solo se pueden verificar contra el catálogo del 18-oct. Renuévalo desde la red de tu institución.
- **P6 · Runners ENCAPS desde el D6 (mié 28-oct), sin generar.** La guía ya lo avisa con los comandos (`gen_encaps_minisim.js --eval/--banco`, `sync_encaps_bp_web.js`, `gen_encaps_guia.js`, deploy) y un plan B. Hay que generarlos antes del lun 26-oct, tras el mini-sim del vie 23.
- **P7 · Lista negra.** `R-2025-1A-Q30` (ítem real del 2025-1A, en `set_reales_otros_1.json`) pregunta el mismo concepto que el ítem 71 del examen reservado (medicamentos del PNUME). No está publicado. Decide si se aparta del pool hasta el pre-test del vie 8-ene.
- **P8 · Audiolibros.** Los audiolibros completos de *$100M Offers* y *Never Split the Difference* ya no están en YouTube. El de Hormozi es gratis en acquisition.com, pero pide un formulario con correo; el de Voss es de pago o de biblioteca. Decides tú.
- **P9 · Deploy.** El bundle `dist/` aún contiene los enlaces antiguos hasta el próximo deploy.
- **P10 · Cosmético.** En el D1, dos recursos de vídeo Palmerton llevan una etiqueta abreviada («Anki + FSRS», «The ONLY video»); el paso trae el título exacto. Está en `gen_usmle_guia.js`, que en esta sesión editaba otro agente.
