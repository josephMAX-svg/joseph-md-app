/**
 * estudioPulsoData.ts — "Estudio Pulso": el plan de 96 días del fundador para
 * volverse referente clínico + máquina de marketing de Pulso Health Group.
 * Fuente: plan_estudio_pulso_v2_mejorado.xlsx (Filosofía, Biblioteca, Calendario, Recursos).
 * Vive dentro de Business (Pulso). Estructura tipo ENCAPS: prioridad/horas/output por libro.
 */

export const ESTUDIO_PULSO_META = {
  titulo: 'Estudio Pulso',
  subtitulo: 'El plan del fundador · 28 may – 31 ago 2026',
  accent: '#D9BE8A', // oro Pulso
  resumen: '96 días · 2h/día · 165h activas. Dos ramas paralelas: ser referente clínico vivo de cada vertical + dominar la maquinaria de marketing/ventas. La meta no es leer libros — es volverte irrefutable.',
};

export const ESTUDIO_RAMAS = [
  { rama: 'A · Producto', pct: 60, horas: '~100h', desc: 'Referente vivo de cada vertical: peso, sueño, hormonal, mental, foco, pareja.' },
  { rama: 'B · Marketing/Ventas', pct: 40, horas: '~65h', desc: 'Hormozi ×3 + Cialdini + Brunson + StoryBrand + Schwartz.' },
];

export const ESTUDIO_MESES = [
  { mes: 'Mes 1 · jun', fase: 'Fundamentos', horas: '~60h', desc: 'Trilogía Hormozi completa + líneas críticas (Peso/Liviano, Hormonal/Curva).' },
  { mes: 'Mes 2 · jul', fase: 'Expansión', horas: '~55h', desc: 'Sueño + Mental + Foco + Pareja + marketing aplicado (Cialdini, Brunson).' },
  { mes: 'Mes 3 · ago', fase: 'Síntesis', horas: '~50h', desc: 'Producción de outputs: copy, contenido, protocolos, brand book, quiz funnel.' },
];

export type PrioLibro = 1 | 2 | 3;
export interface LibroPulso {
  n: number; categoria: string; marca: string; libro: string; autor: string;
  prioridad: PrioLibro; horas: number; output: string;
}

export const ESTUDIO_LIBROS: LibroPulso[] = [
  { n: 1, categoria: 'Peso', marca: 'Liviano', libro: 'The Obesity Code', autor: 'Jason Fung', prioridad: 1, horas: 8, output: 'Protocolo Liviano: insulina como variable maestra' },
  { n: 2, categoria: 'Peso', marca: 'Liviano', libro: 'Outlive', autor: 'Peter Attia', prioridad: 1, horas: 14, output: 'Medicina 3.0 + 4 pilares. Tu mejor referente de identidad' },
  { n: 3, categoria: 'Peso', marca: 'Liviano', libro: 'The Ozempic Revolution', autor: 'Alexandra Sowa', prioridad: 1, horas: 5, output: 'Cómo prescribir GLP-1 — manual práctico de tu 1er producto' },
  { n: 4, categoria: 'Peso', marca: 'Liviano', libro: 'In Defense of Food', autor: 'Michael Pollan', prioridad: 2, horas: 5, output: 'Filosofía nutricional para tu blog y voz editorial' },
  { n: 5, categoria: 'Hormonal', marca: 'Curva', libro: 'The Hormone Cure', autor: 'Sara Gottfried', prioridad: 1, horas: 8, output: 'Protocolo Curva: perimenopausia, balance hormonal' },
  { n: 6, categoria: 'Hormonal', marca: 'Curva', libro: 'Estrogen Matters', autor: 'Avrum Bluming', prioridad: 1, horas: 6, output: 'TRH defendible con evidencia (destruye miedos WHI)' },
  { n: 7, categoria: 'Hormonal', marca: 'Curva', libro: 'Outlive (cap hormonal)', autor: 'Peter Attia', prioridad: 1, horas: 3, output: 'Testosterona y longevidad masculina (Curva Hombre)' },
  { n: 8, categoria: 'Sueño', marca: 'Calma', libro: 'Why We Sleep', autor: 'Matthew Walker', prioridad: 1, horas: 9, output: 'Base científica del sueño — pilar transversal' },
  { n: 9, categoria: 'Sueño', marca: 'Calma', libro: 'The Circadian Code', autor: 'Satchin Panda', prioridad: 2, horas: 5, output: 'Time-restricted eating + ritmo circadiano' },
  { n: 10, categoria: 'Mental', marca: 'Calma', libro: 'Feeling Good Handbook', autor: 'David Burns', prioridad: 1, horas: 6, output: 'Manual de CBT para tus sesiones Calma' },
  { n: 11, categoria: 'Mental', marca: 'Calma', libro: 'Lost Connections', autor: 'Johann Hari', prioridad: 2, horas: 5, output: 'Voz editorial diferenciada para Calma' },
  { n: 12, categoria: 'Mental', marca: 'Calma', libro: 'How Emotions Are Made', autor: 'Lisa F. Barrett', prioridad: 3, horas: 6, output: 'Neurociencia emocional (profundidad opcional)' },
  { n: 13, categoria: 'Foco', marca: 'Foco', libro: 'ADHD 2.0', autor: 'Hallowell + Ratey', prioridad: 1, horas: 5, output: 'Protocolo Foco para adultos con TDAH' },
  { n: 14, categoria: 'Foco', marca: 'Foco', libro: 'Driven to Distraction', autor: 'Hallowell + Ratey', prioridad: 2, horas: 6, output: 'Clínica clásica del TDAH' },
  { n: 15, categoria: 'Foco', marca: 'Foco', libro: 'Smart but Scattered Adults', autor: 'Dawson + Guare', prioridad: 2, horas: 5, output: 'Función ejecutiva — coaching cognitivo' },
  { n: 16, categoria: 'Pareja', marca: 'Cerca', libro: 'Come As You Are', autor: 'Emily Nagoski', prioridad: 1, horas: 7, output: 'Línea Cerca femenina — modelo dual de respuesta' },
  { n: 17, categoria: 'Pareja', marca: 'Cerca', libro: 'Mating in Captivity', autor: 'Esther Perel', prioridad: 1, horas: 6, output: 'Cerca pareja — deseo en relaciones largas' },
  { n: 18, categoria: 'Pareja', marca: 'Cerca', libro: 'Attached', autor: 'Levine + Heller', prioridad: 2, horas: 5, output: 'Estilos de apego' },
  { n: 19, categoria: 'Pareja', marca: 'Cerca', libro: 'The Sex-Starved Marriage', autor: 'M. Weiner Davis', prioridad: 3, horas: 5, output: 'Caso clínico Cerca (baja libido)' },
  { n: 20, categoria: 'Marketing', marca: 'Pulso', libro: '$100M Offers', autor: 'Alex Hormozi', prioridad: 1, horas: 5, output: 'Grand Slam Offer de Liviano + 7 sub-marcas (re-leer 2x)' },
  { n: 21, categoria: 'Marketing', marca: 'Pulso', libro: '$100M Leads', autor: 'Alex Hormozi', prioridad: 1, horas: 8, output: 'Plan de adquisición Pulso — 4 canales centrales' },
  { n: 22, categoria: 'Marketing', marca: 'Pulso', libro: '$100M Money Models', autor: 'Alex Hormozi', prioridad: 1, horas: 6, output: 'Front-end + upsell + downsell + continuity' },
  { n: 23, categoria: 'Marketing', marca: 'Pulso', libro: 'Influence', autor: 'Robert Cialdini', prioridad: 1, horas: 8, output: '6 principios aplicados al funnel y scripts CLOSER' },
  { n: 24, categoria: 'Marketing', marca: 'Pulso', libro: 'DotCom Secrets', autor: 'Russell Brunson', prioridad: 1, horas: 7, output: 'Funnels: tripwire, application, webinar' },
  { n: 25, categoria: 'Marketing', marca: 'Pulso', libro: 'Expert Secrets', autor: 'Russell Brunson', prioridad: 2, horas: 7, output: 'Posicionamiento de marca personal médica' },
  { n: 26, categoria: 'Marketing', marca: 'Pulso', libro: 'Building a StoryBrand', autor: 'Donald Miller', prioridad: 1, horas: 4, output: 'Marco narrativo de toda la comunicación Pulso' },
  { n: 27, categoria: 'Marketing', marca: 'Pulso', libro: 'Breakthrough Advertising', autor: 'Eugene Schwartz', prioridad: 3, horas: 7, output: '5 niveles de consciencia — copy avanzado' },
  { n: 28, categoria: 'Meta', marca: 'Pulso', libro: 'Ultralearning', autor: 'Scott Young', prioridad: 1, horas: 7, output: '9 principios para acelerar todo el resto' },
];

export const ESTUDIO_REGLAS = [
  '2 horas/día sagradas, mismo horario. No se mueve por nada que no sea SERUMS.',
  'Cada libro produce un output operativo (no es lectura pasiva — Obsidian siempre abierto).',
  'Test de comprensión semanal con AnkiConnect: ~30 cards/semana de lo más importante.',
  'Domingo siempre descanso total. Recuperación cerebral.',
  'Si un libro no aporta lo esperado en 4 sesiones, lo abandonas. Sin culpa.',
  'Producción ≫ consumo. Mes 3 entero es para crear, no para leer.',
  'Aplicación inmediata: cada protocolo lo pruebas TÚ primero, antes de venderlo.',
];

export const ESTUDIO_REGIMEN = [
  { pilar: 'Sueño', detalle: '7–8h consistentes · oscuridad total · sin cafeína post-14:00 · luz solar AM (Huancayo te lo regala).' },
  { pilar: 'Ejercicio', detalle: '6:30–7:15 · 30–45 min zona 2 (Attia) · 3x/sem fuerza · BDNF primado 2–3h post.' },
  { pilar: 'Comida', detalle: 'Ventana 10–12h (Panda) · comida real andina (quinua, papa nativa, palta, huevos, pescado) · NO ultraprocesados.' },
  { pilar: 'Mental', detalle: 'Domingo descanso TOTAL · Anki ≤20 min/día · Winch en bolsillo para rechazos.' },
  { pilar: 'Conexión', detalle: 'Pareja/familia 1h/día sagrada — infraestructura, no opcional.' },
];

export const ESTUDIO_RECURSOS = [
  { label: 'Alex Hormozi (ES)', tipo: 'YouTube', url: 'https://www.youtube.com/@AlexHormoziEspanol', nota: 'PRIORIDAD MÁXIMA · mes 1' },
  { label: 'Aprendamos Marketing', tipo: 'YouTube', url: 'https://www.youtube.com/@AprendamosMarketing', nota: 'Meta Ads paso a paso · mes 2' },
  { label: 'Romuald Fons (SEO)', tipo: 'YouTube', url: 'https://www.youtube.com/results?search_query=Romuald+Fons+SEO', nota: 'SEO orgánico · mes 3' },
  { label: 'Vilma Núñez', tipo: 'YouTube', url: 'https://www.youtube.com/@VilmaNunez', nota: 'Embudos + email · mes 3' },
  { label: 'Peter Attia — The Drive', tipo: 'Podcast', url: 'https://peterattiamd.com/podcast/', nota: 'CRÍTICO para tu identidad médica' },
  { label: 'Huberman Lab', tipo: 'Podcast', url: 'https://www.hubermanlab.com/', nota: 'Sleep, dopamine, GLP-1, testosterone' },
  { label: 'Curology blog', tipo: 'Web', url: 'https://curology.com/blog/', nota: 'Playbook DTC a replicar' },
  { label: 'Hims Good Health', tipo: 'Web', url: 'https://www.hims.com/blog', nota: 'Posts que rankean long-tail' },
];

export const ESTUDIO_JOSEPH_31AGO = [
  { dim: 'Físico', txt: 'Dieta Liviano probada en tu cuerpo 3 meses, fuerza 3x/sem, sueño 7–8h, IMC al objetivo.' },
  { dim: 'Clínico', txt: 'Protocolos memorizados de las 6 líneas — defensables ante cualquier especialista.' },
  { dim: 'Comercial', txt: 'Trilogía Hormozi + Cialdini + DotCom. Diseñas una Grand Slam Offer a ciegas.' },
  { dim: 'Brand', txt: 'Brand book de Pulso + sub-marcas. Voz editorial y tono documentados.' },
  { dim: 'Operativo', txt: 'Quiz funnel diseñado, web Liviano lista, 60 piezas de contenido grabadas, CRM tenant configurado.' },
  { dim: 'Mental', txt: 'Sistema CLOSER interiorizado. Manejo de rechazo (Winch, Holiday). Auto-imagen de founder.' },
];

export const ESTUDIO_NOTA = 'Este plan es el "guion Estudio" del fundador. Vive aquí, dentro de Pulso, porque construye la AUTORIDAD que vende Pulso Health a S/1,200/mes. Las marcas: Peso→Liviano, Hormonal→Curva, Sueño/Mental→Calma, Foco→Foco, Pareja→Cerca, Piel→Nítida, Capilar→Densa.';
