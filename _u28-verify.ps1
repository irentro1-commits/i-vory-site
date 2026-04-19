$OUT = "C:\Users\USER\Documents\i-vory\websites\ivory-ro\deploy\_u28_verify_out.txt"
"=== U28 VERIFY LIVE ===" | Out-File -FilePath $OUT -Encoding utf8
$rand = Get-Random
$url = "https://i-vory.ro/?cb=$rand"
"URL: $url" | Out-File -FilePath $OUT -Append -Encoding utf8
try {
  $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
  $html = $r.Content
  "HTML-LEN: $($html.Length)" | Out-File -FilePath $OUT -Append -Encoding utf8
  $cf = $r.Headers['CF-Cache-Status']
  "CF-CACHE: $cf" | Out-File -FilePath $OUT -Append -Encoding utf8
  if ($html -match '\.prob-line::before\{backdrop-filter:none') { "PROB-LINE-FIX: FOUND" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "PROB-LINE-FIX: MISSING" | Out-File -FilePath $OUT -Append -Encoding utf8 }
  if ($html -match '\.s2::before\{backdrop-filter:none') { "S2-FIX: FOUND" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "S2-FIX: MISSING" | Out-File -FilePath $OUT -Append -Encoding utf8 }
  if ($html -match 'U28:') { "U28-MARKER: FOUND" | Out-File -FilePath $OUT -Append -Encoding utf8 } else { "U28-MARKER: MISSING" | Out-File -FilePath $OUT -Append -Encoding utf8 }
} catch {
  "ERROR: $($_.Exception.Message)" | Out-File -FilePath $OUT -Append -Encoding utf8
}
"DONE" | Out-File -FilePath $OUT -Append -Encoding utf8
