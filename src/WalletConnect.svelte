<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { WalletState, StakeGameConfig } from './types';

  export let walletState: WalletState;
  export let gameConfig: StakeGameConfig;
  export let onConnect: () => Promise<boolean>;
  export let onDisconnect: () => Promise<void>;

  const dispatch = createEventDispatcher();

  let isConnecting = false;

  async function handleConnect() {
    isConnecting = true;
    try {
      const success = await onConnect();
      if (success) {
        dispatch('connected');
      }
    } catch (error) {
      console.error('Connection failed:', error);
      dispatch('error', { message: 'Failed to connect wallet' });
    } finally {
      isConnecting = false;
    }
  }

  async function handleDisconnect() {
    try {
      await onDisconnect();
      dispatch('disconnected');
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  }

  function formatBalance(balance: number, currency: string): string {
    return `${balance.toFixed(4)} ${currency}`;
  }

  function formatAddress(address: string): string {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
</script>

<div class="wallet-container">
  {#if !walletState.isConnected}
    <div class="wallet-connect">
      <h3>Connect Your Wallet</h3>
      <p>Connect your Stake wallet to start playing Boss Rush with real {gameConfig.currency}!</p>
      
      <div class="game-info">
        <div class="info-item">
          <span class="label">Min Bet:</span>
          <span class="value">{gameConfig.minBet} {gameConfig.currency}</span>
        </div>
        <div class="info-item">
          <span class="label">Max Bet:</span>
          <span class="value">{gameConfig.maxBet} {gameConfig.currency}</span>
        </div>
        <div class="info-item">
          <span class="label">House Edge:</span>
          <span class="value">{(gameConfig.houseEdge * 100).toFixed(1)}%</span>
        </div>
      </div>

      <button 
        class="connect-btn" 
        on:click={handleConnect}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  {:else}
    <div class="wallet-connected">
      <div class="wallet-info">
        <div class="balance">
          <span class="balance-label">Balance:</span>
          <span class="balance-value">{formatBalance(walletState.balance, walletState.currency)}</span>
        </div>
        {#if walletState.address}
          <div class="address">
            <span class="address-label">Address:</span>
            <span class="address-value">{formatAddress(walletState.address)}</span>
          </div>
        {/if}
      </div>
      
      <button class="disconnect-btn" on:click={handleDisconnect}>
        Disconnect
      </button>
    </div>
  {/if}
</div>

<style>
  .wallet-container {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #00ff00;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
    text-align: center;
  }

  .wallet-connect h3 {
    color: #00ff00;
    margin-bottom: 10px;
    font-size: 1.5em;
  }

  .wallet-connect p {
    color: #ffffff;
    margin-bottom: 20px;
    line-height: 1.4;
  }

  .game-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin: 20px 0;
    padding: 15px;
    background: rgba(0, 255, 0, 0.1);
    border-radius: 8px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .label {
    color: #cccccc;
    font-size: 0.9em;
  }

  .value {
    color: #00ff00;
    font-weight: bold;
    font-size: 1.1em;
  }

  .connect-btn {
    background: linear-gradient(45deg, #00ff00, #00cc00);
    color: #000000;
    border: none;
    padding: 15px 30px;
    font-size: 1.2em;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .connect-btn:hover:not(:disabled) {
    background: linear-gradient(45deg, #00cc00, #009900);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
  }

  .connect-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .wallet-connected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
  }

  .wallet-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;
  }

  .balance, .address {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .balance-label, .address-label {
    color: #cccccc;
    font-size: 0.9em;
  }

  .balance-value {
    color: #00ff00;
    font-weight: bold;
    font-size: 1.2em;
  }

  .address-value {
    color: #ffffff;
    font-family: monospace;
    font-size: 0.9em;
  }

  .disconnect-btn {
    background: rgba(255, 0, 0, 0.2);
    color: #ff6666;
    border: 1px solid #ff6666;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .disconnect-btn:hover {
    background: rgba(255, 0, 0, 0.3);
    color: #ffffff;
  }

  @media (max-width: 600px) {
    .wallet-connected {
      flex-direction: column;
      text-align: center;
    }

    .wallet-info {
      text-align: center;
    }

    .game-info {
      grid-template-columns: 1fr;
    }
  }
</style>