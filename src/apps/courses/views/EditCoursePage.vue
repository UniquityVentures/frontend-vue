<template>
	<v-container>
		<CourseForm
			v-if="course"
			:course="course"
			:action="handleUpdateCourse"
			actionName="Update"
			title="Course"
		/>
	</v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getCourse, updateCourse } from "../api";
import CourseForm from "../components/CourseForm.vue";
import {accountRoute} from "@/services/api";

const router = useRouter();
const props = defineProps({
	courseId: {
		type: [Number, String],
		required: true,
	},
});

const course = ref(null);

const handleUpdateCourse = async () => {
	try {
		await updateCourse(course.value);
		router.push(
			accountRoute("Course", { params: { courseId: props.courseId } }),
		);
		return { success: true };
	} catch (error) {
		console.error("Failed to update course:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	course.value = await getCourse(props.courseId);
});
</script>
