<template>
	<v-container>
		<FormCard
			title="Subject"
			actionName="Create"
			:formFields="subjectDefaultFormFields"
			:action="createSubject"
		/>
	</v-container>
</template>

<script setup>
import { createSubject } from "@/apps/subjects/api";
import FormCard from "@/components/FormCard.vue";
import { subjectDefaultFormFields } from "@/apps/subjects/config";
</script>
