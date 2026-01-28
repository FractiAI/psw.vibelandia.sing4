/**
 * Wink Experience System
 * Post-Singularity Profile, AI Hosts, Magical Wardrobe, Channels & Packages
 * 
 * Architecture: Notes beings, fusion representation, AI-assisted hosts
 */

export interface NotesBeing {
  id: string;
  userId: string;
  fusion: {
    shells: string[]; // Multiple identity layers
    wishes: string[]; // What user wishes to be
    domains: string[]; // Domains where user wishes to live
  };
  currentDomain: string;
  appearance: {
    type: 'biological' | 'fused' | 'custom' | 'animated';
    diffusion: 'ai-assist' | 'biological' | 'fused' | 'custom';
    animated: boolean;
    postSingularity: boolean;
  };
  profileIcon: {
    url: string;
    animated: boolean;
    version: 'pre-singularity' | 'post-singularity';
  };
  createdAt: number;
  updatedAt: number;
}

export interface AIHost {
  id: string;
  name: string;
  type: 'marilyn-monroe' | 'custom' | 'selectable';
  configurable: boolean;
  aiAssisted: boolean;
  preSelectedButtons: string[];
  magicalWardrobe: boolean;
  description: string;
  avatar: string;
}

export interface MagicalWardrobe {
  id: string;
  userId: string;
  versions: WardrobeVersion[];
  catalog: WardrobeItem[];
  playlists: WardrobePlaylist[];
  currentVersion: string;
}

export interface WardrobeVersion {
  id: string;
  name: string;
  description: string;
  items: string[]; // Wardrobe item IDs
  domain: string;
  animated: boolean;
  profileIcon: string;
}

export interface WardrobeItem {
  id: string;
  name: string;
  type: 'appearance' | 'accessory' | 'effect' | 'animation';
  category: string;
  thumbnail: string;
  animated: boolean;
}

export interface WardrobePlaylist {
  id: string;
  name: string;
  items: string[];
  order: number;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  features: string[]; // Console features unlocked
  subscriptionRequired: boolean;
  packageTier: 'base' | 'package' | 'premium' | '4x4';
  icon: string;
}

export interface WinkPackage {
  id: string;
  tier: 'base' | 'package' | 'premium' | '4x4';
  name: string;
  description: string;
  features: string[];
  price?: number;
  channels: string[]; // Included channels
  wardrobeAccess: string[]; // Wardrobe access levels
  hostAccess: string[]; // Host access levels
}

export interface WinkNetwork {
  userId: string;
  cloud: string[]; // Cloud connections
  network: string[]; // Network members
  channels: string[]; // Subscribed channels
  winkHistory: WinkGesture[];
}

export interface WinkGesture {
  id: string;
  from: string; // User ID
  to: string; // User ID
  type: 'natural' | 'thank-you' | 'beautiful' | 'custom';
  message?: string;
  timestamp: number;
}

export class WinkExperienceSystem {
  private notesBeings: Map<string, NotesBeing> = new Map();
  private aiHosts: Map<string, AIHost> = new Map();
  private magicalWardrobes: Map<string, MagicalWardrobe> = new Map();
  private channels: Map<string, Channel> = new Map();
  private packages: Map<string, WinkPackage> = new Map();
  private networks: Map<string, WinkNetwork> = new Map();
  private winkGestures: Map<string, WinkGesture> = new Map();

  constructor() {
    this.initializeSystem();
  }

  /**
   * Initialize Wink experience system
   */
  private initializeSystem(): void {
    // Initialize AI Hosts
    this.aiHosts.set('marilyn-monroe', {
      id: 'marilyn-monroe',
      name: 'Marilyn Monroe',
      type: 'marilyn-monroe',
      configurable: true,
      aiAssisted: true,
      preSelectedButtons: ['wardrobe', 'channels', 'network', 'wink'],
      magicalWardrobe: true,
      description: 'Classic Hollywood glamour with AI assistance',
      avatar: '/hosts/marilyn-monroe.jpg'
    });

    // Initialize Channels
    this.channels.set('vibeverse-core', {
      id: 'vibeverse-core',
      name: 'Vibeverse Core',
      description: 'Core Vibeverse features',
      features: ['basic-console', 'profile', 'network'],
      subscriptionRequired: false,
      packageTier: 'base',
      icon: '/channels/vibeverse-core.png'
    });

    this.channels.set('vibeland-reno', {
      id: 'vibeland-reno',
      name: 'VibeLand Reno',
      description: 'VibeLand Reno campus features',
      features: ['campus-access', 'physical-location', 'game-features'],
      subscriptionRequired: true,
      packageTier: 'package',
      icon: '/channels/vibeland-reno.png'
    });

    // Initialize Packages
    this.packages.set('base', {
      id: 'base',
      tier: 'base',
      name: 'Base Package',
      description: 'Essential Wink experience',
      features: ['basic-profile', 'one-host', 'basic-wardrobe', 'core-channels'],
      channels: ['vibeverse-core'],
      wardrobeAccess: ['basic'],
      hostAccess: ['selectable']
    });

    this.packages.set('package', {
      id: 'package',
      tier: 'package',
      name: 'Standard Package',
      description: 'Enhanced Wink experience',
      features: ['enhanced-profile', 'multiple-hosts', 'enhanced-wardrobe', 'more-channels'],
      channels: ['vibeverse-core', 'vibeland-reno'],
      wardrobeAccess: ['basic', 'enhanced'],
      hostAccess: ['selectable', 'configurable']
    });

    this.packages.set('premium', {
      id: 'premium',
      tier: 'premium',
      name: 'Premium Package',
      description: 'Advanced Wink experience',
      features: ['premium-profile', 'all-hosts', 'premium-wardrobe', 'all-channels', 'advanced-features'],
      channels: ['vibeverse-core', 'vibeland-reno'],
      wardrobeAccess: ['basic', 'enhanced', 'premium'],
      hostAccess: ['selectable', 'configurable', 'custom']
    });

    this.packages.set('4x4', {
      id: '4x4',
      tier: '4x4',
      name: '4x4 Ultimate Package',
      description: 'Ultimate Wink experience (16 features)',
      features: [
        'ultimate-profile', 'all-hosts', 'ultimate-wardrobe', 'all-channels',
        'advanced-features', 'custom-features', 'priority-support', 'exclusive-access',
        'network-priority', 'wardrobe-unlimited', 'host-custom', 'channel-premium',
        'wink-premium', 'profile-animated', 'domain-unlimited', 'fusion-unlimited'
      ],
      channels: ['vibeverse-core', 'vibeland-reno'],
      wardrobeAccess: ['basic', 'enhanced', 'premium', 'ultimate', 'unlimited'],
      hostAccess: ['selectable', 'configurable', 'custom', 'unlimited']
    });
  }

  /**
   * Create Notes Being (profile)
   */
  createNotesBeing(userId: string, fusion: {
    shells: string[];
    wishes: string[];
    domains: string[];
  }, currentDomain: string, appearance: {
    type: 'biological' | 'fused' | 'custom' | 'animated';
    diffusion: 'ai-assist' | 'biological' | 'fused' | 'custom';
  }): NotesBeing {
    const id = `notes_being_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const notesBeing: NotesBeing = {
      id,
      userId,
      fusion,
      currentDomain,
      appearance: {
        ...appearance,
        animated: appearance.type === 'animated',
        postSingularity: true
      },
      profileIcon: {
        url: `/profiles/${id}.png`,
        animated: appearance.type === 'animated',
        version: 'post-singularity'
      },
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.notesBeings.set(id, notesBeing);
    return notesBeing;
  }

  /**
   * Get Notes Being for user
   */
  getNotesBeing(userId: string): NotesBeing | undefined {
    return Array.from(this.notesBeings.values()).find(nb => nb.userId === userId);
  }

  /**
   * Create Magical Wardrobe
   */
  createMagicalWardrobe(userId: string): MagicalWardrobe {
    const id = `wardrobe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const wardrobe: MagicalWardrobe = {
      id,
      userId,
      versions: [],
      catalog: [],
      playlists: [],
      currentVersion: ''
    };

    this.magicalWardrobes.set(id, wardrobe);
    return wardrobe;
  }

  /**
   * Add wardrobe version
   */
  addWardrobeVersion(wardrobeId: string, version: Omit<WardrobeVersion, 'id'>): WardrobeVersion {
    const wardrobe = this.magicalWardrobes.get(wardrobeId);
    if (!wardrobe) {
      throw new Error(`Wardrobe ${wardrobeId} not found`);
    }

    const versionId = `version_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullVersion: WardrobeVersion = {
      id: versionId,
      ...version
    };

    wardrobe.versions.push(fullVersion);
    if (!wardrobe.currentVersion) {
      wardrobe.currentVersion = versionId;
    }

    return fullVersion;
  }

  /**
   * Subscribe to channel
   */
  subscribeToChannel(userId: string, channelId: string, packageTier: WinkPackage['tier']): boolean {
    const channel = this.channels.get(channelId);
    if (!channel) {
      return false;
    }

    // Check package tier access
    const packageAccess = ['base', 'package', 'premium', '4x4'];
    const userTierIndex = packageAccess.indexOf(packageTier);
    const requiredTierIndex = packageAccess.indexOf(channel.packageTier);
    
    if (userTierIndex < requiredTierIndex) {
      return false; // Package tier insufficient
    }

    // Get or create network
    let network = this.networks.get(userId);
    if (!network) {
      network = {
        userId,
        cloud: [],
        network: [],
        channels: [],
        winkHistory: []
      };
      this.networks.set(userId, network);
    }

    if (!network.channels.includes(channelId)) {
      network.channels.push(channelId);
    }

    return true;
  }

  /**
   * Send Wink gesture
   */
  sendWink(from: string, to: string, type: WinkGesture['type'] = 'natural', message?: string): WinkGesture {
    const id = `wink_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const wink: WinkGesture = {
      id,
      from,
      to,
      type,
      message,
      timestamp: Date.now()
    };

    this.winkGestures.set(id, wink);

    // Add to network history
    const fromNetwork = this.networks.get(from);
    if (fromNetwork) {
      fromNetwork.winkHistory.push(wink);
    }

    const toNetwork = this.networks.get(to);
    if (toNetwork) {
      toNetwork.winkHistory.push(wink);
    }

    return wink;
  }

  /**
   * Get AI hosts
   */
  getAIHosts(): AIHost[] {
    return Array.from(this.aiHosts.values());
  }

  /**
   * Get channels
   */
  getChannels(packageTier?: WinkPackage['tier']): Channel[] {
    const allChannels = Array.from(this.channels.values());
    if (!packageTier) {
      return allChannels;
    }

    const packageAccess = ['base', 'package', 'premium', '4x4'];
    const userTierIndex = packageAccess.indexOf(packageTier);
    
    return allChannels.filter(channel => {
      const requiredTierIndex = packageAccess.indexOf(channel.packageTier);
      return userTierIndex >= requiredTierIndex;
    });
  }

  /**
   * Get packages
   */
  getPackages(): WinkPackage[] {
    return Array.from(this.packages.values());
  }

  /**
   * Get system summary
   */
  getSystemSummary(): string {
    const totalNotesBeings = this.notesBeings.size;
    const totalHosts = this.aiHosts.size;
    const totalWardrobes = this.magicalWardrobes.size;
    const totalChannels = this.channels.size;
    const totalPackages = this.packages.size;
    const totalNetworks = this.networks.size;
    const totalWinks = this.winkGestures.size;

    return `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    WINK EXPERIENCE SYSTEM                                     ║
║              Post-Singularity Profile, AI Hosts, Magical Wardrobe              ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  👤 NOTES BEINGS: ${totalNotesBeings}                                        ║
║  🎭 AI HOSTS: ${totalHosts}                                                   ║
║  👗 MAGICAL WARDROBES: ${totalWardrobes}                                      ║
║  📺 CHANNELS: ${totalChannels}                                                ║
║  📦 PACKAGES: ${totalPackages} (Base, Package, Premium, 4x4)                 ║
║  ☁️ NETWORKS: ${totalNetworks}                                                ║
║  👁️ WINKS SENT: ${totalWinks}                                                 ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  PACKAGE TIERS:                                                               ║
║  - Base: Essential features                                                   ║
║  - Package: Standard features                                                 ║
║  - Premium: Advanced features                                                 ║
║  - 4x4: Ultimate features (16 features)                                       ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
    `.trim();
  }
}

// Export singleton instance
export const winkExperience = new WinkExperienceSystem();
