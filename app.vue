<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'page-transition',
        mode: 'out-in',
      }"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useSettings } from './store/settings';

import { useTransitionComposable } from './composables/transition-composable';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const { toggleTransitionComplete } = useTransitionComposable();

const { setInitialConfig } = useSettings();

onMounted(() => {
  toggleTransitionComplete(false);
  setInitialConfig();
});
</script>
