
<template>
  <v-card
  class="ma-carte-avec-image"
  image="@/components/FoundWordsItem/assets/ecrans-internes.svg">
    <p
      class="personal-text-police-future"
    >Score : {{ score }}</p>
    <p
      class="personal-text-police-future"
    >Multiplicateur de score : {{ multiplier }}</p>
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
