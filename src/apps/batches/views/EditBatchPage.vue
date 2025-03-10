<template>
	<v-container>
		<FormCard
			v-if="batch"
			:title="`Class: ${batch.name}`"
			actionName="Edit Class"
			:formFields="formFields"
			:action="updateBatch"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getBatch, updateBatch } from "../api";
import { batchDefaultFormFields } from "../config";

const props = defineProps({
	batchId: {
		type: Number,
		required: true,
	},
});

const batch = ref(null);
const formFields = ref(batchDefaultFormFields);

onMounted(async () => {
	batch.value = await getBatch(props.batchId);
	// Update model with default values from the existing batch
	formFields.value = formFields.value.map((field) => ({
		...field,
		defaultValue: batch.value[field.key],
	}));
});
</script>
