<template>
  <div>
    <header :class="$style.header">
      <LeetTheme theme="dark">
        <div :class="$style.container">
          <div :class="$style.headerStack">
            <LeetTitle tag="h1" size="xl">
              Meet our team
            </LeetTitle>
            <LeetTitle size="l">
              Get to meet all of our Ninjas!
            </LeetTitle>
          </div>
        </div>
      </LeetTheme>
    </header>

    <main :class="$style.content">
      <div :class="$style.container">
        <div :class="$style.contentStack">
          <LeetFilters
            :available-offices="availableOffices"
            :selected-offices="selectedOffices"
            :name-filter="nameFilter"
            @filter-by-office="filterByOffice"
            @filter-by-name="filterByName" />

          <LeetEmployeeGrid
            :employees="employees"
            :name-filter="nameFilter"
            :selected-offices="selectedOffices" />
        </div>
      </div>
    </main>

    <footer :class="$style.footer">
      <div :class="$style.container">
        <LeetTitle tag="h2" size="l">
          Want to join the team? Apply today!
        </LeetTitle>
      </div>
    </footer>
  </div>
</template>

<script>
import LeetEmployeeGrid from '@/components/LeetEmployeeGrid';
import LeetFilters from '@/components/LeetFilters';
import LeetTheme from '@/components/LeetTheme';
import LeetTitle from '@/components/LeetTitle';

export default {
  components: {
    LeetTitle,
    LeetFilters,
    LeetEmployeeGrid,
    LeetTheme,
  },

  data() {
    return { nameFilter: '' };
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

    // List of offices that have at least 1 employee
    const availableOffices = employees
      .map((employee) => employee.office)
      .reduce(
        (result, current) => [ ...result, !result.includes(current) ? current : null ].filter((val) => val),
        [],
      );

    return {
      employees,
      availableOffices,
      selectedOffices: availableOffices,
    };
  },
};
</script>

<style module lang="scss">
%stack {
  display: grid;
  grid-template-columns: 1fr;
}

.container {
  width: 100%;
  max-width: 82rem;
  padding: 0 var(--space-m);
  margin: 0 auto;
}

.header {
  background: var(--color-brand)
    url('https://tretton37.com/assets/i/sneak-peak/one-tretton.jpg') no-repeat
    center center/cover;
  background-blend-mode: multiply;
  padding: var(--space-xxxl) 0;
}

.headerStack {
  @extend %stack;
  grid-gap: var(--space-s);
}

.content {
  padding: var(--space-xl) 0;
}

.contentStack {
  @extend %stack;
  grid-gap: var(--space-xl);
}

.footer {
  background: var(--color-brand-accent);
  padding: var(--space-xl) 0;
}
</style>
