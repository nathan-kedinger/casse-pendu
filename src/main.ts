/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
// main.js ou main.ts
import '@/assets/fonts/custom-font.css';

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
