<script lang="ts">
  export let isAttacking = false;
  export let attackType: 'sword' | 'knife1' | 'knife2' | 'death' | null = null;
  
  let currentFrame = 0;
  let animationInterval: any = null;
  
  // Simple emoji representations for testing
  const emojiSets = {
    sword: ["⚔️", "🗡️", "🔪", "🗡️", "⚔️", "🗡️", "🔪", "⚔️"],
    knife1: ["🔪", "🗡️", "⚔️", "🔪", "🗡️", "⚔️", "🔪"],
    knife2: ["🗡️", "⚔️", "🔪", "🗡️", "⚔️", "🔪", "🗡️", "⚔️", "🔪"],
    death: ["💀", "☠️", "👻", "😵", "💀", "☠️", "👻", "😵"],
    idle: "👤"
  };

  function startAnimation() {
    // Clear any existing animation
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    
    // Select attack type - use provided one or pick random
    const type = attackType || 'sword';
    const currentEmojiSet = emojiSets[type];
    
    currentFrame = 0;
    
    // Start animation loop
    animationInterval = setInterval(() => {
      currentFrame = (currentFrame + 1) % currentEmojiSet.length;
    }, 150);
  }

  function stopAnimation() {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
  }

  // Watch for attack state changes
  $: {
    if (isAttacking) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }

  // Cleanup on destroy
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
  });
</script>

<div class="player-container">
  <div class="debug-info">
    <p>Player State: {isAttacking ? 'ATTACKING' : 'IDLE'}</p>
  </div>
  
  <div class="player-sprite">
    {#if isAttacking}
      {emojiSets[attackType || 'sword'][currentFrame]}
    {:else}
      {emojiSets.idle}
    {/if}
  </div>
</div>

<style>
  .player-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* anchor sprite to bottom */
    align-items: center;
    margin: 20px;
    height: 60%; /* scaled down to fit arena circle */
  }

  .debug-info {
    color: #ffcc00;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .player-sprite {
    font-size: 48px;
    width: 96px;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.1s;
  }
</style>