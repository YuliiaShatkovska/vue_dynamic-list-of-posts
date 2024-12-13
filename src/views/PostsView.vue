<script setup lang="ts">
import Header from "@/components/Header.vue";
import PostList from "@/components/PostList.vue";

const props = defineProps(["user"]);
const emit = defineEmits(["logout"]);
</script>

<template>
  <Header :user="user" @logout="emit('logout')" />

  <!-- <p>{{ (isLoggedIn, user) }}</p> -->
  <main class="p-6">
    <PostList :user="user" />
  </main>
</template>
