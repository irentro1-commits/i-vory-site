Start-Sleep -Seconds 40
$u='https://i-vory.ro/?u16verify='+(Get-Random)
$out = "C:\Users\USER\Documents\i-vory\websites\ivory-ro\deploy\_u16_verify.txt"
try{
  $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 30
  $txt=$r.Content
  $hit1 = $txt -match 'U16: mobile'
  $hit2 = $txt -match 'Geist:wght@400;500;700;800'
  $hit3 = $txt -match 'defer Fraunces'
  Add-Content -Path $out -Value ('StatusCode: ' + $r.StatusCode)
  Add-Content -Path $out -Value ('Length: ' + $txt.Length)
  Add-Content -Path $out -Value ('U16_preloader_marker: ' + $hit1)
  Add-Content -Path $out -Value ('U16_font_url_new: ' + $hit2)
  Add-Content -Path $out -Value ('U16_defer_block: ' + $hit3)
}catch{
  Add-Content -Path $out -Value ('ERROR: ' + $_.Exception.Message)
}
