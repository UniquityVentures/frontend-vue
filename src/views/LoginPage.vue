<template>
  <v-app>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <login-form
            :error="error"
            @login="handleLogin"
          ></login-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import LoginForm from "@/components/LoginForm.vue";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const error = ref("");
const router = useRouter();
const authStore = useAuthStore();

async function handleLogin({ username, password }) {
	try {
		await authStore.login({ username, password });
		router.push({ name: "Accounts" });
	} catch (err) {
		error.value = "Login failed. Please check your credentials.";
	}
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
