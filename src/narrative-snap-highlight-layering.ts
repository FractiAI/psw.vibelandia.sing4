/**
 * Narrative Snap Highlight Layering System
 * NSPFRNP Architecture - Multi-Layer Narrative Organization
 * 
 * Status: Active
 * Protocol: NSPFRNP Natural System Protocol
 * Architecture: Irreducible Nested Hardened Mirroring Shells
 */

export enum NarrativeLayer {
  SEED = 0,           // Octave 0 = 0 - Origin point
  SURFACE = 1,        // Visible entry points
  DEPTH = 2,          // Core content
  RECURSIVE = 3,      // Self-reference
  TRANSFORM = 4,      // Metabolize → Crystallize → Animate
  INFINITE = 5,       // Expansion & series
  UNIVERSE = 6        // Complete system
}

export type NarrativeType = 
  | 'origin' 
  | 'entry' 
  | 'content' 
  | 'meta' 
  | 'transform' 
  | 'series' 
  | 'system';

export type NarrativePriority = 'high' | 'medium' | 'low';

export interface NarrativeSnapHighlight {
  id: string;
  title: string;
  content: string;
  type: NarrativeType;
  layer: NarrativeLayer;
  priority: NarrativePriority;
  tags: string[];
  series?: string;
  broadcastChannels: string[];
  timestamp: number;
  
  // Holographic property
  containsAllLayers: true;
  containsAllSnaps: true;
  
  // Recursive property
  selfReference?: NarrativeSnapHighlight[];
  
  // Nested property
  nestedSnaps?: NarrativeSnapHighlight[];
}

export interface NarrativeLayerSystem {
  layers: Map<NarrativeLayer, NarrativeSnapHighlight[]>;
  snapHighlights: NarrativeSnapHighlight[];
  holographic: true;
  recursive: true;
  nested: true;
}

/**
 * Narrative Snap Highlight Layering System
 */
export class NarrativeSnapHighlightSystem {
  private layers: Map<NarrativeLayer, NarrativeSnapHighlight[]>;
  private allSnaps: NarrativeSnapHighlight[];
  private system: NarrativeLayerSystem;

  constructor() {
    this.layers = new Map();
    this.allSnaps = [];
    this.initializeLayers();
    this.system = {
      layers: this.layers,
      snapHighlights: this.allSnaps,
      holographic: true,
      recursive: true,
      nested: true
    };
  }

  /**
   * Initialize all narrative layers
   */
  private initializeLayers(): void {
    // Initialize empty arrays for all layers
    for (let i = 0; i <= 6; i++) {
      this.layers.set(i as NarrativeLayer, []);
    }
  }

  /**
   * Add snap highlight to system
   * Automatically adds to all layers (holographic property)
   */
  addSnapHighlight(snap: NarrativeSnapHighlight): void {
    // Add to specific layer
    const layerSnaps = this.layers.get(snap.layer) || [];
    layerSnaps.push(snap);
    this.layers.set(snap.layer, layerSnaps);

    // Add to all snaps
    this.allSnaps.push(snap);

    // Holographic: Add reference to all layers
    snap.containsAllLayers = true;
    snap.containsAllSnaps = true;
  }

  /**
   * Get snap highlights for specific layer
   */
  getSnapsForLayer(layer: NarrativeLayer): NarrativeSnapHighlight[] {
    return this.layers.get(layer) || [];
  }

  /**
   * Get all snap highlights (all layers)
   */
  getAllNarrativeSnaps(): NarrativeSnapHighlight[] {
    return [...this.allSnaps];
  }

  /**
   * Get snap highlights by type
   */
  getSnapsByType(type: NarrativeType): NarrativeSnapHighlight[] {
    return this.allSnaps.filter(snap => snap.type === type);
  }

  /**
   * Get snap highlights by priority
   */
  getSnapsByPriority(priority: NarrativePriority): NarrativeSnapHighlight[] {
    return this.allSnaps.filter(snap => snap.priority === priority);
  }

  /**
   * Get snap highlights by tag
   */
  getSnapsByTag(tag: string): NarrativeSnapHighlight[] {
    return this.allSnaps.filter(snap => snap.tags.includes(tag));
  }

  /**
   * Navigate from one snap to related snaps
   * Can target specific layer or all layers
   */
  navigateFromSnap(
    snap: NarrativeSnapHighlight,
    targetLayer?: NarrativeLayer
  ): NarrativeSnapHighlight[] {
    if (targetLayer !== undefined) {
      // Navigate to specific layer
      return this.getSnapsForLayer(targetLayer);
    }

    // Navigate to all related snaps (holographic property)
    // Returns all snaps since each contains all layers
    return this.getAllNarrativeSnaps();
  }

  /**
   * Get snap highlights for series
   */
  getSnapsForSeries(series: string): NarrativeSnapHighlight[] {
    return this.allSnaps.filter(snap => snap.series === series);
  }

  /**
   * Get snap highlights for broadcast channel
   */
  getSnapsForChannel(channel: string): NarrativeSnapHighlight[] {
    return this.allSnaps.filter(snap => 
      snap.broadcastChannels.includes('all') || 
      snap.broadcastChannels.includes(channel)
    );
  }

  /**
   * Get layer statistics
   */
  getLayerStats(): Map<NarrativeLayer, number> {
    const stats = new Map<NarrativeLayer, number>();
    for (let i = 0; i <= 6; i++) {
      const layer = i as NarrativeLayer;
      const snaps = this.layers.get(layer) || [];
      stats.set(layer, snaps.length);
    }
    return stats;
  }

  /**
   * Get system summary
   */
  getSystemSummary(): string {
    const stats = this.getLayerStats();
    const totalSnaps = this.allSnaps.length;
    
    return `
╔═══════════════════════════════════════════════════════════════════════════════╗
║          NARRATIVE SNAP HIGHLIGHT LAYERING SYSTEM - NSPFRNP                  ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  📊 TOTAL SNAP HIGHLIGHTS: ${totalSnaps.toString().padEnd(50)} ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  LAYER STATISTICS:                                                            ║
║  ────────────────────────────────────────────────────────────────────────────║
║  Layer 0 (Seed):           ${(stats.get(NarrativeLayer.SEED) || 0).toString().padEnd(40)} ║
║  Layer 1 (Surface):       ${(stats.get(NarrativeLayer.SURFACE) || 0).toString().padEnd(40)} ║
║  Layer 2 (Depth):         ${(stats.get(NarrativeLayer.DEPTH) || 0).toString().padEnd(40)} ║
║  Layer 3 (Recursive):     ${(stats.get(NarrativeLayer.RECURSIVE) || 0).toString().padEnd(40)} ║
║  Layer 4 (Transform):     ${(stats.get(NarrativeLayer.TRANSFORM) || 0).toString().padEnd(40)} ║
║  Layer 5 (Infinite):      ${(stats.get(NarrativeLayer.INFINITE) || 0).toString().padEnd(40)} ║
║  Layer 6 (Universe):      ${(stats.get(NarrativeLayer.UNIVERSE) || 0).toString().padEnd(40)} ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  PROPERTIES:                                                                  ║
║  ────────────────────────────────────────────────────────────────────────────║
║  ✅ Holographic: Whole narrative in every snap highlight                     ║
║  ✅ Recursive: Self-reference at all levels                                 ║
║  ✅ Nested: Layers within layers                                             ║
║  ✅ NSPFRNP: Natural protocol compliance                                    ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
    `.trim();
  }

  /**
   * Get complete system
   */
  getSystem(): NarrativeLayerSystem {
    return this.system;
  }
}

/**
 * Create default snap highlights for each layer
 */
export function createDefaultNarrativeSnaps(): NarrativeSnapHighlight[] {
  return [
    // Layer 0: Seed
    {
      id: 'seed-narrative-origin',
      title: 'Narrative System Origin',
      content: 'The seed from which all narratives emerge. Octave 0 = 0. Infinite narrative potential.',
      type: 'origin',
      layer: NarrativeLayer.SEED,
      priority: 'high',
      tags: ['seed', 'origin', 'octave-0'],
      broadcastChannels: ['all'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },
    {
      id: 'seed-infinite-potential',
      title: 'Infinite Narrative Potential',
      content: 'All possible narratives exist here. Pre-manifestation state. Source of all narrative snap highlights.',
      type: 'origin',
      layer: NarrativeLayer.SEED,
      priority: 'high',
      tags: ['seed', 'potential', 'infinite'],
      broadcastChannels: ['all'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },

    // Layer 1: Surface
    {
      id: 'surface-current-story',
      title: 'Current Story Active',
      content: 'The story we are currently in. Active narrative. Visible entry point.',
      type: 'entry',
      layer: NarrativeLayer.SURFACE,
      priority: 'high',
      tags: ['surface', 'current', 'active'],
      broadcastChannels: ['all', 'feeds', 'catalogs', 'streams', 'decks'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },
    {
      id: 'surface-entry-point',
      title: 'Narrative Entry Point',
      content: 'Gateway to narrative depth. Accessible surface. Immediate comprehension.',
      type: 'entry',
      layer: NarrativeLayer.SURFACE,
      priority: 'high',
      tags: ['surface', 'entry', 'navigation'],
      broadcastChannels: ['all', 'feeds'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },

    // Layer 2: Depth
    {
      id: 'depth-ai-human-integration',
      title: 'AI-Human Integration Narrative',
      content: 'Dictation as memory, flow state model. Revolutionary collaboration. Natural extension of self.',
      type: 'content',
      layer: NarrativeLayer.DEPTH,
      priority: 'high',
      tags: ['ai-integration', 'flow-state', 'productivity', 'collaboration'],
      broadcastChannels: ['all', 'feeds', 'catalogs', 'streams', 'decks'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },
    {
      id: 'depth-3i-atlas',
      title: '3I/ATLAS Territory Manager Narrative',
      content: 'Chosen outer shell for all operations. Nested recursive jewel craft. Self-proving operational system.',
      type: 'content',
      layer: NarrativeLayer.DEPTH,
      priority: 'high',
      tags: ['3i-atlas', 'territory-manager', 'operations', 'self-proving'],
      broadcastChannels: ['all', 'feeds', 'catalogs', 'streams', 'decks'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },

    // Layer 3: Recursive
    {
      id: 'recursive-narrative-describes',
      title: 'Narrative Describes Narrative',
      content: 'This narrative system describes itself. Recursive self-reference. Meta-narrative layer.',
      type: 'meta',
      layer: NarrativeLayer.RECURSIVE,
      priority: 'medium',
      tags: ['recursive', 'meta', 'self-reference'],
      broadcastChannels: ['all'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },
    {
      id: 'recursive-snap-contains-snaps',
      title: 'Snap Highlight Contains Snap Highlights',
      content: 'Each snap highlight contains all others. Holographic property. Complete system in every part.',
      type: 'meta',
      layer: NarrativeLayer.RECURSIVE,
      priority: 'medium',
      tags: ['recursive', 'holographic', 'nested'],
      broadcastChannels: ['all'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },

    // Layer 4: Transform
    {
      id: 'transform-metabolize',
      title: 'Metabolize: Digest Narrative Patterns',
      content: 'Raw narrative → Processed narrative. Digest patterns and experiences. First phase of transformation.',
      type: 'transform',
      layer: NarrativeLayer.TRANSFORM,
      priority: 'high',
      tags: ['transform', 'metabolize', 'process'],
      broadcastChannels: ['all'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },
    {
      id: 'transform-crystallize',
      title: 'Crystallize: Form Narrative Structure',
      content: 'Processed narrative → Crystallized narrative. Form hardened structure. Second phase of transformation.',
      type: 'transform',
      layer: NarrativeLayer.TRANSFORM,
      priority: 'high',
      tags: ['transform', 'crystallize', 'structure'],
      broadcastChannels: ['all'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },
    {
      id: 'transform-animate',
      title: 'Animate: Bring Narrative to Life',
      content: 'Crystallized narrative → Living narrative. Bring structure to life. Third phase of transformation.',
      type: 'transform',
      layer: NarrativeLayer.TRANSFORM,
      priority: 'high',
      tags: ['transform', 'animate', 'life'],
      broadcastChannels: ['all'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },

    // Layer 5: Infinite
    {
      id: 'infinite-snap-episode',
      title: 'Every Snap Is Episode',
      content: 'Snap-to-episode transformation. Complete integration. Broadcasting Channel Series.',
      type: 'series',
      layer: NarrativeLayer.INFINITE,
      priority: 'high',
      tags: ['infinite', 'snap', 'episode', 'series'],
      series: 'Broadcasting Channel Series',
      broadcastChannels: ['all', 'feeds', 'catalogs', 'streams', 'decks'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },
    {
      id: 'infinite-monster-transmission',
      title: 'Monster Transmission Narrative',
      content: 'Complete network broadcast. All channels broadcasting. Full distribution system.',
      type: 'series',
      layer: NarrativeLayer.INFINITE,
      priority: 'high',
      tags: ['infinite', 'broadcast', 'transmission', 'distribution'],
      series: 'Broadcasting Channel Series',
      broadcastChannels: ['all', 'feeds', 'catalogs', 'streams', 'decks'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },

    // Layer 6: Universe
    {
      id: 'universe-complete-system',
      title: 'Complete Narrative System',
      content: 'All narratives integrated. Unified narrative universe. Complete system operational.',
      type: 'system',
      layer: NarrativeLayer.UNIVERSE,
      priority: 'high',
      tags: ['universe', 'complete', 'system', 'integrated'],
      broadcastChannels: ['all'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    },
    {
      id: 'universe-nspfrnp-complete',
      title: 'NSPFRNP Narrative Complete',
      content: 'Natural protocol narrative system. Complete integration. All layers operational.',
      type: 'system',
      layer: NarrativeLayer.UNIVERSE,
      priority: 'high',
      tags: ['universe', 'nspfrnp', 'protocol', 'complete'],
      broadcastChannels: ['all'],
      timestamp: Date.now(),
      containsAllLayers: true,
      containsAllSnaps: true
    }
  ];
}

/**
 * Initialize narrative snap highlight system with default snaps
 */
export function initializeNarrativeSnapSystem(): NarrativeSnapHighlightSystem {
  const system = new NarrativeSnapHighlightSystem();
  const defaultSnaps = createDefaultNarrativeSnaps();
  
  defaultSnaps.forEach(snap => {
    system.addSnapHighlight(snap);
  });
  
  return system;
}

/**
 * Export default system instance
 */
export const narrativeSnapHighlightSystem = initializeNarrativeSnapSystem();
