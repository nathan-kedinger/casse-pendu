

<template>
  <h1>Inscription</h1>
  <div>
    <input v-model="credentials.username" type="text" placeholder="Email">
    <input v-model="credentials.password" type="password" placeholder="Password">
    <button @click="submitForm()">Register</button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
const baseUrl = import.meta.env.VITE_APP_URL_API ;

const credentials = {
  username: '',
  password: ''
}
function submitForm() {
  axios.post(baseUrl + 'registration', this.credentials)
    .then(response => {
      console.log(response.data);
// Traiter la réponse
    })
    .catch(error => {
      console.error('Erreur d\'authentification', error);
// Gérer l'erreur
    });
}
</script>

<style scoped>

</style>
