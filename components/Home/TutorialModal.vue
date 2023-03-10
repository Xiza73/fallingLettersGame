<template>
  <VueFinalModal
    class="modal__container"
    content-class="tutorial-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    :click-to-close="false"
    :esc-to-close="false"
  >
    <h1>{{ content.tutorial.title }}</h1>
    <p v-for="sentence in content.tutorial.content.split('|')" :key="sentence">
      {{ sentence }}
    </p>
    <button @click="emit('confirm')">{{ content.tutorial.button }}</button>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useSettings } from '~/store/settings';

const settings = useSettings();

const content = computed(() => settings.content);

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();
</script>

<style lang="scss">
.tutorial-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 80%;
  background: #fff;
  border-radius: 0.5rem;
  @media (min-width: 768px) {
    max-width: 500px;
  }
  > * + * {
    margin: 0.5rem 0;
  }
  h1 {
    font-size: 5rem;
  }
  button {
    margin: 0.25rem 0 0 auto;
    padding: 0 8px;
    border: 1px solid;
    border-radius: 0.5rem;
  }
}
</style>
