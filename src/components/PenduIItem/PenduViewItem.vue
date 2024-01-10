<template>
  <v-card
    width="250"
    theme="light">
    <p> {{ motAafficher.toString().replaceAll(',', ' ') }} {{nombreErreurs}} </p>
  </v-card>

</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {useGameStore} from '@/store/app';
import axios from 'axios'


let lettreChoisie = ref('');
const motATrouver = ref('');
let arrayMotATrouver= ref([]);
let nombreErreurs = ref(0);
let nombreLettreTrouvees = ref(0);
const dictionnaire = ref([]);
const store = useGameStore();
let isLetter: boolean = false;
let isMotTrouve = false;
// Gestion du retour d'affichage et de la progression de découverte du mot
let motAafficher = ref([]);

onMounted(async () => {
    await chargerMots();
    fetchRandomWord();
  window.addEventListener('keydown', handleKeyPress);
  }
);

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});

function handleKeyPress(event){
  if(event.key.length === 1 && event.key.match(/[a-z]/i)){
    lettreChoisie.value = event.key;
    validerMot();
  }
}
function validerMot() {
  let i = 0;
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
            console.log('You win')
            // Ajout de points
            // Appel de la méthode qui efface le mot trouvé et en affiche un nouveau
            isMotTrouve = true;
          }
        }
    i++
  })
  // Logique de réinitialisation du mot lorsqu'il est trouvé
  if(isMotTrouve){
    store.addNewFoundWord(motATrouver.value)
    arrayMotATrouver.value = [];
    motAafficher.value = [];
    nombreLettreTrouvees.value = 0;
    isMotTrouve = false;
    store.multiplyScore();
    fetchRandomWord()
  }
  // Réinitialisation de l'
  lettreChoisie.value = '';
  i=0;
  if(!isLetter) nombreErreurs.value ++;
  store.speedUpBall()
  isLetter = false;
}

async function fetchRandomWord() {
  try {
    let index = Math.round(Math.random()*dictionnaire.value.length);
    motATrouver.value = dictionnaire.value[index];
    arrayMotATrouver.value = [...motATrouver.value]; // Décomposition ici
    arrayMotATrouver.value.forEach(() => motAafficher.value.push('_'));
  } catch (error) {
    console.error("Erreur lors de la récupération du mot :", error);
  }
}

async function chargerMots() {
  try {
    const response = await axios.get('/DEMI.json');
    dictionnaire.value = response.data;
  } catch (error){
    console.error("Erreur lors de la récupération du fichier JSON ", error);
  }
}
</script>
<style scoped>

</style>

