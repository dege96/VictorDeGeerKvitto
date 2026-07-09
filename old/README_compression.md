# Video Compression Scripts

Detta projekt innehåller skript för att komprimera alla MP4-videor i `videos/`-mappen med FFmpeg.

## Förutsättningar

- FFmpeg måste vara installerat och tillgängligt i systemets PATH
- Ladda ner FFmpeg från: https://ffmpeg.org/download.html

## Tillgängliga skript

### 1. PowerShell-skript (`compress_videos.ps1`)
Det mest avancerade skriptet med detaljerad feedback och felhantering.

**Körning:**
```powershell
.\compress_videos.ps1
```

**Funktioner:**
- Automatisk kontroll av FFmpeg-installation
- Detaljerad progressrapportering
- Visar ursprunglig och komprimerad filstorlek
- Beräknar komprimeringsprocent
- Skapar automatiskt output-mapp
- Sammanfattning av resultat

### 2. Batch-skript (`compress_videos.bat`)
Enklare version för användare som föredrar batch-filer.

**Körning:**
```cmd
compress_videos.bat
```

## Komprimeringsinställningar

Skripten använder följande inställningar:
- **Video Codec:** H.264 (libx264)
- **Video Bitrate:** 1000 kbps
- **Audio Codec:** AAC
- **Audio Bitrate:** 128 kbps
- **Preset:** medium (balans mellan hastighet och kvalitet)
- **CRF:** 23 (Constant Rate Factor)
- **Web-optimering:** +faststart flagga för snabbare uppspelning

## Output

Komprimerade filer sparas i `videos/compressed/`-mappen med samma filnamn som originalet.

## Anpassning

Du kan enkelt ändra komprimeringsinställningarna genom att redigera följande variabler i PowerShell-skriptet:

```powershell
$compressionSettings = @{
    VideoBitrate = "1000k"  # Justera bitrate (500k-2000k)
    AudioBitrate = "128k"   # Justera audiobitrate (64k-256k)
    Preset = "medium"       # fast, medium, slow
    CRF = "23"              # 18-28 (lägre = bättre kvalitet)
}
```

## Tips

- **Högre kvalitet:** Sänk CRF till 18-20 eller öka video bitrate
- **Snabbare komprimering:** Ändra preset till "fast"
- **Mindre filer:** Öka CRF till 25-28 eller sänk video bitrate
- **Webb-optimering:** Behåll +faststart flaggan för bättre streaming
