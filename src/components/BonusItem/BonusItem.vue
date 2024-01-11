<template>
  <v-card></v-card>
  <v-btn
    :disabled="ballSpeedMultiplier <= 1.25"
    @click="store.speedDownBall()">
    Ralentir la balle
  </v-btn>
  <v-btn
    :disable="paddleSizeModifier <= 200"
    @click="bonusStore.enlargePaddle()">
    Agrandir la raquette
  </v-btn>
</template>

<script setup lang="ts">
import {useGameStore} from "@/store/app";
import {computed} from "vue";
import {useBonusGameStore} from "@/store/bonus";
const store = useGameStore();
const bonusStore = useBonusGameStore();

// Ralentir la balle
const ballSpeedMultiplier = computed(() =>
    store.newBallSpeedMutliplier
)
const paddleSizeModifier = computed(() =>
  localStorage.getItem('paddleBonusSize')
);
// Augmenter la taille de la raquette
console.log(paddleSizeModifier.value)

// Vitesse de la raquette



</script>


<style scoped>

</style>
