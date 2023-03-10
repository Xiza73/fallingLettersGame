<template>
  <main class="game__content">
    <div v-if="!endGame" class="header">
      <CustomButton
        @click="stop"
        leftIcon="ion:return-up-back"
        buttonType="primary"
        size="sm"
      />
      <CustomButton
        @click="togglePause"
        :left-icon="gamePaused ? 'ph:play-fill' : 'clarity:pause-solid'"
        :button-type="gamePaused ? 'success' : 'danger'"
        size="sm"
        v-if="gameStarted"
      />
      <CustomButton
        :content="timeLeft.toString()"
        button-type="info"
        size="sm"
        class="no__clickeable"
        v-if="gameStarted"
        :disable="gamePaused"
      />
      <CustomButton
        @click="play"
        left-icon="ph:play-fill"
        button-type="success"
        size="sm"
        v-if="!gameStarted"
      />
      <CustomButton
        @click="restart"
        left-icon="material-symbols:replay"
        button-type="danger"
        size="sm"
        v-if="gameStarted"
      />
      <CustomButton
        @click="checkWord()"
        left-icon="material-symbols:all-match"
        button-type="success"
        size="sm"
        v-if="gameStarted"
        :disable="gamePaused"
      />
    </div>
    <section v-if="!endGame" class="game__container">
      <div class="game__info">
        <div class="game__info__title">
          <h1>{{ lastWord }}</h1>
        </div>
        <div class="game__info__score">
          <h2>{{ content.game.score }}: {{ score }}</h2>
        </div>
      </div>
      <div class="game__board">
        <div class="rain-content">
          <Rail v-for="rail in rails" :key="rail.id" :rail="rail" />
        </div>
        <div class="solve-content">
          <SolveBar />
        </div>
      </div>
    </section>

    <section v-if="endGame" class="end_game">
      <h1>{{ content.game.endGame }}</h1>
      <h2>{{ content.game.score }}: {{ score }}</h2>
      <button class="restart_button" @click="resetGame">
        {{ content.game.reset }}
      </button>
    </section>
    <ModalsContainer />
  </main>
</template>

<script setup lang="ts">
import { useGameStore } from '../store/game';
import { useSettings } from '../store/settings';
import { frontTransition } from '../utils/functions/transitionConfig';
import { PageMeta } from '#app';
import { ModalsContainer, useModal } from 'vue-final-modal';
import StopGameModal from '../components/Game/StopGameModal.vue';
import { useRails } from '../store/rails';

const gameStore = useGameStore();
const railStore = useRails();
const settings = useSettings();

const {
  startGame,
  stopGame,
  pauseGame,
  resumeGame,
  togglePause,
  resetGame,
  initWordArray,
  checkWord,
} = gameStore;

const { initRails } = railStore;

const gameStarted = computed(() => gameStore.gameStarted);
const gamePaused = computed(() => gameStore.gamePaused);
const timeLeft = computed(() => gameStore.timeLeft);
const lastWord = computed(() => gameStore.lastWord);
const endGame = computed(() => gameStore.endGame);
const score = computed(() => gameStore.score);

const rails = computed(() => railStore.rails);

const cols = computed(() => settings.columns);
const content = computed(() => settings.content);

initWordArray(cols.value);

const play = () => {
  initRails();
  startGame();
};

const { open: openStopModal, close } = useModal({
  component: StopGameModal,
  attrs: {
    onConfirm() {
      stopGame();
      close();
      useRouter().push('/');
    },
    onCancel() {
      resumeGame();
      close();
    },
  },
});

const { open: openRestartModal, close: closeRestartModal } = useModal({
  component: StopGameModal,
  attrs: {
    onConfirm() {
      resetGame();
      resumeGame();
      closeRestartModal();
    },
    onCancel() {
      resumeGame();
      closeRestartModal();
    },
  },
});

const stop = () => {
  if (gameStarted.value) {
    pauseGame();
    openStopModal();
  } else {
    useRouter().push('/');
  }
};

const restart = () => {
  pauseGame();
  openRestartModal();
};

definePageMeta({
  layout: 'blank',
  pageTransition: frontTransition as PageMeta,
  // layoutTransition: frontTransition as PageMeta,
});
</script>

<style lang="scss" scoped>
.game__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: auto;
    margin: 1rem 0 2rem;
  }
  .game__container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .game__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: auto;
      .game__info__title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $darker;
        h1 {
          font-size: 1.8rem;
          font-weight: 700;
          @media (min-width: 425px) {
            font-size: 2.1rem;
          }
          @media (min-width: 768px) {
            font-size: 2.6rem;
          }
        }
      }
      .game__info__score {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        padding: 0.2rem 2rem;
        border-radius: 10px 10px 0px 0px;
        color: darken($bprimary, 10%);
        background: linear-gradient(
          to top,
          saturate(lighten($bprimary, 2%), 35%) 0%,
          saturate(lighten($bprimary, 5%), 15%) 26%,
          $bprimary 100%
        );
        box-shadow: 2px 2px 9px 2px $info-shade;
        h2 {
          font-size: 1.8rem;
          font-weight: 700;
          @media (min-width: 425px) {
            font-size: 2.1rem;
          }
          @media (min-width: 768px) {
            font-size: 2.6rem;
          }
        }
      }
    }
    .game__board {
      display: grid;
      width: max-content;
      grid-template-rows: calc(7 * $box) $box;
      border-radius: 10px 0 10px 10px;
      color: darken($binfo, 10%);
      background: linear-gradient(
        to top,
        saturate(lighten($binfo, 2%), 35%) 0%,
        saturate(lighten($binfo, 15%), 15%) 80%,
        $binfo 100%
      );
      box-shadow: 2px 2px 9px 2px $info-shade;
      font-size: 1.8rem;
      font-weight: 700;
      @media (min-width: 425px) {
        font-size: 2.1rem;
      }
      @media (min-width: 768px) {
        font-size: 2.6rem;
      }
      .rain-content {
        display: flex;
        position: relative;
      }
      .solve-content {
        display: flex;
        position: relative;
        border-radius: 0 0 10px 10px;
        color: darken($bprimary, 10%);
        background: linear-gradient(
          to top,
          saturate(lighten($bprimary, 2%), 35%) 0%,
          saturate(lighten($bprimary, 5%), 15%) 26%,
          $bprimary 100%
        );
      }
    }
  }
}
.theme-dark {
  .game__container {
    .game__info {
      .game__info__score {
        color: darken($bprimary-dark, 10%);
        background: linear-gradient(
          to top,
          saturate(lighten($bprimary-dark, 2%), 35%) 0%,
          saturate(lighten($bprimary-dark, 5%), 15%) 26%,
          $bprimary-dark 100%
        );
      }
    }
    .game__board {
      color: darken($binfo-dark, 10%);
      background: linear-gradient(
        to top,
        saturate(lighten($binfo-dark, 2%), 35%) 0%,
        saturate(lighten($binfo-dark, 5%), 15%) 80%,
        $binfo-dark 100%
      );
      .solve-content {
        color: darken($bprimary-dark, 10%);
        background: linear-gradient(
          to top,
          saturate(lighten($bprimary-dark, 2%), 35%) 0%,
          saturate(lighten($bprimary-dark, 5%), 15%) 26%,
          $bprimary-dark 100%
        );
      }
    }
  }
}

.check_button {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: white;
  margin-bottom: 1rem;
  width: $box;
  height: $box;
  position: absolute;
  border: 1.5px solid black;
  border-radius: 10px;
  cursor: pointer;
  left: calc(100% + 2rem);
  background-color: green;
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
    width: $box;
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
