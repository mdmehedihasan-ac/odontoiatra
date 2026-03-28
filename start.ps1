# ─── Avvio del progetto Odontoiatria Maria Gentili ───────────────────────────
$root = $PSScriptRoot

Write-Host ""
Write-Host "  Avvio Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node `"$root\backend\server.js`"" -WindowStyle Normal

Start-Sleep -Seconds 2

Write-Host "  Avvio Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:Path = '$root\node_modules\.bin;' + `$env:Path; Set-Location '$root\frontend'; vite" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "  Backend  →  http://localhost:3001" -ForegroundColor Green
Write-Host "  Frontend →  http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "  Apertura browser..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"
