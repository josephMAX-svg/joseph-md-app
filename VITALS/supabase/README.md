# Supabase — Ruta de PRODUCCIÓN (no se usa en local)

La app corre en **local con SQLite** (en `intelligence/`). Este directorio es la **ruta de producción**:
un proyecto Supabase **NUEVO y aislado** (nunca el CRM en vivo).

## Contenido
- `migrations/0001_movimiento_schema.sql` — esquema completo (perfiles, planes, logs, RAG con pgvector,
  FHIR) + **RLS estricto** (cada usuario ve solo su data; el rol `medico` ve todo).
- `seed/0002_seed_catalog.sql` — catálogo: 26 alimentos peruanos + 27 chunks de conocimiento (RAG).
  Generado por `seed/generate_seed.py` desde las fuentes canónicas (no editar a mano).

## Aplicar (cuando Joseph tenga el proyecto)
```bash
# Opción A — Supabase CLI (recomendado)
supabase link --project-ref <REF>
supabase db push                       # aplica migrations/
psql "$DATABASE_URL" -f seed/0002_seed_catalog.sql

# Opción B — Editor SQL del dashboard: pega 0001 y luego 0002.
```

## Después
- **Embeddings del RAG:** los chunks entran sin `embedding`. Rellenarlos con un backfill (text-embedding-004
  de Gemini o Voyage) — mismo patrón que `scripts/backfill-embeddings.mjs` del CRM. Hasta entonces el RAG
  usa FTS (`tsv`), que ya funciona.
- **Usuarios:** se crean por Supabase Auth (signup / magic link). Tras el primer login, insertar su fila en
  `profiles` (rol joseph/familiar/paciente/medico).
- **Regenerar el seed** si cambia el conocimiento: `cd seed && python generate_seed.py`.

> El servicio `intelligence/` puede apuntarse a Postgres/Supabase en vez de SQLite en una iteración futura
> (hoy usa SQLite para correr sin credenciales). Ver CHECKLIST_HUMANO.md.
