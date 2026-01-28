/**
 * GPS Seed:Edge System
 * 
 * GPS-based location system for Seed:Edge execution
 * Allows GPS coordinates as origin seeds and destination edges
 * Real-time location tracking and coordinate-based execution
 * 
 * NSPFRNP Natural Protocol Implementation
 */

// ============================================================================
// INTERFACES
// ============================================================================

export interface GPSCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  timestamp: number;
}

export interface GPSSeed {
  coordinates: GPSCoordinates;
  location: string;
  octave: 0;
  value: 0;
  type: 'gps-origin';
  property: 'physical-location-seed';
}

export interface GPSEdge {
  coordinates: GPSCoordinates;
  location: string;
  state: 'gps-destination';
  property: 'manifested-location';
}

export interface GPSSeedEdgePathway {
  seed: GPSSeed;
  edge: GPSEdge;
  distance: number; // in meters
  bearing: number; // in degrees
  protocol: 'nspfrnp-gps';
  execution: 'immediate';
}

export interface GPSExecutionResult {
  seed: GPSSeed;
  edge: GPSEdge;
  pathway: GPSSeedEdgePathway;
  executed: boolean;
  netZero: number;
  timestamp: number;
}

// ============================================================================
// GPS UTILITIES
// ============================================================================

export class GPSUtils {
  /**
   * Calculate distance between two GPS coordinates (Haversine formula)
   */
  static calculateDistance(coord1: GPSCoordinates, coord2: GPSCoordinates): number {
    const R = 6371000; // Earth radius in meters
    const φ1 = coord1.latitude * Math.PI / 180;
    const φ2 = coord2.latitude * Math.PI / 180;
    const Δφ = (coord2.latitude - coord1.latitude) * Math.PI / 180;
    const Δλ = (coord2.longitude - coord1.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }

  /**
   * Calculate bearing between two GPS coordinates
   */
  static calculateBearing(coord1: GPSCoordinates, coord2: GPSCoordinates): number {
    const φ1 = coord1.latitude * Math.PI / 180;
    const φ2 = coord2.latitude * Math.PI / 180;
    const Δλ = (coord2.longitude - coord1.longitude) * Math.PI / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
              Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

    const θ = Math.atan2(y, x);
    return (θ * 180 / Math.PI + 360) % 360; // Bearing in degrees
  }

  /**
   * Get current GPS location
   */
  static async getCurrentLocation(): Promise<GPSCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude || undefined,
            accuracy: position.coords.accuracy || undefined,
            timestamp: position.timestamp
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  /**
   * Watch GPS position (continuous updates)
   */
  static watchPosition(
    onSuccess: (coords: GPSCoordinates) => void,
    onError?: (error: GeolocationPositionError) => void
  ): number {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported');
    }

    return navigator.geolocation.watchPosition(
      (position) => {
        onSuccess({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude || undefined,
          accuracy: position.coords.accuracy || undefined,
          timestamp: position.timestamp
        });
      },
      onError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  /**
   * Format coordinates as string
   */
  static formatCoordinates(coords: GPSCoordinates): string {
    return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
  }

  /**
   * Parse coordinates from string
   */
  static parseCoordinates(str: string): GPSCoordinates | null {
    const match = str.match(/(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/);
    if (!match) return null;

    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
      timestamp: Date.now()
    };
  }
}

// ============================================================================
// GPS SEED:EDGE SYSTEM
// ============================================================================

export class GPSSeedEdgeSystem {
  private seed: GPSSeed | null = null;
  private edge: GPSEdge | null = null;
  private watchId: number | null = null;
  private netZeroEnergy: number = 0.000;

  /**
   * Set GPS seed location
   */
  setSeed(coordinates: GPSCoordinates, location?: string): GPSSeed {
    this.seed = {
      coordinates,
      location: location || GPSUtils.formatCoordinates(coordinates),
      octave: 0,
      value: 0,
      type: 'gps-origin',
      property: 'physical-location-seed'
    };

    this.maintainNetZero();
    return this.seed;
  }

  /**
   * Set GPS edge location
   */
  setEdge(coordinates: GPSCoordinates, location?: string): GPSEdge {
    this.edge = {
      coordinates,
      location: location || GPSUtils.formatCoordinates(coordinates),
      state: 'gps-destination',
      property: 'manifested-location'
    };

    this.maintainNetZero();
    return this.edge;
  }

  /**
   * Use current location as seed
   */
  async useCurrentLocationAsSeed(): Promise<GPSSeed> {
    const coords = await GPSUtils.getCurrentLocation();
    return this.setSeed(coords, 'Current Location');
  }

  /**
   * Use current location as edge
   */
  async useCurrentLocationAsEdge(): Promise<GPSEdge> {
    const coords = await GPSUtils.getCurrentLocation();
    return this.setEdge(coords, 'Current Location');
  }

  /**
   * Watch current location and update seed
   */
  startWatchingSeed(
    onUpdate: (seed: GPSSeed) => void,
    onError?: (error: GeolocationPositionError) => void
  ): void {
    this.watchId = GPSUtils.watchPosition(
      (coords) => {
        const seed = this.setSeed(coords, 'Current Location (Live)');
        onUpdate(seed);
      },
      onError
    );
  }

  /**
   * Stop watching location
   */
  stopWatching(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  /**
   * Create pathway between seed and edge
   */
  createPathway(): GPSSeedEdgePathway | null {
    if (!this.seed || !this.edge) {
      return null;
    }

    const distance = GPSUtils.calculateDistance(
      this.seed.coordinates,
      this.edge.coordinates
    );

    const bearing = GPSUtils.calculateBearing(
      this.seed.coordinates,
      this.edge.coordinates
    );

    return {
      seed: this.seed,
      edge: this.edge,
      distance,
      bearing,
      protocol: 'nspfrnp-gps',
      execution: 'immediate'
    };
  }

  /**
   * Execute GPS seed:edge pathway
   */
  async execute(): Promise<GPSExecutionResult> {
    if (!this.seed || !this.edge) {
      throw new Error('Seed and Edge must be set before execution');
    }

    const pathway = this.createPathway();
    if (!pathway) {
      throw new Error('Failed to create pathway');
    }

    // Maintain net zero
    this.maintainNetZero();

    return {
      seed: this.seed,
      edge: this.edge,
      pathway,
      executed: true,
      netZero: this.netZeroEnergy,
      timestamp: Date.now()
    };
  }

  /**
   * Maintain Net Zero energy balance
   */
  private maintainNetZero(): void {
    const energyInput = 1.0;
    const efficiency = 0.98;
    const energyOutput = 1.0;

    const netValue = (energyInput * efficiency) - energyOutput;
    this.netZeroEnergy = Math.abs(netValue) < 0.001 ? 0.000 : netValue;
  }

  /**
   * Get current seed
   */
  getSeed(): GPSSeed | null {
    return this.seed ? { ...this.seed } : null;
  }

  /**
   * Get current edge
   */
  getEdge(): GPSEdge | null {
    return this.edge ? { ...this.edge } : null;
  }

  /**
   * Get net zero balance
   */
  getNetZero(): number {
    return this.netZeroEnergy;
  }
}

// ============================================================================
// KNOWN LOCATIONS
// ============================================================================

export const KNOWN_LOCATIONS: Record<string, GPSCoordinates> = {
  'Reno, Nevada': {
    latitude: 39.5296,
    longitude: -119.8138,
    timestamp: Date.now()
  },
  'San Francisco, CA': {
    latitude: 37.7749,
    longitude: -122.4194,
    timestamp: Date.now()
  },
  'New York, NY': {
    latitude: 40.7128,
    longitude: -74.0060,
    timestamp: Date.now()
  },
  'London, UK': {
    latitude: 51.5074,
    longitude: -0.1278,
    timestamp: Date.now()
  },
  'Tokyo, Japan': {
    latitude: 35.6762,
    longitude: 139.6503,
    timestamp: Date.now()
  },
  'Sydney, Australia': {
    latitude: -33.8688,
    longitude: 151.2093,
    timestamp: Date.now()
  }
};

// ============================================================================
// INTEGRATION WITH ATTENTION HEAD NAVIGATION
// ============================================================================

import { AttentionHeadNavigationInstructions } from './attention-head-navigation-instructions';

GPSSeedEdgeSystem.prototype.generateNavigationInstructions = function() {
  const pathway = this.createPathway();
  if (!pathway) {
    throw new Error('Pathway must be created before generating instructions');
  }

  const generator = new AttentionHeadNavigationInstructions();
  return generator.generateInstructions(pathway);
};

// ============================================================================
// EXPORT
// ============================================================================

export default GPSSeedEdgeSystem;
