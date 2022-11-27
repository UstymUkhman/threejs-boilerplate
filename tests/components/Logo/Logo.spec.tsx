import { Logo } from '@/components';
import { describe, expect, test } from 'vitest';
import { render } from '@solidjs/testing-library';

describe('<Logo />', () => {
  test('Render', () => {
    const { container, unmount } = render(() => <Logo />);
    expect(container.innerHTML).toMatchSnapshot();
    unmount();
  });
});
