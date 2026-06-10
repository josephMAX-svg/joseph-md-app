"""Genera `0002_seed_catalog.sql` (alimentos peruanos + knowledge_base/chunks para el RAG)
a partir de las fuentes canónicas: `research/rag_chunks/knowledge.json` y la lista de
alimentos del servicio de inteligencia. Ejecutar:  python generate_seed.py

Así el catálogo de producción (Supabase) queda idéntico al que usa el servicio local.
Los embeddings se rellenan después con un backfill (ver CHECKLIST_HUMANO.md).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent  # PAGINA WEB EJERCICIO Y NUTRICION/
sys.path.insert(0, str(ROOT / "intelligence"))
from app.seed import FOODS_PERU  # noqa: E402  (reusa la MISMA lista de alimentos)

KNOWLEDGE = json.loads((ROOT / "research" / "rag_chunks" / "knowledge.json").read_text(encoding="utf-8"))


def q(s: str | None) -> str:
    if s is None:
        return "null"
    return "'" + str(s).replace("'", "''") + "'"


def main() -> None:
    out: list[str] = [
        "-- ============================================================",
        "-- 0002 · Seed de CATÁLOGO (alimentos peruanos + RAG). Generado por generate_seed.py.",
        "-- NO contiene datos de usuarios (esos vienen de auth.users tras el signup).",
        "-- ============================================================",
        "",
        "-- Alimentos peruanos (base tipo Fitia, reuso del CRM).",
    ]
    rows = []
    for (nombre, cat, kcal, prot, carb, grasa, pg, pn, peru) in FOODS_PERU:
        rows.append(f"  ({q(nombre)},{q(cat)},{kcal},{prot},{carb},{grasa},{pg},{q(pn)},{'true' if peru else 'false'})")
    out.append("insert into foods (nombre,categoria,kcal,proteina_g,carbo_g,grasa_g,porcion_g,porcion_nombre,es_peruano) values")
    out.append(",\n".join(rows) + "\non conflict do nothing;")
    out.append("")

    out.append("-- Base de conocimiento (RAG) + chunks. Embeddings se rellenan con backfill.")
    ns = KNOWLEDGE.get("namespace", "movimiento")
    out.append("do $$")
    out.append("declare kid uuid;")
    out.append("begin")
    for ch in KNOWLEDGE["chunks"]:
        tags = json.dumps(ch.get("tags", []), ensure_ascii=False)
        out.append("  kid := uuid_generate_v4();")
        out.append(
            f"  insert into knowledge_base (id,namespace,titulo,contenido,categoria,fuente,tags) "
            f"values (kid,{q(ns)},{q(ch['titulo'])},{q(ch['contenido'])},{q(ch.get('categoria'))},{q(ch.get('fuente'))},{q(tags)}::jsonb);"
        )
        chunk_text = f"{ch['titulo']}. {ch['contenido']}"
        out.append(f"  insert into knowledge_chunks (knowledge_id,chunk_index,contenido) values (kid,0,{q(chunk_text)});")
    out.append("end $$;")
    out.append("")

    target = HERE / "0002_seed_catalog.sql"
    target.write_text("\n".join(out), encoding="utf-8")
    print(f"Escrito: {target} ({len(FOODS_PERU)} alimentos, {len(KNOWLEDGE['chunks'])} chunks)")


if __name__ == "__main__":
    main()
