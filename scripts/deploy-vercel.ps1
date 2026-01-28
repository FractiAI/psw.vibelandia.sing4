# Deploy Vibelandia UI to Vercel using CLI
# Uses credentials from NSPFRNP catalog approach
# Protocol: NSPFRNP

Write-Host "[*] Vibelandia UI - Vercel CLI Deployment" -ForegroundColor Cyan
Write-Host ""

# Check for Node.js
$nodeFound = $false
$nodePath = $null

# Check common locations
$nodePaths = @(
    "C:\Program Files\nodejs\node.exe",
    "C:\Program Files (x86)\nodejs\node.exe",
    "$env:APPDATA\npm\node.exe",
    "$env:LOCALAPPDATA\Programs\nodejs\node.exe"
)

foreach ($path in $nodePaths) {
    if (Test-Path $path) {
        $nodePath = $path
        $nodeFound = $true
        break
    }
}

# Check PATH
if (-not $nodeFound) {
    try {
        $nodeVersion = node --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            $nodeFound = $true
            $nodePath = "node"
        }
    } catch {}
}

if (-not $nodeFound) {
    Write-Host "[X] Node.js not found in PATH or common locations" -ForegroundColor Red
    Write-Host ""
    Write-Host "To install Node.js:" -ForegroundColor Yellow
    Write-Host "   1. Download from: https://nodejs.org/ (LTS version)" -ForegroundColor White
    Write-Host "   2. Or use nvm-windows: https://github.com/coreybutler/nvm-windows" -ForegroundColor White
    Write-Host "   3. This repo requires Node 20 (see .nvmrc)" -ForegroundColor White
    Write-Host ""
    Write-Host "Tip: After installing Node.js, restart your terminal and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] Node.js found: $nodePath" -ForegroundColor Green
$nodeVersion = & $nodePath --version
Write-Host "   Version: $nodeVersion" -ForegroundColor Gray
Write-Host ""

# Check for Vercel CLI
$vercelFound = $false
try {
    $vercelVersion = vercel --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        $vercelFound = $true
        Write-Host "[OK] Vercel CLI found: $vercelVersion" -ForegroundColor Green
    }
} catch {
    $vercelFound = $false
}

if (-not $vercelFound) {
    Write-Host "[!] Vercel CLI not found. Installing..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        & $nodePath -e "require('child_process').execSync('npm install -g vercel', {stdio: 'inherit'})"
        Write-Host "[OK] Vercel CLI installed" -ForegroundColor Green
    } catch {
        Write-Host "[X] Failed to install Vercel CLI" -ForegroundColor Red
        Write-Host "   Try manually: npm install -g vercel" -ForegroundColor Yellow
        exit 1
    }
    Write-Host ""
}

# Check for credentials
$envFiles = @(
    ".env.nspfrnp",
    ".env.local",
    ".env"
)

$tokenFound = $false
$tokenSource = $null

foreach ($envFile in $envFiles) {
    if (Test-Path $envFile) {
        $content = Get-Content $envFile -Raw
        if ($content -match "VERCEL_TOKEN\s*=\s*(.+)") {
            $tokenFound = $true
            $tokenSource = $envFile
            Write-Host "[OK] VERCEL_TOKEN found in: $envFile" -ForegroundColor Green
            break
        }
    }
}

# Check environment variable
if (-not $tokenFound) {
    if ($env:VERCEL_TOKEN) {
        $tokenFound = $true
        $tokenSource = "environment variable"
        Write-Host "[OK] VERCEL_TOKEN found in environment" -ForegroundColor Green
    }
}

if (-not $tokenFound) {
    Write-Host "[!] VERCEL_TOKEN not found" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To get your token:" -ForegroundColor Yellow
    Write-Host "   1. Go to https://vercel.com" -ForegroundColor White
    Write-Host "   2. Account → Settings → Tokens" -ForegroundColor White
    Write-Host "   3. Create token (e.g. 'NSPFRNP Vibelandia')" -ForegroundColor White
    Write-Host "   4. Add to .env.local:" -ForegroundColor White
    Write-Host "      VERCEL_TOKEN=your_token_here" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Tip: Or run: vercel login (interactive login)" -ForegroundColor Yellow
    Write-Host ""
}

# Deploy
Write-Host "[*] Deploying Vibelandia UI to Vercel..." -ForegroundColor Cyan
Write-Host "   Project: psw-vibelandia-sing4" -ForegroundColor Gray
Write-Host "   Root: . (repo root)" -ForegroundColor Gray
Write-Host "   Framework: None (static)" -ForegroundColor Gray
Write-Host ""

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

try {
    if ($tokenFound -and $tokenSource -ne "environment variable") {
        # Load token from file
        $envContent = Get-Content $tokenSource -Raw
        if ($envContent -match "VERCEL_TOKEN\s*=\s*(.+)") {
            $token = $matches[1].Trim()
            $env:VERCEL_TOKEN = $token
        }
    }
    
    # Deploy
    if ($env:VERCEL_TOKEN) {
        Write-Host "Using VERCEL_TOKEN from $tokenSource" -ForegroundColor Gray
        vercel --token $env:VERCEL_TOKEN --yes
    } else {
        Write-Host "Running interactive deployment (vercel login if needed)..." -ForegroundColor Gray
        vercel --yes
    }
    
    Write-Host ""
    Write-Host "[OK] Deployment complete!" -ForegroundColor Green
    Write-Host "Your Vibelandia UI is live on Vercel" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "See: protocols/CREDENTIALS_NSPFRNP_CATALOG.md for details" -ForegroundColor Gray
    
} catch {
    Write-Host ""
    Write-Host "[X] Deployment failed: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   1. Ensure Vercel CLI is installed: npm install -g vercel" -ForegroundColor White
    Write-Host "   2. Login: vercel login" -ForegroundColor White
    Write-Host "   3. Or set VERCEL_TOKEN in .env.local" -ForegroundColor White
    Write-Host "   4. Check: protocols/CREDENTIALS_NSPFRNP_CATALOG.md" -ForegroundColor White
    exit 1
}
