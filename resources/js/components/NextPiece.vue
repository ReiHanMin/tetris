<template>
    <div class="next-piece">
      <div v-for="(row, rowIndex) in nextPiece" :key="rowIndex" class="piece-row">
        <div 
          v-for="(cell, cellIndex) in row" 
          :key="cellIndex" 
          class="piece-cell" 
          :class="{ 'filled': cell === 1 }">
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { mapGetters } from 'vuex';

export default {
  props: ['nextPiece'],
  computed: {
    ...mapGetters(['nextTetromino'])
  }
};
</script>

  <style scoped>
  .piece-row {
    display: flex;
  }
  
  .piece-cell {
    width: 20px;  /* Adjust based on your design preference */
    height: 20px;  /* Adjust based on your design preference */
    border: 1px solid #ddd;
    background-color: #f0f0f0;
  }
  
  .piece-cell.filled {
    background-color: #333;  /* Choose a color that fits your game's theme */
  }
  </style>
  