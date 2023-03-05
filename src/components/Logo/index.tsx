import LogoImage from '@/assets/images/logo.png';
import Style from './Logo.module.scss';

export const Logo = () =>
(
  <div class={Style.logo}>
    <img src={LogoImage} alt="Three.js" />
    <h1>Three.js Boilerplate</h1>
  </div>
);
