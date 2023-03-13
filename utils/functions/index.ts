import { letters } from '../constants';
import { checkWord } from './check-word';

export const getLetter = () =>
  letters[Math.floor(Math.random() * letters.length)];

export const getItem = (): Letter => ({
  id: Date.now(),
  name: getLetter(),
  wasResumed: false,
  resumeCumulative: 0,
});

export const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomArray = (
  min: number,
  max: number,
  options: {
    length: number;
    unique?: boolean;
    factor?: number;
  } = { length: 1 }
) => {
  const { length, unique, factor = 1 } = options;
  const array: number[] = [];
  for (let i = 0; i < length; i++) {
    let random = getRandom(min, max);
    if (unique) {
      while (array.includes(random)) {
        random = getRandom(min, max);
      }
    }
    array.push(random * factor);
  }
  return array;
};

export const getSequenceArray = (
  pivot: number,
  options: {
    length: number;
    factor?: number;
  } = { length: 1 }
) => {
  const { length, factor = 1 } = options;
  const array: number[] = [];
  for (let i = 0; i < length; i++) {
    array.push(pivot + i * factor);
  }
  return array;
};

export const getRangeSpeed = (speed: number) => 6 - (speed - 1);

const esDictionary = checkWord('es');
const enDictionary = checkWord('en');

export const validateWordEs = async (word: string): Promise<boolean> =>
  await esDictionary.check(word.toLowerCase());

export const validateWordEn = async (word: string): Promise<boolean> =>
  await enDictionary.check(word.toLowerCase());

export const getFromStorage = (variable: string): string | false | null =>
  process.client && localStorage.getItem(variable);

export const setToStorage = (variable: string, value: string): false | void =>
  process.client && localStorage.setItem(variable, value);
