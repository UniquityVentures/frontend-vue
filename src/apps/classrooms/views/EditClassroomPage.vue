<template>
	<v-container>
		<FormCard
			v-if="classroom"
			:title="`Class: ${classroom.name}`"
			actionName="Edit Class"
			:formFields="formFields"
			:action="updateClassroom"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getClassroom, updateClassroom } from "../api";
import { classroomDefaultFormFields } from "../config";

const props = defineProps({
	classroomId: {
		type: Number,
		required: true,
	},
});

const classroom = ref(null);
const formFields = ref(classroomDefaultFormFields);

onMounted(async () => {
	classroom.value = await getClassroom(props.classroomId);
	// Update model with default values from the existing classroom
	formFields.value = formFields.value.map((field) => ({
		...field,
		defaultValue: classroom.value[field.key],
	}));
});
</script>
