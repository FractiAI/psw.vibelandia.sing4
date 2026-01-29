# Add env vars on Vercel using Vercel CLI. Uses VERCEL_TOKEN from .env.nspfrnp or env.
# Run from repo root: powershell -ExecutionPolicy Bypass -File scripts/vercel-env-add-cli.ps1
$ErrorActionPreference = "Stop"
$root = if ($PSScriptRoot) { Split-Path $PSScriptRoot } else { Get-Location | Select-Object -ExpandProperty Path }
Set-Location $root

$envPath = Join-Path $root ".env.nspfrnp"
if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#")) {
            $i = $line.IndexOf("=")
            if ($i -gt 0) {
                $k = $line.Substring(0, $i).Trim()
                $v = $line.Substring($i + 1).Trim().Trim('"').Trim("'")
                [Environment]::SetEnvironmentVariable($k, $v, "Process")
            }
        }
    }
}

$token = $env:VERCEL_TOKEN
if (-not $token) { Write-Error "VERCEL_TOKEN not set. Add to .env.nspfrnp or set env var."; exit 1 }

$vars = @(
    @{ N = "NEXT_PUBLIC_SUPABASE_URL"; V = "https://jfbgdxeumzqzigptbmvp.supabase.co"; Sensitive = $false },
    @{ N = "VIBELANDIA_SUPABASE_URL"; V = "https://jfbgdxeumzqzigptbmvp.supabase.co"; Sensitive = $false },
    @{ N = "NEXT_PUBLIC_WEBSITE_URL"; V = "https://psw-vibelandia-sing4.vercel.app"; Sensitive = $false },
    @{ N = "PAYPAL_MODE"; V = "sandbox"; Sensitive = $false },
    @{ N = "NEXT_PUBLIC_SUPABASE_ANON_KEY"; V = ""; Sensitive = $true },
    @{ N = "VIBELANDIA_SUPABASE_ANON_KEY"; V = ""; Sensitive = $true },
    @{ N = "VIBELANDIA_PAYPAL_CLIENT_ID"; V = ""; Sensitive = $false },
    @{ N = "NEXT_PUBLIC_PAYPAL_CLIENT_ID"; V = ""; Sensitive = $false },
    @{ N = "PAYPAL_CLIENT_ID"; V = ""; Sensitive = $false },
    @{ N = "PAYPAL_CLIENT_SECRET"; V = ""; Sensitive = $true },
    @{ N = "PAYPAL_CLIENT_ID_SANDBOX"; V = ""; Sensitive = $false },
    @{ N = "PAYPAL_CLIENT_SECRET_SANDBOX"; V = ""; Sensitive = $true },
    @{ N = "PAYPAL_CLIENT_ID_LIVE"; V = ""; Sensitive = $false },
    @{ N = "PAYPAL_CLIENT_SECRET_LIVE"; V = ""; Sensitive = $true },
    @{ N = "SUPABASE_SERVICE_ROLE_KEY"; V = ""; Sensitive = $true },
    @{ N = "DATABASE_URL"; V = ""; Sensitive = $true },
    @{ N = "VIBELANDIA_GOOGLE_CLIENT_ID"; V = ""; Sensitive = $false },
    @{ N = "NEXT_PUBLIC_GOOGLE_CLIENT_ID"; V = ""; Sensitive = $false }
)

foreach ($e in $vars) {
    $val = $e.V
    $s = if ($e.Sensitive) { " --sensitive" } else { "" }
    foreach ($env in "production", "preview") {
        if ($val) {
            $val | vercel env add $e.N $env --yes --token $token $s 2>&1 | Out-Null
        } else {
            " " | vercel env add $e.N $env --yes --token $token $s 2>&1 | Out-Null
        }
        Write-Host "  OK $($e.N) [$env]"
    }
}
Write-Host "Done. Fill empty secret values in Vercel Dashboard, then redeploy."
