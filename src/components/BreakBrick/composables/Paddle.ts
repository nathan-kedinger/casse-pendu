
// Fonctions pour déplacer la raquette
import {computed, ref} from "vue";
import {isBallSend, modifAngleY} from "@/components/BreakBrick/composables/Ball";
import {bonusStore, gameHeight, gameStore, gameWidth} from "@/components/BreakBrick/composables/GameStructure";

const paddleBonusSize = computed(()=>
  bonusStore.newLargerPaddle
);
export const paddleWidth = ref(
  100 + paddleBonusSize.value
);
export const paddleHeight = 20;
export const paddlePosition = ref({ x: gameWidth / 2, y: gameHeight - paddleHeight - 15}); // Position initiale de la raquette
export const isMovingLeft = ref(false);
export const isMovingRight = ref(false);
export const paddleSpeed = 5; // Vitesse de déplacement de la raquette

export function usePaddleControls() {

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      isMovingRight.value = true;
    } else if (event.key === "ArrowLeft") {
      isMovingLeft.value = true;
    } else if (event.key === "ArrowUp" && !isBallSend.value) {
      modifAngleY.value = gameStore.sendBall();
    }
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      isMovingRight.value = false;
    } else if (event.key === "ArrowLeft") {
      isMovingLeft.value = false;
    }
  };

  return { handleKeydown, handleKeyup };
}
export function useUpdatePaddlePosition() {
  if (isMovingRight.value) {
    paddlePosition.value.x = Math.min(paddlePosition.value.x + paddleSpeed, gameWidth - paddleWidth.value);
  } else if (isMovingLeft.value) {
    paddlePosition.value.x = Math.max(paddlePosition.value.x - paddleSpeed, 0);
  }
}
