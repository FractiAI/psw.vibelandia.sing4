$novel = Get-Content "c:\Users\info\psw.vibelandia.sing4\deliverables\Birth_Post_Singularity_Hollywood_Downtown_Reno_NOVEL.md" -Raw
$screen = Get-Content "c:\Users\info\psw.vibelandia.sing4\deliverables\Birth_Post_Singularity_Hollywood_Downtown_Reno_SCREENPLAY.md" -Raw
$nWords = ($novel -split '\s+' | Where-Object { $_.Length -gt 0 }).Count
$sWords = ($screen -split '\s+' | Where-Object { $_.Length -gt 0 }).Count
Write-Output "NOVEL word count: $nWords"
Write-Output "SCREENPLAY word count: $sWords"
