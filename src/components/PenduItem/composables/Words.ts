import {speedUpBall} from "@/components/BreakBrick/composables/Ball";
import axios from "axios";
import {Ref, ref, UnwrapRef} from "vue";
import {useGameStore} from "@/store/app";

export const lettreChoisie = ref('');
export const motATrouver = ref('');
export const arrayMotATrouver: Ref<string[]> = ref([]);
export const nombreErreurs: Ref<UnwrapRef<number>> = ref(0);
export const nombreLettreTrouvees: Ref<UnwrapRef<number>> = ref(0);
export const dictionnaire: Ref<string[]> = ref([]);
export let isLetter: boolean = false;
export let isMotTrouve = false;
// Gestion du retour d'affichage et de la progression de découverte du mot
export const motAafficher: Ref<string[]> = ref([]);
export const foundWords: Ref<string[]> = ref([]);

export function validerMot() {
  let i = 0;
  const gameStore = useGameStore()
  if(gameStore.newGameBegin){
    arrayMotATrouver.value.forEach((lettreATrouver) => {
      if (lettreATrouver == lettreChoisie.value) {
        // Vérification que la lettre n'est pas déjà trouvée
        if(motAafficher.value[i] != lettreATrouver)
        {
          // Permet de valider le mot par l'équivalence de longueur
          nombreLettreTrouvees.value++;
        }
        // Affichage de la lettre trouvée
        motAafficher.value[i] = lettreATrouver
        isLetter = true;
        // Comparaison de la longueur du mot et du nombre de bonnes lettres trouvées pour valider le mot
        if (nombreLettreTrouvees.value == arrayMotATrouver.value.length) {
          isMotTrouve = true;
        }
      }
      i++
    })
    // Logique de réinitialisation du mot lorsqu'il est trouvé
    if(isMotTrouve){
      addNewFoundWord(motATrouver.value);
      resetWord();
      gameStore.multiplyScore();
      gameStore.addCoins(1)
      fetchRandomWord();

    }
    // Réinitialisation de la lettre
    lettreChoisie.value = '';
    i=0;
    if(!isLetter) {
      speedUpBall()
    }
    isLetter = false;
  }
}

export function resetWord(){
  arrayMotATrouver.value = [];
  motAafficher.value = [];
  nombreLettreTrouvees.value = 0;
  isMotTrouve = false;
}
export function addNewFoundWord(word: string){
  foundWords.value.push(word)
}
export async function fetchRandomWord() {
  try {
    const index = Math.round(Math.random()*dictionnaire.value.length);
    motATrouver.value = dictionnaire.value[index];
    arrayMotATrouver.value = [...motATrouver.value]; // Décomposition ici
    arrayMotATrouver.value.forEach(() => motAafficher.value.push('_'));
  } catch (error) {
    console.error("Erreur lors de la récupération du mot :", error);
  }
}

export async function chargerMots() {
  try {
    const response = await axios.get('/DEMI.json');
    dictionnaire.value = response.data;
  } catch (error){
    console.error("Erreur lors de la récupération du fichier JSON ", error);
  }
}
