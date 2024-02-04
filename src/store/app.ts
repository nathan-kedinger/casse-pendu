// Utilities
// store.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    scoreMutliplier : 1,
    score : 0,
    gameOn: true,
    gameBegin: false,
    timeCount: 0,
    restartGameStatute : false,
    playerCoins: parseInt(localStorage.getItem('playerMoney') ?? '0'),
  }),
  getters: {
    newScoreMultiplier(state: {scoreMutliplier : number}){
      return state.scoreMutliplier;
    },
    newScore(state: {score: number}){
      return Math.round(state.score/100);
    },
    newGameOn(state: {gameOn: boolean}){
      return state.gameOn;
    },
    newGameBegin(state: {gameBegin: boolean}){
      return state.gameBegin
    },
    newTimeCount(state: {timeCount: number}){
      return state.timeCount;
    },
    newRestartGameStatute(state: {restartGameStatute: boolean}){
      return state.restartGameStatute;
    },
    newPlayerCoins(state: {playerCoins: number}){
      return state.playerCoins;
    },},
  actions: {

    multiplyScore(){
      this.scoreMutliplier += 1;
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
    changeGameStatute(){
      this.gameOn = !this.gameOn;
    },
    beginGame(){
      this.gameBegin = true;
    },
    endGame(){
      this.gameBegin = false;
      this.gameOn = false;
    },
    restartGame(){
      this.scoreMutliplier = 1;
      this.score = 0;
      this.timeCount = 0;
      this.gameOn = true;
      this.restartGameStatute = true;
    },
    changeRestartGameStatute(){
      this.restartGameStatute = false;
    },
    addCoins(quantity: number) {
      this.playerCoins += quantity;
      localStorage.setItem('playerMoney', this.newPlayerCoins.toString())
    },
    removeCoins(quantity: number){
      this.playerCoins -= quantity;
      localStorage.setItem('playerMoney', this.newPlayerCoins.toString())
    },
  }
});
