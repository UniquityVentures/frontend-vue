<template>
	<v-container>
		<AssignmentForm
			:action="createAssignment"
			actionName="Create"
			title="Assignment"
		/>
	</v-container>
</template>

<script setup>
import AssignmentForm from "../components/AssignmentForm.vue";
import { createAssignment } from "@/apps/assignments/api";
</script>
