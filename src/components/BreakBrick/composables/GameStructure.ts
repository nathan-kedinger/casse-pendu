// Fenêtre du jeu
import {computed} from "vue";
import {usePaddleControls, useUpdatePaddlePosition} from "@/components/BreakBrick/composables/Paddle";
import {useGameStore} from "@/store/app";
import {useBonusGameStore} from "@/store/bonus";
import {brickHeight, brickLineCount} from "@/components/BreakBrick/composables/Bricks";
import {
  modifAngleX,
  modifAngleY,
  useChangeBallDirection,
  useOutOfBound
} from "@/components/BreakBrick/composables/Ball";
import {
  useBallReboundBrick, useBallReboundPaddleAngle,
  useBallReboundPaddleHorizontally,
  useBallReboundPaddleVertically, useBallReboundWall
} from "@/components/BreakBrick/composables/Rebound";
export const gameStore = useGameStore();
export const bonusStore = useBonusGameStore();
export const gameWidth = 800;
export const gameHeight = 600;

// Logique
export const {handleKeydown, handleKeyup} = usePaddleControls()
export const gameOn = computed(()=>
  gameStore.newGameOn
);
export const timeCount = computed(()=>
  gameStore.newTimeCount
);
export const restartGame = computed(()=>
  gameStore.newRestartGameStatut
)
// Méthode centrale : Gestion de la Boucle permettant de réactualiser le jeu à chaque frame
export function gameLoop() {
  // Arrêt du jeu lorsque les briques atteignent la hauteur de la raquette
  if((brickLineCount + 3) * brickHeight  >= gameHeight){
    gameStore.changeGameStatute();
    gameStore.stopBall();
  }
  useChangeBallDirection();
  useUpdatePaddlePosition();
  useBallReboundPaddleVertically();
  useBallReboundPaddleHorizontally()
  useBallReboundWall();
  useBallReboundBrick();
  useOutOfBound();
  const reboundLogic = useBallReboundPaddleAngle()
  modifAngleX.value = reboundLogic.modifAngleX.value;
  modifAngleY.value = reboundLogic.modifAngleY.value;

  if(gameOn.value){
    gameStore.countScore();
    gameStore.countTime();
    // Rappel de la méthode elle-même par un callback
    requestAnimationFrame(gameLoop);
  }
}
