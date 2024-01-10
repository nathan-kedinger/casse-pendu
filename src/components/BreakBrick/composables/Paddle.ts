
// Fonctions pour déplacer la raquette
import {Ref, UnwrapRef} from "vue";
import {useGameStore} from "@/store/app";

export function usePaddleControls(
  isMovingLeft: Ref<boolean>,
  isMovingRight: Ref<boolean>,
  isBallSend: Ref<boolean>,
  modifAngleY: Ref<number>
) {
  const store = useGameStore();

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      isMovingRight.value = true;
    } else if (event.key === "ArrowLeft") {
      isMovingLeft.value = true;
    } else if (event.key === "ArrowUp" && !isBallSend.value) {
      modifAngleY.value = store.sendBall();
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
export function useUpdatePaddlePosition(
  isMovingRight: Ref<boolean>,
  isMovingLeft: Ref<boolean>,
  paddlePosition: Ref<UnwrapRef<{x: number}>>,
  paddleSpeed: number,
  gameWidth: number,
  paddleWidth: number
) {
  if (isMovingRight.value) {
    paddlePosition.value.x = Math.min(paddlePosition.value.x + paddleSpeed, gameWidth - paddleWidth);
  } else if (isMovingLeft.value) {
    paddlePosition.value.x = Math.max(paddlePosition.value.x - paddleSpeed, 0);
  }
}
