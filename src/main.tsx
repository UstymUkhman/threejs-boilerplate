import { App } from '@/app';
import { render } from 'solid-js/web';

const root = document.getElementById('root') as HTMLElement;
render(() => <App root={root} />, root);
