@echo off
REM ─────────────────────────────────────────────────────────────────────────
REM run_research_free.bat — arranca el RUNNER (el puente) en TU PC, $0.
REM Queda esperando tus botones de la app (Research → Sistema agéntico):
REM   ▶ Iniciar  → corre el discovery     ⏸ Pausar / ⏹ Detener → cortan el gasto
REM Mientras estudias ENCAPS por la mañana y pulsas ▶, esto descubre/criba; al día
REM siguiente sigue SOLO si dejas la PC encendida (si la apagas, se detiene).
REM
REM Auto-arrancar al iniciar sesion (una vez, cmd):
REM   schtasks /Create /SC ONLOGON /TR "D:\joseph-md-app\DATA\RESEARCH\agentic\run_research_free.bat" /TN "Research Runner"
REM Quitar:  schtasks /Delete /TN "Research Runner" /F
REM ─────────────────────────────────────────────────────────────────────────
setlocal
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
set CONTACT_EMAIL=josephsototocas@gmail.com
set SUPABASE_URL=https://qacynpqdrorpuegsmtcy.supabase.co
REM OBLIGATORIO para que el runner escriba el estado (Supabase -> Settings -> API -> service_role):
REM set SUPABASE_SERVICE_KEY=...
REM (opcionales, todos GRATIS):
REM set OPENALEX_KEY=...   (openalex.org/settings/api · 30s · $1/dia gratis)
REM set NCBI_KEY=...       (sube PubMed 3->10 req/s)
REM Redaccion = Claude Code (tu plan Max). NO se usa Gemini (lo reservas para los anuncios).

set DIR=%~dp0
cd /d "%DIR%"
echo [%date% %time%] Arrancando research_runner (espera tus botones de la app)...
python "%DIR%research_runner.py"
endlocal
