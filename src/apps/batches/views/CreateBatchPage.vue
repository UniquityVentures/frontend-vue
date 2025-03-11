<template>
	<v-container>
		<FormCard
			title="Batch"
			actionName="Create"
			:formFields="batchDefaultFormFields"
			:action="createBatch"
		/>
	</v-container>
</template>

<script setup>
import { createBatch } from "@/apps/batches/api";
import { batchDefaultFormFields } from "../config";
import FormCard from "@/components/FormCard.vue";
</script>
