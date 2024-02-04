<template>
  <v-container class="bg-surface-variant">
    <v-row
    no-gutters
    style="height: 150px;">
      <v-col align-self="center">
        <h1>GAME OVER</h1>
        <v-btn @click="store.restartGame(); resetGame()">Recommencer la partie</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import {useGameStore} from "@/store/app";
import {resetGame} from "@/components/BreakBrick/composables/GameStructure";
const store = useGameStore();
</script>
<style scoped>

</style>
