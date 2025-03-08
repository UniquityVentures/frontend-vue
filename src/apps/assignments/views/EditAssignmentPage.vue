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
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getAssignment, updateAssignment } from "../api";
import { assignmentDefaultFormFields } from "../config";
import { apiToFormDateTime } from "@/services/utils";

const props = defineProps({
	assignmentId: {
		type: Number,
		required: true,
	},
});

const assignment = ref(null);
const model = ref([]);

onMounted(async () => {
	assignment.value = await getAssignment(props.assignmentId);
	// Update model with default values from the existing assignment
	model.value = assignmentDefaultFormFields.map((field) => ({
		...field,
		defaultValue:
			field.key === "release_at" || field.key === "expiry_at"
				? apiToFormDateTime(assignment.value[field.key])
				: assignment.value[field.key],
	}));
});
</script>
