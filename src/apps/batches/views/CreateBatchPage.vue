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
import { createBatch } from "@/apps/batches/api";

const formFields = ref([
    { label: "Name", type: "string", key: "name", required: true },
    { label: "Standard", type: "string", key: "standard", required: true },
    { label: "Section", type: "string", key: "section", required: true },
    { label: "Class Teacher", type: "teacher", key: "class_teacher", required: true },
    { label: "Other Teachers", type: "teacher", key: "other_teachers", multiple: true, defaultValue: [] },
    { label: "Is Active", type: "boolean", key: "is_active", defaultValue: true },
]);
</script>
