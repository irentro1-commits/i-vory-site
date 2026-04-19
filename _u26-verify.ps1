try {
  $r = Invoke-WebRequest -Uri "https://i-vory.ro/?cachebust=$(Get-Random)" -Headers @{"Cache-Control"="no-cache"; "Pragma"="no-cache"} -UseBasicParsing
  $c = $r.Content
  Write-Host ("HTML-LEN=" + $c.Length)
  if ($c -match "mobile-fx\.js\?v=24") { Write-Host "MFX-BUST=FOUND" } else { Write-Host "MFX-BUST=MISSING" }
  if ($c -match "logo-svg\.js\?v=24") { Write-Host "LOGO-BUST=FOUND" } else { Write-Host "LOGO-BUST=MISSING" }
  if ($c -match "earth-tex\.js\?v=24") { Write-Host "EARTH-BUST=FOUND" } else { Write-Host "EARTH-BUST=MISSING" }
  # Verifica headers cache
  Write-Host ("CF-CACHE=" + $r.Headers.'cf-cache-status')
  Write-Host ("AGE=" + $r.Headers.Age)
  Write-Host ("LAST-MOD=" + $r.Headers.'Last-Modified')
} catch {
  Write-Host ("ERR=" + $_.Exception.Message)
}
