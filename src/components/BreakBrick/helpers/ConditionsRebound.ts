import {ballPosition, halfBall} from "@/components/BreakBrick/composables/Ball";
import {paddleHeight, paddlePosition, paddleWidth} from "@/components/BreakBrick/composables/Paddle";

export function  isReboundToLeft(){
  return (
    ballPosition.value.x >= paddlePosition.value.x - halfBall
    && ballPosition.value.x <= paddlePosition.value.x + paddleWidth.value / 2
    && ballPosition.value.y  >= paddlePosition.value.y
    && ballPosition.value.y  <= paddlePosition.value.y + paddleHeight
  );
}
export function isReboundToRight(){
  return (
    ballPosition.value.x >= paddlePosition.value.x + paddleWidth.value / 2
    && ballPosition.value.x <= paddlePosition.value.x + paddleWidth.value + halfBall
    && ballPosition.value.y  >= paddlePosition.value.y
    && ballPosition.value.y  <= paddlePosition.value.y + paddleHeight
  );
}
