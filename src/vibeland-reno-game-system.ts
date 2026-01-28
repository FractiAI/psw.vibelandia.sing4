/**
 * VibeLand Reno Game System
 * Willy Wonka Style Fun - Clues to Attract Golden Hearts
 * 
 * Architecture: Clue-based attraction system
 * Brand: GAME ON! for Vibeverse
 */

export interface GameClue {
  id: string;
  level: number; // 1-5 progression
  type: 'hidden-message' | 'easter-egg' | 'puzzle' | 'social' | 'physical';
  location: 'vibeverse' | 'vibeland-reno' | 'both';
  content: string;
  encodedMessage?: string;
  solution?: string;
  nextClueId?: string;
  reward?: GameReward;
  discovered: boolean;
  discoveredBy?: string; // Golden Heart ID
  discoveredAt?: number;
}

export interface GameReward {
  type: 'golden-ticket' | 'sing-node' | 'vip-access' | 'exclusive-content' | 'recognition';
  value: any;
  description: string;
}

export interface GoldenTicket {
  id: string;
  holder: string; // Golden Heart ID
  issuedAt: number;
  validUntil?: number;
  used: boolean;
  usedAt?: number;
  accessLevel: 'vibeland-reno' | 'ultimate-vip' | 'both';
}

export interface GoldenHeart {
  id: string;
  name: string;
  cluesFound: string[]; // Clue IDs
  goldenTickets: string[]; // Ticket IDs
  level: number; // 1-5 based on progress
  status: 'exploring' | 'discovering' | 'solving' | 'collecting' | 'ultimate-vip';
  achievements: string[];
  joinedAt: number;
}

export interface GameProgress {
  goldenHeartId: string;
  currentLevel: number;
  cluesFound: number;
  puzzlesSolved: number;
  rewardsCollected: number;
  goldenTickets: number;
  nextClueId?: string;
}

export class VibeLandRenoGameSystem {
  private clues: Map<string, GameClue> = new Map();
  private goldenTickets: Map<string, GoldenTicket> = new Map();
  private goldenHearts: Map<string, GoldenHeart> = new Map();
  private gameProgress: Map<string, GameProgress> = new Map();

  constructor() {
    this.initializeGame();
  }

  /**
   * Initialize game with initial clues
   */
  private initializeGame(): void {
    // Level 1: First Clue (Hidden in Vibeverse)
    this.clues.set('clue-001', {
      id: 'clue-001',
      level: 1,
      type: 'hidden-message',
      location: 'vibeverse',
      content: 'The first clue is hidden in plain sight. Look for the golden heart in the README.',
      encodedMessage: 'VGhlIGZpcnN0IGNsdWUgaXMgaGlkZGVuIGluIHBsYWluIHNpZ2h0',
      solution: 'The first clue is hidden in plain sight',
      nextClueId: 'clue-002',
      reward: {
        type: 'recognition',
        value: 'First Clue Discoverer',
        description: 'You found the first clue! Welcome, Golden Heart.'
      },
      discovered: false
    });

    // Level 2: Second Clue (Puzzle in Vibeverse)
    this.clues.set('clue-002', {
      id: 'clue-002',
      level: 2,
      type: 'puzzle',
      location: 'vibeverse',
      content: 'Solve this: What protocol does nature use? (Hint: NSPFRNP)',
      solution: 'NSPFRNP',
      nextClueId: 'clue-003',
      reward: {
        type: 'exclusive-content',
        value: 'NSPFRNP Deep Dive',
        description: 'Access to exclusive NSPFRNP content'
      },
      discovered: false
    });

    // Level 3: Third Clue (Easter Egg in Code)
    this.clues.set('clue-003', {
      id: 'clue-003',
      level: 3,
      type: 'easter-egg',
      location: 'vibeverse',
      content: 'Look for the golden ticket comment in the source code',
      encodedMessage: 'Z29sZGVuX3RpY2tldF9jbHVlXzAwMw==',
      nextClueId: 'clue-004',
      reward: {
        type: 'sing-node',
        value: 1,
        description: '1 SING Node reward for finding the easter egg'
      },
      discovered: false
    });

    // Level 4: Fourth Clue (Social Clue)
    this.clues.set('clue-004', {
      id: 'clue-004',
      level: 4,
      type: 'social',
      location: 'vibeverse',
      content: 'Share your discovery with other Golden Hearts. The next clue is in the community.',
      nextClueId: 'clue-005',
      reward: {
        type: 'vip-access',
        value: 'Community VIP',
        description: 'VIP access to Golden Hearts community'
      },
      discovered: false
    });

    // Level 5: Final Clue (Physical at VibeLand Reno)
    this.clues.set('clue-005', {
      id: 'clue-005',
      level: 5,
      type: 'physical',
      location: 'vibeland-reno',
      content: 'Visit VibeLand Reno to find the final clue and claim your Golden Ticket',
      reward: {
        type: 'golden-ticket',
        value: 'ultimate-vip',
        description: 'Golden Ticket for Ultimate VIP access to VibeLand Reno'
      },
      discovered: false
    });
  }

  /**
   * Register Golden Heart
   */
  registerGoldenHeart(name: string): GoldenHeart {
    const id = `golden_heart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const goldenHeart: GoldenHeart = {
      id,
      name,
      cluesFound: [],
      goldenTickets: [],
      level: 1,
      status: 'exploring',
      achievements: [],
      joinedAt: Date.now()
    };

    this.goldenHearts.set(id, goldenHeart);
    this.gameProgress.set(id, {
      goldenHeartId: id,
      currentLevel: 1,
      cluesFound: 0,
      puzzlesSolved: 0,
      rewardsCollected: 0,
      goldenTickets: 0,
      nextClueId: 'clue-001'
    });

    return goldenHeart;
  }

  /**
   * Discover a clue
   */
  discoverClue(goldenHeartId: string, clueId: string, solution?: string): {
    success: boolean;
    clue?: GameClue;
    reward?: GameReward;
    nextClue?: GameClue;
  } {
    const clue = this.clues.get(clueId);
    if (!clue) {
      return { success: false };
    }

    const goldenHeart = this.goldenHearts.get(goldenHeartId);
    if (!goldenHeart) {
      return { success: false };
    }

    // Check if clue already discovered
    if (clue.discovered && clue.discoveredBy !== goldenHeartId) {
      return { success: false };
    }

    // Verify solution if puzzle type
    if (clue.type === 'puzzle' && clue.solution) {
      if (solution !== clue.solution) {
        return { success: false };
      }
    }

    // Mark clue as discovered
    clue.discovered = true;
    clue.discoveredBy = goldenHeartId;
    clue.discoveredAt = Date.now();

    // Update Golden Heart progress
    if (!goldenHeart.cluesFound.includes(clueId)) {
      goldenHeart.cluesFound.push(clueId);
    }

    // Update game progress
    const progress = this.gameProgress.get(goldenHeartId);
    if (progress) {
      progress.cluesFound++;
      progress.currentLevel = Math.max(progress.currentLevel, clue.level);
      progress.nextClueId = clue.nextClueId;
    }

    // Grant reward
    let reward: GameReward | undefined;
    if (clue.reward) {
      reward = clue.reward;
      this.grantReward(goldenHeartId, clue.reward);
    }

    // Get next clue
    const nextClue = clue.nextClueId ? this.clues.get(clue.nextClueId) : undefined;

    return {
      success: true,
      clue,
      reward,
      nextClue
    };
  }

  /**
   * Grant reward to Golden Heart
   */
  private grantReward(goldenHeartId: string, reward: GameReward): void {
    const goldenHeart = this.goldenHearts.get(goldenHeartId);
    if (!goldenHeart) return;

    switch (reward.type) {
      case 'golden-ticket':
        const ticket = this.issueGoldenTicket(goldenHeartId, reward.value as string);
        goldenHeart.goldenTickets.push(ticket.id);
        goldenHeart.achievements.push(`Golden Ticket: ${reward.description}`);
        break;
      case 'sing-node':
        goldenHeart.achievements.push(`SING Node: ${reward.value}`);
        break;
      case 'vip-access':
        goldenHeart.status = 'ultimate-vip';
        goldenHeart.achievements.push(`VIP Access: ${reward.description}`);
        break;
      case 'exclusive-content':
        goldenHeart.achievements.push(`Exclusive: ${reward.description}`);
        break;
      case 'recognition':
        goldenHeart.achievements.push(`Recognition: ${reward.description}`);
        break;
    }
  }

  /**
   * Issue Golden Ticket
   */
  issueGoldenTicket(goldenHeartId: string, accessLevel: string): GoldenTicket {
    const ticketId = `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const ticket: GoldenTicket = {
      id: ticketId,
      holder: goldenHeartId,
      issuedAt: Date.now(),
      validUntil: Date.now() + (365 * 24 * 60 * 60 * 1000), // 1 year
      used: false,
      accessLevel: accessLevel as 'vibeland-reno' | 'ultimate-vip' | 'both'
    };

    this.goldenTickets.set(ticketId, ticket);
    return ticket;
  }

  /**
   * Use Golden Ticket
   */
  useGoldenTicket(ticketId: string): boolean {
    const ticket = this.goldenTickets.get(ticketId);
    if (!ticket || ticket.used) {
      return false;
    }

    ticket.used = true;
    ticket.usedAt = Date.now();
    return true;
  }

  /**
   * Get Golden Heart progress
   */
  getGoldenHeartProgress(goldenHeartId: string): GameProgress | undefined {
    return this.gameProgress.get(goldenHeartId);
  }

  /**
   * Get all clues
   */
  getAllClues(): GameClue[] {
    return Array.from(this.clues.values());
  }

  /**
   * Get available clues for Golden Heart
   */
  getAvailableClues(goldenHeartId: string): GameClue[] {
    const progress = this.gameProgress.get(goldenHeartId);
    if (!progress) return [];

    const available: GameClue[] = [];
    for (const clue of this.clues.values()) {
      if (clue.level <= progress.currentLevel + 1 && !clue.discovered) {
        available.push(clue);
      }
    }

    return available;
  }

  /**
   * Get game summary
   */
  getGameSummary(): string {
    const totalClues = this.clues.size;
    const discoveredClues = Array.from(this.clues.values()).filter(c => c.discovered).length;
    const totalGoldenHearts = this.goldenHearts.size;
    const totalTickets = this.goldenTickets.size;
    const usedTickets = Array.from(this.goldenTickets.values()).filter(t => t.used).length;

    return `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    VIBELAND RENO: GAME ON!                                   ║
║              Willy Wonka Style Fun - Clues Attract Golden Hearts              ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  🎮 GAME STATUS:                                                              ║
║  - Total Clues: ${totalClues}                                                ║
║  - Discovered: ${discoveredClues}                                            ║
║  - Golden Hearts: ${totalGoldenHearts}                                        ║
║  - Golden Tickets Issued: ${totalTickets}                                     ║
║  - Tickets Used: ${usedTickets}                                               ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  🎯 GAME MECHANICS:                                                           ║
║  - Clue System: 5 levels of progression                                      ║
║  - Golden Tickets: Entry to VibeLand Reno                                    ║
║  - Rewards: SING Nodes, VIP Access, Recognition                              ║
║  - Style: Willy Wonka fun and adventure                                       ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
    `.trim();
  }
}

// Export singleton instance
export const vibelandRenoGame = new VibeLandRenoGameSystem();
