<template>
  <main>
    <div class="option_buttons">
      <NuxtLink to="/config">
        <CustomButton
          :content="content.main.menu"
          rigthIcon="material-symbols:menu"
          buttonType="info"
          size="sm"
        />
      </NuxtLink>
      <CustomButton
        :content="content.main.tutorial"
        rigthIcon="material-symbols:how-to-reg"
        buttonType="info"
        size="sm"
        @click="openModal"
      />
    </div>
    <div class="cover">
      <div class="img"></div>
    </div>
    <NuxtLink to="/game">
      <CustomButton
        :content="content.main.play"
        buttonType="primary"
        size="lg"
      />
    </NuxtLink>
    <ModalsContainer />
  </main>
</template>

<script setup lang="ts">
import { PageMeta } from '#app';
import { frontTransition } from '../utils/functions/transitionConfig';
import { ModalsContainer, useModal } from 'vue-final-modal';
import CustomModal from '../components/CustomModal.vue';
import { useSettings } from '../store/settings';

const settings = useSettings();
const content = computed(() => settings.content);

const { open: openModal, close } = useModal({
  component: CustomModal,
  attrs: {
    onConfirm() {
      close();
    },
    onCancel() {
      close();
    },
    title: computed(() => content.value.tutorial.title),
    content: computed(() => content.value.tutorial.content.split('|')),
    confirm: computed(() => content.value.tutorial.button),
  },
});

definePageMeta({
  pageTransition: frontTransition as PageMeta,
  // layoutTransition: frontTransition as PageMeta,
});
</script>

<style scoped lang="scss">
main {
  display: grid;
  grid-template-rows: auto 1fr auto;
  place-items: center;
  height: 100%;
  .option_buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-gap: 2rem;
    padding: 0 2rem;
    width: 100%;
    margin: 0 auto;
    .button {
      width: 100%;
    }
  }
  .cover {
    display: grid;
    place-items: center;
    width: 100%;
    .img {
      background-image: url('../assets/logo_light.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      border-radius: 1rem;
      width: 250px;
      height: 250px;
      max-width: 400px;
    }
  }
}

.theme-dark {
  main {
    .cover {
      .img {
        background-image: url('../assets/logo_dark.svg');
      }
    }
  }
}
</style>
