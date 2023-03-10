<template>
  <main>
    <div class="returned_buttons">
      <NuxtLink to="/">
        <CustomButton
          leftIcon="ion:return-up-back"
          buttonType="info"
          size="sm"
        />
      </NuxtLink>
      <NuxtLink to="/game">
        <CustomButton rigthIcon="ion:play" buttonType="info" size="sm" />
      </NuxtLink>
    </div>
    <div class="config">
      <div class="config__title">
        <h1>{{ content.options.title }}</h1>
      </div>
      <div class="config__options">
        <div class="config__options__option">
          <CustomButton
            leftIcon="ion:minus"
            buttonType="danger"
            size="sm"
            style="visibility: hidden"
          />
          <h2>{{ content.options.language.title }}: {{ languageSelected }}</h2>
          <CustomButton
            :rigthIcon="
              languageSelected === 'es'
                ? 'noto-v1:flag-for-flag-spain'
                : 'noto-v1:flag-for-flag-united-states'
            "
            buttonType="primary"
            size="sm"
            @click="toggleLanguage"
          />
        </div>
        <div class="config__options__option">
          <CustomButton
            leftIcon="ion:minus"
            buttonType="danger"
            size="sm"
            @click="decreaseColumns"
          />
          <h2>{{ content.options.columns }}: {{ columnsSelected }}</h2>
          <CustomButton
            rigthIcon="ion:plus"
            buttonType="success"
            size="sm"
            @click="increaseColumns"
          />
        </div>
        <div class="config__options__option">
          <CustomButton
            leftIcon="ion:minus"
            buttonType="danger"
            size="sm"
            @click="decreaseSpeed"
          />
          <h2>{{ content.options.speed }}: {{ speedSelected }}</h2>
          <CustomButton
            rigthIcon="ion:plus"
            buttonType="success"
            size="sm"
            @click="increaseSpeed"
          />
        </div>

        <div class="config__options__option">
          <CustomButton
            leftIcon="ion:minus"
            buttonType="danger"
            size="sm"
            style="visibility: hidden"
          />
          <h2>
            {{ content.options.darkMode.title }}:
            {{
              modeSelected
                ? content.options.darkMode.options.dark
                : content.options.darkMode.options.light
            }}
          </h2>
          <CustomButton
            :rigthIcon="modeSelected ? 'ion:moon' : 'ion:sunny'"
            buttonType="primary"
            size="sm"
            @click="toggleDarkMode"
          />
        </div>
        <div class="config__options__option">
          <CustomButton
            leftIcon="ion:minus"
            buttonType="danger"
            size="sm"
            style="visibility: hidden"
          />
          <h2>
            {{ content.options.grid.title }}:
            {{
              gridOn
                ? content.options.grid.options.show
                : content.options.grid.options.hide
            }}
          </h2>
          <CustomButton
            :rigthIcon="gridOn ? 'ion:md-eye' : 'ion:md-eye-off'"
            buttonType="primary"
            size="sm"
            @click="toggleGrid"
          />
        </div>
        <!-- <div class="config__options__option">
          <CustomButton
            leftIcon="ion:minus"
            buttonType="danger"
            size="sm"
            style="visibility: hidden"
          />
          <h2>
            {{ content.options.autocomplete.title }}:
            {{
              autocompleteOn
                ? content.options.autocomplete.options.yes
                : content.options.autocomplete.options.no
            }}
          </h2>
          <CustomButton
            :rigthIcon="
              autocompleteOn ? 'ion:checkmark-round' : 'ion:close-round'
            "
            buttonType="primary"
            size="sm"
            @click="toggleAutocomplete"
          />
        </div> -->
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { PageMeta } from '#app';
import { frontTransition } from '../utils/functions/transitionConfig';
import { useSettings } from '../store/settings';

const settings = useSettings();
const {
  toggleDarkMode,
  toggleLanguage,
  decreaseColumns,
  increaseColumns,
  toggleGrid,
  decreaseSpeed,
  increaseSpeed,
} = settings;
const languageSelected = computed(() => settings.language);
const columnsSelected = computed(() => settings.columns);
const speedSelected = computed(() => settings.speed);
const modeSelected = computed(() => settings.darkMode);
const content = computed(() => settings.content);
const gridOn = computed(() => settings.grid);

definePageMeta({
  pageTransition: frontTransition as PageMeta,
});
</script>

<style scoped lang="scss">
main {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  height: 100%;
  .returned_buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 2rem;
    .button {
      width: max-content;
    }
  }
  .config {
    display: grid;
    grid-template-rows: auto 1fr;
    place-items: center;
    width: 100%;
    max-width: 490px;
    padding: 2rem;
    margin-bottom: auto;
    text-shadow: 0.03em -0.06em 0 darken($blighter, 20%),
      0 1px 1px lighten($blighter, 6%);
    color: darken($bdarker, 10%);
    @media (min-width: 768px) {
      max-width: 600px;
    }
    .config__title {
      display: grid;
      place-items: center;
      width: 100%;
      margin-bottom: 3rem;
      h1 {
        font-size: 2.2rem;
        font-weight: 600;
      }
    }
    .config__options {
      display: flex;
      flex-direction: column;
      padding: 0 2rem;
      width: 100%;
      margin: 0 auto;
      .config__options__option {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-gap: 1rem;
        place-items: center;
        width: 100%;
        margin-bottom: 1.2rem;
        h2 {
          font-size: 1.8rem;
          font-weight: 500;
          padding-bottom: 1rem;
        }
      }
    }
  }
}

.theme-dark .config {
  text-shadow: 0.03em -0.06em 0 darken($bdarker, 20%),
    0 1px 1px lighten($bdarker, 6%);
  color: darken($blighter, 10%);
}
</style>
