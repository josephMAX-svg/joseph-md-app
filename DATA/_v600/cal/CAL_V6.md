> Copia versionada en `DATA/_v600/cal/CAL_V6.md`. Los respaldos JSON (`cal_bk/`, 93 ficheros) están en `DATA/_v600/cal/cal_bk/` **solo en disco** (en `.gitignore`: el repo es público y contienen datos personales del Calendar). Las §1-§6 describen el Lote 5A; la §7 (ronda 2) manda donde difieran; §3 ya incluye los ids de la ronda 2.

# CAL_V6 — Lote 5A · Google Calendar v6.00 (josephsototocas@gmail.com · America/Lima)

Ejecutado el mar 6-oct-2026 (≈21:10-21:50 Lima) por el agente del Lote 5A, según `V6_ESPEC.md` §G1, §G2, §G3 (incl. Research 🔬) y §G6. **No** se ejecutaron §G4 (F3) ni §G5 (F4), salvo la serie de todo el día «📋 Revisión semanal 20'» de F4 que pide §G2.

Protocolo cumplido: `get_event` + respaldo JSON en `v600/cal_bk/<id>.json` antes de cada cambio o borrado (62 ficheros) · `notificationLevel: NONE` en todo create/update/delete · recurrencias cambiadas = **crear la serie nueva → `get_event` → borrar la vieja** (convivencia de segundos) · DTSTART, hora, colorId, recordatorios y disponibilidad conservados · UNTIL `…T045959Z` · EXDATE `EXDATE;TZID=America/Lima:AAAAMMDDTHHMMSS` solo para SKIP_V6 ∪ protegidos de su BYDAY/rango · antes de cada borrado de serie, `list_events` de TODO el rango DTSTART → UNTIL (no solo hoy → UNTIL) comparado con las fechas esperadas de la RRULE: **0 instancias modificadas en todas las series**; la única serie con cancelaciones previas era Research↔Derma (10, 11, 12, 15, 16 y 17-jun-2026), conservadas como EXDATE.

Nada de las rutinas personales (EKER, CORRER, CALISTENIA, DUCHA, DESAYUNO, ALMUERZO, LECTURA, DORMIR, GYM, BAILE, BAILE PRÁCTICA, ALISTARSE, VIAJE, VIAJE VUELTA) ni eventos ajenos (IBKR, YOUTUBE) se tocó. Ningún `git commit/push`. Única escritura en el repo: `DATA/RESEARCH/_calendar_overlays.json` (estado de `gen_research_calendar.js --set`; copia previa en `cal_bk/_calendar_overlays.before_set.json`).

## 1. Resumen por tipo (95 operaciones)

| Tipo | Nº | Qué |
|---|---|---|
| RECREAR (create + get_event + delete) | 14 | 6 series USMLE F1 · vibecoding · SYNAPSE · LIVIANO · AURUM F1 · Research↔Derma · MIR 15:15 · MIR 15:30 · REVISIÓN SEMANAL |
| DELETE (serie) | 9 | 6 extensiones USMLE D81-D93 · 3 series del loop intensivo v5.20 (sustituidas por las F2) |
| DELETE-INST (instancia suelta) | 6 | viernes F2 de la franja ENCAPS 16:15 (8, 15, 22, 29-ene · 5, 12-feb) |
| CREATE | 33 | 5 series F2 + AURUM 30' F2-F3 + revisión semanal F4 · 7 SIM · 2 🛡 · 2 gates · 2 colchón · checkpoint ENCAPS · UWSA3 · GO/NO-GO · 7 ventanas · ritual · viaje · regreso |
| UPDATE (fecha/hora/título/descr.) | 25 | 4 NBME F1 · 6 eventos ENCAPS F2 · 10 hitos Step 1 2027 · 5 overlays 🔬 |
| UPDATE-DESCR (solo descripción) | 7 | ENCAPS 16:15 (2 series) · UWSA1 · SYNAPSE PC sáb/dom · ANKI sáb/dom (G6) |
| SCRIPT | 1 | `gen_research_calendar.js --set` (5 hitos) → `--check` = 0 |

## 2. Tabla de operaciones (id viejo → id nuevo · rango · respaldo)

| # | Tipo | Id viejo | Id nuevo | Título | Rango / RRULE / EXDATE / cambio | Respaldo |
|---|---|---|---|---|---|---|
| 1 | UPDATE | 4hjv5lkvluj06ahc2qndtsi6as | = | NBME 25 | mar 20-oct 07:15-11:00 -> 07:00-12:30 + descr v6 | cal_bk/4hjv5lkvluj06ahc2qndtsi6as.json |
| 2 | UPDATE | lr7ktrbiffj4hrlke7lh7cv6h4 | = | NBME 26 | mar 10-nov 07:15-11:00 -> 07:00-12:30 + descr v6 | cal_bk/lr7ktrbiffj4hrlke7lh7cv6h4.json |
| 3 | UPDATE | sm4baa2v453ifaub325h9v08mg | = | NBME 27 | mar 1-dic 07:15-11:00 -> 07:00-12:30 + descr v6 | cal_bk/sm4baa2v453ifaub325h9v08mg.json |
| 4 | UPDATE | ecu784689p8osrhqabuct8d5jg | = | NBME 28 | mar 22-dic 07:15-11:00 -> 07:00-12:30 + descr v6 (checkpoint de fecha) | cal_bk/ecu784689p8osrhqabuct8d5jg.json |
| 5 | RECREAR | i8afj7uppkb3ntj8h9890dhecc | 9274q14djfvggeajhor64oshj8 | USMLE ANKI AM 05:00-05:45 | DTSTART 2026-08-31 · RRULE WEEKLY MO-FR UNTIL=20261231T045959Z · EXDATE 20261225T050000 · color 2 · descr v6 (0 canceladas/modificadas en la vieja) | cal_bk/i8afj7uppkb3ntj8h9890dhecc.json |
| 6 | RECREAR | 54lchqggik96dmljmmg3l88s54 | 76dnlc30p3hnccenpvub2d9acg | USMLE Repaso 07:15-08:15 | idem · EXDATE 20261225T071500 · color 11 | cal_bk/54lchqggik96dmljmmg3l88s54.json |
| 7 | RECREAR | 3tbecd5n03ut6lno3hjvc1sr7k | c24k2n7k8qlhfimrrncf8rapgk | USMLE PRE-TEST 08:15-09:00 | idem · EXDATE 20261225T081500 · sin color | cal_bk/3tbecd5n03ut6lno3hjvc1sr7k.json |
| 8 | RECREAR | cb2uh20jnvu7pgfev4183pgctc | iuhj8busrh63ms7v4j5q8e9920 | USMLE DEEP PRIME 09:00-11:00 | idem · EXDATE 20261225T090000 · color 2 | cal_bk/cb2uh20jnvu7pgfev4183pgctc.json |
| 9 | RECREAR | 2eqmmrnh00jr44plevurgcu2as | q72kvc9pm1brlqvl6383ccr9vs | USMLE 30Q 11:00-12:00 | idem · EXDATE 20261225T110000 · color 5 | cal_bk/2eqmmrnh00jr44plevurgcu2as.json |
| 10 | RECREAR | utk2laeob9u0847bbe9rm491v4 | c5e77csne1bnfps1iq7nqel84s | USMLE EVAL 18:00-18:45 | idem · EXDATE 20261225T180000 · color 11 | cal_bk/utk2laeob9u0847bbe9rm491v4.json |
| 11 | UPDATE-DESCR | papebi46etlo8glgfs5akd5mig | = | ENCAPS 16:15 (F1 mant + F2 carril B, UNTIL vie 29-ene) | solo descripción v6 (recurrencia intacta: RRULE MO-FR UNTIL=20270130T045959Z) | cal_bk/papebi46etlo8glgfs5akd5mig.json |
| 12 | UPDATE-DESCR | d8252hjo5ra2qlqb9bccd6vkjo | = | ENCAPS 16:15 carril B lun 1 → mar 16-feb | solo descripción v6 (RRULE MO-FR UNTIL=20270217T045959Z intacta) | cal_bk/d8252hjo5ra2qlqb9bccd6vkjo.json |
| 13 | DELETE-INST | papebi46etlo8glgfs5akd5mig_20270108T211500Z | - | ENCAPS 16:15 vie 8-ene | instancia suelta (viernes F2 = libre) | cal_bk/papebi46etlo8glgfs5akd5mig_20270108T211500Z.json |
| 14 | DELETE-INST | papebi46etlo8glgfs5akd5mig_20270115T211500Z | - | ENCAPS 16:15 vie 15-ene | idem | cal_bk/papebi46etlo8glgfs5akd5mig_20270115T211500Z.json |
| 15 | DELETE-INST | papebi46etlo8glgfs5akd5mig_20270122T211500Z | - | ENCAPS 16:15 vie 22-ene | idem | cal_bk/papebi46etlo8glgfs5akd5mig_20270122T211500Z.json |
| 16 | DELETE-INST | papebi46etlo8glgfs5akd5mig_20270129T211500Z | - | ENCAPS 16:15 vie 29-ene | idem | cal_bk/papebi46etlo8glgfs5akd5mig_20270129T211500Z.json |
| 17 | DELETE-INST | d8252hjo5ra2qlqb9bccd6vkjo_20270205T211500Z | - | ENCAPS 16:15 vie 5-feb | idem | cal_bk/d8252hjo5ra2qlqb9bccd6vkjo_20270205T211500Z.json |
| 18 | DELETE-INST | d8252hjo5ra2qlqb9bccd6vkjo_20270212T211500Z | - | ENCAPS 16:15 vie 12-feb | idem | cal_bk/d8252hjo5ra2qlqb9bccd6vkjo_20270212T211500Z.json |
| 19 | CREATE | - | sfgp85kjua01v159rh1qrilr18 | 🚦 GATE F1 · núcleo ≥ 85 % (D18) | todo el día vie 30-oct-2026 · color 6 · FREE | - |
| 20 | CREATE | - | vvi7lk2c0c9nih1fqbi19p681s | 🚦 GATE F1 · núcleo ≥ 85 % (D38) | todo el día vie 27-nov-2026 · color 6 · FREE | - |
| 21 | CREATE | - | ti163p5s6t4odtqmhvkl3mamac | 🇵🇪 ENCAPS · CHECKPOINT DEL AÑO (mini-sim 53) | todo el día vie 18-dic-2026 | - |
| 22 | CREATE | - | oi557k66kql15oa6ptkjdipvis | 🧯 C1 · COLCHÓN F1 (D59) | todo el día mar 29-dic-2026 | - |
| 23 | CREATE | - | ag335n3dhvui11593us2lm448s | 🧯 C2 · COLCHÓN F1 (D60) | todo el día mié 30-dic-2026 | - |
| 24 | UPDATE-DESCR | o1gla7846uae4tgngvc4q45osg | = | 🎯 UWSA1 (mié 7-oct 09:00-13:00) | SOLO descripción v6 (fecha/hora/título intactos: 09:00-13:00) | cal_bk/o1gla7846uae4tgngvc4q45osg.json |
| 25 | DELETE | qhtokf24r3pojno1c3a8ojggls | - | EXTENSIÓN USMLE ANKI AM D81-D93 (lun 1 → mié 17-feb) | serie borrada (contenido en el tramo 2) | cal_bk/qhtokf24r3pojno1c3a8ojggls.json |
| 26 | DELETE | u08hjmtk5uh48vitg77ulf69ho | - | EXTENSIÓN USMLE repaso 07:15 D81-D93 | idem | cal_bk/u08hjmtk5uh48vitg77ulf69ho.json |
| 27 | DELETE | rmcsbarba82vm8h9nron281tac | - | EXTENSIÓN USMLE pre-test 08:15 D81-D93 | idem | cal_bk/rmcsbarba82vm8h9nron281tac.json |
| 28 | DELETE | rfnkceao6uai75qp9f5tq52duk | - | EXTENSIÓN USMLE deep prime 09:00 D81-D93 | idem | cal_bk/rfnkceao6uai75qp9f5tq52duk.json |
| 29 | DELETE | b98p0181f362am46j1kttf7ics | - | EXTENSIÓN USMLE 30Q 11:00 D81-D93 | idem | cal_bk/b98p0181f362am46j1kttf7ics.json |
| 30 | DELETE | anjhsglon4e0nadjvgmgpdekrg | - | EXTENSIÓN USMLE eval 18:00 D81-D93 | idem | cal_bk/anjhsglon4e0nadjvgmgpdekrg.json |
| 31 | CREATE | - | bod921vej8ehllto18h0ieiuig | F2 (1) ENCAPS Anki cifras + USMLE Anki mant. 05:00-05:45 | DTSTART lun 4-ene-2027 · RRULE WEEKLY MO-FR UNTIL=20270313T045959Z · sin EXDATE (vie 12-mar sí lleva Anki: medio día) · color 1 · FREE | - |
| 32 | CREATE | - | qqjhn7hnkugffrnvm5s9a0q46k | F2 (2) ENCAPS LOOP 07:15-12:00 | DTSTART lun 4-ene · RRULE WEEKLY MO,TU,WE,TH UNTIL=20270311T045959Z (último mié 10-mar) · color 1 · FREE | - |
| 33 | CREATE | - | uvpo4pgrtiqp3d9p07ail1fni8 | F2 (3) ENCAPS EVAL 20Q 18:00-18:45 | DTSTART lun 4-ene · RRULE WEEKLY MO-FR UNTIL=20270311T045959Z · color 1 · FREE | - |
| 34 | CREATE | - | qcsv3oe0e7rh2vkfq301ne68ko | F2 (4) ENCAPS carril B · reposición 16:15-17:15 | DTSTART mié 17-feb · RRULE WEEKLY MO,TU,WE,TH UNTIL=20270311T045959Z · color 1 | - |
| 35 | CREATE | - | 2fvbkunh0nfhvhbn1b6iqvpifs | F2 (5) STEP 1 VIVO sáb 07:45-09:15 | DTSTART sáb 9-ene · RRULE WEEKLY SA UNTIL=20270307T045959Z (último sáb 6-mar) · color 2 | - |
| 36 | DELETE | ie79j1cvek17u6e6f8h2tckfbo | (→ bod921vej8ehllto18h0ieiuig) | v5.20 ENCAPS INTENSIVA Anki cifras 05:00 (lun-jue 23-feb → 4-mar) | borrada tras crear y comprobar F2 (1) | cal_bk/ie79j1cvek17u6e6f8h2tckfbo.json |
| 37 | DELETE | i4o9s8fhkln9lhlcteh19mtsc4 | (→ qqjhn7hnkugffrnvm5s9a0q46k) | v5.20 ENCAPS INTENSIVA LOOP 07:15-12:15 | borrada tras crear y comprobar F2 (2) | cal_bk/i4o9s8fhkln9lhlcteh19mtsc4.json |
| 38 | DELETE | do51osapt575a926ne07mlbfac | (→ uvpo4pgrtiqp3d9p07ail1fni8) | v5.20 ENCAPS INTENSIVA tarde 17:15-18:45 | borrada tras crear y comprobar F2 (3) | cal_bk/do51osapt575a926ne07mlbfac.json |
| 39 | UPDATE | 4mfnu95lrhr3dmu87einr3jm5k | = | banner FASE INTENSIVA F2 | todo el día 23-feb→9-mar ⇒ lun 4-ene → vie 12-mar-2027 (end excl. 13-mar) + título/descr v6 PROVISIONAL | cal_bk/4mfnu95lrhr3dmu87einr3jm5k.json |
| 40 | UPDATE | 27bs58ee0ke180ht2rh6mgvft0 | = | PRE-TEST 2026-II | vie 26-feb 08:00-10:00 ⇒ vie 8-ene-2027 07:15-09:15 + v6 | cal_bk/27bs58ee0ke180ht2rh6mgvft0.json |
| 41 | UPDATE | g6t22lagnagt2sbrbo0n9d3u8k | = | SIM #1 2025-II | vie 5-mar 08:00-10:00 ⇒ vie 15-ene-2027 07:15-09:15 + v6 | cal_bk/g6t22lagnagt2sbrbo0n9d3u8k.json |
| 42 | UPDATE | ip4lhi4lhigad4l1titbd36jnk | = | D-2 DRESS REHEARSAL | lun 8-mar 08:00-10:00 ⇒ jue 11-mar-2027 11:00-13:00 PROVISIONAL | cal_bk/ip4lhi4lhigad4l1titbd36jnk.json |
| 43 | UPDATE | tl0irrsb4av0vd8d1ar8vmbuoo | = | D-1 MEDIO DÍA | mar 9-mar 09:00-10:00 ⇒ vie 12-mar-2027 09:00-10:00 PROVISIONAL | cal_bk/tl0irrsb4av0vd8d1ar8vmbuoo.json |
| 44 | UPDATE | 8juk0mvl66tutdkbcei7umrs68 | = | EXAMEN ENCAPS / SERUMS 2027-I | mié 10-mar 08:00-12:00 ⇒ dom 14-mar-2027 11:00-13:00 PROVISIONAL | cal_bk/8juk0mvl66tutdkbcei7umrs68.json |
| 45 | CREATE | - | tuqhgd12ibsc595kbemaqiu6k8 | SIM #2 | vie 22-ene-2027 07:15-09:15 | - |
| 46 | CREATE | - | uvogu0gd7kufpshe2o3fffopf8 | SIM #3 | vie 29-ene-2027 07:15-09:15 | - |
| 47 | CREATE | - | 6shb9jps4nir60khcd6h4g0jh8 | SIM #4 (2024-II oficial) | vie 5-feb-2027 07:15-09:15 | - |
| 48 | CREATE | - | hl6ajs7etaqd6aici3s2vvema8 | SIM #5 | vie 12-feb-2027 07:15-09:15 | - |
| 49 | CREATE | - | 7afho3rf6igkk1odse31sqps4c | SIM #6 | vie 19-feb-2027 07:15-09:15 | - |
| 50 | CREATE | - | i3jhsk8hj6mj95aij99r6329mc | SIM #7 (2025-I oficial, ancla tardía) | vie 26-feb-2027 11:00-13:00 | - |
| 51 | CREATE | - | 2l4c2ct9iv6dkqvpcf6chtjnu0 | SIM #8 | vie 5-mar-2027 11:00-13:00 | - |
| 52 | CREATE | - | 3vrptnmtl9vppvs6nvv25s7p3c | 🛡 DÍA PROTEGIDO · D-1 hábil ENCAPS | todo el día vie 12-mar-2027 · PROVISIONAL | - |
| 53 | CREATE | - | qi3vsdal1gps5jkuovmdcmvklk | 🛡 DÍA PROTEGIDO · lunes libre post-ENCAPS | todo el día lun 15-mar-2027 · PROVISIONAL | - |
| 54 | RECREAR | udr09j9ng983o0d4nipkfe4494 | easavkn12k189aorun9pou2nd0 | VIBECODING 04:15-05:00 | DTSTART 2026-08-31 · RRULE MO-FR UNTIL=20270220T045959Z (vie 19-feb) · EXDATE 20261225/20261231/20270101 T041500 · color 9 (vieja: abierta sin UNTIL; 0 canceladas/modificadas) | cal_bk/udr09j9ng983o0d4nipkfe4494.json |
| 55 | RECREAR | j99thg3eaqesosmvppj4rfgvh4 | f1imvu9cnmhrcsi5ag6m3k8jdk | SYNAPSE 12:30-13:00 | DTSTART 2026-06-11 · RRULE MO-FR UNTIL=20270216T045959Z (lun 15-feb) · EXDATE 20261225/20261231/20270101 T123000 · color 9 (vieja: abierta; 0 canceladas/modificadas 11-jun → 16-feb) | cal_bk/j99thg3eaqesosmvppj4rfgvh4.json |
| 56 | RECREAR | 8epae6hlfmrc9j0h2kib7iuc84 | skolg4n4far2p20md3vat06b8c | LIVIANO 17:15-18:00 | DTSTART 2026-08-31 · RRULE MO-FR UNTIL=20270213T045959Z (vie 12-feb) · EXDATE 20261225/20261231/20270101 T171500 · color 7 (vieja abierta; 0 canceladas/modificadas) | cal_bk/8epae6hlfmrc9j0h2kib7iuc84.json |
| 57 | RECREAR | at1nak8f24nbnj1mh2jcd4aggg | 23t06e7foitmiqm24lpd0vo9jc | AURUM F1 14:15-15:15 | DTSTART 2026-04-06 · RRULE MO-FR UNTIL=20261231T045959Z (mié 30-dic) · EXDATE 20261225T141500 · color 5 · popup 5' (vieja abierta; 0 canceladas/modificadas 6-abr → 31-dic) | cal_bk/at1nak8f24nbnj1mh2jcd4aggg.json |
| 58 | CREATE | - | ogb2qi4c57ee2fc2ojjsk9rmcg | AURUM 30' núcleo F2-F3 14:15-14:45 | DTSTART lun 4-ene-2027 · RRULE MO-FR UNTIL=20270416T045959Z (jue 15-abr) · EXDATE 20270312/20270315/20270325/20270326 T141500 · color 5 · popup 5' | - |
| 59 | RECREAR | 3ofg2ljv8kl3p1adm2e5d5nih3 | 6us7kkdcuk3g7tm1cjes38leh0 | RESEARCH ↔ DERMA 13:30-14:15 | DTSTART 2026-05-06 · RRULE MO-FR UNTIL=20270501T045959Z (vie 30-abr, PROVISIONAL) · EXDATE 13:30 de 2026-06-10/11/12/15/16/17 (cancelaciones previas conservadas) + 20261225/20261231/20270101/20270312/20270315/20270325/20270326 · color 1 | cal_bk/3ofg2ljv8kl3p1adm2e5d5nih3.json |
| 60 | RECREAR | 2ldp6obaapnvo76li28uprrddg | uiduvkfsgs43p1u1qk1vohih58 | MIR Eval anclada 15:15-15:30 | DTSTART 2026-04-02 · RRULE MO-FR UNTIL=20270501T045959Z · EXDATE 15:15 de 20261225/20261231/20270101/20270312/20270315/20270325/20270326 · color 1 (0 canceladas/modificadas) | cal_bk/2ldp6obaapnvo76li28uprrddg.json |
| 61 | RECREAR | 00k364heibh1n6f9hfspcv9dpi | hos0tfhsr2hdfs6cgv1rmejhrs | MIR Deep Work Mini 15:30-16:15 | DTSTART 2026-04-02 · RRULE MO-FR UNTIL=20270501T045959Z · EXDATE 15:30 de los mismos 7 días · color 1 (0 canceladas/modificadas) | cal_bk/00k364heibh1n6f9hfspcv9dpi.json |
| 62 | RECREAR | 6iog066kra2e07ue1d0f2osuvs | k8iaefnjq0mnrlvkilhcarrik8 | 📋 REVISIÓN SEMANAL sáb 07:15-07:45 | DTSTART sáb 10-oct-2026 · RRULE WEEKLY SA UNTIL=20270502T045959Z (sáb 1-may) · EXDATE 20270313T071500 (sáb 13-mar = protegido D-1 ENCAPS) · antes 07:15-07:35 hasta sáb 20-feb (0 canceladas/modificadas) | cal_bk/6iog066kra2e07ue1d0f2osuvs.json |
| 63 | CREATE | - | 69tr6hqitr5fnanc2af5kvugnk | 📋 Revisión semanal 20' F4 (todo el día, PROVISIONAL) | todo el día sáb 8-may → sáb 18-sep-2027 · RRULE WEEKLY SA UNTIL=20270918 (20 sábados) · FREE | - |
| 64 | UPDATE | ae93qv0nqqs36h439hid1jcq8o | = | NBME 29 | vie 8-ene-2027 07:15-11:00 ⇒ mié 17-mar-2027 07:00-12:30 · PROVISIONAL | cal_bk/ae93qv0nqqs36h439hid1jcq8o.json |
| 65 | UPDATE | mael3p9uhp036jbep45ql6v9oc | = | NBME 30 | mar 19-ene 07:15-11:00 ⇒ lun 24-may-2027 07:00-12:15 (ventana 24-29 may) · PROVISIONAL | cal_bk/mael3p9uhp036jbep45ql6v9oc.json |
| 66 | UPDATE | l771lvcfv0jcebt61do6svia18 | = | NBME 31 | mar 2-feb 07:15-11:00 ⇒ mié 28-jul-2027 07:00-12:15 (ventana 26-31 jul) · PROVISIONAL | cal_bk/l771lvcfv0jcebt61do6svia18.json |
| 67 | UPDATE | h65e772pqsa4hgc5b6bh9n8h50 | = | NBME 32 | mié 3-feb 07:15-11:00 ⇒ vie 6-ago-2027 07:00-12:15 (ventana 2-7 ago) · PROVISIONAL | cal_bk/h65e772pqsa4hgc5b6bh9n8h50.json |
| 68 | UPDATE | 2u7viv0elr6aedo0m9undfa5kg | = | UWSA2 | mar 26-ene 09:00-13:00 ⇒ mar 10-ago-2027 07:00-11:15 (ventana 9-14 ago) · PROVISIONAL | cal_bk/2u7viv0elr6aedo0m9undfa5kg.json |
| 69 | UPDATE | la5rsbuiqj1o35lb5adf93abuo | = | NBME 33 + 3 bloques (ensayo 7 bloques) | vie 5-feb 07:15-11:00 ⇒ lun 30-ago-2027 07:00-16:30 (ventana 30-ago → 4-sep) · PROVISIONAL | cal_bk/la5rsbuiqj1o35lb5adf93abuo.json |
| 70 | UPDATE | lh9jfjsmoif74ci6jcn8f1mq30 | = | FREE 120 | mar 9-feb 07:15-11:00 ⇒ lun 13-sep-2027 07:00-10:15 (ventana 13-18 sep) · PROVISIONAL | cal_bk/lh9jfjsmoif74ci6jcn8f1mq30.json |
| 71 | UPDATE | neboplchsaua4snj39nrl480nc | = | D94 última sesión de banco | jue 18-feb 07:15-12:00 ⇒ jue 23-sep-2027 04:05-06:05 · PROVISIONAL | cal_bk/neboplchsaua4snj39nrl480nc.json |
| 72 | UPDATE | n90bdqhohadu1eqbctv148dn28 | = | D95 sesión mínima | vie 19-feb 05:00-12:00 ⇒ vie 24-sep-2027 04:05-05:05 · PROVISIONAL | cal_bk/n90bdqhohadu1eqbctv148dn28.json |
| 73 | UPDATE | oinh139dsnbuma9r3kfu56dhkc | = | EXAMEN USMLE STEP 1 | lun 22-feb 07:00-16:00 ⇒ lun 27-sep-2027 07:00-16:00 · PROVISIONAL | cal_bk/oinh139dsnbuma9r3kfu56dhkc.json |
| 74 | CREATE | - | p0pstc1topo0sc87bieudrvrbg | 🎯 UWSA3 (opcional) | mar 29-jun-2027 07:00-11:15 · PROVISIONAL | - |
| 75 | CREATE | - | 3i88pp1gj84vc0r6tuherhsc0o | 🚦 GO/NO-GO Step 1 (E-49) | todo el día lun 9-ago-2027 · PROVISIONAL | - |
| 76 | CREATE | - | 3bdlibt00dp3lbkcd2l19cstfk | 🪟 Ventana NBME 30 | todo el día lun 24 → sáb 29-may-2027 | - |
| 77 | CREATE | - | meprb68otcauq9s07ldlibscu8 | 🪟 Ventana UWSA3 | todo el día lun 28-jun → sáb 3-jul-2027 | - |
| 78 | CREATE | - | alb6i6bnjtgqm5ibv6muo5imcg | 🪟 Ventana NBME 31 | todo el día lun 26 → sáb 31-jul-2027 | - |
| 79 | CREATE | - | fepdb3cmgc0puj7tksm96ufhs4 | 🪟 Ventana NBME 32 | todo el día lun 2 → sáb 7-ago-2027 | - |
| 80 | CREATE | - | tda895k00safeu1silkq53t1ps | 🪟 Ventana UWSA2 | todo el día lun 9 → sáb 14-ago-2027 | - |
| 81 | CREATE | - | mpfd71n65pnf3su7ig712hcc1o | 🪟 Ventana NBME 33 + 3 bloques | todo el día lun 30-ago → sáb 4-sep-2027 | - |
| 82 | CREATE | - | oupbht84p59h0oss75aehm9s4k | 🪟 Ventana Free 120 | todo el día lun 13 → sáb 18-sep-2027 | - |
| 83 | CREATE | - | e3dqhtc4nr3lttiu39jgdtkues | 🛡 RITUAL DE TEST-DAY | todo el día sáb 25-sep-2027 · PROVISIONAL | - |
| 84 | CREATE | - | 3ph93qla4c15sk8vjt3ibl0nm8 | 🚌 VIAJE A LIMA (D-1) | todo el día dom 26-sep-2027 · PROVISIONAL | - |
| 85 | CREATE | - | c0g48p72o4441tgcecmlg8s8lo | 🚌 REGRESO de Lima | todo el día mar 28-sep-2027 · PROVISIONAL | - |
| 86 | UPDATE | 9hhe6q10da1ltbpk23h171gf9c | = | 🔬 X-1 revisor2 | misma fecha mié 23-dic 13:30-14:15 · descripción = payload v6 de gen_research_calendar.js | cal_bk/9hhe6q10da1ltbpk23h171gf9c.json |
| 87 | UPDATE | f2mn20ok30kl5k2t1s6tci7n7c | = | 🔬 CR-8 cr-paquete | misma fecha vie 8-ene 13:30-14:15 · descripción v6 | cal_bk/f2mn20ok30kl5k2t1s6tci7n7c.json |
| 88 | UPDATE | t136recadd6vnv0iebrmmqiv48 | = | 🔬 CR-9 case-report-1 | misma fecha jue 11-feb 13:30-14:15 · descripción v6 | cal_bk/t136recadd6vnv0iebrmmqiv48.json |
| 89 | UPDATE | nibrfidt3qhct59qhtrvqpqqi0 | = | 🔬 X-9 equipo | lun 15-mar-2027 13:30-14:15 ⇒ jue 11-mar-2027 13:30-14:15 + descr v6 | cal_bk/nibrfidt3qhct59qhtrvqpqqi0.json |
| 90 | UPDATE | 94mmg6li8egq2kh9401nti1pkg | = | 🔬 R43 SR-1 SUBMIT | jue 29-jul-2027 13:30-14:15 ⇒ sáb 17-jul-2027 TODO EL DÍA + descr v6 (F4) | cal_bk/94mmg6li8egq2kh9401nti1pkg.json |
| 91 | SCRIPT | DATA/RESEARCH/_calendar_overlays.json | - | gen_research_calendar.js --set (5 hitos) → --check | exit 0 · 12/12 «nada» · fichero de estado del repo modificado (permitido); copia previa en cal_bk/_calendar_overlays.before_set.json | - |
| 92 | UPDATE-DESCR | hv2lk04orquvivthtkfhilb1ps | = | 🧠 SYNAPSE — PC sábado (G6) | solo descripción v6 (recurrencia intacta: WEEKLY SA, abierta) | cal_bk/hv2lk04orquvivthtkfhilb1ps.json |
| 93 | UPDATE-DESCR | s7r8tiu66286t156l0odpv5nvo | = | 🧠 SYNAPSE — PC domingo (G6) | solo descripción v6 (WEEKLY SU, abierta) | cal_bk/s7r8tiu66286t156l0odpv5nvo.json |
| 94 | UPDATE-DESCR | 6ta0e3c019dep76spdgumfm0pl | = | ANKI sábado 19:00 (G6) | solo descripción v6 (WEEKLY SA, abierta) | cal_bk/6ta0e3c019dep76spdgumfm0pl.json |
| 95 | UPDATE-DESCR | 619c1672eej1qgmvddbfkb5fu9 | = | ANKI domingo 17:00 (G6) | solo descripción v6 (WEEKLY SU, abierta) | cal_bk/619c1672eej1qgmvddbfkb5fu9.json |

## 3. IDs vigentes v6.00 (para el traspaso)

### Series recurrentes
| Serie | Id vigente | Franja | Rango · RRULE · EXDATE |
|---|---|---|---|
| USMLE ANKI AM | `9274q14djfvggeajhor64oshj8` | 05:00-05:45 | DTSTART lun 31-ago-2026 · MO-FR · UNTIL 20261231T045959Z (último mié 30-dic) · EXDATE 25-dic |
| USMLE Repaso multi-temporal | `76dnlc30p3hnccenpvub2d9acg` | 07:15-08:15 | ídem |
| USMLE PRE-TEST | `c24k2n7k8qlhfimrrncf8rapgk` | 08:15-09:00 | ídem |
| USMLE DEEP PRIME | `iuhj8busrh63ms7v4j5q8e9920` | 09:00-11:00 | ídem |
| USMLE 30Q consolidación | `q72kvc9pm1brlqvl6383ccr9vs` | 11:00-12:00 | ídem |
| USMLE EVAL 18:00 | `c5e77csne1bnfps1iq7nqel84s` | 18:00-18:45 | ídem |
| ENCAPS 16:15 F1 mant + F2 carril B (no se recrea, §G1) | `papebi46etlo8glgfs5akd5mig` | 16:15-17:15 | DTSTART 31-ago · MO-FR · UNTIL 20270130T045959Z · instancias 8/15/22/29-ene borradas |
| ENCAPS 16:15 carril B 1 → 16-feb (no se recrea) | `d8252hjo5ra2qlqb9bccd6vkjo` | 16:15-17:15 | DTSTART lun 1-feb · MO-FR · UNTIL 20270217T045959Z · instancias 5 y 12-feb borradas |
| F2 (1) ENCAPS Anki cifras + USMLE Anki | `bod921vej8ehllto18h0ieiuig` | 05:00-05:45 | lun 4-ene → vie 12-mar · MO-FR · UNTIL 20270313T045959Z |
| F2 (2) ENCAPS LOOP | `qqjhn7hnkugffrnvm5s9a0q46k` | 07:15-12:00 | lun 4-ene → mié 10-mar · MO-TH · UNTIL 20270311T045959Z |
| F2 (3) ENCAPS EVAL 20Q | `uvpo4pgrtiqp3d9p07ail1fni8` | 18:00-18:45 | lun 4-ene → mié 10-mar · MO-FR · UNTIL 20270311T045959Z |
| F2 (4) ENCAPS carril B · reposición | `qcsv3oe0e7rh2vkfq301ne68ko` | 16:15-17:15 | mié 17-feb → mié 10-mar · MO-TH · UNTIL 20270311T045959Z |
| F2 (5) STEP 1 VIVO | `2fvbkunh0nfhvhbn1b6iqvpifs` | sáb 07:45-09:15 | sáb 9-ene → sáb 6-mar · SA · UNTIL 20270307T045959Z |
| VIBECODING | `easavkn12k189aorun9pou2nd0` | 04:15-05:00 | DTSTART 31-ago-2026 · MO-FR · UNTIL 20270220T045959Z (vie 19-feb) · EXDATE 25-dic, 31-dic, 1-ene |
| SYNAPSE misión 30' | `f1imvu9cnmhrcsi5ag6m3k8jdk` | 12:30-13:00 | DTSTART 11-jun-2026 · MO-FR · UNTIL 20270216T045959Z (lun 15-feb) · EXDATE 25-dic, 31-dic, 1-ene |
| LIVIANO | `skolg4n4far2p20md3vat06b8c` | 17:15-18:00 | DTSTART 31-ago-2026 · MO-FR · UNTIL 20270213T045959Z (vie 12-feb) · EXDATE 25-dic, 31-dic, 1-ene |
| AURUM F1 (60') | `23t06e7foitmiqm24lpd0vo9jc` | 14:15-15:15 | DTSTART 6-abr-2026 · MO-FR · UNTIL 20261231T045959Z · EXDATE 25-dic · popup 5' |
| AURUM F2-F3 (30') | `ogb2qi4c57ee2fc2ojjsk9rmcg` | 14:15-14:45 | lun 4-ene → jue 15-abr · MO-FR · UNTIL 20270416T045959Z · EXDATE 12-mar, 15-mar, 25-mar, 26-mar · popup 5' |
| RESEARCH ↔ DERMA | `6us7kkdcuk3g7tm1cjes38leh0` | 13:30-14:15 | DTSTART 6-may-2026 · MO-FR · UNTIL 20270501T045959Z (vie 30-abr, PROVISIONAL) · EXDATE 10/11/12/15/16/17-jun-2026 (históricas) + 25-dic, 31-dic, 1-ene, 12-mar, 15-mar, 25-mar, 26-mar |
| MIR Eval anclada | `uiduvkfsgs43p1u1qk1vohih58` | 15:15-15:30 | DTSTART 2-abr-2026 · MO-FR · UNTIL 20270501T045959Z · EXDATE 25-dic, 31-dic, 1-ene, 12-mar, 15-mar, 25-mar, 26-mar |
| MIR Deep Work Mini | `hos0tfhsr2hdfs6cgv1rmejhrs` | 15:30-16:15 | ídem |
| 📋 REVISIÓN SEMANAL | `k8iaefnjq0mnrlvkilhcarrik8` | sáb 07:15-07:45 | DTSTART sáb 10-oct-2026 · SA · UNTIL 20270502T045959Z (sáb 1-may) · EXDATE sáb 13-mar |
| 📋 Revisión semanal 20' F4 (todo el día) | `69tr6hqitr5fnanc2af5kvugnk` | todo el día | sáb 8-may → sáb 18-sep-2027 · SA · UNTIL 20270918 (20 sábados) · PROVISIONAL |
| SYNAPSE PC sábado (recreada en la ronda 2) | `goknd2mvbkpqastc6n3rrhon5g` | sáb 15:00-17:00 | DTSTART sáb 13-jun-2026 · SA · UNTIL 20270214T045959Z (último sáb 13-feb = d130) |
| SYNAPSE domingo (recreada en la ronda 2) | `frsvkuk585gmcte6bufo6dkfto` | dom 15:00-17:00 | DTSTART dom 28-jun-2026 · SU · UNTIL 20270215T045959Z (último dom 14-feb = d131) |
| ANKI sábado / domingo (recreadas en la ronda 2) | `00929or8op5hj28s3nbf1eo09c` / `0ar1fbrm3ts396kd96f8df753g` | sáb 19:00 / dom 17:00 | abiertas · EXDATE sáb 13-mar y 25-sep (19:00) / dom 14-mar y 26-sep (17:00) |

### Eventos sueltos
| Evento | Id | Fecha/hora v6 |
|---|---|---|
| 🎯 UWSA1 (sin cambio de hora) | `o1gla7846uae4tgngvc4q45osg` | mié 7-oct-2026 09:00-13:00 |
| 🎯 NBME 25 / 26 / 27 / 28 | `4hjv5lkvluj06ahc2qndtsi6as` / `lr7ktrbiffj4hrlke7lh7cv6h4` / `sm4baa2v453ifaub325h9v08mg` / `ecu784689p8osrhqabuct8d5jg` | mar 20-oct · mar 10-nov · mar 1-dic · mar 22-dic · 07:00-12:30 |
| 🚦 GATE F1 D18 / D38 | `sfgp85kjua01v159rh1qrilr18` / `vvi7lk2c0c9nih1fqbi19p681s` | vie 30-oct / vie 27-nov (todo el día) |
| 🇵🇪 Checkpoint del año (mini-sim 53) | `ti163p5s6t4odtqmhvkl3mamac` | vie 18-dic (todo el día) |
| 🧯 C1 / C2 colchón F1 | `oi557k66kql15oa6ptkjdipvis` / `ag335n3dhvui11593us2lm448s` | mar 29-dic / mié 30-dic (todo el día) |
| 🇵🇪 Banner intensiva F2 | `4mfnu95lrhr3dmu87einr3jm5k` | lun 4-ene → vie 12-mar-2027 (todo el día) |
| 🎯 PRE-TEST 2026-II | `27bs58ee0ke180ht2rh6mgvft0` | vie 8-ene 07:15-09:15 |
| 🎯 SIM #1 (2025-II) | `g6t22lagnagt2sbrbo0n9d3u8k` | vie 15-ene 07:15-09:15 |
| 🎯 SIM #2 … #6 | `tuqhgd12ibsc595kbemaqiu6k8` · `uvogu0gd7kufpshe2o3fffopf8` · `6shb9jps4nir60khcd6h4g0jh8` (2024-II) · `hl6ajs7etaqd6aici3s2vvema8` · `7afho3rf6igkk1odse31sqps4c` | vie 22-ene · 29-ene · 5-feb · 12-feb · 19-feb · 07:15-09:15 |
| 🎯 SIM #7 (2025-I) / #8 | `i3jhsk8hj6mj95aij99r6329mc` / `2l4c2ct9iv6dkqvpcf6chtjnu0` | vie 26-feb / vie 5-mar · 11:00-13:00 |
| 🎯 D-2 DRESS REHEARSAL | `ip4lhi4lhigad4l1titbd36jnk` | jue 11-mar 11:00-13:00 (PROVISIONAL) |
| 🛌 D-1 medio día | `tl0irrsb4av0vd8d1ar8vmbuoo` | vie 12-mar 09:00-10:00 (PROVISIONAL) |
| 🛡 DÍA PROTEGIDO D-1 hábil / lunes libre | `3vrptnmtl9vppvs6nvv25s7p3c` / `qi3vsdal1gps5jkuovmdcmvklk` | vie 12-mar / lun 15-mar (todo el día, PROVISIONAL) |
| 🏁 EXAMEN ENCAPS / SERUMS 2027-I | `8juk0mvl66tutdkbcei7umrs68` | dom 14-mar 11:00-13:00 (PROVISIONAL) |
| 🎯 NBME 29 | `ae93qv0nqqs36h439hid1jcq8o` | mié 17-mar 07:00-12:30 (PROVISIONAL) |
| 🎯 NBME 30 + 🪟 ventana | `mael3p9uhp036jbep45ql6v9oc` + `3bdlibt00dp3lbkcd2l19cstfk` | lun 24-may 07:00-12:15 · ventana 24-29 may |
| 🎯 UWSA3 (opc.) + 🪟 ventana | `p0pstc1topo0sc87bieudrvrbg` + `meprb68otcauq9s07ldlibscu8` | mar 29-jun 07:00-11:15 · ventana 28-jun → 3-jul |
| 🎯 NBME 31 + 🪟 ventana | `l771lvcfv0jcebt61do6svia18` + `alb6i6bnjtgqm5ibv6muo5imcg` | mié 28-jul 07:00-12:15 · ventana 26-31 jul |
| 🎯 NBME 32 + 🪟 ventana | `h65e772pqsa4hgc5b6bh9n8h50` + `fepdb3cmgc0puj7tksm96ufhs4` | vie 6-ago 07:00-12:15 · ventana 2-7 ago |
| 🚦 GO/NO-GO (E-49) | `3i88pp1gj84vc0r6tuherhsc0o` | lun 9-ago (todo el día) |
| 🎯 UWSA2 + 🪟 ventana | `2u7viv0elr6aedo0m9undfa5kg` + `tda895k00safeu1silkq53t1ps` | mar 10-ago 07:00-11:15 · ventana 9-14 ago |
| 🎯 NBME 33 + 3 bloques + 🪟 ventana | `la5rsbuiqj1o35lb5adf93abuo` + `mpfd71n65pnf3su7ig712hcc1o` | lun 30-ago 07:00-16:30 · ventana 30-ago → 4-sep |
| 🎯 FREE 120 + 🪟 ventana | `lh9jfjsmoif74ci6jcn8f1mq30` + `oupbht84p59h0oss75aehm9s4k` | lun 13-sep 07:00-10:15 · ventana 13-18 sep |
| 🏁 D94 / 🛌 D95 | `neboplchsaua4snj39nrl480nc` / `n90bdqhohadu1eqbctv148dn28` | jue 23-sep 04:05-06:05 / vie 24-sep 04:05-05:05 |
| 🛡 Ritual / 🚌 Viaje a Lima / 🚌 Regreso | `e3dqhtc4nr3lttiu39jgdtkues` / `3ph93qla4c15sk8vjt3ibl0nm8` / `c0g48p72o4441tgcecmlg8s8lo` | sáb 25-sep / dom 26-sep / mar 28-sep (todo el día) |
| 🎯 EXAMEN USMLE STEP 1 | `oinh139dsnbuma9r3kfu56dhkc` | lun 27-sep-2027 07:00-16:00 (PROVISIONAL) |
| 🔬 Overlays Research (12) | M1 `shkul14j3o1bs1a5044u8ge1kk` · C-2 `iduh7fhst9uhl0t54hhk535ff4` · T-1 `95aglmlk9qi32m4bv6v28rv5b0` · C-6 `k2oov1tk0jalt5f45ekemej4k0` · CR-1 `36tp7b995jnoi844d5uvgm58t0` · T-8 `ahl0tbimefcq8u7ps2qasjb708` · X-1 `9hhe6q10da1ltbpk23h171gf9c` · CR-8 `f2mn20ok30kl5k2t1s6tci7n7c` · CR-9 `t136recadd6vnv0iebrmmqiv48` · X-9 `nibrfidt3qhct59qhtrvqpqqi0` · R10 `2k9idr3f3th6hj1e4r8ugj4iqk` · R43 `94mmg6li8egq2kh9401nti1pkg` | X-9 jue 11-mar 13:30-14:15 · R43 sáb 17-jul-2027 todo el día · resto sin cambio de fecha |

### Ids que YA NO EXISTEN (borrados hoy; respaldo en `cal_bk/`)
USMLE F1 viejas `i8afj7uppkb3ntj8h9890dhecc` · `54lchqggik96dmljmmg3l88s54` · `3tbecd5n03ut6lno3hjvc1sr7k` · `cb2uh20jnvu7pgfev4183pgctc` · `2eqmmrnh00jr44plevurgcu2as` · `utk2laeob9u0847bbe9rm491v4` · extensiones D81-D93 `qhtokf24r3pojno1c3a8ojggls` · `u08hjmtk5uh48vitg77ulf69ho` · `rmcsbarba82vm8h9nron281tac` · `rfnkceao6uai75qp9f5tq52duk` · `b98p0181f362am46j1kttf7ics` · `anjhsglon4e0nadjvgmgpdekrg` · loop intensivo v5.20 `ie79j1cvek17u6e6f8h2tckfbo` · `i4o9s8fhkln9lhlcteh19mtsc4` · `do51osapt575a926ne07mlbfac` · secundarias viejas `udr09j9ng983o0d4nipkfe4494` · `j99thg3eaqesosmvppj4rfgvh4` · `8epae6hlfmrc9j0h2kib7iuc84` · `at1nak8f24nbnj1mh2jcd4aggg` · `3ofg2ljv8kl3p1adm2e5d5nih3` · `2ldp6obaapnvo76li28uprrddg` · `00k364heibh1n6f9hfspcv9dpi` · revisión v5.20 `6iog066kra2e07ue1d0f2osuvs`. · ronda 2: SYNAPSE PC sáb `hv2lk04orquvivthtkfhilb1ps` · SYNAPSE dom `s7r8tiu66286t156l0odpv5nvo` · ANKI sáb `6ta0e3c019dep76spdgumfm0pl` · ANKI dom `619c1672eej1qgmvddbfkb5fu9` · instancias ENCAPS 16:15 `papebi46…_20261225T211500Z`, `_20261231T211500Z`, `_20270101T211500Z`.

## 4. Research 🔬 — `gen_research_calendar.js`
- `--check` inicial: exit 1 · 5 desfasados (X-1, CR-8, CR-9 por texto; X-9 creado para 15-mar; R43 creado para 29-jul).
- `--print` → payloads v6 → `update_event` de los 5 (X-1/CR-8/CR-9 misma fecha, descripción v6; X-9 → jue 11-mar 13:30-14:15; R43 → sáb 17-jul todo el día) → `--set revisor2=… cr-paquete=… case-report-1=… equipo=… SR-1=…`.
- **`--check` final: exit 0 · 12/12 «nada» · 0 discrepancias.** El script reescribió `DATA/RESEARCH/_calendar_overlays.json` (permitido; pendiente de commit en el Lote 6).

## 5. Verificación V7 (list_events)
| Día | Resultado |
|---|---|
| mié 7-oct-2026 | ✅ UWSA1 `o1gla7846…` 09:00-13:00 SIN cambio de hora · ENCAPS 16:15 `papebi46…` presente (pre-test de arranque parte 1) · las 6 USMLE v6 + vibecoding/SYNAPSE/R↔D/AURUM F1/MIR×2/LIVIANO v6 · 0 ids borrados · único solape = UWSA1 sobre el deep prime 09:00 (overlay FREE de hito, igual que en v5.20) |
| mar 20-oct-2026 | ✅ NBME 25 07:00-12:30 · series F1 completas · 0 borrados · 0 duplicados |
| mié 30-dic-2026 | ✅ C2 COLCHÓN F1 (todo el día) · las 6 USMLE F1 siguen (último día) · AURUM F1 60' · 0 borrados |
| jue 31-dic-2026 | ✅ sin USMLE/vibecoding/SYNAPSE/R↔D/AURUM/MIR/LIVIANO (EXDATE/UNTIL) · ⚠ queda la instancia ENCAPS 16:15 de `papebi46…` (serie no recreada por spec; ver §6) |
| lun 4-ene-2027 | ✅ banner F2 · F2 (1) 05:00 · F2 (2) LOOP 07:15-12:00 · AURUM 30' · carril B 16:15 · LIVIANO · F2 (3) EVAL 18:00 · 0 USMLE F1 · 0 borrados |
| sáb 9-ene-2027 | ✅ REVISIÓN SEMANAL 07:15-07:45 (`k8iaef…`) + STEP 1 VIVO 07:45-09:15 · sin duplicado de revisión |
| vie 15-ene-2027 | ✅ SIM #1 07:15-09:15 · 16:15 LIBRE (instancia borrada) · EVAL 18:00 · sin LOOP (viernes) |
| lun 18-ene-2027 | ✅ LOOP · carril B 16:15 · EVAL · 0 borrados |
| jue 11-mar-2027 | ✅ DRESS 11:00-13:00 · sin LOOP, sin carril B, sin EVAL · overlay 🔬 X-9 13:30 · R↔D, AURUM 30', MIR |
| vie 12-mar-2027 | ✅ 🛡 D-1 hábil · Anki 05:00 · D-1 09:00 · SIN MIR / R↔D / AURUM (EXDATE) |
| dom 14-mar-2027 | ✅ EXAMEN ENCAPS 11:00-13:00 PROVISIONAL · (aparecen SYNAPSE dom 15:00 y ANKI dom 17:00: series abiertas fuera del alcance; su descripción v6 dice «se salta») |
| lun 15-mar-2027 | ✅ solo 🛡 lunes libre (0 MIR / R↔D / AURUM) |
| mié 17-mar-2027 | ✅ NBME 29 07:00-12:30 · R↔D · AURUM 30' · MIR · (sin series Step 1 F3: §G4 pendiente) |
| lun 27-sep-2027 | ✅ EXAMEN Step 1 07:00-16:00 · ritual sáb 25 · viaje dom 26 · regreso mar 28 |

**V7: OK** (0 series borradas presentes en los 14 días revisados · 0 duplicados en la misma franja · hitos con la fecha/hora de §B5/§G3).

## 6. Lo que NO se hizo / decisiones / pendientes
1. **§G4 (F3) y §G5 (F4) no ejecutados** (dependen de la convocatoria ENCAPS y del inicio real del SERUMS). Hasta entonces: del mar 16-mar al vie 30-abr NO hay series del Step 1 F3 en el Calendar (sí R↔D, MIR y AURUM 30'); desde el lun 3-may no hay series de estudio salvo la revisión semanal F4, los hitos/ventanas y los eventos de taper.
2. **ENCAPS 16:15 `papebi46…`**: por §G1 no se recrea; conserva instancias en días SKIP (vie 25-dic, jue 31-dic, vie 1-ene). La descripción v6 dice «ignorarlas». Borrar esas 3 instancias requiere OK de Joseph (no estaban en la lista autorizada).
3. **Series abiertas de fin de semana no listadas en §G2** (SYNAPSE PC sábado `hv2lk…`, SYNAPSE domingo `s7r8…`, ANKI sábado `6ta0…`, ANKI domingo `619c…`): solo descripción v6 (G6). Siguen apareciendo el sáb 13-mar (D-1 real ENCAPS), el dom 14-mar (examen ENCAPS), el sáb 25 y el dom 26-sep y, desde el SERUMS, los sábados del PC SYNAPSE ya sin contenido. Propuesta (con OK): cortar SYNAPSE PC sáb/dom al fin del plan (sáb 13-feb / dom 14-feb) y añadir EXDATE 13-mar / 14-mar / 25-sep / 26-sep a las de ANKI.
4. **Rutinas personales con texto v5.20** (EKER «IDENTIDAD DE EXAMEN … 22-feb», CORRER, CALISTENIA, DESAYUNO, ALMUERZO, LECTURA, GYM ×N, BAILE ×N, BAILE PRÁCTICA, VIAJE VUELTA): NO tocadas por instrucción. Siguen citando «examen lun 22-feb / ENCAPS mié 10-mar / D95». Decisión de Joseph (o un lote con OK explícito sobre rutinas personales).
5. **UWSA1**: solo se actualizó la DESCRIPCIÓN (v6: examen 27-sep, sin corrimiento; añadida la línea del pre-test ENCAPS 16:15). Fecha, hora (09:00-13:00), título e id intactos.
6. **Interpretaciones (opción no destructiva)**: (a) EXDATE sáb 13-mar en la REVISIÓN SEMANAL (está en `protegidos` y cae en su BYDAY); (b) vie 12-mar SIN EXDATE en la serie F2 (1) 05:00 (spec: el D-1 hábil sí lleva Anki); (c) SIM #7/#8 (11:00-13:00): la «corrección 09:30-11:00» de la spec no cabe → descripción «corrección + 2 códigos peores por la tarde»; (d) títulos de los NBME 25-28 sin «v6.00» (no se re-fecharon; solo hora + descripción); (e) R43 de todo el día con el payload exacto del script; (f) ventanas y eventos nuevos de todo el día con colorId 6 (naranja, como los hitos) y FREE.
7. **Historial**: las 14 series recreadas conservan su DTSTART original, así que sus instancias pasadas reaparecen idénticas (título base + «v6.00», descripción v6). Se comprobó 0 instancias modificadas en todos los rangos; las únicas cancelaciones previas (R↔D, 10-17 jun-2026) quedaron como EXDATE.
8. **Recordatorios**: copiados del original (useDefaultReminders, o popup 5' en AURUM). Los eventos nuevos de todo el día usan los recordatorios por defecto del calendario.
9. **Pendientes de otros lotes**: commit de `DATA/RESEARCH/_calendar_overlays.json` (Lote 6) · `CALENDAR_SEGMENTOS_V5_6.md` / handoff con estos ids (Lote 5B) · al salir la convocatoria: series de EXTENSIÓN F2 + re-fechar DRESS / D-1 / EXAMEN / 🛡 (mismos ids) + G4 · al inicio real del SERUMS: G5 + ajustar el UNTIL provisional (vie 30-abr) de R↔D y MIR + ajustar la revisión semanal F4.

## 7. Ronda 2 (mar 6-oct-2026, ≈22:10-22:30 Lima · 31 operaciones)

Protocolo: `get_event` + respaldo JSON en `cal_bk/` ANTES de cada cambio (si ya había respaldo del id → `<id>_r2.json`; 31 ficheros nuevos) · `notificationLevel: NONE` en todo create/update/delete · recrear = `create_event` → `get_event` → `delete_event` de la vieja · antes de borrar cada serie de finde, `list_events` de TODO su rango (DTSTART → 31-dic-2027, volcado a fichero y comparado con la RRULE por script `v600/r2/inst.js`): **0 instancias canceladas, movidas o editadas** en las 4 series (SYNAPSE sáb 81/81 · SYNAPSE dom 79/79 · ANKI sáb 92/92 · ANKI dom 92/92), así que no se pierde ninguna excepción.

**Último finde con contenido (fuente: `src/lib/synapseDailyPlan.ts` y `src/lib/vibecodingPlan.ts`)**: el motor SYNAPSE tiene fila hasta el lun 15-feb; su último sábado es el **sáb 13-feb** (d130: A-unit «Prep CCA-F · simulacro», PC 0') y su último domingo el **dom 14-feb** (d131: repaso opcional 5'). El vibecoding (fin vie 19-feb) no tiene contenido de finde después: `shipTxt` S19 = «sáb 13 / dom 14-feb: sin vibecoding … PC = no» y S20 = «Sin PC: el sáb 20 / dom 21-feb son descanso». ⇒ UNTIL sáb `20270214T045959Z` y dom `20270215T045959Z`. Ningún día SKIP/protegido cae en sáb/dom dentro de esos rangos ⇒ sin EXDATE.

| # | Tipo | Id viejo | Id nuevo | Título | Cambio | Respaldo |
|---|---|---|---|---|---|---|
| R2-1 | DELETE-INST | papebi46etlo8glgfs5akd5mig_20261225T211500Z | - | ENCAPS 16:15 vie 25-dic | instancia SKIP borrada (la serie sigue) | cal_bk/papebi46etlo8glgfs5akd5mig_20261225T211500Z.json |
| R2-2 | DELETE-INST | papebi46etlo8glgfs5akd5mig_20261231T211500Z | - | ENCAPS 16:15 jue 31-dic | idem | cal_bk/papebi46etlo8glgfs5akd5mig_20261231T211500Z.json |
| R2-3 | DELETE-INST | papebi46etlo8glgfs5akd5mig_20270101T211500Z | - | ENCAPS 16:15 vie 1-ene | idem | cal_bk/papebi46etlo8glgfs5akd5mig_20270101T211500Z.json |
| R2-4 | RECREAR | hv2lk04orquvivthtkfhilb1ps | goknd2mvbkpqastc6n3rrhon5g | 🧠 SYNAPSE — PC sábado (2h) | DTSTART sáb 13-jun-2026 15:00-17:00 · RRULE WEEKLY SA UNTIL=20270214T045959Z (último sáb 13-feb) · sin EXDATE · color 9 · recordatorios por defecto · descripción G6 + línea de historial | cal_bk/hv2lk04orquvivthtkfhilb1ps_r2.json |
| R2-5 | RECREAR | s7r8tiu66286t156l0odpv5nvo | frsvkuk585gmcte6bufo6dkfto | 🧠 SYNAPSE — repaso + PC domingo (2h) | DTSTART dom 28-jun-2026 15:00-17:00 · RRULE WEEKLY SU UNTIL=20270215T045959Z (último dom 14-feb) · sin EXDATE · color 9 · descripción G6 + historial | cal_bk/s7r8tiu66286t156l0odpv5nvo_r2.json |
| R2-6 | RECREAR | 6ta0e3c019dep76spdgumfm0pl | 00929or8op5hj28s3nbf1eo09c | ANKI (sábado) | DTSTART sáb 28-mar-2026 19:00-19:30 · misma RRULE WEEKLY SA (abierta, sin UNTIL como la original) · EXDATE;TZID=America/Lima:20270313T190000,20270925T190000 · color 1 · título «ANKI » intacto · descripción + línea «Sábados sin este bloque (13-mar, 25-sep)» + historial | cal_bk/6ta0e3c019dep76spdgumfm0pl_r2.json |
| R2-7 | RECREAR | 619c1672eej1qgmvddbfkb5fu9 | 0ar1fbrm3ts396kd96f8df753g | ANKI (domingo) | DTSTART dom 29-mar-2026 17:00-17:15 · misma RRULE WEEKLY SU (abierta) · EXDATE;TZID=America/Lima:20270314T170000,20270926T170000 · color 1 · descripción: corregida la contradicción del dom 26-sep (ahora: el bloque de las 17:00 NO aparece; como mucho Anki vencido ≤15' por la MAÑANA, antes del viaje) + historial | cal_bk/619c1672eej1qgmvddbfkb5fu9_r2.json |
| R2-8 | UPDATE-TÍTULO | 4hjv5lkvluj06ahc2qndtsi6as | = | 🎯 NBME 25 (200Q) + revisión · v6.00 | solo summary (+ « · v6.00») | cal_bk/4hjv5lkvluj06ahc2qndtsi6as_r2.json |
| R2-9 | UPDATE-TÍTULO | lr7ktrbiffj4hrlke7lh7cv6h4 | = | 🎯 NBME 26 (200Q) + revisión · v6.00 | idem | cal_bk/lr7ktrbiffj4hrlke7lh7cv6h4_r2.json |
| R2-10 | UPDATE-TÍTULO | sm4baa2v453ifaub325h9v08mg | = | 🎯 NBME 27 (200Q) + revisión · v6.00 | idem | cal_bk/sm4baa2v453ifaub325h9v08mg_r2.json |
| R2-11 | UPDATE-TÍTULO | ecu784689p8osrhqabuct8d5jg | = | 🎯 NBME 28 (200Q) + revisión · v6.00 | idem | cal_bk/ecu784689p8osrhqabuct8d5jg_r2.json |
| R2-12 | UPDATE-DESCR | 22bh9m5jhc7ro6aj3m4ffjad7g | = | DECLARACIONES EKER | punto 6 «IDENTIDAD DE EXAMEN»: Step 1 primario 7-oct → 30-dic y 16-mar → lun 27-sep (PROVISIONAL); ENCAPS primario 4-ene → dom 14-mar PROVISIONAL (D-1 sáb 13-mar) · «Régimen v6.00» · recordatorio popup 0' intacto | cal_bk/22bh9m5jhc7ro6aj3m4ffjad7g.json |
| R2-13 | UPDATE-DESCR | 4qvs34d84u82psvknpqhv3jc7a | = | GYM jueves | D94 jue 23-sep · D95 vie 24-sep · ritual sáb 25-sep · D-1 dom 26-sep (viaje a Lima) · examen lun 27-sep | cal_bk/4qvs34d84u82psvknpqhv3jc7a.json |
| R2-14 | UPDATE-DESCR | 7sf8i7pe62pugfk4t6tcnbb9i4 | = | GYM viernes | hitos por día de la semana v6 (viernes: solo NBME 32 vie 6-ago) · PRE-TEST vie 8-ene · SIM 100Q los viernes 15-ene → 5-mar · D95 vie 24-sep (GYM suave o saltar) | cal_bk/7sf8i7pe62pugfk4t6tcnbb9i4.json |
| R2-15 | UPDATE-DESCR | 0dpes0ekv96a453e89m5osg06t | = | GYM martes | 6 hitos en martes (NBME 25-28 · UWSA3 opc. 29-jun · UWSA2 10-ago; GO/NO-GO lun 9-ago) · examen lun 27-sep / D-1 dom 26-sep · D-1 ENCAPS = sáb 13-mar (ya no el martes; mar 9-mar = martes normal de la intensiva) | cal_bk/0dpes0ekv96a453e89m5osg06t.json |
| R2-16 | UPDATE-DESCR | 6740kavnfkdcvj5k149ouliauu | = | GYM lunes | 3 hitos en lunes (NBME 30 · NBME 33 · Free 120) · examen lun 27-sep cae en esta serie (noche OPCIONAL; con el examen en Lima no aplica) · lun 15-mar libre post-ENCAPS | cal_bk/6740kavnfkdcvj5k149ouliauu.json |
| R2-17 | UPDATE-DESCR | 0tod56pc6pgecm5lf7g4e3ji9v | = | BAILE miércoles | hitos en miércoles (UWSA1 · NBME 29 17-mar · NBME 31 28-jul) · D94-D95 / ritual / D-1 / examen sep · ENCAPS dom 14-mar (serie del domingo); mié 10-mar = último LOOP | cal_bk/0tod56pc6pgecm5lf7g4e3ji9v.json |
| R2-18 | UPDATE-DESCR | 09me7atu516gb0k6u0rbfcj8q1 | = | BAILE martes | igual que GYM martes | cal_bk/09me7atu516gb0k6u0rbfcj8q1.json |
| R2-19 | UPDATE-DESCR | 3m8m4resu8akph4a7qfuf3h1qn | = | BAILE jueves | igual que GYM jueves | cal_bk/3m8m4resu8akph4a7qfuf3h1qn.json |
| R2-20 | UPDATE-DESCR | 5pd4jhmvl31hvbuh40vphpoc4q | = | BAILE viernes | D95 vie 24-sep · hitos viernes (NBME 32) · PRE-TEST 8-ene · SIM 100Q 15-ene → 5-mar | cal_bk/5pd4jhmvl31hvbuh40vphpoc4q.json |
| R2-21 | UPDATE-DESCR | 3jkfb6097rtc1jbec19eg3sd57 | = | BAILE sábado | sáb 25-sep = ritual (protegido, sin estudio) · sáb 13-mar = D-1 ENCAPS (regla Palmerton de la víspera, trasladada aquí desde las series del martes) | cal_bk/3jkfb6097rtc1jbec19eg3sd57.json |
| R2-22 | UPDATE-DESCR | 64lue1en3hk0cf8itml2rtlqi4 | = | BAILE lunes | igual que GYM lunes + hitos de lunes | cal_bk/64lue1en3hk0cf8itml2rtlqi4.json |
| R2-23 | UPDATE-DESCR | 7j6pucil43vuca70p082g5ub3d | = | BAILE domingo | D-1 = dom 26-sep (viaje a Lima) · dom 14-mar = EXAMEN ENCAPS (clase opcional) | cal_bk/7j6pucil43vuca70p082g5ub3d.json |
| R2-24 | UPDATE-DESCR | 13m3tcqjjc34rt6iqfblla18q1 | = | BAILE PRÁCTICA | idem domingo | cal_bk/13m3tcqjjc34rt6iqfblla18q1.json |
| R2-25 | UPDATE-DESCR | 43dq3oib16esjcqj1dcd8osot2 | = | ALMUERZO | UWSA1 mié 7-oct (almuerzo dentro del sim) · UWSA3/UWSA2 07:00-11:15 · NBME 07:00-12:30 → almuerzo DENTRO del sim (Ziploc 2) y comida principal breve al terminar (coherente con la descripción v6 de los NBME) | cal_bk/43dq3oib16esjcqj1dcd8osot2.json |
| R2-26 | UPDATE-DESCR | 7agi60f2bp8qnh6cnqvfo22giv | = | DESAYUNO L-V | solo «Régimen v6.00» | cal_bk/7agi60f2bp8qnh6cnqvfo22giv.json |
| R2-27 | UPDATE-DESCR | 2u9je70pif58hgf2f8t3vgu8b8 | = | DESAYUNO sáb/dom | idem | cal_bk/2u9je70pif58hgf2f8t3vgu8b8.json |
| R2-28 | UPDATE-DESCR | 5mrm4ru08go9k70408jm8vcjku | = | CORRER | idem | cal_bk/5mrm4ru08go9k70408jm8vcjku.json |
| R2-29 | UPDATE-DESCR | 2lpvftrc3fp64e0om6qg0mcs34 | = | CALISTENIA | idem | cal_bk/2lpvftrc3fp64e0om6qg0mcs34.json |
| R2-30 | UPDATE-DESCR | 7jmf8p1l5b5q6jbtmj9uualiq8 | = | LECTURA | idem | cal_bk/7jmf8p1l5b5q6jbtmj9uualiq8.json |
| R2-31 | UPDATE-DESCR | 3l59kpei7sg0l6kq51343or383 | = | VIAJE VUELTA | idem | cal_bk/3l59kpei7sg0l6kq51343or383.json |

Rutinas (R2-12 → R2-31, las 20 de la lista; todas contenían «Régimen v5.20», ninguna quedó sin tocar): solo `description` vía `update_event`; título, hora, recurrencia, color y recordatorios intactos (comprobado en la respuesta de cada update). Todas terminan con «(v6.00 · 6-oct-2026: fechas de estudio actualizadas; en el SERUMS el turno es variable — ver la app)». El texto nuevo lo generó `v600/r2/rutinas.js` (sustitución exacta de los párrafos v5.20, cada uno encontrado 1 vez) → `v600/r2/new/<id>.txt`; tras el update, un volcado de `list_events` confirmó **20/20 descripciones idénticas** al texto generado. Criterio aplicado más allá de la tabla literal: (a) «Régimen v5.20 (D1 = mié 7-oct-2026 · v5.19: mar 6-oct)» → «Régimen v6.00 (D1 = mié 7-oct-2026)»; (b) listas de hitos recalculadas por día de la semana con las fechas v6 de §3; (c) cláusulas v5.20 sin equivalente v6 (D81, D86, D88-D93 de febrero, «sáb 20 libre», «finde libre entre D90 y D91») retiradas; (d) la regla de la víspera del ENCAPS pasa de las series del martes (mar 9-mar) a BAILE sábado (sáb 13-mar); (e) en GYM/BAILE lunes se conserva «noche del examen = OPCIONAL» + «con el examen en Lima (viaje dom 26 · regreso mar 28-sep) no aplica».

### IDs vigentes que cambian respecto de §3
| Serie | Id vigente | Rango |
|---|---|---|
| 🧠 SYNAPSE — PC sábado | `goknd2mvbkpqastc6n3rrhon5g` | sáb 13-jun-2026 → sáb 13-feb-2027 · 15:00-17:00 |
| 🧠 SYNAPSE — repaso + PC domingo | `frsvkuk585gmcte6bufo6dkfto` | dom 28-jun-2026 → dom 14-feb-2027 · 15:00-17:00 |
| ANKI sábado | `00929or8op5hj28s3nbf1eo09c` | desde sáb 28-mar-2026 · 19:00-19:30 · abierta · EXDATE 13-mar y 25-sep-2027 |
| ANKI domingo | `0ar1fbrm3ts396kd96f8df753g` | desde dom 29-mar-2026 · 17:00-17:15 · abierta · EXDATE 14-mar y 26-sep-2027 |

Ya no existen (borrados en la ronda 2; respaldo en `cal_bk/<id>_r2.json`): `hv2lk04orquvivthtkfhilb1ps` · `s7r8tiu66286t156l0odpv5nvo` · `6ta0e3c019dep76spdgumfm0pl` · `619c1672eej1qgmvddbfkb5fu9`. La serie ENCAPS 16:15 `papebi46etlo8glgfs5akd5mig` sigue viva (instancia del mié 30-dic comprobada); solo perdió las 3 instancias SKIP.

### Verificación ronda 2 (list_events)
| Día | Resultado |
|---|---|
| vie 25-dic-2026 | ✅ 0 eventos de estudio (solo rutinas: EKER, correr, calistenia, ducha, desayuno, almuerzo, lectura, GYM/BAILE, viaje, dormir) · ENCAPS 16:15 ya no está |
| jue 31-dic-2026 | ✅ 0 eventos de estudio · ENCAPS 16:15 ya no está |
| vie 1-ene-2027 | ✅ 0 eventos de estudio · ENCAPS 16:15 ya no está |
| sáb 13-mar-2027 | ✅ 0 eventos de estudio (sin ANKI 19:00, sin SYNAPSE, sin revisión semanal) · queda «CREACIÓN DE VIDEO YOUTUBE EMPRESA» 17:00 (evento ajeno, no tocado) |
| dom 14-mar-2027 | ✅ solo el hito 🏁 EXAMEN ENCAPS 11:00-13:00 PROVISIONAL · sin ANKI 17:00 · sin SYNAPSE |
| sáb 25-sep-2027 | ✅ solo el hito 🛡 RITUAL DE TEST-DAY · sin ANKI 19:00 · (YouTube 17:00 ajeno) |
| dom 26-sep-2027 | ✅ solo el hito 🚌 VIAJE A LIMA · sin ANKI 17:00 |
| sáb 10-oct-2026 | ✅ SYNAPSE PC 15:00 `goknd2…` + ANKI 19:00 `00929…` |
| dom 11-oct-2026 | ✅ SYNAPSE dom 15:00 `frsvkuk…` + ANKI 17:00 `0ar1f…` |
| sáb 8-may-2027 | ✅ ANKI 19:00 `00929…` presente · SYNAPSE PC ya no (terminó el 13-feb) · 📋 revisión semanal F4 presente |

### Pendientes que deja la ronda 2
1. La descripción de la serie ENCAPS 16:15 `papebi46…` aún dice que las instancias de 25-dic / 31-dic / 1-ene «siguen visibles: ignorarlas»: ya no existen. Cambiar ese texto no estaba en la lista autorizada.
2. GYM viernes conserva «Sábado y domingo libres.» (resto del texto, intacto); desde el SERUMS (lun 3-may) solo el domingo es libre: lo cubre la nota final «en el SERUMS el turno es variable — ver la app».
3. Rutinas de horario fijo (EKER 04:00, correr, desayuno, almuerzo, lectura, GYM/BAILE) siguen sin ajustarse al turno M/T del SERUMS (§G5): decisión de Joseph.

## 8. Autorización

Joseph (chat del 6-oct-2026): "Corre … todo lo que tengas que correr. Reestructura…" y "ahora sí es una reestructuración definitiva que empezamos mañana 7 de octubre"; el orquestador delegó la lista §G1-§G2 y la ronda 2; respaldos en cal_bk/.

## 9. Corrimiento v6.01 (10-oct) · ⏸ historial — ids vigentes en §11.2

Ejecutado el sáb 10-oct-2026 (≈14:45-15:20 Lima). Motivo: 7, 8 y 9-oct sin estudio → **D1 = lun 12-oct-2026** (código en el commit `8e9be7e`; Supabase ENCAPS 57 MANTENIMIENTO + 50 INTENSIVO, huella 107 · 1795d281…). Orden de Joseph: «todo empieza el lunes 12, corre todo los días que tengas que correr»; el orquestador delegó exactamente los pasos 1-5 de abajo. Estado anterior = tag git `regimen-v6.00` + §1-§8 de este fichero.

Protocolo: `get_event` + respaldo JSON en `cal_bk/<id>_v601.json` ANTES de cada cambio (81 eventos + `cal_bk/_calendar_overlays.before_set_v601.json` = 82 ficheros, solo en disco) · `notificationLevel: NONE` en todo create/update/delete · recrear = `create_event` (DTSTART original + mismos campos + UNTIL nuevo + EXDATE vigentes) → `get_event` → `delete_event` de la vieja · antes de crear cada serie nueva, `list_events` de TODO el rango DTSTART → UNTIL de la vieja, comparado con la RRULE por script (`scratchpad/v601/cal/inst.js`): **0 instancias canceladas, movidas o editadas** en las 4 series (vibecoding 122/122 · SYNAPSE 175/175 · LIVIANO 117/117 · AURUM 30' 70/70), así que no hizo falta ningún EXDATE extra. En los respaldos de la barrida de descripciones (paso 5) la `description`/`summary` sale del volcado `list_events` del mismo master (idéntica, comprobado por longitud) y el resto de campos de la respuesta de `get_event`.

### 9.1 Operaciones (83)

| # | Tipo | Id viejo | Id nuevo | Título | Cambio | Respaldo |
|---|---|---|---|---|---|---|
| 1 | UPDATE | o1gla7846uae4tgngvc4q45osg | = | 🎯 UWSA1 · v6.01 | mié 7-oct ⇒ **lun 12-oct 09:00-13:00** + título/descr. v6.01 (pre-test ENCAPS parte 1 hoy, parte 2 mar 13-oct) | cal_bk/o1gla7846uae4tgngvc4q45osg_v601.json |
| 2 | UPDATE | 4hjv5lkvluj06ahc2qndtsi6as | = | 🎯 NBME 25 · v6.01 | mar 20-oct ⇒ **vie 23-oct 07:00-12:30** (D10) | cal_bk/4hjv5lkvluj06ahc2qndtsi6as_v601.json |
| 3 | UPDATE | lr7ktrbiffj4hrlke7lh7cv6h4 | = | 🎯 NBME 26 · v6.01 | mar 10-nov ⇒ **vie 13-nov 07:00-12:30** (D25; deload lun 16-nov) | cal_bk/lr7ktrbiffj4hrlke7lh7cv6h4_v601.json |
| 4 | UPDATE | sm4baa2v453ifaub325h9v08mg | = | 🎯 NBME 27 · v6.01 | mar 1-dic ⇒ **vie 4-dic 07:00-12:30** (D40) | cal_bk/sm4baa2v453ifaub325h9v08mg_v601.json |
| 5 | UPDATE | ecu784689p8osrhqabuct8d5jg | = | 🎯 NBME 28 · v6.01 | mar 22-dic ⇒ **lun 28-dic 07:00-12:30** (D55, checkpoint de fecha) | cal_bk/ecu784689p8osrhqabuct8d5jg_v601.json |
| 6 | UPDATE | sfgp85kjua01v159rh1qrilr18 | = | 🚦 GATE F1 (D18) · v6.01 | todo el día vie 30-oct ⇒ **mié 4-nov** | cal_bk/sfgp85kjua01v159rh1qrilr18_v601.json |
| 7 | UPDATE | vvi7lk2c0c9nih1fqbi19p681s | = | 🚦 GATE F1 (D38) · v6.01 | todo el día vie 27-nov ⇒ **mié 2-dic** | cal_bk/vvi7lk2c0c9nih1fqbi19p681s_v601.json |
| 8 | UPDATE | oi557k66kql15oa6ptkjdipvis | = | 🧯 Colchón F1 CONSUMIDO (v6.01) · hoy D56 normal | mar 29-dic (fecha =), NO borrado: título + descr. (D56 Heme/Onco) | cal_bk/oi557k66kql15oa6ptkjdipvis_v601.json |
| 9 | UPDATE | ag335n3dhvui11593us2lm448s | = | 🧯 Colchón F1 CONSUMIDO (v6.01) · hoy D57 normal (último día de F1) | mié 30-dic (fecha =), NO borrado: título + descr. | cal_bk/ag335n3dhvui11593us2lm448s_v601.json |
| 10 | UPDATE | ti163p5s6t4odtqmhvkl3mamac | = | 🇵🇪 CHECKPOINT DEL AÑO (mini-sim 50 · dia 50) · v6.01 | vie 18-dic (fecha =): «mini-sim 53» ⇒ «mini-sim 50 (dia 50)» | cal_bk/ti163p5s6t4odtqmhvkl3mamac_v601.json |
| 11 | CREATE | - | **mgv06ho1cphr78rsqf9nrkgd7o** | 🇵🇪 ENCAPS carril B · REPOSICIÓN F1: mini-sim 25Q (II-6 + II-10) · v6.01 | lun 22-feb-2027 16:15-17:15 · color 6 · FREE (como los overlays ENCAPS) · receta íntegra (II 8 · I 7 · V 5 · III 3 · IV 2 · 72 s/Q · umbral 18/25 · sim_n 93) | - |
| 12 | UPDATE-DESCR | qcsv3oe0e7rh2vkfq301ne68ko | = | F2 (4) carril B · reposición | dias 90-105 + los 3 pendientes F1 (mié 17-feb II-8 · jue 18-feb II-3 · lun 22-feb mini-sim) + regla «filas del carril B dia 58-89»; RRULE intacta | cal_bk/qcsv3oe0e7rh2vkfq301ne68ko_v601.json |
| 13 | RECREAR | easavkn12k189aorun9pou2nd0 | **9jp7pkabng1bq2tll1ffrrncpc** | 🧠 VIBECODING 04:15-05:00 | DTSTART 31-ago-2026 · MO-FR · UNTIL 20270220T045959Z ⇒ **20270225T045959Z** (último mié 24-feb) · EXDATE 25-dic / 31-dic / 1-ene (04:15) · color 9 · descr. v6.01 (S1-S10 lun-vie, avance S11 sáb 26-dic, SHIP S12 sáb 9-ene, taper jue 7-ene → mié 24-feb) | cal_bk/easavkn12k189aorun9pou2nd0_v601.json |
| 14 | RECREAR | f1imvu9cnmhrcsi5ag6m3k8jdk | **7nd90n5s3ueinen4q13dohcaq4** | 🧠 SYNAPSE misión 12:30-13:00 | DTSTART 11-jun-2026 · MO-FR · UNTIL 20270216T045959Z ⇒ **20270220T045959Z** (último vie 19-feb) · EXDATE 25-dic / 31-dic / 1-ene (12:30) · color 9 · descr. v6.01 | cal_bk/f1imvu9cnmhrcsi5ag6m3k8jdk_v601.json |
| 15 | RECREAR | skolg4n4far2p20md3vat06b8c | **ap0li4otjf20mpiqpdqu8uj2ps** | ⚖️ LIVIANO 17:15-18:00 | DTSTART 31-ago-2026 · MO-FR · UNTIL 20270213T045959Z ⇒ **20270218T045959Z** (último mié 17-feb) · EXDATE 25-dic / 31-dic / 1-ene (17:15) · color 7 · descr. v6.01 (casos vie 16-oct … vie 12-feb, capstone mar 16-feb) | cal_bk/skolg4n4far2p20md3vat06b8c_v601.json |
| 16 | RECREAR | ogb2qi4c57ee2fc2ojjsk9rmcg | **4eqm7ht2tbs537nuigit2e1u3k** | 🪙 AURUM 30' 14:15-14:45 F2-F3 | DTSTART lun 4-ene-2027 · MO-FR · UNTIL 20270416T045959Z ⇒ **20270421T045959Z** (último mar 20-abr) · EXDATE 12-mar, 15-mar, 25-mar, 26-mar (14:15) conservados · color 5 · popup 5' | cal_bk/ogb2qi4c57ee2fc2ojjsk9rmcg_v601.json |
| 17-28 | UPDATE | 12 overlays 🔬 (mismos ids) | = | RESEARCH M1 · C-2 · T-1 · C-6 · CR-1 · T-8 · X-1 · CR-8 · CR-9 · X-9 · R10 · R43 | payload exacto de `gen_research_calendar.js --print`: M1 mié 14-oct ⇒ vie 16-oct · C-2 jue 22 ⇒ lun 26-oct · T-1 lun 26 ⇒ mié 28-oct · C-6 mié 11 ⇒ vie 13-nov · CR-1 mar 17 ⇒ jue 19-nov · T-8 jue 17 ⇒ lun 21-dic · X-1 mié 23 ⇒ mar 29-dic · CR-8 vie 8 ⇒ mar 12-ene · CR-9 jue 11-feb (solo texto: d34) · X-9 jue 11 ⇒ mié 17-mar · R10 vie 19 ⇒ mar 23-mar (13:30-14:15) · R43 sáb 17-jul ⇒ **mar 20-jul (todo el día)** | cal_bk/<id>_v601.json (los 12) |
| 29 | SCRIPT | DATA/RESEARCH/_calendar_overlays.json | - | `gen_research_calendar.js --set` (12 hitos) → `--check` | exit 0 · 12/12 «nada» · copia previa cal_bk/_calendar_overlays.before_set_v601.json | - |
| 30-49 | UPDATE-DESCR | 20 rutinas personales (mismos ids) | = | GYM lun 6740kavnfkdcvj5k149ouliauu · mar 0dpes0ekv96a453e89m5osg06t · jue 4qvs34d84u82psvknpqhv3jc7a · vie 7sf8i7pe62pugfk4t6tcnbb9i4 · BAILE mié 0tod56pc6pgecm5lf7g4e3ji9v · mar 09me7atu516gb0k6u0rbfcj8q1 · jue 3m8m4resu8akph4a7qfuf3h1qn · vie 5pd4jhmvl31hvbuh40vphpoc4q · sáb 3jkfb6097rtc1jbec19eg3sd57 · lun 64lue1en3hk0cf8itml2rtlqi4 · dom 7j6pucil43vuca70p082g5ub3d · BAILE PRÁCTICA 13m3tcqjjc34rt6iqfblla18q1 · EKER 22bh9m5jhc7ro6aj3m4ffjad7g · ALMUERZO 43dq3oib16esjcqj1dcd8osot2 · DESAYUNO L-V 7agi60f2bp8qnh6cnqvfo22giv · sáb/dom 2u9je70pif58hgf2f8t3vgu8b8 · CORRER 5mrm4ru08go9k70408jm8vcjku · CALISTENIA 2lpvftrc3fp64e0om6qg0mcs34 · LECTURA 7jmf8p1l5b5q6jbtmj9uualiq8 · VIAJE VUELTA 3l59kpei7sg0l6kq51343or383 | SOLO descripción (título, hora, recurrencia, color y recordatorios intactos): «Régimen v6.01 (D1 = lun 12-oct-2026; v6.00: mié 7-oct)» · listas de hitos por DÍA DE LA SEMANA recalculadas (lunes: UWSA1 12-oct · NBME 28 28-dic · NBME 30 · NBME 33 · Free 120 · GO/NO-GO · martes: solo UWSA3 opc. 29-jun y UWSA2 10-ago · miércoles: NBME 29 · NBME 31 · gates 4-nov / 2-dic · viernes: NBME 25 23-oct · 26 13-nov · 27 4-dic · 32 6-ago) · EKER «objetivo primario Step 1 del lun 12-oct…» · ALMUERZO UWSA1 lun 12-oct + fechas NBME v6.01 | cal_bk/<id>_v601.json (los 20) |
| 50-55 | UPDATE-DESCR | 6 series USMLE F1 | = | ANKI AM 9274q14djfvggeajhor64oshj8 · repaso 76dnlc30p3hnccenpvub2d9acg · pre-test c24k2n7k8qlhfimrrncf8rapgk · deep prime iuhj8busrh63ms7v4j5q8e9920 · 30Q q72kvc9pm1brlqvl6383ccr9vs · eval c5e77csne1bnfps1iq7nqel84s | F1 = D1 lun 12-oct → D57 mié 30-dic (57 sesiones), bioestadística (ex D58) → T3 jue 18-mar-2027, C1/C2 consumido, NBME/gates v6.01; 30Q: niveles por viernes re-derivados (N1 vie 16-oct, 20-nov · N3 vie 30-oct, 6-nov, 27-nov, 11-dic, 18-dic · sin N4 en F1) y ~1.900 Q uWorld en F1 (3.270 en total, sin cambio). UNTIL 20261231 intacto | cal_bk/<id>_v601.json |
| 56-57 | UPDATE-DESCR | ENCAPS 16:15 papebi46etlo8glgfs5akd5mig · carril B d8252hjo5ra2qlqb9bccd6vkjo | = | 🇵🇪 ENCAPS 16:15 | F1 dias 1-57 (47 banqueo + 10 mini-sims; checkpoint mini-sim 50) · arranque lun 12 / mar 13-oct · stock V-2 antes del mié 28-oct · III-5 antes del jue 12-nov · 3 pendientes F1 → carril B · carril B 1 → 16-feb = dias 78-89 (dia_mant 81-92) · huella/backups v6.01. RRULEs intactas | cal_bk/<id>_v601.json |
| 58-60 | UPDATE-DESCR | F2 bod921vej8ehllto18h0ieiuig · qqjhn7hnkugffrnvm5s9a0q46k · 2fvbkunh0nfhvhbn1b6iqvpifs | = | Anki 05:00 · LOOP · STEP 1 VIVO | dias 58-107 · fines de SYNAPSE (vie 19-feb), LIVIANO (mié 17-feb), AURUM (mar 20-abr), vibecoding (mié 24-feb) · STEP 1 VIVO sin bioestadística (ya no es de F1). `uvpo4pgrtiqp3d9p07ail1fni8` (EVAL 20Q) no tenía referencias desfasadas: sin tocar | cal_bk/<id>_v601.json |
| 61-74 | UPDATE-DESCR | banner 4mfnu95lrhr3dmu87einr3jm5k (+ título «días 58-107 … · v6.01») · PRE-TEST 27bs58ee0ke180ht2rh6mgvft0 · SIM #1-#8 g6t22lagnagt2sbrbo0n9d3u8k · tuqhgd12ibsc595kbemaqiu6k8 · uvogu0gd7kufpshe2o3fffopf8 · 6shb9jps4nir60khcd6h4g0jh8 · hl6ajs7etaqd6aici3s2vvema8 · 7afho3rf6igkk1odse31sqps4c · i3jhsk8hj6mj95aij99r6329mc · 2l4c2ct9iv6dkqvpcf6chtjnu0 · DRESS ip4lhi4lhigad4l1titbd36jnk · D-1 tl0irrsb4av0vd8d1ar8vmbuoo · EXAMEN 8juk0mvl66tutdkbcei7umrs68 · 🛡 D-1 hábil 3vrptnmtl9vppvs6nvv25s7p3c | = | eventos ENCAPS F2 | fechas y horas SIN cambio; «día N» de la intensiva − 3 (PRE-TEST 62 · SIM 67/72/77/82/87/92/97/102 · DRESS 106 · D-1 107) · banner con los 3 pendientes F1 y los fines de secundarios v6.01 | cal_bk/<id>_v601.json |
| 75-83 | UPDATE-DESCR | MIR uiduvkfsgs43p1u1qk1vohih58 · hos0tfhsr2hdfs6cgv1rmejhrs · R↔D 6us7kkdcuk3g7tm1cjes38leh0 · AURUM F1 23t06e7foitmiqm24lpd0vo9jc · SYNAPSE PC sáb goknd2mvbkpqastc6n3rrhon5g · dom frsvkuk585gmcte6bufo6dkfto · ANKI sáb 00929or8op5hj28s3nbf1eo09c · dom 0ar1fbrm3ts396kd96f8df753g · REVISIÓN SEMANAL k8iaefnjq0mnrlvkilhcarrik8 | = | secundarios / finde | MIR diario lun 12-oct → lun 1-feb (D77 vie 29-ene · D78 lun 1-feb) · mant. mar 2-feb → mar 27-abr (Tier C) · ext. 128 filas mié 28-abr → vie 24-sep · Research c1 lun 12-oct → vie 5-mar, c2 mar 9-mar → mar 24-ago · Derma c1 mar 13-oct → lun 10-may, c2 mié 12-may → lun 19-jul · AURUM D130 mar 20-abr (pitches re-fechados) · SHIP S1-S10 sáb 17-oct … 19-dic, avance S11 26-dic, SHIP S11 2-ene, SHIP S12 sáb 9-ene, PC propio S16 sáb 6-feb · revisión semanal S00 sáb 10-oct / S1 sáb 17-oct · gates mié 4-nov / mié 2-dic. Recurrencias intactas (SYNAPSE PC sáb/dom siguen hasta 13/14-feb) | cal_bk/<id>_v601.json |

Todas las descripciones tocadas terminan con «(v6.01 · 10-oct-2026: D1 = lun 12-oct)». Títulos: llevan «v6.01» los eventos re-fechados del paso 1, el overlay nuevo y el banner F2; las series recreadas (paso 3) conservan su título original («· v6.00 …», «mismos campos») y las del paso 5 solo cambiaron la descripción.

### 9.2 IDs vigentes que cambian respecto de §3 / §7

| Serie / evento | Id ⏸ v6.01 (historial; vigentes en §11.2) | Rango / fecha |
|---|---|---|
| 🧠 VIBECODING 04:15-05:00 | `9jp7pkabng1bq2tll1ffrrncpc` | DTSTART lun 31-ago-2026 · MO-FR · UNTIL 20270225T045959Z (último mié 24-feb) · EXDATE 25-dic, 31-dic, 1-ene |
| 🧠 SYNAPSE misión 12:30-13:00 | `7nd90n5s3ueinen4q13dohcaq4` | DTSTART jue 11-jun-2026 · MO-FR · UNTIL 20270220T045959Z (último vie 19-feb) · EXDATE 25-dic, 31-dic, 1-ene |
| ⚖️ LIVIANO 17:15-18:00 | `ap0li4otjf20mpiqpdqu8uj2ps` | DTSTART lun 31-ago-2026 · MO-FR · UNTIL 20270218T045959Z (último mié 17-feb) · EXDATE 25-dic, 31-dic, 1-ene |
| 🪙 AURUM 30' núcleo F2-F3 | `4eqm7ht2tbs537nuigit2e1u3k` | lun 4-ene → mar 20-abr-2027 · MO-FR · UNTIL 20270421T045959Z · EXDATE 12-mar, 15-mar, 25-mar, 26-mar · popup 5' |
| 🇵🇪 Reposición F1 · mini-sim 25Q (nuevo) | `mgv06ho1cphr78rsqf9nrkgd7o` | lun 22-feb-2027 16:15-17:15 (overlay FREE) |
| Mismos ids, fecha nueva | UWSA1 `o1gla7846…` lun 12-oct 09:00-13:00 · NBME 25 `4hjv5lkv…` vie 23-oct · NBME 26 `lr7ktrbi…` vie 13-nov · NBME 27 `sm4baa2v…` vie 4-dic · NBME 28 `ecu78468…` lun 28-dic (07:00-12:30) · GATE D18 `sfgp85kj…` mié 4-nov · GATE D38 `vvi7lk2c…` mié 2-dic · overlays 🔬 según §9.1 | — |

Ya no existen (borradas el 10-oct; respaldo en `cal_bk/<id>_v601.json`): `easavkn12k189aorun9pou2nd0` (vibecoding v6.00) · `f1imvu9cnmhrcsi5ag6m3k8jdk` (SYNAPSE 12:30 v6.00) · `skolg4n4far2p20md3vat06b8c` (LIVIANO v6.00) · `ogb2qi4c57ee2fc2ojjsk9rmcg` (AURUM 30' v6.00).

### 9.3 Research 🔬 — `gen_research_calendar.js`
- `--check` inicial: exit 1 · 12 «recrear» (11 por fecha + CR-9 por texto).
- `--print` → `update_event` de los 12 con el payload exacto → `--set mentor=… carta-diana=… tesis-etica=… carta-1=… cr-caso=… tesis-L0=… revisor2=… cr-paquete=… case-report-1=… equipo=… PROSPERO-SR1=… SR-1=…`.
- **`--check` final: exit 0 · 12/12 «nada» · 0 discrepancias.** El script reescribió `DATA/RESEARCH/_calendar_overlays.json` (permitido; pendiente de commit).

### 9.4 Verificación (list_events, 10-oct)
| Día | Resultado |
|---|---|
| mié 7-oct-2026 | ✅ SIN UWSA1 (solo las instancias históricas de las series F1, DTSTART 31-ago) |
| lun 12-oct | ✅ UWSA1 09:00 (`o1gla7846…`) sobre el deep prime · las 6 USMLE F1 · vibecoding `9jp7…` · SYNAPSE `7nd9…` · R↔D · AURUM F1 · MIR ×2 · ENCAPS 16:15 · LIVIANO `ap0l…` · 0 ids borrados · 0 duplicados |
| vie 23-oct | ✅ NBME 25 07:00-12:30 · F1 completa · GYM viernes + BAILE |
| mié 4-nov | ✅ 🚦 GATE D18 (todo el día) |
| vie 18-dic | ✅ 🇵🇪 CHECKPOINT (mini-sim 50 · dia 50) |
| lun 28-dic | ✅ NBME 28 07:00-12:30 |
| mar 29-dic | ✅ 🧯 «Colchón F1 CONSUMIDO · hoy D56 normal» + 🔬 X-1 13:30 · F1 completa |
| mié 30-dic | ✅ 🧯 «… D57 normal (último día de F1)» · las 6 USMLE F1 (último día) · AURUM F1 60' |
| sáb 9-ene-2027 | ✅ REVISIÓN SEMANAL 07:15 + STEP 1 VIVO 07:45 + SYNAPSE PC 15:00 (= SHIP S12) + ANKI 19:00 · banner F2 |
| mié 17-feb | ✅ LIVIANO presente (último día) · carril B `qcsv3…` 16:15 (II-8) · vibecoding · SYNAPSE |
| jue 18-feb | ✅ LIVIANO AUSENTE · carril B (II-3) · SYNAPSE presente |
| vie 19-feb | ✅ SYNAPSE presente (último día) · SIM #6 07:15 · sin carril B |
| lun 22-feb | ✅ SYNAPSE AUSENTE · overlay mini-sim `mgv06…` 16:15 + instancia genérica de `qcsv3…` (ver 9.5.1) · vibecoding presente |
| mié 24-feb | ✅ vibecoding presente (último día) |
| jue 25-feb | ✅ vibecoding AUSENTE |
| mar 20-abr | ✅ AURUM 30' `4eqm…` presente (último día) |
| mié 21-abr | ✅ AURUM AUSENTE |

**Verificación: OK** — 0 series borradas presentes en los días revisados · 0 duplicados (misma hora y mismo título) · hitos en su fecha v6.01. Barrido final por script de las 56 descripciones vivas: los únicos «mié 7-oct / mar 20-oct / C1/C2 / mini-sim 53 / 61-110 …» que quedan están en cláusulas de historial (v6.00) o son fechas v6.01 legítimas (p. ej. vie 30-oct = Nivel 3, vie 19-feb = fin del SYNAPSE).

### 9.5 Decisiones / pendientes
1. **lun 22-feb**: el mini-sim de reposición es un overlay FREE sobre la instancia genérica de la serie `qcsv3oe0e7rh2vkfq301ne68ko` (borrar esa instancia no estaba autorizado); la descripción de ambos explica que ese día la franja entera es el mini-sim.
2. **Títulos**: las 4 series recreadas conservan su título «· v6.00» (instrucción «mismos campos»); igual que las series del barrido (solo descripción). Si Joseph quiere el sufijo «v6.01» en los títulos, es un `update_event` de solo `summary` por id.
3. **`gen_research_calendar.js`** (texto fijo del script, no del Calendar): X-9 dice «antes del registro R10 (vie 19-mar-2027 …)» cuando R10 ya es mar 23-mar, y C-6 conserva «≤ 15-oct-2026». El overlay = payload exacto (por eso `--check` = 0); corregirlo es tarea de código (`DEADLINE`/`LABEL`) + nuevo `--print` / update / `--set`.
4. No tocados por no tener referencias desfasadas: EVAL F2 `uvpo4pgrtiqp3d9p07ail1fni8`, 🛡 lunes libre `qi3vsdal1gps5jkuovmdcmvklk`, Revisión semanal F4 `69tr6hqitr5fnanc2af5kvugnk`, DORMIR / DUCHA / ALISTARSE / VIAJE (sin texto), eventos ajenos (IBKR, YouTube) y los hitos 2027 (sin cambio).
5. Los días de NBME 25-27 caen ahora en VIERNES: coinciden con el mini-sim ENCAPS 16:15 y la sesión larga de GYM viernes (regla «mismo entreno, misma hora» en las descripciones); no se movió nada.
6. Sin `git commit/push`, sin Supabase/Vercel, sin `~/.claude` ni `.claude/settings.local.json`. Escrituras en el repo: `DATA/RESEARCH/_calendar_overlays.json` (script) y esta §9.

## 10. Cierre v6.01 (sáb 10-oct-2026, ~22:45 Lima · orquestador)
- **Research 🔬**: `gen_research_calendar.js` deriva del plan los textos de DEADLINE de C-6 (`carta-1`), T-1 (`tesis-etica`) y X-9 (`equipo`; R10 = mar 23-mar). Overlays C-6 `k2oov1tk0jalt5f45ekemej4k0`, T-1 `95aglmlk9qi32m4bv6v28rv5b0` y X-9 `nibrfidt3qhct59qhtrvqpqqi0` actualizados (solo descripción) + `--set` → **`--check` = 0** (12/12 «nada»). Respaldos `cal_bk/*_v601b.json`.
- **Lun 22-feb-2027**: borrada SOLO la instancia `qcsv3oe0e7rh2vkfq301ne68ko_20270222T211500Z` (serie carril B · reposición); la franja la ocupa el overlay `mgv06ho1cphr78rsqf9nrkgd7o` (mini-sim 25Q de reposición F1), cuya descripción lo dice. Respaldo `cal_bk/qcsv3oe0e7rh2vkfq301ne68ko_20270222T211500Z_v601b.json`.
- **Títulos «· v6.00» → «· v6.01»** (solo `summary`; recurrencia, horas, color y recordatorios intactos): VIBECODING `9jp7pkabng1bq2tll1ffrrncpc` · 6 USMLE F1 (`9274q14djfvggeajhor64oshj8`, `76dnlc30p3hnccenpvub2d9acg`, `c24k2n7k8qlhfimrrncf8rapgk`, `iuhj8busrh63ms7v4j5q8e9920`, `q72kvc9pm1brlqvl6383ccr9vs`, `c5e77csne1bnfps1iq7nqel84s`) · SYNAPSE `7nd90n5s3ueinen4q13dohcaq4` · R↔D `6us7kkdcuk3g7tm1cjes38leh0` · AURUM F1 `23t06e7foitmiqm24lpd0vo9jc` · MIR `uiduvkfsgs43p1u1qk1vohih58` / `hos0tfhsr2hdfs6cgv1rmejhrs` · LIVIANO `ap0li4otjf20mpiqpdqu8uj2ps` · REVISIÓN SEMANAL `k8iaefnjq0mnrlvkilhcarrik8` · F2: `bod921vej8ehllto18h0ieiuig`, `qqjhn7hnkugffrnvm5s9a0q46k`, `uvpo4pgrtiqp3d9p07ail1fni8`, `qcsv3oe0e7rh2vkfq301ne68ko`, `2fvbkunh0nfhvhbn1b6iqvpifs`, AURUM 30' `4eqm7ht2tbs537nuigit2e1u3k` · PRE-TEST `27bs58ee0ke180ht2rh6mgvft0` · SIM #1-#8 · DRESS `ip4lhi4lhigad4l1titbd36jnk` · D-1 `tl0irrsb4av0vd8d1ar8vmbuoo` · EXAMEN ENCAPS `8juk0mvl66tutdkbcei7umrs68` · 🛡 `3vrptnmtl9vppvs6nvv25s7p3c`. Los hitos 2027 (sin cambio de fecha en v6.01) conservan su etiqueta.
- `DATA/_scripts/_fechas_v6.json` `corrimientos[0].regla`: la bioestadística pasa al tramo 2 como fila desplazada (uid C79, dOrig 79, T3) vía `--f1-filas 57` (fechasV6.ts regenerado; --check ✓).

## 11. Corrimiento v6.02 (17-oct)

Ejecutado el sáb 17-oct-2026 (≈14:35-15:10 Lima). Motivo: del lun 12 al vie 16-oct sin estudio → **D1 = lun 19-oct-2026** (código en el commit `1058299`). Regla v6.02: hitos F1 ANCLADOS (UWSA1 = D1 lun 19-oct · NBME 25 vie 30-oct · 26 vie 20-nov · 27 vie 11-dic · 28 mié 30-dic = D52, último día de F1 · gates mié 11-nov / mié 9-dic); F1 = D1-D52; Heme/Onco desplazada + bioestadística → tramo 2 (T3-T8, jue 18 → lun 29-mar-2027); ENCAPS F1 dias 1-52 (43 banqueo + 9 mini-sims, checkpoint = mini-sim 45 vie 18-dic) + intensiva dias 53-102 (mismas fechas 4-ene → 12-mar) con 8 pendientes F1 repuestos en el carril B; secundarios: vibecoding → mié 3-mar · SYNAPSE → vie 26-feb · LIVIANO → mié 24-feb · AURUM → mar 27-abr · MIR diario → lun 8-feb, mant. → mar 4-may, ext. 123 filas; examen Step 1 SIN cambio (lun 27-sep-2027). Estado anterior = §9-§10 (v6.01).

Protocolo (igual que §9): `get_event` + respaldo JSON en `cal_bk/<id>_v602.json` ANTES de cada cambio (83 eventos + la instancia borrada `qcsv3…_20270302T211500Z` + `cal_bk/_calendar_overlays.before_set_v602.json` = 85 ficheros, solo en disco; `cal_bk/` está en `.gitignore`) · `notificationLevel: NONE` en todo create/update/delete · recrear = `create_event` (DTSTART original + mismos campos + UNTIL nuevo + EXDATE vigentes) → `get_event` → `delete_event` de la vieja · antes de cada recreación, `list_events` de TODO el rango DTSTART → UNTIL de la vieja comparado con la RRULE por script (`scratchpad/v602/cal/w/inst.js`): **0 instancias canceladas, movidas o editadas** en las 6 series (vibecoding 125/125 · SYNAPSE 179/179 · LIVIANO 120/120 · AURUM 30' 73/73 · SYNAPSE PC sáb 36/36 · dom 34/34), sin EXDATE extra. En los respaldos de la barrida (paso 5) `description`/`summary` salen del volcado `list_events` del 17-oct (mismo master, `updated` ≤ 10-oct) y el resto de campos de `get_event`. Textos nuevos generados por script desde la fuente (`build.js`/`build2.js`, cada reemplazo con aserción «exactamente una vez»).

### 11.1 Operaciones (91 escrituras en el Calendar + 1 script · + ronda FX-CAL v6.02b, filas 87-93: 6 escrituras + 1 script · + rondas v6.02c/v6.02d del orquestador, fila 94: 2 update_event, solo descripción = 99 escrituras y 2 pasadas de script)

77 `update_event` · 7 `create_event` (6 series recreadas + 1 overlay) · 7 `delete_event` (6 series viejas + 1 instancia) · 1 `gen_research_calendar.js --set`. **Ronda FX-CAL (sáb 17-oct, ≈15:35-15:45 Lima, filas 87-93): +6 `update_event` (solo `description` o solo `summary`; `notificationLevel: NONE`) + 1 `--set`**, respaldos `cal_bk/<id>_v602b.json` (6) + `cal_bk/_calendar_overlays.before_set_v602b.json`; volcados de instancias de las 6 series recreadas (los `list_events` previos a la recreación, de `scratchpad/v602/cal/w/inst/`, + el comparador `inst.js`) copiados a `cal_bk/inst_v602/` (ignorado por git, `.gitignore:53`).

| # | Tipo | Id viejo | Id nuevo | Título | Cambio | Respaldo |
|---|---|---|---|---|---|---|
| 1 | UPDATE | o1gla7846uae4tgngvc4q45osg | = | 🎯 UWSA1 · v6.02 | lun 12-oct ⇒ lun 19-oct 09:00-13:00 + título/descr. v6.02 (pre-test ENCAPS parte 1 hoy, parte 2 mar 20-oct) | cal_bk/o1gla7846uae4tgngvc4q45osg_v602.json |
| 2 | UPDATE | 4hjv5lkvluj06ahc2qndtsi6as | = | 🎯 NBME 25 · v6.02 | vie 23-oct ⇒ vie 30-oct 07:00-12:30 (D10) | cal_bk/4hjv5lkvluj06ahc2qndtsi6as_v602.json |
| 3 | UPDATE | lr7ktrbiffj4hrlke7lh7cv6h4 | = | 🎯 NBME 26 · v6.02 | vie 13-nov ⇒ vie 20-nov 07:00-12:30 (D25; deload lun 23-nov) | cal_bk/lr7ktrbiffj4hrlke7lh7cv6h4_v602.json |
| 4 | UPDATE | sm4baa2v453ifaub325h9v08mg | = | 🎯 NBME 27 · v6.02 | vie 4-dic ⇒ vie 11-dic 07:00-12:30 (D40) | cal_bk/sm4baa2v453ifaub325h9v08mg_v602.json |
| 5 | UPDATE | ecu784689p8osrhqabuct8d5jg | = | 🎯 NBME 28 · v6.02 | lun 28-dic ⇒ mié 30-dic 07:00-12:30 (D52 = última sesión de F1; contingencia sáb 2-ene 07:00-12:30, S11 a las 13:30) | cal_bk/ecu784689p8osrhqabuct8d5jg_v602.json |
| 6 | UPDATE | sfgp85kjua01v159rh1qrilr18 | = | 🚦 GATE F1 (D18) · v6.02 | todo el día mié 4-nov ⇒ mié 11-nov | cal_bk/sfgp85kjua01v159rh1qrilr18_v602.json |
| 7 | UPDATE | vvi7lk2c0c9nih1fqbi19p681s | = | 🚦 GATE F1 (D38) · v6.02 | todo el día mié 2-dic ⇒ mié 9-dic | cal_bk/vvi7lk2c0c9nih1fqbi19p681s_v602.json |
| 8 | UPDATE | oi557k66kql15oa6ptkjdipvis | = | 🧯 Colchón F1 CONSUMIDO (v6.02) · hoy D51 normal | mar 29-dic (fecha =): título + descr. (D51 Heme/Onco: anemias microcíticas) | cal_bk/oi557k66kql15oa6ptkjdipvis_v602.json |
| 9 | UPDATE | ag335n3dhvui11593us2lm448s | = | 🧯 Colchón F1 CONSUMIDO (v6.02) · hoy NBME 28 (último día de F1) | mié 30-dic (fecha =): título + descr. (NBME 28 + contingencia) | cal_bk/ag335n3dhvui11593us2lm448s_v602.json |
| 10 | UPDATE | ti163p5s6t4odtqmhvkl3mamac | = | 🇵🇪 CHECKPOINT DEL AÑO (mini-sim 45 · dia 45) · v6.02 | vie 18-dic (fecha =): «mini-sim 50» ⇒ «mini-sim 45 (dia 45)», cola larga I-1 + II-2 | cal_bk/ti163p5s6t4odtqmhvkl3mamac_v602.json |
| 11 | UPDATE | mgv06ho1cphr78rsqf9nrkgd7o | = | 🇵🇪 carril B · REPOSICIÓN F1: mini-sim 25Q (II-6 + II-10) · v6.02 | lun 22-feb 16:15 (fecha =): descr. dia 88 (v6.01: 93), sim_n 88, los 8 pendientes F1; título v6.02 | cal_bk/mgv06ho1cphr78rsqf9nrkgd7o_v602.json |
| 12 | CREATE | - | **ddfms7b6q2e3lhvvqqvr6el474** | 🇵🇪 carril B · REPOSICIÓN F1: mini-sim 25Q (I-10 + V-6) · v6.02 | mar 2-mar-2027 16:15-17:15 · color 6 · FREE · recordatorios por defecto · receta íntegra (II 8 · I 7 · V 5 · III 3 · IV 2 · 72 s/Q · umbral 18/25 · sim_n 94, origen sim_n 50 = mini-sim 50 de la F1 v6.01, sin rótulo de checkpoint) | - |
| 13 | DELETE-INST | qcsv3oe0e7rh2vkfq301ne68ko_20270302T211500Z | - | carril B · reposición mar 2-mar 16:15 | instancia genérica quitada (la franja la ocupa ddfms7b6…) | cal_bk/qcsv3oe0e7rh2vkfq301ne68ko_20270302T211500Z_v602.json |
| 14 | UPDATE-DESCR | qcsv3oe0e7rh2vkfq301ne68ko | = | F2 (4) carril B · reposición · F2 v6.02 | dias 85-100, los 8 pendientes F1 con su día, regla dia 53-84 (dia_mant 61-92); título v6.02; RRULE intacta | cal_bk/qcsv3oe0e7rh2vkfq301ne68ko_v602.json |
| 15 | UPDATE-DESCR | 4mfnu95lrhr3dmu87einr3jm5k | = | 🇵🇪 banner FASE INTENSIVA F2 (días 53-102 …) · v6.02 | fechas = (4-ene → 12-mar); dias 53-102, los 8 pendientes F1, fines de secundarios v6.02, backups v602; título v6.02 | cal_bk/4mfnu95lrhr3dmu87einr3jm5k_v602.json |
| 16 | UPDATE-DESCR | 27bs58ee0ke180ht2rh6mgvft0 | = | 🎯 PRE-TEST 2026-II · v6.02 | vie 8-ene (=): dia 62 ⇒ 57; 8 pendientes F1 se conservan | cal_bk/27bs58ee0ke180ht2rh6mgvft0_v602.json |
| 17-24 | UPDATE-DESCR | SIM #1-#8: g6t22lagnagt2sbrbo0n9d3u8k · tuqhgd12ibsc595kbemaqiu6k8 · uvogu0gd7kufpshe2o3fffopf8 · 6shb9jps4nir60khcd6h4g0jh8 · hl6ajs7etaqd6aici3s2vvema8 · 7afho3rf6igkk1odse31sqps4c · i3jhsk8hj6mj95aij99r6329mc · 2l4c2ct9iv6dkqvpcf6chtjnu0 | = | 🎯 SIM #1-#8 · v6.02 | fechas/horas =; «Dia N» − 5 (62 · 67 · 72 · 77 · 82 · 87 · 92 · 97); SIM #7 añade el mini-sim de reposición del mar 2-mar; título v6.02 | cal_bk/<id>_v602.json (8) |
| 25 | UPDATE-DESCR | ip4lhi4lhigad4l1titbd36jnk | = | 🎯 D-2 DRESS · v6.02 | jue 11-mar (=): dia 106 ⇒ 101 | cal_bk/ip4lhi4lhigad4l1titbd36jnk_v602.json |
| 26 | UPDATE-DESCR | tl0irrsb4av0vd8d1ar8vmbuoo | = | 🛌 D-1 MEDIO DÍA · v6.02 | vie 12-mar (=): dia 107 ⇒ 102 | cal_bk/tl0irrsb4av0vd8d1ar8vmbuoo_v602.json |
| 27 | UPDATE-DESCR | 8juk0mvl66tutdkbcei7umrs68 | = | 🏁 EXAMEN ENCAPS · v6.02 | dom 14-mar (=): F1 dias 1-52 (lun 19-oct →) · intensiva 53-102 | cal_bk/8juk0mvl66tutdkbcei7umrs68_v602.json |
| 28 | UPDATE-DESCR | 3vrptnmtl9vppvs6nvv25s7p3c | = | 🛡 D-1 hábil ENCAPS · v6.02 | vie 12-mar (=): dia 102 | cal_bk/3vrptnmtl9vppvs6nvv25s7p3c_v602.json |
| 29 | RECREAR | 9jp7pkabng1bq2tll1ffrrncpc | **ef7rfg1e2dpar1n6cb17j3cf44** | 🧠 VIBECODING 04:15-05:00 · v6.02 | DTSTART lun 31-ago-2026 · MO-FR · UNTIL 20270225T045959Z ⇒ 20270304T045959Z (último mié 3-mar) · EXDATE 25-dic / 31-dic / 1-ene (04:15) · color 9 · recordatorios por defecto · descr. v6.02 (S1-S9 SHIP sáb 24-oct … 19-dic, avance S10 26-dic, SHIP S10 2-ene / S11 9-ene / S12 16-ene, taper jue 14-ene → mié 3-mar) · 0 instancias editadas/canceladas (125/125) | cal_bk/9jp7pkabng1bq2tll1ffrrncpc_v602.json |
| 30 | RECREAR | 7nd90n5s3ueinen4q13dohcaq4 | **e37h4fl8gd0v7eavt1f9fgob0o** | 🧠 SYNAPSE misión 12:30-13:00 · v6.02 | DTSTART jue 11-jun-2026 · MO-FR · UNTIL 20270220T045959Z ⇒ 20270227T045959Z (último vie 26-feb) · EXDATE 25-dic / 31-dic / 1-ene (12:30) · color 9 · 0 editadas (179/179) | cal_bk/7nd90n5s3ueinen4q13dohcaq4_v602.json |
| 31 | RECREAR | ap0li4otjf20mpiqpdqu8uj2ps | **tah7p61p2hvn4nktgp2msl2eno** | ⚖️ LIVIANO 17:15-18:00 · v6.02 | DTSTART lun 31-ago-2026 · MO-FR · UNTIL 20270218T045959Z ⇒ 20270225T045959Z (último mié 24-feb) · EXDATE 25-dic / 31-dic / 1-ene (17:15) · color 7 · descr. v6.02 (casos vie 23-oct … vie 19-feb, capstone mar 23-feb) · 0 editadas (120/120) | cal_bk/ap0li4otjf20mpiqpdqu8uj2ps_v602.json |
| 32 | RECREAR | 4eqm7ht2tbs537nuigit2e1u3k | **ig6qhqufphhbj5jllghorm23fs** | 🪙 AURUM 30' 14:15-14:45 · v6.02 F2-F3 | DTSTART lun 4-ene-2027 · MO-FR · UNTIL 20270421T045959Z ⇒ 20270428T045959Z (último mar 27-abr) · EXDATE 12-mar, 15-mar, 25-mar, 26-mar (14:15) · color 5 · popup 5' · 0 editadas (73/73) | cal_bk/4eqm7ht2tbs537nuigit2e1u3k_v602.json |
| 33 | RECREAR | goknd2mvbkpqastc6n3rrhon5g | **bbj1ne6ken46pj25i5dt36idng** | 🧠 SYNAPSE — PC sábado (2h) | DTSTART sáb 13-jun-2026 15:00-17:00 · SA · UNTIL 20270214T045959Z ⇒ 20270221T045959Z (último sáb 20-feb = último sábado con contenido del motor) · sin EXDATE · color 9 · 0 editadas (36/36) | cal_bk/goknd2mvbkpqastc6n3rrhon5g_v602.json |
| 34 | RECREAR | frsvkuk585gmcte6bufo6dkfto | **c010a16rsl6h0lk4krr0a9r3rs** | 🧠 SYNAPSE — repaso + PC domingo (2h) | DTSTART dom 28-jun-2026 15:00-17:00 · SU · UNTIL 20270215T045959Z ⇒ 20270222T045959Z (último dom 21-feb = último domingo del motor) · sin EXDATE · color 9 · 0 editadas (34/34) | cal_bk/frsvkuk585gmcte6bufo6dkfto_v602.json |
| 35-46 | UPDATE | 12 overlays 🔬 (mismos ids) | = | RESEARCH M1 · C-2 · T-1 · C-6 · CR-1 · T-8 · CR-8 · CR-9 · X-1 · X-9 · R10 · R43 | payload exacto de gen_research_calendar.js --print: M1 vie 16-oct ⇒ lun 26-oct · C-2 lun 26-oct ⇒ mar 3-nov · T-1 mié 28-oct ⇒ jue 5-nov · C-6 vie 13-nov ⇒ lun 23-nov · CR-1 jue 19-nov ⇒ mié 25-nov · T-8 lun 21-dic ⇒ mié 23-dic · CR-8 mar 12-ene (=, texto d29) · CR-9 jue 11-feb (=, texto d31) · X-1 mar 29-dic ⇒ mar 23-feb-2027 · X-9 mié 17-mar ⇒ lun 29-mar · R10 mar 23-mar ⇒ vie 2-abr (13:30-14:15) · R43 mar 20-jul ⇒ mar 27-jul (todo el día) | cal_bk/<id>_v602.json (12) |
| 47 | SCRIPT | DATA/RESEARCH/_calendar_overlays.json | - | gen_research_calendar.js --set (12 hitos) → --check | exit 0 · 12/12 «nada» · md5 e4531c36… ⇒ 35dcf32d… · copia previa cal_bk/_calendar_overlays.before_set_v602.json | - |
| 48-53 | UPDATE-DESCR | 6 series USMLE F1: 9274q14djfvggeajhor64oshj8 · 76dnlc30p3hnccenpvub2d9acg · c24k2n7k8qlhfimrrncf8rapgk · iuhj8busrh63ms7v4j5q8e9920 · q72kvc9pm1brlqvl6383ccr9vs · c5e77csne1bnfps1iq7nqel84s | = | ANKI AM · repaso · pre-test · deep prime · 30Q · eval (· v6.02) | F1 = D1 lun 19-oct → D52 mié 30-dic (52 sesiones; NBME 28 = D52), hitos anclados, desplazadas T3-T8; 30Q: N1 vie 23-oct / 27-nov · N3 vie 6-nov, 13-nov, 4-dic, 18-dic · sin N4 en F1; uWorld F1 ~1.710 / total 3.260 (margen 399); título v6.02; RRULE/UNTIL 20261231 intactos | cal_bk/<id>_v602.json (6) |
| 54-55 | UPDATE-DESCR | ENCAPS 16:15 papebi46etlo8glgfs5akd5mig · carril B d8252hjo5ra2qlqb9bccd6vkjo | = | 🇵🇪 ENCAPS 16:15 | F1 dias 1-52 (43 + 9; checkpoint mini-sim 45) · arranque lun 19 / mar 20-oct · stock V-2 < mié 4-nov, III-5 < jue 19-nov, II-5 < lun 23-nov · 8 pendientes F1 · carril B 1 → 16-feb = dias 73-84 · huella 102 · 60e16744… / backups v602; RRULEs intactas | cal_bk/<id>_v602.json (2) |
| 56-59 | UPDATE-DESCR | F2 bod921vej8ehllto18h0ieiuig · qqjhn7hnkugffrnvm5s9a0q46k · uvpo4pgrtiqp3d9p07ail1fni8 · 2fvbkunh0nfhvhbn1b6iqvpifs | = | Anki 05:00 · LOOP · EVAL 20Q · STEP 1 VIVO (· F2 v6.02) | dias 53-102 · LOOP: códigos del barrido vs carril B en los 8 días de pendientes · fines de SYNAPSE (vie 26-feb), LIVIANO (mié 24-feb), AURUM (mar 27-abr), vibecoding (mié 3-mar) · STEP 1 VIVO sin Heme/Onco desplazada ni bioestadística · EVAL 20Q: solo título + pie v6.02; RRULEs intactas | cal_bk/<id>_v602.json (4) |
| 60-61 | UPDATE-DESCR | MIR uiduvkfsgs43p1u1qk1vohih58 · hos0tfhsr2hdfs6cgv1rmejhrs | = | 🇪🇸 MIR 15:15 / 15:30 · v6.02 | diario lun 19-oct → lun 8-feb (D77 vie 5-feb · D78 lun 8-feb) · mant. 57 mar 9-feb → mar 4-may (12 Tier C; lun 3 y mar 4-may ya en el SERUMS) · ext. 123 filas mié 5-may → vie 24-sep; UNTIL vie 30-abr intacto (regla «día previo al SERUMS») | cal_bk/<id>_v602.json (2) |
| 62 | UPDATE-DESCR | 6us7kkdcuk3g7tm1cjes38leh0 | = | 🔬 RESEARCH ↔ 💎 DERMA · v6.02 | arranque lun 19-oct DERMA d1 / mar 20 RESEARCH R0 · Research c1 mar 20-oct → mié 17-mar (R6/R7/X-1 tras la pausa), c2 vie 19-mar → mar 31-ago · Derma c1 lun 19-oct → vie 14-may, c2 lun 17-may → vie 23-jul · hitos 🔬 v6.02; UNTIL vie 30-abr intacto | cal_bk/6us7kkdcuk3g7tm1cjes38leh0_v602.json |
| 63 | UPDATE-DESCR | 23t06e7foitmiqm24lpd0vo9jc | = | 🪙 AURUM F1 · v6.02 F1 | D1 lun 19-oct → D130 mar 27-abr; pitches v1 vie 6-nov … v7 mar 27-abr; F1 = D1-D52 hasta mié 30-dic (UNTIL intacto); remite a la serie 30' nueva ig6qhqufphhbj5jllghorm23fs | cal_bk/23t06e7foitmiqm24lpd0vo9jc_v602.json |
| 64-65 | UPDATE-DESCR | ANKI sáb 00929or8op5hj28s3nbf1eo09c · dom 0ar1fbrm3ts396kd96f8df753g | = | ANKI (títulos sin versión: intactos) | régimen v6.02 (F1 lun 19-oct → mié 30-dic) · víspera del D1 = dom 18-oct; RRULE abiertas + EXDATE intactas | cal_bk/<id>_v602.json (2) |
| 66 | UPDATE-DESCR | k8iaefnjq0mnrlvkilhcarrik8 | = | 📋 REVISIÓN SEMANAL · v6.02 | S00 sáb 17-oct · S01 sáb 24-oct … S04_2026-11-14 · S05_2026-11-21 · S06 28-nov y S11_2027-01-02 DELOAD (S11 = auditoría del NBME 28; contingencia NBME 28 sáb 2-ene 07:00-12:30 → revisión 13:30) · S12-S20 PAUSA ENCAPS · S22 sáb 20-mar = S12/39 … S28 = S18/39 · gates mié 11-nov / 9-dic · deload lun 23-nov y lun 28-dic; RRULE intacta | cal_bk/k8iaefnjq0mnrlvkilhcarrik8_v602.json |
| 67-86 | UPDATE-DESCR | 20 rutinas personales: GYM lun 6740kavnfkdcvj5k149ouliauu · GYM mar 0dpes0ekv96a453e89m5osg06t · GYM jue 4qvs34d84u82psvknpqhv3jc7a · GYM vie 7sf8i7pe62pugfk4t6tcnbb9i4 · BAILE mié 0tod56pc6pgecm5lf7g4e3ji9v · BAILE mar 09me7atu516gb0k6u0rbfcj8q1 · BAILE jue 3m8m4resu8akph4a7qfuf3h1qn · BAILE vie 5pd4jhmvl31hvbuh40vphpoc4q · BAILE sáb 3jkfb6097rtc1jbec19eg3sd57 · BAILE lun 64lue1en3hk0cf8itml2rtlqi4 · BAILE dom 7j6pucil43vuca70p082g5ub3d · BAILE PRACTICA 13m3tcqjjc34rt6iqfblla18q1 · EKER 22bh9m5jhc7ro6aj3m4ffjad7g · ALMUERZO 43dq3oib16esjcqj1dcd8osot2 · DESAYUNO L-V 7agi60f2bp8qnh6cnqvfo22giv · DESAYUNO S-D 2u9je70pif58hgf2f8t3vgu8b8 · CORRER 5mrm4ru08go9k70408jm8vcjku · CALISTENIA 2lpvftrc3fp64e0om6qg0mcs34 · LECTURA 7jmf8p1l5b5q6jbtmj9uualiq8 · VIAJE VUELTA 3l59kpei7sg0l6kq51343or383 | = | títulos intactos | «Régimen v6.02 (D1 = lun 19-oct-2026; v6.01: lun 12-oct)» + hitos por día de la semana recalculados (lunes: UWSA1 19-oct, NBME 30/33, Free 120; martes: UWSA3/UWSA2; miércoles: NBME 28 30-dic, 29, 31, gates 11-nov/9-dic; viernes: NBME 25 30-oct, 26 20-nov, 27 11-dic, 32; mini-sims F1 vie 23-oct → vie 18-dic; víspera del D1 dom 18-oct); recurrencias, colores y recordatorios intactos (EKER conserva popup 0') | cal_bk/<id>_v602.json (20) |
| 87 | UPDATE-DESCR | 3i88pp1gj84vc0r6tuherhsc0o | = | 🚦 GO/NO-GO Step 1 (E-49) · … · v6.00 (título intacto) | lun 9-ago-2027 (=): «Si el checkpoint NBME 28 (lun 28-dic-2026 en v6.01; ⏸ v6.00: mar 22-dic)…» ⇒ «(mié 30-dic-2026 = d52, último día de F1, en v6.02; ⏸ v6.01: lun 28-dic · ⏸ v6.00: mar 22-dic)…» · pie ⇒ «(v6.02 · 17-oct-2026: D1 = lun 19-oct; fecha del GO/NO-GO sin cambio)»; el resto del texto no cita fechas F1 | cal_bk/3i88pp1gj84vc0r6tuherhsc0o_v602b.json |
| 88 | UPDATE-DESCR | ae93qv0nqqs36h439hid1jcq8o | = | 🎯 NBME 29 (200Q) · … · v6.00 (título intacto) | mié 17-mar-2027 (=): «Lo que sigue…» empieza con «T3-T8 (jue 18 → lun 29-mar) = Heme/Onco desplazada de F1 (v5.20 D52-D54, D56, D57) + bioestadística (ex D79);» (= `DIAS_T2` T3-T8 de `usmleStep1Daily.ts`: C52 jue 18 · C53 vie 19 · C54 lun 22 · C56 mar 23 · C57 mié 24 · C79 lun 29-mar) + pie «(v6.02 · 17-oct-2026: D1 = lun 19-oct; fecha del NBME 29 sin cambio)» | cal_bk/ae93qv0nqqs36h439hid1jcq8o_v602b.json |
| 89 | UPDATE-TÍTULO | 69tr6hqitr5fnanc2af5kvugnk | = | 📋 Revisión semanal 20' (dentro del Step 1 del sábado) · F4 PROVISIONAL · v6.02 | solo `summary` «· v6.01» ⇒ «· v6.02»; descripción, RRULE (UNTIL 20270918, SA) y todo el día intactos (las 12 instancias del volcado `list_events` hasta el 27-jul llevan el título nuevo) | cal_bk/69tr6hqitr5fnanc2af5kvugnk_v602b.json |
| 90 | UPDATE-DESCR | 36tp7b995jnoi844d5uvgm58t0 | = | 🔬 RESEARCH · CR-1 (mié 25-nov, =) | payload exacto de `--print`: FECHA LÍMITE con el disparador v6.02 «si el vie 13-nov (C-3 = d10 en v6.02, ~3 semanas desde M1 lun 26-oct; ⏸ v6.01: jue 5-nov / M1 vie 16-oct · …)» + «⚠ v6.02: CR-1 cae el mié 25-nov y CR-2 el vie 27-nov, ya después del 31-oct (+25 / +27 días) · ⏸ v6.01: CR-1 jue 19-nov / CR-2 lun 23-nov …» | cal_bk/36tp7b995jnoi844d5uvgm58t0_v602b.json |
| 91 | UPDATE-DESCR | nibrfidt3qhct59qhtrvqpqqi0 | = | 🔬 RESEARCH · X-9 (lun 29-mar, =) | payload exacto: historial «⏸ v6.01: X-9 mié 17-mar / R10 mar 23-mar · v6.00: X-9 jue 11-mar / R10 vie 19-mar · v5.20: …» | cal_bk/nibrfidt3qhct59qhtrvqpqqi0_v602b.json |
| 92 | UPDATE-DESCR | 2k9idr3f3th6hj1e4r8ugj4iqk | = | 🔬 RESEARCH · R10 (vie 2-abr 13:30-14:15, =) | payload exacto: «FECHA LÍMITE EXTERNA: ≤ 31-mar-2027» (falso) ⇒ «OBJETIVO RUTA ≤ 31-mar-2027 · v6.02: el átomo cae vie 2-abr (+2 d; decisión (iii) de Joseph en PENDIENTES) · no es plazo externo: PROSPERO solo exige registrar ANTES del cribado (R18, vie 30-abr-2027)» | cal_bk/2k9idr3f3th6hj1e4r8ugj4iqk_v602b.json |
| 93 | SCRIPT | DATA/RESEARCH/_calendar_overlays.json | - | `gen_research_calendar.js` (código: `cr-caso` pasa a función que lee C-3/CR-2/M1 del plan · `equipo` con historial v6.01 · `PROSPERO-SR1` sale de `DEADLINE` y pasa al mapa nuevo `OBJETIVO_RUTA`) | `--check` exit 1 (3 «recrear»: CR-1, X-9, R10, solo texto) → `--print` → update ×3 → `--set` de los 12 hitos con sus ids actuales → `--check` **exit 0 · 12/12 «nada»** · md5 35dcf32d… ⇒ 9b618889… · `researchDailyPlan*.ts`, `daily-plan.md` y `obsidianResearchMap.ts` sin cambios (los textos viven en `gen_research_calendar.js`, no en `gen_research_plan.js`: no hubo que regenerar el plan) | cal_bk/_calendar_overlays.before_set_v602b.json |
| 94 | UPDATE-DESCR | 3i88pp1gj84vc0r6tuherhsc0o | = | 🚦 GO/NO-GO Step 1 (E-49) · … · v6.00 (título intacto) | lun 9-ago-2027 (=), ronda v6.02c del orquestador: cláusula del adelanto «Con el adelanto (ENCAPS ≤ 21-mar → examen mar 31-ago)…» ⇒ «Con el adelanto (v6.02: solo con ENCAPS dom 14-mar → examen mar 31-ago; con 21-mar la regla de cálculo ya pide 27-sep, ver V6_ESPEC §I, fila «Convocatoria», y gen_fechas_v6.js --calculo · ⏸ v6.00 · v6.01: ENCAPS ≤ 21-mar)…»; resto intacto · ronda v6.02d (2.º update, misma tarde): solo la remisión «§I(1)» ⇒ «§I, fila «Convocatoria»» | cal_bk/3i88pp1gj84vc0r6tuherhsc0o_v602c.json · _v602d.json |

Todas las descripciones tocadas terminan con «(v6.02 · 17-oct-2026: D1 = lun 19-oct)» (72/72 comprobadas en vivo; los 12 overlays 🔬 llevan el payload exacto del script, sin pie). Títulos: llevan «· v6.02» los hitos re-fechados, las 4 series recreadas que ya llevaban versión (vibecoding, SYNAPSE 12:30, LIVIANO, AURUM 30'), los overlays ENCAPS (`mgv06…`, `ddfms…`), el banner y los eventos F2, las 6 USMLE F1, MIR ×2, R↔D, AURUM F1 y REVISIÓN SEMANAL; SYNAPSE PC sáb/dom, ANKI y las 20 rutinas no llevan versión en el título y lo conservan.

### 11.2 IDs vigentes que cambian respecto de §9.2

| Serie / evento | Id vigente (v6.02) | Rango / fecha |
|---|---|---|
| 🧠 VIBECODING 04:15-05:00 · v6.02 | `ef7rfg1e2dpar1n6cb17j3cf44` | DTSTART lun 31-ago-2026 · MO-FR · UNTIL 20270304T045959Z (último mié 3-mar) · EXDATE 25-dic, 31-dic, 1-ene · color 9 |
| 🧠 SYNAPSE misión 12:30-13:00 · v6.02 | `e37h4fl8gd0v7eavt1f9fgob0o` | DTSTART jue 11-jun-2026 · MO-FR · UNTIL 20270227T045959Z (último vie 26-feb) · EXDATE 25-dic, 31-dic, 1-ene · color 9 |
| ⚖️ LIVIANO 17:15-18:00 · v6.02 | `tah7p61p2hvn4nktgp2msl2eno` | DTSTART lun 31-ago-2026 · MO-FR · UNTIL 20270225T045959Z (último mié 24-feb) · EXDATE 25-dic, 31-dic, 1-ene · color 7 |
| 🪙 AURUM 30' núcleo F2-F3 · v6.02 | `ig6qhqufphhbj5jllghorm23fs` | lun 4-ene → mar 27-abr-2027 · MO-FR · UNTIL 20270428T045959Z · EXDATE 12-mar, 15-mar, 25-mar, 26-mar · color 5 · popup 5' |
| 🧠 SYNAPSE — PC sábado (2h) | `bbj1ne6ken46pj25i5dt36idng` | DTSTART sáb 13-jun-2026 15:00-17:00 · SA · UNTIL 20270221T045959Z (último sáb 20-feb) · color 9 |
| 🧠 SYNAPSE — repaso + PC domingo (2h) | `c010a16rsl6h0lk4krr0a9r3rs` | DTSTART dom 28-jun-2026 15:00-17:00 · SU · UNTIL 20270222T045959Z (último dom 21-feb) · color 9 |
| 🇵🇪 carril B · REPOSICIÓN F1: mini-sim 25Q (I-10 + V-6) · v6.02 (nuevo) | `ddfms7b6q2e3lhvvqqvr6el474` | mar 2-mar-2027 16:15-17:15 (overlay FREE, color 6) |
| Mismos ids, fecha nueva | UWSA1 `o1gla7846…` lun 19-oct 09:00-13:00 · NBME 25 `4hjv5lkv…` vie 30-oct · NBME 26 `lr7ktrbi…` vie 20-nov · NBME 27 `sm4baa2v…` vie 11-dic · NBME 28 `ecu78468…` mié 30-dic (07:00-12:30) · GATE D18 `sfgp85kj…` mié 11-nov · GATE D38 `vvi7lk2c…` mié 9-dic · overlays 🔬 según §11.3 | — |

Ya no existen (borrados el 17-oct; respaldo en `cal_bk/<id>_v602.json`): `9jp7pkabng1bq2tll1ffrrncpc` (vibecoding v6.01) · `7nd90n5s3ueinen4q13dohcaq4` (SYNAPSE 12:30 v6.01) · `ap0li4otjf20mpiqpdqu8uj2ps` (LIVIANO v6.01) · `4eqm7ht2tbs537nuigit2e1u3k` (AURUM 30' v6.01) · `goknd2mvbkpqastc6n3rrhon5g` (SYNAPSE PC sáb, hasta sáb 13-feb) · `frsvkuk585gmcte6bufo6dkfto` (SYNAPSE PC dom, hasta dom 14-feb) · instancia `qcsv3oe0e7rh2vkfq301ne68ko_20270302T211500Z` (carril B genérico del mar 2-mar 16:15; la serie sigue).

### 11.3 Research 🔬 — `gen_research_calendar.js`
- `--check` inicial: exit 1 · 12 «recrear» (10 por fecha + CR-8 y CR-9 solo por texto).
- `--print` → `update_event` de los 12 con el payload exacto (M1 lun 26-oct · C-2 mar 3-nov · T-1 jue 5-nov · C-6 lun 23-nov · CR-1 mié 25-nov · T-8 mié 23-dic · CR-8 mar 12-ene · CR-9 jue 11-feb · X-1 mar 23-feb-2027 · X-9 lun 29-mar · R10 vie 2-abr 13:30-14:15 · R43 mar 27-jul todo el día) → `--set mentor=… carta-diana=… tesis-etica=… carta-1=… cr-caso=… tesis-L0=… cr-paquete=… case-report-1=… revisor2=… equipo=… PROSPERO-SR1=… SR-1=…` (mismos 12 ids).
- **`--check` final: exit 0 · 12/12 «nada» · 0 discrepancias.** El script reescribió `DATA/RESEARCH/_calendar_overlays.json` (md5 e4531c36… → 35dcf32d… → **9b618889…** tras la ronda FX-CAL, fila 93; commit `b694d8d`).

### 11.4 Verificación (list_events, 17-oct)
22 volcados guardados (2.031 eventos únicos) + 4 días leídos en línea; comparación por script (`scratchpad/v602/cal/w/ver.js`, `stale.js`) contra los textos generados y el payload Research.

| Día / ventana | Resultado |
|---|---|
| lun 12-oct · vie 16-oct | ✅ SIN UWSA1 · SIN M1 (fechas v6.01) |
| lun 19 → dom 25-oct | ✅ UWSA1 lun 19-oct 09:00 · 6 USMLE F1 · vibecoding `ef7r…`, SYNAPSE `e37h…` y LIVIANO `tah7…` 5/5 días · R↔D · AURUM F1 · MIR ×2 · ENCAPS 16:15 · 20 rutinas · sáb 24 PC `bbj1…` + REVISIÓN + ANKI · dom 25 PC `c010…` · NBME 25 ya no el vie 23-oct |
| lun 26 → vie 30-oct | ✅ M1 lun 26-oct · NBME 25 vie 30-oct 07:00-12:30 |
| mar 3 → jue 5-nov | ✅ C-2 mar 3-nov · T-1 jue 5-nov · sin GATE el mié 4-nov |
| mié 11 → vie 13-nov | ✅ GATE D18 mié 11-nov · sin NBME 26 el vie 13-nov |
| jue 19 → mié 25-nov | ✅ NBME 26 vie 20-nov · C-6 lun 23-nov · CR-1 mié 25-nov · sin CR-1 el jue 19-nov |
| mié 2 → vie 4-dic | ✅ sin GATE ni NBME 27 |
| mié 9 → vie 11-dic | ✅ GATE D38 mié 9-dic · NBME 27 vie 11-dic |
| vie 18 → mié 23-dic | ✅ CHECKPOINT (mini-sim 45 · dia 45) vie 18-dic · T-8 mié 23-dic · sin T-8 el lun 21-dic |
| lun 28-dic → dom 3-ene | ✅ sin NBME 28 el lun 28 · 🧯 mar 29 (D51) · 🧯 + NBME 28 mié 30 · sin X-1 el mar 29 · 0 instancias de vibecoding/SYNAPSE/LIVIANO el 31-dic y el 1-ene |
| lun 4 → vie 8-ene | ✅ F2 L-V (Anki 05:00 `bod9…`, LOOP `qqjh…`, EVAL 20Q `uvpo…`) + AURUM 30' `ig6q…` desde el lun 4 · banner (todo el día 4-ene → 12-mar) · PRE-TEST vie 8-ene · STEP 1 VIVO `2fvb…` visto en sáb 20 y 27-feb |
| mar 12 → vie 15-ene · vie 22 / 29-ene · vie 5-feb | ✅ CR-8 mar 12-ene · SIM #1-#4 en su viernes |
| jue 11 → vie 12-feb | ✅ CR-9 jue 11-feb · SIM #5 vie 12-feb |
| vie 19 → jue 25-feb | ✅ SIM #6 · PC sáb 20 / dom 21 (últimos) · overlay `mgv06…` lun 22 16:15 · X-1 mar 23 · LIVIANO mié 24 (último) y AUSENTE jue 25 |
| vie 26-feb → vie 5-mar | ✅ SYNAPSE vie 26 (último) y AUSENTE lun 1-mar · SIM #7 vie 26 · sin PC sáb 27 / dom 28 · mar 2-mar: overlay `ddfms…` 16:15 y SIN instancia `qcsv3…` · vibecoding mié 3 (último) y AUSENTE jue 4 · SIM #8 vie 5 |
| jue 11 → lun 15-mar | ✅ DRESS jue 11 · D-1 + 🛡 vie 12 · EXAMEN ENCAPS dom 14 |
| mié 17-mar · mar 23-mar | ✅ sin X-9 ni R10 (fechas v6.01) |
| lun 29-mar → vie 2-abr | ✅ X-9 lun 29-mar · R10 vie 2-abr 13:30 |
| mar 27 → mié 28-abr | ✅ AURUM 30' mar 27 (último) y AUSENTE mié 28 |
| mar 20-jul · mar 27-jul | ✅ sin R43 el 20 · R43 todo el día el 27 (= payload) |

**Verificación: OK** — 72/72 títulos y descripciones idénticos al texto generado (todas con el pie v6.02) · 25/25 hitos y eventos sueltos en su fecha (una sola instancia cada uno) · 12/12 overlays 🔬 = payload · 6/6 series recreadas con su último día presente y 0 instancias posteriores · 0 instancias de las 6 series borradas · 0 instancias `qcsv3…` el 2-mar · 0 duplicados (misma hora y mismo título en series distintas). Barrido de restos (`stale.js`, **solo sobre los eventos tocados ese día**, los que llevan el pie «17-oct-2026»): 45 coincidencias de patrones v6.01 (D57, 58-107, «NBME 25 vie 23-oct», gates 4-nov / 2-dic, «mini-sim 50»…), todas en cláusulas de historial («v6.01: …», «Historial: …») o en la numeración v5.20 de Heme/Onco (D52-D57); la única fecha vigente que coincide es «reponer V-2 antes del mié 4-nov» (ENCAPS 16:15), que es el plazo de stock v6.02. **Corrección (FX-CAL, 17-oct):** «restos v6.01 solo en historial» valía solo para ese conjunto. Fuera de él —los 12 overlays 🔬 (payload del script, sin pie) y los hitos 2027 no re-fechados— sí quedaban textos v6.01 presentados como vigentes o falsos: GO/NO-GO `3i88…` («NBME 28 (lun 28-dic-2026 en v6.01…)» + pie v6.01), CR-1 `36tp…` (disparador C-3 jue 5-nov / M1 vie 16-oct y «⚠ v6.01» como aviso vigente), X-9 `nibr…` (historial sin v6.01), R10 `2k9i…` («FECHA LÍMITE EXTERNA: ≤ 31-mar-2027», falso), título de la Revisión semanal F4 `69tr…` («· v6.01») y NBME 29 `ae93…` (sin las filas desplazadas T3-T8). Corregidos en las filas 87-93 y comprobados en vivo (`list_events`: CR-1, X-9, R10 y NBME 29 = texto generado; 12/12 instancias F4 con el título nuevo; GO/NO-GO = respuesta de `update_event`). Revisados uno a uno con `get_event` los demás hitos 2027 (NBME 30-33 y sus ventanas, UWSA3 / UWSA2 y ventanas, Free 120 y ventana, D94, D95, ritual, viaje, regreso, EXAMEN Step 1, 🛡 lunes libre 15-mar): ninguno cita fechas F1 ni el colchón v6.01 («38 filas», «≈100 h») → sin cambios; conservan su etiqueta v6.00 (fecha sin cambio).

### 11.5 Decisiones / pendientes
1. **SYNAPSE PC sáb/dom** (no se tocaron en v6.01): recreadas con la regla «último sábado / domingo con contenido del motor» → sáb 20-feb / dom 21-feb (antes 13 / 14-feb).
2. **No recreadas** (su UNTIL no depende del D1 o ya es correcto): 6 USMLE F1 (UNTIL 31-dic), AURUM F1 (fin de F1), MIR ×2 y R↔D (UNTIL vie 30-abr = día previo al SERUMS), ANKI sáb/dom (abiertas), REVISIÓN SEMANAL (UNTIL 2-may), ENCAPS 16:15 y carril B. No hay series de Business en el Calendar.
3. **mar 2-mar-2027**: nuevo mini-sim 25Q de reposición `ddfms…` (I-10 + V-6, sim_n 94 = ex mini-sim 50 de la F1 v6.01) + borrada la instancia genérica de `qcsv3…` (misma regla que §10 para el 22-feb). Igual que el 22-feb, el texto no dice nada de la corrección del día siguiente.
4. **NBME 28 = mié 30-dic** (D52, último día de F1): la contingencia sáb 2-ene 07:00-12:30 con la revisión S11 a las 13:30 está SOLO en los textos (NBME 28, 🧯 30-dic, REVISIÓN SEMANAL); no se creó evento de contingencia.
5. **Sin tocar**: Revisión semanal F4 `69tr6hqitr5fnanc2af5kvugnk` (no cita fechas F1; conserva «· v6.01» en el título → **título corregido a «· v6.02» en FX-CAL, fila 89**), 🛡 lunes libre `qi3vsdal1gps5jkuovmdcmvklk`, DORMIR / DUCHA / ALISTARSE / VIAJE (sin texto), hitos 2027 (NBME 29+ sin cambio de fecha → **en FX-CAL, solo descripción del GO/NO-GO y del NBME 29, filas 87-88**; el resto revisado sin cambios, §11.4), eventos ajenos. EVAL 20Q `uvpo…`: solo título + pie. `papebi46…` (ENCAPS 16:15) sigue citando las 3 instancias SKIP borradas (25-dic / 31-dic / 1-ene), lo que sigue siendo cierto.
6. ~~**Research, texto fijo del script** (el overlay = payload exacto, por eso `--check` = 0): R10 dice «FECHA LÍMITE EXTERNA: ≤ 31-mar-2027» pero cae el vie 2-abr; el historial de X-9 salta la v6.01 («⏸ v6.00 … · v5.20 …»); CR-1 conserva referencias v6.01 en su FECHA LÍMITE (M1 vie 16-oct, C-3 jue 5-nov, «vie 13-nov»). Corregirlo es tarea de código (`gen_research_plan.js` / `gen_research_calendar.js`: DEADLINE / AVISOS) + nuevo `--print` / update / `--set`.~~ **HECHO en FX-CAL (filas 90-93)**: los tres textos vivían en `DEADLINE` de `gen_research_calendar.js` (no en el plan). **R10 / PROSPERO:** el «≤ 31-mar-2027» NO es un plazo externo —PROSPERO no tiene fecha límite, solo exige registrar antes de empezar el cribado (R18, vie 30-abr-2027)— sino el objetivo propio de `RUTA_PUBLICACION_2027.md` (tabla de entregables, `prospero-SR-1`). Por eso `PROSPERO-SR1` sale de `DEADLINE` y pasa a un mapa nuevo `OBJETIVO_RUTA` («OBJETIVO RUTA ≤ 31-mar-2027 · v6.02: el átomo cae vie 2-abr (+2 d; decisión (iii) de Joseph en PENDIENTES) · …»). Los +2 días se aceptan como parte de la decisión (iii) (Research: plazos internos y átomos desplazados); `DATA/PENDIENTES_JOSEPH.md` (iii) ya lo recoge (FX-DOCS, 17-oct). CR-1 deriva ahora del plan el disparador C-3 (d10 vie 13-nov), M1 (lun 26-oct) y CR-1/CR-2 (+25 / +27 días sobre el 31-oct), con lo de v6.01 como historial ⏸; X-9 añade «⏸ v6.01: X-9 mié 17-mar / R10 mar 23-mar». Al próximo corrimiento, lo rotulado «v6.02» en estos textos pasa a historial.
7. Sin `git commit/push`, sin Supabase/Vercel, sin `~/.claude` ni `.claude/settings.local.json`. Escrituras en el repo: `DATA/RESEARCH/_calendar_overlays.json` (script `--set`) y esta §11; respaldos solo en `cal_bk/` (ignorado: `.gitignore:53`). FX-CAL añade `DATA/_scripts/gen_research_calendar.js` (DEADLINE `cr-caso`/`equipo` + `OBJETIVO_RUTA`; nada de `src/`) y otra pasada `--set` sobre `_calendar_overlays.json`; mismas exclusiones.

## 12. Semana 1 estructurada (dom 18-oct-2026 · orquestador)

Joseph: «déjalo todo listo para empezar mañana… que todo esté estructurado y definido (qué / cuánto / cómo leer)». La app pasó a tener una guía por bloque (`src/lib/guia.ts` + `GuiaBloqueCard`); el Calendar se alinea con ella donde cambió la hora (respaldos en `cal_bk/semana1/*_s1.json`, solo en disco; `notificationLevel: NONE`):

| # | Tipo | Id | Cambio |
|---|---|---|---|
| 1 | UPDATE | `o1gla7846uae4tgngvc4q45osg` (UWSA1) | lun 19-oct 09:00-13:00 ⇒ **08:50-13:00** (4 × 40Q × 90 s + pausa no caben en 09:00-13:00) · descripción = cronograma de la app (B1+B2 · pausa 10′ 10:50 · B3+B4 · almuerzo 13:00) + revisión Day-After en 6 franjas (lun 18:00 → jue 18:00) |
| 2 | UPDATE (instancia) | `e37h4fl8gd0v7eavt1f9fgob0o_20261019T173000Z` (SYNAPSE) | lun 19-oct 12:30 ⇒ **07:25-07:55** (dentro de la preparación del UWSA1) |
| 3 | UPDATE (instancia) | `43dq3oib16esjcqj1dcd8osot2_20261019T170000Z` (ALMUERZO) | lun 19-oct 12:00-12:30 ⇒ **13:00-13:30** + descripción del día |
| 4 | UPDATE (serie) | `7jmf8p1l5b5q6jbtmj9uualiq8` (LECTURA DE LIBRO) | 13:00-13:15 L-V ⇒ **📚 BUSINESS · lectura/escucha del libro (25′) 13:00-13:25** (franja Business de la app; ÁMBAR baja a 13:15 + siesta) |
| 5-8 | UPDATE (instancias) | SYNAPSE `…_20261030T173000Z` · `…_20261120T173000Z` · `…_20261211T173000Z` · `…_20261230T173000Z` | días de NBME (vie 30-oct · vie 20-nov · vie 11-dic · mié 30-dic) 12:30 ⇒ **13:00-13:30** |
| 9-12 | UPDATE (instancias) | ALMUERZO `43dq3oib16esjcqj1dcd8osot2_<día>T170000Z` | días de NBME 12:00 ⇒ **12:30-13:00** |
| 13-16 | UPDATE (instancias) | BUSINESS `7jmf8p1l5b5q6jbtmj9uualiq8_<día>T180000Z` | días de NBME 13:00 ⇒ **12:30-12:55** (audio durante el almuerzo) |

Regla vigente en todas las descripciones nuevas: **si el Calendar y la app difieren, manda la app** (la guía del día lleva qué/cuánto/cómo/enlaces). No tocado: SHIP del sábado (Calendar 120′, plan 150′: reparto 90 + 30 en la guía), Anki 05:00 (el texto de la serie es genérico; el lun 19 la guía es «configurar FSRS con el mazo vacío»).
- fila 17-19: BUSINESS de los viernes de NBME (30-oct · 20-nov · 11-dic) re-titulado «hoy NO (NBME) → OUTPUT el sáb 07:45-08:25» (la app no pone Business esos días).

## 13. Semana 1 corrida (lun 19-oct-2026 · v6.02d)

Orden de Joseph (lun 19-oct, sin estudio ese día): el plan del lun 19 pasa al mar 20, el del 20 al 21, el del 21 al 22, el del 22 al 23 y el del vie 23 se reparte entre el sáb 24 (mañana del vie 23 + eval USMLE 13:30) y el dom 25 (tarde del vie 23 adelantada 6 h 15′ + revisión semanal + cierre del OUTPUT de Business). **Desde el lun 26-oct nada cambia.** Código: `corrida_s1` en `DATA/_scripts/_fechas_v6.json` → `fechaPlanDe()` / `corridaS1De()` de `src/lib/fechasV6.ts` (la app muestra el contenido del día de plan; Supabase, planes y runners conservan su fecha de plan).

Ejecutado el lun 19-oct-2026 (≈15:38-15:43 Lima). Protocolo: `get_event` de cada evento antes de tocarlo (el `updated` coincidió con el volcado `list_events` previo) + respaldo JSON en `cal_bk/semana1b/<id>_v602d.json` (13 ficheros) + volcados `list_events` 19 → 27-oct antes y después (`cal_bk/semana1b/_list_events_19-27oct_{before,after}_v602d.json`; `cal_bk/` está en `.gitignore`). `notificationLevel: NONE` en todo. Sin `delete_event`, sin tocar RRULE/EXDATE de ninguna serie, sin tocar nada ≥ lun 26-oct, ni recordatorios de finanzas ni rutinas personales. Los textos largos se generaron por script con reemplazos «exactamente una vez» y se compararon en vivo después (descripción nueva = línea añadida + texto previo, carácter a carácter).

### 13.1 Operaciones (13 update_event + 13 create_event = 26 escrituras)

| # | Tipo | Id | Antes → después |
|---|---|---|---|
| 1 | MOVE + DESCR | `o1gla7846uae4tgngvc4q45osg` (🎯 UWSA1, título igual) | lun 19-oct 08:50-13:00 ⇒ **mar 20-oct 08:50-13:00** · descripción: «D1 DEL PLAN = mar 20-oct (lun 19 sin estudio · v6.02d semana 1 corrida)», Day-After 1/6 mar 20 18:00 · 2/6 mié 21 05:00 · 3/6 mié 21 07:15 · 4/6 mié 21 18:00 · 5/6 jue 22 18:00 · 6/6 + eval reducida vie 23 18:00, PRE-TEST ENCAPS parte 2 = mié 21, primer día de contenido = mié 21 (plan del mar 20), línea «Plan» con D1 mar 20, historial «→ v6.02d (19-oct): lun 19 → mar 20»; resto intacto |
| 2 | MOVE (instancia) | `e37h4fl8gd0v7eavt1f9fgob0o_20261020T173000Z` (🧠 SYNAPSE) | mar 20 12:30-13:00 ⇒ **07:25-07:55** (como la del lun 19, §12 fila 2); texto intacto |
| 3 | MOVE + DESCR (instancia) | `43dq3oib16esjcqj1dcd8osot2_20261020T170000Z` (ALMUERZO) | mar 20 12:00-12:30 ⇒ **13:00-13:30** · descripción = la del lun 19 (§12 fila 3) adaptada a «HOY (mar 20-oct, UWSA1 08:50-13:00 · semana 1 corrida v6.02d: hoy = plan del lun 19)»; las instancias del lun 19 no se tocaron |
| 4-7 | TÍTULO + 1.ª línea (instancias R↔D `6us7kkdcuk3g7tm1cjes38leh0_<día>T183000Z`) | mar 20 · mié 21 · jue 22 · vie 23 (13:30-14:15, =) | «🔬 RESEARCH ↔ 💎 DERMA (alterna diario…) · v6.02» ⇒ «💎 DERMA d1 (plan del lun 19)» · «🔬 RESEARCH R0 (plan del mar 20)» · «💎 DERMA d2 (plan del mié 21)» · «🔬 RESEARCH R1 (plan del jue 22)» |
| 8-11 | TÍTULO + 1.ª línea (instancias ENCAPS `papebi46etlo8glgfs5akd5mig_<día>T211500Z`) | mar 20 · mié 21 · jue 22 · vie 23 (16:15-17:15, =) | «🇵🇪 ENCAPS — 1h Banqueo Mantenimiento…» ⇒ «… PRE-TEST DE ARRANQUE 1/2 (plan del lun 19)» · «… PRE-TEST DE ARRANQUE 2/2 (plan del mar 20)» · «… banco V-2 (plan del mié 21)» · «… banco III-5 (plan del jue 22) · mini-sim → dom 25 10:00» |
| 12 | TÍTULO + 1.ª línea (instancia) | `tah7p61p2hvn4nktgp2msl2eno_20261023T221500Z` (⚖️ LIVIANO, vie 23 17:15-18:00, =) | ⇒ «⚖️ LIVIANO — Academia (plan del jue 22) · caso 1 → dom 25 11:00» |
| 13 | MOVE + TÍTULO + 1.ª línea (instancia) | `k8iaefnjq0mnrlvkilhcarrik8_20261024T121500Z` (📋 REVISIÓN SEMANAL) | sáb 24 07:15-07:45 ⇒ **dom 25 11:45-12:15** · «📋 REVISIÓN SEMANAL · S01 (semana corrida: dom 25 11:45)»; la del sáb 31-oct sigue a las 07:15 |
| 14 | CREATE (sáb 24) | `jm4rtmo3uol8a03i7mct37omjc` | 04:15-05:00 «🧠 IA — VIBECODING · S1 5/5 (plan del vie 23)» · color 9 |
| 15 | CREATE (sáb 24) | `rcd97o2pvk4rjpkg1eqhiquedk` | 05:00-05:45 «🇺🇸 USMLE — ANKI AM (plan del vie 23)» · color 2 |
| 16 | CREATE (sáb 24) | `risci3tp52c8s158evuhvk3ja8` | 07:15-12:00 «🇺🇸 USMLE — D5 Inmunología (plan del vie 23): repaso 07:15 · pre-test 08:15 · deep prime 09:00 · 30Q 11:00» · color 2 (= NÚCLEO DEEP PRIME `iuhj8…`) |
| 17 | CREATE (sáb 24) | `4v0b5o4imqlnof3p350cgmt9t8` | 12:30-13:00 «🧠 SYNAPSE — misión del día (plan del vie 23)» · color 9 |
| 18 | CREATE (sáb 24) | `44l84nlkdadsgbujcgon7af3qc` | 13:00-13:25 «📚 BUSINESS — OUTPUT S1 (plan del vie 23)» · color 8 |
| 19 | CREATE (sáb 24) | `jtikp4c62ouciv8rpl5ccv19fs` | 13:30-14:15 «🇺🇸 USMLE — Evaluación acumulativa (plan del vie 23)» · color 11 (a las 18:00 del sábado está el bloque de YouTube) |
| 20 | CREATE (dom 25) | `6hs5igqd45b7th2d83fse156jo` | 07:15-08:00 «💎 DERMA d3 (plan del vie 23)» · color 1 |
| 21 | CREATE (dom 25) | `ab45f01kmgghj85cmouqie4ehg` | 08:00-09:00 «🪙 AURUM — Closer de ventas (plan del vie 23)» · color 5 · popup 5′ (= serie AURUM F1) |
| 22 | CREATE (dom 25) | `jgn91pjgkvfrd6m6v9v5l3egsg` | 09:00-09:15 «🇪🇸 MIR — Evaluación Anclada D-1 (plan del vie 23)» · color 1 |
| 23 | CREATE (dom 25) | `68popcesaus5b7fn0dobkvp7ts` | 09:15-10:00 «🇪🇸 MIR — Deep Work Mini · D5 (plan del vie 23)» · color 1 |
| 24 | CREATE (dom 25) | `6cpnskdduc2p2ts6hc8m2u53ik` | 10:00-11:00 «🇵🇪 ENCAPS — MINI-SIM 25Q (plan del vie 23)» · color 1 |
| 25 | CREATE (dom 25) | `9auvfonv7gd3hc0iag3rnurs58` | 11:00-11:45 «⚖️ LIVIANO — caso 1 (plan del vie 23)» · color 7 |
| 26 | CREATE (dom 25) | `k6btu5r2tvdqjhpjpp2uhtmhbs` | 12:15-12:30 «📚 BUSINESS — cierre del OUTPUT S1 (del sábado)» · color 8 |

Línea añadida al inicio de las descripciones de las filas 4-12: «Semana 1 corrida (v6.02d): hoy = plan del <día>; manda la app». Descripción de los eventos creados: «Semana 1 corrida (v6.02d, orden del lun 19-oct): plan del vie 23 · qué/cuánto/cómo en Joseph MD → Home (manda la app) · desde el lun 26 nada cambia» (fila 26: «cierre del OUTPUT S1 del sábado (sáb 07:45 → dom 25 12:15, tras la revisión semanal)»). Colores leídos con `get_event` de cada serie (vibecoding `ef7r…` 9 · ANKI AM `9274…` 2 · DEEP PRIME `iuhj8…` 2 · SYNAPSE `e37h…` 9 · BUSINESS `7jmf8…` 8 · EVAL `c5e77…` 11 · R↔D `6us7…` 1 · AURUM F1 `23t06…` 5 · MIR `uidu…` / `hos0…` 1 · ENCAPS `papebi…` 1 · LIVIANO `tah7…` 7); recordatorios = los de la serie (por defecto; AURUM popup 5′).

### 13.2 Verificación (list_events 19 → 27-oct, después de los cambios)

| Día | Resultado |
|---|---|
| lun 19-oct | ✅ sin UWSA1; el resto (series e instancias de §12) sin cambio de contenido |
| mar 20-oct (= plan del lun 19) | ✅ SYNAPSE 07:25 · UWSA1 08:50-13:00 · ALMUERZO 13:00-13:30 · DERMA d1 13:30 · ENCAPS PRE-TEST 1/2 16:15 · eval 18:00 (= Day-After 1/6) |
| mié 21 (= mar 20) · jue 22 (= mié 21) · vie 23 (= jue 22) | ✅ RESEARCH R0 + PRE-TEST 2/2 · DERMA d2 + banco V-2 · RESEARCH R1 + banco III-5 + LIVIANO (plan del jue 22) |
| sáb 24-oct (= mañana del vie 23) | ✅ 04:15 vibecoding S1 5/5 · 05:00 Anki AM · 07:15-12:00 USMLE D5 · 12:30 SYNAPSE · 13:00 Business OUTPUT · 13:30 eval USMLE · 15:00 PC sábado, 17:00 YouTube, 19:00 Anki, baile (sin cambio) · la REVISIÓN de las 07:15 ya no está |
| dom 25-oct (= tarde del vie 23) | ✅ 07:15 DERMA d3 · 08:00 AURUM · 09:00 MIR eval · 09:15 MIR deep · 10:00 ENCAPS mini-sim · 11:00 LIVIANO caso 1 · 11:45 REVISIÓN S01 · 12:15 cierre OUTPUT · 15:00 PC domingo, 17:00 Anki, baile (sin cambio) |
| lun 26-oct | ✅ 29/29 eventos con el mismo contenido que en el volcado previo (título, descripción, hora, color, estado) |

Comparación por script de los 200 eventos previos: los 13 tocados = texto y hora esperados; los 187 restantes con contenido idéntico (en 19 instancias de las series que recibieron una excepción solo cambia el sello `updated` que devuelve la API —5 de ellas el lun 26—, sin cambio de contenido); 13 eventos nuevos, todos en sáb 24 / dom 25.

### 13.3 No tocado / pendiente
- Las instancias de las series USMLE (07:15 · 08:15 · 09:00 · 11:00 · 18:00), ANKI AM, vibecoding, SYNAPSE, AURUM, MIR y BUSINESS del mar 20 → vie 23 conservan su título genérico: el contenido del día de plan lo da la app (`fechaPlanDe`). El mar 20 esas instancias se solapan con el UWSA1, igual que el lun 19 en §12.
- Las instancias del lun 19 (SYNAPSE 07:25, ALMUERZO 13:00, etc.) quedan como estaban (día pasado, sin sesión).
- Ninguna serie recreada; RRULE/EXDATE intactos. Sin commit.

### 13.4 Retoque final (lun 19-oct ~16:05, tras la verificación cruzada app ↔ Calendar)
Solo títulos de 4 instancias (descripción intacta; respaldo `cal_bk/semana1b/_retoque_19oct_v602d.json`; notificaciones NONE):
| id | antes → después |
|---|---|
| `papebi46etlo8glgfs5akd5mig_20261019T211500Z` | ENCAPS 1h Banqueo → «⏭ SIN SESIÓN HOY (corrido al mar 20 16:15: PRE-TEST 1/2) · 🇵🇪 ENCAPS» |
| `tah7p61p2hvn4nktgp2msl2eno_20261019T221500Z` | LIVIANO Academia → «⏭ SIN SESIÓN HOY (corrido al mar 20 17:15) · ⚖️ LIVIANO» |
| `c5e77csne1bnfps1iq7nqel84s_20261019T230000Z` | USMLE Eval → «⏭ SIN SESIÓN HOY (corrido al mar 20 18:00: Day-After UWSA1 1/6) · 🇺🇸 USMLE Eval» |
| `c010a16rsl6h0lk4krr0a9r3rs_20261025T200000Z` | SYNAPSE repaso + PC domingo → «… semana corrida: la revisión S01 ya fue a las 11:45 → aquí solo el Feynman 10′ (opcional)» |

## 14. Corrimiento v6.03 (mar 20-oct-2026 · D1 = mié 21-oct)
Deshace la v6.02d (§13) y aplica la v6.03 (lun 19 y mar 20 sin estudio; sáb 24 / dom 25 libres; todo corre 2 hábiles y se alargan los fines). Respaldos en `cal_bk/v603/` (gitignored).

### 14.1 USMLE · ENCAPS · ALMUERZO · hitos (C1)

Ejecutado el mar 20-oct-2026, ≈12:10-12:27 Lima (17:12-17:26 UTC). Deshace v6.02d (§13 + §13.4) en lo que toca a C1 y re-fecha a v6.03: D1 = UWSA1 **mié 21-oct**; sáb 24 / dom 25 libres; NBME en martes; gates en viernes; F1 = D1-D50.

**Protocolo:** `get_event` antes de cada escritura (el `updated` coincidió con los volcados `list_events` del mismo día) · respaldo JSON en `cal_bk/v603/<id>.json` (47 ficheros de C1; los instantáneos de instancia salen del volcado previo a la ronda, los de serie de `get_event` + la descripción de una instancia con el mismo `updated`) · `notificationLevel: NONE` en todo · ninguna serie recreada, RRULE/EXDATE intactos · textos generados por script con reemplazos «exactamente una vez» (`cal_bk/v603/_c1/scripts/`, payloads en `_c1/payloads/`, volcados antes/después en `_c1/volcados/`). `cal_bk/` está en `.gitignore`. Sin commit. Nada de rutinas personales.

Fuentes: `_fechas_v6.json` v6.03 · `usmleStep1Daily.ts` (DIAS: D10 mar 3-nov, D18 vie 13-nov, D25 mar 24-nov, D38 vie 11-dic, D40 mar 15-dic, D49 mar 29-dic, D50 mié 30-dic; T3-T10 jue 18 → mié 31-mar; colchón tramo 2 = 24 filas) · `usmleGuia.ts` (Day-After UWSA1: mié 21 18:00 · jue 22 05:00 / 07:15 / 18:00 · vie 23 18:00 · lun 26 18:00 + eval reducida) · `_encaps_mantenimiento_2027.sql` + Supabase (`study_schedule`: dia 1 = mié 21-oct, mini-sim 43 = vie 18-dic con rótulo CHECKPOINT, intensiva 51-100, pendientes F1 dias 93/94 = mié 3 / jue 4-mar) · `_pendientes_f1.json` · `BANCO_PROPIO/README.md` · `homeBriefing.ts` (deload lun 30-nov).

#### Operaciones (13 `delete_event` + 33 `update_event` = 46 escrituras)

| # | Tipo | Id | Antes → después |
|---|---|---|---|
| 1-6 | DELETE | `jm4rtmo3uol8a03i7mct37omjc` · `rcd97o2pvk4rjpkg1eqhiquedk` · `risci3tp52c8s158evuhvk3ja8` · `4v0b5o4imqlnof3p350cgmt9t8` · `44l84nlkdadsgbujcgon7af3qc` · `jtikp4c62ouciv8rpl5ccv19fs` | sáb 24 (§13.1 filas 14-19: vibecoding 04:15 · Anki 05:00 · USMLE D5 07:15-12:00 · SYNAPSE 12:30 · Business OUTPUT 13:00 · Eval 13:30) → borrados |
| 7-13 | DELETE | `6hs5igqd45b7th2d83fse156jo` · `ab45f01kmgghj85cmouqie4ehg` · `jgn91pjgkvfrd6m6v9v5l3egsg` · `68popcesaus5b7fn0dobkvp7ts` · `6cpnskdduc2p2ts6hc8m2u53ik` · `9auvfonv7gd3hc0iag3rnurs58` · `k6btu5r2tvdqjhpjpp2uhtmhbs` | dom 25 (§13.1 filas 20-26: DERMA d3 · AURUM · MIR eval · MIR deep · ENCAPS mini-sim · LIVIANO caso 1 · Business cierre 12:15) → borrados |
| 14 | MOVE + TÍTULO + DESCR | `o1gla7846uae4tgngvc4q45osg` (🎯 UWSA1) | mar 20 08:50-13:00 «· v6.02» → **mié 21-oct 08:50-13:00** «· v6.03» · D1 = mié 21 · preparación 07:15-08:50 alineada a la guía (final vídeo FSRS 7′ + «The ONLY Video» 0:00-26:00, resto → vie 23 05:00) · 13:30 Derma d1 · Day-After 1/6 mié 21 18:00 → 6/6 + eval reducida lun 26 18:00 · PRE-TEST ENCAPS parte 1 hoy, parte 2 jue 22 · contenido desde el jue 22 (D2) · plan D1-D50 con NBME en martes · historial «v6.03 (20-oct): mar 20 → mié 21» |
| 15 | DESCR (serie) | `43dq3oib16esjcqj1dcd8osot2` (ALMUERZO) | texto v6.02 → v6.03: UWSA1 mié 21-oct 08:50-13:00 (comida 13:00-13:30, tras el sim) · NBME 25-29 «mar 3-nov · mar 24-nov · mar 15-dic · mié 30-dic · mié 17-mar» (instancia 12:30-13:00) · «Régimen v6.03» + pie v6.03; título y RRULE intactos |
| 16 | MOVE (instancia) | `43dq3oib16esjcqj1dcd8osot2_20261020T170000Z` | mar 20 13:00-13:30 (texto «HOY mar 20 …») → **12:00-12:30**, texto de la serie |
| 17 | MOVE + DESCR (instancia) | `43dq3oib16esjcqj1dcd8osot2_20261021T170000Z` | mié 21 12:00-12:30 → **13:00-13:30** + texto del día del UWSA1 («HOY mié 21-oct, UWSA1 08:50-13:00 · D1 del plan v6.03»; Spark cap 1-3 en audio; 13:30 Derma d1) |
| 18-20 | MOVE (instancias) | ALMUERZO `…_20261030T170000Z` · `…_20261120T170000Z` · `…_20261211T170000Z` | días de NBME v6.02 (vie 30-oct · vie 20-nov · vie 11-dic) 12:30-13:00 → **12:00-12:30** (deshace §12 filas 9-11) |
| 21-23 | MOVE (instancias) | ALMUERZO `…_20261103T170000Z` · `…_20261124T170000Z` · `…_20261215T170000Z` | nuevos NBME (mar 3-nov · mar 24-nov · mar 15-dic) 12:00-12:30 → **12:30-13:00** (mié 30-dic ya estaba) |
| 24 | MOVE + TÍTULO + DESCR | `4hjv5lkvluj06ahc2qndtsi6as` (🎯 NBME 25) | vie 30-oct → **mar 3-nov 07:00-12:30** (D10) · tramo siguiente D11 mié 4-nov / D16 mié 11-nov / D17 jue 12-nov · DESPUÉS: almuerzo 12:30, SYNAPSE 13:00, Day-After repartido, «hoy es martes» · gates vie 13-nov / vie 11-dic · título «· v6.03» |
| 25 | MOVE + TÍTULO + DESCR | `lr7ktrbiffj4hrlke7lh7cv6h4` (🎯 NBME 26) | vie 20-nov → **mar 24-nov 07:00-12:30** (D25) · deload S7 lun 30-nov → vie 4-dic · Renal D26-D29 mié 25 → lun 30-nov, GI D30 mar 1-dic · título «· v6.03» |
| 26 | MOVE + TÍTULO + DESCR | `sm4baa2v453ifaub325h9v08mg` (🎯 NBME 27) | vie 11-dic → **mar 15-dic 07:00-12:30** (D40) · gate vie 11-dic · título «· v6.03» |
| 27 | TÍTULO + DESCR | `ecu784689p8osrhqabuct8d5jg` (🎯 NBME 28) | mié 30-dic (=) · D52 → **D50** · Neuro D43-D49 vie 18 → mar 29-dic · 8 desplazadas T3-T10 jue 18 → mié 31-mar (colchón tramo 2 = 24 filas ≈ 63 h) · Day-After sin franja en F1 = decisión pendiente de Joseph (propuesta de la app) · título «· v6.03» |
| 28 | MOVE + TÍTULO + DESCR | `sfgp85kjua01v159rh1qrilr18` (🚦 GATE D18) | todo el día mié 11-nov → **vie 13-nov** · D1 mié 21-oct · siguiente gate vie 11-dic · título «· v6.03» |
| 29 | MOVE + TÍTULO + DESCR | `vvi7lk2c0c9nih1fqbi19p681s` (🚦 GATE D38) | todo el día mié 9-dic → **vie 11-dic** · próximos: NBME 27 mar 15-dic, NBME 28 = D50 · título «· v6.03» |
| 30 | TÍTULO + DESCR | `oi557k66kql15oa6ptkjdipvis` (🧯 C1) | mar 29-dic (=) «hoy D51 normal» (anemias microcíticas) → «hoy **D49** normal» (Neuro: demencias + Parkinson) · regla v6.03 (F1 D1-D50, 8 desplazadas) |
| 31 | TÍTULO + DESCR | `ag335n3dhvui11593us2lm448s` (🧯 C2) | mié 30-dic (=) · D52 → **D50** = NBME 28 · cierre de F1 D1-D49 · T3-T10 |
| 32 | TÍTULO + DESCR | `ti163p5s6t4odtqmhvkl3mamac` (🇵🇪 CHECKPOINT) | vie 18-dic (=) «mini-sim 45 · dia 45» → **«mini-sim 43 · dia 43»** (sim_n 43, comprobado en el SQL y en Supabase; cola larga I-1 + II-2) · F1 dia 1-50 (41 + 9) · intensiva 51-100 · PRE-TEST vie 8-ene = dia 55 |
| 33-38 | DESCR (series) | `9274q14djfvggeajhor64oshj8` · `76dnlc30p3hnccenpvub2d9acg` · `c24k2n7k8qlhfimrrncf8rapgk` · `iuhj8busrh63ms7v4j5q8e9920` · `q72kvc9pm1brlqvl6383ccr9vs` · `c5e77csne1bnfps1iq7nqel84s` | párrafo «Régimen v6.02» → v6.03: D1 = UWSA1 mié 21-oct, contenido desde el jue 22 (D2) → D50 mié 30-dic (50 sesiones; lun 19 y mar 20 SIN SESIÓN) · NBME en martes · gates vie 13-nov / vie 11-dic · D50 = NBME 28 · 8 desplazadas T3-T10 · colchón tramo 2 = 24 filas · historial con la línea v6.02 · pie «(v6.03 · 20-oct-2026: D1 = mié 21-oct)». Además: «UWSA1 08:50-13:00» en repaso / pre-test / deep prime; 30Q con los viernes N1 (D3 · D18 · D23 · D38 · D43) y N3 (D8 · D13 · D28 · D33) recalculados y uWorld F1 ~1.640 / tramo 2 ~1.620 (= 3.260, margen 399); Eval con el Day-After de la semana 1 y de los NBME. Títulos, RRULE y EXDATE intactos |
| 39 | TÍTULO (instancia) | `c5e77csne1bnfps1iq7nqel84s_20261020T230000Z` (Eval hoy 18:00) | prefijo «⏭ SIN SESIÓN (v6.03: arranca el mié 21) · » (la del lun 19 se dejó) |
| 40 | DESCR (serie) | `papebi46etlo8glgfs5akd5mig` (🇵🇪 ENCAPS 16:15) | cabecera v6.03 (F1 dias 1-50 mié 21-oct → mié 30-dic, 41 + 9, checkpoint mini-sim 43; carril B dia 51-82) · **ARRANQUE v6.03**: mié 21 eval D1 + pre-test 1/2 · jue 22 eval II-3 + pre-test 2/2 (`pretest_arranque_2026-10-21/22`) · vie 23 mini-sim 25Q (II-2 + I-10) · sáb/dom libres · lun 26 eval I-3 + banco V-2 · mar 27 eval V-2 + banco III-5 · mié 28 / jue 29 por RUNBOOK · stock V-2 < lun 9-nov, III-5 < mar 24-nov, II-5 < mié 25-nov · pendientes F1 + v6.03 (mié 3-mar I-3, jue 4-mar V-2; 10 en total, dias 83-94) · intensiva 51-100, PRE-TEST dia 55 · Supabase 50 + 50, huella 100 · 2a0a9c15…, backups `*_v603_20261020` · historial v6.02 · pie v6.03 |
| 41 | TÍTULO (instancia) | `papebi46etlo8glgfs5akd5mig_20261020T211500Z` | «PRE-TEST DE ARRANQUE 1/2 (plan del lun 19)» → «⏭ SIN SESIÓN (v6.03: arranca el mié 21) · » + título de la serie |
| 42-44 | TÍTULO (instancias) | `papebi…_20261021T211500Z` · `…_20261022T211500Z` · `…_20261023T211500Z` | «PRE-TEST 2/2 (plan del mar 20)» · «banco V-2 (plan del mié 21)» · «banco III-5 … mini-sim → dom 25 10:00» → título de la serie (la descripción ya es la nueva de la serie, ver aviso 1) |
| 45-46 | DESCR (instancias) | `qcsv3oe0e7rh2vkfq301ne68ko_20270303T211500Z` · `…_20270304T211500Z` (carril B · reposición) | texto genérico de la serie (los dos días bajo la «regla del resto») → + línea inicial «⚠ v6.03 · HOY = PENDIENTE F1»: mié 3-mar (dia 93) I-3 · brote/bloqueo + I-OCC · jue 4-mar (dia 94) V-2 · residuos/bioseguridad + III-3 (filas mant. 51-52 de la F1 v6.02; los dia de abajo son v6.02: restar 2). Criterio de v6.02: overlay propio solo para mini-sims; estos dos son banqueo1h |

Sin tocar (fuera de C1): lun 19 (ENCAPS y Eval «SIN SESIÓN» intactos), SYNAPSE / BUSINESS / R↔D / LIVIANO / AURUM / MIR / vibecoding / REVISIÓN SEMANAL / ANKI fin de semana (otras partes), rutinas personales.

#### Verificación (list_events después de los cambios)

Volcados: 19-oct → 1-nov (342 eventos, 2 páginas) + 3-nov · 11 → 13-nov · 20 → 24-nov · 9 → 11-dic · 15 → 18-dic · 29 → 30-dic · 3 → 4-mar-2027 (873 eventos). Script `ver.js`: **94/94 OK, 0 FAIL**.

| Día / ventana | Resultado |
|---|---|
| sáb 24 · dom 25-oct | ✅ 0 eventos «plan del vie 23» / cierre OUTPUT (los 13 ids ya no existen); queda el fin de semana normal (revisión 07:15, PC 15:00, Anki — de otras partes) |
| mar 20-oct (hoy) | ✅ ALMUERZO 12:00-12:30 · ENCAPS 16:15 y Eval 18:00 «⏭ SIN SESIÓN (v6.03: arranca el mié 21)» · sin UWSA1 |
| mié 21-oct | ✅ UWSA1 08:50-13:00 (texto = payload) · ALMUERZO 13:00-13:30 (texto del día) · ENCAPS 16:15 con título de serie |
| jue 22 / vie 23-oct | ✅ ENCAPS con título de serie y descripción v6.03 |
| lun 26 → vie 30-oct | ✅ ALMUERZO 12:00-12:30 (también vie 30) · sin NBME el vie 30 |
| mar 3-nov | ✅ NBME 25 07:00-12:30 · ALMUERZO 12:30-13:00 |
| mié 11 → vie 13-nov | ✅ GATE D18 solo el vie 13 · sin gate el mié 11 |
| vie 20 → mar 24-nov | ✅ sin NBME 26 el vie 20 (almuerzo 12:00) · NBME 26 mar 24 07:00-12:30 · almuerzo 12:30-13:00 |
| mié 9 → vie 11-dic | ✅ sin gate el mié 9 · GATE D38 vie 11 · sin NBME 27 el vie 11 (almuerzo 12:00) |
| mar 15 → vie 18-dic | ✅ NBME 27 mar 15 · almuerzo 12:30-13:00 · CHECKPOINT mini-sim 43 vie 18 |
| mar 29 → mié 30-dic | ✅ C1 «D49 normal» · C2 + NBME 28 (D50) · almuerzo 30-dic 12:30-13:00 |
| 6 series USMLE | ✅ 26/26 instancias leídas de cada serie con la descripción v6.03 |
| ENCAPS 16:15 | ✅ 26 instancias leídas con la descripción v6.03 (lun 19 conserva su título «SIN SESIÓN HOY») · ALMUERZO: 28 instancias leídas, todas a su hora y con su texto |
| mié 3 / jue 4-mar-2027 | ✅ carril B con la línea de pendiente F1 v6.03 |

#### Avisos

1. **El MCP propaga la descripción de la serie a TODAS las instancias, también a las excepciones con texto propio** (comprobado hoy: tras actualizar el ALMUERZO, las instancias del lun 19 y del mar 20 perdieron su «🎯 HOY …»; en ENCAPS se perdió la línea «Semana 1 corrida (v6.02d)» de 20-23, que era lo buscado). Títulos y horas de las excepciones sí se conservan. Consecuencia: tras cualquier cambio de descripción de una serie hay que re-aplicar los textos por instancia. En C1 se re-aplicó el ALMUERZO del mié 21 después del cambio de la serie. Si alguien actualiza más tarde la descripción de `qcsv3oe0e7rh2vkfq301ne68ko`, hay que reponer las líneas del 3 y 4-mar (payloads en `cal_bk/v603/_c1/payloads/carril_3mar.json` y `carril_4mar.json`).
2. El texto propio del ALMUERZO del lun 19 (día pasado, sin estudio) quedó sustituido por el de la serie; respaldo en `cal_bk/v603/43dq3oib16esjcqj1dcd8osot2_20261019T170000Z.json`.

#### Pendiente (fuera del encargo de C1)

- **Títulos de las 6 series USMLE** siguen en «· v6.02» (el encargo pedía solo la descripción); otras partes ya pusieron «· v6.03» en sus series. Si se quiere uniformar: 6 `update_event` de `summary` (la instancia Eval del mar 20 lleva su propio título).
- **Eventos F2 de ENCAPS con numeración de dia v6.02** (no estaban en la lista de C1; en v6.03 restar 2): banner `4mfnu95lrhr3dmu87einr3jm5k` (53-102 → 51-100) · PRE-TEST `27bs58ee0ke180ht2rh6mgvft0` (dia 57 → 55) · SIM #1-#8 (dia 62 … 97 → 60 … 95) · DRESS `ip4lhi4lhigad4l1titbd36jnk` (101 → 99) · D-1 `tl0irrsb4av0vd8d1ar8vmbuoo` y 🛡 `3vrptnmtl9vppvs6nvv25s7p3c` (102 → 100) · EXAMEN `8juk0mvl66tutdkbcei7umrs68` (F1 1-52 → 1-50) · carril B `d8252hjo5ra2qlqb9bccd6vkjo` y `qcsv3oe0e7rh2vkfq301ne68ko` (reposición 85-100 → 83-98; 8 → 10 pendientes; mié 3 / jue 4-mar ya no son «regla del resto») · overlays `mgv06ho1cphr78rsqf9nrkgd7o` (dia/sim_n 88 → 86) y `ddfms7b6q2e3lhvvqqvr6el474` (sim_n 94 → 92) · series F2 `bod921vej8ehllto18h0ieiuig`, `qqjhn7hnkugffrnvm5s9a0q46k`, `uvpo4pgrtiqp3d9p07ail1fni8`, `2fvbkunh0nfhvhbn1b6iqvpifs` («dias 53-102»).
- **Hitos 2027 con referencias v6.02** (fecha sin cambio): NBME 29 `ae93qv0nqqs36h439hid1jcq8o` dice «T3-T8 (jue 18 → lun 29-mar) = Heme/Onco … + bioestadística» → en v6.03 son T3-T10 jue 18 → mié 31-mar (con Neuro D50 delante); GO/NO-GO `3i88pp1gj84vc0r6tuherhsc0o` dice «NBME 28 (mié 30-dic-2026 = d52 …)» → d50 (T117 del lun 9-ago sigue siendo la 2.ª pasada de incorrectas).
- Docs (no Calendar): `DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md` aún da los plazos de stock de v6.02 (V-2 < mié 4-nov…); los de v6.03 son V-2 < lun 9-nov, III-5 < mar 24-nov, II-5 < mié 25-nov.
- Decisión de Joseph (ya estaba en la app): el Day-After del NBME 28 no tiene franja en F1 (propuesta: sáb 2-ene 07:00-11:00 o repartido en los STEP 1 VIVO de enero). El texto del NBME 28 lo dice; no se creó evento.

### 14.2 Series de secundarios · revisión · Research (C2)

Orden de Joseph (mar 20-oct): lun 19 y mar 20 sin estudio → todo arranca el **mié 21-oct**; sáb 24 / dom 25 = fin de semana normal; secundarios +2 hábiles con el contenido intacto. Fuente de fechas: `src/lib/*.ts` del commit `6b8df7c` (leídos con `DATA/_scripts/usmle/cargar_ts.js`) + `DATA/_scripts/_fechas_v6.json` v6.03 + los bloques v6.03 de `DATA/MIR/README.md`, `DATA/RESEARCH/daily-plan.md`, `DATA/DERMATOLOGIA/daily-plan.md`, `DATA/BUSINESS/README.md`, `DATA/BUSINESS/LIVIANO_ACADEMIA.md`, `DATA/SYNAPSE/CURSO_IA_04H_31AGO.md`, `DATA/SYNAPSE/motor-dia-a-dia.md` y `src/lib/homeBriefing.ts` (DELOAD_SEMANAS).

Protocolo: `get_event` (o volcado `list_events` del mismo minuto) + respaldo JSON en `DATA/_v600/cal/cal_bk/v603/` ANTES de cada escritura (masters, instancias con excepción y los 12 overlays; 75 ficheros + `inst_v603/` con los volcados de instancias previos y posteriores; `cal_bk/` está en `.gitignore:53`) · `notificationLevel: NONE` en todo · recrear = `create_event` (mismo DTSTART, hora, color, recordatorios, EXDATE + UNTIL nuevo) → comprobar la respuesta → `delete_event` de la vieja · textos generados por script (`scratchpad/v603c2/build.js`, cada reemplazo con aserción «exactamente una vez» sobre el texto del respaldo). Antes de recrear se compararon TODAS las instancias de las 7 series contra su RRULE (`inst_v603/inst.js`): las únicas excepciones eran las conocidas de §12/§13 (SYNAPSE lun 19 / mar 20 07:25 y 30-oct · 20-nov · 11-dic · 30-dic 13:00; SYNAPSE dom 25 retitulado; LIVIANO lun 19 ⏭ y vie 23 retitulado; Business mar 20 ⏭ y 30-oct · 20-nov · 11-dic · 30-dic 12:30 con 3 títulos «hoy NO (NBME)») → respaldadas una a una. Ningún evento personal tocado; nada anterior al lun 19-oct salvo que la recreación regenera el histórico idéntico de cada serie.

### Operaciones (55 escrituras en el Calendar + 1 `--set` + 1 cambio de código)

| # | Tipo | Id (antes → después) | Antes → después |
|---|---|---|---|
| 1 | RECREAR | `ef7rfg1e2dpar1n6cb17j3cf44` → **`i4h2gu846t9t7b16q89hnao84s`** | 🧠 VIBECODING 04:15-05:00 · v6.02 → · v6.03 · DTSTART lun 31-ago-2026 · MO-FR · UNTIL 20270304T045959Z (mié 3-mar) → **20270306T045959Z (vie 5-mar)** · EXDATE 25-dic / 31-dic / 1-ene · color 9 · recordatorios por defecto · descr. v6.03 (S1-S12 mié→mar, AVANCE S1 sáb 24-oct, SHIP S1 sáb 31-oct … S9 26-dic, S10 2-ene, S11 9-ene, S12 16-ene; taper S13-S20 lun 18-ene → vie 5-mar; deload S7 mié 2 → mar 8-dic) |
| 2 | RECREAR | `e37h4fl8gd0v7eavt1f9fgob0o` → **`r9scujjpk93jn0fmh4rvahk68g`** | 🧠 SYNAPSE 12:30-13:00 · v6.02 → · v6.03 · DTSTART jue 11-jun-2026 · UNTIL 20270227T045959Z (vie 26-feb) → **20270302T045959Z (lun 1-mar)** · EXDATE 25-dic / 31-dic / 1-ene · color 9 · descr. v6.03 (132 días mié 21-oct → lun 1-mar; simulacro CCA-F sáb 27-feb, cierre F2 lun 1-mar; gates vie 13-nov / vie 11-dic) |
| 3 | RECREAR | `bbj1ne6ken46pj25i5dt36idng` → **`jhsg92lo784vlr8tc5bnsag8uk`** | 🧠 SYNAPSE — PC sábado (2h) (título =) · DTSTART sáb 13-jun-2026 15:00-17:00 · UNTIL 20270221T045959Z (sáb 20-feb) → **20270228T045959Z (sáb 27-feb)** · sin EXDATE · color 9 · descr. v6.03 |
| 4 | RECREAR | `c010a16rsl6h0lk4krr0a9r3rs` → **`m8kfvq6440c6al6cq47oclnoj8`** | 🧠 SYNAPSE — repaso + PC domingo (2h) (título =) · DTSTART dom 28-jun-2026 · UNTIL 20270222T045959Z (dom 21-feb) → **20270301T045959Z (dom 28-feb)** · sin EXDATE · color 9 · descr. v6.03; el retitulado v6.02d del dom 25-oct desaparece (vuelve el título de la serie) |
| 5 | RECREAR | `tah7p61p2hvn4nktgp2msl2eno` → **`jlh8agrjmkk2hudsea7mrlflf8`** | ⚖️ LIVIANO 17:15-18:00 · v6.02 → · v6.03 · DTSTART lun 31-ago-2026 · UNTIL 20270225T045959Z (mié 24-feb) → **20270227T045959Z (vie 26-feb)** · EXDATE 25-dic / 31-dic / 1-ene · color 7 · descr. v6.03 (16 casos vie 23-oct … vie 19-feb, capstone jue 25-feb, revisión II + cierre vie 26-feb); el retitulado v6.02d del vie 23 desaparece |
| 6 | RECREAR | `ig6qhqufphhbj5jllghorm23fs` → **`ljam8b9e9n9oaiv80ul5c6662g`** | 🪙 AURUM 30' 14:15-14:45 · v6.02 F2-F3 → · v6.03 F2-F3 · DTSTART lun 4-ene-2027 · UNTIL 20270428T045959Z (mar 27-abr) → **20270430T045959Z (jue 29-abr)** · EXDATE 12-mar, 15-mar, 25-mar, 26-mar · color 5 · popup 5' · descr. v6.03 (80 sesiones D51-D130; pitches v3 vie 8-ene … v7 jue 29-abr) |
| 7 | RECREAR | `7jmf8p1l5b5q6jbtmj9uualiq8` → **`mmi1e976ubgq9s3saarbjf8o74`** | 📚 BUSINESS 13:00-13:25 (título =) · DTSTART jue 2-abr-2026 · serie ABIERTA → **UNTIL 20270219T045959Z (jue 18-feb = fin del plan Business, 121 filas)** + **EXDATE 25-dic / 31-dic / 1-ene** (filas DESCANSO del plan: `rutinaGuia.bizFranjaDe` = null esos días) · color 8 · recordatorios por defecto · descr. v6.03. Antes de recrear: 142/142 instancias pasadas (2-abr → 16-oct) idénticas al master, sin excepciones → no se pierde historia |
| 8-12 | UPDATE (instancias nuevas) | `r9scujjpk93jn0fmh4rvahk68g_20261021T173000Z` · `_20261103T173000Z` · `_20261124T173000Z` · `_20261215T173000Z` · `_20261230T173000Z` | SYNAPSE mié 21-oct 12:30 → **07:25-07:55** (día del UWSA1) · mar 3-nov, mar 24-nov, mar 15-dic, mié 30-dic 12:30 → **13:00-13:30** (días de NBME) |
| 13-16 | UPDATE (instancias nuevas) | `mmi1e976ubgq9s3saarbjf8o74_20261103T180000Z` · `_20261124T180000Z` · `_20261215T180000Z` · `_20261230T180000Z` | Business 13:00 → **12:30-12:55** en los 4 días de NBME (audio en el almuerzo). Los viernes 30-oct / 20-nov / 11-dic vuelven a 13:00-13:25 con el título de la serie (OUTPUT normal; ya no son día de NBME) |
| 17-20 | UPDATE (instancias) | `r9scujjp…_20261020T173000Z` · `mmi1e976…_20261020T180000Z` · `jlh8agrj…_20261020T221500Z` · `jlh8agrj…_20261019T221500Z` | HOY mar 20: SYNAPSE 12:30, Business 13:00 y LIVIANO 17:15 → «⏭ SIN SESIÓN (v6.03: arranca el mié 21) · …» · LIVIANO lun 19 → mismo rótulo (restituye el ⏭ que tenía antes de la recreación) |
| 21-24 | UPDATE (instancias) | `6us7kkdcuk3g7tm1cjes38leh0_20261020T183000Z` · `23t06e7foitmiqm24lpd0vo9jc_20261020T191500Z` · `uiduvkfsgs43p1u1qk1vohih58_20261020T201500Z` · `hos0tfhsr2hdfs6cgv1rmejhrs_20261020T203000Z` | HOY mar 20: R↔D 13:30 («💎 DERMA d1 (plan del lun 19)»), AURUM F1 14:15, MIR 15:15 y 15:30 → «⏭ SIN SESIÓN (v6.03: arranca el mié 21) · …». Se escribieron dos veces (12:02 y 12:26): la actualización del master (filas 26-29) propagó título y descripción a las excepciones y pisó el rótulo, que se repuso |
| 25 | (incluida en 21-24, 1.ª pasada) | `7jmf8p1l5b5q6jbtmj9uualiq8_20261020T180000Z` | Business mar 20 → «⏭ SIN SESIÓN …» a las 12:02; esa serie se borró después (fila 7) y el rótulo se repuso en la serie nueva (fila 18) |
| 26 | UPDATE (master, solo título + descr.) | `23t06e7foitmiqm24lpd0vo9jc` (AURUM F1, =) | título «· v6.02 F1» → «· v6.03 F1» · descr. v6.03: D1 mié 21-oct → D130 jue 29-abr, F1 = D1-D50 hasta mié 30-dic (lun 19 / mar 20 sin sesión), serie 30' = `ljam8b9e…`, gates vie 13-nov / vie 11-dic, historial v6.02; RRULE (UNTIL 20261231T045959Z, EXDATE 25-dic) y recordatorio intactos |
| 27 | UPDATE (master, solo título + descr.) | `uiduvkfsgs43p1u1qk1vohih58` (MIR 15:15, =) | «· v6.02» → «· v6.03» · descr.: diario 78 d **mié 21-oct → mié 10-feb** (D5 Cardiología mar 27-oct · D77 mini-MIR **mar 9-feb** · D78 mié 10-feb) · mantenimiento 57 d **jue 11-feb → jue 6-may** (Tier C 11-feb … 29-abr, 6-may) · extensión 121 filas vie 7-may → vie 24-sep + 11 repuestas mar 28-sep → mar 12-oct-2027; UNTIL vie 30-abr y EXDATE intactos |
| 28 | UPDATE (master, solo título + descr.) | `hos0tfhsr2hdfs6cgv1rmejhrs` (MIR 15:30, =) | «· v6.02» → «· v6.03» · descr.: días especiales D77 mar 9-feb / D78 mié 10-feb · mantenimiento desde jue 11-feb (Tier C los jueves, excepción mié 24-mar) · extensión desde vie 7-may; RRULE intacta |
| 29 | UPDATE (master, solo título + descr.) | `6us7kkdcuk3g7tm1cjes38leh0` (R↔D 13:30, =) | «· v6.02» → «· v6.03» · descr.: mapa mié 21 DERMA d1 · jue 22 RESEARCH R0 · vie 23 DERMA d2 · lun 26 RESEARCH R1 · mar 27 DERMA d3 · mié 28 M1 …; Research c1 **jue 22-oct → vie 19-mar** (cola tras la pausa con X-2), c2 **mar 23-mar → jue 2-sep**; Derma c1 **mié 21-oct → lun 17-may**, c2 mié 19-may → lun 26-jul; hitos 🔬 v6.03; gates vie 13-nov / vie 11-dic; UNTIL vie 30-abr y EXDATE intactos |
| 30-31 | (propagado por la fila 29) | `6us7kkdcuk3g7tm1cjes38leh0_20261022T183000Z` · `_20261023T183000Z` | jue 22 «💎 DERMA d2 (plan del mié 21)» y vie 23 «🔬 RESEARCH R1 (plan del jue 22)» + 1.ª línea v6.02d → título y descripción de la serie (los aplicó Google al actualizar el master; comprobado en `list_events`) |
| 32 | UPDATE (instancia) | `6us7kkdcuk3g7tm1cjes38leh0_20261021T183000Z` | mié 21 «🔬 RESEARCH R0 (plan del mar 20)» + 1.ª línea v6.02d → título y descripción de la serie (ya propagados; la escritura no cambió nada) |
| 33 | UPDATE (master, solo título + descr.) | `k8iaefnjq0mnrlvkilhcarrik8` (REVISIÓN SEMANAL, =) | «· v6.02» → «· v6.03» · descr.: **S01 sáb 24-oct cubre mié 21 → vie 23-oct** (D1-D3) · S04 14-nov · S05 21-nov · **S07 sáb 5-dic = DELOAD** · S11 2-ene DELOAD + auditoría NBME 28 (D50) · gates vie 13-nov / vie 11-dic · NBME 25 mar 3-nov / 26 mar 24-nov / 27 mar 15-dic · **deload de secundarios: semana del lun 30-nov** y del lun 28-dic; RRULE/EXDATE intactos |
| 34 | UPDATE (instancia) | `k8iaefnjq0mnrlvkilhcarrik8_20261024T121500Z` | dom 25-oct 11:45-12:15 «📋 REVISIÓN SEMANAL · S01 (semana corrida: dom 25 11:45)» + 1.ª línea v6.02d → **sáb 24-oct 07:15-07:45** «📋 REVISIÓN SEMANAL · v6.03» + descripción de la serie |
| 35-46 | UPDATE (overlays 🔬, payload exacto de `--print`) | M1 `shkul14j3o1bs1a5044u8ge1kk` · C-2 `iduh7fhst9uhl0t54hhk535ff4` · T-1 `95aglmlk9qi32m4bv6v28rv5b0` · C-6 `k2oov1tk0jalt5f45ekemej4k0` · CR-1 `36tp7b995jnoi844d5uvgm58t0` · T-8 `ahl0tbimefcq8u7ps2qasjb708` · CR-8 `f2mn20ok30kl5k2t1s6tci7n7c` · CR-9 `t136recadd6vnv0iebrmmqiv48` · X-1 `9hhe6q10da1ltbpk23h171gf9c` · X-9 `nibrfidt3qhct59qhtrvqpqqi0` · R10 `2k9idr3f3th6hj1e4r8ugj4iqk` · R43 `94mmg6li8egq2kh9401nti1pkg` (mismos ids) | M1 lun 26-oct → **mié 28-oct** · C-2 mar 3-nov → **jue 5-nov** · T-1 jue 5-nov → **lun 9-nov** · C-6 lun 23-nov → **mié 25-nov** · CR-1 mié 25-nov → **vie 27-nov** · T-8 mié 23-dic → **mar 29-dic** · CR-8 mar 12-ene (=, texto d28) · CR-9 jue 11-feb (=, texto d30) · X-1 mar 23-feb (=, texto) · X-9 lun 29-mar → **mié 31-mar** · R10 vie 2-abr → **mar 6-abr** (13:30-14:15) · R43 mar 27-jul → **jue 29-jul** (todo el día); 13:30-14:15, color 6, FREE |
| 47 | SCRIPT | `DATA/RESEARCH/_calendar_overlays.json` | `gen_research_calendar.js --check` exit 1 (12 «recrear») → `--print` → update ×12 → `--set` de los 12 hitos con sus ids → **`--check` exit 0 · 12/12 «nada»** · md5 9b618889… → ae126ee3… · copia previa `cal_bk/v603/_calendar_overlays.before_set_v603.json` |
| 48 | CÓDIGO | `DATA/_scripts/gen_research_calendar.js` | lo rotulado «v6.02» como VIGENTE en los textos pasa a «v6.03» y lo de v6.02 a historial ⏸ (la cabecera lo pedía «al próximo corrimiento»): `cr-caso` (C-3 = d10 en v6.03 · ⏸ v6.02: vie 13-nov / M1 lun 26-oct · ⚠ v6.03: CR-1 vie 27-nov / CR-2 mar 1-dic · ⏸ v6.02: mié 25-nov / vie 27-nov) · `equipo` (+ «⏸ v6.02: X-9 lun 29-mar / R10 vie 2-abr») · `OBJETIVO_RUTA` PROSPERO («v6.03: el átomo cae mar 6-abr (+6 d …) · ⏸ v6.02: vie 2-abr, +2 d») + nota v6.03 en la cabecera. Sin tocar `src/` ni el plan |

Todas las descripciones nuevas de las series terminan con «(v6.03 · 20-oct-2026: D1 = mié 21-oct)»; los 12 overlays llevan el payload exacto del script (sin pie). Títulos con versión: vibecoding, SYNAPSE 12:30, LIVIANO, AURUM 30', AURUM F1, MIR ×2, R↔D y REVISIÓN pasan a «· v6.03» (el título es lo único que cambia además de la descripción en las series «solo descripción»; mismo criterio que la fila 48-66 de §11.1). SYNAPSE PC sáb/dom y Business no llevan versión en el título.

### Ids vigentes que cambian

| Serie | Id v6.03 | Rango |
|---|---|---|
| 🧠 VIBECODING 04:15-05:00 · v6.03 | `i4h2gu846t9t7b16q89hnao84s` | lun 31-ago-2026 → vie 5-mar-2027 · MO-FR · EXDATE 25-dic, 31-dic, 1-ene · color 9 |
| 🧠 SYNAPSE misión 12:30-13:00 · v6.03 | `r9scujjpk93jn0fmh4rvahk68g` | jue 11-jun-2026 → lun 1-mar-2027 · MO-FR · EXDATE 25-dic, 31-dic, 1-ene · color 9 · excepciones mié 21-oct 07:25 y 3-nov · 24-nov · 15-dic · 30-dic 13:00 |
| 🧠 SYNAPSE — PC sábado (2h) | `jhsg92lo784vlr8tc5bnsag8uk` | sáb 13-jun-2026 → sáb 27-feb-2027 · SA · color 9 |
| 🧠 SYNAPSE — repaso + PC domingo (2h) | `m8kfvq6440c6al6cq47oclnoj8` | dom 28-jun-2026 → dom 28-feb-2027 · SU · color 9 |
| ⚖️ LIVIANO 17:15-18:00 · v6.03 | `jlh8agrjmkk2hudsea7mrlflf8` | lun 31-ago-2026 → vie 26-feb-2027 · MO-FR · EXDATE 25-dic, 31-dic, 1-ene · color 7 |
| 🪙 AURUM 30' núcleo · v6.03 F2-F3 | `ljam8b9e9n9oaiv80ul5c6662g` | lun 4-ene → jue 29-abr-2027 · MO-FR · EXDATE 12-mar, 15-mar, 25-mar, 26-mar · color 5 · popup 5' |
| 📚 BUSINESS · lectura/escucha del libro (25′) | `mmi1e976ubgq9s3saarbjf8o74` | jue 2-abr-2026 → jue 18-feb-2027 · MO-FR · 13:00-13:25 · EXDATE 25-dic, 31-dic, 1-ene · color 8 · excepciones 3-nov · 24-nov · 15-dic · 30-dic 12:30-12:55 |

Ya no existen (borrados hoy; respaldo en `cal_bk/v603/<id>.json`): `ef7rfg1e2dpar1n6cb17j3cf44` · `e37h4fl8gd0v7eavt1f9fgob0o` · `bbj1ne6ken46pj25i5dt36idng` · `c010a16rsl6h0lk4krr0a9r3rs` · `tah7p61p2hvn4nktgp2msl2eno` · `ig6qhqufphhbj5jllghorm23fs` · `7jmf8p1l5b5q6jbtmj9uualiq8`. Sin cambio de id: AURUM F1 `23t06e7f…`, MIR `uiduvkfs…` / `hos0tfhs…`, R↔D `6us7kkdc…`, REVISIÓN `k8iaefnj…` y los 12 overlays 🔬.

### Verificación (list_events después de los cambios; volcados en `cal_bk/v603/inst_v603/`)

| Día / ventana | Resultado |
|---|---|
| lun 19-oct | ✅ series nuevas regeneradas con su título de serie; LIVIANO «⏭ SIN SESIÓN (v6.03 …)» |
| mar 20-oct (hoy) | ✅ SYNAPSE 12:30 · Business 13:00 · R↔D 13:30 · AURUM 14:15 · MIR 15:15 / 15:30 · LIVIANO 17:15 = «⏭ SIN SESIÓN (v6.03: arranca el mié 21) · …» (vibecoding 04:15 ya había pasado: título de serie) |
| mié 21-oct | ✅ SYNAPSE **07:25-07:55** (sin instancia a las 12:30) · Business 13:00 · R↔D 13:30 con título de serie · AURUM, MIR, LIVIANO normales |
| jue 22 · vie 23-oct | ✅ R↔D con título y descripción de la serie (sin «plan del …») · LIVIANO vie 23 con título de serie |
| sáb 24-oct | ✅ solo lo nativo: REVISIÓN **07:15-07:45** «📋 REVISIÓN SEMANAL · v6.03» · PC sábado 15:00 · Anki 19:00 (+ rutinas personales) · 0 eventos v6.02d |
| dom 25-oct | ✅ PC domingo 15:00 con su título de serie · Anki 17:00 (+ rutinas) · sin revisión |
| lun 26 → dom 1-nov | ✅ las 12 series C2 con pie v6.03 · overlay 🔬 M1 mié 28-oct 13:30 · REVISIÓN sáb 31-oct 07:15 |
| mar 3-nov · mar 24-nov · mar 15-dic · mié 30-dic (NBME) | ✅ Business 12:30-12:55 · SYNAPSE 13:00-13:30 (junto al NBME de su serie) |
| vie 25-dic · jue 31-dic · vie 1-ene | ✅ 0 instancias de vibecoding, SYNAPSE, Business, LIVIANO, R↔D, AURUM F1 y MIR |
| 15-feb → 8-mar-2027 | ✅ Business último jue 18-feb · LIVIANO último vie 26-feb · PC sáb último 27-feb · dom último 28-feb · SYNAPSE último lun 1-mar · vibecoding último vie 5-mar · 0 instancias de las 7 series viejas |
| 26-abr → 2-may-2027 | ✅ AURUM 30' último jue 29-abr, ausente vie 30-abr |
| Research | ✅ `--check` exit 0 · 12/12 overlays = payload |

### Notas / pendientes
1. **Comportamiento del API comprobado hoy:** actualizar `summary`/`description` de un master **propaga a las instancias con excepción** (las pisa). Por eso las R↔D del jue 22 / vie 23 quedaron revertidas sin escribirlas y hubo que reponer los rótulos ⏭ de hoy (filas 21-24). Quien toque un master DESPUÉS de marcar instancias debe volver a marcarlas.
2. Business: se recreó con UNTIL (serie abierta + el plan termina el jue 18-feb, como pedía el encargo) y además con EXDATE 25-dic / 31-dic / 1-ene (regla «cada serie nueva lleva EXDATE de SKIP»; la app no pone Business esos días). Desde el vie 19-feb la franja 13:00 queda sin evento (antes era «LECTURA DE LIBRO» abierta): si Joseph quiere conservar la lectura después del plan Business, hay que crear una serie aparte.
3. El AVISO del overlay X-1 dice «v6.02: desplazado tras la pausa de átomos» porque sale del texto del átomo (`researchDailyPlan.ts`, generado por `gen_research_plan.js`), no de `gen_research_calendar.js`; sigue siendo cierto en v6.03 (X-1 sigue tras la pausa, ahora con X-2). No se tocó.
4. Fuera de C2 y sin tocar: ALMUERZO, ENCAPS 16:15, USMLE 07:15-18:00, ANKI, hitos (UWSA1/NBME/gates) y las rutinas personales.
5. Sin commit. Escrituras en el repo: `DATA/RESEARCH/_calendar_overlays.json` (`--set`), `DATA/_scripts/gen_research_calendar.js` (textos v6.03, fila 48) y este fichero; respaldos solo en `cal_bk/v603/` (ignorado).

### 14.3 Textos 2027 y barrido (fase D)

Ejecutado el mar 20-oct-2026, ≈12:47-12:53 Lima (17:47:53Z → 17:53:18Z). Encargo del orquestador: corregir los pendientes que dejó la fase C (§14.1 «Pendiente» y §14.2 de `CAL_V6.md`) — títulos de las 6 series USMLE, eventos ENCAPS F2 con la numeración de dia de v6.02, NBME 29 y GO/NO-GO — y barrer el resto del Calendar (oct-2026 → oct-2027) en busca de textos v6.02 presentados como vigentes. **Solo títulos y descripciones**: ninguna serie recreada, ningún evento creado ni borrado, ninguna fecha/hora/RRULE/EXDATE/color/recordatorio tocado. Sin commit (lo hace el orquestador).

## Protocolo

- `get_event` de los 15 masters antes de escribir (recurrence, horas, color, `updated`); los 18 eventos sueltos y las 4 instancias con excepción, desde el volcado `list_events` del mismo rato (mismo `updated` que el master/evento). Respaldo JSON de los 37 objetos en `DATA/_v600/cal/cal_bk/v603/_d/<id>.json` **antes** de la primera escritura (`cal_bk/` está en `.gitignore:53`; comprobado con `git check-ignore`).
- Textos nuevos generados por script (`cal_bk/v603/_d/scripts/build.js`) a partir de los respaldos, cada reemplazo con aserción «exactamente 1 coincidencia»; payloads en `cal_bk/v603/_d/payloads/`. `notificationLevel: NONE` en las 37 escrituras.
- Antes de tocar un master se listaron sus instancias con excepción (`list_events` del rango completo, comparadas por script): USMLE 31-ago → 30-dic (solo `c5e77…` tiene 2: lun 19 y mar 20-oct, títulos ⏭); `qcsv3…` (3-mar y 4-mar, línea «⚠ v6.03 · HOY = PENDIENTE F1» de C1; 22-feb y 2-mar siguen borradas); `d8252…` (5 y 12-feb siguen borradas); `bod921…` 50/50, `qqjhn7…` 39/39, `uvpo4p…` 48/48, `2fvbku…` 9/9, ANKI sáb/dom (31-ago → oct-2027): 0 excepciones. Tras cambiar cada master se **repusieron** sus excepciones (aviso 1 de §14.1 y nota 1 de §14.2: el master pisa título/descripción de las instancias con excepción).
- Fuentes de cada cifra: Supabase `study_schedule` (ENCAPS INTENSIVO dia 51-100: pre-test 55, SIM 60/65/70/75/80/85/90/95, dress 99, D-1 100; carril B banqueo dia 51-82 = dia_mant 61-92; reposición dia 83-98 con los 10 pendientes F1 en 83, 84, 86, 87, 88, 89, 91, 92, 93, 94; mini-sims F1 sim_n 3…43, checkpoint 43 vie 18-dic) · `DATA/_scripts/_encaps_intensivo_2027.sql` (cabecera v6.03) · `DATA/ENCAPS/_pendientes_f1.json` (filas v6.03: I-3 dia 93, V-2 dia 94) · `src/lib/encapsPlan.ts` (sim_n = dia: 86 y 92; claves `D86:b_msim*`, `D92:b_msim*`) · `src/lib/usmleStep1Daily.ts` (DIAS_T2 T3-T10 = C50 jue 18 · C51 vie 19 · C52 lun 22 · C53 mar 23 · C54 mié 24 · C56 lun 29 · C57 mar 30 · C79 mié 31-mar; T117 lun 9-ago = 2.ª pasada de incorrectas; colchón tramo 2 = 24 filas ≈ 63 h) · `DATA/_scripts/_fechas_v6.json` v6.03 · `src/lib/vibecodingPlan.ts` + `DATA/SYNAPSE/CURSO_IA_04H_31AGO.md` (S11-S12 → vie 15-ene, taper lun 18-ene → vie 5-mar) · backups Supabase `study_schedule_bk_v603_int_20261020` (existe).

## Operaciones (37 `update_event`)

Pie de todas las descripciones tocadas: «(v6.02 · 17-oct-2026: D1 = lun 19-oct)» ⇒ «(v6.03 · 20-oct-2026: D1 = mié 21-oct)» (NBME 29 y GO/NO-GO conservan su cola «; fecha … sin cambio»). Lo de v6.02 queda como historial «⏸ v6.02» o «dia N en v6.02».

| # | Id | Evento | Antes → después |
|---|---|---|---|
| 1 | `9274q14djfvggeajhor64oshj8` | 🇺🇸 USMLE ANKI AM (serie) | solo título «· v6.02» → «· v6.03» (descripción v6.03 de C1 intacta) |
| 2 | `76dnlc30p3hnccenpvub2d9acg` | 🇺🇸 USMLE Repaso multi-temporal (serie) | ídem |
| 3 | `c24k2n7k8qlhfimrrncf8rapgk` | 🇺🇸 USMLE PRE-TEST (serie) | ídem |
| 4 | `iuhj8busrh63ms7v4j5q8e9920` | 🇺🇸 USMLE DEEP PRIME (serie) | ídem |
| 5 | `q72kvc9pm1brlqvl6383ccr9vs` | 🇺🇸 USMLE 30Q consolidación (serie) | ídem |
| 6 | `c5e77csne1bnfps1iq7nqel84s` | 🇺🇸 USMLE Eval 18:00 (serie) | ídem |
| 7 | `c5e77csne1bnfps1iq7nqel84s_20261019T230000Z` | Eval lun 19-oct (excepción) | título repuesto tal cual estaba: «⏭ SIN SESIÓN HOY (corrido al mar 20 18:00: Day-After UWSA1 1/6) · 🇺🇸 USMLE Eval» (ver pendiente 2) |
| 8 | `c5e77csne1bnfps1iq7nqel84s_20261020T230000Z` | Eval mar 20-oct (excepción) | título repuesto: «⏭ SIN SESIÓN (v6.03: arranca el mié 21) · 🇺🇸 USMLE — Evaluación Diaria … · v6.03» (antes «… · v6.02») |
| 9 | `69tr6hqitr5fnanc2af5kvugnk` | 📋 Revisión semanal 20' F4 (serie, todo el día) | solo título «· F4 PROVISIONAL · v6.02» → «· v6.03» (descripción v6.00 sin fechas F1: intacta) |
| 10 | `4mfnu95lrhr3dmu87einr3jm5k` | 🇵🇪 banner FASE INTENSIVA F2 | título «días 53-102 · … · v6.02» → «días 51-100 · … · v6.03» · descr.: dias 53-102 → **51-100** (historial 53-102 / 58-107 / 61-110), backups + `study_schedule_bk_v603_int_20261020`, señales dia 53 → **51**, PRE-TEST dia 57 → **55**, DRESS 101 → **99**, D-1 102 → **100**, carril B dia 53-84 → **51-82**, «8 PENDIENTES F1» → **10 (dias 83-94)** + mié 3-mar I-3 · jue 4-mar V-2, secundarios v6.03 (MIR 1.ª vuelta → mié 10-feb / mantenimiento desde jue 11-feb · AURUM → jue 29-abr · SYNAPSE → lun 1-mar · LIVIANO → vie 26-feb · vibecoding S11-S12 → vie 15-ene, taper lun 18-ene → vie 5-mar), historial «v6.02 = … dias 53-102 y 8 pendientes» |
| 11 | `27bs58ee0ke180ht2rh6mgvft0` | 🎯 PRE-TEST 2026-II (vie 8-ene) | título v6.03 · «Dia 57 … (v6.02; dia 62 en v6.01 …)» → «Dia **55** … (v6.03; dia 57 en v6.02, 62 en v6.01 …)» · «los 8 pendientes F1 … 1 y 2-mar» → «los **10** … 1, 2, **3 y 4-mar**» |
| 12-19 | `g6t22lagnagt2sbrbo0n9d3u8k` · `tuqhgd12ibsc595kbemaqiu6k8` · `uvogu0gd7kufpshe2o3fffopf8` · `6shb9jps4nir60khcd6h4g0jh8` · `hl6ajs7etaqd6aici3s2vvema8` · `7afho3rf6igkk1odse31sqps4c` · `i3jhsk8hj6mj95aij99r6329mc` · `2l4c2ct9iv6dkqvpcf6chtjnu0` | 🎯 SIM #1-#8 (vie 15-ene … vie 5-mar) | título v6.03 · «Dia 62/67/72/77/82/87/92/97 (v6.02; …)» → «Dia **60/65/70/75/80/85/90/95** (v6.03; dia 62… en v6.02, …)» y el «Fuente: … (dia N, tipo sim100 …)» igual (SIM #1 no lo tenía); «mini-sim #16 / #17 absorbido» (SIM #4/#5) intacto: es el ordinal del mini-sim (Supabase `extra.minisim_absorbido`, cola III-9 + II-9 / II-7 + I-1), no un dia |
| 20 | `ip4lhi4lhigad4l1titbd36jnk` | 🎯 D-2 DRESS (jue 11-mar) | título v6.03 · dia 101 → **99** (historial 101 / 106 / 109) |
| 21 | `tl0irrsb4av0vd8d1ar8vmbuoo` | 🛌 D-1 MEDIO DÍA (vie 12-mar) | título v6.03 · dia 102 → **100** (historial 102 / 107 / 110) |
| 22 | `3vrptnmtl9vppvs6nvv25s7p3c` | 🛡 D-1 hábil del ENCAPS (vie 12-mar) | título v6.03 · «dia 102 en v6.02 —107 …—» → «dia **100** en v6.03 —102 en v6.02, 107 …—» |
| 23 | `8juk0mvl66tutdkbcei7umrs68` | 🏁 EXAMEN ENCAPS (dom 14-mar) | título v6.03 · «v6.00/v6.01/v6.02 (sin cambio de fecha)» → «…/v6.03» · «F1 dias 1-52 (lun 19-oct → …) · INTENSIVA … dias 53-102 en v6.02 …» → «F1 dias **1-50 (mié 21-oct** → mié 30-dic; v6.02: 1-52 desde el lun 19-oct) · INTENSIVA … dias **51-100 en v6.03**; 53-102 en v6.02 …» |
| 24 | `mgv06ho1cphr78rsqf9nrkgd7o` | 🇵🇪 overlay REPOSICIÓN F1 mini-sim (lun 22-feb 16:15) | título v6.03 · dia 88 → **86** (v6.02: 88 · v6.01: 93) · `D88:b_msim*` → **`D86:b_msim*`** · sim_n 88 → **86** (origen 53) · lista «8 pendientes … dia 85-94» → «**10** pendientes … dia **83-94**» + mié 3-mar (dia 93) I-3 · jue 4-mar (dia 94) V-2 · «desde el mié 3-mar vuelve la genérica» → «desde el **lun 8-mar**» · Fuente dia 88 → 86 |
| 25 | `ddfms7b6q2e3lhvvqqvr6el474` | 🇵🇪 overlay REPOSICIÓN F1 mini-sim (mar 2-mar 16:15) | título v6.03 · dia 94 → **92** (v6.02: 94) · checkpoint de la F1 «mini-sim 45» → «**mini-sim 43** (⏸ v6.02: 45)» · `D94:b_msim*` → **`D92:b_msim*`** · sim_n 94 → **92** (origen 50) · lista de 10 pendientes (dias 83-94) · genérica desde el **lun 8-mar** con «filas del carril B dia **51-82**» · Fuente dia 94 → 92 |
| 26 | `d8252hjo5ra2qlqb9bccd6vkjo` | 🇵🇪 carril B 1 → 16-feb (serie; título sin versión, intacto) | «CARRIL B (F2) · v6.02 — … dias 73-84 (v6.02; …)» → «· v6.03 — … dias **71-82** (v6.03; v6.02: 73-84; …)» · viernes 5 / 12-feb dias 77 / 82 → **75 / 80** · «8 PENDIENTES F1 (…)» → «**10** (… · v6.03: mié 3-mar I-3 · jue 4-mar V-2)» · regla genérica dia 53-84 → **51-82** · «Régimen v6.02 … dias 53-102» → «Régimen v6.03 … dias **51-100**; v6.02: 53-102 …» |
| 27 | `qcsv3oe0e7rh2vkfq301ne68ko` | 🇵🇪 carril B · reposición (serie) | título «· F2 v6.02» → «· F2 v6.03» · «(v6.02 …) 13 días = dias 85-100» → «(v6.03 …) dias **83-98** (v6.02: 85-100 …)» · corrimientos v6.01 + v6.02 **+ v6.03**, «8 primeros días» → «**10**» · viñetas dia 85/86/88/89/90/91/93/94 → **83/84/86/87/88/89/91/92**, sim_n 88 / 94 → **86 / 92** · **+2 viñetas nuevas**: mié 3-mar (dia 93) I-3 brote/bloqueo + I-OCC, jue 4-mar (dia 94) V-2 residuos/bioseguridad + III-3 (filas mant. 51-52 de la F1 v6.02) · «Regla del resto (mié 3, jue 4, lun 8, mar 9 y mié 10-mar = dias 95, 96, 98, 99 y 100) … dia 53-84» → «(lun 8, mar 9 y mié 10-mar = dias **96, 97 y 98**) … dia **51-82**» |
| 28 | `qcsv3oe0e7rh2vkfq301ne68ko_20270303T211500Z` | carril B mié 3-mar (excepción de C1) | repuesta: línea «⚠ v6.03 · HOY mié 3-mar (dia 93) = PENDIENTE F1 …» + texto nuevo de la serie; en la línea, «(los números de dia de abajo son de v6.02: restar 2)» → «(lista de abajo)» (ya no es cierto que haya que restar); título v6.03 |
| 29 | `qcsv3oe0e7rh2vkfq301ne68ko_20270304T211500Z` | carril B jue 4-mar (excepción de C1) | ídem con la línea del jue 4-mar (dia 94, V-2) |
| 30 | `bod921vej8ehllto18h0ieiuig` | F2 Anki 05:00 (serie) | título «· F2 v6.03» · dias 53-102 → **51-100** (historial) · «terminó el mié 30-dic (D52 = NBME 28 en v6.02 …)» → «(**D50** = NBME 28 en v6.03; D52 en v6.02; D57 en v6.01)» |
| 31 | `qqjhn7hnkugffrnvm5s9a0q46k` | F2 LOOP 07:15 (serie) | título «· F2 v6.03» · dias 53-102 → **51-100** · mapa barrido/carril B «v6.02: …» → «v6.03: … + mié 3-mar II-3 / carril B I-3 · jue 4-mar I-4 / carril B V-2» (Supabase dia 93/94) · secundarios SYNAPSE → lun 1-mar · AURUM → jue 29-abr · LIVIANO → vie 26-feb · vibecoding → vie 5-mar |
| 32 | `uvpo4pgrtiqp3d9p07ail1fni8` | F2 EVAL 18:00 (serie) | título «· F2 v6.03» + pie (el texto no tiene dias) |
| 33 | `2fvbkunh0nfhvhbn1b6iqvpifs` | F2 STEP 1 VIVO sáb 07:45 (serie) | título «· F2 v6.03» · sistemas F1 «(v6.02: … Neuro y, de Heme/Onco, SOLO las anemias microcíticas del D51; … T3-T8 jue 18 → lun 29-mar)» → «(v6.03: … Endo y Neuro **sin la fila v5.20 D50** —EM/desmielinizantes + meningitis + NMJ + tumores SNC—; esa fila, **Heme/Onco entera** —D51-D54, D56, D57— y la bioestadística → tramo 2, **T3-T10 jue 18 → mié 31-mar** · ⏸ v6.02: …)» · «sin cambio en v6.01 ni en v6.02» → «… v6.02 ni v6.03» |
| 34 | `ae93qv0nqqs36h439hid1jcq8o` | 🎯 NBME 29 (mié 17-mar; título «· v6.00» intacto, fecha sin cambio) | «T3-T8 (jue 18 → lun 29-mar) = Heme/Onco desplazada de F1 (v5.20 D52-D54, D56, D57) + bioestadística» → «**T3-T10 (jue 18 → mié 31-mar)** = filas desplazadas de F1 en v6.03: Neuro v5.20 D50 (EM/desmielinizantes + meningitis + NMJ + tumores SNC) + Heme/Onco (v5.20 D51-D54, D56, D57) + bioestadística (ex D79) · ⏸ v6.02: T3-T8 jue 18 → lun 29-mar» |
| 35 | `3i88pp1gj84vc0r6tuherhsc0o` | 🚦 GO/NO-GO (lun 9-ago; título «· v6.00» intacto) | «NBME 28 (mié 30-dic-2026 = d52, … en v6.02; ⏸ v6.01 …)» → «(mié 30-dic-2026 = **d50**, último día de F1, en v6.03; ⏸ v6.02: d52, misma fecha · ⏸ v6.01 …)» · «Con el adelanto (v6.02: solo con ENCAPS dom 14-mar …» → «(v6.03, igual que en v6.02: …» (comprobado con `gen_fechas_v6.js --calculo`: 14-mar → 31-ago; 21-mar → 27-sep). T117 = 2.ª pasada de incorrectas: sigue cierto |
| 36 | `00929or8op5hj28s3nbf1eo09c` | ANKI sábado (serie abierta; título intacto) | «Régimen v6.02 (corrimiento del 17-oct-2026; …): F1 lun 19-oct → mié 30-dic» → «Régimen v6.03 (corrimiento del 20-oct-2026; v6.02 del 17-oct; …): F1 **mié 21-oct** → mié 30-dic» |
| 37 | `0ar1fbrm3ts396kd96f8df753g` | ANKI domingo (serie abierta; título intacto) | «• Dom 18-oct-2026 = víspera del D1 (lun 19-oct, UWSA1 09:00)…» → «• v6.03: la víspera del D1 (UWSA1 mié 21-oct, 08:50) es el mar 20-oct, no un domingo (⏸ v6.02: dom 18-oct …)» · «Régimen v6.02 (… D1 = lun 19-oct; …)» → «Régimen v6.03 (corrimiento del 20-oct-2026: D1 = mié 21-oct; v6.02 del 17-oct: lun 19-oct; …)» |

## Verificación (list_events después de los cambios)

Volcados después (`cal_bk/v603/_d/volcados/after/`): 4-ene → 17-mar-2027 (`fullText` «20-oct-2026», 660 eventos, 3 páginas) y 19-oct → 30-dic-2026 (series USMLE, 364 eventos, 2 páginas). Script `ver.js` contra payloads y respaldos: **1.560 comprobaciones · 0 FAIL**.

| Qué | Resultado |
|---|---|
| 6 series USMLE | ✅ 52 instancias de cada una (19-oct → 30-dic) con el título «· v6.03» y la descripción de C1 **intacta**; `c5e77…`: 50 + las 2 excepciones con su título ⏭ |
| 18 eventos sueltos ENCAPS F2 + NBME 29 | ✅ título y descripción = payload; fecha y hora intactas |
| Series F2 | ✅ `bod921…` 50 · `qqjhn7…` 39 · `uvpo4p…` 48 · `2fvbku…` 9 · `d8252…` 10 · `qcsv3…` 9 + 2 excepciones = mismas instancias que antes, todas con el texto nuevo y su hora |
| Excepciones `qcsv3…` 3-mar / 4-mar | ✅ línea de pendiente F1 + texto nuevo de la serie |
| Instancias borradas | ✅ `qcsv3…` 22-feb y 2-mar, `d8252…` 5-feb y 12-feb siguen sin existir |
| ANKI sáb / dom | ✅ 9 + 9 instancias ene-mar con el texto nuevo |
| GO/NO-GO (9-ago) · Revisión F4 (may-sep) | ✅ fuera de los volcados; comprobados en la respuesta de `update_event` (texto = payload) |

Barrido de restos v6.02 (`stale.js` sobre los volcados después, patrones «D1 = lun 19-oct», «vie 30-oct / 20-nov / 11-dic», «mié 11-nov / 9-dic», «D52», «28 filas», «T3-T8», «53-102», fines v6.02 de secundarios, «dom 18-oct»…): en los eventos del plan solo quedan coincidencias en historial («⏸», «Historial: v6.02 …», «v6.02 del 17-oct: lun 19-oct») o fechas v6.03 que coinciden por casualidad (casos LIVIANO de los viernes, gate D38 vie 11-dic, deload SYNAPSE desde el lun 8-feb, CSV de Anki mié 11-nov = D16 v6.03). Comprobado en Supabase: «mini-sims ya armados vie 30-oct (V-6 + II-6) y vie 6-nov (II-10 + I-5+I-6)» de ENCAPS 16:15 (texto de C1) = filas MANTENIMIENTO dia 8 y 13 de v6.03.

Cómo se buscó: `list_events` con `fullText` «17-oct-2026» (el pie de todo lo escrito en v6.02) de lun 19-oct-2026 a vie 15-oct-2027, 14 páginas a fichero + el lun 9-nov en línea, 3.070 eventos únicos agrupados por serie; + «v6.02d» (solo historial de UWSA1, ALMUERZO 21-oct y REVISIÓN, ya v6.03) + instancias 31-ago → 18-oct de las series tocadas. Los hitos 2027 que nunca llevaron texto v6.02 (NBME 30-33, UWSA2/3, Free 120 y ventanas, D94, D95, ritual, viaje, regreso, EXAMEN Step 1, 🛡 lunes libre) no citan fechas F1 ni colchón (revisados uno a uno en v6.02, §11.4) y sus T# no cambian (fechas fijas): sin tocar.

## No tocado / pendientes para el orquestador

1. **Rutinas personales con texto v6.02** (no tocadas por instrucción: «no toques eventos personales»). Las 18 series llevan «Régimen v6.02 (D1 = lun 19-oct-2026; v6.01: lun 12-oct)» y el pie v6.02; además, como VIGENTE: EKER `22bh9m5jhc7ro6aj3m4ffjad7g` («IDENTIDAD DE EXAMEN (v6.02: … del lun 19-oct al mié 30-dic-2026 …)») · GYM lun `6740kavnfkdcvj5k149ouliauu` y BAILE lun `64lue1en3hk0cf8itml2rtlqi4` («UWSA1 lun 19-oct-2026» en su serie de los lunes; en v6.03 es mié 21-oct) · GYM vie `7sf8i7pe62pugfk4t6tcnbb9i4`, BAILE vie `5pd4jhmvl31hvbuh40vphpoc4q`, GYM mar `0dpes0ekv96a453e89m5osg06t`, BAILE mar `09me7atu516gb0k6u0rbfcj8q1` («NBME 25-27 vie 30-oct · vie 20-nov · vie 11-dic»; en v6.03 son martes 3-nov / 24-nov / 15-dic) · BAILE mié `0tod56pc6pgecm5lf7g4e3ji9v` («gates mié 11-nov y mié 9-dic», «D52 = NBME 28»; v6.03: gates vie 13-nov / vie 11-dic, D50) · BAILE dom `7j6pucil43vuca70p082g5ub3d` («Dom 18-oct-2026: víspera del D1 (lun 19-oct = UWSA1 09:00)») · solo régimen/pie: CORRER `5mrm4ru08go9k70408jm8vcjku`, CALISTENIA `2lpvftrc3fp64e0om6qg0mcs34`, DESAYUNO L-V `7agi60f2bp8qnh6cnqvfo22giv`, DESAYUNO S-D `2u9je70pif58hgf2f8t3vgu8b8`, GYM jue `4qvs34d84u82psvknpqhv3jc7a`, BAILE jue `3m8m4resu8akph4a7qfuf3h1qn`, BAILE sáb `3jkfb6097rtc1jbec19eg3sd57`, BAILE PRÁCTICA `13m3tcqjjc34rt6iqfblla18q1`, VIAJE VUELTA `3l59kpei7sg0l6kq51343or383`. En v6.00 y v6.02 se actualizaron con OK explícito; ahora requiere decisión/OK de Joseph (son series sin excepciones conocidas).
2. **Título de la Eval del lun 19-oct** (`c5e77…_20261019T230000Z`): se repuso tal cual («corrido al mar 20 18:00: Day-After UWSA1 1/6», texto v6.02d que C1 dejó adrede). En v6.03 el mar 20 tampoco tuvo sesión; si se quiere uniformar con LIVIANO lun 19 (C2), bastaría un `update_event` de título a «⏭ SIN SESIÓN (v6.03: arranca el mié 21) · …». Igual pasa con ENCAPS 16:15 del lun 19 (`papebi46…_20261019T211500Z`, de C1).
3. **`gen_fechas_v6.js --calculo` aborta** (no escribe nada): `step1.reserva_por_encaps` guardado ≠ derivado para 2027-03-21 (31-ago vs 27-sep), 2027-04-04 y 2027-04-11 (27-sep vs 25-oct). El GO/NO-GO ya decía lo del 21-mar; el EXAMEN ENCAPS `8juk…` cita la tabla guardada («14/21-mar → 31-ago · 4/11-abr → 27-sep · 18/25-abr → 25-oct») y no se cambió. Hay que decidir qué tabla manda (¿la discrepancia de 4/11-abr es nueva de v6.03?) y, si cambia, re-tocar ese texto.
4. Títulos de NBME 29 y GO/NO-GO siguen con «· v6.00» (fecha sin cambio; misma convención que FX-CAL v6.02). Descripciones ya v6.03.
5. Lo de C1/C2 no se re-escribió (UWSA1, NBME 25-28, gates, 🧯, CHECKPOINT, ENCAPS 16:15, ALMUERZO, secundarios, REVISIÓN, Research): su texto ya es v6.03.
6. Escrituras en el repo: solo este fichero. Respaldos, volcados antes/después, scripts y payloads en `DATA/_v600/cal/cal_bk/v603/_d/` (ignorado por git).

### 14.4 Verificación final (fase F): rutinas personales y títulos del lun 19

Encargo del orquestador (verificación total v6.03, parte técnica): las 18 rutinas personales que `CAL_V6.md` §14.3 dejó pendientes
(«No tocado / pendientes», punto 1) seguían citando fechas v6.02 como vigentes (UWSA1 lun 19-oct, NBME 25-27 en viernes, gates en
miércoles, D52 = NBME 28, víspera del D1 = dom 18-oct, «Régimen v6.02 (D1 = lun 19-oct-2026 …)»). Se cambian **solo esas frases del plan**
a v6.03 en la descripción; horas, títulos, recurrencia, colores y recordatorios intactos. Además, el punto 2 de §14.3: los títulos de la
Eval y del ENCAPS del lun 19-oct se uniforman con los del mar 20 («⏭ SIN SESIÓN (v6.03: arranca el mié 21) · …»).

Ejecutado el mar 20-oct-2026, ≈14:02-14:05 Lima (`updated` 19:02:44Z → 19:05:13Z). `notificationLevel: NONE` en las 20 escrituras.

## Protocolo

- **Instancias con excepción**: `list_events` con `fullText` «Régimen v6.02 (D1 = lun 19-oct-2026» del sáb 17-oct-2026 al dom 31-oct-2027
  (10 páginas, 2.331 instancias de las 18 series) + volcado completo del 19 → 25-oct. Por serie, agrupación por (título, hora, duración,
  descripción, color) y `originalStartTime` ≠ `start`: **0 excepciones** (una sola variante por serie, ninguna instancia movida) y ninguna
  instancia del 19-25 oct de estas series sin el texto v6.02. Al no haber excepciones, la actualización del master no pisa nada que haya que
  reponer.
- **Respaldo previo** (gitignored, `.gitignore:53`): `cal_bk/v603/_f/antes/<id>.json` = la instancia completa de `list_events` (mismo texto que
  el master, 0 excepciones) de las 18 series + las 5 instancias de lun 19 / mar 20 citadas; volcados en `cal_bk/v603/_f/volcados/before/`.
- **Textos** generados por script (`cal_bk/v603/_f/build.js`, cada reemplazo con aserción «exactamente 1 coincidencia»; payloads en
  `cal_bk/v603/_f/payloads/`). Lo de v6.02 queda como historial «⏸ v6.02: …».

## Reemplazos comunes (las 18)

| Antes | Después |
|---|---|
| `Régimen v6.02 (D1 = lun 19-oct-2026; v6.01: lun 12-oct)` | `Régimen v6.03 (D1 = mié 21-oct-2026; v6.02: lun 19-oct · v6.01: lun 12-oct)` |
| pie `… (v6.02 · 17-oct-2026: D1 = lun 19-oct)` | `… (v6.02 · 17-oct-2026: D1 = lun 19-oct) (v6.03 · 20-oct-2026: D1 = mié 21-oct)` |
| `⚠ v6.02 (sin cambio):` (donde estaba) | `⚠ v6.03 (sin cambio):` (el contenido —examen lun 27-sep, D94/D95, ritual, viaje, ENCAPS dom 14-mar— sigue siendo cierto) |

## Operaciones (18 `update_event` de descripción + 2 de título)

| # | Id | Serie | Cambio específico (además de los comunes) |
|---|---|---|---|
| 1 | `22bh9m5jhc7ro6aj3m4ffjad7g` | DECLARACIONES EKER (diaria 04:00) | «6. IDENTIDAD DE EXAMEN (v6.02: … del lun 19-oct al mié 30-dic-2026» → «(v6.03: … del **mié 21-oct** al mié 30-dic-2026» |
| 2 | `6740kavnfkdcvj5k149ouliauu` | GYM lunes | «4 hitos en LUNES: UWSA1 lun 19-oct · NBME 30 · 33 · Free 120 … NBME 25-27 (vie 30-oct · 20-nov · 11-dic) … serie GYM viernes» → «**3 hitos** en LUNES (NBME 30 · 33 · Free 120; GO/NO-GO lun 9-ago); el UWSA1 ya no cae en lunes (**mié 21-oct, 08:50-13:00** → serie BAILE miércoles; ⏸ v6.02: lun 19-oct). NBME 25-27 (**mar 3-nov · mar 24-nov · mar 15-dic**), UWSA3 y UWSA2 → serie GYM martes; NBME 32 → GYM viernes» |
| 3 | `64lue1en3hk0cf8itml2rtlqi4` | BAILE lunes | «⚠ v6.02:» → «⚠ v6.03:» · hitos en lunes sin el UWSA1 («el UWSA1 pasó al mié 21-oct-2026 —⏸ v6.02: lun 19-oct—») |
| 4 | `7sf8i7pe62pugfk4t6tcnbb9i4` | GYM viernes | «4 caen en viernes: NBME 25-27 + 32» → «**1** cae en viernes: NBME 32 vie 6-ago (⏸ v6.02: NBME 25-27 en viernes)» · LUNES sin UWSA1 · MARTES + NBME 25/26/27 (mar 3-nov · 24-nov · 15-dic) · MIÉRCOLES + UWSA1 mié 21-oct |
| 5 | `5pd4jhmvl31hvbuh40vphpoc4q` | BAILE viernes | «⚠ v6.02:» → «⚠ v6.03:» · «Hitos en viernes (v6.02: NBME 25-27 + 32)» → «(v6.03: NBME 32 vie 6-ago; los NBME 25-27 pasaron a martes —mar 3-nov · 24-nov · 15-dic—; ⏸ v6.02: …)» |
| 6 | `0dpes0ekv96a453e89m5osg06t` | GYM martes | «2 hitos en MARTES (UWSA3 · UWSA2) … los NBME 25-28 ya NO caen en martes (v6.02 …)» → «**5 hitos** en MARTES: NBME 25 mar 3-nov · 26 mar 24-nov · 27 mar 15-dic (07:00-12:30) · UWSA3 · UWSA2; NBME 28 mié 30-dic (serie BAILE miércoles); ⏸ v6.02: NBME 25-27 en viernes» |
| 7 | `09me7atu516gb0k6u0rbfcj8q1` | BAILE martes | ídem 6 («serie del miércoles») |
| 8 | `0tod56pc6pgecm5lf7g4e3ji9v` | BAILE miércoles | hitos en miércoles **+ UWSA1 mié 21-oct = D1 (08:50-13:00)**; «gates F1 mié 11-nov y mié 9-dic» → «los gates pasaron a viernes (**vie 13-nov · vie 11-dic**; ⏸ v6.02: …)»; «El UWSA1 ya no cae en miércoles (v6.02: lun 19-oct)» → «el UWSA1 vuelve a caer en miércoles (⏸ v6.02: lun 19-oct)»; «(D52 = NBME 28)» → «(**D50** = NBME 28; ⏸ v6.02: D52)» |
| 9 | `7j6pucil43vuca70p082g5ub3d` | BAILE domingo | «Dom 18-oct-2026: víspera del D1 (lun 19-oct = UWSA1 09:00) → cama 21:00 sin excepción.» → «v6.03: la víspera del D1 (UWSA1 mié 21-oct, 08:50) es el mar 20-oct, no un domingo (⏸ v6.02: dom 18-oct …)» |
| 10 | `5mrm4ru08go9k70408jm8vcjku` | CORRER | solo comunes |
| 11 | `2lpvftrc3fp64e0om6qg0mcs34` | CALISTENIA | solo comunes |
| 12 | `7agi60f2bp8qnh6cnqvfo22giv` | DESAYUNO L-V | solo comunes |
| 13 | `2u9je70pif58hgf2f8t3vgu8b8` | DESAYUNO sáb/dom | solo comunes |
| 14 | `4qvs34d84u82psvknpqhv3jc7a` | GYM jueves | solo comunes |
| 15 | `3m8m4resu8akph4a7qfuf3h1qn` | BAILE jueves | solo comunes |
| 16 | `3jkfb6097rtc1jbec19eg3sd57` | BAILE sábado | solo comunes |
| 17 | `13m3tcqjjc34rt6iqfblla18q1` | BAILE PRÁCTICA (dom) | solo comunes |
| 18 | `3l59kpei7sg0l6kq51343or383` | 🚗 VIAJE VUELTA | solo comunes |
| 19 | `papebi46etlo8glgfs5akd5mig_20261019T211500Z` | ENCAPS lun 19-oct (instancia) | título «⏭ SIN SESIÓN HOY (corrido al mar 20 16:15: PRE-TEST 1/2) · 🇵🇪 ENCAPS» → «⏭ SIN SESIÓN (v6.03: arranca el mié 21) · 🇵🇪 ENCAPS — 1h Banqueo Mantenimiento (pronóstico v3 · rotación II·I·V·III·IV)» (= mar 20) |
| 20 | `c5e77csne1bnfps1iq7nqel84s_20261019T230000Z` | USMLE Eval lun 19-oct (instancia) | título «⏭ SIN SESIÓN HOY (corrido al mar 20 18:00: Day-After UWSA1 1/6) · 🇺🇸 USMLE Eval» → «⏭ SIN SESIÓN (v6.03: arranca el mié 21) · 🇺🇸 USMLE — Evaluación Diaria Acumulativa (Modo Examen timed + Corrección) · v6.03» (= mar 20) |

ALMUERZO (`43dq3oib16esjcqj1dcd8osot2`) no se tocó: su descripción ya es v6.03 (las coincidencias «v6.02 / lun 19-oct» son historial).

## Verificación

- `list_events` `fullText` «Régimen v6.02 (D1 = lun 19-oct-2026» del 17-oct-2026 al 31-oct-2027 **después**: **0 eventos** (antes: 2.331 instancias).
- Volcado completo 19 → 25-oct antes/después (`cal_bk/v603/_f/volcados/{before,after}/todo_19-25oct.json`) comparado con `ver.js`:
  171 = 171 eventos, **387 comprobaciones OK · 0 FAIL** (instancias de las 18 series = payload con su hora y título; las 2 instancias del
  lun 19 con el título nuevo y la descripción intacta; el resto de eventos sin cambio de título, descripción, color ni hora).
- Las respuestas de `update_event` devolvieron, en las 18 series, la misma RRULE/EXDATE, hora, color y recordatorios que antes.

## No tocado / observaciones (para el orquestador)

1. Lun 19 y mar 20-oct: las instancias de la mañana (vibecoding 04:15, Anki 05:00, repaso 07:15, pre-test 08:15, deep prime 09:00, 30Q 11:00)
   y las de la tarde del lun 19 (SYNAPSE 12:30, Business, R↔D, AURUM, MIR) conservan el título genérico (días ya pasados; la app los
   marca CORRIDO). Solo se uniformó lo pedido (Eval y ENCAPS del lun 19).
2. Sábados de F1 07:45-08:00 (cierre del OUTPUT de Business, tracker semanal): la app tiene el bloque; el Calendar no tiene evento propio —lo
   cubre la descripción de la serie Business (`mmi1e976ubgq9s3saarbjf8o74`: «Viernes de OUTPUT: 25′ ese día + 15′ el sábado tras la
   revisión semanal»)—. Crear un evento queda a decisión de Joseph.
3. Días de hito (UWSA1 mié 21 · NBME en martes): las series USMLE de la mañana siguen solapadas con el overlay 🎯 (convención de §12/§14:
   manda la descripción del hito y la app).

## 15. Semana corrida v6.04a (mié 21-oct-2026 · jue 22 = plan del mié 21)
Deshecho nada de §14: se aplica por instancia (sin tocar masters). Respaldos en `cal_bk/v604/` (gitignored).


Orden de Joseph (mié 21-oct, sin estudio ese día): «lo del 21 para el 22, lo del 22 para el 23, lo del 23 repártelo entre el 24 y el 25; del 26 en adelante se mantiene tal como está; no hagas tantas modificaciones». La app ya lo aplica como alias en la consulta (commit `6de3f14`, `corrida_s1` de `DATA/_scripts/_fechas_v6.json`: sin sesión 19/20/21 · jue 22 = plan del mié 21 · vie 23 = plan del jue 22 · plan del vie 23 → sáb 24 (mañana + eval 13:30) y dom 25 (tarde desde 07:15 + revisión 11:45 + cierre del OUTPUT 12:15)). Este registro es solo el Google Calendar de la semana (josephsototocas@gmail.com · America/Lima).

Ejecutado el mié 21-oct-2026, ≈11:41-11:44 Lima (`updated` 16:41:23Z → 16:43:43Z). **20 `update_event` + 13 `create_event` = 33 escrituras.**

## Protocolo

- `get_event` antes de cada escritura (15 eventos; el `updated` coincidió con el volcado `list_events` 21 → 27-oct tomado a las ≈11:39) y volcado del mismo minuto para los 5 restantes (R↔D jue 22 / vie 23, ENCAPS jue 22 / vie 23, LIVIANO vie 23; sin cambios desde el 20-oct).
- Respaldo JSON de cada evento en `DATA/_v600/cal/cal_bk/v604/<id>.json` (20 ficheros) + volcados antes/después `cal_bk/v604/volcados/list_21-27oct_{before,after}.json` + los 13 creados en `cal_bk/v604/creados_v604a.json` (`cal_bk/` está en `.gitignore:53`).
- `notificationLevel: NONE` en todo. **Ningún master tocado** (todo por instancia: el API propaga summary/description de un master a las excepciones), ninguna serie recreada, RRULE/EXDATE intactos, sin `delete_event`. Nada ≥ lun 26-oct tocado. Recordatorios de finanzas y rutinas personales sin tocar.
- Textos largos (UWSA1, ALMUERZO) generados por script con reemplazos «exactamente una vez» (`cal_bk/v604/build.js`, payloads en `cal_bk/v604/payloads/`).
- Contenido de cada bloque comprobado contra la app (`plantillaDelDia` + guías, réplica de `TodayMission`): jue 22 = D1 UWSA1 · Derma d1 · ENCAPS dia 1 pre-test 1/2 · LIVIANO d1; vie 23 = D2 Pathoma 1-2 · Research R0 · ENCAPS dia 2 pre-test 2/2 · LIVIANO d2 (no es caso); sáb 24 = USMLE D3 Pathoma 3 neoplasia · vibecoding S1 k3 · SYNAPSE d3 · Business D3 OUTPUT S1 · Day-After 5/6; dom 25 = Derma d2 · AURUM D3 · MIR D3 (pruebas diagnósticas) · ENCAPS dia 3 mini-sim #3 · LIVIANO d3 caso 1.

## Operaciones

| # | Tipo | Id | Antes → después |
|---|---|---|---|
| 1 | MOVE + DESCR | `o1gla7846uae4tgngvc4q45osg` (🎯 UWSA1, título igual) | mié 21-oct 08:50-13:00 → **jue 22-oct 08:50-13:00** · descripción: «D1 DEL PLAN = mié 21-oct → SE HACE EL JUE 22-OCT (lun 19, mar 20 y mié 21 sin estudio · v6.04 semana corrida …)» · resto del vídeo Palmerton 26:00-38:13 → sáb 24 05:00 · Day-After 1/6 jue 22 18:00 · 2/6 vie 23 05:00 · 3/6 vie 23 07:15 · 4/6 vie 23 18:00 · 5/6 sáb 24 13:30 · 6/6 + eval reducida lun 26 18:00 · PRE-TEST ENCAPS parte 1 hoy (jue 22 16:15), parte 2 vie 23 16:15 · primer día de contenido = vie 23 (D2, plan del jue 22); D3 = sáb 24 + dom 25 · línea «Plan» con la regla v6.04 · historial «→ v6.04 (21-oct): mié 21 → jue 22 (semana corrida)» · respaldos «… v603/ y v604/» |
| 2 | MOVE + TÍTULO (instancia) | `r9scujjpk93jn0fmh4rvahk68g_20261021T173000Z` (🧠 SYNAPSE) | mié 21 07:25-07:55 → **12:30-13:00** (su hora de serie) · título «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · 🧠 SYNAPSE — misión del día (30') · v6.03» |
| 3 | MOVE (instancia) | `r9scujjpk93jn0fmh4rvahk68g_20261022T173000Z` | jue 22 12:30-13:00 → **07:25-07:55** (dentro de la preparación del UWSA1); texto intacto |
| 4 | MOVE + DESCR (instancia) | `43dq3oib16esjcqj1dcd8osot2_20261021T170000Z` (ALMUERZO) | mié 21 13:00-13:30 con el texto «🎯 HOY (mié 21-oct, UWSA1 …)» → **12:00-12:30** con el texto de la serie |
| 5 | MOVE + DESCR (instancia) | `43dq3oib16esjcqj1dcd8osot2_20261022T170000Z` | jue 22 12:00-12:30 (texto de la serie) → **13:00-13:30** + texto del día del UWSA1 («🎯 HOY (jue 22-oct, UWSA1 08:50-13:00 · D1 del plan, corrido del mié 21 · v6.04 semana corrida) …; 13:30 Derma d1 (plan del mié 21)») |
| 6 | TÍTULO (instancia) | `mmi1e976ubgq9s3saarbjf8o74_20261021T180000Z` (📚 BUSINESS mié 21 13:00) | título de la serie → «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · 📚 BUSINESS · lectura/escucha del libro (25′)» |
| 7 | TÍTULO (instancia) | `6us7kkdcuk3g7tm1cjes38leh0_20261021T183000Z` (R↔D mié 21 13:30) | → «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · 🔬 RESEARCH ↔ 💎 DERMA … · v6.03» |
| 8 | TÍTULO (instancia) | `23t06e7foitmiqm24lpd0vo9jc_20261021T191500Z` (AURUM mié 21 14:15) | → «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · 🪙 AURUM — Closer de ventas … · v6.03 F1» |
| 9 | TÍTULO (instancia) | `uiduvkfsgs43p1u1qk1vohih58_20261021T201500Z` (MIR eval mié 21 15:15) | → «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · 🇪🇸 MIR — Evaluación Anclada D-1 … · v6.03» |
| 10 | TÍTULO (instancia) | `hos0tfhsr2hdfs6cgv1rmejhrs_20261021T203000Z` (MIR deep mié 21 15:30) | → «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · 🇪🇸 MIR — Deep Work Mini … · v6.03» |
| 11 | TÍTULO (instancia) | `papebi46etlo8glgfs5akd5mig_20261021T211500Z` (ENCAPS mié 21 16:15) | → «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · 🇵🇪 ENCAPS — 1h Banqueo Mantenimiento …» |
| 12 | TÍTULO (instancia) | `jlh8agrjmkk2hudsea7mrlflf8_20261021T221500Z` (LIVIANO mié 21 17:15) | → «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · ⚖️ LIVIANO — Academia … · v6.03» |
| 13 | TÍTULO (instancia) | `c5e77csne1bnfps1iq7nqel84s_20261021T230000Z` (Eval mié 21 18:00) | → «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · 🇺🇸 USMLE — Evaluación Diaria Acumulativa … · v6.03» |
| 14 | TÍTULO (instancia) | `6us7kkdcuk3g7tm1cjes38leh0_20261022T183000Z` (jue 22 13:30, =) | título de la serie → «💎 DERMA d1 (plan del mié 21)» |
| 15 | TÍTULO (instancia) | `6us7kkdcuk3g7tm1cjes38leh0_20261023T183000Z` (vie 23 13:30, =) | → «🔬 RESEARCH R0 (plan del jue 22)» |
| 16 | TÍTULO (instancia) | `papebi46etlo8glgfs5akd5mig_20261022T211500Z` (jue 22 16:15, =) | → «🇵🇪 ENCAPS — PRE-TEST DE ARRANQUE 1/2 (plan del mié 21)» |
| 17 | TÍTULO (instancia) | `papebi46etlo8glgfs5akd5mig_20261023T211500Z` (vie 23 16:15, =) | → «🇵🇪 ENCAPS — PRE-TEST DE ARRANQUE 2/2 (plan del jue 22) · mini-sim → dom 25 10:00» |
| 18 | TÍTULO (instancia) | `jlh8agrjmkk2hudsea7mrlflf8_20261023T221500Z` (vie 23 17:15, =) | → «⚖️ LIVIANO — Academia (plan del jue 22) · caso 1 → dom 25 11:00» (vie 23 = d2 FISIOLOGÍA; el caso 1 es el d3) |
| 19 | MOVE + TÍTULO (instancia) | `k8iaefnjq0mnrlvkilhcarrik8_20261024T121500Z` (📋 REVISIÓN SEMANAL) | sáb 24 07:15-07:45 «📋 REVISIÓN SEMANAL · v6.03» → **dom 25 11:45-12:15** «📋 REVISIÓN SEMANAL · S01 (semana corrida: dom 25 11:45)»; descripción de la serie intacta; la del sáb 31-oct sigue a las 07:15 |
| 20 | TÍTULO (instancia) | `m8kfvq6440c6al6cq47oclnoj8_20261025T200000Z` (PC domingo 15:00, =) | → «🧠 SYNAPSE — repaso + PC domingo (2h) · semana corrida: la revisión S01 ya fue a las 11:45 → aquí solo el Feynman 10′ (opcional)» |
| 21 | CREATE (sáb 24) | `guvob5mktpr362c40opm3i6sr0` | 04:15-05:00 «🧠 IA — VIBECODING · S1 3/5 (plan del vie 23)» · color 9 |
| 22 | CREATE (sáb 24) | `sicdv31pdu5j5dv2dffu5om0jo` | 05:00-05:45 «🇺🇸 USMLE — ANKI AM (plan del vie 23)» · color 2 (+ vídeo Palmerton 26:00-38:13) |
| 23 | CREATE (sáb 24) | `70or2b5e8g0i2l3mbbbmq5keio` | 07:15-12:00 «🇺🇸 USMLE — D3 Neoplasia · Pathoma 3 (plan del vie 23): repaso 07:15 · pre-test 08:15 · deep prime 09:00 · 30Q 11:00» · color 2 |
| 24 | CREATE (sáb 24) | `k3u0r2pa2mg0momd4kp98bdf44` | 12:30-13:00 «🧠 SYNAPSE — misión del día (plan del vie 23)» · color 9 |
| 25 | CREATE (sáb 24) | `0ldac4cotui5f1edl2p9e93qhg` | 13:00-13:25 «📚 BUSINESS — OUTPUT S1 (plan del vie 23)» · color 8 |
| 26 | CREATE (sáb 24) | `n1bfsoco9lsd91l1m1lsm6ve88` | 13:30-14:15 «🇺🇸 USMLE — Evaluación · Day-After UWSA1 5/6 (plan del vie 23)» · color 11 (a las 18:00 del sábado está el bloque de YouTube) |
| 27 | CREATE (dom 25) | `b3gb3i6eguhqnvhhpie2rb3p6s` | 07:15-08:00 «💎 DERMA d2 (plan del vie 23)» · color 1 |
| 28 | CREATE (dom 25) | `do2kgg9lo48hkmsitgv31louf8` | 08:00-09:00 «🪙 AURUM — Closer de ventas · D3 (plan del vie 23)» · color 5 · popup 5′ (= serie AURUM F1) |
| 29 | CREATE (dom 25) | `agdpe5cb2oonkvkm211qovq1sc` | 09:00-09:15 «🇪🇸 MIR — Evaluación Anclada D-1 (plan del vie 23)» · color 1 |
| 30 | CREATE (dom 25) | `9tv9ojmkhvclkdii0eeshr6b9c` | 09:15-10:00 «🇪🇸 MIR — Deep Work Mini · D3 (plan del vie 23)» · color 1 |
| 31 | CREATE (dom 25) | `vrh99092rppa59vjui0dv80mp4` | 10:00-11:00 «🇵🇪 ENCAPS — MINI-SIM 25Q · dia 3 (plan del vie 23)» · color 1 |
| 32 | CREATE (dom 25) | `crme2lf2urvualir4hh2n8dckg` | 11:00-11:45 «⚖️ LIVIANO — caso 1 (plan del vie 23)» · color 7 |
| 33 | CREATE (dom 25) | `pdc443ud93e03euvdq1ojtkh7k` | 12:15-12:30 «📚 BUSINESS — cierre del OUTPUT S1 (del sábado)» · color 8 |

Descripción de los eventos creados: «Semana corrida (v6.04, orden del mié 21-oct): plan del vie 23 · qué/cuánto/cómo en Joseph MD → Home (manda la app) · desde el lun 26 nada cambia» + una línea con el contenido del bloque (fila 33: «cierre del OUTPUT S1 del sábado (sáb 07:45 → dom 25 12:15, tras la revisión semanal de las 11:45) · tracker semanal …»). Colores = los de su serie (vibecoding 9 · ANKI AM 2 · DEEP PRIME 2 · SYNAPSE 9 · BUSINESS 8 · EVAL 11 · R↔D 1 · AURUM F1 5 · MIR 1 · ENCAPS 1 · LIVIANO 7); recordatorios por defecto salvo AURUM (popup 5′, como su serie).

## Verificación (list_events 21 → 27-oct después de los cambios)

Comparación por script (`cal_bk/v604/ver.js`) del volcado antes (171 eventos) y después (184): **20 tocados × 4 comprobaciones (título, hora, descripción, color) = 80 OK · 151 eventos restantes con contenido idéntico (título, descripción, color, estado, transparencia, hora) · 13 nuevos, todos en sáb 24 / dom 25 · 0 FAIL.** Cruce app ↔ Calendar (`plantillaDelDia` de cada día contra los eventos del volcado): cada bloque de la app del jue 22 al mar 27 tiene su evento a su hora; el mié 21 todas las instancias de plan desde las 12:00 llevan «⏭ SIN SESIÓN».

| Día | Resultado |
|---|---|
| mié 21-oct (hoy, sin estudio) | ✅ sin UWSA1 · ALMUERZO 12:00-12:30 (texto de la serie) · SYNAPSE 12:30, Business 13:00, R↔D 13:30, AURUM 14:15, MIR 15:15 / 15:30, ENCAPS 16:15, LIVIANO 17:15 y Eval 18:00 = «⏭ SIN SESIÓN (v6.04: arranca el jue 22) · …» |
| jue 22 (= plan del mié 21) | ✅ SYNAPSE 07:25 · UWSA1 08:50-13:00 · ALMUERZO 13:00-13:30 (texto del día) · Business 13:00 (audio en el almuerzo) · DERMA d1 13:30 · ENCAPS PRE-TEST 1/2 16:15 · Eval 18:00 (= Day-After 1/6) |
| vie 23 (= plan del jue 22) | ✅ SYNAPSE 12:30 · RESEARCH R0 13:30 · ENCAPS PRE-TEST 2/2 16:15 (mini-sim → dom 25) · LIVIANO (plan del jue 22; caso 1 → dom 25) · Eval 18:00 (= Day-After 4/6) |
| sáb 24 (= mañana del vie 23) | ✅ 04:15 vibecoding S1 3/5 · 05:00 Anki AM · 07:15-12:00 USMLE D3 · 12:30 SYNAPSE · 13:00 Business OUTPUT · 13:30 Eval (Day-After 5/6) · PC sábado 15:00, YouTube 17:00, Anki 19:00 (sin cambio) · la REVISIÓN de las 07:15 ya no está |
| dom 25 (= tarde del vie 23) | ✅ 07:15 DERMA d2 · 08:00 AURUM D3 · 09:00 MIR eval · 09:15 MIR deep D3 · 10:00 ENCAPS mini-sim dia 3 · 11:00 LIVIANO caso 1 · 11:45 REVISIÓN S01 · 12:15 cierre OUTPUT · PC domingo 15:00 (solo Feynman) · Anki 17:00 (sin cambio) |
| lun 26-oct | ✅ 28/28 eventos con el mismo contenido que antes (título, descripción, hora, color) |
| mar 27-oct | ✅ sin cambio |

## No tocado / notas para el orquestador

1. Masters sin tocar → sus descripciones siguen en v6.03 (p. ej. la serie ENCAPS dice «Mié 21-oct (dia 1) … vie 23 MINI-SIM … sáb 24 y dom 25 libres»; la serie Eval dice «Day-After mié 21, jue 22, vie 23 y lun 26»; R↔D «mapa de arranque v6.03: mié 21 DERMA d1 …»; REVISIÓN «S01 sáb 24-oct cubre mié 21 → vie 23»). Los títulos «(plan del …)» de las instancias y la regla «manda la app» cubren la semana; tocar un master pisaría las 20 instancias de esta ronda (aviso 1 de §14.1 de `CAL_V6.md`).
2. Instancias de la mañana del mié 21 (vibecoding 04:15, Anki 05:00, repaso 07:15, pre-test 08:15, deep prime 09:00, 30Q 11:00) con su título de serie (ya pasadas; la app marca el día CORRIDO). Las del jue 22 / vie 23 de las series USMLE, ANKI AM, vibecoding, SYNAPSE (vie 23), AURUM, MIR y Business conservan el título genérico: el contenido del día de plan lo da la app (`fechaPlanDe`). El jue 22 las series USMLE de la mañana se solapan con el UWSA1 (convención de §12/§13/§14).
3. Hitos (NBME 25-28, gates, CHECKPOINT, deload), series y todo lo ≥ lun 26-oct: sin cambio (la orden fija del 26 en adelante). Sin commit.
4. Escrituras en el repo: solo este fichero. Respaldos, volcados, payloads y scripts en `DATA/_v600/cal/cal_bk/v604/` (ignorado por git).

## 16. Examen Step 1 lun 25-oct-2027 (v6.04b)
Respaldos en `cal_bk/v604b/` (gitignored). Ids NUEVOS: revisión F4 `55474jts1urh7s9j1nrtdkvfdg` (antes 69tr6hqitr5fnanc2af5kvugnk) · ANKI sábado `r9eglu07f5lvltvpoue3v4ks6o` (antes 00929or8op5hj28s3nbf1eo09c) · ANKI domingo `5s64scagno3jo983gg6rfdo5qg` (antes 0ar1fbrm3ts396kd96f8df753g).


Google Calendar principal · America/Lima. Orden de Joseph (21-oct): «si llevo tantos días perdidos, alarga la fecha del examen».
Código ya desplegado en el commit `e4340a5` (`_fechas_v6.json` v6.04 · `fechasV6.ts` · `usmleStep1Daily.ts` DIAS_T2 T1-T182 ·
`mirMantenimiento.ts` 203 sesiones). Este registro es solo el Calendar. Nada anterior al mar 16-mar-2027 cambió de fecha
(lo de antes solo cambió de texto). La semana corrida de octubre-2026 (§15 de `CAL_V6.md`) no se tocó.

Ejecutado el mié 21-oct-2026, ≈12:11-12:28 Lima (`updated` 17:11:53Z → 17:27:59Z). **47 escrituras**: 41 `update_event`,
3 `create_event` y 3 `delete_event`. Todas con `notificationLevel: NONE`.

## Fuentes de cada fecha

- `src/lib/fechasV6.ts`: examen 2027-10-25 · GO/NO-GO 2027-09-06 (E-49) · ritual 2027-10-23 · viaje 2027-10-24 · protegidos 23/24/25-oct · F4 lun 3-may → sáb 23-oct · F5 desde mar 26-oct · DJ1_V6 = 25-oct para cualquier ENCAPS · STEP1_SEMANAS 43.
- `src/lib/usmleStep1Daily.ts`: DIAS_T2 T129 NBME 31 lun 23-ago (ventana 23-28 ago) · T135 NBME 32 lun 30-ago (30-ago → 4-sep) · T141 GO/NO-GO (2.ª pasada de incorrectas) · T142 UWSA2 mar 7-sep (6-11 sep) · T159 NBME 33 lun 27-sep (27-sep → 2-oct) · T169 Free 120 + 4 bloques vie 8-oct 07:00-16:30 (4-9 oct) · colchón de cierre T176 sáb 16-oct · taper T177-T179 lun 18 → mié 20-oct · USMLE_TAPER (D94 jue 21-oct 04:05-06:05 · D95 vie 22-oct 04:05-05:05 · ritual · D-1 · examen · regreso mar 26-oct · permiso de examen a más tardar el lun 27-sep).
- `src/lib/usmleScores.ts` (HITOS_ONTRACK v6.04): textos del GO/NO-GO, NBME 33 (< 65 % → extensión) y tramos del NBME 28.
- `src/lib/mirMantenimiento.ts`: extensión 145 filas vie 7-may → vie 22-oct (96 lun-jue · 25 viernes · 24 sábados) + 1 repuesta mar 26-oct = 203 sesiones.

## Protocolo

- `get_event` antes de escribir cada hito y cada serie que se recreó. En las series que solo cambiaron de texto, el estado previo se tomó de un volcado `list_events` del mismo rato, con el mismo `updated` que el master. Respaldos en `DATA/_v600/cal/cal_bk/v604b/<id>.json` (44 ficheros, más los bundles `_bundle_A*.json` y los volcados previos en `volcados/`). `cal_bk/` está en `.gitignore:53`, comprobado con `git check-ignore`.
- Para cambiar un UNTIL o un EXDATE, la serie se recreó: `create_event` con el mismo DTSTART, hora, color, recordatorios y descripción, más el UNTIL o EXDATE nuevo; después se comprobó la respuesta y se hizo `delete_event` de la vieja. Antes de recrear se compararon todas las instancias con su RRULE (`scripts/inst.js`): Revisión F4 20/20, ANKI sáb 90/90, ANKI dom 90/90, sin excepciones.
- Los textos de la fase C salen de un script (`scripts/build_c.js`). Cada reemplazo lleva la aserción «exactamente 1 coincidencia» sobre el texto del volcado previo (0 fallos). Los payloads están en `payloads/<id>.txt`. Lo de v6.00-v6.03 queda como historial «⏸». El pie de todo lo escrito es «(v6.04 · 21-oct-2026: examen Step 1 lun 25-oct-2027)».
- En los masters con excepciones (Eval 18:00, SYNAPSE, MIR ×2, REVISIÓN) solo se cambió la descripción, no el título. Las excepciones conservaron su título y su hora (ver Verificación).

## A. Hitos 2027 (mismos ids, 22 `update_event`)

| Id | Evento | Antes → después |
|---|---|---|
| `l771lvcfv0jcebt61do6svia18` | 🎯 NBME 31 | mié 28-jul 07:00-12:15 → **lun 23-ago 07:00-12:15** (T129, E-63) · título «· v6.04» · texto v6.04 (GO/NO-GO lun 6-sep · UWSA2 mar 7-sep · NO-GO → extensión de la elegibilidad nov-dic-ene) |
| `alb6i6bnjtgqm5ibv6muo5imcg` | 🪟 Ventana NBME 31 | 26 → 31-jul → **lun 23 → sáb 28-ago** (todo el día) |
| `h65e772pqsa4hgc5b6bh9n8h50` | 🎯 NBME 32 | vie 6-ago → **lun 30-ago 07:00-12:15** (feriado Santa Rosa; T135, E-56; day-after mar 31-ago) |
| `fepdb3cmgc0puj7tksm96ufhs4` | 🪟 Ventana NBME 32 | 2 → 7-ago → **lun 30-ago → sáb 4-sep** |
| `3i88pp1gj84vc0r6tuherhsc0o` | 🚦 GO/NO-GO (E-49) | lun 9-ago → **lun 6-sep** (todo el día) · T141 · 294 h al 25-oct · GO → cita del 25-oct + permiso ≤ lun 27-sep · NO-GO → extensión (sin adelanto en v6.04) |
| `2u7viv0elr6aedo0m9undfa5kg` | 🎯 UWSA2 | mar 10-ago → **mar 7-sep 07:00-11:15** (T142, E-48; day-after mié 8-sep) |
| `tda895k00safeu1silkq53t1ps` | 🪟 Ventana UWSA2 | 9 → 14-ago → **lun 6 → sáb 11-sep** |
| `la5rsbuiqj1o35lb5adf93abuo` | 🎯 NBME 33 | lun 30-ago 07:00-16:30 «+ 3 bloques = ensayo 7 bloques» → **lun 27-sep 07:00-12:15, NBME 33 solo** (T159, E-28) · título «🎯 NBME 33 (200Q) + repaso FA 11-14 · PROVISIONAL · v6.04» · «permiso del examen: pedirlo como muy tarde HOY» |
| `mpfd71n65pnf3su7ig712hcc1o` | 🪟 Ventana NBME 33 | 30-ago → 4-sep → **lun 27-sep → sáb 2-oct** · título sin «+ 3 bloques» |
| `lh9jfjsmoif74ci6jcn8f1mq30` | 🎯 Free 120 | lun 13-sep 07:00-10:15 → **vie 8-oct 07:00-16:30 = Free 120 + 4 bloques (ensayo 7 bloques)** (feriado Combate de Angamos; T169, E-17) · título «🎯 FREE 120 oficial + 4 bloques = ENSAYO 7 BLOQUES + logística del examen · PROVISIONAL · v6.04» · cierre/taper/checklist con fechas v6.04 |
| `oupbht84p59h0oss75aehm9s4k` | 🪟 Ventana Free 120 | 13 → 18-sep → **lun 4 → sáb 9-oct** · título «Ventana Free 120 + 4 bloques» |
| `neboplchsaua4snj39nrl480nc` | 🏁 D94 | jue 23-sep 04:05-06:05 → **jue 21-oct 04:05-06:05** (T180) |
| `n90bdqhohadu1eqbctv148dn28` | 🛌 D95 | vie 24-sep 04:05-05:05 → **vie 22-oct 04:05-05:05** (T181) |
| `e3dqhtc4nr3lttiu39jgdtkues` | 🛡 RITUAL | sáb 25-sep → **sáb 23-oct** (todo el día; T182) |
| `3ph93qla4c15sk8vjt3ibl0nm8` | 🚌 VIAJE A LIMA (D-1) | dom 26-sep → **dom 24-oct** |
| `oinh139dsnbuma9r3kfu56dhkc` | 🎯 EXAMEN USMLE STEP 1 | lun 27-sep 07:00-16:00 → **lun 25-oct-2027 07:00-16:00** · título «EXAMEN lun 25-oct-2027 … · v6.04» · DJ-1 v6.04 · recta final v6.04 · colchón 48 filas ≈ 126 h · historial v6.00-v6.03 |
| `c0g48p72o4441tgcecmlg8s8lo` | 🚌 REGRESO | mar 28-sep → **mar 26-oct** (arranque F5 + la sesión MIR repuesta d203) |
| `ae93qv0nqqs36h439hid1jcq8o` | 🎯 NBME 29 | fecha sin cambio (mié 17-mar) · solo texto: examen 25-oct · GO/NO-GO 6-sep · colchón 48 filas (título «· v6.00» intacto, como en v6.02/v6.03) |
| `mael3p9uhp036jbep45ql6v9oc` | 🎯 NBME 30 | fecha sin cambio (lun 24-may) · E-126 → **E-154**, examen 25-oct (título intacto) |
| `3bdlibt00dp3lbkcd2l19cstfk` | 🪟 Ventana NBME 30 | sin cambio de fecha · examen 25-oct |
| `p0pstc1topo0sc87bieudrvrbg` | 🎯 UWSA3 (opc.) | fecha sin cambio (mar 29-jun) · E-90 → **E-118**, examen 25-oct; «sin adelanto en v6.04 → el UWSA3 se mantiene» |
| `meprb68otcauq9s07ldlibscu8` | 🪟 Ventana UWSA3 | sin cambio de fecha · examen 25-oct |

## B. Series de 2027 recreadas (3 `create_event` + 3 `delete_event`)

| Serie | Id viejo → id nuevo | Antes → después |
|---|---|---|
| 📋 Revisión semanal 20' F4 (todo el día, FREE) | `69tr6hqitr5fnanc2af5kvugnk` → **`55474jts1urh7s9j1nrtdkvfdg`** | DTSTART sáb 8-may-2027 = · `UNTIL=20270918` (20 sábados) → **`UNTIL=20271016`** (24 sábados: el sáb 23-oct es el ritual) · título «· v6.03» → «· v6.04» · hitos de la ventana v6.04 |
| ANKI sábado 19:00-19:30 (color 1, abierta) | `00929or8op5hj28s3nbf1eo09c` → **`r9eglu07f5lvltvpoue3v4ks6o`** | DTSTART sáb 28-mar-2026 = · EXDATE 13-mar + **25-sep** → 13-mar + **23-oct-2027** (19:00) · texto v6.04 (el sáb 25-sep pasa a ser sábado normal de F4) |
| ANKI domingo 17:00-17:15 (color 1, abierta) | `0ar1fbrm3ts396kd96f8df753g` → **`5s64scagno3jo983gg6rfdo5qg`** | DTSTART dom 29-mar-2026 = · EXDATE 14-mar + **26-sep** → 14-mar + **24-oct-2027** (17:00) · texto v6.04 |

No hay más series de F4/SERUMS en el Calendar. §G5 de `V6_ESPEC.md` (bloque A 04:05-05:55 L-S, serie de turno, etc.) sigue sin ejecutarse: un volcado de las semanas 16-22 mar y 3-9 may-2027 y del sáb 25-sep-2027 lo confirma. Las series MIR, R↔D, AURUM 30' y REVISIÓN siguen terminando antes del SERUMS (30-abr / 29-abr / 1-may) y no se recrearon.

## C. Barrido de textos (19 `update_event`, solo descripción; fecha, hora, título, RRULE, EXDATE, color y recordatorios intactos)

El barrido se hizo con `list_events` y `fullText «27-sep»` del 21-oct-2026 al 16-mar-2027 (977 instancias en 4 páginas), más semanas tipo de mar y may-2027 y `fullText «Prometric»` de 2027. Las rutinas personales quedaron fuera.

| Id | Evento | Cambio |
|---|---|---|
| `9274q14djfvggeajhor64oshj8` · `76dnlc30p3hnccenpvub2d9acg` · `c24k2n7k8qlhfimrrncf8rapgk` · `iuhj8busrh63ms7v4j5q8e9920` · `q72kvc9pm1brlqvl6383ccr9vs` · `c5e77csne1bnfps1iq7nqel84s` | 6 series USMLE F1 | «EXAMEN STEP 1 LUN 27-SEP-2027 (sin cambio · … ventana 31-ago / 27-sep / 25-oct … GO/NO-GO lun 9-ago)» → «LUN 25-OCT-2027 (v6.04 · DJ-1 v6.04 · GO/NO-GO lun 6-sep; ⏸ …)» · «colchón del tramo 2 = 24 filas ≈ 63 h» → «48 filas ≈ 126 h en v6.04; 24 filas ≈ 63 h en v6.03» |
| `i4h2gu846t9t7b16q89hnao84s` | 🧠 VIBECODING | examen Step 1 lun 25-oct-2027 (⏸ 27-sep) |
| `r9scujjpk93jn0fmh4rvahk68g` | 🧠 SYNAPSE 12:30 | ídem |
| `k8iaefnjq0mnrlvkilhcarrik8` | 📋 REVISIÓN SEMANAL 07:15 | lectura del NBME 28 por tramos v6.04 · revisión F4 sáb 8-may → **sáb 16-oct** (serie `55474jts…`) · examen 25-oct · GO/NO-GO 6-sep |
| `2fvbkunh0nfhvhbn1b6iqvpifs` | 🇺🇸 STEP 1 VIVO (F2) | examen lun 25-oct-2027 |
| `uiduvkfsgs43p1u1qk1vohih58` · `hos0tfhsr2hdfs6cgv1rmejhrs` | 🇪🇸 MIR 15:15 / 15:30 | extensión 121 filas → vie 24-sep + 11 repuestas 28-sep → 12-oct ⇒ **145 filas vie 7-may → vie 22-oct (96 · 25 · 24 sáb) + 1 repuesta mar 26-oct = 203 sesiones** (handoff mar 26-oct) |
| `o1gla7846uae4tgngvc4q45osg` | 🎯 UWSA1 (jue 22-oct) | línea «Plan»: examen lun 25-oct · GO/NO-GO lun 6-sep (resto intacto) |
| `4hjv5lkvluj06ahc2qndtsi6as` · `lr7ktrbiffj4hrlke7lh7cv6h4` · `sm4baa2v453ifaub325h9v08mg` | 🎯 NBME 25 / 26 / 27 | examen 25-oct · «lo que se ensaya para el día real»: Free 120 + 4 bloques vie 8-oct · D94 jue 21-oct · D95 vie 22-oct · ritual sáb 23-oct · viaje dom 24-oct |
| `ecu784689p8osrhqabuct8d5jg` | 🎯 NBME 28 (checkpoint) | ídem + CHECKPOINT por tramos v6.04 (≥ 58 % en ruta al 25-oct · 50-57 % gate estricto · < 50 % sin margen → decidir con Joseph / extensión) + colchón 48 filas |
| `ag335n3dhvui11593us2lm448s` | 🧯 C2 (30-dic) | examen 25-oct |
| `8juk0mvl66tutdkbcei7umrs68` | 🏁 EXAMEN ENCAPS (14-mar) | tabla «fecha a RESERVAR» → DJ-1 v6.04 = lun 25-oct para cualquier ENCAPS (⏸ tabla v6.00) · examen 25-oct |

## Verificación (list_events después de los cambios)

- Volcado `fullText` «21-oct-2026: examen Step 1 lun 25-oct-2027» del 19-oct-2026 al 31-dic-2027 (977 eventos, 4 páginas, `volcados/after/`), comprobado con `scripts/ver.js`: **1.987 comprobaciones OK · 0 FAIL**.
  - Las 19 descripciones de la fase C coinciden con su payload en todas sus instancias (USMLE 52 cada una · vibecoding 97 · SYNAPSE 93 · REVISIÓN 27 · STEP 1 VIVO 9 · MIR 133 cada una · los singles 1).
  - Las excepciones conservan título y hora. Eval: lun 19, mar 20 y mié 21 «⏭ SIN SESIÓN». SYNAPSE: mar 20 y mié 21 ⏭; jue 22 a las 07:25; 3-nov, 24-nov, 15-dic y 30-dic a las 13:00. MIR: mar 20 y mié 21 ⏭. REVISIÓN S01 del dom 25-oct 11:45.
  - Las series tienen el mismo número de instancias que antes entre el 21-oct y el 16-mar.
  - Los 22 hitos están en su fecha v6.04, con una sola instancia cada uno y título «· v6.04» (los 5 que no cambian de fecha conservan el suyo). Ninguno cita ya el 27-sep como vigente.
- Revisión F4 `55474jts…`: 24 instancias, sáb 8-may → sáb 16-oct, ninguna el 23-oct. ANKI sáb `r9eglu07…`: no aparece el 13-mar ni el 23-oct; sí el 25-sep, el 16-oct y el 30-oct. ANKI dom `5s64scag…`: no aparece el 14-mar ni el 24-oct; sí el 26-sep, el 17-oct y el 31-oct. Los ids viejos `69tr6…`, `00929…` y `0ar1f…` ya no aparecen.
- `fullText «Prometric»` de 2027: solo quedan los hitos (con las fechas viejas como historial «⏸») y BAILE domingo (rutina personal). No existe ningún evento suelto de «permiso de examen», «día protegido» ni «semana del examen» aparte de los hitos de arriba.

## No tocado / pendientes para el orquestador

1. **Rutinas personales con fechas v6.03 del examen** (no tocadas, por instrucción). Citan el lun 27-sep, D94/D95 del 23/24-sep, ritual 25-sep, viaje 26-sep y regreso 28-sep, y algunas también GO/NO-GO 9-ago, NBME 31 28-jul, NBME 32 6-ago, UWSA2 10-ago, Free 120 13-sep y NBME 33 30-ago:
   - EKER `22bh9m5jhc7ro6aj3m4ffjad7g` («objetivo primario … al lun 27-sep-2027»).
   - GYM: lun `6740kavnfkdcvj5k149ouliauu` · mar `0dpes0ekv96a453e89m5osg06t` · jue `4qvs34d84u82psvknpqhv3jc7a` · vie `7sf8i7pe62pugfk4t6tcnbb9i4`.
   - BAILE: lun `64lue1en3hk0cf8itml2rtlqi4` · mar `09me7atu516gb0k6u0rbfcj8q1` · mié `0tod56pc6pgecm5lf7g4e3ji9v` · jue `3m8m4resu8akph4a7qfuf3h1qn` · vie `5pd4jhmvl31hvbuh40vphpoc4q` · sáb `3jkfb6097rtc1jbec19eg3sd57` · dom `7j6pucil43vuca70p082g5ub3d` · PRÁCTICA `13m3tcqjjc34rt6iqfblla18q1`.
   - DESAYUNO sáb/dom `2u9je70pif58hgf2f8t3vgu8b8` («sin Anki … el sáb 25 / dom 26-sep»).
   - ALMUERZO `43dq3oib16esjcqj1dcd8osot2` (UWSA2 10-ago · NBME 33 30-ago · Free 120 13-sep).

   En v6.00, v6.02 y v6.03 se actualizaron con un OK explícito. Hacen falta la decisión y el OK de Joseph.
2. **SYNAPSE PC domingo** `m8kfvq6440c6al6cq47oclnoj8`: cita «examen Step 1 lun 27-sep-2027 PROVISIONAL», pero solo dentro de su «Historial» (lo que fijó la v6.00). No se tocó para no pisar la excepción v6.04a del dom 25-oct, que tiene título propio.
3. **Títulos** de NBME 29, NBME 30 y su ventana, y de UWSA3 y su ventana: siguen con «· v6.00» porque su fecha no cambia (misma convención que en v6.02 y v6.03). El texto ya es v6.04.
4. **STEP 1 VIVO** `2fvbkunh…` sigue diciendo «paquete de 399 h del tramo 2», una cifra que no está en `src/` (V6_ESPEC §B3). No la cambié porque no forma parte del encargo. Conviene confirmar si cambia con las 48 filas de colchón.
5. **§G5 (series de F4)** sigue pendiente de que se conozca el inicio real del SERUMS. Cuando se cree, el bloque A tiene que llegar hasta el vie 22-oct (D95) y llevar EXDATE 23-25-oct.
6. **Docs**: falta añadir a `CAL_V6.md` una §16 con este registro y los 3 ids nuevos, y cambiar el `69tr6…` y el ANKI `00929…`/`0ar1f…` de §3/§7 por los nuevos. Lo mismo en el handoff y en `CALENDAR_SEGMENTOS_V5_6.md`. No los toqué: solo escribí este fichero.
7. Overlays Research 🔬 (payload de `gen_research_calendar.js`): ninguno cita el examen (comprobado con grep en `DATA/RESEARCH/_calendar_overlays.json`). No se tocaron y `--check` no se ve afectado.

## Ids vigentes que cambian

| Serie | Id v6.04 | Rango |
|---|---|---|
| 📋 Revisión semanal 20' (dentro del Step 1 del sábado) · F4 PROVISIONAL · v6.04 | `55474jts1urh7s9j1nrtdkvfdg` | sáb 8-may → sáb 16-oct-2027 · SA · todo el día · FREE |
| ANKI (sábado) | `r9eglu07f5lvltvpoue3v4ks6o` | desde sáb 28-mar-2026 · 19:00-19:30 · abierta · EXDATE 13-mar y 23-oct-2027 |
| ANKI (domingo) | `5s64scagno3jo983gg6rfdo5qg` | desde dom 29-mar-2026 · 17:00-17:15 · abierta · EXDATE 14-mar y 24-oct-2027 |

Ya no existen (respaldo en `cal_bk/v604b/<id>.json`): `69tr6hqitr5fnanc2af5kvugnk` · `00929or8op5hj28s3nbf1eo09c` · `0ar1fbrm3ts396kd96f8df753g`.

Sin commit. Única escritura en el repo: este fichero. Los respaldos, volcados, payloads y scripts están en `DATA/_v600/cal/cal_bk/v604b/`, que git ignora.
