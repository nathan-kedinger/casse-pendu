<template>
  <v-card
    width="200px"
    height="200px"
    image="@/components/FoundWordsItem/assets/ecran.png">
    <div v-for="(word,index) in store.newFoundWords" :key="index">
      <p>{{ word }}</p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {useGameStore} from "@/store/app";

const store = useGameStore();

</script>

<style scoped>

</style>
