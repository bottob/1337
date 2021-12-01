import LeetEmployeeGrid from './LeetEmployeeGrid';
import { shallowMount } from '@vue/test-utils';

const factory = (propsData) => shallowMount(LeetEmployeeGrid, { propsData });

const employeeA = {
  name: 'Stock Holmgren',
  office: 'Stockholm',
  imageUrl: '',
};
const employeeB = {
  name: 'Björn Lundgren',
  office: 'Lund',
  imageUrl: '',
};

beforeEach(() => {
  // mock IntersectionObserver
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({ observe: () => null });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('LeetEmployeeGrid', () => {
  test('exists', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
  });
  test('shows all employees if no filter', () => {
    const wrapper = factory({ employees: [ employeeA, employeeB ] });
    expect(wrapper.vm.employeesFiltered.length).toBe(2);
  });
  test('filters by office', () => {
    const wrapper = factory({
      employees: [ employeeA, employeeB ],
      selectedOffices: [ 'Lund' ],
    });
    expect(wrapper.vm.employeesFiltered.length).toBe(1);
  });
  test('filters by name', () => {
    const wrapper = factory({
      employees: [ employeeA, employeeB ],
      nameFilter: 'holm',
    });
    expect(wrapper.vm.employeesFiltered.length).toBe(1);
  });
});
