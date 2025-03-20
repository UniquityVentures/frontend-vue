<template>
	<v-container>
		<FormCard
			title="Course"
			actionName="Create"
			:formFields="formFields"
			:action="createCourse"
		/>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import FormCard from "@/components/FormCard.vue";
import { createCourse } from "@/apps/courses/api";

const formFields = ref([
    { label: "Name", type: "string", key: "name", required: true },
    { label: "Description", type: "longstring", key: "description" },
    { label: "Subject", type: "string", key: "subject", required: true },
    { label: "Main Teacher", type: "teacher", key: "main_teacher", required: true },
    { label: "Other Teachers", type: "teacher", key: "other_teachers", multiple: true, defaultValue: [] },
    { label: "Batches", type: "batch", key: "batches", multiple: true, required: true },
    { label: "Is Active", type: "boolean", key: "is_active", defaultValue: true },
]);
</script>
