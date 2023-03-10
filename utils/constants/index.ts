const probLetters = {
  A: 9,
  B: 3,
  C: 3,
  D: 3,
  E: 15,
  F: 3,
  G: 3,
  H: 3,
  I: 9,
  J: 1,
  K: 1,
  L: 5,
  M: 3,
  N: 6,
  O: 9,
  P: 3,
  Q: 1,
  R: 6,
  S: 6,
  T: 6,
  U: 6,
  V: 3,
  W: 1,
  X: 1,
  Y: 1,
  Z: 1,
};

type ProbLetters = keyof typeof probLetters;

export const letters = Object.keys(probLetters).reduce(
  (acc: string[], letter: string) => [
    ...acc,
    ...Array(probLetters[letter as ProbLetters]).fill(letter),
  ],
  []
);

export const MIN_COLUMN = 3;
export const MAX_COLUMN = 6;
export const MIN_SPEED = 1;
export const MAX_SPEED = 5;
export const MIN_LIFES = 1;
export const MAX_LIFES = 5;

export const TIME_LIMIT = 60;