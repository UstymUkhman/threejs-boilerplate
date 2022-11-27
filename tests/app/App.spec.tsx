import { App } from '@/app';
import { render } from '@solidjs/testing-library';
import { describe, expect, test, vi } from 'vitest';

vi.mock('three/src/renderers/WebGLRenderer');

describe('<App />', () => {
  test('Render', () => {
    const root = document.createElement('main');
    const { container, unmount } = render(()=> <App root={root} />);

    expect(container.innerHTML).toMatchSnapshot();
    unmount();
  });
});
