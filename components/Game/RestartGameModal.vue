<template>
  <VueFinalModal
    class="modal__container"
    content-class="restart__game__modal"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    :click-to-close="false"
    :esc-to-close="false"
  >
    <p>{{ content.game.stopMessage }}</p>
    <button @click="emit('confirm')">{{ content.general.yes }}</button>
    <button @click="emit('cancel')">{{ content.general.no }}</button>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useSettings } from '~/store/settings';

const settings = useSettings();

const content = computed(() => settings.content);

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<style lang="scss">
.restart__game__modal {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 80%;
  background: #fff;
  border-radius: 0.5rem;
  pointer-events: all;
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
