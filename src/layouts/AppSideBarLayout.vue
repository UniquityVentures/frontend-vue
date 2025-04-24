<template>
	<Suspense>
		<v-app>
			<v-navigation-drawer app location="end" v-model="rightDrawer" color="secondary" :temporary="mobile">
				<v-btn :to="{ name: 'All Apps' }" class="ma-4 d-flex justify-center">
					<template v-slot:default>
						Go to All Apps
					</template>
				</v-btn>

				<template v-for="(route, index) in reversedRoutes" :key="index">
					<v-card v-if="route.meta.displayName" class="mb-4 ma-4">
						<v-card-title>{{ route.meta.displayName }}</v-card-title>
					<v-card-text>
						<RecursiveList v-for="item in route.meta.menu" :key="item.id" :item="item" />
					</v-card-text>
					</v-card>
				</template>
			</v-navigation-drawer>
			<v-fab app location="right top" @click="rightDrawer = !rightDrawer" icon>
				<v-icon>{{ rightDrawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
			</v-fab>
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
import RecursiveList from "@/components/RecursiveList.vue";
import { currentRouteMeta } from "@/router/menu";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";

const currentRoute = useRoute();

const { mobile } = useDisplay();
const rightDrawer = ref(!mobile.value);
const routes = ref([]);

const reversedRoutes = computed(() => [...routes.value].reverse());

watch(
	() => currentRoute.fullPath,
	async () => {
		routes.value = await currentRouteMeta(currentRoute);
	},
	{ immediate: true },
);
</script>

<style>
/* prevent horizontal scrolling */
html, body {
  overflow-x: hidden !important;
  width: 100% !important;
  position: relative;
}

.v-application {
  overflow-x: hidden !important;
}

.v-application__wrap {
  overflow-x: hidden !important;
}

/* Force navigation drawer to stay within viewport */
.v-navigation-drawer {
  max-width: 100vw !important;
}
</style>