Start-Sleep -Seconds 55
try {
  $r = Invoke-WebRequest -Uri "https://i-vory.ro/mobile-fx.js?v=24now" -Headers @{"Cache-Control"="no-cache"} -UseBasicParsing
  $c = $r.Content
  Write-Host ("LEN=" + $c.Length)
  if ($c -match "SOCIAL_ICONS") { Write-Host "SOCIAL=FOUND" } else { Write-Host "SOCIAL=MISSING" }
  if ($c -match "#1877F2") { Write-Host "FB-BLUE=FOUND" } else { Write-Host "FB-BLUE=MISSING" }
  if ($c -match "#FF0000") { Write-Host "YT-RED=FOUND" } else { Write-Host "YT-RED=MISSING" }
  if ($c -match "COUNT=140") { Write-Host "STARS=140" } else { Write-Host "STARS=OLD" }
  if ($c -match "mix-blend-mode:screen") { Write-Host "AURA-BLEND=FOUND" } else { Write-Host "AURA-BLEND=MISSING" }
} catch {
  Write-Host ("ERR=" + $_.Exception.Message)
}
