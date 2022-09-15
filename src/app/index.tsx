import './App.scss';
import Playground from '@/playground';
import { createSignal } from 'solid-js';
import type { AppProps } from './types.d';
import { Logo, Version } from '@/components';

export const App = ({ root }: AppProps) =>
{
  const scene = new Playground().domElement;
  const [visibleLogo, setVisibleLogo] = createSignal(true);

  setTimeout(setVisibleLogo, 2500);
  root.appendChild(scene);
  scene.focus();

  return <>
    {visibleLogo() && <Logo />}
    {import.meta.env.DEV && <Version />}
  </>;
};
