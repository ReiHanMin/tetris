<template>
  <div class="board">
    <div v-for="(row, rowIndex) in computedBoard" :key="rowIndex" class="row">
      <div v-for="(cell, cellIndex) in row" :key="cellIndex"
           :class="['cell', { 'tetromino': cell === 'tetromino' }]">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['computedBoard'],
};
</script>

<style>
.board {
  display: grid;
  grid-template-columns: repeat(10, 30px); /* Creates 10 columns */
}
.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  background-color: #f0f0f0; /* Default background */
}
.cell.tetromino {
  background-color: blue; /* Tetromino cells */
}

</style>
