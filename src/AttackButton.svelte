<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let disabled = false;

  const dispatch = createEventDispatcher();

  function attack() {
    if (disabled) return;
    dispatch('attack');
  }
</script>

<button class="btn btn-danger" on:click={attack} disabled={disabled}>
  ⚔️ Strike
</button>

<style>
  /* Visual styles are provided by the global theme (src/styles/theme.css) */
</style>