import {playersScores} from "@/components/RankingItem/helpers/PlayersScores";

export function addNewScore(score: number){
  playersScores.value.push({score})
}
