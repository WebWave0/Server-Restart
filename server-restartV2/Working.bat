@echo off
REM Название задачи: Working.bat
:loop
echo Working
ping 127.0.0.1 -n 6 > nul
goto loop
