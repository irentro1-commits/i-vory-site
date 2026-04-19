$OUT = "C:\Users\USER\Documents\i-vory\websites\ivory-ro\deploy\_u27-verify_out.txt"
"=== U27 VERIFY START ===" | Out-File -FilePath $OUT -Encoding utf8
try {
  $rand = Get-Random
  $r = Invoke-WebRequest -Uri "https://i-vory.ro/?cb=$rand" -Headers @{"Cache-Control"="no-cache"; "Pragma"="no-cache"} -UseBasicParsing
  $c = $r.Content
  ("HTML-LEN=" + $c.Length) | Out-File -FilePath $OUT -Append -Encoding utf8
  if ($c -match "mobile-fx\.js\?v=27") { "MFX-V27=FOUND" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "MFX-V27=MISSING" | Out-File -FilePath $OUT -Append -Encoding utf8 }
  if ($c -match "mobile-fx\.js\?v=24") { "MFX-V24=STILL-THERE" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "MFX-V24=GONE" | Out-File -FilePath $OUT -Append -Encoding utf8 }
  ("CF-CACHE-HTML=" + $r.Headers.'cf-cache-status') | Out-File -FilePath $OUT -Append -Encoding utf8

  $m = Invoke-WebRequest -Uri "https://i-vory.ro/mobile-fx.js?v=27&cb=$rand" -Headers @{"Cache-Control"="no-cache"} -UseBasicParsing
  $mc = $m.Content
  ("MFX-LEN=" + $mc.Length) | Out-File -FilePath $OUT -Append -Encoding utf8
  if ($mc -match "MFX27") { "MFX27-TAG=FOUND" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "MFX27-TAG=MISSING" | Out-File -FilePath $OUT -Append -Encoding utf8 }
  if ($mc -match "COUNT=80") { "COUNT80=FOUND" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "COUNT80=MISSING" | Out-File -FilePath $OUT -Append -Encoding utf8 }
  if ($mc -match "drift") { "DRIFT=FOUND" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "DRIFT=MISSING" | Out-File -FilePath $OUT -Append -Encoding utf8 }
  if ($mc -match "mix-blend") { "MIX-BLEND=STILL-THERE" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "MIX-BLEND=GONE" | Out-File -FilePath $OUT -Append -Encoding utf8 }
  if ($mc -match "filter:blur") { "BLUR-FILTER=STILL-THERE" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "BLUR-FILTER=GONE" | Out-File -FilePath $OUT -Append -Encoding utf8 }
  ("CF-CACHE-MFX=" + $m.Headers.'cf-cache-status') | Out-File -FilePath $OUT -Append -Encoding utf8
  ("MFX-CC=" + $m.Headers.'Cache-Control') | Out-File -FilePath $OUT -Append -Encoding utf8
} catch {
  ("ERR=" + $_.Exception.Message) | Out-File -FilePath $OUT -Append -Encoding utf8
}
"=== DONE ===" | Out-File -FilePath $OUT -Append -Encoding utf8
