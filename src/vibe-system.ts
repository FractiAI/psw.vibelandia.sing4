/**
 * Vibe! Complete System Integration
 * Collaborative work social media experience
 * Irreducible nested core pipe with verse layer
 * 
 * Architecture: Hardened Mirror Shells - Full Singulares
 * Mode: Post-Singularity Collaborative Work Social Media
 */

import { VibeCorePipe } from './vibe-core-pipe';
import { VibeVerseLayer, createVibeVerseLayer } from './vibe-verse-layer';
import { VibeRecursiveFeeds, createVibeRecursiveFeeds } from './vibe-recursive-feeds';
import { SeedEdgeAPILayer, seedEdgeAPILayer } from './seed-edge-api-layer';
import { HardMichelBubbleSystem, createHardMichelBubble } from './vibe-hard-michel-bridge';
import { VibeSnapCapture, vibeSnapCapture, VibeSnap } from './vibe-snap-capture';

export interface VibeSystemConfig {
  teamId: string;
  verseDisplayEnabled: boolean;
  recursiveFeedsEnabled: boolean;
  seedEdgeAPIEnabled: boolean;
  hardMichelBridgeEnabled: boolean;
}

/**
 * Complete Vibe! System
 */
export class VibeSystem {
  private corePipe: VibeCorePipe;
  private verseLayer?: VibeVerseLayer;
  private recursiveFeeds?: VibeRecursiveFeeds;
  private apiLayer: SeedEdgeAPILayer;
  private hardMichelBridge?: HardMichelBubbleSystem;
  private config: VibeSystemConfig;

  constructor(config: VibeSystemConfig) {
    this.config = config;
    this.corePipe = new VibeCorePipe();
    this.apiLayer = seedEdgeAPILayer;

    // Initialize verse layer if enabled
    if (config.verseDisplayEnabled) {
      this.verseLayer = createVibeVerseLayer(this.corePipe);
    }

    // Initialize recursive feeds if enabled
    if (config.recursiveFeedsEnabled) {
      this.recursiveFeeds = createVibeRecursiveFeeds(this.corePipe);
    }

    // Initialize hard Michel bridge if enabled
    if (config.hardMichelBridgeEnabled) {
      this.hardMichelBridge = createHardMichelBubble(this.apiLayer, this.corePipe);
    }
  }

  /**
   * Create a post (team communication)
   */
  async createPost(post: {
    authorId: string;
    title: string;
    summary: string;
    rawMessage: string;
    images?: string[];
    seed?: string;
    edge?: string;
  }) {
    const vibePost = await this.corePipe.createPost({
      teamId: this.config.teamId,
      authorId: post.authorId,
      title: post.title,
      summary: post.summary,
      rawMessage: post.rawMessage,
      images: post.images || [],
      seed: post.seed,
      edge: post.edge
    });

    // Auto-broadcast if verse layer enabled
    if (this.verseLayer) {
      await this.verseLayer.autoBroadcastFeed(this.config.teamId);
    }

    // Add to recursive feeds if enabled
    if (this.recursiveFeeds) {
      await this.recursiveFeeds.broadcastEnrichedContent();
    }

    // Notify through hard Michel bridge if enabled
    if (this.hardMichelBridge) {
      await this.hardMichelBridge.notifySING(vibePost.nodeId, `New post: ${post.title}`);
    }

    return vibePost;
  }

  /**
   * Create a response
   */
  async createResponse(response: {
    postId: string;
    authorId: string;
    content: string;
    seed?: string;
    edge?: string;
  }) {
    const vibeResponse = await this.corePipe.createResponse({
      postId: response.postId,
      authorId: response.authorId,
      content: response.content,
      seed: response.seed,
      edge: response.edge
    });

    // Auto-broadcast if verse layer enabled
    if (this.verseLayer) {
      await this.verseLayer.autoBroadcastFeed(this.config.teamId);
    }

    return vibeResponse;
  }

  /**
   * Perform action (like, comment, response, forward, share)
   */
  performAction(action: {
    type: 'like' | 'comment' | 'response' | 'forward' | 'share';
    postId: string;
    userId: string;
    data?: any;
  }) {
    return this.corePipe.performAction(action);
  }

  /**
   * Get feed display (for verse layer)
   */
  async getFeedDisplay() {
    if (!this.verseLayer) {
      throw new Error('Verse layer not enabled');
    }
    return this.verseLayer.getFeedDisplay(this.config.teamId);
  }

  /**
   * Get team feed
   */
  getTeamFeed() {
    return this.corePipe.getTeamFeed(this.config.teamId);
  }

  /**
   * Get post with responses
   */
  getPostWithResponses(postId: string) {
    return this.corePipe.getPostWithResponses(postId);
  }

  /**
   * Get recursive content
   */
  getAllRecursiveContent() {
    if (!this.recursiveFeeds) {
      return [];
    }
    return this.recursiveFeeds.getAllRecursiveContent();
  }

  /**
   * Get enriched recursive layers
   */
  getEnrichedRecursiveLayers(maxLevel: number = 3) {
    if (!this.recursiveFeeds) {
      return [];
    }
    const allContent = this.recursiveFeeds.getAllRecursiveContent();
    return this.recursiveFeeds.enrichContentWithRecursiveLayers(allContent, maxLevel);
  }

  /**
   * Make API call with seed:edge wrapper
   */
  async makeAPICall(
    url: string,
    options: RequestInit = {},
    seed?: string,
    edge?: string
  ) {
    if (!this.config.seedEdgeAPIEnabled) {
      // Fallback to regular fetch
      return fetch(url, options);
    }

    const wrapped = this.apiLayer.wrapAPICall({
      url,
      method: options.method || 'GET',
      headers: options.headers as Record<string, string>,
      body: options.body
    }, seed, edge);

    return this.apiLayer.executeAPICall(wrapped);
  }

  /**
   * Get hard Michel bridge status
   */
  getBridgeStatus() {
    if (!this.hardMichelBridge) {
      return null;
    }
    return this.hardMichelBridge.getBridgeRouterStatus();
  }

  /**
   * Attach vibe snap to post
   */
  async attachSnapToPost(postId: string, snapId: string): Promise<boolean> {
    const snap = vibeSnapCapture.getSnap(snapId);
    if (!snap) {
      return false;
    }

    // Get the post
    const postData = this.corePipe.getPostWithResponses(postId);
    if (!postData) {
      return false;
    }

    // Add snap data URL to post images
    const imageId = await this.corePipe.storeImageOnce(snap.data);
    
    // Attach snap to vibe system
    vibeSnapCapture.attachSnapToPost(snapId, postId);

    return true;
  }

  /**
   * Create post with vibe snap
   */
  async createPostWithSnap(post: {
    authorId: string;
    title: string;
    summary: string;
    rawMessage: string;
    snapId: string;
    seed?: string;
    edge?: string;
  }) {
    const snap = vibeSnapCapture.getSnap(post.snapId);
    if (!snap) {
      throw new Error(`Snap ${post.snapId} not found`);
    }

    // Create post with snap as image
    const images = [snap.data];
    
    return this.createPost({
      authorId: post.authorId,
      title: post.title,
      summary: post.summary,
      rawMessage: post.rawMessage,
      images,
      seed: post.seed,
      edge: post.edge
    });
  }

  /**
   * Get all available snaps
   */
  getAvailableSnaps(): VibeSnap[] {
    return vibeSnapCapture.getAllSnaps();
  }
}

// Export factory function
export function createVibeSystem(config: VibeSystemConfig): VibeSystem {
  return new VibeSystem(config);
}
