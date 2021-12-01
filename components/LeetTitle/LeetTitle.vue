<template>
  <component :is="tag" :class="[ $style.root, $style[`${size}Size`] ]">
    <slot />
  </component>
</template>

<script>
export const validVals = { size: [ 'xs', 's', 'm', 'l', 'xl' ] };

export default {
  props: {
    /** Visual size of the title */
    size: {
      type: String,
      default: 'm',
      validator(val) {
        return validVals.size.includes(val);
      },
    },
    /** HTML tag to be rendered as */
    tag: {
      type: String,
      default: 'p',
    },
  },
};
</script>

<style module lang="scss">
@use '@/assets/styles/media-queries' as mq;

.root {
  font-family: var(--font-family);
  color: var(--color-title);
  letter-spacing: -0.01em;
}
.xlSize {
  font-size: var(--font-size-xl);
}
.lSize {
  font-size: var(--font-size-l);
}
.mSize {
  font-size: var(--font-size-m);
}
.sSize {
  font-size: var(--font-size-s);
}
.xsSize {
  font-size: var(--font-size-xs);
}

@include mq.landscape {
  .xlSize {
    font-size: clamp(
      calc(var(--font-size-m) + var(--font-size-l) / 5),
      6.7vw,
      var(--font-size-xl)
    );
  }
  .lSize {
    font-size: clamp(
      calc(var(--font-size-s) + var(--font-size-m) / 5),
      4.2vw,
      var(--font-size-l)
    );
  }
}
</style>
