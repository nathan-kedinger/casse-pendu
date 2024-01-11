import {computed, ref} from "vue";
import {useGameStore} from "@/store/app";
import {paddlePosition, paddleWidth} from "@/components/BreakBrick/composables/Paddle";
import {gameHeight, gameStore} from "@/components/BreakBrick/composables/GameStructure";

export const isBallSend = computed(()=>
  gameStore.newIsBallSend
);
export const ballSize = 30;
export const halfBall = ballSize/2;

export const modifAngleX = ref(0);
export const modifAngleY = ref(0);
export const ballSpeed = computed(() => {
  return {
    x: Math.min(Math.sqrt(modifAngleX.value) * gameStore.newBallSpeedMutliplier, 0.5 * gameStore.newBallSpeedMutliplier),
    y: Math.max((modifAngleY.value ) * gameStore.newBallSpeedMutliplier, 0.5 * gameStore.newBallSpeedMutliplier)
  };
});
export const xRight = ref(true);
export const yDown = ref(true);
export const ballPosition = ref({
  x: paddlePosition.value.x + paddleWidth.value/2 + halfBall,
  y: paddlePosition.value.y - 1}); // Position initiale de la balle
export function useChangeBallDirection(){
  // Position de la balle en début de jeu avant l'envoi ?
  if(!isBallSend.value){
    ballPosition.value.x = paddlePosition.value.x + paddleWidth.value/2 ;
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
export function useOutOfBound(){
  const store = useGameStore();
  if (ballPosition.value.y >= gameHeight ){
    store.changeGameStatute();
    store.stopBall();
  }
}
