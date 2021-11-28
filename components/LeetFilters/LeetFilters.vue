<template>
  <section :class="$style.root">
    <header>
      <LeetTitle tag="h3">
        Filter employees
      </LeetTitle>
    </header>

    <div :class="$style.fieldCtn">
      <LeetTitle tag="h4" size="s">
        By office
      </LeetTitle>

      <div :class="$style.checkboxList">
        <div :class="$style.checkboxCtn">
          <input
            id="office-all"
            v-model="allOfficesAreSelected"
            value="all"
            name="offices"
            type="checkbox"
            @change="onAllToggle">
          <LeetTitle tag="label" size="xs" for="office-all">
            All
          </LeetTitle>
        </div>

        <div
          v-for="office in availableOffices"
          :key="office"
          :class="$style.checkboxCtn">
          <input
            :id="`office-${office}`"
            v-model="selectedOfficesComputed"
            :value="office"
            type="checkbox">
          <LeetTitle tag="label" size="xs" :for="`office-${office}`">
            {{ office }}
          </LeetTitle>
        </div>
      </div>
    </div>

    <div :class="$style.fieldCtn">
      <LeetTitle tag="label" size="s" for="name">
        By name
      </LeetTitle>

      <input id="name" v-model="nameFilterComputed" type="text">
    </div>
  </section>
</template>

<script>
import LeetTitle from '../LeetTitle';

export default {
  components: { LeetTitle },

  props: {
    /** List of offices that can be filtered for */
    availableOffices: {
      type: Array,
      default: () => [],
    },
    /** Currently selected offices */
    selectedOffices: {
      type: Array,
      default: () => [],
    },
    /** A name the employees should be filtered by */
    nameFilter: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      // tracks if "All" option is checked
      allOfficesAreSelected: true,
    };
  },

  computed: {
    /**
      to be able to use `v-model` on the inputs, we can not directly modify the props.
      therefore we use a computed property as middelman.
      Whenever the input changes, the component emits an event, so that the parent component can update the props.
    */
    selectedOfficesComputed: {
      get() {
        // if "All" option is enabled, select all offices
        return this.allOfficesAreSelected ?
          this.availableOffices :
          this.selectedOffices;
      },
      set(val) {
        this.updateOffices(val);
      },
    },
    nameFilterComputed: {
      get() {
        return this.nameFilter;
      },
      set(val) {
        this.updateName(val);
      },
    },
  },

  watch: {
    selectedOffices(val) {
      /* "All" option should be checked if all offices are selected */
      if (val.length < this.availableOffices.length) {
        this.allOfficesAreSelected = false;
      }
      else {
        /* "All" option should be unchecked if at least 1 office is not selected */
        this.allOfficesAreSelected = true;
      }
    },
  },

  mounted() {
    // initialize
    this.updateOffices(this.selectedOfficesComputed);
  },

  methods: {
    updateOffices(val) {
      this.$emit('filter-by-office', val);
    },
    updateName(val) {
      this.$emit('filter-by-name', val);
    },
    onAllToggle(e) {
      const isChecked = e.target.checked;

      this.allOfficesAreSelected = isChecked;

      /* If "All" option is manually being checked, select all offices */
      if (isChecked) {
        this.updateOffices(this.availableOffices);
      }
      else {
        /* If "All" option is manually being unchecked, unselect all offices */
        this.updateOffices([]);
      }
    },
  },
};
</script>

<style module lang="scss">
%stack {
  display: grid;
  grid-template-columns: 1fr;
}

.root {
  @extend %stack;
  grid-gap: var(--space-m);
}

.fieldCtn {
  @extend %stack;
  grid-gap: var(--space-s);
  max-width: 15rem;
}

.checkboxList {
  @extend %stack;
  grid-gap: var(--space-xxs);
}

.checkboxCtn {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  grid-gap: var(--space-xs);
}
</style>
