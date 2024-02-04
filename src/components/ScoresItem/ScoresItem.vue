
<template>
  <div class="container">
  <img src="@/assets/backgrounds/ecrans-internes.png" alt="arrière plan item" class="background-items">
    <div class="contained">
      <p
        class="personal-text-police-future"
      >Score : {{ score }}</p>
        <p
          class="personal-text-police-future"
        >Multiplicateur de score : {{ multiplier }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import {useGameStore} from "@/store/app";

const store = useGameStore();

const score = computed(()=> store.newScore);
const multiplier = computed(()=> store.newScoreMultiplier)
</script>

<style scoped>
.container {
  position: relative;
  width: 400px;
  height: 80px;
  overflow: hidden;
  padding-left: 45px;
  padding-top: 15px ;
}

.background-items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.contained{
  position: relative;
  z-index: 10; /* S'assure qu'il est au-dessus du fond */
}
</style>
