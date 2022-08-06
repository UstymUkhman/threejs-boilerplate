import Logo from '/img/logo.png';
import Style from './Logo.module.scss';

export default () =>
(
  <div class={Style.logo}>
    <img src={Logo} alt="Three.js" />
    <h1>Three.js Boilerplate</h1>
  </div>
);
