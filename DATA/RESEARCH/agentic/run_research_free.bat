@echo off
REM ─────────────────────────────────────────────────────────────────────────
REM run_research_free.bat — corre el motor a $0 en TU PC (sin VPS, sin API de pago).
REM Lo dispara el Programador de tareas de Windows mientras estudias (PC encendido).
REM Registrar (una vez, cmd como admin) — corre L-V a las 06:00:
REM   schtasks /Create /SC WEEKLY /D MON,TUE,WED,THU,FRI /TR "D:\joseph-md-app\DATA\RESEARCH\agentic\run_research_free.bat" /TN "Research Discovery" /ST 06:00
REM Quitar:  schtasks /Delete /TN "Research Discovery" /F
REM ─────────────────────────────────────────────────────────────────────────
setlocal
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
set CONTACT_EMAIL=josephsototocas@gmail.com
REM (opcionales, todos GRATIS) — descomenta y pega tus keys:
REM set OPENALEX_KEY=...        (openalex.org/settings/api · 30s · $1/dia gratis)
REM set NCBI_KEY=...            (sube PubMed 3->10 req/s)
REM Redaccion = Claude Code (tu plan Max). NO se usa Gemini (lo reservas para los anuncios).

set DIR=%~dp0
cd /d "%DIR%"

echo [%date% %time%] DISCOVERY SR-1 (gratis)...
python "%DIR%discovery_engine.py" "(dermal filler OR hyaluronic acid filler) AND (vascular occlusion OR skin necrosis OR blindness) AND hyaluronidase" --line SR-1 --out "%DIR%corpus_SR-1.csv"

REM Redaccion GRATIS via Claude Code (tu Max): deja los prompts por seccion en prompts_claude_code\.
REM El "corre solo" es el DISCOVERY/screening/texto-completo (arriba, sin LLM). La prosa la generas
REM en Claude Code cuando te sientas (o dile "redacta SR-1") — fase R34-R40 del plan, con humano presente.
echo [%date% %time%] Generando prompts de redaccion (Claude Code)...
python "%DIR%agentic_writer.py" --sr SR-1 --engine claude_code --corpus "%DIR%corpus_SR-1.csv" --out "%DIR%SR-1_revision_v1.docx"

echo [%date% %time%] Listo. Revisa el corpus y el .docx en %DIR%
endlocal
