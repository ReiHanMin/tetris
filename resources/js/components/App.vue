<!-- resources/js/components/App.vue -->
<template>
    <div id="app">
      <TetrisGame />
    </div>
  </template>
  
  <script>
 import TetrisGame from './TetrisGame.vue';

export default {
  components: {
    TetrisGame
  }
}
 
  </script>
  