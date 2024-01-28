
<template>
  <h1>Login</h1>
  <form @submit.prevent="loginPost(credentials)">
    <input type="text" v-model="credentials.username" placeholder="Email">
    <input type="password" v-model="credentials.password" placeholder="Password">
    <button type="submit">Login</button>
  </form>
  <Suspense>
    <h1 v-if="user">{{user.username}}</h1>
  </Suspense>
  <div>
    <button @click="createCookie()">Créer un Cookie</button>
  </div>
  <div>
    <button @click="createCookieSymfony()">Créer un Cookie Symfony</button>
  </div>

</template>

<script setup lang="ts">
import {loginPost} from "@/api/ApiLogin";
import {createCookieSymfony, getUser} from "@/api/ApiUsers";
import {LoginType} from "@/types/LoginType";
import {onMounted, Ref, ref, UnwrapRef} from "vue";

  const credentials ={
    username: '',
    password: ''
  }
  let user: Ref<UnwrapRef<LoginType>> = ref({});
  onMounted(async ()=> {
    user.value = await getUser("6");
  });

function createCookie() {
  const name = 'testCookie';
  const value = 'HelloWorld';
  const days = 7;
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  alert('Cookie créé!');
}
</script>

<style scoped>

</style>
