<template>
	<v-card v-if="course">
		<v-img :src="getCourseImage()" class="custom-img"></v-img>

		<v-card-title>
			{{ course.name }}
		</v-card-title>
		<v-card-subtitle>
			<p class="text-grey-darken-1">{{ course.description }}</p>
		</v-card-subtitle>

		<v-card-text>
			<span class="text-accent">Teachers:</span><br>
			<TeacherChip v-if="course.teachers_details" :teacher="course.teachers_details" />
		</v-card-text>

		<v-card-text>
			<v-chip color="accent" size="small" label v-if="course.standard">Grade: {{ course.standard }}</v-chip>
			<v-chip :color="course.is_active ? 'success' : 'error'" size="small" label v-if="course.is_active !== undefined">
				Status: {{ course.is_active ? 'Active' : 'Inactive' }}
			</v-chip>
		</v-card-text>
	</v-card>
</template>


<script setup>
import { getCourseImage } from "@/apps/courses/api";
import { getTeacher } from "@/apps/teachers/api";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { ref, watch } from "vue";

const props = defineProps({
	course: {
		type: Object,
		required: true,
	},
});
</script>

<style scoped>
.custom-img {
    object-fit: cover;
}
</style>
