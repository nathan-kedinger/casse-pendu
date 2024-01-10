/*
import { expect, test} from "vitest";
import { BreakBrickView } from "@/components/BreakBrick/BreakBrickItem.vue";


test("Test de collision par le dessous", () => {

})
export function testBallReboundBrick(ballPosition, bricks, halfBall, brickWidth, brickHeight, xRight, yDown, ballReboundBrick) {
  // Initialisation des variables nécessaires
  const brick = { x: 200, y: 60, active: true };
  bricks.value = [brick];
  ballPosition.value = { x: 0, y: 0 };

  // Test de collision par le dessous
  ballPosition.value.x = 200; // Centre de la balle aligné avec le centre de la brique
  ballPosition.value.y = 55; // Juste en dessous de la brique
  ballReboundBrick();
  console.log('Test collision par le dessous:', 'xRight:', xRight, 'yDown:', yDown, 'Brique active:', brick.active);

  brick.active = true; // Réactivation de la brique pour le prochain test

  // Test de collision par le dessus
  ballPosition.value.y = 85; // Juste au-dessus de la brique
  ballReboundBrick();
  console.log('Test collision par le dessus:', 'xRight:', xRight, 'yDown:', yDown, 'Brique active:', brick.active);

  brick.active = true;

  // Test de collision par la droite
  ballPosition.value.x = 255; // Juste à droite de la brique
  ballPosition.value.y = 60; // Aligné verticalement avec la brique
  ballReboundBrick();
  console.log('Test collision par la droite:', 'xRight:', xRight, 'yDown:', yDown, 'Brique active:', brick.active);

  brick.active = true;

  // Test de collision par la gauche
  ballPosition.value.x = 145; // Juste à gauche de la brique
  ballReboundBrick();
  console.log('Test collision par la gauche:', 'xRight:', xRight, 'yDown:', yDown, 'Brique active:', brick.active);
}
*/

import {useBallReboundPaddleAngle} from "@/components/BreakBrick/composables/Rebound";
import {ref} from "vue";

export function testBallReboundPaddle(ballSize, paddleWidth, xRight, yDown, modifAngleX, modifAngleY) {
  for (let testValue = 10; testValue <= 200; testValue += 10) {
    // Test pour le rebond vers la gauche
    const halfBall = 15;
    const paddleHeight = 20;
    const ballPosition = ref({ x: testValue, y: 0 });
    const paddlePosition = ref({x: 0, y: 0});
    console.log(`Test Rebond Gauche - Valeur: ${testValue}`);
    useBallReboundPaddleAngle(ballPosition, paddlePosition, halfBall, paddleWidth, paddleHeight);
    console.log(`xRight: ${xRight}, yDown: ${yDown}, modifAngleX: ${modifAngleX.value}, modifAngleY: ${modifAngleY.value}`);

    // Test pour le rebond vers la droite
    ballPosition.value = { x: testValue + paddleWidth, y: 0 };
    paddlePosition.value = { x: 0, y: 0 };
    console.log(`Test Rebond Droite - Valeur: ${testValue}`);
    useBallReboundPaddleAngle(ballPosition, paddlePosition, halfBall, paddleWidth, paddleHeight);
    console.log(`xRight: ${xRight}, yDown: ${yDown}, modifAngleX: ${modifAngleX.value}, modifAngleY: ${modifAngleY.value}`);
  }
}

