<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function cashout() {
    dispatch('cashout');
  }
</script>

<button class="btn btn-success" on:click={cashout}>
  CASH OUT
</button>

<style>
  /* Visual styles are provided by the global theme (src/styles/theme.css) */
</style>
