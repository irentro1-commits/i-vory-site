$ErrorActionPreference = "Stop"
$out = "C:\Users\USER\Documents\i-vory\websites\ivory-ro\deploy\_u30_verify_out.txt"
if (Test-Path $out) { Remove-Item $out -Force }

$cb = Get-Random
$url = "https://i-vory.ro/?cb=$cb"

"=== U30 VERIFY LIVE ===" | Out-File -Append -Encoding utf8 $out
"URL: $url" | Out-File -Append -Encoding utf8 $out

try {
    $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
    $html = $resp.Content
    "HTML-LEN: $($html.Length)" | Out-File -Append -Encoding utf8 $out
    $cfCache = $resp.Headers["cf-cache-status"]
    if (-not $cfCache) { $cfCache = "NONE" }
    "CF-CACHE: $cfCache" | Out-File -Append -Encoding utf8 $out

    $probLineFix = if ($html -match "\.prob-line\s*\{\s*transition:\s*opacity \.25s") { "FOUND" } else { "MISSING" }
    "U30-PROBLINE-FAST: $probLineFix" | Out-File -Append -Encoding utf8 $out

    $probOverlayKill = if ($html -match "\.prob-overlay\s*\{\s*display:\s*none") { "FOUND" } else { "MISSING" }
    "U30-PROBOVERLAY-KILL: $probOverlayKill" | Out-File -Append -Encoding utf8 $out

    $probStickyContain = if ($html -match "\.prob-sticky\s*\{\s*contain:\s*layout style") { "FOUND" } else { "MISSING" }
    "U30-PROBSTICKY-CONTAIN: $probStickyContain" | Out-File -Append -Encoding utf8 $out

    $u30Marker = if ($html -match "U30:") { "FOUND" } else { "MISSING" }
    "U30-MARKER: $u30Marker" | Out-File -Append -Encoding utf8 $out

    $u29Stillthere = if ($html -match "U29: KILL \.bgblobs") { "FOUND" } else { "MISSING" }
    "U29-STILL-PRESENT: $u29Stillthere" | Out-File -Append -Encoding utf8 $out

    "DONE" | Out-File -Append -Encoding utf8 $out
} catch {
    "ERROR: $_" | Out-File -Append -Encoding utf8 $out
}

Get-Content $out
