<template>
	<v-container>
		<FormCard
			title="Course"
			actionName="Create"
			:formFields="courseDefaultFormFields"
			:action="createCourse"
		/>
	</v-container>
</template>

<script setup>
import { createCourse } from "@/apps/courses/api";
import FormCard from "@/components/FormCard.vue";
import { courseDefaultFormFields } from "@/apps/courses/config";
</script>
