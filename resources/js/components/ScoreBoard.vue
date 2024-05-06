<template>
    <div class="scoreboard">
      <div>Score: {{ score }}</div>
      <div>Level: {{ level }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['score', 'level']
  };
  </script>
  