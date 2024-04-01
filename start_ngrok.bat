@echo off

set /p puerto="Ingrese el puerto que desea usar: "

echo Iniciando ngrok...
start "" ngrok http --domain=urgently-tight-swan.ngrok-free.app %puerto%
if %errorlevel% neq 0 (
    echo Fallo al iniciar ngrok. Código de error: %errorlevel%
    pause
    exit /b %errorlevel%
)