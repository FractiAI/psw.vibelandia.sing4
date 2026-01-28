/**
 * Attention Head Navigation Instructions Generator
 * 
 * Generates line-by-line instructions for attention heads to navigate
 * using NSPFRNP natural protocols
 * 
 * Instructions are formatted for attention head consumption and execution
 */

import { GPSCoordinates, GPSSeedEdgePathway } from './gps-seed-edge-system';

// ============================================================================
// INTERFACES
// ============================================================================

export interface NavigationInstruction {
  line: number;
  instruction: string;
  type: 'seed' | 'edge' | 'pathway' | 'coordinate' | 'execute' | 'nspfrnp';
  attentionHead: string;
  protocol: 'nspfrnp-natural';
  timestamp: number;
}

export interface AttentionHeadNavigation {
  seed: GPSCoordinates;
  edge: GPSCoordinates;
  pathway: GPSSeedEdgePathway;
  instructions: NavigationInstruction[];
  totalLines: number;
  protocol: 'nspfrnp';
  format: 'attention-head-readable';
}

// ============================================================================
// INSTRUCTION GENERATOR
// ============================================================================

export class AttentionHeadNavigationInstructions {
  /**
   * Generate line-by-line navigation instructions for attention heads
   */
  generateInstructions(pathway: GPSSeedEdgePathway): AttentionHeadNavigation {
    const instructions: NavigationInstruction[] = [];
    let lineNumber = 1;

    // Line 1: Seed Activation
    instructions.push({
      line: lineNumber++,
      instruction: `ACTIVATE_SEED: ${pathway.seed.location} (${pathway.seed.coordinates.latitude}, ${pathway.seed.coordinates.longitude})`,
      type: 'seed',
      attentionHead: 'seed-activation',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 2: Seed Coordinates
    instructions.push({
      line: lineNumber++,
      instruction: `SEED_COORDINATES: LAT ${pathway.seed.coordinates.latitude} LNG ${pathway.seed.coordinates.longitude} ALT ${pathway.seed.coordinates.altitude || 0}`,
      type: 'coordinate',
      attentionHead: 'coordinate-processing',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 3: Edge Target
    instructions.push({
      line: lineNumber++,
      instruction: `TARGET_EDGE: ${pathway.edge.location} (${pathway.edge.coordinates.latitude}, ${pathway.edge.coordinates.longitude})`,
      type: 'edge',
      attentionHead: 'edge-targeting',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 4: Edge Coordinates
    instructions.push({
      line: lineNumber++,
      instruction: `EDGE_COORDINATES: LAT ${pathway.edge.coordinates.latitude} LNG ${pathway.edge.coordinates.longitude} ALT ${pathway.edge.coordinates.altitude || 0}`,
      type: 'coordinate',
      attentionHead: 'coordinate-processing',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 5: Pathway Opening
    instructions.push({
      line: lineNumber++,
      instruction: `OPEN_PATHWAY: SEED_TO_EDGE PROTOCOL=NSPFRNP STATUS=OPEN`,
      type: 'pathway',
      attentionHead: 'pathway-activation',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 6: Distance Calculation
    instructions.push({
      line: lineNumber++,
      instruction: `CALCULATE_DISTANCE: ${pathway.distance.toFixed(2)} METERS (${(pathway.distance / 1000).toFixed(2)} KM)`,
      type: 'nspfrnp',
      attentionHead: 'distance-calculation',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 7: Bearing Calculation
    instructions.push({
      line: lineNumber++,
      instruction: `CALCULATE_BEARING: ${pathway.bearing.toFixed(1)} DEGREES FROM_NORTH`,
      type: 'nspfrnp',
      attentionHead: 'bearing-calculation',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 8: Natural Protocol Activation
    instructions.push({
      line: lineNumber++,
      instruction: `ACTIVATE_NATURAL_PROTOCOL: BEE_COLONY_STIGMERGY ANT_FORAGING MYCELIAL_NETWORK HOLOGRAPHIC_PROPAGATION`,
      type: 'nspfrnp',
      attentionHead: 'protocol-activation',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 9: Path Optimization
    instructions.push({
      line: lineNumber++,
      instruction: `OPTIMIZE_PATH: PATH_OF_LEAST_RESISTANCE FRACTAL_ROUTING NATURAL_COORDINATION`,
      type: 'nspfrnp',
      attentionHead: 'path-optimization',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 10: Energy Balance
    instructions.push({
      line: lineNumber++,
      instruction: `MAINTAIN_NET_ZERO: ENERGY_INPUT=1.0 EFFICIENCY=0.98 ENERGY_OUTPUT=1.0 NET=0.000`,
      type: 'nspfrnp',
      attentionHead: 'energy-balance',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 11: Navigation Start
    instructions.push({
      line: lineNumber++,
      instruction: `NAVIGATE_START: FROM ${pathway.seed.location} TO ${pathway.edge.location} BEARING ${pathway.bearing.toFixed(1)}°`,
      type: 'execute',
      attentionHead: 'navigation-execution',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line 12: Waypoint Calculation (if distance > 1km)
    if (pathway.distance > 1000) {
      const waypoints = this.calculateWaypoints(pathway);
      waypoints.forEach((waypoint, index) => {
        instructions.push({
          line: lineNumber++,
          instruction: `WAYPOINT_${index + 1}: LAT ${waypoint.latitude.toFixed(6)} LNG ${waypoint.longitude.toFixed(6)} BEARING ${waypoint.bearing.toFixed(1)}° DISTANCE ${waypoint.distance.toFixed(0)}M`,
          type: 'coordinate',
          attentionHead: 'waypoint-navigation',
          protocol: 'nspfrnp-natural',
          timestamp: Date.now()
        });
      });
    }

    // Line N: Full Sensory Activation
    instructions.push({
      line: lineNumber++,
      instruction: `ACTIVATE_FULL_SENSORY: VISUAL AUDITORY TACTILE KINESTHETIC OLFACTORY GUSTATORY`,
      type: 'nspfrnp',
      attentionHead: 'sensory-activation',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line N+1: Holographic Propagation
    instructions.push({
      line: lineNumber++,
      instruction: `HOLOGRAPHIC_PROPAGATION: WHOLE_IN_EVERY_PART INSTANT_TRANSMISSION MAXIMUM_DENSITY`,
      type: 'nspfrnp',
      attentionHead: 'holographic-processing',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line N+2: Execution Command
    instructions.push({
      line: lineNumber++,
      instruction: `EXECUTE_NAVIGATION: IMMEDIATE AUTOMATIC NATURAL_PROTOCOL NET_ZERO_MAINTAINED`,
      type: 'execute',
      attentionHead: 'execution-control',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    // Line N+3: Completion
    instructions.push({
      line: lineNumber++,
      instruction: `NAVIGATION_COMPLETE: ARRIVED_AT ${pathway.edge.location} NET_ZERO=0.000 STATUS=SUCCESS`,
      type: 'execute',
      attentionHead: 'completion-verification',
      protocol: 'nspfrnp-natural',
      timestamp: Date.now()
    });

    return {
      seed: pathway.seed.coordinates,
      edge: pathway.edge.coordinates,
      pathway,
      instructions,
      totalLines: instructions.length,
      protocol: 'nspfrnp',
      format: 'attention-head-readable'
    };
  }

  /**
   * Calculate waypoints for long-distance navigation
   */
  private calculateWaypoints(pathway: GPSSeedEdgePathway): Array<{
    latitude: number;
    longitude: number;
    bearing: number;
    distance: number;
  }> {
    const waypoints: Array<{
      latitude: number;
      longitude: number;
      bearing: number;
      distance: number;
    }> = [];

    // Calculate waypoints every 1km for distances > 1km
    const waypointInterval = 1000; // 1km
    const numWaypoints = Math.floor(pathway.distance / waypointInterval);

    if (numWaypoints > 0) {
      for (let i = 1; i <= numWaypoints; i++) {
        const distance = i * waypointInterval;
        const waypoint = this.calculateIntermediatePoint(
          pathway.seed.coordinates,
          pathway.edge.coordinates,
          distance / pathway.distance
        );

        waypoints.push({
          latitude: waypoint.latitude,
          longitude: waypoint.longitude,
          bearing: pathway.bearing,
          distance: distance
        });
      }
    }

    return waypoints;
  }

  /**
   * Calculate intermediate point between two coordinates
   */
  private calculateIntermediatePoint(
    start: GPSCoordinates,
    end: GPSCoordinates,
    fraction: number
  ): GPSCoordinates {
    const φ1 = start.latitude * Math.PI / 180;
    const φ2 = end.latitude * Math.PI / 180;
    const λ1 = start.longitude * Math.PI / 180;
    const λ2 = end.longitude * Math.PI / 180;

    const Δφ = φ2 - φ1;
    const Δλ = λ2 - λ1;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const δ = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const A = Math.sin((1-fraction) * δ) / Math.sin(δ);
    const B = Math.sin(fraction * δ) / Math.sin(δ);

    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
    const z = A * Math.sin(φ1) + B * Math.sin(φ2);

    const φ3 = Math.atan2(z, Math.sqrt(x*x + y*y));
    const λ3 = Math.atan2(y, x);

    return {
      latitude: φ3 * 180 / Math.PI,
      longitude: λ3 * 180 / Math.PI,
      timestamp: Date.now()
    };
  }

  /**
   * Format instructions as plain text for attention head reading
   */
  formatAsText(navigation: AttentionHeadNavigation): string {
    let text = `// NSPFRNP Navigation Instructions for Attention Heads\n`;
    text += `// Protocol: ${navigation.protocol}\n`;
    text += `// Format: ${navigation.format}\n`;
    text += `// Total Lines: ${navigation.totalLines}\n\n`;

    navigation.instructions.forEach(instruction => {
      text += `LINE_${instruction.line.toString().padStart(3, '0')}: ${instruction.instruction}\n`;
    });

    return text;
  }

  /**
   * Format instructions as JSON for programmatic access
   */
  formatAsJSON(navigation: AttentionHeadNavigation): string {
    return JSON.stringify(navigation, null, 2);
  }

  /**
   * Format instructions as structured data for attention heads
   */
  formatAsStructured(navigation: AttentionHeadNavigation): {
    header: {
      protocol: string;
      format: string;
      totalLines: number;
      timestamp: number;
    };
    instructions: Array<{
      line: number;
      instruction: string;
      type: string;
      attentionHead: string;
    }>;
  } {
    return {
      header: {
        protocol: navigation.protocol,
        format: navigation.format,
        totalLines: navigation.totalLines,
        timestamp: Date.now()
      },
      instructions: navigation.instructions.map(inst => ({
        line: inst.line,
        instruction: inst.instruction,
        type: inst.type,
        attentionHead: inst.attentionHead
      }))
    };
  }
}

// ============================================================================
// EXPORT
// ============================================================================

export default AttentionHeadNavigationInstructions;
