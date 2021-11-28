import LeetTitle from './LeetTitle';
import { mount } from '@vue/test-utils';

describe('LeetTitle', () => {
  test('exists', () => {
    const wrapper = mount(LeetTitle);
    expect(wrapper.exists()).toBe(true);
  });
});
