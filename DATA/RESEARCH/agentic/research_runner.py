#!/usr/bin/env python3
"""
research_runner.py — el PUENTE: ejecuta en tu PC lo que pulsas en la app.
Poll-ea Supabase (research_commands + research_engine_state) y actúa: ▶ Iniciar corre el discovery,
⏸ Pausar / ⏹ Detener cortan el trabajo (y el gasto de tokens), ↻ regenerar marca una sección, y el
feedback por voz/texto se registra para aplicarlo al redactar. Stdlib-only (urllib + subprocess).

Arranca con run_research_free.bat (queda corriendo mientras la PC esté encendida). Mientras estudias
ENCAPS por la mañana y pulsas ▶, esto descubre/criba; al pulsar ⏹ se detiene; al día siguiente sigue
SOLO si dejaste la PC encendida.

ENV (server-side · NO en el navegador):
  SUPABASE_URL=https://qacynpqdrorpuegsmtcy.supabase.co
  SUPABASE_SERVICE_KEY=...   (Supabase → Settings → API → service_role · bypassa RLS para escribir papers/tasks)
  OPENALEX_KEY, NCBI_KEY, CONTACT_EMAIL  (opcionales, gratis)
"""
import os, sys, json, time, subprocess, urllib.request, urllib.parse

URL = os.environ.get("SUPABASE_URL", "https://qacynpqdrorpuegsmtcy.supabase.co")
KEY = os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("SUPABASE_ANON_KEY", "")
DIR = os.path.dirname(os.path.abspath(__file__))
POLL = int(os.environ.get("RUNNER_POLL_SEC", "20"))
H = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

# Query booleana por línea (la del discovery)
QUERIES = {
    "L4": '(dermal filler OR hyaluronic acid filler) AND (vascular occlusion OR skin necrosis OR blindness) AND hyaluronidase',
    "L5": '(fractional radiofrequency microneedling OR fractional CO2 laser) AND (skin of color OR Fitzpatrick IV OR Fitzpatrick V OR Fitzpatrick VI) AND (acne scar OR rejuvenation)',
}
SR_OF = {"L4": "SR-1", "L5": "SR-2"}


def _req(method, path, body=None):
    req = urllib.request.Request(f"{URL}/rest/v1/{path}", method=method,
                                 data=json.dumps(body).encode() if body is not None else None, headers=H)
    with urllib.request.urlopen(req, timeout=30) as r:
        txt = r.read().decode()
        return json.loads(txt) if txt.strip() else []


def get_state():
    try:
        rows = _req("GET", "research_engine_state?id=eq.1&select=run_state,active_line")
        return rows[0] if rows else {}
    except Exception:
        return {}


def set_state(**patch):
    try:
        _req("PATCH", "research_engine_state?id=eq.1", patch)
    except Exception as e:
        print("  ! set_state:", str(e)[:100])


def pending_commands():
    try:
        return _req("GET", "research_commands?status=eq.pending&order=created_at.asc&select=*")
    except Exception:
        return []


def mark(cmd_id, status="done"):
    try:
        _req("PATCH", f"research_commands?id=eq.{cmd_id}", {"status": status})
    except Exception:
        pass


def set_agents(line, mapping):
    """mapping = {agent: estado}. Requiere service_role (RLS de solo-lectura para anon)."""
    for agent, estado in mapping.items():
        try:
            _req("PATCH", f"research_agent_tasks?line=eq.{urllib.parse.quote(line)}&agent=eq.{agent}", {"estado": estado})
        except Exception:
            pass


def run_discovery(line):
    q = QUERIES.get(line, QUERIES["L4"])
    out = os.path.join(DIR, f"corpus_{SR_OF.get(line,'SR')}.csv")
    print(f"  ▶ discovery {line} → {out}")
    p = subprocess.run([sys.executable, os.path.join(DIR, "discovery_engine.py"), q,
                        "--line", SR_OF.get(line, "SR"), "--out", out],
                       capture_output=True, text=True, cwd=DIR,
                       env={**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"})
    n = 0
    try:
        with open(out, encoding="utf-8") as f:
            n = sum(1 for _ in f) - 1
    except Exception:
        pass
    print((p.stdout or "")[-400:])
    return n


def handle(cmd):
    line = cmd.get("line") or "L4"
    kind = cmd["kind"]
    if kind == "start":
        set_state(run_state="running", active_line=line)
        set_agents(line, {"lead": "working"})
        n = run_discovery(line)
        # paró el usuario mientras corría?
        if get_state().get("run_state") == "stopped":
            return
        set_state(run_state="running", active_line=line, papers_today=n,
                  next_checkpoint="Screening 2 revisores (R17-R21)")
        set_agents(line, {"lead": "working", "intro": "queued", "methods": "queued"})
        print(f"  ✓ {n} papers · cola lista (revisa/criba en tu hora de research)")
    elif kind == "pause":
        set_state(run_state="paused")
    elif kind == "stop":
        set_state(run_state="stopped")
        set_agents(line, {k: "idle" for k in ["lead", "intro", "methods", "results", "discuss", "citation", "assembler"]})
        print("  ⏹ detenido (no se consumen más tokens)")
    elif kind == "regenerate":
        ag = cmd.get("agent")
        if ag:
            set_agents(line, {ag: "queued"})
            subprocess.run([sys.executable, os.path.join(DIR, "agentic_writer.py"),
                            "--sr", SR_OF.get(line, "SR-1"), "--engine", "claude_code"], cwd=DIR)
            print(f"  ↻ {ag}: prompt listo en prompts_claude_code/ (redacta en Claude Code)")
    elif kind == "feedback":
        tgt = cmd.get("target") or "orquestador"
        print(f"  🗣️ feedback → {tgt}: {cmd.get('payload','')[:160]}")
        # se aplica al redactar (Claude Code); queda registrado en research_commands.


def main():
    if not KEY:
        print("Falta SUPABASE_SERVICE_KEY (o ANON). Pega la service_role en el entorno y reinicia.")
        sys.exit(1)
    print(f"🟢 research_runner activo · poll {POLL}s · {URL}\n   Pulsa ▶/⏸/⏹ en la app (Research → Sistema agéntico).")
    while True:
        try:
            st = get_state().get("run_state", "idle")
            for cmd in pending_commands():
                print(f"[{time.strftime('%H:%M:%S')}] {cmd['kind']} · {cmd.get('line','')} {cmd.get('agent') or ''}")
                handle(cmd)
                mark(cmd["id"])
        except Exception as e:
            print("  ! loop:", str(e)[:120])
        time.sleep(POLL)


if __name__ == "__main__":
    main()
