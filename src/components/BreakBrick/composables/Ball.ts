import {useGameStore} from "@/store/app";
import {ref} from "vue";
import {paddlePosition, paddleWidth} from "@/components/BreakBrick/composables/Paddle";
import {nombreErreurs} from "@/components/PenduItem/composables/Words";
import {gameHeight} from "@/components/BreakBrick/helpers/GameUtilities";
import {gameLoop} from "@/components/BreakBrick/composables/GameStructure";
import {addNewScore} from "@/components/RankingItem/composables/ScoresLogic";

export const ballSize = 30;
export const halfBall = ballSize/2;
export const ballSpeedMultiplier = ref(2);
export const priceBall = 20
export const priceSpeedDownBall = 50


// Position initiale de la balle
export const balls= ref([{
  xRight : true,
  yDown : false,
  isBallSend: false,
  ballSpeed : {
    x: Math.min(Math.sqrt(0) * ballSpeedMultiplier.value, 0.5 * ballSpeedMultiplier.value),
    y: Math.max((1) * ballSpeedMultiplier.value, 0.5 * ballSpeedMultiplier.value)
  },
  ballPosition :{
    x: paddlePosition.value.x + paddleWidth.value/2 + halfBall,
    y: paddlePosition.value.y - 1
  },
  ballOut: false
}])
export function useChangeBallDirection(){

    balls.value.forEach((ball)=>{
      // Position de la balle en début de jeu avant l'envoi
      if(!ball.isBallSend){
        ball.ballPosition.x = paddlePosition.value.x + paddleWidth.value/2 ;
        ball.ballPosition.y = paddlePosition.value.y - 1
      }
      // Direction abcisses
      if (ball.xRight){
        ball.ballPosition.x += ball.ballSpeed.x
      } else {
        ball.ballPosition.x -= ball.ballSpeed.x
      }
      // Direction ordonnées
      if (!ball.yDown){
        ball.ballPosition.y -= ball.ballSpeed.y
      } else {
        ball.ballPosition.y += ball.ballSpeed.y
      }
    })
}

export function useBallControls() {
  return (event: KeyboardEvent) => {
    balls.value.forEach((ball)=>{
      if (event.key === "ArrowUp" && !ball.isBallSend) {
        if(!useGameStore().newGameBegin){
          useGameStore().beginGame();
          gameLoop();
        }
        ball.ballSpeed.y = 0.9;
        ball.ballSpeed.x = 0.1;
        ball.isBallSend = true;
      }
    })
  };
}

export function useOutOfBound(){
  const gameStore = useGameStore();
  balls.value.forEach((ball)=>{
    if (ball.ballPosition.y >= gameHeight + halfBall ){
      ball.ballOut = true
      stopBall(ball.ballSpeed);
    }
  })
  const allBallsOut = balls.value.find((ball)=> ball.ballOut === false)
  if(allBallsOut === undefined){
    addNewScore(gameStore.newScore);
    gameStore.endGame();
  }
}

// Crée une nouvelle balle
export function newBall(coins: number){
  const activeBalls = balls.value.filter((ball)=>
    !ball.ballOut
  )
  const newBall = {
    xRight: true,
    yDown: true,
    isBallSend : false,
    ballSpeed: {
      x: Math.min(Math.sqrt(0) * ballSpeedMultiplier.value, 0.5 * ballSpeedMultiplier.value),
      y: Math.max(1 * ballSpeedMultiplier.value, 0.5 * ballSpeedMultiplier.value)
    },
    ballPosition: {
      x: paddlePosition.value.x + paddleWidth.value / 2 - halfBall, // Ajustez en fonction de la taille de votre balle
      y: paddlePosition.value.y - 1
    },
    ballOut: false
  };
  if(activeBalls.length < 15 && coins >= priceBall){
    balls.value.push(newBall);
    useGameStore().removeCoins(priceBall)
  }
}

// Accélère la vitesse de la balle
export function speedUpBall() {
  if (ballSpeedMultiplier.value < 23) {
    ballSpeedMultiplier.value = ballSpeedMultiplier.value * 1.01;
  }
  nombreErreurs.value += 1;
}

// Ralenti la vitesse de la balle
export function speedDownBall(){
  if(ballSpeedMultiplier.value > 1.25 && useGameStore().newPlayerCoins > priceSpeedDownBall) {
    ballSpeedMultiplier.value -= 0.5;
    useGameStore().removeCoins(priceSpeedDownBall)
  }
}

// Arrête toutes les balles
export function stopAllBalls(){
  ballSpeedMultiplier.value = 0;
}

// Arrêter une balle

export function stopBall(ballSpeed: {x: number, y: number}){
  ballSpeed.x = 0;
  ballSpeed.y = 0;
}
