import './App.scss';
import Sandbox from '@/sandbox';
import type { AppProps } from './types.d';
import { Logo, Version } from '@/components';
import { createSignal, onCleanup } from 'solid-js';

export const App = ({ root }: AppProps) =>
{
  const sandbox = new Sandbox();
  const [logo, hideLogo] = createSignal(true);

  onCleanup(sandbox.dispose.bind(sandbox));
  root.appendChild(sandbox.canvas);

  setTimeout(hideLogo, 2500.0);
  sandbox.canvas.focus();

  return <>
    {logo() && <Logo />}
    {import.meta.env.DEV && <Version />}
  </>;
};
