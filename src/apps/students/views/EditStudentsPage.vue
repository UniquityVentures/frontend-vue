<template>
	<v-container>
		<FormCard
			v-if="student && user"
			title="Student"
			actionName="Update"
			:model="model"
			:action="handleUpdate"
		/>
	</v-container>
</template>

<script setup>
import { getUser, updateUser } from "@/apps/users/api";
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getStudent, updateStudent } from "../api";

const props = defineProps({
	studentId: {
		type: Number,
		required: true,
	},
});

const student = ref(null);
const user = ref(null);

const model = ref([
	{
		label: "First Name",
		key: "first_name",
		type: "string",
	},
	{
		label: "Last Name",
		key: "last_name",
		type: "string",
	},
	{
		label: "E-Mail",
		key: "email",
		type: "string",
	},
	{
		label: "Is Active",
		key: "is_active",
		type: "boolean",
	},
	{
		label: "Is Approved",
		key: "is_approved",
		type: "boolean",
	},
]);

const handleUpdate = async (formData) => {
	try {
		// Update both user and student data
		await updateUser({
			...user.value,
			...formData,
		});
		await updateStudent(student.value);
		return { success: true };
	} catch (error) {
		console.error("Failed to update student:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	student.value = await getStudent(props.studentId);
	user.value = await getUser(student.value.user);
	// Update model with default values from the existing user data
	model.value = model.value.map((field) => ({
		...field,
		defaultValue: user.value[field.key],
	}));
});
</script>
