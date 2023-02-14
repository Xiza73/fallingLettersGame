<template>
  <div class="header">
    <h1>Falling Letters</h1>
    <div v-if="!endGame" class="header__buttons">
      <button v-if="!gameStarted" class="header__button" @click="play">
        Iniciar
      </button>
      <button v-if="false" class="header__button" @click="togglePause">
        {{ gamePaused ? 'Reanudar' : 'Pausar' }}
      </button>
      <button v-if="gameStarted" class="header__button" @click="restart">
        Reiniciar
      </button>
    </div>
  </div>
  <section v-if="!endGame" class="container">
    <div class="rain-content">
      <div class="add_remove_cols">
        <button
          @click="
            setCols(cols - 1);
            initRails();
          "
          class="remove_button"
        >
          -
        </button>
        <span>{{ cols }}</span>
        <button
          @click="
            setCols(cols + 1);
            initRails();
          "
          class="add_button"
        >
          +
        </button>
      </div>
      <Rail
        v-for="rail in rails"
        :key="rail.id"
        :id="rail.id"
        :width="boxLg"
        :timeout="rail.timeout"
        :seconds="rail.seconds"
      />
      <div v-if="timeLeft" class="time_left">
        <span>{{ timeLeft }}</span>
      </div>
    </div>
    <div class="solve-content">
      <button
        class="auto_complete_button"
        @click="toggleAutoComplete"
        :style="
          autoComplete
            ? 'background-color: #00ff00; color: #000'
            : 'background-color: #ff0000; color: #fff'
        "
      >
        Auto completado: {{ autoComplete ? 'Sí' : 'No' }}
      </button>
      <SolveBar :height="boxLg" :cols="cols" />
      <button class="check_button" @click="checkWord()">Comprobar</button>
    </div>
  </section>
  <section v-if="!endGame" class="words">
    <div v-for="word in words" :key="word.name + words.indexOf(word)">
      {{ word.name }} - {{ word.points }}
    </div>
  </section>

  <section v-if="endGame" class="end_game">
    <h1>¡Juego Terminado!</h1>
    <h2>Puntuación: {{ score }}</h2>
    <button class="restart_button" @click="restart">Reiniciar</button>
  </section>
</template>

<script setup lang="ts">
import { boxLg } from '../utils/constants';
import { useGameStore } from '../store/game';
import { getRandomArray } from '../utils/functions/index';

definePageMeta({
  layout: 'blank',
});

const gameStore = useGameStore();
const {
  startGame,
  togglePause,
  resetGame,
  decreaseTime,
  initWordArray,
  toggleAutoComplete,
  checkWord,
  setCols,
} = gameStore;
const gameStarted = computed(() => gameStore.gameStarted);
const gamePaused = computed(() => gameStore.gamePaused);
const timeLeft = computed(() => gameStore.timeLeft);
const words = computed(() => gameStore.words);
const autoComplete = computed(() => gameStore.autoComplete);
const cols = computed(() => gameStore.cols);
const endGame = computed(() => gameStore.endGame);
const score = computed(() => gameStore.score);

initWordArray(cols.value);

const rails = ref<
  {
    id: string;
    width: string;
    timeout: number;
    seconds: number;
  }[]
>([]);

const counterInterval = ref<NodeJS.Timeout | null>(null);

const initRails = () => {
  rails.value = [];

  const initialTimeouts = getRandomArray(0, 10, {
    length: cols.value,
    unique: true,
    factor: 100,
  });
  const seconds = getRandomArray(23, 30, {
    length: cols.value,
    unique: true,
    factor: 0.2,
  });

  initialTimeouts.sort(() => Math.random() - 0.5);
  seconds.sort(() => Math.random() - 0.5);

  for (let i = 0; i < cols.value; i++) {
    rails.value.push({
      id: i.toString(),
      width: boxLg,
      timeout: initialTimeouts[i],
      seconds: seconds[i],
    });
  }

  if (counterInterval.value) {
    clearInterval(counterInterval.value);
  }

  counterInterval.value = setInterval(() => {
    decreaseTime();
  }, 1000);
};

const restart = () => {
  initRails();
  resetGame();
  startGame();
};

const play = () => {
  initRails();
  startGame();
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-rows: calc(7 * $box_lg) $box_lg;
  border: 2px solid red;
  border-radius: 10px;
  width: auto;
}
.rain-content {
  display: flex;
  position: relative;
  .add_remove_cols {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: calc(100% + 2rem);
    width: min-content;
    height: min-content;
    background-color: white;
    border-radius: 10px;
    button {
      font-size: 2rem;
      font-weight: 700;
      width: 80px;
      height: 40px;
      color: white;
      border: none;
      cursor: pointer;
    }
    .add_button {
      border-radius: 0 10px 10px 0;
      background-color: green;
    }
    .remove_button {
      border-radius: 10px 0 0 10px;
      background-color: red;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.7rem;
      font-weight: 500;
      width: 80px;
      height: 40px;
      color: black;
    }
  }
  .time_left {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: calc(100% + 2rem);
    width: min-content;
    height: min-content;
    background-color: white;
    border-radius: 10px;
    span {
      font-size: 2rem;
      font-weight: 700;
      color: black;
    }
  }
}
.solve-content {
  display: flex;
  position: relative;
  background-color: rgb(247, 221, 221);
  border-radius: 0 0 10px 10px;
}

.word {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  width: 100%;
  height: 20px;
  background-color: yellow;
}

.words {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;
  background-color: rgb(247, 221, 221);
  border-radius: 10px;
  margin-left: 1rem;
}

.auto_complete_button {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1rem;
  width: $box_lg;
  height: $box_lg;
  position: absolute;
  border: 1.5px solid black;
  border-radius: 10px;
  cursor: pointer;
  right: calc(100% + 2rem);
}

.check_button {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: white;
  margin-bottom: 1rem;
  width: $box_lg;
  height: $box_lg;
  position: absolute;
  border: 1.5px solid black;
  border-radius: 10px;
  cursor: pointer;
  left: calc(100% + 2rem);
  background-color: green;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: black;
  }
  .header__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 1rem;
    button {
      font-size: 1.5rem;
      font-weight: 500;
      text-align: center;
      color: white;
      margin-bottom: 1rem;
      width: $box_lg;
      height: 60px;
      position: relative;
      border: 1.5px solid black;
      border-radius: 15px;
      cursor: pointer;
      margin-right: 1rem;
      background-color: green;
    }
  }
}

.end_game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: white;
  }
  .restart_button {
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    color: white;
    margin: 1rem 0;
    width: $box_lg;
    height: 40px;
    position: relative;
    border: 1.5px solid black;
    border-radius: 15px;
    cursor: pointer;
    margin-right: 1rem;
    background-color: green;
  }
}
</style>
