
<template>
  <v-card>
    <p>Score{{ score }}</p>
    <p>Multiplicateur de score : {{ multiplier }}</p>
  </v-card>
</template>
<script setup lang="ts">
import {computed} from "vue";
import {useGameStore} from "@/store/app";

const store = useGameStore();

const score = computed(()=> store.newScore);
const multiplier = computed(()=> store.newScoreMultiplier)
</script>

<style scoped>

</style>
