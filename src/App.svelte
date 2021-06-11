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
  import { quartOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  import Version from '@/components/Version.svelte';
  import Logo from '@/components/Logo.svelte';
  import Playground from '@/Playground';

  onMount(() => setTimeout(() => visibleLogo = false, 1000));

  export let root: HTMLElement;
  let visibleLogo = true;

  if (root.firstElementChild?.tagName !== 'CANVAS') {
    const scene = new Playground().domElement;
    root.appendChild(scene);
    scene.focus();
  }
</script>

<style lang="scss" global>
  body > div#stats:last-child {
    left: auto !important;
    right: 0 !important;
  }
</style>
