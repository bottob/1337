<template>
  <component :is="tag" :class="[ $style.root, $style[`${size}Size`] ]">
    <slot />
  </component>
</template>

<script>
export const validVals = { size: [ 's', 'm', 'l' ] };

export default {
  props: {
    size: {
      type: String,
      default: 'm',
      validator(val) {
        return validVals.size.includes(val);
      },
    },
    tag: {
      type: String,
      default: 'p',
    },
  },
};
</script>

<style module lang="scss">
.root {
  font-family: var(--font-family);
  color: var(--color-title);
  letter-spacing: -0.01em;
}

$_sizes: (
  s: --font-size-s,
  m: --font-size-m,
  l: --font-size-l,
);

@each $_key, $_val in $_sizes {
  .#{$_key}Size {
    font-size: var(#{$_val});
  }
}
</style>
