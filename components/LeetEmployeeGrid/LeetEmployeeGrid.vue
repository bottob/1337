<template>
  <div>
    <div v-show="employeesFiltered.length" :class="$style.gridParent">
      <div :class="$style.grid">
        <LeetEmployeeCard
          v-for="employee in employeesFiltered.slice(0, amountShown)"
          :key="employee.name"
          v-bind="employee" />
      </div>

      <LeetSpinner v-show="spinnerIsVisible" ref="spinner" />
    </div>

    <div v-if="!employeesFiltered.length">
      <LeetTitle> Noone is matching the current filters! </LeetTitle>
    </div>
  </div>
</template>

<script>
import LeetEmployeeCard from '@/components/LeetEmployeeCard';
import LeetSpinner from '@/components/LeetSpinner';
import LeetTitle from '@/components/LeetTitle';

export default {
  components: { LeetEmployeeCard, LeetTitle, LeetSpinner },

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

  data() {
    return { amountShown: 12 };
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
    spinnerIsVisible() {
      // stop showing spinner if for current filter no additional employees can be shown
      const allAreShown = this.amountShown >= this.employeesFiltered.length;
      return !allAreShown;
    },
  },

  mounted() {
    this.makeInifinite();
  },

  methods: {
    makeInifinite() {
      const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.2,
      };
      const callback = (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          this.amountShown += 4;
        });
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(this.$refs.spinner.$el);
    },
  },
};
</script>

<style module lang="scss">
@use '@/assets/styles/media-queries' as mq;

%stack {
  display: grid;
  grid-template-columns: 1fr;
}

.gridParent {
  @extend %stack;
  grid-gap: var(--space-m);
}

.grid {
  display: grid;
  grid-gap: var(--space-m);
  /* this fluid grid would have been nice, but when the filter gives only 1 person, that card will be gigantic :) */
  // grid-template-columns: repeat(auto-fit, minmax(15rem, auto));
  /* More boring, but better solution: */
  grid-template-columns: repeat(4, 1fr);

  @include mq.tablet {
    grid-template-columns: repeat(3, 1fr);
  }
  @include mq.landscape {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mq.handheld {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
