<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export const validVals = { theme: [ 'light', 'dark' ] };

/**
 * Wrapper that applies a local theme using CSS custom properties.
 *
 * If decendants use the tokens defined in the styles section of this component,
 * they will update their colors automatically if the theme changes.
 */
export default {
  props: {
    /** Theme that should be applied to descendant elements */
    theme: {
      type: String,
      default: 'light',
      validator(val) {
        return validVals.theme.includes(val);
      },
    },
  },

  computed: {
    classes() {
      return this.$style[`${this.theme}Theme`];
    },
  },
};
</script>

<style module>
.lightTheme {
  --color-title: var(--color-palette-cornflower-blue);
  --color-text: var(--color-palette-shark);
  --color-link: var(--color-palette-mantis);
  --color-border: var(--color-palette-ghost);
  --color-brand: var(--color-palette-cornflower-blue);
  --color-brand-accent: var(--color-palette-mantis);
}
.darkTheme {
  --color-title: var(--color-palette-white);
  --color-text: var(--color-palette-white);
  --color-link: var(--color-palette-mantis);
  --color-border: var(--color-palette-ghost);
  --color-brand: var(--color-palette-cornflower-blue);
  --color-brand-accent: var(--color-palette-mantis);
}
</style>
