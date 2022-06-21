import { Logo } from '@/components';
import { render } from 'solid-testing-library';
import { describe, expect, test } from 'vitest';

describe('<Logo />', () => {
  test('Render', () => {
    const { container, unmount } = render(() => <Logo />);
    expect(container.innerHTML).toMatchSnapshot();
    unmount();
  });
});
