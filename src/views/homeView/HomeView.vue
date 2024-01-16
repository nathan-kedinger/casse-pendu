<template>
  <v-card
    class="background-image py- px-auto"
    image="@/views/homeView/assets/fond-ecran.png"
    theme="dark">
      <v-row>
        <v-col cols="1"/>
        <v-col cols="10">
          <PenduViewItem/>
        </v-col>
        <v-col cols="1">
          <button>
            <RouterLink to="classement">Classement</RouterLink>
          </button>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="ms-6">
          <v-row>
            <v-card
              theme="light">
              <ScoresItem />
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
        <v-col cols="9" >
          <BreakBrickView />
        </v-col>
      </v-row>
  </v-card>
</template>

<script lang="ts" setup>
  import BreakBrickView from "@/components/BreakBrick/BreakBrickItem.vue";
  import PenduViewItem from "@/components/PenduItem/PenduViewItem.vue";
  import ScoresItem from "@/components/ScoresItem/ScoresItem.vue";
  import FoundWordsItem from "@/components/FoundWordsItem/FoundWordsItem.vue";
  import BonusItem from "@/components/BonusItem/BonusItem.vue";

  // TODO - Améliorer le visuel : Changer l'apparence des briques, balle et raquette
  // TODO - Améliorer la logique de gain de pièces
  // TODO - Ajouter la logique d'utilisation des pièces
  // TODO - Réduire la longueur du dictionnaire (4 lettres < mot < 10 lettres)
  // TODO - Version en anglais


  //"Des messages cryptés sont envoyés par l'ennemi. Vous devez décrypter ces mots pour gagner de la puissance stratégique sur eux.
  // Cela ne les empechent malheureusement pas de continuer à s'approcher de votre base. Vous récupérez des ressources sur chaque des ennemi détruit.
  // Vous pouvez améliorer votre équipement grâce à ces ressources."
  // modifier le statut ballSend

</script>
<style>
.background-image {
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}
.main-border{
   border-style: inset;
}
</style>
