export type GameStage = 1 | 2 | 3 | 4 | 5;

export interface AttackResult {
  outcome: 'HIT' | 'CRIT' | 'MEGA HIT' | 'MISS' | 'COUNTER';
  damage: number;
  payoutMultiplier: number;
  nonce: number;
  serverSeed: string;
  clientSeed: string;
  isVerified: boolean;
}

export interface Boss {
  id: GameStage;
  name: string;
  maxHealth: number;
  currentHealth: number;
}

export interface StakeGameConfig {
  gameId: string;
  currency: string;
  minBet: number;
  maxBet: number;
  houseEdge: number;
}

export interface WalletState {
  isConnected: boolean;
  balance: number;
  currency: string;
  address?: string;
}

export interface BetResult {
  betId: string;
  amount: number;
  payout: number;
  profit: number;
  nonce: number;
  serverSeed: string;
  clientSeed: string;
  outcome: AttackResult;
}