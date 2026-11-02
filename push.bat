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

echo [*] Dang kiem tra thay doi trong thu muc...
"%GIT_EXE%" add .

set /p COMMIT_MSG="[?] Nhap ghi chu cap nhat (Nhan Enter de dung mac dinh): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Cap nhat VH Sports: %date% %time%

"%GIT_EXE%" commit -m "%COMMIT_MSG%"

echo.
echo [*] Dang day code len GitHub: baoduong139/vh-sports...
"%GIT_EXE%" push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ================================================================
    echo  [✓] THANH CONG! Toan bo ma nguon da duoc dong bo len:
    echo      👉 https://github.com/baoduong139/vh-sports
    echo ================================================================
) else (
    echo.
    echo ----------------------------------------------------------------
    echo  [!] Thong bao: Neu tren GitHub chua co repo nay, ban chi can:
    echo      1. Mo trinh duyet vao: https://github.com/new
    echo      2. Dat ten Repository name la: vh-sports (chon Public hoac Private)
    echo      3. KHONG tich chon Add README, .gitignore
    echo      4. Bam nut xanh "Create repository"
    echo      5. Chay lai file push.bat nay la code tu dong len 100%!
    echo ----------------------------------------------------------------
)

echo.
pause
