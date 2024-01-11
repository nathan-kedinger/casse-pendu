<template >

  <v-card
    class="background-image"
    image="@/views/homeView/assets/fond-ecran.png"
    theme="dark">
    <v-container>
      <v-row>
        <v-col cols="12">
          <PenduViewItem/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-row>
            <v-card
              theme="light">
              <ScoresItem/>
            </v-card>
          </v-row>
          <v-row>
            <v-col>
              <v-card>
                <FoundWordsItem/>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <BonusItem/>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="10" >
          <BreakBrickView />
        </v-col>
      </v-row>

    </v-container>




  </v-card>

</template>

<script lang="ts" setup>
  import BreakBrickView from "@/components/BreakBrick/BreakBrickItem.vue";
  import PenduViewItem from "@/components/PenduItem/PenduViewItem.vue";
  import ScoresItem from "@/components/ScoresItem/ScoresItem.vue";
  import FoundWordsItem from "@/components/FoundWordsItem/FoundWordsItem.vue";
  import BonusItem from "@/components/BonusItem/BonusItem.vue";


  // Exemple de mise à jour de l'état actif du jeu

  // TODO - Ajouter des bonus à acheter (raquette plus grande)
  // TODO - Regler problème de saturation des briques et de ligne vide lors de l'apparition
  // TODO - Gérer l'enregistrement des scores des joueurs
  // TODO - Améliorer le visuel : Changer l'apparence des briques, balle et raquette

  // TODO - Changer la déclaration des variables du store de place et les éléments inhérants à la logique structurelle


  //"Des messages cryptés sont envoyés par l'ennemi. Vous devez décrypter ces mots pour gagner de la puissance stratégique sur eux.
  // Cela ne les empechent malheureusement pas de continuer à s'approcher de votre base. Vous récupérez des ressources sur chaque des ennemi détruit.
  // Vous pouvez améliorer votre équipement grâce à ces ressources."
  // modifier le statut ballSend



  // Bug constatés : La balle est sortie par le haut avec un multiplicateur de score de 16 et 90 erreurs de touches
</script>
<style>
.background-image {
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}
</style>
