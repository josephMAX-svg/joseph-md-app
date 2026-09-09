# PENDIENTES DE JOSEPH · régimen v5.8

**Generado:** 08-sep-2026 · **re-fechado a v5.8 el 09-sep-2026** · **D1 = JUEVES 10-SEP-2026**

> ⚠ **El régimen vigente es v5.8 desde el 10-sep-2026.** El 9 de septiembre tampoco se estudió → +1 día
> hábil sobre v5.7 (que ya arrastraba +2 por el 7 y el 8). Instrucción literal de Joseph en este corrimiento:
> **ni un tema ni un subtema se deja atrás — no se fusiona ni se recorta nada**; el desfase se absorbe
> alargando el final de cada plan (Step 1: D95 = lun 25-ene-2027). Los 12 hitos (UWSA1-2 · NBME 25-33 ·
> Free 120), las franjas, las metas y la ventana de examen (25-29 ene, target mié 27) **no se movieron**;
> lo que cambia es la fecha del contenido diario y, en varios planes, el **número de día** de un hito.
> **Regla al leer este doc: la FECHA es lo estable; el D# puede haber cambiado** — verifícalo contra el
> `.ts` del plan antes de actuar. Fechas de abajo releídas de los `.ts` el 09-sep-2026.

Este documento consolida **todo lo que los ~25 agentes de la reestructuración dejaron marcado como
`pendiente_usuario`**: decisiones que solo tú puedes tomar, verificaciones que exigen sesión logueada
(QX, Theomed, AccessDerma, ProMIR, MyNBME, DIGEMID) y acciones fuera del repo (Anki, Calendar, n8n,
compras, envíos). No incluye nada que los agentes ya resolvieron.

**Regla de mantenimiento:** se revisa en la **revisión semanal del sábado (07:15-07:35)**, junto a
`DATA/REVISION_SEMANAL.md`. Lo que se cierre se tacha; lo que aparezca nuevo se añade en su bloque.

**Fuentes:** `scratchpad/palmerton_v3/FASEC_*.json` · `CIERRE_*.json` · `V57_*.json` +
`DATA/USMLE/_palmerton_v3_extractos/gaps_v3b_*.json`. Cuando dos agentes se contradicen manda el más
reciente (V57 > CIERRE > FASEC).

**Ya resuelto — no lo busques aquí:** el SQL de ENCAPS está aplicado (**99 filas, 10-sep→29-ene, backup
`study_schedule_bk_0909`**; el `bk_0908` de v5.7 sigue intacto y **no hay que re-ejecutar el SQL**: un
segundo DELETE+INSERT pisaría el backup nuevo) · los 12 overlays de hito y las series del Calendar están
re-fechados · `PALMERTON_METODO_COMPLETO.md` y `PALMERTON_POR_MATERIA.md` v3 están escritos ·
`gen_encaps_intensivo_2027.js` se invoca con **`--base 2026-09-10`** (su default interno sigue siendo
`2026-09-07`: hay que pasar el flag) · el SHIP del vibecoding está alineado con SYNAPSE · la memoria
(`MEMORY.md`, `coach-stance-encaps.md`) declara el estado vigente.

---

## 🔴 ANTES DEL D1 (hoy 9-sep / mañana 10-sep temprano)

Sin esto el plan arranca ciego o con el contenido equivocado el primer día.

- [ ] **Anki abierto: verificar FSRS y el preset de `APEX::USMLE`** — FSRS activado, *desired retention*
      **0,90**, **10 nuevas/día**. Luego `node DATA/_scripts/anki_telemetria.js` y contrastar due/backlog/
      revisadas con las Stats de Anki (±5 %); pegar el one-liner en la consola de la app y comprobar el
      instrumento ANKI del cockpit. Anotar la fecha en `DATA/SYNC_ANKI_OBSIDIAN_APP.md` §"Verificación
      D1-D2". *(SYNAPSE/USMLE)*
- [ ] **Crear el preset FSRS `APEX::MIR`** — retention **0,85** hasta el 31-mar-2027 (→ 0,90 en fase
      principal), Good/Again, **nuevas ≤4/día**; y la plantilla **APEX-MIR** (SAQ · por qué · 🇪🇸 delta vs
      Perú/USA · tag sistema USMLE · pregunta oficial de origen). *(MIR)*
- [ ] **Crear los 10 sub-decks `APEX::DERMA::A…X`** en Anki escritorio (o `createDeck` por AnkiConnect) y
      verificar con `deckNames` — AnkiConnect no respondió el 05-sep. Sin ellos el TSV de la cola crea
      decks con nombre suelto al importar. *(Derma — antes de la sesión d1, que en v5.8 es el **vie 11-sep**)*
- [ ] **Importar el deck de cifras ENCAPS** — Anki → Importar
      `DATA/ENCAPS/TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv` (separador `;` · HTML · deck en
      columna 3 → `ENCAPS::Cifras` · tags en columna 3), FSRS, 20 nuevas/día. Se repasa **dentro del
      bloque Anki de las 05:00, ≤5 min**, desde el día 1. *(ENCAPS)*
- [ ] **Re-scan LOGUEADO de QX y Theomed** + decisión escrita de matrícula: ¿sigue vivo el acceso 2026-II?
      ¿publicaron Investigación y Gestión? ¿abrió el ciclo 2027-I? El inventario los marca "A VERIFICAR" y
      **4 de los 7 simulacros de viernes de la fase intensiva dependen de ese acceso**. *(ENCAPS)*
- [ ] **Retomar el quick-log de VITALS a las 07:00** (20 s: horas de sueño + agua). El último registro es
      del 8-jun-2026; sin dato, la métrica 8 de la revisión semanal y el disparador ÁMBAR "sueño <6 h" no
      existen. *(VITALS/sistema)*
- [ ] **Auditar F0 de SYNAPSE contigo en 5'** (día 1): marcar ✓ las A-units ya cursadas jun-ago (Academy
      *AI Fluency · Claude 101 · Code 101 · Platform 101*, Karpathy, 3B1B) en la pestaña ⚡ run; la primera
      que quede sin ✓ es la lección real de mañana. *(SYNAPSE)*

---

## 🟠 ESTA SEMANA (9-15 sep)

- [ ] **P0 de seguridad · RLS en Supabase.** 49 tablas con RLS desactivado expuestas a la anon key,
      incluida **`datos_tesis` (55 filas de MENORES)** con la anon key en el repo. Es 1 sentencia SQL +
      prueba del pipeline, no un proyecto de una semana. ⚠ Activar `ENABLE ROW LEVEL SECURITY` **sin
      policies bloquearía la app** → decidir el alcance antes de ejecutar. *(sistema · proyecto S6 del
      vibecoding, adelantable)*
- [ ] **Protocolo test-day antes del vie 11-sep (UWSA1)** — preparar las 3 bolsas Ziploc BREAK 1/2/3
      (huevo duro, pavo/pollo, queso, nueces, granos de café con chocolate; **sin galletas ni jugos**) y
      hacer el quick-log de sueño y agua en VITALS ese día como ensayo (07:00 y al cerrar el sim).
      *(USMLE/rutina)*
      > Contexto: el UWSA1 cae en el día 3 del régimen, con solo 2 días de contenido encima. Es la línea
      > base por diseño — no lo leas como un mal resultado.
- [ ] **Cerrar cada sesión de ENCAPS desde el 10-sep** (rutina diaria):
      `node DATA/_scripts/gen_encaps_semana.js --cerrar "…" --sql` → aplicar el SQL por `execute_sql`
      (MCP, proyecto `qacynpqdrorpuegsmtcy`). Los **viernes**: cargar la nota /25 en ▲ SIM y correr
      `gen_encaps_semana.js`. Sin esos datos el Cockpit muestra "SIN DATOS" en % ciego y barras vacías.
      *(ENCAPS)*
- [ ] **Verificación en vivo del USMLE**: Estudio → USMLE → Cola de hoy → guardar una medición y
      comprobar que aparece **MEDIA 7D** en la ReadinessBar y la fila en Supabase `usmle_daily_scores`.
      *(USMLE)*
- [ ] **Verificación en vivo de Derma en tu Chrome real** (solo se probó en el preview local): lámina de
      HOY con los chips de caso, el cierre con botones de registro y la cola Anki. *(Derma)*
- [ ] **Verificación en vivo de AURUM** (`expo start` → AurumHub): el botón "✎ registrar semana" abre el
      editor y el semáforo cambia; navegando a **D15** aparece la rúbrica y el score se guarda en
      `jmd-aurum-rubrica`; en **D40** aparece la tarjeta VARIANTE LIVIANO. *(AURUM)*
> ~~Corregir 2 descripciones del Calendar (ANKI AM 05:00, DESAYUNO L-V)~~ — **HECHO el 8-sep 15:10**:
> verificado con `get_event` que ANKI AM decía "régimen v5.7: 95 días desde mié 9-sep ≈ 594h totales"
> y que las 16 series (10 de estudio + 6 de rutina) llevaban la etiqueta v5.7.
> ⚠ **v5.8 · A VERIFICAR (09-sep)**: esas descripciones deben decir ahora **"95 días desde jue 10-sep"** y la
> etiqueta **v5.8**. Lo actualiza el agente de Calendar; confírmalo con `get_event` antes de darlo por hecho.
- [ ] **Crear el evento recurrente `📋 REVISIÓN SEMANAL`** sáb 07:15-07:35 desde el **sáb 12-sep** (hueco
      libre tras el desayuno). Descripción sugerida: `node DATA/_scripts/gen_revision_semanal.js →
      DATA/USMLE/REVISIONES/S<NN>.md · 10 métricas · DATA/REVISION_SEMANAL.md`. *(sistema)*
- [ ] **Antes de la revisión semanal S1 (sáb 12-sep)**: tocar el instrumento SEMANA del cockpit (web) →
      pegar el portapapeles en `DATA/USMLE/REVISIONES/_localstorage_export.json`. Sin ese export las
      métricas 5/6/7/9 salen "sin dato"; las métricas 1 (scores USMLE) y 2 (UWorld %) se rellenan a mano
      hasta el proyecto S3. *(sistema)*
- [ ] **Redeploy de n8n `APEX-MOTOR-FLOW-V2`** (:5678 sigue con el código del 07-may, parser multilínea
      arreglado solo en disco): con n8n arriba, exportar backup del workflow desde la UI → ejecutar
      `python D:\agente_estudio\scripts\_ARCHIVO_DESARROLLO\update_n8n_workflow_v2_3.py` (PUT de
      `apex-node-002` parser y `apex-node-005` crear nota) → enviar **1 APEX `::OBSIDIAN` multilínea de
      prueba** con Ctrl+Shift+A y comprobar que la nota llega íntegra a `01_USMLE\…\APEX_creados\` y la
      card a Anki. Candidato natural al proyecto S1 del vibecoding. *(sistema/SYNAPSE)*
      > ⚠ Hasta que esté verificado, crea los APEX de MIR **directamente en Anki** (si llegan truncadas,
      > pierdes 76 días de tarjetas sin ninguna señal que lo detecte).
- [ ] **Alinear `D:\agente_estudio\config\fases.json`** — sigue con `FASE_4_ENCAPS_DOMINANTE.is_current_phase
      = true` y `FASE_7.inicio = 2026-10-01`. Poner `false` en FASE_4 (o `true` en FASE_7) y
      `FASE_7.inicio = 2026-09-10`. Verificar antes que `orquestador.py` lee ese campo. *(sistema)*
- [ ] **Reponer stock del banco ENCAPS antes de la semana 3 (21-sep)** — avisos reales del runner al
      generar la semana 1: el secundario de cola larga **II-2** solo tenía 2Q (la receta pide 4-5), el
      sub-eje `tipos_vigilancia` sigue con 2Q propias; tras el banco del 10-sep el secundario **II-2 queda en 0Q** y **II-3 en 5Q** (I-3 vuelve a 20Q porque su sesión se corrió al lun 14-sep).
      Pre-generar `set_I-3_2.json` y cola larga II-2. Déficit total: **I-3 180Q · V-2 149Q · II-3 108Q**.
      *(ENCAPS)*
- [ ] **Conseguir `CLAVE DE RESPUESTA 2026-1.pdf`** (Tío López / QX): los 100 ítems del 2026-1 siguen sin
      clave y no sirven ni como simulacro ni como stock verificado. *(ENCAPS)*
- [ ] **Importar `DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv`** en Anki (Archivo → Importar,
      tabulador, deck en columna 3, etiquetas en columna 4, FSRS) — **antes del D6 (jue 17-sep)**, tope
      **D15 (mié 30-sep**, el día que el plan reserva para las 10 tarjetas del módulo). *(LIVIANO)*
- [ ] **Rutina de export del ledger** (dos claves distintas, ambas solo en el localStorage de UN
      navegador) *(Derma/MIR)*:
      - Derma, cada viernes: botón de export del cierre (o en Debilidades) → pegar en
        `DATA/DERMATOLOGIA/TRACKING/_registro_derma.json` → `rondas[]`.
      - MIR, periódicamente: pestaña HOY → "⤓ Exportar log JSON" → volcar en
        `DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json` con `plan:'MIR'`.
- [ ] **Actualizar la memoria `usmle-step1-v5.md` con el pipeline real de corrimiento** — tras cada
      `node DATA/_scripts/remap_inicio.js <fecha>` hay que correr **también** *(sistema)*:
      - `node DATA/_scripts/gen_research_plan.js <fecha>` (remap re-fecha Research **sin conocer la pausa
        de enero** → d41/d42 caerían en enero),
      - `node DATA/_scripts/gen_vibecoding_plan.js <fecha>` (remap no lo invoca),
      - `python DATA/_scripts/gen_business_plan.py <fecha>` (remap **no salta los feriados fijos** en el
        bloque Business: 118 filas vs 121 correctas).
      > ⚠ **No volver a ejecutar `build_vault_research.js`**: sobreescribiría `obsidianResearchMap.ts` con
      > el mapa antiguo (1-40, solo SR-1). Desde ahora el mapa lo emite `gen_research_plan.js`.
- [ ] **Decidir/crear la tarea programada de telemetría Anki** (proyecto S2, 14-18 sep): tarea de Windows
      `schtasks /create /tn "JMD Anki telemetria" /tr "node D:\joseph-md-app\DATA\_scripts\anki_telemetria.js"
      /sc daily /st 21:05` **o** hook `SessionEnd` de Claude Code. *(SYNAPSE)*
> ~~Corregir `DATA/SYNAPSE/vibecoding_proyectos.json`~~ — **HECHO el 8-sep y re-actualizado el 9-sep (v5.8)**:
> el JSON fuente dice ahora "plan de 95 días", "**8 corrimientos (31-ago→10-sep)**", el conteo esperado
> "**USMLE 95 · MIR 78 · LIVIANO 90 · SYNAPSE 82 · VIBE 60 · … · ENCAPS 99**" y `START=2026-09-10`, así que la
> próxima regeneración no lo revierte.
- [ ] **Los D# de LIVIANO cambiaron de número** (el generador re-slotea los casos a viernes reales):
      drills D37/D58/D77/D88 → **D36/D57/D76/D87** · trimestral D46/D90 → **D45/D89** · capstone D89 →
      **D88**. Actualizar cualquier doc, componente o nota externa que cite los viejos. **La fecha es lo
      estable, no el número de día.** *(LIVIANO)*

---

## 🟡 ESTE MES (sep-oct)

### Research — envíos y gestiones (nadie más puede hacerlas)

- [ ] **Los 3 mensajes de `DATA/RESEARCH/MENTORES.md` §3, personalizados** *(Research)*:
      1. **M1 · mié 16-sep** — WhatsApp + reunión con el **Dr. Ciro**: 3 coautorías, vía CEI de la tesis,
         versión del CADI usada, su ORCID. (Es también el arranque del case report.)
      2. **M2 · mar 22-sep** — registrarse en `https://risingscholars.net/accounts/register/` y publicar
         la solicitud de mentor.
      3. **M3 · lun 28-sep** — email a **Finlay**; antes verificar en la página del CADI de Cardiff el
         procedimiento de licencia (`technologytransfer@cardiff.ac.uk` según fragmento de búsqueda; la
         página no respondió) y su dirección — **no está inventada en ningún doc**.
- [ ] **C-2 · jue 24-sep — elegir el artículo diana** en `CARTA_1/candidatos.md` §1 y **leer ESE DÍA en la
      web** la guía de autores (ventana temporal de cartas y límites de JAAD/JCD/Derm Surg; las guías
      devolvieron 403/402 a la verificación automática). Recomendación #4 (JAAD,
      `10.1016/j.jaad.2026.08.115`) si admiten "unpublished data"; si no, #1 (JCD `10.1111/jocd.71104`,
      coautor Cotofana). Fecha límite interna ≤15-oct. *(Research)*
      > ⚠ **C-6 = SUBMIT de la carta el mié 14-oct**, contra un deadline interno del 15-oct: **1 día de
      > margen**.
- [ ] **Enviar el correo a la Editorial Office de IJD** (`CARTA_1/candidatos.md` §4) pidiendo la política
      de correspondencia — **falta la dirección**: tomarla de la página de la revista en Wiley
      ("Contact"). Pendiente desde el 27-ago. *(Research)*
- [ ] **1ª semana de octubre — reunir los 10 documentos de `TESIS_L0/etica.md` §1**: nº y fecha de
      aprobación del CEI (o, si no hubo, vía expedita/retrospectiva con el Dr. Ciro y la FMH-UNCP);
      consentimientos parentales y asentimientos; versión y permiso del CADI; base anonimizada.
      **Sin CEI documentado no se somete a JAAD Intl / IJD** (T-1 = vie 16-oct; T-8 SUBMIT = jue 19-nov).
      *(Research)*
- [ ] **Case report #1 · decidir la fuente A (Dr. Ciro)** y tener **caso + consentimiento de publicación
      firmado + senior author antes del 31-oct** (`CASE_REPORT_1/caso_candidatos.md`). **CR-1 cae el vie
      30-oct: 1 día de margen.** Si el Dr. Ciro no da caso, **activar la fuente B (colega SPD) la 1ª
      semana de octubre** — sin esperar al átomo. *(Research)*
- [ ] **Crear ORCID y el resto de identificadores académicos** (`MD_MAESTRO` §10) — Editorial Manager lo
      exige al autor de correspondencia. Pegar los IDs ahí. *(Research)*
- [ ] **Cerrar el presupuesto de publicación** (RUTA §3.1, todo "A VERIFICAR") *(Research)*:
      (a) importe exacto de JAAD Intl / JAAD CR en el Excel oficial de Elsevier
      (`legacyfileshare.elsevier.com/els_com_pricing/article-publishing-charge.xlsx`, no legible por
      herramientas); (b) grupo **GPOA de Perú** (45 % vs 65 % del precio de lista, se ve en "rights &
      access" al enviar); (c) **Actas Dermo-Sifiliográficas**: ¿Diamond $0 (AEDV) o APC US$1.870 / 1.900 €
      (DOAJ)?; (d) ¿JAAD International cobra APC a las *Notes & Comments*?
- [ ] **Verificar las URLs/portales marcados "A VERIFICAR"**: ScholarOne de IJD
      (`mc.manuscriptcentral.com` → 403), portal de envío de *Dermatology Online Journal* en eScholarship,
      URL exacta de Editorial Manager de JAAD International, y los **límites y ventana de *letters*** de
      JAAD / JAAD Intl / IJD (403). *(Research)*
- [ ] **Crear los overlays de hitos Research en Google Calendar** (naranja, como los NBME): C-2 24-sep ·
      C-6 14-oct · CR-1 30-oct · T-8 19-nov · X-7 29-dic · CR-9 1-feb · R10 19-feb · R43 **1-jul-2027**. (Research es el único plan que NO se movió en v5.8.)
      Hoy solo existe el recordatorio Research4Life del 1-jul-2027 → **un día-Derma o un slip puede tapar
      el deadline de la carta**. *(Research)*

### USMLE — reservas y verificaciones externas

- [ ] **Reservar el Free 120 en el Prometric de Lima** para el **vie 22-ene-2027 (D94 en v5.8; era D95)** — hay que hacerlo
      en sep-oct. Verificar en `usmle.org` / Prometric la **cuota internacional citada como $155**
      (la cifra sale del extracto `uworld-preguntas.md` §7 y está marcada A VERIFICAR; el cuaderno menciona
      $75 EE.UU./Canadá). *(USMLE)*
- [ ] **Confirmar en MyNBME qué formas CBSSA/NBME están activas en enero-2027** antes de asignarlas a los
      viernes de hitos: el cuaderno solo describe las formas **25-30** con su tabla de pase, la v1 decía
      25-31, y **el plan asigna hasta la NBME 33**. *(USMLE — alto: afecta a 3 hitos y al GO/NO-GO)*

### Derma — la sesión logueada que desbloquea tres cosas a la vez

- [ ] **Una sola sesión de ~20 min con tu Chrome adjunto a AccessDerma** (método exacto en
      `DATA/DERMATOLOGIA/_scrape/README_TOC_PENDIENTE.md`) *(Derma — alto impacto)*:
      1. Extraer los **TOC con `sectionid`** de Fitzpatrick 9e (2570), Barnhill 4e (2802), Weinberg 5e
         (1913), Guidebook (2960) y dermatoscopia (2804, 2929) → hoy **20 átomos enlazan a la portada del
         libro** y el "si fallas el caso, lee aquí 10′" no existe.
      2. Leer el listado de `cases.aspx?groupid=1546` (título + área de los 200 casos) para **confirmar o
         corregir `dermaCasoArea()`** — el etiquetado Med 1-110 · Path 111-140 · Peds 141-170 ·
         Surg 171-200 es una **suposición**: si el orden real no es por área, **todo el mapa de fallos por
         módulo CORE del ledger y del Hub es ruido**.
      3. Guardar los `sectionid` por pregunta del 2929 para que la "imagen dermatoscópica ciega" apunte a
         la pregunta N y no a la portada del Self-Assessment.
- [ ] **Verificar DeLorenzi 2017** (ASJ, PMID 28333326; requiere acceso OUP/UF) — las **UI de
      hialuronidasa por "área"** (~450 UI y ~900 UI que cita el SPEC §2.4) y el **criterio de parada de
      los pulsos**. Hasta entonces el ítem `ui` del drill y la ficha X-19 los muestran como A VERIFICAR:
      **no fijar esas cifras en Anki**. Deadline: antes del drill de oclusión **d19 = lun 2-nov** (v5.8).
      *(Derma)*
- [ ] **Asignar el deck `APEX::LIVIANO`** en `src/lib/ankiLinks.ts` (y, si lo quieres, la entrada
      "Academia → Logística F5" en `EmpresaHub.tsx` para acceso directo al Protocolo). Ninguno de los dos
      ficheros estaba en la lista del agente. *(LIVIANO — asignar a un agente)*
- [ ] **Crear la carpeta `DATA/BUSINESS/_kpi/`** y guardar ahí el JSON del botón "Exportar JSON" del
      Cockpit F1. *(LIVIANO)*

### LIVIANO · Acceso Perú — las verificaciones DIGEMID

*El plan las agenda como átomos D39-D41 + D43-D44 (**3 → 10-nov** en v5.8), pero cierran los 2 pendientes ROJOS que arrastras
desde junio ("Legalidad DIGEMID" y "Cotización Sterilelabs") y de ellos depende todo el COGS y el value
stack. Regla anti-alucinación: si un dato no aparece, se escribe `SIN REGISTRO HALLADO (fecha)`.*

- [ ] **D39 · mar 3-nov — Registro sanitario DIGEMID**: consultar el portal público (URL sin verificar),
      capturar pantalla fechada de semaglutida SC/oral y tirzepatida (titular, presentación, vigencia) →
      columna `registro` de `LIVIANO_ACCESO_PERU` en `src/lib/empresaData.ts`.
- [ ] **D40 · mié 4-nov — Condición de venta por molécula** (con receta / receta retenida) leída del
      registro → columna `condicion` + flujo receta → farmacia → paciente en el CRM.
- [ ] **D41 · jue 5-nov — 2 cotizaciones escritas y fechadas** (cadena + independiente) por
      presentación/dosis → columna `precioFarmacia`; **recalcular el "medicamento 3 m = S/ 3,600"** del
      value stack (`LIVIANO_OFERTA`).
- [ ] **D43 · lun 9-nov — Dictamen de legalidad del magistral** (QF + abogado de salud: **nombres a
      definir**) + cotización Sterilelabs con certificado de análisis por lote → columna `costoLiviano`,
      KPI COGS y cierre de los 2 pendientes rojos (estado → "VERIFICADO" con fecha).
- [ ] **D44 · mar 10-nov — Tiempo permitido fuera de refrigeración** por producto (ficha técnica) → guion
      de cadena de frío del kit de bienvenida (Anexo A del protocolo).
- [ ] **D38 · lun 2-nov — Rellenar `LIVIANO_PROTOCOLO_CLINICO_v1.md` §2**: criterio numérico de
      elegibilidad (Obesity Algorithm 2026), panel de labs basales y su cadencia, esquema de
      dosis/intervalos/periodo de lavado **solo desde la ficha técnica del producto registrado**, y
      definición operativa de "falla a farmacoterapia" (lista completa con dueño y día en el Anexo C).

### ENCAPS — vigilancia normativa

- [ ] **Vigilar la convocatoria SERUMS 2027-I desde el jue 1-oct** (`SENALES_2027-I.md`, canal 1) — es lo
      que fija la fecha del examen y, con ella, la duración de la fase intensiva. *(ENCAPS — ver 🔵)*
- [ ] **Verificar contra fuente primaria (El Peruano / gob.pe) las 9 señales "A VERIFICAR" del log**
      *(ENCAPS)*: nº de la **RM de jul-2026** sobre prioridades de atención en emergencia y qué dice de
      **P-IV** (+ la tabla oficial P-I inmediato / P-II ≤10′ / P-III ≤30′) · **NTS vigente del esquema de
      vacunación** (196-2022 + modificatoria hexavalente vs "238-2025" que cita Theomed) y de **CRED**
      (238-2025) · **NTS 229-2025** persona adulta (RM 310-2025) · **Dir. Adm. 384-MINSA/DGIESP-2025**
      (RM 726-2025) · **NTS 233-2025** malaria · nº de la **NTS de anemia 2024**.
      > Hasta que se verifiquen, `encapsCobertura.ts` lleva "A VERIFICAR" en II-EMG y **no se banquean
      > cifras de esas normas**.
- [ ] **I-OCC · verificar la base legal vigente** (Ley de Seguridad y Salud en el Trabajo y su reglamento;
      protocolo de exámenes médico-ocupacionales) y las **definiciones normativas de accidente de trabajo
      vs enfermedad profesional** antes de generar preguntas con cifras o plazos. *(ENCAPS)*

### MIR

- [ ] **Poblar el pool de preguntas oficiales** (`MIR_PREGUNTAS_OFICIALES` está vacío y `MIR_POOL_META.estado
      = 'A VERIFICAR'`): scrape **logueado** de ProMIR (sección "preguntas MIR de este capítulo" de los 76
      `capId`, vía Chrome DevTools como el temario del 09-jun) **o** clasificar los cuadernillos gratuitos
      de `examenesmir.com` 2024-2026 con la plantilla oficial → volcar
      `{id 'AAAA-NNN', anio, numero, num, asignatura, capId, imagen, fuente, url}` en
      `src/lib/mirPreguntasOficiales.ts`. Hasta entonces pre-test, eval y cierre usan el test del capítulo
      ProMIR **sin anti-repetición ni trazabilidad**. *(MIR — alto)*
- [ ] **Confirmar si hay acceso a AMIR** (AMIR Test / simulacros). Hoy está "A VERIFICAR" en `mirData.ts`
      y **no se prescribe** en el loop; si lo hay, se puede reintroducir como fuente alternativa. *(MIR)*

---

## 🔵 CUANDO TOQUE (con fecha o disparador)

- [ ] **🎯 DISPARADOR · Convocatoria SERUMS 2027-I → fecha real del examen ENCAPS.** Las dos fechas
      asumidas son **imposibles**: `study_metrics.extra.exam_date = dom 28-mar-2027` es **Domingo de
      Pascua** y el default viejo del script era el 26-mar = **Viernes Santo** (Semana Santa 2027
      verificada por algoritmo: jue 25 · vie 26 · Pascua dom 28). `dias_a_examen` quedó **sin recalcular
      en 205**. Los docs ya planifican con el **escenario CORTO (dom 14-mar-2027)**; los candidatos reales
      son 14-mar, 21-mar u 11-abr → la intensiva dura 5, 6 u 8 semanas.
      **El día que se confirme**: `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-01 <fecha>` →
      revisar → `execute_sql` (MCP, `qacynpqdrorpuegsmtcy`) + actualizar `study_metrics.exam_date` y
      `dias_a_examen` + Google Calendar a mano. **NO aplicar el SQL antes.** *(ENCAPS)*
- [ ] **🎯 DISPARADOR · Resultado del UWSA1 (vie 11-sep).** Si sale **<40 %** → bajar S2-S3 a **20 Q/día**
      (divergencia Palmerton #2). Además, la regla del 5 %/mes implica que un UWSA1 por debajo de
      **~45-48 %** haría matemáticamente inalcanzable el 70 % en enero: **el baseline del 11-sep, no el
      GO/NO-GO del 15-ene, es el verdadero "Goldilocks check"**. *(USMLE)*
- [ ] **Antes del 1-feb-2027 · extender 2 series del Calendar**: `09:00 DEEP PRIME`
      (`cb2uh20jnvu7pgfev4183pgctc`) y `16:15 ENCAPS` (`papebi46etlo8glgfs5akd5mig`) tienen
      `RRULE … UNTIL=20270130`. Cubren el examen (semana 25-29 ene) pero **cortan el 30-ene**: si ENCAPS
      vuelve a bloque principal en feb-mar 2027, hay que extenderlas. ⚠ `recurrenceData` del MCP GCal está
      roto para UPDATE → delete(serie) + create. *(sistema)*
- [ ] **Antes de sembrar la fase intensiva (feb-2027) · la app necesita**: `STUDY_TOTAL_DAYS` dinámico
      (hoy 102 fijo → en febrero la app se clava en el día 102), rama `modo='INTENSIVO'` en `itemsForDay`
      (renderizar `extra.loop` / `sim` / `repaso` / `drill_cifras`, hoy nadie los pinta) y `simDays` con
      los tipos `pretest` / `sim100` / `dress_rehearsal` (si no, esas notas no se pueden guardar).
      ⚠ El segmento **17:15** del loop heredado **choca con LIVIANO** → fijar las franjas en la
      reestructuración de febrero **antes** de sembrar. *(ENCAPS — asignar a un agente)*
- [ ] **Al usar `--sim100 2025-2 / 2025-1A / 2024-2A` en la intensiva**: **122 ítems** de esos exámenes ya
      viven en los sets del banco del día. Rendirlos **antes** de consumir esos sets, o aceptar el solape.
      *(ENCAPS)*
- [ ] **Antes del d19 (lun 2-nov) · importar `DATA/DERMATOLOGIA/ANKI_COLA/PLANTILLA_SESION.txt`** en Anki
      (Archivo → Importar, notetype Basic); a partir de ahí copiar la plantilla por sesión
      (`SESION_dNN_<fecha>.txt`). *(Derma)*
- [ ] **Antes del d45 (vie 15-ene-2027) · decidir y comprar el dermatoscopio de bolsillo** (DermLite o
      Heine; modelo y precio A VERIFICAR en sus webs oficiales) para la fase práctica 2027. *(Derma)*
- [ ] **Cotejar las cifras "A VERIFICAR" de las 35 fichas del cerebro clínico** contra el capítulo de
      AccessDerma citado en cada una antes de recitarlas como definitivas: dosis de apraclonidina, % de
      TCA, mm de microneedling, λ por tinta, márgenes de Mohs y de melanoma. *(Derma)*
- [ ] **Post-D88 (jue 14-ene-2027, el capstone) · revisión por par del protocolo LIVIANO** por un médico con
      experiencia en obesidad, **antes de usarlo con pacientes reales**. *(LIVIANO)*
- [ ] **Antes de febrero (arranque de CURVA) · cerrar las fuentes**: abrir el PDF ya descargado de
      menopause.org (`nams-2022-hormone-therapy-position-statement.pdf`) y **confirmar que es la versión
      2022** (el extracto automático dudó entre 2017 y 2022); leer **NICE NG23** (el sitio devolvió 403); y
      rellenar las 4 cifras "A VERIFICAR" de la tabla: cáncer de mama E+P por 10.000 mujeres-año, TEV oral
      vs transdérmica, prevalencia de hipogonadismo en obesidad, umbral de hematocrito. *(Business/CURVA)*
- [ ] **Antes de febrero (arranque de DENSA) · cerrar las fuentes**: leer el PDF de la **guía S3 EDF 2018**
      (DOI `10.1111/jdv.14624` verificado; Wiley/PubMed bloquearon el fetch) y el **consenso AEDV 2024**;
      rellenar las cifras "A VERIFICAR" (finasterida/dutasterida, ferritina objetivo, **registro DIGEMID y
      precios de minoxidil oral / finasterida / dutasterida en Perú** — misma regla que
      `LIVIANO_ACCESO_PERU`); la URL de la página masculina de la AAD devolvió 404 → localizar la vigente.
      *(Business/DENSA)*
- [ ] **VITALS · las 3 tareas del puente con la Academia** (código en producción, requieren un chat propio
      de VITALS): `SPLIT_GLP1` para paciente, check-in semanal de EA GLP-1 con migración `0002`, y
      composición corporal en el reporte de lunes. *(VITALS — ver las 3 decisiones asociadas en ⚪)*
- [ ] **Feb-mar 2027 · DIGA (`derminterest.org`)** no respondió a la verificación automática: comprobar a
      mano las páginas de mentoría y del comité IMG cuando toque. *(Research)*
- [ ] **Fellowship estético · escribir `DATA/DERMATOLOGIA/RUTA_FELLOWSHIP_ESTETICO.md`** — la etapa que
      define el "dermatólogo estético Mayo ~2034" no tiene documento: qué fellowship (ASDS Cosmetic
      Dermatologic Surgery vs ACGME Micrographic Surgery & Dermatologic Oncology vs procedural de Mayo),
      requisitos, ventanas de aplicación, cronograma inverso 2034→2027 y plan B (MIR → IMCAS / Cotofana /
      MD Codes + observership). El cuaderno NotebookLM "DERMA · Élite Engine" ya tiene cargadas las fuentes
      ASDS/ACGME/Mayo/ABD desde el 05-sep. *(Derma)*
- [ ] **Cerrar las marcas "A VERIFICAR" de los extractos Palmerton** (opcional, mejora la atribución)
      *(USMLE)*:
      - **32 marcas de planificación/mindset**: basta 1 consulta a NotebookLM restringida por `source_ids`
        a los 4 vídeos de eficiencia ("Too Busy", "Busy Dentist", "Every Hour", "Feels Like Cheating") y
        otra a "Stuck Below 220" + "How to Stop Med School Procrastination", **pidiendo citas**.
      - **Consultas estancadas** (el MCP devolvió `answer` vacío 3 veces, `conversation_id 6ca8c62f`):
        Melody fails #1-#5, protocolo literal de "How to Study So Fast…" y ejemplos de "How to Make Hard
        USMLE Questions Easy" → reintentar con un `notebook_query` nuevo o ver los vídeos en YouTube.
      - **Menor**: confirmar si el vídeo "Fixing USMLE Test-Day Mistakes: The STRESS Strategy" desglosa
        STRESS como acrónimo (el cuaderno dice que no).
      - **12 puntos de `PALMERTON_POR_MATERIA`**: gradiente A-a · apnea del sueño ("peso antes que
        polisomnografía") · surfactante/SDR neonatal (**apunta a un fichero que NO está en el inventario de
        295 fuentes: probable confabulación — no citarlo como Palmerton**) · haptoglobina/hemoglobinuria ·
        ADAMTS13 y plasmaféresis en PTT · sideroblástica y B6 · A1c 6,5 % (la transcripción dice "615") ·
        cifras de la viñeta de CAD · bloque OB-GYN · criterios DSM-5 de TAG · hiperamonemia MCAD,
        escorbuto, isoniazida-B6. **B1, niacina y B6-isoniazida están DECLARADAS AUSENTES: trátalas como
        no presentes.**
      - **Cifras sin cita en el cuaderno** (heurística, no doctrina Palmerton): Free 120 65 %→95 % /
        70 %→99 %, "30-50 % más *unforced errors* en los bloques 1-2", llegada 30-45 min antes, 200-300
        repasos/día en el cierre, "no hablar con otros examinados", *warm-up* de 5-10 preguntas.
- [ ] **Descargar en crudo 4 fuentes del cuaderno no explotadas** si quieres blindar valvulopatías, shock,
      endocarditis, miocardiopatías o micro incidental (hoy descansan en una síntesis sobre síntesis):
      *High Yield Surgery Review*, *High Yield Family Medicine Review Part 2*, *The ONLY Video You Need to
      Pass Step 1 in 2026*, *Anki Was Hurting This Med Student's Score*. *(USMLE)*

---

## ⚪ DECISIONES QUE ESPERAN TU RESPUESTA

Ningún agente podía tomarlas. Están escritas en `DATA/USMLE/PALMERTON_DIVERGENCIAS_PLAN.md` §E y en los
docs de cada sección; el plan corre hoy con la opción por defecto que se indica.

### USMLE · las 8 divergencias Palmerton (§E) + 2 heredadas

| # | Decisión | Hoy corre así |
|---|---|---|
| 1 | **Consolidación 11:00 a 20Q permanentes** si en S2-S3 la revisión completa no cabe en 60 min (Palmerton: 10Q + revisión = 60 min) | 30Q (10 pre-test + 20 consolidación) en nivel 1; 40Q desde nivel 2 |
| 2 | **Viernes de nivel 4** (20-30Q mixtos de sistemas dominados) desde **S11 / D52 = vie 20-nov** (v5.8) | No activado (requiere flag en `gen_usmle_v5.js` + regenerar) |
| 3 | **Reformular el GO/NO-GO para que el UWSA2 sea solo informativo** (Palmerton: el UWSA sobreestima; la fecha la decide el NBME) | "2 NBME ≥68 % + UWSA2 low risk" |
| 4 | **Free 120 + maratón de resistencia**: la única ventana sin tocar franjas es **D92, mié 20-ene** (NBME 33 + 3 bloques de *flagged* ≈5 h) **cediendo Research/Derma/AURUM ese día** | Solo el Free 120 en D94 (vie 22-ene) |
| 5 | **Protocolo D-2 / D-1** (lun 25 y mar 26-ene: Anki maduro + flagged / solo Anki vencido). ⚠ v5.8: el **lun 25-ene ya ES el D95 del plan** (repaso rapid review + Anki), así que solo el mar 26-ene queda fuera | Sin escribir |
| 6 | **Mover la eval timed 18:00-18:45 a 12:00-12:45** — Palmerton: "estudiar cansado = 2-4× más lento"; su tesis de que la analítica nocturna rinde peor **choca frontalmente con la franja actual** (divergencia #26). Cambia una franja del Calendar | 18:00-18:45 |
| 7 | **Escribir el protocolo de burnout** (2 hitos seguidos bajo el mínimo + síntomas → 3-5 días solo Anki AM) | Sin escribir |
| 8 | **Si el UWSA1 (vie 11-sep) sale <40 % → bajar S2-S3 a 20Q/día** (tipo Jay) | Sin regla activa |
| 9 | Preguntas **experimentales / de mecanismo** sin bloque específico en el plan | Sin asignar |
| 10 | Choque entre **"no zero days"** y el corrimiento determinista **+1 día hábil** por día no estudiado | Corrimiento |

- [ ] **Régimen · ¿se acepta seguir con 5 días L-V o se recupera algo?** El plan bajó de **~606 h (97 d) a
      ~594 h (95 d)** y el colchón consumido desde el 31-ago ya son **8 días hábiles**. Escrito en README §4
      y en CALENDARIO "Reglas de reprogramación" punto 4. *(USMLE)*
- [ ] **Puente MIR ↔ Step 1** — Cardiología MIR (D5, mié 16-sep) ahora precede a Cardiovascular Step 1 (D6,
      jue 17-sep) por **1 solo día**: el "prime en español 7 días antes" no se cumple en ese bloque; Psiquiatría
      arranca **el mismo día** (mar 22-dic) que *Psychiatry & Behavioral*. Los otros 9 bloques quedan entre +6 y
      +12 días. **Recomendación escrita: NO re-permutar el MIR** (movería 11 bloques y hasta el 29-ene el
      objetivo primario es el Step 1). *(USMLE/MIR)*
- [ ] **Materias sin columna vertebral en el corpus Palmerton — decidir la fuente sustituta** *(USMLE)*:
      - **13 días completos**: Micro/ID (D57-D64, 27-nov→8-dic), MSK/Reuma+Derma (D70-D73, 16→21-dic) y
        Psiquiatría (D74-D76, 21-23 dic). No hay ningún vídeo ni artículo dedicado en las 295 fuentes.
        Propuesta del análisis: **subir el peso del pre-test 10Q de las 08:15 como FUENTE** (no solo
        diagnóstico) y de la *shopping list*, y no perder tiempo buscando "el vídeo de Palmerton".
      - **Cardio D8 (lun 21-sep) y D15 (mié 30-sep)**: bucles presión-volumen, Frank-Starling con curvas de retorno
        venoso, fórmula de Laplace, maniobras de soplos, desdoblamiento de S2 y criterios de Jones están
        **CONFIRMADOS AUSENTES**. ¿Costanzo, B&B o First Aid? Decidir **antes de esa mañana**.
      - **Bioestadística (D77, lun 28-dic)**: el corpus cubre la mitad conceptual pero **no la de cálculo**
        (sensibilidad, especificidad, VPP/VPN, ROC, likelihood ratios, NNT/ARR/RRR, IC, lead-time/
        length-time, pruebas estadísticas). El propio Palmerton remite al paquete de stats de UWorld → el
        único día disponible debe repartirse vídeo+AMBOSS / paquete UWorld.
      > Las tres van anotadas en `PALMERTON_DIVERGENCIAS_PLAN.md`.

### Resto de secciones

- [ ] **MIR · modo "reducido" de enero** — el mantenimiento del **4 al 25-ene** está fijado por defecto en
      `gen_mir_mantenimiento.js` (`REDUCIDO_HASTA = 2027-01-25`, 16 días) como **solo Anki + 10Q**. Si prefieres el
      bloque completo también en enero, hay que regenerar con esa constante cambiada. *(MIR)*
- [ ] **Supabase · qué se hace con los backups viejos** — `study_schedule_bk_0906b` (el anterior al
      corrimiento) sigue existiendo, y en total hay **~43 tablas `study_schedule_bk_*`** expuestas a la anon
      key. ¿Se conservan, se borran o se protegen? *(sistema)*
- [ ] **CURVA · decidir el eje de la línea.** `empresaData.ts` dice **"Estética & figura / estética corporal
      médica"**; `estudioPulsoData`, `brandContentPlan` y el análisis Palmerton la tratan como **hormonal**
      (perimenopausia, TRH, testosterona, hipogonadismo). El esqueleto escrito sigue el eje **hormonal**:
      **si Curva es estética corporal hay que rehacerlo**. *(Business — bloqueante para febrero)*
- [ ] **VITALS · 3 decisiones del puente con la Academia**: (a) día del **check-in semanal de EA GLP-1**
      (fijo vs día de inyección); (b) **base de cálculo de la proteína** en `bajo_glp1` (peso actual /
      ajustado / objetivo; piso **1,2 vs 1,6 g/kg** — la Academia enseña 1,2-1,6 y el motor aplica 1,6);
      (c) si la **foto mensual** se guarda en la app. *(VITALS/LIVIANO)*
- [ ] **Research · ¿nov-2026 o feb-2027 para el SUBMIT de la tesis L0?** `RUTA_PUBLICACION_2027.md` §3.1
      dice "research letter, envío feb-2027"; el plan generado fija **T-8 = jue 19-nov-2026**. Decidir cuál
      prevalece; si es feb-2027, es 1 línea en C1/TAIL1 del script + regenerar. *(Research)*
- [ ] **AURUM · política de semanas: los drills LIVIANO y los PITCH ya no caen en viernes.** La "semana" del
      plan (5 hábiles consecutivos) no se alinea con el viernes: en v5.8 las **16 variantes LIVIANO caen en
      MIÉRCOLES (d40 · d45 · d50 · d55 · d60 · d65 · d70 · d75, del 4-nov al 23-dic) y en LUNES (d80 · d85 ·
      d90 · d95 · d100 · d105 · d110 · d115, del 4-ene al 22-feb)**; los **PITCH 1-4 en miércoles (d15 30-sep ·
      d35 28-oct · d55 25-nov · d75 23-dic) y los PITCH 5-7 en lunes (d95 25-ene · d115 22-feb · d130 15-mar)**. Se respeta el invariante "1 de cada 5 drills". Si quieres viernes estrictos, hay que
      cambiar la política en `gen_aurum_plan.js`. *(AURUM)*
- [ ] **Business · los 2 últimos OUTPUT caen jue 7-ene (S16, documento de cierre) y vie 8-ene-2027 (retro del
      formato L)** porque las lecturas se agotan antes; en v5.8 el extra sí cae en viernes y solo S16 queda en jueves
      (16 de los 17 OUTPUT son viernes). Si quieres que **todos** los outputs sean viernes,
      hay que añadir 2 lecturas META en `plan_pulso_v3_L.json`. *(Business)*
- [ ] **LIVIANO · posición de los drills de cifras.** En v5.8 quedaron en **D36 (jue 29-oct) · D58 (lun 30-nov) ·
      D76 (jue 24-dic) · D87 (mié 13-ene)**; el análisis pedía D38/D58/D75 (pero D38 es la Síntesis M2 y D75 es
      "cuándo derivar"). Si prefieres D38 exacto, mover
      `drill: true` en `liviano_curriculum.json` y regenerar. *(LIVIANO — menor)*
- [ ] **ENCAPS · ¿se aplica el override semanal** que propone `gen_encaps_semana.js`? No es automático:
      hay que revisar el SQL y ejecutarlo por `execute_sql`. Diseño: en las semanas con 4 slots CRÍTICA un
      tema caliente **solo desplaza a un crítico ya dominado** (≥85 %, n≥5). *(ENCAPS — decisión semanal)*
- [ ] **Calendar · 6 decisiones personales** (ninguna tocada, no se cambian horas sin tu OK) *(sistema)*:
      (a) **reponer o no el NAP 13:15-13:30** (hoy es hueco libre entre LECTURA y RESEARCH/DERMA);
      (b) corregir el typo del título **"ALUMUERZO"** (es campo `summary`);
      (c) limpiar los **`<br>` escapados** en las descripciones de SYNAPSE 12:30 y PC sáb/dom;
      (d) añadir o no una **frase de identidad de examen** a las 5 DECLARACIONES EKER durante las 20
      semanas del Step 1 (hoy son 100 % identidad de negocio);
      (e) **martes**: ALISTARSE 18:30 recorta 15′ a la Eval USMLE 18:00-18:45 → ¿cerrar la eval a las 18:30
      o mover ALISTARSE?;
      (f) el texto CS50P/synapse-journal del PC del sábado contradice el vibecoding de las 04:15.
- [ ] **Renombrar `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` → `_V5_8.md`?** El contenido ya va por v5.8, el
      nombre no. Si se renombra hay que actualizar **en el mismo movimiento** las 8 descripciones del
      Calendar que lo citan por ruta, `CALENDAR_SEGMENTOS_LUNES_VIERNES.md` y la memoria. *(sistema)*
- [ ] **Confirmar que es intencional**: los hitos **NBME 32 (lun 18-ene)**, **NBME 33 (mié 20-ene)** y
      **Free 120 (vie 22-ene)** no caen todos en viernes, pese a que §0 del doc sigue diciendo "los hitos
      van en viernes". No es una regresión del corrimiento (la v5.6 tenía las mismas fechas). *(USMLE/sistema)*

---

## Mejoras pendientes de decidir (segunda capa)

Vacíos de **impacto alto** detectados en `gaps_v3b_*.json` que **siguen abiertos** — no están
implementados y no hay agente asignado. Una línea cada uno; el detalle y la propuesta completa están en su
JSON.

**USMLE / SYNAPSE**
- [ ] **No hay freno duro entre el bloque 04:15 y el Anki AM 05:00** (la recomendación #1 de Palmerton):
      ni regla de corte, ni timer, ni KPI que detecte que el Anki empezó tarde → regla "04:55
      commit-or-stash obligatorio" + KPI "hora de la 1ª review del día". `gaps_v3b_synapse` #4.
- [ ] **Semanas 13-20 (dic → 25-ene) sin misión** en 04:15, 12:30 y PC sáb/dom: SYNAPSE termina el
      **lun 30-nov** y el vibecoding el **mié 2-dic** (último SHIP: sáb 5-dic), pero el Step 1 sigue 8 semanas más — justo la fase más dura →
      generar S13-S20 como *taper* explícito con flag deload. `gaps_v3b_synapse` #5.
- [ ] **Todo el progreso vive en un solo `localStorage`** (`jmd-study-progress-v1`, los ✓ de 10 planes) sin
      exportar/importar ni espejo en Supabase: un cambio de navegador borra la evidencia de 20 semanas y
      deja ciega la revisión semanal. `gaps_v3b_synapse` #9.
- [ ] **Re-secuenciar el catálogo vibecoding** antes de que `gen_vibecoding_plan.js` lo congele: los
      sensores del bloque principal (usmle-scores, anki-telemetría, puente VITALS) llegan en S3/S2/S7
      cuando la ventana de mayor fragilidad es ahora. `gaps_v3b_synapse` #1.

**ENCAPS**
- [ ] **Stock de preguntas por código/sub-eje** frente a una demanda de **~1.905Q en los 99 días del ciclo v5.8**
      (80 bancos × 16-20Q + 80 secundarios × 4-5Q + 19 mini-sims × 5-6Q de cola larga; hoy el pool tiene 434 ítems,
      332 disponibles tras la semana 1): etiquetar los ítems reales con clave (2024-2A / 2025-1A / 2025-2) con
      `codigo` v3 + `sub_eje` + `formato_pretest` y pre-generar los sets por lotes fuera de la hora.
      `gaps_v3b_encaps` #1 · detalle por código en `BANCO_PROPIO/README.md` §4.
- [ ] **El % ciego (la métrica que manda) es 100 % manual** y depende de que abras Claude cada día a las
      17:10: `study_progress` = 0 filas → formulario de cierre en `EncapsPlanView` + `setStudyProgress()`
      que escriba en Supabase. `gaps_v3b_encaps` #3.

**Derma**
- [ ] **No hay taper de examen en Derma** — lo contrario de lo que Palmerton exige en la última semana:
      d45/d46 (**15/19-ene** en v5.8) chocan con el NBME 31 y el GO/NO-GO, y **d47-d52 (21-ene → 4-feb) traen
      contenido NUEVO de estética en plena semana del Step 1** (d49 = mié 27-ene es el día objetivo del examen) → swap de
      contenido a "modo taper" sin mover fechas. `gaps_v3b_derma` #2.

**MIR**
- [ ] **El gate de Palmerton no existe en el loop MIR y el 50 % de las preguntas del día no se registra**:
      las 8-10Q comentadas (15:53-16:05) no tienen `kind` en `mirEvalLog` → un tema puede salir con 3/10 y
      solo reaparece por azar del calendario. Propuesta: `kind:'quiz'` + validación ≥80 % acumulado +
      anclas dinámicas para los temas no validados. `gaps_v3b_mir` #1.
- [ ] **MIR es el plan más dependiente de Anki (3 años) y el que menos verificación tiene**: preset FSRS
      "A VERIFICAR", solo existe `APEX::MIR::cardiologia`, la app no habla AnkiConnect y el redeploy de n8n
      no está probado → test de humo semanal `findNotes 'deck:APEX::MIR* added:7'` vs la cuota de 20/semana.
      `gaps_v3b_mir` #11.

**Research**
- [ ] **La ética de la tesis L0 no tiene fecha de SOLICITUD ni gate de envío**: T-1 solo "verifica y
      archiva" y T-8 no está condicionado → riesgo de *desk-reject*. Propuesta: adelantar T-1, añadir
      "solicitud CEI expedita presentada ≤30-sep" y un chip-gate en T-7/T-8. `gaps_v3b_research` #1.
- [ ] **Case report: 6 semanas muertas entre M1 (16-sep) y CR-1 (30-oct)**, con el consentimiento (CR-2,
      5-nov) **después** de la fecha límite del 31-oct y sin átomo para el disparador del plan B →
      adelantar CR-1 y CR-2. `gaps_v3b_research` #2.
- [ ] **SR-1 puede ser redundante y el plan lo comprueba 3 meses tarde**: R9 ("¿existe ya una SR del mismo
      PICO?") está el 15-dic, *después* de fijar PICO, criterios y protocolo — y una búsqueda encontró **16
      SR/MA que solapan** (PMID 41249530, 37178872, 39214904, 36574028, 40406769) → mover R9 antes de R6 y
      escribir el ángulo diferencial (o pivotar a *scoping review*, o adelantar SR-2). `gaps_v3b_research` #3.
- [ ] **`remap_inicio.js` rompe Research en cada slip** (el bloque 4 re-fecha sin conocer la pausa de
      enero) → sustituirlo por `execSync('node gen_research_plan.js ' + START)`, igual que ya hace con
      `liviano_reslot_viernes.js`. `gaps_v3b_research` #5. *(mitigado hoy por el paso manual del pipeline)*

**LIVIANO / Business**
- [ ] **La Academia salta la EVALUACIÓN CLÍNICA del paciente con obesidad** — sección 1 del Obesity
      Algorithm y bloque mayor del blueprint ABOM: 0 días sobre anamnesis/antropometría/labs basales,
      screening de comorbilidades (SAOS, MASLD, SOP, DM2, HTA), causas secundarias y fármacos obesogénicos,
      embarazo/anticoncepción con GLP-1, TCA/depresión y poblaciones especiales. La oferta vende
      "Evaluación Integral" que el médico nunca estudia. `gaps_v3b_business` #3.
- [ ] **LIVIANO no mide retención**: 19 filas del plan dicen "Repaso Anki" y el único registro es un ✓
      binario en localStorage → falta el mapeo del deck en `ankiLinks.ts`, el pre-test ciego de 5Q semanal
      y que el ✓ pase a **score real** (% ciego + rúbrica) persistido. `gaps_v3b_business` #1.

---

### Notas y reglas operativas que conviene no perder

- **Anki de sáb/dom**: la duración del hueco (sáb 19:00 30′ · dom 17:00 15′) pasa a ser **"due × 20 s"**.
  Si un fin de semana necesita >60′, amplía el evento a mano ese día.
- **Formato de los chats tutores (APEX)**: una línea de continuación de un campo **no debe empezar con
  MAYÚSCULAS seguidas de `:`** (p. ej. `NTS:` o `DDX:`) — el parser la toma como label nuevo. Escribe
  `Nts:` / `Diferencial:`. Difundir a los prompts generadores de APEX.
- **AURUM ↔ LIVIANO**: el bloque `liviano.paciente` del currículo depende de los **casos 15 y 16** de
  `DATA/BUSINESS/liviano_curriculum.json`. Si esos casos cambian, re-sincronizar y regenerar con
  `gen_aurum_plan.js`.
- **NotebookLM es motor de verificación, no fuente**: toda dosis o cifra que devuelva queda "A VERIFICAR"
  hasta cotejarla contra la primaria. Ya se detectaron **4 errores suyos** en el corpus Palmerton y **1
  probable fichero inventado** (`sistema-respiratorio-yousmle.md`).
