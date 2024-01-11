  // Logique de rebond de la balle sur la raquette
  import {isReboundToLeft, isReboundToRight} from "@/components/BreakBrick/helpers/ConditionsRebound";
  import {useGameStore} from "@/store/app";
  import {
  ballPosition, ballSize,
  halfBall,
  modifAngleX,
  modifAngleY,
  xRight,
  yDown
} from "@/components/BreakBrick/composables/Ball";
  import {paddleHeight, paddlePosition, paddleWidth} from "@/components/BreakBrick/composables/Paddle";
  import {brickHeight, bricks, brickWidth} from "@/components/BreakBrick/composables/Bricks";
  import {gameWidth} from "@/components/BreakBrick/composables/GameStructure";

  // Change l'angle de rebond de la balle
  export function useBallReboundPaddleAngle()
  {
    const impactPoint: number = ballPosition.value.x - paddlePosition.value.x;

    // Rebond vers la gauche
    if(isReboundToLeft()) {
      modifAngleX.value = ((paddleWidth.value/2) - impactPoint)/100
      modifAngleY.value = impactPoint/100
    }
    // Rebond vers la droite
    else if(isReboundToRight()){
      modifAngleX.value = (impactPoint - paddleWidth.value/2)/100
      modifAngleY.value = ((paddleWidth.value/2) - (impactPoint - paddleWidth.value/2))/100
    }

    return {
        modifAngleX : modifAngleX,
        modifAngleY: modifAngleY
      }
  }

  /**
   * Modifie la direction de la balle verticalement au contact de la raquette
   *
   */
  export function useBallReboundPaddleVertically(){
    if(ballPosition.value.x >= paddlePosition.value.x
      && ballPosition.value.x <= paddlePosition.value.x + paddleWidth.value + halfBall
      && ballPosition.value.y >= paddlePosition.value.y
      && ballPosition.value.y <= paddlePosition.value.y + paddleHeight
    ) {
      yDown.value = false;
    }
  }

  // Modifie la direction de la balle horizontallement
  export function useBallReboundPaddleHorizontally(){
    // Rebond vers la gauche
    if(isReboundToLeft()) {
      xRight.value = false;
    }
    // Rebond vers la droite
    else if(isReboundToRight()){
      xRight.value = true;
    }
  }

// Logique de rebond de la balle contre les parois
  export function useBallReboundWall(){
    if (ballPosition.value.x >= gameWidth-ballSize/2){
      xRight.value = false;
    } else if (ballPosition.value.x <= ballSize/2){
      xRight.value = true;
    }
    if (ballPosition.value.y <= ballSize/2){
      yDown.value = true;
    }
  }

// Logique d'interraction entre la balle et les briques
  export function useBallReboundBrick(){
    bricks.value.forEach((brique)=>{
      const store = useGameStore();
        if(brique.active){
          // Approche de la balle par le dessous
          if (ballPosition.value.x + halfBall >= brique.x
            && ballPosition.value.x - halfBall <= brique.x + brickWidth
            && ballPosition.value.y - halfBall <= brique.y + brickHeight
            && ballPosition.value.y - halfBall >= brique.y
          ){
            yDown.value = true;
            brique.active = false;
            store.addToScore(100 * store.scoreMutliplier)
          }
          // Approche de la balle par le dessus
          else if (ballPosition.value.x + halfBall >= brique.x
            && ballPosition.value.x - halfBall <= brique.x + brickWidth
            && ballPosition.value.y + halfBall >= brique.y
            && ballPosition.value.y + halfBall <= brique.y + brickHeight
          ){
            yDown.value = false;
            brique.active = false;
            store.addToScore(100 * store.scoreMutliplier)
          }
          // Approche de la balle par la droite
          if(ballPosition.value.y >= brique.y
            && ballPosition.value.y <= brique.y + brickHeight
            && ballPosition.value.x - halfBall <= brique.x + brickWidth
            && ballPosition.value.x - halfBall >= brique.x){
            xRight.value = true;
            brique.active = false;
            store.addToScore(100 * store.scoreMutliplier)
          }
          // Approche de la balle par la gauche
          else if(ballPosition.value.y >= brique.y
            && ballPosition.value.y <= brique.y + brickHeight
            && ballPosition.value.x + halfBall <= brique.x + brickWidth
            && ballPosition.value.x + halfBall >= brique.x){
            xRight.value = false;
            brique.active = false;
            store.addToScore(100 * store.scoreMutliplier)
          }
        }
      }
    )
  }


