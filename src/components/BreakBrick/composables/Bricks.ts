// Logique de création des briques
import {Ref} from "vue";

export function useSetupBricks(
  nbBriques: number,
  brickWidth: number,
  gameWidth: number,
  brickLineCount: number,
  brickHeight: number,
  bricks: Ref<[{x:number, y: number, active: boolean}]>
) {
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

export function useNewBrickLine(
  brickLineCount: number,
  gameWidth: number,
  brickWidth: number,
  bricks: Ref<[{x:number, y: number, active: boolean}]>

){
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
