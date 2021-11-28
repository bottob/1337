<template>
  <div>
    <div>
      <LeetTitle tag="h4" size="s">
        Offices
      </LeetTitle>

      <div>
        <div>
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

        <div v-for="office in availableOffices" :key="office">
          <input
            :id="`office-${office}`"
            v-model="selectedOfficesComputed"
            :value="office"
            name="offices"
            type="checkbox">
          <LeetTitle tag="label" size="xs" :for="`office-${office}`">
            {{ office }}
          </LeetTitle>
        </div>
      </div>
    </div>

    <div>
      <LeetTitle tag="h4" size="s">
        Name
      </LeetTitle>

      <input v-model="nameFilterComputed" type="text">
    </div>
  </div>
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
        return this.selectedOffices;
      },
      set(val) {
        this.$emit('filter-by-office', val);
      },
    },
    nameFilterComputed: {
      get() {
        return this.nameFilter;
      },
      set(val) {
        this.$emit('filter-by-name', val);
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

  methods: {
    onAllToggle(e) {
      const isChecked = e.target.checked;

      /* If "All" option is manually being checked, select all offices */
      if (isChecked) {
        this.$emit('filter-by-office', this.availableOffices);
      }
      else {
        /* If "All" option is manually being unchecked, unselect all offices */
        this.$emit('filter-by-office', []);
      }
      this.allOfficesAreSelected = isChecked;
    },
  },
};
</script>
