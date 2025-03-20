<template>
	<v-container>
		<FormCard
			v-if="batch"
			title="Batch"
			actionName="Update"
			:formFields="formFields"
			:action="updateBatch"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getBatch, updateBatch } from "../api";

const props = defineProps({
	batchId: {
		type: Number,
		required: true,
	},
});

const batch = ref(null);

const formFields = ref([
    { label: "Name", type: "string", key: "name", required: true },
    { label: "Standard", type: "string", key: "standard", required: true },
    { label: "Section", type: "string", key: "section", required: true },
    { label: "Class Teacher", type: "teacher", key: "class_teacher", required: true },
    { label: "Other Teachers", type: "teacher", key: "other_teachers", multiple: true, defaultValue: [] },
    { label: "Is Active", type: "boolean", key: "is_active", defaultValue: true },
]);

onMounted(async () => {
	batch.value = await getBatch(props.batchId);
	// Update model with default values from the existing batch
	formFields.value = formFields.value.map((field) => ({
		...field,
		defaultValue: batch.value[field.key],
	}));
});
</script>
