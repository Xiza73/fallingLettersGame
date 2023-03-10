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

const dictionary = checkWord('es');
// checkWord in spanish: if input is 'hola', validate: 'hola', 'hóla', 'holá', 'hólá'; if input is 'no', validate: 'no', 'nó', 'ñó', 'ño'
export const validateWord = async (word: string): Promise<boolean> =>
  await dictionary.check(word.toLowerCase());

export const getFromStorage = (variable: string): string | false | null =>
  process.client && localStorage.getItem(variable);

export const setToStorage = (variable: string, value: string): false | void =>
  process.client && localStorage.setItem(variable, value);
