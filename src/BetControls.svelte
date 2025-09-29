<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { WalletState, StakeGameConfig } from './types';

  export let walletState: WalletState;
  export let gameConfig: StakeGameConfig;
  export let currentBet: number;
  export let onBetChange: (amount: number) => void;

  const dispatch = createEventDispatcher();

  let betInput = currentBet;
  let showCustomInput = false;

  // Preset bet amounts
  const presetBets = [0.01, 0.1, 1, 10, 100];

  function handlePresetBet(amount: number) {
    if (amount <= walletState.balance && amount >= gameConfig.minBet && amount <= gameConfig.maxBet) {
      betInput = amount;
      onBetChange(amount);
      showCustomInput = false;
    }
  }

  function handleCustomBet() {
    const amount = parseFloat(betInput.toString());
    if (isNaN(amount)) {
      betInput = currentBet;
      return;
    }

    if (amount < gameConfig.minBet) {
      betInput = gameConfig.minBet;
    } else if (amount > gameConfig.maxBet) {
      betInput = gameConfig.maxBet;
    } else if (amount > walletState.balance) {
      betInput = walletState.balance;
    }

    onBetChange(betInput);
  }

  function handleMaxBet() {
    const maxAmount = Math.min(walletState.balance, gameConfig.maxBet);
    betInput = maxAmount;
    onBetChange(maxAmount);
    showCustomInput = false;
  }

  function formatCurrency(amount: number): string {
    return `${amount.toFixed(4)} ${walletState.currency}`;
  }

  // Reactive statement to update betInput when currentBet changes externally
  $: betInput = currentBet;
</script>

<div class="bet-controls">
  <div class="bet-header">
    <h3>Bet Amount</h3>
    <div class="current-bet">
      Current: <span class="bet-amount">{formatCurrency(currentBet)}</span>
    </div>
  </div>

  <div class="preset-bets">
    {#each presetBets as preset}
      <button 
        class="preset-btn"
        class:active={preset === currentBet}
        class:disabled={preset > walletState.balance || preset < gameConfig.minBet || preset > gameConfig.maxBet}
        on:click={() => handlePresetBet(preset)}
        disabled={preset > walletState.balance || preset < gameConfig.minBet || preset > gameConfig.maxBet}
      >
        {formatCurrency(preset)}
      </button>
    {/each}
  </div>

  <div class="bet-actions">
    <button 
      class="max-btn"
      on:click={handleMaxBet}
      disabled={walletState.balance < gameConfig.minBet}
    >
      Max Bet
    </button>
    
    <button 
      class="custom-btn"
      class:active={showCustomInput}
      on:click={() => showCustomInput = !showCustomInput}
    >
      Custom
    </button>
  </div>

  {#if showCustomInput}
    <div class="custom-input">
      <input 
        type="number" 
        bind:value={betInput}
        on:blur={handleCustomBet}
        on:keydown={(e) => e.key === 'Enter' && handleCustomBet()}
        min={gameConfig.minBet}
        max={Math.min(gameConfig.maxBet, walletState.balance)}
        step="0.01"
        placeholder="Enter bet amount"
      />
      <div class="input-limits">
        Min: {formatCurrency(gameConfig.minBet)} | 
        Max: {formatCurrency(Math.min(gameConfig.maxBet, walletState.balance))}
      </div>
    </div>
  {/if}

  <div class="bet-info">
    <div class="info-row">
      <span>Balance:</span>
      <span class="balance">{formatCurrency(walletState.balance)}</span>
    </div>
    <div class="info-row">
      <span>After Bet:</span>
      <span class="remaining" class:low={walletState.balance - currentBet < gameConfig.minBet}>
        {formatCurrency(Math.max(0, walletState.balance - currentBet))}
      </span>
    </div>
  </div>
</div>

<style>
  .bet-controls {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #00ff00;
    border-radius: 10px;
    padding: 20px;
    margin: 15px 0;
  }

  .bet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .bet-header h3 {
    color: #00ff00;
    margin: 0;
    font-size: 1.3em;
  }

  .current-bet {
    color: #ffffff;
    font-size: 0.9em;
  }

  .bet-amount {
    color: #00ff00;
    font-weight: bold;
  }

  .preset-bets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    margin-bottom: 15px;
  }

  .preset-btn {
    background: rgba(0, 255, 0, 0.1);
    color: #00ff00;
    border: 1px solid #00ff00;
    padding: 10px 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9em;
  }

  .preset-btn:hover:not(:disabled) {
    background: rgba(0, 255, 0, 0.2);
    transform: translateY(-1px);
  }

  .preset-btn.active {
    background: #00ff00;
    color: #000000;
    font-weight: bold;
  }

  .preset-btn.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    color: #666666;
    border-color: #666666;
  }

  .bet-actions {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  .max-btn, .custom-btn {
    flex: 1;
    background: rgba(255, 255, 0, 0.1);
    color: #ffff00;
    border: 1px solid #ffff00;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
  }

  .max-btn:hover:not(:disabled), .custom-btn:hover {
    background: rgba(255, 255, 0, 0.2);
    transform: translateY(-1px);
  }

  .custom-btn.active {
    background: #ffff00;
    color: #000000;
  }

  .max-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    color: #666666;
    border-color: #666666;
  }

  .custom-input {
    margin-bottom: 15px;
    animation: slideDown 0.3s ease;
  }

  .custom-input input {
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    border: 1px solid #00ff00;
    padding: 12px;
    border-radius: 6px;
    font-size: 1em;
    box-sizing: border-box;
  }

  .custom-input input:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }

  .input-limits {
    color: #cccccc;
    font-size: 0.8em;
    margin-top: 5px;
    text-align: center;
  }

  .bet-info {
    border-top: 1px solid rgba(0, 255, 0, 0.3);
    padding-top: 15px;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    color: #ffffff;
  }

  .balance {
    color: #00ff00;
    font-weight: bold;
  }

  .remaining {
    color: #ffffff;
    font-weight: bold;
  }

  .remaining.low {
    color: #ff6666;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    .bet-header {
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }

    .preset-bets {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>