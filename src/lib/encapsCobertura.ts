// AUTO-GENERADO por DATA/_scripts/gen_encaps_cobertura.js — NO editar a mano.
// Mapa de cobertura por tema (barrido compendio DR LOPEZ × Tendencias/forecast × QX/Theomed, 03-jul).
// tier=rentabilidad · vueltas=repeticiones espaciadas · min=minutos núcleo/día · qxN/theomedN=nº videos a mirar
// extenso=merece bloque largo · guidance=cuántos/cuáles videos · gaps=sub-temas a leer en compendio/Drive · temario=índice compendio.
export interface FuenteLink { label: string; url: string }
export interface VideoExtra { titulo: string; url: string }
export interface CoberturaTema {
  tier: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA'; vueltas: number; min: number;
  qxN: number; theomedN: number; extenso: boolean; freq: string; guidance: string;
  gaps: string[]; temario: string[];
  compendioUrl: string; theomedBookUrl: string; theomedUrl: string; videoFallback: FuenteLink; videosExtra: VideoExtra[]; gapSources: FuenteLink[];
  bookCoverage: { lopez: string; theomed: string; theomedManual: string };
  soloTheomed: string[]; soloLopez: string[]; gapAmbos: string[]; driveVideos: FuenteLink[];
}
export const ENCAPS_COBERTURA: Record<string, CoberturaTema> = {
 "I-3": {
  "tier": "CRÍTICA",
  "vueltas": 6,
  "min": 120,
  "qxN": 9,
  "theomedN": 31,
  "extenso": true,
  "freq": "Tema #1 de toda el área I y rey temático del examen (I-3 fue #1 en 2025-I y 2026-I). QX Tendencias suma ~40/400 en el clúster I-3 (Vigilancia 14 + Brotes/epidemias/endemias 9 + Mediciones 7 + ASIS 4 + Causalidad 3 + Hist natural 3) ≈ 10/examen. Forecast v2 lo pone en 13% (banda 11-16), con sesgo a la baja hacia ~12 tras auditoría. Tendencia: ALZA sostenida; el eje viró de 'brote/notificación' hacia vigilancia activa/pasiva/centinela, IAAS y cadena epidemiológica.",
  "guidance": "PRIORIDAD MÁXIMA. Mirar los 2 QX que trae el paquete SÍ o SÍ ('VIGILANCIA EN SALUD PÚBLICA' y 'VIGILANCIA EPIDEMIOLÓGICA'), y del clúster I-3 en QX añadir 'ENDEMIAS, EPIDEMIAS Y BROTES' + 'CONCEPTOS BÁSICOS DE EPIDEMIOLOGÍA' + 'CAUSALIDAD Y RIESGO' + 'MEDICIONES EN EPIDEMIOLOGÍA' + 'ANÁLISIS SITUACIONAL/SALA SITUACIONAL' + 'HISTORIA NATURAL' (están en el bloque I-5+I-6 del paquete). De Theomed (sección área I = 31 videos, la más grande) ver 5-6 de vigilancia/definiciones de caso/mediciones. Enfoque VIÑETA: reconocer tipo de vigilancia, clasificar el caso y decidir notificación inmediata vs semanal; NO cálculo fino.",
  "gaps": [
   "Canal endémico (4 zonas: éxito/seguridad/alarma/epidemia) — el compendio lo NOMBRA pero NO lo desarrolla → leer QX 'Endemias, epidemias y brotes' + OPS MOPECE 5 / Villamedic pretest (ya identificado como único hueco de I-3 en Drive)",
   "Curva epidémica (fuente común vs propagada) — nombrada sin desarrollo → QX + MOPECE",
   "Tasa de ataque secundaria — no desarrollada → MOPECE",
   "Directiva RENACE / niveles de notificación 2023 (norma nueva) — leer PDF Directiva 341-MINSA/CDC-2023 en Drive (no está en el compendio)"
  ],
  "temario": [
   "Vigilancia en salud pública y epidemiológica (tipos: pasiva/activa/centinela/sindrómica/laboratorio/tiempo real)",
   "Sistema de Vigilancia Epidemiológica en el país (flujo Comunidad→EESS→Microred→DIRESA→DGE; RENACE; ERR; unidad notificante)",
   "Definiciones de caso (sospechoso/probable/confirmado/nexo epidemiológico/descartado/autóctono/importado)",
   "Notificación (inmediata/semanal/mensual; individual/consolidada)",
   "Brotes, endemias, epidemias, epizootias, pandemias",
   "Herramientas: canal endémico y curva epidémica",
   "Mediciones epidemiológicas (razón/proporción/tasa; prevalencia/incidencia acumulada/densidad de incidencia; tasa de ataque/letalidad)",
   "Causalidad y riesgo (tríada, causas necesaria/suficiente/componente, Bradford Hill 9 criterios, RA/FER/RAP/FERP/NNT)",
   "Historia natural de la enfermedad (prepatogénico/patogénico/postclínico)",
   "ASIS y Sala situacional (temática/multitemática/integradora)",
   "Prevención y control de infecciones (cadena epidemiológica de 6 eslabones + interrupción)",
   "Farmacovigilancia/tecnovigilancia",
   "Indicadores en SP (estructura/proceso/resultado)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [
   {
    "titulo": "Conceptos básicos de epidemiología (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/a2ZaeDZBT25ZMmhXdmw2bTRzcWdYQT09"
   },
   {
    "titulo": "Brotes, epidemias, pandemias y endemias (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/RnA5RWsxK2Q3WGptdDhCK0ZCbmg2QT09"
   },
   {
    "titulo": "Sistema de vigilancia epidemiológica (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/RU1CNWFDUTdvajJEYkhmS3pINlpZdz09"
   },
   {
    "titulo": "VIGILANCIA EN SALUD PúBLICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/Vk1EdFFLRStsdXVyQmNvelZVZ3BBZz09"
   },
   {
    "titulo": "VIGILANCIA EPIDEMIOLóGICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/Q01qNGJacGxmbTZLLzVTYjNNQ09pdz09"
   },
   {
    "titulo": "ENDEMIAS, EPIDEMIAS Y BROTES",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/N1FYaExLT3YxT2tOWVFJR3NsM0FnUT09"
   },
   {
    "titulo": "CONCEPTOS BáSICOS DE EPIDEMIOLOGíA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/UDBhUmRHZFQ2RkZJRmRiQVAxUHFuZz09"
   },
   {
    "titulo": "CAUSALIDAD Y RIESGO",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/aTVXSElNc3pCK1Q2TVRoTGdpTkpIdz09"
   },
   {
    "titulo": "MEDICIONES EN EPIDEMIOLOGíA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/alFYRWNhNHhDVE50aWhqa2ZQTysvUT09"
   }
  ],
  "gapSources": [
   {
    "label": "OPS MOPECE 5 · brotes",
    "url": "https://drive.google.com/file/d/1i-4ETiOgjjtsPxee1aDqx9oVnm0UALtR/view"
   },
   {
    "label": "QX ENAM · Epi resumen",
    "url": "https://drive.google.com/file/d/14dSCm-Ftxf9ys7_O6IwRzqOFb1n2O8Nu/view"
   },
   {
    "label": "Normativas DR LOPEZ (RENACE 341-2023)",
    "url": "https://drive.google.com/drive/folders/1YdyhemfujHYIROcBcr9G9avUYulqfpko"
   }
  ],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "parcial",
   "theomedManual": "SP §1.2 Epidemiología, §1.3 Causalidad y Riesgo, §1.5 Historia Natural, §1.8 Brotes/epidemias/endemias, §1.9 Vigilancia en SP, §1.10 Prevención y control de infecciones, §1.12 ASIS/Sala situacional, §1.13 SVE Perú"
  },
  "soloTheomed": [
   "SVE Perú desarrollado en sección propia (§1.13) con más detalle de flujo",
   "Prevención y control de infecciones/cadena epidemiológica como capítulo (§1.10)"
  ],
  "soloLopez": [
   "Farmacovigilancia/tecnovigilancia dentro de I-3",
   "Indicadores en SP (estructura/proceso/resultado) explícitos"
  ],
  "gapAmbos": [
   "Canal endémico (4 zonas) — ambos lo nombran pero NO lo desarrollan → QX 'Endemias' + OPS MOPECE 5",
   "Curva epidémica fuente común vs propagada — no desarrollada en ninguno",
   "Tasa de ataque secundaria — solo mención suelta",
   "Directiva RENACE 341-2023 niveles de notificación — no en ninguno de los dos"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "I-5+I-6": {
  "tier": "MEDIA",
  "vueltas": 3,
  "min": 55,
  "qxN": 8,
  "theomedN": 31,
  "extenso": true,
  "freq": "SEPARAR los dos: I-5 (determinantes/demografía) es ALZA emergente — forecast 4% (banda 2-6), QX suma ~10 (Determinantes 7 + Demografía 3); fue sorpresa ciega en varios folds. I-6 (bioestadística/cálculo) está PRÁCTICAMENTE MUERTO: forecast lo retiró, QX Bioestadística=2 y Pruebas diagnósticas=4 (~0.5-1/examen); el formato 90% viñeta lo mató. Peso real de la fusión lo aporta I-5, no I-6.",
  "guidance": "Del paquete (9 QX en este bloque) PRIORIZAR para I-5: 'DETERMINANTES SOCIALES - AMBIENTALES, BIOGENÉTICOS Y COMERCIALES' y 'DEMOGRAFÍA' (clave: distinguir determinante estructural vs intermedio vs estilo de vida en viñeta — ángulo emergente del forecast). Ver 'PRUEBAS DIAGNÓSTICAS' 1 vez a nivel conceptual (sens/espec, tamizaje). SALTAR/acelerar 'BIOESTADÍSTICA BÁSICA' (I-6 muerto). Theomed: 1-2 videos de determinantes. No hacer deep-work de cálculo.",
  "gaps": [
   "Cálculo de sensibilidad/especificidad con tabla 2x2 — el compendio da definiciones pero no ejercita; si cae (poco probable) reforzar con QX 'PRUEBAS DIAGNÓSTICAS'. No invertir tiempo en cálculo fino de bioestadística (I-6 muerto)."
  ],
  "temario": [
   "Determinantes sociales (modelo Lalonde 4 campos; estructurales vs intermedios; generación de la inequidad)",
   "Determinantes ambientales de la salud",
   "Demografía (estática/pirámides expansiva-estacionaria-regresiva; dinámica; transición demográfica y epidemiológica de Omran; bono demográfico; indicadores de estructura)",
   "Pruebas diagnósticas (sensibilidad/especificidad/VPP/VPN; criterios OMS de tamizaje; confirmatoria vs tamizaje)",
   "Bioestadística básica (razón/proporción/tasa ya en I-3)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [
   {
    "titulo": "Demografía en salud (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/TTMyQzdqM0lPeWRaRGMzWFBxdHBCZz09"
   },
   {
    "titulo": "Historia natural del proceso salud-enfermedad (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/TFJtK1d2cStYakk3VHBDdVNQbHowZz09"
   },
   {
    "titulo": "DEMOGRAFíA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/NlZHbHF2blpaL3J2V1FVbmc1d1JrZz09"
   },
   {
    "titulo": "PRUEBAS DIAGNóSTICAS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/bTlHWnRJN283NUUrTkFQZWxhbUc0QT09"
   },
   {
    "titulo": "DETERMINANTES SOCIALES - AMBIENTALES, BIOGENéTICOS Y COMERCIALES",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/MlZxVHFBNUV6WHFJNVBMRXluNVk1dz09"
   },
   {
    "titulo": "BIOESTADíSTICA BáSICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/Nkl4dERCQVduM0RQSmdVQi91VitvQT09"
   },
   {
    "titulo": "HISTORIA NATURAL DEL PROCESO SALUD ENFERMEDAD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/NVZmd3BLR25VSkVFYkYxTGUzeWtxZz09"
   },
   {
    "titulo": "ANáLISIS SITUACIONAL DE SALUD - SALA SITUACIONAL DE SALUD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/ZFJobndHMnBZVm04YjVuL252NnI4dz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "parcial",
   "theomedManual": "SP §1.4 Demografía en Salud, §1.7 Pruebas diagnósticas (S/E/VPP), §2.1 Determinantes Sociales, §2.2 Determinantes Ambientales"
  },
  "soloTheomed": [
   "Pruebas diagnósticas S/E/VPP/VPN con sección dedicada (§1.7) — López solo da definiciones",
   "Determinantes ambientales como capítulo propio (§2.2)"
  ],
  "soloLopez": [
   "Transición demográfica de Omran y bono demográfico más explícitos",
   "Modelo Lalonde 4 campos nombrado"
  ],
  "gapAmbos": [
   "Cálculo fino de bioestadística (I-6) — muerto en examen, ninguno ejercita a fondo (bajo riesgo)"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "I-4": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 70,
  "qxN": 6,
  "theomedN": 31,
  "extenso": false,
  "freq": "Rentable y estable-alta. OJO taxonomía: QX clasifica metaxénicas/zoonosis dentro de CUIDADO INTEGRAL (II) con 14/400 (~3.5/examen) + control de vectores 2 → es la mayor reclasificación entre QX y nuestra taxonomía. Forecast 3% (banda 2-5), estable. En viñeta: dengue con signos de alarma (A/B/C), reconocer y clasificar, NO ml/kg.",
  "guidance": "Ver los 2 QX del paquete: 'ENDEMIAS, EPIDEMIAS Y BROTES' y 'PREVENCIÓN Y CONTROL DE INFECCIONES'. Complementar OBLIGATORIO con 'PREVENCIÓN Y CONTROL DE DENGUE' (aparece en el paquete en II-5) porque la clínica del dengue vive en área II según QX. Theomed: 2 videos de metaxénicas. Enfoque viñeta: clasificar dengue A/B/C y decidir referencia; identificar vector-enfermedad.",
  "gaps": [
   "Signos de alarma del dengue A/B/C y conducta por grupo — el compendio de SP da la epidemiología/vector pero NO el manejo clínico por grupo → leer en el bloque CI (compendio de Cuidado Integral) o QX 'PREVENCIÓN Y CONTROL DE DENGUE' (está en el paquete bajo II-5)",
   "Definiciones de caso específicas de malaria/TB para vigilancia → QX + normativa"
  ],
  "temario": [
   "Brotes/endemias en enfermedades transmisibles (compartido con I-3)",
   "Prevención y control de infecciones / cadena epidemiológica",
   "Control de vectores y plagas (Aedes/Anopheles/Triatoma/Lutzomyia; dengue-Zika-chikungunya-malaria-Chagas-leishmaniasis-fiebre amarilla-filariasis; larvicida/adulticida/nebulización/ovitrampa/cerco entomológico/punto crítico)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [
   {
    "titulo": "PREVENCIóN Y CONTROL DE INFECCIONES",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/MCtyekxhOVlQS0kzbkFPMWx6bTRwQT09"
   },
   {
    "titulo": "PREVENCIÓN Y CONTROL DE DENGUE",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/bzBSbTBXYXJzRHFSMFNvK0t0Kyt4Zz09"
   },
   {
    "titulo": "Vigilancia y manejo de zoonosis",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/dFlmTEZBM0tTcm5WQTNOZkVnZ1hCQT09"
   },
   {
    "titulo": "Prevención de enfermedades transmisibles",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/dDlKNHFRWjByZXFaYnBXS293NUoyUT09"
   },
   {
    "titulo": "Exposición a metales pesados y otras sustancias",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/TTV5ZTUrTVc5aGkvd29aNU5HdDlyQT09"
   },
   {
    "titulo": "Control de vectores y plagas",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/d0V5UE9iNkRFTzJCd2hpemprbFlEQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "sí",
   "theomedManual": "CI §2.22 Prevención y control de enfermedades metaxénicas y zoonóticas (dengue A/B/C, malaria, Chagas, leishmaniasis) + SP §2.10 Control de Vectores y Plagas"
  },
  "soloTheomed": [
   "Signos de alarma del dengue A/B/C y conducta clínica por grupo (en CI §2.22) — López los deja en gap, solo daba vector/epidemiología",
   "Manejo clínico de metaxénicas dentro de CI"
  ],
  "soloLopez": [],
  "gapAmbos": [
   "Definiciones de caso específicas para vigilancia de malaria/TB fino → normativa"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "I-1": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 65,
  "qxN": 4,
  "theomedN": 31,
  "extenso": true,
  "freq": "Emergente que se subestima: fue sorpresa ciega en 2025-I, 2025-II. QX Promoción=9 (+IEC 1) ≈ 2.25/examen. Forecast lo mete en la watch-list de emergentes (intersectorialidad/participación). Tendencia estable-alta. Diferenciarlo de prevención primaria (I-10).",
  "guidance": "Ver los 3 QX del paquete: 'PROMOCIÓN DE LA SALUD Y PARTICIPACIÓN COMUNITARIA', 'PROMOCIÓN DE LA SALUD - LINEAMIENTOS' e 'INSTITUCIONES Y MUNICIPIO SALUDABLE'. Theomed: 1-2 videos. Clave de viñeta: distinguir PROMOCIÓN (Ottawa, entornos saludables, empoderamiento) de PREVENCIÓN PRIMARIA (vacuna/quimioprofilaxis) — es la trampa clásica. Memorizar las 5 áreas de Ottawa y los 4 programas.",
  "gaps": [],
  "temario": [
   "Promoción de la salud (Carta de Ottawa 1986: 5 áreas; empoderamiento)",
   "Enfoques transversales (equidad/género/interculturalidad)",
   "Estrategias (abogacía, comunicación/educación, participación comunitaria)",
   "Población sujeto (familia/comunidad/etapas de vida) y escenarios (vivienda/IE/municipio/centro laboral)",
   "Ejes temáticos (7: alimentación, higiene, actividad física, SSR, habilidades para la vida, seguridad vial, salud mental)",
   "Programas (Familias/Viviendas, IE, Municipios/Comunidades, Centros Laborales Saludables)",
   "Información, educación y comunicación para la salud (IEC)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [
   {
    "titulo": "PROMOCIóN DE LA SALUD Y PARTICIPACIóN COMUNITARIA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/UWNoOVdHYUtQdUNZVmprUEJqaXZodz09"
   },
   {
    "titulo": "PROMOCIóN DE LA SALUD - LINEAMIENTOS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/Zi9SeS9TakFJZlUwayt5MVQxdDYxZz09"
   },
   {
    "titulo": "Infecciones asociadas a la atención de salud",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/eWZrZWU5am5IdXFON1JmQlJmeTZMQT09"
   },
   {
    "titulo": "Información, educación y comunicación para la salud",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/OWQzb24vemJZWW9jQkZGZ2xKSGhidz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "SP §3.1 Promoción de la Salud (Ottawa, ejes, programas), §3.2 IEC para la Salud"
  },
  "soloTheomed": [
   "IEC desarrollado como sección propia (§3.2)"
  ],
  "soloLopez": [
   "Los 7 ejes temáticos listados de forma más completa"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "I-11+I-12": {
  "tier": "MEDIA",
  "vueltas": 4,
  "min": 90,
  "qxN": 18,
  "theomedN": 31,
  "extenso": true,
  "freq": "Clúster grande y disperso; individualmente cada subtema rinde poco pero SUMADO es apreciable y son sorpresas ciegas recurrentes (I-11/I-12, participación/control social están en watch-list del forecast). QX reparte: participación social 1 + plan salud local 2 + sectorización/ficha 2 + residuos 3 + salud ocupacional 2 + TICs 3 + gestión del riesgo/desastres 2. Ninguno individual es crítico, pero cubre 'presupuesto de sorpresa'.",
  "guidance": "Es un clúster de 16 QX: NO verlos todos. Priorizar por rentabilidad de viñeta: 'SECTORIZACIÓN Y FICHA FAMILIAR', 'GESTIÓN DEL RIESGO EN SITUACIONES DE EMERGENCIAS Y DESASTRES', 'GESTIÓN Y MANEJO DE LOS RESIDUOS SÓLIDOS', 'PARTICIPACIÓN SOCIAL Y COMUNITARIA' y 'BIOSEGURIDAD' (5-6 videos). El resto (URM, TICs, salud ocupacional, inocuidad) verlos en x1.5 o solo leer compendio. Theomed 2-3. Datos-clave preguntables: almacenamiento primario 3/4 y 12h intermedio, hipoclorito 0.5%/0.1%, fórmula del riesgo, ciclo vital familiar.",
  "gaps": [
   "APGAR familiar — el compendio da familiograma/ecomapa pero NO desarrolla el APGAR familiar (instrumento muy preguntable) → leer en QX 'SECTORIZACIÓN Y FICHA FAMILIAR' o normativa de salud familiar",
   "EDAN (evaluación de daños) en desastres — el compendio corta la gestión del riesgo en la pág 28 (prevención/mitigación/preparación) sin llegar a respuesta/EDAN → buscar INDECI/OPS (hueco ya identificado)",
   "Colores de bolsa: verificar norma vigente (compendio dice roja=biocontaminado/amarilla=especial/negra=común) contra NTS residuos actual"
  ],
  "temario": [
   "Participación social y comunitaria; trabajo intersectorial; intervenciones comunitarias",
   "Plan de salud local",
   "Sectorización y ficha familiar; PAIFAM (visitas); ejes de intervención",
   "Salud familiar (familiograma, ecomapa, tipología familiar, ciclo vital familiar, funcional/disfuncional)",
   "Sistemas de información y TICs (HIS, HCE/SIHCE, receta electrónica, interoperabilidad, e-QHALI, WAWARED, REUNIS, REFCON)",
   "Alimentación y nutrición (PAN, PCA, PANTBC, lactancia materna/calostro, alimentación saludable OMS, inocuidad/Codex)",
   "Control de vectores y plagas (compartido con I-4)",
   "Gestión y manejo de residuos sólidos (clases A/B/C, bolsas roja/amarilla/negra, etapas, almacenamiento primario 3/4-intermedio 12h/central)",
   "Salud ocupacional (riesgos físicos/químicos/biológicos/ergonómicos/psicosociales)",
   "Bioseguridad (universalidad/barreras/eliminación; hipoclorito 0.5% vs 0.1%)",
   "Modelo de salud mental comunitaria (CSMC I-3/I-4)",
   "Gestión del riesgo en emergencias/desastres (fórmula riesgo=amenaza×vulnerabilidad/capacidad; ciclo prevención-mitigación-preparación-respuesta-recuperación)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [
   {
    "titulo": "Gestión y manejo de residuos sólidos (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/TUtwNmI0KzkwVXBXTDVnU1E4TC9rQT09"
   },
   {
    "titulo": "Intervención comunitaria en salud (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/NDl3b1hOZEpMbE9lNjNTQlh5UllHQT09"
   },
   {
    "titulo": "Sectorización y ficha familiar (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/bG5TY3B0LzlWZENCYWlrYW5MRnU1QT09"
   },
   {
    "titulo": "Plan de salud local (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/SUNOZ0c2R3lEcndxaVJuQUYwZ0Jmdz09"
   },
   {
    "titulo": "Modelo de salud mental comunitaria (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/cExCbWtVMDRibGJKbDJ4N0JIa0VxQT09"
   },
   {
    "titulo": "GESTIóN Y MANEJO DE LOS RESIDUOS SóLIDOS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/b3hSZzNJZzdqRnBrVS8xQWtjV3dmQT09"
   },
   {
    "titulo": "SALUD OCUPACIONAL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/TW5uQmMvTy9hNHNNZ2NxYm5qZ0RDQT09"
   },
   {
    "titulo": "PARTICIPACIóN SOCIAL Y COMUNITARIA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/RGJ1OXpSUDM5MVB6bG92NlJxejJEUT09"
   },
   {
    "titulo": "BIOSEGURIDAD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/WFo3TGh4Rm9GZWpTMkhodHZOWnlPUT09"
   },
   {
    "titulo": "GESTIóN DEL RIESGO EN SITUACIONES DE EMERGENCIAS Y DESASTRES",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/c3daRGN2WXhwa3NxaU1jeDlYUlNZUT09"
   },
   {
    "titulo": "SECTORIZACIóN Y FICHA FAMILIAR",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/dkYwYTR1ZGptOGZCVEp1NUxQWE03dz09"
   },
   {
    "titulo": "Uso racional de medicamentos",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/T25MSjhwNFpDUkNnSkJWSnVQWG04dz09"
   },
   {
    "titulo": "Sistemas de información y tic en salud",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/WUd0Z2hjQVhuMVR4SUg0a01NOXhrUT09"
   },
   {
    "titulo": "Alimentación y nutrición",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/bHl6Z05tdGFvOWNoU3RLY09Ud0xLQT09"
   },
   {
    "titulo": "Inocuidad alimentaria",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/b1dEQUJmcGhuQ0wxSmhlU051c1NiZz09"
   },
   {
    "titulo": "Plan de salud local",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/VTRQSVBqRHRLbGpWSjRBeVNBVkU3QT09"
   },
   {
    "titulo": "Intervenciones comunitarias en salud",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/aUNlTlNMQjIwUDBPSno2dERqa3F5UT09"
   },
   {
    "titulo": "Modelo de salud mental comunitaria",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/V0RSL2dYS1M3cng5SncvOUphYjBFdz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "parcial",
   "theomedManual": "SP §2.3 Participación Social, §2.4 Sectorización/Ficha Familiar, §2.5 Intervenciones Comunitarias, §2.6 Trabajo Intersectorial, §2.7 Plan de Salud Local, §2.8 TICs/HIS, §2.9 Alimentación/inocuidad, §2.11 Residuos Sólidos, §2.12 Salud Ocupacional, §2.13 Salud Mental Comunitaria; §3.3 Bioseguridad, §3.4 Gestión del Riesgo en Desastres"
  },
  "soloTheomed": [
   "Gestión del Riesgo en Emergencias y Desastres como capítulo propio (§3.4) — más completa que López",
   "Bioseguridad sección dedicada (§3.3)",
   "Salud ocupacional desarrollada (§2.12)"
  ],
  "soloLopez": [
   "Familiograma/APGAR/ecomapa/ciclo vital familiar (salud familiar) más detallado en López"
  ],
  "gapAmbos": [
   "APGAR familiar — instrumento muy preguntable, ninguno lo desarrolla bien → normativa salud familiar",
   "EDAN en desastres — ninguno llega a la respuesta/evaluación de daños → INDECI/OPS"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "I-2": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 55,
  "qxN": 3,
  "theomedN": 31,
  "extenso": false,
  "freq": "Rentable y estable. QX: Conceptos básicos SP 9 + FESP 5 = 14/400 (~3.5/examen). Fue sorpresa ciega en 2026-I (I-2). Forecast lo lista en watch de emergentes (FESP). Preguntable como definición/clasificación directa, cruza con viñeta de gobernanza.",
  "guidance": "Ver los 3 QX del paquete: 'CONCEPTOS BÁSICOS DE SALUD PÚBLICA', 'FUNCIONES ESENCIALES DE LA SALUD PÚBLICA' y 'SALUD PÚBLICA'. Theomed 1-2. Clave: memorizar las 11 FESP-R agrupadas en las 4 etapas (Evaluación/Políticas/Recursos/Acceso) — es el ángulo más preguntable; y la Política Multisectorial 2030 (año, multisectorial). Distinguir modelo biomédico vs biopsicosocial en viñeta.",
  "gaps": [],
  "temario": [
   "Concepto de salud (OMS 1946) y de salud pública",
   "Modelos biomédico vs biopsicosocial",
   "Gobernanza en salud; ODS (17) y salud",
   "Política Nacional Multisectorial de Salud al 2030 'Perú País Saludable' (2020, horizonte 2030, multisectorial)",
   "FESP Renovadas (11 funciones en 4 etapas cíclicas: Evaluación→Políticas→Recursos→Acceso)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [
   {
    "titulo": "Conceptos básicos de salud pública (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/WFZrMHlSVXFlN1NFMWNqTlJwZlJaQT09"
   },
   {
    "titulo": "CONCEPTOS BáSICOS DE SALUD PúBLICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/aXd0OHlNNXRxTkRMSE9CVHFXRE1Cdz09"
   },
   {
    "titulo": "FUNCIONES ESENCIALES DE LA SALUD PúBLICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/eGo2cTU5OWtzWVo5UytIMUdiS2lydz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "SP §1.1 Conceptos Básicos de SP (definiciones, campos, FESP renovadas + finalidad)"
  },
  "soloTheomed": [
   "Campos de acción de la SP (promoción/protección/restauración/vigilancia) desglosados"
  ],
  "soloLopez": [
   "Política Nacional Multisectorial 2030 y ODS más explícitos; FESP agrupadas en 4 etapas cíclicas"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "I-10": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 55,
  "qxN": 4,
  "theomedN": 31,
  "extenso": false,
  "freq": "Rentable y transversal (los niveles de prevención se cruzan con casi todo). QX: Etapas y niveles de prevención 4 + Accesibilidad 3 = 7/400 (~1.75/examen). Forecast estable. Alto valor porque el eje 'primaria/secundaria/terciaria/cuaternaria' y 'promoción vs protección específica' es trampa recurrente en viñetas.",
  "guidance": "Ver los 3 QX del paquete: 'ETAPAS Y NIVELES DE PREVENCIÓN', 'ACCESO A LOS SERVICIOS DE SALUD' y 'PROTECCIÓN ESPECÍFICA DE LA SALUD'. Añadir 'ATENCIÓN PRIMARIA DE SALUD (APS)' del clúster II-5. Theomed 1-2. Dominar al 100% clasificar una intervención por nivel de prevención en viñeta (p.ej. tamizaje=secundaria, no primaria) y promoción vs protección específica dentro de primaria — es oro puro y de alta frecuencia efectiva.",
  "gaps": [
   "APS como estrategia integral (Alma-Ata / APS renovada) — el compendio lo toca marginalmente vía accesibilidad; reforzar con QX 'ATENCIÓN PRIMARIA DE SALUD (APS)' (aparece en el paquete bajo II-5)"
  ],
  "temario": [
   "Etapas y niveles de prevención (primordial, primaria [promoción + protección específica], secundaria [tamizaje/dx precoz/tto oportuno], terciaria, cuaternaria)",
   "APS (enfoque de cuidado integral por curso de vida)",
   "Accesibilidad a los servicios (barreras geográficas/económicas/culturales/sociales y estrategias: RIS, brigadas móviles, casas de espera materna, telesalud, SIS)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [
   {
    "titulo": "ETAPAS Y NIVELES DE PREVENCIóN",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/amNoQnNZU3BhUGFUM2xsNUNBblhrUT09"
   },
   {
    "titulo": "ACCESO A LOS SERVICIOS DE SALUD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/a0lJeWJ3Qmg4SklOa0VSaXpmUmszQT09"
   },
   {
    "titulo": "PROTECCIóN ESPECíFICA DE LA SALUD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/VXg5UjZUeWYrcUp1ekNGODh5VS94Zz09"
   },
   {
    "titulo": "Principales instrumentos de medición en primer nivel de atención",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/R1dyTDU1UUVXT00xeUxoUk5hSEFXZz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "SP §1.6 Etapas y Niveles de Prevención, §2.14 Accesibilidad a los Servicios de Salud + CI §2.1 APS Conceptos y Principios"
  },
  "soloTheomed": [
   "APS como capítulo (Alma-Ata/atributos) en CI §2.1 — López lo tocaba marginal"
  ],
  "soloLopez": [
   "Prevención cuaternaria y primordial nombradas explícitamente"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "I-7": {
  "tier": "BAJA",
  "vueltas": 2,
  "min": 30,
  "qxN": 0,
  "theomedN": 31,
  "extenso": false,
  "freq": "Baja frecuencia. No aparece con peso propio en QX Tendencias del área I (no tiene subtema dedicado en el conteo /400). Forecast no lo destaca. Cayó como sorpresa aislada, no persistente. SIN video QX en el paquete.",
  "guidance": "Sin QX. Buscar en Theomed (31 videos del área I) 1 video de curso de vida/niñez si existe; si no, lectura rápida de la ficha/normativa PNAIA en Drive. 1 vuelta ligera — no invertir bloque largo. Solo asegurar reconocer qué es el PNAIA y su rango etario si aparece como distractor.",
  "gaps": [
   "TODO el subtema PNAIA está AL DESCUBIERTO en QX (0 videos) y no se desarrolla en el compendio SP → leer la normativa PNAIA directamente (Drive/MINSA) o Theomed (sección área I, 31 videos, buscar el de infancia/curso de vida). Baja prioridad: 1 lectura ligera basta."
  ],
  "temario": [
   "No tratado explícitamente como capítulo en el bloque SP del compendio López (el compendio cubre salud familiar/etapas de vida en I-11/I-12 e I-1, pero PNAIA como plan nacional no figura desarrollado)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "no",
   "theomed": "no",
   "theomedManual": "No tiene sección propia de PNAIA en SP (solo cruces marginales en curso de vida del niño en CI)"
  },
  "soloTheomed": [],
  "soloLopez": [],
  "gapAmbos": [
   "PNAIA como plan nacional — NINGÚN libro lo desarrolla → leer normativa PNAIA/MINSA (baja prioridad, baja frecuencia)"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "I-8": {
  "tier": "BAJA",
  "vueltas": 2,
  "min": 30,
  "qxN": 0,
  "theomedN": 31,
  "extenso": false,
  "freq": "Baja. Sin subtema propio en QX Tendencias del área I. Forecast no lo lista. SIN video QX en el paquete. Aparición esporádica.",
  "guidance": "Sin QX. Theomed área I si tiene algo de enfoque de derechos/discapacidad; si no, lectura ligera de la normativa (Ley 29973, certificación de discapacidad, CONADIS) en Drive. 1 vuelta. Solo reconocimiento.",
  "gaps": [
   "Subtema AL DESCUBIERTO en QX (0 videos) y sin capítulo dedicado en el compendio SP → leer normativa de discapacidad (Ley 29973 / CONADIS) y PNDH en Drive. Baja prioridad."
  ],
  "temario": [
   "No desarrollado como capítulo en el bloque SP del compendio López (discapacidad se menciona marginalmente en historia natural/prevención terciaria y salud familiar)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "no",
   "theomed": "no",
   "theomedManual": "Discapacidad solo mención marginal en SP (historia natural, prevención terciaria) y RBC en CI; sin capítulo PNDH"
  },
  "soloTheomed": [
   "Rehabilitación Basada en la Comunidad (RBC) y certificación de discapacidad mencionadas en CI (componentes MCI)"
  ],
  "soloLopez": [],
  "gapAmbos": [
   "PNDH y atención a personas con discapacidad (Ley 29973/CONADIS) — sin capítulo en ninguno → normativa (baja prioridad)"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "I-9": {
  "tier": "BAJA",
  "vueltas": 2,
  "min": 30,
  "qxN": 0,
  "theomedN": 31,
  "extenso": false,
  "freq": "Baja como código aislado, PERO su contenido real (salud familiar: familiograma, ciclo vital, tipología) ya está fuertemente cubierto y se pregunta dentro de I-11+I-12. Sin video QX propio en el paquete. Forecast no lo destaca por separado.",
  "guidance": "No requiere videos propios: se estudia junto con I-11+I-12 (mismo material). Reutilizar 'SECTORIZACIÓN Y FICHA FAMILIAR' de QX. Verificar la NTS/estrategia de salud familiar vigente en Drive por el nombre exacto (ENSF). 1 vuelta ligera; el peso ya está contado en I-11+I-12 para no duplicar tiempo.",
  "gaps": [
   "APGAR familiar (no en compendio) — igual que en I-11+I-12, leer en normativa de salud familiar. El resto del contenido NO está al descubierto: se cubre con las páginas de salud familiar del compendio + los QX de I-11+I-12 ('SECTORIZACIÓN Y FICHA FAMILIAR', 'MODELO DE SALUD MENTAL COMUNITARIA')."
  ],
  "temario": [
   "Familia (definición, unidad básica)",
   "Salud familiar y sus instrumentos (familiograma, ecomapa)",
   "Tipología familiar (nuclear/extendida/ampliada/monoparental/reconstituida/equivalente; funcional/disfuncional)",
   "Ciclo vital familiar (formación/expansión/dispersión/contracción)",
   "PAIFAM y visitas de salud familiar",
   "(Todo esto el compendio lo desarrolla en las páginas de salud familiar — mismas que alimentan I-11+I-12)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=2",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · SP",
   "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
  },
  "videosExtra": [],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "parcial",
   "theomedManual": "SP §2.4 Sectorización/Ficha Familiar + curso de vida familiar; salud familiar embebida"
  },
  "soloTheomed": [],
  "soloLopez": [
   "Tipología familiar, ciclo vital familiar y familiograma/ecomapa desarrollados de forma más completa (mismas páginas que I-11)"
  ],
  "gapAmbos": [
   "APGAR familiar (igual que I-11) → normativa ENSF/salud familiar"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0"
   },
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · Salud Púb",
    "url": "https://drive.google.com/drive/folders/1Um9jF2x7VCYLJthUMC2DdoOxp6YuS9dH"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §2) · Videoclases por área · Sal",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=2"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-1": {
  "tier": "CRÍTICA",
  "vueltas": 6,
  "min": 110,
  "qxN": 12,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: emergencias obstétricas 9 + embarazo/parto/puerperio 3 + climaterio 1 + emerg.obst(específicos) 1 = 14/400 (~3.5%/examen). Forecast v2: II-1 ~5% (banda 4-8), tendencia ALZA, CRÍTICO confirmado. Núcleo caliente: PARTO VERTICAL (criterios/posición), referencia de gestante por nivel, preeclampsia/eclampsia. Viñeta clínica ~90%.",
  "guidance": "Mirar los 13 videos QX de II-1 (es el bloque más grande de II). PRIORIZAR en este orden: (1) 'MANEJO INICIAL DE EMERGENCIAS OBSTÉTRICAS' + 'RIESGO OBSTÉTRICO' (viñetas de preeclampsia/hemorragia, lo más rentable); (2) 'ATENCIÓN PRENATAL' + 'DILATACIÓN/EXPULSIVO/ALUMBRAMIENTO' (parto vertical y conducta); (3) 'MANEJO INICIAL DE EMERGENCIAS NEONATALES'; dejar 'CLIMATERIO Y MENOPAUSIA', 'DIAGNÓSTICO DEL EMBARAZO', 'NUTRICIÓN EN EL EMBARAZO', 'PUERPERIO NORMAL' para 2ª vuelta. De Theomed (54 en toda el área II): ver 3-4 sesiones de obstetricia/emergencias obstétricas.",
  "gaps": [
   "Flujogramas de hemorragia 1ª mitad, hemorragia intra/postparto, shock obstétrico, sepsis obstétrica y emergencias neonatales están en el compendio SOLO como imágenes/tablas (págs 67-71) → texto no extraíble: estudiar esas 5 láminas directo del PDF López o video QX de emergencias obstétricas",
   "Manejo detallado de preeclampsia severa/eclampsia (sulfato de magnesio, dosis) no está en compendio → cubrir con QX 'Manejo inicial de emergencias obstétricas' + guía MINSA"
  ],
  "temario": [
   "Atención prenatal reenfocada: precoz <14 sem, 6 controles MINSA, periodicidad (mensual hasta 32s, quincenal 33-36s, semanal desde 37s)",
   "Micronutrientes: ácido fólico 500mcg hasta sem13; AF+sulfato ferroso (400mcg+60mg) sem14 a 30d postparto; calcio 2g desde sem20",
   "Vacunas gestante: DT sem20, Tdap dosis única 20-36s cada gestación, Influenza cualquier trimestre, HvB (0-1-2m)",
   "Maniobras de Leopold (situación/posición/presentación/encajamiento)",
   "Ecografías MINSA: 2 (una <14s edad gestacional, otra 22-24s)",
   "Ganancia de peso por IMC pregestacional; control Hb (1er CPN, 25-28s, 37-40s)",
   "Plan de parto (3 momentos), psicoprofilaxis 6 sesiones, RADAR de gestantes, visita domiciliaria por trimestre",
   "Dilatación: latente <4cm / activa ≥4cm, partograma OMS desde 4cm, evitar >4 tactos/RAM/rutinas",
   "Expulsivo: ingreso sala (primípara 10cm+2, multípara 10cm 0, gran multípara 8cm), pinzamiento cordón, evitar Kristeller/episiotomía rutinaria (si se hace: mediolateral)",
   "Alumbramiento: manejo activo 3ª etapa, oxitocina 10 UI IM, maniobra Brandt-Andrews, masaje uterino",
   "Puerperio: inmediato (0-24h, control seriado), mediato (24h-7d), tardío (8-42d); loquios (rojos/rosados/blancos)",
   "Parto vertical (posiciones) y definiciones (institucional/domiciliario/en trayecto)",
   "Emergencias obstétricas: hemorragias 1ª mitad, hemorragia intra/postparto, shock hipovolémico obstétrico",
   "Trastornos hipertensivos: HTA crónica, gestacional, preeclampsia leve/severa (criterios ≥160/110 o daño órgano blanco), eclampsia, HELLP (LDH≥600, plaq<100k)",
   "Sepsis en obstetricia; emergencias neonatales; climaterio y menopausia (Dx clínico 45-55a+amenorrea≥12m, SVM, SGM, TRH/ISRS)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "CLIMATERIO Y MENOPAUSIA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/UEpsVnZVc21MSWl3MmRoNWg5c001QT09"
   },
   {
    "titulo": "DIAGNóSTICO DEL EMBARAZO",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/OUptaG90UWJZWkNZS09sT3lWbWtYdz09"
   },
   {
    "titulo": "NUTRICIóN EN EL EMBARAZO",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/NjBhUk9sNXdNbGxkbjB2SGpLeFJDZz09"
   },
   {
    "titulo": "ATENCIóN PRENATAL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/N1FsYk8vU0lJREpQT0FlK2VvUWFqQT09"
   },
   {
    "titulo": "DILATACIóN",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/dkxhS2hKdm55TkUrb05kTlg2QXlMZz09"
   },
   {
    "titulo": "ALUMBRAMIENTO",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/cGQ5YkJFRW8wdmpoeGxROXlISVhRUT09"
   },
   {
    "titulo": "MANEJO INICIAL DE EMERGENCIAS OBSTéTRICAS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/cWhUc3FOUUd6UWZtb1J1MGNXYTRhUT09"
   },
   {
    "titulo": "RIESGO OBSTéTRICO",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/bEdsU055OG1YaWNTV3RHREJVWUtNUT09"
   },
   {
    "titulo": "MANEJO INICIAL DE EMERGENCIAS NEONATALES",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/VFJNZnhpeTdmVUx5eWdQbFY3VE1mZz09"
   },
   {
    "titulo": "EXPULSIVO",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/RTBBRkh5OTRwMG9tQ2o1bWFZS0Jydz09"
   },
   {
    "titulo": "PAQUETE BáSICO DE CUIDADO DEL BINOMIO MADRE NIñO",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/UXRoYTVNY2FCVUZ6MndxSzlQdjhEQT09"
   },
   {
    "titulo": "Anticonceptivos / planificación familiar",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/b2ZqZ3pUZXNwUEorUzNGVkl4TWdNUT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "CI §1.3-1.7 (urgencias, emergencias obstétricas/neonatales CLAVE AZUL, riesgo obstétrico) + §2.23 Climaterio + §2.24 Embarazo/parto/puerperio normal"
  },
  "soloTheomed": [
   "Flujogramas de emergencias obstétricas DESARROLLADOS en texto (Clave Azul, hemorragias 1ª/2ª mitad, HPP, shock, sepsis, endometritis, aborto séptico, RPM, corioamnionitis) — en López eran solo imágenes no extraíbles",
   "Manejo de preeclampsia severa/eclampsia con sulfato de magnesio y crisis hipertensiva ≥160/110 — gap de López",
   "Emergencias neonatales (hipoglucemia, sepsis neonatal) desarrolladas",
   "Aspectos legales/forenses: dolo vs culpa, 4 tipos de mala praxis"
  ],
  "soloLopez": [
   "Micronutrientes con dosis exactas (ácido fólico/calcio/hierro por semana) más tabulados",
   "Maniobras de Leopold y detalle de partograma OMS"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-3": {
  "tier": "CRÍTICA",
  "vueltas": 6,
  "min": 90,
  "qxN": 2,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: esquema nacional 8 + persona con esquema regular 5 = 13/400 (~3.25%/examen). Forecast v2: II-3 ~5% (banda 3-8), ALZA, CRÍTICO. Emergente confirmado por FICHA MINSA nueva (esquema desdoblado) + live QX 'NT Inmunizaciones'. Núcleo: cadena de frío 2-8°C y ruptura, esquema por edad (VPH 9a dosis única, SPR, influenza+neumococo en AM), ESAVI severo notificación 24h.",
  "guidance": "Ver los 3 videos QX: PRIORIZAR 'ESQUEMA NACIONAL DE VACUNACIÓN EN EL PERÚ - ACTUALIZACIÓN' (trae los cambios recientes, alto rendimiento) y luego 'ATENCIÓN DE LA PERSONA CON EL ESQUEMA REGULAR'. Complementar con el live QX de 'Revisión de Normas Técnicas — NT Inmunizaciones'. De Theomed: 2 sesiones sobre inmunizaciones + cadena de frío. Foco viñeta: qué hacer ante RCF, ESAVI severo (notificar 24h), esquema por edad.",
  "gaps": [
   "Las TABLAS de esquema de vacunación por etapa (niño/adolescente/adulto/AM/gestante/personal) en el compendio son imágenes (págs 30-32) → memorizar el calendario exacto (edades, dosis, refuerzos) del PDF López tabla o de la ficha MINSA de esquema; el compendio no lo lista en texto"
  ],
  "temario": [
   "Esquema nacional: 18 vacunas / 28 enfermedades; 15 vacunas hasta los 5 años",
   "Definiciones: susceptible, refuerzo, dosis rescate, barrido, bloqueo vacunal (72h), oportunidad perdida de vacunación",
   "Esquemas por etapa de vida: gestante, niño, adolescente, joven, adulto, adulto mayor, personal de salud (tablas)",
   "Siglas de vacunas (BCG, DPT, Pentavalente, IPV/APO, SPR, VPH, Tdap/dTpa, etc.)",
   "ESAVI: definición, clasificación NO severo vs SEVERO (anafilaxia, convulsiones, Guillain-Barré, trombosis con trombocitopenia)",
   "Tipos de evento (coincidente, relacionado, error programático, no concluyente); notificación ESAVI severo <24h",
   "Cadena de frío: rango +2 a +8°C, ideal +4-6°C, oscilación +3-7°C, zona alerta <+3 o +7-8°C",
   "Almacenes: nacional CENARES (12m), regional DIRESA/GERESA/DIRIS (3m, submacenes hasta 6m)",
   "Componentes: caja transportadora, termo portavacunas, paquetes fríos, data logger, método FEFO, autonomía frigorífica, estabilidad",
   "Fotosensibilidad (+ fotosensibles: SPR, antivaricela, BCG; no: Tdap, HvB)",
   "Ruptura cadena de frío (RCF): daño acumulativo e irreversible, procedimiento (restablecer, suspender uso, notificar <24h)",
   "Emergencia en cadena de frío y plan de contingencia"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "ESQUEMA NACIONAL DE VACUNACIóN EN PERú",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/TW14OFpydEY5RitybDNCUXpTOG9OUT09"
   },
   {
    "titulo": "ATENCIóN DE LA PERSONA CON EL ESQUEMA REGULAR DE VACUNACIóN",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/UUgzalZEQ0JtemtJOVRIVmdoOE9WQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "sí",
   "theomedManual": "CI §7 Esquema Nacional de Vacunación <11 años + §2.10 ESAVI (Directiva 054) + §2.11 Cadena de Frío en Inmunizaciones (NTS 242-MINSA/DGIESP-2026)"
  },
  "soloTheomed": [
   "Cadena de frío con NTS 242-2026 ACTUALIZADA (rango 2-8°C, ruptura, procedimiento) — capítulo propio",
   "ESAVI severo con definición operativa, clasificación, error programático y notificación 24h desarrollados en texto",
   "Esquema de vacunación en tabla legible por edad — en López eran imágenes"
  ],
  "soloLopez": [
   "Almacenes (CENARES/DIRESA con meses) y componentes (data logger/FEFO) listados en texto",
   "Fotosensibilidad de vacunas específicas"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-11": {
  "tier": "CRÍTICA",
  "vueltas": 6,
  "min": 100,
  "qxN": 3,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: ITS 9/400 (~2.25%/examen) — nota: PTMI VIH/sífilis/VHB cuenta aparte. Forecast v2: II-11 ~5% (banda 3-7), ALZA, CRÍTICO. Confirmado por TRIPLE FICHA MINSA nueva (VIH/sífilis/VHB) + live QX 'NT ITS' + rebote en 2026-I. Núcleo: prueba dual/triple VIH-sífilis en gestante/adolescente, penicilina benzatínica, PTMI.",
  "guidance": "Ver los 6 videos QX. PRIORIZAR: (1) 'ATENCIÓN INTEGRAL DE LAS ITS' (abordaje sindrómico, lo más preguntado); (2) 'PREVENCIÓN DE LA TRANSMISIÓN MATERNO INFANTIL DE VIH, SÍFILIS Y VHB' (la triple ficha nueva = señal fuerte); (3) 'PREVENCIÓN COMBINADA DEL VIH'. Los 3 videos de PTMI desdoblados (VIH/VHB/sífilis por separado) verlos en 2ª vuelta si hay tiempo. Live QX 'NT ITS'. Theomed: 2-3 sesiones ITS/VIH. Foco: prueba dual, penicilina benzatínica, conducta en gestante reactiva.",
  "gaps": [
   "Tablas de tratamiento específico de cada síndrome (dosis exactas de descarga uretral/rectal/flujo vaginal/EPI) son imágenes en el compendio → memorizar esquemas de la guía MINSA de ITS o del live QX 'NT ITS'"
  ],
  "temario": [
   "Abordaje sindrómico vs etiológico; caso de ITS; regla de las 4C (Consejería, Cumplimiento, Contactos, Condones)",
   "Pruebas: PRD dual (VIH+sífilis), PRT triple (+HBsAg), treponémicas (FTA-Abs, TPHA, TPPA) vs no treponémicas (RPR, VDRL) y su uso (Dx vs control post-tratamiento)",
   "Síndromes: úlcera genital, descarga uretral, descarga rectal, flujo vaginal anormal, cervicitis, dolor abdominal bajo (EPI)",
   "Sífilis: primaria/secundaria/latente/terciaria — Bencilpenicilina benzatínica 2.4M UI IM (esquemas por etapa); neurosífilis penicilina sódica",
   "Tratamiento ITS en embarazo/lactancia (penicilinas/ceftriaxona/azitro/metronidazol seguros; NO doxiciclina ni aminoglucósidos)",
   "VIH: tamizaje (ELISA/quimioluminiscencia/pruebas rápidas), confirmatorias (carga viral, IFI, Inmunoblot), definición de caso, consentimiento informado obligatorio",
   "TARV primera línea: Tenofovir+Lamivudina+Dolutegravir (DFC); monitoreo (CD4, carga viral), fracaso virológico (<1000 copias)",
   "Profilaxis: TMP/SMX (CD4<200), TP-TB con isoniacida+piridoxina, vacunación en PVVIH (dT, HvB 40µg, influenza, neumococo)",
   "PrEP diaria y a demanda (TDF/FTC); prevención combinada del VIH; poblaciones clave (HSH, TS, MT, PPL, PVV)",
   "Hepatitis A/B/C: transmisión, cronificación, tamizaje/confirmación, tratamiento (HvB Tenofovir/Entecavir; HvC Sofosbuvir+Velpatasvir)",
   "PTMI VIH/sífilis/VHB: tamizaje gestante por trimestre, consentimiento, resultado mismo día (30 min), referencia inmediata TARGA, lactancia (prohibida en VIH sin fórmula segura), RN (zidovudina <6h; HvB vacuna+HBIG <12h)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "PREVENCIóN COMBINADA DEL VIH",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/ZmVONDlDWnI2R0laS2dHMGlWSGtsQT09"
   },
   {
    "titulo": "ATENCIóN INTEGRAL DE LAS ITS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/cWp4WWs0Vkh4Z0xwNjgwS3JBcWo0QT09"
   },
   {
    "titulo": "PREVENCIÓN DE LA TRANSMISIÓN MATERNO INFANTIL DE VIH, SÍFILIS Y VHB",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/K2NnZDdPT2w5NzFBck15OTU2cjJmZz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "CI §2.16 Prevención de transmisión materno-infantil VIH/sífilis/VHB (PTMI triple) + batería APN (prueba dual/triple) + tamizaje ITS/VIH en curso de vida"
  },
  "soloTheomed": [
   "PTMI triple (VIH/sífilis/VHB) desarrollada con conducta en gestante reactiva, resultado mismo día, PEP RN",
   "PEP VIH esquema peruano (TDF/FTC + Lopinavir/Ritonavir, DS 083) con ventanas de tiempo"
  ],
  "soloLopez": [
   "Abordaje sindrómico completo (6 síndromes ITS) con tratamiento por síndrome",
   "TARV 1ª línea (TDF+3TC+DTG), PrEP diaria/a demanda, hepatitis A/B/C tratamiento (Sofosbuvir/Velpatasvir)",
   "Regla de las 4C, treponémicas vs no treponémicas y su uso"
  ],
  "gapAmbos": [
   "Dosis exactas de tratamiento por síndrome (descarga uretral/EPI) — tablas imagen en López, parcial en Theomed → guía MINSA ITS"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-8": {
  "tier": "CRÍTICA",
  "vueltas": 6,
  "min": 90,
  "qxN": 1,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: ECNT 16/400 = el tema MÁS FRECUENTE de toda el área II (~4%/examen). Forecast v2: II-8 ~4% (banda 3-6), estable, CRÍTICO. Núcleo: metas DM2 (HbA1c<7%), RCV (perímetro/PA/IMC), prediabetes, algoritmo metformina→glibenclamida.",
  "guidance": "Solo hay 1 video QX ('PREVENCIÓN Y CONTROL DE ECNT') — verlo completo y con calma porque cubre HTA+DM+RCV, y el compendio deja HTA floja. COMPLEMENTAR obligatoriamente con Theomed (buscar 1-2 sesiones de ECNT/HEARTS/HTA/DM en las 54 del área) para tapar el gap de HTA. Foco viñeta: metas HbA1c<7% y PA, prediabetes, cuándo iniciar metformina, riesgo CV por perímetro abdominal.",
  "gaps": [
   "HTA: el compendio NO tiene un capítulo propio de HTA/algoritmo HEARTS — la HTA solo aparece como factor de riesgo y dentro de preeclampsia. GAP importante dado que HEARTS/HTA cae en viñeta → cubrir HTA (metas PA, clasificación, tratamiento escalonado, riesgo CV) con el video QX de ECNT + guía MINSA HEARTS + Theomed; NO confiar solo en López para HTA",
   "Estrategia HEARTS como paquete integrado (HTA+DM+RCV) no está nombrada en el compendio → verla en QX/Theomed",
   "Tabla de metas terapéuticas DM es imagen → memorizar del PDF"
  ],
  "temario": [
   "Diabetes Mellitus: definición, factores de riesgo modificables/no modificables, signos (4 P), cribado (40-70a con sobrepeso; <40a con FR)",
   "Criterios diagnósticos MINSA 2015: HbA1c ≥6.5% / glucosa ayunas ≥126 / TTOG ≥200 / glucosa aleatoria ≥200+síntomas; prediabetes",
   "Complicaciones agudas (hipoglucemia, CAD, EHH) y crónicas (nefro/retino/neuropatía, pie diabético)",
   "Plan de manejo 1er nivel: educación, nutrición (CHO 45-55%, dieta fraccionada), actividad física (150 min/sem, PAR-Q), cese de tabaco",
   "Tratamiento farmacológico: Metformina 1ª línea (contraindicada TFG<30), Glibenclamida alternativa, Gliclazida (menor hipoglucemia)",
   "Algoritmo de manejo; control mensual, controlado si 2/3 controles con glucosa <130",
   "Metas terapéuticas (tabla imagen); tamizaje RCV con perímetro abdominal/PA/IMC (dentro de paquete adulto)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "PREVENCIóN Y CONTROL DE ECNT",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/SHpYRlV1TEtNcFFDRk96RWowdXhrUT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "sí",
   "theomedManual": "CI §2.17 Prevención y control de ECNT — Diabetes (NTS 210-2024, HEARTS-D) + Hipertensión Arterial (Iniciativa HEARTS-HTA con metas <140/90 y tratamiento farmacológico escalonado)"
  },
  "soloTheomed": [
   "HTA/HEARTS COMPLETO (clasificación, meta <140/90, algoritmo farmacológico) — este era el GAP mayor de López, que dejaba HTA floja",
   "Estrategia HEARTS como paquete integrado (HEARTS-D + HEARTS-HTA) nombrada y desarrollada",
   "Definición de caso de diabetes para vigilancia (NTS 210-2024) nuevo/prevalente"
  ],
  "soloLopez": [
   "Criterios diagnósticos DM tabulados (HbA1c/ayunas/TTOG) y algoritmo metformina→glibenclamida con contraindicación TFG<30",
   "Complicaciones agudas/crónicas listadas"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-7": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 65,
  "qxN": 2,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: 9/400 (~2.25%/examen). Forecast v2: II-7 ~3% (banda 2-5), estable, EMERGENTE/watch-list (pico ciego recurrente en backtest). Joseph indica que casi siempre cae 1 pregunta de VACAM. Núcleo: VACAM breve/corta/completa por nivel, escalas (Pfeiffer, caídas, Barthel), clasificación funcional, inmunización AM.",
  "guidance": "Ver el único video QX 'PAQUETE BÁSICO DEL CUIDADO INTEGRAL DEL ADULTO MAYOR' completo (cubre VACAM). Complementar con 1-2 sesiones Theomed de adulto mayor/VACAM. Foco viñeta de alto rendimiento: qué escala se aplica en qué nivel (Pfeiffer/Katz nivel I-1, Barthel/MiniMental en completa), clasificación funcional (independiente/parcial/total), y qué instrumento evalúa qué dominio.",
  "gaps": [
   "Esquema de vacunación del adulto mayor (qué vacunas: influenza, neumococo) se cruza con II-3; verificar calendario AM en la tabla de vacunación (imagen)"
  ],
  "temario": [
   "Población objetivo ≥60 años; captación, admisión, triaje, cuidado integral",
   "VACAM modalidades: breve (técnico, nivel I-1, Katz/Pfeiffer/Yessavage), corta (profesional, I-2/I-3/I-4), completa (geriatra/médico capacitado, II-1/II-2, Barthel/Lawton/MiniMental/MNA-SF/FRAIL/SPPB), VGI (geriatra)",
   "Escalas específicas: Katz y Barthel (ABVD), Lawton (AIVD), Pfeiffer y MiniMental (mental), Yessavage (afectivo), FRAIL/SPPB (fragilidad), Gijón (sociofamiliar), MNA-SF (nutricional)",
   "Clasificación funcional: PAM independiente / dependiente parcial / dependiente total (objetivos de cuidado de cada una)",
   "Síndromes geriátricos (caídas, fragilidad, dismovilidad, deterioro cognitivo, privación neurosensorial)",
   "Paquete de cuidado: consejería/educación, cuidado preventivo (vacunación AM, detección fragilidad/caídas), atención domiciliaria (ADOGE), recuperación/rehabilitación, participación social (CAM), cuidados familiares/comunitarios",
   "Frecuencia VACAM mínimo 1 vez al año; ABVD vs AIVD"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "PAQUETE BáSICO DEL CUIDADO INTEGRAL DEL ADULTO",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/S2VxZFlXUm0vV1pmS2wvMmxSTkRSQT09"
   },
   {
    "titulo": "PAQUETE BáSICO DEL CUIDADO INTEGRAL DEL ADULTO MAYOR",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/bjFsZHNIdlF4L3pLOWxuR0FDQ0NhQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "CI Sub-Área 6 (CISPA/adulto) + curso de vida Adulto Mayor: VACAM con escalas Katz/Lawton/Pfeiffer/Yesavage/Gijón + inmunización AM (neumococo+influenza)"
  },
  "soloTheomed": [
   "VACAM con TODAS las escalas mapeadas por dominio en tabla — cierra el cruce de escalas que López tenía disperso",
   "Vacunas del adulto mayor explícitas (neumococo + influenza anual)"
  ],
  "soloLopez": [
   "Modalidades VACAM por nivel (breve/corta/completa/VGI) y clasificación funcional (independiente/parcial/total) más detalladas",
   "MNA-SF, FRAIL, SPPB, síndromes geriátricos"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-6": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 70,
  "qxN": 1,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: 8/400 (~2%/examen). Forecast v2: añadido a lista MEDIA-ALTA (post-verificación QX). Núcleo: definiciones operativas (SR, caso presuntivo, búsqueda activa/pasiva), esquema TB sensible HREZ/HR, TPT, PPD, notificación (inmediata vs semanal).",
  "guidance": "Ver el único video QX 'PREVENCIÓN Y CONTROL DE LA TUBERCULOSIS' completo. Complementar con 1-2 sesiones Theomed de TB. Foco viñeta: definir SR y caso presuntivo, esquema HREZ/HR (dosis y meses), a quién dar TPT, interpretar PPD (10 vs 5mm), y regla de notificación (inmediata para XDR/personal salud, semanal el resto).",
  "gaps": [
   "Manejo de TB-DR y casos especiales (PVV, perinatal, PPL) explícitamente NO abordado en el compendio (es referencia) → no profundizar, pero saber que se refiere"
  ],
  "temario": [
   "Definiciones operativas: brote TB, búsqueda activa/pasiva, caso presuntivo, SR (tos+flema ≥15d), TB con/sin confirmación bacteriológica, pulmonar/extrapulmonar, caso índice, contacto (censado/examinado/controlado)",
   "Condición de ingreso: nuevo vs antes tratado (recaída, pérdida seguimiento, fracaso); ILTB; irregularidad; SIGTB; poblaciones vulnerables y grupos de riesgo",
   "Resultados de tratamiento (curado, completo, fracaso, fallecido, éxito); conversión y reversión bacteriológica; pruebas de sensibilidad",
   "Prevención primaria: BCG <24h, información/educación, control de infecciones (administrativo/ambiental 6-12 recambios+UV/respiratorio N95), bioseguridad",
   "Estudio de contactos (censo+examen ≤2 sem); TPT (a quiénes: <5a contactos, VIH, PPD≥10mm, grupos de riesgo)",
   "Tamizaje sistemático (por síntomas / por Rx tórax); diagnóstico ILTB (PPD ≥10mm general / ≥5mm inmunosuprimidos, lectura 48-72h; IGRA)",
   "Diagnóstico bacteriológico: baciloscopía (Ziehl-Neelsen, criterios de informe +/++/+++), cultivo (Löwenstein-Jensen/MGIT), PDRm; recolección 2 muestras, transporte 2-8°C, NETLAB/RM 613-2022",
   "Tratamiento TB sensible: 1ª fase 2m HREZ (50 dosis) + 2ª fase 4m HR (100 dosis), DFC L-S; RAM de fármacos (H hepato/neuropatía, R coloración/hepato, Z hiperuricemia, E neuritis retrobulbar, S ototoxicidad)",
   "Vigilancia epidemiológica TB (Directiva 079-2017/CDC); notificación inmediata (TB personal salud, XDR <24h) vs semanal (resto)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "PREVENCIóN Y CONTROL DE LA TUBERCULOSIS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/SWNIUVM3cHVTVE1hTnNKTXBDbzdlZz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "CI §2.9 Prevención y Control de Tuberculosis (NTS): definiciones operativas, esquema HREZ/HR, TPT, PPD, notificación"
  },
  "soloTheomed": [
   "TB con NTS actualizada y control de infecciones (recambios/N95) en texto"
  ],
  "soloLopez": [
   "Definiciones operativas más granulares (SR, condición de ingreso, resultados de tratamiento, RAM por fármaco H/R/Z/E/S), baciloscopía criterios +/++/+++, RM 613-2022"
  ],
  "gapAmbos": [
   "Manejo de TB-DR/casos especiales (PVV/PPL) — ninguno profundiza (es referencia)"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-4": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 70,
  "qxN": 2,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: 8/400 (~2%/examen). Forecast v2: II-4 ~3% (banda 2-5), estable. Núcleo: suplementación de hierro por etapa (lactante 4m/prematuro 30d, gestante desde captación), corrección de Hb por altitud, dosis de tratamiento vs preventiva.",
  "guidance": "Ver los 4 videos QX. PRIORIZAR 'PREVENCIÓN Y CONTROL DE ANEMIA' (el central, con dosis exactas). Luego 'SUPLEMENTACIÓN CON VITAMINA A' y los de desnutrición/malnutrición pediátrica en 2ª vuelta. Theomed: 1-2 sesiones de anemia. Foco viñeta: cuándo iniciar suplementación (4m término, 30d prematuro), corrección de Hb por altitud (cálculo típico), diferenciar dosis preventiva vs tratamiento, gestante se inicia apenas se capta sin importar EG.",
  "gaps": [],
  "temario": [
   "Definición de anemia (Hb <2 DS), hallazgos clínicos aparecen Hb <7-8 g/dL; signos por sistema (palidez, pica, coiloniquia, soplo Hb<5)",
   "Valores normales de Hb y corrección por altitud (tabla msnm → restar g/dL)",
   "Suplementación PREVENTIVA por grupo: <6m (prematuro/bajo peso 30d hasta 5m29d; término 4m), 6-11m, 12-23m, 24-35m, 36-59m, 5-11a (dosis, producto, frecuencia, duración)",
   "Adolescente mujer/MEF (60mg+400µg AF, 2 tab/sem, 3m/año); gestante (60mg+400µg desde sem14 hasta parto; 120mg si inicia >32sem); puérpera",
   "Medición de Hb por grupo durante suplementación (nº y momentos); seguimiento por visita domiciliaria/teleorientación",
   "Tratamiento de anemia ferropénica: inicio (Hb bajo lo normal), dosis 3mg/kg/día por grupo, gestante/puérpera (120mg+800µg AF), control mensual (incremento ≥1g/dL a los 30d), CPM férrico si mala adherencia",
   "Efectos adversos y recomendaciones; suspensión (<3m continúa, >3m reinicia); criterios de alta (6m + Hb normal); referencia; exámenes de apoyo (hemograma, ferritina, reticulocitos, PCR)",
   "Vitamina A (esquema preventivo 6-59m); desnutrición/malnutrición pediátrica"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "PREVENCIóN Y CONTROL DE ANEMIA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/bTd2QWdtT0RDNnRuQWFJMjZzQW5sZz09"
   },
   {
    "titulo": "SUPLEMENTACIóN CON VITAMINA A",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/TmFsWnNaT1p4QkJ2WGJzQ1Naa242UT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "CI §2.x Prevención y Control de Anemia + suplementación de hierro por etapa (dentro de CRED y curso de vida) + corrección por altitud"
  },
  "soloTheomed": [
   "Sal/dosis integradas al paquete CRED con vitamina A"
  ],
  "soloLopez": [
   "Suplementación PREVENTIVA por grupo etario con dosis/producto/frecuencia/duración exactas + tratamiento 3mg/kg/día + criterios de alta muy detallados",
   "Corrección de Hb por altitud tabulada, exámenes de apoyo (ferritina/reticulocitos)"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-10": {
  "tier": "ALTA",
  "vueltas": 4,
  "min": 65,
  "qxN": 3,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: prevención y control del cáncer 6/400 (~1.5%/examen). Forecast v2: añadido a watch-list (tamizaje mama/CACU). Joseph indica que suele caer 1 pregunta. Núcleo: tamizaje CACU (DM-VPH/IVAA/PAP por edad), mama (ECM/mamografía), próstata (PSA), regla ABCDE piel, cáncer infantil referencia ≤72h.",
  "guidance": "Ver los 6 videos QX. PRIORIZAR los de mayor rendimiento en viñeta: 'PREVENCIÓN Y CONTROL DEL CÁNCER DE CÉRVIX' (tamizaje por edad, lo más preguntado) y 'DE MAMA'; luego 'DE PRÓSTATA' y 'DETECCIÓN TEMPRANA DE CÁNCER INFANTIL' (referencia ≤72h). Los genéricos 'PREVENCIÓN Y CONTROL DE CÁNCER' verlos como repaso. Theomed: 1-2 sesiones. Foco: qué prueba de tamizaje según edad/VIH, periodicidad, y umbrales de referencia.",
  "gaps": [],
  "temario": [
   "Cáncer de cérvix: factores de riesgo (VPH 16/18), prevención primaria (vacuna VPH 9-18a dosis única), secundaria — elección de prueba por edad (DM-VPH 30-49a, IVAA, PAP 25-29 y 50-64a), algoritmos de tamizaje y seguimiento",
   "Cáncer de mama: FR modificables/no, prevención primaria, secundaria (evaluación anual alto riesgo GAIL/BRCA, ECM anual, mamografía cada 2 años, hallazgos referibles)",
   "Cáncer de próstata: FR, prevención, PSA + tacto rectal (varones 50-75a, 45 si antecedente), biopsia transrectal",
   "Cáncer colorrectal: FR, sangre oculta/FIT 50-70a, colonoscopía por riesgo (Lynch/PAF, EII)",
   "Cáncer de piel: FR (UV, fototipos claros), fotoprotección, regla ABCDE, derivación a dermatología",
   "Cáncer infantil (0-17a): signos de alarma, referencia inmediata ≤72h a centro oncológico 3er nivel"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "DETECCIóN TEMPRANA DE CáNCER INFANTIL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/U1BDWnFZOGs0YUNLVXAvMS8vRExFQT09"
   },
   {
    "titulo": "PREVENCIóN Y CONTROL DE CÁNCER",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/WkFIMkpIQkthcDFGSEJVVjlvZmpDdz09"
   },
   {
    "titulo": "Prevención y control de enfermedades raras y huérfanas",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/Qi82dFNoa21aL0pDYWtjOWNWaHBFQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "CI §2.8 Prevención y control del Cáncer (factores de riesgo, tamizaje) + §Sub-área 8B Detección temprana de cáncer infantil"
  },
  "soloTheomed": [
   "Cáncer infantil con sección propia (8B) y referencia a pediatría",
   "Tamizaje integrado a paquetes por curso de vida"
  ],
  "soloLopez": [
   "Tamizaje por edad muy tabulado (DM-VPH 30-49a, IVAA, PAP 25-29/50-64; mama ECM/mamografía; próstata PSA 50-75a; colon FIT 50-70a) + regla ABCDE piel + referencia ≤72h infantil"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-2": {
  "tier": "ALTA",
  "vueltas": 4,
  "min": 70,
  "qxN": 1,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: paquete cuidado integral del niño (CRED) 5/400 (~1.25%/examen). Forecast v2: watch-list de emergentes. Compendio le dedica MUCHO espacio (el más extenso de los paquetes por curso de vida). Núcleo: periodicidad de controles CRED por edad, instrumentos de tamizaje (EDI, M-CHAT, PPSC/PSC17), valoración nutricional antropométrica.",
  "guidance": "Ver los 2 videos QX: 'PAQUETE DEL CUIDADO INTEGRAL DE SALUD DEL NIÑO - CRED' y 'CRED - ACTUALIZACIÓN' (esta trae cambios recientes, importante). Theomed: 2 sesiones de CRED/niño. Foco viñeta: qué instrumento de tamizaje según edad (M-CHAT 24m, EDI, Huanca), interpretar resultado EDI (verde/amarillo/rojo→conducta), periodicidad de controles, indicadores antropométricos por grupo.",
  "gaps": [
   "Tablas de valoración nutricional (puntos de corte P/T, T/E en DS) y las tablas de PHQ-9/PPSC son imágenes → memorizar puntos de corte del PDF",
   "El calendario exacto de periodicidad CRED (número de controles por rango) está parcialmente en tablas-imagen → verificar del PDF"
  ],
  "temario": [
   "Definiciones (crecimiento vs desarrollo), población objetivo (0-11a11m29d), instrumentos (Libreta CIS niña/niño, HIS, FUA)",
   "Componentes del proceso: valoración, diagnóstico, intervención, seguimiento",
   "Detección de trastornos mentales/psicosociales en cuidador (PHQ-9, AUDIT-C) y en niño (PPSC preescolar, PSC17 escolar); detección de violencia (Directiva 155-2024)",
   "Vigilancia y tamizaje del desarrollo: 0-36m Test Huanca; 4-11a Lista habilidades; tamizaje EDI (1-60m) con ejes verde/amarillo/rojo",
   "TEA: M-CHAT-R/F universal a los 24m",
   "Valoración nutricional antropométrica (P/E, P/T, T/E, IMC/E, PC/E), posición de medición, patrones OMS, clasificación estado nutricional",
   "Intervención: consejería en 5 momentos, temas prioritarios por edad (LME, alimentación complementaria, Kit Buen Crecimiento, suplementación, salud bucal)",
   "Atención Temprana del Desarrollo (ATD), seguimiento (modalidad fija/móvil), periodicidad CRED por edad (0-28d:3, 29d-11m:7, 12m-4a según edad, 5-11a:1/año)",
   "Suplementación de hierro y Vitamina A dentro de CRED; descarte parasitosis anual"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "PAQUETE DEL CUIDADO INTEGRAL DE SALUD DEL NIñO - CRED",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/cUNBWXFqeVNSM21CT2VLdXVyOVRLZz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "CI Sub-Área 3 Paquete de Cuidado Integral del Niño: Control CRED (definición, frecuencia por edad, total controles NTS), tamizaje, valoración nutricional, consejería 5 momentos, esquema vacunación <11a"
  },
  "soloTheomed": [
   "Frecuencia de controles CRED por grupo de edad en tabla con TOTAL de controles del esquema — cierra el gap de calendario que en López era imagen",
   "Consejería en 5 momentos y situación del EESS→acción del profesional"
  ],
  "soloLopez": [
   "Instrumentos de tamizaje del desarrollo más listados (Test Huanca 0-36m, EDI verde/amarillo/rojo, M-CHAT 24m, PPSC/PSC17), puntos de corte antropométricos P/T T/E en DS"
  ],
  "gapAmbos": [
   "Tablas antropométricas con puntos de corte exactos — imágenes en ambos → memorizar del PDF"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-5": {
  "tier": "ALTA",
  "vueltas": 4,
  "min": 70,
  "qxN": 10,
  "theomedN": 54,
  "extenso": true,
  "freq": "QX Tendencias: MCI definición 3 + atención por curso de vida 5 + adolescente 4 + joven 1 = ~13/400 (~3.25%/examen). Forecast v2: no listado como crítico pero volumen apreciable. Núcleo: APS (Alma-Ata/atributos), evolución MAIS→MAIS-BFC→MCI 2020, paquetes por etapa de vida, niveles de atención/RIS.",
  "guidance": "Es el código con MÁS videos QX (19) pero muchos son transversales/relleno. PRIORIZAR: 'MCI - DEFINICIÓN DEL MODELO', 'MCI - PRESTACIÓN', 'MCI - POLÍTICA NACIONAL 2030', 'ATENCIÓN INTEGRAL DE SALUD POR CURSO DE VIDA', 'ATENCIÓN PRIMARIA DE SALUD (APS)', 'ATENCIÓN CENTRADA EN LA PERSONA'. Ver aparte los de intoxicaciones/metales/IAAS/dengue (se cruzan con I-4/otros). NO ver los 19 en 1ª vuelta. Theomed: 2 sesiones MCI/APS. Foco viñeta: evolución del modelo (MAIS→MCI), atributos APS, qué paquete por etapa de vida.",
  "gaps": [],
  "temario": [
   "APS: definición Alma-Ata 1978, APS renovada (Montevideo 2005), atributos esenciales (primer contacto, longitudinalidad, integralidad, coordinación), principios",
   "Evolución del modelo: MAIS 2003 → MAIS-BFC 2011 → MCI 2020 (organización por curso de vida)",
   "MCI 2020: enfoque, componentes (organización, gestión, provisión, financiamiento), implementación (MINSA/DIRIS/DIRESA/EESS), niveles de atención (1°/2°/3°), redes/RIS/telesalud",
   "Paquete de salud del ADOLESCENTE (12-17a): tamizaje biopsicosocial, Tanner, paquetes básico/completo/especializado por nivel, evaluación integral (nutricional, RCV, agudeza visual/auditiva, físico-postural), tamizaje adicciones/violencia/depresión",
   "Paquete del JOVEN (18-29a): plan de atención integral, 3 dimensiones (física/psicosocial/sexual-reproductiva), mínimo 7 sesiones/año, instrumentos (CISPA/ESP/SRQ/AUDIT/VBG)",
   "Paquete del ADULTO (30-59a): captación/admisión/triaje, paquete priorizado (FR, tamizaje cánceres, salud mental) y completo",
   "Enfermedades raras/huérfanas (7 del tamizaje neonatal); exposición a metales pesados (As/Cd/Hg/Pb); intoxicaciones (organofosforados SLUDGE, cáusticos); IAAS; zoonosis/metaxénicas (cruza con I-4)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "Atención centrada en la persona (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09/NC95Y3RVNk1JcnlEVzkvWDB3V1FtZz09"
   },
   {
    "titulo": "INTOXICACIONES",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/Ty9xejUvQnlvcWU2a0ZhZnZGK2JHdz09"
   },
   {
    "titulo": "MCI - DEFINICIóN DEL MODELO",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/T3gwQk1ZR1d2T1lTSFdCbEsyY1N6Zz09"
   },
   {
    "titulo": "MCI - PRESTACIóN",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/dGJqUkZvMTUyY1Z5R2w2Vld0aWZVQT09"
   },
   {
    "titulo": "ATENCIóN PRIMARIA DE SALUD (APS)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/MDZKTlFqYUt0VzZkL0xrc0U5SitvZz09"
   },
   {
    "titulo": "ATENCIóN CENTRADA EN LA PERSONA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/bEJJZFE1Q3BmdlRkWklka0JaOG13QT09"
   },
   {
    "titulo": "Paquete básico de cuidado para el adolescente",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/K1g3cU8zNFlPMnh5Tks1TzNhYndodz09"
   },
   {
    "titulo": "Paquete básico del cuidado integral del joven",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/Zkd3MXZEdkxTbnVPOWlucDBOaHBrZz09"
   },
   {
    "titulo": "MCI - política nacional multisectorial de salud al 2030",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/N05xTG1xL1A0K3hsajZld25DVitlZz09"
   },
   {
    "titulo": "Exámenes auxiliares y de apoyo al diagnóstico",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/eWpoTzNNTXVFRDYrdlR3N3lrb1lkQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "CI §2.1 APS + §2.2 MCI (RM 030-2020), Sub-Áreas 3-6 paquetes por curso de vida (niño/adolescente/joven/adulto/CISPA) + §2.18 Tamizaje Neonatal enfermedades raras (MINSA 2025) + §2.19 Metales pesados + §2.20 IAAS"
  },
  "soloTheomed": [
   "Tamizaje Neonatal enfermedades raras/huérfanas con norma MINSA 2025 (sección propia §2.18)",
   "IAAS con NTS propia (§2.20)",
   "Vigilancia de metales pesados NTS (§2.19)",
   "Etapas del curso de vida con la denominación oficial 'Adulto Joven' y trampas de examen señaladas"
  ],
  "soloLopez": [
   "Evolución del modelo MAIS 2003→MAIS-BFC 2011→MCI 2020 y atributos APS (Montevideo 2005) más explícitos",
   "Intoxicaciones (organofosforados SLUDGE, cáusticos) detalladas"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-9": {
  "tier": "MEDIA",
  "vueltas": 4,
  "min": 55,
  "qxN": 1,
  "theomedN": 54,
  "extenso": false,
  "freq": "QX Tendencias: cuidados salud mental 3/400 (~0.75%/examen). Forecast v2: II-9 ~3-4% (banda 2-6), ALZA, EMERGENTE — DOBLE FICHA MINSA nueva es señal de material adelantada. Núcleo: tamizaje salud mental (AUDIT-C/PHQ-9/SRQ) y referencia, criterios de episodio depresivo, trastornos del ánimo.",
  "guidance": "Ver el único video QX 'CUIDADOS DE LA SALUD MENTAL' completo. Dada la doble ficha MINSA nueva (señal de que va a caer), reforzar con 1-2 sesiones Theomed de salud mental. Foco viñeta: qué instrumento de tamizaje (PHQ-9/AUDIT-C), criterios diagnósticos de depresión mayor vs distimia vs bipolar, y conducta de referencia.",
  "gaps": [
   "El manejo/tratamiento de trastornos mentales (fármacos, cuándo referir) es escueto en el compendio → complementar con el video QX y la doble ficha MINSA de salud mental (gestantes/comunitaria)",
   "Modelo de salud mental comunitaria (centros de salud mental comunitarios) no está en este bloque del compendio (aparece en I-11/I-12) → verificar"
  ],
  "temario": [
   "Trastornos del estado de ánimo: Depresión mayor (≥2 sem, ≥5 síntomas, ánimo deprimido/anhedonia obligatorio)",
   "Distimia (≥2 años, depresión leve crónica), criterios",
   "Trastorno bipolar I (≥1 episodio maníaco ≥1 sem, criterios), bipolar II (hipomanía+depresión), hipomanía (≥4 días)",
   "Instrumentos de tamizaje transversales (PHQ-9 depresión, AUDIT-C/AUDIT alcohol, SRQ, ESP) aplicados en CRED/adolescente/joven/adulto",
   "Detección de violencia (cruza con instrumentos de Directiva 155-2024)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "CUIDADOS DE LA SALUD MENTAL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/UmN3RDFMeDVObjFUdGN6TmJvTVBGZz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "sí",
   "theomedManual": "CI §2.7 Cuidado de Salud Mental en el Primer Nivel de Atención (tamizaje, criterios, referencia)"
  },
  "soloTheomed": [
   "Manejo/referencia en primer nivel desarrollado — López era escueto en tratamiento",
   "Detección de violencia integrada al tamizaje de salud mental"
  ],
  "soloLopez": [
   "Criterios diagnósticos formales de depresión mayor/distimia/bipolar I-II/hipomanía más explícitos",
   "Instrumentos PHQ-9/AUDIT-C/SRQ mapeados por etapa de vida"
  ],
  "gapAmbos": [
   "Modelo de salud mental comunitaria (CSMC) — en SP §2.13 de Theomed pero disperso; verificar"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-12": {
  "tier": "MEDIA",
  "vueltas": 3,
  "min": 35,
  "qxN": 1,
  "theomedN": 54,
  "extenso": false,
  "freq": "QX Tendencias: medidas preventivas salud bucal 2/400 (~0.5%/examen). Forecast v2: no destacado. Baja-media frecuencia, tema acotado. Núcleo: técnica/frecuencia de cepillado por edad, flúor por edad, flúor barniz/sellantes.",
  "guidance": "Ver el único video QX 'MEDIDAS PREVENTIVAS EN SALUD BUCAL' (1 pasada suficiente). Opcional 1 sesión Theomed si sobra tiempo. Es tema de bajo rendimiento — no invertir de más. Foco viñeta: concentración de flúor por edad, cantidad de pasta, cuándo inicia cepillado/hilo dental, flúor barniz cada 6 meses.",
  "gaps": [],
  "temario": [
   "Inicio de higiene oral (primeros 6 meses, gasa) e inicio de cepillado (erupción 1er diente ~6m)",
   "Pasta dental por edad (<6a: 250-550 ppm; ≥6a: 1100-1500 ppm; cantidad = lenteja) y solo si sabe escupir (>2a)",
   "Frecuencia (mín 3×/día), duración (2 min), responsable (padres hasta 6a), características del cepillo, cambio cada 3m",
   "Técnica de cepillado por edad (<8a 90° circular; ≥8a 45° diente-encía), limpieza de lengua, hilo dental (desde 4a)",
   "Visita al odontólogo (desde 1er año, 1×/año), flúor barniz cada 6m, sellantes (muelas permanentes), sal fluorada",
   "Relación con otras enfermedades (diabetes, CV, neumonía, parto prematuro), importancia dientes temporales"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [
   {
    "titulo": "MEDIDAS PREVENTIVAS EN SALUD BUCAL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/Ly85ek05a21XdXlwNmVpNkNhMzFsUT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "CI §2.21 Medidas Preventivas de Salud Bucal + §1.2/1.5 atención estomatológica a personas con discapacidad"
  },
  "soloTheomed": [
   "Atención estomatológica a personas con discapacidad (sección extra)"
  ],
  "soloLopez": [
   "Flúor por edad (ppm), técnica de cepillado por edad (90°/45°), hilo dental desde 4a, flúor barniz cada 6m tabulados"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "II-13": {
  "tier": "BAJA",
  "vueltas": 2,
  "min": 30,
  "qxN": 0,
  "theomedN": 54,
  "extenso": false,
  "freq": "NO aparece en la taxonomía QX Tendencias de subtemas de CI (0 conteo directo; se cruza con tamizajes de CRED/adolescente/adulto). Forecast v2: no listado. Baja frecuencia. Núcleo: umbrales de agudeza visual para referencia por grupo de edad, tamizaje neonatal auditivo/visual.",
  "guidance": "No hay video QX específico. Estudiar directo del compendio López (media página, pág 55): memorizar los umbrales de agudeza visual de referencia por edad (≤20/50 en niños, ≤20/40 en adultos <49a, ≤20/70 catarata ≥50a) y el tamizaje neonatal auditivo/visual. Opcional: 1 barrido rápido en Theomed si aparece dentro de curso de vida. Tema de bajo rendimiento — 1-2 pasadas y a memoria.",
  "gaps": [
   "SIN video QX propio de salud ocular/oído → leer directamente del compendio López (pág 55) los umbrales de AV para referencia por edad; complementar con la sección de tamizaje neonatal del compendio y, si hace falta, buscar en Theomed dentro de las sesiones de curso de vida",
   "No hay ficha MINSA dedicada exclusiva → apoyarse en el compendio y en los tamizajes ya vistos en CRED/adolescente/adulto/AM"
  ],
  "temario": [
   "Salud ocular niños 3-11a y adolescentes: tamizaje errores refractivos (miopía/hipermetropía/astigmatismo) 1×/año, AV monocular ≤20/50 → referencia",
   "Adultos ≥50a: tamizaje catarata con oclusor estenopeico, AV ≤20/70 → referencia",
   "Jóvenes/adultos hasta 49a: normal 20/20-20/30, referir si AV ≤20/40",
   "Tamizaje neonatal (dentro de enfermedades raras/tamizaje): visual (reflejo rojo antes del alta), auditivo (otoemisiones acústicas 24-48h, máx 30d), catarata e hipoacusia congénitas",
   "Evaluación agudeza auditiva en adolescente (voz baja, tarjetas)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=3",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · CI",
   "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
  },
  "videosExtra": [],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "sí",
   "theomedManual": "CI: tamizaje de agudeza visual (Snellen, monocular 6m) en paquetes de niño/adolescente/adulto + salud ocular con oclusor estenopeico en adulto mayor"
  },
  "soloTheomed": [
   "Agudeza visual Snellen integrada a los paquetes por curso de vida con umbrales — López lo tenía solo en media página (pág 55)",
   "Tamizaje AM con oclusor estenopeico"
  ],
  "soloLopez": [
   "Umbrales de referencia por edad (≤20/50 niños, ≤20/40 adultos, ≤20/70 catarata) y tamizaje neonatal auditivo (otoemisiones 24-48h) más explícitos en un solo lugar"
  ],
  "gapAmbos": [
   "Detalle fino de tamizaje auditivo neonatal — cruce ligero, ninguno lo profundiza"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Cuidado I",
    "url": "https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §3) · Videoclases por área · Cui",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=3"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "III-5": {
  "tier": "CRÍTICA",
  "vueltas": 6,
  "min": 90,
  "qxN": 6,
  "theomedN": 11,
  "extenso": true,
  "freq": "QX Tendencias: 26/48 de todo el área III (pertinencia cultural 7 + comunicación/diálogo 5 + parto vertical 5 + estigma 3 + migrantes 2 + med. tradicional 2 + diversidad 1 + etnocentrismo 1) ≈ 5%/examen. Forecast v2 lo lista como CRÍTICO (tendencia estable). Es el imán #1 del área, formato viñeta pura.",
  "guidance": "Mirar los 5 videos QX del código (los tienes todos): PRIORIDAD 1 = 'ATENCIÓN EN SALUD CON ENFOQUE INTERCULTURAL Y PERTINENCIA CULTURAL' (7 conteos QX, es lo que más cae) y 'COMUNICACIÓN Y DIÁLOGO INTERCULTURAL EN SALUD' (5 conteos). PRIORIDAD 2 = 'PROMOCIÓN DEL PARTO VERTICAL' (cruza con II-1, doble rentabilidad) y 'MEDICINA TRADICIONAL, COMPLEMENTARIA Y ALTERNATIVA'. PRIORIDAD 3 = 'IDENTIDAD CULTURAL Y AUTOPERCEPCIÓN ÉTNICA' (repaso rápido). De Theomed: la sección tiene 11 videos que sirven a TODA el área III; para III-5 basta ver 2-3 (el de interculturalidad y el de parto vertical) — el resto de los 11 se reparte con III-1/III-8. Practicar 8-10 viñetas tipo 'gestante quechua rechaza posición horizontal / paciente usa hierbero'.",
  "gaps": [],
  "temario": [
   "Interculturalidad: relación de respeto (definición)",
   "Agente de medicina tradicional/terapeuta tradicional (huesero, partera, hierbero, curandero, chamán, vegetalista)",
   "4 Principios de la interculturalidad (diversidad, igualdad/equidad, diálogo intercultural, no discriminación)",
   "Cosmovisión",
   "Diálogo intercultural en salud (articulación biomédico↔tradicional)",
   "Etnocentrismo vs relativismo cultural vs asimilación vs aculturación vs conflicto intercultural",
   "Atención con pertinencia cultural: 4 dimensiones (gestión de calidad, revaloración med. tradicional, RRHH interculturales, participación ciudadana)",
   "Prioridades A/B/C para EESS con pertinencia cultural (amazónica / quechua-aymara-afro / resto; plazos 3 y 5 años)",
   "EESS con pertinencia cultural = ≥80% de criterios",
   "Parto vertical (posiciones: parada/sentada/rodillas/cuclillas; masoterapia; musicoterapia)",
   "Medicina tradicional vs complementaria vs alternativa"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=4",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · Ética",
   "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
  },
  "videosExtra": [
   {
    "titulo": "Promoción del parto vertical (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/Q2dwTHZQaERqZTlrS3FvWVR0ZWw2Zz09"
   },
   {
    "titulo": "MEDICINA TRADICIONAL, COMPLEMENTARIA Y ALTERNATIVA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/MTdveWRFRDVyYndtRlZxN1ZuWjRuUT09"
   },
   {
    "titulo": "PROMOCIóN DEL PARTO VERTICAL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/eWpWbTNwdTlDc2ZCRDlOdzdVSXAzZz09"
   },
   {
    "titulo": "COMUNICACIóN Y DIáLOGO INTERCULTURAL EN SALUD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/QXdDcEpqYXFsenkrbUw3V2RPRnhSUT09"
   },
   {
    "titulo": "IDENTIDAD CULTURAL Y AUTOPERCEPCIóN éTNICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/Nm02bTZmbXRhSjVYZHRaK0NlaTB1UT09"
   },
   {
    "titulo": "ATENCIóN EN SALUD CON ENFOQUE INTERCULTURAL Y PERTINENCIA CULTURAL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/eXVyRm0xd0piZkVFb3RpTFFzZG9zUT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "ÉTICA Sub-Área 2 Interculturalidad: §III Atención con enfoque intercultural y pertinencia cultural (Directiva 261-2019), §IV Medicina tradicional/complementaria/alternativa, Promoción del Parto Vertical, Acceso a población migrante, Comunicación y diálogo intercultural, Identidad cultural"
  },
  "soloTheomed": [
   "Comunicación y diálogo intercultural con los 3 momentos desarrollados",
   "Casas de Espera Materna, Directiva 261-MINSA-2019 citada",
   "Acceso a población migrante con impacto en salud mental (TEPT/xenofobia)"
  ],
  "soloLopez": [
   "4 dimensiones de pertinencia cultural y prioridades A/B/C con plazos (3/5 años) y criterio ≥80% más tabulados",
   "Etnocentrismo vs relativismo vs aculturación listados"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Ética e I",
    "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §4) · Videoclases por área · Éti",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=4"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "III-2": {
  "tier": "ALTA",
  "vueltas": 4,
  "min": 50,
  "qxN": 2,
  "theomedN": 11,
  "extenso": false,
  "freq": "QX Tendencias: 'Código de ética y deontología profesional' = 9 conteos (el sub-tema #1 del cluster ética-bioética del área) ≈ 2.25%/examen. Estable. Cruza con III-8.",
  "guidance": "1 video QX: 'CÓDIGO DE ÉTICA Y DEONTOLOGÍA PROFESIONAL' — verlo completo, es alto rendimiento (9 conteos). Foco memorístico en los 4 MODELOS de relación médico-paciente (distinguir deliberativo de interpretativo es la trampa clásica de viñeta) y en distinguir CMP (colegio, deontología profesional) de la Ley 27815 (función pública, III-8). De Theomed no hace falta video dedicado; se cubre con el de ética general que compartes con III-1/III-8.",
  "gaps": [],
  "temario": [
   "Código de Ética y Deontología del CMP: instrumento normativo interno obligatorio para médicos colegiados",
   "Fines: orientar/normar/regular el ejercicio médico",
   "Ejercicio con respeto a la dignidad humana, integridad moral, responsabilidad profesional, compromiso con la colectividad",
   "Relación médico-paciente: 4 modelos (paternalista, informativo, interpretativo, deliberativo)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=4",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · Ética",
   "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
  },
  "videosExtra": [
   {
    "titulo": "CóDIGO DE éTICA Y DEóNTOLOGIA PROFESIONAL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/QWhZb0RQemJoWWlpSW92bnNMK0xnZz09"
   },
   {
    "titulo": "Aspectos legales y forenses en medicina",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/MVQ3Q3B2WEhweFdKNTE1VmN6K3ZuQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "parcial",
   "theomedManual": "ÉTICA §I Código de Ética y Deontología Profesional (confidencialidad, consentimiento, relación terapéutica, responsabilidad profesional)"
  },
  "soloTheomed": [
   "Confidencialidad y relación terapéutica desarrolladas dentro del código deontológico"
  ],
  "soloLopez": [
   "Los 4 MODELOS de relación médico-paciente (paternalista/informativo/interpretativo/deliberativo) — clave de viñeta; en Theomed el código deontológico CMP no los desglosa como López",
   "Fines del Código CMP explícitos"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Ética e I",
    "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §4) · Videoclases por área · Éti",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=4"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "III-8": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 70,
  "qxN": 2,
  "theomedN": 11,
  "extenso": true,
  "freq": "QX Tendencias: 'Ética e integridad y ética en la función pública' = 7 conteos ≈ 1.75%/examen. Forecast v2 lo da como EMERGENTE al alza (confidencialidad VIH/secreto profesional; HC archivo/acceso) con banda 2-6%.",
  "guidance": "2 videos QX (los tienes): 'ÉTICA E INTEGRIDAD Y ÉTICA EN LA FUNCIÓN PÚBLICA' (prioritario) y 'ÉTICA E INTEGRIDAD EN SALUD'. Ver ambos: son la base de las viñetas de confidencialidad (secreto profesional en VIH/ITS — cruza con II-11) y de conflicto de intereses. Memorizar el triplete Principios(8)/Deberes(6)/Prohibiciones(5) de la Ley 27815 — es un clásico de pregunta de encasillar. De Theomed usar el video de ética/integridad de la sección de 11.",
  "gaps": [],
  "temario": [
   "Ética en la función pública: trato digno y humanización (respeto derechos del paciente, atención centrada en la persona, evita paternalismo, empatía/escucha activa)",
   "Confidencialidad y manejo de la información (discreción, evitar divulgación indebida, compartir solo con autorizados, protección de datos sensibles)",
   "8 Principios (respeto, probidad, eficiencia, idoneidad, veracidad, lealtad/obediencia, justicia/equidad, lealtad al Estado de Derecho)",
   "6 Deberes (neutralidad, transparencia, discreción, ejercicio adecuado del cargo, uso adecuado de bienes del Estado, responsabilidad)",
   "5 Prohibiciones (conflicto de intereses, ventajas indebidas, proselitismo político, mal uso de información privilegiada, presión/amenazas/acoso)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=4",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · Ética",
   "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
  },
  "videosExtra": [
   {
    "titulo": "Ética e integridad en salud (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/MTY3bmovRmxYQlpRM1k2d0VBeXRGUT09"
   },
   {
    "titulo": "ÉTICA E INTEGRIDAD Y éTICA EN LA FUNCIóN PúBLICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/VGxmUjROVFlDNGlHZ09vVkwzNVV5Zz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "ÉTICA §I.b Ética en la función pública (aspectos clave, confidencialidad art.25 LGS, casos de excepción del secreto médico)"
  },
  "soloTheomed": [
   "Casos de excepción del secreto profesional listados (consentimiento escrito, autoridad judicial, fines académicos, familiares, declaración obligatoria) — muy preguntable",
   "Carácter reservado de la información (art.25 Ley 26842)"
  ],
  "soloLopez": [
   "Triplete Principios(8)/Deberes(6)/Prohibiciones(5) de la Ley 27815 tabulado para encasillar"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Ética e I",
    "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §4) · Videoclases por área · Éti",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=4"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "III-1": {
  "tier": "ALTA",
  "vueltas": 4,
  "min": 55,
  "qxN": 2,
  "theomedN": 11,
  "extenso": true,
  "freq": "QX Tendencias: 'Principios y fundamentos de la ética' = 3 conteos ≈ 0.75%/examen (baja frecuencia pura, pero los 4 principios de Beauchamp son base transversal de muchas viñetas éticas). Forecast: no crítico.",
  "guidance": "2 videos QX: 'PRINCIPIOS Y FUNDAMENTOS DE LA ÉTICA' y 'ÉTICA E INTERCULTURALIDAD'. Ver el 1º con atención; el compendio le dedica 2 páginas (extenso) PERO en formato viñeta ~90% lo que cae es aplicar los 4 principios de Beauchamp a un caso (ej. paciente rechaza transfusión = autonomía), NO la historia de Belmont/Tuskegee. Estudiar la aplicación, no las fechas. Distinguir bien beneficencia (hacer el bien) de no maleficencia (no dañar) — es la trampa recurrente. De Theomed 1 video de ética general basta.",
  "gaps": [],
  "temario": [
   "Informe Belmont (1978): 3 pilares — respeto por las personas/autonomía, beneficencia, justicia",
   "Hitos históricos: Código Núremberg 1947 (consentimiento voluntario), Declaración de Helsinki 1964 (revisión ética, beneficio>riesgo, protección de vulnerables), Estudio Tuskegee 1932-72, Comisión Nacional 1974",
   "Definiciones: Ética vs Moral vs Bioética vs Deontología",
   "4 Principios de Beauchamp & Childress: Autonomía, Justicia, Beneficencia, No maleficencia (con ejemplos)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=4",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · Ética",
   "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
  },
  "videosExtra": [
   {
    "titulo": "Principios y fundamentos de la ética y bioética (mapa conceptual)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/RDhxSldWZzVyU2cxZnVzTW0rUkJWQT09"
   },
   {
    "titulo": "PRINCIPIOS Y FUNDAMENTOS DE LA éTICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/M2laanF2bHc5d1Z4cW1wQjhieDJNQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "parcial",
   "theomedManual": "ÉTICA §I Principios y fundamentos de la ética y bioética (autonomía, beneficencia, no maleficencia, justicia; UNESCO 2005, Helsinki art.28 LGS)"
  },
  "soloTheomed": [
   "Fundamento en Declaración UNESCO 2005 y su reconocimiento por INS/MINSA",
   "Interdisciplinariedad de la bioética"
  ],
  "soloLopez": [
   "Hitos históricos completos (Código Núremberg 1947, Helsinki 1964, Tuskegee 1932-72, Belmont 1978, Comisión Nacional 1974) — Theomed los toca escuetos",
   "Beauchamp & Childress explícito y ejemplos de aplicación por principio"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Ética e I",
    "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §4) · Videoclases por área · Éti",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=4"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "III-9": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 60,
  "qxN": 1,
  "theomedN": 11,
  "extenso": true,
  "freq": "QX Tendencias: 'Derechos deberes de personas usuarias' = 3 conteos ≈ 0.75%/examen en el agregado, PERO el forecast v2 lo marca como el MAYOR MISS histórico del backtest (subestimado, se añadió al top/watch por HC/SUSALUD). Sesgo al alza.",
  "guidance": "1 video QX: 'DERECHOS DEBERES DE LAS PERSONAS USUARIAS DE LOS SERVICIOS DE SALUD' — verlo completo y darle 5 vueltas PESE a su bajo conteo, porque fue el mayor miss del backtest y el forecast lo re-priorizó (ángulo HC/quejas/SUSALUD). Foco viñeta: acceso a HC/epicrisis y su carácter reservado (cruza con III-8 confidencialidad y con V-7 gestión de HC), atención de emergencia sin condicionar pago, y los casos de CI por escrito (puente a III-3). El compendio pág 5-6 es la fuente literal — leerlo. Theomed: cubierto por el video general del área.",
  "gaps": [],
  "temario": [
   "Derechos: acceso a servicios (emergencia sin condicionar pago, libre elección, 2ª opinión)",
   "Acceso a la información (nombre del médico, info comprensible, condición experimental)",
   "Atención y recuperación (dignidad, sin discriminación, seguridad, muerte natural)",
   "Consentimiento informado (5 casos que exigen CI por escrito)",
   "Protección de derechos (denuncia/reclamo, reparación)",
   "Acceso a HC y epicrisis + carácter reservado de la HC",
   "10 Deberes del usuario (respeto al personal, cumplir indicaciones, info veraz, respetar turnos, autocuidado, uso adecuado de instalaciones, seguir flujograma, cumplir citas, usar canales de reclamo)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=4",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · Ética",
   "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
  },
  "videosExtra": [
   {
    "titulo": "DERECHOS DEBERES DE LAS PERSONAS USUARIAS DE LOS SERVICIOS DE SALUD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/YmtBcmFvdzlpeUpkVjNhUkh2aGovQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "ÉTICA §II Derechos y Deberes de los Usuarios de Servicios de Salud (Ley 26842 art.15, Ley 29414): atención, información, confidencialidad, participación, tratamiento, rehabilitación, no discriminación, 2ª opinión"
  },
  "soloTheomed": [
   "Derechos desglosados uno por uno (a-h) con base legal Ley 29414 — buena cobertura del ángulo HC/SUSALUD que era el mayor miss histórico"
  ],
  "soloLopez": [
   "10 Deberes del usuario y acceso a HC/epicrisis con carácter reservado; 5 casos de CI por escrito enlazados"
  ],
  "gapAmbos": [
   "Quejas/SUSALUD como proceso — ligero en ambos → normativa"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Ética e I",
    "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §4) · Videoclases por área · Éti",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=4"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "III-6+III-10": {
  "tier": "MEDIA",
  "vueltas": 3,
  "min": 45,
  "qxN": 3,
  "theomedN": 11,
  "extenso": false,
  "freq": "QX Tendencias: diversidad cultural 1 + estigma/discriminación 3 + migrantes 2 = ~6 conteos ≈ 1.5%/examen. Estable-bajo. Comparte imán con III-5 (a veces QX lo cuenta junto).",
  "guidance": "3 videos QX (los tienes): PRIORIDAD 'PREVENCIÓN DE LA ESTIGMA Y DISCRIMINACIÓN ÉTNICA, CULTURAL Y EN OTRAS POBLACIONES CLAVE Y VULNERABLES' (3 conteos, es lo que más cae del fusión) y 'ACCESO A LA ATENCIÓN EN SALUD DE LA POBLACIÓN MIGRANTE'. 'DIVERSIDAD CULTURAL, PROMOCIÓN DE LA INCLUSIÓN Y LA EQUIDAD' es repaso rápido. Clave memorística: distinguir poblaciones VULNERABLES vs CLAVE (las clave = mayor exposición a ITS/VIH: PVV, HSH, PID, TS, trans, PPL) — el compendio pág 8 lo lista. No sobre-invertir; conceptos de encasillar, no viñeta compleja. Theomed sin video dedicado extra.",
  "gaps": [],
  "temario": [
   "Diversidad cultural (pluralidad de grupos étnicos)",
   "Equidad (dar más a quien más necesita)",
   "Inclusión social",
   "Prevención del estigma y discriminación étnica-cultural",
   "Poblaciones étnico-culturales / en vulnerabilidad / clave (PVV, HSH, PPL, trans, TS)",
   "Acceso a la salud de población migrante",
   "Establecimiento con pertinencia cultural (criterios ≥80%)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=4",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · Ética",
   "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
  },
  "videosExtra": [
   {
    "titulo": "DIVERSIDAD CULTURAL, PROMOCIóN DE LA INCLUSIóN Y LA EQUIDAD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/blZEVlhLK2l2enQ3U2p4bjhWTGlyZz09"
   },
   {
    "titulo": "ACCESO A LA ATENCIóN EN SALUD DE LA POBLACIóN MIGRANTE",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/WnZCNkJFUnVoSlA1N2VCb1Q1SjF2QT09"
   },
   {
    "titulo": "PREVENCIóN DE LA ESTIGMA Y DISCRIMINACIóN éTNICA, CULTURAL, Y EN OTRAS POBLACIONES CLAVE Y VULNERABLES",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=/VHFTK0lNK296OUptdGJlVHc0eVpSZz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "sí",
   "theomedManual": "ÉTICA §II Diversidad cultural, promoción de la inclusión y la equidad + Acceso a población migrante + estigma/discriminación"
  },
  "soloTheomed": [
   "Diversidad cultural en Perú y promoción de la inclusión desarrolladas",
   "Impacto en salud mental del migrante (estrés/depresión/TEPT/xenofobia)"
  ],
  "soloLopez": [
   "Poblaciones VULNERABLES vs CLAVE listadas (PVV/HSH/PPL/trans/TS) y criterio EESS ≥80%"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Ética e I",
    "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §4) · Videoclases por área · Éti",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=4"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "III-3": {
  "tier": "MEDIA",
  "vueltas": 3,
  "min": 40,
  "qxN": 0,
  "theomedN": 11,
  "extenso": false,
  "freq": "Sin conteo propio en QX Tendencias (queda embebido en Derechos del usuario y en Bioética/autonomía). El forecast no lo prioriza, pero es tema clásico de viñeta ética (autonomía aplicada). Frecuencia estimada baja-media.",
  "guidance": "0 videos QX propios (gap). Estudiarlo dentro del video de III-9 'Derechos deberes de usuarios' (ahí aparece el CI) + leer literal el compendio pág 5 punto 21. Lo esencial para viñeta: MEMORIZAR los casos que EXIGEN CI por ESCRITO (cirugía/AQ, docencia con imágenes, investigación, negativa a tratamiento, cuidados paliativos) y la EXCEPCIÓN en emergencia. Es aplicación del principio de autonomía. Theomed: sin video específico; usar el de ética general. No requiere bloque largo, pero SÍ asegurar que no quede en blanco.",
  "gaps": [
   "Consentimiento informado sin video QX dedicado → cubrir con compendio pág 5 + Ley 26842 art.4 + Ley 29414; y con el video QX de III-9 (derechos del usuario) donde está embebido"
  ],
  "temario": [
   "CI por escrito obligatorio en: pruebas riesgosas / cirugía / anticoncepción quirúrgica; exploración-tratamiento-imágenes con fines docentes; antes de estudio de investigación; productos/procedimientos en investigación; negativa a recibir/continuar tratamiento (salvo riesgo vital o salud pública); cuidados paliativos",
   "Excepción en emergencia",
   "Vínculo con principio de autonomía (III-1) y derechos del usuario (III-9)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=4",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · Ética",
   "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
  },
  "videosExtra": [],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "sí",
   "theomedManual": "ÉTICA §I.b Consentimiento informado (Ley 29414, libre y voluntario) + casos que exigen CI por escrito + excepción de emergencia"
  },
  "soloTheomed": [
   "Consentimiento informado con base legal Ley 29414 desarrollado como sección — López lo tenía embebido en derechos del usuario",
   "Excepción en emergencia explícita"
  ],
  "soloLopez": [
   "Lista completa de los casos que EXIGEN CI por escrito (cirugía/AQ, docencia con imágenes, investigación, negativa a tratamiento, cuidados paliativos)"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Ética e I",
    "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §4) · Videoclases por área · Éti",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=4"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "III-4+III-7": {
  "tier": "MEDIA",
  "vueltas": 4,
  "min": 55,
  "qxN": 0,
  "theomedN": 11,
  "extenso": false,
  "freq": "Sin conteo en QX Tendencias del área III y SIN video QX. PERO el forecast v2 lo eleva a EMERGENTE en la watch-list: 'III-4 código violeta / kit de agresión sexual'. Riesgo de caer 1 viñeta de conducta ante víctima de violencia sexual. Frecuencia baja pero al alza y con alto impacto si cae.",
  "guidance": "0 videos QX (GAP DURO — es el punto más al descubierto del área). PRIORIDAD: buscar en Theomed (sección III, 11 videos) el/los que traten violencia/código violeta y verlos; complementar con Drive. Como el compendio NO lo cubre, dedicarle un bloque explícito de estudio de NORMATIVA: código violeta (protocolo de alerta ante violencia sexual en EESS), kit de emergencia RM 227-2019 (los 3 componentes y las ventanas de 72h AE / 72h profilaxis VIH / 120h), ficha de valoración de riesgo (Ley 30364), y obligación de notificar. Darle 4 vueltas pese a baja frecuencia porque es alto impacto y no lo estudiarás en ningún otro lado. Es la tarea de cobertura #1 del área III.",
  "gaps": [
   "Violencia de género/familiar y CÓDIGO VIOLETA: NO está en el compendio López NI hay video QX → cubrir por Theomed (sección área III, 11 videos) + Drive + normativa MINSA: RM 227-2019 (kit de emergencia para atención de violación sexual: anticoncepción de emergencia + profilaxis ITS/VIH + vacuna VHB, plazos 72h/120h), Ley 30364 (violencia contra la mujer, ficha de valoración de riesgo), Guía Técnica atención integral violencia. ",
   "Aborto y dilemas éticos: aborto terapéutico (Guía Nacional 2014, causales de salud de la gestante) — NO en compendio, leer en Drive/normativa."
  ],
  "temario": [
   "NO CUBIERTO en el compendio Dr López (el temario de López para el bloque III NO incluye violencia de género ni aborto/dilemas — es el hueco estructural del área)"
  ],
  "compendioUrl": "https://drive.google.com/file/d/1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN/view",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=4",
  "videoFallback": {
   "label": "Videoclases DR LOPEZ · Ética",
   "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
  },
  "videosExtra": [],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "no",
   "theomed": "sí",
   "theomedManual": "CI §6 Protocolo de Atención en Violencia Sexual (Ley 30364 + NTS MINSA) + Kit de Emergencia (Directiva Sanitaria 083-MINSA/2019: AOE + azitromicina + penicilina G benzatínica + vacuna DT + preservativos + PEP VIH) + ventanas de tiempo"
  },
  "soloTheomed": [
   "TODO el bloque de violencia sexual/CÓDIGO VIOLETA está en el manual de CI de Theomed — este era el GAP DURO de López (que NO lo cubre en absoluto)",
   "Kit de emergencia con contenido oficial y plazos (AOE <72h, PEP VIH <72h en I-4/hospitales, 28 días)",
   "Ley 30364, protocolo de atención inmediata, hombre víctima mismo protocolo"
  ],
  "soloLopez": [],
  "gapAmbos": [
   "Aborto terapéutico y dilemas éticos (causales, Guía Nacional 2014) — ni López ni el manual de ética/CI lo desarrollan → normativa MINSA",
   "Ficha de valoración de riesgo (Ley 30364) — parcial → normativa"
  ],
  "driveVideos": [
   {
    "label": "DR LOPEZ (Google Drive) · 🎬 Videoclases · Ética e I",
    "url": "https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §4) · Videoclases por área · Éti",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=4"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "IV-1+IV-2": {
  "tier": "MEDIA",
  "vueltas": 3,
  "min": 60,
  "qxN": 7,
  "theomedN": 7,
  "extenso": true,
  "freq": "Tendencias QX Investigación: 'Tipos de investigación y estudios descriptivos' 7 + 'Enfoques y métodos' 4 = 11/400 (≈2.75%/examen), es el sub-bloque más gordo de toda el área IV. Forecast v2: IV total piso 3-4% recency (colapso confirmado, IV=14 en 2024-II → 2-4 ahora). Es el ÚNICO código IV que rinde y el único compatible con viñeta ('describo un estudio → clasifícalo'). Escenario contingencia: si revierte a teoría, sube.",
  "guidance": "QX (8 videos del bloque Investigación): PRIORIZAR los 3 de diseño — 'TIPOS DE INVESTIGACIÓN Y ESTUDIOS DESCRIPTIVOS', 'ESTUDIOS ANALÍTICOS OBSERVACIONALES', 'ESTUDIOS ANALÍTICOS EXPERIMENTALES' (son el 100% de lo que cae en viñeta). Ver también 'ENFOQUES Y MÉTODOS' y 'CONCEPTOS BÁSICOS'. Saltar/acelerar 'ELABORACIÓN DEL PROYECTO' y 'VARIABLES' (bajo rendimiento en examen viñeta). Theomed: de los 7 de la sección IV, mirar 1-2 de clasificación de estudios a 1.5x como refuerzo, no los 7. Foco: entrenar reconocimiento 'me describen un estudio → nombro el diseño', no memorizar definiciones.",
  "gaps": [
   "Ninguno crítico: el compendio desarrolla TODA la clasificación de estudios en extenso (pág 12-15). Cubierto por QX (8 videos: conceptos, enfoques, tipos/descriptivos, analíticos observacionales, analíticos experimentales, proyecto, variables) + Theomed IV."
  ],
  "temario": [
   "Conceptos básicos de investigación (observación→organización→sistematización→experimentación)",
   "Método científico: características (sistemático/organizado/objetivo) y 7 etapas (observación, planteamiento, hipótesis, experimentación, análisis, conclusión, comunicación)",
   "Enfoque: cuantitativo / cualitativo / mixto (con instrumentos propios de cada uno)",
   "Clasificación SEGÚN FUENTE: primarios vs secundarios (revisión sistemática, meta-análisis, base de datos)",
   "Clasificación SEGÚN INTERVENCIÓN: observacionales (descriptivos: reporte/serie de casos, ecológico; analíticos: cohortes, casos-controles) vs experimentales (ECA aleatorizado, no aleatorizado, no controlado, ensayo comunitario)",
   "Clasificación SEGÚN TEMPORALIDAD: transversal vs longitudinal (prospectivo/retrospectivo); observación cohorte prospectiva vs casos-controles retrospectivo y casos-controles anidados en cohorte",
   "Pirámide de la evidencia científica (base: opinión experto/animal/serie de casos → tope: ECA, RS, meta-análisis)",
   "Matriz de consistencia (coherencia problema-objetivos-hipótesis-variables-metodología)",
   "Hipótesis H0/H1 (cuándo aplica: cuantitativo que contrasta, no en descriptivo/cualitativo)"
  ],
  "compendioUrl": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=5",
  "videoFallback": {
   "label": "Videoclases GALENO",
   "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8"
  },
  "videosExtra": [
   {
    "titulo": "TIPOS DE INVESTIGACIóN Y ESTUDIOS DESCRIPTIVOS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/cmgwVEgzZis2dy9ZeVJXaW1LRWlwdz09"
   },
   {
    "titulo": "ESTUDIOS ANALíTICOS OBSERVACIONALES",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/b1dxM3ZVQ3dUMWxDaTZmODFGdURMUT09"
   },
   {
    "titulo": "ESTUDIOS ANALíTICOS EXPERIMENTALES",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/Y3dnejFhODZGY285M3BXNC84aVY1dz09"
   },
   {
    "titulo": "CONCEPTOS BáSICOS DE INVESTIGACIóN",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/YlpqaXRxTGh5N0Y4czhDa1dlUElodz09"
   },
   {
    "titulo": "ENFOQUES Y MéTODOS DE INVESTIGACIóN",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/eVNuMTRxM3lISDFuMEhldDNFUFdJZz09"
   },
   {
    "titulo": "ELABORACIóN DEL PROYECTO DE INVESTIGACIóN",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/VU9wZTN0R1BKekhQNUNOdFI4bktQZz09"
   },
   {
    "titulo": "Instrumentos de recolección de datos y validación",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/aUgrNzNRMU9DcUR6T1RUT1h3aVNpQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "INV Sub-Área 1 Conceptos y Clasificación: §2.1 Enfoques, §2.2 Tipos, §3.1 Clasificación general, §4 Descriptivos, §5 Analíticos observacionales (cohorte/casos-controles), §6 Experimentales (ECA, fases, tipos de ciego)"
  },
  "soloTheomed": [
   "Fases de los ensayos clínicos (I-IV) y tipos de ciego desarrollados",
   "Ventajas/desventajas y análisis de datos por tipo de estudio (secciones propias)"
  ],
  "soloLopez": [
   "Pirámide de la evidencia, matriz de consistencia e hipótesis H0/H1 más explícitos; clasificación por fuente/intervención/temporalidad tabulada"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases (índice) — ",
    "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §5) · Videoclases por área · Inv",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=5"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "IV-3+IV-5": {
  "tier": "BAJA",
  "vueltas": 2,
  "min": 30,
  "qxN": 1,
  "theomedN": 7,
  "extenso": false,
  "freq": "Casi nula dentro de IV en Tendencias QX (no figura como sub-tema de Investigación; las 'pruebas diagnósticas' caen 4/400 pero QX las clasifica en Salud Pública I-6, no en IV). Forecast v2: cálculo/pruebas diagnósticas 'prácticamente extinto' bajo formato viñeta. BAJA salvo escenario de contingencia.",
  "guidance": "NO hacer deep-work. QX 1 video ('Instrumentos de recolección y validación') a 1.5x para validez/confiabilidad de instrumentos. Para S/E/VPP/VPN: 1 pasada al video QX 'PRUEBAS DIAGNÓSTICAS' del bloque Salud Pública (I-6) — solo memorizar la tabla 2x2 y qué prueba usar para tamizaje (alta S) vs confirmación (alta E). Theomed IV: opcional 1 video. Nivel objetivo: reconocer definición, no calcular a mano.",
  "gaps": [
   "GAP REAL: Sensibilidad/Especificidad/VPP/VPN/Likelihood ratio/curva ROC NO están en el compendio López-Investigación → estudiarlas por QX bloque Salud Pública 'PRUEBAS DIAGNÓSTICAS' (I-6) y por Theomed IV. Tamizaje (criterios de Wilson-Jungner, cáncer cérvix/mama) → cruzarlo con II-10 (cáncer) donde sí rinde.",
   "El único video QX de este código ('INSTRUMENTOS DE RECOLECCIÓN DE DATOS Y VALIDACIÓN') cubre validación de instrumentos, NO pruebas diagnósticas."
  ],
  "temario": [
   "El compendio López de Investigación NO desarrolla pruebas diagnósticas (S/E/VPP/VPN/LR/ROC) — solo toca 'validación de instrumentos' (validez de contenido/criterio/constructo; confiabilidad test-retest/Alfa de Cronbach ≥0.7/interevaluador)",
   "Características de un buen instrumento (validez, confiabilidad, objetividad, precisión, claridad, factibilidad, estandarización, adecuación al contexto)"
  ],
  "compendioUrl": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=5",
  "videoFallback": {
   "label": "Videoclases GALENO",
   "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8"
  },
  "videosExtra": [],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "no",
   "theomed": "no",
   "theomedManual": "INV toca validación de instrumentos (Alfa de Cronbach/validez/confiabilidad) pero NO pruebas diagnósticas 2x2 como métrica"
  },
  "soloTheomed": [
   "Validación de instrumentos (validez de contenido/criterio/constructo, confiabilidad) desarrollada"
  ],
  "soloLopez": [
   "Características de un buen instrumento listadas; muestreo (que sí rinde) — ver IV-4"
  ],
  "gapAmbos": [
   "Sensibilidad/Especificidad/VPP/VPN/LR/curva ROC como cálculo diagnóstico — NINGUNO de los manuales de investigación lo desarrolla → estudiar por SP (Theomed §1.7 Pruebas Diagnósticas o QX I-6). Tamizaje Wilson-Jungner → cruzar con II-10"
  ],
  "driveVideos": [
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases (índice) — ",
    "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §5) · Videoclases por área · Inv",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=5"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "IV-4": {
  "tier": "BAJA",
  "vueltas": 3,
  "min": 40,
  "qxN": 0,
  "theomedN": 7,
  "extenso": false,
  "freq": "Tendencias QX: 'Muestreo' 4/400 aparece bajo Metodología, pero OR/RR como cálculo casi no cae en formato viñeta (forecast v2: 'bioestadística/cálculo retirado del top'). BAJA. Su valor real es conceptual: saber que casos-controles→OR y cohorte→RR (eso sí puede venir dentro de una viñeta de IV-1/IV-2).",
  "guidance": "0 videos QX en este código → NO buscar link fantasma. Para OR/RR: ver el segmento de medidas de asociación dentro de QX 'CAUSALIDAD Y RIESGO' (bloque Salud Pública) — 1 pasada, solo la regla 'cohorte→RR, casos-controles→OR, OR≈RR si enfermedad rara' y lectura de OR>1 riesgo / OR<1 protector. Para muestreo (que SÍ rinde): estudiarlo del propio compendio pág 6-9 (probabilístico vs no probabilístico con ejemplos) + 1-2 videos Theomed IV. Nivel: reconocer el tipo de muestreo descrito en una viñeta, no calcular tamaño muestral.",
  "gaps": [
   "GAP REAL: OR/RR/HR (fórmula, interpretación, IC95%, cuándo cada uno) NO están en el compendio y NO tienen video QX en este código → leer por QX bloque Salud Pública 'CAUSALIDAD Y RIESGO' (I-3/I-5) + Theomed IV + QX ENAM medidas de asociación.",
   "Muestreo SÍ está bien cubierto en el compendio (pág 6-9) pero sin video QX dedicado en este código → refuerzo por Theomed IV."
  ],
  "temario": [
   "El compendio López-Investigación NO desarrolla OR/RR/HR ni su cálculo/interpretación — el concepto de riesgo/asociación se toca de refilón en 'estudios analíticos' (cohorte compara incidencia; casos-controles analiza exposición retrospectiva)",
   "Muestreo (SÍ está, extenso): probabilístico (aleatorio simple, sistemático, estratificado, conglomerados) vs no probabilístico (conveniencia, juicio, cuotas, bola de nieve); población/muestra/unidad de análisis/marco muestral/parámetro vs estadístico"
  ],
  "compendioUrl": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=5",
  "videoFallback": {
   "label": "Videoclases GALENO",
   "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8"
  },
  "videosExtra": [],
  "gapSources": [
   {
    "label": "QX ENAM · Epi resumen",
    "url": "https://drive.google.com/file/d/14dSCm-Ftxf9ys7_O6IwRzqOFb1n2O8Nu/view"
   }
  ],
  "bookCoverage": {
   "lopez": "parcial",
   "theomed": "parcial",
   "theomedManual": "INV §5 Estudios Analíticos: OR/RR conceptual (cohorte→RR, casos-controles→OR/Razón de Momios) desarrollado en texto"
  },
  "soloTheomed": [
   "OR/RR como medida de asociación por tipo de estudio DESARROLLADO (cohorte→RR, casos-controles→OR) — cierra parcialmente el gap de López, que no desarrollaba OR/RR"
  ],
  "soloLopez": [
   "Muestreo COMPLETO (probabilístico: aleatorio simple/sistemático/estratificado/conglomerados vs no probabilístico; población/muestra/marco muestral) — Theomed NO desarrolla muestreo como capítulo"
  ],
  "gapAmbos": [
   "Cálculo/interpretación fina de OR/RR con IC95% y fórmula 2x2 — conceptual en ambos, no ejercitado → QX 'Causalidad y Riesgo'"
  ],
  "driveVideos": [
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases (índice) — ",
    "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §5) · Videoclases por área · Inv",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=5"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "IV-6+IV-7": {
  "tier": "BAJA",
  "vueltas": 3,
  "min": 40,
  "qxN": 5,
  "theomedN": 7,
  "extenso": true,
  "freq": "Tendencias QX Investigación: 'Instrumentos de recolección y validación' 6+2=8 (el más frecuente de Metodología), 'Procesamiento y análisis de datos' 2, 'Ética de investigación' 1, 'Informe' 1. Suma modesta y forecast v2 mantiene IV en piso. Ética de la investigación (CIEI/INS/Helsinki/Núremberg/Belmont) solapa con área III y ahí gana valor. BAJA como IV pura.",
  "guidance": "QX (6 videos del código): PRIORIZAR 'ÉTICA Y ASPECTOS ÉTICOS DE LAS PUBLICACIONES CIENTÍFICAS' y 'PUBLICACIÓN CIENTÍFICA' (CIEI/INS/Helsinki es lo más 'preguntable' y solapa con III). Ver 'PROCESAMIENTO Y ANÁLISIS DE DATOS' y 'PRINCIPALES INSTRUMENTOS DE MEDICIÓN EN PRIMER NIVEL' a 1.5x. Saltar 'CARACTERÍSTICAS ESTRUCTURALES/REQUISITOS METODOLÓGICOS DEL INFORME' (relleno, baja frecuencia). Theomed IV: 1 video de ética/publicación. Memorizar de golpe: 4 hitos (Núremberg=consentimiento, Belmont=3 principios, Helsinki=humanos, CIOMS=biomédica) + CIEI≥5 miembros + INS autoriza ensayos. Nivel: reconocimiento normativo, no memorizar las 12 secciones del informe.",
  "gaps": [
   "GAP nominal: la app llama a este código 'Indicadores de salud + Sistema de vigilancia', pero el compendio López-Investigación lo desarrolla como PUBLICACIÓN CIENTÍFICA + ÉTICA DE LA INVESTIGACIÓN (los indicadores/vigilancia epidemiológica reales caen en I-3, no en IV). Estudiar los indicadores por I-3; en IV quedarse con instrumentos+publicación+ética de investigación.",
   "Ética de la investigación (CIEI/INS/Helsinki 2024/CIOMS 2016) se solapa con III → estudiarla una sola vez y contarla para ambos."
  ],
  "temario": [
   "Instrumentos de recolección: cuantitativos (cuestionario/escala/registro) vs cualitativos (entrevista/observación/grupo focal); proceso de validación (5 etapas: diseño→juicio expertos→piloto→análisis psicométrico→versión final)",
   "Procesamiento y análisis de datos: revisión/depuración, codificación/tabulación, almacenamiento; estadística descriptiva (tendencia central, dispersión) vs inferencial (contraste hipótesis, correlación, regresión); software SPSS/STATA/R/Excel/NVivo/Atlas.ti",
   "Elaboración y publicación de resultados: proyecto (prospectivo) vs informe (retrospectivo); 12 secciones del informe (portada→anexos); normas de presentación (márgenes, APA/Vancouver, numeración)",
   "ASPECTOS ÉTICOS de la investigación en salud: principios (respeto, beneficencia, no maleficencia, justicia, confidencialidad)",
   "Hitos internacionales: Núremberg 1947, Helsinki 1964/2024, Belmont 1978, UNESCO 2005, CIOMS-OMS 2016",
   "Marco legal peruano: Constitución (art 1,2,7,14), Ley General de Salud 26842, D.S. 021-2017-SA (ensayos clínicos), rol del INS (Registro Peruano de Ensayos Clínicos)",
   "CIEI (Comité Institucional de Ética en Investigación): mínimo 5 miembros, autónomo, registro en INS, funciones; responsabilidades del investigador"
  ],
  "compendioUrl": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=5",
  "videoFallback": {
   "label": "Videoclases GALENO",
   "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8"
  },
  "videosExtra": [
   {
    "titulo": "REQUISITOS METODOLóGICOS DEL INFORME",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/bDJOYjBDbDRnT2czTC9HdXBLL1J0dz09"
   },
   {
    "titulo": "ÉTICA Y ASPECTOS éTICOS DE LAS PUBLICACIONES CIENTíFICAS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/VHV2alVzanZLVDFsdmJVclBmTW9Fdz09"
   },
   {
    "titulo": "PUBLICACIóN CIENTíFICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/dHZHT3JLbkRtSHkzc3RvMlREdldPUT09"
   },
   {
    "titulo": "PROCESAMIENTO Y ANáLISIS DE DATOS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/ZkJQeXVoYVFKRnRpSDdwME9MMmVFdz09"
   },
   {
    "titulo": "Características estructurales del informe",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09/VUwwZ21YZHZwOVpqdTJqc3NZSURBdz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "parcial",
   "theomedManual": "INV Sub-Área 3 Ejecución: §2 Informe de investigación (estructura), §5 Normas de presentación, §6 Aspectos éticos de las publicaciones + Sub-Área 2 §4 Declaración de Helsinki + consentimiento informado en investigación"
  },
  "soloTheomed": [
   "Declaración de Helsinki desarrollada como sección (§4.1) + consentimiento informado en investigación detallado",
   "Aspectos éticos de las publicaciones científicas (§6)"
  ],
  "soloLopez": [
   "CIEI (mínimo 5 miembros, registro INS) explícito, 4 hitos completos (Núremberg/Belmont/Helsinki/CIOMS/UNESCO), marco legal peruano (DS 021-2017-SA, rol INS), instrumentos de recolección cuali/cuanti — Theomed NO nombra CIEI ni el detalle normativo peruano"
  ],
  "gapAmbos": [
   "Indicadores de salud/vigilancia (nombre del código en la app) — realmente caen en I-3, no aquí, en ninguno de los dos"
  ],
  "driveVideos": [
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases (índice) — ",
    "url": "https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §5) · Videoclases por área · Inv",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=5"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "V-2": {
  "tier": "CRÍTICA",
  "vueltas": 6,
  "min": 110,
  "qxN": 4,
  "theomedN": 25,
  "extenso": true,
  "freq": "El tema #1 histórico del área V y de varios exámenes: fue tema n°1 en 2024-II (V-2 15.5%) y 2025-II (V-2 21%). QX Tendencias: 'Planeamiento Institucional PEI/POI'=12 + 'FODA'=8 = 20/400 (~5%/examen) SOLO planeamiento; sumando clima organizacional (5) + plan de calidad/acreditación (5) + residuos en desastre (3) + documentos normativos ROF/MOP (2+2) el bloque V-2 real ronda ~9-12%. Forecast v2: 10% banda 8-18, tendencia VOLÁTIL anti-persistente (15.5→9→21→8.9); tras el fold bajo 2026-I hay riesgo alto de REBOTE al alza. Crítico #4 del examen.",
  "guidance": "QX: mirar los 6 videos QX en orden de prioridad: (1) 'PLANEAMIENTO A NIVEL INSTITUCIONAL - PEI' y (2) 'POI, EVALUACIÓN DEL POI' primero (es el 60% de las preguntas del código), (3) 'ANÁLISIS ESTRATÉGICO INSTITUCIONAL (FODA)' segundo, luego (4) 'DOCUMENTOS TÉCNICOS NORMATIVOS' y (5) 'DOCUMENTOS TÉCNICOS - ROF, MOP' para clavar los reemplazos SERVIR (MOF→MPP, CAP+PAP→CPE), y (6) 'GESTIÓN DE LOS SERVICIOS DE SALUD' de repaso. Theomed: de sus 25 videos del área, ver 4-5 de planeamiento/gestión institucional para viñetas; complementar con los 9 lives QX 'Revisión de Normas Técnicas' (CEPLAN/PNMSM 2030). Practicar viñetas que pregunten 'qué documento/fase corresponde' más que teoría FODA pura.",
  "gaps": [
   "Residuos sólidos/bioseguridad en escenario de DESASTRE (el forecast lo lista dentro de V-2 pero el compendio Gestión NO lo desarrolla → leerlo en I-11/I-12 'Gestión de residuos sólidos' y 'Gestión del riesgo en desastres', o QX 'Gestión y manejo de residuos sólidos')",
   "Marco legal detallado del PIA/PIM y ciclo presupuestal (el compendio solo menciona PIA de pasada → complementar con normativa MEF/CEPLAN en Drive)"
  ],
  "temario": [
   "Planeamiento estratégico: concepto, proceso cíclico, marco legal (SINAPLAN liderado por CEPLAN = ente rector; CEPLAN NO impone, articula/supervisa)",
   "Instrumentos del SINAPLAN en cascada: PEDN (Perú al 2050, 4 objetivos: personas/territorio/competitividad/democracia) > PNS/PNM > PESEM > PDRC > PDLC",
   "Ciclo de planeamiento estratégico (4 fases: situación actual → prospectivo → decisión estratégica → seguimiento/evaluación)",
   "Análisis estratégico institucional: MISIÓN (presente) vs VISIÓN (futuro) vs VALORES",
   "FODA: Fortalezas/Debilidades (internos) vs Oportunidades/Amenazas (externos)",
   "PEI = plan de MEDIANO plazo, 5 AÑOS, objetivos estratégicos (etapas de formulación)",
   "POI = plan de CORTO plazo, anual (1 año) o multianual (3 años); debe alinearse al PIA (Presupuesto Institucional de Apertura)",
   "Documentos técnicos normativos de gestión: ROF (vigente, estructura orgánica/funciones generales), MOP (vigente en programas/proyectos)",
   "Reemplazos por Ley del Servicio Civil 30057: MOF → MPP (Manual de Perfiles de Puestos); CAP+PAP → CPE (Cuadro de Puestos de la Entidad)"
  ],
  "compendioUrl": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=6",
  "videoFallback": {
   "label": "Videoclases GALENO · Gestión",
   "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
  },
  "videosExtra": [
   {
    "titulo": "PLANEAMIENTO A NIVEL INSTITUCIONAL - PEI",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/K1pCaEdia2czZStHRGxhMkw3RUFhQT09"
   },
   {
    "titulo": "ANáLISIS ESTRATéGICO INSTITUCIONAL (FODA)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/ajljaDVha2prZjdrUDJnNzh6ZDBnUT09"
   },
   {
    "titulo": "PLANEAMIENTO A NIVEL INSTITUCIONAL - POI, EVALUACIóN DEL POI",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/M09IR3ZDWHM3ZW83ckdtRmFTUFFsdz09"
   },
   {
    "titulo": "DOCUMENTOS TéCNICOS NORMATIVOS DE GESTIóN INSTITUCIONAL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/b2d6T2FmaldJOXJzN29ySklQOUVsZz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "GESTIÓN Sub-Área 1 Planificación: §1 Planeamiento estratégico (4 fases, ciclo PDCA, marco legal CEPLAN), §1.2 Análisis Estratégico Institucional (misión/visión/valores/FODA), §1.3 Planeamiento Institucional (PEI 5a/POI anual, diferencias) + §2.1 Documentos técnicos normativos (ROF/MOP)"
  },
  "soloTheomed": [
   "Ciclo de planeamiento con ejemplo CEPLAN completo y modelo de plan estratégico en salud mental",
   "FODA con los 4 cuadrantes desarrollados"
  ],
  "soloLopez": [
   "Instrumentos SINAPLAN en cascada (PEDN Perú 2050→PESEM→PDRC→PDLC) y reemplazos SERVIR (MOF→MPP, CAP+PAP→CPE) más explícitos"
  ],
  "gapAmbos": [
   "Residuos/bioseguridad en escenario de DESASTRE (el forecast lo mete en V-2) — está en SP §2.11/§3.4 no en Gestión → cruzar",
   "Marco legal PIA/PIM y ciclo presupuestal fino → normativa MEF"
  ],
  "driveVideos": [
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · GESTIÓN (",
    "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §6) · Videoclases por área · Ges",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=6"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "V-1": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 75,
  "qxN": 3,
  "theomedN": 25,
  "extenso": true,
  "freq": "QX Tendencias 'Categorización de servicios de salud'=10/400 (~2.5%/examen) — el sub-tema n°1 de 'Organización de servicios'; sumando 'Requisitos operación/funcionamiento EESS'=1 y 'Redes integradas'=2. Sorpresa ciega en el backtest (V-1 apareció fuera del top en fold 2024-II→2025-I). Forecast v2: 4% banda 2-6, tendencia alza; ajuste fino post-verificación lo centra en ~3. Núcleo: quién asigna categoría, UPSS, referencia por nivel.",
  "guidance": "QX: los 3 son obligatorios y bien delimitados: 'CATEGORIZACIÓN DE SERVICIOS DE SALUD' (el eje), 'UPSS Y CARTERA DE SERVICIOS' (para no confundir UPS/UPSS), 'REQUISITOS PARA OPERACIÓN Y FUNCIONAMIENTO DE EESS'. Theomed: 2-3 videos del área de organización de servicios. La trampa de examen clásica es confundir categorización con acreditación y no saber que la DIRESA asigna con Acto Resolutivo a 3 años — priorizar viñetas que discriminen esos dos puntos.",
  "gaps": [
   "Tabla detallada de personal/equipamiento/horas por categoría (el compendio la trae extractada de la NTS pero mal formateada en el PDF → verificar la NTS 021 completa en Drive/aula virtual López para viñetas de '¿qué categoría tiene X personal?')"
  ],
  "temario": [
   "Categoría vs categorización vs ACREDITACIÓN (ojo: categorización = obligatoria/'etiqueta' por capacidad resolutiva; acreditación = voluntaria/'sello de calidad')",
   "Marco: NTS N° 021-MINSA/DGSP-V.03; capacidad resolutiva por UPSS",
   "3 niveles de atención (1° puerta entrada/preventivo, 2° especialización+hospitalización, 3° alta complejidad)",
   "Categorías 1er nivel: 1-1 (no médico), 1-2 (médico cirujano), 1-3 (multidisciplinario), 1-4 (internamiento/emergencia/apoyo dx)",
   "Categorías 2° nivel: II-1, II-2, II-E; 3° nivel: III-1, III-2, III-E",
   "Proceso de categorización: responsabilidad de las Direcciones Regionales de Salud (DIRESA); Comité Técnico; Acto Resolutivo con vigencia 3 AÑOS",
   "Cartera de servicios: capacidad resolutiva vs capacidad de oferta",
   "UPS (cualquier área que da un servicio) vs UPSS (específica de salud): atención directa (consulta/hospitalización/emergencia/cirugía) vs apoyo/soporte (laboratorio/farmacia/imágenes)"
  ],
  "compendioUrl": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=6",
  "videoFallback": {
   "label": "Videoclases GALENO · Gestión",
   "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
  },
  "videosExtra": [
   {
    "titulo": "CATEGORIZACIóN DE SERVICIOS DE SALUD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/YVZyUHhCSkczaGNOcFJPQ3FBRzJHZz09"
   },
   {
    "titulo": "REQUISITOS PARA OPERACIóN Y FUNCIONAMIENTO DE EESS",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/OUtTUFJaZHhncjFreTQ5MXFOdjBQQT09"
   },
   {
    "titulo": "UPSS Y CARTERA DE SERVICIOS DE SALUD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/VTIrZXZFU3I2ajVLODVGUHpEUTdiQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "GESTIÓN §2.2 Categorización de los Establecimientos de Salud (niveles, categorías 1-1 a III-E, UPSS 40 menciones, cartera de servicios) + Acreditación de los servicios de salud"
  },
  "soloTheomed": [
   "Categorización con UPSS ampliamente desarrollada (40 menciones) y personal/equipamiento por categoría",
   "Acreditación diferenciada de categorización en el mismo bloque"
  ],
  "soloLopez": [
   "Distinción categorización (obligatoria) vs acreditación (voluntaria ≥85%) y que la DIRESA asigna con Acto Resolutivo a 3 años, tabulado"
  ],
  "gapAmbos": [
   "Tabla detallada de personal/horas por categoría — imagen/formato en ambos → NTS 021 completa"
  ],
  "driveVideos": [
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · GESTIÓN (",
    "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §6) · Videoclases por área · Ges",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=6"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "V-3": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 80,
  "qxN": 3,
  "theomedN": 25,
  "extenso": true,
  "freq": "QX Tendencias 'Sistema de referencia y contrareferencia'=5/400 (~1.25%/examen) + 'Redes integradas de salud'=2/400. No en top explícito del forecast v2 pero es contenido operativo transversal que cruza con V-1 (referencia por nivel) y con II-1 (referencia de gestante). MEDIA-ALTA por combinación de dos temas voluminosos y muy 'viñeteables' (¿a qué nivel se refiere?, ¿contrarreferencia oportuna?).",
  "guidance": "QX: 'SISTEMA DE REFERENCIA Y CONTRARREFERENCIA Y PROCESO DE ADMISIÓN INTEGRAL' + 'SISTEMA DE REFERENCIA Y CONTRARREFERENCIA' (los dos, cubren plazos 60d/7d y criterios) y 'REDES INTEGRADAS DE SALUD (RIS)' para EMS/AISPED/CLAS. Theomed: 3 videos del área (referencia + RIS). Priorizar memorizar los NÚMEROS que caen en viñeta: hoja de referencia 60 días, contrarreferencia oportuna 7 días, rural <2000 hab, EMS = 4 profesionales, gestores = 1 director + 5 jefes.",
  "gaps": [
   "NTS 020 de referencia y contrarreferencia con el detalle de plazos/formatos: el compendio cubre lo esencial pero el detalle normativo fino está más desarrollado en el código V-7+V-10 (video QX 'SISTEMA DE REFERENCIA Y CONTRARREFERENCIA' repetido) y en la NTS 020 en Drive"
  ],
  "temario": [
   "SRC definición: envío (referencia)/retorno (contrarreferencia) entre niveles; software REFCON",
   "Referencia: por capacidad resolutiva insuficiente; puede iniciarse desde la COMUNIDAD (agente comunitario ante signos de alarma)",
   "Responsables (jefe EESS, responsable SIS/Referencias/Admisión, comité de gestión, co-responsables comunales)",
   "Hoja de referencia: original + 2 copias; VIGENCIA 60 DÍAS para consulta externa y apoyo al dx",
   "Criterios de selección del destino: capacidad resolutiva, accesibilidad (el más cercano aunque sea de otra red), oportunidad",
   "Contrarreferencia: OPORTUNA si el EESS origen recibe la hoja dentro de los primeros 7 DÍAS; condiciones del usuario (curado/mejorado/apoyo dx/deserción/retiro voluntario/fallecimiento)",
   "Transporte del SRC (DIRESA coordina; ambulancia principal; ningún paciente en emergencia se deja de referir por temas administrativos/financieros)",
   "RIS (Ley 30885): concepto, población asignada/georreferenciada, EMS (médico/enfermera/obstetra/técnico; AISPED en zonas dispersas)",
   "Gestores RIS (1 director + 5 jefes de equipo); VCIS (Vías de Cuidado Integral en Salud); Comités Distritales de Salud (determinantes sociales)",
   "Zona rural (<2000 hab INEI) vs urbana; cogestión CLAS (Ley 29124); privados NO forman parte de la RIS por defecto"
  ],
  "compendioUrl": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=6",
  "videoFallback": {
   "label": "Videoclases GALENO · Gestión",
   "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
  },
  "videosExtra": [
   {
    "titulo": "SISTEMA DE REFERENCIA Y CONTRARREFERENCIA Y PROCESO DE ADMISIóN INTEGRAL",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/RWJlWDVOUGEzdEhYclBNY2xGeEo3UT09"
   },
   {
    "titulo": "REDES INTEGRADAS DE SALUD (RIS)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/OEVZZHNlVlBwNVk0d20zYlJMYThGdz09"
   },
   {
    "titulo": "Atención médica en situaciones de emergencia",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=/RHRZLzBWQ29QU2xvb245Q0dubmtkQT09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "GESTIÓN §2.4 Sistema de Referencia y Contrarreferencia + §2.6 Redes Integradas de Salud (RIS)"
  },
  "soloTheomed": [
   "Referencia y RIS como capítulos propios con proceso de admisión integral"
  ],
  "soloLopez": [
   "Plazos exactos (hoja referencia 60 días, contrarreferencia oportuna 7 días), EMS=4 profesionales, gestores 1 director+5 jefes, rural <2000 hab, CLAS Ley 29124 — muy tabulado para viñeta"
  ],
  "gapAmbos": [
   "NTS 020 detalle fino de formatos → normativa"
  ],
  "driveVideos": [
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · GESTIÓN (",
    "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §6) · Videoclases por área · Ges",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=6"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "V-7+V-10": {
  "tier": "ALTA",
  "vueltas": 5,
  "min": 110,
  "qxN": 8,
  "theomedN": 25,
  "extenso": true,
  "freq": "Código-paraguas que absorbe VARIOS sub-temas rentables. QX Tendencias suma: Gestión HC=7, Clima organizacional=5, Plan de calidad/acreditación=5+1, Control de inventario/stock medicamentos=6+3, Gestión RRHH=4, Liderazgo=1, AUS y contrataciones del Estado=2, Sistema logística/mantenimiento=1+1 → ~40/400 combinados (~10%/examen agregado a lo largo de todo el bloque). Forecast v2 destaca V-MED 4% (banda 2-6, farmacovigilancia/URM/DIGEMID/SISMED/vencidos) y añade III-9 HC/SUSALUD (mayor miss histórico) que aquí cruza con Gestión de HC.",
  "guidance": "Es un código pesado: de los 10 videos QX priorizar los de mayor conteo en Tendencias: 'GESTIÓN DE LA HISTORIA CLÍNICA' (7 pts, cruza con III-9), 'GESTIÓN LOGÍSTICA, CONTROL DE INVENTARIO Y STOCK' + 'BUENAS PRÁCTICAS DE ALMACENAMIENTO' (V-MED, 6+ pts, memorizar substock/normostock/sobrestock y TCV vs Kardex), 'PLAN DE CALIDAD Y ACREDITACIÓN' (5 pts, el 85%/autoeval vs externa), 'CLIMA Y CULTURA ORGANIZACIONAL' (5 pts), 'CALIDAD' (PDCA/evento centinela), luego 'ASEGURAMIENTO UNIVERSAL (AUS)', 'GESTIÓN DE RRHH' (7 subsistemas) y 'TRABAJO COLABORATIVO'. Theomed: 5-6 videos del área para viñetas de calidad/seguridad del paciente. NO invertir tiempo profundo en liderazgo/estilos (bajo rendimiento: 1 pt).",
  "gaps": [
   "Farmacovigilancia / RAM y URM/resistencia antimicrobiana (forecast V-MED lo pide, el compendio López casi no lo desarrolla → leer en I-11/I-12 'Uso racional de medicamentos' QX + Buenas Prácticas de Almacenamiento; normativa DIGEMID de farmacovigilancia en Drive)",
   "Derechos del paciente / quejas SUSALUD / Ley 29414 (el forecast lo marca como mayor miss histórico dentro de III-9; aquí solo se toca la copia de HC → leer en III-9 'Derechos-deberes de usuarios' QX)",
   "Contrataciones y adquisiciones del Estado (Ley de Contrataciones) — QX Tendencias lo cuenta (2) pero el compendio no lo desarrolla → complementar en Drive si el tiempo alcanza (baja prioridad)"
  ],
  "temario": [
   "Gestión de RRHH: SERVIR rige el SAGRH; 7 SUBSISTEMAS y 23 procesos (planificación, organización del trabajo, gestión del empleo, rendimiento, compensación, desarrollo/capacitación, relaciones humanas/sociales); control de asistencia y permanencia",
   "Control de inventario y stock (V-MED): SISMED; DIGEMID (regula/normativa/calidad) vs CENARES (brazo logístico: compra/almacena/distribuye)",
   "Niveles de stock: substock (<2 meses), normostock (2-6 meses), sobrestock (>6 meses, riesgo vencimiento), desabastecimiento (0); disponibilidad baja <70%, regular 70-90%, óptima ≥90%",
   "Documentos de stock: TCV (junto al producto), Kardex (físico/virtual, NO junto al producto); PEPS (primero en expirar/salir); ubicación fijo/fluido/semifluido",
   "Garantía y mejora de la calidad: PDCA/Ciclo de Deming (Planificar-Hacer-Verificar-Actuar); dimensiones (técnico-científica/humana/entorno)",
   "Seguridad del paciente: identificación segura, uso seguro de medicamentos, cirugía segura (lista OMS), evento adverso / evento CENTINELA (muerte o daño severo permanente) / incidente (sin daño)",
   "Acreditación: autoevaluación (obligatoria, anual, interna) vs evaluación externa (voluntaria, MINSA, requiere ≥85%); resultados <50%/50-69%/70-84%/≥85%; 22 macroprocesos (5 gerenciales/11 prestacionales/6 apoyo)",
   "Auditoría de la calidad: interna/externa; médica/en salud; regular/dirimente; de caso/programada; principios del auditor (ética, confidencialidad, veracidad, independencia, imparcialidad, objetividad); etapas (planeamiento/ejecución/informe/implementación/seguimiento)",
   "Clima organizacional (percepción del entorno) vs cultura organizacional (valores/normas compartidas); variables: potencial humano, diseño de la organización, cultura",
   "Liderazgo: estilos (coercitivo, visionario, afiliativo, democrático, ejemplar/timonel, formativo/coaching); JEFE vs LÍDER; inteligencia emocional; creación de valor público",
   "Trabajo colaborativo: práctica colaborativa interprofesional (PCI, OMS); EMS multidisciplinario",
   "Coordinación intersectorial y alianzas estratégicas (Plan Multisectorial Anemia MINSA/MIDIS/MINEDU; Qali Warma)",
   "Gestión de la HC (cruza con III-8/III-9): archivo activo (5 años) / pasivo / especial (40 años); conservación mínima 20 años; copia autenticada en ≤5 días",
   "AUS (Aseguramiento Universal en Salud) y SIS; intercambio prestacional"
  ],
  "compendioUrl": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=6",
  "videoFallback": {
   "label": "Videoclases GALENO · Gestión",
   "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
  },
  "videosExtra": [
   {
    "titulo": "GESTIóN DE LA HISTORIA CLíNICA",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/NHRkNk5NcWk3MTRDMmlxVFJMWkRPUT09"
   },
   {
    "titulo": "GESTIóN DE RRHH",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/dzRQYTRyTUEvUmVCL0k2YzdOK0lJZz09"
   },
   {
    "titulo": "Aseguramiento universal en salud (AUS)",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/S0NrYnNsZmUwa0VTMk5DTkpSNUExQT09"
   },
   {
    "titulo": "Gestión logística, control de inventarios",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/MGptMUkvVWR3TkJHVzRZZzhqSStlZz09"
   },
   {
    "titulo": "Coordinación intersectorial y alianzas estratégicas",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/aWR1eXhXbGVuaGhjMS9FUytiNzRkQT09"
   },
   {
    "titulo": "Trabajo colaborativo y eficaz en los servicios de salud",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/dGZpeXNyMW5XUG1TakxUWWxKVnJ4QT09"
   },
   {
    "titulo": "Plan de calidad y acreditación de servicios de salud",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/NkV4QXZ3MktiUEE2Vnk5dk1abSsvUT09"
   },
   {
    "titulo": "Clima organizacional y cultura organizacional",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/Um1VbnNhQmRoZGhjRFVMSjBOeUZqdz09"
   }
  ],
  "gapSources": [
   {
    "label": "QX ENAM · Epi resumen",
    "url": "https://drive.google.com/file/d/14dSCm-Ftxf9ys7_O6IwRzqOFb1n2O8Nu/view"
   }
  ],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "GESTIÓN §3.1 Gestión RRHH (SERVIR/SAGRH, 130 menciones), §3.2 Control de Inventario y Stock (substock/normostock/sobrestock/Kardex/PEPS), §3.3 Coordinación intersectorial, §3.4 Liderazgo, §3.5 Trabajo colaborativo, §2.5 Gestión de HC, §4.1 Garantía y mejora de la calidad + Acreditación, §4.2 Clima y cultura organizacional; AUS/SIS (235 menciones)"
  },
  "soloTheomed": [
   "Control de inventario/stock (V-MED) desarrollado con niveles y método PEPS/Kardex",
   "Gestión de HC como capítulo (§2.5) — cruza con III-9",
   "AUS/SIS ampliamente cubierto (235 menciones)",
   "Telesalud (§5, teleconsulta/teleconferencia)"
  ],
  "soloLopez": [
   "7 subsistemas y 23 procesos de SERVIR, evento centinela vs adverso vs incidente, 22 macroprocesos de acreditación, archivo HC (activo 5a/pasivo/especial 40a/conservación 20a), auditoría (tipos/etapas/principios) más tabulados"
  ],
  "gapAmbos": [
   "Farmacovigilancia/RAM y URM/resistencia antimicrobiana detallada — ligero en ambos (Theomed 4 menciones) → normativa DIGEMID",
   "Contrataciones/adquisiciones del Estado — 0 en Theomed, tampoco en López → normativa (baja prioridad)"
  ],
  "driveVideos": [
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · GESTIÓN (",
    "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §6) · Videoclases por área · Ges",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=6"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 },
 "V-6": {
  "tier": "MEDIA",
  "vueltas": 3,
  "min": 35,
  "qxN": 1,
  "theomedN": 25,
  "extenso": false,
  "freq": "QX Tendencias 'Telesalud'=2/400 (~0.5%/examen). Material recién publicado por QX esta semana (señal de que puede aparecer) pero histórico bajo. Forecast v2 no lo lista en top ni watch. Tema de bajo volumen pero fácil de clavar (definiciones puras) → poca inversión, alta eficiencia por pregunta.",
  "guidance": "QX: 1 solo video 'TELESALUD' — verlo una vez y quedarse con las definiciones diferenciales (teleconsulta vs teleorientación vs teleinterconsulta vs telemonitoreo; teleconsultante vs teleconsultor; DIGTEL). Theomed: opcional, 1 video si sobra tiempo. No merece deep-work; basta memorizar el cuadro de definiciones porque las preguntas son de reconocimiento directo.",
  "gaps": [],
  "temario": [
   "Telesalud: 4 ejes (prestación de servicios / gestión / IEC con pertinencia cultural / fortalecimiento de capacidades del personal)",
   "Actores: teleconsultante (IPRESS que solicita) vs teleconsultor (especialista que brinda); DIGTEL (Dirección General de Telesalud, Referencia y Urgencias); RNT (Red Nacional de Telesalud, conducida por MINSA)",
   "Servicios de telemedicina: teleconsulta, teleinterconsulta, teleorientación, telemonitoreo, teleapoyo al diagnóstico",
   "Ejes operativos: telegestión, telecapacitación, teleIEC"
  ],
  "compendioUrl": "https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V",
  "theomedBookUrl": "https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn",
  "theomedUrl": "https://campus.academiatheomed.com/course/view.php?id=73&section=6",
  "videoFallback": {
   "label": "Videoclases GALENO · Gestión",
   "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
  },
  "videosExtra": [
   {
    "titulo": "TELESALUD",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases/MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==/eFhyc2p4SWVRaFIxUUtxUHQ3YmtmZz09"
   }
  ],
  "gapSources": [],
  "bookCoverage": {
   "lopez": "sí",
   "theomed": "sí",
   "theomedManual": "GESTIÓN §5 Telesalud: §5.1 Teleconsulta ... §5.7 Teleconferencia en Salud"
  },
  "soloTheomed": [
   "Telesalud desglosada por servicio (teleconsulta/teleconferencia) con secciones propias"
  ],
  "soloLopez": [
   "4 ejes de telesalud, actores (teleconsultante/teleconsultor), DIGTEL y RNT definidos para reconocimiento directo"
  ],
  "gapAmbos": [],
  "driveVideos": [
   {
    "label": "GALENO MEDIC (Google Drive) · 🎥 Videoclases · GESTIÓN (",
    "url": "https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w"
   },
   {
    "label": "THEOMED (plataforma campus, curso 73 §6) · Videoclases por área · Ges",
    "url": "https://campus.academiatheomed.com/course/view.php?id=73&section=6"
   },
   {
    "label": "QX MEDIC (plataforma aula virtual) · 🎬 Videoclases QxMedic (po",
    "url": "https://qxmedic-aulavirtual.com/mis-clases/videoclases"
   }
  ]
 }
};
