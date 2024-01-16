<template>
  <v-card
    width="80vw"
    height="10vh"
    theme="light"
  >
    <p class="text-police"> {{ motAafficher.toString().replaceAll(',', ' ') }} {{nombreErreurs}} </p>
  </v-card>

</template>

<script setup lang="ts">
import {onMounted, onUnmounted} from 'vue'
import {
  chargerMots,
  fetchRandomWord,
  lettreChoisie,
  motAafficher, nombreErreurs,
  validerMot
} from "@/components/PenduItem/composables/Words";

function handleKeyPress(event){
  if(event.key.length === 1 && event.key.match(/[a-z]/i)){
    lettreChoisie.value = event.key;
    validerMot();
  }
}

onMounted(async () => {
    await chargerMots();
    fetchRandomWord();
  window.addEventListener('keydown', handleKeyPress);
  }
);

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});
</script>
<style scoped>
  .text-police {
    font-family: fasterstroker,sans-serif;
  }
</style>

