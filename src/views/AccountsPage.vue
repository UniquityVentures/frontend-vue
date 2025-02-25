<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-3">
          <v-card-title class="text-center">
            Select Your Account
          </v-card-title>
          <v-card-text>
            <v-list v-if="accounts.length">
              <v-list-item
                v-for="account in accounts"
                :key="`${account.type}-${account.id}`"
                @click="selectAccount(account)"
                :title="`${account.type} Account`"
                prepend-icon="mdi-account"
                variant="outlined"
                class="rounded-lg ma-2"
              >
              </v-list-item>
            </v-list>
            <div v-else class="text-center">
              No accounts available
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const accounts = ref([]);

onMounted(async () => {
	accounts.value = authStore.user.accounts || [];
});

async function selectAccount(account) {
	await authStore.setActiveAccount(account);
	router.push({ name: "Dashboard" });
}
</script>
