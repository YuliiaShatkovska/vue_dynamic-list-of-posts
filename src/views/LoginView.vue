<script setup>
import { getUser, registerUser } from "@/api/users";
import { validateEmail } from "@/helpers/validateEmail";

import { ref, watch } from "vue";

const emit = defineEmits(["login", "register"]);

const isRegistered = ref(true);

const userEmail = ref("");
const userName = ref("");

const foundUser = ref(null);

const errorEmailMessage = ref("");
const errorNameMessage = ref("");

const findUserEmail = async () => {
  try {
    return await getUser(userEmail.value);
  } catch (e) {
    console.error("error", e);
    return null;
  }
};

const handleSubmit = async () => {
  errorEmailMessage.value = "";
  errorNameMessage.value = "";
  try {
    if (!userEmail.value) {
      errorEmailMessage.value = "Please enter your email";
      return;
    }

    if (!validateEmail(userEmail.value)) {
      errorEmailMessage.value = "Invalid email";
      return;
    }

    foundUser.value = await findUserEmail();

    if (foundUser.value && foundUser.value.length > 0) {
      isRegistered.value = true;
      emit("login", foundUser.value[0]);
    } else {
      isRegistered.value = false;

      if (!userName.value) {
        errorNameMessage.value = "Enter your name";
        return;
      }

      if (userName.value.length < 4) {
        errorNameMessage.value = "Your name should have 4 letters and more";
        return;
      }

      if (userEmail.value && userName.value) {
        const newUser = await registerUser({
          name: userName.value,
          email: userEmail.value,
        });

        emit("register", newUser);
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    foundUser.value = null;
  }
};
</script>

<template>
  <section className="container is-flex is-justify-content-center">
    <form @submit.prevent="handleSubmit" className="box mt-5" novalidate>
      <h1 className="title is-3">
        {{ isRegistered }}
        {{ isRegistered ? "Get your userId" : "You need to register" }}
      </h1>

      <div className="field">
        <label className="label" htmlFor="user-email"> Email </label>

        <div className="control has-icons-left">
          <input
            v-model="userEmail"
            type="email"
            id="user-email"
            name="email"
            className="input"
            placeholder="Enter your email"
            required
            @input="errorEmailMessage = ''"
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>

        <p v-if="errorEmailMessage" className="help is-danger">
          {{ errorEmailMessage }}
        </p>
      </div>

      <div className="field" v-if="!isRegistered">
        <label className="label" htmlFor="user-name"> Your Name </label>

        <div className="control has-icons-left">
          <input
            v-model="userName"
            type="text"
            id="user-name"
            name="name"
            className="input"
            placeholder="Enter your name"
            required
            minlength="4"
            @input="errorNameMessage = ''"
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>

        <p v-if="errorNameMessage" className="help is-danger">
          {{ errorNameMessage }}
        </p>
      </div>

      <div className="field">
        <button type="submit" className="button is-primary">
          {{ isRegistered ? "Login" : "Register" }}
        </button>
      </div>
    </form>
  </section>
</template>
