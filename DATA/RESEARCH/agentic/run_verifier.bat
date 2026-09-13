@echo off
REM ─────────────────────────────────────────────────────────────────────────
REM run_verifier.bat — GATE DE CITAS + ENSAMBLADO .docx con salida UTF-8 en Windows.
REM Palmerton v3b · gap 6 (12-sep-2026): citation_verifier.py se caía en PowerShell/cmd con
REM UnicodeEncodeError (cp1252/850) al imprimir emojis. Este .bat fija PYTHONIOENCODING=utf-8
REM y los scripts ya imprimen veredictos ASCII ([OK] / [?] / [X] / [!]).
REM
REM USO (desde cualquier carpeta; el .bat se coloca solo en DATA\RESEARCH\agentic):
REM   run_verifier.bat                                  self-test del gate (DOI real vs DOI falso vs solo título)
REM   run_verifier.bat doi 10.1177/1090820X14525035     verifica UN DOI   (3er arg opcional: "título")
REM   run_verifier.bat pmid 24515216                    verifica UN PMID  (3er arg opcional: "título")
REM   run_verifier.bat refs ..\CARTA_1\refs.json        verifica una lista [{id,doi?,pmid?,title?,year?},…]
REM   run_verifier.bat letter ..\CARTA_1\carta.json [salida.docx]        C-4/C-5 · carta al editor (≤500 palabras · ≤5 refs)
REM   run_verifier.bat strobe ..\TESIS_L0\letter.json [salida.docx]      T-7 · research letter STROBE (tesis L0)
REM   run_verifier.bat care ..\CASE_REPORT_1\case.json [salida.docx]     CR-7 · case report CARE (13 ítems + timeline)
REM   run_verifier.bat sr ..\SR-1\manuscrito.json [salida.docx]          R41 · revisión sistemática PRISMA 2020
REM   run_verifier.bat demo letter|strobe|care|sr                        esqueleto de demostración (gate en vivo salvo care)
REM
REM El JSON de entrada es lo que devuelven las plantillas prompts_claude_code\{letter_to_editor,
REM research_letter_STROBE,case_report_CARE}.md. Código de salida: 0 = listo · 1 = NO listo (refs [?]/[X],
REM límite de palabras, marcadores sin verificar) · 2 = no se generó el .docx (faltan secciones obligatorias).
REM ─────────────────────────────────────────────────────────────────────────
setlocal
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
if "%CONTACT_EMAIL%"=="" set CONTACT_EMAIL=josephsototocas@gmail.com
REM (opcional, gratis) set NCBI_KEY=...   → sube PubMed de 3 a 10 req/s
set DIR=%~dp0
pushd "%DIR%"

if "%~1"=="" goto selftest
if /I "%~1"=="doi"    goto one
if /I "%~1"=="pmid"   goto one
if /I "%~1"=="refs"   goto refs
if /I "%~1"=="demo"   goto demo
if /I "%~1"=="letter" goto build
if /I "%~1"=="strobe" goto build
if /I "%~1"=="care"   goto build
if /I "%~1"=="sr"     goto build
echo [X] uso desconocido: %~1  (ver cabecera de run_verifier.bat)
set RC=2
goto fin

:selftest
echo [GATE] self-test en vivo (Crossref + PubMed)...
python "%DIR%citation_verifier.py"
set RC=%ERRORLEVEL%
goto fin

:one
if "%~2"=="" ( echo [X] falta el identificador: run_verifier.bat %~1 ^<valor^> & set RC=2 & goto fin )
if "%~3"=="" (
  python "%DIR%citation_verifier.py" --%~1 "%~2"
) else (
  python "%DIR%citation_verifier.py" --%~1 "%~2" --title "%~3"
)
set RC=%ERRORLEVEL%
goto fin

:refs
if "%~2"=="" ( echo [X] falta el JSON: run_verifier.bat refs ^<refs.json^> & set RC=2 & goto fin )
python "%DIR%citation_verifier.py" --refs "%~2"
set RC=%ERRORLEVEL%
goto fin

:demo
if "%~2"=="" ( echo [X] falta la plantilla: run_verifier.bat demo letter^|strobe^|care^|sr & set RC=2 & goto fin )
if /I "%~2"=="care" (
  python "%DIR%docx_assembler.py" --template care --demo --no-verify --out "%DIR%_demo_care.docx"
) else (
  python "%DIR%docx_assembler.py" --template %~2 --demo --out "%DIR%_demo_%~2.docx"
)
set RC=%ERRORLEVEL%
goto fin

:build
if "%~2"=="" ( echo [X] falta el JSON de entrada: run_verifier.bat %~1 ^<entrada.json^> [salida.docx] & set RC=2 & goto fin )
set OUT=%~3
if "%OUT%"=="" set OUT=%~dpn2_v1.docx
echo [DOCX] plantilla=%~1  entrada=%~2  salida=%OUT%
python "%DIR%docx_assembler.py" --template %~1 --in "%~2" --out "%OUT%"
set RC=%ERRORLEVEL%
goto fin

:fin
popd
if "%RC%"=="0" ( echo [OK] terminado sin bloqueos ) else ( echo [!] codigo de salida %RC% — revisar los [?]/[X] de arriba )
endlocal & exit /b %RC%
