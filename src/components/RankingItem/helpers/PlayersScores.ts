import {Ref, ref, UnwrapRef} from "vue";

export const playersScores:Ref<UnwrapRef<[{score : number}]>>  = ref<UnwrapRef<[{ score: number }]>>([{score:0}]);
