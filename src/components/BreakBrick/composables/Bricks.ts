// Logique de création des briques
import {ref} from "vue";
import {gameWidth} from "@/components/BreakBrick/helpers/GameUtilities";

export const bricks = ref([{x:0, y: 0, active: true}]);
export const brickWidth = 50;
export const brickHeight = 20;
export const nbBriques = (gameWidth/brickWidth)*3;
export let brickLineCount = 0;
export const bricksMultiplier = ref(1)

export function useSetupBricks() {
  brickLineCount = 0;
  bricks.value = [];
  bricks.value = [{x:0, y: 0, active: true}];
  let brickXPosition = 0;
  let brickYPosition = 0;
  for(let i = 0; i < nbBriques; i++){
    brickXPosition = brickXPosition + brickWidth;
    if((i * brickWidth) - (gameWidth * brickLineCount) >= gameWidth){
      brickLineCount ++
      brickXPosition = 0
    }
    brickYPosition = brickLineCount * brickHeight
    bricks.value.push({
      x:brickXPosition, y:brickYPosition, active: true
    })
  }
}

export function useNewBrickLine(){
  let brickXPosition = 0;
  const nbNouvellesBriques = gameWidth / brickWidth;
  for(let i = 0; i < nbNouvellesBriques; i++){
    bricks.value.push({
      x:brickXPosition, y:-brickHeight, active: true
    })
    brickXPosition = brickXPosition + brickWidth;
  }
  brickLineCount = brickLineCount + 1;
}

export function speedUpBricks(){
  bricksMultiplier.value *= 1.1;
}
