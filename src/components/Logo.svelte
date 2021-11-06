<div>
  <img src={Logo} alt="Three.js" />
  <h1>Three.js Boilerplate</h1>
</div>

<script lang="ts">
  import Logo from '/img/logo.png';
</script>

<style lang="scss">
  @use "@scss/variables.scss" as var;

  div {
    box-shadow: 0px 0px 5px var.$dark;
    backdrop-filter: blur(5px);

    justify-content: center;
    pointer-events: none;

    justify-self: center;
    align-items: center;

    border-radius: 10px;
    position: absolute;
    padding: 25px 50px;

    display: flex;
    margin: auto;

    height: 50px;
    width: 350px;

    bottom: 0;
    right: 0;
    left: 0;
    top: 0;

    img {
      margin-right: 15px;
      max-width: 50px;
      height: auto;
    }

    h1 {
      font-family: "Roboto Mono", monospace;
      color: var.$dark;
      font-size: 20px;
    }
  }
</style>
