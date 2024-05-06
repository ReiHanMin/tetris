<template>
    <div class="game-controls">
        <!-- Existing buttons -->
        <button @click="startNewGame">New Game</button>
        <button @click="togglePause">{{ isPaused ? 'Resume' : 'Pause' }}</button>
      <button @click="moveLeft" aria-label="Move left">
        Left
      </button>
      <button @click="rotate" aria-label="Rotate piece">
        Rotate
      </button>
      <button @click="moveRight" aria-label="Move right">
        Right
      </button>
      <button @click="drop" aria-label="Drop piece">
        Drop
      </button>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
    return {
      isPaused: false,
    };
  },
    mounted() {
      document.addEventListener('keydown', this.handleKeyDown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.handleKeyDown);
    },
    methods: {
      moveLeft() {
        this.$emit('move', -1);
      },
      rotate() {
        this.$emit('rotate');
      },
      moveRight() {
        this.$emit('move', 1);
      },
      drop() {
        this.$emit('drop');
      },
      handleKeyDown(event) {
        switch (event.key) {
          case 'ArrowLeft':
            this.moveLeft();
            break;
          case 'ArrowRight':
            this.moveRight();
            break;
          case 'ArrowUp':
            this.rotate();
            break;
          case 'ArrowDown':
            this.drop();
            break;
        }
      },
      startNewGame() {
        this.$emit('startNewGame');
      },
      togglePause() {
        this.$emit('togglePause', !this.isPaused);
      }

    }
  };
  </script>

<style>
.game-controls {
  border: 2px solid red; /* Temporarily add this to see if the component renders */
}

.game-controls button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.game-controls button:hover {
  background-color: #45a049;
}

.game-controls button:active {
  background-color: #367c39;
}
</style>

  