@echo off
@REM Primero guardamos la ruta actual del cmd
set "ruta_actual=%cd%"
@REM Vamos a la ruta de este archivo
cd %~dp0
@REM Salimos del directorio
cd ..
@REM Ponemos como ruta para ejecutar la raiz del proyecto de comandos
set "ruta=%cd%\src\"
@REM Regresamos el cmd a la ruta donde estaba
cd %ruta_actual%