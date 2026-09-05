# Protocolo de fotografía clínica estandarizada + anonimización — Case Report #1

> Objetivo: que las fotos del caso pasen el filtro editorial a la primera (DOJ / JAAD Case Reports / IJD)
> y que el "antes-después" sea comparable. Las reglas de las revistas citadas abajo se verificaron el
> 5-sep-2026 (DOJ: <https://doj.dermsquared.com/index.php/doj/about/submissions>; Elsevier:
> <https://www.elsevier.com/about/policies-and-standards/patient-consent>). Lo que no está en una fuente
> pública se marca como práctica estándar de fotografía dermatológica (no como norma de la revista).

## 0. Antes de disparar (obligatorio)
1. **Consentimiento de publicación firmado** (`consentimiento_publicacion_ES_EN.md`) — se firma ANTES de
   la sesión, explicando que las fotos pueden publicarse en internet en acceso abierto y no se pueden retirar
   tras la publicación. Sin firma no hay foto para el manuscrito (la foto asistencial de la historia clínica
   es otra cosa y tiene otro consentimiento).
2. **Quién dispara**: el clínico responsable del paciente (Dr. Ciro / colega SPD) o Joseph con su autorización
   y en su consulta. Nunca el paciente enviando fotos por WhatsApp (calidad, metadatos, cadena de custodia).
3. **Dispositivo**: cámara del smartphone es aceptable si ≥12 MP, sin filtros ni "modo belleza", HDR
   desactivado, zoom digital desactivado (acercarse físicamente). Cámara réflex/mirrorless con objetivo
   macro 60-100 mm si está disponible (lesiones pequeñas).

## 1. Estándar de toma (misma receta en todas las visitas)
| Parámetro | Regla | Por qué |
|---|---|---|
| Fondo | Uniforme, mate, sin objetos: **azul medio, gris neutro o negro** (sábana/cartulina). Nunca pared con cuadros, cortinas ni ventana. | Elimina distractores e información del lugar (identificable). |
| Iluminación | Luz difusa y homogénea; flash **rebotado** o con difusor; evitar flash frontal directo (brillo, aplana el relieve) y luz mixta (ventana + fluorescente = dominante de color). Misma fuente en todas las visitas. | El color y el relieve (nódulos, eritema, pigmento) dependen de la luz. |
| Balance de blancos | Fijo (no "auto") — p. ej. "flash" o "luz de día" — el mismo siempre. Incluir en la primera toma una **tarjeta gris/blanca** o carta de color en el encuadre de referencia. | Comparabilidad antes/después; PIH y eritema se juzgan por color. |
| Encuadre facial | Serie estándar: **frontal, oblicuo 45° derecho e izquierdo, perfil 90° derecho e izquierdo**; cabeza en **plano de Frankfort** (trago-borde orbitario inferior horizontal), expresión neutra, boca cerrada, ojos abiertos mirando al frente, pelo recogido, sin gafas/joyas/maquillaje. | Es la serie que exigen los papers de estética; permite comparar simetría. |
| Encuadre de lesión | 1 foto de localización (región completa) + 1 acercamiento perpendicular a la piel con **regla/escala** (regla de papel adhesiva o cinta métrica) en el mismo plano de la lesión; distancia fija (marcar 30-40 cm para región, 10-15 cm para macro). | El reviewer necesita tamaño real y localización. |
| Enfoque/exposición | Enfocar en la lesión; exposición ligeramente subexpuesta antes que quemada; revisar en pantalla al 100 % antes de dejar ir al paciente. | Una foto movida no se recupera. |
| Formato | Máxima calidad JPEG (o RAW+JPEG). No recomprimir. Sin filtros, sin retoque de color. Guardar el original intacto y trabajar sobre copia. | Integridad de la imagen (las revistas rechazan manipulación). |
| Repetición | Mismo fondo, luz, distancia, ángulo, balance de blancos y hora del día en cada visita (D0, D7, D30…). Anotar los parámetros en la ficha de la sesión. | El "después" solo vale si el "antes" se hizo igual. |
| Dermatoscopia (si aplica) | Misma dermatoscopio, luz polarizada/no polarizada anotada, con escala. | Casos de pigmento/vascular. |

**Serie mínima para un case report estético/complicación**: 3 fotos de la fase aguda (localización + macro + serie
facial si hay asimetría), 3 del control (misma receta) y, si hubo tratamiento (hialuronidasa, láser, etc.), 1 del
momento del tratamiento. Total 6-8 imágenes; al manuscrito van 2-4 (las revistas limitan figuras).

## 2. Anonimización (lo que exigen las revistas)
- **No** enviar fotos con **tiras negras** sobre los ojos: DOJ lo prohíbe expresamente ("Please do not submit
  masked photographs of patients"). La regla es **recortar** al área de interés; si la cara completa es
  necesaria, el consentimiento debe cubrir explícitamente "imagen facial reconocible".
- Fuera de la imagen: iniciales, nombre, nº de historia, fecha en la esquina, **joyas, tatuajes, marcas de
  nacimiento no relevantes** (DOJ: "must be cropped or obscured"), ropa con logos, objetos del consultorio.
- **Metadatos EXIF**: borrar antes de enviar (GPS, fecha/hora, modelo de cámara, a veces el nombre del
  dueño del teléfono). En Windows: propiedades → Detalles → "Quitar propiedades e información personal"
  → "Crear una copia con todas las propiedades posibles quitadas". Verificar con un visor EXIF.
- **Nombre de fichero**: `CR1_fig1_D0_frontal.jpg` (nunca el nombre ni el DNI del paciente).
- Texto del manuscrito: solo datos **esenciales** (DOJ); sexo y edad en décadas o edad exacta solo si es
  clínicamente relevante; sin fechas exactas de atención (usar "day 0, day 7"); sin ciudad si no aporta.
- Las fotos de **menores** requieren consentimiento de padre/madre/tutor **y** asentimiento del menor cuando
  tenga capacidad (ver plantilla); Elsevier: si los tutores discrepan, no hay consentimiento.

## 3. Custodia y trazabilidad
- Los originales se guardan en una carpeta **cifrada** del PC de Joseph (BitLocker o 7-Zip AES-256) +
  copia en la unidad del clínico; no en WhatsApp, no en Google Fotos con sincronización automática.
- Ficha de sesión (una línea por foto): fecha · visita (D0/D7/…) · dispositivo · fondo · luz · WB · distancia
  · ángulo · nº fichero · quién tomó la foto. Se guarda con el consentimiento firmado (escaneado) en
  `CASE_REPORT_1/_privado/` (**esa carpeta va en .gitignore** — el repo tiene remoto en GitHub).
- El consentimiento firmado **lo conserva el autor** (Elsevier y DOJ); no se sube al repositorio ni al
  sistema de envío salvo que la revista lo pida por escrito.

## 4. Preparación de figuras para el envío
- Figuras compuestas (A-B-C: D0 / D7 / D30) montadas con la misma escala y orientación; rótulos A/B/C en
  esquina superior izquierda, flechas solo si son necesarias; leyenda describe qué es cada panel y el
  tratamiento entre paneles.
- Resolución: entregar el original a máxima calidad; la mayoría de revistas piden ≥300 dpi al tamaño de
  impresión (TIFF/JPEG). Los límites exactos de tamaño/nº de figuras se leen en la guía de la revista elegida
  **el día que se elige** (DOJ 600-1.200 palabras; nº de figuras: A VERIFICAR (5-sep) en la guía).
- Nunca aumentar brillo/contraste/saturación de forma selectiva; un ajuste global idéntico en todos los paneles
  es aceptable y debe declararse en la leyenda.

## 5. Checklist de 60 segundos antes de cerrar la sesión
☐ consentimiento firmado y escaneado · ☐ fondo/luz/WB/distancia anotados · ☐ serie completa (localización + macro
con regla + facial 5 vistas si aplica) · ☐ fotos nítidas al 100 % · ☐ sin joyas/tatuajes/nombres en cuadro ·
☐ ficheros renombrados sin datos del paciente · ☐ copia cifrada hecha · ☐ EXIF pendiente de borrar (se hace al
preparar el envío, sobre la copia).
