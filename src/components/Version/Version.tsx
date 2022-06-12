import './Version.scss';

export default () => {
  const version = `v${import.meta.env.BUILD}`;
  return <aside class="version">{version}</aside>;
};
