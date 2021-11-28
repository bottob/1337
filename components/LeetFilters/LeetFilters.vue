<template>
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
        this.$emit('filter-offices', val);
      },
    },
  },
};
</script>
