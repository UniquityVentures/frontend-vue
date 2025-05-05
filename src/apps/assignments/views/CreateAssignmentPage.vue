<template>
	<v-container>
		<AssignmentForm
			:action="createAssignment"
			actionName="Create"
			title="Assignment"
			subtitle="Create a new assignment"
			:hideDelete="true"
		/>
	</v-container>
</template>

<script setup>
import { createAssignment } from "@/apps/assignments/api";
import AssignmentForm from "../components/AssignmentForm.vue";
</script>
