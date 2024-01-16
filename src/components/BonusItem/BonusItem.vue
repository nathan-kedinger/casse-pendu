<template>
  <v-card>
    <v-btn
      :disabled="ballSpeedMultiplier <= 1.25"
      @click="speedDownBall()">
      Ralentir la balle
    </v-btn>
    <v-btn
      :disable="paddleWidth >= 190"
      @click="enlargePaddle()">
      Agrandir la raquette
    </v-btn>
    <v-btn
      :disable="paddleWidth >= 190"
      @click="enlargePaddle()">
      Réduir la raquette
    </v-btn>
    <v-btn
      :disable="paddleSpeed >= 12"
      @click="fastUpPaddle()">
      vitesse de la raquette ++
    </v-btn>
    <v-btn
      :disable="paddleSpeed <= 5"
      @click="slowDownPaddle()">
      vitesse de la raquette --
    </v-btn>
    <v-btn
      :disable="balls.length > 4"
      @click="newBall()">
      Ajoute une balle
    </v-btn>
    <p>{{ store.newPlayerCoins }}</p>
  </v-card>
</template>

<script setup lang="ts">
import {balls, ballSpeedMultiplier, newBall, speedDownBall} from "@/components/BreakBrick/composables/Ball";
import {
  enlargePaddle,
  fastUpPaddle,
  paddleSpeed,
  paddleWidth,
  slowDownPaddle
} from "@/components/BreakBrick/composables/Paddle";
import {useGameStore} from "@/store/app";

const store = useGameStore();

// Ralentir la balle
// Augmenter la taille de la raquette
// Vitesse de la raquette
// Ajouter une balle

// Balle persante


</script>


<style scoped>

</style>
