<template>
	<v-card>
		<v-card-item>
			<template v-slot:prepend>
				<v-icon icon="mdi-account-school" size="large" color="primary"></v-icon>
			</template>
			<v-card-title>Teachers Overview</v-card-title>
		</v-card-item>

		<v-card-text>
			<v-row v-if="loading">
				<v-col cols="12" class="text-center">
					<v-progress-circular indeterminate color="primary"></v-progress-circular>
				</v-col>
			</v-row>
			<v-row v-else-if="error">
				<v-col cols="12" class="text-center text-error">
					Failed to load teacher statistics
				</v-col>
			</v-row>
			<v-row v-else>
				<v-col cols="6">
					<v-card variant="outlined">
						<v-card-item>
							<div class="text-h4 text-primary text-center">{{ stats.total }}</div>
							<div class="text-subtitle-2 text-center">Total Teachers</div>
						</v-card-item>
					</v-card>
				</v-col>
				<v-col cols="6">
					<v-card variant="outlined">
						<v-card-item>
							<div class="text-h4 text-primary text-center">{{ stats.pending_approval }}</div>
							<div class="text-subtitle-2 text-center">Pending Approval</div>
						</v-card-item>
					</v-card>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script setup>
import { getTeacherStats } from "@/apps/teachers/api";
import { onMounted, ref } from "vue";

const stats = ref({
	total: 0,
	pending_approval: 0,
});
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
	try {
		loading.value = true;
		error.value = false;
		stats.value = await getTeacherStats();
	} catch (error) {
		console.error("Error fetching teacher stats:", error);
		error.value = true;
	} finally {
		loading.value = false;
	}
});
</script>
