// Logique de création des briques
import {ref} from "vue";
import {gameWidth} from "@/components/BreakBrick/composables/GameStructure";

export const bricks = ref([{x:0, y: 0, active: true}]);
export const brickWidth = 50;
export const brickHeight = 20;
export const nbBriques = (gameWidth/brickWidth)*5;
export let brickLineCount = 0;

export function useSetupBricks() {
  let brickXPosition = 0;
  let brickYPosition = 0;
  for(let i = 0; i < nbBriques; i++){
    brickXPosition = brickXPosition + brickWidth;
    if((i*brickWidth) - (gameWidth * brickLineCount) >= gameWidth){
      brickLineCount ++
      brickXPosition = 0
    }

    brickYPosition = brickLineCount*brickHeight
    bricks.value.push({
      x:brickXPosition, y:brickYPosition, active: true
    })
  }
}

export function useNewBrickLine(){
  brickLineCount = brickLineCount + 1;
  let brickXPosition = 0;
  const nbNouvellesBriques = gameWidth/brickWidth;
  for(let i = 0; i < nbNouvellesBriques; i++){
    bricks.value.push({
      x:brickXPosition, y:0, active: true
    })
    brickXPosition = brickXPosition + brickWidth;
  }
}
