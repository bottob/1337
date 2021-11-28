import LeetSpinner from './LeetSpinner';
import { mount } from '@vue/test-utils';

describe('LeetSpinner', () => {
  test('exists', () => {
    const wrapper = mount(LeetSpinner);
    expect(wrapper.exists()).toBe(true);
  });
});
