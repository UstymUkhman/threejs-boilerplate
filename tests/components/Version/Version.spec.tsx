import { Version } from '@/components';
import { render } from 'solid-testing-library';
import { describe, expect, test } from 'vitest';

describe('<Version />', () => {
  test('Render', () => {
    const { container, unmount } = render(() => <Version />);
    expect(container.innerHTML).toMatchSnapshot();
    unmount();
  });
});
