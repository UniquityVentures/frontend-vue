<template>
	<v-container>
		<FormCard
			v-if="teacher && user"
			title="Teacher"
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
import { getTeacher, updateTeacher } from "../api";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
	teacherId: {
		type: Number,
		required: true,
	},
});

const teacher = ref(null);
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
		// Update both user and teacher data
		await updateUser({
			...user.value,
			...formData,
		});
		await updateTeacher({ ...teacher.value, formData });
		return { success: true };
	} catch (error) {
		console.error("Failed to update teacher:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	teacher.value = await getTeacher(props.teacherId);
	user.value = await getUser(teacher.value.user);
	// Update model with default values from the existing user data
	formFields.value = formFields.value.map((field) => ({
		...field,
		defaultValue: user.value[field.key],
	}));
});
</script>
