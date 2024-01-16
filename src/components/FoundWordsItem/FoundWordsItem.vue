<template>
  <v-card
    width="230px"
    height="230px"
    image="@/components/FoundWordsItem/assets/ecran.png">
    <div v-for="(word,index) in foundWords" :key="index">
      <p>{{ word }}</p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {foundWords} from "@/components/PenduItem/composables/Words";


</script>

<style scoped>

</style>
