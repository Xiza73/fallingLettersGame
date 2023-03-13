type Language = 'en' | 'es';
type GameMode = 'classic' | 'endless';
type LanguageStrings = {
  main: {
    menu: string;
    tutorial: string;
    play: string;
  };
  tutorial: {
    title: string;
    content: string;
    button: string;
  };
  options: {
    title: string;
    language: {
      title: string;
      options: {
        en: string;
        es: string;
      };
    };
    columns: string;
    speed: string;
    darkMode: {
      title: string;
      options: {
        dark: string;
        light: string;
      };
    };
    grid: {
      title: string;
      options: {
        show: string;
        hide: string;
      };
    };
    autocomplete: string;
    lifes: string;
    gameMode: string;
  };
  game: {
    score: string;
    endGame: string;
    reset: string;
    stopMessage: string;
    restartMessage: string;
  }
  general: {
    yes: string;
    no: string;
  }
};
