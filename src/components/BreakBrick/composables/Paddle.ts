
// Fonctions pour déplacer la raquette
import {Ref, ref, UnwrapRef} from "vue";
import {gameHeight, gameWidth} from "@/components/BreakBrick/helpers/GameUtilities";

export const paddleHeight = 20;
export const paddleWidth: Ref<UnwrapRef<number>> = ref(localStorage.getItem('paddleBonusSize') ? parseInt(localStorage.getItem('paddleBonusSize')!!) : 100);
export const paddlePosition = ref({ x: gameWidth / 2, y: gameHeight - paddleHeight - 15}); // Position initiale de la raquette
export const isMovingLeft = ref(false);
export const isMovingRight = ref(false);
export const paddleSpeed = ref(localStorage.getItem('paddleBonusSpeed') ? parseInt(localStorage.getItem('paddleBonusSpeed')!!) : 5); // Vitesse de déplacement de la raquette
export function usePaddleControls() {
  const handleKeydown = (event: KeyboardEvent) => {

    if (event.key === "ArrowRight") {
      isMovingRight.value = true;
    } else if (event.key === "ArrowLeft") {
      isMovingLeft.value = true;
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
    paddlePosition.value.x = Math.min(paddlePosition.value.x + paddleSpeed.value, gameWidth - paddleWidth.value);
  } else if (isMovingLeft.value) {
    paddlePosition.value.x = Math.max(paddlePosition.value.x - paddleSpeed.value, 0);
  }
}

export function enlargePaddle(){
  if(paddleWidth.value < 200) {
    paddleWidth.value += 10
    localStorage.setItem('paddleBonusSize', paddleWidth.value.toString())
  }
}export function reducePaddle(){
  if(paddleWidth.value > 100) {
    paddleWidth.value -= 10
    localStorage.setItem('paddleBonusSize', paddleWidth.value.toString())
  }
}

export function fastUpPaddle(){
  if(paddleSpeed.value < 12){
    paddleSpeed.value += 1
    localStorage.setItem('paddleBonusSpeed', paddleSpeed.value.toString())
  }
}export function slowDownPaddle(){
  if(paddleSpeed.value > 5){
    paddleSpeed.value -= 1
    localStorage.setItem('paddleBonusSpeed', paddleSpeed.value.toString())
  }
}

