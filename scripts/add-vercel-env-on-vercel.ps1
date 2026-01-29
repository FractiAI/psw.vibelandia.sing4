# Add env var keys on Vercel (all on Vercel). Uses known defaults; empty secrets = fill in Dashboard.
# Requires only VERCEL_TOKEN in .env.nspfrnp or env var. Run from repo root: powershell -ExecutionPolicy Bypass -File scripts/add-vercel-env-on-vercel.ps1
# Security: Never commit or paste VERCEL_TOKEN in chat. Keep it in .env.nspfrnp (gitignored) or set env var. If exposed, rotate at vercel.com/account/tokens.
$ErrorActionPreference = "Stop"
$root = if ($PSScriptRoot) { Split-Path $PSScriptRoot } else { Get-Location | Select-Object -ExpandProperty Path }
$envPath = Join-Path $root ".env.nspfrnp"
if (-not (Test-Path $envPath)) { $envPath = Join-Path (Get-Location | Select-Object -ExpandProperty Path) ".env.nspfrnp" }
$fileEnv = @{}
if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#")) {
            $i = $line.IndexOf("=")
            if ($i -gt 0) {
                $k = $line.Substring(0, $i).Trim()
                $v = $line.Substring($i + 1).Trim().Trim('"').Trim("'")
                $fileEnv[$k] = $v
            }
        }
    }
}

$token = $fileEnv["VERCEL_TOKEN"]; if (-not $token) { $token = $env:VERCEL_TOKEN }
if (-not $token) { Write-Error "VERCEL_TOKEN not set. Add it to .env.nspfrnp or set env var VERCEL_TOKEN (get from https://vercel.com/account/tokens)"; exit 1 }

$project = $fileEnv["VERCEL_PROJECT_ID"]; if (-not $project) { $project = "psw-vibelandia-sing4" }
$teamId = $fileEnv["VERCEL_TEAM_ID"]
$base = "https://api.vercel.com/v10/projects/" + [Uri]::EscapeDataString($project) + "/env"
$urlSuffix = "?upsert=true"; if ($teamId) { $urlSuffix += "&teamId=" + [Uri]::EscapeDataString($teamId) }

# Keys with default value (empty = fill in Vercel Dashboard)
$defaults = @{
    "NEXT_PUBLIC_SUPABASE_URL" = "https://jfbgdxeumzqzigptbmvp.supabase.co"
    "VIBELANDIA_SUPABASE_URL" = "https://jfbgdxeumzqzigptbmvp.supabase.co"
    "NEXT_PUBLIC_WEBSITE_URL" = "https://psw-vibelandia-sing4.vercel.app"
    "PAYPAL_MODE" = "sandbox"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY" = ""
    "VIBELANDIA_SUPABASE_ANON_KEY" = ""
    "VIBELANDIA_PAYPAL_CLIENT_ID" = ""
    "NEXT_PUBLIC_PAYPAL_CLIENT_ID" = ""
    "PAYPAL_CLIENT_ID" = ""
    "PAYPAL_CLIENT_SECRET" = ""
    "PAYPAL_CLIENT_ID_SANDBOX" = ""
    "PAYPAL_CLIENT_SECRET_SANDBOX" = ""
    "PAYPAL_CLIENT_ID_LIVE" = ""
    "PAYPAL_CLIENT_SECRET_LIVE" = ""
    "SUPABASE_SERVICE_ROLE_KEY" = ""
    "DATABASE_URL" = ""
    "VIBELANDIA_GOOGLE_CLIENT_ID" = ""
    "NEXT_PUBLIC_GOOGLE_CLIENT_ID" = ""
}
$secretKeys = @("NEXT_PUBLIC_SUPABASE_ANON_KEY","VIBELANDIA_SUPABASE_ANON_KEY","SUPABASE_SERVICE_ROLE_KEY","DATABASE_URL","PAYPAL_CLIENT_SECRET","PAYPAL_CLIENT_SECRET_SANDBOX","PAYPAL_CLIENT_SECRET_LIVE")

Write-Output "Adding env var keys on Vercel project: $project"
if ($teamId) { Write-Output "  (teamId: $teamId)" }
$shownErrorHint = $false
foreach ($key in $defaults.Keys) {
    $val = if ($fileEnv[$key]) { $fileEnv[$key] } else { $defaults[$key] }
    $type = if ($secretKeys -contains $key) { "secret" } else { "plain" }
    $url = $base + $urlSuffix
    $body = @{ key = $key; value = $val; type = $type; target = @("production", "preview") } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri $url -Method Post -Headers @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" } -Body $body | Out-Null
        $status = if ($val) { "value set" } else { "key added (fill in Dashboard)" }
        Write-Output "  OK $key - $status"
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        $errBody = ""
        try {
            if ($_.Exception.Response) {
                $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
                $reader.BaseStream.Position = 0
                $errBody = $reader.ReadToEnd()
                $reader.Close()
            }
        } catch { }
        if (-not $errBody) { $errBody = $_.ErrorDetails.Message }
        if (-not $errBody) { $errBody = $_.Exception.Message }
        if (-not $code) { $code = "?" }
        Write-Output "  FAIL $key HTTP $code"
        if (($code -eq 403 -or $code -eq 404) -and -not $shownErrorHint) {
            $shownErrorHint = $true
            Write-Output ""
            if ($code -eq 404) {
                Write-Output "  >>> 404 Project not found. If project is under a Team, add VERCEL_TEAM_ID=team_xxx to .env.nspfrnp. Or set VERCEL_PROJECT_ID to the project ID from Vercel Dashboard URL (e.g. prj_xxxx)."
            } elseif ($errBody -match "invalidToken.*true") {
                Write-Output "  >>> Token invalid or expired. Create new token at https://vercel.com/account/tokens and set VERCEL_TOKEN in .env.nspfrnp"
            } else {
                Write-Output "  >>> 403: Project may be under a Team. Add VERCEL_TEAM_ID=team_xxx to .env.nspfrnp (from Vercel -> Team Settings -> General)"
            }
            Write-Output ""
        }
    }
}
Write-Output ""
Write-Output "Done. Open Vercel -> Project -> Settings -> Environment Variables to fill any empty values, then redeploy."
