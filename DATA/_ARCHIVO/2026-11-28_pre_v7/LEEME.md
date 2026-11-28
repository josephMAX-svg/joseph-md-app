# Archivo pre-v7 (sáb 28-nov-2026)

**NO usar para estudiar ni para generar preguntas.** Aquí está lo que la reorganización final v7.00 dejó fuera del uso diario. Se movió, no se borró nada.

- **Qué hay:** 64 ficheros trackeados que ningún código importa (solo los citan docs de historial o comentarios). Cada uno conserva su ruta original debajo de esta carpeta.
  - **A1:** la copia del xlsx de Business en la raíz.
  - **A2:** scripts de un solo uso de la campaña ENCAPS 2026-II.
  - **A3:** planes y material de ENCAPS 2026-II, con el examen ya pasado. Los `.docx` y `.pdf` son preguntas generadas, que ya no están permitidas.
  - **A4:** reestructuraciones y verificaciones históricas.
  - **A5:** la especificación congelada de la v6.00. Las copias vivas están en `DATA/_scripts/usmle/ref_v6/`.
- **Detalle:** en `MANIFEST.tsv` (origen, destino, bytes, blob sha de git, grupo, razón y nº de docs que lo citan).
- **Deshacer:**
  - `git revert` del commit de archivado.
  - O, por fichero, `git mv <destino> <origen>` siguiendo el manifiesto.
  - El historial sigue con `git log --follow <destino>`.
- **Docs que los citan:** no se reescribieron. Sus enlaces apuntan a la ruta original: para leerlos, añade el prefijo `DATA/_ARCHIVO/2026-11-28_pre_v7/`.
