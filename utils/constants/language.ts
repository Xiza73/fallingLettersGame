export const english: LanguageStrings = {
  main: {
    menu: 'Menu',
    tutorial: 'Tutorial',
    play: 'Play!',
  },
  tutorial: {
    title: 'How to play',
    content: `Welcome to Falling Letters.|
The objective of the game is to form words with the letters that fall, click on the letter you want to add to the word, it will go to the end of the column where it was selected. If the word is valid, the corresponding points will be added and the bottom bar will be cleared. The game ends when the time runs out.|
|
Options:|
-Columns: Configure the number of columns in the game, this is used to form words of greater or lesser size.|
-Velocity: Change the speed at which the letters fall within the game.|
-Grid: Modify the visibility of the lines that separate the columns of the game board.|
-Autocomplete: Activate automatic word verification when placing a letter inside the bottom bar. If it is disabled, lives will be enabled, each time a word is verified and is incorrect, a life will be subtracted.`,
    button: 'Got it!',
  },
  options: {
    title: 'Options',
    language: {
      title: 'Language',
      options: {
        en: 'English',
        es: 'Spanish',
      },
    },
    columns: 'Columns',
    speed: 'Speed',
    darkMode: {
      title: 'Mode',
      options: {
        dark: 'Dark',
        light: 'Light',
      },
    },
    grid: {
      title: 'Grid',
      options: {
        show: 'Show',
        hide: 'Hide',
      },
    },
    autocomplete: 'Autocomplete',
    lifes: 'Lifes',
    gameMode: 'Game Mode',
  },
  game: {
    score: 'Score',
    endGame: 'Game Over!',
    reset: 'Reset',
    stopMessage: 'Are you sure you want to exit?',
  },
  general: {
    yes: 'Yes',
    no: 'No',
  },
};

export const spanish: LanguageStrings = {
  main: {
    menu: 'Menú',
    tutorial: 'Instrucciones',
    play: '¡Jugar!',
  },
  tutorial: {
    title: 'Cómo jugar',
    content: `Bienvenido a Falling Letters.|
El objetivo del juego es formar palabras con las letras que caen, da un click en la letra que quieras agregar a la palabra, esta irá al final de la columna donde fue seleccionada. Si la palabra es válida, se sumarán los puntos correspondientes y se limpiará la barra inferior. El juego termina cuando el tiempo se acaba.|
|
Opciones:|
-Columnas: Configura la cantidad de columnas en el juego, esto sirve para formar palabras de mayor o menor tamaño.|
-Velocidad: Cambia la velocidad en la que caen las letras dentro del juego.|
-Grilla: Modifica la visibilidad de la líneas que separan las columnas del tablero del juego.|
-Autocompletado: Activa la verificación automática de palabras al colocar una letra dentro de la barra inferior. Si está desactivada, se habilitarán las vidas, cada vez que se verifica una palabra y es incorrecta, se restará una vida.`,
    button: '¡Entendido!',
  },
  options: {
    title: 'Opciones',
    language: {
      title: 'Idioma',
      options: {
        en: 'Inglés',
        es: 'Español',
      },
    },
    columns: 'Columnas',
    speed: 'Velocidad',
    darkMode: {
      title: 'Modo',
      options: {
        dark: 'Oscuro',
        light: 'Claro',
      },
    },
    grid: {
      title: 'Grilla',
      options: {
        show: 'Mostrar',
        hide: 'Ocultar',
      },
    },
    autocomplete: 'Autocompletar',
    lifes: 'Vidas',
    gameMode: 'Modo de juego',
  },
  game: {
    score: 'Puntaje',
    endGame: '¡Fin del juego!',
    reset: 'Reiniciar',
    stopMessage: '¿Estás seguro que quieres salir?',
  },
  general: {
    yes: 'Sí',
    no: 'No',
  },
};
