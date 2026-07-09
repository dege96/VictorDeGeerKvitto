@echo off
REM FFmpeg Video Compression Script (Batch version)
REM Detta skript komprimerar alla MP4-videor i videos-mappen

echo FFmpeg Video Compression Script
echo ================================

REM Kontrollera om FFmpeg är installerat
ffmpeg -version >nul 2>&1
if errorlevel 1 (
    echo FFmpeg är inte installerat eller inte tillgängligt i PATH.
    echo Installera FFmpeg från https://ffmpeg.org/download.html
    pause
    exit /b 1
)

REM Skapa output-mapp
if not exist "videos\compressed" mkdir "videos\compressed"

echo Hittade följande videofiler att komprimera:
for %%f in (videos\*.mp4) do echo   - %%~nxf

echo.
echo Börjar komprimering...
echo.

set success=0
set error=0

REM Komprimera varje video
for %%f in (videos\*.mp4) do (
    echo Komprimerar: %%~nxf
    
    REM Visa ursprunglig filstorlek
    for %%s in ("%%f") do echo Ursprunglig storlek: %%~zs bytes
    
    REM FFmpeg-kommando
    ffmpeg -i "%%f" -c:v libx264 -b:v 1000k -c:a aac -b:a 128k -preset medium -crf 23 -movflags +faststart -y "videos\compressed\%%~nxf" >nul 2>&1
    
    if errorlevel 1 (
        echo ✗ Misslyckades med %%~nxf
        set /a error+=1
    ) else (
        echo ✓ Lyckades med %%~nxf
        set /a success+=1
    )
    echo.
)

echo ==========================================
echo KOMPRIMERING KLAR
echo ==========================================
echo Lyckade: %success%
echo Misslyckade: %error%
echo.
echo Komprimerade filer finns i: videos\compressed
echo.
pause
