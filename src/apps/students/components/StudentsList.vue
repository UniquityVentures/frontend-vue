<template>
    <v-card>
        <v-card-title v-if="title">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
        <v-card-text>
            <v-list v-if="!loading && limitedItems.length" lines="two" density="compact">
                <v-list-item v-for="student in limitedItems" :key="student.id"
                    :to="{ name: 'Student', params: { studentId: student.id } }" link class="border">
                    <v-list-item-title>{{ student.user_details?.full_name || 'Unnamed Student' }}</v-list-item-title>
                    <v-list-item-subtitle>{{ student.student_no || 'No student number' }}</v-list-item-subtitle>
                    <div class="d-flex gap-2 mt-2">
                        <v-chip v-if="student.status" color="accent" size="small">
                            {{ student.status }}
                        </v-chip>
                        <v-chip v-if="student.grade_level" color="secondary" size="small">
                            Grade {{ student.grade_level }}
                        </v-chip>
                        <BatchChip v-if="student.batch_details" :batch="student.batch_details" size="small" />
                    </div>
                </v-list-item>
            </v-list>
            <v-skeleton-loader v-if="loading" type="list-item-three-line" v-for="i in limit" :key="i" />
        </v-card-text>
        <v-card-actions v-if="viewAll" class="justify-center">
            <v-btn :to="viewAll.route">{{ viewAll.label }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import BatchChip from "@/apps/batches/components/BatchChip.vue";
import { getStudents } from "@/apps/students/api";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
	title: String,
	subtitle: String,
	filter: { type: Object, default: () => ({}) },
	viewAll: {
		type: Object,
		default: () => ({
			route: { name: "Students" },
			label: "View All Students",
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
		const response = await getStudents(props.filter);
		items.value = response?.results || [];
	} catch (error) {
		console.error("Failed to fetch students:", error);
	} finally {
		loading.value = false;
	}
});
</script> 