<script lang="ts">
  import HealthBar from './HealthBar.svelte';
  
  export let attackResult: any = null;
  export let boss: any = null;
  export let compact: boolean = true;
  
  let animationClass = '';
  let isAnimating = false;
  let currentFrame = 0;
  let animationInterval: any = null;
  let animFrames: string[] = [];
  let frameInterval: any = null;
  
  // Initialize animation frames
  function initAnimations() {
    // Clear any existing frame interval
    if (frameInterval) {
      clearInterval(frameInterval);
      frameInterval = null;
    }
    
    if (typeof window !== 'undefined') {
      if (window.resolveKarenbotAnimList && boss?.id === 3) {
        animFrames = window.resolveKarenbotAnimList('idle');
      } else if (window.resolveYetiAnimList && boss?.id === 2) {
        animFrames = window.resolveYetiAnimList('idle');
      } else if (window.resolveRoachAnimList) {
        animFrames = window.resolveRoachAnimList('idle');
      }
      
      // Start frame animation loop
      if (animFrames.length > 0) {
        currentFrame = 0;
        frameInterval = setInterval(() => {
          if (!isAnimating) {
            currentFrame = (currentFrame + 1) % animFrames.length;
          }
        }, 120);
      }
    }
  }
  
  // Animation handling
  function animateBoss() {
    if (!attackResult) return;
    
    isAnimating = true;
    currentFrame = 0;
    
    // Set specific animation frames based on boss type
    if (typeof window !== 'undefined') {
      if (window.resolveKarenbotAnimList && boss?.id === 3) {
        if (attackResult.outcome === 'COUNTER') {
          animFrames = window.resolveKarenbotAnimList('attack');
        } else if (['HIT', 'CRIT', 'MEGA HIT'].includes(attackResult.outcome)) {
          animFrames = window.resolveKarenbotAnimList('death');
        }
      } else if (window.resolveYetiAnimList && boss?.id === 2) {
        if (attackResult.outcome === 'COUNTER') {
          animFrames = window.resolveYetiAnimList('attack');
        } else if (['HIT', 'CRIT', 'MEGA HIT'].includes(attackResult.outcome)) {
          animFrames = window.resolveYetiAnimList('death');
        }
      } else if (window.resolveRoachAnimList) {
        if (attackResult.outcome === 'COUNTER') {
          animFrames = window.resolveRoachAnimList('attack');
        } else if (['HIT', 'CRIT', 'MEGA HIT'].includes(attackResult.outcome)) {
          animFrames = window.resolveRoachAnimList('death');
        }
      }
    }
    
    switch (attackResult.outcome) {
      case 'HIT':
        animationClass = 'hit';
        break;
      case 'CRIT':
        animationClass = 'crit';
        break;
      case 'MEGA HIT':
        animationClass = 'mega';
        break;
      case 'MISS':
        animationClass = 'miss';
        break;
      case 'COUNTER':
        animationClass = 'counter-anim';
        break;
      default:
        animationClass = '';
    }
    
    // Reset animation class after duration
    setTimeout(() => {
      animationClass = '';
      isAnimating = false;
      // Reset to idle animation
      if (typeof window !== 'undefined') {
        if (window.resolveKarenbotAnimList && boss?.id === 3) {
          animFrames = window.resolveKarenbotAnimList('idle');
        } else if (window.resolveYetiAnimList && boss?.id === 2) {
          animFrames = window.resolveYetiAnimList('idle');
        } else if (window.resolveRoachAnimList) {
          animFrames = window.resolveRoachAnimList('idle');
        }
      }
      // Reset frame counter
      currentFrame = 0;
    }, 1000);
  }
  
  // Handle damage shake effect
  function handleDamageEffect() {
    if (!attackResult) return;
    
    // Only apply shake effect for HIT, CRIT, MEGA HIT
    if (['HIT', 'CRIT', 'MEGA HIT'].includes(attackResult.outcome)) {
      animationClass = 'shake';
      
      // Set death animation frames for damage effect
      if (typeof window !== 'undefined') {
        if (window.resolveKarenbotAnimList && boss?.id === 3) {
          animFrames = window.resolveKarenbotAnimList('death');
        } else if (window.resolveYetiAnimList && boss?.id === 2) {
          animFrames = window.resolveYetiAnimList('death');
        } else if (window.resolveRoachAnimList) {
          animFrames = window.resolveRoachAnimList('death');
        }
      }
      
      setTimeout(() => {
        if (animationClass === 'shake') {
          animationClass = '';
        }
      }, 500);
    }
  }
  
  // Watch for attackResult changes
  $: if (attackResult) {
    handleDamageEffect();
    animateBoss();
  }
  
  // Watch for boss changes to update animations
  $: if (boss) {
    initAnimations();
  }
  
  // Initialize on mount
  import { onMount } from 'svelte';
  onMount(() => {
    initAnimations();
  });
  
  // Clean up intervals on destroy
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (animationInterval) clearInterval(animationInterval);
    if (frameInterval) clearInterval(frameInterval);
  });
</script>

<div class="boss-container">
  {#if !compact}
    <h2>{boss?.name || 'Roach'}</h2>
    <HealthBar 
      currentHealth={boss?.currentHealth || 30} 
      maxHealth={boss?.maxHealth || 30} 
      width={300} 
      height={30} 
    />
  {/if}
  <div class="boss-sprite {animationClass}">
    {#if animFrames.length > 0}
      <img src={animFrames[currentFrame % animFrames.length]} alt="Roach" class="boss-image" />
    {:else}
      <div class="boss-placeholder">🪳</div>
    {/if}
  </div>
</div>

{#if attackResult && !compact}
  <div class="result-display">
    <p>{attackResult.outcome}! Damage: {attackResult.damage}, Payout: {attackResult.payoutMultiplier}x</p>
  </div>
{/if}

<style>
  .boss-container {
    text-align: center;
    margin: 20px;
  }

  .boss-sprite {
    width: auto;
    height: 35%; /* smaller to sit inside arena circle */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .boss-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scaleX(-1); /* face toward player */
  }

  .boss-placeholder {
    font-size: 100px;
  }

  .boss-sprite.hit {
    animation: hit 0.3s;
  }

  .boss-sprite.crit {
    animation: crit 0.5s;
  }

  .boss-sprite.mega {
    animation: mega 1s;
  }

  .boss-sprite.miss {
    animation: miss 0.3s;
  }

  .boss-sprite.shake {
    animation: shake 0.5s;
  }

  .boss-sprite.counter-anim {
    animation: counter 0.8s steps(6, end);
  }

  @keyframes hit {
    0% { transform: translateX(0); }
    50% { transform: translateX(-20px); }
    100% { transform: translateX(0); }
  }

  @keyframes crit {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  @keyframes mega {
    0% { transform: scale(1); }
    25% { transform: scale(1.5); }
    50% { transform: scale(1.2); }
    75% { transform: scale(1.8); }
    100% { transform: scale(1); }
  }

  @keyframes miss {
    0% { transform: rotate(0); }
    50% { transform: rotate(10deg); }
    100% { transform: rotate(0); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }

  @keyframes counter {
    0% { background-position: 0 0; }
    100% { background-position: 100% 0; }
  }

  .result-display {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #ffcc00;
  }
</style>