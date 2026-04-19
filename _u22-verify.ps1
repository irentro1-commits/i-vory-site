Start-Sleep -Seconds 50
try {
  $r = Invoke-WebRequest -Uri "https://i-vory.ro/mobile-fx.js?v=22now" -Headers @{"Cache-Control"="no-cache"} -UseBasicParsing
  $c = $r.Content
  Write-Host ("LEN=" + $c.Length)
  if ($c -match "MFX22") { Write-Host "MARKER=FOUND-U22" } else { Write-Host "MARKER=STALE" }
  if ($c -match "data:image/svg") { Write-Host "LOGO-PREFIX=FOUND" } else { Write-Host "LOGO-PREFIX=MISSING" }
  if ($c -match "2\.2\+1\.2") { Write-Host "STARS-NEW=FOUND" } else { Write-Host "STARS-NEW=MISSING" }
  if ($c -match "COUNT=90") { Write-Host "COUNT=90" } else { Write-Host "COUNT=OLD" }
} catch {
  Write-Host ("ERR=" + $_.Exception.Message)
}
