@echo off

@REM Se obtiene el primer argumento
goto %1

@REM Muestra los comandos disponibles
:help
echo CMD-EXT COMMANDS
echo - cmd-ext help - Show the available commands list
echo - cmd-ext update (to get the latest changes)
echo.
echo COMMANDS
echo - ls [dir] - List the information about the files in the selected directory (current by default)
echo - cat [file] - Display the file content
echo - fetch [url] ... [url] - Fetch info from urls
echo - touch [name] ... [name] - Create files
goto end

@REM Obtiene los cambios del repositorio remoto
:update
git pull origin main
goto end

:end