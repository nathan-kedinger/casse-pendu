import {Ref, UnwrapRef} from "vue";

export function  isReboundToLeft(
  ballPosition:  Ref<UnwrapRef<{x: number, y: number}>>,
  paddlePosition: Ref<UnwrapRef<{x: number, y: number}>>,
  halfBall: number,
  paddleWidth: number,
  paddleHeight: number,){
  return (
    ballPosition.value.x >= paddlePosition.value.x - halfBall
    && ballPosition.value.x <= paddlePosition.value.x + paddleWidth / 2
    && ballPosition.value.y  >= paddlePosition.value.y
    && ballPosition.value.y  <= paddlePosition.value.y + paddleHeight
  );
}
export function isReboundToRight(
  ballPosition:  Ref<UnwrapRef<{x: number, y: number}>>,
  paddlePosition: Ref<UnwrapRef<{x: number, y: number}>>,
  halfBall: number,
  paddleWidth: number,
  paddleHeight: number){
  return (
    ballPosition.value.x >= paddlePosition.value.x + paddleWidth / 2
    && ballPosition.value.x <= paddlePosition.value.x + paddleWidth + halfBall
    && ballPosition.value.y  >= paddlePosition.value.y
    && ballPosition.value.y  <= paddlePosition.value.y + paddleHeight
  );
}
