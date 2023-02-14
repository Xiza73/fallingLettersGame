<template>
  <section class="bar" :style="`width: ${width}`">
    <div
      v-for="item in items"
      :key="item.id"
      class="item"
      :style="`animation-duration: ${seconds}s`"
      @click="handleClick(item)"
    >
      {{ item.name }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { Letter } from '../utils/types';
import { getItem } from '../utils/functions';
import { getRandom } from '../utils/functions/index';
import { useGameStore } from '../store/game';

const props = defineProps<{
  id: string;
  width: string;
  timeout: number;
  seconds: number;
}>();

const gameStore = useGameStore();
const { setLetter } = gameStore;

const { id, timeout, seconds } = props;

const items = ref<Letter[]>([]);

const handleClick = (item: Letter) => {
  setLetter(item.name, parseInt(id));
  items.value = items.value.filter((i) => i.id !== item.id);
};

const putItem = () => {
  setTimeout(() => {
    let item: Letter;
    do {
      item = getItem();
    } while (item?.name === items.value[items.value.length - 1]?.name);
    items.value.push(item);
    setTimeout(() => {
      items.value = items.value.filter((i) => i.id !== item.id);
    }, seconds * 1000);
  }, getRandom(0, 1000));
};

let interval: NodeJS.Timer;
setTimeout(() => {
  interval = setInterval(putItem, 2000);
}, timeout);

onBeforeUnmount(() => {
  try {
    clearInterval(interval);
  } catch (error) {}
});
</script>

<style scoped lang="scss">
.bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: $box_lg;
  height: calc(7 * $box_lg);
  background-color: transparent;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: $box_lg;
  width: 100%;
  border-radius: 8px;
  /* border: 1px solid #000; */
  cursor: pointer;
  position: absolute;
  animation: fall 10s linear forwards;
}

@keyframes fall {
  0% {
    top: 0;
  }
  100% {
    top: calc(6 * $box_lg);
  }
}

.item:hover {
  background-color: #000;
  color: #fff;
}
</style>
