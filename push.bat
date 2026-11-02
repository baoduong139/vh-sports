@echo off
chcp 65001 >nul
title VH Sports - Đẩy Code Lên GitHub baoduong139

echo ================================================================
echo   ⚡ VH SPORTS - TỰ ĐỘNG ĐỒNG BỘ & CẬP NHẬT GITHUB (v4.0)
echo ================================================================
echo.

set "GIT_EXE=git"
where git >nul 2>&1
if %ERRORLEVEL% neq 0 (
    if exist "C:\Program Files\Microsoft Visual Studio\18\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe" (
        set "GIT_EXE=C:\Program Files\Microsoft Visual Studio\18\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe"
    ) else if exist "C:\Program Files\Git\cmd\git.exe" (
        set "GIT_EXE=C:\Program Files\Git\cmd\git.exe"
    ) else (
        echo [!] Khong tim thay Git trong may. Vui long cai dat Git tai https://git-scm.com/
        pause
        exit /b 1
    )
)

echo [*] Dang kiem tra trang thai thu muc...
"%GIT_EXE%" add .

set /p COMMIT_MSG="[?] Nhap ghi chu commit (Enter de dung mac dinh): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update VH Sports E-Commerce & Figma Canvas: %date% %time%

"%GIT_EXE%" commit -m "%COMMIT_MSG%"

echo.
echo [*] Dang day code len GitHub: baoduong139/vh-sports...
"%GIT_EXE%" push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo [✓] THANH CONG! Code da duoc day len: https://github.com/baoduong139/vh-sports
) else (
    echo.
    echo [!] Neu bao "Repository not found", ban can tao repo moi tai:
    echo     👉 https://github.com/new voi ten la: vh-sports
    echo.
    echo Sau khi tao xong repo tren web, hay chay lai file nay!
)

echo.
echo ================================================================
pause
