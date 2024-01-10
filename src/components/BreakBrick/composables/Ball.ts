import {Ref, UnwrapRef} from "vue";
import {useGameStore} from "@/store/app";

export function useChangeBallDirection(
  isBallSend: Ref<boolean>,
  ballPosition: Ref<UnwrapRef<{ x: number, y: number }>>,
  paddlePosition: Ref<UnwrapRef<{ x: number, y: number }>>,
  paddleWidth: number,
  xRight: Ref<boolean>,
  yDown: Ref<boolean>,
  ballSpeed: Ref<UnwrapRef<{ x: number, y: number }>>
){
  // Position de la balle en début de jeu avant l'envoi ?
  if(!isBallSend.value){
    ballPosition.value.x = paddlePosition.value.x + paddleWidth/2 ;
    ballPosition.value.y = paddlePosition.value.y - 1
  }
  // Direction abcisses
  if (xRight.value){
    ballPosition.value.x += ballSpeed.value.x
  } else {
    ballPosition.value.x -= ballSpeed.value.x
  }
  // Direction ordonnées
  if (!yDown.value){
    ballPosition.value.y -= ballSpeed.value.y
  } else {
    ballPosition.value.y += ballSpeed.value.y
  }
}
export function useOutOfBound(
  ballPosition: Ref<UnwrapRef<{ x: number, y: number }>>,
  gameHeight: number
){
  const store = useGameStore();
  if (ballPosition.value.y >= gameHeight ){
    store.changeGameStatute();
    store.stopBall();
  }
}
