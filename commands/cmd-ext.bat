@echo off

@REM Se obtiene el primer argumento
goto %1

@REM Muestra los comandos disponibles
:help
echo CMD-EXT COMMANDS
echo - cmd-ext help - Show the available commands list
echo - cmd-ext update - Get the latest changes
echo.
echo COMMANDS
echo - ls [dir] - List the information about the files in the selected directory (current by default)
echo - cat [file] - Display the file content
echo - fetch [url] ... [url] - Fetch info from urls
echo - touch [name] ... [name] - Create files
goto end

@REM Obtiene los cambios del repositorio remoto
:update
@REM Se guarda la ruta actual del cmd
set "ruta_actual=%cd%"
@REM Vamos a la ruta del archivo para actualizar
cd %~dp0
@REM Actualizamos el código
git pull origin main
@REM Regresamos a la ruta
cd %ruta_actual%
goto end

:end