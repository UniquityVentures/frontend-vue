<template>
	<v-container>
		<FormCard
			v-if="course"
			title="Course"
			actionName="Update"
			:formFields="formFields"
			:action="handleUpdate"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getCourse, updateCourse } from "../api";
import { courseDefaultFormFields } from "@/apps/courses/config";

const props = defineProps({
	courseId: {
		type: Number,
		required: true,
	},
});

const course = ref(null);
const formFields = ref(courseDefaultFormFields);

const handleUpdate = async (formData) => {
	try {
		await updateCourse(props.courseId, formData);
		return { success: true };
	} catch (error) {
		console.error("Failed to update course:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	course.value = await getCourse(props.courseId);
	
	// Use the default form fields from config but add default values from the existing course
	formFields.value = courseDefaultFormFields.map((field) => ({
		...field,
		defaultValue: course.value[field.key],
	}));
});
</script>
