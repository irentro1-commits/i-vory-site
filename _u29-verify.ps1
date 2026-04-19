$ErrorActionPreference = "Stop"
$out = "C:\Users\USER\Documents\i-vory\websites\ivory-ro\deploy\_u29_verify_out.txt"
if (Test-Path $out) { Remove-Item $out -Force }

$cb = Get-Random
$url = "https://i-vory.ro/?cb=$cb"

"=== U29 VERIFY LIVE ===" | Out-File -Append -Encoding utf8 $out
"URL: $url" | Out-File -Append -Encoding utf8 $out

try {
    $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
    $html = $resp.Content
    "HTML-LEN: $($html.Length)" | Out-File -Append -Encoding utf8 $out
    $cfCache = $resp.Headers["cf-cache-status"]
    if (-not $cfCache) { $cfCache = "NONE" }
    "CF-CACHE: $cfCache" | Out-File -Append -Encoding utf8 $out

    $bgblobsKill = if ($html -match "\.bgblobs,\s*\.bgblobs\s*\.blob") { "FOUND" } else { "MISSING" }
    "U29-BGBLOBS-KILL: $bgblobsKill" | Out-File -Append -Encoding utf8 $out

    $preGlowKill = if ($html -match "U29: kill \.pre-glow") { "FOUND" } else { "MISSING" }
    "U29-PREGLOW-KILL: $preGlowKill" | Out-File -Append -Encoding utf8 $out

    $u29Marker = if ($html -match "U29:") { "FOUND" } else { "MISSING" }
    "U29-MARKER: $u29Marker" | Out-File -Append -Encoding utf8 $out

    $u28Marker = if ($html -match "U28 FIX") { "FOUND" } else { "MISSING" }
    "U28-STILL-PRESENT: $u28Marker" | Out-File -Append -Encoding utf8 $out

    # Count backdrop-filter occurrences (should exist but inside mobile-perf-v4 block becomes none)
    $bdf = ([regex]::Matches($html, "backdrop-filter")).Count
    "BACKDROP-FILTER-REFS: $bdf" | Out-File -Append -Encoding utf8 $out

    # Count filter:blur references
    $fblur = ([regex]::Matches($html, "filter:\s*blur")).Count
    "FILTER-BLUR-REFS: $fblur" | Out-File -Append -Encoding utf8 $out

    "DONE" | Out-File -Append -Encoding utf8 $out
} catch {
    "ERROR: $_" | Out-File -Append -Encoding utf8 $out
}

Get-Content $out
