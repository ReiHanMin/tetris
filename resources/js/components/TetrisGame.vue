<template>
  <div class="tetris-game">
    <GameBoard  :computedBoard="computedBoard" />
    <NextPiece :nextPiece="nextTetromino"/>
    <ScoreBoard :score="score" :linesCleared="linesCleared" :level="level"/>
    <GameControls @move="handleMove" @rotate="handleRotate" @drop="handleDrop" @startNewGame="handleStartNewGame" @togglePause="handleTogglePause"/>
  </div>
</template>

<script>
import GameBoard from './GameBoard.vue';
import ScoreBoard from './ScoreBoard.vue';
import NextPiece from './NextPiece.vue';
import GameControls from './GameControls.vue';

export default {
  components: {
    GameBoard,
    ScoreBoard,
    NextPiece,
    GameControls
  },
  data() {
    return {
      board: [],
      score: 0,
      level: 1,
      linesCleared: 0,
      rows: 20,
      cols: 10,
      currentTetromino: null,
      nextTetromino: null,
      gameOver: false,
      gameActive: false,
      isPaused: false,
      currentPosition: {x: 0, y: 0},
      boardWidth: 10,
      boardHeight: 20,
      initialFallSpeed: 1000
    };
  },
  mounted() {
    this.initBoard();
    this.startGame();
  },
  methods: {
    handleStartNewGame() {
    // Code to start or restart the game
    console.log('Starting new game...');
    this.resetGame();
    this.spawnTetromino();
  },
    initBoard() {
      this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
      console.log('Board initialized:', this.board);
    },
    startGame() {
      this.resetGame();
      this.spawnTetromino();
      this.gameLoop(); // Ensure this is called
    },
    resetGame() {
      this.initBoard();
      this.score = 0;
      this.level = 1;
      this.linesCleared = 0;
      this.gameOver = false;
      this.gameActive = true;
      this.isPaused = false;
      console.log('Game reset:', {
    score: this.score,
    level: this.level,
    linesCleared: this.linesCleared,
    gameOver: this.gameOver,
    gameActive: this.gameActive,
    isPaused: this.isPaused
  });
    },
    spawnTetromino() {
      // This ensures the next piece is set and the current piece is moved to active
      this.currentTetromino = this.nextTetromino || this.updateNextTetromino();
      this.currentPosition = {x: Math.floor(this.cols / 2 - this.currentTetromino.shape[0].length / 2), y: 0};
      this.updateNextTetromino();
      console.log("Current position:", this.currentPosition);
  console.log("Current tetromino shape:", this.currentTetromino.shape);
      console.log('Tetromino spawned:', {
      currentTetromino: this.currentTetromino,
      currentPosition: this.currentPosition
      });
    },
    updateNextTetromino() {
    const tetrominoKeys = Object.keys(this.$store.getters.getTetrominos);
    if (!tetrominoKeys.length) {
        console.error('No tetrominos available in the store');
        return; // Handle appropriately, maybe set a default or error state
    }
    const randKey = tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
    const nextTetromino = {
        shape: this.$store.getters.getTetrominos[randKey][0],
        position: { x: Math.floor(this.cols / 2 - 2), y: 0 }
    };
    
    // Commit the mutation to update the next piece correctly
    this.$store.commit('setNextPiece', nextTetromino);
    
    return nextTetromino; // Return the next tetromino if needed elsewhere
    },

    handleMove(direction) {
      const newX = this.currentPosition.x + direction;
      // Assume boardWidth is the width of the game board, and shapeWidth is the width of the Tetromino shape
      const shapeWidth = this.currentTetromino.shape[0].length;
      
      // Check if the new position is within bounds and not colliding with existing pieces
      if (newX >= 0 && newX + shapeWidth <= this.cols && !this.checkCollision(newX, this.currentPosition.y, this.currentTetromino.shape)) {
        this.currentPosition.x = newX; // Update position if no collision
      }
    },
    handleRotate() {
      // Create a new rotated shape
      const rotatedShape = this.rotateMatrix(this.currentTetromino.shape);

      // Check if the rotation results in a collision
      if (!this.checkCollision(this.currentPosition.x, this.currentPosition.y, rotatedShape)) {
        // If no collision, update the current Tetromino's shape
        this.currentTetromino.shape = rotatedShape;
      }
    },
    rotateMatrix(matrix) {
      const rows = matrix.length;
      const cols = matrix[0].length;
      const rotatedMatrix = Array.from({ length: cols }, () => Array(rows).fill(0));
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          rotatedMatrix[col][rows - row - 1] = matrix[row][col];
        }
      }
      return rotatedMatrix;
    },
    handleDrop() {
  let newY = this.currentPosition.y + 1;
  console.log(`handleDrop - Current position: ${this.currentPosition.x}, ${this.currentPosition.y}`);
  if (!this.checkCollision(this.currentPosition.x, newY, this.currentTetromino.shape)) {
    this.currentPosition.y = newY; // Ensure reactive update
    console.log(`Position updated to: ${this.currentPosition.x}, ${this.currentPosition.y}`);
  } else {
    this.lockTetromino();
  }
},

    handleTogglePause(isPaused) {
      this.isPaused = isPaused;
    },


    gameLoop() {
  console.log('gameLoop running'); // Debugging statement
  if (!this.gameOver && this.gameActive && !this.isPaused) {
    setTimeout(() => {
      this.dropTetromino();
      this.gameLoop();
    }, this.initialFallSpeed / this.level);
  }
},

dropTetromino() {
    let newY = this.currentPosition.y + 1;
    if (!this.checkCollision(this.currentPosition.x, newY, this.currentTetromino.shape)) {
        console.log(`Moving tetromino down to y=${newY}`);
        this.currentPosition.y = newY; // Ensure this update is reactive
    } else {
        console.log(`Collision detected at y=${newY}, locking tetromino.`);
        this.lockTetromino();
        if (!this.gameOver) {
            this.spawnTetromino();
        }
    }
},



checkCollision(x, y, tetromino) {
  for (let row = 0; row < tetromino.length; row++) {
    for (let col = 0; col < tetromino[row].length; col++) {
      if (tetromino[row][col]) {
        let newX = x + col;
        let newY = y + row;
        if (newX < 0 || newX >= this.cols || newY < 0 || newY >= this.rows || this.board[newY][newX] !== 0) {
          console.log(`Collision at newX: ${newX}, newY: ${newY}`);
          return true;
        }
      }
    }
  }
  return false;
},


    lockTetromino() {
      for (let row = 0; row < this.currentTetromino.shape.length; row++) {
        for (let col = 0; col < this.currentTetromino.shape[row].length; col++) {
          if (this.currentTetromino.shape[row][col]) {
            if (this.currentPosition.y + row < 1) this.gameOver = true;
            this.board[this.currentPosition.y + row][this.currentPosition.x + col] = this.currentTetromino.shape[row][col];
          }
        }
      }
      this.clearLines();
    },
    clearLines() {
      let linesCleared = 0;
      for (let row = this.board.length - 1; row >= 0; row--) {
        if (this.board[row].every(value => value !== 0)) {
          this.board.splice(row, 1);
          this.board.unshift(Array(this.cols).fill(0));
          linesCleared++;
          row++;  // adjust index to stay on the new line
        }
      }
      if (linesCleared > 0) {
        this.updateScore(linesCleared);
      }
    },
    updateScore(linesCleared) {
      let scoreToAdd = 0;
      switch (linesCleared) {
        case 1: scoreToAdd = 100; break;
        case 2: scoreToAdd = 300; break;
        case 3: scoreToAdd = 500; break;
        case 4: scoreToAdd = 800; break;
      }
      this.score += scoreToAdd;
      this.linesCleared += linesCleared;
      this.updateLevel();
    },
    updateLevel() {
      let newLevel = Math.floor(this.linesCleared / 10) + 1;
      if (newLevel > this.level) {
        this.level = newLevel;
        this.adjustGameSpeed();
      }
    },
    adjustGameSpeed() {
      this.initialFallSpeed = Math.max(this.initialFallSpeed - (this.level - 1) * 50, 100);
    },
  },
  computed: {
    computedBoard() {
  let boardCopy = JSON.parse(JSON.stringify(this.board));
  console.log("Recalculating board...");
  if (this.currentTetromino && this.gameActive) {
    console.log(`Current Tetromino Position: x=${this.currentPosition.x}, y=${this.currentPosition.y}`);
    this.currentTetromino.shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell) {
          let x = this.currentPosition.x + dx;
          let y = this.currentPosition.y + dy;
          console.log(`Placing part of Tetromino at x=${x}, y=${y}`);
          if (y >= 0 && y < this.rows && x >= 0 && x < this.cols) {
            boardCopy[y][x] = 'tetromino';
          }
        }
      });
    });
  }
  return boardCopy;
}

},
  };
</script>

<style scoped>
.tetris-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

