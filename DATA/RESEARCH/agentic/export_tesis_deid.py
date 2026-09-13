#!/usr/bin/env python3
"""
export_tesis_deid.py — DE-IDENTIFICACIÓN de la base de datos de la tesis L0 (IGA × CADI · adolescentes · Huancayo 2026).
Palmerton v3b · gap 11 (12-sep-2026). Lee D:\\motor_apex\\datos_tesis_acne.xlsx (hoja "BASE DATOS": 1.256 filas,
ID P-001…, edad, grado, sección, IGA, CADI 1-5, fecha, observaciones; sin nombres) y escribe un CSV apto para el
"data availability statement" (T-7) y el depósito OSF/Zenodo, SIN cuasi-identificadores de menores (Ley 29733):

  FILTRA    solo las 865 EVALUADAS (ID P-###). Las filas A-### (ausentes, 100), NC-### (sin consentimiento parental, 271)
            y R-### (la alumna rechazó, 20) NO llevan datos clínicos pero sí grado + sección + fecha + observación de texto
            libre → se EXCLUYEN del CSV y solo cuentan en _manifest.json (flujo STROBE).
  ELIMINA   N°, sección (A-E), fecha de evaluación, observaciones (texto libre) y la descripción textual del IGA
  CONSERVA  edad, grado, IGA (0-4), CADI 1-5, CADI total, clasificación CADI (etiqueta literal), registro completo (S/N)
  RE-HASH   ID → id_hash = sha256(SAL|ID)[:12]. La SAL vive en _deid/.salt (gitignored; se genera la 1ª vez o
            viene de la variable TESIS_SALT) → el mapa ID↔hash NO se puede reconstruir desde el CSV ni desde el repo.

Salida (DATA/RESEARCH/TESIS_L0/_deid/, gitignored salvo README/.gitignore):
  datos_tesis_acne_deid.csv     una fila por EVALUADA (n = 865, incl. 80 incompletas e IGA 0; la muestra analítica = 316)
  _manifest.json                flujo (1.256 → 291 → 100 → 865 → 785 → 316), sha256 del CSV, columnas, fecha — SIN datos individuales
STDLIB-ONLY (zipfile + regex sobre el OOXML del .xlsx): no necesita openpyxl (no instalado en este PC el 12-sep-2026).
NO sube nada a ningún sitio: el depósito en OSF/Zenodo es un paso manual de Joseph (T-7) tras revisar el CSV.

USO:  python export_tesis_deid.py                       # lee la ruta por defecto, escribe _deid/
      python export_tesis_deid.py --xlsx <ruta.xlsx> --out <carpeta> [--dry-run] [--salt <texto>]
"""
import os, sys, re, csv, json, zipfile, hashlib, argparse, secrets, datetime

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

HERE = os.path.dirname(os.path.abspath(__file__))
XLSX_DEFAULT = r"D:\motor_apex\datos_tesis_acne.xlsx"
OUT_DEFAULT = os.path.normpath(os.path.join(HERE, "..", "TESIS_L0", "_deid"))
SHEET_NAME_CONTAINS = "BASE DATOS"

# Columnas de la hoja (fila de cabecera = la que tiene "ID" en B) → nombre de salida. None = se ELIMINA.
COLMAP = {
    "N°": None,
    "ID": "id_hash",
    "Edad": "edad",
    "Grado": "grado",
    "Sección": None,             # cuasi-identificador (colegio nombrado + grado + sección + edad + fecha)
    "IGA": "iga",
    "Descripción IGA": None,     # texto derivado del IGA (se re-deriva; no aporta)
    "CADI 1": "cadi_1", "CADI 2": "cadi_2", "CADI 3": "cadi_3", "CADI 4": "cadi_4", "CADI 5": "cadi_5",
    "CADI Total": "cadi_total",
    "Clasif. CADI": "clasif_cadi",
    "Registro Completo": "registro_completo",
    "Fecha Evaluación": None,    # cuasi-identificador (fecha exacta del tamizaje por aula)
    "Observaciones": None,       # texto libre: puede contener datos identificables
}
ORDEN_SALIDA = ["id_hash", "edad", "grado", "iga", "cadi_1", "cadi_2", "cadi_3", "cadi_4", "cadi_5", "cadi_total", "clasif_cadi", "registro_completo"]
NUMERICAS = {"edad", "grado", "iga", "cadi_1", "cadi_2", "cadi_3", "cadi_4", "cadi_5", "cadi_total"}
VACIOS = {"", "–", "—", "-", "n/a", "na"}


# ───────────── lector .xlsx stdlib (OOXML) ─────────────
def _shared_strings(z):
    try:
        xml = z.read("xl/sharedStrings.xml").decode("utf-8")
    except KeyError:
        return []
    return [re.sub(r"<[^>]+>", "", m) for m in re.findall(r"<si>(.*?)</si>", xml, re.S)]


def _sheet_path(z, name_contains):
    wb = z.read("xl/workbook.xml").decode("utf-8")
    rels = z.read("xl/_rels/workbook.xml.rels").decode("utf-8")
    rid_of = {n: r for n, r in re.findall(r'<sheet [^>]*name="([^"]+)"[^>]*r:id="([^"]+)"', wb)}
    target_of = {i: t for i, t in re.findall(r'Id="([^"]+)"[^>]*Target="([^"]+)"', rels)}
    for name, rid in rid_of.items():
        if name_contains.lower() in name.lower():
            t = target_of[rid]
            return name, ("xl/" + t) if not t.startswith("/") else t.lstrip("/")
    raise SystemExit(f"[X] no hay hoja cuyo nombre contenga '{name_contains}' (hojas: {list(rid_of)})")


def _unescape(s):
    return s.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", '"').replace("&apos;", "'")


def read_sheet(xlsx, name_contains):
    """Devuelve (nombre_hoja, filas) con filas = lista de dict {letra_columna: valor_str}."""
    z = zipfile.ZipFile(xlsx)
    strings = _shared_strings(z)
    name, path = _sheet_path(z, name_contains)
    xml = z.read(path).decode("utf-8")
    out = []
    for rn, body in re.findall(r'<row [^>]*r="(\d+)"[^>]*>(.*?)</row>', xml, re.S):
        row = {}
        for c in re.findall(r"(<c [^>]*?(?:/>|>.*?</c>))", body, re.S):
            ref = re.search(r'r="([A-Z]+)\d+"', c)
            if not ref:
                continue
            col = ref.group(1)
            t = re.search(r'\bt="(\w+)"', c)
            v = re.search(r"<v>(.*?)</v>", c, re.S)
            if v is None:
                v2 = re.search(r"<is>.*?<t[^>]*>(.*?)</t>.*?</is>", c, re.S)
                row[col] = _unescape(v2.group(1)) if v2 else ""
                continue
            val = v.group(1)
            if t and t.group(1) == "s":
                val = strings[int(val)]
            elif t and t.group(1) == "str":
                val = _unescape(val)
            row[col] = val
        if row:
            row["_r"] = int(rn)
            out.append(row)
    return name, out


def _norm_header(h):
    h = re.sub(r"\s+", " ", h.replace("\r", " ").replace("\n", " ")).strip()
    return re.sub(r"\s*\([^)]*\)\s*$", "", h).strip()   # quita "(años)", "(0–4)", "(A–E)" …


def _num(v):
    """'3' / '3.0' → '3'; '' / '–' / texto → '' (las columnas numéricas nunca llevan texto en el CSV)."""
    if v is None or str(v).strip().lower() in VACIOS:
        return ""
    try:
        f = float(v)
        return str(int(f)) if f.is_integer() else str(f)
    except ValueError:
        return ""


def _completo(v):
    """'✓ Completo' → 'S' · '⚠ Pendiente' → 'N' (valores literales de la hoja el 12-sep-2026); otro texto → tal cual."""
    t = str(v or "").strip()
    tl = t.lower()
    if "completo" in tl or tl in ("s", "si", "sí", "1", "true"):
        return "S"
    if "pendiente" in tl or "incompleto" in tl or tl in ("n", "no", "0", "false"):
        return "N"
    return t


def _texto(v):
    t = str(v or "").strip()
    return "" if t.lower() in VACIOS else t


# ───────────── de-identificación ─────────────
def cargar_o_crear_sal(out_dir, salt_arg):
    if salt_arg:
        return salt_arg
    env = os.environ.get("TESIS_SALT")
    if env:
        return env
    p = os.path.join(out_dir, ".salt")
    if os.path.exists(p):
        with open(p, encoding="utf-8") as f:
            return f.read().strip()
    salt = secrets.token_hex(32)
    os.makedirs(out_dir, exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        f.write(salt + "\n")
    return salt


def deid(filas, sal):
    hdr_row = next((r for r in filas if r.get("B", "").strip() == "ID"), None)
    if not hdr_row:
        raise SystemExit("[X] no encuentro la fila de cabecera (columna B == 'ID')")
    col_of = {}   # letra → nombre de salida
    for col, raw in hdr_row.items():
        if col == "_r":
            continue
        h = _norm_header(raw)
        if h in COLMAP:
            if COLMAP[h]:
                col_of[col] = COLMAP[h]
        elif raw.strip():
            print(f"[!] columna no mapeada (se ELIMINA por defecto): {col} = {h!r}")
    faltan = [k for k, v in COLMAP.items() if v and v not in col_of.values()]
    if faltan:
        raise SystemExit(f"[X] faltan columnas esperadas en la cabecera: {faltan}")
    id_col = next(c for c, n in col_of.items() if n == "id_hash")
    salida, ids_vistos = [], set()
    flujo = {"P": 0, "A": 0, "NC": 0, "R": 0, "otros": 0}   # evaluadas · ausentes · sin consentimiento parental · rechazó (alumna)
    for r in filas:
        if r["_r"] <= hdr_row["_r"]:
            continue
        rid = r.get(id_col, "").strip()
        m = re.match(r"^([A-Za-z]+)-(\d+)$", rid)
        if not m:
            continue   # totales / texto
        pref = m.group(1).upper()
        flujo[pref if pref in flujo else "otros"] += 1
        if pref != "P":
            continue   # no evaluadas: sin datos clínicos, con cuasi-identificadores + texto libre → fuera del CSV
        if rid in ids_vistos:
            print(f"[!] ID duplicado en la hoja: {rid} (fila {r['_r']}) → se conserva la primera")
            continue
        ids_vistos.add(rid)
        fila = {}
        for c, n in col_of.items():
            if n == "id_hash":
                continue
            v = r.get(c, "")
            fila[n] = _num(v) if n in NUMERICAS else (_completo(v) if n == "registro_completo" else _texto(v))
        fila["id_hash"] = hashlib.sha256((sal + "|" + rid).encode("utf-8")).hexdigest()[:12]
        salida.append({k: fila.get(k, "") for k in ORDEN_SALIDA})
    deid.flujo = flujo
    return salida


deid.flujo = {}


def resumen(rows):
    completos = [r for r in rows if r["registro_completo"] == "S"]
    iga1 = [r for r in completos if r["iga"] not in ("", "0")]
    return {"n": len(rows), "n_completos": len(completos), "n_iga_ge1_completos": len(iga1)}


def main(argv=None):
    ap = argparse.ArgumentParser(description="De-identifica la base de datos de la tesis L0 (stdlib).")
    ap.add_argument("--xlsx", default=XLSX_DEFAULT)
    ap.add_argument("--out", default=OUT_DEFAULT)
    ap.add_argument("--salt", help="sal explícita (si no: env TESIS_SALT o _deid/.salt)")
    ap.add_argument("--dry-run", action="store_true", help="solo cuenta; no escribe ficheros")
    a = ap.parse_args(argv)
    if not os.path.exists(a.xlsx):
        print(f"[X] no existe {a.xlsx} — A VERIFICAR (12-sep) la ruta de la base de datos de la tesis")
        return 2
    hoja, filas = read_sheet(a.xlsx, SHEET_NAME_CONTAINS)
    sal = "dry-run" if a.dry_run else cargar_o_crear_sal(a.out, a.salt)
    rows = deid(filas, sal)
    res = resumen(rows)
    fl = deid.flujo
    res.update({"n_matriculadas": sum(fl.values()), "n_sin_consentimiento_parental": fl["NC"], "n_rechazo_alumna": fl["R"],
                "n_ausentes": fl["A"], "n_evaluadas": fl["P"]})
    print(f"[OK] hoja '{hoja}': {res['n_matriculadas']} matriculadas → −{fl['NC'] + fl['R']} sin consentimiento ({fl['NC']} padres + {fl['R']} alumnas) "
          f"→ −{fl['A']} ausentes → {fl['P']} evaluadas → {res['n_completos']} completas → {res['n_iga_ge1_completos']} con IGA>=1 (muestra analítica)")
    esperado = {"n_matriculadas": 1256, "n_sin_consentimiento_parental": 271, "n_rechazo_alumna": 20, "n_ausentes": 100,
                "n_evaluadas": 865, "n_completos": 785, "n_iga_ge1_completos": 316}   # portada + FLUJO del .xlsx (leídos 12-sep-2026)
    for k, v in esperado.items():
        if res.get(k) != v:
            print(f"[!] {k} = {res.get(k)} ≠ {v} (portada del libro) — revisar antes de depositar")
    if a.dry_run:
        print("[dry-run] no se escribió nada")
        return 0
    os.makedirs(a.out, exist_ok=True)
    gi = os.path.join(a.out, ".gitignore")
    if not os.path.exists(gi):
        with open(gi, "w", encoding="utf-8") as f:
            f.write("# datos de menores de-identificados: NUNCA al repo (remoto GitHub). Solo se versionan este .gitignore y el README.\n*.csv\n.salt\n_manifest.json\n")
    out_csv = os.path.join(a.out, "datos_tesis_acne_deid.csv")
    with open(out_csv, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=ORDEN_SALIDA)
        w.writeheader()
        w.writerows(rows)
    with open(out_csv, "rb") as f:
        sha = hashlib.sha256(f.read()).hexdigest()
    manifest = {
        "generado": datetime.datetime.now().isoformat(timespec="seconds"),
        "fuente": os.path.basename(a.xlsx), "hoja": hoja, "csv": os.path.basename(out_csv), "sha256_csv": sha,
        "columnas": ORDEN_SALIDA, "eliminadas": [k for k, v in COLMAP.items() if v is None],
        "hash_id": "sha256(SAL|ID)[:12] · SAL en _deid/.salt (gitignored) o env TESIS_SALT", **res,
        "filas_excluidas": "A-### ausentes · NC-### sin consentimiento parental · R-### rechazo de la alumna (sin datos clínicos; solo cuentan en el flujo)",
        "nota": "solo evaluadas; sin nombres/DNI/sección/fecha/observaciones; apto para data availability statement + depósito OSF/Zenodo (T-7) tras revisión de Joseph",
    }
    with open(os.path.join(a.out, "_manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=1)
    print(f"[OK] escrito {out_csv} ({len(rows)} filas · sha256 {sha[:16]}…) + _manifest.json · NO se sube a ningún sitio")
    return 0


if __name__ == "__main__":
    sys.exit(main())
