<template>
  <section
    class="bar"
    :style="`height: ${height}; width: calc(${cols} * ${height})`"
  >
    <div
      v-for="(item, index) in wordArray"
      :key="index"
      class="item"
      @click="handleClick(index)"
    >
      {{ item }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGameStore } from '../store/game';

defineProps<{
  height: string;
  cols: number;
}>();

const gameStore = useGameStore();
const { setLetter } = gameStore;

const wordArray = computed(() => gameStore.wordArray);

const handleClick = (index: number) => {
  setLetter('', index);
};
</script>

<style scoped lang="scss">
.bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: $box_lg;
  background-color: transparent;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: $box_lg;
  border-radius: 8px;
  cursor: pointer;
}

.item:hover {
  background-color: #000;
  color: #fff;
}
</style>
