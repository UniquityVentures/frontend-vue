<template>
	<v-container>
		<AssignmentForm
			v-if="assignment"
			:assignment="assignment"
			:action="updateAssignment"
			actionName="Update"
			title="Assignment"
		/>
	</v-container>
</template>

<script setup>
import AssignmentForm from "../components/AssignmentForm.vue";
import { onMounted, ref } from "vue";
import { getAssignment, updateAssignment } from "../api";

const props = defineProps({
	assignmentId: {
		type: Number,
		required: true,
	},
});

const assignment = ref(null);

onMounted(async () => {
	assignment.value = await getAssignment(props.assignmentId);
});
</script>
