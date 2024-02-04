<template>
  <v-card
    class="personal-background"
    image="@/components/FoundWordsItem/assets/ecrans-internes.svg">
    <v-btn
      :disabled="ballSpeedMultiplier <= 1.25"
      @click="speedDownBall()">
      Ralentir la balle -> - {{ priceSpeedDownBall }}
    </v-btn> <span>{{ ballSpeedMultiplier.toFixed(1) }}</span>
    <v-btn
      :disable="paddleWidth >= 190"
      @click="enlargePaddle(store.newPlayerCoins)">
      Agrandir la raquette -> - {{ priceWidth }}
    </v-btn> <span>{{ paddleWidth }}</span>
    <v-btn
      :disable="paddleWidth >= 190"
      @click="reducePaddle()">
      Réduir la raquette -> + {{ priceWidth/2 }}
    </v-btn>
    <v-btn
      :disable="paddleSpeed >= 12"
      @click="fastUpPaddle(store.newPlayerCoins)">
      vitesse de la raquette ++ -> - {{ priceSpeed }}
    </v-btn> <span>{{ paddleSpeed }}</span>
    <v-btn
      :disable="paddleSpeed <= 5"
      @click="slowDownPaddle()">
      vitesse de la raquette -- -> + {{ priceSpeed/2 }}
    </v-btn>
    <v-btn v-if="useGameStore().newPlayerCoins >= priceBall"
      :disable="balls.length > 4"
      @click="newBall(); useGameStore().removeCoins(priceBall)">
      Ajoute une balle -> {{ priceBall }}
    </v-btn>
    <p>{{ useGameStore().newPlayerCoins }}</p>
  </v-card>
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

</style>
