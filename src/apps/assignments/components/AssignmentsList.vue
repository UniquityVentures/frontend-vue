<template>
    <v-card>
        <v-card-title v-if="title">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
        <v-card-text>
            <v-list v-if="!loading && limitedItems.length" lines="two" density="compact">
                <v-list-item v-for="item in limitedItems" :key="item.id"
                    :to="{ name: 'Assignment', params: { assignmentId: item.id } }" link class="border">
                    <v-list-item-title>{{ item.title || 'Title loading...' }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.description || 'Description loading...' }}</v-list-item-subtitle>
					<DateChip v-if="item.due_date" label="Due" color="primary" :date="item.due_date" />
                </v-list-item>
            </v-list>
			<span v-if="loading">
				<v-skeleton-loader type="list-item-three-line" v-for="i in limit" :key="i" />
			</span>
            <div v-if="!loading && limitedItems.length === 0" class="text-center py-4">
                No assignments found
            </div>
        </v-card-text>
        <v-card-actions v-if="viewAll" class="justify-center">
            <v-btn :to="viewAll.route">{{ viewAll.label }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { formatDate } from "@/services/utils";
import { computed, onMounted, ref } from "vue";
import { getAssignments } from "../api";

const props = defineProps({
	title: String,
	subtitle: String,
	filter: { type: Object, default: () => ({}) },
	viewAll: {
		type: Object,
		default: () => ({
			route: { name: "Assignments" },
			label: "View All Assignments",
		}),
	},
	limit: { type: Number, default: 5 },
});

const items = ref([]);
const loading = ref(true);
const limitedItems = computed(() => items.value.slice(0, props.limit));

onMounted(async () => {
	try {
		loading.value = true;
		const response = await getAssignments(props.filter);
		items.value = response?.results || [];
	} catch (error) {
		console.error("Failed to fetch assignments:", error);
	} finally {
		loading.value = false;
	}
});
</script>
