<template>
	<v-container>
		<FormCard
			title="Assignment"
			actionName="Create"
			:formFields="formFields"
			:action="createAssignment"
		/>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import FormCard from "@/components/FormCard.vue";
import { createAssignment } from "@/apps/assignments/api";

const formFields = ref([
    { label: "Title", type: "string", key: "title", required: true },
    { label: "Description", type: "longstring", key: "description", required: true },
    { label: "Course", type: "course", key: "course", required: true },
    { label: "Due Date", type: "datetime", key: "due_date", required: true },
    { label: "Attachments", type: "attachment_list", key: "attachments", defaultValue: null },
    { label: "Maximum Score", type: "number", key: "max_score", defaultValue: 100 },
    { label: "Passing Score", type: "number", key: "passing_score", defaultValue: 40 },
]);
</script>
