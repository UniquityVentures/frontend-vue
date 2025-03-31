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
import { createAssignment } from "@/apps/assignments/api";
import AssignmentForm from "../components/AssignmentForm.vue";
</script>
