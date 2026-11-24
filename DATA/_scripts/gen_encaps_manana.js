/**
 * gen_encaps_manana.js — v6.07 (dom 8-nov-2026): MAÑANAS ENCAPS de F1 (lun · mié · vie 07:15-12:00) + su hora de las 18:00 + los 15′ de
 * repasos ENCAPS del Anki 05:00 + la clase EN VIVO de Theomed del sábado (14:45 preparar · 15:00-17:00 en vivo) + el ENCAPS opcional del
 * domingo (4 h, flexible, sin hora fija) → src/lib/encapsManana.ts, en el formato común «qué · cuánto · cómo» (GuiaBloque, src/lib/guia.ts).
 *
 *   node DATA/_scripts/gen_encaps_manana.js            → escribe src/lib/encapsManana.ts
 *   node DATA/_scripts/gen_encaps_manana.js --check    → regenera en memoria y compara con el fichero (exit 1 si difiere o si algo no cuadra)
 *   node DATA/_scripts/gen_encaps_manana.js --informe 2026-11-16   → además imprime las guías de ese día
 *
 * Fuente de contenido (NO se inventa nada aquí): DATA/ENCAPS/_encaps_manana_v607.json (protocolo de la mañana, modos de estudio, 22 mañanas
 * con su teoría, banqueo, norma y notas; sábados con la clase en vivo; domingos con el simulacro) · duración EXACTA de cada sesión asíncrona
 * de Theomed: DATA/ENCAPS/INVESTIGACION_2027-1/THEOMED_Y_DRIVE.md §1.3 (tabla «Sesiones asíncronas») · plan: DATA/ENCAPS/PLAN_PRIMER_PUESTO_2027-I.md
 * §3-§7 · fechas: DATA/_scripts/_fechas_v6.json (F1, días de Step del tramo 1, SKIP, transición).
 *
 * Reglas del generador (las mismas que el plan, escritas aquí para que el cálculo sea reproducible):
 *  · La mañana sigue las 7 franjas del protocolo (07:15 arranque · 07:30 teoría · 09:15 post-test · 09:30 pausa · 09:45 banqueo · 10:45
 *    corrección · 11:40 tarjetas). El mié 30-dic (cierre) = simulacro 100Q / 2 h + corrección en las mismas horas.
 *  · «Cuánto» de la teoría: vídeo = duración ÷ 1,75 (÷ 2 si la mañana dice «2×») · texto primero = duración ÷ 3 (el plan: «el texto se lee
 *    3-4 veces más rápido que el vídeo») + 1′ por página de PDF si la trae · banqueo grabado ACTIVO = su duración · bloques de normas u hoja de
 *    reglas = su duración (ya es tiempo de trabajo) · clase en vivo en diferido = ELÁSTICA (solo tramos útiles, entre 20′ y la mitad de la
 *    clase; el resto en audio en tiempos muertos, como dice el plan).
 *  · La franja de teoría tiene 105′. Lo que no cabe ENTERO (sesión a sesión, en orden) NO se quita: pasa a las 18:00 del MISMO día (bloque
 *    «ENCAPS · cifras, normas y flashcards»), con su post-test. Si sobra tiempo (≥ 5′), va a «Theoesencial + norma del tema» (lectura activa);
 *    si sobran < 5′, se suma a la última sesión (es redondeo).
 *  · Banqueo: n × 72 s. Si es cronometrado y no cabe en 60′ (28-dic: 60Q = 72′), la franja del banqueo crece y la corrección se acorta (≥ 30′).
 *  · Arranque 07:15 (fix lote 1b del Calendar): las 10 tarjetas y las reglas son de la mañana ENCAPS anterior: «de ayer» solo si fue el día
 *    anterior · «del viernes» / «del lunes» / «del miércoles» si es la anterior de la rotación · «del último día ENCAPS, mié 23-dic» si un SKIP
 *    se comió una mañana ENCAPS (lun 28-dic). Las ★ de las cifras de las 18:00 van al PRIMER Anki 05:30 siguiente («mañana» · «el lunes»).
 *  · Enlaces SOLO al campus de Theomed (cursos 99, 105 y 116 del JSON). El material de academias del Drive se nombra por su ruta, sin enlace
 *    (el repo es público: no se copia nada al repo ni a public/).
 * Controles (aborta y no escribe): las mañanas del JSON = los días de F1 L-V sin Step (step1.f1_dias_semana) y sin SKIP · sábados = los de
 * F1 + transición · domingos = los de F1 + transición · duración de cada grupo de sesiones del JSON = Σ de la tabla de Theomed (± 3′) ·
 * validarGuia en todas las guías · cada mañana cubre 07:15-12:00 sin huecos ni solapes · lo pendiente cabe en las 18:00 · ninguna URL fuera
 * del campus de Theomed.
 * v6.08 (fix revisión 14-nov): (dia1) la cadena de ★ de ENCAPS::Cifras salta los días en que la guía USMLE del Anki pasa de las 05:30 (el Home
 * oculta ahí el 05:30 de ENCAPS; se lee de src/lib/usmleGuia.ts → correr DESPUÉS de gen_usmle_guia.js) y, sin Anki 05:30 de F1 después, va al
 * Anki 05:00 de la intensiva · (dia9) el arranque del lunes nombra los banqueos grabados del domingo si ese domingo no hubo simulacro ·
 * (dia10) revisión normativa N°2 (ITS) en la mañana 18 · (est6) los sábados de F2 (9-ene → 6-mar) con la clase EN VIVO de Theomed (JSON sabados).
 * v6.09 (16-nov-2026, «hoy no avancé, todo empieza mañana; el sábado 21 y el domingo 22 viajo»): D1 = mar 17-nov y el jue 31-dic deja de ser SKIP.
 *   Las mañanas corren UNA ranura (n1 mié 18-nov … n16 mié 23-dic, n17 DOM 27-DIC, n18 lun 28, n19 mié 30, n20 jue 31, n21 mar 5-ene); el JSON separa en
 *   `extra` el contenido de la mañana (viaja con la n) y las notas atadas a la fecha (clases en vivo de esa noche → la mañana que las recoge). Código:
 *   (1) un día extra puede ser un L-V HÁBIL de la transición (jue 31-dic, ya no SKIP) y todo hábil de la transición tiene que serlo; (2) DOMINGOS DE PLAN
 *   (_meta.domingos_plan: dom 27-dic) → M[fecha].domingoPlan, sus 18:00 flexibles (ejemplo 20:00-20:45: a las 17:00 está el baile) y el arranque sin
 *   «las del simulacro del domingo»; (3) fines de semana SIN SESIÓN (corrida_s1.sin_sesion: sáb 21 y dom 22-nov) siguen en el JSON (sábado con
 *   `sin_sesion` + `diferido`; domingo modo 'sin_sesion') sin guías ni índice; la revisión del sábado salta un sábado sin sesión («sáb 28-nov 14:00»);
 *   (4) el Anki 05:30 también el jue 31-dic, y hasta la 1.ª mañana ENCAPS incluida (mar 17 y mié 18) SIN repasos: aún no hay tarjetas (los 15′ se dicen).
 * v6.09 (fix revisión adversarial 16-nov): (joseph 1) antes del D2 del Step 1 (usmleStep1Daily.diaPorD(2); jue 19-nov) el mazo USMLE está vacío → los 10′
 *   del Anki 05:30 son libres (antes «10′ más de vencidas USMLE»); la 1.ª mañana no cita reglas ★ del arranque y su 18:00 dice «(aún no hay vencidas)» ·
 *   (joseph 3) DOMINGO DE PLAN con hora propia (_meta.domingos_plan: manana · tarde · compromiso; dom 27-dic 06:00-10:45 + cifras 10:45-11:30 a hora fija):
 *   las 7 franjas y las horas del protocolo de sus textos se desplazan en bloque (desfManana) y la mañana siguiente cita la hora real de sus tarjetas
 *   («las de las 10:25 del dom 27-dic»; fix 2: 10:10) · (joseph 4) RECUPERACIÓN FIJA de un domingo (domingos[].recupera; dom 29-nov 06:30-08:00 → fix 2: 07:15-08:45; grabación de la ET 2/3 +
 *   los PPT en diferido que las notas mandan a ese domingo) → encapsRecuperaDe / guiaEncapsRecuperaDe (bloque encaps-rec de plantillasV6); el ENCAPS
 *   opcional de ese domingo, de ejemplo en franja_ejemplo (08:15-12:15, antes del compromiso de las 12:30).
 * v6.09 (fix 2, lun 16-nov noche · la rutina de la mañana 05:45-07:15 —caminata, ducha y desayuno— NO se toca ningún día): (a) el DOMINGO DE PLAN va en
 *   TRAMOS (_meta.domingos_plan[].manana = [[ini, fin], …], Σ = 285′; dom 27-dic: 04:15-05:45 + 07:15-10:30, cifras 10:30-11:15): las 7 franjas del protocolo
 *   se reparten por los tramos (protocoloAReal) y la franja que cae en el corte se parte en dos guías («1.ª parte» / «2.ª parte», pasos partidos por minutos;
 *   solo puede caer dentro de la TEORÍA o en el borde de una franja); ningún tramo puede pisar 05:45-07:15 · M[fecha].domingoPlanHoras.manana = los tramos y
 *   .que = qué lleva cada uno (un bloque del Home por tramo: encaps-am + encaps-am2; guiaEncapsMananaEnRango) · (b) la RECUPERACIÓN FIJA del dom 29-nov pasa a
 *   07:15-08:45 (antes 06:30-08:00, encima de la ducha y el desayuno) y el simulacro opcional de ese domingo, de ejemplo 08:45-12:15: un franja_ejemplo de
 *   3 h 30-4 h recorta solo la corrección (80′ → 50′; lo que no se corrija, a la revisión del sábado) y el bloque dice su duración real.
 * v6.09 (mar 17-nov · orden de Joseph: «el 22 a partir de las 2 de la tarde se puede hacer»): DOMINGO DE LLEGADA = un domingo SIN SESIÓN (sigue en
 *   corrida_s1.sin_sesion: los planes secundarios no tienen nada) con `llegada` (hora) + `recupera` → la RECUPERACIÓN FIJA del viaje va ese día, después de
 *   la llegada (dom 22-nov 15:00-16:30; hasta ahora dom 29 07:15-08:45) y nunca después de las 17:00. Solo lleva los PPT de clases ANTERIORES a ese domingo
 *   (el de SP 2/11, clase del lun 23, va el dom 29 como PRIMER PASO de su ENCAPS del domingo: domingos[].ppt = { min, clases, motivo }; no opcional; sus
 *   minutos salen de la corrección del simulacro, 80′ → 75′). La grabación de la recuperación respeta la regla elástica (20′ → mitad de la clase) y, con
 *   los PPT, llena la franja exacta (Σ pasos = franja: validarGuia). ENCAPS_MINIMO de encaps-rec dice los minutos reales de sus PPT.
 * v6.09b (mar 17-nov · auditoría tiempo ↔ material; Joseph: «no puede haber poco tiempo con mucho material ni mucho tiempo con poco material»): cada paso
 *   con minutos lleva material medido que cabe (ratio 0,85-1,15 con las reglas de la auditoría). Reglas en _meta.reglas_tiempo del JSON (ver «unidades de
 *   teoría»): vídeo y banqueo grabado ×1,2 (pausas) · banqueo grabado a 1,25× · clase en diferido = 60 % a 2× fijo (si no llega, `min` + el resto EN AUDIO,
 *   explícito) · PPT 10′ (9′ en la recuperación del dom 22 para que sume 90′) · Theoesencial = páginas × 1′ (ítems «theoesencial»; control: las páginas de
 *   las sesiones en vídeo = mañanas + _meta.theoesencial.fuera_f1 con fecha en F2) · PDF 2′/p · corrección = 0,85′/Q (ya no se acorta: si no cabe, ABORTA;
 *   mar 5-ene 60Q → 50Q y sus 10Q, el lun 28-dic 18:00: tarde_extra) · lo que sobra (≥ 5′) = la norma del día · el texto dice los minutos finales.
 *   Anki 05:00 (contrato con el lote USMLE): repasos ENCAPS 05:20-05:45 (25′) lun · mié · vie y jue 31-dic, 05:30-05:45 (15′) mar · jue. Domingos: los
 *   primeros pasos NO opcionales (PPT; banqueo previo del dom 3-ene, el 9/19 que no cabía el jue 31-dic) alargan el bloque y la corrección del simulacro
 *   dice cuántas preguntas corrige; dom 22 (llegada) con plan B con fecha (CI 2/8 ↔ ET 2/3 a las 18:00 del vie 27-nov) y sin Anki.
 * v6.09b lote 1-bis (mar 17-nov · revisión del lote 1, hallazgos 2, 3, 6 y 9 · «nada se quita»): (2) LAS 18:00 YA NO PIERDEN PASOS EN SILENCIO: el lun 30-nov
 *   recupera la CI S8 por la mañana (CI S6 a 2×; el Theoesencial de CI, 30 p, al dom 6-dic) y el vie 4-dic manda la SP S4 al dom 6-dic → sus 18:00 vuelven
 *   enteras; las 10Q del mar 5-ene vuelven al propio 5-ene (al final de su teoría, 07:30-09:15: la hoja de reglas pasa a 1 h 24) y el lun 28-dic 18:00
 *   vuelve entero. Donde la tarde sigue sin caber (25 y 27-nov, 7 y 31-dic: pendiente de la mañana), cada paso que no entra lleva DESTINO CON FECHA
 *   (mananas[].destinos_18: cifras / norma → un domingo ENCAPS o la PIZARRA de una 18:00 posterior; la pizarra → la próxima pizarra; las flashcards:
 *   las vencidas, el próximo Anki ENCAPS; las nuevas siguen en la cola del mazo) y el aviso lo dice; si falta un destino, ABORTA. (3) Plan B del dom 22 →
 *   vie 27-nov 18:00: la ET 2/3 = su PPT (9′) + 36′ de tramos útiles; los 9′ que faltan, el dom 6-dic (v6.10d: con el alias, las 18:00 del vie 27 se hacen
 *   el lun 30, después del dom 29; el aviso de la mañana del lun 23-nov y el diferido del sáb 21 lo dicen igual). (6) Nada «en audio en un tiempo muerto»: lo que
 *   falta hasta el 60 % de cada clase en diferido (mananas[].teoria[].resto_en) y el tramo 17:00-17:30 de cada clase en vivo del sábado de F1 (grabación
 *   a 2×, 15′) van como PRIMEROS PASOS NO OPCIONALES del ENCAPS de un domingo con fecha (domingos[].antes + los automáticos); en los domingos de tarde
 *   (6, 13 y 20-dic) esos pasos van antes del compromiso personal y la guía lleva la pausa (domingos[].antes_hasta). (9) Dom 3-ene: la corrección
 *   del simulacro opcional, entera (80′; de ejemplo 07:15-12:54) — ya no manda 22 preguntas a la revisión del sáb 9-ene, que está llena.
 * v6.09b lote 1-ter (mar 17-nov · revisión R del lote 1-bis, hallazgos 2, 3, 5, 6 y 11 + pendiente a1-18): (2) las flashcards nuevas que no caben a las 18:00
 *   van con sus MINUTOS (≈50 s por tarjeta) a un domingo con ENCAPS (mananas[].destinos_18.flash, primer paso NO opcional: 25-nov 18 → dom 29-nov 15′ ·
 *   27-nov 30 → dom 6-dic 25′ · 7-dic 16 → dom 13-dic 13′ · 31-dic 30 + vencidas → dom 3-ene 25′); las vencidas del vie 27-nov, el Anki del lun 30-nov 05:20,
 *   que lo dice. (3) La pizarra del mes no «vuelve»: no se hace (repaso sin material propio) y el día que su pizarra lleva material movido (9 y 14-dic) lo
 *   dice. (5) Los avisos de las 18:00 empiezan por los destinos (el Calendar corta el aviso a 240). (6) El tramo 17:00-17:30 del sábado → domingo +7 (la
 *   grabación tarda 1-3 días), con su plan B (la clase entera) en minutos y con la hora de ejemplo; la CI 3/8 del sáb 19-dic va en la mañana del dom 27-dic
 *   con UN plan (teoria[].si_en_vivo: vista en vivo → su tramo + los 30′ de la SP 2/11, que el dom 3-ene ya no van). Post-tests de 15′ = hasta 12 preguntas;
 *   normas de la semana acotadas a páginas a 2′/p (teoria[].lectura; lo no leído → el DEEP PRIME de su sub-eje en la intensiva, si existe, comprobado
 *   contra _encaps_intensivo_2027.sql). (11) plantillasV6 titula el domingo con los minutos de ESTUDIO.
 * v6.09b lote 1-quater (mar 17-nov · revisión R2 del lote 1-ter, hallazgos N2, N5, N6, N7 + pendiente P6 de E2; 2027 sin cambios): (N2) las normas de la semana
 *   sin DEEP PRIME son lectura de VERIFICACIÓN acotada («hasta ≈N p … el resto de la norma no es tarea de F1»; antes «lo fecha el plan de 2027», sin fecha); las
 *   que tienen DEEP PRIME con fecha siguen yendo allí. (N7) CI 3/8: el caso POR DEFECTO es que se vio EN VIVO (sáb 19-dic 15:00-17:00) → en la mañana del dom
 *   27-dic su paso es el tramo 17:00-17:30 (15′) y la SP 2/11 llega a su 60 % (45′: los 30′ que iban al dom 3-ene se adelantan); el dom 3-ene baja a 94′ NO
 *   opcionales (de ejemplo 07:15-12:49) y el caso «no la viste en vivo» va a su plan B (+30′, hasta las 13:19). (N6) la clase «si no la viste en vivo» de las
 *   18:00 (vie 27-nov, CI 2/8) dice qué son esos 45′ si SÍ la viste (las 18:00 normales) y cada traslado de ese día lo dice el día que lo recibe («solo si el vie
 *   27-nov hiciste la CI 2/8»); su `alternativa` (plan B del dom 22) va al plan B de esa 18:00. (N5) ninguna fecha de destino tras el corte del Calendar en
 *   ENCAPS de F1: Theoesencial «Resto (…) → <fecha> · …» al principio del «cómo» (teoria[].resto + resto_a), «lo que falta hasta el 60 % → dom X» justo detrás
 *   del %, el post-test de lo pendiente «Post-test al terminar (…→ banqueo del X 09:45)» al principio; lo controla check_rutina_guia (26h). (P6) el post-test
 *   de la clase en vivo del sábado tiene minutos propios: 15′ = hasta 12Q, justo después de su tramo en el domingo +7 (dom 27-dic: en el post-test de su mañana).
 * v6.10j (18-nov-2026, auditoría del volcado c14): solo texto. (1) El título de la TEORÍA no promete lo que va a las 18:00: «Banqueo 4/19 + CI S1
 *   (CI S2 → 18:00)» (y un rango partido se nombra por lo que queda: «SP S5-S7 + SP 1/11 (SP S8 → 18:00)»). (2) El TEXTO PRIMERO escribe una suma que cierra
 *   con los minutos del paso («25′ = PPT 10′ + Theoesencial ≈17 p en 15′»). (3) El banqueo grabado usa la duración real del vídeo si el JSON la trae
 *   (teoria[].video, mm:ss: Banqueo 1/19 = 27:37, THEOMED_Y_DRIVE §1.3) y, si el paso tiene ≥1′ más que la cuenta, el «qué» dice qué hacer con ella.
 * v6.10l (19-nov-2026, auditoría del volcado c15): solo texto. (1) La REVISIÓN NORMATIVA escribe una suma que cierra («35′ = PDF 11 p en 22′ + 13′ de vídeo a
 *   2×, solo para dudas»; antes «(35′: vídeo de 35′ + PDF de 11 p)») y su «cómo» dice su orden real (PDF → vídeo solo en lo que no aclare). (2) La cabecera del
 *   día (RESUMEN) nombra la teoría como el título de la TEORÍA («… (CI S2 → 18:00)»). (3) El criterio de vigencia, corto y DELANTE en los pasos de verificación
 *   en la norma («Si dos fuentes no coinciden, manda la norma más reciente (MINSA / campus Theomed 2027-I)»; antes el Calendar cortaba en «manda la norma más …»).
 * v6.10o (19-nov-2026, auditoría del volcado c17 · diffs #17): solo texto. La consecuencia de DR LOPEZ («sin el mazo de DR LOPEZ: ENCAPS::Cifras») va también en
 *   la viñeta del Anki 05:xx que manda minutos a ENCAPS::Flashcards (APEX sin vencidas, días de 25′; en los de 15′ ya iba en el «qué» de la misma viñeta) y en
 *   las vencidas de ENCAPS::Flashcards del domingo, dentro del corte del Calendar.
 * v6.10p (19-nov-2026, auditoría del volcado c18 · dias-clave #1): solo texto. La alternativa sin el mazo de DR LOPEZ a la vista en el paso de flashcards de las
 *   18:00 (lun 23-nov → 29-dic, también el dom 27-dic) y de las nuevas trasladadas al domingo (dom 29-nov, 6 y 13-dic): «Flashcards ENCAPS::Flashcards (sin el
 *   mazo de DR LOPEZ: ENCAPS::Cifras) · …» en el «qué», como el Anki de las 05:20 (antes solo al final del «cómo», que el Calendar cortaba). El «qué» de las 18:00
 *   se compacta para caber en los 150 del Calendar sin perder nada de lo que ya se veía («vencidas → nuevas del tema de hoy hasta 25′ (≈30 sin vencidas ·
 *   0,83′/nueva)»; en el domingo, «(no cupieron …)» para que quepa «· NO opcional»); el «cómo» no cambia (sus fechas de destino siguen en los primeros 100:
 *   check_rutina_guia 26h) y conserva la frase entera de DR LOPEZ. Remate: «(sin mazo DR LOPEZ → ENCAPS::Cifras)» (con «:» se leía como si ENCAPS::Cifras
 *   fuera ese mazo) y el destino de las nuevas que no quepan, con la hora real de su bloque (destPm: dom 27-dic a las 10:30, no «la 18:00»).
 * v6.10x (22-nov-2026, orden de Joseph «que se cumpla toda la programación, que no se omita nada»): (1) el CALENTAMIENTO V-2 que la mañana 21/21 sustituye el
 *   mié 6-ene va entero al dom 10-ene 07:15-13:30 (_meta.dias_extra[].calentamiento_domingo; lo coloca gen_encaps_intensivo_2027.js en su fila del SQL y aquí se
 *   pinta como encaps-dom a hora fija, modo 'calentamiento'); (2) los simulacros opcionales que se quedaron sin domingo (domingos[].simulacro_pendiente: dom 22-nov,
 *   dom 27-dic y dom 3-ene) van, uno por domingo y en orden, al primer domingo de F2 con hueco (regla de 600′ − SHIP/Feynman − ENCAPS fijo ≥ 240′).
 *   Remate (revisiones «nada se omite» y textos): la corrección que un domingo con simulacro no puede hacer entera (dom 29-nov: 36 preguntas, 25′) va con sus
 *   minutos al domingo con ENCAPS siguiente, primer paso condicionado (CORR_PEND → SUN_AUTO; antes «a la revisión del sábado», sin hueco) · los planes B que
 *   mandan al dom 10-ene dicen sus huecos reales (05:00-05:45 o desde las 13:30) y adónde va lo que no quepa (dom 17-ene) · el aviso del dom 10 no ofrece la
 *   rutina y nombra el post-test de la clase del sábado · el registro del domingo dice por dónde va (sin fila en ENCAPS → Plan) · la SP 6/11 del lun 4-ene
 *   lleva su post-test con minutos (diferidos[].post_test_min, 10:45-11:45) · textos sin el historial del traslado.
 * v6.10z (23-nov-2026, Joseph empezó la mañana ENCAPS 1/21 del lun 23 a las 08:15): LO QUE NO CUPO de una mañana → un hueco libre a hora fija (_meta.no_cupo):
 *   el Theoesencial de INV p. 1-27 (27′) va al sáb 28-nov 07:15-07:42 como bloque fijo «encaps-rec» (REC/GR, con sub y sin mínimo propios) y el paso del
 *   Theoesencial de la mañana 1/21 lo dice justo detrás de su «Resto (…) → …». La mañana no se re-hora en la app (el Calendar de ese día lo re-horó a mano).
 * v6.10z-b (23-nov-2026 ≈09:15, la mañana 1/21 empezó a las 09:00): _meta.no_cupo también a un DOMINGO con ENCAPS → primeros pasos NO opcionales de su ENCAPS
 *   (SUN_AUTO): las 10Q del banqueo y la verificación en la norma → dom 29-nov, delante del PPT de SP 2/11; el paso de origen lo dice · domingos[].recorte_max
 *   (dom 29: 40′) deja acortar el simulacro opcional más de 30′ si hay compromiso (todo de la corrección; lo que no se corrige → CORR_PEND, dom 6-dic) y el recorte
 *   se dice con minutos (sub, aviso y paso de la corrección) · el aviso de la recuperación fija nombra los primeros pasos del ENCAPS que la sigue.
 * v6.10z-d (23-nov-2026 ≈09:45, «última estructura»: la mañana 1/21 va 10:00-12:00 y ese día es SOLO teoría + post-tests): _meta.no_cupo admite VARIOS bloques
 *   fijos el mismo sábado (REC_SAB/GR_SAB → encapsRecuperasDe · guiasEncapsRecuperaDe; encapsRecuperaDe / guiaEncapsRecuperaDe con la hora del bloque) y, además
 *   del Theoesencial (sáb 28-nov 07:15-07:42), el BANQUEO entero en TANDAS (sáb 28-nov 05:30-05:45 · 08:10-08:25 · 14:30-14:45: 10Q a 72 s + 3′ de vuelta a las
 *   marcadas cada una) · ítem «correccion» de un domingo (dom 29-nov: la de las 30Q de esas tandas, 25′ —30 × 0,85′ = 25,5′; `min` del JSON entre el suelo y el
 *   techo—, NO opcional, delante de la verificación en la norma) · recorte_max hasta 55′ (dom 29: 53′; la corrección del simulacro opcional queda en 27′ —31
 *   preguntas— y las 69 que no se corrigen van al dom 6-dic, CORR_PEND, 53′) · % CIEGO = correctas Y seguras ÷ total (en la corrección, con la clave; como
 *   FASE_INTENSIVA_2027-I.md) · post-tests de Theomed: POST_TEST_ENVIO (sin terminar no se envía; al terminarlo, solo la nota; la revisión, en la corrección).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarModuloTS } = require('./usmle/cargar_ts');

const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const iInf = argv.indexOf('--informe');
const INFORME = iInf >= 0 ? argv[iInf + 1] : null;
const OUT = path.join(ROOT, 'src', 'lib', 'encapsManana.ts');
const SRC = path.join(ROOT, 'DATA', 'ENCAPS', '_encaps_manana_v607.json');
const THEO = path.join(ROOT, 'DATA', 'ENCAPS', 'INVESTIGACION_2027-1', 'THEOMED_Y_DRIVE.md');
const FECHAS = path.join(ROOT, 'DATA', '_scripts', '_fechas_v6.json');
const aborta = (m) => { console.error('✗ ' + m + ' — ABORTO, no se escribe src/lib/encapsManana.ts'); process.exit(1); };
const AVISOS = [];
const PIZ_F2 = []; // ronda c42 (ítem 39b): runners ciegos de F2 sin la pizarra en el SQL de la intensiva → código 1 al final (no solo aviso)

const J = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const F6 = JSON.parse(fs.readFileSync(FECHAS, 'utf8'));
const G = cargarModuloTS(path.join('src', 'lib', 'guia.ts'));

// ── utilidades ────────────────────────────────────────────────────────────────────────────────────────────────
const aMin = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const fr = (ini, fin) => `${ini}–${fin}`;
const dow = (iso) => new Date(iso + 'T12:00:00Z').getUTCDay();
const addDias = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const corta = (iso) => `${WD[dow(iso)]} ${Number(iso.slice(8))}-${MES[Number(iso.slice(5, 7)) - 1]}`;
// v6.10d (18-nov-2026): con el ALIAS de corrida_s1 (jue 19-nov → vie 1-ene hacen el plan del hábil anterior) la mañana de un viernes de PLAN se hace el
//   LUNES real siguiente: lo que mandaba «al domingo» (lo que falta hasta el 60 %, las cifras que no caben a las 18:00, la teoría que no cabe, el plan B)
//   iría a un domingo YA PASADO. Todo destino de domingo se compara con el día REAL de su origen (gen_fechas_v6.fechaRealDe; sin alias = la propia fecha).
const _A1 = (F6.corrida_s1 && F6.corrida_s1.alias) || {};
// v6.12 (mar 24-nov-2026): el plan que el alias global deja sin día y hace un SÁBADO HÁBIL (corrida_s1.sabado_habil: sáb 26-dic = el plan del lun 21-dic, día
//   de estudio completo) → su día real es ese sábado (gen_fechas_v6.planSabadoHabilDe): su mañana va ahí, 07:15-12:00, como un L-V
const PLAN_SAB_HABIL = new Map(((F6.corrida_s1 && F6.corrida_s1.sabado_habil) || []).map((s) => [require('./gen_fechas_v6').planSabadoHabilDe(s, F6), s]).filter(([p]) => p));
const realDe = (f) => { for (const [r, de] of Object.entries(_A1)) if (de === f) return r; return PLAN_SAB_HABIL.get(f) || f; };
const durTxt = (m) => (m < 60 ? `${m}′` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}′`);
const vel = (v) => String(v).replace('.', ',') + '×';
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
/** «2 h 10» · «50′» · «1 h» → minutos */
function durMin(s) {
  const m = /^\s*(?:(\d+)\s*h)?\s*(\d+)?\s*′?\s*$/.exec(String(s || ''));
  if (!m || (!m[1] && !m[2])) aborta(`duración ilegible «${s}»`);
  return Number(m[1] || 0) * 60 + Number(m[2] || 0);
}
const P = (min, que, como, enlace) => ({ min, que, como, ...(enlace ? { enlace } : {}) });
const R = (t, url, extra = {}) => ({ t, url, ...extra });
function guia(franja, titulo, pasos, recursos, hecho, extra = {}) {
  const totalMin = G.minutosFranja(franja);
  return { franja, plan: 'encaps', titulo, totalMin, pasos, recursos, hecho, ...(extra.planB ? { planB: extra.planB } : {}), ...(extra.aviso ? { aviso: extra.aviso } : {}) };
}

// ── campus (los ÚNICOS enlaces) y rutas del Drive (solo texto) ───────────────────────────────────────────────
const CAMPUS = J._meta.campus;
for (const [k, u] of Object.entries(CAMPUS)) if (!/^https:\/\/campus\.academiatheomed\.com\//.test(u)) aborta(`_meta.campus.${k} no es del campus de Theomed: ${u}`);
const L99 = { t: 'Campus · curso 99', url: CAMPUS.curso };
const L105 = { t: 'Campus · simulacros (105)', url: CAMPUS.simulacros };
const L116 = { t: 'Campus · adicionales (116)', url: CAMPUS.adicionales };
const R99 = R('Campus Theomed · curso 99 (MEDICINA REGULAR GP2 2027-I)', CAMPUS.curso);
const R105 = R('Campus Theomed · curso 105 (SIMULACROS MEDICINA 2027)', CAMPUS.simulacros);
const R116 = R('Campus Theomed · curso 116 (SESIONES ADICIONALES GP02)', CAMPUS.adicionales);
const DRIVE = 'Drive u/4 › SERUMS 2026 II';
const RUTA = {
  asinc: (area, s) => `Campus › curso 99 › bloque ${area} › Sesiones asíncronas › S${s} (vídeo · PPT · post-test)`,
  vivo: (area) => `Campus › curso 99 › bloque ${area} › Sesiones sincrónicas (grabación · PPT · post-test)`,
  adic: 'Campus › curso 116 (SESIONES ADICIONALES GP02)',
  theoes: (area) => `Campus › curso 99 › Material complementario › Theoesencial y glosario de ${area}`,
  normas: 'Campus › curso 99 › sección «Normas técnicas» (por ítem del temario) · carpeta «NORMAS TÉCNICAS» del material complementario',
  drLopezPT: `${DRIVE} › DR LOPEZ › 🚀 PosTest`,
  drLopezSim: `${DRIVE} › DR LOPEZ › 📝 Simulacros`,
  drLopezNorm: `${DRIVE} › DR LOPEZ › 📈 Normativas`,
  qxBanqueo: `${DRIVE} › Qx MEDIC › Fase 2 › Banqueo`,
  theoDrive: `${DRIVE} › THEOMED › 📚 Videoclases asincrónicas (misma serie, edición 2026-II)`,
};
const AREA = { SP: 'Salud Pública', CI: 'Cuidado Integral', GES: 'Gestión', INV: 'Investigación', ET: 'Ética e Interculturalidad' };
const AREA_DE_NOMBRE = (txt) => Object.entries(AREA).find(([, n]) => txt.startsWith(n))?.[0] ?? null;

// ── duración exacta de las sesiones asíncronas (THEOMED_Y_DRIVE §1.3) ──────────────────────────────────────────
const SES = {};
{
  const md = fs.readFileSync(THEO, 'utf8');
  for (const line of md.split(/\r?\n/)) {
    const m = /^\| (SP|CI|GES|INV|ET) \| (S1 .+) \|\s*$/.exec(line);
    if (!m) continue;
    for (const x of m[2].matchAll(/S(\d+) \d+-\w+ · (\d+(?::\d+){1,2})/g)) {
      const p = x[2].split(':').map(Number);
      const seg = p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1];
      SES[`${m[1]} S${x[1]}`] = seg;
    }
  }
  for (const [a, n] of Object.entries({ SP: 8, CI: 8, GES: 7, INV: 3, ET: 3 })) for (let i = 1; i <= n; i++) if (!SES[`${a} S${i}`]) aborta(`THEOMED_Y_DRIVE.md §1.3: falta la duración de ${a} S${i}`);
}
const N_SES = { SP: 8, CI: 8, GES: 7, INV: 3, ET: 3 };
// v6.09b (a1-6): páginas del Theoesencial por área (THEOMED_Y_DRIVE §1.3, columna «Theoesenciales»: SP 127 · CI 135 · ET 22 · INV 48 · GES 40)
const THEO_P_AREA = {};
{
  const NOM = { 'Salud Pública': 'SP', 'Cuidado Integral': 'CI', 'Ética e Intercult.': 'ET', 'Investigación': 'INV', 'Gestión': 'GES' };
  for (const line of fs.readFileSync(THEO, 'utf8').split(/\r?\n/)) {
    const c = line.split('|').map((x) => x.trim());
    if (c.length >= 8 && NOM[c[1]]) { const m = /^(\d+) p$/.exec(c[6]); if (m) THEO_P_AREA[NOM[c[1]]] = Number(m[1]); }
  }
  for (const a of Object.keys(N_SES)) if (!THEO_P_AREA[a]) aborta(`THEOMED_Y_DRIVE.md §1.3: faltan las páginas del Theoesencial de ${a}`);
}
const segTxt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// ── controles de fechas (las mañanas, sábados y domingos salen de _fechas_v6.json) ──────────────────────────────
const SKIP = new Set(F6.skip);
const STEP_DIAS = F6.step1.f1_dias_semana || [1, 2, 3, 4, 5];
const ESPERADAS = [];
for (let d = F6.f1.inicio; d <= F6.f1.fin; d = addDias(d, 1)) { const w = dow(d); if (w >= 1 && w <= 5 && !SKIP.has(d) && !STEP_DIAS.includes(w)) ESPERADAS.push(d); }
// v6.08 (14-nov-2026): DÍAS EXTRA de mañana ENCAPS fuera de F1 (_meta.dias_extra del JSON, con su motivo). Con D1 el lun 16-nov caben 19 mañanas
//   en F1 (antes 22): el SIMULACRO DE CIERRE se queda anclado al mié 30-dic y las 3 que no caben van CON FECHA a (1) el jue 31-dic, día extra SOLO
//   ENCAPS (sigue siendo SKIP para el Step 1 y los planes secundarios) y (2) el mar 5-ene, en lugar del calentamiento I-3 de la intensiva. Solo se
//   admite un día extra L-V posterior a F1 que sea SKIP dentro de la transición o un día de la semana 1 de la intensiva anterior al pre-test.
const EXTRA = new Map((J._meta.dias_extra || []).map((x) => [x.fecha, x.motivo]));
// v6.09 (16-nov-2026): el jue 31-dic deja de ser SKIP (recupera el lun 16, que no se estudió) → es un día HÁBIL de la transición: un día extra puede
//   ser también un L-V de la transición que NO es SKIP (día de plan completo: mañana ENCAPS + 16:15 + secundarios; el Step 1 ya está en pausa). Todo
//   L-V hábil de la transición tiene que ser día extra (si no, ese día de plan se quedaría sin su mañana ENCAPS).
const SIN_SESION = new Set((F6.corrida_s1 && F6.corrida_s1.sin_sesion) || []);
const HAB_TRANS = [];
for (let d = F6.transicion.desde; d <= F6.transicion.hasta; d = addDias(d, 1)) { const w = dow(d); if (w >= 1 && w <= 5 && !SKIP.has(d)) HAB_TRANS.push(d); }
for (const [f, motivo] of EXTRA) {
  const w = dow(f);
  if (!/^20\d\d-\d\d-\d\d$/.test(f) || w < 1 || w > 5 || f <= F6.f1.fin) aborta(`_meta.dias_extra ${f}: debe ser un L-V posterior a F1 (${F6.f1.fin})`);
  const enTransicion = f >= F6.transicion.desde && f <= F6.transicion.hasta; // v6.08: solo un SKIP · v6.09: SKIP o hábil de la transición
  const enS1 = f > F6.encaps.intensiva_desde && f < F6.encaps.pretest;
  if (!enTransicion && !enS1) aborta(`_meta.dias_extra ${f}: solo vale un día de la transición (${F6.transicion.desde} → ${F6.transicion.hasta}) o un día de la semana 1 de la intensiva entre el ${F6.encaps.intensiva_desde} y el pre-test del ${F6.encaps.pretest}`);
  if (!motivo) aborta(`_meta.dias_extra ${f}: sin motivo`);
  ESPERADAS.push(f);
}
// v6.10w (dom 22-nov): salvo un hábil de la transición cuyo PLAN no tiene día real (corrida_s1: el jue 31-dic real hace el plan del mar 29 y nadie hace el del
//   jue 31): su mañana va a un día extra posterior (mar 5-ene) y su 16:15 al sábado a hora fija (corrida_s1.extra { hora, plan })
const _AV = new Set(Object.values((F6.corrida_s1 && F6.corrida_s1.alias) || {}));
// v6.12: salvo el plan que hace un SÁBADO HÁBIL (PLAN_SAB_HABIL: el lun 21-dic, el sáb 26-dic): su mañana se espera en su fecha de plan, como un día más de F1
const SIN_DIA_REAL = new Set(Object.keys((F6.corrida_s1 && F6.corrida_s1.alias) || {}).filter((r) => !_AV.has(r) && !PLAN_SAB_HABIL.has(r)));
// v6.11 fase 2 (lun 23-nov): igual en F1: un hábil de F1 cuyo PLAN no tiene día real en el alias GLOBAL (el mié 30-dic: el alias global llega al plan del mar 29)
//   no espera mañana en su fecha: su mañana (19/21, el simulacro de cierre) va a un día extra (mar 5-ene) y su 16:15, al sábado a hora fija (corrida_s1.extra)
for (const d of [...ESPERADAS]) if (d >= F6.f1.inicio && d <= F6.f1.fin && SIN_DIA_REAL.has(d) && !EXTRA.has(d)) ESPERADAS.splice(ESPERADAS.indexOf(d), 1);
for (const d of HAB_TRANS) if (!EXTRA.has(d) && !SIN_DIA_REAL.has(d)) aborta(`${d} es un L-V hábil de la transición (no es SKIP en _fechas_v6.json ${F6.version}) y no está en _meta.dias_extra: ese día de plan se quedaría sin su mañana ENCAPS`);
// v6.09 (16-nov-2026): DOMINGOS DE PLAN (_meta.domingos_plan, con su motivo): una mañana ENCAPS de F1 que ya no cabe entre semana va un domingo de F1
//   (v6.09: dom 27-dic, mañana 17/21; obligatoria, 07:15-12:00 con su protocolo; sus «cifras, normas y flashcards» de las 18:00 son FLEXIBLES ese día
//   porque a las 17:00 está el baile). No puede ser un domingo sin sesión (corrida_s1.sin_sesion).
const DOM_PLAN = new Map((J._meta.domingos_plan || []).map((x) => [x.fecha, x.motivo]));
// v6.09 (fix revisión 16-nov, joseph 3): el domingo de plan va a HORA FIJA y se puede cumplir con el horario real del domingo (baile 17:00-20:00,
//   compromiso personal a mediodía): `manana` [ini, fin] = las 7 franjas del protocolo desplazadas (dom 27-dic: 06:00-10:45, 75′ antes) · `tarde`
//   [ini, fin] = sus cifras, normas y flashcards (45′) a hora FIJA al terminar la mañana (10:45-11:30; antes flexibles, de ejemplo 20:00-20:45, después
//   del baile) · `compromiso` = hora del compromiso personal de ese día (el margen se dice en el aviso). Sin `manana`, el protocolo de siempre (07:15-12:00).
// v6.09 (fix 2, 16-nov noche): `manana` = lista de TRAMOS [[ini, fin], …] (Σ = 285′, las 7 franjas del protocolo repartidas en orden; dom 27-dic:
//   04:15-05:45 + 07:15-10:30) para que el domingo de plan empiece a las 04:15 como entre semana y no pise la rutina de la mañana (05:45-07:15).
const PROT_INI = '07:15', PROT_FIN = '12:00', PROT_MIN = aMin(PROT_FIN) - aMin(PROT_INI);
const RUTINA_AM = ['05:45', '07:15']; // caminata · ducha · desayuno, todos los días: no se toca
const DOM_PLAN_H = new Map((J._meta.domingos_plan || []).filter((x) => x.manana).map((x) => [x.fecha, { manana: x.manana, tarde: x.tarde, compromiso: x.compromiso || null }]));
for (const [f, motivo] of DOM_PLAN) {
  if (!/^20\d\d-\d\d-\d\d$/.test(f) || dow(f) !== 0 || f < F6.f1.inicio || f > F6.f1.fin) aborta(`_meta.domingos_plan ${f}: debe ser un domingo de F1 (${F6.f1.inicio} → ${F6.f1.fin})`);
  if (SIN_SESION.has(f) || SKIP.has(f)) aborta(`_meta.domingos_plan ${f}: es un día sin sesión (corrida_s1.sin_sesion o SKIP)`);
  if (!motivo) aborta(`_meta.domingos_plan ${f}: sin motivo`);
  const h = DOM_PLAN_H.get(f);
  if (h) {
    const ok = (x) => Array.isArray(x) && x.length === 2 && x.every((t) => /^\d\d:\d\d$/.test(t)) && aMin(x[1]) > aMin(x[0]);
    if (!Array.isArray(h.manana) || !h.manana.length || h.manana.length > 2 || !h.manana.every(ok)) aborta(`_meta.domingos_plan ${f}: «manana» debe ser una lista de 1 o 2 tramos [ini, fin]`);
    for (let i = 1; i < h.manana.length; i++) if (aMin(h.manana[i][0]) < aMin(h.manana[i - 1][1])) aborta(`_meta.domingos_plan ${f}: los tramos de la mañana se solapan o no van en orden`);
    const suma = h.manana.reduce((a, t) => a + aMin(t[1]) - aMin(t[0]), 0);
    if (suma !== PROT_MIN) aborta(`_meta.domingos_plan ${f}: los tramos de la mañana suman ${suma}′ y deben sumar ${PROT_MIN}′ (las 7 franjas del protocolo)`);
    for (const t of h.manana) {
      if (aMin(t[0]) < aMin('04:15')) aborta(`_meta.domingos_plan ${f}: el tramo ${t.join('-')} empieza antes de las 04:15`);
      if (aMin(t[0]) < aMin(RUTINA_AM[1]) && aMin(RUTINA_AM[0]) < aMin(t[1])) aborta(`_meta.domingos_plan ${f}: el tramo ${t.join('-')} pisa la rutina de la mañana (${RUTINA_AM.join('-')}: caminata, ducha y desayuno; no se toca)`);
    }
    const finM = h.manana[h.manana.length - 1][1];
    if (!ok(h.tarde) || aMin(h.tarde[1]) - aMin(h.tarde[0]) !== 45 || aMin(h.tarde[0]) < aMin(finM)) aborta(`_meta.domingos_plan ${f}: «tarde» debe ser [ini, fin] de 45′ después de la mañana`);
    if (h.compromiso && (!/^\d\d:\d\d$/.test(h.compromiso) || aMin(h.compromiso) < aMin(h.tarde[1]))) aborta(`_meta.domingos_plan ${f}: «compromiso» ${h.compromiso} antes del fin de las cifras (${h.tarde[1]})`);
    if (aMin(h.tarde[1]) > aMin('17:00')) aborta(`_meta.domingos_plan ${f}: las cifras terminan después de las 17:00 (domingo: estudio solo antes del baile)`);
  }
  ESPERADAS.push(f);
}
/** v6.09 (fix 2): tramos reales de la mañana ENCAPS de `iso` ([[07:15, 12:00]] salvo domingo de plan con hora propia). */
const tramosManana = (iso) => { const h = DOM_PLAN_H.get(iso); return h ? h.manana : [[PROT_INI, PROT_FIN]]; };
/** v6.09 (fix 2): hora REAL de una hora del protocolo (07:15-12:00) en la mañana de `iso`, recorriendo sus tramos en orden. En el corte entre dos tramos,
 *  `lado` = 'ini' (algo que EMPIEZA ahí: el tramo siguiente) o 'fin' (algo que TERMINA ahí: el tramo anterior). Dom 27-dic: 07:15 → 04:15 · 08:45 → 05:45
 *  (fin) / 07:15 (ini) · 11:40 → 10:10 · 12:00 → 10:30. Sin tramos propios, la misma hora. */
function protocoloAReal(iso, h, lado = 'ini') {
  let o = aMin(h) - aMin(PROT_INI);
  const ts = tramosManana(iso);
  for (let i = 0; i < ts.length; i++) {
    const len = aMin(ts[i][1]) - aMin(ts[i][0]);
    if (o < len || (o === len && (lado === 'fin' || i === ts.length - 1))) return hhmm(aMin(ts[i][0]) + o);
    o -= len;
  }
  return h;
}
/** hora real de una hora del protocolo («11:40») en la mañana de `iso` (dom 27-dic: 10:10). */
const horaProt = (iso, h) => protocoloAReal(iso, h, 'ini');
ESPERADAS.sort();
const esDomPlan = (iso) => DOM_PLAN.has(iso);
/** remate v6.10p (revisión «visibilidad» BAJA): el bloque de cifras, normas y flashcards de un día como DESTINO («→ la 18:00 del mié 30-dic»); el de un
 *  domingo de plan va a su hora propia (dom 27-dic: 10:30, al terminar la mañana; a las 18:00 está el baile) o, sin hora propia, flexible. Antes, siempre «la 18:00». */
const destPm = (iso) => (!esDomPlan(iso) ? `la 18:00 del ${corta(iso)}` : DOM_PLAN_H.has(iso) ? `la ENCAPS de las ${DOM_PLAN_H.get(iso).tarde[0]} del ${corta(iso)}` : `la ENCAPS (flexible) del ${corta(iso)}`);
const SAB_ESP = [], DOM_ESP = [];
for (let d = F6.f1.inicio; d <= F6.transicion.hasta; d = addDias(d, 1)) { if (dow(d) === 6) SAB_ESP.push(d); if (dow(d) === 0) DOM_ESP.push(d); }
// v6.08 (fix revisión 14-nov, est6): + los sábados de F2 (intensiva → víspera del examen ENCAPS) que no son protegidos ni SKIP: sáb 9-ene → sáb 6-mar
//   (el sáb 13-mar es D-1 ENCAPS, protegido). Llevan la clase EN VIVO de Theomed de las 15:00 con el título del calendario del campus
//   (THEOMED_Y_DRIVE.md §3.3; confirmado por el calendario del campus el sáb 14-nov). Si el examen ENCAPS se mueve, la lista del JSON deja de
//   cuadrar y el generador aborta hasta actualizarla.
const PROT_SAB = new Set((F6.protegidos || []).map((x) => x.fecha));
const SAB_F2 = [];
for (let d = F6.encaps.intensiva_desde; d < F6.encaps.examen; d = addDias(d, 1)) if (dow(d) === 6 && !PROT_SAB.has(d) && !SKIP.has(d)) SAB_F2.push(d);
SAB_ESP.push(...SAB_F2);
const esSabF2 = (iso) => SAB_F2.includes(iso);
const fechasJ = J.mananas.map((x) => x.fecha);
if (fechasJ.join() !== ESPERADAS.join()) aborta(`mañanas del JSON (${fechasJ.length}) ≠ días de F1 sin Step ni SKIP de _fechas_v6.json ${F6.version} + días extra (${ESPERADAS.length}): sobran [${fechasJ.filter((f) => !ESPERADAS.includes(f)).join(', ')}] · faltan [${ESPERADAS.filter((f) => !fechasJ.includes(f)).join(', ')}]`);
if (J.mananas.some((x) => x.a_las_18 && !EXTRA.has(x.fecha))) aborta('a_las_18 solo vale en un día extra (_meta.dias_extra)');
// v6.10w: el nº de la mañana sigue el orden en que Joseph las hace (día REAL; el domingo de plan del 27-dic va antes del lun 28, que hace el plan del mié 23)
// v6.11: una mañana cuyo plan se quedó SIN DÍA real (gen_fechas_v6.planesSinDia: el mié 30-dic) va, para el orden, tras el último día del alias (ordenRealDe)
const _ORD = (f) => require('./gen_fechas_v6').ordenRealDe(f, F6);
[...J.mananas].sort((a, b) => (_ORD(a.fecha) < _ORD(b.fecha) ? -1 : _ORD(a.fecha) > _ORD(b.fecha) ? 1 : 0)).forEach((x, i) => { if (x.n !== i + 1) aborta(`mañana ${x.fecha}: n = ${x.n} ≠ ${i + 1} (orden de día real)`); });
if (J.sabados.map((x) => x.fecha).join() !== SAB_ESP.join()) aborta(`sábados del JSON ≠ sábados de F1 + transición + F2 sin protegidos (${SAB_ESP.join(', ')})`);
if (J.domingos.map((x) => x.fecha).join() !== DOM_ESP.join()) aborta(`domingos del JSON ≠ domingos de F1 + transición (${DOM_ESP.join(', ')})`);
// v6.09 (16-nov-2026): fines de semana SIN SESIÓN (corrida_s1.sin_sesion; v6.09: sáb 21 y dom 22-nov, viaje) → siguen en el JSON (nada se quita: la clase
//   del sábado consta, marcada en diferido) pero sin guías ni bloques: sábado con `sin_sesion: true` + `diferido` (qué pasa con su clase) · domingo con
//   modo 'sin_sesion'. Domingo de plan (_meta.domingos_plan) = modo 'manana' (lleva la mañana ENCAPS, no el ENCAPS opcional).
for (const s of J.sabados) {
  if (SIN_SESION.has(s.fecha) !== !!s.sin_sesion) aborta(`sábado ${s.fecha}: «sin_sesion» ${s.sin_sesion ? 'marcado y el día no está' : 'sin marcar y el día está'} en corrida_s1.sin_sesion`);
  if (s.sin_sesion && s.vivo && !s.diferido) aborta(`sábado ${s.fecha}: sin sesión con clase en vivo («${s.vivo}») y sin «diferido» (qué se hace con la clase)`);
}
for (const d of J.domingos) {
  if (SIN_SESION.has(d.fecha) !== (d.modo === 'sin_sesion')) aborta(`domingo ${d.fecha}: modo «${d.modo || 'simulacro'}» y ${SIN_SESION.has(d.fecha) ? '' : 'no '}está en corrida_s1.sin_sesion`);
  if (DOM_PLAN.has(d.fecha) !== (d.modo === 'manana')) aborta(`domingo ${d.fecha}: modo «${d.modo || 'simulacro'}» y ${DOM_PLAN.has(d.fecha) ? '' : 'no '}está en _meta.domingos_plan`);
  // v6.09 (17-nov): DOMINGO DE LLEGADA (dom 22-nov) = sin sesión + `llegada` + `recupera` (la recuperación fija del viaje, después de la llegada)
  if (d.llegada && (d.modo !== 'sin_sesion' || !d.recupera || !/^\d\d:\d\d$/.test(d.llegada))) aborta(`domingo ${d.fecha}: «llegada» solo en un domingo sin sesión con «recupera» y hora HH:MM`);
}
const NM = J.mananas.length;

// ── unidades de teoría ─────────────────────────────────────────────────────────────────────────────────────────
// v6.09b (mar 17-nov · auditoría tiempo ↔ material, hallazgos a1-1/5/6/7/17): reglas del «cuánto» en _meta.reglas_tiempo del JSON (fuente única):
//   vídeo y banqueo grabado ACTIVO piden pausas → ×1,2 (pausa) · banqueo grabado a 1,25× (+ pausa: 1 h → 58′) · clase EN VIVO en diferido = REGLA FIJA
//   60 % de la clase a 2× (2 h 30 → 45′ · 2 h 14 → 40′; antes «elástica» entre 20′ y la mitad: la misma clase recibía de 22′ a 75′); si la mañana no
//   da para el 60 %, el ítem trae `min` y lo que falta va EXPLÍCITAMENTE en audio · PPT = 10′ · Theoesencial = páginas × 1′ (ítem «theoesencial»
//   del JSON; solo las páginas de las sesiones en VÍDEO: texto primero ya lo lee en su ÷ 3; lo que no cabe en F1, _meta.theoesencial.fuera_f1 con
//   fecha) · PDF = 2′/página · el texto de cada paso dice sus minutos FINALES (el redondeo absorbido, a1-17).
const RT_ = J._meta.reglas_tiempo || {};
for (const k of ['pausa', 'activo_vel', 'vivo_frac', 'vivo_vel', 'ppt_min', 'theo_min_por_p', 'pdf_min_por_p', 'correccion_min_por_q', 'texto_div']) if (!(RT_[k] > 0)) aborta(`_meta.reglas_tiempo.${k} falta o no es un número > 0`);
const VEL_VIDEO = 1.75, VEL_TEXTO = RT_.texto_div /* FX1: declarada en _meta.reglas_tiempo (antes una constante oculta) */, PAUSA = RT_.pausa, VEL_ACTIVO = RT_.activo_vel, VIVO_FRAC = RT_.vivo_frac, VIVO_VEL = RT_.vivo_vel, PPT_MIN = RT_.ppt_min,
  THEO_P = RT_.theo_min_por_p, PDF_P = RT_.pdf_min_por_p, CORR_Q = RT_.correccion_min_por_q;
const pct100 = (x) => `${Math.round(x * 100)} %`;
const MODO = J._meta.modos;
/** v6.10 (mié 18-nov-2026 · Joseph: «método por sector: YouTube → NotebookLM → síntesis»): _meta.metodo_sector (síntesis: DATA/ENCAPS/METODO_POR_SECTOR_NLM.md)
 *  → «Método <área>» al FINAL del «cómo» de cada sesión asíncrona de la teoría (vídeo o texto primero) y «Trampas <área>» al FINAL del paso de CORRECCIÓN
 *  del banqueo (fix 18-nov: antes, del primer paso del banqueo de las 09:45), solo en F1 (antes de la intensiva). Al final y sin fechas ni horas: no desplaza ningún destino (el Calendar corta el «cómo» a ≈100) ni toca
 *  minutos (tiempo ↔ material intacto). */
const MS = J._meta.metodo_sector || {};
for (const a of ['SP', 'CI', 'GES', 'ET', 'INV']) if (!MS[a] || !MS[a].metodo || !MS[a].trampas) aborta(`_meta.metodo_sector.${a}: faltan «metodo» y «trampas»`);
if (!MS.mezcla || !MS.mezcla.trampas) aborta('_meta.metodo_sector.mezcla.trampas falta');
for (const [k, m] of Object.entries(MS)) for (const t of (m && typeof m === 'object' ? [m.metodo, m.trampas] : []).filter(Boolean))
  if (/\d{1,2}:\d{2}|\d{1,2}-(?:ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\b/.test(t)) aborta(`_meta.metodo_sector.${k}: sin fechas ni horas («${t.slice(0, 50)}…»)`);
const enF1MS = (f) => !f || f < F6.encaps.intensiva_desde;
const metodoSec = (a, f) => (enF1MS(f) && MS[a] && MS[a].metodo ? ` ${MS[a].metodo}` : '');
// v6.10 (fix revisión 18-nov): las «Trampas <área>» (CONTENIDO) se leen DESPUÉS de responder → al final del paso de CORRECCIÓN (finB-11:40): antes iban en el
//   primer paso del banqueo de las 09:45 («Sin mirar nada… modo examen») e inflaban el % ciego, que es la métrica del gate (≥ 75 %). La de la mezcla (una
//   instrucción sin contenido: «nombra el área y su trampa») sigue en el primer paso del banqueo. Mismos minutos.
const areasSec = (areaTxt) => [...new Set((String(areaTxt).match(/\b(SP|CI|GES|ET|INV|MCI)\b/g) || []).map((x) => (x === 'MCI' ? 'CI' : x)))].slice(0, 2);
const trampasSec = (areaTxt, f) => {
  if (!enF1MS(f)) return '';
  const as = areasSec(areaTxt);
  return as.length ? ` Ya respondido (no antes: el % ciego del banqueo es la medición), contrasta cada fallo con las trampas del área. ${as.map((x) => MS[x].trampas).join(' ')}` : '';
};
const trampasMezcla = (areaTxt, f) => (enF1MS(f) && !areasSec(areaTxt).length && /mezcla|mixto/.test(String(areaTxt)) ? ` ${MS.mezcla.trampas}` : '');
/** v6.09b: minutos de tramos útiles de una clase en vivo en diferido (60 % de la clase a 2×). */
const vivoMin = (dur) => Math.round(dur * VIVO_FRAC / VIVO_VEL);
/** v6.09b lote 1-bis: el tramo 17:00-17:30 de la clase en vivo del sábado (30′ de clase) en la grabación a 2× (lote 1-ter: arriba, lo usa unidades). */
// v6.09b lote 1-quater FX1 (revisión V1 · tramo 17:00-17:30): la regla fija de la clase en diferido (60 % a 2×) vale también para su último tramo → 30′ × 0,6 ÷ 2
//   = 9′ (antes 15′ = el 100 % a 2×: el último quinto de la clase recibía un tercio del tiempo de la clase entera)
const TRAMO_MIN = Math.round(30 * VIVO_FRAC / VIVO_VEL);
/** v6.09b lote 1-quater (pendiente P6 de E2): post-test de la clase en vivo del sábado, en el domingo +7 tras su tramo: acotado como el de la mañana (15′ = hasta 12Q) */
const PT_SAB_MIN = 15, PT_SAB_Q = Math.floor(PT_SAB_MIN * 60 / 72);
/** v6.09b: «→ 45′ de tramos útiles a 2× (60 % de la clase)» o, si la mañana no da para el 60 %, «→ 30′ … (40 % de la clase; lo que falta hasta el 60 %, 15′,
 *  el dom 13-dic …)». v6.09b lote 1-bis (hallazgo 6): lo que falta lleva FECHA (`destino`; antes «en audio en un tiempo muerto», sin franja). */
const vivoQue = (item, dur, min, destino) => {
  const ref = vivoMin(dur);
  if (min < ref && !destino) aborta(`«${item}»: ${min}′ de ${ref}′ (${pct100(VIVO_FRAC)} de la clase) y lo que falta no tiene destino con fecha (resto_en)`);
  // v6.09b lote 1-quater (R2 · N5): la fecha de destino justo después de «lo que falta hasta el 60 %» (antes «…, 15′ de tramos útiles, el dom 20-dic, …» en la
  //   pos. 157-167 del «qué»: el Calendar lo corta a 140-150)
  return `${item} · clase de ${durTxt(dur)} → ${min}′ de tramos útiles a ${vel(VIVO_VEL)} (${min >= ref ? `${pct100(VIVO_FRAC)} de la clase` : `${pct100(min * VIVO_VEL / dur)} de la clase; lo que falta hasta el ${pct100(VIVO_FRAC)} → ${destino}`})`;
};
/** v6.09b lote 1-quater: destino corto de lo que falta hasta el 60 % (para el «qué» de la clase en diferido): «dom 20-dic, 15′, primer paso de su ENCAPS». */
const destDomCorto = (f, min) => `${corta(f)}, ${min}′, primer paso de su ENCAPS`;
/** v6.09b lote 1-bis (hallazgo 6): lo que falta hasta el 60 % de cada clase en diferido con `min` (mananas[].teoria[].resto_en = un domingo con ENCAPS) →
 *  primer paso NO opcional del ENCAPS de ese domingo. Se rellena al expandir las mañanas (unidades) y lo consume el ENCAPS del domingo (antesDom). */
const RESTOS = [];
/** v6.09b lote 1-ter (hallazgo 6, CI 3/8): si la clase del sábado se vio EN VIVO, sus minutos de la mañana del domingo de plan (dom 27-dic) son su tramo
 *  17:00-17:30 + los que faltan de OTRA clase con resto (teoria[].si_en_vivo.adelanta), que ese domingo con ENCAPS (el de su resto_en) ya no van. */
const ADELANTOS = [];
const domConEncaps = (f) => J.domingos.find((x) => x.fecha === f && !['sin_sesion', 'manana'].includes(x.modo || 'simulacro')) || null;
const destDomTxt = (f) => `el ${corta(f)}, primer paso de su ENCAPS del domingo`;
/** v6.10w (remate · revisiones cobertura/textos): destino de un PLAN B («lo que no veas hoy → …») en el domingo con ENCAPS `f`, según cómo es ese domingo:
 *  · el dom 3-ene (modo «previos») va LLENO y a hora fija (05:00-12:00 los planes del sábado, 12:30-14:09 su ENCAPS, SHIP 120′ y nada después de las 17:00) →
 *    lo que sobre va al primer domingo libre de F2 (dom 10-ene, a la hora que pueda, antes de las 17:00); antes «→ dom 3-ene, primeros pasos de su ENCAPS (antes
 *    de su simulacro …; ese bloque empieza antes)», imposible ese día · un domingo con RECUPERACIÓN fija (dom 29-nov 07:15-08:45) → su ENCAPS empieza al acabar
 *    la recuperación y lo que sobre recorta el simulacro opcional (antes «ese bloque empieza antes»: chocaba con la recuperación) · los demás, como siempre */
const DOM_LIBRE_F2 = (() => { let d = addDias(F6.transicion.hasta, 1); while (dow(d) !== 0) d = addDias(d, 1); return d; })();
//   v6.10x (remate): si ese domingo lleva un calentamiento de la intensiva a hora fija (dom 10-ene 07:15-13:30: calDomSQL), el destino dice sus huecos reales
//   (de 05:00 al inicio de la rutina y desde el fin del calentamiento, sin pisar el SHIP, antes de las 17:00) y adónde va lo que no quepa (el domingo siguiente)
// v6.11 fase 2: lo que no quepa en el primer domingo libre de F2 va al PRIMER domingo posterior sin calentamiento ni ENCAPS de F1 (dom 24-ene: el dom 17 lleva el II-3)
function domPBSig() { let x = addDias(DOM_LIBRE_F2, 7); for (let i = 0; i < 10 && (J.domingos.some((y) => y.fecha === x) || calDomSQL(x)); i++) x = addDias(x, 7); return x; }
function destPBDom(f, primerPaso = false) {
  const d = J.domingos.find((x) => x.fecha === f) || {};
  if (d.modo === 'previos') {
    const c = calDomSQL(DOM_LIBRE_F2), sig = domPBSig();
    if (!c) return `${corta(DOM_LIBRE_F2)} (el primer domingo libre: a la hora que puedas, antes de las 17:00; el ENCAPS del ${corta(f)} va lleno y a hora fija)`;
    if (J.domingos.some((x) => x.fecha === sig) || calDomSQL(sig)) aborta(`plan B → ${DOM_LIBRE_F2}: lo que no quepa iría al ${sig}, que no es un domingo de F2 con hueco (tiene ENCAPS de F1 o un calentamiento)`);
    // (sin la hora de inicio del calentamiento: en un domingo de plan, mov() movería una hora de 07:15-12:00 como si fuera del protocolo de la mañana)
    if (aMin(c.fin) <= aMin(PROT_FIN)) aborta(`plan B → ${DOM_LIBRE_F2}: el calentamiento acaba a las ${c.fin}, dentro de 07:15-12:00 (el texto se movería en un domingo de plan)`);
    return `${corta(DOM_LIBRE_F2)}, fuera de su ENCAPS fijo: de 05:00 a ${RUTINA_AM[0]} o desde las ${c.fin}, sin pisar el SHIP y antes de las 17:00; lo que no quepa, al ${corta(sig)} (el ENCAPS del ${corta(f)} va lleno y a hora fija)`;
  }
  if (d.recupera && Array.isArray(d.recupera.franja)) return `${corta(f)}, ${primerPaso ? 'primer paso' : 'primeros pasos'} de su ENCAPS, al acabar la recuperación fija (${d.recupera.franja[1]}): recorta el simulacro opcional`;
  return `${corta(f)}, ${primerPaso ? 'primer paso' : 'primeros pasos'} de su ENCAPS (${primerPaso ? '' : 'antes de su simulacro o sus banqueos; '}ese bloque empieza antes)`;
}
/** Expande un ítem de teoría del JSON en unidades con su «cuánto» (min), lo que pide de verdad su material (exact) y su ruta. `que(min)` escribe el
 *  texto con los minutos FINALES (v6.09b). */
/** v6.09b lote 1-ter: el SQL de la intensiva (solo lectura: comprobar que un DEEP PRIME de destino existe; gen_encaps_intensivo_2027.js NO se ejecuta aquí). */
let SQL_INT_TXT = null;
const SQL_INT = () => (SQL_INT_TXT = SQL_INT_TXT || fs.readFileSync(path.join(ROOT, 'DATA', '_scripts', '_encaps_intensivo_2027.sql'), 'utf8'));
/** v6.10x (remate): las filas ENCAPS del SQL de la intensiva (tuplaSql) y el calentamiento que un domingo de F2 lleva a hora fija (extra.manana_f1.calentamiento_domingo) */
let FILAS_INT_C = null;
const filasInt = () => (FILAS_INT_C = FILAS_INT_C || SQL_INT().split(/\r?\n/).filter((l) => l.startsWith("('ENCAPS',")).map(tuplaSql));
const calDomSQL = (f) => { for (const r of filasInt()) { const c = r.extra && r.extra.manana_f1 && r.extra.manana_f1.calentamiento_domingo; if (c && c.fecha === f) return c; } return null; };
const COD_CLASE_V = /^(SP|CI|GES|INV|ET) \d+\/\d+$/;
/** v6.10z (lun 23-nov): lo que NO CUPO de una mañana cuyo día real empezó tarde → un hueco libre a hora fija (_meta.no_cupo; se valida y se pinta más abajo,
 *  tras los diferidos) · pagsDe: «p. 1-27 de 48 (temas …)» → «las p. 1-27» */
const NO_CUPO = J._meta.no_cupo || [];
const pagsDe = (de) => `las ${(/^p\. \d+(?:-\d+)?/.exec(String(de)) || [String(de)])[0]}`;
function unidades(it) {
  // v6.09b: Theoesencial = páginas × 1′ (sin «duracion» en minutos)
  if (it.modo === 'theoesencial') {
    if (!AREA[it.area] || !(it.paginas > 0) || !it.de) aborta(`ítem Theoesencial (${it.fecha}): área, páginas y «de» obligatorios`);
    // v6.09b lote 1-quater (R2 · N5): el destino de lo que no cabe va AL PRINCIPIO del «cómo» (el Calendar corta el «cómo» a 100-110 caracteres): «Resto (las 4 p
    //   de CI S1) → jue 31-dic 07:30 · Lectura activa…». `resto` = qué páginas · `resto_a` = adónde (con fecha y franja); antes «… Lo que no cabe hoy: las 4 p que
    //   quedan de CI S1, el jue 31-dic» al final (pos. 160-210)
    if (!!it.resto !== !!it.resto_a) aborta(`ítem Theoesencial (${it.fecha}): «resto» y «resto_a» van juntos (qué páginas no caben y adónde van, con fecha)`);
    if (it.resto_a && !/(?:lun|mar|mié|jue|vie|sáb|dom) \d{1,2}-(?:ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/.test(it.resto_a)) aborta(`ítem Theoesencial (${it.fecha}): resto_a «${it.resto_a}» sin fecha`);
    const ex = it.paginas * THEO_P;
    // v6.10z (lun 23-nov): si el día real de esta mañana empezó tarde y su Theoesencial va a un hueco libre (_meta.no_cupo), el paso lo dice justo detrás del
    //   «Resto (…) → …» (dentro del corte del Calendar), con la franja fija; el resto de la mañana no se re-hora. Fecha de destino = un sábado (sin alias: no se traduce)
    const nc = NO_CUPO.find((x) => x.de === it.fecha && x.item === it.item);
    //   (la fecha, dentro de los 100 primeros del «cómo»: check_rutina_guia 26h)
    const ncTxt = nc ? `Si hoy no cupo: ${pagsDe(it.de)} → ${corta(nc.fecha)} ${nc.franja.join('-')} (bloque fijo; la mañana empezó a las ${nc.inicio_real}) · ` : '';
    return [{ tipo: 'theo', area: it.area, paginas: it.paginas, min: Math.round(ex), exact: ex,
      que: (min) => `Theoesencial de ${AREA[it.area]} · ${it.de} → ${min}′ (${it.paginas} p a ${THEO_P}′ por página)`,
      como: `${it.resto ? `Resto (${it.resto}) → ${it.resto_a} · ` : ''}${ncTxt}${cap(MODO.theoesencial)}. Ruta: ${RUTA.theoes(AREA[it.area])}.`, enlace: L99 }];
  }
  const durJ = durMin(it.duracion);
  const cod = it.codigos && it.codigos.length ? ` (${it.codigos.join(' · ')})` : '';
  const s = /^(SP|CI|GES|INV|ET) S(\d)(?:-S?(\d))?\b(.*)$/.exec(it.item);
  if (s && (it.modo === 'video' || it.modo === 'texto')) {
    const a = s[1], i0 = Number(s[2]), i1 = Number(s[3] || s[2]);
    const lista = []; for (let i = i0; i <= i1; i++) lista.push(i);
    const totalSeg = lista.reduce((acc, i) => acc + SES[`${a} S${i}`], 0);
    // la tabla de Theomed (duración de cada vídeo, en segundos) manda sobre la suma escrita en el JSON: si no coinciden, aviso (no se aborta)
    if (Math.abs(totalSeg / 60 - durJ) > 3) AVISOS.push(`«${it.item}» (${it.fecha || '?'}) dice ${it.duracion} y la tabla de Theomed (THEOMED_Y_DRIVE §1.3) suma ${durTxt(Math.round(totalSeg / 60))}: se usa la tabla`);
    const v = it.modo === 'video' ? (/^2×/.test(it.velocidad || '') ? 2 : VEL_VIDEO) : null;
    return lista.map((i) => {
      const seg = SES[`${a} S${i}`];
      const extra = s[4] && i0 === i1 ? s[4].trim() : '';
      if (it.modo === 'video') {
        // v6.09b: el vídeo pide pausas (antes de cada diapositiva de concepto) → ×1,2
        const ex = seg / 60 / v * PAUSA;
        return {
          tipo: 'sesion', modo: it.modo, area: a, s: i, min: Math.round(ex), exact: ex, postTest: `${a} S${i}`, codigos: it.codigos || [],
          que: (min) => `${a} S${i}${extra ? ' ' + extra : ''} · vídeo ${segTxt(seg)} → ${min}′ a ${vel(v)} con pausas${cod}`,
          como: `${MODO.video.replace(/^vídeo a 1,75× \(2× donde se indica\)/, `Vídeo a ${vel(v)}`)}. Los minutos llevan las pausas (vídeo ÷ ${vel(v)} × ${String(PAUSA).replace('.', ',')}). Notas SOLO en forma de pregunta. Ruta: ${RUTA.asinc(AREA[a], i)}.${metodoSec(a, it.fecha)}`,
          enlace: L99,
        };
      }
      // v6.09b lote 1-quater FX1 (revisión V1 · TEXTO PRIMERO): el texto primero se MIDE con las reglas fijas (antes «vídeo ÷ 3», una constante que no estaba en
      //   _meta.reglas_tiempo: la CI S5 daba 17′ para PPT + ≈17 p de Theoesencial) → material = PPT de la sesión (ppt_min) + Theoesencial de sus temas (páginas del
      //   área ÷ sesiones, a theo_min_por_p) + la norma del tema con lo que sobre (a pdf_min_por_p, entera por páginas); el vídeo, 0′ (solo en lo que no se
      //   entienda, dentro de esos minutos). Minutos = los de siempre (vídeo ÷ texto_div), nunca por debajo de lo que pide PPT + Theoesencial a ratio 1,15
      //   (mMin: la mañana que no los tiene cede minutos o pone la clase densa a 2×, en el JSON); el --check aborta si el paso sale de [0,85; 1,15].
      const pT = THEO_P_AREA[a] / N_SES[a], exT = PPT_MIN + pT * THEO_P, mMin = Math.ceil(exT / 1.15 - 1e-9);
      const mat = (min) => { const k = Math.max(0, Math.floor((min - exT) / PDF_P)); return { k, ex: exT + k * PDF_P }; };
      // v6.10j (auditoría c14, dias-clave #7): la suma escrita CIERRA con los minutos del paso. Las páginas del Theoesencial son una media (páginas del área ÷
      //   sesiones) y el paso puede quedarse hasta un 15 % corto (mMin): entonces el texto dice en cuántos minutos van esas páginas («25′ = PPT 10′ +
      //   Theoesencial ≈17 p en 15′»; antes «25′ = PPT 10′ + Theoesencial ≈17 p», que a 1′/p son 27′).
      const theoTxt = (min, k, como = false) => {
        const pR = Math.round(pT), tMin = min - PPT_MIN - k * PDF_P;
        return tMin === pR * THEO_P ? (como ? `≈${pR} p a ${THEO_P}′/p` : `Theoesencial ≈${pR} p`) : `${como ? '' : 'Theoesencial '}≈${pR} p en ${tMin}′${como ? `, a ≈${String(Math.round((tMin / pR) * 10) / 10).replace('.', ',')}′/p` : ''}`;
      };
      return {
        tipo: 'sesion', modo: it.modo, area: a, s: i, min: Math.max(mMin, Math.round(seg / 60 / VEL_TEXTO)), mMin, exact: exT, postTest: `${a} S${i}`, codigos: it.codigos || [],
        que: (min) => {
          const { k, ex } = mat(min);
          if (ex / min < 0.85 || ex / min > 1.15) aborta(`${a} S${i} (texto primero): ${ex.toFixed(1)}′ de material (PPT ${PPT_MIN}′ + Theoesencial ${pT.toFixed(1)} p${k ? ` + norma ${k} p` : ''}) en ${min}′ (ratio ${(ex / min).toFixed(2)}, fuera de [0,85; 1,15])`);
          return `${a} S${i}${extra ? ' ' + extra : ''} · TEXTO PRIMERO (${min}′ = PPT ${PPT_MIN}′ + ${theoTxt(min, k)}${k ? ` + norma ${k} p` : ''}; vídeo de ${segTxt(seg)}, solo para dudas)${cod}`;
        },
        como: null, comoDe: (min) => {
          const { k } = mat(min);
          return `En este orden: PPT de la sesión (${PPT_MIN}′) → Theoesencial de sus temas (${theoTxt(min, k, true)}) → ${k ? `la norma del tema, hasta ${k} p a ${PDF_P}′/p (definiciones → tablas → cifras)` : 'la norma del tema, en los pasos de norma y cifras de hoy (aquí no quedan minutos)'}. El vídeo, solo en lo que no entiendas${it.velocidad ? ` (${it.velocidad})` : ''} y dentro de estos minutos. Notas SOLO en forma de pregunta. Ruta: ${RUTA.asinc(AREA[a], i)}.${metodoSec(a, it.fecha)}`;
        },
        enlace: L99,
      };
    });
  }
  const b = /^Banqueo (\d+)\/19/.exec(it.item);
  if (b && it.modo === 'activo') {
    // v6.09b: a 1,25× + la pausa antes de cada respuesta (×1,2): 1 h → 58′ (antes «activo = su duración»)
    // v6.10j (auditoría c14, dias-clave #7): «video» (mm:ss, THEOMED_Y_DRIVE §1.3) = la duración real cuando «duracion» la redondea (Banqueo 1/19: 27:37, no
    //   28′) · y si el reparto de la franja le da al paso ≥1′ más (o menos) que la cuenta, el «cómo» escribe el resultado y qué hacer con la diferencia (antes
    //   «28′ a 1,25× con pausa → 28′ … (28′ ÷ 1,25× × 1,2)», que da 26,9′, y «1 h 00′ → 59′»).
    const segV = it.video ? (/^(\d+):(\d{2})$/.exec(it.video) || []).slice(1).reduce((a, x, i) => a + Number(x) * (i ? 1 : 60), 0) : null;
    if (it.video && (!segV || Math.abs(segV / 60 - durJ) > 1)) aborta(`«${it.item}» (${it.fecha}): video «${it.video}» ilegible o lejos de su duración (${it.duracion})`);
    const durV = segV ? segV / 60 : durJ, durS = segV ? segTxt(segV) : durTxt(durJ);
    const ex = durV / VEL_ACTIVO * PAUSA;
    const cuenta = `${durS} ÷ ${vel(VEL_ACTIVO)} × ${String(PAUSA).replace('.', ',')}`, dec = (x) => String(Math.round(x * 10) / 10).replace('.', ',');
    //   La diferencia va en el «qué» (el Calendar corta el «cómo» a 110: «… = 26,5′ …» sin explicar los 28′ del paso).
    return [{ tipo: 'activo', min: Math.round(ex), exact: ex,
      que: (min) => `${it.item} · ${durS} a ${vel(VEL_ACTIVO)} con pausa${min - ex >= 0.95 ? ` = ${dec(ex)}′ + ${dec(min - ex)}′ para releer las que fallaste` : ''} → ${min}′ · ACTIVO`,
      como: `${cap(MODO.activo)} (${cuenta}). Ruta: ${RUTA.adic} › banqueo semanal grabado.`,
      comoDe: (min) => `${cap(MODO.activo)} (${cuenta}${Math.abs(min - ex) >= 0.95 ? ` = ${dec(ex)}′` : ''}${ex - min >= 0.95 ? `: en ${min}′, sin pausa en las que sepas seguro` : ''}). Ruta: ${RUTA.adic} › banqueo semanal grabado.`, enlace: L116 }];
  }
  if (/^Revisión normativa/.test(it.item)) {
    const pdf = Number((/PDF (\d+) p/.exec(it.item) || [])[1] || 0);
    const ex = durJ / VEL_TEXTO + pdf * PDF_P; // v6.09b: PDF a 2′/página (antes 1′)
    // v6.10l (auditoría c15 · dias-clave #3): la suma escrita CIERRA con los minutos del paso, como en las sesiones en texto primero (antes «(35′: vídeo de 35′ +
    //   PDF de 11 p)», que no suma 35, y un «cómo» que repartía PPT + Theoesencial sin minutos): PDF a 2′/p + el resto, el vídeo a 2× solo en lo que el PDF no
    //   aclare (≈ vídeo ÷ texto_div); sin páginas en el JSON, los minutos son vídeo ÷ texto_div con el PDF en texto primero (remate v6.10l: sin el «÷ 3» a la
    //   vista, que se leía como «el vídeo a 3×»: los minutos, el PDF a su ritmo por página y el vídeo a 2× solo para dudas)
    const queRN = (min) => {
      if (!pdf && Math.abs(min - durJ / VEL_TEXTO) >= 1) aborta(`«${it.item}» (${it.fecha}): ${min}′ ≠ vídeo de ${it.duracion} ÷ ${VEL_TEXTO} (la suma escrita no cerraría)`);
      if (pdf && min - pdf * PDF_P < 1) aborta(`«${it.item}» (${it.fecha}): ${min}′ no dan para el PDF de ${pdf} p a ${PDF_P}′/p y algo de vídeo`);
      return `${it.item} · TEXTO PRIMERO (${pdf ? `${min}′ = PDF ${pdf} p en ${pdf * PDF_P}′ + ${min - pdf * PDF_P}′ de vídeo a 2×, solo para dudas` : `${min}′ = ${ppSin(min) * PDF_P}′ de PDF —sus páginas clave, a ${PDF_P}′/p— + ${min - ppSin(min) * PDF_P}′ de vídeo a 2×, solo para dudas`})${cod}`;
    };
    // v6.10m (auditoría c16 · cambios-c16 #14): sin páginas en el JSON (N°2, ITS: el PDF del campus no tiene su nº de páginas en el repo), la cuenta CIERRA con los
    //   minutos del paso (vídeo ÷ texto_div, sin cambio): las ≈N páginas clave del PDF a 2′/p + 2′ de vídeo a 2× solo para dudas (antes «10′: el PDF primero, a
    //   2′/p; el vídeo de 31′ …», que con un PDF de más de 5 p no cabía en 10′). Lo que el PDF no cubra de ITS/VIH lo leen las normas de la semana de esa mañana
    // remate v6.10m (rev. c16 · verdad #2 y visibilidad #3): «8′ de PDF —sus páginas clave, a 2′/p—» = un tope de tiempo, no un dato del PDF (antes «las ≈4 p clave
    //   del PDF», que parecía su nº de páginas); el «cómo», sin «de la revisión (la norma: …» (el «qué» ya la nombra), para que el paréntesis cierre dentro del corte
    const ppSin = (min) => Math.max(1, Math.floor((min - 2) / PDF_P));
    return [{ tipo: 'texto', min: Math.round(ex), exact: ex, codigos: it.codigos || [], que: queRN, como: `Primero ${pdf ? 'el PDF' : 'las páginas clave del PDF'} (definiciones de las primeras páginas, tablas, flujogramas, cifras), a ${PDF_P}′ por página; después el vídeo (${it.duracion}) a 2×, solo en lo que el PDF no aclare. Ruta: ${RUTA.adic} › revisiones normativas.`, enlace: L116 }];
  }
  const v = /^(SP|CI|GES|INV|ET) (\d+)\/(\d+)\b(.*)$/.exec(it.item);
  if (v && it.modo === 'vivo_diferido') {
    const cond = /si no la viste en vivo/.test(it.item);
    // v6.09b lote 1-ter (hallazgo 6): `si_en_vivo` { sab, adelanta, min } = UN solo plan con minutos en los dos casos: vista en vivo → su tramo 17:00-17:30
    //   (TRAMO_MIN) + `min` de lo que falta de la clase `adelanta` (sale de su domingo de resto_en); no vista → la clase entera (antes: «este tiempo va a la
    //   otra clase o a la norma del tema», sin decir cuál)
    const sev = it.si_en_vivo || null;
    if (sev) {
      const sb = J.sabados.find((x) => x.fecha === sev.sab);
      if (cond || !sb || !sb.vivo || AREA_DE_NOMBRE(sb.vivo) !== v[1] || !sb.vivo.includes(`${v[2]}/${v[3]}`)) aborta(`«${it.item}» (${it.fecha}): si_en_vivo.sab ${sev.sab} no es el sábado de la clase en vivo ${v[1]} ${v[2]}/${v[3]} (y el ítem ya no dice «si no la viste en vivo»)`);
      // FX1: con el tramo a 9′ (60 % a 2×) la clase entera (45′) = tramo + adelanta + lo que sobra (va a la norma del día, que la rama B no hace)
      if (!COD_CLASE_V.test(sev.adelanta || '') || TRAMO_MIN + sev.min > vivoMin(durJ)) aborta(`«${it.item}» (${it.fecha}): si_en_vivo › tramo ${TRAMO_MIN}′ + adelanta ${sev.min}′ > ${vivoMin(durJ)}′ (la clase entera)`);
      ADELANTOS.push({ en: it.fecha, por: `${v[1]} ${v[2]}/${v[3]}`, sab: sev.sab, clase: sev.adelanta, min: sev.min, usado: false });
    }
    // v6.09b: REGLA FIJA = 60 % de la clase a 2× (2 h 30 → 45′); `min` del JSON = la mañana no da para el 60 % → lo que falta, explícitamente en audio
    const ref = vivoMin(durJ);
    if (it.min != null && !(it.min > 0 && it.min < ref)) aborta(`«${it.item}» (${it.fecha}): «min» ${it.min} solo vale por debajo del ${pct100(VIVO_FRAC)} de la clase (${ref}′)`);
    // v6.09b lote 1-bis (hallazgo 6): con `min`, lo que falta hasta el 60 % va a un domingo con ENCAPS (resto_en), posterior a la mañana; sin `min`, nada
    if ((it.min != null) !== !!it.resto_en) aborta(`«${it.item}» (${it.fecha}): «resto_en» va solo (y siempre) con «min»: lo que falta hasta el ${pct100(VIVO_FRAC)} necesita fecha`);
    if (it.resto_en && (!domConEncaps(it.resto_en) || it.resto_en <= realDe(it.fecha))) aborta(`«${it.item}» (${it.fecha}${realDe(it.fecha) !== it.fecha ? `, se hace el ${realDe(it.fecha)}` : ''}): resto_en ${it.resto_en} no es un domingo con ENCAPS posterior a su día real (domingos del JSON sin «sin_sesion» ni «manana»)`);
    if (it.resto_en) RESTOS.push({ dom: it.resto_en, de: it.fecha, clase: `${v[1]} ${v[2]}/${v[3]}`, item: it.item, dur: durJ, min: it.min, resto: ref - it.min });
    const cls = `${v[1]} ${v[2]}/${v[3]}`;
    const comoVivo = `${cap(MODO.vivo_diferido)}. Primero el PPT; el vídeo solo donde el PPT no explica. Ruta: ${RUTA.vivo(AREA[v[1]])}.`;
    // v6.09b lote 1-quater (R2 · N7, CI 3/8): el caso POR DEFECTO es que la clase del sábado se vio EN VIVO (el plan la tiene en vivo de 15:00 a 17:00) → hoy
    //   solo su tramo 17:00-17:30 (TRAMO_MIN) y los si_en_vivo.min restantes COMPLETAN HOY la clase `adelanta` de esta misma mañana (llega al 60 %: su resto_en ya
    //   no lleva nada). Plan B, con minutos en los dos lados: sin verla en vivo, la clase entera aquí y lo que falta de `adelanta` vuelve a su resto_en (el
    //   domingo lo dice en su plan B). Antes (lote 1-ter) el «qué» decía la clase entera (el caso menos probable) y el dom 3-ene cargaba 30′ NO opcionales.
    const mDia = J.mananas.find((x) => x.fecha === it.fecha) || null;
    if (sev) {
      const itA = mDia && mDia.teoria.find((t) => t.item.startsWith(`${sev.adelanta} `) && t.resto_en);
      if (!itA) aborta(`«${it.item}» (${it.fecha}): si_en_vivo.adelanta ${sev.adelanta} no es una clase con resto_en de esta misma mañana (el adelanto va hoy)`);
      if (itA.min + sev.min !== vivoMin(durMin(itA.duracion))) aborta(`«${it.item}» (${it.fecha}): ${sev.adelanta} ${itA.min}′ + adelanta ${sev.min}′ ≠ su ${pct100(VIVO_FRAC)} (${vivoMin(durMin(itA.duracion))}′)`);
      // v6.09b lote 1-quater FX1 (revisión V2/V3 · CI 3/8 rama B): la rama «no la viste en vivo» con su HORARIO (antes «aquí la clase entera en lugar del tramo»: leída
      //   tal cual, la clase de 45′ entraba a las 05:15 y cruzaba la rutina de 05:45-07:15 y el paso de las 07:15 se quedaba vacío). {{RB_CI}} / {{RB_SP}} = sus tramos
      //   reales (los pone la mañana, ya partida en tramos: dom 27-dic 05:15-05:45 + 07:15-07:30 y 07:30-07:45)
      return [{ tipo: 'vivo', area: v[1], dur: durJ, min: TRAMO_MIN, exact: TRAMO_MIN, postTest: cls, siEnVivo: true, sev, itA,
        que: (min) => `${it.item} · tramo 17:00-17:30 de la clase (30′) en la grabación → ${min}′ a ${vel(VIVO_VEL)} (${pct100(VIVO_FRAC)}; vista en vivo, lo esperado)`,
        como: `Sin verla en vivo (${corta(sev.sab)}): ${sev.adelanta} −${sev.min}′ → ${corta(itA.resto_en)} (antes de su 1.er paso: lo dice su aviso); aquí la clase entera, ${ref}′ = {{RB_CI}}, y la ${sev.adelanta} solo {{RB_SP}}{{RB_NORMA}}. Vista en vivo (lo esperado): lo que no viste (a las 17:00 empieza el baile), desde el minuto que anotaste; la grabación ya está publicada. Notas SOLO en forma de pregunta; ★ lo que sea cifra, plazo o definición textual. Ruta: ${RUTA.vivo(AREA[v[1]])}.`,
        enlace: L99 }];
    }
    const adelPor = it.resto_en && mDia ? mDia.teoria.find((t) => t.si_en_vivo && it.item.startsWith(`${t.si_en_vivo.adelanta} `)) : null;
    if (adelPor) {
      const sv = adelPor.si_en_vivo, por = (/^(\S+ \d+\/\d+)/.exec(adelPor.item) || [])[1];
      // FX1: {{RB_SP_PARTE}} = qué pasa a ESTA hora en la rama B (lo rellena la mañana según la parte: 1.ª parte = la CI 3/8 sigue · 2.ª parte = CI 3/8 + SP 2/11)
      return [{ tipo: 'vivo', area: v[1], dur: durJ, min: ref, exact: ref, postTest: cls, adelPor: true,
        que: (min) => vivoQue(it.item, durJ, min, null),
        como: `{{RB_SP_PARTE}}Con la ${por} vista en vivo (lo esperado), hoy los ${ref}′: los ${sv.min}′ que le faltaban hasta el ${pct100(VIVO_FRAC)} se adelantan a hoy. ${comoVivo}`,
        rbTxt: { por, sab: sv.sab, min: it.min, resto: sv.min, dest: it.resto_en }, enlace: L99 }];
    }
    const ex = it.min != null ? it.min : durJ * VIVO_FRAC / VIVO_VEL;
    // v6.09b lote 1-quater (R2 · N6, CI 2/8 del vie 27-nov): la clase «si no la viste en vivo» ya no dice «este tiempo va a la otra clase o a la norma del tema»
    //   (sin material ni minutos): las 18:00 escriben la rama «vista en vivo» con sus minutos (cond) y la `alternativa` (plan B de otra clase) va a su plan B
    return [{ tipo: 'vivo', cond, area: v[1], dur: durJ, min: Math.round(ex), exact: ex, postTest: cls, ...(it.alternativa ? { alt: it.alternativa } : {}),
      que: (min) => vivoQue(it.item, durJ, min, it.resto_en ? destDomCorto(it.resto_en, ref - it.min) : null),
      como: comoVivo, enlace: L99 }];
  }
  // v6.09b lote 1-bis (hallazgo 2): preguntas en bloque dentro de la teoría (mar 5-ene: las 10Q que no caben en el banqueo de las 09:45, con su corrección)
  if (it.modo === 'preguntas') {
    if (!(it.n > 0) || !it.motivo) aborta(`«${it.item}» (${it.fecha}): modo preguntas sin n o sin motivo`);
    const mQ = Math.ceil(it.n * 72 / 60), mC = Math.ceil(it.n * CORR_Q);
    if (mQ + mC !== durJ) aborta(`«${it.item}» (${it.fecha}): ${it.n}Q × 72 s + corrección ${it.n} × ${CORR_Q}′ = ${mQ + mC}′ y la duración dice ${it.duracion}`);
    return [
      { tipo: 'preguntas', min: mQ, exact: it.n * 1.2, que: (min) => `${it.n}Q de ${it.item} · EN BLOQUE CRONOMETRADO · modo examen (72 s c/u) → ${min}′`, como: `Sin mirar nada. ${RESERVA} ${it.motivo} ${CONFIANZA}` },
      { tipo: 'preguntas', min: mC, exact: it.n * CORR_Q, que: (min) => `Cada fallo y cada dudosa de las ${it.n}Q → ${min}′`, como: `${cap(TIPOS_ERROR)}. ${String(CORR_Q).replace('.', ',')}′ por pregunta.` },
    ];
  }
  if (/^Normas de la semana|^Hoja de reglas/.test(it.item)) {
    const normas = /^Normas/.test(it.item);
    if (!normas) return [{ tipo: 'presupuesto', min: durJ, exact: durJ, que: (min) => `${it.item} · ${durTxt(min)}`, como: 'Tapa la regla, dila en voz alta, comprueba. Las que no salgan → ★ y tarjeta a las 11:40.' }];
    // v6.09b lote 1-ter (pendiente a1-18 de G · «material no medible → ACOTAR su alcance al tiempo»): las normas de la semana se acotan a PÁGINAS a 2′/p
    //   (1 h 15′ = hasta 37 p; 1 h 35′ = hasta 47 p), repartidas entre sus normas (teoria[].lectura), en el orden definiciones → tablas/flujogramas → plazos y
    //   cifras. Lo que no se lea de una norma con DEEP PRIME en la intensiva (lectura[].dp + fecha, comprobado contra la fila del SQL: día de loop con ese
    //   código) va a ese DEEP PRIME; las que no tienen sesión en la intensiva van primero y su resto queda para el plan de 2027 (pendiente declarado).
    // v6.09b lote 1-quater (R2 · N2): «lo fecha el plan de 2027» era un destino sin fecha ni franja → las normas sin DEEP PRIME son lectura de VERIFICACIÓN
    //   ACOTADA (≈porN p de cada una, en el orden de arriba; como en cfb15b5, nunca prometió leerse entera) y el texto lo dice: «el resto de la norma no es tarea
    //   de F1». Las que sí tienen DEEP PRIME con fecha (vacunas II-3 13-ene · anemia II-4 21-ene · interculturalidad III-5 20-ene) siguen yendo allí.
    const Ls = it.lectura;
    if (!Array.isArray(Ls) || !Ls.length || Ls.some((x) => !x.norma || !x.corto || (!!x.dp !== !!x.fecha))) aborta(`«${it.item}» (${it.fecha}): lectura[] { norma, corto, dp + fecha (o ninguno) } obligatoria`);
    for (const x of Ls.filter((y) => y.fecha)) {
      if (!x.fecha.startsWith('2027-') || !new RegExp(`'${x.fecha}','[^']+','loop','${x.dp.replace(/\+/g, '\\+')}'`).test(SQL_INT())) aborta(`«${it.item}» (${it.fecha}): lectura ${x.corto} → ${x.fecha} no es un día de loop (DEEP PRIME) de ${x.dp} en _encaps_intensivo_2027.sql`);
    }
    const pags = Math.floor(durJ / PDF_P), porN = Math.floor(pags / Ls.length);
    const conDP = Ls.filter((x) => x.fecha), sinDP = Ls.filter((x) => !x.fecha);
    // v6.09b lote 1-quater FX1 (revisión V2): las fechas de destino primero (el Calendar corta el «cómo» a 100) y los sub-ejes después; la CRED tiene DEEP PRIME
    //   (II-4, mié 24-feb: «… + CRED» en el SQL) → ya no es «no es tarea de F1». Las normas sin DEEP PRIME: «no se lee … (no vuelve en la intensiva)», que es la verdad.
    const dpTxt = conDP.length ? `Lo no leído → DEEP PRIME 09:00: ${conDP.map((x) => `${x.corto} ${corta(x.fecha)}`).join(' · ')} (${conDP.map((x) => x.dp).join(' · ')}). ` : '';
    const lista = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} y ${xs.at(-1)}` : xs[0]);
    const sinTxt = sinDP.length ? `${cap(lista(sinDP.map((x) => x.corto)))}${conDP.length ? ', primero' : ''}: lectura de VERIFICACIÓN acotada, hasta ≈${porN} p ${sinDP.length > 1 ? 'de cada una' : ''}; el resto de ${sinDP.length > 1 ? 'esas normas' : 'la norma'} no se lee (no vuelve en la intensiva: no tiene DEEP PRIME). `.replace(' ;', ';') : '';
    return [{ tipo: 'presupuesto', min: durJ, exact: pags * PDF_P, que: (min) => `${it.item} · ${durTxt(min)} = hasta ${Math.floor(min / PDF_P)} p a ${PDF_P}′/p (≈${porN} p por norma)`,
      como: `${dpTxt}${sinTxt}En cada norma, en este orden: definiciones → tablas/flujogramas → plazos y cifras (no lineal). Cada dato que dudes → tarjeta a las 11:40. Ruta: ${RUTA.normas}.`,
      enlace: L99 }];
  }
  aborta(`no sé expandir el ítem de teoría «${it.item}» (modo ${it.modo})`);
}
const CAP_TEORIA = aMin('09:15') - aMin('07:30');
const CAP_TARDE = 45;
/** Reparte la teoría del día en la franja de 105′ (en orden, unidades enteras) y lo que no cabe → 18:00.
 *  v6.09b: sin unidades elásticas (la clase en diferido tiene regla fija). Redondeo que conserva la suma: si una unidad no entra por ≤ 1′ de redondeo
 *  (Σ de lo que pide de verdad ≤ franja + 0,5′), la unidad más redondeada hacia arriba cede ese minuto (mié 25-nov: banqueo 57,6′ + CI S1 47,5′ =
 *  105,1′ → 58 + 47). Lo que sobra (< 5′) se reparte 1′ a 1′ entre las unidades más largas; ≥ 5′ = la norma del día (si no hay norma, ABORTA: cada
 *  minuto de la teoría lleva material). */
function repartir(dia) {
  const us = dia.teoria.flatMap((t, k) => unidades({ ...t, fecha: dia.fecha }).map((u) => Object.assign(u, { item_k: k }))); // v6.10j: item_k → título de la TEORÍA
  // v6.08: `a_las_18` = teoría que va DIRECTAMENTE a las 18:00 (jue 31-dic: SP 6/11, que no cabe en ninguna mañana); va antes que lo que no cupo
  const manana = [], tarde = (dia.a_las_18 || []).flatMap((t) => unidades({ ...t, fecha: dia.fecha })).map((u) => ({ ...u, forzada: true }));
  let usado = 0;
  for (const u of us) {
    if (usado + u.min <= CAP_TEORIA) { manana.push(u); usado += u.min; continue; }
    const exTot = [...manana, u].reduce((a, x) => a + x.exact, 0);
    if (usado + u.min - CAP_TEORIA === 1 && exTot <= CAP_TEORIA + 0.5) {
      const cede = [...manana, u].filter((x) => x.min - x.exact > 0).sort((x, y) => (y.min - y.exact) - (x.min - x.exact))[0];
      if (cede) { cede.min -= 1; if (cede !== u) usado -= 1; manana.push(u); usado += u.min; continue; }
    }
    // v6.09b lote 1-quater FX1 (V1 · TEXTO PRIMERO): si no entra por ≤ 2′, ceden 1′ las unidades que siguen dentro de ratio 1,15 al cederlo (el texto primero, nunca
    //   por debajo de su mMin; la clase en diferido y los presupuestos, nunca), la más redondeada hacia arriba primero (mié 2-dic: el banqueo grabado 58′ → 57′)
    const over = usado + u.min - CAP_TEORIA;
    if (over <= 2) {
      const pool = [...manana, u].filter((x) => !['presupuesto', 'vivo'].includes(x.tipo) && x.min - 1 >= Math.max(x.mMin || 0, x.exact / 1.15)).sort((x, y) => (y.min - y.exact) - (x.min - x.exact));
      if (pool.length >= over) { for (const x of pool.slice(0, over)) { x.min -= 1; if (x !== u) usado -= 1; } manana.push(u); usado += u.min; continue; }
    }
    tarde.push(u);
  }
  let libre = CAP_TEORIA - usado;
  if (libre >= 5 && !normaTxt(dia)) aborta(`${dia.fecha}: sobran ${libre}′ en la teoría y no hay norma del día ni otro material con fecha: completa la mañana en el JSON`);
  if (libre > 0 && libre < 5) {
    const orden = manana.filter((x) => x.tipo !== 'presupuesto').sort((x, y) => y.min - x.min);
    for (let i = 0; libre > 0 && orden.length; i = (i + 1) % orden.length) { orden[i].min += 1; libre -= 1; }
  }
  for (const x of [...manana, ...tarde]) if (x.comoDe) x.como = x.comoDe(x.min); // FX1: el «cómo» del texto primero dice sus páginas con los minutos finales
  const pend = tarde.reduce((a, u) => a + u.min, 0);
  if (pend > CAP_TARDE) aborta(`${dia.fecha}: lo que no cabe en la teoría (${pend}′) no cabe tampoco a las 18:00 (${CAP_TARDE}′)`);
  return { manana, tarde, libre };
}

// ── textos comunes ─────────────────────────────────────────────────────────────────────────────────────────────
const FUENTES = J._meta.banqueo_fuentes.replace(/^por orden:\s*/, '').replace(/\.?\s*El material de academias no se copia al repo ni a la app\.?$/, '');
// v6.10z-e (chat ENCAPS): la cuarentena va PRIMERO y justo detrás de «Sin mirar nada.» (el corte del Calendar la dejaba fuera en los banqueos de 50Q)
// v6.11 (pendiente 21.2): la frase vive en encaps_guia_catalogo.js (la misma la dicen los pasos de las 16:15 con preguntas de QX / DR LOPEZ / Theomed);
//   sus fechas = el pre-test 2026-II de _fechas_v6.json y el dress_rehearsal del SQL de la intensiva (si se mueven, aborta en vez de citar un día falso)
const { RESERVA, RESERVA_FECHAS, reservaDe, PIZARRA, FUGA } = require('./encaps_guia_catalogo'); // ronda c40: + PIZARRA (regla de la pizarra, común con gen_encaps_guia.js) · ronda c44: + FUGA (regla de fuga por id, común con gen_encaps_minisim.js)
if (F6.encaps.pretest !== RESERVA_FECHAS.pretest || !RESERVA.includes(corta(RESERVA_FECHAS.pretest)) || !RESERVA.includes(corta(RESERVA_FECHAS.ensayo))) aborta(`RESERVA (encaps_guia_catalogo.js): pre-test ${RESERVA_FECHAS.pretest} / ensayo ${RESERVA_FECHAS.ensayo} ≠ _fechas_v6.json (${F6.encaps.pretest}) o la frase no los cita`);
// v6.10z-d (lun 23-nov, chat ENCAPS): % CIEGO = correctas Y seguras ÷ total (como FASE_INTENSIVA_2027-I.md: «correctas seguras / total»), y se calcula en la
//   CORRECCIÓN, con la clave (antes «el % CIEGO = seguras ÷ total», que contaba una segura FALLADA como ciega). La definición, en frase propia: el corte del
//   Calendar (110) llega hasta «÷ total» en el paso del banqueo («Sin mirar nada. Confianza…»); el «cuándo», detrás
const CONFIANZA = 'Confianza en cada una: segura · dudosa · adivinada. % CIEGO = correctas Y seguras ÷ total (en la corrección, con la clave).';
// v6.10z-d (lun 23-nov, chat ENCAPS): regla de los post-tests de Theomed (mañanas y clases en vivo), al PRINCIPIO del «cómo» de su paso (build_ops le da el corte
//   del Calendar hasta el final de esta frase)
const POST_TEST_ENVIO = 'Un post-test sin terminar NO se envía (al enviarlo, el campus enseña la revisión con respuestas de preguntas que pasan al banqueo); se envía al terminarlo y se mira SOLO la nota; la revisión se abre en la corrección.';
const TIPOS_ERROR = 'tipo de error (concepto · cifra · lectura · confusión entre vecinos) + regla de 1 línea en el registro';
const CRITICOS = 'I-3 · V-2 · IV-1+IV-2 · I-4 · II-3 · III-5 · II-5 · II-4';
/** «sábado 14:00» (F1 y transición, con la clase en vivo) o «sáb 9-ene 07:15» (F2): la revisión semanal que recoge el registro de `iso`. */
// v6.09 (16-nov-2026): un sábado SIN SESIÓN (corrida_s1.sin_sesion; v6.09: sáb 21-nov, viaje) no tiene revisión → la del sábado siguiente, con su fecha
//   («sáb 28-nov 14:00»: la revisión S01 va junto con la S02); antes «sábado 14:00» también la semana del 17 al 20-nov
// v6.10e (revisión del 18-nov · dias-1920-10): un sábado sin sesión cuyo domingo es de LLEGADA (dom 22-nov) tiene su revisión ESE domingo, 30′ antes de la
//   recuperación ENCAPS (= rutinaGuia.revisionDomingoDe: «revisión S01 del dom 22-nov 14:30»); antes se saltaba al sábado siguiente (sáb 28-nov = la S02)
// v6.10h (revisión del 18-nov · c10 MEDIA): el sábado siguiente al día REAL del registro (alias de corrida_s1): la mañana 2/21 es de plan vie 20-nov y se hace
//   el lun 23 → su revisión es la del sáb 28-nov 14:00 («sábado 14:00»), no la del dom 22-nov 14:30 (un día antes del propio registro)
const revSab = (iso0) => {
  const iso = realDe(iso0);
  let s = addDias(iso, ((6 - dow(iso)) + 7) % 7 || 7), salto = false;
  while (SIN_SESION.has(s)) {
    const dom = J.domingos.find((d) => d.fecha === addDias(s, 1) && d.llegada && d.recupera);
    if (dom) { const [h, m] = dom.recupera.franja[0].split(':').map(Number), t = h * 60 + m - 30; return `${corta(dom.fecha)} ${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`; }
    s = addDias(s, 7); salto = true;
  }
  return s <= F6.transicion.hasta ? (salto ? `${corta(s)} 14:00` : 'sábado 14:00') : `${corta(s)} 07:15`;
};
/** v6.10h (c11 · 5-ene): «Hecho» de la TEORÍA según lo que lleva: sesiones (lo de siempre) · hoja de reglas · preguntas en bloque (con su corrección).
 *  Antes, «sesiones vistas o leídas» también el mar 5-ene, que no tiene sesiones (hoja de reglas + 10Q). */
function hechoTeoria(dia) {
  const ts = dia.teoria || [];
  const hoja = ts.some((t) => /^Hoja de reglas/.test(t.item)), qs = ts.filter((t) => t.modo === 'preguntas');
  const ses = ts.some((t) => !/^Hoja de reglas/.test(t.item) && t.modo !== 'preguntas');
  if (!hoja && !qs.length) return 'sesiones vistas o leídas, con notas SOLO en forma de pregunta';
  return [ses ? 'sesiones vistas o leídas, con notas SOLO en forma de pregunta' : null, hoja ? 'hoja de reglas releída entera (las que no salieron, con ★)' : null,
    ...qs.map((q) => `las ${q.n}Q respondidas con su confianza y corregidas (cada fallo con su tipo y su regla de 1 línea)`)].filter(Boolean).join(' · ');
}
// v6.10l (auditoría c15 · vetadas-cortes #25): el criterio entero y corto («manda la más reciente: campus Theomed 2027-I / MINSA»), y DELANTE en los pasos de
//   verificación (el Calendar corta el «cómo» a 110: antes quedaba «… manda la norma más …» en las 19 mañanas)
// v6.10m (auditoría c16 · diffs #24): manda la NORMA más reciente (MINSA o la del campus Theomed 2027-I), no «la más reciente» de las dos fuentes: así se leía
//   como que el material de la academia, por ser más nuevo, prevalece sobre la norma oficial (y el corte del Calendar dejaba solo «(Theomed 2027-I …»)
const VIGENCIA = 'Si dos fuentes no coinciden, manda la norma más reciente (MINSA / campus Theomed 2027-I).';
// v6.10l (remate, revisión adversarial · visibilidad): en los pasos de verificación, QUÉ buscar y el criterio, los dos dentro de los 110 del Calendar (antes
//   el criterio delante dejaba fuera «definición, tabla o flujograma») · v6.10m: «manda la norma más reciente» dentro del corte, con MINSA delante
const VERIF_NORMA = 'Busca definición, tabla o flujograma; si 2 fuentes difieren, manda la norma más reciente (MINSA / Theomed 2027-I).';
const WDL = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
/** v6.07 (fix lote 1b del Calendar): de qué mañana ENCAPS son las tarjetas y los errores del arranque de `hoy` (la anterior es `prev`):
 *  «de ayer» solo si fue el día anterior · «del viernes» / «del lunes» / «del miércoles» si es la mañana ENCAPS anterior de la rotación
 *  (lun · mié · vie: hasta la v6.07 ponía «de ayer» los mié y vie, que siguen a un día de Step) · «del último día ENCAPS, mié 23-dic» si
 *  entre medias un SKIP se comió una mañana ENCAPS (lun 28-dic: el vie 25-dic es SKIP; antes decía «del viernes» y remitía al mié 23-dic). */
function prevMananaTxt(prev, hoy) {
  if (addDias(prev, 1) === hoy) return { de: 'de ayer', saltadas: [] };
  // v6.10w (remate · revisión cobertura/textos): con el intercambio 16/21 ↔ 17/21 la mañana anterior en orden REAL (la 16/21, dom 27-dic: domingo de plan,
  //   fuera del alias) tiene fecha POSTERIOR a la de plan de hoy (la 17/21, plan del mié 23-dic, que se hace el lun 28): su fecha tal cual (no se traduce)
  if (prev > hoy) return { de: `del ${corta(prev)}`, saltadas: [] };
  // v6.08: un día extra tras F1 (mar 5-ene) → la última mañana ENCAPS (jue 31-dic), sin hablar de la rotación ni de los SKIP de por medio
  // v6.10d (fix revisión 18-nov): con la fecha corta (antes «del jueves 31-dic»): la app la traduce a su día real (el jue 31-dic de plan se hace el vie 1-ene)
  if (hoy > F6.f1.fin) return { de: `del ${corta(prev)} (la última mañana ENCAPS)`, saltadas: [] };
  let esperada = addDias(hoy, -1); // la mañana ENCAPS anterior según la rotación (L-V sin Step), ignorando los SKIP
  while (dow(esperada) === 0 || dow(esperada) === 6 || STEP_DIAS.includes(dow(esperada))) esperada = addDias(esperada, -1);
  // v6.10d (fix revisión 18-nov): con el ALIAS de corrida_s1 el nombre del día de la rotación no vale (el plan del vie 20 se hace el lun 23: «del miércoles»
  //   el lun 23 real remitía al jue 19) → la fecha de plan, que la app pinta con su día real
  if (esperada === prev) return { de: realDe(hoy) !== hoy || realDe(prev) !== prev ? `del ${corta(prev)}` : `del ${WDL[dow(prev)]}`, saltadas: [] };
  const saltadas = [];
  // v6.10w (pendientes de la revisión): un SKIP de PLAN que el alias de corrida_s1 usa como día REAL con sesión (vie 25-dic = plan del mar 22-dic) no «fue
  //   SKIP» para Joseph: el texto lo lee el dom 27-dic real; ese día no hubo mañana ENCAPS porque fue día de Step 1, no por SKIP → no se nombra
  for (let d = addDias(prev, 1); d < hoy; d = addDias(d, 1)) if (SKIP.has(d) && !Object.prototype.hasOwnProperty.call(_A1, d) && dow(d) >= 1 && dow(d) <= 5 && !STEP_DIAS.includes(dow(d))) saltadas.push(d);
  // v6.10w (remate): sin SKIP de por medio que Joseph viva como tal (el vie 25-dic de plan tiene sesión real), es la mañana anterior a secas (mié 30-dic real:
  //   «del lun 28-dic»; antes «del último día ENCAPS», que sugería un día perdido)
  if (!saltadas.length && realDe(prev) !== prev) return { de: `del ${corta(prev)}`, saltadas };
  return { de: `del último día ENCAPS, ${corta(prev)}`, saltadas };
}
/** v6.07 (fix): la próxima sesión del Anki 05:30 de ENCAPS tras `iso` (para las ★ de las cifras de las 18:00): «mañana» · «el lunes» · «el jue 24-dic».
 *  v6.08 (fix revisión 14-nov, dia1): sin Anki 05:30 de F1 después (mié 30-dic → transición · mar 5-ene, ya en F2) → el primer Anki 05:00 de la
 *  intensiva (L-V de F2: «ANKI · ENCAPS::Cifras (15′) + USMLE mantenimiento»): «el Anki del lun 4-ene 05:00 (ENCAPS::Cifras 15′)». Antes: «la
 *  transición» (sin Anki ENCAPS hasta el lun 4-ene) y «la próxima sesión de Anki». */
const PROTEG = new Set((F6.protegidos || []).map((x) => x.fecha));
// v6.10g (revisión 18-nov · dom 27-dic): un día FUERA del alias dentro de su ventana (el domingo de plan: se pinta tal cual, sin relativosReales) cuenta en
//   orden REAL: «mañana» es el día real siguiente, que hace el plan de SU alias (lun 28-dic real = plan jue 24, día de Step → 05:30; antes las 05:20 del lun
//   28 de plan, que se hace el mar 29). Los días de plan del alias siguen en orden de plan (la app pasa «mañana a las HH:MM» a su día real).
const _A1_VAL = Object.values(_A1).sort(), _A1_KEY = Object.keys(_A1).sort();
const fueraDelAlias = (iso) => _A1_VAL.length > 0 && iso >= _A1_VAL[0] && iso <= _A1_KEY[_A1_KEY.length - 1] && realDe(iso) === iso && !(iso in _A1);
const proxAnkiTxt = (iso, gaFechas) => {
  if (fueraDelAlias(iso)) {
    const nP = [...gaFechas].filter((d) => realDe(d) > iso).sort((a, b) => (realDe(a) < realDe(b) ? -1 : 1))[0];
    if (nP) { const r = realDe(nP); return r === addDias(iso, 1) ? `mañana a las ${gaIni(nP)}` : `el ${corta(r)} a las ${gaIni(nP)}`; }
  }
  const n = gaFechas.find((d) => d > iso);
  if (n) return n === addDias(iso, 1) ? `mañana a las ${gaIni(n)}` : dow(iso) === 5 && n === addDias(iso, 3) ? `el lunes a las ${gaIni(n)}` : `el ${corta(n)} a las ${gaIni(n)}`;
  let f2 = iso < F6.encaps.intensiva_desde ? F6.encaps.intensiva_desde : addDias(iso, 1);
  while (dow(f2) === 0 || dow(f2) === 6 || SKIP.has(f2) || PROTEG.has(f2)) f2 = addDias(f2, 1);
  if (f2 >= F6.encaps.examen) return null;
  return f2 === addDias(iso, 1) ? 'el Anki de mañana 05:00 (ENCAPS::Cifras 15′)' : `el Anki del ${corta(f2)} 05:00 (ENCAPS::Cifras 15′)`;
};
// días con el Anki 05:30 de ENCAPS VISIBLE (L-V de F1 sin SKIP): GA (más abajo) se genera para todos, pero el Home (TodayMission, bloque Anki
//   05:00-05:45; = sim_plantilla_dia) solo lo pinta si la guía USMLE de ese bloque no pasa de las 05:30.
// v6.08 (fix revisión 14-nov, dia1): los días en que la guía USMLE ocupa 05:00-05:45 (mar 17-nov configuración de Anki, jue 19-nov Day-After 2/6,
//   mar 24 y jue 26-nov y mar 1-dic «ANKI AM + vídeo pendiente») el Anki 05:30 de ENCAPS no se ve: las ★ de la víspera iban a un día sin tarjeta y
//   el siguiente 05:30 no las nombraba (la cadena se rompía 5 veces). Ahora la cadena salta esos días: «★ para el mié 18-nov a las 05:30» y ese día
//   «(y las ★ del lun 16-nov)». Se calcula con la guía USMLE real (usmleGuia.ts: regenerar este fichero DESPUÉS de gen_usmle_guia.js).
const UG = cargarModuloTS(path.join('src', 'lib', 'usmleGuia.ts'));
// v6.09 (fix revisión 16-nov, joseph 1): el mazo USMLE está VACÍO hasta el D2 del Step 1 (la primera tarjeta nace por APEX ese día; v6.09: jue 19-nov)
//   → antes de esa fecha el Anki 05:30 no manda «10′ más de vencidas USMLE»: son minutos libres
const USMLE_D2 = (() => { const r = cargarModuloTS(path.join('src', 'lib', 'usmleStep1Daily.ts')).diaPorD(2); if (!r) aborta('usmleStep1Daily.ts sin D2'); return r.fecha; })();
// v6.09 (16-nov-2026): + los L-V hábiles de la transición (jue 31-dic, día de plan que recupera el lun 16): su Anki 05:00 también lleva los 15′ de
//   repasos ENCAPS (el Step 1 ya está en pausa: el USMLE, solo vencidas opcionales)
// v6.09b (17-nov · auditoría a1-11, CONTRATO con el lote USMLE): el reparto del Anki 05:00-05:45 sigue el tamaño de los mazos → lun · mié · vie (días de
//   mañana ENCAPS) y los L-V hábiles de la transición (jue 31-dic): USMLE 05:00-05:20 + ENCAPS 05:20-05:45 (25′: Cifras 10′ + Flashcards 10′ + APEX::ENCAPS 5′)
//   · mar · jue (días de Step): USMLE 05:00-05:30 + ENCAPS 05:30-05:45 (15′). La cola de vídeo USMLE ya no entra en las 05:00 (la saca el otro lote).
const HAB_TRANS_SET = new Set(HAB_TRANS);
/** v6.09b: hora a la que empiezan los repasos ENCAPS del Anki 05:00 ese día (05:20 lun · mié · vie y jue 31-dic · 05:30 mar · jue). */
function gaIni(d) { return HAB_TRANS_SET.has(d) || !STEP_DIAS.includes(dow(d)) ? '05:20' : '05:30'; }
const usmleOcupaGA = (d) => UG.guiaUsmleEnRango(d, '05:00', '05:45').some((g) => { const q = G.partesFranja(g.franja); return !!q && aMin(q.fin) > aMin(gaIni(d)); });
const DIAS_GA = [];
for (let d = F6.f1.inicio; d <= F6.f1.fin; d = addDias(d, 1)) { const w = dow(d); if (w >= 1 && w <= 5 && !SKIP.has(d)) DIAS_GA.push(d); }
// v6.10w (remate · revisión cobertura): sin los hábiles de la transición que no tienen día real (el plan del jue 31-dic): su Anki va a la cola FSRS del
//   lun 4-ene y las ★ del vie 1-ene (plan del mié 30) iban «al sáb 2-ene a las 05:20» (el ENCAPS del sáb 2 es el de las 16:15, sin Anki)
DIAS_GA.push(...HAB_TRANS.filter((d) => !SIN_DIA_REAL.has(d)));
const GA_FECHAS = [], GA_OCULTOS = [];
for (const d of DIAS_GA) (usmleOcupaGA(d) ? GA_OCULTOS : GA_FECHAS).push(d);

// ── guías de la MAÑANA ─────────────────────────────────────────────────────────────────────────────────────────
const RES_T = {}; // v6.10l: nombres de la teoría de cada mañana como en su título (RESUMEN)
const GM = {}, GT = {}, MD = {}, QUE_TRAMOS = {}; // v6.09 (fix 2): QUE_TRAMOS = qué lleva cada tramo de un domingo de plan en tramos
const RB_INFO = {}, RB_DOM = {}; // v6.09b lote 1-quater FX1: reparto de la teoría de cada mañana · horario real de la rama B (clase del sábado NO vista en vivo)
// v6.09b lote 1-bis (hallazgo 2): pasos de las 18:00 que no caben (lo pendiente de la mañana los desplaza) → se les da destino después de generar todas las tardes
const DESPL = [];
const PIZARRA_QUE = 'Pizarra del mes (memoria visible)';
const PIZARRA_COMO = 'Cifras y definiciones del mes en la pizarra: plazos de notificación, esquema de vacunas, dosis de hierro, metas de indicadores. Lo que se aprende aquí pasa a tarjeta.';
for (const dia of J.mananas) {
  const lunes = dow(dia.fecha) === 1;
  // v6.10w (remate · revisión cobertura/textos): la mañana anterior y la siguiente por su NÚMERO (orden real), no por la posición en el JSON (ordenado por
  //   fecha de plan): con el intercambio 16/21 ↔ 17/21 la 17/21 (plan mié 23-dic) va delante de la 16/21 (dom 27-dic) y el lun 28 se citaba a sí mismo
  const prevM = J.mananas.find((x) => x.n === dia.n - 1) || null;
  const areas = [...new Set(dia.teoria.map((t) => t.area).filter((a) => AREA[a]))];
  const codigos = [...new Set(dia.teoria.flatMap((t) => t.codigos || []))];
  const tag = `ENCAPS · mañana ${dia.n}/${NM}`;
  const gs = [];
  if (dia.fase === 'cierre') {
    // mié 30-dic: SIMULACRO DE CIERRE DE AÑO 100Q / 2 h + corrección (mismas horas que el protocolo)
    const sim = (/\(([^)]*simulacro[^)]*)\)/i.exec(dia.banqueo.area) || [])[1] || 'simulacro';
    const num = (/simulacro (\d+)/i.exec(sim) || [])[1];
    const ruta = `${RUTA.drLopezSim} › ${num ? `${num}.° simulacro` : 'simulacro'} (versión SIN claves; la de claves, solo para corregir)`;
    gs.push(guia(fr('07:15', '07:30'), `${tag} · PREPARAR EL SIMULACRO`, [
      P(10, `Abrir ${sim} sin claves`, `Ruta: ${ruta}. Hoja de respuestas en papel si puedes.`),
      P(5, 'Condiciones de examen', 'Sin reloj a la vista, móvil fuera, agua. Nada abierto.'),
    ], [R99], 'el simulacro abierto y la hoja lista', { aviso: dia.extra || undefined }));
    gs.push(guia(fr('07:30', '09:30'), `${tag} · SIMULACRO DE CIERRE DE AÑO · 100Q en 2 h`, [
      P(100, 'Primera vuelta: básicas e intermedias', '72 s por pregunta. Marca las dudosas y sigue. Ninguna en blanco: no restan.'),
      P(20, 'Vuelta a las marcadas', 'Las atípicas al final. Reserva de 10-15′.'),
    ], [R99], 'las 100 respondidas en 2 h, sin parar', { planB: `Si ese PDF no abre: otro simulacro de DR LOPEZ que no hayas hecho (${RUTA.drLopezSim}).` }));
    gs.push(guia(fr('09:30', '09:45'), 'Pausa', [P(15, 'Pausa', 'De pie, agua, sin pantalla.')], [], 'pausa hecha sin pantalla'));
    gs.push(guia(fr('09:45', '11:40'), `${tag} · CORRECCIÓN DEL SIMULACRO Y REGLAS`, [
      P(10, 'Nota y % por área', 'Con la versión con claves. Nota = aciertos × 0,2. Anota el % de cada área.'),
      P(85, 'Cada error y cada dudosa', `${cap(TIPOS_ERROR)}. Mira por qué es correcta la buena, no solo la tuya.`),
      P(20, 'Verificación en la norma de las reglas de cifra o definición', `${VERIF_NORMA} Ruta: ${RUTA.normas}.`, L99), // v6.10l: qué buscar y el criterio, delante
    ], [R99], 'nota y % por área en el registro; cada error con su regla de 1 línea', { planB: `Si una norma no está en el campus: ${RUTA.drLopezNorm}.` }));
    gs.push(guia(fr('11:40', '12:00'), `${tag} · TARJETAS + CIERRE DEL AÑO`, [
      P(15, '5-10 tarjetas nuevas de lo que fallaste', 'Solo cifra o definición textual.'),
      P(5, 'Registro del cierre', `Nota del simulacro y errores repetidos (misma regla) en el registro: lo usa la revisión del ${revSab(dia.fecha)}.`),
    ], [], 'tarjetas creadas y la nota en el registro'));
  } else {
    const rep = repartir(dia);
    RB_INFO[dia.fecha] = rep;
    // 07:15 arranque en frío
    const primera = dia.n === 1;
    const pv = primera ? null : prevMananaTxt(prevM.fecha, dia.fecha);
    // v6.08 (fix revisión 14-nov, dia9): el lunes, las tarjetas del ENCAPS del domingo según su modo: los domingos de banqueos grabados (dom 6-dic:
    //   N°08-N°09 · dom 20-dic: N°10-N°11 + corrección) no tienen simulacro (antes: «y las del simulacro del domingo» también esos lunes)
    const domAyer = lunes ? J.domingos.find((x) => x.fecha === addDias(dia.fecha, -1)) : null;
    // v6.09 (16-nov-2026): sin nada del domingo si ese domingo fue SIN SESIÓN (dom 22-nov, viaje) o si fue domingo de PLAN (dom 27-dic: su mañana ya es
    //   «la de ayer»)
    const delDomingo = !lunes || (domAyer && ['sin_sesion', 'manana'].includes(domAyer.modo)) ? '' : domAyer && ['banqueos', 'banqueos_correccion'].includes(domAyer.modo) ? ' (y las de los banqueos grabados del domingo, si los hiciste)' : ' (y las del simulacro del domingo, si lo hiciste)';
    gs.push(guia(fr('07:15', '07:30'), `${tag} · ARRANQUE EN FRÍO`, primera
      ? [
        P(15, 'Orientación en el campus (es el primer día: no hay tarjetas de ayer)', 'Cronograma en vivo y asíncrono; dónde están PPT, post-tests, Theoesenciales, glosarios y las 100 normas técnicas. Ruta: Campus › curso 99 (y el 116 de sesiones adicionales).', L99),
      ]
      : [
        // v6.09 (fix revisión 16-nov, joseph 3): la hora de las tarjetas de la mañana anterior es la REAL (dom 27-dic, domingo de plan: 10:10 — fix 2)
        // v6.10i (auditoría del volcado c12, hallazgo 2): las tarjetas de la mañana anterior son las «5-10 tarjetas nuevas» de sus 11:40 (antes pedía «10»: si
        //   hizo 5, el paso no cuadraba) y la hora con su fecha van en el «qué» («de las 11:40 del jue 24-dic»: el desplazamiento de horas del domingo de plan no
        //   toca una hora seguida de «del <día>»; «(las de las 11:40)» suelta pasaba a 10:10 el dom 27-dic)
        P(8, `Las 5-10 tarjetas de las ${horaProt(prevM.fecha, '11:40')} del ${corta(prevM.fecha)}${/último día ENCAPS/.test(pv.de) ? ' (el último día ENCAPS)' : /la última mañana ENCAPS/.test(pv.de) ? ' (la última mañana ENCAPS)' : ''}, de memoria`,
          `${pv.saltadas.length ? `${cap(pv.saltadas.map((x) => 'el ' + corta(x)).join(' y '))} ${pv.saltadas.length > 1 ? 'fueron' : 'fue'} SKIP, sin mañana ENCAPS. ` : ''}${delDomingo ? `${cap(delDomingo.replace(/^ \(|\)$/g, ''))}. ` : ''}Tapa la respuesta, dila en voz alta, comprueba.`),
        P(7, `Reglas de los errores ${pv.de}, sin mirar`, 'Lee solo el error en el registro y di la regla. Si no sale, márcala ★: va primero en el banqueo de hoy.'),
      ], [R99], primera ? 'sabes dónde está cada cosa del campus' : 'las 5-10 tarjetas dichas y las reglas repasadas (las que no salieron, con ★)', { aviso: dia.extra || undefined }));
    // 07:30 teoría
    const pasosT = rep.manana.map((u) => P(u.min, typeof u.que === 'function' ? u.que(u.min) : u.que, `${u.como}${u.alt ? ` ${u.alt}` : ''}`, u.enlace));
    // v6.09b (a1-6): el Theoesencial ya no es «el resto de la franja» (iba al revés de sus páginas: SP 127 p con 0′, GES 40 p con 95′): es un ítem con
    //   sus páginas. Lo que sobra (≥ 5′) va a la NORMA DEL DÍA (la regla de la auditoría: «su sobrante pasa a la norma del día»)
    if (rep.libre >= 5) pasosT.push(P(rep.libre, `Norma del día: ${normaTxt(dia)} → ${rep.libre}′`,
      `Lectura de VERIFICACIÓN de esa norma: definiciones de las primeras páginas, tablas, flujogramas, plazos y cifras (tapa y di). Lo que no salga → tarjeta a las 11:40. ${VIGENCIA} Ruta: ${RUTA.normas}.`, L99));
    const noCabe = rep.tarde.filter((u) => !u.forzada), a18 = rep.tarde.filter((u) => u.forzada); // v6.08: + lo que va directo a las 18:00
    // v6.10j (auditoría c14, dias-clave #6): el título no promete en la franja lo que no cabe en ella: un ítem cuyas unidades van TODAS a las 18:00 sale del
    //   resumen y va al final, entre paréntesis, con su destino («Banqueo 4/19 + CI S1 (CI S2 → 18:00)»; antes «… + CI S1 + CI S2» y el Ojo decía «No cabe»)
    const fueraK = new Set(dia.teoria.map((t, k) => k).filter((k) => { const uk = [...rep.manana, ...noCabe].filter((u) => u.item_k === k); return uk.length && uk.every((u) => noCabe.includes(u)); }));
    const fueraT = noCabe.map((u) => u.postTest || dia.teoria[u.item_k].item.replace(/\s*\(.*\)$/, '')).filter((x, i, a) => a.indexOf(x) === i);
    // …y un rango de sesiones que se parte («SP S5-S8» con la S8 a las 18:00) se nombra por lo que queda en la franja («SP S5-S7 + SP 1/11 (SP S8 → 18:00)»)
    const nombreT = (t, k) => {
      const nom = t.item.replace(/\s*\(.*\)$/, ''), m = /^(SP|CI|GES|INV|ET) S(\d)-S?(\d)$/.exec(nom);
      const ss = rep.manana.filter((u) => u.item_k === k && u.s).map((u) => u.s);
      return !m || !ss.length || !noCabe.some((u) => u.item_k === k) ? nom : `${m[1]} S${ss[0]}${ss.length > 1 ? `-S${ss.at(-1)}` : ''}`;
    };
    const resumenT = dia.teoria.filter((t, k) => t.modo !== 'theoesencial' && !fueraK.has(k)).map((t) => (t.modo === 'preguntas' ? `${t.n}Q cronometradas` : nombreT(t, dia.teoria.indexOf(t)))).join(' + ') + (dia.teoria.some((t) => t.modo === 'theoesencial') ? ' + Theoesencial' : '')
      + (fueraT.length ? ` (${fueraT.join(' + ')} → ${esDomPlan(dia.fecha) ? 'al terminar la mañana' : '18:00'})` : '');
    // v6.10l (auditoría c15 · diffs #36): la cabecera del día (RESUMEN = tema.manana.resumen) nombra la teoría como este título: sin lo que va entero a las 18:00
    //   y con el rango partido por lo que queda («Banqueo 4/19 + CI S1 (CI S2 → 18:00)»; antes «… + CI S1 + CI S2» bajo un título que ya lo sacaba)
    RES_T[dia.fecha] = { fueraK, nombres: dia.teoria.map((t, k) => nombreT(t, k)), cola: fueraT.length ? ` (${fueraT.join(' + ')} → ${esDomPlan(dia.fecha) ? 'al terminar la mañana' : '18:00'})` : '' };
    // v6.09: en un domingo de plan lo pendiente va a sus cifras, normas y flashcards FLEXIBLES (a las 18:00 está el baile)
    // v6.09 (fix revisión 16-nov, joseph 3): ese bloque ya no es flexible: va a hora fija al terminar la mañana (sin la hora escrita: la mañana se desplaza)
    const a18Txt = esDomPlan(dia.fecha) ? 'a las cifras, normas y flashcards de hoy (al terminar la mañana)' : 'a las 18:00 de hoy';
    const avisoT = [noCabe.length ? `No cabe en 105′ → ${a18Txt}: ${noCabe.map((u) => `${u.postTest || u.que}`).join(' + ')}.` : '',
      a18.length ? `A las 18:00 de hoy, además: ${a18.map((u) => `${u.postTest || u.que}`).join(' + ')} en diferido (no cabe en ninguna mañana).` : ''].filter(Boolean).join(' ') || undefined;
    gs.push(guia(fr('07:30', '09:15'), `${tag} · TEORÍA · ${resumenT}`, pasosT, [R99, ...(dia.teoria.some((t) => /^Banqueo|^Revisión normativa/.test(t.item)) ? [R116] : [])],
      // v6.09b lote 1-quater FX1 (revisión V2 · planes B a franja llena): lo que no se vea hoy ya no va «a las 18:00» (sus 45′ ya están llenos): va al ENCAPS del
      //   domingo siguiente que lo tiene, antes del simulacro opcional (2027, sin cambios)
      // v6.10i (remate de la revisión del 18-nov): la mañana de la HOJA DE REGLAS (mar 5-ene, 21/21) no tiene sesión del campus → su plan B no remite al campus
      hechoTeoria(dia), { aviso: avisoT, planB: /^Hoja de reglas/.test((dia.teoria[0] || {}).item || '') ? `Si no tienes el registro a mano: la hoja de reglas de tus notas de Obsidian (las ★ y las de los 8 críticos); las 10Q, de QX · App Banqueo (mezcla de áreas) o del post-test de DR LOPEZ del área (${RUTA.drLopezPT}), preguntas reales con su clave. Lo que no veas hoy va a las 18:00.` : `Si el campus no carga: la misma sesión en ${RUTA.theoDrive}, o el Theoesencial del tema. Lo que no veas hoy ${dia.fecha >= F6.encaps.intensiva_desde ? `va ${esDomPlan(dia.fecha) ? 'a las cifras, normas y flashcards de hoy (al terminar la mañana)' : 'a las 18:00'}` : `→ ${destPBDom(J.domingos.map((x) => x.fecha).find((x) => x > realDe(dia.fecha) && domConEncaps(x)))}`}.` }));
    // 09:15 post-test
    const pts = rep.manana.filter((u) => u.postTest).map((u) => u.postTest);
    gs.push(guia(fr('09:15', '09:30'), pts.length ? `${tag} · POST-TEST de Theomed · ${pts.join(' · ')}` : `${tag} · RECALL de cifras y definiciones de hoy`, pts.length
      // v6.09b lote 1-ter (pendiente a1-18 de G): el nº de preguntas de cada post-test no se conoce (el campus no lo muestra sin abrir el intento) → el paso se
      //   ACOTA a lo que cabe en 15′ (12 preguntas a 72 s) y lo que quede tiene franja (el banqueo de las 09:45, que lo cuenta); Joseph anota N para medirlo
      // v6.10z-d (lun 23-nov, chat ENCAPS): la regla del envío (POST_TEST_ENVIO) delante: «lo que quede» sigue en el banqueo SIN haberlo enviado
      ? [P(15, `Post-test${pts.length > 1 ? 's' : ''} de ${pts.join(', ')} · 15′ = hasta 12 preguntas a 72 s/Q`, `${POST_TEST_ENVIO} ${pts.length > 1 ? 'Los post-tests en orden; lo' : 'Si trae más, lo'} que quede abre el banqueo de las 09:45 (cuenta como banqueo del tema) · anota cuántas preguntas trae ${pts.length > 1 ? 'cada post-test' : 'el post-test'}. Primer intento CIEGO, sin apuntes: es la medición. La nota va al registro. Ruta: el post-test está en la misma sección de la sesión.`, L99)]
      : [P(15, '10 cifras o definiciones de lo de hoy, de memoria', 'Tapa, di, comprueba. Las que fallen → tarjeta a las 11:40.')],
    [R99], pts.length ? 'nota del primer intento en el registro' : '10 cifras dichas; las falladas, anotadas', { planB: pts.length ? `Si el post-test no abre: 10Q del post-test de DR LOPEZ del área (${RUTA.drLopezPT}), también a ciegas.` : undefined }));
    // 09:30 pausa
    gs.push(guia(fr('09:30', '09:45'), 'Pausa', [P(15, 'Pausa', 'De pie, agua, sin pantalla.')], [], 'pausa hecha sin pantalla'));
    // 09:45 banqueo
    const nQ = dia.banqueo.n;
    const minQ = Math.ceil(nQ * 72 / 60);
    // v6.09b (a1-8): un banqueo cronometrado que no cabe en 60′ ya no alarga su franja recortando la corrección (mar 5-ene: 60Q → corrección de 23′):
    //   la corrección se ESCALA a 0,85′ por pregunta y, si no cabe, ABORTA (se baja el nº de preguntas en el JSON)
    // v6.09b: `banqueo.franja` = otra franja del banqueo para conservar las horas de una fila ya sembrada (mar 5-ene: 09:45-10:57, la fila D34 de la intensiva
    //   lleva esas franjas en extra.loop; 50Q = 60′ + 12′ de vuelta a las marcadas, y la corrección de 43′ llena 10:57-11:40)
    const fB = dia.banqueo.franja || null;
    if (fB && (!Array.isArray(fB) || fB.length !== 2 || fB[0] !== '09:45' || !(aMin(fB[1]) > aMin('09:45')) || !(aMin(fB[1]) < aMin('11:40')))) aborta(`${dia.fecha}: banqueo.franja debe ser ["09:45", fin < 11:40]`);
    const finB = fB ? fB[1] : '10:45';
    if (minQ > aMin(finB) - aMin('09:45')) aborta(`${dia.fecha}: ${nQ}Q × 72 s = ${minQ}′ no caben en el banqueo de 09:45-${finB}: baja el nº de preguntas en el JSON`);
    const mezcla = /mezcla/.test(dia.banqueo.area);
    const pasosB = [P(Math.min(minQ, aMin(finB) - aMin('09:45')), `${nQ}Q de ${dia.banqueo.area}${dia.banqueo.cronometrado ? ' · EN BLOQUE CRONOMETRADO' : ''} · modo examen (72 s c/u)`,
      // v6.09 (fix revisión 16-nov, joseph 1): la 1.ª mañana no tiene reglas ★ del arranque (es la orientación en el campus) → sin esa frase
      `Sin mirar nada. ${RESERVA} ${CONFIANZA} ${mezcla ? 'Reparto del vector v3: CI 30 · SP 27 · GES 21 · ET 13 · INV 9 (los 8 críticos primero). Fuentes: DR LOPEZ post-tests y Qx banqueo F2 de varias áreas' : `Fuentes, por orden: ${FUENTES}`}.${primera ? '' : ' Las reglas con ★ del arranque, primero.'}${trampasMezcla(dia.banqueo.area, dia.fecha)}`)];
    const restoB = aMin(finB) - aMin('09:45') - pasosB[0].min;
    const nMax = restoB >= 15 ? Math.min(40, nQ + Math.floor((restoB - 5) * 60 / 72)) : nQ; // v6.09b: lo que de verdad se corrige (las del «hasta NQ si sobra» también)
    if (restoB > 0) pasosB.push(P(restoB, restoB >= 15 ? `Vuelta a las marcadas + hasta ${nMax}Q del mismo tema si sobra` : 'Vuelta a las marcadas', restoB >= 15 ? 'Como en el examen: primero las dudosas, sin clave. Si sobra, sigue con preguntas del mismo tema (o los post-tests que no cupieron a las 09:15).' : 'Como en el examen: las dudosas al final, sin clave.'));
    gs.push(guia(fr('09:45', finB), `${tag} · BANQUEO ${nQ}Q · ${dia.banqueo.area}`, pasosB, [R99],
      `${nQ}Q respondidas con su confianza (el % ciego, en la corrección)`, { planB: 'Si una fuente no carga, pasa a la siguiente del orden. Nunca el 2026-II.' })); // v6.10z-d: el % ciego necesita la clave
    // corrección — v6.09b (a1-8): 0,85′ por pregunta (fallos + dudosas; la tasa del simulacro de 100Q), el resto de la franja = verificación en la norma
    const minC = aMin('11:40') - aMin(finB);
    const normaHoy = normaTxt(dia);
    const minCorr = Math.ceil(nMax * CORR_Q);
    if (minC < minCorr || (minC - minCorr > 0 && minC - minCorr < 10)) aborta(`${dia.fecha}: la corrección de ${nMax}Q (${minCorr}′) no cabe en ${finB}-11:40 o deja menos de 10′ de verificación en la norma`);
    const verif = minC - minCorr;
    gs.push(guia(fr(finB, '11:40'), `${tag} · CORRECCIÓN Y REGLAS${normaHoy ? ' + NORMA' : ''}`, [
      P(minCorr, `Cada fallo y cada dudosa de las ${nMax === nQ ? nQ : `${nQ}-${nMax}`}Q de hoy → ${minCorr}′`, `${cap(TIPOS_ERROR)}. Mira por qué es correcta la buena, no solo la tuya. ${String(CORR_Q).replace('.', ',')}′ por pregunta${verif ? ': si hiciste menos, el tiempo que sobra va a la verificación.' : '; las reglas de cifra o definición, contra la hoja de reglas de esta mañana (hoy no hay franja aparte de verificación en la norma).'}${trampasSec(dia.banqueo.area, dia.fecha)}`),
      // v6.10l (auditoría c15 · vetadas-cortes #25): el criterio de vigencia delante del corte del Calendar (antes «… manda la norma más …»)
      ...(verif ? [P(verif, normaHoy ? `Verificación en la norma: ${normaHoy}` : 'Verificación en la norma de cada regla nueva', `${VERIF_NORMA} Ruta: ${RUTA.normas}.`, L99)] : []),
    ], [R99], verif ? 'cada fallo con su tipo y su regla de 1 línea en el registro; las reglas verificadas en la norma'
      // v6.10h (c11 · 5-ene): sin franja de verificación en la norma, el «Hecho» no la pide (las reglas de cifra o definición se contrastan con la hoja de reglas)
      : 'cada fallo con su tipo y su regla de 1 línea en el registro; las de cifra o definición, contrastadas con la hoja de reglas', { planB: verif ? `Si la norma no está en el campus: ${RUTA.drLopezNorm}.` : 'Si la hoja de reglas no está a mano: tus notas de Obsidian de cada código (la regla y la cifra exacta); hoy no hay verificación en la norma.' }));
    // 11:40 tarjetas
    gs.push(guia(fr('11:40', '12:00'), `${tag} · TARJETAS de lo que fallaste`, [
      P(15, '5-10 tarjetas nuevas', 'Solo cifra o definición textual de lo que fallaste. Nada de tarjetas de lo que ya sabes.'),
      P(5, 'Registro del día', `${pts.length ? 'Nota del post-test, n' : 'n'} y % ciego del banqueo, errores nuevos: lo usa la revisión del ${revSab(dia.fecha)}.`),
    ], [], '5-10 tarjetas creadas y el registro del día cerrado'));
    MD[dia.fecha] = { tarde: rep.tarde.map((u) => ({ min: u.min, que: typeof u.que === 'function' ? u.que(u.min) : u.que, como: u.como, postTest: u.postTest || null, ...(u.forzada ? { forzada: true } : {}), ...(u.cond ? { cond: true } : {}), ...(u.alt ? { alt: u.alt } : {}) })) };
  }
  // continuidad 07:15 → 12:00
  let t = '07:15';
  for (const g of gs) { const p = G.partesFranja(g.franja); if (!p || p.ini !== t) aborta(`${dia.fecha}: hueco o solape antes de ${g.franja} (esperaba ${t})`); t = p.fin; }
  if (t !== '12:00') aborta(`${dia.fecha}: la mañana termina a las ${t}, no a las 12:00`);
  // v6.09 (fix revisión 16-nov, joseph 3): DOMINGO DE PLAN con hora propia → las franjas van a su hora real y, con ellas, toda hora del protocolo (07:15-12:00)
  //   escrita en títulos, pasos, plan B y avisos («tarjeta a las 11:40» → 10:10). No se tocan: las horas de OTRO día («las de las 11:40 del mié 23-dic») ni el
  //   aviso del JSON (dia.extra: ya trae las horas reales del domingo).
  // v6.09 (fix 2, 16-nov noche): en TRAMOS (dom 27-dic: 04:15-05:45 + 07:15-10:30; la rutina de 05:45-07:15 no se toca) → protocoloAReal en vez de un
  //   desfase único, y la franja en la que cae el corte (solo la TEORÍA, o un borde de franja) se parte en dos guías: sus pasos se reparten por minutos
  //   (el que cruza el corte, en «1.ª parte» y «2.ª parte») y cada parte dice dónde está la otra.
  if (DOM_PLAN_H.has(dia.fecha)) {
    const real = (h, lado) => protocoloAReal(dia.fecha, h, lado);
    const mov = (s) => (typeof s !== 'string' ? s : s.replace(/\b(\d\d):(\d\d)\b(?!\s+del\s+(?:lun|mar|mié|jue|vie|sáb|dom)\s)/g, (x) => {
      const v = aMin(x);
      return v >= aMin(PROT_INI) && v <= aMin(PROT_FIN) ? real(x, 'ini') : x;
    }));
    const ts = tramosManana(dia.fecha);
    const cortes = []; { let acc = 0; for (const t0 of ts.slice(0, -1)) { acc += aMin(t0[1]) - aMin(t0[0]); cortes.push(acc); } } // minutos del protocolo en los que se corta
    const out = [];
    for (const g0 of gs) {
      const p = G.partesFranja(g0.franja);
      const a = aMin(p.ini) - aMin(PROT_INI), b = aMin(p.fin) - aMin(PROT_INI);
      const g = { ...g0, titulo: mov(g0.titulo), pasos: g0.pasos.map((x) => ({ ...x, que: mov(x.que), como: mov(x.como) })), hecho: mov(g0.hecho),
        ...(g0.planB ? { planB: mov(g0.planB) } : {}), ...(g0.aviso ? { aviso: g0.aviso === dia.extra ? g0.aviso : mov(g0.aviso) } : {}) };
      const dentro = cortes.filter((c) => c > a && c < b);
      if (!dentro.length) { out.push({ ...g, franja: fr(real(p.ini, 'ini'), real(p.fin, 'fin')) }); continue; }
      if (dentro.length > 1 || !/ · TEORÍA · /.test(g0.titulo)) aborta(`${dia.fecha}: el corte entre tramos cae dentro de «${g0.titulo}» (${g0.franja}): solo puede caer dentro de la TEORÍA o en el borde de una franja`);
      const tC = hhmm(aMin(PROT_INI) + dentro[0]), k = dentro[0] - a;
      const [i1, f1, i2, f2] = [real(p.ini, 'ini'), real(tC, 'fin'), real(tC, 'ini'), real(p.fin, 'fin')];
      const pa = [], pb = []; let s0 = 0;
      for (const x of g.pasos) {
        const e = s0 + x.min;
        if (e <= k) pa.push(x);
        else if (s0 >= k) pb.push(x);
        else { const m1 = k - s0, m2 = e - k; pa.push({ ...x, min: m1, que: `${x.que} — 1.ª parte: ${m1}′ (los ${m2}′ restantes, a las ${i2})` }); pb.push({ ...x, min: m2, que: `${x.que} — 2.ª parte: los ${m2}′ restantes` }); }
        s0 = e;
      }
      if (!pa.length || !pb.length) aborta(`${dia.fecha}: el corte de la TEORÍA deja una parte sin pasos`);
      out.push({ ...g, franja: fr(i1, f1), titulo: `${g.titulo} · 1.ª parte (${k}′)`, totalMin: k, pasos: pa, hecho: 'la 1.ª parte de la teoría vista o leída, con notas SOLO en forma de pregunta',
        aviso: [g.aviso, `La teoría sigue a las ${i2} (${b - a - k}′): entre medias, la rutina de la mañana (${f1}-${i2}), que no se toca.`].filter(Boolean).join(' ') });
      out.push({ ...g, franja: fr(i2, f2), titulo: `${g.titulo} · 2.ª parte (${b - a - k}′, tras la rutina de la mañana)`, totalMin: b - a - k, pasos: pb, aviso: `Es la 2.ª parte de la teoría de hoy (la 1.ª, ${i1}-${f1}): termina lo que quedó y sigue al post-test.` });
    }
    // continuidad: cada tramo cubierto de punta a punta, sin huecos ni solapes, y nada fuera de los tramos
    let j = 0;
    for (const t0 of ts) {
      let c = t0[0];
      while (j < out.length && G.partesFranja(out[j].franja).ini === c) { c = G.partesFranja(out[j].franja).fin; j++; }
      if (c !== t0[1]) aborta(`${dia.fecha}: el tramo ${t0.join('-')} de la mañana no queda cubierto (llega a ${c})`);
    }
    if (j !== out.length) aborta(`${dia.fecha}: hay franjas de la mañana fuera de sus tramos (${out.slice(j).map((x) => x.franja).join(', ')})`);
    gs.splice(0, gs.length, ...out);
    // qué lleva cada tramo (lo pinta el Home: un bloque por tramo)
    const etq = (x) => (/ARRANQUE/.test(x.titulo) ? 'arranque' : / · TEORÍA · /.test(x.titulo) ? `teoría${/ · 1\.ª parte/.test(x.titulo) ? ' (1.ª parte)' : / · 2\.ª parte/.test(x.titulo) ? ' (2.ª parte)' : ''}`
      : /POST-TEST/.test(x.titulo) ? 'post-test' : /RECALL/.test(x.titulo) ? 'recall' : /^Pausa$/.test(x.titulo) ? null : /BANQUEO/.test(x.titulo) ? 'banqueo'
        : /CORRECCIÓN/.test(x.titulo) ? 'corrección' : /TARJETAS/.test(x.titulo) ? 'tarjetas' : /SIMULACRO/.test(x.titulo) ? 'simulacro' : 'mañana');
    QUE_TRAMOS[dia.fecha] = ts.map((t0) => gs.filter((x) => { const q = G.partesFranja(x.franja); return aMin(q.ini) >= aMin(t0[0]) && aMin(q.ini) < aMin(t0[1]); }).map(etq).filter(Boolean).join(' → '));
  }
  // v6.09b lote 1-quater FX1 (revisión V2/V3 · CI 3/8): RAMA B (la clase del sábado NO se vio en vivo) con su horario real, sin pisar la rutina: la clase entera
  //   ocupa el sitio de su tramo y sigue por los minutos de la clase que adelanta (que se queda en sus minutos propios, al final) y de la norma del día (lo que
  //   sobra con la clase vista en vivo; en la rama B no va). Se calcula en minutos del protocolo y se pasa a los tramos reales de la mañana.
  {
    const rep = RB_INFO[dia.fecha], uCI = rep && rep.manana.find((u) => u.siEnVivo);
    if (uCI) {
      const uSP = rep.manana.find((u) => u.adelPor);
      if (!uSP) aborta(`${dia.fecha}: la clase vista en vivo (${uCI.postTest}) adelanta una clase que no está en la teoría de esta mañana`);
      const mB = (u) => (u === uCI ? vivoMin(uCI.dur) : u === uSP ? uSP.rbTxt.min : u.min);
      const tot = rep.manana.reduce((a, u) => a + mB(u), 0);
      if (tot !== CAP_TEORIA) aborta(`${dia.fecha}: la rama B (sin la ${uCI.postTest} en vivo) suma ${tot}′ de teoría y debe sumar ${CAP_TEORIA}′ (la norma del día que sobra no va)`);
      const ts = tramosManana(dia.fecha);
      /** minutos del protocolo [pa, pb) (desde las 07:15) → tramos reales por índice de tramo */
      const rangos = (pa, pb) => { const o = []; let off = 0; ts.forEach((t0, i) => { const len = aMin(t0[1]) - aMin(t0[0]), s = Math.max(pa, off), e = Math.min(pb, off + len); if (e > s) o.push({ i, txt: `${hhmm(aMin(t0[0]) + s - off)}-${hhmm(aMin(t0[0]) + e - off)}` }); off += len; }); return o; };
      let p0 = aMin('07:30') - aMin(PROT_INI); const lay = new Map();
      for (const u of rep.manana) { lay.set(u, rangos(p0, p0 + mB(u))); p0 += mB(u); }
      const rCI = lay.get(uCI), rSP = lay.get(uSP), j = (r) => r.map((x) => x.txt).join(' + ');
      const sp = uSP.postTest, por = uSP.rbTxt.por, dst = corta(uSP.rbTxt.dest);
      RB_DOM[dia.fecha] = { ci: j(rCI), sp: j(rSP), por, adelanta: sp, resto: uSP.rbTxt.resto, dest: uSP.rbTxt.dest, libre: rep.libre };
      const cab = `Rama B (sin la ${por} en vivo): ${sp} −${uSP.rbTxt.resto}′ → ${dst} (antes de su 1.er paso)`;
      for (const g of gs) for (const p of g.pasos) {
        p.como = p.como.replace('{{RB_CI}}', j(rCI)).replace('{{RB_SP}}', `${j(rSP)} (${uSP.rbTxt.min}′)`)
          .replace('{{RB_NORMA}}', rep.libre >= 5 ? `; la norma del día (${rep.libre}′, lo que sobra con la clase vista en vivo) no va` : '');
        if (p.como.includes('{{RB_SP_PARTE}}')) {
          const parte = / — 1\.ª parte/.test(p.que) ? 0 : / — 2\.ª parte/.test(p.que) ? 1 : null;
          const ci = parte === null ? null : rCI.find((x) => x.i === parte), spP = parte === null ? null : rSP.find((x) => x.i === parte);
          const t = parte === null ? `aquí la ${por} entera (${j(rCI)}) y la ${sp} solo ${j(rSP)}`
            : parte === 0 ? `a esta hora sigue la ${por} (entera: ${j(rCI)}); la ${sp}, solo ${j(rSP)}`
              : `${ci ? `${ci.txt} lo que falta de la ${por}` : ''}${ci && spP ? ' y ' : ''}${spP ? `${spP.txt} la ${sp} (${uSP.rbTxt.min}′)` : ''}`;
          p.como = p.como.replace('{{RB_SP_PARTE}}', `${cab}; ${t}. `);
        }
        if (rep.libre >= 5 && /^Norma del día: /.test(p.que) && !/^Rama B/.test(p.como)) p.como = `Rama B (sin la ${por} en vivo): no va (a esta hora, la ${sp}). ${p.como}`;
      }
      // el aviso del día (JSON extra) dice el mismo horario de la rama B
      if (!(dia.extra || '').includes(j(rCI)) || !(dia.extra || '').includes(j(rSP))) aborta(`${dia.fecha}: el aviso del JSON (extra) no dice el horario de la rama B (${por} entera ${j(rCI)} · ${sp} ${j(rSP)})`);
    }
    if (/\{\{RB_/.test(JSON.stringify(gs))) aborta(`${dia.fecha}: queda un «{{RB_…}}» sin rellenar en la mañana`);
  }
  GM[dia.fecha] = gs;

  // ── 18:00 · ENCAPS · cifras, normas y flashcards (45′) ──
  const pend = (MD[dia.fecha] && MD[dia.fecha].tarde) || [];
  const pendM = pend.filter((u) => !u.forzada), pendF = pend.filter((u) => u.forzada); // v6.08: lo que no cupo por la mañana · lo que va directo a las 18:00
  // v6.09b lote 1-quater (R2 · N5): el destino del post-test AL PRINCIPIO del «cómo» (antes al final, pos. 370-800: el Calendar lo cortaba) · (N6) la clase «si no
  //   la viste en vivo» lleva la rama «vista en vivo» con sus minutos ({{SI_EN_VIVO}}, se rellena con los pasos de siempre de esta 18:00)
  // v6.11 fase 2 (remate): la siguiente mañana CON nuevas a las 18:00 y banqueo a las 09:45: se salta la del simulacro de cierre (19/21, mar 5-ene: su 18:00 no
  //   lleva nuevas del temario) → la 18 (jue 31-dic) manda sus nuevas a la 18:00 del mié 6-ene (20/21), no a la del mar 5
  const sigF = (J.mananas.filter((x) => x.n > dia.n && x.fase !== 'cierre').sort((x, y) => x.n - y.n)[0] || dia).fecha; // v6.10w (remate): por número (orden real), como prevM
  const pasosP = pend.map((u) => P(u.min, `${u.forzada ? 'CLASE EN DIFERIDO (va hoy a las 18:00)' : 'PENDIENTE de la mañana'}: ${u.que}`, `${u.postTest ? `Post-test al terminar (ciego; si no cabe → banqueo del ${corta(sigF)} 09:45). ` : ''}${u.cond ? '{{SI_EN_VIVO}}' : ''}${u.como}`, L99));
  // v6.09b (a1-8): preguntas de otra mañana que no caben allí (tarde_extra: las 10Q del mar 5-ene, que pasa de 60Q a 50Q, van al lun 28-dic 18:00)
  const tx = dia.tarde_extra || null;
  if (tx) {
    if (!(tx.q > 0) || !tx.area || !tx.de || !tx.motivo || !J.mananas.some((x) => x.fecha === tx.de)) aborta(`${dia.fecha}: tarde_extra sin q / area / de (una mañana del JSON) / motivo`);
    if (pend.length) aborta(`${dia.fecha}: tarde_extra en un día con pendiente de la mañana a las 18:00 (tiene que ser un día sin pendiente)`);
    const mQ = Math.ceil(tx.q * 72 / 60), mC = Math.ceil(tx.q * CORR_Q);
    pasosP.push(P(mQ, `${tx.q}Q de ${tx.area} (las de la mañana ${J.mananas.find((x) => x.fecha === tx.de).n}/${NM}, ${corta(tx.de)}, que ya no caben allí) · modo examen (72 s c/u)`, `Sin mirar nada, en bloque cronometrado. ${RESERVA} ${CONFIANZA}`),
      P(mC, `Cada fallo y cada dudosa de las ${tx.q}Q → ${mC}′`, `${cap(TIPOS_ERROR)}. ${String(CORR_Q).replace('.', ',')}′ por pregunta.`));
  }
  const P_ = pasosP.reduce((a, p) => a + p.min, 0);
  const Rr = CAP_TARDE - P_;
  const cierre = dia.fase === 'cierre';
  const codTxt = codigos.length ? codigos.join(' · ') : /mezcla/.test(dia.banqueo.area) ? `los 8 críticos (${CRITICOS})` : dia.banqueo.area.replace(/(SP|CI|GES|INV|ET)/g, (x) => AREA[x]);
  const pasosR = [];
  const flash = (m) => (cierre
    ? P(m, 'Flashcards ENCAPS::Flashcards · vencidas + las tarjetas de los errores del simulacro', 'Anki. Hoy sin nuevas del temario: las tarjetas de lo que fallaste esta mañana, primero.')
    // v6.09 (fix revisión 16-nov, joseph 1): la 1.ª mañana ENCAPS no tiene vencidas (las primeras tarjetas nacen hoy a las 11:40)
    // v6.09b: las nuevas que caben en los minutos (≈50 s por tarjeta nueva, máx. 30); antes «15 nuevas» también en 10′ (12,5′ de material)
    // v6.09b lote 1-quater FX1 (revisión V1 · flashcards): «30 nuevas + vencidas» en 25′ dejaba 0′ a las vencidas (30 × 0,83′ = 25′) → VENCIDAS PRIMERO y las nuevas
    //   hasta llenar los minutos (≈30 si no hay vencidas); las nuevas que no quepan esperan en la cola del mazo y abren la próxima 18:00 (la misma regla que APEX::USMLE)
    : dia.n === 1 || dia.fecha >= F6.encaps.intensiva_desde ? P(m, `Flashcards ENCAPS::Flashcards · ${Math.min(30, Math.floor(m * 60 / 50))} nuevas del tema de hoy ${dia.n === 1 ? '(aún no hay vencidas)' : '+ vencidas'}`, 'Anki, en el orden del temario. Sin el mazo de DR LOPEZ importado (decisión tuya): nuevas de ENCAPS::Cifras.') // remate v6.10m (rev. c16 · visibilidad #1): la regla de DR LOPEZ entera dentro de los 110 del Calendar (antes «Si aún no importaste el mazo de DR LOPEZ …», sin su consecuencia); «del área de hoy» ya va en el «qué» («nuevas del tema de hoy»)
      // v6.10p (auditoría c18 · dias-clave #1): la alternativa sin el mazo de DR LOPEZ, en el «qué» compactado (≤150: lo que se veía + DR LOPEZ); antes solo al final
      //   del «cómo» y el Calendar la cortaba del 23-nov al 29-dic. El «cómo», igual (sus fechas de destino, en los primeros 100: check_rutina_guia 26h)
      // remate v6.10p (revisión «verdad» BAJA): «sin mazo DR LOPEZ → ENCAPS::Cifras» (con «:» se leía como si ENCAPS::Cifras FUERA el mazo de DR LOPEZ) ·
      //   (revisión «visibilidad» BAJA) el destino con la hora real de su bloque (destPm: el dom 27-dic, a las 10:30)
      : P(m, `Flashcards ENCAPS::Flashcards (sin mazo DR LOPEZ → ENCAPS::Cifras) · vencidas → nuevas del tema de hoy hasta ${m}′ (≈${Math.min(30, Math.floor(m * 60 / 50))} sin vencidas · 0,83′/nueva)`,
        `Las nuevas que no quepan → ${destPm(sigF)}, por delante de las de ese día (esperan en la cola del mazo). Anki, en el orden del temario. Si aún no importaste el mazo de DR LOPEZ (decisión tuya), haz las nuevas de ENCAPS::Cifras.`));
  const cifras = (m) => (cierre
    ? P(m, 'Cifras de lo que fallaste en el simulacro', `Las que no salgan → ★ para ${proxAnkiTxt(dia.fecha, GA_FECHAS) || 'la próxima sesión de Anki'}. Busca cada cifra fallada en DATA/ENCAPS/CIFRAS_CRITICAS_2027-I.md (= mazo ENCAPS::Cifras): tapa el valor y dilo.`) // remate v6.10w: el destino delante (check 26h: «lun 4-ene» quedaba en la pos. 161)
    : P(m, `Cifras y plazos de ${codTxt}`, `Las filas de esos códigos en DATA/ENCAPS/CIFRAS_CRITICAS_2027-I.md (= mazo ENCAPS::Cifras): tapa el valor y dilo. Las que no salgan → ★ para ${proxAnkiTxt(dia.fecha, GA_FECHAS) || 'la próxima sesión de Anki'}.`));
  const extra10 = () => (normaTxt(dia) ? P(10, `Norma del día: ${normaTxt(dia)}`, `Una tabla o flujograma más de esa norma → tarjeta. Ruta: ${RUTA.normas}.`, L99)
    : P(10, PIZARRA_QUE, PIZARRA_COMO));
  // los 3 pasos de siempre (flashcards 25′ · cifras 10′ · norma o pizarra 10′); si lo pendiente no los deja entrar, cada uno que sale lleva DESTINO (DESPL)
  let kFlash = 0, kCifras = false, kExtra = false;
  if (Rr >= 30) { kFlash = Rr - 20; kCifras = kExtra = true; } else if (Rr >= 15) { kFlash = Rr - 10; kCifras = true; } else if (Rr > 0) kFlash = Rr;
  const pFlash = kFlash ? flash(kFlash) : null;
  if (pFlash) pasosR.push(pFlash);
  if (kCifras) pasosR.push(cifras(10));
  if (kExtra) pasosR.push(extra10());
  // v6.09b lote 1-quater (R2 · N6): rama «vista en vivo» de la clase «si no la viste en vivo» que llena las 18:00 (vie 27-nov, CI 2/8 del sáb 14-nov): con minutos
  //   = las 18:00 normales de hoy (los 3 pasos de siempre) y los traslados del aviso no van (los días que los reciben lo dicen: «solo si el … hiciste la …»)
  const condU = pend.find((u) => u.cond) || null;
  for (const [i, u] of pend.entries()) {
    if (!u.cond) continue;
    if (u.min !== CAP_TARDE || pend.length !== 1 || cierre) aborta(`${dia.fecha} 18:00: la clase «si no la viste en vivo» tiene que llenar sola los ${CAP_TARDE}′ (su rama «vista en vivo» = las 18:00 normales)`);
    const nrm = normaTxt(dia);
    const mA0 = /^Si el (dom \d+) fue con el plan B/.exec(u.alt || '');
    pasosP[i].como = pasosP[i].como.replace('{{SI_EN_VIVO}}', `¿La viste EN VIVO el sábado${mA0 ? ` y el ${mA0[1]} no fue con el plan B` : ''}? Entonces estos ${CAP_TARDE}′ son las 18:00 normales de hoy (30 flashcards nuevas 25′ + cifras y plazos de hoy 10′ + ${nrm ? `una tabla más de la ${nrm.replace(/\s*\(.*$/, '')}` : 'la pizarra del mes'} 10′) y los traslados del aviso no van. `);
  }
  // v6.09b lote 1-bis (hallazgo 2): NADA SALE EN SILENCIO — cifras y norma necesitan destino en el JSON (mananas[].destinos_18); la pizarra (repaso del mes,
  //   no material propio) vuelve en la próxima pizarra; las flashcards: las vencidas, el próximo Anki ENCAPS; las nuevas, primeras de la cola del mazo
  if (Rr < CAP_TARDE) {
    if (cierre) aborta(`${dia.fecha}: el cierre (simulacro) con pendiente a las 18:00: sin destinos previstos`);
    const ds = dia.destinos_18 || {};
    for (const k of Object.keys(ds)) if (!['cifras', 'norma', 'flash'].includes(k)) aborta(`${dia.fecha}: destinos_18.${k} no existe (solo cifras, norma y flash)`);
    if (!kCifras) {
      if (!ds.cifras) aborta(`${dia.fecha} 18:00: las «Cifras y plazos de ${codTxt}» no caben (lo pendiente ocupa ${P_}′) y no tienen destino: pon mananas[].destinos_18.cifras`);
      DESPL.push({ tipo: 'cifras', de: dia.fecha, dest: ds.cifras, nombre: `cifras y plazos de ${codTxt}`, que: `Cifras y plazos de ${codTxt}`, av: 'cifras de hoy' });
    } else if (ds.cifras) aborta(`${dia.fecha}: destinos_18.cifras sobra (las cifras caben a las 18:00)`);
    if (!kExtra && normaTxt(dia)) {
      if (!ds.norma) aborta(`${dia.fecha} 18:00: la «Norma del día» (${normaTxt(dia)}) no cabe y no tiene destino: pon mananas[].destinos_18.norma`);
      DESPL.push({ tipo: 'norma', de: dia.fecha, dest: ds.norma, nombre: `una tabla o flujograma más de la norma del día, ${normaTxt(dia)}`, que: `la norma del ${corta(dia.fecha)}: ${normaTxt(dia)} — una tabla o flujograma más → tarjeta`, av: `una tabla más de la ${normaTxt(dia).replace(/\s*\(.*$/, '')}` });
    } else if (ds.norma) aborta(`${dia.fecha}: destinos_18.norma sobra (${normaTxt(dia) ? 'la norma cabe' : 'el día no tiene norma'})`);
    // v6.09b lote 1-ter (hallazgo 3): la pizarra no «vuelve»: es repaso sin material propio → no se hace hoy; su hueco lo usa lo que va primero a las 18:00
    if (!kExtra && !normaTxt(dia)) DESPL.push({ tipo: 'pizarra', de: dia.fecha, usa: pend.map((u) => u.postTest || u.que).join(' + ') || 'lo pendiente' });
    const nuevas = pFlash ? Math.min(30, Math.floor(kFlash * 60 / 50)) : 0;
    // v6.09b lote 1-ter (hallazgo 2): las nuevas que faltan para las 30 van con MINUTOS a un domingo con ENCAPS (destinos_18.flash), primer paso NO opcional
    //   (≈50 s por tarjeta nueva); antes «primeras de la cola» de una 18:00 que ya hacía sus 30 nuevas en sus 25′ (sin hueco)
    if (nuevas < 30) {
      if (!ds.flash) aborta(`${dia.fecha} 18:00: faltan ${30 - nuevas} flashcards nuevas y no tienen destino: pon mananas[].destinos_18.flash (un domingo con ENCAPS)`);
      DESPL.push({ tipo: 'flash', de: dia.fecha, paso: pFlash, faltan: 30 - nuevas, dest: ds.flash });
    } else if (ds.flash) aborta(`${dia.fecha}: destinos_18.flash sobra (las 30 nuevas caben a las 18:00)`);
    // v6.09b lote 1-quater (R2 · N6): si lo pendiente es una clase «si no la viste en vivo», cada traslado de hoy es condicional (lo dice el día que lo recibe)
    // v6.09b lote 1-quater FX1 (revisión V3): la condición nombra las DOS ramas que desplazan las 18:00 normales: la clase «si no la viste en vivo» (CI 2/8) y la
    //   clase del plan B del domingo de llegada (ET 2/3: su `alternativa`). Antes solo la primera: en la rama del plan B los traslados decían «no va» y se perdían.
    if (condU) {
      const mA = /^Si el (dom \d+) fue con el plan B.*?en su lugar la ((?:SP|CI|GES|INV|ET) \d+\/\d+)/.exec(condU.alt || '');
      for (const x of DESPL.filter((y) => y.de === dia.fecha)) x.cond = { clase: condU.postTest, alt: mA ? mA[2] : null, dom: mA ? mA[1] : null };
    }
  } else if (dia.destinos_18) aborta(`${dia.fecha}: destinos_18 sobra (las 18:00 van enteras)`);
  // v6.09 (16-nov-2026): en un DOMINGO DE PLAN (dom 27-dic) a las 17:00 está el baile → estos 45′ son FLEXIBLES (bloque sin hora en plantillasV6); la
  //   franja de la guía es solo un ejemplo: 20:00-20:45, al volver (la tarde es del SHIP y del Anki del domingo)
  const domP = esDomPlan(dia.fecha);
  // v6.09 (fix revisión 16-nov, joseph 3): con hora propia (_meta.domingos_plan.tarde; dom 27-dic: 10:45-11:30) estos 45′ van a HORA FIJA al terminar la
  //   mañana: el domingo solo se estudia antes de las 17:00 (baile) y a mediodía hay un compromiso personal. Antes: flexibles, de ejemplo 20:00-20:45.
  const hDom = DOM_PLAN_H.get(dia.fecha);
  const avisoDom = !domP ? '' : hDom
    ? `Domingo de plan: estos 45′ van a hora fija, al terminar la mañana (${hDom.tarde[0]}-${hDom.tarde[1]}), no después del baile de las 17:00.${hDom.compromiso ? ` Quedan ${aMin(hDom.compromiso) - aMin(hDom.tarde[1])}′ de margen antes del compromiso personal de las ${hDom.compromiso}.` : ''}`
    : 'Hoy es domingo: a las 17:00 está el baile, así que estos 45′ son flexibles (de ejemplo 20:00-20:45, al volver; o en un hueco antes de las 17:00).';
  GT[dia.fecha] = guia(domP ? (hDom ? fr(hDom.tarde[0], hDom.tarde[1]) : fr('20:00', '20:45')) : fr('18:00', '18:45'), `ENCAPS · CIFRAS, NORMAS Y FLASHCARDS${domP ? (hDom ? ' (domingo de plan: al terminar la mañana)' : ' (flexible: hoy es domingo)') : ''}${pendM.length ? ' (+ lo pendiente de la mañana)' : ''}${pendF.length ? ` (+ ${pendF.map((u) => u.postTest).join(' + ')} en diferido)` : ''}${tx ? ` (+ ${tx.q}Q de la mañana del ${corta(tx.de)})` : ''}`, [...pasosP, ...pasosR], [R99],
    pendM.length ? `lo pendiente de la mañana terminado${pFlash ? ' y las flashcards del día hechas' : ''}` : pendF.length ? `${pendF.map((u) => u.postTest).join(' + ')} vista en sus tramos útiles${pFlash ? ' y las flashcards del día hechas' : ''}` : 'flashcards del día hechas y las cifras de hoy dichas en voz alta',
    { aviso: [avisoDom, pendM.length ? `Hoy la teoría no cupo entera en ${GM[dia.fecha].filter((g) => / · TEORÍA · /.test(g.titulo)).map((g) => g.franja.replace('–', '-')).join(' y ') || `${horaProt(dia.fecha, '07:30')}-${horaProt(dia.fecha, '09:15')}`}: lo que falta va primero (${P_}′).` : pendF.length ? `Hoy a las 18:00 va ${pendF.map((u) => u.postTest).join(' + ')} en diferido (${P_}′): es la clase que no cabe en ninguna mañana.` : '',
      tx ? `Hoy, primero, ${tx.q}Q de la mañana ${J.mananas.find((x) => x.fecha === tx.de).n}/${NM} (${corta(tx.de)}): allí van ${J.mananas.find((x) => x.fecha === tx.de).banqueo.n}Q cronometradas y estas ya no caben (corrección a ${String(CORR_Q).replace('.', ',')}′ por pregunta).` : ''].filter(Boolean).join(' ') || undefined,
      // v6.09b lote 1-quater (R2 · N5): la `alternativa` de una clase pendiente (plan B de otro día: vie 27-nov, la ET 2/3 si el dom 22 fue con el plan B) va al
      //   plan B de esta 18:00 (antes, al final del «cómo», pos. 400-570: el Calendar la cortaba y mezclaba dos planes en un paso)
      planB: pend.filter((u) => u.alt).map((u) => u.alt).join(' ') || undefined });
}
function normaTxt(dia) { return dia.norma && dia.norma !== 'verificación' ? dia.norma : null; }

// ── 05:30 · repasos ENCAPS (15′) tras el Anki USMLE · todos los días de plan de F1 (L-V sin SKIP) ──────────────────
const GA = {};
const GT_FECHAS = J.mananas.map((x) => x.fecha);
const PRIMERA_M = GT_FECHAS[0];
for (const d of DIAS_GA) {
  const w = dow(d);
  // v6.09 (16-nov-2026, «el primer día no repasa lo que aún no existe»): hasta la PRIMERA mañana ENCAPS incluida (mar 17 y mié 18-nov) no hay ninguna
  //   tarjeta ENCAPS estudiada (las primeras se hacen el mié 18 a las 11:40 y a las 18:00) → sin repasos: los 15′ se dicen (mazos listos + USMLE)
  const ini = gaIni(d), minGA = aMin('05:45') - aMin(ini); // v6.09b: 25′ (lun · mié · vie y jue 31-dic) o 15′ (mar · jue)
  if (d <= PRIMERA_M) {
    GA[d] = guia(fr(ini, '05:45'), `ANKI · repasos ENCAPS ${minGA}′ (después del USMLE) · hoy aún sin tarjetas ENCAPS`, [
      P(5, 'Sin repasos ENCAPS: aún no hay tarjetas', `Las primeras tarjetas ENCAPS se hacen ${d === PRIMERA_M ? 'hoy' : `el ${corta(PRIMERA_M)}`} (11:40 y 18:00); los repasos empiezan después. Estos 5′: comprueba que los mazos ENCAPS::Cifras, ENCAPS::Flashcards y APEX::ENCAPS están en Anki, con FSRS.`),
      // v6.09 (fix revisión 16-nov, joseph 1): antes del D2 del Step 1 el mazo USMLE también está vacío → minutos libres (antes «10′ más de vencidas USMLE»)
      d < USMLE_D2
        ? P(minGA - 5, `Libres: los mazos aún están vacíos (ENCAPS nace ${d === PRIMERA_M ? 'hoy' : `el ${corta(PRIMERA_M)}`} a las 11:40; USMLE, el ${corta(USMLE_D2)})`, `La primera tarjeta USMLE nace por APEX el ${corta(USMLE_D2)} (D2): hoy no hay vencidas que repasar. Termina antes o prepara la mañana.`)
        : P(minGA - 5, `USMLE: ${minGA - 5}′ más de vencidas`, 'Alarga el Anki USMLE con estos minutos (o terminas antes).'),
    ], [], 'mazos ENCAPS listos en Anki (aún sin repasos)', { aviso: GT_FECHAS.includes(d) ? 'Hoy la mañana 07:15-12:00 y las 18:00 son de ENCAPS.' : undefined });
    continue;
  }
  // v6.07 (fix): las ★ de las cifras de las 18:00 (lun · mié · vie) se repasan en el PRIMER Anki 05:30 que sigue: «de ayer» solo el día
  //   siguiente a una tarde ENCAPS, «del viernes» el lunes; si ya hubo otro Anki 05:30 en medio (mié, vie, lun 28-dic), no hay ★ pendientes
  // v6.10g (revisión 18-nov · dom 27-dic): la cadena va en orden REAL (= el de plan salvo un día fuera del alias, el domingo de plan): las ★ pendientes son las
  //   de las tardes ENCAPS cuyo día real cae entre el Anki 05:xx anterior (incluido: su tarde va después) y el de hoy. Antes, en orden de plan, las ★ del dom
  //   27-dic iban al plan del lun 28 (mar 29 real) y el lun 28 real (plan jue 24), el primer Anki después de ese domingo, no las nombraba
  // v6.11 (revisión c32): en orden de día REAL con la fecha de plan SIN DÍA (el mié 30-dic) detrás del último día del alias (ordenRealDe): con realDe quedaba en
  //   el mié 30 real (que hace el plan del jue 24) y el Anki del jue 31-dic real nombraba «las ★ del mié 30-dic», de una tarde que aún no tiene día
  const ordR = (f) => require('./gen_fechas_v6').ordenRealDe(f, F6);
  const dR = ordR(d), prevGA = GA_FECHAS.map(ordR).filter((r) => r < dR).sort().pop();
  const pendT = GT_FECHAS.filter((x) => ordR(x) < dR && (!prevGA || ordR(x) >= prevGA)).sort((a, b) => (ordR(a) < ordR(b) ? -1 : 1));
  const ultT = pendT[pendT.length - 1];
  // v6.10d (fix revisión 18-nov): «del viernes» solo sin alias (con alias el lunes de plan es un martes real y el viernes, un lunes): si no, la fecha de plan
  const deT = !pendT.length ? null : pendT.length > 1 ? `del ${pendT.map(corta).join(' y del ')}`
    : ultT === addDias(d, -1) ? 'de ayer' : w === 1 && ultT === addDias(d, -3) && realDe(d) === d ? 'del viernes' : `del ${corta(ultT)}`;
  const cif = P(10, deT ? `ENCAPS::Cifras · vencidas (y las ★ ${deT})` : 'ENCAPS::Cifras · vencidas', 'Responde en voz alta antes de girar. FSRS: Good / Again, nunca Hard ni Easy.');
  // v6.09b lote 1-ter (hallazgo 2): las vencidas de una tarde que no hizo flashcards (vie 27-nov) llegan a ESTE Anki (el primero de después): el texto lo dice
  const vencX = DESPL.filter((x) => x.tipo === 'flash' && !x.paso && GA_FECHAS.find((y) => y > x.de && y < x.dest) === d);
  // v6.09b lote 1-quater (R2 · N6): si esa tarde fue una clase «si no la viste en vivo», las vencidas solo quedaron sin hacer si sus 18:00 fueron esa clase
  const vencTxt = vencX.length ? ` (con las del ${vencX.map((x) => corta(x.de)).join(' y ')}, ${vencX.every((x) => x.cond) ? 'si sus 18:00 no fueron las normales' : 'que no se hicieron a sus 18:00'})` : '';
  GA[d] = guia(fr(ini, '05:45'), `ANKI · repasos ENCAPS ${minGA}′ (después del USMLE)`, minGA >= 25 ? [
    cif,
    // remate v6.10m (rev. c16 · visibilidad #1): la regla de DR LOPEZ, con su consecuencia, entera en el «cómo» (el Calendar lo corta a 110 y dejaba «Si aún no
    //   importaste el mazo de DR LOPEZ …» sin decir adónde van los minutos; «el mazo que más crece», al «qué»); en los días cortos va en el «qué», pegada a
    //   ENCAPS::Flashcards (su «cómo» lleva su destino con fecha)
    P(10, `ENCAPS::Flashcards (el mazo que más crece: las nuevas de cada 18:00) · vencidas${vencTxt}`, 'Sin el mazo de DR LOPEZ importado (decisión tuya), estos 10′ van a ENCAPS::Cifras.'),
    // v6.10o (auditoría c17 · diffs #17): la consecuencia de DR LOPEZ también aquí (sus minutos iban a ENCAPS::Flashcards sin la condición), dentro de los 110
    //   del Calendar: «las tarjetas APEX de las 16:15» pasa al «qué»
    P(minGA - 20, 'APEX::ENCAPS · vencidas (las tarjetas APEX de las sesiones de las 16:15)', 'Si hoy no hay vencidas, estos minutos van a ENCAPS::Flashcards (sin el mazo de DR LOPEZ: a ENCAPS::Cifras).'),
  ] : [
    cif,
    // v6.09b lote 1-quater FX1 (revisión V1): lo que no acabes ya no va «al próximo Anki de 25′» (sus 10′ ya tienen sus vencidas): va a la próxima 18:00, que hace
    //   las vencidas PRIMERO (y ese día entran menos nuevas)
    // v6.10o (auditoría c17 · diffs #17): sin cambio a propósito — la condición de DR LOPEZ ya va en el «qué» de ESTA misma viñeta, pegada a ENCAPS::Flashcards (y
    //   pasarla al «cómo» llevaría la fecha de destino más allá del carácter 100: check_rutina_guia 26h)
    P(minGA - 10, `ENCAPS::Flashcards (sin el mazo de DR LOPEZ importado, decisión tuya: ENCAPS::Cifras) + APEX::ENCAPS · vencidas${vencTxt}`, `Primero ENCAPS::Flashcards; las que no acabes → ${destPm(J.mananas.filter((x) => x.fase !== 'cierre').map((x) => x.fecha).find((x) => realDe(x) > realDe(d)) || d)} (allí van primero las vencidas; ese día entran menos nuevas).`),
  ], [], minGA >= 25 ? '0 vencidas en ENCAPS::Cifras, ENCAPS::Flashcards y APEX::ENCAPS' : '0 vencidas en ENCAPS::Cifras (y en ENCAPS::Flashcards si ya existe)', { aviso: GT_FECHAS.includes(d) ? 'Hoy la mañana 07:15-12:00 y las 18:00 son de ENCAPS.' : undefined }); // v6.09: el aviso, si ese día hay mañana ENCAPS (jue 31-dic: jueves sin Step); antes, si no era día de Step
}

// ── v6.09b lote 1-bis (hallazgo 2): DESTINO de cada paso de las 18:00 que no cabe ──────────────────────────────────────────────
//   cifras / norma → mananas[].destinos_18 = un domingo con ENCAPS (primer paso NO opcional de su ENCAPS: SUN_AUTO) o una 18:00 POSTERIOR con la pizarra del
//   mes libre (la pizarra de ese día lleva ese material: es el mismo repaso de cifras y normas del mes). Lo que no encuentra destino ABORTA. El aviso de la
//   tarde lo dice, con los destinos PRIMERO (el Calendar corta el aviso a 240 caracteres).
// v6.09b lote 1-ter (revisión R del lote 1-bis): (hallazgo 3) la pizarra del mes es repaso sin material propio: cuando no cabe NO «vuelve» otro día (ese
//   paso ya lo ocupaban las cifras movidas: el mié 9-dic recibía 4 encargos en 10′) → no se hace y el aviso dice quién usa su hueco; el día que su pizarra
//   lleva material movido (F1) lo dice también. (hallazgo 2) las flashcards nuevas que faltan para las 30 → destinos_18.flash = un domingo con ENCAPS, con sus
//   minutos (≈50 s por tarjeta nueva) como primer paso NO opcional (antes «primeras de la cola» de una 18:00 que ya hacía sus 30 en sus 25′); las vencidas de
//   una tarde sin flashcards, el primer Anki ENCAPS de después (su texto lo dice) o, si no hay ninguno antes del domingo, con las nuevas ese domingo.
const SUN_AUTO = {}; // domingo → [{ de, min, paso, corto, desc }]
/** v6.09b lote 1-quater FX1: «Solo si las 18:00 del vie 27-nov no fueron las normales (CI 2/8 en diferido, o la ET 2/3 por el plan B del dom 22)» */
const condDe = (x) => `Solo si las 18:00 del ${corta(x.de)} no fueron las normales (${x.cond.clase} en diferido${x.cond.alt ? `, o la ${x.cond.alt} por el plan B del ${x.cond.dom}` : ''})`;
const condCorta = (x) => `si las 18:00 del ${corta(x.de)} no fueron las normales`;
{
  const esPiz = (p) => p.que.startsWith(PIZARRA_QUE.replace(/ \(.*$/, ''));
  const PIZ_USADA = new Map();
  const INT_DESDE = F6.encaps.intensiva_desde; // la pizarra del mar 5-ene (2027) conserva su texto: el lote 1-ter no toca 2027
  const destTxt = {}, recTxt = {};
  const add = (f, t) => { (destTxt[f] = destTxt[f] || []).push(t); };
  /** v6.09b lote 1-quater: un primer paso que no va → el domingo con hora de fin fija (antes_hasta: el compromiso) empieza después; si no, es más corto */
  const acortaDom = (f, m) => ((J.domingos.find((y) => y.fecha === f) || {}).antes_hasta ? `empieza ${m}′ después` : `es ${m}′ más corto`);
  // v6.10w (dom 22-nov): REGLA GENERAL de los destinos de domingo — un domingo con ENCAPS POSTERIOR al día REAL del origen (con el alias, las 18:00 de un día de
  //   plan se hacen días después): si el domingo del JSON ya pasó en días reales, va al siguiente domingo con ENCAPS (antes abortaba y se cambiaba a mano)
  const destDom = (x) => { const f0 = x.dest; if (!f0 || dow(f0) !== 0 || !domConEncaps(f0) || f0 > realDe(x.de)) return f0; return J.domingos.map((y) => y.fecha).find((y) => y > realDe(x.de) && domConEncaps(y)) || f0; };
  for (const x of DESPL) if (x.dest) x.dest = destDom(x);
  for (const x of DESPL.filter((y) => y.tipo === 'cifras' || y.tipo === 'norma')) {
    const f = x.dest;
    if (!/^20\d\d-\d\d-\d\d$/.test(f || '') || f <= x.de || (domConEncaps(f) && f <= realDe(x.de))) aborta(`${x.de} 18:00: destinos_18.${x.tipo} = ${f}: tiene que ser una fecha posterior (un domingo, posterior a su día real ${realDe(x.de)})`);
    const como = x.tipo === 'cifras'
      ? (d) => `Las filas de esos códigos en DATA/ENCAPS/CIFRAS_CRITICAS_2027-I.md (= mazo ENCAPS::Cifras): tapa el valor y dilo. Las que no salgan → ★ para ${proxAnkiTxt(d, GA_FECHAS) || 'la próxima sesión de Anki'}.`
      : () => `Una tabla o flujograma más de esa norma → tarjeta. Ruta: ${RUTA.normas}.`;
    // v6.09b lote 1-quater (R2 · N6): traslado de una tarde con clase «si no la viste en vivo» (vie 27-nov, CI 2/8) → el día que lo recibe dice cuándo va
    const condTxt = (alt) => (x.cond ? `${condDe(x)}; si fueron las normales, ${alt}. ` : '');
    if (domConEncaps(f)) {
      (SUN_AUTO[f] = SUN_AUTO[f] || []).push({ de: x.de, min: 10, corto: x.tipo === 'cifras' ? `cifras del ${corta(x.de)}` : `norma del ${corta(x.de)}`, cond: x.cond ? condCorta(x) : null,
        desc: `${x.nombre} (10′), que no ${x.tipo === 'cifras' ? 'cupieron' : 'cupo'} a las 18:00 del ${corta(x.de)}${x.cond ? ' (solo si esas 18:00 no fueron las normales)' : ''}`,
        paso: P(10, `${x.tipo === 'cifras' ? `${x.que} (las del ${corta(x.de)}: no cupieron a las 18:00)` : cap(x.que)} · NO opcional`, `${condTxt(`ya ${x.tipo === 'cifras' ? 'las dijiste' : 'la hiciste'} ese día: este paso no va y el bloque ${acortaDom(f, 10)}`)}${como(f)}`, x.tipo === 'norma' ? L99 : undefined) });
      add(x.de, `${x.av} → ${corta(f)} (su ENCAPS, 10′)`);
    } else if (GT[f] && GT[f].pasos.some(esPiz) && !PIZ_USADA.has(f)) {
      const i = GT[f].pasos.findIndex(esPiz);
      GT[f].pasos[i] = P(10, `Pizarra del mes · hoy con ${x.tipo === 'cifras' ? `las cifras y plazos del ${corta(x.de)}: ${x.que.replace(/^Cifras y plazos de /, '')}` : x.que} (no ${x.tipo === 'cifras' ? 'cupieron' : 'cupo'} a las 18:00 de ese día)`,
        `${condTxt(`estos 10′ son la pizarra del mes de siempre (${PIZARRA_COMO.replace(/^Cifras y definiciones del mes en la pizarra: /, '').replace(/\. Lo que se aprende.*$/, '')})`)}${como(f)} Es el repaso de la pizarra del mes, con ese material.`, x.tipo === 'norma' ? L99 : undefined);
      PIZ_USADA.set(f, x.de);
      add(x.de, `${x.av} → ${corta(f)} 18:00 (pizarra del mes, 10′)`);
      if (f < INT_DESDE) recTxt[f] = `Hoy la pizarra del mes ES ${x.tipo === 'cifras' ? `las cifras y plazos del ${corta(x.de)}` : `la norma del ${corta(x.de)} (${x.av})`}, que no ${x.tipo === 'cifras' ? 'cupieron' : 'cupo'} a las 18:00 de ese día${x.cond ? ` (si las 18:00 de ese día no fueron las normales; si lo fueron, la pizarra de siempre)` : ''}: sus 10′ son para eso y el repaso general de la pizarra no se hace hoy (es repaso sin material propio).`;
    } else aborta(`${x.de} 18:00: destinos_18.${x.tipo} = ${f}: no es un domingo con ENCAPS ni una 18:00 con la pizarra del mes libre${PIZ_USADA.has(f) ? ` (ya la usa lo del ${PIZ_USADA.get(f)})` : ''}`);
  }
  for (const x of DESPL.filter((y) => y.tipo === 'flash')) {
    const f = x.dest;
    if (!domConEncaps(f) || f <= realDe(x.de)) aborta(`${x.de} 18:00: destinos_18.flash = ${f}: tiene que ser un domingo con ENCAPS posterior a su día real ${realDe(x.de)} (las ${x.faltan} nuevas van como primer paso NO opcional)`);
    const fV = x.paso ? null : GA_FECHAS.find((y) => y > x.de && y < f) || null;
    const conVenc = !x.paso && !fV;
    // v6.09b lote 1-quater FX1 (revisión V1 · flashcards): las vencidas que van con las nuevas tienen sus minutos (5′ ≈ 20 repasos a 15 s; antes 0′: «30 nuevas → 25′ + vencidas»)
    const VENC_DOM = 5, minN = Math.round(x.faltan * 50 / 60), min = minN + (conVenc ? VENC_DOM : 0);
    (SUN_AUTO[f] = SUN_AUTO[f] || []).push({ de: x.de, min, corto: `${x.faltan} flashcards del ${corta(x.de)}`, cond: x.cond ? condCorta(x) : null,
      desc: `las ${x.faltan} flashcards nuevas (${minN}′)${conVenc ? ` y las vencidas (${VENC_DOM}′)` : ''} que no cupieron a las 18:00 del ${corta(x.de)}${x.cond ? ' (solo si esas 18:00 no fueron las normales)' : ''}`,
      // v6.10p (auditoría c18 · dias-clave #1): sin vencidas, la alternativa sin el mazo de DR LOPEZ en el «qué», detrás del nombre del mazo (en el «cómo» iba al
      //   final y el Calendar la cortaba; «(no cupieron …)» para caber en los 150 con «· NO opcional»). Con vencidas, ya se ve en el «cómo» («Primero las vencidas … (sin el mazo de DR LOPEZ: …»)
      paso: P(min, `Flashcards ENCAPS::Flashcards${conVenc ? '' : ' (sin mazo DR LOPEZ → ENCAPS::Cifras)'} · ${conVenc ? `vencidas (${VENC_DOM}′) + ` : ''}${x.faltan} nuevas (${conVenc ? 'las que ' : ''}no cupieron a las 18:00 del ${corta(x.de)}) → ${conVenc ? `${minN}′ · ${min}′ en total` : `${min}′`} · NO opcional`,
        `${x.cond ? `${condDe(x)}; si fueron las normales, ya las hiciste ese día: este paso no va y el bloque ${acortaDom(f, min)}. ` : ''}Anki, ≈50 s por tarjeta nueva: son las siguientes de la cola del mazo, en el orden del temario.${conVenc ? ` Primero las vencidas de ENCAPS::Flashcards (sin mazo DR LOPEZ → ENCAPS::Cifras; ${VENC_DOM}′, ≈20 a 15 s); después, las nuevas del ${corta(x.de)}.` : ''} Si aún no importaste el mazo de DR LOPEZ (decisión tuya), haz las nuevas de ENCAPS::Cifras.`) }); // v6.10o (auditoría c17 · diffs #17): la condición de DR LOPEZ, también en las vencidas (la fecha de las nuevas alarga el corte del Calendar hasta ahí)
    if (x.paso) {
      // FX1: el destino al principio del «cómo» (en el «qué», tras «vencidas primero…», quedaba en la pos. 164 y el Calendar lo cortaba)
      const mNq = /^Las nuevas que no quepan → la 18:00 del ([^,]+), por delante de las de ese día \(esperan en la cola del mazo\)\. /.exec(x.paso.como);
      x.paso.como = mNq ? `Las otras ${x.faltan} nuevas → ${corta(f)}, ${min}′ (su ENCAPS) · las que hoy no quepan → ${mNq[1]} 18:00. ${x.paso.como.slice(mNq[0].length)}` : `Las otras ${x.faltan} nuevas → ${corta(f)}, ${min}′ (su ENCAPS). ${x.paso.como}`;
      add(x.de, `${x.faltan} de las 30 flashcards nuevas → ${corta(f)} (su ENCAPS, ${min}′)`);
    } else add(x.de, `30 flashcards nuevas${conVenc ? ' y vencidas' : ''} → ${corta(f)} (su ENCAPS, ${min}′)${fV ? `; vencidas → ${corta(fV)} ${gaIni(fV)}` : ''}`);
  }
  // la pizarra del mes que no cabe: no se hace (repaso sin material propio); va al final de los destinos y dice quién usa su hueco
  for (const x of DESPL.filter((y) => y.tipo === 'pizarra')) add(x.de, `la pizarra de hoy no se hace: es repaso sin material propio; su hueco lo usa ${x.usa}`);
  for (const [f, ts] of Object.entries(destTxt)) {
    GT[f].aviso = [`No cabe hoy, va con fecha: ${ts.join(' · ')}.`, GT[f].aviso].filter(Boolean).join(' ');
    // v6.09b lote 1-quater FX1 (revisión V3): en la rama del plan B (otra clase llena estas 18:00) los traslados también van, y su plan B lo dice
    if (GT[f].planB && DESPL.some((x) => x.de === f && x.cond && x.cond.alt)) GT[f].planB = `${GT[f].planB} En ese caso, los traslados del aviso SÍ van: ${ts.join(' · ')}.`;
  }
  for (const [f, t] of Object.entries(recTxt)) GT[f].aviso = [t, GT[f].aviso].filter(Boolean).join(' ');
  // ningún día pierde un paso de las 18:00 sin destino: los 3 de siempre (flashcards · cifras · norma o pizarra) o su destino
  for (const dia of J.mananas) {
    const g = GT[dia.fecha]; if (!g || dia.fase === 'cierre') continue;
    const tiene = (re) => g.pasos.some((p) => re.test(p.que));
    const dsp = (t) => DESPL.some((x) => x.de === dia.fecha && x.tipo === t);
    if (!tiene(/^Flashcards ENCAPS::Flashcards/) && !dsp('flash')) aborta(`${dia.fecha} 18:00: sin flashcards y sin destino`);
    if (!tiene(/^Cifras y plazos de /) && !dsp('cifras')) aborta(`${dia.fecha} 18:00: sin cifras y sin destino`);
    if (!tiene(/^Norma del día: |^Pizarra del mes/) && !dsp('norma') && !dsp('pizarra')) aborta(`${dia.fecha} 18:00: sin norma ni pizarra y sin destino`);
  }
}
// v6.10z-b (lun 23-nov ≈09:15 · la mañana ENCAPS 1/21 del lun 23 empezó a las 09:00 y cerró a las 12:00): LO QUE NO CUPO de una mañana y va a un DOMINGO
//   (_meta.no_cupo con fecha = un domingo con ENCAPS posterior a su día real) → PRIMEROS PASOS NO opcionales de su ENCAPS (SUN_AUTO), en el orden de la mañana
//   (antesDom ordena por «de»: delante del PPT de SP 2/11, clase del lun 23): las Q que faltaron del banqueo (n × 72 s, sin material, con confianza) y la
//   verificación en la norma (los minutos de su paso de la mañana). El paso de origen lo dice al principio de su «cómo» (corte del Calendar: check_rutina_guia
//   26h). Lo que no se recoloca (orientación, pausa, «hasta 40Q si sobra», lo proporcional de la corrección) no se pinta.
// v6.10z-d: minutos de la corrección de las Q del banqueo que van a tandas de un sábado (ítem «correccion» de un domingo): q × 0,85′; el JSON puede fijar `min`
//   entre el suelo y el techo de esa cuenta (dom 29-nov: 30 × 0,85 = 25,5′ → 25′, los del plan de Joseph de las 09:44). Lo usan el domingo y las tandas («Vuelta a
//   las marcadas» dice cuánto dura su corrección)
const corrNoCupo = (x, q) => {
  const ex = q * CORR_Q, min = x.min == null ? Math.ceil(ex) : x.min;
  if (!Number.isInteger(min) || min < Math.floor(ex) || min > Math.ceil(ex)) aborta(`_meta.no_cupo ${x.fecha}: correccion de ${q}Q con min ${x.min} (entre ${Math.floor(ex)} y ${Math.ceil(ex)}′: ${q} × ${CORR_Q}′)`);
  return min;
};
for (const x of NO_CUPO.filter((y) => dow(y.fecha) === 0)) {
  const m = J.mananas.find((d) => d.fecha === x.de);
  if (!m || !GM[x.de]) aborta(`_meta.no_cupo ${x.fecha}: «de» ${x.de} no es una mañana ENCAPS`);
  if (!domConEncaps(x.fecha) || x.fecha <= realDe(x.de)) aborta(`_meta.no_cupo ${x.fecha}: tiene que ser un domingo con ENCAPS posterior al día real de la mañana (${realDe(x.de)})`);
  if (!/^\d\d:\d\d$/.test(x.inicio_real || '') || !x.motivo) aborta(`_meta.no_cupo ${x.fecha} (${x.item}): inicio_real (HH:MM) y motivo`);
  const pasosM = GM[x.de].flatMap((g) => g.pasos);
  const L_ = (SUN_AUTO[x.fecha] = SUN_AUTO[x.fecha] || []);
  if (x.item === 'banqueo') {
    const nQ = m.banqueo && m.banqueo.n, area = m.banqueo && m.banqueo.area;
    if (!nQ || !Number.isInteger(x.q) || !(x.q > 0 && x.q < nQ) || !x.fuente || !x.si_no) aborta(`_meta.no_cupo ${x.fecha}: banqueo con q (< ${nQ || '?'}Q de la mañana), fuente y si_no`);
    // v6.10z-d: el banqueo de una mañana va a un domingo O a tandas de un sábado (el paso de origen dice un solo destino)
    if (NO_CUPO.some((y) => y !== x && y.de === x.de && y.item === 'banqueo')) aborta(`_meta.no_cupo ${x.fecha}: el banqueo del ${x.de} ya tiene otro destino (o un domingo o las tandas de un sábado)`);
    const pB = pasosM.find((p) => p.que.startsWith(`${nQ}Q de ${area} `));
    if (!pB) aborta(`_meta.no_cupo ${x.fecha}: la mañana del ${x.de} no tiene el paso «${nQ}Q de ${area}»`);
    const min = Math.ceil(x.q * 72 / 60);
    L_.push({ de: x.de, min, corto: `${x.q}Q de ${area}`, desc: `las ${x.q}Q de ${area} (${min}′) que faltaron en el banqueo de la mañana del ${corta(x.de)}`,
      paso: P(min, `${x.q}Q de ${area} que faltaron el ${corta(x.de)} · ${x.fuente} · modo examen (72 s c/u) → ${min}′ · NO opcional`,
        `${cap(x.si_no)}. Sin material, sin mirar nada. ${RESERVA} ${CONFIANZA} Ruta: ${RUTA.drLopezPT}.`) });
    pB.como = `Si hoy no cupo: ${x.q} de las ${nQ} → ${corta(x.fecha)}, primer paso de su ENCAPS (${min}′) · ${pB.como}`;
  } else if (x.item === 'verificacion') {
    const pV = pasosM.find((p) => /^Verificación en la norma/.test(p.que));
    if (!pV) aborta(`_meta.no_cupo ${x.fecha}: la mañana del ${x.de} no tiene paso de verificación en la norma`);
    L_.push({ de: x.de, min: pV.min, corto: 'verificación en la norma', recurso: R99, desc: `la verificación en la norma de las reglas nuevas (${pV.min}′), que no cupo en la mañana del ${corta(x.de)}`,
      paso: P(pV.min, `Verificación en la norma de cada regla nueva del ${corta(x.de)} (no cupo ese día) → ${pV.min}′ · NO opcional`, `${VERIF_NORMA} Ruta: ${RUTA.normas}.`, L99) });
    pV.como = `Si hoy no cupo → ${corta(x.fecha)}, primeros pasos de su ENCAPS (${pV.min}′) · ${pV.como}`;
  } else if (x.item === 'correccion') {
    // v6.10z-d (lun 23-nov ≈09:45 · la mañana fue 10:00-12:00, solo teoría y post-tests): la CORRECCIÓN de las Q del banqueo que van a las tandas de un sábado
    //   (_meta.no_cupo › banqueo con franja; sáb 28-nov 05:30 · 08:10 · 14:30, las 30Q) → primer paso NO opcional del ENCAPS del domingo siguiente (dom 29-nov),
    //   a 0,85′ por pregunta (la tasa de la mañana; corrNoCupo), con la clave oficial; va delante de la verificación en la norma (orden del JSON) y cierra con el
    //   % CIEGO (se calcula aquí, con la clave). El paso de la corrección de la mañana lo dice al principio de su «cómo»
    const tandas = NO_CUPO.filter((y) => y.de === x.de && y.item === 'banqueo' && dow(y.fecha) === 6);
    if (!tandas.length || tandas.some((y) => !(y.fecha < x.fecha) || !Number.isInteger(y.q))) aborta(`_meta.no_cupo ${x.fecha}: correccion sin tandas del banqueo del ${x.de} en un sábado ANTERIOR a este domingo`);
    if (NO_CUPO.some((y) => y !== x && y.de === x.de && y.item === 'correccion')) aborta(`_meta.no_cupo ${x.fecha}: la corrección del banqueo del ${x.de} ya tiene destino`);
    const area = m.banqueo.area, q = tandas.reduce((a, y) => a + y.q, 0), min = corrNoCupo(x, q);
    const sabs = [...new Set(tandas.map((y) => y.fecha))].sort(), sabTxt = sabs.map(corta).join(' y ');
    const pC = pasosM.find((p) => /^Cada fallo y cada dudosa de las .*Q de hoy/.test(p.que));
    if (!pC) aborta(`_meta.no_cupo ${x.fecha}: la mañana del ${x.de} no tiene el paso de la corrección («Cada fallo y cada dudosa de las …Q de hoy»)`);
    L_.push({ de: x.de, min, corto: `corrección ${q}Q de ${area}`, recurso: R99, desc: `la corrección de las ${q}Q de ${area} del ${sabTxt} (${min}′), las que no cupieron en el banqueo de la mañana del ${corta(x.de)}`,
      paso: P(min, `Corrección de las ${q}Q de ${area} del ${sabTxt} (cada fallo y cada dudosa) → ${min}′ · NO opcional`,
        `Con la clave oficial y su explicación: ${TIPOS_ERROR}. Mira por qué es correcta la buena, no solo la tuya. ${String(CORR_Q).replace('.', ',')}′ por pregunta. Al terminar, el % CIEGO (correctas Y seguras ÷ total) al registro.`) });
    pC.como = `Si hoy no cupo: la corrección de las ${q}Q del ${sabTxt} → ${corta(x.fecha)}, primer paso de su ENCAPS (${min}′) · ${pC.como}`;
  } else aborta(`_meta.no_cupo ${x.fecha}: «${x.item}» en un domingo (solo banqueo, correccion o verificacion)`);
}

// ── v6.09b lote 1-quater FX1 (revisión V1 · cifras de las 18:00): el material se fija al tiempo ──────────────────────────────────────────────────────
//   Cada paso «Cifras y plazos …» de F1 (10′) pedía «las filas de esos códigos» de CIFRAS_CRITICAS_2027-I.md §3: de 9 a 112 filas en los mismos 10′. Ahora son 40
//   filas (15 s por fila, la cadencia del propio fichero §1.4: ≈20 repasos en 5′): primero lo que no cupo en el paso anterior, después las filas de los códigos de
//   hoy (en el orden de la tabla); si sobran, «Resto (N filas) → <siguiente paso de cifras, con fecha>» (primeras de su paso); si faltan, se completa con un
//   CURSOR que recorre la tabla (los días de área: su área; después los 8 críticos), que sigue donde quedó el día anterior. 2027 (mar 5-ene) no se toca.
// v6.11 (ítem 23.1, lun 23-nov · FUGA A LOS TESTS CIEGOS): una fila cuya «Fuente verificada» cita un ítem real (2025-1A-Q35, 2024-2A-Q12, 2025-2-Q59…, también
//   tras una coma o un «·»; el cero a la izquierda no cuenta) que está en un RUNNER CIEGO aún no hecho NO sale en ese paso (ni en las de hoy, ni en lo que pasa
//   del anterior, ni en el relleno). Runner ciego = DATA/ENCAPS/BANCO_PROPIO/*.json con tipoRonda pretest · mini_sim · simulacro (no los bancos ni las evals
//   ancladas, que preguntan lo ya estudiado; no uno sustituido). Vuelve a poder salir en el primer paso que empieza cuando el runner ya terminó: su día REAL
//   (ordenRealDe del frente encaps: el alias de corrida_s1 y sus días extra) y su franja (la hora ENCAPS 16:15-17:15 de F1 o la de corrida_s1.extra) → las
//   18:00 del mismo día real; si el runner va después del paso, desde el día siguiente. Las filas del 2026-II («pregunta real Qn del 2026-II») no cuentan: su
//   uso antes del pre-test del vie 8-ene es el permitido (§3-bis-LN, cabecera de CIFRAS_CRITICAS). Lo que falte lo completa el relleno con filas permitidas.
// v6.11 (ítem 34, lun 23-nov, chat ENCAPS · ronda c38 · FUGA POR CONCEPTO): fila → ítems de un runner que la fila RESPONDE por su concepto aunque su «Fuente
//   verificada» no los cite (el filtro por id no los ve). Lista MANUAL, fila a fila (la decide el chat ENCAPS): cada ítem cuenta igual que uno de la fuente, así
//   que la fila no sale (ni en el relleno) hasta que termine su runner y luego vuelve, primera, en el siguiente paso de cifras.
// ronda c44 (ítem 41, PROPUESTA): la regex, CONCEPTOS_LIGADOS y la lectura de la tabla viven en encaps_guia_catalogo.FUGA (las usa también gen_encaps_minisim.js:
//   un mini-sim de F1 nuevo no toma un ítem citado por una fila de la tabla); se editan ahí.
const { itemsRealesDe, CONCEPTOS_LIGADOS } = FUGA;
const CIF = (() => {
  try { return FUGA.filasCifras(fs.readFileSync(path.join(ROOT, 'DATA', 'ENCAPS', 'CIFRAS_CRITICAS_2027-I.md'), 'utf8')); } catch (e) { return aborta(e.message); }
})();
const RUNNERS_CIEGOS = (() => {
  const BP = path.join(ROOT, 'DATA', 'ENCAPS', 'BANCO_PROPIO'), FR = require('./gen_fechas_v6');
  // ronda c40 (remate): la hora del runner = PIZARRA.horaDe (bloque movido de corrida_s1 · en la intensiva, la de su SIM en el SQL: el pre-test 2026-II
  //   es 07:15-09:15, no 16:15-17:15 · si no, la hora ENCAPS de F1, 16:15-17:15, donde van los pre-tests y los mini-sims de F1)
  const out = [];
  for (const f of fs.readdirSync(BP).filter((x) => /\.json$/.test(x) && !x.startsWith('_')).sort()) {
    let j = null;
    try { j = JSON.parse(fs.readFileSync(path.join(BP, f), 'utf8')); } catch (e) {
      // v6.11 (remate): con nombre de runner ciego, ilegible = aborta (si no, sus exclusiones desaparecerían sin aviso al regenerar)
      if (/^(pretest|mini_?sim|sim)/i.test(f)) aborta(`BANCO_PROPIO/${f}: runner ciego con JSON ilegible (${e.message}): sin él, sus filas de cifras saldrían antes del test`);
      AVISOS.push(`BANCO_PROPIO/${f}: JSON ilegible, no se mira para la fuga de cifras (${e.message})`); continue;
    }
    if (!j || !['pretest', 'mini_sim', 'simulacro'].includes(j.tipoRonda) || (j._meta && j._meta.sustituido_por)) continue;
    if (!/^\d{4}-\d\d-\d\d$/.test(j.fecha || '') || !Array.isArray(j.items)) aborta(`BANCO_PROPIO/${f}: runner ciego (${j.tipoRonda}) sin fecha o sin items`);
    const real = FR.ordenRealDe(j.fecha, F6, 'encaps');
    const x = PIZARRA.horaDe(j.fecha, real, F6, FR);
    if (x.fuente === 'sin_fuente') AVISOS.push(`BANCO_PROPIO/${f}: runner ciego de la intensiva (día real ${real}) sin SIM en su fila del SQL: su hora se supone ${x.ini}-${x.fin} (filtro de cifras y pizarra)`);
    out.push({ f, plan: j.fecha, real, ini: x.ini, fin: x.fin, items: new Set(j.items.flatMap((it) => itemsRealesDe(it.id))),
      tipo: j.tipoRonda, parte: PIZARRA.parteDe(j), // tipo y parte: para nombrarlo (pizarra, ítem 28; ronda c42: el mini-sim con su número de F1, «3/5»)
      sinVentana: PIZARRA.sinVentanaDe(real, F6, FR) }); // ronda c42 (ítem 39): runner de F1 → pizarra tapada sin ventana desde el primer día de F1
  }
  return out;
})();
for (const [n, ids] of Object.entries(CONCEPTOS_LIGADOS)) for (const id of ids.flatMap(itemsRealesDe)) {
  if (!RUNNERS_CIEGOS.some((x) => x.items.has(id))) AVISOS.push(`CONCEPTOS_LIGADOS #${n}: ${id} no está en ningún runner ciego de BANCO_PROPIO (pre-test · mini-sim · simulacro): no aparta la fila`);
}
/** filas de CIFRAS_CRITICAS citadas por un runner ciego → esos runners */
const CIF_CIEGAS = new Map(CIF.map((r) => [r.n, RUNNERS_CIEGOS.filter((x) => r.items.some((i) => x.items.has(i)))]).filter(([, xs]) => xs.length));
/** ¿la fila `n` está en un runner ciego que aún no terminó cuando empieza el paso del día real `dia` a las `ini`? Un runner de F2 (fuera de PIZARRA.cubre) solo
 *  aparta en su ventana de 2 días reales (ítem 39b: «solo ventana» para las cifras de F2): ningún paso de F1 cae en ella */
const enVentanaF2 = (x, dia) => PIZARRA.cubre(x.real, F6) || dia >= new Date(Date.parse(x.real + 'T12:00:00Z') - 2 * 864e5).toISOString().slice(0, 10);
const filaCiegaEn = (n, dia, ini) => (CIF_CIEGAS.get(n) || []).some((x) => !(x.real < dia || (x.real === dia && aMin(x.fin) <= aMin(ini))) && enVentanaF2(x, dia));
/** los runners de la pizarra: los de BANCO_PROPIO + el pre-test 2026-II aunque aún no tenga JSON + los mini-sims de F1 programados aún sin runner
 *  (PIZARRA.conProgramados, ronda c44: el 4/5 y el 5/5 alargan la pizarra tapada hasta el 5/5; sin ítems: no apartan cifras, CIF_CIEGAS usa RUNNERS_CIEGOS) */
const RUNNERS_PIZ = PIZARRA.conProgramados(RUNNERS_CIEGOS, F6, require('./gen_fechas_v6'));
/** pasos «Pizarra: HOY NO» de las 18:00: «Sigue tapada» o «Tápala … desde …» lo decide el bloque de la pizarra (¿un bloque ENCAPS anterior del mismo día
 *  real ya lleva la línea de tapar?) */
const HOY_NO = [];
{
  const FILAS_PASO = 40, SEG_FILA = 15;
  const ROM = { SP: 'I', CI: 'II', ET: 'III', INV: 'IV', GES: 'V' };
  const deArea = (a) => CIF.filter((r) => new RegExp(`^${ROM[a]}-`).test(r.cod)).map((r) => r.n);
  const deCod = (c) => { const ps = c.split('+'); return CIF.filter((r) => r.cod.split('+').some((x) => ps.includes(x))).map((r) => r.n); };
  const CRIT = CRITICOS.split(' · ').flatMap(deCod).filter((n, i, a) => a.indexOf(n) === i).sort((x, y) => x - y);
  const cursor = { crit: 0 };
  const rangoTxt = (ns) => { const s = [...ns].sort((x, y) => x - y), o = []; for (let i = 0; i < s.length; i++) { let j = i; while (j + 1 < s.length && s[j + 1] === s[j] + 1) j++; o.push(j > i ? `#${s[i]}-${s[j]}` : `#${s[i]}`); i = j; } return o.join(', '); };
  /** códigos del texto → { esp: filas que hay que cubrir, pools: áreas de cursor } */
  const parse = (txt) => {
    const t = txt.replace(/^los 8 críticos \(.*\)$/, 'CRIT');
    const esp = [], pools = [];
    for (const tok of t.split(/ · | \+ /).map((x) => x.trim()).filter(Boolean)) {
      const m = /^(SP|CI|GES|INV|ET) \(([^)]+)\)$/.exec(tok);
      if (m) esp.push(...m[2].split(' · ').flatMap(deCod));
      else if (ROM[tok]) pools.push(tok);
      else if (tok === 'CRIT' || tok === 'mixto') pools.push('CRIT');
      else esp.push(...deCod(tok));
    }
    return { esp: esp.filter((n, i, a) => a.indexOf(n) === i).sort((x, y) => x - y), pools };
  };
  // pasos de cifras de F1, en orden (día; dentro del día, el orden de la guía): las 18:00, la pizarra con cifras y los domingos que las reciben
  const pasos = [];
  for (const [f, g] of Object.entries(GT)) {
    if (f >= F6.encaps.intensiva_desde) continue;
    g.pasos.forEach((p, i) => {
      const m = /^Cifras y plazos de (.*)$/.exec(p.que) || /^Pizarra del mes · hoy con las cifras y plazos del [^:]+: (.*?) \(no cupieron/.exec(p.que);
      if (m) pasos.push({ f, i, p, cod: m[1], hora: `${corta(f)} ${G.partesFranja(g.franja).ini}`, ini: G.partesFranja(g.franja).ini, piz: /^Pizarra/.test(p.que) });
    });
  }
  for (const [f, xs] of Object.entries(SUN_AUTO)) for (const a of xs) {
    const m = /^Cifras y plazos de (.*?) \(las del /.exec(a.paso.que);
    if (m) pasos.push({ f, i: -1, p: a.paso, cod: m[1], hora: `${corta(f)} (su ENCAPS)`, ini: '00:00', dom: true }); // sin hora aquí: un runner de ese mismo día cuenta como no hecho
  }
  // v6.10d: en orden de día REAL (con el alias, las 18:00 del vie 4-dic se hacen el lun 7, después del domingo 6 que recibe las cifras del vie 27)
  pasos.sort((x, y) => { const a = realDe(x.f), b = realDe(y.f); return a < b ? -1 : a > b ? 1 : x.i - y.i; });
  let carry = null;
  // v6.11 (remate, revisión 23.1 MEDIA): las filas de los códigos de un paso que se quedan fuera por un test ciego NO se pierden: esperan aquí ({ n, de })
  //   y entran, primeras (como lo que no cupo), en el primer paso de cifras que empieza con su runner ya hecho. Las del relleno no: el cursor vuelve a pasar
  const aplaz = [];
  pasos.forEach((x, k) => {
    const { esp, pools } = parse(x.cod.replace(/ \(las del .*$/, ''));
    const ciega = (n) => filaCiegaEn(n, realDe(x.f), x.ini); // v6.11 (ítem 23.1): fila de un test ciego aún no hecho → fuera del paso
    // lo que llega de pasos anteriores, por grupos con su día de PLAN: primero lo que no cupo en el paso anterior; después, las aplazadas que ya no son ciegas
    //   (filaCiegaEn solo puede pasar de sí a no con el tiempo: lo que llega nunca es ciego)
    const listas = aplaz.filter((r) => !ciega(r.n));
    for (const r of listas) aplaz.splice(aplaz.indexOf(r), 1);
    const grupos = [];
    const meteG = (n, de) => { if (grupos.some((g) => g.filas.includes(n))) return; const g = grupos.find((y) => y.de === de) || (grupos.push({ de, filas: [] }), grupos[grupos.length - 1]); g.filas.push(n); };
    if (carry) for (const n of carry.filas) meteG(n, carry.de);
    for (const r of listas) if (!esp.includes(r.n)) meteG(r.n, r.de); // una aplazada que hoy es de los códigos del día va como de hoy
    const previas = grupos.flatMap((g) => g.filas);
    const todas = [...previas, ...esp.filter((n) => !previas.includes(n))];
    const fuera = todas.filter(ciega), must = todas.filter((n) => !ciega(n));
    for (const n of fuera) if (!aplaz.some((r) => r.n === n)) aplaz.push({ n, de: x.f });
    const hoy = must.slice(0, FILAS_PASO), resto = must.slice(FILAS_PASO);
    const rel = [], saltRel = [];
    for (const a of [...pools.filter((p) => p !== 'CRIT'), 'CRIT']) {
      const pool = a === 'CRIT' ? CRIT : deArea(a);
      cursor[a] = cursor[a] || 0;
      for (let tries = 0; hoy.length + rel.length < FILAS_PASO && tries < pool.length; tries++) {
        const n = pool[cursor[a] % pool.length]; cursor[a]++;
        if (hoy.includes(n) || rel.includes(n)) continue;
        if (ciega(n)) { if (!fuera.includes(n) && !saltRel.includes(n)) saltRel.push(n); } else rel.push(n);
      }
    }
    if (hoy.length + rel.length !== FILAS_PASO) aborta(`${x.f}: el paso de cifras «${x.cod}» no llega a ${FILAS_PASO} filas (fuera por tests ciegos aún no hechos: ${CIF.filter((r) => ciega(r.n)).length} filas de la tabla)`);
    const sig = pasos[k + 1];
    if (resto.length && !sig) aborta(`${x.f}: sobran ${resto.length} filas de cifras y no hay un paso de cifras posterior en F1`);
    const lasN = (c) => (c === 1 ? 'la' : `las ${c}`); // v6.11 (ítem 23.1): con la fuga, el paso anterior puede pasar UNA sola fila
    const delTxt = grupos.map((g) => `${lasN(g.filas.length)} del ${corta(g.de)}`).join(', ').replace(/, ([^,]*)$/, ' y $1');
    const cIn = grupos.length ? ` (primero ${delTxt})` : '';
    x.p.que = x.dom || x.piz ? x.p.que.replace(/( · NO opcional)?$/, (m0) => ` · ${FILAS_PASO} filas = ${FILAS_PASO * SEG_FILA / 60}′${cIn}${m0}`) : `${x.p.que} · ${FILAS_PASO} filas a ${SEG_FILA} s = ${FILAS_PASO * SEG_FILA / 60}′${cIn}`;
    const antes = 'Las filas de esos códigos en DATA/ENCAPS/CIFRAS_CRITICAS_2027-I.md (= mazo ENCAPS::Cifras): tapa el valor y dilo.';
    if (!x.p.como.includes(antes)) aborta(`${x.f}: el paso de cifras no tiene el texto esperado («${x.p.como.slice(0, 80)}…»)`);
    const lista = `CIFRAS_CRITICAS_2027-I.md §3 (= mazo ENCAPS::Cifras), por nº de fila: ${hoy.length ? `${rangoTxt(hoy)}${grupos.length ? ` (con ${delTxt})` : ''}` : ''}${rel.length ? `${hoy.length ? ' + ' : ''}${rangoTxt(rel)} (${hoy.length ? 'relleno' : 'hoy'}: ${pools.filter((p) => p !== 'CRIT').concat('8 críticos').join(' y luego ')}, desde donde quedó la última vez)` : ''}. Tapa el valor y dilo, ${SEG_FILA} s por fila.`;
    // v6.11 (ítem 23.1; remate: con sus números, como el texto a mano del chat ENCAPS del mar 24 —el nº de fila no dice nada del contenido— y con su
    //   concordancia en singular): las filas que hay que saltar al recorrer la tabla. Al final (lo cortado por el Calendar es lo menos urgente) y sin fechas
    const nT = fuera.length + saltRel.length;
    const notaCiega = nT ? ` Salta sin leer ${nT === 1 ? 'la' : 'las'} ${[fuera.length ? rangoTxt(fuera) : '', saltRel.length ? `${fuera.length ? 'y, en el relleno, ' : ''}${rangoTxt(saltRel)}${fuera.length ? '' : ' (del relleno)'}` : ''].filter(Boolean).join(' ')}: ${nT === 1 ? 'es' : 'son'} de un test ciego que aún no hiciste${fuera.length ? ` (${fuera.length === 1 ? 'la de estos códigos vuelve en un paso posterior, la primera' : 'las de estos códigos vuelven en un paso posterior, las primeras'})` : ''}.` : '';
    x.p.como = `${resto.length ? `Resto (${resto.length === 1 ? '1 fila' : `${resto.length} filas`}: ${rangoTxt(resto)}) → ${sig.hora}, ${resto.length === 1 ? 'la primera' : 'las primeras'} de su paso. ` : ''}${x.p.como.replace(antes, lista)}${notaCiega}`;
    carry = resto.length ? { filas: resto, de: x.f } : null;
  });
  if (aplaz.length) aborta(`cifras de F1: ${aplaz.length} filas apartadas por un test ciego (${aplaz.map((r) => `#${r.n}`).join(', ')}) no tienen un paso de cifras posterior a su runner en F1`);
}
// v6.11 (ítem 28, lun 23-nov, chat ENCAPS · FUGA POR LA PIZARRA): la pizarra del mes tiene temas de los tests ciegos (la dosis de hierro responde 2 ítems del
//   pre-test 2/2). (a) La pizarra que recibe las cifras de otro día («Pizarra del mes · hoy con las cifras y plazos del X») ya pasa por el filtro de fuga de
//   arriba: es un paso de cifras más (pasos[].piz). (b) La pizarra de siempre, en un día con un runner ciego (RUNNERS_CIEGOS) que aún no terminó cuando empieza
//   el paso —el mismo día real o en los 2 días reales siguientes— → «Pizarra: HOY NO. Tápala entera hasta <el último de esos runners>», con
//   los mismos minutos y sin nombrar sus temas (sería una pista). Una pizarra con material de otro día y condición («si fueron las normales, estos 10′ son la
//   pizarra del mes de siempre») dice lo mismo en esa rama, y su aviso también.
// ronda c38 (revisión): el runner se nombra por su FECHA DE PLAN, como todas las fechas de las guías (la app la pinta con su día real: con el día real se
//   traducía dos veces, «mini-sim del mié 2-dic»). Si ese mismo día real hubo un runner ciego ANTES del paso (el pre-test de las 16:15), «desde ya» llega
//   tarde: el paso dice desde la hora del primer bloque ENCAPS de la mañana y ese bloque lo avisa (aviso de la mañana).
// ronda c42 (ítem 39, chat ENCAPS): el paso nombra el runner como la línea del primer bloque (PIZARRA.hastaTxt: «que termine el mini-sim 3/5 del vie 4-dic
//   (16:15-17:15)», con su número y su franja; la fecha, dentro del corte del «qué» del Calendar: check 26h). En F1 la pizarra va tapada sin ventana desde el
//   primer bloque ENCAPS de cada día real, que lo dice (PIZARRA.lineas): el paso dice «Sigue tapada» (no «desde ya») y la mañana no repite el aviso de taparla.
{
  // ronda c40: el nombre del runner y el criterio (mismo día o 2 días reales) viven en encaps_guia_catalogo.PIZARRA (los usa también la línea del primer bloque)
  const nombreR = PIZARRA.nombre;
  const tapaHasta = (dia, ini) => PIZARRA.hasta(RUNNERS_PIZ, dia, ini);
  const RE_COND = /si fueron las normales, estos (\d+)′ son la pizarra del mes de siempre \([^)]*\)/;
  // remate de la c42 (revisiones): «Sigue tapada» o «Tápala desde …» ya no sale de sinVentana (con la ventana del pre-test 2026-II, el mié 6 y el jue 7-ene
  //   decían «Tápala desde ya» a las 18:00 con la línea ya puesta a las 07:15): lo fija el bloque de la pizarra (HOY_NO), que sabe si un bloque ENCAPS anterior del
  //   mismo día real lleva la línea. El aviso de la rama condicional ya no repite el runner ni su fecha (con el mini-sim 5/5, la fecha quedaba en el carácter 277
  //   del aviso: check 26j); lo dicen su paso y la línea del primer bloque. La mañana ya no lleva «Pizarra del mes: tápala ya, antes del …»: su primer bloque
  //   lleva la línea de tapar (ronda c40).
  for (const [f, g] of Object.entries(GT)) {
    const ini = G.partesFranja(g.franja).ini, x = tapaHasta(realDe(f), ini); if (!x) continue;
    const hasta = PIZARRA.hastaTxt(x, corta);
    const antes = RUNNERS_PIZ.filter((y) => y.real === realDe(f) && aMin(y.fin) <= aMin(ini)).sort((a, b) => aMin(a.ini) - aMin(b.ini))[0] || null;
    const desde = antes ? `desde las 07:15 de hoy (antes del ${nombreR(antes)} de las ${antes.ini})` : 'desde ya';
    g.pasos.forEach((p, i) => {
      if (p.que === PIZARRA_QUE) {
        const q = P(p.min, `Pizarra: HOY NO (tiene temas de los tests ciegos). Tápala entera hasta ${hasta}`, '');
        g.pasos[i] = q;
        HOY_NO.push({ f, set: (sigue) => { q.como = `${sigue ? 'Sigue tapada (o fuera de la vista): no la mires' : `Tápala (o quítala de la vista) ${desde} y no la mires`} hasta entonces. Estos ${p.min}′ quedan libres: termina antes.`; } });
      } else if (/^Pizarra del mes · hoy con /.test(p.que)) {
        // la pizarra que recibe material de otro día (cifras o norma, con o sin condición): ese material va con la tabla (CIFRAS_CRITICAS) o en la tarjeta; la
        //   pizarra física no se destapa. Ronda c44 (revisión): lo dice el «cómo» EN LUGAR de «Es el repaso de la pizarra del mes, con ese material.» (antes se
        //   añadía detrás, solo sin condición) y lo dice el AVISO, que el Calendar enseña entero, en lugar de «(es repaso sin material propio)» (el mar 15-dic real
        //   el Calendar decía «Hoy la pizarra del mes ES las cifras…» sin decir tapada). Va al final de los dos: no mueve ninguna fecha (checks 26h y 26j).
        const solo = /^Pizarra del mes · hoy con las cifras/.test(p.que) ? 'estas filas, solo en la tabla' : 'la tabla o el flujograma, solo en la tarjeta';
        const tap = `La pizarra, tapada (tiene temas de los tests ciegos): ${solo}.`, REPASO = 'Es el repaso de la pizarra del mes, con ese material.';
        p.como = p.como.includes(REPASO) ? p.como.replace(REPASO, tap) : `${p.como} ${tap}`;
        if (g.aviso) g.aviso = g.aviso.replace('(es repaso sin material propio)', `(está tapada: ${solo})`);
        if (RE_COND.test(p.como)) {
          const c0 = p.como;
          HOY_NO.push({ f, set: (sigue) => { p.como = c0.replace(RE_COND, (m0, min) => `si fueron las normales, la pizarra HOY NO (tiene temas de los tests ciegos): ${sigue ? 'sigue tapada' : 'tápala'} entera hasta ${hasta} y estos ${min}′ quedan libres`); } });
          if (g.aviso) g.aviso = g.aviso.replace('si lo fueron, la pizarra de siempre)', 'si lo fueron, la pizarra HOY NO: sigue tapada)');
        }
      }
    });
  }
  for (const h of HOY_NO) h.set(true); // provisional: el bloque de la pizarra lo fija con todos los bloques del día
}

// ── sábado · THEOMED EN VIVO (14:45 preparar · 15:00-17:00 en vivo) ─────────────────────────────────────────────
const SAB = {}, GSP = {}, GSV = {};
// v6.09b lote 1-bis (hallazgo 6): el tramo 17:00-17:30 de cada clase en vivo del sábado de F1 (el baile empieza a las 17:00) = su grabación a 2× (15′),
//   primer paso NO opcional del ENCAPS de un domingo (antes «solo audio, en un tiempo muerto de la semana», sin franja). v6.09b lote 1-ter: el domingo +7
//   (Theomed cuelga la grabación 1-3 días después: el domingo siguiente casi nunca podía hacerse), sin plan B condicional.
const SAB_TRAMO = [];
const SAB_EN_MANANA = []; // v6.09b lote 1-ter: tramos que van dentro de la clase en diferido de un domingo de plan (dom 27-dic: CI 3/8)
const domEncapsTras = (f) => J.domingos.map((x) => x.fecha).find((x) => x > f && domConEncaps(x)) || null;
for (const s of J.sabados) {
  if (s.sin_sesion) continue; // v6.09: sábado sin sesión (sáb 21-nov, viaje): sin guías ni índice (la clase consta en el JSON, en diferido)
  // v6.08 (fix est6): el área sale del título («Cuidado Integral 6/8») o, en F2, de `area` (código SP · CI · GES · INV · ET, o null = varias áreas:
  //   el banqueo general del sáb 13-feb), porque los repasos se titulan «Repaso Investigación 1/2»
  const a = 'area' in s ? s.area : s.vivo ? AREA_DE_NOMBRE(s.vivo) : null;
  if ('area' in s && s.area !== null && !AREA[s.area]) aborta(`sábado ${s.fecha}: área «${s.area}» desconocida (SP · CI · GES · INV · ET o null)`);
  if ('area' in s && !esSabF2(s.fecha)) aborta(`sábado ${s.fecha}: «area» explícita solo en los sábados de F2`);
  if (s.vivo && !a && !('area' in s)) aborta(`sábado ${s.fecha}: no reconozco el área de «${s.vivo}»`);
  SAB[s.fecha] = { fecha: s.fecha, vivo: s.vivo, area: a ? AREA[a] : null };
  if (!s.vivo) continue;
  if (esSabF2(s.fecha)) {
    // v6.08 (fix revisión 14-nov, est6): SÁBADO DE F2 (9-ene → 6-mar) · clase EN VIVO 15:00-17:00 con el título del calendario del campus. El carril
    //   SÁBADO ENCAPS va de 14:00 a 15:00 casi todos los sábados: el «preparar la clase» de las 14:45 solo se pinta si esa franja está libre
    //   (plantillasV6.bloquesTheomedSabado; en v6.08, el sáb 6-mar), así que la guía de las 15:00 no da por hecho que hubo preparación.
    const banq = /banqueo/i.test(s.vivo);
    const rutaF2 = `Campus › curso 99 · enlace de la clase en el cronograma de la portada (la grabación y el PPT se publican 1-3 días después${a ? `, en el bloque ${AREA[a]}` : ''})`;
    GSP[s.fecha] = guia(fr('14:45', '15:00'), `ENCAPS · PREPARAR LA CLASE · ${s.vivo}`, banq ? [
      P(5, 'Hoja de respuestas lista', 'Una línea por pregunta: tu respuesta y tu confianza (segura · dudosa · adivinada) ANTES de que el docente la resuelva.'),
      P(7, `3 dudas ${a ? `de ${AREA[a]}` : 'de tus áreas peores'} que quieres ver resueltas`, 'De tus errores del registro (revisión de esta mañana): escríbelas en forma de pregunta.'),
      P(3, 'Conexión lista', 'Enlace de la clase abierto, audio probado, agua. Móvil en silencio.'),
    ] : [
      P(5, `Abre el material de ${s.vivo}`, `PPT o temario de la clase si ya está publicado; si no, el Theoesencial del área. ${rutaF2}.`, L99),
      P(7, '3 preguntas que la clase te tiene que responder', 'Escríbelas en forma de pregunta, de tus errores del área (registro y revisión de esta mañana).'),
      P(3, 'Conexión lista', 'Enlace de la clase abierto, audio probado, agua. Móvil en silencio.'),
    ], [R99], banq ? 'hoja de respuestas lista y 3 dudas escritas' : 'material abierto y 3 preguntas escritas');
    GSV[s.fecha] = guia(fr('15:00', '17:00'), `THEOMED EN VIVO · ${s.vivo}`, [
      P(5, `Entrar a la clase: ${s.vivo}`, `${rutaF2}. Puntual: la asistencia cuenta. Si no hubo «preparar la clase» (el carril de las 14:00 llega hasta las 15:00), anota al entrar 2-3 dudas del área.`, L99),
      banq
        ? P(105, `${s.vivo} EN VIVO, en activo`, 'Cada pregunta: léela, responde y marca tu confianza ANTES de la resolución del docente; después, la resolución. Marca ★ lo que sea cifra, plazo o definición textual: va a tarjetas.')
        : P(105, 'Clase EN VIVO, participando', 'Antes de que el docente responda, responde tú. Notas SOLO en forma de pregunta. Marca ★ lo que sea cifra, plazo o definición textual: va a tarjetas.'),
      P(10, 'Cierre a las 17:00', banq
        ? 'Anota cuántas acertaste y cuántas «seguras» fallaste; cada fallo, con su regla de 1 línea en el registro (lo recoge la revisión del sábado siguiente). El tramo 17:00-17:30, en la grabación (en activo, en un hueco de la semana).'
        : 'Mira si tus preguntas quedaron respondidas. Anota el minuto donde te vas: el tramo 17:00-17:30 lo ves en la grabación (a 2×, en audio en un tiempo muerto). Si la clase tiene post-test, en cuanto lo publiquen: primer intento ciego (el domingo).'),
    ], [R99], banq ? 'banqueo seguido en activo hasta las 17:00 y los fallos en el registro' : 'clase seguida en vivo hasta las 17:00 y las ★ anotadas', {
      aviso: `La clase dura hasta las 17:30 y el baile empieza a las 17:00: vas en vivo hasta las 17:00; el último tramo, en la grabación.${s.fecha === SAB_F2[0] ? ' Desde hoy y hasta el sáb 6-mar, la clase en vivo de Theomed de los sábados va en el Home (repasos de ene-mar, calendario del campus).' : ''}`,
      planB: banq ? 'Si no puedes conectarte: la grabación (1-3 días después), en activo: pausa en cada pregunta y responde antes de la resolución. Nunca en pasivo.'
        : 'Si no puedes conectarte: la grabación (1-3 días después), los tramos que el PPT no explica a 1,75-2× y el resto en audio en tiempos muertos.',
    });
    continue;
  }
  // v6.09b lote 1-ter (revisión R, hallazgo 6): el tramo 17:00-17:30 va POR DEFECTO al domingo +7 (Theomed cuelga la grabación 1-3 días después: el domingo
  //   siguiente casi nunca podía hacerse y el plan B, sin minutos en el domingo de destino, era lo normal). Si ese domingo +7 es un DOMINGO DE PLAN (dom 27-dic),
  //   el tramo va dentro de la clase en diferido de su mañana (teoria[].si_en_vivo.sab = este sábado): un solo plan, con minutos en los dos casos.
  let domT = addDias(s.fecha, 8);
  const codS = `${a} ${(/(\d+\/\d+)/.exec(s.vivo) || [])[1] || ''}`.trim();
  let mPlan = DOM_PLAN.has(domT) ? J.mananas.find((x) => x.fecha === domT) : null;
  let itPlan = mPlan ? mPlan.teoria.find((t) => t.item.startsWith(codS) && t.si_en_vivo && t.si_en_vivo.sab === s.fecha) : null;
  // v6.10w: si el domingo de plan +7 no lleva la clase (intercambio 16/21 ↔ 17/21: la CI 3/8 va en la mañana del mié 23 de plan = lun 28-dic real), la mañana que
  //   la lleva con si_en_vivo de este sábado, posterior en días reales
  if (mPlan && !itPlan) {
    const m2 = J.mananas.find((x) => realDe(x.fecha) > s.fecha && x.teoria.some((t) => t.item.startsWith(codS) && t.si_en_vivo && t.si_en_vivo.sab === s.fecha));
    if (m2) { mPlan = m2; domT = m2.fecha; itPlan = m2.teoria.find((t) => t.item.startsWith(codS) && t.si_en_vivo && t.si_en_vivo.sab === s.fecha); }
  }
  // v6.09b lote 1-quater (pendiente P6 de E2): + el POST-TEST de la clase con minutos y fecha (antes «el domingo o al empezar el banqueo del lunes 09:45»): en el
  //   domingo +7 con ENCAPS, justo después del tramo (15′ = hasta 12Q) · en el domingo de plan, en el post-test de su mañana (07:45, con los de las otras clases)
  let destT, planBT, cierreT, avisoT;
  if (domConEncaps(domT)) {
    SAB_TRAMO.push({ dom: domT, de: s.fecha, clase: codS });
    destT = `${corta(domT)}, primeros pasos NO opcionales de su ENCAPS`;
    planBT = `Si no puedes conectarte: la clase entera en diferido → ${corta(domT)}, primeros pasos NO opcionales de su ENCAPS: ${vivoMin(150)}′ de tramos útiles a 2× en lugar del tramo de ${TRAMO_MIN}′ (ese ENCAPS empieza ${vivoMin(150) - TRAMO_MIN}′ antes: de ejemplo, a las {{INI_PB}}); su post-test, igual (${PT_SAB_MIN}′).`;
    cierreT = `Tramo 17:00-17:30 (grabación a 2×, ${TRAMO_MIN}′: ${pct100(VIVO_FRAC)} de sus 30′) y su post-test (hasta ${PT_SAB_Q}Q, ${PT_SAB_MIN}′) → ${destT}. Anota el minuto donde te vas y mira si tus 3 preguntas quedaron respondidas. El post-test, primer intento ciego: no lo abras antes.`;
    avisoT = `La clase dura hasta las 17:30 y a las 17:00 empieza el baile: el tramo 17:00-17:30 y el post-test → ${destT} (grabación a 2×, ${TRAMO_MIN}′ = ${pct100(VIVO_FRAC)} de sus 30′, ya publicada para entonces · post-test hasta ${PT_SAB_Q}Q, ${PT_SAB_MIN}′).`;
  } else if (itPlan) {
    SAB_EN_MANANA.push({ dom: domT, de: s.fecha, clase: codS });
    // hora real de su paso y del post-test en la mañana del domingo de plan (en tramos: dom 27-dic)
    const horaDe = (re) => { for (const g of GM[domT] || []) { let t0 = aMin(G.partesFranja(g.franja).ini); for (const p of g.pasos) { if (re.test(p.que)) return hhmm(t0); t0 += p.min; } } return null; };
    const hT = horaDe(new RegExp(`^${codS.replace('/', '\\/')} `)), hPT = horaDe(new RegExp(`^Post-tests? de .*${codS.replace('/', '\\/')}`));
    if (!hT || !hPT) aborta(`sábado ${s.fecha}: la mañana del ${domT} no lleva el paso de la ${codS} (${hT}) o su post-test (${hPT})`);
    const itA = mPlan.teoria.find((t) => t.item.startsWith(`${itPlan.si_en_vivo.adelanta} `) && t.resto_en);
    destT = `${corta(domT)} ${hT}, mañana ENCAPS ${mPlan.n}/${NM}`;
    // v6.09b lote 1-quater FX1 (revisión V2/V3): el plan B con el horario real de la rama B (antes «el paso … pasa de 15′ a 45′», sin horas: pisaba la rutina)
    const rb = RB_DOM[domT];
    if (!rb || rb.dest !== itA.resto_en) aborta(`sábado ${s.fecha}: la mañana del ${domT} no tiene el horario de la rama B de la ${codS}`);
    planBT = `Si no puedes conectarte: la clase entera en diferido → ${corta(domT)} ${rb.ci}, mañana ENCAPS ${mPlan.n}/${NM}: ${vivoMin(150)}′ en lugar del tramo de ${TRAMO_MIN}′ (la rutina de ${RUTINA_AM.join('-')} no se toca); la ${rb.adelanta}, solo ${rb.sp}, y sus ${rb.resto}′ → ${corta(rb.dest)}, antes del primer paso de su ENCAPS (lo dice su aviso)${rb.libre >= 5 ? `; la norma del día (${rb.libre}′) no va` : ''}.`;
    cierreT = `Tramo 17:00-17:30 (grabación a 2×, ${TRAMO_MIN}′: ${pct100(VIVO_FRAC)} de sus 30′) → ${destT}; su post-test, en el de esa mañana (${hPT}, con los de las otras clases). Anota el minuto donde te vas y mira si tus 3 preguntas quedaron respondidas.`;
    avisoT = `La clase dura hasta las 17:30 y a las 17:00 empieza el baile: el tramo 17:00-17:30 → ${destT} (grabación a 2×, ${TRAMO_MIN}′ = ${pct100(VIVO_FRAC)} de sus 30′; para entonces ya está publicada) y su post-test, a las ${hPT} de esa mañana.`;
  } else aborta(`sábado ${s.fecha}: el tramo 17:00-17:30 de ${s.vivo} va al domingo +7 (${domT}) y ese domingo no tiene ENCAPS ni una mañana de plan con la ${codS} (teoria[].si_en_vivo.sab)`);
  GSP[s.fecha] = guia(fr('14:45', '15:00'), `ENCAPS · PREPARAR LA CLASE · ${s.vivo}`, [
    P(5, `Abre el PPT de ${s.vivo}`, `Lee títulos e índice. Ruta: ${RUTA.vivo(AREA[a])} (si ya está publicado).`, L99),
    P(7, '3 preguntas que la clase te tiene que responder', 'Escríbelas en forma de pregunta, de tus errores del área o de lo que no entiendes del PPT.'),
    P(3, 'Conexión lista', 'Enlace de la clase abierto, audio probado, agua. Móvil en silencio.'),
  ], [R99], 'PPT abierto y 3 preguntas escritas');
  GSV[s.fecha] = guia(fr('15:00', '17:00'), `THEOMED EN VIVO · ${s.vivo}`, [
    P(5, `Entrar a la clase: ${s.vivo}`, `Ruta: ${RUTA.vivo(AREA[a])}. Puntual: la asistencia cuenta.`, L99),
    P(105, 'Clase EN VIVO, participando', 'Antes de que el docente responda, responde tú. Notas SOLO en forma de pregunta. Marca ★ lo que sea cifra, plazo o definición textual: va a tarjetas.'),
    // v6.09b (a1-18): el tramo 17:00-17:30 se declaraba SOLO audio · v6.09b lote 1-bis (hallazgo 6): su grabación a 2× (15′), con fecha · lote 1-ter: la fecha
    //   al principio del «cómo» (el Calendar lo corta a 110 caracteres) y el domingo +7, sin plan B condicional
    P(10, 'Cierre a las 17:00', cierreT),
  ], [R99], 'clase seguida en vivo hasta las 17:00 y las ★ anotadas', {
    aviso: avisoT,
    planB: planBT,
  });
}

// ── domingo · ENCAPS opcional 4 h (flexible, sin hora fija; la franja 08:00-12:00 es solo un ejemplo) ───────────────
const DOM = {}, GD = {};
// v6.07d (11-nov): modos del domingo además del simulacro de 4 h (por defecto). Los domingos 6, 13 y 20-dic llevan por la mañana los SHIP que
//   la semana corrida dejó pendientes y tienen compromisos fijos por la tarde, así que su ENCAPS queda en 2 h. Por eso:
//   · «banqueos»: banqueos grabados nuevos de Theomed (curso 116), en activo, sin simulacro.
//   · «simulacro_2h»: solo el simulacro, de un tirón; la corrección va otro domingo (correccion_en).
//   · «banqueos_correccion»: banqueos + la corrección y el registro del simulacro de otro domingo (correccion_de), con una pausa en medio.
//   El generador escribe también lo que pinta la app (nombre, hora, minutos, sub, etiqueta, tema y campus), para que plantillasV6 y
//   TodayMission no repitan textos fijos («4 h»).
const fmtMin = (n) => (n % 60 ? (n >= 60 ? `${Math.floor(n / 60)} h ${n % 60}′` : `${n}′`) : `${n / 60} h`);
const WD_LARGO = (iso) => `${WDL[dow(iso)]} ${Number(iso.slice(8))}`;
// v6.09b (a1-7/a1-17): banqueo grabado a 1,25× + la pausa en cada pregunta (×1,2) = su duración × 0,96 (antes «en activo = su duración», aunque pide pausar)
const mmssEx = (s) => { const m = /^(\d+):(\d\d)$/.exec(String(s || '')); if (!m) aborta(`duración mm:ss ilegible «${s}»`); return Number(m[1]) + Number(m[2]) / 60; };
const PASO_BANQUEO = `Pausa el vídeo en cada pregunta: léela, responde y marca tu confianza (1-3) ANTES de ver la resolución; después, la resolución completa (Palmerton). A ${vel(VEL_ACTIVO)} (las explicaciones), con la pausa de cada pregunta: su duración ÷ ${vel(VEL_ACTIVO)} × ${String(PAUSA).replace('.', ',')}.`;

const COD_CLASE = /^(SP|CI|GES|INV|ET) \d+\/\d+$/;
const areaDe = (c) => AREA[c.split(' ')[0]];
// v6.09b lote 1-bis (hallazgo 6): «El audio de la clase, en tiempos muertos» → la grabación tiene su fecha propia
const comoPPT = `Títulos y diapositivas de concepto; notas SOLO en forma de pregunta (cifra, plazo o definición textual → tarjeta a ENCAPS::Cifras). La grabación (sus tramos útiles) va aparte, con su fecha.`;
// v6.09b lote 1-bis (hallazgos 2, 3 y 6): PRIMEROS PASOS NO OPCIONALES del ENCAPS de un domingo, en el orden en que se originaron: el banqueo grabado que no cupo
//   en una mañana (previo) · PPT en diferido (ppt) · teoría que no cupo en una mañana (antes: Theoesencial, sesiones; con su «origen») · lo que falta hasta el
//   60 % de una clase en diferido (RESTOS, mananas[].teoria[].resto_en) · el tramo 17:00-17:30 de la clase en vivo del sábado (SAB_TRAMO) · cifras o norma
//   que no cupieron a las 18:00 (SUN_AUTO). Alargan el bloque: antes del simulacro o de los banqueos; en los domingos de tarde, antes del compromiso personal
//   (domingos[].antes_hasta) y la guía lleva la pausa. ANTES_USADOS = control de que cada resto, tramo y destino automático sale en la guía de su domingo.
const ANTES_USADOS = new Set();
/** v6.09b lote 1-quater (R2 · N7): restos que se adelantan a un domingo de plan si la clase del sábado se vio en vivo → plan B del domingo de su resto_en */
const ADEL_PB = {};
// v6.10h (revisión del 18-nov · c10 BAJA): desde un domingo, la siguiente mañana ENCAPS en orden REAL (alias de corrida_s1): la del vie 11-dic de plan se hace
//   el lun 14-dic, después del dom 13 → «banqueo del vie 11-dic 09:45» (la app lo pinta «lun 14-dic»); antes la de plan lun 14-dic, que se hace el mar 15-dic
const sigManana = (f) => (J.mananas.find((x) => realDe(x.fecha) > f) || {}).fecha || null;
/** v6.10x (remate): los primeros pasos de cada domingo se calculan UNA vez (antesDom0 marca ANTES_USADOS / ADEL_PB): el pre-cálculo de la corrección que no
 *  cabe en un domingo con simulacro (CORR_PEND) los necesita antes que el bucle de ese domingo */
const ANTES_CACHE = new Map();
function antesDom(d) { if (!ANTES_CACHE.has(d.fecha)) ANTES_CACHE.set(d.fecha, antesDom0(d)); return ANTES_CACHE.get(d.fecha); }
function antesDom0(d) {
  const L = [];
  const pv = d.previo || null;
  if (pv) {
    if (!pv.motivo || !Array.isArray(pv.items) || !pv.items.length || !pv.de) aborta(`domingo ${d.fecha}: previo sin motivo / items / de (la mañana de la que viene)`);
    const us = pv.items.flatMap((it) => unidades({ ...it, fecha: d.fecha }));
    if (us.some((u) => u.tipo !== 'activo')) aborta(`domingo ${d.fecha}: previo solo admite banqueos grabados (modo activo)`);
    const nom = pv.items.map((x) => x.item.replace(/\s*\(.*\)$/, '')).join(' y ');
    // v6.10w: la mañana de la que viene puede ir DESPUÉS del domingo (mañana 20/21 → mar 5-ene): «no cabe» en vez de «no cupo» · sin simulacro (modo previos), sin «aunque descanses»
    const cupo = realDe(pv.de) > d.fecha ? 'no cabe' : 'no cupo';
    const mPv = J.mananas.find((x) => x.fecha === pv.de);
    const enM = realDe(pv.de) > d.fecha && mPv ? `en la mañana ${mPv.n}/${NM}` : `en la mañana del ${corta(pv.de)}`; // posterior al domingo: sin fecha (no es un destino)
    for (const u of us) L.push({ de: pv.de, min: u.min, corto: nom, recurso: R116, desc: `el ${nom} (${u.min}′, en activo), que ${cupo} ${enM}`,
      paso: P(u.min, `${u.que(u.min)} · NO opcional`, `${u.como} ${d.modo === 'previos' ? 'Es un primer paso NO opcional' : 'Aunque hoy descanses del simulacro, este banqueo sí'}: ${cupo} ${enM}.`, u.enlace) });
  }
  const pp = d.ppt || null;
  if (pp) {
    if (!Array.isArray(pp.clases) || !pp.clases.length || !(pp.min > 0) || !pp.motivo) aborta(`domingo ${d.fecha}: ppt sin clases / min / motivo`);
    if (pp.min !== PPT_MIN) aborta(`domingo ${d.fecha}: ppt.min ${pp.min}′ ≠ ${PPT_MIN}′ (_meta.reglas_tiempo.ppt_min)`);
    for (const c of pp.clases) {
      if (!COD_CLASE.test(c.clase) || !/^20\d\d-\d\d-\d\d$/.test(c.de) || c.de >= d.fecha) aborta(`domingo ${d.fecha}: ppt › «${c.clase}» del ${c.de}: clase o fecha no válida (tiene que ser anterior al domingo)`);
      L.push({ de: c.de, min: pp.min, corto: `PPT ${c.clase}`, recurso: R99, desc: `el PPT de ${c.clase} (${pp.min}′), diferido de la clase en vivo del ${corta(c.de)}`,
        paso: P(pp.min, `PPT de ${c.clase} (${corta(c.de)}, en diferido) · NO opcional`, `${comoPPT} Ruta: ${RUTA.vivo(areaDe(c.clase))}. Aunque hoy descanses del simulacro, este PPT sí: es el diferido de su clase en vivo.`, L99) });
    }
  }
  for (const it of d.antes || []) {
    if (!/^20\d\d-\d\d-\d\d$/.test(it.origen || '') || realDe(it.origen) >= d.fecha || !it.motivo) aborta(`domingo ${d.fecha}: antes › «${it.item}» sin «origen» (la mañana de la que sale, anterior al domingo en días reales: v6.10d) o sin motivo`);
    if (!['theoesencial', 'video', 'texto'].includes(it.modo)) aborta(`domingo ${d.fecha}: antes › «${it.item}»: solo Theoesencial o sesiones (vídeo / texto)`);
    const nom = it.modo === 'theoesencial' ? `Theoesencial ${it.area}` : it.item.replace(/\s*\(.*\)$/, '');
    const sigM = sigManana(d.fecha);
    for (const u of unidades({ ...it, fecha: d.fecha })) L.push({ de: it.origen, min: u.min, corto: nom, recurso: R99, desc: `${it.modo === 'theoesencial' ? `el ${nom} (${it.paginas} p` : `la ${nom} (vídeo`}, ${u.min}′), que no cupo en la mañana del ${corta(it.origen)}`,
      // v6.09b lote 1-quater (R2 · N5): el destino del post-test AL PRINCIPIO del «cómo» (antes al final, pos. 550: el Calendar lo cortaba)
      paso: P(u.min, `${u.que(u.min)} · NO opcional`, `${u.postTest ? `Post-test al terminar (ciego; si no cabe → banqueo del ${sigM ? corta(sigM) : 'próximo día ENCAPS'} 09:45). ` : ''}${(u.comoDe ? u.comoDe(u.min) : u.como).replace('tarjeta a las 11:40', 'tarjeta al terminar este paso')} ${it.motivo}`, u.enlace) });
  }
  for (const r of RESTOS.filter((x) => x.dom === d.fecha)) {
    ANTES_USADOS.add(r);
    const ad = ADELANTOS.find((x) => x.clase === r.clase && x.min === r.resto && x.en < d.fecha);
    // v6.09b lote 1-quater (R2 · N7): si ese resto se adelanta a un domingo de plan cuando la clase del sábado se vio EN VIVO (el caso por defecto), aquí NO es un
    //   paso: va al plan B del domingo («si NO la viste en vivo: antes de nada, sus N′; el bloque se alarga N′») — antes era un paso NO opcional con «si la viste,
    //   este paso no va» (el título, la nota y la hora de ejemplo daban el caso menos probable)
    if (ad) { ad.usado = true; (ADEL_PB[d.fecha] = ADEL_PB[d.fecha] || []).push({ ...r, ad }); continue; }
    L.push({ de: r.de, min: r.resto, corto: `${r.clase} (lo que falta)`, recurso: R99, desc: `los ${r.resto}′ que faltan hasta el ${pct100(VIVO_FRAC)} de la ${r.clase} (tras sus ${r.min}′ del ${corta(r.de)})`,
      paso: P(r.resto, `${r.item} · clase de ${durTxt(r.dur)} → ${r.resto}′ de tramos útiles a ${vel(VIVO_VEL)} (${pct100(r.resto * VIVO_VEL / r.dur)} de la clase; lo que falta hasta el ${pct100(VIVO_FRAC)}, tras los ${r.min}′ del ${corta(r.de)}) · NO opcional`,
        `${cap(MODO.vivo_diferido)}. Sigue donde lo dejaste el ${corta(r.de)}: los tramos que el PPT no explica y que aún no viste. Notas SOLO en forma de pregunta. Ruta: ${RUTA.vivo(areaDe(r.clase))}.`, L99) });
  }
  for (const t of SAB_TRAMO.filter((x) => x.dom === d.fecha)) {
    ANTES_USADOS.add(t);
    // v6.09b lote 1-quater (pendiente P6 de E2): + el POST-TEST de la clase del sábado, con minutos propios, justo después de su tramo (antes «el domingo o al
    //   empezar el banqueo del lunes 09:45», sin minutos; los lunes 14 y 21-dic ese banqueo es de 50Q cronometradas). Acotado como el de la mañana: 15′ = hasta
    //   12 preguntas a 72 s/Q (el nº de preguntas no se ve sin abrir el intento)
    L.push({ de: t.de, min: TRAMO_MIN + PT_SAB_MIN, corto: `tramo 17:00-17:30 y post-test de ${t.clase}`, recurso: R99, desc: `el tramo 17:00-17:30 de la ${t.clase} (clase en vivo del ${corta(t.de)}; ${TRAMO_MIN}′ en la grabación a ${vel(VIVO_VEL)}) y su post-test (hasta ${PT_SAB_Q}Q, ${PT_SAB_MIN}′)`,
      pasos: [P(TRAMO_MIN, `${t.clase} (en vivo, ${corta(t.de)}) · tramo 17:00-17:30 de la clase (30′) en la grabación → ${TRAMO_MIN}′ a ${vel(VIVO_VEL)} (${pct100(VIVO_FRAC)}) · NO opcional`,
        // v6.09b lote 1-ter (hallazgo 6): domingo +7 → la grabación ya está publicada (sin «si aún no está, el domingo X»); el plan B del sábado (no pudo
        //   conectarse) trae aquí la clase entera con sus minutos y la hora de ejemplo a la que empieza entonces el bloque ({{INI_PB}}: la pone el bucle del domingo)
        `Sin conexión el ${corta(t.de)}: la clase entera (${vivoMin(150)}′, no ${TRAMO_MIN}′), desde las {{INI_PB}}. Si no: lo que no viste en vivo (a las 17:00 empieza el baile), desde el minuto que anotaste; la grabación ya está publicada. La clase entera = ${vivoMin(150)}′ de tramos útiles a ${vel(VIVO_VEL)}: el bloque empieza ${vivoMin(150) - TRAMO_MIN}′ antes. Notas SOLO en forma de pregunta; ★ lo que sea cifra, plazo o definición textual. Ruta: ${RUTA.vivo(areaDe(t.clase))}.`, L99),
      P(PT_SAB_MIN, `Post-test de ${t.clase} (en vivo, ${corta(t.de)}) · ${PT_SAB_MIN}′ = hasta ${PT_SAB_Q} preguntas a 72 s/Q · NO opcional`,
        `${POST_TEST_ENVIO} Justo después del tramo (la clase ya está completa): primer intento CIEGO, sin apuntes; la nota va al registro. Anota cuántas preguntas trae: si son más de ${PT_SAB_Q}, se acota a ${PT_SAB_Q} (es la medición de la clase, no un banqueo). Ruta: el post-test está en la sección de la clase (${RUTA.vivo(areaDe(t.clase))}).`, L99)],
      planBSab: t });
  }
  for (const a of SUN_AUTO[d.fecha] || []) { ANTES_USADOS.add(a); L.push({ ...a, recurso: a.recurso || R99 }); }
  return L.map((x, i) => [x, i]).sort((x, y) => (x[0].de < y[0].de ? -1 : x[0].de > y[0].de ? 1 : x[1] - y[1])).map((x) => x[0]);
}
/** «salvo su primer paso: … » / «salvo sus primeros pasos (35′): … · …» (nota del día en plantillasV6). */
/** v6.09b lote 1-quater FX1 (revisión V2): « (25′ de ellos, solo si las 18:00 del vie 27-nov no fueron las normales)» para el título del domingo */
//   v6.10x (remate): con condiciones distintas (dom 6-dic: la corrección pendiente del dom 29-nov y las 18:00 del mié 2-dic), una por condición
const condMinTxt = (L) => { const g = new Map(); for (const x of L.filter((y) => y.cond)) g.set(x.cond, (g.get(x.cond) || 0) + x.min); return g.size ? ` (${[...g].map(([c, m], i) => `${m}′${i ? '' : ' de ellos'}, solo ${c}`).join('; ')})` : ''; };
const antesAviso = (L) => (L.length === 1 ? `salvo su primer paso: ${L[0].desc}` : `salvo sus primeros pasos (${L.reduce((a, x) => a + x.min, 0)}′): ${L.map((x) => x.desc).join(' · ')}`);
const recursosDe = (L, ...extra) => [...new Map([...L.map((x) => x.recurso), ...extra].filter(Boolean).map((r) => [r.url, r])).values()];
// v6.11 (lun 23-nov, chat ENCAPS · pendiente 21.1): la GRABACIÓN de una recuperación fija que no llegue a hacerse (su plan B: «primero los PPT») va al domingo
//   con ENCAPS siguiente. Si ese domingo tiene simulacro opcional, en su lugar (como antes); si NO lo tiene (dom 6-dic: banqueos, simulacro null) el plan B decía
//   igual «en lugar del simulacro opcional de ese domingo» y la grabación se perdía → va como paso NO opcional de su ENCAPS, condicionado (SUN_AUTO: el bloque
//   empieza antes, dentro del domingo, y el bucle de ese domingo comprueba que no pise la rutina de la mañana ni el baile) y nombra la clase (la de la
//   recuperación o, con su plan B, la del plan B). Se calcula aquí, antes de los bucles de los domingos (el antesDom de ese domingo aún no está calculado).
const GRAB_PEND = {}; // domingo de la recuperación → { dest, conSim, min, clases }
for (const d of J.domingos.filter((x) => x.recupera && x.recupera.grabacion)) {
  const r = d.recupera, g1 = r.grabacion, g2 = (r.plan_b || {}).grabacion || null;
  const dest = domEncapsTras(d.fecha);
  if (!dest) aborta(`domingo ${d.fecha}: la grabación de la recuperación (plan B «si no llegas a todo») no tiene domingo con ENCAPS después`);
  const dD = domConEncaps(dest);
  const conSim = (!dD.modo || dD.modo === 'simulacro') && !!dD.simulacro;
  const min = vivoMin(durMin(g1.duracion));
  const clases = `la ${g1.clase}${g2 ? ` (con el plan B, la de la ${g2.clase})` : ''}`;
  GRAB_PEND[d.fecha] = { dest, conSim, min, clases };
  if (conSim) continue;
  const cond = `si el ${corta(d.fecha)} no llegaste a la grabación de la recuperación`;
  (SUN_AUTO[dest] = SUN_AUTO[dest] || []).push({ de: d.fecha, min, corto: `grabación ${g1.clase}${g2 ? ` (o ${g2.clase})` : ''}`, cond, recurso: R99,
    desc: `la grabación de ${clases} que no cupo en la recuperación del ${corta(d.fecha)} (${min}′ de tramos útiles a ${vel(VIVO_VEL)}; solo si no llegaste)`,
    paso: P(min, `Grabación de ${clases} que no cupo en la recuperación del ${corta(d.fecha)} → ${min}′ de tramos útiles a ${vel(VIVO_VEL)} (${pct100(VIVO_FRAC)} de la clase) · NO opcional`,
      `Solo ${cond} (su plan B: primero los PPT); si llegaste, este paso no va y el bloque empieza ${min}′ después. ${cap(MODO.vivo_diferido)}. Su PPT ya lo leíste ese día: el vídeo solo donde el PPT no explica. Notas SOLO en forma de pregunta. Ruta: ${RUTA.vivo(areaDe(g1.clase))}${g2 ? ` (con el plan B: ${RUTA.vivo(areaDe(g2.clase))})` : ''}.`, L99) });
}
// v6.10x (remate · «que no se omita nada»): la CORRECCIÓN que un domingo con simulacro opcional no puede hacer entera (franja de ejemplo recortada: dom 29-nov,
//   recuperación fija 07:15-08:45 y compromiso a las 12:30 → 55′ en vez de 80′) ya no va «a la revisión del sábado» (30′ de pasos fijos, sin hueco): va con sus
//   minutos al domingo con ENCAPS siguiente, como PRIMER PASO (SUN_AUTO), solo si se hizo el simulacro. Se calcula aquí, antes de los bucles de los domingos.
const CORR_PEND = {}; // domingo del simulacro → { dest, n, min }
for (const d of J.domingos.filter((x) => !x.modo || x.modo === 'simulacro')) {
  const [ejI, ejF] = d.franja_ejemplo || ['08:00', '12:00'];
  const antesMin = antesDom(d).reduce((a, x) => a + x.min, 0);
  const corr = 80 - (240 + antesMin - G.minutosFranja(fr(ejI, ejF)));
  const nCorr = 100 * CORR_Q <= corr * 1.15 ? 100 : Math.floor(corr / CORR_Q);
  if (nCorr >= 100) continue;
  const dest = J.domingos.map((y) => y.fecha).find((y) => y > d.fecha && domConEncaps(y));
  if (!dest) aborta(`domingo ${d.fecha}: la corrección recortada (${100 - nCorr} preguntas) no tiene domingo con ENCAPS después`);
  const n = 100 - nCorr, min = 80 - corr, cond = `si hiciste el simulacro del ${corta(d.fecha)}`;
  const acorta = (J.domingos.find((y) => y.fecha === dest) || {}).antes_hasta ? `empieza ${min}′ después` : `es ${min}′ más corto`;
  CORR_PEND[d.fecha] = { dest, n, min };
  (SUN_AUTO[dest] = SUN_AUTO[dest] || []).push({ de: d.fecha, min, corto: `corrección del simulacro del ${corta(d.fecha)}`, cond, recurso: /^Theomed/.test(d.simulacro || '') ? R105 : R99,
    desc: `la corrección de las ${n} preguntas del simulacro del ${corta(d.fecha)} que no cupieron ese día (${min}′; solo si lo hiciste)`,
    paso: P(min, `Corrección del simulacro del ${corta(d.fecha)}: las ${n} que no cupieron (cada error y cada dudosa) → ${min}′ · NO opcional`,
      `Solo ${cond} (es opcional); si no, este paso no va y el bloque ${acorta}. ${cap(TIPOS_ERROR)} + verificación en la norma. Las «seguras» falladas primero; la nota y los errores repetidos, al registro.`) });
}
for (const d of J.domingos.filter((x) => x.modo && !['simulacro', 'sin_sesion', 'manana', 'previos'].includes(x.modo))) { // v6.10w: + previos (más abajo, tras las recuperaciones) // v6.09: sin_sesion (dom 22-nov, viaje) y manana (dom 27-dic, domingo de plan) no llevan el ENCAPS opcional
  if (!['banqueos', 'simulacro_2h', 'banqueos_correccion'].includes(d.modo)) aborta(`domingo ${d.fecha}: modo desconocido «${d.modo}»`);
  if (!Array.isArray(d.franja) || d.franja.length !== 2) aborta(`domingo ${d.fecha}: modo ${d.modo} sin franja [ini, fin]`);
  if (d.modo === 'banqueos_correccion' && (!Array.isArray(d.pausa) || d.pausa.length !== 2 || !d.correccion_de)) aborta(`domingo ${d.fecha}: banqueos_correccion sin pausa [ini, fin] o sin correccion_de`);
  if (d.modo === 'simulacro_2h' && !d.correccion_en) aborta(`domingo ${d.fecha}: simulacro_2h sin correccion_en`);
  // los dos domingos se apuntan entre sí: si se mueve uno, el otro diría una fecha falsa
  if (d.modo === 'simulacro_2h' && !J.domingos.some((x) => x.fecha === d.correccion_en && x.modo === 'banqueos_correccion' && x.correccion_de === d.fecha)) aborta(`domingo ${d.fecha}: su correccion_en (${d.correccion_en}) no es un domingo banqueos_correccion con correccion_de = ${d.fecha}`);
  if (d.modo === 'banqueos_correccion' && !J.domingos.some((x) => x.fecha === d.correccion_de && x.modo === 'simulacro_2h' && x.correccion_en === d.fecha)) aborta(`domingo ${d.fecha}: su correccion_de (${d.correccion_de}) no es un domingo simulacro_2h con correccion_en = ${d.fecha}`);
  const [ini, fin] = d.franja;
  const pasos = [];
  let titulo, hecho, aviso, planB, nombre, sub, etiqueta, tema, campus, recursos;
  const nombres = (d.banqueos || []).map((b) => b.n).join(' y ');
  if (d.modo === 'banqueos' || d.modo === 'banqueos_correccion') {
    if (!d.banqueos || !d.banqueos.length) aborta(`domingo ${d.fecha}: modo ${d.modo} sin banqueos`);
    const fin1 = d.modo === 'banqueos' ? fin : d.pausa[0];
    const durB = d.banqueos.map((b) => Math.round(mmssEx(b.dur) / VEL_ACTIVO * PAUSA));
    const resto = G.minutosFranja(fr(ini, fin1)) - 5 - durB.reduce((a, x) => a + x, 0);
    if (resto < 10) aborta(`domingo ${d.fecha}: los banqueos (${durB.join(' + ')}′) no caben en ${ini}-${fin1}`);
    const tarj = Math.min(7, Math.floor(resto / 3));
    pasos.push(P(5, `Preparar: banqueos grabados ${nombres}`, `Ruta: Campus › curso 116 (SESIONES ADICIONALES GP02) › Banqueos generales – viernes › ${nombres}. Hoja para tu respuesta y tu confianza en cada pregunta; móvil fuera.`, L116));
    // v6.11 (remate, revisión 21.2 MEDIA): la cuarentena del 2026-II (y la reserva del 2026-I) también en los banqueos y simulacros de los domingos, al principio,
    //   por el día REAL (como las mañanas desde la v6.10z-e y las 16:15)
    const resD = reservaDe(realDe(d.fecha)), conRes = (t) => (resD ? `${resD} ${t}` : t);
    d.banqueos.forEach((b, i) => pasos.push(P(durB[i], `BANQUEO ${b.n} (${b.dur}) en activo a ${vel(VEL_ACTIVO)} con pausa → ${durB[i]}′`, conRes(PASO_BANQUEO))));
    pasos.push(P(resto - tarj, 'Corrección: cada fallo y cada dudosa', `${cap(TIPOS_ERROR)} + verificación en la norma.`));
    pasos.push(P(tarj, 'Tarjetas: solo lo discriminativo', 'Fallos «tontos» y detalles discriminativos, en formato pregunta → respuesta breve: cifras y plazos → ENCAPS::Cifras · conceptos → la nota del código.'));
    if (d.modo === 'banqueos_correccion') {
      const [p0, p1] = d.pausa;
      pasos.push(P(G.minutosFranja(fr(p0, p1)), `Pausa (${p0}-${p1})`, 'Fuera de la mesa: no es tiempo de estudio.'));
      const disp = G.minutosFranja(fr(p1, fin));
      if (disp !== 95) aborta(`domingo ${d.fecha}: la corrección del simulacro necesita 95′ (80 + 15) y la franja ${p1}-${fin} da ${disp}′`);
      pasos.push(P(80, `Corrección del simulacro con RANKING del ${WD_LARGO(d.correccion_de)}: cada error y cada dudosa`, `${cap(TIPOS_ERROR)} + verificación en la norma. Primero las «seguras» falladas (falsa certeza).`));
      pasos.push(P(15, 'Registro del simulacro', `% por área y errores repetidos (la nota ya la anotaste el ${WD_LARGO(d.correccion_de)}, al terminarlo). Va a la revisión del ${revSab(d.fecha)}.`));
    }
    titulo = d.modo === 'banqueos' ? `ENCAPS · DOMINGO 2 h · banqueos grabados ${nombres} de Theomed (en activo)`
      : `ENCAPS · DOMINGO · banqueos grabados ${nombres} + corrección del simulacro del ${WD_LARGO(d.correccion_de)}`;
    hecho = `banqueos ${nombres} hechos en activo (respuesta y confianza antes de cada resolución), fallos con su regla en el registro${d.modo === 'banqueos_correccion' ? ' · simulacro del ' + WD_LARGO(d.correccion_de) + ' corregido, con su % por área en el registro' : ''}`;
    aviso = `Banqueos grabados nuevos de Theomed (curso 116, publicados hasta el 11-nov): son atraso nuevo y van en activo, como todos los banqueos del plan. De ejemplo, ${ini}-${fin1}${d.modo === 'banqueos' ? '. Hoy no hay simulacro: los banqueos llenan las 2 h' : `; la corrección del simulacro, ${d.pausa[1]}-${fin}`}.`;
    // v6.09b lote 1-quater FX1 (revisión V2): «el siguiente hueco» → el ENCAPS del domingo siguiente que lo tiene, con fecha
    planB = `Si te quedas sin tiempo: termina el banqueo empezado y el otro → ${destPBDom(domEncapsTras(d.fecha), true)}; nunca en pasivo ni a 2×.`;
    nombre = d.modo === 'banqueos' ? `ENCAPS · domingo 2 h (flexible): banqueos grabados ${nombres} de Theomed` : `ENCAPS · domingo (flexible): banqueos ${nombres} + corrección del simulacro del ${WD_LARGO(d.correccion_de)}`;
    sub = d.modo === 'banqueos' ? 'flexible · en activo: respuesta antes de cada resolución · hoy sin simulacro' : `flexible · banqueos en activo (${ini}-${fin1}) + corrección y registro del simulacro (${d.pausa[1]}-${fin})`;
    etiqueta = d.modo === 'banqueos' ? `ENCAPS · domingo 2 h (banqueos ${nombres} de Theomed)` : `ENCAPS · domingo: banqueos ${nombres} + corrección del simulacro`;
    tema = `Theomed · banqueos grabados ${d.banqueos.map((b) => `${b.n} (${b.dur})`).join(' y ')}`;
    campus = 'adicionales';
    recursos = [R116];
  } else {
    if (!d.ranking || !/^Theomed/.test(d.simulacro || '')) aborta(`domingo ${d.fecha}: simulacro_2h solo para un simulacro de Theomed con ranking`);
    if (G.minutosFranja(fr(ini, fin)) !== 120) aborta(`domingo ${d.fecha}: simulacro_2h necesita una franja de 120′`);
    // v6.07d (2.ª revisión): la NOTA se anota hoy, al cerrar el intento (la usa la decisión que diga uso_nota: el GATE del vie 18-dic); la
    //   corrección y el % por área van el domingo de correccion_en
    const uso = d.uso_nota ? ` (la usa ${d.uso_nota})` : '';
    const resS = reservaDe(realDe(d.fecha)); // v6.11 (remate, revisión 21.2): la cuarentena, al principio (por el día REAL)
    pasos.push(P(120, 'SIMULACRO 100Q · 2 h sin parar, de un tirón', `${resS ? `${resS} ` : ''}Localízalo antes (Campus › curso 105 (SIMULACROS MEDICINA 2027) › ${d.simulacro.replace(/^Theomed /, 'el ')}), sin empezarlo. Primero las básicas e intermedias; marca las dudosas y vuelve al final. Ninguna en blanco: no restan. 72 s por pregunta. Al cerrar el intento, anota la nota (aciertos × 0,2) en el registro${uso}, y guarda la hoja de respuestas para la corrección.`, L105));
    titulo = 'ENCAPS · DOMINGO 2 h · simulacro 100Q con RANKING (la corrección, otro domingo)';
    hecho = `simulacro hecho de un tirón en 2 h, con la NOTA (aciertos × 0,2) anotada en el registro${uso} y la hoja de respuestas guardada (la corrección, el ${WD_LARGO(d.correccion_en)})`;
    aviso = `RANKING: cuenta el primer intento dentro de 89 h desde el viernes 16:00 → hoy, de un tirón.${d.proyectado ? ' La apertura de ese viernes es una fecha PROYECTADA por la cadencia quincenal de Theomed: confírmala en el campus.' : ''} De ejemplo, ${ini}-${fin}. Hoy no cabe la corrección: va el ${WD_LARGO(d.correccion_en)}; la nota, en cambio, se anota hoy.`;
    planB = `Si ese simulacro no está: uno antiguo del campus que no hayas hecho.${resS ? ` ${resS}` : ''}`;
    nombre = 'ENCAPS · opcional 2 h (flexible): simulacro 100Q · RANKING Theomed';
    sub = `de un tirón · RANKING: primer intento dentro de 89 h desde el viernes 16:00 · la corrección, el ${WD_LARGO(d.correccion_en)}`;
    etiqueta = 'ENCAPS · domingo 2 h (simulacro 100Q con RANKING)';
    tema = d.simulacro;
    campus = 'simulacros';
    recursos = [R105];
  }
  // v6.09b lote 1-bis (hallazgo 6): primeros pasos NO opcionales (lo que falta de las clases en diferido, el tramo final de la clase del sábado, la teoría y
  //   las cifras que no cupieron) ANTES de la franja de siempre; si el compromiso personal va en medio (antes_hasta < ini), la guía lleva la pausa
  const L = antesDom(d), antesMin = L.reduce((a, x) => a + x.min, 0);
  if ((ADEL_PB[d.fecha] || []).length) aborta(`domingo ${d.fecha}: un resto que se adelanta si la clase del sábado se vio en vivo (si_en_vivo) solo va al plan B de un domingo con simulacro`);
  let iniG = ini;
  if (d.antes_hasta && !L.length) aborta(`domingo ${d.fecha}: antes_hasta sin primeros pasos`);
  if (L.length) {
    const hasta = d.antes_hasta || ini;
    if (!/^\d\d:\d\d$/.test(hasta) || aMin(hasta) > aMin(ini)) aborta(`domingo ${d.fecha}: antes_hasta ${hasta} después del inicio de su franja (${ini})`);
    iniG = hhmm(aMin(hasta) - antesMin);
    if (aMin(iniG) < aMin(RUTINA_AM[1])) aborta(`domingo ${d.fecha}: los primeros pasos (${antesMin}′) empezarían a las ${iniG}: antes de las ${RUTINA_AM[1]} (rutina de la mañana)`);
    const pre = L.flatMap((x) => x.pasos || [x.paso]); // v6.09b lote 1-quater: una entrada puede llevar varios pasos (tramo del sábado + su post-test)
    if (hasta !== ini) pre.push(P(G.minutosFranja(fr(hasta, ini)), `Pausa (${hasta}-${ini})`, `${d.antes_pausa || 'Compromiso personal'}: no es tiempo de estudio.`));
    pasos.unshift(...pre);
    // v6.09b lote 1-ter (hallazgo 6): el plan B del sábado (no pudo conectarse a la clase en vivo) = la clase entera aquí, con la hora a la que empieza el bloque
    const pbSab = L.filter((x) => x.planBSab);
    if (pbSab.length > 1) aborta(`domingo ${d.fecha}: más de un tramo 17:00-17:30 de sábado (el plan B de cada uno alarga el bloque)`);
    if (pbSab.length) {
      const t = pbSab[0].planBSab, iniPB = hhmm(aMin(iniG) - (vivoMin(150) - TRAMO_MIN));
      if (aMin(iniPB) < aMin(RUTINA_AM[1])) aborta(`domingo ${d.fecha}: con el plan B del ${t.de} el bloque empezaría a las ${iniPB}, antes de las ${RUTINA_AM[1]}`);
      for (const p of pasos) p.como = p.como.replace('{{INI_PB}}', iniPB);
      if (GSV[t.de] && GSV[t.de].planB) GSV[t.de].planB = GSV[t.de].planB.replace('{{INI_PB}}', iniPB); // el plan B del sábado dice la misma hora
      planB = `Si el ${corta(t.de)} no pudiste conectarte a la ${t.clase}: la clase entera (${vivoMin(150)}′ de tramos útiles a ${vel(VIVO_VEL)}) en lugar de su tramo de ${TRAMO_MIN}′ → el bloque empieza ${vivoMin(150) - TRAMO_MIN}′ antes, de ejemplo a las ${iniPB}. ${planB}`;
    }
    const cortos = L.map((x) => x.corto).join(' + ');
    titulo = `${titulo.replace(/^ENCAPS · DOMINGO 2 h · (.*)$/, (m0, r0) => `ENCAPS · DOMINGO · ${r0} (2 h)`)} · primero ${antesMin}′ NO opcionales${condMinTxt(L)}: ${cortos}`;
    hecho = `los ${antesMin}′ no opcionales hechos${condMinTxt(L)} (${cortos}) · ${hecho}`;
    aviso = `Primero, NO opcionales (${antesMin}′${condMinTxt(L).replace(/^ \((.*)\)$/, ', $1')}; de ejemplo ${iniG}-${hasta}${hasta !== ini ? `; después, ${(d.antes_pausa || 'compromiso personal').replace(/^./, (c) => c.toLowerCase())}` : ''}): ${L.map((x) => x.desc).join(' · ')}. ${aviso}`;
    nombre = nombre.replace(/^ENCAPS · domingo(?: 2 h)? \(flexible\): |^ENCAPS · opcional 2 h \(flexible\): /, `ENCAPS · domingo (flexible): ${cortos} (NO opcional) + `);
    sub = `flexible · primero ${antesMin}′ NO opcionales${condMinTxt(L)} (${iniG}-${hasta}) · después: ${sub.replace(/^flexible · /, '')}`;
    etiqueta = etiqueta.replace(/^ENCAPS · domingo(?: 2 h)?(?::)? ?\(?/, `ENCAPS · domingo (${antesMin}′ NO opcionales + `).replace(/\)?$/, ')');
    recursos = recursosDe(L, ...recursos);
  }
  GD[d.fecha] = guia(fr(iniG, fin), titulo, pasos, recursos, hecho, { aviso, planB });
  const min = pasos.filter((p) => !/^Pausa \(/.test(p.que)).reduce((a, p) => a + p.min, 0);
  const pausa = pasos.filter((p) => /^Pausa \(/.test(p.que)).reduce((a, p) => a + p.min, 0);
  // la hora del bloque cuadra con el chip de la guía (totalMin, pausa incluida) y dice cuánto es estudio
  const hora = pausa ? `flexible · ${fmtMin(min + pausa)} con ${fmtMin(pausa)} de pausa (${fmtMin(min)} de estudio)` : `flexible · ${fmtMin(min)}`;
  DOM[d.fecha] = { fecha: d.fecha, simulacro: d.simulacro || null, ranking: !!d.ranking, modo: d.modo, nombre, hora, min, sub, etiqueta, tema, campus,
    ...(L.length ? { ppt: L.map((x) => x.corto), pptAviso: antesAviso(L) } : {}) };
}
// v6.09 (fix revisión 16-nov, joseph 4): DOMINGO CON RECUPERACIÓN FIJA (domingos[].recupera; v6.09: dom 29-nov, el siguiente al viaje) = bloque ENCAPS
//   OBLIGATORIO a hora fija (franja; fix 2: 07:15-08:45, tras la rutina de la mañana) con la GRABACIÓN de la clase en vivo que se perdió (tramos útiles a 2×) + los PPT en diferido que las
//   notas de la semana mandan a ese domingo (ppt_min c/u; el de la clase grabada va antes de su grabación). Antes esas notas decían «el PPT el dom 29» y
//   ese domingo no tenía ningún paso que los nombrara. El ENCAPS opcional del día (simulacro) sigue aparte, de ejemplo después (franja_ejemplo).
const REC = {}, GR = {};
const REC_PPT_MIN = []; // minutos de PPT de cada recuperación (ENCAPS_MINIMO de encaps-rec)
// v6.09b lote 1-bis (hallazgo 3): plan B de una recuperación → la clase que pasa a una 18:00 de 45′ lleva su PPT + (45′ − PPT) de tramos útiles; lo que falta
//   hasta el 60 % (= los minutos del PPT) va al domingo con ENCAPS siguiente, en su plan B (antes «primero su PPT y después 45′» en un paso de 45′)
const PLANB_DOM = [];
for (const d of J.domingos.filter((x) => x.recupera)) {
  const r = d.recupera;
  // v6.09 (17-nov): un domingo SIN SESIÓN con «llegada» (dom 22-nov, de vuelta del viaje a las 14:00) sí lleva la recuperación, después de la llegada
  if (d.modo === 'manana' || (d.modo === 'sin_sesion' && !d.llegada)) aborta(`domingo ${d.fecha}: recupera en un domingo ${d.modo}${d.modo === 'sin_sesion' ? ' sin «llegada»' : ''}`);
  if (!Array.isArray(r.franja) || r.franja.length !== 2 || !r.grabacion || !Array.isArray(r.ppt) || !r.ppt.length || !(r.ppt_min > 0) || !r.motivo) aborta(`domingo ${d.fecha}: recupera sin franja / grabacion / ppt / ppt_min / motivo`);
  for (const c of [r.grabacion, ...r.ppt]) {
    if (!COD_CLASE.test(c.clase) || !/^20\d\d-\d\d-\d\d$/.test(c.de) || c.de >= d.fecha) aborta(`domingo ${d.fecha}: recupera › «${c.clase}» del ${c.de}: clase o fecha no válida (tiene que ser anterior al domingo)`);
  }
  const [ini, fin] = r.franja;
  if (d.llegada && aMin(ini) < aMin(d.llegada)) aborta(`domingo ${d.fecha}: la recuperación (${ini}) empieza antes de la llegada (${d.llegada})`);
  if (aMin(fin) > aMin('17:00')) aborta(`domingo ${d.fecha}: la recuperación termina a las ${fin}, después de las 17:00 (baile)`);
  if (aMin(ini) < aMin('07:15') && aMin(fin) > aMin('05:45')) aborta(`domingo ${d.fecha}: la recuperación ${ini}-${fin} pisa la rutina de la mañana (05:45-07:15)`);
  // v6.09b (a1-12): la grabación con la REGLA FIJA (60 % de la clase a 2×: 2 h 30 → 45′; antes elástica, 65′) y los PPT a ppt_min (9-10′; antes 5′):
  //   Σ pasos = la franja exacta (dom 22: 45 + 5 × 9 = 90′)
  const grabMin = vivoMin(durMin(r.grabacion.duracion));
  if (r.ppt_min < 9 || r.ppt_min > PPT_MIN) aborta(`domingo ${d.fecha}: ppt_min ${r.ppt_min}′ fuera de 9-${PPT_MIN}′ (un PPT de clase en vivo ≈ 40 p × 50 % × 0,5′)`);
  if (grabMin + r.ppt.length * r.ppt_min !== G.minutosFranja(fr(ini, fin))) aborta(`domingo ${d.fecha}: grabación (${grabMin}′) + ${r.ppt.length} PPT × ${r.ppt_min}′ ≠ la franja ${ini}-${fin}`);
  const pptG = r.ppt.find((x) => x.clase === r.grabacion.clase) || null;
  const pasos = [
    ...(pptG ? [P(r.ppt_min, `PPT de ${pptG.clase} (${corta(pptG.de)}), antes de su grabación`, `${comoPPT} Ruta: ${RUTA.vivo(areaDe(pptG.clase))}.`, L99)] : []),
    P(grabMin, `Grabación de ${vivoQue(`${r.grabacion.clase} (${corta(r.grabacion.de)})`, durMin(r.grabacion.duracion), grabMin).replace(' · clase de ', '; clase de ')}`, `${cap(MODO.vivo_diferido)}. Primero el PPT; el vídeo solo donde el PPT no explica. Notas SOLO en forma de pregunta. Ruta: ${RUTA.vivo(areaDe(r.grabacion.clase))}.`, L99),
    ...r.ppt.filter((x) => x !== pptG).map((x) => P(r.ppt_min, `PPT de ${x.clase} (${corta(x.de)}, en diferido)`, `${comoPPT} Ruta: ${RUTA.vivo(areaDe(x.clase))}.`, L99)),
  ];
  // v6.09b (a1-12): PLAN B CON FECHA — Theomed cuelga la grabación 1-3 días después de la clase: si a la hora de la recuperación la de r.grabacion aún no
  //   está, ese día va la de plan_b.grabacion (ya publicada; mismo molde: su PPT + 60 % a 2×) y la que faltaba pasa a plan_b.pasa (una 18:00 que hoy
  //   lleva la clase de plan_b: la que se intercambia)
  const pb = r.plan_b || null;
  let planBTxt = '';
  if (pb) {
    const g2 = pb.grabacion, ps = pb.pasa;
    if (!g2 || !COD_CLASE.test(g2.clase) || !(g2.de < d.fecha) || !ps || ps.clase !== r.grabacion.clase || !ps.fecha || ps.hora !== '18:00') aborta(`domingo ${d.fecha}: plan_b sin grabacion (clase anterior) o sin pasa { clase = ${r.grabacion.clase}, fecha, hora 18:00 }`);
    if (vivoMin(durMin(g2.duracion)) !== grabMin) aborta(`domingo ${d.fecha}: la grabación del plan B (${g2.clase}) no dura lo mismo que la del plan A: la franja no cuadraría`);
    const m18 = MD[ps.fecha] && MD[ps.fecha].tarde;
    if (!m18 || !m18.some((u) => u.postTest === g2.clase)) aborta(`domingo ${d.fecha}: plan_b › la 18:00 del ${ps.fecha} no lleva la ${g2.clase} (con la que se intercambia la ${ps.clase})`);
    const m18c = m18.find((u) => u.postTest === g2.clase);
    if (m18c.min !== grabMin) aborta(`domingo ${d.fecha}: plan_b › la ${g2.clase} del ${ps.fecha} 18:00 dura ${m18c.min}′ y la grabación ${grabMin}′: el intercambio no cuadra`);
    const domPB = domEncapsTras(realDe(ps.fecha)); // v6.10d: el domingo siguiente a su día REAL (la 18:00 del vie 27 se hace el lun 30)
    if (!domPB) aborta(`domingo ${d.fecha}: plan_b › no hay domingo con ENCAPS después del ${ps.fecha} para lo que falta de la ${ps.clase}`);
    // el texto del ítem de la 18:00 (alternativa) dice los mismos minutos
    const alt = (J.mananas.find((x) => x.fecha === ps.fecha).teoria.find((t) => t.item.startsWith(g2.clase)) || {}).alternativa || '';
    if (!alt.includes(`su PPT (${r.ppt_min}′) + ${grabMin - r.ppt_min}′ de tramos útiles`) || !alt.toLowerCase().includes(`los ${r.ppt_min}′ que faltan`) || !alt.includes(corta(domPB))) aborta(`${ps.fecha}: la «alternativa» de la ${g2.clase} no dice «su PPT (${r.ppt_min}′) + ${grabMin - r.ppt_min}′ de tramos útiles», «los ${r.ppt_min}′ que faltan» y el ${corta(domPB)}`);
    PLANB_DOM.push({ dom: domPB, desde: d.fecha, de: ps.fecha, clase: ps.clase, min: r.ppt_min });
    planBTxt = ` PLAN B, si a las ${ini} la grabación de la ${r.grabacion.clase} aún no está publicada (Theomed la cuelga 1-3 días después de la clase): en su lugar, la ${g2.clase} (${corta(g2.de)}, ya publicada): su PPT (${r.ppt_min}′) + ${grabMin}′ de tramos útiles a 2×, y los PPT de ${r.ppt.filter((x) => x !== pptG).map((x) => x.clase).join(', ')} igual (${r.ppt_min}′ c/u) = ${G.minutosFranja(fr(ini, fin))}′. La ${ps.clase} pasa al ${corta(ps.fecha)} a las ${ps.hora}, a los ${grabMin}′ que deja la ${g2.clase}: su PPT (${r.ppt_min}′) + ${grabMin - r.ppt_min}′ de tramos útiles a 2×. Los ${r.ppt_min}′ que faltan hasta el ${pct100(VIVO_FRAC)}, ${destDomTxt(domPB)}. Si algún otro PPT aún no está, sus ${r.ppt_min}′ van a la grabación.`;
  }
  // el ENCAPS opcional del MISMO domingo (si lo hay: modo simulacro) va después de la recuperación
  const conOpcional = !d.modo || d.modo === 'simulacro';
  const [ejI, ejF] = d.franja_ejemplo || ['08:00', '12:00'];
  // v6.10z-b: si ese ENCAPS empieza por primeros pasos NO opcionales (dom 29-nov: 10Q de INV + verificación en la norma + PPT SP 2/11), el aviso lo dice
  const Lop = conOpcional && d.simulacro ? antesDom(d) : [];
  if (conOpcional && aMin(ejI) < aMin(fin)) aborta(`domingo ${d.fecha}: el ejemplo del ENCAPS opcional (${ejI}) empieza antes de que termine la recuperación (${fin})`);
  // v6.09 (17-nov): domingo de llegada → la mañana es libre; los PPT de clases POSTERIORES a este domingo van en el ENCAPS del domingo siguiente que los lleva (domingos[].ppt)
  const sigPPT = J.domingos.filter((x) => x.fecha > d.fecha && x.ppt).flatMap((x) => x.ppt.clases.filter((c) => c.de > d.fecha).map((c) => ({ ...c, dom: x.fecha })));
  // v6.09b: el domingo de llegada lleva también la revisión semanal (30′ antes) y el SYNAPSE de recuperación (al terminar): bloques propios (rutinaGuia)
  const llegadaTxt = d.llegada ? ` Domingo de llegada: la mañana es libre (viaje); desde las ${d.llegada}, de vuelta: ${hhmm(aMin(ini) - 30)} la revisión semanal, ${ini}-${fin} esta recuperación y, al terminar, el SYNAPSE de recuperación (bloques propios); nada de estudio desde las 17:00.` : '';
  // v6.10d (fix revisión 18-nov): «clase EN VIVO del …» — la fecha de la clase es REAL (Theomed) y corridaTexto no debe traducirla (antes «(clase del lun 23-nov,
//   después de hoy)» se pintaba «(clase del mar 24-nov…)»: la SP 2/11 en vivo es el lun 23 a las 19:30)
const sigTxt = sigPPT.map((c) => `PPT de ${c.clase} (clase en vivo del ${corta(c.de)}, después de hoy) → ${corta(c.dom)}, primer paso de su ENCAPS del domingo. `).join('');
  GR[d.fecha] = guia(fr(ini, fin), `ENCAPS · RECUPERACIÓN DEL VIAJE (fija) · grabación ${r.grabacion.clase} + ${r.ppt.length} PPT en diferido`, pasos, [R99],
    `${r.grabacion.clase} vista en sus tramos útiles y los ${r.ppt.length} PPT leídos, con las notas en forma de pregunta`, {
      aviso: `${sigTxt}Fijo, no opcional: recupera lo de la semana del viaje.${llegadaTxt} Los PPT que las notas de esos días mandan a este domingo van aquí (${r.ppt.map((x) => x.clase).join(' · ')}).${conOpcional ? (Lop.length ? ` Al terminar, el ENCAPS del domingo (de ejemplo ${ejI}-${ejF}): primero ${Lop.reduce((a, x) => a + x.min, 0)}′ NO opcionales (${Lop.map((x) => x.corto).join(' + ')}); el simulacro${d.ranking ? ' con RANKING' : ''}, opcional.` : ` Después, el ENCAPS opcional${d.simulacro ? ` (simulacro${d.ranking ? ' con RANKING' : ''})` : ''}, de ejemplo ${ejI}-${ejF}.`) : ''}`,
      // v6.11 (pendiente 21.1): la grabación, con su clase y a un sitio real del domingo con ENCAPS siguiente (GRAB_PEND): sin simulacro opcional, paso NO opcional
      planB: `${planBTxt.trim()}${planBTxt ? ' ' : ''}Si ${d.llegada ? 'llegas tarde o ' : ''}no llegas a todo: primero los ${r.ppt.length} PPT (${r.ppt.length * r.ppt_min}′). La grabación de ${GRAB_PEND[d.fecha].clases}, ${GRAB_PEND[d.fecha].conSim ? `el ${corta(GRAB_PEND[d.fecha].dest)}, en lugar del simulacro opcional de ese domingo` : `NO opcional (${GRAB_PEND[d.fecha].min}′) → ${destPBDom(GRAB_PEND[d.fecha].dest)}`}.`,
    });
  REC_PPT_MIN.push(r.ppt.length * r.ppt_min);
  REC[d.fecha] = { fecha: d.fecha, ini, fin, nombre: `ENCAPS · recuperación del viaje (fija): grabación ${r.grabacion.clase} + ${r.ppt.length} PPT en diferido`, tema: `Grabación ${r.grabacion.clase} a 2× en sus tramos útiles + PPT ${r.ppt.map((x) => x.clase).join(' · ')}`, clases: r.ppt.map((x) => x.clase), motivo: r.motivo, ...(d.llegada ? { llegada: d.llegada } : {}) };
}
// v6.10w (dom 22-nov): CLASES EN DIFERIDO a hora fija en un día L-V de la semana 1 de la intensiva (_meta.diferidos; lun 4-ene 10:45-11:30, la SP 6/11 en la
//   holgura del RE-SCAN): mismo bloque fijo «encaps-rec» (encapsRecuperaDe / guiaEncapsRecuperaDe) con su clase a la regla fija (60 % a 2×)
for (const x of J._meta.diferidos || []) {
  const w = dow(x.fecha);
  if (!/^20\d\d-\d\d-\d\d$/.test(x.fecha) || w < 1 || w > 5 || !(x.fecha >= F6.encaps.intensiva_desde && x.fecha < F6.encaps.pretest)) aborta(`_meta.diferidos ${x.fecha}: solo un L-V de la semana 1 de la intensiva (${F6.encaps.intensiva_desde} → ${F6.encaps.pretest})`);
  if (!Array.isArray(x.franja) || x.franja.length !== 2 || !x.item || x.item.modo !== 'vivo_diferido' || !x.motivo) aborta(`_meta.diferidos ${x.fecha}: franja, item (vivo_diferido) y motivo`);
  if (REC[x.fecha]) aborta(`_meta.diferidos ${x.fecha}: ese día ya tiene un bloque fijo de recuperación`);
  const [ini, fin] = x.franja;
  const us = unidades({ ...x.item, fecha: x.fecha });
  // v6.10x (remate): + su POST-TEST con minutos propios en la misma franja (post_test_min: 15′ = hasta 12Q, como el de la clase del sábado); antes «si no
  //   cabe → banqueo del día siguiente 09:45», que no ganaba tiempo
  const pt = x.post_test_min || 0;
  if (pt && pt !== PT_SAB_MIN) aborta(`_meta.diferidos ${x.fecha}: post_test_min ${pt}′ ≠ ${PT_SAB_MIN}′ (post-test acotado: hasta ${PT_SAB_Q}Q)`);
  const min = us.reduce((a, u) => a + u.min, 0) + pt;
  if (min !== G.minutosFranja(fr(ini, fin))) aborta(`_meta.diferidos ${x.fecha}: la clase${pt ? ' y su post-test' : ''} (${min}′) no llenan la franja ${ini}-${fin}`);
  const clase = (COD_CLASE.exec(x.item.item) || [x.item.item.replace(/\s*\(.*$/, '')])[0];
  const sigM = sigManana(x.fecha);
  GR[x.fecha] = guia(fr(ini, fin), `ENCAPS · ${clase} EN DIFERIDO (fija) · grabación a 2× en sus tramos útiles${pt ? ' + post-test' : ''}`, [
    ...us.map((u) => P(u.min, `CLASE EN DIFERIDO (va hoy a las ${ini}): ${typeof u.que === 'function' ? u.que(u.min) : u.que}`, `${u.postTest ? (pt ? 'Post-test justo después (siguiente paso). ' : `Post-test al terminar (ciego; si no cabe → banqueo del ${sigM ? corta(sigM) : 'próximo día ENCAPS'} 09:45). `) : ''}${u.como}`, L99)),
    ...(pt ? [P(pt, `Post-test de ${clase} · ${pt}′ = hasta ${PT_SAB_Q} preguntas a 72 s/Q`, `${POST_TEST_ENVIO} Justo después de la clase: primer intento CIEGO, sin apuntes; la nota va al registro. Si trae más de ${PT_SAB_Q} preguntas, se acota a ${PT_SAB_Q} (es la medición de la clase, no un banqueo). Ruta: el post-test está en la sección de la clase (${RUTA.vivo(areaDe(clase))}).`, L99)] : []),
  ], [R99], `${clase} vista en sus tramos útiles, con las notas en forma de pregunta${pt ? ', y su post-test hecho en ciego, con la nota en el registro' : ''}`, { aviso: `Fijo, no opcional. ${x.motivo}` });
  REC[x.fecha] = { fecha: x.fecha, ini, fin, nombre: `ENCAPS · ${clase} en diferido (fija): grabación a 2× en sus tramos útiles${pt ? ' + post-test' : ''}`, tema: `Grabación ${clase} a 2× en sus tramos útiles${pt ? ' + post-test' : ''}`, clases: [clase], motivo: x.motivo };
}
// v6.10z (lun 23-nov ≈08:20 · Joseph empezó la mañana ENCAPS 1/21 a las 08:15: «en caps nomás tiene que correr; el resto queda casi igual»): LO QUE NO CUPO de
//   una mañana → un HUECO LIBRE a hora fija (_meta.no_cupo; regla de Joseph para cuando empieza tarde: lo de antes va a la próxima sesión del frente o a un
//   hueco libre, sin recortar nada). Hoy, un Theoesencial: las p. 1-27 de INV de la mañana del mié 18 de plan (= lun 23 real) → sáb 28-nov 07:15-07:42, el
//   hueco entre el desayuno y el Business del sábado (07:45). Mismo bloque fijo «encaps-rec» (encapsRecuperaDe / guiaEncapsRecuperaDe), ahora en un SÁBADO de
//   F1 (plantillasV6 lo pinta en la rama del sábado); su guía es la del paso del Theoesencial de la mañana (qué · cuánto · cómo · enlace del campus), con sus
//   minutos exactos (páginas × 1′ = la franja). El paso de origen dice adónde va (unidades › ncTxt). Las fechas de PLAN de los textos (la mañana del mié 18,
//   el resto de las páginas del vie 20) las pinta con su día real corridaTexto (lun 23 · mié 25), como el USMLE_FIJO_SAB del mismo sábado.
const SAB_VENTANAS = [['04:15', '08:25'], ['14:00', '17:00'], ['21:00', '22:00']]; // estudio del sábado (gimnasio 08:30-14:00 · baile 17:00-20:00)
// v6.10z-d (lun 23-nov ≈09:45 · la mañana fue 10:00-12:00, solo teoría y post-tests): VARIOS bloques fijos el mismo sábado (REC_SAB / GR_SAB: sábado → lista,
//   por hora) y, además del Theoesencial (07:15), el BANQUEO en TANDAS (item «banqueo» con franja: sáb 28-nov 05:30-05:45 · 08:10-08:25 · 14:30-14:45, 10Q cada
//   una; pueden ser TODAS las Q de la mañana): q × 72 s sin material + vuelta a las marcadas sin clave (el resto de la franja, 1-5′); su corrección va al domingo
//   del ítem «correccion» (obligatorio) · el paso del banqueo de la mañana lo dice.
const REC_SAB = {}, GR_SAB = {};
for (const x of NO_CUPO.filter((y) => dow(y.fecha) !== 0)) { // v6.10z-b: los de un domingo van como primeros pasos de su ENCAPS (SUN_AUTO, más arriba)
  const m = J.mananas.find((d) => d.fecha === x.de);
  if (!m || !GM[x.de]) aborta(`_meta.no_cupo ${x.fecha}: «de» ${x.de} no es una mañana ENCAPS`);
  if (!/^20\d\d-\d\d-\d\d$/.test(x.fecha) || dow(x.fecha) !== 6 || x.fecha <= realDe(x.de) || x.fecha > F6.f1.fin) aborta(`_meta.no_cupo ${x.fecha}: solo un sábado de F1 posterior al día real de la mañana (${realDe(x.de)})`);
  if (!Array.isArray(x.franja) || x.franja.length !== 2 || !/^\d\d:\d\d$/.test(x.inicio_real || '') || !x.motivo) aborta(`_meta.no_cupo ${x.fecha}: franja, inicio_real (HH:MM) y motivo`);
  if (REC[x.fecha]) aborta(`_meta.no_cupo ${x.fecha}: ese día ya tiene un bloque fijo de recuperación`);
  const [ini, fin] = x.franja;
  if (!SAB_VENTANAS.some(([a, b]) => aMin(ini) >= aMin(a) && aMin(fin) <= aMin(b))) aborta(`_meta.no_cupo ${x.fecha}: ${ini}-${fin} fuera de las ventanas de estudio del sábado (${SAB_VENTANAS.map((v) => v.join('-')).join(' · ')})`);
  if (aMin(ini) < aMin(RUTINA_AM[1]) && aMin(fin) > aMin(RUTINA_AM[0])) aborta(`_meta.no_cupo ${x.fecha}: ${ini}-${fin} pisa la rutina de la mañana`);
  const otro = (REC_SAB[x.fecha] || []).find((r) => aMin(ini) < aMin(r.fin) && aMin(r.ini) < aMin(fin));
  if (otro) aborta(`_meta.no_cupo ${x.fecha}: ${ini}-${fin} pisa el bloque fijo de las ${otro.ini}-${otro.fin}`);
  const minF = G.minutosFranja(fr(ini, fin));
  let g, rec;
  if (x.item === 'banqueo') {
    // v6.10z-d: una TANDA del banqueo que no cupo (sáb 28-nov 05:30 · 08:10 · 14:30): q × 72 s (sin material, con confianza) + vuelta a las marcadas, sin clave
    const nQ = m.banqueo && m.banqueo.n, area = m.banqueo && m.banqueo.area;
    if (!nQ || !Number.isInteger(x.q) || !(x.q > 0) || !x.fuente || !x.si_no) aborta(`_meta.no_cupo ${x.fecha} ${ini}: banqueo con q, fuente y si_no`);
    const tandas = NO_CUPO.filter((y) => y.de === x.de && y.item === 'banqueo').sort((a, b) => (a.fecha + a.franja[0] < b.fecha + b.franja[0] ? -1 : 1));
    if (tandas.some((y) => dow(y.fecha) !== 6)) aborta(`_meta.no_cupo ${x.fecha}: el banqueo del ${x.de} va a un domingo O a tandas de un sábado, no a los dos`);
    const qT = tandas.reduce((a, y) => a + y.q, 0), i = tandas.indexOf(x) + 1, n = tandas.length;
    if (!(qT <= nQ)) aborta(`_meta.no_cupo ${x.fecha}: las tandas del banqueo del ${x.de} suman ${qT}Q (más que las ${nQ}Q de la mañana)`);
    const corr = NO_CUPO.find((y) => y.de === x.de && y.item === 'correccion');
    if (!corr) aborta(`_meta.no_cupo ${x.fecha}: las tandas del banqueo del ${x.de} sin «correccion» (el domingo que las corrige)`);
    const min = Math.ceil(x.q * 72 / 60), resto = minF - min, minCorr = corrNoCupo(corr, qT);
    if (resto < 1 || resto > 5) aborta(`_meta.no_cupo ${x.fecha} ${ini}-${fin}: ${x.q}Q × 72 s = ${min}′ deja ${resto}′ de vuelta a las marcadas (entre 1 y 5′)`);
    const nom = `${x.q}Q de ${area} · tanda ${i}/${n}`;
    const horas = tandas.map((t) => (t.fecha === x.fecha ? t.franja[0] : `${corta(t.fecha)} ${t.franja[0]}`)).join(' · ');
    g = guia(fr(ini, fin), `ENCAPS · ${nom} (lo que no cupo el ${corta(x.de)})`, [
      P(min, `${x.q}Q de ${area} que faltaron el ${corta(x.de)} · ${x.fuente} · modo examen (72 s c/u) → ${min}′`, `${cap(x.si_no)}. Sin material, sin mirar nada. ${RESERVA} ${CONFIANZA} Ruta: ${RUTA.drLopezPT}.`),
      P(resto, 'Vuelta a las marcadas', `Sin clave (la corrección de las ${qT}Q, el ${corta(corr.fecha)}, primer paso de su ENCAPS: ${minCorr}′): como en el examen, las dudosas al final.`),
    ], [R99], `${x.q}Q respondidas con su confianza (el % ciego, en la corrección)`, {
      aviso: `Fijo, no opcional: ${x.q} de las ${qT}Q que faltaron en el banqueo de la mañana ENCAPS ${m.n}/${NM} del ${corta(x.de)} (empezó a las ${x.inicio_real}; ${qT < nQ ? `ese día, ${nQ - qT}Q` : 'ese día no hubo banqueo'}).${n > 1 ? ` Tanda ${i}/${n} (${horas}).` : ''} Su corrección, el ${corta(corr.fecha)} (${minCorr}′).`,
      planB: 'Si una fuente no carga, pasa a la siguiente del orden. Nunca el 2026-II.',
    });
    // tema y sub: el Home los pinta tal cual (sin corridaTexto) → sin fechas · sinMinimo: 15′ sin versión reducida (el mínimo ROJO de encaps-rec habla de PPT)
    rec = { fecha: x.fecha, ini, fin, nombre: `ENCAPS · ${nom} (lo que no cupo el ${corta(x.de)})`, tema: `${x.q}Q de ${area} · ${x.fuente}`, clases: [], motivo: x.motivo,
      sub: `fijo · modo examen (72 s c/u), sin mirar nada · ${resto}′ de vuelta a las marcadas, sin clave`, sinMinimo: true };
  } else {
    const it = m.teoria.find((t) => t.item === x.item);
    if (!it || it.modo !== 'theoesencial') aborta(`_meta.no_cupo ${x.fecha}: «${x.item}» no es un Theoesencial ni el banqueo de la mañana del ${x.de}`);
    const [u] = unidades({ ...it, fecha: x.de });
    if (u.min !== minF) aborta(`_meta.no_cupo ${x.fecha}: el ${x.item} (${u.min}′) no llena la franja ${ini}-${fin}`);
    const pags = pagsDe(it.de).replace(/^las /, ''), nom = `Theoesencial de ${AREA[it.area]} · ${pags}`;
    const restoTxt = it.resto ? ` Las ${(/^p\. \d+(?:-\d+)?/.exec(it.resto) || [it.resto])[0]} ya fueron el ${it.resto_a}.` : '';
    g = guia(fr(ini, fin), `ENCAPS · ${nom} (lo que no cupo el ${corta(x.de)})`, [
      P(u.min, u.que(u.min), `${cap(MODO.theoesencial.replace(/ a las \d\d:\d\d$/, ''))}. Ruta: ${RUTA.theoes(AREA[it.area])}.`, L99),
    ], [R99], `${pags} del Theoesencial de ${AREA[it.area]} leídas en activo, con tarjeta de lo que no salió`, {
      aviso: `Fijo, no opcional: lo que no cupo en la mañana ENCAPS ${m.n}/${NM} del ${corta(x.de)} (empezó a las ${x.inicio_real}), entero.${restoTxt}`,
    });
    // tema y sub: el Home los pinta tal cual (sin corridaTexto) → sin fechas · sinMinimo: 27′ de lectura sin versión reducida (el mínimo ROJO de encaps-rec habla de PPT)
    rec = { fecha: x.fecha, ini, fin, nombre: `ENCAPS · ${nom} (lo que no cupo el ${corta(x.de)})`, tema: `Theoesencial de ${AREA[it.area]} · ${it.de}`, clases: [], motivo: x.motivo,
      sub: `fijo · ${MODO.theoesencial.replace(/ a las \d\d:\d\d$/, '')}`, sinMinimo: true };
  }
  (REC_SAB[x.fecha] = REC_SAB[x.fecha] || []).push(rec);
  (GR_SAB[x.fecha] = GR_SAB[x.fecha] || []).push(g);
}
for (const f of Object.keys(REC_SAB)) { // por hora (el Home y el Calendar los leen en orden)
  const o = REC_SAB[f].map((r, i) => [r, GR_SAB[f][i]]).sort((a, b) => aMin(a[0].ini) - aMin(b[0].ini));
  REC_SAB[f] = o.map((x) => x[0]); GR_SAB[f] = o.map((x) => x[1]);
}
// v6.10z-d: el paso del banqueo de la mañana dice adónde van las Q que no cupieron (las tandas del sábado), al principio de su «cómo» (corte del Calendar: 26h)
for (const de of [...new Set(NO_CUPO.filter((y) => y.item === 'banqueo' && dow(y.fecha) === 6).map((y) => y.de))]) {
  const m = J.mananas.find((d) => d.fecha === de), nQ = m.banqueo.n, area = m.banqueo.area;
  const tandas = NO_CUPO.filter((y) => y.de === de && y.item === 'banqueo').sort((a, b) => (a.fecha + a.franja[0] < b.fecha + b.franja[0] ? -1 : 1));
  const pB = GM[de].flatMap((g) => g.pasos).find((p) => p.que.startsWith(`${nQ}Q de ${area} `));
  if (!pB) aborta(`_meta.no_cupo: la mañana del ${de} no tiene el paso «${nQ}Q de ${area}»`);
  const porSab = [...new Set(tandas.map((t) => t.fecha))].map((f) => `${corta(f)} ${tandas.filter((t) => t.fecha === f).map((t) => t.franja.join('-')).join(' · ')}`).join(' · ');
  const qT = tandas.reduce((a, t) => a + t.q, 0), qs = tandas.map((t) => t.q);
  const qsTxt = qs.length > 1 && qs.every((q) => q === qs[0]) ? `${qs.length} tandas de ${qs[0]}Q` : qs.map((q) => `${q}Q`).join(' + ');
  pB.como = `Si hoy no cupo: ${qT === nQ ? `las ${nQ}` : `${qT} de las ${nQ}`} → ${porSab} (${qsTxt}, bloques fijos) · ${pB.como}`;
}
// v6.10d (18-nov-2026): el plan B de una recuperación (dom 22 → la 18:00 del vie 27-nov, que con el alias se hace el lun 30) manda lo que falta de su
//   clase al domingo con ENCAPS siguiente a su día REAL, aunque sea de banqueos (dom 6-dic): antes de nada y con sus minutos; el bloque empieza antes
//   (las guías de banqueos ya están hechas: se completan aquí su aviso y su plan B)
for (const x of PLANB_DOM) {
  const dB = J.domingos.find((y) => y.fecha === x.dom);
  if (!dB || !['banqueos', 'banqueos_correccion', 'simulacro_2h'].includes(dB.modo)) continue; // los de simulacro, en su bucle (abajo)
  const g = GD[x.dom];
  const m = g && /^(\d\d:\d\d)/.exec(g.franja);
  if (!m) aborta(`plan B de la recuperación (${x.clase}) → ${x.dom}: ese domingo no tiene guía con franja`);
  const iniPB = hhmm(aMin(m[1]) - x.min);
  if (aMin(iniPB) < aMin(RUTINA_AM[1])) aborta(`domingo ${x.dom}: con el plan B (${x.clase}, +${x.min}′) el bloque empezaría a las ${iniPB}, antes de las ${RUTINA_AM[1]}`);
  g.planB = `Si el dom ${Number(x.desde.slice(8))} fue con el plan B (la grabación de la ${x.clase} aún no estaba publicada): antes de nada, los ${x.min}′ de tramos útiles de la ${x.clase} que no cupieron el ${corta(x.de)} a las 18:00 (lo que falta hasta el ${pct100(VIVO_FRAC)}); el bloque empieza ${x.min}′ antes, de ejemplo a las ${iniPB}.${g.planB ? ' ' + g.planB : ''}`;
  g.aviso = `Si el dom ${Number(x.desde.slice(8))} fue con el plan B: antes de todo, ${x.min}′ de la ${x.clase} (de ejemplo, desde las ${iniPB}).${g.aviso ? ' ' + g.aviso : ''}`;
  ANTES_USADOS.add(x);
}
// v6.10w (dom 22-nov): DOMINGO A HORA FIJA solo con sus primeros pasos NO opcionales (modo 'previos'; dom 3-ene 12:30: lo que falta hasta el 60 % de GES 1/6, GES 2/6
//   y ET 1/3 + el Banqueo 9/19), sin simulacro opcional: los planes secundarios del sáb 2-ene ocupan 05:00-12:00 y el SHIP S6 va después
for (const d of J.domingos.filter((x) => x.modo === 'previos')) {
  if (!/^\d\d:\d\d$/.test(d.inicio || '')) aborta(`domingo ${d.fecha}: modo previos sin «inicio» (HH:MM)`);
  const L = antesDom(d), antesMin = L.reduce((a, x) => a + x.min, 0);
  if (!L.length) aborta(`domingo ${d.fecha}: modo previos sin primeros pasos`);
  const ini = d.inicio, fin = hhmm(aMin(ini) + antesMin);
  if (aMin(fin) > aMin('17:00')) aborta(`domingo ${d.fecha}: el ENCAPS a hora fija acaba a las ${fin}, después de las 17:00 (baile)`);
  if (aMin(ini) < aMin(RUTINA_AM[1]) && aMin(fin) > aMin(RUTINA_AM[0])) aborta(`domingo ${d.fecha}: ${ini}-${fin} pisa la rutina de la mañana`);
  const cortos = L.map((x) => x.corto).join(' + ');
  // lo que se adelanta si la clase del sábado se vio EN VIVO (caso por defecto) va al plan B, con sus minutos (el bloque se alarga)
  const adTxt = (ADEL_PB[d.fecha] || []).map((x) => { x.ad.usado = true; return `Si NO viste la ${x.ad.por} en vivo (${corta(x.ad.sab)}) y el ${corta(realDe(x.ad.en))} hiciste la clase entera: antes de nada, los ${x.resto}′ que faltan hasta el ${pct100(VIVO_FRAC)} de la ${x.clase} (tras sus ${x.min}′ del ${corta(x.de)}: su grabación a ${vel(VIVO_VEL)}, desde donde la dejaste); el bloque se alarga ${x.resto}′, hasta las ${hhmm(aMin(fin) + x.resto)}.`; });
  const pbAqui = PLANB_DOM.filter((x) => x.dom === d.fecha);
  for (const x of pbAqui) ANTES_USADOS.add(x);
  GD[d.fecha] = guia(fr(ini, fin), `ENCAPS · DOMINGO a hora fija · ${cortos} (NO opcional${condMinTxt(L).replace(/^ \((.*)\)$/, '; $1')})`, L.flatMap((x) => x.pasos || [x.paso]), recursosDe(L),
    `los ${antesMin}′ hechos${condMinTxt(L)} (${cortos})`, {
      aviso: `${adTxt.length ? `Si no viste la ${ADEL_PB[d.fecha][0].ad.por} en vivo: antes de todo, ${ADEL_PB[d.fecha][0].resto}′ de la ${ADEL_PB[d.fecha][0].clase} (hasta las ${hhmm(aMin(fin) + ADEL_PB[d.fecha][0].resto)}). ` : ''}A hora fija y NO opcional (${antesMin}′): ${L.map((x) => x.desc).join(' · ')}. Hoy no hay simulacro opcional: la mañana es para los planes que no cupieron el sábado.`,
      planB: [...adTxt, 'Si el día se complica: primero el Banqueo 9/19 (en activo) y después lo que falta de las clases, siempre antes de las 17:00 (baile).'].join(' '),
    });
  DOM[d.fecha] = { fecha: d.fecha, simulacro: null, ranking: false, modo: 'previos', nombre: `ENCAPS · domingo ${ini}-${fin} (a hora fija): ${cortos} (NO opcional)`, hora: `${ini}–${fin}`, min: antesMin,
    sub: `a hora fija · ${antesMin}′ NO opcionales · hoy sin simulacro`, etiqueta: `ENCAPS · domingo a hora fija (${antesMin}′ NO opcionales)`, tema: cortos, campus: 'adicionales', fija: [ini, fin], ppt: L.map((x) => x.corto), pptAviso: antesAviso(L) };
}
// v6.10x (dom 22-nov · orden de Joseph: «que se cumpla toda la programación, que no se omita nada, sin dos programaciones el mismo día»):
//   (1) CALENTAMIENTO DE LA INTENSIVA EN UN DOMINGO (_meta.dias_extra[].calentamiento_domingo; v6.10x: el V-2 que la mañana 21/21 sustituye el mié 6-ene) →
//       bloque ENCAPS FIJO del domingo (encaps-dom con «fija», modo 'calentamiento'). Lo coloca gen_encaps_intensivo_2027.js en la fila del día extra
//       (extra.manana_f1.calentamiento_domingo: domingo, código, segmentos del LOOP a hora fija, almuerzo y repaso): aquí se lee del SQL, se comprueba y se
//       pinta (orden de generación: gen_encaps_intensivo_2027.js → este script). Mismos minutos que en la intensiva; sin el Anki de las 05:00.
//   (2) SIMULACROS OPCIONALES SIN SITIO (domingos[].simulacro_pendiente: el que esperaba un domingo sin sesión, de plan o lleno a hora fija) → REGLA GENERAL:
//       cada uno, en el orden de su domingo de origen, al primer domingo de F2 (desde el siguiente a la transición, antes del examen, sin protegidos ni SKIP)
//       con hueco para el ENCAPS opcional de 4 h = 600′ de estudio posibles (05:00-17:00 sin la rutina de 05:45-07:15 ni el almuerzo de 12:00-12:30) − el
//       SYNAPSE / vibecoding de ese domingo (SHIP + Feynman: synapseDailyPlan) − su ENCAPS fijo ≥ 240′; uno por domingo. Mismo bloque que el de F1.
function tuplaSql(line) {
  const out = []; let i = line.indexOf('(') + 1;
  while (i < line.length) {
    while (line[i] === ' ' || line[i] === ',') i++;
    if (line[i] === ')') break;
    if (line[i] === "'") {
      let s = ''; i++;
      for (;;) { if (line[i] === "'") { if (line[i + 1] === "'") { s += "'"; i += 2; continue; } i++; break; } s += line[i++]; }
      if (line.startsWith('::jsonb', i)) { i += 7; out.push(JSON.parse(s)); } else out.push(s);
    } else if (line.startsWith('NULL', i)) { out.push(null); i += 4; }
    else { let s = ''; while (line[i] !== ',' && line[i] !== ')') s += line[i++]; out.push(Number(s)); }
  }
  const COLS_SQL = ['examen', 'dia', 'fecha', 'weekday', 'tipo', 'codigo', 'subtema', 'prioridad', 'modo', 'videos', 'theomed', 'material_comp', 'temas_secundarios', 'extra'];
  return Object.fromEntries(COLS_SQL.map((c, k) => [c, out[k]]));
}
const FILAS_INT = filasInt();
const ALMUERZO_DOM = ['12:00', '12:30'];
const CAL_DOM = {};
const SYNx = cargarModuloTS(path.join('src', 'lib', 'synapseDailyPlan.ts')); // SHIP + Feynman de cada domingo (huecos del domingo)
const synMinDom = (f) => ((SYNx.synDiaDe(f) || {}).bloques || []).reduce((a, b) => a + b.min, 0);
{
  const EPx = cargarModuloTS(path.join('src', 'lib', 'encapsPlan.ts'), new Map(), { react: {}, './supabase': { supabase: {} } });
  const FUENTE_F2 = EPx.FUENTE_REAL_F2;
  const ciego = cargarModuloTS(path.join('src', 'lib', 'encapsCiego.ts')).subtemaCiego;
  if (!FUENTE_F2) aborta('encapsPlan.ts sin FUENTE_REAL_F2 (fuente real de las preguntas de la intensiva)');
  for (const x of J._meta.dias_extra || []) {
    const cfg = x.calentamiento_domingo; if (!cfg) continue;
    const r = FILAS_INT.find((y) => y.fecha === x.fecha), c = r && r.extra && r.extra.manana_f1 && r.extra.manana_f1.calentamiento_domingo;
    if (!c || !c.repaso || !Array.isArray(c.loop) || !c.loop.length) aborta(`_meta.dias_extra ${x.fecha}: calentamiento_domingo sin su sitio en _encaps_intensivo_2027.sql (extra.manana_f1.calentamiento_domingo con loop y repaso) → regenera el SQL: node DATA/_scripts/gen_encaps_intensivo_2027.js --sin-tx --out <copia>/_encaps_intensivo_2027.sql y copia solo el .sql`);
    if (CAL_DOM[c.fecha]) aborta(`_meta.dias_extra ${x.fecha}: el ${c.fecha} ya lleva el calentamiento ${CAL_DOM[c.fecha].codigo} (uno por domingo: no caben dos en 600′)`);
    if (dow(c.fecha) !== 0 || c.fecha <= x.fecha || c.fecha <= F6.transicion.hasta || J.domingos.some((d) => d.fecha === c.fecha) || PROT_SAB.has(c.fecha) || SKIP.has(c.fecha)) aborta(`_meta.dias_extra ${x.fecha}: el calentamiento va al ${c.fecha}, que no es un domingo de F2 libre (sin ENCAPS de F1, protegido ni SKIP) posterior a su día`);
    if (c.ini !== cfg.inicio || JSON.stringify(c.almuerzo) !== JSON.stringify(cfg.almuerzo) || JSON.stringify(cfg.almuerzo) !== JSON.stringify(ALMUERZO_DOM)) aborta(`_meta.dias_extra ${x.fecha}: inicio / almuerzo del JSON (${cfg.inicio} · ${cfg.almuerzo}) ≠ SQL (${c.ini} · ${c.almuerzo}) o ≠ ${ALMUERZO_DOM.join('-')}: regenera _encaps_intensivo_2027.sql`);
    const [a0, a1] = c.almuerzo;
    let t = aMin(c.ini);
    for (const s of c.loop) {
      const a = aMin(s.h);
      if (a !== t && !(t <= aMin(a0) && a === aMin(a1))) aborta(`calentamiento del ${c.fecha}: hueco o solape antes del segmento de las ${s.h}`);
      if (a < aMin(a1) && a + s.min > aMin(a0)) aborta(`calentamiento del ${c.fecha}: el segmento de las ${s.h} pisa el almuerzo (${a0}-${a1})`);
      t = a + s.min;
    }
    if (hhmm(t) !== c.fin || aMin(c.fin) > aMin('17:00') || aMin(c.ini) < aMin('05:00') || (aMin(c.ini) < aMin(RUTINA_AM[1]) && aMin(c.fin) > aMin(RUTINA_AM[0]))) aborta(`calentamiento del ${c.fecha}: ${c.ini}-${c.fin} fuera de 05:00-17:00 o sobre la rutina de ${RUTINA_AM.join('-')}`);
    const mx = J.mananas.find((y) => y.fecha === x.fecha);
    if (!mx || !String(x.motivo).includes(corta(c.fecha)) || !String(mx.extra || '').includes(corta(c.fecha))) aborta(`_meta.dias_extra ${x.fecha}: su motivo y el «extra» de su mañana tienen que decir adónde va el calentamiento (${corta(c.fecha)})`);
    const cod = c.codigo, lab = ciego(String(c.subtema).replace(/^CALENTAMIENTO \(sin material nuevo\) · /, ''));
    // la sesión de cada código del repaso: la última fila de la intensiva anterior al domingo con ese código (calentamiento) o crítico (barrido)
    const sesDe = (v) => (FILAS_INT.filter((y) => y.fecha < c.fecha && y.extra && y.extra.loop && (y.codigo === v || y.extra.critico_v3 === v)).at(-1) || {}).fecha || null;
    const repTxt = Object.entries(c.repaso).map(([k, v]) => `${k} ${v}${sesDe(v) ? ` (${corta(sesDe(v))})` : ''}`).join(' · ') || 'sin códigos previos aún';
    const prev = [...new Set(Object.values(c.repaso))].join(' + ') || 'los de F1';
    // v6.11 fase 2 (remate, revisión «cobertura» MEDIA): un calentamiento SIN códigos previos de la intensiva (dom 10-ene: el II-3 del jue 7 pasó al dom 17) no
    //   deja vacíos sus 60′ de repaso: re-test de los fallos de lo hecho en los 8 días anteriores (ENCAPS de F1 a hora fija de corrida_s1.extra y mañanas de F1)
    const semAnt = (() => { const d0 = addDias(c.fecha, -8);
      const ex = Object.entries((F6.corrida_s1 && F6.corrida_s1.extra) || {}).filter(([f, v]) => f >= d0 && f < c.fecha && v && v.encaps).map(([f]) => [f, `ENCAPS 16:15 del ${corta(f)}`]);
      const mm = J.mananas.map((y) => [realDe(y.fecha), y]).filter(([r]) => r >= d0 && r < c.fecha).map(([r, y]) => [r, `${y.fase === 'cierre' ? 'simulacro de cierre' : `mañana ${y.n}/${NM}`} del ${corta(r)}`]);
      return [...ex, ...mm].sort((x, y) => x[0].localeCompare(y[0])); })();
    const repVacio = !Object.keys(c.repaso).length;
    const barrAntes = (FILAS_INT.filter((y) => y.fecha < c.fecha && y.codigo === cod && /^BARRIDO/.test(String(y.subtema || ''))).at(-1) || {}).fecha || null;
    if (repVacio && !semAnt.length) aborta(`calentamiento del ${c.fecha}: sin códigos previos de la intensiva ni sesiones de F1 en los 8 días anteriores (el repaso de 60′ quedaría vacío)`);
    const RE_SEG = [
      [/^Repaso espaciado/, (s) => (repVacio
        ? P(s.min, `REPASO ESPACIADO · re-test de los fallos del ${corta(semAnt[0][0])} al ${corta(semAnt[semAnt.length - 1][0])} (aún no hay códigos previos de la intensiva)`, `Las MISMAS preguntas reales que fallaste (registro y runners), sin la clave a la vista: ${semAnt.map((x) => x[1]).join(' · ')}. Lo que no recuerdes, recall en blanco de la regla contrastado con la norma.`)
        : P(s.min, `REPASO ESPACIADO D-1 / D-7 / D-21 · ${repTxt}`, 'Re-test de las MISMAS preguntas reales que fallaste esos días (registro y runners), sin la clave a la vista; lo que no recuerdes, recall en blanco de la regla contrastado con la norma.'))],
      // v6.11 fase 2 (remate, revisión «cobertura» BAJA): si el código ya tuvo su BARRIDO antes del domingo (II-3: mié 13-ene → calentamiento dom 17), el pre-test
      //   no es el primer contacto: re-test ciego tras ese barrido
      [/^PRE-TEST 10Q/, (s) => P(s.min, `PRE-TEST 10Q CIEGAS de ${cod} — ${lab} · sin clave hasta responder`, `${barrAntes ? `Re-test ciego tras el barrido del ${corta(barrAntes)} (no es tu primer contacto con el tema): preguntas que NO hiciste ese día` : 'Primer intento ciego'}, sin apuntes, confianza 1-3 en cada una; la nota va al registro como pre-test del día. Preguntas reales con su clave: ${FUENTE_F2}.`)],
      [/^DEEP PRIME/, (s) => P(s.min, `DEEP PRIME de ${cod} — ${lab}: la norma / NTS y sus cifras (sin material nuevo)`, `La norma del sub-eje (definiciones de las primeras páginas, tablas, flujogramas, cifras) y tus notas del tema; lo que no salga de memoria → tarjeta a ENCAPS::Cifras. Normas: ${RUTA.normas} · ${RUTA.drLopezNorm}.`, L99)],
      [/^CONSOLIDACIÓN 30Q/, (s) => P(s.min, `CONSOLIDACIÓN 30Q · 60 % ${cod} · 40 % previos (${prev}) + cierre`, `Pregunta por pregunta con corrección inmediata y ≥ 40 % de recall directo (sin mirar las opciones); al final, cada fallo con su área y su tipo. Preguntas reales con su clave: ${FUENTE_F2}.`)],
      // v6.10x (remate): el domingo no tiene fila en Supabase → sin CIERRE en ENCAPS → Plan: el registro dice por dónde va (al principio: el Calendar corta el «cómo»)
      [/^Registro/, (s) => P(s.min, 'REGISTRO (cierre) · _registro_resoluciones.json', 'Hoy no hay fila en ENCAPS → Plan (sin CIERRE en la app): en el PC, apéndalo a DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json (rondas[], con el esquema de su _meta): pre-test 10Q y consolidación 30Q ahora, la eval 20Q al terminarla, cada una con n, seguras y fallos. Cada fallo con su tipo (knowledge · transfer · proceso: CONCEPTO · OLVIDO · CRONOLOGÍA / CCSN · CONTEXTO / CAMBIO · TIEMPO · LECTURA) y su regla de 1 línea; los OLVIDO → tarjeta a ENCAPS::Cifras hoy mismo.')],
      [/^EVALUACIÓN MODO EXAMEN 20Q/, (s) => P(s.min, `EVAL MODO EXAMEN 20Q (${cod}) · 72 s/Q · 10 nuevas del sub-eje + 10 de hace 7-21 días en re-test`, `Sin material y con la solución al final; las 10 de re-test son las MISMAS preguntas reales que fallaste, sin la clave. Fuente de las 10 nuevas: ${FUENTE_F2}. La nota y los fallos, al registro.`)],
    ];
    const pasos = [];
    let fPrev = null;
    for (const s of c.loop) {
      if (fPrev != null && aMin(s.h) > fPrev) pasos.push(P(aMin(s.h) - fPrev, `Pausa (${hhmm(fPrev)}-${s.h}) · almuerzo`, 'Fuera de la mesa: no es tiempo de estudio.'));
      const m = RE_SEG.find(([re]) => re.test(s.seg));
      if (!m) aborta(`calentamiento del ${c.fecha}: segmento desconocido «${s.seg}» (no tiene texto en la guía del domingo)`);
      pasos.push(m[1](s));
      fPrev = aMin(s.h) + s.min;
    }
    const min = c.loop.reduce((a, s) => a + s.min, 0), mn = mx.n;
    // v6.10x (remate): lo que va FUERA del bloque (los planes B de diciembre que mandan al primer domingo de F2 y el post-test de la clase en vivo de ayer) va en
    //   los huecos reales: de 05:00 al inicio de la rutina y desde el fin del calentamiento, sin pisar el SHIP (antes «antes de las 07:15 (desde las 05:00)»,
    //   que incluía la rutina de 05:45-07:15)
    const libre = (aMin(RUTINA_AM[0]) - aMin('05:00')) + (aMin('17:00') - aMin(c.fin)) - synMinDom(c.fecha);
    if (libre < 0) aborta(`calentamiento del ${c.fecha}: el SHIP / Feynman (${synMinDom(c.fecha)}′) no caben fuera del bloque antes de las 17:00`);
    const sabV = J.sabados.find((s) => s.fecha === addDias(c.fecha, -1) && s.vivo && !s.sin_sesion && !/banqueo/i.test(s.vivo)) || null;
    const fuera = [c.fecha === DOM_LIBRE_F2 ? `lo que los planes B de diciembre mandan a este domingo (lo que no quepa, al ${corta(domPBSig())})` : '',
      sabV ? `el post-test de la clase en vivo de ayer (${sabV.vivo}), si ya está publicado (ciego, ≤${PT_SAB_MIN}′)` : ''].filter(Boolean);
    const fueraTxt = fuera.length ? ` Fuera de este bloque, de 05:00 a ${RUTINA_AM[0]} (antes de la rutina) o desde las ${c.fin}, sin pisar el SHIP (≈${libre}′ en total): ${fuera.join(' y ')}.` : '';
    GD[c.fecha] = guia(fr(c.ini, c.fin), `ENCAPS · DOMINGO a hora fija · CALENTAMIENTO ${cod} de la intensiva (NO opcional) · ${lab}`, pasos, [R99],
      `repaso, pre-test 10Q, deep prime, consolidación 30Q y eval 20Q de ${cod} hechos, con los fallos en el registro`, {
        aviso: `A hora fija y NO opcional: el CALENTAMIENTO ${cod} de la intensiva (el ${corta(x.fecha)} es la mañana ${mn}/${NM} de F1), entero (${fmtMin(min)} de estudio, sus minutos de la intensiva), con el almuerzo de ${a0} a ${a1}. Hoy no hay simulacro opcional.${fueraTxt} Nada de estudio después de las 17:00 (baile).`,
        planB: `Si el día se complica: el pre-test 10Q y la eval 20Q (la medición) no se saltan; se acorta antes el deep prime. Todo antes de las 17:00.`,
      });
    DOM[c.fecha] = { fecha: c.fecha, simulacro: null, ranking: false, modo: 'calentamiento', nombre: `ENCAPS · CALENTAMIENTO ${cod} ${c.ini}-${c.fin} (a hora fija, NO opcional): repaso · pre-test 10Q · deep prime · consolidación 30Q · eval 20Q`, hora: `${c.ini}–${c.fin}`, min,
      sub: `a hora fija · ${min}′ NO opcionales (almuerzo ${a0}-${a1}) · hoy sin simulacro`, etiqueta: `ENCAPS · domingo a hora fija (calentamiento ${cod}, ${min}′)`, tema: `CALENTAMIENTO ${cod} · ${lab}`, campus: null, fija: [c.ini, c.fin],
      notaFija: `Hoy ${c.ini}-${c.fin}, a hora fija y NO opcional: el CALENTAMIENTO ${cod} de la intensiva (el ${corta(x.fecha)} es la mañana ${mn}/${NM} de F1), entero, con el almuerzo de ${a0} a ${a1}; hoy no hay simulacro opcional.` };
    CAL_DOM[c.fecha] = { ...c, de: x.fecha, min };
  }
}
const SIM_F2 = [];
{
  const DOM_CAP = aMin('17:00') - aMin('05:00') - (aMin(RUTINA_AM[1]) - aMin(RUTINA_AM[0])) - (aMin(ALMUERZO_DOM[1]) - aMin(ALMUERZO_DOM[0])); // 600′
  const SIM_OPC_MIN = 240; // preparar 10 + simulacro 120 + pausa 15 + corrección 80 + registro 15 (el bloque opcional de siempre, sin recorte)
  const cola = J.domingos.filter((d) => d.simulacro_pendiente);
  for (const d of cola) if (!['sin_sesion', 'manana', 'previos'].includes(d.modo)) aborta(`domingo ${d.fecha}: simulacro_pendiente solo en un domingo que no puede llevar su simulacro opcional (sin sesión, de plan o a hora fija)`);
  for (let f = DOM_LIBRE_F2; cola.length && f < F6.encaps.examen; f = addDias(f, 7)) {
    if (J.domingos.some((x) => x.fecha === f) || PROT_SAB.has(f) || SKIP.has(f)) continue;
    const syn = synMinDom(f);
    if (DOM_CAP - syn - (CAL_DOM[f] ? CAL_DOM[f].min : 0) < SIM_OPC_MIN) continue;
    const d = cola.shift();
    // v6.11 fase 2 (remate): si ese domingo lleva un ENCAPS a hora fija (corrida_s1.extra[f].encaps: dom 24-ene 07:15-08:15, el D32), el ejemplo del simulacro
    //   opcional empieza 15′ después (08:30-12:30); antes, 08:00-12:00, que pisaba el bloque fijo
    const exE = (((F6.corrida_s1 || {}).extra || {})[f] || {}).encaps, exFin = exE && typeof exE === 'object' && exE.hora ? String(exE.hora).split('-')[1] : null;
    const fe = exFin && aMin(exFin) + 15 > aMin('08:00') ? [hhmm(aMin(exFin) + 15), hhmm(aMin(exFin) + 15 + SIM_OPC_MIN)] : null;
    SIM_F2.push({ fecha: f, simulacro: d.simulacro_pendiente, ranking: false, modo: 'simulacro', origen: d.fecha, origenModo: d.modo, ...(fe ? { franja_ejemplo: fe } : {}) });
  }
  if (cola.length) aborta(`simulacros opcionales sin domingo de F2 con hueco antes del examen: ${cola.map((d) => d.simulacro_pendiente).join(' · ')}`);
}
for (const d of [...J.domingos.filter((x) => !x.modo || x.modo === 'simulacro'), ...SIM_F2]) {
  if (!d.simulacro) aborta(`domingo ${d.fecha}: modo simulacro sin «simulacro»`);
  // v6.09 (fix revisión 16-nov, joseph 4): hora de EJEMPLO del ENCAPS opcional (franja_ejemplo; dom 29-nov, tras la recuperación fija y antes del
  //   compromiso personal) · por defecto 08:00-12:00 como siempre
  // v6.09 (fix 2, 16-nov noche): la recuperación del dom 29-nov pasa a 07:15-08:45 (tras la rutina) → su ejemplo, 08:45-12:15 = 3 h 30: un franja_ejemplo
  //   de 3 h 30-4 h RECORTA solo la corrección (80′ → 50′; lo que no se corrija, a la revisión del sábado) y el bloque dice su duración real
  // v6.09b (17-nov · a1-1): PRIMER PASO NO OPCIONAL que alarga el bloque (domingos[].previo: dom 3-ene, el Banqueo 9/19 grabado, 58′ a 1,25× con pausa,
  //   que ya no cabía en la mañana del jue 31-dic): el simulacro opcional va detrás, en lo que queda de la franja de ejemplo (y su corrección se recorta)
  const [ejI, ejF] = d.franja_ejemplo || ['08:00', '12:00'];
  const minEj = G.minutosFranja(fr(ejI, ejF));
  if (d.compromiso && aMin(d.compromiso) < aMin(ejF)) aborta(`domingo ${d.fecha}: el ejemplo del ENCAPS opcional (${ejF}) termina después del compromiso (${d.compromiso})`);
  if (aMin(ejI) < aMin('07:15') && aMin(ejF) > aMin('05:45')) aborta(`domingo ${d.fecha}: el ejemplo del ENCAPS opcional ${ejI}-${ejF} pisa la rutina de la mañana (05:45-07:15)`);
  // v6.09b: los primeros pasos NO opcionales ALARGAN el bloque; el simulacro (4 h) va en lo que queda de la franja de ejemplo y, si no cabe entero, se recorta
  //   SOLO la corrección (≤ 30′). La corrección dice cuántas preguntas corrige (0,85′ c/u) y adónde van las demás, con fecha.
  // v6.09b lote 1-bis: primeros pasos = antesDom (banqueo previo · PPT · lo que falta de las clases en diferido · tramo final de la clase del sábado · cifras
  //   que no cupieron a las 18:00); (hallazgo 9) el dom 3-ene corrige las 100 (franja_ejemplo hasta las 12:54: recorte 0)
  const L = antesDom(d), antesMin = L.reduce((a, x) => a + x.min, 0);
  const recorte = 240 + antesMin - minEj, corr = 80 - recorte;
  // v6.10z-b (lun 23-nov): recorte_max (por defecto 30′) = cuánto puede acortarse el simulacro opcional de un domingo con compromiso cuando sus primeros pasos NO
  //   opcionales crecen (dom 29-nov: +33′ de la mañana del lun 23 → 40′, todos de la corrección; lo que no se corrige va al domingo siguiente: CORR_PEND)
  //   v6.10z-d (lun 23-nov ≈09:45, la mañana del lun 23 fue solo teoría y post-tests): tope 55′ (la corrección del simulacro opcional, nunca menos de 25′ ≈ 29
  //   preguntas). Dom 29-nov: 25′ de corrección de las 30Q del sábado + 21′ de verificación + 10′ del PPT = 56′ de primeros pasos en la franja de ejemplo
  //   08:27-12:30 (243′) → 240 + 56 − 243 = 53′ de recorte; la corrección del simulacro queda en 27′ (31 preguntas; las 69 que no, al dom 6-dic: CORR_PEND, 53′)
  const recMax = d.recorte_max == null ? 30 : d.recorte_max;
  if (d.recorte_max != null && (!d.compromiso || !Number.isInteger(recMax) || recMax <= 30 || recMax > 55 || recorte <= 30)) aborta(`domingo ${d.fecha}: recorte_max ${d.recorte_max} solo con compromiso, entre 31 y 55′ y si el recorte (${recorte}′) pasa de 30′`);
  if (recorte < 0 || recorte > recMax) aborta(`domingo ${d.fecha}: franja_ejemplo ${ejI}-${ejF} (${minEj}′${antesMin ? `, ${antesMin}′ de primeros pasos no opcionales` : ''}) deja para el simulacro ${minEj - antesMin}′: debe estar entre ${fmtMin(240 - recMax)} y 4 h`);
  // la corrección cubre las 100 si su ratio cabe en la tolerancia (100 × 0,85′ ≤ corr × 1,15: ≥ 74′); si no, dice cuántas corrige y adónde van las demás
  const nCorr = 100 * CORR_Q <= corr * 1.15 ? 100 : Math.floor(corr / CORR_Q);
  if (corr < 80 - recMax) aborta(`domingo ${d.fecha}: la corrección del simulacro queda en ${corr}′ (< ${80 - recMax}′) con el recorte (${recorte}′)`);
  // v6.10x (remate): lo que no se corrige hoy tiene destino con minutos (CORR_PEND, calculado antes de los bucles de los domingos)
  const cp = CORR_PEND[d.fecha] || null;
  if (nCorr < 100 && (!cp || cp.n !== 100 - nCorr || cp.min !== 80 - corr)) aborta(`domingo ${d.fecha}: la corrección recortada (${100 - nCorr} preguntas, ${80 - corr}′) no coincide con su destino pre-calculado (CORR_PEND)`);
  const cortos = L.map((x) => x.corto).join(' + ');
  const pptAviso = L.length ? antesAviso(L) : null;
  const motRec = recorte ? (d.compromiso ? 'recortada: hay un compromiso' : L.length ? 'recortada: los primeros pasos van antes' : 'recortada') : '';
  // v6.10z-b: el recorte, con minutos (sub, aviso y paso de la corrección): «se acorta 40′ por el compromiso de las 12:30»
  const porQueRec = [L.length ? 'los primeros pasos van antes' : null, d.compromiso ? `a las ${d.compromiso} hay un compromiso` : null].filter(Boolean).join(' y ');
  // v6.09b lote 1-bis (hallazgo 3): si el plan B de una recuperación manda aquí lo que falta de su clase (dom 22 → vie 27-nov 18:00 → dom 29-nov), el plan B lo dice
  const pbAqui = PLANB_DOM.filter((x) => x.dom === d.fecha);
  for (const x of pbAqui) if (d.compromiso && aMin(ejF) + x.min > aMin(d.compromiso)) aborta(`domingo ${d.fecha}: con el plan B (${x.clase}, +${x.min}′) el ejemplo pasaría del compromiso de las ${d.compromiso}`);
  DOM[d.fecha] = { fecha: d.fecha, simulacro: d.simulacro, ranking: !!d.ranking, modo: 'simulacro',
    nombre: L.length ? `ENCAPS · domingo ${fmtMin(minEj)} (flexible): ${cortos} (NO opcional) + simulacro 100Q opcional${d.ranking ? ' · RANKING Theomed' : ''}`
      : `ENCAPS · opcional ${fmtMin(minEj)} (flexible): simulacro 100Q + corrección${d.ranking ? ' · RANKING Theomed' : ''}`,
    // v6.09b lote 1-quater FX1 (revisión V3): el título del día cuenta el ESTUDIO sin la pausa de 15′ del simulacro (como los domingos 6, 13 y 20-dic)
    hora: `flexible · ${fmtMin(minEj)} con 15′ de pausa (${fmtMin(minEj - 15)} de estudio)`, min: minEj,
    sub: `${L.length ? `flexible · primero ${antesMin}′ NO opcionales (${cortos}) · después, opcional: ` : 'opcional y flexible · '}2 h de simulacro + ${recorte ? `${corr}′ de corrección (en vez de 80′: se acorta ${recorte}′${d.compromiso ? ` por el compromiso de las ${d.compromiso}` : ''})` : `${fmtMin(minEj - antesMin - 120)} de corrección${motRec ? ` (${motRec})` : ''}`}${d.ranking ? ' · RANKING: primer intento dentro de 89 h desde el viernes 16:00' : ''}`,
    etiqueta: L.length ? `ENCAPS · domingo ${fmtMin(minEj)} (${antesMin}′ NO opcionales + simulacro 100Q opcional)` : `ENCAPS · domingo opcional ${fmtMin(minEj)} (simulacro 100Q)`,
    tema: d.simulacro, campus: /^Theomed/.test(d.simulacro) ? 'simulacros' : null,
    ...(L.length ? { ppt: L.map((x) => x.corto), pptAviso } : {}) };
  const theomed = /^Theomed/.test(d.simulacro);
  const num = (/DR LOPEZ simulacro (\d+)/.exec(d.simulacro) || [])[1];
  const ruta = theomed ? 'Campus › curso 105 (SIMULACROS MEDICINA 2027) › el simulacro indicado' : `${RUTA.drLopezSim} › ${num ? `${num}.° simulacro` : 'simulacro'} (versión SIN claves; la de claves, solo para corregir)`;
  // v6.09b lote 1-quater (R2 · N7, CI 3/8): lo que se adelanta a un domingo de plan si la clase del sábado se vio EN VIVO (el caso por defecto) NO es un paso de
  //   hoy: va al plan B, con sus minutos y la hora a la que termina entonces el ejemplo (antes: paso NO opcional con «si la viste, este paso no va»)
  for (const x of ADEL_PB[d.fecha] || []) if (d.compromiso && aMin(ejF) + x.resto > aMin(d.compromiso)) aborta(`domingo ${d.fecha}: con el plan B de la ${x.ad.por} (+${x.resto}′) el ejemplo pasaría del compromiso de las ${d.compromiso}`);
  const adTxtD = (ADEL_PB[d.fecha] || []).map((x) => `Si NO viste la ${x.ad.por} en vivo (${corta(x.ad.sab)}) y el ${corta(realDe(x.ad.en))} hiciste la clase entera: antes de nada, los ${x.resto}′ que faltan hasta el ${pct100(VIVO_FRAC)} de la ${x.clase} (tras sus ${x.min}′ del ${corta(x.de)}: su grabación a ${vel(VIVO_VEL)}, desde donde la dejaste); el bloque se alarga ${x.resto}′, de ejemplo hasta las ${hhmm(aMin(ejF) + x.resto)}.`).join(' ');
  const pbTxt = pbAqui.map((x) => `Si el dom ${Number(x.desde.slice(8))} fue con el plan B (la grabación de la ${x.clase} aún no estaba publicada): antes de nada, los ${x.min}′ de tramos útiles de la ${x.clase} que no cupieron el ${corta(x.de)} a las 18:00 (lo que falta hasta el ${pct100(VIVO_FRAC)}); el bloque se alarga ${x.min}′, de ejemplo hasta las ${hhmm(aMin(ejF) + x.min)}.`).join(' ');
  GD[d.fecha] = guia(fr(ejI, ejF), L.length ? `ENCAPS · DOMINGO (sin hora fija) · ${cortos} (NO opcional${condMinTxt(L).replace(/^ \((.*)\)$/, '; $1')}) + simulacro 100Q OPCIONAL + corrección` : `ENCAPS · OPCIONAL ${fmtMin(minEj)} (sin hora fija) · simulacro 100Q + corrección`, [
    ...L.flatMap((x) => x.pasos || [x.paso]),
    P(10, `Preparar: ${d.simulacro}`, `Ruta: ${ruta}. Sin reloj a la vista, móvil fuera, hoja de respuestas si puedes.`, theomed ? L105 : undefined),
    // v6.11 (remate, revisión 21.2 MEDIA): la cuarentena del 2026-II / reserva del 2026-I, al principio (por el día REAL), también en el plan B
    P(120, 'SIMULACRO 100Q · 2 h sin parar', `${reservaDe(realDe(d.fecha)) ? `${reservaDe(realDe(d.fecha))} ` : ''}Primero las básicas e intermedias; marca las dudosas y vuelve al final. Ninguna en blanco: no restan. 72 s por pregunta, con 10-15′ de reserva.`),
    P(15, 'Pausa', 'De pie, agua, sin pantalla.'),
    P(corr, nCorr < 100 ? `Corrección: las primeras ${nCorr} de las 100 (cada error y cada dudosa) → ${corr}′` : 'Corrección: cada error y cada dudosa', nCorr < 100
      // v6.10x (remate): el destino de las que no se corrigen, AL PRINCIPIO del «cómo» (el Calendar lo corta a 100 caracteres: check_rutina_guia 26h)
      ? `Las ${100 - nCorr} que no llegues a corregir → ${corta(cp.dest)}, primer paso de su ENCAPS (${cp.min}′). Hoy ${corr}′ (en vez de 80′${porQueRec ? `: ${porQueRec}` : ''}; ${String(CORR_Q).replace('.', ',')}′ por pregunta): primero las «seguras» falladas. ${cap(TIPOS_ERROR)} + verificación en la norma.`
      : `${cap(TIPOS_ERROR)} + verificación en la norma.`),
    P(15, 'Registro', `Nota (aciertos × 0,2), % por área y errores repetidos. Va a la revisión del ${revSab(d.fecha)}.`),
  ], recursosDe(L, ...(theomed ? [R105] : [])), `${L.length ? `los ${antesMin}′ no opcionales hechos${condMinTxt(L)} (${cortos}) · ` : ''}simulacro hecho en 2 h y corregido, con la nota en el registro (o descanso: es opcional)`, {
    // v6.10x: el simulacro pendiente de otro domingo (simulacro_pendiente → SIM_F2) dice de dónde viene
    //   (remate: sin el historial del traslado) · el primer domingo tras uno con calentamiento a hora fija recibe lo de los planes B de diciembre que allí no quepa
    aviso: `${d.origen ? `Simulacro opcional pendiente (era del ${corta(d.origen)}). ` : ''}${d.fecha === domPBSig() && CAL_DOM[DOM_LIBRE_F2] ? `Si de los planes B de diciembre quedó algo que no cupo el ${corta(DOM_LIBRE_F2)}, va primero (eso no es opcional). ` : ''}${[...pbAqui.map((x) => `Si el dom ${Number(x.desde.slice(8))} fue con el plan B: antes de todo, ${x.min}′ de la ${x.clase} (de ejemplo, hasta las ${hhmm(aMin(ejF) + x.min)}).`), ...(ADEL_PB[d.fecha] || []).map((x) => `Si no viste la ${x.ad.por} en vivo (${corta(x.ad.sab)}): antes de todo, ${x.resto}′ de la ${x.clase} (de ejemplo, hasta las ${hhmm(aMin(ejF) + x.resto)}).`)].map((t) => t + ' ').join('')}${L.length ? 'Flexible' : 'Opcional y flexible'}: a la hora que puedas (${ejI}-${ejF} es solo un ejemplo${REC[d.fecha] ? `: hoy va después de la recuperación FIJA de las ${REC[d.fecha].ini}-${REC[d.fecha].fin}` : ''}${d.compromiso ? ` y termina antes del compromiso personal de las ${d.compromiso}${recorte ? `: el simulacro se acorta ${recorte}′, en la corrección` : ''}` : ''}). ${L.length ? `Los primeros ${antesMin}′ NO son opcionales${condMinTxt(L)}: ${L.map((x) => x.desc).join(' · ')}; aunque descanses del simulacro, hazlos. ` : ''}Si vas atrasado, usa estas horas para lo pendiente de la semana.${d.ranking ? ' RANKING: cuenta el primer intento dentro de 89 h desde el viernes 16:00 → hoy, de un tirón.' : ''}`,
    planB: [pbTxt, adTxtD, theomed ? `Si ese simulacro no está: uno antiguo del campus que no hayas hecho, o uno de DR LOPEZ (${RUTA.drLopezSim}).${reservaDe(realDe(d.fecha)) ? ` ${reservaDe(realDe(d.fecha))}` : ''}` : `Si prefieres descansar${d.fecha < F6.encaps.intensiva_desde ? ' antes de la intensiva' : ''}, descansa: es opcional.`].filter(Boolean).join(' '),
  });
  for (const x of pbAqui) ANTES_USADOS.add(x);
}

// v6.09b (a1-6): CONTROL DEL THEOESENCIAL — por área, las páginas de las sesiones que van en VÍDEO (páginas del área ÷ sesiones × sesiones en vídeo;
//   las de texto primero ya lo leen en su ÷ 3) = las que lleva algún ítem «theoesencial» de las mañanas + las que _meta.theoesencial.fuera_f1 manda
//   con fecha a F2 (días de LOOP de la intensiva: encapsGuia.encapsF2De). Nada se queda sin fecha.
{
  const EGI = cargarModuloTS(path.join('src', 'lib', 'encapsGuia.ts'));
  const video = {}, puestas = {};
  // v6.09b lote 1-bis: + la teoría que no cupo en una mañana y va a un domingo (domingos[].antes: Theoesencial de CI → dom 6-dic, SP S4 → dom 6-dic)
  for (const t of [...J.mananas.flatMap((dia) => [...dia.teoria, ...(dia.a_las_18 || [])]), ...J.domingos.flatMap((d) => d.antes || [])]) {
    if (t.modo === 'theoesencial') puestas[t.area] = (puestas[t.area] || 0) + t.paginas;
    const s = /^(SP|CI|GES|INV|ET) S(\d)(?:-S?(\d))?\b/.exec(t.item);
    if (s && t.modo === 'video') video[s[1]] = (video[s[1]] || 0) + Number(s[3] || s[2]) - Number(s[2]) + 1;
  }
  for (const x of (J._meta.theoesencial && J._meta.theoesencial.fuera_f1) || []) {
    if (!AREA[x.area] || !(x.p > 0) || !x.destino || !Array.isArray(x.fechas) || !x.fechas.length) aborta(`_meta.theoesencial.fuera_f1 ${x.area}: área, p, destino y fechas obligatorios`);
    for (const f of x.fechas) { const r = EGI.encapsF2De(f); if (!r || !r.loop) aborta(`_meta.theoesencial.fuera_f1 ${x.area}: ${f} no es un día de LOOP de la intensiva (DEEP PRIME)`); }
    // v6.09b lote 1-quater FX1 (revisión V2): el destino de 2027 tiene fecha pero su fila aún no nombra el material (gen_encaps_intensivo_2027.js no se ejecuta en F1):
    //   se avisa en cada --check (PENDIENTE del lote de 2027) y el texto de F1 lo dice («PENDIENTE del lote de 2027: su guía aún no lo lleva»)
    const sinMat = x.fechas.filter((f) => !new RegExp(`'${f}'[^\\n]*Theoesencial`).test(SQL_INT()));
    if (sinMat.length) AVISOS.push(`PENDIENTE lote 2027 · Theoesencial ${x.area} ${x.de} (${x.p} p) → DEEP PRIME ${sinMat.join(', ')}: esas filas de _encaps_intensivo_2027.sql aún no nombran el Theoesencial (≈${Math.round(x.p / x.fechas.length)} p/sesión)`);
    puestas[x.area] = (puestas[x.area] || 0) + x.p;
  }
  for (const a of Object.keys(N_SES)) {
    const req = Math.round(THEO_P_AREA[a] * (video[a] || 0) / N_SES[a]);
    if ((puestas[a] || 0) !== req) aborta(`Theoesencial de ${a}: las sesiones en vídeo piden ${req} p (${THEO_P_AREA[a]} p × ${video[a] || 0}/${N_SES[a]}) y el JSON pone ${puestas[a] || 0} (mañanas + fuera_f1)`);
  }
}

// v6.09b lote 1-bis (hallazgos 2, 3 y 6): CONTROL DE DESTINOS — cada resto de clase en diferido, cada tramo 17:00-17:30 del sábado, cada cifra o norma que no
//   cupo a las 18:00 y cada plan B con fecha sale en la guía del domingo al que va (si no, el texto de origen prometería un paso que no existe)
for (const [nom, xs] of [['resto de clase en diferido', RESTOS], ['tramo 17:00-17:30 del sábado', SAB_TRAMO], ['18:00 que no cupo', Object.values(SUN_AUTO).flat()], ['plan B de la recuperación', PLANB_DOM]]) {
  for (const x of xs) if (!ANTES_USADOS.has(x)) aborta(`${nom} (${x.clase || x.corto || ''}, del ${x.de}) → ${x.dom || '?'}: ese domingo no lo lleva en su guía`);
}
// v6.09b lote 1-ter: cada adelanto «si la viste en vivo» sale en el paso del domingo del que sale (resto_en), y cada tramo del sábado que va a una mañana de plan
//   tiene su adelanto; ningún texto se queda con la hora de ejemplo sin poner
for (const a of ADELANTOS) if (!a.usado) aborta(`${a.en}: si_en_vivo adelanta ${a.min}′ de la ${a.clase} y ningún domingo con ENCAPS lleva ese resto (resto_en) para decir que ya no va`);
for (const t of SAB_EN_MANANA) if (!ADELANTOS.some((a) => a.en === t.dom && a.por === t.clase && a.sab === t.de)) aborta(`sábado ${t.de}: el tramo de la ${t.clase} va a la mañana del ${t.dom} y esa mañana no lo lleva (si_en_vivo)`);
if (/\{\{INI_PB\}\}/.test(JSON.stringify({ GD, GSV }))) aborta('queda «{{INI_PB}}» sin la hora del plan B del sábado en alguna guía del domingo');
// … y ningún texto de las guías ENCAPS de F1 manda nada «en un tiempo muerto» (sin fecha ni franja)
for (const [f, g] of [...Object.entries(GM).flatMap(([f, gs]) => gs.map((g) => [f, g])), ...Object.entries(GT), ...Object.entries(GD), ...Object.entries(GR), ...Object.entries(GSV).filter(([f]) => !esSabF2(f))]) {
  if (/tiempo muerto|tiempos muertos/.test(JSON.stringify(g))) aborta(`${f} «${g.titulo.slice(0, 60)}»: manda algo «en un tiempo muerto» (sin fecha ni franja)`);
}

// v6.10d (fix revisión 18-nov, hallazgo 3): destinos EN CADENA de los avisos libres del JSON (mananas[].extra): «→ <día> D-mes (…) + dom D-mes (…)» = una parte a
//   un día y lo que falta a un domingo → ese domingo va DESPUÉS del día REAL del primer destino (alias de corrida_s1: el vie 11-dic de plan se hace el lun 14) y su
//   guía (GD / GR) nombra la clase (la primera de la frase). Antes el aviso del mié 18-nov mandaba los 15′ de la INV 2/4 al dom 13-dic (ya van al dom 20, tras
//   los 30′ del vie 11 de plan) y el del lun 23-nov, los 9′ de la ET 2/3 al dom 29-nov (van al dom 6-dic): los destinos sueltos con «+» no se miraban.
{
  const MES_RX = MES.join('|');
  const isoDe = (dd, mm, ref) => { const m = MES.indexOf(mm) + 1; const y = Number(ref.slice(0, 4)) + (m < Number(ref.slice(5, 7)) - 2 ? 1 : 0); return `${y}-${String(m).padStart(2, '0')}-${String(dd).padStart(2, '0')}`; };
  const RXC = new RegExp(`→ (?:[A-Z]\\d+ )?(lun|mar|mié|jue|vie|sáb|dom) (\\d{1,2})-(${MES_RX})[^→·;]{0,90}?\\+ dom (\\d{1,2})-(${MES_RX})`, 'g');
  for (const m of J.mananas) {
    for (const fr0 of String(m.extra || '').split(/\.\s/)) {
      const clase = (fr0.match(/[A-Z]{2,3} \d+\/\d+/) || [])[0];
      for (const x of fr0.matchAll(RXC)) {
        const a = isoDe(x[2], x[3], m.fecha), dom = isoDe(x[4], x[5], m.fecha);
        if (dow(dom) !== 0) aborta(`mañana ${m.fecha} › extra: «${x[0]}»: el dom ${x[4]}-${x[5]} no es domingo`);
        if (dom <= realDe(a)) aborta(`mañana ${m.fecha} › extra: «${x[0]}»: el domingo (${dom}) no va después del día REAL del primer destino (${a} se hace el ${realDe(a)})`);
        const gDom = JSON.stringify([GD[dom] || null, GR[dom] || null]);
        if (clase && !gDom.includes(clase)) aborta(`mañana ${m.fecha} › extra: «${x[0]}»: la guía del domingo ${dom} no nombra la ${clase}`);
      }
    }
  }
}

// v6.11 · ronda c40 (ítem 36a, lun 23-nov, chat ENCAPS · PIZARRA FÍSICA = fuga): la pizarra del mes está a la vista TODO el día. El PRIMER bloque ENCAPS de
//   cada día real (F1 y la transición) con un runner ciego pendiente —ese día antes de que termine o en los 2 días reales siguientes— lleva «Pizarra tapada entera
//   hasta el <runner> del <fecha de plan> <hora>.» y el primer bloque ENCAPS después de un runner, sin otro pendiente, «Pizarra: ya puedes destaparla.»
//   (encaps_guia_catalogo.PIZARRA). Va al PRINCIPIO del aviso de la primera guía del bloque en la que no empuja ninguna fecha de destino más allá del carácter
//   230 (check 26j: el Calendar corta el aviso a 240); en la mañana, la del ARRANQUE o la de la TEORÍA (las dos van en el primer evento del Calendar, el de las
//   07:15). Si no cabe en ninguna: la de tapar ABORTA (es la que evita la fuga); la de destapar va al final del aviso (la app la enseña entera) y se avisa.
//   La hora de las 16:15 (encapsGuia.ts) la pone gen_encaps_guia.js con la misma regla: aquí se comprueba con todos los bloques reales del día.
// ronda c42 (ítem 39): en F1, sin ventana (PIZARRA.hasta: desde el mar 24-nov, cada día real hasta el último runner ciego de F1, y un solo «ya puedes
//   destaparla», tras ese último); la línea dice «hasta que termine el mini-sim 3/5 del <fecha de plan> (16:15-17:15)».
// ronda c44 (ítem 41): el último runner de F1 cuenta aunque solo esté programado (PIZARRA.conProgramados): hoy, el mini-sim 5/5 del vie 18-dic de plan.
{
  const FRV = require('./gen_fechas_v6');
  const EGI = cargarModuloTS(path.join('src', 'lib', 'encapsGuia.ts'));
  const realO = (f) => FRV.ordenRealDe(f, F6, 'encaps');
  const bloques = [];
  const mete = (key, f, gs, ini, real = realO(f)) => { gs = gs.filter(Boolean); if (gs.length && PIZARRA.cubre(real, F6)) bloques.push({ key, f, real, ini: ini || G.partesFranja(gs[0].franja).ini, gs }); };
  for (const [f, gs] of Object.entries(GM)) mete(`am ${f}`, f, gs.slice(0, 2)); // ARRANQUE + TEORÍA
  for (const [f, g] of Object.entries(GT)) mete(`18 ${f}`, f, [g]);
  for (const [f, g] of Object.entries(GSP)) mete(`sab ${f}`, f, [g]);
  for (const [f, g] of Object.entries(GSV)) mete(`vivo ${f}`, f, [g]);
  for (const [f, g] of Object.entries(GD)) mete(`dom ${f}`, f, [g]);
  for (const [f, g] of Object.entries(GR)) mete(`rec ${f}`, f, [g]);
  for (const [f, gs] of Object.entries(GR_SAB)) gs.forEach((g, i) => mete(`rec ${f} ${i}`, f, [g]));
  for (const f of EGI.GUIA_ENCAPS_FECHAS) { const r = realO(f), x = FRV.extraListaDe(r, F6).find((y) => y.frente === 'encaps' && y.plan === f); mete(`16 ${f}`, f, [EGI.guiaEncapsDe(f)], x ? x.ini : '16:15', r); }
  const L = PIZARRA.lineas(RUNNERS_PIZ, bloques, corta);
  // remate de la c42: el paso «Pizarra: HOY NO» de las 18:00 dice «Sigue tapada» si un bloque ENCAPS anterior del mismo día real lleva la línea (las 18:00 no
  //   son el primer bloque del día: la línea no va en ellas) y «Tápala … desde …» si las 18:00 son el primer bloque ENCAPS del día
  for (const h of HOY_NO) h.set(!L.has(`18 ${h.f}`));
  // ronda c44 (ítem 41): el aviso de la c42 por un «ya puedes destaparla» antes de un mini-sim de F1 programado sin runner ya no hace falta: RUNNERS_PIZ los
  //   cuenta (PIZARRA.conProgramados) y la pizarra sigue tapada hasta el último.
  //   Remate (revisión): en su lugar, un aviso fijo mientras quede alguno sin JSON. La regla va por fecha: la pizarra los da por hechos en su día real y su franja,
  //   exista o no el runner (el destape sale igual); si no se generan a tiempo (gen_encaps_minisim.js sale con código 1 si no llega a 25Q) y se hacen otro día,
  //   la pizarra se destaparía antes del test
  for (const y of PIZARRA.f1SinRunner(RUNNERS_CIEGOS, F6, FRV)) {
    const x = RUNNERS_PIZ.find((z) => z.plan === y.plan && z.tipo === 'mini_sim');
    AVISOS.push(`pizarra: el mini-sim ${y.parte} de F1 (fila del ${corta(y.plan)}, día real ${y.real}${x ? ` ${x.ini}-${x.fin}` : ''}) está solo programado (sin JSON en BANCO_PROPIO) y la pizarra lo da por hecho ese día: genéralo antes (gen_encaps_minisim.js ${y.plan}) y, si se hace otro día, re-fecha y regenera antes del destape`);
  }
  // ronda c40 (remate): la regla cubre F1, la transición y la semana 1 de la intensiva hasta el pre-test 2026-II (PIZARRA.cubre; las mañanas 19-21 del
  //   mar 5 al jue 7-ene tienen guía local). Un runner ciego más tarde (los mini-sims del carril sábado de F2) no tiene guía local donde avisar: se dice aquí
  // ronda c42 (ítem 39b): y ya no es solo un aviso. Su línea (con la ventana de 2 días) va en el SQL de la intensiva y de ahí, con el OK de Joseph, a la tabla
  //   que lee el reshift (study_schedule_reshift25_backup): mientras el SQL no la tenga, el generador sale con código 1 (PIZARRA.faltaSQL; al final, tras escribir)
  //   Remate: una sola línea por fila (la de la regla común) y el destape del pre-test 2026-II (después de él no hay guía local), que solo se avisa
  for (const r of PIZARRA.faltaSQL(RUNNERS_PIZ, F6, FRV, corta)) {
    const txt = `${/^\(/.test(r.x.f) ? r.x.f : `BANCO_PROPIO/${r.x.f}`} (${PIZARRA.nombre(r.x)} del ${corta(r.x.plan)}, día real ${r.x.real} ${r.x.ini}-${r.x.fin}) es un runner ciego de la intensiva y no tiene guía local`;
    const sinDest = `«${PIZARRA.DESTAPA}» en el primer bloque ENCAPS tras el runner (fila del ${r.sig ? corta(r.sig) : '—'})`;
    if (r.falta.length) PIZ_F2.push(`${txt}: en DATA/_scripts/_encaps_intensivo_2027.sql falta «${r.texto}» en el primer bloque ENCAPS de ${r.falta.map(corta).join(', ')} (del D-2 al D)${r.destapa ? '' : ` y ${sinDest}`}. Ponlas en el SQL y llévalas a study_schedule_reshift25_backup (Supabase, la tabla que lee el reshift) con el OK de Joseph: sin eso, la pizarra está a la vista antes del test.`);
    else AVISOS.push(`pizarra: ${txt}: en DATA/_scripts/_encaps_intensivo_2027.sql falta ${sinDest}; con el OK de Joseph, también en study_schedule_reshift25_backup`);
  }
  // remate de la c42: el primer día real con la pizarra tapada (el día ENCAPS anterior no la tapaba: mar 24-nov, mié 6-ene) la mañana empieza por taparla aunque
  //   la línea vaya en la guía de la TEORÍA (en la del ARRANQUE empujaría una fecha): una frase sin fecha al final del aviso del ARRANQUE (no mueve ninguna fecha)
  const diasConB = [...new Set(bloques.map((y) => y.real))].sort(), diasTapa = new Set(bloques.filter((y) => (L.get(y.key) || {}).tipo === 'tapa').map((y) => y.real));
  const primerDiaTapa = (real) => !diasTapa.has(diasConB.filter((d) => d < real).pop());
  const orden = [...bloques].sort((a, b) => (a.real < b.real ? -1 : a.real > b.real ? 1 : aMin(a.ini) - aMin(b.ini)));
  // fechas de destino del aviso más allá del carácter 230 que no estén ya en los 230 primeros (= check_rutina_guia 26j, con sus referencias y URLs)
  const FRX = /(?<![\p{L}\d])(?:(?:lun|mar|mié|jue|vie|sáb|dom)\.? )?(\d{1,2})-(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)(?:-(\d{4}))?(?![\p{L}\d])/gu;
  const REF = /\((?:pre-test ciego|ensayo general) del (?:lun|mar|mié|jue|vie|sáb|dom) \d{1,2}-\p{L}{3}\)|de ninguna carrera antes del (?:lun|mar|mié|jue|vie|sáb|dom) \d{1,2}-\p{L}{3}|la usa el GATE del CHECKPOINT del (?:lun|mar|mié|jue|vie|sáb|dom) \d{1,2}-\p{L}{3}/gu;
  const RX_URL = /(https?|file|obsidian|vscode):\/\/[^\s)»\]]+/g;
  const isoFRX = (m) => { const mes = MES.indexOf(m[2]) + 1, y = m[3] ? Number(m[3]) : mes >= 7 ? 2026 : 2027; return `${y}-${String(mes).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`; };
  const fuera = (aviso, f) => {
    const av = String(aviso || '').replace(REF, (m) => '·'.repeat(m.length)), ini = av.slice(0, 230);
    return [...av.replace(RX_URL, '').matchAll(FRX)].filter((m) => isoFRX(m) > f && m.index + m[0].length > 230 && !ini.includes(m[0])).map((m) => m[0]);
  };
  // ronda c44 (revisión): además, por OCURRENCIA. La exención de `fuera` (una fecha que ya sale en los 230 primeros caracteres cuenta como visible) dejaba
  //   pasar una línea que empuja fuera del corte el destino de OTRA cosa con la misma fecha: el jue 24-dic real, «GES 1/6 y GES 2/6 … → dom 3-ene» y el
  //   «CHECKPOINT DEL AÑO a las 16:15» salían del corte del ARRANQUE porque el «dom 3-ene» del banqueo seguía dentro (el vie 4-dic, el segundo «jue 17-dic»).
  //   Ahora se cuentan, fecha a fecha, sus apariciones futuras que acaban antes del carácter 230, en el aviso y en el aviso con la línea (las de la propia línea
  //   no cuentan): si alguna baja, esa guía no vale y se prueba la siguiente del bloque (la de la TEORÍA, sin aviso, como el 17 y el 18-dic). El check 26j no
  //   cambia: es un control estático y su exención (el resumen del principio) es a propósito.
  const RX_LIN = /Pizarra tapada entera hasta [^.]*\.|Pizarra: ya puedes destaparla\./;
  const visibles = (txt, f) => {
    const av = String(txt || '').replace(REF, (m) => '·'.repeat(m.length)).replace(RX_URL, ''), l = RX_LIN.exec(av), n = new Map();
    for (const m of av.matchAll(FRX)) if (isoFRX(m) > f && m.index + m[0].length <= 230 && !(l && m.index >= l.index && m.index < l.index + l[0].length)) n.set(m[0], (n.get(m[0]) || 0) + 1);
    return n;
  };
  const noPierde = (antes, despues, f) => { const d = visibles(despues, f); return [...visibles(antes, f)].every(([k, v]) => (d.get(k) || 0) >= v); };
  const con = (t, av) => `${t}${av ? ` ${av}` : ''}`;
  const cabe = (g, f, t) => { const antes = new Set(fuera(g.aviso, f)); return fuera(con(t, g.aviso), f).every((x) => antes.has(x)) && noPierde(g.aviso, con(t, g.aviso), f); };
  // ronda c42 (ítem 39): la hora de las 16:15 (encapsGuia.ts) no la mira el check 26j (solo mira las guías de encapsManana.ts): manda el Calendar, que corta el
  //   aviso tal como lo pinta la app ese día real (textos de corrida_s1 y fechas reales: corridaTexto), y lo futuro se mide desde el día REAL. Con el texto de
  //   plan, la línea del mié 25-nov (pre-test 2/2) «empujaba» el «I-10 (cola larga) entra en el mini-sim del …», que en el Calendar ya iba detrás del corte (la
  //   app pone antes el aviso del adelanto, cuyos 19 y 20-nov ese día ya pasaron).
  const CT = cargarModuloTS(path.join('src', 'lib', 'corridaTexto.ts'));
  const cal = (av, f) => CT.guiaConFechasReales(CT.reemplazosCorrida({ plan: 'encaps', franja: '', titulo: '', pasos: [], recursos: [], hecho: '', aviso: av }, f)).aviso || '';
  const cabeCal = (av, b, t) => { const a = cal(av, b.f), d = cal(con(t, av), b.f), antes = new Set(fuera(a, b.real)); return fuera(d, b.real).every((x) => antes.has(x)) && noPierde(a, d, b.real); }; // ronda c44: + noPierde
  const RX_LINEA = /^(Pizarra tapada entera hasta [^.]*\.|Pizarra: ya puedes destaparla\.)/;
  for (const b of bloques) {
    const l = L.get(b.key) || null;
    if (b.key.startsWith('16 ')) { // la hora de las 16:15: la pone gen_encaps_guia.js
      const m = RX_LINEA.exec(b.gs[0].aviso || ''), tiene = m ? m[1] : null;
      if (tiene !== (l ? l.texto : null)) aborta(`encapsGuia.ts ${b.f} (16:15, día real ${b.real}): la línea de la pizarra es «${tiene || '—'}» y la regla con todos los bloques del día pide «${l ? l.texto : '—'}» (regenera con gen_encaps_guia.js; si sigue, sus bloques del día no son los de aquí)`);
      // ronda c40 (remate): gen_encaps_guia.js la antepone sin mirar el corte del Calendar → aquí, el mismo control que en las mañanas (check 26j)
      // ronda c42: con el aviso como lo enseña el Calendar ese día real (cabeCal)
      if (tiene && !cabeCal(b.gs[0].aviso.slice(tiene.length).trim(), b, tiene)) {
        if (l.tipo === 'tapa') aborta(`encapsGuia.ts ${b.f} (16:15, día real ${b.real}): «${tiene}» al principio del aviso empuja una fecha de destino más allá del corte del Calendar (check 26j)`);
        AVISOS.push(`pizarra ${b.f} (16:15, día real ${b.real}): «${tiene}» empuja una fecha de destino más allá del corte del Calendar`);
      }
      continue;
    }
    if (!l) continue;
    const g = b.gs.find((y) => cabe(y, b.f, l.texto));
    if (g) {
      g.aviso = con(l.texto, g.aviso);
      if (l.tipo === 'tapa' && g !== b.gs[0] && primerDiaTapa(b.real)) b.gs[0].aviso = `${b.gs[0].aviso ? `${b.gs[0].aviso} ` : ''}Pizarra: tápala ya, antes de empezar (tiene temas de los tests ciegos); hasta cuándo, en el aviso de las ${G.partesFranja(g.franja).ini}.`;
    } else if (l.tipo === 'tapa') aborta(`${b.f} (día real ${b.real}, ${b.ini}): «${l.texto}» no cabe al principio del aviso de ninguna guía del primer bloque ENCAPS sin empujar una fecha de destino más allá del corte del Calendar (check 26j)`);
    else {
      // ronda c40 (remate): «ya puedes destaparla» no cabe al principio → el primer bloque ENCAPS SIGUIENTE (no las 16:15, que las pone gen_encaps_guia.js)
      //   donde quepa, mientras no haya otro runner pendiente (un bloque con su propia línea corta la búsqueda); si no hay ninguno, al final del aviso
      let dest = null;
      for (const y of orden.slice(orden.indexOf(b) + 1)) {
        if (L.has(y.key)) break;
        if (y.key.startsWith('16 ')) continue;
        const z = y.gs.find((w) => cabe(w, y.f, l.texto)); if (z) { dest = { y, z }; break; }
      }
      if (dest) { dest.z.aviso = con(l.texto, dest.z.aviso); continue; }
      b.gs[0].aviso = `${b.gs[0].aviso ? `${b.gs[0].aviso} ` : ''}${l.texto}`;
      AVISOS.push(`pizarra ${b.f} (día real ${b.real}, ${b.ini}): «${l.texto}» va al final del aviso (al principio empujaría una fecha de destino más allá del corte del Calendar): la app la enseña, el Calendar la corta`);
    }
  }
}

// ── validación de todas las guías ─────────────────────────────────────────────────────────────────────────────
const TODAS = [...Object.entries(GM).flatMap(([f, gs]) => gs.map((g) => [f, g])), ...Object.entries(GT), ...Object.entries(GA), ...Object.entries(GSP), ...Object.entries(GSV), ...Object.entries(GD), ...Object.entries(GR), ...Object.entries(GR_SAB).flatMap(([f, gs]) => gs.map((g) => [f, g]))]; // v6.10z-d: + los bloques fijos del sábado
const ERR = [];
for (const [f, g] of TODAS) {
  for (const e of G.validarGuia(g)) ERR.push(`${f} ${g.franja} «${g.titulo.slice(0, 50)}»: ${e}`);
  const urls = [...g.pasos.filter((p) => p.enlace).map((p) => p.enlace.url), ...g.recursos.map((r) => r.url)];
  for (const u of urls) if (!/^https:\/\/campus\.academiatheomed\.com\//.test(u)) ERR.push(`${f} ${g.franja}: enlace fuera del campus de Theomed (${u})`);
  if (/drive\.google|docs\.google/.test(JSON.stringify(g))) ERR.push(`${f} ${g.franja}: enlace de Google Drive`);
}
if (ERR.length) aborta(`${ERR.length} error(es) de forma:\n  ` + ERR.slice(0, 40).join('\n  '));

// ── emisión ───────────────────────────────────────────────────────────────────────────────────────────────────
const RESUMEN = {};
for (const dia of J.mananas) {
  const r = RES_T[dia.fecha] || null; // v6.10l: como el título de la TEORÍA (sin lo que va entero a las 18:00; el rango partido, por lo que queda)
  const t = dia.teoria.length ? dia.teoria.map((x, k) => [x, k]).filter(([, k]) => !(r && r.fueraK.has(k))).map(([x, k]) => (x.modo === 'preguntas' ? `${x.n}Q cronometradas` : r ? r.nombres[k] : x.item.replace(/\s*\(.*\)$/, ''))).join(' + ') + (r ? r.cola : '') : dia.banqueo.area.replace(/\s*\+ corrección$/, '');
  RESUMEN[dia.fecha] = `${t} · ${dia.fase === 'cierre' ? 'simulacro 100Q' : `banqueo ${dia.banqueo.n}Q ${dia.banqueo.area}`}`;
}
const M = Object.fromEntries(J.mananas.map((d) => [d.fecha, { fecha: d.fecha, n: d.n, de: NM, fase: d.fase, teoria: d.teoria, banqueo: d.banqueo, norma: d.norma, extra: d.extra, resumen: RESUMEN[d.fecha], pendiente18: (MD[d.fecha] && MD[d.fecha].tarde.map((u) => u.postTest || u.que)) || [], ...(EXTRA.has(d.fecha) ? { diaExtra: EXTRA.get(d.fecha) } : {}), ...(DOM_PLAN.has(d.fecha) ? { domingoPlan: DOM_PLAN.get(d.fecha) } : {}), ...(DOM_PLAN_H.has(d.fecha) ? { domingoPlanHoras: { manana: DOM_PLAN_H.get(d.fecha).manana, que: QUE_TRAMOS[d.fecha], tarde: DOM_PLAN_H.get(d.fecha).tarde, compromiso: DOM_PLAN_H.get(d.fecha).compromiso } } : {}) }]));
const META = {
  version: J._meta.version, decidido: J._meta.decidido, fechas: F6.version, fuente: J._meta.fuente, mananas: NM,
  // ronda c40 (remate): los runners ciegos con los que se generó (filtro de cifras, «HOY NO» y líneas de la pizarra): gen_encaps_guia.js avisa si cambian
  runnersCiegos: RUNNERS_CIEGOS.map((x) => x.f).sort(),
  primera: J.mananas[0].fecha, ultima: J.mananas[NM - 1].fecha, ultimaF1: J.mananas.filter((d) => !EXTRA.has(d.fecha)).at(-1).fecha, extra: [...EXTRA.keys()], domingosPlan: [...DOM_PLAN.keys()], protocolo: J._meta.protocolo_manana, campus: CAMPUS,
  reglas: `vídeo ÷ 1,75 (÷ 2 si la mañana dice «2×») × ${String(PAUSA).replace('.', ',')} (pausas) · texto primero = PPT ${PPT_MIN}′ + Theoesencial de la sesión a ${THEO_P}′/p + norma a ${PDF_P}′/p con lo que sobre (minutos de partida: vídeo ÷ ${VEL_TEXTO}; nunca < (PPT + Theoesencial) ÷ 1,15) · revisión normativa = vídeo ÷ ${VEL_TEXTO} + PDF a ${PDF_P}′/p · tramo 17:00-17:30 de una clase vista en vivo = ${TRAMO_MIN}′ (${pct100(VIVO_FRAC)} a ${vel(VIVO_VEL)}) · cifras de las 18:00 = 40 filas a 15 s · banqueo grabado activo ÷ ${String(VEL_ACTIVO).replace('.', ',')} × ${String(PAUSA).replace('.', ',')} · Theoesencial = páginas × ${THEO_P}′ · PPT de clase en vivo = ${PPT_MIN}′ · normas / hoja de reglas = su duración · clase en diferido = ${pct100(VIVO_FRAC)} de la clase a ${vel(VIVO_VEL)} (si la mañana no da, lo que falta en audio, explícito) · corrección = ${String(CORR_Q).replace('.', ',')}′ por pregunta · lo que no cabe en 07:30-09:15 → 18:00 del mismo día (v6.09b)`,
};
const tabla = new Map();
const walk = (v) => { if (typeof v === 'string') { if (v.length >= 30) tabla.set(v, (tabla.get(v) || 0) + 1); } else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
const GUIAS = { GM, GT, GA, GSP, GSV, GD, GR, GRS: GR_SAB }; // v6.09 (fix revisión, joseph 4): + GR (recuperación fija del domingo) · v6.10z-d: + GRS (los bloques fijos de un sábado, por hora)
walk(GUIAS);
const T = [...tabla].filter(([, n]) => n >= 2).map(([s]) => s);
const idx = new Map(T.map((s, i) => [s, i]));
const rep = (v) => (typeof v === 'string' ? (idx.has(v) ? { $: idx.get(v) } : v) : Array.isArray(v) ? v.map(rep) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rep(x)])) : v);

const ts = `/**
 * encapsManana.ts — ${J._meta.version} · MAÑANAS ENCAPS de F1 (lun · mié · vie 07:15-12:00, ${NM} mañanas: ${corta(META.primera)} → ${corta(META.ultima)}${DOM_PLAN.size ? `; domingo de plan: ${[...DOM_PLAN.keys()].map(corta).join(' · ')}` : ''}${EXTRA.size ? `; fuera de F1: ${[...EXTRA.keys()].map(corta).join(' · ')}` : ''}) + su hora de las 18:00
 * («cifras, normas y flashcards»; flexible el domingo de plan) + los repasos ENCAPS del Anki 05:00 (v6.09b: 05:20-05:45 lun · mié · vie y jue 31-dic, 05:30-05:45 mar · jue; antes 05:30-05:45, todos los días de plan de F1${HAB_TRANS.length ? ` y ${HAB_TRANS.map(corta).join(' · ')}` : ''}) + la clase EN VIVO de
 * Theomed del sábado (14:45 preparar · 15:00-17:00 en vivo; F1, transición y, desde la v6.08, los sábados de F2 9-ene → 6-mar) + el ENCAPS
 * OPCIONAL del domingo (4 h, flexible: la franja 08:00-12:00 de su guía es solo un ejemplo). Formato común «qué · cuánto · cómo» (GuiaBloque, src/lib/guia.ts). Lo pintan el Home (TodayMission, bloques encaps-am ·
 * encaps-pm · theomed-prep · theomed-vivo · encaps-dom de plantillasV6) y el bloque Anki de las 05:00.
 * GENERADO por DATA/_scripts/gen_encaps_manana.js desde DATA/ENCAPS/_encaps_manana_v607.json (+ duración exacta de cada sesión asíncrona:
 * DATA/ENCAPS/INVESTIGACION_2027-1/THEOMED_Y_DRIVE.md §1.3) — NO editar a mano: node DATA/_scripts/gen_encaps_manana.js (· --check compara).
 * Plan: DATA/ENCAPS/PLAN_PRIMER_PUESTO_2027-I.md §3-§7. Fechas: _fechas_v6.json ${F6.version} (las mañanas = días de F1 sin Step 1).
 * Reglas del «cuánto»: ${META.reglas}.
 * Enlaces SOLO al campus de Theomed (cursos 99, 105, 116); el material de academias del Drive se nombra por su ruta, sin enlace.
 */
import type { GuiaBloque } from './guia';

/** v6.09b: + Theoesencial (modo 'theoesencial': paginas, de, resto) · clase en diferido por debajo del 60 % (min) · alternativa (plan B con fecha)
 *  v6.09b lote 1-bis: + resto_en (domingo al que va lo que falta hasta el 60 % de una clase con «min») · modo 'preguntas' (n preguntas en bloque + su corrección; motivo)
 *  v6.09b lote 1-ter: + lectura (normas de la semana acotadas a páginas; dp + fecha = DEEP PRIME de la intensiva al que va lo no leído) · si_en_vivo (clase del sábado
 *  vista en vivo: su tramo 17:00-17:30 + los minutos de otra clase con resto que se adelantan)
 *  v6.09b lote 1-quater: + resto_a (adónde va, con fecha y franja, lo que no cabe de un Theoesencial: el «cómo» empieza por «Resto (…) → …») */
export interface EncapsTeoria { item: string; area: string; duracion: string; video?: string; modo: string; velocidad?: string; codigos?: string[]; paginas?: number; de?: string; resto?: string; resto_a?: string; min?: number; alternativa?: string; resto_en?: string; n?: number; motivo?: string; lectura?: { norma: string; corto: string; dp?: string; fecha?: string }[]; si_en_vivo?: { sab: string; adelanta: string; min: number } }
export interface EncapsMananaDia {
  fecha: string; n: number; de: number; fase: 'recuperacion' | 'ciclo' | 'cierre'; teoria: EncapsTeoria[];
  banqueo: { area: string; n: number; cronometrado?: boolean; /** v6.09b: otra franja del banqueo (mar 5-ene: 09:45-10:57, la de la fila D34 ya sembrada) */ franja?: [string, string] }; norma: string | null; extra: string | null;
  /** texto corto para el Home: teoría + banqueo */
  resumen: string;
  /** lo que no cupo en 07:30-09:15 y va a las 18:00 del mismo día (v6.08: + lo que va directo a las 18:00 de un día extra) */
  pendiente18: string[];
  /** v6.08: mañana fuera de F1 (v6.09: jue 31-dic, día de plan que recupera el lun 16 · mar 5-ene, en lugar del calentamiento I-3 de la intensiva): el motivo */
  diaExtra?: string;
  /** v6.09: mañana de un DOMINGO DE PLAN de F1 (dom 27-dic: ya no cabía entre semana): el motivo */
  domingoPlan?: string;
  /** v6.09 (fix revisión 16-nov): horas FIJAS del domingo de plan: TRAMOS de la mañana (las 7 franjas repartidas; fix 2: dom 27-dic 04:15-05:45 +
   *  07:15-10:30, sin tocar la rutina de 05:45-07:15) y qué lleva cada tramo · sus cifras, normas y flashcards al terminar (10:30-11:15) · hora del
   *  compromiso personal de ese día (para el margen) */
  domingoPlanHoras?: { manana: [string, string][]; que: string[]; tarde: [string, string]; compromiso: string | null };
}
/** v6.09 (fix revisión 16-nov): bloque ENCAPS FIJO de recuperación de un domingo tras el viaje: grabación de la clase perdida + PPT en diferido.
 *  v6.09 (17-nov): DOMINGO DE LLEGADA (dom 22-nov, sigue sin sesión en corrida_s1): «llegada» = hora a la que se vuelve (14:00); la recuperación va después (15:00-16:30). */
export interface EncapsRecupera { fecha: string; ini: string; fin: string; nombre: string; tema: string; clases: string[]; motivo: string; llegada?: string;
  /** v6.10z: lo que NO CUPO de una mañana (sáb 28-nov 07:15: el Theoesencial de INV p. 1-27 del lun 23) → la línea del Home (sin ella, la de la recuperación con
   *  PPT y grabación) y sin «mínimo» del modo ÁMBAR/ROJO (27′ de lectura sin versión reducida; el de encaps-rec habla de PPT) */
  sub?: string; sinMinimo?: boolean }
export interface TheomedSabado { fecha: string; vivo: string | null; area: string | null }
/** v6.07d: modo del domingo + lo que pinta la app (nombre, hora y minutos del bloque, sub, etiqueta del briefing, tema y botón del campus). */
export interface EncapsDomingo {
  fecha: string; simulacro: string | null; ranking: boolean;
  modo: 'simulacro' | 'banqueos' | 'simulacro_2h' | 'banqueos_correccion' | 'previos' | 'calentamiento';
  /** v6.10w: domingo a HORA FIJA (modo previos; dom 3-ene 12:30-14:09 · v6.10x: modo calentamiento, dom 10-ene 07:15-13:30) → [ini, fin]; sin él, bloque flexible */
  fija?: [string, string];
  /** v6.10x: nota del día para un domingo a hora fija (calentamiento de la intensiva); sin ella, la de los primeros pasos (ppt) */
  notaFija?: string;
  nombre: string; hora: string; min: number; sub: string; etiqueta: string; tema: string; campus: 'simulacros' | 'adicionales' | null;
  /** v6.09 (17-nov): PPT en diferido que van como PRIMER PASO (no opcional) de este ENCAPS del domingo (dom 29-nov: SP 2/11) y la frase para la nota del día ·
   *  v6.09b lote 1-bis: todos los PRIMEROS PASOS NO OPCIONALES (PPT, banqueo que no cupo, teoría que no cupo, lo que falta hasta el 60 % de una clase en
   *  diferido, el tramo 17:00-17:30 de la clase del sábado, cifras que no cupieron a las 18:00), con su nombre corto, y la frase para la nota del día */
  ppt?: string[]; pptAviso?: string;
}

export const ENCAPS_MANANA_META = ${JSON.stringify(META, null, 2)};

const M: Record<string, EncapsMananaDia> = ${JSON.stringify(M)};
const SAB: Record<string, TheomedSabado> = ${JSON.stringify(SAB)};
const DOM: Record<string, EncapsDomingo> = ${JSON.stringify(DOM)};
const REC: Record<string, EncapsRecupera> = ${JSON.stringify(REC)};
/** v6.10z-d: bloques ENCAPS fijos de un SÁBADO, varios el mismo día y por hora (sáb 28-nov: 05:30 · 08:10 · 14:30 las tres tandas de 10Q del banqueo + 07:15 el Theoesencial, que no cupieron en la mañana del lun 23) */
const REC_SAB: Record<string, EncapsRecupera[]> = ${JSON.stringify(REC_SAB)};

// Tabla de textos repetidos: un {"$": i} en RAW es T[i]. Se decodifica una vez al cargar.
const T: string[] = ${JSON.stringify(T)};
const RAW: unknown = ${JSON.stringify(rep(GUIAS))};
const dec = (v: unknown): unknown => {
  if (Array.isArray(v)) return v.map(dec);
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    const ks = Object.keys(o);
    if (ks.length === 1 && ks[0] === '$' && typeof o.$ === 'number') return T[o.$];
    return Object.fromEntries(ks.map((k) => [k, dec(o[k])]));
  }
  return v;
};
const GU = dec(RAW) as {
  GM: Record<string, GuiaBloque[]>; GT: Record<string, GuiaBloque>; GA: Record<string, GuiaBloque>;
  GSP: Record<string, GuiaBloque>; GSV: Record<string, GuiaBloque>; GD: Record<string, GuiaBloque>; GR: Record<string, GuiaBloque>; GRS: Record<string, GuiaBloque[]>;
};

const k = (iso: string): string => iso.slice(0, 10);
/** Mañana ENCAPS de F1 (lun · mié · vie) · v6.08: + los días extra fuera de F1 (jue 31-dic · mar 5-ene; diaExtra) · null si ese día la mañana es del Step 1 o no hay plan. */
export function encapsMananaDe(iso: string): EncapsMananaDia | null { return M[k(iso)] ?? null; }
/** Las 7 franjas de la mañana ENCAPS (07:15-12:00; el mié 30-dic, simulacro de cierre) · [] si no hay. */
export function guiaEncapsMananaDe(iso: string): GuiaBloque[] { return GU.GM[k(iso)] ?? []; }
/** v6.09 (fix 2, 16-nov): las franjas de la mañana ENCAPS que EMPIEZAN dentro de [ini, fin) — el domingo de plan en tramos (dom 27-dic) lleva un bloque
 *  del Home por tramo (encaps-am · encaps-am2) · sin ini o fin, todas. */
export function guiaEncapsMananaEnRango(iso: string, ini?: string | null, fin?: string | null): GuiaBloque[] {
  const gs = guiaEncapsMananaDe(iso);
  if (!ini || !fin) return gs;
  const m = (h: string): number => Number(h.slice(0, 2)) * 60 + Number(h.slice(3, 5));
  return gs.filter((g) => { const a = m(g.franja.slice(0, 5)); return a >= m(ini) && a < m(fin); });
}
/** 18:00-18:45 «ENCAPS · cifras, normas y flashcards» (con lo pendiente de la mañana si lo hay). */
export function guiaEncapsTardeDe(iso: string): GuiaBloque | null { return GU.GT[k(iso)] ?? null; }
/** Repasos ENCAPS tras el Anki USMLE, todos los días de plan de F1: v6.09b 05:20-05:45 (Cifras + Flashcards + APEX::ENCAPS) lun · mié · vie y jue 31-dic · 05:30-05:45 mar · jue. */
export function guiaEncapsAnkiDe(iso: string): GuiaBloque | null { return GU.GA[k(iso)] ?? null; }
/** Sábado de F1 + transición + F2 (v6.08: 9-ene → 6-mar, sin el 13-mar protegido): la clase EN VIVO de Theomed (vivo = null → ese sábado no hay clase) · null fuera de ese rango. */
export function theomedSabadoDe(iso: string): TheomedSabado | null { return SAB[k(iso)] ?? null; }
/** 14:45-15:00 · preparar la clase en vivo del sábado (en F2, plantillasV6 solo la pinta si el carril SÁBADO no ocupa esa franja). */
export function guiaTheomedPrepDe(iso: string): GuiaBloque | null { return GU.GSP[k(iso)] ?? null; }
/** 15:00-17:00 · THEOMED EN VIVO. */
export function guiaTheomedVivoDe(iso: string): GuiaBloque | null { return GU.GSV[k(iso)] ?? null; }
/** Domingo de F1 + transición: el simulacro del ENCAPS opcional (4 h, flexible) · v6.10x: + los domingos de F2 con un calentamiento de la intensiva a hora
 *  fija (dom 10-ene) o con un simulacro opcional que no tuvo sitio en su domingo (regla de simulacro_pendiente). */
export function encapsDomingoDe(iso: string): EncapsDomingo | null { return DOM[k(iso)] ?? null; }
/** Guía del ENCAPS opcional del domingo (sin hora fija: la franja 08:00-12:00 es solo un ejemplo). */
export function guiaEncapsDomingoDe(iso: string): GuiaBloque | null { return GU.GD[k(iso)] ?? null; }
/** v6.09 (fix revisión 16-nov): bloque ENCAPS FIJO de recuperación del domingo (v6.09, 17-nov: dom 22-nov 15:00-16:30, domingo de llegada —antes dom 29 07:15-08:45—: grabación de la ET 2/3 + PPT en diferido) · null si no hay.
 *  v6.10w: + la clase en diferido de un L-V (lun 4-ene 10:45) · v6.10z: + lo que no cupo de una mañana, en un sábado de F1 (sáb 28-nov 07:15).
 *  v6.10z-d: un sábado puede llevar VARIOS (sáb 28-nov 05:30 · 07:15 · 08:10 · 14:30): con la hora del bloque (ini), el de esa hora; sin ella, el primero del día. */
export function encapsRecuperaDe(iso: string, ini?: string | null): EncapsRecupera | null {
  const L = REC_SAB[k(iso)];
  if (L) return (ini ? L.find((r) => r.ini === ini) : L[0]) ?? null;
  return REC[k(iso)] ?? null;
}
/** v6.10z-d: todos los bloques ENCAPS fijos del día, por hora ([] si no hay; el domingo y el L-V, uno como mucho). */
export function encapsRecuperasDe(iso: string): EncapsRecupera[] { const r = REC[k(iso)]; return REC_SAB[k(iso)] ?? (r ? [r] : []); }
/** Guía de ese bloque (hora fija) · v6.10z-d: con la hora del bloque, la de esa franja. */
export function guiaEncapsRecuperaDe(iso: string, ini?: string | null): GuiaBloque | null {
  const L = GU.GRS[k(iso)];
  if (L) return (ini ? L.find((g) => g.franja.slice(0, 5) === ini) : L[0]) ?? null;
  return GU.GR[k(iso)] ?? null;
}
/** v6.10z-d: las guías de todos los bloques ENCAPS fijos del día, por hora. */
export function guiasEncapsRecuperaDe(iso: string): GuiaBloque[] { const g = GU.GR[k(iso)]; return GU.GRS[k(iso)] ?? (g ? [g] : []); }
export const ENCAPS_MANANA_FECHAS: string[] = Object.keys(M);

/** Mínimo de cada bloque ENCAPS nuevo según el modo del día (PROTOCOLO_MODO_MINIMO; null = intacto). La mañana ENCAPS es el bloque
 *  PRINCIPAL de lun · mié · vie: en ÁMBAR va entera; en ROJO conserva su mínimo y la teoría se recupera el domingo (ENCAPS opcional). */
export const ENCAPS_MINIMO: Record<string, { AMBAR: string | null; ROJO: string | null }> = {
  'encaps-am': { AMBAR: null, ROJO: 'Solo el arranque en frío (07:15) + 10Q ciegas del tema de hoy. El resto = dormir/recuperar; la teoría de hoy va al domingo (ENCAPS opcional).' },
  'encaps-pm': { AMBAR: "15': solo las flashcards (vencidas + 15 nuevas).", ROJO: 'Omitido hoy.' },
  'theomed-prep': { AMBAR: 'Omitido hoy: entra directo a la clase.', ROJO: 'Omitido hoy.' },
  'theomed-vivo': { AMBAR: null, ROJO: 'En vivo, omitida: la grabación cuando te recuperes (domingo o en audio).' },
  'encaps-rec': { AMBAR: null, ROJO: 'Solo los PPT en diferido (${REC_PPT_MIN.length && REC_PPT_MIN.every((x) => x === REC_PPT_MIN[0]) ? REC_PPT_MIN[0] + '′' : 'sus minutos'}); la grabación, ${(() => { const gs = Object.values(GRAB_PEND), g0 = gs[0]; /* v6.11 (pendiente 21.1): el sitio real de la grabación (GRAB_PEND), no siempre «en lugar del simulacro opcional» */ return g0 && gs.every((x) => x.conSim === g0.conSim && x.dest === g0.dest) ? (g0.conSim ? `el ${corta(g0.dest)}, en lugar del simulacro opcional` : `NO opcional, en los primeros pasos del ENCAPS del ${corta(g0.dest)}`) : 'en el ENCAPS del domingo siguiente (su plan B dice dónde)'; })()}.' },
  // v6.09 (fix 2): 2.º tramo de la mañana de un domingo de plan en tramos (dom 27-dic 07:15-10:30)
  'encaps-am2': { AMBAR: null, ROJO: 'Solo el post-test + 10Q ciegas del tema de hoy y sus tarjetas. El resto = dormir/recuperar.' },
};
`;

if (INFORME) {
  for (const g of [...(GA[INFORME] ? [GA[INFORME]] : []), ...(GM[INFORME] || []), ...(GT[INFORME] ? [GT[INFORME]] : []), ...(GSP[INFORME] ? [GSP[INFORME]] : []), ...(GSV[INFORME] ? [GSV[INFORME]] : []), ...(GR[INFORME] ? [GR[INFORME]] : []), ...(GR_SAB[INFORME] || []), ...(GD[INFORME] ? [GD[INFORME]] : [])]) {
    console.log(`\n${g.franja} (${g.totalMin}′) · ${g.titulo}${g.aviso ? `\n  ⚠ ${g.aviso}` : ''}`);
    for (const p of g.pasos) console.log(`  ${String(p.min).padStart(3)}′ ${p.que}\n        ${p.como}`);
  }
}
const resumen = `${NM} mañanas (${Object.values(GM).reduce((a, g) => a + g.length, 0)} franjas) · ${Object.keys(GT).length} tardes 18:00 (${Object.values(MD).filter((x) => x.tarde.length).length} con pendiente de la mañana) · ${Object.keys(GA).length} Anki 05:30 · ${Object.keys(GSV).length} sábados en vivo · ${Object.keys(GD).length} domingos · ${Object.keys(GR).length + Object.values(GR_SAB).reduce((a, gs) => a + gs.length, 0)} bloque(s) fijo(s) de recuperación (domingo · L-V en diferido · sábado: lo que no cupo)`; // v6.10z: ya no solo de domingo
if (AVISOS.length) console.warn(`⚠ ${AVISOS.length} aviso(s):\n  ` + AVISOS.join('\n  '));
// ronda c42 (ítem 39b): código 1 si falta la pizarra de un runner de F2 en el SQL; antes de la comparación de --check (que sale con process.exit si el .ts está
//   desfasado), para que el mensaje se vea siempre
if (PIZ_F2.length) { console.error(`✗ pizarra de F2 sin cubrir (${PIZ_F2.length}):\n  ` + PIZ_F2.join('\n  ')); process.exitCode = 1; }
if (CHECK) {
  const actual = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') : '';
  if (actual !== ts) { console.error(`✗ src/lib/encapsManana.ts no coincide con lo que genera gen_encaps_manana.js (${resumen}) — regenera: node DATA/_scripts/gen_encaps_manana.js`); process.exit(1); }
  console.log(`✓ gen_encaps_manana --check: src/lib/encapsManana.ts al día · ${resumen} · validarGuia OK · enlaces solo del campus`);
} else {
  fs.writeFileSync(OUT, ts);
  console.log(`✓ escrito src/lib/encapsManana.ts · ${resumen}`);
}
