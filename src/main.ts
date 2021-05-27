import App from './App.svelte';

const root = document.getElementById('root') as Element;

export default new App({
  props: { root },
  target: root
});
