import { Ref } from 'nuxt/dist/app/compat/capi';
import { defineStore } from 'pinia';
import { getFromStorage, setToStorage } from '~~/utils/functions';
import { english, spanish } from '../utils/constants/language';
import {
  MIN_COLUMN,
  MAX_COLUMN,
  MIN_SPEED,
  MAX_SPEED,
} from '../utils/constants/index';

export const useSettings = defineStore('settings', () => {
  const darkMode: Ref<boolean> = ref(true);
  const language: Ref<Language> = ref('en');
  const content: Ref<LanguageStrings> = ref(english);
  const columns: Ref<number> = ref(6);
  const speed: Ref<number> = ref(3);
  const grid: Ref<boolean> = ref(true);
  const autocomplete: Ref<boolean> = ref(false);
  const lifes: Ref<number> = ref(3);
  const gameMode: Ref<GameMode> = ref('classic');

  const toggleLanguage = () => {
    language.value = language.value === 'en' ? 'es' : 'en';
    content.value = language.value === 'en' ? english : spanish;
  };

  const setColumns = (value: number) => {
    columns.value = value;
  };

  const decreaseColumns = () => {
    if (columns.value > MIN_COLUMN) {
      columns.value--;
    }
  };

  const increaseColumns = () => {
    if (columns.value < MAX_COLUMN) {
      columns.value++;
    }
  };

  const setSpeed = (value: number) => {
    speed.value = value;
  };

  const decreaseSpeed = () => {
    if (speed.value > MIN_SPEED) {
      speed.value--;
    }
  };

  const increaseSpeed = () => {
    if (speed.value < MAX_SPEED) {
      speed.value++;
    }
  };

  const toggleGrid = () => {
    grid.value = !grid.value;
  };

  const toggleAutocomplete = () => {
    autocomplete.value = !autocomplete.value;
  };

  const setLifes = (value: number) => {
    lifes.value = value;
  };

  const setGameMode = (value: GameMode) => {
    gameMode.value = value;
  };

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
  };

  watch(
    [
      darkMode,
      language,
      columns,
      speed,
      grid,
      autocomplete,
      lifes,
      gameMode,
    ],
    ([
      darkMode,
      language,
      columns,
      speed,
      grid,
      autocomplete,
      lifes,
      gameMode,
    ]) => {
      setToStorage('darkMode', darkMode.toString());
      setToStorage('language', language);
      setToStorage('columns', columns.toString());
      setToStorage('speed', speed.toString());
      setToStorage('grid', grid.toString());
      setToStorage('autocomplete', autocomplete.toString());
      setToStorage('lifes', lifes.toString());
      setToStorage('gameMode', gameMode);
    },
    { deep: true }
  );

  const setInitialConfig = () => {
    darkMode.value = getFromStorage('darkMode') === 'true' ? true : false;
    language.value = (getFromStorage('language') as Language) || 'en';
    content.value = language.value === 'en' ? english : spanish;
    columns.value = parseInt(getFromStorage('columns') || '5');
    speed.value = parseInt(getFromStorage('speed') || '3');
    grid.value = getFromStorage('grid') === 'true' ? true : false;
    autocomplete.value =
      getFromStorage('autocomplete') === 'true' ? true : false;
    lifes.value = parseInt(getFromStorage('lifes') || '3');
    gameMode.value = (getFromStorage('gameMode') as GameMode) || 'classic';
  };

  return {
    darkMode,
    language,
    content,
    columns,
    speed,
    grid,
    autocomplete,
    lifes,
    gameMode,
    setInitialConfig,
    toggleLanguage,
    setColumns,
    decreaseColumns,
    increaseColumns,
    setSpeed,
    decreaseSpeed,
    increaseSpeed,
    toggleGrid,
    toggleAutocomplete,
    setLifes,
    setGameMode,
    toggleDarkMode,
  };
});
