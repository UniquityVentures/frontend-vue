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
			<span class="text-primary">Teacher:</span><br>
			<TeacherChip v-if="course.main_teacher_details" :teacher="course.main_teacher_details" />
		</v-card-text>

		<v-card-text v-if="otherTeachers && otherTeachers.length">
			<span class="text-primary">Other Teachers:</span><br>
			<TeacherChip v-for="teacher in otherTeachers" :key="teacher.id" :teacher="teacher"/>
		</v-card-text>

		<v-card-text>
			<v-chip color="primary" size="small" label v-if="course.standard">Grade: {{ course.standard }}</v-chip>
			<v-chip :color="course.is_active ? 'success' : 'error'" size="small" label v-if="course.is_active !== undefined">
				Status: {{ course.is_active ? 'Active' : 'Inactive' }}
			</v-chip>
		</v-card-text>
	</v-card>
</template>


<script setup>
import { getCourse, getCourseImage } from "@/apps/courses/api";
import { onMounted, ref } from "vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { getTeacher } from "@/apps/teachers/api";

const props = defineProps({
	course: {
		type: Object,
		required: true
	}
});

const otherTeachers = ref([]);

const fetchOtherTeachers = async () => {
	if (props.course.other_teachers) {
		for (const teacherId of props.course.other_teachers) {
			const teacher = await getTeacher(teacherId);
			otherTeachers.value.push(teacher);
		}
	}
}

onMounted(async () => {
	await fetchOtherTeachers();
});
</script>

<style scoped>
.custom-img {
    object-fit: cover;
}
</style>
