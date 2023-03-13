import { validateWordEs, validateWordEn } from './../utils/functions/index';
import { Ref } from 'nuxt/dist/app/compat/capi';
import { defineStore } from 'pinia';
import { TIME_LIMIT } from '~~/utils/constants';
import { useRails } from './rails';
import { useSettings } from './settings';

export const useGameStore = defineStore('game', () => {
  const settings = useSettings();
  const railStore = useRails();

  const gameStarted: Ref<boolean> = ref(false);
  const gamePaused: Ref<boolean> = ref(false);
  const gameStopped: Ref<boolean> = ref(false);
  const timeLeft: Ref<number> = ref(0);
  const endGame: Ref<boolean> = ref(false);
  const score: Ref<number> = ref(0);
  const word: Ref<string> = ref('');
  const words: Ref<Word[]> = ref([]);
  const lastWord: Ref<string> = ref('');
  const wordArray: Ref<string[]> = ref([]);
  const counterInterval: Ref<NodeJS.Timeout | null> = ref(null);

  const startGame = () => {
    gameStarted.value = true;
    gamePaused.value = false;
    gameStopped.value = false;
    initWordArray();
    timeLeft.value = TIME_LIMIT;
    endGame.value = false;
    score.value = 0;
  };

  const stopGame = () => {
    gameStopped.value = true;
  };

  const stopInterval = () => {
    if (counterInterval.value) {
      clearInterval(counterInterval.value);
      counterInterval.value = null;
    }
  };

  const startInterval = () => {
    if (!counterInterval.value) {
      counterInterval.value = setInterval(decreaseTime, 1000);
    }
  };

  const pauseGame = () => {
    gamePaused.value = true;
    stopInterval();
  };

  const resumeGame = () => {
    gamePaused.value = false;
    startInterval();
  };

  const togglePause = () => {
    gamePaused.value = !gamePaused.value;
    if (gamePaused.value) {
      stopInterval();
    } else {
      startInterval();
    }
  };

  const resetGame = () => {
    railStore.cleanItems();
    gameStarted.value = true;
    timeLeft.value = TIME_LIMIT;
    endGame.value = false;
    score.value = 0;
    words.value = [];
    word.value = '';
    lastWord.value = '';
    initWordArray();
  };

  const decreaseTime = () => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      endGame.value = true;
    }
  };

  const setLetter = (letter: string, index: number) => {
    wordArray.value[index] = letter;
  };

  const addWord = (word: string) => {
    const points = word.length * (word.length - 1) * 10;
    words.value.push({
      name: word,
      points,
    });
    score.value += points;
  };

  const initWordArray = () => {
    wordArray.value = Array(settings.columns).fill('');
  };

  const checkWord = async (newWord?: string) => {
    const insertWord = newWord || word.value;
    const valid =
      settings.language === 'es'
        ? await validateWordEs(insertWord)
        : await validateWordEn(insertWord);
    if (valid) {
      if (words.value.find((item) => item.name === insertWord)) return;
      addWord(insertWord);
      initWordArray();
    }
  };

  watch(
    wordArray,
    (newWordArray) => {
      word.value = newWordArray.join('');
    },
    { deep: true }
  );

  watch(word, async (newWord) => {
    if (!newWord) return;
    if (!settings.autocomplete) return;
    await checkWord(newWord);
  });

  watch(
    words,
    (newWords) => {
      if (newWords.length) {
        lastWord.value = newWords[newWords.length - 1].name;
      }
    },
    { deep: true }
  );

  watch(
    gameStopped,
    (gameWasStopped) => {
      if (gameWasStopped) {
        gameStarted.value = false;
        gamePaused.value = false;
        timeLeft.value = 0;
        endGame.value = false;
        score.value = 0;
        words.value = [];
        word.value = '';
        lastWord.value = '';
        wordArray.value = [];
        railStore.resetRails();
      }
    },
    { deep: true }
  );

  return {
    gameStarted,
    gamePaused,
    gameStopped,
    timeLeft,
    endGame,
    score,
    word,
    words,
    wordArray,
    lastWord,
    counterInterval,
    startGame,
    stopGame,
    stopInterval,
    startInterval,
    pauseGame,
    resumeGame,
    togglePause,
    resetGame,
    decreaseTime,
    setLetter,
    initWordArray,
    checkWord,
  };
});
