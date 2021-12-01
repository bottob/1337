import LeetFilters from './LeetFilters';
import { mount } from '@vue/test-utils';

const factory = (propsData) => mount(LeetFilters, { propsData });

describe('LeetFilters', () => {
  test('exists', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
  });
  describe('office filter', () => {
    test('emits event on edit', () => {
      const wrapper = factory({
        availableOffices: [ 'Stockholm', 'Lund' ],
        selectedOffices: [ 'Lund' ],
      });
      // mock office selection changing
      wrapper.setData({ selectedOfficesComputed: [] });

      // skip 1st event that is being emitted on initialization
      const e = wrapper.emitted('filter-by-office')[1][0];
      expect(e.length).toBe(0);
    });
    test('will select all if "All" option is enabled', () => {
      const wrapper = factory({
        availableOffices: [ 'Stockholm', 'Lund' ],
        // not all offices are selected
        selectedOffices: [ 'Lund' ],
      });
      // mock "all" getting checked
      wrapper.setData({ allOfficesAreSelected: true });

      // skip 1st event that is being emitted on initialization
      const e = wrapper.emitted('filter-by-office')[1][0];
      expect(e.length).toBe(2);
    });
    test('will remove all if "All" option is disabled', () => {
      const wrapper = factory({
        availableOffices: [ 'Stockholm', 'Lund' ],
        // some offices are selected
        selectedOffices: [ 'Lund' ],
      });
      // mock "all" getting unchecked
      wrapper.setData({ allOfficesAreSelected: false });

      // skip 1st event that is being emitted on initialization
      const e = wrapper.emitted('filter-by-office')[1][0];
      expect(e.length).toBe(0);
    });
  });
  describe('name filter', () => {
    test('emits event on edit', () => {
      const wrapper = factory({ nameFilter: '' });
      // mock name change
      wrapper.setData({ nameFilterComputed: 'Oktocat' });

      const e = wrapper.emitted('filter-by-name')[0][0];
      expect(e).toBe('Oktocat');
    });
  });
});
