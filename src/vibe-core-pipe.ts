/**
 * Vibe! Core Social Media Pipe
 * Irreducible nested core - just the pipe, no bells and whistles
 * 
 * Architecture: Hardened Mirror Shells - Full Singulares
 * Mode: Post-Singularity Collaborative Work Social Media
 */

export interface VibePost {
  id: string;
  nodeId: string; // NODE identifier
  teamId: string;
  authorId: string;
  title: string;
  summary: string; // Summary below title
  rawMessage: string; // Executive NSPFRNP raw message
  images: string[]; // Image IDs (stored once, linked)
  timestamp: number;
  seed?: string; // Optional seed
  edge?: string; // Optional edge
  metadata: {
    shrinkWrap: boolean;
    playDeck: boolean;
    catalogEntry: boolean;
    screenWritingReady: boolean;
    contentReady: boolean;
  };
}

export interface VibeResponse {
  id: string;
  nodeId: string;
  postId: string;
  authorId: string;
  content: string;
  images: string[]; // Linked to original images
  timestamp: number;
  seed?: string;
  edge?: string;
  metadata: {
    shrinkWrap: boolean;
    playDeck: boolean;
    catalogEntry: boolean;
  };
}

export interface VibeAction {
  type: 'like' | 'comment' | 'response' | 'forward' | 'share';
  postId: string;
  userId: string;
  timestamp: number;
  data?: any;
}

export interface VibeFeed {
  posts: VibePost[];
  responses: VibeResponse[];
  actions: VibeAction[];
  recursiveFeeds: string[]; // Links to other recursive content feeds
}

/**
 * Core Vibe! Pipe - Irreducible Social Media Experience
 */
export class VibeCorePipe {
  private posts: Map<string, VibePost> = new Map();
  private responses: Map<string, VibeResponse> = new Map();
  private actions: Map<string, VibeAction> = new Map();
  private images: Map<string, { url: string; stored: boolean }> = new Map();
  private nodeCatalog: Map<string, any> = new Map();

  /**
   * Create a new post (team communication)
   */
  async createPost(post: Omit<VibePost, 'id' | 'nodeId' | 'timestamp'>): Promise<VibePost> {
    const nodeId = this.generateNodeId();
    const id = this.generateId();
    
    // Store images once
    const imageIds: string[] = [];
    for (const imageUrl of post.images) {
      const imageId = await this.storeImageOnce(imageUrl);
      imageIds.push(imageId);
    }

    const vibePost: VibePost = {
      id,
      nodeId,
      teamId: post.teamId,
      authorId: post.authorId,
      title: post.title,
      summary: post.summary,
      rawMessage: post.rawMessage,
      images: imageIds,
      timestamp: Date.now(),
      seed: post.seed,
      edge: post.edge,
      metadata: {
        shrinkWrap: true,
        playDeck: true,
        catalogEntry: true,
        screenWritingReady: true,
        contentReady: true
      }
    };

    this.posts.set(id, vibePost);
    this.addToCatalog(nodeId, vibePost);

    return vibePost;
  }

  /**
   * Create a response (linked to post, images linked not duplicated)
   */
  async createResponse(response: Omit<VibeResponse, 'id' | 'nodeId' | 'timestamp'>): Promise<VibeResponse> {
    const nodeId = this.generateNodeId();
    const id = this.generateId();

    // Link to original images (don't duplicate)
    const post = this.posts.get(response.postId);
    const linkedImages = post ? post.images : [];

    const vibeResponse: VibeResponse = {
      id,
      nodeId,
      postId: response.postId,
      authorId: response.authorId,
      content: response.content,
      images: linkedImages, // Linked, not duplicated
      timestamp: Date.now(),
      seed: response.seed,
      edge: response.edge,
      metadata: {
        shrinkWrap: true,
        playDeck: true,
        catalogEntry: true
      }
    };

    this.responses.set(id, vibeResponse);
    this.addToCatalog(nodeId, vibeResponse);

    return vibeResponse;
  }

  /**
   * Store image once, return ID for linking
   */
  private async storeImageOnce(imageUrl: string): Promise<string> {
    // Check if already stored
    for (const [id, image] of this.images.entries()) {
      if (image.url === imageUrl) {
        return id; // Return existing ID
      }
    }

    // Store new image
    const imageId = this.generateId();
    this.images.set(imageId, {
      url: imageUrl,
      stored: true
    });

    return imageId;
  }

  /**
   * Get image by ID
   */
  getImage(imageId: string): { url: string; stored: boolean } | undefined {
    return this.images.get(imageId);
  }

  /**
   * Get feed for team
   */
  getTeamFeed(teamId: string): VibeFeed {
    const teamPosts = Array.from(this.posts.values())
      .filter(post => post.teamId === teamId)
      .sort((a, b) => b.timestamp - a.timestamp);

    const postIds = teamPosts.map(p => p.id);
    const teamResponses = Array.from(this.responses.values())
      .filter(response => postIds.includes(response.postId))
      .sort((a, b) => b.timestamp - a.timestamp);

    const teamActions = Array.from(this.actions.values())
      .filter(action => postIds.includes(action.postId))
      .sort((a, b) => b.timestamp - a.timestamp);

    return {
      posts: teamPosts,
      responses: teamResponses,
      actions: teamActions,
      recursiveFeeds: [] // Will be populated by recursive system
    };
  }

  /**
   * Perform action (like, comment, response, forward, share)
   */
  performAction(action: Omit<VibeAction, 'timestamp'>): VibeAction {
    const id = this.generateId();
    const fullAction: VibeAction = {
      ...action,
      timestamp: Date.now()
    };

    this.actions.set(id, fullAction);
    return fullAction;
  }

  /**
   * Get post with all responses
   */
  getPostWithResponses(postId: string): { post: VibePost; responses: VibeResponse[] } | undefined {
    const post = this.posts.get(postId);
    if (!post) return undefined;

    const responses = Array.from(this.responses.values())
      .filter(response => response.postId === postId)
      .sort((a, b) => a.timestamp - b.timestamp);

    return { post, responses };
  }

  /**
   * Add to catalog (NODE system)
   */
  private addToCatalog(nodeId: string, item: any): void {
    this.nodeCatalog.set(nodeId, {
      ...item,
      cataloged: true,
      catalogTimestamp: Date.now()
    });
  }

  /**
   * Get from catalog
   */
  getFromCatalog(nodeId: string): any {
    return this.nodeCatalog.get(nodeId);
  }

  /**
   * Get all catalog entries (for recursive feeds)
   */
  getAllCatalogEntries(): any[] {
    return Array.from(this.nodeCatalog.values());
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `vibe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate NODE ID
   */
  private generateNodeId(): string {
    return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const vibeCorePipe = new VibeCorePipe();
