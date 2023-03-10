interface Letter {
  id: number;
  name: string;
  timeout?: NodeJS.Timeout;
  wasResumed: boolean;
  resumeCumulative: number;
}

type CssVariable =
  | 'primary'
  | 'secondary'
  | 'darker'
  | 'lighter'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

type Size = 'sm' | 'md' | 'lg';

type Rail = {
  id: number;
  initItem: number;
  seconds: number;
  items: Letter[];
};

type Word = {
  name: string;
  points: number;
};

type CheckWord = {
  check: (word: string) => Promise<boolean>;
}