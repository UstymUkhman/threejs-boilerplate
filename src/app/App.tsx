import './App.scss';
import Logo from '@/components/Logo';
import Playground from '@/Playground';
import { createSignal } from 'solid-js';
import type { AppProps } from './types.d';
import Version from '@/components/Version';

export default ({ root }: AppProps) => {
  setTimeout(() => setVisibleLogo(false), 2e3);
  const [visibleLogo, setVisibleLogo] = createSignal(true);

  const scene = new Playground().domElement;
  root.appendChild(scene);
  scene.focus();

  return (
    <>
      {visibleLogo() && <Logo />}
      {import.meta.env.DEV && <Version />}
    </>
  );
};
