<template>
	<Suspense>
		<v-app>
			<v-navigation-drawer app v-model="leftDrawer" color="secondary">
				<v-list dense>
					<v-list-item>
						<v-card class="mb-4" :title="user.first_name + ' ' + user.last_name"
							:subtitle="account?.group_details?.name || 'No linked account'">
							<template v-slot:append>
								<v-btn icon="mdi-logout" @click="logoutHandler" size="small" variant="text" />
							</template>
						</v-card>
					</v-list-item>

					<v-list-item :to="{ name: 'Dashboard' }">
						<v-list-item-title>Dashboard</v-list-item-title>
					</v-list-item>
					<v-divider class="mb-4"></v-divider>
					<RecursiveList v-for="item in appsMenu" :item="item" />

				</v-list>
			</v-navigation-drawer>
			<v-app-bar app color="primary" dark>
				<v-app-bar-nav-icon @click.stop="leftDrawer = !leftDrawer"></v-app-bar-nav-icon>
				<v-toolbar-title>School ERP Dashboard</v-toolbar-title>
			</v-app-bar>
			<v-main>
				<slot>
					<router-view></router-view>
				</slot>
			</v-main>
		</v-app>
		<template #fallback>
			Loading...
		</template>
	</Suspense>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useRouter } from "vue-router";
import RecursiveList from "@/components/RecursiveList.vue";
import adminRoutes from "@/router/adminApps";
import studentRoutes from "@/router/studentApps";
import { getAppsMeta } from "@/router/menu";

const { mdAndUp } = useDisplay();
const leftDrawer = ref(mdAndUp.value);
const router = useRouter();
const authStore = useAuthStore();
const appsMenu = ref();
const user = computed(() => authStore.user);
const account = computed(() => authStore.account);

function logoutHandler() {
	router
	.push({ name: "Login" })
	.then(() => {
		authStore.logout();
	})
	.catch((error) => {
		console.error("Navigation failed:", error);
		authStore.logout(); 
	});
}

// Choose routes based on account type
let routesToUse = studentRoutes; // Default to student routes

// Check account type and select appropriate routes
if (account.value?.group_details?.name === "Admin") {
	routesToUse = adminRoutes;
}

getAppsMeta(routesToUse).then((menu) => {
	appsMenu.value = menu;
});
</script>
