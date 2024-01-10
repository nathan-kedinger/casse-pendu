

<template>
  <h1>GAME OVER</h1>
  <v-btn @click="store.restartGame()">Recommencer la partie</v-btn>
</template>
<script setup lang="ts">
import {useGameStore} from "@/store/app";
import {computed} from "vue";

const store = useGameStore();
let gameOn= computed(()=>store.restartGame())



</script>
<style scoped>

</style>
