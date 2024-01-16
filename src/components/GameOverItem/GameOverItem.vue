<template>
  <h1>GAME OVER</h1>
  <v-btn @click="store.restartGame(); resetGame()">Recommencer la partie</v-btn>
</template>
<script setup lang="ts">
import {useGameStore} from "@/store/app";
import {resetGame} from "@/components/BreakBrick/composables/GameStructure";
const store = useGameStore();
</script>
<style scoped>

</style>
