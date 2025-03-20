<template>
	<v-container>
		<FormCard
			title="Batch"
			actionName="Create"
			:formFields="formFields"
			:action="createBatch"
		/>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import FormCard from "@/components/FormCard.vue";
import { createBatch } from "../api";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";
import { useRouter } from "vue-router";

const router = useRouter();

const formFields = ref([
	{ label: "Name", type: FIELD_TYPES.STRING, key: "name", required: true },
	{ label: "Standard", type: FIELD_TYPES.STRING, key: "standard", required: true },
	{ label: "Main Teacher", type: FIELD_TYPES.TEACHER, key: "main_teacher", required: false },
	{ label: "Other Teachers", type: FIELD_TYPES.TEACHERS, key: "other_teachers", required: false },
	{ label: "Courses", type: FIELD_TYPES.COURSES, key: "courses", required: false },
	{ label: "Is Active", type: FIELD_TYPES.BOOLEAN, key: "is_active", defaultValue: true },
]);

const handleCreateBatch = async (batchData) => {
	try {
		const response = await createBatch(batchData);
		// Navigate to the newly created batch
		if (response && response.id) {
			router.push({ name: 'Batch', params: { batchId: response.id } });
		}
		return { success: true };
	} catch (error) {
		console.error("Failed to create batch:", error);
		return { success: false, error };
	}
};
</script>
