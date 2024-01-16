<template>
  <v-data-table :items="playersScores"></v-data-table>
</template>

<script setup lang="ts">

import {playersScores} from "@/components/RankingItem/helpers/PlayersScores";
</script>

<style scoped>

</style>
