<script lang="ts">
  import { onMount } from 'svelte';
  import { GameController } from './GameController';
  import BossComponent from './Boss.svelte';
  import HealthBar from './HealthBar.svelte';
  import PlayerComponent from './Player.svelte';
  import AttackButton from './AttackButton.svelte';
  import CashOutButton from './CashOutButton.svelte';
  import WalletConnect from './WalletConnect.svelte';
  import BetControls from './BetControls.svelte';
  import type { WalletState, AttackResult } from './types';

  let gameController: GameController;
  let attackResult: AttackResult | null = null;
  let backgroundUrl: string | null = null;
  let canAttack = true;
  let isPlayerAttacking = false;
  let playerAttackType: 'sword' | 'knife1' | 'knife2' | null = null;
  let walletState: WalletState = { isConnected: false, balance: 0, currency: 'DOGE' };
  let isGameReady = false;
  let errorMessage = '';

  onMount(() => {
    gameController = new GameController();
    
    // Read optional background image from global (legacy + dist parity)
    if (typeof window !== 'undefined') {
      // @ts-ignore
      backgroundUrl = (window as any).GAME_BACKGROUND_URL || null;
    }

    // Update wallet state periodically
    const updateWalletState = () => {
      if (gameController) {
        walletState = gameController.getWalletState();
        isGameReady = gameController.isReady();
      }
    };

    updateWalletState();
    const interval = setInterval(updateWalletState, 1000);

    return () => clearInterval(interval);
  });

  async function handleAttack() {
    if (!canAttack || !gameController || !isGameReady) return;
    
    canAttack = false;
    isPlayerAttacking = true;
    errorMessage = '';
    
    // Randomly select attack type for visualization
    const attackTypes = ['sword', 'knife1', 'knife2'];
    playerAttackType = attackTypes[Math.floor(Math.random() * attackTypes.length)] as 'sword' | 'knife1' | 'knife2';
    
    try {
      attackResult = await gameController.attack();
    } catch (error) {
      console.error('Attack failed:', error);
      errorMessage = error instanceof Error ? error.message : 'Attack failed';
    }
    
    // Reset after animation
    setTimeout(() => {
      attackResult = null;
      isPlayerAttacking = false;
      canAttack = true;
    }, 1000);
  }

  async function handleCashOut() {
    if (!gameController) return;
    
    try {
      const payout = await gameController.cashOut();
      console.log(`Cashed out: ${payout} ${walletState.currency}`);
    } catch (error) {
      console.error('Cash out failed:', error);
      errorMessage = error instanceof Error ? error.message : 'Cash out failed';
    }
  }

  async function handleWalletConnect() {
    if (!gameController) return false;
    
    try {
      const success = await gameController.connectWallet();
      if (success) {
        walletState = gameController.getWalletState();
        errorMessage = '';
      }
      return success;
    } catch (error) {
      console.error('Wallet connection failed:', error);
      errorMessage = error instanceof Error ? error.message : 'Wallet connection failed';
      return false;
    }
  }

  async function handleWalletDisconnect() {
    if (!gameController) return;
    
    try {
      await gameController.disconnectWallet();
      walletState = gameController.getWalletState();
      isGameReady = false;
      errorMessage = '';
    } catch (error) {
      console.error('Wallet disconnect failed:', error);
      errorMessage = error instanceof Error ? error.message : 'Wallet disconnect failed';
    }
  }

  function handleBetChange(amount: number) {
    if (!gameController) return;
    
    try {
      gameController.setBetAmount(amount);
      errorMessage = '';
    } catch (error) {
      console.error('Bet change failed:', error);
      errorMessage = error instanceof Error ? error.message : 'Invalid bet amount';
    }
  }

  // Format outcome text for medieval feel
  function formatOutcome(outcome: string): string {
    switch(outcome) {
      case 'HIT': return 'Strike Lands';
      case 'CRIT': return 'Critical Blow';
      case 'MEGA HIT': return 'Devastating Strike';
      case 'MISS': return 'Attack Misses';
      case 'COUNTER': return 'Enemy Retaliates';
      default: return outcome;
    }
  }

  function formatCurrency(amount: number): string {
    return `${amount.toFixed(4)} ${walletState.currency}`;
  }
</script>

<main style={`background-image: ${backgroundUrl ? `url('${backgroundUrl}')` : 'none'}; background-size: contain; background-position: center; background-repeat: no-repeat;`}>
  <h1>Boss Rush</h1>
  
  {#if errorMessage}
    <div class="error-message">
      {errorMessage}
    </div>
  {/if}

  {#if gameController}
    <!-- Wallet Connection -->
    <WalletConnect 
      {walletState}
      gameConfig={gameController.getGameConfig()}
      onConnect={handleWalletConnect}
      onDisconnect={handleWalletDisconnect}
    />

    {#if walletState.isConnected}
      <!-- Bet Controls -->
      <BetControls 
        {walletState}
        gameConfig={gameController.getGameConfig()}
        currentBet={gameController.getBetAmount()}
        onBetChange={handleBetChange}
      />

      {#if isGameReady}
        <!-- Game UI -->
        <div class="ui-region panel">
          <div class="game-info">
            <p>Stage: {gameController.getCurrentStage()}</p>
            <p>Total Winnings: {formatCurrency(gameController.getTotalPayout())}</p>
            <p>Current Bet: {formatCurrency(gameController.getBetAmount())}</p>
            <p>Nonce: {gameController.getNonce()}</p>
          </div>

          <div class="boss-ui">
            <h2>{gameController.getBoss().name}</h2>
            <HealthBar 
              currentHealth={gameController.getBoss().currentHealth}
              maxHealth={gameController.getBoss().maxHealth}
              width={300}
              height={30}
            />
          </div>

          {#if attackResult}
            <div class="result-pill">
              <div class="outcome">{formatOutcome(attackResult.outcome)}!</div>
              <div class="details">
                {#if attackResult.damage > 0}Damage: {attackResult.damage} |{/if} 
                Payout: {attackResult.payoutMultiplier}x
                {#if attackResult.isVerified}
                  <span class="verified">✓ Verified</span>
                {:else}
                  <span class="unverified">⚠ Unverified</span>
                {/if}
              </div>
            </div>
          {/if}

          <div class="controls">
            <AttackButton 
              on:attack={handleAttack} 
              disabled={!canAttack || !isGameReady || walletState.balance < gameController.getBetAmount()} 
            />
            <CashOutButton 
              on:cashout={handleCashOut}
              disabled={gameController.getTotalPayout() <= 0}
            />
          </div>
        </div>

        <!-- Game Arena -->
        <div class="game-arena">
          <PlayerComponent isAttacking={isPlayerAttacking} attackType={playerAttackType} />
          <BossComponent compact={true} {attackResult} boss={gameController.getBoss()} />
        </div>
      {:else}
        <div class="loading-message">
          <h3>Initializing Game...</h3>
          <p>Loading outcome bundles and connecting to Stake network...</p>
        </div>
      {/if}
    {/if}
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    position: relative;
    padding: 20px;
    background: radial-gradient(ellipse at center, #1a1611 0%, #0d0a08 70%);
    color: #c4a876;
    font-family: 'Cinzel', serif;
  }

  h1 {
    color: #00ff00;
    font-size: 2.5em;
    margin-bottom: 20px;
    text-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  }

  .error-message {
    background: rgba(255, 0, 0, 0.2);
    color: #ff6666;
    border: 1px solid #ff6666;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
    max-width: 500px;
  }

  .loading-message {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #00ff00;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    margin: 20px 0;
  }

  .loading-message h3 {
    color: #00ff00;
    margin-bottom: 10px;
  }

  .loading-message p {
    color: #ffffff;
    margin: 0;
  }

  .game-info {
    margin-bottom: 20px;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    padding: 16px;
    border-radius: 8px;
    border: 1px solid rgba(0, 255, 0, 0.4);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
  }

  .game-info p {
    margin: 0;
    color: #ffffff;
  }

  .boss-ui {
    text-align: center;
    margin-bottom: 20px;
  }

  .boss-ui h2 {
    color: #ff6666;
    margin-bottom: 10px;
    font-size: 1.8em;
  }

  .result-pill {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #00ff00;
    border-radius: 10px;
    padding: 15px;
    margin: 15px 0;
    text-align: center;
    animation: resultPulse 0.5s ease;
  }

  .outcome {
    font-size: 1.3em;
    font-weight: bold;
    color: #00ff00;
    margin-bottom: 8px;
  }

  .details {
    color: #ffffff;
    font-size: 0.9em;
  }

  .verified {
    color: #00ff00;
    font-weight: bold;
    margin-left: 10px;
  }

  .unverified {
    color: #ff6666;
    font-weight: bold;
    margin-left: 10px;
  }

  .game-arena {
    position: fixed;
    left: 50%;
    bottom: 15%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 92px;
    z-index: 10;
  }

  .ui-region {
    box-sizing: border-box;
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .controls {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }

  @keyframes resultPulse {
    0% { transform: scale(0.9); opacity: 0; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 768px) {
    main {
      padding: 10px;
    }

    h1 {
      font-size: 2em;
    }

    .game-info {
      grid-template-columns: 1fr;
    }

    .controls {
      flex-direction: column;
      gap: 10px;
    }

    .game-arena {
      bottom: 10%;
      gap: 60px;
    }
  }
</style>