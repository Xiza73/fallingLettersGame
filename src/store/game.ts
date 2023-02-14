import { Ref } from 'nuxt/dist/app/compat/capi';
import { defineStore } from 'pinia';
import { validateWord } from '../utils/functions';

export const useGameStore = defineStore('game', () => {
  const gameStarted: Ref<boolean> = ref(false);
  const gamePaused: Ref<boolean> = ref(false);
  const timeLeft: Ref<number> = ref(0);
  const endGame: Ref<boolean> = ref(false);
  const score: Ref<number> = ref(0);
  const word: Ref<string> = ref('asd');
  const words: Ref<
    {
      name: string;
      points: number;
    }[]
  > = ref([]);
  const wordArray: Ref<string[]> = ref([]);
  const autoComplete: Ref<boolean> = ref(false);
  const cols: Ref<number> = ref(6);

  const startGame = () => {
    gameStarted.value = true;
    gamePaused.value = false;
    initWordArray(cols.value);
    timeLeft.value = 60;
    endGame.value = false;
    score.value = 0;
  };

  const togglePause = () => {
    gamePaused.value = !gamePaused.value;
  };

  const resetGame = () => {
    gameStarted.value = false;
    gamePaused.value = false;
    words.value = [];
    initWordArray(cols.value);
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

  const initWordArray = (length: number) => {
    wordArray.value = Array(length).fill('');
  };

  const toggleAutoComplete = () => {
    autoComplete.value = !autoComplete.value;
  };

  const checkWord = async (newWord?: string) => {
    const insertWord = newWord || word.value;
    const valid = await validateWord(insertWord);
    if (valid) {
      if (words.value.find((item) => item.name === insertWord)) return;
      addWord(insertWord);
      initWordArray(wordArray.value.length);
    }
  };

  const setCols = (newCols: number) => {
    if (newCols < 2 || newCols > 10) return;
    cols.value = newCols;
    initWordArray(newCols);
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
    if (!autoComplete.value) return;
    await checkWord(newWord);
  });

  return {
    gameStarted,
    gamePaused,
    timeLeft,
    endGame,
    score,
    word,
    words,
    wordArray,
    autoComplete,
    cols,
    startGame,
    togglePause,
    resetGame,
    decreaseTime,
    setLetter,
    initWordArray,
    toggleAutoComplete,
    checkWord,
    setCols,
  };
});
