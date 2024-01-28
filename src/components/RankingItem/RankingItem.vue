<template>
  <v-data-table
    :headers="headers"
    :items="users">
  </v-data-table>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
const headers =  [
  {title: 'Email', value: 'email'},
  {title: 'Username', value: 'username'}
]
let users: Ref<LoginType[]> = ref([]);

onMounted(async ()=> {
  users.value = await getUsers();
});
import {LoginType} from "@/types/LoginType";
import {getUsers} from "@/api/ApiUsers";
</script>

<style scoped>

</style>
