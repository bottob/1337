<template>
  <div :class="$style.container">
    <LeetFilters
      :available-offices="availableOffices"
      :selected-offices="selectedOffices"
      :name-filter="nameFilter"
      @filter-by-office="filterByOffice"
      @filter-by-name="filterByName" />

    <br>

    <LeetEmployeeGrid
      :employees="employees"
      :name-filter="nameFilter"
      :selected-offices="selectedOffices" />

    <br>

    <LeetTitle>Hello world</LeetTitle>

    <br>

    <div :class="$style.tempCard">
      <LeetEmployeeCard v-bind="test" />
    </div>
  </div>
</template>

<script>
import LeetEmployeeCard from '@/components/LeetEmployeeCard';
import LeetEmployeeGrid from '@/components/LeetEmployeeGrid';
import LeetFilters from '@/components/LeetFilters';
import LeetTitle from '@/components/LeetTitle';

export default {
  components: { LeetTitle, LeetFilters, LeetEmployeeCard, LeetEmployeeGrid },

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
.container {
  width: 100%;
  max-width: 82rem;
  padding: 0 var(--space-m);
  margin: 0 auto;
}

.tempCard {
  max-width: 20rem;
}
</style>
