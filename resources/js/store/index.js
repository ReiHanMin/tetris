import { createStore } from 'vuex';

export default createStore({
  state: {
    isPaused: false,
    gameActive: false,
    score: 0,
    linesCleared: 0,
    currentLevel: 1,
    tetrominos: {
      I: [
        [[1, 1, 1, 1]],
        [[1],
         [1],
         [1],
         [1]]
      ],
      J: [
        [[1, 0, 0],
         [1, 1, 1]],
        [[1, 1],
         [1, 0],
         [1, 0]],
        [[1, 1, 1],
         [0, 0, 1]],
        [[0, 1],
         [0, 1],
         [1, 1]]
      ],
      L: [
        [[0, 0, 1],
         [1, 1, 1]],
        [[1, 0],
         [1, 0],
         [1, 1]],
        [[1, 1, 1],
         [1, 0, 0]],
        [[1, 1],
         [0, 1],
         [0, 1]]
      ],
      O: [
        [[1, 1],
         [1, 1]]
      ],
      S: [
        [[0, 1, 1],
         [1, 1, 0]],
        [[1, 0],
         [1, 1],
         [0, 1]]
      ],
      T: [
        [[0, 1, 0],
         [1, 1, 1]],
        [[1, 0],
         [1, 1],
         [1, 0]],
        [[1, 1, 1],
         [0, 1, 0]],
        [[0, 1],
         [1, 1],
         [0, 1]]
      ],
      Z: [
        [[1, 1, 0],
         [0, 1, 1]],
        [[0, 1],
         [1, 1],
         [1, 0]]
      ]
    }
  },
  mutations: {
    setNextPiece(state, nextPiece) {
      state.nextPiece = nextPiece;
    },
    togglePause(state) {
      state.isPaused = !state.isPaused;
    },
    startNewGame(state) {
      state.gameActive = true;
      state.isPaused = false;
      state.score = 0;
      state.linesCleared = 0;
      state.currentLevel = 1;
      // Reset other parts of the state as necessary
    },
    endGame(state) {
      state.gameActive = false;
    }
  },
  getters: {
    getTetrominos: (state) => state.tetrominos,
    isGamePaused: (state) => state.isPaused,
    isGameActive: (state) => state.gameActive,
    currentScore: (state) => state.score,
    linesCleared: (state) => state.linesCleared,
    currentLevel: (state) => state.currentLevel,
    nextTetromino: (state) => {
      return state.nextPiece;
    }
  }
});
