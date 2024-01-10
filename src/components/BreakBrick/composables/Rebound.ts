  // Logique de rebond de la balle sur la raquette
  import {Ref, UnwrapRef} from "vue";
  import {isReboundToLeft, isReboundToRight} from "@/components/BreakBrick/helpers/ConditionsRebound";
  import {useGameStore} from "@/store/app";

  // Change l'angle de rebond de la balle
  export function useBallReboundPaddleAngle(
    ballPosition:  Ref<UnwrapRef<{x: number, y: number}>>,
    paddlePosition: Ref<UnwrapRef<{x: number, y: number}>>,
    halfBall: number,
    paddleWidth: number,
    paddleHeight: number,
    modifAngleX: Ref<UnwrapRef<number>>,
    modifAngleY: Ref<UnwrapRef<number>>,
    )
  {
    const impactPoint: number = ballPosition.value.x - paddlePosition.value.x;

    // Rebond vers la gauche
    if(isReboundToLeft(ballPosition, paddlePosition, halfBall, paddleWidth, paddleHeight)) {
      modifAngleX.value = ((paddleWidth/2) - impactPoint)/100
      modifAngleY.value = impactPoint/100
    }
    // Rebond vers la droite
    else if(isReboundToRight(ballPosition, paddlePosition, halfBall, paddleWidth, paddleHeight)){
      modifAngleX.value = (impactPoint - paddleWidth/2)/100
      modifAngleY.value = ((paddleWidth/2) - (impactPoint - paddleWidth/2))/100
    }

    return {
        modifAngleX : modifAngleX,
        modifAngleY: modifAngleY
      }
  }

  // Modifie la direction de la balle verticalement au contact de la raquette
  export function useBallReboundPaddleVerticaly(
    ballPosition:  Ref<UnwrapRef<{x: number, y: number}>>,
    paddlePosition: Ref<UnwrapRef<{x: number, y: number}>>,
    halfBall: number,
    paddleWidth: number,
    paddleHeight: number,
    yDown: Ref<boolean>
  ){
    if(ballPosition.value.x >= paddlePosition.value.x
      && ballPosition.value.x <= paddlePosition.value.x + paddleWidth + halfBall
      && ballPosition.value.y >= paddlePosition.value.y
      && ballPosition.value.y <= paddlePosition.value.y + paddleHeight
    ) {
      yDown.value = false;
    }
  }

  // Modifie la direction de la balle horizontallement
  export function useBallReboundPaddleHorizontaly(
    ballPosition:  Ref<UnwrapRef<{x: number, y: number}>>,
    paddlePosition: Ref<UnwrapRef<{x: number, y: number}>>,
    halfBall: number,
    paddleWidth: number,
    paddleHeight: number,
    xRight: Ref<boolean>
  ){
    // Rebond vers la gauche
    if(isReboundToLeft(ballPosition, paddlePosition, halfBall, paddleWidth, paddleHeight)) {
      xRight.value = false;
    }
    // Rebond vers la droite
    else if(isReboundToRight(ballPosition, paddlePosition, halfBall, paddleWidth, paddleHeight)){
      xRight.value = true;
    }
  }

  /*


  // Exécution des tests avec des valeurs arbitraires
  testBallReboundPaddle(ballSize, paddleWidth, paddleHeight);
  */

// Logique de rebond de la balle contre les parois
  export function useBallReboundWall(
    ballPosition: Ref<UnwrapRef<{x: number, y: number}>>,
    gameWidth : number,
    ballSize: number,
    xRight: Ref<boolean>,
    yDown: Ref<boolean>){
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
  export function useBallReboundBrick(
    ballPosition: Ref<UnwrapRef<{x: number, y: number}>>,
    halfBall: number,
    bricks: Ref<UnwrapRef<[{x: number, y: number, active: boolean}]>>,
    brickWidth: number,
    brickHeight: number,
    yDown: Ref<boolean>,
    xRight: Ref<boolean>

  ){
    bricks.value.forEach((brique)=>{
        if(brique.active){
          // Approche de la balle par le dessous
          if (ballPosition.value.x + halfBall >= brique.x
            && ballPosition.value.x - halfBall <= brique.x + brickWidth
            && ballPosition.value.y - halfBall <= brique.y + brickHeight
            && ballPosition.value.y - halfBall >= brique.y
          ){
            yDown.value = true;
            brique.active = false;
            useGameStore().addToScore(100 * useGameStore().scoreMutliplier)
          }
          // Approche de la balle par le dessus
          else if (ballPosition.value.x + halfBall >= brique.x
            && ballPosition.value.x - halfBall <= brique.x + brickWidth
            && ballPosition.value.y + halfBall >= brique.y
            && ballPosition.value.y + halfBall <= brique.y + brickHeight
          ){
            yDown.value = false;
            brique.active = false;
            useGameStore().addToScore(100 * useGameStore().scoreMutliplier)
          }
          // Approche de la balle par la droite
          else if(ballPosition.value.y + halfBall >= brique.y
            && ballPosition.value.y - halfBall <= brique.y + brickHeight
            && ballPosition.value.x - halfBall <= brique.x + brickWidth
            && ballPosition.value.x - halfBall >= brique.x){
            xRight.value = true;
            brique.active = false;
            useGameStore().addToScore(100 * useGameStore().scoreMutliplier)
          }
          // Approche de la balle par la gauche
          else if(ballPosition.value.y + halfBall >= brique.y
            && ballPosition.value.y - halfBall <= brique.y + brickHeight
            && ballPosition.value.x + halfBall >= brique.x
            && ballPosition.value.x + halfBall <= brique.x + brickWidth) {
            xRight.value = false;
            brique.active = false;
            useGameStore().addToScore(100 * useGameStore().scoreMutliplier)
          }
        }
      }
    )
  }


