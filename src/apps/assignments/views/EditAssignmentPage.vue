<template>
	<v-container>
		<FormCard
			v-if="assignment"
			title="Assignment"
			actionName="Update"
			:formFields="formFields"
			:action="updateAssignment"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getAssignment, updateAssignment } from "../api";
import { apiToFormDateTime } from "@/services/utils";

const props = defineProps({
	assignmentId: {
		type: Number,
		required: true,
	},
});

const assignment = ref(null);

const formFields = ref([
    { label: "Title", type: "string", key: "title", required: true },
    { label: "Description", type: "longstring", key: "description", required: true },
    { label: "Course", type: "course", key: "course", required: true },
    { label: "Due Date", type: "datetime", key: "due_date", required: true },
    { label: "Attachments", type: "attachment_list", key: "attachments", defaultValue: null },
    { label: "Maximum Score", type: "number", key: "max_score", defaultValue: 100 },
    { label: "Passing Score", type: "number", key: "passing_score", defaultValue: 40 },
]);

onMounted(async () => {
	assignment.value = await getAssignment(props.assignmentId);
	// Update model with default values from the existing assignment
	formFields.value = formFields.value.map((field) => ({
		...field,
		defaultValue:
			field.key === "due_date"
				? apiToFormDateTime(assignment.value[field.key])
				: assignment.value[field.key],
	}));
});
</script>
