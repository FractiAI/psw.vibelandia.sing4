/**
 * Broadcast All Channels System
 * Monster Transmission - Broadcast to all feeds, catalogs, streams, decks
 * 
 * Architecture: Complete channel integration
 * Mode: Monster Transmission Active
 */

import { getAllNarrativeContent, NarrativeContent } from './narrative-content-3i-atlas';
import { VibeSystem } from './vibe-system';
import { VibeRecursiveFeeds } from './vibe-recursive-feeds';
import { VibeVerseLayer } from './vibe-verse-layer';

export interface BroadcastChannel {
  id: string;
  name: string;
  type: 'feed' | 'catalog' | 'stream' | 'deck' | 'broadcast';
  active: boolean;
  lastBroadcast?: number;
}

export interface BroadcastMessage {
  id: string;
  content: NarrativeContent;
  channels: string[];
  timestamp: number;
  status: 'pending' | 'broadcasting' | 'completed' | 'failed';
}

export class BroadcastAllChannels {
  private channels: Map<string, BroadcastChannel> = new Map();
  private messages: BroadcastMessage[] = [];
  private vibeSystem?: VibeSystem;
  private recursiveFeeds?: VibeRecursiveFeeds;
  private verseLayer?: VibeVerseLayer;

  constructor() {
    this.initializeChannels();
  }

  /**
   * Initialize all broadcast channels
   */
  private initializeChannels(): void {
    // Feed channels
    this.channels.set('all-feeds', {
      id: 'all-feeds',
      name: 'All Feeds',
      type: 'feed',
      active: true
    });

    this.channels.set('vibe-feeds', {
      id: 'vibe-feeds',
      name: 'Vibe! Feeds',
      type: 'feed',
      active: true
    });

    this.channels.set('recursive-feeds', {
      id: 'recursive-feeds',
      name: 'Recursive Feeds',
      type: 'feed',
      active: true
    });

    // Catalog channels
    this.channels.set('all-catalogs', {
      id: 'all-catalogs',
      name: 'All Catalogs',
      type: 'catalog',
      active: true
    });

    this.channels.set('node-catalog', {
      id: 'node-catalog',
      name: 'NODE Catalog',
      type: 'catalog',
      active: true
    });

    // Stream channels
    this.channels.set('all-streams', {
      id: 'all-streams',
      name: 'All Streams',
      type: 'stream',
      active: true
    });

    this.channels.set('live-streams', {
      id: 'live-streams',
      name: 'Live Streams',
      type: 'stream',
      active: true
    });

    // Deck channels
    this.channels.set('all-decks', {
      id: 'all-decks',
      name: 'All Content Decks',
      type: 'deck',
      active: true
    });

    this.channels.set('play-decks', {
      id: 'play-decks',
      name: 'Play Decks',
      type: 'deck',
      active: true
    });

    // Broadcast channels
    this.channels.set('all-broadcast', {
      id: 'all-broadcast',
      name: 'All Broadcast Channels',
      type: 'broadcast',
      active: true
    });
  }

  /**
   * Set Vibe system for integration
   */
  setVibeSystem(vibeSystem: VibeSystem): void {
    this.vibeSystem = vibeSystem;
  }

  /**
   * Set recursive feeds for integration
   */
  setRecursiveFeeds(recursiveFeeds: VibeRecursiveFeeds): void {
    this.recursiveFeeds = recursiveFeeds;
  }

  /**
   * Set verse layer for integration
   */
  setVerseLayer(verseLayer: VibeVerseLayer): void {
    this.verseLayer = verseLayer;
  }

  /**
   * Broadcast narrative content to all channels (Monster Transmission)
   */
  async broadcastToAllChannels(contentId?: string): Promise<BroadcastMessage[]> {
    const narratives = contentId 
      ? getAllNarrativeContent().filter(c => c.id === contentId)
      : getAllNarrativeContent();

    const messages: BroadcastMessage[] = [];

    for (const narrative of narratives) {
      const message: BroadcastMessage = {
        id: `broadcast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content: narrative,
        channels: narrative.broadcastChannels,
        timestamp: Date.now(),
        status: 'broadcasting'
      };

      messages.push(message);
      this.messages.push(message);

      // Broadcast to each channel
      for (const channelId of narrative.broadcastChannels) {
        if (channelId === 'all') {
          // Broadcast to all channels
          await this.broadcastToChannel('all-feeds', narrative);
          await this.broadcastToChannel('all-catalogs', narrative);
          await this.broadcastToChannel('all-streams', narrative);
          await this.broadcastToChannel('all-decks', narrative);
          await this.broadcastToChannel('all-broadcast', narrative);
        } else {
          await this.broadcastToChannel(channelId, narrative);
        }
      }

      message.status = 'completed';
    }

    return messages;
  }

  /**
   * Broadcast to specific channel
   */
  private async broadcastToChannel(channelId: string, content: NarrativeContent): Promise<void> {
    const channel = this.channels.get(channelId);
    if (!channel || !channel.active) {
      return;
    }

    // Update channel last broadcast
    channel.lastBroadcast = Date.now();

    // Broadcast based on channel type
    switch (channel.type) {
      case 'feed':
        await this.broadcastToFeed(channelId, content);
        break;
      case 'catalog':
        await this.broadcastToCatalog(channelId, content);
        break;
      case 'stream':
        await this.broadcastToStream(channelId, content);
        break;
      case 'deck':
        await this.broadcastToDeck(channelId, content);
        break;
      case 'broadcast':
        await this.broadcastToBroadcast(channelId, content);
        break;
    }
  }

  /**
   * Broadcast to feed channel
   */
  private async broadcastToFeed(channelId: string, content: NarrativeContent): Promise<void> {
    // Broadcast to Vibe! system if available
    if (this.vibeSystem) {
      await this.vibeSystem.createPost({
        authorId: 'system',
        title: content.title,
        summary: content.summary,
        rawMessage: content.content,
        seed: 'broadcast',
        edge: channelId
      });
    }

    // Broadcast to recursive feeds if available
    if (this.recursiveFeeds) {
      this.recursiveFeeds.registerUnit({
        id: `feed_${channelId}_${Date.now()}`,
        name: `Feed: ${content.title}`,
        feedType: 'content',
        content: [content],
        recursiveLinks: [],
        broadcastEnabled: true
      });
      await this.recursiveFeeds.broadcastEnrichedContent();
    }

    console.log(`[Broadcast] Feed ${channelId}: ${content.title}`);
  }

  /**
   * Broadcast to catalog channel
   */
  private async broadcastToCatalog(channelId: string, content: NarrativeContent): Promise<void> {
    // Add to catalog systems
    console.log(`[Broadcast] Catalog ${channelId}: ${content.title}`);
  }

  /**
   * Broadcast to stream channel
   */
  private async broadcastToStream(channelId: string, content: NarrativeContent): Promise<void> {
    // Broadcast to streaming systems
    console.log(`[Broadcast] Stream ${channelId}: ${content.title}`);
  }

  /**
   * Broadcast to deck channel
   */
  private async broadcastToDeck(channelId: string, content: NarrativeContent): Promise<void> {
    // Add to content decks
    console.log(`[Broadcast] Deck ${channelId}: ${content.title}`);
  }

  /**
   * Broadcast to broadcast channel
   */
  private async broadcastToBroadcast(channelId: string, content: NarrativeContent): Promise<void> {
    // General broadcast
    console.log(`[Broadcast] Broadcast ${channelId}: ${content.title}`);
  }

  /**
   * Get all channels
   */
  getAllChannels(): BroadcastChannel[] {
    return Array.from(this.channels.values());
  }

  /**
   * Get broadcast messages
   */
  getBroadcastMessages(): BroadcastMessage[] {
    return [...this.messages];
  }

  /**
   * Get system summary
   */
  getSummary(): string {
    const activeChannels = Array.from(this.channels.values()).filter(c => c.active).length;
    const totalMessages = this.messages.length;
    const completedMessages = this.messages.filter(m => m.status === 'completed').length;

    return `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    BROADCAST ALL CHANNELS SYSTEM                              ║
║                        Monster Transmission Active                             ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  📡 ACTIVE CHANNELS: ${activeChannels}                                      ║
║  📨 TOTAL MESSAGES: ${totalMessages}                                        ║
║  ✅ COMPLETED: ${completedMessages}                                          ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  CHANNEL TYPES:                                                               ║
║  - Feeds: All feed systems                                                    ║
║  - Catalogs: All catalog systems                                             ║
║  - Streams: All streaming channels                                           ║
║  - Decks: All content decks                                                   ║
║  - Broadcast: All broadcast channels                                          ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
    `.trim();
  }
}

// Export singleton instance
export const broadcastAllChannels = new BroadcastAllChannels();
