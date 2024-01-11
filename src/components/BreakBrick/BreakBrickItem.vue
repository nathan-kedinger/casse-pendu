<template>
  <div class="mx-auto my-8 d-flex align-center flex-column">
    <v-card
      :width = gameWidth
      :height = gameHeight
      theme="light"
      image="@/components/BreakBrick/assets/fond-jeu.png">
      <div v-if="gameOn">
        <div id="bricks">
          <div v-for="(brick, index) in bricks" :key="index">
            <div v-if="brick.active"
                 class="brick"
                 :style="{
                    left: brick.x + 'px',
                    top: brick.y + 'px'
                 }"
            >
            </div>
          </div>
        </div>
        <v-card id="ball"
                image="@/components/BreakBrick/assets/balle-laser-violette.svg"
                :style="{
                  left: (ballPosition.x - halfBall) + 'px',
                  top: (ballPosition.y - halfBall) + 'px'
                }"
        >
        </v-card>
        <v-card id="paddle"
                :width="paddleWidth"
                :style="{
                  left: paddlePosition.x + 'px',
                  bottom: paddlePosition.y
              }"
        >
        </v-card>
      </div>
      <div v-else>
        <GameOver/>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, watch} from 'vue';
import {
  gameHeight, gameLoop,
  gameOn,
  gameStore, gameWidth,
  handleKeydown,
  handleKeyup,
  restartGame,
  timeCount
} from "@/components/BreakBrick/composables/GameStructure";
import GameOver from "@/components/GameOverItem/GameOverItem.vue";
import {
  brickHeight,
  bricks,
  useNewBrickLine,
  useSetupBricks
} from "@/components/BreakBrick/composables/Bricks";
import {
  paddlePosition,
  paddleWidth,
} from "@/components/BreakBrick/composables/Paddle";
import {
  ballPosition, halfBall,
  modifAngleX,
  modifAngleY,
} from "@/components/BreakBrick/composables/Ball";

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
  useSetupBricks()
  requestAnimationFrame(gameLoop);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
});

// Logique d'ajout de lignes de briques
watch(timeCount,()=>{
  let newLineTrigger = timeCount.value % (3000 / gameStore.newBricksMultiplier)
    if(Math.round(newLineTrigger) === 0){
      gameStore.speedUpBricks()
      useNewBrickLine()
      bricks.value.forEach((brique)=>{
        brique.y = brique.y + brickHeight;
      })
    }
  }
)
// Logique de réinitialisation du jeu
watch(restartGame, ()=>{
  if (gameStore.newGameOn && restartGame) {
    gameStore.changeRestartGameStatute()
    bricks.value = [];
    useSetupBricks()
    modifAngleX.value = 0;
    modifAngleY.value = 0;
    requestAnimationFrame(gameLoop);
  }
})
</script>

<style scoped>
#paddle, #ball, .brick {
  position: absolute;
  background-color: blue;
}

#paddle {
  height: 20px;
  bottom: 0;
}

#ball {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.brick {
  border: solid white 1px;
  width: 50px;
  height: 20px;
}
</style>
