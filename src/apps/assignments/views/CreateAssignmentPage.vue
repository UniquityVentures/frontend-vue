<template>
	<v-container>
		<FormCard
			title="Assignment"
			actionName="Create"
			:model="assignmentDefaultFormFields"
			:action="createAssignment"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { createAssignment } from "../api";
import { assignmentDefaultFormFields } from "../config";
</script>
