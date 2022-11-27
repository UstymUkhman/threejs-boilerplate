import { Version } from '@/components';
import { describe, expect, test } from 'vitest';
import { render } from '@solidjs/testing-library';

describe('<Version />', () => {
  test('Render', () => {
    const { container, unmount } = render(() => <Version />);
    expect(container.innerHTML).toMatchSnapshot();
    unmount();
  });
});
