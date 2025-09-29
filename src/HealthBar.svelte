<script lang="ts">
  export let currentHealth: number = 100;
  export let maxHealth: number = 100;
  export let width: number = 300;
  export let height: number = 30;
  
  $: healthPercentage = maxHealth > 0 ? Math.max(0, Math.min(100, (currentHealth / maxHealth) * 100)) : 0;
  
  // Color stops for the bar based on percentage
  $: barColor = healthPercentage > 60
    ? 'linear-gradient(90deg, #34d399, #10b981)'
    : healthPercentage > 30
    ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
    : healthPercentage > 0
    ? 'linear-gradient(90deg, #fb7185, #ef4444)'
    : 'linear-gradient(90deg, #4b5563, #374151)';
</script>

<div class="health-bar-container">
  <div class="health-track" style="width: {width}px; height: {height}px;">
    <div class="health-fill" style="width: {healthPercentage}%; background: {barColor};"></div>
  </div>
  <div class="health-text">{currentHealth} / {maxHealth}</div>
</div>

<style>
  .health-bar-container { display: flex; flex-direction: column; align-items: center; margin: 10px 0; }
  .health-track { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 4px 12px rgba(0,0,0,0.35); }
  .health-fill { height: 100%; transition: width 0.35s ease, background 0.35s ease; background-image: linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0)); }
  .health-text { margin-top: 6px; font-weight: 700; }
</style>
