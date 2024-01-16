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
        <v-card v-for="(ball, index) in balls"
                :key="index"
                id="ball"
                image="@/components/BreakBrick/assets/balle-laser-violette.svg"
                :style="{
              left: (ball.ballPosition.x - halfBall) + 'px',
              top: (ball.ballPosition.y - halfBall) + 'px'
            }">
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
import {useGameStore} from "@/store/app";
import {computed, onMounted, onUnmounted, watch} from 'vue';
import {
  brickHeight,
  bricks, bricksMultiplier, speedUpBricks,
  useNewBrickLine,
  useSetupBricks
} from "@/components/BreakBrick/composables/Bricks";
import {
  paddlePosition, paddleWidth,
  usePaddleControls
} from "@/components/BreakBrick/composables/Paddle";
import GameOver from "@/components/GameOverItem/GameOverItem.vue";
import {
  balls,
  halfBall, stopAllBalls,
   useBallControls
} from "@/components/BreakBrick/composables/Ball";
import {gameHeight, gameWidth} from "@/components/BreakBrick/helpers/GameUtilities";
import {gameLoop} from "@/components/BreakBrick/composables/GameStructure";
import {addNewScore} from "@/components/RankingItem/composables/ScoresLogic";

// Logique
const gameStore = useGameStore();
const gameOn = computed(()=>
  gameStore.newGameOn
);
const timeCount = computed(()=>
  gameStore.newTimeCount
);
const restartGame = computed(()=>
  gameStore.newRestartGameStatute
)
const {handleKeydown, handleKeyup} = usePaddleControls()

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
  window.addEventListener('keydown', useBallControls())
  useSetupBricks();
  requestAnimationFrame(gameLoop);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
});

// Logique d'ajout de lignes de briques
watch(timeCount,()=>{
  let newLineTrigger = timeCount.value % (3000 / bricksMultiplier.value)
  let bricksLimit = bricks.value.filter((brique)=> brique.y >= 540 && brique.active === true)
  if(bricksLimit.length > 0) {
    addNewScore(gameStore.newScore);
    gameStore.endGame();
    stopAllBalls();
  } else if(Math.round(newLineTrigger) === 0 && gameStore.newGameOn){
      speedUpBricks()
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
