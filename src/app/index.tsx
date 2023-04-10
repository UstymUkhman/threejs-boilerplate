import './App.scss';
import Sandbox from '@/sandbox';
import { createSignal } from 'solid-js';
import type { AppProps } from './types.d';
import { Logo, Version } from '@/components';

export const App = ({ root }: AppProps) =>
{
  const [visibleLogo, setVisibleLogo] = createSignal(true);
  const scene = new Sandbox().domElement;

  setTimeout(setVisibleLogo, 2500);
  root.appendChild(scene);
  scene.focus();

  return <>
    {visibleLogo() && <Logo />}
    {import.meta.env.DEV && <Version />}
  </>;
};
