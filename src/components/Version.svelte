<aside>
  v{version}
</aside>

<script lang="ts">
  const version = import.meta.env.BUILD;
</script>

<style lang="scss">
  @use '@scss/variables.scss' as var;

  aside {
    background-color: var.$dark;
    padding: 3px 10px;
    color: var.$light;
    font-size: 12px;

    position: fixed;
    display: block;

    bottom: 0;
    right: 0;
  }
</style>
