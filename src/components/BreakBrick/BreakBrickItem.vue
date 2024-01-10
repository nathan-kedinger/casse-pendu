<template>
  <div class="mx-auto my-8 d-flex align-center flex-column">
    <v-card
      :width = gameWidth
      :height = gameHeight
      theme="light">
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
                :style="{
                  left: paddlePosition.x + 'px',
                  width: paddleWidth + 'px',
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
import {ref, onMounted, onUnmounted, computed, watch} from 'vue';
import { useGameStore } from '@/store/app';

import {
  useBallReboundBrick,
  useBallReboundPaddleAngle,
  useBallReboundPaddleHorizontaly,
  useBallReboundPaddleVerticaly, useBallReboundWall
} from "@/components/BreakBrick/composables/Rebound";
import{
  useNewBrickLine,
  useSetupBricks
} from "@/components/BreakBrick/composables/Bricks";
import GameOver from "@/components/GameOverItem/GameOverItem.vue";
import {usePaddleControls, useUpdatePaddlePosition} from "@/components/BreakBrick/composables/Paddle";
import {useChangeBallDirection, useOutOfBound} from "@/components/BreakBrick/composables/Ball";
// Import du store
const store = useGameStore();

// Fenêtre du jeu
const gameWidth = 800;
const gameHeight = 600;

// Briques
const bricks = ref([{x:0, y: 0, active: true}]);
const brickWidth = 50;
const brickHeight = 20;
let nbBriques = (gameWidth/brickWidth)*5;
let brickLineCount = 0;

// Raquette
const paddleWidth = 150;
const paddleHeight = 20;
const paddlePosition = ref({ x: gameWidth / 2, y: gameHeight - paddleHeight - 15}); // Position initiale de la raquette
const isMovingLeft = ref(false);
const isMovingRight = ref(false);
const paddleSpeed = 5; // Vitesse de déplacement de la raquette
// Balle
let isBallSend = computed(()=>
  store.newIsBallSend
);
const ballSize = 30;
const halfBall = ballSize/2;
const ballPosition = ref({
  x: paddlePosition.value.x + paddleWidth/2 + halfBall,
  y: paddlePosition.value.y - 1}); // Position initiale de la balle
const modifAngleX = ref(0);
const modifAngleY = ref(0);
const ballSpeed = computed(() => {
  return {
    x: Math.sqrt(modifAngleX.value) * store.newBallSpeedMutliplier,
    y: (modifAngleY.value ) * store.newBallSpeedMutliplier
  };
});
let xRight = ref(true);
let yDown = ref(true);

// Logique
const {handleKeydown, handleKeyup} = usePaddleControls(isMovingLeft, isMovingRight, isBallSend, modifAngleY)

let gameOn = computed(()=>
  store.newGameOn
);
const timeCount = computed(()=>
store.newTimeCount
);
const restartGame = computed(()=>
  store.newRestartGameStatut
)

// Méthode centrale : Gestion de la Boucle permettant de réactualiser le jeu à chaque frame
function gameLoop() {
  // Arrêt du jeu lorsque les briques atteignent la hauteur de la raquette
  if((brickLineCount + 3) * brickHeight  >= gameHeight){
    store.changeGameStatute();
    store.stopBall();
  }
  const reboundLogic = useBallReboundPaddleAngle(
    ballPosition,
    paddlePosition,
    halfBall,
    paddleWidth,
    paddleHeight,
    modifAngleX,
    modifAngleY
  )
  modifAngleX.value = reboundLogic.modifAngleX.value;
  modifAngleY.value = reboundLogic.modifAngleY.value;

  useChangeBallDirection(isBallSend, ballPosition, paddlePosition, paddleWidth, xRight, yDown, ballSpeed);
  useUpdatePaddlePosition(isMovingRight, isMovingLeft, paddlePosition, paddleSpeed, gameWidth, paddleWidth);
  useBallReboundPaddleVerticaly(ballPosition, paddlePosition, halfBall, paddleWidth, paddleHeight, yDown);
  useBallReboundPaddleHorizontaly(ballPosition, paddlePosition, halfBall, paddleWidth, paddleHeight, xRight)
  useBallReboundWall(ballPosition, gameWidth, ballSize, xRight, yDown);
  useBallReboundBrick(ballPosition, halfBall, bricks, brickWidth, brickHeight, yDown, xRight);
  useOutOfBound(ballPosition, gameHeight);
  if(gameOn.value){
    store.countScore();
    store.countTime();
    // Rappel de la méthode elle-même par un callback
    requestAnimationFrame(gameLoop);
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
  useSetupBricks(nbBriques,brickWidth,gameWidth, brickLineCount, brickHeight, bricks)
  requestAnimationFrame(gameLoop);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
});

// Logique d'ajout de lignes de briques
watch(timeCount,()=>{
  let newLineTrigger = timeCount.value % (3000 / store.newBricksMultiplier)
    if(Math.round(newLineTrigger) === 0){
      store.speedUpBricks()
      useNewBrickLine(brickLineCount, gameWidth, brickWidth, bricks)
      bricks.value.forEach((brique)=>{
        brique.y = brique.y + brickHeight;
      })
    }
  }
)

watch(restartGame, ()=>{
  if (store.newGameOn && restartGame) {
    store.changeRestartGameStatute()
    bricks.value = [];
    useSetupBricks(nbBriques,brickWidth,gameWidth, brickLineCount, brickHeight, bricks)
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
