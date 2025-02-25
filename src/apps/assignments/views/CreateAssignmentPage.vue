<template>
	<v-container>
		<FormCard
			title="Assignment"
			actionName="Create"
			:model="model"
			:action="createAssignment"
		/>
	</v-container>
</template>

<script setup>
import { getSubjectInfoFromObj, getSubjects } from "@/apps/subjects/api";
import FormCard from "@/components/FormCard.vue";
import { ref } from "vue";
import { createAssignment } from "../api";

const model = ref([
	{
		label: "Title",
		key: "title",
		type: "string",
	},
	{
		label: "Description",
		key: "description",
		type: "longstring",
	},
	{
		label: "Subject",
		key: "subject",
		type: "number",
		fetchOptions: getSubjects,
		fetchOptionsInfo: getSubjectInfoFromObj,
		searchField: "name",
	},
	{
		label: "Release Date",
		key: "release_at",
		type: "datetime",
	},
	{
		label: "Expiry Date",
		key: "expiry_at",
		type: "datetime",
	},
	{
		label: "Is Active",
		key: "is_active",
		type: "boolean",
		defaultValue: true,
	},
]);
</script>
