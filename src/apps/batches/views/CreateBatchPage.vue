<template>
	<v-container>
		<BatchForm
			:action="handleCreateBatch"
			actionName="Create"
			title="Batch"
			subtitle="Create Form"
		/>
	</v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { createBatch } from "../api";
import BatchForm from "../components/BatchForm.vue";
import {accountRoute} from "@/services/api";

const router = useRouter();

const handleCreateBatch = async (batchData) => {
	try {
		const response = await createBatch(batchData);
		// Navigate to the newly created batch
		if (response?.id) {
			router.push(accountRoute("Batch", { params: { batchId: response.id } }));
		}
		return { success: true };
	} catch (error) {
		console.error("Failed to create batch:", error);
		return { success: false, error };
	}
};
</script>
