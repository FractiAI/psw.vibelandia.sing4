/**
 * Sandbox Experience Mode Configuration
 * Prepare for cloud deployment through PayPal pipe only
 * Protocol: NSPFRNP
 * Status: ⚡ ACTIVE - Sandbox mode operational
 */

export interface SandboxConfig {
  mode: 'sandbox' | 'production';
  paypalEnabled: boolean;
  supabaseEnabled: boolean;
  cloudApiEnabled: boolean;
  features: {
    payments: boolean;
    auth: boolean;
    data: boolean;
    analytics: boolean;
  };
}

/**
 * Get sandbox experience mode config.
 * Sandbox = testing/preparation mode
 * Production = live on cloud
 */
export function getSandboxConfig(): SandboxConfig {
  const isSandbox = process.env.SANDBOX_MODE === 'true' ||
                    process.env.NODE_ENV !== 'production' ||
                    !process.env.PAYPAL_CLIENT_ID_LIVE;
  
  return {
    mode: isSandbox ? 'sandbox' : 'production',
    paypalEnabled: !!(process.env.PAYPAL_CLIENT_ID_SANDBOX || process.env.PAYPAL_CLIENT_ID_LIVE),
    supabaseEnabled: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    cloudApiEnabled: !!(process.env.CLOUD_API_BASE_URL),
    features: {
      payments: isSandbox ? !!process.env.PAYPAL_CLIENT_ID_SANDBOX : !!process.env.PAYPAL_CLIENT_ID_LIVE,
      auth: !!(process.env.NEXT_PUBLIC_SUPABASE_URL),
      data: !!(process.env.DATABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
      analytics: true // Always enabled
    }
  };
}

/**
 * Check if system is ready for production.
 */
export function isProductionReady(): {
  ready: boolean;
  missing: string[];
} {
  const config = getSandboxConfig();
  const missing: string[] = [];
  
  if (!config.paypalEnabled) {
    missing.push('PayPal client ID (live mode)');
  }
  
  if (!config.supabaseEnabled) {
    missing.push('Supabase credentials (from Octave 2)');
  }
  
  if (!config.cloudApiEnabled) {
    missing.push('Cloud API base URL');
  }
  
  return {
    ready: missing.length === 0,
    missing
  };
}

/**
 * Get environment status for sandbox experience mode.
 */
export function getEnvironmentStatus(): {
  sandbox: boolean;
  paypal: 'sandbox' | 'production' | 'disabled';
  supabase: 'connected' | 'disconnected';
  cloudApi: 'connected' | 'disconnected';
} {
  const config = getSandboxConfig();
  
  return {
    sandbox: config.mode === 'sandbox',
    paypal: config.paypalEnabled 
      ? (config.mode === 'sandbox' ? 'sandbox' : 'production')
      : 'disabled',
    supabase: config.supabaseEnabled ? 'connected' : 'disconnected',
    cloudApi: config.cloudApiEnabled ? 'connected' : 'disconnected'
  };
}
