<template>
  <div :class="$style.grid">
    <LeetEmployeeCard
      v-for="employee in employeesFiltered.slice(0, 15)"
      :key="employee.name"
      v-bind="employee" />
  </div>
</template>

<script>
import LeetEmployeeCard from '@/components/LeetEmployeeCard';

export default {
  components: { LeetEmployeeCard },

  props: {
    /** Unfiltered list of all employees. */
    employees: {
      type: Array,
      required: true,
    },
    /** Name that should be filtered for. When empty, no name filter will be applied */
    nameFilter: {
      type: String,
      default: '',
    },
    /** List of office names employee list should be filtered for. */
    selectedOffices: { type: Array },
  },

  computed: {
    /** List of employees that is currently being displayed */
    employeesFiltered() {
      return this.employees.filter((employee) => {
        const worksAtOffice = this.selectedOffices.includes(employee.office);
        const nameFilterIsApplied = Boolean(this.nameFilter);
        const matchesNameFilter = employee.name
          .toLowerCase()
          .includes(this.nameFilter.toLowerCase());
        return worksAtOffice && (!nameFilterIsApplied || matchesNameFilter);
      });
    },
  },
};
</script>

<style module>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--space-m);
}

.tempCard {
  max-width: 20rem;
}
</style>
