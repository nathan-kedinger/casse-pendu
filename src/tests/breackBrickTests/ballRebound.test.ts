import { describe, it, expect, beforeEach, vi } from 'vitest';
import {Ref, ref, UnwrapRef} from 'vue';
import {
  useBallReboundBrick,
  useBallReboundPaddleAngle, useBallReboundPaddleHorizontally,
  useBallReboundPaddleVertically,
  useBallReboundWall
} from "@/components/BreakBrick/composables/Rebound";

vi.mock('@/store/app', () => ({
  useGameStore: vi.fn(() => ({
    addToScore: vi.fn(),
  })),
}));

describe('useBallReboundPaddleAngle', () => {
  let
    ballPosition: Ref<UnwrapRef<{ x: number, y: number }>>,
    paddlePosition: Ref<UnwrapRef<{ x: number, y: number }>>,
    halfBall: number,
    paddleWidth : Ref<UnwrapRef<number>>,
    paddleHeight : number,
    modifAngleX : Ref<UnwrapRef<number>>,
    modifAngleY : Ref<UnwrapRef<number>>;

  beforeEach(() => {
    // Configuration commune
    halfBall = 15;
    paddleWidth.value = 150;
    paddleHeight = 20;
    modifAngleX = ref(0);
    modifAngleY = ref(0);
  });

  it('calculates rebound angles correctly to the left', () => {
    ballPosition = ref({ x: 10, y: 580 });
    paddlePosition = ref({ x: 0, y: 580 });

    useBallReboundPaddleAngle(paddleWidth, ballPosition);

    expect(modifAngleX.value).toBe(0.65);
    expect(modifAngleY.value).toBe(0.1);
  });

  it('calculates rebound angles correctly vertically', () => {
    ballPosition = ref({ x: paddleWidth.value / 2, y: 580 });
    paddlePosition = ref({ x: 0, y: 580 });

    useBallReboundPaddleAngle(paddleWidth, ballPosition);

    expect(modifAngleX.value).toBe(0);
    expect(modifAngleY.value).toBe(0.75);
  });

  it('calculates rebound angles correctly to the right', () => {
    ballPosition = ref({ x: paddleWidth.value - 10, y: 580 });
    paddlePosition = ref({ x: 0, y: 580 });

    useBallReboundPaddleAngle(paddleWidth, ballPosition);

    expect(modifAngleX.value).toBe(0.65);
    expect(modifAngleY.value).toBe(0.1);
  });
});


// Test de rebond de la balle contre les parois

describe('useBallReboundWalls', () => {
  let
    ballPosition: Ref<UnwrapRef<{x: number, y: number}>>,
    gameWidth : number,
    ballSize: number,
    xRight: Ref<boolean>,
    yDown: Ref<boolean>;

  beforeEach(() => {
    // Configuration commune
    ballSize = 30;
    gameWidth = 800;
    xRight = ref(false);
    yDown = ref(false);
  });

  it('calculates top wall rebound to bottom : accurate', () => {
    ballPosition = ref({x: gameWidth / 2, y: 0});

    useBallReboundWall(ballPosition);

    expect(xRight.value).false;
    expect(yDown.value).true;
  });

  it('calculates top wall rebound to bottom : too far', () => {
    ballPosition = ref({x: gameWidth / 2, y: 20});

    useBallReboundWall(ballPosition);

    expect(xRight.value).false;
    expect(yDown.value).false;
  });

  it('calculates left wall rebound to right : accurate', () => {
    ballPosition = ref({x: 0, y: 300});

    useBallReboundWall(ballPosition);

    expect(xRight.value).true;
    expect(yDown.value).false;
  });

  it('calculates left wall rebound to right : too far', () => {
    ballPosition = ref({x: (ballSize/2) + 1, y: 300});

    useBallReboundWall(ballPosition);

    expect(xRight.value).false;
    expect(yDown.value).false;
  });

  it('calculates right wall rebound to left : accurate', () => {
    ballPosition = ref({x: gameWidth, y: 300});
    xRight = ref(true);

    useBallReboundWall(ballPosition);

    expect(xRight.value).false;
    expect(yDown.value).false;
  });

  it('calculates right wall rebound to right : too far', () => {
    ballPosition = ref({x: gameWidth - (ballSize / 2) + 1, y: 300});
    xRight = ref(true);

    useBallReboundWall(ballPosition);

    expect(xRight.value).false;
    expect(yDown.value).false;
  });
});

describe('useBallReboundPaddleVerticaly', ()=>{
  let ballPosition:  Ref<UnwrapRef<{x: number, y: number}>>,
  paddlePosition: Ref<UnwrapRef<{x: number, y: number}>>,
  halfBall: number,
  paddleWidth: Ref<UnwrapRef<number>>,
  paddleHeight: number,
  yDown: Ref<boolean>;

beforeEach(()=>{
    halfBall= 15;
    paddleWidth.value = 150;
    paddleHeight = 20;
    yDown = ref(true);
  })
  it('calculates left paddle rebound limit: accurate', ()=>{
    ballPosition = ref({x:0, y: paddleHeight});
    paddlePosition = ref({x:0, y: paddleHeight});

    useBallReboundPaddleVertically(paddleWidth, ballPosition);

    expect(yDown.value).false
  })
  it('calculates left paddle rebound limit: too far', ()=>{
    ballPosition = ref({x:-1, y: paddleHeight});
    paddlePosition = ref({x:0, y: paddleHeight});

    useBallReboundPaddleVertically(paddleWidth, ballPosition);

    expect(yDown.value).true
  })
  it('calculates right paddle rebound limit: accurate', ()=>{
    ballPosition = ref({x:paddleWidth.value + halfBall, y: paddleHeight});
    paddlePosition = ref({x:0, y: paddleHeight});

    useBallReboundPaddleVertically(paddleWidth, ballPosition);

    expect(yDown.value).false
  })
  it('calculates right paddle rebound limit: too far', ()=>{
    ballPosition = ref({x:paddleWidth.value+ halfBall + 1, y: paddleHeight});
    paddlePosition = ref({x:0, y: paddleHeight});

    useBallReboundPaddleVertically(paddleWidth, ballPosition);

    expect(yDown.value).true
  })
});


describe('useBallReboundPaddleHorizontally', ()=>{
  let ballPosition:  Ref<UnwrapRef<{x: number, y: number}>>,
    paddlePosition: Ref<UnwrapRef<{x: number, y: number}>>,
    halfBall: number,
    paddleWidth: Ref<UnwrapRef<number>>,
    paddleHeight: number,
    xRight: Ref<boolean>

  beforeEach(()=>{
    halfBall= 15;
    paddleWidth.value = 150;
    paddleHeight = 20;
    xRight = ref(true);
  })
  it('calculates left paddle side rebound limit: accurate', ()=>{
    ballPosition = ref({x:- halfBall, y: paddleHeight});
    paddlePosition = ref({x:0, y: paddleHeight});

    useBallReboundPaddleHorizontally(paddleWidth, ballPosition);

    expect(xRight.value).false
  })
  it('calculates left paddle rebound limit: too far', ()=>{
    ballPosition = ref({x:- halfBall - 1, y: paddleHeight});
    paddlePosition = ref({x:0, y: paddleHeight});

    useBallReboundPaddleHorizontally(paddleWidth, ballPosition);

    expect(xRight.value).true
  })
  it('calculates middle paddle rebound limit: accurate', ()=>{
    ballPosition = ref({x:paddleWidth.value/2 , y: paddleHeight});
    paddlePosition = ref({x:0, y: paddleHeight});

    useBallReboundPaddleHorizontally(paddleWidth, ballPosition);

    expect(xRight.value).false
  })
  it('calculates right paddle rebound limit: accurate', ()=>{
    ballPosition = ref({x:paddleWidth.value/2  + 1, y: paddleHeight});
    paddlePosition = ref({x:0, y: paddleHeight});

    useBallReboundPaddleHorizontally(paddleWidth, ballPosition);

    expect(xRight.value).true
  })
  it('calculates right paddle rebound limit: too far', ()=>{
    ballPosition = ref({x:paddleWidth.value + halfBall + 1, y: paddleHeight});
    paddlePosition = ref({x:0, y: paddleHeight});
    // La balle va déjà vers la gauche et s'approche de la droite de la raquette mais la manque
    xRight.value = false

    useBallReboundPaddleHorizontally(paddleWidth, ballPosition);

    expect(xRight.value).false
  })
});



describe('useBallReboundBrick', () => {
  let
    ballPosition: Ref<UnwrapRef<{x: number, y: number}>>,
    halfBall: number,
    bricks: Ref<UnwrapRef<[{x: number, y: number, active: boolean}]>>,
    brickWidth: number,
    brickHeight: number,
    yDown: Ref<boolean>,
    xRight: Ref<boolean>

  beforeEach(() => {
    halfBall = 15;
    brickWidth = 50;
    brickHeight = 20;
    yDown = ref(true);
    xRight = ref(true);
    bricks = ref([{x: 100, y: 100, active: true}]);
  });
  const testCasesB= [85, 165];
  testCasesB.forEach((xs)=> {
    it('calculates bottom side brick rebound correctly', () => {
      ballPosition = ref({x: xs, y: 120}); // Position just below the brick

      useBallReboundBrick(ballPosition);

      expect(yDown.value).toBe(true); // Should rebound downwards
      expect(bricks.value[0].active).toBe(false); // Brick should be inactive
    });
  });
  const testCasesT= [85, 165];
  testCasesT.forEach((xs)=> {
    it('calculates top side brick rebound correctly', () => {
      ballPosition = ref({x: xs, y: 85}); // Position just above the brick

      useBallReboundBrick(ballPosition);

      expect(yDown.value).toBe(false); // Should rebound upwards
      expect(bricks.value[0].active).toBe(false); // Brick should be inactive
    });
  });
  const testCasesR= [85, 135];
  testCasesR.forEach((xs)=> {
    it('calculates right side brick rebound correctly', () => {
      ballPosition = ref({x: 165, y: xs}); // Position just to the right of the brick

      useBallReboundBrick(ballPosition);

      expect(xRight.value).toBe(true); // Should rebound to the right
      expect(bricks.value[0].active).toBe(false); // Brick should be inactive
    });
  });
const testCasesL= [100, 120];
testCasesL.forEach((xs)=>{
  it('calculates left side brick rebound correctly', () => {
    ballPosition = ref({ x: 85, y: xs }); // Position just to the left of the brick

    useBallReboundBrick(ballPosition);

    expect(xRight.value).false; // Should rebound to the left
    expect(bricks.value[0].active).toBe(false); // Brick should be inactive
  });
});

});
