// Fenêtre du jeu

import {fetchRandomWord, foundWords, nombreErreurs, resetWord} from "@/components/PenduItem/composables/Words";
import {
  balls,
  ballSpeedMultiplier,
  newBall,
  useChangeBallDirection,
  useOutOfBound
} from "@/components/BreakBrick/composables/Ball";
import {bricksMultiplier, useSetupBricks} from "@/components/BreakBrick/composables/Bricks";
import {paddleWidth, useUpdatePaddlePosition} from "@/components/BreakBrick/composables/Paddle";
import {
  useBallReboundBrick,
  useBallReboundPaddleAngle,
  useBallReboundPaddleHorizontally,
  useBallReboundPaddleVertically, useBallReboundWall
} from "@/components/BreakBrick/composables/Rebound";
import {useGameStore} from "@/store/app";

 // Méthode centrale : Gestion de la Boucle permettant de réactualiser le jeu à chaque frame
export function gameLoop() {
const gameStore = useGameStore();

  useChangeBallDirection();
  useUpdatePaddlePosition();
  useBallReboundPaddleVertically();
  useBallReboundPaddleHorizontally();
  useBallReboundPaddleAngle();
  useBallReboundWall();
  useBallReboundBrick();
  useOutOfBound();

  if(gameStore.newGameBegin){
    gameStore.countScore();
    gameStore.countTime();
    // Rappel de la méthode elle-même par un callback
    requestAnimationFrame(gameLoop);
  }
}
export async function resetGame(){
  useSetupBricks();
  foundWords.value = [];
  balls.value = [];
  paddleWidth.value = localStorage.getItem('paddleBonusSize') ? parseInt(localStorage.getItem('paddleBonusSize')!!) : 100;
  newBall();
  nombreErreurs.value = 0;
  ballSpeedMultiplier.value = 1;
  bricksMultiplier.value = 1;
  resetWord();
  await fetchRandomWord();
}
