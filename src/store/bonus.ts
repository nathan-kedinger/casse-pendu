// Utilities
// store.js
import { defineStore } from 'pinia';

export const useBonusGameStore = defineStore('gameBonus', {
  state: () => ({
    slowerBall: 1,
    largerPaddle : 100 ,
    playerCoins: 0,
    fasterPaddle: 1

  }),
  getters: {
    newLargerPaddle(state: {largerPaddle: number}){
      return state.largerPaddle
    },
    newPlayerCoins(state: {playerCoins: number}){
      return state.playerCoins;
    },
    newFasterPadlle(state: {fasterPaddle: number}){
      return state.fasterPaddle;
    },
  },
  actions: {
    addCoins(quantity: number) {
      this.playerCoins += quantity;
    },
    removeCoins(quantity: number){
      this.playerCoins -= quantity;
    },
    enlargePaddle(){
      if(this.largerPaddle < 200) {
        this.largerPaddle += 10
        localStorage.setItem('paddleBonusSize', this.newLargerPaddle.toString())
      }
    }
  }
});
