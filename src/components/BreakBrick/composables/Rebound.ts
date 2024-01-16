  // Logique de rebond de la balle sur la raquette
  import {isReboundToLeft, isReboundToRight} from "@/components/BreakBrick/helpers/ConditionsRebound";
  import {useGameStore} from "@/store/app";
  import {
  balls,
  ballSize, ballSpeedMultiplier,
  halfBall,
} from "@/components/BreakBrick/composables/Ball";
  import {paddleHeight, paddlePosition, paddleWidth} from "@/components/BreakBrick/composables/Paddle";
  import {brickHeight, bricks, brickWidth} from "@/components/BreakBrick/composables/Bricks";
  import {gameWidth} from "@/components/BreakBrick/helpers/GameUtilities";

  // Change l'angle de rebond de la balle
  export function useBallReboundPaddleAngle()
  {
    balls.value.forEach((ball)=>{

    const impactPoint: number = ball.ballPosition.x - paddlePosition.value.x;

    // Rebond vers la gauche
    if(isReboundToLeft(ball.ballPosition)) {
      ball.ballSpeed.x = Math.min(Math.sqrt(((paddleWidth.value/2) - impactPoint)/paddleWidth.value) * ballSpeedMultiplier.value, 0.5 * ballSpeedMultiplier.value)
      ball.ballSpeed.y = Math.max((impactPoint/paddleWidth.value) * ballSpeedMultiplier.value, 0.5 * ballSpeedMultiplier.value)
    }
    // Rebond vers la droite
    else if(isReboundToRight(ball.ballPosition)){
      ball.ballSpeed.x = Math.min(Math.sqrt((impactPoint - paddleWidth.value/2)/paddleWidth.value) * ballSpeedMultiplier.value, 0.5 * ballSpeedMultiplier.value)
      ball.ballSpeed.y = Math.max((((paddleWidth.value/2) - (impactPoint - paddleWidth.value/2))/paddleWidth.value) * ballSpeedMultiplier.value, 0.5 * ballSpeedMultiplier.value)
    }
  })
  }

  /**
   * Modifie la direction de la balle verticalement au contact de la raquette
   *
   */
  export function useBallReboundPaddleVertically(){
    balls.value.forEach((ball)=>{
      if(ball.ballPosition.x >= paddlePosition.value.x
        && ball.ballPosition.x <= paddlePosition.value.x + paddleWidth.value + halfBall
        && ball.ballPosition.y >= paddlePosition.value.y
        && ball.ballPosition.y <= paddlePosition.value.y + paddleHeight
      ) {
        ball.yDown = false;
      }
    })
  }

  // Modifie la direction de la balle horizontallement
  export function useBallReboundPaddleHorizontally(){
    balls.value.forEach((ball)=>{
      // Rebond vers la gauche
      if(isReboundToLeft(ball.ballPosition)) {
        ball.xRight = false;
      }
      // Rebond vers la droite
      else if(isReboundToRight(ball.ballPosition)){
        ball.xRight = true;
      }
    })
  }

  // Logique de rebond de la balle contre les parois
  export function useBallReboundWall(){
    balls.value.forEach((ball)=>{
      if (ball.ballPosition.x >= gameWidth-ballSize/2){
        ball.xRight = false;
      } else if (ball.ballPosition.x <= ballSize/2){
        ball.xRight = true;
      }
      if (ball.ballPosition.y <= ballSize/2){
        ball.yDown = true;
      }
    })
  }

  // Logique d'interraction entre la balle et les briques
  export function useBallReboundBrick(){
    const gameStore = useGameStore();
    balls.value.forEach((ball)=>{
      bricks.value.forEach((brique)=>{
          if(brique.active){
            // Approche de la balle par le dessous
            if (ball.ballPosition.x + halfBall >= brique.x
              && ball.ballPosition.x - halfBall <= brique.x + brickWidth
              && ball.ballPosition.y - halfBall <= brique.y + brickHeight
              && ball.ballPosition.y - halfBall >= brique.y
            ){
              ball.yDown = true;
              brique.active = false;
              gameStore.addToScore(100 * gameStore.scoreMutliplier)
              gameStore.addCoins(1)
            }
            // Approche de la balle par le dessus
            else if (ball.ballPosition.x + halfBall >= brique.x
              && ball.ballPosition.x - halfBall <= brique.x + brickWidth
              && ball.ballPosition.y + halfBall >= brique.y
              && ball.ballPosition.y + halfBall <= brique.y + brickHeight
            ){
              ball.yDown = false;
              brique.active = false;
              gameStore.addToScore(100 * gameStore.scoreMutliplier)
              gameStore.addCoins(1)
            }
            // Approche de la balle par la droite
            if(ball.ballPosition.y >= brique.y
              && ball.ballPosition.y <= brique.y + brickHeight
              && ball.ballPosition.x - halfBall <= brique.x + brickWidth
              && ball.ballPosition.x - halfBall >= brique.x){
              ball.xRight = true;
              brique.active = false;
              gameStore.addToScore(100 * gameStore.scoreMutliplier)
              gameStore.addCoins(1)
            }
            // Approche de la balle par la gauche
            else if(ball.ballPosition.y >= brique.y
              && ball.ballPosition.y <= brique.y + brickHeight
              && ball.ballPosition.x + halfBall <= brique.x + brickWidth
              && ball.ballPosition.x + halfBall >= brique.x){
              ball.xRight = false;
              brique.active = false;
              gameStore.addToScore(100 * gameStore.scoreMutliplier)
              gameStore.addCoins(1)
            }
          }
        }
      )
})

  }
