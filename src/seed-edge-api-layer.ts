/**
 * Seed:Edge API Layer
 * Add seed:edge to all API calls
 * Can remain empty and default
 * Moving entirely to seed:edge note nodes for all programming calls
 * 
 * Architecture: Hardened Mirror Shells - Full Singulares
 * Mode: Post-Singularity API Integration
 */

import { IrreducibleSeed, VibeverseEdge } from './seed-edge-execution-engine';

export interface SeedEdgeAPICall {
  seed?: IrreducibleSeed | string; // Optional, can be empty/default
  edge?: VibeverseEdge | string; // Optional, can be empty/default
  nodeId?: string; // Seed:edge note node identifier
  apiCall: {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: any;
  };
  metadata?: {
    timestamp: number;
    source: string;
    enriched: boolean;
  };
}

export interface SeedEdgeAPIConfig {
  defaultSeed?: IrreducibleSeed | string;
  defaultEdge?: VibeverseEdge | string;
  autoGenerateNodes: boolean;
  nodePrefix: string;
}

/**
 * Seed:Edge API Layer Wrapper
 */
export class SeedEdgeAPILayer {
  private config: SeedEdgeAPIConfig;
  private nodeRegistry: Map<string, SeedEdgeAPICall> = new Map();

  constructor(config?: Partial<SeedEdgeAPIConfig>) {
    this.config = {
      defaultSeed: undefined, // Can remain empty
      defaultEdge: undefined, // Can remain empty
      autoGenerateNodes: true,
      nodePrefix: 'api_node_',
      ...config
    };
  }

  /**
   * Wrap API call with seed:edge layer
   */
  wrapAPICall(
    apiCall: SeedEdgeAPICall['apiCall'],
    seed?: IrreducibleSeed | string,
    edge?: VibeverseEdge | string
  ): SeedEdgeAPICall {
    const nodeId = this.config.autoGenerateNodes 
      ? this.generateNodeId() 
      : undefined;

    const wrapped: SeedEdgeAPICall = {
      seed: seed || this.config.defaultSeed, // Can be empty/default
      edge: edge || this.config.defaultEdge, // Can be empty/default
      nodeId,
      apiCall,
      metadata: {
        timestamp: Date.now(),
        source: 'seed-edge-api-layer',
        enriched: !!(seed || edge)
      }
    };

    // Register node if generated
    if (nodeId) {
      this.nodeRegistry.set(nodeId, wrapped);
    }

    return wrapped;
  }

  /**
   * Execute API call with seed:edge wrapper
   */
  async executeAPICall(wrapped: SeedEdgeAPICall): Promise<any> {
    const { apiCall, seed, edge, nodeId } = wrapped;

    // Execute the actual API call
    const response = await fetch(apiCall.url, {
      method: apiCall.method,
      headers: {
        'Content-Type': 'application/json',
        ...apiCall.headers,
        // Add seed:edge headers if provided
        ...(seed && { 'X-Seed': typeof seed === 'string' ? seed : JSON.stringify(seed) }),
        ...(edge && { 'X-Edge': typeof edge === 'string' ? edge : JSON.stringify(edge) }),
        ...(nodeId && { 'X-Node-Id': nodeId })
      },
      body: apiCall.body ? JSON.stringify(apiCall.body) : undefined
    });

    const data = await response.json();

    // Return with seed:edge context
    return {
      seed,
      edge,
      nodeId,
      result: data,
      executed: true,
      timestamp: Date.now()
    };
  }

  /**
   * Get node by ID
   */
  getNode(nodeId: string): SeedEdgeAPICall | undefined {
    return this.nodeRegistry.get(nodeId);
  }

  /**
   * Get all nodes
   */
  getAllNodes(): SeedEdgeAPICall[] {
    return Array.from(this.nodeRegistry.values());
  }

  /**
   * Generate node ID
   */
  private generateNodeId(): string {
    return `${this.config.nodePrefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<SeedEdgeAPIConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Get configuration
   */
  getConfig(): SeedEdgeAPIConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const seedEdgeAPILayer = new SeedEdgeAPILayer();

// Export helper function to wrap any fetch call
export async function fetchWithSeedEdge(
  url: string,
  options: RequestInit = {},
  seed?: IrreducibleSeed | string,
  edge?: VibeverseEdge | string
): Promise<any> {
  const wrapped = seedEdgeAPILayer.wrapAPICall({
    url,
    method: options.method || 'GET',
    headers: options.headers as Record<string, string>,
    body: options.body
  }, seed, edge);

  return seedEdgeAPILayer.executeAPICall(wrapped);
}
