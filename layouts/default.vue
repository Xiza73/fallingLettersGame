<template>
  <section
    class="layout theme"
    :class="{
      'theme-dark': darkMode,
    }"
  >
    <LayoutHeader title="Falling Letters" />
    <slot />
    <LayoutFooter />
  </section>
</template>

<script setup lang="ts">
import { useSettings } from '../store/settings';

const settings = useSettings();
const darkMode = computed(() => settings.darkMode);
</script>

<style scoped lang="scss">
.layout {
  grid-template-rows: auto 1fr auto;
}
</style>
