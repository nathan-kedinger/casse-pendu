<template>
  <div class="container">
    <img src="@/assets/backgrounds/ecrans-internes.png" alt="arrière plan item" class="background-items">
    <div class="contained ">
      <div>
        <span> ball speed :{{ ballSpeedMultiplier.toFixed(1) }}</span>
        <v-btn
          :disabled="ballSpeedMultiplier <= 1.25"
          @click="speedDownBall()">
          <v-icon icon="mdi-arrow-down-bold-circle"></v-icon> - {{ priceSpeedDownBall }} G
        </v-btn>
      </div>
      <div>
        <v-btn
          :disable="paddleWidth >= 190"
          @click="enlargePaddle(store.newPlayerCoins)">
          <v-icon icon="mdi-arrow-up-bold-circle"></v-icon> - {{ priceWidth }} G
        </v-btn> <span>Paddle width : {{ paddleWidth }}</span>
        <v-btn
          :disable="paddleWidth >= 100"
          @click="reducePaddle()">
          <v-icon icon="mdi-arrow-down-bold-circle"></v-icon> + {{ priceWidth/2 }} G
        </v-btn>
      </div>
      <div>
        <v-btn
          :disable="paddleSpeed >= 12"
          @click="fastUpPaddle(store.newPlayerCoins)">
          <v-icon icon="mdi-arrow-up-bold-circle"></v-icon> - {{ priceSpeed }} G
        </v-btn> <span> Paddle speed : {{ paddleSpeed }}</span>
        <v-btn
          :disable="paddleSpeed <= 5"
          @click="slowDownPaddle()">
          <v-icon icon="mdi-arrow-down-bold-circle"></v-icon> + {{ priceSpeed/2 }} G
        </v-btn>
      </div>
      <div>
        <span> Balls number : {{ balls.length }}</span>
        <v-btn v-if="useGameStore().newPlayerCoins >= priceBall"
               :disable="balls.length > 4"
               @click="newBall(); useGameStore().removeCoins(priceBall)">
          <v-icon icon="mdi-arrow-up-bold-circle"></v-icon> - {{ priceBall }} G
        </v-btn>
      </div>
      <p>Gold : {{ useGameStore().newPlayerCoins }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  balls,
  ballSpeedMultiplier,
  newBall,
  priceBall,
  priceSpeedDownBall,
  speedDownBall
} from "@/components/BreakBrick/composables/Ball";
import {
  enlargePaddle,
  fastUpPaddle,
  paddleSpeed,
  paddleWidth, priceSpeed, priceWidth, reducePaddle,
  slowDownPaddle
} from "@/components/BreakBrick/composables/Paddle";
import {useGameStore} from "@/store/app";
import {computed, ref} from "vue";

const store = useGameStore();


// TODO - Balle persante
</script>


<style scoped>
.container {
  position: relative;
  width: 420px; /* Définissez une largeur fixe ou selon vos besoins */
  height: 350px; /* Définissez une hauteur fixe ou selon vos besoins */
  overflow: hidden;
  padding-left: 45px;
  padding-top: 45px;
}

.background-items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.contained{
  font-family: nulshock,sans-serif;

  position: relative;
  z-index: 10; /* S'assure qu'il est au-dessus du fond */
}
</style>
