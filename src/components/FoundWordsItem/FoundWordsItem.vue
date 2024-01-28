<template>
  <v-card
    width="230px"
    height="230px"
    image="@/components/FoundWordsItem/assets/ecrans-internes.svg"
    class="pa-10 ">
    <div v-for="(word,index) in foundWords" :key="index">
      <p
      class="personal-text-police-future"
      >{{ word }}</p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {foundWords} from "@/components/PenduItem/composables/Words";


</script>

<style scoped>
</style>
