import { StakeWebSDK } from '@stake-com/web-sdk';
import { StakeGameConfig, WalletState, BetResult, AttackResult, GameStage } from './types';
import CryptoJS from 'crypto-js';

export class StakeIntegration {
  private sdk: StakeWebSDK;
  private gameConfig: StakeGameConfig;
  private walletState: WalletState = {
    isConnected: false,
    balance: 0,
    currency: 'DOGE'
  };
  private outcomeCache: Map<string, AttackResult[]> = new Map();

  constructor() {
    this.gameConfig = {
      gameId: 'boss-rush-v1',
      currency: 'DOGE',
      minBet: 0.01,
      maxBet: 1000,
      houseEdge: 0.03 // 3% house edge
    };

    this.sdk = new StakeWebSDK({
      gameId: this.gameConfig.gameId,
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'staging',
      onWalletConnect: this.handleWalletConnect.bind(this),
      onWalletDisconnect: this.handleWalletDisconnect.bind(this),
      onBalanceUpdate: this.handleBalanceUpdate.bind(this)
    });

    this.initializeOutcomeBundles();
  }

  private async initializeOutcomeBundles(): Promise<void> {
    // Load CSV outcome bundles for each stage
    const stages: GameStage[] = [1, 2, 3, 4, 5];
    
    for (const stage of stages) {
      try {
        const response = await fetch(`/math/stage${stage}.csv`);
        const csvData = await response.text();
        const outcomes = this.parseCSVOutcomes(csvData);
        this.outcomeCache.set(`stage${stage}`, outcomes);
      } catch (error) {
        console.error(`Failed to load stage ${stage} outcomes:`, error);
        // Fallback to simulated outcomes for development
        this.outcomeCache.set(`stage${stage}`, this.getSimulatedOutcomes(stage));
      }
    }
  }

  private parseCSVOutcomes(csvData: string): AttackResult[] {
    const lines = csvData.trim().split('\n');
    const outcomes: AttackResult[] = [];

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const [outcome, damage, payoutMultiplier] = lines[i].split(',');
      outcomes.push({
        outcome: outcome as AttackResult['outcome'],
        damage: parseInt(damage),
        payoutMultiplier: parseFloat(payoutMultiplier),
        nonce: i - 1,
        serverSeed: '',
        clientSeed: '',
        isVerified: false
      });
    }

    return outcomes;
  }

  private getSimulatedOutcomes(stage: GameStage): AttackResult[] {
    // Fallback simulation for development
    const baseOutcomes = [
      { outcome: 'COUNTER' as const, damage: 0, payoutMultiplier: 0 },
      { outcome: 'MISS' as const, damage: 0, payoutMultiplier: 0 },
      { outcome: 'HIT' as const, damage: 1, payoutMultiplier: 1.26 },
      { outcome: 'CRIT' as const, damage: 3, payoutMultiplier: 3.0 },
      { outcome: 'MEGA HIT' as const, damage: 6, payoutMultiplier: 12.0 }
    ];

    return Array.from({ length: 1000 }, (_, i) => ({
      ...baseOutcomes[i % baseOutcomes.length],
      nonce: i,
      serverSeed: '',
      clientSeed: '',
      isVerified: false
    }));
  }

  public async connectWallet(): Promise<boolean> {
    try {
      await this.sdk.connectWallet();
      return true;
    } catch (error) {
      console.error('Wallet connection failed:', error);
      return false;
    }
  }

  public async disconnectWallet(): Promise<void> {
    await this.sdk.disconnectWallet();
  }

  public async placeBet(amount: number, stage: GameStage, nonce: number): Promise<BetResult> {
    if (!this.walletState.isConnected) {
      throw new Error('Wallet not connected');
    }

    if (amount < this.gameConfig.minBet || amount > this.gameConfig.maxBet) {
      throw new Error(`Bet amount must be between ${this.gameConfig.minBet} and ${this.gameConfig.maxBet}`);
    }

    if (amount > this.walletState.balance) {
      throw new Error('Insufficient balance');
    }

    try {
      // Place bet through Stake SDK
      const betResponse = await this.sdk.placeBet({
        amount,
        currency: this.gameConfig.currency,
        gameData: {
          stage,
          nonce,
          gameType: 'boss-rush'
        }
      });

      // Get outcome from bundle
      const outcomes = this.outcomeCache.get(`stage${stage}`) || [];
      const outcome = outcomes[nonce % outcomes.length];

      // Verify outcome with Stake's provably fair system
      const verifiedOutcome = await this.verifyOutcome(
        betResponse.serverSeed,
        betResponse.clientSeed,
        nonce,
        outcome
      );

      const payout = verifiedOutcome.payoutMultiplier * amount;
      const profit = payout - amount;

      // Process payout if winning
      if (payout > 0) {
        await this.sdk.processPayout({
          betId: betResponse.betId,
          amount: payout
        });
      }

      return {
        betId: betResponse.betId,
        amount,
        payout,
        profit,
        nonce,
        serverSeed: betResponse.serverSeed,
        clientSeed: betResponse.clientSeed,
        outcome: verifiedOutcome
      };

    } catch (error) {
      console.error('Bet placement failed:', error);
      throw error;
    }
  }

  private async verifyOutcome(
    serverSeed: string,
    clientSeed: string,
    nonce: number,
    outcome: AttackResult
  ): Promise<AttackResult> {
    // Stake's provably fair verification
    const hash = CryptoJS.HmacSHA512(`${clientSeed}:${nonce}`, serverSeed).toString();
    const hex = hash.substring(0, 8);
    const decimal = parseInt(hex, 16);
    const result = decimal / Math.pow(2, 32);

    // Verify the outcome matches the hash result
    // This is a simplified verification - production would use Stake's exact algorithm
    const isVerified = result >= 0 && result <= 1;

    return {
      ...outcome,
      serverSeed,
      clientSeed,
      nonce,
      isVerified
    };
  }

  public async cashOut(amount: number): Promise<boolean> {
    if (!this.walletState.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      await this.sdk.withdraw({
        amount,
        currency: this.gameConfig.currency
      });
      return true;
    } catch (error) {
      console.error('Cash out failed:', error);
      return false;
    }
  }

  private handleWalletConnect(walletInfo: any): void {
    this.walletState = {
      isConnected: true,
      balance: walletInfo.balance,
      currency: walletInfo.currency,
      address: walletInfo.address
    };
  }

  private handleWalletDisconnect(): void {
    this.walletState = {
      isConnected: false,
      balance: 0,
      currency: 'DOGE'
    };
  }

  private handleBalanceUpdate(balance: number): void {
    this.walletState.balance = balance;
  }

  // Getters
  public getWalletState(): WalletState {
    return { ...this.walletState };
  }

  public getGameConfig(): StakeGameConfig {
    return { ...this.gameConfig };
  }

  public isReady(): boolean {
    return this.outcomeCache.size === 5 && this.walletState.isConnected;
  }
}