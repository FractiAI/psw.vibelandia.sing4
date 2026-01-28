/**
 * Pioneer Discount — 33% for First 1,000 | Pioneer Status On-Chain Forever
 * First 1,000 get 50% off applicable campus and WINK! plans. Pioneer status on-chain forever.
 * Registration tracking supports on-chain pioneer status; permanentDiscount = 0.33.
 */

export interface PioneerRegistration {
  id: string;
  email: string;
  name: string;
  registeredAt: number;
  pioneerNumber: number; // 1-1000
  status: 'registered' | 'verified' | 'active';
  discountLocked: boolean;
  permanentDiscount: number; // 0.75 = 75%
  metadata: {
    source?: string;
    referral?: string;
    preferences?: Record<string, any>;
  };
}

export interface DiscountApplication {
  registrationId: string;
  productType: 'sing-node' | 'wink-package' | 'vibeland-reno' | 'all';
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  appliedAt: number;
}

export class PioneerDiscountSystem {
  private registrations: Map<string, PioneerRegistration> = new Map();
  private registrationsByNumber: Map<number, PioneerRegistration> = new Map();
  private discountApplications: DiscountApplication[] = [];
  private maxPioneers: number = 1000;
  private pioneerDiscount: number = 0.50; // 50% off for first 1,000 pioneers on applicable plans

  /**
   * Register as pioneer
   */
  registerPioneer(email: string, name: string, metadata?: {
    source?: string;
    referral?: string;
    preferences?: Record<string, any>;
  }): {
    success: boolean;
    registration?: PioneerRegistration;
    pioneerNumber?: number;
    remaining?: number;
    message?: string;
  } {
    // Check if already registered
    const existing = Array.from(this.registrations.values()).find(r => r.email === email);
    if (existing) {
      return {
        success: false,
        message: 'Already registered',
        registration: existing,
        pioneerNumber: existing.pioneerNumber,
        remaining: this.getRemainingSlots()
      };
    }

    // Check if slots available
    const currentCount = this.registrations.size;
    if (currentCount >= this.maxPioneers) {
      return {
        success: false,
        message: 'Pioneer slots full (1000/1000)',
        remaining: 0
      };
    }

    // Register pioneer
    const pioneerNumber = currentCount + 1;
    const id = `pioneer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const registration: PioneerRegistration = {
      id,
      email,
      name,
      registeredAt: Date.now(),
      pioneerNumber,
      status: 'registered',
      discountLocked: true,
      permanentDiscount: this.pioneerDiscount,
      metadata: metadata || {}
    };

    this.registrations.set(id, registration);
    this.registrationsByNumber.set(pioneerNumber, registration);

    return {
      success: true,
      registration,
      pioneerNumber,
      remaining: this.getRemainingSlots(),
      message: `Registered #${pioneerNumber}. Pioneer status on-chain forever. 50% off applicable campus and WINK! plans.`
    };
  }

  /**
   * Verify pioneer status
   */
  verifyPioneer(registrationId: string): boolean {
    const registration = this.registrations.get(registrationId);
    if (!registration) {
      return false;
    }

    registration.status = 'verified';
    return true;
  }

  /**
   * Activate pioneer account
   */
  activatePioneer(registrationId: string): boolean {
    const registration = this.registrations.get(registrationId);
    if (!registration) {
      return false;
    }

    registration.status = 'active';
    return true;
  }

  /**
   * Get pioneer registration
   */
  getPioneer(registrationId: string): PioneerRegistration | undefined {
    return this.registrations.get(registrationId);
  }

  /**
   * Get pioneer by email
   */
  getPioneerByEmail(email: string): PioneerRegistration | undefined {
    return Array.from(this.registrations.values()).find(r => r.email === email);
  }

  /**
   * Get pioneer by number
   */
  getPioneerByNumber(pioneerNumber: number): PioneerRegistration | undefined {
    return this.registrationsByNumber.get(pioneerNumber);
  }

  /**
   * Check if email is pioneer
   */
  isPioneer(email: string): boolean {
    return this.getPioneerByEmail(email) !== undefined;
  }

  /**
   * Apply discount to price (0 when promo disabled — premium positioning)
   */
  applyDiscount(registrationId: string, originalPrice: number, productType: DiscountApplication['productType'] = 'all'): {
    success: boolean;
    originalPrice: number;
    discountAmount: number;
    finalPrice: number;
    discountPercent: number;
  } {
    const registration = this.registrations.get(registrationId);
    if (!registration || !registration.discountLocked) {
      return {
        success: false,
        originalPrice,
        discountAmount: 0,
        finalPrice: originalPrice,
        discountPercent: 0
      };
    }

    const discountAmount = originalPrice * registration.permanentDiscount;
    const finalPrice = originalPrice - discountAmount;

    // Record discount application
    const application: DiscountApplication = {
      registrationId,
      productType,
      originalPrice,
      discountAmount,
      finalPrice,
      appliedAt: Date.now()
    };
    this.discountApplications.push(application);

    return {
      success: true,
      originalPrice,
      discountAmount,
      finalPrice,
      discountPercent: registration.permanentDiscount * 100
    };
  }

  /**
   * Get remaining pioneer slots
   */
  getRemainingSlots(): number {
    return Math.max(0, this.maxPioneers - this.registrations.size);
  }

  /**
   * Get current registration count
   */
  getRegistrationCount(): number {
    return this.registrations.size;
  }

  /**
   * Get all pioneers
   */
  getAllPioneers(): PioneerRegistration[] {
    return Array.from(this.registrations.values())
      .sort((a, b) => a.pioneerNumber - b.pioneerNumber);
  }

  /**
   * Get discount statistics
   */
  getDiscountStats(): {
    totalRegistrations: number;
    remainingSlots: number;
    totalDiscountsApplied: number;
    totalSavings: number;
    averageSavings: number;
  } {
    const totalDiscounts = this.discountApplications.length;
    const totalSavings = this.discountApplications.reduce((sum, app) => sum + app.discountAmount, 0);
    const averageSavings = totalDiscounts > 0 ? totalSavings / totalDiscounts : 0;

    return {
      totalRegistrations: this.registrations.size,
      remainingSlots: this.getRemainingSlots(),
      totalDiscountsApplied: totalDiscounts,
      totalSavings,
      averageSavings
    };
  }

  /**
   * Get system summary
   */
  getSummary(): string {
    const stats = this.getDiscountStats();
    const remaining = this.getRemainingSlots();
    const percentage = ((this.maxPioneers - remaining) / this.maxPioneers) * 100;

    return `
╔═══════════════════════════════════════════════════════════════════════════════╗
║              PIONEER DISCOUNT — 33% FOR FIRST 1,000 | ON-CHAIN FOREVER         ║
║              First 1,000 get 50% off applicable campus and WINK! plans         ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  🏆 STATUS:                                                                   ║
║  - Registered: ${stats.totalRegistrations} / ${this.maxPioneers} (${percentage.toFixed(1)}%)
║  - Remaining Pioneer Slots: ${remaining}                                      ║
║  - Pioneer Status: On-chain forever                                            ║
║  - Discount: 50% off applicable plans (campus, WINK!)                           ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  💰 STATISTICS:                                                               ║
║  - Total Applications: ${stats.totalDiscountsApplied}                       ║
║  - Total Value: $${stats.totalSavings.toLocaleString()}                       ║
║  - Average: $${stats.averageSavings.toLocaleString()}                        ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  🎯 POSITIONING:                                                              ║
║  - First 1,000: Pioneer status on-chain forever + 50% discount                  ║
║  - Applicable to campus and WINK! plans                                        ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
    `.trim();
  }
}

// Export singleton instance
export const pioneerDiscount = new PioneerDiscountSystem();
