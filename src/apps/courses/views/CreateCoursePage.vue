<template>
	<v-container>
		<CourseForm
			:action="handleCreateCourse"
			actionName="Create"
			title="Course"
		/>
	</v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { createCourse } from "../api";
import CourseForm from "../components/CourseForm.vue";

const router = useRouter();

const handleCreateCourse = async (courseData) => {
	try {
		const response = await createCourse(courseData);
		if (response?.id) {
			router.push({ name: "Course", params: { courseId: response.id } });
		}
		return { success: true };
	} catch (error) {
		console.error("Failed to create course:", error);
		return { success: false, error };
	}
};
</script>
