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

## 9. Corrimiento v6.01 (10-oct)

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

| Serie / evento | Id vigente (v6.01) | Rango / fecha |
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
