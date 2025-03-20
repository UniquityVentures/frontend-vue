<template>
	<v-container>
		<FormCard
			v-if="course"
			title="Course"
			actionName="Update"
			:formFields="formFields"
			:action="updateCourse"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getCourse, updateCourse } from "../api";

const props = defineProps({
	courseId: {
		type: Number,
		required: true,
	},
});

const course = ref(null);

const formFields = ref([
    { label: "Name", type: "string", key: "name", required: true },
    { label: "Description", type: "longstring", key: "description" },
    { label: "Subject", type: "string", key: "subject", required: true },
    { label: "Main Teacher", type: "teacher", key: "main_teacher", required: true },
    { label: "Other Teachers", type: "teacher", key: "other_teachers", multiple: true, defaultValue: [] },
    { label: "Batches", type: "batch", key: "batches", multiple: true, required: true },
    { label: "Is Active", type: "boolean", key: "is_active", defaultValue: true },
]);

onMounted(async () => {
	course.value = await getCourse(props.courseId);
	// Update model with default values from the existing course
	formFields.value = formFields.value.map((field) => ({
		...field,
		defaultValue: course.value[field.key],
	}));
});
</script>
