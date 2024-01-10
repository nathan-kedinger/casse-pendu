<template>
  <div v-for="(word,index) in store.newFoundWords" :key="index">
    <p>{{ word }}</p>
  </div>
</template>

<script setup lang="ts">
import {useGameStore} from "@/store/app";

const store = useGameStore();

</script>

<style scoped>

</style>
