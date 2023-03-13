import { defineStore } from 'pinia';
import {
  getRandomArray,
  getRangeSpeed,
  getSequenceArray,
} from '~~/utils/functions';
import { useGameStore } from './game';
import { useSettings } from './settings';

export const useRails = defineStore('rails', () => {
  const settings = useSettings();
  const game = useGameStore();

  const rails = ref<Rail[]>([]);

  const initRails = () => {
    rails.value = [];

    const initialTimeouts = getRandomArray(0, 1000, {
      length: settings.columns,
      unique: true,
    });
    const maxSpeed = getRangeSpeed(settings.speed);
    const speed = getSequenceArray(maxSpeed, {
      length: settings.columns,
      factor: -0.12,
    });

    initialTimeouts.sort(() => Math.random() - 0.5);
    speed.sort(() => Math.random() - 0.5);

    for (let i = 0; i < settings.columns; i++) {
      rails.value.push({
        id: i,
        initItem: initialTimeouts[i],
        seconds: speed[i],
        items: [],
      });
    }

    game.stopInterval();

    game.startInterval();
  };

  const deleteItem = (railId: number, itemId: number) => {
    const rail = rails.value.find((r) => r.id === railId);

    if (rail) {
      const item = rail.items.find((i) => i.id === itemId);

      if (item) {
        rail.items.splice(rail.items.indexOf(item), 1);
      }
    }
  };

  const cleanItems = () => {
    rails.value.forEach((rail) => {
      rail.items.forEach((item) => {
        item.timeout && clearTimeout(item.timeout);
      });
      rail.items.splice(0, rail.items.length);
    });
  };

  const setItemTimeout = (railId: number, itemId: number, seconds: number) => {
    const rail = rails.value.find((r) => r.id === railId);

    if (rail) {
      const item = rail.items.find((i) => i.id === itemId);

      if (item) {
        item.timeout = setTimeout(() => {
          if (game.gamePaused) return;
          deleteItem(rail.id, item.id);
        }, seconds * 1000);
      }
    }
  };

  const clearItemsTimeouts = () => {
    rails.value.forEach((rail) => {
      rail.items.forEach((item) => {
        item.timeout && clearTimeout(item.timeout);
      });
    });
  };

  const resetRails = () => {
    rails.value = [];
  };

  return {
    rails,
    initRails,
    deleteItem,
    cleanItems,
    setItemTimeout,
    clearItemsTimeouts,
    resetRails,
  };
});
