import App from './App.svelte';

const root = document.getElementById('root') as HTMLElement;

export default new App({
  props: { root },
  target: root
});
