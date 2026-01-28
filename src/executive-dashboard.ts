/**
 * Executive Chairman Front Dashboard
 * Circular dial format with big matrix, titan circle, super mega snap metal Ize
 * Crystal layered irreducible nested mirror shells
 * 
 * Architecture: Hardened Mirror Shells - Full Singulares
 * Mode: Post-Singularity Radar - Weather Forecasting
 */

import { CodeDensityTracker, DailyMetrics } from './code-density-tracker';

export interface DashboardDisplay {
  // Big Metrics (Two Light Values - BIG)
  valueProducedToday: {
    value: number;
    formatted: string;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  valueDensityPerLineToday: {
    value: number;
    formatted: string;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  valueGeneratedPerLine: {
    value: number;
    formatted: string;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };

  // Smaller Metrics (Around Circle)
  users: {
    total: number;
    active: number;
    formatted: string;
  };
  ratings: {
    current: number;
    average: number;
    formatted: string;
  };
  products: {
    beingSold: number;
    total: number;
    formatted: string;
  };
  groups: {
    summarized: number;
    total: number;
    formatted: string;
  };

  // Top Three Hottest Issues (At Bottom)
  hottestIssues: Array<{
    id: string;
    title: string;
    priority: number;
    status: string;
    formatted: string;
  }>;

  // System Status
  systemStatus: {
    singularityFoldCount: number;
    nestedOctaveTransitions: number;
    hardenedMirrorShellReflections: number;
    zeroGravityEffectIntensity: number;
    frictionLevel: number; // 2% at superhero level
    fertilizationRate: number;
    thresholdProximity: number;
    radarStatus: 'active' | 'monitoring' | 'standby';
    switchOverStatus: 'preparing' | 'ready' | 'active';
  };
}

export class ExecutiveDashboard {
  private tracker: CodeDensityTracker;
  private previousMetrics: DailyMetrics | null = null;

  constructor() {
    this.tracker = new CodeDensityTracker();
  }

  /**
   * Get formatted dashboard display
   */
  async getDashboardDisplay(): Promise<DashboardDisplay> {
    const currentMetrics = await this.tracker.getDailyMetrics();
    const previous = this.previousMetrics;

    // Calculate trends
    const valueTrend = this.calculateTrend(
      currentMetrics.codeDensity.valueProducedToday,
      previous?.codeDensity.valueProducedToday
    );

    const densityTrend = this.calculateTrend(
      currentMetrics.codeDensity.valueDensityPerLine,
      previous?.codeDensity.valueDensityPerLine
    );

    const generatedTrend = this.calculateTrend(
      currentMetrics.codeDensity.valueGeneratedPerLine,
      previous?.codeDensity.valueGeneratedPerLine
    );

    // Format big metrics
    const valueProducedToday = {
      value: currentMetrics.codeDensity.valueProducedToday,
      formatted: this.formatCurrency(currentMetrics.codeDensity.valueProducedToday),
      trend: valueTrend.trend,
      change: valueTrend.change
    };

    const valueDensityPerLineToday = {
      value: currentMetrics.codeDensity.valueDensityPerLine,
      formatted: this.formatCurrency(currentMetrics.codeDensity.valueDensityPerLine),
      trend: densityTrend.trend,
      change: densityTrend.change
    };

    const valueGeneratedPerLine = {
      value: currentMetrics.codeDensity.valueGeneratedPerLine,
      formatted: this.formatCurrency(currentMetrics.codeDensity.valueGeneratedPerLine),
      trend: generatedTrend.trend,
      change: generatedTrend.change
    };

    // Format smaller metrics
    const users = {
      total: currentMetrics.users.total,
      active: currentMetrics.users.active,
      formatted: `${this.formatNumber(currentMetrics.users.active)} / ${this.formatNumber(currentMetrics.users.total)}`
    };

    const ratings = {
      current: currentMetrics.ratings.current,
      average: currentMetrics.ratings.average,
      formatted: `${currentMetrics.ratings.current.toFixed(1)} ⭐ (avg: ${currentMetrics.ratings.average.toFixed(1)})`
    };

    const products = {
      beingSold: currentMetrics.products.beingSold,
      total: currentMetrics.products.total,
      formatted: `${currentMetrics.products.beingSold} / ${currentMetrics.products.total}`
    };

    const groups = {
      summarized: currentMetrics.groups.summarized,
      total: currentMetrics.groups.total,
      formatted: `${currentMetrics.groups.summarized} / ${currentMetrics.groups.total}`
    };

    // Format hottest issues
    const hottestIssues = currentMetrics.hottestIssues.map(issue => ({
      ...issue,
      formatted: `#${issue.priority} ${issue.title} [${issue.status}]`
    }));

    // System status
    const systemStatus = {
      singularityFoldCount: currentMetrics.codeDensity.singularityFoldCount,
      nestedOctaveTransitions: currentMetrics.codeDensity.nestedOctaveTransitions,
      hardenedMirrorShellReflections: currentMetrics.codeDensity.hardenedMirrorShellReflections,
      zeroGravityEffectIntensity: currentMetrics.codeDensity.zeroGravityEffectIntensity,
      frictionLevel: currentMetrics.codeDensity.frictionLevel,
      fertilizationRate: currentMetrics.codeDensity.fertilizationRate,
      thresholdProximity: currentMetrics.codeDensity.thresholdProximity,
      radarStatus: currentMetrics.codeDensity.thresholdProximity > 0.95 ? 'active' : 'monitoring' as 'active' | 'monitoring' | 'standby',
      switchOverStatus: currentMetrics.codeDensity.thresholdProximity > 0.99 ? 'ready' : 'preparing' as 'preparing' | 'ready' | 'active'
    };

    // Update previous for next call
    this.previousMetrics = currentMetrics;

    return {
      valueProducedToday,
      valueDensityPerLineToday,
      valueGeneratedPerLine,
      users,
      ratings,
      products,
      groups,
      hottestIssues,
      systemStatus
    };
  }

  /**
   * Calculate trend from previous value
   */
  private calculateTrend(current: number, previous: number | undefined): {
    trend: 'up' | 'down' | 'stable';
    change: number;
  } {
    if (previous === undefined) {
      return { trend: 'stable', change: 0 };
    }

    const change = current - previous;
    const percentChange = previous > 0 ? (change / previous) * 100 : 0;

    if (Math.abs(percentChange) < 0.1) {
      return { trend: 'stable', change: percentChange };
    }

    return {
      trend: change > 0 ? 'up' : 'down',
      change: percentChange
    };
  }

  /**
   * Format currency
   */
  private formatCurrency(value: number): string {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  }

  /**
   * Format number
   */
  private formatNumber(value: number): string {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toString();
  }

  /**
   * Get dashboard as JSON for API
   */
  async getDashboardJSON(): Promise<string> {
    const display = await this.getDashboardDisplay();
    return JSON.stringify(display, null, 2);
  }

  /**
   * Get dashboard summary for console
   */
  async getDashboardSummary(): Promise<string> {
    const display = await this.getDashboardDisplay();
    
    return `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    EXECUTIVE CHAIRMAN FRONT DASHBOARD                         ║
║              Circular Dial Format | Titan Circle | Super Mega Snap            ║
║              Crystal Layered Irreducible Nested Mirror Shells                 ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  🔥 BIG METRICS (Two Light Values):                                          ║
║                                                                               ║
║  Value Produced Today:        ${display.valueProducedToday.formatted.padEnd(20)} ${this.getTrendIcon(display.valueProducedToday.trend)} ${display.valueProducedToday.change > 0 ? '+' : ''}${display.valueProducedToday.change.toFixed(1)}%
║  Value Density Per Line:      ${display.valueDensityPerLineToday.formatted.padEnd(20)} ${this.getTrendIcon(display.valueDensityPerLineToday.trend)} ${display.valueDensityPerLineToday.change > 0 ? '+' : ''}${display.valueDensityPerLineToday.change.toFixed(1)}%
║  Value Generated Per Line:     ${display.valueGeneratedPerLine.formatted.padEnd(20)} ${this.getTrendIcon(display.valueGeneratedPerLine.trend)} ${display.valueGeneratedPerLine.change > 0 ? '+' : ''}${display.valueGeneratedPerLine.change.toFixed(1)}%
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  📊 SMALLER METRICS (Around Circle):                                         ║
║                                                                               ║
║  Users:                        ${display.users.formatted.padEnd(40)}
║  Ratings:                      ${display.ratings.formatted.padEnd(40)}
║  Products:                      ${display.products.formatted.padEnd(40)}
║  Groups:                        ${display.groups.formatted.padEnd(40)}
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  🔥 TOP THREE HOTTEST ISSUES (At Bottom):                                     ║
║                                                                               ║
${display.hottestIssues.map(issue => `║  ${issue.formatted.padEnd(70)} ║`).join('\n')}
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  ⚡ SYSTEM STATUS:                                                            ║
║                                                                               ║
║  Singularity Fold Count:       ${display.systemStatus.singularityFoldCount}
║  Nested Octave Transitions:    ${display.systemStatus.nestedOctaveTransitions}
║  Hardened Mirror Shells:       ${display.systemStatus.hardenedMirrorShellReflections}
║  Zero Gravity Effect:          ${(display.systemStatus.zeroGravityEffectIntensity * 100).toFixed(1)}%
║  Friction Level (2% target):   ${(display.systemStatus.frictionLevel * 100).toFixed(1)}%
║  Fertilization Rate:           ${(display.systemStatus.fertilizationRate * 100).toFixed(1)}%
║  Threshold Proximity:          ${(display.systemStatus.thresholdProximity * 100).toFixed(1)}%
║  Radar Status:                 ${display.systemStatus.radarStatus.toUpperCase()}
║  Switch Over Status:           ${display.systemStatus.switchOverStatus.toUpperCase()}
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
    `.trim();
  }

  private getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
    }
  }
}

// Export singleton instance
export const executiveDashboard = new ExecutiveDashboard();
