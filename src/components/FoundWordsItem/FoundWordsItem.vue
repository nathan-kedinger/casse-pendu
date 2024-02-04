<template>
  <div class="container">
    <img src="@/assets/backgrounds/ecrans-internes.png" alt="arrière plan item" class="background-items">
    <div class="words-container">
      <div v-for="(word, index) in foundWords" :key="index">
        <p class="personal-text-police-future">{{ word }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 300px;
  height: 280px;
  overflow: hidden;
  padding: 45px;
}

.background-items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.words-container {
  position: relative;
  max-height: 200px; /* Réduire si nécessaire pour voir l'effet de défilement */
  overflow-y: auto;
  z-index: 10; /* S'assure qu'il est au-dessus du fond */
}
</style>
<script setup>
import {foundWords} from "@/components/PenduItem/composables/Words";
</script>
