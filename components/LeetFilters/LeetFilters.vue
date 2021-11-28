<template>
  <div>
    <div>
      <LeetTitle tag="h4" size="s">
        Offices
      </LeetTitle>

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
    nameFilter: {
      type: String,
      default: '',
    },
  },

  computed: {
    // to be able to use `v-model` on the inputs, we can not directly modify the props.
    // therefore we use a computed property as middelman.
    // Whenever the input changes, the component emits an event, so that the parent component can update the props.
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
};
</script>
