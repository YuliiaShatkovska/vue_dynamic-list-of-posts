<script setup>
import { onBeforeMount, ref } from "vue";

import LoginView from "./views/LoginView.vue";
import PostsView from "./views/PostsView.vue";

import { saveUserToLocalStorage } from "./helpers/saveUserToLocalStorage";

const isLoggedIn = ref(false);

const user = ref(null);

onBeforeMount(() => {
  try {
    const loggedUser = localStorage.getItem("user");

    if (loggedUser) {
      user.value = JSON.parse(loggedUser);
    }

    isLoggedIn.value = JSON.parse(localStorage.getItem("loggedIn")) || false;
  } catch (e) {
    console.error(e);
  }
});

const handleLogin = (userData) => {
  isLoggedIn.value = true;
  user.value = userData;
  saveUserToLocalStorage(userData);
};

const handleRegister = (userData) => {
  isLoggedIn.value = true;
  user.value = userData;
  saveUserToLocalStorage(userData);
};

const handleLogout = () => {
  isLoggedIn.value = false;
  user.value = null;
  localStorage.removeItem("user");
  localStorage.setItem("loggedIn", JSON.stringify(false));
};
</script>

<template>
  <LoginView
    v-if="!isLoggedIn"
    :isLoggedIn="isLoggedIn"
    @login="handleLogin"
    @register="handleRegister"
  />

  <template v-if="isLoggedIn">
    <PostsView :user="user" @logout="handleLogout" />
  </template>
</template>
