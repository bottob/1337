<template>
  <div>
    <LeetFilters
      :available-offices="availableOffices"
      :selected-offices="selectedOffices"
      :name-filter="nameFilter"
      @filter-by-office="filterByOffice"
      @filter-by-name="filterByName" />

    <br>

    <div :class="$style.grid">
      <LeetEmployeeCard
        v-for="employee in employeesFiltered.slice(0, 15)"
        :key="employee.name"
        v-bind="employee" />
    </div>

    <LeetTitle>Hello world</LeetTitle>

    <br>

    <div :class="$style.tempCard">
      <LeetEmployeeCard v-bind="test" />
    </div>
  </div>
</template>

<script>
import LeetEmployeeCard from '@/components/LeetEmployeeCard';
import LeetFilters from '@/components/LeetFilters';
import LeetTitle from '@/components/LeetTitle';

export default {
  components: { LeetTitle, LeetFilters, LeetEmployeeCard },

  data() {
    return {
      selectedOffices: [],
      nameFilter: '',
      test: {
        name: 'Octocat',
        office: 'Stockholm',
        imageUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
        linkedinUrl: 'https://www.linkedin.com',
        githubUrl: 'https://github.com',
        twitterUrl: 'https://twitter.com',
      },
    };
  },

  computed: {
    /** List of offices that have at least 1 employee */
    availableOffices() {
      return this.employees
        .map((employee) => employee.office)
        .reduce(
          (result, current) => [ ...result, !result.includes(current) ? current : null ].filter((val) => val),
          [],
        );
    },
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

  methods: {
    filterByOffice(offices) {
      this.selectedOffices = offices;
    },
    filterByName(name) {
      this.nameFilter = name;
    },
  },

  async asyncData() {
    const ENDPOINT = 'https://api.1337co.de/v3/employees';
    // TODO: use polyfill or axios for better browser compatibility
    const response = await fetch(ENDPOINT, { headers: { Authorization: process.env.API_KEY } });
    const employees = (await response.json())
      // transform to be compatible with LeetEmployeeCard
      .map((employee) => {
        const {
          name,
          office,
          imagePortraitUrl: imageUrl,
          linkedIn: linkedinUrl,
          gitHub: githubUrl,
          twitter: twitterUrl,
        } = employee;
        return {
          name,
          imageUrl,
          office,
          linkedinUrl,
          githubUrl,
          twitterUrl,
        };
      });
    return { employees };
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
