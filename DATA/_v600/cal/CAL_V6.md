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

## 17. Rutinas personales al examen del 25-oct y al UWSA1 del jue 22 (v6.04c)
Solo descripciones de 15 rutinas (+ reposición de la excepción del ALMUERZO del jue 22-oct). Respaldos en `cal_bk/v604c/` (gitignored).


Google Calendar principal · America/Lima · mié 21-oct-2026, ≈12:43-12:46 Lima (`updated` 17:43:02Z → 17:45:52Z).
Cierra el pendiente 1 de `CAL_V6.md` §16 («Rutinas personales con fechas v6.03 del examen»).

**16 escrituras, todas con `notificationLevel: NONE`:** 15 `update_event` de master (solo `description`) y 1 `update_event` de
instancia para reponer una excepción. Títulos, horas, RRULE, colores y recordatorios no cambian (se comprobó en cada respuesta).
No hubo `create_event` ni `delete_event`. Sin commit.

## Protocolo

- `get_event` de los 15 masters antes de escribir → `cal_bk/v604c/<id>.json` (`cal_bk/` está en `.gitignore:53`).
- Excepciones: `list_events` del 1-oct-2026 al 31-dic-2027 (`fullText` «ALUMUERZO», «DECLARACIONES EKER», «POST-ENTRENO Walker» para
  GYM ×4, BAILE ×7 y PRÁCTICA, y «Anki de fin de semana DESAYUNO»). Volcados en `cal_bk/v604c/volcados/`. Para cada serie se
  comparó con su RRULE (`scripts/inst.js`): estaban todas las fechas y no faltaba ninguna. Solo ALMUERZO tiene excepciones:
  - lun 19-oct 13:00 · mar 3-nov, 24-nov, 15-dic y mié 30-dic 12:30: hora propia, texto de la serie.
  - **jue 22-oct 13:00-13:30**: texto propio («🎯 HOY (jue 22-oct, UWSA1 …»). Respaldo en `cal_bk/v604c/excepciones/`.
  - Las otras 14 series no tienen excepciones en ese rango.
- Los textos los genera `scripts/build.js`: 49 reemplazos con la aserción «exactamente 1 coincidencia» (0 fallos). Los payloads
  están en `payloads/<id>.txt`. `scripts/scan.js` comprueba que toda fecha v6.03 que quede está dentro de un «⏸ v6.03» (0 por revisar).
- Pie: `(v6.03 · 20-oct-2026: D1 = mié 21-oct)` → `(v6.04 · 21-oct-2026: examen Step 1 lun 25-oct-2027)`. La línea
  «Régimen v6.03 (D1 = mié 21-oct-2026 …)» se queda: la base de F1 sigue siendo v6.03.
- ALMUERZO: después del update del master, `get_event` del jue 22-oct mostró que se había pisado su texto propio (la hora sí se
  conservó). Se repuso con el texto guardado.

## Operaciones

| Id | Serie | Frases cambiadas (v6.03 → v6.04; lo anterior queda como «⏸ v6.03») |
|---|---|---|
| `22bh9m5jhc7ro6aj3m4ffjad7g` | EKER (diaria 04:00) | «6. IDENTIDAD DE EXAMEN (v6.04 …)»: objetivo primario hasta el **lun 25-oct-2027** (antes lun 27-sep) |
| `6740kavnfkdcvj5k149ouliauu` | GYM lunes | hitos en lunes: NBME 30 lun 24-may · **NBME 31 lun 23-ago · NBME 32 lun 30-ago · NBME 33 lun 27-sep, solo** · GO/NO-GO **lun 6-sep** · UWSA2 **mar 7-sep** · ensayo de 7 bloques **vie 8-oct** (serie GYM viernes) · miércoles solo NBME 28/29 · examen **lun 25-oct** · viaje **dom 24-oct** · regreso **mar 26-oct** · D95 **vie 22-oct** · ritual **sáb 23-oct** · vísperas «sáb 13-mar y dom 24-oct» |
| `0dpes0ekv96a453e89m5osg06t` | GYM martes | UWSA2 **mar 7-sep** (07:00-11:15) · GO/NO-GO **lun 6-sep** · examen lun 25-oct · D-1 dom 24-oct · D95 vie 22-oct · regreso **mar 26-oct** |
| `4qvs34d84u82psvknpqhv3jc7a` | GYM jueves | D94 **jue 21-oct-2027** · D95 vie 22-oct · ritual sáb 23-oct · D-1 dom 24-oct · examen lun 25-oct |
| `7sf8i7pe62pugfk4t6tcnbb9i4` | GYM viernes | el hito en viernes es ahora el **ensayo de 7 bloques = Free 120 + 4 bloques, vie 8-oct** (antes NBME 32 vie 6-ago) · lunes: NBME 30/31/32/33 + GO/NO-GO lun 6-sep · martes: UWSA2 mar 7-sep · miércoles sin NBME 31 · D95 **vie 22-oct** · ritual · D-1 · examen |
| `64lue1en3hk0cf8itml2rtlqi4` | BAILE lunes | examen lun 25-oct · viaje dom 24-oct · regreso mar 26-oct · D95 · ritual · D-1 · hitos en lunes NBME 30/31/32/33 + GO/NO-GO lun 6-sep · vísperas «… dom 24-oct» |
| `09me7atu516gb0k6u0rbfcj8q1` | BAILE martes | igual que GYM martes |
| `0tod56pc6pgecm5lf7g4e3ji9v` | BAILE miércoles | último día del taper **mié 20-oct** (antes mié 22-sep) · NBME 31 fuera de los miércoles (pasa al lun 23-ago) · D94 jue 21-oct · D95 vie 22-oct · ritual sáb 23-oct · D-1 dom 24-oct · examen lun 25-oct |
| `3m8m4resu8akph4a7qfuf3h1qn` | BAILE jueves | igual que GYM jueves |
| `5pd4jhmvl31hvbuh40vphpoc4q` | BAILE viernes | D95 **vie 22-oct** · ritual · D-1 · examen · hito en viernes = ensayo de 7 bloques **vie 8-oct** (el NBME 32 pasa al lun 30-ago) |
| `3jkfb6097rtc1jbec19eg3sd57` | BAILE sábado | examen lun 25-oct · D95 vie 22-oct · **sáb 23-oct = ritual** · D-1 dom 24-oct |
| `7j6pucil43vuca70p082g5ub3d` | BAILE domingo | examen lun 25-oct · víspera real **dom 24-oct** · D95 vie 22-oct · ritual sáb 23-oct |
| `13m3tcqjjc34rt6iqfblla18q1` | BAILE PRÁCTICA (dom) | igual que BAILE domingo |
| `2u9je70pif58hgf2f8t3vgu8b8` | DESAYUNO sáb/dom | sin Anki el **sáb 23 / dom 24-oct-2027** (antes 25/26-sep; = EXDATE de las series ANKI `r9eglu07…` / `5s64scag…`) |
| `43dq3oib16esjcqj1dcd8osot2` | ALMUERZO L-V | UWSA2 **mar 7-sep** · NBME 30-33 a las 07:00-12:15 (lun 24-may · lun 23-ago · lun 30-ago · lun 27-sep) · «NBME 33 + 3 bloques (lun 30-ago)» y «Free 120 (lun 13-sep)» → **ensayo de 7 bloques = Free 120 + 4 bloques (vie 8-oct, 07:00-16:30)**: Ziploc 2 tras el bloque 3 + snack + comida al terminar |
| `43dq3oib16esjcqj1dcd8osot2_20261022T170000Z` | ALMUERZO jue 22-oct (instancia) | **texto propio repuesto** tal cual (no cita fechas de 2027); hora 13:00-13:30 y título conservados |

## Verificación

- 15 respuestas de `update_event` (`scripts/chk_update.js`): **180 comprobaciones OK, 0 FAIL**. La descripción es igual al payload.
  `summary`, `start`, `end`, `recurrence`, `colorId`, recordatorios, transparencia y estado son iguales que antes. En todas
  `notificationLevel` = NONE.
- Volcados después (`volcados/after/`, 1.698 instancias de las 15 series entre el 1-oct-2026 y el 31-dic-2027), revisados con
  `scripts/ver.js`: **6.829 comprobaciones OK, 0 FAIL**.
  - Las instancias son las mismas que antes en todas las series.
  - 1.697 instancias tienen la descripción del payload. La del jue 22-oct tiene su texto propio.
  - Título, hora y color no cambian en ninguna instancia.
  - Las 7 instancias de ALMUERZO con hora propia siguen igual: 19-oct 13:00, 21-oct 12:00, 22-oct 13:00, y 3-nov, 24-nov, 15-dic
    y 30-dic a las 12:30.

## No tocado / observaciones

1. No se tocaron las frases de 2026. Varias rutinas siguen citando el **UWSA1 «mié 21-oct-2026»**: GYM lun, GYM vie, BAILE lun,
   BAILE mié y el master de ALMUERZO. Con la semana corrida v6.04a se hace el jue 22-oct (alias en la app; la instancia del
   ALMUERZO del jue 22 ya lo dice). Por eso GYM y BAILE jueves dicen «Ningún hito del Step 1 cae en jueves», que vale para 2027
   pero no para mañana.
2. En los textos nuevos, el NBME 32 (lun 30-ago, Santa Rosa) y el ensayo de 7 bloques (vie 8-oct, Combate de Angamos) se marcan
   como feriado, igual que en los hitos de `CAL_V6.md` §16.
3. Respaldos, volcados, payloads, respuestas y scripts están en `DATA/_v600/cal/cal_bk/v604c/`, que git ignora. Este fichero es la
   única escritura en el repo.

## Ronda 2 — UWSA1 de la semana corrida = jue 22-oct-2026 (orden del orquestador)

Se ejecutó el mismo día, ≈12:50-12:52 Lima (`updated` 17:50:30Z → 17:51:31Z). Se resuelve la observación 1 de arriba.

**8 escrituras, todas con `notificationLevel: NONE`:** 7 `update_event` de master (solo `description`) y 1 reposición de la
excepción del ALMUERZO. Solo se cambiaron las frases de 2026 sobre el UWSA1. Nada más.

Protocolo:
- `get_event` de los 7 masters y de la excepción → `cal_bk/v604c/r2/<id>.json`. Los masters eran idénticos a los payloads de la
  ronda 1.
- `list_events` de antes (ALMUERZO y «POST-ENTRENO Walker», del 1-oct-2026 al 31-dic-2027; en `r2/volcados/before/`). Estaban
  todas las fechas. Las excepciones eran las mismas: solo las de ALMUERZO, y solo la del jue 22-oct con texto propio.
- Los textos los genera `scripts/build_r2.js`, con la aserción «exactamente 1 coincidencia» (0 fallos). Los payloads están en
  `r2/payloads/`.
- La actualización del master de ALMUERZO volvió a pisar el texto del jue 22-oct. Se repuso tal cual.

| Id | Serie | Frase cambiada |
|---|---|---|
| `6740kavnfkdcvj5k149ouliauu` | GYM lunes | «el UWSA1 ya no cae en lunes (mié 21-oct-2026, 08:50-13:00 → serie BAILE miércoles …)» → «(**JUE 22-oct-2026, 08:50-13:00; semana corrida v6.04a: jue 22 = plan del mié 21 → serie GYM jueves**; ⏸ v6.03: mié 21-oct · ⏸ v6.02: lun 19-oct)» |
| `7sf8i7pe62pugfk4t6tcnbb9i4` | GYM viernes | «… y MIÉRCOLES (UWSA1 mié 21-oct-2026 · NBME 28 · NBME 29)» → «…, MIÉRCOLES (NBME 28 · NBME 29) y **JUEVES (UWSA1 JUE 22-oct-2026, 08:50-13:00; semana corrida v6.04a …; ⏸ v6.03: mié 21-oct)**» |
| `64lue1en3hk0cf8itml2rtlqi4` | BAILE lunes | «el UWSA1 pasó al mié 21-oct-2026» → «el UWSA1 pasó al **JUE 22-oct-2026, 08:50-13:00; semana corrida v6.04a …** (⏸ v6.03: mié 21-oct · ⏸ v6.02: lun 19-oct)». La frase se puso delante del «⏸ v6.03» de la ronda 1 para que no se lea como historial |
| `0tod56pc6pgecm5lf7g4e3ji9v` | BAILE miércoles | se quita el UWSA1 de «hitos en miércoles» · «y el UWSA1 vuelve a caer en miércoles» → «y el UWSA1 (D1) **ya no cae en miércoles: es el JUE 22-oct-2026, 08:50-13:00; semana corrida v6.04a … → serie BAILE jueves** (⏸ v6.03: mié 21-oct · ⏸ v6.02: lun 19-oct)» |
| `4qvs34d84u82psvknpqhv3jc7a` | GYM jueves | «Ningún hito del Step 1 cae en jueves.» → «Ningún hito del Step 1 **de 2027** cae en jueves; **el JUE 22-oct-2026 SÍ es día de hito: UWSA1 08:50-13:00** (semana corrida v6.04a …; ⏸ v6.03: mié 21-oct) → mismo entreno, misma hora.» |
| `3m8m4resu8akph4a7qfuf3h1qn` | BAILE jueves | lo mismo («→ mismo baile, misma hora») |
| `43dq3oib16esjcqj1dcd8osot2` | ALMUERZO (master) | «el UWSA1 (mié 21-oct, 08:50-13:00) pisa este almuerzo» → «el UWSA1 (**JUE 22-oct-2026, 08:50-13:00; semana corrida v6.04a: jue 22 = plan del mié 21**; ⏸ v6.03: mié 21-oct) pisa este almuerzo» |
| `43dq3oib16esjcqj1dcd8osot2_20261022T170000Z` | ALMUERZO jue 22-oct | texto propio **repuesto** tal cual; 13:00-13:30 y título conservados |

No se tocaron:
- la línea «Régimen v6.03 (D1 = mié 21-oct-2026 …)», que es la fecha de plan del D1;
- el historial «corrimientos del D1 (→ … → mié 21-oct)» del ALMUERZO.

Verificación (0 fallos en total):
- Respuestas de los 7 updates (`scripts/chk_update_r2.js`): **84 comprobaciones OK**. La descripción es igual al payload. Título,
  hora, RRULE, color, recordatorios y estado no cambian.
- Volcados después (`r2/volcados/after/`), revisados con `scripts/ver_r2.js`: **5.177 comprobaciones OK** sobre 1.111 instancias.
  - Series tocadas: las mismas 720 instancias. 719 tienen el payload y ninguna cita ya el UWSA1 el «mié 21-oct-2026».
  - La excepción del jue 22-oct tiene su texto propio, 13:00-13:30 y el título ALUMUERZO.
  - Las otras excepciones del ALMUERZO conservan su hora.
  - Las 6 series GYM/BAILE que no se tocaron (GYM mar, BAILE mar/vie/sáb/dom y PRÁCTICA, 391 instancias) no cambiaron.

## 18. v6.05 — todo inicia el LUN 26-OCT-2026 (sáb 24 → dom 25-oct-2026)
Orden de Joseph (sáb 24-oct): «Todo inicia el lunes 26. Puedes correr los horarios, alargar los plazos. Pero no quites temas, solamente corre lo que está faltando.»
Del 19 al 25-oct sin estudio → D1 de TODO = lun 26-oct (re-fecha real, commits `90807a3` + `2b86639`). La semana corrida por alias de §15 (v6.04a) queda SIN EFECTO.
Respaldos en `cal_bk/v605/` (gitignored: `dom25_instancias_antes.json`, `_c1/`, `c2/`, `c1r2/`, `c2r2/`, `uwsa1_o1gla_antes_v605.json`, `c0g48p72o4441tgcecmlg8s8lo.json`). `notificationLevel: NONE` en todo.

### 18.0 Orquestador (sáb 24 ≈21:00 y dom 25 ≈00:20 / 01:00 Lima) + ronda 1 (cortada por límite de sesión)
| # | Tipo | Id | Antes → después |
|---|---|---|---|
| 1-13 | DELETE | los 13 creados en §15: `guvob5mktpr362c40opm3i6sr0` `sicdv31pdu5j5dv2dffu5om0jo` `70or2b5e8g0i2l3mbbbmq5keio` `k3u0r2pa2mg0momd4kp98bdf44` `0ldac4cotui5f1edl2p9e93qhg` `n1bfsoco9lsd91l1m1lsm6ve88` `b3gb3i6eguhqnvhhpie2rb3p6s` `do2kgg9lo48hkmsitgv31louf8` `agdpe5cb2oonkvkm211qovq1sc` `9tv9ojmkhvclkdii0eeshr6b9c` `vrh99092rppa59vjui0dv80mp4` `crme2lf2urvualir4hh2n8dckg` `pdc443ud93e03euvdq1ojtkh7k` | reparto sáb 24 / dom 25 de la v6.04a → borrados (payloads completos en `cal_bk/v604/creados_v604a.json`) |
| 14 | MOVE + TÍTULO | `k8iaefnjq0mnrlvkilhcarrik8_20261024T121500Z` (REVISIÓN) | dom 25 11:45 «S01 (semana corrida)» → **sáb 24 07:15-07:45** «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26 · la S01 es el sáb 31-oct) · 📋 REVISIÓN SEMANAL» |
| 15-16 | TÍTULO | `m8kfvq6440c6al6cq47oclnoj8_20261025T200000Z` (PC domingo) · `5s64scagno3jo983gg6rfdo5qg_20261025T220000Z` (ANKI dom) | dom 25 → «⏭ SIN SESIÓN (v6.05 …)» / «ANKI · v6.05: sin sesión de plan … solo si tienes tarjetas DUE de antes» |
| 17-20 | UPDATE (ronda 1, C1) | BAILE domingo `7j6pucil43vuca70p082g5ub3d` y PRÁCTICA `13m3tcqjjc34rt6iqfblla18q1` (masters) + sus instancias del dom 25 | víspera del D1 = dom 25-oct → regla Palmerton (clase suave/opcional, cena ligera, cama 21:00); títulos del dom 25 «· víspera del UWSA1: suave/opcional» |
| 21-30 | RECREAR (ronda 1, C2) | vibecoding `i4h2gu846t9t7b16q89hnao84s` → **`llhrjvjqmmv06ft0vt94qdn3rk`** (UNTIL mié 10-mar) · SYNAPSE 12:30 `r9scujjpk93jn0fmh4rvahk68g` → **`tfihh2hsim6mll6h5nsjur1ti8`** (UNTIL vie 5-mar) · LIVIANO `jlh8agrjmkk2hudsea7mrlflf8` → **`u7dljk7hf8r81nmofgojhtdilc`** (UNTIL mié 3-mar) · BUSINESS `mmi1e976ubgq9s3saarbjf8o74` → **`5gbioj75d3bsgoio1fatrji0ns`** (UNTIL mar 23-feb) · AURUM 30′ `ljam8b9e9n9oaiv80ul5c6662g` → **`r0n85cd06arqkikrbfra4luonc`** (lun 4-ene → vie 30-abr; D129-D130 lun 3 / mar 4-may van en tiempo muerto del SERUMS, fuera de la serie) | mismo DTSTART, hora, color y recordatorios; EXDATE de SKIP (25-dic, 31-dic, 1-ene) y, en AURUM, 12-mar / 15-mar / 25-mar / 26-mar; descripciones v6.05 |
| 31 | MOVE + TÍTULO + DESCR. | `o1gla7846uae4tgngvc4q45osg` (🎯 UWSA1) | jue 22-oct → **lun 26-oct 08:50-13:00** · «· v6.03» → «· v6.05» · descripción v6.05 (Day-After lun 26 18:00 · mar 27 05:00 / 07:15 / 18:00 · mié 28 18:00 · jue 29 18:00 6/6 + eval reducida · vie 30 eval de cierre) |
| 32 | MOVE (instancia) | `tfihh2hsim6mll6h5nsjur1ti8_20261026T173000Z` (SYNAPSE) | lun 26 12:30 → **07:25-07:55** (día del UWSA1) |
| 33 | MOVE (instancia) | `43dq3oib16esjcqj1dcd8osot2_20261026T170000Z` (ALMUERZO) | lun 26 12:00 → **13:00-13:30** (texto del día lo puso C1 r2) |
| 34 | TÍTULO + DESCR. | `c0g48p72o4441tgcecmlg8s8lo` (🚌 REGRESO mar 26-oct-2027) | «· v6.04» → «· v6.05» · 1 sesión MIR repuesta → **4 (mar 26 → vie 29-oct-2027; d203 = handoff el vie 29)** |

Pendiente de baja prioridad (cosmético, días pasados): títulos «⏭ SIN SESIÓN (v6.05 …)» en las instancias 19-23-oct de 5 series USMLE, MIR ×2, ALMUERZO 21/23 y las 4 series recreadas (sus instancias pasadas muestran el título de la serie). El cierre Business de 15′ de los sábados normales nunca tuvo evento (la app sí lo muestra).

### 18.1 Ronda 2 · C1 — USMLE + ENCAPS + hitos + ALMUERZO + ANKI + rutinas
Orden de Joseph (sáb 24-oct-2026): «Todo inicia el lunes 26 … no quites temas, solamente corre lo que está faltando». D1 = LUN 26-OCT-2026. Ronda 2 ejecutada el dom 25-oct-2026.

#### Protocolo
- Estado previo comprobado con `list_events` (volcados completos guardados ANTES de escribir): `DATA/_v600/cal/cal_bk/v605/c1r2/volcados/sem_19-25oct_antes.json` y `sem_26-30oct_antes.json` (+ los que se añadan abajo). Los respaldos de serie (`get_event`/instancia representativa) de la ronda 1 están en `cal_bk/v605/_c1/bk/` (comprobado: el `updated` y la descripción de las instancias del 26-30 oct coinciden con esos respaldos).
- Respaldo por evento antes de escribir: `cal_bk/v605/c1r2/bk/<id>.json`. Payloads generados por script con reemplazos «exactamente 1 coincidencia»: `cal_bk/v605/c1r2/payloads/` (scripts en `scratchpad/v605/c1r2/`).
- `notificationLevel: NONE` en todas las escrituras. Masters primero, luego reposición de excepciones (el MCP propaga summary/description del master a las excepciones).
- Fuentes: `src/lib/usmleStep1Daily.ts` (DIAS D1-D47, DIAS_T2 T3-T13, presupuesto uWorld 1.520 + 1.830 = 3.350), `src/lib/usmleGuia.ts` (Day-After UWSA1 / NBME, colaAlCierreF1Destino T4-T6), `DATA/_scripts/_encaps_mantenimiento_2027.sql` (F1 dia 1-47), `_encaps_intensivo_2027.sql`, `DATA/ENCAPS/_pendientes_f1.json`, `RUNBOOK_SEMANA2_2026-10-26.md`, `_fechas_v6.json` v6.05.

#### Operaciones
| # | hora UTC | op | id antes → después | qué | respaldo |
|---|---|---|---|---|---|
| 1 | 05:30:29 | update_event master (título + descr.) | `9274q14djfvggeajhor64oshj8` = | ANKI AM 05:00: «· v6.03» → «· v6.05» · Régimen v6.05 (D1 = UWSA1 lun 26-oct → D47 mié 30-dic, 47 sesiones; hitos D10 vie 6-nov · D25 vie 27-nov · D40 vie 18-dic · D47 mié 30-dic; C1/C2 consumido, mar 29-dic = D46; 11 desplazadas T3-T13 jue 18-mar → lun 5-abr; cola de vídeo T4-T6; colchón 42 ≈ 110 h; gates mié 18-nov / mié 16-dic) + historial v6.04a/v6.03 + pie v6.05 | `_c1/bk/9274q….json/.desc.txt` · payload `c1r2/payloads/9274q….txt` |
| 2 | 05:30:48 | update_event master (título + descr.) | `76dnlc30p3hnccenpvub2d9acg` = | Repaso 07:15: ídem + «mar 27 (D2) = Day-After 3/6; primer repaso anclado mié 28 (D3)» | `_c1/bk/76dn…` · payload |
| 3 | 05:31:12 | update_event master (título + descr.) | `c24k2n7k8qlhfimrrncf8rapgk` = | PRE-TEST 08:15: ídem + NBME en VIERNES (6-nov · 27-nov · 18-dic) · D46 = SNA | `_c1/bk/c24k…` · payload |
| 4 | 05:31:34 | update_event master (título + descr.) | `iuhj8busrh63ms7v4j5q8e9920` = | DEEP PRIME 09:00: hitos v6.05 · primer deep prime mar 27 · 11 filas desplazadas con nombre | `_c1/bk/iuhj…` · payload |
| 5 | 05:32:09 | update_event master (título + descr.) | `q72kvc9pm1brlqvl6383ccr9vs` = | 30Q 11:00: viernes N1 v6.05 (D5 vie 30-oct · D30 vie 4-dic) · N3 (D15 vie 13-nov · D20 vie 20-nov · D35 vie 11-dic) · sin N4 en F1 · uWorld F1 ~1.520 + tramo 2 ~1.830 = 3.350 (margen 309) | `_c1/bk/q72k…` · payload |
| 6 | 05:32:29 | update_event master (título + descr.) | `c5e77csne1bnfps1iq7nqel84s` = | Eval 18:00: Day-After UWSA1 lun 26 1/6 · mar 27 05:00 2/6 · 07:15 3/6 · 18:00 4/6 · mié 28 5/6 · jue 29 6/6 + eval reducida · eval vuelve vie 30 · Day-After NBME (viernes) = 18:00 del hito + lun 07:15/18:00 + mar-mié-jue 18:00 | `_c1/bk/c5e7…` · payload |
| 7 | 05:35:29 | update_event master (descr.) | `papebi46etlo8glgfs5akd5mig` = | ENCAPS 16:15: cabecera v6.05 (F1 dias 1-47 lun 26-oct → mié 30-dic = 39 banqueo + 8 mini-sims; CHECKPOINT vie 18-dic = dia 40 = mini-sim 40; carril B 48-79) · viernes F1 vie 30-oct → 18-dic · ARRANQUE v6.05 (lun 26 eval + pre-test 1/2 · mar 27 eval II-3 + pre-test 2/2 · mié 28 banco V-2 + eval I-3 · jue 29 banco III-5 + eval V-2 · vie 30 MINI-SIM II-2 + I-10; semana 2 por generar; stock RUNBOOK §4) · 13 pendientes F1 (dias 80-95; nuevos lun 8 II-4 · mar 9 II-1 · mié 10-mar mini-sim I-1 + II-2) · intensiva 48-97, PRE-TEST dia 52, SIM 57…92 · Supabase v6.05 (huella 97 · 40f0428f…, backups *_v605_20261024) · historial v6.04a/v6.03 · pie | `_c1/bk/papebi….json/.desc.txt` · payload |
| 8 | 05:35:35 | update_event instancia (título) | `papebi46etlo8glgfs5akd5mig_20261026T211500Z` = | «🇵🇪 ENCAPS — D1 · eval (fallos previos) + PRE-TEST DE ARRANQUE 1/2 (20Q ciegas · 72 s/Q) · v6.05» | volcado `sem_26-30oct_antes.json` (título = serie) |
| 9 | 05:35:37 | update_event instancia (título) | `papebi…_20261027T211500Z` = | «🇵🇪 ENCAPS — dia 2 · eval II-3 + PRE-TEST DE ARRANQUE 2/2 (20Q ciegas · 72 s/Q) · v6.05» | ídem |
| 10 | 05:35:40 | update_event instancia (título) | `papebi…_20261030T211500Z` = | «🇵🇪 ENCAPS — dia 5 · MINI-SIM 25Q (cola larga II-2 + I-10 · 72 s/Q) · v6.05» | ídem |
| 11-13 | 05:35:42-45 | update_event instancias (título) | `papebi…_20261022T211500Z` · `…_20261023T211500Z` · `…_20261021T211500Z` = | «PRE-TEST 1/2 (plan del mié 21)» / «2/2 (plan del jue 22) · mini-sim → dom 25 10:00» / «⏭ SIN SESIÓN (v6.04…)» → «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · 🇵🇪 ENCAPS — 1h Banqueo Mantenimiento (…)» (deshace §15) | volcado `sem_19-25oct_antes.json` |
| 14 | 05:36:17 | update_event master (descr.) | `43dq3oib16esjcqj1dcd8osot2` = | ALMUERZO: UWSA1 LUN 26-oct (⏸ v6.04a jue 22 · v6.03 mié 21) · NBME 25-27 en VIERNES (6-nov · 27-nov · 18-dic) · Régimen v6.05 · pie (título «ALUMUERZO» y RRULE intactos) | `_c1/bk/43dq….json/.desc.txt` · payload |
| 15 | 05:36:34 | update_event instancia (hora + descr.) | `43dq…_20261026T170000Z` = | lun 26 13:00-13:30 (repuesta tras el master) + «🎯 HOY (lun 26-oct, UWSA1 08:50-13:00 · D1 v6.05) …» + texto de la serie | volcado `sem_26-30oct_antes.json` |
| 16 | 05:36:37 | update_event instancia (hora + título) | `43dq…_20261022T170000Z` = | jue 22 13:00-13:30 (texto propio v6.04a) → 12:00-12:30 + «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · ALUMUERZO» (texto = serie) | `_c1/bk/43dq…_20261022T170000Z.json/.desc.txt` |
| 17-19 | 05:36:39-43 | update_event instancias (hora) | `43dq…_20261103T170000Z` · `…_20261124T170000Z` · `…_20261215T170000Z` = | mar 3-nov · mar 24-nov · mar 15-dic (NBME v6.03) 12:30-13:00 → 12:00-12:30 | volcado `_c1/volcados/before/all_19oct-31dic.json` |
| 20-22 | 05:36:45-48 | update_event instancias (hora) | `43dq…_20261106T170000Z` · `…_20261127T170000Z` · `…_20261218T170000Z` = | vie 6-nov · vie 27-nov · vie 18-dic (NBME v6.05) 12:00-12:30 → 12:30-13:00 (mié 30-dic ya estaba 12:30-13:00) | ídem |
| 23 | 05:37:13 | update_event master (descr.) | `r9eglu07f5lvltvpoue3v4ks6o` = | ANKI sábado: Régimen v6.05 (F1 lun 26-oct → mié 30-dic; primer sábado con mazo del plan sáb 31-oct) + pie | `c1r2/bk/r9eglu07….desc.txt` (descr. de la serie del volcado 19-oct → 31-dic) · payload |
| 24 | 05:37:23 | update_event master (descr.) | `5s64scagno3jo983gg6rfdo5qg` = | ANKI domingo: «v6.05: la víspera del D1 (UWSA1 LUN 26-oct) es el DOM 25-OCT …» (⏸ v6.03 mar 20) + Régimen v6.05 + pie. La excepción del dom 25 solo tiene título propio (su descripción = serie, comprobado) → se verifica abajo | `c1r2/bk/5s64….desc.txt` + `c1r2/bk/5s64_dom25.json` · payload |
| 25 | 05:40:00 | update_event (MOVE + título + descr.) | `4hjv5lkvluj06ahc2qndtsi6as` = | 🎯 NBME 25: mar 3-nov → **VIE 6-NOV 07:00-12:30** (D10) «· v6.05» · tramo siguiente D11 lun 9-nov / D16 lun 16-nov / D17 mar 17-nov · Day-After 18:00 hoy + lun 9 07:15/18:00 + mar-mié-jue 18:00 · «Hoy es VIERNES»: ENCAPS 16:15 = mini-sim dia 10 (V-6 + II-6) · historial v6.03 | `_c1/bk/4hjv….json/.desc.txt` · payload |
| 26 | 05:40:21 | update_event (MOVE + título + descr.) | `lr7ktrbiffj4hrlke7lh7cv6h4` = | 🎯 NBME 26: mar 24-nov → **VIE 27-NOV 07:00-12:30** (D25) · Day-After lun 30-nov … jue 3-dic · mini-sim dia 25 (III-3 + I-11+I-12) · deload S6 lun 30-nov → vie 4-dic · Renal D23-D29, GI D30 vie 4-dic | `_c1/bk/lr7k…` · payload |
| 27 | 05:40:46 | update_event (MOVE + título + descr.) | `sm4baa2v453ifaub325h9v08mg` = | 🎯 NBME 27: mar 15-dic → **VIE 18-DIC 07:00-12:30** (D40) · gate mié 16-dic · Day-After lun 21 … jue 24-dic · ENCAPS 16:15 = mini-sim 40 CHECKPOINT (II-9 + II-7) · tras el NBME D41/D42 Endocrino, Neuro desde D43 mié 23-dic | `_c1/bk/sm4b…` · payload |
| 28 | 05:40:56 | update_event (MOVE día completo + título + descr.) | `sfgp85kjua01v159rh1qrilr18` = | 🚦 GATE D18: vie 13-nov → **mié 18-nov** (todo el día) «· v6.05» · D1 lun 26-oct · siguiente gate mié 16-dic | `_c1/bk/sfgp…` · payload |
| 29 | 05:41:02 | update_event (MOVE día completo + título + descr.) | `vvi7lk2c0c9nih1fqbi19p681s` = | 🚦 GATE D38: vie 11-dic → **mié 16-dic** · próximos NBME 27 vie 18-dic · NBME 28 = D47 | `_c1/bk/vvi7…` · payload |
| 30 | 05:41:09 | update_event (título + descr.) | `oi557k66kql15oa6ptkjdipvis` = | 🧯 C1 mar 29-dic (=): «hoy D49 normal» → «hoy **D46** normal» (SNA + fármacos autonómicos) · regla v6.05 (F1 D1-D47, 11 desplazadas T3-T13, colchón 42 ≈ 110 h) | `_c1/bk/oi55…` · payload |
| 31 | 05:41:17 | update_event (título + descr.) | `ag335n3dhvui11593us2lm448s` = | 🧯 C2 mié 30-dic (=): D50 → **D47** = NBME 28 · auditoría en la revisión S10 del sáb 2-ene (⏸ S11) · D1-D46 al cierre · T3-T13 | `_c1/bk/ag33…` · payload |
| 32 | 05:41:22 | update_event (título + descr.) | `ti163p5s6t4odtqmhvkl3mamac` = | 🇵🇪 CHECKPOINT vie 18-dic (=): «mini-sim 43 · dia 43» → **«mini-sim 40 · dia 40»** (cola larga II-9 + II-7; sim_n 40 en el SQL) · F1 1-47 (39 + 8) · intensiva 48-97 · PRE-TEST dia 52 · el mini-sim 43 de v6.03 (I-1 + II-2) → carril B mié 10-mar (dia 95) | `_c1/bk/ti16…` · payload |
| 33 | 05:42:02 | update_event (título + descr.) | `ecu784689p8osrhqabuct8d5jg` = | 🎯 NBME 28 mié 30-dic (=): D50 → **D47** · Neuro D43-D46 (D45 tronco · D46 SNA) · auditoría S10 sáb 2-ene · 11 desplazadas T3-T13 con fecha · cola de vídeo T4-T6 · colchón 42 ≈ 110 h · historial v6.03 | `_c1/bk/ecu7…` · payload |
| 34 | 05:45:07 | update_event master (descr.) | `22bh9m5jhc7ro6aj3m4ffjad7g` = | EKER: «objetivo primario del mié 21-oct» → «del lun 26-oct (⏸ v6.03: mié 21-oct)» · Régimen v6.05 · pie | `_c1/bk/22bh….desc.txt` (= instancias 19-30 oct) · payload |
| 35 | 05:45:19 | update_event master (descr.) | `6740kavnfkdcvj5k149ouliauu` = | GYM lunes: 5 hitos en LUNES con el UWSA1 lun 26-oct (D1) · NBME 25-27 en VIERNES (serie GYM viernes) · Régimen v6.05 · pie | `_c1/bk/6740…` · payload |
| 36 | 05:45:28 | update_event master (descr.) | `0dpes0ekv96a453e89m5osg06t` = | GYM martes: solo UWSA3 / UWSA2 en martes; en 2026 ningún hito en martes (⏸ v6.03 NBME 25-27 en martes) · Régimen · pie | `_c1/bk/0dpe…` · payload |
| 37 | 05:45:51 | update_event master (descr.) | `09me7atu516gb0k6u0rbfcj8q1` = | BAILE martes: ídem GYM martes | `_c1/bk/09me…` · payload |
| 38 | 05:46:00 | update_event master (descr.) | `4qvs34d84u82psvknpqhv3jc7a` = | GYM jueves: «el JUE 22-oct-2026 SÍ es día de hito» → «ningún hito cae en jueves (UWSA1 lun 26-oct → serie del lunes)» | `_c1/bk/4qvs…` · payload |
| 39 | 05:46:07 | update_event master (descr.) | `3m8m4resu8akph4a7qfuf3h1qn` = | BAILE jueves: ídem | `_c1/bk/3m8m…` · payload |
| 40 | 05:46:18 | update_event master (descr.) | `7sf8i7pe62pugfk4t6tcnbb9i4` = | GYM viernes: 4 hitos en VIERNES (NBME 25-27 vie 6-nov / 27-nov / 18-dic + ensayo 7 bloques vie 8-oct-2027); UWSA1 lun 26-oct en LUNES; sin NBME en martes | `_c1/bk/7sf8…` · payload |
| 41 | 05:46:40 | update_event master (descr.) | `64lue1en3hk0cf8itml2rtlqi4` = | BAILE lunes: «el UWSA1 (D1) es el LUN 26-oct-2026 = ESTA serie» · Régimen · pie | `_c1/bk/64lu…` · payload |
| 42 | 05:46:50 | update_event master (descr.) | `0tod56pc6pgecm5lf7g4e3ji9v` = | BAILE miércoles: gates vuelven a miércoles (mié 18-nov / mié 16-dic) · UWSA1 lun 26-oct → serie BAILE lunes · NBME 28 = D47 | `_c1/bk/0tod…` · payload |
| 43 | 05:46:59 | update_event master (descr.) | `5pd4jhmvl31hvbuh40vphpoc4q` = | BAILE viernes: NBME 25-27 en VIERNES (6-nov · 27-nov · 18-dic) · mini-sims F1 vie 30-oct → 18-dic | `_c1/bk/5pd4…` · payload |
| 44 | 05:47:20 | update_event master (descr.) | `3jkfb6097rtc1jbec19eg3sd57` = | BAILE sábado: Régimen v6.05 + pie | `_c1/bk/3jkf…` · payload |
| 45 | 05:47:26 | update_event master (descr.) | `2u9je70pif58hgf2f8t3vgu8b8` = | DESAYUNO sáb/dom: Régimen v6.05 + pie (sin excepciones en el volcado; §17: ninguna) | `_c1/bk/2u9j…` · payload |
| 46 | 05:47:31 | update_event master (descr.) | `5mrm4ru08go9k70408jm8vcjku` = | CORRER: Régimen v6.05 + pie | `_c1/bk/5mrm…` · payload |
| 47 | 05:49:09 | update_event (título + descr.; fecha =) | `ae93qv0nqqs36h439hid1jcq8o` = | 🎯 NBME 29 mié 17-mar-2027: «· v6.00» → «· v6.05» · T3-T13 jue 18-mar → lun 5-abr (11 desplazadas con su T) · cola de vídeo T4-T6 · Day-After 17 18:00 → 23-mar 18:00 (guía) · colchón 42 ≈ 110 h | `_c1/bk/ae93…` · payload |
| 48 | 05:49:22 | update_event (descr.; fecha =) | `oinh139dsnbuma9r3kfu56dhkc` = | 🎯 EXAMEN lun 25-oct-2027: «colchón 48 filas ≈ 126 h» → «42 filas ≈ 110 h (⏸ v6.04: 48 ≈ 126 h)» + pie | `_c1/bk/oinh…` · payload |
| 49 | 05:49:29 | update_event (título + descr.; fecha =) | `3i88pp1gj84vc0r6tuherhsc0o` = | 🚦 GO/NO-GO lun 6-sep-2027: «· v6.04» → «· v6.05» · NBME 28 = d47 (⏸ v6.03 d50) · T141 sin cambio (comprobado en DIAS_T2) | `c1r2/bk/3i88….json` (get_event previo) · payload |
- Revisión F4 `55474jts1urh7s9j1nrtdkvfdg`: leída con get_event (updated 21-oct 17:15:58Z); no cita el colchón ni fechas de F1 → sin cambios. NBME 30 `mael3p9uhp036jbep45ql6v9oc`: el «126» del volcado de la ronda 1 es «E-126» (historial) → sin cambios.
| 50-55 | 05:52:41-05:53:06 | update_event (título + descr.; fecha =) | `27bs58ee0ke180ht2rh6mgvft0` (PRE-TEST, dia 55 → **52**; 13 pendientes 17-feb … 10-mar) · `g6t22lagnagt2sbrbo0n9d3u8k` (SIM #1, 60 → **57**) · `tuqhgd12ibsc595kbemaqiu6k8` (SIM #2, 65 → **62**) · `uvogu0gd7kufpshe2o3fffopf8` (SIM #3, 70 → **67**) · `6shb9jps4nir60khcd6h4g0jh8` (SIM #4, 75 → **72**) · `hl6ajs7etaqd6aici3s2vvema8` (SIM #5, 80 → **77**) = | «Dia N … (v6.03; …» → «Dia N−3 … (v6.05; dia N en v6.03, …» + «Fuente: Supabase (dia N−3, …)» · «· v6.03» → «· v6.05» · pie | `_c1/bk/<id>.json` · payloads |
| 56-61 | 05:53:23-05:53:50 | update_event (título + descr.; fecha =) | `7afho3rf6igkk1odse31sqps4c` (SIM #6, 85 → **82**) · `i3jhsk8hj6mj95aij99r6329mc` (SIM #7, 90 → **87**) · `2l4c2ct9iv6dkqvpcf6chtjnu0` (SIM #8, 95 → **92**) · `ip4lhi4lhigad4l1titbd36jnk` (DRESS jue 11-mar, 99 → **96**) · `tl0irrsb4av0vd8d1ar8vmbuoo` (D-1 vie 12-mar, 100 → **97**) · `3vrptnmtl9vppvs6nvv25s7p3c` (🛡 vie 12-mar, 100 → **97**) = | ídem | `_c1/bk/<id>.json` · payloads |
| 62 | 05:54:23 | update_event (título + descr.; fecha =) | `8juk0mvl66tutdkbcei7umrs68` = | 🏁 EXAMEN ENCAPS dom 14-mar: F1 dias 1-47 · intensiva 48-97 · PRE-TEST 52 · SIM 57…92 · DRESS 96 · D-1 97 · «· v6.05» | `_c1/bk/8juk…` · payload |
| 63-66 | 05:54:29-05:54:54 | update_event masters F2 (título + descr.) | `bod921vej8ehllto18h0ieiuig` (05:00, dias 48-97, D47 = NBME 28) · `qqjhn7hnkugffrnvm5s9a0q46k` (LOOP, dias 48-97 + secundarios v6.05: SYNAPSE → vie 5-mar · AURUM 30′ → vie 30-abr · LIVIANO → mié 3-mar · vibecoding → mié 10-mar) · `uvpo4pgrtiqp3d9p07ail1fni8` (EVAL 18:00, solo título + pie) · `2fvbkunh0nfhvhbn1b6iqvpifs` (STEP 1 VIVO: sistemas de F1 v6.05, T3-T13) = | «· F2 v6.03» → «· F2 v6.05» | `_c1/bk/<id>.json` · payloads |
| 67 | 05:55:27 | update_event (título + descr.; todo el día =) | `4mfnu95lrhr3dmu87einr3jm5k` = | Banner F2: «días 51-100» → «días 48-97» · SEÑALES dia 48 · PRE-TEST dia 52 · SIM 57…92 · DRESS 96 · D-1 97 · carril B 48-79 · 13 pendientes (dias 80-95; nuevos 8/9/10-mar) · backups v605 · historial v6.03 | `_c1/bk/4mfn…` · payload |
| 68 | 05:55:38 | update_event master (descr.) | `d8252hjo5ra2qlqb9bccd6vkjo` = | Carril B lun 1 → mar 16-feb: dias 71-82 → **68-79** · viernes 5/12-feb dias 72/77 · 13 pendientes uno por día · Régimen v6.05 | `_c1/bk/d825…` · payload |
| 69 | 05:56:09 | update_event master (título + descr.) | `qcsv3oe0e7rh2vkfq301ne68ko` = | Carril B · reposición 17-feb → 10-mar: «· F2 v6.03» → «· F2 v6.05» · 13 días = dias 80-95 · lista de 13 pendientes renumerada (83→80 … 94→91) + 3 NUEVOS lun 8-mar (dia 93) II-4 · mar 9-mar (dia 94) II-1 · mié 10-mar (dia 95) MINI-SIM 25Q I-1 + II-2 (sim_n 95, origen 43) · sin días de regla genérica | `_c1/bk/qcsv….json` · payload |
| 70-71 | 05:56:34 · 05:56:54 | update_event instancias (descr.) | `qcsv…_20270303T211500Z` · `qcsv…_20270304T211500Z` = | línea «⚠ v6.03 · HOY … (dia 93/94)» → «⚠ v6.05 · HOY mié 3-mar (dia 90) I-3 / jue 4-mar (dia 91) V-2» + texto nuevo de la serie (repuestas tras el master) | `_c1/bk/qcsv…_20270303T211500Z.*` / `_20270304…` |
| 72-74 | 05:57:29 · 05:57:50 · 05:58:11 | update_event instancias (descr.; 10-mar también título) | `qcsv…_20270308T211500Z` · `…_20270309T211500Z` · `…_20270310T211500Z` = | NUEVAS líneas por instancia (patrón de 3/4-mar): lun 8-mar dia 93 II-4 plan multisectorial (+ I-5+I-6) · mar 9-mar dia 94 II-1 prenatal/emergencias (+ II-EMG) · mié 10-mar dia 95 MINI-SIM 25Q I-1 + II-2 (receta íntegra, D95:b_msim, sim_n 95 / origen 43) con título «🇵🇪 ENCAPS carril B · REPOSICIÓN F1: mini-sim 25Q (I-1 + II-2) · v6.05» (sin overlay aparte: va en la propia instancia) | volcado `_c1/volcados/before/f2_encaps_all.json` (texto = serie) |
| 75-76 | 05:58:33 · 05:58:43 | update_event overlays (título + descr.) | `mgv06ho1cphr78rsqf9nrkgd7o` (lun 22-feb: dia 86 → **83**, D83:b_msim, sim_n 83) · `ddfms7b6q2e3lhvvqqvr6el474` (mar 2-mar: dia 92 → **89**, D89:b_msim, sim_n 89; checkpoint F1 v6.05 = mini-sim 40) = | lista de 13 pendientes (dias 80-95) · «· v6.03» → «· v6.05» | `_c1/bk/<id>.json` · payloads |
| 77-81 | 05:59:16-05:59:24 | update_event instancias (título) | `c5e77csne1bnfps1iq7nqel84s_20261019T230000Z` … `_20261023T230000Z` (lun 19 → vie 23) = | REPOSICIÓN de excepciones: el cambio de título del master (op. 6) había pisado los títulos «⏭ SIN SESIÓN (v6.03/v6.04 …)» del 19/20/21 (comprobado en `volcados/sem_19-25oct_despues1.json`) → los 5 días quedan «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · 🇺🇸 USMLE — Evaluación Diaria Acumulativa (…) · v6.05» | volcado `sem_19-25oct_antes.json` |

Total ronda 2 (C1): **81 escrituras** (`update_event`; 0 `create_event`, 0 `delete_event`), todas con `notificationLevel: NONE`. Ninguna serie recreada (no hacía falta tocar UNTIL/EXDATE en este ámbito): **no hay ids nuevos**.

#### Verificación
- `list_events` 26-oct → 1-nov DESPUÉS (`c1r2/volcados/sem_26oct-1nov_despues.json`) + `scratchpad/v605/c1r2/ver.js`: **166 comprobaciones OK, 0 FAIL** — las 68 instancias de las 23 series tocadas (6 USMLE, ENCAPS, ALMUERZO, ANKI sáb/dom, EKER, CORRER, GYM ×4, BAILE ×6, DESAYUNO finde) tienen la descripción del payload; ninguna lleva títulos «(plan del …)» de la v6.04a.
  - ALMUERZO lun 26 13:00-13:30 (texto del día del UWSA1) · vie 30 12:00-12:30 · UWSA1 lun 26 08:50-13:00 «· v6.05» (ronda 1).
  - ENCAPS 16:15: lun 26 «D1 · eval + PRE-TEST 1/2» · mar 27 «dia 2 · eval II-3 + PRE-TEST 2/2» · mié 28 / jue 29 título de serie · vie 30 «dia 5 · MINI-SIM 25Q (II-2 + I-10)».
- `list_events` 19 → 25-oct DESPUÉS (`sem_19-25oct_despues1.json`): ENCAPS 21/22/23 «⏭ SIN SESIÓN (v6.05 …)» (19/20 conservan «⏭ … v6.03»), ALMUERZO jue 22 12:00-12:30 «⏭ … · ALUMUERZO», ANKI dom 25 conserva su título propio de la ronda 1 (la actualización del master fue solo de descripción). Detectado y reparado: títulos de la Eval 18:00 del 19-21 (filas 77-81).
- Eventos sueltos (hitos, overlays, F2): cada respuesta de `update_event` devolvió la descripción = payload, el título nuevo y la fecha/hora esperada: NBME 25 vie 6-nov 07:00-12:30 · NBME 26 vie 27-nov · NBME 27 vie 18-dic · NBME 28 mié 30-dic (=) · gates `date` 2026-11-18 y 2026-12-16 (todo el día, sin hora) · C1 29-dic / C2 30-dic / CHECKPOINT 18-dic (=) · F2 y 2027 con su fecha intacta.

#### Ids vigentes (sin cambios de id en esta ronda)
USMLE `9274q14djfvggeajhor64oshj8` · `76dnlc30p3hnccenpvub2d9acg` · `c24k2n7k8qlhfimrrncf8rapgk` · `iuhj8busrh63ms7v4j5q8e9920` · `q72kvc9pm1brlqvl6383ccr9vs` · `c5e77csne1bnfps1iq7nqel84s` · UWSA1 `o1gla7846uae4tgngvc4q45osg` · ENCAPS 16:15 `papebi46etlo8glgfs5akd5mig` · ALMUERZO `43dq3oib16esjcqj1dcd8osot2` · ANKI sáb `r9eglu07f5lvltvpoue3v4ks6o` / dom `5s64scagno3jo983gg6rfdo5qg` · NBME 25-28 `4hjv5lkvluj06ahc2qndtsi6as` / `lr7ktrbiffj4hrlke7lh7cv6h4` / `sm4baa2v453ifaub325h9v08mg` / `ecu784689p8osrhqabuct8d5jg` · gates `sfgp85kjua01v159rh1qrilr18` / `vvi7lk2c0c9nih1fqbi19p681s` · C1/C2 `oi557k66kql15oa6ptkjdipvis` / `ag335n3dhvui11593us2lm448s` · CHECKPOINT `ti163p5s6t4odtqmhvkl3mamac` · F2: banner `4mfnu95lrhr3dmu87einr3jm5k` · PRE-TEST `27bs58ee0ke180ht2rh6mgvft0` · SIM #1-#8 `g6t22lagnagt2sbrbo0n9d3u8k` `tuqhgd12ibsc595kbemaqiu6k8` `uvogu0gd7kufpshe2o3fffopf8` `6shb9jps4nir60khcd6h4g0jh8` `hl6ajs7etaqd6aici3s2vvema8` `7afho3rf6igkk1odse31sqps4c` `i3jhsk8hj6mj95aij99r6329mc` `2l4c2ct9iv6dkqvpcf6chtjnu0` · DRESS `ip4lhi4lhigad4l1titbd36jnk` · D-1 `tl0irrsb4av0vd8d1ar8vmbuoo` · 🛡 `3vrptnmtl9vppvs6nvv25s7p3c` · EXAMEN ENCAPS `8juk0mvl66tutdkbcei7umrs68` · series F2 `bod921vej8ehllto18h0ieiuig` `qqjhn7hnkugffrnvm5s9a0q46k` `uvpo4pgrtiqp3d9p07ail1fni8` `2fvbkunh0nfhvhbn1b6iqvpifs` · carril B `d8252hjo5ra2qlqb9bccd6vkjo` / `qcsv3oe0e7rh2vkfq301ne68ko` · overlays `mgv06ho1cphr78rsqf9nrkgd7o` / `ddfms7b6q2e3lhvvqqvr6el474` · NBME 29 `ae93qv0nqqs36h439hid1jcq8o` · GO/NO-GO `3i88pp1gj84vc0r6tuherhsc0o` · EXAMEN Step 1 `oinh139dsnbuma9r3kfu56dhkc` · revisión F4 `55474jts1urh7s9j1nrtdkvfdg` (sin cambios) · rutinas EKER `22bh9m5jhc7ro6aj3m4ffjad7g` · GYM `6740kavnfkdcvj5k149ouliauu` `0dpes0ekv96a453e89m5osg06t` `4qvs34d84u82psvknpqhv3jc7a` `7sf8i7pe62pugfk4t6tcnbb9i4` · BAILE `64lue1en3hk0cf8itml2rtlqi4` `09me7atu516gb0k6u0rbfcj8q1` `0tod56pc6pgecm5lf7g4e3ji9v` `3m8m4resu8akph4a7qfuf3h1qn` `5pd4jhmvl31hvbuh40vphpoc4q` `3jkfb6097rtc1jbec19eg3sd57` · DESAYUNO finde `2u9je70pif58hgf2f8t3vgu8b8` · CORRER `5mrm4ru08go9k70408jm8vcjku`.

#### Pendientes / avisos para el orquestador
1. **Días pasados (prioridad baja, NO hecho):** títulos «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · …» en las instancias 21/22/23-oct de 5 series USMLE (`9274q…`, `76dn…`, `c24k…`, `iuhj…`, `q72k…`; hoy llevan el título de la serie «· v6.05») y del ALMUERZO 21/23-oct = 17 `update_event` de título. Hechos: ENCAPS 21/22/23, ALMUERZO 22, Eval 19-23.
2. **Excepciones anteriores al 19-oct** (historial, 31-ago → 18-oct) de las series cuyo master cambió de descripción: el MCP propaga la descripción a TODAS las instancias; no se auditó ese tramo (no se ve en la app ni en la semana actual).
3. **Excepciones de 2027 de ALMUERZO / series F2**: solo se auditaron por volcado las del 19-oct → 31-dic (ronda 1) y la semana 26-oct → 1-nov (ronda 2). La descripción de las series F2 (`bod9…`, `qqjh…`, `uvpo…`, `2fvb…`, `qcsv…`) cambió en el master: si alguna instancia de 2027 tenía texto propio distinto de los 5 de `qcsv` (3, 4, 8, 9, 10-mar, repuestos), quedó pisado.
4. **Mini-sim de reposición del mié 10-mar-2027** (pendiente F1 nuevo): va en la propia instancia de `qcsv` (título y receta propios); NO se creó un overlay naranja aparte como los del 22-feb / 2-mar (criterio v6.02). Si se quiere uniformar: 1 `create_event` 16:15-17:15 + quitar esa instancia de la serie.
5. Revisión F4 `55474jts…`: no cita el colchón ni fechas de F1 → sin cambios. NBME 30 `mael3…`: el «126» del volcado era «E-126» → sin cambios.
6. CAL_V6.md (§18 o el que toque) lo escribe el orquestador con este registro; respaldos y payloads en `DATA/_v600/cal/cal_bk/v605/c1r2/` (gitignored), scripts en `scratchpad/v605/c1r2/` (`lib.js`, `build_usmle.js`, `build_c1b.js`, `build_hitos.js`, `build_rut.js`, `build_2027.js`, `build_f2.js`, `ver.js`).

### 18.2 Ronda 2 · C2 — secundarios + revisión + Research
Orden de Joseph (sáb 24-oct): «Todo inicia el lunes 26 … no quites temas, solamente corre lo que está faltando». D1 = lun 26-oct-2026. La corrida por alias v6.04a (§15) queda sin efecto.
Fuente de fechas: `src/lib/*.ts` del commit `2b86639` (cargados con `scratchpad/load_ts.js`; sondas en `scratchpad/v605/c2r2/{probe,facts}.js`).

#### Protocolo
- `get_event` / volcado `list_events` del mismo rato + respaldo JSON en `DATA/_v600/cal/cal_bk/v605/c2r2/` (bk/, volcados/, payloads/, scripts/) ANTES de cada escritura. Respaldos de la ronda 1 (estado previo de las series borradas y de los masters): `cal_bk/v605/c2/`.
- `notificationLevel: NONE` en todo. Masters primero (solo título + descripción) → después se reponen las excepciones (el API pisa summary/description de las instancias con excepción).
- Textos por script con reemplazos «exactamente 1 coincidencia» (`c2r2/scripts/build.js`); lo previo queda como «⏸ v6.0x»; pie «(v6.05 · 24-oct-2026: D1 = lun 26-oct)».
- Ronda 1 (ya hecho, comprobado con list_events 26-30 oct): series nuevas vibecoding `llhrjvjqmmv06ft0vt94qdn3rk` · SYNAPSE `tfihh2hsim6mll6h5nsjur1ti8` (lun 26 ya en 07:25) · LIVIANO `u7dljk7hf8r81nmofgojhtdilc` · BUSINESS `5gbioj75d3bsgoio1fatrji0ns` · AURUM 30′ `r0n85cd06arqkikrbfra4luonc` con descripciones v6.05 (revisadas: coinciden con la app).

#### Operaciones (incremental)
| # | hora UTC | op | id antes → después | qué | respaldo |
|---|---|---|---|---|---|
| 1-12 | 05:31:14 → 05:32:39 | update_event ×12 (overlays 🔬, payload exacto de `gen_research_calendar.js --print`; mismos ids; 13:30-14:15 color 6 FREE; R43 todo el día) | M1 `shkul14j3o1bs1a5044u8ge1kk` · C-2 `iduh7fhst9uhl0t54hhk535ff4` · T-1 `95aglmlk9qi32m4bv6v28rv5b0` · C-6 `k2oov1tk0jalt5f45ekemej4k0` · CR-1 `36tp7b995jnoi844d5uvgm58t0` · T-8 `ahl0tbimefcq8u7ps2qasjb708` · CR-8 `f2mn20ok30kl5k2t1s6tci7n7c` · CR-9 `t136recadd6vnv0iebrmmqiv48` · X-1 `9hhe6q10da1ltbpk23h171gf9c` · X-9 `nibrfidt3qhct59qhtrvqpqqi0` · R10 `2k9idr3f3th6hj1e4r8ugj4iqk` · R43 `94mmg6li8egq2kh9401nti1pkg` | M1 mié 28 → **vie 30-oct** · C-2 jue 5 → **lun 9-nov** · T-1 lun 9 → **mié 11-nov** · C-6 mié 25-nov (=, texto) · CR-1 vie 27-nov (=, texto d13) · T-8 mar 29-dic (=, texto d23) · CR-8 mar 12-ene (=, texto d27) · CR-9 jue 11-feb (=, texto d29) · X-1 mar 23 → **jue 25-feb** · X-9 mié 31-mar → **vie 2-abr** · R10 mar 6 → **jue 8-abr** · R43 jue 29 → **sáb 31-jul** (todo el día) | `c2r2/bk/<id>.json` (5) + `c2r2/bk/overlays_7_prev.json` + `c2r2/bk/_calendar_overlays.before.json` · payloads `c2r2/payloads/research_print.json` |
| 13 | 05:33 | SCRIPT `gen_research_calendar.js --set` ×12 | `DATA/RESEARCH/_calendar_overlays.json` | `--check` antes: exit 1 (12 «recrear») → después: ver Verificación | copia previa `c2r2/bk/_calendar_overlays.before.json` (md5 ae126ee3…) |
| 14 | 05:37:11 | update_event (MASTER, solo título + descr.) | `23t06e7foitmiqm24lpd0vo9jc` (=) | 🪙 AURUM F1: «· v6.03 F1» → «· v6.05 F1» · D1 lun 26-oct → D130 mar 4-may · F1 = D1-D47 hasta mié 30-dic · serie 30′ = r0n85… · pitches v6.05 · gates mié 18-nov / mié 16-dic · pie v6.05 (RRULE/EXDATE/recordatorio intactos) | `c2r2/bk/23t06e7foitmiqm24lpd0vo9jc.pre.json` · payload `c2r2/payloads/23t06….txt` |
| 15 | 05:37:40 | update_event (MASTER, solo título + descr.) | `uiduvkfsgs43p1u1qk1vohih58` (=) | 🇪🇸 MIR 15:15: «· v6.03» → «· v6.05» · diario lun 26-oct → lun 15-feb (D5 Cardio vie 30-oct · D77 mini-MIR vie 12-feb · D78 lun 15-feb) · mant. 58 d mar 16-feb → mar 11-may (12 Tier C) · ext. 145 filas mié 12-may → vie 29-oct-2027 (141 hasta el tope vie 22-oct + 4 repuestas mar 26 → vie 29-oct) = 203 · ninguna serie MIR cubre F4 ni las repuestas · UNTIL vie 30-abr y EXDATE intactos | `c2r2/bk/uiduvkfsgs43p1u1qk1vohih58.pre.json` |
| 16 | 05:38:05 | update_event (MASTER, solo título + descr.) | `hos0tfhsr2hdfs6cgv1rmejhrs` (=) | 🇪🇸 MIR 15:30: «· v6.03» → «· v6.05» · D77 vie 12-feb / D78 lun 15-feb · mant. desde mar 16-feb (Tier C jueves; excepciones mié 24-mar · mar 11-may) · ext. desde mié 12-may · 203 sesiones · «310 cards al 15-feb» · RRULE/EXDATE intactos | `c2r2/bk/hos0tfhsr2hdfs6cgv1rmejhrs.pre.json` |
| 17 | 05:38:36 | update_event (MASTER, solo título + descr.) | `6us7kkdcuk3g7tm1cjes38leh0` (=) | 🔬↔💎 R↔D 13:30: «· v6.03» → «· v6.05» · mapa lun 26 R0 · mar 27 Derma d1 · mié 28 R1 · jue 29 Derma d2 · vie 30 M1 · lun 2-nov Derma d3 … · Research c1 lun 26-oct → mar 23-mar (M3 → mié 17-feb; R9 vie 13-nov), c2 lun 29-mar → sáb 4-sep · Derma c1 mar 27-oct → vie 21-may, c2 lun 24-may → vie 30-jul · hitos 🔬 v6.05 · gates mié 18-nov / mié 16-dic · UNTIL/EXDATE intactos. La propagación del master borra los títulos «(plan del …)» de §15 (jue 22 / vie 23): se reponen como ⏭ (fila 22+) | `c2r2/bk/6us7kkdcuk3g7tm1cjes38leh0.pre.json` |
| 18 | 05:39:03 | update_event (MASTER, solo título + descr.) | `k8iaefnjq0mnrlvkilhcarrik8` (=) | 📋 REVISIÓN: «· v6.03» → «· v6.05» · S01 sáb 31-oct (S1/42, cubre lun 26 → vie 30) · S06 sáb 5-dic y S10 sáb 2-ene DELOAD · auditoría NBME 28 = D47 · gates mié 18-nov / mié 16-dic · NBME 25/26/27 vie 6-nov / 27-nov / 18-dic · F2 S11_2027-01-09 … S19_2027-03-06 · F3 S21 = S11/42 … S27 = S17/42 · RRULE/EXDATE intactos | `c2r2/bk/k8iaefnjq0mnrlvkilhcarrik8.pre.json` |
| 19 | 05:39:07 | update_event (instancia, solo título) | `k8iaefnjq0mnrlvkilhcarrik8_20261024T121500Z` (=) | REPUESTA la excepción del sáb 24-oct 07:15 que pisó el master: «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26 · la S01 es el sáb 31-oct) · 📋 REVISIÓN SEMANAL» (descripción = la de la serie v6.05) | `cal_bk/v605/c2/inst/k8iaefnjq0mnrlvkilhcarrik8_20261024T121500Z.json` |
| 20 | 05:39:40 | update_event (MASTER, solo descr.; título sin versión) | `jhsg92lo784vlr8tc5bnsag8uk` (=) | 🧠 PC sábado: régimen v6.05 (S1-S8 lun→vie · S9 lun 21 → lun 28-dic · S10-S12 · SHIP sáb 31-oct … 19-dic, AVANCE S9 sáb 26-dic, SHIP S9-S12 sáb 2 / 9 / 16 / 23-ene) · taper jue 21-ene → mié 10-mar (PC opc. sáb 30-ene, 6 y 13-feb + S16 sáb 20-feb; sáb 27-feb último, PC 0′) · UNTIL sáb 27-feb intacto | `c2r2/bk/jhsg92lo784vlr8tc5bnsag8uk.pre.json` |
| 21 | 05:40:09 | update_event (MASTER, solo descr.; título sin versión) | `m8kfvq6440c6al6cq47oclnoj8` (=) | 🧠 PC domingo: régimen v6.05 (S1-S12 v6.05 · Feynman dom 1-nov → dom 17-ene según la app · taper sin Feynman · UNTIL dom 28-feb intacto) | `c2r2/bk/m8kfvq6440c6al6cq47oclnoj8.pre.json` |
| 22 | 05:40:09 | update_event (instancia, solo título) | `m8kfvq6440c6al6cq47oclnoj8_20261025T200000Z` (=) | REPUESTA la excepción del dom 25-oct: «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · 🧠 SYNAPSE — repaso + PC domingo (2h)» | `cal_bk/v605/c2/inst/m8kfvq6440c6al6cq47oclnoj8_20261025T200000Z.json` |
| 23-28 | 05:40:31 → 05:40:41 | update_event (instancias, solo hora) | `tfihh2hsim6mll6h5nsjur1ti8_20261106T173000Z` · `_20261127T173000Z` · `_20261218T173000Z` · `_20261230T173000Z` · `_20270226T173000Z` · `_20270305T173000Z` (=) | 🧠 SYNAPSE 12:30-13:00 → **13:00-13:30** los vie 6-nov / 27-nov / 18-dic (NBME 25/26/27), mié 30-dic (NBME 28) y vie 26-feb / vie 5-mar (SIM 100Q ENCAPS 11:00-13:00) = `rutinaGuia.synFranjaDe`; título y descripción de la serie | estado previo = instancia de serie sin excepción (volcado `c2r2/volcados/l_26-30oct_before.json`: master tfihh… upd 05:21:38Z) |
| 29-31 | 05:40:54 → 05:40:59 | update_event (instancias, MOVIDAS de día + título) | `5gbioj75d3bsgoio1fatrji0ns_20261106T180000Z` · `_20261127T180000Z` · `_20261218T180000Z` (=) | 📚 BUSINESS vie 6-nov / 27-nov / 18-dic 13:00-13:25 (viernes de OUTPUT = día de NBME 25/26/27 → `bizFranjaDe` = null) → **sáb 7-nov / 28-nov / 19-dic 07:45-08:25** (= `bizFranjaDe(sáb)`, OUTPUT entero 40′ tras la revisión semanal) · títulos «📚 BUSINESS — OUTPUT S2 / S5 / S8 entero + tracker semanal (40′) · del vie 6-nov / 27-nov / 18-dic (día del NBME 25 / 26 / 27)»; descripción de la serie (ya lo explicaba: «instancias movidas al sáb 7-nov · 28-nov · 19-dic»). Así el viernes queda sin Business y el sábado tiene su evento, sin crear sueltos | instancia de serie sin excepción (volcado `l_26-30oct_before.json`: master 5gbio… upd 02:46:10Z) |
| 32 | 05:41:01 | update_event (instancia, solo hora) | `5gbioj75d3bsgoio1fatrji0ns_20261230T180000Z` (=) | mié 30-dic (NBME 28) 13:00-13:25 → **12:30-12:55** (audio en el almuerzo) | idem |
| 33-37 | 05:42:48 → 05:42:56 | update_event (instancias pasadas, solo título) | `6us7kkdcuk3g7tm1cjes38leh0_20261019T183000Z` … `_20261023T183000Z` (=) | R↔D lun 19 → vie 23-oct → «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · 🔬 RESEARCH ↔ 💎 DERMA (alterna diario · ver app YoCPMD) · v6.05» (repone los ⏭ v6.03/v6.04 del 20/21 y sustituye los «(plan del …)» de §15 del jue 22 / vie 23, borrados por la propagación del master) | `cal_bk/v605/c2/inst/6us7k…_2026102{0..3}T183000Z.json` |
| 38-42 | 05:43:10 → 05:43:18 | update_event (instancias pasadas, solo título) | `23t06e7foitmiqm24lpd0vo9jc_20261019T191500Z` … `_20261023T191500Z` (=) | AURUM F1 lun 19 → vie 23-oct → «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · 🪙 AURUM — Closer de ventas (30-60' · 14:15-15:15 · L-V) · v6.05 F1» (repone los ⏭ v6.03/v6.04 del 20/21) | `cal_bk/v605/c2/inst/23t06…_2026101{9}…2026102{3}T191500Z.json` |

#### Verificación (list_events después de los cambios; volcados en `cal_bk/v605/c2r2/volcados/*_after.json`, script `c2r2/scripts/ver.js` + `cruce.js`)
| Ventana | Resultado |
|---|---|
| lun 26 → dom 1-nov | ✅ 44 eventos C2, todos con pie v6.05 y sin «· v6.03/v6.04» en el título (`ver.js`: FALLOS 0) · lun 26 SYNAPSE 07:25 · Business 13:00 · R↔D 13:30 · AURUM 14:15 · MIR 15:15/15:30 · LIVIANO 17:15 · overlay 🔬 M1 **vie 30-oct 13:30** · REVISIÓN «· v6.05» sáb 31-oct 07:15 · PC sáb 31 / dom 1-nov 15:00 |
| vie 6 / sáb 7-nov | ✅ vie 6: SYNAPSE **13:00-13:30**, sin Business · sáb 7: REVISIÓN 07:15 + **Business OUTPUT S2 07:45-08:25** + PC 15:00 |
| mié 30-dic | ✅ Business **12:30-12:55** · SYNAPSE **13:00-13:30** · resto a su hora |
| Cruce app ↔ Calendar (`cruce.js`, `plantillaDelDia` + `bizFranjaDe` + `guiaRevisionDe`) | ✅ 26-30 oct, 6-nov y 30-dic: cada bloque L-V de C2 tiene su evento a su hora (51 OK). Únicos «faltantes»: el SHIP/Feynman del finde (lo cubren las series PC sáb/dom 15:00, otro id) y el **cierre Business 15′ de los sábados normales (07:45-08:00)**, que nunca tuvo evento en el Calendar (ni en v6.03) — ver Pendientes |
| Research | ✅ `gen_research_calendar.js --check` → exit 0 · 12/12 «nada» · `_calendar_overlays.json` md5 ae126ee3… → 7450acdd… |
| 19-25 oct (antes del barrido de días pasados) | la propagación de los masters borró los rótulos ⏭ v6.03/v6.04 y los «(plan del …)» de §15 (jue 22 / vie 23) → título de serie v6.05; sáb 24 REVISIÓN y dom 25 PC domingo con su ⏭ v6.05 repuesto |

#### Ids vigentes (C2, v6.05)
| Serie / evento | Id | Rango |
|---|---|---|
| 🧠 VIBECODING 04:15 · v6.05 | `llhrjvjqmmv06ft0vt94qdn3rk` (ronda 1) | → mié 10-mar-2027 |
| 🧠 SYNAPSE 12:30 · v6.05 | `tfihh2hsim6mll6h5nsjur1ti8` (ronda 1) | → vie 5-mar · excepciones lun 26-oct 07:25 · vie 6-nov / 27-nov / 18-dic, mié 30-dic, vie 26-feb, vie 5-mar 13:00 |
| ⚖️ LIVIANO 17:15 · v6.05 | `u7dljk7hf8r81nmofgojhtdilc` (ronda 1) | → mié 3-mar |
| 📚 BUSINESS 13:00 | `5gbioj75d3bsgoio1fatrji0ns` (ronda 1) | → mar 23-feb · excepciones vie 6-nov → sáb 7-nov, 27-nov → sáb 28-nov, 18-dic → sáb 19-dic 07:45-08:25 · mié 30-dic 12:30 |
| 🪙 AURUM 30′ · v6.05 F2-F3 | `r0n85cd06arqkikrbfra4luonc` (ronda 1) | lun 4-ene → vie 30-abr |
| 🪙 AURUM F1 · v6.05 F1 | `23t06e7foitmiqm24lpd0vo9jc` (=) | → mié 30-dic |
| 🇪🇸 MIR 15:15 / 15:30 · v6.05 | `uiduvkfsgs43p1u1qk1vohih58` / `hos0tfhsr2hdfs6cgv1rmejhrs` (=) | → vie 30-abr |
| 🔬↔💎 R↔D 13:30 · v6.05 | `6us7kkdcuk3g7tm1cjes38leh0` (=) | → vie 30-abr |
| 📋 REVISIÓN SEMANAL · v6.05 | `k8iaefnjq0mnrlvkilhcarrik8` (=) | → sáb 1-may · excepción sáb 24-oct ⏭ |
| 🧠 PC sábado / PC domingo | `jhsg92lo784vlr8tc5bnsag8uk` / `m8kfvq6440c6al6cq47oclnoj8` (=) | → sáb 27-feb / dom 28-feb · excepción dom 25-oct ⏭ |
| 12 overlays 🔬 | mismos ids (ver fila 1-12) | M1 vie 30-oct … R43 sáb 31-jul |

#### Pendientes / observaciones
1. **Cierre Business 15′ de los sábados normales (07:45-08:00; F2 09:15-09:30, último sáb 27-feb 09:15-09:45)**: la app lo pone (`bizFranjaDe(sáb)`) pero el Calendar nunca tuvo serie para él (tampoco en v6.03). Solo se cubrieron los 3 sábados de NBME (OUTPUT entero 40′, instancias movidas). Si Joseph lo quiere visible: crear una serie SA 07:45-08:00 (F1) + otra 09:15-09:30 (F2) con EXDATE de los sábados sin OUTPUT.
2. **🚌 REGRESO `c0g48p72o4441tgcecmlg8s8lo` (mar 26-oct-2027)** cita «la sesión MIR repuesta d203» (v6.04: 1 repuesta). En v6.05 son **4 repuestas mar 26 → vie 29-oct-2027** (d200-d203). Es un hito 2027 (fuera de C2): actualizar su texto en la ronda de hitos. Ninguna serie MIR del Calendar cubre F4 ni las repuestas (comprobado en CAL_V6 §16: no hay series de F4).
3. AURUM PITCH v7 = mar 4-may (D130, SERUMS): decisión pendiente de Joseph; no se tocó.
4. Cabecera de `DATA/_scripts/gen_research_calendar.js` (bloque v6.05) dice «R9 pasa tras la pausa»; el plan vigente (fix del 24-oct) desplaza **M3** (mié 17-feb) y R9 se queda el vie 13-nov. Solo comentario; no se tocó código.
5. `DATA/REVISION_SEMANAL.md` aparece modificado en el working tree (hora 00:24 del 25-oct, otra ronda); C2 no lo tocó.
6. **Días pasados 19-23 oct NO hechos (prioridad baja, presupuesto)**: MIR 15:15 `uiduvkfsgs43p1u1qk1vohih58_202610{19..23}T201500Z` y MIR 15:30 `hos0tfhsr2hdfs6cgv1rmejhrs_202610{19..23}T203000Z` (sus ⏭ v6.03/v6.04 del 20/21 los borró la propagación del master: hoy llevan el título de serie v6.05) · series nuevas vibecoding `llhrj…_T091500Z`, SYNAPSE `tfihh…_T173000Z`, BUSINESS `5gbio…_T180000Z`, LIVIANO `u7dlj…_T221500Z` (lun 19 → vie 23) · PC sábado sáb 24 `jhsg92lo784vlr8tc5bnsag8uk_20261024T200000Z`. Título a poner: «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · <título de la serie>» (solo summary, notificationLevel NONE).
7. Sin commit. Escrituras en el repo: `DATA/RESEARCH/_calendar_overlays.json` (`--set`) y respaldos en `DATA/_v600/cal/cal_bk/v605/c2r2/` (ignorado por git).

## 19. v6.06 — todo comienza el LUN 2-NOV-2026 (sáb 31-oct-2026)
Orden de Joseph (sáb 31-oct): «Reestructura todo a partir del 2 de noviembre … corre nada más, corre también las fechas límite, corre con una semana nada más … para no perder materias, tan solamente corre.»
La semana 26-30 oct no se estudió → D1 de TODO = lun 2-nov (commits `2e3a35d` + `c94fde6`). Respaldos en `cal_bk/v606/` (gitignored: `list_31oct-2nov_antes.json`, `c1/`, `c2/`). `notificationLevel: NONE` en todo.

### 19.0 Orquestador (sáb 31-oct ≈08:05 Lima, `updated` 13:06-13:07Z)
| # | Tipo | Id | Antes → después |
|---|---|---|---|
| 1 | TÍTULO | `jhsg92lo784vlr8tc5bnsag8uk_20261031T200000Z` (PC sábado) | sáb 31-oct → «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov · SHIP S1 = sáb 7-nov) · …» (serie recreada después por C2 → `nsdnhm11ceicjmqvqc3qenin00`, excepción repuesta) |
| 2 | TÍTULO | `k8iaefnjq0mnrlvkilhcarrik8_20261031T121500Z` (REVISIÓN) | sáb 31-oct → «⏭ SIN SESIÓN (v6.06 … la S01 es el sáb 7-nov)» |
| 3-4 | TÍTULO | `r9eglu07f5lvltvpoue3v4ks6o_20261101T000000Z` · `5s64scagno3jo983gg6rfdo5qg_20261101T220000Z` (ANKI sáb / dom) | «ANKI · v6.06: sin sesión de plan (el mazo del plan arranca el lun 2-nov) — solo si tienes tarjetas DUE de antes» |
| 5 | TÍTULO | `m8kfvq6440c6al6cq47oclnoj8_20261101T200000Z` (PC domingo) | dom 1-nov → ⏭ v6.06 (serie recreada después por C2 → `fvbccognpru6jh6u4g8qhnud7g`, excepción repuesta) |
| 6-7 | TÍTULO | `7j6pucil43vuca70p082g5ub3d_20261101T230000Z` (BAILE) · `13m3tcqjjc34rt6iqfblla18q1_20261101T221500Z` (PRÁCTICA) | dom 1-nov = víspera del UWSA1 → «suave/opcional, cena ligera temprano, cama 21:00» |
| 8 | MOVE (instancia) | `tfihh2hsim6mll6h5nsjur1ti8_20261102T173000Z` (SYNAPSE) | lun 2-nov 12:30 → **07:25-07:55** (serie recreada después por C2 → `n8641e63c3msrkbaq3mqdtbmj0`, excepción repuesta) |
| 9 | MOVE (instancia) | `43dq3oib16esjcqj1dcd8osot2_20261102T170000Z` (ALMUERZO) | lun 2-nov 12:00 → **13:00-13:30** |
| 10 | MOVE + TÍTULO + DESCR. | `o1gla7846uae4tgngvc4q45osg` (🎯 UWSA1) | lun 26-oct → **lun 2-nov 08:50-13:00** · «· v6.05» → «· v6.06» · descripción v6.06 |

### Ids vigentes que cambian en v6.06 (series recreadas por C2)
| Serie | Id v6.05 → v6.06 | Rango |
|---|---|---|
| 🧠 VIBECODING 04:15 | `llhrjvjqmmv06ft0vt94qdn3rk` → **`b2qgtck9gai5cilr8qvbkd51t8`** | → vie 19-mar-2027 · EXDATE 25-dic, 31-dic, 1-ene, 12-mar, 15-mar |
| 🧠 SYNAPSE 12:30 | `tfihh2hsim6mll6h5nsjur1ti8` → **`n8641e63c3msrkbaq3mqdtbmj0`** | → mar 16-mar · mismos EXDATE · 07:25 lun 2-nov · 13:00 vie 13-nov, 4-dic, 18-dic, mié 30-dic, vie 26-feb, vie 5-mar, jue 11-mar |
| ⚖️ LIVIANO 17:15 | `u7dljk7hf8r81nmofgojhtdilc` → **`bajf6riq56ns5u57b5lqqtb268`** | → mié 10-mar |
| 📚 BUSINESS 13:00 | `5gbioj75d3bsgoio1fatrji0ns` → **`0h8emvdchmvh4sfddqqed3th8s`** | → mar 2-mar · OUTPUT de los vie de NBME → sáb 14-nov / 5-dic / 19-dic 07:45-08:25 · vie 26-feb → sáb 27-feb 09:15-09:55 · mié 30-dic 12:30 |
| 🧠 PC sábado | `jhsg92lo784vlr8tc5bnsag8uk` → **`nsdnhm11ceicjmqvqc3qenin00`** | → sáb 6-mar |
| 🧠 PC domingo | `m8kfvq6440c6al6cq47oclnoj8` → **`fvbccognpru6jh6u4g8qhnud7g`** | → dom 7-mar |
| 🇵🇪 ENCAPS · CARRIL SÁBADO (nuevos) | — → `lopnequ2muif9hcht769jdu230` (9-ene) · `5o45dle24ctttitbu4tppet9vs` (16-ene) · `au8l6v0m0lrbl23i650q5bkhpo` (23-ene) · `n4o53ojugb2t4ksvqmkvssvv8s` (30-ene) · `vhmvg2j5527jjvk988ldf4k9bk` (6-feb, mini-sim) | sábados de F2 09:30-10:30 |

Pendiente cosmético (días pasados): títulos ⏭ v6.06 en 26-30 oct de varias series (lista en 19.2) y una línea en blanco inicial en la descripción de `d8252hjo5ra2qlqb9bccd6vkjo`.

### 19.1 C1 — USMLE + ENCAPS + hitos + ALMUERZO + ANKI + rutinas + REGRESO
Orden de Joseph (sáb 31-oct): «Reestructura todo a partir del 2 de noviembre … corre nada más, corre también las fechas límite, corre con una semana … tan solamente corre». La semana 26-30 oct no se estudió → D1 = LUN 2-NOV-2026.

#### Protocolo
- Estado previo con `list_events` volcado a disco ANTES de escribir (`DATA/_v600/cal/cal_bk/v606/c1/volcados/`: `pas_p1/p2.json` 19→30-oct · `sem_2nov19h-8nov_antes.json` · `f1_p1..p5.json` 9-nov → 31-dic · `fin_31oct-2nov_actual.json` = estado tras el orquestador; unión `all_19oct-31dic_antes.json`, 1.757 eventos).
- Comprobado (diff `list_31oct-2nov_antes.json` → `fin_31oct-2nov_actual.json`): los 9 cambios del orquestador están (REVISIÓN/PC sáb 31 ⏭ · ANKI sáb 31 y dom 1 · PC dom 1 ⏭ · BAILE/PRÁCTICA dom 1 víspera · UWSA1 lun 2-nov · SYNAPSE lun 2 07:25-07:55 · ALMUERZO lun 2 13:00-13:30). No se repiten.
- Respaldo por evento antes de escribir: `cal_bk/v606/c1/bk/<id>.json` + `.desc.txt` (serie → instancia modal del volcado = texto del master). Payloads por script con reemplazos «exactamente 1 coincidencia»: `cal_bk/v606/c1/payloads/` (scripts en `scratchpad/v606/c1/`: `lib606.js`, `b_*.js`, `res2.js`).
- `notificationLevel: NONE` en todas las escrituras. Masters primero; luego reposición de excepciones.
- Fuentes (commit 2e3a35d, cargadas con `DATA/_scripts/usmle/cargar_ts.js`): `usmleStep1Daily.ts` (DIAS D1-D42, DIAS_T2 T3-T18 desplazadas, colchón 32 filas = 84 h, uWorld F1 1.340 + tramo 2 1.960 = 3.300, margen 359), `fechasV6.ts` (STEP1_SEMANAS 41), `usmleGuia.ts` (Day-After UWSA1 lun 2 → jue 5-nov, cola F1 → T4-T5, colaTramo2 T19-T23), `homeBriefing.ts` (DELOAD lun 7-dic / lun 28-dic), `encapsGuia.ts` (semana 2-6 nov, carril SÁBADO), `_encaps_mantenimiento_2027.sql` (F1 dia 1-42), `_encaps_intensivo_2027.sql` (43-92), `DATA/ENCAPS/_pendientes_f1.json`.

#### Operaciones
| # | op | id antes → después | qué | respaldo |
|---|---|---|---|---|
| 1 | update_event master (título+descr.) | `9274q14djfvggeajhor64oshj8 =` | ANKI AM 05:00: «· v6.05» → «· v6.06» · Régimen v6.06 (D1 UWSA1 lun 2-nov → D42 mié 30-dic; NBME 25 vie 13-nov · 26 vie 4-dic · 27 D35 vie 18-dic · 28 D42; 16 desplazadas T3-T18; cola F1 T4-T5 + T19-T23; colchón 32 ≈ 84 h; gates mié 25-nov / 23-dic) + historial v6.05 + pie · updated 15:19:29Z | bk/9274q….json |
| 2 | update_event master (título+descr.) | `76dnlc30p3hnccenpvub2d9acg =` | Repaso 07:15: ídem + «mar 3-nov (D2) = Day-After 3/6; primer repaso anclado mié 4-nov (D3)» · updated 15:20:21Z | bk/76dn….json |
| 3 | update_event master (título+descr.) | `c24k2n7k8qlhfimrrncf8rapgk =` | PRE-TEST 08:15: ídem + NBME en VIERNES (13-nov · 4-dic · 18-dic) · D41 = DM · updated 15:20:48Z | bk/c24k….json |
| 4 | update_event master (título+descr.) | `iuhj8busrh63ms7v4j5q8e9920 =` | DEEP PRIME 09:00: hitos v6.06 · primer deep prime mar 3-nov · 16 filas desplazadas con nombre (T3-T18) · updated 15:21:23Z | bk/iuhj….json |
| 5 | update_event master (título+descr.) | `q72kvc9pm1brlqvl6383ccr9vs =` | 30Q 11:00: viernes N1 v6.06 (D5 vie 6-nov · D30 vie 11-dic) · N3 (D15 vie 20-nov · D20 vie 27-nov) · sin N4 en F1 (acaba en la S9) · uWorld F1 ~1.340 + tramo 2 ~1.960 = 3.300 (margen 359) · updated 15:22:03Z | bk/q72k….json |
| 6 | update_event instancia (título) | `c5e77csne1bnfps1iq7nqel84s_20261019T230000Z =` | REPOSICIÓN: el título del master (op. 5→6) pisa la excepción → «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · 🇺🇸 USMLE — Evaluación Diaria Acumulativa (…) · v6.06» (antes «⏭ SIN SESIÓN (v6.05 …)») | volcado pas_p1.json |
| 7 | update_event instancia (título) | `c5e77csne1bnfps1iq7nqel84s_20261020T230000Z =` | REPOSICIÓN: el título del master (op. 5→6) pisa la excepción → «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · 🇺🇸 USMLE — Evaluación Diaria Acumulativa (…) · v6.06» (antes «⏭ SIN SESIÓN (v6.05 …)») | volcado pas_p1.json |
| 8 | update_event instancia (título) | `c5e77csne1bnfps1iq7nqel84s_20261021T230000Z =` | REPOSICIÓN: el título del master (op. 5→6) pisa la excepción → «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · 🇺🇸 USMLE — Evaluación Diaria Acumulativa (…) · v6.06» (antes «⏭ SIN SESIÓN (v6.05 …)») | volcado pas_p1.json |
| 9 | update_event instancia (título) | `c5e77csne1bnfps1iq7nqel84s_20261022T230000Z =` | REPOSICIÓN: el título del master (op. 5→6) pisa la excepción → «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · 🇺🇸 USMLE — Evaluación Diaria Acumulativa (…) · v6.06» (antes «⏭ SIN SESIÓN (v6.05 …)») | volcado pas_p1.json |
| 10 | update_event instancia (título) | `c5e77csne1bnfps1iq7nqel84s_20261023T230000Z =` | REPOSICIÓN: el título del master (op. 5→6) pisa la excepción → «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · 🇺🇸 USMLE — Evaluación Diaria Acumulativa (…) · v6.06» (antes «⏭ SIN SESIÓN (v6.05 …)») | volcado pas_p1.json |
| 11 | update_event master (título+descr.) | `c5e77csne1bnfps1iq7nqel84s =` | Eval 18:00: Day-After UWSA1 lun 2 1/6 · mar 3 05:00 2/6 · 07:15 3/6 · 18:00 4/6 · mié 4 5/6 · jue 5 6/6 + eval reducida · eval vuelve vie 6-nov · NBME viernes 13-nov / 4-dic / 18-dic · updated 15:22:34Z | bk/c5e7….json |
| 12 | update_event master (descr.) | `papebi46etlo8glgfs5akd5mig =` | ENCAPS 16:15: cabecera v6.06 (F1 dias 1-42 lun 2-nov → mié 30-dic = 35 banqueo + 7 mini-sims; CHECKPOINT vie 18-dic = dia 35 = mini-sim 35 III-1 + III-9; carril B 43-74 + CARRIL SÁBADO) · viernes F1 vie 6-nov → 18-dic · ARRANQUE v6.06 (lun 2 eval + pre-test 1/2 · mar 3 eval II-3 + pre-test 2/2 · mié 4 banco V-2 · jue 5 banco III-5 · vie 6 MINI-SIM II-2 + I-10; semana 2 lun 9 → jue 12 por generar; stock RUNBOOK §4-§5) · 13 pendientes dias 75-90 + 5 carril sábado (9/16/23/30-ene, 6-feb) · intensiva 43-92, PRE-TEST dia 47, SIM 52…87 · Supabase v6.06 (backups *_v606_20261031) · historial v6.05 · pie · updated 15:24:59Z | bk/papebi….json |
| 13 | update_event instancia (título) | `papebi46etlo8glgfs5akd5mig_20261102T211500Z =` | lun 2-nov: «🇵🇪 ENCAPS — D1 · eval (fallos previos) + PRE-TEST DE ARRANQUE 1/2 (20Q ciegas: II-3 · I-3 · V-2 · III-5 · 72 s/Q) · v6.06» (antes: título de la serie) | volcados (título = serie) |
| 14 | update_event instancia (título) | `papebi46etlo8glgfs5akd5mig_20261103T211500Z =` | mar 3-nov: «🇵🇪 ENCAPS — dia 2 · eval II-3 + PRE-TEST DE ARRANQUE 2/2 (20Q ciegas: II-5 · I-4 · IV-1+IV-2 · II-4 · 72 s/Q) · v6.06» | volcados (título = serie) |
| 15 | update_event instancia (título) | `papebi46etlo8glgfs5akd5mig_20261106T211500Z =` | vie 6-nov: «🇵🇪 ENCAPS — dia 5 · MINI-SIM 25Q (cola larga II-2 + I-10 · 72 s/Q) · v6.06» | volcados (título = serie) |
| 16 | update_event master (descr.) | `43dq3oib16esjcqj1dcd8osot2 =` | ALMUERZO: UWSA1 LUN 2-nov (⏸ v6.05 lun 26-oct) · NBME 25-27 VIE 13-nov / 4-dic / 18-dic · Régimen v6.06 · pie (título «ALUMUERZO» y RRULE intactos) · updated 15:26:00Z | bk/43dq….json |
| 17 | update_event instancia (hora + descr.) | `43dq3oib16esjcqj1dcd8osot2_20261102T170000Z =` | lun 2-nov 13:00-13:30 (repuesta tras el master) + «🎯 HOY (lun 2-nov, UWSA1 08:50-13:00 · D1 v6.06) … 13:30 💎 Derma d1 (Research d1 = mar 3-nov)» + texto de la serie | fin_31oct-2nov_actual.json |
| 18 | update_event instancia (hora) | `43dq3oib16esjcqj1dcd8osot2_20261113T170000Z =` | vie 13-nov (NBME 25) 12:00 → 12:30-13:00 | f1_p1.json |
| 19 | update_event instancia (hora) | `43dq3oib16esjcqj1dcd8osot2_20261204T170000Z =` | vie 4-dic (NBME 26) 12:00 → 12:30-13:00 | f1_p3.json |
| 20 | update_event instancia (hora) | `43dq3oib16esjcqj1dcd8osot2_20261106T170000Z =` | vie 6-nov (NBME 25 v6.05) 12:30 → 12:00-12:30 (vuelve a la hora de la serie) | sem_2nov19h-8nov_antes.json |
| 21 | update_event instancia (hora) | `43dq3oib16esjcqj1dcd8osot2_20261127T170000Z =` | vie 27-nov (NBME 26 v6.05) 12:30 → 12:00-12:30 | f1_p2.json |
| 22 | update_event master (descr.) | `r9eglu07f5lvltvpoue3v4ks6o =` | ANKI sábado: Régimen v6.06 (F1 lun 2-nov → mié 30-dic; primer sábado con mazo del plan sáb 7-nov; sáb 31-oct sin sesión) + pie · updated 15:27:00Z | bk/r9eg….json |
| 23 | update_event master (descr.) | `5s64scagno3jo983gg6rfdo5qg =` | ANKI domingo: «v6.06: la víspera del D1 (UWSA1 LUN 2-nov) es el DOM 1-NOV …» (⏸ v6.05 dom 25-oct) + Régimen v6.06 + pie · updated 15:27:10Z | bk/5s64….json |
| 24 | update_event (MOVE + título + descr.) | `4hjv5lkvluj06ahc2qndtsi6as =` | 🎯 NBME 25: vie 6-nov → **VIE 13-NOV 07:00-12:30** (D10) «· v6.06» · tramo siguiente D11 lun 16-nov / D16 lun 23-nov / D17 mar 24-nov · Day-After 18:00 hoy + lun 16 07:15/18:00 + mar-mié-jue 18:00 · ENCAPS 16:15 = mini-sim dia 10 (V-6 + II-6) · gates mié 25-nov / 23-dic · historial v6.05 · updated 15:31:37Z | bk/4hjv….json |
| 25 | update_event (MOVE + título + descr.) | `lr7ktrbiffj4hrlke7lh7cv6h4 =` | 🎯 NBME 26: vie 27-nov → **VIE 4-DIC 07:00-12:30** (D25) · Day-After lun 7 → jue 10-dic · mini-sim dia 25 (III-3 + I-11+I-12) · DELOAD S6 lun 7 → vie 11-dic · Renal D23-D29, GI D30 vie 11-dic · updated 15:32:03Z | bk/lr7k….json |
| 26 | update_event (título + descr.; fecha =) | `sm4baa2v453ifaub325h9v08mg =` | 🎯 NBME 27 vie 18-dic (=): D40 → **D35** (adelantado por la regla del Day-After completo) · Day-After lun 21 → jue 24-dic · ENCAPS 16:15 = MINI-SIM 35 CHECKPOINT (III-1 + III-9) · tras el NBME GI D36-D37 + Endocrino D38-D41 · updated 15:32:20Z | bk/sm4b….json |
| 27 | update_event (título + descr.; fecha =) | `ecu784689p8osrhqabuct8d5jg =` | 🎯 NBME 28 mié 30-dic (=): D47 → **D42** · Endocrino D38-D41 alrededor (Day-After NBME 27 lun 21 → jue 24) · auditoría S09 sáb 2-ene (⏸ S10) · 16 desplazadas T3-T18 con fecha · cola F1 T4-T5 + T19-T23 · colchón 32 ≈ 84 h · historial v6.05 · updated 15:33:13Z | bk/ecu7….json |
| 28 | update_event (MOVE día completo + título + descr.) | `sfgp85kjua01v159rh1qrilr18 =` | 🚦 GATE D18: mié 18-nov → **mié 25-nov** (todo el día) «· v6.06» · D1 lun 2-nov · siguiente gate mié 23-dic · updated 15:33:28Z | bk/sfgp….json |
| 29 | update_event (MOVE día completo + título + descr.) | `vvi7lk2c0c9nih1fqbi19p681s =` | 🚦 GATE D38: mié 16-dic → **mié 23-dic** · próximo NBME 28 = D42 (NBME 27 = D35 vie 18-dic; hoy Day-After 5/6) · updated 15:33:35Z | bk/vvi7….json |
| 30 | update_event (título + descr.) | `oi557k66kql15oa6ptkjdipvis =` | 🧯 C1 mar 29-dic (=): «hoy D46 normal» → «hoy **D41** normal» (DM 1 y 2) · regla v6.06 (F1 D1-D42, 16 desplazadas T3-T18, colchón 32 ≈ 84 h) · updated 15:33:43Z | bk/oi55….json |
| 31 | update_event (título + descr.) | `ag335n3dhvui11593us2lm448s =` | 🧯 C2 mié 30-dic (=): D47 → **D42** = NBME 28 · auditoría S09 sáb 2-ene · D1-D41 al cierre · T3-T18 · updated 15:33:51Z | bk/ag33….json |
| 32 | update_event (título + descr.) | `ti163p5s6t4odtqmhvkl3mamac =` | 🇵🇪 CHECKPOINT vie 18-dic (=): «mini-sim 40 · dia 40» → **«mini-sim 35 · dia 35»** (III-1 + III-9) · F1 1-42 (35 + 7) · intensiva 43-92 · PRE-TEST dia 47 · mini-sim 40 de v6.05 → carril sábado sáb 6-feb; el de v6.03 → carril B mié 10-mar (dia 90) · updated 15:33:58Z | bk/ti16….json |
| 33 | update_event master (descr.) | `22bh9m5jhc7ro6aj3m4ffjad7g =` | EKER: «objetivo primario del lun 26-oct» → «del lun 2-nov (⏸ v6.05: lun 26-oct · v6.03: mié 21-oct)» · Régimen v6.06 · pie · updated 15:35:47Z | bk/22bh….json |
| 34 | update_event master (descr.) | `6740kavnfkdcvj5k149ouliauu =` | GYM lunes: UWSA1 LUN 2-nov (D1) en ESTA serie · NBME 25-27 VIE 13-nov / 4-dic / 18-dic (serie GYM viernes) · Régimen v6.06 · pie · updated 15:35:59Z | bk/6740….json |
| 35 | update_event master (descr.) | `0dpes0ekv96a453e89m5osg06t =` | GYM martes: en 2026 ningún hito en martes (UWSA1 lun 2-nov; NBME 25-27 vie 13-nov / 4-dic / 18-dic) · Régimen · pie · updated 15:36:10Z | bk/0dpe….json |
| 36 | update_event master (descr.) | `4qvs34d84u82psvknpqhv3jc7a =` | GYM jueves: ningún hito en jueves (UWSA1 lun 2-nov → serie del lunes) · Régimen · pie · updated 15:36:17Z | bk/4qvs….json |
| 37 | update_event master (descr.) | `7sf8i7pe62pugfk4t6tcnbb9i4 =` | GYM viernes: 4 hitos en VIERNES (NBME 25-27 vie 13-nov / 4-dic / 18-dic + ensayo 7 bloques vie 8-oct-2027); UWSA1 lun 2-nov en LUNES · Régimen · pie · updated 15:36:41Z | bk/7sf8….json |
| 38 | update_event master (descr.) | `64lue1en3hk0cf8itml2rtlqi4 =` | BAILE lunes: «el UWSA1 (D1) es el LUN 2-nov-2026 = ESTA serie» · Régimen · pie · updated 15:36:50Z | bk/64lu….json |
| 39 | update_event master (descr.) | `09me7atu516gb0k6u0rbfcj8q1 =` | BAILE martes: ídem GYM martes · updated 15:37:01Z | bk/09me….json |
| 40 | update_event master (descr.) | `0tod56pc6pgecm5lf7g4e3ji9v =` | BAILE miércoles: gates mié 25-nov / mié 23-dic · UWSA1 lun 2-nov → serie BAILE lunes · NBME 28 = D42 · updated 15:37:10Z | bk/0tod….json |
| 41 | update_event master (descr.) | `3m8m4resu8akph4a7qfuf3h1qn =` | BAILE jueves: ídem GYM jueves · updated 15:37:33Z | bk/3m8m….json |
| 42 | update_event master (descr.) | `5pd4jhmvl31hvbuh40vphpoc4q =` | BAILE viernes: NBME 25-27 VIE 13-nov / 4-dic / 18-dic · mini-sims F1 vie 6-nov → 18-dic · updated 15:37:42Z | bk/5pd4….json |
| 43 | update_event master (descr.) | `3jkfb6097rtc1jbec19eg3sd57 =` | BAILE sábado: Régimen v6.06 + pie · updated 15:37:50Z | bk/3jkf….json |
| 44 | update_event master (descr.) | `7j6pucil43vuca70p082g5ub3d =` | BAILE domingo: víspera del D1 = DOM 1-NOV (⏸ v6.05 dom 25-oct) · Régimen v6.06 + pie (la excepción del dom 1-nov conserva su título del orquestador: actualización solo de descripción) · updated 15:37:59Z | bk/7j6p….json |
| 45 | update_event master (descr.) | `13m3tcqjjc34rt6iqfblla18q1 =` | BAILE PRÁCTICA: víspera DOM 1-NOV (⏸ v6.05 dom 25-oct) · Régimen v6.06 + pie (ídem) · updated 15:38:07Z | bk/13m3….json |
| 46 | update_event master (descr.) | `2u9je70pif58hgf2f8t3vgu8b8 =` | DESAYUNO sáb/dom: Régimen v6.06 + pie · updated 15:38:14Z | bk/2u9j….json |
| 47 | update_event master (descr.) | `5mrm4ru08go9k70408jm8vcjku =` | CORRER: Régimen v6.06 + pie · updated 15:38:19Z | bk/5mrm….json |
| 48 | update_event (título + descr.; fecha =) | `27bs58ee0ke180ht2rh6mgvft0 =` | PRE-TEST 2026-II vie 8-ene: dia 52 → **47** · 13 pendientes dias 75-90 + 5 del CARRIL SÁBADO se conservan · «· v6.06» · updated 15:43:33Z | bk/27bs….json |
| 49 | update_event (título + descr.; fecha =) | `g6t22lagnagt2sbrbo0n9d3u8k =` | SIM #1 vie 15-ene: dia 57 → **52** · updated 15:43:38Z | bk/g6t2….json |
| 50 | update_event (título + descr.; fecha =) | `tuqhgd12ibsc595kbemaqiu6k8 =` | SIM #2 vie 22-ene: 62 → **57** (fuente dia 57) · updated 15:43:43Z | bk/tuqh….json |
| 51 | update_event (título + descr.; fecha =) | `uvogu0gd7kufpshe2o3fffopf8 =` | SIM #3 vie 29-ene: 67 → **62** · updated 15:43:48Z | bk/uvog….json |
| 52 | update_event (título + descr.; fecha =) | `6shb9jps4nir60khcd6h4g0jh8 =` | SIM #4 vie 5-feb: 72 → **67** · updated 15:43:54Z | bk/6shb….json |
| 53 | update_event (título + descr.; fecha =) | `hl6ajs7etaqd6aici3s2vvema8 =` | SIM #5 vie 12-feb: 77 → **72** · updated 15:43:58Z | bk/hl6a….json |
| 54 | update_event (título + descr.; fecha =) | `7afho3rf6igkk1odse31sqps4c =` | SIM #6 vie 19-feb: 82 → **77** · updated 15:44:17Z | bk/7afh….json |
| 55 | update_event (título + descr.; fecha =) | `i3jhsk8hj6mj95aij99r6329mc =` | SIM #7 vie 26-feb: 87 → **82** · updated 15:44:22Z | bk/i3jh….json |
| 56 | update_event (título + descr.; fecha =) | `2l4c2ct9iv6dkqvpcf6chtjnu0 =` | SIM #8 vie 5-mar: 92 → **87** · updated 15:44:28Z | bk/2l4c….json |
| 57 | update_event (título + descr.; fecha =) | `ip4lhi4lhigad4l1titbd36jnk =` | DRESS jue 11-mar: 96 → **91** · updated 15:44:34Z | bk/ip4l….json |
| 58 | update_event (título + descr.; fecha =) | `tl0irrsb4av0vd8d1ar8vmbuoo =` | D-1 vie 12-mar: 97 → **92** · updated 15:44:40Z | bk/tl0i….json |
| 59 | update_event (título + descr.; fecha =) | `3vrptnmtl9vppvs6nvv25s7p3c =` | 🛡 vie 12-mar: dia 97 → **92** · updated 15:44:45Z | bk/3vrp….json |
| 60 | update_event (título + descr.; fecha =) | `8juk0mvl66tutdkbcei7umrs68 =` | 🏁 EXAMEN ENCAPS dom 14-mar: F1 dias **1-42** · intensiva **43-92** · PRE-TEST 47 · SIM 52…87 · DRESS 91 · D-1 92 · CARRIL SÁBADO · «· v6.06» · updated 15:44:54Z | bk/8juk….json |
| 61 | update_event (título + descr.; todo el día =) | `4mfnu95lrhr3dmu87einr3jm5k =` | Banner F2: «días 48-97» → «días 43-92» · SEÑALES dia 43 · PRE-TEST 47 · SIM 52…87 · DRESS 91 · D-1 92 · carril B 43-74 · 13 pendientes dias 75-90 · CARRIL SÁBADO (5) · secundarios v6.06 · backups v606 · historial v6.05 · updated 15:45:34Z | bk/4mfn….json |
| 62 | update_event master F2 (título + descr.) | `bod921vej8ehllto18h0ieiuig =` | 05:00 Anki F2: dias 43-92 · D42 = NBME 28 · «· F2 v6.06» · updated 15:45:41Z | bk/bod9….json |
| 63 | update_event master F2 (título + descr.) | `qqjhn7hnkugffrnvm5s9a0q46k =` | LOOP F2: dias 43-92 · secundarios v6.06 (SYNAPSE → mar 16-mar · AURUM → mar 11-may · LIVIANO → mié 10-mar · vibecoding → vie 19-mar) · updated 15:45:53Z | bk/qqjh….json |
| 64 | update_event master F2 (título + pie) | `uvpo4pgrtiqp3d9p07ail1fni8 =` | EVAL 20Q F2: «· F2 v6.06» + pie · updated 15:45:59Z | bk/uvpo….json |
| 65 | update_event master F2 (título + descr.) | `2fvbkunh0nfhvhbn1b6iqvpifs =` | STEP 1 VIVO: sistemas de F1 v6.06 (hasta la DM; Ca/PTH+MEN, Neuro, Heme/Onco y bioestadística → T3-T18) · updated 15:46:06Z | bk/2fvb….json |
| 66 | update_event master (descr.) | `d8252hjo5ra2qlqb9bccd6vkjo =` | Carril B lun 1 → mar 16-feb: dias 68-79 → **63-74** · viernes 5/12-feb dias 67/72 · Régimen v6.06 (nota: la descripción quedó con un salto de línea inicial, cosmético) · updated 15:46:46Z | bk/d825….json |
| 67 | update_event master (título + descr.) | `qcsv3oe0e7rh2vkfq301ne68ko =` | Carril B · reposición 17-feb → 10-mar: «· F2 v6.06» · 13 días = dias **75-90** (lista renumerada: 75, 76, 78, 79, 80, 81, 83, 84, 85, 86, 88, 89, 90; sim_n 78 / 84 / 90) · los 5 de v6.06 → CARRIL SÁBADO · regla del resto dia 43-74 · updated 15:47:06Z | bk/qcsv….json |
| 68 | update_event instancia (descr.) | `qcsv3oe0e7rh2vkfq301ne68ko_20270303T211500Z =` | REPOSICIÓN tras el master: «⚠ v6.06 · HOY mié 3-mar (dia 85) I-3 …» + texto nuevo de la serie · updated 15:47:36Z | bk/qcsv…_20270303….json |
| 69 | update_event instancia (descr.) | `qcsv3oe0e7rh2vkfq301ne68ko_20270304T211500Z =` | ídem jue 4-mar (dia 86) V-2 · updated 15:47:57Z | bk/qcsv…_20270304….json |
| 70 | update_event instancia (descr.) | `qcsv3oe0e7rh2vkfq301ne68ko_20270308T211500Z =` | ídem lun 8-mar (dia 88) II-4 · updated 15:48:27Z | bk/qcsv…_20270308….json |
| 71 | update_event instancia (descr.) | `qcsv3oe0e7rh2vkfq301ne68ko_20270309T211500Z =` | ídem mar 9-mar (dia 89) II-1 · updated 15:48:48Z | bk/qcsv…_20270309….json |
| 72 | update_event instancia (título + descr.) | `qcsv3oe0e7rh2vkfq301ne68ko_20270310T211500Z =` | mié 10-mar (dia 90) MINI-SIM 25Q I-1 + II-2 (D90:b_msim, sim_n 90 / origen 43) · título «… · v6.06» (el título del master lo había pisado) · updated 15:49:11Z | bk/qcsv…_20270310….json |
| 73 | update_event overlay (título + descr.) | `mgv06ho1cphr78rsqf9nrkgd7o =` | lun 22-feb: dia 83 → **78** (D78:b_msim, sim_n 78) · lista de 13 pendientes dias 75-90 + mención del carril sábado · updated 15:49:37Z | bk/mgv0….json |
| 74 | update_event overlay (título + descr.) | `ddfms7b6q2e3lhvvqqvr6el474 =` | mar 2-mar: dia 89 → **84** (D84:b_msim, sim_n 84) · checkpoint F1 v6.06 = mini-sim 35 · updated 15:49:48Z | bk/ddfm….json |
| 75 | create_event | `— → lopnequ2muif9hcht769jdu230` | 🇵🇪 ENCAPS · CARRIL SÁBADO 09:30-10:30 · reposición F1 (v6.06) · BANCO III-5 + I-10 — sáb 9-ene-2027 09:30-10:30 · color 1 (serie ENCAPS) · recordatorios por defecto · descripción = guiaEncapsSabadoDe('2027-01-09') (mant. 44 de la F1 v6.05, host vie 8-ene dia 47) | payloads/sab_2027-01-09.json |
| 76 | create_event | `— → 5o45dle24ctttitbu4tppet9vs` | ídem sáb 16-ene · BANCO II-5 + V-6 (mant. 45, host vie 15-ene dia 52) | payloads/sab_2027-01-16.json |
| 77 | create_event | `— → au8l6v0m0lrbl23i650q5bkhpo` | ídem sáb 23-ene · BANCO I-4 + II-6 (mant. 46, host vie 22-ene dia 57) | payloads/sab_2027-01-23.json |
| 78 | create_event | `— → n4o53ojugb2t4ksvqmkvssvv8s` | ídem sáb 30-ene · BANCO IV-1 + II-10 (mant. 47, host vie 29-ene dia 62) | payloads/sab_2027-01-30.json |
| 79 | create_event | `— → vhmvg2j5527jjvk988ldf4k9bk` | ídem sáb 6-feb · MINI-SIM 25Q II-9 + II-7 (mant. 40 = checkpoint v6.05, host vie 5-feb dia 67, sim_n 1067) | payloads/sab_2027-02-06.json |
| 80 | update_event (título + descr.; fecha =) | `ae93qv0nqqs36h439hid1jcq8o =` | 🎯 NBME 29 mié 17-mar-2027: «· v6.05» → «· v6.06» · T3-T18 jue 18-mar → lun 12-abr (Endocrino D42 + Neuro entera + Heme/Onco + bioestadística) · cola F1 T4-T5 + T19-T23 · Day-After 17 → 23-mar · colchón 32 ≈ 84 h · updated 15:53:14Z | bk/ae93… (= payload v6.05 c1r2; updated 25-oct 05:49:09Z comprobado en volcado) |
| 81 | update_event (título + descr.; fecha =) | `3i88pp1gj84vc0r6tuherhsc0o =` | 🚦 GO/NO-GO lun 6-sep-2027: «· v6.05» → «· v6.06» · NBME 28 = d42 (⏸ v6.05 d47) · updated 15:53:22Z | bk/3i88… (= payload v6.05 c1r2) |
| 82 | update_event (descr.; fecha =) | `oinh139dsnbuma9r3kfu56dhkc =` | 🎯 EXAMEN lun 25-oct-2027: colchón «42 filas ≈ 110 h» → «32 filas ≈ 84 h (⏸ v6.05: 42 ≈ 110 h)» · plazo «Centro Prometric a verificar antes del vie 30-oct-2026» → vie 6-nov-2026 (corrido con las fechas límite) · pie · título «· v6.04» intacto · updated 15:53:34Z | bk/oinh… (= payload v6.05 c1r2) |
| 83 | update_event (título + descr.; fecha =) | `c0g48p72o4441tgcecmlg8s8lo =` | 🚌 REGRESO mar 26-oct-2027: «· v6.05» → «· v6.06» · 9 repuestas MIR d195-d203 mar 26-oct → vie 5-nov-2027 (handoff d203 vie 5-nov; asignaturas de mirMantenimiento.ts) · ⏸ v6.05: 4, 26-29 oct · updated 15:54:15Z | bk/c0g4….json (get_event previo) |
| 84 | update_event instancia (hora + título + descr.) | `43dq3oib16esjcqj1dcd8osot2_20261026T170000Z =` | lun 26-oct (UWSA1 v6.05): 13:00-13:30 → 12:00-12:30 (vuelve a la serie) · título «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · ALUMUERZO» · descripción = la de la serie v6.06 (sin el «HOY lun 26» de la v6.05) · updated 15:55:52Z | volcado pas_p2.json |
| 85 | update_event instancia (título) | `papebi46etlo8glgfs5akd5mig_20261026T211500Z =` | lun 26-oct: «🇵🇪 ENCAPS — D1 · … · v6.05» → «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · 🇵🇪 ENCAPS — 1h Banqueo Mantenimiento (…)» · updated 15:55:58Z | volcado pas_p2.json |
| 86 | update_event instancia (título) | `papebi46etlo8glgfs5akd5mig_20261027T211500Z =` | mar 27-oct: ídem (antes «dia 2 · eval II-3 + PRE-TEST 2/2 · v6.05») · updated 15:56:00Z | volcado pas_p2.json |
| 87 | update_event instancia (título) | `papebi46etlo8glgfs5akd5mig_20261030T211500Z =` | vie 30-oct: ídem (antes «dia 5 · MINI-SIM 25Q · v6.05») · updated 15:56:02Z | volcado pas_p2.json |

Total C1: **87 escrituras** = 82 `update_event` + 5 `create_event` (0 `delete_event`; ninguna serie recreada: ningún UNTIL/EXDATE cambia en este ámbito), todas con `notificationLevel: NONE`. Las escrituras del orquestador (sáb 31 / dom 1 / lun 2) no se repitieron.

#### Verificación
- **Semana 31-oct → 8-nov** — `list_events` DESPUÉS (`volcados/sem_31oct-8nov_despues.json`, 195 eventos) + `scratchpad/v606/c1/ver.js`: **81 comprobaciones OK, 0 FAIL** (cada instancia de las 24 series tocadas = payload). ALMUERZO lun 2 13:00-13:30 con texto «🎯 HOY (lun 2-nov, UWSA1 …)»; vie 6-nov 12:00-12:30. ENCAPS lun 2 «D1 · eval + PRE-TEST 1/2 (II-3 · I-3 · V-2 · III-5)» · mar 3 «dia 2 · eval II-3 + PRE-TEST 2/2» · mié 4 / jue 5 título de serie · vie 6 «dia 5 · MINI-SIM 25Q (II-2 + I-10)». Excepciones del orquestador intactas: ANKI sáb 31 y dom 1, BAILE y PRÁCTICA dom 1 (víspera), UWSA1 lun 2 08:50-13:00, SYNAPSE lun 2 07:25.
- **F1 9-nov → 31-dic** — `list_events` DESPUÉS en 5 páginas (`volcados/f1d_p1..p5.json`, unión `f1_despues_9nov-31dic.json`, 1.250 eventos): **541 comprobaciones OK, 0 FAIL** (descripción y título = payload en todas las instancias de las series tocadas y en los hitos). Fechas/horas: NBME 25 vie 13-nov 07:00-12:30 · NBME 26 vie 4-dic 07:00-12:30 · NBME 27 vie 18-dic 07:00-12:30 · NBME 28 mié 30-dic 07:00-12:30 · gates (todo el día) mié 25-nov y mié 23-dic · C1 29-dic / C2 30-dic / CHECKPOINT 18-dic (todo el día) · ALMUERZO 12:30-13:00 los vie 13-nov, 4-dic, 18-dic y el mié 30-dic (el resto 12:00-12:30; vie 27-nov vuelto a 12:00) · ninguna instancia de ENCAPS 16:15 con título propio en ese tramo.
- **2027 (F2 + hitos)** — volcado ANTES con fullText «ENCAPS» (`volcados/f2_p1..p5.json`, unión `f2_all_antes.json`): las series F2 (`bod9`, `qqjh`, `uvpo`, `2fvb`, `d825`) no tenían excepciones (descripción modal = todas sus instancias); `qcsv` tenía 5 (3, 4, 8, 9, 10-mar) → repuestas tras el master. Comprobación DESPUÉS = la respuesta de cada `update_event` / `create_event` (descripción, título, fecha y hora devueltos = payload). Los 5 eventos del CARRIL SÁBADO quedaron sáb 9, 16, 23, 30-ene y 6-feb-2027 09:30-10:30 (Lima), color 1, recordatorios por defecto.
- Barrido de restos v6.05 (`res2.js`: «26-oct», «D47», «1-47», «48-97», «80-95», «T3-T13», «T4-T6», «42 filas», «110 h», «1.520», «3.350», «18-nov», «16-dic», «S01»… fuera de los paréntesis ⏸ e Historial): 0 restos en los payloads C1. Fuera de C1, en el volcado ANTES siguen fechas v6.05 en series de C2 (vibecoding, SYNAPSE, Business, LIVIANO, AURUM, MIR ×2, Research↔Derma, REVISIÓN, PC sáb/dom, overlay CR-1) y en 1 evento personal de finanzas (no se toca, regla 6).

#### Ids vigentes (sin cambios de id salvo los 5 nuevos)
USMLE `9274q14djfvggeajhor64oshj8` · `76dnlc30p3hnccenpvub2d9acg` · `c24k2n7k8qlhfimrrncf8rapgk` · `iuhj8busrh63ms7v4j5q8e9920` · `q72kvc9pm1brlqvl6383ccr9vs` · `c5e77csne1bnfps1iq7nqel84s` · UWSA1 `o1gla7846uae4tgngvc4q45osg` · ENCAPS 16:15 `papebi46etlo8glgfs5akd5mig` · ALMUERZO `43dq3oib16esjcqj1dcd8osot2` · ANKI sáb `r9eglu07f5lvltvpoue3v4ks6o` / dom `5s64scagno3jo983gg6rfdo5qg` · NBME 25-28 `4hjv5lkvluj06ahc2qndtsi6as` / `lr7ktrbiffj4hrlke7lh7cv6h4` / `sm4baa2v453ifaub325h9v08mg` / `ecu784689p8osrhqabuct8d5jg` · gates `sfgp85kjua01v159rh1qrilr18` / `vvi7lk2c0c9nih1fqbi19p681s` · C1/C2 `oi557k66kql15oa6ptkjdipvis` / `ag335n3dhvui11593us2lm448s` · CHECKPOINT `ti163p5s6t4odtqmhvkl3mamac` · F2: banner `4mfnu95lrhr3dmu87einr3jm5k` · PRE-TEST `27bs58ee0ke180ht2rh6mgvft0` · SIM #1-#8 `g6t22lagnagt2sbrbo0n9d3u8k` `tuqhgd12ibsc595kbemaqiu6k8` `uvogu0gd7kufpshe2o3fffopf8` `6shb9jps4nir60khcd6h4g0jh8` `hl6ajs7etaqd6aici3s2vvema8` `7afho3rf6igkk1odse31sqps4c` `i3jhsk8hj6mj95aij99r6329mc` `2l4c2ct9iv6dkqvpcf6chtjnu0` · DRESS `ip4lhi4lhigad4l1titbd36jnk` · D-1 `tl0irrsb4av0vd8d1ar8vmbuoo` · 🛡 `3vrptnmtl9vppvs6nvv25s7p3c` · EXAMEN ENCAPS `8juk0mvl66tutdkbcei7umrs68` · series F2 `bod921vej8ehllto18h0ieiuig` `qqjhn7hnkugffrnvm5s9a0q46k` `uvpo4pgrtiqp3d9p07ail1fni8` `2fvbkunh0nfhvhbn1b6iqvpifs` · carril B `d8252hjo5ra2qlqb9bccd6vkjo` / `qcsv3oe0e7rh2vkfq301ne68ko` · overlays `mgv06ho1cphr78rsqf9nrkgd7o` / `ddfms7b6q2e3lhvvqqvr6el474` · **CARRIL SÁBADO (NUEVOS v6.06)**: sáb 9-ene `lopnequ2muif9hcht769jdu230` · sáb 16-ene `5o45dle24ctttitbu4tppet9vs` · sáb 23-ene `au8l6v0m0lrbl23i650q5bkhpo` · sáb 30-ene `n4o53ojugb2t4ksvqmkvssvv8s` · sáb 6-feb `vhmvg2j5527jjvk988ldf4k9bk` · NBME 29 `ae93qv0nqqs36h439hid1jcq8o` · GO/NO-GO `3i88pp1gj84vc0r6tuherhsc0o` · EXAMEN Step 1 `oinh139dsnbuma9r3kfu56dhkc` · REGRESO `c0g48p72o4441tgcecmlg8s8lo` · EKER `22bh9m5jhc7ro6aj3m4ffjad7g` · GYM `6740kavnfkdcvj5k149ouliauu` `0dpes0ekv96a453e89m5osg06t` `4qvs34d84u82psvknpqhv3jc7a` `7sf8i7pe62pugfk4t6tcnbb9i4` · BAILE `64lue1en3hk0cf8itml2rtlqi4` `09me7atu516gb0k6u0rbfcj8q1` `0tod56pc6pgecm5lf7g4e3ji9v` `3m8m4resu8akph4a7qfuf3h1qn` `5pd4jhmvl31hvbuh40vphpoc4q` `3jkfb6097rtc1jbec19eg3sd57` `7j6pucil43vuca70p082g5ub3d` · PRÁCTICA `13m3tcqjjc34rt6iqfblla18q1` · DESAYUNO finde `2u9je70pif58hgf2f8t3vgu8b8` · CORRER `5mrm4ru08go9k70408jm8vcjku`.

#### Pendientes / avisos para el orquestador
1. **Días pasados (prioridad baja, parcial):** las instancias 26-30-oct de las 6 series USMLE y las 21-23-oct de las 5 series USMLE distintas de la Eval muestran el título de la serie «· v6.06» (el cambio de título del master las alcanza); faltaría «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · …» en ≈45 instancias (cada `update_event` devuelve ~5 KB → caro). HECHO: Eval 18:00 19-23-oct (reposición de sus excepciones), ENCAPS 26/27/30-oct, ALMUERZO lun 26-oct. Quedan con ⏭ de rondas previas: ENCAPS 19-20 (v6.03) y 21-23 (v6.05), ALMUERZO jue 22 (v6.05); ALMUERZO 21/23 y 27-30-oct con título de serie.
2. `d8252hjo5ra2qlqb9bccd6vkjo` (carril B 1 → 16-feb): la descripción quedó con un salto de línea inicial (cosmético; el resto = payload). 1 `update_event` lo corrige si se quiere.
3. Excepciones anteriores al 19-oct (historial 31-ago → 18-oct) de las series cuyo master cambió: el MCP propaga a todas las instancias; no se auditaron (no se ven en la app).
4. EXAMEN Step 1 (`oinh…`): el plazo «Centro Prometric a verificar antes del vie 30-oct-2026», ya vencido, se corrió a **vie 6-nov-2026** (orden «corre también las fechas límite»); el título sigue «· v6.04» (la v6.05 tampoco lo cambió).
5. Los 5 eventos del CARRIL SÁBADO son sueltos (sin serie ni EXDATE), color 1 = serie ENCAPS 16:15, recordatorios del calendario (popup 30′). Si la intensiva se regenera con `--pretest` o `--desde`, revisar que los códigos del sábado no cambien (`encapsGuia.sabadoEncapsCuadra`).
6. CAL_V6.md (§19) lo escribe el orquestador con este registro; respaldos, payloads y volcados en `DATA/_v600/cal/cal_bk/v606/c1/` (gitignored; `oplog.txt` = log crudo), scripts en `scratchpad/v606/c1/` (`lib606.js`, `b_usmle.js`, `b_encaps.js`, `b_alm.js`, `b_anki.js`, `b_hitos.js`, `b_rut.js`, `b_f2.js`, `b_sab.js`, `b_2027.js`, `ver.js`, `res2.js`, `mkreg.js`).

### 19.2 C2 — secundarios + revisión + Research
Orden de Joseph (sáb 31-oct): «Reestructura todo a partir del 2 de noviembre … corre nada más, corre también las fechas límite, corre con una semana … para no perder materias, tan solamente corre.» D1 de TODO = lun 2-nov-2026.
Fuente de fechas: `src/lib/*.ts` del commit `2e3a35d` (sondas `scratchpad/v606/c2/facts*.js` con `scratchpad/load_ts.js`).

#### Protocolo
- Respaldos en `DATA/_v600/cal/cal_bk/v606/c2/` (gitignored): `volcados/le_*.json` (list_events fullText por serie, 31-oct ~10:15 Lima, copiados de tool-results), `store_antes.json` (unión), `bk/<id>.json` (meta get_event + descripción dominante + excepciones), `bk/<k>.desc.txt`, `scripts/` (grab.js, bk.js, build.js, ver.js), `payloads/`.
- `notificationLevel: NONE` en todo. Masters primero → excepciones repuestas después.
- Recrear = create (mismo DTSTART/hora/color/recordatorios + EXDATE SKIP/protegidos + UNTIL nuevo) → comprobar → delete del viejo.
- Textos por script con reemplazos «exactamente 1 coincidencia»; lo previo como «⏸ v6.05»; pie «(v6.06 · 31-oct-2026: D1 = lun 2-nov)».

#### Excepciones encontradas antes (volcados)
- SYNAPSE tfihh…: lun 26-oct 07:25 · lun 2-nov 07:25 (orquestador) · vie 6-nov / 27-nov / 18-dic / mié 30-dic 13:00 (v6.05; 2027 fuera del volcado)
- BUSINESS 5gbio…: vie 6-nov → sáb 7-nov, 27-nov → sáb 28-nov, 18-dic → sáb 19-dic 07:45 (v6.05) · mié 30-dic 12:30
- PC sáb jhsg…: sáb 31-oct ⏭ v6.06 (orquestador) · PC dom m8kf…: dom 25-oct ⏭ v6.05 · dom 1-nov ⏭ v6.06 (orquestador)
- AURUM F1 23t06…: lun 19 → vie 23-oct ⏭ v6.05 · R↔D 6us7k…: lun 19 → vie 23-oct ⏭ v6.05 · REVISIÓN k8ia…: sáb 24-oct ⏭ v6.05 · sáb 31-oct ⏭ v6.06 (orquestador)
- vibecoding, LIVIANO, MIR ×2: sin excepciones.

#### Operaciones (incremental)
| # | hora (Lima) | op | id antes → después | qué | respaldo |
|---|---|---|---|---|---|
| 1 | 10:25 | CREATE | vibecoding → **`b2qgtck9gai5cilr8qvbkd51t8`** | mismo DTSTART lun 31-ago-2026 04:15-05:00, color 9, recordatorios por defecto · EXDATE 25-dic, 31-dic, 1-ene, vie 12-mar, lun 15-mar · UNTIL vie 19-mar-2027 · título «· v6.06» · descripción `payloads/vibe.txt` | `bk/llhrjvjqmmv06ft0vt94qdn3rk.json` |
| 2 | 10:25 | CREATE | SYNAPSE 12:30 → **`n8641e63c3msrkbaq3mqdtbmj0`** | mismo DTSTART jue 11-jun-2026 12:30-13:00, color 9 · EXDATE 25-dic, 31-dic, 1-ene, vie 12-mar, lun 15-mar · UNTIL mar 16-mar-2027 · `payloads/syn.txt` | `bk/tfihh2hsim6mll6h5nsjur1ti8.json` (+ 6 excepciones) |
| 3-4 | 10:26 | DELETE | `llhrjvjqmmv06ft0vt94qdn3rk` (vibe v6.05) · `tfihh2hsim6mll6h5nsjur1ti8` (SYNAPSE v6.05, con sus excepciones lun 26-oct/lun 2-nov 07:25 y 13:00 de NBME v6.05) | tras comprobar la recurrencia de las nuevas en el resultado de create | idem |
| 5 | 10:25 | CREATE | LIVIANO 17:15 → **`bajf6riq56ns5u57b5lqqtb268`** | mismo DTSTART lun 31-ago-2026 17:15-18:00, color 7 · EXDATE 25-dic, 31-dic, 1-ene · UNTIL mié 10-mar-2027 · `payloads/liv.txt` | `bk/u7dljk7hf8r81nmofgojhtdilc.json` |
| 6 | 10:26 | CREATE | BUSINESS 13:00 → **`0h8emvdchmvh4sfddqqed3th8s`** | mismo DTSTART jue 2-abr-2026 13:00-13:25, color 8, WKST=SU · EXDATE 25-dic, 31-dic, 1-ene · UNTIL mar 2-mar-2027 · `payloads/biz.txt` | `bk/5gbioj75d3bsgoio1fatrji0ns.json` (+ 4 excepciones v6.05) |
| 7-8 | 10:27 | DELETE | `u7dljk7hf8r81nmofgojhtdilc` (LIVIANO v6.05) · `5gbioj75d3bsgoio1fatrji0ns` (BUSINESS v6.05, con sus movidas sáb 7-nov/28-nov/19-dic y mié 30-dic 12:30) | | idem |
| 9 | 10:26 | CREATE | PC sábado → **`nsdnhm11ceicjmqvqc3qenin00`** | mismo DTSTART sáb 13-jun-2026 15:00-17:00, color 9 · UNTIL sáb 6-mar-2027 · `payloads/pcs.txt` | `bk/jhsg92lo784vlr8tc5bnsag8uk.json` (+ excepción sáb 31-oct) |
| 10 | 10:26 | CREATE | PC domingo → **`fvbccognpru6jh6u4g8qhnud7g`** | mismo DTSTART dom 28-jun-2026 15:00-17:00, color 9 · UNTIL dom 7-mar-2027 · `payloads/pcd.txt` | `bk/m8kfvq6440c6al6cq47oclnoj8.json` (+ excepciones dom 25-oct, dom 1-nov) |
| 11-12 | 10:27 | DELETE | `jhsg92lo784vlr8tc5bnsag8uk` · `m8kfvq6440c6al6cq47oclnoj8` | | idem |
| 13-20 | 10:27 | UPDATE (instancias, solo hora) | `n8641e63c3msrkbaq3mqdtbmj0_20261102T173000Z` → **07:25-07:55** (lun 2-nov, UWSA1; repone la del orquestador) · `_20261113T173000Z` · `_20261204T173000Z` · `_20261218T173000Z` · `_20261230T173000Z` · `_20270226T173000Z` · `_20270305T173000Z` · `_20270311T173000Z` → **13:00-13:30** (NBME 25/26/27 vie 13-nov / 4-dic / 18-dic, NBME 28 mié 30-dic, SIM 100Q vie 26-feb / vie 5-mar, D-2 ENCAPS jue 11-mar) = `rutinaGuia.synFranjaDe` | título y descripción de la serie | instancias nuevas (sin estado previo) |
| 21-24 | 10:27 | UPDATE (instancias, MOVIDAS + título) | `0h8emvdchmvh4sfddqqed3th8s_20261113T180000Z` → **sáb 14-nov 07:45-08:25** «📚 BUSINESS — OUTPUT S2 entero + tracker semanal (40′) · del vie 13-nov (día del NBME 25)» · `_20261204T180000Z` → **sáb 5-dic 07:45-08:25** «… OUTPUT S5 … del vie 4-dic (día del NBME 26)» · `_20261218T180000Z` → **sáb 19-dic 07:45-08:25** «… OUTPUT S7 … del vie 18-dic (día del NBME 27)» · `_20270226T180000Z` → **sáb 27-feb 09:15-09:55** «… OUTPUT S15 … del vie 26-feb (día del SIM 100Q ENCAPS 11:00)» = `bizFranjaDe` (viernes null → sábado OUTPUT entero) | descripción de la serie | idem |
| 25 | 10:27 | UPDATE (instancia, solo hora) | `0h8emvdchmvh4sfddqqed3th8s_20261230T180000Z` → **12:30-12:55** (NBME 28) | | idem |
| 26 | 10:28 | UPDATE (instancia, título) | `nsdnhm11ceicjmqvqc3qenin00_20261031T200000Z` | REPUESTA «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov · SHIP S1 = sáb 7-nov) · 🧠 SYNAPSE — PC sábado (2h)» (la del orquestador en la serie vieja) | `bk/jhsg…json` excepciones |
| 27-28 | 10:28 | UPDATE (instancias, título) | `fvbccognpru6jh6u4g8qhnud7g_20261101T200000Z` «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · 🧠 SYNAPSE — repaso + PC domingo (2h)» · `_20261025T200000Z` «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · …» | REPUESTAS las 2 excepciones de la serie vieja | `bk/m8kf…json` excepciones |
| 29 | 10:28 | UPDATE (MASTER, título + descr.) | `23t06e7foitmiqm24lpd0vo9jc` (=) | 🪙 AURUM F1 «· v6.05 F1» → «· v6.06 F1» · D1 lun 2-nov → D130 mar 11-may · F1 = D1-D42 → mié 30-dic · pitches v1 vie 20-nov … v7 mar 11-may · gates mié 25-nov / mié 23-dic (RRULE/EXDATE/recordatorio intactos) | `bk/23t06e7foitmiqm24lpd0vo9jc.json` · `payloads/aur.txt` |
| 30 | 10:28 | UPDATE (MASTER, título + descr.) | `r0n85cd06arqkikrbfra4luonc` (=) | 🪙 AURUM 30′ «· v6.05 F2-F3» → «· v6.06 F2-F3» · D43-D123 (lun 4-ene → vie 30-abr, 81 sesiones; rango y EXDATE intactos) · D124-D130 lun 3 → mar 11-may en tiempo muerto del SERUMS · pitches v3-v7 v6.06 | `bk/r0n85cd06arqkikrbfra4luonc.json` · `payloads/aur30.txt` |
| 31 | 10:29 | UPDATE (MASTER, título + descr.) | `uiduvkfsgs43p1u1qk1vohih58` (=) | 🇪🇸 MIR 15:15 «· v6.05» → «· v6.06» · diario lun 2-nov → lun 22-feb (D5 Cardio vie 6-nov · D77 vie 19-feb · D78 lun 22-feb) · mant. 59 d mar 23-feb → mar 18-may (12 Tier C) · ext. 144 filas mié 19-may → vie 5-nov-2027 (135 hasta el tope vie 22-oct + 9 repuestas mar 26-oct → vie 5-nov) = 203 · UNTIL vie 30-abr y EXDATE intactos | `bk/uiduvkfsgs43p1u1qk1vohih58.json` · `payloads/mir1.txt` |
| 32 | 10:29 | UPDATE (MASTER, título + descr.) | `hos0tfhsr2hdfs6cgv1rmejhrs` (=) | 🇪🇸 MIR 15:30 «· v6.05» → «· v6.06» · D77 vie 19-feb / D78 lun 22-feb · mant. desde mar 23-feb (Tier C jueves; excepciones mié 24-mar · mar 18-may) · ext. desde mié 19-may · «310 cards al 22-feb» · RRULE/EXDATE intactos | `bk/hos0tfhsr2hdfs6cgv1rmejhrs.json` · `payloads/mir2.txt` |
| 33 | 10:30 | UPDATE (MASTER, título + descr.) | `6us7kkdcuk3g7tm1cjes38leh0` (=) | 🔬↔💎 R↔D 13:30 «· v6.05» → «· v6.06» · mapa lun 2-nov DERMA d1 · mar 3 RESEARCH M1 · mié 4 d2 · jue 5 R0 · vie 6 d3 · lun 9 R1 … vie 13 M2 (NBME 25) · Research c1 mar 3-nov → vie 2-abr (pausa vie 15-ene → mié 10-feb), c2 mar 6-abr → sáb 11-sep · Derma c1 lun 2-nov → mié 26-may, c2 vie 28-may → mié 4-ago · hitos 🔬 v6.06 · gates mié 25-nov / mié 23-dic · UNTIL/EXDATE intactos | `bk/6us7kkdcuk3g7tm1cjes38leh0.json` · `payloads/rd.txt` |
| 34 | 10:30 | UPDATE (MASTER, título + descr.) | `k8iaefnjq0mnrlvkilhcarrik8` (=) | 📋 REVISIÓN «· v6.05» → «· v6.06» · S01 sáb 7-nov (S1/41, cubre lun 2 → vie 6-nov) · S06 sáb 12-dic y S09 sáb 2-ene DELOAD (+ auditoría NBME 28 = D42) · gates mié 25-nov / mié 23-dic · NBME 25/26/27 vie 13-nov / 4-dic / 18-dic · F2 S10_2027-01-09 … S18_2027-03-06 · F3 S20 = S10/41 … S26 = S16/41 (nombres de `gen_revision_semanal.js --dry-run`) · RRULE/EXDATE intactos | `bk/k8iaefnjq0mnrlvkilhcarrik8.json` · `payloads/rev.txt` |
| 35-36 | 10:31 | UPDATE (instancias, solo título) | `k8iaefnjq0mnrlvkilhcarrik8_20261031T121500Z` «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov · la S01 es el sáb 7-nov) · 📋 REVISIÓN SEMANAL» · `_20261024T121500Z` «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26 · la S01 es el sáb 31-oct) · 📋 REVISIÓN SEMANAL» | REPUESTAS tras la propagación del master (descripción = la de la serie v6.06) | `bk/k8ia…json` excepciones |
| 37-48 | 10:31 → 10:33 | UPDATE ×12 (overlays 🔬, payload exacto de `gen_research_calendar.js --print`; mismos ids; 13:30-14:15 color 6 FREE; R43 todo el día) | M1 `shkul14j3o1bs1a5044u8ge1kk` · C-2 `iduh7fhst9uhl0t54hhk535ff4` · T-1 `95aglmlk9qi32m4bv6v28rv5b0` · C-6 `k2oov1tk0jalt5f45ekemej4k0` · CR-1 `36tp7b995jnoi844d5uvgm58t0` · T-8 `ahl0tbimefcq8u7ps2qasjb708` · CR-8 `f2mn20ok30kl5k2t1s6tci7n7c` · CR-9 `t136recadd6vnv0iebrmmqiv48` · X-1 `9hhe6q10da1ltbpk23h171gf9c` · X-9 `nibrfidt3qhct59qhtrvqpqqi0` · R10 `2k9idr3f3th6hj1e4r8ugj4iqk` · R43 `94mmg6li8egq2kh9401nti1pkg` | M1 vie 30-oct → **mar 3-nov** · C-2 lun 9 → **mar 17-nov** · T-1 mié 11 → **jue 19-nov** · C-6 mié 25-nov → **jue 3-dic** · CR-1 vie 27-nov → **lun 7-dic** · T-8 mar 29-dic → **vie 8-ene** · CR-8 mar 12-ene → **mié 17-feb** · CR-9 jue 11 → **vie 19-feb** · X-1 jue 25-feb → **vie 5-mar** · X-9 vie 2 → **lun 12-abr** · R10 jue 8 → **vie 16-abr** · R43 sáb 31-jul → **sáb 7-ago** (todo el día) | estado previo = payload v6.05 exacto `bk/overlays_prev_v605_payload.json` (= `cal_bk/v605/c2r2/payloads/research_print.json`) · payloads `payloads/research_print.json` |
| 49 | 10:33 | SCRIPT `gen_research_calendar.js` (sin flags: «recrear 12») → `--set` ×12 → `--check` | `DATA/RESEARCH/_calendar_overlays.json` | `--check` antes: 12 «recrear» → después: **exit 0, 12/12 «nada»** · md5 HEAD 7450acdd… → 55d60124… | `bk/_calendar_overlays.HEAD.json` |
| 50-59 | 10:34 → 10:35 | UPDATE (instancias pasadas, solo título) | `23t06e7foitmiqm24lpd0vo9jc_202610{19..23}T191500Z` · `6us7kkdcuk3g7tm1cjes38leh0_202610{19..23}T183000Z` (=) | REPUESTOS los ⏭ v6.05 de lun 19 → vie 23-oct que pisó la propagación de los masters: «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · 🪙 AURUM — … · v6.05 F1» / «… · 🔬 RESEARCH ↔ 💎 DERMA … · v6.05» (descripción = la de la serie v6.06) | `bk/23t06…json` / `bk/6us7k…json` excepciones |

#### Verificación (list_events después de los cambios; volcados en `cal_bk/v606/c2/volcados/*_after.json`, script `scripts/ver.js` = pie v6.06 + título sin «· v6.05» + ninguna serie vieja + cruce con la app: `plantillaDelDia` + `bizFranjaDe` + `guiaRevisionDe` + `guiaShipDe` / `guiaFeynmanDe`)
| Ventana | Resultado |
|---|---|
| sáb 31-oct → dom 8-nov (`l_31oct-8nov_after.json`, 195 eventos) | ✅ FALLOS 0 · SERIES_VIEJAS 0 · 47 eventos C2 con pie v6.06 · sáb 31-oct REVISIÓN y PC sáb ⏭ v6.06 · dom 1-nov PC dom ⏭ v6.06 · lun 2-nov vibe 04:15 · **SYNAPSE 07:25-07:55** · Business 13:00 · R↔D 13:30 · AURUM 14:15 · MIR 15:15/15:30 · LIVIANO 17:15 · mar 3-nov overlay 🔬 **M1 13:30** · sáb 7-nov REVISIÓN «· v6.06» 07:15 + PC sáb 15:00 · dom 8-nov PC dom 15:00 · cruce app: 2-6 nov todo OK |
| vie 13 / sáb 14-nov (NBME 25) | ✅ vie 13: SYNAPSE **13:00-13:30**, sin Business · sáb 14: REVISIÓN 07:15 + **Business OUTPUT S2 07:45-08:25** + PC 15:00 |
| mié 30-dic (NBME 28) | ✅ Business **12:30-12:55** · SYNAPSE **13:00-13:30** · resto a su hora · jue 31-dic sin eventos C2 (EXDATE) |
| vie 26 / sáb 27-feb (SIM 100Q #7) | ✅ vie 26: SYNAPSE **13:00-13:30**, sin Business, AURUM 30′ 14:15-14:45 · sáb 27: REVISIÓN 07:15 + **Business OUTPUT S15 09:15-09:55** + PC sáb 15:00 |
| Rangos/EXDATE de las series nuevas | ✅ confirmados en la respuesta de cada create (RRULE/EXDATE) y en la respuesta de cada update de instancia (hora nueva + originalStartTime) |
| Research | ✅ `gen_research_calendar.js --check` → **exit 0** · 12/12 «nada» |
| «Faltantes» del cruce | solo los esperados: el bloque `vibecoding 15:00` de sáb/dom de la plantilla lo cubren las series PC sáb/dom (otro id) y el **cierre Business 15′ de los sábados normales (07:45-08:00)**, que nunca tuvo evento (pendiente heredado de v6.05) |

#### Ids vigentes (C2, v6.06)
| Serie / evento | Id | Rango |
|---|---|---|
| 🧠 VIBECODING 04:15 · v6.06 | **`b2qgtck9gai5cilr8qvbkd51t8`** (nuevo; sustituye a `llhrjvjqmmv06ft0vt94qdn3rk`) | DTSTART lun 31-ago-2026 → UNTIL vie 19-mar-2027 · EXDATE 25-dic, 31-dic, 1-ene, 12-mar, 15-mar |
| 🧠 SYNAPSE 12:30 · v6.06 | **`n8641e63c3msrkbaq3mqdtbmj0`** (nuevo; sustituye a `tfihh2hsim6mll6h5nsjur1ti8`) | → mar 16-mar · mismos EXDATE · excepciones lun 2-nov 07:25 · vie 13-nov / 4-dic / 18-dic, mié 30-dic, vie 26-feb, vie 5-mar, jue 11-mar 13:00 |
| ⚖️ LIVIANO 17:15 · v6.06 | **`bajf6riq56ns5u57b5lqqtb268`** (nuevo; sustituye a `u7dljk7hf8r81nmofgojhtdilc`) | → mié 10-mar · EXDATE 25-dic, 31-dic, 1-ene |
| 📚 BUSINESS 13:00 | **`0h8emvdchmvh4sfddqqed3th8s`** (nuevo; sustituye a `5gbioj75d3bsgoio1fatrji0ns`) | → mar 2-mar · EXDATE 25-dic, 31-dic, 1-ene · excepciones vie 13-nov → sáb 14-nov, vie 4-dic → sáb 5-dic, vie 18-dic → sáb 19-dic 07:45-08:25 · vie 26-feb → sáb 27-feb 09:15-09:55 · mié 30-dic 12:30-12:55 |
| 🧠 PC sábado | **`nsdnhm11ceicjmqvqc3qenin00`** (nuevo; sustituye a `jhsg92lo784vlr8tc5bnsag8uk`) | DTSTART sáb 13-jun-2026 → UNTIL sáb 6-mar-2027 · excepción sáb 31-oct ⏭ v6.06 |
| 🧠 PC domingo | **`fvbccognpru6jh6u4g8qhnud7g`** (nuevo; sustituye a `m8kfvq6440c6al6cq47oclnoj8`) | DTSTART dom 28-jun-2026 → UNTIL dom 7-mar-2027 · excepciones dom 25-oct ⏭ v6.05 · dom 1-nov ⏭ v6.06 |
| 🪙 AURUM 30′ · v6.06 F2-F3 | `r0n85cd06arqkikrbfra4luonc` (=) | lun 4-ene → vie 30-abr (D43-D123) |
| 🪙 AURUM F1 · v6.06 F1 | `23t06e7foitmiqm24lpd0vo9jc` (=) | → mié 30-dic (D1-D42) |
| 🇪🇸 MIR 15:15 / 15:30 · v6.06 | `uiduvkfsgs43p1u1qk1vohih58` / `hos0tfhsr2hdfs6cgv1rmejhrs` (=) | → vie 30-abr |
| 🔬↔💎 R↔D 13:30 · v6.06 | `6us7kkdcuk3g7tm1cjes38leh0` (=) | → vie 30-abr |
| 📋 REVISIÓN SEMANAL · v6.06 | `k8iaefnjq0mnrlvkilhcarrik8` (=) | → sáb 1-may · excepciones sáb 24-oct ⏭ v6.05 · sáb 31-oct ⏭ v6.06 |
| 12 overlays 🔬 | mismos ids (fila 37-48) | M1 mar 3-nov … R43 sáb 7-ago |

#### Pendientes / observaciones (para el orquestador)
1. **Días pasados 26-30 oct NO hechos (prioridad baja; presupuesto)**: título «⏭ SIN SESIÓN (v6.06: todo arranca el lun 2-nov) · <título de la serie>» (solo summary, `notificationLevel: NONE`) en: vibecoding `b2qgtck9gai5cilr8qvbkd51t8_202610{26..30}T091500Z` · SYNAPSE `n8641e63c3msrkbaq3mqdtbmj0_202610{26..30}T173000Z` · BUSINESS `0h8emvdchmvh4sfddqqed3th8s_202610{26..30}T180000Z` · LIVIANO `bajf6riq56ns5u57b5lqqtb268_202610{26..30}T221500Z` · R↔D `6us7kkdcuk3g7tm1cjes38leh0_202610{26..30}T183000Z` · AURUM F1 `23t06e7foitmiqm24lpd0vo9jc_202610{26..30}T191500Z` · MIR `uiduvkfsgs43p1u1qk1vohih58_202610{26..30}T201500Z` / `hos0tfhsr2hdfs6cgv1rmejhrs_202610{26..30}T203000Z` (40 instancias; hoy muestran el título de serie v6.06). Heredado de v6.05 (tampoco hecho): lun 19 → vie 23-oct de las 4 series recreadas (vibe/SYNAPSE/BUSINESS/LIVIANO, ids nuevos de arriba) y de MIR ×2, y PC sábado sáb 24-oct `nsdnhm11ceicjmqvqc3qenin00_20261024T200000Z` (título «⏭ SIN SESIÓN (v6.05: todo arranca el lun 26) · …»).
2. **Cierre Business 15′ de los sábados normales (07:45-08:00; F2 09:15-09:30; último sáb 6-mar 09:15-09:45)**: la app lo pone (`bizFranjaDe(sáb)`), el Calendar nunca tuvo serie (heredado de v6.03/v6.05). Solo están los 4 sábados de OUTPUT entero (14-nov, 5-dic, 19-dic, 27-feb), como instancias movidas.
3. **PC domingo UNTIL dom 7-mar** (orden del orquestador): la app ya no pone Feynman tras el dom 24-ene (`guiaFeynmanDe` = null del dom 31-ene en adelante); los domingos 31-ene → 7-mar quedan como bloque opcional (revisión semanal si no se hizo el sábado), igual que en v6.05 (31-ene → 28-feb).
4. **SYNAPSE jue 11-mar 13:00** (D-2 dress rehearsal ENCAPS 11:00-13:00): añadido además de los 7 que pedía la orden porque `synFranjaDe` lo devuelve (la orden lo listaba; incluido).
5. AURUM: pitch v7 = mar 11-may (D130, en el SERUMS, fuera de serie) y D124-D130 lun 3 → mar 11-may en tiempo muerto: sin serie (como v6.05); decisión del pitch v7 pendiente de Joseph.
6. `DATA/RESEARCH/_calendar_overlays.json` queda MODIFICADO en el working tree (efecto de `--set`; md5 55d60124…); sin commit (orden: no commits). El generador sin flags lo había reescrito antes (12 «recrear»); el estado final es el de `--set` + `--check` = 0.
7. Descripciones de 2027 en las series nuevas: el texto de cada serie ya lleva todas las fechas v6.06 (feb-mar 2027); no hay overlays/eventos sueltos de C2 en 2027 aparte de los 12 hitos 🔬 y las 4 instancias movidas.
8. Sin commit; CAL_V6.md sin tocar. Escrituras en el repo: `DATA/RESEARCH/_calendar_overlays.json` y respaldos en `DATA/_v600/cal/cal_bk/v606/c2/` (gitignored).

## 20. Semana corrida v6.06a (mar 3-nov-2026 · mar 3 = plan del lun 2)
Orquestador (mar 3-nov ≈05:35 Lima, antes de la ronda): UWSA1 `o1gla7846uae4tgngvc4q45osg` → mar 3 08:50-13:00 (título «· v6.06a (HOY mar 3 = plan del lun 2)») · SYNAPSE `n8641e63c3msrkbaq3mqdtbmj0_20261103T173000Z` → 07:25-07:55 · ALMUERZO `43dq3oib16esjcqj1dcd8osot2_20261103T170000Z` → 13:00-13:30. App: commits `6c7a4d9` + `2953113`.

Registro del Google Calendar (josephsototocas@gmail.com · America/Lima) para la orden de Joseph del lun 2-nov: «no empezamos hoy, el 2, sino el 3; como sábado y domingo son libres, corre esos días: de mañana martes hasta el sábado; todo lo demás, déjalo normal». La app ya lo aplica como alias en la consulta (commits `6c7a4d9` + `2953113`, `corrida_s1` v6.06a de `DATA/_scripts/_fechas_v6.json`): lun 2 sin sesión · mar 3 = plan del lun 2 (D1, UWSA1) · mié 4 = plan del mar 3 · jue 5 = plan del mié 4 · vie 6 = plan del jue 5 · sáb 7 = plan del vie 6 · dom 8 por la tarde = lo propio del sáb 7 (revisión S01 14:15 · cierre del OUTPUT 14:45 · SHIP S1 15:00-17:00) + Anki dom 17:00 + Feynman 17:15 (opcional). Desde el lun 9-nov nada cambia. Mismo patrón que §15 (v6.04a): por INSTANCIA, sin tocar masters, + eventos sueltos para el sábado.

Ya hecho por el orquestador antes de esta ronda (no repetido): UWSA1 `o1gla7846uae4tgngvc4q45osg` → mar 3 08:50-13:00 (título «… · v6.06a (HOY mar 3 = plan del lun 2)») · SYNAPSE `n8641e63c3msrkbaq3mqdtbmj0_20261103T173000Z` → 07:25-07:55 · ALMUERZO `43dq3oib16esjcqj1dcd8osot2_20261103T170000Z` → 13:00-13:30 (`updated` 10:35:11-10:35:16Z).

## Protocolo

- Volcado `list_events` 2 → 9-nov (197 eventos) tomado el mar 3 ≈05:45 Lima ANTES de escribir: `DATA/_v600/cal/cal_bk/v606a/volcados/list_02-09nov_before.json`; respaldo JSON por evento a tocar (87 instancias + UWSA1 + overlay M1) en `DATA/_v600/cal/cal_bk/v606a/<id>.json` (`cal_bk/` está en `.gitignore`).
- `notificationLevel: NONE` en todo. Ningún master tocado (todo por instancia), ninguna serie recreada, RRULE/EXDATE intactos, sin `delete_event`. Nada ≥ lun 9-nov tocado. Recordatorios de finanzas y rutinas personales sin tocar.
- Contenido de cada bloque = la app (fecha de plan de cada bloque): `scratchpad/v606/cal_v606a_blocks.js` (copia de `check_bloques_v606a.js` que además vuelca `scratchpad/v606/bloques_v606a.json` con el tema completo y las guías de cada bloque del 2 al 9-nov); 0 guías fuera de su bloque.

## Operaciones

### A. HOY mar 3 = plan del lun 2 (≈05:44 Lima, `updated` 10:44:02Z → 10:44:50Z · 13 `update_event`)

| # | Tipo | Id | Antes → después |
|---|---|---|---|
| 1 | DESCR | `o1gla7846uae4tgngvc4q45osg` (🎯 UWSA1, título y hora sin cambio: mar 3 08:50-13:00) | descripción v6.06 → v6.06a (script `cal_bk/v606a/build_uwsa1.js`, 9 reemplazos «exactamente una vez» sobre el respaldo; payload `cal_bk/v606a/payloads/uwsa1_desc.txt`): «D1 DEL PLAN = LUN 2-NOV-2026 → SE HACE HOY, MAR 3-NOV (v6.06a, semana corrida …)» · resto del vídeo Palmerton 26:00-38:13 → D3 = jue 5-nov 05:00 · 13:30 💎 Derma d1 (Research M1 = mié 4-nov) · Day-After 1/6 HOY 18:00 · 2/6 mié 4 05:00 · 3/6 mié 4 07:15 · 4/6 mié 4 18:00 · 5/6 jue 5 18:00 · 6/6 + eval reducida vie 6-nov 18:00 (plan del jue 5) · eval de cierre sáb 7-nov 18:00 (plan del vie 6) · ENSAYO TEST-DAY noche del lun 2 · ENCAPS pre-test 1/2 hoy 16:15, 2/2 mié 4 16:15 · primer día de contenido = mié 4 (D2) · historial «→ v6.06a (2-nov): semana corrida, UWSA1 MAR 3-NOV» · respaldos «… v606/ y v606a/» |
| 2 | TÍTULO (instancia) | `papebi46etlo8glgfs5akd5mig_20261103T211500Z` (ENCAPS 16:15) | «🇵🇪 ENCAPS — dia 2 · eval II-3 + PRE-TEST DE ARRANQUE 2/2 (…) · v6.06» → «🇵🇪 ENCAPS — dia 1 · eval (fallos previos) + PRE-TEST DE ARRANQUE 1/2 (20Q ciegas: II-3 · I-3 · V-2 · III-5 · 72 s/Q) (plan del lun 2)» |
| 3 | TÍTULO (instancia) | `6us7kkdcuk3g7tm1cjes38leh0_20261103T183000Z` (R↔D 13:30) | título de la serie → «💎 DERMA d1 · lesiones elementales 1ª/2ª (plan del lun 2)» |
| 4 | TÍTULO (instancia) | `c5e77csne1bnfps1iq7nqel84s_20261103T230000Z` (Eval 18:00) | → «🇺🇸 USMLE — Evaluación · DAY-AFTER UWSA1 1/6: medición + informe por sistema + auditoría (plan del lun 2)» |
| 5 | MOVE | `shkul14j3o1bs1a5044u8ge1kk` (overlay 🔬 M1, título/descr./color/FREE intactos) | mar 3 13:30-14:15 → **mié 4-nov 13:30-14:15** (M1 = plan del mar 3) |
| 6 | DESCR (instancia) | `43dq3oib16esjcqj1dcd8osot2_20261103T170000Z` (ALMUERZO, ya 13:00-13:30) | texto de la serie → «🎯 HOY (mar 3-nov, UWSA1 08:50-13:00 · D1 del plan, corrido del lun 2 · v6.06a semana corrida): el almuerzo va DESPUÉS del sim, 13:00-13:30 … 13:30 💎 Derma d1 (plan del lun 2; Research M1 = mié 4-nov) …» + el texto de la serie (el párrafo «HOY» del lun 2, adaptado; payload `payloads/almuerzo_mar3.txt`) |
| 7 | TÍTULO (instancia) | `n8641e63c3msrkbaq3mqdtbmj0_20261103T173000Z` (SYNAPSE, ya 07:25-07:55) | → «🧠 SYNAPSE — misión del día · d1 S1 (plan del lun 2) · adelantada a las 07:25 por el UWSA1» |
| 8 | TÍTULO (instancia) | `0h8emvdchmvh4sfddqqed3th8s_20261103T180000Z` (Business 13:00) | → «📚 BUSINESS D1 · Spark (Ratey) cap 1-3 (plan del lun 2) · en audio con el almuerzo» |
| 9 | TÍTULO (instancia) | `23t06e7foitmiqm24lpd0vo9jc_20261103T191500Z` (AURUM 14:15; popup 5′ intacto) | → «🪙 AURUM — Closer de ventas · D1 (plan del lun 2)» |
| 10 | TÍTULO (instancia) | `uiduvkfsgs43p1u1qk1vohih58_20261103T201500Z` (MIR eval 15:15) | → «🇪🇸 MIR — Evaluación Anclada · D1/78 (plan del lun 2)» |
| 11 | TÍTULO (instancia) | `hos0tfhsr2hdfs6cgv1rmejhrs_20261103T203000Z` (MIR deep 15:30) | → «🇪🇸 MIR — Deep Work Mini · D1/78 Epidemiología: ensayo clínico (plan del lun 2)» |
| 12 | TÍTULO (instancia) | `bajf6riq56ns5u57b5lqqtb268_20261103T221500Z` (LIVIANO 17:15) | → «⚖️ LIVIANO — d1 FISIOLOGÍA · la obesidad como enfermedad (plan del lun 2)» |
| 13 | TÍTULO (instancia) | `b2qgtck9gai5cilr8qvbkd51t8_20261103T091500Z` (vibecoding 04:15, ya pasado) | → «🧠 IA — VIBECODING · S1 1/5 definir (plan del lun 2)» |

Sin tocar el mar 3: las 6 series USMLE (ANKI AM 05:00 · repaso 07:15 · pre-test 08:15 · deep prime 09:00 · 30Q 11:00; títulos genéricos, se solapan con el UWSA1 como en §12-§15).

### B. Mañana mié 4 = plan del mar 3 (`updated` 10:45:28Z → 10:45:48Z · 10 `update_event`, solo título de la instancia)

| # | Id (instancia) | Título nuevo |
|---|---|---|
| 14 | `papebi46etlo8glgfs5akd5mig_20261104T211500Z` (ENCAPS 16:15; antes título de la serie) | «🇵🇪 ENCAPS — dia 2 · eval II-3 + PRE-TEST DE ARRANQUE 2/2 (20Q ciegas: II-5 · I-4 · IV-1+IV-2 · II-4 · 72 s/Q) (plan del mar 3)» |
| 15 | `6us7kkdcuk3g7tm1cjes38leh0_20261104T183000Z` (R↔D 13:30) | «🔬 RESEARCH M1 · Dr. Ciro: 3 coautorías + el caso (plan del mar 3)» (el overlay 🔬 M1 va encima, fila 5) |
| 16 | `c5e77csne1bnfps1iq7nqel84s_20261104T230000Z` (Eval 18:00) | «🇺🇸 USMLE — Evaluación · DAY-AFTER UWSA1 4/6: drill de cronología 4-6 (plan del mar 3)» |
| 17 | `bajf6riq56ns5u57b5lqqtb268_20261104T221500Z` (LIVIANO) | «⚖️ LIVIANO — d2 FISIOLOGÍA · set point (plan del mar 3)» |
| 18 | `0h8emvdchmvh4sfddqqed3th8s_20261104T180000Z` (Business) | «📚 BUSINESS D2 · Spark (Ratey) cap 4-6 (plan del mar 3)» |
| 19 | `n8641e63c3msrkbaq3mqdtbmj0_20261104T173000Z` (SYNAPSE 12:30) | «🧠 SYNAPSE — misión del día · d2 S1 (plan del mar 3)» |
| 20 | `23t06e7foitmiqm24lpd0vo9jc_20261104T191500Z` (AURUM) | «🪙 AURUM — Closer de ventas · D2 (plan del mar 3)» |
| 21 | `uiduvkfsgs43p1u1qk1vohih58_20261104T201500Z` (MIR eval) | «🇪🇸 MIR — Evaluación Anclada · D2/78 (plan del mar 3)» |
| 22 | `hos0tfhsr2hdfs6cgv1rmejhrs_20261104T203000Z` (MIR deep) | «🇪🇸 MIR — Deep Work Mini · D2/78 Epidemiología: clasificación de los estudios (plan del mar 3)» |
| 23 | `b2qgtck9gai5cilr8qvbkd51t8_20261104T091500Z` (vibecoding) | «🧠 IA — VIBECODING · S1 2/5 construir (plan del mar 3)» |

Sin tocar el mié 4: ANKI AM 05:00 (= Day-After 2/6, triaje) y repaso 07:15 (= Day-After 3/6) conservan el título genérico de la serie; el reparto exacto está en la descripción del UWSA1 y en la app.

### C. jue 5 = plan del mié 4 · vie 6 = plan del jue 5 (`updated` 10:46:17Z → 10:47:03Z · 20 `update_event`, solo título de la instancia)

| # | Id (instancia) | Título nuevo |
|---|---|---|
| 24 | `papebi46etlo8glgfs5akd5mig_20261105T211500Z` (ENCAPS jue 5; antes título de la serie) | «🇵🇪 ENCAPS — dia 3 · eval I-3 + BANCO V-2 · planeamiento estratégico + cola larga V-6 (plan del mié 4)» |
| 25 | `6us7kkdcuk3g7tm1cjes38leh0_20261105T183000Z` (R↔D jue 5) | «💎 DERMA d2 · color, distribución y configuración (plan del mié 4)» |
| 26 | `c5e77csne1bnfps1iq7nqel84s_20261105T230000Z` (Eval jue 5) | «🇺🇸 USMLE — Evaluación · DAY-AFTER UWSA1 5/6: drill de cronología 7-9 (plan del mié 4)» |
| 27 | `bajf6riq56ns5u57b5lqqtb268_20261105T221500Z` (LIVIANO jue 5) | «⚖️ LIVIANO — d3 FISIOLOGÍA · leptina (plan del mié 4)» |
| 28 | `0h8emvdchmvh4sfddqqed3th8s_20261105T180000Z` (Business jue 5) | «📚 BUSINESS D3 · In Defense of Food (Pollan) parte 1-2 (plan del mié 4)» |
| 29 | `n8641e63c3msrkbaq3mqdtbmj0_20261105T173000Z` (SYNAPSE jue 5) | «🧠 SYNAPSE — misión del día · d3 S1 (plan del mié 4)» |
| 30 | `23t06e7foitmiqm24lpd0vo9jc_20261105T191500Z` (AURUM jue 5) | «🪙 AURUM — Closer de ventas · D3 (plan del mié 4)» |
| 31 | `uiduvkfsgs43p1u1qk1vohih58_20261105T201500Z` (MIR eval jue 5) | «🇪🇸 MIR — Evaluación Anclada · D3/78 (plan del mié 4)» |
| 32 | `hos0tfhsr2hdfs6cgv1rmejhrs_20261105T203000Z` (MIR deep jue 5) | «🇪🇸 MIR — Deep Work Mini · D3/78 Epidemiología: pruebas diagnósticas (plan del mié 4)» |
| 33 | `b2qgtck9gai5cilr8qvbkd51t8_20261105T091500Z` (vibecoding jue 5) | «🧠 IA — VIBECODING · S1 3/5 construir (plan del mié 4)» |
| 34 | `papebi46etlo8glgfs5akd5mig_20261106T211500Z` (ENCAPS vie 6) | «🇵🇪 ENCAPS — dia 5 · MINI-SIM 25Q (…) · v6.06» → «🇵🇪 ENCAPS — dia 4 · eval V-2 + BANCO III-5 · pertinencia cultural + cola larga II-6 (plan del jue 5) · mini-sim #5 → sáb 7 16:15» |
| 35 | `6us7kkdcuk3g7tm1cjes38leh0_20261106T183000Z` (R↔D vie 6) | «🔬 RESEARCH R0 · infra académica: cuentas (plan del jue 5)» |
| 36 | `c5e77csne1bnfps1iq7nqel84s_20261106T230000Z` (Eval vie 6) | «🇺🇸 USMLE — Evaluación · DAY-AFTER UWSA1 6/6 + EVAL reducida 5Q (plan del jue 5) · eval de cierre → sáb 7 18:00» |
| 37 | `bajf6riq56ns5u57b5lqqtb268_20261106T221500Z` (LIVIANO vie 6) | «⚖️ LIVIANO — d4 FISIOLOGÍA · resistencia leptínica (plan del jue 5) · caso 1 → sáb 7 17:15» |
| 38 | `0h8emvdchmvh4sfddqqed3th8s_20261106T180000Z` (Business vie 6) | «📚 BUSINESS D4 · In Defense of Food parte 3 (plan del jue 5) · OUTPUT S1 → sáb 7 13:00» (el vie 6 real NO es OUTPUT) |
| 39 | `n8641e63c3msrkbaq3mqdtbmj0_20261106T173000Z` (SYNAPSE vie 6) | «🧠 SYNAPSE — misión del día · d4 S1 (plan del jue 5)» |
| 40 | `23t06e7foitmiqm24lpd0vo9jc_20261106T191500Z` (AURUM vie 6) | «🪙 AURUM — Closer de ventas · D4 (plan del jue 5)» |
| 41 | `uiduvkfsgs43p1u1qk1vohih58_20261106T201500Z` (MIR eval vie 6) | «🇪🇸 MIR — Evaluación Anclada · D4/78 (plan del jue 5)» |
| 42 | `hos0tfhsr2hdfs6cgv1rmejhrs_20261106T203000Z` (MIR deep vie 6) | «🇪🇸 MIR — Deep Work Mini · D4/78 Bioética: principios + relación médico-paciente (plan del jue 5)» |
| 43 | `b2qgtck9gai5cilr8qvbkd51t8_20261106T091500Z` (vibecoding vie 6) | «🧠 IA — VIBECODING · S1 4/5 verificar (plan del jue 5)» |

### D. sáb 7 = plan del vie 6 · dom 8 por la tarde = lo propio del sáb 7 (`updated` 10:47:54Z → 10:49:00Z · 13 `create_event` + 4 `update_event`)

Eventos sueltos creados (ids en `cal_bk/v606a/creados_v606a.json`). Descripción de los 12 del sábado: «Semana corrida v6.06a (orden de Joseph del lun 2-nov): plan del vie 6 · qué/cuánto/cómo en Joseph MD → Home (manda la app) · desde el lun 9-nov nada cambia.» + el contenido del bloque (guías de la app). Colores = los de su serie; recordatorios por defecto salvo AURUM (popup 5′, como su serie).

| # | Tipo | Id | Evento |
|---|---|---|---|
| 44 | CREATE (sáb 7) | `ltloq4o1td5oobpgj56bggoh14` | 04:15-05:00 «🧠 IA — VIBECODING · S1 5/5 ship-prep (plan del vie 6)» · color 9 |
| 45 | CREATE (sáb 7) | `mea8ohjr6o3vb39h24qmuc2ja8` | 05:00-05:45 «🇺🇸 USMLE — ANKI AM (plan del vie 6)» · color 2 |
| 46 | CREATE (sáb 7) | `t4g1ob3jkg3064kgb420bgo9e0` | 07:15-12:00 «🇺🇸 USMLE — D5 Immunology · hipersensibilidades + autoinmunidad + inmunodeficiencias (plan del vie 6): repaso 07:15 · pre-test 08:15 · deep prime 09:00 · 10Q 11:00» · color 2 |
| 47 | CREATE (sáb 7) | `6s27mfo9l4f13b8qlrplk32svc` | 12:30-13:00 «🧠 SYNAPSE — misión del día · d5 S1 (plan del vie 6)» · color 9 |
| 48 | CREATE (sáb 7) | `t8g7ucv80k8e9hut88c1vc05ik` | 13:00-13:25 «📚 BUSINESS D5 · OUTPUT S1: régimen biológico del fundador v1 (plan del vie 6)» · color 8 |
| 49 | CREATE (sáb 7) | `r62qus6h1kh2ugci94pikp9oas` | 13:30-14:15 «💎 DERMA d3 · estructura de la piel + TEST ProMIR cap. 1 (plan del vie 6)» · color 1 |
| 50 | CREATE (sáb 7) | `nhbr4kt8uns39m9sl70p7lcvvo` | 14:15-15:15 «🪙 AURUM — Closer de ventas · D5 (plan del vie 6)» · color 5 · popup 5′ |
| 51 | CREATE (sáb 7) | `hv09cnk6f5pj877p6avtnr2hi0` | 15:15-15:30 «🇪🇸 MIR — Evaluación Anclada · D5/78 (plan del vie 6)» · color 1 |
| 52 | CREATE (sáb 7) | `kd2atvsr2po7dlpclktied5g4g` | 15:30-16:15 «🇪🇸 MIR — Deep Work Mini · D5/78 Cardiología básica (plan del vie 6)» · color 1 |
| 53 | CREATE (sáb 7) | `kmn3nn9lh0f662fivjuj5s7rkg` | 16:15-17:15 «🇵🇪 ENCAPS — dia 5 · MINI-SIM #5 25Q (cola larga II-2 + I-10 · 72 s/Q) (plan del vie 6)» · color 1 |
| 54 | CREATE (sáb 7) | `afd1hma1td8giatbhkj707t5bg` | 17:15-18:00 «⚖️ LIVIANO — d5 · CASO 1/16: la que se culpa (plan del vie 6)» · color 7 |
| 55 | CREATE (sáb 7) | `h4v11u125lv9nc4a7su27ne2v8` | 18:00-18:45 «🇺🇸 USMLE — EVAL de cierre de la semana 1 (D1-D5) (plan del vie 6)» · color 11 |
| 56 | CREATE (dom 8) | `6l4vuftusp5m1vavobjfqnc1ag` | 14:45-15:00 «📚 BUSINESS — cierre del OUTPUT S1 (semana corrida: dom 8 14:45)» · color 8 |
| 57 | MOVE + TÍTULO (instancia) | `k8iaefnjq0mnrlvkilhcarrik8_20261107T121500Z` (📋 REVISIÓN) | sáb 7 07:15-07:45 «📋 REVISIÓN SEMANAL · v6.06» → **dom 8 14:15-14:45** «📋 REVISIÓN SEMANAL · S01 (semana corrida: dom 8 14:15)»; descripción de la serie intacta |
| 58 | MOVE + TÍTULO (instancia) | `nsdnhm11ceicjmqvqc3qenin00_20261107T200000Z` (PC sábado) | sáb 7 15:00-17:00 → **dom 8 15:00-17:00** «🧠 SYNAPSE — PC sábado (2h) · SHIP S1 (semana corrida: dom 8)» |
| 59 | TÍTULO (instancia) | `r9eglu07f5lvltvpoue3v4ks6o_20261108T000000Z` (ANKI sáb 19:00, hora intacta) | «ANKI » → «⏭ ANKI del sábado: hoy ya va el Anki AM 05:00 (semana corrida)» |
| 60 | MOVE + TÍTULO (instancia) | `fvbccognpru6jh6u4g8qhnud7g_20261108T200000Z` (PC domingo) | dom 8 15:00-17:00 «🧠 SYNAPSE — repaso + PC domingo (2h)» → **dom 8 17:15-17:25** «🧠 Feynman S1 (opcional · semana corrida)» |

Anki dom `5s64scagno3jo983gg6rfdo5qg_20261108T220000Z` 17:00-17:15: sin cambio. La mañana del dom 8 sigue libre.

### E. lun 2-nov = sin sesión (`updated` 10:49:36Z → 10:50:26Z · 16 `update_event`)

Prefijo de título «⏭ SIN SESIÓN (v6.06a: la semana va de mar 3 a sáb 7) · » + el título de la serie (el de ENCAPS deja el título v6.06 «D1 · eval (fallos previos) + PRE-TEST DE ARRANQUE 1/2 …» y vuelve al de la serie).

| # | Id (instancia) | Cambio |
|---|---|---|
| 61 | `n8641e63c3msrkbaq3mqdtbmj0_20261102T173000Z` (SYNAPSE) | 07:25-07:55 (excepción v6.06 del día del UWSA1) → **12:30-13:00** (hora de la serie) + «⏭ SIN SESIÓN (…) · 🧠 SYNAPSE — misión del día (30') · v6.06» |
| 62 | `43dq3oib16esjcqj1dcd8osot2_20261102T170000Z` (ALMUERZO) | 13:00-13:30 con el párrafo «🎯 HOY (lun 2-nov, UWSA1 …)» → **12:00-12:30** con el texto de la serie (el párrafo, adaptado, pasó al mar 3: fila 6); título «ALUMUERZO» intacto |
| 63 | `papebi46etlo8glgfs5akd5mig_20261102T211500Z` (ENCAPS) | → «⏭ SIN SESIÓN (…) · 🇵🇪 ENCAPS — 1h Banqueo Mantenimiento (pronóstico v3 · rotación II·I·V·III·IV)» |
| 64 | `6us7kkdcuk3g7tm1cjes38leh0_20261102T183000Z` (R↔D) | → «⏭ SIN SESIÓN (…) · 🔬 RESEARCH ↔ 💎 DERMA (alterna diario · ver app YoCPMD) · v6.06» |
| 65 | `c5e77csne1bnfps1iq7nqel84s_20261102T230000Z` (Eval) | → «⏭ SIN SESIÓN (…) · 🇺🇸 USMLE — Evaluación Diaria Acumulativa (…) · v6.06» |
| 66 | `bajf6riq56ns5u57b5lqqtb268_20261102T221500Z` (LIVIANO) | → «⏭ SIN SESIÓN (…) · ⚖️ LIVIANO — Academia (…) · v6.06» |
| 67 | `0h8emvdchmvh4sfddqqed3th8s_20261102T180000Z` (Business) | → «⏭ SIN SESIÓN (…) · 📚 BUSINESS · lectura/escucha del libro (25′)» |
| 68 | `23t06e7foitmiqm24lpd0vo9jc_20261102T191500Z` (AURUM) | → «⏭ SIN SESIÓN (…) · 🪙 AURUM — Closer de ventas (…) · v6.06 F1» |
| 69 | `uiduvkfsgs43p1u1qk1vohih58_20261102T201500Z` (MIR eval) | → «⏭ SIN SESIÓN (…) · 🇪🇸 MIR — Evaluación Anclada D-1 (…) · v6.06» |
| 70 | `hos0tfhsr2hdfs6cgv1rmejhrs_20261102T203000Z` (MIR deep) | → «⏭ SIN SESIÓN (…) · 🇪🇸 MIR — Deep Work Mini (…) · v6.06» |
| 71 | `b2qgtck9gai5cilr8qvbkd51t8_20261102T091500Z` (vibecoding) | → «⏭ SIN SESIÓN (…) · 🧠 IA — VIBECODING con Claude Code (…) · v6.06» |
| 72 | `9274q14djfvggeajhor64oshj8_20261102T100000Z` (ANKI AM) | → «⏭ SIN SESIÓN (…) · 🇺🇸 USMLE — ANKI AM (…) · v6.06» |
| 73 | `76dnlc30p3hnccenpvub2d9acg_20261102T121500Z` (repaso 07:15) | → «⏭ SIN SESIÓN (…) · 🇺🇸 USMLE — Repaso Espaciado Multi-Temporal (…) · v6.06» |
| 74 | `c24k2n7k8qlhfimrrncf8rapgk_20261102T131500Z` (pre-test 08:15) | → «⏭ SIN SESIÓN (…) · 🇺🇸 USMLE — PRE-TEST tema del día (…) · v6.06» |
| 75 | `iuhj8busrh63ms7v4j5q8e9920_20261102T140000Z` (deep prime 09:00) | → «⏭ SIN SESIÓN (…) · 🇺🇸 USMLE — NÚCLEO DEEP PRIME (…) · v6.06» |
| 76 | `q72kvc9pm1brlqvl6383ccr9vs_20261102T160000Z` (30Q 11:00) | → «⏭ SIN SESIÓN (…) · 🇺🇸 USMLE — 30 Preguntas Consolidación (…) · v6.06» |

Total en el Calendar: **63 `update_event` + 13 `create_event` = 76 escrituras** (filas 1-76; sin `delete_event`, sin tocar masters).

### F. Research 🔬 — `DATA/_scripts/gen_research_calendar.js` (cambio de código, sin commit)

- Antes de esta ronda `--check` = 0 con M1 esperado el mar 3 (fecha de plan). Tras mover el overlay M1 al mié 4 (fila 5) el script se cambió para que la **fecha esperada de cada overlay sea la REAL**: `fechaReal(f) = fechaRealDe(f, undefined, 'research-derma')` del gemelo node que exporta `DATA/_scripts/gen_fechas_v6.js` (alias de `corrida_s1`; fuera de la semana corrida = la fecha de plan). El átomo se sigue buscando por su fecha de PLAN (el `.ts` no se re-fecha); la payload guarda `fecha` = real y `fechaPlan` cuando difiere; startTime/endTime (y el criterio F4/todo el día) salen de la fecha real; título y descripción NO cambian. Comentario de cabecera «v6.06a (3-nov-2026 …)». Respaldos previos: `cal_bk/v606a/gen_research_calendar.js.bak` y `cal_bk/v606a/_calendar_overlays.json.bak`.
- `--check` tras el cambio: 1 `recrear` (M1 «creado para 2026-11-03»); la payload nueva (mié 4 13:30-14:15, mismo título y misma descripción que el evento movido) coincide con el evento → `--set mentor=shkul14j3o1bs1a5044u8ge1kk` (registra fecha 2026-11-04 · hash `8aff6fadd9b5`; antes 2026-11-03 · `3900a9a45492`) → **`--check` = 0** (12 hitos, 0 con acción pendiente). `DATA/RESEARCH/_calendar_overlays.json`: solo cambia la entrada `mentor` (+ `_meta.actualizado`).
- R0 (vie 6 = plan del jue 5) no es hito: no tiene overlay. El resto de overlays (C-2 mar 17-nov … R43 sáb 7-ago) quedan en su fecha (fuera de la semana corrida fecha real = plan).

## Verificación (list_events 2 → 9-nov después de los cambios)

Volcado después (≈05:53 Lima): `cal_bk/v606a/volcados/list_02-09nov_after.json` (210 eventos = 197 + 13 creados). Script `cal_bk/v606a/ver_v606a.js <bloques_v606a.json>` (sale 0):

- **63 eventos tocados × 7 comprobaciones (título, inicio, fin, descripción, color, estado, transparencia) + 13 creados (título, hora, color, estado) = 454 OK · 0 FAIL.** Las descripciones del UWSA1 y de los dos ALMUERZO se comparan byte a byte con sus payloads (`payloads/uwsa1_desc.txt`, `payloads/almuerzo_mar3.txt`, texto de la serie).
- **134/134 eventos restantes idénticos** (título, descripción, color, estado, transparencia, hora): todo el lun 9-nov, rutinas personales, finanzas (IBKR jue 5), YouTube sáb 7, Anki dom 8, BAILE, etc. 13 eventos nuevos = los 13 de `creados_v606a.json`, ninguno extra.
- **Cruce app ↔ Calendar (mar 3 → dom 8): 60/60 bloques de la app** (`plantillaDelDia` + guías, fecha y hora de plan de cada bloque) tienen su evento a su hora con «(plan del <día>)» igual a la fecha de plan del bloque (o el título genérico de las series USMLE de la mañana / el Anki dom); el dom 8 = revisión S01 14:15 · cierre OUTPUT 14:45 · SHIP S1 15:00 · Anki 17:00 · Feynman 17:15. **lun 2: 15/15 instancias de plan con «⏭ SIN SESIÓN (v6.06a …)»**, SYNAPSE 12:30 y ALMUERZO 12:00 con el texto de la serie.

| Día | Resultado |
|---|---|
| lun 2-nov (sin estudio) | ✅ 15 instancias de plan «⏭ SIN SESIÓN (v6.06a: la semana va de mar 3 a sáb 7) · …» · SYNAPSE 12:30-13:00 · ALMUERZO 12:00-12:30 (texto de la serie) · el UWSA1 ya no está |
| mar 3 (= plan del lun 2) | ✅ SYNAPSE 07:25 d1 · UWSA1 08:50-13:00 (descripción v6.06a) · ALMUERZO 13:00-13:30 (texto «HOY mar 3») · Business D1 13:00 (audio) · DERMA d1 13:30 · AURUM D1 · MIR D1/78 · ENCAPS PRE-TEST 1/2 · LIVIANO d1 · Day-After 1/6 18:00 |
| mié 4 (= plan del mar 3) | ✅ vibecoding S1 2/5 · SYNAPSE d2 · Business D2 · RESEARCH M1 13:30 (+ overlay 🔬 M1 13:30-14:15) · AURUM D2 · MIR D2/78 · ENCAPS PRE-TEST 2/2 · LIVIANO d2 · Day-After 4/6 |
| jue 5 (= plan del mié 4) | ✅ S1 3/5 · d3 · Business D3 · DERMA d2 · AURUM D3 · MIR D3/78 · ENCAPS banco V-2 · LIVIANO d3 · Day-After 5/6 |
| vie 6 (= plan del jue 5) | ✅ S1 4/5 · d4 · Business D4 (no es OUTPUT) · RESEARCH R0 · AURUM D4 · MIR D4/78 · ENCAPS banco III-5 · LIVIANO d4 · Day-After 6/6 + eval reducida |
| sáb 7 (= plan del vie 6) | ✅ 12 eventos sueltos 04:15 → 18:45 (mini-sim #5, OUTPUT S1, caso 1, eval de cierre) · la REVISIÓN 07:15 y el PC 15:00 ya no están · Anki 19:00 «⏭ … (semana corrida)» |
| dom 8 | ✅ mañana libre · 14:15 REVISIÓN S01 · 14:45 cierre OUTPUT S1 · 15:00-17:00 SHIP S1 · 17:00 Anki (sin cambio) · 17:15-17:25 Feynman S1 (opcional) |
| lun 9-nov | ✅ sin cambio (todos los eventos idénticos al volcado de antes) |

## No tocado / notas para el orquestador

1. **Masters sin tocar** → sus descripciones siguen en v6.06 (ENCAPS «LUN 2-nov (dia 1) … VIE 6 MINI-SIM … sáb 7 / dom 8-nov libres»; Eval «Day-After lun 2, mar 3, mié 4 y jue 5 … la eval vuelve el vie 6»; R↔D «Mapa de arranque v6.06: lun 2-nov DERMA d1 · mar 3 RESEARCH M1 …»; REVISIÓN «S01 sáb 7-nov cubre lun 2 → vie 6»; Business «Día del UWSA1 (lun 2-nov)»; SYNAPSE «Día de hito: lun 2-nov → 07:25»; ALMUERZO «UWSA1 LUN 2-nov»; PC sábado «SHIP S1 sáb 7-nov»). Los títulos «(plan del …)» de las instancias, la descripción del UWSA1 y la regla «manda la app» cubren la semana; tocar un master pisaría las excepciones de esta ronda.
2. **Series USMLE de la mañana** (ANKI AM 05:00, repaso 07:15, pre-test 08:15, deep prime 09:00, 30Q 11:00) mar 3 → vie 6 con el título genérico de la serie (no nombran nada del día; el mar 3 se solapan con el UWSA1 como en §12-§15). El mié 4 a las 05:00 va el Day-After 2/6 (triaje) y a las 07:15 el 3/6: lo dicen la descripción del UWSA1 y la app.
3. **Solapes que quedan (decisión de Joseph, no tocados por la orden «todo lo demás déjalo normal»):** sáb 7 «CREACIÓN DE VIDEO YOUTUBE EMPRESA» 17:00-19:00 (`5tbl422agrtls8kc62skirc0pu_20261107T220000Z`) pisa LIVIANO caso 1 17:15 y la eval de cierre 18:00 (aviso escrito en la descripción del evento de la eval); dom 8 «BAILE PRACTICA» 17:15-17:30 (`13m3tcqjjc34rt6iqfblla18q1_20261108T221500Z`) coincide con el Feynman opcional 17:15-17:25. El sáb 7 no hay evento de almuerzo (la serie ALMUERZO es L-V): hueco 12:00-12:30 libre.
4. **Textos Research que citan fechas de plan:** la descripción del overlay CR-1 (lun 7-dic, `36tp7b995jnoi844d5uvgm58t0`) dice «M1, d1, pide el caso el mar 3-nov» (real: mié 4) — no se tocó (≥ lun 9-nov nada cambia; los textos de DEADLINE de `gen_research_calendar.js` siguen derivando de fechas de plan, así que `--check` no lo marca).
5. **Repo:** cambios SIN commit en `DATA/_scripts/gen_research_calendar.js` (+5 líneas de cabecera, `fechaReal`, payload con fecha real/`fechaPlan`) y `DATA/RESEARCH/_calendar_overlays.json` (entrada `mentor`). `DATA/PENDIENTES_JOSEPH.md`, `DATA/REVISION_SEMANAL.md` y `.claude/settings.local.json` ya estaban modificados en el árbol y no son de esta ronda. `CAL_V6.md` NO editado (este registro es el texto para su §20). Respaldos, volcados, payloads y scripts en `DATA/_v600/cal/cal_bk/v606a/` (ignorado por git).

## 21. Semana corrida v6.06b (mar 3-nov-2026 · la semana va de MIÉ 4 a DOM 8 · mié 4 = plan del lun 2)
Registro del Google Calendar (josephsototocas@gmail.com · America/Lima) para la orden de Joseph del mar 3-nov (sin estudio ese día): «reestructura a partir de mañana, inicia el 4; solo correr: ya no termina el sábado, ese domingo también estudiamos — miércoles, jueves, viernes, sábado, domingo — y de ahí continúa normal el lunes; no cambies nada de la próxima semana». La app ya lo aplica (commit `8e6b826`, `corrida_s1` v6.06b de `DATA/_scripts/_fechas_v6.json`): lun 2 y mar 3 sin sesión · mié 4 = plan del lun 2 (D1, UWSA1 08:50-13:00, SYNAPSE 07:25, ALMUERZO 13:00) · jue 5 = plan del mar 3 · vie 6 = plan del mié 4 · sáb 7 = plan del jue 5 · dom 8 = plan del vie 6 a sus horas + lo del sábado que cabe: REVISIÓN S01 19:00-19:30 y cierre del OUTPUT S1 19:30-19:45. La PC del sábado (SHIP S1 + comodines SYNAPSE), el Feynman y el Anki de fin de semana no tienen hueco (SHIP S1 = verify 1 al cerrar el k5 del dom 8 04:15; Anki AM los 5 días). Desde el lun 9-nov nada cambia. Sustituye a la v6.06a (§20: martes → sábado); mismo patrón (por INSTANCIA, sin tocar masters, + eventos sueltos de fin de semana).

## Protocolo

- Volcado `list_events` 2 → 9-nov (210 eventos) tomado el mar 3 ≈11:10 Lima ANTES de escribir: `DATA/_v600/cal/cal_bk/v606b/volcados/list_02-09nov_before.json`; respaldo JSON por evento a tocar (81: 80 instancias/sueltos + UWSA1 + overlay M1) en `DATA/_v600/cal/cal_bk/v606b/<id>.json` (`cal_bk/` está en `.gitignore`); `_calendar_overlays.json.bak` antes del `--set`.
- Plan de escritura reproducible: `cal_bk/v606b/build_v606b.js` (genera respaldos, payloads y `ops_v606b.json` = estado objetivo de las 93 escrituras desde el volcado «before»; títulos «(plan del …)» = los de la v6.06a desplazados un día; descripción del UWSA1 con 9 reemplazos «exactamente una vez» sobre la v6.06a). Payloads en `cal_bk/v606b/payloads/` (uwsa1_desc, almuerzo_mie4, almuerzo_serie, sab7_*, dom8_*, cierre_output).
- `notificationLevel: NONE` en todo. Ningún master tocado, ninguna serie recreada, RRULE/EXDATE intactos, sin `delete_event`. Nada ≥ lun 9-nov tocado. Rutinas personales y finanzas sin tocar.
- Contenido de cada bloque = la app: `scratchpad/v606/cal_v606b_blocks.js` (copia de `check_bloques_v606a.js` que vuelca `scratchpad/v606/bloques_v606b.json`) y `scratchpad/v606/guias_full_v606b.js` (guías completas → `guias_full_v606b.json`); `check_bloques_v606a.js` = 0 guías fuera de su bloque.
- Prioridad: el mié 4 se escribió primero (`updated` 16:15:16Z = 11:15 Lima).

## Operaciones (93 escrituras = 81 `update_event` + 12 `create_event`; `updated` 16:15:16Z → 16:20:43Z = 11:15 → 11:21 Lima)

### A. MIÉ 4 (mañana) = plan del lun 2 · 12 `update_event` (16:15:16Z → 16:15:58Z)

| # | Id | Cambio |
|---|---|---|
| 1 | `o1gla7846uae4tgngvc4q45osg` (🎯 UWSA1) | mar 3 08:50-13:00 → **mié 4 08:50-13:00** · título «🎯 UWSA1 — BASELINE Step 1 (160Q · 4 bloques) · v6.06b (HOY mié 4 = plan del lun 2)» · descripción v6.06b (`payloads/uwsa1_desc.txt`): «SE HACE HOY, MIÉ 4-NOV (v6.06b … MIÉRCOLES a DOMINGO …)» · resto del vídeo Palmerton 26:00-38:13 → D3 = vie 6-nov 05:00 · 13:30 💎 Derma d1 (Research M1 = jue 5-nov 13:30) · Day-After 1/6 HOY 18:00 · 2/6 jue 5 05:00 · 3/6 jue 5 07:15 · 4/6 jue 5 18:00 · 5/6 vie 6 18:00 · 6/6 + eval reducida sáb 7 18:00 · eval de cierre dom 8 18:00 · ENSAYO TEST-DAY noche del mar 3 (cena ligera, cama 21:00) · pre-test ENCAPS 1/2 hoy, 2/2 jue 5 16:15 · primer día de contenido = jue 5 (D2) · historial «→ v6.06b (3-nov) … UWSA1 MIÉ 4-NOV» · respaldos «… v606a/ y v606b/». Color 6 / FREE intactos |
| 2 | `b2qgtck9gai5cilr8qvbkd51t8_20261104T091500Z` (vibecoding) | «🧠 IA — VIBECODING · S1 2/5 construir (plan del mar 3)» → «… S1 1/5 definir (plan del lun 2)» |
| 3 | `n8641e63c3msrkbaq3mqdtbmj0_20261104T173000Z` (SYNAPSE) | 12:30-13:00 → **07:25-07:55** · «🧠 SYNAPSE — misión del día · d1 S1 (plan del lun 2) · adelantada a las 07:25 por el UWSA1» |
| 4 | `0h8emvdchmvh4sfddqqed3th8s_20261104T180000Z` (Business) | → «📚 BUSINESS D1 · Spark (Ratey) cap 1-3 (plan del lun 2) · en audio con el almuerzo» |
| 5 | `6us7kkdcuk3g7tm1cjes38leh0_20261104T183000Z` (R↔D) | «🔬 RESEARCH M1 … (plan del mar 3)» → «💎 DERMA d1 · lesiones elementales 1ª/2ª (plan del lun 2)» |
| 6 | `23t06e7foitmiqm24lpd0vo9jc_20261104T191500Z` (AURUM; popup 5′ intacto) | → «🪙 AURUM — Closer de ventas · D1 (plan del lun 2)» |
| 7 | `uiduvkfsgs43p1u1qk1vohih58_20261104T201500Z` (MIR eval) | → «🇪🇸 MIR — Evaluación Anclada · D1/78 (plan del lun 2)» |
| 8 | `hos0tfhsr2hdfs6cgv1rmejhrs_20261104T203000Z` (MIR deep) | → «🇪🇸 MIR — Deep Work Mini · D1/78 Epidemiología: ensayo clínico (plan del lun 2)» |
| 9 | `papebi46etlo8glgfs5akd5mig_20261104T211500Z` (ENCAPS) | → «🇵🇪 ENCAPS — dia 1 · eval (fallos previos) + PRE-TEST DE ARRANQUE 1/2 (20Q ciegas: II-3 · I-3 · V-2 · III-5 · 72 s/Q) (plan del lun 2)» |
| 10 | `bajf6riq56ns5u57b5lqqtb268_20261104T221500Z` (LIVIANO) | → «⚖️ LIVIANO — d1 FISIOLOGÍA · la obesidad como enfermedad (plan del lun 2)» |
| 11 | `c5e77csne1bnfps1iq7nqel84s_20261104T230000Z` (Eval) | → «🇺🇸 USMLE — Evaluación · DAY-AFTER UWSA1 1/6: medición + informe por sistema + auditoría (plan del lun 2)» |
| 12 | `43dq3oib16esjcqj1dcd8osot2_20261104T170000Z` (ALMUERZO; título «ALUMUERZO» intacto) | 12:00-12:30 → **13:00-13:30** · descripción = «🎯 HOY (mié 4-nov, UWSA1 08:50-13:00 · D1 del plan, corrido del lun 2 · v6.06b …) … 13:30 💎 Derma d1 (plan del lun 2; Research M1 = jue 5-nov) …» + el texto de la serie (`payloads/almuerzo_mie4.txt`) |

Sin tocar el mié 4: ANKI AM 05:00, repaso 07:15, pre-test 08:15, deep prime 09:00 y 30Q 11:00 (títulos genéricos de la serie; se solapan con la preparación y el UWSA1, como el mar 3 en §20).

### B. MAR 3 (hoy) = sin sesión · 16 `update_event` (16:16:04Z → 16:16:57Z)

| # | Id (instancia) | Cambio |
|---|---|---|
| 13-27 | las 15 instancias de plan del mar 3: `b2qgtck9…_20261103T091500Z` (vibecoding) · `9274q14d…_20261103T100000Z` (ANKI AM) · `76dnlc30…_20261103T121500Z` (repaso) · `c24k2n7k…_20261103T131500Z` (pre-test) · `iuhj8bus…_20261103T140000Z` (deep prime) · `q72kvc9p…_20261103T160000Z` (30Q) · `n8641e63…_20261103T173000Z` (SYNAPSE) · `0h8emvdc…_20261103T180000Z` (Business) · `6us7kkdc…_20261103T183000Z` (R↔D) · `23t06e7f…_20261103T191500Z` (AURUM) · `uiduvkfs…_20261103T201500Z` (MIR eval) · `hos0tfhs…_20261103T203000Z` (MIR deep) · `papebi46…_20261103T211500Z` (ENCAPS) · `bajf6riq…_20261103T221500Z` (LIVIANO) · `c5e77csn…_20261103T230000Z` (Eval) | título → «⏭ SIN SESIÓN (v6.06b: la semana va de mié 4 a dom 8) · » + el título de la serie (= el del lun 9) · el SYNAPSE además 07:25-07:55 → **12:30-13:00** (hora de la serie). Descripciones = las de la serie (no se tocaron) |
| 28 | `43dq3oib16esjcqj1dcd8osot2_20261103T170000Z` (ALMUERZO) | 13:00-13:30 con el párrafo «🎯 HOY (mar 3-nov …)» → **12:00-12:30** con el texto de la serie (`payloads/almuerzo_serie.txt`) |

### C. JUE 5 = plan del mar 3 · VIE 6 = plan del mié 4 · 20 `update_event`, solo título (16:17:04Z → 16:17:48Z)

Títulos = los que la v6.06a puso un día antes (jue 5 ← mié 4 de §20 · vie 6 ← jue 5 de §20):

| Serie | jue 5 (#29-38) | vie 6 (#39-48) |
|---|---|---|
| vibecoding 04:15 | «🧠 IA — VIBECODING · S1 2/5 construir (plan del mar 3)» | «… S1 3/5 construir (plan del mié 4)» |
| SYNAPSE 12:30 | «🧠 SYNAPSE — misión del día · d2 S1 (plan del mar 3)» | «… d3 S1 (plan del mié 4)» |
| Business 13:00 | «📚 BUSINESS D2 · Spark (Ratey) cap 4-6 (plan del mar 3)» | «📚 BUSINESS D3 · In Defense of Food (Pollan) parte 1-2 (plan del mié 4)» |
| R↔D 13:30 | «🔬 RESEARCH M1 · Dr. Ciro: 3 coautorías + el caso (plan del mar 3)» (+ overlay 🔬 M1, fila 93) | «💎 DERMA d2 · color, distribución y configuración (plan del mié 4)» |
| AURUM 14:15 | «🪙 AURUM — Closer de ventas · D2 (plan del mar 3)» | «… D3 (plan del mié 4)» |
| MIR eval 15:15 | «🇪🇸 MIR — Evaluación Anclada · D2/78 (plan del mar 3)» | «… D3/78 (plan del mié 4)» |
| MIR deep 15:30 | «🇪🇸 MIR — Deep Work Mini · D2/78 Epidemiología: clasificación de los estudios (plan del mar 3)» | «… D3/78 Epidemiología: pruebas diagnósticas (plan del mié 4)» |
| ENCAPS 16:15 | «🇵🇪 ENCAPS — dia 2 · eval II-3 + PRE-TEST DE ARRANQUE 2/2 (20Q ciegas: II-5 · I-4 · IV-1+IV-2 · II-4 · 72 s/Q) (plan del mar 3)» | «🇵🇪 ENCAPS — dia 3 · eval I-3 + BANCO V-2 · planeamiento estratégico + cola larga V-6 (plan del mié 4)» |
| LIVIANO 17:15 | «⚖️ LIVIANO — d2 FISIOLOGÍA · set point (plan del mar 3)» | «⚖️ LIVIANO — d3 FISIOLOGÍA · leptina (plan del mié 4)» |
| Eval 18:00 | «🇺🇸 USMLE — Evaluación · DAY-AFTER UWSA1 4/6: drill de cronología 4-6 (plan del mar 3)» | «… DAY-AFTER UWSA1 5/6: drill de cronología 7-9 (plan del mié 4)» |

Sin tocar jue 5 / vie 6: las 5 series USMLE de la mañana (jue 5 05:00 = Day-After 2/6, 07:15 = 3/6; vie 6 05:00 = Anki + resto del vídeo Palmerton: lo dicen la descripción del UWSA1 y la app).

### D. SÁB 7 = plan del jue 5 · 13 `update_event` (16:17:59Z → 16:18:40Z)

Los 12 sueltos de la v6.06a conservan id, hora y color; pasan al plan del JUE 5 (título + descripción «Semana corrida v6.06b (orden de Joseph del mar 3-nov): plan del jue 5 · qué/cuánto/cómo en Joseph MD → Home (manda la app) · desde el lun 9-nov nada cambia.» + el contenido del bloque según la app; `payloads/sab7_*.txt`):

| # | Id | Hora | Título nuevo |
|---|---|---|---|
| 49 | `ltloq4o1td5oobpgj56bggoh14` | 04:15-05:00 | «🧠 IA — VIBECODING · S1 4/5 verificar (plan del jue 5)» (el 5/5 = commit + verify 1 = SHIP S1 va el dom 8 04:15) |
| 50 | `mea8ohjr6o3vb39h24qmuc2ja8` | 05:00-05:45 | «🇺🇸 USMLE — ANKI AM (plan del jue 5)» |
| 51 | `t4g1ob3jkg3064kgb420bgo9e0` | 07:15-12:00 | «🇺🇸 USMLE — D4 Immunology · inmunidad innata/adaptativa + MHC + linfocitos T/B (plan del jue 5): repaso 07:15 · pre-test 08:15 · deep prime 09:00 · 10Q 11:00» |
| 52 | `6s27mfo9l4f13b8qlrplk32svc` | 12:30-13:00 | «🧠 SYNAPSE — misión del día · d4 S1 (plan del jue 5)» |
| 53 | `t8g7ucv80k8e9hut88c1vc05ik` | 13:00-13:25 | «📚 BUSINESS D4 · In Defense of Food parte 3 (plan del jue 5) · OUTPUT S1 → dom 8 13:00» (no es OUTPUT) |
| 54 | `r62qus6h1kh2ugci94pikp9oas` | 13:30-14:15 | «🔬 RESEARCH R0 · infra académica: cuentas (plan del jue 5)» (R0 no es hito: sin overlay) |
| 55 | `nhbr4kt8uns39m9sl70p7lcvvo` | 14:15-15:15 | «🪙 AURUM — Closer de ventas · D4 (plan del jue 5)» (popup 5′ intacto) |
| 56 | `hv09cnk6f5pj877p6avtnr2hi0` | 15:15-15:30 | «🇪🇸 MIR — Evaluación Anclada · D4/78 (plan del jue 5)» (= TEST DE CIERRE de Epidemiología según la app) |
| 57 | `kd2atvsr2po7dlpclktied5g4g` | 15:30-16:15 | «🇪🇸 MIR — Deep Work Mini · D4/78 Bioética: principios + relación médico-paciente (plan del jue 5)» |
| 58 | `kmn3nn9lh0f662fivjuj5s7rkg` | 16:15-17:15 | «🇵🇪 ENCAPS — dia 4 · eval V-2 + BANCO III-5 · pertinencia cultural + cola larga II-6 (plan del jue 5) · mini-sim #5 → dom 8 16:15» |
| 59 | `afd1hma1td8giatbhkj707t5bg` | 17:15-18:00 | «⚖️ LIVIANO — d4 FISIOLOGÍA · resistencia leptínica (plan del jue 5) · caso 1 → dom 8 17:15» |
| 60 | `h4v11u125lv9nc4a7su27ne2v8` | 18:00-18:45 | «🇺🇸 USMLE — Evaluación · DAY-AFTER UWSA1 6/6 + EVAL reducida 5Q (plan del jue 5) · eval de cierre → dom 8 18:00» |
| 61 | `nsdnhm11ceicjmqvqc3qenin00_20261107T200000Z` (PC sábado) | dom 8 15:00-17:00 → **sáb 7 20:30-20:45** (hueco sin choque, tras el BAILE) | «⏭ SHIP S1: verify 1 al cerrar el k5 del dom 8 04:15 (semana corrida v6.06b)»; descripción de la serie intacta |

ANKI sáb `r9eglu07f5lvltvpoue3v4ks6o_20261108T000000Z` (sáb 7 19:00-19:30): sin cambio — ya dice «⏭ ANKI del sábado: hoy ya va el Anki AM 05:00 (semana corrida)», que sigue siendo cierto. REVISIÓN: ver fila 74.

### E. DOM 8 = plan del vie 6 + lo del sábado que cabe · 12 `create_event` (16:18:56Z → 16:19:40Z) + 4 `update_event` (16:19:50Z → 16:19:59Z)

Eventos sueltos nuevos (ids en `cal_bk/v606b/creados_v606b.json`); títulos = los del sáb 7 de la v6.06a; descripción «Semana corrida v6.06b (orden de Joseph del mar 3-nov): plan del vie 6 · …» + contenido del bloque (`payloads/dom8_*.txt`); colores de su serie; recordatorios por defecto salvo AURUM (popup 5′):

| # | Id | Hora | Evento |
|---|---|---|---|
| 62 | `llkpq3qk4s1rqumfom6uqnh80s` | 04:15-05:00 | «🧠 IA — VIBECODING · S1 5/5 ship-prep (plan del vie 6)» · color 9 (commit [S1] + `verify_vibecoding.js 1` = el SHIP S1 de esta semana) |
| 63 | `j908t69nrfalgth30pqcmh9f78` | 05:00-05:45 | «🇺🇸 USMLE — ANKI AM (plan del vie 6)» · color 2 |
| 64 | `1j4q1t25allju66uj92067b1ho` | 07:15-12:00 | «🇺🇸 USMLE — D5 Immunology · hipersensibilidades + autoinmunidad + inmunodeficiencias (plan del vie 6): repaso 07:15 · pre-test 08:15 · deep prime 09:00 · 10Q 11:00» · color 2 |
| 65 | `dgp81u0ts475e79uud3i9o07io` | 12:30-13:00 | «🧠 SYNAPSE — misión del día · d5 S1 (plan del vie 6)» · color 9 |
| 66 | `pisui6l32lup2manlr8ph5jf1o` | 13:00-13:25 | «📚 BUSINESS D5 · OUTPUT S1: régimen biológico del fundador v1 (plan del vie 6)» · color 8 |
| 67 | `m5kfeibl9n4f73dtjg0eml6id8` | 13:30-14:15 | «💎 DERMA d3 · estructura de la piel + TEST ProMIR cap. 1 (plan del vie 6)» · color 1 |
| 68 | `dntuqunousie5ucsbln4lb8vn0` | 14:15-15:15 | «🪙 AURUM — Closer de ventas · D5 (plan del vie 6)» · color 5 · popup 5′ |
| 69 | `52knegp2488otu91egpk9hhcjo` | 15:15-15:30 | «🇪🇸 MIR — Evaluación Anclada · D5/78 (plan del vie 6)» · color 1 (= TEST DE CIERRE de Medicina Legal y Bioética según la app) |
| 70 | `b47i6kev11p5lhrt8phg21qndk` | 15:30-16:15 | «🇪🇸 MIR — Deep Work Mini · D5/78 Cardiología básica (plan del vie 6)» · color 1 |
| 71 | `0gqu8ee6pqdo9q9t8aeamv9kgk` | 16:15-17:15 | «🇵🇪 ENCAPS — dia 5 · MINI-SIM #5 25Q (cola larga II-2 + I-10 · 72 s/Q) (plan del vie 6)» · color 1 |
| 72 | `05a65nird76bpo9iceaaf78gp0` | 17:15-18:00 | «⚖️ LIVIANO — d5 · CASO 1/16: la que se culpa (plan del vie 6)» · color 7 |
| 73 | `3ukfekbe1m211qqlm8ldhupemo` | 18:00-18:45 | «🇺🇸 USMLE — EVAL de cierre de la semana 1 (D1-D5) (plan del vie 6)» · color 11 |
| 74 | `k8iaefnjq0mnrlvkilhcarrik8_20261107T121500Z` (📋 REVISIÓN) | dom 8 14:15-14:45 → **dom 8 19:00-19:30** | «📋 REVISIÓN SEMANAL · S01 (semana corrida: dom 8 19:00)»; descripción de la serie intacta |
| 75 | `6l4vuftusp5m1vavobjfqnc1ag` (cierre OUTPUT, suelto de la v6.06a) | dom 8 14:45-15:00 → **dom 8 19:30-19:45** | «📚 BUSINESS — cierre del OUTPUT S1 (semana corrida: dom 8 19:30)» + descripción v6.06b (`payloads/cierre_output.txt`) |
| 76 | `5s64scagno3jo983gg6rfdo5qg_20261108T220000Z` (ANKI dom) | 17:00-17:15 (chocaba con el mini-sim) → **20:00-20:15** | «⏭ ANKI del domingo: hoy ya va el Anki AM 05:00 (semana corrida v6.06b)» |
| 77 | `fvbccognpru6jh6u4g8qhnud7g_20261108T200000Z` (PC domingo; era «🧠 Feynman S1 (opcional · semana corrida)» 17:15-17:25) | → **20:15-20:25** | «⏭ PC domingo / Feynman S1: sin hueco esta semana (semana corrida v6.06b · dom 8 = plan del vie 6)» |

### F. LUN 2 = sin sesión · 15 `update_event` (16:20:07Z → 16:20:42Z)

| # | Id | Cambio |
|---|---|---|
| 78-92 | las 15 instancias del lun 2 que la v6.06a marcó con ⏭ (mismas 15 series que el mar 3) | prefijo «⏭ SIN SESIÓN (v6.06a: la semana va de mar 3 a sáb 7) · » → «⏭ SIN SESIÓN (v6.06b: la semana va de mié 4 a dom 8) · »; hora, descripción y color intactos (SYNAPSE 12:30 y ALMUERZO 12:00 ya estaban en su hora de serie) |

### G. Overlay 🔬 M1 · 1 `update_event` (16:20:43Z)

| # | Id | Cambio |
|---|---|---|
| 93 | `shkul14j3o1bs1a5044u8ge1kk` | mié 4 13:30-14:15 → **jue 5 13:30-14:15** (fecha REAL de M1: `fechaRealDe('2026-11-03', undefined, 'research-derma')` = 2026-11-05 en el gemelo node de `gen_fechas_v6.js`); título, descripción, color 6 y FREE intactos |

Research: `node DATA/_scripts/gen_research_calendar.js --check` → 1 `recrear` (M1 «creado para 2026-11-04»; payload = jue 5 13:30-14:15, mismo título y misma descripción que el evento) → `node DATA/_scripts/gen_research_calendar.js` (escribe la payload pendiente) → `--set mentor=shkul14j3o1bs1a5044u8ge1kk` (registra fecha 2026-11-05 · hash `be6c7053a973`; antes 2026-11-04 · `8aff6fadd9b5`) → **`--check` = 0** (12 hitos, 0 con acción pendiente). `DATA/RESEARCH/_calendar_overlays.json`: solo cambia la entrada `mentor` (fechaCreada, hash, payload.fecha/startTime/endTime/hash); respaldo previo en `cal_bk/v606b/_calendar_overlays.json.bak`. `gen_research_calendar.js` no se tocó en esta ronda.

## Verificación (list_events 2 → 9-nov después de los cambios)

Volcado después (≈11:21 Lima): `cal_bk/v606b/volcados/list_02-09nov_after.json` (222 eventos = 210 + 12 creados). Script `cal_bk/v606b/ver_v606b.js <scratchpad/v606/bloques_v606b.json>` (sale 0): **1006 OK · 0 FAIL**.

- 81 eventos tocados × 8 comprobaciones (título, inicio, fin, descripción byte a byte contra `ops_v606b.json`/payloads, color, estado, transparencia, recordatorios) + 12 creados (título, hora, color, descripción byte a byte, estado, recordatorios; AURUM popup 5′).
- **129/129 eventos restantes idénticos** (título, descripción, color, estado, transparencia, hora): todo el lun 9-nov, rutinas personales, finanzas (IBKR jue 5), YouTube sáb 7, ANKI sáb 19:00, BAILE, etc. Exactamente 12 eventos nuevos = los de `creados_v606b.json`.
- **Cruce app ↔ Calendar (mié 4 → dom 8): 57/57 bloques** de `plantillaDelDia` (fecha y hora de plan de cada bloque) tienen su evento a su hora con «(plan del <día>)» = fecha de plan del bloque (o el UWSA1 el mié 4, las series USMLE de la mañana con título genérico jue 5 / vie 6, la REVISIÓN S01 y el cierre del OUTPUT el dom 8). **lun 2: 15/15 y mar 3: 15/15 instancias «⏭ SIN SESIÓN (v6.06b …)»**; 0 títulos «v6.06a: la semana va de mar 3 a sáb 7»; 0 «(plan del …)» el lun 2 / mar 3. Overlay M1 en jue 5 13:30 y su payload de `_calendar_overlays.json` = el evento.

| Día | Resultado |
|---|---|
| lun 2-nov (sin estudio) | ✅ 15 «⏭ SIN SESIÓN (v6.06b: la semana va de mié 4 a dom 8) · …» · SYNAPSE 12:30 · ALMUERZO 12:00 (texto de la serie) |
| mar 3 (sin estudio, hoy) | ✅ 15 «⏭ SIN SESIÓN (v6.06b …)» · SYNAPSE 12:30-13:00 · ALMUERZO 12:00-12:30 (texto de la serie) · el UWSA1 ya no está |
| mié 4 (= plan del lun 2) | ✅ vibecoding S1 1/5 · SYNAPSE 07:25 d1 · UWSA1 08:50-13:00 (descripción v6.06b) · ALMUERZO 13:00-13:30 («HOY mié 4») · Business D1 13:00 (audio) · DERMA d1 · AURUM D1 · MIR D1/78 · ENCAPS PRE-TEST 1/2 · LIVIANO d1 · Day-After 1/6 18:00 |
| jue 5 (= plan del mar 3) | ✅ S1 2/5 · d2 · Business D2 · RESEARCH M1 13:30 (+ overlay 🔬 M1 13:30-14:15) · AURUM D2 · MIR D2/78 · ENCAPS PRE-TEST 2/2 · LIVIANO d2 · Day-After 4/6 |
| vie 6 (= plan del mié 4) | ✅ S1 3/5 · d3 · Business D3 · DERMA d2 · AURUM D3 · MIR D3/78 · ENCAPS banco V-2 · LIVIANO d3 · Day-After 5/6 |
| sáb 7 (= plan del jue 5) | ✅ 12 sueltos 04:15 → 18:45 (S1 4/5 · D4 Immunology · d4 · Business D4 · RESEARCH R0 · AURUM D4 · MIR D4/78 · ENCAPS banco III-5 · LIVIANO d4 · Day-After 6/6 + eval reducida) · ANKI sáb 19:00 ⏭ · PC sábado ⏭ 20:30-20:45 |
| dom 8 (= plan del vie 6) | ✅ 12 sueltos 04:15 → 18:45 (S1 5/5 ship-prep · D5 Immunology · d5 · OUTPUT S1 · DERMA d3 · AURUM D5 · MIR D5/78 · MINI-SIM #5 · CASO 1 · eval de cierre) · 19:00 REVISIÓN S01 · 19:30 cierre OUTPUT S1 · 20:00 ANKI dom ⏭ · 20:15 PC domingo ⏭ |
| lun 9-nov | ✅ sin cambio |

## No tocado / notas para el orquestador

1. **Masters sin tocar** → sus descripciones siguen en v6.06 (lun 2 = D1 · «sáb 7 / dom 8-nov libres» · REVISIÓN «S01 sáb 7-nov» · PC sábado «SHIP S1 sáb 7-nov», etc.). Mandan los títulos «(plan del …)», la descripción del UWSA1 y la app.
2. **Solapes con rutinas personales (decisión de Joseph; no tocados):** sáb 7 «CREACIÓN DE VIDEO YOUTUBE EMPRESA» 17:00-19:00 (`5tbl422agrtls8kc62skirc0pu_20261107T220000Z`) pisa LIVIANO d4 17:15 y la eval 18:00 (aviso en la descripción de la eval). **Dom 8** (el domingo ahora es de estudio): «BAILE PRACTICA» 17:15-17:30 (`13m3tcqjjc34rt6iqfblla18q1_20261108T221500Z`), «ALISTARSE» 17:30, «VIAJE» 17:45, «BAILE» 18:00-19:30 (`7j6pucil43vuca70p082g5ub3d_20261108T230000Z`) y «VIAJE(PODCAST O ANKI)» 19:30-20:00 (`2itel1iq2gn05it50c26difdmk_20261109T003000Z`) se solapan con LIVIANO caso 1 17:15, la eval de cierre 18:00, la REVISIÓN S01 19:00 y el cierre del OUTPUT 19:30 (avisos en las descripciones de la eval y del cierre). Sáb 7 y dom 8 no hay evento de almuerzo (la serie ALMUERZO es L-V): hueco 12:00-12:30 libre.
3. Los ⏭ del fin de semana se movieron a huecos sin choque: PC sábado sáb 7 20:30-20:45 (2 h → 15′), ANKI dom 20:00-20:15, PC domingo 20:15-20:25 (todo antes del DORMIR 21:00).
4. **Textos Research con fechas de plan:** la descripción del overlay CR-1 (lun 7-dic, `36tp7b995jnoi844d5uvgm58t0`) dice «pide el caso el mar 3-nov» (real: jue 5) — no tocado (≥ lun 9-nov nada cambia; `--check` no lo marca).
5. **Repo:** solo `DATA/RESEARCH/_calendar_overlays.json` (entrada `mentor`) cambia en esta ronda, sin commit. `.claude/settings.local.json`, `DATA/PENDIENTES_JOSEPH.md` y `DATA/REVISION_SEMANAL.md` ya estaban modificados y no son de esta ronda. `CAL_V6.md` NO editado (este registro es el texto para su §21). Respaldos, volcados, payloads, ops y scripts en `DATA/_v600/cal/cal_bk/v606b/` (ignorado por git).

## 22. Semana corrida v6.06c (mié 4-nov-2026 · arranque el jue 5 · 10 días seguidos jue 5 → sáb 14 · dom 15 de cierre)
Registro del Google Calendar (josephsototocas@gmail.com · America/Lima) para la orden de Joseph del mié 4-nov (sin estudio ese día): «que comience desde mañana 5; jueves, viernes, sábado, domingo son apenas 4: el día que falta corre a la semana siguiente, y a esa semana de lunes a viernes agrégale el sábado 14; de ahí continúa normal; a partir del 16 no modifiques nada». La app ya lo aplica (commit `29566d6`, `corrida_s1` v6.06c de `DATA/_scripts/_fechas_v6.json`): lun 2, mar 3 y mié 4 sin sesión · jue 5 = plan del lun 2 (D1, UWSA1 08:50-13:00, SYNAPSE 07:25, ALMUERZO 13:00) · vie 6 = mar 3 · sáb 7 = mié 4 · dom 8 = jue 5 · lun 9 = vie 6 (mini-sim ENCAPS #5, OUTPUT S1, caso 1 LIVIANO, eval de cierre) · mar 10 = lun 9 · mié 11 = mar 10 · jue 12 = mié 11 · vie 13 = jue 12 · sáb 14 = vie 13 (NBME 25 07:00-12:30, SYNAPSE 13:00, sin Business) · dom 15 = revisión S01 07:15 · cierre del OUTPUT S1 07:45 · revisión S02 08:15 · OUTPUT S2 entero 08:45 · SHIP S1 09:30-11:30 · Feynman 14:45 (opcional) · SHIP S2 15:00-17:00 · Anki 17:00. Desde el lun 16-nov nada cambia. Sustituye a la v6.06b (§21); mismo patrón (por INSTANCIA, sin tocar masters, + eventos sueltos de fin de semana).

### Protocolo

- Volcado `list_events` 2 → 17-nov (389 eventos, 2 páginas) el mié 4 ≈10:40 Lima ANTES de escribir: `DATA/_v600/cal/cal_bk/v606c/volcados/list_02-17nov_before.json`; respaldo JSON por evento a tocar (154) en `cal_bk/v606c/<id>.json`; `_calendar_overlays.json.bak` antes del `--set`.
- Plan reproducible: `cal_bk/v606c/build_v606c.js` (respaldos, payloads y `ops_v606c.json` = estado objetivo de las 165 escrituras desde el volcado «before»; reemplazos de UWSA1 y NBME 25 con aserción «exactamente una vez»). Payloads en `cal_bk/v606c/payloads/`.
- `notificationLevel: NONE` en todo. Ningún master tocado, ninguna serie recreada, RRULE/EXDATE intactos, sin `delete_event`. Nada ≥ lun 16-nov tocado. Rutinas personales y finanzas sin tocar.
- Contenido de cada bloque = la app: `scratchpad/v606/cal_v606c_blocks.js` + `guias_full_v606c.js` (copias en `cal_bk/v606c/bloques_v606c.json` y `guias_full_v606c.json`).
- Orden: jue 5 → mié 4 (hoy) → sueltos (sáb 7, dom 8, sáb 14, dom 15) y overlay M1 → vie 6 → lun 9 → vie 13 → mar 3 y lun 2 (los series con descripción larga, al final, porque la respuesta del MCP devuelve la descripción entera).

### Operaciones (165 escrituras = 154 `update_event` + 11 `create_event`; `updated` 15:47:33Z → 15:59:37Z = 10:47 → 10:59 Lima)

**A. JUE 5 = plan del lun 2 · 12 `update_event`.** UWSA1 `o1gla7846uae4tgngvc4q45osg`: solo descripción v6.06c (`payloads/uwsa1_desc.txt`, 11 reemplazos: SE HACE HOY JUE 5-NOV · Research M1 vie 6 · resto del vídeo Palmerton sáb 7 05:00 · Day-After 1/6 jue 5 18:00, 2/6 vie 6 05:00, 3/6 vie 6 07:15, 4/6 vie 6 18:00, 5/6 sáb 7 18:00, 6/6 + eval reducida dom 8 18:00, eval de cierre lun 9 18:00 · noche anterior mié 4 · pre-test ENCAPS 2/2 vie 6 · primer contenido vie 6 · NBME 25 sáb 14 · historial v6.06c · respaldos v606c/). SYNAPSE `n8641e63…_20261105T173000Z` 12:30 → **07:25-07:55** «d1 S1 (plan del lun 2) · adelantada a las 07:25 por el UWSA1». ALMUERZO `43dq3oib…_20261105T170000Z` 12:00 → **13:00-13:30** con el «🎯 HOY (jue 5-nov …)» + texto de la serie (`payloads/almuerzo_jue5.txt`). Títulos «(plan del lun 2)» en vibecoding, Business, R↔D (DERMA d1), AURUM, MIR ×2, ENCAPS (PRE-TEST 1/2), LIVIANO y Eval (DAY-AFTER 1/6). Las 5 series USMLE de la mañana quedan con título genérico (como el mié 4 de §21).

**B. MIÉ 4 (hoy) = sin sesión · 16 `update_event`.** 15 instancias de plan → «⏭ SIN SESIÓN (v6.06c: arranca el jue 5) · » + título de la serie · SYNAPSE 07:25 → **12:30-13:00** · ALMUERZO 13:00 → **12:00-12:30** con el texto de la serie.

**C. VIE 6 = plan del mar 3 · 11 `update_event`.** 10 títulos (S1 2/5 · d2 · Business D2 · RESEARCH M1 · AURUM D2 · MIR D2/78 ×2 · ENCAPS PRE-TEST 2/2 · LIVIANO d2 · DAY-AFTER 4/6) + overlay 🔬 M1 `shkul14j3o1bs1a5044u8ge1kk` jue 5 → **vie 6 13:30-14:15**.

**D. SÁB 7 = plan del mié 4 · 12 `update_event`.** Los 12 sueltos de la v6.06a conservan id y hora y pasan a título, descripción y contenido del plan del mié 4 (`payloads/sab7_*.txt`): `ltloq4o1…` S1 3/5 · `mea8ohjr…` ANKI AM (+ vídeo Palmerton 26:00-38:13) · `t4g1ob3j…` D3 Pathoma 3 neoplasia · `6s27mfo9…` d3 · `t8g7ucv8…` Business D3 · `r62qus6h…` DERMA d2 · `nhbr4kt8…` AURUM D3 · `hv09cnk6…` MIR D3 · `kd2atvsr…` MIR D3 pruebas diagnósticas · `kmn3nn9l…` ENCAPS banco V-2 · `afd1hma1…` LIVIANO d3 · `h4v11u12…` DAY-AFTER 5/6. ANKI sáb `r9eglu07…_20261108T000000Z`: sin cambio (ya era ⏭).

**E. DOM 8 = plan del jue 5 · 14 `update_event`.** Los 12 sueltos de la v6.06b conservan id y hora y pasan al plan del jue 5 (texto = el del sáb 7 v6.06b con los «→ dom 8» corridos al lun 9; `payloads/dom8_*.txt`): `llkpq3qk…` S1 4/5 · `j908t69n…` ANKI AM · `1j4q1t25…` D4 Immunology · `dgp81u0t…` d4 · `pisui6l3…` Business D4 · `m5kfeibl…` RESEARCH R0 · `dntuquno…` AURUM D4 · `52knegp2…` MIR D4 (test de cierre) · `b47i6kev…` MIR D4 Bioética · `0gqu8ee6…` ENCAPS banco III-5 · `05a65nir…` LIVIANO d4 · `3ukfekbe…` DAY-AFTER 6/6 + eval reducida. ANKI dom y PC domingo: quedan ⏭ en 20:00 y 20:15, con rótulo v6.06c.

**F. LUN 9 = plan del vie 6 · 10 `update_event` (solo título).** S1 5/5 ship-prep · d5 · Business D5 OUTPUT S1 · DERMA d3 · AURUM D5 · MIR D5/78 ×2 · ENCAPS MINI-SIM #5 · LIVIANO CASO 1/16 · EVAL de cierre de la semana 1.

**G. MAR 10 → VIE 13 = plan del lun 9 → jue 12 · 41 `update_event`.** 40 títulos «(plan del …)» (S2 1/5-4/5 · d8-d11 · Business D8-D11 · RESEARCH R1 · DERMA d4 · RESEARCH C-1 · DERMA d5 · AURUM D6-D9 · MIR D6-D9 ×2 · ENCAPS dias 6-9 · LIVIANO d6-d9 · Evaluación 10Q). En el vie 13: SYNAPSE 13:00 → **12:30-13:00**, Business `0h8emvdc…_20261113T180000Z` sáb 14 07:45 → **vie 13 13:00-13:25** «BUSINESS D11 · Why We Sleep parte 4 (plan del jue 12)» y ALMUERZO 12:30 → **12:00-12:30**.

**H. SÁB 14 = plan del vie 13 · 2 `update_event` + 10 `create_event`.** NBME 25 `4hjv5lkvluj06ahc2qndtsi6as` vie 13 → **sáb 14 07:00-12:30** «· v6.06c (sáb 14 = plan del vie 13)» + descripción (`payloads/nbme25_desc.txt`: HOY ES SÁBADO, plan del vie 13; sin Business; OUTPUT S2 dom 15 08:45). ANKI sáb 14 → «⏭ ANKI del sábado: hoy ya va el Anki AM 05:00 (semana corrida)». Sueltos nuevos (`cal_bk/v606c/creados_v606c.json`, recordatorios por defecto salvo AURUM popup 5′):

| Id | Hora | Evento |
|---|---|---|
| `isqugnfsfm7ft7t8q6qm4np090` | 04:15-05:00 | S2 5/5 ship-prep · color 9 |
| `hute83upd2eqfiugn0ccmrhe0s` | 05:00-05:45 | ANKI AM · color 2 |
| `6cg96n0226ot214f468ui02bl0` | 13:00-13:30 | SYNAPSE d12 S2 · color 9 |
| `l6n44irta9nnp6od4l0gh65tj8` | 13:30-14:15 | RESEARCH M2 · color 1 |
| `kk0sfi0p01jquthnc7db4s2i9c` | 14:15-15:15 | AURUM D10 · color 5 · popup 5′ |
| `7kcjnt7k2rvsbcdvpmfd34bngo` | 15:15-15:30 | MIR eval D10/78 · color 1 |
| `td1leig3psqkq0iuen3ptul4o0` | 15:30-16:15 | MIR deep D10/78 · color 1 |
| `hvgss87qhbffbfdh95mal6jb20` | 16:15-17:15 | ENCAPS MINI-SIM #10 · color 1 |
| `cmmeaejicdj3psd39n1qn6ktdc` | 17:15-18:00 | LIVIANO CASO 2/16 · color 7 |
| `519rk2sbi7qd8frmg9eq2en2ps` | 18:00-18:45 | DAY-AFTER NBME 25 1/6 · color 11 |

**I. DOM 15 · 6 `update_event` + 1 `create_event`.** REVISIÓN `k8iaefnj…_20261107T121500Z` → **07:15-07:45** «S01 (semana corrida: dom 15)» · cierre OUTPUT `6l4vuftusp5m1vavobjfqnc1ag` → **07:45-08:00** (+ descripción nueva) · REVISIÓN `…_20261114T121500Z` → **08:15-08:45** «S02» · OUTPUT S2 entero suelto nuevo `mv94gga0bm9npbiios66d5he4o` **08:45-09:25** color 8 · PC sábado `nsdnhm11…_20261107T200000Z` → **09:30-11:30** «SHIP S1 (semana corrida: dom 15)» · PC domingo `fvbccogn…_20261115T200000Z` → **14:45-14:55** «Feynman S2 (opcional)» · PC sábado `nsdnhm11…_20261114T200000Z` → **15:00-17:00** «SHIP S2 (semana corrida: dom 15)». Anki 17:00 sin cambio.

**J. LUN 2 y MAR 3 · 30 `update_event`.** Prefijo «⏭ SIN SESIÓN (v6.06b …)» → «⏭ SIN SESIÓN (v6.06c: arranca el jue 5) · » (solo título).

### Research

`gen_research_calendar.js --check` = 1 `recrear` (M1 → vie 6) → update del overlay → `node …gen_research_calendar.js` → `--set mentor=shkul14j3o1bs1a5044u8ge1kk` → **`--check` = 0** (12 hitos). `DATA/RESEARCH/_calendar_overlays.json`: solo la entrada `mentor` (sin commit).

### Verificación (list_events 2 → 17-nov después de los cambios)

Volcado final (≈11:00 Lima): `cal_bk/v606c/volcados/list_02-17nov_after.json` (400 eventos = 389 + 11 creados). Script `cal_bk/v606c/ver_v606c.js`: **1298 OK · 0 FAIL**.

- 165 escrituras comprobadas contra `ops_v606c.json`: título, inicio, fin, descripción byte a byte (payloads o la del volcado «before»), color, estado, transparencia y recordatorios; AURUM del sáb 14 con popup 5′.
- **235/235 eventos no tocados idénticos**; todo lo ≥ lun 16-nov igual al «before» (id, título, descripción, inicio y fin). Exactamente 11 eventos nuevos = los de `creados_v606c.json`.
- **Cruce app ↔ Calendar (jue 5 → dom 15): 117/117 bloques** de `plantillaDelDia` con su evento a su hora y «(plan del <día>)» = fecha de plan del bloque (o UWSA1 / NBME 25 / las series USMLE de la mañana con título genérico / el reparto del dom 15). 0 títulos «v6.06b» ni «→ dom 8» ni «dom 8 19:». `gen_research_calendar.js --check` = 0.

| Día | Resultado |
|---|---|
| lun 2 · mar 3 | ✅ 15 + 15 «⏭ SIN SESIÓN (v6.06c: arranca el jue 5) · …» |
| mié 4 (hoy) | ✅ 15 ⏭ · SYNAPSE 12:30 · ALMUERZO 12:00 (texto de la serie) · sin UWSA1 |
| jue 5 | ✅ plan del lun 2 · SYNAPSE 07:25 · UWSA1 08:50-13:00 · ALMUERZO 13:00 · Business D1 · DERMA d1 · AURUM D1 · MIR D1/78 · PRE-TEST 1/2 · LIVIANO d1 · Day-After 1/6 |
| vie 6 | ✅ plan del mar 3 · RESEARCH M1 + overlay 🔬 13:30 · PRE-TEST 2/2 · Day-After 4/6 |
| sáb 7 | ✅ plan del mié 4 · 12 sueltos · ENCAPS banco V-2 · Day-After 5/6 · ANKI ⏭ · PC sábado fuera (dom 15) |
| dom 8 | ✅ plan del jue 5 · 12 sueltos · ENCAPS banco III-5 · Day-After 6/6 · ANKI ⏭ y PC domingo ⏭ · revisión y cierre fuera (dom 15) |
| lun 9 | ✅ plan del vie 6 · OUTPUT S1 · MINI-SIM #5 · CASO 1 · EVAL de cierre |
| mar 10 → jue 12 | ✅ plan del lun 9 → mié 11 |
| vie 13 | ✅ plan del jue 12 · sin NBME · ALMUERZO 12:00 · SYNAPSE 12:30 · Business D11 13:00 |
| sáb 14 | ✅ plan del vie 13 · 04:15 · 05:00 · NBME 25 07:00-12:30 · SYNAPSE 13:00 · RESEARCH M2 · AURUM D10 · MIR D10 · MINI-SIM #10 · CASO 2 · Day-After 1/6 · ANKI ⏭ · sin Business |
| dom 15 | ✅ 07:15 S01 · 07:45 cierre OUTPUT S1 · 08:15 S02 · 08:45 OUTPUT S2 · 09:30 SHIP S1 · 14:45 Feynman S2 · 15:00 SHIP S2 · 17:00 Anki |
| lun 16 | ✅ sin cambio |

### Solapes con rutinas personales (decisión de Joseph; no tocados)

- jue 5: IBKR 09:30-09:45 (`578akcncfju9npnfj1ku44iruc`) cae dentro del UWSA1 (Bloque 2). Ojo: es una acción con horario de mercado; hay que hacerla fuera del sim o moverla.
- sáb 7 y sáb 14: CREACIÓN DE VIDEO YOUTUBE 17:00-19:00 pisa el final de ENCAPS (17:00-17:15), LIVIANO y la eval/Day-After.
- dom 8: BAILE PRACTICA 17:15, ALISTARSE 17:30, VIAJE 17:45 y BAILE 18:00-19:30 pisan LIVIANO d4 y el DAY-AFTER 6/6 18:00.
- sáb 14: DESAYUNO 06:45-07:15 pisa los 15′ primeros del NBME 25 (el texto del NBME pide desayuno ≥30′ antes y sentarse 06:55: adelantar el desayuno ese día).
- sáb 7, dom 8 y sáb 14: sin evento de almuerzo (la serie ALMUERZO es L-V): hueco 12:00-12:30; el sáb 14 la comida va 12:30-13:00 (la app lo dice y el texto del NBME también).
- mar 10: ALISTARSE 18:30 pisa el final de la eval, igual que todos los martes del plan (no es nuevo).

### Notas para el orquestador

1. **Masters sin tocar** → sus descripciones siguen en v6.06 (lun 2 = D1 · REVISIÓN «S01 sáb 7-nov» · PC sábado «SHIP S1 sáb 7-nov» · NBME 25 vie 13-nov, etc.). Mandan los títulos «(plan del …)», las descripciones del UWSA1 y del NBME 25 y la app.
2. Las series USMLE de la mañana (05:00 · 07:15 · 08:15 · 09:00 · 11:00) del jue 5 → vie 13 conservan el título genérico (la tarea pedía 10 series); jue 5 se solapan con la preparación y el UWSA1, vie 6 05:00 = Day-After 2/6 y 07:15 = 3/6 (lo dice la descripción del UWSA1 y la app).
3. ENCAPS del lun 9 → vie 13: los títulos dicen «dia 6 · eval (fallos del mini-sim #5)» y siguientes; la app avisa «runner POR GENERAR» en la semana 2.
4. Los ⏭ del dom 8 siguen en 20:00 y 20:15 (ANKI dom y PC domingo), porque a las 17:00 chocaría con ENCAPS 16:15.
5. **Repo:** solo `DATA/RESEARCH/_calendar_overlays.json` (entrada `mentor`) cambia en esta ronda, sin commit. `CAL_V6.md` NO editado (este registro es el texto para su §22). Respaldos, volcados, payloads, ops y scripts en `DATA/_v600/cal/cal_bk/v606c/` (ignorado por git).

## 23. Semana corrida v6.06d (jue 5-nov-2026 · arranque el vie 6 · vie 6 → dom 15 corridos · lun 16 → vie 20 normales · cierres en sáb 14, sáb 21 y dom 22)
Registro del Google Calendar (josephsototocas@gmail.com · America/Lima) para la orden de Joseph del jue 5-nov (sin estudio ese día): «que todo comience mañana; falta un día: toma el 15, que era libre; los días libres recién empiezan el 21 y 22; solamente sacrificamos estos dos próximos sábado y domingo». La app ya lo aplica (commit `8aec807`).

### Protocolo

- Volcado `list_events` 5 → 24-nov (485 eventos, 2 páginas) el jue 5 ≈11:45 Lima, justo tras mover el UWSA1: `DATA/_v600/cal/cal_bk/v606d/volcados/list_05-24nov_before.json`; respaldo JSON por evento a tocar (127) en `cal_bk/v606d/<id>.json`; `_calendar_overlays.json.bak` antes del `--set`.
- Plan reproducible: `cal_bk/v606d/build_v606d.js` → `ops_v606d.json` (139 escrituras) + `payloads/`. Patrón: cada día real toma los títulos del día anterior (corrimiento de 1 día).
- `notificationLevel: NONE` en todo. Ningún master tocado, ninguna serie recreada, RRULE/EXDATE intactos, sin `delete_event`. Rutinas personales y finanzas sin tocar.

### Operaciones (139 escrituras = 127 `update_event` + 12 `create_event`)

| Sec | Día | Ops | Cambio |
|---|---|---|---|
| B | vie 6 = plan del lun 2 | 12 | UWSA1 08:50-13:00 + descripción · SYNAPSE 07:25 · ALMUERZO 13:00 · títulos |
| A | jue 5 = sin sesión | 16 | prefijo «⏭ SIN SESIÓN (v6.06d: arranca el vie 6)» · SYNAPSE 12:30 · ALMUERZO 12:00 con el texto de la serie |
| C | sáb 7 = plan del mar 3 | 13 | 12 sueltos conservan id y hora, cambian contenido · overlay 🔬 M1 → 13:30-14:15 |
| D | dom 8 = plan del mié 4 | 14 | 12 sueltos conservan id y hora, cambian contenido · ⏭ Anki y PC domingo |
| E | lun 9 = plan del jue 5 | 10 | solo títulos |
| F | mar 10 → vie 13 = plan del vie 6, lun 9, mar 10 y mié 11 | 40 | solo títulos |
| G | sáb 14 = plan del jue 12 | 15 | 12 sueltos nuevos (`creados_v606d.json`) · S01 19:00 · cierre OUTPUT S1 19:30 · ⏭ Anki → 20:00 |
| H | dom 15 = plan del vie 13 | 13 | NBME 25 07:00-12:30 · los 10 sueltos del sáb 14 pasan aquí, mismos ids · ⏭ Anki 20:00 y Feynman 20:15 |
| I | sáb 21 y dom 22 | 6 | S02 07:15 · OUTPUT S2 07:45 · S03 + cierre S3 08:30-09:15 · SHIP S1 09:30 · SHIP S2 dom 22 15:00 · Feynman S3 dom 22 14:45 |

### Research

`gen_research_calendar.js --set mentor=shkul14j3o1bs1a5044u8ge1kk` → **`--check` = 0** (12 hitos, M1 sáb 7).

### Verificación (list_events 5 → 24-nov después de los cambios)

Volcado final: `cal_bk/v606d/volcados/list_05-24nov_after.json` (497 eventos = 485 + 12 creados). Script `cal_bk/v606d/ver_v606d.js`: **1089 OK · 0 FAIL**.

- 139 escrituras comprobadas contra `ops_v606d.json`: título, inicio, fin, descripción byte a byte, color, estado, transparencia y recordatorios.
- **358/358 eventos no tocados idénticos**; lun 16 → vie 20 y desde el lun 23 iguales al «before». Exactamente 12 eventos nuevos.
- **Cruce app ↔ Calendar (vie 6 → dom 22): 120/121 bloques.** El que falta es el cierre del OUTPUT S3 de la app (sáb 21 09:00-09:15), que en el Calendar va dentro del evento S03 (08:30-09:15, lo dice el título). No es un error.
- 0 títulos obsoletos.

### No tocado

- Lun 2 → mié 4 conservan el prefijo «⏭ SIN SESIÓN (v6.06c …)»: días pasados, solo título (45 escrituras sin efecto práctico).
- Masters: sus descripciones siguen en v6.06. Mandan los títulos «(plan del …)», las descripciones del UWSA1 y del NBME 25 y la app.
- SHIP S3 del sáb 21 15:00-17:00 conserva el título de la serie.

### Solapes con rutinas personales (decisión de Joseph; no tocados)

Lista completa: `cal_bk/v606d/solapes_v606d.txt` (17).
- sáb 7 y sáb 14: CREACIÓN DE VIDEO YOUTUBE 17:00-19:00 pisa el final de ENCAPS, LIVIANO y la eval.
- dom 8 y dom 15: BAILE PRACTICA 17:15, ALISTARSE 17:30, VIAJE 17:45 y BAILE 18:00-19:30 pisan LIVIANO y el Day-After 18:00.
- dom 15: DESAYUNO 06:45-07:15 pisa los primeros 15′ del NBME 25: adelantarlo ese día.
- mar 10: ALISTARSE 18:30 pisa el final de la eval, como todos los martes.

## 24. Semana corrida v6.06e (vie 6-nov-2026 · arranque el dom 8 · semana de domingo a viernes · sábados libres · plan en fecha desde el lun 7-dic)
Registro del Google Calendar (josephsototocas@gmail.com · America/Lima) para la orden de Joseph del vie 6-nov (sin estudio ese día): «hoy no comenzamos, comenzamos el domingo 8; quita lo planeado en los sábados, los sábados no se avanza y son los únicos días libres; aumenta los domingos que sean necesarios para cumplir el plan en sus tiempos». La app ya lo aplica (commits `71e041e` y `fd7e63a`).

### Protocolo

- Volcado `list_events` 6-nov → 28-dic (1.285 eventos, 6 páginas) el vie 6 ≈10:15 Lima, justo tras mover el UWSA1: `DATA/_v600/cal/cal_bk/v606e/volcados/list_06nov-28dic_before.json`; respaldo JSON por evento a tocar (166) en `cal_bk/v606e/<id>.json`.
- Plan reproducible: `cal_bk/v606e/build_v606e.js` → `ops_v606e.json` (193 escrituras) + `payloads/`. Textos de los domingos generados desde las guías de la app (`guias_full_v606e.json`).
- `notificationLevel: NONE` en todo. Ningún master tocado, ninguna serie recreada, sin `delete_event`: los sueltos se reciclan moviéndolos. Rutinas personales y finanzas sin tocar.

### Operaciones (204 escrituras = 177 `update_event` + 27 `create_event`)

| Sec | Día | Ops | Cambio |
|---|---|---|---|
| A | vie 6 = sin sesión | 16 | prefijo «⏭ SIN SESIÓN (v6.06e: arranca el dom 8)» · SYNAPSE 12:30 · ALMUERZO 12:00 |
| B | dom 8 = plan del lun 2 | 15 | UWSA1 08:50-13:00 · los 12 sueltos del dom 8 cambian de contenido · SYNAPSE 07:25 · preparación 07:15-08:50 |
| C | dom 22 = plan del mié 18 | 13 | los 12 sueltos del sáb 7 pasan aquí · ⏭ Anki sáb 7 |
| D | dom 29 = plan del jue 26 · dom 15 noche | 15 | los 12 sueltos del sáb 14 pasan aquí · S01 y cierre S1 dom 15 20:00 · ⏭ Anki sáb 14 |
| E | dom 15 = plan del mar 10 · dom 6-dic = plan del vie 4 | 22 | 12 sueltos nuevos · los 10 sueltos del dom 15 pasan al dom 6-dic |
| G | hitos | 27 | NBME 25 mié 18 · NBME 26 dom 6-dic · gate vie 27-nov · Research M1 lun 9, C-2 vie 20, T-1 lun 23, C-6 vie 4-dic · vie 4-dic normal · 15 avisos de todo el día «📅 Hoy = plan del X» (lun 16 → vie 4-dic) |
| H | domingos de plan | 8 | ⏭ Anki y PC del domingo |
| I | sábados → domingos | 27 | S02-S08, OUTPUT S2, S5 y S7, SHIP S1-S7 y avance S8 a sus domingos |
| F | lun 9 → vie 13 | 50 | títulos: plan del mar 3, mié 4, jue 5, vie 6 y lun 9 |
| J | retoques de la auditoría | 11 | Anki + FSRS Optimize dom 13 20:00 · Feynman S1-S7 tras su SHIP · S09, SHIP S8 y Anki del sáb 2-ene al dom 3-ene |

La instancia Business del mié 18 (`0h8emvdc…_20261118T180000Z`) pasó al vie 4-dic 13:00: el día del NBME no lleva Business y la instancia propia del vie 4 es el OUTPUT S5.

### Research

`gen_research_calendar.js --set mentor=… carta-diana=… tesis-etica=… carta-1=…` → **`--check` = 0** (12 hitos).

### Verificación (list_events 6-nov → 28-dic después de los cambios)

Volcado final: `cal_bk/v606e/volcados/list_06nov-28dic_after.json` (1.312 eventos = 1.285 + 27 creados). Script `cal_bk/v606e/ver_v606e.js`: **1.320 OK · 0 FAIL**.

- Título, inicio, fin, descripción byte a byte, color, estado y transparencia de cada escritura hasta el 28-dic. Las 3 del dom 3-ene quedan fuera del volcado: confirmadas por la respuesta de cada `update_event`.
- **1.119 eventos no tocados idénticos.** Exactamente 27 eventos nuevos.
- **Sábados 7-nov → 26-dic: 0 bloques de plan** (solo ⏭ y rutinas personales).
- **Cruce app ↔ Calendar (dom 8 → dom 27-dic): 464/464 bloques.** Avisos: 15/15.

### No tocado

- Lun 2 → jue 5 conservan el prefijo ⏭ antiguo (días pasados, solo título).
- Lun 16 → vie 4-dic conservan el título genérico de la serie; el aviso de todo el día dice qué plan toca.
- Masters: sus descripciones siguen en v6.06. Mandan los títulos, las descripciones del UWSA1 y de los NBME, y la app.
- Sábados desde el 9-ene (F2 en adelante): sin tocar, decisión pendiente de Joseph.
- Vista Pulso: el viernes de plan con NBME enseña su OUTPUT el día del NBME (mié 18 y dom 6-dic), aunque el OUTPUT real va el domingo de cierres; manda el Home.

### Solapes con rutinas personales (decisión de Joseph; no tocados)

Lista completa: `cal_bk/v606e/solapes_v606e.txt` (24), más la de YouTube y el baile de los sábados, que siguen en el Calendar por ser rutinas personales.
- dom 8, 15, 22, 29-nov y 6-dic: BAILE PRACTICA 17:15, ALISTARSE 17:30, VIAJE 17:45 y BAILE 18:00-19:30 pisan LIVIANO y la evaluación de las 18:00.
- mié 18 y dom 6-dic: el desayuno pisa el inicio del NBME: adelantarlo.
- mar 10: ALISTARSE 18:30 pisa el final de la evaluación, como todos los martes.


## 25. v6.07 — ENCAPS PRIMER PUESTO (dom 8-nov-2026 · todo arranca el lun 9-nov · mañanas ENCAPS lun · mié · vie y Step 1 mar · jue · examen Step 1 lun 6-dic-2027)
Registro del Google Calendar (josephsototocas@gmail.com · America/Lima) para la v6.07. La app manda: commits `9f958d1`, `e5fd4bd` y `f4f611a` (REESTRUCTURACION §31).
**La v6.06a-e queda SIN EFECTO.** El §24 es historial: ya no hay alias, ni «plan del X», ni domingos de recuperación. Desde el lun 9-nov cada día hace el plan de su propia fecha.

### Protocolo (común a todos los lotes)
- Brief común: `cal_bk/v607/BRIEF_COMUN.md`.
- Fuente de cada día: `node DATA/_scripts/sim_plantilla_dia.js <fecha>`, a través del exportador de cada lote.
- Antes de escribir, cada lote hace un volcado `list_events` y un respaldo JSON de cada evento que va a tocar.
- Cada lote genera con `build_ops.js` un `ops.json` reproducible y apunta en `hecho.json` el resultado de cada escritura.
- Al final, cada lote verifica con un volcado nuevo.
- `notificationLevel: NONE` en todas las escrituras.
- Rutinas personales y finanzas: sin tocar. El ALMUERZO solo se mueve los días de hito.
- Masters: no se cambian títulos ni recurrencias; solo se reescribe la descripción, y solo después de probar que las excepciones la conservan.
- Para alargar una serie se crea una serie de continuación con EXDATE.
- Todo queda en `cal_bk/v607/<lote>/` (en .gitignore; el repo es público): `INFORME.md`, `ops.json`, `hecho.json`, `bk/`, `volcados/`.

### Lote 1a — lun 9 → dom 29-nov: 296 escrituras = 255 `update_event` + 41 `delete_event` (296/296 OK) · verificación **300 OK · 0 FAIL**
- **Días L-V:** se actualizaron las instancias de las 15 series del plan.
  - Lunes, miércoles y viernes: las 4 franjas USMLE de la mañana pasan a ser la **MAÑANA ENCAPS** (07:15-09:15 · 09:15-09:45 · 09:45-10:45 · 10:45-12:00) y las 18:00 pasan a «🇵🇪 ENCAPS 18:00 · cifras, normas y flashcards».
  - Martes y jueves: Step 1.
- **UWSA1** `o1gla7846uae4tgngvc4q45osg`: pasa al **mar 10-nov 08:50-13:00**, con su preparación `1j4q1t25allju66uj92067b1ho` de 07:15 a 08:50.
  - Se borran las 4 franjas USMLE de esa mañana.
  - El ALMUERZO del mar 10 pasa a las 13:00.
- **Sábados 14, 21 y 28-nov:** SYNAPSE 13:30 · REVISIÓN S01-S03 14:00 · Business 14:30 · preparar la clase 14:45 · **THEOMED EN VIVO 15:00-17:00** (CI 2/8 · ET 2/3 · GES 3/6) · ANKI 19:00. Se reciclaron 18 sueltos de la v6.06e y no se creó ninguno.
- **Domingos 15, 22 y 29-nov:** ENCAPS opcional 08:00-12:00, FEYNMAN 14:50 y SHIP 15:00-17:00, los tres «(flexible)» y FREE · ANKI 17:00.
- **Borrados:**
  - 19 sueltos v6.06e de los domingos;
  - los 15 avisos «📅 Hoy = plan del X»;
  - 3 instancias PC SÁBADO;
  - las 4 franjas USMLE del mar 10.

### Lote 2 — 2027 + hitos Step 1 + Research + fines de serie: 115 escrituras = 85 `update_event` + 17 `create_event` + 13 `delete_event` (115/115 OK · 0 FAIL)
- **Intensiva ENCAPS: dia 43-92 pasa a dia 38-87.**
  - Se actualizaron el banner y los masters de las 05:00, LOOP, carril B y reposición.
  - SIM #1-#10: el #6 del vie 19-feb pasa a las 11:00-13:00; el #8 (lun 1-mar), el #9 (mié 3-mar) y el #10 (vie 5-mar) van de 11:00 a 13:00.
  - También se actualizaron el pre-test (dia 42), el DRESS (dia 86), el D-1 07:15-12:00, el 🛡 12-mar y el EXAMEN ENCAPS del dom 14-mar.
  - Carril sábado de 09:30 a 10:30. Carril VIERNES el vie 5-mar a las 16:15.
- **Hitos Step 1 (mismos ids):**

  | Hito | Fecha |
  |---|---|
  | NBME 26 | vie 2-abr |
  | NBME 27 | vie 23-abr |
  | NBME 28 | jue 3-jun |
  | gates | lun 22-mar y mié 21-abr |
  | NBME 31 | lun 4-oct |
  | NBME 32 | lun 11-oct |
  | GO/NO-GO | lun 18-oct |
  | UWSA2 | mar 19-oct |
  | NBME 33 + 3 bloques | **lun 1-nov 07:00-16:30**, feriado |
  | Free 120 | lun 22-nov |
  | D94 / D95 | 2-dic / 3-dic |
  | ritual | sáb 4-dic |
  | viaje | dom 5-dic |
  | **EXAMEN** `oinh139dsnbuma9r3kfu56dhkc` | **lun 6-dic-2027 07:00-16:00** |
  | regreso | mar 7-dic |

  Cada hito tiene su ventana 🪟. NBME 29, NBME 30 y UWSA3 se quedan en su fecha; solo cambia el texto.
- **Series de continuación:**
  - vibecoding: lun 22 → mar 30-mar;
  - SYNAPSE: mié 17 → mar 23-mar;
  - LIVIANO: mar 16 → lun 22-mar;
  - Business: mié 3 → mar 9-mar;
  - Revisión semanal F4: sáb 23-oct → 27-nov.
- **Series nuevas:**
  - corrección del SIM de los viernes, 09:30-12:00 (15-ene → 12-feb);
  - cierre de Business del sábado;
  - SYNAPSE del sábado (9-ene → 20-mar);
  - FEYNMAN de enero.
- **Research:** los 12 overlays salen de `gen_research_calendar.js --print` y `--check` da 12/12.

### Lote 1b — lun 30-nov → dom 3-ene: 389 escrituras = 364 `update_event` + 13 `create_event` + 12 `delete_event` (389/389 OK) · verificación **398 OK · 0 FAIL**
- **Días L-V:** las 22 jornadas, con la misma convención que el lote 1a.
- **NBME 25** `4hjv5lkvluj06ahc2qndtsi6as`: pasa del mié 18-nov al **jue 10-dic 07:00-12:30**.
  - Se borran las 4 franjas USMLE de esa mañana.
  - ALMUERZO 12:30, Business 12:30-12:55 en audio y SYNAPSE 13:00.
- **CHECKPOINT DEL AÑO** vie 18-dic (dia 30). Avisos C1 (mar 29-dic) y C2 (mié 30-dic, simulacro de cierre).
- **Sábados 5-dic → 2-ene:**
  - REVISIÓN S04-S08 a las 14:00;
  - THEOMED EN VIVO 5-dic GES 4/6 · 12-dic ET 3/3 · 19-dic CI 3/8;
  - el 26-dic y el 2-ene no hay clase.
- **Domingos 6-dic → 3-ene:** SHIP/AVANCE, ENCAPS opcional y FEYNMAN, flexibles.
- **Borrados:**
  - las 4 franjas USMLE del jue 10-dic;
  - 6 instancias PC SÁBADO;
  - el PC DOMINGO sobrante «Feynman S1»;
  - la REVISIÓN «S09» del dom 3-ene.
- El lote 1b resolvió los pendientes del lote 1a: el Business del vie 4-dic, la cadena de revisiones y el SHIP S1 viejo.

### Lote 2b — 4-ene → 23-mar contra la app final (tras `e5fd4bd`): 76 escrituras = 64 `update_event` + 7 `create_event` + 5 `delete_event` (76/76 OK · 0 FAIL)
- **Lun 4-ene:** el LOOP pasa a RE-SCAN DE SEÑALES.
- **Viernes 8-ene → 26-feb:** la EVAL de las 18:00 pasa a **CIERRE SEMANAL**.
- **Lun 1, mié 3 y vie 5-mar:** la EVAL de las 18:00 pasa a la corrección del SIM #8, #9 y #10. Business de esos días a las 14:45-15:10.
- **Sábados 20 y 27-feb y 6-mar:** carril 09:30-10:30 y OUTPUT de Business 10:30-11:10.
- **Repasos (2, 4, 9 y 10-mar):** sin LOOP.
- **R↔D de 9 días de enero y febrero:** 13:30-14:00 (RESEARCH mínimo, pausa de átomos).
- **Creados:**
  - corrección del PRE-TEST, vie 8-ene 09:30-12:00 (`thgd5l39uh0l89ripmn6c1dt4o`);
  - FEYNMAN S12, dom 7-feb;
  - corrección del SIM #6 (19-feb) y del #7 (26-feb) a las 16:15;
  - CIERRE SEMANAL, vie 5-mar 18:45-19:00;
  - cierre de Business, mié 10-mar 13:00 (el sáb 13-mar está protegido);
  - corrección del DRESS, jue 11-mar 16:15.
- **Borrados:** 5 instancias EVAL (4-ene, 2, 4, 9 y 10-mar).
- **9-nov → 3-ene:** solo cambia el título del FEYNMAN del dom 3-ene (S8 pasa a S7).

### Lote 2c — descripciones de los pasos (9-nov → 3-ene), textos viejos de 2027, títulos de instancias, ANKI tras el examen y D94
227 escrituras = 221 `update_event` + 6 `delete_event` (227/227 = `ops.json`; nada cambió fuera de las ops).

| Grupo | Ops | Qué |
|---|---|---|
| A | 44 | Solo descripciones, 9-nov → 3-ene: ANKI 05:00 ×22, mañana ENCAPS 07:15 ×14, FEYNMAN ×7 y ENCAPS 16:15 del 28-dic. Ni títulos ni horas. |
| C1 | 26 | Carril B 16:15, 4-ene → 16-feb: pasa a «CARRIL B (fila de mantenimiento N · …) · dia N». |
| C2 | 32 | EVAL 18:00 lun-jue de F2: pasa a «EVAL modo examen 20Q a 72 s … · dia N». |
| C3 | 80 | MIR 2-mar → 30-abr, en 2 eventos (15:15-15:30 + 15:30-16:15): mantenimiento según la app. |
| E | 1 | D94 `neboplchsaua4snj39nrl480nc`, jue 2-dic-2027: pasa a 04:05-05:55. |
| D | 6 | Borradas las instancias ANKI de fin de semana posteriores al examen (11/12, 18/19 y 25/26-dic-2027). Las del 4/5-dic ya las había borrado el lote 2. |
| B | 1 + 37 | Master SYNAPSE `n8641e63c3msrkbaq3mqdtbmj0` + restauración de sus 37 excepciones (ver abajo). |

**Hallazgo (`lote2c/prueba_B.json`):** un `update_event` sobre un MASTER sobrescribe la descripción de TODAS sus instancias, también la de las excepciones que tienen texto propio. Los títulos y las horas sobreviven.
- Tras el master de SYNAPSE, las 37 excepciones se restauraron desde el respaldo y quedaron idénticas a como estaban.
- El resto del grupo B se suspendió.
- **Regla desde ahora:** no se toca la descripción de un master que tenga excepciones con texto propio. Se escribe instancia a instancia.

### Verificación final (solo lectura)
- **9-nov → 3-ene** (`cal_bk/v607/verif/`): **7/7 controles OK.**
  - 455/455 bloques de la app con su evento. 382 casan con un solo evento; 73 están repartidos en varios eventos que cubren el bloque exacto (mañanas ENCAPS y de Step, MIR 15:15 + 15:30).
  - Los contadores de los títulos coinciden en 330/330.
  - Ningún evento de plan sobra. Hay 10 sin bloque, a propósito: 5 marcas 🔬 de Research, 3 avisos de todo el día y 2 Anki opcionales del 2/3-ene.
  - No queda ningún resto de la v6.06e.
  - Hitos: UWSA1 y NBME 25 en su sitio.
  - Sábados con THEOMED 6/6. Domingos 8/8.
  - Rutinas personales intactas: solo se movieron 4 ALMUERZOS de días de hito.
- **2027** (`cal_bk/v607/verif2/`):
  - Los 18 hitos están bien, con sus 7 ventanas.
  - Las series alargadas terminan bien en 6 de 8 (vibecoding, SYNAPSE L-V y sábado, LIVIANO, Business y revisión).
  - Research: 12/12.
  - Intensiva: los 40 títulos con «dia N» están bien.
  - Lo que falta es lo diferido por diseño (abajo) y los textos viejos, que arreglaron los lotes 2c y 2d.
- **Tras el lote 2c** (`cal_bk/v607/verif3/`, volcado de 6 669 eventos): 4 de 5 controles OK.
  - 9-nov → 3-ene: las **622 descripciones casan con la guía de la app**.
  - 4-ene → 23-mar: OK, con las diferencias aceptadas (abajo).
  - Hitos y fin de series: OK.
  - Ningún enlace a Drive ni email.
  - **FAIL:** 433 instancias de 2027 heredan textos viejos («D1 = lun 2-nov», «examen 25-oct», NBME 31-33 en ago/sep…) de 11 masters. Las corrige el lote 2d, instancia a instancia.

### Lote 2d — las 433 instancias de 2027 con texto viejo, instancia a instancia
Dos escritores en paralelo, sobre series distintas: **491 `update_event`, los 491 OK.** No se creó ni se borró nada, y no se tocó ningún master con excepciones.

**Escritor A (229)**

| Serie | Ops | Fechas |
|---|---|---|
| R↔D | 72 | 4-ene → 30-abr |
| vibecoding | 53 | 4-ene → 19-mar |
| LIVIANO | 48 | 4-ene → 10-mar |
| Business | 40 | 4-ene → 2-mar |
| REVISIÓN | 16 | S09-S25, 9-ene → 1-may |

Cada instancia lleva el título y la descripción del bloque de la app de ese día.

**Escritor B (262)**

| Serie | Ops | Qué cambió |
|---|---|---|
| MIR diario | 41 + 41 | 4-ene → 1-mar, D38-D78, en 2 eventos |
| ANKI de fin de semana | 45 + 45 | 9-ene → 28-nov: «🇺🇸 ANKI · opcional (fin de semana)», FREE |
| Revisión F4 `55474jts1urh7s9j1nrtdkvfdg` | 1 + 24 | Solo la descripción del master, y los títulos S26-S49 |
| STEP 1 VIVO `2fvbkunh0nfhvhbn1b6iqvpifs` | 1 + 9 | Solo la descripción del master, y los títulos |
| SYNAPSE | 50 | Solo títulos «misión del día · dN SN» |
| Sueltos con «· v6.00» | 5 | Pasan a «· v6.07» |

Los masters de revisión F4 y STEP 1 VIVO se pudieron tocar porque el volcado nuevo confirmó que no tienen excepciones: 24/24 y 9/9 instancias iguales al master.

### Lote 2e — 8 instancias de RESEARCH de abril (8 `update_event`, los 8 OK)
- **Qué se arregló:** el lote 2d_a había titulado las R↔D del 12, 14, 16, 20, 22, 26, 28 y 30-abr «sin átomo en la app (ciclo 2 sin fechar)».
- **Por qué era falso:**
  - `sim_plantilla_dia.js` solo leía el ciclo 1 de Research; el Home real (`TodayMission.tsx`) lee los dos.
  - Con el simulador arreglado (los dos ciclos, y `moverGuia` en F4), el horizonte 9-nov-2026 → 6-dic-2027 da **393 días y 0 problemas**.
  - Los 67 «SIN contenido» de abril a diciembre eran falsos positivos del simulador, no huecos de la app.
- **Ahora:** las 8 instancias llevan el átomo de la app: R6b · R8b · X-9 · R9b · R10 · K1 · R11 · K2.

### Verificación final tras el lote 2d (`cal_bk/v607/verif4/`): 8/8 controles OK
1. **9-nov → 3-ene:** idéntico a verif3. 455/455 bloques con su evento y 622/622 descripciones que casan con la guía.
2. **4-ene → 23-mar:** 615/638 bloques con su evento; los 23 que faltan son de §G4. Flexibles 14/14 · carril B 40/40 · ENCAPS 18:00 43/43 · MIR 81/81 · «dia N» 98/98.
3. **Hitos 2027:** 18/18. D94 y D95 bien. ANKI de fin de semana: ninguno después del examen.
4. **Textos viejos:** de 433 a **0**. Ningún título de plan del 9-nov-2026 al 31-dic-2027 lleva «v6.00-v6.06». Las 7 menciones que el barrido todavía marca son hechos v6.07 o historial explícito.
5. **Drive y emails:** 0 enlaces a Drive y 0 emails.
6. **Regresión 9-nov → 3-ene:** 0. En 283 eventos solo cambió el campo `updated`: Google vuelve a sellar las excepciones hermanas cuando se escribe otra instancia de la serie.
7. **Cambios en 2027:** cada uno de los 489 eventos cambiados tiene su op.
8. **App → Calendar, 4-ene → 30-abr:** 703/828 bloques. Los 125 que faltan son todos USMLE de F3 (§G4, diferidos).

### Diferido por diseño (no es un fallo)
- **Series de F3** (§G4: Step 1 diario desde el mar 16-mar) y **de F4** (§G5: AURUM del 3 al 18-may y banqueo MIR del 3-may al 3-dic) se crean cuando salga la convocatoria del ENCAPS, como dice el §19.
  - Mientras tanto faltan a propósito los bloques USMLE de F3: 23 del 16 al 23-mar, y 125 si se cuenta hasta el 30-abr.
  - Las series de MIR y AURUM siguen con su fin provisional, el 30-abr.
- **ANKI de sábado y domingo en 2027:** la app no los pinta y se quedan como recordatorio opcional (decide Joseph: PENDIENTES (m)).
  - Quedan 53 por serie; la última es el sáb 27 y el dom 28-nov-2027.
  - Las dos series siguen en 2028. Cortarlas exige la interfaz de Calendar («este evento y los siguientes», desde el sáb 1 y el dom 2-ene-2028, porque las de diciembre tras el examen ya se borraron), porque el MCP no cambia recurrencias.
  - El 23 y el 24-oct-2027 no hay instancia: es un EXDATE heredado de v6.04-v6.06 y no se recrea.
- **Masters con descripción vieja:** R↔D, vibecoding, LIVIANO, MIR ×2, REVISIÓN, Business, ENCAPS 16:15 y ANKI ×2. No se tocan, por el hallazgo del lote 2c; las instancias llevan el texto v6.07.
### Solapes con rutinas personales (decide Joseph: PENDIENTES (l); no tocados)
- **ALISTARSE 18:30:** pisa la evaluación USMLE de 18:00 a 18:45 todos los martes, del 10-nov al 29-dic.
- **IBKR:** lun 16-nov 09:30 y jue 19-nov 09:30.
- **DESAYUNO 07:00:** pisa el NBME 25 del jue 10-dic.
- **ALMUERZO:**
  - con Business en audio el mar 10-nov y el jue 10-dic;
  - con los SIM 11:00-13:00 del 19 y 26-feb y del 1, 3 y 5-mar, y con el DRESS del 11-mar.
- **ALISTARSE y VIAJE:** pisan el CIERRE SEMANAL del vie 5-mar, de 18:45 a 19:00.


## 26. Semana corrida v6.07a (lun 9-nov-2026 · el lun 9 no se estudió · todo arranca el mar 10)

Orden de Joseph (lun 9-nov): «El día de hoy no se avanzó, se empieza mañana … que los temas de hoy se corran, corran nada más … ve tú la mejor forma para que sea más simple».

La app lo aplica como alias en la consulta, con el patrón v6.02d / v6.06a: `corrida_s1` v6.07a de `DATA/_scripts/_fechas_v6.json`. No se re-fecha ningún plan, ni Supabase, ni hitos.

| Día real | Qué hace |
|---|---|
| lun 9 | sin sesión |
| mar 10 | plan del lun 9 |
| mié 11 | plan del mar 10 (UWSA1) |
| jue 12 | plan del mié 11 |
| vie 13 | plan del jue 12 |
| sáb 14 | la mañana del vie 13 a sus horas + lo del sábado |
| dom 15 | la tarde del vie 13 desde las 07:15 + lo del domingo |

Desde el lun 16-nov todo vuelve a su fecha.

### Protocolo

- **Antes de escribir:** volcado `list_events` del 9 al 16-nov, con 170 eventos.
- **Respaldos:** cada evento tocado en `cal_bk/v607a/bk/<id>.json` (`cal_bk/` está en `.gitignore`).
- **Cómo se escribe:**
  - por instancia, sin tocar ningún master;
  - sin `create_event` ni `delete_event`;
  - con `notificationLevel` NONE;
  - sin tocar las rutinas personales, salvo la hora de dos ALMUERZO.
- **Operaciones:** salen de `cal_bk/v607a/build_ops.js`, que genera `ops.json`.

### Operaciones (78 `update_event`)

En vez de reescribir el texto de cada evento, cada evento de estudio se **mueve** al día real en que se hace. Así conserva su serie, su color y su descripción (la guía de su día de plan, escrita en los lotes v6.07).

Al título se le añade « (plan del <día>)». En título y descripción, las fechas de plan de la semana pasan a su fecha real, como hace `corridaTexto` en la app: lun 9 → mar 10, mar 10 → mié 11, mié 11 → jue 12 y jue 12 → vie 13. Las fechas reales externas no se tocan (en vivo de Theomed, apertura de simulacros).

- **Del lun 9 al mar 10:** 16 eventos.
  - vibecoding, Anki, las 4 franjas de ENCAPS mañana 1/22, SYNAPSE y Business;
  - R↔D Research M1 y el overlay 🔬 M1 `shkul14j3o1bs1a5044u8ge1kk`;
  - AURUM y MIR ×2;
  - ENCAPS 16:15: PRE-TEST 1/2, con «mini-sim del vie 13-nov» → «del dom 15-nov (10:00)»;
  - LIVIANO y ENCAPS 18:00.
- **Del mar 10 al mié 11:** 13 eventos.
  - vibecoding y Anki (configuración);
  - preparación del UWSA1 `1j4q1t25allju66uj92067b1ho` y SYNAPSE 07:25;
  - 🎯 UWSA1 `o1gla7846uae4tgngvc4q45osg` el mié 11, de 08:50 a 13:00. Su título dice «D1 mié 11-nov (v6.07a · plan del mar 10)» y su descripción lleva 6 reemplazos, cada uno aplicado una sola vez:
    - el D1 se hace el mié 11;
    - Day-After 2/6, 3/6 y 4/6 → vie 13;
    - noche anterior → mar 10;
    - historial y pie v6.07a;
  - Business, Derma d1, AURUM y MIR ×2;
  - ENCAPS 16:15 (PRE-TEST 2/2), LIVIANO y Day-After 1/6 a las 18:00.
- **Del mié 11 al jue 12:** 15 eventos (ENCAPS mañana 2/22 y lo demás del día).
- **Del jue 12 al vie 13:** 15 eventos (Step D2 con el Day-After 2/6 y 3/6 por la mañana, y 4/6 a las 18:00).
- **Del vie 13 al sáb 14, a la misma hora:** 8 eventos.
  - vibecoding 04:15 y Anki 05:00;
  - las 4 franjas de ENCAPS mañana 3/22, con «Ojo: el vie 13 a las 16:00 Theomed abrió el simulacro…»;
  - SYNAPSE 12:30 y Business 13:00 (OUTPUT 1/2).
- **Del vie 13 al dom 15, 6 h 15′ antes:** 7 eventos.
  - Research R1 a las 07:15, AURUM a las 08:00 y MIR a las 09:00 y 09:15;
  - ENCAPS mini-sim #5 a las 10:00, LIVIANO a las 11:00 y cifras ENCAPS de 11:45 a 12:30.
- **ALMUERZO** (`43dq3oib…`, solo la hora): el mar 10 pasa de 13:00 a 12:00 y el mié 11 de 12:00 a 13:00, por el UWSA1.
- **ENCAPS opcional 4 h del dom 15** (`prkrv2dghr6jgerjfv5vaournc`): cambia solo el título, que ahora dice «esta semana la mañana es de la tarde del vie 13: solo si te sobra energía».
- **Overlay M1:** el título se repuso al de la serie y se registró con `gen_research_calendar.js --set mentor=shkul14j3o1bs1a5044u8ge1kk`. Queda fecha 2026-11-10 y `fechaPlan` 2026-11-09, y `--check` da 0.

### Verificación

`cal_bk/v607a/ver_v607a.js` sobre el volcado posterior (`volcados/list_09-16nov_after.json`):

- **634 comprobaciones OK · 0 FAIL.** Cubren título, inicio, fin, descripción, color, estado y transparencia de los 77 eventos.
- Los 93 eventos no tocados están idénticos.
- No hay ningún evento nuevo.
- El lun 9 ya no tiene ningún bloque de estudio.

Del mar 10 al dom 15, los bloques coinciden en hora con `sim_plantilla_dia.js`, que ahora consulta cada bloque con su fecha y hora de plan, como TodayMission.

### No tocado / notas

- Las descripciones de las rutinas personales (GYM, BAILE, ALMUERZO) siguen con su historial antiguo, por diseño.
- El sábado 14 hay dos SYNAPSE (12:30 del vie 13 y 13:30 del sábado) y dos Anki (05:00 y 19:00).
- El ENCAPS opcional del domingo se solapa en el Calendar con la recuperación de 07:15 a 12:30. Es flexible y transparente, y el título lo explica.

### Ronda 2 (revisión independiente, lun 9-nov ≈ 14:50 Lima · 17 `update_event`)

Una revisión independiente de 2 agentes (app y Calendar, solo lectura) encontró textos del Calendar que no cuadraban con el día real. Se arreglaron con `cal_bk/v607a/build_ops2.js` → `ops2.json`. El script parte del texto original del día de plan y le aplica lo mismo que la app al pintar, en este orden: primero `corrida_s1.reemplazos` de esa fecha de plan y luego `corridaTexto.fechasRealesEnTexto`, que ahora también traduce las fechas sin mes y no toca las fechas reales de Theomed.

- **Fechas sin mes:**
  - Day-After «mar 10 18:00 · jue 12 …» → «mié 11 18:00 · vie 13 …» el mié 11 a las 18:00 y el vie 13 a las 07:15.
  - «mini-sim del vie 13-nov» → «del dom 15-nov» el mar 10 y el mié 11 a las 16:15.
- **Textos de «hoy»:**
  - mar 10 07:15: «El en vivo INV 1/4 fue el lunes 9 a las 19:30».
  - sáb 14 07:15: «Ojo» nuevo: el simulacro de Theomed se abrió el viernes, el mini-sim #5 es el dom 15 a las 10:00 y hoy hay Theomed en vivo de 15:00 a 17:00.
  - sáb 14 05:00, en el Anki: «las cifras de las 18:00 van mañana domingo a las 11:45».
- **Días de la semana en el arranque:**
  - jue 12: «del lunes» → «del martes».
  - sáb 14: «del miércoles» → «del jueves».
- **Textos del sábado:**
  - SYNAPSE d6: «Retoma donde paraste el martes 10 (el d1)».
  - Business tracker: «Del OUTPUT del sáb 14».
- **Domingo 15:**
  - MIR D5: las horas de los pasos se adelantan 6 h 15′ (de 09:00 a 10:00), como `moverGuia`.
  - Títulos «ENCAPS (16:15 del vie → dom 10:00)» y «ENCAPS (18:00 del vie → dom 11:45)».
- **Vibecoding S1 5/5:** «SHIP del sáb dom 15-nov» → «SHIP del dom 15-nov». Era un error previo de `rutinaGuia.vibeS1`, arreglado también en la app.
- **UWSA1:** se añade «(esta semana, por la corrida, el vie 13 sí: es el plan del jue 12)».
- **ENCAPS opcional del dom 15** (`prkrv2dghr6jgerjfv5vaournc`): pasa a evento de **día completo** para no tapar la recuperación de 07:15 a 12:30, y su texto dice «por la tarde, después de la recuperación».

**Verificación:** `volcados/list_09-16nov_after2.json` da **256 OK · 0 FAIL**. Los 17 eventos tienen el título, la descripción, el color, el estado, la transparencia y la hora (o el día completo) que se pidió. Los 153 eventos restantes de la semana están idénticos.

### Ronda 3 (segunda revisión independiente, lun 9-nov ≈ 15:10 Lima · 6 `update_event`)

La segunda revisión (2 agentes, solo lectura) confirmó que la semana del 10 al 15 cuadra en hora y en texto entre el Calendar y la app. Encontró regresiones de la ronda 2 fuera de la semana; todas están arregladas en la app (ver REESTRUCTURACION §31.8, ronda 3).

**Calendar** (`cal_bk/v607a/build_ops3.js` → `ops3.json`): eventos de estudio del lun 16-nov al dom 3-ene, tomados del volcado de verif4 (que en ese rango no ha cambiado desde los lotes v6.07). Se les aplica el mismo pipeline que la app; solo 6 cambian.

- **lun 16, 05:00 Anki:** «NUEVAS: solo las del jue 12-nov» → «vie 13-nov».
- **lun 16, 07:15 ENCAPS mañana 4/22:** «10 tarjetas / errores del viernes» → «del sábado» y «Las de las 11:40 del vie 13-nov» → «del sábado 14». El «Banqueo 4/19 (vie 13, grabado)» no se toca: es una fecha real de Theomed.
- **mar 17, 07:15 USMLE D3:** «notas del jue 12-nov» y «Mehlman, activo desde el jue 12-nov» → «vie 13-nov».
- **Research del 25-nov, el 27-nov y el 1-dic:** «M1 (lun 09-nov-2026)» → «M1 (mar 10-nov-2026)».

Las 6 respuestas de `update_event` coinciden con `ops3.json`.

El «SHIP del sábado» del ship-prep y la «regla: el vie 13-nov» de las 16:15 quedan fuera de las descripciones recortadas del Calendar, así que solo cambian en la app.

### Ronda 4 · mar 10-nov, 10:00: «hoy empiezo a las 11» (6 `update_event` + 1 `create_event`, ≈10:03 Lima)

Orden de Joseph (mar 10, 10:00): «Hoy voy a empezar a las 11 de la mañana … lo de antes de las 11 córrelo o colócalo … agregando 2 horas el domingo, una hora más el sábado … sin modificar todo el formato, busca espacios, huecos».

De 12:00 en adelante el día no cambia. Lo de antes de las 11:00 va a huecos:

- **ENCAPS mañana 1/22 (4 h 45′), dividida en cuatro tramos.** Se hace en orden: lo que no se termina en un tramo se sigue en el siguiente.

  | Cuándo | Qué | Evento |
  |---|---|---|
  | Hoy 11:00-12:00 | Orientación + la teoría que dé tiempo | `76dn…_20261109T121500Z` movido |
  | **Sáb 14 17:15-18:15** | Teoría restante | evento suelto nuevo `j3d6ep6iemi1nmir0ul393jm40` |
  | **Dom 15 04:15-05:45** | Post-test 04:15-04:45 + banqueo 30Q 04:45-05:45 | `c24k…_20261109T131500Z` y `iuhj…_20261109T140000Z` movidos |
  | **Dom 15 13:00-14:15** | Corrección + tarjetas | `q72k…_20261109T160000Z` movido |

- **Vibecoding 1/5** (`b2qg…_20261109T091500Z`): pasa al **dom 15 de 14:15 a 15:00**, antes del SHIP.
- **Anki** (`9274…_20261109T100000Z`): hoy de 18:45 a 19:00, en el viaje, solo con 15′ de ENCAPS::Cifras. El inventario USMLE se hace mañana a las 05:00 con la configuración.

Respaldos en `cal_bk/v607a/r4/bk/` y operaciones en `r4/ops4.json`.

El bloque del sábado pisa la primera hora de «CREACIÓN DE VIDEO YOUTUBE» (17:00-19:00), que es un evento personal y no se tocó. Decide Joseph.

**App:** campo nuevo `corrida_s1.notas`, que son notas por día real; las pinta `plantillaDelDia` arriba de las demás. Hay notas para el mar 10, el sáb 14 y el dom 15. El domingo 15, el reparto incluye además una parte con `{de: lun 9, bloques: {vibe: +600}}`, de modo que el bloque de vibecoding 1/5 queda de 14:15 a 15:00 con su guía.

### Ronda 5 · v6.07b · mar 10-nov ≈10:20: fines de semana con el horario real (42 `update_event`, ≈10:33-10:38 Lima)

Orden de Joseph, con una captura del Calendar:

- **Sábado:** gimnasio de 08:30 a 14:00 (clases de 09:30 a 13:00 más el viaje) y baile de 17:00 a 20:00. Libre de 14:00 a 17:00 y de ≈21:00 a 22:00.
- **Domingo:** baile de 17:00 a 20:00.
- Si ya no queda hueco, alargar 1 o 2 días al final, pero solo si hace falta.

**No se alarga el plan.** La mañana ENCAPS 3/22 del vie 13 (4 h 45′ más las cifras) no cabe en el fin de semana 14-15 y pasa al **dom 22**, el siguiente domingo libre: de 07:15 a 12:00 a sus horas y las cifras de 13:00 a 13:45 (`76dn`/`c24k`/`iuhj`/`q72k…_20261113`, `c5e7…_20261113T230000Z`). Lo demás queda en los huecos:

| Día | Hora | Qué |
|---|---|---|
| sáb 14 | 04:15 · 05:00 | vibecoding 5/5 · Anki (del vie 13; el Anki del sábado va aquí y su evento `r9eg…_20261115` queda como aviso «⏭ … hoy va a las 05:00») |
| sáb 14 | 07:15 · 07:40 | Business OUTPUT S1 1/2 (`0h8e…`) · Research R1 (`6us7…`), antes del gimnasio |
| sáb 14 | 14:00 → 17:00 | revisión · Business · preparar la clase · Theomed en vivo (sin cambio) |
| sáb 14 | 21:00 · 21:30 | SYNAPSE d5 del vie 13 (`n864…`) · SYNAPSE d6 (`h04k…`), al volver del baile |
| dom 15 | 05:00-05:45 · 07:15-10:00 | ENCAPS mañana 1/22, continuación EN ORDEN del mar 10 (`j3d6…` y `c24k`/`iuhj`/`q72k…_20261109`) |
| dom 15 | 10:00 · 11:00 · 12:30 · 13:30 · 14:15 | mini-sim #5 · MIR D5 (`uidu`/`hos0`, con horas de la descripción +120′) · AURUM D5 · LIVIANO d5 · vibecoding 1/5 |
| dom 15 | 15:00-17:00 · 19:30 | SHIP S1 (flexible) · Anki opcional en el viaje (`5s64…_20261115`) |
| dom 15 | — | ENCAPS opcional (`prkrv…`): «esta semana NO cabe» |
| dom 22 | día completo | ENCAPS opcional (`kd2a…`) como evento de día completo, «después de la mañana 3/22» |

**Plantilla general del sáb 21-nov al dom 3-ene:**

- SYNAPSE del sábado: de 13:30 a **21:00**, en 7 eventos sueltos con el aviso reescrito.
- Anki del sábado: de 19:00 a **21:30**, instancias `r9eg…`.
- Anki del domingo: de 17:00 a **16:45**, instancias `5s64…`.

**Cambios en la app (`corrida_s1` v6.07b):**

- Reparto del sáb 14, del dom 15 y del dom 22 (nuevo).
- Notas del mar 10 reescritas. Las del sáb 14 y el dom 15 se quitan porque su texto ya va en la nota del reparto.
- Reemplazos para el 11, el 13, el 16 y el 22-nov (aviso del ENCAPS opcional).
- `resumen` nuevo.

**Cambios en la plantilla:**

- `plantillasV6`: `anki-sab` de 21:30 a 22:00 y `anki-dom` de 16:45 a 17:00.
- `rutinaGuia.synFranjaDe`: el sábado con en vivo pasa a las 21:00.
- `gen_usmle_guia` y `usmleGuia.ts`: franjas del Anki del sábado y del domingo.
- `check_rutina_guia`: ahora espera 21:00-21:30.

**Verificación:**

- Calendar vuelto a volcar del sáb 14 al dom 3-ene (`r5/verif/` + lecturas puntuales). No queda ningún bloque de estudio entre las 08:30 y las 14:00 del sábado ni entre las 17:00 y las 20:00 del sábado o el domingo. El chequeo solo marca el evento personal «VIAJE (PODCAST O ANKI)».
- Checks verdes: `tsc`, `sim_plantilla_dia` (393 días, 0 problemas), `check_rutina_guia` (0 errores), `verificar_v6`, los `--check` de los generadores y el de Research.

Respaldos en `r5/bk/` y operaciones en `r5/ops5.json` (`build_ops5.js`).

**Queda abierto (PENDIENTES v6.07b):**

1. **Sábados de F2 (9-ene → 6-mar).** El STEP 1 VIVO de las 07:45, el cierre de Business de las 09:15, el carril sábado de 09:30 a 10:30 (Supabase `extra.carril_sabado`) y el OUTPUT de 10:30 a 11:10 caen dentro del gimnasio. Hay una propuesta en PENDIENTES; se mueve cuando Joseph la confirme.
2. **Recordatorios opcionales de Anki del fin de semana en 2027.** El del sábado a las 19:00 cae en el baile. No se toca la serie madre: actualizarla sobrescribiría las descripciones de las instancias ya ajustadas.
3. **Eventos personales, sin tocar:**
   - «DORMIR» a las 21:00: el sábado se estudia de 21:00 a 22:00 por oferta de Joseph, así que el domingo arranca a las 05:00.
   - «CREACIÓN DE VIDEO YOUTUBE» de 17:00 a 19:00: ya no choca con nada.
   - «BAILE» del sábado: el Calendar lo tiene de 20:00 a 20:30, pero según Joseph la clase es de 17:00 a 20:00.
