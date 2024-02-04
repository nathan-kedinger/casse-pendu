<template>
  <div class="card">
    <div class="words-container" style="max-height: 170px; overflow-y: auto;">
      <div v-for="(word, index) in foundWords" :key="index">
        <p class="personal-text-police-future">{{ word }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {foundWords} from "@/components/PenduItem/composables/Words";


</script>

<style scoped>
.card {
  width: 230px;
  height: 230px;
  padding: 30px;
  /* Styles supplémentaires pour votre carte, si nécessaire */
  background-image: url('./assets/ecrans-internes.svg');
  background-size: cover; /* Assurez-vous que l'image de fond couvre toute la carte */
  background-color: transparent;
}
</style>
