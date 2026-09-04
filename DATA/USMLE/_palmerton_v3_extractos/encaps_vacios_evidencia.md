# ENCAPS 2027-I · evidencia recogida para el análisis de vacíos (4-sep-2026)

## Estado verificado
- Supabase study_schedule ENCAPS: 102 filas modo MANTENIMIENTO (83 banqueo1h 7-sep→28-ene + 19 mini_sim 11-sep→29-ene). study_sim_scores ENCAPS = 0 filas. study_checks ENCAPS = 9 (0 desde sep). study_progress = 0 filas (cols: porcentaje, preguntas_resueltas, errores_por_tipo, tiempo_promedio_pregunta). apex_encaps_subtopic_coverage = 0 filas. dias_a_examen = 205 desde 4-sep → asume examen 28-mar-2027 (no confirmado por MINSA).
- Rotación sembrada (sesiones): I-3 11 · V-2 11 · II-3 6 · III-5/II-5/I-4/IV-1/II-4/II-1/III-8/II-11/IV-6/V-7/II-8 5 c/u. Sin slot rotativo ni de repaso de errores (el §6 del v3 preveía 12Q/sem rotativo + 10Q/sem errores).
- Cobertura del vector v3 por la rotación ≈ 65 pp; fuera del ciclo ≈ 30-35 pp (II-2, I-10, V-6, II-6, II-10, I-5/6, II-EMG, I-OCC, III-3, I-11/12, V-1, V-3/RRHH, III-1/2, III-9, II-9, II-7, I-1/2). II-EMG e I-OCC no existen en encapsCobertura.ts.
- Banco: QX Banqueo (scan 20-jul) SP 688 / Ética 255 / CI 1.109; Investigación y Gestión NO publicados; sets por área, no por código. Theomed postests: Gestión 12, Inv 3. Demanda: 83×20-25 + 19×25 ≈ 2.100-2.550 Q; V-2 ≈ 220-275 Q; IV ≈ 200-250 Q; I-3 ≈ 220-275 Q.
- TRACKING_ERRORES: 2 rondas (02-jul, 28-jul), _meta con pesos v2 y críticos v2; PERFIL_CONOCIMIENTO congelado 02-jul; ANKI_COLA/OBSIDIAN_COLA 1 fichero (28-jul).
- App: encapsPlan.ts simDays = days.filter(d => d.simulacro) → mini_sim tiene simulacro NULL → SimView "Sin simulacros" → la nota del viernes no se puede guardar. encapsRentabilidad.ts = vector v2 (IV 4 "contingencia mínima"), 7 críticos v2. encapsCobertura tiers = set v2 (II-1/II-11/II-8 CRÍTICA; I-4/II-5/II-4 ALTA).
- Pre-test 2026-II: _examen_2026-2_clasificado.json sin enunciado/opciones; exams_txt sin 2026-2.txt; PDF solo en D:/agente_estudio. PROTOCOLO_HORA_MANTENIMIENTO lo declara RESERVADO y a la vez "cantera de viñetas espejo" (contradicción → contaminación).
- Cifras críticas: la "tabla de números críticos" del v3 no existe en DATA (grep solo en el propio PRONOSTICO). Sin Anki ENCAPS activo en el régimen.
- Señales (DGE, RM/NTS, PNI, QX Tendencias scan 01-jul, convocatoria SERUMS 2027-I): sin proceso ni responsable; solo mención en §4/§6 del v3.
- Fase intensiva feb-mar: solo 5 bullets en §6 Fase B; sin generador, sin siembra, sin D1 en la app (STUDY_D1 monofase).
