$f = 'C:\Users\USER\Documents\i-vory\websites\_LOGS\ivory-ro-log.md'
$out = 'C:\Users\USER\Documents\i-vory\websites\ivory-ro\deploy\_verify_log_out.txt'
if (Test-Path $out) { Remove-Item $out -Force }
$lines = Get-Content $f
"LINES: $($lines.Count)" | Out-File -Append -Encoding utf8 $out
$matches = $lines | Select-String -Pattern '^### 2026-04-19'
foreach ($m in $matches) {
  "$($m.LineNumber): $($m.Line)" | Out-File -Append -Encoding utf8 $out
}
# Check U29 block integrity
$u29Start = ($lines | Select-String '^### 2026-04-19 — U29').LineNumber
$u28Start = ($lines | Select-String '^### 2026-04-19 — U28').LineNumber
"U29_START: $u29Start" | Out-File -Append -Encoding utf8 $out
"U28_START: $u28Start" | Out-File -Append -Encoding utf8 $out
"U29_BLOCK_SIZE: $($u28Start - $u29Start)" | Out-File -Append -Encoding utf8 $out
# Check last 5 lines
"--- TAIL 5 ---" | Out-File -Append -Encoding utf8 $out
$lines[-5..-1] | Out-File -Append -Encoding utf8 $out
Get-Content $out
