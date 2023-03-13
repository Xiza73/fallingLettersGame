<template>
  <section class="bar">
    <div
      v-for="item in items"
      :key="item.id"
      class="item"
      :style="`animation-duration: ${seconds}s`"
      :class="{
        paused: gamePaused,
      }"
      @click="!gamePaused && handleClick(item)"
    >
      {{ item.name }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { getItem } from '../utils/functions';
import { getRandom } from '../utils/functions/index';
import { useGameStore } from '../store/game';
import { useRails } from '~~/store/rails';

const props = defineProps<{
  rail: Rail;
}>();

const gameStore = useGameStore();
const railStore = useRails();

const { setLetter } = gameStore;
const { deleteItem, setItemTimeout, clearItemsTimeouts } = railStore;

const gamePaused = computed(() => gameStore.gamePaused);

const { rail } = props;
const { id, seconds, initItem, items } = rail;

const pausedAt = ref<number>(0);
const resumePeriod = ref<number>(0);
const railTimeout = ref<NodeJS.Timeout>();

const putTimeout = computed(() => (seconds * 1000) / 7);
const putInterval = computed(() => (seconds * 1000) / 3);

const handleClick = (item: Letter) => {
  setLetter(item.name, id);
  deleteItem(rail.id, item.id);
};

const deleteItemAt = (item: Letter) => {
  setItemTimeout(
    rail.id,
    item.id,
    pausedAt.value
      ? seconds - (pausedAt.value - item.id - item.resumeCumulative) / 1000
      : seconds
  );
  if (item.wasResumed)
    item.resumeCumulative = item.resumeCumulative + resumePeriod.value;
  item.wasResumed = true;
};

const putItem = () => {
  setTimeout(() => {
    if (gamePaused.value) return;
    let item: Letter;
    do {
      item = getItem();
    } while (item?.name === items[items.length - 1]?.name);
    rail.items.push(item);
    deleteItemAt(item);
  }, getRandom(0, putTimeout.value));
};

let interval: NodeJS.Timer;
railTimeout.value = setTimeout(() => {
  putItem();
  interval = setInterval(putItem, putInterval.value);
}, initItem);

watch(
  () => gamePaused.value,
  (paused) => {
    if (paused) {
      pausedAt.value = Date.now();
      clearItemsTimeouts();
      clearInterval(interval);
      clearTimeout(railTimeout.value);
    } else {
      resumePeriod.value = Date.now() - pausedAt.value;
      items.forEach((item) => {
        deleteItemAt(item);
      });
      railTimeout.value = setTimeout(() => {
        putItem();
        interval = setInterval(putItem, putInterval.value);
      }, putTimeout.value);
      pausedAt.value = 0;
    }
  }
);

onBeforeUnmount(() => {
  try {
    clearItemsTimeouts();
    clearInterval(interval);
    clearTimeout(railTimeout.value);
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
  width: $box;
  height: calc(7 * $box);
  background-color: transparent;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: $box;
  width: 100%;
  border-radius: 8px;
  /* border: 1px solid #000; */
  cursor: pointer;
  position: absolute;
  animation: fall 4s linear forwards;
}

@keyframes fall {
  0% {
    top: 0;
  }
  100% {
    top: calc(6 * $box);
  }
}
.item:hover {
  background-color: #000;
  color: #fff;
}
.paused {
  animation-play-state: paused;
}
</style>
