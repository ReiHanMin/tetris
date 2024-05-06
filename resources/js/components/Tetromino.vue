<template>
    <div class="tetromino">
      <div v-for="(row, rowIndex) in tetromino" :key="rowIndex" class="tetromino-row">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="tetromino-cell"
          :class="{ 'filled': cell }">
        </div>
      </div>
    </div>
  </template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['tetromino'],
  computed: {
    ...mapGetters(['getTetrominos']),
  },
  methods: {
    rotateTetromino() {
      // Example method to rotate the tetromino matrix
      this.tetromino = this.tetromino[0].map((_, index) => this.tetromino.map(row => row[index]).reverse());
    },
  },
  mounted() {
    // This is optional, depending on if you need initial rotation or positioning logic
    console.log('Tetromino mounted:', this.tetromino);
  }
};
</script>

<style scoped>
.tetromino-row {
    display: flex;
  }
  
  .tetromino-cell {
    width: 20px; /* adjust size as needed */
    height: 20px; /* adjust size as needed */
    border: 1px solid #ddd;
    background-color: #f0f0f0;
  }
  
  .tetromino-cell.filled {
    background-color: blue; /* adjust color as needed */
  }
  
  </style>