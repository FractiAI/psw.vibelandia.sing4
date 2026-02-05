$novel = Get-Content "c:\Users\info\psw.vibelandia.sing4\deliverables\Andre_Carnival_First_Three_Commanders_NOVEL.md" -Raw
$screen = Get-Content "c:\Users\info\psw.vibelandia.sing4\deliverables\Andre_Carnival_First_Three_Commanders_SCREENPLAY.md" -Raw
$nWords = ($novel -split '\s+' | Where-Object { $_.Length -gt 0 }).Count
$sWords = ($screen -split '\s+' | Where-Object { $_.Length -gt 0 }).Count
Write-Output "ANDRE NOVEL word count: $nWords"
Write-Output "ANDRE SCREENPLAY word count: $sWords"
