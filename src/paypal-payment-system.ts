/**
 * PayPal Payment System — Octave 2 API Client
 * All PayPal operations are handled by API calls to the repository:
 * Syntheverse 7 Octave 2-3 Public Cloud Onramp (syntheverse-poc.vercel.app)
 * Protocol: NSPFRNP · Connect Octave 1 to 2
 * Status: ⚡ ACTIVE
 */

import { cloudApiUrl } from './cloud-onramp-config';
import { cloudOnrampFetch } from './cloud-onramp-client';

export interface PayPalConfig {
  clientId: string;
  mode: 'sandbox' | 'production';
  currency: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'campus' | 'wink' | 'sing' | 'experience';
  tier: 1 | 2 | 3 | 4;
}

/**
 * 4×4×4×4 Plans Matrix (local catalog only; pricing/creation via Octave 2 API).
 * Campus × WINK! × SING × Experience
 */
export const PAYMENT_PLANS: Record<string, PaymentPlan> = {
  'campus-day': { id: 'campus-day', name: 'Day Pass', description: 'Experience the campus for a day', price: 0, category: 'campus', tier: 1 },
  'campus-weekly': { id: 'campus-weekly', name: 'Weekly Pass', description: 'Full week campus experience', price: 0, category: 'campus', tier: 2 },
  'campus-monthly': { id: 'campus-monthly', name: 'Monthly Pass', description: 'Complete campus integration', price: 0, category: 'campus', tier: 3 },
  'campus-ultimate-vip': { id: 'campus-ultimate-vip', name: 'Ultimate VIP Campus', description: 'Premium campus experience for high-value creators', price: 0, category: 'campus', tier: 4 },
  'wink-base': { id: 'wink-base', name: 'WINK! Base', description: 'Essential WINK! features for high-value vibers', price: 0, category: 'wink', tier: 1 },
  'wink-standard': { id: 'wink-standard', name: 'WINK! Standard', description: 'Standard Wink experience, Notes Being', price: 0, category: 'wink', tier: 2 },
  'wink-premium': { id: 'wink-premium', name: 'WINK! Premium', description: 'Premium profile, magical wardrobe, network', price: 0, category: 'wink', tier: 3 },
  'wink-4x4-ultimate': { id: 'wink-4x4-ultimate', name: 'WINK! 4×4 Ultimate', description: 'Ultimate tier—everything included', price: 0, category: 'wink', tier: 4 },
  'sing-base': { id: 'sing-base', name: 'SING Base Model', description: '~$20K (VW Bug pricing) — entry level', price: 20000, category: 'sing', tier: 1 },
  'sing-members-only': { id: 'sing-members-only', name: 'SING Members Only', description: 'Scaling from base — mid-range', price: 0, category: 'sing', tier: 2 },
  'sing-ultimate-vip': { id: 'sing-ultimate-vip', name: 'SING Ultimate VIP', description: '~$200K+ (top super car) — premium', price: 200000, category: 'sing', tier: 3 },
  'sing-baller-c': { id: 'sing-baller-c', name: 'SING Baller C Ultimate VIP', description: 'Ultimate super car for Ultimate C\'s', price: 0, category: 'sing', tier: 4 },
  'experience-visit': { id: 'experience-visit', name: 'Visit', description: 'Come for the post-singularity business', price: 0, category: 'experience', tier: 1 },
  'experience-stay': { id: 'experience-stay', name: 'Stay', description: 'Stay for the post-singularity fun', price: 0, category: 'experience', tier: 2 },
  'experience-create': { id: 'experience-create', name: 'Create', description: 'Creator studios, performance venues, Hero Hosts', price: 0, category: 'experience', tier: 3 },
  'experience-transform': { id: 'experience-transform', name: 'Transform', description: 'Happy Ending Zones, SING lottery, Pioneer Status', price: 0, category: 'experience', tier: 4 },
};

/** Response from Octave 2: create PayPal order */
export interface CreateOrderResponse {
  orderId: string;
  approvalUrl?: string;
  clientId?: string;
  sandbox?: boolean;
}

/** Response from Octave 2: capture PayPal order */
export interface CaptureOrderResponse {
  success: boolean;
  orderId: string;
  transactionId?: string;
  error?: string;
}

/**
 * Get PayPal config from Octave 2 API.
 * Payment is handled by the repository: Syntheverse 7 Octave 2-3 Public Cloud Onramp.
 */
export async function getPayPalConfigFromApi(): Promise<PayPalConfig> {
  const data = await cloudOnrampFetch<{ clientId: string; mode: 'sandbox' | 'production'; currency?: string }>({
    path: '/api/payment/paypal/config',
    method: 'GET',
    seedEdge: true,
  }).catch(() => null);
  if (data?.clientId) {
    return {
      clientId: data.clientId,
      mode: data.mode || 'sandbox',
      currency: data.currency || 'USD',
    };
  }
  return {
    clientId: '',
    mode: 'sandbox',
    currency: 'USD',
  };
}

/**
 * Create PayPal order via Octave 2 API.
 * All payment handling is done by the cloud repository.
 */
export async function createPayPalOrder(planId: string): Promise<CreateOrderResponse> {
  const plan = PAYMENT_PLANS[planId];
  if (!plan) throw new Error(`Plan not found: ${planId}`);
  if (plan.price === 0) {
    return { orderId: 'contact-required', approvalUrl: undefined };
  }
  const response = await cloudOnrampFetch<CreateOrderResponse>({
    path: '/api/payment/paypal/create-order',
    method: 'POST',
    body: { planId, amount: plan.price, currency: 'USD', description: plan.name },
    seedEdge: true,
  });
  return response;
}

/**
 * Capture PayPal order via Octave 2 API.
 * Called after user approves in PayPal UI.
 */
export async function capturePayPalOrder(orderId: string, payerId?: string): Promise<CaptureOrderResponse> {
  const response = await cloudOnrampFetch<CaptureOrderResponse>({
    path: '/api/payment/paypal/capture-order',
    method: 'POST',
    body: { orderId, payerId },
    seedEdge: true,
  });
  return response;
}

/**
 * Get the base URL for the payment API (for browser use).
 * Browser can call: getPaymentApiBaseUrl() + '/api/payment/paypal/...'
 */
export function getPaymentApiBaseUrl(): string {
  return cloudApiUrl('').replace(/\/$/, '');
}

export function getPlan(planId: string): PaymentPlan | undefined {
  return PAYMENT_PLANS[planId];
}

export function getPlansByCategory(category: PaymentPlan['category']): PaymentPlan[] {
  return Object.values(PAYMENT_PLANS).filter((p) => p.category === category);
}
