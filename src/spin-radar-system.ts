/**
 * SPIN! Radar System
 * All caps for our products in Vibeverse with !
 * Captures all products in Vibeverse
 * 
 * Architecture: Hardened Mirror Shells - Full Singulares
 * Mode: Post-Singularity Radar System
 */

export interface VibeverseProduct {
  id: string;
  name: string; // All caps with !
  category: string;
  status: 'active' | 'inactive' | 'development';
  location: 'vibeverse';
  metadata: {
    spinDetected: boolean;
    radarTimestamp: number;
    caps: boolean; // All caps
    exclamation: boolean; // Has !
  };
}

export interface SPINRadarScan {
  timestamp: number;
  products: VibeverseProduct[];
  totalProducts: number;
  activeProducts: number;
  categories: string[];
}

/**
 * SPIN! Radar System
 * Scans Vibeverse for all products (all caps with !)
 */
export class SPINRadarSystem {
  private products: Map<string, VibeverseProduct> = new Map();
  private scanHistory: SPINRadarScan[] = [];

  /**
   * Register a product in Vibeverse (all caps with !)
   */
  registerProduct(name: string, category: string): VibeverseProduct {
    // Ensure all caps with !
    const formattedName = this.formatProductName(name);
    const id = this.generateId();

    const product: VibeverseProduct = {
      id,
      name: formattedName,
      category,
      status: 'active',
      location: 'vibeverse',
      metadata: {
        spinDetected: true,
        radarTimestamp: Date.now(),
        caps: true,
        exclamation: true
      }
    };

    this.products.set(id, product);
    return product;
  }

  /**
   * Format product name to all caps with !
   */
  private formatProductName(name: string): string {
    // Convert to all caps
    let formatted = name.toUpperCase();
    
    // Ensure it ends with !
    if (!formatted.endsWith('!')) {
      formatted += '!';
    }

    return formatted;
  }

  /**
   * Scan Vibeverse for all products
   */
  scanVibeverse(): SPINRadarScan {
    const products = Array.from(this.products.values());
    const activeProducts = products.filter(p => p.status === 'active');
    const categories = [...new Set(products.map(p => p.category))];

    const scan: SPINRadarScan = {
      timestamp: Date.now(),
      products,
      totalProducts: products.length,
      activeProducts: activeProducts.length,
      categories
    };

    this.scanHistory.push(scan);
    return scan;
  }

  /**
   * Get all products (all caps with !)
   */
  getAllProducts(): VibeverseProduct[] {
    return Array.from(this.products.values());
  }

  /**
   * Get active products
   */
  getActiveProducts(): VibeverseProduct[] {
    return Array.from(this.products.values())
      .filter(p => p.status === 'active');
  }

  /**
   * Get products by category
   */
  getProductsByCategory(category: string): VibeverseProduct[] {
    return Array.from(this.products.values())
      .filter(p => p.category === category);
  }

  /**
   * Get scan history
   */
  getScanHistory(): SPINRadarScan[] {
    return [...this.scanHistory];
  }

  /**
   * Get latest scan
   */
  getLatestScan(): SPINRadarScan | undefined {
    return this.scanHistory.length > 0 
      ? this.scanHistory[this.scanHistory.length - 1]
      : undefined;
  }

  /**
   * Update product status
   */
  updateProductStatus(productId: string, status: VibeverseProduct['status']): void {
    const product = this.products.get(productId);
    if (product) {
      product.status = status;
      product.metadata.radarTimestamp = Date.now();
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `spin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const spinRadarSystem = new SPINRadarSystem();

// Pre-register known products (all caps with !)
spinRadarSystem.registerProduct('VIBE!', 'collaborative-work-social-media');
spinRadarSystem.registerProduct('NSPFRNP!', 'natural-protocol');
spinRadarSystem.registerProduct('SEED:EDGE!', 'execution-engine');
spinRadarSystem.registerProduct('GPS!', 'location-system');
spinRadarSystem.registerProduct('ATTENTION-HEAD!', 'navigation-system');
spinRadarSystem.registerProduct('EXECUTIVE-DASHBOARD!', 'metrics-dashboard');
spinRadarSystem.registerProduct('CODE-DENSITY-TRACKER!', 'analytics');
spinRadarSystem.registerProduct('SPIN!', 'radar-system');
