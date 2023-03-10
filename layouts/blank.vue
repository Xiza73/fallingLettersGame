<template>
  <section
    class="layout theme"
    :class="{
      'theme-dark': darkMode,
    }"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useSettings } from '../store/settings';

const settings = useSettings();
const darkMode = computed(() => settings.darkMode);
</script>

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 0;
  background-color: $secondary;
}
</style>
