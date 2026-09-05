/**
 * livianoCasos.ts — Banco de CASOS de viernes, rúbrica, drills de cifras ancla y tarjetas Anki de
 * MECANISMO de LIVIANO Academia. GENERADO por DATA/_scripts/gen_liviano_plan.js desde
 * DATA/BUSINESS/liviano_curriculum.json (v1 · 2026-09-05 (Palmerton v3 · vacíos 1-5 y 9)). NO editar a mano — editar el JSON y regenerar.
 *
 * · LIV_CASOS: 16 casos ÚNICOS con progresión por competencia (sem 1-4 mecanismo sin culpa ·
 *   5-8 elegir fármaco y titular · 9-12 EA/estancamiento/proteína · 13-15 límite de competencia y
 *   derivación · 16 integral con cierre de programa). Cada caso: datos clínicos, red flags, 3 decisiones
 *   esperadas, frase de cierre, pistas por ítem de la rúbrica. Cifras clínicas solo si están en las
 *   fuentes de LIVIANO_ACADEMIA.md; lo demás lleva "A VERIFICAR".
 * · LIV_RUBRICA: 4 ítems 0-2 (mecanismo · metáfora · people-first/sin estigma · plan pactado y medible).
 * · LIV_DRILLS: drills ciegos de cifras ancla (por d del plan).
 * · LIV_ANKI_CARDS: 216 tarjetas de mecanismo generadas del campo "estudio" (~10/semana);
 *   deck APEX::LIVIANO::<modulo>. CSV importable: DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv.
 * Los campos d/fecha se recalculan en cada regeneración (mismo calendario que LIV_DIAS).
 */
export interface LivRubricaItem { id: string; item: string; desc: string; n0: string; n1: string; n2: string; }
export interface LivCaso {
  id: number; d: number; fecha: string; semana: number; bloque: string; modulo: string;
  titulo: string; paciente: string; datos: string[]; redFlags: string[]; consigna: string;
  decisiones: string[]; cierre: string; pistas: Record<string, string>; fuente: string;
}
export interface LivDrillQ { q: string; a: string; }
export interface LivDrill { d: number; fecha: string; modulo: string; titulo: string; qs: LivDrillQ[]; }
export interface LivAnkiCard { d: number; fecha: string; modulo: string; deck: string; q: string; a: string; }

export const LIV_RUBRICA: LivRubricaItem[] = [
  {
    "id": "mecanismo",
    "item": "Mecanismo correcto",
    "desc": "Explica el porqué fisiológico/farmacológico sin errores ni cifras inventadas.",
    "n0": "ausente o erróneo",
    "n1": "parcial / con imprecisiones",
    "n2": "correcto, encadena causa→efecto"
  },
  {
    "id": "metafora",
    "item": "Metáfora de paciente",
    "desc": "Usa una metáfora de la biblioteca (termostato · timbre · acelerador/freno · ruido de comida · ladrillo · GPS) adaptada al paciente.",
    "n0": "no usa metáfora",
    "n1": "la usa pero no aterriza en el caso",
    "n2": "metáfora precisa, en ≤ 60 s, el paciente la repite"
  },
  {
    "id": "people_first",
    "item": "People-first / sin estigma",
    "desc": "Lenguaje 'persona con obesidad', valida, no culpa, pide permiso, no sermonea.",
    "n0": "juicio o culpa explícitos",
    "n1": "neutro pero sin validación",
    "n2": "valida + people-first + pide permiso"
  },
  {
    "id": "plan",
    "item": "Plan pactado y medible",
    "desc": "El paciente elige la meta; hay UNA métrica, una fecha de check-in y un criterio de escalada/derivación.",
    "n0": "sin plan o impuesto",
    "n1": "plan sin métrica o sin fecha",
    "n2": "meta elegida + métrica + fecha + criterio"
  }
];
/** meta por caso (sobre 8) y media del bloque (%) — Palmerton: mastery ≥ 80 % */
export const LIV_META_RUBRICA = {
  "porCaso": 6,
  "max": 8,
  "mediaPct": 80
};
export const LIV_META_CIEGO_PCT = 80;

export const LIV_CASOS: LivCaso[] = [
  {
    "id": 1,
    "d": 5,
    "fecha": "2026-09-11",
    "semana": 1,
    "bloque": "mecanismo sin culpa",
    "modulo": "FISIOLOGÍA",
    "titulo": "La que se culpa: tres dietas, tres rebotes",
    "paciente": "Mujer, 38 años, IMC 33 (92 kg · 1,67 m). Tres dietas 'exitosas' con rebote de +8 kg cada vez. Llega diciendo 'no tengo fuerza de voluntad'.",
    "datos": [
      "Sin comorbilidades conocidas; sin labs recientes",
      "Cintura 101 cm (medida en consulta)",
      "Come 'bien' de lunes a jueves y 'se descontrola' el fin de semana",
      "Duerme 5-6 h"
    ],
    "redFlags": [
      "Ninguna clínica. Red flag COMUNICATIVA: auto-culpa intensa → riesgo de abandono si se le añade juicio"
    ],
    "consigna": "Explícale por qué su cuerpo recuperó el peso (termostato + adaptación metabólica) y qué implica para el plan — sin culpa, en palabras simples.",
    "decisiones": [
      "Reencuadrar: la obesidad es una enfermedad del sistema que regula el peso (no falta de voluntad); validar los tres intentos como evidencia de esfuerzo, no de fracaso",
      "Explicar el rebote con el termostato + adaptación metabólica (leptina↓, grelina↑, gasto↓) y concluir: tratamiento crónico, no otra dieta",
      "Pactar el primer paso medible: Evaluación Integral (labs basales — panel A VERIFICAR) + 7 días de registro de comidas y sueño; check-in en 1 semana"
    ],
    "cierre": "No fallaste tú: falló el método, porque peleaba contra tu biología. Ahora vamos a tratar la biología.",
    "pistas": {
      "mecanismo": "set point + adaptación metabólica encadenados",
      "metafora": "termostato en ≤ 60 s",
      "people_first": "cero 'deberías'; 'persona con obesidad'",
      "plan": "Evaluación Integral + registro 7 días + fecha"
    },
    "fuente": "Endocrine Society Statement (Schwartz 2017) · Obesity Algorithm 2026 (OMA)"
  },
  {
    "id": 2,
    "d": 10,
    "fecha": "2026-09-18",
    "semana": 2,
    "bloque": "mecanismo sin culpa",
    "modulo": "FISIOLOGÍA",
    "titulo": "El que come de noche: hambre hormonal vs hambre real",
    "paciente": "Varón, 46 años, IMC 31. 'En el día no tengo hambre, en la noche arraso'. Trabaja 12 h en oficina, cena a las 22:00.",
    "datos": [
      "Cintura 108 cm",
      "PA en consulta 138/88 mmHg (una toma)",
      "Informe externo: HbA1c 6,0 % (hace 2 meses) — clasificar según criterio ADA vigente (A VERIFICAR)",
      "Sin antecedentes familiares de tiroides"
    ],
    "redFlags": [
      "PA elevada en una toma → confirmar en 2 visitas antes de etiquetar (no es urgencia)",
      "Glucosa alterada por informe → integrar en la Evaluación Integral"
    ],
    "consigna": "Explica 'hambre hormonal vs hambre real' (AgRP/POMC, grelina) aplicado a su patrón nocturno y pacta un primer registro.",
    "decisiones": [
      "Explicar el patrón: saltarse comidas de día sube la grelina y activa AgRP → el 'arrase' nocturno es hambre hormonal esperable, no falta de carácter",
      "NO prescribir aún: Evaluación Integral (PA repetida, labs basales, cintura) y revisar el informe de HbA1c contra criterio vigente",
      "Pactar UNA meta elegida por él (p. ej. proteína en el almuerzo o adelantar la cena) + registro de horas y comidas 7 días; check-in en 1 semana"
    ],
    "cierre": "Tu cuerpo no te está traicionando por la noche: te está cobrando el día. Vamos a cambiar cómo llegas a la noche.",
    "pistas": {
      "mecanismo": "grelina/AgRP explica el patrón",
      "metafora": "acelerador/freno",
      "people_first": "sin 'descontrol', sin sermón",
      "plan": "meta elegida + registro + fecha"
    },
    "fuente": "Endocrine Society Statement (Schwartz 2017) · Obesity Algorithm 2026 (OMA)"
  },
  {
    "id": 3,
    "d": 15,
    "fecha": "2026-09-25",
    "semana": 3,
    "bloque": "mecanismo sin culpa",
    "modulo": "FISIOLOGÍA",
    "titulo": "'Quemo menos que antes': adaptación metabólica que persiste",
    "paciente": "Mujer, 55 años, IMC 36. Hace 2 años bajó 15 kg con dieta muy restrictiva (~900 kcal/día por su cuenta); recuperó 18 kg. 'Ahora engordo con nada'.",
    "datos": [
      "Peso 94 kg · 1,61 m",
      "Menopausia hace 3 años",
      "Informe externo: TSH normal (fecha A VERIFICAR)",
      "Dolor de rodillas al subir escaleras"
    ],
    "redFlags": [
      "Ninguna urgente. Antecedente de restricción severa → explorar conducta alimentaria antes de cualquier nueva restricción"
    ],
    "consigna": "Valida su experiencia, explica la termogénesis adaptativa y la persistencia hormonal, y plantea por qué el tratamiento es crónico (prepara el terreno para el módulo 2 sin dar dosis).",
    "decisiones": [
      "Validar: la sensación de 'quemo menos' es real (termogénesis adaptativa: el gasto cae más de lo que predice la masa perdida) y persiste años",
      "Explicar por qué la restricción severa aumentó la respuesta defensiva y por qué otra dieta extrema repetiría el ciclo",
      "Proponer tratamiento crónico: Evaluación Integral y candidatura a farmacoterapia (se decide en la próxima visita con criterios del módulo 2), más proteína y fuerza desde ya por las rodillas y la masa magra"
    ],
    "cierre": "No estás rota. Tu cuerpo aprendió a defenderse de la hambruna que le hiciste pasar. Ahora lo tratamos con él, no contra él.",
    "pistas": {
      "mecanismo": "termogénesis adaptativa + persistencia",
      "metafora": "termostato que no se resetea",
      "people_first": "validación explícita",
      "plan": "evaluación + proteína/fuerza + fecha"
    },
    "fuente": "Endocrine Society Statement (Schwartz 2017) · Obesity Algorithm 2026 (OMA)"
  },
  {
    "id": 4,
    "d": 20,
    "fecha": "2026-10-02",
    "semana": 4,
    "bloque": "mecanismo sin culpa",
    "modulo": "FISIOLOGÍA",
    "titulo": "El escéptico: 'es disciplina, mi hermano bajó solo'",
    "paciente": "Varón, 34 años, IMC 30. Viene 'obligado' por su pareja. Su hermano bajó 12 kg 'solo con gimnasio'. No cree en 'medicinas para bajar de peso'.",
    "datos": [
      "Peso 96 kg · 1,79 m",
      "Sin comorbilidades; deportista en la adolescencia",
      "Cintura 100 cm",
      "Baja disposición al cambio (precontemplación)"
    ],
    "redFlags": [
      "Ninguna clínica. Riesgo de confrontación: si discutes, pierdes al paciente (entrevista motivacional)"
    ],
    "consigna": "Sin discutir: explica la variabilidad biológica del set point y el eje completo (leptina → arcuato → intestino → adaptación) y respeta su autonomía con una puerta abierta.",
    "decisiones": [
      "No discutir ni 'ganar': reflejar ('tu hermano lo logró y a ti te frustra que no funcione igual') y pedir permiso para explicar",
      "Explicar la variabilidad biológica: dos personas con la misma disciplina tienen termostatos distintos; el eje completo en 3 minutos, sin tecnicismos",
      "Pactar UNA meta pequeña elegida por él (p. ej. 2 sesiones de fuerza/semana que ya le gustan) + medir cintura y fuerza en 4 semanas; la farmacoterapia queda como opción informada, no impuesta"
    ],
    "cierre": "No te voy a convencer de nada. Te voy a mostrar cómo funciona tu cuerpo y tú decides qué hacer con eso.",
    "pistas": {
      "mecanismo": "eje completo sin errores",
      "metafora": "termostato distinto por persona",
      "people_first": "rodar con la resistencia",
      "plan": "meta elegida por él + métrica + fecha"
    },
    "fuente": "Endocrine Society Statement (Schwartz 2017) · Obesity Canada — 5As"
  },
  {
    "id": 5,
    "d": 25,
    "fecha": "2026-10-09",
    "semana": 5,
    "bloque": "elegir fármaco y titular",
    "modulo": "GLP-1",
    "titulo": "'Quiero la inyección ya': candidatura y consentimiento hablado",
    "paciente": "Varón, 45 años, IMC 36, hipertenso controlado (enalapril, según refiere). Quiere empezar semaglutida esta semana porque 'un amigo bajó 15 kg'.",
    "datos": [
      "Peso 108 kg · 1,73 m",
      "Informes externos: HbA1c 5,9 %, triglicéridos 210 mg/dL (fechas A VERIFICAR)",
      "Niega antecedentes personales/familiares de carcinoma medular de tiroides o MEN2",
      "Niega pancreatitis previa; no bebe alcohol en exceso"
    ],
    "redFlags": [
      "Screening obligatorio antes de prescribir: MEN2/CMT (contraindicación dura), pancreatitis previa, embarazo (no aplica), enfermedad biliar sintomática"
    ],
    "consigna": "Evalúa candidatura, da el beneficio esperado con cifras reales (STEP 1) traducido a sus kilos, explica EA GI y la escalada lenta, y por qué el fármaco va SIEMPRE con proteína + fuerza.",
    "decisiones": [
      "Confirmar candidatura: IMC 36 + comorbilidad; screening de contraindicaciones negativo → labs basales (panel A VERIFICAR) antes de la primera dosis",
      "Beneficio esperado honesto: STEP 1 −14,9 % ≈ 16 kg en 68 semanas (individual, sin promesa — CMP Art. 73); EA GI dominantes y escalada lenta según ficha técnica (esquema A VERIFICAR); consentimiento hablado incluyendo eventos raros",
      "Pactar el paquete: proteína 1,2-1,6 g/kg (130-170 g/día para 108 kg) + fuerza 2x/sem + check-in semanal de EA durante la titulación"
    ],
    "cierre": "El medicamento le baja el volumen al hambre; la proteína y la fuerza deciden si lo que pierdes es grasa o músculo. Van juntos o no van.",
    "pistas": {
      "mecanismo": "GLP-1 = copia de hormona intestinal + por qué escalada lenta",
      "metafora": "bajar el volumen del ruido de comida",
      "people_first": "no 'castigar' el entusiasmo",
      "plan": "labs → inicio → check-in semanal con métrica"
    },
    "fuente": "STEP 1 (semaglutida) · Obesity Algorithm 2026 · ficha técnica (A VERIFICAR)"
  },
  {
    "id": 6,
    "d": 30,
    "fecha": "2026-10-16",
    "semana": 6,
    "bloque": "elegir fármaco y titular",
    "modulo": "GLP-1",
    "titulo": "Prediabetes con historia familiar: ¿semaglutida o tirzepatida?",
    "paciente": "Mujer, 42 años, IMC 34. Madre y hermano con diabetes tipo 2. Informe: HbA1c 6,2 %. Pregunta directamente '¿cuál es mejor, doctor?'.",
    "datos": [
      "Peso 88 kg · 1,61 m",
      "Cintura 99 cm",
      "Sin contraindicaciones en el screening",
      "Presupuesto limitado: puede pagar el programa estándar, no el tier tirzepatida (S/ 1,690/mes)"
    ],
    "redFlags": [
      "Ninguna. Trampa comunicativa: prometer 'prevención de diabetes' como garantía (CMP Art. 73)"
    ],
    "consigna": "Responde '¿cuál es mejor?' con honestidad: SURMOUNT-5, SURMOUNT-1 (94 % en prediabetes), costo y tolerancia; individualiza y pacta.",
    "decisiones": [
      "Datos sin dogma: SURMOUNT-5 tirzepatida ~20 % vs semaglutida ~14 %; SURMOUNT-1 94 % menos progresión a diabetes en prediabetes; SELECT solo aplica a ECV establecida",
      "Individualizar: costo (tier), tolerancia, disponibilidad real (LIVIANO_ACCESO_PERU — A VERIFICAR) → decisión compartida; explicar que 'menos potente' no significa 'no sirve'",
      "Pactar plan: molécula elegida por ella con la información, labs basales, proteína/fuerza, medir HbA1c en el control trimestral (cadencia A VERIFICAR) y automonitoreo"
    ],
    "cierre": "Las dos mueven la aguja. Elegimos la que puedas sostener durante meses, porque la que se abandona es la que no funciona.",
    "pistas": {
      "mecanismo": "dual GIP/GLP-1 = dos llaves; por qué previene progresión",
      "metafora": "dos llaves, dos cerraduras",
      "people_first": "no culpar por el presupuesto",
      "plan": "decisión compartida + HbA1c trimestral + fecha"
    },
    "fuente": "SURMOUNT-1 / SURMOUNT-5 (tirzepatida) · STEP 1 · Obesity Algorithm 2026"
  },
  {
    "id": 7,
    "d": 35,
    "fecha": "2026-10-23",
    "semana": 7,
    "bloque": "elegir fármaco y titular",
    "modulo": "GLP-1",
    "titulo": "Semana 3 de titulación: náusea diaria y un vómito — ¿sigo?",
    "paciente": "Mujer, 31 años, IMC 32, en semaglutida (dosis actual según ficha técnica — A VERIFICAR). Náusea todos los días, un vómito ayer, 'no quiero seguir'.",
    "datos": [
      "Peso −2,1 kg en 3 semanas",
      "Come poco y rápido; toma poca agua; cena frituras familiares",
      "Sin dolor abdominal intenso, sin fiebre, orina normal",
      "Trabaja de pie 10 h"
    ],
    "redFlags": [
      "Vómitos persistentes / signos de deshidratación / dolor abdominal intenso irradiado a espalda → suspender y evaluar urgente (pancreatitis). Aquí: NO presentes → manejo ambulatorio"
    ],
    "consigna": "Maneja el EA sin perder a la paciente: por qué ocurre, qué hacer 2 semanas, cuándo escalar y cuándo consultar de urgencia (Garantía Anti-Susto).",
    "decisiones": [
      "Descartar red flags (dolor intenso, deshidratación) → EA GI esperable; NO escalar dosis: mantener la dosis actual hasta tolerar (esquema según ficha técnica — A VERIFICAR)",
      "Medidas: porciones pequeñas, menos grasa, comer lento, hidratación, proteína primero; explicar el mecanismo (vaciamiento gástrico lento + saciedad central) para que no lo viva como 'daño'",
      "Pactar 2 semanas de prueba con registro diario de náusea (0-3) y agua; check-in en 7 días; señales de alarma escritas; recordar la Garantía Anti-Susto (ajustamos sin costo)"
    ],
    "cierre": "La náusea es el cuerpo aprendiendo a comer con el volumen bajo. No vamos a subir nada hasta que te sientas bien — y si no te cae, ajustamos.",
    "pistas": {
      "mecanismo": "por qué la escalada lenta es el manejo",
      "metafora": "volumen bajo → comer despacio",
      "people_first": "no 'aguanta'",
      "plan": "2 semanas + escala 0-3 + señales de alarma + fecha"
    },
    "fuente": "Obesity Algorithm 2026 · ficha técnica semaglutida (A VERIFICAR) · LIVIANO_OFERTA (Garantía Anti-Susto)"
  },
  {
    "id": 8,
    "d": 40,
    "fecha": "2026-10-30",
    "semana": 8,
    "bloque": "elegir fármaco y titular",
    "modulo": "GLP-1",
    "titulo": "Post-infarto que 'solo quiere verse mejor': SELECT y límite de competencia",
    "paciente": "Varón, 58 años, IMC 38. Infarto hace 3 años con stent (según refiere), sin diabetes. 'Quiero bajar para la boda de mi hija'.",
    "datos": [
      "Peso 112 kg · 1,72 m",
      "Medicación cardiológica en curso (lista A VERIFICAR con su cardiólogo)",
      "Informe: HbA1c 5,6 %",
      "Camina 15 min/día; miedo a 'esforzar el corazón'"
    ],
    "redFlags": [
      "Paciente cardiológico: NO modificar su tratamiento cardiovascular; coordinar por escrito con cardiología antes de iniciar y antes de prescribir ejercicio (límite de competencia)"
    ],
    "consigna": "Reencuadra de estética a salud con SELECT, coordina con cardiología (límite de competencia) y pacta un plan de actividad seguro.",
    "decisiones": [
      "Reencuadre honesto: en obesidad + ECV sin diabetes, semaglutida redujo ~20 % los eventos cardiovasculares mayores (SELECT) — beneficio más allá de la boda, sin prometer resultado individual",
      "Límite de competencia: carta/mensaje a su cardiólogo (candidatura, interacciones, prescripción de ejercicio); no iniciar sin esa coordinación ni cambiar fármacos cardiológicos",
      "Pactar: labs basales, inicio tras el visto bueno, caminata progresiva + fuerza adaptada 2x/sem con límites del cardiólogo; métrica: minutos/semana y cintura; check-in en 2 semanas"
    ],
    "cierre": "Vas a llegar a la boda. Y vas a llegar a muchas más: eso es lo que estamos tratando.",
    "pistas": {
      "mecanismo": "SELECT: población y magnitud correctas",
      "metafora": "fitness vs fatness: 'tu corazón ya gana'",
      "people_first": "validar el motivo estético",
      "plan": "coordinación escrita + métrica + fecha"
    },
    "fuente": "SELECT (semaglutida) · Obesity Algorithm 2026"
  },
  {
    "id": 9,
    "d": 45,
    "fecha": "2026-11-06",
    "semana": 9,
    "bloque": "EA · estancamiento · proteína (+ acceso)",
    "modulo": "ACCESO PERÚ",
    "titulo": "'Lo consigo más barato en una web': acceso, registro y cadena de frío",
    "paciente": "Mujer, 47 años, IMC 35, en semaglutida mes 2, tolerando bien. Le ofrecieron 'semaglutida magistral' por WhatsApp a mitad de precio y una amiga trae 'de Chile'. Pregunta si puede cambiar.",
    "datos": [
      "−4,5 kg en 8 semanas",
      "Guarda la pluma en la puerta del refrigerador; viaja a Lima en bus cada 15 días",
      "No sabe qué es un registro sanitario",
      "Preocupación real: presupuesto familiar"
    ],
    "redFlags": [
      "Producto sin registro sanitario / sin certificado de análisis por lote / cadena de frío desconocida = riesgo → LIVIANO no lo dispensa ni lo supervisa"
    ],
    "consigna": "Explica registro sanitario, condición de venta y por qué LIVIANO solo dispensa con registro/certificado de análisis; muestra el precio verificado (LIVIANO_ACCESO_PERU) y enseña cadena de frío doméstica.",
    "decisiones": [
      "Explicar en 60 s qué es un registro sanitario y por qué el producto de la web/'de Chile' no puede ser supervisado por el programa (trazabilidad, lote, temperatura) — sin juzgar la búsqueda de ahorro",
      "Mostrar el dato verificado de la tabla LIVIANO_ACCESO_PERU (precio fechado, condición de venta) y el value stack honesto; si la tabla aún dice PENDIENTE, decir 'lo estoy verificando' con fecha",
      "Enseñar cadena de frío doméstica (2–8 °C, no en la puerta del refrigerador, transporte con gel frío; tiempo fuera de frío según ficha técnica — A VERIFICAR) y pactar: seguir en el programa con revisión de precio en la revisión trimestral"
    ],
    "cierre": "Tu ahorro es legítimo; lo que no puedo es cuidarte con un producto que no sé qué contiene ni a qué temperatura viajó.",
    "pistas": {
      "mecanismo": "por qué registro + certificado de análisis + frío importan",
      "metafora": "'cadena de frío = cadena de confianza'",
      "people_first": "sin 'eso es ilegal, no lo hagas'",
      "plan": "revisión de precio con fecha + guion de frío"
    },
    "fuente": "LIVIANO_ACCESO_PERU (A VERIFICAR en DIGEMID) · LIVIANO_LOGISTICA (2–8 °C) · Obesity Algorithm 2026"
  },
  {
    "id": 10,
    "d": 50,
    "fecha": "2026-11-13",
    "semana": 10,
    "bloque": "EA · estancamiento · proteína",
    "modulo": "NUTRICIÓN",
    "titulo": "Casi sin apetito, come una vez al día: proteína y masa magra",
    "paciente": "Mujer, 52 años, en semaglutida (mes 3). Casi sin apetito, come una sola vez al día, mareos al levantarse, 'me cuesta más subir las escaleras que antes'.",
    "datos": [
      "Peso 70 kg (−9 kg en 12 semanas) · 1,58 m",
      "Estimación de ingesta: ~40 g de proteína/día",
      "Fuerza de agarre y prueba de sentarse-levantarse peor que al inicio (medidas en consulta)",
      "Bebe ~800 mL/día"
    ],
    "redFlags": [
      "Pérdida de fuerza funcional + mareos → sospechar pérdida de masa magra e ingesta/hidratación insuficientes; descartar hipotensión/deshidratación en consulta (si hay síncope → evaluar)"
    ],
    "consigna": "Rediseña su día de comidas priorizando proteína, explica el riesgo de perder músculo y pacta un plan realista con fuerza.",
    "decisiones": [
      "Explicar el riesgo: el GLP-1 quita el hambre y con ~40 g/día está muy por debajo de 1,2-1,6 g/kg (84-112 g/día para 70 kg) → pérdida de músculo (la escalera lo delata)",
      "Rediseñar: proteína PRIMERO en 3-4 tomas pequeñas (huevo, atún, pollo, lácteos), líquidos ≥ 1,5-2 L (meta a individualizar — A VERIFICAR), método del plato Huancayo; no escalar dosis mientras no coma",
      "Pactar: fuerza 2x/sem (rutina mínima en casa) + registro de proteína 7 días + repetir prueba de fuerza en 4 semanas; check-in en 1 semana"
    ],
    "cierre": "Estás perdiendo peso, pero parte es músculo — y eso es lo que te sube las escaleras. Vamos a proteger ese músculo con proteína y fuerza.",
    "pistas": {
      "mecanismo": "déficit grande → masa magra; cuota proteica",
      "metafora": "el ladrillo",
      "people_first": "no 'tienes que comer'",
      "plan": "proteína g/día + fuerza 2x + prueba en 4 sem"
    },
    "fuente": "Obesity Canada — nutrición · Obesity Algorithm 2026 (proteína 1,2-1,6 g/kg · fuerza 2x/sem)"
  },
  {
    "id": 11,
    "d": 55,
    "fecha": "2026-11-20",
    "semana": 11,
    "bloque": "EA · estancamiento · proteína",
    "modulo": "NUTRICIÓN",
    "titulo": "El fan del 16/8 y del keto que abandona a las 6 semanas",
    "paciente": "Varón, 39 años, IMC 33. Ha hecho keto (3 veces) y ayuno 16/8 (2 veces); siempre abandona a las 6 semanas. Pregunta '¿keto o baja en grasa, doctor?'.",
    "datos": [
      "Peso 101 kg · 1,75 m",
      "Come en el trabajo (menú) 5 días/semana; fines de semana con familia (pollada, pachamanca)",
      "Sin GLP-1 aún (en evaluación)",
      "Registra en apps 'por rachas'"
    ],
    "redFlags": [
      "Ninguna clínica. Riesgo: prescribir 'otra dieta con nombre' que repita el ciclo de abandono"
    ],
    "consigna": "Usa DIETFITS y el meta-análisis de AI para responder sin dogma, convierte la adherencia en el plan y aterrízalo en su vida real (menú + fines de semana).",
    "decisiones": [
      "Responder con datos: DIETFITS (low-fat vs low-carb no difieren si la calidad es alta) y AI = restricción continua (24 RCTs, 0,26 kg NS) → el nombre no es el mecanismo; su patrón de 6 semanas coincide con 'adherencia > 80 % solo < 3 meses'",
      "Diseñar para el mes 6: método del plato en el menú del trabajo + regla para fines de semana (proteína primero, sin prohibir la pachamanca); si el 16/8 le ayuda a adherirse, usarlo como herramienta, no como dogma",
      "Pactar UNA regla elegida por él + automonitoreo simple (foto del plato) y fecha de revisión en 4 semanas; métrica: días con plato cumplido/semana"
    ],
    "cierre": "No existe LA dieta. Existe la que tú puedas sostener en septiembre y en la pollada de diciembre. Diseñemos esa.",
    "pistas": {
      "mecanismo": "déficit común + adherencia",
      "metafora": "'la dieta que sobrevive al fin de semana'",
      "people_first": "no humillar keto/AI",
      "plan": "1 regla + foto del plato + 4 semanas"
    },
    "fuente": "Meta-análisis AI vs restricción continua (PMC10098946) · DIETFITS · Obesity Canada — nutrición"
  },
  {
    "id": 12,
    "d": 60,
    "fecha": "2026-11-27",
    "semana": 12,
    "bloque": "EA · estancamiento · proteína",
    "modulo": "EJERCICIO",
    "titulo": "−12 kg y estancado 3 semanas: quiere dejar todo",
    "paciente": "Varón, 50 años, en tirzepatida (mes 4). −12 kg y ahora 3 semanas sin cambio en la balanza. 'Ya no sirve, lo voy a dejar'.",
    "datos": [
      "Peso 98 kg (inicio 110) · 1,76 m",
      "Cintura 112 → 103 cm; fuerza de agarre ↑ desde que entrena 2x/sem",
      "Duerme mejor, PA 128/82",
      "Pregunta si 'subir la dosis' arregla el estancamiento"
    ],
    "redFlags": [
      "Ninguna clínica. Riesgo: escalar dosis por impulso o abandonar por 'fracaso' en la balanza"
    ],
    "consigna": "Reencuadra el estancamiento (composición corporal, mantenimiento), redefine metas medibles no-balanza y prescribe la fase de fuerza; decide sobre la dosis con criterio, no por ansiedad.",
    "decisiones": [
      "Mostrar los números que la balanza no ve (cintura −9 cm, fuerza ↑, PA) y explicar la adaptación metabólica: el estancamiento tras −11 % es biología esperable, no falla del fármaco",
      "Dosis: no escalar por impulso; revisar tolerancia, adherencia y ficha técnica (opciones de dosis A VERIFICAR) en la siguiente visita con datos de 4 semanas",
      "Redefinir metas: mantenimiento activo (NWCR ~1 h/día), fuerza 2x/sem progresiva, métricas cintura/fuerza/fotos mensuales; check-in en 2 semanas"
    ],
    "cierre": "La balanza se detuvo; tu cuerpo no. Nueve centímetros menos de cintura y más fuerza es exactamente lo que queríamos que pasara.",
    "pistas": {
      "mecanismo": "adaptación + composición corporal",
      "metafora": "'la balanza no distingue; nosotros sí'",
      "people_first": "validar la frustración",
      "plan": "métricas no-balanza + decisión de dosis con fecha"
    },
    "fuente": "National Weight Control Registry · Obesity Algorithm 2026 · SURMOUNT (tirzepatida)"
  },
  {
    "id": 13,
    "d": 65,
    "fecha": "2026-12-04",
    "semana": 13,
    "bloque": "límite de competencia y derivación",
    "modulo": "GLP-1",
    "titulo": "Dolor abdominal intenso + vómitos… y está buscando embarazo",
    "paciente": "Mujer, 36 años, IMC 34, semaglutida mes 3. Consulta por dolor epigástrico intenso irradiado a la espalda y vómitos desde hace 24 h. En la anamnesis cuenta que dejó el anticonceptivo 'para embarazarse pronto'.",
    "datos": [
      "Dolor 8/10, no cede con la posición",
      "Sin diarrea; sin fiebre referida",
      "Última menstruación hace 5 semanas (test de embarazo pendiente)",
      "Sin antecedente de cálculos conocidos"
    ],
    "redFlags": [
      "Sospecha de PANCREATITIS (evento raro pero grave) → suspender y evaluación URGENTE en emergencia (no manejar por WhatsApp)",
      "Búsqueda de embarazo / posible embarazo → suspender el GLP-1 y derivar a obstetricia; periodo de lavado según ficha técnica (A VERIFICAR)",
      "Colelitiasis sintomática también en el diferencial"
    ],
    "consigna": "Reconoce las dos red flags, suspende, deriva (emergencia + obstetricia), comunica sin alarmar y deja escrito el plan; no reintroducir sin evaluación.",
    "decisiones": [
      "Suspender el fármaco HOY y derivar a emergencia para evaluación de pancreatitis/colelitiasis (criterios diagnósticos: fuente primaria — A VERIFICAR); no dar analgesia 'para ver' desde consulta",
      "Embarazo posible/buscado: test hoy; suspender el GLP-1 en cualquier caso y derivar a obstetricia; explicar por qué (ficha técnica — A VERIFICAR el periodo de lavado) sin culpa por no haberlo dicho antes",
      "Comunicar sin alarmar (qué se va a descartar, dónde ir, qué llevar), registrar en la ficha y pactar contacto en 24-48 h; reintroducción solo tras evaluación y decisión compartida"
    ],
    "cierre": "Hoy paramos el medicamento y vamos a emergencia a descartar algo que hay que ver rápido. Cuando tengamos claro qué es, decidimos juntos cómo sigue todo — también lo del embarazo.",
    "pistas": {
      "mecanismo": "por qué pancreatitis/embarazo son gatillos de suspensión",
      "metafora": "'freno de mano' (parar para ver)",
      "people_first": "sin reproche por el anticonceptivo",
      "plan": "derivación con lugar + contacto 24-48 h"
    },
    "fuente": "Obesity Algorithm 2026 (seguridad GLP-1) · ficha técnica semaglutida (A VERIFICAR)"
  },
  {
    "id": 14,
    "d": 70,
    "fecha": "2026-12-11",
    "semana": 14,
    "bloque": "límite de competencia y derivación",
    "modulo": "FARMACO+QX",
    "titulo": "No puede pagar el GLP-1 y pide 'pastillas': opciones no-GLP1 y límite",
    "paciente": "Mujer, 44 años, IMC 33, 'comer emocional' nocturno. No puede pagar el programa con GLP-1; pide 'alguna pastilla para el apetito' que vio en una farmacia.",
    "datos": [
      "Peso 84 kg · 1,60 m",
      "Ánimo bajo intermitente; niega ideación suicida (preguntado)",
      "Informe: HbA1c 5,8 %",
      "Toma sertralina prescrita por psiquiatría (según refiere — A VERIFICAR)"
    ],
    "redFlags": [
      "Interacciones y contraindicaciones de naltrexona/bupropión y fentermina/topiramato con su tratamiento psiquiátrico → coordinar con psiquiatría (límite de competencia)",
      "NO ofrecer magistral gris ni producto sin registro"
    ],
    "consigna": "Ofrece opciones honestas (no-GLP1 con registro verificado, programa conductual DPP), coordina con psiquiatría y respeta el límite: no prescribir lo que no tiene registro o no dominas.",
    "decisiones": [
      "Explicar las opciones no-GLP1 y su papel real (naltrexona/bupropión en craving emocional; fentermina/topiramato; orlistat modesto) y que su disponibilidad/registro en Perú se confirma en LIVIANO_ACCESO_PERU (A VERIFICAR) — no se prescribe sin ese dato",
      "Límite de competencia: interacciones con su tratamiento psiquiátrico → interconsulta con psiquiatría antes de cualquier fármaco; mientras tanto, programa conductual estructurado (DPP: −58 % incidencia de diabetes) + proteína/fuerza",
      "Pactar un plan realista de bajo costo (tier de solo seguimiento / plan de pagos), automonitoreo del comer nocturno (registro emoción-hora-comida) y revisión en 4 semanas"
    ],
    "cierre": "No tener el medicamento más caro no te deja sin tratamiento. Tenemos un programa que funciona con evidencia, y la pastilla, si entra, entra con tu psiquiatra y con registro.",
    "pistas": {
      "mecanismo": "dónde actúa cada no-GLP1 + DPP",
      "metafora": "'la pastilla no apaga la emoción; el GPS la muestra'",
      "people_first": "sin culpa por el presupuesto ni por el ánimo",
      "plan": "interconsulta + registro + 4 semanas"
    },
    "fuente": "Obesity Algorithm 2026 · DPP · LIVIANO_ACCESO_PERU (A VERIFICAR)"
  },
  {
    "id": 15,
    "d": 75,
    "fecha": "2026-12-18",
    "semana": 15,
    "bloque": "límite de competencia y derivación",
    "modulo": "FARMACO+QX",
    "titulo": "IMC 41 con diabetes mal controlada y falla a semaglutida: 'no quiero que me corten'",
    "paciente": "Mujer, 41 años, IMC 41, DM2 con HbA1c 9,1 % (informe), 6 meses de semaglutida con −4 % de peso y buena adherencia. Rechaza la cirugía: 'no quiero que me corten'.",
    "datos": [
      "Peso 105 kg · 1,60 m",
      "Apnea del sueño sospechada (ronquido, somnolencia) — no estudiada",
      "Metformina + insulina basal (según refiere — A VERIFICAR)",
      "Madre operada de vesícula 'con complicaciones' → miedo quirúrgico"
    ],
    "redFlags": [
      "Falla a farmacoterapia + IMC ≥ 35 + comorbilidad refractaria = gatillo de derivación a cirugía bariátrica (ASMBS/IFSO 2022); manejo de la diabetes coordinado con endocrinología"
    ],
    "consigna": "Presenta la opción quirúrgica con criterios ASMBS/IFSO 2022, resuelve el miedo sin presionar y arma el plan puente LIVIANO (pre y post).",
    "decisiones": [
      "Explicar que cumple criterios (IMC ≥ 35 sin exigir comorbilidades; además DM2 refractaria) y qué logra la cirugía: pérdida sostenida 25-30 % y remisión de diabetes; 'la cirugía también es hormonal'",
      "Derivación como fortaleza: interconsulta a cirugía bariátrica y endocrinología; reflejar el miedo (madre) y separar 'vesícula complicada' de 'bariátrica programada' sin minimizar; la decisión es suya y puede tomarse con tiempo",
      "Plan puente: seguir LIVIANO pre-quirúrgico (proteína, fuerza, automonitoreo, estudio de apnea) y post (seguimiento, recidiva — GLP-1 post-cirugía A VERIFICAR); métricas y fecha de revisión en 4 semanas"
    ],
    "cierre": "La cirugía no es rendirse ni es que yo te suelte: es la herramienta más potente que tenemos para tu caso, y te acompaño antes, durante y después. Tú decides el cuándo.",
    "pistas": {
      "mecanismo": "criterios + por qué la cirugía es hormonal",
      "metafora": "'cambia las hormonas del hambre, no solo achica'",
      "people_first": "reflejar el miedo, no rebatirlo",
      "plan": "interconsultas + plan puente + fecha"
    },
    "fuente": "ASMBS/IFSO 2022 (PMC9834364) · Obesity Algorithm 2026"
  },
  {
    "id": 16,
    "d": 87,
    "fecha": "2027-01-08",
    "semana": 16,
    "bloque": "integral con cierre de programa",
    "modulo": "SÍNTESIS",
    "titulo": "CASO INTEGRAL: 6 meses en LIVIANO, −16 %: '¿ya puedo dejar todo?' (con la esposa presente)",
    "paciente": "Varón, 48 años. IMC 37 → 31 tras 6 meses en LIVIANO (semaglutida, proteína, fuerza 2x/sem). HTA controlada. Cintura −14 cm. Pregunta si ya puede dejar el medicamento y el programa; su esposa pregunta por el costo a largo plazo.",
    "datos": [
      "Peso 114 → 96 kg · 1,76 m",
      "Fuerza de agarre y sentadilla mejor que al inicio; fotos mensuales",
      "Labs de control: HbA1c 5,5 % (inicio 6,3 %) (informes — fechas A VERIFICAR)",
      "Automonitoreo constante (registro 5-6 días/semana)"
    ],
    "redFlags": [
      "Ninguna clínica. Riesgo: prometer 'ya no lo necesitas' o, al revés, retener por costo; la decisión debe ser compartida y basada en el 67 %"
    ],
    "consigna": "Resuelve el caso SOLO con el protocolo v1: decisión compartida sobre continuar/reducir, plan de mantenimiento medible, cierre de fase con la escalera de la oferta explicada con ética (sin promesas), y respuesta honesta a la esposa.",
    "decisiones": [
      "Decisión compartida sobre el fármaco: explicar el ~67 % de recuperación al año si se suspende sin más; opciones (mantener, reducir según ficha técnica — A VERIFICAR, o salida gradual con criterios de reinicio) y elegir con él",
      "Plan de mantenimiento del protocolo: proteína 1,2-1,6 g/kg + fuerza 2x/sem + actividad ~1 h/día (NWCR) + automonitoreo + check-in trimestral con labs y métricas de composición; criterios de escalada/derivación escritos",
      "Cierre de fase con ética: escalera Progreso → Consolidación → Mantenimiento (S/ 790) → Alumni (S/ 99) y Blindaje Anti-Rebote / Plan de salida gradual, presentados como servicio y compromiso (no como garantía de kilos — CMP Art. 73); responder a la esposa con números reales y fechados"
    ],
    "cierre": "Lo que lograste no fue el medicamento: fue lo que hiciste con él. Ahora decidimos juntos cómo lo cuidas — con un plan escrito, no con una promesa.",
    "pistas": {
      "mecanismo": "67 % + set point + mantenimiento (NWCR)",
      "metafora": "termostato + GPS integrados",
      "people_first": "incluir a la esposa como aliada",
      "plan": "decisión compartida + protocolo de mantenimiento + escalera con fecha"
    },
    "fuente": "STEP 1 (suspensión 67 %) · NWCR · Obesity Canada — 5As · LIVIANO_OFERTA (escalera y garantías) · LIVIANO_PROTOCOLO_CLINICO_v1"
  }
];

export const LIV_DRILLS: LivDrill[] = [
  {
    "d": 37,
    "fecha": "2026-10-27",
    "modulo": "GLP-1",
    "titulo": "Drill de cifras ancla (ciego) — módulo 2",
    "qs": [
      {
        "q": "STEP 1: % con semaglutida 2,4 mg vs placebo, y a cuántas semanas",
        "a": "−14,9 % vs −2,4 % a 68 semanas"
      },
      {
        "q": "% del peso que se recupera al año de suspender",
        "a": "~67 %"
      },
      {
        "q": "SELECT: reducción de eventos cardiovasculares mayores",
        "a": "~−20 % (obesidad + ECV sin diabetes)"
      },
      {
        "q": "SURMOUNT-1: % con tirzepatida 15 mg y con placebo",
        "a": "−20,9 % vs −3,1 %"
      },
      {
        "q": "SURMOUNT-1: reducción de progresión a diabetes en prediabetes",
        "a": "94 %"
      },
      {
        "q": "SURMOUNT-5: tirzepatida vs semaglutida",
        "a": "~20 % vs ~14 %"
      }
    ]
  },
  {
    "d": 58,
    "fecha": "2026-11-25",
    "modulo": "NUTRICIÓN",
    "titulo": "Síntesis módulo 3 + drill de cifras (ciego) → política nutricional del protocolo",
    "qs": [
      {
        "q": "Meta-análisis AI vs restricción continua: nº RCTs, n y diferencia",
        "a": "24 RCTs · n = 1.768 · 0,26 kg (no significativa)"
      },
      {
        "q": "Adherencia > 80 % solo en estudios de qué duración",
        "a": "< 3 meses"
      },
      {
        "q": "Cuota proteica LIVIANO",
        "a": "1,2-1,6 g/kg/día"
      },
      {
        "q": "DIETFITS: ¿difieren low-fat y low-carb al año?",
        "a": "No, si la calidad es alta"
      },
      {
        "q": "STEP 1 y recuperación al suspender",
        "a": "−14,9 % (vs −2,4 %) · ~67 % recuperado en 1 año"
      },
      {
        "q": "Cadena de frío del GLP-1",
        "a": "2–8 °C extremo a extremo"
      },
      {
        "q": "SURMOUNT-1: dosis 15 mg vs placebo",
        "a": "−20,9 % vs −3,1 %"
      }
    ]
  },
  {
    "d": 77,
    "fecha": "2026-12-22",
    "modulo": "FARMACO+QX",
    "titulo": "Síntesis módulo 6 + escalera terapéutica + drill de cifras (ciego) → sección M6 del protocolo",
    "qs": [
      {
        "q": "ASMBS/IFSO 2022: IMC principal sin comorbilidades",
        "a": "≥ 35"
      },
      {
        "q": "ASMBS/IFSO 2022: rango con enfermedad metabólica refractaria",
        "a": "30-34,9"
      },
      {
        "q": "ASMBS/IFSO 2022: corte en población asiática",
        "a": "≥ 27,5"
      },
      {
        "q": "Sleeve/bypass: pérdida sostenida",
        "a": "25-30 % (+ remisión de diabetes)"
      },
      {
        "q": "NWCR: actividad diaria y kcal/semana",
        "a": "~1 h/día · ≈ 2.800 kcal/sem"
      },
      {
        "q": "Guías clínicas (ACSM): minutos/semana",
        "a": "200-300 min/sem (≥ 250)"
      },
      {
        "q": "Ejercicio sin dieta: kg que baja",
        "a": "~2-3 kg"
      },
      {
        "q": "Fuerza: frecuencia mínima con GLP-1",
        "a": "2x/semana"
      }
    ]
  },
  {
    "d": 88,
    "fecha": "2027-01-11",
    "modulo": "SÍNTESIS",
    "titulo": "Repaso integral I: drill ciego de cifras + mecanismos (todos los módulos)",
    "qs": [
      {
        "q": "STEP 1 (%, placebo, semanas)",
        "a": "−14,9 % vs −2,4 % · 68 semanas"
      },
      {
        "q": "Recuperación al suspender",
        "a": "~67 % en 1 año"
      },
      {
        "q": "SELECT",
        "a": "~−20 % eventos CV mayores"
      },
      {
        "q": "SURMOUNT-1 (3 dosis + placebo) y prediabetes",
        "a": "−15 / −19,5 / −20,9 % vs −3,1 % · 94 % menos progresión a DM"
      },
      {
        "q": "SURMOUNT-5",
        "a": "~20 % vs ~14 %"
      },
      {
        "q": "Proteína y fuerza",
        "a": "1,2-1,6 g/kg · 2x/sem"
      },
      {
        "q": "AI vs restricción continua",
        "a": "24 RCTs · n 1.768 · 0,26 kg NS"
      },
      {
        "q": "NWCR",
        "a": "~1 h/día · ≈ 2.800 kcal/sem"
      },
      {
        "q": "ASMBS/IFSO 2022",
        "a": "IMC ≥ 35 · 30-34,9 refractario · asiáticos ≥ 27,5"
      },
      {
        "q": "DPP",
        "a": "−58 % incidencia de diabetes"
      },
      {
        "q": "Orforglipron (ACHIEVE-1)",
        "a": "~8 % en diabéticos · GI 44-70 %"
      },
      {
        "q": "Cadena de frío",
        "a": "2–8 °C"
      }
    ]
  }
];

/** Deck raíz + sub-deck por módulo (convención APEX::<sección>::<slug>, ver ankiLinks.ts / SYNC_ANKI). */
export const LIV_ANKI_DECK_ROOT = 'APEX::LIVIANO';
export const LIV_ANKI_DECK: Record<string, string> = {
  "FISIOLOGÍA": "APEX::LIVIANO::fisiologia",
  "GLP-1": "APEX::LIVIANO::glp1",
  "ACCESO PERÚ": "APEX::LIVIANO::acceso_peru",
  "SÍNTESIS": "APEX::LIVIANO::sintesis",
  "NUTRICIÓN": "APEX::LIVIANO::nutricion",
  "EJERCICIO": "APEX::LIVIANO::ejercicio",
  "FARMACO+QX": "APEX::LIVIANO::farmaco_qx",
  "CONDUCTA": "APEX::LIVIANO::conducta"
};
export const livAnkiDeck = (modulo: string) => LIV_ANKI_DECK[modulo] || LIV_ANKI_DECK_ROOT;

export const LIV_ANKI_CARDS: LivAnkiCard[] = [{"d":1,"fecha":"2026-09-07","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué la obesidad NO es 'acumulación pasiva de calorías'?","a":"Porque el peso está regulado por un sistema homeostático (cerebro–intestino–tejido adiposo) que defiende un nivel de adiposidad; en la obesidad ese sistema defiende un nivel más alto (Endocrine Society, Schwartz 2017)."},{"d":1,"fecha":"2026-09-07","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué implica para el tratamiento que la obesidad sea una enfermedad del sistema regulador?","a":"Que se maneja de forma CRÓNICA (como la hipertensión), no con un esfuerzo de voluntad puntual: al retirar el tratamiento vuelve la presión biológica hacia el peso defendido."},{"d":1,"fecha":"2026-09-07","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué tres órganos/tejidos forman el sistema que regula el peso y qué informa cada uno?","a":"Tejido adiposo (leptina: cuánta reserva hay), intestino (grelina antes de comer; GLP-1/PYY/CCK después: qué pasa con la comida ahora) e hipotálamo/tronco encefálico (integran y ajustan hambre y gasto)."},{"d":2,"fecha":"2026-09-08","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué significa que el cerebro 'defiende' un set point de adiposidad?","a":"Detecta desviaciones del peso (vía leptina y otras señales) y las corrige ajustando hambre y gasto energético para volver al nivel defendido."},{"d":2,"fecha":"2026-09-08","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué la dieta sola rara vez cambia el set point?","a":"Porque el sistema interpreta la pérdida como amenaza: sube el hambre y baja el gasto para devolver el peso al nivel defendido — la dieta pelea contra el termostato, no lo resetea."},{"d":2,"fecha":"2026-09-08","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué dos personas con la misma dieta y disciplina terminan con pesos distintos?","a":"Porque el nivel que su cerebro defiende (set point) es distinto: la biología fija el punto que la conducta intenta mover; la misma disciplina opera contra una presión diferente en cada uno."},{"d":3,"fecha":"2026-09-09","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué le informa la leptina al hipotálamo?","a":"El tamaño de las reservas de grasa: la secreta el tejido adiposo en proporción a la masa grasa."},{"d":3,"fecha":"2026-09-09","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué pasa con la leptina al bajar de peso y cómo lo interpreta el cerebro?","a":"Cae. El hipotálamo lo lee como 'hambruna' → aumenta el hambre y reduce el gasto energético."},{"d":3,"fecha":"2026-09-09","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué pasa con la leptina cuando el tejido adiposo crece y qué esperaríamos que hiciera?","a":"Sube en proporción a la masa grasa; en un sistema sano eso frenaría el hambre y subiría el gasto. En obesidad la señal alta no produce esa respuesta (resistencia leptínica)."},{"d":4,"fecha":"2026-09-10","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué la leptina alta de la persona con obesidad no frena el hambre?","a":"Por resistencia a su señal: hay mucha leptina pero el hipotálamo responde poco ('el timbre suena, nadie abre'); por eso dar leptina exógena no funcionó en la obesidad común."},{"d":4,"fecha":"2026-09-10","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué dar leptina exógena no funcionó en la obesidad común?","a":"Porque el problema no es falta de leptina sino falta de respuesta a ella: el hipotálamo ya recibe mucha señal y no la 'escucha'; añadir más no cambia la lectura (solo funciona en la deficiencia congénita de leptina)."},{"d":4,"fecha":"2026-09-10","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué asimetría del sistema explica que sea más fácil subir de peso que bajar?","a":"El cerebro responde con fuerza a la CAÍDA de leptina (defensa contra la hambruna: más hambre, menos gasto) y débilmente a su SUBIDA: el sistema está diseñado para proteger reservas, no para evitar excesos."},{"d":6,"fecha":"2026-09-14","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué hacen las neuronas AgRP/NPY del núcleo arcuato?","a":"Son el ACELERADOR del hambre: se activan con déficit energético (leptina baja, grelina alta) y disparan búsqueda e ingesta de comida."},{"d":6,"fecha":"2026-09-14","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué es 'hambre hormonal' vs 'hambre real' en consulta?","a":"Hambre hormonal = AgRP activada por señales (leptina↓/grelina↑) aunque haya reservas; hambre real = necesidad energética. La primera no se resuelve con fuerza de voluntad."},{"d":6,"fecha":"2026-09-14","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué señales activan a las neuronas AgRP y cuál es la consecuencia conductual?","a":"Grelina alta (estómago vacío) y leptina baja (reservas cayendo); al activarse disparan búsqueda de comida, ingesta y menor gasto: es el 'acelerador' del hambre."},{"d":7,"fecha":"2026-09-15","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué hacen las neuronas POMC/α-MSH?","a":"Son el FRENO de saciedad: las activan la leptina y las señales de saciedad y reducen la ingesta. El balance AgRP (acelerador) / POMC (freno) fija el hambre del momento."},{"d":7,"fecha":"2026-09-15","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Cómo se relacionan AgRP y POMC entre sí?","a":"Son poblaciones antagónicas del arcuato: AgRP bloquea la vía de saciedad (señal melanocortina) mientras POMC libera α-MSH que la activa; el balance entre ambas define hambre o saciedad en cada momento."},{"d":7,"fecha":"2026-09-15","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"Metáfora acelerador/freno: ¿qué corresponde a qué?","a":"Acelerador = AgRP/NPY (hambre; activado por grelina y leptina baja). Freno = POMC/α-MSH (saciedad; activado por leptina y señales intestinales). En la dieta el acelerador se pisa más y el freno se afloja."},{"d":8,"fecha":"2026-09-16","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué sube la grelina tras la dieta?","a":"La grelina (gástrica, orexigénica, pico preprandial) AUMENTA de forma sostenida con la restricción calórica: es parte de la respuesta defensiva del set point, no un fallo del paciente."},{"d":8,"fecha":"2026-09-16","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"'Doctor, ¿por qué tengo MÁS hambre desde que hago dieta?' — respuesta mecanística","a":"Grelina alta + leptina baja → AgRP activado: hambre hormonal esperable tras restringir; por eso el tratamiento no puede ser solo 'aguantar'."},{"d":8,"fecha":"2026-09-16","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Cuándo es fisiológico el pico de grelina y qué cambia tras perder peso?","a":"Sube antes de cada comida (estómago vacío) y baja al comer; tras la pérdida de peso su nivel basal queda más alto de forma sostenida, por eso el hambre 'de fondo' aumenta."},{"d":9,"fecha":"2026-09-17","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Cómo avisa el intestino al cerebro que ya comiste?","a":"Tras la comida libera GLP-1, PYY y CCK → señal de saciedad vía tronco encefálico. Es la base fisiológica de los fármacos GLP-1 (copian una hormona que el intestino ya produce)."},{"d":9,"fecha":"2026-09-17","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué dispara la liberación de GLP-1, PYY y CCK y por qué vía llegan al cerebro?","a":"Se liberan desde el intestino cuando llegan nutrientes; actúan por el nervio vago y el tronco encefálico (núcleo del tracto solitario) y desde ahí sobre el hipotálamo: el mensaje es 'ya comiste, frena'."},{"d":9,"fecha":"2026-09-17","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué las señales intestinales de saciedad son la base de los fármacos del módulo 2?","a":"Porque los agonistas de GLP-1 copian una de esas señales y la mantienen activa durante días: el cerebro recibe 'estamos satisfechos' de forma sostenida y el vaciamiento gástrico se enlentece."},{"d":11,"fecha":"2026-09-21","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Dónde convergen leptina, grelina y las señales intestinales, y qué informa cada una?","a":"Convergen en hipotálamo (arcuato AgRP/POMC) y tronco encefálico: leptina = reservas; grelina = estómago vacío; GLP-1/PYY/CCK = comida reciente."},{"d":11,"fecha":"2026-09-21","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"Clasifica las señales: ¿cuáles son de largo plazo y cuáles de corto plazo?","a":"Largo plazo (reservas): leptina. Corto plazo (comida en curso): grelina antes de comer; GLP-1, PYY y CCK después. El arcuato integra ambas para decidir hambre y gasto."},{"d":11,"fecha":"2026-09-21","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué una dieta 'activa todas las alarmas' a la vez?","a":"Cae la leptina (reservas bajan) y sube la grelina (estómago vacío), mientras las señales de saciedad postprandiales son menores por comer menos: todo el sistema empuja hacia comer y ahorrar."},{"d":12,"fecha":"2026-09-22","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué es la termogénesis adaptativa?","a":"Tras perder peso el gasto energético cae MÁS de lo que predice la masa perdida: el cuerpo 'ahorra' para recuperar el peso defendido."},{"d":12,"fecha":"2026-09-22","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"'Bajé de peso y ahora quemo menos, ¿estoy roto?'","a":"No: es adaptación metabólica esperable (gasto↓ + hambre↑). Se planifica para ella (proteína, fuerza, tratamiento crónico) en vez de sorprenderse."},{"d":12,"fecha":"2026-09-22","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué componentes del gasto bajan al perder peso y cuál es el 'extra' de la termogénesis adaptativa?","a":"Baja el gasto por menor masa corporal (esperable) y además cae por debajo de lo que esa masa predice: ese exceso de caída es la termogénesis adaptativa (mayor eficiencia muscular, menor tono simpático/tiroideo)."},{"d":13,"fecha":"2026-09-23","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué la adaptación metabólica persiste años?","a":"Porque la respuesta hormonal a la pérdida (leptina baja, grelina alta, menos saciedad) no se apaga con el tiempo — de ahí el argumento del tratamiento crónico."},{"d":13,"fecha":"2026-09-23","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"'Ya pasó un año, ¿mi cuerpo ya se acostumbró al nuevo peso?' — respuesta mecanística","a":"No necesariamente: en los seguimientos, la leptina baja y la grelina alta persisten años después de la pérdida; el sistema sigue leyendo el nuevo peso como déficit."},{"d":14,"fecha":"2026-09-24","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué la obesidad se maneja como la hipertensión?","a":"Porque la adaptación metabólica persiste: al retirar el tratamiento vuelve la presión biológica hacia el peso anterior, igual que la presión arterial sube al dejar el antihipertensivo."},{"d":14,"fecha":"2026-09-24","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"Objeción '¿de por vida?' — respuesta honesta","a":"Tratamiento a largo plazo con revisión periódica; el plan de salida es gradual y se decide con datos (no una promesa de 'cura')."},{"d":14,"fecha":"2026-09-24","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué paralelismo exacto hay entre obesidad e hipertensión para explicar la cronicidad?","a":"Ambas son enfermedades de un sistema regulador desajustado: el tratamiento controla la variable mientras se aplica y, al retirarlo, la variable vuelve porque el mecanismo de base sigue ahí."},{"d":16,"fecha":"2026-09-28","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué distingue una tarjeta de MECANISMO de un dato suelto?","a":"Pregunta '¿por qué?' y encadena causa→efecto (dieta → leptina↓ → AgRP↑ → hambre↑), no 'STEP 1 = 14,9 %' aislado."},{"d":16,"fecha":"2026-09-28","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Cómo se redacta una buena tarjeta de mecanismo (formato Palmerton)?","a":"Pregunta '¿por qué / cómo?' → respuesta que encadena causa → efecto → consecuencia clínica en 1-3 frases; sin listas de datos sueltos; una idea por tarjeta."},{"d":16,"fecha":"2026-09-28","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Por qué el pre-test ciego del lunes se hace ANTES de repasar?","a":"Porque el recuerdo en ciego (testing effect) consolida más que releer y da una medida honesta: el % ciego dice qué se sabe, no qué se leyó."},{"d":17,"fecha":"2026-09-29","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"Recorrido inverso: la recuperación de peso tras una dieta ← ¿qué cadena?","a":"← hambre↑ y gasto↓ ← leptina↓ / grelina↑ ← pérdida de peso leída por el hipotálamo como amenaza al set point."},{"d":17,"fecha":"2026-09-29","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"Explica en 4 pasos hacia atrás por qué la semana 8 de dieta es más difícil que la semana 1","a":"Peso ↓ → leptina ↓ y grelina ↑ → AgRP más activo y POMC menos → más hambre y menos gasto: cada semana el sistema empuja más fuerte contra el déficit."},{"d":18,"fecha":"2026-09-30","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Cuándo usar termostato, timbre y acelerador/freno?","a":"Termostato = por qué se recupera el peso (set point); timbre = resistencia leptínica; acelerador/freno = hambre vs saciedad (AgRP vs POMC)."},{"d":18,"fecha":"2026-09-30","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué metáfora eliges para el paciente que dice 'tengo hambre todo el tiempo'?","a":"Timbre: la grelina toca el timbre antes de comer y en dieta el timbre suena más veces y más fuerte; no es 'ansiedad', es una señal biológica a la que el tratamiento puede bajarle el volumen."},{"d":19,"fecha":"2026-10-01","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"Resume en una frase por qué el cuerpo defiende su peso.","a":"Un sistema hipotalámico lee reservas (leptina), estómago (grelina) e intestino (GLP-1/PYY/CCK) y, ante la pérdida, sube el hambre y baja el gasto de forma persistente."},{"d":19,"fecha":"2026-10-01","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Qué debe contener el §1 (fundamento) del protocolo en 10 líneas?","a":"Definición (enfermedad del sistema regulador), set point, adaptación metabólica persistente, consecuencia (tratamiento crónico), las 3 metáforas y la regla de lenguaje sin culpa."},{"d":19,"fecha":"2026-10-01","modulo":"FISIOLOGÍA","deck":"APEX::LIVIANO::fisiologia","q":"¿Cuál es la conclusión clínica única del módulo 1?","a":"Perder peso es fácil de empezar y difícil de sostener por biología, no por carácter; por eso el plan LIVIANO es crónico y mide adherencia, no voluntad."},{"d":21,"fecha":"2026-10-05","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué hace el GLP-1 endógeno?","a":"Saciedad central, enlentece el vaciamiento gástrico y estimula insulina de forma dependiente de glucosa."},{"d":21,"fecha":"2026-10-05","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué 'copiar una hormona que el intestino ya produce' es la metáfora ancla del módulo?","a":"Porque explica sin miedo el mecanismo (agonista de un receptor fisiológico) y conecta con la señal de saciedad del módulo 1."},{"d":21,"fecha":"2026-10-05","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Cuáles son los 3 efectos del GLP-1 y cómo se traduce cada uno a lo que siente el paciente?","a":"Saciedad central → 'menos ruido de comida'; vaciamiento gástrico lento → 'me lleno antes' (y náusea si come rápido/graso); insulina dependiente de glucosa → mejor glucemia sin hipoglucemia por sí solo."},{"d":22,"fecha":"2026-10-06","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"STEP 1 (semaglutida 2,4 mg): ¿cifra ancla?","a":"−14,9 % vs −2,4 % con placebo a 68 semanas."},{"d":22,"fecha":"2026-10-06","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué traducir el % a kilos del paciente en consulta?","a":"Porque el paciente decide con kilos, no con porcentajes: −14,9 % de 90 kg ≈ 13 kg; ancla expectativas realistas sin prometer (CMP Art. 73)."},{"d":22,"fecha":"2026-10-06","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué el −2,4 % del brazo placebo de STEP 1 importa tanto como el −14,9 %?","a":"Porque ambos brazos tuvieron intervención de estilo de vida: la diferencia (~12,5 puntos) es el efecto atribuible al fármaco, y muestra lo poco que logra la vía conductual sola en 68 semanas."},{"d":23,"fecha":"2026-10-07","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué pasa al suspender la semaglutida sin cambiar nada más?","a":"Se recupera ~67 % del peso perdido en 1 año."},{"d":23,"fecha":"2026-10-07","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué se recupera el peso al suspender el GLP-1?","a":"El fármaco baja el 'volumen' de la señal de hambre pero no resetea el set point: al retirarlo vuelve la presión biológica (módulo 1) → base de la cronicidad y del plan de mantenimiento."},{"d":23,"fecha":"2026-10-07","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Cómo se usa el dato del 67 % en la decisión compartida de suspensión?","a":"Como probabilidad, no como amenaza: 'si lo dejamos sin cambiar nada más, lo esperable es recuperar dos tercios en un año'; luego se ofrecen opciones (mantener, reducir, salida gradual con criterios de reinicio)."},{"d":24,"fecha":"2026-10-08","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"SELECT: ¿población y resultado?","a":"Obesidad + enfermedad cardiovascular sin diabetes: ~−20 % de eventos cardiovasculares mayores con semaglutida."},{"d":24,"fecha":"2026-10-08","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué SELECT cambia la conversación de 'estética' a 'salud'?","a":"Porque demuestra reducción de eventos cardiovasculares mayores en personas con obesidad y enfermedad cardiovascular sin diabetes: el beneficio no depende solo de los kilos; se trata una enfermedad, no una apariencia."},{"d":24,"fecha":"2026-10-08","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿A quién NO se le puede extrapolar SELECT y por qué?","a":"A quien no tiene enfermedad cardiovascular establecida (población distinta): decir 'te protege el corazón' a un paciente sano de 30 años es extrapolar fuera del estudio (regla anti-alucinación)."},{"d":26,"fecha":"2026-10-12","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"SURMOUNT-1 (tirzepatida): ¿cifras por dosis?","a":"−15 % (5 mg) / −19,5 % (10 mg) / −20,9 % (15 mg) vs −3,1 % placebo."},{"d":26,"fecha":"2026-10-12","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué significa que la tirzepatida sea 'dual'?","a":"Agonista de dos receptores (GIP + GLP-1): 'dos llaves en dos cerraduras' de la saciedad y el metabolismo."},{"d":26,"fecha":"2026-10-12","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué se puede afirmar y qué no sobre por qué la tirzepatida pierde más peso que el GLP-1 solo?","a":"Afirmable: es agonista dual GIP/GLP-1 y en SURMOUNT-1 llegó a −20,9 % vs −3,1 % placebo. No afirmable en consulta: el mecanismo exacto del aporte del GIP (en estudio); se explica el resultado, no una teoría."},{"d":27,"fecha":"2026-10-13","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"SURMOUNT-1 en prediabetes: ¿dato preventivo?","a":"94 % de reducción de la progresión a diabetes."},{"d":27,"fecha":"2026-10-13","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Cómo explicas el 94 % sin prometer 'no vas a tener diabetes'?","a":"Es reducción RELATIVA de la progresión frente a placebo en el estudio, mientras se toma el fármaco; se dice 'baja mucho el riesgo mientras tratamos', nunca garantía individual (CMP Art. 73)."},{"d":28,"fecha":"2026-10-14","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"SURMOUNT-5 (head-to-head): ¿resultado?","a":"Tirzepatida ~20 % vs semaglutida ~14 % de pérdida de peso."},{"d":28,"fecha":"2026-10-14","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué NO concluir de SURMOUNT-5?","a":"Que la semaglutida 'no sirve': la elección se individualiza por costo, tolerancia, comorbilidad (p. ej. SELECT en ECV) y disponibilidad real en Perú."},{"d":28,"fecha":"2026-10-14","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Cómo usas SURMOUNT-5 con un paciente que solo puede pagar semaglutida?","a":"Ambas mueven la aguja (~14 % también es clínicamente relevante); se elige la que puede sostener meses: la mejor molécula es la que no se abandona."},{"d":29,"fecha":"2026-10-15","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Cuáles son los EA dominantes de los GLP-1 y cuál es EL manejo?","a":"Gastrointestinales (náusea, vómito, estreñimiento). El manejo es la escalada LENTA de dosis + porciones pequeñas, menos grasa, hidratación."},{"d":29,"fecha":"2026-10-15","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué la escalada lenta reduce los EA?","a":"Da tiempo a la adaptación al enlentecimiento gástrico y a la saciedad central antes de subir la dosis (esquema exacto: ficha técnica — A VERIFICAR)."},{"d":29,"fecha":"2026-10-15","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué mecanismo explica la náusea y el vómito de los GLP-1?","a":"Vaciamiento gástrico enlentecido + acción central sobre el tronco encefálico: el estómago se llena antes y el cerebro recibe señal de 'demasiado'; por eso porciones pequeñas, menos grasa y comer lento reducen el síntoma."},{"d":31,"fecha":"2026-10-19","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Cuál es la contraindicación dura de los GLP-1?","a":"Antecedente personal/familiar de carcinoma medular de tiroides o MEN2 (motivo exacto en ficha técnica — A VERIFICAR)."},{"d":31,"fecha":"2026-10-19","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué eventos raros exigen suspender y evaluar de urgencia?","a":"Pancreatitis (dolor abdominal intenso irradiado a espalda + vómitos), colelitiasis sintomática, gastroparesia; cualquiera → suspender y evaluar antes de reintroducir."},{"d":31,"fecha":"2026-10-19","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué otros escenarios son gatillo de suspensión + derivación (no cifra, criterio)?","a":"Embarazo o búsqueda de embarazo → suspender y derivar a obstetricia (periodo de lavado según ficha técnica — A VERIFICAR)."},{"d":31,"fecha":"2026-10-19","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué preguntas del screening previo a prescribir se derivan de cada evento de seguridad?","a":"MEN2/CMT: antecedente personal/familiar de carcinoma medular de tiroides; pancreatitis: episodio previo, alcohol, triglicéridos muy altos; biliar: cólico/cálculos sintomáticos; embarazo/lactancia o búsqueda de embarazo."},{"d":32,"fecha":"2026-10-20","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué con GLP-1 se pierde músculo además de grasa?","a":"Porque un déficit calórico grande y sostenido pierde también masa magra; el fármaco reduce mucho la ingesta → sin proteína (1,2-1,6 g/kg) ni fuerza (2x/sem) la pérdida incluye músculo."},{"d":32,"fecha":"2026-10-20","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué cualquier pérdida de peso rápida pierde músculo y cómo lo minimiza LIVIANO?","a":"En déficit el cuerpo usa también proteína muscular como sustrato; sin estímulo (fuerza) ni ladrillos (proteína) parte de lo perdido es masa magra. Proteína 1,2-1,6 g/kg + fuerza 2x/semana dan la señal de 'conservar músculo'."},{"d":32,"fecha":"2026-10-20","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué signo clínico simple sugiere pérdida de masa magra en un paciente con GLP-1?","a":"Pérdida de fuerza funcional (le cuesta subir escaleras, sentarse-levantarse peor, agarre más débil) mientras la balanza baja: la balanza no distingue; la fuerza sí."},{"d":33,"fecha":"2026-10-21","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué novedad de vía oral existe para semaglutida y desde cuándo?","a":"Wegovy en tabletas — FDA dic-2025 (requisitos de toma y disponibilidad en Perú: A VERIFICAR)."},{"d":33,"fecha":"2026-10-21","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿A quién le conviene la vía oral de semaglutida y qué exige?","a":"A quien rechaza inyecciones o tiene una barrera práctica; requiere condiciones de toma según ficha técnica (A VERIFICAR) y registro en Perú (tabla de acceso): sin eso, no se ofrece."},{"d":33,"fecha":"2026-10-21","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué se le dice al paciente que 'leyó que ahora hay pastilla'?","a":"Que existe en EE. UU. (FDA dic-2025) y que su disponibilidad y precio en Perú se verifican, no se suponen; mientras tanto se usa lo que tiene registro."},{"d":34,"fecha":"2026-10-22","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"Orforglipron: ¿qué es y cifra de ACHIEVE-1?","a":"GLP-1 ORAL no peptídico (FDA abr-2026): ~8 % en diabéticos, EA GI 44-70 %."},{"d":34,"fecha":"2026-10-22","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué hay en pipeline y qué se le dice al paciente que lo 'leyó en TikTok'?","a":"Retatrutide y CagriSema (en desarrollo). Se explica que no se prescribe lo no aprobado ni se prometen cifras de estudios en curso."},{"d":34,"fecha":"2026-10-22","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué 'GI 44-70 %' de orforglipron es un dato para el consentimiento y no para el marketing?","a":"Porque la tolerancia decide la adherencia: una molécula oral 'cómoda' con alta tasa de EA GI puede abandonarse; el paciente debe saberlo antes, no después."},{"d":36,"fecha":"2026-10-26","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué LIVIANO revisa la farmacoterapia cada trimestre?","a":"Porque aprobaciones y precios se mueven rápido: genéricos de semaglutida en Brasil/India desde mar-2026 → el costo en Perú cambiará."},{"d":36,"fecha":"2026-10-26","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué efecto tendrá un genérico de semaglutida sobre el modelo LIVIANO?","a":"Baja el COGS y el precio de mercado: la ventaja del magistral se erosiona y el valor pasa al acompañamiento; por eso el margen se justifica con servicio, no con el fármaco."},{"d":36,"fecha":"2026-10-26","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué tres cosas cambian cuando cae el precio del fármaco?","a":"Value stack (medicamento 3 m), COGS/KPI margen y objeciones de precio; las tres se recalculan en la revisión trimestral con cotizaciones fechadas."},{"d":37,"fecha":"2026-10-27","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Por qué las cifras ancla se drillean en ciego y no se releen?","a":"Porque en consulta se recuperan sin notas; el recuerdo activo con retroalimentación inmediata es lo que las fija (testing effect); lo fallado va a Anki el mismo día."},{"d":38,"fecha":"2026-10-28","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"Estructura mínima del protocolo de prescripción LIVIANO","a":"Candidato (IMC/comorbilidad) → screening de contraindicaciones (MEN2/CMT, embarazo, pancreatitis) → labs basales → inicio y escalada lenta (ficha técnica) → check-in de EA → criterios de escalada/suspensión/derivación."},{"d":38,"fecha":"2026-10-28","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué criterio de suspensión NO negociable debe llevar el protocolo?","a":"Sospecha de pancreatitis (dolor abdominal intenso irradiado a la espalda + vómitos), embarazo o búsqueda de embarazo, y EA intolerables pese a mantener la dosis: suspender, evaluar/derivar y no reintroducir sin decisión compartida."},{"d":38,"fecha":"2026-10-28","modulo":"GLP-1","deck":"APEX::LIVIANO::glp1","q":"¿Qué significa 'no escalar mientras haya EA GI'?","a":"La dosis sube solo cuando la actual se tolera: la escalada lenta ES el manejo del EA; subir con náusea activa multiplica el abandono."},{"d":39,"fecha":"2026-10-29","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Por qué un registro sanitario vigente es prerrequisito de la oferta LIVIANO?","a":"Sin registro no hay dispensación legal ni trazabilidad por lote; el riesgo cae sobre el médico prescriptor. Dato exacto por molécula: LIVIANO_ACCESO_PERU (A VERIFICAR en DIGEMID)."},{"d":39,"fecha":"2026-10-29","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"Regla anti-alucinación aplicada al registro sanitario","a":"Solo se afirma lo capturado con fecha en el portal oficial; si no aparece se escribe 'SIN REGISTRO HALLADO (fecha)'."},{"d":39,"fecha":"2026-10-29","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Qué se le dice al paciente si el registro aún no está verificado?","a":"La verdad con fecha: 'lo estoy verificando en DIGEMID, te lo confirmo el (fecha)'; nunca 'sí, es legal' sin captura fechada."},{"d":41,"fecha":"2026-11-02","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Qué determina la 'condición de venta' de un producto y por qué importa para LIVIANO?","a":"La fija el registro sanitario (venta con receta / receta retenida — A VERIFICAR): define quién dispensa, qué documento queda y cómo se diseña el flujo receta → farmacia → paciente en el CRM."},{"d":41,"fecha":"2026-11-02","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Cuál es el flujo mínimo receta → farmacia → paciente que debe quedar documentado?","a":"Quién prescribe (médico LIVIANO), qué documento entrega, dónde se dispensa (farmacia licenciada), qué queda registrado (receta retenida o no, según condición de venta) y cómo se anota en el CRM."},{"d":41,"fecha":"2026-11-02","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Por qué la condición de venta afecta al diseño del programa y no solo a la legalidad?","a":"Porque define si el paciente puede comprar por su cuenta o depende de la receta en cada ciclo: cambia la cadencia de consultas, el kit de bienvenida y la logística."},{"d":42,"fecha":"2026-11-03","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Por qué el value stack de LIVIANO no puede publicar un precio de fármaco sin cotización fechada?","a":"Porque el precio cambia rápido (genéricos 2026) y un precio inventado rompe la confianza y el margen: la regla es 2 cotizaciones fechadas + fecha de verificación en LIVIANO_ACCESO_PERU."},{"d":42,"fecha":"2026-11-03","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Por qué dos cotizaciones (cadena + independiente) y no una?","a":"Porque los precios de farmacia varían y la oferta usa un número público: dos fuentes fechadas evitan publicar un precio inventado o desactualizado."},{"d":42,"fecha":"2026-11-03","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Qué se recalcula si el fármaco cuesta más de lo asumido en el value stack?","a":"El 'medicamento 3 m' del stack, el COGS por paciente-mes y el margen del tier; si el margen cae por debajo de lo aceptable se ajusta la escalera de precios, no la calidad del producto."},{"d":43,"fecha":"2026-11-04","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Por qué el magistral es 'ventaja temporal, no cimiento'?","a":"Está expuesto regulatoriamente (legalidad A VERIFICAR con QF/abogado) y su costo cambia con los genéricos; LIVIANO necesita plan B de marca y siempre certificado de análisis por lote."},{"d":43,"fecha":"2026-11-04","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Qué dos pendientes rojos cierra este día y con qué salida?","a":"'Legalidad DIGEMID' y 'Cotización Sterilelabs' → filas de LIVIANO_ACCESO_PERU con fecha de verificación y dueño."},{"d":43,"fecha":"2026-11-04","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Qué hace aceptable un magistral para LIVIANO y qué lo hace inaceptable?","a":"Aceptable: farmacia licenciada + certificado de análisis por lote + dictamen de legalidad. Inaceptable: cualquier producto sin trazabilidad de lote o temperatura ('mercado gris'), aunque sea más barato."},{"d":44,"fecha":"2026-11-05","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Qué rango de temperatura exige la cadena de frío del GLP-1 y qué dos cosas debe saber el paciente?","a":"2–8 °C extremo a extremo; (1) cómo transportarlo/almacenarlo en casa y (2) cuánto tiempo puede estar fuera de refrigeración (ficha técnica — A VERIFICAR por producto)."},{"d":44,"fecha":"2026-11-05","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Por qué la puerta del refrigerador no es un buen sitio para la pluma?","a":"Es la zona con más oscilación de temperatura al abrir y cerrar; la pluma va en un estante interior a 2–8 °C, lejos del congelador (nunca congelar)."},{"d":44,"fecha":"2026-11-05","modulo":"ACCESO PERÚ","deck":"APEX::LIVIANO::acceso_peru","q":"¿Qué hace el paciente ante una excursión de temperatura (bus sin gel frío, corte de luz)?","a":"No usar ni desechar por su cuenta: anota tiempo y temperatura aproximada y consulta; el límite de tiempo fuera de frío se lee en la ficha técnica del producto (A VERIFICAR)."},{"d":46,"fecha":"2026-11-09","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"¿Qué 6 puntos cubre la revisión trimestral de farmacoterapia de LIVIANO?","a":"Aprobaciones nuevas · alertas de seguridad · recotización (2 farmacias + magistral) · genéricos LATAM · actualizar tabla de acceso + value stack · tarjetas Anki nuevas."},{"d":46,"fecha":"2026-11-09","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"¿Qué pregunta abre la revisión trimestral?","a":"'¿Qué cambió desde la última fecha de verificación?' — aprobaciones, seguridad, precio, genéricos; cada respuesta con fuente y fecha o queda como PENDIENTE."},{"d":46,"fecha":"2026-11-09","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"¿Por qué el value stack se re-verifica cada trimestre y no una sola vez?","a":"Porque el precio del fármaco es la variable que más se mueve (genéricos, nuevas vías): un número viejo publicado es una afirmación falsa."},{"d":47,"fecha":"2026-11-10","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Cuál es la vía final común de toda dieta que funciona?","a":"Un balance energético negativo SOSTENIDO; el nombre de la dieta es el envoltorio, la adherencia es el mecanismo."},{"d":47,"fecha":"2026-11-10","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Por qué 'el déficit es la vía final común' no significa 'come menos y ya'?","a":"Porque el sistema regulador responde al déficit subiendo el hambre y bajando el gasto: crear el déficit es fácil, sostenerlo es lo difícil; la estrategia debe hacerlo sostenible (proteína, saciedad, fármaco)."},{"d":47,"fecha":"2026-11-10","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué tienen en común keto, ayuno y baja en grasa cuando funcionan?","a":"Que reducen la ingesta total sostenida (por saciedad, por reglas o por restricción de horario): el mecanismo es el mismo, cambia el envoltorio."},{"d":48,"fecha":"2026-11-11","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"DIETFITS: ¿qué demostró?","a":"Low-fat vs low-carb NO difieren en pérdida de peso al año cuando ambas son de alta calidad (comida real)."},{"d":48,"fecha":"2026-11-11","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"'¿Keto o baja en grasa?' — respuesta mecanística","a":"Da igual el nombre si la calidad es alta (DIETFITS): elige la que puedas sostener; lo innegociable es la proteína."},{"d":48,"fecha":"2026-11-11","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué variable sí importó en DIETFITS más que el macronutriente?","a":"La calidad de la comida (mínimamente procesada, vegetales, sin azúcar añadido) y la adherencia: con esa base, low-fat y low-carb dieron resultados similares al año."},{"d":49,"fecha":"2026-11-12","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué variable predice el resultado de una dieta y cómo se mide en consulta?","a":"La ADHERENCIA (no el nombre): se mide con automonitoreo (registro de comidas) y cumplimiento del plan pactado semana a semana."},{"d":49,"fecha":"2026-11-12","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Cómo se mide la adherencia en consulta sin culpa?","a":"Con una métrica pactada y observable (días con plato cumplido/semana, registro de comidas, proteína alcanzada) y preguntando qué la dificultó, no si 'se portó bien'."},{"d":49,"fecha":"2026-11-12","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué convierte una dieta en 'adherible'?","a":"Que quepa en la vida real del paciente: horarios, presupuesto, comida familiar y cultura; lo que se prescribe se diseña con él, no para él."},{"d":51,"fecha":"2026-11-16","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"Ayuno intermitente vs restricción continua: ¿qué dice el meta-análisis?","a":"24 RCTs, n = 1.768: diferencia 0,26 kg, NO significativa — el AI es otra forma de crear déficit, no un mecanismo superior."},{"d":51,"fecha":"2026-11-16","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué concluye el meta-análisis de ayuno intermitente y qué NO concluye?","a":"Que no es superior a la restricción continua (diferencia 0,26 kg, no significativa; 24 RCTs, n=1.768); NO concluye que sea inútil: es una herramienta más para crear déficit si al paciente le resulta fácil."},{"d":51,"fecha":"2026-11-16","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Cuándo tiene sentido usar el 16/8 en LIVIANO?","a":"Cuando mejora la adherencia de ese paciente (p. ej., ya no desayuna) y no compromete la cuota proteica ni la fuerza; nunca como dogma ni como promesa de mecanismo especial."},{"d":52,"fecha":"2026-11-17","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué pasa con la adherencia dietética en el tiempo?","a":"Adherencia > 80 % solo en estudios < 3 meses: el problema es SOSTENER; por eso el plan se diseña para el mes 6, no para la semana 2."},{"d":52,"fecha":"2026-11-17","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué implica para el diseño del programa que la adherencia caiga después de 3 meses?","a":"Que el plan debe diseñarse para el mes 6, no para la semana 1: metas pequeñas, revisiones programadas, automonitoreo y anticipar el momento de la caída."},{"d":52,"fecha":"2026-11-17","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué se le dice al paciente que 'siempre abandona a las 6 semanas'?","a":"Que su patrón es el de casi todos los estudios: no es un defecto suyo; ahora diseñamos el plan sabiendo dónde está el bache."},{"d":53,"fecha":"2026-11-18","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Cuál es la cuota proteica LIVIANO y por qué es innegociable con GLP-1?","a":"1,2-1,6 g/kg/día: saciedad + protección de masa magra cuando la ingesta cae mucho por el fármaco."},{"d":53,"fecha":"2026-11-18","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"Cálculo rápido: proteína diaria para 80 kg","a":"1,2-1,6 g/kg → 96-128 g/día (aritmética del rango del currículo)."},{"d":53,"fecha":"2026-11-18","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Por qué la proteína protege el músculo en déficit y qué papel tiene la fuerza?","a":"Aporta aminoácidos para la síntesis muscular y sacia más por caloría; la fuerza da la señal de que ese músculo se necesita: sin señal, el cuerpo lo sacrifica aunque haya proteína."},{"d":54,"fecha":"2026-11-19","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"3 estrategias para completar la proteína cuando el GLP-1 quita el hambre","a":"Proteína PRIMERO en cada comida · fraccionar en tomas pequeñas · líquidos/lácteos proteicos entre comidas."},{"d":54,"fecha":"2026-11-19","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Por qué 'proteína primero' en cada comida con GLP-1?","a":"Porque el fármaco reduce el apetito y el paciente se llena rápido: si empieza por carbohidratos no llega a la cuota; empezando por la proteína la cuota se completa aun con porciones pequeñas."},{"d":54,"fecha":"2026-11-19","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Cuál es la señal de alarma nutricional en un paciente con GLP-1 que 'come una vez al día'?","a":"Ingesta proteica muy por debajo de 1,2 g/kg, hidratación insuficiente y pérdida de fuerza: no se escala la dosis mientras no coma; se rediseña el día en 3-4 tomas."},{"d":56,"fecha":"2026-11-23","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"Método del plato LIVIANO (versión Huancayo)","a":"Mitad verdura · un cuarto proteína (huevo, trucha, pollo, atún, habas) · un cuarto almidón andino (papa, quinua)."},{"d":56,"fecha":"2026-11-23","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué fuentes proteicas andinas usa el plato LIVIANO de Huancayo?","a":"Trucha, huevo, pollo, cuy, lácteos, quinua y habas/legumbres; la papa entra como carbohidrato controlado, no como plato completo."},{"d":56,"fecha":"2026-11-23","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Cómo se construye el 'método del plato' en 3 partes?","a":"Mitad vegetales, un cuarto proteína (se come primero), un cuarto carbohidrato de calidad; agua en lugar de bebida azucarada."},{"d":57,"fecha":"2026-11-24","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Cómo se desmonta un mito de redes sin humillar al paciente?","a":"Validar la intención → dar el mecanismo real (déficit sostenido, adaptación metabólica) → ofrecer la alternativa que sí funciona; nunca 'eso es una tontería'."},{"d":57,"fecha":"2026-11-24","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Por qué 'metabolismo lento' es a la vez un mito y una verdad a medias?","a":"Mito: no explica la obesidad de origen. Verdad: tras perder peso el gasto sí cae (adaptación metabólica). Se corrige el dato sin ridiculizar al paciente."},{"d":57,"fecha":"2026-11-24","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué mecanismo real hay detrás de una faja o un 'detox' que 'funciona' una semana?","a":"Pérdida de agua/contenido intestinal o restricción calórica encubierta: no cambia grasa ni set point; al parar, vuelve todo."},{"d":58,"fecha":"2026-11-25","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"Política nutricional LIVIANO en una frase","a":"Adherencia primero (la dieta que el paciente puede sostener) + proteína 1,2-1,6 g/kg innegociable + método del plato local."},{"d":58,"fecha":"2026-11-25","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Cuáles son los 3 pilares de la política nutricional LIVIANO?","a":"1) Adherencia primero (la dieta que el paciente puede sostener); 2) proteína innegociable 1,2-1,6 g/kg; 3) comida real local (método del plato), sin dogmas de nombre de dieta."},{"d":58,"fecha":"2026-11-25","modulo":"NUTRICIÓN","deck":"APEX::LIVIANO::nutricion","q":"¿Qué dato respalda cada pilar?","a":"Adherencia: DIETFITS y 'adherencia >80 % solo <3 meses'; proteína: pérdida de masa magra con GLP-1; método del plato: la calidad de la comida como variable de DIETFITS."},{"d":59,"fecha":"2026-11-26","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Cuánto peso baja el ejercicio SIN dieta y qué se concluye?","a":"~2-3 kg: no se promete pérdida por esta vía; su papel es el MANTENIMIENTO y la composición corporal."},{"d":59,"fecha":"2026-11-26","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Por qué el ejercicio solo baja poco peso?","a":"El gasto añadido es modesto frente a la ingesta y el cuerpo compensa (más hambre, menos actividad espontánea); su valor está en mantenimiento, composición y salud cardiometabólica, no en la balanza."},{"d":59,"fecha":"2026-11-26","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Cómo se prescribe ejercicio sin crear la expectativa equivocada?","a":"Diciendo para qué sirve: 'no es para bajar de peso, es para no volver a subirlo y para que lo que pierdas sea grasa y no músculo'."},{"d":61,"fecha":"2026-11-30","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"NWCR: ¿qué hacen los que mantienen la pérdida durante años?","a":"~1 h/día de actividad (≈ 2.800 kcal/semana) — el mejor predictor de mantenimiento."},{"d":61,"fecha":"2026-11-30","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿De dónde sale el umbral 200-300 min/sem?","a":"De las guías clínicas (ACSM), NO del NWCR — no mezclar las dos fuentes al citar."},{"d":61,"fecha":"2026-11-30","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Por qué el mantenimiento exige más actividad que la pérdida?","a":"Porque tras bajar de peso el gasto está reducido (adaptación metabólica): la actividad de ~1 h/día del NWCR compensa esa caída y estabiliza el balance sin restricción extrema."},{"d":62,"fecha":"2026-12-01","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Por qué la fuerza 2x/semana es prescripción médica junto al GLP-1?","a":"Porque preserva la masa magra que el déficit grande tiende a perder; sin fuerza, parte del peso perdido es músculo."},{"d":62,"fecha":"2026-12-01","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Qué le pasa al músculo cuando se pierde peso SIN fuerza y con poca proteína?","a":"Se pierde una fracción relevante de masa magra: menos fuerza, menos gasto en reposo y peor mantenimiento; el paciente termina 'más flaco pero más débil'."},{"d":62,"fecha":"2026-12-01","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Cuál es la dosis mínima de fuerza del estándar LIVIANO?","a":"2 sesiones/semana de fuerza (grandes grupos musculares, progresivas), con cualquier carga: pesas, bandas o peso corporal; lo importante es la señal, no el gimnasio."},{"d":63,"fecha":"2026-12-02","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"'Fitness vs fatness': ¿qué significa?","a":"El beneficio cardiometabólico del ejercicio es independiente del peso: la capacidad cardiorrespiratoria predice mortalidad aunque el IMC no cambie."},{"d":63,"fecha":"2026-12-02","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"'Fitness vs fatness': ¿qué cambia en la conversación con el paciente que no baja de peso?","a":"Que su capacidad cardiorrespiratoria ya lo protege aunque el IMC no cambie: el ejercicio 'cuenta' incluso con la balanza quieta; la meta se mide también en capacidad."},{"d":64,"fecha":"2026-12-03","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Qué mide LIVIANO además de la balanza y por qué?","a":"Cintura, fotos, fuerza (y bioimpedancia si hay): la balanza no distingue músculo de grasa; nosotros sí."},{"d":64,"fecha":"2026-12-03","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Qué 4 medidas simples registran composición sin bioimpedancia?","a":"Cintura (cada 2-4 semanas), fotos estandarizadas (mensual), pruebas de fuerza (agarre, sentarse-levantarse) y cómo queda la ropa; la balanza se mira con esos datos al lado."},{"d":64,"fecha":"2026-12-03","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Por qué la cintura importa más que el peso para la salud metabólica?","a":"Estima la grasa visceral, la más ligada al riesgo cardiometabólico; puede bajar aunque el peso se estanque si se conserva músculo."},{"d":66,"fecha":"2026-12-07","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"Estándar LIVIANO innegociable junto a todo GLP-1","a":"Proteína 1,2-1,6 g/kg + fuerza 2x/semana (+ actividad diaria para el mantenimiento)."},{"d":66,"fecha":"2026-12-07","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Por qué el estándar (proteína + fuerza) va en el consentimiento y no en 'consejos'?","a":"Porque sin él el fármaco produce pérdida de músculo: es parte del tratamiento, se pacta y se mide, como la dosis."},{"d":66,"fecha":"2026-12-07","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Qué se le pide al paciente que 'no puede ir al gimnasio'?","a":"Un plan mínimo en casa (sentadillas, empujes, remo con banda) 2 veces por semana de 20-30 min: lo que puede sostener, no lo ideal."},{"d":67,"fecha":"2026-12-08","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"Principio de prescripción de ejercicio LIVIANO","a":"Empezar ridículamente fácil (adherencia) y progresar cada 2 semanas; fuerza 2x/sem + caminata diaria; medir fuerza y cintura, no solo peso."},{"d":67,"fecha":"2026-12-08","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Qué significa 'empezar ridículamente fácil'?","a":"Una dosis que el paciente cumpla con seguridad (p. ej., 10 min de caminata o 1 serie), porque la primera meta es crear el hábito; la progresión viene cada 2 semanas."},{"d":67,"fecha":"2026-12-08","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Qué se ajusta primero al progresar: duración, frecuencia o intensidad?","a":"Frecuencia y duración antes que intensidad: menos riesgo de lesión y de abandono; la intensidad sube cuando el hábito ya está."},{"d":68,"fecha":"2026-12-09","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"Métricas del protocolo LIVIANO (M3-4) y su cadencia","a":"Peso + cintura + fuerza (semanal/quincenal), fotos (mensual), labs (trimestral — panel A VERIFICAR); la meta se define en composición, no solo en kg."},{"d":68,"fecha":"2026-12-09","modulo":"EJERCICIO","deck":"APEX::LIVIANO::ejercicio","q":"¿Con qué cadencia se miden las métricas del protocolo?","a":"Peso y cintura semanal/quincenal, fuerza cada 4 semanas, fotos mensuales, labs según cadencia a verificar; siempre en las mismas condiciones para poder comparar."},{"d":69,"fecha":"2026-12-10","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿A qué fenotipo de paciente 'le habla' naltrexona/bupropión?","a":"Al comer emocional / craving (actúa en el circuito de recompensa), como alternativa cuando el GLP-1 no es opción (costo, tolerancia, disponibilidad)."},{"d":69,"fecha":"2026-12-10","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Cuándo tienen sentido las opciones no-GLP1?","a":"Costo, intolerancia o falta de acceso al GLP-1 — siempre con registro sanitario verificado en Perú (A VERIFICAR) y expectativas honestas de eficacia."},{"d":69,"fecha":"2026-12-10","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Qué mecanismo tiene fentermina/topiramato y por qué exige cautela?","a":"Fentermina (simpaticomimético: menos apetito) + topiramato (efecto sobre saciedad/impulso); interacciones y contraindicaciones relevantes (cardiovasculares, embarazo — ficha técnica A VERIFICAR): solo con registro y screening."},{"d":71,"fecha":"2026-12-14","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"Orlistat y metformina off-label: ¿papel real?","a":"Eficacia modesta; suman en casos concretos y son 'placebo caro' si se venden como solución principal."},{"d":71,"fecha":"2026-12-14","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Cuándo sospechar obesidad monogénica y qué fármaco existe?","a":"Obesidad severa de inicio muy temprano + hiperfagia → estudio genético; setmelanotida solo para obesidad monogénica confirmada (derivación)."},{"d":71,"fecha":"2026-12-14","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Qué señal en la historia hace sospechar obesidad monogénica?","a":"Obesidad severa de inicio muy temprano (primeros años) con hiperfagia intensa, a veces con antecedentes familiares: se deriva a estudio genético; setmelanotida es solo para variantes concretas (criterios A VERIFICAR)."},{"d":72,"fecha":"2026-12-15","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"ASMBS/IFSO 2022: ¿criterio principal de cirugía?","a":"IMC ≥ 35 sin exigir comorbilidades (reemplaza NIH 1991)."},{"d":72,"fecha":"2026-12-15","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Por qué ASMBS/IFSO 2022 eliminó la exigencia de comorbilidad para IMC ≥ 35?","a":"Porque la obesidad severa por sí misma es enfermedad con riesgo y porque la cirugía demostró beneficio sostenido (25-30 %) y remisión metabólica; esperar a la comorbilidad retrasa un tratamiento eficaz."},{"d":72,"fecha":"2026-12-15","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Cómo presentas el criterio sin que suene a sentencia?","a":"'Cumples criterios para una opción muy potente; no es obligación ni urgencia: es una puerta que ahora existe y decidimos juntos cuándo, si quieres, cruzarla'."},{"d":73,"fecha":"2026-12-16","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"ASMBS/IFSO 2022: ¿criterios adicionales?","a":"IMC 30-34,9 con enfermedad metabólica refractaria; población asiática ≥ 27,5 (matiz étnico discutible en población peruana mestiza → juicio clínico)."},{"d":73,"fecha":"2026-12-16","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Qué significa 'enfermedad metabólica refractaria' en el criterio 30-34,9?","a":"Diabetes tipo 2 u otra enfermedad metabólica que no se controla pese a tratamiento médico óptimo: el fracaso médico documentado es lo que abre la indicación."},{"d":73,"fecha":"2026-12-16","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Por qué el umbral asiático ≥ 27,5 exige juicio clínico en Perú?","a":"Porque la población peruana mestiza no es la de esos estudios; se usa como alerta de riesgo metabólico a menor IMC, no como regla automática."},{"d":74,"fecha":"2026-12-17","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"Sleeve / bypass Y-Roux: ¿resultados ancla?","a":"Pérdida sostenida 25-30 % y remisión de diabetes."},{"d":74,"fecha":"2026-12-17","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Por qué la cirugía bariátrica también es 'hormonal'?","a":"Además de restringir volumen cambia las señales intestinales del hambre/saciedad (módulo 1) — por eso la pérdida se sostiene mejor que con dieta."},{"d":74,"fecha":"2026-12-17","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Qué cambia hormonalmente tras un bypass que explica la remisión temprana de la diabetes?","a":"Cambios en las señales intestinales (más GLP-1/PYY postprandiales, menos grelina) antes de perder mucho peso: la cirugía reprograma el mismo eje intestino-cerebro del módulo 1."},{"d":76,"fecha":"2026-12-21","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"Gatillos de derivación a cirugía bariátrica en LIVIANO","a":"Criterios ASMBS/IFSO 2022 (IMC ≥ 35; 30-34,9 refractario) + falla a farmacoterapia/comorbilidad refractaria → derivar es límite de competencia, no derrota."},{"d":76,"fecha":"2026-12-21","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"Rol de LIVIANO pre y post bariátrica","a":"Preparación (nutrición, proteína, hábitos), seguimiento post-operatorio y manejo de la recidiva (incluye GLP-1 post-cirugía — esquema A VERIFICAR)."},{"d":76,"fecha":"2026-12-21","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Qué gatillos de derivación NO quirúrgicos lleva el protocolo?","a":"Cardiología (paciente con ECV antes de fármaco/ejercicio), psiquiatría (fármacos no-GLP1 con tratamiento psiquiátrico), endocrinología (diabetes mal controlada), obstetricia (embarazo), emergencia (pancreatitis sospechada)."},{"d":77,"fecha":"2026-12-22","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"Escalera terapéutica LIVIANO en una línea","a":"Estilo de vida estructurado (5As, automonitoreo) → farmacoterapia (GLP-1 primero; no-GLP1 si no hay acceso) → cirugía (criterios ASMBS/IFSO) con LIVIANO antes y después."},{"d":77,"fecha":"2026-12-22","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Qué decide en qué peldaño de la escalera empieza un paciente?","a":"IMC + comorbilidad + historia de intentos previos + preferencia: no se sube de peldaño por ansiedad ni se baja por costo sin decirlo; cada peldaño tiene criterio de escalada escrito."},{"d":77,"fecha":"2026-12-22","modulo":"FARMACO+QX","deck":"APEX::LIVIANO::farmaco_qx","q":"¿Qué contiene el §6 'Derivación y límites' en 5 líneas?","a":"Gatillos a cirugía (ASMBS/IFSO 2022 + falla a farmacoterapia), otros límites (cardio, psiquiatría, endocrino, obstetricia, emergencia), no-GLP1 solo con registro, rol pre/post bariátrica, y la frase 'derivar es fortaleza'."},{"d":78,"fecha":"2026-12-23","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"5As (Obesity Canada): ¿qué son Ask y Assess?","a":"Ask = pedir permiso para hablar del peso; Assess = evaluar sin juicio (historia, comorbilidad, disposición al cambio)."},{"d":78,"fecha":"2026-12-23","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Cómo se pide permiso para hablar del peso y por qué importa?","a":"'¿Te parece si hablamos hoy de tu peso?': el permiso devuelve control al paciente y baja la defensiva; sin permiso, la conversación se vive como juicio."},{"d":78,"fecha":"2026-12-23","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué se evalúa en 'Assess' además del IMC?","a":"Historia del peso, intentos previos, comorbilidades, contexto (sueño, trabajo, familia), disposición al cambio y qué le importa al paciente: la raíz, no solo el número."},{"d":79,"fecha":"2026-12-24","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"5As: ¿qué son Advise, Agree y Assist?","a":"Advise = informar opciones; Agree = pactar UNA meta que elige el paciente; Assist = ayudar con recursos y seguimiento — pactar, no imponer."},{"d":79,"fecha":"2026-12-24","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Cuál es la diferencia entre 'Advise' y dar un sermón?","a":"Advise informa con permiso y datos ('esto es lo que sabemos'); el sermón impone y culpa. El dato se ofrece, la decisión se pacta en 'Agree'."},{"d":79,"fecha":"2026-12-24","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué significa 'Assist' en la práctica LIVIANO?","a":"Quitar barreras: receta, plan de proteína, rutina mínima, automonitoreo, fecha de check-in y canal de contacto; el médico ayuda a ejecutar, no solo recomienda."},{"d":80,"fecha":"2026-12-28","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"Entrevista motivacional: 3 principios","a":"No discutir · rodar con la resistencia · reflejar antes de aconsejar."},{"d":80,"fecha":"2026-12-28","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué es 'rodar con la resistencia'?","a":"No confrontar la objeción ('no creo en medicinas') sino reflejarla y explorarla: la resistencia baja cuando no hay oponente."},{"d":80,"fecha":"2026-12-28","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Por qué reflejar antes de aconsejar?","a":"Porque el paciente solo escucha el consejo cuando se siente escuchado; el reflejo confirma que entendiste y abre la puerta."},{"d":81,"fecha":"2026-12-29","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Por qué provocar el 'cambio hablado'?","a":"Porque el cambio que el paciente verbaliza con SUS razones se sostiene más que el que ordena el médico."},{"d":81,"fecha":"2026-12-29","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué pregunta provoca 'cambio hablado'?","a":"'¿Qué ganarías si esto cambiara?' o 'del 0 al 10, ¿cuánto te importa? ¿por qué no un número menor?': el paciente enumera SUS razones."},{"d":81,"fecha":"2026-12-29","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Por qué el cambio que se dice se hace?","a":"Verbalizar razones propias aumenta el compromiso (consistencia): las razones del médico se olvidan, las del paciente se defienden."},{"d":82,"fecha":"2026-12-30","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Cuál es el predictor #1 de éxito conductual y cómo se explica?","a":"El automonitoreo (registro de comida, peso, pasos): 'no es castigo, es el GPS' — quien se monitorea, llega."},{"d":82,"fecha":"2026-12-30","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Por qué funciona el automonitoreo (mecanismo)?","a":"Hace visible lo automático: la retroalimentación inmediata corrige decisiones pequeñas y repetidas, y da datos objetivos para ajustar el plan sin culpa."},{"d":82,"fecha":"2026-12-30","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué se registra como mínimo en LIVIANO y dónde?","a":"Comidas (foto o texto), peso semanal, actividad/pasos y, en titulación, náusea 0-3 y agua; en la app del paciente (VITALS) o en papel: lo que se sostenga."},{"d":83,"fecha":"2027-01-04","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"DPP: ¿cifra ancla?","a":"−58 % de incidencia de diabetes con intervención de estilo de vida estructurada."},{"d":83,"fecha":"2027-01-04","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué intervención produjo el −58 % del DPP?","a":"Un programa estructurado de estilo de vida (meta de pérdida modesta, actividad regular, sesiones educativas frecuentes y automonitoreo); superó a la metformina en ese estudio."},{"d":83,"fecha":"2027-01-04","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Cómo se usa el DPP con el paciente que no puede pagar el fármaco?","a":"Como evidencia de que el programa conductual estructurado FUNCIONA por sí mismo: no tener el medicamento más caro no es quedarse sin tratamiento."},{"d":84,"fecha":"2027-01-05","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Por qué el lenguaje people-first cambia resultados?","a":"El estigma reduce adherencia y aumenta el abandono de consulta; 'persona con obesidad' + validación mantienen al paciente en tratamiento."},{"d":84,"fecha":"2027-01-05","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Por qué el estigma es competencia EVALUABLE en LIVIANO?","a":"Obesity Canada cap. 1: comunicación sin estigma es contenido nuclear; por eso es ítem fijo de la rúbrica de cada caso."},{"d":84,"fecha":"2027-01-05","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué efectos tiene el estigma de peso sobre los resultados?","a":"Aumenta el abandono de consultas, el estrés, el comer emocional y la evitación del ejercicio; el paciente estigmatizado empeora, por eso la comunicación sin estigma es tratamiento."},{"d":85,"fecha":"2027-01-06","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"3 elementos del protocolo de consulta sin estigma (ambiente + guion)","a":"Balanza en privado · mobiliario adecuado · guion verbal (permiso, validación, people-first, promesa de la casa)."},{"d":85,"fecha":"2027-01-06","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué elementos físicos del consultorio son parte del protocolo sin estigma?","a":"Balanza en espacio privado, sillas sin brazos y de carga adecuada, brazaletes de PA de talla grande, batas adecuadas: el ambiente también comunica."},{"d":85,"fecha":"2027-01-06","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Cómo se abre y se cierra la consulta según el guion?","a":"Apertura: pedir permiso y preguntar qué le importa. Cierre: una meta elegida por el paciente, una métrica, una fecha y 'no estás sola/o en esto'."},{"d":86,"fecha":"2027-01-07","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"Cadencia de acompañamiento LIVIANO por fase (oferta)","a":"Despegue 4 sesiones/mes · Progreso 2/mes · Consolidación 1/mes · Mantenimiento control trimestral (LIVIANO_OFERTA)."},{"d":86,"fecha":"2027-01-07","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué contiene cada una de las 4 sesiones/mes del Despegue (estructura propuesta)?","a":"1) titulación y EA; 2) proteína y método del plato; 3) fuerza y actividad; 4) automonitoreo y revisión de métricas — cada una con 5As. El contenido detallado se redacta en D86."},{"d":86,"fecha":"2027-01-07","modulo":"CONDUCTA","deck":"APEX::LIVIANO::conducta","q":"¿Qué se registra en un check-in de EA durante la titulación?","a":"Náusea (0-3), vómitos, estreñimiento, hidratación, mareo, dolor abdominal (red flag) y adherencia a la dosis; decide mantener / escalar / suspender según protocolo."},{"d":88,"fecha":"2027-01-11","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"Las 4 metáforas núcleo y su módulo","a":"Termostato (M1) · ruido de comida (M2) · ladrillo (M3) · GPS (M5)."},{"d":88,"fecha":"2027-01-11","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"Cifra ancla por módulo (una por módulo, de memoria)","a":"M1 adaptación persiste años · M2 STEP 1 −14,9 % / SURMOUNT-1 −20,9 % / 67 % / SELECT −20 % / 94 % · M3 AI 0,26 kg NS / proteína 1,2-1,6 g/kg · M4 NWCR ~1 h/día / fuerza 2x · M5 DPP −58 % · M6 ASMBS IMC ≥ 35 / 25-30 %."},{"d":88,"fecha":"2027-01-11","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"¿Qué se hace con lo fallado en el drill integral?","a":"Va a Anki el mismo día como tarjeta de mecanismo (no de dato) y se re-testea en el pre-test del lunes siguiente."},{"d":89,"fecha":"2027-01-12","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"Criterio de éxito del capstone","a":"El caso integral (viernes 16) se resuelve SOLO con el protocolo: si faltó algo, es una sección que falta en v1."},{"d":89,"fecha":"2027-01-12","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"Ruta de credencial LIVIANO","a":"OMA 'Fundamentals of Obesity Treatment' (~9.75 CME) → micro-credentials OMA → vía 60 créditos CME → examen ABOM."},{"d":89,"fecha":"2027-01-12","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"¿Qué 6 secciones se ensamblan en el capstone y de qué Síntesis sale cada una?","a":"§1 fundamento (M1, D19) · §2 elegibilidad + titulación (M2, D38) · §3-4 proteína/fuerza + métricas (M3-4, D58/D68) · §5 5As/automonitoreo/check-in (M5, D86) · §6 derivación y límites (M6, D77) · Anexo A acceso (M7, D39-44)."},{"d":89,"fecha":"2027-01-12","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"¿Qué regla de redacción aplica a toda dosis del protocolo?","a":"Solo desde la ficha técnica del producto con registro; si no se tiene, se escribe 'A VERIFICAR (fecha)' — nunca de memoria ni de redes."},{"d":90,"fecha":"2027-01-13","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"Regla anti-alucinación de LIVIANO en una línea","a":"Ningún dato clínico, regulatorio o de precio se publica sin verificarlo contra la fuente primaria; lo no verificado se escribe 'A VERIFICAR (fecha)'."},{"d":90,"fecha":"2027-01-13","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"¿Qué se verifica antes de publicar cualquier contenido LIVIANO?","a":"Fuente primaria (ensayo, guía, ficha técnica, portal DIGEMID, cotización fechada); si no hay fuente, no se publica o se marca 'A VERIFICAR'."},{"d":90,"fecha":"2027-01-13","modulo":"SÍNTESIS","deck":"APEX::LIVIANO::sintesis","q":"¿Qué pasa con la Academia el D90 y qué sigue?","a":"Cierra con la charla completa de 10 min grabada, el protocolo v1 ensamblado y la tabla de acceso fechada; sigue la revisión trimestral permanente y la ruta OMA → ABOM."}];

export function livCasoDe(casoId: number): LivCaso | undefined { return LIV_CASOS.find(c => c.id === casoId); }
export function livCasoDeDia(d: number): LivCaso | undefined { return LIV_CASOS.find(c => c.d === d); }
export function livDrillDe(d: number): LivDrill | undefined { return LIV_DRILLS.find(x => x.d === d); }
export function livCardsDeDia(d: number): LivAnkiCard[] { return LIV_ANKI_CARDS.filter(c => c.d === d); }
/** Tarjetas de las 5 filas previas a d (la semana D-7). */
export function livCardsSemanaPrevia(d: number): LivAnkiCard[] { return LIV_ANKI_CARDS.filter(c => c.d >= d - 5 && c.d < d); }
/**
 * Pre-test ciego del lunes: 5 tarjetas de la semana anterior, repartidas por día de forma
 * determinista (misma selección en cada render). Si hay < 5, devuelve las que haya.
 */
export function livPretest(d: number, n = 5): LivAnkiCard[] {
  const pool = livCardsSemanaPrevia(d);
  if (pool.length <= n) return pool;
  const out: LivAnkiCard[] = [];
  const paso = pool.length / n;
  for (let i = 0; i < n; i++) out.push(pool[Math.floor(i * paso)]);
  return out;
}
