import LeetTheme from './LeetTheme';
import { mount } from '@vue/test-utils';

describe('LeetTheme', () => {
  test('exists', () => {
    const wrapper = mount(LeetTheme);
    expect(wrapper.exists()).toBe(true);
  });
});
