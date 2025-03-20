<template>
	<v-container>
		<FormCard
			v-if="batch"
			title="Batch"
			actionName="Update"
			:formFields="formFields"
			:action="handleUpdateBatch"
		/>
		<v-skeleton-loader v-else type="card"></v-skeleton-loader>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getBatch, updateBatch } from "../api";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
	batchId: {
		type: [Number, String],
		required: true,
	},
});

const batch = ref(null);
const formFields = ref([
	{ label: "Name", type: FIELD_TYPES.STRING, key: "name", required: true },
	{ label: "Standard", type: FIELD_TYPES.STRING, key: "standard", required: true },
	{ label: "Main Teacher", type: FIELD_TYPES.TEACHER, key: "main_teacher", required: false },
	{ label: "Other Teachers", type: FIELD_TYPES.TEACHERS, key: "other_teachers", required: false },
	{ label: "Courses", type: FIELD_TYPES.COURSES, key: "courses", required: false },
	{ label: "Is Active", type: FIELD_TYPES.BOOLEAN, key: "is_active" },
]);

const handleUpdateBatch = async (batchData) => {
	try {
		await updateBatch(props.batchId, batchData);
		router.push({ name: 'Batch', params: { batchId: props.batchId } });
		return { success: true };
	} catch (error) {
		console.error("Failed to update batch:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	try {
		batch.value = await getBatch(props.batchId);
		// Update model with default values from the existing batch
		formFields.value = formFields.value.map((field) => ({
			...field,
			defaultValue: batch.value[field.key],
		}));
	} catch (error) {
		console.error("Failed to load batch:", error);
	}
});
</script>
