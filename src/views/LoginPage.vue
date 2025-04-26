<template>
  <v-app>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-4">
            <v-card-title>Login</v-card-title>
            <v-card-subtitle>Enter your credentials to login</v-card-subtitle>
            <v-card-text>
              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="username"
                  label="Username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
                
                <v-btn color="primary" block type="submit">
                  Login
                </v-btn>
        
                <v-alert v-if="error" type="error" class="mt-3" dense border="left">
                  {{ error }}
                </v-alert>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { accountRoute } from "@/services/api";

// State
const error = ref("");
const username = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

// Handle form submission directly
async function handleSubmit() {
	try {
		await authStore.login({
			username: username.value,
			password: password.value,
		});
		router.push({ name: "Accounts" });
	} catch (err) {
		console.error(err);
		error.value = "Login failed. Please check your credentials.";
	}
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
