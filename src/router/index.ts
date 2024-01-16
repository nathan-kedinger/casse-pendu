import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/homeView/HomeView.vue";
import RankingView from "@/views/rankingView/RankingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/classement',
      name: 'classement',
      component: RankingView
    },

  ]
})

export default router
