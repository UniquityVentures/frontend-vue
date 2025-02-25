<template>
	<v-container>
		<FormCard
			v-if="classroom"
			title="Classroom"
			actionName="Update"
			:model="model"
			:action="updateClassroom"
		/>
	</v-container>
</template>

<script setup>
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getClassroom, updateClassroom } from "../api";

const props = defineProps({
	classroomId: {
		type: Number,
		required: true,
	},
});

const classroom = ref(null);

const model = ref([
	{
		label: "Standard",
		key: "standard",
		type: "string",
	},
	{
		label: "Name",
		key: "name",
		type: "string",
	},
	{
		label: "Class Teacher",
		key: "class_teacher",
		type: "number",
		fetchOptions: getTeachers,
		fetchOptionsInfo: getTeacherInfoFromObj,
		searchField: "name",
	},
	{
		label: "Is Active",
		key: "is_active",
		type: "boolean",
	},
]);

onMounted(async () => {
	classroom.value = await getClassroom(props.classroomId);
	// Update model with default values from the existing classroom
	model.value = model.value.map((field) => ({
		...field,
		defaultValue: classroom.value[field.key],
	}));
});
</script>
