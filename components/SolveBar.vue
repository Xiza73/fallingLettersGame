<template>
  <section class="bar">
    <div
      v-for="(item, index) in wordArray"
      :key="index"
      class="item"
      :class="{
        grid: grid,
      }"
      @click="!gamePaused && handleClick(index)"
    >
      {{ item }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGameStore } from '../store/game';
import { useSettings } from '../store/settings';

const gameStore = useGameStore();
const settings = useSettings();

const { setLetter } = gameStore;

const wordArray = computed(() => gameStore.wordArray);
const gamePaused = computed(() => gameStore.gamePaused);

const grid = computed(() => settings.grid);

const handleClick = (index: number) => {
  setLetter('', index);
};
</script>

<style scoped lang="scss">
.bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: $box;
  background-color: transparent;
  @include grid($info);
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: $box;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
}
</style>
