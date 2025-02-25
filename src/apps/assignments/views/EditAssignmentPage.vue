<template>
	<v-container>
		<FormCard
			v-if="assignment"
			title="Assignment"
			actionName="Update"
			:model="model"
			:action="updateAssignment"
		/>
	</v-container>
</template>

<script setup>
import { getSubjectInfoFromObj, getSubjects } from "@/apps/subjects/api";
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getAssignment, updateAssignment } from "../api";

const props = defineProps({
	assignmentId: {
		type: Number,
		required: true,
	},
});

const assignment = ref(null);

const formatDateForInput = (dateString) => {
	if (!dateString) return "";
	return new Date(dateString).toISOString().slice(0, 16);
};

const model = ref([
	{
		label: "Title",
		key: "title",
		type: "string",
	},
	{
		label: "Description",
		key: "description",
		type: "longstring",
	},
	{
		label: "Subject",
		key: "subject",
		type: "number",
		fetchOptions: getSubjects,
		fetchOptionsInfo: getSubjectInfoFromObj,
		searchField: "name",
	},
	{
		label: "Release Date",
		key: "release_at",
		type: "datetime",
	},
	{
		label: "Expiry Date",
		key: "expiry_at",
		type: "datetime",
	},
	{
		label: "Is Active",
		key: "is_active",
		type: "boolean",
	},
]);

onMounted(async () => {
	assignment.value = await getAssignment(props.assignmentId);
	// Update model with default values from the existing assignment
	model.value = model.value.map((field) => ({
		...field,
		defaultValue:
			field.key === "release_at" || field.key === "expiry_at"
				? formatDateForInput(assignment.value[field.key])
				: assignment.value[field.key],
	}));
});
</script>
