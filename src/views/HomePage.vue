<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <v-card class="elevation-3 pa-4" max-width="500">
      <v-card-title class="text-center">
        Welcome to Lariv-Schools
      </v-card-title>
      <v-card-text class="text-center">
        An ERP system designed for schools.
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="primary" dark to="/login">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
	if (authStore.isAuth) {
		router.push({ name: "Dashboard" });
	}
});
</script>
