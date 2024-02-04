<template>
  <v-card
    width="80vw"
    height="10vh"
    theme="light"
    class="personal-background personal-border"
  >
    <div class="d-flex justify-center mb-6">
      <h1 class="personal-text-police-future personal-big-size "> {{ motAafficher.toString().replaceAll(',', ' ') }}  &emsp; Erreurs : {{nombreErreurs}} </h1>
    </div>
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



</style>

