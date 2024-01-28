/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import axios from "axios";

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
// main.js ou main.ts
import '@/assets/fonts/custom-font.css';

const app = createApp(App)

//axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/*axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) { // Erreur d'authentification
    localStorage.removeItem('userToken'); // Supprimez le token expiré
    router.push('/login'); // Redirigez vers la page de connexion
  }
  return Promise.reject(error);
});*/

registerPlugins(app)

app.mount('#app')
