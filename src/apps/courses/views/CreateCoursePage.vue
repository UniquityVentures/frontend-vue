<template>
	<v-container>
		<FormCard
			title="Course"
			actionName="Create"
			:formFields="formFields"
			:action="handleCreateCourse"
		/>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import FormCard from "@/components/FormCard.vue";
import { createCourse } from "../api";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";
import { useRouter } from "vue-router";

const router = useRouter();

const formFields = ref([
	{ label: "Name", type: FIELD_TYPES.STRING, key: "name", required: true },
	{ label: "Description", type: FIELD_TYPES.LONGSTRING, key: "description" },
	{ label: "Teachers", type: FIELD_TYPES.TEACHERS, key: "teachers", required: false },
	{ label: "Batches", type: FIELD_TYPES.BATCHES, key: "batches", required: false },
	{ label: "Is Active", type: FIELD_TYPES.BOOLEAN, key: "is_active", defaultValue: true },
]);

const handleCreateCourse = async (courseData) => {
	try {
		const response = await createCourse(courseData);
		if (response && response.id) {
			router.push({ name: 'Course', params: { courseId: response.id } });
		}
		return { success: true };
	} catch (error) {
		console.error("Failed to create course:", error);
		return { success: false, error };
	}
};
</script>
