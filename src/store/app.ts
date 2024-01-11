// Utilities
// store.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    ballSpeedMultiplier : 1,
    mistakes: 0,
    scoreMutliplier : 1,
    score : 0,
    bricksMultiplier: 1,
    foundWords: [],
    gameOn: true,
    isBallSend: false,
    timeCount: 0,
    restartGameStatut : false,

  }),
  getters: {
    newBallSpeedMutliplier(state: { ballSpeedMultiplier : number}){
      return state.ballSpeedMultiplier
    },
    newMistakes(state: {mistakes: number}){
      return state.mistakes;
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
  },
  actions: {
    speedUpBall() {
      if (this.ballSpeedMultiplier < 23) {
        this.ballSpeedMultiplier = this.ballSpeedMultiplier * 1.01;
      }
      this.mistakes += 1;
    },
    speedDownBall(){
      if(this.ballSpeedMultiplier > 1.25) {
        this.ballSpeedMultiplier -= 0.5;
      }
    },
    stopBall(){
      this.ballSpeedMultiplier = 0;
    },
    multiplyScore(){
      this.scoreMutliplier *=  2;
    },
    addToScore(bonus: number){
      this.score += (bonus * this.scoreMutliplier);
    },
    countScore(){
      this.score += this.scoreMutliplier;
    },
    countTime(){
      this.timeCount += 1
    },
    speedUpBricks(){
      this.bricksMultiplier *= 1.1;
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
