import { AttackResult, Boss, GameStage, BetResult } from './types';
import { StakeIntegration } from './StakeSDK';

export class GameController {
  private currentStage: GameStage = 1;
  private boss: Boss;
  private nonce: number = 0;
  private totalPayout: number = 0;
  private currentBetAmount: number = 0.1; // Default bet in DOGE
  private stakeSDK: StakeIntegration;
  private gameHistory: BetResult[] = [];

  constructor() {
    this.boss = this.initializeBoss(this.currentStage);
    this.stakeSDK = new StakeIntegration();
  }

  private initializeBoss(stage: GameStage): Boss {
    const bossData = {
      1: { name: 'Roach', maxHealth: 30 },
      2: { name: 'WiFi Yeti', maxHealth: 40 },
      3: { name: 'Karenbot', maxHealth: 50 },
      4: { name: 'Demon Overlord', maxHealth: 60 },
      5: { name: 'Ancient God', maxHealth: 100 }
    };

    return {
      id: stage,
      name: bossData[stage].name,
      maxHealth: bossData[stage].maxHealth,
      currentHealth: bossData[stage].maxHealth
    };
  }

  public async attack(): Promise<AttackResult> {
    if (!this.stakeSDK.isReady()) {
      throw new Error('Stake SDK not ready. Please connect wallet and wait for initialization.');
    }

    try {
      // Place bet through Stake SDK
      const betResult = await this.stakeSDK.placeBet(
        this.currentBetAmount,
        this.currentStage,
        this.nonce
      );

      // Store bet in history
      this.gameHistory.push(betResult);

      // Process game logic
      const result = betResult.outcome;
      
      if (result.outcome !== 'MISS' && result.outcome !== 'COUNTER') {
        this.boss.currentHealth = Math.max(0, this.boss.currentHealth - result.damage);
        this.totalPayout += betResult.payout;
      } else if (result.outcome === 'COUNTER') {
        // Counter attack - reset payout and restart at stage 1
        this.totalPayout = 0;
        this.currentStage = 1;
        this.boss = this.initializeBoss(this.currentStage);
        this.nonce = 0;
        return result;
      }

      // Check if boss is defeated
      if (this.boss.currentHealth <= 0) {
        this.advanceToNextStage();
      }

      this.nonce++;
      return result;

    } catch (error) {
      console.error('Attack failed:', error);
      throw error;
    }
  }

  public async cashOut(): Promise<number> {
    if (this.totalPayout <= 0) {
      return 0;
    }

    try {
      const success = await this.stakeSDK.cashOut(this.totalPayout);
      if (success) {
        const payout = this.totalPayout;
        this.totalPayout = 0;
        
        // Reset game to stage 1 after cash out
        this.currentStage = 1;
        this.boss = this.initializeBoss(this.currentStage);
        this.nonce = 0;
        
        return payout;
      }
      return 0;
    } catch (error) {
      console.error('Cash out failed:', error);
      throw error;
    }
  }

  public async connectWallet(): Promise<boolean> {
    return await this.stakeSDK.connectWallet();
  }

  public async disconnectWallet(): Promise<void> {
    await this.stakeSDK.disconnectWallet();
    // Reset game state when wallet disconnects
    this.resetGame();
  }

  public setBetAmount(amount: number): void {
    const config = this.stakeSDK.getGameConfig();
    if (amount >= config.minBet && amount <= config.maxBet) {
      this.currentBetAmount = amount;
    } else {
      throw new Error(`Bet amount must be between ${config.minBet} and ${config.maxBet}`);
    }
  }

  public verifyBet(betId: string): BetResult | null {
    return this.gameHistory.find(bet => bet.betId === betId) || null;
  }

  private advanceToNextStage(): void {
    if (this.currentStage < 5) {
      this.currentStage++;
      this.boss = this.initializeBoss(this.currentStage);
    } else {
      // Game completed! Player beat all 5 bosses
      // Could trigger special bonus or achievement here
      console.log('Congratulations! All bosses defeated!');
    }
  }

  private resetGame(): void {
    this.currentStage = 1;
    this.boss = this.initializeBoss(this.currentStage);
    this.nonce = 0;
    this.totalPayout = 0;
    this.gameHistory = [];
  }

  // Getters
  public getCurrentStage(): GameStage {
    return this.currentStage;
  }

  public getBoss(): Boss {
    return this.boss;
  }

  public getTotalPayout(): number {
    return this.totalPayout;
  }

  public getNonce(): number {
    return this.nonce;
  }

  public getBetAmount(): number {
    return this.currentBetAmount;
  }

  public getWalletState() {
    return this.stakeSDK.getWalletState();
  }

  public getGameConfig() {
    return this.stakeSDK.getGameConfig();
  }

  public getGameHistory(): BetResult[] {
    return [...this.gameHistory];
  }

  public isReady(): boolean {
    return this.stakeSDK.isReady();
  }
}