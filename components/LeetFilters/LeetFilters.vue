<template>
  <section :class="$style.root">
    <header>
      <LeetTitle tag="h3" size="l">
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

      <input
        id="name"
        v-model="nameFilterComputed"
        type="text"
        :class="$style.textInput">
    </div>
  </section>
</template>

<script>
import LeetTitle from '../LeetTitle';

/**
 * Controls for manipulating the employees filter.
 *
 * Emits 2 events:
 * -> 'filter-by-office': array. Should be feed back as `selectedOffices` prop
 * -> 'filter-by-name': string. Should be feed back as `nameFilter` prop
 */
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

  computed: {
    /**
      to be able to use `v-model` on the inputs, we can not directly modify the props.
      therefore we use a computed property as middelman.
      Whenever the input changes, the component emits an event, so that the parent component can update the props.
    */
    selectedOfficesComputed: {
      get() {
        return this.selectedOffices;
      },
      set(val) {
        this.updateOffices(val);
      },
    },
    /**
      tracks if "All" option is checked.
      Note that this option might change in 2 ways:
      1. The user checks/unchecks individual offices
        -> will check if all the available offices are checked
      2. The user manually clicks the "All" option
        -> will update `selectedOfficesComputed` to be full or empty
    */
    allOfficesAreSelected: {
      get() {
        return this.selectedOffices.length === this.availableOffices.length;
      },
      set(val) {
        if (val) {
          // select all offices
          this.selectedOfficesComputed = this.availableOffices;
        }
        else {
          // remove all offices
          this.selectedOfficesComputed = [];
        }
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
      this.allOfficesAreSelected = e.target.checked;
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

.textInput {
  color: var(--font-text);
  border: 1px solid var(--color-border);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  padding: var(--space-xxs) var(--space-xs);

  &:focus {
    outline: solid 2px var(--color-brand-accent);
    outline-offset: 1px;
  }
}
</style>
