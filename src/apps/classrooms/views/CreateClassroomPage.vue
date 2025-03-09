<template>
	<v-container>
		<FormCard
			title="Classroom"
			actionName="Create"
			:formFields="classroomDefaultFormFields"
			:action="createClassroom"
		/>
	</v-container>
</template>

<script setup>
import { createClassroom } from "@/apps/classrooms/api";
import { classroomDefaultFormFields } from "../config";
import FormCard from "@/components/FormCard.vue";
</script>
