<template>
	<v-container>
		<FormCard
			v-if="student && user"
			title="Student"
			actionName="Update"
			:formFields="formFields"
			:action="handleUpdate"
		/>
	</v-container>
</template>

<script setup>
import { getUser, updateUser } from "@/apps/users/api";
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getStudent, updateStudent } from "../api";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
	studentId: {
		type: Number,
		required: true,
	},
});

const student = ref(null);
const user = ref(null);

const formFields = ref([
	{
		label: "First Name",
		key: "first_name",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Last Name",
		key: "last_name",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "E-Mail",
		key: "email",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Is Active",
		key: "is_active",
		type: FIELD_TYPES.BOOLEAN,
	},
	{
		label: "Is Approved",
		key: "is_approved",
		type: FIELD_TYPES.BOOLEAN,
	},
])

const handleUpdate = async (formData) => {
	try {
		// Update both user and student data
		await updateUser({
			...user.value,
			...formData,
		});
		await updateStudent({ ...student.value, formData });
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
	formFields.value = formFields.value.map((field) => ({
		...field,
		defaultValue: user.value[field.key],
	}));
});
</script>
