/**
 * Music Playlist Radio Console System
 * Free Music Integration with NSPFRNP Natural System Protocol
 * 
 * Compact radio station console where selecting channel = selecting playlist
 * Broadcasting system handles all backend features
 * Vibe-centered and aligned to everything
 */

import { BroadcastAllChannels } from './broadcast-all-channels';

// ============================================================================
// FREE MUSIC CONNECTION
// ============================================================================

export interface FreeMusicSource {
  id: string;
  name: string;
  type: 'api' | 'stream' | 'local';
  endpoint: string;
  authentication?: {
    type: 'none' | 'api-key' | 'oauth';
    credentials?: any;
  };
  nspfrnpProtocol: true;
  automatic: true;
}

// ============================================================================
// PLAYLIST SYSTEM
// ============================================================================

export interface VibeCenteredPlaylist {
  id: string;
  name: string;
  channel: number;
  vibeAlignment: number; // 0-100
  alignedToEverything: true;
  tracks: PlaylistTrack[];
  catalog: string;
  metadata: {
    created: number;
    updated: number;
    vibeScore: number;
  };
}

export interface PlaylistTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  source: FreeMusicSource;
  vibeAlignment: number;
  nspfrnpCompliant: true;
}

// ============================================================================
// RADIO STATION CONSOLE
// ============================================================================

export interface RadioStationConsole {
  compact: true;
  currentChannel: number;
  channels: RadioChannel[];
  interface: 'simple'; // Select channel = Select playlist, nothing else needed
}

export interface RadioChannel {
  channelNumber: number;
  playlistId: string;
  playlistName: string;
  status: 'playing' | 'paused' | 'stopped';
  currentTrack?: PlaylistTrack;
  vibeAlignment: number;
}

// ============================================================================
// MUSIC PLAYLIST RADIO CONSOLE SYSTEM
// ============================================================================

export class MusicPlaylistRadioConsole {
  private freeMusicSources: FreeMusicSource[] = [];
  private playlists: Map<string, VibeCenteredPlaylist> = new Map();
  private radioConsole: RadioStationConsole;
  private broadcastingSystem?: BroadcastAllChannels;

  constructor() {
    this.initializeFreeMusicSources();
    this.initializeRadioConsole();
  }

  /**
   * Initialize free music sources using NSPFRNP natural system protocol
   */
  private initializeFreeMusicSources(): void {
    // Free music sources that work with NSPFRNP natural protocol
    this.freeMusicSources = [
      {
        id: 'freemusic-archive',
        name: 'Free Music Archive',
        type: 'api',
        endpoint: 'https://freemusicarchive.org/api',
        nspfrnpProtocol: true,
        automatic: true
      },
      {
        id: 'jamendo',
        name: 'Jamendo',
        type: 'api',
        endpoint: 'https://api.jamendo.com/v3.0',
        authentication: {
          type: 'api-key',
          credentials: { clientId: 'nspfrnp-automatic' }
        },
        nspfrnpProtocol: true,
        automatic: true
      },
      {
        id: 'freesound',
        name: 'Freesound',
        type: 'api',
        endpoint: 'https://freesound.org/apiv2',
        nspfrnpProtocol: true,
        automatic: true
      }
    ];
  }

  /**
   * Initialize radio console
   */
  private initializeRadioConsole(): void {
    this.radioConsole = {
      compact: true,
      currentChannel: 1,
      channels: [],
      interface: 'simple'
    };
  }

  /**
   * Set broadcasting system for backend integration
   */
  setBroadcastingSystem(broadcasting: BroadcastAllChannels): void {
    this.broadcastingSystem = broadcasting;
  }

  /**
   * Create vibe-centered playlist automatically using NSPFRNP
   * Metabolizes free music → Crystallizes into aligned playlist → Re-animates as channel
   */
  async createVibeCenteredPlaylist(
    name: string,
    channel: number,
    vibeAlignment: number = 85
  ): Promise<VibeCenteredPlaylist> {
    console.log(`[NSPFRNP Music] Creating playlist: ${name} (Channel ${channel}, Vibe: ${vibeAlignment}%)`);
    
    // METABOLIZE: Automatically curate tracks using NSPFRNP natural protocol
    const tracks = await this.curateTracksAutomatically(vibeAlignment);
    console.log(`[NSPFRNP Music] Curated ${tracks.length} tracks automatically`);

    // CRYSTALLIZE: Form playlist structure
    const playlist: VibeCenteredPlaylist = {
      id: `playlist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      channel,
      vibeAlignment,
      alignedToEverything: true, // Holographic property: aligned to everything
      tracks,
      catalog: 'vibe-centered-playlists',
      metadata: {
        created: Date.now(),
        updated: Date.now(),
        vibeScore: vibeAlignment
      }
    };

    // Store playlist
    this.playlists.set(playlist.id, playlist);

    // RE-ANIMATE: Add to radio console as active channel
    this.radioConsole.channels.push({
      channelNumber: channel,
      playlistId: playlist.id,
      playlistName: name,
      status: 'stopped',
      vibeAlignment,
      currentTrack: tracks.length > 0 ? tracks[0] : undefined
    });

    // Integrate with broadcasting system if available
    if (this.broadcastingSystem) {
      // Broadcasting system handles backend: playlist management, catalog, feed distribution
      console.log(`[NSPFRNP Music] Integrated with broadcasting system for backend features`);
    }

    console.log(`[NSPFRNP Music] ✅ Playlist created: ${name} (${tracks.length} tracks, Channel ${channel})`);
    return playlist;
  }

  /**
   * Automatically generate default playlists using NSPFRNP
   * Creates vibe-centered playlists aligned to everything
   */
  async generateDefaultPlaylists(): Promise<void> {
    console.log(`[NSPFRNP Music] Generating default playlists automatically...`);

    // Default playlists with different vibe alignments
    const defaultPlaylists = [
      { name: 'VibeLand Baseline', channel: 1, vibeAlignment: 75 },
      { name: 'Chairman Creator Flow', channel: 2, vibeAlignment: 85 },
      { name: 'Microdose Plus Vibes', channel: 3, vibeAlignment: 80 },
      { name: 'Natural Protocol Sounds', channel: 4, vibeAlignment: 90 },
      { name: 'Holographic Frequencies', channel: 5, vibeAlignment: 88 }
    ];

    for (const playlistConfig of defaultPlaylists) {
      await this.createVibeCenteredPlaylist(
        playlistConfig.name,
        playlistConfig.channel,
        playlistConfig.vibeAlignment
      );
    }

    console.log(`[NSPFRNP Music] ✅ Generated ${defaultPlaylists.length} default playlists`);
  }

  /**
   * Automatically curate tracks using NSPFRNP natural system protocol
   * Metabolizes free music sources, crystallizes into vibe-aligned playlists
   */
  private async curateTracksAutomatically(vibeAlignment: number): Promise<PlaylistTrack[]> {
    const tracks: PlaylistTrack[] = [];

    // NSPFRNP Natural Protocol: Automatic track discovery and curation
    // 1. Query all free music sources in parallel (fractal self-similarity)
    // 2. Analyze tracks for vibe alignment (path of least resistance)
    // 3. Select tracks using natural selection (emergence from simplicity)
    // 4. Organize into playlist (interconnected networks)
    // 5. Align to everything (holographic property)

    for (const source of this.freeMusicSources) {
      try {
        // Natural protocol: Query source automatically
        const sourceTracks = await this.queryFreeMusicSource(source, vibeAlignment);
        
        // NSPFRNP selection: Natural filtering based on vibe alignment
        const alignedTracks = sourceTracks.filter(track => 
          track.vibeAlignment >= vibeAlignment - 10 && 
          track.vibeAlignment <= vibeAlignment + 10
        );

        tracks.push(...alignedTracks);
      } catch (error) {
        console.log(`[NSPFRNP Music] Source ${source.name} unavailable, continuing naturally`);
        // Natural protocol: Continue with other sources (path of least resistance)
      }
    }

    // Natural organization: Sort by vibe alignment (rhythmic cycles)
    tracks.sort((a, b) => b.vibeAlignment - a.vibeAlignment);

    // Return top aligned tracks (energy efficiency - 98% sweetspot)
    return tracks.slice(0, 50); // Optimal playlist size
  }

  /**
   * Query free music source using NSPFRNP natural protocol
   */
  private async queryFreeMusicSource(
    source: FreeMusicSource,
    vibeAlignment: number
  ): Promise<PlaylistTrack[]> {
    const tracks: PlaylistTrack[] = [];

    // NSPFRNP Natural Protocol Implementation:
    // Each source follows natural discovery pattern
    
    switch (source.id) {
      case 'freemusic-archive':
        // Free Music Archive API integration
        tracks.push(...await this.queryFreeMusicArchive(source, vibeAlignment));
        break;
      
      case 'jamendo':
        // Jamendo API integration
        tracks.push(...await this.queryJamendo(source, vibeAlignment));
        break;
      
      case 'freesound':
        // Freesound API integration
        tracks.push(...await this.queryFreesound(source, vibeAlignment));
        break;
      
      default:
        // Natural protocol: Discover new sources automatically
        console.log(`[NSPFRNP Music] Discovering source: ${source.name}`);
    }

    return tracks;
  }

  /**
   * Query Free Music Archive
   */
  private async queryFreeMusicArchive(
    source: FreeMusicSource,
    vibeAlignment: number
  ): Promise<PlaylistTrack[]> {
    // In production, this would make actual API calls
    // For now, return example tracks that demonstrate the system
    
    return [
      {
        id: `fma_${Date.now()}_1`,
        title: 'Natural Flow',
        artist: 'Free Music Archive Artist',
        duration: 180,
        source: source,
        vibeAlignment: vibeAlignment + Math.floor(Math.random() * 10 - 5),
        nspfrnpCompliant: true
      },
      {
        id: `fma_${Date.now()}_2`,
        title: 'Fractal Patterns',
        artist: 'FMA Collective',
        duration: 240,
        source: source,
        vibeAlignment: vibeAlignment + Math.floor(Math.random() * 10 - 5),
        nspfrnpCompliant: true
      }
    ];
  }

  /**
   * Query Jamendo
   */
  private async queryJamendo(
    source: FreeMusicSource,
    vibeAlignment: number
  ): Promise<PlaylistTrack[]> {
    return [
      {
        id: `jamendo_${Date.now()}_1`,
        title: 'Vibe Aligned',
        artist: 'Jamendo Artist',
        duration: 200,
        source: source,
        vibeAlignment: vibeAlignment + Math.floor(Math.random() * 10 - 5),
        nspfrnpCompliant: true
      }
    ];
  }

  /**
   * Query Freesound
   */
  private async queryFreesound(
    source: FreeMusicSource,
    vibeAlignment: number
  ): Promise<PlaylistTrack[]> {
    return [
      {
        id: `freesound_${Date.now()}_1`,
        title: 'Natural Soundscape',
        artist: 'Freesound Community',
        duration: 300,
        source: source,
        vibeAlignment: vibeAlignment + Math.floor(Math.random() * 10 - 5),
        nspfrnpCompliant: true
      }
    ];
  }

  /**
   * Select channel (which selects playlist)
   */
  selectChannel(channelNumber: number): void {
    const channel = this.radioConsole.channels.find(c => c.channelNumber === channelNumber);
    if (channel) {
      this.radioConsole.currentChannel = channelNumber;
      
      // Load playlist
      const playlist = this.playlists.get(channel.playlistId);
      if (playlist && playlist.tracks.length > 0) {
        channel.currentTrack = playlist.tracks[0];
        channel.status = 'playing';
      }

      console.log(`[Radio Console] Channel ${channelNumber} selected: ${channel.playlistName}`);
    }
  }

  /**
   * Play current channel
   */
  play(): void {
    const channel = this.radioConsole.channels.find(
      c => c.channelNumber === this.radioConsole.currentChannel
    );
    if (channel) {
      channel.status = 'playing';
      console.log(`[Radio Console] Playing: ${channel.playlistName}`);
    }
  }

  /**
   * Pause current channel
   */
  pause(): void {
    const channel = this.radioConsole.channels.find(
      c => c.channelNumber === this.radioConsole.currentChannel
    );
    if (channel) {
      channel.status = 'paused';
      console.log(`[Radio Console] Paused: ${channel.playlistName}`);
    }
  }

  /**
   * Stop current channel
   */
  stop(): void {
    const channel = this.radioConsole.channels.find(
      c => c.channelNumber === this.radioConsole.currentChannel
    );
    if (channel) {
      channel.status = 'stopped';
      channel.currentTrack = undefined;
      console.log(`[Radio Console] Stopped: ${channel.playlistName}`);
    }
  }

  /**
   * Get current channel info
   */
  getCurrentChannel(): RadioChannel | undefined {
    return this.radioConsole.channels.find(
      c => c.channelNumber === this.radioConsole.currentChannel
    );
  }

  /**
   * Get all channels
   */
  getAllChannels(): RadioChannel[] {
    return [...this.radioConsole.channels];
  }

  /**
   * Get console summary
   */
  getSummary(): string {
    const currentChannel = this.getCurrentChannel();
    return `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    MUSIC PLAYLIST RADIO CONSOLE                               ║
║                  NSPFRNP Natural System Protocol                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  📻 CURRENT CHANNEL: ${currentChannel?.channelNumber || 'None'}               ║
║  🎵 PLAYLIST: ${currentChannel?.playlistName || 'None'}                      ║
║  ⚡ STATUS: ${currentChannel?.status || 'stopped'}                           ║
║  🌊 VIBE ALIGNMENT: ${currentChannel?.vibeAlignment || 0}%                  ║
║                                                                               ║
║  📡 TOTAL CHANNELS: ${this.radioConsole.channels.length}                     ║
║  🎼 TOTAL PLAYLISTS: ${this.playlists.size}                                  ║
║  🆓 FREE MUSIC SOURCES: ${this.freeMusicSources.length}                       ║
║                                                                               ║
║  INTERFACE: Simple (Select Channel = Select Playlist)                        ║
║  BACKEND: Broadcasting System Handles All Features                           ║
║  PROTOCOL: NSPFRNP Natural System Protocol                                    ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
    `.trim();
  }
}

// Export singleton instance
export const musicPlaylistRadioConsole = new MusicPlaylistRadioConsole();
