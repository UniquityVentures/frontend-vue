<template>
	<v-card>
		<v-card-item>
			<template v-slot:prepend>
				<v-icon icon="mdi-account-school" size="large" color="accent"></v-icon>
			</template>
			<v-card-title>{{title}} Overview</v-card-title>
		</v-card-item>

		<v-card-text>
			<v-row v-if="loading">
				<v-col cols="12" class="text-center">
					<v-progress-circular indeterminate color="accent"></v-progress-circular>
				</v-col>
			</v-row>
			<v-row v-else-if="error">
				<v-col cols="12" class="text-center text-error">
					Failed to load {{title}} statistics
				</v-col>
			</v-row>
			<v-row v-else>
				<v-col cols="6" v-for="key in Object.keys(stats)">
					<v-card variant="outlined">
						<v-card-item>
							<div class="text-h5 text-accent text-center">{{stats[key]}}</div>
							<div class="text-subtitle-2 text-center">{{toHeaderCase(key)}}</div>
						</v-card-item>
					</v-card>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script setup>
import { toHeaderCase } from "@/services/utils";
import { ref, watch } from "vue";

const stats = ref({});
const loading = ref(true);
const error = ref(false);

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	key: {
		type: Object,
		required: false,
	},
	fetchStats: {
		type: Function,
		required: true,
	},
});


const fetchStats = async () => {
	try {
		loading.value = true;
		error.value = false;
		stats.value = await props.fetchStats();
	} catch (error) {
		console.error(`Error fetching ${props.title} stats:`, error);
		error.value = true;
	} finally {
		loading.value = false;
	}
};

watch(props, fetchStats, {deep: true, immediate: true});

</script>
