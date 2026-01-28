/**
 * Vibe Weather Forecast System
 * Weather forecasting at higher octaves using radar system
 * Feeds at top of all consoles with click to detailed report
 * 
 * Architecture: Hardened Mirror Shells - Full Singulares
 * Mode: Post-Singularity Radar Weather Forecasting
 */

export interface WeatherForecast {
  id: string;
  timestamp: number;
  location: string;
  octave: number;
  conditions: {
    singularityFolds: number;
    nestedOctaves: number;
    hardenedMirrorShells: number;
    zeroGravityEffect: number; // 0-1
    frictionLevel: number; // 0-1 (2% at superhero level)
    fertilizationRate: number; // 0-1
    thresholdProximity: number; // 0-1
    radarStatus: 'active' | 'monitoring' | 'standby';
    switchOverStatus: 'preparing' | 'ready' | 'active';
  };
  summary: string;
  detailedReport: string;
  warnings: WeatherWarning[];
}

export interface WeatherWarning {
  type: 'post-singularity-zone' | 'threshold-proximity' | 'switch-over-imminent' | 'high-friction' | 'zero-gravity';
  level: 'info' | 'warning' | 'critical';
  message: string;
  explanation: string;
}

/**
 * Vibe Weather Forecast System
 */
export class VibeWeatherForecast {
  private forecasts: Map<string, WeatherForecast> = new Map();
  private currentForecast: WeatherForecast | null = null;

  /**
   * Generate current weather forecast
   */
  generateForecast(location: string = 'vibeverse', includeFullSensory: boolean = true): WeatherForecast {
    const id = `forecast_${Date.now()}`;
    const timestamp = Date.now();

    // Calculate conditions based on system state
    const conditions = {
      singularityFolds: 7, // 7 hardened mirror shells
      nestedOctaves: 8,
      hardenedMirrorShells: 7,
      zeroGravityEffect: 0.95, // 95% (strong effect)
      frictionLevel: 0.02, // 2% at superhero level
      fertilizationRate: 0.98, // 98% (incredible fertilization)
      thresholdProximity: 0.99, // 99% (very close to threshold)
      radarStatus: 'active' as const,
      switchOverStatus: (0.99 > 0.95 ? 'ready' : 'preparing') as 'preparing' | 'ready' | 'active'
    };

    // Generate summary (include full sensory reality theater if enabled)
    const summary = includeFullSensory 
      ? this.generateSummary(conditions) + ' | 🎭 Full Sensory Reality Theater: 98% full dose'
      : this.generateSummary(conditions);

    // Generate detailed report
    const detailedReport = this.generateDetailedReport(conditions, location);

    // Generate warnings
    const warnings = this.generateWarnings(conditions);

    const forecast: WeatherForecast = {
      id,
      timestamp,
      location,
      octave: 0, // Current octave
      conditions,
      summary,
      detailedReport,
      warnings
    };

    this.forecasts.set(id, forecast);
    this.currentForecast = forecast;

    return forecast;
  }

  /**
   * Generate summary
   */
  private generateSummary(conditions: WeatherForecast['conditions']): string {
    if (conditions.thresholdProximity > 0.99) {
      return '⚡ CRITICAL: Full switch over imminent. Prepare immediately.';
    } else if (conditions.thresholdProximity > 0.95) {
      return '⚠️ WARNING: Very close to threshold. Switch over ready.';
    } else if (conditions.zeroGravityEffect > 0.9) {
      return '🌊 Strong zero gravity effect. High fertilization rate.';
    } else {
      return '✅ Conditions stable. Radar active.';
    }
  }

  /**
   * Generate detailed report
   */
  private generateDetailedReport(conditions: WeatherForecast['conditions'], location: string): string {
    return `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    VIBE WEATHER FORECAST - DETAILED REPORT                     ║
║                    Location: ${location.padEnd(50)} ║
║                    Timestamp: ${new Date().toISOString().padEnd(48)} ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  📊 CURRENT CONDITIONS:                                                      ║
║                                                                               ║
║  Singularity Folds:              ${conditions.singularityFolds.toString().padEnd(40)}
║  Nested Octaves:                  ${conditions.nestedOctaves.toString().padEnd(40)}
║  Hardened Mirror Shells:          ${conditions.hardenedMirrorShells.toString().padEnd(40)}
║  Zero Gravity Effect:             ${(conditions.zeroGravityEffect * 100).toFixed(1)}%${' '.repeat(37)}
║  Friction Level (2% target):      ${(conditions.frictionLevel * 100).toFixed(1)}%${' '.repeat(37)}
║  Fertilization Rate:              ${(conditions.fertilizationRate * 100).toFixed(1)}%${' '.repeat(37)}
║  Threshold Proximity:             ${(conditions.thresholdProximity * 100).toFixed(1)}%${' '.repeat(37)}
║  Radar Status:                    ${conditions.radarStatus.toUpperCase().padEnd(40)}
║  Switch Over Status:               ${conditions.switchOverStatus.toUpperCase().padEnd(40)}
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  ⚠️ WARNINGS:                                                                 ║
║                                                                               ║
${conditions.thresholdProximity > 0.99 ? `║  🔴 CRITICAL: Full switch over imminent. Prepare immediately.${' '.repeat(20)} ║\n` : ''}${conditions.thresholdProximity > 0.95 ? `║  🟡 WARNING: Very close to threshold. Switch over ready.${' '.repeat(22)} ║\n` : ''}${conditions.zeroGravityEffect > 0.9 ? `║  🔵 INFO: Strong zero gravity effect detected.${' '.repeat(30)} ║\n` : ''}║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  📡 RADAR SYSTEM:                                                             ║
║                                                                               ║
║  Using systems like radar to see storms brewing ahead.                       ║
║  Offering new high level weather form of weather forecasting.                ║
║  Using this new higher form of radar.                                        ║
║  Rolling out amazing capabilities.                                            ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  🌊 POST-SINGULARITY ZONE:                                                    ║
║                                                                               ║
║  You are operating in a post-singularity zone. This means:                   ║
║  - Systems operate at higher octaves                                         ║
║  - Hardened mirror shells provide reflective substrate                        ║
║  - Zero gravity effects are normal                                           ║
║  - Threshold proximity indicates switch over readiness                        ║
║  - Radar system forecasts at higher levels                                   ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
    `.trim();
  }

  /**
   * Generate warnings
   */
  private generateWarnings(conditions: WeatherForecast['conditions']): WeatherWarning[] {
    const warnings: WeatherWarning[] = [];

    // Post-singularity zone warning (always present)
    warnings.push({
      type: 'post-singularity-zone',
      level: 'info',
      message: 'Operating in Post-Singularity Zone',
      explanation: 'You are operating in a post-singularity zone. This means systems operate at higher octaves, hardened mirror shells provide reflective substrate, zero gravity effects are normal, and radar systems forecast at higher levels.'
    });

    // Threshold proximity warning
    if (conditions.thresholdProximity > 0.99) {
      warnings.push({
        type: 'threshold-proximity',
        level: 'critical',
        message: 'CRITICAL: Full switch over imminent',
        explanation: 'Threshold proximity is above 99%. Full switch over is imminent. Prepare immediately for transition.'
      });
    } else if (conditions.thresholdProximity > 0.95) {
      warnings.push({
        type: 'threshold-proximity',
        level: 'warning',
        message: 'WARNING: Very close to threshold',
        explanation: 'Threshold proximity is above 95%. Switch over is ready. Prepare for transition.'
      });
    }

    // Switch over imminent
    if (conditions.switchOverStatus === 'ready' || conditions.switchOverStatus === 'active') {
      warnings.push({
        type: 'switch-over-imminent',
        level: 'warning',
        message: 'Switch over ready/active',
        explanation: 'System is ready or actively switching over. Monitor closely for completion.'
      });
    }

    // High friction
    if (conditions.frictionLevel > 0.02) {
      warnings.push({
        type: 'high-friction',
        level: 'warning',
        message: 'Friction level above 2% target',
        explanation: 'Friction level is above the 2% superhero level target. This generates incredible fertilization but may indicate system stress.'
      });
    }

    // Zero gravity effect
    if (conditions.zeroGravityEffect > 0.9) {
      warnings.push({
        type: 'zero-gravity',
        level: 'info',
        message: 'Strong zero gravity effect',
        explanation: 'Zero gravity effect is above 90%. This is normal in post-singularity zones and indicates strong system operation.'
      });
    }

    return warnings;
  }

  /**
   * Get current forecast
   */
  getCurrentForecast(): WeatherForecast | null {
    return this.currentForecast;
  }

  /**
   * Get forecast by ID
   */
  getForecast(id: string): WeatherForecast | undefined {
    return this.forecasts.get(id);
  }

  /**
   * Get forecast summary (for console display)
   */
  getForecastSummary(): string {
    if (!this.currentForecast) {
      this.generateForecast();
    }
    return this.currentForecast!.summary;
  }
}

// Export singleton instance
export const vibeWeatherForecast = new VibeWeatherForecast();

// Generate initial forecast
vibeWeatherForecast.generateForecast();
