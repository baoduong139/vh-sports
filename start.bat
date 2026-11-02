@echo off
title VH Sports - Figma Canvas View Launcher
color 0A
echo ===================================================
echo     KHOI DONG HE THONG FIGMA CANVAS - VH SPORTS
echo ===================================================
echo.
echo Dang khoi dong may chu web va mo trinh duyet...
echo.

python server.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Khong tim thay Python! Dang mo truc tiep index.html qua trinh duyet...
    start index.html
)
pause

