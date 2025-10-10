# WebP Conversion Script för webdev-struktur
# Detta skript konverterar PNG-bilder till WebP-format i alla undermappar

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

Write-Host "WebP Conversion Script för webdev" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Hitta alla PNG-filer i alla undermappar
$pngFiles = Get-ChildItem -Recurse -Filter "*.png"

if ($pngFiles.Count -eq 0) {
    Write-Host "Inga PNG-bilder hittades att konvertera" -ForegroundColor Yellow
    exit 0
}

Write-Host "Hittade $($pngFiles.Count) PNG-bilder att konvertera:" -ForegroundColor Cyan
foreach ($file in $pngFiles) {
    $webpPath = Join-Path $file.DirectoryName ($file.BaseName + ".webp")
    if (Test-Path $webpPath) {
        Write-Host "  - $($file.FullName) (WebP finns redan)" -ForegroundColor Gray
    } else {
        Write-Host "  - $($file.FullName)" -ForegroundColor White
    }
}

Write-Host "`nBörjar konvertering..." -ForegroundColor Green

$successCount = 0
$errorCount = 0
$skippedCount = 0

foreach ($file in $pngFiles) {
    $inputPath = $file.FullName
    $outputPath = Join-Path $file.DirectoryName ($file.BaseName + ".webp")
    
    # Hoppa över om WebP redan finns
    if (Test-Path $outputPath) {
        Write-Host "Hoppar över: $($file.Name) (WebP finns redan)" -ForegroundColor Gray
        $skippedCount++
        continue
    }
    
    Write-Host "`nKonverterar: $($file.Name)" -ForegroundColor Yellow
    
    # Visa ursprunglig filstorlek
    $originalSize = [math]::Round($file.Length / 1KB, 2)
    Write-Host "Ursprunglig storlek: $originalSize KB" -ForegroundColor Gray
    
    # FFmpeg-kommando för WebP-konvertering
    $ffmpegArgs = @(
        "-i", "`"$inputPath`"",
        "-c:v", "libwebp",
        "-quality", "80",  # Kvalitet 0-100, 80 är en bra balans
        "-y",  # Skriv över befintliga filer
        "`"$outputPath`""
    )
    
    try {
        # Kör FFmpeg
        $process = Start-Process -FilePath "ffmpeg" -ArgumentList $ffmpegArgs -Wait -PassThru -NoNewWindow -RedirectStandardOutput "nul" -RedirectStandardError "error.log"
        
        if ($process.ExitCode -eq 0) {
            # Kontrollera output-fil
            if (Test-Path $outputPath) {
                $webpSize = [math]::Round((Get-Item $outputPath).Length / 1KB, 2)
                $compressionRatio = [math]::Round((1 - $webpSize / $originalSize) * 100, 1)
                
                Write-Host "✓ WebP-storlek: $webpSize KB" -ForegroundColor Green
                Write-Host "✓ Komprimering: $compressionRatio% mindre" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host "✗ WebP-fil skapades inte" -ForegroundColor Red
                $errorCount++
            }
        } else {
            Write-Host "✗ FFmpeg misslyckades med exit code: $($process.ExitCode)" -ForegroundColor Red
            $errorCount++
        }
    }
    catch {
        Write-Host "✗ Fel vid konvertering: $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

# Sammanfattning
Write-Host "`n" + "="*50 -ForegroundColor Cyan
Write-Host "WEBP KONVERTERING KLAR" -ForegroundColor Cyan
Write-Host "="*50 -ForegroundColor Cyan
Write-Host "Lyckade: $successCount" -ForegroundColor Green
Write-Host "Hoppade över: $skippedCount" -ForegroundColor Yellow
Write-Host "Misslyckade: $errorCount" -ForegroundColor Red
Write-Host "Totalt: $($pngFiles.Count)" -ForegroundColor White

if ($successCount -gt 0) {
    Write-Host "`nWebP-filer skapade i webdev-mappar" -ForegroundColor Green
}

Write-Host "`nTryck på valfri tangent för att avsluta..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
