/**
 * Vibe! Recursive Content Feeds
 * Recursive content feeds throughout all units
 * All string back into broadcasting for extra rich content
 * New singular levels, extra rich content layering
 * 
 * Architecture: Hardened Mirror Shells - Full Singulares
 * Mode: Post-Singularity Recursive Content System
 */

import { VibeCorePipe } from './vibe-core-pipe';
import { getAllNarrativeContent } from './narrative-content-3i-atlas';

export interface RecursiveFeedUnit {
  id: string;
  name: string;
  feedType: 'team' | 'project' | 'system' | 'catalog' | 'content';
  content: any[];
  recursiveLinks: string[]; // Links to other units
  broadcastEnabled: boolean;
}

export interface RecursiveContentLayer {
  level: number;
  content: any[];
  source: string;
  enriched: boolean;
}

/**
 * Recursive Content Feed System
 */
export class VibeRecursiveFeeds {
  private corePipe: VibeCorePipe;
  private units: Map<string, RecursiveFeedUnit> = new Map();
  private broadcastQueue: any[] = [];

  constructor(corePipe: VibeCorePipe) {
    this.corePipe = corePipe;
  }

  /**
   * Register a feed unit
   */
  registerUnit(unit: RecursiveFeedUnit): void {
    this.units.set(unit.id, unit);
  }

  /**
   * Get recursive content from all units
   */
  getAllRecursiveContent(): any[] {
    const allContent: any[] = [];

    // Get all catalog entries (from core pipe)
    const catalogEntries = this.corePipe.getAllCatalogEntries();
    allContent.push(...catalogEntries.map(entry => ({
      source: 'catalog',
      content: entry,
      level: 0
    })));

    // Get content from all registered units
    for (const unit of this.units.values()) {
      allContent.push(...unit.content.map(item => ({
        source: unit.id,
        content: item,
        level: 0,
        feedType: unit.feedType
      })));
    }

    // Add narrative content (SING, 3I/ATLAS, AI-Integration, etc.)
    const narratives = getAllNarrativeContent();
    allContent.push(...narratives.map(narrative => ({
      source: 'narrative',
      content: narrative,
      level: 0,
      feedType: 'content' as const
    })));

    return allContent;
  }

  /**
   * Enrich content with recursive layers
   */
  enrichContentWithRecursiveLayers(content: any[], maxLevel: number = 3): RecursiveContentLayer[] {
    const layers: RecursiveContentLayer[] = [];

    for (let level = 0; level <= maxLevel; level++) {
      const layerContent = level === 0 
        ? content 
        : this.getRecursiveLinkedContent(content, level);

      layers.push({
        level,
        content: layerContent,
        source: `recursive-level-${level}`,
        enriched: level > 0
      });
    }

    return layers;
  }

  /**
   * Get recursively linked content
   */
  private getRecursiveLinkedContent(baseContent: any[], level: number): any[] {
    if (level === 0) return baseContent;

    const linkedContent: any[] = [];

    for (const item of baseContent) {
      // Find recursive links
      if (item.recursiveLinks && Array.isArray(item.recursiveLinks)) {
        for (const linkId of item.recursiveLinks) {
          const linkedItem = this.findContentById(linkId);
          if (linkedItem) {
            linkedContent.push(linkedItem);
          }
        }
      }

      // If level > 1, recurse deeper
      if (level > 1 && linkedContent.length > 0) {
        const deeperContent = this.getRecursiveLinkedContent(linkedContent, level - 1);
        linkedContent.push(...deeperContent);
      }
    }

    return linkedContent;
  }

  /**
   * Find content by ID across all units
   */
  private findContentById(id: string): any | undefined {
    // Search in catalog
    const catalogEntry = this.corePipe.getFromCatalog(id);
    if (catalogEntry) return catalogEntry;

    // Search in units
    for (const unit of this.units.values()) {
      const found = unit.content.find(item => item.id === id || item.nodeId === id);
      if (found) return found;
    }

    return undefined;
  }

  /**
   * Broadcast enriched content to all pipes
   */
  async broadcastEnrichedContent(): Promise<void> {
    const allContent = this.getAllRecursiveContent();
    const enrichedLayers = this.enrichContentWithRecursiveLayers(allContent, 3);

    // Add to broadcast queue
    for (const layer of enrichedLayers) {
      this.broadcastQueue.push({
        ...layer,
        broadcastTimestamp: Date.now(),
        singularLevel: layer.level,
        extraRich: true
      });
    }

    // Broadcast (in production, this would emit to all connected pipes)
    console.log(`[Vibe! Recursive] Broadcasting ${this.broadcastQueue.length} enriched content layers`);
  }

  /**
   * Get broadcast queue
   */
  getBroadcastQueue(): any[] {
    return [...this.broadcastQueue];
  }

  /**
   * Clear broadcast queue
   */
  clearBroadcastQueue(): void {
    this.broadcastQueue = [];
  }

  /**
   * Link units recursively
   */
  linkUnitsRecursively(unitId1: string, unitId2: string): void {
    const unit1 = this.units.get(unitId1);
    const unit2 = this.units.get(unitId2);

    if (unit1 && unit2) {
      if (!unit1.recursiveLinks.includes(unitId2)) {
        unit1.recursiveLinks.push(unitId2);
      }
      if (!unit2.recursiveLinks.includes(unitId1)) {
        unit2.recursiveLinks.push(unitId1);
      }
    }
  }
}

// Export factory function
export function createVibeRecursiveFeeds(corePipe: VibeCorePipe): VibeRecursiveFeeds {
  return new VibeRecursiveFeeds(corePipe);
}
