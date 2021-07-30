{#if visibleLogo}
  <div transition:fade="{{
    easing: quartOut,
    duration: 1000
  }}">
    <Logo />
  </div>
{/if}

{#if import.meta.env.DEV}
  <Version />
{/if}

<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';

  import Logo from '@/components/Logo.svelte';
  import Version from '@/components/Version.svelte';

  let visibleLogo = true;

  onMount(() => setTimeout(() => visibleLogo = false, 1000));
</script>

<style lang="scss" global>
  body > div#stats:last-child {
    left: auto !important;
    right: 0 !important;
  }
</style>
