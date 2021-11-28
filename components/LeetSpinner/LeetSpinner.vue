<template>
  <div :class="$style.spinner" />
</template>

<style module lang="scss">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.spinner {
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  border: var(--space-xxs) solid var(--color-brand);
  border-right-color: transparent;
  animation: rotate 4s infinite linear;
  // center child
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    display: block;
    width: 80%;
    height: 80%;
    border-radius: 9999px;
    border: var(--space-xxs) solid var(--color-brand-accent);
    border-right-color: transparent;
    animation: rotate 3s infinite linear;
  }
}
</style>
