Start-Sleep -Seconds 55
try {
  $r = Invoke-WebRequest -Uri "https://i-vory.ro/mobile-fx.js?v=23now" -Headers @{"Cache-Control"="no-cache"} -UseBasicParsing
  $c = $r.Content
  Write-Host ("LEN=" + $c.Length)
  if ($c -match "mfxOrbitCW") { Write-Host "KEYFRAME-CW=FOUND" } else { Write-Host "KEYFRAME-CW=MISSING" }
  if ($c -match "mfxOrbitCCW") { Write-Host "KEYFRAME-CCW=FOUND" } else { Write-Host "KEYFRAME-CCW=MISSING" }
  if ($c -match "makeOrbit") { Write-Host "ORBIT-FN=FOUND" } else { Write-Host "ORBIT-FN=MISSING" }
  if ($c -match "ringBase") { Write-Host "RING-BASE=FOUND" } else { Write-Host "RING-BASE=MISSING" }
} catch {
  Write-Host ("ERR=" + $_.Exception.Message)
}
