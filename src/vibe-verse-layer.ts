/**
 * Vibe! Verse Layer
 * Wraps the core pipe with verse display layer
 * Many display on right, lower half of dashboard (away from center focus)
 * 
 * Architecture: Hardened Mirror Shells - Full Singulares
 * Mode: Post-Singularity Verse Integration
 */

import { VibeCorePipe, VibeFeed, VibePost } from './vibe-core-pipe';

export interface VerseDisplayConfig {
  position: 'right-lower-half';
  awayFromCenter: boolean;
  feedAutoBroadcast: boolean;
  imageHeaderDisplay: boolean;
  socialMediaFeel: boolean;
}

export interface VerseFeedDisplay {
  post: VibePost;
  imageHeader?: {
    imageId: string;
    imageUrl: string;
    title: string;
  };
  summary: string;
  rawMessage: string;
  actions: {
    likes: number;
    comments: number;
    responses: number;
    forwards: number;
    shares: number;
  };
  timestamp: number;
}

/**
 * Verse Layer - Wraps Vibe! Core Pipe
 */
export class VibeVerseLayer {
  private corePipe: VibeCorePipe;
  private config: VerseDisplayConfig;

  constructor(corePipe: VibeCorePipe) {
    this.corePipe = corePipe;
    this.config = {
      position: 'right-lower-half',
      awayFromCenter: true,
      feedAutoBroadcast: true,
      imageHeaderDisplay: true,
      socialMediaFeel: true
    };
  }

  /**
   * Get feed display for verse layer
   */
  async getFeedDisplay(teamId: string): Promise<VerseFeedDisplay[]> {
    const feed = this.corePipe.getTeamFeed(teamId);
    const displays: VerseFeedDisplay[] = [];

    for (const post of feed.posts) {
      // Get image header (first image)
      let imageHeader: VerseFeedDisplay['imageHeader'] | undefined;
      if (post.images.length > 0 && this.config.imageHeaderDisplay) {
        const image = this.corePipe.getImage(post.images[0]);
        if (image) {
          imageHeader = {
            imageId: post.images[0],
            imageUrl: image.url,
            title: post.title
          };
        }
      }

      // Get actions count
      const actions = feed.actions.filter(a => a.postId === post.id);
      const actionsCount = {
        likes: actions.filter(a => a.type === 'like').length,
        comments: actions.filter(a => a.type === 'comment').length,
        responses: actions.filter(a => a.type === 'response').length,
        forwards: actions.filter(a => a.type === 'forward').length,
        shares: actions.filter(a => a.type === 'share').length
      };

      displays.push({
        post,
        imageHeader,
        summary: post.summary,
        rawMessage: post.rawMessage,
        actions: actionsCount,
        timestamp: post.timestamp
      });
    }

    return displays;
  }

  /**
   * Auto-broadcast feed updates
   */
  async autoBroadcastFeed(teamId: string): Promise<void> {
    if (!this.config.feedAutoBroadcast) return;

    const feed = this.corePipe.getTeamFeed(teamId);
    
    // Broadcast to verse layer
    // In production, this would emit events or update real-time connections
    console.log(`[Vibe! Verse] Auto-broadcasting feed for team ${teamId}: ${feed.posts.length} posts`);
  }

  /**
   * Get display configuration
   */
  getConfig(): VerseDisplayConfig {
    return { ...this.config };
  }

  /**
   * Update display configuration
   */
  updateConfig(updates: Partial<VerseDisplayConfig>): void {
    this.config = { ...this.config, ...updates };
  }
}

// Export factory function
export function createVibeVerseLayer(corePipe: VibeCorePipe): VibeVerseLayer {
  return new VibeVerseLayer(corePipe);
}
