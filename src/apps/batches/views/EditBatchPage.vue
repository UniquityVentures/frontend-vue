<template>
	<v-container v-if="batch">
		<BatchForm
			:batch="batch"
			:action="handleUpdateBatch"
			actionName="Update"
			title="Batch"
			subtitle="Edit Form"
		/>
	</v-container>
	<v-skeleton-loader v-else type="card"></v-skeleton-loader>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getBatch, updateBatch } from "../api";
import BatchForm from "../components/BatchForm.vue";

const props = defineProps({
	batchId: {
		type: [Number, String],
		required: true,
	},
});

const batch = ref(null);

const handleUpdateBatch = async (batchData) => {
	try {
		await updateBatch(batchData);
		return { success: true };
	} catch (error) {
		console.error("Failed to update batch:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	try {
		batch.value = await getBatch(props.batchId);
	} catch (error) {
		console.error("Failed to load batch on mount in EditBatchPage:", error);
	}
});
</script>
