<template>
	<Suspense>
		<v-app>
			<v-navigation-drawer location="right" v-model="rightDrawer" color="accent" > 
				<v-btn :to="{ name: 'All Apps' }" class="ma-4 d-flex justify-center" color="white">
					Go to All Apps
				</v-btn>
				
				<template v-for="(route, index) in routes" :key="index">
					<v-card v-if="route.meta.displayName" class="mb-4 ma-4">
						<v-card-title>{{ route.meta.displayName }}</v-card-title>
					</v-card>
					<span>
						<RecursiveList v-for="item in route.meta.menu" :key="item.id" :item="item" />
					</span>
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
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";

const currentRoute = useRoute();

const { mobile } = useDisplay();
const rightDrawer = ref(!mobile.value);
const routes = ref([]);

watch(
	() => currentRoute, 
	async (route) => {
		routes.value = await currentRouteMeta(route);
	}, 
	{ immediate: true }
);

</script>
