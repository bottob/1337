<template>
  <div>
    <div v-show="employeesFiltered.length" :class="$style.gridParent">
      <transition-group
        tag="div"
        name="grid"
        :class="$style.grid"
        :enter-class="$style.gridEnter"
        :leave-to-class="$style.gridLeaveTo"
        :enter-active-class="$style.gridEnterActive"
        :leave-active-class="$style.gridLeaveActive">
        <LeetEmployeeCard
          v-for="employee in employeesFiltered.slice(0, amountShown)"
          :key="employee.name"
          v-bind="employee"
          :class="$style.gridItem" />
      </transition-group>

      <div v-show="spinnerIsVisible" ref="spinner">
        <LeetSpinner />
      </div>
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
      default: () => [],
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
        const officeFilterIsApplied = Boolean(this.selectedOffices);
        const nameFilterIsApplied = Boolean(this.nameFilter);

        const worksAtOffice =
          !officeFilterIsApplied ||
          this.selectedOffices.includes(employee.office);
        const matchesNameFilter =
          !nameFilterIsApplied ||
          employee.name.toLowerCase().includes(this.nameFilter.toLowerCase());
        return worksAtOffice && matchesNameFilter;
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
        rootMargin: '300px',
        threshold: 0.2,
      };
      const callback = (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          this.amountShown += 4;
        });
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(this.$refs.spinner);
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

// vue transition classes
.gridEnterActive,
.gridLeaveActive {
  transition: all 0.4s;
}
.gridEnter,
.gridLeaveTo {
  opacity: 0;
  transform: translateY(var(--space-xs)) scale(0.8);
}
</style>
