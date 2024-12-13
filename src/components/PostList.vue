<script setup>
import { getUserPosts } from "@/api/posts";
import { onMounted, ref } from "vue";
import Loader from "./Loader.vue";

const props = defineProps(["user"]);
const posts = ref([]);
const errorMessage = ref("");
const isLoading = ref(false);
console.log(props.user.id);

onMounted(async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    posts.value = await getUserPosts(props.user.id);
  } catch (e) {
    errorMessage.value = "Unable to load posts";
  } finally {
    isLoading.value = false;
  }
});

console.log(posts);
</script>

<template>
  <div class="tile is-parent">
    <Loader v-if="isLoading" />

    <template v-else>
      <div class="tile is-child box is-success">
        <div class="block">
          <div class="block is-flex is-justify-content-space-between">
            <p class="title">Posts</p>
            <button type="button" class="button is-link">Add New Post</button>
          </div>

          <table
            class="table is-fullwidth is-striped is-hoverable is-narrow"
            v-if="posts.length > 0"
          >
            <thead>
              <tr class="has-background-link-light">
                <th>ID</th>
                <th>Title</th>
                <th class="has-text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post of posts">
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
                <td class="has-text-right is-vcentered">
                  <button type="button" class="button is-link">Open</button>
                </td>
              </tr>
            </tbody>
          </table>

          <p class="mt-2 has-text-centered" v-else>No posts yet</p>
        </div>
      </div>
    </template>
  </div>
</template>
