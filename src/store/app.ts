// Utilities
// store.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    ballSpeedMultiplier : 1,
    scoreMutliplier : 1,
    score : 0,
    bricksMultiplier: 1,
    foundWords: [],
    gameOn: true,
    isBallSend: false,
    timeCount: 0,
    restartGameStatut : false,
    playerCoins: 0,
  }),
  getters: {
    newBallSpeedMutliplier(state: { ballSpeedMultiplier : number}){
      return state.ballSpeedMultiplier
    },
    newScoreMultiplier(state: {scoreMutliplier : number}){
      return state.scoreMutliplier;
    },
    newScore(state: {score: number}){
      return state.score;
    },
    newBricksMultiplier(state: {bricksMultiplier: number}){
      return state.bricksMultiplier;
    },
    newFoundWords(state: {foundWords: any}){
      return state.foundWords;
    },
    newGameOn(state: {gameOn: boolean}){
      return state.gameOn;
    },
    newIsBallSend(state: {isBallSend: boolean}){
      return state.isBallSend;
    },
    newTimeCount(state: {timeCount: number}){
      return state.timeCount;
    },
    newRestartGameStatut(state: {restartGameStatut: boolean}){
      return state.restartGameStatut;
    },
    newPlayerCoins(state: {playerCoins: number}){
      return state.playerCoins;
    },
  },
  actions: {
    speedUpBall() {
      this.ballSpeedMultiplier = this.ballSpeedMultiplier * 1.01;
    },
    stopBall(){
      this.ballSpeedMultiplier = 0;
    },
    multiplyScore(){
      this.scoreMutliplier = this.scoreMutliplier * 2;
    },
    addToScore(bonus: number){
      this.score = this.score + (bonus * this.scoreMutliplier);
    },
    countScore(){
      this.score = this.score + this.scoreMutliplier;
    },
    countTime(){
      this.timeCount = this.timeCount + 1
    },
    speedUpBricks(){
      this.bricksMultiplier = this.bricksMultiplier * 1.1;
    },
    addNewFoundWord(word: string){
      this.newFoundWords.push(word)
    },
    changeGameStatute(){
      this.gameOn = !this.gameOn;
    },
    sendBall(){
      const angle: number = 0.5;
      this.isBallSend = true;
      return angle
    },
    restartGame(){
      this.isBallSend = false;
      this.ballSpeedMultiplier = 1;
      this.scoreMutliplier = 1;
      this.score = 0;
      this.timeCount = 0;
      this.bricksMultiplier = 1
      this.foundWords = [];
      this.gameOn = true;
      this.restartGameStatut = true;
    },
    changeRestartGameStatute(){
      this.restartGameStatut = false;
    },
  }
});
