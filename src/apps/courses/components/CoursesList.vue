<template>
    <v-card>
        <v-card-title v-if="title">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
        <v-card-text>
            <v-list v-if="!loading && limitedItems.length" lines="two">
                <v-list-item v-for="course in limitedItems" :key="course.id"
                    :to="{ name: 'Course', params: { courseId: course.id } }" link class="border">
                    <v-list-item-title>{{ course.name }}</v-list-item-title>
                    <v-list-item-subtitle v-if="course.code">{{ course.code }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>
            <v-skeleton-loader v-if="loading" type="list-item-two-line" v-for="i in limit" :key="i" />
            <div v-if="!loading && limitedItems.length === 0" class="text-center py-4">
                No courses found
            </div>
        </v-card-text>
        <v-card-actions v-if="viewAll" class="justify-center">
            <v-btn :to="viewAll.route">{{ viewAll.label }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { getCourses } from "../api";

const props = defineProps({
	title: String,
	subtitle: String,
	filter: { type: Object, default: {} },
	viewAll: {
		type: Object,
		default: () => ({
			route: { name: "CoursesMaster" },
			label: "View All Courses",
		}),
	},
	limit: { type: Number, default: 5 },
	fetchFunction: {
		type: Function,
		default: getCourses,
	},
});

const items = ref([]);
const loading = ref(true);
const limitedItems = computed(() => items.value.slice(0, props.limit));

onMounted(async () => {
	try {
		loading.value = true;
		const response = await props.fetchFunction(props.filter);
		items.value = response?.results || [];
	} catch (error) {
		console.error("Failed to fetch courses:", error);
	} finally {
		loading.value = false;
	}
});
</script>
