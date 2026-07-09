# FFmpeg Video Compression Script
# Detta skript komprimerar alla MP4-videor i videos-mappen

# Kontrollera om FFmpeg är installerat
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    # Försök hitta FFmpeg i vanliga installationsplatser
    $ffmpegPaths = @(
        "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0-full_build\bin\ffmpeg.exe",
        "C:\Program Files\ffmpeg\bin\ffmpeg.exe",
        "C:\ffmpeg\bin\ffmpeg.exe"
    )
    
    $ffmpegFound = $false
    foreach ($path in $ffmpegPaths) {
        if (Test-Path $path) {
            $env:PATH += ";$(Split-Path $path)"
            $ffmpegFound = $true
            Write-Host "Hittade FFmpeg på: $path" -ForegroundColor Green
            break
        }
    }
    
    if (-not $ffmpegFound) {
        Write-Host "FFmpeg är inte installerat eller inte tillgängligt i PATH." -ForegroundColor Red
        Write-Host "Installera FFmpeg med: winget install ffmpeg" -ForegroundColor Yellow
        exit 1
    }
}

# Sätt sökvägar
$inputDir = "videos"
$outputDir = "videos\compressed"

# Skapa output-mapp om den inte finns
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
    Write-Host "Skapade output-mapp: $outputDir" -ForegroundColor Green
}

# Hitta alla MP4-filer
$videoFiles = Get-ChildItem -Path $inputDir -Filter "*.mp4"

if ($videoFiles.Count -eq 0) {
    Write-Host "Inga MP4-filer hittades i $inputDir" -ForegroundColor Yellow
    exit 0
}

Write-Host "Hittade $($videoFiles.Count) videofiler att komprimera:" -ForegroundColor Cyan
foreach ($file in $videoFiles) {
    Write-Host "  - $($file.Name)" -ForegroundColor White
}

Write-Host "`nBörjar komprimering..." -ForegroundColor Green

# Komprimeringsinställningar
$compressionSettings = @{
    VideoCodec = "libx264"
    VideoBitrate = "1000k"  # 1 Mbps - justera efter behov
    AudioCodec = "aac"
    AudioBitrate = "128k"
    Preset = "medium"       # medium, fast, slow - justera efter kvalitet/snabbhet
    CRF = "23"              # Constant Rate Factor (18-28, lägre = bättre kvalitet)
}

$successCount = 0
$errorCount = 0

foreach ($file in $videoFiles) {
    $inputPath = $file.FullName
    $outputPath = Join-Path $outputDir $file.Name
    
    Write-Host "`nKomprimerar: $($file.Name)" -ForegroundColor Yellow
    
    # Visa ursprunglig filstorlek
    $originalSize = [math]::Round($file.Length / 1MB, 2)
    Write-Host "Ursprunglig storlek: $originalSize MB" -ForegroundColor Gray
    
    # FFmpeg-kommando
    $ffmpegArgs = @(
        "-i", "`"$inputPath`"",
        "-c:v", $compressionSettings.VideoCodec,
        "-b:v", $compressionSettings.VideoBitrate,
        "-c:a", $compressionSettings.AudioCodec,
        "-b:a", $compressionSettings.AudioBitrate,
        "-preset", $compressionSettings.Preset,
        "-crf", $compressionSettings.CRF,
        "-movflags", "+faststart",  # Optimering för webbläsare
        "-y",  # Skriv över befintliga filer
        "`"$outputPath`""
    )
    
    try {
        # Kör FFmpeg
        $process = Start-Process -FilePath "ffmpeg" -ArgumentList $ffmpegArgs -Wait -PassThru -NoNewWindow -RedirectStandardOutput "nul" -RedirectStandardError "error.log"
        
        if ($process.ExitCode -eq 0) {
            # Kontrollera output-fil
            if (Test-Path $outputPath) {
                $compressedSize = [math]::Round((Get-Item $outputPath).Length / 1MB, 2)
                $compressionRatio = [math]::Round((1 - $compressedSize / $originalSize) * 100, 1)
                
                Write-Host "✓ Komprimerad storlek: $compressedSize MB" -ForegroundColor Green
                Write-Host "✓ Komprimering: $compressionRatio% mindre" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host "✗ Output-fil skapades inte" -ForegroundColor Red
                $errorCount++
            }
        } else {
            Write-Host "✗ FFmpeg misslyckades med exit code: $($process.ExitCode)" -ForegroundColor Red
            $errorCount++
        }
    }
    catch {
        Write-Host "✗ Fel vid komprimering: $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

# Sammanfattning
Write-Host "`n" + "="*50 -ForegroundColor Cyan
Write-Host "KOMPRIMERING KLAR" -ForegroundColor Cyan
Write-Host "="*50 -ForegroundColor Cyan
Write-Host "Lyckade: $successCount" -ForegroundColor Green
Write-Host "Misslyckade: $errorCount" -ForegroundColor Red
Write-Host "Totalt: $($videoFiles.Count)" -ForegroundColor White

if ($successCount -gt 0) {
    Write-Host "`nKomprimerade filer finns i: $outputDir" -ForegroundColor Green
}

Write-Host "`nTryck på valfri tangent för att avsluta..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
