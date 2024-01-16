import {halfBall} from "@/components/BreakBrick/composables/Ball";
import {paddleHeight, paddlePosition, paddleWidth} from "@/components/BreakBrick/composables/Paddle";

export function  isReboundToLeft(ballPosition: {x: number, y: number}){

  return (
    ballPosition.x >= paddlePosition.value.x - halfBall
    && ballPosition.x <= paddlePosition.value.x + paddleWidth.value / 2
    && ballPosition.y  >= paddlePosition.value.y
    && ballPosition.y  <= paddlePosition.value.y + paddleHeight
  );
}
export function isReboundToRight(ballPosition: {x: number, y: number}){
  return (
    ballPosition.x >= paddlePosition.value.x + paddleWidth.value / 2
    && ballPosition.x <= paddlePosition.value.x + paddleWidth.value + halfBall
    && ballPosition.y  >= paddlePosition.value.y
    && ballPosition.y  <= paddlePosition.value.y + paddleHeight
  );
}
